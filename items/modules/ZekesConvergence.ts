import { toTicks } from "../../engine/rules/time";
import type { ItemModule } from "../equip";
import { memo, until } from "../runtime";
import { within } from "./aura";
import { applyFrom, refreshSlow } from "./shared";
import { ultimateHaste } from "./ultimate";

export const ZekesConvergence: ItemModule = {
  item: "Zeke's Convergence",
  build(item) {
    const storm = item.effect("Frostfire Tempest");
    const start = "Upon casting your ultimate ability, and once an enemy champion is within Frostfire Tempest's radius or after 5 seconds otherwise, you summon a storm of flame and ice around you for 5 seconds.";
    const wait = storm.quoted(start);
    const seconds = storm.quoted(start, 1);
    const words = "The storm deals 7.5 magic damage every 0.25 seconds to enemy champions and monsters within a 350 radius and slows them by 30% (45 second cooldown, starts on ultimate cast).";
    const damage = storm.quoted(words);
    const every = storm.quoted(words, 1);
    const radius = storm.quoted(words, 2);
    const slow = storm.quoted(words, 3) / 100;
    const cooldown = storm.quoted(words, 4);
    const ready = memo(item.name, "ready");
    const armed = memo(item.name, "armedUntil");
    const ends = memo(item.name, "until");
    const next = memo(item.name, "next");
    return {
      haste: [ultimateHaste(item.effect("Cryocombustion"), "Gain 15 ultimate haste.")],
      hooks: {
        onCast(ctx) {
          if (ctx.ability.slot !== "R" || ctx.ability.countsAsCast === false || ctx.tick < until(ctx.self, ready)) return;
          ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
          ctx.self.memory[armed] = ctx.tick + toTicks(wait);
        },
        onTick(ctx) {
          const waiting = ctx.self.memory[armed];
          if (typeof waiting === "number" && (ctx.tick >= waiting || within(ctx.self, ctx.enemy, radius))) {
            delete ctx.self.memory[armed];
            ctx.self.memory[ends] = ctx.tick + toTicks(seconds);
            ctx.self.memory[next] = ctx.tick;
          }
          if (ctx.tick > until(ctx.self, ends) || ctx.tick < until(ctx.self, next)) return;
          ctx.self.memory[next] = ctx.tick + toTicks(every);
          if (!within(ctx.self, ctx.enemy, radius)) return;
          applyFrom(ctx, item.label, { type: "damage", damageType: "magic", amount: { base: damage }, label: item.label, persistent: true });
          refreshSlow(ctx, item.label, slow, every * 2);
        },
      },
    };
  },
};
