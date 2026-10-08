/**
 * Renders parsed wikitext to text, expanding the templates and parser functions the
 * ability data pages use. Value templates ({{ap}}, {{pp}}, {{pplevel}}) render the way
 * the wiki displays them; pipeline/abilities reads their numbers through `progressionOf`.
 */
import { ExprError, evaluateExpr, formatNumber } from "./expr";
import type { TemplateNode, WikiArg, WikiNode } from "./parse";
import {
  type LevelProgression,
  type ProgressionValue,
  type RankProgression,
  abilityProgression,
  passiveProgression,
} from "./progression";

export interface EvalContext {
  /** Page variables set by {{#vardefine}}. */
  vars: Map<string, string>;
  /** {{ccd|Champion|field}}: the wiki's champion data lookup. */
  championData: (champion: string, field: string) => string | undefined;
  /** Ability slot of the page, which {{ap}} uses for its default rank count. */
  skill: string | undefined;
  /** Templates rendered without a dedicated handler, with how often. */
  unknown: Map<string, number>;
  /** {{Data Champion/Ability|pst2|field}}: a field of another data page, rendered. */
  pageField?: (title: string, field: string) => string | undefined;
}

export function createContext(
  championData: EvalContext["championData"],
  skill?: string,
): EvalContext {
  return { vars: new Map(), championData, skill, unknown: new Map() };
}

const ERROR_PREFIX = '<strong class="error">';

/** Note templates that expand to fixed sentences on the wiki. */
const NOTE_TEMPLATES: Record<string, string> = {
  "always quickcast": "* This ability always employs quick cast.",
  "effect at cast time start": "* This ability will cast from wherever the caster is at the start of the cast time.",
  "effect at cast time end": "* This ability will cast from wherever the caster is at the end of the cast time.",
  "unit-targeted cancel conditions":
    "* If the target becomes untargetable, dies, or is too far away or no longer in sight during the cast time, " +
    "this ability will cancel but does not go on cooldown nor pay its cost (if applicable).",
};

/** Templates that only add icons, audio, styling or editor notes. */
const SILENT_TEMPLATES = new Set([
  "bug",
  "note",
  "supnote",
  "anchor",
  "ccib",
  "column",
  "todo",
  "cid",
  "item stat table",
  "zombie state info",
  "chime list",
  "zoe spell thief list",
  "pending for test",
  "sm2",
  "safesubst:unexpected",
  "infobox damage",
  "ct",
  "channel type",
  "clr",
  "clear",
  "tocright",
  "-",
  "outdated",
  "update",
  "citation needed",
  "cn",
  "verify",
  "sic",
]);

const SYMBOL_TEMPLATES: Record<string, string> = {
  times: " × ",
  minus: "−",
  degree: "°",
  "divided by": " ÷ ",
  degrees: "°",
  lmb: "left-click",
  rmb: "right-click",
  plus: " + ",
  "!": "|",
  "=": "=",
};

function argText(args: WikiArg[], ctx: EvalContext, index: number): string | undefined {
  const positional = args.filter((arg) => arg.name === undefined);
  const arg = positional[index];
  return arg ? render(arg.value, ctx).trim() : undefined;
}

function namedText(args: WikiArg[], ctx: EvalContext, name: string): string | undefined {
  const arg = args.findLast((a) => a.name === name);
  return arg ? render(arg.value, ctx).trim() : undefined;
}

function firstNonEmpty(...values: Array<string | undefined>): string {
  return values.find((value) => value !== undefined && value !== "") ?? "";
}

function formatValue(value: ProgressionValue): string {
  return typeof value === "number" ? formatNumber(value) : value;
}

/** Numbers behind a progression template node, or undefined if the node isn't one. */
export function progressionOf(
  node: TemplateNode,
  ctx: EvalContext,
): { kind: "rank"; result: RankProgression } | { kind: "level"; result: LevelProgression } | undefined {
  const name = templateName(node, ctx);
  if (name === "ap" || name === "ability progression") {
    const items = node.args.filter((arg) => arg.name === undefined).map((arg) => render(arg.value, ctx).trim());
    return {
      kind: "rank",
      result: abilityProgression(items, {
        key: namedText(node.args, ctx, "key") ?? "",
        skill: namedText(node.args, ctx, "skill") ?? ctx.skill,
      }),
    };
  }
  if (name === "pp" || name === "passive progression" || name === "pplevel" || name === "passive progression level") {
    const options = {
      type: namedText(node.args, ctx, "type"),
      label1: namedText(node.args, ctx, "label1"),
      key: namedText(node.args, ctx, "key"),
      tooltipSize: name.startsWith("pplevel") || name === "passive progression level" ? 41 : undefined,
    };
    const result = passiveProgression(argText(node.args, ctx, 0) ?? "", argText(node.args, ctx, 1) ?? "", {
      ...(options.type === undefined ? {} : { type: options.type }),
      ...(options.label1 === undefined ? {} : { label1: options.label1 }),
      ...(options.key === undefined ? {} : { key: options.key }),
      ...(options.tooltipSize === undefined ? {} : { tooltipSize: options.tooltipSize }),
    });
    return { kind: "level", result };
  }
  return undefined;
}

export function templateName(node: TemplateNode, ctx: EvalContext): string {
  return render(node.name, ctx).trim().toLowerCase().replace(/_/g, " ");
}

function renderProgression(node: TemplateNode, ctx: EvalContext): string | undefined {
  let progression: ReturnType<typeof progressionOf>;
  try {
    progression = progressionOf(node, ctx);
  } catch (error) {
    return `${ERROR_PREFIX}${error instanceof Error ? error.message : String(error)}</strong>`;
  }
  if (!progression) return undefined;
  if (progression.kind === "rank") {
    const { values, key } = progression.result;
    return values.map(formatValue).join(`${key} / `) + key;
  }
  const { values, key, byLevel, topLabel } = progression.result;
  const shown = byLevel ? values.slice(0, 18) : values;
  const text =
    shown.length > 5
      ? `${formatValue(shown[0] ?? "")}${key} – ${formatValue(shown.at(-1) ?? "")}${key}`
      : shown.map(formatValue).join(`${key} / `) + key;
  const showType = namedText(node.args, ctx, "showtype") !== "false";
  return showType ? `${text} (based on ${topLabel})` : text;
}

function renderParserFunction(name: string, firstArg: string, args: WikiArg[], ctx: EvalContext): string | undefined {
  const rest = (index: number) => argText(args, ctx, index);
  switch (name) {
    case "#var": {
      const value = ctx.vars.get(firstArg.trim());
      return value === undefined || value === "" ? (rest(0) ?? "") : value;
    }
    case "#vardefine":
      ctx.vars.set(firstArg.trim(), rest(0) ?? "");
      return "";
    case "#vardefineecho": {
      const value = rest(0) ?? "";
      ctx.vars.set(firstArg.trim(), value);
      return value;
    }
    case "#expr":
      try {
        return firstArg.trim() === "" ? "" : formatNumber(evaluateExpr(firstArg));
      } catch (error) {
        if (error instanceof ExprError) return `${ERROR_PREFIX}Expression error: ${error.message}</strong>`;
        throw error;
      }
    case "#if":
      return firstArg.trim() !== "" ? (rest(0) ?? "") : (rest(1) ?? "");
    case "#ifeq": {
      const a = firstArg.trim();
      const b = rest(0) ?? "";
      const equal = a === b || (a !== "" && b !== "" && Number(a) === Number(b) && !Number.isNaN(Number(a)));
      return equal ? (rest(1) ?? "") : (rest(2) ?? "");
    }
    case "#iferror":
      return firstArg.includes('class="error"') ? (rest(0) ?? "") : (rest(1) ?? firstArg);
    case "#ifexpr":
      try {
        return evaluateExpr(firstArg) !== 0 ? (rest(0) ?? "") : (rest(1) ?? "");
      } catch {
        return `${ERROR_PREFIX}Expression error</strong>`;
      }
    case "#switch": {
      const value = firstArg.trim();
      let fallthrough = false;
      let fallback: string | undefined;
      for (const arg of args) {
        if (arg.name === undefined) {
          const text = render(arg.value, ctx).trim();
          if (text === value) fallthrough = true;
          fallback = text;
          continue;
        }
        if (arg.name === "#default") fallback = render(arg.value, ctx).trim();
        else if (fallthrough || arg.name === value) return render(arg.value, ctx).trim();
      }
      return fallback ?? "";
    }
    case "ucfirst":
      return firstArg.charAt(0).toUpperCase() + firstArg.slice(1);
    case "lcfirst":
      return firstArg.charAt(0).toLowerCase() + firstArg.slice(1);
    case "lc":
      return firstArg.toLowerCase();
    case "uc":
      return firstArg.toUpperCase();
    default:
      return undefined;
  }
}

function renderTemplate(node: TemplateNode, ctx: EvalContext): string {
  const rawName = render(node.name, ctx).trim();
  const colon = rawName.indexOf(":");
  if (colon > 0 && (rawName.startsWith("#") || /^(?:uc|lc|ucfirst|lcfirst)$/i.test(rawName.slice(0, colon)))) {
    const fn = rawName.slice(0, colon).toLowerCase();
    const result = renderParserFunction(fn, rawName.slice(colon + 1), node.args, ctx);
    if (result !== undefined) return result;
    ctx.unknown.set(fn, (ctx.unknown.get(fn) ?? 0) + 1);
    return "";
  }

  const name = rawName.toLowerCase().replace(/_/g, " ");
  const progression = renderProgression(node, ctx);
  if (progression !== undefined) return progression;

  const arg = (index: number) => argText(node.args, ctx, index);
  const named = (key: string) => namedText(node.args, ctx, key);
  if (name in NOTE_TEMPLATES) return NOTE_TEMPLATES[name] as string;
  if (SILENT_TEMPLATES.has(name) || name.startsWith("tip data/")) return "";
  if (name in SYMBOL_TEMPLATES) return SYMBOL_TEMPLATES[name] as string;

  switch (name) {
    case "as":
    case "ability scaling":
    case "sbc":
    case "fd":
    case "format decimal":
    case "tt":
    case "texttip":
    case "recurring":
    case "g":
    case "gold":
    case "rd":
      return arg(0) ?? "";
    case "tip":
      return named("icononly") === "true" ? "" : firstNonEmpty(arg(1), arg(0));
    case "sti":
    case "stil":
      return firstNonEmpty(arg(1), arg(0));
    case "dv":
    case "delimit values":
      return node.args.filter((a) => a.name === undefined).map((a) => render(a.value, ctx).trim()).join(" • ");
    case "st":
    case "skill tabs": {
      const parts = node.args.filter((a) => a.name === undefined).map((a) => render(a.value, ctx).trim());
      const pairs: string[] = [];
      for (let i = 0; i < parts.length; i += 2) pairs.push(`${parts[i]}: ${parts[i + 1] ?? ""}`);
      return pairs.join("; ");
    }
    // The "s" variants (ais, cis, iis...) are smaller icons, not possessives.
    case "ai":
    case "ais":
    case "cai":
    case "cais":
      return firstNonEmpty(named("text"), arg(2), arg(0));
    case "ci":
    case "cis":
    case "ii":
    case "iis":
    case "item icon":
    case "si":
    case "sis":
    case "spell icon":
    case "ri":
    case "rune icon":
    case "bi":
    case "buff icon":
    case "ui":
    case "uis":
    case "unit icon":
      return firstNonEmpty(named("text"), arg(1), arg(0));
    case "cci":
    case "custom content icon":
      return firstNonEmpty(named("text"), arg(2), arg(1));
    case "nie":
    case "nies":
    case "named item effect":
    case "ris":
    case "ig":
    case "lc":
    case "pft":
      return arg(0) ?? "";
    case "csl":
      return [arg(1), arg(0)].filter(Boolean).join(" ");
    case "color":
      return arg(1) ?? "";
    case "ft":
    case "fliptext":
      // Shown as "「 text 」" on the wiki; the brackets' padding separates it from the words around it.
      return ` ${firstNonEmpty(named("text1"), arg(0))} `;
    case "ccs":
    case "cosmetic critical strike":
      return firstNonEmpty(named("text"), arg(0));
    case "ccd":
    case "current champion data": {
      const champion = firstNonEmpty(named("champname"), arg(0));
      const field = firstNonEmpty(named("datatype"), arg(1));
      return ctx.championData(champion, field) ?? "";
    }
    case "rutngt":
    case "rounded up to next game tick": {
      const value = arg(0) ?? "";
      try {
        return formatNumber(Math.ceil(evaluateExpr(value) / 0.033 - 1e-9) * 0.033);
      } catch {
        return value;
      }
    }
    case "critical damage": {
      // The template's base value, without its Infinity Edge addition (items are out of scope).
      if (named("critScaling") === "true") return "critical strike damage (based on critical strike chance)";
      try {
        const mod = named("mod");
        const base = named("base");
        const value =
          evaluateExpr(arg(0) || "0") * (mod ? evaluateExpr(mod) : 1) - (base ? evaluateExpr(base) : 0);
        return `${formatNumber(value)}${named("flat") === "true" ? "" : "%"}`;
      } catch {
        return "critical strike damage";
      }
    }
    default: {
      if (name.startsWith("data ") && arg(0) === "pst2" && ctx.pageField) {
        const value = ctx.pageField(`Template:${rawName.replace(/_/g, " ")}`, arg(1) ?? "");
        if (value !== undefined) return value;
      }
      ctx.unknown.set(name, (ctx.unknown.get(name) ?? 0) + 1);
      return arg(0) ?? "";
    }
  }
}

export function render(nodes: WikiNode[], ctx: EvalContext): string {
  let out = "";
  for (const node of nodes) {
    switch (node.type) {
      case "text":
        out += node.value;
        break;
      case "template":
        out += renderTemplate(node, ctx);
        break;
      case "param":
        out += node.fallback ? render(node.fallback, ctx) : "";
        break;
      case "link": {
        const target = render(node.target, ctx).trim();
        if (/^(?:file|image|category|media):/i.test(target)) break;
        out += node.text ? render(node.text, ctx) : target.replace(/^:/, "");
        break;
      }
    }
  }
  return out;
}

/** Plain text for display: wiki markup and HTML removed, line breaks kept. */
export function cleanText(rendered: string): string {
  return rendered
    .replace(/<ref\b[^>]*\/>/gi, "")
    .replace(/<ref\b[^>]*>[\s\S]*?<\/ref>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?[a-z][^>]*>/gi, "")
    .replace(/'{2,}/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
