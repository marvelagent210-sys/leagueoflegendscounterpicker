/**
 * Terrain raised by abilities, on the line: a stretch units can't walk, dash or be pushed
 * into (Pillar of Ice; Dark Procession's ring, impassable to Yorick's enemies only). A unit
 * already overlapping it (raised on top of it) can still move out.
 */
import { EPSILON } from "./actions";
import type { Terrain, Unit, World } from "./state";

function blocks(terrain: Terrain, unit: Unit, tick: number): boolean {
  return tick < terrain.endTick && (!terrain.enemyOnly || terrain.owner !== unit.side);
}

/**
 * How far along the line (`dx`, signed) the unit can move before its pathing radius meets
 * terrain that blocks it.
 */
export function terrainLimit(world: World, unit: Unit, dx: number): number {
  if (dx === 0 || world.terrain.length === 0) return dx;
  const r = unit.spec.base.pathingRadius;
  let limit = dx;
  for (const terrain of world.terrain) {
    if (!blocks(terrain, unit, world.tick)) continue;
    if (dx > 0 && unit.x + r <= terrain.from + EPSILON) limit = Math.min(limit, Math.max(0, terrain.from - (unit.x + r)));
    if (dx < 0 && unit.x - r >= terrain.to - EPSILON) limit = Math.max(limit, -Math.max(0, unit.x - r - terrain.to));
  }
  return limit;
}

/** Distance the unit can travel in `direction` (+1 or -1 along the line) before blocking terrain. */
export function terrainGap(world: World, unit: Unit, direction: 1 | -1): number {
  const limit = terrainLimit(world, unit, direction * Number.MAX_SAFE_INTEGER);
  return Math.abs(limit) >= Number.MAX_SAFE_INTEGER ? Number.POSITIVE_INFINITY : Math.abs(limit);
}

export function expireTerrain(world: World): void {
  if (world.terrain.some((t) => t.endTick <= world.tick)) world.terrain = world.terrain.filter((t) => t.endTick > world.tick);
}
