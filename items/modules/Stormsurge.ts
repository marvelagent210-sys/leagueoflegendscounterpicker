import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { memo, until } from "../runtime";
import { applyFrom } from "./shared";

export const Stormsurge: ItemModule = {
  item: "Stormsurge",
  build(item) {
    const raider = item.effect("Stormraider");
    const words = "Dealing damage to an enemy champion equal to 25% of their maximum health within 2.5 seconds inflicts them with Squall (30 second cooldown, starts on Squall's application).";
    const share = raider.quoted(words) / 100;
    const window = raider.quoted(words, 1);
    const cooldown = raider.quoted(words, 2);
    const squall = item.effect("Squall");
    const strike = "After 2 seconds of having applied Squall, strike the target with lightning, dealing 125 (+ 10% AP) magic damage to them.";
    const delay = squall.quoted(strike);
    const base = squall.quoted(strike, 1);
    const ap = squall.quoted(strike, 2) / 100;
    const recent = memo(item.name, "recent");
    const ready = memo(item.name, "ready");
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.petSource || ctx.tick < until(ctx.self, ready)) return;
          // The hits of the last 2.5 seconds, as "tick:amount" pairs.
          const since = ctx.tick - toTicks(window);
          const hits = String(ctx.self.memory[recent] ?? "").split(",").filter(Boolean).map((pair) => pair.split(":").map(Number) as [number, number]).filter(([tick]) => tick > since);
          hits.push([ctx.tick, ctx.mitigated]);
          if (hits.reduce((sum, [, amount]) => sum + amount, 0) >= share * derive(ctx.enemy).maxHp) {
            delete ctx.self.memory[recent];
            ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
            applyFrom(ctx, item.label, { type: "delayed", delay, effects: [{ type: "damage", damageType: "magic", amount: { base, ratios: { AP: ap } }, label: item.label }] });
            return;
          }
          ctx.self.memory[recent] = hits.map(([tick, amount]) => `${tick}:${amount}`).join(",");
        },
      },
      unmodeled: [],
    };
  },
};
