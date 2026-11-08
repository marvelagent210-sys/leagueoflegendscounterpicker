/** Declared Legend history and champion-kill progress for Legend: Haste. */
import type { HookContext, KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";

const POINTS = "rune:legend-haste:points";
const INITIALIZED = "rune:legend-haste:initialized";
const BASIC_HASTE = "rune-effects:basicAbilityHaste:9105";
const LABEL = "Legend: Haste";

export interface LegendHasteBuild {
  beforeStart: NonNullable<KitHooks["onStart"]>;
  hooks: KitHooks;
  assumptions: string[];
}

/** Rules and declared history are copied once; mutable progress belongs to each unit. */
export function buildLegendHaste(
  rules: Pick<CombatRuneRules, "legendHaste">,
  declaredPoints: number,
): LegendHasteBuild {
  const source = rules?.legendHaste;
  if (!source || typeof source !== "object") throw new Error("Legend: Haste requires reviewed numeric rules");
  const { baseHaste, hastePerStack, pointsPerStack, maxStacks, championKillPoints } = source;
  if (typeof baseHaste !== "number" || !Number.isFinite(baseHaste) || baseHaste < 0
    || typeof hastePerStack !== "number" || !Number.isFinite(hastePerStack) || hastePerStack <= 0
    || ![pointsPerStack, maxStacks, championKillPoints].every(value => Number.isSafeInteger(value) && value > 0)) {
    throw new Error("Legend: Haste requires finite nonnegative base haste, positive per-stack haste and positive safe-integer point rules");
  }
  const cap = pointsPerStack * maxStacks;
  if (!Number.isSafeInteger(cap) || !Number.isFinite(baseHaste + maxStacks * hastePerStack)) {
    throw new Error("Legend: Haste point cap and maximum basic ability haste must be finite and safe");
  }
  if (!Number.isSafeInteger(declaredPoints) || declaredPoints < 0) {
    throw new Error("Legend: Haste requires explicit nonnegative safe-integer starting points");
  }
  const startingPoints = Math.min(cap, declaredPoints);
  const isBody = (ctx: HookContext) => ctx.self.petId === undefined && ctx.world.units[ctx.self.side] === ctx.self;
  const stacks = (points: number) => Math.min(maxStacks, Math.floor(points / pointsPerStack));
  const currentPoints = (ctx: HookContext): number => {
    const points = ctx.memory[POINTS];
    if (typeof points !== "number" || !Number.isSafeInteger(points) || points < 0 || points > cap) {
      throw new Error("Legend: Haste runtime points must remain within their reviewed cap");
    }
    return points;
  };
  const grant = (ctx: HookContext, points: number): void => {
    const value = baseHaste + hastePerStack * stacks(points);
    const existing = ctx.self.statuses.find(status => status.kind === "stat" && status.key === "basicAbilityHaste"
      && status.source === ctx.self.side && status.memoKey === BASIC_HASTE);
    if (existing) {
      existing.value = value;
      return;
    }
    ctx.self.statuses.push({
      kind: "stat", key: "basicAbilityHaste", source: ctx.self.side,
      startTick: ctx.tick, endTick: Infinity, value,
      ability: LABEL, memoKey: BASIC_HASTE, persistThroughDeath: true,
    });
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
        // Targeting classes alone do not make a summon a champion takedown.
        // Native kill dispatch has already assigned owner credit and deduplicated
        // the victim. Counted fallen deaths may still retain positive health.
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
      `Legend: Haste starts from the declared ${declaredPoints} points${declaredPoints === startingPoints ? "" : ` (capped to ${startingPoints})`}; level 20 does not imply a starting stack count.`,
      "Legend: Haste advances only on actual hostile champion-body kills credited by the simulator, including owned-pet credit. No farm, assists, monster rewards or summon-victim points are invented.",
      "Champion-kill points are applied in the simulator's existing after-kit kill callback phase. The retained sources do not establish a complete live ordering against every champion's kill effects.",
      "The resulting basic ability haste is read when eligible cooldowns are scheduled; gaining a stack does not rescale a cooldown already running.",
    ],
  };
}
