import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
const require = createRequire('C:/Users/Lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const base = process.env.QA_URL ?? 'http://127.0.0.1:3001';
const dir = 'qa/art-direction-2026-10-16/verification';
await mkdir(dir,{recursive:true});
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=swiftshader']});
const checks=[], consoleErrors=[], warnings=[], failedRequests=[], fontRequests=[], fonts=[], layouts=[];
function check(name, pass, actual) { checks.push({name,pass:Boolean(pass),actual}); console.log(pass?'PASS':'FAIL',name,JSON.stringify(actual??'')); }
function watch(page,label,expected=false) {
  page.on('console',m=> { if(m.type()==='error') consoleErrors.push({label,expected,message:m.text()}); if(m.type()==='warning')warnings.push({label,message:m.text()}); });
  page.on('pageerror',e=>consoleErrors.push({label,expected,message:e.message}));
  page.on('response',r=> {if(r.status()>=400)failedRequests.push({label,url:r.url(),status:r.status()}); if(/\.(woff2?|ttf)/.test(r.url()))fontRequests.push({label,url:r.url(),status:r.status()});});
}
async function go(page,route,scene=false) {
  const response=await page.goto(base+route,{waitUntil:'networkidle',timeout:60000});
  check('HTTP '+route,response.status()===200,response.status());
  await page.evaluate(()=>document.fonts.ready);
  if(scene)await page.locator('.spatial-webgl.is-ready').waitFor({timeout:30000});
  await page.waitForTimeout(1100);
}
async function layout(page,label) {
  const v=await page.evaluate(()=>({width:innerWidth,documentWidth:document.documentElement.scrollWidth,headings:[...document.querySelectorAll('h1:not(.visually-hidden),h2,.next-case__title')].map(el=>{const r=document.createRange();r.selectNodeContents(el);const rect=r.getBoundingClientRect();return{text:el.textContent,left:rect.left,right:rect.right};})}));
  layouts.push({label,...v});
  check(label+' no horizontal overflow',v.documentWidth===v.width && v.headings.every(h=>h.left>=-1&&h.right<=v.width+1),v);
}
async function renderedFonts(page,selector) {
  const session=await page.context().newCDPSession(page);
  await session.send('DOM.enable');await session.send('CSS.enable');
  const {root}=await session.send('DOM.getDocument');
  const {nodeId}=await session.send('DOM.querySelector',{nodeId:root.nodeId,selector});
  const result=await session.send('CSS.getPlatformFontsForNode',{nodeId});await session.detach();
  fonts.push({selector,...result});return result.fonts;
}
try {
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
  const page=await context.newPage();watch(page,'standard');
  await go(page,'/',true);
  check('Desktop has exactly one cinematic pin',await page.locator('.pin-spacer').count()===1);
  check('Four canonical fallback mappings only',await page.locator('.spatial-fallback a').count()===4,await page.locator('.spatial-fallback a').evaluateAll(els=>els.map(e=>e.getAttribute('href'))));
  const toggle=page.getByRole('button',{name:/^Index/});
  await toggle.focus();await page.keyboard.press('Enter');
  await page.getByRole('region',{name:'Project index'}).waitFor();
  check('Keyboard opens index',await toggle.getAttribute('aria-expanded')==='true');
  const slugs=['lane','arcus','teen-fiesta','rewatch'];
  for(let i=0;i<4;i++) {
    await page.locator('.spatial-index__select').nth(i).click();await page.waitForTimeout(1050);
    check('Select '+slugs[i],await page.locator('.spatial-index__select').nth(i).getAttribute('aria-pressed')==='true');
    check('Case link '+slugs[i],await page.locator('.spatial-index__row > a').nth(i).getAttribute('href')==='/work/'+slugs[i]);
  }
  const offset=await page.locator('.spatial-hero').evaluate(el=>({x:el.scrollLeft,y:el.scrollTop}));
  check('Index selection cannot internally scroll hero',offset.x===0&&offset.y===0,offset);
  await page.keyboard.press('Escape');await page.waitForTimeout(600);
  check('Escape closes index and restores focus',await page.locator('.spatial-index').count()===0&&await toggle.evaluate(el=>el===document.activeElement));
  await page.getByRole('button',{name:'Overview',exact:true}).click();await page.waitForTimeout(1100);
  await page.mouse.wheel(0,720);await page.waitForTimeout(1700);
  const middle=await page.evaluate(()=>({y:scrollY,heroTop:document.querySelector('.spatial-hero').getBoundingClientRect().top,progress:getComputedStyle(document.querySelector('.spatial-progress span')).transform}));
  check('Native wheel scrubs pinned scene',middle.y>500&&Math.abs(middle.heroTop)<2&&middle.progress!=='matrix(0, 0, 0, 1, 0, 0)',middle);
  await page.screenshot({path:dir+'/scroll-production.png'});
  await page.mouse.wheel(0,2200);await page.waitForTimeout(1700);
  check('Pin releases into About',await page.locator('#home-about-title').isVisible()&&await page.evaluate(()=>scrollY>1350));
  await page.mouse.wheel(0,-5000);await page.waitForTimeout(2100);
  const reverse=await page.evaluate(()=>({y:scrollY,opacity:parseFloat(getComputedStyle(document.querySelector('.spatial-note')).opacity)}));
  check('Reverse restores opening scene',reverse.y<2&&reverse.opacity>.99,reverse);
  for(const route of ['/about','/contact',...slugs.map(s=>'/work/'+s)]) {
    await go(page,route);await layout(page,'1440 '+route);
    if(route==='/about') {
      const d=await renderedFonts(page,'h1');check('Bricolage actually renders display',d.some(f=>f.isCustomFont&&/Bricolage/i.test(f.familyName)),d);
      const e=await renderedFonts(page,'.about-lead h2');check('Instrument actually renders editorial',e.some(f=>f.isCustomFont&&/Instrument/i.test(f.familyName)),e);
      const b=await renderedFonts(page,'.page-intro__summary');check('Manrope actually renders body',b.some(f=>f.isCustomFont&&/Manrope/i.test(f.familyName)),b);
    }
    if(route.startsWith('/work/')) {
      await page.getByRole('button',{name:'Next image',exact:true}).click();await page.waitForTimeout(650);
      check(route+' gallery advances',await page.locator('.case-gallery__image').getAttribute('aria-label').then(v=>v.startsWith('Image 2')));
      await page.locator('.case-gallery__image').focus();await page.keyboard.press('ArrowLeft');await page.waitForTimeout(600);
      check(route+' keyboard gallery reverses',await page.locator('.case-gallery__image').getAttribute('aria-label').then(v=>v.startsWith('Image 1')));
      check(route+' image loaded',await page.locator('.case-gallery__frame img').evaluate(el=>el.complete&&el.naturalWidth>0));
    }
  }
  for(const width of [1024,1920,390,320]) {
    await page.setViewportSize({width,height:width<500?844:900});
    for(const route of ['/','/about','/contact',...slugs.map(s=>'/work/'+s)]) {await go(page,route,route==='/');await layout(page,width+' '+route);}
  }
  await page.setViewportSize({width:1440,height:900});
  await go(page,'/',true);
  await page.getByRole('link',{name:'About',exact:true}).first().click();await page.waitForURL('**/about');await page.waitForTimeout(600);
  check('Client route removes cinematic pin',await page.locator('.pin-spacer').count()===0);
  await page.locator('.site-wordmark').click();await page.waitForURL(base+'/');await page.locator('.spatial-webgl.is-ready').waitFor();await page.waitForTimeout(1000);
  check('Client remount restores one pin and one canvas',await page.locator('.pin-spacer').count()===1&&await page.locator('canvas').count()===1);
  await context.close();

  const reduced=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  await reduced.addInitScript(()=>{window.qaPins=0;new MutationObserver(records=>{for(const r of records)for(const node of r.addedNodes)if(node.nodeType===1&&(node.matches('.pin-spacer')||node.querySelector('.pin-spacer')))window.qaPins++;}).observe(document,{subtree:true,childList:true});});
  const rp=await reduced.newPage();watch(rp,'reduced');await go(rp,'/',true);
  const state=await rp.evaluate(()=>({media:matchMedia('(prefers-reduced-motion: reduce)').matches,pins:document.querySelectorAll('.pin-spacer').length,transientPins:window.qaPins,lenis:document.documentElement.classList.contains('lenis')}));
  check('Reduced motion from initial load suppresses pin and Lenis',state.media&&state.pins===0&&state.transientPins===0&&!state.lenis,state);
  await rp.screenshot({path:dir+'/reduced-home.png'});
  await rp.mouse.wheel(0,650);await rp.waitForTimeout(400);check('Reduced natural scrolling',await rp.evaluate(()=>scrollY>500));
  await go(rp,'/about');
  const first=await rp.locator('.ambient-field').evaluate(el=>({animation:getComputedStyle(el,'::before').animationName,transform:getComputedStyle(el,'::before').transform}));
  await rp.waitForTimeout(1100);const second=await rp.locator('.ambient-field').evaluate(el=>getComputedStyle(el,'::before').transform);
  check('Reduced ambient field static',first.animation==='none'&&first.transform===second,first);
  await go(rp,'/work/teen-fiesta');
  await rp.getByRole('button',{name:'Next image',exact:true}).click();
  const motion=await rp.locator('.case-gallery__frame').evaluate(el=>({opacity:getComputedStyle(el).opacity,transform:getComputedStyle(el).transform}));
  check('Reduced gallery switches without travel/fade',motion.opacity==='1'&&(motion.transform==='none'||motion.transform==='matrix(1, 0, 0, 1, 0, 0)'),motion);
  await rp.locator('.case-gallery__image').focus();await rp.keyboard.press('ArrowLeft');
  check('Reduced gallery keyboard works',(await rp.locator('.case-gallery__image').getAttribute('aria-label')).startsWith('Image 1'));
  await go(rp,'/',true);await rp.getByRole('button',{name:/^Index/}).focus();await rp.keyboard.press('Enter');
  await rp.locator('.spatial-index__select').nth(2).focus();await rp.keyboard.press('Enter');
  check('Reduced keyboard project selection',await rp.locator('.spatial-index__select').nth(2).getAttribute('aria-pressed')==='true');
  await rp.getByRole('link',{name:'Open TEEN FIESTA case study',exact:true}).click();await rp.waitForURL('**/work/teen-fiesta');
  check('Reduced case link works',await rp.locator('h1').innerText()==='A website built\nfor the event.');
  await reduced.close();

  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1,reducedMotion:'no-preference'});
  const mp=await mobile.newPage();watch(mp,'mobile');await go(mp,'/',true);
  check('Mobile has no cinematic pin',await mp.locator('.pin-spacer').count()===0);
  const touch=await mobile.newCDPSession(mp);
  await touch.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:280,y:650}]});
  for(let i=1;i<=12;i++){await touch.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:280,y:650-i*32}]});await mp.waitForTimeout(22);}
  await touch.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await mp.waitForTimeout(1000);
  check('Touch scroll passes through scene naturally',await mp.evaluate(()=>scrollY>200),await mp.evaluate(()=>scrollY));
  await mp.screenshot({path:dir+'/mobile-touch-scroll.png'});await mobile.close();

  const fallback=await browser.newContext({viewport:{width:1440,height:900}});
  await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/i.test(String(type))?null:original.call(this,type,...args);};});
  const fp=await fallback.newPage();watch(fp,'deliberate-webgl-failure',true);await go(fp,'/');
  check('WebGL failure shows four accessible fallback links',await fp.locator('.spatial-fallback:not(.is-hidden) a').count()===4);
  check('WebGL failure creates no pin',await fp.locator('.pin-spacer').count()===0);
  await fp.screenshot({path:dir+'/webgl-fallback.png'});
  await fp.getByRole('button',{name:/^Index/}).click();await fp.getByRole('link',{name:'Open ARCUS case study',exact:true}).click();await fp.waitForURL('**/work/arcus');
  check('Fallback index still navigates to case',await fp.locator('h1').innerText()==='ARCUS');await fallback.close();
  check('No unexpected browser application errors',consoleErrors.every(e=>e.expected),consoleErrors.filter(e=>!e.expected));
  check('No failed asset or route responses',failedRequests.length===0,failedRequests);
  check('All fonts served locally',fontRequests.every(r=>r.url.startsWith(base)&&r.status===200),fontRequests);
} finally {
  await writeFile(dir+'/results.json',JSON.stringify({base,checks,consoleErrors,warnings,failedRequests,fontRequests,fonts,layouts},null,2));await browser.close();
}
if(checks.some(c=>!c.pass))process.exitCode=1;
