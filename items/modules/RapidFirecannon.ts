import type { ItemModule } from "../equip";
import { memo } from "../runtime";
import { applyFrom } from "./shared";

export const RapidFirecannon: ItemModule = {
  item: "Rapid Firecannon",
  build(item, fighter) {
    item.effect("Energized").quote("Moving and basic attacking generates Energize stacks, up to 100.");
    const shooter = item.effect("Sharpshooter");
    const damage = shooter.quoted("When fully Energized, your next basic attack deals 40 bonus magic damage on-hit.");
    const share = shooter.quoted("Energized attacks gain 35% bonus range, capped at 150.") / 100;
    const cap = shooter.quoted("Energized attacks gain 35% bonus range, capped at 150.", 1);
    const range = Math.min(cap, share * fighter.spec.attack.range);
    fighter.energized().add({
      full: (ctx, on) => ctx.buff(memo(item.name, "range"), "attackRange", on ? range : 0, 1e6),
      onHit: (ctx, scale) => applyFrom(ctx, item.name, { type: "damage", damageType: "magic", amount: { base: damage }, label: item.name }, false, scale),
    });
    return {};
  },
};
