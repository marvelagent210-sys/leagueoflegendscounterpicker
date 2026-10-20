/**
 * Terrain raised by abilities, on the line: a stretch units can't dash or be pushed into
 * (Pillar of Ice; Dark Procession's ring, impassable to Yorick's enemies only). Walking units
 * can't enter walls either, but go around round obstacles in open ground, slower along the
 * line. A unit already overlapping terrain (raised on top of it) can still move out.
 */
import { EPSILON } from "./actions";
import { hasState } from "./derived";
import type { Terrain, Unit, World } from "./state";

function blocks(terrain: Terrain, unit: Unit, tick: number): boolean {
  return tick < terrain.endTick && (!terrain.enemyOnly || terrain.owner !== unit.side);
}

/**
 * How far along the line (`dx`, signed) the unit can move before its pathing radius meets
 * terrain that blocks it. Walking units aren't stopped by round obstacles (see `aroundFactor`).
 */
export function terrainLimit(world: World, unit: Unit, dx: number, walking = false): number {
  if (dx === 0 || world.terrain.length === 0) return dx;
  if (walking && hasState(unit, "terrainIgnore")) return dx;
  const r = unit.spec.base.pathingRadius;
  let limit = dx;
  for (const terrain of world.terrain) {
    if (!blocks(terrain, unit, world.tick) || (walking && terrain.round)) continue;
    if (dx > 0 && unit.x + r <= terrain.from + EPSILON) limit = Math.min(limit, Math.max(0, terrain.from - (unit.x + r)));
    if (dx < 0 && unit.x - r >= terrain.to - EPSILON) limit = Math.max(limit, -Math.max(0, unit.x - r - terrain.to));
  }
  return limit;
}

/**
 * An opted-in dash can cross intervening terrain, provided its requested endpoint is clear.
 * An endpoint overlapping a wall is shortened to that wall's near edge, never extended.
 */
export function dashDistance(world: World, unit: Unit, dx: number): number {
  if (dx === 0) return 0;
  const direction = Math.sign(dx), radius = unit.spec.base.pathingRadius;
  let endpoint = unit.x + dx;
  // Clipping one wall can uncover another overlapping endpoint; at most one clip per wall.
  for (let pass = 0; pass < world.terrain.length; pass++) {
    let changed = false;
    for (const terrain of world.terrain) {
      if (!blocks(terrain, unit, world.tick) || endpoint + radius <= terrain.from + EPSILON || endpoint - radius >= terrain.to - EPSILON) continue;
      const edge = direction > 0 ? terrain.from - radius : terrain.to + radius;
      const clipped = direction > 0 ? Math.max(unit.x, Math.min(endpoint, edge)) : Math.min(unit.x, Math.max(endpoint, edge));
      if (Math.abs(clipped - endpoint) > EPSILON) { endpoint = clipped; changed = true; }
    }
    if (!changed) break;
  }
  return endpoint - unit.x;
}

/** Going around a round obstacle: half its circumference for every diameter along the line. */
export const AROUND = 2 / Math.PI;

/**
 * The share of a walking step (`dx`) that counts along the line: less than 1 while the unit's
 * pathing radius overlaps a round obstacle it is walking around.
 */
export function aroundFactor(world: World, unit: Unit, dx: number): number {
  if (dx === 0) return 1;
  if (hasState(unit, "terrainIgnore")) return 1;
  const r = unit.spec.base.pathingRadius;
  for (const terrain of world.terrain) {
    if (!terrain.round || !blocks(terrain, unit, world.tick)) continue;
    const next = unit.x + dx;
    const overlaps = (x: number) => x + r > terrain.from + EPSILON && x - r < terrain.to - EPSILON;
    if (overlaps(unit.x) || overlaps(next)) return AROUND;
  }
  return 1;
}

/** Distance the unit can travel in `direction` (+1 or -1 along the line) before blocking terrain. */
export function terrainGap(world: World, unit: Unit, direction: 1 | -1): number {
  const limit = terrainLimit(world, unit, direction * Number.MAX_SAFE_INTEGER);
  return Math.abs(limit) >= Number.MAX_SAFE_INTEGER ? Number.POSITIVE_INFINITY : Math.abs(limit);
}

export function expireTerrain(world: World): void {
  if (world.terrain.some((t) => t.endTick <= world.tick)) world.terrain = world.terrain.filter((t) => t.endTick > world.tick);
}

/** End a terrain-crossing walk in the nearest clear space on this arena's line.
 * Merge expanded obstacles first, so an overlapping wall cannot receive the unit.
 * Equal-distance exits follow current facing, preserving reflection symmetry. */
export function exitTerrain(world: World, unit: Unit): void {
  const radius = unit.spec.base.pathingRadius;
  const intervals = world.terrain.filter((terrain) => blocks(terrain, unit, world.tick))
    .map((terrain) => ({ from: terrain.from - radius, to: terrain.to + radius }))
    .sort((a, b) => a.from - b.from);
  const merged: Array<{ from: number; to: number }> = [];
  for (const interval of intervals) {
    const last = merged.at(-1);
    if (last && interval.from < last.to - EPSILON) last.to = Math.max(last.to, interval.to);
    else merged.push({ ...interval });
  }
  const inside = merged.find((interval) => unit.x > interval.from + EPSILON && unit.x < interval.to - EPSILON);
  if (!inside) return;
  const left = unit.x - inside.from, right = inside.to - unit.x;
  const facing = unit.facing ?? (unit.side === 0 ? 1 : -1);
  unit.x = Math.abs(left - right) <= EPSILON ? (facing > 0 ? inside.to : inside.from) : left < right ? inside.from : inside.to;
}
