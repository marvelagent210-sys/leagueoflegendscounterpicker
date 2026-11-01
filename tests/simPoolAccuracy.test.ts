import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type { WorkerOptions } from "node:worker_threads";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BUDGET_STATS, type BudgetStat } from "../engine/budget";
import { writeCheckpoint, type CheckpointContext } from "../pipeline/sim/checkpoint";
import { simulatePairs, type PairResult, type PoolTask } from "../pipeline/sim/pool";

interface ControlledWorker {
  task: PoolTask;
  terminated: boolean;
  terminationError?: Error;
  emit(event: string, ...args: unknown[]): boolean;
  terminate(): Promise<number>;
}

const control = vi.hoisted(() => ({
  workers: [] as ControlledWorker[],
  failConstructionAt: -1,
  constructionError: new Error("worker could not start"),
}));

vi.mock("node:worker_threads", async () => {
  const actual = await vi.importActual<typeof import("node:worker_threads")>("node:worker_threads");
  const { EventEmitter } = await import("node:events");
  return {
    ...actual,
    Worker: class extends EventEmitter implements ControlledWorker {
      task: PoolTask;
      terminated = false;
      terminationError?: Error;
      constructor(_url: URL, options: WorkerOptions) {
        super();
        if (control.workers.length === control.failConstructionAt) throw control.constructionError;
        this.task = options.workerData as PoolTask;
        control.workers.push(this);
      }
      terminate(): Promise<number> {
        this.terminated = true;
        // A queued worker message can arrive while cancellation is completing.
        this.emit("message", { completed: this.task.pairs.length });
        this.emit("exit", 1);
        return this.terminationError ? Promise.reject(this.terminationError) : Promise.resolve(1);
      }
    },
  };
});

const pairs: Array<[string, string]> = [
  ["Aatrox", "Darius"], ["Aphelios", "Heimerdinger"], ["Garen", "Yasuo"],
  ["Graves", "Zeri"], ["Kindred", "Senna"], ["Malphite", "Udyr"],
];
const result = (index: number): PairResult => {
  const spent = Object.fromEntries(BUDGET_STATS.map((stat) => [stat, stat === "ad" ? 15000 : 0])) as Record<BudgetStat, number>;
  return { index, score: 0, scenarios: [0, 0, 0, 0, null, 0], spent: [{ ...spent }, { ...spent }],
    variants: [{ side: 0, options: { startingWeapons: index } }] };
};

let checkpoint: CheckpointContext;
beforeEach(async () => {
  control.workers = [];
  control.failConstructionAt = -1;
  checkpoint = { directory: await mkdtemp(path.join(tmpdir(), "sim-pool-")), fingerprint: "pool-regression" };
});
afterEach(async () => { await rm(checkpoint.directory, { recursive: true, force: true }); });

describe("batch simulation worker failure isolation", () => {
  it("rejects the original worker error, stops every sibling and suppresses late progress without discarding saved pairs", async () => {
    await writeCheckpoint(checkpoint, "16.20", 15000, pairs[0]!, result(0));
    const file = path.join(checkpoint.directory, (await readdir(checkpoint.directory))[0]!);
    const saved = await readFile(file);
    const progress = vi.fn();
    const pending = simulatePairs("16.20", 15000, pairs, 3, progress, checkpoint);
    const failure = new TypeError("target was removed during a hit");
    const rejection = expect(pending).rejects.toBe(failure);
    control.workers[0]!.emit("message", { completed: 1 });
    control.workers[2]!.terminationError = new Error("cleanup must not replace the simulation error");
    control.workers[1]!.emit("error", failure);
    control.workers[0]!.emit("message", { completed: 2 });
    await rejection;
    expect(progress.mock.calls).toEqual([[1, 6]]);
    expect(control.workers).toHaveLength(3);
    expect(control.workers.every((worker) => worker.terminated)).toBe(true);
    expect(await readFile(file)).toEqual(saved);
    expect(await readdir(checkpoint.directory)).toHaveLength(1);
  });

  it("treats a clean exit without final results as failure and cancels the unfinished siblings", async () => {
    const progress = vi.fn();
    const pending = simulatePairs("16.20", 15000, pairs, 2, progress);
    const rejection = expect(pending).rejects.toThrow("Simulation worker stopped (exit code 0) before sending its results");
    control.workers[0]!.emit("exit", 0);
    control.workers[1]!.emit("message", { completed: 1 });
    await rejection;
    expect(progress).not.toHaveBeenCalled();
    expect(control.workers.every((worker) => worker.terminated)).toBe(true);
  });

  it("stops workers already started when another worker cannot be constructed", async () => {
    control.failConstructionAt = 1;
    await expect(simulatePairs("16.20", 15000, pairs, 2)).rejects.toBe(control.constructionError);
    expect(control.workers).toHaveLength(1);
    expect(control.workers[0]!.terminated).toBe(true);
  });

  it("keeps round-robin tasks, exact result payloads and canonical order when shares complete out of order", async () => {
    const progress = vi.fn();
    const pending = simulatePairs("16.20", 15000, pairs, 2, progress, checkpoint);
    const [first, second] = control.workers;
    expect(first!.task).toEqual({ dataset: "16.20", gold: 15000, pairs: [[0, ...pairs[0]!], [2, ...pairs[2]!], [4, ...pairs[4]!]], checkpoint });
    expect(second!.task.pairs).toEqual([[1, ...pairs[1]!], [3, ...pairs[3]!], [5, ...pairs[5]!]]);
    second!.emit("message", { completed: 3 });
    second!.emit("message", [result(5), result(3), result(1)]);
    second!.emit("error", new Error("an already completed share cannot cancel another share"));
    first!.emit("message", { completed: 3 });
    first!.emit("message", [result(4), result(2), result(0)]);
    expect(await pending).toEqual(Array.from({ length: 6 }, (_, index) => result(index)));
    expect(progress.mock.calls).toEqual([[3, 6], [6, 6]]);
    expect(control.workers.every((worker) => worker.terminated)).toBe(true);
  });

  it("the real worker reports its dataset and failed pair while preserving the underlying error", async () => {
    // Fail champion lookup before any duel: exercise the real worker bootstrap and
    // cross-thread Error/cause serialization without an expensive matchup search.
    const { Worker } = await vi.importActual<typeof import("node:worker_threads")>("node:worker_threads");
    const worker = new Worker(new URL("../pipeline/sim/worker.mjs", import.meta.url), {
      workerData: { dataset: "16.20", gold: 15000, pairs: [[7, "NonexistentPoolTestChampion", "Darius"]] } satisfies PoolTask,
    });
    try {
      const failure = await new Promise<Error>((resolve, reject) => {
        worker.once("error", resolve);
        worker.once("exit", () => reject(new Error("Expected a contextual worker error before exit")));
      });
      expect(failure.message).toContain("Dataset 16.20: NonexistentPoolTestChampion vs Darius (pair 7) failed:");
      expect(failure.cause).toBeInstanceOf(Error);
      expect((failure.cause as Error).message).toBe('No champion named "NonexistentPoolTestChampion"');
      expect((failure.cause as Error).stack).toContain("findChampion");
    } finally {
      await worker.terminate();
    }
  });
});
