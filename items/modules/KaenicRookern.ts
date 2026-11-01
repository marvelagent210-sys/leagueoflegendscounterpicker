import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { memo, ownStatus } from "../runtime";
import { itemShield } from "./shared";

export const KaenicRookern: ItemModule = {
  item: "Kaenic Rookern",
  build(item) {
    const words = "After not taking magic damage for 15 seconds, gain a shield that absorbs magic damage equal to 15% of maximum health until destroyed.";
    const bane = item.effect("Magebane");
    const seconds = bane.quoted(words);
    const share = bane.quoted(words, 1) / 100;
    const last = memo(item.name, "lastMagic");
    item.assume("Magebane's shield is up when the fight starts.");
    const grant = (ctx: Parameters<typeof itemShield>[0]) => itemShield(ctx, item.name, share * derive(ctx.self).maxHp, 1e6, false, "magic");
    return {
      hooks: {
        onStart: (ctx) => grant(ctx),
        onDamageTaken(ctx) {
          if (ctx.damageType === "magic") ctx.self.memory[last] = ctx.tick;
        },
        beforeDamageTaken(ctx) {
          if (ctx.damageType === "magic") ctx.self.memory[last] = ctx.tick;
        },
        onTick(ctx) {
          const from = ctx.self.memory[last];
          if (typeof from === "number" && ctx.tick - from >= toTicks(seconds) && !ownStatus(ctx.self, memo(item.name, "shield"))) {
            delete ctx.self.memory[last];
            grant(ctx);
          }
        },
      },
    };
  },
};
