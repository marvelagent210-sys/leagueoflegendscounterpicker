import { describe, expect, it } from "vitest";
import { canCast, canStartAttack, inReach } from "../../engine/sim/actions";
import { applyEffect } from "../../engine/sim/combat";
import { createWorld, step } from "../../engine/sim/simulate";
import type { Effect } from "../../engine/sim/spec";
import { idle, standStill } from "./helpers";
import { ability, fighter, RANGED } from "./kits";

const trueDamage = (amount: number): Effect => ({ type: "damage", damageType: "true", amount: { base: amount } });
const hide: Effect = { type: "state", state: "invisible", duration: 2 };

describe("invisibility", () => {
  const targeted = ability({ key: "T", delivery: { kind: "target", range: 600 }, onHit: [trueDamage(100)] });
  const skillshot = ability({ key: "L", delivery: { kind: "line", range: 1000, width: 100, speed: 1500 }, onHit: [trueDamage(100)] });
  const aura = ability({ key: "A", delivery: { kind: "aura", radius: 400 }, onHit: [trueDamage(100)] });

  it("stops attacks and targeted spells from starting, and anything aimed", () => {
    const world = createWorld({ fighters: [fighter({ abilities: [targeted, skillshot, aura] }), fighter()], distance: 100, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    expect(canStartAttack(world, self)).toBe(true);
    applyEffect(world, enemy, enemy, hide, { scale: 1 });
    expect(canStartAttack(world, self)).toBe(false);
    expect(canCast(world, self, targeted)).toBe(false);
    expect(inReach(skillshot, self, enemy)).toBe(false);
    // Effects around the caster still reach it.
    expect(inReach(aura, self, enemy)).toBe(true);
  });

  it("cancels windups but lets missiles already flying land", () => {
    const world = createWorld({ fighters: [fighter({ attack: RANGED }), fighter()], distance: 500, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    const attack = () => ({ kind: "attack" as const });
    step(world, [attack, standStill]);
    expect(self.action?.kind).toBe("windup");
    applyEffect(world, enemy, enemy, hide, { scale: 1 });
    expect(self.action).toBeUndefined();
    // A missile already on its way: hide after it launches.
    const second = createWorld({ fighters: [fighter({ attack: RANGED }), fighter()], distance: 500, modes: ["idle", "idle"] });
    step(second, [attack, standStill]);
    while (second.units[0].action) step(second, [idle, standStill]);
    expect(second.missiles.length).toBe(1);
    applyEffect(second, second.units[1], second.units[1], hide, { scale: 1 });
    for (let i = 0; i < 20; i++) step(second, [idle, standStill]);
    expect(second.units[1].hp).toBeLessThan(2000);
  });
});
