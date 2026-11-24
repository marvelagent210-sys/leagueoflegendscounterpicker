/**
 * The loadout search (PLAN.md §13, M8): the summoner spells each side of a matchup plays with its
 * item build (pipeline/items/search.ts), against the other side's.
 *
 * - Every loadout holds Flash, and a second spell, fought for among the others that do something
 *   in a duel (summoners/modules/; Smite and Teleport don't).
 * - A fight for a candidate is a screen against the enemy's loadout: the all-in scenarios with
 *   one branch each, as the build search's route screen plays them, one fight each, with each
 *   fight's health margin. The sides answer each other's spells in turn for two rounds; in the
 *   second, a side fights again only its first round's best spells.
 *
 * The screen's design (all-in scenarios, one fight each, health margins) was checked against
 * every scenario played when it also chose keystones (the rune page work parked on 23 November
 * 2026, in this branch's history): the screen's pick scored 0.07 below the best on average, where
 * a brawl alone was 0.11 to 0.15 below, on small samples with a wide spread. A screen guides the
 * choice; the matchup's result then plays every scenario with the spells chosen.
 *
 * Rune pages are left to the rune work on main (runes/, docs/runes/README.md): a side fights
 * with its spells and items only.
 *
 * The result is the best loadout found within the model, not a guaranteed optimum.
 */
import { SCENARIO_WEIGHTS, engageRange, fightScore } from "../../engine/sim/scenarios";
import { fairFight, fight } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { matchupSpecs } from "../../items/equip";
import { duelSpells } from "../../summoners/equip";
import { SPELL_MODULES } from "../../summoners/modules/index";
import { type LoadoutFighter, equipBuild } from "../itemData";
import type { ItemCatalog } from "../items/records";
import type { SpellCatalog } from "../summoners/records";

/** The spell every loadout holds. */
export const FLASH = "Flash";

/** A side's summoner spells: Flash, then its second spell. */
export interface Loadout {
  spells: string[];
}

/** A side of the matchup as the loadout search sees it. */
export interface LoadoutSide {
  /** The champion's kit, for fights. */
  spec: FighterSpec;
  /** The item build it plays, by name. */
  build: string[];
}

export interface LoadoutCatalogs {
  items: ItemCatalog;
  spells: SpellCatalog;
}

export interface LoadoutOptions {
  /** Rounds in which the sides answer each other. */
  rounds?: number;
  /** Second spells a side fights for again after the first round: its best by the first round's screens. */
  keep?: number;
  /** Screens played as one fight, the chooser moving first on the opening tick, rather than a fair pair (fairFight). */
  single?: boolean;
  /** The second spell a side holds before it has chosen one. */
  firstSpell?: string;
}

const DEFAULTS: Required<LoadoutOptions> = { rounds: 2, keep: 2, single: true, firstSpell: "Ignite" };

export interface LoadoutScreen {
  candidate: string;
  score: number;
}

export interface SearchedLoadouts {
  loadouts: [Loadout, Loadout];
  /** Each side's screens of its second spells, round by round, with their scores. */
  screens: [LoadoutScreen[][], LoadoutScreen[][]];
  /** Screens fought, both sides. */
  fights: number;
  seconds: number;
}

/** The candidate with the highest score; the first of equals. */
function best(candidates: readonly LoadoutScreen[]): LoadoutScreen {
  if (candidates.length === 0) throw new Error("Nothing to choose from");
  return candidates.reduce((found, candidate) => (candidate.score > found.score + 1e-12 ? candidate : found));
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

/** A fighter holding its side's build and `loadout`'s spells (items alone without one). */
export function equipLoadout(side: LoadoutSide, loadout: Loadout | undefined, catalogs: LoadoutCatalogs): LoadoutFighter {
  return equipBuild(side.spec, side.build, catalogs.items, loadout ? { spells: { names: loadout.spells, catalog: catalogs.spells } } : {});
}

/** Both sides' loadouts, each answering the other's in turn (the first side answering a side with none). */
export function searchLoadouts(sides: [LoadoutSide, LoadoutSide], catalogs: LoadoutCatalogs, options: LoadoutOptions = {}): SearchedLoadouts {
  const o = { ...DEFAULTS, ...options };
  const started = performance.now();
  const choices = sides.map((side) => duelSpells(catalogs.spells, SPELL_MODULES, side.spec).filter((name) => name !== FLASH));
  const loadouts: [Loadout | undefined, Loadout | undefined] = [undefined, undefined];
  const ranked: Array<string[] | undefined> = [undefined, undefined];
  const screens: SearchedLoadouts["screens"] = [[], []];
  let fights = 0;
  for (let round = 0; round < o.rounds; round++) {
    for (const s of [0, 1] as const) {
      const other = s === 0 ? 1 : 0;
      const theirs = equipLoadout(sides[other], loadouts[other], catalogs);
      const candidates = round === 0 ? choices[s]! : ranked[s]!.slice(0, o.keep);
      const scored = candidates.map((spell) => ({ candidate: spell, score: screen(equipLoadout(sides[s], { spells: [FLASH, spell] }, catalogs), theirs, o.single) }));
      loadouts[s] = { spells: [FLASH, best(scored).candidate] };
      fights += scored.length;
      screens[s].push(scored);
      if (round === 0) ranked[s] = [...scored].sort((a, b) => b.score - a.score).map((entry) => entry.candidate);
    }
  }
  return { loadouts: [loadouts[0]!, loadouts[1]!], screens, fights, seconds: (performance.now() - started) / 1000 };
}
