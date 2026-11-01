import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { memo } from "../runtime";
import { applyFrom, spellblade, spellbladeRate } from "./shared";

export const LichBane: ItemModule = {
  item: "Lich Bane",
  build(item) {
    const blade = item.effect("Spellblade");
    const attackSpeed = blade.quoted("your next basic attack within 10 seconds gains 50% bonus attack speed", 1) / 100;
    const words = "deals 75% base AD (+ 45% AP) bonus magic damage on-hit";
    const ad = blade.quoted(words) / 100;
    const ap = blade.quoted(words, 1) / 100;
    const window = blade.quoted("After using an ability, your next basic attack within 10 seconds");
    const procs = spellbladeRate(blade);
    return {
      budget: { damage: (self) => ({ magic: (ad * derive(self).baseAd + ap * derive(self).ap) * procs(self) }) },
      hooks: spellblade(item.name, blade, {
        armed: (ctx, on) => ctx.buff(memo(item.name, "attackSpeed"), "attackSpeed", on ? attackSpeed : 0, window),
        onHit: (ctx, scale) => applyFrom(ctx, item.label, { type: "damage", damageType: "magic", amount: { base: 0, ratios: { baseAD: ad, AP: ap } }, label: item.label }, false, scale),
      }),
    };
  },
};
