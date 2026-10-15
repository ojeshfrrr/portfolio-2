import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { createFiberTimerClock } from "./fiber-timer-clock.mjs";

// A deliberately narrow, reproducible compatibility patch. Fail on dependency
// upgrades rather than silently patching a different renderer implementation.
const require = createRequire(import.meta.url);
const root = dirname(require.resolve("@react-three/fiber/package.json"));
const { version } = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
if (version !== "9.8.1") throw new Error(`Review the Timer compatibility patch for R3F ${version}.`);
for (const [file, namespace] of [
  ["events-9ce18a08.esm.js", "THREE"],
  ["events-21d8cd92.cjs.dev.js", "THREE__namespace"],
  ["events-a816cbab.cjs.prod.js", "THREE__namespace"],
]) {
  const path = join(root, "dist", file);
  const source = await readFile(path, "utf8");
  if (source.includes("function createFiberTimerClock(")) continue;
  const original = `new ${namespace}.Clock()`;
  if (source.split(original).length !== 2) throw new Error(`Unexpected Clock implementation in ${file}`);
  await writeFile(path, source.replace(original, `(${createFiberTimerClock.toString()})(${namespace})`));
}
console.log("R3F 9.8.1: Timer compatibility patch applied.");
