import { budgetDamage } from "../../engine/budget";
import type { ItemModule } from "../equip";
import { inflictGrievous } from "./shared";

export const ChempunkChainsword: ItemModule = {
  item: "Chempunk Chainsword",
  build(item) {
    const seconds = item.effect("Hackshorn").quoted("Dealing physical damage to enemy champions inflicts them with Grievous Wounds for 3 seconds.");
    return {
      hooks: { onDamageDealt: (ctx) => { if (ctx.damageType === "physical") inflictGrievous(ctx.world, ctx.self, ctx.enemy, seconds); } },
      budget: { enemyStats: (self, enemy) => (budgetDamage(self, enemy).physical > 0 ? [{ grievousWounds: true }] : []) },
    };
  },
};
