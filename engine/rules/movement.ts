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
  /** Reduces total speed after positive bonuses, before ordinary slows and caps. */
  flatReduction?: number;
  /** Additive percentage bonuses, as fractions (0.4 = +40%). */
  additive?: number[];
  multiplicative?: number[];
  /** Slows as fractions; only the strongest applies. */
  slows?: number[];
  /** Slow resist as a fraction. */
  slowResist?: number;
}

/** Slow resist stacks multiplicatively (Slow resist, revision 4058780). */
export function combineSlowResist(sources: number[]): number {
  return 1 - sources.reduce((remaining, resist) => remaining * (1 - Math.max(0, Math.min(1, resist))), 1);
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
  const slowResist = Math.max(0, Math.min(1, modifiers.slowResist ?? 0));
  const slowFactor = 1 - slow * (1 - slowResist);
  // Negative stat modifiers can take speed below the normal slow floor, but movement
  // speed itself cannot be negative (Movement speed, revision 4064468).
  return Math.max(0, softCap(((base + (modifiers.flat ?? 0)) * additive * multiplicative - Math.max(0, modifiers.flatReduction ?? 0)) * slowFactor));
}
