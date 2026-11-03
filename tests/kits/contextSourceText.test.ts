import { describe, expect, it } from "vitest";
import { KitDataError } from "../../engine/kits/context";
import { context } from "./helpers";

describe("strict reading of source text fields", () => {
  it("retains the complete continuous mana cost instead of the initial numeric cost alone", () => {
    const kit = context("Anivia");
    expect(kit.ability("Glacial Storm").textField("costType")).toBe("mana + 35 / 45 / 55 per second");
    expect(kit.evidence.at(-1)).toEqual({
      ability: "Glacial Storm",
      page: "Template:Data Anivia/Glacial Storm",
      revid: 4006729,
      text: "costType: mana + 35 / 45 / 55 per second",
    });
  });

  it("reads the declared cooldown anchor verbatim", () => {
    expect(context("Anivia").ability("Glacial Storm").textField("cooldownStart")).toBe("post-effect");
    expect(context("Malzahar").ability("Nether Grasp").textField("cooldownStart")).toBe("on-cast");
  });

  it("rejects missing, blank, and nontext fields instead of silently inventing a default", () => {
    const ability = context("Anivia").ability("Rebirth");
    expect(() => ability.textField("costType")).toThrow(KitDataError);
    ability.record.fields.costType = "  \n  ";
    expect(() => ability.textField("costType")).toThrow(/no costType text field/);
    Object.assign(ability.record.fields, { costType: { text: "mana" } });
    expect(() => ability.textField("costType")).toThrow(/no costType text field/);
  });

  it("attributes resurrection rules to their actual supplemental source revision", () => {
    const kit = context("Anivia");
    const passive = kit.ability("Rebirth");
    passive.quote("Entering resurrection does not cancel cast times.");
    expect(kit.evidence.at(-1)).toEqual({
      ability: "Rebirth",
      page: "Template:Tip data/Resurrection",
      revid: 4060644,
      text: "Entering resurrection does not cancel cast times.",
    });
    passive.quote("Triggering Rebirth will break tethers on Anivia.");
    expect(kit.evidence.at(-1)?.page).toBe("Template:Data Anivia/Rebirth");
    expect(kit.evidence.at(-1)?.revid).toBe(3906517);
  });

  it("fails when a supplemental rule changes and never assembles quotes across separate sources", () => {
    const passive = context("Anivia").ability("Rebirth");
    const supplemental = passive.record.sources?.[0];
    expect(supplemental).toBeDefined();
    if (!supplemental) throw Error("Missing pinned resurrection source");
    supplemental.text = ["One source ends here."];
    passive.record.sources?.push({ page: { title: "Other source", revid: 123 }, text: ["The next starts here."] });
    expect(passive.text).toContain("One source ends here. The next starts here.");
    expect(() => passive.quote("One source ends here. The next starts here.")).toThrow(/no longer says/);
    expect(() => passive.quote("Entering resurrection does not cancel cast times.")).toThrow(/no longer says/);
  });

  it("retains the pinned action-table restrictions without changing their source attribution", () => {
    const anivia = context("Anivia");
    anivia.ability("Rebirth").quote("move=false; cast=false; attack=false");
    expect(anivia.evidence.at(-1)?.revid).toBe(3906517);
    const malzahar = context("Malzahar");
    expect(malzahar.ability("Nether Grasp").quoted("move=Disabled for the first 0.5 seconds. Interrupts afterwards.")).toBe(0.5);
    expect(malzahar.evidence.at(-1)?.revid).toBe(4015186);
  });

  it("keeps both pet families' snapshot rule attached to the pinned champion article", () => {
    const kit = context("Zyra");
    for (const name of ["Thorn Spitter", "Vine Lasher"]) {
      kit.pet(name).quote("Plants do not update their damage if Zyra levels up or changes her AP");
      expect(kit.evidence.at(-1)?.page).toBe("Zyra");
      expect(kit.evidence.at(-1)?.revid).toBe(4002566);
    }
  });

  it("attributes game geometry to its exact versioned URL, object, and content hash", () => {
    const kit = context("Malzahar");
    expect(kit.ability("Nether Grasp").gameQuoted("mSpell.castRadius: [280,280,280,280,280,280,280]")).toBe(280);
    const evidence = kit.evidence.at(-1);
    expect(evidence).toMatchObject({
      ability: "Nether Grasp",
      page: "Characters/Malzahar/Spells/MalzaharRAbility/MalzaharR",
      revid: 0,
      sourceVersion: "16.21.8342754+branch.releases-16-21.content.release",
      url: "https://raw.communitydragon.org/16.21/game/data/characters/malzahar/malzahar.bin.json",
    });
    expect(evidence?.sourceSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(() => kit.ability("Nether Grasp").quote("mSpell.castRadius: [280,280,280,280,280,280,280]")).toThrow(/wiki no longer says/);
  });

  it("reads the actual level-one offset and continuing execute growth rather than treating the first value as level zero", () => {
    const ability = context("Malzahar").ability("Malefic Visions");
    const atOne = ability.gameQuoted('"mLevel1Value":10');
    const perLevel = ability.gameQuoted('"mInitialBonusPerLevel":2');
    ability.gameQuote('"mBreakpoints":[{"mLevel":12,"__type":"Breakpoint"}]');
    expect(atOne + perLevel * (1 - 1)).toBe(10);
    expect(atOne + perLevel * (18 - 1)).toBe(44);
    expect(atOne + perLevel * (20 - 1)).toBe(48);
  });

  it("reads the plant projectile's actual movement speed instead of the unrelated root-spell metadata", () => {
    const kit = context("Zyra");
    expect(kit.ability("Deadly Spines").gameQuoted('"mSpeed":1200')).toBe(1200);
    expect(kit.evidence.at(-1)?.page).toBe("Characters/Zyra/Spells/ZyraQAbility/ZyraQPlantMissile");
    expect(() => kit.ability("Deadly Spines").gameQuoted('"mSpeed":1400')).toThrow(/pinned game data no longer says/);
  });

  it.each([
    { field: "version", value: "" },
    { field: "version", value: undefined },
    { field: "version", value: "latest" },
    { field: "object", value: "" },
    { field: "object", value: undefined },
    { field: "sha256", value: "not-a-content-hash" },
    { field: "url", value: "https://raw.communitydragon.org/latest/game/data/characters/malzahar/malzahar.bin.json" },
    { field: "url", value: "https://raw.communitydragon.org/16.19/game/data/characters/malzahar/malzahar.bin.json" },
    { field: "url", value: "http://raw.communitydragon.org/16.21/game/data/characters/malzahar/malzahar.bin.json" },
    { field: "url", value: undefined },
  ])("rejects incomplete or unversioned game attribution: $field = $value", ({ field, value }) => {
    const ability = context("Malzahar").ability("Nether Grasp");
    const source = ability.record.gameSources?.[0];
    if (!source) throw Error("Missing pinned game source");
    Object.assign(source, { [field]: value });
    expect(() => ability.gameQuote("mSpell.castRadius")).toThrow(/incomplete game source attribution/);
  });

  it("rejects missing game excerpts and missing numeric values", () => {
    const ability = context("Malzahar").ability("Nether Grasp");
    expect(() => ability.gameQuote("mSpell.castRadius: [999]")).toThrow(KitDataError);
    expect(() => ability.gameQuoted("mSpell.castRadius")).toThrow(/no number 1 in game excerpt/);
    expect(() => context("Garen").ability("Demacian Justice").gameQuote("anything")).toThrow(/pinned game data no longer says/);
    expect(() => ability.gameQuote(" \n ")).toThrow(/cannot be blank/);
  });

  it("preserves separate array values, fractional values, and negative game offsets", () => {
    const kit = context("Zyra");
    expect(kit.ability("Deadly Spines").gameQuoted("mSpell.castRadius: [140,140,140,140,140,140,140]", 1)).toBe(140);
    expect(kit.ability("Deadly Spines").gameQuoted('"mAttackDelayCastOffsetPercent":-0.08070175349712372')).toBe(-0.08070175349712372);
    expect(kit.ability("Grasping Roots").gameQuoted('"mAttackDelayCastOffsetPercent":-0.12455999851226807')).toBe(-0.12455999851226807);
  });

  it("can require a specific child object even when another child has the same value", () => {
    const kit = context("Ziggs");
    const ability = kit.ability("Bouncing Bomb");
    const object = "Characters/Ziggs/Spells/ZiggsQAbility/ZiggsQSpell3";
    expect(ability.gameQuoted("mSpell.missileSpeed: 1600", 0, object)).toBe(1600);
    expect(kit.evidence.at(-1)?.page).toBe(object);
    const source = ability.record.gameSources?.find((entry) => entry.object === object);
    if (!source) throw Error("Missing third-bounce source");
    source.text = ["mSpell.missileSpeed: 1500"];
    // A matching second-bounce value cannot conceal a changed third bounce.
    expect(ability.gameQuoted("mSpell.missileSpeed: 1600")).toBe(1600);
    expect(() => ability.gameQuoted("mSpell.missileSpeed: 1600", 0, object)).toThrow(/pinned game data no longer says/);
  });
});
