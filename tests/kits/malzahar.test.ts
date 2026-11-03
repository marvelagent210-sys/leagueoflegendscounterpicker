import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { damagePerSecond, type StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { canCast, startCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, applyCC, applyEffect, attackHit, beginResurrection, canSee, canTarget, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { advancePets, damagePet, petEffects, petHit, spawnPet } from "../../engine/sim/pets";
import { createWorld, fairFight, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import Malzahar from "../../kits/champions/Malzahar";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records } from "./helpers";

const compile = (options: Record<string, number> = {}) => compileKit(championData("Malzahar"), records("Malzahar"), Malzahar, options, pets("Malzahar"));
const malzahar = compile();
const dummy = () => fighter({ base: { hp: 10000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } });
const spell = (world: World, key: string) => world.units[0].spec.abilities.find((ability) => ability.key === key)!;
const infection = (world: World) => world.units[1].statuses.find((status) => status.key === "malzahar:E");
function worldFor(ap = 0, enemy = dummy()): World {
  const world = createWorld({ fighters: [{ ...malzahar.spec, base: { ...malzahar.spec.base, armor: 0, mr: 0, hpRegen: 0, resourceRegen: 0 }, bonus: { ap } }, enemy], distance: 500, modes: ["idle", "idle"], settings: { log: true } });
  world.units[0].x = 0; world.units[1].x = 500;
  return world;
}
function through(world: World, tick: number): void { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
function hit(world: World, key: string, scale = 1): void { const ability = spell(world, key); abilityHit(world, world.units[0], world.units[1], ability, ability.onHit ?? [], scale); }
function cast(world: World, key: string): void { startCast(world, world.units[0], spell(world, key)); }
function defense(world: World, target: 0 | 1, state: "spellShield" | "parry" | "untargetable" | "invisible" | "ccImmune" | "dodgeAttacks" | "blockAttacks", duration = 10): void { applyEffect(world, world.units[target], world.units[target], { type: "state", state, duration }, { scale: 1 }); }
const petSpec = (overrides: Partial<PetSpec> = {}): PetSpec => ({ kind: "minion", name: "Minion", hp: 1000, armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: 100, ...overrides });
function voidlings(world: World) { return world.pets.filter((pet) => pet.spec.kind === "voidling"); }
function spawnVoidlings(world: World, stacks = 0): void { world.units[0].memory.malzStacks = stacks; cast(world, "W"); through(world, 45); }

describe("Malzahar pinned evidence and finite metadata", () => {
  it("reads all five source revisions and the Voidling article", () => {
    expect(new Set(malzahar.evidence.filter((entry) => entry.revid > 0).map((entry) => entry.revid))).toEqual(new Set([4015185, 4091727, 3906985, 4015186, 4083425, 4058496]));
    expect(malzahar.assumptions.join(" ")).toContain("absolute quarter-second phase");
    expect(malzahar.assumptions.join(" ")).toContain("level-18 value");
  });
  it("has four real slots and finite unusable internal packets", () => {
    expect(malzahar.spec.abilities.slice(0, 4).map((ability) => ability.slot)).toEqual(["Q", "W", "E", "R"]);
    for (const ability of malzahar.spec.abilities) {
      expect(Number.isFinite(ability.cooldown)).toBe(true); expect(Number.isFinite(ability.castTime)).toBe(true);
      if (ability.slot === "other") { expect(ability.cooldown).toBe(0); expect(ability.usable!(worldFor().units[0], worldFor())).toBe(false); }
    }
    expect(spell(worldFor(), "Q").delivery).toEqual({ kind: "circle", range: 900, radius: 200, delay: .4 });
    expect(spell(worldFor(), "R").castTime).toBe(.005);
    expect(spell(worldFor(), "R").cooldownAtCastStart).toBe(true);
  });
  it("reads the pinned 280-unit client pool radius and exposes its interpretation", () => { expect(malzahar.assumptions.join(" ")).toContain("280-unit castRadius"); });
});

describe("Void Shift damage, CC and clock priority", () => {
  it.each(["physical", "magic"] as const)("reduces initial %s health damage by ninety percent", (type) => {
    const world = worldFor(); dealDamage(world, world.units[1], world.units[0], 100, type);
    expect(world.units[0].totals.damageTaken).toBeCloseTo(10);
    expect(world.units[0].memory.malzShiftLinger).toBe(8); expect(world.units[0].memory.malzShiftRearm).toBe(360);
  });
  it("true damage bypasses reduction and consumes the passive", () => {
    const world = worldFor(); dealDamage(world, world.units[1], world.units[0], 100, "true");
    expect(world.units[0].totals.damageTaken).toBe(100); expect(world.units[0].memory.malzShiftLinger).toBe(8);
  });
  it("does not extend the linger on another hit, but rearms twelve seconds after the last hit", () => {
    const world = worldFor(); dealDamage(world, world.units[1], world.units[0], 100, "magic");
    through(world, 4); dealDamage(world, world.units[1], world.units[0], 100, "magic");
    expect(world.units[0].memory.malzShiftLinger).toBe(8); expect(world.units[0].memory.malzShiftRearm).toBe(365);
    through(world, 8); dealDamage(world, world.units[1], world.units[0], 100, "magic");
    expect(world.units[0].totals.damageTaken).toBeCloseTo(120); expect(world.units[0].memory.malzShiftRearm).toBe(369);
    through(world, 368); expect(hasState(world.units[0], "ccImmune")).toBe(false);
    through(world, 369); expect(hasState(world.units[0], "ccImmune")).toBe(true);
  });
  it("expires before damage arriving on the exact eighth tick", () => {
    const world = worldFor(); dealDamage(world, world.units[1], world.units[0], 100, "magic");
    world.scheduled.push({ tick: 8, owner: 1, target: 0, effects: [{ type: "damage", damageType: "magic", amount: { base: 100 } }], scale: 1 });
    through(world, 8); expect(world.units[0].totals.damageTaken).toBeCloseTo(110);
  });
  it("a negated damage-free CC attempt consumes available protection", () => {
    const world = worldFor(); expect(applyCC(world, world.units[1], world.units[0], "stun", 2)).toBe(false);
    expect(world.units[0].memory.malzShiftLinger).toBe(8); expect(world.units[0].statuses.some((status) => status.key === "stun")).toBe(false);
  });
  it("later actually applied pure CC postpones rearm", () => {
    const world = worldFor(); dealDamage(world, world.units[1], world.units[0], 1, "true"); through(world, 20);
    applyCC(world, world.units[1], world.units[0], "slow", 1, .5);
    expect(world.units[0].memory.malzShiftRearm).toBe(381);
  });
  it("spell shields take priority over a CC-bearing spell and preserve Void Shift", () => {
    const world = worldFor(); defense(world, 0, "spellShield");
    const ability: AbilitySpec = { key: "test", name: "Test", slot: "Q", cooldown: 1, castTime: 0, delivery: { kind: "target", range: 1000 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 100 } }, { type: "cc", cc: "stun", duration: 1 }] };
    abilityHit(world, world.units[1], world.units[0], ability, ability.onHit!);
    expect(world.units[0].totals.damageTaken).toBe(0); expect(world.units[0].memory.malzShiftLinger).toBeUndefined();
  });
  it("ordinary shields absorb first, while a fully absorbed hit still consumes protection", () => {
    const world = worldFor(); applyEffect(world, world.units[0], world.units[0], { type: "shield", amount: { base: 60 }, duration: 10 }, { scale: 1 });
    dealDamage(world, world.units[1], world.units[0], 100, "magic");
    expect(world.units[0].totals.absorbed).toBe(60); expect(world.units[0].totals.damageTaken).toBeCloseTo(4);
    const full = worldFor(); applyEffect(full, full.units[0], full.units[0], { type: "shield", amount: { base: 150 }, duration: 10 }, { scale: 1 });
    dealDamage(full, full.units[1], full.units[0], 100, "magic"); expect(full.units[0].memory.malzShiftLinger).toBe(8);
    expect(derive(full.units[0]).damageReduction).toEqual([]);
  });
  it("an unconsumed spell shield plus full normal-shield absorption preserves protection", () => {
    const world = worldFor(); defense(world, 0, "spellShield"); applyEffect(world, world.units[0], world.units[0], { type: "shield", amount: { base: 150 }, duration: 10 }, { scale: 1 });
    dealDamage(world, world.units[1], world.units[0], 100, "magic", { attack: true });
    expect(world.units[0].memory.malzShiftLinger).toBeUndefined(); expect(hasState(world.units[0], "spellShield")).toBe(true);
  });
  it("allied CC and minion pet damage do not consume protection", () => {
    const world = worldFor(); expect(applyCC(world, world.units[0], world.units[0], "slow", 1, .2)).toBe(true);
    expect(world.units[0].statuses.some((status) => status.key === "slow")).toBe(true);
    const pet = spawnPet(world, world.units[1], petSpec({ attack: { interval: 1, range: 1000, attackLike: true, effects: [{ type: "damage", damageType: "magic", amount: { base: 100 } }] } }), 100);
    petHit(world, pet, world.units[0], pet.spec.attack!.effects, true);
    expect(world.units[0].totals.damageTaken).toBeCloseTo(10); expect(world.units[0].memory.malzShiftLinger).toBeUndefined();
    expect(world.units[0].memory.malzShiftRearm).toBeUndefined();
    petHit(world, pet, world.units[0], [{ type: "damage", damageType: "true", amount: { base: 100 } }], true);
    expect(world.units[0].totals.damageTaken).toBeCloseTo(110); expect(world.units[0].memory.malzShiftLinger).toBeUndefined();
  });
});

describe("Malefic Visions and Call of the Void", () => {
  it("deals exactly sixteen ordinal pulses and the sourced four-second total", () => {
    const world = worldFor(100); hit(world, "E");
    expect(world.scheduled.map((entry) => entry.tick)).toEqual(Array.from({ length: 16 }, (_, index) => Math.ceil((index + 1) * 7.5)));
    through(world, 120); expect(world.units[1].totals.damageTaken).toBeCloseTo(300); expect(world.scheduled).toHaveLength(0);
    expect(world.log.filter((entry) => entry.text.includes("Malefic Visions deals"))).toHaveLength(16);
  });
  it("Q damage refreshes the existing infection without overlapping clocks or snapshots", () => {
    const world = worldFor(100); hit(world, "E"); through(world, 30);
    world.units[0].spec = { ...world.units[0].spec, bonus: { ap: 200 } }; hit(world, "Q");
    expect(world.units[0].memory["malzE:unit:1:until"]).toBe(151);
    expect(world.scheduled.filter((entry) => entry.ability === "EP").length).toBe(16);
    const first = world.scheduled.find((entry) => entry.ability === "EP")!.effects[0]!;
    if (first.type === "damage") expect(first.amount.base).toBeCloseTo(18.75);
    expect(new Set(world.scheduled.map((entry) => entry.tick)).size).toBe(world.scheduled.length);
  });
  it("a spell-shielded Q removes E, but a parried Q preserves its original expiry", () => {
    const world = worldFor(); hit(world, "E"); defense(world, 1, "spellShield"); hit(world, "Q");
    expect(infection(world)).toBeUndefined(); expect(world.scheduled).toHaveLength(0);
    const parried = worldFor(); hit(parried, "E"); defense(parried, 1, "parry"); hit(parried, "Q");
    expect(infection(parried)).toBeDefined(); expect(parried.units[0].memory["malzE:unit:1:until"]).toBe(120);
  });
  it("Q explodes at its fixed placement after cast plus delay and ignores projectile walls", () => {
    const world = worldFor(); cast(world, "Q"); through(world, 8);
    world.zones.push({ id: 999, owner: 1, kind: "projectileWall", seenTick: 0, x: 250, radius: 0, startTick: 0, endTick: 100 });
    through(world, 19); expect(world.units[1].totals.damageTaken).toBe(0);
    through(world, 20); expect(world.units[1].totals.damageTaken).toBe(210);
    const silence = world.units[1].statuses.find((status) => status.key === "silence")!; expect(silence.endTick - silence.startTick).toBe(60);
  });
  it("Q placement does not follow a target leaving its hitbox", () => {
    const world = worldFor(); cast(world, "Q"); through(world, 8); world.units[1].x = 800; through(world, 20);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it.each(["untargetable", "invisible"] as const)("E pays cost/cooldown and builds a stack through %s during its cast", (state) => {
    const world = worldFor(); const mana = world.units[0].resource; cast(world, "E"); defense(world, 1, state); through(world, 8);
    expect(world.units[0].resource).toBe(mana - 100); expect(world.units[0].cooldownReady.E).toBe(218); expect(world.units[0].memory.malzStacks).toBe(1);
    expect(!!infection(world)).toBe(state === "invisible");
  });
  it("E still completes out of range and applies if untargetability ends before completion", () => {
    const world = worldFor(); cast(world, "E"); defense(world, 1, "untargetable", .1); world.units[1].x = 2000; through(world, 8);
    expect(infection(world)).toBeDefined(); expect(world.units[0].resource).toBeCloseTo(derive(world.units[0]).maxResource - 100);
  });
  it("new E replaces earlier E instead of doubling future ticks", () => {
    const world = worldFor(100); hit(world, "E"); through(world, 15); hit(world, "E");
    expect(world.scheduled).toHaveLength(16); expect(world.scheduled[0]!.tick).toBe(24);
  });
  it("infection continues to tick after its caster dies", () => {
    const world = worldFor(100); hit(world, "E"); world.units[0].alive = false; world.units[0].hp = 0;
    for (let tick = 0; tick <= 120; tick++) { world.tick = tick; world.result = undefined; step(world, [standStill, standStill]); }
    expect(world.units[1].totals.damageTaken).toBeCloseTo(300);
  });
  it("a counted death restores two percent max mana and bounces to the closest pet", () => {
    const world = worldFor(); hit(world, "E"); world.units[0].resource = 100;
    const near = spawnPet(world, world.units[1], petSpec(), 530), far = spawnPet(world, world.units[1], petSpec(), 900);
    dealDamage(world, world.units[0], world.units[1], 10000, "true");
    expect(world.units[0].resource).toBeCloseTo(100 + .02 * derive(world.units[0]).maxResource);
    expect(near.statuses?.some((status) => status.key === "malzahar:E")).toBe(true); expect(far.statuses?.some((status) => status.key === "malzahar:E")).toBe(false);
  });
  it("resurrection removes infection without a death refund", () => {
    const world = worldFor(); hit(world, "E"); world.units[0].resource = 100;
    beginResurrection(world, world.units[1], { duration: 6, ability: "test" });
    expect(infection(world)).toBeUndefined(); expect(world.scheduled).toHaveLength(0); expect(world.units[0].resource).toBe(100);
  });
  it("Sion's first counted death refunds and spreads once while his zombie remains alive", () => {
    const world = worldFor(0, { ...kit("Sion").spec, base: { ...kit("Sion").spec.base, hpRegen: 0 } });
    hit(world, "E"); world.units[0].resource = 100; const pet = spawnPet(world, world.units[1], petSpec(), 530);
    dealDamage(world, world.units[0], world.units[1], 100000, "true");
    expect(world.units[1].fallen).toBe(true); expect(world.units[1].hp).toBeGreaterThan(0);
    expect(world.units[0].resource).toBeCloseTo(100 + .02 * derive(world.units[0]).maxResource);
    expect(pet.statuses?.some((status) => status.key === "malzahar:E")).toBe(true); expect(infection(world)).toBeUndefined();
  });
  it("executes infected minion pets below the pinned level-20 threshold and refunds their actual death", () => {
    const world = worldFor(0, { ...kit("Sion").spec, base: { ...kit("Sion").spec.base, hpRegen: 0 } }); hit(world, "E"); world.units[0].resource = 100;
    const pet = spawnPet(world, world.units[1], petSpec({ hp: 60 }), 530);
    dealDamage(world, world.units[0], world.units[1], 10000, "true");
    const firstRefund = world.units[0].resource;
    for (let tick = 0; tick <= 8; tick++) { world.tick = tick; world.result = undefined; step(world, [standStill, standStill]); }
    expect(world.pets).not.toContain(pet); expect(world.units[0].resource).toBeCloseTo(firstRefund + .02 * derive(world.units[0]).maxResource);
  });
  it("the minion execute never applies to a low-health champion", () => {
    const world = worldFor(); world.units[1].hp = 50; hit(world, "E"); through(world, 8);
    expect(world.units[1].hp).toBeCloseTo(36.25);
  });
  it("Q damage also refreshes a bounced pet infection using that pet's own clock", () => {
    const world = worldFor(); hit(world, "E"); const pet = spawnPet(world, world.units[1], petSpec(), 530);
    dealDamage(world, world.units[0], world.units[1], 10000, "true"); world.tick = 20;
    petEffects(world, world.units[0], pet, spell(world, "Q").onHit!, "area", "Call of the Void");
    expect(world.units[0].memory[`malzE:pet:${pet.id}:until`]).toBe(140);
    expect(world.scheduled.filter((entry) => entry.targetPet === pet.id)).toHaveLength(16);
  });
});

describe("Void Swarm source attack and summon clocks", () => {
  it.each([0, 1, 2])("consumes %s stacks into individually delayed ten-second summons", (stacks) => {
    const world = worldFor(); world.units[0].memory.malzStacks = stacks; cast(world, "W");
    expect(world.units[0].memory.malzStacks).toBe(0); through(world, 14); expect(voidlings(world)).toHaveLength(0);
    through(world, 15); expect(voidlings(world)).toHaveLength(1);
    through(world, 45); expect(voidlings(world)).toHaveLength(1 + stacks);
    expect(voidlings(world).map((pet) => pet.endTick)).toEqual(Array.from({ length: stacks + 1 }, (_, index) => 315 + 15 * index));
    expect(new Set(voidlings(world).map((pet) => pet.memory.castInstance)).size).toBe(1);
  });
  it("keeps summon schedules and pet memory independent when a world forks", () => {
    const world = worldFor(); world.units[0].memory.malzStacks = 2; cast(world, "W"); through(world, 15);
    const fork = cloneWorld(world); fork.units[0].memory["malzSpawn:1:1:tick"] = 1000; fork.pets[0]!.memory.castInstance = 55;
    through(world, 45); expect(voidlings(world)).toHaveLength(3); expect(world.pets[0]!.memory.castInstance).not.toBe(55);
  });
  it("retains correct level base, flat rank bonus and independent AP/bonus AD scaling", () => {
    const world = worldFor(); spawnVoidlings(world); const effect = voidlings(world)[0]!.spec.attack!.effects[0]!;
    if (effect.type !== "damage") throw new Error("Voidling damage expected");
    expect(evaluate(effect.amount, world.units[0], world.units[1])).toBeCloseTo(93.8275);
    world.units[0].spec = { ...world.units[0].spec, bonus: { ap: 100, ad: 50 } };
    expect(evaluate(effect.amount, world.units[0], world.units[1])).toBeCloseTo(133.8275);
    expect(voidlings(world)[0]!.spec.hp).toBe(201); expect(voidlings(world)[0]!.spec.armor).toBe(50); expect(voidlings(world)[0]!.spec.mr).toBe(25); expect(voidlings(world)[0]!.spec.attack!.interval).toBeCloseTo(1 / .8911);
  });
  it("champion basic attacks kill a Voidling, while ordinary spell damage uses its magic resistance", () => {
    const world = worldFor(); spawnVoidlings(world); const pet = voidlings(world)[0]!;
    damagePet(world, world.units[1], pet, 100, "magic", false); expect(pet.hp).toBeCloseTo(121);
    damagePet(world, world.units[1], pet, 1, "physical", true); expect(world.pets).not.toContain(pet);
  });
  it.each(["dodgeAttacks", "blockAttacks"] as const)("%s negates a Voidling's ordinary attack damage", (state) => {
    const world = worldFor(); spawnVoidlings(world); defense(world, 1, state); const before = world.units[1].hp;
    petHit(world, voidlings(world)[0]!, world.units[1], voidlings(world)[0]!.spec.attack!.effects, true); expect(world.units[1].hp).toBe(before);
  });
  it("Voidlings still approach and attack the nearest target without E or R priority", () => {
    const world = worldFor(); spawnVoidlings(world); through(world, 90); expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
  });
  it("blindness and disarm affect the pet independently of its owner", () => {
    const world = worldFor(); spawnVoidlings(world); const pet = voidlings(world)[0]!; pet.x = 400;
    applyCC(world, world.units[1], world.units[0], "blind", 10); const before = world.units[1].hp;
    petHit(world, pet, world.units[1], pet.spec.attack!.effects, true); expect(world.units[1].hp).toBeLessThan(before);
    petEffects(world, world.units[1], pet, [{ type: "cc", cc: "blind", duration: 10 }]); const after = world.units[1].hp;
    pet.nextAttackTick = 0; advancePets(world); expect(world.units[1].hp).toBe(after);
    petEffects(world, world.units[1], pet, [{ type: "cc", cc: "disarm", duration: 10 }]); pet.nextAttackTick = 0; advancePets(world); expect(world.units[1].hp).toBe(after);
  });
  it("a Voidling's attack on Defensive Ball Curl reflects onto that Voidling", () => {
    const world = worldFor(0, { ...kit("Rammus").spec, base: { ...kit("Rammus").spec.base, hpRegen: 0 } }); spawnVoidlings(world);
    const curl = world.units[1].spec.abilities.find((ability) => ability.key === "W")!; startCast(world, world.units[1], curl); through(world, 46);
    const pet = voidlings(world)[0]!, beforePet = pet.hp, beforeOwner = world.units[0].hp;
    petHit(world, pet, world.units[1], pet.spec.attack!.effects, true);
    expect(pet.hp).toBeLessThan(beforePet); expect(world.units[0].hp).toBe(beforeOwner);
  });
  it("an infected minion pet takes the sourced triple Voidling damage", () => {
    const world = worldFor(); spawnVoidlings(world); const pet = voidlings(world)[0]!;
    const target = spawnPet(world, world.units[1], petSpec(), 420); target.statuses = [{ kind: "mark", key: "malzahar:E", source: 0, startTick: 0, endTick: 1000, value: 1 }];
    const before = target.hp; petHit(world, pet, target, pet.spec.attack!.effects, true); expect(before - target.hp).toBeCloseTo(3 * 93.8275);
  });
});

describe("Nether Grasp independent channel, tether and Null Zone", () => {
  it("spends one tick casting and starts cooldown immediately at declaration", () => {
    const world = worldFor(); cast(world, "R"); expect(world.units[0].cooldownReady.R).toBe(2400);
    expect(world.units[0].action?.kind).toBe("cast"); through(world, 1); expect(world.units[0].action?.kind).toBe("channel");
    expect(world.scheduled.filter((entry) => entry.ability === "RP").map((entry) => entry.tick)).toEqual(Array.from({ length: 10 }, (_, index) => 1 + Math.ceil((index + 1) * 7.5)));
  });
  it("applies non-tenacity suppression and ten tether/pool pulses on separate clocks", () => {
    const world = worldFor(100); applyEffect(world, world.units[1], world.units[1], { type: "state", state: "tenacity", value: .9, duration: 10 }, { scale: 1 });
    cast(world, "R"); through(world, 1); const cc = world.units[1].statuses.find((status) => status.key === "suppression")!; expect(cc.endTick - cc.startTick).toBe(75);
    through(world, 151); expect(world.log.filter((entry) => entry.text.includes("Nether Grasp deals"))).toHaveLength(10); expect(world.log.filter((entry) => entry.text.includes("Null Zone deals"))).toHaveLength(10);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(355 + 2250);
  });
  it("a spell shield prevents tether and pool while leaving the empty channel", () => {
    const world = worldFor(); defense(world, 1, "spellShield"); cast(world, "R"); through(world, 1);
    expect(world.units[0].action?.kind).toBe("channel"); expect(world.scheduled).toHaveLength(0); expect(world.zones.filter((zone) => zone.ability === "RPOOL")).toHaveLength(0);
  });
  it("cleanse immediately removes target reveal and targeting while channel and caster reveal continue", () => {
    const world = worldFor(); cast(world, "R"); through(world, 1); defense(world, 1, "invisible"); defense(world, 0, "invisible");
    expect(canSee(world.units[1], world.units[0])).toBe(true); expect(canTarget(world.units[1], world.units[0])).toBe(true);
    applyEffect(world, world.units[1], world.units[1], { type: "cleanse", types: ["suppression"] }, { scale: 1 });
    expect(canSee(world.units[1], world.units[0])).toBe(false); expect(canTarget(world.units[1], world.units[0])).toBe(false);
    expect(canSee(world.units[0], world.units[1])).toBe(true); expect(world.units[0].action?.kind).toBe("channel");
    through(world, 2); expect(canSee(world.units[1], world.units[0])).toBe(false);
  });
  it("range break interrupts channel, preserves fixed pool and permits later in-range remaining damage", () => {
    const world = worldFor(); cast(world, "R"); through(world, 10); const initial = world.units[1].totals.damageTaken;
    world.units[1].x = 1300; through(world, 30); expect(world.units[0].action).toBeUndefined(); expect(world.units[1].totals.damageTaken).toBe(initial);
    expect(world.zones.find((zone) => zone.ability === "RPOOL")?.x).toBe(500);
    world.units[1].x = 900; through(world, 76); expect(world.units[1].totals.damageTaken).toBeGreaterThan(initial); expect(world.units[1].statuses.some((status) => status.key === "suppression")).toBe(false);
  });
  it("resurrection retains this specific tether and its remaining scheduled damage", () => {
    const world = worldFor(); cast(world, "R"); through(world, 10); beginResurrection(world, world.units[1], { duration: 6, ability: "test" });
    through(world, 20); expect(world.units[0].action?.kind).toBe("channel"); expect(world.scheduled.filter((entry) => entry.ability === "RP").length).toBeGreaterThan(0);
  });
  it("pool center is fixed at declaration rather than following the target at completion", () => {
    const world = worldFor(); cast(world, "R"); world.units[1].x = 650; through(world, 1); expect(world.zones.find((zone) => zone.ability === "RPOOL")?.x).toBe(500);
  });
  it("new spell shields do not turn later persistent pulses into fresh spell contacts", () => {
    const world = worldFor(); cast(world, "R"); through(world, 2); defense(world, 1, "spellShield"); through(world, 16);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0); expect(hasState(world.units[1], "spellShield")).toBe(true);
  });
  it("CC immunity stops suppression but preserves tether and pool damage", () => {
    const world = worldFor(); defense(world, 1, "ccImmune"); cast(world, "R"); through(world, 16);
    expect(world.units[1].statuses.some((status) => status.key === "suppression")).toBe(false); expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
  });
  it("Null Zone caps each minion packet at 120 while preserving uncapped champion scaling", () => {
    const world = worldFor(1000); const pet = spawnPet(world, world.units[1], petSpec({ hp: 10000 }), 500);
    cast(world, "R"); through(world, 16); expect(pet.hp).toBe(9880); expect(world.units[1].totals.damageTaken).toBeGreaterThan(120);
  });
  it("a voluntary move cannot cancel the first half second of channeling", () => {
    const world = worldFor(); cast(world, "R"); through(world, 1);
    while (world.tick < 16) step(world, [() => ({ kind: "move", direction: -1 }), standStill]);
    expect(world.units[0].action?.kind).toBe("channel");
    step(world, [() => ({ kind: "move", direction: -1 }), standStill]); expect(world.units[0].action).toBeUndefined();
  });
  it("attacking the R target stays disabled throughout the channel", () => {
    const world = worldFor(); cast(world, "R"); through(world, 1);
    while (world.tick <= 30) step(world, [() => ({ kind: "attack" }), standStill]);
    expect(world.units[0].action?.kind).toBe("channel"); expect(world.units[0].attackReadyTick).toBe(0);
    expect(world.units[1].statuses.some((status) => status.key === "suppression")).toBe(true);
  });
  it("a valid pet attack waits for exactly half a second then interrupts only the tether and channel", () => {
    const world = worldFor(), pet = spawnPet(world, world.units[1], petSpec(), 100); cast(world, "R"); through(world, 1);
    while (world.tick < 16) step(world, [() => ({ kind: "attack", pet: pet.id }), standStill]);
    expect(world.units[0].action?.kind).toBe("channel"); expect(world.units[0].attackReadyTick).toBe(0);
    step(world, [() => ({ kind: "attack", pet: pet.id }), standStill]);
    expect(world.units[0].action).toMatchObject({ kind: "windup", startTick: 16, pet: pet.id });
    expect(world.units[1].statuses.some((status) => status.key === "suppression")).toBe(false);
    expect(world.scheduled.filter((entry) => entry.ability === "RP")).toHaveLength(8); expect(world.zones.some((zone) => zone.ability === "RPOOL")).toBe(true);
  });
  it.each(["missing", "out of range", "untargetable"] as const)("an %s pet attack cannot cancel the channel", (invalid) => {
    const world = worldFor(), pet = spawnPet(world, world.units[1], petSpec({ untargetable: invalid === "untargetable" }), invalid === "out of range" ? 2000 : 100);
    cast(world, "R"); through(world, 16); step(world, [() => ({ kind: "attack", pet: invalid === "missing" ? -1 : pet.id }), standStill]);
    expect(world.units[0].action?.kind).toBe("channel"); expect(world.units[0].attackReadyTick).toBe(0);
  });
  it.each(["Q", "W", "E"])("casting %s interrupts even the first half second, preserving independent R packets", (key) => {
    const world = worldFor(); cast(world, "R"); through(world, 1); expect(canCast(world, world.units[0], spell(world, key))).toBe(true);
    step(world, [() => ({ kind: "cast", ability: key }), standStill]);
    expect(world.units[0].action?.kind === "channel").toBe(false); expect(world.units[1].statuses.some((status) => status.key === "suppression")).toBe(false);
    expect(world.scheduled.filter((entry) => entry.ability === "RP")).toHaveLength(10); expect(world.zones.some((zone) => zone.ability === "RPOOL")).toBe(true);
  });
});

describe("Malzahar ordinary policy and stat allocation", () => {
  it.each(["hold", "trade"] as const)("%s never forces R", (mode) => {
    const world = worldFor(); world.modes[0] = mode; hit(world, "E"); for (const key of ["Q", "W", "E"]) world.units[0].cooldownReady[key] = Infinity;
    const command = world.units[0].spec.behavior!(perceive(world, 0)); expect(command?.kind === "cast" && command.ability === "R").toBe(false);
  });
  it("continues the shared completed-trade retreat instead of restarting a combo", () => {
    const world = worldFor(); world.modes[0] = "trade"; world.units[0].memory.tradeDone = true;
    const command = world.units[0].spec.behavior!(perceive(world, 0)); expect(command?.kind).toBe("move");
  });
  it("uses all four real abilities in a normal fight without resource or pet-count divergence", () => {
    const result = fairFight({ fighters: [malzahar.spec, dummy()], distance: 500, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 20 } });
    for (const name of ["Malefic Visions", "Void Swarm", "Call of the Void", "Nether Grasp"]) expect(result.timeline.some((entry) => entry.side === 0 && entry.text.includes(`casts ${name}`))).toBe(true);
    expect(Number.isFinite(result.seconds)).toBe(true); expect(Number.isFinite(result.damage[0])).toBe(true);
  });
  it.each(["fight", "kite", "hold", "trade", "flee"] as const)("%s progresses with bounded resources, infection clocks and pets", (mode) => {
    const world = worldFor(); world.modes[0] = mode; world.settings.maxSeconds = 20;
    while (!world.result) {
      step(world, [world.units[0].spec.behavior!, standStill]);
      for (const unit of world.units) {
        for (const value of [unit.hp, unit.resource, unit.x, unit.attackReadyTick, ...Object.values(unit.cooldownReady)]) expect(Number.isFinite(value)).toBe(true);
        expect(unit.resource).toBeGreaterThanOrEqual(0); expect(unit.resource).toBeLessThanOrEqual(derive(unit).maxResource);
      }
      expect(voidlings(world).length).toBeLessThanOrEqual(6);
      expect(world.scheduled.filter((entry) => entry.ability === "EP").length).toBeLessThanOrEqual(16);
      expect(world.scheduled.filter((entry) => entry.ability === "RP").length).toBeLessThanOrEqual(10);
      for (const pet of voidlings(world)) for (const value of [pet.hp, pet.x, pet.endTick, pet.nextAttackTick]) expect(Number.isFinite(value)).toBe(true);
    }
    const casts = world.log.filter((entry) => entry.side === 0 && entry.text.startsWith("casts "));
    for (const name of mode === "flee" ? ["Call of the Void"] : ["Malefic Visions", "Void Swarm", "Call of the Void"]) expect(casts.some((entry) => entry.text.includes(name))).toBe(true);
    if (mode === "fight" || mode === "kite") expect(casts.some((entry) => entry.text.includes("Nether Grasp"))).toBe(true);
    if (mode === "hold" || mode === "trade") expect(casts.some((entry) => entry.text.includes("Nether Grasp"))).toBe(false);
    if (mode === "flee") { expect(world.result!.reason).toBe("escaped"); expect(world.units[0].x).toBeLessThan(0); }
    expect(world.tick).toBeLessThanOrEqual(601);
  });
  it("starts the ordinary trade clock, completes its burst and retreats without beginning another combo", () => {
    const world = worldFor(); world.modes[0] = "trade"; let doneTick: number | undefined;
    while (!world.result) {
      step(world, [world.units[0].spec.behavior!, standStill]);
      if (world.units[0].memory.tradeDone && doneTick === undefined) doneTick = world.tick - 1;
    }
    expect(world.units[0].memory.tradeStart).toBe(0); expect(doneTick).toBeDefined(); expect(doneTick!).toBeLessThanOrEqual(120);
    expect(world.result!.reason).toBe("disengaged"); expect(world.units[0].x).toBeLessThan(0);
    expect(world.log.filter((entry) => entry.side === 0 && entry.tick >= doneTick! && entry.text.startsWith("casts "))).toHaveLength(0);
  });
  it("values AP, bonus AD pet damage and target-max-health/AP-product R damage with sealed sources", () => {
    const world = worldFor(); const initial = world.units[0].spec.budget!.damage!(world.units[0], world.units[1]).magic!;
    world.units[0].spec = { ...world.units[0].spec, bonus: { ap: 100 } }; const ap = world.units[0].spec.budget!.damage!(world.units[0], world.units[1]).magic!; expect(ap).toBeGreaterThan(initial);
    world.units[0].spec = { ...world.units[0].spec, bonus: { ad: 100 } }; const bonusAD = world.units[0].spec.budget!.damage!(world.units[0], world.units[1]).magic!; expect(bonusAD).toBeGreaterThan(initial);
    world.units[0].spec = { ...world.units[0].spec, bonus: { ap: 100, ad: 100 } };
    expect(world.units[0].spec.budget!.damage!(world.units[0], world.units[1]).magic! - ap).toBeCloseTo(bonusAD - initial, 10);
    const hpDifference = 4000, hpDeltas: number[] = [];
    for (const apValue of [0, 100]) {
      world.units[0].spec = { ...world.units[0].spec, bonus: { ap: apValue } };
      world.units[1].spec = { ...world.units[1].spec, bonus: { hp: 0 } }; const baseline = world.units[0].spec.budget!.damage!(world.units[0], world.units[1]).magic!;
      world.units[1].spec = { ...world.units[1].spec, bonus: { hp: hpDifference } };
      hpDeltas.push(world.units[0].spec.budget!.damage!(world.units[0], world.units[1]).magic! - baseline);
    }
    expect(hpDeltas[0]).toBeCloseTo(.20 * hpDifference / 80.005, 10);
    expect(hpDeltas[1]! - hpDeltas[0]!).toBeCloseTo(.025 * hpDifference / 80.005, 10);
    expect(Number.isFinite(damagePerSecond(malzahar.spec, dummy()).magic)).toBe(true);
  });
  it("reflects every full 15,000-gold Darius scenario and both allocated builds", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.21/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const darius = kit("Darius").spec, forward = simulateMatchup(malzahar.spec, darius, 15000, prices), reverse = simulateMatchup(darius, malzahar.spec, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]);
    const reflected = [1, 0, 2, 3, 4, 5];
    for (const [index, scenario] of forward.scenarios.entries()) { const other = reverse.scenarios[reflected[index]!]!; if (scenario.score === undefined) expect(other.score).toBeUndefined(); else expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-12); }
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
  }, 60000);
});
