/**
 * Terrain raised by abilities, on the line: a stretch units can't dash or be pushed into
 * (Pillar of Ice; Dark Procession's ring, impassable to Yorick's enemies only). Walking units
 * can't enter walls either, but go around round obstacles in open ground, slower along the
 * line. A unit already overlapping terrain (raised on top of it) can still move out.
 */
import { EPSILON } from "./actions";
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
  const r = unit.spec.base.pathingRadius;
  let limit = dx;
  for (const terrain of world.terrain) {
    if (!blocks(terrain, unit, world.tick) || (walking && terrain.round)) continue;
    if (dx > 0 && unit.x + r <= terrain.from + EPSILON) limit = Math.min(limit, Math.max(0, terrain.from - (unit.x + r)));
    if (dx < 0 && unit.x - r >= terrain.to - EPSILON) limit = Math.max(limit, -Math.max(0, unit.x - r - terrain.to));
  }
  return limit;
}

/** Going around a round obstacle: half its circumference for every diameter along the line. */
export const AROUND = 2 / Math.PI;

/**
 * The share of a walking step (`dx`) that counts along the line: less than 1 while the unit's
 * pathing radius overlaps a round obstacle it is walking around.
 */
export function aroundFactor(world: World, unit: Unit, dx: number): number {
  if (dx === 0) return 1;
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
