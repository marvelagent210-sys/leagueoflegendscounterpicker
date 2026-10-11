/**
 * Ability records in words: values at max rank and level 20, mechanics, field labels and wiki
 * links, for kit pages and the web app.
 */
import type { AbilityRecord, Amount, Mechanic, Series } from "./abilities";

export const WIKI_BASE = "https://wiki.leagueoflegends.com/en-us/";

/** A link to the exact wiki revision a value was read from. */
export function wikiUrl(title: string, revid: number): string {
  return `${WIKI_BASE}${encodeURI(title.replace(/ /g, "_"))}?oldid=${revid}`;
}

export const KIND_LABELS: Record<string, string> = { I: "Innate", Q: "Q", W: "W", E: "E", R: "R", A: "Basic attack", other: "Other" };
export const KIND_ORDER = ["I", "Q", "W", "E", "R", "A", "other"];

export function formatNumber(value: number): string {
  return String(Number(value.toPrecision(6)));
}

export function formatSeries(series: Series | undefined): string {
  if (!series) return "?";
  switch (series.kind) {
    case "constant":
      return formatNumber(series.value);
    case "rank":
      return series.values.map(formatNumber).join(" / ");
    case "level": {
      const first = series.values[0] ?? 0;
      const at18 = series.values[Math.min(17, series.values.length - 1)] ?? first;
      return `${formatNumber(first)} – ${formatNumber(at18)} (based on level)`;
    }
    case "variable":
      return `${series.values.map((v) => (typeof v === "number" ? formatNumber(v) : v)).join(" / ")} (based on ${series.variable})`;
  }
}

/** The value at max rank and level 20, with a note when the wiki stops at level 18. */
export function valueAtLevel20(series: Series | undefined, ranks: number): string {
  if (!series) return "–";
  switch (series.kind) {
    case "constant":
      return formatSeries(series);
    case "rank":
      return formatSeries({ kind: "constant", value: series.values[Math.min(ranks, series.values.length) - 1] ?? 0 });
    case "level":
      return series.values.length >= 20
        ? formatSeries({ kind: "constant", value: series.values[19] ?? 0 })
        : `${formatSeries({ kind: "constant", value: series.values.at(-1) ?? 0 })} (level ${series.values.length}; levels 19–20 not on the wiki)`;
    case "variable":
      return `depends on ${series.variable}`;
  }
}

export function amountAtMax(amount: Amount, ranks: number): string {
  const base = amount.base ? `${valueAtLevel20(amount.base, ranks)}${amount.unit === "%" ? "%" : amount.unit ? ` ${amount.unit}` : ""}` : "";
  const of = amount.baseStat ? ` of ${amount.baseStat}` : "";
  const scaling = amount.scaling.map((term) => {
    const modifiers = term.modifiers?.length ? ` [${term.modifiers.map((m) => `${valueAtLevel20(m.ratio, ranks)}% ${m.stat}`).join(", ")}]` : "";
    return ` (+ ${valueAtLevel20(term.ratio, ranks)}% ${term.stat}${modifiers})`;
  });
  return `${base}${of}${scaling.join("")}`.trim() || "–";
}

export function mechanicLine(mechanic: Mechanic, ranks: number): string {
  const details = [
    mechanic.duration ? `${valueAtLevel20(mechanic.duration, ranks)} s` : undefined,
    mechanic.amount ? `${valueAtLevel20(mechanic.amount, ranks)}%` : undefined,
    mechanic.conditional ? "mentioned as a condition" : undefined,
  ].filter(Boolean);
  return `${mechanic.type}${details.length ? ` (${details.join(", ")})` : ""}`;
}

export const FIELD_LABELS: Array<[keyof AbilityRecord["fields"], string]> = [
  ["cooldown", "Cooldown"],
  ["staticCooldown", "Static cooldown"],
  ["recharge", "Recharge"],
  ["cost", "Cost"],
  ["castTime", "Cast time"],
  ["targetRange", "Target range"],
  ["range", "Range"],
  ["attackRange", "Attack range"],
  ["effectRadius", "Effect radius"],
  ["innerRadius", "Inner radius"],
  ["width", "Width"],
  ["speed", "Speed"],
  ["angle", "Angle"],
  ["collisionRadius", "Collision radius"],
  ["tetherRadius", "Tether radius"],
];
