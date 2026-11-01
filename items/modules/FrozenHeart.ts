import type { ItemModule } from "../equip";
import { memo, setStat } from "../runtime";
import { within } from "./aura";

export const FrozenHeart: ItemModule = {
  item: "Frozen Heart",
  build(item) {
    const words = "Cripples the attack speed of enemy champions within 700 units by 20%.";
    const caress = item.effect("Winter's Caress");
    const radius = caress.quoted(words, 0);
    const share = caress.quoted(words, 1) / 100;
    item.assume("Winter's Caress takes 20% off the enemy's attack speed as a multiplier, added to its other attack speed multipliers; it isn't crowd control.");
    const key = memo(item.name, "cripple");
    return {
      budget: { enemyStats: () => [{ stat: "attackSpeedMultiplier", value: -share }] },
      hooks: {
        onTick: (ctx) => setStat(ctx.enemy, key, "attackSpeedMultiplier", within(ctx.self, ctx.enemy, radius) ? -share : 0, ctx.tick, Number.POSITIVE_INFINITY, ctx.self.side),
      },
    };
  },
};
