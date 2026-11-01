import type { ItemModule } from "../equip";
import { triggers } from "../hints";
import { activeKey } from "../runtime";
import { applyFrom } from "./shared";

export const Redemption: ItemModule = {
  item: "Redemption",
  build(item) {
    const intervention = item.effect("Intervention");
    const words = "Call upon a 550-radius beam of light to strike upon the target location after 2.5 seconds";
    const radius = intervention.quoted(words);
    const delay = intervention.quoted(words, 1);
    const share = intervention.quoted("while enemy champions within take 10% of target's maximum health as true damage.") / 100;
    const heal = intervention.level("Allies within the area are healed for");
    item.assume("Intervention strikes where the enemy stands; it heals the holder too when the holder is within its radius of the enemy.");
    const cooldown = intervention.cooldown();
    return {
      budget: { healing: () => heal * triggers(cooldown) },
      actives: [{
        name: intervention.name,
        cooldown,
        delivery: { kind: "circle", range: intervention.range(), radius, delay },
        onHit: [{ type: "damage", damageType: "true", amount: { base: 0, ratios: { targetMaxHP: share } } }],
      }],
      hooks: {
        onAbilityHit(ctx) {
          if (ctx.ability.key === activeKey(item.name) && Math.abs(ctx.self.x - ctx.enemy.x) <= radius) applyFrom(ctx, item.label, { type: "heal", amount: { base: heal } }, true);
        },
      },
    };
  },
};
