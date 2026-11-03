/** The summoner spell catalog as a readable page: reports/summoners.md. */
import { wikiUrl } from "../../engine/abilityText";
import type { SpellCatalog, SpellRecord } from "./records";

function spellSection(spell: SpellRecord): string[] {
  const facts = [
    spell.charges ? `${spell.charges.count} charges, each back after ${spell.charges.recharge} seconds; ${spell.cooldown} seconds between casts` : `cooldown ${spell.cooldown} seconds`,
    `range ${spell.range}`,
    `Data Dragon ID ${spell.id}`,
  ];
  return [
    `### ${spell.name}`,
    "",
    `${facts.join("; ")}.`,
    "",
    ...spell.text.split("\n"),
    "",
    ...(spell.notes.length > 0 ? [`Notes from [${spell.article.title} revision ${spell.article.revid}](${wikiUrl(spell.article.title, spell.article.revid)}):`, "", ...spell.notes.map((note) => `${note.match(/^ */)![0]}- ${note.trimStart()}`), ""] : []),
  ];
}

export function summonersReport(catalog: SpellCatalog): string {
  const { spellData } = catalog.sources;
  const lines = [
    `# Summoner spells, patch ${catalog.patch}`,
    "",
    "The summoner spells Summoner's Rift offers, which the loadout search will choose from (M8). Values by level are shown from level 1 to 20; duels are at level 20.",
    "",
    `Sources: Data Dragon ${catalog.sources.ddragon} (which spells Summoner's Rift offers, as the ones in its CLASSIC game mode), [${spellData.title} revision ${spellData.revid}](${wikiUrl(spellData.title, spellData.revid)}) (cooldowns, ranges and effects), and each spell's article (its notes).`,
    "",
    "## Cross-check",
    "",
    `${catalog.checks.compared} cooldowns and ranges on the wiki were compared with Data Dragon. ${catalog.checks.differences.length === 0 ? "They all agree." : `Differences (${catalog.checks.differences.length}), where the wiki's value is the one used:`}`,
    ...(catalog.checks.differences.length > 0 ? ["", ...catalog.checks.differences.map((difference) => `- ${difference}`)] : []),
    "",
    "## Spells",
    "",
    ...catalog.spells.flatMap(spellSection),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}
