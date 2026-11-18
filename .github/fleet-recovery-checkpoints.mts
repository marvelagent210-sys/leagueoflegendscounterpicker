/** One-off Fleet repair. Compute the lost original shard plus corrected Nunu pairs. */
import { strict as assert } from "node:assert";
import { Worker } from "node:worker_threads";
import path from "node:path";
import { DEFAULT_BUDGET } from "../engine/budget";
import { KITS } from "../kits/champions/index";
import { readBuildsCheckpoint } from "../pipeline/sim/buildsCheckpoint";
import type { BuildsMessage, BuildsTask } from "../pipeline/sim/buildsWorker";
import { readCheckpoint } from "../pipeline/sim/checkpoint";
import { buildsProvenance, simulationProvenance } from "../pipeline/sim/fingerprint";
import { simulatePairs } from "../pipeline/sim/pool";

const [kind, shardText, option] = process.argv.slice(2);
const shard = Number(shardText);
assert(shardText && Number.isSafeInteger(shard));
assert(option === undefined || option === "--plan");
assert(kind === "sim" && shard === 0 || kind === "builds" && shard >= 0 && shard < 6);
assert.equal(process.version, "v22.22.0");
const dataset = "16.21", format = "sixItems";
const ids = Object.keys(KITS).sort();
const pairs: [string, string][] = ids.flatMap((left, index) => ids.slice(index + 1).map(right => [left, right]));
assert.equal(pairs.length, 14878);
const indexed = pairs.map((pair, index) => ({ pair, index }));
const sim = indexed.filter(({ pair }) => pair.includes("Nunu"));
const builds = indexed.filter(({ index, pair }) => index % 15 === 10 || pair.includes("Nunu"));
assert.equal(sim.length, 172);
assert.equal(builds.length, 1146);
const mining = kind === "sim" ? sim : builds.filter((_, offset) => offset % 6 === shard);
assert.equal(mining.length, kind === "sim" ? 172 : 191);

const provenance = await (kind === "sim" ? simulationProvenance : buildsProvenance)(dataset);
const expected = kind === "sim" ? "938c402afd35e3ee117121d62d520947ae0fff92f8b119fcb508c10e2b7a8b20"
  : "3855baf10ef7164838cd8c1393cec3876c85af47555e635d41482460efa584ae";
assert.equal(provenance.fingerprint, expected, "Recovery workers must run on the fixed simulator inputs");
const checkpoint = { directory: path.resolve(".cache", kind, dataset, ...(kind === "builds" ? [format] : []), expected), fingerprint: expected, format };
console.log(JSON.stringify({ dataset, kind, shard, fingerprint: expected, pairings: mining.length, node: process.version }));
if (option === "--plan") process.exit(0);

const threads = 4;
if (kind === "sim") {
  const results = await simulatePairs(dataset, DEFAULT_BUDGET, mining.map(({ pair }) => pair), threads, (completed, total) => {
    if (completed % 25 === 0 || completed === total) console.log(`[sim] ${completed}/${total}`);
  }, checkpoint);
  assert.equal(results.length, mining.length);
  for (const { pair } of mining) assert(await readCheckpoint(checkpoint, dataset, DEFAULT_BUDGET, pair));
} else {
  const tasks: BuildsTask["pairs"][] = Array.from({ length: threads }, () => []);
  mining.forEach(({ index, pair }, offset) => tasks[offset % threads]!.push([index, ...pair]));
  let completed = 0;
  const outcomes = await Promise.allSettled(tasks.map(share => new Promise<void>((resolve, reject) => {
    const worker = new Worker(new URL("../pipeline/sim/buildsWorker.mjs", import.meta.url), {
      workerData: { dataset, format, pairs: share, checkpoint } satisfies BuildsTask,
    });
    let failures = 0, results = 0;
    worker.on("message", (message: BuildsMessage) => {
      if ("failed" in message) {
        failures++;
        console.error(JSON.stringify(message.failed));
      } else if ("completed" in message) {
        completed++;
        if (completed % 25 === 0 || completed === mining.length) console.log(`[builds] ${completed}/${mining.length}`);
      } else {
        results = message.results.length;
      }
    });
    worker.on("error", reject);
    worker.on("exit", code => {
      if (code !== 0 || failures || results !== share.length) reject(new Error("Recovery worker has incomplete results"));
      else resolve();
    });
  })));
  const failed = outcomes.find(outcome => outcome.status === "rejected");
  if (failed) throw failed.reason;
  for (const { pair } of mining) assert(await readBuildsCheckpoint(checkpoint, dataset, pair));
}
console.log(`Verified ${mining.length} corrected ${kind} checkpoints.`);
