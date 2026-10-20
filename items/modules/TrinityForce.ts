import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { memo } from "../runtime";
import { applyFrom, joinHooks, spellblade } from "./shared";

export const TrinityForce: ItemModule = {
  item: "Trinity Force",
  build(item) {
    const blade = item.effect("Spellblade");
    const share = blade.quoted("deals 200% base AD bonus physical damage on-hit") / 100;
    const lifeSteal = item.tagged("OnHitAppliesLifeSteal");
    const quicken = item.effect("Quicken");
    const words = "Basic attacks on-hit grant 20 bonus movement speed for 2 seconds";
    const speed = quicken.quoted(words);
    const seconds = quicken.quoted(words, 1);
    return {
      hooks: joinHooks(
        spellblade(item.name, blade, {
          onHit: (ctx, scale) => applyFrom(ctx, item.name, { type: "damage", damageType: "physical", amount: { base: 0, ratios: { baseAD: share } }, label: item.name, ...(lifeSteal ? { lifesteal: derive(ctx.self).lifeSteal } : {}) }, false, scale),
        }),
        { onAttackHit: (ctx) => { if (!ctx.blocked) ctx.buff(memo(item.name, "quicken"), "moveSpeedFlat", speed, seconds); } },
      ),
    };
  },
};
