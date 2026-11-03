/** The curated pet fields (pipeline/petCuration.ts) that the build adds to pet records. */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { PetRecord } from "../engine/abilities";
import { PET_CURATION, curatePets } from "../pipeline/petCuration";

const pets = (champion: string) => JSON.parse(readFileSync(new URL(`../data/16.21/pets/${champion}.json`, import.meta.url), "utf8")) as PetRecord[];

describe("curated pet fields", () => {
  it("every curated field is in its committed pet record", () => {
    for (const entry of PET_CURATION) {
      const text = pets(entry.champion).find((pet) => pet.name === entry.pet)?.text[entry.field];
      if (entry.wholePage) expect(text, `${entry.champion} ${entry.pet} ${entry.field}`).toMatch(/^\{\{/);
      else expect(text).toBe(entry.value);
    }
  });

  const pet = (): PetRecord[] => [{ champion: "Test", name: "Pet", page: { title: "Test", revid: 1 }, fields: [], text: { leash: "100" } } as unknown as PetRecord];
  const page = { pageid: 1, title: "Test", revid: 1, timestamp: "2026-10-20T00:00:00Z", content: "{{page}} the curated note" };
  const curation = (extra: object) => [{ champion: "Test", pet: "Pet", reason: "test", ...extra }] as typeof PET_CURATION;

  it("adds a whole page or a written value, and fails once the parser or the page changes", () => {
    const kept = pet();
    curatePets(kept, "Test", page, curation({ field: "raw", wholePage: true }));
    expect(kept[0]!.text.raw).toBe("{{page}} the curated note");
    const leash = pet();
    curatePets(leash, "Test", page, curation({ field: "leash", parsed: "100", value: "100 (estimated)" }));
    expect(leash[0]!.text.leash).toBe("100 (estimated)");
    expect(() => curatePets(pet(), "Test", page, curation({ field: "leash", parsed: "90", value: "x" }))).toThrow(/check the curation again/);
    expect(() => curatePets(pet(), "Test", page, curation({ field: "notes", value: "a note the page lost", inPage: true }))).toThrow(/no longer has/);
    expect(() => curatePets(pet(), "Test", page, [{ champion: "Test", pet: "Other", field: "x", value: "y", reason: "test" }])).toThrow(/doesn't have/);
  });
});
