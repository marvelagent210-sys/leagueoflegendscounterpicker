import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { bonusHealth, memo, until } from "../runtime";

export const WarmogsArmor: ItemModule = {
  item: "Warmog's Armor",
  build(item, fighter) {
    const needs = item.effect("pass").quoted("Grants Warmog's Heart if you have at least 2000 bonus health.");
    const heart = item.effect("Warmog's Heart");
    const words = "Regenerate 1.5% maximum health every 0.5 seconds if damage has not been taken in the last 8 seconds";
    const share = heart.quoted(words) / 100;
    const every = heart.quoted(words, 1);
    const calm = heart.quoted(words, 2);
    const vitality = item.effect("Warmog's Vitality").quoted("Gain bonus health equal to 12% bonus health from items.") / 100;
    const fromItems = fighter.build.reduce((sum, record) => sum + (record.stats.hp ?? 0), 0);
    item.assume("Warmog's Vitality's 12% is of the health the build's items give in the shop.");
    const hit = memo(item.name, "lastHit");
    const next = memo(item.name, "next");
    return {
      bonus: { hp: vitality * fromItems },
      hooks: {
        onDamageTaken(ctx) {
          ctx.self.memory[hit] = ctx.tick;
        },
        onTick(ctx) {
          if (bonusHealth(ctx.self) < needs || ctx.tick - until(ctx.self, hit) < toTicks(calm)) return;
          if (ctx.tick < until(ctx.self, next)) return;
          ctx.self.memory[next] = ctx.tick + toTicks(every);
          ctx.regenerate(share * derive(ctx.self).maxHp);
        },
      },
    };
  },
};
