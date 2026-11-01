/**
 * The build search's quick estimate (PLAN.md §13, M8): how good an item build is for a
 * champion against the enemy's, by the stat budget's objective (ln damage per second + ln
 * survival time, engine/budget.ts). Each item counts for its shop stats, its fixed passive
 * stats, the stats it keeps as statuses (percentage penetration, life steal), its critical
 * strike damage and its on-hit effects (itemParts). It doesn't play the fight: the search
 * keeps the best builds it finds by this estimate, and real fights decide between them.
 */
import { budgetUnit, budgetValue } from "../engine/budget";
import { CRIT_DAMAGE } from "../engine/rules/defense";
import type { BonusStats, Effect, FighterSpec } from "../engine/sim/spec";
import type { Unit } from "../engine/sim/state";
import type { ItemParts } from "./equip";
import { memo, setStat } from "./runtime";

/** The champion's spec holding the items, as far as the estimate values them. */
export function estimateSpec(spec: FighterSpec, parts: readonly ItemParts[]): FighterSpec {
  if (parts.length === 0) return spec;
  const bonus: BonusStats = { ...spec.bonus };
  let critDamage = 0;
  const onHit: Effect[] = [];
  for (const part of parts) {
    for (const [key, value] of Object.entries(part.bonus) as Array<[keyof BonusStats, number]>) bonus[key] = (bonus[key] ?? 0) + value;
    critDamage += part.critDamage;
    onHit.push(...part.onHit);
  }
  return {
    ...spec,
    bonus,
    // As equipItems does: bonus critical strike damage adds to the 200%, and the champion's modifier scales the total.
    ...(critDamage ? { base: { ...spec.base, critDamageModifier: (spec.base.critDamageModifier * (CRIT_DAMAGE + critDamage)) / CRIT_DAMAGE } } : {}),
    ...(onHit.length ? { attack: { ...spec.attack, onHit: [...(spec.attack.onHit ?? []), ...onHit] } } : {}),
  };
}

/** The unit the budget values, with each item's stat statuses under the item's own key (two penetration items are two sources). */
export function estimateUnit(spec: FighterSpec, parts: readonly ItemParts[], side: 0 | 1): Unit {
  const unit = budgetUnit(estimateSpec(spec, parts), side);
  for (const part of parts) for (const status of part.statuses) setStat(unit, memo(part.item, status.stat), status.stat, status.value, 0);
  return unit;
}

/** The budget's objective for `you` holding `yours` against `enemy` holding `theirs`: higher is better. */
export function estimate(you: FighterSpec, yours: readonly ItemParts[], enemy: FighterSpec, theirs: readonly ItemParts[]): number {
  return budgetValue(estimateUnit(you, yours, 0), estimateUnit(enemy, theirs, 1));
}

/** The same, against an enemy unit built once (estimateUnit) for the many builds a search scores against it. */
export function estimateAgainst(you: FighterSpec, yours: readonly ItemParts[], enemy: Unit): number {
  return budgetValue(estimateUnit(you, yours, 0), enemy);
}
