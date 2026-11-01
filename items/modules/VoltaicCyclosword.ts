import type { ItemModule } from "../equip";
import { memo } from "../runtime";
import { applyFrom } from "./shared";

export const VoltaicCyclosword: ItemModule = {
  item: "Voltaic Cyclosword",
  build(item, fighter) {
    item.effect("Energized").quote("Moving and basic attacking generates Energize stacks, up to 100.");
    item.effect("Galvanize").quote("Dealing ability damage to an enemy champion, with an ability cast instance, triggers the effects of Energized attacks against them if they are ready.");
    const firmament = item.effect("Firmament");
    const lethality = firmament.meleeRanged("your next basic attack on-hit grants you 15 (melee) / 12 (ranged) lethality for 4 seconds");
    const seconds = firmament.quoted("lethality for 4 seconds");
    const share = firmament.meleeRanged("deals bonus physical damage equal to 9% (melee) / 7% (ranged) of the target's current health");
    const pick = (pair: { melee: number; ranged: number }) => (fighter.ranged ? pair.ranged : pair.melee);
    const energized = fighter.energized();
    energized.add({
      onHit(ctx, scale) {
        ctx.buff(memo(item.name, "lethality"), "lethality", pick(lethality), seconds);
        applyFrom(ctx, item.label, { type: "damage", damageType: "physical", amount: { base: 0, ratios: { targetCurrentHP: pick(share) / 100 } }, label: item.label }, false, scale);
      },
    });
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (fighter.isAbilityDamage(ctx) && !ctx.persistent) energized.spend(ctx, 1);
        },
      },
    };
  },
};
