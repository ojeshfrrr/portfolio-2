import { spawnSync } from "node:child_process";
import { copyFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (!configuredOrigin) throw new Error("Set NEXT_PUBLIC_SITE_URL to the public HTTPS address before exporting.");
const origin = new URL(configuredOrigin);
if (origin.protocol !== "https:" || origin.pathname !== "/" || origin.search || origin.hash || origin.username || origin.password) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be a public HTTPS origin without a path or credentials.");
}

const build = spawnSync(process.execPath, [join(root, "node_modules/next/dist/bin/next"), "build"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, PORTWAYS_STATIC_EXPORT: "1", NEXT_PUBLIC_SITE_URL: origin.origin },
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

const output = join(root, "out");

// Next 16.4's exporter passes Windows-relative segment paths to a helper that
// replaces forward slashes only. Preserve its output and add the flat filenames
// requested by the browser, e.g. __next.work.__PAGE__.txt.
async function segmentFiles(directory) {
  const paths = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...await segmentFiles(path));
    else if (entry.isFile() && entry.name.endsWith(".txt")) paths.push(path);
  }
  return paths;
}
async function normalizeWindowsSegments(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(directory, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of await segmentFiles(path)) {
        const suffix = relative(path, file).split(sep).join(".");
        await copyFile(file, join(directory, `${entry.name}.${suffix}`));
      }
    } else await normalizeWindowsSegments(path);
  }
}
if (process.platform === "win32") await normalizeWindowsSegments(output);

for (const page of ["index.html", "about/index.html", "contact/index.html", "work/index.html", "work/lane/index.html", "work/arcus/index.html", "work/teen-fiesta/index.html", "work/rewatch/index.html", "404.html", "robots.txt", "sitemap.xml", "work/case-studies/teen-fiesta-film.mp4"]) {
  if (!(await stat(join(output, page))).isFile()) throw new Error(`Missing exported file: ${page}`);
}

const source = spawnSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" });
if (source.status !== 0) throw new Error("Could not identify the source commit.");
await writeFile(join(output, "deployment.json"), JSON.stringify({
  sourceCommit: source.stdout.trim(),
  siteUrl: origin.origin,
  builtAt: new Date().toISOString(),
}, null, 2) + "\n");

let fileCount = 0;
let bytes = 0;
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await inspect(path);
    else if (entry.isFile()) { fileCount++; bytes += (await stat(path)).size; }
    else throw new Error(`Unexpected non-file in the export: ${entry.name}`);
  }
}
await inspect(output);
if (fileCount > 5000 || bytes > 100_000_000) throw new Error("The export exceeds Portways' 100 MB / 5,000-file source limit.");
console.log(`Portways export ready: ${fileCount} files, ${(bytes / 1_000_000).toFixed(1)} MB, ${origin.origin}`);
