/** A worker thread of the simulation pool (pool.ts): runs its share of the matchups. */
import { parentPort, workerData } from "node:worker_threads";
import { type KitVariant, bestMatchup } from "../../engine/sim/matchup";
import { loadVariants } from "../kitData";
import { findChampion, loadSimData } from "../simData";
import type { PairResult, PoolTask } from "./pool";
import { writeCheckpoint } from "./checkpoint";

const task = workerData as PoolTask;
const data = await loadSimData(task.dataset);
const fighters = new Map<string, KitVariant[]>();
async function variants(id: string): Promise<KitVariant[]> {
  let found = fighters.get(id);
  if (!found) {
    found = await loadVariants(data.dataset, findChampion(data.champions, id));
    fighters.set(id, found);
  }
  return found;
}

const results: PairResult[] = [];
for (const [index, you, enemy] of task.pairs) {
  const matchup = bestMatchup(await variants(you), await variants(enemy), task.gold, data.prices);
  const result: PairResult = {
    index,
    score: matchup.score,
    scenarios: matchup.scenarios.map((s) => s.score ?? null),
    spent: [matchup.builds[0].spent, matchup.builds[1].spent],
    ...(matchup.variants ? { variants: matchup.variants } : {}),
  };
  if (task.checkpoint) await writeCheckpoint(task.checkpoint, task.dataset, task.gold, [you, enemy], result);
  results.push(result);
  parentPort?.postMessage({ completed: results.length });
}
parentPort?.postMessage(results);
