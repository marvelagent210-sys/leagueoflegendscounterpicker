/**
 * The stat budget (PLAN.md section 10): both champions get the same gold, spent on plain
 * stats priced at their gold values from the wiki (Module:Gold value/data), with no item
 * passives or actives.
 *
 * Each champion spends it in small steps on whichever stat raises
 *
 *   ln(damage per second against the enemy) + ln(effective health against the enemy's damage)
 *
 * the most. Damage per second follows the champion's own ratios: attacks, on-hit effects and
 * damaging abilities over their cooldowns, through the enemy's resistances. Effective health
 * is health plus the shields and heals of its abilities over a reference fight, divided by
 * the share of the enemy's damage (its mix by type) that armor and magic resistance let
 * through. Maximizing the sum maximizes damage x survival time, which decides a duel; the
 * logarithms make each step weigh offense and defense by how much it adds relative to what
 * the champion already has.
 *
 * Each side's damage mix and resistances depend on what the other buys, so the allocation
 * runs twice: first against the enemy's bare stats, then against its first allocation.
 */
import { effectiveResist, resistMultiplier } from "./rules/damage";
import { averageCritFactor } from "./rules/defense";
import { cooldownAfterHaste } from "./rules/timing";
import { derive, evaluate } from "./sim/derived";
import type { AbilitySpec, BonusStats, Effect, FighterSpec } from "./sim/spec";
import { type Unit, newUnit } from "./sim/state";

/** Stats the budget can buy, by their gold value keys. */
export const BUDGET_STATS = ["ad", "ap", "as", "crit", "ah", "lethality", "mpenflat", "hp", "armor", "mr"] as const;
export type BudgetStat = (typeof BUDGET_STATS)[number];

/** Gold per point of each stat (per 1% for attack speed and critical strike chance). */
export type StatPrices = Record<BudgetStat, number>;

/**
 * The default budget: about what a top laner has earned when the role quest takes it to
 * level 20, late in a game (about five completed items). PLAN.md section 10.
 */
export const DEFAULT_BUDGET = 15000;

/** Gold spent per step of the allocation. */
export const BUDGET_STEP = 50;

/** Seconds of fighting over which ability shields and heals count toward effective health. */
export const SUSTAIN_WINDOW = 10;

export interface Allocation {
  gold: number;
  bonus: BonusStats;
  /** Gold spent on each stat. */
  spent: Record<BudgetStat, number>;
}

type DamageMix = { physical: number; magic: number; true: number };

function withBonus(spec: FighterSpec, bonus: BonusStats): FighterSpec {
  return { ...spec, bonus };
}

function addStat(bonus: BonusStats, stat: BudgetStat, points: number): BonusStats {
  const next = { ...bonus };
  switch (stat) {
    case "ad":
      next.ad = (next.ad ?? 0) + points;
      break;
    case "ap":
      next.ap = (next.ap ?? 0) + points;
      break;
    case "as":
      next.attackSpeed = (next.attackSpeed ?? 0) + points / 100;
      break;
    case "crit":
      next.critChance = (next.critChance ?? 0) + points / 100;
      break;
    case "ah":
      next.abilityHaste = (next.abilityHaste ?? 0) + points;
      break;
    case "lethality":
      next.lethality = (next.lethality ?? 0) + points;
      break;
    case "mpenflat":
      next.magicPen = (next.magicPen ?? 0) + points;
      break;
    case "hp":
      next.hp = (next.hp ?? 0) + points;
      break;
    case "armor":
      next.armor = (next.armor ?? 0) + points;
      break;
    case "mr":
      next.mr = (next.mr ?? 0) + points;
      break;
  }
  return next;
}

function flatten(effects: Effect[]): Effect[] {
  return effects.flatMap((e) => (e.type === "delayed" ? flatten(e.effects) : e.type === "empower" ? [e, ...flatten(e.onHit)] : [e]));
}

function unitOf(spec: FighterSpec, side: 0 | 1): Unit {
  return newUnit(spec, side, 0, spec.base.hp + (spec.bonus?.hp ?? 0), spec.base.resource);
}

/** Raw damage per use of an ability, by type, plus what it adds to empowered attacks. */
function abilityDamage(ability: AbilitySpec, caster: Unit, target: Unit): DamageMix {
  const mix: DamageMix = { physical: 0, magic: 0, true: 0 };
  const pulses = ability.channel?.interval ? Math.max(1, Math.round(ability.channel.duration / ability.channel.interval)) : 0;
  const groups: Array<[Effect[], number]> = [
    [ability.onHit ?? [], 1],
    [ability.channel?.onTick ?? [], pulses],
    [ability.channel?.onComplete ?? [], 1],
  ];
  for (const e of ability.onSelf ?? []) if (e.type === "empower") groups.push([e.onHit, e.attacks]);
  for (const [effects, times] of groups) {
    for (const e of flatten(effects)) {
      if (e.type === "damage") mix[e.damageType] += times * evaluate(e.amount, caster, target);
      else if (e.type === "dot") mix[e.damageType] += times * evaluate(e.total, caster, target);
    }
  }
  return mix;
}

/** Damage per second by type before the target's resistances: attacks with on-hit effects, and abilities once per cooldown. */
function rawDamage(self: Unit, target: Unit): DamageMix {
  const d = derive(self);
  const raw: DamageMix = { physical: d.ad * averageCritFactor(d.critChance, d.critDamage) * d.attackSpeed, magic: 0, true: 0 };
  for (const e of flatten(self.spec.attack.onHit ?? [])) {
    if (e.type === "damage") raw[e.damageType] += evaluate(e.amount, self, target) * d.attackSpeed;
  }
  for (const ability of self.spec.abilities) {
    const cooldown = cooldownAfterHaste(ability.cooldown, d.abilityHaste) + ability.castTime;
    if (cooldown <= 0) continue;
    const mix = abilityDamage(ability, self, target);
    raw.physical += mix.physical / cooldown;
    raw.magic += mix.magic / cooldown;
    raw.true += mix.true / cooldown;
  }
  return raw;
}

/** The target's armor and magic resistance multipliers against the attacker, after its penetration. */
function multipliers(attacker: Unit, target: Unit): { physical: number; magic: number } {
  const a = derive(attacker);
  const t = derive(target);
  return {
    physical: resistMultiplier(effectiveResist(t.armor, {}, { flat: a.lethality })),
    magic: resistMultiplier(effectiveResist(t.mr, {}, { flat: a.magicPen })),
  };
}

/** Damage per second against the enemy, by type, after its resistances and the attacker's penetration. */
export function damagePerSecond(spec: FighterSpec, enemy: FighterSpec): DamageMix {
  const self = unitOf(spec, 0);
  const target = unitOf(enemy, 1);
  const raw = rawDamage(self, target);
  const m = multipliers(self, target);
  return { physical: raw.physical * m.physical, magic: raw.magic * m.magic, true: raw.true };
}

function sustain(self: Unit): number {
  const d = derive(self);
  let total = 0;
  for (const ability of self.spec.abilities) {
    const cooldown = cooldownAfterHaste(ability.cooldown, d.abilityHaste) + ability.castTime;
    for (const e of flatten(ability.onSelf ?? [])) {
      if (e.type !== "shield" && e.type !== "heal") continue;
      const uses = cooldown > 0 ? Math.max(1, Math.floor(SUSTAIN_WINDOW / cooldown)) : 1;
      total += uses * evaluate(e.amount, self);
    }
  }
  return total;
}

function health(self: Unit, enemy: Unit): number {
  const raw = rawDamage(enemy, self);
  const total = raw.physical + raw.magic + raw.true;
  const shares = total > 0 ? { physical: raw.physical / total, magic: raw.magic / total, true: raw.true / total } : { physical: 0.5, magic: 0.5, true: 0 };
  const m = multipliers(enemy, self);
  const taken = shares.physical * m.physical + shares.magic * m.magic + shares.true;
  return (derive(self).maxHp + sustain(self)) / taken;
}

/**
 * Health plus ability shields and heals over the reference fight, divided by the share of the
 * enemy's damage that gets through: its raw damage mix by type, through this side's armor and
 * magic resistance after the enemy's penetration.
 */
export function effectiveHealth(spec: FighterSpec, enemy: FighterSpec): number {
  return health(unitOf(spec, 0), unitOf(enemy, 1));
}

function value(self: Unit, enemy: Unit): number {
  const raw = rawDamage(self, enemy);
  const m = multipliers(self, enemy);
  const dps = raw.physical * m.physical + raw.magic * m.magic + raw.true;
  return Math.log(Math.max(dps, 1e-9)) + Math.log(health(self, enemy));
}

/** Spends `gold` on the stats that help `spec` most against `enemy`. */
export function allocate(spec: FighterSpec, enemy: FighterSpec, gold: number, prices: StatPrices, step = BUDGET_STEP): Allocation {
  const foe = unitOf(enemy, 1);
  const score = (bonus: BonusStats) => value(unitOf(withBonus(spec, bonus), 0), foe);
  let bonus: BonusStats = {};
  const spent = Object.fromEntries(BUDGET_STATS.map((s) => [s, 0])) as Record<BudgetStat, number>;
  let current = score(bonus);
  // Stats the kit gets nothing from (ability power without AP ratios, ...) are never worth a step.
  const useful = BUDGET_STATS.filter((stat) => score(addStat(bonus, stat, 1000 / prices[stat])) > current + 1e-12);
  for (let left = gold; left >= step; left -= step) {
    let best: { stat: BudgetStat; bonus: BonusStats; value: number } | undefined;
    for (const stat of useful) {
      if (stat === "crit" && (bonus.critChance ?? 0) >= 1) continue;
      const next = addStat(bonus, stat, step / prices[stat]);
      const v = score(next);
      if (!best || v > best.value + 1e-12) best = { stat, bonus: next, value: v };
    }
    // Nothing helps any more (stats can't lower the value, but they can stop raising it).
    if (!best || best.value <= current + 1e-12) break;
    bonus = best.bonus;
    spent[best.stat] += step;
    current = best.value;
  }
  return { gold, bonus, spent };
}

/** Both sides' allocations: first against bare stats, then against each other's first pass. */
export function allocateBoth(a: FighterSpec, b: FighterSpec, gold: number, prices: StatPrices): [Allocation, Allocation] {
  if (gold <= 0) {
    const none = (): Allocation => ({ gold: 0, bonus: {}, spent: Object.fromEntries(BUDGET_STATS.map((s) => [s, 0])) as Record<BudgetStat, number> });
    return [none(), none()];
  }
  // Kits can add gold of their own (Ornn's Masterwork upgrade).
  const goldA = gold + (a.extraGold ?? 0);
  const goldB = gold + (b.extraGold ?? 0);
  const first: [Allocation, Allocation] = [allocate(a, b, goldA, prices), allocate(b, a, goldB, prices)];
  return [allocate(a, withBonus(b, first[1].bonus), goldA, prices), allocate(b, withBonus(a, first[0].bonus), goldB, prices)];
}

/** Applies the budget to both fighters. */
export function withBudget(a: FighterSpec, b: FighterSpec, gold: number, prices: StatPrices): [FighterSpec, FighterSpec] {
  const [x, y] = allocateBoth(a, b, gold, prices);
  return [withBonus(a, x.bonus), withBonus(b, y.bonus)];
}
