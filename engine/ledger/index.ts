/**
 * Builds the interaction ledger for a matchup, and the ledger-only counter ranking for an
 * enemy. The ranking is "partial" (PLAN.md §7): it weighs the interactions but doesn't play
 * the fight out; the duel simulator replaces it champion by champion.
 */
import type { Glossary } from "../glossary";
import type { KitProfile } from "../profiles";
import { CHECKS, type LedgerContext } from "./checks";
import type { Ledger, LedgerEntry } from "./types";
import { WEIGHTS, round2 } from "./weights";

export type { Ledger, LedgerEntry } from "./types";
export type { LedgerContext } from "./checks";

/**
 * A side's score: the sum of its entries' impacts, except that one ability countering several
 * abilities counts its best interaction fully and each further one less (WEIGHTS.sameToolDecay).
 */
export function scoreFor(entries: LedgerEntry[]): number {
  const byTool = new Map<string, number[]>();
  for (const e of entries) {
    const key = `${e.by.champion}|${e.by.name}`;
    byTool.set(key, [...(byTool.get(key) ?? []), e.impact]);
  }
  let score = 0;
  for (const impacts of byTool.values()) {
    impacts.sort((a, b) => b - a);
    impacts.forEach((impact, i) => {
      score += impact * WEIGHTS.sameToolDecay ** i;
    });
  }
  return score;
}

export function ledgerContext(glossary: Pick<Glossary, "pages" | "crowdControl">): LedgerContext {
  return { pages: glossary.pages, crowdControl: glossary.crowdControl };
}

/** Every interaction between two kits, in both directions, most important first. */
export function buildLedger(you: KitProfile, enemy: KitProfile, ctx: LedgerContext): Ledger {
  const entries: LedgerEntry[] = [];
  for (const check of CHECKS) {
    entries.push(...check(you, enemy, ctx));
    if (you.champion !== enemy.champion) entries.push(...check(enemy, you, ctx));
  }
  // Variants of one ability (Kayn's forms, Hwei's spells) can produce the same interaction twice.
  const unique = new Map<string, LedgerEntry>();
  for (const e of entries) {
    const key = `${e.check}|${e.favors}|${e.by.name}|${e.against.name}`;
    const kept = unique.get(key);
    if (!kept || e.impact > kept.impact) unique.set(key, e);
  }
  entries.length = 0;
  entries.push(...unique.values());
  entries.sort((a, b) => b.impact - a.impact || a.check.localeCompare(b.check));
  const total = (champion: string) => round2(scoreFor(entries.filter((e) => e.favors === champion)));
  const yours = total(you.champion);
  const theirs = you.champion === enemy.champion ? yours : total(enemy.champion);
  return {
    you: you.champion,
    enemy: enemy.champion,
    entries,
    score: { you: yours, enemy: theirs, net: round2(yours - theirs) },
    confidence: "partial",
  };
}

export interface CounterRanking {
  enemy: string;
  confidence: "partial";
  /** Every candidate, best counter first. */
  ranking: Array<{
    champion: string;
    net: number;
    you: number;
    enemy: number;
    /** The strongest interactions in the candidate's favor. */
    reasons: LedgerEntry[];
    /** The strongest interactions against the candidate. */
    risks: LedgerEntry[];
    /** Entries in the candidate's favor that are hard counters (isHardCounter). */
    hardCounters: LedgerEntry[];
  }>;
}

/**
 * Hard counters: interactions that shut down part of a kit every time it is used (basic
 * attacks, dashes, projectiles, range), not single answers to one spell such as dodging an
 * ultimate, and that are strong enough.
 */
export const HARD_COUNTER = {
  checks: new Set<string>([
    "projectile block",
    "attack dodge",
    "attack block",
    "blind",
    "disarm",
    "attack speed slow",
    "attack reflect",
    "dash stop",
    "grounding",
    "range",
  ]),
  minImpact: 0.4,
  /** Range leads are common between ranged and melee champions, so they need more. */
  minRangeImpact: 0.5,
};

export function isHardCounter(entry: LedgerEntry): boolean {
  if (!HARD_COUNTER.checks.has(entry.check)) return false;
  return entry.impact >= (entry.check === "range" ? HARD_COUNTER.minRangeImpact : HARD_COUNTER.minImpact);
}

export function rankCounters(enemy: KitProfile, candidates: KitProfile[], ctx: LedgerContext): CounterRanking {
  const ranking = candidates
    .filter((candidate) => candidate.champion !== enemy.champion)
    .map((candidate) => {
      const ledger = buildLedger(candidate, enemy, ctx);
      const favoring = ledger.entries.filter((e) => e.favors === candidate.champion);
      const against = ledger.entries.filter((e) => e.favors === enemy.champion);
      return {
        champion: candidate.champion,
        net: ledger.score.net,
        you: ledger.score.you,
        enemy: ledger.score.enemy,
        reasons: favoring.slice(0, 3),
        risks: against.slice(0, 3),
        hardCounters: favoring.filter(isHardCounter),
      };
    })
    .sort((a, b) => b.net - a.net || b.you - a.you || a.champion.localeCompare(b.champion));
  return { enemy: enemy.champion, confidence: "partial", ranking };
}
