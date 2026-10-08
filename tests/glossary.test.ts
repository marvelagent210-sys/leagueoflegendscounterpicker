/** The wiki glossary lists: parsing, resolving mentions to abilities, and the committed glossary. */
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { AbilityRecord } from "../engine/abilities";
import type { Glossary, GlossaryEntry } from "../engine/glossary";
import { currentAbilities, normalizeTitle } from "../pipeline/abilities/current";
import { DATA_DIR } from "../pipeline/config";
import { latestDataset } from "../pipeline/datasets";
import { mentionResolver } from "../pipeline/glossary/build";
import { parseCrowdControlTable } from "../pipeline/glossary/crowdControl";
import { parseListItems, proseMentions } from "../pipeline/glossary/lists";
import { readJson } from "../pipeline/lib/files";
import type { WikiPage } from "../pipeline/sources/wiki";

const page = (title: string, content: string): WikiPage => ({ title, pageid: 1, revid: 1, timestamp: "", content });

describe("parseListItems", () => {
  const content = `
Intro text with {{cai|Ignored|Prose}} isn't a list item.
== [[Auto-targeted]] dashes ==
{{column|3|
* {{cai|Shuriken Flip 2|Akali|Shuriken Flip}} (second cast)
* {{cai|W|Darius}}, {{ai|E|Darius}}, and {{ai|R|Darius}} (to non-champions)
}}
<!-- * {{cai|Commented|Out}} -->
==={{tip|Stasis (buff)|Stasis}}===
;Champion abilities
* {{cai|Frozen Tomb|Lissandra}} {{tt|*|Self-cast only}}
;Champion summoned units
* Champion abilities
** {{cai|Public Execution|Ambessa}}
`;
  const items = parseListItems(content);

  it("reads mentions with the qualifier that follows each one", () => {
    expect(items[0]).toEqual({
      path: ["Auto-targeted dashes"],
      mentions: [{ ability: "Shuriken Flip 2", champion: "Akali", qualifier: "(second cast)", note: "" }],
    });
    expect(items[1]?.mentions.map((m) => [m.ability, m.qualifier])).toEqual([
      ["W", ""],
      ["E", ""],
      ["R", "(to non-champions)"],
    ]);
  });

  it("tracks headings, definition labels and parent bullets, and drops comments", () => {
    expect(items.map((item) => item.path)).toEqual([
      ["Auto-targeted dashes"],
      ["Auto-targeted dashes"],
      ["Auto-targeted dashes", "Stasis", "Champion abilities"],
      ["Auto-targeted dashes", "Stasis", "Champion summoned units", "Champion abilities"],
    ]);
    expect(items[2]?.mentions[0]?.note).toBe("Self-cast only");
    expect(JSON.stringify(items)).not.toContain("Commented");
  });

  it("reads lists written as prose", () => {
    const prose = "Most projectiles can be blocked or destroyed by {{cai|Unbreakable|Braum}} and {{cai|Wind Wall|Yasuo}}. Other text.";
    expect(proseMentions(prose, /can be blocked or destroyed by/).map((m) => [m.champion, m.ability, m.qualifier])).toEqual([
      ["Braum", "Unbreakable", ""],
      ["Yasuo", "Wind Wall", ""],
    ]);
  });
});

describe("parseCrowdControlTable", () => {
  it("reads each row's rules and the abilities that remove it", () => {
    const table = `{| class="article-table"
! Crowd Control !! Movement
|-
| {{tip|Stun}} and {{tip|Suspension}}
| {{color|red|Disabled}}
| {{color|red|Disabled}}
| {{color|red|Disabled}}
| {{color|red|Yes}}
| {{si|Flash|size=18|icononly=yes}}
| {{color|green|Yes}}
| {{si|Cleanse|size=18|icononly=yes}}{{ai|Remove Scurvy|Gangplank|size=18|icononly=yes}}
|-
| {{tip|Slow}}
| {{color|yellow|Reduced}}
| {{color|green|Allowed}}
| {{color|green|Allowed}}
| {{color|green|No}}
| {{color|green|None}}
| {{color|green|Yes}}
| {{ai|Decisive Strike|Garen|size=18|icononly=yes}}
|}`;
    const rows = parseCrowdControlTable(table);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ types: ["stun", "suspension"], movement: "disabled", interruptsChannels: "yes", tenacity: true });
    expect(rows[0]?.removedBy.map((m) => m.champion)).toEqual(["Gangplank"]);
    expect(rows[1]).toMatchObject({ types: ["slow"], movement: "reduced", attacking: "allowed", interruptsChannels: "no" });
  });
});

describe("current abilities", () => {
  const lua = `return { ["Corki"] = { ["apiname"] = "Corki", ["skill_w"] = {[1] = "Valkyrie", [2] = "Valkyrie 2"} } }`;
  const pages = [
    page("Template:Data Corki/W", "#REDIRECT [[Template:Data Corki/Valkyrie]]"),
    page("Template:Data Corki/W*", "#REDIRECT [[Template: Data Corki/Special Delivery]]"),
    page("Template:Data Corki/Valkyrie", "{{Ability data|...}}"),
    page("Template:Data Corki/Gatling Gun old", "{{Ability data|...}}"),
  ];
  const current = currentAbilities(pages, lua, (name) => (name === "Corki" ? "Corki" : undefined));

  it("counts slot redirects (including variant slots) and skill lists as current", () => {
    expect(current.get("Corki/Valkyrie")).toBe("slot");
    expect(current.get("Corki/Special Delivery")).toBe("slot");
    expect(current.get("Corki/Valkyrie 2")).toBe("skill list");
    expect(current.has("Corki/Gatling Gun old")).toBe(false);
  });

  it("normalizes titles the way MediaWiki does", () => {
    expect(normalizeTitle("Template: Data_LeBlanc/Mimic")).toBe("Template:Data LeBlanc/Mimic");
  });
});

describe("mentionResolver", () => {
  const record = (title: string): AbilityRecord =>
    ({ champion: "Teemo", kind: "Q", name: title.split("/")[1], page: { title, revid: 1 } }) as AbilityRecord;
  const resolve = mentionResolver(
    [page("Template:Data Teemo/Q", "#REDIRECT [[Template:Data Teemo/Blinding Dart]]")],
    [record("Template:Data Teemo/Blinding Dart")],
  );
  const mention = (ability: string) => ({ ability, champion: "Teemo", qualifier: "", note: "" });

  it("follows slot redirects and falls back from numbered variants to the base ability", () => {
    expect(resolve(mention("Q"))?.name).toBe("Blinding Dart");
    expect(resolve(mention("Blinding Dart 2"))?.name).toBe("Blinding Dart");
    expect(resolve(mention("Nonexistent"))).toBeUndefined();
  });
});

describe("committed glossary", async () => {
  const dataset = await latestDataset(DATA_DIR, "glossary.json");
  const glossary = await readJson<Glossary>(path.join(DATA_DIR, dataset, "glossary.json"));
  const names = (list: GlossaryEntry["list"], label?: string) =>
    glossary.entries
      .filter((e) => e.list === list && (label === undefined || e.label === label))
      .map((e) => `${e.champion} ${e.ability}`)
      .sort();

  it("names exactly the four projectile blockers and the two spell shields", () => {
    expect(names("projectileBlock")).toEqual(["Braum Unbreakable", "Mel Rebuttal", "Samira Blade Whirl", "Yasuo Wind Wall"]);
    expect(names("spellShield")).toEqual(["Nocturne Shroud of Darkness", "Sivir Spell Shield"]);
  });

  it("knows which ability stops dashes and which applies each crowd control", () => {
    expect(names("dashCancel")).toEqual(["Poppy Steadfast Presence"]);
    expect(names("crowdControl", "blind")).toEqual(["Teemo Blinding Dart"]);
    expect(names("crowdControl", "ground")).toEqual(
      expect.arrayContaining(["Cassiopeia Miasma", "Poppy Steadfast Presence", "Singed Mega Adhesive"]),
    );
    expect(names("lunge")).toEqual(expect.arrayContaining(["Darius Noxian Guillotine", "Garen Decisive Strike"]));
  });

  it("reads the crowd control rules table", () => {
    const rule = (type: string) => glossary.crowdControl.find((r) => r.types.includes(type));
    expect(rule("stun")).toMatchObject({ interruptsChannels: "yes", tenacity: true });
    expect(rule("suppression")).toMatchObject({ interruptsChannels: "yes", tenacity: false });
    expect(rule("slow")?.removedBy.map((r) => `${r.champion} ${r.ability}`)).toContain("Garen Decisive Strike");
  });

  it("resolves nearly every mention to a current ability", () => {
    expect(glossary.entries.length).toBeGreaterThan(900);
    expect(glossary.unresolved.length).toBeLessThanOrEqual(3);
  });
});
