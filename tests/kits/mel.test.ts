import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { ability as abilityOf, fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Mel");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const BOLT: AbilitySpec = abilityOf({ key: "Q", delivery: { kind: "line", range: 1200, width: 80, speed: 1500 }, onHit: [{ type: "damage", damageType: "physical", amount: { base: 400 } }, { type: "cc", cc: "stun", duration: 1 }], flags: { projectile: true } });
const worldFor = (distance = 500, bonus: BonusStats = {}, hp = HP, armor = 0): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp, armor, mr: 0, hpRegen: 0, moveSpeed: 0 }, abilities: [BOLT] })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
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
const stacks = (world: World) => world.units[1].statuses.find((s) => s.kind === "mark" && s.key === "mel:overwhelm")?.value ?? 0;

describe("Mel reads the wiki at level 20", () => {
  it("Radiant Volley, Rebuttal, Solar Snare and Golden Eclipse", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 6, cost: 90, castTime: 0.35, delivery: { kind: "circle", range: 950, radius: 250 } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 26, cost: 0, castTime: 0 });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 9, cost: 90, castTime: 0.25, delivery: { kind: "line", range: 1000, width: 140, speed: 1100 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 80, cost: 100, castTime: 0.75 });
    expect(spec.abilities.find((a) => a.key === "R")?.onHit?.[0]).toMatchObject({ amount: { base: 275, ratios: { AP: 0.3 } } });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(500, { ap: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
  });
});

describe("Overwhelm", () => {
  it("each damage instance adds a stack for 5 s", () => {
    const w = worldFor(400);
    attackHit(w, w.units[0], w.units[1], false, []);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(stacks(w)).toBe(2);
    wait(w, 5.1);
    expect(stacks(w)).toBe(0);
  });

  it("once the store, 80 (+ 10% AP) and 5 (+ 0.75% AP) a stack, exceeds the enemy's health and shields, the next instance deals it", () => {
    // Heavy armor keeps her attacks from finishing the enemy themselves.
    const w = worldFor(400, { ap: 100 }, 400, 5000);
    for (let i = 0; i < 3; i++) attackHit(w, w.units[0], w.units[1], false, []);
    w.units[1].hp = 100;
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Overwhelm deals")[0]?.text).toContain(`${Math.round(90 + 2 * 5.75)} magic`);
  });
});

describe("Searing Brilliance", () => {
  it("each cast loads 3 projectiles (up to 9) onto her next attack, 32.6 (8 – 30 by level) (+ 4% AP) each", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    for (const key of ["Q", "E", "W", "Q"]) {
      w.units[0].cooldownReady[key] = 0;
      cast(w, key);
      settle(w);
    }
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Searing Brilliance (projectile) deals")).toHaveLength(9);
    expect(amount(w, "Searing Brilliance (projectile) deals")).toBe(Math.round(32.5882 + 4));
  });
});

describe("Radiant Volley", () => {
  it("ten bolts over 0.5 s: 160 (+ 55% AP), then 13 (+ 5% AP) each", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    cast(w, "Q");
    settle(w);
    wait(w, 1);
    expect(logged(w, "Radiant Volley deals")).toHaveLength(10);
    expect(amount(w, "Radiant Volley deals")).toBe(160 + 55);
    expect(amount(w, "Radiant Volley deals", 1)).toBe(13 + 5);
  });
});

describe("Rebuttal", () => {
  it("a 200 (+ 70% AP) shield for 0.75 s and 40% movement speed decaying", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    cast(w, "W");
    step(w, idle);
    const shield = w.units[0].statuses.find((s) => s.kind === "shield")!;
    expect(shield.value).toBeCloseTo(270);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:mel:rebuttal")?.value).toBeGreaterThan(0.3);
    wait(w, 0.8);
    expect(w.units[0].statuses.some((s) => s.memoKey === "buff:mel:rebuttal" && s.value > 0)).toBe(false);
  });

  it("an enemy projectile reaching the barrier is destroyed and sent back with 60% (+ 5% per 100 AP) of its damage, physical first reduced to 70%, and its effects", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    startCast(w, w.units[1], w.units[1].spec.abilities[0]!);
    wait(w, 0.15);
    cast(w, "W");
    wait(w, 1);
    expect(w.units[0].hp).toBeGreaterThan(0);
    expect(logged(w, "Rebuttal (replica) deals")[0]?.text).toContain(`${Math.round(0.7 * 0.65 * 400)} magic`);
    expect(w.units[1].statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(true);
    expect(w.units[0].statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(false);
  });
});

describe("Solar Snare", () => {
  it("240 (+ 70% AP) and a 1.5 s root", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    cast(w, "E");
    settle(w);
    wait(w, 0.7);
    expect(amount(w, "Solar Snare deals")).toBe(240 + 70);
    const root = w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "root")!;
    expect((root.endTick - root.startTick) / 30).toBeCloseTo(1.5);
  });
});

describe("Golden Eclipse", () => {
  it("needs an Overwhelmed enemy, and blasts it for 275 (+ 30% AP) (+ 10 (+ 4% AP) per stack)", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    expect(castable(w, "R")).toBe(false);
    attackHit(w, w.units[0], w.units[1], false, []);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(castable(w, "R")).toBe(true);
    cast(w, "R");
    settle(w);
    wait(w, 0.1);
    expect(amount(w, "Golden Eclipse deals")).toBe(Math.round(275 + 30 + 2 * (10 + 4)));
  });
});
