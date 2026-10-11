/**
 * Runs many simulated matchups across worker threads. Every matchup is independent and
 * deterministic, so the results don't depend on how they are shared out.
 */
import { availableParallelism } from "node:os";
import { Worker } from "node:worker_threads";
import type { BudgetStat } from "../../engine/budget";

export interface PoolTask {
  dataset: string;
  gold: number;
  /** [index, you, enemy] */
  pairs: Array<[number, string, string]>;
}

export interface PairResult {
  index: number;
  score: number;
  /** Scenario scores in SCENARIOS order; null where a scenario doesn't apply. */
  scenarios: Array<number | null>;
  /** Gold each side spent on each stat: you, then the enemy. */
  spent: [Record<BudgetStat, number>, Record<BudgetStat, number>];
}

export async function simulatePairs(dataset: string, gold: number, pairs: Array<[string, string]>, threads = availableParallelism()): Promise<PairResult[]> {
  const count = Math.max(1, Math.min(threads, pairs.length));
  const shares: Array<Array<[number, string, string]>> = Array.from({ length: count }, () => []);
  pairs.forEach(([you, enemy], index) => shares[index % count]?.push([index, you, enemy]));
  const parts = await Promise.all(
    shares.map(
      (share) =>
        new Promise<PairResult[]>((resolve, reject) => {
          const worker = new Worker(new URL("./worker.mjs", import.meta.url), { workerData: { dataset, gold, pairs: share } satisfies PoolTask });
          worker.once("message", (results: PairResult[]) => {
            resolve(results);
            void worker.terminate();
          });
          worker.once("error", reject);
          worker.once("exit", (code) => {
            if (code !== 0 && code !== 1) reject(new Error(`Simulation worker stopped with exit code ${code}`));
          });
        }),
    ),
  );
  return parts.flat().sort((a, b) => a.index - b.index);
}
