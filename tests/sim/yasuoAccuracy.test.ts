import { describe, expect, it } from "vitest";
import { canCast, canStartAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, applyEffect, attackHit, dealDamage } from "../../engine/sim/combat";
import { defaultBehavior, expectedDamage, perceive } from "../../engine/sim/behavior";
import { derive } from "../../engine/sim/derived";
import { describeAbility } from "../../engine/sim/describe";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { kit } from "../kits/helpers";
import { idle, lasting } from "./helpers";
import { ability, fighter } from "./kits";

const spell = (spec: FighterSpec, key: string) => {
  const found = spec.abilities.find((a) => a.key === key);
  if (!found) throw new Error(`${spec.id}: no ${key}`);
  return found;
};
const advance = (world: World, until: number) => {
  while (world.tick <= until) step(world, [idle, idle]);
};
const armored = () => fighter({ base: { hp: 10000, hpRegen: 0, armor: 100 }, bonus: { armor: 100 } });
const breathWorld = (critChance = 0.5) => {
  const yasuo = { ...kit("Yasuo").spec, bonus: { critChance } };
  const world = createWorld({ fighters: [yasuo, armored()], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
  world.units[1].statuses.push(lasting("cc", "airborne", 0, { endTick: 27 }));
  startCast(world, world.units[0], spell(yasuo, "R"));
  return world;
};

describe("Yasuo's Last Breath suspension", () => {
  it("locks Yasuo out of actions until the one-second suspension deals its damage", () => {
    const world = breathWorld();
    const [self, enemy] = world.units;
    const q = spell(self.spec, "Q");
    const x = self.x;
    expect(self.action).toMatchObject({ kind: "channel", ability: "R", endTick: 30 });
    expect(canCast(world, self, q)).toBe(false);
    expect(canStartAttack(world, self)).toBe(false);
    advance(world, 29);
    expect(enemy.totals.damageTaken).toBe(0);
    expect(self.x).toBe(x);
    step(world, [idle, idle]);
    expect(enemy.totals.damageTaken).toBeCloseTo(500 / 3, 6);
    expect(canCast(world, self, q)).toBe(true);
    expect(canStartAttack(world, self)).toBe(true);
  });

  it("ends early and applies the ultimate's damage when the target cleanses its airborne", () => {
    const world = breathWorld();
    const [self, enemy] = world.units;
    advance(world, 10);
    enemy.statuses = enemy.statuses.filter((s) => s.kind !== "cc");
    enemy.forced = { endTick: 100, perTick: 10 };
    step(world, [idle, idle]);
    expect(self.action).toBeUndefined();
    expect(enemy.forced).toBeUndefined();
    expect(enemy.totals.damageTaken).toBeCloseTo(500 / 3, 6);
    advance(world, 35);
    expect(enemy.totals.damageTaken).toBeCloseTo(500 / 3, 6);
  });

  it("consumes a spell shield without letting it prevent suspension or damage", () => {
    const yasuo = kit("Yasuo").spec;
    const world = createWorld({ fighters: [yasuo, armored()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    enemy.statuses.push(lasting("cc", "airborne"), lasting("state", "spellShield", 0, { charges: 1 }));
    startCast(world, self, spell(yasuo, "R"));
    expect(enemy.statuses.some((s) => s.kind === "state" && s.key === "spellShield")).toBe(false);
    advance(world, 30);
    expect(enemy.totals.damageTaken).toBeCloseTo(500 / 3, 6);
  });
});

describe("Last Breath's critical-only bonus armor ignorance", () => {
  it("ignores sixty percent of bonus armor for a critical attack, preserving base armor", () => {
    const world = breathWorld();
    advance(world, 30);
    const [self, enemy] = world.units;
    const before = enemy.totals.damageTaken;
    attackHit(world, self, enemy, false, []);
    // 100 base armor remains; 100 bonus armor becomes 40. Yasuo crits for 190% AD.
    expect(enemy.totals.damageTaken - before).toBeCloseTo(1.9 * derive(self).ad / 2.4, 6);
  });

  it("does not ignore bonus armor for ordinary attacks or Steel Tempest's flat damage", () => {
    const normal = breathWorld(0);
    advance(normal, 30);
    let [self, enemy] = normal.units;
    let before = enemy.totals.damageTaken;
    attackHit(normal, self, enemy, false, []);
    expect(enemy.totals.damageTaken - before).toBeCloseTo(derive(self).ad / 3, 6);
    const critical = breathWorld();
    advance(critical, 30);
    [self, enemy] = critical.units;
    before = enemy.totals.damageTaken;
    const q = spell(self.spec, "Q");
    abilityHit(critical, self, enemy, q, q.onHit ?? []);
    expect(enemy.totals.damageTaken - before).toBeCloseTo(120 / 3 + 1.05 * derive(self).ad * 1.9 / 2.4, 6);
  });

  it("averages critical and noncritical damage after their distinct armor mitigation", () => {
    const world = breathWorld(0.25);
    advance(world, 30);
    const [self, enemy] = world.units;
    const before = enemy.totals.damageTaken;
    attackHit(world, self, enemy, false, []);
    expect(enemy.totals.damageTaken - before).toBeCloseTo(derive(self).ad * (0.5 / 3 + 0.5 * 1.9 / 2.4), 6);
    const q = spell(self.spec, "Q");
    const estimate = expectedDamage(q.onHit ?? [], self, enemy);
    const beforeQ = enemy.totals.damageTaken;
    abilityHit(world, self, enemy, q, q.onHit ?? []);
    expect(enemy.totals.damageTaken - beforeQ).toBeCloseTo(estimate, 6);
  });

  it("adds its bonus armor ignorance to existing total percentage penetration", () => {
    const world = breathWorld();
    advance(world, 30);
    const [self, enemy] = world.units;
    self.statuses.push(lasting("stat", "armorPen", 0.2));
    const before = enemy.totals.damageTaken;
    attackHit(world, self, enemy, false, []);
    // Base armor: 100 * .8; bonus armor: 100 * (1 - .2 - .6). Total: 100.
    expect(enemy.totals.damageTaken - before).toBeCloseTo(1.9 * derive(self).ad / 2, 6);
  });

  it("cannot penetrate bonus armor below zero or affect already-negative total armor", () => {
    const world = breathWorld();
    advance(world, 30);
    const [self, enemy] = world.units;
    self.statuses.push(lasting("stat", "armorPen", 0.6));
    let before = enemy.totals.damageTaken;
    attackHit(world, self, enemy, false, []);
    expect(enemy.totals.damageTaken - before).toBeCloseTo(1.9 * derive(self).ad / 1.4, 6);
    enemy.spec = { ...enemy.spec, base: { ...enemy.spec.base, armor: -100 }, bonus: {} };
    before = enemy.totals.damageTaken;
    attackHit(world, self, enemy, false, []);
    expect(enemy.totals.damageTaken - before).toBeCloseTo(1.9 * derive(self).ad * 1.5, 6);
  });

  it("expires fifteen seconds after Last Breath was cast", () => {
    const world = breathWorld();
    advance(world, 450);
    const [self, enemy] = world.units;
    const before = enemy.totals.damageTaken;
    attackHit(world, self, enemy, false, []);
    expect(enemy.totals.damageTaken - before).toBeCloseTo(1.9 * derive(self).ad / 3, 6);
  });

  it("keeps averaged critical mitigation as one hit for shield, health-floor, vamp and hook processing", () => {
    let dealt = 0;
    let taken = 0;
    const source = fighter({ hooks: { onDamageDealt: () => dealt++ } });
    const target = { ...armored(), hooks: { onDamageTaken: () => taken++ } };
    const world = createWorld({ fighters: [source, target], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    self.hp = 500;
    self.statuses.push(lasting("stat", "criticalBonusArmorIgnore", 0.6), lasting("stat", "lifeSteal", 0.5));
    enemy.statuses.push(lasting("shield", "test", 20), lasting("state", "minimumHealth", enemy.hp - 10));
    dealDamage(world, self, enemy, 100, "physical", { attack: true, crit: { chance: 0.5, multiplier: 2 } });
    const mitigated = 0.5 * 100 / 3 + 0.5 * 200 / 2.4;
    expect(enemy.totals.absorbed).toBe(20);
    expect(enemy.totals.damageTaken).toBe(10);
    expect(self.totals.healing).toBeCloseTo(0.5 * mitigated, 6);
    expect(dealt).toBe(1);
    expect(taken).toBe(1);
  });
});

describe("Steel Tempest's pinned source cast-time curves", () => {
  it.each([
    [0, 0.35, 0.35],
    [0.24, 0.315, 0.315],
    [0.48, 0.28, 0.28],
    [0.72, 0.245, 0.28],
    [1.2, 0.175, 0.28],
    [2, 0.175, 0.28],
  ])("uses %f bonus attack speed: thrust %f s, whirlwind %f s", (bonus, thrust, whirlwind) => {
    const compiled = kit("Yasuo").spec;
    const yasuo = { ...compiled, base: { ...compiled.base, attackSpeed: { ...compiled.base.attackSpeed, bonus } } };
    const world = createWorld({ fighters: [yasuo, armored()], distance: 0, modes: ["idle", "idle"] });
    const self = world.units[0];
    expect(spell(yasuo, "Q").castTimeFor?.(self)).toBeCloseTo(thrust, 6);
    expect(spell(yasuo, "Q3").castTimeFor?.(self)).toBeCloseTo(whirlwind, 6);
  });

  it("uses the shortened cast time when the simulator starts Steel Tempest", () => {
    const compiled = kit("Yasuo").spec;
    const yasuo = { ...compiled, base: { ...compiled.base, attackSpeed: { ...compiled.base.attackSpeed, bonus: 0.48 } } };
    const world = createWorld({ fighters: [yasuo, armored()], distance: 0, modes: ["idle", "idle"] });
    startCast(world, world.units[0], spell(yasuo, "Q"));
    expect(world.units[0].action).toMatchObject({ kind: "cast", ability: "Q", endTick: 9 });
    expect(describeAbility(spell(yasuo, "Q")).castTime).toBe("depends on stats (0.35 base)");
  });

  it.each(["Q", "Q3"])("shares the source's AS-scaled %s cooldown without letting ability haste shorten it", (key) => {
    const compiled = kit("Yasuo").spec;
    const yasuo = { ...compiled, base: { ...compiled.base, attackSpeed: { ...compiled.base.attackSpeed, bonus: 0.48 } }, bonus: { abilityHaste: 100 } };
    const world = createWorld({ fighters: [yasuo, armored()], distance: 0, modes: ["idle", "idle"] });
    const self = world.units[0];
    if (key === "Q3") {
      self.memory.storm = 2;
      self.memory.stormUntil = 100;
    }
    startCast(world, self, spell(yasuo, key));
    advance(world, 9);
    // Q finishes at tick9; the 2.848-second static cooldown takes86 ticks, unaffected by100AH.
    expect(self.cooldownReady.Q).toBe(95);
    expect(spell(yasuo, key).cooldownFor?.(self)).toBeCloseTo(2.848, 6);
  });

  it("uses dynamic cast durations when judging whether damage would land during invulnerability", () => {
    const q = ability({ key: "Q", cooldown: 5, castTime: 1, castTimeFor: () => 0.1, delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 1000 } }] });
    const world = createWorld({ fighters: [fighter({ abilities: [q] }), armored()], distance: 0, modes: ["fight", "idle"] });
    world.units[1].statuses.push(lasting("state", "invulnerable", 0, { endTick: 15 }));
    expect(defaultBehavior(perceive(world, 0))).not.toMatchObject({ kind: "cast", ability: "Q" });
    world.tick = 15;
    expect(defaultBehavior(perceive(world, 0))).toMatchObject({ kind: "cast", ability: "Q" });
  });

  it("uses a defensive spell's dynamic activation time when reacting to incoming damage", () => {
    const guard = ability({ key: "W", castTime: 1, castTimeFor: () => 0.05, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "invulnerable", duration: 0.3 }] });
    const incoming = ability({ key: "R", castTime: 0.4, delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 1000 } }] });
    const world = createWorld({ fighters: [fighter({ abilities: [guard] }), fighter({ abilities: [incoming] })], distance: 0, modes: ["fight", "idle"], settings: { log: true } });
    startCast(world, world.units[1], incoming);
    while (world.tick <= 15) step(world, [defaultBehavior, idle]);
    expect(world.log.some((e) => e.side === 0 && e.text === "casts W")).toBe(true);
    expect(world.units[0].totals.damageTaken).toBe(0);
  });
});

describe("Sweeping Blade's distance and Flow", () => {
  it("travels the fixed 475 units through its target, hits once and generates its documented 7.5 Flow", () => {
    const yasuo = kit("Yasuo").spec;
    const enemy = fighter({ base: { hp: 10000, mr: 0 } });
    const world = createWorld({ fighters: [yasuo, enemy], distance: 100, modes: ["idle", "idle"] });
    const self = world.units[0];
    const start = self.x;
    self.memory.flow = 0;
    startCast(world, self, spell(yasuo, "E"));
    advance(world, 20);
    expect(self.x - start).toBeCloseTo(475, 6);
    expect(self.x).toBeGreaterThan(world.units[1].x);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(130, 6);
    expect(self.memory.flow).toBeCloseTo(7.5, 6);
    expect(self.statuses.some((s) => s.kind === "state" && s.key === "ghosted")).toBe(true);
  });

  it.each(["root", "polymorph"] as const)("is knocked down by %s", (cc) => {
    const yasuo = kit("Yasuo").spec;
    const world = createWorld({ fighters: [yasuo, armored()], distance: 100, modes: ["idle", "idle"] });
    const self = world.units[0];
    startCast(world, self, spell(yasuo, "E"));
    applyEffect(world, world.units[1], self, { type: "cc", cc, duration: 1 }, { scale: 1 });
    step(world, [idle, idle]);
    expect(self.action).toBeUndefined();
  });

  it("continues its dash when put to sleep, the recorded knockdown exception", () => {
    const yasuo = kit("Yasuo").spec;
    const world = createWorld({ fighters: [yasuo, armored()], distance: 100, modes: ["idle", "idle"] });
    const self = world.units[0];
    const start = self.x;
    startCast(world, self, spell(yasuo, "E"));
    applyEffect(world, world.units[1], self, { type: "cc", cc: "sleep", duration: 1 }, { scale: 1 });
    advance(world, 20);
    expect(self.x - start).toBeCloseTo(475, 6);
  });

  it("keeps Steel Tempest's bonus-AS timing while a cripple slows basic attacks", () => {
    const yasuo = kit("Yasuo").spec;
    const world = createWorld({ fighters: [yasuo, armored()], distance: 0, modes: ["idle", "idle"] });
    const self = world.units[0];
    const q = spell(yasuo, "Q");
    const cast = q.castTimeFor?.(self);
    const cooldown = q.cooldownFor?.(self);
    const speed = derive(self).attackSpeed;
    applyEffect(world, world.units[1], self, { type: "cc", cc: "cripple", strength: 0.5, duration: 3 }, { scale: 1 });
    expect(derive(self).attackSpeed).toBeCloseTo(speed * 0.5, 6);
    expect(q.castTimeFor?.(self)).toBe(cast);
    expect(q.cooldownFor?.(self)).toBe(cooldown);
  });
});

describe("Last Breath's target and placement", () => {
  it("blinks to the opposite side of its airborne enemy", () => {
    const yasuo = kit("Yasuo").spec;
    const world = createWorld({ fighters: [yasuo, armored()], distance: 300, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    expect(self.x).toBeLessThan(enemy.x);
    enemy.statuses.push(lasting("cc", "airborne", 0, { source: self.side }));
    startCast(world, self, spell(yasuo, "R"));
    expect(self.x).toBeGreaterThan(enemy.x);
  });

  it("does not accept an enemy's self-applied airborne as an ultimate target", () => {
    const yasuo = kit("Yasuo").spec;
    const world = createWorld({ fighters: [yasuo, armored()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    enemy.statuses.push(lasting("cc", "airborne", 0, { source: enemy.side }));
    expect(canCast(world, self, spell(yasuo, "R"))).toBe(false);
  });
});

describe("Steel Tempest's first-target interactions", () => {
  it.each([
    ["Q", "dodgeAttacks"], ["Q", "blockAttacks"],
    ["Q3", "dodgeAttacks"], ["Q3", "blockAttacks"],
  ])("denies %s damage and attached on-hit damage under %s without denying its non-damage effects", (key, state) => {
    const compiled = kit("Yasuo").spec;
    const yasuo = { ...compiled, attack: { ...compiled.attack, onHit: [{ type: "damage" as const, damageType: "true" as const, amount: { base: 40 } }] } };
    let avoided = 0;
    const target = { ...armored(), hooks: { onAttackAvoided: () => avoided++ } };
    const world = createWorld({ fighters: [yasuo, target], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    self.hp = 500;
    self.statuses.push(lasting("stat", "lifeSteal", 0.5));
    enemy.statuses.push(lasting("state", state));
    const q = spell(yasuo, key);
    abilityHit(world, self, enemy, q, q.onHit ?? []);
    expect(enemy.totals.damageTaken).toBe(0);
    expect(self.totals.healing).toBe(0);
    expect(avoided).toBe(1);
    if (key === "Q") expect(self.memory.storm).toBe(1);
    else expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "airborne")).toBe(true);
  });

  it.each(["Q", "Q3"])("still deals %s damage and applies on-hit damage while Yasuo is blind", (key) => {
    const compiled = kit("Yasuo").spec;
    const yasuo = { ...compiled, attack: { ...compiled.attack, onHit: [{ type: "damage" as const, damageType: "true" as const, amount: { base: 40 } }] } };
    const world = createWorld({ fighters: [yasuo, armored()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    self.statuses.push(lasting("cc", "blind"));
    const q = spell(yasuo, key);
    const damage = expectedDamage(q.onHit ?? [], self, enemy) + 40;
    abilityHit(world, self, enemy, q, q.onHit ?? []);
    expect(enemy.totals.damageTaken).toBeCloseTo(damage, 6);
    if (key === "Q") expect(self.memory.storm).toBe(1);
    else expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "airborne")).toBe(true);
  });

  it("gains Gathering Storm from a spell-shielded contact without dealing damage", () => {
    const yasuo = kit("Yasuo").spec;
    const world = createWorld({ fighters: [yasuo, armored()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    enemy.statuses.push(lasting("state", "spellShield", 0, { charges: 1 }));
    const q = spell(yasuo, "Q");
    abilityHit(world, self, enemy, q, q.onHit ?? []);
    expect(enemy.totals.damageTaken).toBe(0);
    expect(self.memory.storm).toBe(1);
    expect(self.memory.stormUntil).toBe(180);
    expect(enemy.statuses.some((s) => s.kind === "state" && s.key === "spellShield")).toBe(false);
  });

  it.each(["Q", "Q3"])("heals through life steal from %s's first-target damage", (key) => {
    const yasuo = kit("Yasuo").spec;
    const world = createWorld({ fighters: [yasuo, armored()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    self.hp = 500;
    self.statuses.push(lasting("stat", "lifeSteal", 0.5));
    const q = spell(yasuo, key);
    abilityHit(world, self, enemy, q, q.onHit ?? []);
    expect(self.totals.healing).toBeCloseTo(enemy.totals.damageTaken * 0.5, 6);
  });
});
