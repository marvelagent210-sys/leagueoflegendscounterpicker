import { toTicks } from "../../engine/rules/time";
import type { Effect } from "../../engine/sim/spec";
import type { ItemModule } from "../equip";
import { memo, until } from "../runtime";
import { itemDamage } from "./shared";

export const GuinsoosRageblade: ItemModule = {
  item: "Guinsoo's Rageblade",
  build(item) {
    const wrath = item.effect("Wrath").quoted("Basic attacks deal 30 bonus magic damage on-hit.");
    const strike = item.effect("Seething Strike");
    const words = "Basic attacks on-attack grant 8% bonus attack speed for 4 seconds, stacking up to 4 times for a total of 32% bonus attack speed.";
    const perStack = strike.quoted(words) / 100;
    const stackSeconds = strike.quoted(words, 1);
    const maxStacks = strike.quoted(words, 2);
    const phantomWords = "At maximum stacks, basic attacks on-attack also grant a Phantom stack for 4 seconds, up to 2 stacks.";
    const phantomSeconds = strike.quoted(phantomWords, 0);
    const maxPhantom = strike.quoted(phantomWords, 1);
    const delay = strike.quoted("trigger a Phantom Hit that applies on-hit effects to the target after a 0.15-second delay");
    item.assume("Seething Strike: an attack made at maximum stacks grants a Phantom stack, from the fifth attack on. A Phantom Hit repeats the attack's on-hit effects (the kit's and the items'), but not effects the kit's or items' hooks add when attacks hit (Spellblade, Kraken Slayer); its damage doesn't heal through life steal.");
    const stacks = memo(item.name, "stacks");
    const expires = memo(item.name, "stacksUntil");
    const phantom = memo(item.name, "phantom");
    const phantomExpires = memo(item.name, "phantomUntil");
    return {
      onHit: [itemDamage(item.label, "magic", { base: wrath }, item.tagged("OnHitAppliesLifeSteal"))],
      hooks: {
        onAttackLaunch(ctx) {
          if (ctx.targetPet) return;
          const before = ctx.tick <= until(ctx.self, expires) ? Number(ctx.self.memory[stacks] ?? 0) : 0;
          const held = Math.min(maxStacks, before + 1);
          ctx.self.memory[stacks] = held;
          ctx.self.memory[expires] = ctx.tick + toTicks(stackSeconds);
          ctx.buff(memo(item.name, "attackSpeed"), "attackSpeed", held * perStack, stackSeconds);
          if (before < maxStacks) return;
          const phantoms = ctx.tick <= until(ctx.self, phantomExpires) ? Number(ctx.self.memory[phantom] ?? 0) : 0;
          if (phantoms >= maxPhantom) {
            delete ctx.self.memory[phantom];
            // The kit's and items' on-hit effects of this attack, once more after the delay.
            const repeat: Effect[] = [...(ctx.self.spec.attack.onHit ?? []), ...ctx.action.onHit];
            ctx.action.onHit = [...ctx.action.onHit, { type: "delayed", delay, effects: repeat }];
            return;
          }
          ctx.self.memory[phantom] = phantoms + 1;
          ctx.self.memory[phantomExpires] = ctx.tick + toTicks(phantomSeconds);
        },
      },
    };
  },
};
