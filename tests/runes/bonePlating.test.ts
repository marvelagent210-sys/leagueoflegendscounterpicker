import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { startAttack, startCast } from "../../engine/sim/actions";
import { dealDamage } from "../../engine/sim/combat";
import { setForm } from "../../engine/sim/forms";
import { petHit, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, Effect, FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { datasetDir } from "../../pipeline/config";
import { loadRuneCatalog } from "../../pipeline/runes/catalog";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import { equipRuneEffects } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { idle, lasting, ticksOf } from "../sim/helpers";
import { ability, fighter } from "../sim/kits";

const ID = 8473;
const REDUCTION = 1080 / 17;
const packet = (base = 100, damageType: "physical" | "magic" | "true" = "true"): Effect =>
  ({ type: "damage", amount: { base }, damageType });
const spell = (onHit: Effect[], options: Partial<AbilitySpec> = {}) =>
  ability({ key: "Q", cooldown: 0, delivery: { kind: "target", range: 700 }, onHit, ...options });
const single = spell([packet()]);
let catalog: Awaited<ReturnType<typeof loadRuneCatalog>>;
let rules: Awaited<ReturnType<typeof loadCombatRuneRules>>;
beforeAll(async () => {
  catalog = await loadRuneCatalog(path.join(datasetDir("16.21"), "rune-sources"));
  rules = await loadCombatRuneRules("16.21", catalog);
});

const equipped = (spec: FighterSpec) => equipRuneEffects(spec, [ID], catalog, rules).spec;
const arena = (attacker = fighter({ abilities: [single] }), defender = fighter(), bone = true, distance = 0): World =>
  createWorld({ fighters: [attacker, bone ? equipped(defender) : defender], distance,
    modes: ["idle", "idle"], settings: { maxSeconds: 90, log: true } });
const hits = (world: World, text: "activates" | "blocks") => ticksOf(world.log, 1, `Bone Plating ${text}`);
function advanceTo(world: World, tick: number): void {
  while (world.tick < tick && !world.result) step(world, [idle, idle]);
  expect(world.tick).toBe(tick);
}
function cast(world: World, selected = single): number {
  const before = world.units[1].hp;
  startCast(world, world.units[0], selected);
  return before - world.units[1].hp;
}
function nativeAttack(world: World): void {
  const source = world.units[0];
  advanceTo(world, Math.max(world.tick, source.attackReadyTick));
  startAttack(world, source);
  expect(source.action?.kind).toBe("windup");
  while (source.action?.kind === "windup" && !world.result) step(world, [idle, idle]);
}

describe("Bone Plating in native damage resolution", () => {
  it("arms on the first packet and reduces only one later packet of that same cast after resistance", () => {
    const q = spell([packet(200, "physical"), packet(200, "physical"), packet(200, "physical")]);
    const world = arena(fighter({ abilities: [q] }));
    expect(cast(world, q)).toBeCloseTo(300 - REDUCTION, 10);
    expect(hits(world, "activates")).toEqual([0]);
    expect(hits(world, "blocks")).toEqual([0]);
    expect(cast(world)).toBeCloseTo(100 - REDUCTION, 10);
    expect(cast(world)).toBeCloseTo(100 - REDUCTION, 10);
    expect(cast(world)).toBe(100);
    expect(hits(world, "blocks")).toEqual([0, 0, 0]);
  });

  it("carries one cast through missile flight, delayed packets and a periodic status in a copied world", () => {
    const q = spell([packet(), { type: "delayed", delay: 0.5, effects: [packet()] },
      { type: "dot", damageType: "true", duration: 0.6, interval: 0.2, total: { base: 300 } }],
    { delivery: { kind: "target", range: 700, missileSpeed: 300 } });
    const world = arena(fighter({ abilities: [q] }), fighter(), true, 180);
    expect(cast(world, q)).toBe(0);
    expect(world.missiles[0]?.castInstance).toBe(1);
    const copied = cloneWorld(world);
    advanceTo(copied, 55);
    expect(hits(copied, "activates")).toHaveLength(1);
    expect(hits(copied, "blocks")).toHaveLength(1);
    expect(copied.units[1].totals.damageTaken).toBeCloseTo(500 - REDUCTION, 10);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(hits(world, "activates")).toEqual([]);
  });

  it.each(["invulnerable", "stasis", "parry", "spellShield"])("leaves activation ready after %s", protection => {
    const world = arena(), defender = world.units[1];
    defender.statuses.push(lasting("state", protection));
    expect(cast(world)).toBe(0);
    expect(hits(world, "activates")).toEqual([]);
    defender.statuses = [];
    expect(cast(world)).toBe(100);
    expect(hits(world, "activates")).toEqual([0]);
  });

  it("arms only after health spill and spends before a later shield absorbs the remaining damage", () => {
    const world = arena(), defender = world.units[1];
    defender.statuses.push(lasting("shield", "ordinary", 140));
    expect(cast(world, spell([packet(0)]))).toBe(0);
    expect(cast(world)).toBe(0);
    expect(hits(world, "activates")).toEqual([]);
    expect(cast(world)).toBe(60);
    expect(hits(world, "activates")).toEqual([0]);
    defender.statuses.push(lasting("shield", "ordinary", 40));
    expect(cast(world)).toBe(0);
    expect(defender.statuses.find(status => status.key === "ordinary")?.value).toBeCloseTo(REDUCTION - 60, 10);
    expect(hits(world, "blocks")).toEqual([0]);
    expect(cast(world, spell([packet(20)]))).toBe(0);
    expect(hits(world, "blocks")).toEqual([0, 0]);
    expect(defender.statuses.find(status => status.key === "ordinary")?.value).toBeCloseTo(REDUCTION - 60, 10);
  });

  it("does not spend a plate when a preceding damage observer protects the target", () => {
    const source = fighter({ hooks: { onBeforeDamageObserved(ctx) {
      if (ctx.tick === 1) ctx.target.statuses.push(lasting("state", "invulnerable"));
    } } });
    const world = arena(source);
    expect(cast(world)).toBe(100);
    advanceTo(world, 1);
    expect(cast(world)).toBe(0);
    expect(hits(world, "blocks")).toEqual([]);
    world.units[1].statuses = [];
    advanceTo(world, 2);
    expect(cast(world)).toBeCloseTo(100 - REDUCTION, 10);
    expect(hits(world, "blocks")).toEqual([2]);
  });

  it("creates a reactive shield from the incoming amount before applying the plate", () => {
    const defender = fighter({ hooks: { beforeDamageTaken(ctx) {
      if (ctx.tick === 1 && ctx.amount >= 90) ctx.apply({ type: "shield", amount: { base: 50 }, duration: 10 }, true);
    } } });
    const world = arena(fighter(), defender);
    expect(cast(world)).toBe(100);
    advanceTo(world, 1);
    expect(cast(world)).toBe(0);
    expect(world.units[1].statuses.find(status => status.kind === "shield")?.value).toBeCloseTo(REDUCTION - 50, 10);
    expect(hits(world, "blocks")).toEqual([1]);
  });

  it("shares cast identity with Conqueror and forwards the plate's resolved damage", () => {
    const attacker = equipRuneEffects({ ...fighter(), adaptiveType: "Physical" }, [8010], catalog, rules).spec;
    const world = arena(attacker);
    const q = spell([packet(), packet(40), packet()]);
    expect(cast(world, q)).toBe(200);
    expect(world.castInstanceSequence).toBe(1);
    expect(hits(world, "blocks")).toEqual([0]);
    const stacks = () => world.units[0].statuses.find(status => status.memoKey === "rune-effects:conqueror:8010")?.charges;
    expect(stacks()).toBe(2);
    expect(cast(world, spell([packet(40)]))).toBe(0);
    expect(world.castInstanceSequence).toBe(2);
    expect(stacks()).toBe(2);
    expect(cast(world)).toBeCloseTo(100 - REDUCTION, 10);
    expect(stacks()).toBe(4);
  });

  it("skips friendly and separate pet damage, and tracks the same champion through a form change", () => {
    const first: FighterSpec = { ...fighter({ id: "first" }), form: "first" };
    const second: FighterSpec = { ...fighter({ id: "second" }), form: "second" };
    first.forms = second.forms = { first, second };
    const world = arena(first, first), [source, defender] = world.units;
    const pet = spawnPet(world, source, { kind: "test", name: "Test pet", hp: 100,
      armor: 0, mr: 0, radius: 25, moveSpeed: 0, duration: 10 }, source.x);
    expect(dealDamage(world, defender, defender, 100, "true")).toBe(100);
    expect(petHit(world, pet, defender, [packet()], false)).toBe(true);
    expect(hits(world, "activates")).toEqual([]);
    expect(cast(world)).toBe(100);
    expect(hits(world, "activates")).toEqual([0]);
    petHit(world, pet, defender, [packet()], false);
    expect(dealDamage(world, source, defender, 100, "true")).toBe(100);
    expect(hits(world, "blocks")).toEqual([]);
    setForm(world, source, "second");
    setForm(world, defender, "second");
    expect(cast(world)).toBeCloseTo(100 - REDUCTION, 10);
  });

  it("can spend at tick 44, expires at tick 45 and re-arms after the full cooldown even with plates left", () => {
    const world = arena();
    expect(cast(world)).toBe(100);
    advanceTo(world, 44);
    expect(cast(world)).toBeCloseTo(100 - REDUCTION, 10);
    advanceTo(world, 45);
    expect(cast(world)).toBe(100);
    advanceTo(world, 1694);
    expect(cast(world)).toBe(100);
    expect(hits(world, "activates")).toEqual([0]);
    advanceTo(world, 1695);
    expect(cast(world)).toBe(100);
    expect(hits(world, "activates")).toEqual([0, 1695]);
  });

  it("uses the last spent plate as the cooldown start when the three uses finish early", () => {
    const world = arena();
    cast(world);
    advanceTo(world, 5);
    for (let plate = 0; plate < 3; plate++) expect(cast(world)).toBeCloseTo(100 - REDUCTION, 10);
    advanceTo(world, 1654);
    expect(cast(world)).toBe(100);
    expect(hits(world, "activates")).toEqual([0]);
    advanceTo(world, 1655);
    expect(cast(world)).toBe(100);
    expect(hits(world, "activates")).toEqual([0, 1655]);
  });

  it("keeps the scheduled cooldown across Anivia's native attackable revival", () => {
    const world = arena(fighter(), kit("Anivia").spec), [source, defender] = world.units;
    cast(world);
    advanceTo(world, 4);
    dealDamage(world, source, defender, defender.hp + 1, "true");
    expect(defender.resurrection).toBeDefined();
    expect(cast(world)).toBeCloseTo(100, 10);
    expect(hits(world, "blocks")).toEqual([]);
    advanceTo(world, 1694);
    expect(defender.resurrection).toBeUndefined();
    cast(world);
    expect(hits(world, "activates")).toEqual([0]);
    advanceTo(world, 1695);
    cast(world);
    expect(hits(world, "activates")).toEqual([0, 1695]);
  });

  it("lets Kled's fourth base attack arm the rune and reduces the W bonus under that attack's cast", () => {
    const source = kit("Kled").spec, target = fighter({ base: { hp: 10000, armor: 0 } });
    const world = arena(source, target), control = arena(source, target, false);
    for (const sample of [world, control]) {
      sample.units[1].statuses.push(lasting("shield", "opening shield", 10000));
      for (let hit = 0; hit < 3; hit++) nativeAttack(sample);
      expect(sample.units[0].memory.vtCount).toBe(3);
      expect(sample.units[1].totals.damageTaken).toBe(0);
      sample.units[1].statuses = [];
      nativeAttack(sample);
    }
    expect(hits(world, "activates")).toHaveLength(1);
    expect(hits(world, "blocks")).toEqual(hits(world, "activates"));
    expect(world.log.some(entry => entry.text.startsWith("Violent Tendencies deals"))).toBe(true);
    expect(control.units[1].totals.damageTaken - world.units[1].totals.damageTaken).toBeCloseTo(REDUCTION, 10);
  });

  it("respects Braum's complete frontal block before arming or using an active plate", () => {
    const magic = spell([packet(400, "magic")]);
    const world = arena(fighter({ abilities: [magic] }), kit("Braum").spec, true, 125);
    const defender = world.units[1];
    startCast(world, defender, defender.spec.abilities.find(ability => ability.key === "E")!);
    expect(cast(world, magic)).toBe(0);
    expect(hits(world, "activates")).toEqual([]);
    expect(cast(world)).toBe(100);
    expect(hits(world, "activates")).toEqual([0]);
    expect(cast(world, magic)).toBe(0);
    expect(hits(world, "blocks")).toEqual([]);
    advanceTo(world, 1);
    expect(cast(world, magic)).toBeGreaterThan(0);
    expect(hits(world, "blocks")).toEqual([1]);
  });
});
