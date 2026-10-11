import { describe, expect, it } from "vitest";
import { hitChance } from "../../engine/sim/hitModel";
import { ability, fighter } from "./kits";
import { castWhenReady, duel, idle, standStill, ticksOf } from "./helpers";

describe("hit model", () => {
  const target = { radius: 65, moveSpeed: 350, heldInPlace: false, hasEscape: false };

  it("always hits a target held in place or one that can't react in time", () => {
    expect(hitChance({ timeToLand: 2, reach: 70 }, { ...target, heldInPlace: true }, 0.25, 0.06)).toBe(1);
    expect(hitChance({ timeToLand: 0.2, reach: 70 }, target, 0.25, 0.06)).toBe(1);
  });

  it("is a coin flip when the time left equals the time needed, and falls with more time", () => {
    // Needed: (70 + 65) / 350 s.
    const needed = 135 / 350;
    expect(hitChance({ timeToLand: 0.25 + needed, reach: 70 }, target, 0.25, 0.06)).toBeCloseTo(0.5, 9);
    const chances = [0.4, 0.6, 0.8, 1].map((t) => hitChance({ timeToLand: t, reach: 70 }, target, 0.25, 0.06));
    expect([...chances].sort((a, b) => b - a)).toEqual(chances);
    expect(hitChance({ timeToLand: 1, reach: 70 }, { ...target, hasEscape: true }, 0.25, 0.06)).toBe(0);
  });

  it("leaves a target held for part of the wait only the time after it is free", () => {
    // Held for the first second of a 1.5 s delay: 0.5 s to step out, not 1.25 s.
    const needed = 135 / 350;
    expect(hitChance({ timeToLand: 1 + needed, reach: 70 }, { ...target, heldFor: 1 }, 0.25, 0.06)).toBeCloseTo(0.5, 9);
    // Held for less than the reaction time: no difference.
    expect(hitChance({ timeToLand: 1, reach: 70 }, { ...target, heldFor: 0.1 }, 0.25, 0.06)).toBe(hitChance({ timeToLand: 1, reach: 70 }, target, 0.25, 0.06));
  });
});

// A 0.25 s cast, then a 1600 units per second missile 140 wide, at a target 600 units away (edge
// to edge; 730 center to center). It launches on tick 8 and needs (730 - 65) / 1600 s more:
// time to land 8/30 + 0.4156 s, so 0.4323 s to react against the 0.3857 s needed to step out.
const SKILLSHOT_CHANCE = 1 / (1 + Math.exp((8 / 30 + 665 / 1600 - 0.25 - 135 / 350) / 0.06));

const shot = (onHit: Parameters<typeof ability>[0]["onHit"]) =>
  ability({ key: "Q", cooldown: 100, castTime: 0.25, delivery: { kind: "line", range: 1000, width: 140, speed: 1600 }, onHit });

describe("branching on skillshots", () => {
  it("splits the fight on a decisive skillshot, weighted by its chance to land", () => {
    const stun = shot([{ type: "cc", cc: "stun", duration: 1.5 }]);
    const outcome = duel(fighter({ abilities: [stun] }), fighter(), { distance: 600, behaviors: [castWhenReady("Q"), standStill], settings: { maxSeconds: 2 } });
    expect(outcome.branches).toBe(2);
    const weights = outcome.leaves.map((leaf) => leaf.weight).sort();
    expect(weights[0]! + weights[1]!).toBeCloseTo(1, 12);
    expect(weights).toContainEqual(expect.closeTo(SKILLSHOT_CHANCE, 9));
    expect(weights).toContainEqual(expect.closeTo(1 - SKILLSHOT_CHANCE, 9));
  });

  it("counts a minor skillshot by its expected value instead", () => {
    const poke = shot([{ type: "damage", damageType: "true", amount: { base: 100 } }]);
    const outcome = duel(fighter({ abilities: [poke] }), fighter(), { distance: 600, behaviors: [castWhenReady("Q"), idle], settings: { maxSeconds: 1.2 } });
    expect(outcome.branches).toBe(1);
    expect(outcome.damage[0]).toBeCloseTo(100 * SKILLSHOT_CHANCE, 9);
  });

  it("stops branching at the branch limit and uses the expected value", () => {
    const stun = shot([
      { type: "cc", cc: "stun", duration: 1.5 },
      { type: "damage", damageType: "true", amount: { base: 400 } },
    ]);
    const outcome = duel(fighter({ abilities: [stun] }), fighter(), { distance: 600, behaviors: [castWhenReady("Q"), idle], settings: { maxSeconds: 1.2, maxBranches: 1 } });
    expect(outcome.branches).toBe(1);
    expect(outcome.damage[0]).toBeCloseTo(400 * SKILLSHOT_CHANCE, 9);
  });

  it("sums branch weights to 1 over many splits", () => {
    const stun = ability({ key: "Q", cooldown: 1.2, castTime: 0.25, delivery: { kind: "line", range: 1000, width: 140, speed: 1600 }, onHit: [{ type: "cc", cc: "stun", duration: 0.5 }] });
    // Each cast lands 0.5 s of stun or misses; casts every 1.2 s split until 4 splits (16 branches).
    const outcome = duel(fighter({ abilities: [stun] }), fighter(), { distance: 600, behaviors: [castWhenReady("Q"), standStill], settings: { maxSeconds: 10, maxBranches: 16 } });
    expect(outcome.branches).toBe(16);
    expect(outcome.leaves.reduce((sum, leaf) => sum + leaf.weight, 0)).toBeCloseTo(1, 12);
  });

  it("lets a ready dash get out of a decisive skillshot", () => {
    const stun = shot([{ type: "cc", cc: "stun", duration: 1.5 }]);
    const dash = ability({ key: "E", cooldown: 10, delivery: { kind: "dash", direction: "away", distance: 300, speed: 1500 } });
    // The missile launches on tick 8, the first tick the cast (started on tick 0) can be seen.
    const outcome = duel(fighter({ abilities: [stun] }), fighter({ abilities: [dash] }), { distance: 600, behaviors: [castWhenReady("Q"), undefined], settings: { maxSeconds: 1.5 } });
    expect(ticksOf(outcome.timeline, 1, "dodges with E")).toEqual([8]);
    for (const leaf of outcome.leaves) expect(leaf.damage[0]).toBe(0);
    expect(outcome.timeline.some((e) => e.side === 0 && e.text.startsWith("stun"))).toBe(false);
  });
});
