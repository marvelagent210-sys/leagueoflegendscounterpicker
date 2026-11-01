import { toTicks } from "../../engine/rules/time";
import type { ItemModule } from "../equip";
import { memo, setStat, until } from "../runtime";

export const BlackCleaver: ItemModule = {
  item: "Black Cleaver",
  build(item, fighter) {
    const carve = item.effect("Carve");
    const stackSeconds = carve.quoted("applies a stack of Carve for 6 seconds");
    const maxStacks = carve.quoted("stacking up to 5 times");
    const perStack = carve.quoted("Each stack inflicts 6% armor reduction, up to 30% at 5 stacks.") / 100;
    carve.quote("Non-basic damage dealt on the same target may apply stacks only once per frame.");
    const fervor = item.effect("Fervor");
    const speed = fervor.meleeRanged("grants you 20 (melee) / 10 (ranged) bonus movement speed for 2 seconds");
    const speedSeconds = fervor.quoted("bonus movement speed for 2 seconds");
    const stacks = memo(item.name, "stacks");
    const expires = memo(item.name, "stacksUntil");
    const frame = memo(item.name, "abilityTick");
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.damageType !== "physical") return;
          ctx.buff(memo(item.name, "fervor"), "moveSpeedFlat", ctx.self.spec.attack.ranged ? speed.ranged : speed.melee, speedSeconds);
          // Other damage stacks once a tick at most; each basic attack stacks.
          if (!ctx.attack) {
            if (ctx.self.memory[frame] === ctx.tick) return;
            ctx.self.memory[frame] = ctx.tick;
          }
          const held = ctx.tick <= until(ctx.self, expires) ? Number(ctx.self.memory[stacks] ?? 0) : 0;
          const now = Math.min(maxStacks, held + 1);
          const endTick = ctx.tick + toTicks(stackSeconds);
          ctx.self.memory[stacks] = now;
          ctx.self.memory[expires] = endTick;
          setStat(ctx.enemy, memo(item.name, "carve"), "armorReductionPercent", now * perStack, ctx.tick, endTick, ctx.self.side);
        },
      },
    };
  },
};
