/** Second Wind: a timed regeneration buff on the actual champion body. */
import { toSeconds, toTicks } from "../engine/rules/time";
import { derive } from "../engine/sim/derived";
import type { HookContext, KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";

const END = "rune:second-wind:end";
const NEXT = "rune:second-wind:next";

export const SECOND_WIND_ASSUMPTIONS = [
  "Second Wind uses the article's bonus HP5 formula as regeneration based on current missing health at each half-second regeneration tick; the source does not establish whether missing health is snapshotted in the live game.",
  "The first Second Wind regeneration tick occurs half a second after its first trigger. Further damage refreshes its ten-second duration without postponing an already active regeneration clock; the live server's tick phase is not established by the source.",
] as const;

function clear(ctx: HookContext): void {
  delete ctx.memory[END];
  delete ctx.memory[NEXT];
}

export function secondWindHooks(rules: CombatRuneRules): KitHooks {
  const { duration, missingHealthPerSecond, tickInterval, missingHealthModel } = rules.secondWind;
  if (![duration, missingHealthPerSecond, tickInterval].every((value) => Number.isFinite(value) && value > 0)
    || tickInterval > duration || missingHealthModel !== "current-at-regeneration-tick") {
    throw new Error("Second Wind needs valid reviewed regeneration rules and an explicit missing-health model");
  }
  const durationTicks = toTicks(duration), intervalTicks = toTicks(tickInterval);
  const fractionPerPulse = missingHealthPerSecond * toSeconds(intervalTicks);
  if (![durationTicks, intervalTicks].every((ticks) => Number.isSafeInteger(ticks) && ticks >= 1)
    || !Number.isFinite(fractionPerPulse)) {
    throw new Error("Second Wind regeneration must use finite, positive whole game-tick intervals");
  }
  const isBody = (ctx: HookContext) => ctx.self.petId === undefined && ctx.world.units[ctx.self.side] === ctx.self;
  return {
    onDamageTaken(ctx) {
      if (!isBody(ctx) || !ctx.self.alive || ctx.self.fallen || ctx.self.hp <= 0
        || ctx.enemy.side === ctx.self.side || !(ctx.amount > 0)) return;
      const end = ctx.memory[END], next = ctx.memory[NEXT];
      if (typeof end !== "number" || ctx.tick > end || typeof next !== "number") {
        ctx.memory[NEXT] = ctx.tick + intervalTicks;
      }
      ctx.memory[END] = ctx.tick + durationTicks;
    },
    onTick(ctx) {
      if (!isBody(ctx)) return;
      if (!ctx.self.alive || ctx.self.fallen || ctx.self.hp <= 0) { clear(ctx); return; }
      const end = ctx.memory[END];
      let next = ctx.memory[NEXT];
      if (typeof end !== "number" || typeof next !== "number") return;
      if (ctx.tick > end) { clear(ctx); return; }
      while (next <= ctx.tick && next <= end) {
        // Consume the pulse before calling regeneration, keeping repeated hook
        // dispatch and branch-local state from duplicating an entitlement.
        ctx.memory[NEXT] = next + intervalTicks;
        const missing = Math.max(0, derive(ctx.self).maxHp - ctx.self.hp);
        if (missing > 0) ctx.regenerate(missing * fractionPerPulse);
        next += intervalTicks;
      }
      if (ctx.tick >= end) clear(ctx);
    },
    onTickWhileDead(ctx) { clear(ctx); },
  };
}
