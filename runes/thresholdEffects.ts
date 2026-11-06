/** Packet-time damage amplification from the reviewed Precision health runes. */
import { derive } from "../engine/sim/derived";
import type { KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";

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
  const chosen = new Set(selection);
  if (![8014, 8017, 8299].some((id) => chosen.has(id))) return [];
  const coup = { ...rules.coupDeGrace };
  const cut = { ...rules.cutDown };
  const last = { ...rules.lastStand };
  return [{
    modifyDamageTakenRaw(ctx) {
      if (ctx.self.petId !== undefined || ctx.world.units[ctx.self.side] !== ctx.self
        || ctx.enemy.side === ctx.self.side) return ctx.raw;
      if (ctx.damageType === "true" && ctx.ability !== undefined && EXCLUDED_TRUE_DAMAGE.has(ctx.ability)) return ctx.raw;
      const owner = ctx.world.units[ctx.enemy.side];
      if (!owner || owner.side === ctx.self.side) return ctx.raw;
      const targetMaximum = derive(ctx.self).maxHp;
      const ownerMaximum = derive(owner).maxHp;
      if (!(targetMaximum > 0) || !(ownerMaximum > 0)) return ctx.raw;
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
      if (increase === 0 || ctx.raw === 0) return ctx.raw;

      // Since V26.09, outgoing damage increases share an additive bucket. The
      // engine applies that bucket after this hook, so compensate for the source
      // factor already scheduled there. Use the actual packet source's modifiers:
      // only Last Stand's health condition belongs to the champion owner.
      // Match mitigate() exactly: true damage ignores outgoing reductions.
      const outgoing = 1 + derive(ctx.enemy).damageDealt.reduce((sum, modifier) =>
        sum + (ctx.damageType === "true" ? Math.max(0, modifier) : modifier), 0);
      if (!Number.isFinite(outgoing)) throw new Error("Health-threshold rune outgoing damage multiplier must be finite");
      if (outgoing <= 0) {
        if (outgoing + increase <= 0) return ctx.raw;
        // A raw-damage adapter cannot recover damage through the engine's zero
        // outgoing factor (or negative factor followed by its nonnegative clamp).
        // Reject this unsupported case instead of silently dropping the rune.
        throw new Error("Health-threshold runes cannot amplify a nonpositive existing outgoing damage multiplier");
      }
      // Keep the engine's current flat-reduction / victim-hook order. This adapter
      // establishes additive stacking, not an independently verified phase order.
      // Existing item amplifiers implemented as raw hooks retain their current
      // composition; only the engine's damageDealt status bucket is shared here.
      return ctx.raw * ((outgoing + increase) / outgoing);
    },
  }];
}
