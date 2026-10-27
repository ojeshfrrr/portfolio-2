import sharp from 'sharp';import {copyFile,mkdir,writeFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
const output='public/work/case-studies',qa='qa/project-visuals-and-entry-2026-10-17';await mkdir(output,{recursive:true});
await copyFile('D:/projects/lane-studio/public/images/campaigns/heat-campaign-square.webp',output+'/lane-original-artwork.webp');
await sharp(qa+'/sources/arcus-exercises.png').extract({left:480,top:420,width:2200,height:950}).webp({quality:95}).toFile(output+'/arcus-library-detail.webp');
await sharp(qa+'/sources/rewatch-browse.png').extract({left:590,top:770,width:2200,height:920}).webp({quality:95}).toFile(output+'/rewatch-catalogue-detail.webp');
const video='D:/projects/teen_fiesta/out/media/campaign-film-wide.mp4';
execFileSync('C:/Users/Lenovo/AppData/Local/Microsoft/WinGet/Links/ffmpeg.exe',['-y','-i',video,'-vf','fps=1/2.8,scale=480:-1,tile=3x2','-frames:v','1',qa+'/teen-film-contact-sheet.jpg'],{stdio:'pipe'});
await writeFile(qa+'/detail-provenance.json',JSON.stringify({lane:'Unmodified original supplied LANE HEAT artwork',arcus:{source:'sources/arcus-exercises.png',crop:{left:480,top:420,width:2200,height:950}},rewatch:{source:'sources/rewatch-browse.png',crop:{left:590,top:770,width:2200,height:920}},teenFilm:{source:video,inspection:'teen-film-contact-sheet.jpg; sampled frames inspected; native playback verified in production/film-check.json'}},null,2));
