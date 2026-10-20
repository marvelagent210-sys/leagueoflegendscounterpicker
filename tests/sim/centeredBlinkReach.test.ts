import { describe, expect, it } from "vitest";
import { abilityReach, inReach, startCast } from "../../engine/sim/actions";
import { defaultBehavior, perceive } from "../../engine/sim/behavior";
import { engageRange, runScenarios } from "../../engine/sim/scenarios";
import { createWorld } from "../../engine/sim/simulate";
import type { AbilitySpec } from "../../engine/sim/spec";
import type { Side } from "../../engine/sim/state";
import { ability, fighter } from "./kits";

function blink(centered?: boolean): AbilitySpec {
  return ability({
    key: "R", slot: "R", delivery: { kind: "blink", direction: "toward", distance: 500, hitRadius: 270, ...(centered === undefined ? {} : { hitCentered: centered }) },
    onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }],
  });
}

function worldFor(spell: AbilitySpec, centers: number, side: Side = 0) {
  const self = fighter({ id: "blinker", base: { radius: 55, pathingRadius: 30 }, abilities: [spell] });
  const enemy = fighter({ id: "target", base: { radius: 65, pathingRadius: 35 } });
  return createWorld({ fighters: side === 0 ? [self, enemy] : [enemy, self], distance: centers - 120, modes: ["fight", "fight"] });
}

describe("centered blink reach agrees with arrival damage", () => {
  it.each([0, 1] as const)("reaches exactly 500 + 270 = 770 center units when cast from side %s", (side) => {
    const spell = blink(true);
    const world = worldFor(spell, 770, side);
    const self = world.units[side];
    const enemy = world.units[side === 0 ? 1 : 0];
    expect(abilityReach(spell, self, enemy)).toBe(770);
    expect(inReach(spell, self, enemy)).toBe(true);
    expect(defaultBehavior(perceive(world, side))).toEqual({ kind: "cast", ability: "R" });
    const before = enemy.hp;
    startCast(world, self, spell);
    expect(Math.abs(self.x - enemy.x)).toBe(270);
    expect(before - enemy.hp).toBe(100);
  });

  it("does not spend a centered damaging blink beyond its real arrival radius", () => {
    const spell = blink(true);
    const world = worldFor(spell, 770.01);
    const [self, enemy] = world.units;
    expect(inReach(spell, self, enemy)).toBe(false);
    expect(defaultBehavior(perceive(world, 0))).toEqual({ kind: "move", direction: 1 });
    const before = enemy.hp;
    // Even if explicitly forced, the same full blink cannot land its damage there.
    startCast(world, self, spell);
    expect(enemy.hp).toBe(before);
  });

  it.each([undefined, false])("preserves the ordinary hitbox blink boundary with hitCentered=%s", (centered) => {
    const spell = blink(centered);
    const world = worldFor(spell, 890);
    const [self, enemy] = world.units;
    expect(abilityReach(spell, self, enemy)).toBe(890);
    expect(inReach(spell, self, enemy)).toBe(true);
    expect(defaultBehavior(perceive(world, 0))).toEqual({ kind: "cast", ability: "R" });
    const before = enemy.hp;
    startCast(world, self, spell);
    expect(before - enemy.hp).toBe(100);
    const beyond = worldFor(spell, 890.01);
    expect(inReach(spell, ...beyond.units)).toBe(false);
  });

  it("starts centered and ordinary blink scenarios at their corresponding edge distances", () => {
    for (const [centered, edge] of [[true, 650], [false, 770]] as const) {
      const world = worldFor(blink(centered), 770);
      const [self, enemy] = world.units;
      expect(engageRange(self.spec, enemy.spec)).toBe(edge);
      const result = runScenarios(self.spec, enemy.spec, { settings: { maxSeconds: 0.1 } });
      expect(result.scenarios.find((scenario) => scenario.id === "youEngage")?.note).toBe(`from ${edge} units`);
    }
  });
});
