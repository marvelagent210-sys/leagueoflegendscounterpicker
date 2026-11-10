import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { RuneCatalog } from "../../runes/catalog";
import { DATA_DIR } from "../../pipeline/config";
import { buildShardRules, loadShardRules, type ShardSourceBundle } from "../../pipeline/runes/shardRules";

const directory = path.join(DATA_DIR, "16.21");
const originalCatalog = JSON.parse(readFileSync(path.join(directory, "rune-catalog.json"), "utf8")) as RuneCatalog;
const originalBundle = JSON.parse(readFileSync(path.join(directory, "rune-shard-sources.json"), "utf8")) as ShardSourceBundle;
const sha = (text: string) => createHash("sha256").update(text).digest("hex");
const fixture = () => ({ catalog: structuredClone(originalCatalog), bundle: structuredClone(originalBundle) });
type Fixture = ReturnType<typeof fixture>;
const build = ({ catalog, bundle } = fixture()) => buildShardRules(catalog, bundle);

/** Re-pin deliberate corruptions so they exercise semantic guards beyond byte integrity. */
function edit(input: Fixture, title: string, change: (content: string) => string, syncRune = true): void {
  const page = input.bundle.pages.find((candidate) => candidate.title === title)!;
  const content = change(page.content);
  expect(content).not.toBe(page.content);
  page.content = content;
  page.sha256 = sha(content);
  if (title === "Rune" && syncRune) input.catalog.rules = structuredClone(page);
}

describe("pinned stat-shard numeric sources", () => {
  it("compiles all seven shard effects from the reviewed primary sources", () => {
    const rules = build();
    expect(rules).toMatchObject({ adaptiveForce: 9, adaptiveAdRatio: 0.6, attackSpeed: 0.1,
      abilityHaste: 8, moveSpeed: 0.025, healthPerLevel: 10, health: 65, tenacity: 0.15, slowResist: 0.15 });
    expect(rules.adaptiveForce * rules.adaptiveAdRatio).toBeCloseTo(5.4, 12);
    expect(20 * rules.healthPerLevel).toBe(200);
  });

  it("binds all exact full revisions and every evidence excerpt to its page", () => {
    expect(originalBundle.pages).toHaveLength(6);
    expect(originalBundle.pages.map((page) => [page.title, page.revid])).toEqual([
      ["Adaptive force", 4063874], ["Rune", 4091810], ["Slow resist", 4058780],
      ["Template:Adaptive", 4009298], ["Template:Data Garen/Courage", 4064595], ["Tenacity", 4021927],
    ]);
    for (const page of originalBundle.pages) expect(sha(page.content)).toBe(page.sha256);
    expect(originalBundle.pages.find((page) => page.title === "Rune")).toEqual(originalCatalog.rules);
    const evidence = build().evidence;
    expect(evidence.length).toBeGreaterThan(15);
    for (const read of evidence) {
      const page = originalBundle.pages.find((source) => source.title === read.title)!;
      expect(read.revid).toBe(page.revid);
      expect(page.content).toContain(read.text);
    }
    expect(new Set(evidence.map((entry) => entry.title)).size).toBe(6);
  });

  it("keeps raw comparisons, passive exclusions and conflicting tenacity sources explicit", () => {
    const evidence = build().evidence.map((entry) => entry.text).join("\n");
    expect(evidence).toContain("'''Higher Bonus''' AD");
    expect(evidence).toContain("'''equal'''");
    expect(evidence).toContain("'''champion''' [[passive]] effects <u>do not</u>");
    expect(evidence).toContain("{{nie|Awe}}");
    expect(evidence).toContain("different groups stack '''additively'''");
    expect(evidence).toContain("''tenacity reduction'' from {{tip|Brittle}}, but multiplicatively with other sources");
    expect(evidence).toContain("Slow resistance strictly {{tip|stacks multiplicatively}}");
  });

  it("loads the real committed bundle offline without mutating it or the catalog", async () => {
    const before = JSON.stringify({ originalCatalog, originalBundle });
    expect(await loadShardRules("16.21")).toEqual(build());
    expect(await loadShardRules("16.21", originalCatalog)).toEqual(build());
    expect(JSON.stringify({ originalCatalog, originalBundle })).toBe(before);
  });

  it("is deterministic and returns independently owned evidence", () => {
    const source = fixture(), before = JSON.stringify(source);
    expect(build(source)).toEqual(build(source));
    const first = build(source); first.evidence[0]!.text = "changed result";
    expect(build(source).evidence[0]!.text).not.toBe("changed result");
    expect(JSON.stringify(source)).toBe(before);
  });
});

describe("source identity and completeness", () => {
  it.each(originalBundle.pages.map((page) => page.title))("rejects a byte change in %s before trusting its text", (title) => {
    const input = fixture(); input.bundle.pages.find((page) => page.title === title)!.content += "\n";
    expect(() => build(input)).toThrow(/content hash differs/);
  });

  it("rejects a missing, duplicate or unexpected source", () => {
    const missing = fixture(); missing.bundle.pages.pop();
    expect(() => build(missing)).toThrow(/all six/);
    const duplicate = fixture(); duplicate.bundle.pages[1] = structuredClone(duplicate.bundle.pages[0]!);
    expect(() => build(duplicate)).toThrow(/duplicate source/);
    const unknown = fixture(); unknown.bundle.pages[0]!.title = "Unknown rules";
    expect(() => build(unknown)).toThrow(/unexpected source title/);
  });

  it("rejects unreviewed revisions, timestamps and source hashes", () => {
    const revision = fixture(); revision.bundle.pages[0]!.revid++;
    expect(() => build(revision)).toThrow(/revision needs review/);
    const timestamp = fixture(); timestamp.bundle.pages[0]!.timestamp = "2026-11-05";
    expect(() => build(timestamp)).toThrow(/invalid source timestamp/);
    const hash = fixture(); hash.bundle.pages[0]!.sha256 = "invalid";
    expect(() => build(hash)).toThrow(/content hash differs/);
  });

  it("rejects a different source schema, dataset or patch", () => {
    const schema = fixture(); (schema.bundle as { schema: number }).schema = 2;
    expect(() => build(schema)).toThrow(/invalid source schema/);
    const dataset = fixture(); dataset.bundle.dataset = "16.20";
    expect(() => build(dataset)).toThrow(/disagree/);
    const path = fixture(); path.bundle.dataset = "../16.21";
    expect(() => build(path)).toThrow(/invalid source schema/);
    const patch = fixture(); patch.bundle.patch = "26.20";
    expect(() => build(patch)).toThrow(/disagree/);
  });

  it("rejects a source bundle relabeled by the requested directory", async () => {
    const wrong = structuredClone(originalCatalog); wrong.dataset = "16.20";
    await expect(loadShardRules("16.21", wrong)).rejects.toThrow(/catalog dataset 16\.20 differs from 16\.21/);
    await expect(loadShardRules("../16.21")).rejects.toThrow(/expected a dataset/);
  });

  it("requires the catalog's exact Rune revision rather than a second independent copy", () => {
    const input = fixture();
    edit(input, "Rune", (text) => text + "\n", false);
    expect(() => build(input)).toThrow(/differs from the catalog's exact pinned revision/);
    const hash = fixture(); hash.catalog.rules.sha256 = "0".repeat(64);
    expect(() => build(hash)).toThrow(/differs from the catalog's exact pinned revision/);
  });

  it("does not accept a complete-looking snippet with matching numeric reads", () => {
    const input = fixture();
    edit(input, "Adaptive force", (text) => text.slice(0, text.indexOf("== Sources of adaptive force bonuses ==")));
    expect(() => build(input)).toThrow(/full reviewed revision changed/);
  });

  it("requires the exact seven shard IDs and three client row choices", () => {
    const rows = fixture(); rows.catalog.shardSlots[0]!.reverse();
    expect(() => build(rows)).toThrow(/shard rows differ/);
    const ids = fixture(); ids.catalog.shards.pop();
    expect(() => build(ids)).toThrow(/seven reviewed shard IDs/);
  });
});

describe("re-pinned semantic changes require review", () => {
  it.each([
    ["adaptive force", "{{adaptive|9}}", "{{adaptive|10}}"],
    ["attack speed", "{{as|10% '''bonus''' attack speed}}", "{{as|11% '''bonus''' attack speed}}"],
    ["ability haste", "<br />8 ability haste", "<br />9 ability haste"],
    ["movement speed", "{{fd|2.5}}% '''bonus''' movement speed", "{{fd|3.5}}% '''bonus''' movement speed"],
    ["flat health", "{{as|65 '''bonus''' health}}", "{{as|70 '''bonus''' health}}"],
    ["tenacity and slow resist", "<br />15% {{tip|tenacity}}", "<br />10% {{tip|tenacity}}"],
  ])("rejects changed %s values even with re-pinned source digests", (_name, old, next) => {
    const input = fixture(); edit(input, "Rune", (text) => text.replaceAll(old, next));
    expect(() => build(input)).toThrow(/numeric source needs review/);
  });

  it("does not clamp scaling health to level 18 or accept an unreviewed formula", () => {
    const input = fixture();
    edit(input, "Rune", (text) => text.replaceAll("{{pp|10 * x for 20|color=health}}", "{{pp|10 * x for 18|color=health}}"));
    expect(() => build(input)).toThrow(/scaling health reviewed formula changed/);
    const coefficient = fixture();
    edit(coefficient, "Rune", (text) => text.replaceAll("{{pp|10 * x for 20|color=health}}", "{{pp|11 * x for 20|color=health}}"));
    expect(() => build(coefficient)).toThrow(/numeric source needs review/);
  });

  it("requires both repeated shard entries and the original table boundary", () => {
    const missing = fixture();
    edit(missing, "Rune", (text) => text.replace("| [[File:Rune shard Adaptive Force.png|30px|link=]]<br />{{adaptive|9}}\n", ""));
    expect(() => build(missing)).toThrow(/adaptive force needs its complete shard entries/);
    const section = fixture(); edit(section, "Rune", (text) => text.replace("=== Substitutions ===", "=== Other rules ==="));
    expect(() => build(section)).toThrow(/complete reviewed section/);
  });

  it.each([
    ["adaptive AD ratio", "adaptiveAdRatio|0.6", "adaptiveAdRatio|0.5"],
    ["adaptive AP ratio", "adaptiveApRatio|1", "adaptiveApRatio|2"],
  ])("rejects changed %s", (_name, old, next) => {
    const input = fixture(); edit(input, "Adaptive force", (text) => text.replace(old, next));
    expect(() => build(input)).toThrow(/adaptive force conversion needs review/);
  });

  it.each([
    ["raw comparison", "'''Higher Bonus''' AD", "'''Higher normalized''' AD"],
    ["tie break", "are '''equal'''", "are '''unequal'''"],
    ["champion passive exclusion", "'''champion''' [[passive]] effects <u>do not</u>", "'''champion''' [[passive]] effects <u>do</u>"],
    ["item passive exceptions", "{{nie|Awe}}.", "{{nie|Changed}}."],
  ])("rejects changed adaptive %s", (_name, old, next) => {
    const input = fixture(); edit(input, "Adaptive force", (text) => text.replace(old, next));
    expect(() => build(input)).toThrow(/reviewed rule changed/);
  });

  it("binds slow resistance to live multiplicative stacking instead of obsolete shard trivia", () => {
    const input = fixture();
    edit(input, "Slow resist", (text) => text.replace("Slow resistance strictly {{tip|stacks multiplicatively}}", "Slow resistance strictly {{tip|stacks additively}}"));
    expect(() => build(input)).toThrow(/reviewed rule changed/);
  });

  it("requires the shard and Mercury's Treads to remain in Group A", () => {
    const input = fixture();
    edit(input, "Tenacity", (text) => text.replace("* {{ii|Mercury's Treads}}\n", "* {{ii|Changed boots}}\n"));
    expect(() => build(input)).toThrow(/shard and item tenacity group needs review/);
  });

  it("retains the newer specific Courage exception alongside the generic table", () => {
    const input = fixture();
    edit(input, "Template:Data Garen/Courage", (text) => text.replace("but multiplicatively with other sources.", "but additively with other sources."));
    expect(() => build(input)).toThrow(/reviewed rule changed/);
  });
});
