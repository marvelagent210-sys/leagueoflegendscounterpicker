import { describe, expect, it } from "vitest";
import { advanceMissiles, startCast } from "../../engine/sim/actions";
import { resolveAttackOnPet } from "../../engine/sim/attackPet";
import { abilityHit, abilityHitPet, applyEffect } from "../../engine/sim/combat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { advancePets, spawnPet } from "../../engine/sim/pets";
import { projectileBlockPoint, projectileBlocked } from "../../engine/sim/projectileBlock";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, PetSpec, StateType } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { ability, fighter } from "./kits";
import { idle } from "./helpers";

function world(): World {
 const spec = fighter({ base: { hp: 2000, armor: 0, mr: 0, hpRegen: 0 } });
 const w = createWorld({ fighters: [spec, spec], distance: 0, modes: ["idle", "idle"], settings: { maxBranches: 1, log: true } });
 w.units[0].x = 0; w.units[1].x = 100; return w;
}
function protect(w: World, state: StateType) {
 w.units[1].statuses.push({ kind: "state", key: state, source: 1, startTick: 0, endTick: 1000, value: 0 });
}
function pet(w: World, extra: Partial<PetSpec> = {}) {
 return spawnPet(w, w.units[1], { kind: "fixture", name: "Fixture", hp: 1000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 30, ...extra }, 100);
}
function spell(flags: AbilitySpec["flags"] = {}) {
 return ability({ key: "E", delivery: { kind: "target", range: 500 }, flags, onHit: [{ type: "damage", damageType: "magic", amount: { base: 100 } }] });
}

describe("independent spell dodge and block defenses", () => {
 it.each([
  [undefined, "dodgeAttacks", 0], [false, "dodgeAttacks", 100],
  [undefined, "blockAttacks", 0], [false, "blockAttacks", 0],
 ] as const)("dodge override %s against %s retains its own damage %s", (dodge, defense, damage) => {
  const w = world(), a = spell({ parry: true, ...(dodge === undefined ? {} : { dodge }) });
  protect(w, defense); abilityHit(w, w.units[0], w.units[1], a, a.onHit!);
  expect(2000 - w.units[1].hp).toBe(damage);
 });
 it("a block override is independent of dodge and preserves legacy parry shorthand", () => {
  for (const defense of ["blockAttacks", "dodgeAttacks"] as const) {
   const w = world(), a = spell({ parry: true, block: false }); protect(w, defense);
   abilityHit(w, w.units[0], w.units[1], a, a.onHit!);
   expect(2000 - w.units[1].hp).toBe(defense === "blockAttacks" ? 100 : 0);
  }
 });
 it.each(["parry", "spellShield"] as const)("selective attack defenses do not bypass %s", defense => {
  const w = world(), a = spell({ parry: true, dodge: false, block: false }); protect(w, defense);
  abilityHit(w, w.units[0], w.units[1], a, a.onHit!); expect(w.units[1].hp).toBe(2000);
 });
 it.each([false, true])("on-hit-only dodge retains spell damage (dodging=%s)", dodging => {
  const w = world(); w.units[0].spec = { ...w.units[0].spec, attack: { ...w.units[0].spec.attack, onHit: [{ type: "damage", damageType: "magic", amount: { base: 25 } }] } };
  const a = spell({ appliesOnHit: true, dodgeStopsOnHit: true }); if (dodging) protect(w, "dodgeAttacks");
  abilityHit(w, w.units[0], w.units[1], a, a.onHit!); expect(2000 - w.units[1].hp).toBe(dodging ? 100 : 125);
 });
 it("pet spell contact uses the same independent dodge contract", () => {
  const w = world(), p = pet(w), a = spell({ parry: true, dodge: false, petContactHooks: true });
  p.statuses = [{ kind: "state", key: "dodgeAttacks", source: 1, startTick: 0, endTick: 1000, value: 0 }];
  abilityHitPet(w, w.units[0], p, a, a.onHit!); expect(p.hp).toBe(900); expect(w.units[1].hp).toBe(2000);
 });
});

describe("actual pet target metadata and cosmetic clone attacks", () => {
 it("keeps clone class, champion target class and separate gameplay/pathing radii", () => {
  const w = world(), p = pet(w, { unitClass: "clone", targetClass: "champion", radius: 40, pathingRadius: 12 });
  const target = petFormulaTarget(p, w.units[0], 0);
  expect(target.spec).toMatchObject({ unitClass: "clone", targetClass: "champion", base: { radius: 40, pathingRadius: 12 } });
  const ordinary = petFormulaTarget(pet(w), w.units[0], 0);
  expect(ordinary.spec.unitClass).toBeUndefined(); expect(ordinary.spec.base.pathingRadius).toBe(30);
 });
 it.each([false, true])("a cosmetic clone advances attack clocks without hit/on-hit/retaliation (blind=%s)", blind => {
  const w = world(); w.units[0].x = 100; w.units[1].x = 0;
  w.units[0].spec = { ...w.units[0].spec, hooks: { onIncomingOnHit(ctx) { ctx.memory.received = Number(ctx.memory.received ?? 0) + 1; } } };
  w.units[0].statuses.push({ kind: "state", key: "reflectAttacks", source: 0, startTick: 0, endTick: 1000, value: 100 });
  const p = pet(w, { unitClass: "clone", targetClass: "champion", attack: { cosmetic: true, range: 500, windup: .1, interval: 1, attackLike: true, effects: [] } }); p.x = 0;
  p.statuses = [{ kind: "state", key: "invisible", source: 1, startTick: 0, endTick: 1000, value: 0 }, ...(blind ? [{ kind: "cc" as const, key: "blind", source: 1 as const, startTick: 0, endTick: 1000, value: 0 }] : [])];
  advancePets(w); expect(p.windup).toBeDefined(); expect(p.nextAttackTick).toBe(30);
  w.tick = 3; advancePets(w); expect(p.windup).toBeUndefined();
  expect(p.statuses.some(s => s.key === "invisible")).toBe(false);
  expect(w.units[0].hp).toBe(2000); expect(w.units[0].memory.received).toBeUndefined(); expect(p.hp).toBe(1000);
  expect(w.petMissiles ?? []).toHaveLength(0);
 });
 it("ordinary actual pet attacks still create incoming hit events", () => {
  const w = world(); w.units[0].x = 100; w.units[1].x = 0;
  w.units[0].spec = { ...w.units[0].spec, hooks: { onIncomingOnHit(ctx) { ctx.memory.received = true; } } };
  const p = pet(w, { attack: { range: 500, interval: 1, attackLike: true, effects: [{ type: "damage", damageType: "magic", amount: { base: 50 } }] } }); p.x = 0;
  advancePets(w); expect(w.units[0].hp).toBe(1950); expect(w.units[0].memory.received).toBe(true);
 });
});

describe("pet-target attack resolution stays separate from champion callbacks", () => {
 for (const onHitToPets of [false, true]) it.each(["hit", "blind", "dodgeAttacks", "blockAttacks", "parry"] as const)(`actual pet resolution ${onHitToPets}: %s`, defense => {
  const w = world(), p = pet(w); w.units[0].spec = { ...w.units[0].spec, attack: { ...w.units[0].spec.attack, onHitToPets }, hooks: {
   onAttackResolved(ctx) { ctx.memory.championCallback = true; },
   onAttackPetResolved(ctx) { ctx.memory.petCallback = Number(ctx.memory.petCallback ?? 0) + 1; ctx.memory.blocked = ctx.blocked; ctx.memory.missed = ctx.missed; ctx.memory.targetId = ctx.pet.id; },
  } };
  if (defense !== "hit" && defense !== "blind") p.statuses = [{ kind: "state", key: defense, source: 1, startTick: 0, endTick: 1000, value: 0 }];
  resolveAttackOnPet(w, w.units[0], p, defense === "blind", [], { critChance: 0 });
  expect(w.units[0].memory.petCallback).toBe(1); expect(w.units[0].memory.championCallback).toBeUndefined(); expect(w.units[0].memory.targetId).toBe(p.id);
  expect(w.units[0].memory.missed).toBe(defense === "blind" || defense === "dodgeAttacks");
  expect(w.units[0].memory.blocked).toBe(defense === "blockAttacks" || defense === "parry");
  expect(p.hp).toBe(defense === "hit" ? 900 : 1000);
 });
});

describe("first projectile destruction coordinates", () => {
 it.each([1, -1])("uses first wall/aura intersection in direction %s", sign => {
  const w = world(); w.units[1].x = sign * 500;
  w.units[1].statuses.push({ kind: "state", key: "projectileBlock", source: 1, startTick: 0, endTick: 10, value: 35 });
  w.zones.push({ id: 1, owner: 1, kind: "projectileWall", x: sign * 300, radius: 0, seenTick: 0, startTick: 0, endTick: 10 });
  expect(projectileBlockPoint(w, 0, 0, sign * 700)).toBe(sign * 300);
  expect(projectileBlockPoint(w, 0, sign * 700, 0)).toBe(sign * 600);
  expect(projectileBlocked(w, 0, 0, sign * 299)).toBe(false);
  w.tick = 10; expect(projectileBlockPoint(w, 0, 0, sign * 700)).toBeUndefined();
 });
 it.each([false, true])("blocked missile end hook sees true position and remaining distance (special=%s)", special => {
  const w = world(); w.units[1].x = 800;
  w.units[0].spec = { ...w.units[0].spec, hooks: { onMissileEnd(ctx) { ctx.memory.endX = ctx.missile.x; ctx.memory.remaining = ctx.missile.travelLeft; ctx.memory.reason = ctx.reason; } } };
  w.zones.push({ id: 1, owner: 1, kind: "projectileWall", x: 250, radius: 0, seenTick: 0, startTick: 0, endTick: 10 });
  w.missiles.push({ id: w.nextId++, owner: 0, source: "lure", x: 100, perTick: 300, direction: 1, homing: false, projectile: true, connects: false, scale: 1, onHit: [], travelLeft: 1000, seenTick: 0, ...(special ? { piercing: true } : {}) });
  advanceMissiles(w); expect(w.units[0].memory).toMatchObject({ endX: 250, remaining: 850, reason: "blocked" }); expect(w.missiles).toHaveLength(0);
 });
});

describe("voluntary channel cancellation has opening and closing locks", () => {
 for (const command of ["move", "champion", "pet"] as const) it.each([0, 8, 82])(`${command} order at tick %s`, tick => {
  const w = world(), p = pet(w); w.tick = tick;
  const a = ability({ key: "R", delivery: { kind: "self" }, channel: { duration: 3, interruptible: true, cancelAfter: .25, cancelAttackAfter: .25, cancelAttackOtherAfter: .25, cancelBeforeEnd: .25 } });
  w.units[0].spec = { ...w.units[0].spec, abilities: [a], hooks: { onChannelInterrupt(ctx) { ctx.memory.interrupted = ctx.reason; } } };
  w.units[0].action = { kind: "channel", ability: "R", startTick: 0, endTick: 90, nextTick: Infinity, intervalTicks: Infinity };
  step(w, [() => command === "move" ? { kind: "move", direction: 1 } : command === "pet" ? { kind: "attack", pet: p.id } : { kind: "attack" }, idle]);
  expect(w.units[0].memory.interrupted).toBe(tick === 8 ? command === "move" ? "move" : "attack" : undefined);
  expect(w.units[0].action?.kind === "channel").toBe(tick !== 8);
 });
 it("an unreachable attack cannot cancel an otherwise cancellable channel", () => {
  const w = world(); w.units[1].x = 1000; w.tick = 20;
  w.units[0].spec = { ...w.units[0].spec, abilities: [ability({ key: "R", delivery: { kind: "self" }, channel: { duration: 3, interruptible: true, cancelAttackAfter: .25 } })] };
  w.units[0].action = { kind: "channel", ability: "R", startTick: 0, endTick: 90, nextTick: Infinity, intervalTicks: Infinity };
  step(w, [() => ({ kind: "attack" }), idle]); expect(w.units[0].action?.kind).toBe("channel");
 });
 it("the final voluntary lock never grants CC immunity", () => {
  const w = world(); w.tick = 85;
  w.units[0].spec = { ...w.units[0].spec, abilities: [ability({ key: "R", delivery: { kind: "self" }, channel: { duration: 3, interruptible: true, cancelAfter: .25, cancelBeforeEnd: .25 } })], hooks: { onChannelInterrupt(ctx) { ctx.memory.interrupted = ctx.reason; } } };
  w.units[0].action = { kind: "channel", ability: "R", startTick: 0, endTick: 90, nextTick: Infinity, intervalTicks: Infinity };
  applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "silence", duration: 1 }, { scale: 1 });
  expect(w.units[0].action).toBeUndefined(); expect(w.units[0].memory.interrupted).toBe("cc");
 });
});


describe("unit-targeted dash completion revalidation", () => {
 it.each(["range", "untargetable", "invisible", "dead"] as const)("%s invalidation cancels without resource or cooldown cost", invalidation => {
  const w = world(), a = ability({ key: "E", cost: 50, cooldown: 10, castTime: .1, cancelOnInvalidTarget: true, delivery: { kind: "dash", direction: "target", distance: 210, speed: 1000, hitRadius: 0 } });
  w.units[0].spec = { ...w.units[0].spec, abilities: [a] }; const mana = w.units[0].resource; startCast(w, w.units[0], a);
  if (invalidation === "range") w.units[1].x = 1000;
  else if (invalidation === "dead") w.units[1].hp = 0;
  else protect(w, invalidation);
  w.tick = 3; step(w, [idle, idle]);
  expect(w.units[0].resource).toBe(mana); expect(w.units[0].cooldownReady.E ?? 0).toBe(0); expect(w.units[0].action).toBeUndefined(); expect(w.units[0].x).toBe(0);
 });
 it("valid target-dash range includes both gameplay radii at completion", () => {
  const w = world(), a = ability({ key: "E", cost: 50, cooldown: 10, castTime: .1, cancelOnInvalidTarget: true, delivery: { kind: "dash", direction: "target", distance: 210, speed: 1000, hitRadius: 0 } });
  w.units[0].spec = { ...w.units[0].spec, abilities: [a] }; const mana = w.units[0].resource; startCast(w, w.units[0], a);
  w.units[1].x = 210 + w.units[0].spec.base.radius + w.units[1].spec.base.radius; w.tick = 3; step(w, [idle, idle]);
  expect(w.units[0].resource).toBe(mana - 50); expect(w.units[0].cooldownReady.E).toBe(303); expect(w.units[0].action?.kind).toBe("dash");
 });
});
