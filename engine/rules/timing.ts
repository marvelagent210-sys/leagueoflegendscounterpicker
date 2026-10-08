/**
 * Cooldowns and the attack timer (wiki: "Haste", "Attack speed", "Basic attack", "Cast time").
 *
 * - Ability haste: cooldown x 100 / (100 + haste).
 * - Attack speed is capped at 1 / 0.333 (about 3.003) and floored at 0.2 attacks per second
 *   (engine/stats.ts).
 * - The attack timer: the windup (standing still) launches the attack, then the rest of the
 *   attack time is a cooldown. Interrupting the windup resets the timer; an attack reset
 *   skips the cooldown.
 * - Cast times can't be interrupted except by death, and most abilities start their
 *   cooldown and pay their cost when the cast time ends.
 */
import { ATTACK_SPEED_CAP, ATTACK_SPEED_FLOOR } from "../stats";

export function cooldownAfterHaste(cooldown: number, haste: number): number {
  return cooldown * (100 / (100 + haste));
}

export function capAttackSpeed(attackSpeed: number, cap = ATTACK_SPEED_CAP): number {
  return Math.min(cap, Math.max(ATTACK_SPEED_FLOOR, attackSpeed));
}
