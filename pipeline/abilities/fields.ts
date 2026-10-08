/** Readers for the simple fields of an ability page: numbers, flags, lists and notes. */
import type { NumericField, NumericValue, Series } from "../../engine/abilities";
import { cleanText, type EvalContext, render, templateName } from "../wikitext/evaluate";
import type { WikiNode } from "../wikitext/parse";
import { displayText, renderMarked } from "./marked";

function trimmed(nodes: WikiNode[]): WikiNode[] {
  return nodes.filter((node) => node.type !== "text" || node.value.trim() !== "");
}

/** Splits a field into its {{dv|a|b}} parts, or returns the whole field as one part. */
function parts(nodes: WikiNode[], ctx: EvalContext): WikiNode[][] {
  const significant = trimmed(nodes);
  const only = significant[0];
  if (significant.length === 1 && only?.type === "template") {
    const name = templateName(only, ctx);
    if (name === "dv" || name === "delimit values") {
      return only.args.filter((arg) => arg.name === undefined).map((arg) => arg.value);
    }
  }
  return [nodes];
}

const NUMBER_LIST = /\d+(?:\.\d+)?(?:\s*\/\s*\d+(?:\.\d+)?)*/;

function plainSeries(text: string): Series | undefined {
  const match = NUMBER_LIST.exec(text);
  if (!match) return undefined;
  const values = match[0].split("/").map((v) => Number(v.trim()));
  return values.length === 1 ? { kind: "constant", value: values[0] as number } : { kind: "rank", values };
}

/** Cooldowns, costs, ranges and the like: values with optional labels from tooltips. */
export function parseNumericField(nodes: WikiNode[], ctx: EvalContext): NumericField | undefined {
  const texts: string[] = [];
  const values: NumericValue[] = [];
  for (const part of parts(nodes, ctx)) {
    const marked = renderMarked(part, ctx);
    const text = displayText(marked);
    if (text === "") continue;
    texts.push(text);
    const label = marked.labels.at(-1);
    if (marked.series.length > 0) {
      for (const series of marked.series) values.push({ series, label });
    } else {
      const series = plainSeries(marked.text);
      if (series) values.push({ series, label });
    }
  }
  if (texts.length === 0) return undefined;
  return { text: texts.join(" • "), values };
}

/** A single flag such as "true", "false" or "special"; undefined when empty. */
export function flagValue(nodes: WikiNode[] | undefined, ctx: EvalContext): string | undefined {
  if (!nodes) return undefined;
  const text = cleanText(render(nodes, ctx)).toLowerCase();
  return text === "" ? undefined : text;
}

/** A list field such as targeting ("Direction • Auto") or affects ("Self, Enemies"). */
export function listValue(nodes: WikiNode[] | undefined, ctx: EvalContext): string[] {
  if (!nodes) return [];
  return cleanText(render(nodes, ctx))
    .split(/\s*(?:•|,|\/|\n)\s*/)
    .map((item) => item.trim())
    .filter((item) => item !== "");
}

/** The notes field as one entry per top-level bullet, sub-bullets folded in. */
export function notesOf(nodes: WikiNode[] | undefined, ctx: EvalContext): string[] {
  if (!nodes) return [];
  const notes: string[] = [];
  for (const line of cleanText(render(nodes, ctx)).split("\n")) {
    const match = /^(\*+)\s*(.*)$/.exec(line);
    if (!match) {
      if (line.trim() !== "") notes.push(line.trim());
      continue;
    }
    const depth = (match[1] ?? "").length;
    const text = (match[2] ?? "").trim();
    if (text === "") continue;
    if (depth === 1 || notes.length === 0) notes.push(text);
    else notes[notes.length - 1] += `\n${"  ".repeat(depth - 1)}- ${text}`;
  }
  return notes;
}

/** "Active", "Recast" etc. from a leading {{sbc|Active:}}. */
export function partLabel(nodes: WikiNode[], ctx: EvalContext): string | undefined {
  const first = trimmed(nodes)[0];
  if (first?.type !== "template" || templateName(first, ctx) !== "sbc") return undefined;
  const label = cleanText(render(first.args[0]?.value ?? [], ctx)).replace(/:\s*$/, "").trim();
  return label === "" ? undefined : label;
}
