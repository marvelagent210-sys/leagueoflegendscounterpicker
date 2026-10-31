import { describe, expect, it } from "vitest";
import { attackRange, canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit, dealDamage } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Nilah");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
/** `levelSpeed`: her bonus attack speed from levels, when a test needs it pinned. */
const worldFor = (distance = 300, bonus: BonusStats = {}, levelSpeed?: number): World => {
  const attackSpeed = { ...compiled.spec.base.attackSpeed, ...(levelSpeed !== undefined ? { bonus: levelSpeed } : {}) };
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0, attackSpeed } };
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
const dealt = (world: World, start: string) => logged(world, start).map((e) => Number(/deals (\d+)/.exec(e.text)![1])).reduce((a, b) => a + b, 0);
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const bonusAD = (world: World) => derive(world.units[0]).ad - world.units[0].spec.base.ad;

describe("Nilah reads the wiki at level 20", () => {
  it("Formless Blade, Jubilant Veil, Slipstream and Apotheosis", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 4, cost: 30, castTime: 0.35, overlay: true, delivery: { kind: "line", range: 600, width: 150 }, flags: { appliesLifeSteal: true } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 22, cost: 0, cooldownAfter: "state" });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 0.5, cost: 30, charges: { max: 2, recharge: 12 }, delivery: { kind: "dash", direction: "toward", distance: 450, speed: 2200, through: true, hitRadius: 150 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 80, cost: 100, channel: { duration: 1, pulses: { base: 4 }, range: 450, mobile: true, pulsesPassSpellShields: true } });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(300, { ad: 100, critChance: 0.5 });
    expect(w.units[0].spec.budget?.healing?.(w.units[0], w.units[1])).toBeGreaterThan(0);
  });
});

describe("Formless Blade", () => {
  it("deals 40 (+ 100% AD) at 0% critical strike chance, up to 76.4 (+ 191% AD) at 100%", () => {
    for (const [crit, base, ratio] of [[0, 40, 1], [0.5, 58.2, 1.455], [1, 76.4, 1.91]] as const) {
      const w = worldFor(300, { critChance: crit });
      step(w, idle);
      onTarget(w, { type: "cc", cc: "stun", duration: 2 });
      cast(w, "Q");
      settle(w);
      expect(logged(w, "Formless Blade deals")[0]?.text).toContain(`${Math.round(base + ratio * derive(w.units[0]).ad)} physical`);
    }
  });

  it("its cast time falls from 0.35 s with bonus attack speed, to 0.28 s from 48%", () => {
    const castTime = (w: World) => ability(w, "Q").castTimeFor!(w.units[0]);
    expect(castTime(worldFor(300, {}, 0))).toBeCloseTo(0.35);
    expect(castTime(worldFor(300, {}, 0.1372))).toBeCloseTo(0.33);
    expect(castTime(worldFor(300, { attackSpeed: 0.3 }, 0.3))).toBeCloseTo(0.28);
  });

  it("cast during Slipstream it is instant and lands at once, and the dash carries on", () => {
    const w = worldFor(400);
    step(w, idle);
    onTarget(w, { type: "cc", cc: "stun", duration: 2 });
    cast(w, "E");
    step(w, idle);
    expect(ability(w, "Q").castTimeFor!(w.units[0])).toBe(0);
    expect(castable(w, "Q")).toBe(true);
    cast(w, "Q");
    expect(logged(w, "Formless Blade deals")).toHaveLength(1);
    expect(w.units[0].action?.kind).toBe("dash");
  });

  it("a hit gives 125 attack range and 65.9% attack speed (10 – 60% by level, at 20) for 4 s", () => {
    const w = worldFor(300);
    step(w, idle);
    onTarget(w, { type: "cc", cc: "stun", duration: 2 });
    const range = attackRange(w.units[0]);
    cast(w, "Q");
    settle(w);
    expect(attackRange(w.units[0]) - range).toBeCloseTo(125);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:nilah:bladeSpeed")?.value).toBeCloseTo(0.6588, 3);
    wait(w, 4.1);
    expect(attackRange(w.units[0])).toBeCloseTo(range);
  });

  it("a miss empowers nothing", () => {
    const w = worldFor(900);
    step(w, idle);
    cast(w, "Q");
    settle(w);
    expect(logged(w, "Formless Blade deals")).toHaveLength(0);
    expect(w.units[0].statuses.some((s) => s.memoKey === "buff:nilah:bladeSpeed")).toBe(false);
  });
});

describe("Formless Blade's passive", () => {
  it("0 – 30% armor penetration by critical strike chance", () => {
    const w = worldFor(300, { critChance: 0.5 });
    step(w, idle);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:nilah:penetration")?.value).toBeCloseTo(0.15);
  });

  it("her attacks heal 0 – 20% of their damage by critical strike chance; past maximum health it becomes a 6 s shield", () => {
    const w = worldFor(150, { critChance: 1 });
    step(w, idle);
    const self = w.units[0];
    self.hp = derive(self).maxHp - 10;
    attackHit(w, self, w.units[1], false, []);
    expect(self.hp).toBeCloseTo(derive(self).maxHp);
    const shield = self.statuses.find((s) => s.kind === "shield")!;
    expect(shield.value).toBeCloseTo(0.2 * dealt(w, "attack deals") - 10, 0);
    expect((shield.endTick - shield.startTick) / 30).toBeCloseTo(6);
  });

  it("Formless Blade heals the same share", () => {
    const w = worldFor(300, { critChance: 0.5 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "stun", duration: 2 });
    w.units[0].hp = 1000;
    cast(w, "Q");
    settle(w);
    expect(w.units[0].hp - 1000).toBeCloseTo(0.1 * dealt(w, "Formless Blade deals"), 0);
  });
});

describe("Jubilant Veil", () => {
  it("2.25 s of ghosting, 25% movement speed, 25% less magic damage and dodged basic attacks", () => {
    const plain = worldFor(150);
    step(plain, idle);
    dealDamage(plain, plain.units[1], plain.units[0], 100, "magic");
    const unveiled = derive(plain.units[0]).maxHp - plain.units[0].hp;
    const w = worldFor(150);
    step(w, idle);
    const self = w.units[0];
    const speed = derive(self).moveSpeed;
    cast(w, "W");
    expect(hasState(self, "ghosted")).toBe(true);
    expect(derive(self).moveSpeed).toBeGreaterThan(speed * 1.2);
    const hp = self.hp;
    attackHit(w, w.units[1], self, false, []);
    expect(self.hp).toBe(hp);
    dealDamage(w, w.units[1], self, 100, "magic");
    expect(hp - self.hp).toBeCloseTo(0.75 * unveiled);
    wait(w, 2.3);
    expect(hasState(self, "ghosted") || hasState(self, "dodgeAttacks")).toBe(false);
  });

  it("its cooldown starts when the mist ends", () => {
    const w = worldFor(150);
    step(w, idle);
    const start = w.tick;
    cast(w, "W");
    expect(w.units[0].cooldownHeld.W).toBe("W");
    wait(w, 2.4);
    expect(w.units[0].cooldownHeld.W).toBeUndefined();
    expect(w.units[0].cooldownReady.W).toBeCloseTo(start + (2.25 + 22) * 30, -1);
  });
});

describe("Slipstream", () => {
  it("dashes 450 through an enemy for 100 (+ 20% bonus AD) and resets her attack", () => {
    const w = worldFor(300, { ad: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "stun", duration: 2 });
    const start = w.units[0].x;
    w.units[0].attackReadyTick = w.tick + 60;
    cast(w, "E");
    expect(w.units[0].attackReadyTick).toBe(w.tick);
    settle(w);
    expect(w.units[0].x - start).toBeCloseTo(450);
    expect(w.units[0].x).toBeGreaterThan(w.units[1].x);
    expect(logged(w, "Slipstream deals")[0]?.text).toContain(`${Math.round(100 + 0.2 * bonusAD(w))} physical`);
  });

  it("needs an enemy within 550, and holds two charges, one back every 12 s", () => {
    expect(castable(worldFor(700), "E")).toBe(false);
    const w = worldFor(500);
    onTarget(w, { type: "cc", cc: "stun", duration: 20 });
    cast(w, "E");
    settle(w);
    wait(w, 0.6);
    expect(castable(w, "E")).toBe(true);
    cast(w, "E");
    settle(w);
    wait(w, 0.6);
    expect(castable(w, "E")).toBe(false);
    wait(w, 11);
    expect(castable(w, "E")).toBe(true);
  });
});

describe("Apotheosis", () => {
  it("four hits of 35 (+ 10% bonus AD) over 1 s, then a burst of 325 (+ 100% bonus AD) that pulls 250; each hit slows by 10% for 3 s", () => {
    const w = worldFor(400, { ad: 100 });
    step(w, idle);
    const x = w.units[1].x;
    cast(w, "R");
    wait(w, 0.9);
    expect(logged(w, "Apotheosis deals")).toHaveLength(3);
    const slow = w.units[1].statuses.find((s) => s.key === "slow")!;
    expect(slow.value).toBeCloseTo(0.1);
    expect((slow.endTick - slow.startTick) / 30).toBeCloseTo(3);
    wait(w, 0.2);
    expect(logged(w, "Apotheosis deals")).toHaveLength(4);
    expect(logged(w, "Apotheosis deals")[0]?.text).toContain(`${Math.round(35 + 0.1 * bonusAD(w))} physical`);
    expect(logged(w, "Apotheosis (burst) deals")[0]?.text).toContain(`${Math.round(325 + bonusAD(w))} physical`);
    wait(w, 0.4);
    expect(x - w.units[1].x).toBeCloseTo(250, -1);
  });

  it("a spell shield blocks only the burst", () => {
    const w = worldFor(300);
    step(w, idle);
    onTarget(w, { type: "state", state: "spellShield", duration: 5 });
    cast(w, "R");
    wait(w, 1.1);
    expect(logged(w, "Apotheosis deals")).toHaveLength(4);
    expect(logged(w, "Apotheosis (burst) deals")).toHaveLength(0);
  });

  it("heals 20 – 50% of its damage by critical strike chance", () => {
    const w = worldFor(300, { critChance: 1 });
    step(w, idle);
    w.units[0].hp = 1000;
    cast(w, "R");
    wait(w, 1.1);
    expect(w.units[0].hp - 1000).toBeCloseTo(0.5 * (dealt(w, "Apotheosis deals") + dealt(w, "Apotheosis (burst) deals")), -1);
  });

  it("she can't attack or cast while it lasts", () => {
    const w = worldFor(150);
    step(w, idle);
    cast(w, "R");
    expect(castable(w, "Q")).toBe(false);
    expect(castable(w, "W")).toBe(false);
    for (let i = 0; i < 25; i++) step(w, [() => ({ kind: "attack" }), () => undefined]);
    expect(logged(w, "attack deals")).toHaveLength(0);
  });
});

describe("Nilah's behavior", () => {
  it("cracks Formless Blade during Slipstream", () => {
    const w = worldFor(400);
    step(w, idle);
    cast(w, "E");
    const view = { world: w, self: w.units[0], enemy: w.units[1], mode: "fight" as const, distance: 400 - 130, threats: [] };
    expect(w.units[0].spec.behavior!(view)).toEqual({ kind: "cast", ability: "Q" });
  });

  it("keeps Slipstream to close in: within her attack range it would only carry her through and out", () => {
    const view = (w: World, distance: number) => ({ world: w, self: w.units[0], enemy: w.units[1], mode: "fight" as const, distance: distance - 130, threats: [] });
    const near = worldFor(200);
    step(near, idle);
    near.units[0].cooldownReady.Q = near.units[0].cooldownReady.R = 1e9;
    expect(near.units[0].spec.behavior!(view(near, 200))).not.toEqual({ kind: "cast", ability: "E" });
    const far = worldFor(450);
    step(far, idle);
    far.units[0].cooldownReady.Q = far.units[0].cooldownReady.R = 1e9;
    expect(far.units[0].spec.behavior!(view(far, 450))).toEqual({ kind: "cast", ability: "E" });
  });
});
