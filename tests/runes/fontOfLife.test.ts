import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import type { CCType } from "../../engine/rules/crowdControl";
import { abilityHit, applyCC, applyEffect, beginResurrection, dealDamage, immediateDisplace } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { setForm } from "../../engine/sim/forms";
import { petHit, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { datasetDir } from "../../pipeline/config";
import { loadRuneCatalog } from "../../pipeline/runes/catalog";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import { equipRuneEffects, validateCombatRuneSelection } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { idle, lasting, ticksOf } from "../sim/helpers";
import { ability, fighter } from "../sim/kits";

const ID = 8463;
const HEAL = 930 / 17;
const enemy = () => fighter({ base: { hp: 12000, armor: 0, mr: 0 } });
let catalog: Awaited<ReturnType<typeof loadRuneCatalog>>;
let rules: Awaited<ReturnType<typeof loadCombatRuneRules>>;
beforeAll(async () => {
  catalog = await loadRuneCatalog(path.join(datasetDir("16.21"), "rune-sources"));
  rules = await loadCombatRuneRules("16.21", catalog);
});

const equip = (spec = fighter(), selection = [ID]) => equipRuneEffects(spec, selection, catalog, rules).spec;
const arena = (self = equip(), health = 0.5) => createWorld({ fighters: [self, enemy()], distance: 0,
  modes: ["idle", "idle"], hp: [health, 1], settings: { maxSeconds: 30, log: true } });
const triggers = (world: World) => ticksOf(world.log, 0, "Font of Life triggers");
const control = (world: World, type: CCType = "slow", strength = 0.25) => applyCC(world, world.units[0], world.units[1], type, 0.5, strength);
function reach(world: World, tick: number): void {
  while (world.tick < tick && !world.result) step(world, [idle, idle]);
  expect(world.tick).toBe(tick);
}

describe("Font of Life with native control and healing", () => {
  it.each(["slow", "root", "drowsy", "stun"] as const)("heals on an accepted %s without any allies", type => {
    const world = arena();
    expect(control(world, type)).toBe(true);
    expect(triggers(world)).toEqual([0]);
    expect(world.units[0].totals.healing).toBeCloseTo(HEAL, 10);
  });

  it("observes native immediate displacements and uses the current ranged modifier", () => {
    const world = arena(equip(fighter({ attack: { ranged: true, range: 525 } }))), [self, target] = world.units;
    expect(immediateDisplace(world, self, target, 40)).toBe(true);
    expect(triggers(world)).toEqual([0]);
    expect(self.totals.healing).toBeCloseTo(HEAL * 0.7, 10);
  });

  it("shares one cooldown across a native form switch and reads the new form's heal", () => {
    const melee: FighterSpec = { ...fighter(), form: "melee" };
    const ranged: FighterSpec = { ...fighter({ attack: { ranged: true, range: 525 } }), form: "ranged" };
    melee.forms = ranged.forms = { melee, ranged };
    const world = arena(equip(melee)), self = world.units[0];
    control(world);
    expect(self.totals.healing).toBeCloseTo(HEAL, 10);
    reach(world, 20);
    setForm(world, self, "ranged");
    control(world);
    expect(triggers(world)).toEqual([0]);
    reach(world, 600);
    control(world);
    expect(triggers(world)).toEqual([0, 600]);
    expect(self.totals.healing).toBeCloseTo(HEAL + HEAL * 0.7, 10);
  });

  it("uses the normal healing cap and Grievous Wounds", () => {
    const world = arena(equip(), 0.98), self = world.units[0];
    self.statuses.push(lasting("grievousWounds", "test"));
    control(world);
    expect(self.totals.healing).toBeCloseTo(HEAL * 0.6, 10);
    const nearCap = arena(equip(), 0.99);
    control(nearCap);
    expect(nearCap.units[0].hp).toBe(derive(nearCap.units[0]).maxHp);
    expect(nearCap.units[0].totals.healing).toBeCloseTo(20, 10);
  });

  it("starts its cooldown at full health and restores readiness at tick 600", () => {
    const world = arena(equip(), 1), [self, target] = world.units;
    control(world);
    expect(triggers(world)).toEqual([0]);
    expect(self.totals.healing).toBe(0);
    dealDamage(world, target, self, 200, "true");
    reach(world, 599);
    control(world);
    expect(self.totals.healing).toBe(0);
    const copy = cloneWorld(world);
    reach(copy, 600);
    control(copy);
    expect(triggers(copy)).toEqual([0, 600]);
    expect(copy.units[0].totals.healing).toBeCloseTo(HEAL, 10);
    expect(self.totals.healing).toBe(0);
  });

  it("skips denied, zero and negative slows, unrelated control and separate pet actors", () => {
    const world = arena(), [self, target] = world.units;
    const spell = ability({ key: "Q", delivery: { kind: "target", range: 700 } });
    target.statuses = [lasting("state", "spellShield")];
    abilityHit(world, self, target, spell, [{ type: "cc", cc: "slow", strength: 0.2, duration: 0.5 }]);
    target.statuses = [lasting("state", "ccImmune")];
    expect(control(world, "stun")).toBe(false);
    target.statuses = [lasting("state", "slowImmune")];
    expect(control(world)).toBe(false);
    target.statuses = [];
    expect(control(world, "slow", 0)).toBe(true);
    expect(control(world, "slow", -0.25)).toBe(true);
    expect(control(world, "silence")).toBe(true);
    const pet = spawnPet(world, self, { kind: "test", name: "Test pet", hp: 100, armor: 0, mr: 0,
      radius: 20, moveSpeed: 0, duration: 5 }, self.x);
    expect(petHit(world, pet, target, [{ type: "cc", cc: "slow", strength: 0.2, duration: 1 }], false)).toBe(true);
    expect(self.totals.healing).toBe(0);
    expect(triggers(world)).toEqual([]);
    control(world);
    expect(triggers(world)).toEqual([0]);
  });

  it("observes Zoe's first positive drowsiness ramp and drops a cleansed ramp in a copied world", () => {
    const spec = equip(kit("Zoe").spec);
    const bubble = spec.abilities.find(spell => spell.key === "Ebubble")!;
    const world = arena(spec), [self, target] = world.units;
    abilityHit(world, self, target, bubble, bubble.onHit!);
    expect(target.statuses.find(status => status.key === "drowsy")?.value).toBe(0);
    expect(triggers(world)).toEqual([]);
    const cleansed = cloneWorld(world), cleanTarget = cleansed.units[1];
    applyEffect(cleansed, cleanTarget, cleanTarget, { type: "cleanse" }, { scale: 1 });
    reach(world, 3);
    reach(cleansed, 3);
    expect(triggers(world)).toEqual([1]);
    expect(self.totals.healing).toBeCloseTo(HEAL * 0.7, 10);
    expect(triggers(cleansed)).toEqual([]);
  });

  it("waits for Zoe's sleep when slow immunity suppresses the drowsiness ramp", () => {
    const spec = equip(kit("Zoe").spec), world = arena(spec), [self, target] = world.units;
    const bubble = spec.abilities.find(spell => spell.key === "Ebubble")!;
    target.statuses.push(lasting("state", "slowImmune"));
    abilityHit(world, self, target, bubble, bubble.onHit!);
    const sleepAt = target.statuses.find(status => status.key === "drowsy")!.endTick - 1;
    reach(world, sleepAt);
    expect(triggers(world)).toEqual([]);
    reach(world, sleepAt + 1);
    expect(triggers(world)).toEqual([sleepAt]);
  });

  it("retains the normal activation for an accepted root during displacement immunity", () => {
    const world = arena(equip(fighter(), [8439, ID])), [self, target] = world.units;
    target.statuses.push(lasting("state", "displacementImmune"));
    expect(control(world, "root")).toBe(true);
    expect(triggers(world)).toEqual([0]);
    expect(derive(self).armor.bonus).toBe(0);
  });

  it("requires the actual owner to be available to receive its heal", () => {
    const world = arena();
    expect(beginResurrection(world, world.units[0], { duration: 0.5 })).toBe(true);
    control(world, "root");
    expect(triggers(world)).toEqual([]);
    reach(world, 16);
    control(world, "root");
    expect(triggers(world)).toEqual([16]);
  });

  it("keeps Shield Bash in the same row and applies Corki's documented substitution rule", () => {
    expect(() => validateCombatRuneSelection(catalog, [8401, ID])).toThrow(/same path row/);
    expect(validateCombatRuneSelection(catalog, [8439, ID, 8473])).toEqual([8439, ID, 8473]);
    expect(() => equip(kit("Corki").spec)).toThrow(/substitutes Demolish/);
  });
});
