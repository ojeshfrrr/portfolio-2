import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire('C:/Users/Lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const {chromium}=require('playwright');const dir='qa/homepage-rebuild-2026-10-16';await mkdir(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
try {
 await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1500);
 await page.screenshot({path:dir+'/after-home-1440x900.png'});
 await page.getByRole('button',{name:'Project index',exact:true}).click();await page.screenshot({path:dir+'/after-index-1440x900.png'});await page.keyboard.press('Escape');
 await page.mouse.wheel(0,500);await page.waitForTimeout(1800);await page.screenshot({path:dir+'/after-middle-1440x900.png'});
 await page.mouse.wheel(0,500);await page.waitForTimeout(1800);await page.screenshot({path:dir+'/after-open-1440x900.png'});
 for(const [name,index]of [['LANE',0],['ARCUS',1],['TEEN FIESTA',2],['Rewatch',3]]){await page.getByRole('group',{name:'Select a project'}).getByRole('button').nth(index).click();await page.waitForTimeout(850);await page.screenshot({path:dir+`/selected-${name.toLowerCase().replace(' ','-')}.png`});}
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const mobile=await context.newPage();await mobile.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});await mobile.evaluate(()=>document.fonts.ready);await mobile.waitForTimeout(1300);await mobile.screenshot({path:dir+'/after-home-390x844.png'});await mobile.getByRole('button',{name:'Project index',exact:true}).click();await mobile.screenshot({path:dir+'/after-index-390x844.png'});
 await writeFile(dir+'/capture-errors.json',JSON.stringify(errors,null,2));
}finally{await browser.close();}
