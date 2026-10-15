import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const outputDir = "D:/projects/second_pf/qa/visual-checks-2026-10-15";
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--enable-webgl", "--ignore-gpu-blocklist", "--use-gl=angle", "--use-angle=swiftshader"],
});
const report = { browser: "Google Chrome", url: "http://127.0.0.1:3000/", baseline: {}, reducedMotion: {}, errors: [] };
const listen = (page, label) => {
  page.on("pageerror", error => report.errors.push({ page: label, type: "pageerror", message: error.message }));
  page.on("console", message => { if (message.type() === "error") report.errors.push({ page: label, type: "console", message: message.text() }); });
  page.on("requestfailed", request => report.errors.push({ page: label, type: "requestfailed", url: request.url(), error: request.failure()?.errorText }));
};
const observe = page => page.evaluate(() => ({
  matches: matchMedia("(prefers-reduced-motion: reduce)").matches,
  sceneReady: document.querySelector(".spatial-webgl")?.classList.contains("is-ready") ?? false,
  canvasCount: document.querySelectorAll(".spatial-stage canvas").length,
  fallbackHidden: document.querySelector(".spatial-fallback")?.classList.contains("is-hidden") ?? false,
  pinSpacers: document.querySelectorAll(".pin-spacer").length,
  heroPosition: getComputedStyle(document.querySelector(".spatial-hero")).position,
}));
try {
  const baselineContext = await browser.newContext({ viewport: { width: 1680, height: 900 }, deviceScaleFactor: 1, reducedMotion: "no-preference" });
  const baseline = await baselineContext.newPage();
  listen(baseline, "no-preference");
  await baseline.goto(report.url, { waitUntil: "networkidle", timeout: 60000 });
  await baseline.evaluate(() => document.fonts.ready);
  await baseline.waitForTimeout(2500);
  report.baseline = await observe(baseline);
  await baselineContext.close();

  const reducedContext = await browser.newContext({ viewport: { width: 1680, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const reduced = await reducedContext.newPage();
  listen(reduced, "reduced-motion");
  await reduced.goto(report.url, { waitUntil: "networkidle", timeout: 60000 });
  await reduced.evaluate(() => document.fonts.ready);
  await reduced.waitForTimeout(2500);
  const initial = await observe(reduced);
  await reduced.mouse.move(840, 450);
  await reduced.mouse.wheel(0, 620);
  await reduced.waitForTimeout(250);
  const afterScroll = await reduced.evaluate(() => ({ scrollY: Math.round(scrollY), heroTop: Math.round(document.querySelector(".spatial-hero").getBoundingClientRect().top), pinSpacers: document.querySelectorAll(".pin-spacer").length }));
  report.reducedMotion = {
    ...initial,
    afterScroll,
    enabledFromInitialLoad: initial.matches,
    sceneAvailableForFairComparison: report.baseline.sceneReady && initial.sceneReady,
    pinSuppressedComparedToBaseline: report.baseline.pinSpacers > 0 && initial.pinSpacers === 0,
    naturalScrollWorks: afterScroll.scrollY > 0 && afterScroll.pinSpacers === 0,
  };
  await reducedContext.close();
  await fs.writeFile(path.join(outputDir, "reduced-motion-results.json"), JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
