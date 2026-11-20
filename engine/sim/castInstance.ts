import { other, type Unit, type World } from "./state";

const active: Array<{ world: World; source: Unit; id: number; basicDamage?: true }> = [];

/** Allocate IDs when the source or the opposing champion observes an incoming cast. */
export function allocateCastInstance(world: World, source: Unit): number | undefined {
  if (!source.spec.hooks?.onDamageResolved && !world.units[other(source.side)].spec.hooks?.modifyAcceptedDamageBeforeShields) return;
  const id = (world.castInstanceSequence ?? 0) + 1;
  if (!Number.isSafeInteger(id)) throw new Error("Cast instance sequence exceeds safe integer range");
  return world.castInstanceSequence = id;
}

export function currentCastInstance(world: World, source: Unit): number | undefined {
  return active.findLast(row => row.world === world && row.source === source)?.id;
}

/** Remember accepted basic classification through later callbacks of the same delivery. */
export function markBasicDamageCast(world: World, source: Unit, id: number): void {
  for (const row of active) if (row.world === world && row.source === source && row.id === id) row.basicDamage = true;
}

export function currentCastUsesBasicDamage(world: World, source: Unit): boolean {
  return active.findLast(row => row.world === world && row.source === source)?.basicDamage === true;
}

/**
 * One synchronous stage can emit more native deliveries through kit hooks.
 * Claim only new objects from this source. Nested casts mark their own objects
 * first, and stored IDs survive the normal world copies for uncertain hits.
 */
export function withCastInstance<T>(world: World, source: Unit, id: number, run: () => T): T {
  const firstNewId = world.nextId;
  const previousAction = source.action;
  active.push({ world, source, id });
  try {
    return run();
  } finally {
    active.pop();
    if (source.action && source.action !== previousAction && source.action.startTick === world.tick) {
      source.action.castInstance ??= id;
    }
    if (world.nextId > firstNewId) {
      for (const missile of world.missiles) {
        if (missile.owner === source.side && missile.id >= firstNewId) missile.castInstance ??= id;
      }
      for (const zone of world.zones) {
        if (zone.owner === source.side && zone.id >= firstNewId) zone.castInstance ??= id;
      }
    }
  }
}
