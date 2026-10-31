import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect } from "../../engine/sim/combat";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Fiddlesticks");
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
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const ccOn = (world: World, key: string) => world.units[1].statuses.find((s) => s.kind === "cc" && s.key === key);
const seconds = (status: { startTick: number; endTick: number }) => (status.endTick - status.startTick) / 30;

describe("Fiddlesticks reads the wiki at level 20", () => {
  it("Terrify, Bountiful Harvest, Reap and Crowstorm", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 13, cost: 65, castTime: 0.35, delivery: { kind: "target", range: 575 } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 8, cost: 80, castTime: 0.25, channel: { duration: 2, pulses: { base: 8 }, range: 725 } });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 6, cost: 60, castTime: 0.4, delivery: { kind: "circle", range: 850 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 80, cost: 100, channel: { duration: 1.5 } });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(400, { ap: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
    expect(w.units[0].spec.budget?.healing?.(w.units[0], w.units[1])).toBeGreaterThan(0);
  });
});

describe("Terrify", () => {
  it("6% (+ 3% per 100 AP) of current health, at least 120, and a 2 s fear that slows by 90%", () => {
    const w = worldFor(400, { ap: 100 });
    step(w, idle);
    cast(w, "Q");
    settle(w);
    expect(amount(w, "Terrify deals")).toBe(Math.round(0.09 * HP));
    expect(seconds(ccOn(w, "fear")!)).toBeCloseTo(2);
    expect(ccOn(w, "slow")?.value).toBeCloseTo(0.9);
    const low = worldFor(400);
    step(low, idle);
    low.units[1].hp = 500;
    cast(low, "Q");
    settle(low);
    expect(amount(low, "Terrify deals")).toBe(120);
  });

  it("an enemy it feared can't be feared again for Terrify's cooldown, and takes double", () => {
    const w = worldFor(400);
    step(w, idle);
    cast(w, "Q");
    settle(w);
    wait(w, 2.1);
    w.units[1].statuses = [];
    w.units[0].cooldownReady.Q = 0;
    const hp = w.units[1].hp;
    cast(w, "Q");
    settle(w);
    expect(amount(w, "Terrify deals", 1)).toBe(Math.round(0.12 * hp));
    expect(ccOn(w, "fear")).toBeUndefined();
  });

  it("a spell shield that blocks it leaves no fear lock", () => {
    const w = worldFor(400);
    step(w, idle);
    onTarget(w, { type: "state", state: "spellShield", duration: 1 });
    cast(w, "Q");
    settle(w);
    w.units[0].cooldownReady.Q = 0;
    cast(w, "Q");
    settle(w);
    expect(amount(w, "Terrify deals")).toBe(Math.round(0.06 * HP));
    expect(ccOn(w, "fear")).toBeDefined();
  });
});

describe("Bountiful Harvest", () => {
  it("drains 45 (+ 11.25% AP) every 0.25 s for 2 s, the last also 22% of missing health, healing 55% of it before mitigation", () => {
    const w = worldFor(400, { ap: 100 });
    step(w, idle);
    w.units[1].hp = HP / 2;
    w.units[0].hp = 1000;
    cast(w, "W");
    settle(w);
    expect(logged(w, "Bountiful Harvest deals")).toHaveLength(8);
    expect(amount(w, "Bountiful Harvest deals")).toBe(Math.round(45 + 11.25));
    const last = amount(w, "Bountiful Harvest (last tick) deals");
    // 22% of the health missing just before it lands.
    expect(last).toBeCloseTo(0.22 * (HP - (w.units[1].hp + last)), -1);
    const drained = logged(w, "Bountiful Harvest").map((e) => Number(/deals (\d+)/.exec(e.text)![1])).reduce((a, b) => a + b, 0);
    expect(w.units[0].hp - 1000).toBeCloseTo(0.55 * drained, -1);
  });

  it("completed, 60% of its cooldown comes back; it needs an enemy within 650", () => {
    const w = worldFor(400);
    step(w, idle);
    cast(w, "W");
    settle(w);
    // The 8 s cooldown runs from the cast; after the 2 s channel, 60% of the 6 s left comes back.
    expect(w.units[0].cooldownReady.W! - w.tick).toBeCloseTo((8 - 2) * 30 * 0.4, -1);
    expect(castable(worldFor(800), "W")).toBe(false);
  });

  it("a spell shield blocks the tether, and walking past 725 breaks it", () => {
    const shielded = worldFor(400);
    step(shielded, idle);
    onTarget(shielded, { type: "state", state: "spellShield", duration: 1 });
    cast(shielded, "W");
    settle(shielded);
    expect(logged(shielded, "Bountiful Harvest deals")).toHaveLength(0);
    const w = worldFor(400);
    step(w, idle);
    cast(w, "W");
    wait(w, 0.8);
    w.units[1].x = w.units[0].x + 900;
    settle(w);
    expect(logged(w, "Bountiful Harvest deals").length).toBeLessThan(4);
    expect(logged(w, "Bountiful Harvest (last tick)")).toHaveLength(0);
  });
});

describe("Reap", () => {
  it("210 (+ 50% AP), a 50% slow and a silence, both for 1.25 s", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 2 });
    cast(w, "E");
    settle(w);
    wait(w, 0.1);
    expect(amount(w, "Reap deals")).toBe(210 + 50);
    expect(ccOn(w, "slow")?.value).toBeCloseTo(0.5);
    expect(seconds(ccOn(w, "silence")!)).toBeCloseTo(1.25, 1);
  });
});

describe("Crowstorm", () => {
  it("a 1.5 s channel, then a blink beside the enemy and 5 s of 87.5 (+ 12.5% AP) every 0.25 s within 600", () => {
    const w = worldFor(700, { ap: 100 });
    step(w, idle);
    cast(w, "R");
    wait(w, 1.4);
    expect(logged(w, "Crowstorm deals")).toHaveLength(0);
    wait(w, 0.3);
    expect(Math.abs(w.units[1].x - w.units[0].x)).toBeLessThan(200);
    wait(w, 5.2);
    expect(logged(w, "Crowstorm deals")).toHaveLength(20);
    expect(amount(w, "Crowstorm deals")).toBe(Math.round(87.5 + 12.5));
  });

  it("roots don't interrupt the channel; a stun does, and brings no storm", () => {
    const rooted = worldFor(700);
    step(rooted, idle);
    cast(rooted, "R");
    applyEffect(rooted, rooted.units[1], rooted.units[0], { type: "cc", cc: "root", duration: 0.5 }, { scale: 1 });
    wait(rooted, 2);
    expect(logged(rooted, "Crowstorm deals").length).toBeGreaterThan(0);
    const stunned = worldFor(700);
    step(stunned, idle);
    cast(stunned, "R");
    wait(stunned, 0.5);
    applyEffect(stunned, stunned.units[1], stunned.units[0], { type: "cc", cc: "stun", duration: 0.5 }, { scale: 1 });
    wait(stunned, 6);
    expect(logged(stunned, "Crowstorm deals")).toHaveLength(0);
  });
});

describe("Fiddlesticks' behavior", () => {
  it("channels Crowstorm when the enemy is within its blink", () => {
    const w = worldFor(700);
    step(w, idle);
    const view = { world: w, self: w.units[0], enemy: w.units[1], mode: "fight" as const, distance: 700 - 130, threats: [] };
    expect(w.units[0].spec.behavior!(view)).toEqual({ kind: "cast", ability: "R" });
  });
});
