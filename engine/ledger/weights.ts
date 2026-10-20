/**
 * The ledger's weights: how much an interaction matters. These make the ledger-only ranking
 * (a "partial" result until the duel simulator replaces it), so they are deliberately few,
 * simple and in one place. All values are between 0 and 1.
 *
 * impact = importance of the countered ability x how much of its use the counter covers x
 *          how completely it counters it (and, for crowd control, how much that control matters)
 */
import type { AbilityProfile, KitProfile, Tri } from "../profiles";

export const WEIGHTS = {
  /** Base importance of an ability by slot. */
  slot: { R: 0.55, Q: 0.45, W: 0.45, E: 0.45, I: 0.3, A: 0.3, other: 0.2 } as Record<string, number>,
  /** Added when the ability immobilizes (stun, knock up, root, ...). */
  immobilizes: 0.25,
  /** Added when the ability moves its caster (dash or blink). */
  moves: 0.15,
  /** Added for abilities used all the time (cooldown at most frequentCooldown seconds). */
  frequent: 0.1,
  frequentCooldown: 4,
  /** Added for a melee champion's dashes and blinks: their way to reach the enemy at all. */
  meleeEngage: 0.2,
  /** Range at or under which a champion counts as melee. */
  meleeRange: 300,
  /**
   * One counter used on several abilities: its best interaction counts fully and each
   * further one by this factor again (1, 0.5, 0.25, ...), since one cast answers one threat.
   */
  sameToolDecay: 0.5,
  /** Basic attacks: importance = attackFloor + (1 - attackFloor) x the share of the kit built around them. */
  attackFloor: 0.3,
  /** A partial counter ("special" on the wiki) counts this much of a full one. */
  partly: 0.5,
  /**
   * A counter that is up only part of the time still decides the fights it is saved for:
   * coverage = floor + (1 - floor) x uptime (or x the share of casts it can answer).
   */
  availabilityFloor: 0.4,
  /** Human reaction time, seconds: shorter windows need the counter to be used in advance. */
  reaction: 0.25,
  /** Factor for counters that must be used before the enemy acts (window shorter than a reaction). */
  needsPrediction: 0.6,
  /** Counters that need setup or luck (knockdowns timed into a dash, reveals, interrupts). */
  situational: 0.5,
  /** Range: a lead of this many units counts fully. */
  rangeFull: 400,
  /** Range: leads below this don't count. */
  rangeMin: 75,
} as const;

/** Crowd control types that stop the target from acting (Riposte's "immobilizing effect"). */
export const IMMOBILIZING = new Set(["airborne", "stun", "root", "charm", "fear", "taunt", "sleep", "suppression", "suspension", "stasis", "berserk"]);
/** Crowd control that disables part of a kit without immobilizing. */
export const DISABLING = new Set(["silence", "polymorph", "disarm", "blind", "ground", "knockdown", "disrupt"]);

/** How much stopping a set of crowd control effects matters: immobilizing 1, other disables 0.6, slows 0.25. */
export function ccImportance(types: string[]): number {
  if (types.some((t) => IMMOBILIZING.has(t))) return 1;
  if (types.some((t) => DISABLING.has(t))) return 0.6;
  return 0.25;
}

export function completeness(tri: Tri | undefined): number {
  return tri === "no" ? 0 : tri === "partly" ? WEIGHTS.partly : 1;
}

export function isMelee(kit: KitProfile): boolean {
  return Math.max(...kit.attacks.map((a) => a.range)) <= WEIGHTS.meleeRange;
}

/** How much an ability matters to its kit; `owner` adds the melee engage bonus to gap closers. */
export function abilityWeight(ability: AbilityProfile, owner?: KitProfile): number {
  let weight = WEIGHTS.slot[ability.kind] ?? WEIGHTS.slot.other ?? 0.2;
  if (ability.applies.some((a) => IMMOBILIZING.has(a.type) && !a.condition)) weight += WEIGHTS.immobilizes;
  const moves = ability.movement.some((m) => m.type !== "lunge");
  if (moves) weight += WEIGHTS.moves;
  if (moves && owner && isMelee(owner)) weight += WEIGHTS.meleeEngage;
  if (ability.cooldown !== undefined && ability.cooldown <= WEIGHTS.frequentCooldown) weight += WEIGHTS.frequent;
  return Math.min(1, weight);
}

/**
 * Share of a kit built around basic attacks: the attacks themselves plus every ability that
 * empowers, modifies or boosts them, against the abilities that deal damage on their own.
 */
export function attackShare(kit: KitProfile): number {
  const abilities = kit.abilities;
  const attackBased = abilities.filter(
    (a) => a.delivery.attack === "attack" || a.delivery.attack === "attack modifier" || a.boostsAttacks,
  ).length;
  const spells = abilities.filter(
    (a) =>
      a.kind !== "I" &&
      a.kind !== "A" &&
      a.damageTypes.length > 0 &&
      a.delivery.attack !== "attack" &&
      a.delivery.attack !== "attack modifier" &&
      !a.boostsAttacks,
  ).length;
  return (1 + attackBased) / (1 + attackBased + spells);
}

/** How much a champion's kit relies on basic attacks. */
export function attackWeight(kit: KitProfile): number {
  return WEIGHTS.attackFloor + (1 - WEIGHTS.attackFloor) * attackShare(kit);
}

/** Share of the time a state with this duration and cooldown is up, turned into coverage. */
export function availability(duration: number | undefined, cooldown: number | undefined): number {
  const uptime = duration !== undefined && duration > 0 && cooldown !== undefined && cooldown >= 0
    ? Math.min(1, duration / Math.max(cooldown, duration))
    : 0;
  return WEIGHTS.availabilityFloor + (1 - WEIGHTS.availabilityFloor) * uptime;
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
