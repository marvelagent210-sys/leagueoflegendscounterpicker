import { toTicks } from "../../engine/rules/time";
import type { Status } from "../../engine/sim/state";
import type { ItemModule } from "../equip";
import { memo, until } from "../runtime";

export const SerpentsFang: ItemModule = {
  item: "Serpent's Fang",
  build(item, fighter) {
    const reaver = item.effect("Shield Reaver");
    const seconds = reaver.quoted("Dealing damage to an enemy champion inflicts them with venom for 3 seconds");
    const share = reaver.meleeRanged("reducing any shields they gain within the duration by 50% (melee) / 35% (ranged)");
    reaver.quote("and if the target was not already afflicted by the venom, reducing all of their active shields by the same amount.");
    const cut = 1 - (fighter.ranged ? share.ranged : share.melee) / 100;
    const venom = memo(item.name, "venomUntil");
    const reaved = memo(item.name, "reaved");
    const id = (status: Status) => `${status.startTick}:${status.key}:${status.memoKey ?? ""}`;
    item.assume("Shield Reaver cuts a shield the enemy gains while venomed on the next tick after it gains it.");
    const reave = (shields: Status[], done: Set<string>) => {
      for (const shield of shields) {
        if (done.has(id(shield))) continue;
        shield.value *= cut;
        done.add(id(shield));
      }
    };
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.petSource) return;
          const fresh = ctx.tick > until(ctx.self, venom);
          ctx.self.memory[venom] = ctx.tick + toTicks(seconds);
          if (!fresh) return;
          const done = new Set<string>();
          reave(ctx.enemy.statuses.filter((status) => status.kind === "shield"), done);
          ctx.self.memory[reaved] = [...done].join(",");
        },
        onTick(ctx) {
          if (ctx.tick > until(ctx.self, venom)) {
            delete ctx.self.memory[reaved];
            return;
          }
          const done = new Set(String(ctx.self.memory[reaved] ?? "").split(",").filter(Boolean));
          const before = done.size;
          reave(ctx.enemy.statuses.filter((status) => status.kind === "shield"), done);
          if (done.size !== before) ctx.self.memory[reaved] = [...done].join(",");
        },
      },
    };
  },
};
