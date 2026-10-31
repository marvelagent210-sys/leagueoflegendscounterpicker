import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { damagePet, petsOf } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Shaco");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const attacking: [Behavior, Behavior] = [() => ({ kind: "attack" }), () => undefined];
const HP = 20000;
const worldFor = (distance = 300, bonus: BonusStats = {}): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
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
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const ccOn = (world: World, key: string) => world.units[1].statuses.find((s) => s.kind === "cc" && s.key === key);
const seconds = (status: { startTick: number; endTick: number }) => (status.endTick - status.startTick) / 30;
/** Attacks until one lands. */
const attackOnce = (world: World) => { for (let i = 0; i < 60 && logged(world, "attack deals").length === 0; i++) step(world, attacking); };
const BACKSTAB = 31.1765;

describe("Shaco reads the wiki at level 20", () => {
  it("Deceive, Jack in the Box, Two-Shiv Poison and Hallucinate", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 11, cost: 40, castTime: 0.125, delivery: { kind: "blink", direction: "toward", distance: 400, through: true } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 15, cost: 50, castTime: 0.25 });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 8, cost: 75, castTime: 0.25, delivery: { kind: "target", range: 625, missileSpeed: 1500 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 80, cost: 100, castTime: 0.25 });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(300, { ad: 100, ap: 100 });
    const hint = w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]);
    expect(hint?.magic).toBeGreaterThan(0);
    expect(hint?.physical).toBeGreaterThan(0);
  });
});

describe("Backstab", () => {
  it("attacks on an enemy facing away deal 20 – 30 (by level, 31.2 at 20) (+ 20% bonus AD) more", () => {
    const front = worldFor(150, { ad: 100 });
    attackHit(front, front.units[0], front.units[1], false, []);
    const back = worldFor(150, { ad: 100 });
    back.units[1].facing = 1;
    attackHit(back, back.units[0], back.units[1], false, []);
    expect(Math.abs(amount(back, "attack deals") - amount(front, "attack deals") - (BACKSTAB + 20))).toBeLessThanOrEqual(1);
  });

  it("is affected by critical strikes", () => {
    const back = worldFor(150, { critChance: 1 });
    back.units[1].facing = 1;
    attackHit(back, back.units[0], back.units[1], false, []);
    const d = derive(back.units[0]);
    expect(amount(back, "attack deals")).toBe(Math.round((d.ad + BACKSTAB) * d.critDamage));
  });
});

describe("Deceive", () => {
  it("Shaco turns invisible for 3.5 s and 0.125 s later blinks past the enemy", () => {
    const w = worldFor(300);
    step(w, idle);
    cast(w, "Q");
    expect(hasState(w.units[0], "invisible")).toBe(true);
    wait(w, 0.2);
    expect(w.units[0].x).toBeGreaterThan(w.units[1].x);
    wait(w, 3.4);
    expect(hasState(w.units[0], "invisible")).toBe(false);
  });

  it("the attack that breaks it deals 65 (+ 60% bonus AD) more and, from behind, critically strikes for 160%", () => {
    const w = worldFor(300, { ad: 100 });
    step(w, idle);
    cast(w, "Q");
    wait(w, 0.2);
    attackOnce(w);
    const d = derive(w.units[0]);
    expect(amount(w, "attack deals")).toBe(Math.round(1.6 * (d.ad + 65 + 60 + BACKSTAB + 20)));
    expect(hasState(w.units[0], "invisible")).toBe(false);
  });

  it("thrown from invisibility, Two-Shiv Poison breaks it and the attack right after is still empowered", () => {
    const w = worldFor(300);
    step(w, idle);
    cast(w, "Q");
    wait(w, 0.2);
    cast(w, "E");
    settle(w);
    expect(hasState(w.units[0], "invisible")).toBe(false);
    attackOnce(w);
    expect(amount(w, "attack deals")).toBe(Math.round(1.6 * (derive(w.units[0]).ad + 65 + BACKSTAB)));
  });

  it("the empowerment lasts only 0.25 s after the break", () => {
    const w = worldFor(300);
    step(w, idle);
    cast(w, "Q");
    wait(w, 0.2);
    cast(w, "E");
    settle(w);
    wait(w, 0.5);
    w.units[1].facing = -1;
    w.units[0].x = w.units[1].x - 150;
    attackOnce(w);
    expect(amount(w, "attack deals")).toBe(Math.round(derive(w.units[0]).ad));
  });
});

describe("Two-Shiv Poison", () => {
  it("while it is ready, his attacks slow by 30% for 2 s", () => {
    const w = worldFor(150);
    attackHit(w, w.units[0], w.units[1], false, []);
    const slow = ccOn(w, "slow")!;
    expect(slow.value).toBeCloseTo(0.3);
    expect(seconds(slow)).toBeCloseTo(2);
    w.units[1].statuses = [];
    w.units[0].cooldownReady.E = w.tick + 100;
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(ccOn(w, "slow")).toBeUndefined();
  });

  it("the dagger deals 170 (+ 80% bonus AD) (+ 60% AP) and slows by 30% for 3 s; 50% more below 30% health", () => {
    const w = worldFor(500, { ad: 100, ap: 100 });
    step(w, idle);
    cast(w, "E");
    wait(w, 0.6);
    expect(amount(w, "Two-Shiv Poison deals")).toBe(170 + 80 + 60);
    const slow = ccOn(w, "slow")!;
    expect(slow.value).toBeCloseTo(0.3);
    expect(seconds(slow)).toBeCloseTo(3);
    const low = worldFor(500, { ad: 100, ap: 100 });
    step(low, idle);
    low.units[1].hp = HP * 0.25;
    cast(low, "E");
    wait(low, 0.6);
    expect(amount(low, "Two-Shiv Poison deals")).toBe(255 + 120 + 90);
  });

  it("from behind, 15 – 50 (by level, 54.1 at 20) (+ 10% AP) more", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    w.units[1].facing = 1;
    cast(w, "E");
    wait(w, 0.6);
    expect(amount(w, "Two-Shiv Poison (backstab) deals")).toBe(Math.round(54.1176 + 10));
  });
});

describe("Jack in the Box", () => {
  it("arms over 2 s, then fears for 1.5 s and roots for 1 s, sets speed to 100 and fires 85 (+ 18% AP) every 0.5 s for 5 s", () => {
    const w = worldFor(300, { ap: 100 });
    step(w, idle);
    cast(w, "W");
    settle(w);
    wait(w, 1.6);
    expect(ccOn(w, "fear")).toBeUndefined();
    wait(w, 0.5);
    expect(seconds(ccOn(w, "fear")!)).toBeCloseTo(1.5);
    expect(seconds(ccOn(w, "root")!)).toBeCloseTo(1);
    wait(w, 0.2);
    expect(w.units[1].statuses.find((s) => s.kind === "state" && s.key === "moveSpeedOverride")?.value).toBe(100);
    wait(w, 5.5);
    expect(amount(w, "Jack in the Box deals")).toBe(85 + 18);
    expect(logged(w, "Jack in the Box deals").length).toBeGreaterThanOrEqual(9);
    expect(logged(w, "Jack in the Box deals").length).toBeLessThanOrEqual(11);
  });
});

describe("Hallucinate", () => {
  it("Shaco vanishes for 0.5 s; his clone has his current health (worth 1.5 times less) and hits for 60% of his attack damage", () => {
    const w = worldFor(300);
    step(w, idle);
    w.units[0].hp = 1500;
    cast(w, "R");
    settle(w);
    const clone = petsOf(w, 0, "clone")[0]!;
    expect(clone.hp).toBeCloseTo(1000);
    expect(hasState(w.units[0], "invisible")).toBe(true);
    wait(w, 0.6);
    expect(hasState(w.units[0], "invisible")).toBe(false);
    wait(w, 2);
    expect(amount(w, "Hallucination deals")).toBe(Math.round(0.6 * derive(w.units[0]).ad));
  });

  it("killed, it bursts for 300 (+ 70% AP) and drops mini-boxes that fear for 1 s, root for 0.5 s and fire three shots of 75 (+ 15% AP)", () => {
    const w = worldFor(200, { ap: 100 });
    step(w, idle);
    cast(w, "R");
    settle(w);
    damagePet(w, w.units[1], petsOf(w, 0, "clone")[0]!, 1e6, "true", false);
    expect(amount(w, "Hallucinate (explosion) deals")).toBe(300 + 70);
    expect(seconds(ccOn(w, "fear")!)).toBeCloseTo(1);
    expect(seconds(ccOn(w, "root")!)).toBeCloseTo(0.5);
    wait(w, 1);
    expect(logged(w, "Mini-Boxes deals").length % 3).toBe(0);
    expect(amount(w, "Mini-Boxes deals")).toBe(75 + 15);
  });

  it("it also bursts when its 18 s run out", () => {
    const w = worldFor(200);
    step(w, idle);
    cast(w, "R");
    settle(w);
    wait(w, 17.5);
    expect(logged(w, "Hallucinate (explosion)")).toHaveLength(0);
    wait(w, 1);
    expect(logged(w, "Hallucinate (explosion)")).toHaveLength(1);
    expect(petsOf(w, 0, "clone")).toHaveLength(0);
  });
});

describe("Shaco's behavior", () => {
  it("opens with Deceive, then a box under the enemy and the clone", () => {
    const w = worldFor(300);
    step(w, idle);
    const view = { world: w, self: w.units[0], enemy: w.units[1], mode: "fight" as const, distance: 300 - 130, threats: [] };
    expect(w.units[0].spec.behavior!(view)).toEqual({ kind: "cast", ability: "Q" });
    w.units[0].cooldownReady.Q = 1e9;
    expect(w.units[0].spec.behavior!(view)).toEqual({ kind: "cast", ability: "W" });
    w.units[0].cooldownReady.W = 1e9;
    expect(w.units[0].spec.behavior!(view)).toEqual({ kind: "cast", ability: "R" });
    expect(canCast(w, w.units[0], ability(w, "E"))).toBe(true);
  });
});
