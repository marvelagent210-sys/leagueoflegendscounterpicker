import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { FIGHT, damagingCasts } from "../hints";
import { memo, setStat } from "../runtime";
import { applyFrom, joinHooks } from "./shared";

export const LiandrysTorment: ItemModule = {
  item: "Liandry's Torment",
  build(item, fighter) {
    const torment = item.effect("Torment");
    const words = "Dealing ability damage or pet damage burns enemies, causing them to take 1% of the target's maximum health magic damage every 0.5 seconds over 3 seconds";
    const share = torment.quoted(words) / 100;
    const interval = torment.quoted(words, 1);
    const seconds = torment.quoted(words, 2);
    const suffering = item.effect("Suffering");
    const sufferingWords = "For each second in combat with enemy champions, deal 2% increased damage, stacking up to 3 times for a total of 6%.";
    const perStack = suffering.quoted(sufferingWords) / 100;
    const maxStacks = suffering.quoted(sufferingWords, 1);
    const combat = fighter.combat();
    item.assume("Torment burns on the kit's ability damage, its damage over time included; a new burn replaces the one running. Pets' damage doesn't burn: their hits aren't the holder's.");
    return {
      // The burn while ability damage renews it; Suffering's stacks over the seconds of the fight.
      budget: {
        damage: (self, enemy) => ({ magic: (share / interval) * derive(enemy).maxHp * Math.min(1, damagingCasts(self) * seconds) }),
        stats: () => [{ stat: "damageDealt", value: perStack * Array.from({ length: FIGHT }, (_, second) => Math.min(maxStacks, second)).reduce((a, b) => a + b, 0) / FIGHT }],
      },
      hooks: joinHooks({
        onDamageDealt(ctx) {
          if (!fighter.isAbilityDamage(ctx)) return;
          applyFrom(ctx, item.label, { type: "dot", damageType: "magic", total: { base: 0, ratios: { targetMaxHP: share * (seconds / interval) } }, duration: seconds, interval, label: item.label });
        },
        onTick(ctx) {
          setStat(ctx.self, memo(item.name, "damage"), "damageDealt", Math.min(maxStacks, Math.floor(combat.seconds(ctx.self, ctx.tick))) * perStack, ctx.tick);
        },
      }),
    };
  },
};
