import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Yunara");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const attacking: [Behavior, Behavior] = [() => ({ kind: "attack" }), () => undefined];
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
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const unleash = (world: World) => Number(world.units[0].memory["yunara:unleash"] ?? 0);
const buff = (world: World, key: string) => world.units[0].statuses.find((s) => s.memoKey === `buff:${key}`)?.value ?? 0;
/** Lets her attack until `count` attacks have been declared. */
const attackTimes = (world: World, count: number) => { const before = logged(world, "attack deals").length; for (let i = 0; i < 400 && logged(world, "attack deals").length < before + count; i++) step(world, attacking); };

describe("Yunara reads the wiki at level 20", () => {
  it("Cultivation of Spirit, Arc of Judgment, Kanmei's Steps, Transcend One's Self and its upgrades", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 0, cost: 30 });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 10, cost: 60, castTime: 0.45, delivery: { kind: "line", range: 1150, width: 120, speed: 2150 } });
    expect(spec.abilities.find((a) => a.key === "WR")).toMatchObject({ cooldownKey: "W", cost: 0, castTime: 0.6, delivery: { kind: "line", range: 1150, width: 120 } });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 9, cost: 40 });
    expect(spec.abilities.find((a) => a.key === "ER")).toMatchObject({ cooldownKey: "E", delivery: { kind: "dash", distance: 450, minDistance: 225, speed: 1650 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 80, cost: 100 });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(500, { ad: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
  });
});

describe("Vow of the First Lands and Cultivation of Spirit's passive", () => {
  it("23 (+ 20% AP) magic on hit, and critical strikes add 10% (+ 10% per 100 AP) as magic damage", () => {
    const w = worldFor(400, { ap: 100, critChance: 1 });
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(amount(w, "Cultivation of Spirit deals")).toBe(23 + 20);
    const d = derive(w.units[0]);
    expect(amount(w, "Vow of the First Lands deals")).toBe(Math.round(0.2 * d.ad * d.critDamage));
  });

  it("attacks on a champion build 2 Unleash stacks, up to 8, lost one by one every 0.5 s after 6 s; Cultivation of Spirit needs all 8", () => {
    const w = worldFor(400);
    step(w, idle);
    attackTimes(w, 2);
    expect(unleash(w)).toBe(4);
    expect(castable(w, "Q")).toBe(false);
    attackTimes(w, 3);
    expect(unleash(w)).toBe(8);
    expect(castable(w, "Q")).toBe(true);
    wait(w, 6.6);
    expect(unleash(w)).toBeLessThan(8);
    expect(unleash(w)).toBeGreaterThan(4);
  });
});

describe("Cultivation of Spirit", () => {
  it("5 s of 60% attack speed, 46 (+ 40% AP) on hit, and a 40% shorter windup", () => {
    const w = worldFor(400, { ap: 100 });
    step(w, idle);
    w.units[0].memory["yunara:unleash"] = 8;
    const start = w.tick;
    cast(w, "Q");
    step(w, idle);
    expect(buff(w, "yunara:unleashed")).toBeCloseTo(0.6);
    expect(unleash(w)).toBe(0);
    step(w, attacking);
    const windup = w.units[0].action?.kind === "windup" ? w.units[0].action : undefined;
    expect(windup?.uncancellable).toBe(true);
    attackTimes(w, 1);
    expect(amount(w, "Cultivation of Spirit deals")).toBe(46 + 40);
    through(w, start + 5.1 * 30);
    expect(buff(w, "yunara:unleashed")).toBe(0);
  });
});

describe("Arc of Judgment", () => {
  it("215 (+ 85% bonus AD) (+ 50% AP), a 99% slow decaying, and four lingering ticks of 15% of it", () => {
    const w = worldFor(500, { ad: 100, ap: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 3 });
    cast(w, "W");
    settle(w);
    wait(w, 1.5);
    expect(amount(w, "Arc of Judgment deals")).toBe(Math.round(215 + 85 + 50));
    expect(logged(w, "Arc of Judgment (linger) deals")).toHaveLength(4);
    expect(amount(w, "Arc of Judgment (linger) deals")).toBe(Math.round(32.25 + 12.75 + 7.5));
  });

  it("its cast time falls from 0.45 s to 0.225 s at 100% bonus attack speed", () => {
    const w = worldFor(500, { attackSpeed: 2 });
    expect(ability(w, "W").castTimeFor!(w.units[0])).toBeCloseTo(0.225);
  });
});

describe("Kanmei's Steps", () => {
  it("1.5 s ghosted with 50% movement speed, 75% facing the enemy", () => {
    const w = worldFor(500);
    step(w, idle);
    cast(w, "E");
    step(w, idle);
    expect(hasState(w.units[0], "ghosted")).toBe(true);
    expect(buff(w, "yunara:steps")).toBeCloseTo(0.75);
    w.units[0].facing = -1;
    step(w, idle);
    expect(buff(w, "yunara:steps")).toBeCloseTo(0.5);
    wait(w, 1.5);
    expect(buff(w, "yunara:steps")).toBe(0);
  });
});

describe("Transcend One's Self", () => {
  it("15 s unleashed with Arc of Ruin and Untouchable Shadow; entering cuts Arc's cooldown by 80% and resets Steps", () => {
    const w = worldFor(500, { ad: 100, ap: 100 });
    step(w, idle);
    w.units[0].cooldownReady.W = w.tick + 300;
    w.units[0].cooldownReady.E = w.tick + 200;
    cast(w, "R");
    expect(w.units[0].cooldownReady.W).toBe(w.tick + 60);
    expect(w.units[0].cooldownReady.E).toBe(w.tick);
    step(w, idle);
    expect(buff(w, "yunara:unleashed")).toBeCloseTo(0.6);
    expect(castable(w, "E")).toBe(false);
    expect(castable(w, "ER")).toBe(true);
    wait(w, 2);
    onTarget(w, { type: "cc", cc: "root", duration: 3 });
    cast(w, "WR");
    settle(w);
    expect(amount(w, "Arc of Ruin deals")).toBe(480 + 120 + 75);
    expect(w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "slow")?.value).toBeCloseTo(0.99);
    wait(w, 13);
    expect(buff(w, "yunara:unleashed")).toBe(0);
    expect(castable(w, "WR")).toBe(false);
  });

  it("Untouchable Shadow dashes 225 – 450 and resets her attack", () => {
    const w = worldFor(500);
    step(w, idle);
    cast(w, "R");
    step(w, idle);
    w.units[0].attackReadyTick = w.tick + 60;
    const x = w.units[0].x;
    cast(w, "ER", { direction: -1, distance: 450 });
    expect(w.units[0].attackReadyTick).toBe(w.tick);
    settle(w);
    expect(x - w.units[0].x).toBeCloseTo(450);
  });
});
