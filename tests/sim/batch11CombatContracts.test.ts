import { describe, expect, it } from "vitest";
import { absorbWithShields } from "../../engine/rules/defense";
import { advanceMissiles, advanceZones } from "../../engine/sim/actions";
import { resolveAttackOnPet } from "../../engine/sim/attackPet";
import { abilityHit, abilityHitPet, applyCC, applyEffect, attackHit, dealDamage, heal, notifyKill } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { destroyPet, advancePets, petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import { projectileInterceptPoint } from "../../engine/sim/projectileBlock";
import type { Effect, KitHooks, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type Missile, type World } from "../../engine/sim/state";
import { ability, fighter } from "./kits";

const idle = () => undefined;
const petSpec: PetSpec = { kind: "fixture", name: "Actual body", hp: 1000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 30 };
const damage: Effect = { type: "damage", damageType: "magic", amount: { base: 100 } };
const shot = ability({ key: "Q", delivery: { kind: "self" }, flags: { projectile: true, petContactHooks: true }, onHit: [damage, { type: "cc", cc: "stun", duration: 1 }] });
function arena(sourceHooks: KitHooks = {}, targetHooks: KitHooks = {}) {
  const world = createWorld({ fighters: [fighter({ base: { armor: 0, mr: 0, hpRegen: 0 }, abilities: [shot], hooks: sourceHooks }), fighter({ base: { armor: 0, mr: 0, hpRegen: 0 }, hooks: targetHooks })], distance: 300, modes: ["idle", "idle"], settings: { log: true } });
  world.units[0].x = 0; world.units[1].x = 300;
  return world;
}
function shield(world: World, value: number, firstDamageBypass?: number) {
  applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: value }, duration: firstDamageBypass === undefined ? 20 : 10, ...(firstDamageBypass !== undefined ? { firstDamageBypass } : {}) }, { scale: 1 });
}
function missile(world: World, changes: Partial<Missile> = {}) {
  const value: Missile = { id: world.nextId++, owner: 0, source: "Q", seenTick: 0, x: 0, perTick: 600, homing: false, direction: 1, travelLeft: 1000, projectile: true, connects: true, scale: 1, onHit: shot.onHit!, ...changes };
  world.missiles.push(value); return value;
}
function intercept(world: World, facing: 1 | -1 = -1) {
  world.units[1].facing = facing;
  applyEffect(world, world.units[1], world.units[1], { type: "state", state: "projectileIntercept", duration: 5 }, { scale: 1 });
}

describe("batch11 shield transactions", () => {
  it("lets existing shields absorb first, then only shields damage beyond the health threshold", () => {
    const world = arena(), [source, target] = world.units; source.hp = 1000; target.hp = 1000;
    source.statuses.push({ kind: "stat", key: "lifeSteal", value: .5, source: 0, startTick: 0, endTick: 100 });
    shield(world, 200); shield(world, 300, 400);
    dealDamage(world, source, target, 700, "true", { attack: true });
    expect(target.hp).toBe(600); expect(target.totals.absorbed).toBe(300); expect(source.hp).toBe(1350);
    expect(target.statuses.filter(s => s.kind === "shield").map(s => s.value)).toEqual([200]);
    expect(target.statuses.every(s => s.firstDamageBypass === undefined)).toBe(true);
    heal(world, target, 400); dealDamage(world, source, target, 100, "true");
    expect(target.hp).toBe(1000); expect(target.statuses.find(s => s.kind === "shield")?.value).toBe(100);
  });
  it("does not turn a first-packet bypass into recurring shield immunity", () => {
    const pending = [{ amount: 100, type: "normal" as const, endTick: 50, firstDamageBypass: 80 }];
    expect(absorbWithShields(100, "true", pending)).toBe(80); expect(pending[0]!.amount).toBe(80);
    expect(absorbWithShields(50, "true", pending)).toBe(0); expect(pending[0]!.amount).toBe(30);
  });
  it("adjusts a critical-average packet once before ordinary shields and vamp", () => {
    let calls = 0; const amounts: number[] = [];
    const world = arena({}, { modifyDamageBeforeShields(ctx) { calls++; amounts.push(ctx.amount); return ctx.amount / 2; } });
    shield(world, 20); dealDamage(world, world.units[0], world.units[1], 100, "physical", { crit: { chance: .5, multiplier: 2 } });
    expect(calls).toBe(1); expect(amounts).toEqual([150]); expect(world.units[1].hp).toBe(1945); expect(world.units[1].totals.absorbed).toBe(20);
  });
  it.each(["invulnerable", "stasis"] as const)("does not consume a pre-shield guard during %s", guard => {
    let calls = 0; const world = arena({}, { modifyDamageBeforeShields(ctx) { calls++; return ctx.amount; } });
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: guard, duration: 1 }, { scale: 1 });
    dealDamage(world, ...world.units, 100, "true"); expect(calls).toBe(0); expect(world.units[1].hp).toBe(2000);
  });
  it("preserves area resistance when a pet contact hook replaces the damage packet", () => {
    const world = arena({ onAbilityContact() { return [{ type: "damage", damageType: "true", amount: { base: 100 } }]; } });
    const pet = spawnPet(world, world.units[1], { ...petSpec, areaTaken: .4 }, 300);
    abilityHitPet(world, world.units[0], pet, shot, shot.onHit!, "area");
    expect(pet.hp).toBe(960); expect(world.units[1].hp).toBe(2000);
  });
  it("consumes an actual pet's empowered spell shield without restoring its charges", () => {
    const world = arena(), source = world.units[0]; source.spec = { ...source.spec, attack: { ...source.spec.attack, onHitToPets: true } };
    const pet = spawnPet(world, world.units[1], petSpec, 100);
    pet.statuses = [{ kind: "state", key: "spellShield", value: 0, charges: 2, source: 1, startTick: 0, endTick: 100 }];
    for (let i = 0; i < 2; i++) resolveAttackOnPet(world, source, pet, false, [], { spellShield: true });
    expect(pet.statuses.some(s => s.key === "spellShield")).toBe(false); expect(pet.hp).toBe(1000);
    resolveAttackOnPet(world, source, pet, false, [], { spellShield: true }); expect(pet.hp).toBe(900);
  });
});

describe("batch11 spatial damage provenance", () => {
  it("retains ground-center origin through nested proc hooks and restores the default afterward", () => {
    const origins: number[] = []; let nested = false;
    const world = arena({ onDamageDealt(ctx) { if (!nested) { nested = true; dealDamage(ctx.world, ctx.self, ctx.enemy, 10, "true"); } } }, { modifyDamageBeforeShields(ctx) { origins.push(ctx.originX); return ctx.amount; } });
    world.units[0].x = -100;
    abilityHit(world, ...world.units, shot, [damage], 1, 500);
    dealDamage(world, ...world.units, 1, "true"); expect(origins).toEqual([500, 500, -100]);
  });
  it("records the actual ground field center rather than the caster's later position", () => {
    const origins: number[] = [], world = arena({}, { modifyDamageBeforeShields(ctx) { origins.push(ctx.originX); return ctx.amount; } });
    world.zones.push({ id: world.nextId++, owner: 0, kind: "field", ability: "Q", seenTick: 0, x: 325, radius: 100, startTick: 0, endTick: 100, nextTick: 0, interval: 30, onHit: [damage] });
    world.units[0].x = -1000; advanceZones(world); expect(origins).toEqual([325]);
  });
  it("keeps an explicitly anchored DoT origin when its caster changes sides", () => {
    const origins: number[] = [], world = arena({}, { modifyDamageBeforeShields(ctx) { origins.push(ctx.originX); return ctx.amount; } });
    abilityHit(world, ...world.units, shot, [{ type: "dot", damageType: "true", total: { base: 100 }, duration: 1, interval: 1 }], 1, 325);
    world.units[0].x = -1000; for (let t = 0; t <= 30; t++) step(world, [idle, idle]); expect(origins).toEqual([325]);
  });
});

describe("batch11 channel and movement exceptions", () => {
  it.each([false, true])("uses explicit interruption rules on %s overlaid channels", overlaid => {
    const channel = ability({ key: "W", delivery: { kind: "self" }, channel: { duration: 2, interruptible: true, interrupts: ["silence"] } });
    const world = arena(), self = world.units[0]; self.spec = { ...self.spec, abilities: [channel, shot] };
    const held = { kind: "channel" as const, ability: "W", startTick: 0, endTick: 60, nextTick: Infinity, intervalTicks: Infinity };
    self.action = overlaid ? { kind: "cast", ability: "Q", startTick: 0, endTick: 10, resume: held } : held;
    applyCC(world, world.units[1], self, "stun", 1); expect(overlaid ? self.action?.kind === "cast" && self.action.resume?.kind : self.action?.kind).toBe("channel");
    applyCC(world, world.units[1], self, "silence", 1); expect(overlaid ? self.action?.kind === "cast" && self.action.resume : self.action).toBeUndefined();
  });
  it("keeps ordinary channels interrupted by stun", () => {
    const world = arena(), self = world.units[0]; self.spec = { ...self.spec, abilities: [ability({ key: "W", delivery: { kind: "self" }, channel: { duration: 2, interruptible: true } })] };
    self.action = { kind: "channel", ability: "W", startTick: 0, endTick: 60, nextTick: Infinity, intervalTicks: Infinity };
    applyCC(world, world.units[1], self, "stun", 1); expect(self.action).toBeUndefined();
  });
  it("applies and invalidates timed effective movement speed without sharing branch state", () => {
    const world = arena(), self = world.units[0];
    applyEffect(world, self, self, { type: "state", state: "moveSpeedOverride", duration: 1, value: 60 }, { scale: 1 });
    expect(derive(self).moveSpeed).toBe(60); expect(derive(self).rawMoveSpeed).toBe(60);
    const copy = cloneWorld(world); copy.units[0].statuses[0]!.value = 120; expect(derive(copy.units[0]).moveSpeed).toBe(120); expect(derive(self).moveSpeed).toBe(60);
    for (let t = 0; t <= 30; t++) step(world, [idle, idle]); expect(derive(self).moveSpeed).toBe(350);
  });
});

describe("batch11 actual pet displacement and death", () => {
  it("moves only the accepted pet, with independent cloned forced movement", () => {
    const world = arena(), pet = spawnPet(world, world.units[1], petSpec, 100), origin = world.units[1].x;
    petEffects(world, world.units[0], pet, [{ type: "displace", direction: "away", originX: 0, distance: 300, duration: .5 }]);
    const copy = cloneWorld(world); copy.pets[0]!.forced!.perTick = 1; expect(pet.forced?.perTick).toBe(20);
    for (let t = 0; t < 15; t++) { world.tick = t; advancePets(world); }
    expect(pet.x).toBe(400); expect(world.units[1].x).toBe(origin);
  });
  it("keeps a pet's windup and position when displacement immunity rejects the packet", () => {
    const world = arena(), pet = spawnPet(world, world.units[1], petSpec, 100);
    pet.statuses = [{ kind: "state", key: "displacementImmune", source: 1, startTick: 0, endTick: 100, value: 0 }];
    const windup = { target: 0 as const, launchTick: 20, blinded: false, effects: [] }; pet.windup = windup;
    expect(petEffects(world, world.units[0], pet, [{ type: "displace", direction: "away", distance: 300, duration: 1 }])).toBe(false);
    expect(pet.windup).toBe(windup); expect(pet.forced).toBeUndefined(); expect(pet.x).toBe(100);
  });
  it("uses an explicit over endpoint without lending the caster a fake position", () => {
    const world = arena(), pet = spawnPet(world, world.units[1], petSpec, 200);
    petEffects(world, world.units[0], pet, [{ type: "displace", direction: "toward", originX: 75, over: true, distance: 125, duration: .5 }]);
    for (let t = 0; t < 15; t++) { world.tick = t; advancePets(world); }
    expect(pet.x).toBeCloseTo(75); expect(world.units[0].x).toBe(0);
  });
  it("notifies one actual combat death and excludes replacements and expiry", () => {
    const victims: unknown[] = [], sources: unknown[] = [], world = arena({ onDeathObserved(ctx) { victims.push(ctx.victim); sources.push(ctx.source); } });
    const pet = spawnPet(world, world.units[1], petSpec, 100); dealDamage(world, world.units[0], { ...world.units[1], petId: pet.id }, 10000, "true");
    notifyKill(world, world.units[0], pet); expect(victims).toEqual([pet]); expect(sources).toEqual([world.units[0]]);
    destroyPet(world, spawnPet(world, world.units[1], petSpec, 100)); const expired = spawnPet(world, world.units[1], petSpec, 100); expired.endTick = 0; advancePets(world); expect(victims).toHaveLength(1);
    dealDamage(world, ...world.units, 10000, "true"); notifyKill(world, ...world.units); expect(victims).toHaveLength(2);
  });
});

describe("batch11 projectile interception", () => {
  it("reports destruction distinctly and does not resolve an already claimed contact twice", () => {
    const reasons: string[] = []; let contacts = 0;
    const world = arena({
      onMissileMove(ctx) { abilityHit(ctx.world, ctx.self, ctx.enemy, shot, [damage], 1, ctx.from); ctx.missile.ended = true; },
      onMissileContact() { contacts++; },
      onMissileEnd(ctx) { reasons.push(ctx.reason); },
    });
    intercept(world); missile(world); advanceMissiles(world);
    expect(world.units[1].hp).toBe(1900); expect(contacts).toBe(0); expect(reasons).toEqual(["intercepted"]);
  });
  it("lets a custom geometric veto preserve a flight that misses the actual body", () => {
    let checks = 0; const world = arena({ canProjectileIntercept() { checks++; return false; } });
    intercept(world); const value = missile(world, { connects: false, interceptable: true, perTick: 350 });
    advanceMissiles(world); expect(checks).toBe(1); expect(world.units[1].hp).toBe(2000);
    expect(world.missiles).toEqual([value]); expect(value.x).toBe(350); expect(value.intercepted).toBeUndefined();
  });
  it.each([-1, 1] as const)("catches incoming front travel but permits center and rear departures facing %s", facing => {
    const world = arena(); intercept(world, facing); const center = world.units[1].x;
    expect(projectileInterceptPoint(world, 0, center + facing * 100, center - facing * 100)).toBe(center + facing * 65);
    expect(projectileInterceptPoint(world, 0, center + facing * 20, center - facing * 20)).toBe(center + facing * 20);
    expect(projectileInterceptPoint(world, 0, center + facing * 20, center + facing * 100)).toBeUndefined();
    expect(projectileInterceptPoint(world, 0, center - facing * 100, center + facing * 100)).toBeUndefined();
    expect(projectileInterceptPoint(world, 0, center, center + facing * 100)).toBeUndefined();
    expect(projectileInterceptPoint(world, 0, center, center - facing * 100)).toBeUndefined();
  });
  it.each([false, true])("resolves collision effects before ending a %s piercing projectile", piercing => {
    let contacts = 0; const world = arena({ onMissileContact() { contacts++; } }, { modifyDamageBeforeShields() { return 0; } });
    intercept(world); const pet = spawnPet(world, world.units[1], petSpec, 500);
    missile(world, { piercing, collisionPet: true }); advanceMissiles(world);
    expect(world.units[1].hp).toBe(2000); expect(world.units[1].statuses.some(s => s.key === "stun")).toBe(true); expect(pet.hp).toBe(1000); expect(contacts).toBe(1); expect(world.missiles).toHaveLength(0);
  });
  it("redirects a projectile aimed at a real ally body onto the intercepting champion", () => {
    const world = arena(); intercept(world); const pet = spawnPet(world, world.units[1], petSpec, 500);
    missile(world, { pet: pet.id, homing: true }); advanceMissiles(world);
    expect(world.units[1].hp).toBe(1900); expect(pet.hp).toBe(1000); expect(world.missiles).toHaveLength(0);
  });
  it("does not intercept a rear projectile", () => {
    const world = arena(); intercept(world, 1); const pet = spawnPet(world, world.units[1], petSpec, 500);
    missile(world, { pet: pet.id, homing: true }); advanceMissiles(world);
    expect(world.units[1].hp).toBe(2000); expect(pet.hp).toBe(900);
  });
  it("preserves a landing area at the interception coordinate", () => {
    const world = arena(); intercept(world);
    const zone = { id: world.nextId++, owner: 0 as const, kind: "delayedArea" as const, ability: "Q", seenTick: 0, x: 600, radius: 100, startTick: 0, endTick: Infinity, connects: true, onHit: [damage] };
    world.zones.push(zone); missile(world, { connects: false, onHit: [], landingZone: { id: zone.id, delayTicks: 0 } });
    advanceMissiles(world); expect(zone.x).toBe(235); expect(world.zones).toHaveLength(1); advanceZones(world); expect(world.units[1].hp).toBe(1900);
  });
  it("lets an earlier destroying wall take priority over collision effects", () => {
    const world = arena(); intercept(world); world.zones.push({ id: 100, owner: 1, kind: "projectileWall", seenTick: 0, x: 100, radius: 0, startTick: 0, endTick: 100 });
    missile(world); advanceMissiles(world); expect(world.units[1].hp).toBe(2000); expect(world.units[1].statuses.some(s => s.key === "stun")).toBe(false);
  });
  it("retains actual pet-source identity while redirecting its projectile", () => {
    const ids: Array<number | undefined> = []; let ownerHooks = 0;
    const world = arena({ onDamageDealt() { ownerHooks++; } }, { modifyDamageBeforeShields(ctx) { return ctx.enemy.petId === undefined ? 0 : ctx.amount * .45; }, onDamageObserved(ctx) { ids.push(ctx.source.petId); } });
    intercept(world); const source = spawnPet(world, world.units[0], petSpec, 0), target = spawnPet(world, world.units[1], petSpec, 500);
    world.petMissiles = [{ id: world.nextId++, owner: 0, pet: source.id, target: { pet: target.id }, x: 0, perTick: 600, projectile: true, effects: [damage], blinded: false, attackLike: false, sourcePet: source }];
    advancePets(world); expect(world.units[1].hp).toBe(1955); expect(target.hp).toBe(1000); expect(ids).toEqual([source.id]); expect(ownerHooks).toBe(0); expect(world.petMissiles).toHaveLength(0);
  });
});
