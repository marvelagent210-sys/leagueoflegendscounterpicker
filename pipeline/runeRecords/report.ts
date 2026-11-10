/** The rune catalog as a readable page: reports/rune-records.md. */
import { wikiUrl } from "../../engine/abilityText";
import type { RuneRecords, RuneEntry } from "./records";

const ROWS = ["Keystones", "Slot 1", "Slot 2", "Slot 3"];

function runeSection(rune: RuneEntry): string[] {
  const facts = [rune.cooldown ? `cooldown ${rune.cooldown}` : "", rune.range ? `range ${rune.range}` : "", `perk ID ${rune.id}`].filter(Boolean);
  return [
    `#### ${rune.name}`,
    "",
    `${facts.join("; ")}; [${rune.template.title} revision ${rune.template.revid}](${wikiUrl(rune.template.title, rune.template.revid)}).`,
    "",
    ...rune.text.split("\n"),
    "",
    ...(rune.notes.length > 0 ? [`Notes from [${rune.article.title} revision ${rune.article.revid}](${wikiUrl(rune.article.title, rune.article.revid)}):`, "", ...rune.notes.map((note) => `${note.match(/^ */)![0]}- ${note.trimStart()}`), ""] : []),
  ];
}

export function runesReport(catalog: RuneRecords): string {
  const lines = [
    `# Runes, patch ${catalog.patch}`,
    "",
    "The runes and stat shards Summoner's Rift offers, which the loadout search will choose rune pages from (M8). Values by level are shown from level 1 to 20; duels are at level 20.",
    "",
    `Sources: Data Dragon ${catalog.sources.ddragon} (which runes Summoner's Rift offers, by path and row), the client's perk data from CommunityDragon ${catalog.sources.cdragon} (the stat shards' names and numbers), each rune's wiki data template and article, and the wiki pages ${catalog.rulePages.map((page) => `[${page.title}](${wikiUrl(page.title, page.revid)})`).join(", ")}.`,
    "",
    "## Cross-check",
    "",
    `${catalog.checks.compared} runes' paths and rows and shard values were compared with Data Dragon's and the client's. ${catalog.checks.differences.length === 0 ? "They all agree." : `Differences (${catalog.checks.differences.length}):`}`,
    ...(catalog.checks.differences.length > 0 ? ["", ...catalog.checks.differences.map((difference) => `- ${difference}`)] : []),
    "",
    "## Stat shards",
    "",
    "| Slot | Options |",
    "|---|---|",
    ...catalog.shards.map((slot) => `| ${slot.slot} | ${slot.options.map((option) => `${option.name}: ${option.text}`).join("; ")} |`),
    "",
    "## Substitutions",
    "",
    "The runes a champion or mode gets in place of others, as the wiki's Rune article lists them:",
    "",
    ...catalog.substitutions.map((line) => `${line.match(/^ */)![0]}- ${line.trimStart()}`),
    "",
    "## Paths",
    "",
  ];
  for (const path of catalog.paths) {
    lines.push(`### ${path.name}`, "");
    path.rows.forEach((row, i) => lines.push(`- ${ROWS[i]}: ${row.join(", ")}`));
    lines.push("");
    for (const rune of catalog.runes.filter((entry) => entry.path === path.name)) lines.push(...runeSection(rune));
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
