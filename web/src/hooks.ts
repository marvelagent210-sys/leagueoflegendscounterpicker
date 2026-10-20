/** React glue: the route, loading state, the visitor's settings, and simulation results. */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { AppData } from "./data";
import { type Route, parseRoute } from "./routes";
import { type AppSettings, DEFAULT_APP_SETTINGS, simulationKey, sanitize } from "./settings";
import { matchupCacheKey } from "./sim/cache";
import { simulate } from "./sim/pool";
import type { MatchupRun } from "./sim/run";

export function useHashRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(location.hash));
  useEffect(() => {
    const update = () => {
      setRoute(parseRoute(location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return route;
}

export interface Async<T> {
  value?: T;
  error?: Error;
}

export function useAsync<T>(load: (signal: AbortSignal) => Promise<T>, deps: unknown[]): Async<T> {
  const [state, setState] = useState<Async<T> & { deps: unknown[] }>({ deps });
  // The caller lists what `load` depends on.
  useEffect(() => {
    let live = true;
    const controller = new AbortController();
    setState({ deps });
    load(controller.signal).then(
      (value) => live && setState({ value, deps }),
      (error: unknown) => live && setState({ error: error instanceof Error ? error : new Error(String(error)), deps }),
    );
    return () => {
      live = false;
      controller.abort();
    };
  }, deps);
  // Rendering a new matchup must not briefly show the old one before its effect runs.
  return state.deps.length === deps.length && state.deps.every((dep, i) => Object.is(dep, deps[i])) ? state : {};
}

const SETTINGS_KEY = "kit-counter-picker:settings";

function readSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? sanitize(JSON.parse(raw)) : DEFAULT_APP_SETTINGS;
  } catch {
    return DEFAULT_APP_SETTINGS;
  }
}

export interface SettingsState {
  settings: AppSettings;
  setSettings(next: AppSettings): void;
}

export const SettingsContext = createContext<SettingsState>({ settings: DEFAULT_APP_SETTINGS, setSettings: () => {} });

export function useStoredSettings(): SettingsState {
  const [settings, set] = useState(readSettings);
  const setSettings = useCallback((next: AppSettings) => {
    const clean = sanitize(next);
    set(clean);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(clean));
    } catch {
      // Private windows can refuse storage; the settings still apply until the page closes.
    }
  }, []);
  return useMemo(() => ({ settings, setSettings }), [settings, setSettings]);
}

export function useSettings(): SettingsState {
  return useContext(SettingsContext);
}

const LAST_ENEMY_KEY = "kit-counter-picker:enemy";

export function rememberEnemy(id: string): void {
  try {
    localStorage.setItem(LAST_ENEMY_KEY, id);
  } catch {
    // Not remembered; the picker opens on its default.
  }
}

export function lastEnemy(): string | undefined {
  try {
    return localStorage.getItem(LAST_ENEMY_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

/** Results of runs with non-default fight settings, kept for the session. */
const runs = new Map<string, { promise: Promise<MatchupRun>; signal?: AbortSignal }>();

function runKey(data: AppData, you: string, enemy: string, settings: AppSettings, log: boolean): string {
  return matchupCacheKey(`${data.dataUrl}|${data.simulationFingerprint}`, you, enemy, settings, log);
}

function cachedRun(data: AppData, you: string, enemy: string, settings: AppSettings, log: boolean, signal?: AbortSignal): Promise<MatchupRun> {
  const key = runKey(data, you, enemy, settings, log);
  let found = runs.get(key);
  if (found?.signal?.aborted) {
    runs.delete(key);
    found = undefined;
  }
  if (!found) {
    // Re-optimize variants for this run; old defaults must never pin changed settings.
    const promise = simulate(data.dataUrl, you, enemy, settings, log, signal, undefined, data.simulationFingerprint);
    found = { promise, signal };
    void promise.then(() => {
      const cached = runs.get(key);
      if (cached?.promise === promise) cached.signal = undefined;
    }, () => {});
    void promise.catch(() => {
      // An abandoned run may reject after its replacement was already queued.
      if (runs.get(key)?.promise === promise) runs.delete(key);
    });
    runs.set(key, found);
  }
  return found.promise;
}

export interface Batch {
  runs: Map<string, MatchupRun>;
  done: number;
  total: number;
  error?: Error;
}

/**
 * Runs `you` against one enemy for each of `champions`, with the visitor's settings. Off
 * (no runs) when `active` is false: the precomputed results stand in.
 */
export function useMatchupBatch(data: AppData, champions: string[], enemy: string, settings: AppSettings, active: boolean): Batch {
  const [batch, setBatch] = useState<Batch & { key: string }>({ runs: new Map(), done: 0, total: 0, key: "" });
  const key = `${data.dataUrl}|${data.simulationFingerprint}|${enemy}|${simulationKey(settings)}|${champions.join(",")}`;
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  // `key` stands for the enemy, the champions and the fight settings.
  useEffect(() => {
    if (!active) {
      setBatch({ runs: new Map(), done: 0, total: 0, key });
      return;
    }
    const controller = new AbortController();
    const found = new Map<string, MatchupRun>();
    setBatch({ runs: new Map(found), done: 0, total: champions.length, key });
    for (const you of champions) {
      cachedRun(data, you, enemy, settingsRef.current, false, controller.signal).then(
        (run) => {
          if (controller.signal.aborted) return;
          found.set(you, run);
          setBatch({ runs: new Map(found), done: found.size, total: champions.length, key });
        },
        (error: unknown) => {
          if (controller.signal.aborted) return;
          setBatch((b) => ({ ...b, error: error instanceof Error ? error : new Error(String(error)) }));
        },
      );
    }
    return () => controller.abort();
  }, [key, active]);
  return batch.key === key ? batch : { runs: new Map(), done: 0, total: active ? champions.length : 0 };
}

/** One logged run (timelines included), for the matchup page. */
export function useMatchupRun(data: AppData, you: string, enemy: string, settings: AppSettings, active: boolean): Async<MatchupRun> {
  const key = runKey(data, you, enemy, settings, true);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  return useAsync((signal) => (active ? cachedRun(data, you, enemy, settingsRef.current, true, signal) : Promise.reject(new Error("No simulator kit"))), [key, active]);
}
