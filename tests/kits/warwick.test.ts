import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit, hookContext } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Action, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Warwick");
const worldFor = (bonus: BonusStats = {}, distance = 100, enemy: Partial<FighterSpec["base"]> = {}): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  return createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: 20000, armor: 0, mr: 0, hpRegen: 0, ...enemy } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 30, log: true } });
};
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string) => startCast(world, world.units[0], ability(world, key));
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const through = (world: World, tick: number) => { while (world.tick <= tick && !world.result) step(world, idle); };
/** Steps until `done`, failing after 10 s of fight rather than hanging when it never comes. */
const until = (world: World, done: () => boolean, limit = 300) => {
  for (let i = 0; i < limit && !done(); i++) step(world, idle);
  expect(done(), "the awaited event never happened").toBe(true);
};
/** A plain attack windup starting now, as the attack hook receives it. */
const windup = (world: World): Extract<Action, { kind: "windup" }> => ({ kind: "windup", startTick: world.tick, launchTick: world.tick, uncancellable: false, blinded: false, onHit: [], bonusRange: 0 });
const hit = (world: World) => {
  const [self, target] = world.units;
  self.spec.hooks?.onAttack?.({ ...hookContext(world, self), action: windup(world) });
  attackHit(world, self, target, false, []);
};
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const huntBuff = (world: World) => world.units[0].statuses.find((s) => s.memoKey === "buff:warwick:hunt" && s.endTick > world.tick);
/** Eternal Hunger at level 20: the game's formula past 18 (55 at 18, 60.76 at 20). */
const HUNGER = 6 + (49 / 17) * 19;

describe("Warwick reads the wiki at level 20", () => {
  it("Eternal Hunger, Jaws of the Beast, Blood Hunt, Primal Howl and Infinite Duress", () => {
    const spec = compiled.spec;
    expect(spec.attack.onHit).toEqual([{ type: "damage", damageType: "magic", amount: { base: expect.closeTo(HUNGER, 4), ratios: { bonusAD: 0.15, AP: 0.1 } }, label: "Eternal Hunger" }]);
    const q = spec.abilities.find((a) => a.key === "Q")!;
    expect(q).toMatchObject({ cooldown: 6, cost: 100, castTime: 0.264, delivery: { kind: "target", range: 365 }, flags: { spellShield: true, parry: true, appliesOnHit: true, appliesLifeSteal: true, grounded: false } });
    expect(q.onHit).toEqual([{ type: "damage", damageType: "magic", amount: { base: 0, ratios: { targetMaxHP: 0.1, AD: 1.2, AP: 1 } }, label: "Jaws of the Beast" }]);
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 40, cost: 55, castTime: 0.5 });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 11, cost: 40, castTime: 0, chainCooldown: "last", overlay: true });
    expect(spec.abilities.find((a) => a.key === "E2")).toMatchObject({
      chain: { root: "E", index: 2, window: 2.75, delay: 1, auto: true },
      delivery: { kind: "aura", radius: 375 },
      onHit: [{ type: "cc", cc: "fear", duration: 1 }, { type: "cc", cc: "slow", strength: 0.9, duration: 1 }],
    });
    const r = spec.abilities.find((a) => a.key === "R")!;
    // 250% of his 335 base movement speed, from the wiki's note on the "base" range.
    expect(r).toMatchObject({ cooldown: 70, cost: 100, castTime: 0.1, cooldownAtCastStart: true, delivery: { kind: "dash", direction: "toward", distance: 837.5, hitRadius: 205 - 74.75 } });
    expect(r.onHit).toEqual([{ type: "knockdown" }, { type: "cc", cc: "suppression", duration: 1.5 }]);
    expect(compiled.assumptions.some((a) => a.includes("leap speed"))).toBe(true);
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor({ ad: 100, attackSpeed: 0.5, abilityHaste: 20 });
    const [self, target] = w.units;
    const damage = self.spec.budget?.damage?.(self, target);
    expect(damage?.physical).toBeGreaterThan(0);
    expect(damage?.magic).toBeGreaterThan(0);
    expect(self.spec.budget?.healing?.(self, target)).toBeGreaterThan(0);
  });
});

describe("Eternal Hunger", () => {
  it("heals for 100% of its damage below 50% health, 250% below 25%, and nothing above", () => {
    for (const [share, healed] of [[0.6, 0], [0.4, 1], [0.2, 2.5]] as const) {
      const w = worldFor();
      const self = w.units[0];
      self.hp = share * derive(self).maxHp;
      const before = self.hp;
      hit(w);
      expect(self.hp - before).toBeCloseTo(healed * HUNGER, 6);
    }
  });
});

describe("Jaws of the Beast", () => {
  it("bites 0.264 s after the cast, ending the lunge at his attack range from the target's center, displacement immune until then", () => {
    const w = worldFor({}, 200);
    const [self, target] = w.units;
    expect(cast(w, "Q")).toBeUndefined();
    through(w, 4);
    expect(hasState(self, "displacementImmune")).toBe(true);
    expect(logged(w, "Jaws of the Beast deals")).toHaveLength(0);
    through(w, 8);
    const bite = logged(w, "Jaws of the Beast deals");
    expect(bite).toHaveLength(1);
    expect(bite[0]!.tick).toBe(8);
    expect(target.totals.damageTaken).toBeCloseTo(0.1 * 20000 + 1.2 * derive(self).ad + HUNGER, 6);
    expect(Math.abs(target.x - self.x)).toBeCloseTo(125, 6);
    through(w, 10);
    expect(hasState(self, "displacementImmune")).toBe(false);
  });

  it("heals for 75% of the bite's own damage, not of the on-hit damage it applies", () => {
    // A 5,000-health target, so the heal fits in his missing health.
    const w = worldFor({}, 100, { hp: 5000 });
    const self = w.units[0];
    // Above 50% health: Eternal Hunger heals nothing, so the heal is the bite's alone.
    self.hp = 0.6 * derive(self).maxHp;
    const before = self.hp;
    cast(w, "Q");
    through(w, 8);
    const biteDamage = 0.1 * 5000 + 1.2 * derive(self).ad;
    expect(self.hp - before).toBeCloseTo(0.75 * biteDamage, 6);
  });

  it("is cast normally while rooted or grounded: the bite lands, with no lunge", () => {
    for (const cc of ["root", "ground"] as const) {
      const w = worldFor({}, 200);
      const [self, target] = w.units;
      applyEffect(w, target, self, { type: "cc", cc, duration: 5 }, { scale: 1 });
      const x = self.x;
      expect(canCast(w, self, ability(w, "Q"))).toBe(true);
      cast(w, "Q");
      through(w, 8);
      expect(logged(w, "Jaws of the Beast deals")).toHaveLength(1);
      expect(self.x).toBe(x);
    }
  });
});

describe("Blood Hunt", () => {
  it("grants 110% attack speed for 1.25 s for damaging an enemy below 50% health, 220% below 25%, and none above", () => {
    for (const [share, amount] of [[0.6, undefined], [0.4, 1.1], [0.2, 2.2]] as const) {
      const w = worldFor();
      const target = w.units[1];
      target.hp = share * 20000;
      hit(w);
      const buff = huntBuff(w);
      if (amount === undefined) expect(buff).toBeUndefined();
      else {
        expect(buff?.value).toBeCloseTo(amount, 9);
        expect(buff!.endTick - w.tick).toBe(38);
      }
    }
  });

  it("starting an attack against a hunted enemy grants the attack speed, but doesn't refresh it", () => {
    const w = worldFor();
    const [self, target] = w.units;
    target.hp = 0.4 * 20000;
    self.spec.hooks?.onAttack?.({ ...hookContext(w, self), action: windup(w) });
    const first = huntBuff(w);
    expect(first?.value).toBeCloseTo(1.1, 9);
    const end = first!.endTick;
    through(w, 10);
    self.spec.hooks?.onAttack?.({ ...hookContext(w, self), action: windup(w) });
    expect(huntBuff(w)!.endTick).toBe(end);
  });

  it("the active marks the enemy for 8 s: the attack speed whatever its health", () => {
    const w = worldFor();
    cast(w, "W");
    through(w, 15);
    expect(logged(w, "casts Blood Hunt")).toHaveLength(1);
    hit(w);
    expect(huntBuff(w)?.value).toBeCloseTo(1.1, 9);
    through(w, 15 + 8 * 30);
    hit(w);
    // The previous buff ran out long ago and the enemy is healthy: no new one.
    expect(huntBuff(w)).toBeUndefined();
  });

  it("gives movement speed toward a hunted enemy: none for 0.5 s after champion combat, then building up over 3.5 s", () => {
    const w = worldFor({}, 3000);
    const [self, target] = w.units;
    target.hp = 0.4 * 20000;
    hit(w);
    const combat = w.tick;
    self.move = 1;
    // The buff itself (the movement speed soft caps apply on top of it).
    const bonusAt = (tick: number) => {
      through(w, tick);
      return self.statuses.find((s) => s.memoKey === "buff:warwick:trail" && s.endTick > w.tick)?.value ?? 0;
    };
    expect(bonusAt(combat + 10)).toBe(0);
    expect(bonusAt(combat + 15 + 52)).toBeCloseTo(0.65 * (52 / 105), 2);
    expect(bonusAt(combat + 15 + 110)).toBeCloseTo(0.65, 9);
  });
});

describe("Primal Howl", () => {
  it("reduces damage by 55% for up to 2.75 s; the recast comes 1 s later at the earliest, fears and slows 90% for 1 s and ends it", () => {
    const w = worldFor({}, 200);
    const [self, target] = w.units;
    cast(w, "E");
    expect(self.statuses.find((s) => s.memoKey === "warwick:howl")?.value).toBeCloseTo(0.55, 9);
    // through(w, t) runs tick t, leaving the world at t + 1.
    through(w, 28);
    expect(canCast(w, self, ability(w, "E2"))).toBe(false);
    through(w, 29);
    expect(canCast(w, self, ability(w, "E2"))).toBe(true);
    cast(w, "E2");
    expect(target.statuses.some((s) => s.kind === "cc" && s.key === "fear")).toBe(true);
    expect(target.statuses.find((s) => s.kind === "cc" && s.key === "slow")?.value).toBeCloseTo(0.9, 9);
    expect(self.statuses.some((s) => s.memoKey === "warwick:howl")).toBe(false);
  });

  it("the howl locks him out of attacks and casts for 0.25 s and resets his attack timer", () => {
    const w = worldFor({}, 100);
    const self = w.units[0];
    cast(w, "E");
    through(w, 30);
    self.attackReadyTick = w.tick + 20;
    cast(w, "E2");
    expect(self.attackReadyTick).toBe(w.tick);
    expect(hasState(self, "noAttacks")).toBe(true);
    expect(canCast(w, self, ability(w, "Q"))).toBe(false);
    const howl = w.tick;
    through(w, howl + 8);
    expect(hasState(self, "noAttacks")).toBe(false);
    expect(canCast(w, self, ability(w, "Q"))).toBe(true);
  });

  it("howls by itself when the 2.75 s run out; enemies beyond 375 aren't feared", () => {
    const w = worldFor({}, 400);
    const target = w.units[1];
    cast(w, "E");
    through(w, 90);
    expect(w.log.some((e) => e.side === 0 && e.text === "Primal Howl (recast) fires")).toBe(true);
    expect(target.statuses.some((s) => s.kind === "cc" && s.key === "fear")).toBe(false);
  });
});

describe("Infinite Duress", () => {
  const strikes = (w: World) => logged(w, "Infinite Duress deals");

  it("is crowd control immune from the start of its cast time", () => {
    const w = worldFor({}, 300);
    cast(w, "R");
    expect(hasState(w.units[0], "ccImmune")).toBe(true);
  });

  it("suppresses for 1.5 s and strikes six times, 0.25 s apart: 2/9 of its damage with on-hit effects, then 1/9 without", () => {
    const w = worldFor({}, 300);
    const [self, target] = w.units;
    cast(w, "R");
    through(w, 120);
    const hits = strikes(w);
    expect(hits).toHaveLength(6);
    const amounts = hits.map((e) => Number(/deals (\d+)/.exec(e.text)?.[1]));
    expect(amounts).toEqual([117, 58, 117, 58, 117, 58]);
    const landed = w.log.find((e) => e.side === 0 && e.text.startsWith("inflicts suppression"))!.tick;
    expect(hits.map((e) => e.tick - landed)).toEqual([8, 15, 23, 30, 38, 45]);
    // Eternal Hunger rides only on the 1st, 3rd and 5th.
    const procs = logged(w, "Eternal Hunger deals").map((e) => e.tick);
    expect(procs).toEqual([hits[0]!.tick, hits[2]!.tick, hits[4]!.tick]);
    expect(target.statuses.some((s) => s.kind === "cc" && s.key === "suppression")).toBe(false);
    expect(self.action).toBeUndefined();
  });

  it("heals for all the damage he deals during it", () => {
    const w = worldFor({}, 300);
    const [self, target] = w.units;
    self.hp = 0.6 * derive(self).maxHp;
    const hp = self.hp;
    cast(w, "R");
    through(w, 120);
    expect(self.hp - hp).toBeCloseTo(target.totals.damageTaken, 6);
    expect(target.totals.damageTaken).toBeCloseTo(525 + 3 * HUNGER, 6);
  });

  it("doesn't channel on a target its spell shield protects, or one immune to crowd control", () => {
    for (const state of ["spellShield", "ccImmune"] as const) {
      const w = worldFor({}, 300);
      const target = w.units[1];
      applyEffect(w, target, target, { type: "state", state, duration: 10 }, { scale: 1 });
      cast(w, "R");
      through(w, 120);
      expect(strikes(w)).toHaveLength(0);
      expect(target.statuses.some((s) => s.kind === "cc" && s.key === "suppression")).toBe(false);
    }
  });

  it("a spell shield gained during the channel doesn't stop the strikes", () => {
    const w = worldFor({}, 300);
    const target = w.units[1];
    cast(w, "R");
    until(w, () => target.statuses.some((s) => s.kind === "cc" && s.key === "suppression"));
    applyEffect(w, target, target, { type: "state", state: "spellShield", duration: 10 }, { scale: 1 });
    through(w, 120);
    expect(strikes(w)).toHaveLength(6);
  });

  it("cleansing the suppression doesn't end the channel, but its strikes deal no more damage", () => {
    const w = worldFor({}, 300);
    const [self, target] = w.units;
    cast(w, "R");
    until(w, () => strikes(w).length >= 2);
    applyEffect(w, target, target, { type: "cleanse" }, { scale: 1 });
    const taken = target.totals.damageTaken;
    step(w, idle);
    expect(self.action).toMatchObject({ kind: "channel", ability: "R" });
    through(w, 120);
    expect(strikes(w)).toHaveLength(2);
    expect(logged(w, "Infinite Duress strikes, with no damage")).toHaveLength(4);
    expect(target.totals.damageTaken).toBe(taken);
  });

  it("Primal Howl can be cast during the leap; the channel starting sets off the howl without ending the damage reduction", () => {
    const w = worldFor({}, 600);
    const [self, target] = w.units;
    cast(w, "R");
    through(w, 6);
    expect(self.action?.kind).toBe("dash");
    expect(canCast(w, self, ability(w, "E"))).toBe(true);
    cast(w, "E");
    expect(self.action?.kind).toBe("dash");
    until(w, () => target.statuses.some((s) => s.kind === "cc" && s.key === "suppression"));
    expect(target.statuses.some((s) => s.kind === "cc" && s.key === "fear")).toBe(true);
    const reduction = self.statuses.find((s) => s.memoKey === "warwick:howl");
    expect(reduction).toBeDefined();
    expect(reduction!.endTick).toBeGreaterThan(w.tick);
  });

  it("leaps 250% of the movement speed he averaged over the last 2.5 seconds, 275 units at the least", () => {
    const w = worldFor();
    const self = w.units[0];
    const r = ability(w, "R");
    const distanceFor = r.delivery.kind === "dash" ? r.delivery.distanceFor : undefined;
    for (let i = 0; i < 10; i++) self.memory[`duressSpeed${i}`] = i < 5 ? 300 : 500;
    expect(distanceFor?.(self)).toBeCloseTo(2.5 * 400, 9);
    for (let i = 0; i < 10; i++) self.memory[`duressSpeed${i}`] = 100;
    expect(distanceFor?.(self)).toBe(275);
  });
});

describe("Warwick fights", () => {
  it("against a dummy: Blood Hunt, the bite, the howl and Infinite Duress all come out", () => {
    const enemy = fighter({ id: "dummy", base: { hp: 5000, armor: 80, mr: 60, ad: 120 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 500, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 25 } });
    while (!world.result) step(world, [compiled.spec.behavior ?? defaultBehavior, defaultBehavior]);
    for (const name of ["Blood Hunt", "Jaws of the Beast", "Primal Howl", "Infinite Duress"]) {
      expect(world.log.some((e) => e.side === 0 && e.text === `casts ${name}`), name).toBe(true);
    }
    expect(world.result?.winner).toBe(0);
  });
});
