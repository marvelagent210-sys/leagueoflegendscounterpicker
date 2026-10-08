/**
 * Corrections to the generated ability profiles, for effects the wiki describes in prose
 * rather than with a keyword or a glossary list. Each entry quotes the ability text or
 * note it rests on; the build fails if the quote is no longer on the wiki page.
 */
import type { Applied, SelfState } from "../engine/profiles";

export interface ProfileOverride {
  champion: string;
  ability: string;
  /** Verbatim text from the ability's description or notes. */
  quote: string;
  addStates?: Array<Omit<SelfState, "evidence">>;
  addApplies?: Array<Omit<Applied, "evidence">>;
  /** Self states the generated profile gets wrong, by type. */
  removeStates?: SelfState["state"][];
  reason: string;
}

export const PROFILE_OVERRIDES: ProfileOverride[] = [
  {
    champion: "Fiora",
    ability: "Riposte",
    quote: "prevents all incoming non-turret damage, and gains debuff immunity",
    addStates: [{ state: "parry", duration: 0.75 }],
    reason: "Riposte's parry is written out rather than marked with a keyword.",
  },
  {
    champion: "Rammus",
    ability: "Defensive Ball Curl",
    quote: "enemies that use a basic attack on-hit against Rammus are dealt",
    addStates: [{ state: "reflect attacks", duration: 7 }],
    reason: "Damage returned to attackers is described in prose.",
  },
];
