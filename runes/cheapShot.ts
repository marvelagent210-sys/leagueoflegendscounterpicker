/** Cheap Shot in manual plain-stat duels. */
import { IMMOBILIZING } from "../engine/rules/crowdControl";
import { toTicks } from "../engine/rules/time";
import { allocateCastInstance, currentCastInstance, withCastInstance } from "../engine/sim/castInstance";
import { applyEffect } from "../engine/sim/combat";
import type { DamageControlSnapshot, Effect, FighterSpec, KitHooks, ResolvedDamageSnapshot } from "../engine/sim/spec";
import type { Side } from "../engine/sim/state";
import type { CombatRuneRules } from "./effectRules";

const LABEL = "Cheap Shot";
const READY = "rune:cheap-shot:ready";
const FROST_PRIME = "rune:cheap-shot:frost-prime";
const FROST_SPENT = "rune:cheap-shot:frost-spent";
const OTHER_CONTROL = new Set(["blind", "disarm", "ground", "nearsight", "polymorph", "silence", "slow", "drowsy"]);
type Rules = CombatRuneRules["cheapShot"];

export function checkedCheapShotRules(value: unknown): Rules {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${LABEL} requires reviewed rules`);
  const rules = value as Rules;
  if (rules.modelLevel !== 20 || !Number.isFinite(rules.damage) || rules.damage <= 0 || !Number.isFinite(rules.cooldown)) {
    throw new Error(`${LABEL} requires positive level-20 damage and a valid cooldown`);
  }
  const cooldown = toTicks(rules.cooldown);
  if (!Number.isSafeInteger(cooldown) || cooldown <= 0) throw new Error(`${LABEL} requires a valid cooldown`);
  return { ...rules };
}

const validControl = (control: DamageControlSnapshot) => IMMOBILIZING.has(control.cc) || OTHER_CONTROL.has(control.cc);

function impairedBeforeHit(damage: ResolvedDamageSnapshot, side: Side): boolean {
  const controls = (damage.controlBeforeDamage ?? []).filter(validControl);
  if (!controls.some(control => control.source === side)) return false;
  return controls.some(control => control.startTick < damage.tick || (
    control.source === side && control.castInstance !== undefined && damage.castInstance !== undefined
    && control.castInstance !== damage.castInstance && !(damage.kind === "basic" && control.basic)
  ));
}

export function buildCheapShot(form: FighterSpec, input: Pick<CombatRuneRules, "cheapShot">): {
  observeDamageControl: true; hooks: KitHooks; assumptions: string[];
} {
  const rules = checkedCheapShotRules(input?.cheapShot);
  const cooldown = toTicks(rules.cooldown), ashe = form.id === "ashe";
  const proc: Effect = { type: "damage", damageType: "true", amount: { base: rules.damage }, label: LABEL,
    observedDamageKind: "proc", petDamageCategory: "proc", noLifeSteal: true };
  const hooks: KitHooks = {
    onDamageResolved(ctx) {
      const { world, self, enemy, damage, memory } = ctx;
      if (world.units[self.side] !== self || self.petId !== undefined || self.spec.unitClass === "clone"
        || !self.alive || self.hp <= 0 || self.fallen || self.deathNotified || self.deathDefied || self.resurrection) return;
      if (damage.source.side !== self.side || (damage.source.kind !== "champion" && damage.source.kind !== "pet")
        || damage.target.kind !== "champion" || damage.target.side !== enemy.side || !enemy.alive || enemy.hp <= 0) return;
      if (!Number.isFinite(damage.mitigated) || damage.mitigated <= 0 || damage.tick < Number(memory[READY] ?? 0)
        || (damage.kind !== "basic" && damage.kind !== "spell" && damage.kind !== "default")) return;

      const frostAttack = ashe && damage.source.kind === "champion" && damage.kind === "basic" && damage.castInstance !== undefined;
      const primed = typeof memory[FROST_PRIME] === "number" && memory[FROST_PRIME] !== damage.castInstance;
      if (!(frostAttack && primed) && !impairedBeforeHit(damage, self.side)) return;
      if (frostAttack) {
        delete memory[FROST_PRIME];
        memory[FROST_SPENT] = damage.castInstance!;
      }
      memory[READY] = damage.tick + cooldown;
      ctx.log(`${LABEL} triggers`);
      const cast = allocateCastInstance(world, self);
      const deliver = () => applyEffect(world, self, enemy, proc, { scale: 1 });
      if (cast === undefined) deliver();
      else withCastInstance(world, self, cast, deliver);
    },
  };
  if (ashe) hooks.onCombatActivity = ctx => {
    const { combatActivity: event, world, self, enemy, tick, memory } = ctx;
    if (event.kind !== "cc" || event.cc !== "slow" || event.source.kind !== "champion" || event.source.side !== self.side
      || event.target.kind !== "champion" || event.target.side !== enemy.side) return;
    const cast = currentCastInstance(world, self);
    if (cast === undefined || cast === memory[FROST_SPENT]) return;
    if (enemy.statuses.some(status => status.kind === "cc" && status.key === "slow" && status.source === self.side
      && status.startTick === tick && status.endTick > tick && status.value > 0 && status.controlCastInstance === cast && status.controlFromBasic)) {
      memory[FROST_PRIME] = cast;
    }
  };
  return {
    observeDamageControl: true,
    hooks,
    assumptions: [
      "Cheap Shot checks active accepted impairment before native damage callbacks and applies a separate true-damage proc after a positive accepted basic, spell, or explicitly default packet. Generic unclassified and proc packets are outside this trigger.",
      "An earlier active impairment or an identified independent cast can qualify. Basic damage shares a cast group for same-tick control eligibility. Ashe's accepted Frost Shot contact prepares a later basic hit, including after the slow expires.",
      "The four-second cooldown begins at activation. Shield-only cases, the exact live drain order, classification of custom packets and attribution across other actors still need live verification.",
    ],
  };
}
