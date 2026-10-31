import { describe, expect, it } from "vitest";
import { attackRange, canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { ccTypes, derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Milio");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
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
const onSelf = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[0], effect, { scale: 1 });

describe("Milio reads the wiki at level 20", () => {
  it("Ultra Mega Fire Kick, Cozy Campfire, Warm Hugs and Breath of Life", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 10, cost: 70, castTime: 0.25, delivery: { kind: "line", range: 1200, width: 120, speed: 1200 } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 21, cost: 130, castTime: 0.25 });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 0.5, cost: 90, charges: { max: 2, recharge: 13 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 130, cost: 100, castTime: 0 });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(500, { ap: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
    expect(w.units[0].spec.budget?.healing?.(w.units[0], w.units[1])).toBeGreaterThan(0);
  });
});

describe("Fired Up!", () => {
  it("his own shield enchants his next hit for 4 s: 15% of his AD as magic damage and a 54.7 (10 – 50 by level) (+ 20% AP) burn over 1.5 s", () => {
    const w = worldFor(400, { ap: 100 });
    step(w, idle);
    cast(w, "E");
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(amount(w, "Fired Up! deals")).toBe(Math.round(0.15 * derive(w.units[0]).ad));
    wait(w, 2);
    const burned = logged(w, "Fired Up! (burn) deals").map((e) => Number(/deals (\d+)/.exec(e.text)![1])).reduce((a, b) => a + b, 0);
    expect(burned).toBeCloseTo(54.7059 + 20, -1);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Fired Up! deals")).toHaveLength(1);
  });

  it("the enchantment fades after 4 s", () => {
    const w = worldFor(400);
    step(w, idle);
    cast(w, "E");
    wait(w, 4.1);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Fired Up!")).toHaveLength(0);
  });
});

describe("Ultra Mega Fire Kick", () => {
  it("after 0.25 s, knocks the enemy back 190 over 1 s, then explodes for 320 (+ 120% AP) and a 60% (+ 5% per 100 AP) slow for 1.5 s, and refunds half its cost", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    const x = w.units[1].x;
    const mana = w.units[0].resource;
    cast(w, "Q");
    settle(w);
    wait(w, 0.4);
    expect(ccTypes(w.units[1]).has("airborne")).toBe(true);
    wait(w, 1.2);
    expect(w.units[1].x - x).toBeCloseTo(190, -1);
    expect(amount(w, "Ultra Mega Fire Kick deals")).toBe(320 + 120);
    expect(w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "slow")?.value).toBeCloseTo(0.65);
    expect(mana - w.units[0].resource).toBeCloseTo(35);
  });
});

describe("Cozy Campfire", () => {
  it("6 s of 20% more of his base attack range and 6 (+ 0.6% AP) healing every 0.264 s", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    const range = attackRange(w.units[0]);
    w.units[0].hp = 1000;
    cast(w, "W");
    settle(w);
    expect(attackRange(w.units[0]) - range).toBeCloseTo(0.2 * 525);
    wait(w, 6.1);
    expect(w.units[0].hp - 1000).toBeCloseTo(22 * 6.6, -1);
    expect(attackRange(w.units[0])).toBeCloseTo(range);
  });
});

describe("Warm Hugs", () => {
  it("a 165 (+ 45% AP) shield and 20% movement speed for 2.5 s, on two charges", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    cast(w, "E");
    expect(w.units[0].statuses.find((s) => s.kind === "shield")?.value).toBeCloseTo(210);
    wait(w, 0.6);
    expect(castable(w, "E")).toBe(true);
    cast(w, "E");
    wait(w, 0.6);
    expect(castable(w, "E")).toBe(false);
  });
});

describe("Breath of Life", () => {
  it("heals 350 (+ 50% AP), cleanses a root and gives 65% tenacity; no other cast for 0.75 s", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    w.units[0].hp = 1000;
    onSelf(w, { type: "cc", cc: "root", duration: 3 });
    cast(w, "R");
    expect(w.units[0].hp - 1000).toBeCloseTo(400);
    expect(ccTypes(w.units[0]).has("root")).toBe(false);
    expect(derive(w.units[0]).tenacity).toBeCloseTo(0.65);
    expect(castable(w, "Q")).toBe(false);
    wait(w, 0.8);
    expect(castable(w, "Q")).toBe(true);
  });
});
