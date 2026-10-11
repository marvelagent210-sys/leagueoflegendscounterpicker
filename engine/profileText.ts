/** Fight profiles in words: what the interaction ledger knows about each ability. */
import type { AbilityProfile } from "./profiles";

export interface ProfileDescription {
  /** The wiki's interaction flags and how the ability is delivered. */
  delivery: string[];
  /** Crowd control and other effects on the enemy; * marks a condition. */
  applies: string[];
  movement: string[];
  /** States it gives its caster. */
  states: string[];
}

export function describeProfileAbility(ability: AbilityProfile): ProfileDescription {
  const d = ability.delivery;
  return {
    delivery: [
      d.projectile && `projectile ${d.projectile}`,
      d.spellShield && `spell shield ${d.spellShield}`,
      d.parry && `parry ${d.parry}`,
      d.grounded && `grounded ${d.grounded}`,
      d.knockdown && `knockdown ${d.knockdown}`,
      d.disruptable && `disruptable ${d.disruptable}`,
      d.attack,
    ].filter((f): f is string => Boolean(f)),
    applies: ability.applies.map(
      (a) => `${a.type}${a.variant ? ` (${a.variant})` : ""}${a.duration !== undefined ? ` ${a.duration} s` : ""}${a.amount !== undefined ? ` ${a.amount}%` : ""}${a.condition ? "*" : ""}`,
    ),
    movement: ability.movement.map((m) => `${m.type}${m.interruptible === false ? " (unstoppable)" : ""}${m.condition ? ` ${m.condition}` : ""}`),
    states: ability.states.map((s) => `${s.state}${s.duration !== undefined ? ` ${s.duration} s` : ""}${s.removes ? ` (${s.removes.length} CC types)` : ""}`),
  };
}
