/**
 * Rebuild simulator outputs from committed parsed data; no raw downloads or network.
 * Also refresh the interaction ledger outputs from committed profiles and glossary.
 * npm run build:sim -- [--dataset 16.20] [--threads 4] [--check]
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
import { coverageReport, simulatedCounterSection, simulatedJson, simulatedMatrix, simulatorReport, simulatorSection } from "../simPages";
import { simulationProvenance } from "./fingerprint";
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
    if (args[i] === "--dataset" || args[i] === "--threads") i++;
    else if (args[i] !== "--check") throw new Error(`Unknown argument ${args[i]}`);
  }
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
  console.log(`[sim] Dataset ${data.dataset}: ${ids.length} kits, ${pairs.length} matchups, ${threads} workers`);
  const started = Date.now();
  const checkpoint = { directory: path.join(REPO_ROOT, ".cache", "sim", data.dataset, provenance.fingerprint), fingerprint: provenance.fingerprint };
  const results: PairResult[] = [];
  const pending: number[] = [];
  for (const [index, pair] of pairs.entries()) {
    const saved = await readCheckpoint(checkpoint, data.dataset, DEFAULT_BUDGET, pair);
    if (saved) results.push({ ...saved, index });
    else pending.push(index);
  }
  const resumed = results.length;
  if (resumed > 0) console.log(`[sim] Resuming ${resumed}/${pairs.length} verified checkpoints`);
  let nextProgress = resumed + 50;
  if (pending.length > 0) {
    const fresh = await simulatePairs(data.dataset, DEFAULT_BUDGET, pending.map((index) => pairs[index]!), threads, (completed) => {
      const totalCompleted = resumed + completed;
      if (totalCompleted < nextProgress && totalCompleted < pairs.length) return;
      console.log(`[sim] ${totalCompleted}/${pairs.length} matchups computed in ${((Date.now() - started) / 1000).toFixed(1)} s`);
      nextProgress = totalCompleted + 50;
    }, checkpoint);
    results.push(...fresh.map((result) => ({ ...result, index: pending[result.index]! })));
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
  outputs.set(path.join(dir, "simulated.json"), simulatedJson(data.dataset, data.patch, matrix, provenance));
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
  console.log(`[sim] Refreshed ${outputs.size} simulator and ledger files in ${((Date.now() - started) / 1000).toFixed(1)} s; parsed source data and profiles preserved.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
