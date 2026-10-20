import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { activeKey, memo, until } from "../runtime";
import { applyFrom, joinHooks, spellblade } from "./shared";

export const IcebornGauntlet: ItemModule = {
  item: "Iceborn Gauntlet",
  build(item, fighter) {
    const blade = item.effect("Spellblade");
    const share = blade.quoted("deals 150% base AD bonus physical damage on-hit") / 100;
    const words = "creates a 300 radius frost field for 2 seconds";
    const radius = blade.quoted(words);
    const seconds = blade.quoted(words, 1);
    const slow = blade.meleeRanged("Enemies within the field are slowed by 25% (melee) / 12.5% (ranged)");
    const lifeSteal = item.tagged("OnHitAppliesLifeSteal");
    const center = memo(item.name, "fieldX");
    const ends = memo(item.name, "fieldUntil");
    const slowOf = (ranged: boolean) => (ranged ? slow.ranged : slow.melee) / 100;
    item.assume("Spellblade's frost field is where the target stood when hit; its slow lasts while the target stays inside it, up to the field's 2 seconds.");
    return {
      hooks: joinHooks(
        spellblade(item.name, blade, {
          onHit(ctx, scale) {
            applyFrom(ctx, item.name, { type: "damage", damageType: "physical", amount: { base: 0, ratios: { baseAD: share } }, label: item.name, ...(lifeSteal ? { lifesteal: derive(ctx.self).lifeSteal } : {}) }, false, scale);
            ctx.self.memory[center] = ctx.enemy.x;
            ctx.self.memory[ends] = ctx.tick + toTicks(seconds);
            applyFrom(ctx, item.name, { type: "cc", cc: "slow", duration: seconds, strength: slowOf(ctx.self.spec.attack.ranged) });
          },
        }),
        {
          onTick(ctx) {
            if (ctx.self.memory[center] === undefined) return;
            const inside = Math.abs(ctx.enemy.x - Number(ctx.self.memory[center])) <= radius + ctx.enemy.spec.base.radius;
            if (ctx.tick <= until(ctx.self, ends) && inside) return;
            delete ctx.self.memory[center];
            ctx.enemy.statuses = ctx.enemy.statuses.filter((status) => !(status.kind === "cc" && status.key === "slow" && status.source === ctx.self.side && status.ability === activeKey(item.name)));
          },
        },
      ),
    };
  },
};
