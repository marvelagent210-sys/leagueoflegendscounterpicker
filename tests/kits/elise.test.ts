import { describe, expect, it } from "vitest";
import { startAttack, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { petsOf } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Elise");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const worldFor = (distance = 400, bonus: BonusStats = {}): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
  world.units[1].x = world.units[0].x + distance;
  return world;
};
const ability = (world: World, key: string): AbilitySpec => {
  const all = [...world.units[0].spec.abilities, ...Object.values(world.units[0].spec.forms ?? {}).flatMap((f) => f.abilities)];
  return all.find((a) => a.key === key)!;
};
const cast = (world: World, key: string) => startCast(world, world.units[0], ability(world, key));
const through = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, idle); };
const wait = (world: World, seconds: number) => through(world, world.tick + Math.round(seconds * 30));
const settle = (world: World) => { while (world.units[0].action && !world.result) step(world, idle); };
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const spiderlings = (world: World) => petsOf(world, 0, "spiderling");
const stored = (world: World) => Number(world.units[0].memory["elise:stored"] ?? 5);
const toSpider = (world: World) => { cast(world, "R"); expect(world.units[0].spec.form).toBe("Spider Form"); };

describe("Elise reads the wiki at level 20", () => {
  it("both forms", () => {
    const spec = compiled.spec;
    expect(spec.attack).toMatchObject({ range: 550, ranged: true });
    expect(spec.forms?.["Spider Form"]?.attack).toMatchObject({ range: 125, ranged: false });
    expect(spec.forms?.["Spider Form"]?.base.moveSpeed).toBe(spec.base.moveSpeed + 25);
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 6, cost: 100, delivery: { kind: "target", range: 575, missileSpeed: 2200 } });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 10, delivery: { kind: "line", range: 1100, width: 110, speed: 1600 } });
    expect(spec.abilities.find((a) => a.key === "E")?.onHit?.[0]).toEqual({ type: "cc", cc: "stun", duration: 2.4 });
    const spider = spec.forms!["Spider Form"]!.abilities;
    expect(spider.find((a) => a.key === "QS")).toMatchObject({ delivery: { kind: "dash", direction: "target", distance: 475, speed: 1150 }, flags: { appliesOnHit: true } });
    expect(spider.find((a) => a.key === "WS")?.onSelf?.[0]).toEqual({ type: "stat", stat: "attackSpeed", amount: { base: 1.3 }, duration: 3 });
    expect(spider.find((a) => a.key === "ES")).toMatchObject({ cooldown: 18, cooldownAfter: "state" });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(400, { ap: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
    expect(w.units[0].spec.budget?.healing?.(w.units[0], w.units[1])).toBeGreaterThan(0);
  });
});

describe("Spiderlings", () => {
  it("five stored at the start come out in Spider Form, and go back in Human Form", () => {
    const w = worldFor(2000);
    expect(stored(w)).toBe(5);
    toSpider(w);
    expect(spiderlings(w)).toHaveLength(5);
    expect(spiderlings(w)[0]).toMatchObject({ hp: 390, spec: { armor: 90, mr: 110, moveSpeed: 350, areaTaken: 0.75 } });
    spiderlings(w)[0]!.hp = 0;
    w.pets = w.pets.filter((p) => p.hp > 0);
    wait(w, 3.1);
    cast(w, "RS");
    expect(spiderlings(w)).toHaveLength(0);
    expect(stored(w)).toBe(4);
  });

  it("a human ability that hits stores one, once per cast and up to five", () => {
    const w = worldFor(400);
    w.units[0].memory["elise:stored"] = 2;
    cast(w, "Q");
    settle(w);
    wait(w, 0.5);
    expect(stored(w)).toBe(3);
  });

  it("in Spider Form an ability that hits brings one out at once", () => {
    const w = worldFor(300);
    toSpider(w);
    spiderlings(w).slice(0, 2).forEach((p) => { p.hp = 0; });
    w.pets = w.pets.filter((p) => p.hp > 0);
    cast(w, "QS");
    settle(w);
    wait(w, 0.3);
    expect(spiderlings(w)).toHaveLength(4);
  });

  it("they attack for 40 (+ 15% AP) magic damage", () => {
    const w = worldFor(150, { ap: 100 });
    toSpider(w);
    wait(w, 1.5);
    expect(logged(w, "attack deals 55 magic").length).toBeGreaterThan(0);
  });
});

describe("Spider Form", () => {
  it("Spider Queen: attacks deal 44 (+ 15% AP) bonus magic damage and heal 12.7 (+ 8% AP), doubled for 5 s after Rappel", () => {
    const w = worldFor(100, { ap: 100 });
    w.units[0].hp = 1000;
    toSpider(w);
    w.pets = [];
    startAttack(w, w.units[0]);
    settle(w);
    // 44 at level 18, the series' last value, plus 15% of 100 AP.
    expect(logged(w, "Spider Queen deals")[0]?.text).toContain(`${44 + 15} magic`);
    expect(w.units[0].hp - 1000).toBeGreaterThan(12 + 8 - 1);
  });

  it("Skittering Frenzy: 130% attack speed for Elise and her Spiderlings, lost when she turns human", () => {
    const w = worldFor(100);
    toSpider(w);
    cast(w, "WS");
    expect(w.units[0].statuses.some((s) => s.kind === "stat" && s.memoKey === "WS:attackSpeed")).toBe(true);
    expect(spiderlings(w).every((p) => p.statuses?.some((s) => s.memoKey === "elise:frenzy" && s.value === 1.3))).toBe(true);
    wait(w, 3.1);
    w.units[0].cooldownReady.R = 0;
    cast(w, "WS");
    cast(w, "RS");
    expect(w.units[0].statuses.some((s) => s.memoKey === "WS:attackSpeed")).toBe(false);
  });

  it("Rappel: untargetable, then down behind the enemy with Spider Queen's bonuses doubled", () => {
    const w = worldFor(500);
    toSpider(w);
    w.pets = [];
    cast(w, "ES");
    expect(hasState(w.units[0], "untargetable")).toBe(true);
    wait(w, 1.6);
    expect(w.units[0].x).toBeGreaterThan(w.units[1].x);
    expect(Number(w.units[0].memory["elise:boostUntil"])).toBeGreaterThan(w.tick);
    w.units[0].attackReadyTick = 0;
    startAttack(w, w.units[0]);
    settle(w);
    const plain = Math.round(44 + 0);
    expect(Number(/deals (\d+)/.exec(logged(w, "Spider Queen deals")[0]!.text)![1])).toBe(2 * plain);
  });
});

describe("Human Form", () => {
  it("Cocoon stuns the first enemy hit for 2.4 s and reveals it", () => {
    const w = worldFor(600);
    onTarget(w, { type: "cc", cc: "root", duration: 3 });
    cast(w, "E");
    settle(w);
    wait(w, 0.5);
    expect(w.units[1].statuses.find((s) => s.key === "stun")).toBeDefined();
    expect(w.units[1].statuses.some((s) => s.key === "revealed")).toBe(true);
  });

  it("Neurotoxin: 160 (+ 4% of current health)", () => {
    const w = worldFor(400);
    cast(w, "Q");
    settle(w);
    wait(w, 0.5);
    expect(logged(w, "Neurotoxin deals")[0]?.text).toContain(`${Math.round(160 + 0.04 * HP)} magic`);
  });

  it("Volatile Spiderling chases the enemy down for 220 (+ 75% AP)", () => {
    const w = worldFor(700);
    cast(w, "W");
    settle(w);
    wait(w, 2);
    expect(logged(w, "Volatile Spiderling deals 220 magic")).toHaveLength(1);
    expect(derive(w.units[0]).ap).toBe(0);
  });
});
