import { toTicks } from "../../engine/rules/time";
import type { ItemModule } from "../equip";
import { FIGHT } from "../hints";
import { memo, until } from "../runtime";
import { applyFrom } from "./shared";

export const GuardianAngel: ItemModule = {
  item: "Guardian Angel",
  build(item, fighter) {
    const rebirth = item.effect("Rebirth");
    const words = "Upon taking lethal damage, enter resurrection for 4 seconds, during which you are invulnerable, untargetable, and unable to act, and afterwards heal for 50% of base health and restore 100% of maximum mana (300 second cooldown, starts after resurrection ends).";
    const seconds = rebirth.quoted(words);
    const share = rebirth.quoted(words, 1) / 100;
    const ends = memo(item.name, "until");
    item.assume("Rebirth's resurrection is stasis: invulnerable, untargetable and unable to act. Its 300-second cooldown outlasts any fight, so it happens once.");
    return {
      stasis: true,
      // Once a fight, the health it comes back with.
      budget: { shielding: (self) => (share * self.spec.base.hp) / FIGHT },
      hooks: {
        onLethal(ctx) {
          if (ctx.self.memory[ends] !== undefined) return false;
          ctx.self.memory[ends] = ctx.tick + toTicks(seconds);
          ctx.self.hp = 1;
          for (const state of ["stasis", "noAttacks", "noMovement"] as const) applyFrom(ctx, item.label, { type: "state", state, duration: seconds }, true);
          ctx.log("Guardian Angel: resurrecting");
          return true;
        },
        onTick(ctx) {
          if (ctx.tick !== until(ctx.self, ends)) return;
          ctx.self.hp += share * ctx.self.spec.base.hp;
          if (fighter.mana) ctx.self.resource = Math.max(ctx.self.resource, ctx.self.spec.base.resource);
          ctx.log("Guardian Angel: resurrected");
        },
      },
    };
  },
};
