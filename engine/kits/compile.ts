/**
 * Champion kits for the simulator: a kit module (kits/champions/<id>.ts) reads the wiki's
 * ability data through a KitContext and describes each ability in the simulator's terms;
 * compiling it adds the champion's level-20 base stats and basic attack.
 */
import type { AbilityRecord } from "../abilities";
import type { Behavior } from "../sim/behavior";
import { baseFighter } from "../sim/fromChampion";
import type { AbilitySpec, AttackSpec, BaseStats, Effect, FighterSpec, KitHooks } from "../sim/spec";
import type { Champion } from "../types";
import { KitContext, type KitEvidence } from "./context";

export interface KitDefinition {
  abilities: AbilitySpec[];
  /** Changes to the basic attack: on-hit effects of innates, attack range. */
  attack?: Partial<AttackSpec>;
  /** Changes to base stats from innates. */
  base?: Partial<BaseStats>;
  hooks?: KitHooks;
  /** Innate effects that are always on (applied to itself before the fight). */
  start?: Effect[];
  /** Resource at the start of a fight (Fury starts empty); default full. */
  resourceStart?: number;
  behavior?: Behavior;
}

/** An assumption a kit makes that the user can change (stacks collected by level 20, ...). */
export interface KitOption {
  label: string;
  default: number;
}

export interface KitModule {
  /** Data Dragon id. */
  champion: string;
  options?: Record<string, KitOption>;
  build(kit: KitContext, options: Record<string, number>): KitDefinition;
}

export interface CompiledKit {
  champion: string;
  spec: FighterSpec;
  /** Every label, field and quote the kit read from the wiki. */
  evidence: KitEvidence[];
  /** The kit's simplifications, for its kit page. */
  assumptions: string[];
  options: Record<string, number>;
}

export function compileKit(champion: Champion, records: AbilityRecord[], module: KitModule, overrides: Record<string, number> = {}): CompiledKit {
  const kit = new KitContext(champion, records);
  const options = Object.fromEntries(Object.entries(module.options ?? {}).map(([key, option]) => [key, overrides[key] ?? option.default]));
  for (const [key, option] of Object.entries(module.options ?? {})) kit.assume(`${option.label}: ${options[key]}.`);
  const definition = module.build(kit, options);
  const base = baseFighter(champion);
  const keys = new Set<string>();
  for (const ability of definition.abilities) {
    if (keys.has(ability.key)) throw new Error(`${champion.id} kit: two abilities with key "${ability.key}"`);
    keys.add(ability.key);
  }
  const spec: FighterSpec = {
    ...base,
    base: { ...base.base, ...definition.base },
    attack: { ...base.attack, ...definition.attack },
    abilities: definition.abilities,
    ...(definition.hooks ? { hooks: definition.hooks } : {}),
    ...(definition.start ? { start: definition.start } : {}),
    ...(definition.resourceStart !== undefined ? { resourceStart: definition.resourceStart } : {}),
    ...(definition.behavior ? { behavior: definition.behavior } : {}),
  };
  return { champion: champion.id, spec, evidence: kit.evidence, assumptions: kit.assumptions, options };
}
