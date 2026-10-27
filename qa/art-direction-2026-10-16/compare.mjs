import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
const root='qa/art-direction-2026-10-16';
await mkdir(root+'/comparisons',{recursive:true});
for(const name of ['home-desktop','index-desktop','selected-arcus-desktop','about-desktop','contact-desktop','lane-desktop','teen-fiesta-desktop','home-mobile','teen-fiesta-mobile']){
  const before=await readFile(`${root}/before/${name}.png`),after=await readFile(`${root}/after/${name}.png`);
  const {width,height}=await sharp(before).metadata();
  const header=Buffer.from(`<svg width="${width*2}" height="40"><rect width="100%" height="100%" fill="#222"/><g fill="white" font-family="Arial" font-size="16"><text x="20" y="26">BEFORE — ${name}</text><text x="${width+20}" y="26">AFTER — ${name}</text></g></svg>`);
  await sharp({create:{width:width*2,height:height+40,channels:3,background:'#222'}}).composite([{input:header,top:0,left:0},{input:before,left:0,top:40},{input:after,left:width,top:40}]).png().toFile(`${root}/comparisons/${name}.png`);
}
console.log('Saved nine side-by-side comparisons.');
