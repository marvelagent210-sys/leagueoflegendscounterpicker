/**
 * Builds a fight profile for every ability and each champion's basic attacks, joining
 * three sources:
 *   - the ability record (the wiki's interaction flags, numbers and description keywords);
 *   - the wiki's glossary lists (which abilities dash, grant untargetability, apply each
 *     crowd control type, ...), which decide what an ability does;
 *   - curated overrides in kits/, each resting on a quote from the wiki page.
 * Descriptions supply durations and amounts. Where they name an effect the lists don't,
 * the effect is kept with the description as evidence and listed in the report.
 */
import type { AbilityRecord, Mechanic, Series } from "../../engine/abilities";
import { GLOSSARY_LISTS, type Glossary, type GlossaryEntry, type GlossaryList } from "../../engine/glossary";
import {
  type AbilityProfile,
  type Applied,
  type BasicAttackProfile,
  type Delivery,
  type Evidence,
  type KitProfile,
  type Movement,
  type SelfState,
  type SelfStateType,
  triOf,
} from "../../engine/profiles";
import { statsAtLevel } from "../../engine/stats";
import type { Champion } from "../../engine/types";
import { ATTACK_FORMS } from "../../kits/attacks";
import { PROFILE_OVERRIDES } from "../../kits/overrides";

const LEVEL = 20;

/** The value an ability has at max rank and level 20. */
export function valueAt20(series: Series | undefined): number | undefined {
  if (!series) return undefined;
  if (series.kind === "constant") return series.value;
  if (series.kind === "rank") return series.values.at(-1);
  if (series.kind === "level") return series.values[LEVEL - 1] ?? series.values.at(-1);
  // Values that depend on level reach their last step by 20; values that depend on
  // something else (bonus attack speed, stacks, AP) are taken with none of it.
  const value = /level/i.test(series.variable) ? series.values.at(-1) : series.values[0];
  return typeof value === "number" ? value : undefined;
}

function round(value: number | undefined): number | undefined {
  return value === undefined ? undefined : Number(value.toPrecision(6));
}

function fieldAt20(record: AbilityRecord, field: keyof AbilityRecord["fields"]): number | undefined {
  const value = record.fields[field];
  if (typeof value !== "object") return undefined;
  if (field === "castTime" && /^\s*none\s*$/i.test(value.text)) return 0;
  return round(valueAt20(value.values[0]?.series));
}

const KNOWN_TARGETING = new Set(["auto", "direction", "location", "unit", "passive", "proximity", "self", "vector", "ground", "none"]);

const pageEvidence = (record: AbilityRecord, quote?: string): Evidence => ({
  page: record.page.title,
  revid: record.page.revid,
  ...(quote ? { quote } : {}),
});

/** A spell shield flag written as prose ("will block the damage.") still means it is blocked, at least in part. */
function spellShieldOf(flag: string | undefined) {
  return triOf(flag) ?? (flag && /\bwill (?:not )?block\b/i.test(flag) ? "partly" : undefined);
}

const EMPOWERS_ATTACK =
  /\bempowers? (?:his|her|its|their) next (?:two |three |\d+ )?(?:basic )?attacks?\b|\b(?:his|her|its|their) next (?:basic )?attack\b|\bnext basic attack\b/i;
const ATTACK_MODIFIER = /\bbasic attacks?\b/i;

/** Parts that are always on ("Passive:", "Innate:"). Unlabeled paragraphs continue the part before them. */
const PASSIVE_PART = /^(?:passive|innate)\b/i;

function castParts(record: AbilityRecord): AbilityRecord["parts"] {
  if (record.kind === "I") return [];
  let label = "";
  return record.parts.filter((part) => {
    label = part.label ?? (label || part.text);
    return !PASSIVE_PART.test(label);
  });
}

function attackRelation(record: AbilityRecord, onHit: boolean, parry: string | undefined): Delivery["attack"] {
  const active = castParts(record);
  if (active.some((part) => EMPOWERS_ATTACK.test(part.text))) return "attack";
  const everyAttack = record.parts.some((part) => ATTACK_MODIFIER.test(part.text));
  if ((record.kind === "I" || active.length === 0) && everyAttack && (onHit || parry !== undefined)) return "attack modifier";
  if (onHit) return "on-hit";
  return undefined;
}

function deliveryOf(record: AbilityRecord): Delivery {
  const flags = record.flags;
  const onHit =
    /^(?:true|special)$/.test(flags.onHitEffects ?? "") ||
    record.parts.some((part) => part.mechanics.some((m) => m.type === "on-hit" && !m.conditional));
  const delivery: Delivery = {
    targeting: flags.targeting.map((t) => t.toLowerCase()).filter((t) => KNOWN_TARGETING.has(t)),
    affectsEnemies: flags.affects.some((a) => /enem/i.test(a)) || flags.affects.length === 0,
  };
  const set = <K extends keyof Delivery>(key: K, value: Delivery[K] | undefined) => {
    if (value !== undefined) delivery[key] = value;
  };
  set("projectile", triOf(flags.projectile));
  set("spellShield", spellShieldOf(flags.spellShield));
  set("parry", triOf(flags.parry));
  set("grounded", triOf(flags.grounded));
  set("knockdown", triOf(flags.knockdown));
  set("disruptable", triOf(flags.silence));
  set("attack", attackRelation(record, onHit, flags.parry));
  return delivery;
}

/** Mechanics of a record that apply (not merely mention) their effect. */
function applied(record: AbilityRecord): Mechanic[] {
  return record.parts.flatMap((part) => part.mechanics).filter((m) => !m.conditional);
}

/** First "for N seconds" / "over N seconds" / "N-second" in a sentence. */
function secondsIn(text: string): number | undefined {
  const match = /\b(?:for|over) (?:up to |the next |the first )?(\d+(?:\.\d+)?) seconds?\b|\b(\d+(?:\.\d+)?)-second\b/i.exec(text);
  const value = match?.[1] ?? match?.[2];
  return value === undefined ? undefined : Number(value);
}

/** Duration of a state: the sentence that names it, else a leveling row such as "Barrier Duration". */
function durationNear(record: AbilityRecord, words: RegExp): number | undefined {
  for (const part of record.parts) {
    for (const sentence of part.text.split(/(?<=\.)\s+|\n/)) {
      if (!words.test(sentence)) continue;
      const seconds = secondsIn(sentence);
      if (seconds !== undefined) return seconds;
    }
  }
  const rows = record.parts.flatMap((part) => part.leveling).filter((row) => /duration/i.test(row.label));
  const row = rows.find((r) => words.test(r.label)) ?? (rows.length === 1 ? rows[0] : undefined);
  return round(valueAt20(row?.amount.base));
}

/** A sentence that applies its effect only under a condition: "If Riposte negates ..., Fiora stuns". */
const CONDITIONAL_SENTENCE = /^(?:if|unless|should)\b/i;

/** Sentences about the caster under crowd control, or about marks that react to it. */
const CASTER_DISABLED =
  /\b(?:is|are|was|were|be|being|becomes?|been)\s+(?:\w+,?\s+){0,3}(?:immobilized|grounded|polymorphed|silenced|stunned|rooted)\b|\b(?:while|even while) (?:silenced|grounded|rooted|stunned|disarmed)\b|\b(?:immobilizing effects|polymorphs) against\b|\bstunned by\b|\bnot rendering them\b/i;

/**
 * A leveling row that gives this effect's duration: "<Type> Duration", else a "Disable
 * Duration" row or the only duration row of the part that applies the effect (Lulu's W
 * polymorphs and disarms for its "Disable Duration"), else the ability's only duration row.
 */
function levelingDuration(record: AbilityRecord, type: string, mechanic?: Mechanic): number | undefined {
  const durations = (rows: AbilityRecord["parts"][number]["leveling"]) =>
    rows.filter((row) => /duration/i.test(row.label) && row.amount.base);
  const all = durations(record.parts.flatMap((part) => part.leveling));
  const own = all.find((row) => row.label.toLowerCase().includes(type));
  if (own) return round(valueAt20(own.amount.base));
  const part = mechanic ? record.parts.find((p) => p.mechanics.includes(mechanic)) : undefined;
  const local = part ? durations(part.leveling) : [];
  const row =
    local.find((r) => /disable|crowd control/i.test(r.label)) ??
    (local.length === 1 ? local[0] : undefined) ??
    (all.length === 1 ? all[0] : undefined);
  return round(valueAt20(row?.amount.base));
}

/** Glossary qualifiers that keep an effect off enemy champions in a 1v1. */
const NOT_ON_ENEMY_CHAMPIONS = /\((?:self|self\/allies|to ally|ally cast|to non-champions|to monsters|to minions and monsters)\)/i;

/** The sources page's sub-lists, in the profile's crowd control vocabulary. */
const CC_MECHANIC_TYPES: Record<string, string> = {
  "attack speed reduction": "attack speed slow",
  "fear / flee": "fear",
  // Flat movement speed reductions (Lulu's W, Shaco's W) are listed under Slow.
  "movement speed reductions": "slow",
};

function ccTypeOf(label: string): { type: string; variant?: string } {
  if (label.startsWith("airborne: ")) return { type: "airborne", variant: label.slice("airborne: ".length) };
  return { type: CC_MECHANIC_TYPES[label] ?? label };
}

/** Crowd control and debuffs the ability puts on the enemy champion. */
function appliesOf(record: AbilityRecord, entries: GlossaryEntry[], glossaryEvidence: (entry: GlossaryEntry) => Evidence): Applied[] {
  const result: Applied[] = [];
  const control = record.parts.flatMap((part) => part.mechanics).filter((m) => m.category === "control");
  const mechanics = control.filter((m) => !m.conditional);
  const fromList = new Set<string>();
  // Types the lists give for this ability only against non-champions or allies.
  const excluded = new Set<string>();
  for (const entry of entries) {
    if (entry.list !== "crowdControl" || !entry.label || entry.label === "reloading") continue;
    const { type, variant } = ccTypeOf(entry.label);
    if (entry.qualifier && NOT_ON_ENEMY_CHAMPIONS.test(entry.qualifier)) {
      excluded.add(type);
      continue;
    }
    const listed = result.find((item) => item.type === type);
    if (listed) {
      // Listed under two kinds of displacement (Darius's E is a knock up and a pull).
      if (variant && listed.variant && !listed.variant.split(", ").includes(variant)) listed.variant += `, ${variant}`;
      continue;
    }
    fromList.add(type);
    // The description gives the duration; an effect it states only under a condition
    // ("If Riposte negates ... Fiora stuns the target") keeps that condition.
    const mechanic = mechanics.find((m) => m.type === type) ?? control.find((m) => m.type === type);
    const item: Applied = { type, evidence: [glossaryEvidence(entry)] };
    if (variant) item.variant = variant;
    // Durations the description leaves to the leveling table under another effect's name
    // ("disarms" with a "Polymorph Duration" row) or a plain "Duration" row.
    const duration = round(valueAt20(mechanic?.duration)) ?? (type === "slow" ? undefined : levelingDuration(record, type, mechanic));
    if (duration !== undefined) item.duration = duration;
    const amount = round(valueAt20(mechanic?.amount));
    if (amount !== undefined) item.amount = amount;
    if (entry.qualifier && !/^\((?:self and enemies|self, allies, and enemies|self and target)\)$/i.test(entry.qualifier)) {
      item.condition = entry.qualifier;
    } else if (mechanic && (mechanic.conditional || CONDITIONAL_SENTENCE.test(mechanic.evidence))) {
      item.condition = mechanic.evidence;
    }
    if (mechanic) item.evidence.push(pageEvidence(record, mechanic.evidence));
    result.push(item);
  }
  // "stuns the target for the same duration instead": the duration of the effect stated before it.
  for (const [index, item] of result.entries()) {
    const sentence = item.evidence.find((e) => e.page === record.page.title)?.quote ?? "";
    if (item.duration !== undefined || !/same duration/i.test(sentence)) continue;
    const earlier = result.slice(0, index).reverse().find((other) => other.duration !== undefined);
    if (earlier?.duration !== undefined) item.duration = earlier.duration;
  }
  for (const type of excluded) fromList.add(type);
  // Effects the description applies that the crowd control lists don't name for this ability,
  // leaving out sentences about the caster being disabled ("if Akshan ... becomes grounded").
  for (const mechanic of mechanics) {
    if (fromList.has(mechanic.type) || mechanic.type === "drag" || mechanic.type === "knockdown") continue;
    if (CONDITIONAL_SENTENCE.test(mechanic.evidence) || CASTER_DISABLED.test(mechanic.evidence)) continue;
    if (!record.flags.affects.some((a) => /enem/i.test(a)) && record.flags.affects.length > 0) continue;
    fromList.add(mechanic.type);
    const item: Applied = { type: mechanic.type, evidence: [pageEvidence(record, mechanic.evidence)] };
    const duration = round(valueAt20(mechanic.duration));
    if (duration !== undefined) item.duration = duration;
    const amount = round(valueAt20(mechanic.amount));
    if (amount !== undefined) item.amount = amount;
    result.push(item);
  }
  for (const entry of entries) {
    if (entry.list === "dashCancel") {
      const duration = durationNear(record, /aura|dash/i);
      result.push({ type: "dash cancel", ...(duration !== undefined ? { duration } : {}), evidence: [glossaryEvidence(entry)] });
    } else if (entry.list === "grievousWounds") {
      result.push({ type: "grievous wounds", ...(entry.qualifier ? { condition: entry.qualifier } : {}), evidence: [glossaryEvidence(entry)] });
    } else if (entry.list === "trueSight") {
      result.push({ type: "reveal", evidence: [glossaryEvidence(entry)] });
    } else if (entry.list === "knockdown") {
      result.push({ type: "knockdown", evidence: [glossaryEvidence(entry)] });
    }
  }
  return result;
}

function movementOf(record: AbilityRecord, entries: GlossaryEntry[], glossaryEvidence: (entry: GlossaryEntry) => Evidence): Movement[] {
  const knockdown = triOf(record.flags.knockdown);
  const interruptedByCC = entries.some((entry) => entry.list === "dashInterruptibleByCC");
  const result: Movement[] = [];
  for (const entry of entries) {
    const type = entry.list === "dash" ? "dash" : entry.list === "blink" ? "blink" : entry.list === "lunge" ? "lunge" : undefined;
    if (!type) continue;
    const movement: Movement = { type, evidence: [glossaryEvidence(entry)] };
    if (type === "dash" && entry.label) movement.targeting = entry.label;
    if (entry.qualifier) movement.condition = entry.qualifier;
    if (type !== "blink" && knockdown !== undefined && knockdown !== "partly") movement.interruptible = knockdown === "yes";
    if (type === "dash" && interruptedByCC) movement.interruptedByCC = true;
    result.push(movement);
  }
  return result;
}

/** Self states from the glossary lists, with the description sentence that gives each duration. */
const LIST_STATES: Partial<Record<GlossaryList, { state: SelfStateType; words: RegExp }>> = {
  projectileBlock: { state: "projectile block", words: /projectile|barrier|wall/i },
  spellShield: { state: "spell shield", words: /spell shield/i },
  untargetable: { state: "untargetable", words: /untargetab/i },
  vanish: { state: "untargetable", words: /vanish|untargetab/i },
  stasis: { state: "stasis", words: /stasis/i },
  invulnerable: { state: "invulnerable", words: /invulnerab/i },
  minimumHealth: { state: "minimum health", words: /minimum health/i },
  resurrection: { state: "resurrection", words: /resurrection/i },
  slowImmune: { state: "slow immune", words: /slow.immun/i },
  tenacity: { state: "tenacity", words: /tenacity/i },
  camouflage: { state: "camouflage", words: /camouflage/i },
  invisibility: { state: "invisible", words: /invisib/i },
};

/** Self states read from description keywords, for effects no glossary list covers. */
const MECHANIC_STATES: Record<string, SelfStateType> = {
  dodge: "dodge attacks",
  block: "block attacks",
  "cc-immune": "cc immune",
  "displacement-immune": "displacement immune",
  "slow-immune": "slow immune",
  tenacity: "tenacity",
  "damage reduction": "damage reduction",
  shield: "shield",
  heal: "heal",
  "life steal": "heal",
  omnivamp: "heal",
};

/** "becoming immune to them", "gains crowd control immunity": the caster gaining immunity, which the keyword reader can mistake for a condition. */
const GAINS_IMMUNITY =
  /\b(?:gain(?:s|ing)?|becom(?:es|ing)|grant(?:s|ing)? (?:himself|herself|itself|themselves)|with)\b[^.]{0,40}\b(?:immun\w*|unstoppable)\b/i;

/** Someone else gets the state: "rendering them untargetable", "the target is ... rendered untargetable". */
const OTHERS_GET_IT =
  /\b(?:render(?:s|ed|ing)?|puts?|putting|mak(?:es|ing))\s+(?:them|the target|it|enemies|units|allies|the oathsworn)\b|\bthe (?:target|oathsworn|ally|enemy)\b[^,;]*?\b(?:is|are|becomes?)\b|\benemies(?: hit)? (?:are|become)\b/i;
/** Sentences about other units: "Epic monsters and turrets are affected ...", "Enemies hit ...". */
const OTHER_SUBJECT = /^(?:\w+(?: \w+)?: )?(?:the target|target|enemies|enemy|epic monsters|monsters|minions|turrets|allies|allied|nearby allies|units)\b/i;
const PRONOUNS = /\b(?:he|she|they|himself|herself|themselves)\b/i;

/**
 * Whether the state a sentence names (at `index`) is the caster's own: "Fizz dashes ... while
 * becoming untargetable", not "the target is attached to Tahm Kench and is rendered
 * untargetable". "All units inside the zone" (Kindred's R) includes the caster.
 */
function aboutCaster(sentence: string, index: number, names: string[]): boolean {
  const before = sentence.slice(0, Math.max(0, index));
  if (OTHERS_GET_IT.test(before)) return false;
  if (/^(?:\w+(?: \w+)?: )?all units\b/i.test(sentence)) return true;
  const caster = names.some((name) => before.includes(name)) || PRONOUNS.test(before);
  if (OTHER_SUBJECT.test(sentence) && !caster) return false;
  return true;
}

/** The champion's name and its longer words, as the descriptions write them ("Tahm Kench", "Kench"). */
function casterNames(championName: string): string[] {
  const words = championName.split(/[\s&]+/).filter((word) => word.length >= 3 && !/^(?:the|and)$/i.test(word));
  return [championName, ...words];
}

/**
 * For a state the glossary lists for this ability: is it the caster's? Decided from the
 * sentence that names it, which is returned as evidence.
 */
function listStateSentence(record: AbilityRecord, words: RegExp, note: string | undefined, names: string[]): { caster: boolean; sentence?: string } {
  for (const part of record.parts) {
    for (const sentence of part.text.split(/(?<=\.)\s+|\n/)) {
      const match = words.exec(sentence);
      if (match) return { caster: aboutCaster(sentence, match.index, names), sentence };
    }
  }
  return { caster: !(note && /\bto (?:units|the target|enemies)\b|non-champion targets/i.test(note)) };
}

/** Innates that act only after the champion takes fatal damage (zombie states, revives). */
const AFTER_DEATH = /\bfatal damage\b|\blethal damage\b|\bzombie state\b|\bresurrection\b/i;

function statesOf(
  record: AbilityRecord,
  championName: string,
  entries: GlossaryEntry[],
  cleanses: Map<string, string[]>,
  glossaryEvidence: (entry: GlossaryEntry) => Evidence,
): SelfState[] {
  const states = collectStates(record, championName, entries, cleanses, glossaryEvidence);
  // Kog'Maw's and Karthus's zombie states make them immune to everything, but only after death.
  if (record.kind === "I" && record.parts.some((part) => AFTER_DEATH.test(part.text))) {
    for (const state of states) state.condition ??= "Only after taking fatal damage.";
  }
  return states;
}

function collectStates(
  record: AbilityRecord,
  championName: string,
  entries: GlossaryEntry[],
  cleanses: Map<string, string[]>,
  glossaryEvidence: (entry: GlossaryEntry) => Evidence,
): SelfState[] {
  const names = casterNames(championName);
  const states: SelfState[] = [];
  const add = (state: SelfState) => {
    const existing = states.find((s) => s.state === state.state);
    if (existing) {
      existing.evidence.push(...state.evidence);
      existing.duration ??= state.duration;
      existing.amount ??= state.amount;
      return;
    }
    states.push(state);
  };
  for (const entry of entries) {
    const known = LIST_STATES[entry.list];
    if (!known) continue;
    if (entry.note && /does not grant untargetability|non-champion targets/i.test(entry.note)) continue;
    if (entry.qualifier && /\((?:to ally|ally cast|to non-champions)\)/i.test(entry.qualifier)) continue;
    // Lists name the ability, not who gets the state: Kalista's R protects her Oathsworn, Tahm Kench's R the unit he devours.
    const found = listStateSentence(record, known.words, entry.note, names);
    if (!found.caster) continue;
    const state: SelfState = {
      state: known.state,
      evidence: [glossaryEvidence(entry), ...(found.sentence ? [pageEvidence(record, found.sentence)] : [])],
    };
    const duration = durationNear(record, known.words);
    if (duration !== undefined) state.duration = duration;
    if (entry.note) state.note = entry.note;
    if (entry.qualifier) state.condition = entry.qualifier;
    add(state);
    if (known.state === "stasis") add({ state: "untargetable", duration, evidence: [glossaryEvidence(entry)] });
  }
  const removes = cleanses.get(`${record.champion}/${record.name}`);
  if (removes) {
    add({ state: "cleanse", removes, evidence: [{ page: "Types of Crowd Control/Summary" }] });
  }
  for (const mechanic of record.parts.flatMap((part) => part.mechanics)) {
    const state = MECHANIC_STATES[mechanic.type];
    if (!state) continue;
    const immunity = state === "cc immune" || state === "displacement immune" || state === "slow immune";
    if (mechanic.conditional && !(immunity && GAINS_IMMUNITY.test(mechanic.evidence))) continue;
    // States the ability gives other units ("the target is ... rendered displacement immune") aren't the caster's.
    const at = mechanic.evidence.toLowerCase().indexOf(mechanic.wording.toLowerCase());
    if (!aboutCaster(mechanic.evidence, at < 0 ? mechanic.evidence.length : at, names)) continue;
    const item: SelfState = { state, evidence: [pageEvidence(record, mechanic.evidence)] };
    const duration = round(valueAt20(mechanic.duration)) ?? (state === "tenacity" ? secondsIn(mechanic.evidence) : undefined);
    if (duration !== undefined) item.duration = duration;
    const percent = state === "tenacity" ? /(\d+(?:\.\d+)?)% tenacity/.exec(mechanic.evidence)?.[1] : undefined;
    if (percent !== undefined) item.amount = Number(percent);
    add(item);
  }
  return states;
}

function channelOf(entries: GlossaryEntry[], glossaryEvidence: (entry: GlossaryEntry) => Evidence) {
  const channels = entries
    .filter((entry) => entry.list === "channel" || entry.list === "charged")
    .map((entry) => ({ type: entry.list === "charged" ? "charged" : (entry.label ?? "normal"), evidence: [glossaryEvidence(entry)] }));
  return channels.length > 0 ? channels : undefined;
}

/** Abilities that make basic attacks stronger: attack speed, attack damage, critical strikes. */
const BOOSTS_ATTACKS = /\bbonus attack speed\b|\bbonus attack damage\b|\bcritical strike chance\b/i;

/** Notes worth showing next to an interaction. */
const INTERACTION_NOTE =
  /projectile|missile|intercept|wind wall|spell shield|parr(?:y|ied|ies)|riposte|dodg|\bblock|blind|untargetab|invulnerab|stasis|grounded|knock(?:ed)? ?down|\bdash|crowd control|cc.immun|immun|cleans|tenacity|interrupt|channel|execut|minimum health|stealth|camouflage|invisib|reveal|on-hit/i;

const NOT_A_CHAMPION_EXECUTE = /\bexecutes? (?:them|minions)\b|\bexecutes minions\b|will be executed\b|\bnon-epic monsters\b/i;

const USABLE_DISABLED = /\b(recast )?can (?:also )?be (?:used|cast) while affected by cast-inhibiting crowd control\b/i;

export interface ProfileBuild {
  kits: KitProfile[];
  /** Effects only the description names (not in any glossary list), for review. */
  descriptionOnly: Array<{ champion: string; ability: string; effect: string; evidence: string }>;
  /** Curated overrides whose quote is missing from the wiki page: must be fixed before release. */
  staleOverrides: string[];
}

export function buildProfiles(champions: Champion[], records: AbilityRecord[], glossary: Glossary): ProfileBuild {
  const entriesFor = new Map<string, GlossaryEntry[]>();
  for (const entry of glossary.entries) {
    const key = `${entry.champion}/${entry.ability}`;
    entriesFor.set(key, [...(entriesFor.get(key) ?? []), entry]);
  }
  const glossaryEvidence = (entry: GlossaryEntry): Evidence => {
    const page = GLOSSARY_LISTS[entry.list];
    const where = [entry.label, entry.qualifier, entry.note].filter(Boolean).join("; ");
    return { page, revid: glossary.pages[page], ...(where ? { quote: where } : {}) };
  };
  const cleanses = new Map<string, string[]>();
  for (const rule of glossary.crowdControl) {
    for (const remover of rule.removedBy) {
      const key = `${remover.champion}/${remover.ability}`;
      cleanses.set(key, [...new Set([...(cleanses.get(key) ?? []), ...rule.types])]);
    }
  }
  const descriptionOnly: ProfileBuild["descriptionOnly"] = [];
  const staleOverrides: string[] = [];
  const kits: KitProfile[] = [];
  for (const champion of champions) {
    const own = records.filter((record) => record.champion === champion.id);
    const abilities = own.map((record) => {
      const entries = entriesFor.get(`${record.champion}/${record.name}`) ?? [];
      const profile: AbilityProfile = {
        champion: record.champion,
        kind: record.kind,
        name: record.name,
        page: record.page,
        damageTypes: [...new Set(record.flags.damageType.flatMap((t) => t.toLowerCase().split(/\s+/)).filter((t) => /^(physical|magic|true)$/.test(t)))],
        delivery: deliveryOf(record),
        applies: appliesOf(record, entries, glossaryEvidence),
        movement: movementOf(record, entries, glossaryEvidence),
        states: statesOf(record, champion.name, entries, cleanses, glossaryEvidence),
      };
      // Abilities with charges (Teemo's R) recharge each one on the recharge timer.
      const cooldown = fieldAt20(record, "recharge") ?? fieldAt20(record, "cooldown") ?? fieldAt20(record, "staticCooldown");
      if (cooldown !== undefined) profile.cooldown = cooldown;
      const castTime = fieldAt20(record, "castTime");
      if (castTime !== undefined) profile.castTime = castTime;
      const ranges = [fieldAt20(record, "targetRange"), fieldAt20(record, "range")].filter((v): v is number => v !== undefined);
      if (ranges.length > 0) profile.range = Math.max(...ranges);
      const speed = fieldAt20(record, "speed");
      if (speed !== undefined) profile.speed = speed;
      const channel = channelOf(entries, glossaryEvidence);
      if (channel) profile.channel = channel;
      // Executes of minions and monsters, and Zac's own bloblet rule, don't matter against a champion.
      const execute = applied(record).filter((m) => m.type === "execute" && !NOT_A_CHAMPION_EXECUTE.test(m.evidence));
      if (execute.length > 0) profile.execute = execute.map((m) => pageEvidence(record, m.evidence));
      const disabled = record.parts.map((part) => USABLE_DISABLED.exec(part.text)).find(Boolean);
      if (disabled) profile.usableWhileDisabled = { which: disabled[1] ? "recast" : "cast", evidence: [pageEvidence(record, disabled[0])] };
      for (const item of profile.applies) {
        if (item.evidence.every((e) => e.page === record.page.title)) {
          descriptionOnly.push({ champion: record.champion, ability: record.name, effect: `applies ${item.type}`, evidence: item.evidence[0]?.quote ?? "" });
        }
      }
      if (record.parts.some((part) => BOOSTS_ATTACKS.test(part.text)) || applied(record).some((m) => m.type === "attack reset")) {
        profile.boostsAttacks = true;
      }
      const notes = record.notes.filter((note) => INTERACTION_NOTE.test(note));
      if (notes.length > 0) profile.notes = notes;
      applyOverrides(profile, record, staleOverrides);
      return profile;
    });
    kits.push(kitProfile(champion, abilities, own, staleOverrides));
  }
  return { kits, descriptionOnly, staleOverrides };
}

function textOf(record: AbilityRecord): string {
  return [...record.parts.map((part) => part.text), ...record.notes].join("\n");
}

function applyOverrides(profile: AbilityProfile, record: AbilityRecord, stale: string[]): void {
  for (const override of PROFILE_OVERRIDES) {
    if (override.champion !== record.champion || override.ability !== record.name) continue;
    if (!textOf(record).includes(override.quote)) {
      stale.push(`${override.champion} ${override.ability}: "${override.quote}" is no longer on ${record.page.title}`);
      continue;
    }
    const evidence = [pageEvidence(record, override.quote)];
    if (override.removeStates) profile.states = profile.states.filter((s) => !override.removeStates?.includes(s.state));
    for (const state of override.addStates ?? []) {
      const existing = profile.states.find((s) => s.state === state.state);
      if (existing) Object.assign(existing, state, { evidence: [...existing.evidence, ...evidence] });
      else profile.states.push({ ...state, evidence });
    }
    for (const item of override.addApplies ?? []) profile.applies.push({ ...item, evidence });
  }
}

function kitProfile(champion: Champion, abilities: AbilityProfile[], records: AbilityRecord[], stale: string[]): KitProfile {
  const base = champion.forms[0];
  if (!base) throw new Error(`${champion.id} has no forms`);
  const modifiers = abilities.filter((a) => a.delivery.attack === "attack modifier").map((a) => a.name);
  const attacks: BasicAttackProfile[] = champion.forms.map((form) => {
    const stats = statsAtLevel(form.stats, LEVEL);
    const range = form.stats.attackRange;
    // Alternate forms can be melee (Mega Gnar); Jayce's base form is his melee Hammer Stance.
    const ranged = champion.rangeType === "Ranged" && range > 250;
    const missile = form.stats.missileSpeed;
    return {
      form: form.id,
      formName: form.name,
      range,
      ranged,
      projectile: ranged && missile !== 0,
      ...(missile ? { missileSpeed: missile } : {}),
      attackSpeed: round(stats.attackSpeed) as number,
      attackDamage: round(stats.attackDamage) as number,
      windup: round(stats.attackWindup) as number,
      modifiers,
    };
  });
  for (const override of ATTACK_FORMS.filter((o) => o.champion === champion.id)) {
    const record = records.find((r) => r.name === override.source.ability);
    if (!record || !textOf(record).includes(override.source.quote)) {
      stale.push(`${champion.id} attack form ${override.form}: "${override.source.quote}" not found`);
      continue;
    }
    const template = attacks[0] as BasicAttackProfile;
    const form: BasicAttackProfile = {
      ...template,
      form: `${template.form}-${override.form.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`,
      formName: override.form,
      range: override.range,
      ranged: override.ranged,
      projectile: override.projectile ?? (override.ranged && template.missileSpeed !== 0),
    };
    if (!override.ranged) delete form.missileSpeed;
    if (override.replacesBase) attacks[0] = { ...form, form: template.form };
    else attacks.push(form);
  }
  // Mini Gnar's attack range grows with level ("Total Range" on his form page).
  for (const record of records.filter((r) => r.kind === "I")) {
    const total = record.parts.flatMap((p) => p.leveling).find((row) => /^total (?:attack )?range$/i.test(row.label));
    const value = round(valueAt20(total?.amount.base));
    if (value !== undefined && attacks[0]) attacks[0].range = value;
  }
  return {
    champion: champion.id,
    name: champion.name,
    gameplayRadius: base.stats.gameplayRadius,
    moveSpeed: base.stats.moveSpeed,
    attacks,
    abilities,
  };
}
