/**
 * A unit's current combat stats: level-20 base stats, plus the stat budget, plus its active
 * buffs and debuffs, through the global rules (attack speed cap, slows, tenacity, ...).
 */
import { CC_RULES, type CCType, combineTenacity } from "../rules/crowdControl";
import { CRIT_DAMAGE } from "../rules/defense";
import { combineSlowResist, movementSpeed } from "../rules/movement";
import { capAttackSpeed } from "../rules/timing";
import { ATTACK_SPEED_CAP } from "../stats";
import type { BaseStats, BonusStats, FighterSpec, Formula, StatRef } from "./spec";
import type { Status, Unit } from "./state";

export interface Derived {
  maxHp: number;
  baseAd: number;
  bonusAd: number;
  ad: number;
  ap: number;
  armor: { base: number; bonus: number };
  mr: { base: number; bonus: number };
  /** Bonus attack speed as a fraction: from levels, the budget and buffs. */
  bonusAttackSpeed: number;
  /** Attacks per second after the cap and attack speed slows. */
  attackSpeed: number;
  critChance: number;
  critDamage: number;
  abilityHaste: number;
  lethality: number;
  magicPen: number;
  /** Percentage penetration, as fractions (several multiply). */
  armorPen: number[];
  magicPenPercent: number[];
  moveSpeed: number;
  /** Movement speed before soft caps, or the supplied effective speed when explicitly overridden. */
  rawMoveSpeed: number;
  tenacity: number;
  /** Damage dealt modifiers (fractions, additive). */
  damageDealt: number[];
  /** Damage received reductions (fractions, multiplicative). */
  damageReduction: number[];
  physicalReduction: number[];
  magicReduction: number[];
  armorReduction: { flat: number; percent: number[] };
  mrReduction: { flat: number; percent: number[] };
  lifeSteal: number;
  /** Extra healing and regeneration received, as a fraction. */
  healingIncrease: number;
  maxResource: number;
  bonusArmorPen: number[];
  criticalBonusArmorIgnore: number;
}

function sum(statuses: Status[], key: string): number {
  let total = 0;
  for (let index = 0; index < statuses.length; index++) {
    if (!(index in statuses)) continue;
    const status = statuses[index]!;
    if (status.kind === "stat" && status.key === key) total += status.value;
  }
  return total;
}

function list(statuses: Status[], kind: Status["kind"], key: string): number[] {
  const values: number[] = [];
  for (let index = 0; index < statuses.length; index++) {
    if (!(index in statuses)) continue;
    const status = statuses[index]!;
    if (status.kind === kind && status.key === key) values.push(status.value);
  }
  return values;
}

/** Dependency checks read current recipient state, even after the originating caster dies. */
export function statIsActive(status: Status, statuses: readonly Status[]): boolean {
  if (status.kind === "stat" && status.requiresShield && !statuses.some(candidate => candidate.kind === "shield" && candidate.value > 0 && candidate.source === status.source && (candidate.ability ?? candidate.key) === (status.ability ?? "shield"))) return false;
  if (status.whileCC && !statuses.some(candidate => candidate.kind === "cc" && candidate.key === status.whileCC && candidate.source === status.source && candidate.ability === status.ability)) return false;
  return true;
}

/** Distinct cripples multiply; refreshing/ramping the same source does not stack it. */
function attackSpeedSlowFactor(statuses: Status[]): number {
  const sources = new Map<string, number>();
  for (const status of statuses) {
    if (status.kind !== "cc" || status.key !== "cripple") continue;
    const source = `${status.source}:${status.ability ?? "cripple"}`;
    sources.set(source, Math.max(sources.get(source) ?? 0, status.value));
  }
  // Attack speed, revision 4073067: attack speed reductions stack multiplicatively.
  return [...sources.values()].reduce((factor, slow) => factor * (1 - Math.min(1, slow)), 1);
}

export function hasState(unit: Unit, state: string): boolean {
  return unit.statuses.some((s) => s.kind === "state" && s.key === state);
}

export function ccTypes(unit: Unit): Set<CCType> {
  return new Set(unit.statuses.filter((s) => s.kind === "cc" && statIsActive(s, unit.statuses)).map((s) => s.key as CCType));
}

type StatConversions = NonNullable<FighterSpec["statConversions"]>;
type DerivedStatusInput = Pick<Status, "kind" | "key" | "value" | "source" | "ability" | "tenacityGroup" | "bypassSlowImmune" | "requiresShield" | "whileCC" | "slowStackGroup">;

interface DerivedCache {
  base: BaseStats;
  bonus: BonusStats | undefined;
  conversions: StatConversions | undefined;
  statuses: DerivedStatusInput[];
  value: Derived;
}

/** Inputs can mutate in place; object identity or array length does not establish freshness. */
const cache = new WeakMap<Unit, DerivedCache>();

function sameDerivedInputs(unit: Unit, previous: DerivedCache): boolean {
  // Keep these primitive reads aligned with computeDerived. The regression fixtures
  // enumerate every base, bought and conversion stat when their interfaces expand.
  const { base, bonus, statConversions } = unit.spec;
  const old = previous.base;
  if (base.hp !== old.hp || base.ad !== old.ad || base.armor !== old.armor || base.mr !== old.mr
      || base.resource !== old.resource || base.moveSpeed !== old.moveSpeed
      || base.critDamageModifier !== old.critDamageModifier
      || base.attackSpeed.base !== old.attackSpeed.base || base.attackSpeed.ratio !== old.attackSpeed.ratio
      || base.attackSpeed.bonus !== old.attackSpeed.bonus) return false;
  const bought = previous.bonus;
  if (bonus && bought) {
    if (bonus.ad !== bought.ad || bonus.ap !== bought.ap || bonus.hp !== bought.hp
        || bonus.armor !== bought.armor || bonus.mr !== bought.mr || bonus.attackSpeed !== bought.attackSpeed
        || bonus.critChance !== bought.critChance || bonus.abilityHaste !== bought.abilityHaste
        || bonus.lethality !== bought.lethality || bonus.magicPen !== bought.magicPen
        || bonus.armorPenPoints !== bought.armorPenPoints || bonus.magicPenPoints !== bought.magicPenPoints) return false;
  } else if (bonus !== bought) return false;
  const conversions = previous.conversions;
  if (statConversions && conversions) {
    if (statConversions.healthToAP !== conversions.healthToAP || statConversions.apToHealth !== conversions.apToHealth
        || statConversions.apToManaPercent !== conversions.apToManaPercent
        || statConversions.moveSpeedBonusEffectiveness !== conversions.moveSpeedBonusEffectiveness
        || statConversions.totalMoveSpeedOverride !== conversions.totalMoveSpeedOverride
        || statConversions.minimumMoveSpeed !== conversions.minimumMoveSpeed
        || statConversions.fixedAttackSpeed !== conversions.fixedAttackSpeed) return false;
    const multiplier = statConversions.attackDamageMultiplier, before = conversions.attackDamageMultiplier;
    if (multiplier && before) {
      if (multiplier.base !== before.base || multiplier.critChance !== before.critChance || multiplier.bonusAttackSpeed !== before.bonusAttackSpeed) return false;
    } else if (multiplier !== before) return false;
  } else if (statConversions !== conversions) return false;
  if (unit.statuses.length !== previous.statuses.length) return false;
  for (let index = 0; index < unit.statuses.length; index++) {
    const status = unit.statuses[index]!;
    const before = previous.statuses[index]!;
    if (status.kind !== before.kind || status.key !== before.key || status.value !== before.value
        || status.source !== before.source || status.ability !== before.ability
        || status.tenacityGroup !== before.tenacityGroup
        || status.bypassSlowImmune !== before.bypassSlowImmune
        || status.slowStackGroup !== before.slowStackGroup
        || status.requiresShield !== before.requiresShield || status.whileCC !== before.whileCC) return false;
  }
  return true;
}

/** Units' derived stats while `withSettledStats` runs: derived and checked once, then reused. */
let settled: Map<Unit, Derived> | undefined;

/**
 * Runs `read` with every unit's derived stats settled: the first derive of a unit is checked as
 * usual, and the rest reuse it until `read` returns. For callers that only read units while it
 * runs: the build search's quick estimate values finished units thousands of times, and checking
 * their statuses on every derive was half its time.
 */
export function withSettledStats<T>(read: () => T): T {
  if (settled) return read();
  settled = new Map();
  try {
    return read();
  } finally {
    settled = undefined;
  }
}

export function derive(unit: Unit): Derived {
  const known = settled?.get(unit);
  if (known) return known;
  const hit = cache.get(unit);
  if (hit && sameDerivedInputs(unit, hit)) {
    settled?.set(unit, hit.value);
    return hit.value;
  }
  const value = computeDerived(unit);
  settled?.set(unit, value);
  cache.set(unit, {
    base: { ...unit.spec.base, attackSpeed: { ...unit.spec.base.attackSpeed } },
    bonus: unit.spec.bonus ? { ...unit.spec.bonus } : undefined,
    conversions: unit.spec.statConversions ? { ...unit.spec.statConversions, ...(unit.spec.statConversions.attackDamageMultiplier ? { attackDamageMultiplier: { ...unit.spec.statConversions.attackDamageMultiplier } } : {}) } : undefined,
    statuses: unit.statuses.map(({ kind, key, value, source, ability, tenacityGroup, bypassSlowImmune, requiresShield, whileCC, slowStackGroup }) =>
      ({ kind, key, value, source, ability, tenacityGroup, bypassSlowImmune, requiresShield, whileCC, slowStackGroup })),
    value,
  });
  return value;
}

/** Exceptional slows (Charm) retain their strength during ordinary slow immunity. */
function effectiveSlows(statuses: Status[], slowImmune: boolean): number[] {
  const values: number[] = [];
  const groups = new Map<string, Map<string, number>>();
  for (const status of statuses) {
    if (status.kind !== "cc" || (status.key !== "slow" && status.key !== "drowsy")
        || (slowImmune && !status.bypassSlowImmune)) continue;
    if (!status.slowStackGroup) { values.push(status.value); continue; }
    const key = `${status.source}:${status.slowStackGroup}`;
    let applications = groups.get(key);
    if (!applications) { applications = new Map(); groups.set(key, applications); }
    const application = `${status.key}:${status.ability ?? status.key}`;
    applications.set(application, Math.max(applications.get(application) ?? 0, status.value));
  }
  for (const applications of groups.values()) values.push(1 - [...applications.values()].reduce((remaining, slow) => remaining * (1 - Math.min(1, Math.max(0, slow))), 1));
  return values;
}

/** Bought percentage penetration: each point a separate 1% source, stacking multiplicatively. */
export function boughtPenetration(points: number): number {
  return 1 - 0.99 ** points;
}

function computeDerived(unit: Unit): Derived {
  const { base, bonus = {} } = unit.spec;
  const st = unit.statuses.some(status => status.requiresShield || status.whileCC)
    ? unit.statuses.filter(status => statIsActive(status, unit.statuses)) : unit.statuses;
  // Both conversions read the unconverted stats; their outputs never feed one another.
  const healthBuffs = sum(st, "health");
  const externalBonusHp = (bonus.hp ?? 0) + healthBuffs;
  const externalAP = (bonus.ap ?? 0) + sum(st, "AP");
  const apMultiplier = list(st, "stat", "APMultiplier").reduce((factor, bonus) => factor * (1 + bonus), 1);
  const conversion = unit.spec.statConversions;
  const maxHp = conversion?.apToHealth === undefined
    ? base.hp + (bonus.hp ?? 0) + healthBuffs
    : base.hp + externalBonusHp + externalAP * apMultiplier * conversion.apToHealth;
  const ap = (conversion?.healthToAP === undefined ? externalAP : externalAP + externalBonusHp * conversion.healthToAP) * apMultiplier;
  const rawBonusAd = (bonus.ad ?? 0) + sum(st, "AD");
  const totalADReduction = Math.max(0, sum(st, "totalADReduction"));
  const bonusAttackSpeed = base.attackSpeed.bonus + (bonus.attackSpeed ?? 0) + sum(st, "attackSpeed");
  const critChance = Math.min(1, Math.max(0, (bonus.critChance ?? 0) + sum(st, "critChance")));
  const unconvertedAD = Math.max(0, base.ad + rawBonusAd - totalADReduction);
  const adMultiplier = conversion?.attackDamageMultiplier;
  const convertedAD = adMultiplier ? unconvertedAD * (adMultiplier.base + adMultiplier.critChance * critChance + adMultiplier.bonusAttackSpeed * bonusAttackSpeed) : 0;
  const bonusAd = Math.max(0, rawBonusAd - totalADReduction) + convertedAD;
  const rawAttackSpeed = conversion?.fixedAttackSpeed
    ? base.attackSpeed.base * (1 + base.attackSpeed.bonus)
    : (base.attackSpeed.base + base.attackSpeed.ratio * bonusAttackSpeed) * Math.max(0, 1 + sum(st, "attackSpeedMultiplier")) * attackSpeedSlowFactor(st);
  const slowImmune = hasState(unit, "slowImmune");
  // "Increases total armor by 16%": a share of the total, gained as bonus armor.
  const armorBonus = (bonus.armor ?? 0) + sum(st, "armor");
  const mrBonus = (bonus.mr ?? 0) + sum(st, "MR");
  const speedEffectiveness = conversion?.moveSpeedBonusEffectiveness;
  let flatSpeedBonus = sum(st, "moveSpeedFlat");
  const percentSpeedBonuses = list(st, "stat", "moveSpeedPercent");
  const totalSpeedMultipliers = list(st, "stat", "moveSpeedMultiplier");
  if (speedEffectiveness !== undefined) {
    flatSpeedBonus = 0;
    for (const status of st) {
      if (status.kind !== "stat" || status.key !== "moveSpeedFlat") continue;
      flatSpeedBonus += status.value > 0 ? status.value * speedEffectiveness : status.value;
    }
    for (let index = 0; index < percentSpeedBonuses.length; index++) {
      if (percentSpeedBonuses[index]! > 0) percentSpeedBonuses[index]! *= speedEffectiveness;
    }
    for (let index = 0; index < totalSpeedMultipliers.length; index++) {
      if (totalSpeedMultipliers[index]! > 0) totalSpeedMultipliers[index]! *= speedEffectiveness;
    }
  }
  const speedModifiers = {
    flat: flatSpeedBonus,
    flatReduction: Math.max(0, sum(st, "totalMoveSpeedReduction")),
    additive: percentSpeedBonuses,
    multiplicative: totalSpeedMultipliers,
    slows: effectiveSlows(st, slowImmune),
    slowResist: combineSlowResist(list(st, "stat", "slowResist")),
  };
  const rawMoveSpeed = ((base.moveSpeed + speedModifiers.flat) * (1 + speedModifiers.additive.reduce((total, value) => total + value, 0)) * speedModifiers.multiplicative.reduce((product, value) => product * (1 + value), 1) - speedModifiers.flatReduction) * (1 - Math.max(0, ...speedModifiers.slows) * (1 - speedModifiers.slowResist));
  const speedOverrides = list(st, "state", "moveSpeedOverride");
  const finalMoveSpeed = speedOverrides.length ? Math.max(0, Math.min(...speedOverrides)) : conversion?.totalMoveSpeedOverride ?? movementSpeed(base.moveSpeed, speedModifiers);
  const tenacityGroups = new Map<string, number>();
  const tenacitySources: number[] = [];
  for (const status of st) {
    if (status.kind !== "state" || status.key !== "tenacity") continue;
    if (status.tenacityGroup) tenacityGroups.set(status.tenacityGroup, (tenacityGroups.get(status.tenacityGroup) ?? 0) + status.value);
    else tenacitySources.push(status.value);
  }
  return {
    maxHp,
    baseAd: base.ad,
    bonusAd,
    ad: unconvertedAD + convertedAD,
    ap,
    armor: { base: base.armor, bonus: armorBonus + (base.armor + armorBonus) * sum(st, "armorPercent") },
    mr: { base: base.mr, bonus: mrBonus + (base.mr + mrBonus) * sum(st, "mrPercent") },
    bonusAttackSpeed,
    attackSpeed: capAttackSpeed(rawAttackSpeed, Math.max(ATTACK_SPEED_CAP, ...list(st, "stat", "attackSpeedCap"))),
    critChance,
    critDamage: CRIT_DAMAGE * base.critDamageModifier,
    abilityHaste: (bonus.abilityHaste ?? 0) + sum(st, "abilityHaste"),
    lethality: (bonus.lethality ?? 0) + sum(st, "lethality"),
    magicPen: bonus.magicPen ?? 0,
    armorPen: [...list(st, "stat", "armorPen"), ...(bonus.armorPenPoints ? [boughtPenetration(bonus.armorPenPoints)] : [])],
    magicPenPercent: [...list(st, "stat", "magicPenPercent"), ...(bonus.magicPenPoints ? [boughtPenetration(bonus.magicPenPoints)] : [])],
    moveSpeed: conversion?.minimumMoveSpeed === undefined ? finalMoveSpeed : Math.max(0, conversion.minimumMoveSpeed, finalMoveSpeed),
    rawMoveSpeed: speedOverrides.length ? Math.max(0, Math.min(...speedOverrides)) : conversion?.totalMoveSpeedOverride ?? rawMoveSpeed,
    tenacity: combineTenacity([[...tenacitySources, ...tenacityGroups.values()]]),
    damageDealt: list(st, "stat", "damageDealt"),
    damageReduction: list(st, "state", "damageReduction"),
    physicalReduction: list(st, "state", "physicalReduction"),
    magicReduction: list(st, "state", "magicReduction"),
    armorReduction: { flat: sum(st, "armorReduction"), percent: list(st, "stat", "armorReductionPercent") },
    mrReduction: { flat: sum(st, "mrReduction"), percent: list(st, "stat", "mrReductionPercent") },
    lifeSteal: sum(st, "lifeSteal"),
    healingIncrease: sum(st, "healingIncrease"),
    maxResource: (base.resource + sum(st, "maxResource")) * (unit.spec.resourceType === "Mana" ? 1 + ap * (conversion?.apToManaPercent ?? 0) : 1),
    bonusArmorPen: list(st, "stat", "bonusArmorPen"),
    criticalBonusArmorIgnore: sum(st, "criticalBonusArmorIgnore"),
  };
}

/** Mana formulas cannot read energy, Fury, or another champion resource as mana. */
function manaValue(kind: "max" | "bonus" | "current" | "missing", unit?: Unit, d?: Derived): number {
  if (!unit || !d || unit.spec.resourceType !== "Mana") return 0;
  const maximum = Math.max(0, d.maxResource);
  if (kind === "max") return maximum;
  if (kind === "bonus") return Math.max(0, maximum - unit.spec.base.resource);
  const current = Math.min(maximum, Math.max(0, unit.resource));
  return kind === "current" ? current : maximum - current;
}

function statValue(ref: StatRef, unit: Unit, d: Derived, target?: Unit, t?: Derived): number {
  switch (ref) {
    case "AD":
      return d.ad;
    case "baseAD":
      return d.baseAd;
    case "bonusAD":
      return d.bonusAd;
    case "AP":
      return d.ap;
    case "maxHP":
      return d.maxHp;
    case "bonusHP":
      return d.maxHp - unit.spec.base.hp;
    case "currentHP":
      return unit.hp;
    case "missingHP":
      return d.maxHp - unit.hp;
    case "maxMana":
      return manaValue("max", unit, d);
    case "bonusMana":
      return manaValue("bonus", unit, d);
    case "currentMana":
      return manaValue("current", unit, d);
    case "missingMana":
      return manaValue("missing", unit, d);
    case "armor":
      return d.armor.base + d.armor.bonus;
    case "bonusArmor":
      return d.armor.bonus;
    case "MR":
      return d.mr.base + d.mr.bonus;
    case "bonusMR":
      return d.mr.bonus;
    case "attackSpeed":
      return d.attackSpeed;
    case "bonusAttackSpeed":
      return d.bonusAttackSpeed;
    case "critChance":
      return d.critChance;
    case "moveSpeed":
      return d.moveSpeed;
    case "bonusMoveSpeed":
      return Math.max(0, d.moveSpeed - unit.spec.base.moveSpeed);
    case "lethality":
      return d.lethality;
    case "targetMoveSpeed":
      return t?.moveSpeed ?? 0;
    case "targetAD":
      return t?.ad ?? 0;
    case "targetBonusAD":
      return t?.bonusAd ?? 0;
    case "targetAP":
      return t?.ap ?? 0;
    case "targetMaxHP":
      return t?.maxHp ?? 0;
    case "targetCurrentHP":
      return target?.hp ?? 0;
    case "targetMissingHP":
      return target && t ? t.maxHp - target.hp : 0;
    case "targetBonusHP":
      return target && t ? t.maxHp - target.spec.base.hp : 0;
    case "targetMaxMana":
      return manaValue("max", target, t);
    case "targetBonusMana":
      return manaValue("bonus", target, t);
    case "targetCurrentMana":
      return manaValue("current", target, t);
    case "targetMissingMana":
      return manaValue("missing", target, t);
    case "targetArmor":
      return t ? t.armor.base + t.armor.bonus : 0;
    case "targetBonusArmor":
      return t?.armor.bonus ?? 0;
    case "targetMR":
      return t ? t.mr.base + t.mr.bonus : 0;
    case "targetBonusMR":
      return t?.mr.bonus ?? 0;
  }
}

/** Current stats, with an optional declaring attack's critical chance for damage formulas. */
export function evaluate(formula: Formula, caster: Unit, target?: Unit, critChance?: number): number {
  const { ratios, products } = formula;
  if (!ratios && !products) return formula.base;
  const d = derive(caster);
  const t = target ? derive(target) : undefined;
  const valueOf = (ref: StatRef) => ref === "critChance" && critChance !== undefined
    ? Math.min(1, Math.max(0, critChance))
    : statValue(ref, caster, d, target, t);
  let value = formula.base;
  if (ratios) {
    for (const ref in ratios) {
      const ratio = ratios[ref as StatRef];
      if (ratio) value += ratio * valueOf(ref as StatRef);
    }
  }
  if (products) {
    for (const term of products) {
      let product = term.ratio;
      for (const ref of term.stats) product *= valueOf(ref);
      value += product;
    }
  }
  return value;
}

/** Whether active crowd control stops the unit from moving on its own. */
export function canMove(unit: Unit): boolean {
  for (const type of ccTypes(unit)) {
    const rule = CC_RULES[type].movement;
    if (rule === "disabled" || rule === "uncontrollable") return false;
  }
  return !unit.forced && !hasState(unit, "noMovement");
}

export function canAttack(unit: Unit): boolean {
  for (const type of ccTypes(unit)) {
    const rule = CC_RULES[type].attacking;
    if (rule === "disabled" || rule === "uncontrollable") return false;
  }
  return !unit.forced && !hasState(unit, "noAttacks");
}

/** Whether crowd control allows casting; `movement` abilities are also stopped by root and ground. */
export function canCastUnderCC(unit: Unit, movement: boolean, usableWhileSilenced = false): boolean {
  for (const type of ccTypes(unit)) {
    if (usableWhileSilenced && type === "silence") continue;
    const rule = CC_RULES[type].abilities;
    if (rule === "disabled") return false;
    // "Partial" means movement abilities for root and ground; nearsight only limits targeting.
    if (rule === "partial" && movement && (type === "root" || type === "ground")) return false;
  }
  return true;
}
