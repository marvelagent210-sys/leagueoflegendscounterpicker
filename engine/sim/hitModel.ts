/**
 * Whether a skillshot lands. The fight is one-dimensional, so dodging happens sideways: the
 * target sees the cast begin, reacts, and has until the skillshot arrives to move its
 * hitbox out of the way. It can't if crowd control or its own cast or channel holds it in
 * place, and a ready dash or blink gets it out at once.
 *
 *   time available = (cast time + travel or delay) - reaction time
 *   time needed    = (half width or radius + target radius) / movement speed
 *
 * The chance to land falls off smoothly around the point where the two are equal: players
 * don't react with machine precision, and `spread` sets how sharp that edge is.
 */

export interface SkillshotGeometry {
  /** Seconds from the start of the cast until the skillshot can hit: cast time plus travel or delay. */
  timeToLand: number;
  /** Half the line's width, or the circle's radius. */
  reach: number;
}

export interface Dodger {
  radius: number;
  moveSpeed: number;
  /** True when crowd control, a cast or a channel keeps the target in place until it lands. */
  heldInPlace: boolean;
  /** A dash or blink the target can use to leave the area at once. */
  hasEscape: boolean;
}

export function hitChance(shot: SkillshotGeometry, target: Dodger, reaction: number, spread: number): number {
  if (target.heldInPlace) return 1;
  const available = shot.timeToLand - reaction;
  if (available <= 0) return 1;
  if (target.hasEscape) return 0;
  if (target.moveSpeed <= 0) return 1;
  const needed = (shot.reach + target.radius) / target.moveSpeed;
  return 1 / (1 + Math.exp((available - needed) / spread));
}
