import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { canCast, startCast } from "../../engine/sim/actions";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { evaluate } from "../../engine/sim/derived";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import Braum from "../../kits/champions/Braum";
import Diana from "../../kits/champions/Diana";
import Jhin from "../../kits/champions/Jhin";
import Kaisa from "../../kits/champions/Kaisa";
import Katarina from "../../kits/champions/Katarina";
import Khazix from "../../kits/champions/Khazix";
import { championData, pets, records } from "../kits/helpers";
import { standStill } from "./helpers";
import { fighter } from "./kits";

const compiled = Object.fromEntries([Braum, Diana, Jhin, Kaisa, Katarina, Khazix].map(module => [module.champion,
  compileKit(championData(module.champion), records(module.champion), module, module === Khazix ? { unevolved: 2 } : {}, pets(module.champion)),
]));
type Champion = "Diana" | "Jhin" | "Kaisa" | "Katarina" | "Khazix";
function arena(champion: Champion, distance = 300, defender?: FighterSpec) {
  const original = compiled[champion]!.spec;
  const self: FighterSpec = { ...original, base: { ...original.base, hp: 3000, hpRegen: 0, ad: 100, armor: 0, mr: 0, resource: 10000, resourceRegen: 0 }, bonus: { ap: 100 } };
  const world = createWorld({ fighters: [self, defender ?? fighter({ base: { hp: 20000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { maxSeconds: 10, log: true } });
  world.units[0].x = 0; world.units[1].x = distance;
  return world;
}
const spell = (world: World, key: string, side: 0 | 1 = 0) => world.units[side].spec.abilities.find(ability => ability.key === key)!;
function cast(world: World, key: string, distance?: number) { expect(canCast(world, world.units[0], spell(world, key))).toBe(true); startCast(world, world.units[0], spell(world, key), distance === undefined ? undefined : { direction: 1, distance }); }
function through(world: World, tick: number) { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
function intercept(world: World, facing: -1 | 1 = -1) {
  world.units[1].facing = facing;
  applyEffect(world, world.units[1], world.units[1], { type: "state", state: "projectileIntercept", duration: 10 }, { scale: 1 });
}
function pet(world: World, x: number, targetClass?: "minion" | "champion") {
  return spawnPet(world, world.units[1], { kind: "fixture", name: "Actual allied body", hp: 10000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 10, ...(targetClass ? { targetClass } : {}) }, x);
}
function wall(world: World, x: number) { world.zones.push({ id: world.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x, radius: 0, startTick: 0, endTick: 300 }); }
function firstDamage(world: World, key: string) {
  const effect = spell(world, key).onHit!.find(effect => effect.type === "damage")!;
  if (effect.type !== "damage") throw new Error("missing source damage");
  return evaluate(effect.amount, world.units[0], world.units[1]);
}

// Braum's pinned E note explicitly retains collision damage, debuffs, marks and AoEs.
describe("batch11 custom flight collision payloads", () => {
  it("intercepts both actual Diana arcs, keeps one bolt/Moonlight and suppresses their remote endpoint", () => {
    const world = arena("Diana"), ally = pet(world, 600), endings: string[] = [];
    world.units[0].spec = { ...world.units[0].spec, hooks: { ...world.units[0].spec.hooks, onMissileEnd(ctx) { endings.push(ctx.reason); } } };
    intercept(world); cast(world, "Q", 600); through(world, 70);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(firstDamage(world, "Qbolt"), 8);
    expect(world.units[1].statuses.some(status => status.key === "diana:moonlight")).toBe(true);
    expect(ally.hp).toBe(10000); expect(endings).toEqual(["intercepted", "intercepted"]); expect(world.missiles).toHaveLength(0);
  });
  it("lets an earlier destroying wall suppress Diana's collision and endpoint", () => {
    const world = arena("Diana"), ally = pet(world, 600); intercept(world); wall(world, 150); cast(world, "Q", 600); through(world, 70);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[1].statuses.some(status => status.key === "diana:moonlight")).toBe(false); expect(ally.hp).toBe(10000);
  });
  it("uses actual Braum E to negate Diana damage while retaining Moonlight", () => {
    const original = compiled.Braum!.spec, defender = { ...original, base: { ...original.base, hp: 20000, hpRegen: 0, armor: 0, mr: 0, resource: 10000 } };
    const world = arena("Diana", 300, defender), ally = pet(world, 600);
    expect(canCast(world, world.units[1], spell(world, "E", 1))).toBe(true); startCast(world, world.units[1], spell(world, "E", 1)); cast(world, "Q", 600); through(world, 70);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[1].statuses.some(status => status.key === "diana:moonlight")).toBe(true); expect(ally.hp).toBe(10000);
  });
  it("reclassifies intercepted Kai'Sa missiles by their actual non-minion recipient", () => {
    const world = arena("Kaisa"), ally = pet(world, 500, "minion"); ally.hp = 1000;
    intercept(world); cast(world, "Q");
    while (!world.missiles.length) through(world, world.tick);
    const count = world.missiles.length; through(world, 70);
    expect(count).toBe(6); expect(ally.hp).toBe(1000);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(firstDamage(world, "Qfirst") * (1 + (count - 1) * .25), 8);
    expect(world.missiles).toHaveLength(0);
  });
  it("preserves Kai'Sa's ordinary target distribution when the shield faces away", () => {
    const world = arena("Kaisa"), ally = pet(world, 500, "minion"); ally.hp = 1000;
    intercept(world, 1); cast(world, "Q"); through(world, 70);
    const damage = firstDamage(world, "Qfirst");
    expect(world.units[1].totals.damageTaken).toBeCloseTo(damage * 1.5, 8); expect(ally.hp).toBeCloseTo(1000 - damage * 6, 8);
  });
  it("retains an ordinary Kai'Sa missile's incoming origin after its caster crosses the recipient", () => {
    const world = arena("Kaisa"), origins: number[] = [];
    world.units[1].spec = { ...world.units[1].spec, hooks: { modifyDamageBeforeShields(ctx) { origins.push(ctx.originX); return ctx.amount; } } };
    cast(world, "Q"); through(world, 2); world.missiles = [world.missiles[0]!]; world.units[0].x = 600; through(world, 70);
    expect(origins).toHaveLength(1); expect(origins[0]).toBeGreaterThan(0); expect(origins[0]).toBeLessThan(world.units[1].x);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(firstDamage(world, "Qfirst"), 8);
  });
  it("retains Katarina's redirected first-hit dagger and a legitimate new bounce without rehitting Braum", () => {
    const world = arena("Katarina"), ally = pet(world, 500); intercept(world); cast(world, "Q", 500); through(world, 70);
    const daggers = JSON.parse(String(world.units[0].memory["kat:daggers"]));
    expect(daggers).toHaveLength(1); expect(daggers[0].x).toBe(650);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(firstDamage(world, "Q"), 8); expect(ally.hp).toBeCloseTo(10000 - firstDamage(world, "Q"), 8);
    expect(world.missiles).toHaveLength(0);
  });
  it("redirects separate Katarina R knives, including their Grievous Wounds, away from a real clone", () => {
    const world = arena("Katarina", 200), ally = pet(world, 450, "champion"); intercept(world); cast(world, "R"); through(world, 95);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0); expect(world.units[1].statuses.some(status => status.key === "grievousWounds")).toBe(true);
    expect(ally.hp).toBe(10000); expect(world.missiles).toHaveLength(0);
  });
  it("keeps Kha'Zix's sourced collision-centered splash, damage origin and single nearby heal", () => {
    const world = arena("Khazix", 400), near = pet(world, 500), far = pet(world, 800), origins: number[] = [];
    world.units[0].hp = 1000;
    world.units[1].spec = { ...world.units[1].spec, hooks: { modifyDamageBeforeShields(ctx) { origins.push(ctx.originX); return ctx.amount; } } };
    intercept(world); cast(world, "W"); through(world, 60);
    const point = 400 - world.units[1].spec.base.radius - 70;
    expect(origins).toEqual([point]); expect(near.hp).toBeCloseTo(10000 - firstDamage(world, "W"), 8); expect(far.hp).toBe(10000);
    expect(world.units[0].hp).toBeGreaterThan(1000); expect(world.units[0].totals.healing).toBe(world.units[0].hp - 1000); expect(world.missiles).toHaveLength(0);
  });
  it("does not turn a wall-destroyed Kha'Zix spike into an explosion or heal", () => {
    const world = arena("Khazix", 400), ally = pet(world, 500); world.units[0].hp = 1000;
    intercept(world); wall(world, 100); cast(world, "W"); through(world, 60);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(ally.hp).toBe(10000); expect(world.units[0].hp).toBe(1000);
  });
  it.each([-1, 1] as const)("intercepts an evolved Kha'Zix side ray at its actual circle entry (direction %s)", (direction) => {
    const world = arena("Khazix", direction * 400), origins: number[] = [];
    const evolved = compileKit(championData("Khazix"), records("Khazix"), Khazix, { unevolved: 1 }, pets("Khazix")).spec;
    world.units[0].spec = { ...evolved, base: world.units[0].spec.base, bonus: world.units[0].spec.bonus };
    world.units[1].spec = { ...world.units[1].spec, hooks: { modifyDamageBeforeShields(ctx) { origins.push(ctx.originX); return ctx.amount; } } };
    intercept(world, direction === 1 ? -1 : 1); cast(world, "W");
    while (!world.missiles.length) through(world, world.tick);
    const side = world.missiles.find(missile => JSON.parse(String(world.units[0].memory[`khazix:spike:${missile.id}`])).angle > 0)!;
    world.missiles = [side]; through(world, 60);
    const angle = 14 * Math.PI / 180, collision = 70 + world.units[1].spec.base.radius;
    const entry = 400 * Math.cos(angle) - Math.sqrt(collision ** 2 - (400 * Math.sin(angle)) ** 2);
    expect(origins).toHaveLength(1); expect(origins[0]).toBeCloseTo(direction * entry * Math.cos(angle), 8);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(firstDamage(world, "W"), 8); expect(world.missiles).toHaveLength(0);
  });
  it("lets an evolved Kha'Zix side ray miss a shield outside its actual two-dimensional path", () => {
    const world = arena("Khazix", 800);
    const evolved = compileKit(championData("Khazix"), records("Khazix"), Khazix, { unevolved: 1 }, pets("Khazix")).spec;
    world.units[0].spec = { ...evolved, base: world.units[0].spec.base, bonus: world.units[0].spec.bonus };
    intercept(world); cast(world, "W");
    while (!world.missiles.length) through(world, world.tick);
    world.missiles = [world.missiles.find(missile => JSON.parse(String(world.units[0].memory[`khazix:spike:${missile.id}`])).angle > 0)!];
    through(world, 60);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.missiles).toHaveLength(0);
  });
});

describe("Diana's actual area centers", () => {
  it("uses the endpoint of a separately guarded explosion after a spell-shielded bolt", () => {
    const world = arena("Diana", 600), origins: number[] = [];
    world.units[1].spec = { ...world.units[1].spec, hooks: { modifyDamageBeforeShields(ctx) { origins.push(ctx.originX); return ctx.amount; } } };
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "spellShield", duration: 10, charges: 1 }, { scale: 1 });
    cast(world, "Q", 600); through(world, 70);
    expect(origins).toEqual([600]); expect(world.units[1].totals.damageTaken).toBeCloseTo(firstDamage(world, "Qexplosion"), 8);
  });
  it("uses the actual basic recipient as the third-strike cleave's center", () => {
    const world = arena("Diana", 200), origins: number[] = [];
    world.units[1].spec = { ...world.units[1].spec, hooks: { modifyDamageBeforeShields(ctx) { if (ctx.damageType === "magic") origins.push(ctx.originX); return ctx.amount; } } };
    for (let count = 0; count < 3; count++) attackHit(world, world.units[0], world.units[1], false, []);
    expect(origins).toEqual([200]);
  });
  it("keeps Pale Cascade's declared collision-centered explosions after their caster stays behind", () => {
    const world = arena("Diana", 200), origins: number[] = [];
    world.units[1].spec = { ...world.units[1].spec, hooks: { modifyDamageBeforeShields(ctx) { origins.push(ctx.originX); return ctx.amount; } } };
    cast(world, "W"); through(world, 1);
    expect(origins).toEqual([200, 200, 200]); expect(world.units[0].x).toBe(0);
  });
});

describe("Jhin's pinned stop-and-land trap exception", () => {
  it.each([
    ["wall", -1, 200, 200], ["front shield", -1, undefined, 235], ["rear shield", 1, undefined, 600],
    ["earlier wall", -1, 150, 150], ["later wall", -1, 500, 235],
  ] as const)("lands at the first %s encounter while retaining ordinary arming", (_label, facing, wallX, expected) => {
    const world = arena("Jhin"); if (_label !== "wall") intercept(world, facing); if (wallX !== undefined) wall(world, wallX);
    cast(world, "E", 600); through(world, 8);
    const trap = world.zones.find(zone => zone.ability === "E")!;
    expect(trap.x).toBe(expected); expect(trap.kind).toBe("trap"); expect(trap.startTick).toBe(38);
    expect(world.pets.find(candidate => candidate.spec.kind === "lotus")?.x).toBe(expected); expect(world.units[1].totals.damageTaken).toBe(0);
  });
});
