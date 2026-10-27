import sharp from 'sharp';
const dir='qa/homepage-rebuild-2026-10-16';
const title=Buffer.from('<svg width="2880" height="48"><rect width="100%" height="100%" fill="#151515"/><text x="24" y="31" fill="white" font-size="19" font-family="Arial">Before — spatial stack</text><text x="1464" y="31" fill="white" font-size="19" font-family="Arial">After — Open the view</text></svg>');
await sharp({create:{width:2880,height:948,channels:3,background:'#08090b'}}).composite([{input:title,left:0,top:0},{input:dir+'/before-home-1440x900.png',left:0,top:48},{input:dir+'/production/home-1440x900.png',left:1440,top:48}]).png().toFile(dir+'/comparison-1440x900.png');
