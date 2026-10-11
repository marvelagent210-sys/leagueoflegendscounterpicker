/** A worker thread of the simulation pool (pool.ts): runs its share of the matchups. */
import { parentPort, workerData } from "node:worker_threads";
import { simulateMatchup } from "../../engine/sim/matchup";
import type { FighterSpec } from "../../engine/sim/spec";
import { loadFighter } from "../kitData";
import { findChampion, loadSimData } from "../simData";
import type { PairResult, PoolTask } from "./pool";

const task = workerData as PoolTask;
const data = await loadSimData(task.dataset);
const specs = new Map<string, FighterSpec>();
async function spec(id: string): Promise<FighterSpec> {
  let found = specs.get(id);
  if (!found) {
    found = (await loadFighter(data.dataset, findChampion(data.champions, id))).spec;
    specs.set(id, found);
  }
  return found;
}

const results: PairResult[] = [];
for (const [index, you, enemy] of task.pairs) {
  const matchup = simulateMatchup(await spec(you), await spec(enemy), task.gold, data.prices);
  results.push({ index, score: matchup.score, scenarios: matchup.scenarios.map((s) => s.score ?? null), spent: [matchup.builds[0].spent, matchup.builds[1].spent] });
}
parentPort?.postMessage(results);
