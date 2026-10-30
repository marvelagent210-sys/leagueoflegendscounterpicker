import { describe, expect, it } from "vitest";
import { startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit, dealDamage } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const HP = 20000;
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const worldFor = (form: 0 | 1, distance = 200, bonus: BonusStats = {}): World => {
  const source = kit("Kayn", { form }).spec;
  const spec: FighterSpec = { ...source, bonus, base: { ...source.base, hpRegen: 0, resourceRegen: 0 } };
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
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const bonusAD = (world: World) => derive(world.units[0]).ad - world.units[0].spec.base.ad;

describe("Kayn reads the wiki at level 20", () => {
  it("tries both forms, as both are unlocked by level 20", () => {
    expect(kit("Kayn").variants).toEqual([expect.objectContaining({ form: 0 }), expect.objectContaining({ form: 1 })]);
    expect(kit("Kayn", { form: 1 }).variants).toEqual([]);
  });

  it("Darkin Slayer and Shadow Assassin spells", () => {
    const slayer = kit("Kayn", { form: 0 }).spec;
    expect(slayer.abilities.find((a) => a.key === "W")).toMatchObject({ castTime: 0.55, delivery: { kind: "line", range: 700, width: 175 } });
    expect(slayer.abilities.find((a) => a.key === "W")?.onHit?.[2]).toEqual({ type: "displace", direction: "away", distance: 0, duration: 1 });
    expect(slayer.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 80, delivery: { kind: "target", range: 550 } });
    expect(slayer.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 13 });
    const assassin = kit("Kayn", { form: 1 }).spec;
    expect(assassin.abilities.find((a) => a.key === "W")).toMatchObject({ castTime: 0 });
    expect(assassin.abilities.find((a) => a.key === "R")).toMatchObject({ delivery: { kind: "target", range: 750 } });
    expect(assassin.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 10 });
    expect(assassin.abilities.find((a) => a.key === "Q")?.onHit?.[0]).toEqual({ type: "damage", damageType: "physical", amount: { base: 195, ratios: { bonusAD: 0.85 } } });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(0, 200, { ad: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).physical).toBeGreaterThan(0);
    expect(w.units[0].spec.budget?.healing?.(w.units[0], w.units[1])).toBeGreaterThan(0);
  });
});

describe("Reaping Slash", () => {
  it("dashes through the enemy, then swings: two hits; as Rhaast, 65% AD (+ 6% (+ 3.5% per 100 bonus AD) of maximum health) each", () => {
    const w = worldFor(0, 200, { ad: 100 });
    cast(w, "Q", { direction: 1, distance: 350 });
    settle(w);
    const each = 0.65 * derive(w.units[0]).ad + (0.06 + 0.00035 * bonusAD(w)) * HP;
    expect(logged(w, "Reaping Slash deals")[0]?.text).toContain(`${Math.round(each)} physical`);
    expect(logged(w, "Reaping Slash (swing) deals")).toHaveLength(1);
  });

  it("no swing when the dash is interrupted", () => {
    const w = worldFor(1, 200);
    cast(w, "Q", { direction: 1, distance: 350 });
    applyEffect(w, w.units[1], w.units[0], { type: "displace", direction: "away", distance: 50, duration: 0.3 }, { scale: 1 });
    wait(w, 0.6);
    expect(logged(w, "Reaping Slash (swing)")).toHaveLength(0);
  });
});

describe("The Darkin Scythe", () => {
  it("Darkin Slayer: his spells' physical damage heals him for 25% (+ 0.5% per 100 bonus health)", () => {
    const w = worldFor(0, 200);
    w.units[0].hp = 1000;
    cast(w, "Q", { direction: 1, distance: 350 });
    settle(w);
    const dealt = logged(w, "Reaping Slash").map((e) => Number(/deals (\d+)/.exec(e.text)![1])).reduce((a, b) => a + b, 0);
    expect(w.units[0].hp - 1000).toBeCloseTo(0.25 * dealt, -1);
  });

  it("Shadow Assassin: 42.4% of his damage as bonus magic damage for 3 s from the first hit, once per 8 s out of combat", () => {
    const w = worldFor(1, 150);
    attackHit(w, w.units[0], w.units[1], false, []);
    const hit = derive(w.units[0]).ad;
    expect(logged(w, "The Darkin Scythe deals")[0]?.text).toContain(`${Math.round(0.4235 * hit)} magic`);
    wait(w, 3.1);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "The Darkin Scythe deals")).toHaveLength(1);
  });

  it("Shadow Assassin: true damage neither triggers it nor counts as combat", () => {
    const w = worldFor(1, 150);
    dealDamage(w, w.units[0], w.units[1], 100, "true", {});
    expect(logged(w, "The Darkin Scythe deals")).toHaveLength(0);
  });
});

describe("Umbral Trespass", () => {
  it("needs an enemy he damaged in the last 3.15 s", () => {
    const w = worldFor(1, 300);
    expect(ability(w, "R").usable?.(w.units[0], w)).toBe(false);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(ability(w, "R").usable?.(w.units[0], w)).toBe(true);
    wait(w, 3.2);
    expect(ability(w, "R").usable?.(w.units[0], w)).toBe(false);
  });

  it("hides Kayn inside the enemy, untargetable, then deals 350 (+ 150% bonus AD) and emerges", () => {
    const w = worldFor(1, 300, { ad: 100 });
    attackHit(w, w.units[0], w.units[1], false, []);
    cast(w, "R");
    expect(hasState(w.units[0], "untargetable")).toBe(true);
    wait(w, 1);
    expect(w.units[0].x).toBeCloseTo(w.units[1].x);
    wait(w, 2.4);
    expect(logged(w, "Umbral Trespass deals")).toHaveLength(1);
    expect(logged(w, "Umbral Trespass deals")[0]?.text).toContain(`${Math.round(350 + 1.5 * bonusAD(w))} physical`);
    expect(hasState(w.units[0], "untargetable")).toBe(false);
    expect(Math.abs(w.units[0].x - w.units[1].x)).toBeCloseTo(500);
  });

  it("as Rhaast: 15% (+ 10% per 100 bonus AD) of maximum health, and a heal of 11.25% (+ 7.5% per 100 bonus AD) of it", () => {
    const w = worldFor(0, 300, { ad: 100 });
    w.units[0].hp = 500;
    attackHit(w, w.units[0], w.units[1], false, []);
    cast(w, "R");
    wait(w, 3.4);
    expect(logged(w, "Umbral Trespass deals")[0]?.text).toContain(`${Math.round((0.15 + 0.001 * bonusAD(w)) * HP)} physical`);
    expect(w.units[0].hp).toBeGreaterThan(500 + (0.1125 + 0.00075 * bonusAD(w)) * HP * 0.5);
  });

  it("fails entirely on an enemy with a spell shield", () => {
    const w = worldFor(1, 300);
    attackHit(w, w.units[0], w.units[1], false, []);
    onTarget(w, { type: "state", state: "spellShield", duration: 5 });
    cast(w, "R");
    expect(hasState(w.units[0], "untargetable")).toBe(false);
    wait(w, 4);
    expect(logged(w, "Umbral Trespass deals")).toHaveLength(0);
  });
});

describe("Blade's Reach and Shadow Step", () => {
  it("the Shadow Assassin's sweep has no cast time and lands 0.55 s later from where he stood", () => {
    const w = worldFor(1, 600);
    onTarget(w, { type: "cc", cc: "stun", duration: 3 });
    cast(w, "W");
    expect(w.units[0].action).toBeUndefined();
    wait(w, 0.5);
    expect(logged(w, "Blade's Reach deals")).toHaveLength(0);
    wait(w, 0.2);
    expect(logged(w, "Blade's Reach deals")).toHaveLength(1);
  });

  it("Shadow Step: 40% movement speed and ghosting, ended by a basic attack", () => {
    const w = worldFor(1, 150);
    cast(w, "E");
    expect(hasState(w.units[0], "ghosted")).toBe(true);
    attackHit(w, w.units[0], w.units[1], false, []);
    w.units[0].attackReadyTick = 0;
    step(w, [() => ({ kind: "attack" }), () => undefined]);
    expect(hasState(w.units[0], "ghosted")).toBe(false);
  });
});
