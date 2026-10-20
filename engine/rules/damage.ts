/**
 * Damage mitigation (wiki: "Armor", "Magic resistance", "Armor penetration", "Magic
 * penetration", "Damage", "Damage modifier").
 *
 * - A resistance R multiplies incoming damage of its type by 100 / (100 + R), or by
 *   2 - 100 / (100 - R) when R is negative.
 * - Reductions and penetration apply in this order: flat reduction (spread over base and
 *   bonus resistance in proportion), percentage reduction, percentage penetration (all
 *   resistance, then bonus only), flat penetration (lethality, magic penetration).
 *   Percentage effects do nothing to a resistance of 0 or less; flat reduction can push it
 *   below 0, flat penetration can't.
 * - Damage dealt modifiers stack additively; damage received modifiers stack
 *   multiplicatively with each other and with resistances.
 */

export type DamageType = "physical" | "magic" | "true";

/** Multiplier a resistance applies to incoming damage of its type. */
export function resistMultiplier(resist: number): number {
  return resist >= 0 ? 100 / (100 + resist) : 2 - 100 / (100 - resist);
}

export interface Resistance {
  base: number;
  bonus: number;
}

/** What the target suffers: debuffs that lower its resistance for everyone. */
export interface ResistReduction {
  flat?: number;
  /** Fractions (0.3 = 30%); several stack multiplicatively. */
  percent?: number[];
}

/** What the attacker brings: penetration that applies only to its own damage. */
export interface Penetration {
  /** Fractions of the whole resistance ignored; several stack multiplicatively. */
  percent?: number[];
  /** Fractions of the bonus resistance ignored. */
  bonusPercent?: number[];
  /** Critical-strike bonus armor ignorance adds to total percentage penetration (Last Breath). */
  bonusIgnoreAdditive?: number;
  /** Lethality for armor, flat magic penetration for magic resistance. */
  flat?: number;
}

const keep = (fractions: number[] | undefined) => (fractions ?? []).reduce((product, f) => product * (1 - f), 1);

/** The resistance a hit is calculated against, after reductions and penetration in the game's order. */
export function effectiveResist(resist: Resistance, reduction: ResistReduction = {}, pen: Penetration = {}): number {
  let { base, bonus } = resist;
  // 1. Flat reduction, spread over base and bonus in proportion; it can go below 0.
  const flat = reduction.flat ?? 0;
  if (flat !== 0) {
    const total = base + bonus;
    if (total > 0) {
      const fromBonus = flat * (bonus / total);
      base -= flat - fromBonus;
      bonus -= fromBonus;
    } else {
      base -= flat;
    }
  }
  // 2. Percentage reduction: only while the resistance is positive.
  if (base + bonus > 0) {
    const factor = keep(reduction.percent);
    base *= factor;
    bonus *= factor;
  }
  // 3. Percentage penetration, all resistance then bonus only: the same condition.
  if (base + bonus > 0) {
    const factor = keep(pen.percent);
    base *= factor;
    bonus *= Math.max(0, factor - (pen.bonusIgnoreAdditive ?? 0)) * keep(pen.bonusPercent);
  }
  // 4. Flat penetration: can't take the resistance below 0.
  const total = base + bonus;
  if (total > 0 && pen.flat) return Math.max(0, total - pen.flat);
  return total;
}

export interface DamageModifiers {
  /** Damage dealt bonuses of the attacker, as fractions; they add up (+0.1 and +0.05 = +15%). */
  dealt?: number[];
  /** Damage received modifiers of the target, as fractions (0.25 = takes 25% less); they multiply. */
  received?: number[];
  /** Flat reduction per hit, after percentages. */
  flatReduction?: number;
}

/** Post-mitigation damage of one hit, before shields. */
export function mitigate(raw: number, type: DamageType, resist: number, modifiers: DamageModifiers = {}): number {
  // True damage ignores damage reductions, including Exhaust and flat reduction. Since
  // V25.S1.3, champion true damage can still be amplified (wiki: "True damage").
  const dealt = 1 + (modifiers.dealt ?? []).reduce((sum, m) => sum + (type === "true" ? Math.max(0, m) : m), 0);
  const received = (modifiers.received ?? []).reduce((product, m) => product * (1 - (type === "true" ? Math.min(0, m) : m)), 1);
  const resisted = type === "true" ? 1 : resistMultiplier(resist);
  return Math.max(0, raw * dealt * resisted * received - (type === "true" ? 0 : (modifiers.flatReduction ?? 0)));
}
