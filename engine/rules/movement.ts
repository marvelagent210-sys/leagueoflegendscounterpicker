/**
 * Movement speed (wiki: "Movement speed", "Slow resist").
 *
 * raw = (base + flat bonuses) x (1 + additive percent bonuses) x product(1 + multiplicative
 * bonuses) x (1 - strongest slow x (1 - slow resist)); only the strongest slow counts.
 * Soft caps: above 415 the excess up to 490 counts 80% and the excess over 490 counts 50%;
 * below 220 speed is 110 + raw x 0.5, and below 0 it is 110 + raw x 0.01.
 */

export interface SpeedModifiers {
  flat?: number;
  /** Additive percentage bonuses, as fractions (0.4 = +40%). */
  additive?: number[];
  multiplicative?: number[];
  /** Slows as fractions; only the strongest applies. */
  slows?: number[];
  /** Slow resist as a fraction. */
  slowResist?: number;
}

export function softCap(raw: number): number {
  if (raw > 490) return raw * 0.5 + 230;
  if (raw > 415) return raw * 0.8 + 83;
  if (raw < 0) return 110 + raw * 0.01;
  if (raw < 220) return 110 + raw * 0.5;
  return raw;
}

export function movementSpeed(base: number, modifiers: SpeedModifiers = {}): number {
  const additive = 1 + (modifiers.additive ?? []).reduce((sum, b) => sum + b, 0);
  const multiplicative = (modifiers.multiplicative ?? []).reduce((product, b) => product * (1 + b), 1);
  const slow = Math.max(0, ...(modifiers.slows ?? []));
  const slowFactor = 1 - slow * (1 - (modifiers.slowResist ?? 0));
  return softCap((base + (modifiers.flat ?? 0)) * additive * multiplicative * slowFactor);
}
