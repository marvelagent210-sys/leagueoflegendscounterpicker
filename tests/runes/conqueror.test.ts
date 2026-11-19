import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { allocateCastInstance, withCastInstance } from "../../engine/sim/castInstance";
import { abilityHit, applyEffect, attackHit } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { setForm } from "../../engine/sim/forms";
import { petCombatHit } from "../../engine/sim/petCombat";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { Effect, FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, DEFAULT_ENVIRONMENT, type World } from "../../engine/sim/state";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import type { RuneCatalog } from "../../runes/catalog";
import { equipRuneEffects } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { idle, lasting } from "../sim/helpers";
import { ability, fighter, RANGED } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules = await loadCombatRuneRules("16.21", catalog);
const packet: Effect = { type: "damage", damageType: "magic", amount: { base: 40 } };
const stackStatus = (world: World) => world.units[0].statuses.find(s => s.memoKey === "rune-effects:conqueror:8010");
const held = (world: World) => stackStatus(world)?.charges ?? 0;

function arena(source = fighter()): World {
  const equipped = equipRuneEffects({ adaptiveType: "Physical", ...source }, [8010], catalog, rules);
  const world = createWorld({
    fighters: [equipped.spec, fighter({ base: { hp: 20000, armor: 0, mr: 0, hpRegen: 0 } })],
    distance: 0, modes: ["idle", "idle"], settings: { maxSeconds: 60, environment: { ...DEFAULT_ENVIRONMENT, laneSetup: false } },
  });
  world.units[0].x = 0;
  world.units[1].x = 100;
  return world;
}

function contact(world: World, count = 1, blinded = false): void {
  for (let i = 0; i < count; i++) attackHit(world, world.units[0], world.units[1], blinded, []);
}

function fire(world: World): void {
  const source = world.units[0];
  startAttack(world, source);
  const action = source.action;
  if (action?.kind !== "windup") throw new Error("Expected an actual attack");
  world.tick = action.launchTick;
  launchAttack(world, source, action);
}

function run(world: World, count: number): void {
  for (let i = 0; i < count; i++) step(world, [idle, idle]);
}

function cast(world: World, key: string): void {
  const spell = world.units[0].spec.abilities.find(ability => ability.key === key);
  if (!spell) throw new Error(`Missing spell ${key}`);
  startCast(world, world.units[0], spell);
}

describe("Conqueror attack and stat rules", () => {
  it.each([false, true])("counts each basic application once, ranged=%s", ranged => {
    const world = arena(fighter({ ...(ranged ? { attack: RANGED } : {}) }));
    contact(world);
    const stacks = ranged ? 1 : 2;
    expect(held(world)).toBe(stacks);
    expect(stackStatus(world)?.endTick).toBe(150);
    expect(derive(world.units[0]).bonusAd).toBeCloseTo(stacks * 1086 / 425, 10);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it("accepts blocks and excludes blinds, dodge, protection and parry", () => {
    const world = arena(), target = world.units[1];
    contact(world, 1, true);
    for (const defense of ["dodgeAttacks", "invulnerable", "parry"] as const) {
      target.statuses = [lasting("state", defense)];
      contact(world);
    }
    expect(held(world)).toBe(0);
    target.statuses = [lasting("state", "blockAttacks")];
    contact(world);
    expect(held(world)).toBe(2);
    expect(target.totals.damageTaken).toBe(0);
  });

  it("counts documented repeated on-hit applications without counting their damage components", () => {
    const world = arena();
    attackHit(world, world.units[0], world.units[1], false, [packet], { physical: 0.5, magic: 0.5 },
      false, { onHitApplications: 3 });
    expect(held(world)).toBe(6);
  });

  it("updates held adaptive force across forms without including temporary AD in the choice", () => {
    const first: FighterSpec = { ...fighter(), adaptiveType: "Physical", form: "melee" };
    const second: FighterSpec = { ...first, adaptiveType: "Magic", attack: RANGED, form: "ranged" };
    first.forms = second.forms = { melee: first, ranged: second };
    const world = arena(first);
    contact(world, 2);
    const owner = world.units[0];
    const expiry = stackStatus(world)?.endTick;
    applyEffect(world, owner, owner, { type: "stat", stat: "AD", amount: { base: 60 }, duration: 10 }, { scale: 1 });
    const copy = cloneWorld(world);
    setForm(copy, copy.units[0], "ranged");
    expect(stackStatus(copy)).toMatchObject({ charges: 4, key: "AP", endTick: expiry });
    expect(derive(copy.units[0]).ap).toBeCloseTo(4 * 362 / 85, 10);
    expect(stackStatus(world)?.key).toBe("AD");
  });

  it.each([false, true])("heals at full stacks from later shielded packets, ranged=%s", ranged => {
    const world = arena(fighter({ ...(ranged ? { attack: RANGED } : {}) }));
    const [source, target] = world.units;
    source.hp = 100;
    contact(world, ranged ? 12 : 6);
    expect(held(world)).toBe(12);
    expect(source.totals.healing).toBe(0);
    applyEffect(world, target, target, { type: "shield", amount: { base: 1000 }, duration: 5 }, { scale: 1 });
    applyEffect(world, target, source, { type: "grievousWounds", duration: 5 }, { scale: 1 });
    contact(world);
    expect(target.totals.absorbed).toBeGreaterThan(0);
    expect(source.totals.healing).toBeCloseTo(target.totals.absorbed * (ranged ? 0.05 : 0.08) * 0.6, 9);
  });
});

describe("Conqueror cast identity", () => {
  it("refreshes eligible repeats, rearms at four seconds and expires at five", () => {
    const world = arena();
    const [source, target] = world.units;
    const instance = allocateCastInstance(world, source)!;
    const pulse = ability({ key: "Q", delivery: { kind: "self" }, flags: { spellShield: false } });
    const emit = () => withCastInstance(world, source, instance, () => abilityHit(world, source, target, pulse, [packet]));
    emit();
    expect(held(world)).toBe(2);
    world.tick = 119;
    emit();
    expect(held(world)).toBe(2);
    expect(stackStatus(world)?.endTick).toBe(269);
    world.tick = 120;
    emit();
    expect(held(world)).toBe(4);
    world.tick = 270;
    step(world, [idle, idle]);
    expect(held(world)).toBe(0);
  });

  it("keeps two overlapping casts of the same ability separate through copied missile flight", () => {
    const q = ability({ key: "Q", cooldown: 0, delivery: { kind: "target", range: 700, missileSpeed: 200 }, onHit: [packet] });
    const world = arena(fighter({ abilities: [q] }));
    world.units[1].x = 300;
    cast(world, "Q");
    world.tick++;
    cast(world, "Q");
    const ids = world.missiles.map(missile => missile.castInstance);
    expect(ids).toEqual([1, 2]);
    const branch = cloneWorld(world);
    run(branch, 60);
    expect(held(branch)).toBe(4);
    expect(held(world)).toBe(0);
    expect(world.missiles.map(missile => missile.castInstance)).toEqual(ids);
  });

  it("carries one windup through direct, delayed and periodic packets", () => {
    const q = ability({ key: "Q", castTime: 0.2, delivery: { kind: "target", range: 700 }, onHit: [
      packet, packet, { type: "delayed", delay: 0.8, effects: [packet] },
      { type: "dot", damageType: "magic", duration: 1.5, interval: 0.3, total: { base: 100 } },
    ] });
    const world = arena(fighter({ abilities: [q] }));
    cast(world, "Q");
    expect(world.units[0].action?.castInstance).toBe(1);
    run(world, 10);
    expect(held(world)).toBe(2);
    expect(world.scheduled[0]?.castInstance).toBe(1);
    expect(world.units[1].statuses.find(s => s.dot)?.dot?.castInstance).toBe(1);
    run(world, 50);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(220, 8);
    expect(held(world)).toBe(2);
  });

  it("skips cast tracking for an unequipped world", () => {
    const q = ability({ key: "Q", delivery: { kind: "target", range: 700, missileSpeed: 900 }, onHit: [packet] });
    const world = createWorld({ fighters: [fighter({ abilities: [q] }), fighter()], distance: 100, modes: ["idle", "idle"] });
    cast(world, "Q");
    expect(world.castInstanceSequence).toBeUndefined();
    expect(world.missiles[0]?.castInstance).toBeUndefined();
  });
});

describe("Conqueror kit interactions", () => {
  it.each([["Ezreal", 2], ["Smolder", 1], ["Gangplank", 1]] as const)("uses %s's reviewed basic-ability stack count", (name, amount) => {
    const world = arena(kit(name).spec);
    world.units[1].x = 350;
    cast(world, "Q");
    run(world, 80);
    expect(held(world)).toBe(amount);
  });

  it("qualifies a blocked Lunge as Fiora's basic-damage contact", () => {
    const world = arena(kit("Fiora").spec);
    world.units[1].statuses.push(lasting("state", "blockAttacks"));
    cast(world, "Q");
    run(world, 35);
    expect(held(world)).toBe(2);
  });

  it("gives Warwick one application for each of Infinite Duress's three on-hits", () => {
    const world = arena(kit("Warwick").spec);
    cast(world, "R");
    run(world, 105);
    expect(held(world)).toBe(6);
  });

  it("keeps Kayle's attached fire wave on her ranged basic application", () => {
    const world = arena(kit("Kayle").spec);
    fire(world);
    run(world, 10);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
    expect(held(world)).toBe(1);
  });

  it.each([["Garen", "E"], ["MonkeyKing", "R"]] as const)("counts each qualified %s spin", (name, key) => {
    const world = arena(kit(name).spec);
    cast(world, key);
    run(world, 105);
    expect(held(world)).toBe(12);
  });

  it("treats all of Alpha Strike's marks as one cast despite multiple on-hit applications", () => {
    const world = arena(kit("MasterYi").spec);
    cast(world, "Q");
    run(world, 60);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
    expect(held(world)).toBe(2);
  });

  it("keeps the Obliterate that activates Darkness Rise attached to its first aura tick", () => {
    const world = arena(kit("Mordekaiser").spec);
    contact(world, 2);
    cast(world, "Q");
    run(world, 65);
    expect(world.units[0].memory.darknessCast).toBe(1);
    expect(world.units[0].memory.auraTick).toBeGreaterThan(0);
    expect(held(world)).toBe(6);
  });

  it("gives Ivern exactly one stack from Daisy's sourced on-hit exception", () => {
    const world = arena(kit("Ivern").spec);
    cast(world, "R");
    run(world, 25);
    const pet = world.pets[0];
    if (!pet?.spec.attack) throw new Error("Expected Daisy's native attack");
    const start = held(world);
    petCombatHit(world, pet, world.units[1], pet.spec.attack.effects, true);
    expect(held(world)).toBe(start + 1);
  });

  it("credits a real Heimerdinger turret's separate native casts", () => {
    const world = arena(kit("Heimerdinger").spec);
    cast(world, "Q");
    for (let i = 0; i < 100 && held(world) < 4; i++) run(world, 1);
    expect(world.pets[0]?.spec.conquerorNonBasicAttack).toBe(true);
    expect(held(world)).toBe(4);
    expect(world.castInstanceSequence).toBe(3);
  });

  it("shares a linked pet attack with the originating cast, then tracks a new autonomous attack", () => {
    const spell = ability({ key: "Q", delivery: { kind: "target", range: 500 }, onHit: [packet] });
    const world = arena(fighter({ abilities: [spell] }));
    const owner = world.units[0];
    cast(world, "Q");
    const pet = spawnPet(world, owner, {
      kind: "reviewed summon", name: "Summon", hp: 100, armor: 0, mr: 0, radius: 15, moveSpeed: 0, duration: 10,
      conquerorNonBasicAttack: true, attack: { range: 150, interval: 1, attackLike: true, effects: [packet, packet] },
    }, 50);
    pet.nextAttackCastInstance = 1;
    for (let i = 0; i < 20 && pet.nextAttackCastInstance !== undefined; i++) run(world, 1);
    expect(pet.nextAttackCastInstance).toBeUndefined();
    expect(held(world)).toBe(2);
    for (let i = 0; i < 45 && held(world) < 4; i++) run(world, 1);
    expect(held(world)).toBe(4);
  });
});
