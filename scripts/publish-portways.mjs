import { spawnSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const branch = "codex/portways-static";
function run(args, options = {}) {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8", ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || `Git failed: ${args[0]}`);
  return (result.stdout ?? "").trim();
}

if (run(["status", "--porcelain"])) throw new Error("Commit the source changes before publishing an export.");
const remote = run(["remote", "get-url", "origin"]);
const built = spawnSync(process.execPath, [join(root, "scripts/build-portways.mjs")], { cwd: root, stdio: "inherit", env: process.env });
if (built.error) throw built.error;
if (built.status !== 0) process.exit(built.status ?? 1);

// Keep deployment Git data outside out/: Next regenerates out/ on every export.
const gitDirectory = join(root, "build/portways/.git");
await mkdir(dirname(gitDirectory), { recursive: true });
run(["init", "--quiet", "--initial-branch", branch, dirname(gitDirectory)]);
const git = [`--git-dir=${gitDirectory}`, `--work-tree=${join(root, "out")}`];
run([...git, "config", "remote.origin.url", remote]);
run([...git, "config", "remote.origin.fetch", "+refs/heads/*:refs/remotes/origin/*"]);
if (run(["ls-remote", "--heads", "origin", `refs/heads/${branch}`])) {
  run([...git, "fetch", "--quiet", "--depth=1", "origin", branch]);
  run([...git, "update-ref", `refs/heads/${branch}`, run([...git, "rev-parse", "FETCH_HEAD"])]);
}
run([...git, "symbolic-ref", "HEAD", `refs/heads/${branch}`]);
run([...git, "add", "--all", "--", "."], { cwd: join(root, "out") });
run([...git, "commit", "--quiet", "-m", `deploy: export portfolio from ${run(["rev-parse", "--short", "HEAD"])}`]);
run([...git, "push", "--set-upstream", "origin", `HEAD:refs/heads/${branch}`], { stdio: "inherit" });
console.log(`Published the static site on ${branch}. Portways can deploy this branch without a build step.`);
