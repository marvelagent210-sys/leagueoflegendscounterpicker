/** Reads leveling values such as "⟦0⟧ (+ ⟦1⟧% bonus AD)" into a base series and scaling terms. */
import type { Amount, ScalingTerm, Series } from "../../engine/abilities";
import { type Marked, displayText } from "./marked";

const NUMBER = String.raw`\d+(?:\.\d+)?`;
const VALUE = String.raw`(⟦\d+⟧|${NUMBER}(?:\s*\/\s*${NUMBER})*)`;
const BASE = new RegExp(String.raw`^\s*${VALUE}\s*(%|seconds?\b|s\b|units?\b)?`);
/** Innermost "(+ value[%] phrase)" group; nested groups are replaced by ⟨n⟩ markers first. */
const SCALING = new RegExp(String.raw`\(\s*([+\-−])\s*${VALUE}\s*(%)?\s*([^()]*?)\s*\)`);
const MODIFIER_MARK = /⟨(\d+)⟩/g;

const OWNER = String.raw`(?:of )?(?:his |her |their |its |the )?`;
const STAT_PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
  [/^ad$/, "AD"],
  [/^(?:of )?(?:his |her |their |its )?bonus ad$/, "bonusAD"],
  [/^ap$/, "AP"],
  [new RegExp(`^${OWNER}bonus health$`), "bonusHealth"],
  [new RegExp(`^${OWNER}maximum health$`), "maxHealth"],
  [new RegExp(`^${OWNER}missing health$`), "missingHealth"],
  [new RegExp(`^${OWNER}current health$`), "currentHealth"],
  [/^of (?:the )?target's maximum health$/, "targetMaxHealth"],
  [/^of (?:the )?target's current health$/, "targetCurrentHealth"],
  [/^of (?:the )?target's missing health$/, "targetMissingHealth"],
  [/^of (?:the )?target's bonus health$/, "targetBonusHealth"],
  [/^of (?:the )?target's (?:total )?armor$/, "targetArmor"],
  [/^of (?:the )?target's (?:total )?magic resist(?:ance)?$/, "targetMR"],
  [new RegExp(`^${OWNER}missing mana$`), "missingMana"],
  [new RegExp(`^${OWNER}bonus armor$`), "bonusArmor"],
  [new RegExp(`^${OWNER}armor$`), "armor"],
  [new RegExp(`^${OWNER}bonus magic resist(?:ance)?$`), "bonusMR"],
  [new RegExp(`^${OWNER}magic resist(?:ance)?$`), "MR"],
  [/^bonus attack speed$/, "bonusAttackSpeed"],
  [/^attack speed$/, "attackSpeed"],
  [/^bonus movement speed$/, "bonusMoveSpeed"],
  [/^movement speed$/, "moveSpeed"],
  [new RegExp(`^${OWNER}maximum mana$`), "maxMana"],
  [new RegExp(`^${OWNER}bonus mana$`), "bonusMana"],
  [/^lethality$/, "lethality"],
  [/^critical strike chance$/, "critChance"],
  [/^bonus attack range$/, "bonusAttackRange"],
  [/^ability haste$/, "abilityHaste"],
];

/** Canonical name for the stat a ratio multiplies. */
export function normalizeStat(phrase: string): string {
  const cleaned = phrase.toLowerCase().replace(/\s+/g, " ").trim();
  const per = /^per (\d+) (.+)$/.exec(cleaned);
  if (per) return `per${per[1]}:${normalizeStat(per[2] ?? "")}`;
  for (const [pattern, stat] of STAT_PATTERNS) if (pattern.test(cleaned)) return stat;
  return `other:${cleaned}`;
}

function seriesOf(token: string, marked: Marked): Series | undefined {
  const placeholder = /^⟦(\d+)⟧$/.exec(token.trim());
  if (placeholder) return marked.series[Number(placeholder[1])];
  const values = token.split("/").map((v) => Number(v.trim()));
  if (values.some((v) => !Number.isFinite(v))) return undefined;
  return values.length === 1 ? { kind: "constant", value: values[0] as number } : { kind: "rank", values };
}

function negate(series: Series): Series {
  switch (series.kind) {
    case "constant":
      return { kind: "constant", value: -series.value };
    case "rank":
    case "level":
      return { ...series, values: series.values.map((v) => -v) };
    case "variable":
      return { ...series, values: series.values.map((v) => (typeof v === "number" ? -v : v)) };
  }
}

export function parseAmount(marked: Marked): Amount {
  const text = marked.text.replace(/\s+/g, " ").trim();
  const terms: ScalingTerm[] = [];
  const nested = new Set<number>();
  let rest = text;
  for (let match = SCALING.exec(rest); match; match = SCALING.exec(rest)) {
    const [whole, sign = "+", value = "", , rawPhrase = ""] = match;
    const ratio = seriesOf(value, marked);
    let replacement = " ";
    if (ratio) {
      const modifiers = [...rawPhrase.matchAll(MODIFIER_MARK)].map((m) => Number(m[1]));
      for (const index of modifiers) nested.add(index);
      const term: ScalingTerm = {
        stat: normalizeStat(rawPhrase.replace(MODIFIER_MARK, " ")),
        ratio: sign === "+" ? ratio : negate(ratio),
        text: displayText({ text: whole.replace(MODIFIER_MARK, (_, i: string) => terms[Number(i)]?.text ?? ""), series: marked.series }),
      };
      if (modifiers.length > 0) term.modifiers = modifiers.map((index) => terms[index] as ScalingTerm);
      replacement = `⟨${terms.length}⟩`;
      terms.push(term);
    }
    rest = rest.slice(0, match.index) + replacement + rest.slice(match.index + whole.length);
    if (!ratio) break;
  }
  rest = rest.replace(MODIFIER_MARK, " ");
  const scaling = terms.filter((_, index) => !nested.has(index));

  const amount: Amount = { text: displayText({ text, series: marked.series }), base: undefined, unit: undefined, scaling, unparsed: "" };
  const baseMatch = BASE.exec(rest);
  if (baseMatch) {
    amount.base = seriesOf(baseMatch[1] ?? "", marked);
    const unitText = baseMatch[2];
    amount.unit = unitText === "%" ? "%" : unitText?.startsWith("unit") ? "units" : unitText ? "s" : undefined;
    rest = rest.slice(baseMatch[0].length);
    const phrase = /^\s*([^()⟦\d]*?)\s*(?=\(|$)/.exec(rest)?.[1] ?? "";
    if (amount.unit === "%" && phrase) {
      // "3% of target's maximum health", "10% of target's armor", "40% of the original damage"
      const stat = normalizeStat(phrase);
      if (!stat.startsWith("other:") || /^of\b/i.test(phrase)) {
        amount.baseStat = stat;
        rest = rest.slice(rest.indexOf(phrase) + phrase.length);
      }
    } else if (!amount.unit && /^[a-z][a-z' ]*$/i.test(phrase)) {
      // Counted things: "8 chunks of ice", "6 soldiers", "1.7 per Soul collected"
      amount.unit = phrase;
      rest = rest.slice(rest.indexOf(phrase) + phrase.length);
    }
  }
  amount.unparsed = displayText({ text: rest, series: marked.series }).replace(/^[\s,;.]+|[\s,;.]+$/g, "");
  return amount;
}
