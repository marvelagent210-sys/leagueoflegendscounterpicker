import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { DATA_DIR } from "../../pipeline/config";
import { buildCombatRuneRules, COMBAT_RUNE_GAME_URL, loadCombatRuneRules, type CombatRuneSourceBundle } from "../../pipeline/runes/effects";
import type { RuneCatalog } from "../../runes/catalog";

const directory = path.join(DATA_DIR, "16.21");
const originalCatalog = JSON.parse(readFileSync(path.join(directory, "rune-catalog.json"), "utf8")) as RuneCatalog;
const originalBundle = JSON.parse(readFileSync(path.join(directory, "rune-combat-sources.json"), "utf8")) as CombatRuneSourceBundle;
const originalGame = readFileSync(path.join(directory, "rune-game-perks.json"), "utf8");
const sha = (text: string) => createHash("sha256").update(text).digest("hex");
const fixture = () => ({ catalog: structuredClone(originalCatalog), bundle: structuredClone(originalBundle), game: originalGame });
type Fixture = ReturnType<typeof fixture>;
const build = ({ catalog, bundle, game } = fixture()) => buildCombatRuneRules(catalog, bundle, game);
const selected = [8014, 8017, 8299, 8444];
const gamePaths = [
  "Perks/Styles/Precision/CoupDeGrace", "Perks/Styles/Precision/CutDown",
  "Perks/Styles/Precision/LastStand", "Perks/Styles/Resolve/SecondWind",
] as const;
interface GamePerk {
  mPerkId: number;
  mScript: { mSpellScriptData: { mEffectAmount: Record<string, number> } };
}
type Game = Record<string, GamePerk>;

/** Re-pin deliberate edits, including the catalog copy, to reach semantic/full-revision guards. */
function editWiki(input: Fixture, title: string, change: (text: string) => string, syncCatalog = true): void {
  const page = input.bundle.pages.find((source) => source.title === title)!;
  const content = change(page.content);
  expect(content).not.toBe(page.content);
  page.content = content;
  page.sha256 = sha(content);
  const rune = input.catalog.runes.find((entry) => entry.wiki.title === title);
  if (rune && syncCatalog) rune.wiki = structuredClone(page);
}
function editDescription(input: Fixture, name: string, old: string, next: string): void {
  editWiki(input, `Template:Rune data ${name}`, (text) => text.split("\n").map((line) =>
    /^\|description\s*=/.test(line) ? line.replace(old, next) : line).join("\n"));
}
function editGame(input: Fixture, change: (game: Game) => void): void {
  const game = JSON.parse(input.game) as Game;
  change(game);
  input.game = JSON.stringify(game);
}

describe("reviewed combat rune numeric rules", () => {
  it("reads the current Wiki formulas and cross-checks their client float32 values", () => {
    expect(build()).toMatchObject({
      schema: 1, dataset: "16.21", patch: "26.21",
      coupDeGrace: { healthThreshold: 0.4, damageIncrease: 0.08 },
      cutDown: { healthThreshold: 0.6, damageIncrease: 0.08 },
      lastStand: { healthThreshold: 0.6, maximumHealthThreshold: 0.3, minimumDamageIncrease: 0.05, maximumDamageIncrease: 0.11 },
      secondWind: { duration: 10, missingHealthPerSecond: 0.004, tickInterval: 0.5, missingHealthModel: "current-at-regeneration-tick" },
    });
    const game = JSON.parse(originalGame) as Game;
    expect(game[gamePaths[1]]!.mScript.mSpellScriptData.mEffectAmount.BonusPercentDamage).not.toBe(0.08);
    expect(game[gamePaths[1]]!.mScript.mSpellScriptData.mEffectAmount.EnemyHealthPercentageThreshold).not.toBe(0.6);
    expect(originalCatalog.runes.filter((rune) => selected.includes(rune.id)).map((rune) => rune.combatStatus))
      .toEqual(["manual-effects", "manual-effects", "manual-effects", "manual-effects"]);
  });

  it("binds all twelve complete Wiki revisions, full client bytes, and evidence excerpts", () => {
    expect(originalBundle.pages.map((page) => [page.title, page.revid])).toEqual([
      ["Coup de Grace", 3860002], ["Cut Down", 4014921], ["Damage", 4084890], ["Damage modifier", 4050138],
      ["Health regeneration", 4073061], ["Last Stand", 3926332], ["Second Wind", 4012933],
      ["Template:Rune data Coup de Grace", 3859780], ["Template:Rune data Cut Down", 3859781],
      ["Template:Rune data Last Stand", 3859782], ["Template:Rune data Second Wind", 3960974], ["True damage", 4052642],
    ]);
    for (const page of originalBundle.pages) expect(sha(page.content)).toBe(page.sha256);
    expect(originalGame.length).toBeGreaterThan(2_000_000);
    expect(Object.keys(JSON.parse(originalGame) as object)).toHaveLength(335);
    expect(originalBundle.gameData).toEqual({ url: COMBAT_RUNE_GAME_URL, sha256: sha(originalGame) });
    const evidence = build().evidence;
    expect(new Set(evidence.map((entry) => entry.title)).size).toBe(12);
    for (const excerpt of evidence) {
      const source = originalBundle.pages.find((page) => page.title === excerpt.title)!;
      expect(excerpt.revid).toBe(source.revid);
      expect(source.content).toContain(excerpt.text);
    }
    expect(new Set(evidence.map((entry) => JSON.stringify(entry))).size).toBe(evidence.length);
  });

  it("retains source rules for additive outgoing modifiers, true damage exclusions, and regeneration", () => {
    const evidence = build().evidence.map((entry) => entry.text).join("\n");
    expect(evidence).toContain("Modifiers to damage dealt now stack additively instead of multiplicatively");
    expect(evidence).toContain("Modifiers to damage received still stack multiplicatively");
    expect(evidence).toContain("Damage amplifiers are now dealt as a separate damage instance");
    expect(evidence).toContain("including its upgrades");
    expect(evidence).toContain("{{si|Ignite}} cannot be amplified");
    expect(evidence).toContain("'''Pet:'''");
    expect(evidence).toContain("0 damage");
    expect(evidence).toContain("Dealt to {{tip|shield|shields}}");
    expect(evidence).toContain("Absorbed by {{tip|invulnerable|invulnerability}}");
    expect(evidence).toContain("Revitalize");
    expect(evidence).toContain("{{ap|5*4/10}}%");
  });

  it("loads committed sources offline and returns deterministic independently owned results", async () => {
    const input = fixture(), before = JSON.stringify(input);
    const first = build(input);
    expect(build(input)).toEqual(first);
    expect(await loadCombatRuneRules("16.21")).toEqual(first);
    expect(await loadCombatRuneRules("16.21", input.catalog)).toEqual(first);
    first.evidence[0]!.text = "changed result";
    expect(build(input).evidence[0]!.text).not.toBe("changed result");
    expect(JSON.stringify(input)).toBe(before);
  });
});

describe("exact source identity and completeness", () => {
  it.each(originalBundle.pages.map((page) => page.title))("rejects raw content edits and changed revision metadata for %s", (title) => {
    const bytes = fixture(); bytes.bundle.pages.find((page) => page.title === title)!.content += "\n";
    expect(() => build(bytes)).toThrow(/content hash differs/);
    const revision = fixture(); revision.bundle.pages.find((page) => page.title === title)!.revid++;
    expect(() => build(revision)).toThrow(/revision or timestamp needs review/);
    const timestamp = fixture(); timestamp.bundle.pages.find((page) => page.title === title)!.timestamp = "2026-11-06T00:00:00Z";
    expect(() => build(timestamp)).toThrow(/revision or timestamp needs review/);
  });

  it("rejects missing, duplicate, extra, unknown, empty and wrongly hashed sources", () => {
    const missing = fixture(); missing.bundle.pages.pop();
    expect(() => build(missing)).toThrow(/all twelve complete/);
    const duplicate = fixture(); duplicate.bundle.pages[1] = structuredClone(duplicate.bundle.pages[0]!);
    expect(() => build(duplicate)).toThrow(/duplicate Wiki source/);
    const extra = fixture(); extra.bundle.pages.push(structuredClone(extra.bundle.pages[0]!));
    expect(() => build(extra)).toThrow(/all twelve complete/);
    const unknown = fixture(); unknown.bundle.pages[0]!.title = "Unreviewed rule";
    expect(() => build(unknown)).toThrow(/unexpected Wiki source title/);
    const empty = fixture(); editWiki(empty, "Damage", () => "");
    expect(() => build(empty)).toThrow(/content hash differs/);
    const hash = fixture(); hash.bundle.pages[0]!.sha256 = "0".repeat(64);
    expect(() => build(hash)).toThrow(/content hash differs/);
  });

  it.each(selected)("requires the exact catalog identity, position and template for rune %s", (id) => {
    for (const key of ["name", "pathId", "slot"] as const) {
      const input = fixture(), rune = input.catalog.runes.find((entry) => entry.id === id)!;
      if (key === "name") rune.name += " changed";
      else rune[key]++;
      expect(() => build(input)).toThrow(/catalog identity or position differs/);
    }
    for (const key of ["title", "revid", "timestamp", "content", "sha256"] as const) {
      const input = fixture(), wiki = input.catalog.runes.find((entry) => entry.id === id)!.wiki;
      if (key === "revid") wiki.revid++;
      else wiki[key] += " changed";
      expect(() => build(input)).toThrow(/template differs from the catalog's exact source/);
    }
    const missing = fixture(); missing.catalog.runes = missing.catalog.runes.filter((entry) => entry.id !== id);
    expect(() => build(missing)).toThrow(/exactly one/);
    const duplicate = fixture(); duplicate.catalog.runes.push(structuredClone(duplicate.catalog.runes.find((entry) => entry.id === id)!));
    expect(() => build(duplicate)).toThrow(/exactly one/);
  });

  it("rejects source snippets even when all excerpts and numeric reads remain present", () => {
    const wiki = fixture();
    const excerpts = build().evidence.filter((entry) => entry.title === "Damage modifier").map((entry) => entry.text).join("\n");
    editWiki(wiki, "Damage modifier", () => excerpts);
    expect(() => build(wiki)).toThrow(/Damage modifier full reviewed revision changed/);
    const game = fixture();
    editGame(game, (records) => { for (const key of Object.keys(records)) if (!gamePaths.includes(key as typeof gamePaths[number])) delete records[key]; });
    expect(() => build(game)).toThrow(/complete reviewed game source changed/);
  });

  it("rejects unrelated re-pinned Wiki edits and any client byte change", () => {
    const wiki = fixture(); editWiki(wiki, "Damage", (text) => text + "\n<!-- editorial edit -->\n");
    expect(() => build(wiki)).toThrow(/Damage full reviewed revision changed/);
    const game = fixture(); game.game += "\n";
    expect(() => build(game)).toThrow(/complete reviewed game source changed/);
    const unrelated = fixture(); editGame(unrelated, (records) => { delete records["Perks/Styles/Domination"]; });
    expect(() => build(unrelated)).toThrow(/complete reviewed game source changed/);
  });

  it("rejects empty, malformed, non-object or missing-perk client sources", () => {
    for (const text of ["", "{", "null", "[]"]) {
      const input = fixture(); input.game = text;
      expect(() => build(input)).toThrow(/complete game source text is required|invalid game data JSON/);
    }
    const missing = fixture(); editGame(missing, (records) => { delete records[gamePaths[2]]; });
    expect(() => build(missing)).toThrow(/Last Stand game perk must be an object/);
  });
});

describe("dataset and version binding", () => {
  it.each(["schema", "dataset", "patch"] as const)("rejects an unreviewed source %s", (key) => {
    const input = fixture();
    if (key === "schema") (input.bundle as { schema: number }).schema = 2;
    else input.bundle[key] = key === "dataset" ? "16.20" : "26.20";
    expect(() => build(input)).toThrow(/source dataset or patch needs review/);
  });

  it.each(["schema", "dataset", "patch", "ddragonVersion", "communityDragonVersion"] as const)("rejects a catalog %s from different inputs", (key) => {
    const input = fixture();
    if (key === "schema") (input.catalog as { schema: number }).schema = 2;
    else input.catalog[key] = "unreviewed";
    expect(() => build(input)).toThrow(/catalog versions differ/);
  });

  it("rejects redirected, unversioned or re-pinned client descriptors", () => {
    for (const url of [COMBAT_RUNE_GAME_URL.replace("16.21", "latest"), COMBAT_RUNE_GAME_URL + "?alternate=1"]) {
      const input = fixture(); input.bundle.gameData.url = url;
      expect(() => build(input)).toThrow(/game source version or hash needs review/);
    }
    const hash = fixture(); hash.game += "\n"; hash.bundle.gameData.sha256 = sha(hash.game);
    expect(() => build(hash)).toThrow(/game source version or hash needs review/);
  });

  it("prevents a requested directory from relabeling the reviewed sources", async () => {
    for (const dataset of ["16.20", "../16.21", "latest"]) await expect(loadCombatRuneRules(dataset)).rejects.toThrow(/expected the reviewed dataset/);
    const catalog = fixture().catalog; catalog.dataset = "16.20";
    await expect(loadCombatRuneRules("16.21", catalog)).rejects.toThrow(/catalog versions differ/);
  });
});

describe("re-pinned semantic changes", () => {
  it.each([
    ["Coup de Grace", "Deal 8%", "Deal 9%", "BonusPercentDamage"],
    ["Coup de Grace", "{{as|40%", "{{as|45%", "EnemyHealthPercentageThreshold"],
    ["Cut Down", "Deal 8%", "Deal 9%", "BonusPercentDamage"],
    ["Cut Down", "{{as|60%", "{{as|65%", "EnemyHealthPercentageThreshold"],
    ["Last Stand", "Deal 5%", "Deal 6%", "MinBonusDamagePercent"],
    ["Last Stand", "{{as|60%", "{{as|65%", "HealthThresholdStart"],
    ["Last Stand", "up to 11%", "up to 12%", "MaxBonusDamagePercent"],
    ["Last Stand", "{{as|30%", "{{as|35%", "HealthThresholdEnd"],
    ["Second Wind", "{{as|4%", "{{as|5%", "RegenPercentMax"],
    ["Second Wind", "over 10 seconds", "over 12 seconds", "RegenSeconds"],
  ])("cross-checks changed %s Wiki %s with the actual client field", (name, old, next, field) => {
    const input = fixture(); editDescription(input, name, old, next);
    expect(() => build(input)).toThrow(new RegExp(`${field} disagree`));
  });

  it("does not parse historical text when the current description is absent, duplicated or changed", () => {
    const missing = fixture(); editWiki(missing, "Template:Rune data Cut Down", (text) => text.replace("|description  =", "|historical ="));
    expect(() => build(missing)).toThrow(/complete current description/);
    const duplicate = fixture(); editWiki(duplicate, "Template:Rune data Cut Down", (text) => text + "\n" + text.split("\n").find((line) => /^\|description\s*=/.test(line))!);
    expect(() => build(duplicate)).toThrow(/complete current description/);
    const old = fixture(); editDescription(old, "Cut Down", "champions above", "champions with more maximum health than you above");
    expect(() => build(old)).toThrow(/Cut Down reviewed formula changed/);
  });

  it.each(["BonusPercentDamage", "EnemyHealthPercentageThreshold"])("uses Cut Down's current %s field", (key) => {
    const input = fixture(); editGame(input, (game) => { game[gamePaths[1]]!.mScript.mSpellScriptData.mEffectAmount[key] = 0.15; });
    expect(() => build(input)).toThrow(new RegExp(`Cut Down Wiki/game ${key} disagree`));
  });

  it.each(["MinBonusDamagePercent", "MaxBonusDamagePercent", "MinHealthDifference", "MaxHealthDifference"])("ignores obsolete Cut Down %s for numeric rules while retaining the full source seal", (key) => {
    const input = fixture(); editGame(input, (game) => { game[gamePaths[1]]!.mScript.mSpellScriptData.mEffectAmount[key] = 42; });
    expect(() => build(input)).toThrow(/complete reviewed game source changed/);
  });

  it("rejects jointly altered Wiki and game formulas despite matching local hashes", () => {
    const input = fixture(); editDescription(input, "Cut Down", "Deal 8%", "Deal 9%");
    editGame(input, (game) => { game[gamePaths[1]]!.mScript.mSpellScriptData.mEffectAmount.BonusPercentDamage = Math.fround(0.09); });
    expect(() => build(input)).toThrow(/Template:Rune data Cut Down full reviewed revision changed/);
  });

  it("checks the selected client ID, nested script amounts and Second Wind's zero flat healing", () => {
    const id = fixture(); editGame(id, (game) => { game[gamePaths[0]]!.mPerkId = 8017; });
    expect(() => build(id)).toThrow(/Coup de Grace game ID differs/);
    const script = fixture(); editGame(script, (game) => { delete (game[gamePaths[2]]!.mScript as Partial<GamePerk["mScript"]>).mSpellScriptData; });
    expect(() => build(script)).toThrow(/Last Stand game script data must be an object/);
    const flat = fixture(); editGame(flat, (game) => { game[gamePaths[3]]!.mScript.mSpellScriptData.mEffectAmount.RegenFlat = 3; });
    expect(() => build(flat)).toThrow(/Second Wind Wiki\/game RegenFlat disagree/);
    const missing = fixture(); editGame(missing, (game) => { delete game[gamePaths[3]]!.mScript.mSpellScriptData.mEffectAmount.RegenPercentMax; });
    expect(() => build(missing)).toThrow(/Second Wind Wiki\/game RegenPercentMax disagree/);
  });

  it("cross-checks HP5 duration and rejects altered regeneration intervals and additive rules", () => {
    const hp5 = fixture(); editWiki(hp5, "Second Wind", (text) => text.replace("{{ap|5*4/10}}", "{{ap|5*4/12}}"));
    expect(() => build(hp5)).toThrow(/HP5 and duration disagree/);
    const interval = fixture(); editWiki(interval, "Health regeneration", (text) => text.replace("Health regeneration occurs in {{fd|0.5}}", "Health regeneration occurs in {{fd|1}}"));
    expect(() => build(interval)).toThrow(/health regeneration interval needs review/);
    const modifiers = fixture(); editWiki(modifiers, "Damage modifier", (text) => text.replace("Modifiers to damage dealt now stack additively", "Modifiers to damage dealt now stack multiplicatively"));
    expect(() => build(modifiers)).toThrow(/Damage modifier reviewed rule changed/);
  });
});
