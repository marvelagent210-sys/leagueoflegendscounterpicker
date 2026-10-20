import { describe, expect, it } from "vitest";
import { advanceMissiles, missileArrivalTicks } from "../../engine/sim/actions";
import { createWorld } from "../../engine/sim/simulate";
import type { Missile } from "../../engine/sim/state";
import { ability, fighter } from "./kits";

type Movement = Pick<Missile, "perTick" | "acceleration">;

/** Compare the forecast against actual projectile stepping toward a stationary hitbox. */
function impactTicks(movement: Movement, hitboxDistance: number, direction: 1 | -1): number {
  const shot = ability({ key: "Q", delivery: { kind: "line", range: 2000, width: 0, speed: 1200 } });
  const world = createWorld({ fighters: [fighter({ abilities: [shot] }), fighter()], distance: 0, modes: ["idle", "idle"] });
  world.units[0].x = 0;
  world.units[1].x = direction * (hitboxDistance + world.units[1].spec.base.radius);
  world.missiles.push({
    id: 1, owner: 0, source: "Q", seenTick: 0, x: 0,
    perTick: movement.perTick,
    ...(movement.acceleration ? { acceleration: { ...movement.acceleration } } : {}),
    homing: true, direction, travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: [],
  });
  while (world.missiles.length && world.tick < 100) {
    world.tick += 1;
    advanceMissiles(world);
  }
  expect(world.missiles).toHaveLength(0);
  return world.tick;
}

describe("projectile ETA at discrete travel boundaries", () => {
  it("matches decelerating flights before and after the minimum speed in both directions", () => {
    const movement = { perTick: 20, acceleration: { perTick: -8, maxPerTick: 20, minPerTick: 5 } };
    // Moves 20, 12, then 5 units on every later tick.
    for (const [distance, expected] of [[20, 1], [32, 2], [37, 3], [62, 8]] as const) {
      for (const direction of [1, -1] as const) {
        expect(missileArrivalTicks(movement, distance)).toBe(expected);
        expect(impactTicks(movement, distance, direction)).toBe(expected);
        expect(missileArrivalTicks(movement, distance + 1.1e-12)).toBe(expected);
        expect(missileArrivalTicks(movement, distance + .001)).toBe(expected + 1);
      }
    }
  });
  it("reports an unreachable hitbox after deceleration to a complete stop", () => {
    const movement = { perTick: 20, acceleration: { perTick: -10, maxPerTick: 20 } };
    expect(missileArrivalTicks(movement, 30)).toBe(2);
    expect(impactTicks(movement, 30, 1)).toBe(2);
    expect(missileArrivalTicks(movement, 30.001)).toBe(Infinity);
    expect(missileArrivalTicks({ perTick: 0 }, 0)).toBe(0);
    expect(missileArrivalTicks({ perTick: 0 }, 1)).toBe(Infinity);
  });
  it("keeps mirrored rounding around a thirteen-tick ordinary flight on the same tick", () => {
    const movement = { perTick: 40 };
    // Reflection can put the same 585-unit center gap just above or below its exact value.
    for (const [direction, distance] of [[1, 520 + 1.1e-12], [-1, 520 - 1.1e-12]] as const) {
      expect(missileArrivalTicks(movement, distance)).toBe(13);
      expect(impactTicks(movement, distance, direction)).toBe(13);
    }
  });

  it("retains a real extra travel tick beyond the ordinary boundary tolerance", () => {
    const movement = { perTick: 40 };
    const distance = 520.001;
    expect(missileArrivalTicks(movement, distance)).toBe(14);
    expect(impactTicks(movement, distance, 1)).toBe(14);
    expect(impactTicks(movement, distance, -1)).toBe(14);
  });

  it("returns canonical zero for overlapping hitboxes and never forecasts negative travel", () => {
    for (const distance of [0, -10]) {
      for (const movement of [
        { perTick: 40 },
        { perTick: 40, acceleration: { perTick: 0, maxPerTick: 100 } },
        { perTick: 25, acceleration: { perTick: 0.5, maxPerTick: 100 } },
      ]) expect(missileArrivalTicks(movement, distance)).toBe(0);
    }
  });

  it("applies the same boundary behavior during acceleration and after its speed cap", () => {
    const cases = [
      // Thirteen moves: 25, 25.5, ..., 31; total distance 364.
      { movement: { perTick: 25, acceleration: { perTick: 0.5, maxPerTick: 100 } }, boundary: 364 },
      // One move at 39.5, then twelve at the 40-unit cap; total distance 519.5.
      { movement: { perTick: 39.5, acceleration: { perTick: 0.5, maxPerTick: 40 } }, boundary: 519.5 },
    ];
    for (const { movement, boundary } of cases) {
      for (const [direction, rounding] of [[1, 1.1e-12], [-1, -1.1e-12]] as const) {
        expect(missileArrivalTicks(movement, boundary + rounding)).toBe(13);
        expect(impactTicks(movement, boundary + rounding, direction)).toBe(13);
        expect(missileArrivalTicks(movement, boundary + 0.001)).toBe(14);
        expect(impactTicks(movement, boundary + 0.001, direction)).toBe(14);
      }
    }
  });
});
