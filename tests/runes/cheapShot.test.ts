import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import type { CCType } from "../../engine/rules/crowdControl";
import { startAttack, startCast } from "../../engine/sim/actions";
import { allocateCastInstance, withCastInstance } from "../../engine/sim/castInstance";
import { abilityHit, applyCC, applyEffect, dealDamage } from "../../engine/sim/combat";
import { createWorld, step } from "../../engine/sim/simulate";
import type { Effect, FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { datasetDir } from "../../pipeline/config";
import { loadRuneCatalog } from "../../pipeline/runes/catalog";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import { equipRuneEffects, validateCombatRuneSelection } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { idle, lasting, ticksOf } from "../sim/helpers";
import { ability, fighter } from "../sim/kits";

const ID = 8126;
const DAMAGE = 835 / 17;
const HIT: Effect = { type: "damage", amount: { base: 100 }, damageType: "true" };
const SPELL = ability({ key: "Q", delivery: { kind: "target", range: 700 }, onHit: [HIT] });
const TARGET = fighter({ id: "target", base: { hp: 12000, armor: 250, mr: 100 } });
let catalog: Awaited<ReturnType<typeof loadRuneCatalog>>;
let rules: Awaited<ReturnType<typeof loadCombatRuneRules>>;
beforeAll(async () => {
  catalog = await loadRuneCatalog(path.join(datasetDir("16.21"), "rune-sources"));
  rules = await loadCombatRuneRules("16.21", catalog);
});

function arena({ self = fighter(), target = TARGET, distance = 150, selection = [ID] }: {
  self?: FighterSpec; target?: FighterSpec; distance?: number; selection?: number[];
} = {}): World {
  const spec = equipRuneEffects(self, selection, catalog, rules).spec;
  const world = createWorld({ fighters: [spec, target], distance, modes: ["idle", "idle"], settings: { maxSeconds: 30, log: true } });
  world.units[1].x = world.units[0].x + distance;
  return world;
}

const activations = (world: World) => ticksOf(world.log, 0, "Cheap Shot triggers");
const hit = (world: World) => abilityHit(world, world.units[0], world.units[1], SPELL, [HIT]);
const control = (world: World, cc: CCType, strength = 0.25) => applyCC(world, world.units[0], world.units[1], cc, 10, strength);
const basic = (world: World) => dealDamage(world, world.units[0], world.units[1], 100, "true", { attack: true });

function reach(world: World, tick: number): void {
  while (world.tick < tick && !world.result) step(world, [idle, idle]);
  expect(world.tick).toBe(tick);
}

function separateCast(world: World, effects: () => void): void {
  const self = world.units[0];
  withCastInstance(world, self, allocateCastInstance(world, self)!, effects);
}

describe("Cheap Shot through native damage and crowd control", () => {
  it("delivers level-20 true damage and rearms exactly four seconds after activation", () => {
    const world = arena(), [self, target] = world.units;
    self.hp = 1500;
    self.statuses.push(lasting("stat", "lifeSteal", 0.5));
    expect(control(world, "stun")).toBe(true);
    reach(world, 1);
    expect(basic(world)).toBe(100);
    expect(self.hp).toBe(1550);
    expect(target.hp).toBeCloseTo(11900 - DAMAGE, 10);
    expect(ticksOf(world.log, 0, "Cheap Shot deals 49 true damage")).toEqual([1]);
    reach(world, 120);
    hit(world);
    expect(activations(world)).toEqual([1]);
    const clone = cloneWorld(world);
    reach(world, 121);
    hit(world);
    expect(activations(world)).toEqual([1, 121]);
    expect(activations(clone)).toEqual([1]);
  });

  it.each(["airborne", "berserk", "blind", "charm", "disarm", "fear", "ground", "nearsight", "polymorph", "root",
    "silence", "sleep", "slow", "stun", "suppression", "suspension", "taunt", "drowsy"] as const)("accepts active %s", cc => {
    const world = arena();
    expect(control(world, cc)).toBe(true);
    reach(world, 1);
    hit(world);
    expect(activations(world)).toEqual([1]);
  });

  it.each([["cripple", 0.3], ["kinematics", 0.3], ["slow", 0], ["drowsy", 0]] as const)("keeps the rune ready through %s of strength %s", (cc, strength) => {
    const world = arena();
    expect(control(world, cc, strength)).toBe(true);
    reach(world, 1);
    hit(world);
    expect(activations(world)).toEqual([]);
  });

  it("starts with the target's effective slow after immunity and expiry", () => {
    const world = arena(), [self, target] = world.units;
    expect(applyCC(world, self, target, "slow", 0.2, 0.25)).toBe(true);
    target.statuses.push(lasting("state", "slowImmune"));
    reach(world, 1);
    hit(world);
    expect(activations(world)).toEqual([]);
    target.statuses = target.statuses.filter(status => status.key !== "slowImmune");
    reach(world, 6);
    hit(world);
    expect(activations(world)).toEqual([]);
    expect(control(world, "ground")).toBe(true);
    reach(world, 7);
    hit(world);
    expect(activations(world)).toEqual([7]);
  });

  it("accepts later damage from the same ability after its fresh same-tick impairment", () => {
    const delayed = ability({ ...SPELL, onHit: [
      { type: "cc", cc: "slow", strength: 0.3, duration: 2 }, HIT,
      { type: "delayed", delay: 0.2, effects: [HIT] },
    ] });
    const world = arena({ self: fighter({ abilities: [delayed] }) });
    startCast(world, world.units[0], delayed);
    reach(world, 1);
    expect(activations(world)).toEqual([]);
    reach(world, 7);
    expect(activations(world)).toEqual([6]);
  });

  it("accepts a control effect from a separate spell in the same tick", () => {
    const world = arena();
    separateCast(world, () => { expect(control(world, "stun")).toBe(true); });
    separateCast(world, () => hit(world));
    expect(activations(world)).toEqual([0]);
  });

  it("groups same-tick basic damage across distinct native contact IDs", () => {
    const world = arena();
    separateCast(world, () => {
      expect(control(world, "slow")).toBe(true);
      basic(world);
    });
    separateCast(world, () => { basic(world); });
    expect(activations(world)).toEqual([]);
    separateCast(world, () => hit(world));
    expect(activations(world)).toEqual([0]);
  });

  it("uses any earlier active impairment when the damaging cast applies fresh control", () => {
    const world = arena();
    expect(control(world, "silence")).toBe(true);
    reach(world, 1);
    separateCast(world, () => {
      expect(control(world, "slow")).toBe(true);
      hit(world);
    });
    expect(activations(world)).toEqual([1]);
  });

  it("captures control before the target's native damage callbacks", () => {
    const world = arena({ target: { ...TARGET, hooks: {
      beforeDamageTaken(ctx) {
        applyCC(ctx.world, ctx.enemy, ctx.self, "slow", 2, 0.25);
      },
    } } });
    hit(world);
    expect(activations(world)).toEqual([]);
    reach(world, 1);
    hit(world);
    expect(activations(world)).toEqual([1]);
  });

  it("accepts an existing spell's periodic damage once a different impairment takes hold", () => {
    const dot = ability({ ...SPELL, onHit: [{ type: "dot", damageType: "true", total: { base: 200 }, interval: 0.5, duration: 1 }] });
    const world = arena({ self: fighter({ abilities: [dot] }) });
    startCast(world, world.units[0], dot);
    reach(world, 16);
    expect(activations(world)).toEqual([]);
    expect(control(world, "disarm")).toBe(true);
    reach(world, 31);
    expect(activations(world)).toEqual([30]);
  });

  it("keeps proc, unclassified and protected packets ineligible", () => {
    const world = arena(), [self, target] = world.units;
    expect(control(world, "ground")).toBe(true);
    reach(world, 1);
    applyEffect(world, self, target, HIT, { scale: 1, attack: true });
    dealDamage(world, self, target, 100, "true");
    for (const protection of ["spellShield", "invulnerable", "parry", "stasis"] as const) {
      target.statuses.push(lasting("state", protection));
      hit(world);
      target.statuses = target.statuses.filter(status => status.key !== protection);
    }
    expect(activations(world)).toEqual([]);
    target.statuses.push(lasting("shield", "ordinary shield", 200));
    const hp = target.hp;
    hit(world);
    expect(activations(world)).toEqual([1]);
    expect(target.hp).toBe(hp);
    expect(target.totals.absorbed).toBeCloseTo(100 + DAMAGE, 10);
  });

  it("keeps Scorch's delayed proc separate on a legal two-rune page", () => {
    const world = arena({ selection: [ID, 8237] });
    hit(world);
    reach(world, 5);
    expect(control(world, "root")).toBe(true);
    reach(world, 31);
    expect(ticksOf(world.log, 0, "Scorch deals")).toEqual([30]);
    expect(activations(world)).toEqual([]);
    hit(world);
    expect(activations(world)).toEqual([31]);
    expect(() => validateCombatRuneSelection(catalog, [ID, 8139])).toThrow(/same path row/);
  });

  it("keeps Smolder's native Q burn ineligible when the target becomes impaired", () => {
    const world = arena({ self: kit("Smolder").spec }), [self] = world.units;
    startCast(world, self, self.spec.abilities.find(spell => spell.key === "Q")!);
    reach(world, 30);
    expect(ticksOf(world.log, 0, "Super Scorcher Breath deals ")).toHaveLength(1);
    expect(control(world, "root")).toBe(true);
    reach(world, 100);
    expect(ticksOf(world.log, 0, "Super Scorcher Breath (burn #").length).toBeGreaterThan(0);
    expect(activations(world)).toEqual([]);
  });

  it("keeps full true damage when Royal Maelstrom triggers the rune", () => {
    const world = arena({ self: kit("Belveth").spec }), [self] = world.units;
    expect(control(world, "ground")).toBe(true);
    reach(world, 1);
    startCast(world, self, self.spec.abilities.find(spell => spell.key === "E")!);
    reach(world, 8);
    expect(ticksOf(world.log, 0, "Cheap Shot deals 49 true damage")).toEqual(ticksOf(world.log, 0, "Royal Maelstrom deals ").slice(0, 1));
    expect(activations(world)).toHaveLength(1);
  });

  it("uses every other widely spaced Frost Shot in Ashe's native attack path", () => {
    const world = arena({ self: kit("Ashe").spec, distance: 350 });
    for (const start of [0, 150, 300, 450]) {
      reach(world, start);
      expect(world.units[1].statuses.some(status => status.key === "slow")).toBe(false);
      startAttack(world, world.units[0]);
      reach(world, start + 40);
    }
    const attacks = ticksOf(world.log, 0, "attack deals ");
    expect(attacks).toHaveLength(4);
    expect(activations(world)).toEqual([attacks[1], attacks[3]]);
  });

  it("requires an accepted Frost Shot slow to set up Ashe's next attack", () => {
    const world = arena({ self: kit("Ashe").spec, distance: 350 }), [self, target] = world.units;
    target.statuses.push(lasting("state", "slowImmune"));
    startAttack(world, self);
    reach(world, 150);
    target.statuses = target.statuses.filter(status => status.key !== "slowImmune");
    startAttack(world, self);
    reach(world, 300);
    expect(activations(world)).toEqual([]);
    startAttack(world, self);
    reach(world, 340);
    const attacks = ticksOf(world.log, 0, "attack deals ");
    expect(attacks).toHaveLength(3);
    expect(activations(world)).toEqual([attacks[2]]);
  });

  it("observes current Lux E's impact before its own slow takes hold", () => {
    const world = arena({ self: kit("Lux").spec, distance: 350 }), [self] = world.units;
    startCast(world, self, self.spec.abilities.find(spell => spell.key === "E")!);
    reach(world, 60);
    expect(ticksOf(world.log, 0, "Lucent Singularity deals ")).toHaveLength(1);
    expect(activations(world)).toEqual([]);
  });
});
