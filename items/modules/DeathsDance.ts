import type { ItemModule } from "../equip";
import { FIGHT, incoming } from "../hints";
import { applyFrom } from "./shared";

export const DeathsDance: ItemModule = {
  item: "Death's Dance",
  build(item, fighter) {
    const pain = item.effect("Ignore Pain");
    const share = pain.meleeRanged("Reduces 30% (melee) / 10% (ranged) of all post-mitigation physical and magic damage received");
    const words = "instead stores the damage to successively take it as true damage over 3 seconds, dealing a third of the stored damage each second.";
    const seconds = pain.quoted(words);
    pain.quote(words);
    const cut = (fighter.ranged ? share.ranged : share.melee) / 100;
    item.assume("Ignore Pain takes its share of each hit after shields, and each hit's stored damage bleeds on its own, a third each second; the holder deals the bleed to itself.");
    // The damage still stored when the holder falls: its share of what arrives over the bleed's
    // mean delay (a third after each of 1, 2 and 3 seconds: 2 seconds).
    const delay = (seconds + 1) / 2;
    return {
      budget: {
        shielding(self, enemy) {
          const coming = incoming(self, enemy);
          return (cut * delay * (coming.physical + coming.magic)) / FIGHT;
        },
      },
      hooks: {
        modifyDamageAfterShields(ctx) {
          if (ctx.damageType === "true" || ctx.amount <= 0) return ctx.amount;
          const stored = ctx.amount * cut;
          applyFrom(ctx, item.label, { type: "dot", damageType: "true", total: { base: stored }, duration: seconds, interval: 1, label: item.label, stacks: true }, true);
          return ctx.amount - stored;
        },
      },
      unmodeled: ["Defy: it needs a kill, which ends the duel."],
    };
  },
};
