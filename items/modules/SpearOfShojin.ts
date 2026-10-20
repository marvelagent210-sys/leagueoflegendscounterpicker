import { toTicks } from "../../engine/rules/time";
import type { ItemModule } from "../equip";
import { memo, until } from "../runtime";

export const SpearOfShojin: ItemModule = {
  item: "Spear of Shojin",
  build(item, fighter) {
    const haste = item.effect("Dragonforce").quoted("Gain 25 basic ability haste.");
    const will = item.effect("Focused Will");
    const words = "Dealing ability damage or pet damage from a non-innate ability cast instance, generates a stack of Focused Will for 6 seconds, stacking up to 4 times.";
    const seconds = will.quoted(words);
    const maxStacks = will.quoted(words, 1);
    const perStack = will.quoted("For each stack, your ability, proc and pet damage originating from your ability cast instances deals 3% increased damage") / 100;
    will.quote("Each cast instance can only grant one stack per second.");
    const once = 1;
    const innate = new Set(fighter.spec.abilities.filter((ability) => ability.slot === "I").map((ability) => ability.name));
    const fromCasts = (hit: { attack: boolean; ability?: string; persistent: boolean }) => fighter.isAbilityDamage(hit) && hit.ability !== undefined && !innate.has(hit.ability);
    item.assume("Focused Will counts each ability's damage as its cast instance; its bonus is on the kit's non-innate ability damage, damage over time included.");
    const stacks = memo(item.name, "stacks");
    const expires = memo(item.name, "until");
    return {
      haste: [{ slots: ["Q", "W", "E"], haste }],
      hooks: {
        onDamageDealt(ctx) {
          if (!fromCasts(ctx)) return;
          const gate = memo(item.name, `next:${ctx.ability}`);
          if (ctx.tick < until(ctx.self, gate)) return;
          ctx.self.memory[gate] = ctx.tick + toTicks(once);
          const held = ctx.tick <= until(ctx.self, expires) ? Number(ctx.self.memory[stacks] ?? 0) : 0;
          ctx.self.memory[stacks] = Math.min(maxStacks, held + 1);
          ctx.self.memory[expires] = ctx.tick + toTicks(seconds);
        },
      },
      // What the enemy takes from the holder's ability damage.
      enemyHooks: {
        modifyDamageTakenRaw(ctx) {
          if (ctx.enemy.petId !== undefined || !fromCasts(ctx)) return ctx.raw;
          const held = ctx.tick <= until(ctx.enemy, expires) ? Number(ctx.enemy.memory[stacks] ?? 0) : 0;
          return ctx.raw * (1 + perStack * held);
        },
      },
    };
  },
};
