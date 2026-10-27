import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const output = 'public/atmosphere';
await mkdir(output, { recursive: true });
const original = 'C:/Users/Lenovo/.codex/generated_images/01a13c0c-e23e-7433-a325-7c52200eb419/exec-abd323c7-8f58-4a34-871b-20ce59b9dabb.png';
await writeFile('qa/cosmic-atmosphere-2026-10-16/nebula-source.png', await readFile(original));
await sharp(original).webp({ quality: 88, effort: 6 }).toFile(output + '/cosmic-nebula.webp');
await sharp(original).resize({ width: 600, height: 1000, fit: 'cover', position: sharp.strategy.attention }).webp({ quality: 86, effort: 6 }).toFile(output + '/cosmic-nebula-mobile.webp');

// Fixed, deliberately asymmetric coordinates: no render-time random values,
// recurring tiles, twinkle animation or constellation lines.
const distant = [[70,179,.55,.4],[155,328,.4,.25],[298,118,.55,.28],[417,225,.38,.3],[209,506,.65,.35],[92,713,.45,.25],[358,841,.45,.3],[532,660,.55,.32],[631,92,.4,.23],[758,184,.6,.35],[885,119,.45,.28],[1027,82,.5,.25],[1198,192,.4,.3],[1369,272,.6,.35],[1280,447,.45,.28],[1393,653,.4,.2],[1246,791,.6,.35],[1362,901,.45,.25],[1088,861,.4,.3],[945,949,.5,.28],[748,828,.4,.2],[572,926,.5,.25],[196,928,.45,.25],[462,448,.45,.2],[831,587,.4,.25],[1118,586,.45,.2],[308,619,.45,.25],[1008,337,.5,.3],[1162,356,.4,.2],[32,476,.45,.26],[113,862,.65,.3],[708,380,.4,.18]];
const near = [[249,234,.8,.46],[118,418,.7,.38],[466,104,.65,.36],[641,294,.75,.34],[1137,144,.75,.4],[1312,577,.8,.4],[1034,739,.7,.35],[844,887,.7,.32],[420,752,.75,.4],[144,611,.65,.3]];
const dust = [[321,377,2.3,.18],[981,478,1.9,.16],[679,712,2.6,.13],[1176,681,2.2,.14],[533,183,1.8,.13],[221,795,2.4,.12]];
function svg(width,height,stars,motes) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><defs><radialGradient id="dust"><stop stop-color="#c5c6cd" stop-opacity=".6"/><stop offset="1" stop-color="#c5c6cd" stop-opacity="0"/></radialGradient></defs><g fill="#d0d6e2">${stars.map(([x,y,r,a])=>`<circle cx="${x}" cy="${y}" r="${r}" opacity="${a}"/>`).join('')}</g><g fill="url(#dust)">${motes.map(([x,y,r,a])=>`<circle cx="${x}" cy="${y}" r="${r}" opacity="${a}"/>`).join('')}</g></svg>`;
}
await writeFile(output+'/cosmic-distance.svg',svg(1440,1000,[...distant,...near],dust));
await writeFile(output+'/cosmic-distance-mobile.svg',svg(390,844,[[42,132,.45,.3],[108,201,.5,.3],[331,162,.45,.25],[286,291,.55,.3],[24,366,.55,.3],[354,450,.4,.25],[93,566,.5,.3],[307,633,.6,.3],[168,739,.4,.25],[46,693,.5,.25],[361,767,.4,.25],[210,90,.4,.2]],[[133,358,1.7,.12],[287,706,1.9,.12]]));
console.log('Prepared background assets.');
