import { toTicks } from "../../engine/rules/time";
import type { ItemModule } from "../equip";
import { activeKey, memo, ownStatus, setStat } from "../runtime";
import { CLEAVE } from "./hydras";

export const Stridebreaker: ItemModule = {
  item: "Stridebreaker",
  build(item) {
    const active = item.effect("Breaking Shockwave");
    const words = "Deal 80% AD physical damage to enemies within a 450 radius in front of you and slow them by 35% for 3 seconds.";
    const share = active.quoted(words) / 100;
    const radius = active.quoted(words, 1);
    const slow = active.quoted(words, 2) / 100;
    const slowSeconds = active.quoted(words, 3);
    const haste = "For each champion hit, gain 35% bonus movement speed decaying over 3 seconds.";
    const speed = active.quoted(haste) / 100;
    const seconds = active.quoted(haste, 1);
    active.quote("Can move while casting.");
    const key = memo(item.name, "speed");
    return {
      unmodeled: [CLEAVE],
      actives: [{
        name: active.name,
        cooldown: active.cooldown(),
        moveWhileCasting: true,
        delivery: { kind: "aura", radius },
        onHit: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: share } } }, { type: "cc", cc: "slow", duration: slowSeconds, strength: slow }],
      }],
      hooks: {
        onAbilityHit(ctx) {
          if (ctx.ability.key !== activeKey(item.name)) return;
          setStat(ctx.self, key, "moveSpeedPercent", speed, ctx.tick, ctx.tick + toTicks(seconds));
        },
        onTick(ctx) {
          // The speed decays evenly over its 3 seconds.
          const status = ownStatus(ctx.self, key);
          if (status) status.value = Math.max(0, speed * (status.endTick - ctx.tick) / toTicks(seconds));
        },
      },
    };
  },
};
