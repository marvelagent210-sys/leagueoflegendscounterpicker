/** Scorch's single scheduled burn in a manual plain-stat duel. */
import { toTicks } from "../engine/rules/time";
import { allocateCastInstance, withCastInstance } from "../engine/sim/castInstance";
import { applyEffect } from "../engine/sim/combat";
import type { Effect, KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";

const LABEL = "Scorch";
const READY = "rune:scorch:ready";
type Rules = CombatRuneRules["scorch"];

export function checkedScorchRules(value: unknown): Rules {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${LABEL} requires reviewed rules`);
  const rules = value as Rules;
  if (rules.modelLevel !== 20 || ![rules.damage, rules.delay, rules.cooldown].every(amount => Number.isFinite(amount) && amount > 0)) {
    throw new Error(`${LABEL} requires positive level-20 damage and timers`);
  }
  const delay = toTicks(rules.delay), cooldown = toTicks(rules.cooldown);
  if (!Number.isSafeInteger(delay) || !Number.isSafeInteger(cooldown) || delay <= 0 || cooldown <= delay) {
    throw new Error(`${LABEL} requires a valid delay and a longer cooldown`);
  }
  return { ...rules };
}

export function buildScorch(input: Pick<CombatRuneRules, "scorch">): { hooks: KitHooks; assumptions: string[] } {
  const rules = checkedScorchRules(input?.scorch);
  const cooldown = toTicks(rules.cooldown);
  return {
    hooks: {
      onDamageResolved(ctx) {
        const { world, self, enemy, damage, memory } = ctx;
        if (world.units[self.side] !== self || self.petId !== undefined || self.spec.unitClass === "clone"
          || !self.alive || self.hp <= 0 || self.fallen || self.deathNotified || self.deathDefied || self.resurrection) return;
        if (damage.source.side !== self.side || (damage.source.kind !== "champion" && damage.source.kind !== "pet")
          || damage.target.side !== enemy.side || damage.target.kind !== "champion" || !enemy.alive || enemy.hp <= 0) return;
        if (!Number.isFinite(damage.mitigated) || damage.mitigated <= 0 || damage.tick < Number(memory[READY] ?? 0)) return;
        const scale = damage.spellEffectScale ?? (damage.kind === "spell" ? 1 : 0);
        if (!Number.isFinite(scale) || scale <= 0 || scale > 1) return;

        const burn: Effect = { type: "damage", damageType: "magic", amount: { base: rules.damage * scale }, label: LABEL,
          observedDamageKind: "proc", persistent: true, noLifeSteal: true, petDamageCategory: "proc" };
        memory[READY] = damage.tick + cooldown;
        ctx.log(`${LABEL} ignites ${enemy.spec.name}`);
        const cast = allocateCastInstance(world, self);
        const schedule = () => applyEffect(world, self, enemy, { type: "delayed", delay: rules.delay, effects: [burn] }, { scale: 1 });
        if (cast === undefined) schedule();
        else withCastInstance(world, self, cast, schedule);
      },
    },
    assumptions: [
      "Scorch observes resolved positive native spell damage against the opposing champion body. Native ability-classified pet packets may qualify. The Azir soldier and Bel'Veth Royal Maelstrom exceptions carry their reviewed on-attack effectiveness independently of basic attack classification.",
      "The simulator starts the ten-second cooldown at ignition and schedules one separate periodic magic proc one second later. It uses the normal delayed packet lifecycle, including current mitigation and protection at delivery. It applies no spell effects or life steal.",
      "Ability classification beyond the native event surface, exact live timing, and simultaneous and post-death interactions still need verification.",
    ],
  };
}
