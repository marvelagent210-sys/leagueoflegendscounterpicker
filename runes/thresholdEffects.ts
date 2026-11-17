/** Packet-time damage amplification from the reviewed Precision health runes. */
import { derive } from "../engine/sim/derived";
import type { KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";
import { outgoingRuneHooks, type RuneDamageIncrease } from "./outgoingAmplifiers";

// These are the only canonical summoner labels currently representable by the
// damage API. Additional summoner/jungle modes need source classification before
// they can claim compatibility with the rune effects.
const EXCLUDED_TRUE_DAMAGE = new Set(["Smite", "Ignite"]);

/**
 * Attach these hooks to the opponent, where raw damage still sees each packet's
 * actual pre-hit health. The source's health comes from its champion owner, even
 * when a real owned pet delivers the packet. This hook is pure: critical outcome
 * evaluation may call it more than once for one resolved damage event.
 */
export function thresholdEnemyHooks(selection: readonly number[], rules: CombatRuneRules): KitHooks[] {
  if (![8014, 8017, 8299].some(id => selection.includes(id))) return [];
  return outgoingRuneHooks([thresholdDamageIncrease(selection, rules)]);
}

export function thresholdDamageIncrease(selection: readonly number[], rules: CombatRuneRules): RuneDamageIncrease {
  const chosen = new Set(selection);
  const coup = { ...rules.coupDeGrace };
  const cut = { ...rules.cutDown };
  const last = { ...rules.lastStand };
  return (ctx) => {
      if (ctx.self.petId !== undefined || ctx.world.units[ctx.self.side] !== ctx.self
        || ctx.enemy.side === ctx.self.side) return 0;
      if (ctx.damageType === "true" && ctx.ability !== undefined && EXCLUDED_TRUE_DAMAGE.has(ctx.ability)) return 0;
      const owner = ctx.world.units[ctx.enemy.side];
      if (!owner || owner.side === ctx.self.side) return 0;
      const targetMaximum = derive(ctx.self).maxHp;
      const ownerMaximum = derive(owner).maxHp;
      if (!(targetMaximum > 0) || !(ownerMaximum > 0)) return 0;
      const targetHealth = ctx.self.hp / targetMaximum;
      const ownerHealth = owner.hp / ownerMaximum;
      let increase = 0;
      if (chosen.has(8014) && targetHealth < coup.healthThreshold) increase += coup.damageIncrease;
      if (chosen.has(8017) && targetHealth > cut.healthThreshold) increase += cut.damageIncrease;
      if (chosen.has(8299) && ownerHealth < last.healthThreshold) {
        const progress = Math.min(1, Math.max(0,
          (last.healthThreshold - ownerHealth) / (last.healthThreshold - last.maximumHealthThreshold)));
        increase += last.minimumDamageIncrease + progress * (last.maximumDamageIncrease - last.minimumDamageIncrease);
      }
      return increase;
  };
}
