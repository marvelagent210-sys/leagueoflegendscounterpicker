import { describe, expect, it } from "vitest";
import { canStartAttack, startAttack, startCast } from "../../engine/sim/actions";
import { applyEffect } from "../../engine/sim/combat";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, fork, step } from "../../engine/sim/simulate";
import type { AbilitySpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { idle } from "./helpers";
import { ability, fighter, RANGED } from "./kits";

const advance = (world: World, until: number) => {
  while (world.tick <= until) step(world, [idle, idle]);
};

const preservingCast = (seconds = 1) => ability({
  key: "Q", castTime: seconds, preserveAttackWindup: true, delivery: { kind: "self" },
});

const prepared = (spell: AbilitySpec = preservingCast(), options: {
  uncancellable?: boolean; hitsUntargetable?: boolean; ranged?: boolean; critChance?: number; criticalBonus?: boolean; pet?: boolean;
} = {}) => {
  const source = fighter({
    base: { hp: 10000, armor: 0, mr: 0, ad: 100, attackSpeed: { base: 1, ratio: 1, bonus: 0 }, windup: { percent: 0.3, modifier: 1 } },
    attack: options.ranged ? { ...RANGED, missileSpeed: 300 } : {},
    abilities: [spell], bonus: { critChance: options.critChance ?? 0 },
    hooks: {
      onAttackLaunch(ctx) {
        ctx.memory.launches = Number(ctx.memory.launches ?? 0) + 1;
        ctx.memory.lastLaunch = ctx.tick;
      },
      onCast(ctx) { ctx.memory.casts = Number(ctx.memory.casts ?? 0) + 1; },
    },
  });
  const target = fighter({ base: { hp: 10000, armor: 0, mr: 0 } });
  const world = createWorld({ fighters: [source, target], distance: options.ranged ? 100 : 0, modes: ["idle", "idle"], settings: { log: true } });
  const self = world.units[0];
  if (options.uncancellable || options.hitsUntargetable || options.criticalBonus) applyEffect(world, self, self, {
    type: "empower", attacks: 1, window: 5, uncancellable: options.uncancellable,
    hitsUntargetable: options.hitsUntargetable,
    onHit: options.criticalBonus ? [{ type: "damage", damageType: "physical", amount: { base: 40 }, canCrit: true }] : [],
  }, { scale: 1 });
  const pet = options.pet ? spawnPet(world, world.units[1], {
    kind: "turret", name: "Snapshot target", hp: 1000, armor: 0, mr: 0,
    radius: 35, moveSpeed: 0, duration: Number.POSITIVE_INFINITY,
  }, self.x + (options.ranged ? 200 : 100)) : undefined;
  startAttack(world, self, pet);
  expect(self.action).toMatchObject({ kind: "windup", launchTick: 9 });
  startCast(world, self, spell);
  expect(self.pendingAttack).toMatchObject({ launchTick: 9 });
  return world;
};

describe("preserved attacks complete independently", () => {
  it.each([
    ["cast", preservingCast()],
    ["dash", ability({ key: "Q", preserveAttackWindup: true, delivery: { kind: "dash", direction: "away", distance: 30, speed: 30 } })],
    ["channel", ability({ key: "Q", preserveAttackWindup: true, delivery: { kind: "self" }, channel: { duration: 1, interruptible: false } })],
  ] as const)("launches at the original tick during a longer %s", (kind, spell) => {
    const world = prepared(spell);
    const [self, enemy] = world.units;
    advance(world, 8);
    expect(enemy.totals.damageTaken).toBe(0);
    expect(canStartAttack(world, self)).toBe(false);
    step(world, [idle, idle]);
    expect(enemy.totals.damageTaken).toBe(100);
    expect(self.memory.lastLaunch).toBe(9);
    expect(self.memory.launches).toBe(1);
    expect(self.pendingAttack).toBeUndefined();
    expect(self.action?.kind).toBe(kind);
    advance(world, 40);
    expect(enemy.totals.damageTaken).toBe(100);
    expect(self.memory.launches).toBe(1);
    expect(self.action).toBeUndefined();
  });

  it("resolves an attack and cast due on the same tick once each", () => {
    const spell = ability({ key: "Q", castTime: 0.3, preserveAttackWindup: true, delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 40 } }] });
    const world = prepared(spell);
    advance(world, 8);
    expect(world.units[1].totals.damageTaken).toBe(0);
    step(world, [idle, idle]);
    expect(world.units[1].totals.damageTaken).toBe(140);
    expect(world.log.filter((e) => e.text === "attack deals 100 physical damage").map((e) => e.tick)).toEqual([9]);
    expect(world.log.filter((e) => e.text === "Q deals 40 true damage").map((e) => e.tick)).toEqual([9]);
    advance(world, 40);
    expect(world.units[0].memory).toMatchObject({ launches: 1, casts: 1 });
    expect(world.units[1].totals.damageTaken).toBe(140);
  });

  it("clones the pending launch schedule and snapshot independently", () => {
    const original = prepared();
    const copy = cloneWorld(original);
    expect(copy.units[0].pendingAttack).not.toBe(original.units[0].pendingAttack);
    if (!copy.units[0].pendingAttack) throw new Error("Missing copied windup");
    copy.units[0].pendingAttack.launchTick = 18;
    copy.units[0].pendingAttack.critChance = 1;
    advance(original, 9);
    advance(copy, 9);
    expect(original.units[1].totals.damageTaken).toBe(100);
    expect(copy.units[1].totals.damageTaken).toBe(0);
    advance(copy, 18);
    expect(copy.units[1].totals.damageTaken).toBe(200);
    expect(original.units[1].totals.damageTaken).toBe(100);
  });

  it("forks without sharing pending-attack cancellation between branches", () => {
    const world = prepared();
    world.zones.push({ id: 100, owner: 0, kind: "delayedArea", seenTick: 0, x: 1000, radius: 1, startTick: 0, endTick: 90, ability: "Q", onHit: [], connects: true });
    const [hit, miss] = fork(world, [{ zone: 100, chance: 0.5 }]);
    expect(hit?.weight).toBe(0.5);
    expect(miss?.weight).toBe(0.5);
    if (!hit || !miss) throw new Error("Expected two independent branches");
    expect(hit.units[0].pendingAttack).not.toBe(miss.units[0].pendingAttack);
    applyEffect(miss, miss.units[1], miss.units[0], { type: "cc", cc: "polymorph", duration: 1 }, { scale: 1 });
    advance(hit, 9);
    advance(miss, 9);
    expect(hit.units[1].totals.damageTaken).toBe(100);
    expect(miss.units[1].totals.damageTaken).toBe(0);
    expect(hit.units[0].memory.launches).toBe(1);
    expect(miss.units[0].memory.launches).toBeUndefined();
  });
});

describe("preserved windups retain cancellation rules", () => {
  it.each([
    ["stun", false, false], ["stun", true, true],
    ["polymorph", false, false], ["polymorph", true, false],
  ] as const)("applies %s to an uncancellable=%s windup: completion=%s", (cc, uncancellable, completes) => {
    const world = prepared(preservingCast(), { uncancellable });
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc, duration: 1 }, { scale: 1 });
    expect(world.units[0].action?.kind).toBe("cast");
    expect(world.units[0].pendingAttack !== undefined).toBe(completes);
    advance(world, 9);
    expect(world.units[1].totals.damageTaken).toBe(completes ? 100 : 0);
  });

  it.each([false, true])("handles target range loss with uncancellable=%s without cancelling the parallel cast", (uncancellable) => {
    const world = prepared(preservingCast(), { uncancellable });
    const [self, enemy] = world.units;
    const targetX = enemy.x;
    enemy.x += 1000;
    step(world, [idle, idle]);
    expect(self.pendingAttack !== undefined).toBe(uncancellable);
    expect(self.action?.kind).toBe("cast");
    enemy.x = targetX;
    advance(world, 9);
    expect(enemy.totals.damageTaken).toBe(uncancellable ? 100 : 0);
  });

  it.each([
    ["untargetable", false, false], ["untargetable", true, true],
    ["stasis", false, false], ["stasis", true, false],
  ] as const)("handles %s with the untargetable-hit exception=%s: completion=%s", (state, hitsUntargetable, completes) => {
    const world = prepared(preservingCast(), { uncancellable: true, hitsUntargetable });
    const [self, enemy] = world.units;
    applyEffect(world, enemy, enemy, { type: "state", state, duration: 1 }, { scale: 1 });
    expect(self.pendingAttack !== undefined).toBe(completes);
    expect(self.action?.kind).toBe("cast");
    advance(world, 9);
    expect(enemy.totals.damageTaken).toBe(completes ? 100 : 0);
  });

  it.each(["taunt", "berserk"] as const)("does not declare a second %s attack while the older windup is pending", (cc) => {
    const world = prepared(preservingCast(0.1), { uncancellable: true });
    const self = world.units[0];
    advance(world, 3);
    expect(self.action).toBeUndefined();
    expect(self.pendingAttack?.launchTick).toBe(9);
    // A reset must not allow forced targeting to overwrite or duplicate the pending hit.
    self.attackReadyTick = 0;
    applyEffect(world, world.units[1], self, { type: "cc", cc, duration: 1 }, { scale: 1 });
    step(world, [idle, idle]);
    expect(self.action).toBeUndefined();
    expect(self.pendingAttack?.launchTick).toBe(9);
    expect(world.units[1].totals.damageTaken).toBe(0);
    advance(world, 9);
    expect(world.units[1].totals.damageTaken).toBe(100);
    expect(self.memory.launches).toBe(1);
  });
});

describe("preserved attacks retain their declared critical chance", () => {
  it.each([
    [false, 0, 140], [false, 1, 280],
    [true, 0, 140], [true, 1, 280],
  ] as const)("ranged=%s, declared critical chance=%i: deals %i after crit changes", (ranged, critChance, expected) => {
    const world = prepared(preservingCast(), { ranged, critChance, criticalBonus: true });
    const self = world.units[0];
    applyEffect(world, self, self, { type: "stat", stat: "critChance", amount: { base: 1 - 2 * critChance }, duration: 5 }, { scale: 1 });
    advance(world, 9);
    if (ranged) {
      expect(world.units[1].totals.damageTaken).toBe(0);
      expect(world.missiles.find((m) => m.source === "attack")?.attack?.critChance).toBe(critChance);
      // Updating the same stat effect in flight cannot replace the declared snapshot.
      applyEffect(world, self, self, { type: "stat", stat: "critChance", amount: { base: 0.5 - critChance }, duration: 5 }, { scale: 1 });
      advance(world, 40);
    }
    expect(world.units[1].totals.damageTaken).toBe(expected);
    expect(self.memory.launches).toBe(1);
  });

  it.each([false, true])("carries a pet attack's declared crit through preservation and ranged=%s travel", (ranged) => {
    const world = prepared(preservingCast(), { ranged, critChance: 1, pet: true });
    const self = world.units[0];
    const pet = world.pets[0];
    if (!pet) throw new Error("Missing pet attack target");
    applyEffect(world, self, self, { type: "stat", stat: "critChance", amount: { base: -1 }, duration: 5 }, { scale: 1 });
    advance(world, 9);
    if (ranged) {
      expect(pet.hp).toBe(1000);
      expect(world.missiles.find((m) => m.pet === pet.id)?.attack?.critChance).toBe(1);
      applyEffect(world, self, self, { type: "stat", stat: "critChance", amount: { base: -0.5 }, duration: 5 }, { scale: 1 });
      advance(world, 40);
    }
    expect(pet.hp).toBe(800);
    expect(self.memory.launches).toBe(1);
  });
});
