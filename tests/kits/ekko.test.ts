import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles, attackRange, canCast, canStartAttack, canStartAttackOnPet, startAttack, startCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, perceive } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, attackHit, beginResurrection, dealDamage, heal } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, runWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type Pet, type World } from "../../engine/sim/state";
import Ekko from "../../kits/champions/Ekko";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";

const idle: Behavior = () => undefined;
const compiled = () => compileKit(championData("Ekko"), records("Ekko"), Ekko, {}, pets("Ekko"), runes());
const subject = (bonus: FighterSpec["bonus"] = {}) => { const spec = compiled().spec; return { ...spec, bonus, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 } }; };
const dummy = () => fighter({ id: "target", base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } });
const worldFor = (distance = 400, bonus: FighterSpec["bonus"] = {}) => {
  const world = createWorld({ fighters: [subject(bonus), dummy()], distance, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 30, reactionTime: 10, maxBranches: 1 } });
  world.units[0].x = 0; world.units[1].x = distance;
  return world;
};
const ability = (world: World, key: string) => world.units[0].spec.abilities.find((spell) => spell.key === key)!;
const advance = (world: World, through: number) => { while (world.tick <= through && !world.result) step(world, [idle, idle]); };
function cast(world: World, key: string, distance?: number): void { startCast(world, world.units[0], ability(world, key), distance === undefined ? undefined : { direction: 1, distance }); }
function finish(world: World, key: string, distance?: number): void { cast(world, key, distance); const action = world.units[0].action; if (action?.kind === "cast") advance(world, action.endTick); }
const state = (world: World, side: 0 | 1, state: StateType, duration = 30) => applyEffect(world, world.units[side], world.units[side], { type: "state", state, duration }, { scale: 1 });
const stacks = (world: World) => world.units[1].statuses.find((s) => s.key === "ekko:resonance")?.value ?? 0;
const stackPet = (pet: Pet) => pet.statuses?.find((s) => s.key === "ekko:resonance")?.value ?? 0;
const petSpec = (changes: Partial<PetSpec> = {}): PetSpec => ({ kind: "test", name: "Test pet", hp: 10000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: Infinity, ...changes });
const contact = (world: World, key = "Qout", pet?: Pet) => { const spell = ability(world, key); if (pet) abilityHitPet(world, world.units[0], pet, spell, spell.onHit!, "area"); else abilityHit(world, ...world.units, spell, spell.onHit!); };
const basic = (world: World) => attackHit(world, ...world.units, false, []);
const phaseAttack = (world: World, pet?: Pet) => { startAttack(world, world.units[0], pet); const action = world.units[0].action; expect(action?.kind).toBe("windup"); if (action?.kind === "windup") advance(world, action.launchTick); };
const rewindReady = (world: World, x = 0) => { while (world.tick < 120) { world.units[0].x = x; advance(world, world.tick); } };

describe("Ekko pinned source contract", () => {
  it("retains five exact wiki revisions, five binary objects and explicit source conflicts", () => {
    const value = compiled();
    expect(new Set(value.evidence.filter((e) => !e.url).map((e) => e.revid))).toEqual(new Set([4025604, 4022978, 4067545, 4012189, 3956502]));
    expect(value.evidence.filter((e) => e.url)).toHaveLength(5);
    expect(value.assumptions.join(" ")).toContain("DelayBeforeDetonation 3");
    expect(value.assumptions.join(" ")).toContain("rank-3 zero");
    expect(value.assumptions.join(" ")).toContain("Neither it nor the exact 16.20 binary supplies dash speed");
    expect(value.assumptions.join(" ")).toContain("DashDistance array contains seven 350 values");
    expect(value.variants).toEqual([]);
  });
  it("uses max-rank formulas, costs and distinct internal packets", () => {
    const world = worldFor(400, { ap: 100 });
    expect(ability(world, "Q")).toMatchObject({ cooldown: 7, cost: 80, castTime: .25 });
    expect(ability(world, "W")).toMatchObject({ cooldown: 14, cost: 50, cooldownAtCastStart: true });
    expect(ability(world, "E")).toMatchObject({ cooldown: 7, cost: 60, castTime: 0, cooldownAfter: "state" });
    expect(ability(world, "R")).toMatchObject({ cooldown: 50, cost: 100, castTime: .5 });
    for (const [key, damage] of [["Qout", 170], ["Qreturn", 210], ["Resonance", 230], ["Rburst", 675]] as const) {
      const effect = ability(world, key).onHit![0]!;
      expect(effect.type === "damage" && evaluate(effect.amount, ...world.units)).toBeCloseTo(damage);
      expect(canCast(world, world.units[0], ability(world, key))).toBe(false);
    }
  });
});

describe("Resonance contacts and guard ordering", () => {
  it("requires three distinct accepted contacts, locks for four seconds and grants champion speed", () => {
    const world = worldFor();
    contact(world); contact(world, "Qreturn");
    expect(stacks(world)).toBe(2);
    basic(world);
    expect(100000 - world.units[1].hp).toBeCloseTo(140 + 140 + 150 + derive(world.units[0]).ad);
    expect(stacks(world)).toBe(0);
    expect(world.units[1].statuses.find((s) => s.key === "ekko:lockout")?.endTick).toBe(120);
    expect(world.units[0].statuses.find((s) => s.key === "moveSpeedPercent")).toMatchObject({ value: .8, endTick: 90 });
    contact(world); expect(stacks(world)).toBe(0);
    advance(world, 119); contact(world); expect(stacks(world)).toBe(1);
  });
  it("refreshes stacks on contact and expires an incomplete sequence at four seconds", () => {
    const world = worldFor(); contact(world); advance(world, 60); contact(world);
    expect(world.units[1].statuses.find((s) => s.key === "ekko:resonance")?.endTick).toBe(181);
    advance(world, 181); contact(world); expect(stacks(world)).toBe(1);
  });
  it.each(["dodgeAttacks", "blockAttacks", "parry"] as const)("%s denies a basic stack while spell contacts retain their own guards", (guard) => {
    const world = worldFor(); state(world, 1, guard); basic(world); expect(stacks(world)).toBe(0);
    contact(world); expect(stacks(world)).toBe(guard === "parry" ? 0 : 1);
  });
  it("blind denies a basic stack and a spell shield blocks only the separate third-stack proc", () => {
    const world = worldFor(); attackHit(world, ...world.units, true, []); expect(stacks(world)).toBe(0);
    contact(world); contact(world); state(world, 1, "spellShield");
    const before = world.units[1].hp; basic(world);
    expect(before - world.units[1].hp).toBeCloseTo(derive(world.units[0]).ad);
    expect(stacks(world)).toBe(0);
    expect(world.units[1].statuses.some((s) => s.key === "ekko:lockout")).toBe(true);
    expect(world.units[0].statuses.some((s) => s.key === "moveSpeedPercent")).toBe(false);
  });
  it("uses separate actual pet stacks, monster multiplier and champion-only speed", () => {
    const world = worldFor(1500), monster = spawnPet(world, world.units[1], petSpec({ targetClass: "monster" }), 300);
    contact(world, "Qout", monster); contact(world, "Qreturn", monster); contact(world, "Qout", monster);
    expect(10000 - monster.hp).toBeCloseTo(140 * 3 + 150 * 2.7);
    expect(stackPet(monster)).toBe(0); expect(stacks(world)).toBe(0);
    expect(world.units[0].statuses.some((s) => s.key === "moveSpeedPercent")).toBe(false);
    const clone = spawnPet(world, world.units[1], petSpec({ targetClass: "champion" }), 300);
    for (let i = 0; i < 3; i++) contact(world, "Qout", clone);
    expect(world.units[0].statuses.some((s) => s.key === "moveSpeedPercent")).toBe(true);
  });
  it("does not attach spell stacks or execute damage to hit-count objects", () => {
    const world = worldFor(1500), pet = spawnPet(world, world.units[1], petSpec({ hitPoints: true, hp: 4 }), 200);
    contact(world, "Qout", pet); expect(pet.hp).toBe(4); expect(stackPet(pet)).toBe(0);
    phaseAttack(world, pet); expect(pet.hp).toBe(3); expect(stackPet(pet)).toBe(0);
  });
});

describe("Timewinder actual flight", () => {
  it("damages once outward, expands on champion contact, then returns after the real delay", () => {
    const world = worldFor(); finish(world, "Q");
    const flight = world.missiles[0]!; expect(flight.x).toBe(0);
    advance(world, 14); expect(100000 - world.units[1].hp).toBe(140);
    expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(true);
    advance(world, 60); expect(world.missiles.some((m) => m.source === "Qreturn")).toBe(false);
    advance(world, 80); expect(100000 - world.units[1].hp).toBe(280); expect(stacks(world)).toBe(2);
    expect(world.missiles).toHaveLength(0);
  });
  it("expands at 700 even when it misses the champion and keeps its real return flight", () => {
    const world = worldFor(2000); finish(world, "Q"); advance(world, 21);
    expect(world.missiles).toHaveLength(1); expect(world.missiles[0]!.x).toBeCloseTo(700);
    advance(world, 74);
    expect(world.missiles.some((m) => m.source === "Qreturn")).toBe(true);
    expect(world.units[1].hp).toBe(100000);
    advance(world, 95); expect(world.missiles).toHaveLength(0);
  });
  it("launches from the position at cast completion and homes to the current owner", () => {
    const world = worldFor(2000); cast(world, "Q"); world.units[0].x = 100; advance(world, 8);
    expect(world.missiles[0]!.x).toBe(100);
    advance(world, 74); world.units[0].x = 800; advance(world, 78);
    expect(world.missiles).toHaveLength(0);
  });
  it("passes through health pets without early expansion and hits each once per pass", () => {
    const world = worldFor(2000), pet = spawnPet(world, world.units[1], petSpec({ areaTaken: .4, targetClass: "minion" }), 300);
    finish(world, "Q"); advance(world, 18);
    expect(10000 - pet.hp).toBeCloseTo(56);
    expect(world.missiles[0]!.perTick).toBe(55);
    advance(world, 95); expect(10000 - pet.hp).toBeCloseTo(112); expect(stackPet(pet)).toBe(2);
  });
  it("treats a Champion-class pet as the expansion contact without stacking its owner", () => {
    const world = worldFor(2000), pet = spawnPet(world, world.units[1], petSpec({ targetClass: "champion" }), 300);
    finish(world, "Q"); advance(world, 16);
    expect(world.missiles[0]!.perTick).toBeLessThan(4);
    expect(stackPet(pet)).toBe(1); expect(stacks(world)).toBe(0);
  });
  it.each(["spellShield", "parry", "untargetable", "stasis"] as const)("%s denies the outward packet, with an independent later return", (guard) => {
    const world = worldFor(); state(world, 1, guard, .7); finish(world, "Q"); advance(world, 20);
    expect(world.units[1].hp).toBe(100000); expect(stacks(world)).toBe(0);
    advance(world, 100); expect(100000 - world.units[1].hp).toBe(140); expect(stacks(world)).toBe(1);
  });
  it("a projectile wall destroys the remaining grenade without inventing a return", () => {
    const world = worldFor(); world.zones.push({ id: 99, owner: 1, kind: "projectileWall", seenTick: 0, x: 150, radius: 0, startTick: 0, endTick: 200 });
    finish(world, "Q"); advance(world, 100);
    expect(world.missiles).toHaveLength(0); expect(world.units[1].hp).toBe(100000);
  });
  it("a wall placed during the return prevents its later pet contact", () => {
    const world = worldFor(2000), pet = spawnPet(world, world.units[1], petSpec(), 300);
    finish(world, "Q"); advance(world, 74);
    expect(world.missiles.some((m) => m.source === "Qreturn")).toBe(true);
    world.zones.push({ id: 99, owner: 1, kind: "projectileWall", seenTick: world.tick, x: 600, radius: 0, startTick: world.tick, endTick: 200 });
    advance(world, 95); expect(10000 - pet.hp).toBe(140); expect(stackPet(pet)).toBe(1); expect(world.missiles).toHaveLength(0);
  });
  it("continues both legs after caster death", () => {
    const world = worldFor(); finish(world, "Q"); dealDamage(world, world.units[1], world.units[0], 100000, "true");
    // A dead owner does not run upkeep; projectile hooks must own the entire flight.
    for (let t = world.tick; t <= 100; t++) { world.tick = t; advanceMissiles(world); }
    expect(100000 - world.units[1].hp).toBe(280); expect(world.missiles).toHaveLength(0);
  });
});

describe("Parallel Convergence zone and basic execute", () => {
  it("arms after 3.25 seconds, then requires actual entry for one shield and stun", () => {
    const world = worldFor(600, { ap: 100 }); cast(world, "W", 600);
    expect(world.zones[0]).toMatchObject({ startTick: 98, seenTick: 60 });
    advance(world, 97); expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(false);
    advance(world, 98); expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(true);
    expect(world.units[0].statuses.some((s) => s.kind === "shield")).toBe(false);
    world.units[0].x = 300; advance(world, 99);
    expect(world.units[0].statuses.find((s) => s.kind === "shield")).toMatchObject({ value: 330, endTick: 159 });
    expect(world.units[1].statuses.find((s) => s.key === "stun")).toMatchObject({ startTick: 99, endTick: 167 });
    advance(world, 105); expect(world.units[0].statuses.filter((s) => s.kind === "shield")).toHaveLength(1);
    expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(true);
  });
  it("attempts separate actual champion and pet stuns through their own spell shields", () => {
    const world = worldFor(300), pet = spawnPet(world, world.units[1], petSpec(), 300);
    state(world, 1, "spellShield"); finish(world, "W", 300); advance(world, 98);
    expect(world.units[1].statuses.some((s) => s.key === "stun")).toBe(false);
    expect(pet.statuses?.some((s) => s.key === "stun")).toBe(true);
    expect(world.units[0].statuses.some((s) => s.kind === "shield")).toBe(true);
  });
  it("allows untargetable entry and refuses resurrection entry", () => {
    const world = worldFor(600); finish(world, "W", 600); advance(world, 98);
    state(world, 0, "untargetable"); world.units[0].x = 300; advance(world, 99);
    expect(world.units[0].statuses.some((s) => s.kind === "shield")).toBe(true);
    const other = worldFor(600); finish(other, "W", 600); advance(other, 98);
    beginResurrection(other, other.units[0], { duration: 2 }); other.units[0].x = 300; advance(other, 99);
    expect(other.units[0].statuses.some((s) => s.kind === "shield")).toBe(false);
  });
  it("keeps a declared sphere after death but cannot invent shield or stun entry", () => {
    const world = worldFor(300); finish(world, "W", 300); dealDamage(world, world.units[1], world.units[0], 100000, "true"); step(world, [idle, idle]); expect(world.units[0].alive).toBe(false);
    world.tick = 98; step(world, [idle, idle]);
    expect(world.zones.some((z) => z.ability === "Wzone" && z.kind === "field")).toBe(true);
    expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(true);
    expect(world.units[1].statuses.some((s) => s.key === "stun")).toBe(false);
  });
  it("checks execute after a third-stack proc and caps only sourced minion/monster targets", () => {
    const world = worldFor(2000, { ap: 100 }); world.units[1].hp = 30100;
    contact(world); contact(world); world.units[1].hp = 30100;
    basic(world); // Resonance takes 30100 to 29870, enabling W on this same basic.
    expect(world.units[1].hp).toBeCloseTo(29870 - .06 * (100000 - 29870) - derive(world.units[0]).ad);
    for (const kind of ["minion", "monster", "champion"] as const) {
      const pet = spawnPet(world, world.units[1], petSpec({ targetClass: kind }), 200); pet.hp = 2000;
      phaseAttack(world, pet); world.units[0].attackReadyTick = world.tick;
      expect(2000 - pet.hp).toBeCloseTo(derive(world.units[0]).ad + (kind === "champion" ? 480 : 150));
    }
  });
  it("uses the execute minimum and a strict below-30% threshold", () => {
    const world = worldFor(); world.units[1].spec.base.hp = 500; world.units[1].hp = 149;
    basic(world); expect(world.units[1].hp).toBeCloseTo(149 - 15 - derive(world.units[0]).ad);
    const boundary = worldFor(); boundary.units[1].spec.base.hp = 500; boundary.units[1].hp = 150;
    basic(boundary); expect(boundary.units[1].hp).toBeCloseTo(150 - derive(boundary.units[0]).ad);
  });
});

describe("Phase Dive actual empowered basic", () => {
  it("dashes, resets attack timing, then blinks after a .25-second windup with one stack", () => {
    const world = worldFor(550, { ap: 100, critChance: 1 }); world.units[0].attackReadyTick = 100;
    finish(world, "E", 0); expect(world.units[0].x).toBe(0); expect(canStartAttack(world, world.units[0])).toBe(true);
    startAttack(world, world.units[0]); expect(world.units[0].action).toMatchObject({ kind: "windup", launchTick: 8, uncancellable: true });
    advance(world, 7); expect(world.units[0].x).toBe(0);
    advance(world, 8); expect(world.units[0].x).toBe(425);
    expect(100000 - world.units[1].hp).toBeCloseTo(derive(world.units[0]).ad * derive(world.units[0]).critDamage + 190);
    expect(stacks(world)).toBe(1); expect(world.units[0].cooldownReady.E).toBe(218);
  });
  it("crosses terrain and extends only to the nearest clear endpoint within 550", () => {
    const world = worldFor(1500); world.terrain.push({ id: 99, owner: 1, from: 200, to: 400, endTick: 300 });
    finish(world, "E"); expect(world.units[0].x).toBe(400 + world.units[0].spec.base.pathingRadius);
    const blocked = worldFor(1500); blocked.terrain.push({ id: 99, owner: 1, from: 200, to: 600, endTick: 300 });
    finish(blocked, "E"); expect(blocked.units[0].x).toBe(200 - blocked.units[0].spec.base.pathingRadius);
  });
  it.each(["untargetable", "stasis", "invisible"] as const)("retains empowerment when target becomes %s during windup", (guard) => {
    const world = worldFor(550); finish(world, "E", 0); startAttack(world, world.units[0]); state(world, 1, guard); advance(world, 8);
    expect(world.units[0].memory["ekko:phaseDive"]).toBe(90); expect(world.units[0].x).toBe(0); expect(world.units[1].hp).toBe(100000);
  });
  it("retains empowerment when the target leaves reach, and expires it at three seconds", () => {
    const world = worldFor(550); finish(world, "E", 0); startAttack(world, world.units[0]); world.units[1].x = 1000; advance(world, 8);
    expect(world.units[0].memory["ekko:phaseDive"]).toBe(90); expect(world.units[0].cooldownReady.E).toBe(Infinity);
    advance(world, 90); expect(world.units[0].memory["ekko:phaseDive"]).toBeUndefined(); expect(world.units[0].cooldownReady.E).toBe(300);
  });
  it("retains E when its target reaches zero HP before same-tick death finalization", () => {
    const world = worldFor(550); finish(world, "E", 0); startAttack(world, world.units[0]);
    world.tick = 8; world.units[1].hp = 0; step(world, [idle, idle]);
    expect(world.units[0].memory["ekko:phaseDive"]).toBe(90); expect(world.units[0].x).toBe(0);
  });
  it.each(["dodgeAttacks", "blockAttacks", "parry"] as const)("%s consumes E while denying basic, bonus damage and stacks", (guard) => {
    const world = worldFor(550); finish(world, "E", 0); state(world, 1, guard); phaseAttack(world);
    expect(world.units[0].memory["ekko:phaseDive"]).toBeUndefined(); expect(world.units[1].hp).toBe(100000); expect(stacks(world)).toBe(0);
  });
  it("blind consumes E and spell shield denies only E damage while basic contact stacks", () => {
    const blind = worldFor(550); finish(blind, "E", 0); applyEffect(blind, blind.units[1], blind.units[0], { type: "cc", cc: "blind", duration: 5 }, { scale: 1 }); phaseAttack(blind);
    expect(blind.units[1].hp).toBe(100000); expect(blind.units[0].memory["ekko:phaseDive"]).toBeUndefined(); expect(stacks(blind)).toBe(0);
    const shield = worldFor(550); finish(shield, "E", 0); state(shield, 1, "spellShield"); phaseAttack(shield);
    expect(100000 - shield.units[1].hp).toBeCloseTo(derive(shield.units[0]).ad); expect(stacks(shield)).toBe(1);
  });
  it.each(["root", "ground"] as const)("%s removes bonus range and suppresses the blink without denying melee E damage", (cc) => {
    const world = worldFor(550); finish(world, "E", 0); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc, duration: 5 }, { scale: 1 });
    expect(attackRange(world.units[0], world.units[1])).toBe(world.units[0].spec.attack.range); expect(canStartAttack(world, world.units[0])).toBe(false);
    world.units[1].x = 200; phaseAttack(world); expect(world.units[0].x).toBe(0); expect(100000 - world.units[1].hp).toBeCloseTo(derive(world.units[0]).ad + 150);
  });
  it("uses a real pet's position and own health instead of its distant owner's", () => {
    const world = worldFor(2000), pet = spawnPet(world, world.units[1], petSpec(), 500); finish(world, "E", 0);
    expect(canStartAttackOnPet(world, world.units[0], pet)).toBe(true); phaseAttack(world, pet);
    expect(world.units[0].x).toBe(375); expect(10000 - pet.hp).toBeCloseTo(derive(world.units[0]).ad + 150); expect(stackPet(pet)).toBe(1); expect(world.units[1].hp).toBe(100000);
  });
  it("breaks external stealth at windup start and classifies E as single-target spell damage", () => {
    const world = worldFor(2000), pet = spawnPet(world, world.units[1], petSpec({ fixedDamage: { basic: 1, singleTarget: 5, proc: 2 } }), 500);
    finish(world, "E", 0); state(world, 0, "invisible"); state(world, 0, "camouflage"); startAttack(world, world.units[0], pet);
    expect(hasState(world.units[0], "invisible")).toBe(false); expect(hasState(world.units[0], "camouflage")).toBe(false);
    advance(world, 8); expect(10000 - pet.hp).toBe(6);
  });
  it("reflection can kill Ekko after the enhanced basic has already completed its damage", () => {
    const world = worldFor(550); finish(world, "E", 0); state(world, 1, "reflectAttacks"); world.units[1].statuses.find((s) => s.key === "reflectAttacks")!.value = 100000;
    phaseAttack(world); expect(world.units[0].alive).toBe(false); expect(world.units[0].memory["ekko:phaseDive"]).toBeUndefined();
    expect(100000 - world.units[1].hp).toBeCloseTo(derive(world.units[0]).ad + 150);
  });
});

describe("Chronobreak history, healing and path", () => {
  it("requires four seconds of actual history and cannot invent an opening afterimage", () => {
    const world = worldFor(); expect(canCast(world, world.units[0], ability(world, "R"))).toBe(false);
    advance(world, 118); expect(canCast(world, world.units[0], ability(world, "R"))).toBe(false);
    advance(world, 119); expect(canCast(world, world.units[0], ability(world, "R"))).toBe(true);
  });
  it("heals current health, counts actual damage despite intervening healing, and restores no mana", () => {
    const world = worldFor(2000, { ap: 100 }); rewindReady(world); const self = world.units[0], max = derive(self).maxHp;
    dealDamage(world, world.units[1], self, max * .3, "true"); heal(world, self, max * .1); self.hp -= 500;
    const before = self.hp, mana = self.resource; cast(world, "R");
    expect(hasState(self, "stasis")).toBe(true); expect(self.hp).toBe(before); advance(world, 134); expect(self.hp).toBe(before);
    advance(world, 135); expect(self.hp).toBeCloseTo(Math.min(max, before + 260 * 1.9)); expect(self.resource).toBe(mana - 100);
    expect(hasState(self, "stasis")).toBe(true); advance(world, 149); expect(hasState(self, "stasis")).toBe(true);
    advance(world, 150); expect(hasState(self, "stasis")).toBe(false);
  });
  it("does not count absorbed shield damage or damage older than four seconds", () => {
    const world = worldFor(2000); const self = world.units[0]; self.hp -= 1000;
    dealDamage(world, world.units[1], self, 100, "true"); advance(world, 1);
    applyEffect(world, self, self, { type: "shield", amount: { base: 500 }, duration: 10 }, { scale: 1 }); dealDamage(world, world.units[1], self, 400, "true");
    advance(world, 121); const before = self.hp; finish(world, "R"); expect(self.hp - before).toBeCloseTo(200);
  });
  it("records actual reflected damage for the rewind heal without recursively generating contacts", () => {
    const world = worldFor(2000); rewindReady(world); const self = world.units[0]; self.hp -= 1000;
    state(world, 1, "reflectAttacks"); world.units[1].statuses.find((s) => s.key === "reflectAttacks")!.value = 100;
    const beforeAttack = self.hp; basic(world); const loss = beforeAttack - self.hp;
    expect(loss).toBeGreaterThan(0); expect(self.memory["ekko:loss:120"]).toBeCloseTo(loss); expect(stacks(world)).toBe(1);
    const beforeHeal = self.hp; finish(world, "R");
    expect(self.hp - beforeHeal).toBeCloseTo(200 * (1 + 3 * loss / derive(self).maxHp)); expect(stacks(world)).toBe(1);
  });
  it("clamps the heal multiplier at four and applies grievous wounds through ordinary healing", () => {
    const world = worldFor(2000); rewindReady(world); const self = world.units[0], max = derive(self).maxHp;
    for (let i = 0; i < 3; i++) { dealDamage(world, world.units[1], self, max * .5, "true"); heal(world, self, max * .5); }
    self.hp = 100; applyEffect(world, world.units[1], self, { type: "grievousWounds", duration: 10 }, { scale: 1 });
    finish(world, "R"); expect(self.hp).toBeCloseTo(100 + 800 * .6);
  });
  it("snapshots the four-second endpoint and retraces a nonmonotonic path through a W sphere", () => {
    const world = worldFor(1600); const self = world.units[0];
    while (world.tick < 120) { self.x = world.tick < 30 ? 0 : world.tick < 60 ? 1000 : world.tick < 90 ? 500 : 1500; advance(world, world.tick); }
    self.x = 1500; cast(world, "W", 0); advance(world, 128); // Separate sphere placed on the rewind route below.
    world.zones[0]!.kind = "field"; world.zones[0]!.x = 750; world.zones[0]!.startTick = world.tick; world.zones[0]!.endTick = 200; world.zones[0]!.onHit = [];
    const at = world.tick; cast(world, "R"); expect(self.memory["ekko:rewind:target"]).toBe(0);
    advance(world, at + 15); expect(self.x).toBe(1500);
    advance(world, at + 30); expect(self.x).toBe(0); expect(world.zones[0]!.memory?.detonated).toBe(true); expect(self.statuses.some((s) => s.kind === "shield")).toBe(true);
  });
  it("explodes at the historical endpoint against actual champion and pets with separate guards", () => {
    const world = worldFor(2000, { ap: 100 }); rewindReady(world); world.units[0].x = 1500; world.units[1].x = 100;
    const pet = spawnPet(world, world.units[1], petSpec({ areaTaken: .4 }), 100), shield = spawnPet(world, world.units[1], petSpec(), 100);
    petEffects(world, world.units[1], shield, [{ type: "state", state: "spellShield", duration: 10 }]);
    cast(world, "R"); advance(world, 150);
    expect(world.units[0].x).toBe(0); expect(100000 - world.units[1].hp).toBe(675); expect(10000 - pet.hp).toBeCloseTo(270); expect(shield.hp).toBe(10000);
    expect(stacks(world)).toBe(1); expect(stackPet(pet)).toBe(1);
  });
  it("rejects airborne displacement during stasis and preserves branch-local history and loss", () => {
    const world = worldFor(2000); rewindReady(world); world.units[0].x = 1000; dealDamage(world, world.units[1], world.units[0], 300, "true"); cast(world, "R");
    const branch = cloneWorld(world); branch.units[0].memory["ekko:history:0"] = 888; branch.units[0].memory["ekko:rewind:path:0"] = 777; branch.units[0].memory["ekko:loss:120"] = 1;
    expect(world.units[0].memory["ekko:history:0"]).toBe(0); expect(world.units[0].memory["ekko:rewind:path:0"]).toBe(1000); expect(world.units[0].memory["ekko:loss:120"]).toBe(300);
    applyEffect(world, world.units[1], world.units[0], { type: "displace", direction: "away", distance: 500, duration: 1 }, { scale: 1 });
    advance(world, 150); expect(world.units[0].x).toBe(0); expect(world.units[1].hp).toBe(100000);
  });
});

describe("Ekko normal production behavior", () => {
  it.each(["trade", "hold"] as const)("reserves a genuinely history-ready R in %s", (mode) => {
    const world = worldFor(400); rewindReady(world); const self = world.units[0];
    world.modes[0] = mode; self.hp = derive(self).maxHp * .4;
    for (const key of ["Q", "W", "E"]) self.cooldownReady[key] = world.tick + 1000;
    expect(world.tick).toBe(120);
    expect(self.memory["ekko:history:0"]).toBe(0);
    expect(canCast(world, self, ability(world, "R"))).toBe(true);
    expect(self.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: mode === "trade" ? 1 : 0 });
  });
  it.each(["fight", "kite"] as const)("keeps contextual history-ready R ahead of a ready Q in %s", (mode) => {
    const world = worldFor(400); rewindReady(world); const self = world.units[0];
    world.modes[0] = mode; self.hp = derive(self).maxHp * .4;
    expect(canCast(world, self, ability(world, "Q"))).toBe(true);
    expect(canCast(world, self, ability(world, "R"))).toBe(true);
    const view = perceive(world, 0);
    expect(defaultBehavior(view)).toEqual({ kind: "cast", ability: "Q" });
    expect(self.spec.behavior!(view)).toEqual({ kind: "cast", ability: "R" });
  });
  it("retreats from a completed trade despite a ready E entry into a real armed W sphere and eligible R", () => {
    const world = worldFor(400); finish(world, "W", 500); rewindReady(world);
    const self = world.units[0]; world.modes[0] = "trade"; self.memory.tradeDone = true; self.hp = derive(self).maxHp * .4;
    expect(world.zones[0]).toMatchObject({ kind: "field", x: 500, memory: { detonated: false } });
    expect(world.zones[0]!.startTick).toBeLessThanOrEqual(world.tick);
    expect(world.zones[0]!.endTick).toBeGreaterThan(world.tick);
    expect(canCast(world, self, ability(world, "E"))).toBe(true);
    expect(canCast(world, self, ability(world, "R"))).toBe(true);
    expect(self.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
  });
  it("initializes the common trade clock before stepping into an armed W sphere", () => {
    const world = worldFor(100); finish(world, "W", 500); rewindReady(world); const self = world.units[0]; world.modes[0] = "trade";
    expect(self.memory.tradeStart).toBeUndefined();
    expect(world.zones[0]).toMatchObject({ kind: "field", memory: { detonated: false } });
    expect(self.spec.behavior!(perceive(world, 0))).toEqual({ kind: "cast", ability: "E", aim: { direction: 1, distance: 125 } });
    expect(self.memory.tradeStart).toBe(world.tick);
  });
  it.each(["idle", "flee"] as const)("preserves ordinary %s decisions with R history available", (mode) => {
    const world = worldFor(400); rewindReady(world); const self = world.units[0]; world.modes[0] = mode; self.hp = derive(self).maxHp * .4;
    expect(canCast(world, self, ability(world, "R"))).toBe(true);
    const view = perceive(world, 0);
    expect(self.spec.behavior!(view)).toEqual(defaultBehavior(view));
  });
  it("finishes the complete six-scenario allocated matchup against Heimerdinger's real pets", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const result = simulateMatchup(compiled().spec, kit("Heimerdinger", { upgrade: 2 }).spec, 15000, prices);
    expect(Number.isFinite(result.score)).toBe(true); expect(result.scenarios).toHaveLength(6);
    expect(result.scenarios.every((scenario) => scenario.score === undefined || Number.isFinite(scenario.score))).toBe(true);
    for (const scenario of result.scenarios) for (const outcome of scenario.outcomes) expect(Number.isFinite(outcome.seconds)).toBe(true);
  }, 120000);
  it("uses Q, W, E and history-gated R with its unmodified default behavior", () => {
    const world = createWorld({ fighters: [subject({ ap: 100 }), fighter({ base: { hp: 100000, ad: 15 } })], distance: 200, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 12, maxBranches: 1 } });
    const result = runWorld(world);
    const text = result.timeline.map((event) => event.text).join(" ");
    for (const name of ["Timewinder", "Parallel Convergence", "Phase Dive", "Chronobreak"]) expect(text).toContain(name);
    expect(Number.isFinite(result.damage[0])).toBe(true);
  });
});
