import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire('C:/Users/Lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const {chromium}=require('playwright');
const base='http://127.0.0.1:3001';
const dir='qa/cosmic-atmosphere-2026-10-16/experiment';await mkdir(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,reducedMotion:'no-preference'});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const results={method:'Matched idle CDP traces in one stable production page, actual headless Chrome/SwiftShader. Browser-only CSS overrides, no source edits. Each5s sample follows2s settling; normal repeats bracket steps and will-change samples.',base,samples:[],errors};
try{
 await page.goto(base,{waitUntil:'networkidle',timeout:60000});await page.locator('.spatial-webgl.is-ready').waitFor({timeout:40000});await page.evaluate(()=>document.fonts.ready);await page.mouse.move(0,0);await page.waitForTimeout(4000);
 const css=await page.addStyleTag({content:'/* browser-only QA override */'});
 const modes=[['normal-1',''],['steps-220','.ambient-field::before{animation-timing-function:steps(220,end)!important}'],['normal-will-change','.ambient-field::before{will-change:transform!important}'],['normal-2','']];
 for(const [label,override]of modes){
  await css.evaluate((el,text)=>{el.textContent=text},override);await page.waitForTimeout(2000);
  const session=await context.newCDPSession(page);await session.send('Performance.enable');let complete;const done=new Promise(resolve=>complete=resolve);session.once('Tracing.tracingComplete',complete);
  await session.send('Tracing.start',{categories:'devtools.timeline,disabled-by-default-devtools.timeline.frame,blink,cc,toplevel',transferMode:'ReturnAsStream'});
  const before=await session.send('Performance.getMetrics');const start=performance.now();await page.waitForTimeout(5000);const elapsed=performance.now()-start;const after=await session.send('Performance.getMetrics');await session.send('Tracing.end');const end=await done;let json='';for(;;){const part=await session.send('IO.read',{handle:end.stream});json+=part.data;if(part.eof)break;}await session.send('IO.close',{handle:end.stream});await writeFile(dir+'/'+label+'.trace.json',json);const trace=JSON.parse(json);const names=['Paint','PrePaint','Layerize','RasterTask','DrawFrame','Layout','UpdateLayoutTree','ThreadControllerImpl::RunTask'];
  const aggregate=names.map(name=>{const es=trace.traceEvents.filter(e=>e.name===name);return{name,count:es.length,durationMs:es.reduce((a,e)=>a+(e.dur??0)/1000,0),maxMs:Math.max(0,...es.map(e=>(e.dur??0)/1000))};});
  const wanted=['TaskDuration','ScriptDuration','LayoutDuration','RecalcStyleDuration','LayoutCount','RecalcStyleCount'];const metricDelta=Object.fromEntries(wanted.map(name=>[name,(after.metrics.find(m=>m.name===name)?.value??0)-(before.metrics.find(m=>m.name===name)?.value??0)]));
  const state=await page.locator('.ambient-field--cosmic').evaluate(el=>{const s=getComputedStyle(el,'::before');return{active:el.dataset.active,duration:s.animationDuration,timing:s.animationTimingFunction,willChange:s.willChange,animation:s.animationName,transform:s.transform}});
  const sample={label,override,sampleElapsedMs:elapsed,aggregate,metricDelta,state};results.samples.push(sample);console.log(JSON.stringify({label,elapsed,metricDelta,aggregate:aggregate.filter(a=>['Paint','DrawFrame','Layout'].includes(a.name)),state}));await session.detach();
 }
}finally{await writeFile(dir+'/results.json',JSON.stringify(results,null,2));await browser.close();}
