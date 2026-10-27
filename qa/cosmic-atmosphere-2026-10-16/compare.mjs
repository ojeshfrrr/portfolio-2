import sharp from 'sharp';
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
const root='qa/cosmic-atmosphere-2026-10-16';
await mkdir(root+'/comparisons',{recursive:true});
for(const name of (await readdir(root+'/before')).filter(f=>f.endsWith('.png'))){
  const before=await readFile(root+'/before/'+name),after=await readFile(root+'/after/'+name);
  const {width,height}=await sharp(before).metadata();
  const label=Buffer.from(`<svg width="${width*2}" height="40"><rect width="100%" height="100%" fill="#171920"/><g fill="#e9e5d8" font-family="Arial" font-size="16"><text x="16" y="26">BEFORE / ${name}</text><text x="${width+16}" y="26">AFTER / ${name}</text></g></svg>`);
  await sharp({create:{width:width*2,height:height+40,channels:3,background:'#171920'}}).composite([{input:label,top:0,left:0},{input:before,left:0,top:40},{input:after,left:width,top:40}]).png().toFile(root+'/comparisons/'+name);
}
const samples=[];
for(const [name,x,y,width,height] of [['home-1440x1000.png',500,360,90,50],['home-1440x1000.png',380,570,90,50],['home-390x844.png',200,420,30,20]]){
  const a=await sharp(root+'/before/'+name).extract({left:x,top:y,width,height}).raw().toBuffer();
  const b=await sharp(root+'/after/'+name).extract({left:x,top:y,width,height}).raw().toBuffer();
  let difference=0;for(let i=0;i<a.length;i++)difference+=Math.abs(a[i]-b[i]);
  samples.push({name,x,y,width,height,meanAbsoluteChannelDifference:difference/a.length});
}
await writeFile(root+'/project-pixel-samples.json',JSON.stringify(samples,null,2));
console.log(JSON.stringify({comparisons:8,projectInteriorSamples:samples}));
