import { isUntargetable } from "../../engine/sim/combat";
import { petEffects } from "../../engine/sim/pets";
import type { Effect, KitHooks } from "../../engine/sim/spec";
import type { Pet } from "../../engine/sim/state";
import type { ItemData } from "../context";
import type { ItemFighter } from "../equip";
import { applyFrom } from "./shared";

/**
 * Cleave: "Basic attacks on-hit deal 40% AD (melee) / 20% AD (ranged) physical damage to other
 * enemies in a 350 radius centered around the target." In a duel the other enemies are the
 * enemy's pets, and, when the holder attacks a pet, the enemy champion. Positions are one
 * dimension: an enemy is within the radius when its edge is.
 */
export function cleave(item: ItemData, fighter: ItemFighter, words: string, lifeSteal = false): KitHooks {
  // "40% AD (melee) / 20% AD (ranged) ... 350 radius": the AD between the share and "(melee)".
  const effect0 = item.effect("Cleave");
  const share = { melee: effect0.quoted(words), ranged: effect0.quoted(words, 1) };
  const radius = effect0.quoted(words, 2);
  item.assume("Cleave reaches enemies whose edge is within its radius of the primary target's center.");
  const effect: Effect = {
    type: "damage",
    damageType: "physical",
    amount: { base: 0, ratios: { AD: (fighter.ranged ? share.ranged : share.melee) / 100 } },
    label: item.label,
    petDamageCategory: "area",
    ...(lifeSteal ? { appliesLifeSteal: true } : { noLifeSteal: true }),
  };
  const splash = (ctx: Parameters<NonNullable<KitHooks["onAttackHit"]>>[0], x: number, primary?: Pet) => {
    for (const pet of [...ctx.world.pets]) {
      if (pet === primary || pet.owner === ctx.self.side || pet.spec.hitPoints || pet.spec.untargetable) continue;
      if (Math.abs(pet.x - x) - pet.spec.radius > radius) continue;
      petEffects(ctx.world, ctx.self, pet, [effect], "area", item.label);
    }
  };
  return {
    onAttackHit(ctx) {
      if (ctx.blocked) return;
      splash(ctx, ctx.enemy.x);
    },
    onAttackPetHit(ctx) {
      if (ctx.blocked) return;
      // The hook's enemy is the pet's stand-in: the champion is the world's other unit.
      const enemy = ctx.world.units.find((unit) => unit.side !== ctx.self.side);
      if (enemy && enemy.alive && !isUntargetable(enemy, ctx.self) && Math.abs(enemy.x - ctx.pet.x) - enemy.spec.base.radius <= radius) applyFrom({ ...ctx, enemy }, item.label, effect);
      splash(ctx, ctx.pet.x, ctx.pet);
    },
  };
}
