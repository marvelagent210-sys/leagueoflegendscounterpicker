import type { Behavior } from "../../engine/sim/behavior";
import { type FightOutcome, createWorld, runWorld } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { LogEntry, Mode, Side, SimSettings, Status, World } from "../../engine/sim/state";

export interface DuelOptions {
  distance?: number;
  modes?: [Mode, Mode];
  settings?: Partial<SimSettings>;
  behaviors?: [Behavior | undefined, Behavior | undefined];
  /** Changes the world before the first tick (statuses, health, cooldowns, ...). */
  setup?: (world: World) => void;
}

export function duel(a: FighterSpec, b: FighterSpec, options: DuelOptions = {}): FightOutcome {
  const world = createWorld({
    fighters: [a, b],
    distance: options.distance ?? 0,
    modes: options.modes ?? ["fight", "fight"],
    settings: { log: true, ...options.settings },
  });
  options.setup?.(world);
  return runWorld(world, options.behaviors);
}

/** A status that lasts the whole fight. */
export function lasting(kind: Status["kind"], key: string, value = 0, extra: Partial<Status> = {}): Status {
  return { kind, key, source: 0, startTick: 0, endTick: 1e9, value, ...extra };
}

/** Ticks of the log entries by `side` whose text includes `text`. */
export function ticksOf(log: LogEntry[], side: Side, text: string): number[] {
  return log.filter((e) => e.side === side && e.text.includes(text)).map((e) => e.tick);
}

/** Behaviors that never act. */
export const idle: Behavior = () => undefined;
export const standStill: Behavior = () => ({ kind: "move", direction: 0 });

/** Casts `key` whenever it is ready; otherwise stands still. */
export function castWhenReady(key: string): Behavior {
  return (view) => ((view.self.cooldownReady[key] ?? 0) <= view.world.tick && !view.self.action ? { kind: "cast", ability: key } : { kind: "move", direction: 0 });
}
