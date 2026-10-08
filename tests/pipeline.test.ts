/** Unit tests for the pipeline's parsers and the wiki/game-file reconciliation. */
import { describe, expect, it } from "vitest";
import { reconcileWithGameFiles } from "../pipeline/gameFiles";
import { decodeEntities, textContent } from "../pipeline/lib/html";
import { slugify } from "../pipeline/normalize";
import { type GameRecordStats, parseCharacterRecord } from "../pipeline/parse/characterRecord";
import { parseLevel20Table } from "../pipeline/parse/level20Table";
import { makeEntry, makeFormStats } from "./helpers";

describe("html helpers", () => {
  it("decode entities and strip tags without adding spaces", () => {
    expect(decodeEntities("Kled &amp; Skaarl &#39;x&#x27; &nbsp;&bogus;")).toBe("Kled & Skaarl 'x'  &bogus;");
    expect(textContent("2891.<small>81</small>")).toBe("2891.81");
    expect(textContent('<a href="/x">Kai&#39;Sa</a>\n')).toBe("Kai'Sa");
  });
});

describe("slugify", () => {
  it("makes stable form ids", () => {
    expect(slugify("Kled & Skaarl")).toBe("kled-skaarl");
    expect(slugify("Mega Gnar")).toBe("mega-gnar");
    expect(slugify("Kai'Sa")).toBe("kai-sa");
  });
});

describe("parseLevel20Table", () => {
  const header =
    "<tr><th>Champion</th><th>HP</th><th>HP5</th><th>MP</th><th>MP5</th><th>AD</th><th>AS</th><th>AR</th><th>MR</th><th>Range</th><th>MS</th></tr>";
  const row = (name: string, mp: string) =>
    `<tr><td><a>${name}</a></td><td>2891.<small>81</small></td><td>12.8325</td><td>${mp}</td><td>${mp}</td>` +
    "<td>158.325</td><td>0.971</td><td>132.392</td><td>72.31325</td><td>175</td><td>345</td></tr>";
  const page = (rows: string) => `<p>intro</p><table class="sortable wikitable">${header}${rows}</table><table class="navbox"></table>`;

  it("reads every row, with '-' as no value", () => {
    const rows = parseLevel20Table(page(row("Aatrox", "0") + row("Kled &amp; Skaarl", "-")));
    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({
      name: "Aatrox",
      hp: 2891.81,
      hpRegen: 12.8325,
      resource: 0,
      resourceRegen: 0,
      attackDamage: 158.325,
      attackSpeed: 0.971,
      armor: 132.392,
      magicResist: 72.31325,
      attackRange: 175,
      moveSpeed: 345,
    });
    expect(rows[1]?.name).toBe("Kled & Skaarl");
    expect(rows[1]?.resource).toBeNull();
  });

  it("refuses a table with different columns", () => {
    expect(() => parseLevel20Table(page("").replace("<th>MS</th>", "<th>Speed</th>"))).toThrow(/unexpected columns/);
  });
});

describe("parseCharacterRecord", () => {
  const bin = (record: Record<string, unknown>) => ({
    "Characters/Test/CharacterRecords/Root": { __type: "CharacterRecord", ...record },
  });

  it("returns only the values the file states, converted to wiki units", () => {
    const parsed = parseCharacterRecord(
      bin({
        baseHPModifiable: { baseValue: 652 },
        hpRegenPerLevelModifiable: { baseValue: 0.19 },
        baseMR: 32,
        primaryAbilityResource: { arType: 0, "{726ee5cd}": 263, "{c4ab3550}": 1.32 },
        basicAttack: { mAttackDelayCastOffsetPercent: -0.1, mAttackDelayCastOffsetPercentAttackSpeedRatio: 0.5 },
      }),
      "Test",
    );
    expect(parsed.stated["hp.base"]).toBe(652);
    expect(parsed.stated["hpRegen.perLevel"]).toBeCloseTo(0.95, 10);
    expect(parsed.stated["magicResist.base"]).toBe(32);
    expect(parsed.stated["resource.base"]).toBe(263);
    expect(parsed.stated["resourceRegen.base"]).toBeCloseTo(6.6, 10);
    expect(parsed.stated["windup.percent"]).toBeCloseTo(0.2, 10);
    expect(parsed.stated["windup.modifier"]).toBe(0.5);
    expect(parsed.windupSource).toBe("offset");
    expect("hp.perLevel" in parsed.stated).toBe(false);
    expect("hpRegen.base" in parsed.stated).toBe(false);
  });

  it("prefers cast and total attack times and reads level-scaled cast times", () => {
    const parsed = parseCharacterRecord(
      bin({
        basicAttack: {
          mAttackCastTime: 0.55,
          mAttackTotalTime: 1.6,
          mAttackDelayCastOffsetPercent: -0.1,
          mOverrideAutoattackCastTime: {
            mOverrideAutoattackCastTimeCalculation: {
              mFormulaParts: [
                { __type: "ByCharLevelInterpolationCalculationPart", mStartValue: 0.5, mEndValue: 0.35, mScalePastDefaultMaxLevel: false },
              ],
            },
          },
        },
      }),
      "Test",
    );
    expect(parsed.stated["windup.percent"]).toBeCloseTo(0.34375, 10);
    expect(parsed.windupSource).toBe("castTime");
    expect(parsed.castTimeByLevel).toEqual({ start: 0.5, end: 0.35, scalePastMaxLevel: false });
    expect(parsed.attackTotalTime).toBe(1.6);
  });

  it("needs a root character record", () => {
    expect(() => parseCharacterRecord({ other: {} }, "Test")).toThrow(/no root CharacterRecord/);
  });
});

describe("reconcileWithGameFiles", () => {
  const record = (stated: GameRecordStats["stated"], extra: Partial<GameRecordStats> = {}): GameRecordStats => ({
    stated,
    resourceType: 0,
    windupSource: undefined,
    castTimeByLevel: undefined,
    attackTotalTime: undefined,
    ...extra,
  });

  it("replaces a base form's wiki value with a differing game value", () => {
    const entry = makeEntry();
    const result = reconcileWithGameFiles([entry], new Map([["Testchamp", record({ "attackDamage.perLevel": 3.9 })]]));
    expect(result.entries[0]?.stats.attackDamage.perLevel).toBe(3.9);
    expect(result.overrides.get("Testchamp")).toEqual([{ stat: "attackDamage.perLevel", wiki: 3.5, game: 3.9 }]);
    expect(result.applied).toHaveLength(1);
  });

  it("ignores float noise and rounding", () => {
    const entry = makeEntry({ stats: makeFormStats({ armor: { base: 37, perLevel: 5.2 } }) });
    const result = reconcileWithGameFiles([entry], new Map([["Testchamp", record({ "armor.perLevel": 5.199999809265137 })]]));
    expect(result.applied).toEqual([]);
  });

  it("only reports differences for alternate forms", () => {
    const base = makeEntry();
    const form = makeEntry({ name: "Mega Testchamp", id: 9001.2, apiname: "TestchampBig" });
    const records = new Map([
      ["Testchamp", record({})],
      ["TestchampBig", record({ "armor.base": 36 })],
    ]);
    const result = reconcileWithGameFiles([base, form], records);
    expect(result.entries[1]?.stats.armor.base).toBe(30);
    expect(result.notApplied).toEqual([
      expect.objectContaining({ form: "Mega Testchamp", stat: "armor.base", wiki: 30, game: 36 }),
    ]);
  });

  it("compares resources only for mana and energy champions", () => {
    const entry = makeEntry({ resource: "Fury" });
    const result = reconcileWithGameFiles([entry], new Map([["Testchamp", record({ "resource.base": 100 })]]));
    expect(result.applied).toEqual([]);
    expect(result.notApplied).toEqual([]);
  });

  it("adopts the game's level-scaled cast time", () => {
    const castTimeByLevel = { start: 0.5, end: 0.3499999940395355, scalePastMaxLevel: false };
    const result = reconcileWithGameFiles(
      [makeEntry()],
      new Map([["Testchamp", record({}, { castTimeByLevel, attackTotalTime: 1.600000023841858 })]]),
    );
    expect(result.entries[0]?.stats.windup.castTimeByLevel).toEqual({ start: 0.5, end: 0.35, scalePastMaxLevel: false });
    expect(result.entries[0]?.stats.windup.attackTotalTime).toBe(1.6);
  });

  it("fails loudly when a champion has no game data", () => {
    expect(() => reconcileWithGameFiles([makeEntry()], new Map())).toThrow(/No game data/);
  });
});
