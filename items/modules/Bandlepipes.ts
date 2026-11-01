import { IMMOBILIZING } from "../../engine/rules/crowdControl";
import type { ItemModule } from "../equip";
import { memo } from "../runtime";

export const Bandlepipes: ItemModule = {
  item: "Bandlepipes",
  build(item, fighter) {
    const fanfare = item.effect("Fanfare");
    const seconds = fanfare.meleeRanged("Slowing or immobilizing an enemy champion empowers you with Fanfare for 8 (melee) / 4 (ranged) seconds");
    const speed = fanfare.quoted("granting you 20 bonus movement speed.");
    const attack = fanfare.meleeRanged("you and nearby allied champions also gain 30 (melee) / 20 (ranged)% bonus attack speed.");
    const pick = (pair: { melee: number; ranged: number }) => (fighter.ranged ? pair.ranged : pair.melee);
    const seen = memo(item.name, "seen");
    return {
      hooks: {
        onTick(ctx) {
          // A slow or immobilizing crowd control of the holder's that started since the last tick.
          const last = Number(ctx.self.memory[seen] ?? -1);
          ctx.self.memory[seen] = ctx.tick;
          if (!ctx.enemy.statuses.some((status) => status.kind === "cc" && status.source === ctx.self.side && status.startTick > last && (status.key === "slow" || IMMOBILIZING.has(status.key as never)))) return;
          ctx.buff(memo(item.name, "speed"), "moveSpeedFlat", speed, pick(seconds));
          ctx.buff(memo(item.name, "attackSpeed"), "attackSpeed", pick(attack) / 100, pick(seconds));
        },
      },
    };
  },
};
