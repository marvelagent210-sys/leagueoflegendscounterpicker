import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { memo, setStat } from "../runtime";

export const JakShoTheProtean: ItemModule = {
  item: "Jak'Sho, The Protean",
  build(item, fighter) {
    const words = "Gain a stack for each second in combat with enemy champions, stacking up to 5 times. At maximum stacks, increase your bonus armor and bonus magic resistance by 30% until the end of combat.";
    const resilience = item.effect("Voidborn Resilience");
    const stacks = resilience.quoted(words);
    const share = resilience.quoted(words, 1) / 100;
    const combat = fighter.combat();
    const armor = memo(item.name, "armor");
    const mr = memo(item.name, "MR");
    const on = memo(item.name, "on");
    item.assume("Voidborn Resilience's 30% is of the bonus armor and magic resistance the holder has when it reaches maximum stacks.");
    return {
      hooks: {
        onTick(ctx) {
          const full = combat.seconds(ctx.self, ctx.tick) >= stacks;
          if (full === Boolean(ctx.self.memory[on])) return;
          ctx.self.memory[on] = full;
          const d = derive(ctx.self);
          setStat(ctx.self, armor, "armor", full ? share * d.armor.bonus : 0, ctx.tick);
          setStat(ctx.self, mr, "MR", full ? share * d.mr.bonus : 0, ctx.tick);
        },
      },
    };
  },
};
