/** The item catalog as a readable page: reports/items.md. */
import { wikiUrl } from "../../engine/abilityText";
import type { ItemCatalog, ItemEffect, ItemRecord } from "./records";

/** The wiki's stat keys as the shop names them; percentages carry their sign. */
const STAT_LABELS: Record<string, string> = {
  ad: "attack damage",
  ap: "ability power",
  as: "% attack speed",
  crit: "% critical strike chance",
  critdamage: "% critical strike damage",
  hp: "health",
  armor: "armor",
  mr: "magic resist",
  ah: "ability haste",
  lethality: "lethality",
  armpen: "% armor penetration",
  mpen: "% magic penetration",
  mpenflat: "magic penetration",
  ms: "% movement speed",
  msflat: "movement speed",
  mana: "mana",
  mp5: "% base mana regeneration",
  hp5: "% base health regeneration",
  lifesteal: "% life steal",
  omnivamp: "% omnivamp",
  hsp: "% heal and shield power",
  tenacity: "% tenacity",
};

const gold = (value: number) => value.toLocaleString("en-US");

function stats(record: ItemRecord): string {
  const parts = Object.entries(record.stats).map(([key, value]) => {
    const label = STAT_LABELS[key] ?? key;
    return label.startsWith("%") ? `${value}${label}` : `${value} ${label}`;
  });
  return parts.length > 0 ? parts.join(", ") : "none";
}

const SLOT_LABELS: Record<string, string> = { act: "Active" };

function effect(item: ItemEffect): string {
  const kind = SLOT_LABELS[item.slot] ?? "Passive";
  const notes = [item.unique ? "unique" : "", item.cooldown ? `cooldown ${item.cooldown} s` : ""].filter(Boolean).join("; ");
  return `- **${kind}${item.name ? `: ${item.name}` : ""}**${notes ? ` (${notes})` : ""}. ${item.text}`;
}

export function itemsReport(catalog: ItemCatalog): string {
  const { itemData } = catalog.sources;
  const legendary = catalog.items.filter((item) => item.kind === "legendary");
  const boots = catalog.items.filter((item) => item.kind === "boots");
  const lines = [
    `# Item catalog, patch ${catalog.patch}`,
    "",
    `The finished items and boots the build search will choose from (PLAN.md §13, M8). The simulator doesn't use them yet.`,
    "",
    `Sources: Data Dragon ${catalog.sources.ddragon} (which items the shop sells, and their gold), the items' game file from CommunityDragon ${catalog.sources.cdragon} (stats and item groups), and [${itemData.title} revision ${itemData.revid}](${wikiUrl(itemData.title, itemData.revid)}) (stats, effects and limits).`,
    "",
    "## How the catalog is chosen",
    "",
    ...catalog.rules.map((rule) => `- ${rule}`),
    "",
    `That gives **${legendary.length} finished items** and **${boots.length} tier-2 boots**.`,
    "",
    "## One per build",
    "",
    "The game file caps how many items of a group a build may hold. These caps bind the catalog:",
    "",
    "| Game-file group | Wiki limit | At most | Items |",
    "|---|---|--:|---|",
    ...catalog.groups.map((group) => `| ${group.id} | ${group.wiki ?? "—"} | ${group.max} | ${group.items.join(", ")} |`),
    "",
    "No item can be held twice.",
    "",
    "## Cross-check",
    "",
    `${catalog.checks.stats} stats on the wiki were compared with the game file. ${catalog.checks.differences.length === 0 ? "They all agree." : `Differences (${catalog.checks.differences.length}):`}`,
    ...(catalog.checks.differences.length > 0 ? ["", ...catalog.checks.differences.map((difference) => `- ${difference}`)] : []),
    "",
  ];
  for (const [title, list] of [["Finished items", legendary], ["Boots", boots]] as const) {
    lines.push(`## ${title}`, "");
    for (const item of list) {
      lines.push(`### ${item.name} (${gold(item.gold)} gold)`, "", `Stats: ${stats(item)}.`);
      if (item.groups.length > 0) lines.push(`One per build: ${item.groups.join(", ")}.`);
      if (item.restriction) lines.push(`Restriction: ${item.restriction}`);
      if (item.recipe.length > 0) lines.push(`Built from: ${item.recipe.join(", ")}.`);
      lines.push("");
      if (item.effects.length > 0) lines.push(...item.effects.map(effect), "");
    }
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
