import { describe, expect, it } from "vitest";
import { defaultBehavior, perceive } from "../../engine/sim/behavior";
import { applyEffect } from "../../engine/sim/combat";
import { createWorld, step } from "../../engine/sim/simulate";
import { idle } from "./helpers";
import { fighter } from "./kits";

describe("fleeing-target attack boundaries", () => {
  const pursuer = fighter({
    base: { radius: 65, attackSpeed: { base: 1, ratio: 1, bonus: 0 }, windup: { percent: 0.2, modifier: 1 } },
    attack: { range: 125 },
  });
  const fleeing = fighter({ base: { radius: 80, moveSpeed: 340 } });

  it.each([0, 1] as const)("declares side%i's enhanced attack at the reflected windup escape boundary", (side) => {
    const world = createWorld({ fighters: side === 0 ? [pursuer, fleeing] : [fleeing, pursuer], distance: 107, modes: ["hold", "hold"] });
    const self = world.units[side];
    const enemy = world.units[side === 0 ? 1 : 0];
    // These reflected positions occurred at tick35 in the real Darius→Renekton trade.
    // Their nominal107-unit edge distance rounds to opposite sides of107.
    self.x = side === 0 ? 496.99999999999983 : 217.99999999999994;
    enemy.x = side === 0 ? 749.0000000000001 : -34.000000000000014;
    enemy.moved = -1;
    applyEffect(world, self, self, { type: "empower", attacks: 1, window: 5, bonusRange: 50, onHit: [] }, { scale: 1 });
    //175 attack range -340 movement speed *6/30-second windup =107 edge units.
    expect(defaultBehavior(perceive(world, side))).toEqual({ kind: "attack" });
  });

  it("still avoids an attack when a fleeing target would leave its range by a meaningful amount", () => {
    const world = createWorld({ fighters: [pursuer, fleeing], distance: 107.001, modes: ["hold", "hold"] });
    const self = world.units[0];
    world.units[1].moved = -1;
    applyEffect(world, self, self, { type: "empower", attacks: 1, window: 5, bonusRange: 50, onHit: [] }, { scale: 1 });
    expect(defaultBehavior(perceive(world, 0))).toEqual({ kind: "move", direction: 0 });
  });
});

describe("escape and disengagement boundaries", () => {
  it.each([
    ["trade", 700.0000000000001, "disengaged"],
    ["trade", 699.9999999999989, "disengaged"],
    ["flee", 1400.0000000000002, "escaped"],
    ["flee", 1399.9999999999989, "escaped"],
  ] as const)("ends %s at the nominal boundary represented as %f on the same tick", (mode, distance, reason) => {
    const self = fighter({ base: { hp: 1000, hpRegen: 150 } });
    const world = createWorld({ fighters: [self, self], distance, modes: [mode, "hold"], hp: [0.5, 0.5] });
    world.units[0].memory.tradeDone = true;
    step(world, [idle, idle]);
    expect(world.result).toMatchObject({ winner: "none", reason, tick: 0 });
    // Reflection cannot buy either side an extra tick of passive regeneration.
    expect(world.units.map((unit) => unit.hp)).toEqual([501, 501]);
  });

  it.each([["trade", 699.999], ["flee", 1399.999]] as const)("continues %s while meaningfully inside its ending boundary", (mode, distance) => {
    const world = createWorld({ fighters: [fighter(), fighter()], distance, modes: [mode, "hold"] });
    world.units[0].memory.tradeDone = true;
    step(world, [idle, idle]);
    expect(world.result).toBeUndefined();
  });
});
