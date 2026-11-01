import { toTicks } from "../../engine/rules/time";
import type { ItemModule } from "../equip";
import { FIGHT, ultimate, usesOf } from "../hints";
import { memo, until } from "../runtime";
import { ultimateHaste } from "./ultimate";

export const ExperimentalHexplate: ItemModule = {
  item: "Experimental Hexplate",
  build(item, fighter) {
    const overdrive = item.effect("Overdrive");
    const speed = overdrive.meleeRanged("gain 50% (melee) / 25% (ranged) bonus attack speed");
    const move = overdrive.meleeRanged("and 20% (melee) / 10% (ranged) bonus movement speed for 8 seconds");
    const seconds = overdrive.quoted("bonus movement speed for 8 seconds (30 second cooldown, starts on ultimate cast).");
    const cooldown = overdrive.quoted("bonus movement speed for 8 seconds (30 second cooldown, starts on ultimate cast).", 1);
    const pick = (pair: { melee: number; ranged: number }) => (fighter.ranged ? pair.ranged : pair.melee) / 100;
    const ready = memo(item.name, "ready");
    return {
      haste: [ultimateHaste(item.effect("Hexcharged"), "Gain 30 ultimate haste.")],
      // Once a fight, from the ultimate's first cast.
      budget: { stats: (self) => (usesOf(self, ultimate) > 0 ? [{ stat: "attackSpeed", value: pick(speed) * Math.min(1, seconds / FIGHT) }] : []) },
      hooks: {
        onCast(ctx) {
          if (ctx.ability.slot !== "R" || ctx.ability.countsAsCast === false || ctx.tick < until(ctx.self, ready)) return;
          ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
          ctx.buff(memo(item.name, "attackSpeed"), "attackSpeed", pick(speed), seconds);
          ctx.buff(memo(item.name, "moveSpeed"), "moveSpeedPercent", pick(move), seconds);
        },
      },
    };
  },
};
