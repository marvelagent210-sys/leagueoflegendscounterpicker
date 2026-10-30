import { describe, expect, it } from "vitest";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("RekSai");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const worldFor = (distance = 150, bonus: BonusStats = {}): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
  world.units[1].x = world.units[0].x + distance;
  return world;
};
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string) => startCast(world, world.units[0], ability(world, key));
const castable = (world: World, key: string) => canCast(world, world.units[0], ability(world, key));
const through = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, idle); };
const wait = (world: World, seconds: number) => through(world, world.tick + Math.round(seconds * 30));
const settle = (world: World) => { while (world.units[0].action && !world.result) step(world, idle); };
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const burrowed = (world: World) => world.units[0].memory["reksai:burrowed"] === true;

describe("Rek'Sai reads the wiki at level 20", () => {
  it("both forms' abilities and Void Rush", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 2, cooldownAfter: "empower" });
    expect(spec.abilities.find((a) => a.key === "Q")?.onSelf).toEqual([
      { type: "stat", stat: "attackSpeed", amount: { base: 0.35 }, duration: 3 },
      { type: "empower", attacks: 3, window: 3, uncancellable: true, resetAttack: true, onHit: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: 0.5 } }, canCrit: true, label: "Queen's Wrath" }] },
    ]);
    expect(spec.abilities.find((a) => a.key === "QB")).toMatchObject({ cooldown: 10, castTime: 0.125, delivery: { kind: "line", range: 1500, width: 130, speed: 1950 } });
    expect(spec.abilities.find((a) => a.key === "QB")?.onHit?.[0]).toEqual({ type: "damage", damageType: "magic", amount: { base: 170, ratios: { bonusAD: 0.25, AP: 0.7 } } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 4 });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 6, castTime: 0.25, delivery: { kind: "target", range: 225 } });
    expect(spec.abilities.find((a) => a.key === "EB")).toMatchObject({ cooldown: 14, delivery: { kind: "dash", distance: 850, speed: 500 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 80, castTime: 0.25, delivery: { kind: "target", range: 1500 } });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(150, { ad: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).physical).toBeGreaterThan(0);
    expect(w.units[0].spec.budget?.healing?.(w.units[0], w.units[1])).toBeGreaterThan(0);
  });
});

describe("Fury", () => {
  it("25 per attack, and per ability that hits, up to 100", () => {
    const w = worldFor();
    w.units[0].resource = 0;
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(w.units[0].resource).toBe(25);
    cast(w, "E");
    settle(w);
    expect(w.units[0].resource).toBe(50);
  });

  it("Queen's Wrath itself generates none", () => {
    const w = worldFor();
    w.units[0].resource = 0;
    cast(w, "Q");
    expect(w.units[0].resource).toBe(0);
  });

  it("burrowing turns it into healing over 3 s: 21.3% of maximum health at 100", () => {
    const w = worldFor(2000);
    const max = derive(w.units[0]).maxHp;
    w.units[0].hp = max / 2;
    cast(w, "W");
    wait(w, 3.2);
    // The wiki's level-20 value of its 9 – 20 (based on level)% series is 21.29%.
    expect(w.units[0].hp - max / 2).toBeCloseTo(0.21294 * max, -1);
    expect(w.units[0].resource).toBeCloseTo(0);
  });

  it("the heal stops at full health, keeping what Fury is left", () => {
    const w = worldFor(2000);
    cast(w, "W");
    wait(w, 3.2);
    expect(w.units[0].resource).toBe(100);
  });
});

describe("Burrow and Unburrow", () => {
  it("burrowed: 50 less attack range, ghosting, 25 movement speed, and no attacks", () => {
    const w = worldFor(2000);
    const range = w.units[0].spec.attack.range;
    const speed = derive(w.units[0]).moveSpeed;
    cast(w, "W");
    expect(burrowed(w)).toBe(true);
    expect(hasState(w.units[0], "ghosted")).toBe(true);
    expect(hasState(w.units[0], "noAttacks")).toBe(true);
    expect(derive(w.units[0]).moveSpeed).toBeGreaterThan(speed);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:reksai:burrowRange")?.value).toBe(-50);
    expect(range).toBe(175);
  });

  it("Unburrow comes 1 s after Burrow, knocks up within 220 for 1 s, and not the same target again for 6 s", () => {
    const w = worldFor(250);
    cast(w, "W");
    expect(castable(w, "WB")).toBe(false);
    wait(w, 1);
    cast(w, "WB");
    expect(logged(w, "Unburrow deals")).toHaveLength(1);
    expect(w.units[1].statuses.some((s) => s.key === "airborne")).toBe(true);
    expect(burrowed(w)).toBe(false);
    expect(hasState(w.units[0], "noAttacks")).toBe(true);
    wait(w, 4.1);
    cast(w, "W");
    wait(w, 1);
    cast(w, "WB");
    expect(w.units[1].statuses.some((s) => s.key === "airborne")).toBe(false);
    expect(logged(w, "Unburrow deals")).toHaveLength(2);
  });

  it("Burrow's cooldown starts when she unburrows", () => {
    const w = worldFor(250);
    cast(w, "W");
    wait(w, 2);
    cast(w, "WB");
    expect(w.units[0].cooldownReady.W).toBe(w.tick + 120);
  });
});

describe("Queen's Wrath and Furious Bite", () => {
  it("three empowered attacks of 50% AD more, each refreshing the 3 s", () => {
    const w = worldFor();
    cast(w, "Q");
    for (let i = 0; i < 4; i++) { startAttack(w, w.units[0]); settle(w); wait(w, 0.6); }
    expect(logged(w, "Queen's Wrath deals")).toHaveLength(3);
  });

  it("Furious Bite at full Fury: 120%, as true damage", () => {
    const full = worldFor();
    full.units[1].spec.base.armor = 100;
    cast(full, "E");
    settle(full);
    expect(logged(full, "Furious Bite deals 204 true")).toHaveLength(1);
    const less = worldFor();
    less.units[0].resource = 50;
    cast(less, "E");
    settle(less);
    expect(logged(less, "Furious Bite deals 170 physical")).toHaveLength(1);
  });
});

describe("Void Rush", () => {
  it("needs an enemy she has damaged in the last 5 s", () => {
    const w = worldFor(500);
    expect(castable(w, "R")).toBe(false);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(castable(w, "R")).toBe(true);
    wait(w, 5.1);
    expect(castable(w, "R")).toBe(false);
  });

  it("vanishes for 0.9 s, displacement immune, then pounces 125 through for 350 (+ 25% of maximum health)", () => {
    const w = worldFor(800);
    attackHit(w, w.units[0], w.units[1], false, []);
    cast(w, "R");
    expect(hasState(w.units[0], "displacementImmune")).toBe(true);
    settle(w);
    expect(hasState(w.units[0], "untargetable")).toBe(true);
    wait(w, 1);
    expect(logged(w, "Void Rush deals")[0]?.text).toContain(`${Math.round(350 + 0.25 * HP)} physical`);
    expect(w.units[0].x - w.units[1].x).toBeCloseTo(125);
    expect(hasState(w.units[0], "displacementImmune")).toBe(false);
  });

  it("deals nothing to an enemy untargetable when she arrives", () => {
    const w = worldFor(800);
    attackHit(w, w.units[0], w.units[1], false, []);
    cast(w, "R");
    settle(w);
    onTarget(w, { type: "state", state: "untargetable", duration: 3 });
    wait(w, 1);
    expect(logged(w, "Void Rush deals")).toHaveLength(0);
  });

  it("she always emerges unburrowed", () => {
    const w = worldFor(800);
    attackHit(w, w.units[0], w.units[1], false, []);
    cast(w, "W");
    cast(w, "R");
    settle(w);
    expect(burrowed(w)).toBe(false);
  });
});
