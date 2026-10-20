import type { ItemModule } from "../equip";
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
    return {
      hooks: {
        modifyDamageAfterShields(ctx) {
          if (ctx.damageType === "true" || ctx.amount <= 0) return ctx.amount;
          const stored = ctx.amount * cut;
          applyFrom(ctx, item.name, { type: "dot", damageType: "true", total: { base: stored }, duration: seconds, interval: 1, label: item.name, stacks: true }, true);
          return ctx.amount - stored;
        },
      },
      unmodeled: ["Defy: it needs a kill, which ends the duel."],
    };
  },
};
