import { describe, expect, it } from "vitest";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Shyvana");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const worldFor = (distance = 150, bonus: BonusStats = {}, options: Record<string, number> = {}): World => {
  const source = Object.keys(options).length > 0 ? kit("Shyvana", options).spec : compiled.spec;
  const spec: FighterSpec = { ...source, bonus, base: { ...source.base, hpRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: 50000, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
  world.units[1].x = world.units[0].x + distance;
  return world;
};
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string, aim?: Aim) => startCast(world, world.units[0], ability(world, key), aim);
const castable = (world: World, key: string) => canCast(world, world.units[0], ability(world, key));
const through = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, idle); };
const wait = (world: World, seconds: number) => through(world, world.tick + Math.round(seconds * 30));
/** Attacks once and lets the attack land. */
const attack = (world: World) => { startAttack(world, world.units[0]); while (world.units[0].action?.kind === "windup") step(world, idle); };
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const taken = (world: World) => world.units[1].totals.damageTaken;
const dragon = (world: World) => world.units[0].memory["shyvana:dragon"] === true;
const AD = (world: World) => derive(world.units[0]).ad;

describe("Shyvana reads the wiki at level 20", () => {
  it("Emberstrike, Inferno Aegis, Molten Burst and Dragon's Descent", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 6, castTime: 0, delivery: { kind: "self" } });
    expect(spec.abilities.find((a) => a.key === "Q")?.onSelf?.[0]).toMatchObject({ type: "empower", attacks: 1, window: 6, uncancellable: true, resetAttack: true });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 10, castTime: 0 });
    expect(spec.abilities.find((a) => a.key === "W2")).toMatchObject({ chain: { root: "W", index: 2, window: 2.5, delay: 1, auto: true }, delivery: { kind: "aura", radius: 350 } });
    expect(spec.abilities.find((a) => a.key === "W2")?.onHit?.[0]).toMatchObject({ type: "damage", damageType: "magic", amount: { base: 160, ratios: { AP: 0.65 } } });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 8, castTime: 0.25, delivery: { kind: "line", range: 800, width: 120, speed: 1500 } });
    expect(spec.abilities.find((a) => a.key === "E")?.onHit).toEqual([
      { type: "damage", damageType: "magic", amount: { base: 110, ratios: { AP: 0.8, targetMaxHP: 0.05 } } },
      { type: "cc", cc: "slow", strength: 0.3, duration: 2 },
    ]);
    expect(spec.abilities.find((a) => a.key === "ED")).toMatchObject({ cooldownKey: "E", castTime: 0.3333, delivery: { kind: "line", range: 1000, width: 144, speed: 1600, piercing: true } });
    expect(spec.abilities.find((a) => a.key === "ED")?.onHit?.[0]).toMatchObject({ amount: { base: 137.5, ratios: { AP: 1, targetMaxHP: 0.0625 } } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 0, castTime: 0.25, requires: { minResource: 100 }, delivery: { kind: "dash", distance: 1050, minDistance: 400, through: true }, flags: { knockdown: false } });
    expect(spec.abilities.find((a) => a.key === "R")?.onHit).toEqual([
      { type: "damage", damageType: "magic", amount: { base: 350, ratios: { AP: 1 } } },
      { type: "cc", cc: "fear", duration: 0.75 },
      { type: "cc", cc: "slow", strength: 0.99, duration: 0.75 },
    ]);
    const [passive, refund] = spec.attack.onHit ?? [];
    expect(passive).toMatchObject({ type: "damage", damageType: "magic", amount: { base: 0, ratios: { targetMaxHP: 0.01 }, products: [{ stats: ["bonusAD", "targetMaxHP"] }] }, label: "Emberstrike (passive)" });
    expect(passive?.type === "damage" ? passive.amount.products?.[0]?.ratio : 0).toBeCloseTo(0.00011, 12);
    expect(refund).toEqual({ type: "refund", ability: "Q", seconds: 0.5 });
    expect(compiled.assumptions.some((a) => a.includes("RepeatExplosionDelay"))).toBe(true);
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(150, { ad: 100, abilityHaste: 20 });
    const [self, target] = w.units;
    expect(self.spec.budget?.damage?.(self, target).physical).toBeGreaterThan(0);
    expect(self.spec.budget?.damage?.(self, target).magic).toBeGreaterThan(0);
  });

  it("Scalemail: 0.3 armor and magic resistance per stack, from the option", () => {
    const none = worldFor(150, {}, { scalemail: 0 });
    const some = worldFor(150, {}, { scalemail: 30 });
    expect(derive(some.units[0]).armor.bonus - derive(none.units[0]).armor.bonus).toBeCloseTo(9);
    expect(derive(some.units[0]).mr.bonus - derive(none.units[0]).mr.bonus).toBeCloseTo(9);
  });
});

describe("Emberstrike", () => {
  it("the first attack deals 30 (+ 110% AD) (+ 30% AP) physical in place of its own damage, and doesn't put the attack on cooldown", () => {
    const w = worldFor(150, { ap: 100 });
    cast(w, "Q");
    startAttack(w, w.units[0]);
    const windup = w.units[0].action;
    expect(windup?.kind === "windup" && windup.uncancellable).toBe(true);
    expect(w.units[0].attackReadyTick).toBe(windup?.kind === "windup" ? windup.launchTick : -1);
    while (w.units[0].action?.kind === "windup") step(w, idle);
    expect(logged(w, "Emberstrike deals")[0]?.text).toContain(`${Math.round(30 + 1.1 * AD(w) + 30)} physical`);
    expect(logged(w, "attack deals")).toHaveLength(0);
  });

  it("the passive adds 1% (+ 1.1% per 100 bonus AD) of the target's maximum health as magic damage on every attack", () => {
    const w = worldFor(150, { ad: 100 });
    attack(w);
    const bonusAD = derive(w.units[0]).ad - w.units[0].spec.base.ad;
    expect(logged(w, "Emberstrike (passive) deals")[0]?.text).toContain(`${Math.round(50000 * (0.01 + 0.00011 * bonusAD))} magic`);
  });

  it("the critical strike chance applies to the first and second casts", () => {
    const w = worldFor(150, { critChance: 1 });
    cast(w, "Q");
    attack(w);
    const damage = Number(/deals (\d+)/.exec(logged(w, "Emberstrike deals")[0]!.text)![1]);
    expect(damage).toBeCloseTo((30 + 1.1 * AD(w)) * derive(w.units[0]).critDamage, -1);
  });

  it("the second cast opens 1.5 s after the first attack, or at once after a basic attack, for 4 s", () => {
    const w = worldFor();
    cast(w, "Q");
    attack(w);
    expect(castable(w, "Q2")).toBe(false);
    wait(w, 1.5);
    expect(castable(w, "Q2")).toBe(true);
    wait(w, 4.1);
    expect(castable(w, "Q2")).toBe(false);
    const other = worldFor();
    cast(other, "Q");
    attack(other);
    attack(other);
    expect(castable(other, "Q2")).toBe(true);
  });

  it("can be cast twice in Human Form: the second cast ends it and puts the attack on cooldown", () => {
    const w = worldFor();
    cast(w, "Q");
    attack(w);
    attack(w);
    cast(w, "Q2");
    startAttack(w, w.units[0]);
    const windup = w.units[0].action;
    expect(w.units[0].attackReadyTick).toBeGreaterThan(windup?.kind === "windup" ? windup.launchTick : 0);
    while (w.units[0].action?.kind === "windup") step(w, idle);
    attack(w);
    wait(w, 2);
    expect(castable(w, "Q3")).toBe(false);
    expect(w.units[0].chains.Q).toBeUndefined();
  });

  it("thrice in Dragon Form: the third cast bites for 45 (+ 165% AD) true damage that can't critically strike", () => {
    const w = worldFor(150, { critChance: 1 });
    w.units[0].memory["shyvana:dragon"] = true;
    cast(w, "Q");
    attack(w);
    attack(w);
    cast(w, "Q2");
    attack(w);
    expect(w.units[0].chains.Q).toBeDefined();
    attack(w);
    expect(castable(w, "Q3")).toBe(true);
    cast(w, "Q3");
    attack(w);
    expect(logged(w, "Emberstrike (bite) deals")[0]?.text).toContain(`${Math.round(45 + 1.65 * AD(w))} true`);
  });

  it("restarts its cooldown at each empowered attack, and each attack takes 0.5 s off it", () => {
    const w = worldFor();
    cast(w, "Q");
    wait(w, 1);
    startAttack(w, w.units[0]);
    const restarted = w.tick + 6 * 30;
    expect(w.units[0].cooldownReady.Q).toBe(restarted);
    while (w.units[0].action?.kind === "windup") step(w, idle);
    expect(w.units[0].cooldownReady.Q).toBe(restarted - 15);
  });

  it("spell shields don't block it; a blind negates the attack's damage", () => {
    const shielded = worldFor();
    applyEffect(shielded, shielded.units[1], shielded.units[1], { type: "state", state: "spellShield", duration: 5 }, { scale: 1 });
    cast(shielded, "Q");
    attack(shielded);
    expect(logged(shielded, "Emberstrike deals")).toHaveLength(1);
    const blind = worldFor();
    cast(blind, "Q");
    applyEffect(blind, blind.units[1], blind.units[0], { type: "cc", cc: "blind", duration: 2 }, { scale: 1 });
    attack(blind);
    expect(taken(blind)).toBe(0);
  });
});

describe("Inferno Aegis", () => {
  it("shields for 140 (+ 12% bonus health), 30% more with the enemy champion within 600", () => {
    const near = worldFor(300, { hp: 1000 });
    cast(near, "W");
    step(near, idle);
    expect(near.units[0].statuses.find((s) => s.memoKey === "shyvana:aegis")?.value).toBeCloseTo(1.3 * (140 + 0.12 * 1000));
    const far = worldFor(900, { hp: 1000 });
    cast(far, "W");
    step(far, idle);
    expect(far.units[0].statuses.find((s) => s.memoKey === "shyvana:aegis")?.value).toBeCloseTo(140 + 0.12 * 1000);
  });

  it("25% movement speed, 43.75% while facing the enemy", () => {
    const w = worldFor(300);
    const speed = () => w.units[0].statuses.find((s) => s.memoKey === "buff:shyvana:aegisSpeed");
    cast(w, "W");
    step(w, idle);
    expect(speed()).toMatchObject({ key: "moveSpeedPercent", value: 0.4375 });
    w.units[0].facing = -1;
    step(w, idle);
    expect(speed()).toMatchObject({ key: "moveSpeedPercent", value: 0.25 });
    wait(w, 2.5);
    expect(speed()).toBeUndefined();
  });

  it("can be recast after 1 s; the explosion deals 160 (+ 65% AP) and consumes the shield", () => {
    const w = worldFor(300);
    cast(w, "W");
    step(w, idle);
    expect(castable(w, "W2")).toBe(false);
    wait(w, 1);
    expect(castable(w, "W2")).toBe(true);
    cast(w, "W2");
    step(w, idle);
    expect(taken(w)).toBeCloseTo(160);
    expect(w.units[0].statuses.some((s) => s.memoKey === "shyvana:aegis")).toBe(false);
  });

  it("explodes by itself when the shield breaks, or when it runs out", () => {
    const broken = worldFor(300);
    cast(broken, "W");
    step(broken, idle);
    applyEffect(broken, broken.units[1], broken.units[0], { type: "damage", damageType: "true", amount: { base: 1000 } }, { scale: 1 });
    step(broken, idle);
    expect(taken(broken)).toBeCloseTo(160);
    const expired = worldFor(300);
    cast(expired, "W");
    wait(expired, 2.6);
    expect(taken(expired)).toBeCloseTo(160);
  });

  it("in Dragon Form, an explosion that hits the enemy champion heals for 104.7 (+ 8.47% missing health)", () => {
    const w = worldFor(300);
    w.units[0].memory["shyvana:dragon"] = true;
    const max = derive(w.units[0]).maxHp;
    w.units[0].hp = max / 2;
    cast(w, "W");
    wait(w, 1);
    const before = w.units[0].hp;
    cast(w, "W2");
    step(w, idle);
    expect(w.units[0].hp - before).toBeCloseTo(60 + 40 / 17 * 19 + (4 + 4 / 17 * 19) / 100 * (max - before), 0);
  });
});

describe("Molten Burst", () => {
  it("a human fireball hits for 110 (+ 80% AP) (+ 5% maximum health) and slows by 30% for 2 s", () => {
    const w = worldFor(500);
    cast(w, "E");
    wait(w, 1);
    expect(taken(w)).toBeCloseTo(110 + 0.05 * 50000);
    expect(w.units[1].statuses.find((s) => s.key === "slow")?.value).toBe(0.3);
  });

  it("explodes at its maximum range, hitting an enemy just beyond it", () => {
    const w = worldFor(900);
    cast(w, "E");
    wait(w, 1.5);
    expect(taken(w)).toBeCloseTo(110 + 0.05 * 50000);
  });

  it("in Dragon Form: the contact, the explosion upon the champion for 40%, and the scorched field around it", () => {
    const w = worldFor(400);
    w.units[0].memory["shyvana:dragon"] = true;
    cast(w, "ED");
    wait(w, 0.9);
    const hit = 137.5 + 0.0625 * 50000;
    const later = 55 + 0.025 * 50000;
    expect(logged(w, "Molten Burst (Dragon Form) deals")).toHaveLength(1);
    expect(logged(w, "Molten Burst (explosion) deals")).toHaveLength(1);
    expect(taken(w)).toBeGreaterThanOrEqual(hit + later);
    wait(w, 2.5);
    const scorched = logged(w, "Molten Burst (scorched field) deals");
    expect(scorched.length).toBeGreaterThanOrEqual(7);
    expect(scorched.length).toBeLessThanOrEqual(8);
    expect(taken(w)).toBeCloseTo(hit + later + 6.25 * scorched.length);
  });

  it("in Dragon Form, the explosion at maximum range catches a champion near it again for 40%", () => {
    const w = worldFor(850);
    w.units[0].memory["shyvana:dragon"] = true;
    cast(w, "ED");
    wait(w, 1.5);
    expect(logged(w, "Molten Burst (explosion) deals")).toHaveLength(2);
  });
});

describe("Dragon's Descent and Dragon Fury", () => {
  it("needs 100 Dragon Fury", () => {
    const w = worldFor(500);
    expect(castable(w, "R")).toBe(true);
    w.units[0].resource = 99;
    expect(castable(w, "R")).toBe(false);
  });

  it("is displacement immune from the start of the cast time until it lands", () => {
    const w = worldFor(500);
    cast(w, "R", { direction: 1, distance: 500 });
    expect(hasState(w.units[0], "displacementImmune")).toBe(true);
    while (w.units[0].action) step(w, idle);
    step(w, idle);
    expect(hasState(w.units[0], "displacementImmune")).toBe(false);
  });

  it("flies through the enemy, burning it for 350 (+ 100% AP), fearing and slowing it by 99% for 0.75 s, and turns into a dragon", () => {
    const w = worldFor(300);
    const max = derive(w.units[0]).maxHp;
    cast(w, "R", { direction: 1, distance: 400 });
    while (w.units[0].action) step(w, idle);
    expect(taken(w)).toBeCloseTo(350);
    expect(logged(w, "inflicts fear")).toHaveLength(1);
    expect(dragon(w)).toBe(true);
    expect(derive(w.units[0]).maxHp).toBeCloseTo(max + 350);
    expect(w.units[0].hp).toBeCloseTo(max + 350);
    expect(w.units[0].x).toBeGreaterThan(w.units[1].x);
  });

  it("Dragon Form costs 3.3 Dragon Fury every 0.5 s, and ends when it runs out", () => {
    const w = worldFor(2000);
    cast(w, "R", { direction: -1, distance: 1050 });
    while (w.units[0].action) step(w, idle);
    const fury = w.units[0].resource;
    wait(w, 1);
    expect(w.units[0].resource).toBeCloseTo(fury - 6.6, 1);
    w.units[0].resource = 3;
    wait(w, 0.6);
    expect(dragon(w)).toBe(false);
    expect(w.units[0].hp).toBeLessThanOrEqual(derive(w.units[0]).maxHp);
  });

  it("generates 0.5 Dragon Fury every 0.5 s in Human Form only", () => {
    const w = worldFor(2000);
    w.units[0].resource = 50;
    wait(w, 1.05);
    expect(w.units[0].resource).toBeCloseTo(51);
    w.units[0].memory["shyvana:dragon"] = true;
    w.units[0].memory["shyvana:drainAt"] = Number.POSITIVE_INFINITY;
    wait(w, 1);
    expect(w.units[0].resource).toBeCloseTo(51);
  });

  it("1.25 Dragon Fury per enemy damaged, tripled in Dragon Form, once per cast", () => {
    const w = worldFor();
    w.units[0].resource = 10;
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(w.units[0].resource).toBeCloseTo(11.25);
    w.units[0].memory["shyvana:dragon"] = true;
    w.units[0].memory["shyvana:drainAt"] = Number.POSITIVE_INFINITY;
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(w.units[0].resource).toBeCloseTo(15);
    const fury = w.units[0].resource;
    cast(w, "ED");
    wait(w, 0.9);
    // The fireball, the explosion and the scorched field are one cast.
    expect(w.units[0].resource).toBeCloseTo(fury + 3.75);
  });
});
