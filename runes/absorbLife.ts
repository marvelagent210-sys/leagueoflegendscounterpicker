/** Absorb Life heals the credited champion for actual hostile combat kills. */
import type { KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";

export const ABSORB_LIFE_ASSUMPTIONS = [
  "Absorb Life heals only from actual hostile combat kills emitted by the simulator, including kills credited from owned pets. No farm, pre-fight kills or assist credit is invented.",
  "The generic enemy-unit rule is applied to actual champion and summoned-unit kills; individual clone, ward and trap victim categories have not been independently measured in the live game. Natural expiry and replacement are not kills.",
] as const;

export function absorbLifeHooks(rules: Pick<CombatRuneRules, "absorbLife">): KitHooks {
  const heal = rules.absorbLife?.heal;
  if (typeof heal !== "number" || !Number.isFinite(heal) || heal <= 0) {
    throw new Error("Absorb Life requires a finite positive reviewed heal amount");
  }
  return {
    onKill(ctx) {
      // notifyKill credits owned-pet kills to their champion, once per victim.
      // A copied pet hook must not grant another heal to a secondary body.
      if (ctx.self.petId !== undefined || ctx.world.units[ctx.self.side] !== ctx.self
        || ctx.self.fallen || ctx.self.deathDefied) return;
      const victim = ctx.victim;
      if ("side" in victim) {
        if (victim.side === ctx.self.side || ctx.world.units[victim.side] !== victim
          || !(victim.hp <= 0 || victim.fallen)) return;
      } else if (victim.owner === ctx.self.side || victim.hp > 0) return;
      // Use the ordinary heal path for caps, Grievous Wounds, healing modifiers,
      // noHealing and death protection. This is healing, not regeneration/vamp.
      ctx.apply({ type: "heal", amount: { base: heal } }, true);
    },
  };
}
