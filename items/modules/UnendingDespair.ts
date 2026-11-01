import { toTicks } from "../../engine/rules/time";
import { budgetMultipliers } from "../../engine/budget";
import type { ItemModule } from "../equip";
import { FIGHT } from "../hints";
import { bonusHealth, memo } from "../runtime";
import { within } from "./aura";
import { applyFrom } from "./shared";

export const UnendingDespair: ItemModule = {
  item: "Unending Despair",
  build(item, fighter) {
    const anguish = item.effect("Anguish");
    const words = "Every 4 seconds after entering combat with champions, sap all enemy champions around you within 650 units to deal magic damage equal to 3% of your bonus health to them and heal yourself equal to 250% of the post-mitigation damage dealt.";
    const every = anguish.quoted(words);
    const radius = anguish.quoted(words, 1);
    const share = anguish.quoted(words, 2) / 100;
    const healShare = anguish.quoted(words, 3) / 100;
    const combat = fighter.combat();
    const pulses = memo(item.name, "pulses");
    const perSecond = Math.floor(FIGHT / every + 1e-9) / FIGHT;
    return {
      budget: {
        damage: (self) => ({ magic: share * bonusHealth(self) * perSecond }),
        healing: (self, enemy) => healShare * share * bonusHealth(self) * perSecond * budgetMultipliers(self, enemy).magic,
      },
      hooks: {
        onTick(ctx) {
          const seconds = combat.seconds(ctx.self, ctx.tick);
          if (seconds === 0) {
            delete ctx.self.memory[pulses];
            return;
          }
          const due = Math.floor((seconds * 30 + 1e-6) / toTicks(every));
          if (due <= Number(ctx.self.memory[pulses] ?? 0)) return;
          ctx.self.memory[pulses] = due;
          if (within(ctx.self, ctx.enemy, radius)) applyFrom(ctx, item.label, { type: "damage", damageType: "magic", amount: { base: 0, ratios: { bonusHP: share } }, label: item.label, lifesteal: healShare });
        },
      },
    };
  },
};
