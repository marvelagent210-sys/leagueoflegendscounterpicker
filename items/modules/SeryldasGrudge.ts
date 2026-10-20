import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { refreshSlow } from "./shared";

export const SeryldasGrudge: ItemModule = {
  item: "Serylda's Grudge",
  build(item, fighter) {
    const words = "Dealing ability damage to an enemy that is at or below 50% of their maximum health slows them by 30% for 1 second.";
    const cold = item.effect("Bitter Cold");
    const below = cold.quoted(words) / 100;
    const slow = cold.quoted(words, 1) / 100;
    const seconds = cold.quoted(words, 2);
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (fighter.isAbilityDamage(ctx) && ctx.enemy.hp <= below * derive(ctx.enemy).maxHp) refreshSlow(ctx, item.name, slow, seconds);
        },
      },
    };
  },
};
