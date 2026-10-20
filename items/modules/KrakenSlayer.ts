import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { HookContext } from "../../engine/sim/spec";
import type { ItemModule } from "../equip";
import { memo } from "../runtime";
import { applyFrom } from "./shared";

export const KrakenSlayer: ItemModule = {
  item: "Kraken Slayer",
  build(item, fighter) {
    const down = item.effect("Bring It Down");
    down.quote("Basic attacks on-hit (melee) / on-attack (ranged) grant a stack for 4 seconds, up to 2 stacks.");
    const maxStacks = down.quoted("up to 2 stacks. At 2 stacks, the next basic attack consumes all stacks");
    const stackSeconds = down.quoted("grant a stack for 4 seconds");
    const damage = down.level("At 2 stacks, the next basic attack consumes all stacks to deal", fighter.ranged ? 1 : 0);
    const missing = down.series("At 2 stacks, the next basic attack consumes all stacks to deal", 2);
    if (missing.kind !== "variable" || missing.variable !== "target's missing health") throw new Error(`${item.name}: the third value should be by target's missing health`);
    const top = Number(missing.values.at(-1)) / 100;
    const at = Number(missing.points.at(-1)) / 100;
    down.quote("increased by 0% – 75% (based on target's missing health)");
    down.quote("Abilities that do not trigger on-attack effects, will always grant stacks on-hit.");
    item.assume("Bring It Down's bonus grows evenly with the target's missing health, to 75% at full missing health (the wiki shows it in steps of 5%).");
    const lifeSteal = item.tagged("OnHitAppliesLifeSteal");
    const stacks = memo(item.name, "stacks");
    const expires = memo(item.name, "stacksUntil");
    const loaded = memo(item.name, "loaded");
    const held = (ctx: HookContext) => (ctx.tick <= Number(ctx.self.memory[expires] ?? -1) ? Number(ctx.self.memory[stacks] ?? 0) : 0);
    const gain = (ctx: HookContext) => {
      ctx.self.memory[stacks] = Math.min(maxStacks, held(ctx) + 1);
      ctx.self.memory[expires] = ctx.tick + toTicks(stackSeconds);
    };
    const blow = (ctx: HookContext, scale: number) => {
      const t = derive(ctx.enemy);
      const missingShare = Math.max(0, Math.min(1, 1 - ctx.enemy.hp / t.maxHp));
      const amount = damage * (1 + top * Math.min(1, missingShare / at));
      applyFrom(ctx, item.label, { type: "damage", damageType: "physical", amount: { base: amount }, label: item.label, ...(lifeSteal ? { lifesteal: derive(ctx.self).lifeSteal } : {}) }, false, scale);
    };
    return {
      hooks: {
        // Ranged: stacks and the empowered attack are decided as the attack launches.
        onAttackLaunch(ctx) {
          if (!ctx.self.spec.attack.ranged || ctx.targetPet) return;
          if (held(ctx) >= maxStacks) {
            delete ctx.self.memory[stacks];
            ctx.self.memory[loaded] = true;
          } else gain(ctx);
        },
        onAttackHit(ctx) {
          if (ctx.blocked) return;
          if (ctx.self.spec.attack.ranged) {
            if (ctx.self.memory[loaded]) {
              delete ctx.self.memory[loaded];
              blow(ctx, ctx.scale);
            }
            return;
          }
          if (held(ctx) >= maxStacks) {
            delete ctx.self.memory[stacks];
            blow(ctx, ctx.scale);
          } else gain(ctx);
        },
        onAbilityHit(ctx) {
          if (ctx.ability.flags?.appliesOnHit && held(ctx) < maxStacks) gain(ctx);
        },
      },
    };
  },
};
