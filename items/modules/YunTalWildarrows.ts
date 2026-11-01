import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { FIGHT, attacks } from "../hints";
import { memo, until } from "../runtime";

export const YunTalWildarrows: ItemModule = {
  item: "Yun Tal Wildarrows",
  options: { stacked: { label: "Share of Practice Makes Lethal's stacks collected before the fight (by level 20, all of them)", default: 1 } },
  build(item, fighter, options) {
    const practice = item.effect("Practice Makes Lethal");
    const perStack = practice.meleeRanged("Basic attacks on-attack grant 0.4% (melee) / 0.2% (ranged) critical strike chance permanently");
    const most = practice.meleeRanged("stacking up to 63 (melee) / 125 (ranged) times");
    const cap = practice.quoted("(capped at 25% critical strike chance)") / 100;
    const pick = (pair: { melee: number; ranged: number }) => (fighter.ranged ? pair.ranged : pair.melee);
    const stacks = Math.round(pick(most) * Math.min(1, Math.max(0, options.stacked ?? 1)));
    const flurry = item.effect("Flurry");
    const words = "Launching a basic attack against an enemy champion grants you 30% bonus attack speed for 6 seconds (30 second cooldown, reduced by 1 second on-hit and 2 seconds if the attack critically strikes).";
    const speed = flurry.quoted(words) / 100;
    const seconds = flurry.quoted(words, 1);
    const cooldown = flurry.quoted(words, 2);
    const perHit = flurry.quoted(words, 3);
    const perCrit = flurry.quoted(words, 4);
    item.assume("Flurry's cooldown shrinks on each hit by its expected reduction: 1 second, or 2 when the attack critically strikes.");
    const ready = memo(item.name, "ready");
    return {
      bonus: { critChance: Math.min(cap, (stacks * pick(perStack)) / 100) },
      // From the first attack, then again once hits have taken the cooldown down.
      budget: {
        stats(self) {
          const rate = attacks(self);
          if (rate <= 0) return [];
          const cycle = cooldown / (1 + rate * (perHit + derive(self).critChance * (perCrit - perHit)));
          const up = Math.min(FIGHT, seconds + Math.max(0, FIGHT - cycle) * Math.min(1, seconds / cycle));
          return [{ stat: "attackSpeed", value: speed * (up / FIGHT) }];
        },
      },
      hooks: {
        onAttackLaunch(ctx) {
          if (ctx.targetPet || ctx.tick < until(ctx.self, ready)) return;
          ctx.buff(memo(item.name, "flurry"), "attackSpeed", speed, seconds);
          ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
        },
        onAttackHit(ctx) {
          const due = until(ctx.self, ready);
          if (due <= ctx.tick) return;
          const chance = ctx.critChance ?? derive(ctx.self).critChance;
          ctx.self.memory[ready] = Math.max(ctx.tick, due - toTicks(perHit + chance * (perCrit - perHit)));
        },
      },
    };
  },
};
