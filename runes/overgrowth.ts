/** Declared Overgrowth history for a manual plain-stat duel. */
import { grantPermanentBonusHealth } from "../engine/sim/healthGain";
import type { KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";

const LABEL = "Overgrowth";
const INITIALIZED = "rune:overgrowth:initialized";
const FLAT_HEALTH = "rune:overgrowth:health";
type Rules = CombatRuneRules["overgrowth"];

export function checkedOvergrowthRules(value: unknown): Rules {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${LABEL} requires reviewed rules`);
  const rule = value as Rules;
  if (![rule.unitsPerStack, rule.thresholdUnits, rule.healthPerStack, rule.radius].every(n => Number.isSafeInteger(n) && n > 0)
    || rule.thresholdUnits % rule.unitsPerStack !== 0
    || !Number.isFinite(rule.healthRatio) || rule.healthRatio <= 0 || rule.healthRatio >= 1) {
    throw new Error(`${LABEL} requires positive whole-number stack, threshold and radius rules with a valid health ratio`);
  }
  return { ...rule };
}

export function checkedOvergrowthDeaths(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${LABEL} requires explicit nonnegative safe-integer starting overgrowthDeaths`);
  }
  return value;
}

export function buildOvergrowth(input: Pick<CombatRuneRules, "overgrowth">, startingDeaths: number | undefined): {
  beforeStart: NonNullable<KitHooks["onStart"]>;
  assumptions: string[];
} {
  const { unitsPerStack, healthPerStack, thresholdUnits, healthRatio } = checkedOvergrowthRules(input?.overgrowth);
  const deaths = checkedOvergrowthDeaths(startingDeaths);
  const flatHealth = Math.floor(deaths / unitsPerStack) * healthPerStack;
  if (!Number.isSafeInteger(flatHealth)) throw new Error(`${LABEL} starting bonus health must be a safe integer`);
  return {
    beforeStart(ctx) {
      const unit = ctx.self;
      if (unit.petId !== undefined || unit.spec.unitClass === "clone" || ctx.world.units[unit.side] !== unit
        || ctx.memory[INITIALIZED] === true) return;
      ctx.memory[INITIALIZED] = true;
      if (deaths >= thresholdUnits) unit.healthMultiplier = (unit.healthMultiplier ?? 1) * (1 + healthRatio);
      if (flatHealth > 0) grantPermanentBonusHealth(ctx, flatHealth, FLAT_HEALTH, LABEL);
    },
    assumptions: [
      `${LABEL} uses each side's declared qualifying deaths. Each ${unitsPerStack} deaths grants ${healthPerStack} flat bonus health. At ${thresholdUnits} deaths the rune scales base and bonus health separately by ${Number((100 * healthRatio).toFixed(6))}%.`,
      "The manual duel freezes the death count and applies the resulting stats before kit setup. Permanent health gained during the duel can benefit from an already-active multiplier.",
      "The starting count represents enemy minion or monster deaths within the real match's range and direct-vision rules. Progress is fixed for this manual duel.",
    ],
  };
}
