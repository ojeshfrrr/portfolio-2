import { createRequire } from 'node:module';
import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const require = createRequire('C:/Users/Lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const phase = process.argv[2] ?? 'before';
if (!['before','after'].includes(phase)) throw new Error('Expected before or after');
const base = process.env.QA_URL ?? 'http://127.0.0.1:3000';
const folder = path.resolve('qa/cosmic-atmosphere-2026-10-16',phase);
await mkdir(folder,{recursive:true});
const projectSource = await readFile('src/lib/projects.ts','utf8');
const assets=[...new Set([...projectSource.matchAll(/(?:src|textureSrc):\s*"(\/work\/[^"]+)"/g)].map(m=>'public'+m[1]))];
const fontFiles=(await readdir('src/app/fonts')).map(name=>'src/app/fonts/'+name);
const hashPaths=['src/components/spatial-scene.tsx','src/lib/projects.ts','src/app/layout.tsx',...fontFiles,...assets];
const hashes=[];
for(const file of hashPaths){const data=await readFile(file);hashes.push({path:file,size:data.length,sha256:createHash('sha256').update(data).digest('hex')});}
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=swiftshader']});
const results={phase,base,createdAt:new Date().toISOString(),hashes,records:[],errors:[],warnings:[],failedRequests:[]};
try{
 for(const viewport of [{width:1440,height:1000},{width:1920,height:1080},{width:390,height:844},{width:320,height:700}]){
  const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:'no-preference',isMobile:viewport.width<500,hasTouch:viewport.width<500});
  const page=await context.newPage();const size=`${viewport.width}x${viewport.height}`;
  page.on('pageerror',e=>results.errors.push({size,message:e.message}));
  page.on('console',m=>{if(m.type()==='error')results.errors.push({size,message:m.text()});if(m.type()==='warning')results.warnings.push({size,message:m.text()});});
  page.on('response',r=>{if(r.status()>=400)results.failedRequests.push({size,url:r.url(),status:r.status()});});
  const response=await page.goto(base,{waitUntil:'networkidle',timeout:60000});
  await page.evaluate(()=>document.fonts.ready);await page.locator('.spatial-webgl.is-ready').waitFor({timeout:45000});
  await page.mouse.move(0,0);await page.waitForTimeout(1800);
  for(const state of ['home','index']){
   if(state==='index'){await page.getByRole('button',{name:'Index',exact:false}).click();await page.waitForTimeout(700);}
   const filename=`${state}-${size}.png`;await page.screenshot({path:path.join(folder,filename)});
   const record=await page.evaluate(()=>{
    const selectors=['.site-header','.site-wordmark','.spatial-note','.spatial-stage','.spatial-focus','.spatial-footer','.spatial-switch','.spatial-contact','.spatial-scroll','.spatial-index','.spatial-index__title','.spatial-index__select'];
    return{url:location.href,width:innerWidth,height:innerHeight,documentWidth:document.documentElement.scrollWidth,documentHeight:document.documentElement.scrollHeight,y:scrollY,pinCount:document.querySelectorAll('.pin-spacer').length,canvasCount:document.querySelectorAll('canvas').length,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,ui:selectors.map(selector=>{const el=document.querySelector(selector);if(!el)return null;const b=el.getBoundingClientRect(),s=getComputedStyle(el);return{selector,text:el.textContent.trim(),rect:{x:b.x,y:b.y,width:b.width,height:b.height},family:s.fontFamily,weight:s.fontWeight,size:s.fontSize,lineHeight:s.lineHeight,letterSpacing:s.letterSpacing,color:s.color,opacity:s.opacity,visibility:s.visibility,display:s.display}}).filter(Boolean),fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>({family:f.family,weight:f.weight,style:f.style})),projectLabels:[...document.querySelectorAll('.spatial-index__title')].map(e=>e.textContent.trim()),background:{body:getComputedStyle(document.body).background,hero:getComputedStyle(document.querySelector('.spatial-hero')).background}};
   });results.records.push({filename,status:response.status(),...record});console.log(`${phase}/${filename}: ${record.width}x${record.height}; overflow ${record.documentWidth-record.width}; pins ${record.pinCount}`);
  }
  await context.close();
 }
}finally{await writeFile(path.join(folder,'results.json'),JSON.stringify(results,null,2));await browser.close();}
console.log(JSON.stringify({phase,screenshots:results.records.length,errors:results.errors,warnings:results.warnings,failedRequests:results.failedRequests},null,2));
