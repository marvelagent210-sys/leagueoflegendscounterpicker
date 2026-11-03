import { toTicks } from "../../engine/rules/time";
import { addStatus } from "../../engine/sim/combat";
import type { ItemModule } from "../equip";
import { immobilizes, usesOf } from "../hints";
import { memo, ownStatus } from "../runtime";

export const ImperialMandate: ItemModule = {
  item: "Imperial Mandate",
  build(item) {
    const haste = item.effect("Control").quoted("Abilities with immobilizing effects have their cooldown reduced equivalent to 20 ability haste.");
    const command = item.effect("Command");
    const words = "Immobilizing an enemy champion marks them as Vulnerable for 4 seconds, increasing the damage they take from all sources by 7%.";
    const seconds = command.quoted(words);
    const share = command.quoted(words, 1) / 100;
    command.quote("Subsequent immobilizes against a target extend the duration of the effect.");
    const key = memo(item.name, "vulnerable");
    return {
      haste: [{ slots: [], haste, immobilizing: true }],
      // Vulnerable for its seconds after each immobilizing ability.
      budget: { enemyStats: (self) => [{ state: "damageReduction", value: -share * Math.min(1, usesOf(self, immobilizes) * seconds) }] },
      hooks: {
        onEnemyCCApplied(ctx) {
          if (ctx.source !== ctx.self) return;
          const end = ctx.tick + toTicks(seconds);
          const mark = ownStatus(ctx.enemy, key);
          if (mark) mark.endTick = Math.max(mark.endTick, end);
          else addStatus(ctx.enemy, { kind: "state", key: "damageReduction", source: ctx.self.side, startTick: ctx.tick, endTick: end, value: -share, memoKey: key });
        },
      },
    };
  },
};
