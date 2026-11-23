/** Pure rune increases combined before adapting the engine's aggregate bucket. */
import { derive } from "../engine/sim/derived";
import type { KitHooks } from "../engine/sim/spec";

export type RuneDamageContext = Parameters<NonNullable<KitHooks["modifyDamageTakenRaw"]>>[0];
export type RuneDamageIncrease = (ctx: RuneDamageContext) => number;

export function outgoingRuneHooks(increases: readonly RuneDamageIncrease[]): KitHooks[] {
  if (increases.length === 0) return [];
  const snapshot = [...increases];
  return [{ modifyDamageTakenRaw(ctx) {
    const increase = snapshot.reduce((sum, resolve) => {
      const value = resolve(ctx);
      if (!Number.isFinite(value) || value < 0) throw new Error("Combat rune outgoing damage increases must be finite and nonnegative");
      return sum + value;
    }, 0);
    if (!Number.isFinite(increase)) throw new Error("Combat rune outgoing damage increase must be finite");
    if (increase === 0 || ctx.raw === 0) return ctx.raw;
    const outgoing = 1 + derive(ctx.enemy).damageDealt.reduce((sum, modifier) =>
      sum + (ctx.damageType === "true" ? Math.max(0, modifier) : modifier), 0);
    if (!Number.isFinite(outgoing)) throw new Error("Combat rune outgoing damage multiplier must be finite");
    if (outgoing <= 0) {
      if (outgoing + increase <= 0) return ctx.raw;
      throw new Error("Combat runes cannot amplify a nonpositive existing outgoing damage multiplier");
    }
    return ctx.raw * ((outgoing + increase) / outgoing);
  } }];
}
