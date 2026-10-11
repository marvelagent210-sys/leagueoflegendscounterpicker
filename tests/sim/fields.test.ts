import { describe, expect, it } from "vitest";
import { damagePerSecond } from "../../engine/budget";
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

  it("count every pulse in the stat budget", () => {
    // 4 pulses of 10 every 100 s.
    expect(damagePerSecond(fighter({ abilities: [ground] }), fighter()).true).toBeCloseTo(0.4, 9);
  });

  it("can open a fight from their reach", () => {
    const outcome = duel(fighter({ abilities: [ground] }), fighter(), { distance: 1100, behaviors: [undefined, idle], settings: { maxSeconds: 1 } });
    expect(outcome.damage[0]).toBeGreaterThan(0);
  });
});
