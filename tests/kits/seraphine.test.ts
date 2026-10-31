import { describe, expect, it } from "vitest";
import { attackRange, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Seraphine");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const attacking: [Behavior, Behavior] = [() => ({ kind: "attack" }), () => undefined];
const HP = 20000;
const worldFor = (distance = 600, bonus: BonusStats = {}): World => {
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
const ccOn = (world: World, key: string) => world.units[1].statuses.filter((s) => s.kind === "cc" && s.key === key).at(-1);
const casted = (world: World, name: string) => logged(world, `casts ${name}`).length;

describe("Seraphine reads the wiki at level 20", () => {
  it("High Note, Surround Sound, Beat Drop and Encore", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 6, cost: 100, castTime: 0.25, delivery: { kind: "circle", range: 900, radius: 350, speed: 1300 } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 22, cost: 90, castTime: 0.25, moveWhileCasting: true });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 11, cost: 60, castTime: 0.25, delivery: { kind: "line", range: 1300, width: 140, speed: 1200 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 120, cost: 100, castTime: 0.5, delivery: { kind: "line", range: 1300, width: 320, speed: 1600 } });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(600, { ap: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
  });
});

describe("Echo", () => {
  it("her first basic ability echoes for free; the third one after it echoes again", () => {
    const w = worldFor(600);
    step(w, idle);
    const mana = w.units[0].resource;
    cast(w, "W");
    settle(w);
    wait(w, 0.1);
    expect(casted(w, "Surround Sound (echo)")).toBe(1);
    expect(mana - w.units[0].resource).toBeCloseTo(90);
    for (const key of ["E", "Q"]) { cast(w, key); settle(w); wait(w, 0.1); }
    expect(casted(w, "Beat Drop (echo)") + casted(w, "High Note (echo)")).toBe(0);
    w.units[0].cooldownReady.E = 0;
    cast(w, "E");
    settle(w);
    wait(w, 0.1);
    expect(casted(w, "Beat Drop (echo)")).toBe(1);
  });
});

describe("Harmony", () => {
  it("each cast gives a Note (up to 4); her next attack, 25 longer per Note and uncancellable, fires them for 27.5 (4 – 25 by level) (+ 4% AP) each", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    const range = attackRange(w.units[0]);
    cast(w, "Q");
    settle(w);
    wait(w, 0.1);
    expect(attackRange(w.units[0]) - range).toBeCloseTo(50);
    for (let i = 0; i < 90 && logged(w, "Stage Presence (Note) deals").length === 0; i++) step(w, attacking);
    expect(logged(w, "Stage Presence (Note) deals")).toHaveLength(2);
    expect(amount(w, "Stage Presence (Note) deals")).toBe(Math.round(27.4706 + 4));
    expect(attackRange(w.units[0])).toBeCloseTo(range);
  });
});

describe("High Note", () => {
  it("160 (+ 40% AP), up to 75% more at 75% missing health", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    w.units[0].memory["seraphine:echoStacks"] = 0;
    onTarget(w, { type: "cc", cc: "root", duration: 3 });
    cast(w, "Q");
    settle(w);
    wait(w, 1);
    expect(amount(w, "High Note deals")).toBe(160 + 40);
    const low = worldFor(600, { ap: 100 });
    step(low, idle);
    low.units[0].memory["seraphine:echoStacks"] = 0;
    low.units[1].hp = 0.25 * HP;
    onTarget(low, { type: "cc", cc: "root", duration: 3 });
    cast(low, "Q");
    settle(low);
    wait(low, 1);
    expect(amount(low, "High Note deals")).toBe(Math.round(1.75 * 200));
  });
});

describe("Surround Sound", () => {
  it("a 140 (+ 20% AP) shield for 2.5 s with 20% (+ 2% per 100 AP) decaying speed; cast over a shield, it heals 16% of missing health after", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    w.units[0].hp = 1000;
    cast(w, "W");
    settle(w);
    step(w, idle);
    expect(w.units[0].statuses.find((s) => s.kind === "shield")?.value).toBeCloseTo(160);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:seraphine:sound")?.value).toBeGreaterThan(0.2);
    // The echo arrives over the first shield: a heal 2.5 s later.
    const hp = w.units[0].hp;
    wait(w, 2.6);
    expect(w.units[0].hp - hp).toBeCloseTo(0.16 * (derive(w.units[0]).maxHp - hp), -1);
  });
});

describe("Beat Drop", () => {
  it("190 (+ 50% AP) and a 99% slow for 1.5 s; a slowed enemy is rooted too, an immobilized one stunned", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    w.units[0].memory["seraphine:echoStacks"] = 0;
    cast(w, "E");
    settle(w);
    wait(w, 0.6);
    expect(amount(w, "Beat Drop deals")).toBe(190 + 50);
    expect(ccOn(w, "slow")?.value).toBeCloseTo(0.99);
    expect(ccOn(w, "root")).toBeUndefined();
    const slowed = worldFor(600);
    step(slowed, idle);
    slowed.units[0].memory["seraphine:echoStacks"] = 0;
    onTarget(slowed, { type: "cc", cc: "slow", strength: 0.2, duration: 3 });
    cast(slowed, "E");
    settle(slowed);
    wait(slowed, 0.6);
    expect((ccOn(slowed, "root")!.endTick - ccOn(slowed, "root")!.startTick) / 30).toBeCloseTo(1.5);
    const held = worldFor(600);
    step(held, idle);
    held.units[0].memory["seraphine:echoStacks"] = 0;
    onTarget(held, { type: "cc", cc: "root", duration: 3 });
    cast(held, "E");
    settle(held);
    wait(held, 0.6);
    expect(ccOn(held, "stun")).toBeDefined();
  });
});

describe("Encore", () => {
  it("250 (+ 40% AP), a 1.75 s charm, and a slow from 40% rising 15% every 0.25 s to 99%", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    cast(w, "R");
    settle(w);
    wait(w, 0.4);
    expect(amount(w, "Encore deals")).toBe(250 + 40);
    expect((ccOn(w, "charm")!.endTick - ccOn(w, "charm")!.startTick) / 30).toBeCloseTo(1.75, 1);
    expect(ccOn(w, "slow")?.value).toBeCloseTo(0.4, 1);
    wait(w, 1.2);
    expect(ccOn(w, "slow")?.value).toBeCloseTo(0.99, 2);
  });
});
