import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import { averageCritFactor } from "../../engine/rules/defense";
import type { ItemModule } from "../equip";
import { FIGHT, ultimate, usesOf } from "../hints";
import { memo, until } from "../runtime";
import { ultimateHaste } from "./ultimate";

export const FiendhunterBolts: ItemModule = {
  item: "Fiendhunter Bolts",
  build(item) {
    const barrage = item.effect("Opening Barrage");
    const words = "After casting your ultimate ability, your next 3 basic attacks on-attack within 8 seconds gain 50% bonus attack speed and are empowered to critically strike for 60% bonus damage.";
    const attacks = barrage.quoted(words);
    const window = barrage.quoted(words, 1);
    const speed = barrage.quoted(words, 2) / 100;
    const empowered = barrage.quoted(words, 3) / 100;
    const already = "If an attack would have already critically struck, it instead critically strikes for 100% bonus damage and deals bonus true damage equal to 15% of the triggering attack's damage pre-mitigation.";
    const doubled = barrage.quoted(already) / 100;
    const extra = barrage.quoted(already, 1) / 100;
    const cooldown = barrage.cooldown();
    item.assume("Opening Barrage's empowered attacks average their two outcomes by the holder's critical strike chance, as other critical strikes do; their bonus damage is a share of the base 100%, before champions' critical damage modifiers.");
    const left = memo(item.name, "left");
    const ends = memo(item.name, "until");
    const ready = memo(item.name, "ready");
    return {
      haste: [ultimateHaste(item.effect("Night Vigil"), "Gain 30 ultimate haste.")],
      // Its empowered attacks once a fight, from the ultimate's first cast, against the attacks' average critical strike.
      budget: {
        damage(self) {
          if (usesOf(self, ultimate) <= 0) return {};
          const d = derive(self);
          const chance = Math.min(1, d.critChance);
          const empoweredDamage = 1 + empowered + chance * (doubled - empowered);
          return { physical: (attacks * d.ad * Math.max(0, empoweredDamage - averageCritFactor(chance, d.critDamage))) / FIGHT, true: (attacks * d.ad * chance * extra * (1 + doubled)) / FIGHT };
        },
      },
      hooks: {
        onCast(ctx) {
          if (ctx.ability.slot !== "R" || ctx.ability.countsAsCast === false || ctx.tick < until(ctx.self, ready)) return;
          ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
          ctx.self.memory[left] = attacks;
          ctx.self.memory[ends] = ctx.tick + toTicks(window);
          ctx.buff(memo(item.name, "attackSpeed"), "attackSpeed", speed, window);
        },
        onAttack(ctx) {
          const remaining = Number(ctx.self.memory[left] ?? 0);
          if (remaining <= 0 || ctx.targetPet) return;
          if (ctx.tick > until(ctx.self, ends)) {
            delete ctx.self.memory[left];
            return;
          }
          const chance = Math.min(1, Math.max(0, ctx.action.critChance ?? derive(ctx.self).critChance));
          ctx.action.critChance = 1;
          ctx.action.critMultiplier = 1 + empowered + chance * (doubled - empowered);
          if (chance > 0) ctx.action.onHit = [...ctx.action.onHit, { type: "damage", damageType: "true", amount: { base: 0, ratios: { AD: chance * extra * (1 + doubled) } }, label: item.label }];
          ctx.self.memory[left] = remaining - 1;
          if (remaining - 1 <= 0) ctx.buff(memo(item.name, "attackSpeed"), "attackSpeed", 0, 0);
        },
      },
    };
  },
};
