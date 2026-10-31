import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { hijackedFormula } from "../../kits/champions/Sylas";
import { ability as abilityOf, fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Sylas");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const attacking: [Behavior, Behavior] = [() => ({ kind: "attack" }), () => undefined];
const HP = 20000;
const ULT: AbilitySpec = abilityOf({ key: "R", name: "Test Ultimate", slot: "R", cooldown: 100, cost: 100, delivery: { kind: "target", range: 600 }, onHit: [{ type: "damage", damageType: "physical", amount: { base: 100, ratios: { AD: 1, bonusAD: 0.5 } } }] });
const worldFor = (distance = 400, bonus: BonusStats = {}, abilities: AbilitySpec[] = []): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 }, abilities })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
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
const stacks = (world: World) => Number(world.units[0].memory["sylas:stacks"] ?? 0);

describe("Sylas reads the wiki at level 20", () => {
  it("Chain Lash, Kingslayer, Abscond, Abduct and Hijack", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 6, cost: 55, castTime: 0.4, delivery: { kind: "line", range: 775, width: 360 } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 6, cost: 90, delivery: { kind: "dash", direction: "target", distance: 400 } });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 9, cost: 65, delivery: { kind: "dash", distance: 400, speed: 1450 } });
    expect(spec.abilities.find((a) => a.key === "E2")).toMatchObject({ delivery: { kind: "line", range: 790, width: 120, speed: 2500 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 30, cost: 75, castTime: 0.25, delivery: { kind: "target", range: 950, missileSpeed: 2200 } });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(400, { ap: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
    expect(w.units[0].spec.budget?.healing?.(w.units[0], w.units[1])).toBeGreaterThan(0);
  });
});

describe("Petricite Burst", () => {
  it("each cast gives an Unshackled stack for 4 s, up to 3", () => {
    const w = worldFor(400);
    step(w, idle);
    for (const key of ["Q", "W", "E"]) {
      w.units[0].cooldownReady[key] = 0;
      cast(w, key, key === "E" ? { direction: -1, distance: 100 } : undefined);
      settle(w);
    }
    expect(stacks(w)).toBe(3);
    w.units[0].cooldownReady.Q = 0;
    cast(w, "Q");
    settle(w);
    expect(stacks(w)).toBe(3);
    wait(w, 4.1);
    expect(w.units[0].statuses.some((s) => s.memoKey === "buff:sylas:unshackled")).toBe(false);
  });

  it("an Unshackled attack has 125% attack speed and an uncancellable windup, and deals 130% AD (+ 30% AP) magic damage", () => {
    const w = worldFor(150, { ap: 100 });
    step(w, idle);
    cast(w, "Q");
    settle(w);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:sylas:unshackled")?.value).toBeCloseTo(1.25);
    for (let i = 0; i < 60 && logged(w, "Petricite Burst deals").length === 0; i++) step(w, attacking);
    expect(amount(w, "Petricite Burst deals")).toBe(Math.round(1.3 * derive(w.units[0]).ad + 30));
    expect(stacks(w)).toBe(0);
  });
});

describe("Chain Lash", () => {
  it("120 (+ 40% AP) and a 35% slow for 1.5 s, then 0.6 s later 280 (+ 80% AP) where the chains cross", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 3 });
    cast(w, "Q");
    settle(w);
    expect(amount(w, "Chain Lash deals")).toBe(120 + 40);
    const slow = w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "slow")!;
    expect(slow.value).toBeCloseTo(0.35);
    expect((slow.endTick - slow.startTick) / 30).toBeCloseTo(1.5);
    wait(w, 0.5);
    expect(logged(w, "Chain Lash (explosion)")).toHaveLength(0);
    wait(w, 0.2);
    expect(amount(w, "Chain Lash (explosion) deals")).toBe(280 + 80);
  });
});

describe("Kingslayer", () => {
  it("dashes to the enemy for 215 (+ 60% AP) and heals 100 (+ 30% AP) (+ 5% bonus health), doubled at 60% missing health", () => {
    const w = worldFor(350, { ap: 100 });
    step(w, idle);
    const max = derive(w.units[0]).maxHp;
    w.units[0].hp = 0.3 * max;
    const hp = w.units[0].hp;
    cast(w, "W");
    settle(w);
    expect(amount(w, "Kingslayer deals")).toBe(215 + 60);
    const bonusHealth = max - w.units[0].spec.base.hp;
    expect(w.units[0].hp - hp).toBeCloseTo(2 * (100 + 30 + 0.05 * bonusHealth), 0);
  });
});

describe("Abscond and Abduct", () => {
  it("Abduct opens 0.2 s after Abscond, for 3.5 s", () => {
    const w = worldFor(600);
    step(w, idle);
    expect(castable(w, "E2")).toBe(false);
    cast(w, "E", { direction: 1, distance: 100 });
    settle(w);
    wait(w, 0.2);
    expect(castable(w, "E2")).toBe(true);
    wait(w, 3.5);
    expect(castable(w, "E2")).toBe(false);
  });

  it("its chains deal 280 (+ 80% AP) and stun for 0.5 s; Sylas dashes in and knocks the enemy up for 0.5 s", () => {
    const w = worldFor(700, { ap: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 3 });
    cast(w, "E", { direction: 1, distance: 100 });
    settle(w);
    wait(w, 0.25);
    cast(w, "E2");
    wait(w, 0.6);
    expect(amount(w, "Abduct deals")).toBe(280 + 80);
    const stun = w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "stun")!;
    expect((stun.endTick - stun.startTick) / 30).toBeCloseTo(0.5, 1);
    settle(w);
    expect(Math.abs(w.units[1].x - w.units[0].x)).toBeLessThan(150);
    expect(w.units[1].statuses.some((s) => s.kind === "cc" && s.key === "airborne")).toBe(true);
  });
});

describe("Hijack", () => {
  it("turns attack damage ratios into ability power: 0.6% AP per 1% AD, 0.4% per 1% bonus AD", () => {
    expect(hijackedFormula({ base: 100, ratios: { AD: 1, bonusAD: 0.5 } }, 0.6, 0.4)).toEqual({ base: 100, ratios: { AP: 0.8 } });
    expect(hijackedFormula({ base: 0, products: [{ ratio: 0.001, stats: ["bonusAD", "targetMissingHP"] }] }, 0.6, 0.4)).toEqual({ base: 0, products: [{ ratio: 0.0004, stats: ["AP", "targetMissingHP"] }] });
  });

  it("steals the enemy's ultimate to cast once at no cost, scaling with Sylas's ability power", () => {
    const w = worldFor(500, { ap: 100 }, [ULT]);
    step(w, idle);
    cast(w, "R");
    settle(w);
    wait(w, 0.4);
    const stolen = ability(w, "RH");
    expect(stolen).toMatchObject({ cost: 0, name: "Hijack: Test Ultimate" });
    expect(castable(w, "R")).toBe(false);
    cast(w, "RH");
    settle(w);
    expect(amount(w, "Hijack: Test Ultimate deals")).toBe(100 + 80);
    expect(castable(w, "RH")).toBe(false);
    expect(w.units[0].cooldownReady.R).toBeGreaterThan(w.tick + 20 * 30);
  });

  it("an ultimate that scales with ability power keeps its ratios", () => {
    const ap: AbilitySpec = { ...ULT, onHit: [{ type: "damage", damageType: "magic", amount: { base: 100, ratios: { AP: 0.5, AD: 1 } } }] };
    const w = worldFor(500, {}, [ap]);
    step(w, idle);
    cast(w, "R");
    settle(w);
    wait(w, 0.4);
    expect(ability(w, "RH").onHit?.[0]).toMatchObject({ amount: { base: 100, ratios: { AP: 0.5, AD: 1 } } });
  });
});

describe("Sylas's behavior", () => {
  it("hijacks first in a fight", () => {
    const w = worldFor(500, {}, [ULT]);
    step(w, idle);
    const view = { world: w, self: w.units[0], enemy: w.units[1], mode: "fight" as const, distance: 500 - 130, threats: [] };
    expect(w.units[0].spec.behavior!(view)).toEqual({ kind: "cast", ability: "R" });
  });
});
