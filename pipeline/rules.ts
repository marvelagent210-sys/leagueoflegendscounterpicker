/**
 * Game rules the build reads from the wiki for the engine: the gold value of each stat
 * (wiki: "Module:Gold value/data"), which prices the stat budget (engine/budget.ts).
 */
import { BUDGET_STATS, type StatPrices } from "../engine/budget";
import { parseLuaModule } from "./parse/lua";
import type { WikiPage } from "./sources/wiki";

export const GOLD_VALUE_PAGE = "Module:Gold value/data";

export interface RulesFile {
  /** Gold per point of each stat the budget can buy (per 1% for attack speed and crit). */
  statPrices: StatPrices;
  /** The wiki's own note on when it last checked the values. */
  goldValuesChecked: string | null;
  source: { page: string; revid: number };
}

/** Reads the stat prices from the wiki's gold value table. */
export function parseGoldValues(page: WikiPage): RulesFile {
  const table = parseLuaModule(page.content);
  if (!table || typeof table !== "object" || Array.isArray(table)) throw new Error(`${GOLD_VALUE_PAGE}: expected a table`);
  const prices = {} as StatPrices;
  for (const stat of BUDGET_STATS) {
    const entry = (table as Record<string, unknown>)[stat];
    const value = entry && typeof entry === "object" ? (entry as Record<string, unknown>).val : undefined;
    if (typeof value !== "number" || !(value > 0)) throw new Error(`${GOLD_VALUE_PAGE}: no gold value for "${stat}"`);
    prices[stat] = value;
  }
  const checked = /Last checked:\s*(\S+)/.exec(page.content)?.[1] ?? null;
  return { statPrices: prices, goldValuesChecked: checked, source: { page: page.title, revid: page.revid } };
}
