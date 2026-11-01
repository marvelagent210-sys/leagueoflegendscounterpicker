import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { stealths, usesOf } from "../hints";
import { memo, until } from "../runtime";
import { applyFrom } from "./shared";

export const UmbralGlaive: ItemModule = {
  item: "Umbral Glaive",
  build(item) {
    const stalker = item.effect("Nightstalker");
    const hidden = stalker.quoted("After being not visible to enemies for at least 1 second");
    const words = "your next basic attack against a champion is empowered to deal 50 (+ 1.5 per 1 Lethality) bonus true damage on-hit.";
    const base = stalker.quoted(words);
    const perLethality = stalker.quoted(words, 1);
    const lasts = stalker.quoted("The empowered attack lasts for 4 seconds after being seen by an enemy.");
    const since = memo(item.name, "hiddenSince");
    const armed = memo(item.name, "armedUntil");
    const visible = (self: { statuses: Array<{ kind: string; key: string }> }) => !self.statuses.some((s) => s.kind === "state" && s.key === "invisible") || self.statuses.some((s) => s.kind === "state" && s.key === "revealed");
    return {
      // An empowered attack after each use of an ability that makes the holder invisible.
      budget: { damage: (self) => ({ true: (base + perLethality * derive(self).lethality) * usesOf(self, stealths) }) },
      hooks: {
        onTick(ctx) {
          if (!visible(ctx.self)) {
            if (ctx.self.memory[since] === undefined) ctx.self.memory[since] = ctx.tick;
            if (ctx.tick - Number(ctx.self.memory[since]) >= toTicks(hidden)) ctx.self.memory[armed] = Number.POSITIVE_INFINITY;
            return;
          }
          delete ctx.self.memory[since];
          if (ctx.self.memory[armed] === Number.POSITIVE_INFINITY) ctx.self.memory[armed] = ctx.tick + toTicks(lasts);
        },
        onAttackHit(ctx) {
          if (ctx.blocked || ctx.tick > until(ctx.self, armed)) return;
          delete ctx.self.memory[armed];
          applyFrom(ctx, item.label, { type: "damage", damageType: "true", amount: { base, ratios: { lethality: perLethality } }, label: item.label }, false, ctx.scale);
        },
      },
      unmodeled: ["Blackout: there are no wards in a duel."],
    };
  },
};
