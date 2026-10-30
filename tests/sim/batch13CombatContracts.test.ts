import { describe, expect, it } from "vitest";
import { advanceMissiles, advanceZones, canCast, completeCast, startCast } from "../../engine/sim/actions";
import { applyEffect, canSee, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { advancePets, damagePet, petEffects, spawnPet } from "../../engine/sim/pets";
import { petAttackActor } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { threatsTo } from "../../engine/sim/behavior";
import { createWorld, fork, step } from "../../engine/sim/simulate";
import { cloneWorld, type Missile, type Pet, type Status, type Unit, type World } from "../../engine/sim/state";
import type { AbilitySpec, DamageReport, KitHooks, PetSpec } from "../../engine/sim/spec";
import { ability, fighter } from "./kits";
import { idle } from "./helpers";

const shieldSpell = ability({ key: "E", delivery: { kind: "self" } });
const clone: PetSpec = { kind: "actual-clone", name: "Actual clone", targetClass: "champion", unitClass: "clone", hp: 1000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 30,
  attack: { range: 500, interval: 1, windup: .5, attackLike: true, effects: [{ type: "damage", damageType: "physical", amount: { base: 100 } }] } };
function arena(hooks?: KitHooks, spells: AbilitySpec[] = []) {
  const world = createWorld({ fighters: [fighter({ hooks, abilities: spells, base: { resource: 100 } }), fighter({ base: { armor: 0, mr: 0 } })], distance: 100, modes: ["idle", "idle"], settings: { log: true } });
  world.units[0].x = 0; world.units[1].x = 200;
  return world;
}
function status(source: 0 | 1, key: string, amount = 100, endTick = 90): Status { return { kind: "shield", key, source, startTick: 0, endTick, value: amount }; }
function linkedBuff(world: World, target = world.units[0]) {
  applyEffect(world, world.units[0], target, { type: "stat", stat: "AD", amount: { base: 40 }, duration: 3, requiresShield: true }, { ability: shieldSpell, scale: 1 });
}

describe("batch13 shield and crowd-control dependent stats", () => {
  it("opts into actual allied invisibility without changing hostile stealth, nearsight or other abilities' visibility policy", () => {
    const world = arena(), [self, enemy] = world.units, pet = spawnPet(world, self, clone, 400);
    petEffects(world, self, pet, [{ type: "state", state: "invisible", duration: 3 }], "singleTarget", "hidden");
    const ally = petFormulaTarget(pet, self, 0);
    expect(canSee(ally, self)).toBe(false);
    expect(canSee(ally, self, self, { alliedInvisibility: true })).toBe(true);
    expect(canSee(ally, enemy, enemy, { alliedInvisibility: true })).toBe(false);
    applyEffect(world, enemy, self, { type: "cc", cc: "nearsight", strength: 100, duration: 3 }, { scale: 1 });
    expect(canSee(ally, self, self, { alliedInvisibility: true })).toBe(false);
  });
  it("requires a positive shield from the exact source and ability", () => {
    const world = arena(), self = world.units[0]; linkedBuff(world);
    self.statuses.push(status(1, "E"), status(0, "Q"));
    expect(derive(self).ad).toBe(100);
    self.statuses.push(status(0, "E", 1)); expect(derive(self).ad).toBe(140);
    self.statuses.at(-1)!.value = 0; expect(derive(self).ad).toBe(100);
  });
  it("loses its bonus synchronously when a shield breaks, including with a dead caster", () => {
    const world = arena(), [caster, target] = world.units;
    target.statuses.push(status(0, "E")); linkedBuff(world, target);
    expect(derive(target).ad).toBe(140);
    caster.alive = false; caster.hp = 0;
    dealDamage(world, caster, target, 100, "true");
    expect(derive(target).ad).toBe(100); expect(target.hp).toBe(2000);
  });
  it("does not transfer a same-named shield between sources, even through cache reuse", () => {
    const world = arena(), self = world.units[0]; linkedBuff(world); self.statuses.push(status(0, "E"));
    expect(derive(self).ad).toBe(140); self.statuses.at(-1)!.source = 1;
    expect(derive(self).ad).toBe(100); self.statuses.at(-1)!.source = 0;
    self.statuses[0]!.requiresShield = false; self.statuses.pop(); expect(derive(self).ad).toBe(140);
  });
  it("keeps branch-local shield dependencies and normal independent buffs", () => {
    const world = arena(), self = world.units[0]; linkedBuff(world); self.statuses.push(status(0, "E"));
    applyEffect(world, self, self, { type: "stat", stat: "AD", amount: { base: 10 }, duration: 3 }, { scale: 1 });
    const copy = cloneWorld(world); copy.units[0].statuses = copy.units[0].statuses.filter(s => s.kind !== "shield");
    expect(derive(copy.units[0]).ad).toBe(110); expect(derive(self).ad).toBe(150);
  });
  it("ties a flat movement penalty to accepted polymorph without using slow resistance", () => {
    const world = arena(), [self, enemy] = world.units;
    applyEffect(world, self, enemy, { type: "cc", cc: "polymorph", duration: 2 }, { ability: shieldSpell, scale: 1 });
    applyEffect(world, self, enemy, { type: "stat", stat: "totalMoveSpeedReduction", amount: { base: 60 }, duration: 2, whileCC: "polymorph" }, { ability: shieldSpell, scale: 1 });
    applyEffect(world, enemy, enemy, { type: "stat", stat: "slowResist", amount: { base: 1 }, duration: 5 }, { scale: 1 });
    expect(derive(enemy).moveSpeed).toBe(290);
    applyEffect(world, enemy, enemy, { type: "cleanse", types: ["blind"] }, { scale: 1 });
    expect(derive(enemy).moveSpeed).toBe(290);
    applyEffect(world, enemy, enemy, { type: "cleanse", types: ["polymorph"] }, { scale: 1 });
    expect(derive(enemy).moveSpeed).toBe(350);
  });
  it("removes exactly60 total speed after positive bonuses and before ordinary slows", () => {
    const world = arena(), [self, enemy] = world.units;
    applyEffect(world, enemy, enemy, { type: "stat", stat: "moveSpeedPercent", amount: { base: .25 }, duration: 5 }, { scale: 1 });
    applyEffect(world, self, enemy, { type: "cc", cc: "polymorph", duration: 2 }, { ability: shieldSpell, scale: 1 });
    applyEffect(world, self, enemy, { type: "stat", stat: "totalMoveSpeedReduction", amount: { base: 60 }, duration: 2, whileCC: "polymorph" }, { ability: shieldSpell, scale: 1 });
    expect(derive(enemy).rawMoveSpeed).toBe(377.5); expect(derive(enemy).moveSpeed).toBe(377.5);
    applyEffect(world, enemy, enemy, { type: "state", state: "slowImmune", duration: 3 }, { scale: 1 });
    expect(derive(enemy).moveSpeed).toBe(377.5);
    applyEffect(world, enemy, enemy, { type: "cleanse", types: ["polymorph"] }, { scale: 1 });
    expect(derive(enemy).rawMoveSpeed).toBe(437.5); expect(derive(enemy).moveSpeed).toBe(433);
  });
  it("does not activate a CC-linked stat when immunity denies its exact CC", () => {
    const world = arena(), [self, enemy] = world.units;
    applyEffect(world, enemy, enemy, { type: "state", state: "ccImmune", duration: 3 }, { scale: 1 });
    applyEffect(world, self, enemy, { type: "cc", cc: "polymorph", duration: 2 }, { ability: shieldSpell, scale: 1 });
    applyEffect(world, self, enemy, { type: "stat", stat: "totalMoveSpeedReduction", amount: { base: 60 }, duration: 2, whileCC: "polymorph" }, { ability: shieldSpell, scale: 1 });
    expect(derive(enemy).moveSpeed).toBe(350);
  });
  it("honors exact CC ability identity and shortened tenacity duration", () => {
    const world = arena(), [self, enemy] = world.units;
    enemy.statuses.push({ kind: "state", key: "tenacity", source: 1, startTick: 0, endTick: 90, value: .5 });
    applyEffect(world, self, enemy, { type: "cc", cc: "polymorph", duration: 2 }, { ability: shieldSpell, scale: 1 });
    applyEffect(world, self, enemy, { type: "stat", stat: "totalMoveSpeedReduction", amount: { base: 60 }, duration: 2, whileCC: "polymorph" }, { ability: shieldSpell, scale: 1 });
    expect(derive(enemy).moveSpeed).toBe(290);
    const cc = enemy.statuses.find(s => s.kind === "cc")!; cc.ability = "other";
    expect(derive(enemy).moveSpeed).toBe(350); cc.ability = "E";
    world.tick = 30; step(world, [idle, idle]); expect(derive(enemy).moveSpeed).toBe(350);
  });
  it("applies linked stats to actual pet attack actors without borrowing owner bonuses", () => {
    const world = arena(), pet = spawnPet(world, world.units[0], clone, 100);
    petEffects(world, world.units[0], pet, [{ type: "shield", amount: { base: 100 }, duration: 3 }, { type: "stat", stat: "AD", amount: { base: 40 }, duration: 3, requiresShield: true }], "singleTarget", "E");
    expect(derive(petAttackActor(pet, world.units[0], 0)).ad).toBe(40);
    damagePet(world, world.units[1], pet, 100, "true", false);
    expect(derive(petAttackActor(pet, world.units[0], 0)).ad).toBe(0);
  });
});

describe("batch13 exact shield absorption attribution", () => {
  function observe() {
    const reports: Array<DamageReport & { target: Unit; targetPet?: Pet }> = [];
    const world = arena({ onDamageObserved(ctx) { reports.push(ctx); } });
    return { world, reports };
  }
  it("reports only the shields that actually absorbed each typed packet", () => {
    const { world, reports } = observe(), target = world.units[1];
    target.statuses.push({ ...status(0, "W", 40, 30), shieldType: "physical" }, status(1, "E", 60, 60));
    dealDamage(world, world.units[0], target, 25, "magic");
    expect(reports[0]!.absorbedShields?.map(entry => [entry.shield.source, entry.shield.key, entry.shield.value, entry.amount])).toEqual([[1, "E", 60, 25]]);
    dealDamage(world, world.units[0], target, 100, "physical");
    expect(reports[1]!.absorbedShields?.map(entry => [entry.shield.key, entry.amount])).toEqual([["W", 40], ["E", 35]]);
    expect(reports[1]!.absorbed).toBe(75); expect(reports[1]!.amount).toBe(25);
  });
  it("retains an immutable pre-hit identity after consumption and later mutations", () => {
    const { world, reports } = observe(), target = world.units[1], shield = status(0, "W", 100);
    target.statuses.push(shield); dealDamage(world, world.units[0], target, 30, "true");
    const entry = reports[0]!.absorbedShields![0]!;
    expect(entry.shield.value).toBe(100); expect(entry.amount).toBe(30);
    expect(Object.isFrozen(entry)).toBe(true); expect(Object.isFrozen(entry.shield)).toBe(true);
    expect(Object.isFrozen(reports[0]!.absorbedShields)).toBe(true);
    shield.key = "changed"; shield.value = 0;
    expect(entry.shield.key).toBe("W"); expect(entry.shield.value).toBe(100);
  });
  it("preserves first-packet shield bypass and does not attribute health damage", () => {
    const { world, reports } = observe();
    world.units[1].statuses.push({ ...status(0, "W"), firstDamageBypass: 20 });
    dealDamage(world, world.units[0], world.units[1], 60, "true");
    expect(reports[0]!.amount).toBe(20); expect(reports[0]!.absorbed).toBe(40);
    expect(reports[0]!.absorbedShields?.[0]!.amount).toBe(40);
  });
  it("provides actual pet recipient identity and leaves unshielded packets unchanged", () => {
    const { world, reports } = observe(), pet = spawnPet(world, world.units[0], clone, 100);
    pet.statuses = [status(0, "W", 30)]; damagePet(world, world.units[1], pet, 50, "true", false);
    expect(reports[0]!.targetPet).toBe(pet); expect(reports[0]!.target.petId).toBe(pet.id);
    expect(reports[0]!.absorbed).toBe(30); expect(reports[0]!.amount).toBe(20);
    expect(reports[0]!.absorbedShields?.[0]!.shield.key).toBe("W");
    damagePet(world, world.units[1], pet, 5, "true", false);
    expect(reports[1]!.absorbedShields).toBeUndefined(); expect(reports[1]!.absorbed).toBe(0);
  });
});

describe("batch13 paid and free target completion cancellation", () => {
  function setup(policy?: "range" | "all", predicate?: AbilitySpec["validTargetAtCompletion"], early = false) {
    const seen: Array<{ paid: boolean; reason: string; resource: number }> = [];
    let completed = 0;
    const spell = ability({ key: "W", castTime: .25, cooldown: 10, cost: 30, cancelOnInvalidTarget: true,
      delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }],
      invalidTargetCost: policy, validTargetAtCompletion: predicate, costAtCastStart: early });
    const world = arena({ onCast() { completed++; }, onCastCancelled(ctx) { seen.push({ paid: ctx.paid, reason: ctx.reason, resource: ctx.self.resource }); } }, [spell]);
    startCast(world, world.units[0], spell); world.tick = 8;
    return { world, spell, seen, completed: () => completed };
  }
  it.each([undefined, "range", "all"] as const)("retains a successful cast with policy %s", policy => {
    const { world, spell, seen, completed } = setup(policy); completeCast(world, world.units[0], spell, 0);
    expect(world.units[0].resource).toBe(70); expect(world.units[1].hp).toBe(1900);
    expect(world.units[0].cooldownReady.W).toBe(308); expect(seen).toEqual([]); expect(completed()).toBe(1);
  });
  it.each([undefined, "range", "all"] as const)("handles range-only loss with policy %s", policy => {
    const { world, spell, seen, completed } = setup(policy); world.units[1].x = 1000;
    completeCast(world, world.units[0], spell, 0);
    const paid = policy !== undefined;
    expect(world.units[0].resource).toBe(paid ? 70 : 100);
    expect(world.units[0].cooldownReady.W).toBe(paid ? 308 : undefined);
    expect(world.units[1].hp).toBe(2000); expect(completed()).toBe(0);
    expect(seen).toEqual([{ paid, reason: "range", resource: paid ? 70 : 100 }]);
  });
  it.each(["untargetable", "invisible", "dead"] as const)("keeps %s free under range-only policy even outside range", condition => {
    const { world, spell, seen } = setup("range"), target = world.units[1]; target.x = 1000;
    if (condition === "dead") { target.alive = false; target.hp = 0; }
    else applyEffect(world, target, target, { type: "state", state: condition, duration: 3 }, { scale: 1 });
    if (world.units[0].action) completeCast(world, world.units[0], spell, 0);
    expect(world.units[0].resource).toBe(100); expect(world.units[0].cooldownReady.W).toBeUndefined();
    expect(seen).toEqual([{ paid: false, reason: "target", resource: 100 }]);
  });
  it("charges all-invalid opt-ins without delivering or completing their effects", () => {
    const { world, spell, seen, completed } = setup("all"); world.units[1].alive = false;
    completeCast(world, world.units[0], spell, 0);
    expect(world.units[0].resource).toBe(70); expect(world.units[0].cooldownReady.W).toBe(308);
    expect(seen[0]).toEqual({ paid: true, reason: "target", resource: 70 }); expect(completed()).toBe(0);
  });
  it("validates actual captured ally predicates independently of delivery kind", () => {
    const spell = ability({ key: "E", castTime: .25, cost: 30, delivery: { kind: "self" }, validTargetAtCompletion: (_world, unit) => unit.memory.valid === true });
    const world = arena(undefined, [spell]); startCast(world, world.units[0], spell); world.tick = 8;
    completeCast(world, world.units[0], spell, 0); expect(world.units[0].resource).toBe(100);
    expect(world.units[0].cooldownReady.E).toBeUndefined(); world.units[0].memory.valid = true;
    startCast(world, world.units[0], spell); world.tick = 16; completeCast(world, world.units[0], spell, 8);
    expect(world.units[0].resource).toBe(70);
  });
  it("preserves captured-pet range-only classification and declared cost", () => {
    const { world, spell, seen } = setup("range", () => "range");
    spell.cost = 90; completeCast(world, world.units[0], spell, 0);
    expect(world.units[0].resource).toBe(70); expect(seen[0]!.reason).toBe("range");
  });
  it("does not double-pay a declaration-paid cast when invalidation is paid", () => {
    const { world, spell } = setup("all", undefined, true); world.units[1].alive = false;
    completeCast(world, world.units[0], spell, 0); expect(world.units[0].resource).toBe(70);
  });
  it.each(["invisible", "untargetable", "stasis"] as const)("settles paid %s invalidation immediately once and never delivers after recovery", state => {
    const { world, spell, seen, completed } = setup("all"), [self, target] = world.units;
    world.tick = 3; applyEffect(world, target, target, { type: "state", state, duration: .1 }, { scale: 1 });
    expect(self.action).toBeUndefined(); expect(self.resource).toBe(70); expect(self.cooldownReady.W).toBe(303);
    expect(seen).toEqual([{ paid: true, reason: "target", resource: 70 }]);
    world.tick = 8; step(world, [idle, idle]);
    expect(self.resource).toBe(70); expect(target.hp).toBe(2000); expect(completed()).toBe(0);
    expect(canCast(world, self, spell)).toBe(false);
  });
  it("settles a canceled cast only once when both due actions were collected before either resolved", () => {
    const vanish = ability({ key: "E", castTime: .25, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "invisible", duration: 1 }] });
    const spell = ability({ key: "W", castTime: .25, cost: 30, cancelOnInvalidTarget: true, invalidTargetCost: "all", delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    let canceled = 0, delivered = 0;
    const world = createWorld({ fighters: [fighter({ abilities: [vanish] }), fighter({ abilities: [spell], base: { resource: 100 }, hooks: { onCastCancelled() { canceled++; }, onCast() { delivered++; } } })], distance: 100, modes: ["idle", "idle"], settings: { firstMover: 0 } });
    startCast(world, world.units[0], vanish); startCast(world, world.units[1], spell); const captured = world.units[1].action;
    world.tick = 8; step(world, [idle, idle]);
    expect(world.units[1].resource).toBe(70); expect(canceled).toBe(1); expect(delivered).toBe(0);
    expect(captured).toMatchObject({ cancelled: true }); expect(world.units[0].hp).toBe(2000);
  });
});

describe("batch13 actual pet basic declarations", () => {
  it.each(["polymorph", "suspension"] as const)("cancels the real pending pet windup on accepted%s", cc => {
    const world = arena(), pet = spawnPet(world, world.units[0], clone, 100); advancePets(world);
    expect(pet.windup?.launchTick).toBe(15); world.tick = 1;
    petEffects(world, world.units[1], pet, [{ type: "cc", cc, duration: 2 }], "singleTarget", "control");
    expect(pet.windup).toBeUndefined(); world.tick = 15; advancePets(world); expect(world.units[1].hp).toBe(2000);
  });
  it("retains a real windup when explicit pet crowd-control immunity denies polymorph", () => {
    const world = arena(), pet = spawnPet(world, world.units[0], { ...clone, ccImmune: ["polymorph"] }, 100); advancePets(world); world.tick = 1;
    petEffects(world, world.units[1], pet, [{ type: "cc", cc: "polymorph", duration: 2 }], "singleTarget", "control");
    expect(pet.windup?.launchTick).toBe(15); world.tick = 15; advancePets(world); expect(world.units[1].hp).toBe(1900);
  });
  it("emits once at windup start even if blind later prevents contact", () => {
    const declared: number[] = [], hits: number[] = [];
    const world = arena({ onOwnedPetAttack(ctx) { declared.push(ctx.pet.id); expect(ctx.target).toBe(world.units[1]); }, onOwnedPetBasicHit(ctx) { hits.push(ctx.pet.id); } });
    const pet = spawnPet(world, world.units[0], clone, 100);
    pet.statuses = [{ kind: "cc", key: "blind", source: 1, startTick: 0, endTick: 90, value: 0 }];
    advancePets(world); expect(declared).toEqual([pet.id]); expect(pet.windup?.launchTick).toBe(15);
    world.tick = 15; advancePets(world); expect(hits).toEqual([]); expect(declared).toEqual([pet.id]);
  });
  it.each(["cosmetic", "ability"] as const)("excludes %s attack declarations", type => {
    let count = 0; const world = arena({ onOwnedPetAttack() { count++; } });
    spawnPet(world, world.units[0], { ...clone, attack: { ...clone.attack!, ...(type === "cosmetic" ? { cosmetic: true } : { attackLike: false }) } }, 100);
    advancePets(world); expect(count).toBe(0);
  });
  it("supplies the real pet victim and leaves that victim's owner distinct", () => {
    const observations: Array<{ target: number | undefined; actual?: number }> = [];
    const world = arena({ onOwnedPetAttack(ctx) { observations.push({ target: ctx.target.petId, actual: ctx.targetPet?.id }); } });
    const victim = spawnPet(world, world.units[1], { ...clone, attack: undefined }, 200);
    spawnPet(world, world.units[0], { ...clone, target: () => victim }, 100); advancePets(world);
    expect(observations).toEqual([{ target: victim.id, actual: victim.id }]);
  });
  it("respects disarm and does not emit declarations for a dead owner", () => {
    let count = 0; const world = arena({ onOwnedPetAttack() { count++; } });
    const pet = spawnPet(world, world.units[0], { ...clone, persistsAfterOwnerDeath: true }, 100);
    pet.statuses = [{ kind: "cc", key: "disarm", source: 1, startTick: 0, endTick: 90, value: 0 }]; advancePets(world); expect(count).toBe(0);
    pet.statuses = []; world.units[0].alive = false; world.units[0].hp = 0; advancePets(world); expect(count).toBe(0);
  });
  it("retains only explicitly opted-in pet events and released upkeep after the caster dies", () => {
    let declarations = 0, contacts = 0, liveTicks = 0, deadTicks = 0;
    const world = arena({ ownedPetEventsAfterDeath: true, onOwnedPetAttack() { declarations++; }, onOwnedPetBasicHit() { contacts++; }, onTick() { liveTicks++; }, onTickWhileDead() { deadTicks++; } });
    spawnPet(world, world.units[0], { ...clone, persistsAfterOwnerDeath: true, attack: { ...clone.attack!, windup: 0 } }, 100);
    world.units[0].alive = false; world.units[0].hp = 0;
    advancePets(world); expect(declarations).toBe(1); expect(contacts).toBe(1);
    step(world, [idle, idle]); expect(deadTicks).toBe(1); expect(liveTicks).toBe(0);
    expect(world.units[0].hp).toBe(0); expect(world.units[0].action).toBeUndefined();
  });
});

describe("batch13 temporary health on actual pets", () => {
  it("grants actual current and maximum health without treating the gain as healing", () => {
    const world = arena(), pet = spawnPet(world, world.units[0], clone, 100); pet.hp = 800;
    pet.statuses = [{ kind: "grievousWounds", key: "grievousWounds", source: 1, startTick: 0, endTick: 90, value: .4 }];
    petEffects(world, world.units[0], pet, [{ type: "stat", stat: "health", amount: { base: 300 }, duration: 1 }], "singleTarget", "R");
    expect(pet.hp).toBe(1100); expect(derive(petFormulaTarget(pet, world.units[0], 0)).maxHp).toBe(1300);
  });
  it("caps expired health before a scheduled packet while retaining other live health bonuses", () => {
    const world = arena(undefined, [ability({ key: "R", delivery: { kind: "self" } }), ability({ key: "other", delivery: { kind: "self" } })]), pet = spawnPet(world, world.units[0], { ...clone, attack: undefined }, 100);
    petEffects(world, world.units[0], pet, [{ type: "stat", stat: "health", amount: { base: 300 }, duration: 1 }], "singleTarget", "R");
    petEffects(world, world.units[0], pet, [{ type: "stat", stat: "health", amount: { base: 100 }, duration: 2 }], "singleTarget", "other");
    expect(pet.hp).toBe(1400); world.tick = 30;
    world.scheduled.push({ tick: 30, owner: 1, target: 0, targetPet: pet.id, effects: [{ type: "damage", damageType: "true", amount: { base: 50 } }], scale: 1 });
    step(world, [idle, idle]); expect(pet.hp).toBe(1050);
  });
  it("does not remove health already below the reduced maximum", () => {
    const world = arena(), pet = spawnPet(world, world.units[0], { ...clone, attack: undefined }, 100);
    petEffects(world, world.units[0], pet, [{ type: "stat", stat: "health", amount: { base: 300 }, duration: 1 }], "singleTarget", "R");
    pet.hp = 700; world.tick = 30; advancePets(world); expect(pet.hp).toBe(700);
  });
  it("does not grant the same temporary health again on a refresh", () => {
    const world = arena(), pet = spawnPet(world, world.units[0], { ...clone, attack: undefined }, 100);
    const effect = { type: "stat", stat: "health", amount: { base: 300 }, duration: 1 } as const;
    petEffects(world, world.units[0], pet, [effect], "singleTarget", "R");
    pet.hp = 1100; petEffects(world, world.units[0], pet, [effect], "singleTarget", "R");
    expect(pet.hp).toBe(1100); expect(derive(petFormulaTarget(pet, world.units[0], 0)).maxHp).toBe(1300);
  });
  it("retains grievous wounds on the actual recipient and reduces subsequent healing", () => {
    const world = arena(), pet = spawnPet(world, world.units[0], { ...clone, attack: undefined }, 100); pet.hp = 500;
    petEffects(world, world.units[1], pet, [{ type: "grievousWounds", duration: 3 }], "singleTarget", "wounds");
    expect(pet.statuses?.some(s => s.kind === "grievousWounds")).toBe(true);
    petEffects(world, world.units[0], pet, [{ type: "heal", amount: { base: 100 } }], "singleTarget", "heal");
    expect(pet.hp).toBe(560);
  });
});

function queuedMissile(world: World): Missile {
  return { id: world.nextId++, owner: 0, source: "Q", x: 100, direction: 1, perTick: 1000, homing: false, projectile: false, travelLeft: 500, seenTick: 0, connects: true, scale: 1, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] };
}
describe("batch13 hook-created decisive skillshots", () => {
  it("defers an upkeep-created packet until the ordinary fork, preserving hit and miss weights", () => {
    const q = ability({ key: "Q", delivery: { kind: "line", range: 500, width: 100 } });
    const world = arena({ onTick(ctx) { if (ctx.memory.once) return; ctx.memory.once = true; const m = queuedMissile(ctx.world); ctx.world.missiles.push(m); ctx.queueSplit({ missile: m.id, chance: .25 }); } }, [q]);
    const splits = step(world, [idle, idle]); expect(world.units[1].hp).toBe(2000); expect(splits).toHaveLength(1);
    expect(world.pendingSplits).toBeUndefined(); const branches = fork(world, splits);
    expect(branches.map(w => w.weight)).toEqual([.25, .75]);
    for (const branch of branches) step(branch, [idle, idle]);
    expect(branches.map(w => w.units[1].hp)).toEqual([1900, 2000]);
  });
  it("copies nested pending queues independently of the hook caller and cloned worlds", () => {
    const world = arena(), split = { missile: 1, chance: .4, followUps: [{ zone: 2, chance: .7 }] };
    hookContext(world, world.units[0]).queueSplit(split); split.followUps[0]!.chance = .1;
    const copy = cloneWorld(world); copy.pendingSplits![0]!.followUps![0]!.chance = .9;
    expect(world.pendingSplits?.[0]!.followUps?.[0]!.chance).toBe(.7);
  });
  it("defers an already-due hook-created zone and retains the unchanged branch cap", () => {
    const q = ability({ key: "Q", delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    const world = arena(undefined, [q]); world.settings.maxBranches = 1;
    world.zones.push({ id: 1, owner: 0, ability: "Q", kind: "delayedArea", x: 200, radius: 100, seenTick: 0, startTick: 0, endTick: 0, connects: true, scale: 1, onHit: q.onHit });
    hookContext(world, world.units[0]).queueSplit({ zone: 1, chance: .25 }); advanceZones(world);
    expect(world.units[1].hp).toBe(2000); const splits = step(world, [idle, idle]);
    const branches = fork(world, splits); expect(branches).toHaveLength(1);
    step(branches[0]!, [idle, idle]); expect(branches[0]!.units[1].hp).toBe(1975);
  });
  it("rejects non-finite or out-of-range probabilities and leaves default worlds unqueued", () => {
    const world = arena(), ctx = hookContext(world, world.units[0]);
    for (const chance of [-.1, 1.1, NaN, Infinity]) expect(() => ctx.queueSplit({ missile: 1, chance })).toThrow("Invalid queued");
    expect(world.pendingSplits).toBeUndefined(); expect(step(world, [idle, idle])).toEqual([]);
  });
});

describe("batch13 actual ground-delivery initialization and delays", () => {
  it("uses centered delayed-area boundaries for actual pets without expanding by their radius", () => {
    const q = ability({ key: "Q", delivery: { kind: "circle", range: 500, radius: 100, delay: .1, centered: true }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    const world = arena(undefined, [q]);
    const inside = spawnPet(world, world.units[1], { ...clone, attack: undefined }, 300);
    const edge = spawnPet(world, world.units[1], { ...clone, attack: undefined }, 301);
    startCast(world, world.units[0], q, { direction: 1, distance: 200 }); world.tick = 3; advanceZones(world);
    expect(inside.hp).toBe(900); expect(edge.hp).toBe(1000);
  });
  it.each([false, true])("honors actual champion and pet center boundaries when centered=%s", centered => {
    const q = ability({ key: "Q", delivery: { kind: "field", range: 500, radius: 100, duration: 1, interval: .1 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    const world = arena({ onZoneCreated(ctx) { ctx.zone.centered = centered; } }, [q]);
    world.units[1].x = 301;
    const inside = spawnPet(world, world.units[1], { ...clone, attack: undefined }, 300);
    const edge = spawnPet(world, world.units[1], { ...clone, attack: undefined }, 301);
    startCast(world, world.units[0], q, { direction: 1, distance: 200 });
    expect(world.units[1].hp).toBe(centered ? 2000 : 1900);
    expect(inside.hp).toBe(900); expect(edge.hp).toBe(centered ? 1000 : 900);
  });
  it("initializes circle state after onCast and before insertion, honoring actual aim delay", () => {
    const observations: string[] = [];
    const q = ability({ key: "Q", decisive: true, delivery: { kind: "circle", range: 800, radius: 100, delay: 1, delayFor: (_a, _b, aim) => (aim?.distance ?? 500) / 1000 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    const world = arena({ onCast(ctx) { observations.push("cast"); ctx.memory.cast = true; }, onZoneCreated(ctx) { expect(ctx.memory.cast).toBe(true); expect(ctx.world.zones).toHaveLength(0); expect(ctx.zone.endTick).toBe(6); ctx.zone.noPets = true; observations.push("zone"); } }, [q]);
    startCast(world, world.units[0], q, { direction: 1, distance: 200 });
    expect(observations).toEqual(["cast", "zone"]); expect(world.zones[0]).toMatchObject({ x: 200, endTick: 6, noPets: true });
  });
  it("uses dynamic delay for the pending-cast threat and then the concrete zone", () => {
    const q = ability({ key: "Q", castTime: .5, delivery: { kind: "circle", range: 800, radius: 100, delay: 1, delayFor: () => .2 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    const world = arena(undefined, [q]); world.settings.reactionTime = 0; startCast(world, world.units[0], q);
    const threat = threatsTo(world, 1).find(t => t.source === "Q");
    expect(threat?.eta).toBe(21); world.tick = 15; completeCast(world, world.units[0], q, 0);
    expect(world.zones[0]!.endTick).toBe(21);
  });
  it("preserves constant-delay circles and flight landing delay when no callback exists", () => {
    const q = ability({ key: "Q", delivery: { kind: "circle", range: 800, radius: 100, delay: .5, speed: 1000 } });
    const world = arena(undefined, [q]); startCast(world, world.units[0], q);
    expect(world.zones[0]!.endTick).toBe(Infinity); expect(world.missiles[0]!.landingZone?.delayTicks).toBe(15);
  });
  it("calls ground initialization for fields and instant areas before their first effects", () => {
    for (const delivery of [{ kind: "field", range: 500, radius: 100, duration: 1, interval: .1 }, { kind: "area", near: 100, far: 300, delay: 0, anchor: "ground" }] as const) {
      let initialized = 0; const q = ability({ key: "Q", delivery, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
      const world = arena({ onZoneCreated(ctx) { initialized++; expect(ctx.world.zones).toHaveLength(0); ctx.zone.onHit = []; } }, [q]);
      startCast(world, world.units[0], q); expect(initialized).toBe(1); expect(world.units[1].hp).toBe(2000);
    }
  });
});
