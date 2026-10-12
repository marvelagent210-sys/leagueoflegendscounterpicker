/**
 * Port of the wiki's Module:Ability progression, which expands the {{ap}} (values per
 * ability rank), {{pp}} and {{pplevel}} (values per level or per another variable)
 * templates. Values are kept exact (to 15 significant digits, which drops floating-point noise
 * such as 244.99999999999997); the wiki rounds them for display only.
 *
 * Item syntax (items are "/"-separated args for ap, ";"-separated for pp):
 *   12            a value (any {{#expr:}} expression)
 *   20 to 120     linear values (5 ranks for ap; fills up to level 18 for pp)
 *   3 to 8 6      ap: 6 ranks from 3 to 8
 *   a to b for n  pp: n values from a to b
 *   a to b by s   pp: from a to b in steps of s
 *   f(x) for n    pp: formula in x for x = 1..n ("then" = the previous value)
 */
import { evaluateExpr, tryExpr } from "./expr";

export type ProgressionValue = number | string;

/** A computed value without floating-point noise. */
function clean(value: number): number {
  return Number.isFinite(value) ? Number(value.toPrecision(15)) : value;
}

/** Wiki levels shown by default; {{pp}} linear fills stop here. */
const DEFAULT_SIZE = 18;

/** Lua's `pcall(expr, s .. "*2")`: s is a complete expression on its own. */
function isExpr(source: string): boolean {
  return source.trim() !== "" && !source.includes("..") && tryExpr(`${source}*2`) !== undefined;
}

function expr(source: string): number {
  if (source.includes("..")) throw new Error("not calculable");
  return clean(evaluateExpr(source));
}

/** Replaces each standalone x (not next to a digit or dot) with 1, as the module's validity check does. */
function substituteStandaloneX(formula: string): string {
  return formula.replace(/([.\d]?)x([.\d]?)/g, (match, before: string, after: string) =>
    before === "" && after === "" ? "1" : match,
  );
}

function withX(formula: string, x: number): string {
  return formula.replaceAll("x", String(x));
}

/**
 * Rewrites "a to b" inside a formula as "(a)+((b)-(a))/(times-1)*(x-1)". Mirrors the
 * module's string_to_formula, including its parenthesis balancing.
 */
export function stringToFormula(input: string): string {
  let value = input.replaceAll(" ", "");
  while (value.includes("to")) {
    const toIndex = value.indexOf("to");
    const before = value.slice(0, toIndex).split("(");
    let j = before.length;
    let closed = 0;
    while (j >= 2) {
      closed += ((before[j - 1] ?? "").match(/\)/g) ?? []).length;
      if (before.length - j >= closed) break;
      j--;
    }
    const start = before.slice(j - 1).join("(");
    if (!isExpr(start)) return input;

    const after = value.slice(toIndex + 2).split(")");
    j = 1;
    let opened = 0;
    while (j < after.length) {
      opened += ((after[j - 1] ?? "").match(/\(/g) ?? []).length;
      if (j > opened) break;
      j++;
    }
    const finish = after.slice(0, j).join(")");
    let postFinish: string | undefined;
    if (finish.includes("to")) {
      postFinish = stringToFormula(finish);
      if (postFinish === finish) return input;
    } else if (!isExpr(finish)) {
      return input;
    }
    value = value.replace(
      `${start}to${finish}`,
      `(${start})+((${postFinish ?? finish})-(${start}))/(times-1)*(x-1)`,
    );
  }
  return value;
}

export interface RankProgression {
  values: ProgressionValue[];
  key: string;
}

/** {{ap|...}}: one value per ability rank. `skill` "R" makes a bare "a to b" fill 3 ranks. */
export function abilityProgression(items: readonly string[], options: { key?: string; skill?: string } = {}): RankProgression {
  let fill = options.skill === "R" ? 3 : 5;
  const values: ProgressionValue[] = [];
  for (const item of items) {
    if (item === "") break;
    const hasTo = item.includes("to");
    const hasX = item.includes("x");
    if (!(hasTo || hasX) || item.includes("<")) {
      values.push(isExpr(item) ? expr(item) : item);
      continue;
    }
    let start = "";
    let finish = "";
    let times = "";
    if (hasTo) {
      start = item.slice(0, item.indexOf("to"));
      const match = /^.* *to *([^ ]*) *([^ ]*)$/.exec(item);
      finish = match?.[1] ?? "";
      times = match?.[2] ?? "";
    }
    let expanded = false;
    if (!hasX && isExpr(start) && isExpr(finish) && (isExpr(times) || times === "")) {
      let count: number | undefined;
      if (times !== "") count = expr(times);
      else if (fill !== 0) {
        count = fill;
        fill = 0;
      }
      if (count !== undefined) {
        const a = expr(start);
        const scale = (expr(finish) - a) / (count - 1);
        for (let x = 1; x <= count; x++) values.push(a + scale * (x - 1));
        expanded = true;
      }
    } else {
      const match = /^(.*[0-9x)]) +([^ ]*)$/.exec(item);
      let formula = match?.[1] ?? item;
      const timesText = match?.[2] ?? "";
      let count: number | undefined;
      if (isExpr(timesText)) count = expr(timesText);
      else if (timesText === "" && fill !== 0) {
        count = fill;
        fill = 0;
      }
      if (count !== undefined && hasTo) formula = stringToFormula(formula).replaceAll("times", String(count));
      if (count !== undefined && isExpr(substituteStandaloneX(formula))) {
        for (let x = 1; x <= count; x++) values.push(expr(withX(formula, x)));
        expanded = true;
      }
    }
    if (!expanded) values.push(item);
  }
  return { values, key: options.key ?? "" };
}

export interface LevelProgression {
  /** The values (the tooltip's bottom row). */
  values: ProgressionValue[];
  /** What each value is indexed by (the top row): levels 1..n unless `byLevel` is false. */
  top: ProgressionValue[];
  /** The top row's variable, e.g. "level" or "bonus attack speed". */
  topLabel: string;
  byLevel: boolean;
  key: string;
}

export interface PassiveProgressionOptions {
  type?: string;
  label1?: string;
  key?: string;
  /** {{pplevel}} passes 41: linear and formula fills continue past level 18 up to this size. */
  tooltipSize?: number;
}

interface FillPlan {
  linear?: { at: number; start: number; finish: number; lastValue: ProgressionValue | "" };
  formula?: { at: number; formula: string };
  start?: number;
  finish?: number;
  useformula?: string;
}

function expandRow(items: readonly string[]): { values: ProgressionValue[]; plan: FillPlan } {
  const values: ProgressionValue[] = [];
  const plan: FillPlan = {};
  let lastValue: ProgressionValue | "" = "";

  for (let i = 0; i < items.length; i++) {
    const item = items[i] as string;
    if (item === "") break;
    const hasTo = item.includes("to");
    const hasX = item.includes("x");
    let valid = true;

    if ((hasTo || hasX) && !item.includes("<")) {
      let start = "";
      let finish = "";
      let times = "";
      const hasBy = item.includes("by");
      const hasFor = item.includes("for");
      if (hasTo) {
        start = item.slice(0, item.indexOf("to"));
        const pattern = hasBy ? /^ *.*? *to *(.*?) *by *(.*?) *$/ : hasFor ? /^ *.*? *to *(.*?) *for *(.*?) *$/ : /^ *.*? *to *(.*?) *$/;
        const match = pattern.exec(item);
        finish = match?.[1] ?? "";
        times = (hasBy || hasFor ? match?.[2] : "") ?? "";
      }

      if (!hasX && isExpr(start) && isExpr(finish) && (isExpr(times) || times === "")) {
        const a = expr(start);
        const b = expr(finish);
        if (times === "") {
          if (plan.linear || plan.formula) valid = false;
          else {
            plan.linear = { at: values.length, start: a, finish: b, lastValue };
            lastValue = b;
          }
        } else {
          if (plan.start === undefined) {
            plan.start = a;
            plan.finish = b;
          }
          let count = expr(times);
          if (hasBy) {
            count = Math.round(Math.abs(b - a) / count + 1);
            if (lastValue === a) count--;
          }
          if (lastValue !== a) {
            values.push(a);
            count--;
          }
          for (let x = 1; x <= count; x++) values.push(clean(a + ((b - a) * x) / count));
          lastValue = b;
        }
      } else {
        let formula = item;
        let timesText = "";
        if (hasFor) {
          const match = /^ *(.*?) *for *(.*?) *$/.exec(item);
          formula = match?.[1] ?? item;
          timesText = match?.[2] ?? "";
        }
        let count: number | undefined;
        if (isExpr(timesText)) count = expr(timesText);
        else if (timesText !== "") valid = false;

        if (valid && lastValue !== "") formula = formula.replace("then", String(lastValue));
        if (valid && hasTo) {
          formula = stringToFormula(formula);
          if (count !== undefined) formula = formula.replaceAll("times", String(count));
        }
        if (valid && isExpr(substituteStandaloneX(formula).replaceAll("times", "2"))) {
          if (count === undefined) {
            if (plan.linear || plan.formula) valid = false;
            else {
              plan.formula = { at: values.length, formula };
              lastValue = "";
            }
          } else {
            plan.useformula ??= formula;
            for (let x = 1; x <= count; x++) {
              lastValue = clean(expr(withX(formula, x)));
              values.push(lastValue);
            }
          }
        } else {
          valid = false;
        }
      }
      if (!valid) {
        lastValue = "";
        values.push(item);
      }
    } else {
      const value = lastValue === "" ? item : item.replace("then", String(lastValue));
      if (isExpr(value)) {
        const number = expr(value);
        lastValue = (items[i + 1] ?? "").includes("to") ? "" : number;
        values.push(number);
      } else {
        lastValue = "";
        values.push(item);
      }
    }
  }
  return { values, plan };
}

function applyFill(row: ProgressionValue[], plan: FillPlan, times: number, extended: number): ProgressionValue[] {
  const fill = plan.linear ?? plan.formula;
  if (!fill) return row;
  const result = row.slice(0, fill.at);
  const tail = row.slice(fill.at);
  if (plan.linear) {
    const { start, finish, lastValue } = plan.linear;
    let count = times;
    if (lastValue !== start) {
      result.push(start);
      count--;
    }
    for (let x = 1; x <= count + extended; x++) result.push(clean(start + ((finish - start) * x) / count));
  } else if (plan.formula) {
    const formula = plan.formula.formula.replaceAll("times", String(times));
    for (let x = 1; x <= times + extended; x++) result.push(clean(expr(withX(formula, x))));
  }
  return [...result, ...tail];
}

/** {{pp|values|top}} and {{pplevel|...}}: values per level (or per another variable). */
export function passiveProgression(
  valuesText: string,
  topText = "",
  options: PassiveProgressionOptions = {},
): LevelProgression {
  const bottom = expandRow(valuesText.split(";"));
  const top = expandRow(topText === "" ? [] : topText.split(";"));
  let bottomFill = Math.max(0, DEFAULT_SIZE - bottom.values.length);
  let topFill = Math.max(0, DEFAULT_SIZE - top.values.length);
  let fillingToDefault = false;
  const bottomFills = Boolean(bottom.plan.linear || bottom.plan.formula);
  const topFills = Boolean(top.plan.linear || top.plan.formula);
  if (bottom.values.length >= top.values.length) {
    if (!bottomFills) topFill = Math.max(0, bottom.values.length - top.values.length);
    else fillingToDefault = true;
  } else if (!topFills) {
    bottomFill = Math.max(0, top.values.length - bottom.values.length);
  } else {
    fillingToDefault = true;
  }
  const extended = options.tooltipSize && fillingToDefault ? options.tooltipSize - DEFAULT_SIZE : 0;
  const values = applyFill(bottom.values, bottom.plan, bottomFill, extended);
  const topValues = applyFill(top.values, top.plan, topFill, extended);
  if (topValues.length > 0 && topValues.length !== values.length) {
    throw new Error(`pp: rows don't match (${values.length} values, ${topValues.length} top entries)`);
  }
  const label = (options.label1 ?? options.type ?? "level").replace(/'''|''/g, "");
  const byLevel = topValues.length === 0;
  return {
    values,
    top: byLevel ? values.map((_, index) => index + 1) : topValues,
    topLabel: byLevel ? "level" : label,
    byLevel,
    key: options.key ?? "",
  };
}
