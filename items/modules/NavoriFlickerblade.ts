import { derive } from "../../engine/sim/derived";
import { type AbilitySpec, cooldownKeyOf } from "../../engine/sim/spec";
import type { ItemModule } from "../equip";
import { attacks } from "../hints";

export const NavoriFlickerblade: ItemModule = {
  item: "Navori Flickerblade",
  build(item, fighter) {
    const share = item.effect("Transcendence").quoted("Basic attacks on-attack reduce the remaining cooldowns of your basic abilities by 15%.") / 100;
    const basic = [...new Set(fighter.spec.abilities.filter((ability) => ability.slot === "Q" || ability.slot === "W" || ability.slot === "E").map(cooldownKeyOf))];
    // Attacks at rate a take 15% off what remains of a cooldown each: it runs out after
    // ln(1 + k C) / k seconds instead of C, with k = a ln(1 / 0.85).
    const shorter = (ability: AbilitySpec): AbilitySpec => {
      if (!basic.includes(cooldownKeyOf(ability)) || ability.cooldown <= 0) return ability;
      const own = ability.cooldownFor;
      return {
        ...ability,
        cooldownFor(unit) {
          const scale = ability.staticCooldown ? 1 : 1 + derive(unit).abilityHaste / 100;
          const cooldown = (own?.(unit) ?? ability.cooldown) / scale;
          const k = attacks(unit) * -Math.log(1 - share);
          return (k > 0 ? Math.log1p(k * cooldown) / k : cooldown) * scale;
        },
      };
    };
    return {
      budget: { ability: shorter },
      hooks: {
        onAttackLaunch(ctx) {
          for (const key of basic) ctx.apply({ type: "refund", ability: key, fraction: share }, true);
        },
      },
    };
  },
};
