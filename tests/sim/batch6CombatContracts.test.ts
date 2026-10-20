import { describe, expect, it } from "vitest";
import { advanceMissiles, launchAttack, startAttack } from "../../engine/sim/actions";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { advancePets, spawnPet } from "../../engine/sim/pets";
import { projectileBlocked } from "../../engine/sim/projectileBlock";
import { createWorld } from "../../engine/sim/simulate";
import type { Effect, FighterSpec, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { lasting } from "./helpers";
import { fighter, RANGED } from "./kits";

const magic = (amount: number): Effect => ({ type: "damage", damageType: "magic", amount: { base: amount } });
const trueDamage = (amount: number): Effect => ({ type: "damage", damageType: "true", amount: { base: amount } });

function arena(attacker: FighterSpec = fighter({ attack: RANGED })): World {
  const world = createWorld({ fighters: [attacker, fighter({ base: { hp: 1000, armor: 0, mr: 0 } })], distance: 300, modes: ["idle", "idle"] });
  world.units[0].x = 0;
  world.units[1].x = 300;
  return world;
}

function summon(world: World, side: 0 | 1, x: number, overrides: Partial<PetSpec> = {}) {
  return spawnPet(world, world.units[side], { kind: "contract", name: "Contract pet", hp: 1000, armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: 100, ...overrides }, x);
}

function land(world: World): void {
  launchAttack(world, world.units[0]);
  for (let i = 0; i < 20; i++) { world.tick++; advanceMissiles(world); }
}

describe("connected pre-physical basic packets", () => {
  function source(): FighterSpec {
    return fighter({ attack: { ...RANGED, onHitToPets: true, beforeDamage: [trueDamage(5)], onHit: [trueDamage(7)] }, hooks: {
      onAttackBeforeDamage(ctx) {
        if (ctx.blocked) return;
        const memory = ctx.pet?.memory ?? ctx.enemy.memory;
        memory.contacts = Number(memory.contacts ?? 0) + 1;
        ctx.memory.lastTag = ctx.attack.attackTag ?? "ordinary";
        ctx.memory.lastCrit = ctx.critChance;
        applyEffect(ctx.world, ctx.self, ctx.enemy, magic(30), { scale: ctx.scale });
        applyEffect(ctx.world, ctx.self, ctx.enemy, magic((derive(ctx.enemy).maxHp - ctx.enemy.hp) / 2), { scale: ctx.scale });
      },
    } });
  }

  it("reads missing health after its flat proc and before the ordinary critical packet", () => {
    const world = arena(source());
    const order: string[] = [];
    world.units[1].hp = 600;
    world.units[1].spec.hooks = { onDamageTaken(ctx) { order.push(ctx.damageType); } };
    attackHit(world, world.units[0], world.units[1], false, [], undefined, false, { critChance: .5, attackTag: "declared:7" });
    expect(order).toEqual(["magic", "magic", "true", "physical", "true"]);
    expect(world.units[1].hp).toBe(193); // 600 - 30 - 215 - 5 - 150 - 7.
    expect(world.units[1].memory.contacts).toBe(1);
    expect(world.units[0].memory.lastTag).toBe("declared:7");
    expect(world.units[0].memory.lastCrit).toBe(.5);
  });

  it("supplies the expected hit share once without changing the launched critical chance", () => {
    const world = arena(source());
    world.units[1].hp = 600;
    world.units[0].spec.bonus = { critChance: 1 };
    attackHit(world, world.units[0], world.units[1], false, [], undefined, false, { critChance: .5 }, .25);
    expect(world.units[1].hp).toBeCloseTo(501.0625, 12);
    expect(world.units[0].memory.lastCrit).toBe(.5);
  });

  it("also precedes an attack that explicitly applies its ordinary on-hits before physical damage", () => {
    const attacker = source();
    attacker.attack.onHitBeforeDamage = true;
    attacker.attack.onHit = [{ type: "damage", damageType: "physical", amount: { base: 7 } }];
    const world = arena(attacker);
    const order: string[] = [];
    world.units[1].hp = 600;
    world.units[1].spec.hooks = { onDamageTaken(ctx) { order.push(ctx.damageType); } };
    attackHit(world, world.units[0], world.units[1], false, []);
    expect(order).toEqual(["magic", "magic", "physical", "true", "physical"]);
    expect(world.units[1].hp).toBe(243);
  });

  it.each(["blind", "dodgeAttacks", "parry", "untargetable", "stasis", "spellShield"])("does not apply a connected proc through %s", defense => {
    const world = arena(source());
    if (defense !== "blind") world.units[1].statuses.push(lasting("state", defense));
    attackHit(world, world.units[0], world.units[1], defense === "blind", [], undefined, false, { spellShield: defense === "spellShield" });
    expect(world.units[1].memory.contacts).toBeUndefined();
    expect(world.units[0].memory.lastTag).toBeUndefined();
    expect(world.units[1].hp).toBe(1000);
  });

  it("reports a blocked contact so an opt-in proc can reject it", () => {
    const world = arena(source());
    world.units[1].statuses.push(lasting("state", "blockAttacks"));
    attackHit(world, world.units[0], world.units[1], false, []);
    expect(world.units[1].memory.contacts).toBeUndefined();
    // The existing rule skips damage on-hits under blockAttacks as well.
    expect(world.units[1].hp).toBe(1000);
  });

  it("keeps ordinary spell shields and on-hit-only shields separate from the basic contact", () => {
    for (const spellShieldOnHit of [false, true]) {
      const world = arena(source());
      world.units[1].statuses.push(lasting("state", "spellShield"));
      attackHit(world, world.units[0], world.units[1], false, [], undefined, false, { spellShieldOnHit });
      expect(world.units[1].memory.contacts).toBe(1);
      expect(world.units[1].hp).toBe(843); // 30 + 15 missing-health proc + 5 + 100 + 7.
      expect(world.units[1].statuses.some(status => status.key === "spellShield")).toBe(!spellShieldOnHit);
    }
  });

  it("uses each actual pet's state, independently of another pet and the champion", () => {
    const world = arena(source());
    const first = summon(world, 1, 100), second = summon(world, 1, 200);
    first.hp = 600;
    startAttack(world, world.units[0], first); land(world);
    expect(first.hp).toBe(243);
    expect(first.memory.contacts).toBe(1);
    expect(second.hp).toBe(1000);
    expect(second.memory.contacts).toBeUndefined();
    expect(world.units[1].memory.contacts).toBeUndefined();
    startAttack(world, world.units[0], second); land(world);
    expect(second.hp).toBe(843);
    expect(second.memory.contacts).toBe(1);
    expect(first.memory.contacts).toBe(1);
  });

  it("classifies the extra magic procs separately from the one hit-count basic", () => {
    const world = arena(source());
    const target = summon(world, 1, 100, { hp: 3, hitPoints: true });
    startAttack(world, world.units[0], target); land(world);
    expect(target.hp).toBe(2);
    expect(target.memory.contacts).toBe(1);
  });

  it("does not share target-local contact state between cloned fights", () => {
    const world = arena(source());
    const target = summon(world, 1, 100);
    startAttack(world, world.units[0], target);
    const copy = cloneWorld(world);
    land(copy);
    expect(target.memory.contacts).toBeUndefined();
    land(world);
    expect(target.memory.contacts).toBe(1);
    expect(copy.pets[0]!.memory.contacts).toBe(1);
    expect(copy.pets[0]!.hp).toBe(target.hp);
  });

  it("leaves the existing before-damage and on-hit ordering unchanged without the hook", () => {
    const world = arena(fighter({ attack: { ...RANGED, onHitBeforeDamage: true, beforeDamage: [trueDamage(20)], onHit: [magic(10)] } }));
    const order: string[] = [];
    world.units[1].spec.hooks = { onDamageTaken(ctx) { order.push(ctx.damageType); } };
    attackHit(world, world.units[0], world.units[1], false, []);
    expect(order).toEqual(["magic", "true", "physical"]);
    expect(world.units[1].hp).toBe(870);
  });
});

describe("projectile destruction follows the traveled segment", () => {
  function aura(world: World, side: 0 | 1 = 1, startTick = 0, endTick = 100) {
    world.units[side].statuses.push(lasting("state", "projectileBlock", 30, { source: side, startTick, endTick }));
  }

  it.each([[0, 600], [600, 0]])("intercepts a fast segment crossing the whole aura (%i to %i)", (from, to) => {
    const world = arena(); aura(world);
    expect(projectileBlocked(world, 0, from, to)).toBe(true);
    expect(projectileBlocked(world, 0, 0, 204)).toBe(false);
    expect(projectileBlocked(world, 0, 0, 205)).toBe(true); // 300 - champion radius 65 - aura radius 30.
  });

  it("treats fractional boundary roundoff identically under reflection", () => {
    for (const direction of [1, -1]) {
      const world = arena(); aura(world);
      world.units[1].x = direction * 300.1;
      expect(projectileBlocked(world, 0, 0, direction * (205.1 - 1e-8))).toBe(true);
      expect(projectileBlocked(world, 0, 0, direction * (205.1 - 2e-6))).toBe(false);
    }
  });

  it("uses the current aura position and its exact activation and expiry", () => {
    const world = arena(); aura(world, 1, 5, 10);
    for (const tick of [4, 5, 9, 10]) {
      world.tick = tick;
      expect(projectileBlocked(world, 0, 0, 600)).toBe(tick >= 5 && tick < 10);
    }
    world.tick = 5;
    world.units[1].x = 1000;
    expect(projectileBlocked(world, 0, 0, 600)).toBe(false);
    world.units[1].x = 300;
    expect(projectileBlocked(world, 0, 0, 600)).toBe(true);
  });

  it("ignores a friendly aura and a hostile aura beyond the traveled segment", () => {
    const world = arena(); aura(world, 0);
    expect(projectileBlocked(world, 0, -600, 600)).toBe(false);
    aura(world);
    expect(projectileBlocked(world, 0, 0, 200)).toBe(false);
    expect(projectileBlocked(world, 0, 400, 600)).toBe(false);
  });

  function petShot(world: World, target: 1 | { pet: number }, perTick: number, projectile = true) {
    const source = summon(world, 0, 0);
    world.petMissiles = [{ id: world.nextId++, owner: 0, pet: source.id, target, x: 0, perTick, projectile, effects: [trueDamage(100)], blinded: false }];
  }

  it("destroys a pet-source projectile upon aura entry even before it can reach the champion", () => {
    const world = arena(); aura(world);
    petShot(world, 1, 210);
    advancePets(world);
    expect(world.petMissiles).toHaveLength(0);
    expect(world.units[1].hp).toBe(1000);
    world.units[1].statuses = [];
    advancePets(world);
    expect(world.units[1].hp).toBe(1000);
  });

  it("protects an actual pet behind the champion from a crossing pet-source projectile", () => {
    const world = arena(); aura(world);
    const target = summon(world, 1, 600);
    petShot(world, { pet: target.id }, 1000);
    advancePets(world);
    expect(world.petMissiles).toHaveLength(0);
    expect(target.hp).toBe(1000);
  });

  it("retains non-projectile pet packets and expired-aura projectiles", () => {
    for (const projectile of [false, true]) {
      const world = arena(); aura(world, 1, 0, projectile ? 0 : 100);
      petShot(world, 1, 1000, projectile);
      advancePets(world);
      expect(world.units[1].hp).toBe(900);
    }
  });

  it("preserves finite-width pet projectile-wall interception", () => {
    const world = arena();
    world.zones.push({ id: world.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x: 220, radius: 20, startTick: 0, endTick: 100 });
    petShot(world, 1, 205);
    advancePets(world);
    expect(world.petMissiles).toHaveLength(0); // Enters wall's radius without crossing its center.
    expect(world.units[1].hp).toBe(1000);
  });
});
