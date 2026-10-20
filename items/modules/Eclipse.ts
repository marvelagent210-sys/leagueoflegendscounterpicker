import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { HookContext } from "../../engine/sim/spec";
import type { ItemModule } from "../equip";
import { memo, until } from "../runtime";
import { applyFrom, itemShield } from "./shared";

export const Eclipse: ItemModule = {
  item: "Eclipse",
  build(item, fighter) {
    const moon = item.effect("Ever Rising Moon");
    moon.quote("Damaging basic attacks, abilities, item effects, and summoner spells, as well as the application of crowd control and damage over time effects, apply stacks against enemy champions, up to one per cast instance per champion.");
    const window = moon.quoted("Applying 2 stacks to a champion within a 2 second period", 1);
    const share = moon.meleeRanged("deals bonus physical damage to them equal to 8% (melee) / 5% (ranged) of target's maximum health");
    const shield = moon.meleeRanged("grants you a shield for 150 (melee) / 75 (ranged)");
    const ad = moon.meleeRanged("(+ 40% (melee) / 20% (ranged) bonus AD) for 2 seconds.");
    const seconds = moon.quoted("(+ 40% (melee) / 20% (ranged) bonus AD) for 2 seconds.", 2);
    const cooldown = moon.cooldown();
    item.assume("Ever Rising Moon counts each damage instance the holder deals that isn't damage over time, and each crowd control it applies, as a stack; the hits of one cast at the same tick count once.");
    const pick = (pair: { melee: number; ranged: number }) => (fighter.ranged ? pair.ranged : pair.melee);
    const last = memo(item.name, "lastStack");
    const lastSource = memo(item.name, "lastSource");
    const ready = memo(item.name, "ready");
    const stack = (ctx: HookContext, source: string) => {
      if (ctx.tick < until(ctx.self, ready)) return;
      const key = `${ctx.tick}:${source}`;
      if (ctx.self.memory[lastSource] === key) return;
      const previous = until(ctx.self, last);
      ctx.self.memory[lastSource] = key;
      if (ctx.tick - previous <= toTicks(window) && previous > Number.NEGATIVE_INFINITY) {
        delete ctx.self.memory[last];
        ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
        applyFrom(ctx, item.name, { type: "damage", damageType: "physical", amount: { base: 0, ratios: { targetMaxHP: pick(share) / 100 } }, label: item.name });
        itemShield(ctx, item.name, pick(shield) + (pick(ad) / 100) * derive(ctx.self).bonusAd, seconds, false);
        return;
      }
      ctx.self.memory[last] = ctx.tick;
    };
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.persistent || ctx.petSource || ctx.ability === item.name) return;
          stack(ctx, ctx.ability ?? (ctx.attack ? "attack" : "effect"));
        },
        onEnemyCCApplied(ctx) {
          if (ctx.source === ctx.self) stack(ctx, `cc:${ctx.ability ?? ctx.cc}`);
        },
      },
    };
  },
};
