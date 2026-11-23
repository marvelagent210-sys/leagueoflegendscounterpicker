/** Declared Legend history, life steal and the one-time full-stack health award. */
import type { HookContext, KitHooks } from "../engine/sim/spec";
import { grantPermanentBonusHealth } from "../engine/sim/healthGain";
import type { CombatRuneRules } from "./effectRules";

const POINTS = "rune:legend-bloodline:points";
const INITIALIZED = "rune:legend-bloodline:initialized";
const LIFE_STEAL = "rune-effects:lifeSteal:9103";
const HEALTH = "rune-effects:health:9103";
const LABEL = "Legend: Bloodline";

export interface LegendBloodlineBuild {
  beforeStart: NonNullable<KitHooks["onStart"]>;
  hooks: KitHooks;
  assumptions: string[];
}

/** Every world owns its history and award; caller-owned rules are snapshotted. */
export function buildLegendBloodline(
  rules: Pick<CombatRuneRules, "legendBloodline">,
  declaredPoints: number,
): LegendBloodlineBuild {
  const source = rules?.legendBloodline;
  if (!source || typeof source !== "object") throw new Error("Legend: Bloodline requires reviewed numeric rules");
  const { baseLifeSteal, lifeStealPerStack, pointsPerStack, maxStacks, championKillPoints, bonusHealth } = source;
  if (typeof baseLifeSteal !== "number" || !Number.isFinite(baseLifeSteal) || baseLifeSteal < 0
    || typeof lifeStealPerStack !== "number" || !Number.isFinite(lifeStealPerStack) || lifeStealPerStack <= 0
    || typeof bonusHealth !== "number" || !Number.isFinite(bonusHealth) || bonusHealth <= 0
    || ![pointsPerStack, maxStacks, championKillPoints].every(value => Number.isSafeInteger(value) && value > 0)) {
    throw new Error("Legend: Bloodline requires finite nonnegative base life steal, positive per-stack life steal and health, and positive safe-integer point rules");
  }
  const cap = pointsPerStack * maxStacks;
  if (!Number.isSafeInteger(cap) || !Number.isFinite(baseLifeSteal + maxStacks * lifeStealPerStack)) {
    throw new Error("Legend: Bloodline point cap and maximum life steal must be finite and safe");
  }
  if (!Number.isSafeInteger(declaredPoints) || declaredPoints < 0) {
    throw new Error("Legend: Bloodline requires explicit nonnegative safe-integer starting points");
  }
  const startingPoints = Math.min(cap, declaredPoints);
  const isBody = (ctx: HookContext) => ctx.self.petId === undefined && ctx.world.units[ctx.self.side] === ctx.self;
  const stacks = (points: number) => Math.min(maxStacks, Math.floor(points / pointsPerStack));
  const currentPoints = (ctx: HookContext): number => {
    const points = ctx.memory[POINTS];
    if (typeof points !== "number" || !Number.isSafeInteger(points) || points < 0 || points > cap) {
      throw new Error("Legend: Bloodline runtime points must remain within their reviewed cap");
    }
    return points;
  };
  const grant = (ctx: HookContext, points: number): void => {
    const value = baseLifeSteal + lifeStealPerStack * stacks(points);
    const existing = ctx.self.statuses.find(status => status.kind === "stat" && status.key === "lifeSteal"
      && status.source === ctx.self.side && status.memoKey === LIFE_STEAL);
    if (existing) existing.value = value;
    else ctx.self.statuses.push({
      kind: "stat", key: "lifeSteal", source: ctx.self.side,
      startTick: ctx.tick, endTick: Infinity, value,
      ability: LABEL, memoKey: LIFE_STEAL, persistThroughDeath: true,
    });
    if (points === cap) grantPermanentBonusHealth(ctx, bonusHealth, HEALTH, LABEL);
  };
  const initialize = (ctx: HookContext): void => {
    if (!isBody(ctx)) return;
    if (ctx.memory[INITIALIZED] !== true) {
      ctx.memory[POINTS] = startingPoints;
      ctx.memory[INITIALIZED] = true;
    }
    grant(ctx, currentPoints(ctx));
  };
  return {
    beforeStart: initialize,
    hooks: {
      onKill(ctx) {
        if (!isBody(ctx)) return;
        const victim = ctx.victim;
        // Native dispatch has already assigned owner credit and counted each
        // champion body once, including positive-HP retained death windows.
        if (!("side" in victim) || victim.side === ctx.self.side
          || ctx.world.units[victim.side] !== victim || !(victim.hp <= 0 || victim.fallen)) return;
        initialize(ctx);
        const previous = currentPoints(ctx);
        const next = previous + Math.min(championKillPoints, cap - previous);
        if (next === previous) return;
        ctx.memory[POINTS] = next;
        grant(ctx, next);
        if (stacks(next) > stacks(previous)) ctx.log(`${LABEL} reaches ${stacks(next)}/${maxStacks} stacks`);
      },
    },
    assumptions: [
      `Legend: Bloodline starts from the declared ${declaredPoints} points${declaredPoints === startingPoints ? "" : ` (capped to ${startingPoints})`}; level 20 does not imply a starting stack count.`,
      "Legend: Bloodline advances only on actual hostile champion-body kills credited by the simulator, including owned-pet credit. No farm, assists, monster rewards or summon-victim points are invented.",
      "Champion-kill points are applied in the simulator's existing after-kit kill callback phase. The retained sources do not establish the lethal packet's exact life-steal ordering against new stacks or every champion's kill effects.",
      "The full-stack health award is a one-time direct maximum-health gain with champion-specific conversion. Its ordinary current-health gain is not healing; life-steal restoration uses the existing healing and damage-packet eligibility rules.",
      "A dead, fallen, death-defied or resurrecting owner keeps progress and permanent stats without current-health restoration. Exact restoration in those protected windows is unmeasured; this conservative interpretation cannot revive the owner.",
      "Seeded health is installed before kit setup. Existing shields and active reductions are not immediately resnapshotted after an earned health award; later documented recharge or casts read the new stats.",
      "Pet life-steal inheritance and interactions outside the engine's existing eligible-damage contract remain qualified; this effect does not establish a general pet-vamp model.",
    ],
  };
}
