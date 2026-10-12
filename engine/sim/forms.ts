/**
 * Champions with several forms (Mini and Mega Gnar, Jayce's stances, Kled with and without
 * Skaarl, Sion reanimated): each form is a full fighter spec with its own base stats, basic
 * attack and abilities, and a unit changes form by taking another form's spec. Statuses,
 * cooldowns and kit memory carry over; ability keys are unique across forms, so anything
 * still in flight from the old form (a missile, a dash) resolves with its own ability.
 */
import { log } from "./combat";
import { derive } from "./derived";
import type { AbilitySpec, FighterSpec, FormHealth } from "./spec";
import type { Unit, World } from "./state";

/** Every ability of a spec, across its forms (current form first). */
export function allAbilities(spec: FighterSpec): AbilitySpec[] {
  if (!spec.forms) return spec.abilities;
  const others = Object.values(spec.forms).filter((form) => form.form !== spec.form);
  return [...spec.abilities, ...others.flatMap((form) => form.abilities)];
}

/** An ability of the unit by key, in its current form or any other. */
export function abilityOf(unit: Unit, key: string | undefined): AbilitySpec | undefined {
  if (key === undefined) return undefined;
  const own = unit.spec.abilities.find((a) => a.key === key);
  if (own || !unit.spec.forms) return own;
  for (const form of Object.values(unit.spec.forms)) {
    const found = form.abilities.find((a) => a.key === key);
    if (found) return found;
  }
  return undefined;
}

/** Switches the unit to another form; the stat budget's bonus stats come along. */
export function setForm(world: World, unit: Unit, form: string, hp: FormHealth = "share"): void {
  if (unit.spec.form === form) return;
  const next = unit.spec.forms?.[form];
  if (!next) throw new Error(`${unit.spec.name} has no form "${form}"`);
  const before = derive(unit).maxHp;
  const share = before > 0 ? unit.hp / before : 0;
  unit.spec = unit.spec.bonus ? { ...next, bonus: unit.spec.bonus } : next;
  const after = derive(unit).maxHp;
  if (hp === "share") unit.hp = share * after;
  else if (hp === "gain") unit.hp = Math.min(after, unit.hp + Math.max(0, after - before));
  else unit.hp = Math.min(after, hp);
  log(world, unit.side, `becomes ${next.name}`);
}
