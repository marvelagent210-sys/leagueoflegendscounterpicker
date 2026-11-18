import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, applyEffect } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, MovementSnapshot, ResolvedOnHitSnapshot } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { composeHooks, mapForms } from "../../items/equip";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import type { RuneCatalog } from "../../runes/catalog";
import { equipRuneEffects, runeMatchupSpecs } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { idle } from "../sim/helpers";
import { fighter } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules = await loadCombatRuneRules("16.21", catalog);
const charges = (world: World, side: 0 | 1 = 0) => world.units[side].memory["rune:fleet-footwork:charges"];

function arena(id: string, initial = 0, distance = 100, options: Record<string, number> = {}) {
  const contacts: ResolvedOnHitSnapshot[] = [], movements: MovementSnapshot[] = [];
  const subject = mapForms(kit(id, options).spec, form => ({ ...form, base: { ...form.base, hpRegen: 0 },
    hooks: composeHooks(form.hooks, [{
      onResolvedOnHit(ctx) { contacts.push(ctx.onHit); },
      onMovementObserved(ctx) { movements.push(ctx.movementEvent); },
    }], [], false),
  }));
  const target = fighter({ id: "target", base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } });
  const me = equipRuneEffects(subject, [8021], catalog, rules, { energizedCharges: initial });
  const enemy = equipRuneEffects(target, [8021], catalog, rules, { energizedCharges: 0 });
  const world = createWorld({ fighters: runeMatchupSpecs(me, enemy), distance: 0,
    modes: ["idle", "idle"], settings: { log: true, maxSeconds: 30, maxBranches: 1 } });
  world.units[0].x = 0;
  world.units[1].x = distance;
  return { world, movements, contacts };
}
function spell(world: World, key: string): AbilitySpec {
  const spec = world.units[0].spec;
  const found = [spec, ...Object.values(spec.forms ?? {})].flatMap(form => form.abilities).find(ability => ability.key === key);
  if (!found) throw new Error(`Missing ability ${key}`);
  return found;
}
function through(world: World, tick: number) {
  while (!world.result && world.tick <= tick) step(world, [idle, idle]);
}
const cast = (world: World, key: string, aim?: Aim) => startCast(world, world.units[0], spell(world, key), aim);

function fire(world: World): void {
  const self = world.units[0];
  startAttack(world, self);
  const action = self.action;
  if (action?.kind !== "windup") throw new Error("Expected native attack windup");
  world.tick = action.launchTick;
  launchAttack(world, self, action);
}

describe("Fleet on native champion contacts", () => {
  it.each([
    ["Akshan", "Eshot"], ["Belveth", "Q"], ["Briar", "Q"], ["Elise", "QS"],
    ["Evelynn", "E"], ["Evelynn", "E2"], ["Ezreal", "Q"], ["Fiora", "Q"], ["Fizz", "Q"],
    ["Gangplank", "Q"], ["Irelia", "Q"], ["Katarina", "E"], ["Katarina", "R"],
    ["MissFortune", "Q"], ["MissFortune", "Qbounce"], ["Smolder", "Q"], ["Smolder", "Qsplash"],
    ["Viego", "R"], ["Volibear", "W"], ["Warwick", "Q"], ["Yasuo", "Q"], ["Yasuo", "Q3"],
    ["Yone", "Q"], ["Yone", "Q3"],
  ])("%s %s gains six per accepted application across split packets", (id, key) => {
    const { world, contacts } = arena(id), [self, enemy] = world.units;
    abilityHit(world, self, enemy, spell(world, key), [
      { type: "damage", damageType: "physical", amount: { base: 1 } },
      { type: "damage", damageType: "magic", amount: { base: 1 } },
    ]);
    expect(contacts).toHaveLength(1);
    expect(contacts[0]).toMatchObject({ attack: false, ability: { key, flags: { fleetFootwork: true } } });
    expect(charges(world)).toBe(6);
  });

  it("gains six from each of Alpha Strike's four champion hits and records its reappearance", () => {
    const { world, movements, contacts } = arena("MasterYi", 0, 300);
    cast(world, "Q"); through(world, 45);
    expect(contacts.map(contact => contact.ability?.key)).toEqual(["Q", "Q", "Q", "Q"]);
    expect(contacts.every(contact => contact.ability?.flags.fleetFootwork)).toBe(true);
    expect(movements.filter(move => move.body.side === 0 && move.from !== move.to)).toEqual([
      expect.objectContaining({ kind: "blink", ability: "Q", from: 0, to: world.units[0].x }),
    ]);
    expect(charges(world)).toBeCloseTo(24 + Math.abs(world.units[0].x) / 24, 10);
  });

  it("consumes on a collected Katarina dagger, with the full ordinary heal", () => {
    const { world, contacts } = arena("Katarina", 94), self = world.units[0];
    self.hp -= 500;
    const before = self.hp;
    cast(world, "W"); through(world, 40);
    expect(contacts).toHaveLength(1);
    expect(contacts[0]).toMatchObject({ pressTheAttackEligible: false, ability: { key: "I", flags: { fleetFootwork: true } } });
    expect(charges(world)).toBe(0);
    expect(self.hp - before).toBeCloseTo(rules.fleetFootwork.healBase + derive(self).bonusAd * .1 + derive(self).ap * .05, 10);
  });

  it.each(["Urgot", "Belveth"])("%s gains a full six for each accepted reduced-effectiveness ability contact", id => {
    const { world, contacts } = arena(id);
    if (id === "Belveth") cast(world, "E");
    through(world, id === "Urgot" ? 29 : 44);
    expect(contacts.length).toBeGreaterThanOrEqual(3);
    expect(contacts.every(hit => hit.ability?.flags.fleetFootwork && hit.scale > 0 && hit.scale < 1)).toBe(true);
    expect(charges(world)).toBe(contacts.length * 6);
  });

  it("credits Senna's collateral champion ray contact once when the selected target is a clone", () => {
    const { world, contacts } = arena("Senna", 0, 500);
    spawnPet(world, world.units[1], { kind: "clone", targetClass: "champion", name: "clone", hp: 10000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 20 }, 200);
    cast(world, "Q", { direction: 1, distance: 200 }); through(world, 30);
    expect(contacts).toHaveLength(2);
    expect(contacts.every(hit => hit.ability?.flags.fleetFootwork)).toBe(true);
    expect(contacts.filter(hit => hit.target.petId === undefined)).toHaveLength(1);
    expect(charges(world)).toBe(6);
  });

  it("applies one windup gain across an empowered three-strike Renekton W", () => {
    const { world, contacts } = arena("Renekton", 94), self = world.units[0];
    self.resource = 50;
    cast(world, "Wfury"); fire(world);
    expect(contacts.map(hit => hit.attack)).toEqual([true, true, true]);
    expect(charges(world)).toBe(0);
  });

  it("counts one completed windup for Galio's smash and outer basic", () => {
    const { world, contacts } = arena("Galio", 88);
    fire(world);
    expect(contacts.map(hit => hit.ability?.key ?? "basic")).toEqual(["Ismash", "basic"]);
    expect(charges(world)).toBe(94);
  });

  it.each([[94, 94], [100, 0]])("Aphelios's R follow-up can spend its existing %i charges without a windup", (starting, expected) => {
    const { world, contacts } = arena("Aphelios", starting, 300);
    cast(world, "RCalibrum");
    through(world, 80);
    expect(contacts.map(hit => hit.attack)).toEqual([true]);
    expect(charges(world)).toBe(expected);
  });

  it("charges once per accepted Aphelios Onslaught attack, including the immediate Severum and off-hand missiles", () => {
    const { world, contacts } = arena("Aphelios", 0, 300, { startingWeapons: 4 });
    cast(world, "QSeverum"); through(world, 80);
    expect(contacts.length).toBe(Number(world.units[0].memory["aph:onslaughtTotal"]));
    expect(contacts.length).toBeGreaterThanOrEqual(6);
    expect(contacts.every(hit => hit.attack)).toBe(true);
    expect(charges(world)).toBe(contacts.length * 6);
  });

  it("Aphelios's Calibrum mark uses one issued windup", () => {
    const { world, contacts } = arena("Aphelios", 88, 300);
    const [self, enemy] = world.units, moonshot = spell(world, "QCalibrum");
    abilityHit(world, self, enemy, moonshot, moonshot.onHit ?? []);
    fire(world); through(world, world.tick + 30);
    expect(contacts.map(hit => hit.attack)).toEqual([true]);
    expect(charges(world)).toBe(94);
  });

  it.each(["Akshan", "Lucian"])("%s's passive second shot grants six when it connects", id => {
    const { world, contacts } = arena(id, 88, 300);
    if (id === "Lucian") { cast(world, "W"); through(world, 30); }
    fire(world); through(world, world.tick + 40);
    expect(contacts.map(hit => hit.attack)).toEqual([true, true]);
    expect(charges(world)).toBe(0);
  });

  it("Master Yi's fourth windup with Double Strike grants six for the second contact", () => {
    const { world, contacts } = arena("MasterYi");
    for (let i = 0; i < 4; i++) { fire(world); through(world, world.tick + 1); }
    expect(contacts.map(hit => hit.attack)).toEqual([true, true, true, true, true]);
    expect(charges(world)).toBe(30);
  });

  it("Azir's soldier command fills the pool and only his subsequent personal attack spends it", () => {
    const { world, contacts } = arena("Azir", 94, 400);
    step(world, [idle, idle]); cast(world, "W"); through(world, 15);
    fire(world); through(world, world.tick + 15);
    expect(contacts).toHaveLength(1);
    expect(contacts[0]).toMatchObject({ attack: true, scale: .5 });
    expect(charges(world)).toBe(100);
    world.pets = [];
    through(world, world.units[0].attackReadyTick);
    fire(world); through(world, world.tick + 25);
    expect(contacts).toHaveLength(2);
    expect(charges(world)).toBe(0);
  });

  it("keeps a blocked Ezreal Q and its damage packets from filling or spending the pool", () => {
    const { world, contacts } = arena("Ezreal", 94), [self, enemy] = world.units;
    applyEffect(world, enemy, enemy, { type: "state", state: "blockAttacks", duration: 1 }, { scale: 1 });
    abilityHit(world, self, enemy, spell(world, "Q"), spell(world, "Q").onHit!);
    expect(contacts).toHaveLength(1);
    expect(contacts[0]!.blocked).toBe(true);
    expect(charges(world)).toBe(94);
  });
});

describe("Fleet charges across kit-owned position changes", () => {
  it("counts Shunpo's actual blink before its same-tick contact", () => {
    const { world, movements, contacts } = arena("Katarina", 82, 288), self = world.units[0];
    self.hp -= 500;
    cast(world, "E");
    expect(movements).toHaveLength(1);
    expect(movements[0]).toMatchObject({ kind: "blink", ability: "E", from: 0, to: 288 });
    expect(movements[0]!.sequence).toBeLessThan(contacts[0]!.sequence);
    expect(charges(world)).toBe(0);
    expect(charges(world, 1)).toBe(0);
  });

  it("counts one outbound LeBlanc dash and one return blink", () => {
    const { world, movements } = arena("Leblanc", 0, 1800);
    cast(world, "W", { direction: 1, distance: 600 }); through(world, 30);
    expect(charges(world)).toBeCloseTo(25, 10);
    const landing = world.units[0].x;
    expect(landing).toBeCloseTo(600, 10);
    cast(world, "W2");
    expect(movements.filter(move => move.kind === "blink")).toEqual([
      expect.objectContaining({ from: landing, to: 0, ability: "W2" }),
    ]);
    expect(charges(world)).toBeCloseTo(50, 10);
  });

  it("credits Camille's arena boundary displacement only to the fighter it moves", () => {
    const { world, movements } = arena("Camille"), [self, enemy] = world.units;
    const ultimate = spell(world, "R");
    abilityHit(world, self, enemy, ultimate, ultimate.onHit!);
    enemy.x = 1000;
    through(world, 1);
    expect(enemy.x).toBeLessThan(1000);
    expect(movements).toEqual([
      expect.objectContaining({ kind: "forced", ability: "R", body: expect.objectContaining({ side: 1, kind: "champion" }), from: 1000, to: enemy.x }),
    ]);
    expect(charges(world)).toBe(0);
    expect(charges(world, 1)).toBeCloseTo((1000 - enemy.x) / 24, 10);
  });

  it("counts Ekko's historical turns between ticks, even when the rewind ends where it started", () => {
    const { world, movements } = arena("Ekko", 0, 2000), self = world.units[0];
    while (world.tick < 120) {
      self.x = world.tick % 2;
      through(world, world.tick);
    }
    self.x = 0;
    cast(world, "R"); through(world, 160);
    const travel = movements.filter(move => move.ability === "R" && move.from !== move.to);
    expect(self.x).toBe(0);
    expect(travel.reduce((sum, move) => sum + Math.abs(move.to - move.from), 0)).toBeCloseTo(120, 10);
    expect(new Set(travel.map(move => move.tick)).size).toBeLessThan(travel.length);
    expect(charges(world)).toBeCloseTo(5, 10);
  });
});
