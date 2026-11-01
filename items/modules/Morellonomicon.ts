import { budgetDamage } from "../../engine/budget";
import type { ItemModule } from "../equip";
import { inflictGrievous } from "./shared";

export const Morellonomicon: ItemModule = {
  item: "Morellonomicon",
  build(item) {
    const seconds = item.effect("Grievous Wounds").quoted("Dealing magic damage to enemy champions inflicts them with Grievous Wounds for 3 seconds.");
    return {
      hooks: { onDamageDealt: (ctx) => { if (ctx.damageType === "magic") inflictGrievous(ctx.world, ctx.self, ctx.enemy, seconds); } },
      budget: { enemyStats: (self, enemy) => (budgetDamage(self, enemy).magic > 0 ? [{ grievousWounds: true }] : []) },
    };
  },
};
