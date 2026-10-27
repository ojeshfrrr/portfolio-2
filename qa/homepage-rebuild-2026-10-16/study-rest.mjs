import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
const require=createRequire('C:/Users/Lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const {chromium}=require('playwright');const dir='qa/homepage-rebuild-2026-10-16/reference';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=swiftshader']});
try {
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto('https://fantik.studio/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(7000);
 // The complete scroll sequence is already captured; inspect the persistent controls here.
 await writeFile(dir+'/controls.json',JSON.stringify(await page.locator('button').evaluateAll(els=>els.map(el=>({text:el.innerText,html:el.outerHTML.slice(0,700),rect:el.getBoundingClientRect().toJSON()}))),null,2));
 await page.locator('button').nth(1).click();await page.waitForTimeout(1200);await page.screenshot({path:dir+'/contact.png'});
 await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(6000);await page.locator('button').nth(2).click();await page.waitForTimeout(1200);await page.screenshot({path:dir+'/menu.png'});
 try{await page.goto('https://landing.love/sites/fantik/',{waitUntil:'domcontentloaded',timeout:30000});await writeFile(dir+'/recording.json',JSON.stringify(await page.locator('video,video source').evaluateAll(els=>els.map(el=>({src:el.getAttribute('src'),poster:el.getAttribute('poster')}))),null,2));await page.screenshot({path:dir+'/landing-love.png'});}catch(e){await writeFile(dir+'/archive-limitation.txt',String(e));}
}finally{await browser.close();}
