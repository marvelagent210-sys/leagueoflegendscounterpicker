/** Ability parsing: unit tests for each piece, then facts checked against the wiki pages. */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { AbilityRecord, Mechanic, Series } from "../engine/abilities";
import { parseAmount } from "../pipeline/abilities/amount";
import { readGameAbilities } from "../pipeline/abilities/gameSpells";
import { type Marked, renderMarked } from "../pipeline/abilities/marked";
import { mechanicsOf } from "../pipeline/abilities/mechanics";
import { DATA_DIR } from "../pipeline/config";
import { latestDataset } from "../pipeline/datasets";
import { createContext } from "../pipeline/wikitext/evaluate";
import { parseWikitext } from "../pipeline/wikitext/parse";

const lookup = (champion: string, field: string) => (champion === "Yasuo" && field === "crit_mod" ? "0.95" : undefined);
const mark = (wikitext: string, skill = "Q"): Marked => renderMarked(parseWikitext(wikitext), createContext(lookup, skill));

describe("parseAmount", () => {
  it("reads a per-rank base and a ratio that scales with rank", () => {
    const amount = parseAmount(mark("{{ap|50 to 170}} {{as|(+ {{ap|100 to 140}}% AD)}}"));
    expect(amount.base).toEqual({ kind: "rank", values: [50, 80, 110, 140, 170] });
    expect(amount.scaling).toEqual([
      expect.objectContaining({ stat: "AD", ratio: { kind: "rank", values: [100, 110, 120, 130, 140] } }),
    ]);
    expect(amount.unparsed).toBe("");
  });

  it("gives ultimates three ranks", () => {
    expect(parseAmount(mark("{{ap|125 to 375}}", "R")).base).toEqual({ kind: "rank", values: [125, 250, 375] });
  });

  it("keeps nested ratios with the term they scale (Ambessa)", () => {
    const amount = parseAmount(
      mark("{{ap|20 to 60}} {{as|(+ 30% '''bonus''' AD)}} {{as|(+ {{ap|2 to 3}}% {{as|(+ 1.5% per 100 '''bonus''' AD)}} of target's '''maximum''' health)}}"),
    );
    expect(amount.unparsed).toBe("");
    expect(amount.scaling.map((t) => t.stat)).toEqual(["bonusAD", "targetMaxHealth"]);
    expect(amount.scaling[1]?.modifiers?.[0]).toMatchObject({ stat: "per100:bonusAD", ratio: { kind: "constant", value: 1.5 } });
  });

  it("reads a percentage of a stat and counted units", () => {
    const percent = parseAmount(mark("{{ap|10 to 26}}% of target's armor"));
    expect(percent).toMatchObject({ unit: "%", baseStat: "targetArmor", unparsed: "" });
    const counted = parseAmount(mark("{{ap|6|7|8}} soldiers", "R"));
    expect(counted).toMatchObject({ unit: "soldiers", unparsed: "" });
  });

  it("evaluates the critical damage template without Infinity Edge (Yasuo's Q)", () => {
    const amount = parseAmount(mark("{{ap|20 to 120}} {{as|(+ {{critical damage|200*1.05|105|mod={{ccd|Yasuo|crit_mod}}}} AD)}}"));
    expect(amount.scaling[0]?.ratio).toEqual({ kind: "constant", value: 199.5 });
  });
});

describe("mechanicsOf", () => {
  const applied = (wikitext: string): Mechanic[] => mechanicsOf(mark(wikitext)).filter((m) => !m.conditional);
  const constant = (value: number): Series => ({ kind: "constant", value });

  it("reads durations that follow the effect, across decimals", () => {
    const [knockUp] = applied("Enemies are {{tip|airborne|knocked up}} for {{fd|0.5}} seconds. Then more.");
    expect(knockUp).toMatchObject({ type: "airborne", wording: "knocked up", duration: constant(0.5) });
  });

  it("reads slow amounts and per-rank durations", () => {
    const [slow] = applied("{{tip|slow|Slowing}} them by 25% for {{ap|1 to 2}} seconds.");
    expect(slow?.amount).toEqual(constant(25));
    expect(slow?.duration).toEqual({ kind: "rank", values: [1, 1.25, 1.5, 1.75, 2] });
  });

  it("resolves 'for the same duration' to the duration stated earlier", () => {
    const mechanics = applied("Units enter {{tip|stasis}} for 2.5 seconds, and enemies are {{tip|stun|stunned}} for the same duration.");
    expect(mechanics.find((m) => m.type === "stun")?.duration).toEqual(constant(2.5));
  });

  it("tells a condition from an effect in the main clause", () => {
    const mention = mechanicsOf(mark("If she is {{tip|grounded}}, she cannot flip."));
    expect(mention[0]?.conditional).toBe(true);
    const effect = mechanicsOf(mark("If a target was interrupted, they become {{tip|grounded}} for 2 seconds."));
    expect(effect[0]).toMatchObject({ conditional: false, duration: constant(2) });
    const removal = mechanicsOf(mark("Garen cleanses himself of all {{tip|slow|slows}}."));
    expect(removal[0]?.conditional).toBe(true);
  });

  it("takes an earlier duration for defensive states (Jax's Counter Strike)", () => {
    const [dodge] = applied("Jax enters Evasion for 2 seconds: a stance that causes him to {{tip|dodge}} all attacks.");
    expect(dodge).toMatchObject({ type: "dodge", duration: constant(2) });
  });
});

describe("readGameAbilities", () => {
  const calc = (part: Record<string, unknown>) => ({ mFormulaParts: [part], __type: "GameCalculation" });
  const bin = {
    "Characters/Test/CharacterRecords/Root": { __type: "CharacterRecord", spellNames: ["TestQAbility/TestQ"] },
    "Characters/Test/Spells/TestQAbility": {
      __type: "AbilityObject",
      mName: "TestQAbility",
      mRootSpell: "Characters/Test/Spells/TestQAbility/TestQ",
    },
    "Characters/Test/Spells/TestQAbility/TestQ": {
      mSpell: {
        cooldownTime: [10, 9, 8, 7, 6, 5, 5],
        mana: [25, 30, 35, 40, 45, 50],
        mSpellCalculations: {
          Linear: calc({ __type: "ByCharLevelInterpolationCalculationPart", mStartValue: 20, mEndValue: 70 }),
          Capped: calc({ __type: "ByCharLevelInterpolationCalculationPart", mStartValue: 0.5, mEndValue: 0.35, mScalePastDefaultMaxLevel: false }),
          Curve: calc({ __type: "ByCharLevelInterpolationCalculationPart", mStartValue: 0, mEndValue: 17, mScaleByStatProgressionMultiplier: true }),
          // Sett: 3 at level 1, +7 / +10 / +20 at 6 / 11 / 16, then +1 per level from 19.
          Steps: calc({
            __type: "ByCharLevelBreakpointsCalculationPart",
            mLevel1Value: 3,
            mBreakpoints: [
              { mLevel: 6, mAdditionalBonusAtThisLevel: 7 },
              { mLevel: 11, mAdditionalBonusAtThisLevel: 10 },
              { mLevel: 16, mAdditionalBonusAtThisLevel: 20 },
              { mLevel: 19, mBonusPerLevelAtAndAfter: 1 },
            ],
          }),
          // Braum: a table that starts at level 0.
          Table: calc({ __type: "ByCharLevelFormulaCalculationPart", values: Array.from({ length: 31 }, (_, l) => 16 + 10 * l) }),
        },
      },
    },
  };
  const [ability] = readGameAbilities(bin);
  const formula = (name: string) => ability?.levelScaling.find((value) => value.calculation === name)?.values ?? [];

  it("maps the root spell to its slot with its cooldowns and costs", () => {
    expect(ability).toMatchObject({ kind: "Q", cooldowns: [10, 9, 8, 7, 6, 5, 5], costs: [25, 30, 35, 40, 45, 50] });
  });

  it("evaluates level formulas at levels 1-20 with the game's rules", () => {
    expect(formula("Linear")[17]).toBeCloseTo(70, 9);
    expect(formula("Linear")[19]).toBeCloseTo(20 + (50 * 19) / 17, 9);
    expect(formula("Capped")[19]).toBeCloseTo(0.35, 9);
    expect(formula("Curve")[17]).toBeCloseTo(17, 9);
    expect(formula("Curve")[19]).toBeCloseTo(19.665, 9);
    expect(formula("Steps")[0]).toBe(3);
    expect(formula("Steps")[17]).toBe(40);
    expect(formula("Steps")[19]).toBe(42);
    expect(formula("Table")[0]).toBe(26);
    expect(formula("Table")[19]).toBe(216);
  });
});

// ----- Facts from the committed dataset, each checked against its wiki page -----

const dataset = await latestDataset(DATA_DIR, "champions.json");
const abilityDir = path.join(DATA_DIR, dataset, "abilities");
const all: AbilityRecord[] = readdirSync(abilityDir).flatMap(
  (file) => JSON.parse(readFileSync(path.join(abilityDir, file), "utf8")) as AbilityRecord[],
);
const ability = (champion: string, name: string): AbilityRecord => {
  const found = all.find((record) => record.champion === champion && record.name === name);
  if (!found) throw new Error(`No ${champion} ${name}`);
  return found;
};
const appliedMechanics = (record: AbilityRecord) => record.parts.flatMap((part) => part.mechanics).filter((m) => !m.conditional);

describe("ability dataset", () => {
  it("covers every champion's innate and Q, W, E and R", () => {
    const champions = new Set(all.map((record) => record.champion));
    expect(champions.size).toBe(173);
    for (const champion of champions) {
      const kinds = new Set(all.filter((record) => record.champion === champion).map((record) => record.kind));
      for (const kind of ["I", "Q", "W", "E", "R"]) expect(kinds.has(kind as AbilityRecord["kind"]), `${champion} ${kind}`).toBe(true);
    }
  });

  it("keeps only current abilities, not the pages of reworked-away ones", () => {
    const names = (champion: string) => all.filter((record) => record.champion === champion).map((record) => record.name);
    // Kayle's pre-2019 ultimate and Dr. Mundo's pre-2021 kit still have wiki pages.
    expect(names("Kayle")).not.toContain("Intervention");
    expect(names("Kayle")).toContain("Divine Judgment");
    expect(names("DrMundo")).not.toContain("Burning Agony");
    expect(names("DrMundo")).toContain("Heart Zapper");
    // Variants the wiki links to the live kit stay: Corki's Special Delivery, both of Jayce's forms.
    expect(names("Corki")).toContain("Special Delivery");
    expect(names("Jayce")).toEqual(expect.arrayContaining(["Shock Blast", "To the Skies!", "Transform Mercury Hammer"]));
  });

  it("understands nearly every leveling value", () => {
    const stats = all.flatMap((record) => record.parts.flatMap((part) => part.leveling));
    const understood = stats.filter((stat) => stat.amount.base && stat.amount.unparsed === "");
    expect(understood.length / stats.length).toBeGreaterThan(0.99);
  });

  it("has Darius's cooldowns, costs and ultimate ranks", () => {
    expect(ability("Darius", "Decimate").fields.cooldown?.values[0]?.series).toEqual({ kind: "rank", values: [9, 8, 7, 6, 5] });
    expect(ability("Darius", "Decimate").fields.cost?.values[0]?.series).toEqual({ kind: "rank", values: [25, 30, 35, 40, 45] });
    expect(ability("Darius", "Noxian Guillotine").ranks).toBe(3);
    expect(ability("Darius", "Noxian Guillotine").fields.cooldown?.values[0]?.series).toEqual({ kind: "rank", values: [120, 100, 80] });
  });

  it("keeps the interaction flags the ledger will need", () => {
    expect(ability("Darius", "Apprehend").flags).toMatchObject({ projectile: "false", spellShield: "true" });
    expect(ability("Teemo", "Blinding Dart").flags).toMatchObject({ projectile: "true", targeting: ["Unit"] });
    expect(ability("Garen", "Decisive Strike").flags).toMatchObject({ parry: "true", spellShield: "special" });
    expect(ability("Fiora", "Riposte").flags).toMatchObject({ projectile: "true", spellShield: "true" });
    expect(ability("Yasuo", "Wind Wall").fields.cooldown?.values[0]?.series).toEqual({ kind: "rank", values: [25, 23, 21, 19, 17] });
  });

  it("reads crowd control and defensive states with their durations", () => {
    const poppy = appliedMechanics(ability("Poppy", "Steadfast Presence"));
    expect(poppy).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "airborne", duration: { kind: "constant", value: 0.5 } }),
        expect.objectContaining({ type: "ground", duration: { kind: "constant", value: 2 } }),
        expect.objectContaining({ type: "slow", amount: { kind: "constant", value: 25 } }),
      ]),
    );
    expect(appliedMechanics(ability("Jax", "Counter Strike"))).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "dodge", duration: { kind: "constant", value: 2 } }),
        expect.objectContaining({ type: "stun", duration: { kind: "constant", value: 1 } }),
      ]),
    );
    expect(appliedMechanics(ability("Yasuo", "Steel Tempest"))).toEqual(
      expect.arrayContaining([expect.objectContaining({ type: "airborne", duration: { kind: "constant", value: 0.9 } })]),
    );
  });

  it("keeps the wiki's notes, such as when Poppy's W fails to stop a dash", () => {
    expect(ability("Poppy", "Steadfast Presence").notes.join("\n")).toMatch(/does not stop dashes if the unit is crowd control immune/);
  });

  it("models Udyr's six ranks and values that keep growing to level 20", () => {
    const claw = ability("Udyr", "Wilding Claw");
    expect(claw.ranks).toBe(6);
    const awaken = claw.parts.flatMap((part) => part.values).find((value) => value.context.includes("Awaken"));
    expect(awaken?.series).toMatchObject({ kind: "level", past18: "wiki" });
    if (awaken?.series.kind === "level") {
      expect(awaken.series.values[17]).toBeCloseTo(70, 9);
      expect(awaken.series.values[19]).toBeCloseTo(75.882353, 5);
    }
  });

  it("extends some level-based values to 20 from the game's formulas", () => {
    const series = all.flatMap((record) => record.parts.flatMap((part) => part.values.map((value) => value.series)));
    const extended = series.filter((s) => s.kind === "level" && s.past18 === "game files");
    expect(extended.length).toBeGreaterThan(0);
    for (const s of extended) if (s.kind === "level") expect(s.values).toHaveLength(20);
  });
});
