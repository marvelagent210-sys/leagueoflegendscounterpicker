import { averageCritFactor } from "../../engine/rules/defense";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { attacks } from "../hints";

export const HexopticsC44: ItemModule = {
  item: "Hexoptics C44",
  build(item) {
    const lens = item.effect("Magnification");
    lens.quote("Deal 0% – 10% (based on distance to target) increased basic damage.");
    lens.quote("The distance is calculated from the edge of your current position to edge of the target's position at the time they are damaged.");
    const byDistance = lens.series("increased basic damage");
    if (byDistance.kind !== "variable" || byDistance.variable !== "distance to target") throw new Error(`${item.name}: Magnification should depend on distance to target`);
    const top = Number(byDistance.values.at(-1)) / 100;
    const at = Number(byDistance.points.at(-1));
    item.assume(`Magnification grows evenly with distance, to ${top * 100}% at ${at} units edge to edge; it amplifies the basic attack's own damage, not its on-hit effects.`);
    return {
      // At the holder's attack range.
      budget: {
        damage(self) {
          const d = derive(self);
          const bonus = top * Math.min(1, Math.max(0, self.spec.attack.range) / at);
          return { physical: bonus * d.ad * averageCritFactor(d.critChance, d.critDamage) * attacks(self) * (self.spec.budget?.attackSplit?.physical ?? 1) };
        },
      },
      // What the enemy takes from the holder's basic attacks.
      enemyHooks: {
        modifyDamageTakenRaw(ctx) {
          if (!ctx.attack || ctx.ability !== undefined || ctx.enemy.petId !== undefined) return ctx.raw;
          const gap = Math.max(0, Math.abs(ctx.self.x - ctx.enemy.x) - ctx.self.spec.base.radius - ctx.enemy.spec.base.radius);
          return ctx.raw * (1 + top * Math.min(1, gap / at));
        },
      },
      unmodeled: ["Arcane Aim: a takedown ends the duel."],
    };
  },
};
