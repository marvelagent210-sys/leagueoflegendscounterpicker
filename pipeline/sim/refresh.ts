/**
 * Rebuild simulator outputs from committed parsed data; no raw downloads or network.
 * Also refresh the interaction ledger outputs from committed profiles and glossary.
 * npm run build:sim -- [--dataset 16.20] [--threads 4] [--check] [--plan] [--shard i/N] [--recompute A,B]
 *
 * Incremental (PLAN.md §13): a pairing whose inputs (pairKeys.ts) equal a stored result's, in
 * this dataset's simulated.json or the previous dataset's, isn't computed again; the rest are,
 * and checkpointed as they finish (.cache/sim/), so that a stopped run resumes. `--plan` prints
 * how many pairings would be computed, as JSON, and writes nothing. `--shard i/N` computes only
 * the i-th of N even shares of those pairings, into checkpoints, and writes nothing else: shards
 * run on separate machines, and a final run without --shard reads their checkpoints back and
 * writes the outputs (.github/workflows/refresh.yml). `--recompute` computes the pairings of the
 * champions named again, whatever is stored: a check that a refresh reproduces its results.
 */
import { readFile, rename, rm, writeFile } from "node:fs/promises";
import { availableParallelism } from "node:os";
import path from "node:path";
import { DEFAULT_BUDGET } from "../../engine/budget";
import { rankCounters } from "../../engine/ledger/index";
import type { Glossary } from "../../engine/glossary";
import type { CompiledKit } from "../../engine/kits/compile";
import { precomputedCurrent, type PrecomputedMatchups } from "../../engine/sim/precomputed";
import { KITS } from "../../kits/champions/index";
import { GOLDEN } from "../../tests/golden/matchups";
import { datasetDir, REPO_ROOT } from "../config";
import { loadKit } from "../kitData";
import { loadLedgerData } from "../ledgerData";
import { counterPage, ledgerReport } from "../ledgerPages";
import { loadSimData } from "../simData";
import { coverageReport, simulatedCounterSection, simulatedJson, simulatedMatrix, simulatedSpentJson, simulatorReport, simulatorSection } from "../simPages";
import { simulationProvenance } from "./fingerprint";
import { pairInputs } from "./pairKeys";
import { SPENT_FILE, parseRecompute, parseShard, plainStores, reusable, reuseSummary, shardOf } from "./reuse";
import { type PairResult, simulatePairs } from "./pool";
import { readCheckpoint } from "./checkpoint";
import { replaceSimulatorSection } from "./sections";

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
    if (args[i] === "--dataset" || args[i] === "--threads" || args[i] === "--shard" || args[i] === "--recompute") i++;
    else if (args[i] !== "--check" && args[i] !== "--plan") throw new Error(`Unknown argument ${args[i]}`);
  }
  const shard = parseShard(value("--shard"));
  const plan = args.includes("--plan");
  const log = (message: string) => {
    if (!plan) console.log(message);
  };
  const threads = Number(value("--threads") ?? Math.min(4, availableParallelism()));
  if (!Number.isSafeInteger(threads) || threads < 1) throw new Error("--threads must be a positive integer");
  const data = await loadSimData(value("--dataset"));
  const dir = datasetDir(data.dataset);
  const provenance = await simulationProvenance(data.dataset);
  if (args.includes("--check")) {
    const file = JSON.parse(await readFile(path.join(dir, "simulated.json"), "utf8")) as PrecomputedMatchups;
    if (!precomputedCurrent(file, data.dataset, data.patch, provenance.fingerprint, DEFAULT_BUDGET, Object.keys(KITS))) throw new Error("Precomputed duels are stale, incomplete or lack provenance. Run npm run build:sim to refresh them.");
    console.log(`[sim] Dataset ${data.dataset}: precomputed inputs match ${provenance.fingerprint}`);
    return;
  }
  const compiled = new Map<string, CompiledKit>();
  for (const id of Object.keys(KITS).sort()) {
    const champion = data.champions.find((champion) => champion.id === id);
    if (!champion) throw new Error(`Simulator kit for unknown champion ${id}`);
    const kit = await loadKit(data.dataset, champion);
    if (!kit) throw new Error(`No simulator kit for ${id}`);
    compiled.set(id, kit);
  }
  const ids = [...compiled.keys()];
  const pairs: Array<[string, string]> = ids.flatMap((you, i) => ids.slice(i + 1).map((enemy): [string, string] => [you, enemy]));
  log(`[sim] Dataset ${data.dataset}: ${ids.length} kits, ${pairs.length} matchups, ${threads} workers${shard ? `, shard ${shard.index + 1} of ${shard.count}` : ""}`);
  const started = Date.now();
  // Pairings computed before from the same inputs stand; the rest are this run's to compute.
  const inputs = await pairInputs(data.dataset, "sim");
  const reuse = reusable(pairs, inputs, await plainStores(data.dataset), parseRecompute(value("--recompute"), ids));
  const toCompute = pairs.map((_, index) => index).filter((index) => !reuse.results.has(index));
  if (plan) {
    console.log(JSON.stringify({ dataset: data.dataset, pairings: pairs.length, reused: reuse.results.size, pending: toCompute.length }));
    return;
  }
  log(`[sim] ${reuseSummary(pairs.length, reuse.from)}`);
  const mine = shardOf(toCompute, shard);
  const checkpoint = { directory: path.join(REPO_ROOT, ".cache", "sim", data.dataset, provenance.fingerprint), fingerprint: provenance.fingerprint };
  const results: PairResult[] = [...reuse.results].map(([index, result]) => ({ ...result, index }));
  const pending: number[] = [];
  let resumed = 0;
  for (const index of mine) {
    const saved = await readCheckpoint(checkpoint, data.dataset, DEFAULT_BUDGET, pairs[index]!);
    if (saved) {
      results.push({ ...saved, index });
      resumed++;
    } else pending.push(index);
  }
  if (resumed > 0) log(`[sim] Resuming ${resumed}/${mine.length} verified checkpoints`);
  let nextProgress = resumed + 50;
  if (pending.length > 0) {
    const fresh = await simulatePairs(data.dataset, DEFAULT_BUDGET, pending.map((index) => pairs[index]!), threads, (completed) => {
      const totalCompleted = resumed + completed;
      if (totalCompleted < nextProgress && totalCompleted < mine.length) return;
      log(`[sim] ${totalCompleted}/${mine.length} matchups computed in ${((Date.now() - started) / 1000).toFixed(1)} s`);
      nextProgress = totalCompleted + 50;
    }, checkpoint);
    results.push(...fresh.map((result) => ({ ...result, index: pending[result.index]! })));
  }
  if (shard) {
    log(`[sim] Shard ${shard.index + 1} of ${shard.count}: ${mine.length} matchups checkpointed in ${((Date.now() - started) / 1000).toFixed(1)} s; a run without --shard writes the outputs.`);
    return;
  }
  const matrix = simulatedMatrix(ids, DEFAULT_BUDGET, pairs, results.sort((a, b) => a.index - b.index));
  const names = new Map(data.champions.map((champion) => [champion.id, champion.name]));
  const outputs = new Map<string, string>();
  for (const [id, kit] of compiled) {
    const kitFile = path.join(dir, "kits", `${id}.md`);
    outputs.set(kitFile, replaceSimulatorSection(await readFile(kitFile, "utf8"), "## Duel simulator kit", simulatorSection(kit)));
  }
  const ledger = await loadLedgerData(data.dataset);
  const rankings = ledger.kits.map((enemy) => rankCounters(enemy, ledger.kits, ledger.ctx));
  for (const ranking of rankings) {
    const section = compiled.has(ranking.enemy) ? simulatedCounterSection(ranking.enemy, matrix, names) : [];
    outputs.set(path.join(dir, "counters", `${ranking.enemy}.md`), counterPage(ranking, names, data.patch, section));
  }
  const rankingLines = rankings.map((ranking) => `    ${JSON.stringify(ranking.enemy)}: ${JSON.stringify(ranking.ranking.map((row) => [row.champion, row.net]))}`);
  outputs.set(path.join(dir, "rankings.json"), `{\n  "dataset": ${JSON.stringify(data.dataset)},\n  "patch": ${JSON.stringify(data.patch)},\n  "confidence": "partial",\n  "rankings": {\n${rankingLines.join(",\n")}\n  }\n}\n`);
  const glossary = JSON.parse(await readFile(path.join(dir, "glossary.json"), "utf8")) as Glossary;
  const ledgerFile = path.join(dir, "reports", "ledger.md");
  const originalLedger = (await readFile(ledgerFile, "utf8")).split("\n");
  const descriptionStart = originalLedger.findIndex((line) => line.startsWith("## Effects read only from descriptions"));
  if (descriptionStart < 0) throw new Error("Existing ledger report has no description evidence section");
  const descriptionEnd = originalLedger.findIndex((line, index) => index > descriptionStart && line.startsWith("## "));
  const descriptions = originalLedger.slice(descriptionStart, descriptionEnd < 0 ? undefined : descriptionEnd);
  const freshLedger = ledgerReport(data.patch, glossary, ledger.kits, rankings, names).replace("Generated by `npm run build:data`.", "Generated by `npm run build:data` or refreshed by `npm run build:sim`.");
  // Profiles are unchanged: retain the original pipeline's description-only source evidence.
  outputs.set(ledgerFile, replaceSimulatorSection(freshLedger, "## Effects read only from descriptions", descriptions));
  outputs.set(path.join(dir, "reports", "simulator.md"), simulatorReport(data.patch, matrix, names, GOLDEN));
  outputs.set(path.join(dir, "reports", "coverage.md"), coverageReport(data.champions, compiled));
  outputs.set(path.join(dir, "simulated.json"), simulatedJson(data.dataset, data.patch, matrix, provenance, inputs));
  outputs.set(path.join(dir, SPENT_FILE), simulatedSpentJson(data.dataset, data.patch, matrix, provenance));
  // A long refresh must never stamp new source revisions onto old calculations.
  if ((await simulationProvenance(data.dataset)).fingerprint !== provenance.fingerprint) {
    await rm(checkpoint.directory, { recursive: true, force: true });
    throw new Error("Simulator inputs changed during the refresh. No generated files were written and its checkpoints were discarded; retry after edits finish.");
  }
  for (const [file, content] of outputs) {
    const temporary = `${file}.${process.pid}.tmp`;
    try {
      await writeFile(temporary, content, "utf8");
      await rename(temporary, file);
    } finally {
      await rm(temporary, { force: true });
    }
  }
  console.log(`[sim] Refreshed ${outputs.size} simulator and ledger files in ${((Date.now() - started) / 1000).toFixed(1)} s (${reuse.results.size} of ${pairs.length} matchups reused); parsed source data and profiles preserved.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
