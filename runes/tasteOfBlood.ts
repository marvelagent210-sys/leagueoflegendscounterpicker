/** Taste of Blood's optional self-heal in a manual plain-stat duel. */
import { toTicks } from "../engine/rules/time";
import { heal } from "../engine/sim/combat";
import { derive } from "../engine/sim/derived";
import type { KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";

const LABEL = "Taste of Blood";
const READY = "rune:taste-of-blood:ready";
type Rules = CombatRuneRules["tasteOfBlood"];

export function checkedTasteOfBloodRules(value: unknown): Rules {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${LABEL} requires reviewed rules`);
  const rules = value as Rules;
  const cooldown = toTicks(rules.cooldown);
  if (rules.modelLevel !== 20 || ![rules.heal, rules.bonusAdRatio, rules.apRatio].every(amount => Number.isFinite(amount) && amount > 0)
    || rules.bonusAdRatio > 1 || rules.apRatio > 1 || !Number.isSafeInteger(cooldown) || cooldown <= 0) {
    throw new Error(`${LABEL} requires a valid level-20 heal, bonus AD and AP ratios, and a positive cooldown`);
  }
  return { ...rules };
}

export function buildTasteOfBlood(input: Pick<CombatRuneRules, "tasteOfBlood">): { hooks: KitHooks; assumptions: string[] } {
  const rules = checkedTasteOfBloodRules(input?.tasteOfBlood);
  const cooldown = toTicks(rules.cooldown);
  return {
    hooks: {
      onDamageObserved(ctx) {
        const { self, source, target, world, tick, memory } = ctx;
        if (world.units[self.side] !== self || self.petId !== undefined || self.spec.unitClass === "clone"
          || !self.alive || self.hp <= 0 || self.fallen || self.deathNotified || self.deathDefied || self.resurrection) return;
        if (source.side !== self.side || source.spec.unitClass === "clone" || (source !== self && source.petId === undefined)
          || target.side === self.side || world.units[target.side] !== target || target.petId !== undefined
          || target.spec.unitClass === "clone" || ctx.targetPet) return;
        const acceptedDamage = ctx.amount + ctx.absorbed;
        if (!Number.isFinite(acceptedDamage) || acceptedDamage <= 0 || tick < Number(memory[READY] ?? 0)) return;
        const stats = derive(self);
        if (self.hp >= stats.maxHp) return;
        const amount = rules.heal + rules.bonusAdRatio * stats.bonusAd + rules.apRatio * stats.ap;
        if (!Number.isFinite(amount) || amount <= 0) return;
        memory[READY] = tick + cooldown;
        ctx.log(`${LABEL} triggers`);
        heal(world, self, amount);
      },
    },
    assumptions: [
      "Taste of Blood uses positive native health loss or shield absorption against the opposing champion body. It accepts the owner's body and native ordinary owned pets. Pet attribution and clone-origin exceptions still need live checks.",
      "The heal checks current health after the triggering damage packet and its native vamp, samples current bonus attack damage and ability power, and uses the ordinary heal cap and modifiers.",
      "The 20-second cooldown starts on a qualifying event below full health and belongs to the living champion body across form changes. Fallen, death-defied and resurrecting recipients are outside this manual model.",
    ],
  };
}
