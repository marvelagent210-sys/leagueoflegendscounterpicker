import { describe, expect, it } from "vitest";
import { canCast, chargesLeft, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { ccTypes } from "../../engine/sim/derived";
import { petsOf } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, Pet, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Azir");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const attacking: [Behavior, Behavior] = [() => ({ kind: "attack" }), () => undefined];
const HP = 20000;
const worldFor = (distance = 500, bonus: BonusStats = {}, moveSpeed = 0): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
  world.units[1].x = world.units[0].x + distance;
  return world;
};
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string, aim?: Aim) => startCast(world, world.units[0], ability(world, key), aim);
const castable = (world: World, key: string) => canCast(world, world.units[0], ability(world, key));
const through = (world: World, tick: number, behaviors = idle) => { while (world.tick < tick && !world.result) step(world, behaviors); };
const wait = (world: World, seconds: number, behaviors = idle) => through(world, world.tick + Math.round(seconds * 30), behaviors);
const settle = (world: World) => { while (world.units[0].action && !world.result) step(world, idle); };
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const amount = (world: World, start: string, i = 0) => Number(/deals (\d+)/.exec(logged(world, start)[i]!.text)![1]);
const soldiers = (world: World): Pet[] => petsOf(world, 0, "azir:soldier");
/** Attacks until a soldier's stab or his own attack lands. */
const swing = (world: World) => {
  const before = world.log.length;
  for (let i = 0; i < 200 && !world.log.slice(before).some((e) => e.side === 0 && /^(Sand Soldiers|attack) deals/.test(e.text)); i++) step(world, attacking);
};
const raise = (world: World, aim?: Aim) => { cast(world, "W", aim); settle(world); step(world, idle); };

describe("Azir reads the wiki at level 20", () => {
  it("Conquering Sands, Arise!, Shifting Sands and Emperor's Divide", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 6, cost: 110, castTime: 0.25, delivery: { kind: "circle", range: 740, radius: 150 } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 1.5, cost: 20, castTime: 0.25, charges: { max: 2, recharge: 6 } });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 16, cost: 60, castTime: 0, delivery: { kind: "dash", distance: 1100 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 90, cost: 100, castTime: 0.5, delivery: { kind: "area", near: -325, far: 400 } });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(500, { ap: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
  });
});

describe("Arise!", () => {
  it("raises an untargetable soldier toward the enemy, at most 525 away, for 10 s; 2 charges, one per 6 s, 1.5 s apart", () => {
    const w = worldFor(400);
    step(w, idle);
    raise(w);
    const [soldier] = soldiers(w);
    expect(soldier!.x - w.units[0].x).toBeCloseTo(400);
    expect(soldier!.spec.untargetable).toBe(true);
    expect((soldier!.endTick - w.tick) / 30).toBeCloseTo(10, 0);
    expect(castable(w, "W")).toBe(false);
    wait(w, 1.5);
    expect(castable(w, "W")).toBe(true);
    raise(w);
    expect(chargesLeft(w, w.units[0], ability(w, "W"))).toBe(0);
    wait(w, 9);
    expect(soldiers(w).filter((pet) => pet.endTick > w.tick)).toHaveLength(1);
    const far = worldFor(900);
    step(far, idle);
    raise(far);
    expect(soldiers(far)[0]!.x - far.units[0].x).toBeCloseTo(525);
  });

  it("attacking an enemy within 375 of a soldier, even past his own 525, the soldier stabs instead: 198 (88 + 110) (+ 65% AP) magic damage", () => {
    const w = worldFor(850, { ap: 100 });
    step(w, idle);
    raise(w);
    swing(w);
    expect(amount(w, "Sand Soldiers deals")).toBe(198 + 65);
    expect(logged(w, "attack deals")).toHaveLength(0);
  });

  it("each further soldier within reach stabs for 25%", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    raise(w);
    wait(w, 1.5);
    raise(w);
    swing(w);
    expect(logged(w, "Sand Soldiers deals").map((e) => Number(/deals (\d+)/.exec(e.text)![1]))).toEqual([263, Math.round(0.25 * 263)]);
  });

  it("soldiers more than 660 from him, or more than 375 from the enemy, leave the attack to him", () => {
    const w = worldFor(500);
    step(w, idle);
    raise(w);
    soldiers(w)[0]!.x = w.units[0].x - 700;
    swing(w);
    expect(logged(w, "Sand Soldiers deals")).toHaveLength(0);
    expect(logged(w, "attack deals")).toHaveLength(1);
    soldiers(w)[0]!.x = w.units[0].x - 300;
    swing(w);
    expect(logged(w, "Sand Soldiers deals")).toHaveLength(0);
  });
});

describe("Conquering Sands", () => {
  it("needs a soldier; they dash to the target location, about 50 beyond, for 155 (+ 55% AP) and a 25% slow for 1 s, once for all of them", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    expect(castable(w, "Q")).toBe(false);
    raise(w);
    wait(w, 1.5);
    raise(w);
    for (const soldier of soldiers(w)) soldier.x = w.units[0].x - 100;
    expect(castable(w, "Q")).toBe(true);
    cast(w, "Q");
    settle(w);
    wait(w, 1);
    expect(amount(w, "Conquering Sands deals")).toBe(155 + 55);
    expect(logged(w, "Conquering Sands deals")).toHaveLength(1);
    const slow = w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "slow")!;
    expect(slow.value).toBeCloseTo(0.25);
    expect((slow.endTick - slow.startTick) / 30).toBeCloseTo(1);
    for (const soldier of soldiers(w)) expect(soldier.x - w.units[0].x).toBeCloseTo(650);
  });
});

describe("Shifting Sands", () => {
  it("needs a soldier to fly to", () => {
    const w = worldFor(500);
    step(w, idle);
    const view = { world: w, self: w.units[0], enemy: w.units[1], mode: "flee" as const, distance: 500 - 130, threats: [] };
    expect(w.units[0].spec.behavior!(view)).toEqual({ kind: "cast", ability: "W", aim: { direction: -1, distance: 525 } });
    raise(w, { direction: -1, distance: 525 });
    const out = w.units[0].spec.behavior!(view);
    expect(out).toEqual({ kind: "cast", ability: "E", aim: { direction: -1, distance: 525 } });
    expect(castable(w, "E")).toBe(true);
  });

  it("a 230 (+ 60% AP) shield for 1.5 s; dashing into the enemy, he stops, deals 230 (+ 60% AP) and gains a soldier", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    raise(w);
    const soldier = soldiers(w)[0]!;
    soldier.x = w.units[1].x + 200;
    const stocked = chargesLeft(w, w.units[0], ability(w, "W"));
    w.units[0].memory["azir:eAim"] = soldier.id;
    cast(w, "E", { direction: 1, distance: 700 });
    const shield = w.units[0].statuses.find((s) => s.kind === "shield")!;
    expect(shield.value).toBeCloseTo(290);
    expect((shield.endTick - shield.startTick) / 30).toBeCloseTo(1.5);
    settle(w);
    expect(amount(w, "Shifting Sands deals")).toBe(230 + 60);
    expect(w.units[1].x - w.units[0].x).toBeLessThan(200);
    expect(chargesLeft(w, w.units[0], ability(w, "W"))).toBe(stocked + 1);
  });
});

describe("Emperor's Divide", () => {
  it("600 (+ 75% AP), knocked away over 1 s to 650 in front of him", () => {
    const w = worldFor(300, { ap: 100 });
    step(w, idle);
    cast(w, "R");
    settle(w);
    wait(w, 0.3);
    expect(amount(w, "Emperor's Divide deals")).toBe(600 + 75);
    expect(ccTypes(w.units[1]).has("airborne")).toBe(true);
    wait(w, 1.2);
    expect(w.units[1].x - w.units[0].x).toBeCloseTo(650, -1);
  });

  it("then the soldiers stand 400 in front of him as a wall the enemy can't cross, for 5 s", () => {
    const w = worldFor(300, {}, 340);
    step(w, idle);
    cast(w, "R");
    settle(w);
    wait(w, 1.5);
    const wall = w.terrain.find((t) => t.owner === 0)!;
    expect(wall.enemyOnly).toBe(true);
    expect((wall.from + wall.to) / 2 - w.units[0].x).toBeCloseTo(400);
    const toward: [Behavior, Behavior] = [() => undefined, () => ({ kind: "move", direction: 1 })];
    wait(w, 2.5, toward);
    expect(w.units[1].x - w.units[0].x).toBeGreaterThan(wall.to - w.units[0].x);
    wait(w, 3, toward);
    expect(w.units[1].x - w.units[0].x).toBeLessThan(300);
  });
});
