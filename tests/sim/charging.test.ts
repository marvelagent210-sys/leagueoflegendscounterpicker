import { describe, expect, it } from "vitest";
import type { Behavior } from "../../engine/sim/behavior";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, Effect } from "../../engine/sim/spec";
import { castWhenReady, duel, standStill, ticksOf } from "./helpers";
import { ability, fighter } from "./kits";

const trueDamage = (amount: number): Effect => ({ type: "damage", damageType: "true", amount: { base: amount } });

describe("charge-up casts (Decimating Smash)", () => {
  const smash = (interruptible: boolean): AbilitySpec =>
    ability({
      key: "Q",
      cooldown: 8,
      cost: 40,
      castTime: 1,
      delivery: { kind: "area", near: 0, far: 500, delay: 0, anchor: "caster" },
      onHit: [trueDamage(300)],
      ...(interruptible ? { interruptible: { cooldown: 2 } } : {}),
    });
  const stunner = fighter({ id: "stunner", abilities: [ability({ key: "W", cooldown: 100, delivery: { kind: "target", range: 1000 }, onHit: [{ type: "cc", cc: "stun", duration: 0.25 }] })] });
  const stunAt =
    (tick: number): Behavior =>
    (view) =>
      view.world.tick === tick ? { kind: "cast", ability: "W" } : { kind: "move", direction: 0 };
  const fight = (interruptible: boolean) => {
    const world = createWorld({ fighters: [fighter({ base: { resource: 100 }, abilities: [smash(interruptible)] }), stunner], distance: 100, modes: ["fight", "fight"], settings: { log: true } });
    for (let i = 0; i < 60; i++) step(world, [castWhenReady("Q"), stunAt(15)]);
    return world;
  };

  it("breaks under crowd control that interrupts channels: the cost is spent and a short cooldown follows", () => {
    const world = fight(true);
    expect(ticksOf(world.log, 0, "Q interrupted by stun")).toEqual([15]);
    expect(world.units[1].hp).toBe(2000);
    expect(world.units[0].resource).toBe(60);
    expect(world.units[0].cooldownReady.Q).toBe(15 + 60);
  });

  it("other cast times complete through it", () => {
    const world = fight(false);
    expect(ticksOf(world.log, 0, "interrupted")).toEqual([]);
    expect(world.units[1].hp).toBe(1700);
  });
});

describe("charging dashes (Unstoppable Onslaught)", () => {
  const charge = (sidestep?: number): AbilitySpec =>
    ability({
      key: "R",
      cooldown: 100,
      delivery: { kind: "dash", direction: "toward", distance: 5000, speed: 950, hitRadius: 50, ramp: { amount: 40, every: 0.1 }, ...(sidestep !== undefined ? { sidestep } : {}) },
      onHit: [trueDamage(500)],
    });

  it("start at the caster's movement speed and gain 40 every 0.1 s, up to their speed", () => {
    const world = createWorld({ fighters: [fighter({ abilities: [charge()] }), fighter()], distance: 3000, modes: ["fight", "idle"] });
    step(world, [castWhenReady("R"), standStill]);
    const moves: number[] = [];
    for (let i = 0; i < 60; i++) {
      const from = world.units[0].x;
      step(world, [standStill, standStill]);
      moves.push(world.units[0].x - from);
    }
    expect(moves[0]).toBeCloseTo(350 / 30, 9);
    expect(moves[1]).toBeCloseTo(350 / 30, 9);
    expect(moves[2]).toBeCloseTo(390 / 30, 9);
    // 350 + 15 steps of 40: 950 from the 45th tick.
    expect(moves[43]).toBeCloseTo(910 / 30, 9);
    expect(moves[44]).toBeCloseTo(950 / 30, 9);
    expect(moves[59]).toBeCloseTo(950 / 30, 9);
  });

  it("can be stepped aside from when they come from far, not from close", () => {
    const options = { modes: ["fight", "idle"] as const, behaviors: [castWhenReady("R"), standStill] as [Behavior, Behavior], settings: { maxSeconds: 6 } };
    const far = duel(fighter({ abilities: [charge(150)] }), fighter(), { ...options, modes: [...options.modes], distance: 2000 });
    expect(far.damage[0]).toBe(0);
    expect(far.timeline.some((e) => e.side === 0 && e.text === "R misses")).toBe(true);
    const near = duel(fighter({ abilities: [charge(150)] }), fighter(), { ...options, modes: [...options.modes], distance: 100 });
    expect(near.damage[0]).toBe(500);
    // In between, the fight splits on it.
    const between = duel(fighter({ abilities: [charge(150)] }), fighter(), { ...options, modes: [...options.modes], distance: 300 });
    expect(between.branches).toBe(2);
    expect(between.damage[0]).toBeGreaterThan(0);
    expect(between.damage[0]).toBeLessThan(500);
  });
});
