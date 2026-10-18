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
  onAbort?: () => void;
}

const SIZE = Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 2) - 1));
const idle: Worker[] = [];
const all: Worker[] = [];
const queue: Job[] = [];
const running = new Map<number, Job>();
const busy = new Map<Worker, number>();
let nextId = 1;

function cleanup(job: Job): void {
  if (job.onAbort) job.signal?.removeEventListener("abort", job.onAbort);
}

function discard(worker: Worker): void {
  busy.delete(worker);
  const allIndex = all.indexOf(worker);
  if (allIndex >= 0) all.splice(allIndex, 1);
  const idleIndex = idle.indexOf(worker);
  if (idleIndex >= 0) idle.splice(idleIndex, 1);
  worker.onmessage = null;
  worker.onerror = null;
  worker.terminate();
}

/** Stop obsolete computation immediately, freeing its slot for the new enemy/settings. */
function cancel(job: Job): void {
  const queued = queue.indexOf(job);
  if (queued >= 0) queue.splice(queued, 1);
  if (running.get(job.request.id) === job) {
    running.delete(job.request.id);
    const worker = [...busy].find(([, id]) => id === job.request.id)?.[0];
    if (worker) discard(worker);
  }
  cleanup(job);
  job.reject(new DOMException("Cancelled", "AbortError"));
  pump();
}

function spawn(): Worker {
  const worker = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
  worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
    const message = event.data;
    if (busy.get(worker) !== message.id) return;
    const job = running.get(message.id);
    running.delete(message.id);
    busy.delete(worker);
    idle.push(worker);
    if (job) {
      cleanup(job);
      if ("run" in message) job.resolve(message.run);
      else job.reject(new Error(message.error));
    }
    pump();
  };
  worker.onerror = (event) => {
    // Only this worker's job failed. Healthy workers must retain their own jobs.
    event.preventDefault();
    if (!all.includes(worker)) return;
    const id = busy.get(worker);
    if (id !== undefined) {
      const job = running.get(id);
      running.delete(id);
      if (job) cleanup(job);
      job?.reject(new Error(event.message || "The simulation worker stopped"));
    }
    discard(worker);
    pump();
  };
  all.push(worker);
  return worker;
}

function pump(): void {
  while (queue.length > 0) {
    const job = queue.shift();
    if (!job) break;
    if (job.signal?.aborted) {
      cleanup(job);
      job.reject(new DOMException("Cancelled", "AbortError"));
      continue;
    }
    let worker: Worker | undefined;
    try {
      worker = idle.pop() ?? (all.length < SIZE ? spawn() : undefined);
      if (!worker) {
        queue.unshift(job);
        break;
      }
      running.set(job.request.id, job);
      busy.set(worker, job.request.id);
      worker.postMessage(job.request);
    } catch (error) {
      // Startup/CSP and structured-clone errors can fail synchronously. Free only this
      // job's listener and slot, then continue dispatching the remaining queued work.
      running.delete(job.request.id);
      cleanup(job);
      if (worker) discard(worker);
      job.reject(error instanceof Error ? error : new Error(String(error)));
    }
  }
}

export function simulate(dataUrl: string, you: string, enemy: string, settings: AppSettings, log: boolean, signal?: AbortSignal, variants?: MatchupVariant[], dataFingerprint?: string): Promise<MatchupRun> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Cancelled", "AbortError"));
      return;
    }
    const job: Job = { request: { id: nextId++, dataUrl, you, enemy, settings, log, ...(variants && variants.length > 0 ? { variants } : {}), ...(dataFingerprint ? { dataFingerprint } : {}) }, resolve, reject };
    if (signal) {
      job.signal = signal;
      job.onAbort = () => cancel(job);
      signal.addEventListener("abort", job.onAbort, { once: true });
    }
    queue.push(job);
    pump();
  });
}
