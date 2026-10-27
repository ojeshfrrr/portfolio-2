import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
const require=createRequire(process.cwd()+'/package.json');
const sharp=require('sharp');
const dir='qa/cosmic-atmosphere-2026-10-16';
const samples=[{file:'home-1440x1000.png',project:'ARCUS',x:650,y:430},{file:'home-1440x1000.png',project:'LANE',x:300,y:650},{file:'home-1920x1080.png',project:'ARCUS',x:850,y:520},{file:'home-1920x1080.png',project:'LANE',x:550,y:700},{file:'home-390x844.png',project:'ARCUS',x:220,y:420},{file:'home-390x844.png',project:'LANE',x:180,y:580},{file:'home-320x700.png',project:'ARCUS',x:170,y:350},{file:'home-320x700.png',project:'LANE',x:130,y:460}];
for(const s of samples){const clip={left:s.x,top:s.y,width:10,height:10};const a=await sharp(dir+'/before/'+s.file).extract(clip).removeAlpha().raw().toBuffer();const b=await sharp(dir+'/after/'+s.file).extract(clip).removeAlpha().raw().toBuffer();const changes=Array.from(a,(v,i)=>Math.abs(v-b[i]));s.meanAbsoluteChannelDifference=changes.reduce((a,b)=>a+b,0)/changes.length;s.maxAbsoluteChannelDifference=Math.max(...changes);s.exactPixelMatch=changes.every(v=>v===0);}
await writeFile(dir+'/project-pixel-preservation.json',JSON.stringify({method:'Matched 10x10 interior patches in before/after actual browser captures; edges and interface excluded',samples},null,2));
console.log(JSON.stringify(samples,null,2));
