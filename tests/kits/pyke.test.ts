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

const compiled = kit("Pyke");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const worldFor = (distance = 300, bonus: BonusStats = {}): World => {
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
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const bonusAD = (world: World) => derive(world.units[0]).ad - world.units[0].spec.base.ad;

describe("Pyke reads the wiki at level 20", () => {
  it("Bone Skewer, Ghostwater Dive, Phantom Undertow and Death from Below", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 8, cost: 90, castTime: 0.25, delivery: { kind: "line", range: 400, width: 200 } });
    expect(spec.abilities.find((a) => a.key === "QC")).toMatchObject({ cooldownKey: "Q", castTime: 1, moveWhileCasting: true, delivery: { kind: "line", range: 1100, width: 140, speed: 2000 } });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 11, delivery: { kind: "dash", distance: 550, speed: 3000, through: true } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 70, castTime: 0.5, delivery: { kind: "circle", range: 750, radius: 200 } });
    expect(spec.budget?.statMultipliers).toEqual({ hp: 0 });
  });
});

describe("Gift of the Drowned Ones", () => {
  it("bonus health becomes 1 AD per 14", () => {
    const plain = worldFor(2000);
    const w = worldFor(2000, { hp: 1400 });
    step(plain, idle);
    step(w, idle);
    expect(derive(w.units[0]).maxHp).toBeCloseTo(derive(plain.units[0]).maxHp);
    expect(derive(w.units[0]).ad - derive(plain.units[0]).ad).toBeCloseTo(100);
  });
});

describe("Bone Skewer", () => {
  it("a quick thrust within 400 for 300 (+ 75% bonus AD)", () => {
    const w = worldFor(300, { ad: 100 });
    step(w, idle);
    cast(w, "Q");
    settle(w);
    expect(logged(w, "Bone Skewer deals")[0]?.text).toContain(`${Math.round(300 + 0.75 * bonusAD(w))} physical`);
    expect(castable(w, "QC")).toBe(false);
  });

  it("charged, its reach grows from 400 at 0.4 s to 1100 at 1 s; it hooks, pulls, slows by 90% and refunds its mana", () => {
    const w = worldFor(900);
    onTarget(w, { type: "cc", cc: "stun", duration: 2 });
    w.units[0].memory["pyke:charge"] = 0.75;
    const mana = w.units[0].resource;
    const x = w.units[1].x;
    cast(w, "QC");
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:pyke:charging")?.value).toBeCloseTo(-0.2);
    settle(w);
    wait(w, 1);
    expect(logged(w, "Bone Skewer (harpoon) deals 300 physical")).toHaveLength(1);
    expect(w.units[1].x).toBeLessThan(x - 300);
    expect(w.units[1].statuses.some((s) => s.key === "slow" && s.value === 0.9)).toBe(true);
    expect(w.units[0].resource).toBeCloseTo(mana);
  });
});

describe("Phantom Undertow", () => {
  it("a 550 dash; 1 s later the phantom returns, stunning for 1.25 s and dealing 300 (+ 100% bonus AD)", () => {
    const w = worldFor(300, { ad: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 3 });
    cast(w, "E", { direction: 1, distance: 550 });
    settle(w);
    expect(hasState(w.units[0], "ghosted")).toBe(true);
    wait(w, 0.8);
    expect(logged(w, "Phantom Undertow deals")).toHaveLength(0);
    wait(w, 0.6);
    expect(logged(w, "Phantom Undertow deals")[0]?.text).toContain(`${Math.round(300 + bonusAD(w))} physical`);
    const stun = w.units[1].statuses.find((s) => s.key === "stun")!;
    expect((stun.endTick - stun.startTick) / 30).toBeCloseTo(1.25, 1);
  });
});

describe("Ghostwater Dive", () => {
  it("45% movement speed decaying over 5 s, ended by attacking or casting", () => {
    const w = worldFor(2000);
    cast(w, "W");
    step(w, idle);
    const early = Number(w.units[0].statuses.find((s) => s.memoKey === "buff:pyke:dive")?.value);
    expect(early).toBeCloseTo(0.45, 1);
    wait(w, 2.5);
    expect(Number(w.units[0].statuses.find((s) => s.memoKey === "buff:pyke:dive")?.value)).toBeCloseTo(0.225, 1);
    cast(w, "E", { direction: -1, distance: 550 });
    step(w, idle);
    expect(w.units[0].statuses.some((s) => s.memoKey === "buff:pyke:dive")).toBe(false);
  });
});

describe("Pyke's behavior", () => {
  it("dives away when fleeing, and takes Death from Below's execute when it's there", () => {
    const w = worldFor(500);
    step(w, idle);
    const behavior = w.units[0].spec.behavior!;
    const view = (mode: "flee" | "fight") => ({ world: w, self: w.units[0], enemy: w.units[1], mode, distance: 500 - 130, threats: [] });
    expect(behavior(view("flee"))).toEqual({ kind: "cast", ability: "W" });
    w.units[1].hp = 400;
    expect(behavior(view("fight"))).toEqual({ kind: "cast", ability: "R" });
  });
});

describe("Death from Below", () => {
  it("executes a champion below 550 (+ 80% bonus AD) (+ 1.5 per lethality), and Pyke blinks to it", () => {
    const w = worldFor(600, { ad: 100, lethality: 20 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "stun", duration: 2 });
    const bar = 550 + 0.8 * bonusAD(w) + 1.5 * 20;
    w.units[1].hp = bar - 10;
    cast(w, "R");
    wait(w, 0.7);
    expect(w.units[1].alive && w.units[1].hp > 0).toBe(false);
    expect(Math.abs(w.units[0].x - w.units[1].x)).toBeLessThan(100);
  });

  it("deals half the threshold above it", () => {
    const w = worldFor(600, { ad: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "stun", duration: 2 });
    cast(w, "R");
    wait(w, 0.7);
    expect(logged(w, "Death from Below deals")[0]?.text).toContain(`${Math.round(0.5 * (550 + 0.8 * bonusAD(w)))} physical`);
    attackHit(w, w.units[0], w.units[1], false, []);
  });
});
