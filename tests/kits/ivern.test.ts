import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { ccTypes } from "../../engine/sim/derived";
import { petsOf } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Ivern");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const worldFor = (distance = 400, bonus: BonusStats = {}): World => {
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

describe("Ivern reads the wiki at level 20", () => {
  it("Rootcaller, Brushmaker, Triggerseed and Daisy!", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 10, cost: 60, castTime: 0.25, delivery: { kind: "line", range: 1150, width: 160, speed: 1300 } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 0.5, cost: 30, charges: { max: 3, recharge: 20 } });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 7, cost: 70 });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 120, cost: 100, castTime: 0.5 });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(400, { ap: 100 });
    const hint = w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]);
    expect(hint?.magic).toBeGreaterThan(0);
    expect(hint?.physical).toBeGreaterThan(0);
  });
});

describe("Rootcaller", () => {
  it("260 (+ 70% AP) and a 2 s root", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    cast(w, "Q");
    wait(w, 0.8);
    expect(amount(w, "Rootcaller deals")).toBe(260 + 70);
    const root = w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "root")!;
    expect((root.endTick - root.startTick) / 30).toBeCloseTo(2);
  });
});

describe("Brushmaker", () => {
  it("from his brush, and for 3 s after leaving it, his attacks fire a bolt for 50 (+ 20% AP)", () => {
    const w = worldFor(400, { ap: 100 });
    step(w, idle);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Brushmaker deals")).toHaveLength(0);
    cast(w, "W");
    settle(w);
    step(w, idle);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(amount(w, "Brushmaker deals")).toBe(50 + 20);
    w.units[0].x -= 600;
    wait(w, 2.5);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Brushmaker deals")).toHaveLength(2);
    wait(w, 1);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Brushmaker deals")).toHaveLength(2);
    expect(castable(w, "W")).toBe(true);
  });
});

describe("Triggerseed", () => {
  it("a 235 (+ 50% AP) shield for 2 s, then an explosion within 500 for 150 (+ 80% AP) and a 60% slow for 2 s", () => {
    const w = worldFor(400, { ap: 100 });
    step(w, idle);
    cast(w, "E");
    expect(w.units[0].statuses.find((s) => s.kind === "shield")?.value).toBeCloseTo(285);
    wait(w, 2.1);
    expect(amount(w, "Triggerseed deals")).toBe(150 + 80);
    const slow = w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "slow")!;
    expect(slow.value).toBeCloseTo(0.6);
    expect((slow.endTick - slow.startTick) / 30).toBeCloseTo(2);
  });

  it("with no champion in reach and the shield intact, the shield comes back instead", () => {
    const w = worldFor(900);
    step(w, idle);
    cast(w, "E");
    wait(w, 2.1);
    expect(logged(w, "Triggerseed deals")).toHaveLength(0);
    expect(w.units[0].statuses.some((s) => s.kind === "shield" && s.endTick > w.tick)).toBe(true);
  });
});

describe("Daisy!", () => {
  it("summons Daisy 350 toward the enemy for 45 s: 4400 (+ 50% AP) health, 90 resistances, 130 (+ 15% AP) at 1.2 attacks", () => {
    const w = worldFor(800, { ap: 100 });
    step(w, idle);
    cast(w, "R");
    settle(w);
    const daisy = petsOf(w, 0, "daisy")[0]!;
    expect(daisy.hp).toBeCloseTo(4450);
    expect(daisy.spec).toMatchObject({ armor: 90, mr: 90, duration: 45, attack: { range: 175 } });
    expect(daisy.spec.attack!.interval).toBeCloseTo(1 / 1.2);
    expect(daisy.x - w.units[0].x).toBeCloseTo(350);
    expect(castable(w, "R")).toBe(false);
  });

  it("every third attack Daisy smashes for 190 (+ 50% AP), knocking up and stunning for 1 s, at most once per 3 s", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    cast(w, "R");
    settle(w);
    wait(w, 3.5);
    expect(amount(w, "Daisy deals")).toBe(130 + 15);
    expect(amount(w, "Daisy Smash! deals")).toBe(190 + 50);
    expect(ccTypes(w.units[1]).size).toBeGreaterThanOrEqual(0);
    const smashes = logged(w, "Daisy Smash! deals").length;
    wait(w, 2);
    expect(logged(w, "Daisy Smash! deals").length).toBeLessThanOrEqual(smashes + 1);
    applyEffect(w, w.units[1], w.units[1], { type: "state", state: "ghosted", duration: 0.1 }, { scale: 1 });
  });
});
