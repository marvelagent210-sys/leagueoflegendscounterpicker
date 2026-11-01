import { budgetAbilityDamage } from "../../engine/budget";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";

export const Shadowflame: ItemModule = {
  item: "Shadowflame",
  build(item) {
    const words = "Your magic and true damage will critically strike for 120% damage against enemies below 40% maximum health.";
    const bloom = item.effect("Cinderbloom");
    const multiplier = bloom.quoted(words) / 100;
    const below = bloom.quoted(words, 1) / 100;
    // Below 40% health the rest of the enemy's health takes 120%: as much faster to deal, on average.
    const amplified = 1 / (1 - below + below / multiplier) - 1;
    return {
      // Magic damage as the enemy's magic damage taken; the kit's true damage as more of it.
      budget: { enemyStats: () => [{ state: "magicReduction", value: -amplified }], damage: (self, enemy) => ({ true: amplified * budgetAbilityDamage(self, enemy).true }) },
      // What the enemy takes from the holder's magic and true damage.
      enemyHooks: {
        modifyDamageTakenRaw(ctx) {
          if (ctx.enemy.petId !== undefined || (ctx.damageType !== "magic" && ctx.damageType !== "true")) return ctx.raw;
          return ctx.self.hp < below * derive(ctx.self).maxHp ? ctx.raw * multiplier : ctx.raw;
        },
      },
    };
  },
};
