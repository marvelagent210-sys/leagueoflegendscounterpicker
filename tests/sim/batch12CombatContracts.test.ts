import { describe, expect, it } from "vitest";
import { advanceMissiles, canStartAttack, canStartAttackOnPet, completeCast, launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { applyEffect, dealDamage, directionTo } from "../../engine/sim/combat";
import { advancePets, petEffects, spawnPet } from "../../engine/sim/pets";
import { petAttackActor, petCombatHit } from "../../engine/sim/petCombat";
import { threatsTo } from "../../engine/sim/behavior";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, KitHooks, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { ability, fighter, RANGED } from "./kits";
import { idle, lasting } from "./helpers";

const petSpec: PetSpec = { kind: "body", name: "Actual target", hp: 1000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 30 };
function arena(hooks: KitHooks, ranged = false) {
  const world = createWorld({ fighters: [fighter({ hooks, ...(ranged ? { attack: RANGED } : {}) }), fighter()], distance: 100, modes: ["idle", "idle"] });
  world.units[0].x = 0; world.units[1].x = 100;
  return world;
}

describe("batch12 coincident direction reflection", () => {
  it("preserves mirrored direction at real leap residue while retaining genuine crossings", () => {
    const world = arena({}), [left, right] = world.units;
    left.x = 339.3333333333335; right.x = left.x;
    expect(directionTo(left, right)).toBe(1);
    left.x = 90.66666666666666; right.x = 90.66666666666663;
    expect(directionTo(right, left)).toBe(-1);
    left.x = 0; right.x = -0.0001; expect(directionTo(left, right)).toBe(-1);
    right.x = 0.0001; expect(directionTo(right, left)).toBe(-1);
    left.x = 0.0002; expect(directionTo(right, left)).toBe(1);
  });

  it("moves reversed retreats in opposite directions after near-coincident landings", () => {
    const forward = arena({}), reverse = arena({});
    forward.units[0].x = forward.units[1].x = 339.3333333333335;
    reverse.units[0].x = 90.66666666666666; reverse.units[1].x = 90.66666666666663;
    step(forward, [() => ({ kind: "move", direction: -1 }), idle]);
    step(reverse, [idle, () => ({ kind: "move", direction: -1 })]);
    expect(forward.units[0].x).toBeLessThan(339.3333333333335);
    expect(reverse.units[1].x).toBeGreaterThan(90.66666666666663);
    expect(forward.units[0].x + reverse.units[1].x).toBeCloseTo(430, 10);
  });
});

describe("batch12 target-specific attack declarations", () => {
  it("vetoes a champion declaration before spending empowerment, timer, movement or facing", () => {
    let declarations = 0;
    const world = arena({ canAttackTarget(ctx) { expect(ctx.target).toBe(world.units[1]); expect(ctx.enemy).toBe(ctx.target); return false; }, onAttack() { declarations++; } });
    const self = world.units[0]; self.facing = -1; self.move = -1;
    applyEffect(world, self, self, { type: "empower", attacks: 1, window: 5, onHit: [{ type: "damage", damageType: "magic", amount: { base: 100 } }] }, { scale: 1 });
    const before = { timer: self.attackReadyTick, status: structuredClone(self.statuses) };
    expect(canStartAttack(world, self)).toBe(false); startAttack(world, self);
    expect(self.action).toBeUndefined(); expect(self.attackReadyTick).toBe(before.timer);
    expect(self.statuses).toEqual(before.status); expect(self.move).toBe(-1); expect(self.facing).toBe(-1); expect(declarations).toBe(0);
  });

  it("makes the decision for each actual pet instead of borrowing its owner's class", () => {
    const seen: Array<{ id?: number; actual: boolean }> = [];
    const world = arena({ canAttackTarget(ctx) {
      seen.push({ id: ctx.target.petId, actual: ctx.targetPet?.id === ctx.target.petId });
      return ctx.target.petId !== undefined && ctx.target.spec.targetClass !== "champion";
    } });
    const minion = spawnPet(world, world.units[1], { ...petSpec, targetClass: "minion" }, 100);
    const clone = spawnPet(world, world.units[1], { ...petSpec, targetClass: "champion", unitClass: "clone" }, 100);
    expect(canStartAttack(world, world.units[0])).toBe(false);
    expect(canStartAttackOnPet(world, world.units[0], minion)).toBe(true);
    expect(canStartAttackOnPet(world, world.units[0], clone)).toBe(false);
    startAttack(world, world.units[0], clone); expect(world.units[0].action).toBeUndefined();
    startAttack(world, world.units[0], minion); expect(world.units[0].action).toMatchObject({ kind: "windup", pet: minion.id });
    expect(seen.filter(row => row.id !== undefined).every(row => row.actual)).toBe(true);
  });

  it("does not retrospectively cancel a windup declared before the restriction", () => {
    const world = arena({ canAttackTarget(ctx) { return ctx.memory.restricted !== true; } }), self = world.units[0];
    startAttack(world, self); expect(self.action?.kind).toBe("windup");
    if (self.action?.kind !== "windup") throw new Error("Expected real declared windup");
    const action = self.action; self.memory.restricted = true; world.tick = action.launchTick;
    launchAttack(world, self, action);
    expect(world.units[1].hp).toBe(1950); expect(self.action).toBeUndefined();
  });

  it("keeps an already launched projectile after later target restrictions", () => {
    const world = arena({ canAttackTarget(ctx) { return ctx.memory.restricted !== true; } }, true), self = world.units[0];
    world.units[1].x = 300; startAttack(world, self);
    if (self.action?.kind !== "windup") throw new Error("Expected real declared windup");
    world.tick = self.action.launchTick; launchAttack(world, self); expect(world.missiles).toHaveLength(1);
    self.memory.restricted = true;
    for (let index = 0; index < 8; index++) { world.tick++; advanceMissiles(world); }
    expect(world.units[1].hp).toBe(1950); expect(world.missiles).toHaveLength(0);
  });

  it("keeps branch-local restrictions independent while preserving the default path", () => {
    const world = arena({ canAttackTarget(ctx) { return ctx.memory.restricted !== true; } });
    const branch = cloneWorld(world); branch.units[0].memory.restricted = true;
    expect(canStartAttack(branch, branch.units[0])).toBe(false);
    expect(canStartAttack(world, world.units[0])).toBe(true);
    const ordinary = arena({}); expect(canStartAttack(ordinary, ordinary.units[0])).toBe(true);
    startAttack(ordinary, ordinary.units[0]); expect(ordinary.units[0].action?.kind).toBe("windup");
  });
});

function castArena(spell: AbilitySpec, hooks?: KitHooks) {
  return createWorld({ fighters: [fighter({ abilities: [spell], base: { resource: 100 }, hooks }), fighter()], distance: 100, modes: ["idle", "idle"] });
}
function through(world: World, tick: number) { while (world.tick <= tick && !world.result) step(world, [idle, idle]); }

describe("batch12 declaration costs", () => {
  it("pays before declaration hooks and an early hit, retaining the payment after death", () => {
    const observations: number[] = [];
    const spell = ability({ key: "W", castTime: 1, cost: 30, costAtCastStart: true, deliveryAtCastStart: true,
      delivery: { kind: "line", range: 500, width: 100 },
      onHit: [{ type: "damage", damageType: "true", amount: { base: 40 } }] });
    const world = castArena(spell, { onCastStart(ctx) { observations.push(ctx.self.resource); }, onDamageDealt(ctx) { observations.push(ctx.self.resource); } });
    const self = world.units[0]; startCast(world, self, spell);
    expect(observations).toEqual([70, 70]); expect(world.units[1].hp).toBe(1960);
    expect(self.action).toMatchObject({ kind: "cast", cost: 0 });
    dealDamage(world, world.units[1], self, 3000, "true");
    step(world, [idle, idle]);
    expect(self.alive).toBe(false); expect(self.resource).toBe(70); expect(world.units[1].hp).toBe(1960);
  });

  it("captures one cost even if the remaining resource changes during the cast", () => {
    const spell = ability({ key: "W", castTime: .5, costFor: unit => unit.resource / 2, costAtCastStart: true, delivery: { kind: "self" } });
    const world = castArena(spell), self = world.units[0]; startCast(world, self, spell);
    expect(self.resource).toBe(50); self.resource += 20;
    through(world, 15); expect(self.resource).toBe(70); expect(self.action).toBeUndefined();
  });

  it.each([0, .5])("charges a health cast exactly once with a %s second cast", castTime => {
    const spell = ability({ key: "Q", castTime, cost: 150, costType: "health", costAtCastStart: true, delivery: { kind: "self" } });
    const world = castArena(spell); startCast(world, world.units[0], spell);
    expect(world.units[0].hp).toBe(1850); through(world, 16); expect(world.units[0].hp).toBe(1850);
    expect(world.units[0].resource).toBe(100);
  });

  it("keeps paid casts distinct across cloned branches and an overlay dash", () => {
    const spell = ability({ key: "R", overlay: true, castTime: .5, cost: 30, costAtCastStart: true, delivery: { kind: "self" } });
    const world = castArena(spell), self = world.units[0];
    self.action = { kind: "dash", ability: "fixture-dash", startTick: 0, endTick: 9, perTick: 0, stopAtContact: false, unstoppable: false };
    startCast(world, self, spell); expect(self.action).toMatchObject({ kind: "dash", resume: { kind: "cast", cost: 0, endTick: 15 } });
    const branch = cloneWorld(world); branch.units[0].resource += 10;
    through(world, 16); through(branch, 16);
    expect(self.resource).toBe(70); expect(branch.units[0].resource).toBe(80);
    expect(self.action).toBeUndefined(); expect(branch.units[0].action).toBeUndefined();
  });

  it("retains the completion-time default and charges a direct completion once", () => {
    const normal = ability({ key: "Q", castTime: .5, cost: 30, delivery: { kind: "self" } });
    const world = castArena(normal); startCast(world, world.units[0], normal);
    expect(world.units[0].resource).toBe(100); through(world, 15); expect(world.units[0].resource).toBe(70);
    const early = { ...normal, costAtCastStart: true }, direct = castArena(early);
    completeCast(direct, direct.units[0], early, 0); expect(direct.units[0].resource).toBe(70);
  });

  it("preserves declared facing when explicitly requested, retaining ordinary aimed turns", () => {
    const headings: number[] = [];
    const spell = ability({ key: "R", preserveFacing: true, delivery: { kind: "self" } });
    const world = castArena(spell, { onCastStart(ctx) { headings.push(ctx.self.facing ?? 0); } });
    world.units[0].facing = -1; startCast(world, world.units[0], spell);
    expect(headings).toEqual([-1]); expect(world.units[0].facing).toBe(-1);
    const ordinary = { ...spell, preserveFacing: undefined }, other = castArena(ordinary);
    other.units[0].facing = -1; startCast(other, other.units[0], ordinary); expect(other.units[0].facing).toBe(1);
  });

  it("lets real stage telegraphs replace only the opted-out generic cast announcement", () => {
    const spell = ability({ key: "W", castTime: 1, castThreat: false, delivery: { kind: "self" } });
    const world = castArena(spell); world.settings.reactionTime = 0; startCast(world, world.units[0], spell);
    expect(threatsTo(world, 1).filter(t => t.source === "W")).toEqual([]);
    const ordinary = { ...spell, castThreat: undefined }, other = castArena(ordinary); other.settings.reactionTime = 0;
    startCast(other, other.units[0], ordinary); expect(threatsTo(other, 1).filter(t => t.source === "W")).toHaveLength(1);
    world.missiles.push({ id: world.nextId++, owner: 0, source: "W", seenTick: 0, x: world.units[0].x, direction: 1, perTick: 0,
      homing: false, travelLeft: Infinity, projectile: false, connects: false, scale: 1, impactTick: 8,
      onHit: [{ type: "damage", damageType: "true", amount: { base: 40 } }] });
    expect(threatsTo(world, 1).filter(t => t.source === "W").map(t => ({ damage: t.damage, eta: t.eta }))).toEqual([{ damage: 40, eta: 8 }]);
  });

  it("can suppress a forecast independently of the real projectile's hit entitlement", () => {
    const spell = ability({ key: "Q", delivery: { kind: "line", range: 500, width: 100, speed: 300 },
      flags: { projectile: true }, onHit: [{ type: "damage", damageType: "true", amount: { base: 40 } }] });
    let creations = 0;
    const world = castArena(spell, { onMissileCreated(ctx) {
      creations++; expect(ctx.ability).toBe(spell); expect(ctx.missile.onHit).toEqual(spell.onHit);
      expect(ctx.missile.x).toBe(ctx.self.x); expect(ctx.world.missiles).toHaveLength(0);
      ctx.missile.perceptionHidden = true;
    } });
    world.settings.reactionTime = 10; startCast(world, world.units[0], spell);
    world.settings.reactionTime = 0; const visible = cloneWorld(world), shot = world.missiles[0]!;
    expect(shot.perceptionHidden).toBe(true); visible.missiles[0]!.perceptionHidden = false;
    expect(threatsTo(world, 1).filter(t => t.source === "Q")).toEqual([]);
    expect(threatsTo(visible, 1).filter(t => t.source === "Q")).toHaveLength(1);
    for (let tick = 1; tick <= 32; tick++) { world.tick = visible.tick = tick; advanceMissiles(world); advanceMissiles(visible); }
    expect(world.units[1].hp).toBe(1960); expect(visible.units[1].hp).toBe(1960);
    expect(world.missiles).toHaveLength(0); expect(visible.missiles).toHaveLength(0);
    expect(creations).toBe(1);
  });
});

describe("batch12 opted-in control cleanup", () => {
  it("removes a tagged control tail after its stun ends while retaining ordinary states", () => {
    const world = arena({}), [source, target] = world.units;
    applyEffect(world, source, target, { type: "state", state: "lingering", duration: 3, cleanseWithCC: true }, { scale: 1 });
    applyEffect(world, target, target, { type: "state", state: "ghosted", duration: 3 }, { scale: 1 });
    applyEffect(world, source, target, { type: "cc", cc: "stun", duration: .1 }, { scale: 1 });
    through(world, 4); expect(target.statuses.some(s => s.key === "stun")).toBe(false);
    applyEffect(world, target, target, { type: "cleanse" }, { scale: 1 });
    expect(target.statuses.map(s => s.key)).toEqual(["ghosted"]);
  });

  it("preserves a tagged state on typed cleanses and unrelated motion on marker-only cleanses", () => {
    const world = arena({}), target = world.units[1];
    applyEffect(world, target, target, { type: "state", state: "lingering", duration: 3, cleanseWithCC: true }, { scale: 1 });
    applyEffect(world, target, target, { type: "cleanse", types: ["stun"] }, { scale: 1 });
    expect(target.statuses).toHaveLength(1);
    target.forced = { endTick: 20, perTick: 10, absolute: true };
    applyEffect(world, target, target, { type: "cleanse" }, { scale: 1 });
    expect(target.statuses).toHaveLength(0); expect(target.forced).toMatchObject({ endTick: 20, perTick: 10 });
  });

  it("cleanses an actual pet's airborne motion without moving its owner", () => {
    const world = arena({}), [source, owner] = world.units, ownerX = owner.x;
    const pet = spawnPet(world, owner, petSpec, 100);
    petEffects(world, source, pet, [{ type: "displace", direction: "away", originX: 0, distance: 300, duration: 1 }]);
    expect(pet.forced).toBeDefined(); petEffects(world, owner, pet, [{ type: "cleanse" }]);
    expect(pet.statuses).toEqual([]); expect(pet.forced).toBeUndefined(); world.tick++; advancePets(world);
    expect(pet.x).toBe(100); expect(owner.x).toBe(ownerX); expect(owner.forced).toBeUndefined();
  });

  it("preserves an actual pet's unrelated motion when only a tagged state is removed", () => {
    const world = arena({}), owner = world.units[0], pet = spawnPet(world, owner, petSpec, 0);
    pet.forced = { endTick: 20, perTick: 10, absolute: true };
    petEffects(world, owner, pet, [{ type: "state", state: "lingering", duration: 3, cleanseWithCC: true }]);
    petEffects(world, owner, pet, [{ type: "cleanse", types: ["stun"] }]); expect(pet.statuses).toHaveLength(1);
    petEffects(world, owner, pet, [{ type: "cleanse" }]); expect(pet.statuses).toEqual([]);
    world.tick++; advancePets(world); expect(pet.x).toBe(10);
  });
});

const attackingPet: PetSpec = { ...petSpec, attack: { range: 300, interval: 1, windup: 0, attackLike: true, effects: [{ type: "damage", damageType: "true", amount: { base: 10 } }] } };
describe("batch12 actual pet attack rates", () => {
  it("uses the actual pet's bonus speed for its next declaration, without borrowing owner speed", () => {
    const world = arena({}), owner = world.units[0], pet = spawnPet(world, owner, attackingPet, 0);
    owner.statuses.push(lasting("stat", "attackSpeed", 4));
    petEffects(world, owner, pet, [{ type: "stat", stat: "attackSpeed", amount: { base: 1 }, duration: 10 }]);
    advancePets(world); expect(pet.nextAttackTick).toBe(15); expect(world.units[1].hp).toBe(1990);
    world.tick = 14; advancePets(world); expect(world.units[1].hp).toBe(1990);
    world.tick = 15; advancePets(world); expect(world.units[1].hp).toBe(1980);
  });

  it("combines an explicit bonus ratio, total multiplier and actual cripple", () => {
    const world = arena({}), owner = world.units[0], pet = spawnPet(world, owner, { ...attackingPet, attack: { ...attackingPet.attack!, attackSpeedRatio: .5 } }, 0);
    petEffects(world, owner, pet, [
      { type: "stat", stat: "attackSpeed", amount: { base: 2 }, duration: 10 },
      { type: "stat", stat: "attackSpeedMultiplier", amount: { base: 1 }, duration: 10 },
      { type: "cc", cc: "cripple", strength: .5, duration: 10 },
    ]);
    advancePets(world); expect(pet.nextAttackTick).toBe(15);
  });

  it("applies an explicit cap and respects a pet's immunity to its own attack speed slows", () => {
    const world = arena({}), owner = world.units[0], pet = spawnPet(world, owner, { ...attackingPet, ignoreOwnAttackSpeedSlows: true, attack: { ...attackingPet.attack!, attackSpeedCap: 2 } }, 0);
    petEffects(world, owner, pet, [{ type: "stat", stat: "attackSpeed", amount: { base: 9 }, duration: 10 }, { type: "cc", cc: "cripple", strength: .9, duration: 10 }]);
    advancePets(world); expect(pet.nextAttackTick).toBe(15);
  });

  it("does not reschedule a declared timer when a later buff arrives", () => {
    const world = arena({}), owner = world.units[0], pet = spawnPet(world, owner, attackingPet, 0);
    advancePets(world); expect(pet.nextAttackTick).toBe(30);
    world.tick = 10; petEffects(world, owner, pet, [{ type: "stat", stat: "attackSpeed", amount: { base: 1 }, duration: 10 }]);
    world.tick = 29; advancePets(world); expect(world.units[1].hp).toBe(1990); expect(pet.nextAttackTick).toBe(30);
    world.tick = 30; advancePets(world); expect(world.units[1].hp).toBe(1980); expect(pet.nextAttackTick).toBe(45);
  });

  it("preserves an unmodified pet's exact declared interval", () => {
    const world = arena({}), pet = spawnPet(world, world.units[0], { ...attackingPet, attack: { ...attackingPet.attack!, interval: 1 / 3 } }, 0);
    advancePets(world); expect(pet.nextAttackTick).toBe(10);
    world.tick = 9; advancePets(world); expect(world.units[1].hp).toBe(1990);
    world.tick = 10; advancePets(world); expect(world.units[1].hp).toBe(1980); expect(pet.nextAttackTick).toBe(20);
  });
});

describe("batch12 whole pet basic contacts", () => {
  it("reports one contact for multiple damage packets with actual pet and victim identities", () => {
    const seen: Array<{ id: number; victim: number; targetPet?: number; blocked: boolean }> = [];
    const world = arena({ onOwnedPetBasicHit(ctx) {
      expect(ctx.self).toBe(world.units[0]); expect(ctx.enemy).toBe(ctx.target);
      seen.push({ id: ctx.pet.id, victim: ctx.target.side, targetPet: ctx.targetPet?.id, blocked: ctx.blocked });
    } });
    const pet = spawnPet(world, world.units[0], attackingPet, 0);
    const packets = [{ type: "damage", damageType: "true", amount: { base: 10 } }, { type: "damage", damageType: "magic", amount: { base: 20 } }] as const;
    expect(petCombatHit(world, pet, world.units[1], packets, true)).toBe(true);
    expect(world.units[1].hp).toBe(1980); expect(seen).toEqual([{ id: pet.id, victim: 1, targetPet: undefined, blocked: false }]);
    const victim = spawnPet(world, world.units[1], petSpec, 100);
    petCombatHit(world, pet, victim, packets, true);
    expect(seen).toHaveLength(2); expect(seen[1]).toMatchObject({ id: pet.id, targetPet: victim.id });
  });

  it.each(["blind", "dodge", "parry"] as const)("does not report %s avoidance as a connected pet basic", defense => {
    let hits = 0;
    const world = arena({ onOwnedPetBasicHit() { hits++; } }), pet = spawnPet(world, world.units[0], attackingPet, 0);
    if (defense !== "blind") world.units[1].statuses.push(lasting("state", defense === "dodge" ? "dodgeAttacks" : "parry"));
    petCombatHit(world, pet, world.units[1], attackingPet.attack!.effects, true, defense === "blind");
    expect(hits).toBe(0); expect(world.units[1].hp).toBe(2000);
  });

  it("reports damage-only blocks once and leaves their source decision to the owner", () => {
    const blocks: boolean[] = [];
    const world = arena({ onOwnedPetBasicHit(ctx) { blocks.push(ctx.blocked); } });
    world.units[1].statuses.push(lasting("state", "blockAttacks"));
    const pet = spawnPet(world, world.units[0], attackingPet, 0);
    petCombatHit(world, pet, world.units[1], attackingPet.attack!.effects, true);
    expect(blocks).toEqual([true]); expect(world.units[1].hp).toBe(2000);
  });

  it("retains an actual parry result when the defender removes its state during the callback", () => {
    let hits = 0, parries = 0;
    const world = createWorld({ fighters: [fighter({ hooks: { onOwnedPetBasicHit() { hits++; } } }), fighter({ hooks: {
      onParry(ctx) { parries++; ctx.self.statuses = ctx.self.statuses.filter(s => s.key !== "parry"); },
    } })], distance: 100, modes: ["idle", "idle"] });
    world.units[1].statuses.push(lasting("state", "parry"));
    const pet = spawnPet(world, world.units[0], attackingPet, world.units[0].x);
    expect(petCombatHit(world, pet, world.units[1], attackingPet.attack!.effects, true)).toBe(false);
    expect(parries).toBe(1); expect(hits).toBe(0);
  });

  it("excludes spell-like pet packets and dead owners while preserving launched pet identity", () => {
    let hits = 0;
    const world = arena({ onOwnedPetBasicHit() { hits++; } }), pet = spawnPet(world, world.units[0], attackingPet, 0);
    petCombatHit(world, pet, world.units[1], attackingPet.attack!.effects, false); expect(hits).toBe(0);
    // A projectile's saved pet can still land after that body was removed.
    world.pets = []; petCombatHit(world, pet, world.units[1], attackingPet.attack!.effects, true); expect(hits).toBe(1);
    world.units[0].hp = 0; petCombatHit(world, pet, world.units[1], attackingPet.attack!.effects, true); expect(hits).toBe(1);
  });

  it("uses explicit ranged classification even for a ranged attack without a missile", () => {
    const world = arena({}), owner = world.units[0];
    const ranged = spawnPet(world, owner, { ...attackingPet, attack: { ...attackingPet.attack!, ranged: true } }, 0);
    const melee = spawnPet(world, owner, { ...attackingPet, attack: { ...attackingPet.attack!, ranged: false } }, 0);
    expect(petAttackActor(ranged, owner).spec.attack.ranged).toBe(true);
    expect(petAttackActor(melee, owner).spec.attack.ranged).toBe(false);
  });
});
