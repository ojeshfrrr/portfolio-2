import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire('C:/Users/Lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();const errors=[],records=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
const folder='qa/cosmic-atmosphere-2026-10-16/secondary';await mkdir(folder,{recursive:true});
try{
 for(const [route,name] of [['/about','about-desktop'],['/contact','contact-desktop'],['/work/lane','lane-desktop']]){
  await page.goto('http://127.0.0.1:3001'+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(500);
  await page.screenshot({path:folder+'/'+name+'.png'});
  records.push(await page.evaluate(()=>({route:location.pathname,width:innerWidth,documentWidth:document.documentElement.scrollWidth,base:getComputedStyle(document.body).backgroundColor,background:{z:getComputedStyle(document.body,'::before').zIndex,pointerEvents:getComputedStyle(document.body,'::before').pointerEvents,opacity:getComputedStyle(document.body,'::before').opacity},imageFilters:[...document.querySelectorAll('.case-gallery__frame img')].map(e=>getComputedStyle(e).filter)})));
 }
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:3001/work/teen-fiesta',{waitUntil:'networkidle'});await page.screenshot({path:folder+'/teen-fiesta-mobile.png'});
 await writeFile(folder+'/results.json',JSON.stringify({records,errors},null,2));
}finally{await browser.close();}
console.log(JSON.stringify({records,errors}));
