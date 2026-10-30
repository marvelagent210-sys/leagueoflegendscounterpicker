import type { Side, World } from "./state";
import { other } from "./state";

const EPSILON = 1e-6;

/** Earliest intersection with one closed interval on this directed segment. */
function intervalContact(from: number, to: number, low: number, high: number): number | undefined {
  if (Math.min(from, to) > high + EPSILON || Math.max(from, to) < low - EPSILON) return undefined;
  if (from >= low - EPSILON && from <= high + EPSILON) return from;
  const boundary = to >= from ? low : high;
  return Math.min(Math.max(boundary, Math.min(from, to)), Math.max(from, to));
}

function auraContact(world: World, owner: Side, from: number, to: number): number | undefined {
  const target = world.units[other(owner)];
  let first: number | undefined;
  for (const status of target.statuses) {
    if (status.kind !== "state" || status.key !== "projectileBlock" || world.tick < status.startTick || world.tick >= status.endTick) continue;
    const radius = target.spec.base.radius + status.value;
    const point = intervalContact(from, to, target.x - radius, target.x + radius);
    if (point !== undefined && (first === undefined || Math.abs(point - from) < Math.abs(first - from))) first = point;
  }
  return first;
}

/** First actual destruction coordinate, including instantaneous projectiles and moving auras. */
export function projectileBlockPoint(world: World, owner: Side, from: number, to: number): number | undefined {
  let first = auraContact(world, owner, from, to);
  for (const zone of world.zones) {
    if (zone.kind !== "projectileWall" || zone.owner !== other(owner) || world.tick < zone.startTick || world.tick >= zone.endTick) continue;
    // Walls are crossing planes on the simulator's line, as in the existing blocker contract.
    if ((from - zone.x) * (to - zone.x) <= 0 && (first === undefined || Math.abs(zone.x - from) < Math.abs(first - from))) first = zone.x;
  }
  return first;
}

/** Projectile defenses on a traveled segment, including an explicitly instantaneous projectile. */
export function projectileBlocked(world: World, owner: Side, from: number, to: number): boolean {
  return projectileBlockPoint(world, owner, from, to) !== undefined;
}

/** A moving projectile-destruction aura catches the whole traveled segment. */
export function projectileAuraBlocked(world: World, owner: Side, from: number, to: number): boolean {
  return auraContact(world, owner, from, to) !== undefined;
}

/** A directional interception uses the actual body plus projectile radius, without a guessed barrier extent. */
export function projectileInterceptPoint(world: World, owner: Side, from: number, to: number, radius = 0): number | undefined {
  const target = world.units[other(owner)];
  if (!target.alive || target.hp <= 0 || target.resurrection || target.statuses.some(s => s.kind === "state" && (s.key === "stasis" || s.key === "untargetable"))) return undefined;
  if (!target.statuses.some(s => s.kind === "state" && s.key === "projectileIntercept" && s.startTick <= world.tick && s.endTick > world.tick)) return undefined;
  const facing = target.facing ?? (target.side === 0 ? 1 : -1);
  // Only an incoming segment can meet the raised front. A shot that entered
  // through the rear must not be caught later while leaving the front half;
  // a newly emitted collision bounce at the center is also a departing shot.
  if ((from - target.x) * facing <= EPSILON || (to - from) * facing >= -EPSILON) return undefined;
  return intervalContact(from, to, target.x - target.spec.base.radius - radius, target.x + target.spec.base.radius + radius);
}
