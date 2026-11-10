/** Declared Legend history and champion-kill progress for Legend: Alacrity. */
import type { HookContext, KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";

const POINTS = "rune:legend-alacrity:points";
const INITIALIZED = "rune:legend-alacrity:initialized";
const ATTACK_SPEED = "rune-effects:attackSpeed:9104";
const LABEL = "Legend: Alacrity";

export interface LegendAlacrityBuild {
  beforeStart: NonNullable<KitHooks["onStart"]>;
  hooks: KitHooks;
  assumptions: string[];
}

/** Rules and declared history are copied once; mutable progress belongs to each unit. */
export function buildLegendAlacrity(
  rules: Pick<CombatRuneRules, "legendAlacrity">,
  declaredPoints: number,
): LegendAlacrityBuild {
  const source = rules?.legendAlacrity;
  if (!source || typeof source !== "object") throw new Error("Legend: Alacrity requires reviewed numeric rules");
  const { baseAttackSpeed, attackSpeedPerStack, pointsPerStack, maxStacks, championKillPoints } = source;
  if (![baseAttackSpeed, attackSpeedPerStack].every(value =>
    typeof value === "number" && Number.isFinite(value) && value > 0 && value <= 1)
    || ![pointsPerStack, maxStacks, championKillPoints].every(value => Number.isSafeInteger(value) && value > 0)) {
    throw new Error("Legend: Alacrity requires positive finite fractions and positive safe-integer point rules");
  }
  const cap = pointsPerStack * maxStacks;
  if (!Number.isSafeInteger(cap) || !Number.isFinite(baseAttackSpeed + maxStacks * attackSpeedPerStack)) {
    throw new Error("Legend: Alacrity point cap and maximum attack speed must be finite and safe");
  }
  if (!Number.isSafeInteger(declaredPoints) || declaredPoints < 0) {
    throw new Error("Legend: Alacrity requires explicit nonnegative safe-integer starting points");
  }
  const startingPoints = Math.min(cap, declaredPoints);
  const isBody = (ctx: HookContext) => ctx.self.petId === undefined && ctx.world.units[ctx.self.side] === ctx.self;
  const stacks = (points: number) => Math.min(maxStacks, Math.floor(points / pointsPerStack));
  const currentPoints = (ctx: HookContext): number => {
    const points = ctx.memory[POINTS];
    if (typeof points !== "number" || !Number.isSafeInteger(points) || points < 0 || points > cap) {
      throw new Error("Legend: Alacrity runtime points must remain within their reviewed cap");
    }
    return points;
  };
  const grant = (ctx: HookContext, points: number): void => {
    const value = baseAttackSpeed + attackSpeedPerStack * stacks(points);
    const existing = ctx.self.statuses.find(status => status.kind === "stat" && status.key === "attackSpeed"
      && status.source === ctx.self.side && status.memoKey === ATTACK_SPEED);
    if (existing) {
      existing.value = value;
      return;
    }
    ctx.self.statuses.push({
      kind: "stat", key: "attackSpeed", source: ctx.self.side,
      startTick: ctx.tick, endTick: Infinity, value,
      ability: LABEL, memoKey: ATTACK_SPEED, persistThroughDeath: true,
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
        // A champion-like targeting class does not make a summon a takedown.
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
      `Legend: Alacrity starts from the declared ${declaredPoints} points${declaredPoints === startingPoints ? "" : ` (capped to ${startingPoints})`}; level 20 does not imply a starting stack count.`,
      "Legend: Alacrity advances only on actual hostile champion-body kills credited by the simulator, including owned-pet credit. No farm, assists, monster rewards or summon-victim points are invented.",
      "Champion-kill points are applied in the simulator's existing after-kit kill callback phase. The retained sources do not establish a complete live ordering against every champion's kill effects.",
    ],
  };
}
