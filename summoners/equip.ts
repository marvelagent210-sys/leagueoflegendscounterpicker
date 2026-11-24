/**
 * Summoner spells on a fighter (M8's loadouts): each spell's module (summoners/modules/) adds
 * actives that the default behavior casts like abilities, and hooks.
 *
 * Spells go on in the same pass as the items (items/equip.ts, `EquipOptions.extras`), so that,
 * as with item actives, the kit's cast and ability-hit hooks don't see them and their damage
 * isn't the kit's ability damage: the wiki's "Damage" page files summoner spell damage under
 * "Item" damage. Which crowd control stops them follows the wiki's rule for summoner spells
 * (Template:Tip data/Cast-inhibiting crowd control), not the one for item actives.
 */
import { ccTypes } from "../engine/sim/derived";
import { inStasis } from "../engine/sim/combat";
import type { AbilitySpec, FighterSpec, KitHooks } from "../engine/sim/spec";
import type { LoadoutPart } from "../items/equip";
import type { SpellCatalog, SpellRecord } from "../pipeline/summoners/records";
import { type SpellData, SpellContext, type SpellEvidence } from "./context";

/** The ability key of a summoner spell's active, set apart from the kit's abilities and item actives. */
export const spellKey = (spell: string, variant?: string) => `summoner:${spell}${variant ? ` (${variant})` : ""}`;

export function isSpellActive(ability: AbilitySpec | undefined): boolean {
  return ability?.key.startsWith("summoner:") === true;
}

/** What a spell knows about its holder while it is built: one form of the champion. */
export interface SpellFighter {
  spec: FighterSpec;
}

/** An active as a spell module gives it: the rest of its spec is filled in (spellActive). */
export type SpellActiveSpec = Omit<AbilitySpec, "key" | "name" | "slot" | "castTime"> & {
  /** Set apart from the spell's other actives (Flash's two directions); the spell's key without it. */
  variant?: string;
};

/** What a spell module adds to its holder. */
export interface SpellDefinition {
  actives?: SpellActiveSpec[];
  /**
   * A movement spell (Flash): the crowd control that stops movement abilities stops it, as the
   * wiki's rule has it. The crowd control that stops the others is stasis and suppression alone.
   */
  movement?: boolean;
  hooks?: KitHooks;
  /** Hooks on the enemy's side. */
  enemyHooks?: KitHooks;
  /** What the spell does that the simulator leaves out, each with why. */
  unmodeled?: string[];
  /** Why the spell does nothing in a duel at all (Smite, Teleport); the loadout search leaves it out. */
  outsideDuels?: string;
}

export interface SpellModule {
  /** The spell's name in the catalog. */
  spell: string;
  build(spell: SpellData, fighter: SpellFighter): SpellDefinition;
}

/** How much of a spell the simulator models. */
export interface SpellCoverage {
  spell: string;
  modeled: boolean;
  /** What it leaves out, with why. */
  unmodeled: string[];
}

export interface EquippedSpells {
  spells: SpellRecord[];
  evidence: SpellEvidence[];
  assumptions: string[];
  coverage: SpellCoverage[];
}

/** A champion holds two summoner spells. */
export const SPELL_SLOTS = 2;

/**
 * A summoner spell active: no cast time, its cooldown unaffected by ability haste (summoner spell
 * haste is a haste of its own), not a champion cast, out of the stat budget's reference fight,
 * past spell shields. Stasis and suppression stop it; a movement spell is stopped like a
 * movement ability instead.
 */
function spellActive(spell: SpellData, active: SpellActiveSpec, movement: boolean): AbilitySpec {
  const { variant, ...rest } = active;
  const ability: AbilitySpec = {
    castTime: 0,
    staticCooldown: true,
    countsAsCast: false,
    budgetExcluded: true,
    ...rest,
    key: spellKey(spell.name, variant),
    name: spell.label,
    slot: "other",
    flags: { spellShield: false, ...rest.flags },
  };
  const own = ability.usable;
  // A champion's own stasis (Zhonya's Hourglass) is a state, not crowd control: it stops summoner spells all the same.
  if (movement) return { ...ability, usable: (unit, world) => !inStasis(unit) && (own?.(unit, world) ?? true) };
  return {
    ...ability,
    // Instant: cast during the champion's own casts, channels, dashes and windups, interrupting none of them.
    anytime: true,
    preserveAttackWindup: true,
    preserveFacing: true,
    flags: { ...ability.flags, usableWhileDisabled: true },
    usable: (unit, world) => !inStasis(unit) && !ccTypes(unit).has("suppression") && (own?.(unit, world) ?? true),
  };
}

/** The rules every summoner spell follows, quoted once per fighter. */
function quoteRules(spell: SpellData): void {
  spell.rule("Template:Tip data/Cast-inhibiting crowd control").quote("Root and Ground only disable movement spells and abilities. Stasis and Suppression are the only crowd control effects that disable all summoner spells from use; all other cast-inhibiting crowd control only disable movement summoner spells.");
  spell.rule("Template:Tip data/Spell shield").quote("A spell shield may negate many active effects coming from champion abilities, epic monsters, champion summoned units, and items, but almost none from runes and summoner spells with the only exceptions of Arcane Comet, Unleashed Smite, and Primal Smite which will be blocked.");
  spell.rule("Damage").quote("Item: Represents damage originating from most non-champion spells. Despite the name, this includes summoner spell damage against champions, in addition to item abilities.");
}

/** The kit's ability names, in every form: a spell of the same name labels its damage apart. */
function reservedNames(form: FighterSpec): Set<string> {
  return new Set(Object.values(form.forms ?? { [form.name]: form }).flatMap((f) => f.abilities.map((ability) => ability.name)));
}

export interface SpellLoadout {
  /** What the spells add to one form of the champion, for equipItems (EquipOptions.extras). */
  part(form: FighterSpec): LoadoutPart;
  /** Once equipped: what the spells read and assumed, and what they leave out. */
  finish(): EquippedSpells;
}

/**
 * Summoner spells for a fighter, by name, built for each form of the champion as equipItems
 * asks for them. A champion holds at most two, and not the same one twice.
 */
export function spellLoadout(names: readonly string[], catalog: SpellCatalog, modules: Readonly<Record<string, SpellModule>>): SpellLoadout {
  if (names.length > SPELL_SLOTS) throw new Error(`A champion holds ${SPELL_SLOTS} summoner spells, not ${names.length} (${names.join(", ")})`);
  const records = names.map((name) => findSpell(catalog, name));
  const twice = records.find((record, i) => records.indexOf(record) !== i);
  if (twice) throw new Error(`A champion can't hold ${twice.name} twice`);
  const context = new SpellContext(catalog);
  const coverage = new Map<string, SpellCoverage>();
  return {
    part(form) {
      if (records.length > 0) context.assume("Summoner spells but Flash are cast during the champion's own casts, channels, dashes and attack windups without interrupting them (the wiki says channels may allow or forbid summoner spells, and lists none that forbid them); Flash waits for them, as movement does.");
      const reserved = reservedNames(form);
      const part: LoadoutPart = { abilities: [], hooks: [], enemyHooks: [], labels: [] };
      for (const record of records) {
        const spell = context.spell(record, reserved);
        const module = modules[record.name];
        if (!module) throw new Error(`No module for the summoner spell ${record.name}`);
        const definition = module.build(spell, { spec: form });
        quoteRules(spell);
        const notes = coverage.get(record.name) ?? { spell: record.name, modeled: false, unmodeled: [] };
        coverage.set(record.name, notes);
        for (const text of [...(definition.outsideDuels ? [definition.outsideDuels] : []), ...(definition.unmodeled ?? [])]) if (!notes.unmodeled.includes(text)) notes.unmodeled.push(text);
        notes.modeled ||= (definition.actives?.length ?? 0) > 0 || definition.hooks !== undefined;
        part.abilities.push(...(definition.actives ?? []).map((active) => spellActive(spell, active, definition.movement === true)));
        if (definition.hooks) part.hooks.push(definition.hooks);
        if (definition.enemyHooks) part.enemyHooks.push(definition.enemyHooks);
        if (!part.labels.includes(spell.label)) part.labels.push(spell.label);
      }
      return part;
    },
    finish() {
      context.seal();
      return { spells: records, evidence: context.evidence, assumptions: context.assumptions, coverage: records.map((record) => coverage.get(record.name) ?? { spell: record.name, modeled: false, unmodeled: [] }) };
    },
  };
}

/** The catalog's spells that do something in a duel (none of Smite's and Teleport's `outsideDuels`), in catalog order, built for `form`. */
export function duelSpells(catalog: SpellCatalog, modules: Readonly<Record<string, SpellModule>>, form: FighterSpec): string[] {
  const context = new SpellContext(catalog);
  const reserved = reservedNames(form);
  return catalog.spells.filter((record) => {
    const module = modules[record.name];
    return module !== undefined && module.build(context.spell(record, reserved), { spec: form }).outsideDuels === undefined;
  }).map((record) => record.name);
}

const simplify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

/** A catalog spell by name; case, spaces and punctuation don't matter. */
export function findSpell(catalog: SpellCatalog, name: string): SpellRecord {
  const found = catalog.spells.find((record) => simplify(record.name) === simplify(name));
  if (!found) throw new Error(`No summoner spell "${name}" (Summoner's Rift has ${catalog.spells.map((record) => record.name).join(", ")})`);
  return found;
}
