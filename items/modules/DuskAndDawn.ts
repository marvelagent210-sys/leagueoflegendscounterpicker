import type { ItemModule } from "../equip";
import { applyFrom, spellblade } from "./shared";

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
    return {
      hooks: spellblade(item.name, blade, {
        onHit(ctx, scale) {
          applyFrom(ctx, item.name, { type: "damage", damageType: "magic", amount: { base: 0, ratios: { baseAD: ad, AP: ap } }, label: item.name }, false, scale);
          applyFrom(ctx, item.name, { type: "heal", amount: { base: 0, ratios: { AP: healAP, bonusHP: healHealth } } }, true, scale);
          const onHit = ctx.self.spec.attack.onHit ?? [];
          if (onHit.length) applyFrom(ctx, item.name, { type: "delayed", delay: again, effects: onHit }, false, scale);
        },
      }),
    };
  },
};
