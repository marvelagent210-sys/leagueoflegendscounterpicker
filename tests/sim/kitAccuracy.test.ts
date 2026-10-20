import { describe, expect, it } from "vitest";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, attackHit, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import { DEFAULT_ENVIRONMENT } from "../../engine/sim/state";
import type { FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { context, kit } from "../kits/helpers";
import { idle, lasting } from "./helpers";
import { ability, fighter } from "./kits";

const target = () => fighter({ base: { hp: 10000, hpRegen: 0, armor: 0, mr: 0 } });
const spell = (spec: FighterSpec, key: string) => {
  const found = spec.abilities.find((a) => a.key === key);
  if (!found) throw new Error(`${spec.id}: no ${key}`);
  return found;
};
const advance = (world: World, until: number) => {
  while (world.tick <= until) step(world, [idle, idle]);
};

describe("Fiora's committed ability mechanics", () => {
  it("Grand Challenge's unstruck Vitals expire after eight seconds, then a new passive Vital matures", () => {
    const fiora = kit("Fiora").spec;
    const world = createWorld({ fighters: [fiora, target()], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
    const [self, enemy] = world.units;
    startCast(world, self, spell(fiora, "R"));
    advance(world, 240);
    const before = enemy.hp;
    dealDamage(world, self, enemy, 1, "true", { attack: true });
    expect(before - enemy.hp).toBe(1);
    advance(world, 293);
    const ready = enemy.hp;
    dealDamage(world, self, enemy, 1, "true", { attack: true, ability: "Lunge" });
    expect(ready - enemy.hp).toBeCloseTo(1 + 0.03 * derive(enemy).maxHp, 6);
    advance(world, 308);
    const after = enemy.hp;
    dealDamage(world, self, enemy, 1, "true", { attack: true });
    expect(after - enemy.hp).toBe(1);
  });

  it("persistent damage can trigger a ready Vital", () => {
    const world = createWorld({ fighters: [kit("Fiora").spec, target()], distance: 0, modes: ["idle", "idle"] });
    advance(world, 75);
    const [self, enemy] = world.units;
    dealDamage(world, self, enemy, 1, "true", { persistent: true, ability: "damage over time" });
    expect(enemy.totals.damageTaken).toBeCloseTo(301, 6);
  });

  it("blocking an attack's damage still allows its Vital, whereas dodging it does not", () => {
    for (const state of ["blockAttacks", "dodgeAttacks"] as const) {
      const world = createWorld({ fighters: [kit("Fiora").spec, target()], distance: 0, modes: ["idle", "idle"] });
      advance(world, 75);
      const [self, enemy] = world.units;
      enemy.statuses.push(lasting("state", state));
      attackHit(world, self, enemy, false, []);
      expect(enemy.totals.damageTaken, state).toBe(state === "blockAttacks" ? 300 : 0);
    }
  });

  it("one multicomponent hit triggers one Grand Challenge Vital", () => {
    const fiora = kit("Fiora").spec;
    const world = createWorld({ fighters: [fiora, target()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    startCast(world, self, spell(fiora, "R"));
    advance(world, 15);
    abilityHit(world, self, enemy, spell(fiora, "Q"), [
      { type: "damage", damageType: "true", amount: { base: 1 } },
      { type: "damage", damageType: "true", amount: { base: 1 } },
    ]);
    expect(enemy.totals.damageTaken).toBe(302);
  });

  it("Victory Zone heals every quarter second and requires Fiora to remain in its ground area", () => {
    const fiora = kit("Fiora").spec;
    const world = createWorld({ fighters: [fiora, target()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    startCast(world, self, spell(fiora, "R"));
    advance(world, 15);
    for (let i = 0; i < 4; i++) {
      abilityHit(world, self, enemy, spell(fiora, "Q"), [{ type: "damage", damageType: "true", amount: { base: 1 } }]);
      step(world, [idle, idle]);
    }
    self.hp = 500;
    const before = self.totals.healing;
    advance(world, 27);
    expect(self.totals.healing - before).toBeCloseTo(32.5, 6);
    self.x = enemy.x + 700;
    advance(world, 35);
    expect(self.totals.healing - before).toBeCloseTo(32.5, 6);
    self.x = enemy.x;
    advance(world, 42);
    expect(self.totals.healing - before).toBeCloseTo(65, 6);
  });

  it("Riposte empowers its own shock after negating an immobilize, without immediately stunning the attacker", () => {
    const fiora = kit("Fiora").spec;
    const incoming = ability({ key: "incoming", delivery: { kind: "aura", radius: 1000 }, onHit: [{ type: "cc", cc: "stun", duration: 1 }] });
    const world = createWorld({ fighters: [fiora, fighter({ abilities: [incoming], base: { mr: 0 } })], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    startCast(world, self, spell(fiora, "W"));
    advance(world, 8);
    abilityHit(world, enemy, self, incoming, incoming.onHit ?? []);
    expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(false);
    advance(world, 21);
    expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(true);
    expect(enemy.statuses.some((s) => s.kind === "cc" && (s.key === "slow" || s.key === "cripple"))).toBe(false);
    expect(canCast(world, self, spell(fiora, "E"))).toBe(false);
    advance(world, 23);
    expect(canCast(world, self, spell(fiora, "E"))).toBe(true);
  });

  it("a late immobilize converts a landed shock's remaining slow and cripple to stun", () => {
    const fiora = kit("Fiora").spec;
    const incoming = ability({ key: "incoming", delivery: { kind: "self" }, onHit: [{ type: "cc", cc: "root", duration: 1 }] });
    const world = createWorld({ fighters: [fiora, target()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    startCast(world, self, spell(fiora, "W"));
    advance(world, 20);
    const slowUntil = enemy.statuses.find((s) => s.kind === "cc" && s.key === "slow")?.endTick;
    expect(slowUntil).toBeDefined();
    abilityHit(world, enemy, self, incoming, incoming.onHit ?? []);
    expect(enemy.statuses.find((s) => s.kind === "cc" && s.key === "stun")?.endTick).toBe(slowUntil);
    expect(enemy.statuses.some((s) => s.kind === "cc" && (s.key === "slow" || s.key === "cripple"))).toBe(false);
  });
});

describe("Poppy's ground impact", () => {
  it("ruptures even when a spell shield blocked the initial impact", () => {
    const poppy = kit("Poppy").spec;
    const world = createWorld({ fighters: [poppy, target()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    enemy.statuses.push(lasting("state", "spellShield", 0, { charges: 1 }));
    startCast(world, self, spell(poppy, "Q"));
    advance(world, 15);
    expect(enemy.totals.damageTaken).toBe(0);
    advance(world, 45);
    expect(enemy.totals.damageTaken).toBeCloseTo(130 + 0.09 * 10000, 6);
  });

  it("slows only while inside the field and includes its bonus-health scaling", () => {
    const poppy = { ...kit("Poppy").spec, bonus: { hp: 1000 } };
    const world = createWorld({ fighters: [poppy, target()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    startCast(world, self, spell(poppy, "Q"));
    advance(world, 15);
    expect(enemy.statuses.find((s) => s.kind === "cc" && s.key === "slow")?.value).toBeCloseTo(0.4, 6);
    enemy.x += 1000;
    step(world, [idle, idle]);
    expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "slow")).toBe(false);
  });
});

describe("Ornn's Searing Charge shockwave", () => {
  it("deals damage when the shockwave catches a target not hit by the dash", () => {
    const ornn = kit("Ornn").spec;
    const world = createWorld({ fighters: [ornn, target()], distance: 0, modes: ["idle", "idle"], settings: { environment: { ...DEFAULT_ENVIRONMENT, walls: true, wallDistance: 200 } } });
    const [self, enemy] = world.units;
    startCast(world, self, spell(ornn, "E"));
    while (self.action?.kind !== "dash" && world.tick < 20) step(world, [idle, idle]);
    // Move beyond the already chosen impact point but remain within its 360-unit shockwave.
    enemy.x += 400;
    advance(world, 60);
    expect(enemy.totals.damageTaken).toBeCloseTo(260, 6);
  });

  it("does not repeat the damage when the dash already hit the target", () => {
    const ornn = kit("Ornn").spec;
    const world = createWorld({ fighters: [ornn, target()], distance: 0, modes: ["idle", "idle"], settings: { environment: { ...DEFAULT_ENVIRONMENT, walls: true, wallDistance: 200 } } });
    startCast(world, world.units[0], spell(ornn, "E"));
    advance(world, 60);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(260, 6);
  });
});

describe("Urgot's Purge attack rules", () => {
  it("dodges and blocks deny bolts, while Echoing Flames bypasses those effects", () => {
    for (const state of ["dodgeAttacks", "blockAttacks"] as const) {
      const world = createWorld({ fighters: [kit("Urgot").spec, target()], distance: 0, modes: ["idle", "idle"] });
      const [self, enemy] = world.units;
      enemy.statuses.push(lasting("state", state));
      step(world, [idle, idle]);
      expect(enemy.totals.damageTaken, state).toBeCloseTo(derive(self).ad + 0.06 * 10000, 6);
    }
  });

  it("bolts apply life steal and reduce attached on-hit damage to half", () => {
    const compiled = kit("Urgot").spec;
    const urgot = { ...compiled, attack: { ...compiled.attack, onHit: [{ type: "damage" as const, damageType: "true" as const, amount: { base: 100 }, noLifeSteal: true }] } };
    const world = createWorld({ fighters: [urgot, target()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    self.hp = 1000;
    self.statuses.push(lasting("stat", "lifeSteal", 0.5));
    // Defer the independent shotgun so only the bolt's attack rules are measured.
    self.memory.legReady = 100;
    step(world, [idle, idle]);
    const shot = 12 + 0.34 * derive(self).ad;
    expect(enemy.totals.damageTaken).toBeCloseTo(shot + 50, 6);
    expect(self.totals.healing).toBeCloseTo(0.5 * shot, 6);
  });
});

describe("Mundo's Maximum Dosage regeneration", () => {
  it("regenerates all twenty half-second pulses relative to its cast, including its final pulse", () => {
    const mundo = kit("DrMundo").spec;
    const world = createWorld({ fighters: [mundo, target()], distance: 0, modes: ["idle", "idle"] });
    const self = world.units[0];
    world.tick = 7;
    self.hp = 1;
    startCast(world, self, spell(mundo, "R"));
    const max = derive(self).maxHp;
    const values: Array<{ tick: number; amount: number }> = [];
    for (let tick = 8; tick <= 307; tick++) {
      world.tick = tick;
      const ctx = hookContext(world, self);
      ctx.regenerate = (amount) => values.push({ tick, amount });
      mundo.hooks?.onTick?.(ctx);
    }
    // Innate regeneration has a different amount and remains anchored to its own cadence.
    const dosage = values.filter((value) => Math.abs(value.amount - (0.65 * max) / 20) < 1e-6);
    expect(dosage).toHaveLength(20);
    expect(dosage[0]?.tick).toBe(22);
    expect(dosage.at(-1)?.tick).toBe(307);
    expect(dosage.reduce((sum, value) => sum + value.amount, 0)).toBeCloseTo(0.65 * max, 6);
  });

  it("Heart Zapper's persistent pulses do not wake sleep", () => {
    const mundo = kit("DrMundo").spec;
    const world = createWorld({ fighters: [mundo, target()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    enemy.statuses.push(lasting("cc", "sleep"));
    startCast(world, self, spell(mundo, "W"));
    advance(world, 10);
    expect(enemy.totals.damageTaken).toBeGreaterThan(10);
    expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "sleep")).toBe(true);
  });
});

describe("connected but blocked basic attacks", () => {
  it("do not activate Camille's shield or spend its cooldown", () => {
    const world = createWorld({ fighters: [kit("Camille").spec, target()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    enemy.statuses.push(lasting("state", "blockAttacks"));
    attackHit(world, self, enemy, false, []);
    expect(self.statuses.some((s) => s.kind === "shield")).toBe(false);
    enemy.statuses = [];
    attackHit(world, self, enemy, false, []);
    expect(self.statuses.some((s) => s.kind === "shield")).toBe(true);
  });

  it("block Jax's third-hit magic damage", () => {
    const world = createWorld({ fighters: [kit("Jax").spec, target()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    attackHit(world, self, enemy, false, []);
    attackHit(world, self, enemy, false, []);
    const before = enemy.totals.damageTaken;
    enemy.statuses.push(lasting("state", "blockAttacks"));
    attackHit(world, self, enemy, false, []);
    expect(enemy.totals.damageTaken).toBe(before);
  });
});

describe("Trundle's Chomp self-buff", () => {
  it.each(["blind", "dodgeAttacks", "blockAttacks", "parry", "spellShield"] as const)("still grants attack damage after an attack affected by %s", (state) => {
    const trundle = kit("Trundle").spec;
    const world = createWorld({ fighters: [trundle, target()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    const original = derive(self).ad;
    if (state === "blind") self.statuses.push(lasting("cc", "blind"));
    else enemy.statuses.push(lasting("state", state, 0, { charges: 1 }));
    startCast(world, self, spell(trundle, "Q"));
    startAttack(world, self);
    expect(derive(self).ad).toBe(original);
    advance(world, 20);
    expect(derive(self).ad).toBe(original + 40);
    if (state === "blind" || state === "dodgeAttacks" || state === "parry") expect(enemy.totals.damageTaken).toBe(0);
    if (state === "spellShield") {
      expect(enemy.statuses.some((s) => s.kind === "state" && s.key === "spellShield")).toBe(false);
      expect(derive(enemy).ad).toBe(enemy.spec.base.ad);
    }
  });

  it("applies its bonus AD only after the bite's damage", () => {
    const trundle = kit("Trundle").spec;
    const world = createWorld({ fighters: [trundle, target()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    const original = derive(self).ad;
    startCast(world, self, spell(trundle, "Q"));
    startAttack(world, self);
    advance(world, 20);
    expect(enemy.totals.damageTaken).toBeCloseTo(1.55 * original + 90, 6);
    expect(derive(self).ad).toBe(original + 40);
    expect(derive(enemy).ad).toBe(enemy.spec.base.ad - 20);
  });
});

describe("Trundle's King's Tribute", () => {
  it("heals on Sion's first death and does not heal again when the same zombie dies", () => {
    const world = createWorld({ fighters: [kit("Trundle").spec, kit("Sion").spec], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    self.hp = 500;
    const share = context("Trundle").ability("King's Tribute").levelValue("Whenever a nearby enemy dies, Trundle heals himself") / 100;
    const max = derive(enemy).maxHp;
    dealDamage(world, self, enemy, enemy.hp, "true", { attack: true });
    expect(enemy.fallen).toBe(true);
    expect(self.totals.healing).toBeCloseTo(share * max, 6);
    advance(world, 50);
    const healed = self.totals.healing;
    dealDamage(world, self, enemy, enemy.hp, "true", { attack: true });
    expect(self.totals.healing).toBe(healed);
  });

  it("does not grant the heal for a death outside its 1400-unit radius", () => {
    const world = createWorld({ fighters: [kit("Trundle").spec, target()], distance: 1500, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    self.hp = 500;
    dealDamage(world, self, enemy, enemy.hp, "true", { ability: "Subjugate" });
    expect(self.totals.healing).toBe(0);
    self.x = enemy.x;
    step(world, [idle, idle]);
    expect(self.totals.healing).toBe(0);
  });
});
