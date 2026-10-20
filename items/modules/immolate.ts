/** Immolate (Sunfire Aegis, Hollow Radiance): damage every second around the holder for 3 seconds after it takes or deals damage. */
import { toTicks } from "../../engine/rules/time";
import type { ItemData } from "../context";
import type { ItemDefinition } from "../equip";
import { memo, until } from "../runtime";
import { within } from "./aura";
import { applyFrom } from "./shared";

export function immolate(item: ItemData, damage: string): ItemDefinition {
  const burn = item.effect("Immolate");
  const seconds = burn.quoted("Taking or dealing damage activates this passive for 3 seconds.");
  const base = burn.quoted(damage);
  const share = burn.quoted(damage, 1) / 100;
  const interval = 1;
  burn.quote("magic damage every second to enemies within 325 (+ 100% bonus size) units");
  const radius = burn.quoted("magic damage every second to enemies within 325 (+ 100% bonus size) units");
  item.assume("Immolate's radius is 325 units: champions have no bonus size in the simulator.");
  const active = memo(item.name, "until");
  const next = memo(item.name, "next");
  const wake = (self: Parameters<typeof until>[0], tick: number) => {
    if (tick > until(self, active)) self.memory[next] = tick + toTicks(interval);
    self.memory[active] = tick + toTicks(seconds);
  };
  return {
    hooks: {
      onDamageDealt: (ctx) => wake(ctx.self, ctx.tick),
      onDamageTaken: (ctx) => wake(ctx.self, ctx.tick),
      onTick(ctx) {
        if (ctx.tick > until(ctx.self, active) || ctx.tick < until(ctx.self, next)) return;
        ctx.self.memory[next] = ctx.tick + toTicks(interval);
        if (within(ctx.self, ctx.enemy, radius)) applyFrom(ctx, item.label, { type: "damage", damageType: "magic", amount: { base, ratios: { bonusHP: share } }, label: item.label, persistent: true });
      },
    },
  };
}
