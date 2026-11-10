import { describe, expect, it } from "vitest";
import { startAttack } from "../../engine/sim/actions";
import { abilityHit, attackHit, dealDamage, heal, hookContext } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { grantPermanentBonusHealth } from "../../engine/sim/healthGain";
import { createWorld, step } from "../../engine/sim/simulate";
import type { BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { composeHooks, mapForms } from "../../items/equip";
import { buildLegendBloodline } from "../../runes/legendBloodline";
import { kit } from "../kits/helpers";
import { idle, lasting } from "../sim/helpers";
import { fighter } from "../sim/kits";

const grant = (world: World, key = "rune-effects:health:9103") =>
  grantPermanentBonusHealth(hookContext(world, world.units[0]), 85, key, "Legend: Bloodline");
const rules = { legendBloodline: { baseLifeSteal: 0, lifeStealPerStack: 0.0045, pointsPerStack: 100,
  maxStacks: 15, championKillPoints: 100, bonusHealth: 85 } };
const bloodline = (spec: FighterSpec, points: number): FighterSpec => mapForms(spec, form => {
  const effect = buildLegendBloodline(rules, points);
  return { ...form, hooks: composeHooks(form.hooks, [effect.hooks], [{ onStart: effect.beforeStart }], false) };
});
const seeded = (spec: FighterSpec): FighterSpec => bloodline(spec, 1500);
const champion = (id: string, bonus: BonusStats = {}): FighterSpec => {
  const spec = kit(id).spec;
  return mapForms(spec, form => ({ ...form, bonus, base: { ...form.base, hpRegen: 0, resourceRegen: 0 } }));
};
const arena = (spec: FighterSpec): World => createWorld({
  fighters: [spec, fighter({ base: { hp: 100000, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } })],
  distance: 0, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true },
});
const spell = (world: World, key: string) => world.units[0].spec.abilities.find(ability => ability.key === key)!;
const ownMaximum = (world: World): number => world.units[0].statuses.find(status => status.key === "healthCapAbsolute")!.value;

describe("Bloodline's direct cap-health champion conversions", () => {
  it.each(["Ornn", "Pyke", "Vladimir", "Kled", "KSante", "Malphite", "Galio"])
  ("%s earns its cap from a real hostile champion-body kill with the same permanent stats as a seeded cap", id => {
    const source = champion(id), initial = arena(seeded(source)), earned = arena(bloodline(source, 1499));
    const self = earned.units[0], hp = 500;
    self.hp = hp;
    dealDamage(earned, self, earned.units[1], 200000, "true");
    expect(self.memory["rune:legend-bloodline:points"]).toBe(1500);
    expect(derive(self).maxHp).toBeCloseTo(derive(initial.units[0]).maxHp, 10);
    expect(derive(self).ad).toBeCloseTo(derive(initial.units[0]).ad, 10);
    expect(derive(self).ap).toBeCloseTo(derive(initial.units[0]).ap, 10);
    expect(derive(self).lifeSteal).toBeCloseTo(0.0675, 12);
    expect(self.hp).toBeCloseTo(hp + (id === "Pyke" ? 0 : id === "Ornn" ? 110.5 : 85), 10);
    self.spec.hooks!.onStart!(hookContext(earned, self));
    expect(self.hp).toBeCloseTo(hp + (id === "Pyke" ? 0 : id === "Ornn" ? 110.5 : 85), 10);
  });

  it("uses Ornn's frozen five-upgrade 30% multiplier both before setup and later", () => {
    const source = champion("Ornn", { hp: 500 }), ordinary = arena(source), initial = arena(seeded(source)), earned = arena(source);
    const baseline = derive(ordinary.units[0]).maxHp;
    expect(derive(initial.units[0]).maxHp - baseline).toBeCloseTo(110.5, 10);
    expect(initial.units[0].hp).toBe(derive(initial.units[0]).maxHp);
    earned.units[0].hp -= 300;
    const before = earned.units[0].hp;
    grant(earned);
    expect(derive(earned.units[0]).maxHp).toBeCloseTo(derive(initial.units[0]).maxHp, 10);
    expect(earned.units[0].hp - before).toBeCloseTo(110.5, 10);
    grant(earned);
    expect(earned.units[0].hp - before).toBeCloseTo(110.5, 10);
    expect(source.bonus).toEqual({ hp: 500 });
  });

  it("converts Pyke's seeded and later 85 HP to AD without a refill or extra maximum HP", () => {
    const source = champion("Pyke", { hp: 140 }), bare = arena(source), initial = arena(seeded(source)), earned = arena(source);
    const original = derive(bare.units[0]);
    earned.units[0].hp = 500;
    grant(earned);
    for (const world of [initial, earned]) {
      expect(derive(world.units[0]).maxHp).toBeCloseTo(original.maxHp, 10);
      expect(derive(world.units[0]).ad - original.ad).toBeCloseTo(85 / 14, 10);
    }
    expect(earned.units[0].hp).toBe(500);
    const targetHP = earned.units[1].hp;
    const q = spell(earned, "Q");
    abilityHit(earned, earned.units[0], earned.units[1], q, q.onHit!);
    expect(targetHP - earned.units[1].hp).toBeCloseTo(evaluate(q.onHit![0]!.type === "damage" ? q.onHit![0]!.amount : { base: 0 }, earned.units[0], earned.units[1]), 8);
    expect(derive(earned.units[0]).ad - original.ad).toBeCloseTo(85 / 14, 10);
  });

  it("gives Vladimir only the direct 85 current/max HP and its non-recursive AP", () => {
    const source = champion("Vladimir", { hp: 200, ap: 100 }), bare = arena(source), initial = arena(seeded(source)), earned = arena(source);
    const original = derive(bare.units[0]);
    earned.units[0].hp = 500;
    grant(earned);
    for (const world of [initial, earned]) {
      const current = derive(world.units[0]);
      expect(current.maxHp - original.maxHp).toBeCloseTo(85, 10);
      expect(current.ap - original.ap).toBeCloseTo(2.83305, 10);
    }
    expect(earned.units[0].hp).toBe(585);
    const q = spell(earned, "Q"), before = earned.units[1].hp;
    abilityHit(earned, earned.units[0], earned.units[1], q, q.onHit!);
    expect(before - earned.units[1].hp).toBeCloseTo(evaluate(q.onHit![0]!.type === "damage" ? q.onHit![0]!.amount : { base: 0 }, earned.units[0], earned.units[1]), 8);
  });
});

describe("Kled's fixed own-health maximum during bonus-health awards", () => {
  it("starts the dismounted form at its own legal maximum with a seeded cap", () => {
    const mounted = champion("Kled"), source = mounted.forms!.Kled!;
    const bare = arena(source), initial = arena(seeded(source));
    expect(derive(initial.units[0]).maxHp - derive(bare.units[0]).maxHp).toBe(85);
    expect(initial.units[0].hp).toBe(ownMaximum(initial));
    expect(initial.units[0].hp).toBe(bare.units[0].hp);
  });

  it.each([0, 100])("restores only available own health when dismounted, initially missing %s", (missing) => {
    const world = arena(bloodline(champion("Kled"), 1499)), self = world.units[0];
    dealDamage(world, world.units[1], self, 100000, "true");
    expect(self.spec.form).toBe("Kled");
    const own = ownMaximum(world), combined = derive(self).maxHp;
    self.hp = own - missing;
    dealDamage(world, self, world.units[1], 200000, "true");
    expect(self.memory["rune:legend-bloodline:points"]).toBe(1500);
    expect(derive(self).maxHp).toBe(combined + 85);
    expect(self.hp).toBe(Math.min(own, own - missing + 85));
    heal(world, self, 100000, false, true);
    expect(self.hp).toBe(own);
    expect(ownMaximum(world)).toBe(own);
  });

  it("restores mounted Skaarl then preserves own health through remount and the next dismount", () => {
    const world = arena(champion("Kled")), self = world.units[0];
    const initialMax = derive(self).maxHp;
    self.hp -= 300;
    grant(world, "fixture:mounted");
    expect(self.hp).toBe(initialMax - 300 + 85);
    dealDamage(world, world.units[1], self, 100000, "true");
    const own = ownMaximum(world);
    self.hp = own - 200;
    grant(world);
    const ownCurrent = own - 115, combined = derive(self).maxHp;
    // Contact callbacks earn Courage even though dismount's brief immunity is still active.
    for (let hit = 0; hit < 7; hit++) attackHit(world, self, world.units[1], false, []);
    for (let tick = 0; tick < 10; tick++) step(world, [idle, idle]);
    expect(self.spec.form).toBe("Kled & Skaarl");
    expect(self.hp).toBeCloseTo(ownCurrent + 0.7 * (combined - own), 8);
    expect(self.statuses.some(status => status.key === "healthCapAbsolute" || status.key === "maximumHealthGainCap")).toBe(false);
    dealDamage(world, world.units[1], self, 100000, "true");
    expect(self.spec.form).toBe("Kled");
    expect(self.hp).toBeCloseTo(ownCurrent, 8);
  });
});

describe("All Out's original absolute healing threshold", () => {
  it("lets direct health gain exceed the original cap while later life steal keeps that cap", () => {
    const world = arena(bloodline(champion("KSante"), 1499)), self = world.units[0], r = spell(world, "R");
    const before = derive(self).maxHp;
    abilityHit(world, self, world.units[1], r, r.onHit!);
    const ceiling = ownMaximum(world);
    expect(ceiling).toBeCloseTo(before * 0.65, 10);
    expect(self.hp).toBeCloseTo(ceiling, 10);
    dealDamage(world, self, world.units[1], 200000, "true");
    expect(self.memory["rune:legend-bloodline:points"]).toBe(1500);
    expect(derive(self).maxHp).toBe(before + 85);
    expect(self.hp).toBeCloseTo(ceiling + 85, 10);
    heal(world, self, 100000, false, true);
    expect(self.hp).toBeCloseTo(ceiling + 85, 10);
    self.hp = ceiling - 100;
    heal(world, self, 100000, false, true);
    expect(self.hp).toBeCloseTo(ceiling, 10);
    expect(ownMaximum(world)).toBeCloseTo(ceiling, 10);
  });
});

describe("before-kit maximum-health shield snapshots", () => {
  it.each([["Malphite", 0.1], ["Galio", 0.135]] as const)
  ("includes seeded Bloodline health in %s's setup shield and later recharge", (id, share) => {
    const source = champion(id), bare = arena(source), initial = arena(seeded(source)), earned = arena(source);
    const shields = (world: World) => world.units[0].statuses.filter(status => status.kind === "shield").reduce((total, status) => total + status.value, 0);
    expect(shields(initial) - shields(bare)).toBeCloseTo(85 * share, 10);
    const existing = shields(earned);
    grant(earned);
    expect(shields(earned)).toBe(existing);
    dealDamage(earned, earned.units[1], earned.units[0], 1000, "magic");
    for (let tick = 0; tick < 301; tick++) step(earned, [idle, idle]);
    expect(shields(earned)).toBeCloseTo(derive(earned.units[0]).maxHp * share, 8);
  });
});

describe("source-qualified champion bonus damage life steal", () => {
  const lifeStealTarget = (world: World) => {
    const target = world.units[1];
    target.spec = { ...target.spec, base: { ...target.spec.base, hp: 10000 } };
    target.hp = 10000;
  };
  const nativeAttack = (world: World) => {
    const self = world.units[0];
    while (world.tick < self.attackReadyTick) step(world, [idle, idle]);
    startAttack(world, self);
    expect(self.action?.kind).toBe("windup");
    while (self.action?.kind === "windup") step(world, [idle, idle]);
  };
  const resetHealing = (world: World) => {
    world.units[0].hp = 500;
    world.units[0].totals.healing = 0;
    world.log.length = 0;
  };
  const fourthAttackWorld = (bonus: BonusStats = {}) => {
    const world = arena(seeded(champion("Kled", bonus)));
    lifeStealTarget(world);
    for (let hit = 0; hit < 3; hit++) nativeAttack(world);
    expect(world.units[0].memory.vtCount).toBe(3);
    resetHealing(world);
    return world;
  };
  const allOutWorld = (bonus: BonusStats = {}) => {
    const world = arena(seeded(champion("KSante", bonus))), r = spell(world, "R");
    lifeStealTarget(world);
    abilityHit(world, world.units[0], world.units[1], r, r.onHit!);
    // Resolve All Out's own delayed strike before measuring an attack's healing.
    for (let tick = 0; tick < 15; tick++) step(world, [idle, idle]);
    resetHealing(world);
    return world;
  };

  it("Kled's four actual attacks heal from base damage and the fourth W packet once, while Q stays excluded", () => {
    const world = arena(seeded(champion("Kled"))), self = world.units[0];
    lifeStealTarget(world);
    self.hp = 500;
    const before = world.units[1].hp;
    for (let hit = 0; hit < 4; hit++) nativeAttack(world);
    const damage = before - world.units[1].hp;
    // Rank five: 60 + (6.5% + 0.4% per 100 bonus HP) of 10,000 HP.
    const expected = 4 * derive(self).ad + 60 + (0.065 + 0.00004 * 85) * 10000;
    expect(world.log.filter(entry => entry.text.startsWith("Violent Tendencies deals"))).toHaveLength(1);
    expect(damage).toBeCloseTo(expected, 8);
    expect(self.hp - 500).toBeCloseTo(expected * 0.0675, 8);
    expect(self.totals.healing).toBeCloseTo(expected * 0.0675, 8);
    self.hp = 500;
    const q = spell(world, "Q"), healing = self.totals.healing;
    abilityHit(world, self, world.units[1], q, q.onHit!);
    expect(self.hp).toBe(500);
    expect(self.totals.healing).toBe(healing);
  });

  it("a blocked Kled fourth attack ends its frenzy without granting bonus damage or life steal", () => {
    const world = fourthAttackWorld(), self = world.units[0], target = world.units[1], before = target.hp;
    target.statuses.push(lasting("state", "blockAttacks", 0, { source: 1 }));
    nativeAttack(world);
    expect(target.hp).toBe(before);
    expect(self.hp).toBe(500);
    expect(self.totals.healing).toBe(0);
    expect(world.log.some(entry => entry.text.startsWith("Violent Tendencies deals"))).toBe(false);
    expect(self.memory.vtUntil).toBeUndefined();
    expect(Number(self.memory.vtReady)).toBeGreaterThan(world.tick);
    target.statuses = [];
    nativeAttack(world);
    expect(before - target.hp).toBeCloseTo(derive(self).ad, 8);
    expect(self.hp - 500).toBeCloseTo(derive(self).ad * 0.0675, 8);
  });

  it.each(["dodgeAttacks", "parry"] as const)
  ("%s denies Kled's fourth-hit packet and leaves it available for the next attack", defense => {
    const world = fourthAttackWorld(), self = world.units[0], target = world.units[1], before = target.hp;
    target.statuses.push(lasting("state", defense, 0, { source: 1 }));
    nativeAttack(world);
    // The existing pre-Riposte convention still heals from the parried base packet.
    const baseHealing = defense === "parry" ? derive(self).ad * 0.0675 : 0;
    expect(target.hp).toBe(before);
    expect(self.hp - 500).toBeCloseTo(baseHealing, 8);
    expect(self.totals.healing).toBeCloseTo(baseHealing, 8);
    expect(world.log.some(entry => entry.text.startsWith("Violent Tendencies deals"))).toBe(false);
    expect(self.memory.vtCount).toBe(3);
    target.statuses = [];
    nativeAttack(world);
    expect(world.log.filter(entry => entry.text.startsWith("Violent Tendencies deals"))).toHaveLength(1);
  });

  it("scales Kled's fourth packet, including its bonus-stat products, with the native attack hit", () => {
    const world = fourthAttackWorld({ ad: 100, hp: 200 }), self = world.units[0], target = world.units[1], before = target.hp;
    const fourth = 60 + (0.065 + 0.0002 * 100 + 0.00004 * (200 + 85)) * 10000;
    const expected = 0.5 * (derive(self).ad + fourth);
    attackHit(world, self, target, false, [], undefined, false, {}, 0.5);
    expect(before - target.hp).toBeCloseTo(expected, 8);
    expect(self.hp - 500).toBeCloseTo(expected * 0.0675, 8);
    expect(self.totals.healing).toBeCloseTo(expected * 0.0675, 8);
    expect(world.log.filter(entry => entry.text.startsWith("Violent Tendencies deals"))).toHaveLength(1);
  });

  it("K'Sante's direct attack bonus applies life steal while mark, its extra bonus and Q retain only omnivamp", () => {
    const world = allOutWorld(), self = world.units[0];
    const before = world.units[1].hp, attackDamage = derive(self).ad, directBonus = 0.01 * derive(world.units[1]).maxHp;
    const mark = 12 + (0.01 + 0.01 * 19 / 17) * 10000;
    nativeAttack(world);
    const damage = before - world.units[1].hp;
    expect(world.log.filter(entry => entry.text.startsWith("All Out (bonus) deals"))).toHaveLength(2);
    expect(world.log.filter(entry => entry.text.startsWith("Dauntless Instinct deals"))).toHaveLength(1);
    expect(damage).toBeCloseTo(attackDamage + 2 * directBonus + mark, 8);
    const expected = 0.2 * (attackDamage + 2 * directBonus + mark) + 0.0675 * (attackDamage + directBonus);
    expect(self.hp - 500).toBeCloseTo(expected, 8);
    expect(self.totals.healing).toBeCloseTo(expected, 8);

    self.hp = 500;
    self.totals.healing = 0;
    const q = spell(world, "Q"), qBefore = world.units[1].hp;
    abilityHit(world, self, world.units[1], q, q.onHit!);
    const qDamage = qBefore - world.units[1].hp;
    expect(qDamage).toBeGreaterThan(directBonus);
    expect(self.hp - 500).toBeCloseTo(0.2 * qDamage, 8);
    expect(self.totals.healing).toBeCloseTo(0.2 * qDamage, 8);
  });

  it.each(["blockAttacks", "dodgeAttacks", "parry"] as const)
  ("%s denies K'Sante's direct All Out attack bonus", defense => {
    const world = allOutWorld(), self = world.units[0], target = world.units[1];
    nativeAttack(world); // Consume the mark before isolating the direct attack bonus.
    resetHealing(world);
    const before = target.hp;
    target.statuses.push(lasting("state", defense, 0, { source: 1 }));
    nativeAttack(world);
    const baseHealing = defense === "parry" ? derive(self).ad * (0.2 + 0.0675) : 0;
    expect(target.hp).toBe(before);
    expect(self.hp - 500).toBeCloseTo(baseHealing, 8);
    expect(self.totals.healing).toBeCloseTo(baseHealing, 8);
    expect(world.log.some(entry => entry.text.startsWith("All Out (bonus) deals"))).toBe(false);
  });

  it("a blocked marked attack retains only the mark and its existing omnivamp-only secondary bonus", () => {
    const world = allOutWorld(), self = world.units[0], target = world.units[1], before = target.hp;
    const mark = 12 + (0.01 + 0.01 * 19 / 17) * 10000, secondaryBonus = 0.01 * 10000;
    target.statuses.push(lasting("state", "blockAttacks", 0, { source: 1 }));
    nativeAttack(world);
    expect(before - target.hp).toBeCloseTo(mark + secondaryBonus, 8);
    expect(self.hp - 500).toBeCloseTo(0.2 * (mark + secondaryBonus), 8);
    expect(self.totals.healing).toBeCloseTo(0.2 * (mark + secondaryBonus), 8);
    expect(self.memory.markUntil).toBe(-1);
    expect(world.log.filter(entry => entry.text.startsWith("All Out (bonus) deals"))).toHaveLength(1);
  });

  it("scales only K'Sante's direct eligible attack bonus while preserving separate mark and omnivamp packets", () => {
    const world = allOutWorld({ armor: 100, mr: 50 }), self = world.units[0], target = world.units[1], before = target.hp;
    const bonus = (0.01 + 0.0001 * 100 + 0.0001 * 50) * 10000;
    const mark = 12 + (0.01 + 0.01 * 19 / 17) * 10000;
    const eligible = 0.5 * (derive(self).ad + bonus), damage = eligible + mark + bonus;
    attackHit(world, self, target, false, [], undefined, false, {}, 0.5);
    expect(before - target.hp).toBeCloseTo(damage, 8);
    expect(self.hp - 500).toBeCloseTo(0.2 * damage + 0.0675 * eligible, 8);
    expect(self.totals.healing).toBeCloseTo(0.2 * damage + 0.0675 * eligible, 8);
    expect(world.log.filter(entry => entry.text.startsWith("All Out (bonus) deals"))).toHaveLength(2);
  });
});
