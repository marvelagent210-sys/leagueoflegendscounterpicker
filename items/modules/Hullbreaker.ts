import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { memo, until } from "../runtime";
import { applyFrom } from "./shared";

export const Hullbreaker: ItemModule = {
  item: "Hullbreaker",
  build(item, fighter) {
    const skipper = item.effect("Skipper");
    const seconds = skipper.quoted("Basic attacks on-hit against any enemy grant a stack for 10 seconds");
    skipper.quote("stacking up to 5 times. At maximum stacks, or 4 stacks, your next basic attack on-hit against a champion");
    const ad = skipper.meleeRanged("consumes all stacks to deal 120% (melee) / 84% (ranged) base AD");
    const health = skipper.meleeRanged("(+ 5% (melee) / 3.5% (ranged) maximum health) bonus physical damage");
    const at = 4;
    item.assume("Skipper: an attack made with 4 stacks or more spends them (\"at maximum stacks, or 4 stacks\"): every fifth attack.");
    const lifeSteal = item.tagged("OnHitAppliesLifeSteal");
    const stacks = memo(item.name, "stacks");
    const expires = memo(item.name, "stacksUntil");
    const pick = (pair: { melee: number; ranged: number }) => (fighter.ranged ? pair.ranged : pair.melee) / 100;
    return {
      hooks: {
        onAttackHit(ctx) {
          if (ctx.blocked) return;
          const held = ctx.tick <= until(ctx.self, expires) ? Number(ctx.self.memory[stacks] ?? 0) : 0;
          if (held < at) {
            ctx.self.memory[stacks] = held + 1;
            ctx.self.memory[expires] = ctx.tick + toTicks(seconds);
            return;
          }
          delete ctx.self.memory[stacks];
          applyFrom(ctx, item.name, { type: "damage", damageType: "physical", amount: { base: 0, ratios: { baseAD: pick(ad), maxHP: pick(health) } }, label: item.name, ...(lifeSteal ? { lifesteal: derive(ctx.self).lifeSteal } : {}) }, false, ctx.scale);
        },
      },
      unmodeled: ["Boarding Party: there are no minions in a duel."],
    };
  },
};
