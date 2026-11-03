/**
 * The loadout search (PLAN.md §13, M8): the summoner spells and rune page each side of a matchup
 * plays with its item build (pipeline/items/search.ts), against the other side's.
 *
 * - Summoner spells: Flash, and a second spell, fought for among the others that do something
 *   in a duel (summoners/modules/; Smite and Teleport don't).
 * - Rune pages: every keystone the champion can play (the wiki's Rune article's substitutions
 *   made; Unsealed Spellbook, which works outside duels, left out) is fought for, the rest of
 *   its page completed by the quick estimate (items/estimate.ts, with the runes' hints): the
 *   stat shards slot by slot, then the rune of each row of the keystone's path that adds most,
 *   then the secondary path's two runes that add most together. The estimate values neither
 *   movement speed, tenacity nor mana, so the runes and shards that give only those are never
 *   chosen over ones that give something it values.
 * - A fight for a candidate is a screen against the enemy's loadout: the all-in scenarios with one
 *   branch each, as the build search's route screen plays them, with each fight's health margin.
 *   The sides answer each other's loadout in turn for two rounds; in the second, a side fights
 *   again only its first round's best keystones and spells.
 *
 * The result is the best loadout found within the model, not a guaranteed optimum.
 */
import { SCENARIO_WEIGHTS, engageRange, fightScore } from "../../engine/sim/scenarios";
import { fairFight, fight } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { type ItemParts, matchupSpecs } from "../../items/equip";
import { estimateAgainst, estimateSide } from "../../items/estimate";
import { type RunePage, findRune, runeParts, substituteRune, substitutionFacts } from "../../runes/equip";
import { RUNE_MODULES } from "../../runes/modules/index";
import { duelSpells } from "../../summoners/equip";
import { SPELL_MODULES } from "../../summoners/modules/index";
import { type LoadoutFighter, equipBuild, withItems } from "../itemData";
import type { ItemCatalog } from "../items/records";
import type { RuneCatalog } from "../runeCatalog/records";
import type { SpellCatalog } from "../summoners/records";

/** The spell every loadout holds. */
export const FLASH = "Flash";

/** A side's summoner spells and rune page. */
export interface Loadout {
  spells: string[];
  page: RunePage;
}

/** A side of the matchup as the loadout search sees it. */
export interface LoadoutSide {
  /** The champion's kit, for fights. */
  spec: FighterSpec;
  /** The kit as the quick estimate values it: the build search's calibrated kit (pipeline/items/calibrate.ts). */
  estimate: FighterSpec;
  /** The item build it plays, by name. */
  build: string[];
  /** The build's items as the estimate counts them. */
  parts: readonly ItemParts[];
  /** The champion's adaptive type, for adaptive force on a tie. */
  adaptiveType: "Physical" | "Magic";
}

export interface LoadoutCatalogs {
  items: ItemCatalog;
  runes: RuneCatalog;
  spells: SpellCatalog;
}

export interface LoadoutOptions {
  /** Rounds in which the sides answer each other. */
  rounds?: number;
  /** Keystones and spells a side fights for again after the first round: its best by the first round's screens. */
  keep?: { keystones: number; spells: number };
  /** Screens played as one fight, the chooser moving first on the opening tick, rather than a fair pair (fairFight). */
  single?: boolean;
  /** The second spell held while keystones are fought for before any spell is. */
  firstSpell?: string;
}

const DEFAULTS: Required<LoadoutOptions> = { rounds: 2, keep: { keystones: 3, spells: 2 }, single: true, firstSpell: "Ignite" };

export interface LoadoutScreen {
  candidate: string;
  score: number;
}

export interface SearchedLoadouts {
  loadouts: [Loadout, Loadout];
  /** Each side's screens, round by round: its keystones, then its second spells, with its scores. */
  screens: [Array<{ keystones: LoadoutScreen[]; spells: LoadoutScreen[] }>, Array<{ keystones: LoadoutScreen[]; spells: LoadoutScreen[] }>];
  /** Screens fought, both sides. */
  fights: number;
  seconds: number;
}

/** A rune or shard a page can hold, as the estimate counts it. */
interface Candidate {
  name: string;
  parts: ItemParts;
}

/** What a side can choose from: built once for its build. */
interface Choices {
  keystones: Array<{ name: string; path: string }>;
  spells: string[];
  /** Each path's lesser runes by row (the three rows after its keystones), as the champion plays them. */
  rows: Map<string, Candidate[][]>;
  /** Each shard slot's options. */
  shards: Candidate[][];
  /** Every candidate's parts, by rune name or "slot:shard". */
  parts: Map<string, ItemParts>;
}

/**
 * A side's keystones, second spells, lesser runes and shards. Each catalog rune is played as the
 * Rune article's substitutions have it for the champion (holding Flash), once; runes that work
 * outside duels are left out, unless a row has nothing else.
 */
function choicesFor(side: LoadoutSide, catalogs: LoadoutCatalogs): Choices {
  return withItems(side.spec, side.build, catalogs.items, (items) => choicesWith(side, catalogs, items));
}

function choicesWith(side: LoadoutSide, catalogs: LoadoutCatalogs, items: Parameters<Parameters<typeof withItems>[3]>[0]): Choices {
  const catalog = catalogs.runes;
  const spells = [FLASH];
  const facts = substitutionFacts(side.spec, catalog, spells);
  const settings = { adaptiveType: side.adaptiveType, spells };
  const built = new Map<string, { parts: ItemParts; outside: boolean }>();
  const build = (name: string) => {
    let found = built.get(name);
    if (!found) built.set(name, (found = runeParts(items.form, { kind: "rune", entry: findRune(catalog, name) }, catalog, RUNE_MODULES, settings, items)));
    return found;
  };
  const played = (names: string[]) => [...new Set(names.map((name) => substituteRune(name, catalog, facts).name))];
  const inDuels = (names: string[]) => {
    const kept = names.filter((name) => !build(name).outside);
    return kept.length > 0 ? kept : names.slice(0, 1);
  };
  const rows = new Map<string, Candidate[][]>();
  const keystones: Array<{ name: string; path: string }> = [];
  for (const path of catalog.paths.map((entry) => entry.name)) {
    const row = (index: number) => played(catalog.runes.filter((entry) => entry.path === path && entry.row === index).map((entry) => entry.name));
    for (const name of row(0)) if (!build(name).outside) keystones.push({ name, path });
    rows.set(path, [1, 2, 3].map((index) => inDuels(row(index)).map((name) => ({ name, parts: build(name).parts }))));
  }
  const shards = catalog.shards.map((slot, index) =>
    slot.options.map((option) => ({ name: option.name, parts: runeParts(items.form, { kind: "shard", slot: index, option }, catalog, RUNE_MODULES, settings, items).parts })),
  );
  const parts = new Map<string, ItemParts>();
  for (const candidates of rows.values()) for (const row of candidates) for (const candidate of row) parts.set(candidate.name, candidate.parts);
  shards.forEach((options, slot) => options.forEach((option) => parts.set(`${slot}:${option.name}`, option.parts)));
  return { keystones, spells: duelSpells(catalogs.spells, SPELL_MODULES, side.spec).filter((name) => name !== FLASH), rows, shards, parts };
}

/** A page's lesser runes and shards as the estimate counts them (its keystone has no hint: fights decide it). */
function pageParts(choices: Choices, page: RunePage | undefined): ItemParts[] {
  if (!page) return [];
  return [...page.primary, ...page.secondary].map((name) => choices.parts.get(name)!).concat(page.shards.map((name, slot) => choices.parts.get(`${slot}:${name}`)!));
}

/** The candidate with the highest value; the first of equals. */
function best<T>(candidates: readonly T[], value: (candidate: T) => number): T {
  if (candidates.length === 0) throw new Error("Nothing to choose from");
  let found: T = candidates[0] as T;
  let most = Number.NEGATIVE_INFINITY;
  for (const candidate of candidates) {
    const v = value(candidate);
    if (v > most + 1e-12) {
      most = v;
      found = candidate;
    }
  }
  return found;
}

/**
 * The rest of a page for a keystone of `path`, by the estimate: the shards slot by slot, the
 * path's rows one by one, then the secondary path's best two runes of two different rows.
 */
function completePage(path: string, choices: Choices, value: (parts: ItemParts[]) => number): Omit<RunePage, "keystone"> {
  const chosen: ItemParts[] = [];
  const shards = choices.shards.map((options) => {
    const pick = best(options, (option) => value([...chosen, option.parts]));
    chosen.push(pick.parts);
    return pick.name;
  });
  const primary = choices.rows.get(path)!.map((row) => {
    const pick = best(row, (candidate) => value([...chosen, candidate.parts]));
    chosen.push(pick.parts);
    return pick.name;
  });
  const pairs: Array<[Candidate, Candidate]> = [];
  for (const [other, rows] of choices.rows) {
    if (other === path) continue;
    for (let i = 0; i < rows.length; i++) for (let j = i + 1; j < rows.length; j++) for (const x of rows[i]!) for (const y of rows[j]!) pairs.push([x, y]);
  }
  const [x, y] = best(pairs, ([a, b]) => value([...chosen, a.parts, b.parts]));
  return { primary, secondary: [x.name, y.name], shards };
}

/** Side `s`'s page for each keystone it can play, against the other side's loadout: the rest of each page completed by the estimate. */
export function keystonePages(sides: readonly [LoadoutSide, LoadoutSide], s: 0 | 1, enemyLoadout: Loadout | undefined, catalogs: LoadoutCatalogs): RunePage[] {
  const choices = [choicesFor(sides[0], catalogs), choicesFor(sides[1], catalogs)] as const;
  const [side, enemy] = [sides[s], sides[s === 0 ? 1 : 0]];
  const enemySide = estimateSide(enemy.estimate, [...enemy.parts, ...pageParts(choices[s === 0 ? 1 : 0], enemyLoadout?.page)], 1);
  const value = (parts: ItemParts[]) => estimateAgainst(side.estimate, [...side.parts, ...parts], enemySide);
  return choices[s].keystones.map((entry) => ({ keystone: entry.name, ...completePage(entry.path, choices[s], value) }));
}

/**
 * A screen of a candidate loadout, from the chooser's side: the all-in scenarios (engaging
 * either way, and a brawl) with one branch each, weighted as runScenarios weighs them, as the
 * build search's route screen plays them (screenScore). Each fight counts its health margin
 * too (the chooser's expected health left, less the enemy's, as shares), so that of loadouts
 * that both win, the one that wins with more to spare comes first: a fight's score alone is
 * mostly a win or a loss, and many candidates tie. One fight each, the chooser moving first on
 * the opening tick, or a fair pair (fairFight).
 */
function screen(mine: LoadoutFighter, theirs: LoadoutFighter, single: boolean): number {
  const fighters = matchupSpecs(mine, theirs);
  const settings = { maxBranches: 1 };
  const play = (distance: number) => (single ? fight({ fighters, distance, modes: ["fight", "fight"], settings: { ...settings, firstMover: 0 } }) : fairFight({ fighters, distance, modes: ["fight", "fight"], settings }));
  const value = (outcome: ReturnType<typeof play>) => fightScore(outcome) + outcome.hp[0] - outcome.hp[1];
  const w = SCENARIO_WEIGHTS;
  const engage = value(play(engageRange(fighters[0], fighters[1], settings)));
  const engaged = value(play(engageRange(fighters[1], fighters[0], settings)));
  return (w.youEngage * engage + w.enemyEngages * engaged + w.brawl * value(play(0))) / (w.youEngage + w.enemyEngages + w.brawl);
}

/** A fighter holding its side's build and `loadout` (items alone without one). */
export function equipLoadout(side: Pick<LoadoutSide, "spec" | "build" | "adaptiveType">, loadout: Loadout | undefined, catalogs: LoadoutCatalogs): LoadoutFighter {
  return equipBuild(side.spec, side.build, catalogs.items, loadout ? { spells: { names: loadout.spells, catalog: catalogs.spells }, runes: { page: loadout.page, catalog: catalogs.runes, adaptiveType: side.adaptiveType } } : {});
}

/** Both sides' loadouts, each answering the other's in turn (the first side answering a side with none). */
export function searchLoadouts(sides: [LoadoutSide, LoadoutSide], catalogs: LoadoutCatalogs, options: LoadoutOptions = {}): SearchedLoadouts {
  const o = { ...DEFAULTS, ...options };
  const started = performance.now();
  const choices = [choicesFor(sides[0], catalogs), choicesFor(sides[1], catalogs)] as const;
  const loadouts: [Loadout | undefined, Loadout | undefined] = [undefined, undefined];
  const ranked: Array<{ keystones: string[]; spells: string[] } | undefined> = [undefined, undefined];
  const screens: SearchedLoadouts["screens"] = [[], []];
  let fights = 0;
  for (let round = 0; round < o.rounds; round++) {
    for (const s of [0, 1] as const) {
      const other = s === 0 ? 1 : 0;
      const [side, enemy] = [sides[s], sides[other]];
      const theirs = equipLoadout(enemy, loadouts[other], catalogs);
      const enemySide = estimateSide(enemy.estimate, [...enemy.parts, ...pageParts(choices[other], loadouts[other]?.page)], 1);
      const value = (parts: ItemParts[]) => estimateAgainst(side.estimate, [...side.parts, ...parts], enemySide);
      const pages = new Map<string, Omit<RunePage, "keystone">>();
      const pageFor = (keystone: string): RunePage => {
        const path = choices[s].keystones.find((entry) => entry.name === keystone)!.path;
        if (!pages.has(path)) pages.set(path, completePage(path, choices[s], value));
        return { keystone, ...pages.get(path)! };
      };
      const candidates = round === 0 ? choices[s].keystones.map((entry) => entry.name) : ranked[s]!.keystones.slice(0, o.keep.keystones);
      const spells = loadouts[s]?.spells ?? [FLASH, o.firstSpell];
      const keystones = candidates.map((keystone) => ({ candidate: keystone, score: screen(equipLoadout(side, { spells, page: pageFor(keystone) }, catalogs), theirs, o.single) }));
      const page = pageFor(best(keystones, (entry) => entry.score).candidate);
      const seconds = round === 0 ? choices[s].spells : ranked[s]!.spells.slice(0, o.keep.spells);
      const spellScreens = seconds.map((spell) => ({ candidate: spell, score: screen(equipLoadout(side, { spells: [FLASH, spell], page }, catalogs), theirs, o.single) }));
      loadouts[s] = { spells: [FLASH, best(spellScreens, (entry) => entry.score).candidate], page };
      fights += keystones.length + spellScreens.length;
      screens[s].push({ keystones, spells: spellScreens });
      const order = (list: LoadoutScreen[]) => [...list].sort((a, b) => b.score - a.score).map((entry) => entry.candidate);
      if (round === 0) ranked[s] = { keystones: order(keystones), spells: order(spellScreens) };
    }
  }
  return { loadouts: [loadouts[0]!, loadouts[1]!], screens, fights, seconds: (performance.now() - started) / 1000 };
}
