import { mkdir, writeFile } from 'node:fs/promises';
const families = [
  {slug:'bricolagegrotesque',file:'bricolage-grotesque-latin.woff2',query:'Bricolage+Grotesque:opsz,wght@12..96,400..700'},
  {slug:'instrumentserif',file:'instrument-serif-latin-italic.woff2',query:'Instrument+Serif:ital@1'},
];
await mkdir('src/app/fonts',{recursive:true});
for (const family of families) {
  const licenseUrl = `https://raw.githubusercontent.com/google/fonts/main/ofl/${family.slug}/OFL.txt`;
  const licenseResponse = await fetch(licenseUrl);
  if (!licenseResponse.ok) throw Error('License unavailable');
  const license = await licenseResponse.text();
  if (!license.includes('SIL OPEN FONT LICENSE Version 1.1')) throw Error('Unexpected license');
  await writeFile(`src/app/fonts/${family.slug}-OFL.txt`,license);
  const cssResponse = await fetch(`https://fonts.googleapis.com/css2?family=${family.query}&display=swap`,{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'}});
  if (!cssResponse.ok) throw Error('Font CSS unavailable');
  const css = await cssResponse.text();
  const latin = css.split('/* latin */')[1];
  const url = latin?.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/)?.[1];
  if (!url) throw Error('Latin WOFF2 not found');
  const response = await fetch(url);
  if (!response.ok) throw Error('Font unavailable');
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.subarray(0,4).toString() !== 'wOF2') throw Error('Invalid font');
  await writeFile(`src/app/fonts/${family.file}`,bytes);
  await writeFile(`qa/art-direction-2026-10-16/${family.slug}-source.css`,css);
  console.log(JSON.stringify({font:family.slug,bytes:bytes.length,licenseUrl,fontUrl:url}));
}
