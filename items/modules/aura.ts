/** Effects on enemies near the holder: whether the enemy is within a radius of it. */
import type { Unit } from "../../engine/sim/state";

/** The enemy is within `radius` units of the holder: from the holder's center to the enemy's edge, as the wiki's ranges go. */
export function within(self: Pick<Unit, "x">, enemy: Unit, radius: number): boolean {
  return Math.abs(enemy.x - self.x) - enemy.spec.base.radius <= radius;
}
