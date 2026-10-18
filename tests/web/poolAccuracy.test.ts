import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_APP_SETTINGS, type AppSettings } from "../../web/src/settings";

interface Request { id: number }
interface Reply { data: { id: number; run?: unknown; error?: string } }

class MockWorker {
  static instances: MockWorker[] = [];
  static failConstruction = 0;
  static failSend = 0;
  requests: Request[] = [];
  terminated = false;
  onmessage: ((event: Reply) => void) | null = null;
  onerror: ((event: { message: string; preventDefault(): void }) => void) | null = null;
  constructor() {
    if (MockWorker.failConstruction > 0) {
      MockWorker.failConstruction--;
      throw new Error("worker construction failed");
    }
    MockWorker.instances.push(this);
  }
  postMessage(request: Request) {
    if (MockWorker.failSend > 0) {
      MockWorker.failSend--;
      throw new Error("worker dispatch failed");
    }
    this.requests.push(request);
  }
  terminate() { this.terminated = true; }
  complete(run: unknown) {
    const request = this.requests.at(-1);
    if (!request) throw new Error("Worker has no request");
    this.onmessage?.({ data: { id: request.id, run } });
  }
}

interface Pool {
  simulate(dataUrl: string, you: string, enemy: string, settings: AppSettings, log: boolean, signal?: AbortSignal): Promise<unknown>;
}

async function pool(): Promise<Pool> {
  // A dynamic path keeps browser-only DOM types out of the Node test project.
  const modulePath = "../../web/src/sim/pool";
  return import(modulePath) as Promise<Pool>;
}

beforeEach(() => {
  vi.resetModules();
  MockWorker.instances = [];
  MockWorker.failConstruction = 0;
  MockWorker.failSend = 0;
  vi.stubGlobal("navigator", { hardwareConcurrency: 3 }); // Two worker slots.
  vi.stubGlobal("Worker", MockWorker);
});
afterEach(() => vi.unstubAllGlobals());

describe("simulation worker cancellation and isolation", () => {
  it("terminates only an aborted active job and starts queued replacement work immediately", async () => {
    const { simulate } = await pool();
    const controller = new AbortController();
    const obsolete = simulate("/data/", "Udyr", "Darius", DEFAULT_APP_SETTINGS, false, controller.signal);
    const rejection = expect(obsolete).rejects.toMatchObject({ name: "AbortError" });
    const healthy = simulate("/data/", "Garen", "Darius", DEFAULT_APP_SETTINGS, false);
    const replacement = simulate("/data/", "Jax", "Darius", DEFAULT_APP_SETTINGS, false);
    const [old, unaffected] = MockWorker.instances;
    expect(MockWorker.instances).toHaveLength(2);
    controller.abort();
    await rejection;
    expect(old?.terminated).toBe(true);
    expect(unaffected?.terminated).toBe(false);
    expect(MockWorker.instances).toHaveLength(3);
    const fresh = MockWorker.instances[2]!;
    expect(fresh.requests).toHaveLength(1);
    unaffected!.complete({ result: "healthy" });
    fresh.complete({ result: "replacement" });
    await expect(healthy).resolves.toEqual({ result: "healthy" });
    await expect(replacement).resolves.toEqual({ result: "replacement" });
  });

  it("removes aborted queued work without terminating healthy workers", async () => {
    const { simulate } = await pool();
    const first = simulate("/data/", "Garen", "Darius", DEFAULT_APP_SETTINGS, false);
    const second = simulate("/data/", "Jax", "Darius", DEFAULT_APP_SETTINGS, false);
    const controller = new AbortController();
    const queued = simulate("/data/", "Udyr", "Darius", DEFAULT_APP_SETTINGS, false, controller.signal);
    const rejection = expect(queued).rejects.toMatchObject({ name: "AbortError" });
    const next = simulate("/data/", "Fiora", "Darius", DEFAULT_APP_SETTINGS, false);
    controller.abort();
    await rejection;
    expect(MockWorker.instances.every(worker => !worker.terminated)).toBe(true);
    MockWorker.instances[0]!.complete("first");
    expect(MockWorker.instances[0]!.requests).toHaveLength(2);
    MockWorker.instances[0]!.complete("next");
    MockWorker.instances[1]!.complete("second");
    await expect(Promise.all([first, second, next])).resolves.toEqual(["first", "second", "next"]);
  });

  it("ignores a late message from a terminated worker and preserves replacement ownership", async () => {
    const { simulate } = await pool();
    const controller = new AbortController();
    const obsolete = simulate("/data/", "Udyr", "Darius", DEFAULT_APP_SETTINGS, false, controller.signal);
    const rejection = expect(obsolete).rejects.toMatchObject({ name: "AbortError" });
    const healthy = simulate("/data/", "Garen", "Darius", DEFAULT_APP_SETTINGS, false);
    const replacement = simulate("/data/", "Jax", "Darius", DEFAULT_APP_SETTINGS, false);
    const waiting = simulate("/data/", "Fiora", "Darius", DEFAULT_APP_SETTINGS, false);
    const old = MockWorker.instances[0]!;
    const late = old.onmessage!;
    const id = old.requests[0]!.id;
    controller.abort();
    await rejection;
    const fresh = MockWorker.instances[2]!;
    late({ data: { id, run: "obsolete" } });
    expect(fresh.requests).toHaveLength(1);
    expect(MockWorker.instances).toHaveLength(3);
    fresh.complete("replacement");
    expect(fresh.requests).toHaveLength(2);
    fresh.complete("waiting");
    MockWorker.instances[1]!.complete("healthy");
    await expect(Promise.all([healthy, replacement, waiting])).resolves.toEqual(["healthy", "replacement", "waiting"]);
  });

  it("removes completed abort listeners so later aborts cannot kill a reused worker", async () => {
    const { simulate } = await pool();
    const controller = new AbortController();
    const completed = simulate("/data/", "Garen", "Darius", DEFAULT_APP_SETTINGS, false, controller.signal);
    const worker = MockWorker.instances[0]!;
    worker.complete("done");
    await expect(completed).resolves.toBe("done");
    const current = simulate("/data/", "Jax", "Darius", DEFAULT_APP_SETTINGS, false);
    controller.abort();
    expect(worker.terminated).toBe(false);
    worker.complete("current");
    await expect(current).resolves.toBe("current");
  });

  it("rejects an already aborted request without spawning a worker", async () => {
    const { simulate } = await pool();
    const controller = new AbortController();
    controller.abort();
    await expect(simulate("/data/", "Udyr", "Darius", DEFAULT_APP_SETTINGS, false, controller.signal)).rejects.toMatchObject({ name: "AbortError" });
    expect(MockWorker.instances).toHaveLength(0);
  });

  it("isolates a failed worker's job and replaces its slot without rejecting healthy work", async () => {
    const { simulate } = await pool();
    const failed = simulate("/data/", "Udyr", "Darius", DEFAULT_APP_SETTINGS, false);
    const rejection = expect(failed).rejects.toThrow("worker failed");
    const healthy = simulate("/data/", "Garen", "Darius", DEFAULT_APP_SETTINGS, false);
    const replacement = simulate("/data/", "Jax", "Darius", DEFAULT_APP_SETTINGS, false);
    const broken = MockWorker.instances[0]!;
    broken.onerror!({ message: "worker failed", preventDefault: vi.fn() });
    await rejection;
    expect(broken.terminated).toBe(true);
    expect(MockWorker.instances[1]!.terminated).toBe(false);
    expect(MockWorker.instances).toHaveLength(3);
    MockWorker.instances[1]!.complete("healthy");
    MockWorker.instances[2]!.complete("replacement");
    await expect(Promise.all([healthy, replacement])).resolves.toEqual(["healthy", "replacement"]);
  });

  it("rejects synchronous worker construction failures and permits the next request", async () => {
    const { simulate } = await pool();
    MockWorker.failConstruction = 1;
    await expect(simulate("/data/", "Udyr", "Darius", DEFAULT_APP_SETTINGS, false)).rejects.toThrow("worker construction failed");
    const next = simulate("/data/", "Garen", "Darius", DEFAULT_APP_SETTINGS, false);
    MockWorker.instances[0]!.complete("healthy");
    await expect(next).resolves.toBe("healthy");
  });

  it("cleans synchronous dispatch failures during queue pumping without stranding other work", async () => {
    const { simulate } = await pool();
    const first = simulate("/data/", "Garen", "Darius", DEFAULT_APP_SETTINGS, false);
    const healthy = simulate("/data/", "Jax", "Darius", DEFAULT_APP_SETTINGS, false);
    const controller = new AbortController();
    const failed = simulate("/data/", "Udyr", "Darius", DEFAULT_APP_SETTINGS, false, controller.signal);
    const rejection = expect(failed).rejects.toThrow("worker dispatch failed");
    const replacement = simulate("/data/", "Fiora", "Darius", DEFAULT_APP_SETTINGS, false);
    MockWorker.failSend = 1;
    const old = MockWorker.instances[0]!;
    old.complete("first");
    await rejection;
    expect(old.terminated).toBe(true);
    expect(MockWorker.instances[1]!.terminated).toBe(false);
    const fresh = MockWorker.instances[2]!;
    controller.abort();
    expect(fresh.terminated).toBe(false);
    fresh.complete("replacement");
    MockWorker.instances[1]!.complete("healthy");
    await expect(Promise.all([first, healthy, replacement])).resolves.toEqual(["first", "healthy", "replacement"]);
  });
});
