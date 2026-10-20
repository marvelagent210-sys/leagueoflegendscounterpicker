import { describe, expect, it } from "vitest";
import { completeCast } from "../../engine/sim/actions";
import { threatsTo } from "../../engine/sim/behavior";
import { projectileBlocked } from "../../engine/sim/projectileBlock";
import { createWorld } from "../../engine/sim/simulate";
import type { AbilitySpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { ability, fighter } from "./kits";

function setup(projectile?: boolean, direction: 1 | -1 = 1) {
  const shot = ability({ key: "Q", castTime: 0.75, decisive: true,
    delivery: { kind: "line", range: 500, width: 80 },
    ...(projectile === undefined ? {} : { flags: { projectile } }),
    onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
  const world = createWorld({ fighters: [fighter({ abilities: [shot] }), fighter()], distance: 300,
    modes: ["idle", "idle"], settings: { log: true, reactionTime: 10 } });
  world.units[0].x = 0;
  world.units[1].x = direction * 300;
  return { world, shot };
}

function wall(world: World, x: number, owner: 0 | 1 = 1, startTick = 0, endTick = 100) {
  world.zones.push({ id: world.nextId++, owner, kind: "projectileWall", seenTick: 0, x,
    radius: 0, startTick, endTick });
}

function fire(world: World, shot: AbilitySpec) {
  return completeCast(world, world.units[0], shot, world.tick);
}

describe("instant lines with explicit projectile defenses", () => {
  it.each([1, -1] as const)("blocks a speedless projectile before any hit or split, direction %s", (direction) => {
    const { world, shot } = setup(true, direction);
    wall(world, direction * 150);
    expect(fire(world, shot)).toBeUndefined();
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.missiles).toHaveLength(0);
    expect(world.zones).toHaveLength(1);
    expect(world.log.some((event) => event.text.includes("projectile block"))).toBe(true);
  });

  it.each([false, undefined])("keeps an ordinary instant beam unblocked when projectile is %s", (projectile) => {
    const { world, shot } = setup(projectile);
    wall(world, 150);
    fire(world, shot);
    expect(world.units[1].totals.damageTaken).toBe(100);
  });

  it.each([1, -1] as const)("does not test a wall beyond the target's first contact, direction %s", (direction) => {
    const { world, shot } = setup(true, direction);
    wall(world, direction * 250); // First target edge is at 235, before the wall.
    fire(world, shot);
    expect(world.units[1].totals.damageTaken).toBe(100);
  });

  it("ignores a friendly wall and observes exact wall activation and expiry", () => {
    for (const [owner, startTick, endTick, tick, expected] of [
      [0, 0, 100, 0, 100], [1, 5, 10, 4, 100], [1, 5, 10, 5, 0], [1, 5, 10, 10, 100],
    ] as const) {
      const { world, shot } = setup(true);
      world.tick = tick;
      wall(world, 150, owner, startTick, endTick);
      fire(world, shot);
      expect(world.units[1].totals.damageTaken).toBe(expected);
    }
  });

  it("observes active projectile-block auras and their exact expiry", () => {
    for (const tick of [4, 5, 10]) {
      const { world, shot } = setup(true);
      world.tick = tick;
      world.units[1].statuses.push({ kind: "state", key: "projectileBlock", source: 1,
        value: 200, startTick: 5, endTick: 10 });
      fire(world, shot);
      expect(world.units[1].totals.damageTaken).toBe(tick === 5 ? 0 : 100);
    }
  });

  it("does not apply a target's aura to a segment that ends outside its range", () => {
    const { world } = setup();
    world.units[1].statuses.push({ kind: "state", key: "projectileBlock", source: 1,
      value: 30, startTick: 0, endTick: 10 });
    expect(projectileBlocked(world, 0, 0, 100)).toBe(false);
    expect(projectileBlocked(world, 0, 0, 235)).toBe(true);
  });

  it.each([true, false, undefined])("announces a no-flight-time cast's projectile flag as %s", (projectile) => {
    const { world, shot } = setup(projectile);
    world.settings.reactionTime = 0;
    world.units[0].action = { kind: "cast", ability: shot.key, startTick: 0, endTick: 23 };
    const threat = threatsTo(world, 1).find((entry) => entry.source === shot.key);
    expect(threat?.projectile).toBe(projectile === true);
    expect(threat?.eta).toBe(23);
  });
});
