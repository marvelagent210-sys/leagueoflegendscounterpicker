import { describe, expect, it } from "vitest";
import { engageRange, escapeChance, runScenarios, SCENARIO_WEIGHTS, tradeValue } from "../../engine/sim/scenarios";
import { fight } from "../../engine/sim/simulate";
import { ability, fighter, RANGED } from "./kits";

const nuke = ability({ key: "Q", cooldown: 8, delivery: { kind: "target", range: 400 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 300 } }] });
const slow = ability({ key: "W", cooldown: 4, delivery: { kind: "target", range: 500 }, onHit: [{ type: "cc", cc: "slow", duration: 4, strength: 0.6 }] });

describe("scenarios", () => {
  it("weights add up to 1", () => {
    expect(Object.values(SCENARIO_WEIGHTS).reduce((a, b) => a + b, 0)).toBeCloseTo(1, 12);
  });

  it("starts all-ins from the longest opener, or attack range", () => {
    expect(engageRange(fighter(), fighter())).toBe(125);
    const dash = ability({ key: "E", delivery: { kind: "dash", direction: "toward", distance: 400, speed: 1200, hitRadius: 100 }, onHit: [{ type: "cc", cc: "stun", duration: 1 }] });
    expect(engageRange(fighter({ abilities: [dash] }), fighter())).toBe(500);
    // A 400-range targeted spell reaches 400 - 130 = 270 units edge to edge.
    expect(engageRange(fighter({ abilities: [nuke] }), fighter())).toBe(270);
  });

  it("scores a mirror match 0 and skips spacing between equals", () => {
    const result = runScenarios(fighter(), fighter(), { settings: { maxSeconds: 70 } });
    expect(result.score).toBeCloseTo(0, 12);
    expect(result.scenarios.find((s) => s.id === "spacing")?.score).toBeUndefined();
  });

  it("favors the stronger side in every scenario that applies", () => {
    const result = runScenarios(fighter({ base: { ad: 130 } }), fighter(), { settings: { maxSeconds: 70 } });
    for (const scenario of result.scenarios) {
      if (scenario.score === undefined || scenario.id === "escape") continue;
      expect(scenario.score, scenario.id).toBeGreaterThan(0);
    }
    expect(result.score).toBeGreaterThan(0.5);
  });

  it("measures short trades as health exchanged, ending once the trader backs off", () => {
    const outcome = fight({ fighters: [fighter({ abilities: [nuke] }), fighter()], distance: 370, modes: ["trade", "hold"], settings: { maxSeconds: 15 } });
    expect(outcome.disengaged).toBe(1);
    expect(tradeValue(outcome, 0)).toBeGreaterThan(0.05);
  });

  it("lets a faster fighter escape, and a slow catch a runner", () => {
    const runner = fighter({ base: { moveSpeed: 400 } });
    const free = fight({ fighters: [runner, fighter()], distance: 100, modes: ["flee", "fight"], settings: { maxSeconds: 8 } });
    expect(escapeChance(free, 0)).toBe(1);
    const caught = fight({
      // Slowed to 180 units per second, the runner can't get out of range during a windup.
      fighters: [fighter({ base: { hp: 600 } }), fighter({ abilities: [slow], base: { ad: 300 } })],
      distance: 100,
      modes: ["flee", "fight"],
      settings: { maxSeconds: 8 },
    });
    expect(escapeChance(caught, 0)).toBe(0);
  });

  it("plays the spacing game when one side out-ranges the other", () => {
    const result = runScenarios(fighter({ attack: RANGED, base: { moveSpeed: 450 } }), fighter({ base: { moveSpeed: 300 } }), { settings: { maxSeconds: 70 } });
    const spacing = result.scenarios.find((s) => s.id === "spacing");
    expect(spacing?.note).toBe("you kite");
    expect(spacing?.score).toBe(1);
  });
});
