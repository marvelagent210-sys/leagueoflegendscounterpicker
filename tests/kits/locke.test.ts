import { describe, expect, it } from "vitest";
import { attackRange, canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Locke");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const attacking: [Behavior, Behavior] = [() => ({ kind: "attack" }), () => undefined];
const HP = 20000;
const STAKE = 44.1176;
const worldFor = (distance = 500, bonus: BonusStats = {}): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
  world.units[1].x = world.units[0].x + distance;
  return world;
};
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string, aim?: Aim) => startCast(world, world.units[0], ability(world, key), aim);
const castable = (world: World, key: string) => canCast(world, world.units[0], ability(world, key));
const through = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, idle); };
const wait = (world: World, seconds: number) => through(world, world.tick + Math.round(seconds * 30));
const settle = (world: World) => { while (world.units[0].action && !world.result) step(world, idle); };
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const amount = (world: World, start: string, i = 0) => Number(/deals (\d+)/.exec(logged(world, start)[i]!.text)![1]);
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const nails = (world: World) => world.units[1].statuses.find((s) => s.kind === "mark" && s.key === "locke:nails")?.value ?? 0;
const slowOf = (world: World) => world.units[1].statuses.filter((s) => s.kind === "cc" && s.key === "slow").at(-1);
/** Throws a nail and waits for it to land. */
const nail = (world: World, key: string) => { cast(world, key); wait(world, 0.6); };

describe("Locke reads the wiki at level 20", () => {
  it("Ritual Nails, Soul Ignition, Ashen Pursuit and Purgatory", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 6, cost: 70, castTime: 0.25, chainCooldown: "first", delivery: { kind: "line", range: 950, width: 100, speed: 1650 } });
    expect(spec.abilities.find((a) => a.key === "Q3")).toMatchObject({ cost: 0, chain: { root: "Q", index: 3, window: 4, delay: 0.5 } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 14, cost: 70 });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 10, cost: 70, castTime: 0.5, delivery: { kind: "blink", distance: 375 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 80, cost: 100, castTime: 0.5, delivery: { kind: "circle", range: 950, radius: 400, delay: 0.75 } });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(500, { ap: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
  });
});

describe("Silver Stake", () => {
  it("44.1 (+ 10% AP) magic damage on hit, doubled from 70% missing health", () => {
    const w = worldFor(100, { ap: 100 });
    attackHit(w, w.units[0], w.units[1], false, []);
    // The attack lands first, so the enemy is a little hurt.
    expect(Math.abs(amount(w, "Silver Stake deals") - (STAKE + 10))).toBeLessThanOrEqual(1);
    w.units[1].hp = 0.25 * HP;
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(amount(w, "Silver Stake deals", 1)).toBe(Math.round(2 * (STAKE + 10)));
  });
});

describe("Ritual Nails", () => {
  it("72 (+ 20% AP), a 25% slow for 1 s and a Soul Nail; the second slows by 60% for 2 s; three nails, 0.5 s apart", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    nail(w, "Q");
    expect(amount(w, "Ritual Nails deals")).toBe(72 + 20);
    expect(slowOf(w)?.value).toBeCloseTo(0.25);
    expect(nails(w)).toBe(1);
    nail(w, "Q2");
    const heavy = slowOf(w)!;
    expect(heavy.value).toBeCloseTo(0.6);
    expect((heavy.endTick - heavy.startTick) / 30).toBeCloseTo(2);
    nail(w, "Q3");
    expect(nails(w)).toBe(3);
    expect(castable(w, "Q2") || castable(w, "Q3")).toBe(false);
  });

  it("an attack consumes the Soul Nails: 210 (+ 147% AP) for three", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    for (const key of ["Q", "Q2", "Q3"]) nail(w, key);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(amount(w, "Ritual Nails (Soul Nails) deals")).toBe(210 + 147);
    expect(nails(w)).toBe(0);
  });

  it("each nail left unused refunds 36.8% (20 – 35 by level) of the cooldown and cost", () => {
    const w = worldFor(500);
    step(w, idle);
    nail(w, "Q");
    const mana = w.units[0].resource;
    wait(w, 3.2);
    expect(castable(w, "Q")).toBe(false);
    wait(w, 0.6);
    // Two unused nails take 4.4 s off a 6 s cooldown with 2 s left: it is ready, and 51.5 mana comes back.
    expect(castable(w, "Q")).toBe(true);
    expect(w.units[0].resource - mana).toBeCloseTo(2 * 0.3676 * 70, 0);
  });
});

describe("Soul Ignition", () => {
  it("6 s ghosted with 73.5% attack speed and 40% (+ 2% per 100 AP) movement speed, decaying to 20% after 1.5 s", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    cast(w, "W");
    step(w, idle);
    expect(hasState(w.units[0], "ghosted")).toBe(true);
    expect(w.units[0].statuses.find((s) => s.kind === "stat" && s.key === "attackSpeed")?.value).toBeCloseTo(0.7353, 3);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:locke:ignite")?.value).toBeCloseTo(0.42);
    wait(w, 2.6);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:locke:ignite")?.value).toBeCloseTo(0.2);
  });
});

describe("Ashen Pursuit", () => {
  it("blinks up to 375 for 80 (+ 40% AP) around him; his next attack gains 275 range and strikes for 120 (+ 40% AP) instead, ending beside the enemy", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    const range = attackRange(w.units[0]);
    cast(w, "E", { direction: 1, distance: 300 });
    settle(w);
    expect(logged(w, "Ashen Pursuit deals")).toHaveLength(0);
    wait(w, 0.2);
    expect(attackRange(w.units[0]) - range).toBeCloseTo(275);
    for (let i = 0; i < 60 && logged(w, "Ashen Pursuit (dash)").length === 0; i++) step(w, attacking);
    expect(amount(w, "Ashen Pursuit (dash) deals")).toBe(120 + 40);
    expect(logged(w, "attack deals")).toHaveLength(0);
    expect(Math.abs(w.units[1].x - w.units[0].x)).toBeLessThan(100);
    expect(attackRange(w.units[0])).toBeCloseTo(range);
  });

  it("the blink strikes an enemy within 250 of where Locke lands", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    cast(w, "E", { direction: 1, distance: 375 });
    settle(w);
    expect(amount(w, "Ashen Pursuit deals")).toBe(80 + 40);
  });
});

describe("Purgatory", () => {
  it("0.75 s later nails enemies within 400 for 300 (+ 60% AP), slows by 99% decaying, and marks them to execute below 12%", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 3 });
    cast(w, "R");
    settle(w);
    wait(w, 0.8);
    expect(amount(w, "Purgatory deals")).toBe(300 + 60);
    expect(slowOf(w)?.value).toBeCloseTo(0.99);
    w.units[1].hp = 0.13 * HP;
    step(w, idle);
    expect(w.units[1].alive).toBe(true);
    w.units[1].hp = 0.11 * HP;
    step(w, idle);
    expect(w.units[1].alive && w.units[1].hp > 0).toBe(false);
  });
});

describe("Locke's levels", () => {
  it("his attack damage is that of level 20", () => {
    expect(derive(worldFor().units[0]).ad).toBeGreaterThan(100);
  });
});
