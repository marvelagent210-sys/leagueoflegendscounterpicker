/**
 * The build matrix (PLAN.md §13, M8): every pairing played with the item builds the build search
 * finds for its two sides, instead of plain stats. Writes data/<dataset>/simulated-builds.json
 * and reports/builds.md from committed parsed data; no downloads.
 *
 *   npm run build:builds -- [--dataset 16.20] [--threads 4] [--format sixItems] [--smoke] [--check]
 *
 * Each pairing is checkpointed as it finishes (.cache/builds/), so that a run that stops resumes
 * where it was. A pairing that fails is reported and the rest go on; nothing is written until
 * every pairing has a result. `--smoke` plays each kit against the next one only (173
 * pairings, kept for the full run), to find failures before the full run's hours. `--check`
 * verifies that the committed file is the current inputs' (buildsProvenance).
 */
import { readFile, rename, rm, writeFile } from "node:fs/promises";
import { availableParallelism } from "node:os";
import path from "node:path";
import { Worker } from "node:worker_threads";
import { type PrecomputedBuilds, type SimulationProvenance, precomputedBuildsCurrent } from "../../engine/sim/precomputed";
import { SCENARIOS } from "../../engine/sim/scenarios";
import { KITS } from "../../kits/champions/index";
import { REPO_ROOT, datasetDir } from "../config";
import { BUILD_FORMATS, type BuildFormat } from "../items/rules";
import { loadSimData } from "../simData";
import { type BuildsCheckpointContext, type BuildsPairResult, readBuildsCheckpoint } from "./buildsCheckpoint";
import type { BuildsMessage, BuildsTask } from "./buildsWorker";
import { buildsProvenance } from "./fingerprint";

export const BUILDS_FILE = "simulated-builds.json";

interface Failure {
  index: number;
  pair: [string, string];
  message: string;
}

/** Plays `pairs` across worker threads; each share goes to one worker, and failures don't stop the others. */
async function playPairs(task: Omit<BuildsTask, "pairs">, pairs: Array<[string, string]>, threads: number, onProgress: (completed: number) => void): Promise<{ results: BuildsPairResult[]; failures: Failure[] }> {
  const count = Math.max(1, Math.min(threads, pairs.length));
  const shares: Array<Array<[number, string, string]>> = Array.from({ length: count }, () => []);
  pairs.forEach(([you, enemy], index) => shares[index % count]!.push([index, you, enemy]));
  const completed = shares.map(() => 0);
  const failures: Failure[] = [];
  const workers: Worker[] = [];
  try {
    const parts = await Promise.all(
      shares.map(
        (share, shareIndex) =>
          new Promise<BuildsPairResult[]>((resolve, reject) => {
            const worker = new Worker(new URL("./buildsWorker.mjs", import.meta.url), { workerData: { ...task, pairs: share } satisfies BuildsTask });
            workers.push(worker);
            let done = false;
            worker.on("message", (message: BuildsMessage) => {
              if (done) return;
              if ("completed" in message) {
                completed[shareIndex] = message.completed;
                onProgress(completed.reduce((sum, value) => sum + value, 0));
              } else if ("failed" in message) {
                failures.push(message.failed);
                console.error(`[builds] FAILED ${message.failed.pair.join(" vs ")}: ${message.failed.message}`);
              } else {
                done = true;
                resolve(message.results);
              }
            });
            worker.once("error", (error) => {
              if (!done) {
                done = true;
                reject(error);
              }
            });
            worker.once("exit", (code) => {
              if (!done) {
                done = true;
                reject(new Error(`Build matrix worker stopped (exit code ${code}) before sending its results`));
              }
            });
          }),
      ),
    );
    return { results: parts.flat().sort((a, b) => a.index - b.index), failures };
  } finally {
    await Promise.allSettled(workers.map((worker) => worker.terminate()));
  }
}

/** simulated-builds.json: one line per champion for its scores, and one for its builds. */
export function simulatedBuildsJson(dataset: string, patch: string, format: string, ids: string[], pairs: Array<[string, string]>, results: BuildsPairResult[], simulation: SimulationProvenance): string {
  const scores = new Map(ids.map((id) => [id, new Map<string, Array<number | null>>()]));
  const builds = new Map(ids.map((id) => [id, new Map<string, string[]>()]));
  const variants = new Map<string, Map<string, Record<string, number>>>();
  const negate = (v: number | null) => (v === null ? null : v === 0 ? 0 : -v);
  results.forEach((result, i) => {
    const [you, enemy] = pairs[i]!;
    if (result.index !== i) throw new Error("Build matrix results out of order");
    const [engage, engaged, ...rest] = result.scenarios;
    scores.get(you)!.set(enemy, [result.score, ...result.scenarios]);
    scores.get(enemy)!.set(you, [negate(result.score), negate(engaged ?? null), negate(engage ?? null), ...rest.map(negate)]);
    builds.get(you)!.set(enemy, result.builds[0]);
    builds.get(enemy)!.set(you, result.builds[1]);
    for (const variant of result.variants ?? []) {
      const [who, against] = variant.side === 0 ? [you, enemy] : [enemy, you];
      if (!variants.has(who)) variants.set(who, new Map());
      variants.get(who)!.set(against, variant.options);
    }
  });
  const items = [...new Set([...builds.values()].flatMap((row) => [...row.values()].flat()))].sort();
  const index = new Map(items.map((item, i) => [item, i]));
  const round = (v: number | null) => (v === null ? null : Math.round(v * 1000) / 1000);
  const byEnemy = <T>(row: Map<string, T>, value: (v: T) => unknown) => JSON.stringify(Object.fromEntries([...row].sort(([a], [b]) => a.localeCompare(b)).map(([enemy, v]) => [enemy, value(v)])));
  const scoreLines = ids.map((you) => `    ${JSON.stringify(you)}: ${byEnemy(scores.get(you)!, (values) => values.map((value, i) => (i === 0 ? value : round(value))))}`);
  const buildLines = ids.map((you) => `    ${JSON.stringify(you)}: ${byEnemy(builds.get(you)!, (names) => names.map((name) => index.get(name)!))}`);
  const variantLines = [...variants].sort(([a], [b]) => a.localeCompare(b)).map(([who, row]) => `    ${JSON.stringify(who)}: ${byEnemy(row, (options) => options)}`);
  return [
    "{",
    `  "dataset": ${JSON.stringify(dataset)},`,
    `  "patch": ${JSON.stringify(patch)},`,
    `  "format": ${JSON.stringify(format)},`,
    `  "simulation": ${JSON.stringify(simulation)},`,
    `  "values": ${JSON.stringify(["score", ...SCENARIOS])},`,
    `  "items": ${JSON.stringify(items)},`,
    "  \"matchups\": {",
    scoreLines.join(",\n"),
    "  },",
    "  \"builds\": {",
    buildLines.join(",\n"),
    `  }${variantLines.length ? `,\n  "variants": {\n${variantLines.join(",\n")}\n  }` : ""}`,
    "}",
    "",
  ].join("\n");
}

/** reports/builds.md: how the run went, and each champion's items across its matchups. */
export function buildsReport(patch: string, format: string, ids: string[], pairs: Array<[string, string]>, results: BuildsPairResult[], names: Map<string, string>): string {
  const counts = new Map(ids.map((id) => [id, new Map<string, number>()]));
  results.forEach((result, i) => {
    const [you, enemy] = pairs[i]!;
    for (const [who, build] of [[you, result.builds[0]], [enemy, result.builds[1]]] as const) for (const item of build) counts.get(who)!.set(item, (counts.get(who)!.get(item) ?? 0) + 1);
  });
  const total = new Map<string, number>();
  for (const row of counts.values()) for (const [item, n] of row) total.set(item, (total.get(item) ?? 0) + n);
  const seconds = results.reduce((sum, result) => sum + result.seconds, 0);
  const builds = 2 * results.length;
  const name = (id: string) => names.get(id) ?? id;
  const top = (row: Map<string, number>, n: number, of: number) => [...row].sort(([a, x], [b, y]) => y - x || a.localeCompare(b)).slice(0, n).map(([item, k]) => `${item} ${Math.round((100 * k) / of)}%`).join(", ");
  return [
    "# Build matrix",
    "",
    `Patch ${patch}, ${BUILD_FORMATS[format as BuildFormat]?.label ?? format}. Generated by \`npm run build:builds\` (PLAN.md §13, M8): every pairing played with the item builds the build search finds for its two sides.`,
    "",
    `${results.length} pairings in ${(seconds / 3600).toFixed(1)} processor-hours (${(seconds / results.length).toFixed(1)} s each on average).`,
    "",
    "## Items across all builds",
    "",
    `Share of the ${builds} builds holding each item: ${top(total, 25, builds)}.`,
    "",
    "## Each champion's items",
    "",
    "Share of the champion's matchups holding each item, its eight most frequent.",
    "",
    "| Champion | Items |",
    "| --- | --- |",
    ...ids.map((id) => `| ${name(id)} | ${top(counts.get(id)!, 8, ids.length - 1)} |`),
    "",
  ].join("\n");
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const value = (flag: string) => {
    const index = args.indexOf(flag);
    if (index < 0) return undefined;
    const found = args[index + 1];
    if (!found || found.startsWith("--")) throw new Error(`${flag} requires a value`);
    return found;
  };
  for (let i = 0; i < args.length; i++) {
    if (["--dataset", "--threads", "--format"].includes(args[i]!)) i++;
    else if (args[i] !== "--check" && args[i] !== "--smoke") throw new Error(`Unknown argument ${args[i]}`);
  }
  const threads = Number(value("--threads") ?? Math.min(4, availableParallelism()));
  if (!Number.isSafeInteger(threads) || threads < 1) throw new Error("--threads must be a positive integer");
  const format = (value("--format") ?? "sixItems") as BuildFormat;
  if (!(format in BUILD_FORMATS)) throw new Error(`--format takes one of: ${Object.keys(BUILD_FORMATS).join(", ")}`);
  const data = await loadSimData(value("--dataset"));
  const dir = datasetDir(data.dataset);
  const ids = Object.keys(KITS).sort();
  const provenance = await buildsProvenance(data.dataset);
  if (args.includes("--check")) {
    const file = JSON.parse(await readFile(path.join(dir, BUILDS_FILE), "utf8")) as PrecomputedBuilds;
    if (!precomputedBuildsCurrent(file, data.dataset, data.patch, provenance.fingerprint, format, ids)) throw new Error("The build matrix is stale, incomplete or lacks provenance. Run npm run build:builds to refresh it.");
    console.log(`[builds] Dataset ${data.dataset}: the build matrix matches ${provenance.fingerprint}`);
    return;
  }
  const all: Array<[string, string]> = ids.flatMap((you, i) => ids.slice(i + 1).map((enemy): [string, string] => [you, enemy]));
  const smoke = args.includes("--smoke");
  const pairs = smoke ? ids.slice(0, -1).map((id, i): [string, string] => [id, ids[i + 1]!]) : all;
  const checkpoint: BuildsCheckpointContext = { directory: path.join(REPO_ROOT, ".cache", "builds", data.dataset, format, provenance.fingerprint), fingerprint: provenance.fingerprint, format };
  console.log(`[builds] Dataset ${data.dataset}: ${ids.length} kits, ${pairs.length} pairings${smoke ? " (smoke: each kit against the next)" : ""}, ${threads} workers, inputs ${provenance.fingerprint.slice(0, 8)}`);
  const started = Date.now();
  const saved = new Map<number, BuildsPairResult>();
  const pending: number[] = [];
  for (const [index, pair] of pairs.entries()) {
    const result = await readBuildsCheckpoint(checkpoint, data.dataset, pair);
    if (result) saved.set(index, { ...result, index });
    else pending.push(index);
  }
  if (saved.size) console.log(`[builds] Resuming: ${saved.size}/${pairs.length} pairings checkpointed`);
  let next = saved.size + 25;
  const { results, failures } = pending.length
    ? await playPairs({ dataset: data.dataset, format, checkpoint }, pending.map((index) => pairs[index]!), threads, (done) => {
        const total = saved.size + done;
        if (total < next && total < pairs.length) return;
        const elapsed = (Date.now() - started) / 1000;
        const left = done > 0 ? ((pending.length - done) * elapsed) / done : 0;
        console.log(`[builds] ${total}/${pairs.length} pairings in ${(elapsed / 60).toFixed(1)} min, about ${(left / 3600).toFixed(1)} h left`);
        next = total + 25;
      })
    : { results: [], failures: [] };
  for (const result of results) saved.set(pending[result.index]!, { ...result, index: pending[result.index]! });
  if (failures.length) {
    console.error(`[builds] ${failures.length} pairings failed; nothing written. Fix them and run again: the other ${saved.size} are checkpointed.`);
    process.exitCode = 1;
    return;
  }
  if (smoke) {
    console.log(`[builds] Smoke run: ${saved.size} pairings played without failures in ${((Date.now() - started) / 60000).toFixed(1)} min; their checkpoints count for the full run.`);
    return;
  }
  const ordered = pairs.map((_, index) => saved.get(index)!);
  // A long run must never stamp new source revisions onto old calculations.
  if ((await buildsProvenance(data.dataset)).fingerprint !== provenance.fingerprint) throw new Error("The build matrix's inputs changed during the run. Nothing was written; its checkpoints stay under the old inputs.");
  const names = new Map(data.champions.map((champion) => [champion.id, champion.name]));
  const outputs = new Map([
    [path.join(dir, BUILDS_FILE), simulatedBuildsJson(data.dataset, data.patch, format, ids, pairs, ordered, provenance)],
    [path.join(dir, "reports", "builds.md"), buildsReport(data.patch, format, ids, pairs, ordered, names)],
  ]);
  for (const [file, content] of outputs) {
    const temporary = `${file}.${process.pid}.tmp`;
    try {
      await writeFile(temporary, content, "utf8");
      await rename(temporary, file);
    } finally {
      await rm(temporary, { force: true });
    }
  }
  console.log(`[builds] Wrote ${BUILDS_FILE} and reports/builds.md: ${pairs.length} pairings, ${((Date.now() - started) / 3600000).toFixed(1)} h.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
