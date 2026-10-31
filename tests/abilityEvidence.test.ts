import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { AbilityRecord } from "../engine/abilities";
import { GAME_EXCERPTS, RECORD_CORRECTIONS, WIKI_ADDITIONS, attachEvidence, fieldAt, rawFieldAt, rawObjectAt, type GameExcerpt } from "../pipeline/abilities/evidence";
import { records } from "./kits/helpers";

const gameVersion = (JSON.parse(readFileSync(new URL("../data/16.20/manifest.json", import.meta.url), "utf8")) as { cdragon: { version: string } }).cdragon.version;

function expectGameExcerpt(excerpt: GameExcerpt, record: AbilityRecord | undefined): void {
  const where = `${excerpt.champion} ${excerpt.ability} ${excerpt.object}`;
  // A record can quote one object twice (Swain's Nevermove): the excerpt's own entry.
  const sameObject = record?.gameSources?.filter((g) => g.object === excerpt.object) ?? [];
  const source = sameObject.find((g) => (excerpt.lines ? JSON.stringify(g.text) === JSON.stringify(excerpt.lines) : excerpt.whole ? g.text.length === 1 && g.text[0]!.startsWith("{") : excerpt.fields!.every((field) => g.text.some((line) => line.startsWith(`${field}: `))))) ?? sameObject[0];
  expect(source, where).toBeDefined();
  if (excerpt.lines) expect(source!.text).toEqual(excerpt.lines);
  else if (excerpt.whole) {
    // The whole object, as one line.
    expect(source!.text, where).toHaveLength(1);
    expect(typeof JSON.parse(source!.text[0]!), where).toBe("object");
  } else {
    // A curated field is required once; later audits may retain more fields from
    // the same exact object. Their source order is not the catalog's field order.
    const projected = excerpt.fields!.map((field) => {
      const lines = source!.text.filter((line) => line.startsWith(`${field}: `));
      expect(lines, `${where}: ${field}`).toHaveLength(1);
      expect(() => JSON.parse(lines[0]!.slice(field.length + 2)), `${where}: ${field} value`).not.toThrow();
      return lines[0]!.slice(0, lines[0]!.indexOf(": "));
    });
    expect(projected).toEqual(excerpt.fields);
  }
  expect(source!.version, where).toBe(gameVersion);
  expect(source!.sha256, where).toMatch(/^[a-f0-9]{64}$/);
  const folder = excerpt.character.toLowerCase();
  expect(source!.url, where).toBe(`https://raw.communitydragon.org/16.20/game/data/characters/${folder}/${folder}.bin.json`);
}

/** The curated evidence (pipeline/abilities/evidence.ts) that the build adds to ability records. */
describe("curated ability evidence", () => {
  it("every game excerpt is in its committed ability record, attributed to its pinned game file", () => {
    for (const excerpt of GAME_EXCERPTS) {
      const record = records(excerpt.champion).find((r) => r.name === excerpt.ability);
      expectGameExcerpt(excerpt, record);
    }
  });

  it("every wiki addition is in its committed ability record", () => {
    for (const addition of WIKI_ADDITIONS) {
      const record = records(addition.champion).find((r) => r.name === addition.ability)!;
      if (addition.note) expect(record.notes).toContain(addition.note);
      if (addition.source?.text) expect(record.sources).toContainEqual(addition.source);
      else if (addition.source) {
        const { title, revid } = addition.source.page;
        expect(record.sources?.some((source) => source.page.title === title && source.page.revid === revid), `${addition.champion} ${addition.ability} ${title}`).toBe(true);
      }
      // A whole-page note is the text of the page the record cites.
      if (addition.pageNote) expect(record.notes).toContain(record.sources?.find((source) => source.page.title === addition.pageNote!.title)?.text[0]);
    }
  });

  it.each(["missing field", "duplicate field", "different object", "malformed value", "different version", "invalid hash", "different file"] as const)("rejects expanded game evidence with %s", (problem) => {
    const excerpt = GAME_EXCERPTS.find((entry) => entry.champion === "MonkeyKing")!;
    const record = records(excerpt.champion).find((entry) => entry.name === excerpt.ability)!;
    const source = record.gameSources!.find((entry) => entry.object === excerpt.object)!;
    const field = excerpt.fields![0]!, line = source.text.find((entry) => entry.startsWith(`${field}: `))!;
    if (problem === "missing field") source.text = source.text.filter((entry) => entry !== line);
    if (problem === "duplicate field") source.text.push(line);
    if (problem === "different object") source.object += "/Other";
    if (problem === "malformed value") source.text = source.text.map((entry) => entry === line ? `${field}: not JSON` : entry);
    if (problem === "different version") source.version = "16.19.1";
    if (problem === "invalid hash") source.sha256 = "not a SHA-256";
    if (problem === "different file") source.url = "https://raw.communitydragon.org/16.20/game/data/characters/other/other.bin.json";
    expect(() => expectGameExcerpt(excerpt, record)).toThrow();
  });


  it("every correction is in its committed ability record", () => {
    for (const correction of RECORD_CORRECTIONS) {
      const record = records(correction.champion).find((r) => r.name === correction.ability)!;
      const value = correction.path.split(/[.[\]]+/).filter(Boolean).reduce<unknown>((node, key) => (node as Record<string, unknown> | undefined)?.[key], record);
      expect(value, `${correction.champion} ${correction.ability} ${correction.path}`).toEqual(correction.value);
    }
  });

  it("reads game fields by path: DataValues entries by name, arrays by index", () => {
    const object = { mSpell: { DataValues: [{ name: "DashSpeed", values: [1, 2] }], list: [{ a: 1 }, { a: 2 }] } };
    expect(fieldAt(object, "mSpell.DataValues.DashSpeed.values")).toEqual([1, 2]);
    expect(fieldAt(object, "mSpell.list[1]")).toEqual({ a: 2 });
    expect(() => fieldAt(object, "mSpell.DataValues.Missing.values")).toThrow(/No game field/);
  });

  it("fails rather than writing evidence that no longer checks out", () => {
    const addition = WIKI_ADDITIONS.find((a) => a.anchor)!;
    const record = records(addition.champion).find((r) => r.name === addition.ability)!;
    const fresh = (): AbilityRecord[] => [{ ...record, notes: [], sources: undefined, gameSources: undefined }];
    const input = { bin: () => undefined, wikitext: () => "a page that says something else", revision: () => undefined, version: "16.20.1", dataset: "16.20" };
    expect(() => attachEvidence(fresh(), addition.champion, input, [], undefined, [])).toThrow(/no longer says/);
    const excerpt = GAME_EXCERPTS[0]!;
    const excerptRecord = records(excerpt.champion).find((r) => r.name === excerpt.ability)!;
    expect(() => attachEvidence([{ ...excerptRecord, gameSources: undefined }], excerpt.champion, input, [excerpt], [], [])).toThrow(/run npm run fetch/);
  });

  it("pins text from other wiki pages to the revision it was read from", () => {
    const sourced = WIKI_ADDITIONS.filter((a) => a.source);
    expect(sourced.length).toBeGreaterThan(0);
    for (const addition of sourced) {
      const record = records(addition.champion).find((r) => r.name === addition.ability)!;
      const fresh = (): AbilityRecord[] => [{ ...record, notes: [], sources: undefined }];
      const { title, revid } = addition.source!.page;
      const page = `the whole of ${title}`;
      const input = (revision: number | undefined) => ({ bin: () => undefined, wikitext: (t: string) => (t === title ? page : undefined), revision: (t: string) => (t === title ? revision : undefined), version: "16.20.1", dataset: "16.20" });
      if (addition.unfetched) {
        // The downloads don't have the page: the curated text stands as written.
        const kept = fresh();
        attachEvidence(kept, addition.champion, input(undefined), [], [addition], []);
        expect(kept[0]!.sources).toEqual([addition.source]);
        continue;
      }
      expect(() => attachEvidence(fresh(), addition.champion, input(revid + 1), [], [addition], [])).toThrow(/check the curated text/);
      expect(() => attachEvidence(fresh(), addition.champion, input(undefined), [], [addition], [])).toThrow(/not fetched/);
      const kept = fresh();
      attachEvidence(kept, addition.champion, input(revid), [], [addition], []);
      // Without text, the source is the page's whole downloaded wikitext.
      expect(kept[0]!.sources).toEqual([{ page: addition.source!.page, text: addition.source!.text ?? [page] }]);
    }
  });

  const bin = '{"Other":{"mSpell":{"missileSpeed":1.0}},"Obj":{"mSpell":{"missileSpeed":2250.0,"DataValues":[{"name":"A","values":[1.0,2.5]}],"Calc":{"parts":[{"breakpoints":[{"mLevel":7,"bonus":0.5,"__type":"Breakpoint"}]}]}}}}';
  const synthetic = (): AbilityRecord[] => [{ ...records("Xayah")[0]!, name: "Test", notes: ["x"], sources: undefined, gameSources: undefined }];
  const binInput = { bin: () => bin, wikitext: () => "{{anchor}}", revision: () => undefined, version: "16.20.1", dataset: "16.20" };

  it("keeps an exact excerpt as the game file writes it, or re-serializes it by default", () => {
    expect(rawFieldAt(bin, "Obj", "mSpell.missileSpeed")).toBe("2250.0");
    expect(rawFieldAt(bin, "Obj", "mSpell.DataValues.A.values")).toBe("[1.0,2.5]");
    expect(() => rawFieldAt(bin, "Obj", "mSpell.DataValues.B.values")).toThrow(/No game field/);
    expect(() => rawFieldAt('{"Obj":{"mSpell":{"missileSpeed":2250.0', "Obj", "mSpell.missileSpeed")).toThrow(/Unterminated/);
    const fields = ["mSpell.missileSpeed", "mSpell.DataValues.A.values"];
    const exact = synthetic();
    attachEvidence(exact, "Xayah", binInput, [{ champion: "Xayah", ability: "Test", character: "C", object: "Obj", fields, exact: true }], [], []);
    expect(exact[0]!.gameSources![0]!.text).toEqual(["mSpell.missileSpeed: 2250.0", "mSpell.DataValues.A.values: [1.0,2.5]"]);
    const parsed = synthetic();
    attachEvidence(parsed, "Xayah", binInput, [{ champion: "Xayah", ability: "Test", character: "C", object: "Obj", fields }], [], []);
    expect(parsed[0]!.gameSources![0]!.text).toEqual(["mSpell.missileSpeed: 2250", "mSpell.DataValues.A.values: [1,2.5]"]);
  });

  it("checks hand-written excerpt lines against the game file", () => {
    const lines = (text: string[]) => [{ champion: "Xayah", ability: "Test", character: "C", object: "Obj", lines: text }];
    const kept = synthetic();
    attachEvidence(kept, "Xayah", binInput, lines(["mSpell.missileSpeed: 2250", 'mSpell.Calc.breakpoint {"mLevel":7,"bonus":0.5}']), [], []);
    expect(kept[0]!.gameSources![0]!.text).toEqual(["mSpell.missileSpeed: 2250", 'mSpell.Calc.breakpoint {"mLevel":7,"bonus":0.5}']);
    expect(() => attachEvidence(synthetic(), "Xayah", binInput, lines(["mSpell.missileSpeed: 2300"]), [], [])).toThrow(/no longer has the value/);
    expect(() => attachEvidence(synthetic(), "Xayah", binInput, lines(['mSpell.Calc.breakpoint {"mLevel":8}']), [], [])).toThrow(/nothing under/);
  });

  it("writes a whole object as the file has it, and checks object and member lines by what the object contains", () => {
    const whole = synthetic();
    attachEvidence(whole, "Xayah", binInput, [{ champion: "Xayah", ability: "Test", character: "C", object: "Obj", whole: true }], [], []);
    expect(whole[0]!.gameSources![0]!.text).toEqual(['{"mSpell":{"missileSpeed":2250.0,"DataValues":[{"name":"A","values":[1.0,2.5]}],"Calc":{"parts":[{"breakpoints":[{"mLevel":7,"bonus":0.5,"__type":"Breakpoint"}]}]}}}']);
    expect(rawObjectAt('{"Obj": {"a": "x y", "b": [1.0, 2]}}', "Obj")).toBe('{"a":"x y","b":[1.0,2]}');
    const lines = (text: string[]) => [{ champion: "Xayah", ability: "Test", character: "C", object: "Obj", lines: text }];
    attachEvidence(synthetic(), "Xayah", binInput, lines(['{"mSpell":{"missileSpeed":2250.0}}', '"missileSpeed": 2250.0', '{"name":"A","values":[1.0,2.5]}']), [], []);
    expect(() => attachEvidence(synthetic(), "Xayah", binInput, lines(['"missileSpeed": 1.5']), [], [])).toThrow(/no longer matches/);
    expect(() => attachEvidence(synthetic(), "Xayah", binInput, lines(['{"name":"A","values":[1.0]}']), [], [])).toThrow(/no longer matches/);
  });

  it("reads paths written with a name in brackets, a position after a dot, or no space after the colon", () => {
    const object = (JSON.parse(bin) as Record<string, unknown>).Obj;
    expect(fieldAt(object, "mSpell.DataValues[A].values")).toEqual([1, 2.5]);
    expect(fieldAt(object, "mSpell.DataValues[A].values.1")).toBe(2.5);
    expect(() => fieldAt(object, "mSpell.DataValues[B].values")).toThrow(/No game field/);
    attachEvidence(synthetic(), "Xayah", binInput, [{ champion: "Xayah", ability: "Test", character: "C", object: "Obj", lines: ["mSpell.missileSpeed:2250.0"] }], [], []);
  });

  it("adds a whole page as a note or a source, and lists sources first when asked", () => {
    const page = { title: "Template:Data Xayah/Test", revid: 7 };
    const input = { ...binInput, wikitext: (t: string) => (t === page.title ? "{{page}}" : undefined), revision: (t: string) => (t === page.title ? 7 : undefined) };
    const excerpt = { champion: "Xayah", ability: "Test", character: "C", object: "Obj", fields: ["mSpell.missileSpeed"] };
    // A record without either key yet, so the order is the one the evidence gives.
    const bare = (): AbilityRecord[] => {
      const { sources: _sources, gameSources: _gameSources, ...rest } = synthetic()[0]!;
      return [rest as AbilityRecord];
    };
    const late = bare();
    attachEvidence(late, "Xayah", input, [excerpt], [{ champion: "Xayah", ability: "Test", source: { page } }, { champion: "Xayah", ability: "Test", pageNote: page }], []);
    expect(late[0]!.sources).toEqual([{ page, text: ["{{page}}"] }]);
    expect(late[0]!.notes).toEqual(["x", "{{page}}"]);
    expect(Object.keys(late[0]!).slice(-2)).toEqual(["gameSources", "sources"]);
    const early = bare();
    attachEvidence(early, "Xayah", input, [excerpt], [{ champion: "Xayah", ability: "Test", source: { page }, early: true }], []);
    expect(Object.keys(early[0]!).slice(-2)).toEqual(["sources", "gameSources"]);
    expect(() => attachEvidence(synthetic(), "Xayah", { ...input, revision: () => 8 }, [], [{ champion: "Xayah", ability: "Test", pageNote: page }], [])).toThrow(/check the curated text/);
  });

  it("applies a correction only while the parser still gives what it corrects", () => {
    const fix = { champion: "Xayah", ability: "Test", path: "notes[0]", parsed: "x", value: "y", reason: "test", anchor: "{{anchor}}" };
    const fixed = synthetic();
    attachEvidence(fixed, "Xayah", binInput, [], [], [fix]);
    expect(fixed[0]!.notes).toEqual(["y"]);
    expect(() => attachEvidence(synthetic(), "Xayah", binInput, [], [], [{ ...fix, parsed: "z" }])).toThrow(/check the correction again/);
    expect(() => attachEvidence(synthetic(), "Xayah", { ...binInput, wikitext: () => "changed" }, [], [], [fix])).toThrow(/no longer says/);
    const removed = synthetic();
    attachEvidence(removed, "Xayah", binInput, [], [], [{ champion: "Xayah", ability: "Test", path: "notes", parsed: ["x"], reason: "test" }]);
    expect("notes" in removed[0]!).toBe(false);
    const added = synthetic();
    attachEvidence(added, "Xayah", binInput, [], [], [{ champion: "Xayah", ability: "Test", path: "historical", parsed: undefined, value: true, reason: "test" }]);
    expect(added[0]!.historical).toBe(true);
  });
});
