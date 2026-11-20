import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { abilityHit, applyCC, applyEffect, beginResurrection, dealDamage } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { setForm } from "../../engine/sim/forms";
import { petHit, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { Effect, FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { datasetDir } from "../../pipeline/config";
import { loadRuneCatalog } from "../../pipeline/runes/catalog";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import { equipRuneEffects, validateCombatRuneSelection } from "../../runes/effects";
import { idle, lasting, ticksOf } from "../sim/helpers";
import { ability, fighter } from "../sim/kits";

const ID = 8139;
const HEAL = 728 / 17;
const PACKET: Effect = { type: "damage", amount: { base: 100 }, damageType: "true" };
const enemy = () => fighter({ base: { hp: 12000, armor: 0, mr: 0 } });
let catalog: Awaited<ReturnType<typeof loadRuneCatalog>>;
let rules: Awaited<ReturnType<typeof loadCombatRuneRules>>;
beforeAll(async () => {
  catalog = await loadRuneCatalog(path.join(datasetDir("16.21"), "rune-sources"));
  rules = await loadCombatRuneRules("16.21", catalog);
});

const equip = (spec = fighter(), selection = [ID]) => equipRuneEffects(spec, selection, catalog, rules).spec;
const arena = (self = equip(), health = 0.5, target = enemy()) => createWorld({ fighters: [self, target], distance: 0,
  modes: ["idle", "idle"], hp: [health, 1], settings: { maxSeconds: 30, log: true } });
const triggers = (world: World) => ticksOf(world.log, 0, "Taste of Blood triggers");
const strike = (world: World, amount = 100) => dealDamage(world, world.units[0], world.units[1], amount, "true");
function reach(world: World, tick: number): void {
  while (world.tick < tick && !world.result) step(world, [idle, idle]);
  expect(world.tick).toBe(tick);
}

describe("Taste of Blood through resolved native damage", () => {
  it("uses the exact level-20 heal, current bonus AD and AP on a positive damage packet", () => {
    const world = arena(equip(fighter({ base: { ad: 190 }, bonus: { ad: 80, ap: 120 } }))), [self] = world.units;
    expect(strike(world)).toBe(100);
    expect(triggers(world)).toEqual([0]);
    expect(self.totals.healing).toBeCloseTo(HEAL + 8 + 6, 10);
  });

  it("keeps the cooldown ready through a full-health hit and rearms precisely at 600 ticks", () => {
    const world = arena(equip(), 1), [self, target] = world.units;
    strike(world);
    expect(triggers(world)).toEqual([]);
    dealDamage(world, target, self, 250, "true");
    strike(world);
    expect(triggers(world)).toEqual([0]);
    reach(world, 599);
    const copy = cloneWorld(world);
    strike(world);
    expect(self.totals.healing).toBeCloseTo(HEAL, 10);
    reach(copy, 600);
    strike(copy);
    expect(triggers(copy)).toEqual([0, 600]);
    expect(copy.units[0].totals.healing).toBeCloseTo(2 * HEAL, 10);
    expect(triggers(world)).toEqual([0]);
  });

  it("samples missing health after native life steal from the hit", () => {
    const world = arena(equip(), 0.99), [self, target] = world.units;
    self.statuses.push(lasting("stat", "lifeSteal", 0.25));
    dealDamage(world, self, target, 100, "true", { attack: true });
    expect(self.hp).toBe(derive(self).maxHp);
    expect(triggers(world)).toEqual([]);
    dealDamage(world, target, self, 100, "true");
    strike(world);
    expect(triggers(world)).toEqual([0]);
    expect(self.totals.healing).toBeCloseTo(20 + HEAL, 10);
  });

  it("applies Grievous Wounds and the native maximum-health cap", () => {
    const wounded = arena(), self = wounded.units[0];
    self.statuses.push(lasting("grievousWounds", "test"));
    strike(wounded);
    expect(self.totals.healing).toBeCloseTo(HEAL * 0.6, 10);
    const nearlyFull = arena(equip(), 0.99);
    strike(nearlyFull);
    expect(nearlyFull.units[0].hp).toBe(derive(nearlyFull.units[0]).maxHp);
    expect(nearlyFull.units[0].totals.healing).toBeCloseTo(20, 10);
  });

  it("counts accepted shield absorption as well as direct health loss", () => {
    const world = arena(), target = world.units[1];
    target.statuses.push(lasting("shield", "test shield", 200));
    expect(strike(world)).toBe(0);
    expect(target.totals.absorbed).toBe(100);
    expect(triggers(world)).toEqual([0]);
  });

  it("skips shielded abilities, invulnerable or parried hits, zero damage and enemy packets", () => {
    const world = arena(), [self, target] = world.units;
    const spell = ability({ key: "Q", delivery: { kind: "target", range: 700 } });
    target.statuses = [lasting("state", "spellShield")];
    abilityHit(world, self, target, spell, [PACKET]);
    target.statuses = [lasting("state", "invulnerable")];
    expect(strike(world)).toBe(0);
    target.statuses = [lasting("state", "parry")];
    expect(strike(world)).toBe(0);
    target.statuses = [];
    expect(strike(world, 0)).toBe(0);
    dealDamage(world, target, self, 100, "true");
    expect(triggers(world)).toEqual([]);
    strike(world);
    expect(triggers(world)).toEqual([0]);
  });

  it("uses native owned-pet damage credit against the opposing body and skips pet and clone victims", () => {
    const world = arena(), [self, target] = world.units;
    const spec = { kind: "test", name: "Test pet", hp: 800, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 10 };
    const pet = spawnPet(world, self, spec, self.x);
    const victim = spawnPet(world, target, spec, target.x);
    expect(petHit(world, pet, victim, [PACKET], false)).toBe(true);
    expect(triggers(world)).toEqual([]);
    expect(petHit(world, pet, target, [PACKET], false)).toBe(true);
    expect(triggers(world)).toEqual([0]);
    const clone = arena(equip(), 0.5, { ...enemy(), unitClass: "clone" });
    expect(strike(clone)).toBe(100);
    expect(triggers(clone)).toEqual([]);
  });

  it("observes a lethal packet before the duel is scored", () => {
    const world = arena();
    expect(strike(world, 13000)).toBe(12000);
    expect(triggers(world)).toEqual([0]);
    expect(world.units[0].totals.healing).toBeCloseTo(HEAL, 10);
  });

  it("waits while the owner is in attackable resurrection", () => {
    const world = arena(), [self, target] = world.units;
    expect(beginResurrection(world, self, { duration: 0.5 })).toBe(true);
    dealDamage(world, target, self, 100, "true");
    strike(world);
    expect(triggers(world)).toEqual([]);
    reach(world, 16);
    dealDamage(world, target, self, 150, "true");
    strike(world);
    expect(triggers(world)).toEqual([16]);
  });

  it("shares the deadline across a native form change and reads a subsequent AP buff", () => {
    const main: FighterSpec = { ...fighter({ bonus: { ad: 50 } }), form: "main" };
    const alternate: FighterSpec = { ...fighter(), form: "alternate" };
    main.forms = alternate.forms = { main, alternate };
    const world = arena(equip(main)), self = world.units[0];
    strike(world);
    expect(self.totals.healing).toBeCloseTo(HEAL + 5, 10);
    reach(world, 20);
    setForm(world, self, "alternate");
    applyEffect(world, self, self, { type: "stat", stat: "AP", amount: { base: 200 }, duration: 30 }, { scale: 1 });
    strike(world);
    expect(triggers(world)).toEqual([0]);
    reach(world, 600);
    strike(world);
    expect(triggers(world)).toEqual([0, 600]);
    expect(self.totals.healing).toBeCloseTo(2 * HEAL + 20, 10);
  });

  it("combines with Font of Life on a two-path page with separate activation gates", () => {
    expect(validateCombatRuneSelection(catalog, [8463, ID])).toEqual([ID, 8463]);
    expect(() => validateCombatRuneSelection(catalog, [8005, ID, 8463])).toThrow(/at most two paths/);
    const world = arena(equip(fighter(), [ID, 8463]), 0.99), [self, target] = world.units;
    strike(world);
    expect(self.hp).toBe(derive(self).maxHp);
    expect(applyCC(world, self, target, "root", 0.5)).toBe(true);
    expect(triggers(world)).toEqual([0]);
    expect(ticksOf(world.log, 0, "Font of Life triggers")).toEqual([0]);
    expect(self.totals.healing).toBeCloseTo(20, 10);
  });
});
