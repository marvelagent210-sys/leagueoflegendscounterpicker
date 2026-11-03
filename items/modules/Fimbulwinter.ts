import { toTicks } from "../../engine/rules/time";
import { IMMOBILIZING } from "../../engine/rules/crowdControl";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { absorbed, immobilizes, incoming, slowsOrImmobilizes, triggers, usesOf } from "../hints";
import { bonusMana, follow, memo, until } from "../runtime";
import { itemShield, joinHooks } from "./shared";

export const Fimbulwinter: ItemModule = {
  item: "Fimbulwinter",
  build(item, fighter) {
    const awe = item.effect("Awe").quoted("Grants bonus health equal to 15% bonus mana.") / 100;
    const lasting = item.effect("Everlasting");
    const words = "Immobilizing, or slowing if you are melee, an enemy champion grants a 100 (+ 4.5% current mana) shield for 3 seconds (8 second cooldown).";
    const base = lasting.quoted(words);
    const share = lasting.quoted(words, 1) / 100;
    const seconds = lasting.quoted(words, 2);
    const cooldown = lasting.quoted(words, 3);
    if (!fighter.mana) return { unmodeled: ["Awe: the champion has no mana.", "Everlasting: its shield is a share of mana, which the champion doesn't have."] };
    item.assume("Everlasting's larger shield needs more than one enemy champion nearby, which a duel doesn't have.");
    const seen = memo(item.name, "seen");
    const ready = memo(item.name, "ready");
    // A shield after each crowd control that triggers it, once per cooldown; at full mana.
    const shields = (self: Parameters<typeof bonusMana>[0]) => Math.min(usesOf(self, fighter.ranged ? immobilizes : slowsOrImmobilizes), triggers(cooldown));
    return {
      budget: {
        stats: (self) => [{ stat: "health", value: awe * bonusMana(self, fighter.baseMana) }],
        shielding(self, enemy) {
          const coming = incoming(self, enemy);
          return absorbed(base + share * derive(self).maxResource, seconds, coming.physical + coming.magic + coming.true, false) * shields(self);
        },
      },
      hooks: joinHooks(follow(memo(item.name, "health"), "health", (self) => awe * bonusMana(self, fighter.baseMana)), {
        onTick(ctx) {
          const last = Number(ctx.self.memory[seen] ?? -1);
          ctx.self.memory[seen] = ctx.tick;
          if (ctx.tick < until(ctx.self, ready)) return;
          const triggers = (key: string) => IMMOBILIZING.has(key as never) || (key === "slow" && !ctx.self.spec.attack.ranged);
          if (!ctx.enemy.statuses.some((status) => status.kind === "cc" && status.source === ctx.self.side && status.startTick >= last && status.startTick < ctx.tick && triggers(status.key))) return;
          ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
          itemShield(ctx, item.name, base + share * ctx.self.resource, seconds, false);
        },
      }),
    };
  },
};
