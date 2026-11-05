/** Build an auditable rune inventory without equipping runes or changing duel inputs. */
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CatalogRune, RuneCatalog, RuneWikiSource } from "../../runes/catalog";
import { type TemplateNode, type WikiNode, parseWikitext, preprocess } from "../wikitext/parse";

export const RUNE_SOURCE_FILES = ["runesReforged.json", "perks.json", "perkstyles.json", "wiki-pages.json"] as const;

export interface RuneSourceManifest {
  dataset: string;
  patch: string;
  ddragonVersion: string;
  communityDragonVersion: string;
  files: Record<string, { url: string; sha256: string }>;
}

type JsonObject = Record<string, unknown>;

function requireThat(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Rune catalog: ${message}`);
}

function object(value: unknown, label: string): JsonObject {
  requireThat(value !== null && typeof value === "object" && !Array.isArray(value), `${label} must be an object`);
  return value as JsonObject;
}

function array(value: unknown, label: string): unknown[] {
  requireThat(Array.isArray(value), `${label} must be an array`);
  return value;
}

function text(value: unknown, label: string): string {
  requireThat(typeof value === "string" && value.trim().length > 0, `${label} must be nonempty text`);
  return value;
}

function id(value: unknown, label: string): number {
  requireThat(typeof value === "number" && Number.isSafeInteger(value) && value > 0, `${label} must be a positive integer`);
  return value;
}

function unique<T>(values: readonly T[], label: string): void {
  requireThat(new Set(values).size === values.length, `${label} contains duplicates`);
}

function ids(value: unknown, label: string): number[] {
  const result = array(value, label).map((entry) => id(entry, label));
  requireThat(result.length > 0, `${label} must not be empty`);
  unique(result, label);
  return result;
}

function same(values: readonly unknown[], other: readonly unknown[]): boolean {
  return values.length === other.length && values.every((value, index) => value === other[index]);
}

const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const normalizedName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

/** The sole spelling difference in the two official inventories and the wiki's page title. */
export function runeWikiTitle(name: string): string {
  return `Template:Rune data ${name === "Jack Of All Trades" ? "Jack of All Trades" : name}`;
}

function templates(nodes: WikiNode[]): TemplateNode[] {
  return nodes.flatMap((node) => node.type === "template" ? [node, ...node.args.flatMap((arg) => templates(arg.value))] : []);
}

function wikiFields(source: RuneWikiSource): { path: string; slot: string } {
  const candidates = templates(parseWikitext(preprocess(source.content))).filter((node) => node.args.some((arg) => arg.name?.trim() === "path"));
  requireThat(candidates.length === 1, `${source.title} needs one rune data template with a path`);
  const node = candidates[0]!;
  const field = (name: string) => {
    const matches = node.args.filter((arg) => arg.name?.trim() === name);
    requireThat(matches.length === 1, `${source.title} needs one ${name} field`);
    return matches[0]!.value;
  };
  const literal = (name: string) => {
    const value = field(name);
    requireThat(value.every((part) => part.type === "text"), `${source.title} ${name} must be literal metadata`);
    return text(value.map((part) => (part as Extract<WikiNode, { type: "text" }>).value).join(""), `${source.title} ${name}`).trim();
  };
  const description = field("description");
  requireThat(description.some((part) => part.type !== "text" || part.value.trim().length > 0), `${source.title} has no description`);
  return { path: literal("path"), slot: literal("slot") };
}

function wikiSource(value: unknown): RuneWikiSource {
  const page = object(value, "wiki page");
  const title = text(page.title, "wiki page title");
  const timestamp = text(page.timestamp, `${title} timestamp`);
  requireThat(/T.*(?:Z|[+-]\d\d:\d\d)$/.test(timestamp) && Number.isFinite(Date.parse(timestamp)), `${title} timestamp needs a valid timezone`);
  const content = text(page.content, `${title} content`);
  return { title, revid: id(page.revid, `${title} revision`), timestamp, sha256: hash(content), content };
}

function validateManifest(value: RuneSourceManifest): void {
  const manifest = object(value, "manifest");
  const dataset = text(manifest.dataset, "dataset");
  requireThat(/^\d+\.\d+$/.test(dataset), "dataset must be a version such as 16.21");
  const [major, minor] = dataset.split(".").map(Number);
  requireThat(manifest.patch === `${major! + 10}.${minor}`, "patch does not match the dataset");
  requireThat(typeof manifest.ddragonVersion === "string" && new RegExp(`^${dataset.replace(".", "\\.")}\\.\\d+$`).test(manifest.ddragonVersion), "Data Dragon version does not match the dataset");
  requireThat(manifest.communityDragonVersion === dataset, "CommunityDragon version does not match the dataset");
  const files = object(manifest.files, "source files");
  requireThat(same(Object.keys(files).sort(), [...RUNE_SOURCE_FILES].sort()), "manifest must name exactly the four rune source files");
  const urls: Record<string, string> = {
    "runesReforged.json": `https://ddragon.leagueoflegends.com/cdn/${manifest.ddragonVersion}/data/en_US/runesReforged.json`,
    "perks.json": `https://raw.communitydragon.org/${dataset}/plugins/rcp-be-lol-game-data/global/default/v1/perks.json`,
    "perkstyles.json": `https://raw.communitydragon.org/${dataset}/plugins/rcp-be-lol-game-data/global/default/v1/perkstyles.json`,
    "wiki-pages.json": "https://wiki.leagueoflegends.com/en-us/api.php",
  };
  for (const filename of RUNE_SOURCE_FILES) {
    const source = object(files[filename], `${filename} source`);
    requireThat(source.url === urls[filename], `${filename} URL is not the exact versioned source`);
    requireThat(typeof source.sha256 === "string" && /^[a-f0-9]{64}$/.test(source.sha256), `${filename} source hash is invalid`);
  }
}

/** Every input is hash-checked before its JSON, topology or descriptions are trusted. */
export function buildRuneCatalog(manifest: RuneSourceManifest, files: Record<string, string>): RuneCatalog {
  validateManifest(manifest);
  requireThat(same(Object.keys(files).sort(), [...RUNE_SOURCE_FILES].sort()), "inputs must contain exactly the four source files");
  const parsed: Record<string, unknown> = {};
  for (const filename of RUNE_SOURCE_FILES) {
    requireThat(typeof files[filename] === "string", `${filename} source is missing`);
    requireThat(hash(files[filename]!) === manifest.files[filename]!.sha256, `${filename} source hash differs`);
    try { parsed[filename] = JSON.parse(files[filename]!); }
    catch { throw new Error(`Rune catalog: ${filename} is not valid JSON`); }
  }

  const styles = array(parsed["runesReforged.json"], "Data Dragon paths").map((entry) => object(entry, "Data Dragon path"));
  requireThat(styles.length === 5, "Data Dragon must contain five paths");
  const styleIds = styles.map((style) => id(style.id, "path ID"));
  unique(styleIds, "path IDs");
  unique(styles.map((style) => text(style.key, "path key")), "path keys");
  unique(styles.map((style) => text(style.name, "path name")), "path names");

  const clientRoot = object(parsed["perkstyles.json"], "CommunityDragon path root");
  requireThat(clientRoot.schemaVersion === 2, "unsupported CommunityDragon path schema");
  const clientStyles = array(clientRoot.styles, "CommunityDragon paths").map((entry) => object(entry, "CommunityDragon path"));
  const clientStyleIds = clientStyles.map((style) => id(style.id, "client path ID"));
  unique(clientStyleIds, "client path IDs");
  requireThat(same([...clientStyleIds].sort(), [...styleIds].sort()), "Data Dragon and CommunityDragon paths disagree");
  const clientPerks = array(parsed["perks.json"], "CommunityDragon perks").map((entry) => object(entry, "CommunityDragon perk"));
  const clientPerkIds = clientPerks.map((perk) => id(perk.id, "client perk ID"));
  unique(clientPerkIds, "client perk IDs");
  const perks = new Map(clientPerks.map((perk) => [perk.id as number, perk]));
  const pages = array(parsed["wiki-pages.json"], "wiki pages").map(wikiSource);
  unique(pages.map((page) => page.title), "wiki titles");
  const wiki = new Map(pages.map((page) => [page.title, page]));
  const rules = wiki.get("Rune");
  requireThat(rules, "the full Rune article is missing");
  requireThat(["== Rune paths ==", "=== Shards ===", "=== Substitutions ==="].every((heading) => rules.content.includes(heading)), "the Rune article must retain page rules, shard rules and substitutions");

  const runes: CatalogRune[] = [];
  let shardSlots: number[][] | undefined;
  const paths = styles.map((style) => {
    const pathId = style.id as number;
    const name = text(style.name, "path name");
    const client = clientStyles.find((candidate) => candidate.id === pathId)!;
    requireThat(client.name === name, `${name} path name differs between official sources`);
    const slots = array(style.slots, `${name} slots`);
    const clientSlots = array(client.slots, `${name} client slots`).map((entry) => object(entry, `${name} client slot`));
    requireThat(slots.length === 4 && clientSlots.length === 7, `${name} must have four rune and three shard rows`);
    const pathSlots = slots.map((entry, slot) => {
      const row = array(object(entry, `${name} row`).runes, `${name} row runes`).map((value) => object(value, "rune"));
      requireThat(row.length >= 3 && row.length <= 4 && (slot === 0 || row.length === 3), `${name} row ${slot} has unexpected options`);
      const rowIds = row.map((rune) => id(rune.id, "rune ID"));
      unique(rowIds, `${name} row ${slot}`);
      const expectedType = slot === 0 ? "kKeyStone" : "kMixedRegularSplashable";
      requireThat(clientSlots[slot]!.type === expectedType && same(rowIds, ids(clientSlots[slot]!.perks, `${name} client row ${slot}`)), `${name} row ${slot} differs between official sources`);
      for (const rune of row) {
        const runeId = rune.id as number;
        const runeName = text(rune.name, `${runeId} name`);
        const clientRune = perks.get(runeId);
        requireThat(clientRune, `${runeName} has no client perk`);
        requireThat(normalizedName(text(clientRune.name, `${runeId} client name`)) === normalizedName(runeName), `${runeId} rune names disagree`);
        const source = wiki.get(runeWikiTitle(runeName));
        requireThat(source, `${runeName} wiki data template is missing`);
        const fields = wikiFields(source);
        requireThat(fields.path === name && fields.slot === (slot === 0 ? "Keystone" : String(slot)), `${runeName} wiki path/slot disagrees with the official inventory`);
        runes.push({ id: runeId, key: text(rune.key, `${runeName} key`), name: runeName, pathId, slot,
          icon: text(rune.icon, `${runeName} icon`), shortDescription: text(rune.shortDesc, `${runeName} short description`),
          longDescription: text(rune.longDesc, `${runeName} long description`),
          clientDescription: text(clientRune.longDesc, `${runeName} client description`), wiki: source,
          combatStatus: runeName === "Triple Tonic" ? "legacy-udyr-only" : "not-implemented" });
      }
      return rowIds;
    });
    const clientShards = clientSlots.slice(4).map((slot, index) => {
      requireThat(slot.type === "kStatMod", `${name} shard row ${index} has the wrong type`);
      const values = ids(slot.perks, `${name} shard row ${index}`);
      requireThat(values.length === 3, `${name} shard row ${index} must offer three choices`);
      return values;
    });
    if (!shardSlots) shardSlots = clientShards;
    else requireThat(clientShards.every((row, index) => same(row, shardSlots![index]!)), `${name} shard rows disagree with the other paths`);
    const allowedSecondaryPathIds = ids(client.allowedSubStyles, `${name} secondary paths`);
    requireThat(same([...allowedSecondaryPathIds].sort(), styleIds.filter((value) => value !== pathId).sort()), `${name} secondary paths must be the other four paths`);
    return { id: pathId, key: style.key as string, name, icon: text(style.icon, `${name} icon`), slots: pathSlots, allowedSecondaryPathIds };
  }).sort((a, b) => a.id - b.id);

  requireThat(runes.length === 62, "patch inventory must contain 62 runes");
  unique(runes.map((rune) => rune.id), "rune IDs");
  unique(runes.map((rune) => rune.key), "rune keys");
  unique(runes.map((rune) => normalizedName(rune.name)), "rune names");
  requireThat(runes.filter((rune) => rune.combatStatus === "legacy-udyr-only").length === 1, "the inventory must contain the existing Triple Tonic rune");
  const requiredTitles = ["Rune", ...runes.map((rune) => rune.wiki.title)].sort();
  requireThat(same(pages.map((page) => page.title).sort(), requiredTitles), "wiki inputs must be the Rune article and exactly the 62 current rune templates");
  const shardIds = [...new Set(shardSlots!.flat())].sort((a, b) => a - b);
  requireThat(shardIds.length === 7 && shardIds.every((value) => !runes.some((rune) => rune.id === value)), "there must be seven distinct non-rune shards");
  const shards = shardIds.map((shardId) => {
    const perk = perks.get(shardId);
    requireThat(perk, `shard ${shardId} has no client record`);
    return { id: shardId, name: text(perk.name, `shard ${shardId} name`), icon: text(perk.iconPath, `shard ${shardId} icon`),
      shortDescription: text(perk.shortDesc, `shard ${shardId} short description`), longDescription: text(perk.longDesc, `shard ${shardId} long description`),
      tooltip: text(perk.tooltip, `shard ${shardId} tooltip`) };
  });
  const sources = Object.fromEntries(RUNE_SOURCE_FILES.map((filename) => [filename, { ...manifest.files[filename]! }]));
  const scalingHealth = shards.find((shard) => shard.id === 5001);
  const shardSection = rules.content.slice(rules.content.indexOf("=== Shards ==="), rules.content.indexOf("=== Substitutions ==="));
  requireThat(shardSection.split("{{pp|10 * x for 20|color=health}}").length - 1 === 2, "the reviewed wiki scaling-health shard formulas changed; review the source disagreement before rebuilding");
  requireThat(scalingHealth && /10\s*-\s*180/.test(scalingHealth.longDescription), "the reviewed client scaling-health shard description changed; review the source disagreement before rebuilding");
  const healthDisagreement = "The scaling-health shard's client description gives 10–180 health, while the Rune article's shard formula is 10 times level through level 20 (200 health). Both sources are retained without choosing a combat value.";
  return { schema: 1, dataset: manifest.dataset, patch: manifest.patch, ddragonVersion: manifest.ddragonVersion,
    communityDragonVersion: manifest.communityDragonVersion, paths, runes: runes.sort((a, b) => a.id - b.id), shardSlots: shardSlots!, shards, rules, sources,
    limitations: [
      "This is a source catalog and page-layout inventory. It does not equip a rune page, apply shard stats, implement rune effects, or search rune pages.",
      "Triple Tonic remains modeled only by the existing Udyr option and its separately preserved legacy rune data; this catalog does not enable it for other champions.",
      "Client descriptions may contain unresolved runtime placeholders. Their exact text and the full wiki revisions are retained; no numeric effect is inferred from them.",
      healthDisagreement,
      "The Rune article records champion and game-mode substitutions. Structural page validation does not apply these contextual replacements or certify a page for a particular champion.",
      "Rune effects that depend on elapsed game time, preduel stacks, takedowns, farm, allies, wards, structures or summoner spells require explicit assumptions and source-backed implementation before use.",
    ] };
}

/** Read only the committed source bundle. This never fetches or rewrites an input. */
export async function loadRuneCatalog(sourceDirectory: string): Promise<RuneCatalog> {
  const manifest = JSON.parse(await readFile(path.join(sourceDirectory, "manifest.json"), "utf8")) as RuneSourceManifest;
  const entries = await Promise.all(RUNE_SOURCE_FILES.map(async (filename) => [filename, await readFile(path.join(sourceDirectory, filename), "utf8")] as const));
  return buildRuneCatalog(manifest, Object.fromEntries(entries));
}

const plain = (value: string) => value.replace(/<[^>]*>/g, "").replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
const wikiLink = (source: RuneWikiSource) => `https://wiki.leagueoflegends.com/en-us/${encodeURIComponent(source.title.replace(/ /g, "_"))}?oldid=${source.revid}`;

/** A compact human-readable inventory; full raw revisions stay in the catalog. */
export function runesReport(catalog: RuneCatalog): string {
  const lines = ["# Rune source catalog", "", `Patch ${catalog.patch} (Data Dragon ${catalog.ddragonVersion}, CommunityDragon ${catalog.communityDragonVersion}).`, "",
    `**${catalog.runes.length} runes, ${catalog.paths.length} paths and ${catalog.shards.length} distinct stat shards.** The shard rows offer nine choices across three slots.`, "",
    "This inventory does not add rune effects to the counter picker. Existing duel results and the legacy Triple Tonic option keep their current behavior.", "", "## Paths and runes", "",
    "| Path | Row | Rune | ID | Combat implementation | Wiki revision |", "|---|---|---|--:|---|---|"];
  for (const runePath of catalog.paths) {
    for (let slot = 0; slot < runePath.slots.length; slot++) {
      for (const runeId of runePath.slots[slot]!) {
        const rune = catalog.runes.find((candidate) => candidate.id === runeId)!;
        lines.push(`| ${runePath.name} | ${slot === 0 ? "Keystone" : slot} | ${plain(rune.name)} | ${rune.id} | ${rune.combatStatus === "legacy-udyr-only" ? "Existing Udyr option only" : "Not implemented"} | [${rune.wiki.revid}](${wikiLink(rune.wiki)}) |`);
      }
    }
  }
  lines.push("", "## Stat shards", "", "Client text is preserved as supplied, including unresolved tooltip placeholders. No shard stats are applied to fighters by this catalog build. Explicit manual-duel shard options use the separate source-backed shard equipment; see [the rune audit](../../../docs/runes/README.md).", "",
    "| Slot | Shard | ID | Client description |", "|---|---|--:|---|");
  for (const [index, row] of catalog.shardSlots.entries()) {
    for (const shardId of row) {
      const shard = catalog.shards.find((candidate) => candidate.id === shardId)!;
      lines.push(`| ${["Offense", "Flex", "Defense"][index]} | ${plain(shard.name)} | ${shard.id} | ${plain(shard.longDescription)} |`);
    }
  }
  lines.push("", `Shard values, page rules and contextual substitutions are retained from [Rune revision ${catalog.rules.revid}](${wikiLink(catalog.rules)}).`, "", "## Limits and source disagreements", "",
    ...catalog.limitations.map((limitation) => `- ${limitation}`), "", "## Source files", "", "Each input is checked against its SHA-256 before parsing. The committed source bundle preserves its exact bytes.", "");
  for (const [filename, source] of Object.entries(catalog.sources)) lines.push(`- [${filename}](${source.url}): \`${source.sha256}\``);
  return `${lines.join("\n")}\n`;
}
