import { addStatus } from "../../engine/sim/combat";
import type { ItemModule } from "../equip";
import { memo, ownStatus } from "../runtime";
import { within } from "./aura";

export const AbyssalMask: ItemModule = {
  item: "Abyssal Mask",
  build(item) {
    const words = "Enemy champions within 700 units of you become cursed, causing them to receive 12% increased magic damage post-mitigation from all sources.";
    const unmake = item.effect("Unmake");
    const radius = unmake.quoted(words);
    const share = unmake.quoted(words, 1) / 100;
    const key = memo(item.name, "curse");
    return {
      budget: { enemyStats: () => [{ state: "magicReduction", value: -share }] },
      hooks: {
        onTick(ctx) {
          const cursed = ownStatus(ctx.enemy, key);
          const near = within(ctx.self, ctx.enemy, radius);
          if (near && !cursed) addStatus(ctx.enemy, { kind: "state", key: "magicReduction", source: ctx.self.side, startTick: ctx.tick, endTick: Number.POSITIVE_INFINITY, value: -share, memoKey: key });
          else if (!near && cursed) ctx.enemy.statuses = ctx.enemy.statuses.filter((status) => status !== cursed);
        },
      },
    };
  },
};
