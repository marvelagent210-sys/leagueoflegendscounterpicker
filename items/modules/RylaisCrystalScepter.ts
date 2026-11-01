import type { ItemModule } from "../equip";
import { refreshSlow } from "./shared";

export const RylaisCrystalScepter: ItemModule = {
  item: "Rylai's Crystal Scepter",
  build(item, fighter) {
    const words = "Dealing ability damage slows enemies hit by 30% for 1 second.";
    const rime = item.effect("Rimefrost");
    const slow = rime.quoted(words) / 100;
    const seconds = rime.quoted(words, 1);
    item.assume("Rimefrost slows on all the kit's ability damage, its damage over time included.");
    return { hooks: { onDamageDealt: (ctx) => { if (fighter.isAbilityDamage(ctx)) refreshSlow(ctx, item.label, slow, seconds); } } };
  },
};
