import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, applyEffect, attackHit, dealDamage } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { setForm } from "../../engine/sim/forms";
import { petCombatHit } from "../../engine/sim/petCombat";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { createWorld, step } from "../../engine/sim/simulate";
import type { Effect, FighterSpec, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, DEFAULT_ENVIRONMENT, type World } from "../../engine/sim/state";
import { mapForms } from "../../items/equip";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import type { RuneCatalog } from "../../runes/catalog";
import { equipRuneEffects } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { idle, lasting, ticksOf } from "../sim/helpers";
import { ability, fighter, RANGED } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules = await loadCombatRuneRules("16.21", catalog);
const label = "Grasp of the Undying";
const magic: Effect = { type: "damage", damageType: "magic", amount: { base: 40 } };
const summon: PetSpec = { kind: "fixture", name: "Targetable summon", hp: 1000, armor: 0, mr: 0,
  radius: 25, moveSpeed: 0, duration: 30, targetClass: "minion" };

function arena(spec = fighter()): World {
  const equipped = equipRuneEffects(spec, [8437], catalog, rules).spec;
  return createWorld({
    fighters: [equipped, fighter({ base: { hp: 30000, armor: 0, mr: 0, hpRegen: 0 } })],
    distance: 0, modes: ["idle", "idle"],
    settings: { log: true, maxSeconds: 45, environment: { ...DEFAULT_ENVIRONMENT, laneSetup: false } },
  });
}

function through(world: World, tick: number): void {
  while (world.tick < tick && !world.result) step(world, [idle, idle]);
}

function damageActivity(world: World): void {
  dealDamage(world, world.units[0], world.units[1], 0, "physical");
}

function charge(world: World, refreshTick = 30, activity = damageActivity): void {
  activity(world);
  through(world, refreshTick);
  activity(world);
  through(world, 120);
}

function hit(world: World, blinded = false): void {
  attackHit(world, world.units[0], world.units[1], blinded, []);
}

const procTicks = (world: World) => ticksOf(world.log, 0, `${label} deals`);
const awards = (world: World) => world.units[0].statuses.filter(status => status.kind === "stat" && status.ability === label);

describe("Grasp charge and protection", () => {
  it("completes four one-second pulses and needs a damage refresh before the first window closes", () => {
    const world = arena(), stale = arena();
    damageActivity(world);
    damageActivity(stale);
    through(world, 30);
    damageActivity(world);
    through(world, 119);
    hit(world);
    expect(procTicks(world)).toEqual([]);
    through(world, 120);
    hit(world);
    expect(procTicks(world)).toEqual([120]);
    through(stale, 120);
    hit(stale);
    expect(procTicks(stale)).toEqual([]);
  });

  it.each([[90, true], [91, false]])("treats an activity at tick %s as a continuation=%s", (tick, continues) => {
    const world = arena();
    charge(world, tick);
    hit(world);
    expect(procTicks(world)).toEqual(continues ? [120] : []);
  });

  it.each([[269, true], [270, false]])("accepts the primed hit at tick %s=%s", (tick, expected) => {
    const world = arena();
    charge(world);
    through(world, tick);
    hit(world);
    expect(procTicks(world)).toEqual(expected ? [tick] : []);
  });

  it("renews an existing primed window on accepted damage in either direction", () => {
    const world = arena();
    charge(world);
    through(world, 269);
    dealDamage(world, world.units[1], world.units[0], 20, "magic");
    through(world, 400);
    hit(world);
    expect(procTicks(world)).toEqual([400]);
  });

  it("ignores CC without damage", () => {
    const world = arena();
    const slow = () => applyEffect(world, world.units[0], world.units[1], { type: "cc", cc: "slow", duration: 0.25, strength: 0.2 }, { scale: 1 });
    charge(world, 30, slow);
    hit(world);
    expect(procTicks(world)).toEqual([]);
  });

  it.each(["blind", "blockAttacks", "dodgeAttacks", "parry", "invulnerable"] as const)("keeps the charge through %s", defense => {
    const world = arena(), target = world.units[1];
    charge(world);
    if (defense !== "blind") target.statuses.push(lasting("state", defense, 0, { source: 1 }));
    hit(world, defense === "blind");
    expect(awards(world)).toHaveLength(0);
    target.statuses = [];
    hit(world);
    expect(procTicks(world)).toEqual([120]);
  });

  it("keeps a primed charge when a spell shield denies an on-hit ability", () => {
    const world = arena(), [self, target] = world.units;
    charge(world);
    target.statuses.push(lasting("state", "spellShield", 0, { source: 1 }));
    const q = ability({ key: "Q", delivery: { kind: "target", range: 500 }, flags: { appliesOnHit: true } });
    abilityHit(world, self, target, q, [magic]);
    expect(procTicks(world)).toEqual([]);
    hit(world);
    expect(procTicks(world)).toEqual([120]);
  });
});

describe("Grasp damage, healing and maximum health", () => {
  it.each([[false, 70, 26, 5], [true, 28, 10.4, 2]])("uses the exact contact coefficients for ranged=%s", (ranged, damage, healing, health) => {
    const world = arena(fighter(ranged ? { attack: RANGED } : {})), [self, target] = world.units;
    self.hp = 1000;
    charge(world);
    hit(world);
    expect(target.totals.damageTaken).toBeCloseTo(100 + damage, 10);
    expect(self.hp).toBe(1000 + health);
    expect(derive(self).maxHp).toBe(2000 + health);
    expect(self.totals.healing).toBe(0);
    through(world, 132);
    expect(self.totals.healing).toBe(0);
    through(world, 133);
    expect(self.totals.healing).toBeCloseTo(healing, 10);
    expect(self.hp).toBeCloseTo(1000 + health + healing, 10);
  });

  it("awards health on fully absorbed contact and uses the healing modifiers present at delivery", () => {
    const world = arena(), [self, target] = world.units;
    self.hp = 1000;
    charge(world);
    applyEffect(world, target, target, { type: "shield", amount: { base: 500 }, duration: 5 }, { scale: 1 });
    hit(world);
    expect(target.totals.damageTaken).toBe(0);
    expect(self.hp).toBe(1005);
    through(world, 128);
    self.statuses.push(lasting("grievousWounds", "fixture"));
    through(world, 133);
    expect(self.totals.healing).toBeCloseTo(26 * 0.6, 10);
  });

  it("consumes one charge across repeated applications, then samples the higher maximum on the next proc", () => {
    const world = arena(), [self, target] = world.units;
    self.hp = 1000;
    charge(world);
    attackHit(world, self, target, false, [], undefined, false, { onHitApplications: 3 });
    expect(procTicks(world)).toEqual([120]);
    expect(awards(world)).toHaveLength(1);
    through(world, 150);
    damageActivity(world);
    through(world, 240);
    const prior = target.hp;
    hit(world);
    expect(prior - target.hp).toBeCloseTo(100 + 2005 * 0.035, 10);
    expect(procTicks(world)).toEqual([120, 240]);
    expect(derive(self).maxHp).toBe(2010);
  });

  it("copies pending healing with the world and keeps the original form sample after a form switch", () => {
    const melee = { ...fighter(), form: "melee" } as FighterSpec;
    const ranged = { ...fighter({ attack: RANGED, base: { hp: 2400 } }), form: "ranged" } as FighterSpec;
    melee.forms = ranged.forms = { melee, ranged };
    const world = arena(melee);
    world.units[0].hp = 1000;
    charge(world);
    hit(world);
    const copy = cloneWorld(world);
    setForm(copy, copy.units[0], "ranged");
    through(copy, 133);
    expect(copy.units[0].totals.healing).toBeCloseTo(26, 10);
    expect(derive(copy.units[0]).maxHp).toBe(2405);
    expect(world.units[0].totals.healing).toBe(0);
    expect(derive(world.units[0]).maxHp).toBe(2005);
  });

  it("uses direct health awards independently of healing prevention", () => {
    const world = arena(), self = world.units[0];
    self.hp = 1000;
    charge(world);
    self.statuses.push(lasting("state", "noHealing"));
    hit(world);
    through(world, 133);
    expect(self.hp).toBe(1005);
    expect(self.totals.healing).toBe(0);
  });

  it.each([["Ornn", 6.5, 0, 0], ["Pyke", 0, 5 / 14, 0], ["Vladimir", 2, 0, 2 * 0.03333]])("applies %s's actual direct health conversion", (id, health, ad, ap) => {
    const world = arena(mapForms(kit(id).spec, form => ({ ...form, base: { ...form.base, hpRegen: 0 } })));
    const before = derive(world.units[0]);
    charge(world);
    hit(world);
    const after = derive(world.units[0]);
    expect(after.maxHp - before.maxHp).toBeCloseTo(health, 9);
    expect(after.ad - before.ad).toBeCloseTo(ad, 9);
    expect(after.ap - before.ap).toBeCloseTo(ap, 9);
  });

  it("keeps a dismounted Kled at his own cap while Skaarl's combined maximum increases", () => {
    const world = arena(kit("Kled").spec), [self, target] = world.units;
    dealDamage(world, target, self, 100000, "true");
    expect(self.spec.form).toBe("Kled");
    const cap = self.statuses.find(status => status.key === "healthCapAbsolute")!.value;
    charge(world);
    self.hp = cap;
    const combined = derive(self).maxHp;
    hit(world);
    through(world, 133);
    expect(derive(self).maxHp).toBe(combined + 5);
    expect(self.hp).toBe(cap);
  });

  it("keeps K'Sante's All Out healing cap while granting direct health above it", () => {
    const world = arena(kit("KSante").spec), [self, target] = world.units;
    const r = self.spec.abilities.find(spell => spell.key === "R")!;
    abilityHit(world, self, target, r, r.onHit!);
    charge(world);
    const cap = self.statuses.find(status => status.key === "healthCapAbsolute")!.value;
    self.hp = cap;
    hit(world);
    through(world, 133);
    expect(self.hp).toBe(cap + 5);
    expect(self.statuses.find(status => status.key === "healthCapAbsolute")!.value).toBe(cap);
  });

  it("preserves a terminal hit's health award and leaves the delayed heal outside the finished duel", () => {
    const world = arena(), [self, target] = world.units;
    self.hp = 1000;
    charge(world);
    target.hp = 1;
    hit(world);
    expect(derive(self).maxHp).toBe(2005);
    through(world, 150);
    expect(world.result).toBeDefined();
    expect(self.totals.healing).toBe(0);
  });
});

describe("Grasp with native champion and pet contacts", () => {
  it("lets Parrrley use the ranged ratios on an actual melee Gangplank", () => {
    const world = arena(kit("Gangplank").spec), [self, target] = world.units;
    charge(world);
    const maxHp = derive(self).maxHp;
    const q = self.spec.abilities.find(spell => spell.key === "Q")!;
    expect(self.spec.attack.ranged).toBe(false);
    abilityHit(world, self, target, q, q.onHit!);
    expect(awards(world).map(status => status.value)).toEqual([2]);
    expect(ticksOf(world.log, 0, `${label} deals ${Math.round(maxHp * 0.014)} magic`)).toEqual([120]);
  });

  it("uses the full proc on Purge's half-effectiveness application", () => {
    const world = arena(kit("Urgot").spec);
    const damage = derive(world.units[0]).maxHp * 0.014;
    through(world, 150);
    const procs = ticksOf(world.log, 0, `${label} deals ${Math.round(damage)} magic`);
    expect(procs).toHaveLength(1);
    expect(ticksOf(world.log, 0, "Purge deals")).toContain(procs[0]);
    expect(awards(world).map(status => status.value)).toEqual([2]);
  });

  it("consumes on Azir's primary soldier contact at full ranged proc value", () => {
    const world = arena(kit("Azir").spec), [self] = world.units;
    charge(world);
    const w = self.spec.abilities.find(spell => spell.key === "W")!;
    startCast(world, self, w);
    through(world, 145);
    startAttack(world, self);
    const damage = derive(self).maxHp * 0.014;
    through(world, 185);
    expect(ticksOf(world.log, 0, "Sand Soldiers deals")).toHaveLength(1);
    expect(ticksOf(world.log, 0, `${label} deals ${Math.round(damage)} magic`)).toHaveLength(1);
    expect(awards(world).map(status => status.value)).toEqual([2]);
  });

  it("charges from positive damage to a classified summon and waits for a champion to spend it", () => {
    const world = arena(), [self, target] = world.units;
    const pet = spawnPet(world, target, summon, target.x)!;
    charge(world, 30, () => damagePet(world, self, pet, 10, "magic", false));
    attackHit(world, self, petFormulaTarget(pet, self, world.tick), false, []);
    expect(awards(world)).toHaveLength(0);
    hit(world);
    expect(procTicks(world)).toEqual([120]);
  });

  it.each([[false, false, true], [true, false, false], [true, true, true]])("classifies pet combat, clone=%s hostile=%s", (clone, hostile, expected) => {
    const world = arena(), [self, target] = world.units;
    const owner = hostile ? target : self, victim = hostile ? self : target;
    const pet = spawnPet(world, owner, clone ? { ...summon, unitClass: "clone", targetClass: "champion" } : summon, owner.x)!;
    charge(world, 30, () => petCombatHit(world, pet, victim, [magic], false));
    hit(world);
    expect(procTicks(world)).toEqual(expected ? [120] : []);
  });
});
