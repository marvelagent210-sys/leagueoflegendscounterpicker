/**
 * What rune effects share: their source key and memory keys, adaptive force and adaptive
 * damage, cooldowns, and stat statuses that follow a condition.
 */
import { applyEffect } from "../engine/sim/combat";
import type { AbilitySpec, BonusStats, BuffStat, Effect, HookContext } from "../engine/sim/spec";
import type { Unit } from "../engine/sim/state";
import { setStat } from "../items/runtime";
import type { RuneFighter } from "./equip";

/** A rune's key, set apart from the kit's abilities, item actives and summoner spells. */
export const runeKey = (rune: string) => `rune:${rune}`;
/** A rune's own memory key. */
export const runeMemo = (rune: string, what: string) => `rune:${rune}:${what}`;

const sources = new Map<string, AbilitySpec>();

/** What a rune's effects are applied as: labeled with its name, keyed apart from the kit's abilities. */
export function runeSource(label: string): AbilitySpec {
  let source = sources.get(label);
  if (!source) {
    source = { key: runeKey(label), name: label, slot: "other", cooldown: 0, castTime: 0, countsAsCast: false, delivery: { kind: "self" } };
    sources.set(label, source);
  }
  return source;
}

/** Applies a rune's effect from the hook's unit to the enemy, or to itself. */
export function applyRune(ctx: Pick<HookContext, "world" | "self" | "enemy">, label: string, effect: Effect, toSelf = false, scale = 1): void {
  applyEffect(ctx.world, ctx.self, toSelf ? ctx.self : ctx.enemy, effect, { scale, ability: runeSource(label) });
}

/** Adaptive force as the rune's text gives it ("5.4 bonus attack damage or 9 ability power"): the holder's share of it. */
export function adaptiveBonus(fighter: RuneFighter, ad: number, ap: number): BonusStats {
  return fighter.adaptive === "ad" ? { ad } : { ap };
}

/** The stat adaptive force gives the holder, for statuses. */
export function adaptiveStat(fighter: RuneFighter): BuffStat {
  return fighter.adaptive === "ad" ? "AD" : "AP";
}

/** Adaptive damage's type (Template:Tip data/Adaptive damage): physical with more bonus AD, magic with more AP. */
export function adaptiveType(fighter: RuneFighter): "physical" | "magic" {
  return fighter.adaptive === "ad" ? "physical" : "magic";
}

/** Whether the rune is off cooldown, and putting it on cooldown, in its own memory. */
export function cooldown(rune: string, seconds: number): { ready(unit: Unit, tick: number): boolean; start(unit: Unit, tick: number): void } {
  const key = runeMemo(rune, "ready");
  return {
    ready: (unit, tick) => tick >= Number(unit.memory[key] ?? Number.NEGATIVE_INFINITY),
    start: (unit, tick) => {
      unit.memory[key] = tick + Math.round(seconds * 30);
    },
  };
}

/** Sets a stat status of the rune's to `value` (0 removes it), keyed by the rune and the stat. */
export function runeStat(ctx: Pick<HookContext, "self" | "tick">, rune: string, stat: BuffStat, value: number): void {
  setStat(ctx.self, runeMemo(rune, stat), stat, value, ctx.tick);
}
