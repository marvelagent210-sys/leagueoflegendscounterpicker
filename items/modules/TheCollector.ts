import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { applyFrom } from "./shared";

export const TheCollector: ItemModule = {
  item: "The Collector",
  build(item) {
    const below = item.effect("Death").quoted("If you deal post-mitigation damage that would leave a champion below 5% of their maximum health, execute them.") / 100;
    return {
      // Its last 5% of health doesn't need to be dealt: as much more damage to the rest.
      budget: { enemyStats: () => [{ state: "damageReduction", value: -below / (1 - below) }] },
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.enemy.alive && ctx.enemy.hp > 0 && ctx.enemy.hp < below * derive(ctx.enemy).maxHp) applyFrom(ctx, item.label, { type: "execute", threshold: { base: 0, ratios: { targetMaxHP: below } } });
        },
      },
      unmodeled: ["Taxes: gold doesn't matter in a duel."],
    };
  },
};
