/**
 * Evidence the wiki's ability templates leave out, which kits quote (KitContext.gameQuote and
 * quote): excerpts of the game's data files where the wiki gives no number (a dash speed, a
 * missile's travel time), and wiki text the template parser drops (interaction tables, known
 * issues). The build adds them to the ability records it writes:
 * - every game excerpt is read again from the downloaded character file, with that file's game
 *   version, CommunityDragon URL and SHA-256, so a new patch re-reads it;
 * - every wiki addition names its source, and a note must still be on its ability's template
 *   (its anchor), or the build fails until the note is checked again;
 * - text from another wiki page is pinned to the revision it was read from: a fetch that brings
 *   a newer revision fails the build until the text is checked again.
 */
import { createHash } from "node:crypto";
import type { AbilityRecord } from "../../engine/abilities";

export interface GameExcerpt {
  /** Data Dragon id of the champion whose ability record gets the excerpt. */
  champion: string;
  ability: string;
  /** The character file (data/raw/<dataset>/cdragon/bins/<character>.bin.json). */
  character: string;
  /** The object in the file. */
  object: string;
  /** Dotted paths in the object; `DataValues` entries are found by name, arrays indexed with [n]. */
  fields: string[];
}

export interface WikiAddition {
  champion: string;
  ability: string;
  /** A note the parser drops, as written into the record's notes. */
  note?: string;
  /** Wikitext the ability's template must still contain for the note to stand. */
  anchor?: string;
  /** Text from another wiki page (rendered by hand), with the revision it was read from. */
  source?: { page: { title: string; revid: number }; text: string[] };
}

export const GAME_EXCERPTS: GameExcerpt[] = [
  { champion: "Anivia", ability: "Crystallize", character: "Anivia", object: "Characters/Anivia/Spells/CrystallizeAbility/Crystallize", fields: ["mSpell.DataValues.ChampPushDistance.values", "mSpell.DataValues.NonChampPushDistance.values", "mSpell.missileSpeed", "mSpell.mClientData.mTargeterDefinitions"] },
  { champion: "Malzahar", ability: "Malefic Visions", character: "Malzahar", object: "Characters/Malzahar/Spells/MalzaharEAbility/MalzaharE", fields: ["mSpell.mSpellCalculations.MinionExecuteThreshold"] },
  { champion: "Malzahar", ability: "Nether Grasp", character: "Malzahar", object: "Characters/Malzahar/Spells/MalzaharRAbility/MalzaharR", fields: ["mSpell.castRadius", "mSpell.mClientData.mTargeterDefinitions[0]"] },
  { champion: "Velkoz", ability: "Tectonic Disruption", character: "Velkoz", object: "Characters/Velkoz/Spells/VelkozEAbility/VelkozE", fields: ["mSpell.DataValues.MoveDistance.values", "mSpell.DataValues.MinDetonationTime.values", "mSpell.DataValues.MaxDetonationTime.values"] },
  { champion: "Ziggs", ability: "Hexplosive Minefield", character: "Ziggs", object: "Characters/Ziggs/Spells/ZiggsEAbility/ZiggsE", fields: ["mSpell.DataValues.TriggerRange.values", "mSpell.DataValues.MinePerceptionBubbleSize.values", "mSpell.castRadius"] },
  { champion: "Ziggs", ability: "Bouncing Bomb", character: "Ziggs", object: "Characters/Ziggs/Spells/ZiggsQAbility/ZiggsQ", fields: ["mSpell.DataValues.MaxRange.values", "mSpell.DataValues.MaxRangeFirstBounce.values", "mSpell.DataValues.MaxRangeSecondBounce.values", "mSpell.DataValues.BombTriggerRange.values", "mSpell.DataValues.ExplosionRadius.values", "mSpell.DataValues.BoundingBoxTrigger.values"] },
  { champion: "Ziggs", ability: "Bouncing Bomb", character: "Ziggs", object: "Characters/Ziggs/Spells/ZiggsQAbility/ZiggsQSpell", fields: ["mSpell.missileSpeed", "mSpell.mMissileSpec"] },
  { champion: "Ziggs", ability: "Bouncing Bomb", character: "Ziggs", object: "Characters/Ziggs/Spells/ZiggsQAbility/ZiggsQSpell2", fields: ["mSpell.missileSpeed", "mSpell.mMissileSpec"] },
  { champion: "Ziggs", ability: "Bouncing Bomb", character: "Ziggs", object: "Characters/Ziggs/Spells/ZiggsQAbility/ZiggsQSpell3", fields: ["mSpell.missileSpeed", "mSpell.mMissileSpec"] },
  { champion: "Ziggs", ability: "Satchel Charge", character: "Ziggs", object: "Characters/Ziggs/Spells/ZiggsWAbility/ZiggsW", fields: ["mSpell.DataValues.KnockbackSpeed.values", "mSpell.DataValues.KnockbackGravity.values", "mSpell.DataValues.KnockbackDistance.values", "mSpell.DataValues.KnockbackDistanceAlly.values", "mSpell.DataValues.ExplosionRadius.values", "mSpell.missileSpeed", "mSpell.mMissileSpec.movementComponent"] },
  { champion: "Zyra", ability: "Grasping Roots", character: "ZyraGraspingPlant", object: "Characters/ZyraGraspingPlant/CharacterRecords/Root", fields: ["basicAttack", "attackSpeedModifiable.baseValue", "attackRangeModifiable.baseValue"] },
  { champion: "Zyra", ability: "Grasping Roots", character: "Zyra", object: "Characters/Zyra/Spells/ZyraEAbility/ZyraEPlantAttack", fields: ["mSpell.missileSpeed", "mSpell.spellCastTime"] },
  { champion: "Zyra", ability: "Deadly Spines", character: "Zyra", object: "Characters/Zyra/Spells/ZyraQAbility/ZyraQ", fields: ["mSpell.castRadius", "mSpell.castRadiusSecondary", "mSpell.mClientData.mTargeterDefinitions"] },
  { champion: "Zyra", ability: "Deadly Spines", character: "Zyra", object: "Characters/Zyra/Spells/ZyraQAbility/ZyraQPlantMissile", fields: ["mSpell.mMissileSpec.movementComponent", "mSpell.missileSpeed"] },
  { champion: "Zyra", ability: "Deadly Spines", character: "ZyraThornPlant", object: "Characters/ZyraThornPlant/CharacterRecords/Root", fields: ["basicAttack", "attackSpeedModifiable.baseValue", "attackRangeModifiable.baseValue"] },
  { champion: "MonkeyKing", ability: "Nimbus Strike", character: "MonkeyKing", object: "Characters/MonkeyKing/Spells/MonkeyKingNimbusAbility/MonkeyKingNimbus", fields: ["mSpell.DataValues.DashSpeed.values"] },
];

export const WIKI_ADDITIONS: WikiAddition[] = [
  {
    champion: "Anivia",
    ability: "Rebirth",
    note: "Interaction table (ct): move=false; cast=false; attack=false; items=false; consume=false; spells=false; interrupts=death.",
    anchor: "{{ct|move=false|cast=false|attack=false|items=false|consume=false|spells=false|interrupts=death}}",
  },
  {
    champion: "Anivia",
    ability: "Rebirth",
    source: {"page": {"title": "Template:Tip data/Resurrection", "revid": 4060644}, "text": ["A unit that is protected by Resurrection will enter a revival state and dispel most debuffs upon taking fatal damage. After the state completes, the unit is revived. Resurrection effects do not count for kills or assists.", "Resurrection sources have a hierarchy, and will trigger in the following order:\n# Chronoshift\n# Cultivation of War\n# Guardian Angel\n# Rebirth and Cell Division\n\nResurrection will always take precedence over zombie state effects. Entering resurrection does not cancel cast times. Bailout always takes priority over resurrection."]},
  },
  {
    champion: "Malzahar",
    ability: "Void Shift",
    note: "Void Shift does not prevent E trap drowsy. [https://www.reddit.com/r/zoemains/comments/1mfs9ib/did_you_know_malzahar_could_get_asleep_when/]",
    anchor: "''Void Shift'' does not prevent {{cais|E|Zoe}} trap {{tip|drowsy}}.",
  },
  {
    champion: "Malzahar",
    ability: "Nether Grasp",
    note: "Interaction table (ct): attack=Disabled if attacking Nether Grasp target. Otherwise interrupts after 0.5 seconds of channeling.; cast=interrupts; move=Disabled for the first 0.5 seconds. Interrupts afterwards.; consume=true; items=interrupts,true,interrupts,false,interrupts; spells=true,interrupts,interrupts,interrupts.",
    anchor: "{{ct|channel|attack=Disabled if attacking Nether Grasp target.",
  },
  {
    champion: "MonkeyKing",
    ability: "Cyclone",
    note: "Interaction table (ct): attack=false; move=true; cast=Other abilities are disabled for the first 0.3 seconds, casting them afterwards interrupts.; items=true; consume=true; spells=true,true,true,false,true; interrupts=death.",
    anchor: "{{ct|attack=false|move=true|cast=Other abilities are disabled for the first {{fd|0.3}} seconds, casting them afterwards interrupts.|items=true|consume=true|spells=true,true,true,false,true|interrupts=death}}",
  },
  {
    champion: "MonkeyKing",
    ability: "Nimbus Strike",
    source: {"page": {"title": "Template:Tip data/Uncancellable windup", "revid": 4072133}, "text": ["Some effects cause a basic attack to have an uncancellable windup. Unlike normal basic attacks and similar to the cast time of a spell, the windup of these attacks cannot be interrupted by neither the user themselves nor any status effect, other than death, polymorph, Quinn's Vault, Hextech Rocketbelt Supersonic, and in some cases, untargetability and range.", "Any effect that would disrupt an attack's windup, aside from the ones noted above, are ignored by basic attacks with uncancellable windups. If the attack doesn't lock out other abilities, they may be used normally, and the basic attack will hit during the ability cast."]},
  },
];

/** The characters whose game files the excerpts read. */
export function excerptCharacters(): string[] {
  return [...new Set(GAME_EXCERPTS.map((excerpt) => excerpt.character))].sort();
}

/** A field of a game object by its dotted path. */
export function fieldAt(object: unknown, path: string): unknown {
  let node: unknown = object;
  for (const token of path.split(".")) {
    const match = /^([^[\]]+)((?:\[\d+\])*)$/.exec(token);
    if (!match?.[1]) throw new Error(`Bad game field path "${path}"`);
    const key = match[1];
    if (Array.isArray(node)) node = node.find((entry) => typeof entry === "object" && entry !== null && (entry as { name?: unknown }).name === key);
    else node = typeof node === "object" && node !== null ? (node as Record<string, unknown>)[key] : undefined;
    for (const index of (match[2] ?? "").matchAll(/\[(\d+)\]/g)) node = Array.isArray(node) ? node[Number(index[1])] : undefined;
    if (node === undefined) throw new Error(`No game field "${path}"`);
  }
  return node;
}

export interface EvidenceInput {
  /** The downloaded text of a character file, by character name. */
  bin(character: string): string | undefined;
  /** The wikitext of a page, by title. */
  wikitext(title: string): string | undefined;
  /** The revision of a fetched wiki page (an ability template or a glossary page), by title. */
  revision(title: string): number | undefined;
  /** The game version the character files are from (manifest.cdragon.version). */
  version: string;
  /** The CommunityDragon patch folder the files were downloaded from ("16.20"). */
  dataset: string;
}

/** Adds the champion's curated evidence to its ability records, in place; fails on anything that no longer checks out. */
export function attachEvidence(records: AbilityRecord[], champion: string, input: EvidenceInput, excerpts = GAME_EXCERPTS, additions = WIKI_ADDITIONS): void {
  const recordFor = (ability: string) => {
    const record = records.find((r) => r.name === ability);
    if (!record) throw new Error(`Curated evidence for ${champion}'s ${ability}, which has no ability record`);
    return record;
  };
  for (const excerpt of excerpts.filter((e) => e.champion === champion)) {
    const text = input.bin(excerpt.character);
    if (text === undefined) throw new Error(`Missing the game file of ${excerpt.character}; run npm run fetch`);
    const object = (JSON.parse(text) as Record<string, unknown>)[excerpt.object];
    if (object === undefined) throw new Error(`${excerpt.character}'s game file has no ${excerpt.object}`);
    const folder = excerpt.character.toLowerCase();
    const record = recordFor(excerpt.ability);
    (record.gameSources ??= []).push({
      version: input.version,
      url: `https://raw.communitydragon.org/${input.dataset}/game/data/characters/${folder}/${folder}.bin.json`,
      sha256: createHash("sha256").update(text).digest("hex"),
      object: excerpt.object,
      text: excerpt.fields.map((field) => `${field}: ${JSON.stringify(fieldAt(object, field))}`),
    });
  }
  for (const addition of additions.filter((a) => a.champion === champion)) {
    const record = recordFor(addition.ability);
    if (addition.anchor !== undefined && !input.wikitext(record.page.title)?.includes(addition.anchor)) {
      throw new Error(`${record.page.title} no longer says "${addition.anchor}": check the curated note on ${addition.ability} again`);
    }
    if (addition.source !== undefined) {
      const { title, revid } = addition.source.page;
      const fetched = input.revision(title);
      if (fetched !== revid) throw new Error(`${title} is at revision ${fetched ?? "none (not fetched)"}, not ${revid}: check the curated text on ${addition.ability} again`);
    }
    if (addition.note !== undefined) record.notes.push(addition.note);
    if (addition.source !== undefined) (record.sources ??= []).push(addition.source);
  }
}
