import { describe, expect, it } from "vitest";
import { startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit, dealDamage } from "../../engine/sim/combat";
import { ccTypes, derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Renata");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const worldFor = (distance = 500, bonus: BonusStats = {}, enemy: Partial<FighterSpec["base"]> = {}): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0, ...enemy } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
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
const buffOf = (world: World, key: string) => world.units[0].statuses.find((s) => s.memoKey === `buff:${key}`)?.value ?? 0;

describe("Renata Glasc reads the wiki at level 20", () => {
  it("Handshake, Bailout, Loyalty Program and Hostile Takeover", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 16, cost: 80, castTime: 0.25, delivery: { kind: "line", range: 900, width: 140, speed: 1450 } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 24, cost: 80, castTime: 0 });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 10, cost: 110, castTime: 0.25, delivery: { kind: "line", range: 800, width: 220, speed: 1450 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 110, cost: 100, castTime: 0.75, delivery: { kind: "line", range: 2000, width: 500, speed: 650 } });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(500, { ap: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
  });
});

describe("Leverage", () => {
  it("an attack on an unmarked enemy deals 2% (+ 2% per 100 AP) of its maximum health; the mark lasts 6 s", () => {
    const w = worldFor(150, { ap: 100 });
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(amount(w, "Leverage deals")).toBe(Math.round(0.04 * HP));
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Leverage deals")).toHaveLength(1);
    wait(w, 6.1);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Leverage deals")).toHaveLength(2);
  });
});

describe("Handshake", () => {
  it("260 (+ 80% AP) and a 1 s root; the tether stops Renata's attacks and slows her by 30% until the root ends", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    cast(w, "Q");
    wait(w, 0.6);
    expect(amount(w, "Handshake deals")).toBe(260 + 80);
    expect(ccTypes(w.units[1]).has("root")).toBe(true);
    expect(hasState(w.units[0], "noAttacks")).toBe(true);
    expect(buffOf(w, "renata:tether")).toBeCloseTo(-0.3);
    wait(w, 1);
    expect(hasState(w.units[0], "noAttacks")).toBe(false);
    expect(buffOf(w, "renata:tether")).toBe(0);
  });

  it("a cleansed root ends the tether", () => {
    const w = worldFor(500);
    step(w, idle);
    cast(w, "Q");
    wait(w, 0.6);
    w.units[1].statuses = w.units[1].statuses.filter((s) => !(s.kind === "cc" && s.key === "root"));
    step(w, idle);
    expect(hasState(w.units[0], "noAttacks")).toBe(false);
  });
});

describe("Bailout", () => {
  it("30% (+ 1% per 100 AP) attack speed and 20% (+ 1% per 100 AP) movement speed facing the enemy, doubling over 5 s", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    cast(w, "W");
    step(w, idle);
    expect(buffOf(w, "renata:bailoutSpeed")).toBeCloseTo(0.31, 2);
    expect(buffOf(w, "renata:bailoutMove")).toBeCloseTo(0.21, 2);
    wait(w, 4.9);
    expect(buffOf(w, "renata:bailoutSpeed")).toBeCloseTo(0.62, 1);
    w.units[0].facing = -1;
    step(w, idle);
    expect(buffOf(w, "renata:bailoutSpeed")).toBe(0);
    wait(w, 0.5);
    w.units[0].facing = 1;
    step(w, idle);
    expect(buffOf(w, "renata:bailoutSpeed")).toBe(0);
  });

  it("fatal damage during it restores full health, then burns 10% of it every 0.264 s; only once per cast", () => {
    const w = worldFor(500);
    step(w, idle);
    cast(w, "W");
    const max = derive(w.units[0]).maxHp;
    dealDamage(w, w.units[1], w.units[0], 1e5, "true");
    expect(w.units[0].alive).toBe(true);
    expect(w.units[0].hp).toBeCloseTo(max);
    wait(w, 0.3);
    expect(w.units[0].hp).toBeCloseTo(0.9 * max);
    wait(w, 3);
    expect(w.units[0].alive && w.units[0].hp > 0).toBe(false);
  });

  it("a takedown while burning ends the burn at 20% health", () => {
    const w = worldFor(150, {}, { hp: 100 });
    step(w, idle);
    cast(w, "W");
    dealDamage(w, w.units[1], w.units[0], 1e5, "true");
    dealDamage(w, w.units[0], w.units[1], 1e5, "true");
    expect(w.units[1].alive && w.units[1].hp > 0).toBe(false);
    expect(w.units[0].hp).toBeCloseTo(0.2 * derive(w.units[0]).maxHp);
  });

  it("without it, fatal damage kills", () => {
    const w = worldFor(500);
    step(w, idle);
    dealDamage(w, w.units[1], w.units[0], 1e5, "true");
    expect(w.units[0].alive && w.units[0].hp > 0).toBe(false);
  });
});

describe("Loyalty Program", () => {
  it("shields Renata for 110 (+ 50% AP) for 3 s; its rockets strike an enemy within 325 at once for 185 (+ 55% AP), slowing by 30% for 2 s, once per cast", () => {
    const w = worldFor(250, { ap: 100 });
    step(w, idle);
    cast(w, "E");
    settle(w);
    const shield = w.units[0].statuses.find((s) => s.kind === "shield")!;
    expect(shield.value).toBeCloseTo(110 + 50);
    expect((shield.endTick - shield.startTick) / 30).toBeCloseTo(3);
    expect(amount(w, "Loyalty Program deals")).toBe(185 + 55);
    const slow = w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "slow")!;
    expect(slow.value).toBeCloseTo(0.3);
    expect((slow.endTick - slow.startTick) / 30).toBeCloseTo(2);
    wait(w, 1);
    expect(logged(w, "Loyalty Program deals")).toHaveLength(1);
  });

  it("farther away, its missile strikes", () => {
    const w = worldFor(700);
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 2 });
    cast(w, "E");
    settle(w);
    expect(logged(w, "Loyalty Program deals")).toHaveLength(0);
    wait(w, 0.6);
    expect(logged(w, "Loyalty Program deals")).toHaveLength(1);
  });
});

describe("Hostile Takeover", () => {
  it("sends the enemy berserk for 2.25 s with 100% bonus attack speed", () => {
    const w = worldFor(500);
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 3 });
    cast(w, "R");
    wait(w, 1.6);
    const berserk = w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "berserk")!;
    expect((berserk.endTick - berserk.startTick) / 30).toBeCloseTo(2.25, 1);
    expect(w.units[1].statuses.find((s) => s.kind === "stat" && s.key === "attackSpeed")?.value).toBeCloseTo(1);
  });
});

describe("Renata's behavior", () => {
  const view = (w: World) => ({ world: w, self: w.units[0], enemy: w.units[1], mode: "fight" as const, distance: Math.abs(w.units[1].x - w.units[0].x) - 130, threats: [] });

  it("opens with Bailout, and sends berserk only an enemy whose spells it would stop", () => {
    const w = worldFor(500);
    step(w, idle);
    expect(w.units[0].spec.behavior!(view(w))).toEqual({ kind: "cast", ability: "W" });
    w.units[0].cooldownReady.W = w.units[0].cooldownReady.Q = w.units[0].cooldownReady.E = 1e9;
    w.units[1].spec = { ...w.units[1].spec, bonus: { ad: 100 } };
    expect(w.units[0].spec.behavior!(view(w))).not.toEqual({ kind: "cast", ability: "R" });
    w.units[1].spec = { ...w.units[1].spec, bonus: { ap: 300 } };
    expect(w.units[0].spec.behavior!(view(w))).toEqual({ kind: "cast", ability: "R" });
  });
});
