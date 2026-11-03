/**
 * A rune page on a fighter (M8's loadouts): its keystone, its five lesser runes and its three
 * stat shards, each modeled by a module (runes/modules/) from the rune catalog at level 20.
 *
 * Runes go on in the same pass as the items and summoner spells (items/equip.ts,
 * `EquipOptions.extras`), after the items: adaptive force needs the bonus stats they give,
 * and runes share their holder's combat status and Energized charges with the items. As with
 * item actives, the kit's cast hooks don't see what runes do, and rune damage isn't the kit's
 * ability damage. A page follows the wiki's rules (the Rune article), and a champion gets the
 * runes the article lists in place of the ones it can't use.
 */
import { traitsOf } from "../engine/sim/behavior";
import type { AbilitySpec, BonusStats, Effect, FighterSpec, KitHooks } from "../engine/sim/spec";
import type { ItemFighter, LoadoutPart, Permanent } from "../items/equip";
import { permanentHooks } from "../items/equip";
import type { RuneCatalog, RuneEntry, ShardOption } from "../pipeline/runeCatalog/records";
import { RuneContext, type RuneData, type RuneEvidence } from "./context";

/** A rune page: a keystone and three lesser runes of its path, two of another path, and three shards. */
export interface RunePage {
  keystone: string;
  /** The keystone's path's lesser runes, one from each of its three rows. */
  primary: string[];
  /** Another path's lesser runes, from two different rows. */
  secondary: string[];
  /** One stat shard per slot: Offense, Flex, Defense. */
  shards: string[];
}

/** What a rune knows about its holder while it is built: one form of the champion, with its items. */
export interface RuneFighter {
  spec: FighterSpec;
  ranged: boolean;
  mana: boolean;
  /** Which stat adaptive force gives this holder, and adaptive damage deals: bonus AD (physical) or AP (magic). */
  adaptive: "ad" | "ap";
  /** The holder's bonus stats after its items. */
  bonus: BonusStats;
  /** What the items know about the holder: its combat status and Energized charges, shared with them, and its build. */
  items: ItemFighter;
  /** The summoner spells it holds, by name. */
  spells: readonly string[];
}

/** What a rune module adds to its holder. */
export interface RuneDefinition {
  /** Stats fixed for the fight. */
  bonus?: BonusStats;
  /** Statuses from the start, under the rune's own key. */
  permanent?: Permanent[];
  /** Effects every basic attack applies on hit. */
  onHit?: Effect[];
  hooks?: KitHooks;
  /** Hooks on the enemy's side. */
  enemyHooks?: KitHooks;
  haste?: LoadoutPart["haste"];
  /** Bonus maximum mana, for mana champions. */
  mana?: number;
  /** What the rune does that the simulator leaves out, each with why. */
  unmodeled?: string[];
  /** Why the rune does nothing in a duel at all; the loadout search leaves it out. */
  outsideDuels?: string;
}

export interface RuneModule {
  /** The rune's (or stat shard's) name in the catalog. */
  rune: string;
  /**
   * Assumptions the user can change (stacks collected before the fight), each with what its
   * default rests on (`basis`: an estimate for a typical game, runes/shared.ts).
   */
  options?: Record<string, { label: string; default: number; basis?: string }>;
  build(rune: RuneData, fighter: RuneFighter, options: Record<string, number>): RuneDefinition;
}

export interface RuneCoverage {
  rune: string;
  modeled: boolean;
  unmodeled: string[];
}

export interface EquippedRunes {
  page: RunePage;
  /** The page as played, after the substitutions. */
  played: RunePage;
  evidence: RuneEvidence[];
  assumptions: string[];
  coverage: RuneCoverage[];
  options: Record<string, Record<string, number>>;
}

// ---------------------------------------------------------------------------------------
// The page's rules

const simplify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

/** A catalog rune by name; case, spaces and punctuation don't matter. */
export function findRune(catalog: RuneCatalog, name: string): RuneEntry {
  const found = catalog.runes.find((entry) => simplify(entry.name) === simplify(name));
  if (!found) throw new Error(`No rune "${name}"`);
  return found;
}

/** A shard option of a slot by name ("Adaptive Force", "adaptive"), or by a word of it. */
export function findShard(catalog: RuneCatalog, slot: number, name: string): ShardOption {
  const options = catalog.shards[slot]?.options ?? [];
  const wanted = simplify(name);
  const found = options.find((option) => simplify(option.name) === wanted) ?? options.find((option) => simplify(option.name).startsWith(wanted));
  if (!found) throw new Error(`No shard "${name}" in the ${catalog.shards[slot]?.slot ?? `slot ${slot + 1}`} slot (has ${options.map((o) => o.name).join(", ")})`);
  return found;
}

/** What is wrong with a page under the wiki's rules (the Rune article), if anything. */
export function pageProblems(page: RunePage, catalog: RuneCatalog): string[] {
  const problems: string[] = [];
  const known = (name: string) => catalog.runes.find((entry) => simplify(entry.name) === simplify(name));
  const keystone = known(page.keystone);
  if (!keystone) return [`no rune "${page.keystone}"`];
  if (keystone.row !== 0) problems.push(`${keystone.name} isn't a keystone`);
  const primary = page.primary.map((name) => known(name) ?? name);
  const secondary = page.secondary.map((name) => known(name) ?? name);
  for (const entry of [...primary, ...secondary]) if (typeof entry === "string") problems.push(`no rune "${entry}"`);
  if (problems.length > 0) return problems;
  const [lesser, other] = [primary as RuneEntry[], secondary as RuneEntry[]];
  if (lesser.length !== 3 || lesser.some((entry) => entry.path !== keystone.path) || new Set(lesser.map((entry) => entry.row)).size !== 3 || lesser.some((entry) => entry.row === 0)) {
    problems.push(`the primary path (${keystone.path}) takes one lesser rune from each of its three rows, not ${lesser.map((entry) => entry.name).join(", ") || "none"}`);
  }
  const path = other[0]?.path;
  if (other.length !== 2 || path === keystone.path || other.some((entry) => entry.path !== path) || other.some((entry) => entry.row === 0) || other[0]!.row === other[1]?.row) {
    problems.push(`the secondary path takes two lesser runes from two different rows of a path other than ${keystone.path}, not ${other.map((entry) => entry.name).join(", ") || "none"}`);
  }
  if (page.shards.length !== catalog.shards.length) problems.push(`a page has ${catalog.shards.length} shards, one per slot, not ${page.shards.length}`);
  else page.shards.forEach((name, slot) => {
    try {
      findShard(catalog, slot, name);
    } catch (error) {
      problems.push((error as Error).message);
    }
  });
  return problems;
}

/** The Rune article's rule for a page, quoted for the evidence. */
const PAGE_RULE = "Each rune page contains runes from two paths: one primary and one secondary. The primary path has one keystone and three lesser runes. The secondary path has two lesser runes. There are also three Shard slots alongside the Primary and Secondary paths that follow a path separate from the five. Each individual slot can be filled with one selection.";

/** What decides which substitutions a champion gets. */
export interface SubstitutionFacts {
  champion: string;
  resourceType?: string;
  /** Whether the kit has abilities that immobilize. */
  immobilizes: boolean;
  spells: readonly string[];
}

/** The Rune article's substitutions that depend on the champion, each with the bullet that states it. */
const SUBSTITUTIONS: Array<{ bullet: string; applies: (facts: SubstitutionFacts) => boolean; swaps: Array<[string, string]> }> = [
  { bullet: "For champions without mana, Manaflow Band is exchanged with Axiom Arcanist.", applies: (f) => f.resourceType !== "Mana", swaps: [["Manaflow Band", "Axiom Arcanist"]] },
  { bullet: "For champions without mana nor energy, Presence of Mind is exchanged with Triumph.", applies: (f) => f.resourceType !== "Mana" && f.resourceType !== "Energy", swaps: [["Presence of Mind", "Triumph"]] },
  {
    bullet: "For champions without immobilizing effects, Aftershock is exchanged with Grasp of the Undying and Glacial Augment is exchanged with First Strike.",
    applies: (f) => !f.immobilizes,
    swaps: [["Aftershock", "Grasp of the Undying"], ["Glacial Augment", "First Strike"]],
  },
  { bullet: "For champions that do not equip Flash, Hextech Flashtraption is exchanged with Cash Back.", applies: (f) => !f.spells.includes("Flash"), swaps: [["Hextech Flashtraption", "Cash Back"]] },
  { bullet: "For Bel'Veth, Ultimate Hunter is exchanged with Relentless Hunter.", applies: (f) => f.champion === "Belveth", swaps: [["Ultimate Hunter", "Relentless Hunter"]] },
  { bullet: "For Samira, Ultimate Hunter is exchanged with Treasure Hunter.", applies: (f) => f.champion === "Samira", swaps: [["Ultimate Hunter", "Treasure Hunter"]] },
  { bullet: "For Elise, Jayce, Nidalee and Zoe, Axiom Arcanist is exchanged with Nimbus Cloak.", applies: (f) => ["Elise", "Jayce", "Nidalee", "Zoe"].includes(f.champion), swaps: [["Axiom Arcanist", "Nimbus Cloak"]] },
];

/** Yorick's exception to the immobilizing rule, as the article states it. */
const YORICK = "Yorick is an exception to this rule and considered to not have an immobilizing effect despite having an immobilize on his W.";

/** Whether a kit immobilizes, as the substitutions count it. */
export function immobilizes(spec: FighterSpec, catalog: RuneCatalog): boolean {
  if (spec.id === "Yorick") {
    if (!catalog.substitutions.some((line) => line.trim() === YORICK)) throw new Error(`The Rune article no longer says: ${YORICK}`);
    return false;
  }
  const forms = Object.values(spec.forms ?? { [spec.name]: spec });
  return forms.some((form) => form.abilities.some((ability: AbilitySpec) => traitsOf(ability).immobilizes));
}

/** The page as a champion plays it, and the substitutions made, with the bullets that state them. */
export function substitutePage(page: RunePage, catalog: RuneCatalog, facts: SubstitutionFacts): { page: RunePage; made: string[] } {
  const made: string[] = [];
  const swap = (name: string): string => {
    for (const rule of SUBSTITUTIONS) {
      const found = rule.swaps.find(([from]) => simplify(from) === simplify(name));
      if (!found || !rule.applies(facts)) continue;
      if (!catalog.substitutions.some((line) => line.trim() === rule.bullet)) throw new Error(`The Rune article no longer says: ${rule.bullet}`);
      made.push(`${found[0]} is ${found[1]}: "${rule.bullet}" (the wiki's Rune article)`);
      return found[1];
    }
    return name;
  };
  return { page: { keystone: swap(page.keystone), primary: page.primary.map(swap), secondary: page.secondary.map(swap), shards: [...page.shards] }, made };
}

// ---------------------------------------------------------------------------------------
// Equipping

/** The kit's ability names, in every form: a rune of the same name labels its damage apart. */
function reservedNames(form: FighterSpec): Set<string> {
  return new Set(Object.values(form.forms ?? { [form.name]: form }).flatMap((f) => f.abilities.map((ability) => ability.name)));
}

/** Adaptive force's choice (the wiki's Adaptive force page): the higher of bonus AD and AP, the champion's adaptive type on a tie. */
function adaptiveChoice(bonus: BonusStats, adaptiveType: "Physical" | "Magic"): "ad" | "ap" {
  const [ad, ap] = [bonus.ad ?? 0, bonus.ap ?? 0];
  return ad > ap ? "ad" : ap > ad ? "ap" : adaptiveType === "Physical" ? "ad" : "ap";
}

export interface RuneLoadout {
  /** What the page adds to one form of the champion, after its items (EquipOptions.extras). */
  part(form: FighterSpec, items: { bonus: BonusStats; fighter: ItemFighter }): LoadoutPart;
  finish(): EquippedRunes;
}

export interface RuneLoadoutOptions {
  /** The champion's adaptive type (the champion record's), for adaptive force on a tie. */
  adaptiveType: "Physical" | "Magic";
  /** The summoner spells the champion holds, by name (Nimbus Cloak, Hextech Flashtraption). */
  spells?: readonly string[];
  /** Option overrides, by rune name and option. */
  options?: Record<string, Record<string, number>>;
}

/** A rune page for a fighter, checked against the wiki's rules, built for each form of the champion as equipItems asks. */
export function runeLoadout(spec: FighterSpec, page: RunePage, catalog: RuneCatalog, modules: Readonly<Record<string, RuneModule>>, settings: RuneLoadoutOptions): RuneLoadout {
  const problems = pageProblems(page, catalog);
  if (problems.length > 0) throw new Error(`${spec.name}'s rune page breaks the rules: ${problems.join("; ")}`);
  const context = new RuneContext(catalog);
  context.rule("Rune", "Rune page").quote(PAGE_RULE);
  const spells = settings.spells ?? [];
  const substituted = substitutePage(page, catalog, { champion: spec.id, ...(spec.resourceType ? { resourceType: spec.resourceType } : {}), immobilizes: immobilizes(spec, catalog), spells });
  for (const text of substituted.made) context.assume(text);
  const played = substituted.page;
  const runes = [played.keystone, ...played.primary, ...played.secondary].map((name) => findRune(catalog, name));
  const shards = played.shards.map((name, slot) => findShard(catalog, slot, name));
  const options: Record<string, Record<string, number>> = {};
  const coverage = new Map<string, RuneCoverage>();
  return {
    part(form, items) {
      const fighter: RuneFighter = { spec: form, ranged: form.attack.ranged, mana: form.resourceType === "Mana", adaptive: adaptiveChoice(items.bonus, settings.adaptiveType), bonus: items.bonus, items: items.fighter, spells };
      if (runes.length + shards.length > 0) {
        const rule = context.rule("Adaptive force", "Adaptive force");
        rule.quote("1 point of Adaptive Force provides 0.6 bonus AD or 1 AP.");
        rule.quote("If the bonus attack damage and the ability power of the unit are equal, the stat granted depends on the adaptive type of the champion.");
        context.assume(`Adaptive force: ${form.name} has ${Math.round(items.bonus.ad ?? 0)} bonus AD and ${Math.round(items.bonus.ap ?? 0)} AP from items, so adaptive force gives ${fighter.adaptive === "ad" ? "bonus AD" : "AP"} and adaptive damage is ${fighter.adaptive === "ad" ? "physical" : "magic"}.`);
      }
      const reserved = reservedNames(form);
      const part: LoadoutPart = { abilities: [], hooks: [], first: [], enemyHooks: [], labels: [], bonus: {}, haste: [], mana: 0, onHit: [] };
      const add = (key: string, data: RuneData, module: RuneModule | undefined) => {
        if (!module) throw new Error(`No module for the rune ${key}`);
        const chosen = { ...Object.fromEntries(Object.entries(module.options ?? {}).map(([name, option]) => [name, option.default])), ...settings.options?.[key] };
        for (const [name, option] of Object.entries(module.options ?? {})) {
          const given = settings.options?.[key]?.[name] !== undefined;
          context.assume(`${key}: ${option.label}: ${chosen[name]}${!given && option.basis ? ` (${option.basis})` : ""}.`);
        }
        options[key] = chosen;
        const definition = module.build(data, fighter, chosen);
        const notes = coverage.get(key) ?? { rune: key, modeled: false, unmodeled: [] };
        coverage.set(key, notes);
        for (const text of [...(definition.outsideDuels ? [definition.outsideDuels] : []), ...(definition.unmodeled ?? [])]) if (!notes.unmodeled.includes(text)) notes.unmodeled.push(text);
        // Modeled: it adds something to the fight.
        const acts = definition.bonus !== undefined || (definition.permanent?.length ?? 0) > 0 || (definition.onHit?.length ?? 0) > 0 || definition.hooks !== undefined || definition.enemyHooks !== undefined || (definition.haste?.length ?? 0) > 0 || (definition.mana ?? 0) > 0;
        notes.modeled ||= acts;
        for (const [stat, value] of Object.entries(definition.bonus ?? {}) as Array<[keyof BonusStats, number]>) part.bonus![stat] = (part.bonus![stat] ?? 0) + value;
        if (definition.permanent?.length) part.first!.push(permanentHooks(`rune:${key}`, definition.permanent));
        part.onHit!.push(...(definition.onHit ?? []));
        if (definition.hooks) part.hooks.push(definition.hooks);
        if (definition.enemyHooks) part.enemyHooks.push(definition.enemyHooks);
        part.haste!.push(...(definition.haste ?? []));
        part.mana! += definition.mana ?? 0;
        if (!part.labels.includes(data.label)) part.labels.push(data.label);
      };
      for (const record of runes) add(record.name, context.rune(record, reserved), modules[record.name]);
      shards.forEach((option, slot) => add(`${catalog.shards[slot]!.slot}: ${option.name}`, context.shard(option), modules[`Shard: ${option.name}`]));
      return part;
    },
    finish() {
      context.seal();
      const keys = [...runes.map((record) => record.name), ...shards.map((option, slot) => `${catalog.shards[slot]!.slot}: ${option.name}`)];
      return { page, played, evidence: context.evidence, assumptions: context.assumptions, coverage: keys.map((key) => coverage.get(key) ?? { rune: key, modeled: false, unmodeled: [] }), options };
    },
  };
}
