/** Small helpers shared by champion kits. */
import { derive } from "../../engine/sim/derived";
import type { Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";

/** Effects that last the whole fight. */
export const FOREVER = Number.POSITIVE_INFINITY;

/** A formula times a factor. */
export function scaled(formula: Formula, factor: number): Formula {
  return {
    base: formula.base * factor,
    ...(formula.ratios ? { ratios: Object.fromEntries(Object.entries(formula.ratios).map(([k, v]) => [k, (v ?? 0) * factor])) } : {}),
    ...(formula.products ? { products: formula.products.map((p) => ({ ...p, ratio: p.ratio * factor })) } : {}),
  };
}

export function flat(base: number): Formula {
  return { base };
}

/** A permanent innate stat. */
export function innateStat(stat: Extract<Effect, { type: "stat" }>["stat"], amount: number): Effect {
  return { type: "stat", stat, amount: { base: amount }, duration: FOREVER };
}

export function maxHp(unit: Unit): number {
  return derive(unit).maxHp;
}

/** Share of maximum health missing, 0 to 1. */
export function missingShare(unit: Unit): number {
  const max = maxHp(unit);
  return max > 0 ? Math.max(0, Math.min(1, 1 - unit.hp / max)) : 0;
}

/** Ticks for seconds, rounded up to the next game tick. */
export function ticks(seconds: number): number {
  return seconds <= 0 ? 0 : Math.ceil(seconds * 30 - 1e-9);
}

/** A counter in kit memory that resets once `seconds` pass without it being raised. */
export function bump(ctx: HookContext, key: string, max: number, seconds: number): number {
  const until = Number(ctx.memory[`${key}Until`] ?? -1);
  const current = ctx.tick < until ? Number(ctx.memory[key] ?? 0) : 0;
  const next = Math.min(max, current + 1);
  ctx.memory[key] = next;
  ctx.memory[`${key}Until`] = ctx.tick + ticks(seconds);
  return next;
}

export function counter(ctx: HookContext, key: string): number {
  return ctx.tick < Number(ctx.memory[`${key}Until`] ?? -1) ? Number(ctx.memory[key] ?? 0) : 0;
}

/** Whether the unit has a status from its own ability `key`. */
export function hasOwn(unit: Unit, kind: string, key: string): boolean {
  return unit.statuses.some((s) => s.kind === kind && s.key === key && s.source === unit.side);
}
