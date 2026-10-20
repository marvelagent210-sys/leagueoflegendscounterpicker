import { describe, expect, it } from "vitest";
import { canCast, canStartAttack, launchAttack, startAttack } from "../../engine/sim/actions";
import { applyCC, applyEffect, beginDeathDefied, dealDamage } from "../../engine/sim/combat";
import { hasState } from "../../engine/sim/derived";
import { advanceLifecycles } from "../../engine/sim/lifecycle";
import { createWorld, step } from "../../engine/sim/simulate";
import { cloneWorld, type Side, type World } from "../../engine/sim/state";
import { ability, fighter, RANGED } from "./kits";
import { idle } from "./helpers";

const advance = (world: World, through: number) => {
  while (!world.result && world.tick <= through) step(world, [idle, idle]);
};

describe("finite post-death movement and terminal packets", () => {
  it.each([0, 1] as const)("finishes a committed basic after its owner on side %s dies", (side) => {
    const ranged = fighter({ attack: { ...RANGED, missileSpeed: 600 } });
    const victim = fighter({ base: { hp: 5, hpRegen: 0 } });
    const world = createWorld({ fighters: side === 0 ? [ranged, victim] : [victim, ranged], distance: 300, modes: ["idle", "idle"] });
    const source = world.units[side], target = world.units[side === 0 ? 1 : 0];
    startAttack(world, source); launchAttack(world, source);
    expect(world.missiles).toHaveLength(1);
    dealDamage(world, target, source, 10000, "true");
    step(world, [idle, idle]); expect(world.result).toBeUndefined();
    advance(world, 90);
    expect(world.result?.winner).toBe("draw");
    expect(target.hp).toBeLessThanOrEqual(0);
  });
  it("preserves the stationary spell-casting defaults", () => {
    const spell = ability({ key: "Q", delivery: { kind: "self" }, flags: { usableWhileDisabled: true } });
    const world = createWorld({ fighters: [fighter({ abilities: [spell] }), fighter()], distance: 500, modes: ["fight", "idle"] });
    const unit = world.units[0];
    expect(beginDeathDefied(world, unit, { duration: 4 })).toBe(true);
    expect(canCast(world, unit, spell)).toBe(true);
    expect(canStartAttack(world, unit)).toBe(false);
    expect(hasState(unit, "noMovement")).toBe(true);
    const x = unit.x;
    step(world, [() => ({ kind: "move", direction: 1 }), idle]);
    expect(unit.x).toBe(x);
  });

  it.each([0, 1] as const)("allows side %i to move, with immunity but no attacks or abilities", (side) => {
    const spell = ability({ key: "Q", delivery: { kind: "self" }, flags: { usableWhileDisabled: true } });
    const world = createWorld({ fighters: [fighter({ abilities: [spell] }), fighter({ abilities: [spell] })], distance: 500, modes: ["fight", "fight"] });
    const unit = world.units[side];
    const enemy = world.units[side === 0 ? 1 : 0];
    expect(beginDeathDefied(world, unit, { duration: 4, allowMovement: true, allowCasting: false })).toBe(true);
    expect(hasState(unit, "noMovement")).toBe(false);
    expect(canCast(world, unit, spell)).toBe(false);
    expect(canStartAttack(world, unit)).toBe(false);
    expect(applyCC(world, enemy, unit, "stun", 5)).toBe(false);
    const x = unit.x;
    step(world, side === 0 ? [() => ({ kind: "move", direction: 1 }), idle] : [idle, () => ({ kind: "move", direction: 1 })]);
    expect(unit.x - x).toBeCloseTo(side === 0 ? 350 / 30 : -350 / 30, 10);
    expect(world.result).toBeUndefined();
  });

  it.each([0, 1] as const)("lets a ghosted moving post-death side %i cross champion collision", (side) => {
    const world = createWorld({ fighters: [fighter(), fighter()], distance: 0, modes: ["fight", "fight"] });
    const unit = world.units[side];
    unit.x = side === 0 ? 0 : 70;
    world.units[side === 0 ? 1 : 0].x = side === 0 ? 70 : 0;
    beginDeathDefied(world, unit, { duration: 4, allowMovement: true, allowCasting: false });
    applyEffect(world, unit, unit, { type: "state", state: "ghosted", duration: 4 }, { scale: 1 });
    const x = unit.x;
    step(world, side === 0 ? [() => ({ kind: "move", direction: 1 }), idle] : [idle, () => ({ kind: "move", direction: 1 })]);
    expect(unit.x - x).toBeCloseTo(side === 0 ? 350 / 30 : -350 / 30, 10);
  });

  it("retains an already-launched incoming homing missile when protection begins", () => {
    const world = createWorld({ fighters: [fighter(), fighter({ attack: RANGED })], distance: 500, modes: ["idle", "idle"] });
    startAttack(world, world.units[1]);
    launchAttack(world, world.units[1]);
    expect(world.missiles).toHaveLength(1);
    beginDeathDefied(world, world.units[0], { duration: 4, allowMovement: true, allowCasting: false });
    expect(world.missiles).toHaveLength(1);
    advance(world, 30);
    expect(world.units[0].hp).toBe(1);
    expect(world.units[0].totals.damageTaken).toBe(0);
  });

  it("runs its terminal packet exactly once at expiry before final death and scheduled effects", () => {
    let calls = 0;
    const world = createWorld({ fighters: [fighter({ hooks: { onDeathDefiedEnd(ctx) {
      calls++;
      expect(ctx.tick).toBe(120);
      expect(ctx.self.alive).toBe(true);
      expect(ctx.self.hp).toBeGreaterThan(0);
      expect(ctx.self.deathDefied).toBeUndefined();
      dealDamage(ctx.world, ctx.self, ctx.enemy, 5000, "true", {});
    } } }), fighter()], distance: 0, modes: ["flee", "idle"] });
    beginDeathDefied(world, world.units[0], { duration: 4, allowMovement: true, allowCasting: false });
    world.scheduled.push({ tick: 120, owner: 1, target: 0, scale: 1, effects: [{ type: "damage", damageType: "true", amount: { base: 10 } }] });
    advance(world, 119);
    expect(calls).toBe(0);
    expect(world.result).toBeUndefined();
    step(world, [idle, idle]);
    expect(world.result).toEqual({ winner: "draw", reason: "death", tick: 120 });
    expect(world.units[0].alive).toBe(false);
    expect(world.units[0].hp).toBe(0);
    advanceLifecycles(world);
    expect(calls).toBe(1);
  });

  it("credits the counted death at lethal damage and never again at terminal expiry", () => {
    let kills = 0;
    const zombie = fighter({ hooks: { onLethal(ctx) { return beginDeathDefied(ctx.world, ctx.self, { duration: 1, allowMovement: true, allowCasting: false }); } } });
    const world = createWorld({ fighters: [zombie, fighter({ hooks: { onKill() { kills++; } } })], distance: 0, modes: ["idle", "idle"] });
    dealDamage(world, world.units[1], world.units[0], 5000, "true", {});
    expect(kills).toBe(1);
    expect(world.units[0].fallen).toBe(true);
    expect(beginDeathDefied(world, world.units[0], { duration: 1 })).toBe(false);
    advance(world, 30);
    expect(kills).toBe(1);
    expect(world.result?.winner).toBe(1);
  });

  it("copies the moving phase without sharing expiry state across branches", () => {
    const world = createWorld({ fighters: [fighter(), fighter()], distance: 0, modes: ["idle", "idle"] });
    beginDeathDefied(world, world.units[0], { duration: 4, allowMovement: true, allowCasting: false });
    const fork = cloneWorld(world);
    fork.units[0].deathDefied!.endTick = 1;
    advance(fork, 1);
    expect(fork.units[0].alive).toBe(false);
    expect(world.units[0].deathDefied?.endTick).toBe(120);
    expect(world.units[0].alive).toBe(true);
  });
});

describe("explicit persistent aftermath", () => {
  const poisonWorld = (persistent: boolean, changes: { perHit?: number; nextTick?: number } = {}) => {
    const poison = ability({ key: "I", delivery: { kind: "self" }, persistsAfterDeath: persistent });
    const world = createWorld({ fighters: [fighter({ abilities: [poison] }), fighter()], distance: 0, modes: ["idle", "idle"] });
    applyEffect(world, world.units[0], world.units[1], { type: "dot", damageType: "true", total: { base: 60 }, duration: 2, interval: 1, stacks: true }, { ability: poison, scale: 1 });
    Object.assign(world.units[1].statuses.find((status) => status.kind === "dot")!.dot!, changes);
    world.units[0].hp = 0;
    return world;
  };

  it("waits for a sourced stacked poison after its owner dies, allowing a delayed draw", () => {
    const world = poisonWorld(true);
    world.units[1].hp = 50;
    step(world, [idle, idle]);
    expect(world.result).toBeUndefined();
    advance(world, 60);
    expect(world.result).toEqual({ winner: "draw", reason: "death", tick: 60 });
    expect(world.units[0].totals.damageDealt).toBe(50);
  });

  it("leaves non-opted-in poison death termination unchanged", () => {
    const world = poisonWorld(false);
    step(world, [idle, idle]);
    expect(world.result).toEqual({ winner: 1, reason: "death", tick: 0 });
  });

  it.each([{ perHit: 0 }, { nextTick: 61 }])("does not wait for non-damaging or exhausted poison %j", (changes) => {
    const world = poisonWorld(true, changes);
    step(world, [idle, idle]);
    expect(world.result?.winner).toBe(1);
  });

  it.each([true, false])("continues an opted-in damaging field only while it has pulses left: %s", (persistent) => {
    const burn = ability({ key: "Wpatch", persistsAfterDeath: persistent, delivery: { kind: "self" }, flags: { spellShield: false } });
    const world = createWorld({ fighters: [fighter({ abilities: [burn] }), fighter()], distance: 0, modes: ["idle", "idle"] });
    world.zones.push({ id: world.nextId++, owner: 0, kind: "field", ability: burn.key, seenTick: 0, x: world.units[1].x, radius: 200, startTick: 0, endTick: 61, interval: 30, nextTick: 30, onHit: [{ type: "damage", damageType: "true", amount: { base: 30 } }] });
    world.units[0].hp = 0;
    world.units[0].alive = false;
    step(world, [idle, idle]);
    if (!persistent) {
      expect(world.zones).toHaveLength(0);
      expect(world.result?.tick).toBe(0);
    } else {
      expect(world.result).toBeUndefined();
      advance(world, 61);
      expect(world.units[1].hp).toBe(1940);
      expect(world.result).toEqual({ winner: 1, reason: "death", tick: 60 });
    }
  });

  it("does not wait for an empty persistent field", () => {
    const field = ability({ key: "W", persistsAfterDeath: true, delivery: { kind: "self" } });
    const world = createWorld({ fighters: [fighter({ abilities: [field] }), fighter()], distance: 0, modes: ["idle", "idle"] });
    world.zones.push({ id: world.nextId++, owner: 0, kind: "field", ability: field.key, seenTick: 0, x: 0, radius: 200, startTick: 0, endTick: 90, interval: 30, nextTick: 30, onHit: [] });
    world.units[0].hp = 0;
    step(world, [idle, idle]);
    expect(world.result?.tick).toBe(0);
  });

  it("bounds aftermath by the existing maximum fight duration", () => {
    const world = poisonWorld(true);
    world.settings.maxSeconds = 1;
    advance(world, 30);
    expect(world.result).toEqual({ winner: 1, reason: "death", tick: 30 });
  });
});
