/**
 * A worker thread of the build matrix (builds.ts): its share of the pairings, each with the
 * build search (pipeline/items/search.ts) for both sides' default kits. A side with kit
 * variants (Udyr's rank splits) then plays each of them with the builds found, and the sides
 * choose by Udyr's rule, as the duel command does. A pairing that fails is reported and the
 * rest go on, so that a long run keeps what it can.
 */
import { parentPort, workerData } from "node:worker_threads";
import type { KitVariant, MatchupVariant } from "../../engine/sim/matchup";
import { type MatchupResult, runScenarios } from "../../engine/sim/scenarios";
import type { FighterSpec } from "../../engine/sim/spec";
import { matchupSpecs } from "../../items/equip";
import { chooseRoutes, names, searchMatchup } from "../items/search";
import type { BuildFormat } from "../items/rules";
import { equipBuild, equipOptions, loadItemCatalog } from "../itemData";
import { loadFighter, loadVariants } from "../kitData";
import { findChampion, loadSimData } from "../simData";
import { type BuildsCheckpointContext, type BuildsPairResult, writeBuildsCheckpoint } from "./buildsCheckpoint";

export interface BuildsTask {
  dataset: string;
  format: BuildFormat;
  /** [index, you, enemy] */
  pairs: Array<[number, string, string]>;
  checkpoint?: BuildsCheckpointContext;
}

/** Messages to the main thread: progress, a pairing that failed, or the share's results. */
export type BuildsMessage = { completed: number } | { failed: { index: number; pair: [string, string]; message: string } } | { results: BuildsPairResult[] };

const task = workerData as BuildsTask;
const data = await loadSimData(task.dataset);
const catalog = await loadItemCatalog(data.dataset);
const equip = equipOptions(catalog);
const defaults = new Map<string, FighterSpec>();
const variants = new Map<string, KitVariant[]>();

async function fighter(id: string): Promise<{ spec: FighterSpec; variants: KitVariant[] }> {
  if (!defaults.has(id)) {
    const champion = findChampion(data.champions, id);
    defaults.set(id, (await loadFighter(data.dataset, champion)).spec);
    variants.set(id, await loadVariants(data.dataset, champion));
  }
  return { spec: defaults.get(id)!, variants: variants.get(id)! };
}

const results: BuildsPairResult[] = [];
let completed = 0;
for (const [index, you, enemy] of task.pairs) {
  const started = performance.now();
  try {
    const mine = await fighter(you);
    const theirs = await fighter(enemy);
    const found = searchMatchup(mine.spec, theirs.spec, catalog, equip, data.prices, { format: task.format });
    const builds: [string[], string[]] = [names(found.routes[0][found.chosen[0]]!), names(found.routes[1][found.chosen[1]]!)];
    let result: MatchupResult = found.result;
    const chosen: MatchupVariant[] = [];
    if (mine.variants.length > 1 || theirs.variants.length > 1) {
      // The builds found, on each variant: your best worst case, and the enemy's.
      const fights = mine.variants.map((a) => theirs.variants.map((b) => runScenarios(...matchupSpecs(equipBuild(a.spec, builds[0], catalog), equipBuild(b.spec, builds[1], catalog)))));
      const [row, column] = chooseRoutes(fights.map((line) => line.map((fight) => fight.score)));
      result = fights[row]![column]!;
      const yours = mine.variants[row]!.options;
      const others = theirs.variants[column]!.options;
      if (mine.variants.length > 1 && yours) chosen.push({ side: 0, options: yours });
      if (theirs.variants.length > 1 && others) chosen.push({ side: 1, options: others });
    }
    const pair: BuildsPairResult = {
      index,
      score: result.score,
      scenarios: result.scenarios.map((scenario) => scenario.score ?? null),
      builds,
      ...(chosen.length ? { variants: chosen } : {}),
      seconds: (performance.now() - started) / 1000,
    };
    if (task.checkpoint) await writeBuildsCheckpoint(task.checkpoint, task.dataset, [you, enemy], pair);
    results.push(pair);
  } catch (cause) {
    const message = cause instanceof Error ? `${cause.message}\n${cause.stack?.split("\n").slice(1, 6).join("\n") ?? ""}` : String(cause);
    parentPort?.postMessage({ failed: { index, pair: [you, enemy], message } } satisfies BuildsMessage);
  }
  completed++;
  parentPort?.postMessage({ completed } satisfies BuildsMessage);
}
parentPort?.postMessage({ results } satisfies BuildsMessage);
