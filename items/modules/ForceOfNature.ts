import { toTicks } from "../../engine/rules/time";
import { IMMOBILIZING } from "../../engine/rules/crowdControl";
import type { HookContext } from "../../engine/sim/spec";
import type { ItemModule } from "../equip";
import { memo, setStat, until } from "../runtime";

export const ForceOfNature: ItemModule = {
  item: "Force of Nature",
  build(item) {
    const steadfast = item.effect("Steadfast");
    const words = "Taking magic damage from champions generates a stack of Steadfast for 7 seconds, stacking up to 8 times with the duration refreshing on subsequent magic damage from them and whenever dealing damage to them.";
    const seconds = steadfast.quoted(words);
    const maxStacks = steadfast.quoted(words, 1);
    const immobilized = steadfast.quoted("Becoming immobilized by an enemy champion generates 2 stacks and also refreshes the duration.");
    const once = steadfast.quoted("Once per cast instance, each incoming basic attack, ability, or item effect can only generate 1 stack of Steadfast from their damage every 1 second.", 1);
    const bonus = "At maximum stacks, gain 70 bonus magic resistance and 6% bonus movement speed.";
    const mr = steadfast.quoted(bonus);
    const speed = steadfast.quoted(bonus, 1) / 100;
    const stacks = memo(item.name, "stacks");
    const ends = memo(item.name, "until");
    const show = (ctx: HookContext, held: number) => {
      const full = held >= maxStacks;
      setStat(ctx.self, memo(item.name, "MR"), "MR", full ? mr : 0, ctx.tick);
      setStat(ctx.self, memo(item.name, "speed"), "moveSpeedPercent", full ? speed : 0, ctx.tick);
    };
    const held = (ctx: HookContext) => (ctx.tick <= until(ctx.self, ends) ? Number(ctx.self.memory[stacks] ?? 0) : 0);
    const gain = (ctx: HookContext, count: number) => {
      const now = Math.min(maxStacks, held(ctx) + count);
      ctx.self.memory[stacks] = now;
      ctx.self.memory[ends] = ctx.tick + toTicks(seconds);
      show(ctx, now);
    };
    return {
      hooks: {
        onDamageTaken(ctx) {
          if (ctx.damageType !== "magic") return;
          const key = memo(item.name, `from:${ctx.ability ?? (ctx.persistent ? "dot" : "attack")}`);
          if (ctx.tick < until(ctx.self, key)) {
            ctx.self.memory[ends] = ctx.tick + toTicks(seconds);
            return;
          }
          ctx.self.memory[key] = ctx.tick + toTicks(once);
          gain(ctx, 1);
        },
        onCCApplied(ctx) {
          if (IMMOBILIZING.has(ctx.cc) && ctx.source.side !== ctx.self.side) gain(ctx, immobilized);
        },
        onDamageDealt(ctx) {
          if (held(ctx) > 0) ctx.self.memory[ends] = ctx.tick + toTicks(seconds);
        },
        onTick(ctx) {
          if (ctx.self.memory[stacks] !== undefined && ctx.tick > until(ctx.self, ends)) {
            delete ctx.self.memory[stacks];
            show(ctx, 0);
          }
        },
      },
    };
  },
};
