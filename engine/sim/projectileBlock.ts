import type { Side, World } from "./state";
import { other } from "./state";

const EPSILON = 1e-6;

/** Projectile defenses on a traveled segment, including an explicitly instantaneous projectile. */
export function projectileBlocked(world: World, owner: Side, from: number, to: number): boolean {
  const targetSide = other(owner);
  for (const zone of world.zones) {
    if (zone.kind !== "projectileWall" || zone.owner !== targetSide || world.tick < zone.startTick || world.tick >= zone.endTick) continue;
    if ((from - zone.x) * (to - zone.x) <= 0) return true;
  }
  return projectileAuraBlocked(world, owner, from, to);
}

/** A moving projectile-destruction aura catches the whole traveled segment. */
export function projectileAuraBlocked(world: World, owner: Side, from: number, to: number): boolean {
  const target = world.units[other(owner)];
  return target.statuses.some((status) => status.kind === "state" && status.key === "projectileBlock"
    && world.tick >= status.startTick && world.tick < status.endTick
    && Math.min(from, to) <= target.x + target.spec.base.radius + status.value + EPSILON
    && Math.max(from, to) >= target.x - target.spec.base.radius - status.value - EPSILON);
}
