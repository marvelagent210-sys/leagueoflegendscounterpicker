import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { advanceMissiles, cancelOutOfRange, launchAttack, launchBonusAttack, startAttack } from "../../engine/sim/actions";
import { abilityHit, abilityHitPet, attackHit, dealDamage, notifyActualMovement } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { setForm } from "../../engine/sim/forms";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, ActualMovement, FighterSpec, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, newUnit, type Side, type World } from "../../engine/sim/state";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import type { RuneCatalog } from "../../runes/catalog";
import { equipRuneEffects, runeMatchupSpecs } from "../../runes/effects";
import { buildFleetFootwork } from "../../runes/fleetFootwork";
import { idle, lasting } from "../sim/helpers";
import { ability, fighter, RANGED } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules = await loadCombatRuneRules("16.21", catalog);
const BASE_HEAL = 124257 / 680;
const chargeKey = "rune:fleet-footwork:charges";
const charges = (world: World, side: Side = 0) => world.units[side].memory[chargeKey];
const speed = (world: World, side: Side = 0) => world.units[side].statuses.filter(s =>
  s.kind === "stat" && s.key === "moveSpeedPercent" && s.memoKey === "buff:rune:fleet-footwork:speed");
const petSpec: PetSpec = { kind: "summon", name: "Summon", hp: 2000, armor: 0, mr: 0,
  moveSpeed: 300, radius: 30, duration: Infinity };

function arena(start: number, self = fighter(), enemy = fighter(), enemyStart?: number): World {
  const mine = equipRuneEffects(self, [8021], catalog, rules, { energizedCharges: start });
  const theirs = enemyStart === undefined ? equipRuneEffects(enemy, [], catalog, rules)
    : equipRuneEffects(enemy, [8021], catalog, rules, { energizedCharges: enemyStart });
  return createWorld({ fighters: runeMatchupSpecs(mine, theirs), distance: 50, hp: [0.5, 0.5],
    modes: ["idle", "idle"], settings: { maxSeconds: 30, log: true } });
}

function launch(world: World, side: Side = 0): void {
  const unit = world.units[side];
  startAttack(world, unit);
  const action = unit.action;
  if (action?.kind !== "windup") throw new Error("Expected attack windup");
  world.tick = action.launchTick;
  launchAttack(world, unit, action);
}

function segment(world: World, distance: number, kind: ActualMovement["kind"] = "walk", side: Side = 0): void {
  const unit = world.units[side], from = unit.x;
  unit.x += distance;
  notifyActualMovement(world, unit, from, { kind, ended: kind !== "walk", endTick: world.tick });
}

function resolveMissiles(world: World): void {
  for (let tick = 0; tick < 10 && world.missiles.length; tick++) {
    world.tick++;
    advanceMissiles(world);
  }
  expect(world.missiles).toHaveLength(0);
}

function basic(world: World, side: Side = 0): void {
  attackHit(world, world.units[side], world.units[side === 0 ? 1 : 0], false, []);
}

function spell(flags: AbilitySpec["flags"] = { appliesOnHit: true, fleetFootwork: true }): AbilitySpec {
  return ability({ key: "Q", flags, delivery: { kind: "target", range: 1000 },
    onHit: [{ type: "damage", damageType: "true", amount: { base: 1 } }] });
}
function contact(world: World, effect = spell(), scale = 1): void {
  abilityHit(world, world.units[0], world.units[1], effect, effect.onHit!, scale);
}

describe("Fleet Footwork charge gain and consumption", () => {
  it.each([
    [0, 6, 0], [93.5, 99.5, 0], [94, 0, BASE_HEAL], [99, 0, BASE_HEAL], [100, 0, BASE_HEAL],
  ])("handles a completed melee windup starting at %s charges", (initial, remaining, heal) => {
    const world = arena(initial);
    expect(charges(world)).toBe(initial);
    launch(world);
    expect(charges(world)).toBe(remaining);
    expect(world.units[0].totals.healing).toBeCloseTo(heal, 10);
  });

  it("grants six charges before an immediate kit-owned replacement contact", () => {
    const world = arena(94, fighter({ hooks: {
      onAttackLaunch(ctx) {
        attackHit(ctx.world, ctx.self, ctx.enemy, false, []);
        return false;
      },
    } }));
    launch(world);
    expect(charges(world)).toBe(0);
    expect(world.units[0].totals.healing).toBeCloseTo(BASE_HEAL, 10);
  });

  it("keeps a canceled windup and an independently launched bonus basic distinct", () => {
    const world = arena(94);
    startAttack(world, world.units[0]);
    expect(charges(world)).toBe(94);
    world.units[1].x += 5000;
    cancelOutOfRange(world, world.units[0]);
    expect(world.units[0].action).toBeUndefined();
    launchBonusAttack(world, world.units[0], world.units[1]);
    expect(charges(world)).toBe(94);
    expect(world.units[0].totals.healing).toBe(0);
    segment(world, 144);
    launchBonusAttack(world, world.units[0], world.units[1], { pressTheAttack: false });
    expect(charges(world)).toBe(0);
    expect(world.units[0].totals.healing).toBeCloseTo(BASE_HEAL, 10);
  });

  it.each(["blind", "blockAttacks", "dodgeAttacks", "parry", "stasis", "untargetable"])(
    "banks completed-windup charges through %s until an eligible contact", defense => {
      const world = arena(94), [self, enemy] = world.units;
      if (defense === "blind") self.statuses.push(lasting("cc", "blind"));
      else enemy.statuses.push(lasting("state", defense));
      launch(world);
      expect(charges(world)).toBe(100);
      expect(self.totals.healing).toBe(0);
      self.statuses = []; enemy.statuses = [];
      basic(world);
      expect(charges(world)).toBe(0);
      expect(self.totals.healing).toBeCloseTo(BASE_HEAL, 10);
    });

  it("uses the current charge pool once across two in-flight missiles", () => {
    const world = arena(87, fighter({ attack: RANGED }));
    launch(world);
    launch(world);
    expect(world.missiles).toHaveLength(2);
    expect(charges(world)).toBe(99);
    expect(world.units[0].totals.healing).toBe(0);
    segment(world, 24, "dash");
    expect(charges(world)).toBe(100);
    resolveMissiles(world);
    expect(charges(world)).toBe(0);
    expect(world.units[0].totals.healing).toBeCloseTo(BASE_HEAL * 0.6, 10);
  });

  it("does not reserve charges for an outstanding missile when another contact consumes first", () => {
    const world = arena(100, fighter({ attack: RANGED }));
    launch(world);
    contact(world);
    expect(charges(world)).toBe(0);
    resolveMissiles(world);
    expect(world.units[0].totals.healing).toBeCloseTo(BASE_HEAL * 0.6, 10);
  });

  it("adds one ability gain per accepted application, independent of positive expected share and on-hit damage scaling", () => {
    const world = arena(88);
    const slash = { ...spell(), onHitScale: 0.25 };
    contact(world, slash, 0);
    expect(charges(world)).toBe(88);
    contact(world, slash, 0.2);
    expect(charges(world)).toBe(94);
    contact(world, slash, 0.2);
    expect(charges(world)).toBe(0);
    expect(world.units[0].totals.healing).toBeCloseTo(BASE_HEAL, 10);
  });

  it("requires an eligible resolved ability application even when another rune accepts the hit", () => {
    const world = arena(100);
    contact(world, spell({ appliesOnHit: true, pressTheAttack: true }));
    contact(world, spell({ fleetFootwork: true }));
    dealDamage(world, world.units[0], world.units[1], 1, "true");
    expect(charges(world)).toBe(100);
    expect(world.units[0].totals.healing).toBe(0);
    contact(world, spell({ appliesOnHit: true, pressTheAttack: false, fleetFootwork: true }));
    expect(charges(world)).toBe(0);
  });

  it.each(["blockAttacks", "dodgeAttacks", "parry", "spellShield", "stasis", "untargetable"])(
    "does not apply ability charge gain or consumption through %s", defense => {
      const world = arena(94);
      world.units[1].statuses.push(lasting("state", defense));
      contact(world, spell({ appliesOnHit: true, fleetFootwork: true, block: true, dodge: true }));
      expect(charges(world)).toBe(94);
      expect(world.units[0].totals.healing).toBe(0);
    });

  it("consumes through a damage shield on accepted contact", () => {
    const world = arena(94), victim = world.units[1];
    victim.statuses.push(lasting("shield", "shield", 5000));
    launch(world);
    expect(victim.hp).toBe(1000);
    expect(charges(world)).toBe(0);
    expect(world.units[0].totals.healing).toBeCloseTo(BASE_HEAL, 10);
  });
});

describe("Fleet Footwork movement and body identity", () => {
  it("preserves fractional out-and-back distance in the same tick and caps the pool", () => {
    const world = arena(0.125);
    segment(world, 3); segment(world, -3, "dash");
    expect(charges(world)).toBe(0.375);
    segment(world, 12, "forced"); segment(world, -6, "blink"); segment(world, -6, "attached");
    expect(charges(world)).toBe(1.375);
    segment(world, 0, "dash");
    expect(charges(world)).toBe(1.375);
    segment(world, 10000);
    expect(charges(world)).toBe(100);
  });

  it("reaches full charge at 2400 units independent of segment partitioning", () => {
    const whole = arena(0), parts = arena(0);
    segment(whole, 2400);
    for (let i = 0; i < 300; i++) segment(parts, 8);
    basic(whole); basic(parts);
    expect(whole.units[0].totals.healing).toBeCloseTo(BASE_HEAL, 10);
    expect(parts.units[0].totals.healing).toBe(whole.units[0].totals.healing);
    expect(charges(parts)).toBe(0);
  });

  it("preserves an explicit starting value immediately below the threshold", () => {
    const initial = 100 - 2 ** -46;
    const world = arena(initial);
    basic(world);
    expect(charges(world)).toBe(initial);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it("seeds both sides once even when the first kit's setup moves the other champion", () => {
    const self = fighter({ hooks: { onStart(ctx) { segment(ctx.world, -24, "blink", 1); } } });
    const world = arena(31, self, fighter(), 12);
    expect(charges(world)).toBe(31);
    expect(charges(world, 1)).toBe(13);
    segment(world, 48, "forced"); segment(world, -2, "walk", 1);
    expect(charges(world)).toBe(33);
    expect(charges(world, 1)).toBeCloseTo(13 + 2 / 24, 12);
  });

  it.each(["minion", "clone"] as const)("ignores actual %s movement and contact targets", kind => {
    const world = arena(94);
    const spec: PetSpec = kind === "clone" ? { ...petSpec, targetClass: "champion", unitClass: "clone" }
      : { ...petSpec, targetClass: "minion" };
    const own = spawnPet(world, world.units[0], spec, 50);
    const target = spawnPet(world, world.units[1], spec, 50);
    const view = petFormulaTarget(own, world.units[1], world.tick), from = view.x;
    view.x += 144;
    notifyActualMovement(world, view, from, { kind: "walk", ended: false, endTick: world.tick }, own);
    const eligible = spell({ appliesOnHit: true, fleetFootwork: true, petContactHooks: true });
    abilityHitPet(world, world.units[0], target, eligible, eligible.onHit!);
    expect(charges(world)).toBe(94);
    segment(world, 144);
    launchBonusAttack(world, world.units[0], target);
    expect(charges(world)).toBe(100);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it("cannot grant healing to a detached actor using copied champion hooks", () => {
    const world = arena(100);
    const detached = newUnit(world.units[0].spec, 0, 0, 2000, 0);
    detached.hp = 500;
    attackHit(world, detached, world.units[1], false, []);
    expect(detached.hp).toBe(500);
    expect(charges(world)).toBe(100);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it("copies the charge pool to independently progressing simulation branches", () => {
    const world = arena(93.5), full = cloneWorld(world), partial = cloneWorld(world);
    segment(full, 12);
    launch(full); launch(partial);
    expect(charges(world)).toBe(93.5);
    expect(charges(partial)).toBe(99.5);
    expect(charges(full)).toBe(0);
    expect(full.units[0].totals.healing).toBeCloseTo(BASE_HEAL, 10);
  });

  it("keeps the original charge pool during an ordinary death and does not prolong a finished duel", () => {
    const world = arena(94), [self, enemy] = world.units;
    dealDamage(world, enemy, self, 10000, "true");
    expect(self.hp).toBeLessThanOrEqual(0);
    segment(world, 144);
    contact(world);
    expect(charges(world)).toBe(94);
    expect(self.totals.healing).toBe(0);
    step(world, [idle, idle]);
    expect(self.alive).toBe(false);
    expect(world.result).toMatchObject({ reason: "death", winner: 1, tick: 0 });
    expect(charges(world)).toBe(94);
    expect(world.scheduled).toHaveLength(0);
  });
});

describe("Fleet Footwork ordinary healing, speed, and sampling phase", () => {
  it.each([false, true])("samples current bonus AD, AP and attack type on impact (ranged = %s)", ranged => {
    const self = fighter({ base: { ad: 500 }, attack: { ranged }, bonus: { ad: 20, ap: 80 } });
    const world = arena(100, self);
    world.units[0].statuses.push(lasting("stat", "AD", 40), lasting("stat", "AP", 20));
    basic(world);
    expect(world.units[0].totals.healing).toBeCloseTo((BASE_HEAL + 6 + 5) * (ranged ? 0.6 : 1), 10);
    expect(speed(world)).toHaveLength(1);
    expect(speed(world)[0]!.value).toBeCloseTo(ranged ? 0.15 : 0.2, 12);
    expect(derive(world.units[0]).rawMoveSpeed).toBeCloseTo(350 * (ranged ? 1.15 : 1.2), 10);
  });

  it("keeps the charge pool across a form switch and samples that form and current stats on missile impact", () => {
    const ranged: FighterSpec = { ...fighter({ attack: RANGED }), form: "ranged" };
    const melee: FighterSpec = { ...fighter(), form: "melee" };
    ranged.forms = melee.forms = { ranged, melee };
    const world = arena(94, ranged);
    launch(world);
    expect(charges(world)).toBe(100);
    setForm(world, world.units[0], "melee");
    world.units[0].statuses.push(lasting("stat", "AD", 80));
    resolveMissiles(world);
    expect(world.units[0].totals.healing).toBeCloseTo(BASE_HEAL + 8, 10);
    expect(speed(world)[0]?.value).toBeCloseTo(0.2, 12);
  });

  it("applies healing received and Grievous Wounds, with ordinary healing accounting", () => {
    const world = arena(100), self = world.units[0];
    self.statuses.push(lasting("stat", "healingIncrease", 0.5), lasting("grievousWounds", "grievous"));
    basic(world);
    expect(self.totals.healing).toBeCloseTo(BASE_HEAL * 1.5 * 0.6, 10);
    expect(self.hp).toBeCloseTo(1000 + BASE_HEAL * 1.5 * 0.6, 10);
    expect(speed(world)[0]?.value).toBe(0.2);
  });

  it.each(["full", "noHealing", "healthCap"])("spends charges and grants speed at %s", constraint => {
    const world = arena(100), self = world.units[0];
    if (constraint === "full") self.hp = 2000;
    if (constraint === "noHealing") self.statuses.push(lasting("state", "noHealing"));
    if (constraint === "healthCap") self.statuses.push(lasting("state", "healthCap", 0.51));
    basic(world);
    expect(charges(world)).toBe(0);
    expect(self.totals.healing).toBeCloseTo(constraint === "healthCap" ? 20 : 0, 10);
    expect(speed(world)[0]?.value).toBe(0.2);
  });

  it("refreshes a single speed buff and removes it at the exact one-second expiry", () => {
    const world = arena(100);
    basic(world);
    expect(speed(world)[0]?.endTick).toBe(30);
    world.tick = 10;
    segment(world, 2400); basic(world);
    expect(speed(world)).toHaveLength(1);
    expect(speed(world)[0]?.endTick).toBe(40);
    world.tick = 39; step(world, [idle, idle]);
    expect(speed(world)).toHaveLength(1);
    step(world, [idle, idle]);
    expect(speed(world)).toHaveLength(0);
    expect(derive(world.units[0]).rawMoveSpeed).toBe(350);
    expect(world.scheduled).toHaveLength(0);
  });
});

describe("Fleet Footwork runtime boundaries", () => {
  it("validates history and representable rule values when constructed directly", () => {
    for (const history of [NaN, -0.01, 100.01]) {
      expect(() => buildFleetFootwork(rules, history)).toThrow(/energizedCharges/);
    }
    for (const replacement of [
      { attackCharges: 0.5 }, { attackCharges: 101 }, { unitsPerCharge: Infinity },
      { moveSpeedDuration: Number.MIN_VALUE }, { moveSpeedDuration: Number.MAX_SAFE_INTEGER },
    ]) {
      expect(() => buildFleetFootwork({ fleetFootwork: { ...rules.fleetFootwork, ...replacement } }, 0)).toThrow(/Fleet Footwork/);
    }
  });

  it("copies the direct factory's charge rules before a caller reuses the source", () => {
    const input = { fleetFootwork: { ...rules.fleetFootwork } };
    const effect = buildFleetFootwork(input, 89);
    input.fleetFootwork.attackCharges = 1;
    input.fleetFootwork.unitsPerCharge = 1;
    const spec = fighter({ hooks: { onStart: effect.beforeStart!, ...effect.hooks } });
    const world = createWorld({ fighters: [spec, fighter()], distance: 50, hp: [0.5, 1], modes: ["idle", "idle"] });
    segment(world, 120);
    expect(charges(world)).toBe(94);
    launch(world);
    expect(charges(world)).toBe(0);
    expect(world.units[0].totals.healing).toBeCloseTo(BASE_HEAL, 10);
  });

  it.each([[0, NaN], [-Number.MAX_VALUE, Number.MAX_VALUE], [Infinity, Infinity]])(
    "rejects invalid blink endpoints %s and %s before changing the pool", (from, to) => {
      const world = arena(17), owner = world.units[0];
      owner.x = to;
      expect(() => notifyActualMovement(world, owner, from, { kind: "blink", ended: true, endTick: world.tick }))
        .toThrow(/finite movement segment/);
      expect(charges(world)).toBe(17);
    });

  it("rejects nonfinite sampled healing before consuming charges or granting speed", () => {
    const world = arena(100);
    world.units[0].statuses.push(lasting("stat", "AP", Infinity));
    expect(() => basic(world)).toThrow(/finite current healing stats/);
    expect(charges(world)).toBe(100);
    expect(speed(world)).toHaveLength(0);
  });

  it("clamps a finite negative heal to zero and still grants the speed buff", () => {
    const world = arena(100);
    world.units[0].statuses.push(lasting("stat", "AP", -5000));
    basic(world);
    expect(world.units[0].hp).toBe(1000);
    expect(world.units[0].totals.healing).toBe(0);
    expect(charges(world)).toBe(0);
    expect(speed(world)[0]?.value).toBe(0.2);
  });
});
