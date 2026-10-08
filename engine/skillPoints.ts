/** Skill points and ability ranks, including Udyr's points past level 18. */
import type { AbilitySlot, Champion } from "./types";

const SLOTS: readonly AbilitySlot[] = ["Q", "W", "E", "R"];

/** Levelling grants a skill point per level, but only up to 18 for every champion except Udyr. */
export const STANDARD_SKILL_POINT_CAP = 18;

/** Triple Tonic grants an Elixir of Skill at this level; it adds a point only if drunk before 18. */
export const ELIXIR_OF_SKILL_LEVEL = 9;

/** Champions whose skill points keep coming at levels 19 and 20. */
export const UNCAPPED_SKILL_POINTS: ReadonlySet<string> = new Set(["Udyr"]);

/**
 * Ranks a champion gets without spending skill points: abilities learned at the start
 * of the game. Aphelios's ultimate ranks up on its own; his points buy bonus stats.
 */
export const FREE_RANKS: Readonly<Record<string, Partial<Record<AbilitySlot, number>>>> = {
  Aphelios: { R: 3 },
  Elise: { R: 1 },
  Jayce: { R: 1 },
  Karma: { R: 1 },
  Nidalee: { R: 1 },
  Yuumi: { W: 1 },
};

export interface SkillPointOptions {
  /** The champion takes the Triple Tonic rune (its Elixir of Skill is drunk at level 9). */
  tripleTonic?: boolean;
}

export type Ranks = Record<AbilitySlot, number>;

/** Skill points needed to rank every ability to its maximum. */
export function pointsToMax(champion: Champion): number {
  const free = FREE_RANKS[champion.id] ?? {};
  return SLOTS.reduce((sum, slot) => sum + champion.maxRanks[slot] - (free[slot] ?? 0), 0);
}

/** Skill points available at `level`. */
export function skillPointsAt(champion: Champion, level: number, options: SkillPointOptions = {}): number {
  const elixir = options.tripleTonic && level >= ELIXIR_OF_SKILL_LEVEL ? 1 : 0;
  if (UNCAPPED_SKILL_POINTS.has(champion.id)) return Math.min(level + elixir, pointsToMax(champion));
  return Math.min(Math.min(level, STANDARD_SKILL_POINT_CAP) + elixir, STANDARD_SKILL_POINT_CAP);
}

/** True when the champion can't rank every ability, so its rank split is a choice. */
export function hasRankChoice(champion: Champion, level: number, options: SkillPointOptions = {}): boolean {
  return skillPointsAt(champion, level, options) < pointsToMax(champion);
}

/** Every way to spend `points` skill points, each slot ranked between `minRank` and its maximum. */
export function rankSplits(champion: Champion, points: number, minRank = 0): Ranks[] {
  const free = FREE_RANKS[champion.id] ?? {};
  const splits: Ranks[] = [];
  const current: number[] = [];
  const spend = (slotIndex: number, remaining: number): void => {
    const slot = SLOTS[slotIndex];
    if (slot === undefined) {
      if (remaining === 0) {
        splits.push(Object.fromEntries(SLOTS.map((s, i) => [s, (current[i] ?? 0) + (free[s] ?? 0)])) as Ranks);
      }
      return;
    }
    const cap = champion.maxRanks[slot] - (free[slot] ?? 0);
    for (let spent = Math.max(0, minRank - (free[slot] ?? 0)); spent <= Math.min(cap, remaining); spent++) {
      current[slotIndex] = spent;
      spend(slotIndex + 1, remaining - spent);
    }
  };
  spend(0, points);
  return splits;
}

/** Ranks with every ability maxed (the case for everyone but Udyr at level 18 and above). */
export function maxedRanks(champion: Champion): Ranks {
  return { ...champion.maxRanks };
}
