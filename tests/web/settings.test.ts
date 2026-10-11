import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { SCENARIO_WEIGHTS, SCENARIOS } from "../../engine/sim/scenarios";
import { DEFAULT_APP_SETTINGS, KIT_OPTIONS, blend, fightKey, fightsChanged, sanitize, scenarioOptions, weightsChanged } from "../../web/src/settings";

/** simulated.json, as pipeline/simPages.ts writes it (web/src/data.ts reads it in the browser). */
interface SimulatedFile {
  gold: number;
  values: string[];
  matchups: Record<string, Record<string, Array<number | null>>>;
}

const simulated = JSON.parse(readFileSync(path.join(import.meta.dirname, "..", "..", "data", "16.20", "simulated.json"), "utf8")) as SimulatedFile;

describe("web settings", () => {
  it("defaults to what the precomputed results use", () => {
    expect(DEFAULT_APP_SETTINGS.gold).toBe(simulated.gold);
    expect(DEFAULT_APP_SETTINGS.weights).toEqual(SCENARIO_WEIGHTS);
    expect(simulated.values).toEqual(["score", ...SCENARIOS]);
    expect(fightsChanged(DEFAULT_APP_SETTINGS)).toBe(false);
    expect(weightsChanged(DEFAULT_APP_SETTINGS)).toBe(false);
  });

  it("falls back to the defaults for anything missing, mistyped or out of range", () => {
    expect(sanitize(undefined)).toEqual(DEFAULT_APP_SETTINGS);
    expect(sanitize("nonsense")).toEqual(DEFAULT_APP_SETTINGS);
    const s = sanitize({
      gold: 99999,
      reactionTime: "fast",
      environment: { walls: false, minions: "no" },
      weights: { youEngage: 2, brawl: -1, escape: 0.3 },
      kitOptions: { Garen: { courageStacks: 40, unknown: 3 }, Nasus: { siphoningStacks: -5 }, Nobody: { x: 1 } },
    });
    expect(s.gold).toBe(20000);
    expect(s.reactionTime).toBe(DEFAULT_APP_SETTINGS.reactionTime);
    expect(s.environment).toEqual({ ...DEFAULT_APP_SETTINGS.environment, walls: false });
    expect(s.weights).toEqual({ ...SCENARIO_WEIGHTS, youEngage: 1, brawl: 0, escape: 0.3 });
    expect(s.kitOptions).toEqual({ Garen: { courageStacks: 40 } });
  });

  it("drops kit options set back to their defaults", () => {
    const garen = KIT_OPTIONS.find((o) => o.champion === "Garen");
    expect(garen).toBeDefined();
    if (!garen) return;
    const s = sanitize({ ...DEFAULT_APP_SETTINGS, kitOptions: { Garen: { [garen.key]: garen.default } } });
    expect(s.kitOptions).toEqual({});
    expect(fightsChanged(s)).toBe(false);
  });

  it("tells reweighing apart from fights that must run again", () => {
    const reweighed = { ...DEFAULT_APP_SETTINGS, weights: { ...SCENARIO_WEIGHTS, brawl: 0.5 } };
    expect(weightsChanged(reweighed)).toBe(true);
    expect(fightsChanged(reweighed)).toBe(false);
    expect(fightsChanged({ ...DEFAULT_APP_SETTINGS, gold: 0 })).toBe(true);
    expect(fightsChanged({ ...DEFAULT_APP_SETTINGS, reactionTime: 0.3 })).toBe(true);
    expect(fightsChanged({ ...DEFAULT_APP_SETTINGS, environment: { ...DEFAULT_APP_SETTINGS.environment, walls: false } })).toBe(true);
    expect(fightsChanged({ ...DEFAULT_APP_SETTINGS, kitOptions: { Nasus: { siphoningStacks: 100 } } })).toBe(true);
  });

  it("keys fights by their settings, whatever order the kit options were set in", () => {
    const a = { ...DEFAULT_APP_SETTINGS, kitOptions: { Garen: { courageStacks: 40 }, Nasus: { siphoningStacks: 100 } } };
    const b = { ...DEFAULT_APP_SETTINGS, kitOptions: { Nasus: { siphoningStacks: 100 }, Garen: { courageStacks: 40 } } };
    expect(fightKey(a)).toBe(fightKey(b));
    expect(fightKey(a)).not.toBe(fightKey({ ...a, kitOptions: { Garen: { courageStacks: 41 }, Nasus: { siphoningStacks: 100 } } }));
  });

  it("passes the fight settings to the scenarios", () => {
    const options = scenarioOptions({ ...DEFAULT_APP_SETTINGS, reactionTime: 0.4, environment: { ...DEFAULT_APP_SETTINGS.environment, minions: false } });
    expect(options.settings?.reactionTime).toBe(0.4);
    expect(options.settings?.environment?.minions).toBe(false);
    expect(options.settings?.environment?.wallDistance).toBeGreaterThan(0);
  });

  it("blends scenario scores as the build does, renormalizing over the scenarios that apply", () => {
    expect(blend([1, 1, 1, 1, 1, 1], SCENARIO_WEIGHTS)).toBeCloseTo(1, 12);
    expect(blend([null, null, null, null, null, null], SCENARIO_WEIGHTS)).toBe(0);
    const w = SCENARIO_WEIGHTS;
    const total = w.youEngage + w.enemyEngages + w.brawl + w.shortTrade + w.escape;
    expect(blend([1, -1, 0.5, 0, null, 1], w)).toBeCloseTo((w.youEngage - w.enemyEngages + 0.5 * w.brawl + w.escape) / total, 12);
    let pairs = 0;
    for (const [you, row] of Object.entries(simulated.matchups)) {
      for (const [enemy, values] of Object.entries(row)) {
        const [score, ...scenarios] = values;
        expect(blend(scenarios, SCENARIO_WEIGHTS), `${you} vs ${enemy}`).toBeCloseTo(score ?? Number.NaN, 2);
        pairs++;
      }
    }
    expect(pairs).toBeGreaterThan(500);
  });
});
