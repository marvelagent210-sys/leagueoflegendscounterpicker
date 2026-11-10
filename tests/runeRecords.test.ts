/** The rune catalog (M8's loadouts): which runes and shards it holds, how the wiki's rune data is read, and the committed catalog. */
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { Series } from "../engine/abilities";
import { DATA_DIR } from "../pipeline/config";
import { latestDataset } from "../pipeline/datasets";
import { readJson } from "../pipeline/lib/files";
import { type ClientPerk, type ClientPerkStyles, type RuneRecords, type RuneEntry, buildRuneRecords, currentRunes, spellOutAdaptive, templateFields } from "../pipeline/runeRecords/records";
import type { DDragonRunePath } from "../pipeline/sources/ddragon";
import type { WikiPage } from "../pipeline/sources/wiki";

const page = (title: string, content: string, revid = 1): WikiPage => ({ title, pageid: revid, revid, timestamp: "2026-11-01T00:00:00Z", content });
const rune = (id: number, name: string) => ({ id, key: name.replace(/\W/g, ""), name });

/** Data Dragon's rune list, cut down to one path: a keystone row and a lesser row. */
const DDRAGON: DDragonRunePath[] = [{ id: 8000, key: "Precision", name: "Precision", slots: [{ runes: [rune(8010, "Conqueror")] }, { runes: [rune(9101, "Jack Of All Trades")] }] }];

const dataTemplate = (name: string, fields: string, prelude = "") =>
  `${prelude}{{{{{1<noinclude>|Rune data</noinclude>}}}|${name}|{{{2|}}}|{{{3|}}}|{{{4|}}}|{{{5|}}}\n${fields}\n}}`;

const RUNE_ARTICLE = `Each rune page contains runes from two paths.
=== Shards ===
{|class="article-table"
! Option 1
|-
! align="center" | Slot 1<br />{{sbc|Offense}}
| [[File:Rune shard Adaptive Force.png|30px|link=]]<br />{{adaptive|9}}
|-
! align="center" | Slot 2<br />{{sbc|Defense}}
| [[File:Rune shard Health Scaling.png|30px|link=]]<br />{{pp|10 * x for 20|color=health}} {{as|'''bonus''' health}}
|}

=== Substitutions ===
* For champions without immobilizing effects, {{ri|Aftershock}} is exchanged with {{ri|Grasp of the Undying}}.
** Nested.
== Trivia ==`;

const PAGES = [
  page("Template:Rune data Conqueror", dataTemplate("Conqueror", `|path = Precision\n|slot = Keystone\n|description = {{sbc|Passive:}} Gain {{rd|2|1}} stacks.\n|description2 = Each stack grants {{adaptive|1.8 + (4-1.8)/17*(x-1)|20}}.\n|description3 = {{Tip data/Adaptive damage|pst2|description}}\n|cooldown = \n|range =`), 11),
  page("Template:Rune data Jack of All Trades", dataTemplate("Jack of All Trades", `|path = Precision\n|slot = 1\n|description = {{Unique|Jack|Gain {{#var:haste}} ability haste per stat.}}\n|cooldown = {{#var:haste}}`, "{{#vardefine:haste|1}}<!-- set before the call -->"), 12),
  page("Conqueror", "== Notes ==\n* Ranged champions gain one stack.\n== Trivia ==", 13),
  page("Jack of All Trades", "No notes here.", 14),
  page("Rune", RUNE_ARTICLE, 15),
  page("Adaptive force", "1 point of Adaptive Force provides 0.6 bonus AD or 1 AP.", 16),
  page("Template:Adaptive", "{{#vardefine:af|{{#ifeq:{{{wr|}}}|true|0.5|0.6}}}}", 17),
  page("Template:Tip data/Adaptive damage", "{{Tip data|description = Adaptive damage is physical or magic.}}", 18),
];

const PERKS: ClientPerk[] = [
  { id: 5008, name: "Adaptive Force", shortDesc: "+9 <lol-uikit-tooltipped-keyword key='x'>Adaptive Force</lol-uikit-tooltipped-keyword>" },
  { id: 5001, name: "Health Scaling", shortDesc: "+10-180 Health (based on level)" },
];
const STYLES: ClientPerkStyles = { styles: [{ slots: [{ type: "kKeyStone", slotLabel: "", perks: [8010] }, { type: "kStatMod", slotLabel: "Offense", perks: [5008] }, { type: "kStatMod", slotLabel: "Defense", perks: [5001] }] }] };

const championData = { name: () => undefined, get: () => undefined, apiname: () => undefined } as never;

function catalog(pages = PAGES, ddragon = DDRAGON, perks = PERKS): RuneRecords {
  return buildRuneRecords({ dataset: "16.21", patch: "26.21", ddragonVersion: "16.21.1", ddragon, cdragonVersion: "16.21.1", perks, perkStyles: STYLES, pages, championData });
}

/** A series' value at a champion level. */
function atLevel(series: Series, level: number): number {
  const value = series.kind === "level" ? series.values[level - 1] : series.kind === "variable" && series.variable === "level" ? series.values[series.points.indexOf(level)] : undefined;
  if (typeof value !== "number") throw new Error(`No value at level ${level}: ${JSON.stringify(series)}`);
  return value;
}

describe("rune data templates", () => {
  it("are read field by field at the data call's level, nested calls and the variables set before it included", () => {
    const { fields, prelude } = templateFields(PAGES[1]!.content);
    expect([...fields.keys()]).toEqual(["path", "slot", "description", "cooldown"]);
    expect(fields.get("description")).toBe("{{Unique|Jack|Gain {{#var:haste}} ability haste per stat.}}");
    expect(prelude).toBe("{{#vardefine:haste|1}}");
  });

  it("spell adaptive force out as Template:Adaptive writes it: 60% of it as bonus attack damage, or all of it as ability power", () => {
    expect(spellOutAdaptive("{{adaptive|9}}")).toBe("{{as|5.4 '''bonus''' attack damage}} or {{as|9 ability power}} (adaptive)");
    expect(spellOutAdaptive("{{adaptive|1.8 + x|20}}")).toBe("{{as|{{pp|(1.8 + x)*0.6 for 20}} '''bonus''' attack damage}} or {{as|{{pp|1.8 + x for 20}} ability power}} (adaptive)");
    expect(() => spellOutAdaptive("{{adaptive|1 to 2}}")).toThrow(/ranges with "to"/);
  });
});

describe("rune catalog", () => {
  const built = catalog();
  const named = (name: string) => built.runes.find((entry) => entry.name === name)!;

  it("holds the runes Data Dragon lists, by the wiki's names (case aside), path and row", () => {
    expect(currentRunes(DDRAGON).map((entry) => `${entry.path} ${entry.row} ${entry.name}`)).toEqual(["Precision 0 Conqueror", "Precision 1 Jack Of All Trades"]);
    expect(built.runes.map((entry) => [entry.name, entry.id, entry.path, entry.row])).toEqual([["Conqueror", 8010, "Precision", 0], ["Jack of All Trades", 9101, "Precision", 1]]);
    expect(built.paths).toEqual([{ name: "Precision", id: 8000, rows: [["Conqueror"], ["Jack of All Trades"]] }]);
  });

  it("shows melee and ranged values, adaptive force by level, and what the shared evaluator leaves out", () => {
    const conqueror = named("Conqueror");
    expect(conqueror.text).toBe("Passive: Gain 2 (melee) / 1 (ranged) stacks.\nEach stack grants 1.08 – 2.4 (based on level) bonus attack damage or 1.8 – 4 (based on level) ability power (adaptive).");
    expect(conqueror.values.map((value) => atLevel(value.series, 20))).toEqual([expect.closeTo((1.8 + (2.2 / 17) * 19) * 0.6, 9), expect.closeTo(1.8 + (2.2 / 17) * 19, 9)]);
    expect([conqueror.cooldown, conqueror.range]).toEqual([undefined, undefined]);
    expect(conqueror.notes).toEqual(["Ranged champions gain one stack."]);
    const jack = named("Jack of All Trades");
    expect([jack.text, jack.cooldown, jack.notes]).toEqual(["Jack: Gain 1 ability haste per stat.", "1", []]);
  });

  it("reads the shards from the Rune article, named and checked by the client's perk data, and the substitutions", () => {
    expect(built.shards.map((slot) => [slot.slot, slot.options.map((option) => `${option.id} ${option.name}: ${option.text}`)])).toEqual([
      ["Offense", ["5008 Adaptive Force: 5.4 bonus attack damage or 9 ability power (adaptive)"]],
      ["Defense", ["5001 Health Scaling: 10 – 180 (based on level) bonus health"]],
    ]);
    expect(built.substitutions).toEqual(["For champions without immobilizing effects, Aftershock is exchanged with Grasp of the Undying.", "  Nested."]);
    expect(built.checks).toEqual({ compared: 4, differences: [] });
    expect(built.rulePages.map((rule) => [rule.title, rule.revid])).toEqual([["Rune", 15], ["Adaptive force", 16], ["Template:Adaptive", 17], ["Template:Tip data/Adaptive damage", 18]]);
  });

  it("reports where the wiki's path, row or shard values differ from Data Dragon's and the client's", () => {
    const moved = PAGES.map((p) => (p.title === "Template:Rune data Conqueror" ? { ...p, content: p.content.replace("|slot = Keystone", "|slot = 1") } : p));
    const shifted = PERKS.map((perk) => (perk.id === 5008 ? { ...perk, shortDesc: "+10 Adaptive Force" } : perk));
    expect(catalog(moved, DDRAGON, shifted).checks.differences).toEqual([
      "Conqueror: the wiki's slot is 1, Data Dragon's row 0 (Keystone)",
      'Shard Adaptive Force (Offense): the wiki says "5.4 bonus attack damage or 9 ability power (adaptive)", the client "+10 Adaptive Force"',
    ]);
  });

  it("refuses a rune without its data template or article, or one the wiki says was removed", () => {
    expect(() => catalog(PAGES.filter((p) => p.title !== "Template:Rune data Conqueror"))).toThrow("Conqueror has no data template");
    expect(() => catalog(PAGES.filter((p) => p.title !== "Conqueror"))).toThrow("Conqueror has no article in the downloads");
    const removed = PAGES.map((p) => (p.title === "Template:Rune data Conqueror" ? { ...p, content: p.content.replace("|path = Precision", "|path = Precision\n|removed = true") } : p));
    expect(() => catalog(removed)).toThrow("says the rune was removed");
  });
});

describe("the committed rune catalog", async () => {
  const dataset = await latestDataset(DATA_DIR, "rune-records.json");
  const committed = await readJson<RuneRecords>(path.join(DATA_DIR, dataset, "rune-records.json"));
  const named = (name: string): RuneEntry => {
    const found = committed.runes.find((entry) => entry.name === name);
    if (!found) throw new Error(`No rune ${name}`);
    return found;
  };
  const level20 = (entry: RuneEntry, context: string, index = 0) => {
    const found = entry.values.filter((value) => value.context.includes(context))[index];
    if (!found) throw new Error(`${entry.name}: no value ${index + 1} in a sentence with "${context}"`);
    return atLevel(found.series, 20);
  };

  it("holds the 62 runes of the five paths, a keystone row and three lesser rows each, matching Data Dragon and the client", () => {
    expect(committed.runes).toHaveLength(62);
    expect(committed.paths.map((p) => [p.name, p.rows.map((row) => row.length)])).toEqual([
      ["Domination", [3, 3, 3, 3]],
      ["Inspiration", [3, 3, 3, 3]],
      ["Precision", [4, 3, 3, 3]],
      ["Resolve", [3, 3, 3, 3]],
      ["Sorcery", [4, 3, 3, 3]],
    ]);
    expect(committed.paths.find((p) => p.name === "Precision")!.rows[0]).toEqual(["Press the Attack", "Lethal Tempo", "Fleet Footwork", "Conqueror"]);
    expect(committed.checks).toEqual({ compared: 71, differences: [] });
  });

  it("has three shard slots of three options each, with the wiki's values", () => {
    expect(committed.shards.map((slot) => [slot.slot, slot.options.map((option) => option.name)])).toEqual([
      ["Offense", ["Adaptive Force", "Attack Speed", "Ability Haste"]],
      ["Flex", ["Adaptive Force", "Move Speed", "Health Scaling"]],
      ["Defense", ["Health", "Tenacity and Slow Resist", "Health Scaling"]],
    ]);
    const options = new Map(committed.shards.flatMap((slot) => slot.options.map((option) => [option.name, option.text])));
    expect([...options.values()]).toEqual(["5.4 bonus attack damage or 9 ability power (adaptive)", "10% bonus attack speed", "8 ability haste", "2.5% bonus movement speed", "10 – 180 (based on level) bonus health", "65 bonus health", "15% tenacity and slow resist"]);
    const scaling = committed.shards[1]!.options[2]!;
    expect(atLevel(scaling.values[0]!.series, 20)).toBe(200);
  });

  it("reads the keystones' level-20 values", () => {
    expect(level20(named("Conqueror"), "Each stack of Conqueror grants", 1)).toBeCloseTo(1.8 + (2.2 / 17) * 19, 9);
    expect(level20(named("Electrocute"), "struck by lightning")).toBe(260);
    // Its series runs to level 20: 40 to 174.1, as the text shows.
    expect(level20(named("Press the Attack"), "The third stack consumes all stacks")).toBeCloseTo(174.1176, 4);
    expect(named("Fleet Footwork").text).toContain("heal you for 15 – 160 (based on level) (melee) / 9 – 96 (based on level) (ranged)");
    expect(named("Dark Harvest").cooldown).toBe("35");
  });

  it("lists the substitutions a champion gets, from the Rune article", () => {
    expect(committed.substitutions).toContain("For champions without immobilizing effects, Aftershock is exchanged with Grasp of the Undying and Glacial Augment is exchanged with First Strike.");
    expect(committed.substitutions).toContain("For champions without mana, Manaflow Band is exchanged with Axiom Arcanist.");
    expect(committed.rulePages.find((rule) => rule.title === "Rune")!.text).toContain("The secondary path has two lesser runes. There are also three Shard slots alongside the Primary and Secondary paths that follow a path separate from the five. Each individual slot can be filled with one selection.");
  });
});
