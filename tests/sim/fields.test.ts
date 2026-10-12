import { describe, expect, it } from "vitest";
import { damagePerSecond } from "../../engine/budget";
import { applyEffect } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, Effect } from "../../engine/sim/spec";
import { castWhenReady, duel, idle, standStill } from "./helpers";
import { ability, fighter } from "./kits";

const trueDamage = (amount: number): Effect => ({ type: "damage", damageType: "true", amount: { base: amount } });

/** A field 300 units wide, 2 s long, 10 true damage every 0.5 s. */
const ground: AbilitySpec = ability({ key: "Q", cooldown: 100, delivery: { kind: "field", range: 1000, radius: 150, duration: 2, interval: 0.5 }, onHit: [trueDamage(10)] });

describe("fields", () => {
  it("pulse on the enemy while it stays inside", () => {
    const outcome = duel(fighter({ abilities: [ground] }), fighter(), { distance: 600, behaviors: [castWhenReady("Q"), standStill], settings: { maxSeconds: 3 } });
    // Pulses at 0, 0.5, 1 and 1.5 s.
    expect(outcome.damage[0]).toBe(40);
  });

  it("stop hitting an enemy that walks out", () => {
    const world = createWorld({ fighters: [fighter({ abilities: [ground] }), fighter()], distance: 600, modes: ["idle", "idle"] });
    const enemy = world.units[1];
    step(world, [castWhenReady("Q"), standStill]);
    // Out of the field before the second pulse.
    enemy.x += 400;
    for (let i = 0; i < 70; i++) step(world, [standStill, standStill]);
    expect(2000 - enemy.hp).toBe(10);
  });

  it("move with their caster when attached, and apply effects to it inside", () => {
    const aura = ability({
      key: "W",
      cooldown: 100,
      delivery: { kind: "field", range: 0, radius: 200, duration: 3, interval: 1, attached: true, onOwner: [{ type: "stat", stat: "armor", amount: { base: 50 }, duration: 1.1 }] },
      onHit: [trueDamage(25)],
    });
    const world = createWorld({ fighters: [fighter({ abilities: [aura] }), fighter()], distance: 1000, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    step(world, [castWhenReady("W"), standStill]);
    expect(derive(self).armor.bonus).toBe(50);
    // The caster walks up to the enemy: the field comes along.
    self.x = enemy.x - 200;
    for (let i = 0; i < 31; i++) step(world, [standStill, standStill]);
    expect(2000 - enemy.hp).toBe(25);
  });

  it("move toward the enemy at their speed when they chase it", () => {
    // A storm cast on the caster that moves to the enemy at 300/s (Wingborne Storm's Awakened storm).
    const storm = ability({ key: "R", cooldown: 100, delivery: { kind: "field", range: 0, radius: 100, duration: 4, interval: 0.5, chase: 300 }, onHit: [trueDamage(10)] });
    const world = createWorld({ fighters: [fighter({ abilities: [storm] }), fighter()], distance: 600, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    const start = self.x;
    step(world, [castWhenReady("R"), standStill]);
    const zone = world.zones.find((z) => z.ability === "R");
    expect(zone?.x).toBe(start);
    for (let i = 0; i < 30; i++) step(world, [standStill, standStill]);
    // A second later it has come 300 units, and it stops on the enemy.
    expect(Math.abs((zone?.x ?? 0) - start)).toBeCloseTo(300, 6);
    for (let i = 0; i < 60; i++) step(world, [standStill, standStill]);
    expect(zone?.x).toBe(enemy.x);
    expect(2000 - enemy.hp).toBeGreaterThan(0);
  });

  it("count every pulse in the stat budget", () => {
    // 4 pulses of 10 every 100 s.
    expect(damagePerSecond(fighter({ abilities: [ground] }), fighter()).true).toBeCloseTo(0.4, 9);
  });

  it("can open a fight from their reach", () => {
    const outcome = duel(fighter({ abilities: [ground] }), fighter(), { distance: 1100, behaviors: [undefined, idle], settings: { maxSeconds: 1 } });
    expect(outcome.damage[0]).toBeGreaterThan(0);
  });
});

describe("aimed fields and non-dispellable crowd control", () => {
  it("land where the cast aims them along the line", () => {
    const goo = ability({ key: "W", cooldown: 100, delivery: { kind: "field", range: 1000, radius: 100, duration: 2, interval: 0.25 }, onHit: [trueDamage(10)] });
    const world = createWorld({ fighters: [fighter({ abilities: [goo] }), fighter()], distance: 300, modes: ["idle", "idle"] });
    const self = world.units[0];
    step(world, [() => ({ kind: "cast", ability: "W", aim: { direction: -1, distance: 400 } }), standStill]);
    const zone = world.zones.find((z) => z.ability === "W");
    // 400 units behind the caster, away from the enemy.
    expect(zone?.x).toBeCloseTo(self.x - 400, 6);
  });

  it("leave non-dispellable crowd control to cleanses that grant immunity", () => {
    const glue = ability({ key: "W", cooldown: 100, delivery: { kind: "aura", radius: 500 }, onHit: [{ type: "cc", cc: "slow", strength: 0.5, duration: 3, sticky: true }] });
    const world = createWorld({ fighters: [fighter({ abilities: [glue] }), fighter()], distance: 100, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    step(world, [castWhenReady("W"), standStill]);
    applyEffect(world, enemy, enemy, { type: "cleanse", types: ["slow"] }, { scale: 1 });
    expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "slow")).toBe(true);
    applyEffect(world, enemy, enemy, { type: "cleanse", sticky: true }, { scale: 1 });
    expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "slow")).toBe(false);
    expect(self.alive).toBe(true);
  });
});
