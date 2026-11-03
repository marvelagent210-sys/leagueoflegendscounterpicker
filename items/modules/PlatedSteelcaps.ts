import { budgetMultipliers } from "../../engine/budget";
import { averageCritFactor } from "../../engine/rules/defense";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { attacks } from "../hints";

export const PlatedSteelcaps: ItemModule = {
  item: "Plated Steelcaps",
  build(item) {
    const share = item.effect("Plating").quoted("Reduces all incoming basic damage by 10% (excluding from turret attacks).") / 100;
    item.assume("Plating reduces the basic attack's own damage, not its on-hit effects.");
    return {
      hooks: { modifyDamageTakenRaw: (ctx) => (ctx.attack && ctx.ability === undefined ? ctx.raw * (1 - share) : ctx.raw) },
      // The enemy's basic attacks' own damage it keeps from landing.
      budget: {
        shielding(self, enemy) {
          const d = derive(enemy);
          const split = enemy.spec.budget?.attackSplit ?? { physical: 1, magic: 0 };
          const m = budgetMultipliers(enemy, self);
          const attack = d.ad * averageCritFactor(d.critChance, d.critDamage) * attacks(enemy);
          return share * attack * (split.physical * m.physical + split.magic * m.magic + (split.true ?? 0) * m.true);
        },
      },
    };
  },
};
