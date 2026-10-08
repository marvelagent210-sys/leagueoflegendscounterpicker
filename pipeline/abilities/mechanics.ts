/**
 * Turns the wiki's {{tip}} keywords in ability descriptions into typed mechanics, with
 * the duration or amount the same sentence states ("stuns them for 1 second",
 * "slowed by 25% for 2 seconds").
 */
import type { Mechanic, MechanicCategory, Series } from "../../engine/abilities";
import { type KeywordSpan, type Marked, displayText } from "./marked";

const MECHANICS: Record<string, readonly [type: string, category: MechanicCategory]> = {
  // Crowd control
  slow: ["slow", "control"],
  slows: ["slow", "control"],
  airborne: ["airborne", "control"],
  stun: ["stun", "control"],
  stuns: ["stun", "control"],
  root: ["root", "control"],
  snare: ["root", "control"],
  ground: ["ground", "control"],
  grounded: ["ground", "control"],
  silence: ["silence", "control"],
  polymorph: ["polymorph", "control"],
  fear: ["fear", "control"],
  fearing: ["fear", "control"],
  flee: ["fear", "control"],
  suppression: ["suppression", "control"],
  taunt: ["taunt", "control"],
  sleep: ["sleep", "control"],
  charm: ["charm", "control"],
  cripple: ["cripple", "control"],
  disarm: ["disarm", "control"],
  "disarming crowd control": ["disarm", "control"],
  blind: ["blind", "control"],
  nearsight: ["nearsight", "control"],
  knockdown: ["knockdown", "control"],
  kinematics: ["drag", "control"],
  berserk: ["berserk", "control"],
  drowsy: ["drowsy", "control"],
  // Movement
  dash: ["dash", "movement"],
  dashes: ["dash", "movement"],
  lunge: ["dash", "movement"],
  blink: ["blink", "movement"],
  blinks: ["blink", "movement"],
  teleport: ["teleport", "movement"],
  ghosted: ["ghosted", "movement"],
  ghosting: ["ghosted", "movement"],
  ghost: ["ghosted", "movement"],
  attach: ["attach", "movement"],
  // Defense
  shield: ["shield", "defense"],
  shields: ["shield", "defense"],
  "spell shield": ["spell shield", "defense"],
  heal: ["heal", "defense"],
  heals: ["heal", "defense"],
  healing: ["heal", "defense"],
  "health regeneration": ["heal", "defense"],
  "life steal": ["life steal", "defense"],
  "applies life steal": ["life steal", "defense"],
  "applies lifesteal": ["life steal", "defense"],
  omnivamp: ["omnivamp", "defense"],
  "spell vamp": ["omnivamp", "defense"],
  untargetable: ["untargetable", "defense"],
  vanish: ["untargetable", "defense"],
  invulnerable: ["invulnerable", "defense"],
  invulnerability: ["invulnerable", "defense"],
  stasis: ["stasis", "defense"],
  "stasis (buff)": ["stasis", "defense"],
  "cc-immune": ["cc-immune", "defense"],
  "displacement immunity": ["displacement-immune", "defense"],
  "displacement immune": ["displacement-immune", "defense"],
  "slow-immune": ["slow-immune", "defense"],
  unstoppable: ["cc-immune", "defense"],
  cleanse: ["cleanse", "defense"],
  tenacity: ["tenacity", "defense"],
  resurrection: ["revive", "defense"],
  "zombie state": ["revive", "defense"],
  "damage reduction": ["damage reduction", "defense"],
  dodge: ["dodge", "defense"],
  parry: ["parry", "defense"],
  block: ["block", "defense"],
  // Vision
  camouflage: ["camouflage", "vision"],
  invisibility: ["invisible", "vision"],
  invisible: ["invisible", "vision"],
  sight: ["reveal", "vision"],
  "standard sight": ["reveal", "vision"],
  "true sight": ["true sight", "vision"],
  "unobstructed vision": ["reveal", "vision"],
  // Offense
  "on-hit": ["on-hit", "offense"],
  "on-attack": ["on-attack", "offense"],
  "basic attack reset": ["attack reset", "offense"],
  "critical strike": ["critical strike", "offense"],
  "critically strike": ["critical strike", "offense"],
  "critical strikes": ["critical strike", "offense"],
  execute: ["execute", "offense"],
  poison: ["damage over time", "offense"],
  "persistent damage": ["damage over time", "offense"],
  "grievous wounds": ["grievous wounds", "offense"],
  "uncancellable windup": ["uncancellable windup", "offense"],
  // Other mechanics that matter in fights
  channel: ["channel", "other"],
  channels: ["channel", "other"],
  interrupt: ["interrupt", "other"],
  projectile: ["projectile", "other"],
  projectiles: ["projectile", "other"],
  tether: ["tether", "other"],
  lockout: ["lockout", "other"],
  disrupt: ["disrupt", "other"],
  "stealthed trap": ["trap", "other"],
  pet: ["summon", "other"],
  clone: ["summon", "other"],
  terrain: ["terrain", "other"],
  brush: ["brush", "other"],
  size: ["size change", "other"],
  brittle: ["brittle", "other"],
};

/** Mechanics whose sentence's "for N seconds" is the mechanic's own duration. */
const TIMED_CATEGORIES = new Set<MechanicCategory>(["control", "defense", "vision"]);
const TIMED_TYPES = new Set(["ghosted", "channel", "tether", "lockout"]);

const VALUE = String.raw`(⟦\d+⟧|\d+(?:\.\d+)?)`;
const DURATION_AFTER = new RegExp(String.raw`^[^.;]*?\b(?:for|over) (?:up to |the next )?${VALUE}\s*(?:seconds?|s)\b`);
const DURATION_BEFORE = new RegExp(String.raw`${VALUE}-second\s*$`);
const AMOUNT_AFTER = new RegExp(String.raw`^[^.;]*?\bby ${VALUE}\s*%`);

function seriesAt(token: string | undefined, marked: Marked): Series | undefined {
  if (token === undefined) return undefined;
  const placeholder = /^⟦(\d+)⟧$/.exec(token);
  if (placeholder) return marked.series[Number(placeholder[1])];
  const value = Number(token);
  return Number.isFinite(value) ? { kind: "constant", value } : undefined;
}

/** True when text[index] ends a sentence: ! ? or a newline, or a period followed by whitespace or the end. */
function endsSentence(text: string, index: number): boolean {
  const ch = text[index];
  if (ch === "!" || ch === "?" || ch === "\n") return true;
  if (ch !== ".") return false;
  const next = text[index + 1];
  return next === undefined || /\s/.test(next);
}

/** The sentence around [start, end). A decimal point ("0.5") doesn't end a sentence. */
function sentenceAround(text: string, start: number, end: number): { start: number; end: number } {
  let from = start;
  while (from > 0 && !endsSentence(text, from - 1)) from--;
  let to = end;
  while (to < text.length && !endsSentence(text, to)) to++;
  return { start: from, end: Math.min(text.length, to + 1) };
}

/**
 * Words before a keyword that make it a condition, a removal or something done to the
 * caster rather than an effect the ability applies: "if she is grounded", "cleanses
 * himself of all slows", "knocked down by any immobilizing crowd control".
 */
const CONDITIONAL = /\b(?:if|unless|cannot|can't|immune to|is not|are not|isn't|aren't|whether|any|remov\w*|cleans\w*|ignor\w*|immun\w*)\b/i;
const CONDITIONAL_AFTER = /^\s*(?:by any|from any)\b/i;

/**
 * True when the keyword sits inside the conditional clause itself ("if she is grounded"),
 * not in the main clause that follows it ("if …, they become grounded").
 */
function isConditional(before: string): boolean {
  const matches = [...before.matchAll(new RegExp(CONDITIONAL.source, "gi"))];
  const last = matches.at(-1);
  if (!last) return false;
  const afterWord = before.slice((last.index ?? 0) + last[0].length);
  return !/[,;:]|\bthen\b/.test(afterWord);
}
/** Phrases that point back to a duration stated earlier in the sentence. */
const SAME_DURATION = /\b(?:for the (?:same )?duration|during which|for a duration|over the duration|for that duration)\b/i;

export function mechanicsOf(marked: Marked): Mechanic[] {
  const mechanics: Mechanic[] = [];
  for (const span of marked.keywords) {
    const known = MECHANICS[span.keyword];
    if (!known) continue;
    const [type, category] = known;
    const sentence = sentenceAround(marked.text, span.start, span.end);
    const after = marked.text.slice(span.end, sentence.end);
    const before = marked.text.slice(sentence.start, span.start);
    const timed = TIMED_CATEGORIES.has(category) || TIMED_TYPES.has(type);
    let durationToken = DURATION_AFTER.exec(after)?.[1] ?? DURATION_BEFORE.exec(before)?.[1];
    // Defensive states often state the duration first: "enters Evasion for 2 seconds: … dodge".
    const earlierCounts = category === "defense" || SAME_DURATION.test(after + before.slice(-40));
    if (durationToken === undefined && earlierCounts) {
      // "stasis for 2.5 seconds, as well as stunning them for the same duration"
      const earlier = [...before.matchAll(new RegExp(String.raw`\bfor (?:up to )?${VALUE}\s*(?:seconds?|s)\b`, "g"))];
      durationToken = earlier.at(-1)?.[1];
    }
    const duration = timed ? seriesAt(durationToken, marked) : undefined;
    const amount = type === "slow" || type === "cripple" ? seriesAt(AMOUNT_AFTER.exec(after)?.[1], marked) : undefined;
    mechanics.push({
      type,
      category,
      wording: span.wording,
      duration,
      amount,
      evidence: displayText({ text: marked.text.slice(sentence.start, sentence.end), series: marked.series }),
      conditional: isConditional(before) || CONDITIONAL_AFTER.test(after),
    });
  }
  return mechanics;
}

/** Keywords seen in descriptions that aren't mechanics (champion, minion, cooldown...). */
export function isMechanicKeyword(span: KeywordSpan): boolean {
  return span.keyword in MECHANICS;
}
