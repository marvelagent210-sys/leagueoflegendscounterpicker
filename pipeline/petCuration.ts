/**
 * Curated pet fields the infobox parser leaves out or renders short, as the kits quote them
 * (from the 91-kit build and the private workspace's batches 7 to 15). Each is checked against
 * the downloaded champion page, so the build fails when the wiki moves on.
 */
import type { PetRecord } from "../engine/abilities";
import type { WikiPage } from "./sources/wiki";

export interface PetCuration {
  champion: string;
  pet: string;
  /** The field of the pet's text. */
  field: string;
  /** What the parser gives (left out: nothing); anything else fails the build. */
  parsed?: string;
  /** The value, written out; with `inPage`, it must still be on the champion's downloaded page. */
  value?: string;
  inPage?: boolean;
  /** The value is the champion's whole downloaded page. */
  wholePage?: boolean;
  reason: string;
}

export const PET_CURATION: PetCuration[] = [
  {"champion": "Leblanc", "pet": "Mirror Image", "field": "leash", "parsed": "1125", "value": "1125 (Leash range (estimated))", "reason": "The wiki writes the leash range with its tooltip, {{tt|1125|Leash range (estimated)}}; the parser keeps only the number, and the kit quotes the estimate."},
  {"champion": "Maokai", "pet": "Sapling", "field": "sourceNotes", "wholePage": true, "reason": "The kit quotes Maokai's page beyond the Sapling infobox."},
  {"champion": "Naafiri", "pet": "Packmate", "field": "pinnedArticleNotes", "value": "=== Notes ===\n* ''Packmates'' will die with '''Naafiri''' when she does.\n* ''Packmates'' level up with '''Naafiri'''.\n* ''Packmates'' dynamically override their attack speed and movement speed values with '''Naafiri's'''.\n** ''Packmates'' cannot have their attack speed and movement speed values be modified on their own, with one exception:\n*** They gain a movement speed boost when approximately 400-450 or more units away from '''Naafiri''' while she moves away from them. The boost scales based on how far away she is, capping at a total of {{as|1000 movement speed}} with a proximity of 700 units.\n*** When '''Naafiri''' enters a {{tip|brush}}, ''Packmates'' increase their {{as|movement speed}} to {{as|800|ms}} and {{tip|dash}} to the brush's location if it is within approximately 450 units. This dash can surpass terrain although the ''Packmates'' will not dash if they are not already within dash range. In that case, they will navigate and path around the terrain towards the brush.\n* ''Packmates'' are summoned before '''Naafiri''' to the right, left, or backside of her and will follow her in an arrow-like formation that resembles a pack of wolves.\n* If '''Naafiri''' enters {{tip|stealth}}, her ''Packmates'' will do so as well.\n* Whenever '''Naafiri''' {{tip|blink|blinks}}, the ''Packmates'' will do so as well, retaining their relative position to her at the new location.\n* ''Packmates'' cannot perform ''Pouncing Assault'' while {{tip|immobilize|immobilized}}, {{tip|ground|grounded}}, or {{tip|silence|silenced}}, but they may still {{tip|blink}} from ''{{ai|The Call of the Pack|Naafiri}}'' and ''{{ai|Eviscerate|Naafiri}}''.\n\n", "inPage": true, "reason": "The Packmates' notes section of Naafiri's page, which the kit quotes."},
  {"champion": "Naafiri", "pet": "Packmate", "field": "pinnedRawRevision", "wholePage": true, "reason": "The kit quotes Naafiri's page beyond the Packmate infobox."},
  {"champion": "Orianna", "pet": "The Ball", "field": "fullRawRevision", "wholePage": true, "reason": "The kit quotes Orianna's page beyond the Ball's infobox."},
  {"champion": "Zed", "pet": "Shadow", "field": "pinnedRaw", "wholePage": true, "reason": "The kit quotes Zed's page beyond the Shadow's infobox."},
  {"champion": "Zed", "pet": "Shadow", "field": "pinnedRawRevision", "wholePage": true, "reason": "The kit quotes Zed's page beyond the Shadow's infobox."},
  {"champion": "Zyra", "pet": "Thorn Spitter", "field": "general", "value": "Plants do not update their damage if Zyra levels up or changes her AP, but will trigger newly available spell effects. However the damage of in-air attacks update once a plant is hit by Stranglethorns or once the plant buffed by it dies.", "reason": "Curated with the 91-kit build from the wiki's notes on Zyra's plants; the downloaded champion page doesn't carry it."},
  {"champion": "Zyra", "pet": "Vine Lasher", "field": "general", "value": "Plants do not update their damage if Zyra levels up or changes her AP, but will trigger newly available spell effects. However the damage of in-air attacks update once a plant is hit by Stranglethorns or once the plant buffed by it dies.", "reason": "Curated with the 91-kit build from the wiki's notes on Zyra's plants; the downloaded champion page doesn't carry it."},
];

/** Adds the curated fields to a champion's pets, in place; fails on anything that no longer checks out. */
export function curatePets(pets: PetRecord[], champion: string, page: WikiPage, curation = PET_CURATION): void {
  for (const entry of curation.filter((c) => c.champion === champion)) {
    const pet = pets.find((p) => p.name === entry.pet);
    if (!pet) throw new Error(`Curated pet field for ${champion}'s ${entry.pet}, which ${page.title} doesn't have`);
    if (pet.text[entry.field] !== entry.parsed) throw new Error(`${champion}'s ${entry.pet}: the parser now gives ${JSON.stringify(pet.text[entry.field])} for ${entry.field}, not ${JSON.stringify(entry.parsed)}: check the curation again`);
    if (entry.inPage && !page.content.includes(entry.value ?? "")) throw new Error(`${page.title} no longer has the curated ${entry.field} of ${entry.pet}`);
    const value = entry.wholePage ? page.content : entry.value;
    if (value === undefined) throw new Error(`Curated pet field ${champion}/${entry.pet}/${entry.field} has no value`);
    pet.text[entry.field] = value;
  }
}
