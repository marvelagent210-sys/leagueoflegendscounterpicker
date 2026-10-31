import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, dealDamage } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Zilean");
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
const castable = (world: World, key: string) => canCast(world, world.units[0], ability(world, key));
const through = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, idle); };
const wait = (world: World, seconds: number) => through(world, world.tick + Math.round(seconds * 30));
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const amount = (world: World, start: string, i = 0) => Number(/deals (\d+)/.exec(logged(world, start)[i]!.text)![1]);
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const bombed = (world: World) => world.units[1].statuses.some((s) => s.kind === "mark" && s.key === "zilean:bomb");
const stunOf = (world: World) => world.units[1].statuses.find((s) => s.kind === "cc" && s.key === "stun");

describe("Zilean reads the wiki at level 20", () => {
  it("Time Bomb, Rewind, Time Warp and Chronoshift", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 8, cost: 80, castTime: 0.25, delivery: { kind: "circle", range: 900, radius: 140, delay: 0.5 } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 6, cost: 35, castTime: 0 });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 15, cost: 50, delivery: { kind: "target", range: 550 } });
    expect(spec.abilities.find((a) => a.key === "ES")).toMatchObject({ cooldownKey: "E" });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 60, cost: 175, castTime: 0 });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(500, { ap: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
    expect(w.units[0].spec.budget?.healing?.(w.units[0], w.units[1])).toBeGreaterThan(0);
  });
});

describe("Time Bomb", () => {
  it("sticks to the enemy and explodes 3 s later for 300 (+ 90% AP)", () => {
    const w = worldFor(500, { ap: 100 });
    onTarget(w, { type: "cc", cc: "root", duration: 5 });
    cast(w, "Q");
    wait(w, 0.8);
    expect(bombed(w)).toBe(true);
    wait(w, 2.8);
    expect(logged(w, "Time Bomb deals")).toHaveLength(0);
    wait(w, 0.3);
    expect(amount(w, "Time Bomb deals")).toBe(300 + 90);
    expect(stunOf(w)).toBeUndefined();
    expect(bombed(w)).toBe(false);
  });

  it("a second bomb detonates the first at once and stuns for 1.5 s", () => {
    const w = worldFor(500);
    onTarget(w, { type: "cc", cc: "root", duration: 5 });
    cast(w, "Q");
    wait(w, 0.8);
    w.units[0].cooldownReady.Q = 0;
    cast(w, "Q");
    wait(w, 0.8);
    expect(logged(w, "Time Bomb deals")).toHaveLength(1);
    const stun = stunOf(w)!;
    expect((stun.endTick - stun.startTick) / 30).toBeCloseTo(1.5);
    expect(bombed(w)).toBe(false);
    wait(w, 3);
    expect(logged(w, "Time Bomb deals")).toHaveLength(1);
  });

  it("a spell shield stops the bomb sticking; the explosion reaches an untargetable holder", () => {
    const shielded = worldFor(500);
    onTarget(shielded, { type: "cc", cc: "root", duration: 5 });
    onTarget(shielded, { type: "state", state: "spellShield", duration: 2 });
    cast(shielded, "Q");
    wait(shielded, 0.8);
    expect(bombed(shielded)).toBe(false);
    const hidden = worldFor(500);
    onTarget(hidden, { type: "cc", cc: "root", duration: 5 });
    cast(hidden, "Q");
    wait(hidden, 0.8);
    onTarget(hidden, { type: "state", state: "untargetable", duration: 4 });
    wait(hidden, 3);
    expect(logged(hidden, "Time Bomb deals")).toHaveLength(1);
  });
});

describe("Rewind", () => {
  it("needs Time Bomb or Time Warp on cooldown, and takes 10 s off both", () => {
    const w = worldFor(500);
    step(w, idle);
    expect(castable(w, "W")).toBe(false);
    w.units[0].cooldownReady.Q = w.tick + 240;
    w.units[0].cooldownReady.E = w.tick + 450;
    expect(castable(w, "W")).toBe(true);
    cast(w, "W");
    expect(w.units[0].cooldownReady.Q).toBe(w.tick);
    expect(w.units[0].cooldownReady.E).toBe(w.tick + 150);
  });
});

describe("Time Warp", () => {
  it("slows the enemy by 99% for 2.5 s, or speeds Zilean up by 99%, on one cooldown", () => {
    const w = worldFor(500);
    step(w, idle);
    cast(w, "E");
    const slow = w.units[1].statuses.find((s) => s.kind === "cc" && s.key === "slow")!;
    expect(slow.value).toBeCloseTo(0.99);
    expect((slow.endTick - slow.startTick) / 30).toBeCloseTo(2.5);
    expect(castable(w, "ES")).toBe(false);
    const own = worldFor(500);
    step(own, idle);
    const speed = derive(own.units[0]).rawMoveSpeed;
    cast(own, "ES");
    expect(derive(own.units[0]).rawMoveSpeed).toBeCloseTo(speed * 1.99);
  });
});

describe("Chronoshift", () => {
  it("fatal damage within 5 s is 3 s of untargetable resurrection, then he revives healed for 1100 (+ 200% AP)", () => {
    const w = worldFor(500, { ap: 100 });
    step(w, idle);
    cast(w, "R");
    w.units[0].hp = 100;
    dealDamage(w, w.units[1], w.units[0], 5000, "true");
    expect(w.units[0].alive).toBe(true);
    expect(hasState(w.units[0], "untargetable")).toBe(true);
    expect(hasState(w.units[0], "invulnerable")).toBe(true);
    expect(w.units[0].hp).toBeCloseTo(1100 + 200);
    wait(w, 3.1);
    expect(hasState(w.units[0], "untargetable")).toBe(false);
    expect(w.units[0].hp).toBeCloseTo(1100 + 200);
  });

  it("without the rune, or after its 5 s, fatal damage kills", () => {
    const w = worldFor(500);
    step(w, idle);
    cast(w, "R");
    wait(w, 5.1);
    dealDamage(w, w.units[1], w.units[0], 1e5, "true");
    expect(w.units[0].alive && w.units[0].hp > 0).toBe(false);
  });
});

describe("Zilean's behavior", () => {
  const view = (w: World, mode: "fight" | "flee") => ({ world: w, self: w.units[0], enemy: w.units[1], mode, distance: 500 - 130, threats: [] });

  it("rewinds for the second bomb, hastens away when fleeing, and runes himself when low", () => {
    const w = worldFor(500);
    onTarget(w, { type: "cc", cc: "root", duration: 5 });
    cast(w, "Q");
    wait(w, 0.8);
    expect(w.units[0].spec.behavior!(view(w, "fight"))).toEqual({ kind: "cast", ability: "W" });
    expect(w.units[0].spec.behavior!(view(w, "flee"))).toEqual({ kind: "cast", ability: "ES" });
    w.units[0].hp = 0.2 * derive(w.units[0]).maxHp;
    expect(w.units[0].spec.behavior!(view(w, "fight"))).toEqual({ kind: "cast", ability: "R" });
  });
});
