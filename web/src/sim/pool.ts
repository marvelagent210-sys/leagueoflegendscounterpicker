/**
 * The app's simulation workers. Matchups run off the main thread, a few at a time; a batch
 * that is no longer wanted (the visitor picked another enemy) stops taking new work.
 */
import type { AppSettings } from "../settings";
import type { MatchupVariant, WorkerRequest, WorkerResponse } from "./protocol";
import type { MatchupRun } from "./run";

interface Job {
  request: WorkerRequest;
  resolve(run: MatchupRun): void;
  reject(error: Error): void;
  signal?: AbortSignal;
}

const SIZE = Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 2) - 1));
const idle: Worker[] = [];
const all: Worker[] = [];
const queue: Job[] = [];
const running = new Map<number, Job>();
let nextId = 1;

function spawn(): Worker {
  const worker = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
  worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
    const message = event.data;
    const job = running.get(message.id);
    running.delete(message.id);
    idle.push(worker);
    if (job) {
      if ("run" in message) job.resolve(message.run);
      else job.reject(new Error(message.error));
    }
    pump();
  };
  worker.onerror = (event) => {
    // A worker that fails to start can't run anything: fail what it was given.
    event.preventDefault();
    for (const [id, job] of running) {
      running.delete(id);
      job.reject(new Error(event.message || "The simulation worker stopped"));
    }
  };
  all.push(worker);
  return worker;
}

function pump(): void {
  while (queue.length > 0) {
    const job = queue.shift();
    if (!job) break;
    if (job.signal?.aborted) {
      job.reject(new DOMException("Cancelled", "AbortError"));
      continue;
    }
    const worker = idle.pop() ?? (all.length < SIZE ? spawn() : undefined);
    if (!worker) {
      queue.unshift(job);
      break;
    }
    running.set(job.request.id, job);
    worker.postMessage(job.request);
  }
}

export function simulate(dataUrl: string, you: string, enemy: string, settings: AppSettings, log: boolean, signal?: AbortSignal, variant?: MatchupVariant): Promise<MatchupRun> {
  return new Promise((resolve, reject) => {
    const job: Job = { request: { id: nextId++, dataUrl, you, enemy, settings, log, ...(variant ? { variant } : {}) }, resolve, reject };
    if (signal) job.signal = signal;
    queue.push(job);
    pump();
  });
}
