import { describe, expect, it } from "vitest";
import { attackRange, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Yuumi");
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
const through = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, idle); };
const wait = (world: World, seconds: number) => through(world, world.tick + Math.round(seconds * 30));
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const amount = (world: World, start: string, i = 0) => Number(/deals (\d+)/.exec(logged(world, start)[i]!.text)![1]);
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });

describe("Yuumi reads the wiki at level 20", () => {
  it("Prowling Projectile, Zoomies and Final Chapter; You and Me! needs an ally", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 6.5, cost: 75, delivery: { kind: "line", range: 850, width: 120, speed: 950 } });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 10, cost: 120 });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 100, cost: 100, channel: { duration: 3.5, pulses: { base: 5 }, mobile: true, range: 1100 } });
    expect(spec.abilities.some((a) => a.slot === "W")).toBe(false);
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(500, { ap: 100 });
    expect(w.units[0].spec.budget?.healing?.(w.units[0], w.units[1])).toBeGreaterThan(0);
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
  });
});

describe("Feline Friendship", () => {
  it("every 8 s her next attack gains 50 range and heals her for 120.6 (20 – 110 by level) (+ 30% AP)", () => {
    const w = worldFor(400, { ap: 100 });
    step(w, idle);
    const range = attackRange(w.units[0]) - 50;
    expect(attackRange(w.units[0]) - range).toBeCloseTo(50);
    w.units[0].hp = 1000;
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(w.units[0].hp - 1000).toBeCloseTo(120.5882 + 30, 0);
    step(w, idle);
    expect(attackRange(w.units[0])).toBeCloseTo(range);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(w.units[0].hp - 1000).toBeCloseTo(150.5882, 0);
    wait(w, 8.1);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(w.units[0].hp - 1000).toBeCloseTo(2 * 150.5882, 0);
  });

  it("Prowling Projectile's hit consumes it too", () => {
    const w = worldFor(500);
    step(w, idle);
    w.units[0].hp = 1000;
    cast(w, "Q");
    wait(w, 0.6);
    expect(w.units[0].hp).toBeGreaterThan(1100);
  });
});

describe("Prowling Projectile", () => {
  it("235 (+ 20% AP) and a 20% slow for 1 s", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    cast(w, "Q");
    wait(w, 0.6);
    expect(amount(w, "Prowling Projectile deals")).toBe(235 + 20);
    const slow = w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "slow")!;
    expect(slow.value).toBeCloseTo(0.2);
    expect((slow.endTick - slow.startTick) / 30).toBeCloseTo(1);
  });
});

describe("Zoomies", () => {
  it("a 165 (+ 40% AP) shield and 35% (+ 8% per 100 AP) attack speed for 3 s, with 20% movement speed while the shield holds", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    cast(w, "E");
    step(w, idle);
    expect(w.units[0].statuses.find((s) => s.kind === "shield")?.value).toBeCloseTo(205);
    expect(w.units[0].statuses.find((s) => s.kind === "stat" && s.key === "attackSpeed")?.value).toBeCloseTo(0.43);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:yuumi:zoom")?.value).toBeCloseTo(0.2);
    w.units[0].statuses = w.units[0].statuses.filter((s) => s.kind !== "shield");
    step(w, idle);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:yuumi:zoom")?.value ?? 0).toBe(0);
  });
});

describe("Final Chapter", () => {
  it("5 waves over 3.5 s, ghosted: 175 (+ 25% AP) then 43.75 (+ 6.25% AP) each, slowing 10% more each hit up to 50%", () => {
    const w = worldFor(800, { ap: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 5 });
    cast(w, "R");
    expect(hasState(w.units[0], "ghosted")).toBe(true);
    wait(w, 3.6);
    expect(logged(w, "Final Chapter deals")).toHaveLength(5);
    expect(amount(w, "Final Chapter deals")).toBe(175 + 25);
    expect(amount(w, "Final Chapter deals", 1)).toBe(Math.round(43.75 + 6.25));
    expect(w.units[1].statuses.filter((s) => s.kind === "cc" && s.key === "slow").at(-1)?.value).toBeCloseTo(0.5);
    expect(derive(w.units[0]).moveSpeed).toBeGreaterThan(0);
  });
});
