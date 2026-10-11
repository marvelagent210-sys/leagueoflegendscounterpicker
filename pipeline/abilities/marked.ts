/**
 * Renders wikitext to plain text while keeping what the ability parser needs:
 * value templates ({{ap}}, {{pp}}) become placeholders like ⟦0⟧ that point at their
 * numbers, and {{tip}}/{{sti}} keywords are recorded with their position in the text.
 */
import type { Series } from "../../engine/abilities";
import { formatSeries } from "../../engine/abilityText";
import { type EvalContext, progressionOf, render, templateName } from "../wikitext/evaluate";
import type { TemplateNode, WikiNode } from "../wikitext/parse";
import type { LevelProgression, RankProgression } from "../wikitext/progression";

export interface KeywordSpan {
  /** The tip's keyword, lowercase, e.g. "airborne". */
  keyword: string;
  /** The words shown in the text, e.g. "knocked up". */
  wording: string;
  start: number;
  end: number;
}

export interface Marked {
  text: string;
  series: Series[];
  keywords: KeywordSpan[];
  /** Tooltip texts of {{tt}} templates, which often label a value ("Outer radius"). */
  labels: string[];
}

export const PLACEHOLDER = /⟦(\d+)⟧/g;

/** Strips bold/italic quotes and HTML tags; <br> becomes a newline. */
export function cleanInline(text: string): string {
  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<ref\b[^>]*>[\s\S]*?<\/ref>/gi, "")
    .replace(/<\/?[a-z][^>]*>/gi, "")
    .replace(/'{2,}/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function numbersOnly(values: Array<number | string>): number[] | undefined {
  return values.every((v): v is number => typeof v === "number") ? values : undefined;
}

export function seriesFrom(
  progression: { kind: "rank"; result: RankProgression } | { kind: "level"; result: LevelProgression },
): Series | undefined {
  if (progression.kind === "rank") {
    const values = numbersOnly(progression.result.values);
    if (!values || values.length === 0) return undefined;
    return values.length === 1 ? { kind: "constant", value: values[0] as number } : { kind: "rank", values };
  }
  const { values, top, byLevel, topLabel } = progression.result;
  if (byLevel) {
    const numbers = numbersOnly(values);
    if (!numbers || numbers.length === 0) return undefined;
    // Keep levels 1-20 ({{pplevel}} runs to 41 for game modes with higher level caps).
    return numbers.length >= 20
      ? { kind: "level", values: numbers.slice(0, 20), past18: "wiki" }
      : { kind: "level", values: numbers };
  }
  return { kind: "variable", variable: topLabel, points: top, values };
}

const DISPLAY_ARG_TEMPLATES = new Set([
  "as",
  "ability scaling",
  "fd",
  "format decimal",
  "sbc",
  "recurring",
  "tt",
  "texttip",
]);

class MarkedRenderer {
  readonly result: Marked = { text: "", series: [], keywords: [], labels: [] };

  constructor(private readonly ctx: EvalContext) {}

  private positional(node: TemplateNode): WikiNode[][] {
    return node.args.filter((arg) => arg.name === undefined).map((arg) => arg.value);
  }

  private named(node: TemplateNode, name: string): string | undefined {
    const arg = node.args.findLast((a) => a.name === name);
    return arg ? render(arg.value, this.ctx).trim() : undefined;
  }

  walk(nodes: WikiNode[]): void {
    for (const node of nodes) {
      if (node.type === "text") this.result.text += cleanInline(node.value);
      else if (node.type === "template") this.template(node);
      else this.result.text += cleanInline(render([node], this.ctx));
    }
  }

  private template(node: TemplateNode): void {
    const name = templateName(node, this.ctx);
    let progression: ReturnType<typeof progressionOf>;
    try {
      progression = progressionOf(node, this.ctx);
    } catch {
      progression = undefined;
    }
    if (progression) {
      const series = seriesFrom(progression);
      if (series) {
        this.result.text += `⟦${this.result.series.length}⟧`;
        this.result.series.push(series);
        if (progression.result.key) this.result.text += progression.result.key;
      } else {
        this.result.text += cleanInline(render([node], this.ctx));
      }
      return;
    }

    const args = this.positional(node);
    if (name === "tip" || name === "sti" || name === "stil") {
      const keyword = render(args[0] ?? [], this.ctx).trim().toLowerCase().replace(/'{2,}/g, "");
      if (name === "tip" && this.named(node, "icononly") === "true") return;
      const display = args[1] && render(args[1], this.ctx).trim() !== "" ? args[1] : (args[0] ?? []);
      const start = this.result.text.length;
      this.walk(display);
      const end = this.result.text.length;
      this.result.keywords.push({ keyword, wording: this.result.text.slice(start, end).trim(), start, end });
      return;
    }
    if (DISPLAY_ARG_TEMPLATES.has(name)) {
      if ((name === "tt" || name === "texttip") && args[1]) {
        this.result.labels.push(cleanInline(render(args[1], this.ctx)).trim());
      }
      this.walk(args[0] ?? []);
      return;
    }
    if (name === "ft" || name === "fliptext") {
      this.result.text += " ";
      this.walk(args[0] ?? []);
      this.result.text += " ";
      return;
    }
    if (name === "dv" || name === "delimit values") {
      args.forEach((arg, index) => {
        if (index > 0) this.result.text += " • ";
        this.walk(arg);
      });
      return;
    }
    this.result.text += cleanInline(render([node], this.ctx));
  }
}

export function renderMarked(nodes: WikiNode[], ctx: EvalContext): Marked {
  const renderer = new MarkedRenderer(ctx);
  renderer.walk(nodes);
  return renderer.result;
}

/** The marked text with placeholders replaced by the wiki's display of each series. */
export function displayText(marked: Pick<Marked, "text" | "series">): string {
  return marked.text
    .replace(PLACEHOLDER, (_, index: string) => formatSeries(marked.series[Number(index)]))
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
}
