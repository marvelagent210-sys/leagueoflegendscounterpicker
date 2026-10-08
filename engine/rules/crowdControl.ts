/**
 * What each crowd control type does to its target (wiki: "Types of Crowd Control/Summary",
 * the same table the build parses into glossary.json; a test keeps the two in step), and
 * tenacity (wiki: "Tenacity").
 */

export type CCType =
  | "airborne"
  | "berserk"
  | "blind"
  | "charm"
  | "cripple"
  | "disarm"
  | "drowsy"
  | "fear"
  | "ground"
  | "kinematics"
  | "nearsight"
  | "polymorph"
  | "root"
  | "silence"
  | "sleep"
  | "slow"
  | "stasis"
  | "stun"
  | "suppression"
  | "suspension"
  | "taunt";

export interface CCRule {
  /** "disabled", "reduced", "uncontrollable" (forced movement), "partial" or "allowed". */
  movement: "allowed" | "reduced" | "partial" | "disabled" | "uncontrollable";
  attacking: "allowed" | "reduced" | "partial" | "parried" | "disabled" | "uncontrollable";
  /** "partial": movement abilities only (root and ground). */
  abilities: "allowed" | "partial" | "disabled";
  /** "movement": interrupts only channels that move the caster. */
  interruptsChannels: "yes" | "no" | "movement";
  tenacity: boolean;
}

const rule = (
  movement: CCRule["movement"],
  attacking: CCRule["attacking"],
  abilities: CCRule["abilities"],
  interruptsChannels: CCRule["interruptsChannels"],
  tenacity: boolean,
): CCRule => ({ movement, attacking, abilities, interruptsChannels, tenacity });

/** One row per type, transcribed from the wiki's summary table. */
export const CC_RULES: Record<CCType, CCRule> = {
  airborne: rule("disabled", "disabled", "disabled", "yes", false),
  blind: rule("allowed", "parried", "allowed", "no", true),
  cripple: rule("allowed", "reduced", "allowed", "no", true),
  disarm: rule("allowed", "disabled", "allowed", "no", true),
  berserk: rule("uncontrollable", "uncontrollable", "disabled", "yes", true),
  charm: rule("uncontrollable", "disabled", "disabled", "yes", true),
  fear: rule("uncontrollable", "disabled", "disabled", "yes", true),
  taunt: rule("uncontrollable", "uncontrollable", "disabled", "yes", true),
  ground: rule("partial", "allowed", "partial", "movement", true),
  kinematics: rule("partial", "allowed", "allowed", "no", false),
  nearsight: rule("allowed", "partial", "partial", "no", false),
  root: rule("disabled", "allowed", "partial", "movement", true),
  silence: rule("allowed", "allowed", "disabled", "yes", true),
  polymorph: rule("allowed", "disabled", "disabled", "yes", true),
  drowsy: rule("reduced", "allowed", "allowed", "no", false),
  sleep: rule("disabled", "disabled", "disabled", "yes", true),
  slow: rule("reduced", "allowed", "allowed", "no", true),
  stasis: rule("disabled", "disabled", "disabled", "yes", false),
  stun: rule("disabled", "disabled", "disabled", "yes", true),
  suspension: rule("disabled", "disabled", "disabled", "yes", true),
  suppression: rule("disabled", "disabled", "disabled", "yes", false),
};

/** Types that stop the target from acting at all (Riposte's "immobilizing effect"). */
export const IMMOBILIZING: ReadonlySet<CCType> = new Set([
  "airborne",
  "berserk",
  "charm",
  "fear",
  "root",
  "sleep",
  "stasis",
  "stun",
  "suppression",
  "suspension",
  "taunt",
]);

/** Displacement immunity also protects from these (wiki: "Template:Tip data/Displacement immune"). */
export const DISPLACEMENTS: ReadonlySet<CCType> = new Set(["airborne", "kinematics", "sleep", "stasis", "suspension"]);

/**
 * Total tenacity from several sources. Sources stack multiplicatively within their group
 * and the groups add up: 1 - product(1 - t) per group, summed. Negative tenacity (Brittle)
 * is its own group.
 */
export function combineTenacity(groups: number[][]): number {
  return groups.reduce((sum, group) => sum + (1 - group.reduce((product, t) => product * (1 - t), 1)), 0);
}

/** Duration of crowd control after tenacity, for the types tenacity shortens. */
export function ccDuration(duration: number, type: CCType, tenacity: number): number {
  return CC_RULES[type].tenacity ? duration * (1 - tenacity) : duration;
}
