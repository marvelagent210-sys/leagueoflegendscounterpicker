import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { applyEffect } from "../../engine/sim/combat";
import { evaluate } from "../../engine/sim/derived";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import Ahri from "../../kits/champions/Ahri";
import Akshan from "../../kits/champions/Akshan";
import Aphelios from "../../kits/champions/Aphelios";
import Braum from "../../kits/champions/Braum";
import Draven from "../../kits/champions/Draven";
import Ekko from "../../kits/champions/Ekko";
import Graves from "../../kits/champions/Graves";
import Sivir from "../../kits/champions/Sivir";
import Xayah from "../../kits/champions/Xayah";
import Zeri from "../../kits/champions/Zeri";
import { championData, pets, records } from "../kits/helpers";
import { standStill } from "./helpers";
import { fighter } from "./kits";

const compiled = Object.fromEntries([Ahri, Akshan, Aphelios, Braum, Draven, Ekko, Graves, Sivir, Xayah, Zeri].map(module => [module.champion,
  compileKit(championData(module.champion), records(module.champion), module, module === Aphelios ? { startingWeapons: 9 } : {}, pets(module.champion)),
]));
type Champion = keyof typeof compiled;
function arena(champion: Champion, distance = 300, defender?: FighterSpec) {
  const original = compiled[champion]!.spec;
  const self: FighterSpec = { ...original, base: { ...original.base, hp: 3000, hpRegen: 0, armor: 0, mr: 0, resource: 10000, resourceRegen: 0 }, bonus: { ad: 100, ap: 100 } };
  const world = createWorld({ fighters: [self, defender ?? fighter({ base: { hp: 20000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { maxSeconds: 15, log: true } });
  world.units[0].x = 0; world.units[1].x = distance;
  return world;
}
const spell = (world: World, key: string, side: 0 | 1 = 0) => world.units[side].spec.abilities.find(ability => ability.key === key)!;
function cast(world: World, key: string, direction: 1 | -1 = 1, distance?: number, side: 0 | 1 = 0) {
  expect(canCast(world, world.units[side], spell(world, key, side))).toBe(true);
  startCast(world, world.units[side], spell(world, key, side), { direction, ...(distance === undefined ? {} : { distance }) });
}
function through(world: World, tick: number) { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
function intercept(world: World, facing: -1 | 1 = -1) {
  world.units[1].facing = facing;
  applyEffect(world, world.units[1], world.units[1], { type: "state", state: "projectileIntercept", duration: 12 }, { scale: 1 });
}
function endings(world: World) {
  const events: Array<{ source: string; reason: string }> = [], previous = world.units[0].spec.hooks?.onMissileEnd;
  world.units[0].spec = { ...world.units[0].spec, hooks: { ...world.units[0].spec.hooks, onMissileEnd(ctx) { events.push({ source: ctx.missile.source, reason: ctx.reason }); previous?.(ctx); } } };
  return events;
}
function pet(world: World, x: number, radius = 30) {
  return spawnPet(world, world.units[1], { kind: "fixture", name: "Actual allied body", hp: 10000, armor: 0, mr: 0, radius, moveSpeed: 0, duration: 15 }, x);
}
function wall(world: World, x: number) { world.zones.push({ id: world.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x, radius: 0, startTick: 0, endTick: 450 }); }
function packet(world: World, key: string) {
  const effect = spell(world, key).onHit!.find(effect => effect.type === "damage")!;
  if (effect.type !== "damage") throw new Error("missing source damage");
  return evaluate(effect.amount, world.units[0], world.units[1]);
}
function plant(world: World, x = 700, y = 0) {
  world.zones.push({ id: world.nextId++, owner: 0, kind: "delayedArea", ability: "feather", x, radius: 0, seenTick: 0, startTick: 0, endTick: 180, onHit: [], noPets: true, memory: { y } });
}

describe("interception destroys original return-capable flights", () => {
  it.each([
    ["Ahri", "Q", "Qreturn"], ["Akshan", "Qout", "Qback"], ["Ekko", "Qout", "Qreturn"], ["Sivir", "Q", "Qreturn"],
  ] as const)("keeps %s's outward collision but emits no destroyed-projectile return", (champion, outward, returning) => {
    const world = arena(champion), events = endings(world); intercept(world); cast(world, "Q"); through(world, 140);
    expect(events).toContainEqual({ source: outward, reason: "intercepted" });
    expect(events.some(event => event.source === returning)).toBe(false);
    expect(world.missiles).toHaveLength(0);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(packet(world, outward), 8);
    if (champion === "Ekko") expect(Object.keys(world.units[0].memory).some(key => key.startsWith("ekko:q:expand:"))).toBe(false);
    if (champion === "Akshan") expect(world.units[0].statuses.some(status => status.memoKey === "akshan:q")).toBe(false);
  });
  it.each(["Ahri", "Akshan", "Sivir"] as const)("preserves %s's ordinary rear-facing outward and return passes", champion => {
    const world = arena(champion), events = endings(world); intercept(world, 1); cast(world, "Q"); through(world, 140);
    // The outward shot enters from the rear. Its later inward return approaches
    // the active front and is still a real independently intercepted collision.
    expect(events.some(event => event.reason === "range" && event.source !== "Qreturn" && event.source !== "Qback")).toBe(true);
    expect(events.some(event => event.reason === "intercepted" && ["Qreturn", "Qback"].includes(event.source))).toBe(true);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(packet(world, champion === "Akshan" ? "Qout" : "Q"));
  });
  it("ends Draven's intercepted ultimate without creating a braking or return replacement", () => {
    const world = arena("Draven"), events = endings(world); intercept(world); cast(world, "R"); through(world, 140);
    expect(events).toEqual([{ source: "Raxe", reason: "intercepted" }]); expect(world.missiles).toHaveLength(0);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(packet(world, "Raxe"), 8);
    expect(Object.entries(world.units[0].memory).some(([key, value]) => key.endsWith(":phase") && value === "braking")).toBe(false);
  });
  it.each([false, true])("resolves Draven's real E pet interruption through the shared displacement path (immune=%s)", immune => {
    const world = arena("Draven", 1400), ally = pet(world, 150);
    ally.windup = { target: 0, launchTick: 400, blinded: false, effects: [] };
    if (immune) ally.spec.ccImmune = ["airborne"];
    cast(world, "E"); through(world, 15);
    expect(ally.hp).toBeLessThan(10000); expect(ally.x).toBe(150); expect(ally.forced).toBeUndefined();
    expect(ally.statuses?.filter(status => status.key === "airborne")).toHaveLength(immune ? 0 : 1);
    if (immune) expect(ally.windup).toBeDefined();
    else {
      expect(ally.windup).toBeUndefined();
      const airborne = ally.statuses!.find(status => status.key === "airborne")!;
      expect(airborne.endTick - airborne.startTick).toBe(15);
      through(world, airborne.endTick);
      expect(ally.statuses?.some(status => status.key === "airborne")).toBe(false);
    }
    expect(ally.statuses?.some(status => status.key === "slow")).toBe(true);
    expect(world.units[1].statuses).toHaveLength(0);
  });
});

describe("Graves's actual geometric and terrain collisions", () => {
  it.each([300, 500])("resolves every intersecting shotgun ray once at %i units without inventing fan contacts", distance => {
    const control = arena("Graves", distance), shield = arena("Graves", distance), events = endings(shield);
    intercept(shield); for (const world of [control, shield]) { startAttack(world, world.units[0]); through(world, 30); }
    expect(shield.units[1].totals.damageTaken).toBeCloseTo(control.units[1].totals.damageTaken, 8);
    expect(events.filter(event => event.reason === "intercepted")).toHaveLength(distance === 300 ? 4 : 2);
  });
  it("lets a closer actual pet stop the pellets before the directional shield", () => {
    const world = arena("Graves", 450), ally = pet(world, 150, 65), events = endings(world);
    intercept(world); startAttack(world, world.units[0]); through(world, 30);
    expect(ally.hp).toBeLessThan(10000); expect(world.units[1].totals.damageTaken).toBe(0); expect(events.some(event => event.reason === "intercepted")).toBe(false);
  });
  it("treats Unbreakable as sourced Q terrain, keeping the shortened fuse and second explosion", () => {
    const world = arena("Graves"), control = arena("Graves"), events = endings(world);
    intercept(world); for (const current of [world, control]) cast(current, "Q"); through(world, 30); through(control, 30);
    expect(events).toContainEqual({ source: "Q", reason: "intercepted" });
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(control.units[1].totals.damageTaken);
    const accelerated = world.units[1].totals.damageTaken; through(control, 100);
    expect(accelerated).toBeCloseTo(control.units[1].totals.damageTaken, 8);
    expect(world.zones.some(zone => zone.ability === "Qreturn")).toBe(false);
  });
  it("keeps a preceding Wind Wall's separate Q destruction rule", () => {
    const world = arena("Graves"); intercept(world); wall(world, 75); cast(world, "Q"); through(world, 100);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.zones.some(zone => zone.ability === "Qreturn")).toBe(false);
  });
  it("uses Graves's real returning wave origin when its caster remains behind Braum", () => {
    const original = compiled.Braum!.spec, defender = { ...original, base: { ...original.base, hp: 20000, hpRegen: 0, armor: 0, mr: 0, resource: 10000 } };
    const world = arena("Graves", 300, defender), events = endings(world);
    cast(world, "E", -1, undefined, 1); cast(world, "Q"); through(world, 30);
    const outward = world.units[1].totals.damageTaken; expect(outward).toBeGreaterThan(0);
    through(world, 100);
    expect(events).toContainEqual({ source: "Qreturn", reason: "intercepted" });
    expect(world.units[1].totals.damageTaken).toBe(outward);
  });
});

describe("custom rays, feather geometry and directional provenance", () => {
  it("keeps Zeri's intercepted seven-round damage equal to seven ordinary contacts", () => {
    const control = arena("Zeri"), shield = arena("Zeri"), events = endings(shield); intercept(shield);
    for (const world of [control, shield]) { cast(world, "Q"); through(world, 90); }
    expect(events.filter(event => event.reason === "intercepted")).toHaveLength(7);
    expect(shield.units[1].totals.damageTaken).toBeCloseTo(control.units[1].totals.damageTaken, 8);
  });
  it("destroys Zeri's intercepted W pulse without anchoring an invented laser", () => {
    const world = arena("Zeri"), control = arena("Zeri"), events = endings(world); intercept(world); world.terrain.push({ id: 900, owner: 1, from: 700, to: 800, endTick: 400 });
    for (const current of [world, control]) { cast(current, "W"); through(current, 120); }
    expect(events).toContainEqual({ source: "W", reason: "intercepted" }); expect(world.units[1].totals.damageTaken).toBeCloseTo(control.units[1].totals.damageTaken, 8);
    expect(world.zones.some(zone => zone.ability === "Wlaser")).toBe(false);
  });
  it("does not plant either of Xayah's intercepted Q daggers", () => {
    const world = arena("Xayah"), events = endings(world); intercept(world); cast(world, "Q"); through(world, 90);
    expect(events.filter(event => event.reason === "intercepted")).toHaveLength(2);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(packet(world, "Q") * 2, 8); expect(world.zones.filter(zone => zone.ability === "feather")).toHaveLength(0);
  });
  it("retains Xayah's real transverse recall miss through an axial shield envelope", () => {
    const world = arena("Xayah", 600), events = endings(world); plant(world, 700, 1000); intercept(world, 1); cast(world, "E"); through(world, 70);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(events.some(event => event.reason === "intercepted")).toBe(false);
  });
  it("intercepts only the genuinely contacting far-range R feather and lets the four off-axis feathers plant", () => {
    const world = arena("Xayah", 950), control = arena("Xayah", 950), events = endings(world); intercept(world);
    for (const current of [world, control]) { cast(current, "R"); through(current, 90); }
    expect(events.filter(event => event.reason === "intercepted")).toHaveLength(1);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(control.units[1].totals.damageTaken, 8);
    expect(world.zones.filter(zone => zone.ability === "feather")).toHaveLength(4);
    expect(control.zones.filter(zone => zone.ability === "feather")).toHaveLength(5);
  });
  it("uses Zeri's real anchored laser center when Braum enters it from the caster's far side", () => {
    const original = compiled.Braum!.spec, defender = { ...original, base: { ...original.base, hp: 20000, hpRegen: 0, armor: 0, mr: 0, resource: 10000 } };
    const world = arena("Zeri", 1000, defender); world.terrain.push({ id: 900, owner: 1, from: 700, to: 800, endTick: 400 });
    cast(world, "W"); through(world, 40);
    expect(world.zones.some(zone => zone.ability === "Wlaser")).toBe(true);
    world.units[1].x = 650; cast(world, "E", -1, undefined, 1); through(world, 90);
    expect(world.units[1].totals.damageTaken).toBe(0);
    // Unbreakable's first damage guard retains the source's collision debuff.
    expect(world.units[1].statuses.some(status => status.key === "slow")).toBe(true);
    expect(world.zones.some(zone => zone.ability === "Wlaser")).toBe(false);
  });
  it.each([1, -1] as const)("uses the real return approach with Braum facing %i while Xayah stands behind him", facing => {
    const original = compiled.Braum!.spec, defender = { ...original, base: { ...original.base, hp: 20000, hpRegen: 0, armor: 0, mr: 0, resource: 10000 } };
    const world = arena("Xayah", 300, defender), events = endings(world); plant(world);
    cast(world, "E", facing === 1 ? -1 : 1, undefined, 1); cast(world, "E"); through(world, 60);
    expect(world.units[1].facing).toBe(facing);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(facing === 1 ? 0 : packet(world, "Ereturn"), 8);
    expect(events.some(event => event.reason === "intercepted")).toBe(facing === 1);
    expect(world.missiles).toHaveLength(0);
  });
});

describe("Aphelios's destroyed Chakrams and stopped deployment", () => {
  it("destroys an actual pet-targeted Crescendum return and clears genuinely acquired mirrors", () => {
    const world = arena("Aphelios"); world.units[0].memory["aph:main"] = 4; cast(world, "RCrescendum"); through(world, 110);
    expect(world.units[0].memory["aph:chakrams"]).toBe(6);
    const ally = pet(world, 500), events = endings(world); intercept(world, 1); startAttack(world, world.units[0], ally); through(world, 180);
    expect(ally.hp).toBeLessThan(10000); expect(events).toContainEqual({ source: "Aphreturn", reason: "intercepted" });
    expect(world.units[0].memory["aph:chakrams"]).toBe(0); expect(world.units[0].memory["aph:crescWaiting"]).toBeUndefined(); expect(world.missiles).toHaveLength(0);
  });
  it("lands Sentry immediately before the real front shield instead of beyond it", () => {
    const world = arena("Aphelios"), control = arena("Aphelios");
    for (const current of [world, control]) current.units[0].memory["aph:main"] = 4;
    intercept(world); cast(world, "QCrescendum", 1, 400); cast(control, "QCrescendum", 1, 400); through(world, 8); through(control, 8);
    const sentry = world.pets.find(candidate => candidate.spec.kind === "sentry")!, ordinary = control.pets.find(candidate => candidate.spec.kind === "sentry")!;
    expect(ordinary.x).toBe(400); expect(sentry.x).toBe(300 - world.units[1].spec.base.radius - sentry.spec.radius); expect(sentry.spec.untargetable).toBe(true);
  });
});
