import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { follow, memo, until } from "../runtime";
import { applyFrom, itemDamage, joinHooks } from "./shared";

export const Muramana: ItemModule = {
  item: "Muramana",
  build(item, fighter) {
    const awe = item.effect("Awe").quoted("Grants bonus attack damage equal to 2% maximum mana.") / 100;
    const shock = item.effect("Shock");
    const onHit = shock.quoted("Basic attacks on-hit against champions deal 1.2% maximum mana bonus physical damage.") / 100;
    const ability = shock.meleeRanged("Dealing ability damage to champions with a champion ability deals 4% (melee) / 3% (ranged) maximum mana bonus physical damage");
    const once = shock.quoted("This can only be triggered on the same target once every 6.5 seconds from the same cast instance.");
    const share = (fighter.ranged ? ability.ranged : ability.melee) / 100;
    if (!fighter.mana) return { unmodeled: ["Awe: the champion has no mana.", "Shock: its damage is a share of mana, which the champion doesn't have."] };
    return {
      onHit: [itemDamage(item.name, "physical", { base: 0, ratios: { maxMana: onHit } }, item.tagged("OnHitAppliesLifeSteal"))],
      hooks: joinHooks(follow(memo(item.name, "AD"), "AD", (self) => awe * derive(self).maxResource), {
        onDamageDealt(ctx) {
          if (!fighter.isAbilityDamage(ctx) || ctx.persistent || !ctx.ability) return;
          const gate = memo(item.name, `next:${ctx.ability}`);
          if (ctx.tick < until(ctx.self, gate)) return;
          ctx.self.memory[gate] = ctx.tick + toTicks(once);
          applyFrom(ctx, item.name, { type: "damage", damageType: "physical", amount: { base: 0, ratios: { maxMana: share } }, label: item.name });
        },
      }),
    };
  },
};
