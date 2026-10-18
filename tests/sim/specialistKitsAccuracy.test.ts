import { describe, expect, it } from "vitest";
import { advanceMissiles, advanceZones, canCast, canStartAttack, launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, applyEffect, attackHit, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, DEFAULT_ENVIRONMENT, type World } from "../../engine/sim/state";
import { kit } from "../kits/helpers";
import { idle, lasting } from "./helpers";
import { fighter } from "./kits";

const compiled = (id: string, bonus: FighterSpec["bonus"] = {}) => {
  const spec = kit(id).spec;
  return { ...spec, bonus, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 } };
};
const target = () => fighter({ base: { hp: 10000, armor: 0, mr: 0 } });
const spell = (spec: FighterSpec, key: string) => spec.abilities.find((a) => a.key === key)!;
const worldFor = (id: string, distance = 0, bonus: FighterSpec["bonus"] = {}) => createWorld({ fighters: [compiled(id, bonus), target()], distance, modes: ["idle", "idle"], settings: { log: true, environment: { ...DEFAULT_ENVIRONMENT, laneSetup: false } } });
const advance = (world: World, until: number) => {
  while (world.tick <= until && !world.result) step(world, [idle, idle]);
};
const tickHook = (world: World, tick: number) => {
  world.tick = tick;
  world.units[0].spec.hooks?.onTick?.(hookContext(world, world.units[0]));
};

describe("Teemo's Move Quick and separate poisons (4010102 / 4015245)", () => {
  it("starts with passive speed, ignores persistent damage, and loses it immediately to an ordinary hit", () => {
    const world = worldFor("Teemo");
    const [self, enemy] = world.units;
    const base = self.spec.base.moveSpeed;
    expect(derive(self).rawMoveSpeed).toBeCloseTo(base * 1.28, 9);
    dealDamage(world, enemy, self, 1, "true", { persistent: true });
    expect(derive(self).rawMoveSpeed).toBeCloseTo(base * 1.28, 9);
    dealDamage(world, enemy, self, 1, "true");
    expect(derive(self).rawMoveSpeed).toBe(base);
    tickHook(world, 149);
    expect(derive(self).rawMoveSpeed).toBe(base);
    tickHook(world, 150);
    expect(derive(self).rawMoveSpeed).toBeCloseTo(base * 1.28, 9);
  });

  it("sprints at twice the passive bonus immediately and retains it after a hit", () => {
    const world = worldFor("Teemo");
    const [self, enemy] = world.units;
    startCast(world, self, spell(self.spec, "W"));
    expect(derive(self).rawMoveSpeed).toBeCloseTo(self.spec.base.moveSpeed * 1.56, 9);
    dealDamage(world, enemy, self, 1, "true");
    expect(derive(self).rawMoveSpeed).toBeCloseTo(self.spec.base.moveSpeed * 1.56, 9);
    advance(world, 90);
    expect(derive(self).rawMoveSpeed).toBe(self.spec.base.moveSpeed);
  });

  it("stocks five mushrooms, recharges in 25 seconds, and uses a quarter-second cast cooldown", () => {
    const world = worldFor("Teemo");
    const self = world.units[0];
    const r = spell(self.spec, "R");
    expect(r).toMatchObject({ cooldown: 0.25, charges: { max: 5, recharge: 25 } });
    startCast(world, self, r);
    advance(world, 8);
    expect(self.charges.R).toMatchObject({ count: 4, nextTick: 758 });
    expect(world.zones[0]).toMatchObject({ ability: "R", startTick: 38, endTick: 9008 });
  });

  it("detonates a mushroom into a spell shield without applying its poison or slow", () => {
    const world = createWorld({ fighters: [compiled("Teemo"), target()], distance: 0, modes: ["idle", "idle"], settings: { environment: { ...DEFAULT_ENVIRONMENT, laneSetup: true } } });
    const enemy = world.units[1];
    enemy.statuses.push(lasting("state", "spellShield", 0, { source: 1, charges: 1 }));
    advanceZones(world);
    expect(world.zones).toHaveLength(0);
    expect(enemy.statuses.some((s) => s.kind === "dot" || s.key === "slow")).toBe(false);
    expect(enemy.statuses.some((s) => s.key === "spellShield")).toBe(false);
  });

  it("keeps Toxic Shot separate from Noxious Trap and refreshes repeated mushrooms once", () => {
    const world = createWorld({ fighters: [compiled("Teemo"), target()], distance: 0, modes: ["idle", "idle"], settings: { environment: { ...DEFAULT_ENVIRONMENT, laneSetup: true } } });
    const [self, enemy] = world.units;
    const trap = { ...world.zones[0]! };
    attackHit(world, self, enemy, false, []);
    advanceZones(world);
    expect(enemy.statuses.filter((s) => s.kind === "dot").map((s) => s.key).sort()).toEqual(["R", "attack"]);
    const oldTick = enemy.statuses.find((s) => s.kind === "dot" && s.key === "R")!.dot!.nextTick;
    world.tick = 10;
    world.zones.push({ ...trap, id: world.nextId++, x: enemy.x });
    advanceZones(world);
    expect(enemy.statuses.filter((s) => s.kind === "dot" && s.key === "R")).toHaveLength(1);
    expect(enemy.statuses.find((s) => s.kind === "dot" && s.key === "R")!.dot!.nextTick).toBe(oldTick);
  });
});

describe("Tryndamere's Fury and spell interactions (Battle Fury / Bloodlust / 4052438)", () => {
  it("snapshots a declared attack's critical chance through Bloodlust's Fury consumption", () => {
    const world = worldFor("Tryndamere");
    const [self, enemy] = world.units;
    self.hp = derive(self).maxHp / 2;
    self.resource = 100;
    tickHook(world, 0);
    startAttack(world, self);
    const action = self.action;
    expect(action?.kind).toBe("windup");
    startCast(world, self, spell(self.spec, "Q"));
    expect(self.action).toBe(action);
    expect(self.resource).toBe(0);
    expect(derive(self).critChance).toBe(0);
    const damage = derive(self).ad * (1 + 0.5 * (derive(self).critDamage - 1));
    launchAttack(world, self);
    expect(enemy.totals.damageTaken).toBeCloseTo(damage, 9);
    expect(self.resource).toBeCloseTo(7.5, 9);
  });

  it("heals with zero Fury and updates missing-health AD immediately", () => {
    const world = worldFor("Tryndamere");
    const self = world.units[0];
    self.hp = 1;
    tickHook(world, 0);
    expect(derive(self).ad - derive(self).baseAd).toBe(80);
    const before = self.hp;
    startCast(world, self, spell(self.spec, "Q"));
    expect(self.hp - before).toBe(70);
    expect(self.resource).toBe(0);
    expect(derive(self).ad - derive(self).baseAd).toBe(80);
  });

  it("refunds champion-critical cooldowns and Fury on blocks, while blind and dodge deny both", () => {
    for (const protection of ["blockAttacks", "dodgeAttacks", "blind"] as const) {
      const world = worldFor("Tryndamere");
      const [self, enemy] = world.units;
      self.cooldownReady.E = 300;
      if (protection !== "blind") enemy.statuses.push(lasting("state", protection));
      attackHit(world, self, enemy, protection === "blind", [], undefined, false, { critChance: 1 });
      expect(self.resource, protection).toBe(protection === "blockAttacks" ? 10 : 0);
      expect(self.cooldownReady.E, protection).toBe(protection === "blockAttacks" ? 255 : 300);
    }
  });

  it("begins Fury decay at exactly eight quiet seconds", () => {
    const world = worldFor("Tryndamere");
    const self = world.units[0];
    self.resource = 100;
    tickHook(world, 239);
    expect(self.resource).toBe(100);
    tickHook(world, 240);
    expect(self.resource).toBeCloseTo(100 - 5 / 30, 9);
    expect(derive(self).critChance).toBeCloseTo(self.resource * 0.005, 9);
  });

  it("cuts full total AD, floors bonus AD, and reevaluates the curse when its enemy turns", () => {
    const world = worldFor("Tryndamere");
    const [self, enemy] = world.units;
    enemy.moved = -1;
    const w = spell(self.spec, "W");
    abilityHit(world, self, enemy, w, w.onHit ?? []);
    expect(derive(enemy)).toMatchObject({ baseAd: 100, bonusAd: 0, ad: 20 });
    expect(enemy.statuses.find((s) => s.kind === "cc" && s.key === "slow")?.value).toBe(0.5);
    enemy.moved = 1;
    tickHook(world, 1);
    expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "slow")).toBe(false);
    enemy.moved = -1;
    tickHook(world, 2);
    expect(enemy.statuses.find((s) => s.kind === "cc" && s.key === "slow")?.endTick).toBe(98);
  });

  it("requires a nearby champion for Mocking Shout and prohibits Undying Rage during its cast", () => {
    const world = worldFor("Tryndamere", 1500);
    const self = world.units[0];
    expect(canCast(world, self, spell(self.spec, "W"))).toBe(false);
    world.units[1].x = self.x + 300;
    startCast(world, self, spell(self.spec, "W"));
    expect(canCast(world, self, spell(self.spec, "R"))).toBe(false);
  });

  it("damages along an aimed slash through the enemy and permits Q and R during it", () => {
    const world = worldFor("Tryndamere", 300);
    const [self, enemy] = world.units;
    self.hp = derive(self).maxHp / 2;
    tickHook(world, 0);
    startCast(world, self, spell(self.spec, "E"), { direction: 1, distance: 660 });
    expect(canCast(world, self, spell(self.spec, "Q"))).toBe(true);
    expect(canCast(world, self, spell(self.spec, "R"))).toBe(true);
    advance(world, 8);
    expect(enemy.totals.damageTaken).toBeGreaterThan(0);
    const first = enemy.totals.damageTaken;
    advance(world, 20);
    expect(self.x).toBeGreaterThan(enemy.x);
    expect(enemy.totals.damageTaken).toBe(first);
    expect(self.resource).toBe(5);
  });
});

describe("Tahm Kench's suppression, tongue, and grey health (4063964 / 4078270 / 4021898)", () => {
  const readyDevour = (world: World) => {
    const self = world.units[0];
    self.memory.taste = 3;
    self.memory.tasteUntil = 150;
    startCast(world, self, spell(self.spec, "R"));
  };

  const flyingLash = (key: "Q" | "Qstun", stacks: number, until: number) => {
    const world = worldFor("TahmKench");
    const self = world.units[0];
    world.tick = 149;
    self.memory.taste = stacks;
    self.memory.tasteUntil = until;
    startCast(world, self, spell(self.spec, key));
    advance(world, 157);
    expect(world.tick).toBe(158);
    expect(world.missiles).toHaveLength(1);
    expect(world.missiles[0]?.source).toBe(key);
    expect(world.units[1].totals.damageTaken).toBe(0);
    return world;
  };

  it("does not stun after a third Taste stack fades between declaration and the tongue's impact", () => {
    const world = flyingLash("Qstun", 3, 150);
    const [self, enemy] = world.units;
    step(world, [idle, idle]);
    expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(false);
    expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "slow")).toBe(true);
    expect(self.memory.taste).toBe(3); // The surviving two stacks gain one and refresh.
    expect(self.memory.tasteUntil).toBe(308);
  });

  it("stuns and consumes stacks gained while an ordinary tongue is in flight", () => {
    const world = flyingLash("Q", 2, 500);
    const [self, enemy] = world.units;
    attackHit(world, self, enemy, false, []);
    expect(self.memory.taste).toBe(3);
    step(world, [idle, idle]);
    expect(enemy.statuses.find((s) => s.kind === "cc" && s.key === "stun")?.endTick).toBe(203);
    expect(self.memory.taste).toBe(0);
  });

  it("consumes the impact's three stacks when crowd-control immunity negates its stun", () => {
    const world = flyingLash("Q", 2, 500);
    const [self, enemy] = world.units;
    attackHit(world, self, enemy, false, []);
    enemy.statuses.push(lasting("state", "ccImmune", 0, { source: 1 }));
    step(world, [idle, idle]);
    expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(false);
    expect(self.memory.taste).toBe(0);
  });

  it("keeps impact packets independent across cloned branches and shared spell templates", () => {
    const original = flyingLash("Qstun", 3, 500);
    const copy = cloneWorld(original);
    copy.units[0].memory.taste = 2;
    const template = spell(original.units[0].spec, "Qstun").onHit!;
    const before = JSON.stringify(template);
    step(copy, [idle, idle]);
    step(original, [idle, idle]);
    expect(copy.units[1].statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(false);
    expect(copy.units[0].memory.taste).toBe(3);
    expect(original.units[1].statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(true);
    expect(original.units[0].memory.taste).toBe(0);
    expect(JSON.stringify(template)).toBe(before);
    expect(spell(original.units[0].spec, "Q").onHit?.some((e) => e.type === "cc" && e.cc === "stun")).toBe(false);
  });

  it.each(["Q", "Qstun"] as const)("a spell shield blocks %s's complete impact without changing its Taste stacks or healing", (key) => {
    const world = flyingLash(key, key === "Q" ? 2 : 3, 500);
    const [self, enemy] = world.units;
    if (key === "Q") attackHit(world, self, enemy, false, []);
    self.hp -= 100;
    const before = enemy.totals.damageTaken;
    enemy.statuses.push(lasting("state", "spellShield", 0, { source: 1, charges: 1 }));
    step(world, [idle, idle]);
    expect(enemy.totals.damageTaken).toBe(before);
    expect(enemy.statuses.some((s) => s.kind === "cc")).toBe(false);
    expect(self.memory.taste).toBe(3);
    expect(self.totals.healing).toBe(0);
  });

  it.each([true, false])("parry reports an immobilize according to impact full stacks=%s", (impactFull) => {
    const world = flyingLash(impactFull ? "Q" : "Qstun", impactFull ? 2 : 3, impactFull ? 500 : 150);
    const [self, enemy] = world.units;
    if (impactFull) attackHit(world, self, enemy, false, []);
    enemy.spec = { ...enemy.spec, hooks: { onParry(ctx) { ctx.memory.parriedImmobilize = ctx.immobilizing; } } };
    enemy.statuses.push(lasting("state", "parry", 0, { source: 1 }));
    const before = enemy.totals.damageTaken;
    step(world, [idle, idle]);
    expect(enemy.memory.parriedImmobilize).toBe(impactFull);
    expect(enemy.totals.damageTaken).toBe(before);
    expect(enemy.statuses.some((s) => s.kind === "cc")).toBe(false);
    expect(self.memory.taste).toBe(3);
    expect(self.totals.healing).toBe(0);
  });

  it.each(["spellShield", "ccImmune", "displacementImmune"] as const)("does not carry, protect, or schedule damage after %s blocks Devour", (state) => {
    const world = worldFor("TahmKench");
    const [self, enemy] = world.units;
    enemy.statuses.push(lasting("state", state, 0, { source: 1, charges: 1 }));
    readyDevour(world);
    expect(enemy.attached).toBeUndefined();
    expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "suppression")).toBe(false);
    expect(enemy.statuses.some((s) => s.source === 0 && (s.key === "untargetable" || s.key === "displacementImmune"))).toBe(false);
    expect(self.statuses.some((s) => s.kind === "cc" && (s.key === "ground" || s.key === "slow"))).toBe(false);
    expect(world.scheduled).toHaveLength(0);
    expect(self.memory.taste).toBe(3);
    advance(world, 100);
    expect(enemy.totals.damageTaken).toBe(0);
  });

  it("releases at the full hold and locks attacks and further spells for Regurgitate's 0.4 seconds", () => {
    const world = worldFor("TahmKench");
    const [self, enemy] = world.units;
    readyDevour(world);
    expect(enemy.attached).toBeDefined();
    expect(self.memory.taste).toBe(0);
    advance(world, 97);
    expect(enemy.totals.damageTaken).toBe(0);
    advance(world, 98);
    expect(enemy.totals.damageTaken).toBe(1900);
    expect(enemy.attached).toBeUndefined();
    expect(canCast(world, self, spell(self.spec, "Q"))).toBe(false);
    expect(canStartAttack(world, self)).toBe(false);
    advance(world, 110);
    expect(canCast(world, self, spell(self.spec, "Q"))).toBe(true);
    expect(canStartAttack(world, self)).toBe(true);
  });

  it("detaches and deals Regurgitate once when suppression is cleansed early", () => {
    const world = worldFor("TahmKench");
    const [self, enemy] = world.units;
    readyDevour(world);
    world.tick = 10;
    applyEffect(world, enemy, enemy, { type: "cleanse", types: ["suppression"] }, { scale: 1 });
    tickHook(world, 10);
    expect(enemy.attached).toBeUndefined();
    expect(enemy.statuses.some((s) => s.key === "untargetable" || s.key === "displacementImmune")).toBe(false);
    expect(enemy.totals.damageTaken).toBe(1900);
    expect(world.scheduled).toHaveLength(0);
    advance(world, 100);
    expect(enemy.totals.damageTaken).toBe(1900);
    expect(self.statuses.some((s) => s.kind === "cc" && (s.key === "ground" || s.key === "slow"))).toBe(false);
  });

  it("releases and deals the pending damage when Tahm Kench dies", () => {
    const world = worldFor("TahmKench");
    const [self, enemy] = world.units;
    readyDevour(world);
    dealDamage(world, enemy, self, 100000, "true");
    expect(enemy.attached).toBeUndefined();
    expect(enemy.totals.damageTaken).toBe(1900);
    expect(world.scheduled).toHaveLength(0);
  });

  it("holds a missed tongue through its full flight, prevents attacks and W, and allows Thick Skin", () => {
    const world = worldFor("TahmKench", 100);
    const self = world.units[0];
    self.hp -= 100;
    self.memory.grey = 100;
    self.memory.hurtAt = 0;
    startCast(world, self, spell(self.spec, "Q"));
    advance(world, 8);
    const missile = world.missiles[0]!;
    missile.connects = false;
    expect(canCast(world, self, spell(self.spec, "E"))).toBe(true);
    expect(canCast(world, self, spell(self.spec, "W"))).toBe(false);
    expect(canStartAttack(world, self)).toBe(false);
    world.tick = 12;
    advanceMissiles(world);
    expect(world.missiles).toHaveLength(1);
    expect(canCast(world, self, spell(self.spec, "W"))).toBe(false);
    advance(world, 23);
    expect(world.missiles).toHaveLength(0);
    expect(canCast(world, self, spell(self.spec, "W"))).toBe(true);
  });

  it("scales Taste with bonus health and the AP-health product, while dodges deny its stack", () => {
    const world = worldFor("TahmKench", 0, { hp: 1000, ap: 200 });
    const [self, enemy] = world.units;
    attackHit(world, self, enemy, false, []);
    expect(enemy.totals.damageTaken - derive(self).ad).toBeCloseTo(60 + 40 + 25, 9);
    expect(self.memory.taste).toBe(1);
    enemy.statuses.push(lasting("state", "dodgeAttacks"));
    attackHit(world, self, enemy, false, []);
    expect(self.memory.taste).toBe(1);
  });

  it("stores damage while E is cooling down but postpones grey-health restoration", () => {
    const world = worldFor("TahmKench");
    const [self, enemy] = world.units;
    self.cooldownReady.E = 300;
    dealDamage(world, enemy, self, 1000, "true");
    expect(self.memory.grey).toBe(470);
    tickHook(world, 120);
    expect(self.memory.grey).toBe(470);
    expect(self.totals.healing).toBe(0);
    dealDamage(world, enemy, self, 100, "true");
    expect(self.memory.grey).toBe(517);
  });
});
