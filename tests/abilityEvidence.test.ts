import { describe, expect, it } from "vitest";
import type { AbilityRecord } from "../engine/abilities";
import { GAME_EXCERPTS, WIKI_ADDITIONS, attachEvidence, fieldAt } from "../pipeline/abilities/evidence";
import { records } from "./kits/helpers";

/** The curated evidence (pipeline/abilities/evidence.ts) that the build adds to ability records. */
describe("curated ability evidence", () => {
  it("every game excerpt is in its committed ability record, attributed to its pinned game file", () => {
    for (const excerpt of GAME_EXCERPTS) {
      const record = records(excerpt.champion).find((r) => r.name === excerpt.ability);
      const source = record?.gameSources?.find((g) => g.object === excerpt.object);
      expect(source, `${excerpt.champion} ${excerpt.ability} ${excerpt.object}`).toBeDefined();
      expect(source!.text.map((line) => line.split(": ")[0])).toEqual(excerpt.fields);
      expect(source!.sha256).toMatch(/^[a-f0-9]{64}$/);
      const folder = excerpt.character.toLowerCase();
      expect(source!.url).toBe(`https://raw.communitydragon.org/16.20/game/data/characters/${folder}/${folder}.bin.json`);
    }
  });

  it("every wiki addition is in its committed ability record", () => {
    for (const addition of WIKI_ADDITIONS) {
      const record = records(addition.champion).find((r) => r.name === addition.ability)!;
      if (addition.note) expect(record.notes).toContain(addition.note);
      if (addition.source) expect(record.sources).toContainEqual(addition.source);
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
    expect(() => attachEvidence(fresh(), addition.champion, input, [])).toThrow(/no longer says/);
    const excerpt = GAME_EXCERPTS[0]!;
    const excerptRecord = records(excerpt.champion).find((r) => r.name === excerpt.ability)!;
    expect(() => attachEvidence([{ ...excerptRecord, gameSources: undefined }], excerpt.champion, input, [excerpt], [])).toThrow(/run npm run fetch/);
  });

  it("pins text from other wiki pages to the revision it was read from", () => {
    const sourced = WIKI_ADDITIONS.filter((a) => a.source);
    expect(sourced.length).toBeGreaterThan(0);
    for (const addition of sourced) {
      const record = records(addition.champion).find((r) => r.name === addition.ability)!;
      const fresh = (): AbilityRecord[] => [{ ...record, notes: [], sources: undefined }];
      const { title, revid } = addition.source!.page;
      const input = (revision: number | undefined) => ({ bin: () => undefined, wikitext: () => undefined, revision: (t: string) => (t === title ? revision : undefined), version: "16.20.1", dataset: "16.20" });
      expect(() => attachEvidence(fresh(), addition.champion, input(revid + 1), [], [addition])).toThrow(/check the curated text/);
      expect(() => attachEvidence(fresh(), addition.champion, input(undefined), [], [addition])).toThrow(/not fetched/);
      const kept = fresh();
      attachEvidence(kept, addition.champion, input(revid), [], [addition]);
      expect(kept[0]!.sources).toEqual([addition.source]);
    }
  });
});
