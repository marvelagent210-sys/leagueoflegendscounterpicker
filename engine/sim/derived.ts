/**
 * A unit's current combat stats: level-20 base stats, plus the stat budget, plus its active
 * buffs and debuffs, through the global rules (attack speed cap, slows, tenacity, ...).
 */
import { CC_RULES, type CCType, combineTenacity } from "../rules/crowdControl";
import { CRIT_DAMAGE } from "../rules/defense";
import { movementSpeed } from "../rules/movement";
import { capAttackSpeed } from "../rules/timing";
import type { Formula, StatRef } from "./spec";
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
}

function sum(statuses: Status[], key: string): number {
  return statuses.filter((s) => s.kind === "stat" && s.key === key).reduce((total, s) => total + s.value, 0);
}

function list(statuses: Status[], kind: Status["kind"], key: string): number[] {
  return statuses.filter((s) => s.kind === kind && s.key === key).map((s) => s.value);
}

export function hasState(unit: Unit, state: string): boolean {
  return unit.statuses.some((s) => s.kind === "state" && s.key === state);
}

export function ccTypes(unit: Unit): Set<CCType> {
  return new Set(unit.statuses.filter((s) => s.kind === "cc").map((s) => s.key as CCType));
}

/**
 * Derived stats depend only on the spec and the statuses, so they are cached per statuses
 * array: adding a status changes its length and removing one replaces the array.
 */
const cache = new WeakMap<Status[], { length: number; spec: Unit["spec"]; value: Derived }>();

export function derive(unit: Unit): Derived {
  const hit = cache.get(unit.statuses);
  if (hit && hit.length === unit.statuses.length && hit.spec === unit.spec) return hit.value;
  const value = computeDerived(unit);
  cache.set(unit.statuses, { length: unit.statuses.length, spec: unit.spec, value });
  return value;
}

/** Bought percentage penetration: each point a separate 1% source, stacking multiplicatively. */
export function boughtPenetration(points: number): number {
  return 1 - 0.99 ** points;
}

function computeDerived(unit: Unit): Derived {
  const { base, bonus = {} } = unit.spec;
  const st = unit.statuses;
  const bonusAd = (bonus.ad ?? 0) + sum(st, "AD");
  const bonusAttackSpeed = base.attackSpeed.bonus + (bonus.attackSpeed ?? 0) + sum(st, "attackSpeed");
  const cripple = Math.max(0, ...list(st, "cc", "cripple"));
  const rawAttackSpeed = base.attackSpeed.base + base.attackSpeed.ratio * bonusAttackSpeed;
  const slowImmune = hasState(unit, "slowImmune");
  // "Increases total armor by 16%": a share of the total, gained as bonus armor.
  const armorBonus = (bonus.armor ?? 0) + sum(st, "armor");
  const mrBonus = (bonus.mr ?? 0) + sum(st, "MR");
  return {
    maxHp: base.hp + (bonus.hp ?? 0) + sum(st, "health"),
    baseAd: base.ad,
    bonusAd,
    ad: base.ad + bonusAd,
    ap: (bonus.ap ?? 0) + sum(st, "AP"),
    armor: { base: base.armor, bonus: armorBonus + (base.armor + armorBonus) * sum(st, "armorPercent") },
    mr: { base: base.mr, bonus: mrBonus + (base.mr + mrBonus) * sum(st, "mrPercent") },
    bonusAttackSpeed,
    attackSpeed: capAttackSpeed(rawAttackSpeed * (1 - cripple)),
    critChance: Math.min(1, (bonus.critChance ?? 0) + sum(st, "critChance")),
    critDamage: CRIT_DAMAGE * base.critDamageModifier,
    abilityHaste: (bonus.abilityHaste ?? 0) + sum(st, "abilityHaste"),
    lethality: (bonus.lethality ?? 0) + sum(st, "lethality"),
    magicPen: bonus.magicPen ?? 0,
    armorPen: [...list(st, "stat", "armorPen"), ...(bonus.armorPenPoints ? [boughtPenetration(bonus.armorPenPoints)] : [])],
    magicPenPercent: [...list(st, "stat", "magicPenPercent"), ...(bonus.magicPenPoints ? [boughtPenetration(bonus.magicPenPoints)] : [])],
    moveSpeed: movementSpeed(base.moveSpeed, {
      flat: sum(st, "moveSpeedFlat"),
      additive: list(st, "stat", "moveSpeedPercent"),
      slows: slowImmune ? [] : [...list(st, "cc", "slow"), ...list(st, "cc", "drowsy")],
      slowResist: Math.min(1, sum(st, "slowResist")),
    }),
    tenacity: combineTenacity([list(st, "state", "tenacity")]),
    damageDealt: list(st, "stat", "damageDealt"),
    damageReduction: list(st, "state", "damageReduction"),
    physicalReduction: list(st, "state", "physicalReduction"),
    magicReduction: list(st, "state", "magicReduction"),
    armorReduction: { flat: sum(st, "armorReduction"), percent: list(st, "stat", "armorReductionPercent") },
    mrReduction: { flat: sum(st, "mrReduction"), percent: list(st, "stat", "mrReductionPercent") },
    lifeSteal: sum(st, "lifeSteal"),
    healingIncrease: sum(st, "healingIncrease"),
    maxResource: base.resource + sum(st, "maxResource"),
    bonusArmorPen: list(st, "stat", "bonusArmorPen"),
  };
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

/** A formula with the caster's (and target's) current stats. */
export function evaluate(formula: Formula, caster: Unit, target?: Unit): number {
  const { ratios, products } = formula;
  if (!ratios && !products) return formula.base;
  const d = derive(caster);
  const t = target ? derive(target) : undefined;
  let value = formula.base;
  if (ratios) {
    for (const ref in ratios) {
      const ratio = ratios[ref as StatRef];
      if (ratio) value += ratio * statValue(ref as StatRef, caster, d, target, t);
    }
  }
  if (products) {
    for (const term of products) {
      let product = term.ratio;
      for (const ref of term.stats) product *= statValue(ref, caster, d, target, t);
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
  return !unit.forced;
}

export function canAttack(unit: Unit): boolean {
  for (const type of ccTypes(unit)) {
    const rule = CC_RULES[type].attacking;
    if (rule === "disabled" || rule === "uncontrollable") return false;
  }
  return !unit.forced && !hasState(unit, "noAttacks");
}

/** Whether crowd control allows casting; `movement` abilities are also stopped by root and ground. */
export function canCastUnderCC(unit: Unit, movement: boolean): boolean {
  for (const type of ccTypes(unit)) {
    const rule = CC_RULES[type].abilities;
    if (rule === "disabled") return false;
    // "Partial" means movement abilities for root and ground; nearsight only limits targeting.
    if (rule === "partial" && movement && (type === "root" || type === "ground")) return false;
  }
  return true;
}
