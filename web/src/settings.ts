/**
 * The settings a visitor can change (PLAN.md section 7). The precomputed results use the
 * defaults. Weights also affect a kit's choice of variants, so changed settings rerun
 * matchups before applying the weights.
 */
import { DEFAULT_BUDGET } from "../../engine/budget";
import { SCENARIO_WEIGHTS, SCENARIOS, type ScenarioId, type ScenarioOptions } from "../../engine/sim/scenarios";
import { DEFAULT_SETTINGS } from "../../engine/sim/state";
import { KITS } from "../../kits/champions/index";

export interface AppSettings {
  /** Gold each side spends on plain stats. */
  gold: number;
  /** Seconds before a champion can respond to what the enemy starts. */
  reactionTime: number;
  environment: { walls: boolean; minions: boolean; laneSetup: boolean; brush: boolean };
  /** Weights of the six scenarios in the counter score. */
  weights: Record<ScenarioId, number>;
  /** Kit assumptions changed from their defaults, by champion. */
  kitOptions: Record<string, Record<string, number>>;
}

export const GOLD_RANGE = { min: 0, max: 20000, step: 500 } as const;
export const REACTION_RANGE = { min: 0.1, max: 0.5, step: 0.05 } as const;

export const DEFAULT_APP_SETTINGS: AppSettings = {
  gold: DEFAULT_BUDGET,
  reactionTime: DEFAULT_SETTINGS.reactionTime,
  environment: {
    walls: DEFAULT_SETTINGS.environment.walls,
    minions: DEFAULT_SETTINGS.environment.minions,
    laneSetup: DEFAULT_SETTINGS.environment.laneSetup,
    brush: DEFAULT_SETTINGS.environment.brush,
  },
  weights: { ...SCENARIO_WEIGHTS },
  kitOptions: {},
};

/** Kit assumptions a visitor can change: each kit's options with their labels and defaults. */
export const KIT_OPTIONS = Object.entries(KITS)
  .flatMap(([champion, module]) => Object.entries(module.options ?? {}).map(([key, option]) => ({ champion, key, label: option.label, default: option.default })))
  .sort((a, b) => a.champion.localeCompare(b.champion) || a.key.localeCompare(b.key));

function clamp(value: unknown, min: number, max: number, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
}

/** Settings read back from storage or a link: anything missing or out of range falls back to the default. */
export function sanitize(raw: unknown): AppSettings {
  const r = (raw && typeof raw === "object" ? raw : {}) as Partial<Record<keyof AppSettings, unknown>>;
  const env = (r.environment && typeof r.environment === "object" ? r.environment : {}) as Record<string, unknown>;
  const weights = (r.weights && typeof r.weights === "object" ? r.weights : {}) as Record<string, unknown>;
  const kitOptions: AppSettings["kitOptions"] = {};
  const rawOptions = (r.kitOptions && typeof r.kitOptions === "object" ? r.kitOptions : {}) as Record<string, unknown>;
  for (const option of KIT_OPTIONS) {
    const value = (rawOptions[option.champion] as Record<string, unknown> | undefined)?.[option.key];
    if (typeof value === "number" && Number.isFinite(value) && value >= 0 && value !== option.default) {
      kitOptions[option.champion] = { ...kitOptions[option.champion], [option.key]: value };
    }
  }
  const d = DEFAULT_APP_SETTINGS;
  const bool = (value: unknown, fallback: boolean) => (typeof value === "boolean" ? value : fallback);
  return {
    gold: Math.round(clamp(r.gold, GOLD_RANGE.min, GOLD_RANGE.max, d.gold)),
    reactionTime: clamp(r.reactionTime, REACTION_RANGE.min, REACTION_RANGE.max, d.reactionTime),
    environment: {
      walls: bool(env.walls, d.environment.walls),
      minions: bool(env.minions, d.environment.minions),
      laneSetup: bool(env.laneSetup, d.environment.laneSetup),
      brush: bool(env.brush, d.environment.brush),
    },
    weights: Object.fromEntries(SCENARIOS.map((id) => [id, clamp(weights[id], 0, 1, d.weights[id])])) as Record<ScenarioId, number>,
    kitOptions,
  };
}

/** Whether the fights themselves differ from the precomputed ones (weights only reweigh them). */
export function fightsChanged(s: AppSettings): boolean {
  return fightKey(s) !== fightKey(DEFAULT_APP_SETTINGS);
}

export function weightsChanged(s: AppSettings): boolean {
  return SCENARIOS.some((id) => s.weights[id] !== DEFAULT_APP_SETTINGS.weights[id]);
}

/** Identifies the fights a setting produces, for caching their results. */
export function fightKey(s: AppSettings): string {
  const options = Object.keys(s.kitOptions)
    .sort()
    .map((champion) => `${champion}:${Object.entries(s.kitOptions[champion] ?? {}).sort().map(([k, v]) => `${k}=${v}`).join(",")}`);
  return [s.gold, s.reactionTime, s.environment.walls, s.environment.minions, s.environment.laneSetup, s.environment.brush, ...options].join("|");
}

/** Variant optimization depends on weights as well as the physical fight settings. */
export function simulationKey(s: AppSettings): string {
  return JSON.stringify([fightKey(s), ...SCENARIOS.map((id) => s.weights[id])]);
}

/** The kit options a champion is compiled with. */
export function kitOptionsFor(s: AppSettings, champion: string): Record<string, number> {
  return s.kitOptions[champion] ?? {};
}

/** What the scenarios need: the fight settings and the weights. */
export function scenarioOptions(s: AppSettings): ScenarioOptions {
  return {
    settings: { reactionTime: s.reactionTime, environment: { ...DEFAULT_SETTINGS.environment, ...s.environment } },
    weights: s.weights,
  };
}

/**
 * A counter score from scenario scores and weights, as the scenarios blend them: scenarios
 * that don't apply (null) drop out and the rest are renormalized.
 */
export function blend(scenarioScores: Array<number | null>, weights: Record<ScenarioId, number>): number {
  let total = 0;
  let weighted = 0;
  SCENARIOS.forEach((id, i) => {
    const score = scenarioScores[i];
    if (score === null || score === undefined) return;
    total += weights[id];
    weighted += weights[id] * score;
  });
  return total > 0 ? weighted / total : 0;
}
