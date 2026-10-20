import { describe, expect, it } from "vitest";
import { EPSILON, canCast } from "../../engine/sim/actions";
import { engageRange, tradeValue } from "../../engine/sim/scenarios";
import { createWorld, fairFight, type FightOutcome } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { Side } from "../../engine/sim/state";
import { kit } from "../kits/helpers";

const corki = kit("Corki").spec;
const tristana = kit("Tristana").spec;
const tolerance = 1e-10;

// Real 15,000-gold production allocations that exposed the reflected range boundary.
// Keep the resulting builds directly: this regression does not need another stat search.
const fighters: [FighterSpec, FighterSpec] = [
  { ...corki, bonus: { armor: 161.07142857142856, ad: 122.65306122448989, critChance: .7267857142857138, attackSpeed: 1.0371428571428574, hp: 744.642764062512 } },
  { ...tristana, bonus: { ad: 107.14285714285724, critChance: .9607142857142841, attackSpeed: 1.280000000000001, armor: 55.70304228758764, armorPenPoints: 42.862539359057656, hp: 490.1785101562576 } },
];

function qEvents(outcome: FightOutcome, side: Side) {
  return outcome.timeline
    .filter((entry) => entry.side === side && (entry.text === "casts Phosphorus Bomb" || entry.text.startsWith("Phosphorus Bomb deals ")))
    .map(({ tick, text }) => ({ tick, text }));
}

describe("Corki–Tristana translated range reflection", () => {
  it.each([
    { side: 0 as const, selfX: -599.9999999999999, enemyX: 554.9999999999998 },
    { side: 1 as const, selfX: 2120.0000000000005, enemyX: 965.0000000000002 },
  ])("accepts the same Q boundary on side $side and rejects a real range excess", ({ side, selfX, enemyX }) => {
    const world = createWorld({ fighters: side === 0 ? [corki, tristana] : [tristana, corki], distance: 0, modes: ["idle", "idle"] });
    const self = world.units[side], enemy = world.units[side === 0 ? 1 : 0];
    self.x = selfX;
    enemy.x = enemyX;
    const q = self.spec.abilities.find((ability) => ability.key === "Q")!;
    // These reflected tick-39 positions straddle 1155 by floating-point roundoff.
    expect(Math.abs(Math.abs(self.x - enemy.x) - 1155)).toBeLessThan(EPSILON);
    expect(canCast(world, self, q)).toBe(true);
    enemy.x += Math.sign(enemyX - selfX) * 2 * EPSILON;
    expect(canCast(world, self, q)).toBe(false);
  });

  it("reflects actual allocated short trades, including Q timing and regenerated health", () => {
    const [c, t] = fighters;
    const settings = { maxSeconds: 15, log: true };
    const corkiDistance = engageRange(c, t) + 100;
    const tristanaDistance = engageRange(t, c) + 100;
    const forward = [
      fairFight({ fighters: [c, t], distance: corkiDistance, modes: ["trade", "hold"], settings }),
      fairFight({ fighters: [c, t], distance: tristanaDistance, modes: ["hold", "trade"], settings }),
    ];
    const reverse = [
      fairFight({ fighters: [t, c], distance: tristanaDistance, modes: ["trade", "hold"], settings }),
      fairFight({ fighters: [t, c], distance: corkiDistance, modes: ["hold", "trade"], settings }),
    ];
    const forwardScore = (tradeValue(forward[0]!, 0) - tradeValue(forward[1]!, 1)) / 2;
    const reverseScore = (tradeValue(reverse[0]!, 0) - tradeValue(reverse[1]!, 1)) / 2;
    expect(Math.abs(forwardScore + reverseScore)).toBeLessThanOrEqual(tolerance);
    for (const [index, outcome] of forward.entries()) {
      const reflected = reverse[1 - index]!;
      expect(outcome.disengaged).toBe(1);
      expect(outcome.seconds).toBe(reflected.seconds);
      for (const side of [0, 1] as const) {
        expect(Math.abs(outcome.hp[side] - reflected.hp[side === 0 ? 1 : 0])).toBeLessThanOrEqual(tolerance);
        expect(Math.abs(outcome.damage[side] - reflected.damage[side === 0 ? 1 : 0])).toBeLessThanOrEqual(tolerance);
      }
      expect(qEvents(outcome, 0)).toEqual(qEvents(reflected, 1));
    }
    // The affected trade must exercise the boundary and its delayed damage, not skip Q.
    expect(qEvents(forward[1]!, 0).map(({ tick }) => tick)).toEqual([39, 70]);
    expect(forward[1]!.damage[0]).toBeGreaterThan(0);
  });
});
