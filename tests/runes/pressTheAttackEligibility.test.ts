import { describe, expect, it } from "vitest";
import { launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, applyEffect, attackHit } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec, ResolvedOnHitSnapshot, StateType } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { mapForms } from "../../items/equip";
import { kit } from "../kits/helpers";
import { idle } from "../sim/helpers";
import { fighter } from "../sim/kits";

function arena(id: string, distance = 100) {
  const events: ResolvedOnHitSnapshot[] = [];
  const spec = mapForms(kit(id).spec, form => ({
    ...form, base: { ...form.base, hpRegen: 0, resourceRegen: 0 },
    hooks: { ...form.hooks, onResolvedOnHit(ctx) { events.push(ctx.onHit); } },
  }));
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { maxSeconds: 30, log: true, maxBranches: 1 } });
  world.units[1].x = world.units[0].x + distance;
  return { world, events };
}
const through = (world: World, tick: number) => { while (!world.result && world.tick <= tick) step(world, [idle, idle]); };
const spell = (world: World, key: string): AbilitySpec => {
  const current = world.units[0].spec;
  const found = [current, ...Object.values(current.forms ?? {})].flatMap(form => form.abilities).find(ability => ability.key === key);
  if (!found) throw new Error(`Missing ${key}`);
  return found;
};
const state = (world: World, key: StateType) => applyEffect(world, world.units[1], world.units[1], { type: "state", state: key, duration: 15 }, { scale: 1 });
const cast = (world: World, key: string) => startCast(world, world.units[0], spell(world, key));
const fire = (world: World) => {
  startAttack(world, world.units[0]);
  const action = world.units[0].action;
  if (action?.kind !== "windup") throw new Error("Expected a native attack windup");
  world.tick = action.launchTick;
  launchAttack(world, world.units[0], action);
};

// These are native contact/metadata checks against the pinned source families.
// They do not establish live-game effect-instance ordering or absent collateral geometry.
describe("source-qualified native ability on-hit families", () => {
  it.each([
    ["Akshan", "Eshot"], ["Belveth", "Q"], ["Briar", "Q"], ["Elise", "QS"],
    ["Evelynn", "E"], ["Ezreal", "Q"], ["Fiora", "Q"], ["Fizz", "Q"],
    ["Gangplank", "Q"], ["Irelia", "Q"], ["Katarina", "E"],
    ["MissFortune", "Q"], ["MissFortune", "Qbounce"], ["Smolder", "Q"],
    ["Viego", "R"], ["Volibear", "W"], ["Warwick", "Q"],
    ["Yasuo", "Q"], ["Yasuo", "Q3"], ["Yone", "Q"], ["Yone", "Q3"],
  ])("%s %s reports one actual accepted eligible application rather than damage packets", (id, key) => {
    const { world, events } = arena(id), ability = spell(world, key);
    abilityHit(world, world.units[0], world.units[1], ability, [
      { type: "damage", damageType: "physical", amount: { base: 1 } },
      { type: "damage", damageType: "magic", amount: { base: 1 } },
    ]);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ attack: false, pressTheAttackEligible: true, ability: { key }, source: { kind: "champion" }, target: { kind: "champion" } });
    expect(events[0]!.scale).toBeCloseTo(ability.onHitScale ?? 1, 12);
  });

  it.each([["Evelynn", "E2"], ["Katarina", "R"], ["Smolder", "Qsplash"]])("%s %s retains native on-hits while explicitly excluding sourced AoE applications", (id, key) => {
    const { world, events } = arena(id), ability = spell(world, key);
    abilityHit(world, world.units[0], world.units[1], ability, [{ type: "damage", damageType: "magic", amount: { base: 1 } }]);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ pressTheAttackEligible: false, ability: { key } });
  });

  it("Urgot's automatic Purge shots each supply one half-scale application", () => {
    const { world, events } = arena("Urgot");
    through(world, 29);
    expect(events).toHaveLength(3);
    expect(events.every(event => event.pressTheAttackEligible && event.ability?.key === "W" && event.scale === .5)).toBe(true);
    expect(new Set(events.map(event => event.sequence)).size).toBe(3);
  });

  it("Katarina's actually collected dagger keeps its AoE spin ineligible", () => {
    const { world, events } = arena("Katarina");
    cast(world, "W"); through(world, 40);
    expect(world.log.some(entry => entry.text.startsWith("Sinister Steel deals"))).toBe(true);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ pressTheAttackEligible: false, ability: { key: "I" } });
  });

  it("Galio's internal smash and outer basic count as one eligible application", () => {
    const { world, events } = arena("Galio");
    attackHit(world, world.units[0], world.units[1], false, []);
    expect(events).toHaveLength(2);
    expect(events.map(event => event.pressTheAttackEligible)).toEqual([false, true]);
    expect(events[0]!.ability?.key).toBe("Ismash");
    expect(events[1]!.attack).toBe(true);
  });
});

describe("distinct applications inside native attacks", () => {
  it.each([[false, 2], [true, 3]] as const)("Renekton W reports empowered=%s as %i distinct strikes without extra legacy packets", (empowered, count) => {
    const { world, events } = arena("Renekton"), self = world.units[0];
    self.resource = empowered ? 50 : 0;
    cast(world, empowered ? "Wfury" : "W");
    self.spec = { ...self.spec, attack: { ...self.spec.attack, onHit: [{ type: "damage", damageType: "magic", amount: { base: 37 } }] } };
    fire(world);
    expect(events).toHaveLength(count);
    expect(events.every(event => event.attack && event.pressTheAttackEligible)).toBe(true);
    expect(new Set(events.map(event => event.sequence)).size).toBe(count);
    expect(new Set(events.map(event => event.tick)).size).toBe(1);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(count * (65 + 0.75 * derive(self).ad) + 37, 8);
  });

  it("Master Yi's fourth issued attack reports a separate second strike; Alpha remains excluded", () => {
    const { world, events } = arena("MasterYi");
    for (let i = 0; i < 4; i++) { fire(world); through(world, world.tick + 1); }
    expect(events).toHaveLength(5);
    expect(events.every(event => event.attack && event.pressTheAttackEligible)).toBe(true);
    expect(events[3]!.sequence).toBeLessThan(events[4]!.sequence);
    expect(events[3]!.tick).toBe(events[4]!.tick);
    events.length = 0;
    cast(world, "Q");
    through(world, world.tick + 40);
    expect(world.log.some(entry => entry.text.startsWith("Alpha Strike deals"))).toBe(true);
    expect(events).toHaveLength(4);
    expect(events.every(event => event.ability?.key === "Q" && !event.pressTheAttackEligible)).toBe(true);
  });

  it("Lucian's actual delayed Lightslinger projectile supplies its own full application", () => {
    const { world, events } = arena("Lucian", 300);
    cast(world, "E");
    through(world, 20);
    fire(world);
    through(world, world.tick + 35);
    expect(events).toHaveLength(2);
    expect(events.every(event => event.attack && event.pressTheAttackEligible)).toBe(true);
    expect(events[1]!.tick).toBeGreaterThan(events[0]!.tick);
    expect(events[1]!.sequence).toBeGreaterThan(events[0]!.sequence);
  });
});

describe("manually routed sourced champion contacts", () => {
  it.each([false, true])("Senna Q preserves one eligible primary on-hit through spellShield=%s", shielded => {
    const { world, events } = arena("Senna", 300);
    if (shielded) state(world, "spellShield");
    const ability = spell(world, "Q");
    abilityHit(world, world.units[0], world.units[1], ability, ability.onHit!);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ attack: false, pressTheAttackEligible: true, ability: { key: "Q" } });
    expect(world.units[1].statuses.some(status => status.key === "spellShield")).toBe(false);
  });

  it.each(["dodgeAttacks", "parry"] as const)("Senna Q's %s denial emits no manual on-hit", guard => {
    const { world, events } = arena("Senna"); state(world, guard);
    const ability = spell(world, "Q");
    abilityHit(world, world.units[0], world.units[1], ability, ability.onHit!);
    expect(events).toHaveLength(0);
  });

  it("Senna's actual pet-targeted ray excludes the collateral champion's area packet", () => {
    const { world, events } = arena("Senna", 500);
    spawnPet(world, world.units[1], { kind: "clone", name: "Champion clone", targetClass: "champion", hp: 100000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 20 }, 200);
    startCast(world, world.units[0], spell(world, "Q"), { direction: 1, distance: 200 });
    through(world, 30);
    const primary = events.filter(event => event.target.petId !== undefined), collateral = events.filter(event => event.target.petId === undefined);
    expect(primary).toHaveLength(1);
    expect(primary[0]!.pressTheAttackEligible).toBe(true);
    expect(collateral).toHaveLength(1);
    expect(collateral[0]!.pressTheAttackEligible).toBe(false);
  });

  it.each([undefined, "spellShield", "parry", "dodgeAttacks"] as const)("Bel'Veth E reports sourced native slashes under the bounded %s guard policy", guard => {
    const { world, events } = arena("Belveth", 100);
    if (guard) state(world, guard);
    cast(world, "E");
    through(world, 44);
    if (guard === "parry" || guard === "dodgeAttacks") expect(events).toHaveLength(0);
    else {
      expect(events.length).toBeGreaterThanOrEqual(6);
      expect(events.every(event => event.pressTheAttackEligible && event.ability?.key === "E" && event.scale >= .12 && event.scale <= .24 && event.incomingScale === 1)).toBe(true);
    }
  });

  it("Azir's sourced soldier exception reports one owner application at half on-hit scale", () => {
    const { world, events } = arena("Azir", 400);
    step(world, [idle, idle]); cast(world, "W"); through(world, 15);
    fire(world); through(world, world.tick + 15);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ attack: true, pressTheAttackEligible: true, scale: .5, source: { kind: "champion" } });
  });

  it.each([false, true])("Twitch R preserves the declared victim after real pet interception (pet-directed=%s)", petDirected => {
    const { world, events } = arena("Twitch", 700);
    const pet = spawnPet(world, world.units[1], { kind: "dummy", name: "Dummy", hp: 100000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 20 }, 300);
    cast(world, "R");
    startAttack(world, world.units[0], petDirected ? pet : undefined);
    const action = world.units[0].action;
    if (action?.kind !== "windup") throw new Error("Expected R windup");
    world.tick = action.launchTick; launchAttack(world, world.units[0], action);
    through(world, world.tick + 15);
    expect(events).toHaveLength(2);
    expect(events[0]!.target.petId).toBe(pet.id);
    expect(events[1]!.target.petId).toBeUndefined();
    expect(events.map(event => event.pressTheAttackEligible)).toEqual(petDirected ? [true, false] : [false, true]);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
    expect(pet.hp).toBeLessThan(100000);
  });
});
