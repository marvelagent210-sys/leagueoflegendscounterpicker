import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";

export const Shadowflame: ItemModule = {
  item: "Shadowflame",
  build(item) {
    const words = "Your magic and true damage will critically strike for 120% damage against enemies below 40% maximum health.";
    const bloom = item.effect("Cinderbloom");
    const multiplier = bloom.quoted(words) / 100;
    const below = bloom.quoted(words, 1) / 100;
    return {
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
