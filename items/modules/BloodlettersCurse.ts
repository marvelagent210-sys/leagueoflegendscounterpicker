import { toTicks } from "../../engine/rules/time";
import { budgetAbilityDamage } from "../../engine/budget";
import type { ItemModule } from "../equip";
import { averageStacks, damagingCasts } from "../hints";
import { memo, setStat, until } from "../runtime";

export const BloodlettersCurse: ItemModule = {
  item: "Bloodletter's Curse",
  build(item, fighter) {
    const decay = item.effect("Vile Decay");
    const words = "Dealing magic damage to an enemy champion with a champion ability applies a stack of Vile Decay to them for 6 seconds, stacking up to 4 times and up to once per basic attack or ability per cast instance every 0.3 seconds.";
    const seconds = decay.quoted(words);
    const maxStacks = decay.quoted(words, 1);
    const every = decay.quoted(words, 2);
    const perStack = decay.quoted("Each stack inflicts 7.5% magic resistance reduction, up to 30% at 4 stacks.") / 100;
    const stacks = memo(item.name, "stacks");
    const expires = memo(item.name, "until");
    return {
      // A stack from each damaging cast when the kit's abilities deal magic damage.
      budget: { enemyStats: (self, enemy) => (budgetAbilityDamage(self, enemy).magic > 0 ? [{ stat: "mrReductionPercent", value: perStack * averageStacks(maxStacks, damagingCasts(self)) }] : []) },
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.damageType !== "magic" || !fighter.isAbilityDamage(ctx)) return;
          const gate = memo(item.name, `next:${ctx.ability ?? "effect"}`);
          if (ctx.tick < until(ctx.self, gate)) return;
          ctx.self.memory[gate] = ctx.tick + toTicks(every);
          const held = ctx.tick <= until(ctx.self, expires) ? Number(ctx.self.memory[stacks] ?? 0) : 0;
          const now = Math.min(maxStacks, held + 1);
          const end = ctx.tick + toTicks(seconds);
          ctx.self.memory[stacks] = now;
          ctx.self.memory[expires] = end;
          setStat(ctx.enemy, memo(item.name, "decay"), "mrReductionPercent", now * perStack, ctx.tick, end, ctx.self.side);
        },
      },
    };
  },
};
