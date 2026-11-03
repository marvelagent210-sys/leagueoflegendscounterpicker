import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { FIGHT } from "../hints";
import { memo, until } from "../runtime";
import { applyFrom, joinHooks, lifeline } from "./shared";

export const ProtoplasmHarness: ItemModule = {
  item: "Protoplasm Harness",
  build(item) {
    const line = item.effect("Lifeline");
    const health = line.level("you first gain", 0);
    const heal = line.level("you first gain", 1);
    const ratios = line.quoted("(+ 175% bonus armor) (+ 175% bonus magic resistance) over the same duration");
    const seconds = line.quoted("bonus health for 5 seconds");
    const words = "during which you also gain 15% increased size, 10% bonus movement speed, and 25% tenacity.";
    const speed = line.quoted(words, 1) / 100;
    const tenacity = line.quoted(words, 2) / 100;
    const perTick = memo(item.name, "healPerTick");
    const ends = memo(item.name, "healUntil");
    return {
      // Once a fight: its health for the holder to lose, and its heal.
      budget: {
        shielding: () => health / FIGHT,
        healing(self) {
          const d = derive(self);
          return (heal + (ratios / 100) * (d.armor.bonus + d.mr.bonus)) / FIGHT;
        },
      },
      hooks: joinHooks(
        lifeline(item.name, line, (ctx) => {
          applyFrom(ctx, item.label, { type: "stat", stat: "health", amount: { base: health }, duration: seconds }, true);
          applyFrom(ctx, item.label, { type: "stat", stat: "moveSpeedPercent", amount: { base: speed }, duration: seconds }, true);
          applyFrom(ctx, item.label, { type: "state", state: "tenacity", value: tenacity, duration: seconds }, true);
          const d = derive(ctx.self);
          ctx.self.memory[perTick] = (heal + (ratios / 100) * (d.armor.bonus + d.mr.bonus)) / toTicks(seconds);
          ctx.self.memory[ends] = ctx.tick + toTicks(seconds);
        }),
        {
          onTick(ctx) {
            if (ctx.tick >= until(ctx.self, ends)) return;
            applyFrom(ctx, item.label, { type: "heal", amount: { base: Number(ctx.self.memory[perTick] ?? 0) } }, true);
          },
        },
      ),
      unmodeled: [],
    };
  },
};
