import { describe, expect, it } from "vitest";
import { engageRange, runScenarios, SCENARIO_WEIGHTS } from "../../engine/sim/scenarios";
import { DEFAULT_ENVIRONMENT } from "../../engine/sim/state";
import { ability, fighter } from "./kits";

const hit = [{ type: "damage" as const, damageType: "true" as const, amount: { base: 100 } }];

describe("scenario opening distances", () => {
  it("includes directional areas and respects their centered-hit geometry", () => {
    const area = ability({ key: "Q", delivery: { kind: "area", near: 0, far: 700, delay: 0.5, anchor: "caster" }, onHit: hit });
    expect(engageRange(fighter({ abilities: [area] }), fighter())).toBe(635);
    expect(engageRange(fighter({ abilities: [{ ...area, delivery: { ...area.delivery, kind: "area", near: 0, far: 700, delay: 0.5, anchor: "caster", centered: true } }] }), fighter())).toBe(570);
  });

  it("uses center collision for circles and hitbox collision for attached fields", () => {
    const circle = ability({ key: "Q", delivery: { kind: "circle", range: 500, radius: 200, delay: 0.5, centered: true }, onHit: hit });
    expect(engageRange(fighter({ abilities: [circle] }), fighter())).toBe(570);
    const field = ability({ key: "Q", delivery: { kind: "field", range: 0, radius: 400, duration: 2, interval: 0.5, attached: true }, onHit: hit });
    expect(engageRange(fighter({ abilities: [field] }), fighter())).toBe(335);
  });

  it("cannot open with a recast, unmet stack gate, unaffordable spell, or slow area", () => {
    const root = ability({ key: "Q", delivery: { kind: "target", range: 500 }, onHit: hit });
    const recast = ability({ key: "Q2", chain: { root: "Q", index: 1, window: 5 }, delivery: { kind: "line", range: 1200, width: 100 }, onHit: hit });
    const gated = ability({ key: "W", usable: (unit) => Number(unit.memory.stacks ?? 0) >= 3, delivery: { kind: "line", range: 1300, width: 100 }, onHit: hit });
    const costly = ability({ key: "E", cost: 100, delivery: { kind: "line", range: 1250, width: 100 }, onHit: hit });
    const slow = ability({ key: "R", delivery: { kind: "area", near: 0, far: 1300, delay: 2, anchor: "ground" }, onHit: hit });
    expect(engageRange(fighter({ abilities: [root, recast, gated, costly, slow] }), fighter())).toBe(370);
  });

  it("uses the configured environment when deciding whether an opener is available", () => {
    const wallOnly = ability({ key: "E", usable: (_unit, world) => world.settings.environment.walls, delivery: { kind: "dash", direction: "toward", distance: 700, speed: 1200, hitRadius: 100 }, onHit: hit });
    const self = fighter({ abilities: [wallOnly] });
    const settings = { environment: { ...DEFAULT_ENVIRONMENT, walls: false }, maxSeconds: 0.1 };
    expect(engageRange(self, fighter())).toBe(800);
    expect(engageRange(self, fighter(), settings)).toBe(125);
    expect(runScenarios(self, fighter(), { settings }).scenarios.find((scenario) => scenario.id === "youEngage")?.note).toBe("from 125 units");
  });
});

describe("scenario weight normalization", () => {
  it("normalizes only the scenarios that apply", () => {
    const result = runScenarios(fighter({ base: { ad: 125 } }), fighter(), { settings: { maxSeconds: 5 } });
    const active = result.scenarios.filter((scenario) => scenario.score !== undefined);
    const total = active.reduce((sum, scenario) => sum + SCENARIO_WEIGHTS[scenario.id], 0);
    const expected = active.reduce((sum, scenario) => sum + SCENARIO_WEIGHTS[scenario.id] * scenario.score!, 0) / total;
    expect(result.scenarios.find((scenario) => scenario.id === "spacing")?.score).toBeUndefined();
    expect(result.score).toBeCloseTo(expected, 12);
  });

  it("accepts zero weights and rejects negative or nonfinite weights", () => {
    const none = Object.fromEntries(Object.keys(SCENARIO_WEIGHTS).map((id) => [id, 0]));
    expect(runScenarios(fighter(), fighter(), { weights: none, settings: { maxSeconds: 0.1 } }).score).toBe(0);
    for (const brawl of [-1, NaN, Infinity]) expect(() => runScenarios(fighter(), fighter(), { weights: { brawl } })).toThrow(RangeError);
  });
});
