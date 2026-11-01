import type { ItemModule } from "../equip";
import { within } from "./aura";
import { immolate } from "./immolate";
import { applyFrom } from "./shared";

export const HollowRadiance: ItemModule = {
  item: "Hollow Radiance",
  build(item) {
    const burn = immolate(item, "Deal 15 (+ 1% bonus health) magic damage every second");
    // A duel's non-champion units are pets: killing one erupts where it died.
    const desolate = item.effect("Desolate");
    const words = "Killing a non-champion unit causes an eruption around their death location that deals 30 (+ 2% bonus health) magic damage to enemies within 350 units.";
    const base = desolate.quoted(words);
    const share = desolate.quoted(words, 1) / 100;
    const radius = desolate.quoted(words, 2);
    item.assume("Desolate's larger eruption, on a champion takedown, never goes off: the takedown ends the duel.");
    return {
      ...burn,
      hooks: {
        ...burn.hooks,
        onKill(ctx) {
          if (ctx.pet && within(ctx.pet, ctx.enemy, radius)) applyFrom(ctx, item.label, { type: "damage", damageType: "magic", amount: { base, ratios: { bonusHP: share } }, label: item.label });
        },
      },
    };
  },
};
