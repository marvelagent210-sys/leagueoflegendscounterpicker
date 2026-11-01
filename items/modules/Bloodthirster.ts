import { derive } from "../../engine/sim/derived";
import { budgetMultipliers } from "../../engine/budget";
import { averageCritFactor } from "../../engine/rules/defense";
import type { ItemModule } from "../equip";
import { FIGHT, attacks } from "../hints";
import { activeKey, memo, ownStatus } from "../runtime";
import { addStatus } from "../../engine/sim/combat";

export const Bloodthirster: ItemModule = {
  item: "Bloodthirster",
  build(item) {
    const ichor = item.effect("Ichorshield");
    ichor.quote("Convert the healing received from life steal in excess of maximum health into a shield for up to");
    const most = ichor.level("Convert the healing received from life steal in excess of maximum health into a shield for up to");
    ichor.quote("which lasts until destroyed.");
    item.assume("Ichorshield: the life steal a basic attack's damage would heal beyond maximum health, from the health the holder had when the tick began.");
    const before = memo(item.name, "hp");
    const key = memo(item.name, "shield");
    return {
      // The life steal of the fight's first second, at full health, fills it.
      budget: {
        shielding(self, enemy) {
          const d = derive(self);
          return Math.min(most, d.lifeSteal * d.ad * averageCritFactor(d.critChance, d.critDamage) * attacks(self) * budgetMultipliers(self, enemy).physical) / FIGHT;
        },
      },
      hooks: {
        onTick(ctx) {
          ctx.self.memory[before] = ctx.self.hp;
        },
        onDamageTaken(ctx) {
          ctx.self.memory[before] = ctx.self.hp;
        },
        onDamageDealt(ctx) {
          if (!ctx.attack || ctx.petSource) return;
          const d = derive(ctx.self);
          const stolen = ctx.mitigated * d.lifeSteal;
          const room = d.maxHp - Number(ctx.self.memory[before] ?? ctx.self.hp);
          ctx.self.memory[before] = Math.min(d.maxHp, Number(ctx.self.memory[before] ?? ctx.self.hp) + stolen);
          const excess = stolen - Math.max(0, room);
          if (excess <= 0) return;
          const shield = ownStatus(ctx.self, key);
          if (shield) shield.value = Math.min(most, shield.value + excess);
          else addStatus(ctx.self, { kind: "shield", key: activeKey(item.name), source: ctx.self.side, startTick: ctx.tick, endTick: Number.POSITIVE_INFINITY, value: Math.min(most, excess), shieldType: "normal", memoKey: key });
        },
      },
    };
  },
};
