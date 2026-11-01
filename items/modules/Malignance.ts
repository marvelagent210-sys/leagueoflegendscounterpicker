import { toTicks } from "../../engine/rules/time";
import type { ItemModule } from "../equip";
import { memo, setStat, until } from "../runtime";
import { within } from "./aura";
import { applyFrom } from "./shared";
import { ultimateHaste } from "./ultimate";

export const Malignance: ItemModule = {
  item: "Malignance",
  build(item, fighter) {
    const fog = item.effect("Hatefog");
    fog.quote("Dealing non-proc damage or pet damage to enemy champions with your ultimate ability creates a");
    const bySize = fog.series("radius scorched zone beneath them for 3 seconds", 0);
    if (bySize.kind !== "variable") throw new Error(`${item.name}: Hatefog's radius should depend on the ultimate's damage instance`);
    const seconds = fog.quoted("radius scorched zone beneath them for 3 seconds");
    const words = "applying a Curse to enemies within that deals 15 (+ 1.25% AP) magic damage every 0.25 seconds and reduces their magic resistance by 10 (3 second cooldown per target, starts on zone creation).";
    const base = fog.quoted(words);
    const ap = fog.quoted(words, 1) / 100;
    const every = fog.quoted(words, 2);
    const shred = fog.quoted(words, 3);
    const cooldown = fog.quoted(words, 4);
    const points = bySize.points.map(Number);
    const sizes = bySize.values.map(Number);
    const radiusFor = (damage: number) => {
      let at = sizes[0]!;
      for (let i = 1; i < points.length; i++) {
        if (damage < points[i]!) return at + (sizes[i]! - at) * ((damage - points[i - 1]!) / (points[i]! - points[i - 1]!));
        at = sizes[i]!;
      }
      return at;
    };
    item.assume("Hatefog's zone is centered where its target stood; its radius follows the triggering hit's damage before mitigation, between the wiki's points; it curses the target while the target stays in it.");
    const ultimate = new Set(fighter.spec.abilities.filter((ability) => ability.slot === "R").map((ability) => ability.name));
    const center = memo(item.name, "x");
    const radius = memo(item.name, "radius");
    const ends = memo(item.name, "until");
    const next = memo(item.name, "next");
    const ready = memo(item.name, "ready");
    return {
      haste: [ultimateHaste(item.effect("Scorn"), "Gain 20 ultimate haste.")],
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.attack || ctx.petSource || !ctx.ability || !ultimate.has(ctx.ability) || ctx.tick < until(ctx.self, ready)) return;
          ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
          ctx.self.memory[center] = ctx.enemy.x;
          ctx.self.memory[radius] = radiusFor(ctx.raw);
          ctx.self.memory[ends] = ctx.tick + toTicks(seconds);
          ctx.self.memory[next] = ctx.tick;
        },
        onTick(ctx) {
          const key = memo(item.name, "curse");
          if (ctx.tick > until(ctx.self, ends)) {
            setStat(ctx.enemy, key, "mrReduction", 0, ctx.tick, Number.POSITIVE_INFINITY, ctx.self.side);
            return;
          }
          const inside = within({ x: Number(ctx.self.memory[center]) }, ctx.enemy, Number(ctx.self.memory[radius]));
          setStat(ctx.enemy, key, "mrReduction", inside ? shred : 0, ctx.tick, Number.POSITIVE_INFINITY, ctx.self.side);
          if (!inside || ctx.tick < until(ctx.self, next)) return;
          ctx.self.memory[next] = ctx.tick + toTicks(every);
          applyFrom(ctx, item.label, { type: "damage", damageType: "magic", amount: { base, ratios: { AP: ap } }, label: item.label, persistent: true });
        },
      },
    };
  },
};
