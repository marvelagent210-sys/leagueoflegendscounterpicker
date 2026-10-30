/**
 * Champion kits for the simulator: a kit module (kits/champions/<id>.ts) reads the wiki's
 * ability data through a KitContext and describes each ability in the simulator's terms;
 * compiling it adds the champion's level-20 base stats and basic attack.
 */
import type { AbilityRecord, PetRecord, RuneRecord } from "../abilities";
import type { Behavior } from "../sim/behavior";
import { baseFighter } from "../sim/fromChampion";
import type { AbilitySpec, AttackSpec, BaseStats, BudgetHints, Effect, FighterSpec, KitHooks } from "../sim/spec";
import type { Champion } from "../types";
import { KitContext, type KitEvidence } from "./context";

/** Another form of the champion (Mega Gnar, Cannon Stance): what differs from the main one. */
export interface FormDefinition {
  /** The champion form (champions.json) whose level-20 base stats and attack it starts from; default the first. */
  championForm?: string;
  /** Changes to that form's base stats and basic attack. */
  base?: Partial<BaseStats>;
  attack?: Partial<AttackSpec>;
  abilities: AbilitySpec[];
  behavior?: Behavior;
}

export interface KitDefinition {
  abilities: AbilitySpec[];
  /** Name of the form the main definition describes; default the champion form's name. */
  form?: string;
  /** The champion's other forms, by name; the kit's hooks switch between them. */
  forms?: Record<string, FormDefinition>;
  /** Changes to the basic attack: on-hit effects of innates, attack range. */
  attack?: Partial<AttackSpec>;
  /** Changes to base stats from innates. */
  base?: Partial<BaseStats>;
  hooks?: KitHooks;
  statConversions?: FighterSpec["statConversions"];
  /** Innate effects that are always on (applied to itself before the fight). */
  start?: Effect[];
  /** Resource at the start of a fight (Fury starts empty); default full. */
  resourceStart?: number;
  /** Gold the kit adds to its stat budget (Master Craftsman's Masterwork upgrade). */
  extraGold?: number;
  /** What the stat budget should know about the kit's hooks. */
  budget?: BudgetHints;
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
  /**
   * Option sets the simulator tries in each matchup, keeping the one best for this champion
   * (Udyr's rank splits when none is pinned); none when the options settle it.
   */
  variants?(options: Record<string, number>, champion: Champion): Array<Record<string, number>>;
}

export interface CompiledKit {
  champion: string;
  spec: FighterSpec;
  /** Every label, field and quote the kit read from the wiki. */
  evidence: KitEvidence[];
  /** The kit's simplifications, for its kit page. */
  assumptions: string[];
  options: Record<string, number>;
  /** Option sets to try in each matchup (KitModule.variants), each complete; empty when there's nothing to choose. */
  variants: Array<Record<string, number>>;
}

export function compileKit(
  champion: Champion,
  records: AbilityRecord[],
  module: KitModule,
  overrides: Record<string, number> = {},
  pets: PetRecord[] = [],
  runes: RuneRecord[] = [],
): CompiledKit {
  const kit = new KitContext(champion, records, pets, runes);
  const options = Object.fromEntries(Object.entries(module.options ?? {}).map(([key, option]) => [key, overrides[key] ?? option.default]));
  for (const [key, option] of Object.entries(module.options ?? {})) kit.assume(`${option.label}: ${options[key]}.`);
  const definition = module.build(kit, options);
  const petTargetClasses: NonNullable<FighterSpec["petTargetClasses"]> = {};
  for (const record of pets) {
    const targeting = record.text.targeting;
    if (!targeting || /^N\/A$/i.test(targeting)) continue;
    kit.pet(record.name).quote(targeting);
    petTargetClasses[record.name] = /^(?:Lane )?Minion\b/i.test(targeting) ? "minion" : /^(?:(?:Epic|Large|Small) )?Monster\b/i.test(targeting) ? "monster" : /^Champion\b/i.test(targeting) ? "champion" : "other";
  }
  kit.seal();
  const base = baseFighter(champion);
  const keys = new Set<string>();
  const forms = Object.entries(definition.forms ?? {});
  for (const ability of [...definition.abilities, ...forms.flatMap(([, form]) => form.abilities)]) {
    if (keys.has(ability.key)) throw new Error(`${champion.id} kit: two abilities with key "${ability.key}"`);
    keys.add(ability.key);
  }
  const spec: FighterSpec = {
    ...base,
    ...(Object.keys(petTargetClasses).length ? { petTargetClasses } : {}),
    base: { ...base.base, ...definition.base },
    attack: { ...base.attack, ...definition.attack },
    abilities: definition.abilities,
    ...(definition.statConversions ? { statConversions: definition.statConversions } : {}),
    ...(definition.hooks ? { hooks: definition.hooks } : {}),
    ...(definition.start ? { start: definition.start } : {}),
    ...(definition.resourceStart !== undefined ? { resourceStart: definition.resourceStart } : {}),
    ...(definition.extraGold ? { extraGold: definition.extraGold } : {}),
    ...(definition.budget ? { budget: definition.budget } : {}),
    ...(definition.behavior ? { behavior: definition.behavior } : {}),
  };
  if (forms.length > 0) {
    const mainName = definition.form ?? base.name;
    const all: Record<string, FighterSpec> = { [mainName]: spec };
    spec.form = mainName;
    for (const [name, form] of forms) {
      const championForm = form.championForm === undefined ? champion.forms[0] : champion.forms.find((f) => f.name === form.championForm);
      if (!championForm) throw new Error(`${champion.id} kit: no champion form "${form.championForm}" (has: ${champion.forms.map((f) => f.name).join(", ")})`);
      const own = baseFighter(champion, championForm);
      const behavior = form.behavior ?? definition.behavior;
      all[name] = {
        ...spec,
        name,
        base: { ...own.base, ...form.base },
        attack: { ...own.attack, ...form.attack },
        abilities: form.abilities,
        ...(behavior ? { behavior } : {}),
        form: name,
      };
    }
    for (const form of Object.values(all)) form.forms = all;
  }
  const variants = (module.variants?.(options, champion) ?? []).map((variant) => ({ ...options, ...variant }));
  return { champion: champion.id, spec, evidence: kit.evidence, assumptions: kit.assumptions, options, variants };
}
