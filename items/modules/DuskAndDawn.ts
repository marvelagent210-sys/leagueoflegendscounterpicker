import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { bonusHealth } from "../runtime";
import { applyFrom, spellblade, spellbladeRate } from "./shared";

export const DuskAndDawn: ItemModule = {
  item: "Dusk and Dawn",
  build(item) {
    const blade = item.effect("Spellblade");
    const damage = "deals 75% base AD (+ 10% AP) bonus magic damage";
    const heal = "heals you for 10% AP (+ 3% bonus health) on-hit";
    const ad = blade.quoted(damage) / 100, ap = blade.quoted(damage, 1) / 100;
    const healAP = blade.quoted(heal) / 100, healHealth = blade.quoted(heal, 1) / 100;
    const again = blade.quoted("applies on-hit effects to the target again after a 0.2-second delay");
    item.assume("Spellblade's repeated on-hit effects are the attack's on-hit effects; effects the kit's or items' hooks add when attacks hit aren't repeated.");
    const procs = spellbladeRate(blade);
    return {
      // The repeated on-hit effects are left out of the hint: the attack's on-hit damage, once more.
      budget: {
        damage: (self) => ({ magic: (ad * derive(self).baseAd + ap * derive(self).ap) * procs(self) }),
        healing: (self) => (healAP * derive(self).ap + healHealth * bonusHealth(self)) * procs(self),
      },
      hooks: spellblade(item.name, blade, {
        onHit(ctx, scale) {
          applyFrom(ctx, item.label, { type: "damage", damageType: "magic", amount: { base: 0, ratios: { baseAD: ad, AP: ap } }, label: item.label }, false, scale);
          applyFrom(ctx, item.label, { type: "heal", amount: { base: 0, ratios: { AP: healAP, bonusHP: healHealth } } }, true, scale);
          const onHit = ctx.self.spec.attack.onHit ?? [];
          if (onHit.length) applyFrom(ctx, item.label, { type: "delayed", delay: again, effects: onHit }, false, scale);
        },
      }),
    };
  },
};
