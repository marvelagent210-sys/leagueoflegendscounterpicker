import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { activeKey, follow, memo } from "../runtime";
import { applyFrom, joinHooks } from "./shared";

export const BlackfireTorch: ItemModule = {
  item: "Blackfire Torch",
  build(item, fighter) {
    const blaze = item.effect("Baleful Blaze");
    const words = "causing them to take 10 (+ 1% AP) magic damage every 0.5 seconds over 3 seconds, for a total of 60 (+ 6% AP).";
    const perTick = blaze.quoted(words);
    const apPerTick = blaze.quoted(words, 1) / 100;
    const interval = blaze.quoted(words, 2);
    const seconds = blaze.quoted(words, 3);
    const ticks = seconds / interval;
    const share = item.effect("Blackfire").quoted("For each champion, epic monster, and large monster afflicted with Baleful Blaze's burn, increase your ability power by 4%.") / 100;
    const burnKey = activeKey(item.label);
    item.assume("Baleful Blaze burns on the kit's ability damage, its damage over time included; a new burn replaces the one running.");
    return {
      hooks: joinHooks(
        {
          onDamageDealt(ctx) {
            if (fighter.isAbilityDamage(ctx)) applyFrom(ctx, item.label, { type: "dot", damageType: "magic", total: { base: perTick * ticks, ratios: { AP: apPerTick * ticks } }, duration: seconds, interval, label: item.label });
          },
        },
        // One champion in a duel: 4% more of the holder's other AP while it burns.
        follow(memo(item.name, "AP"), "AP", (self, current, ctx) =>
          ctx.enemy.statuses.some((status) => status.kind === "dot" && status.key === burnKey && status.endTick > ctx.tick) ? share * (derive(self).ap - current) : 0),
      ),
    };
  },
};
