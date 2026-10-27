import sharp from 'sharp';
import {readFile,writeFile} from 'node:fs/promises';
const root='qa/animation-stability-2026-10-17',dir=process.env.QA_REVIEW_DIR||root+'/development';
const before=await sharp(root+'/before/initial.png').resize(720,450).toBuffer(),after=await sharp(dir+'/initial-1440.png').resize(720,450).toBuffer();
await sharp({create:{width:1440,height:480,channels:3,background:'#08090b'}}).composite([{input:before,left:0,top:30},{input:after,left:720,top:30},{input:Buffer.from('<svg width="1440" height="30"><text x="15" y="21" fill="white" font-size="16">BEFORE — settled composition</text><text x="735" y="21" fill="white" font-size="16">AFTER — same settled composition, stable choreography</text></svg>'),left:0,top:0}]).jpeg({quality:94}).toFile(dir+'/before-after.jpg');
const frames=JSON.parse(await readFile(dir+'/recording/timestamps.json','utf8'));const picks=Array.from({length:16},(_,i)=>Math.round(i*(frames.length-1)/15));
const layers=[];for(const [tile,n]of picks.entries()){const input=await sharp(dir+`/recording/frame-${String(n).padStart(4,'0')}.jpg`).resize(360,225).toBuffer();const x=tile%4*360,y=Math.floor(tile/4)*250;layers.push({input,left:x,top:y+25});layers.push({input:Buffer.from(`<svg width="360" height="25"><text x="10" y="18" fill="white" font-size="14">${(frames[n].t-frames[0].t).toFixed(2)}s / frame ${n}</text></svg>`),left:x,top:y});}
await sharp({create:{width:1440,height:1000,channels:3,background:'#08090b'}}).composite(layers).jpeg({quality:94}).toFile(dir+'/recording-filmstrip.jpg');
await writeFile(dir+'/recording-review-frames.json',JSON.stringify(picks));console.log(dir);
