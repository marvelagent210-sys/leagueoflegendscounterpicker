/** Keep development metadata and the running model together before clients reload. */
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { Plugin } from "vite";
import { DATA_DIR, REPO_ROOT } from "../pipeline/config";

const execute = promisify(execFile);

async function exportDevelopmentData(): Promise<void> {
  // A fresh loader sees newly added kit registrations. Keeping this out of Vite's config
  // import graph also avoids restarting the whole server for every engine edit.
  await execute(process.execPath, ["--import", "tsx", path.join(REPO_ROOT, "pipeline", "webData.ts")], { cwd: REPO_ROOT });
}

export function refreshesModel(file: string): boolean {
  const relative = path.relative(REPO_ROOT, file).replaceAll(path.sep, "/");
  // The item code and catalog are the build matrix's inputs: a change makes its results stale.
  return ((relative.startsWith("engine/") || relative.startsWith("kits/") || relative.startsWith("items/") || relative.startsWith("web/src/sim/")) && relative.endsWith(".ts"))
    || relative === "web/src/settings.ts"
    || (/^pipeline\/(?:sim\/|items\/|kitData\.ts$|simData\.ts$|ledgerData\.ts$|simPages\.ts$|ledgerPages\.ts$|build\.ts$|itemData\.ts$)/.test(relative) && /\.(?:ts|mjs)$/.test(relative))
    || (/^data\/(?!raw\/)[^/]+\//.test(relative) && relative.endsWith(".json"));
}

/** Coalesce a burst of edits, serialize exports, and notify only after each export succeeds. */
export function createRefreshQueue(exportData: () => Promise<void>, reload: () => void, delay = 100): { refresh(): Promise<void>; close(): void } {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pending: Array<{ resolve(): void; reject(error: unknown): void }> = [];
  let previous = Promise.resolve();
  let closed = false;
  return {
    refresh() {
      if (closed) return Promise.reject(new Error("Development server closed"));
      if (timer) clearTimeout(timer);
      const result = new Promise<void>((resolve, reject) => pending.push({ resolve, reject }));
      timer = setTimeout(() => {
        timer = undefined;
        const waiting = pending;
        pending = [];
        previous = previous.then(async () => {
          try {
            await exportData();
            if (!closed) reload();
            waiting.forEach((entry) => entry.resolve());
          } catch (error) {
            waiting.forEach((entry) => entry.reject(error));
          }
        });
      }, delay);
      return result;
    },
    close() {
      closed = true;
      if (timer) clearTimeout(timer);
      pending.forEach((entry) => entry.reject(new Error("Development server closed")));
      pending = [];
    },
  };
}

export function dataRefreshPlugin(): Plugin {
  let refresh: (() => Promise<void>) | undefined;
  return {
    name: "counter-picker-model-data",
    apply: "serve",
    async configureServer(server) {
      // Re-export on every server restart, not only the npm dev script's invocation.
      await exportDevelopmentData();
      const queue = createRefreshQueue(exportDevelopmentData, () => server.ws.send({ type: "full-reload" }));
      refresh = queue.refresh;
      server.watcher.add([DATA_DIR, path.join(REPO_ROOT, "engine"), path.join(REPO_ROOT, "kits"), path.join(REPO_ROOT, "pipeline"), path.join(REPO_ROOT, "web", "src", "sim")]);
      const addedOrRemoved = (file: string) => {
        if (refreshesModel(file)) void queue.refresh().catch((error: unknown) => server.config.logger.error(String(error)));
      };
      server.watcher.on("add", addedOrRemoved);
      server.watcher.on("unlink", addedOrRemoved);
      server.httpServer?.once("close", () => {
        server.watcher.off("add", addedOrRemoved);
        server.watcher.off("unlink", addedOrRemoved);
        queue.close();
      });
    },
    async handleHotUpdate(context) {
      if (!refreshesModel(context.file)) return;
      await refresh?.();
      // Never hot-swap simulation code while clients still trust the previous index.
      return [];
    },
  };
}
