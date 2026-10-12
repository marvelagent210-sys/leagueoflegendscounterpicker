/** React glue: the route, loading state, the visitor's settings, and simulation results. */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { AppData } from "./data";
import { type Route, parseRoute } from "./routes";
import { type AppSettings, DEFAULT_APP_SETTINGS, fightKey, sanitize } from "./settings";
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

export function useAsync<T>(load: () => Promise<T>, deps: unknown[]): Async<T> {
  const [state, setState] = useState<Async<T>>({});
  // The caller lists what `load` depends on.
  useEffect(() => {
    let live = true;
    setState({});
    load().then(
      (value) => live && setState({ value }),
      (error: unknown) => live && setState({ error: error instanceof Error ? error : new Error(String(error)) }),
    );
    return () => {
      live = false;
    };
  }, deps);
  return state;
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
const runs = new Map<string, Promise<MatchupRun>>();

function runKey(you: string, enemy: string, settings: AppSettings, log: boolean): string {
  return `${you}|${enemy}|${fightKey(settings)}|${log}`;
}

function cachedRun(data: AppData, you: string, enemy: string, settings: AppSettings, log: boolean, signal?: AbortSignal): Promise<MatchupRun> {
  const key = runKey(you, enemy, settings, log);
  let found = runs.get(key);
  if (!found) {
    // Udyr's rank split, Heimerdinger's upgrade: the ones the precomputed matchup found best, tried first.
    const mine = data.simulated.variants?.[you]?.[enemy];
    const theirs = data.simulated.variants?.[enemy]?.[you];
    const variants = [...(mine ? [{ side: 0 as const, options: mine }] : []), ...(theirs ? [{ side: 1 as const, options: theirs }] : [])];
    found = simulate(data.dataUrl, you, enemy, settings, log, signal, variants);
    found.catch(() => runs.delete(key));
    runs.set(key, found);
  }
  return found;
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
  const [batch, setBatch] = useState<Batch>({ runs: new Map(), done: 0, total: 0 });
  const key = `${enemy}|${fightKey(settings)}|${champions.join(",")}`;
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  // `key` stands for the enemy, the champions and the fight settings.
  useEffect(() => {
    if (!active) {
      setBatch({ runs: new Map(), done: 0, total: 0 });
      return;
    }
    const controller = new AbortController();
    const found = new Map<string, MatchupRun>();
    setBatch({ runs: new Map(found), done: 0, total: champions.length });
    for (const you of champions) {
      cachedRun(data, you, enemy, settingsRef.current, false, controller.signal).then(
        (run) => {
          if (controller.signal.aborted) return;
          found.set(you, run);
          setBatch({ runs: new Map(found), done: found.size, total: champions.length });
        },
        (error: unknown) => {
          if (controller.signal.aborted) return;
          setBatch((b) => ({ ...b, error: error instanceof Error ? error : new Error(String(error)) }));
        },
      );
    }
    return () => controller.abort();
  }, [key, active]);
  return batch;
}

/** One logged run (timelines included), for the matchup page. */
export function useMatchupRun(data: AppData, you: string, enemy: string, settings: AppSettings, active: boolean): Async<MatchupRun> {
  const key = runKey(you, enemy, settings, true);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  return useAsync(() => (active ? cachedRun(data, you, enemy, settingsRef.current, true) : Promise.reject(new Error("No simulator kit"))), [key, active]);
}
