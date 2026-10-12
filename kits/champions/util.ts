/** Small helpers shared by champion kits. */
import { averageCritFactor } from "../../engine/rules/defense";
import { derive } from "../../engine/sim/derived";
import type { Series } from "../../engine/abilities";
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

/** The formula `share` of the way from `from` to `to` (damage that grows with a charge). */
export function between(from: Formula, to: Formula, share: number): Formula {
  const keys = new Set([...Object.keys(from.ratios ?? {}), ...Object.keys(to.ratios ?? {})]) as Set<keyof NonNullable<Formula["ratios"]>>;
  const ratios = Object.fromEntries([...keys].map((key) => [key, (from.ratios?.[key] ?? 0) + ((to.ratios?.[key] ?? 0) - (from.ratios?.[key] ?? 0)) * share]));
  if (from.products || to.products) throw new Error("between: formulas with products are not supported");
  return { base: from.base + (to.base - from.base) * share, ...(keys.size > 0 ? { ratios } : {}) };
}

/** A value of a series that depends on something else (seconds charged), read at `x`: the last point reached, or interpolated. */
export function seriesAt(series: Series, x: number, interpolate: boolean): number {
  if (series.kind === "constant") return series.value;
  if (series.kind !== "variable") throw new Error(`seriesAt: a ${series.kind} series`);
  const points = series.points.map(Number);
  const values = series.values.map(Number);
  let i = 0;
  while (i + 1 < points.length && (points[i + 1] ?? Number.POSITIVE_INFINITY) <= x) i += 1;
  const at = values[i] ?? 0;
  const next = values[i + 1];
  const [p0, p1] = [points[i] ?? 0, points[i + 1]];
  if (!interpolate || next === undefined || p1 === undefined || x <= p0) return x < p0 ? (values[0] ?? 0) : at;
  return at + ((next - at) * (x - p0)) / (p1 - p0);
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

/**
 * An area of one of the unit's abilities that lands at `x` after `seconds` (an aftershock,
 * a tether): it hits the enemy then if its hitbox is within `radius`, through the ability's
 * usual checks and hooks. The enemy sees it from now on.
 */
export function areaAt(ctx: HookContext, ability: string, x: number, radius: number, seconds: number, onHit: Effect[]): void {
  ctx.world.zones.push({
    id: ctx.world.nextId++,
    owner: ctx.self.side,
    kind: "delayedArea",
    seenTick: ctx.tick,
    x,
    radius,
    startTick: ctx.tick,
    endTick: ctx.tick + ticks(seconds),
    ability,
    onHit,
    connects: true,
    scale: 1,
  });
}

/**
 * A field of one of the unit's abilities at `x` (a cloud of poison left behind): every
 * `interval` seconds for `seconds` it applies `onHit` to the enemy inside, through the
 * ability's usual checks and hooks, and `onOwner` to the unit inside.
 */
export function fieldAt(ctx: HookContext, ability: string, x: number, radius: number, seconds: number, interval: number, onHit: Effect[], onOwner?: Effect[]): void {
  ctx.world.zones.push({
    id: ctx.world.nextId++,
    owner: ctx.self.side,
    kind: "field",
    seenTick: ctx.tick,
    x,
    radius,
    startTick: ctx.tick,
    endTick: ctx.tick + ticks(seconds),
    ability,
    onHit,
    interval: Math.max(1, ticks(interval)),
    nextTick: ctx.tick,
    ...(onOwner ? { onOwner } : {}),
  });
}

/** Average damage of one basic attack before resistances, crits averaged (for budget hints). */
export function attackDamage(unit: Unit): number {
  const d = derive(unit);
  return d.ad * averageCritFactor(d.critChance, d.critDamage);
}

/** Attacks per second gained from `bonus` more bonus attack speed (for budget hints). */
export function extraAttacks(unit: Unit, bonus: number): number {
  return unit.spec.base.attackSpeed.ratio * bonus;
}
