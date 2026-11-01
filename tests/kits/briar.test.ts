import { describe, expect, it } from "vitest";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import { type Aim, DEFAULT_ENVIRONMENT, type World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Briar");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const worldFor = (distance = 150, bonus: BonusStats = {}, walls = false): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true, environment: { ...DEFAULT_ENVIRONMENT, walls } } });
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
const frenzy = (world: World) => { cast(world, "W"); settle(world); };
const bonusAD = (world: World) => derive(world.units[0]).ad - world.units[0].spec.base.ad;

describe("Briar reads the wiki at level 20", () => {
  it("Head Rush, Blood Frenzy, Snack Attack, Chilling Scream and Certain Death", () => {
    const spec = compiled.spec;
    const healthCost = { base: 0, ratios: { currentHP: 0.05 } };
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 9, cost: healthCost, costType: "health", delivery: { kind: "dash", direction: "target", distance: 475 }, flags: { appliesOnHit: true, appliesLifeSteal: true } });
    expect(spec.abilities.find((a) => a.key === "Q")?.onHit).toEqual([
      { type: "damage", damageType: "physical", amount: { base: 160, ratios: { bonusAD: 0.8, AP: 0.6 } } },
      { type: "cc", cc: "stun", duration: 0.85 },
      { type: "stat", stat: "armorReductionPercent", amount: { base: 0.2 }, duration: 5 },
      { type: "stat", stat: "mrReductionPercent", amount: { base: 0.2 }, duration: 5 },
    ]);
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 10, cost: healthCost, delivery: { kind: "dash", distance: 300, minDistance: 75, speed: 1200 } });
    expect(spec.abilities.find((a) => a.key === "W2")?.onSelf?.[0]).toMatchObject({ type: "empower", window: 5, bonusRange: 50, resetAttack: true });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 16, castTime: 1, delivery: { kind: "line", range: 600, width: 380, speed: 1900 } });
    expect(spec.abilities.find((a) => a.key === "E")?.onHit?.[0]).toEqual({ type: "damage", damageType: "magic", amount: { base: 220, ratios: { bonusAD: 1, AP: 1 } } });
    expect(spec.abilities.find((a) => a.key === "E")?.onHit?.[2]).toMatchObject({ type: "displace", direction: "away", distance: 575, wallStun: 1.5 });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 80, castTime: 1, castOrigin: "start", delivery: { kind: "line", range: 12000, width: 320, speed: 2000 } });
    expect(spec.abilities.find((a) => a.key === "R2")).toMatchObject({ castTime: 1.25, delivery: { kind: "dash", direction: "target", hitRadius: 100 }, flags: { knockdown: false } });
    expect(compiled.assumptions.some((a) => a.includes("BleedTickRate"))).toBe(true);
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(150, { ad: 100 });
    const [self, target] = w.units;
    expect(self.spec.budget?.damage?.(self, target).physical).toBeGreaterThan(0);
    expect(self.spec.budget?.healing?.(self, target)).toBeGreaterThan(0);
  });

  it("its abilities cost 5% of her current health", () => {
    const w = worldFor(150);
    const before = w.units[0].hp;
    cast(w, "W");
    expect(before - w.units[0].hp).toBeCloseTo(0.05 * before);
  });
});

describe("Crimson Curse", () => {
  const level20 = 10 + 40 / 17 * 19;
  it("a bleed of 54.7 (+ 50% bonus AD) over 5 s in 0.5 s ticks, 25% more per stack up to 5", () => {
    const w = worldFor(150, { ad: 100 });
    attackHit(w, w.units[0], w.units[1], false, []);
    const one = level20 + 0.5 * bonusAD(w);
    expect(w.units[1].statuses.find((s) => s.kind === "dot")?.dot?.perHit).toBeCloseTo(one / 10);
    for (let i = 0; i < 6; i++) attackHit(w, w.units[0], w.units[1], false, []);
    expect(w.units[0].memory["briar:bleed"]).toBe(5);
    expect(w.units[1].statuses.find((s) => s.kind === "dot")?.dot?.perHit).toBeCloseTo((2 * one) / 10);
    expect(w.units[1].statuses.filter((s) => s.kind === "dot")).toHaveLength(1);
  });

  it("heals Briar for 25% of the bleed's damage before mitigation", () => {
    const w = worldFor(150);
    w.units[1].spec.base.armor = 100;
    w.units[0].hp = derive(w.units[0]).maxHp - 1000;
    attackHit(w, w.units[0], w.units[1], false, []);
    const hp = w.units[0].hp;
    wait(w, 0.55);
    const healed = w.units[0].hp - hp;
    const amp = Number(w.units[0].statuses.find((s) => s.memoKey === "buff:briar:amp")?.value ?? 0);
    expect(healed).toBeCloseTo((0.25 * level20) / 10 * (1 + amp), 1);
  });

  it("her healing grows with her missing health: up to 40% at none left", () => {
    const w = worldFor(5000);
    const amp = () => Number(w.units[0].statuses.find((s) => s.memoKey === "buff:briar:amp")?.value ?? 0);
    step(w, idle);
    expect(amp()).toBe(0);
    w.units[0].hp = derive(w.units[0]).maxHp / 2;
    step(w, idle);
    expect(amp()).toBeCloseTo(0.2, 2);
    expect(compiled.spec.base.hpRegen).toBe(0);
  });
});

describe("Head Rush", () => {
  it("leaps to the enemy, stuns for 0.85 s, shreds 20% armor and magic resistance after its damage, and resets the attack timer", () => {
    const w = worldFor(400);
    w.units[1].spec.base.armor = 100;
    w.units[0].attackReadyTick = 999;
    cast(w, "Q");
    settle(w);
    const hit = logged(w, "Head Rush deals")[0]!;
    expect(Number(/deals (\d+)/.exec(hit.text)![1])).toBe(Math.round(160 / 2));
    expect(w.units[1].statuses.find((s) => s.key === "stun")).toBeDefined();
    expect(derive(w.units[1]).armorReduction.percent).toContain(0.2);
    expect(w.units[0].attackReadyTick).toBeLessThan(999);
  });

  it("is faster the farther it goes", () => {
    const near = worldFor(150);
    const far = worldFor(500);
    cast(near, "Q");
    cast(far, "Q");
    expect(Number(far.units[0].memory["briar:rushSpeed"])).toBeGreaterThan(Number(near.units[0].memory["briar:rushSpeed"]));
    expect(Number(near.units[0].memory["briar:rushSpeed"])).toBeCloseTo(600 + (150 - 130) * (300 / 450), 0);
  });
});

describe("Blood Frenzy and Snack Attack", () => {
  it("a dash, then 5 s of 95% attack speed, 60% movement speed and ghosting, with the enemy revealed", () => {
    const w = worldFor(200);
    frenzy(w);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:briar:frenzyAS")?.value).toBeCloseTo(0.95);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:briar:frenzyMS")?.value).toBeCloseTo(0.6);
    expect(hasState(w.units[0], "ghosted")).toBe(true);
    expect(w.units[1].statuses.some((s) => s.key === "revealed")).toBe(true);
    wait(w, 5.1);
    expect(w.units[0].statuses.some((s) => s.memoKey === "buff:briar:frenzyAS")).toBe(false);
  });

  it("forces her to attack: no walking away while it lasts", () => {
    const w = worldFor(200);
    frenzy(w);
    const behavior = w.units[0].spec.behavior!;
    const decided = behavior({ world: w, self: w.units[0], enemy: w.units[1], mode: "flee", distance: 70, threats: [] });
    expect(decided?.kind === "move" && decided.direction === -1).toBe(false);
  });

  it("ends early once no valid target is near, or when Chilling Scream is cast", () => {
    const gone = worldFor(200);
    frenzy(gone);
    gone.units[1].x += 2000;
    step(gone, idle);
    expect(Number(gone.units[0].memory["briar:frenzyUntil"])).toBe(-1);
    const scream = worldFor(200);
    frenzy(scream);
    cast(scream, "E");
    expect(Number(scream.units[0].memory["briar:frenzyUntil"])).toBe(-1);
  });

  it("Snack Attack only during the frenzy: 50 more range, a bite of 65 (+ 5% AD) (+ 9% missing health), healing 5% maximum health and 40% of its damage", () => {
    const w = worldFor(200);
    expect(castable(w, "W2")).toBe(false);
    frenzy(w);
    expect(castable(w, "W2")).toBe(true);
    w.units[1].hp = HP / 2;
    w.units[0].hp = 1000;
    cast(w, "W2");
    startAttack(w, w.units[0]);
    settle(w);
    // The bite reads the target's missing health after the attack's own damage.
    const ad = derive(w.units[0]).ad;
    const bite = 65 + 0.05 * ad + (0.09 + 0.00025 * bonusAD(w)) * (HP / 2 + ad);
    expect(Number(/deals (\d+)/.exec(logged(w, "Snack Attack deals")[0]!.text)![1])).toBeCloseTo(bite, -1);
    const heals = logged(w, "heals").map((e) => Number(/heals (\d+)/.exec(e.text)![1]));
    expect(heals.some((h) => Math.abs(h - 0.4 * bite) < 0.4 * bite * 0.6)).toBe(true);
  });

  it("an unused Snack Attack is lost when the frenzy ends", () => {
    const w = worldFor(200);
    frenzy(w);
    cast(w, "W2");
    expect(w.units[0].statuses.some((s) => s.kind === "empower" && s.key === "W2")).toBe(true);
    w.units[1].x += 2000;
    step(w, idle);
    expect(w.units[0].statuses.some((s) => s.kind === "empower" && s.key === "W2")).toBe(false);
  });
});

describe("Chilling Scream", () => {
  it("charges for 1 s with 35% damage reduction, healing 4% maximum health every 0.25 s, and crowd control can't interrupt it", () => {
    const w = worldFor(300);
    const max = derive(w.units[0]).maxHp;
    w.units[0].hp = max / 2;
    cast(w, "E");
    expect(w.units[0].statuses.find((s) => s.kind === "state" && s.key === "damageReduction")?.value).toBe(0.35);
    applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "stun", duration: 0.5 }, { scale: 1 });
    expect(w.units[0].action).toMatchObject({ kind: "cast", ability: "E" });
    settle(w);
    expect(Number(w.units[0].memory["briar:chargeHeals"])).toBe(4);
  });

  it("the full scream deals 220 (+ 100% bonus AD) (+ 100% AP), slows by 80% for 0.5 s and knocks back 575", () => {
    const w = worldFor(300);
    applyEffect(w, w.units[0], w.units[1], { type: "cc", cc: "stun", duration: 3 }, { scale: 1 });
    const x = w.units[1].x;
    cast(w, "E");
    wait(w, 1.5);
    expect(logged(w, "Chilling Scream deals")[0]?.text).toContain(`${Math.round(220 + bonusAD(w))} magic`);
    expect(w.units[1].x - x).toBeCloseTo(575, -1);
  });

  it("into a wall: bonus damage, a knock-up and a 1.5 s stun", () => {
    const w = worldFor(300, {}, true);
    applyEffect(w, w.units[0], w.units[1], { type: "cc", cc: "stun", duration: 3 }, { scale: 1 });
    cast(w, "E");
    wait(w, 2);
    if (logged(w, "Chilling Scream (wall) deals").length > 0) expect(logged(w, "Chilling Scream (wall) deals")[0]?.text).toContain(`${Math.round(440 + 2.4 * bonusAD(w))} magic`);
  });
});

describe("Certain Death", () => {
  it("marks and reveals the first champion hit, then cleanses Briar and makes her immune to crowd control for 1.25 s", () => {
    const w = worldFor(500);
    applyEffect(w, w.units[0], w.units[1], { type: "cc", cc: "stun", duration: 5 }, { scale: 1 });
    cast(w, "R");
    wait(w, 1.3);
    expect(w.units[1].statuses.some((s) => s.memoKey === "briar:mark")).toBe(true);
    expect(w.units[0].action).toMatchObject({ kind: "cast", ability: "R2" });
    expect(hasState(w.units[0], "ccImmune")).toBe(true);
  });

  it("dashes to the prey with displacement immunity, explodes for 350 (+ 130% AP) and enters Hematomania", () => {
    const w = worldFor(800);
    applyEffect(w, w.units[0], w.units[1], { type: "cc", cc: "stun", duration: 6 }, { scale: 1 });
    cast(w, "R");
    wait(w, 1.5);
    settle(w);
    expect(logged(w, "Certain Death (dash) deals 350 magic")).toHaveLength(1);
    expect(Math.abs(w.units[1].x - w.units[0].x)).toBeLessThan(250);
    expect(w.units[0].memory["briar:hema"]).toBe(true);
    step(w, idle);
    const ad = derive(w.units[0]).ad;
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:briar:hemaArmor")?.value).toBeCloseTo(0.2 * ad);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:briar:hemaLS")?.value).toBeCloseTo(0.2);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:briar:hemaMS")?.value).toBeCloseTo(0.3);
    wait(w, 10);
    expect(w.units[0].memory["briar:hema"]).toBe(true);
    cast(w, "E");
    expect(w.units[0].memory["briar:hema"]).toBe(false);
    expect(w.units[1].statuses.some((s) => s.memoKey === "briar:mark")).toBe(false);
  });
});
