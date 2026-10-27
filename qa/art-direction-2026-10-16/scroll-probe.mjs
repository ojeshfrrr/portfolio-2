import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
const require=createRequire('C:/Users/Lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const states=[];
async function sample(label){states.push(await page.evaluate(label=>({label,x:scrollX,y:scrollY,hero:document.querySelector('.spatial-hero').getBoundingClientRect().toJSON(),internal:{left:document.querySelector('.spatial-hero').scrollLeft,top:document.querySelector('.spatial-hero').scrollTop,width:document.querySelector('.spatial-hero').scrollWidth,height:document.querySelector('.spatial-hero').scrollHeight},heroStyle:document.querySelector('.spatial-hero').getAttribute('style'),spacer:document.querySelector('.pin-spacer')?.getBoundingClientRect().toJSON(),body:{x:document.body.scrollLeft,y:document.body.scrollTop,width:document.body.scrollWidth},html:{width:document.documentElement.scrollWidth},progress:getComputedStyle(document.querySelector('.spatial-progress span')).transform}),label));}
await page.goto('http://127.0.0.1:3001',{waitUntil:'networkidle'});await page.locator('.spatial-webgl.is-ready').waitFor();await page.waitForTimeout(1200);await sample('initial');
const t=page.getByRole('button',{name:/^Index/});await t.focus();await page.keyboard.press('Enter');await sample('index');
for(let i=0;i<4;i++){await page.locator('.spatial-index__select').nth(i).click();await page.waitForTimeout(1050);await sample('select '+i);}
await page.keyboard.press('Escape');await page.waitForTimeout(600);await sample('escape');
await page.getByRole('button',{name:'Overview',exact:true}).click();await page.waitForTimeout(1100);await sample('overview');
await page.mouse.wheel(0,720);await page.waitForTimeout(1700);await sample('scroll');
await page.screenshot({path:'qa/art-direction-2026-10-16/verification/scroll-probe.png'});
await sample('after screenshot');console.log(JSON.stringify(states.map(s=>({label:s.label,x:s.x,y:s.y,internal:s.internal})),null,2));await writeFile('qa/art-direction-2026-10-16/verification/scroll-probe.json',JSON.stringify(states,null,2));await browser.close();

