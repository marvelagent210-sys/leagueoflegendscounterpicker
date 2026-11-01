import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect } from "../../engine/sim/combat";
import { ccTypes, derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import { DEFAULT_ENVIRONMENT, type Aim, type World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Bard");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const attacking: [Behavior, Behavior] = [() => ({ kind: "attack" }), () => undefined];
const HP = 20000;
const worldFor = (distance = 500, bonus: BonusStats = {}, chimes?: number, walls = true): World => {
  const source = chimes === undefined ? compiled.spec : kit("Bard", { chimes }).spec;
  const spec: FighterSpec = { ...source, bonus, base: { ...source.base, hpRegen: 0, resourceRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true, environment: { ...DEFAULT_ENVIRONMENT, walls } } });
  world.units[1].x = world.units[0].x + distance;
  return world;
};
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string, aim?: Aim) => startCast(world, world.units[0], ability(world, key), aim);
const through = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, idle); };
const wait = (world: World, seconds: number) => through(world, world.tick + Math.round(seconds * 30));
const settle = (world: World) => { while (world.units[0].action && !world.result) step(world, idle); };
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const amount = (world: World, start: string, i = 0) => Number(/deals (\d+)/.exec(logged(world, start)[i]!.text)![1]);
const attacks = (world: World, count: number) => { const before = logged(world, "attack deals").length; for (let i = 0; i < 400 && logged(world, "attack deals").length < before + count; i++) step(world, attacking); };

describe("Bard reads the wiki at level 20", () => {
  it("Cosmic Binding, Caretaker's Shrine and Tempered Fate", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 7, cost: 60, castTime: 0.25, delivery: { kind: "line", range: 850, width: 120, speed: 1500 } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cost: 70, charges: { max: 2, recharge: 18 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 80, cost: 100, castTime: 0.5, delivery: { kind: "circle", range: 3400, radius: 350, delay: 0.5 } });
    expect(spec.abilities.some((a) => a.slot === "E")).toBe(false);
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(500, { ap: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
    expect(w.units[0].spec.budget?.healing?.(w.units[0], w.units[1])).toBeGreaterThan(0);
  });
});

describe("Meeps", () => {
  it("with 40 Chimes: 3 Meeps, each attack spending one for 78 (30 + 6 per 5 Chimes) (+ 40% AP) and a 35% slow for 1 s", () => {
    const w = worldFor(450, { ap: 100 });
    step(w, idle);
    attacks(w, 1);
    expect(amount(w, "Meep deals")).toBe(78 + 40);
    expect(w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "slow")?.value).toBeCloseTo(0.35);
    attacks(w, 3);
    expect(logged(w, "Meep deals")).toHaveLength(3);
  });

  it("one comes back every 6 s; with no Chimes, one Meep of 30 that doesn't slow", () => {
    const w = worldFor(450);
    step(w, idle);
    attacks(w, 3);
    wait(w, 6.1);
    attacks(w, 2);
    expect(logged(w, "Meep deals")).toHaveLength(4);
    const none = worldFor(450, {}, 0);
    step(none, idle);
    attacks(none, 2);
    expect(logged(none, "Meep deals")).toHaveLength(1);
    expect(amount(none, "Meep deals")).toBe(30);
    expect(none.units[1].statuses.some((s) => s.kind === "cc" && s.key === "slow")).toBe(false);
  });
});

describe("Cosmic Binding", () => {
  it("240 (+ 80% AP) and a 60% slow for 1.8 s; with the wall 300 behind the enemy, a stun", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    cast(w, "Q");
    wait(w, 0.7);
    expect(amount(w, "Cosmic Binding deals")).toBe(240 + 80);
    const stun = w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "stun")!;
    expect((stun.endTick - stun.startTick) / 30).toBeCloseTo(1.8);
    const open = worldFor(500, {}, undefined, false);
    step(open, idle);
    cast(open, "Q");
    wait(open, 0.7);
    expect(open.units[1].statuses.find((s) => s.kind === "cc" && s.key === "slow")?.value).toBeCloseTo(0.6);
    expect(open.units[1].statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(false);
  });
});

describe("Caretaker's Shrine", () => {
  it("collected at full power 5 s later: 200 (+ 70% AP) healing and 30% (+ 6% per 100 AP) movement speed decaying over 1.5 s", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    w.units[0].hp = 1000;
    cast(w, "W");
    settle(w);
    wait(w, 4.5);
    expect(w.units[0].hp).toBeCloseTo(1000);
    wait(w, 0.8);
    expect(w.units[0].hp - 1000).toBeCloseTo(270);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:bard:shrineMove")?.value).toBeGreaterThan(0.25);
    wait(w, 1.6);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:bard:shrineMove")?.value ?? 0).toBe(0);
  });
});

describe("Tempered Fate", () => {
  it("only to get away: then 0.5 s later the enemy is in stasis and stunned for 2.5 s", () => {
    const w = worldFor(500);
    step(w, idle);
    expect(canCast(w, w.units[0], ability(w, "R"))).toBe(false);
    const view = (mode: "fight" | "flee") => ({ world: w, self: w.units[0], enemy: w.units[1], mode, distance: 500 - 130, threats: [] });
    expect(w.units[0].spec.behavior!(view("fight"))).not.toEqual({ kind: "cast", ability: "R" });
    expect(w.units[0].spec.behavior!(view("flee"))).toEqual({ kind: "cast", ability: "R" });
    cast(w, "R");
    settle(w);
    wait(w, 0.6);
    expect(ccTypes(w.units[1]).has("stasis")).toBe(true);
    const stun = w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "stun")!;
    expect((stun.endTick - stun.startTick) / 30).toBeCloseTo(2.5);
    expect(derive(w.units[0]).maxHp).toBeGreaterThan(0);
  });
});
