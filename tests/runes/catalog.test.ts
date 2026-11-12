import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { buildRuneCatalog, RUNE_SOURCE_FILES, type RuneSourceManifest, runeWikiTitle, runesReport } from "../../pipeline/runes/catalog";
import { DATA_DIR } from "../../pipeline/config";

const SOURCE_DIRECTORY = path.join(DATA_DIR, "16.21", "rune-sources");
const originalManifest = JSON.parse(readFileSync(path.join(SOURCE_DIRECTORY, "manifest.json"), "utf8")) as RuneSourceManifest;
const originalFiles = Object.fromEntries(RUNE_SOURCE_FILES.map((filename) => [filename, readFileSync(path.join(SOURCE_DIRECTORY, filename), "utf8")]));
const sha = (content: string) => createHash("sha256").update(content).digest("hex");
const fixture = () => ({ manifest: structuredClone(originalManifest), files: { ...originalFiles } });
type Bundle = ReturnType<typeof fixture>;

interface RawRune { id: number; key: string; name: string; shortDesc: string; longDesc: string }
interface RawStyle { id: number; key: string; name: string; slots: Array<{ runes: RawRune[] }> }
interface ClientStyle { id: number; name: string; slots: Array<{ type: string; perks: number[] }>; allowedSubStyles: number[] }
interface ClientPerk { id: number; name: string; longDesc: string; shortDesc: string; tooltip: string }
interface RawWiki { title: string; revid: number; timestamp: string; content: string }

/** Re-sign deliberate semantic changes, so tests reach validation beyond the byte-hash guard. */
function edit<T>(input: Bundle, filename: string, change: (data: T) => void): void {
  const value = JSON.parse(input.files[filename]!) as T;
  change(value);
  input.files[filename] = `${JSON.stringify(value, null, 2)}\n`;
  input.manifest.files[filename]!.sha256 = sha(input.files[filename]!);
}

const build = (input = fixture()) => buildRuneCatalog(input.manifest, input.files);

describe("patch 26.21 rune source catalog", () => {
  it("contains every current path, rune and shard in both official inventories", () => {
    const catalog = build();
    expect(catalog.paths.map((entry) => entry.id)).toEqual([8000, 8100, 8200, 8300, 8400]);
    expect(catalog.runes).toHaveLength(62);
    expect(catalog.shards).toHaveLength(7);
    expect(catalog.paths.reduce((count, entry) => count + entry.slots.flat().length, 0)).toBe(62);
    expect(catalog.shardSlots).toEqual([[5008, 5005, 5007], [5008, 5010, 5001], [5011, 5013, 5001]]);
    expect(catalog.runes.find((entry) => entry.id === 8230)?.name).toBe("Stormraider's Surge");
    expect(catalog.runes.find((entry) => entry.id === 8992)?.name).toBe("Deathfire Touch");
    expect(catalog.runes.some((entry) => entry.name === "Phase Rush")).toBe(false);
  });

  it("retains all 63 complete raw wiki revisions and their exact content digests", () => {
    const catalog = build();
    const pages = JSON.parse(originalFiles["wiki-pages.json"]!) as RawWiki[];
    const actual = [catalog.rules, ...catalog.runes.map((entry) => entry.wiki)];
    expect(actual).toHaveLength(63);
    for (const page of pages) {
      expect(actual.find((entry) => entry.title === page.title)).toEqual({ title: page.title, revid: page.revid, timestamp: page.timestamp, content: page.content, sha256: sha(page.content) });
    }
    expect(catalog.rules.content).toContain("{{pp|10 * x for 20|color=health}}");
  });

  it("keeps client shard placeholders and the 180-versus-200 source conflict explicit", () => {
    const catalog = build();
    const health = catalog.shards.find((entry) => entry.id === 5001)!;
    expect(health.longDescription).toBe("+10-180 Health (based on level)");
    expect(health.tooltip).toContain("@f1@");
    expect(catalog.limitations.join("\n")).toContain("level 20 (200 health)");
    const report = runesReport(catalog);
    expect(report).toContain("10–180 health");
    expect(report).toContain("No shard stats are applied to fighters");
    expect(report).toContain("62 runes, 5 paths and 7 distinct stat shards");
  });

  it("requires a new source review if either side of the shard disagreement changes", () => {
    const input = fixture();
    edit<RawWiki[]>(input, "wiki-pages.json", (pages) => {
      const page = pages.find((entry) => entry.title === "Rune")!;
      page.content = page.content.replaceAll("{{pp|10 * x for 20|color=health}}", "{{pp|10 * x for 18|color=health}}");
    });
    expect(() => build(input)).toThrow(/reviewed wiki scaling-health shard formulas changed/);
    const client = fixture();
    edit<ClientPerk[]>(client, "perks.json", (perks) => { perks.find((entry) => entry.id === 5001)!.longDesc = "+10-200 Health (based on level)"; });
    expect(() => build(client)).toThrow(/reviewed client scaling-health shard description changed/);
  });

  it("distinguishes partial manual effects, unimplemented runes and the narrow Triple Tonic status", () => {
    const catalog = build();
    expect(catalog.runes.filter((entry) => entry.combatStatus === "not-implemented")).toHaveLength(52);
    expect(catalog.runes.filter((entry) => entry.combatStatus === "manual-effects").map((entry) => entry.id).sort((a, b) => a - b)).toEqual([8014, 8017, 8299, 8444, 9101, 9103, 9104, 9105, 9111]);
    expect(catalog.runes.filter((entry) => entry.combatStatus === "legacy-udyr-only").map((entry) => entry.name)).toEqual(["Triple Tonic"]);
    expect(catalog.limitations.join("\n")).toContain("does not equip a rune page");
    expect(catalog.limitations.join("\n")).toContain("contextual replacements");
  });

  it("keeps the wiki's actual Jack of All Trades title without changing official display names", () => {
    const rune = build().runes.find((entry) => entry.name === "Jack Of All Trades")!;
    expect(rune.wiki.title).toBe("Template:Rune data Jack of All Trades");
    expect(runeWikiTitle("Press the Attack")).toBe("Template:Rune data Press the Attack");
  });

  it("is deterministic and does not mutate any supplied raw source or manifest", () => {
    const input = fixture();
    const before = JSON.stringify(input);
    expect(build(input)).toEqual(build(input));
    expect(runesReport(build(input))).toBe(runesReport(build(input)));
    expect(JSON.stringify(input)).toBe(before);
  });
});

describe("source provenance and version guards", () => {
  it.each(RUNE_SOURCE_FILES)("rejects any byte change to %s without a matching source hash", (filename) => {
    const input = fixture();
    input.files[filename] += "\n";
    expect(() => build(input)).toThrow(/source hash differs/);
  });

  it.each(RUNE_SOURCE_FILES)("rejects a missing %s source or manifest record", (filename) => {
    const input = fixture();
    delete input.files[filename];
    expect(() => build(input)).toThrow(/exactly the four/);
    const next = fixture();
    delete next.manifest.files[filename];
    expect(() => build(next)).toThrow(/exactly the four/);
  });

  it.each(RUNE_SOURCE_FILES)("rejects unpinned or redirected metadata for %s", (filename) => {
    const input = fixture();
    input.manifest.files[filename]!.url = input.manifest.files[filename]!.url.replace("16.21", "latest") + "?alternate=1";
    expect(() => build(input)).toThrow(/exact versioned source/);
  });

  it.each(["patch", "ddragonVersion", "communityDragonVersion"] as const)("rejects %s belonging to another patch", (key) => {
    const input = fixture();
    input.manifest[key] = key === "patch" ? "26.20" : key === "ddragonVersion" ? "16.20.1" : "16.20";
    expect(() => build(input)).toThrow(/does not match/);
  });

  it("rejects invalid datasets, invalid digests, malformed JSON and unexpected inputs", () => {
    const badDataset = fixture(); badDataset.manifest.dataset = "../16.21";
    expect(() => build(badDataset)).toThrow(/dataset must/);
    const badHash = fixture(); badHash.manifest.files["perks.json"]!.sha256 = "missing";
    expect(() => build(badHash)).toThrow(/source hash is invalid/);
    const badJson = fixture(); badJson.files["perks.json"] = "{"; badJson.manifest.files["perks.json"]!.sha256 = sha("{");
    expect(() => build(badJson)).toThrow(/not valid JSON/);
    const extra = fixture(); extra.files["unreviewed.json"] = "{}";
    expect(() => build(extra)).toThrow(/exactly the four/);
  });
});

describe("official inventory cross-checks", () => {
  it("rejects a duplicated path, rune, client ID or secondary path", () => {
    const paths = fixture();
    edit<RawStyle[]>(paths, "runesReforged.json", (styles) => { styles[1]!.id = styles[0]!.id; });
    expect(() => build(paths)).toThrow(/path IDs contains duplicates/);
    const runes = fixture();
    edit<RawStyle[]>(runes, "runesReforged.json", (styles) => { styles[0]!.slots[0]!.runes[1]!.id = styles[0]!.slots[0]!.runes[0]!.id; });
    expect(() => build(runes)).toThrow(/contains duplicates/);
    const clientIds = fixture();
    edit<ClientPerk[]>(clientIds, "perks.json", (perks) => { perks.push({ ...perks[0]! }); });
    expect(() => build(clientIds)).toThrow(/client perk IDs contains duplicates/);
    const secondary = fixture();
    edit<{ styles: ClientStyle[] }>(secondary, "perkstyles.json", ({ styles }) => { styles[0]!.allowedSubStyles[1] = styles[0]!.allowedSubStyles[0]!; });
    expect(() => build(secondary)).toThrow(/secondary paths contains duplicates/);
  });

  it("rejects a missing path, altered row topology and a wrong client row type", () => {
    const missing = fixture(); edit<RawStyle[]>(missing, "runesReforged.json", (styles) => { styles.pop(); });
    expect(() => build(missing)).toThrow(/five paths/);
    const topology = fixture();
    edit<{ styles: ClientStyle[] }>(topology, "perkstyles.json", ({ styles }) => { styles[0]!.slots[1]!.perks.reverse(); });
    expect(() => build(topology)).toThrow(/differs between official sources/);
    const type = fixture();
    edit<{ styles: ClientStyle[] }>(type, "perkstyles.json", ({ styles }) => { styles[0]!.slots[0]!.type = "kStatMod"; });
    expect(() => build(type)).toThrow(/differs between official sources/);
  });

  it("rejects a missing client rune and a conflicting official name", () => {
    const missing = fixture(); edit<ClientPerk[]>(missing, "perks.json", (perks) => { perks.splice(perks.findIndex((entry) => entry.id === 8005), 1); });
    expect(() => build(missing)).toThrow(/has no client perk/);
    const name = fixture(); edit<ClientPerk[]>(name, "perks.json", (perks) => { perks.find((entry) => entry.id === 8005)!.name = "Not Press the Attack"; });
    expect(() => build(name)).toThrow(/rune names disagree/);
  });

  it("rejects inconsistent or empty shard rows and a missing shard record", () => {
    const inconsistent = fixture();
    edit<{ styles: ClientStyle[] }>(inconsistent, "perkstyles.json", ({ styles }) => { styles[1]!.slots[4]!.perks.reverse(); });
    expect(() => build(inconsistent)).toThrow(/shard rows disagree/);
    const empty = fixture();
    edit<{ styles: ClientStyle[] }>(empty, "perkstyles.json", ({ styles }) => { styles[0]!.slots[4]!.perks = []; });
    expect(() => build(empty)).toThrow(/must not be empty/);
    const missing = fixture(); edit<ClientPerk[]>(missing, "perks.json", (perks) => { perks.splice(perks.findIndex((entry) => entry.id === 5001), 1); });
    expect(() => build(missing)).toThrow(/shard 5001 has no client record/);
  });

  it("rejects a same-path secondary selection in the client topology", () => {
    const input = fixture();
    edit<{ styles: ClientStyle[] }>(input, "perkstyles.json", ({ styles }) => { styles[0]!.allowedSubStyles[0] = styles[0]!.id; });
    expect(() => build(input)).toThrow(/secondary paths must be the other four/);
  });
});

describe("complete pinned wiki evidence", () => {
  it("rejects absent, duplicated and empty rune templates", () => {
    const missing = fixture(); edit<RawWiki[]>(missing, "wiki-pages.json", (pages) => { pages.splice(pages.findIndex((page) => page.title.endsWith("Press the Attack")), 1); });
    expect(() => build(missing)).toThrow(/wiki data template is missing/);
    const duplicate = fixture(); edit<RawWiki[]>(duplicate, "wiki-pages.json", (pages) => { pages.push({ ...pages[0]! }); });
    expect(() => build(duplicate)).toThrow(/wiki titles contains duplicates/);
    const empty = fixture(); edit<RawWiki[]>(empty, "wiki-pages.json", (pages) => { pages[0]!.content = ""; });
    expect(() => build(empty)).toThrow(/content must be nonempty/);
  });

  it("rejects invalid revisions and timestamps instead of silently inventing provenance", () => {
    const revision = fixture(); edit<RawWiki[]>(revision, "wiki-pages.json", (pages) => { pages[0]!.revid = 0; });
    expect(() => build(revision)).toThrow(/revision must be a positive integer/);
    const timestamp = fixture(); edit<RawWiki[]>(timestamp, "wiki-pages.json", (pages) => { pages[0]!.timestamp = "2026-11-04"; });
    expect(() => build(timestamp)).toThrow(/timestamp needs a valid timezone/);
  });

  it("rejects empty descriptions and conflicting wiki row metadata", () => {
    const description = fixture();
    edit<RawWiki[]>(description, "wiki-pages.json", (pages) => {
      const page = pages.find((entry) => entry.title.endsWith("Press the Attack"))!;
      page.content = page.content.replace(/\|description\s*=[\s\S]*?(?=\n\|description2)/, "|description = ");
    });
    expect(() => build(description)).toThrow(/has no description/);
    const slot = fixture();
    edit<RawWiki[]>(slot, "wiki-pages.json", (pages) => {
      const page = pages.find((entry) => entry.title.endsWith("Press the Attack"))!;
      page.content = page.content.replace(/\|slot\s*=\s*Keystone/, "|slot = 3");
    });
    expect(() => build(slot)).toThrow(/wiki path\/slot disagrees/);
  });

  it("requires the complete Rune rules article and refuses unrelated extra evidence", () => {
    const missing = fixture(); edit<RawWiki[]>(missing, "wiki-pages.json", (pages) => { pages.splice(pages.findIndex((page) => page.title === "Rune"), 1); });
    expect(() => build(missing)).toThrow(/full Rune article is missing/);
    const partial = fixture(); edit<RawWiki[]>(partial, "wiki-pages.json", (pages) => { pages.find((entry) => entry.title === "Rune")!.content = "A partial snippet"; });
    expect(() => build(partial)).toThrow(/retain page rules, shard rules and substitutions/);
    const extra = fixture(); edit<RawWiki[]>(extra, "wiki-pages.json", (pages) => { pages.push({ ...pages[0]!, title: "Unreviewed extra page" }); });
    expect(() => build(extra)).toThrow(/exactly the 62 current rune templates/);
  });
});
