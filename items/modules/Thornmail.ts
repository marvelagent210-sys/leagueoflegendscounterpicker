import type { ItemModule } from "../equip";
import { applyFrom, inflictGrievous } from "./shared";

export const Thornmail: ItemModule = {
  item: "Thornmail",
  build(item) {
    const thorns = item.effect("Thorns");
    const words = "When struck by a basic attack on-hit, deal 20 (+ 10% bonus armor) magic damage to the attacker and, if they are a champion, inflict them with Grievous Wounds for 3 seconds.";
    const base = thorns.quoted(words);
    const share = thorns.quoted(words, 1) / 100;
    const seconds = thorns.quoted(words, 2);
    return {
      hooks: {
        onIncomingOnHit(ctx) {
          if (!ctx.attack || ctx.enemy.petId !== undefined) return;
          applyFrom(ctx, item.label, { type: "damage", damageType: "magic", amount: { base, ratios: { bonusArmor: share } }, label: item.label }, false, ctx.scale);
          inflictGrievous(ctx.world, ctx.self, ctx.enemy, seconds);
        },
      },
    };
  },
};
