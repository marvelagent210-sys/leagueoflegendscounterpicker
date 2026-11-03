import { costOf } from "../../engine/sim/actions";
import type { ItemModule } from "../equip";
import { casts } from "../hints";
import { championCast } from "../runtime";
import { applyFrom } from "./shared";

export const RodOfAges: ItemModule = {
  item: "Rod of Ages",
  options: { minutes: { label: "Minutes Rod of Ages has stacked before the fight (10 at most)", default: 10 } },
  build(item, fighter, options) {
    const timeless = item.effect("Timeless");
    const words = "This item gains 10 bonus health, 30 bonus mana, and 3 ability power every minute, up to 10 times";
    const minutes = Math.min(timeless.quoted(words, 3), Math.max(0, options.minutes ?? 0));
    timeless.quote("Upon reaching maximum stacks, gain a level that preserves your current experience (level cap remains the same).");
    const eternity = item.effect("Eternity");
    const restore = eternity.quoted("Restore mana equal to 10% of pre-mitigation damage taken from champions") / 100;
    const byMana = eternity.series("and heal for");
    if (byMana.kind !== "variable" || byMana.variable !== "mana spent") throw new Error(`${item.name}: Eternity's heal should depend on mana spent`);
    const most = Number(byMana.values.at(-1));
    const perMana = most / Number(byMana.points.at(-1));
    item.assume("Eternity heals evenly with the mana a cast costs, up to 20; Timeless's level does nothing at level 20.");
    return {
      bonus: { hp: timeless.quoted(words) * minutes, ap: timeless.quoted(words, 2) * minutes },
      mana: timeless.quoted(words, 1) * minutes,
      ...(fighter.mana
        ? {
            // A cast's mana cost is usually enough for the most it heals.
            budget: { healing: (self) => most * casts(self) },
            hooks: {
              onDamageTaken(ctx) {
                if (!ctx.petSource && ctx.enemy.side !== ctx.self.side) ctx.apply({ type: "resource", amount: { base: restore * ctx.raw } }, true);
              },
              onCast(ctx) {
                if (!championCast(ctx.ability)) return;
                const heal = Math.min(most, perMana * costOf(ctx.self, ctx.ability));
                if (heal > 0) applyFrom(ctx, item.label, { type: "heal", amount: { base: heal } }, true);
              },
            },
          }
        : { unmodeled: ["Eternity: it restores mana and heals by mana spent, and the champion has no mana."] }),
    };
  },
};
