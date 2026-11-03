import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Qiyana");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const worldFor = (distance = 300, bonus: BonusStats = {}): World => {
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
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const element = (world: World) => String(world.units[0].memory["qiyana:element"] ?? "terrain");
const bonusAD = (world: World) => derive(world.units[0]).ad - world.units[0].spec.base.ad;

describe("Qiyana reads the wiki at level 20", () => {
  it("Edge of Ixtal, Elemental Wrath, Terrashape, Audacity and Supreme Display of Talent", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 7, castTime: 0.25, delivery: { kind: "line", range: 525, width: 140 } });
    expect(spec.abilities.find((a) => a.key === "Q")?.onHit).toEqual([{ type: "damage", damageType: "physical", amount: { base: 190, ratios: { bonusAD: 0.9 } } }]);
    expect(spec.abilities.find((a) => a.key === "QE")).toMatchObject({ cooldownKey: "Q", delivery: { kind: "line", range: 865, width: 200, speed: 1600 } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 7, delivery: { kind: "dash", distance: 300, speed: 440 } });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 7, delivery: { kind: "dash", direction: "target", distance: 650, hitRadius: 250 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 120, castTime: 0.25, delivery: { kind: "line", range: 875, width: 280, speed: 2000 } });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(300, { ad: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).physical).toBeGreaterThan(0);
  });
});

describe("Elements", () => {
  it("she starts holding Terrain: 35% attack speed, 25 range and 40 (+ 20% bonus AD) magic damage on hit", () => {
    const w = worldFor(150, { ad: 100 });
    step(w, idle);
    expect(element(w)).toBe("terrain");
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:qiyana:elementSpeed")?.value).toBeCloseTo(0.35);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:qiyana:elementRange")?.value).toBe(25);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Terrashape deals")[0]?.text).toContain(`${Math.round(40 + 0.2 * bonusAD(w))} magic`);
  });

  it("Elemental Wrath spends the Element; Terrashape gathers another and resets the blade", () => {
    const w = worldFor(500);
    step(w, idle);
    expect(castable(w, "Q")).toBe(false);
    cast(w, "QE");
    settle(w);
    expect(element(w)).toBe("");
    expect(castable(w, "QE")).toBe(false);
    cast(w, "W", { direction: 1, distance: 0 });
    settle(w);
    expect(element(w)).toBe("river");
    expect(castable(w, "QE")).toBe(true);
  });

  it("River roots for 0.5 s then slows by 20%; Terrain deals 60% more below half health", () => {
    const river = worldFor(500);
    step(river, idle);
    river.units[0].memory["qiyana:element"] = "river";
    onTarget(river, { type: "cc", cc: "stun", duration: 1 });
    cast(river, "QE");
    wait(river, 1);
    expect(river.units[1].statuses.some((s) => s.key === "root")).toBe(true);
    const terrain = worldFor(500);
    step(terrain, idle);
    terrain.units[1].hp = HP * 0.4;
    onTarget(terrain, { type: "cc", cc: "stun", duration: 1 });
    cast(terrain, "QE");
    wait(terrain, 1);
    expect(logged(terrain, "Elemental Wrath deals 304 physical")).toHaveLength(1);
  });
});

describe("Royal Privilege and Audacity", () => {
  it("83 (+ 25% bonus AD) more physical damage, once per 25 s; gathering a different Element resets it", () => {
    const w = worldFor(150, { ad: 100 });
    step(w, idle);
    attackHit(w, w.units[0], w.units[1], false, []);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Royal Privilege deals")).toHaveLength(1);
    expect(logged(w, "Royal Privilege deals")[0]?.text).toContain(`${Math.round(83 + 68 / 17 * 2 + 0.25 * bonusAD(w))} physical`);
    w.units[0].memory["qiyana:element"] = "";
    cast(w, "W", { direction: 1, distance: 0 });
    settle(w);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Royal Privilege deals")).toHaveLength(2);
  });

  it("Audacity dashes at the enemy and hits it if within 250 on arrival", () => {
    const w = worldFor(500);
    cast(w, "E");
    settle(w);
    expect(logged(w, "Audacity deals 210 physical")).toHaveLength(1);
  });
});

describe("Supreme Display of Talent", () => {
  it("knocks back 375 into a shockwave of 300 (+ 10% of maximum health) that stuns for 0.5 s", () => {
    const w = worldFor(300);
    onTarget(w, { type: "cc", cc: "root", duration: 0.5 });
    const x = w.units[1].x;
    cast(w, "R");
    wait(w, 1);
    expect(w.units[1].x - x).toBeCloseTo(375, -1);
    expect(logged(w, "Supreme Display of Talent (shockwave) deals")[0]?.text).toContain(`${Math.round(300 + 0.1 * HP)} physical`);
    expect(w.units[1].statuses.find((s) => s.key === "stun")).toBeDefined();
  });
});
