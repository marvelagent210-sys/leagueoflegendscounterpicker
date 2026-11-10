/** Compile the seven stat-shard rules from complete, pinned wiki sources. */
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { RuneCatalog, RuneWikiSource } from "../../runes/catalog";
import type { ShardEvidence, ShardRules } from "../../runes/shardRules";
import { datasetDir } from "../config";
import { loadRuneCatalog } from "./catalog";

export interface ShardSourceBundle {
  schema: 1;
  dataset: string;
  patch: string;
  pages: RuneWikiSource[];
}

/** A different revision requires an explicit source review, not an inferred rule. */
const REVIEWED_REVISIONS: Readonly<Record<string, number>> = {
  "Adaptive force": 4063874,
  "Rune": 4091810,
  "Slow resist": 4058780,
  "Template:Adaptive": 4009298,
  "Template:Data Garen/Courage": 4064595,
  "Tenacity": 4021927,
};
/** Full revisions are retained, including notes that do not enter the numeric reads. */
const REVIEWED_CONTENT: Readonly<Record<string, string>> = {
  "Adaptive force": "3db1c68a2d28fb1570203918f3f02e18724065911ba3832bcdc1abf5e053708b",
  "Rune": "a9b4ad8e0885e65fd73e7926eaf608c5312a4507d7f115bcd2bf0c0c222a8e31",
  "Slow resist": "5aabd1127dcbe99af745add9089f0424875488c505117934d8030286806db13a",
  "Template:Adaptive": "09d7588cc45dd6b0dca0060f67820f24a62570db49a276f2923a203b1b849f10",
  "Template:Data Garen/Courage": "bb580415dab9a456cb4c602f06179c09a1d4014e8844a9330185d68d121bd7bd",
  "Tenacity": "4e6afe4363be0993a7eb515cfc67abd8801be1948b30670c3f91d52012703332",
};
const SHARD_ROWS = [[5008, 5005, 5007], [5008, 5010, 5001], [5011, 5013, 5001]];
const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

function requireThat(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Rune shards: ${message}`);
}

function record(value: unknown, label: string): Record<string, unknown> {
  requireThat(value !== null && typeof value === "object" && !Array.isArray(value), `${label} must be an object`);
  return value as Record<string, unknown>;
}

function section(content: string, start: string, end: string, label: string): string {
  requireThat(content.split(start).length === 2 && content.split(end).length === 2, `${label} needs its complete reviewed section`);
  const first = content.indexOf(start), last = content.indexOf(end, first + start.length);
  requireThat(last > first, `${label} sections are out of order`);
  return content.slice(first + start.length, last);
}

/**
 * This returns only numeric rules and exact source excerpts. It neither equips a
 * fighter nor resolves a champion's adaptive type or an item's eligibility.
 */
export function buildShardRules(catalog: RuneCatalog, bundle: ShardSourceBundle): ShardRules {
  const input = record(bundle, "source bundle");
  requireThat(input.schema === 1 && typeof input.dataset === "string" && /^\d+\.\d+$/.test(input.dataset), "invalid source schema or dataset");
  const [major, minor] = input.dataset.split(".").map(Number);
  requireThat(input.patch === `${major! + 10}.${minor}` && input.dataset === catalog.dataset && input.patch === catalog.patch,
    "source bundle, catalog and patch disagree");
  requireThat(catalog.schema === 1 && JSON.stringify(catalog.shardSlots) === JSON.stringify(SHARD_ROWS), "catalog shard rows differ from the reviewed layout");
  const expectedIds = [...new Set(SHARD_ROWS.flat())].sort((a, b) => a - b);
  requireThat(Array.isArray(catalog.shards) && JSON.stringify(catalog.shards.map((shard) => shard.id).sort((a, b) => a - b)) === JSON.stringify(expectedIds),
    "catalog must retain all seven reviewed shard IDs");
  requireThat(Array.isArray(input.pages) && input.pages.length === Object.keys(REVIEWED_REVISIONS).length, "need all six complete reviewed sources");
  const pages = new Map<string, RuneWikiSource>();
  for (const value of input.pages) {
    const page = record(value, "source page");
    requireThat(typeof page.title === "string" && REVIEWED_REVISIONS[page.title] !== undefined, "unexpected source title");
    requireThat(!pages.has(page.title), `duplicate source ${page.title}`);
    requireThat(page.revid === REVIEWED_REVISIONS[page.title], `${page.title} revision needs review`);
    requireThat(typeof page.timestamp === "string" && /T.*(?:Z|[+-]\d\d:\d\d)$/.test(page.timestamp) && Number.isFinite(Date.parse(page.timestamp)), `${page.title} has an invalid source timestamp`);
    requireThat(typeof page.content === "string" && page.content.trim().length > 0, `${page.title} needs complete raw text`);
    requireThat(typeof page.sha256 === "string" && /^[a-f0-9]{64}$/.test(page.sha256) && sha256(page.content) === page.sha256, `${page.title} content hash differs`);
    pages.set(page.title, page as unknown as RuneWikiSource);
  }
  for (const title of Object.keys(REVIEWED_REVISIONS)) requireThat(pages.has(title), `missing source ${title}`);
  const rune = pages.get("Rune")!, adaptive = pages.get("Adaptive force")!, slow = pages.get("Slow resist")!;
  requireThat(catalog.rules && rune.title === catalog.rules.title && rune.revid === catalog.rules.revid
    && rune.timestamp === catalog.rules.timestamp && rune.content === catalog.rules.content
    && rune.sha256 === catalog.rules.sha256 && sha256(catalog.rules.content) === catalog.rules.sha256,
    "Rune source differs from the catalog's exact pinned revision");
  const evidence: ShardEvidence[] = [];
  const quote = (page: RuneWikiSource, excerpt: string) => {
    requireThat(page.content.includes(excerpt), `${page.title} reviewed rule changed: ${excerpt}`);
    if (!evidence.some((item) => item.title === page.title && item.text === excerpt)) evidence.push({ title: page.title, revid: page.revid, text: excerpt });
  };
  const shardSection = section(rune.content, "=== Shards ===", "=== Substitutions ===", "Rune shard table");
  const rows = shardSection.split(/\|-\r?\n! align="center" \| Slot /).slice(1);
  requireThat(rows.length === 3 && rows.every((row, index) => row.startsWith(`${index + 1}<br />{{sbc|${["Offense", "Flex", "Defense"][index]}}}`)),
    "Rune shard table needs the three reviewed rows");
  const read = (image: string, pattern: RegExp, count: number, expected: number, label: string): number => {
    const lines = shardSection.split(/\r?\n/).filter((line) => line.startsWith(`| [[File:Rune shard ${image}.png|`));
    requireThat(lines.length === count, `${label} needs its complete shard entries`);
    let result: number | undefined;
    for (const line of lines) {
      const match = pattern.exec(line);
      requireThat(match?.[1], `${label} reviewed formula changed`);
      const value = Number(match[1]);
      requireThat(Number.isFinite(value) && value === expected, `${label} numeric source needs review`);
      requireThat(result === undefined || result === value, `${label} shard copies disagree`);
      result = value;
      quote(rune, line);
    }
    return result!;
  };
  const adaptiveForce = read("Adaptive Force", /^\| \[\[File:Rune shard Adaptive Force\.png\|30px\|link=\]\]<br \/>\{\{adaptive\|([\d.]+)\}\}$/, 2, 9, "adaptive force");
  const attackSpeed = read("Attack Speed", /^\| \[\[File:Rune shard Attack Speed\.png\|30px\|link=\]\]<br \/>\{\{as\|([\d.]+)% '''bonus''' attack speed\}\}$/, 1, 10, "attack speed") / 100;
  const abilityHaste = read("Cooldown Reduction", /^\| \[\[File:Rune shard Cooldown Reduction\.png\|30px\|link=\]\]<br \/>([\d.]+) ability haste$/, 1, 8, "ability haste");
  const moveSpeed = read("Movement Speed", /^\| \[\[File:Rune shard Movement Speed\.png\|30px\|link=\]\]<br \/>\{\{as\|\{\{fd\|([\d.]+)\}\}% '''bonus''' movement speed\}\}$/, 1, 2.5, "movement speed") / 100;
  const healthPerLevel = read("Health Scaling", /^\| \[\[File:Rune shard Health Scaling\.png\|30px\|link=\]\]<br \/>\{\{pp\|([\d.]+) \* x for 20\|color=health\}\} \{\{as\|'''bonus''' health\}\}$/, 2, 10, "scaling health");
  const health = read("Health", /^\| \[\[File:Rune shard Health\.png\|30px\|link=\]\]<br \/>\{\{as\|([\d.]+) '''bonus''' health\}\}$/, 1, 65, "flat health");
  const tenacity = read("Tenacity and Slow Resist", /^\| \[\[File:Rune shard Tenacity and Slow Resist\.png\|30px\|link=\]\]<br \/>([\d.]+)% \{\{tip\|tenacity\}\} and \{\{tip\|slow resist\}\}$/, 1, 15, "tenacity and slow resist") / 100;
  const adaptiveLine = adaptive.content.split("\n").find((line) => line.startsWith("1 point of Adaptive Force provides "));
  const ratio = adaptiveLine?.match(/\{\{#vardefineecho:adaptiveAdRatio\|([\d.]+)\}\}/);
  requireThat(adaptiveLine && ratio?.[1] && Number(ratio[1]) === 0.6 && adaptiveLine.includes("{{#vardefineecho:adaptiveApRatio|1}} AP"), "adaptive force conversion needs review");
  quote(adaptive, adaptiveLine);
  quote(adaptive, "* {{as|{{sti|'''Higher Bonus''' AD}}}} → {{as|{{sti|AD|[[Attack damage]]}}}}");
  quote(adaptive, "* {{as|{{sti|'''Higher''' AP}}}} → {{as|{{sti|AP|[[Ability power]]}}}}");
  quote(adaptive, "If the {{as|'''bonus''' attack damage}} and the {{as|ability power}} of the unit are '''equal''', the stat granted depends on the [[File:Rune_shard_Adaptive_Force.png|16px]] '''adaptive type''' of the champion.");
  quote(adaptive, "Attack damage and ability power granted by '''champion''' [[passive]] effects <u>do not</u> contribute towards determining whether attack damage or ability power is granted by adaptive force.");
  quote(adaptive, "Attack damage and ability power granted by '''item''' [[passive]] effects <u>do</u> contribute towards determining which stat the adaptive force gives, with few exceptions.");
  quote(adaptive, "* Item passives that don't contribute to adaptive force stat choice: {{iis|Staff of Flowing Water}} {{nie|Rapids}}, {{iis|Riftmaker}} {{nie|Void Infusion}}, {{iis|Archangel's Staff}}, {{iis|Seraph's Embrace}} {{iis|Manamune}} and {{iis|Muramana}} {{nie|Awe}}.");
  quote(pages.get("Template:Adaptive")!, "{{#ifeq:{{{wr|}}}|true|0.5|0.6}}");
  quote(slow, "* Slow resistance strictly {{tip|stacks multiplicatively}}.");
  quote(slow, "* '''Slow resist''' will also reduce the strength of currently-applied slows on the user, if the stat is gained while afflicted.");
  const tenacityPage = pages.get("Tenacity")!;
  quote(tenacityPage, "Modifiers within the same group stack '''multiplicatively''', while the different groups stack '''additively''' with each other.");
  const groupA = section(tenacityPage.content, "! Group A\n|", "! Group B\n|", "Tenacity Group A");
  const shardGroupLine = "* [[File:Rune shard Tenacity and Slow Resist.png|20px|link=Rune#Shards]] [[Runes#Shards|Tenacity and slow resist rune shard]]";
  requireThat(groupA.includes(shardGroupLine) && groupA.includes("* {{ii|Mercury's Treads}}"), "shard and item tenacity group needs review");
  quote(tenacityPage, groupA.trim());
  quote(pages.get("Template:Data Garen/Courage")!, "* The {{tip|Tenacity}} increase {{tip|stacks additively}} with the ''tenacity reduction'' from {{tip|Brittle}}, but multiplicatively with other sources.");
  // Semantic checks above explain relevant changes. This final binding also rejects
  // snippets or edits elsewhere in a revision whose numeric reads still happen to match.
  for (const page of pages.values()) requireThat(page.sha256 === REVIEWED_CONTENT[page.title], `${page.title} full reviewed revision changed`);
  return { adaptiveForce, adaptiveAdRatio: Number(ratio[1]), attackSpeed, abilityHaste, moveSpeed, healthPerLevel, health, tenacity, slowResist: tenacity, evidence };
}

/** Load only committed, offline inputs. A directory cannot relabel a different source dataset. */
export async function loadShardRules(dataset: string, catalog?: RuneCatalog): Promise<ShardRules> {
  requireThat(/^\d+\.\d+$/.test(dataset), "expected a dataset such as 16.21");
  const source = catalog ?? await loadRuneCatalog(path.join(datasetDir(dataset), "rune-sources"));
  requireThat(source.dataset === dataset, `source catalog dataset ${source.dataset} differs from ${dataset}`);
  const bundle: ShardSourceBundle = JSON.parse(await readFile(path.join(datasetDir(dataset), "rune-shard-sources.json"), "utf8"));
  return buildShardRules(source, bundle);
}
