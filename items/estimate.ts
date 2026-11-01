/**
 * The build search's quick estimate (PLAN.md §13, M8): how good an item build is for a
 * champion against the enemy's, by the stat budget's objective (ln damage per second + ln
 * survival time, engine/budget.ts), completed by the enemy's side of it where items reach it
 * (Grievous Wounds on its heals). It doesn't play the fight: the search keeps the best builds
 * it finds by this estimate, and real fights decide between them. Each item counts for:
 *
 * - its shop stats, its fixed passive stats, the stats it keeps as statuses (percentage
 *   penetration, life steal), its critical strike damage and its on-hit effects (itemParts);
 * - life steal on the holder's basic attacks and omnivamp on all its damage, as healing;
 * - its hint (ItemBudget): what its hooks and actives give on average over the budget's
 *   ten-second reference fight, as stats, statuses on the enemy, damage, healing and shields.
 */
import { budgetDamage, budgetMultipliers, budgetPool, budgetUnit, budgetValue } from "../engine/budget";
import { CRIT_DAMAGE, averageCritFactor } from "../engine/rules/defense";
import { addStatus } from "../engine/sim/combat";
import { derive } from "../engine/sim/derived";
import type { AbilitySpec, BonusStats, BudgetHints, DamageByType, Effect, FighterSpec } from "../engine/sim/spec";
import type { Unit } from "../engine/sim/state";
import { type EstimateStatus, type ItemDefinition, type ItemParts, withItemHaste } from "./equip";
import { memo, setStat } from "./runtime";

/** The champion's spec holding the items, as far as the estimate values them. */
export function estimateSpec(spec: FighterSpec, parts: readonly ItemParts[]): FighterSpec {
  if (parts.length === 0) return spec;
  const bonus: BonusStats = { ...spec.bonus };
  let critDamage = 0;
  let mana = 0;
  const onHit: Effect[] = [];
  const haste: NonNullable<ItemDefinition["haste"]> = [];
  for (const part of parts) {
    for (const [key, value] of Object.entries(part.bonus) as Array<[keyof BonusStats, number]>) bonus[key] = (bonus[key] ?? 0) + value;
    critDamage += part.critDamage;
    mana += part.mana;
    onHit.push(...part.onHit);
    haste.push(...part.haste);
  }
  const budget = estimateHints(spec.budget, parts);
  const base = critDamage || mana
    ? {
        ...spec.base,
        // As equipItems does: bonus critical strike damage adds to the 200%, and the champion's modifier scales the total.
        critDamageModifier: (spec.base.critDamageModifier * (CRIT_DAMAGE + critDamage)) / CRIT_DAMAGE,
        resource: spec.base.resource + mana,
      }
    : undefined;
  return {
    ...spec,
    bonus,
    ...(base ? { base } : {}),
    ...(onHit.length ? { attack: { ...spec.attack, onHit: [...(spec.attack.onHit ?? []), ...onHit] } } : {}),
    ...(haste.length || parts.some((part) => part.budget?.ability) ? { abilities: hasted(spec.abilities, haste, parts) } : {}),
    ...(budget ? { budget } : {}),
  };
}

const hasteCache = new WeakMap<AbilitySpec[], Map<string, AbilitySpec[]>>();

/**
 * The kit's abilities with the items' haste for some of them (withItemHaste) and the changes
 * their hints make (ItemBudget.ability), the same objects for the same items so that the
 * budget's caches keep working.
 */
function hasted(abilities: AbilitySpec[], haste: NonNullable<ItemDefinition["haste"]>, parts: readonly ItemParts[]): AbilitySpec[] {
  let byHaste = hasteCache.get(abilities);
  if (!byHaste) hasteCache.set(abilities, (byHaste = new Map()));
  const changes = parts.filter((part) => part.budget?.ability);
  const key = JSON.stringify([haste.map((entry) => [entry.slots.join(""), entry.haste, entry.immobilizing ?? false]).sort(), changes.map((part) => part.item).sort()]);
  let list = byHaste.get(key);
  if (!list) {
    list = abilities.map((ability) => changes.reduce((changed, part) => part.budget!.ability!(changed), withItemHaste(ability, haste)));
    byHaste.set(key, list);
  }
  return list;
}

const lifeStealOf = (parts: readonly ItemParts[]) => parts.reduce((sum, part) => sum + part.statuses.reduce((s, status) => s + (status.stat === "lifeSteal" ? status.value : 0), 0), 0);

/** The holder's basic attacks' damage per second before resistances, as the budget counts them: what life steal heals from. */
function attackDamage(self: Unit): number {
  if (self.spec.budget?.attacks === false) return 0;
  const d = derive(self);
  const split = self.spec.budget?.attackSplit ?? { physical: 1, magic: 0 };
  return d.ad * averageCritFactor(d.critChance, d.critDamage) * d.attackSpeed * split.physical * (self.spec.budget?.calibration?.damage ?? 1);
}

/**
 * The kit's budget hints with the items' damage, healing and shields added. A calibrated kit's
 * own damage hint, its passives' damage, takes its share as the rest of its damage does.
 */
function estimateHints(kit: BudgetHints | undefined, parts: readonly ItemParts[]): BudgetHints | undefined {
  const hinted = parts.filter((part) => part.budget);
  const lifeSteal = lifeStealOf(parts);
  const omnivamp = parts.reduce((sum, part) => sum + part.omnivamp, 0);
  const share = kit?.calibration?.damage ?? 1;
  if (hinted.length === 0 && lifeSteal === 0 && omnivamp === 0 && (share === 1 || !kit?.damage)) return kit;
  const own = kit?.damage && share !== 1 ? (self: Unit, target: Unit) => scaled(kit.damage!(self, target), share) : kit?.damage;
  const damaging = hinted.filter((part) => part.budget!.damage);
  const healing = hinted.filter((part) => part.budget!.healing);
  const shielding = hinted.filter((part) => part.budget!.shielding);
  return {
    ...kit,
    ...(damaging.length || own !== kit?.damage
      ? {
          damage(self: Unit, target: Unit) {
            const total: DamageByType = { physical: 0, magic: 0, true: 0 };
            for (const add of [own?.(self, target), ...damaging.map((part) => part.budget!.damage!(self, target))]) {
              total.physical += add?.physical ?? 0;
              total.magic += add?.magic ?? 0;
              total.true += add?.true ?? 0;
            }
            return total;
          },
        }
      : {}),
    ...(healing.length || lifeSteal || omnivamp
      ? {
          healing(self, target) {
            let total = kit?.healing?.(self, target) ?? 0;
            for (const part of healing) total += part.budget!.healing!(self, target);
            if (lifeSteal) total += lifeSteal * attackDamage(self) * budgetMultipliers(self, target).physical;
            if (omnivamp) {
              const dealt = budgetDamage(self, target);
              total += omnivamp * (dealt.physical + dealt.magic + dealt.true);
            }
            return total;
          },
        }
      : {}),
    ...(shielding.length
      ? {
          shielding(self, target) {
            let total = kit?.shielding?.(self, target) ?? 0;
            for (const part of shielding) total += part.budget!.shielding!(self, target);
            return total;
          },
        }
      : {}),
  };
}

const scaled = (mix: Partial<DamageByType>, share: number): Partial<DamageByType> => ({ physical: (mix.physical ?? 0) * share, magic: (mix.magic ?? 0) * share, true: (mix.true ?? 0) * share });

/** Gives the unit a status the estimate counts, under the item's own key. */
function give(unit: Unit, item: string, status: EstimateStatus, source: 0 | 1): void {
  if ("grievousWounds" in status) {
    if (!unit.statuses.some((s) => s.kind === "grievousWounds")) addStatus(unit, { kind: "grievousWounds", key: "grievousWounds", source, startTick: 0, endTick: Number.POSITIVE_INFINITY, value: 0.4 });
  } else if ("stat" in status) {
    setStat(unit, memo(item, `estimate:${source}:${status.stat}`), status.stat, status.value, 0, Number.POSITIVE_INFINITY, source);
  } else {
    addStatus(unit, { kind: "state", key: status.state, source, startTick: 0, endTick: Number.POSITIVE_INFINITY, value: status.value ?? 0, memoKey: memo(item, `estimate:${source}:${status.state}`) });
  }
}

/** The unit the budget values, with each item's stat statuses under the item's own key (two penetration items are two sources). */
export function estimateUnit(spec: FighterSpec, parts: readonly ItemParts[], side: 0 | 1): Unit {
  const unit = budgetUnit(estimateSpec(spec, parts), side);
  for (const part of parts) for (const status of part.statuses) setStat(unit, memo(part.item, status.stat), status.stat, status.value, 0);
  return unit;
}

/** One side of a matchup for the estimate: its unit, and its items for what they do to the other side. */
export interface EstimateSide {
  unit: Unit;
  parts: readonly ItemParts[];
}

export function estimateSide(spec: FighterSpec, parts: readonly ItemParts[], side: 0 | 1): EstimateSide {
  return { unit: estimateUnit(spec, parts, side), parts };
}

/** The statuses the items put on the enemy. */
function debuffs(parts: readonly ItemParts[], self: Unit, enemy: Unit): Array<readonly [string, EstimateStatus]> {
  return parts.flatMap((part) => (part.budget?.enemyStats ? part.budget.enemyStats(self, enemy).map((status) => [part.item, status] as const) : []));
}

/**
 * Gives the unit its items' average hook stats against the enemy. Each item's read the unit as
 * its shop stats leave it, not each other's, so that the order of a build doesn't matter; those
 * that read the others' (`late`: Rabadon's Deathcap's share of all AP) come after them.
 */
function addHookStats(unit: Unit, parts: readonly ItemParts[], enemy: Unit): void {
  for (const late of [false, true]) {
    const stats = parts.flatMap((part) => (part.budget?.stats && Boolean(part.budget.late) === late ? part.budget.stats(unit, enemy).map((status) => [part.item, status] as const) : []));
    for (const [item, status] of stats) give(unit, item, status, unit.side);
  }
}

const hooks = (parts: readonly ItemParts[]) => parts.some((part) => part.budget?.stats || part.budget?.enemyStats);

/** The budget's objective for `you` holding `yours` against `enemy` holding `theirs`: higher is better. */
export function estimate(you: FighterSpec, yours: readonly ItemParts[], enemy: FighterSpec, theirs: readonly ItemParts[]): number {
  return estimateAgainst(you, yours, estimateSide(enemy, theirs, 1));
}

/**
 * The same, against an enemy side built once (estimateSide) for the many builds a search scores
 * against it. What the items do to the other side goes on a copy of its unit; when they cut its
 * heals (Grievous Wounds), the estimate counts its lost health too, the part of the budget's
 * objective that buying stats never changes.
 */
export function estimateAgainst(you: FighterSpec, yours: readonly ItemParts[], enemy: EstimateSide): number {
  return estimatePair(you, yours, enemy).value;
}

/** The units estimateAgainst values, with all the items' hook stats and statuses on, and its value. */
export function estimatePair(you: FighterSpec, yours: readonly ItemParts[], enemy: EstimateSide): { self: Unit; foe: Unit; value: number } {
  const self = estimateUnit(you, yours, 0);
  const foe = hooks(yours) || hooks(enemy.parts) ? { ...enemy.unit, statuses: [...enemy.unit.statuses] } : enemy.unit;
  if (foe !== enemy.unit) {
    addHookStats(self, yours, enemy.unit);
    addHookStats(foe, enemy.parts, self);
  }
  const ours = debuffs(yours, self, foe);
  const theirs = debuffs(enemy.parts, foe, self);
  for (const [item, status] of theirs) give(self, item, status, 1);
  // Cutting the enemy's heals shortens the time to kill it: its health pool, before and after.
  const cuts = ours.some(([, status]) => "grievousWounds" in status) && !foe.statuses.some((s) => s.kind === "grievousWounds");
  const before = cuts ? budgetPool(foe, self) : 0;
  for (const [item, status] of ours) give(foe, item, status, 0);
  const value = budgetValue(self, foe);
  return { self, foe, value: cuts ? value + Math.log(before) - Math.log(budgetPool(foe, self)) : value };
}
