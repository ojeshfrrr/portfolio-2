import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire('C:/Users/Lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const phase = process.argv[2] ?? 'before';
const base = process.env.QA_URL ?? 'http://127.0.0.1:3000';
const directory = path.resolve('qa/art-direction-2026-10-16', phase);
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--enable-webgl', '--ignore-gpu-blocklist', '--use-gl=angle', '--use-angle=swiftshader'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference', deviceScaleFactor: 1 });
const page = await context.newPage();
const errors = [], warnings = [], failed = [], records = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); if (m.type() === 'warning') warnings.push(m.text()); });
page.on('response', r => { if (r.status() >= 400) failed.push({ url: r.url(), status: r.status() }); });
await context.addInitScript(() => {
  window.qaShifts = [];
  new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.qaShifts.push(entry.value); }).observe({ type: 'layout-shift', buffered: true });
});
async function go(route, scene = false) {
  await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  if (scene) await page.locator('.spatial-webgl.is-ready').waitFor({ timeout: 30000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(1500);
}
async function capture(name) {
  await page.screenshot({ path: path.join(directory, name + '.png') });
  const record = await page.evaluate(() => ({
    url: location.pathname, width: innerWidth, height: innerHeight,
    documentWidth: document.documentElement.scrollWidth, y: scrollY,
    pinCount: document.querySelectorAll('.pin-spacer').length,
    reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
    cls: window.qaShifts.reduce((a,b) => a+b,0),
    typography: ['.site-wordmark','h1:not(.visually-hidden)', '.spatial-focus p', '.spatial-index__title', '.page-intro__summary', '.case-intro__description p'].map(selector => {
      const element = document.querySelector(selector); if (!element) return null;
      const style = getComputedStyle(element);
      return { selector, family: style.fontFamily, weight: style.fontWeight, size: style.fontSize, tracking: style.letterSpacing, lineHeight: style.lineHeight, width: element.getBoundingClientRect().width };
    }).filter(Boolean),
    fonts: [...document.fonts].filter(f => f.status === 'loaded').map(f => ({ family:f.family, weight:f.weight, style:f.style })),
  }));
  records.push({ name, ...record });
  console.log('Captured', name, record.width, record.height, 'overflow', record.documentWidth - record.width);
}
try {
  await go('/', true); await capture('home-desktop');
  await page.getByRole('button', {name:'Index',exact:false}).click(); await page.waitForTimeout(650); await capture('index-desktop');
  await page.locator('.spatial-index__select').nth(1).click();
  await page.getByRole('button',{name:'Close project index'}).click(); await page.waitForTimeout(1400); await capture('selected-arcus-desktop');
  await page.getByRole('button',{name:'Overview',exact:true}).click(); await page.waitForTimeout(1100);
  await page.mouse.wheel(0,720); await page.waitForTimeout(1800); await capture('scroll-desktop');
  await page.mouse.wheel(0,-1600); await page.waitForTimeout(1800); await capture('reverse-desktop');
  await go('/about'); await capture('about-desktop');
  await go('/contact'); await capture('contact-desktop');
  await go('/work/lane'); await capture('lane-desktop');
  await go('/work/teen-fiesta'); await capture('teen-fiesta-desktop');
  await page.setViewportSize({width:390,height:844});
  await go('/',true); await capture('home-mobile');
  await go('/work/teen-fiesta'); await capture('teen-fiesta-mobile');
} finally {
  await writeFile(path.join(directory,'results.json'),JSON.stringify({base,records,errors,warnings,failed},null,2));
  await browser.close();
}
