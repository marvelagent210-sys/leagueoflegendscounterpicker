import { toTicks } from "../../engine/rules/time";
import { heal } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { memo, setStat, until } from "../runtime";

export const SunderedSky: ItemModule = {
  item: "Sundered Sky",
  build(item, fighter) {
    const strike = item.effect("Lightshield Strike");
    const crit = 1 + strike.quoted("Your next basic attack against a champion is empowered to critically strike for 60% bonus damage") / 100;
    const share = strike.meleeRanged("heal you for 90% (melee) / 45% (ranged) base AD");
    const missing = strike.quoted("(+ 4% of your missing health) (10 second cooldown per target)") / 100;
    const cooldown = strike.quoted("(+ 4% of your missing health) (10 second cooldown per target)", 1);
    const extraSeconds = strike.quoted("Excess healing beyond maximum health is converted to bonus health for 8 seconds.");
    item.assume("Lightshield Strike's critical strike deals 160% of the attack's damage whatever the holder's critical strike damage.");
    const ready = memo(item.name, "ready");
    const loaded = memo(item.name, "loaded");
    return {
      hooks: {
        onAttack(ctx) {
          if (ctx.targetPet || ctx.tick < until(ctx.self, ready)) return;
          ctx.action.critChance = 1;
          ctx.action.critMultiplier = crit;
          // A cancelled windup leaves it for the next attack.
          ctx.self.memory[loaded] = true;
        },
        onAttackResolved(ctx) {
          if (!ctx.self.memory[loaded]) return;
          delete ctx.self.memory[loaded];
          ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
          if (ctx.missed || ctx.blocked) return;
          const d = derive(ctx.self);
          const amount = (fighter.ranged ? share.ranged : share.melee) / 100 * d.baseAd + missing * (d.maxHp - ctx.self.hp);
          const room = d.maxHp - ctx.self.hp;
          heal(ctx.world, ctx.self, amount);
          if (amount > room) setStat(ctx.self, memo(item.name, "health"), "health", amount - room, ctx.tick, ctx.tick + toTicks(extraSeconds));
          if (amount > room) ctx.self.hp += amount - room;
        },
      },
    };
  },
};
