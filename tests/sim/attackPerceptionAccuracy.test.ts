import { describe, expect, it } from "vitest";
import { startAttack, startCast } from "../../engine/sim/actions";
import { defaultBehavior, perceive, threatsTo } from "../../engine/sim/behavior";
import { applyEffect } from "../../engine/sim/combat";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, AttackSplit } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { idle } from "./helpers";
import { ability, fighter, RANGED } from "./kits";

const shield = ability({ key: "W", delivery: { kind: "self" }, onSelf: [{ type: "state", state: "spellShield", duration: 1, charges: 1 }] });
const preserve = (seconds = 1) => ability({ key: "Q", castTime: seconds, preserveAttackWindup: true, delivery: { kind: "self" } });
const advance = (world: World, until: number) => {
  while (world.tick <= until) step(world, [idle, idle]);
};

const setup = (options: {
  preserving?: AbilitySpec; ranged?: boolean; critChance?: number; split?: AttackSplit;
  bonus?: number; criticalBonus?: boolean; spellShield?: boolean; reactionTime?: number; guard?: AbilitySpec;
} = {}) => {
  const observer = fighter({ base: { hp: 1000, armor: 0, mr: 0 }, abilities: [options.guard ?? shield] });
  const source = fighter({
    base: { ad: 100, armor: 0, mr: 0, attackSpeed: { base: 1, ratio: 1, bonus: 0 }, windup: { percent: 0.3, modifier: 1 } },
    attack: options.ranged ? { ...RANGED, missileSpeed: 300 } : {},
    bonus: { critChance: options.critChance ?? 0 }, abilities: options.preserving ? [options.preserving] : [],
  });
  const world = createWorld({ fighters: [observer, source], distance: options.ranged ? 100 : 0, modes: ["fight", "idle"], settings: { reactionTime: options.reactionTime ?? 0, log: true } });
  const enemy = world.units[1];
  if (options.bonus !== undefined || options.split || options.spellShield) applyEffect(world, enemy, enemy, {
    type: "empower", attacks: 1, window: 5, split: options.split, spellShield: options.spellShield,
    onHit: options.bonus !== undefined ? [{ type: "damage", damageType: "physical", amount: { base: options.bonus }, canCrit: options.criticalBonus }] : [],
  }, { scale: 1 });
  return world;
};

const declare = (world: World) => {
  const enemy = world.units[1];
  startAttack(world, enemy);
  const spell = enemy.spec.abilities[0];
  if (spell) startCast(world, enemy, spell);
};
const attacks = (world: World) => threatsTo(world, 0).filter((threat) => threat.source === "attack");

describe("pending attacks remain visible to champion perception", () => {
  it("counts the pending windup once alongside its parallel cast, with the original impact tick", () => {
    const world = setup({ preserving: preserve() });
    declare(world);
    world.tick = 3;
    expect(attacks(world)).toMatchObject([{ eta: 6, damage: 100, targeted: true, attackLike: true }]);
    expect(attacks(world)).toHaveLength(1);
    expect(threatsTo(world, 0).filter((threat) => threat.source === "Q")).toHaveLength(1);
  });

  it("does not invent a future attack while an unseen pending windup waits after a short cast", () => {
    const world = setup({ preserving: preserve(1 / 30), reactionTime: 0.1 });
    declare(world);
    advance(world, 1);
    expect(world.units[1].action).toBeUndefined();
    expect(world.units[1].pendingAttack?.launchTick).toBe(9);
    expect(attacks(world)).toEqual([]);
    world.tick = 3;
    expect(attacks(world)).toMatchObject([{ eta: 6 }]);
    expect(attacks(world)[0]?.predicted).toBeUndefined();
  });
});

describe("committed attack threats use declared metadata", () => {
  it.each([
    [false, 0, 140], [false, 1, 280],
    [true, 0, 140], [true, 1, 280],
  ] as const)("preserved=%s, declared critical chance=%i estimates %i despite changing crit", (preserved, critChance, expected) => {
    const world = setup({ preserving: preserved ? preserve() : undefined, critChance, bonus: 40, criticalBonus: true });
    declare(world);
    const enemy = world.units[1];
    applyEffect(world, enemy, enemy, { type: "stat", stat: "critChance", amount: { base: 1 - 2 * critChance }, duration: 5 }, { scale: 1 });
    expect(attacks(world)).toHaveLength(1);
    expect(attacks(world)[0]?.damage).toBe(expected);
  });

  it("keeps critical chance, split replacement and whole-attack spell shielding on an in-flight attack", () => {
    const world = setup({ preserving: preserve(), ranged: true, critChance: 1, split: { physical: 0, magic: 0 }, bonus: 40, criticalBonus: true, spellShield: true });
    declare(world);
    advance(world, 9);
    const enemy = world.units[1];
    applyEffect(world, enemy, enemy, { type: "stat", stat: "critChance", amount: { base: -1 }, duration: 5 }, { scale: 1 });
    const missile = world.missiles.find((m) => m.source === "attack");
    if (!missile) throw new Error("Missing committed attack missile");
    expect(attacks(world)).toMatchObject([{ id: missile.id, damage: 80, spellShieldable: true, projectile: true }]);
    expect(attacks(world)).toHaveLength(1);
  });

  it("applies split shares to the basic damage separately from critical bonus damage", () => {
    const world = setup({ preserving: preserve(), critChance: 1, split: { physical: 0.3, magic: 0.3 }, bonus: 40, criticalBonus: true });
    declare(world);
    // 100 AD * 200% crit * 60% replacement shares, plus40 * 200% critical bonus.
    expect(attacks(world)[0]?.damage).toBe(200);
  });

  it("uses current critical chance for an attack forecast that has not been declared", () => {
    const world = setup();
    const enemy = world.units[1];
    expect(attacks(world)).toMatchObject([{ damage: 100, predicted: true }]);
    applyEffect(world, enemy, enemy, { type: "stat", stat: "critChance", amount: { base: 1 }, duration: 5 }, { scale: 1 });
    expect(attacks(world)).toMatchObject([{ damage: 200, predicted: true }]);
  });
});

describe("champion perception ignores attacks directed at pets", () => {
  it.each([false, true])("does not treat a preserved=%s pet windup as a champion threat", (preserved) => {
    const world = setup({ preserving: preserved ? preserve(1 / 30) : undefined });
    const enemy = world.units[1];
    const pet = spawnPet(world, world.units[0], { kind: "turret", name: "Pet target", hp: 1000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 10 }, enemy.x - 100);
    startAttack(world, enemy, pet);
    if (preserved) {
      startCast(world, enemy, enemy.spec.abilities[0]!);
      advance(world, 1);
    }
    expect(attacks(world)).toEqual([]);
  });

  it("ignores a pet-directed missile even when it carries attack snapshot metadata", () => {
    const world = setup({ preserving: preserve(), ranged: true });
    const enemy = world.units[1];
    const pet = spawnPet(world, world.units[0], { kind: "turret", name: "Pet target", hp: 1000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 10 }, enemy.x - 200);
    startAttack(world, enemy, pet);
    startCast(world, enemy, enemy.spec.abilities[0]!);
    advance(world, 9);
    expect(world.missiles.some((m) => m.pet === pet.id && m.attack !== undefined)).toBe(true);
    expect(attacks(world)).toEqual([]);
  });
});

describe("spell-shield reactions to empowered attacks", () => {
  it.each([false, true])("uses a shield against a large committed attack only when explicitly spell-shieldable=%s", (spellShield) => {
    const world = setup({ preserving: preserve(), bonus: 500, spellShield });
    declare(world);
    const view = perceive(world, 0);
    expect(view.threats.find((threat) => threat.source === "attack")?.spellShieldable).toBe(spellShield);
    expect(defaultBehavior(view)).toEqual(spellShield ? { kind: "cast", ability: "W" } : { kind: "attack" });
  });

  it("does not spend a spell shield on a small shieldable empowered attack", () => {
    const world = setup({ preserving: preserve(), bonus: 10, spellShield: true });
    declare(world);
    expect(defaultBehavior(perceive(world, 0))).not.toEqual({ kind: "cast", ability: "W" });
  });
});

it("parries an observed preserved attack's immobilize even when its damage is below lethal", () => {
  const parry = ability({ key: "F", delivery: { kind: "self" }, onSelf: [{ type: "state", state: "parry", duration: 0.75 }] });
  const world = setup({ preserving: preserve(), guard: parry });
  const enemy = world.units[1];
  applyEffect(world, enemy, enemy, { type: "empower", attacks: 1, window: 5, onHit: [{ type: "cc", cc: "stun", duration: 1 }] }, { scale: 1 });
  declare(world);
  expect(attacks(world)).toMatchObject([{ damage: 100, immobilizes: true }]);
  expect(defaultBehavior(perceive(world, 0))).toEqual({ kind: "cast", ability: "F" });
});
