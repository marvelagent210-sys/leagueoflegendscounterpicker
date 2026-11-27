import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, applyEffect, dealDamage } from "../../engine/sim/combat";
import { petHit, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { Effect, FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { datasetDir } from "../../pipeline/config";
import { loadRuneCatalog } from "../../pipeline/runes/catalog";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import { equipRuneEffects } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { idle, lasting, ticksOf } from "../sim/helpers";
import { ability, fighter } from "../sim/kits";

const DAMAGE = 720 / 17;
const HIT: Effect = { type: "damage", amount: { base: 100 }, damageType: "magic" };
const SPELL = ability({ key: "Q", delivery: { kind: "target", range: 700 }, onHit: [HIT] });
const TARGET = fighter({ id: "target", base: { hp: 12000, armor: 0, mr: 0 } });
let catalog: Awaited<ReturnType<typeof loadRuneCatalog>>;
let rules: Awaited<ReturnType<typeof loadCombatRuneRules>>;
beforeAll(async () => {
  catalog = await loadRuneCatalog(path.join(datasetDir("16.21"), "rune-sources"));
  rules = await loadCombatRuneRules("16.21", catalog);
});

function arena(spec: FighterSpec = fighter(), distance = 150, targetHealth = 1, selection = [8237]): World {
  const self = equipRuneEffects(spec, selection, catalog, rules).spec;
  const world = createWorld({ fighters: [self, TARGET], distance, hp: [1, targetHealth],
    modes: ["idle", "idle"], settings: { maxSeconds: 30, log: true } });
  world.units[1].x = world.units[0].x + distance;
  return world;
}

const ignitions = (world: World) => ticksOf(world.log, 0, "Scorch ignites ");
const burns = (world: World) => ticksOf(world.log, 0, "Scorch deals ");
const hit = (world: World) => abilityHit(world, world.units[0], world.units[1], SPELL, [HIT]);

function reach(world: World, tick: number): void {
  while (world.tick < tick && !world.result) step(world, [idle, idle]);
  expect(world.tick).toBe(tick);
}

function expectBurn(world: World, damage: number): number {
  const [ignition] = ignitions(world);
  expect(ignition).toBeDefined();
  const [entry] = world.scheduled.filter(({ effects }) => effects.some(effect => effect.type === "damage" && effect.label === "Scorch"));
  expect(entry).toMatchObject({ owner: 0, target: 1, tick: ignition! + 30, castInstance: expect.any(Number) });
  expect(entry!.effects).toEqual([expect.objectContaining({ type: "damage", label: "Scorch", damageType: "magic",
    amount: { base: damage }, observedDamageKind: "proc", persistent: true, noLifeSteal: true })]);
  return entry!.tick;
}

describe("Scorch in native combat", () => {
  it("delivers one magic burn after 30 ticks and rearms 300 ticks after ignition", () => {
    const world = arena(), target = world.units[1];
    hit(world);
    expect(ignitions(world)).toEqual([0]);
    expectBurn(world, DAMAGE);
    reach(world, 30);
    expect(target.hp).toBe(11900);
    expect(burns(world)).toEqual([]);
    reach(world, 31);
    expect(target.hp).toBeCloseTo(11900 - DAMAGE, 10);
    expect(burns(world)).toEqual([30]);

    reach(world, 299);
    hit(world);
    expect(ignitions(world)).toEqual([0]);
    reach(world, 300);
    hit(world);
    expect(ignitions(world)).toEqual([0, 300]);
    reach(world, 331);
    expect(burns(world)).toEqual([30, 330]);
  });

  it("accepts a positive ability packet absorbed by a shield", () => {
    const world = arena(), target = world.units[1];
    target.statuses.push(lasting("shield", "test shield", 200));
    hit(world);
    expect(target.hp).toBe(12000);
    expect(target.totals.absorbed).toBe(100);
    expect(ignitions(world)).toEqual([0]);
  });

  it("keeps the rune ready through zero, prevented, basic, ordinary proc and unclassified damage", () => {
    const world = arena(), [self, target] = world.units;
    for (const protection of ["spellShield", "invulnerable", "parry"] as const) {
      target.statuses = [lasting("state", protection)];
      hit(world);
    }
    target.statuses = [];
    abilityHit(world, self, target, SPELL, [{ ...HIT, amount: { base: 0 } }]);
    startAttack(world, self);
    reach(world, 30);
    expect(ticksOf(world.log, 0, "attack deals ")).toHaveLength(1);
    applyEffect(world, self, target, HIT, { scale: 1, attack: true });
    dealDamage(world, self, target, 100, "magic");
    expect(ignitions(world)).toEqual([]);
    hit(world);
    expect(ignitions(world)).toEqual([30]);
  });

  it("accepts the first damage tick of a native ability's periodic effect", () => {
    const dot = ability({ key: "Q", delivery: SPELL.delivery, onHit: [
      { type: "dot", damageType: "magic", total: { base: 200 }, interval: 0.5, duration: 1 },
    ] });
    const world = arena(fighter({ abilities: [dot] }));
    startCast(world, world.units[0], dot);
    expect(ignitions(world)).toEqual([]);
    reach(world, 31);
    expect(ignitions(world)).toHaveLength(1);
    const due = expectBurn(world, DAMAGE);
    reach(world, due + 1);
    expect(burns(world)).toEqual([due]);
  });

  it("uses the owned pet's explicit spell classification and requires a champion victim", () => {
    const world = arena(), [self, target] = world.units;
    const petSpec = { kind: "test", name: "Test pet", hp: 800, armor: 0, mr: 0, duration: 10, radius: 20, moveSpeed: 0 };
    const attacker = spawnPet(world, self, petSpec, self.x);
    const victim = spawnPet(world, target, petSpec, target.x);
    const spellPacket = { ...HIT, observedDamageKind: "spell" } as const;
    expect(petHit(world, attacker, victim, [spellPacket], false)).toBe(true);
    expect(petHit(world, attacker, target, [HIT], false)).toBe(true);
    expect(ignitions(world)).toEqual([]);
    expect(petHit(world, attacker, target, [spellPacket], false)).toBe(true);
    expect(ignitions(world)).toEqual([0]);
    expectBurn(world, DAMAGE);
  });

  it("checks current magic resistance and protection when the independent periodic packet lands", () => {
    const world = arena(), target = world.units[1];
    hit(world);
    const blocked = cloneWorld(world);
    blocked.units[1].statuses.push(lasting("state", "stasis"));
    target.statuses.push(lasting("cc", "sleep"), lasting("state", "spellShield"), lasting("stat", "MR", 100));
    reach(world, 31);
    expect(target.hp).toBeCloseTo(11900 - DAMAGE / 2, 10);
    expect(target.statuses.map(status => status.key)).toEqual(expect.arrayContaining(["sleep", "spellShield"]));
    reach(blocked, 31);
    expect(blocked.units[1].hp).toBe(11900);
    expect(burns(blocked)).toEqual([]);
  });

  it("uses 50% effectiveness on Azir's native soldier attack and preserves his ordinary basic attack", () => {
    const azir = kit("Azir").spec;
    const ordinary = arena(azir);
    startAttack(ordinary, ordinary.units[0]);
    reach(ordinary, 30);
    expect(ticksOf(ordinary.log, 0, "attack deals ")).toHaveLength(1);
    expect(ignitions(ordinary)).toEqual([]);

    const world = arena(azir, 500), self = world.units[0];
    startCast(world, self, self.spec.abilities.find(({ key }) => key === "W")!);
    reach(world, 16);
    startAttack(world, self);
    reach(world, 40);
    expect(ticksOf(world.log, 0, "Sand Soldiers deals ")).toHaveLength(1);
    const due = expectBurn(world, DAMAGE * 0.5);
    const before = world.units[1].hp;
    reach(world, due + 1);
    expect(world.units[1].hp).toBeCloseTo(before - DAMAGE * 0.5, 10);
  });

  it.each([[1, 0.12], [0.5, 0.18]])("uses Royal Maelstrom's first slash at %s target health", (targetHealth, scale) => {
    const world = arena(kit("Belveth").spec, 150, targetHealth), self = world.units[0];
    startCast(world, self, self.spec.abilities.find(({ key }) => key === "E")!);
    reach(world, 3);
    expect(ticksOf(world.log, 0, "Royal Maelstrom deals ")).toHaveLength(1);
    const due = expectBurn(world, DAMAGE * scale);
    reach(world, due + 1);
    expect(burns(world)).toEqual([due]);
    expect(ignitions(world)).toHaveLength(1);
  });

  it.each([
    ["Ezreal", "Q", "Mystic Shot"], ["Fiora", "Q", "Lunge"], ["Gangplank", "Q", "Parrrley"],
    ["MissFortune", "Q", "Double Up"], ["Smolder", "Q", "Super Scorcher Breath"], ["Viego", "R", "Heartbreaker"],
    ["Volibear", "W", "Frenzied Maul"], ["Warwick", "Q", "Jaws of the Beast"], ["Warwick", "R", "Infinite Duress"],
  ])("accepts %s %s's explicitly dual-tagged damage", (champion, key, label) => {
    const world = arena(kit(champion).spec), [self] = world.units;
    startCast(world, self, self.spec.abilities.find(spell => spell.key === key)!);
    while (world.tick < 75 && !world.result && ignitions(world).length === 0) step(world, [idle, idle]);
    expect(ignitions(world)).toEqual(ticksOf(world.log, 0, `${label} deals `).slice(0, 1));
    const due = expectBurn(world, DAMAGE);
    reach(world, due + 1);
    expect(burns(world)).toEqual([due]);
  });

  it("accepts Galio's empowered primary attack with its dual classification", () => {
    const world = arena(kit("Galio").spec), [self] = world.units;
    startAttack(world, self);
    reach(world, 20);
    expect(ignitions(world)).toEqual(ticksOf(world.log, 0, "Colossal Smash deals "));
    expectBurn(world, DAMAGE);
  });

  it("preserves Conqueror's native basic-damage stack count on Warwick's bite", () => {
    const world = arena(kit("Warwick").spec, 150, 1, [8010, 8237]), [self] = world.units;
    startCast(world, self, self.spec.abilities.find(spell => spell.key === "Q")!);
    reach(world, 15);
    expectBurn(world, DAMAGE);
    expect(self.statuses.find(status => status.memoKey === "rune-effects:conqueror:8010")?.charges).toBe(2);
  });

  it("accepts Infinite Duress's weaker pulse after invulnerability prevents its first pulse", () => {
    const world = arena(kit("Warwick").spec), [self, target] = world.units;
    startCast(world, self, self.spec.abilities.find(spell => spell.key === "R")!);
    while (world.tick < 35 && Number(self.memory.duressStart ?? -1) < 0) step(world, [idle, idle]);
    expect(target.statuses.some(status => status.key === "suppression")).toBe(true);
    const protectedPulse = lasting("state", "invulnerable");
    target.statuses.push(protectedPulse);
    while (world.tick < 48 && !world.log.some(event => event.text.includes("magic damage ignored"))) step(world, [idle, idle]);
    expect(world.log.some(event => event.text.includes("magic damage ignored"))).toBe(true);
    expect(ignitions(world)).toEqual([]);
    target.statuses = target.statuses.filter(status => status !== protectedPulse);
    while (world.tick < 60 && ignitions(world).length === 0) step(world, [idle, idle]);
    expectBurn(world, DAMAGE);
  });

  it.each([["Yasuo", "Steel Tempest"], ["Yone", "Mortal Steel"], ["Zeri", "Burst Fire"]])(
    "keeps %s Q's primary target ineligible for spell effects", (champion, label) => {
      const world = arena(kit(champion).spec), [self] = world.units;
      startCast(world, self, self.spec.abilities.find(spell => spell.key === "Q")!);
      reach(world, 45);
      expect(ticksOf(world.log, 0, `${label} deals `).length).toBeGreaterThan(0);
      expect(ignitions(world)).toEqual([]);
    },
  );
});
