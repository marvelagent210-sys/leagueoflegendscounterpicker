import { derive, evaluate } from "../../engine/sim/derived";
import type { Formula } from "../../engine/sim/spec";
import type { ItemModule } from "../equip";
import { applyFrom, spellblade } from "./shared";

export const EssenceReaver: ItemModule = {
  item: "Essence Reaver",
  build(item, fighter) {
    const blade = item.effect("Spellblade");
    const share = blade.quoted("your next basic attack within 10 seconds deals 125% base AD", 1) / 100;
    blade.quote("(+ 0 – 50 based on critical strike chance) bonus physical damage on-hit");
    const byCrit = blade.series("based on critical strike chance", 0);
    if (byCrit.kind !== "variable" || Number(byCrit.points.at(-1)) !== 100) throw new Error(`${item.name}: the crit bonus should run to 100% critical strike chance`);
    const perCrit = Number(byCrit.values.at(-1));
    const mana = blade.quoted("restores mana equal to 50% of that amount") / 100;
    const lifeSteal = item.tagged("OnHitAppliesLifeSteal");
    const amount: Formula = { base: 0, ratios: { baseAD: share, critChance: perCrit } };
    return {
      hooks: spellblade(item.name, blade, {
        onHit(ctx, scale) {
          applyFrom(ctx, item.label, { type: "damage", damageType: "physical", amount, label: item.label, ...(lifeSteal ? { lifesteal: derive(ctx.self).lifeSteal } : {}) }, false, scale);
          if (fighter.mana) ctx.apply({ type: "resource", amount: { base: evaluate(amount, ctx.self, ctx.enemy) * mana * scale } }, true);
        },
      }),
      ...(fighter.mana ? {} : { unmodeled: ["Spellblade: its mana restored does nothing for a champion without mana."] }),
    };
  },
};
