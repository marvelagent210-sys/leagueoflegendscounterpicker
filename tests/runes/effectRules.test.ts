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
const selected = [8005, 8008, 8009, 8010, 8014, 8017, 8021, 8139, 8237, 8299, 8401, 8437, 8439, 8444, 8451, 8463, 8473, 9101, 9103, 9104, 9105, 9111];
const overgrowthPath = "Perks/Styles/Resolve/Overgrowth";
const aftershockPath = "Perks/Styles/Resolve/Aftershock";
const fontPath = "Perks/Styles/Resolve/FontOfLife";
const tastePath = "Perks/Styles/Domination/TasteOfBlood";
const scorchPath = "Perks/Styles/Sorcery/Scorch";
const shieldBashPath = "Perks/Styles/Resolve/ShieldBash";
const bonePath = "Perks/Styles/Resolve/BonePlating";
const graspPath = "Perks/Styles/Resolve/GraspOfTheUndying";
const graspHealMissile = graspPath + "/Spells/RuinedKing_HealMis";
const tempoPath = "Perks/Styles/Precision/LethalTempo";
const conquerorPath = "Perks/Styles/Precision/Conqueror";
const tempoBolts = ["{6f0c6028}", "{720c64e1}", "{f7b50373}", "{f8b50506}"] as const;
const fleetPath = "Perks/Styles/Precision/FleetFootwork";
const fleetTemplate = "Template:Rune data Fleet Footwork";
const fleetClientPaths = [
  "Perks/Styles/Precision", fleetPath, fleetPath + "/Spells/FleetFootwork_HealMis",
  ...["Heal", "Cas", "Heal_Mis", "Buff", "Haste"].map(name => fleetPath + "/Particles/Perks_FleetFootwork_" + name),
];
const pressPath = "Perks/Styles/Precision/PressTheAttack";
const pressSources = ["Adaptive force", "Attack effects", "Basic attack", "Combat status", "Press the Attack", "Stack",
  "Template:Rune data Press the Attack", "Template:Tip data/Adaptive damage"];
const triumphSources = ["Assist", "Heal and shield power", "Template:Rune data Triumph", "Triumph", "Template:Healing modifiers"];
const presencePath = "Perks/Styles/Precision/PresenceOfMind";
const presenceMissilePath = "Perks/Styles/Precision/PresenceOfMind/spells/PerkPresenceOfMindVisualMissile";
const triumphMissilePath = "Perks/Styles/Precision/Triumph/Spells/PerkSoulFeastVisualMissile";
const gamePaths = [
  "Perks/Styles/Precision/CoupDeGrace", "Perks/Styles/Precision/CutDown",
  "Perks/Styles/Precision/LastStand", "Perks/Styles/Resolve/SecondWind",
  "Perks/Styles/Precision/AbsorbLife", "Perks/Styles/Precision/LegendAlacrity", "Perks/Styles/Precision/LegendHaste",
  "Perks/Styles/Precision/LegendBloodline",
  "Perks/Styles/Precision/Triumph",
  "Perks/Styles/Precision/PresenceOfMind",
  "Perks/Styles/Precision/PressTheAttack",
] as const;
interface HealBreakpoint { __type: string; mLevel: number; mBonusPerLevelAtAndAfter: number }
interface HealPart {
  __type: string; mLevel1Value: number; mInitialBonusPerLevel: number; mBreakpoints: HealBreakpoint[];
}
interface HealCalculation { __type: string; mFormulaParts: HealPart[] }
interface LevelTableCalculation {
  __type: string; mPrecision: number; mFormulaParts: { __type: string; values: number[] }[];
}
interface GamePerk {
  __type?: string;
  mPerkId: number;
  mPerkName?: string;
  mScript: { mSpellScriptName?: string; mSpellScriptData: {
    mEffectAmount: Record<string, number>;
    __type?: string;
    mCalculations?: { HealAmount: HealCalculation; RegenAmount?: LevelTableCalculation };
    mEffectAmountGameMode?: Record<string, { __type: string; mEffectAmountPerMode: Record<string, number> }>;
  } };
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

describe("Scorch source rules", () => {
  it("reads the exact level-20 burn, delay and cooldown", () => {
    expect(build().scorch).toEqual({ modelLevel: 20, damage: 720 / 17, delay: 1, cooldown: 10 });
  });

  it.each(["Damage", "DamageMax", "DotDuration", "BurnlockoutDuration"])("cross-checks the committed client %s field", field => {
    const input = fixture();
    editGame(input, records => { records[scorchPath]!.mScript.mSpellScriptData.mEffectAmount[field]! += 0.1; });
    expect(() => build(input)).toThrow(new RegExp(`Scorch Wiki/game ${field} disagree`));
  });
});

describe("Taste of Blood source rules", () => {
  it("reads the level-20 curve, separate bonus AD and AP ratios, and cooldown", () => {
    expect(build().tasteOfBlood).toEqual({ modelLevel: 20, heal: 728 / 17, bonusAdRatio: 0.1, apRatio: 0.05, cooldown: 20 });
  });

  it.each(["HealAmount", "HealAmountMax", "ADRatio", "APRatio", "Cooldown"])("cross-checks the committed client %s field", field => {
    const input = fixture();
    editGame(input, records => { records[tastePath]!.mScript.mSpellScriptData.mEffectAmount[field]! += 0.1; });
    expect(() => build(input)).toThrow(new RegExp(`Taste of Blood Wiki/game ${field} disagree`));
  });
});

describe("Font of Life source rules", () => {
  it("uses the exact level-20 heal and the sourced cooldown and ally radius", () => {
    expect(build().fontOfLife).toEqual({ modelLevel: 20, heal: 930 / 17, rangedRatio: 0.7, cooldown: 20, allyRadius: 1000 });
  });

  it.each(["Cooldown", "RangedMod"])("cross-checks the committed client %s field", field => {
    const input = fixture();
    editGame(input, records => { records[fontPath]!.mScript.mSpellScriptData.mEffectAmount[field]! += 0.1; });
    expect(() => build(input)).toThrow(new RegExp(`Font of Life Wiki/game ${field} disagree`));
  });
});

describe("Aftershock source rules", () => {
  it("uses the patch 26.21 grants and both client level curves", () => {
    expect(build().aftershock).toEqual({
      modelLevel: 20, flatResistance: 45, bonusResistanceRatio: 0.75, maxResistance: 2690 / 17,
      baseDamage: 2230 / 17, bonusHealthRatio: 0.08, duration: 2.5, cooldown: 20, radius: 350,
    });
  });

  it.each(["FlatResists", "PercentBonusResist", "BonusResistMax", "MaxBaseDamage", "HealthRatio", "DamageRadius"])
  ("cross-checks the current client value for %s", field => {
    const input = fixture();
    editGame(input, records => { records[aftershockPath]!.mScript.mSpellScriptData.mEffectAmount[field]! += 1; });
    expect(() => build(input)).toThrow(new RegExp(`Aftershock Wiki/game ${field} disagree`));
  });
});

describe("Overgrowth source rules", () => {
  it("agrees with the normal-mode client on stack size, threshold, radius and percentage", () => {
    expect(build().overgrowth).toEqual({
      unitsPerStack: 8, healthPerStack: 3, thresholdUnits: 120, healthRatio: 0.035, radius: 1400,
    });
  });

  it.each(["UnitsPerTier", "FlatHealthPerTier", "ThresholdUnits", "ThresholdMaxHealthRatio", "Range"])("cross-checks %s", field => {
    const input = fixture();
    editGame(input, records => { records[overgrowthPath]!.mScript.mSpellScriptData.mEffectAmount[field]! += 1; });
    expect(() => build(input)).toThrow(new RegExp(`Overgrowth Wiki/game ${field} disagree`));
  });
});

describe("Shield Bash source rules", () => {
  it("uses the level-20 formula with the reviewed ratios and grace period", () => {
    expect(build().shieldBash).toEqual({
      modelLevel: 20, baseDamage: 560 / 17, bonusHealthRatio: 0.025, shieldRatio: 0.15, linger: 2,
    });
  });

  it.each(["ProcBaseMax", "BonusHealthRatio", "ShieldRatio", "ProcDuration"])("cross-checks the normal client field %s", field => {
    const input = fixture();
    editGame(input, records => { records[shieldBashPath]!.mScript.mSpellScriptData.mEffectAmount[field]! += 1; });
    expect(() => build(input)).toThrow(new RegExp(`Shield Bash Wiki/game ${field} disagree`));
  });
});

describe("Bone Plating source rules", () => {
  it("uses the explicit level-20 formula beyond the frozen client endpoint", () => {
    expect(build().bonePlating).toEqual({
      modelLevel: 20, reduction: 1080 / 17, charges: 3, duration: 1.5, cooldown: 55,
    });
  });

  it("checks the named amount and the client interpolation independently", () => {
    const amount = fixture();
    editGame(amount, records => { records[bonePath]!.mScript.mSpellScriptData.mEffectAmount.BlockMax = 61; });
    expect(() => build(amount)).toThrow(/Bone Plating Wiki\/game BlockMax disagree/);
    const interpolation = fixture();
    editGame(interpolation, records => {
      const data = records[bonePath]!.mScript.mSpellScriptData as unknown as {
        mCalculations: { BlockCalc: { mFormulaParts: { mEndValue: number }[] } };
      };
      data.mCalculations.BlockCalc.mFormulaParts[0]!.mEndValue = 61;
    });
    expect(() => build(interpolation)).toThrow(/Bone Plating Wiki\/game mEndValue disagree/);
  });

  it("rejects a revised source even when the reviewed excerpt is preserved", () => {
    const input = fixture();
    editWiki(input, "Template:Data Kled/Violent Tendencies", content => content + "\n<!-- changed revision content -->");
    expect(() => build(input)).toThrow(/Violent Tendencies full reviewed revision changed/);
  });
});

describe("Grasp of the Undying source rules", () => {
  it("reads the exact melee and ranged ratios and the client missile's flight time", () => {
    const grasp = build().grasp;
    expect(grasp).toMatchObject({ maxStacks: 4, stackInterval: 1, combatWindow: 3, readyWindow: 5,
      meleeHealth: 5, rangedHealth: 2, healDelay: 0.4 });
    expect(grasp.meleeDamageRatio).toBeCloseTo(0.035, 14);
    expect(grasp.rangedDamageRatio).toBeCloseTo(0.014, 14);
    expect(grasp.meleeHealRatio).toBeCloseTo(0.013, 14);
    expect(grasp.rangedHealRatio).toBeCloseTo(0.0052, 14);
  });

  it("fails when the Wiki and the frozen client disagree about ranged efficacy", () => {
    const input = fixture();
    editGame(input, game => { game[graspPath]!.mScript.mSpellScriptData.mEffectAmount.RangedPenaltyMod = 0.6; });
    expect(() => build(input)).toThrow(/Grasp of the Undying Wiki\/game RangedPenaltyMod disagree/);
  });
});

describe("Lethal Tempo source rules", () => {
  it("uses the level-20 formula and calculation multipliers despite the frozen ranged display values", () => {
    const rule = build().lethalTempo;
    expect(rule).toEqual({
      modelLevel: 20, maxStacks: 6, stackDuration: 6, decayInterval: 0.3,
      attackSpeedPerStack: 0.06, rangedAttackSpeedRatio: 0.8, boltDamage: 552 / 17,
      rangedBoltRatio: 0.667, bonusAttackSpeedRatio: 1, boltSpeed: 2500,
      boltGate: "max-stacks-before-attack", boltStatModel: "at-launch", boltTravelModel: "fixed-endpoint",
    });
    expect(rule.attackSpeedPerStack * rule.rangedAttackSpeedRatio).toBeCloseTo(0.048, 12);
    expect(rule.boltDamage * rule.rangedBoltRatio).toBeCloseTo(46023 / 2125, 12);
    expect((JSON.parse(originalGame) as Game)[tempoPath]!.mScript.mSpellScriptData.mEffectAmount)
      .toMatchObject({ TTASPerStackRanged: Math.fround(0.04), TTMinNoteDamageRanged: 6, TTMaxNoteDamageRanged: 24 });
  });

  it.each(tempoBolts)("matches the whole client bolt object %s", key => {
    const input = fixture();
    const game = JSON.parse(input.game);
    game[key].mSpell.mMissileSpec.movementComponent.mSpeed = 1800;
    input.game = JSON.stringify(game);
    expect(() => build(input)).toThrow(/Lethal Tempo complete bolt object changed/);
  });

  it("rejects a re-pinned conflicting decay interval even when other terms match", () => {
    const input = fixture();
    editWiki(input, "Template:Rune data Lethal Tempo", text => text.replace("{{fd|0.3}}", "{{fd|0.25}}"));
    expect(() => build(input)).toThrow(/Lethal Tempo full reviewed revision changed/);
  });
});

describe("Press the Attack source rules and declared model choices", () => {
  it("uses the template's explicit level20 arithmetic while retaining the client's40/160 endpoints", () => {
    const source = originalBundle.pages.find(page => page.title === "Template:Rune data Press the Attack")!;
    expect(source.content).toContain("{{pp|40 + (160-40)/17*(x-1)|1 to 20 by 1}}");
    const data = (JSON.parse(originalGame) as Game)[pressPath]!.mScript.mSpellScriptData;
    expect(data.mEffectAmount).toMatchObject({ MinDamage: 40, MaxDamage: 160,
      BonusADRatio: 0, APRatio: 0, LethalityRatio: 0, HitsRequired: 3, TimeBetweenHits: 4, Cooldown: 6,
      BonusPercentDamage: Math.fround(0.08), AmpDuration: 5, OutOfCombatTimer: 5 });
    expect(data.mCalculations).toBeUndefined();
    expect(data.mEffectAmountGameMode).toBeUndefined();
    expect(build().pressTheAttack).toEqual({
      modelLevel: 20, damage: 2960 / 17, hitsRequired: 3, stackDuration: 4, cooldown: 6,
      damageIncrease: 0.08, combatDuration: 5, combatExpiryModel: "last-qualified-activity",
      adaptiveDamageModel: "current-derived-bonus-ad-vs-ap", activationFrameModel: "simulation-tick",
    });
    expect(build().pressTheAttack.damage).toBeGreaterThan(data.mEffectAmount.MaxDamage!);
    expect(build().pressTheAttack.combatDuration).toBe(5);
    // Neither named endpoint fields nor visual resources reveal hidden Lua.
    // Tick activation, dynamic derived stats and one combat clock are policies.
  });

  it("retains current hit, timing, adaptive and combat qualifications alongside retired exposed context", () => {
    const evidence = build().evidence.map(entry => entry.text).join("\n");
    for (const text of [
      "deals {{tip|proc damage}}", "not affected by on-hit damage modifiers",
      "multiple times in one issued attack", "{{cai|W|Azir}}", "{{cai|R|Twitch}}",
      "{{cai|Alpha Strike|Master Yi}}", "third stack does not benefit", "same frame",
      "future procs that occur while affected", "excluding {{si|Smite}}",
      "Stack consumption no longer renders the target ''Exposed''",
      "Greater {{as|{{sti|'''bonus''' attack damage}}}}", "champion's [[File:Rune_shard_Adaptive_Force.png",
      "Both combat types trigger on 0 damage instances", "neither triggers on dodge / miss",
      "prevented by a {{tip|spell shield}}", "enter combat independently of their owners",
      "{{cai|Hemoplague|Vladimir}}", "Stacking effects that time out will cause all stacks to expire at once",
    ]) expect(evidence).toContain(text);
  });

  it.each([
    "MinDamage", "MaxDamage", "BonusADRatio", "APRatio", "LethalityRatio", "HitsRequired", "TimeBetweenHits",
    "AmpPotencyMaxSelf", "AmpPotencyMaxOthers", "AmpPotencyStartSelf", "AmpPotencyStartOthers",
    "BonusPercentDamage", "AmpDuration", "OutOfCombatTimer", "Cooldown",
  ])("rejects an altered normal-mode %s amount", field => {
    for (const value of [undefined, null, -1, "8", Number.POSITIVE_INFINITY]) {
      const input = fixture();
      editGame(input, game => {
        const amounts = game[pressPath]!.mScript.mSpellScriptData.mEffectAmount as Record<string, unknown>;
        if (value === undefined) delete amounts[field]; else amounts[field] = value;
      });
      expect(() => build(input)).toThrow(new RegExp(`Press the Attack Wiki/game ${field} disagree`));
    }
  });

  it.each([
    ["for 4 seconds", "for 5 seconds"], ["up to 3 times", "up to 4 times"],
    ["40 + (160-40)", "41 + (160-40)"], ["(160-40)/17", "(160-40)/0"],
    ["1 to 20 by 1", "1 to 18 by 1"], ["grant you 8%", "grant you 9%"],
    ["until 5 seconds", "until 10 seconds"],
  ])("rejects re-pinned Wiki formula drift %s", (old, next) => {
    const input = fixture(); editDescription(input, "Press the Attack", old, next);
    expect(() => build(input)).toThrow(/Press the Attack.*(?:formula|positive|disagree)/);
  });

  it("requires exactly one current description and an explicit post-consumption cooldown", () => {
    const missing = fixture(); editWiki(missing, "Template:Rune data Press the Attack", text => text.replace("|description  =", "|historical ="));
    expect(() => build(missing)).toThrow(/Press the Attack needs its complete current description/);
    const duplicate = fixture(); editWiki(duplicate, "Template:Rune data Press the Attack", text =>
      text + "\n" + text.split("\n").find(line => /^\|description\s*=/.test(line))!);
    expect(() => build(duplicate)).toThrow(/Press the Attack needs its complete current description/);
    const cooldown = fixture(); editWiki(cooldown, "Template:Rune data Press the Attack", text =>
      text.replace("Starts after consuming a target's stacks", "Starts when the first stack is applied"));
    expect(() => build(cooldown)).toThrow(/Press the Attack cooldown reviewed formula changed/);
  });

  it.each(["perk", "ID", "name", "type", "script", "amounts", "calculation", "mode override", "data type"])(
    "rejects unreviewed client %s", mutation => {
      const input = fixture();
      editGame(input, game => {
        const perk = game[pressPath]!, data = perk.mScript.mSpellScriptData;
        if (mutation === "perk") delete game[pressPath];
        else if (mutation === "ID") perk.mPerkId = 8009;
        else if (mutation === "name") perk.mPerkName = "PresenceOfMind";
        else if (mutation === "type") perk.__type = "OtherPerk";
        else if (mutation === "script") perk.mScript.mSpellScriptName += ".changed";
        else if (mutation === "amounts") delete (data as Partial<typeof data>).mEffectAmount;
        else if (mutation === "calculation") data.mCalculations = {} as typeof data.mCalculations;
        else if (mutation === "mode override") data.mEffectAmountGameMode = {};
        else data.__type = "UnreviewedData";
      });
      expect(() => build(input)).toThrow(/Press the Attack/);
    },
  );

  it("rejects tooltip replacement and jointly changed Wiki/client damage without accepting160 as a model cap", () => {
    const tooltip = fixture();
    tooltip.catalog.runes.find(rune => rune.id === 8005)!.clientDescription =
      tooltip.catalog.runes.find(rune => rune.id === 8005)!.clientDescription.replace("40 - 160", "40 - 174");
    expect(() => build(tooltip)).toThrow(/Press the Attack retained abbreviated client description changed/);
    const joint = fixture(); editDescription(joint, "Press the Attack", "(160-40)", "(180-40)");
    editGame(joint, game => { game[pressPath]!.mScript.mSpellScriptData.mEffectAmount.MaxDamage = 180; });
    expect(() => build(joint)).toThrow(/Template:Rune data Press the Attack full reviewed revision changed/);
    const denominator = fixture(); editDescription(denominator, "Press the Attack", "/17*", "/19*");
    expect(() => build(denominator)).toThrow(/Template:Rune data Press the Attack full reviewed revision changed/);
  });

  it.each(pressSources)("requires the complete pinned %s source, rather than favorable excerpts", title => {
    const input = fixture();
    const excerpts = build().evidence.filter(entry => entry.title === title).map(entry => entry.text).join("\n");
    editWiki(input, title, () => excerpts);
    expect(() => build(input)).toThrow(new RegExp(`${title} full reviewed revision changed`));
  });
});

describe("Presence of Mind detailed source rules", () => {
  it("uses the full level-zero-indexed table, rather than the conflicting 6-50 tooltip", () => {
    const levels = [6, 6.8, 7.6, 8.4, 9.2, 10, 12, 14, 16, 18, 20, 23.2, 26.4, 29.6, 32.8, 36, 40, 44, 52, 56];
    const data = (JSON.parse(originalGame) as Game)[presencePath]!.mScript.mSpellScriptData;
    expect(data.mCalculations!.RegenAmount!.mFormulaParts).toEqual([{
      values: [6, ...levels, ...Array<number>(10).fill(60)].map(Math.fround),
      __type: "ByCharLevelFormulaCalculationPart",
    }]);
    expect(data.mEffectAmount).toMatchObject({
      PercentManaRestore: Math.fround(0.15), CooldownDuration: 8, MinFlatRestore: 6, MaxFlatRestore: 50, EnergyRestore: 6,
    });
    expect(data.mCalculations!.RegenAmount!.mFormulaParts[0]!.values[18]).toBe(44);
    expect(data.mCalculations!.RegenAmount!.mFormulaParts[0]!.values[19]).toBe(52);
    expect(data.mCalculations!.RegenAmount!.mFormulaParts[0]!.values[20]).toBe(56);
    expect(build().presenceOfMind).toEqual({
      modelLevel: 20, manaRestore: 56, rangedManaRatio: 0.8, energyRestore: 6, damageCooldown: 8,
      takedownResourceRatio: 0.15, takedownDelay: 1, maximumResourceModel: "current-at-delivery",
    });
    expect(build().presenceOfMind.manaRestore).toBeGreaterThan(data.mEffectAmount.MaxFlatRestore!);
    // The ranged reduction applies only to damage Mana, not Energy or the
    // fifteen-percent takedown arm. Numeric resource/lifecycle phases remain policy.
    expect(build().presenceOfMind.manaRestore * build().presenceOfMind.rangedManaRatio).toBeCloseTo(44.8, 12);
    const evidence = build().evidence.map(entry => entry.text).join("\n");
    expect(evidence).toContain("then +8 per level until level 19, then +4 per level");
    expect(evidence).toContain("will be consumed even if the user is at maximum");
    expect(evidence).toContain("No longer increases the resource beyond the maximum amount");
    expect(evidence).toContain("Mana Restoration'' isn't a tracked stat");
    expect(evidence).toContain("maximum''' energy}} is increased by {{as|100|energy}}");
  });

  it.each(Array.from({ length: 31 }, (_, level) => level))("rejects an altered client value at level-table index %s", level => {
    const input = fixture();
    editGame(input, game => { game[presencePath]!.mScript.mSpellScriptData.mCalculations!
      .RegenAmount!.mFormulaParts[0]!.values[level]! += 1; });
    expect(() => build(input)).toThrow(/Presence of Mind level table disagrees at index/);
  });

  it.each(["missing", "calculation type", "precision", "part type", "short table", "long table", "extra part"] as const)(
    "rejects an unreviewed %s level calculation", mutation => {
      const input = fixture();
      editGame(input, game => {
        const calculations = game[presencePath]!.mScript.mSpellScriptData.mCalculations!;
        const calculation = calculations.RegenAmount!;
        if (mutation === "missing") delete calculations.RegenAmount;
        else if (mutation === "calculation type") calculation.__type = "GameCalculationModified";
        else if (mutation === "precision") calculation.mPrecision = 2;
        else if (mutation === "part type") calculation.mFormulaParts[0]!.__type = "ByCharLevelInterpolationCalculationPart";
        else if (mutation === "short table") calculation.mFormulaParts[0]!.values.pop();
        else if (mutation === "long table") calculation.mFormulaParts[0]!.values.push(60);
        else calculation.mFormulaParts.push(structuredClone(calculation.mFormulaParts[0]!));
      });
      expect(() => build(input)).toThrow(/Presence of Mind/);
    },
  );

  it.each(["PercentManaRestore", "CooldownDuration", "EnergyRestore"] as const)("checks normal-mode %s against the current Wiki rule", field => {
    const input = fixture();
    editGame(input, game => { game[presencePath]!.mScript.mSpellScriptData.mEffectAmount[field]! += 1; });
    expect(() => build(input)).toThrow(/Presence of Mind.*Wiki\/game/);
  });

  it("never substitutes the ARAM/KINGPORO ten-percent override for normal fifteen-percent restoration", () => {
    const game = JSON.parse(originalGame) as Game;
    const modes = game[presencePath]!.mScript.mSpellScriptData.mEffectAmountGameMode!;
    for (const mode of ["ARAM", "KINGPORO"]) expect(modes[mode]!.mEffectAmountPerMode.PercentManaRestore).toBe(Math.fround(0.1));
    const input = fixture();
    editGame(input, data => { data[presencePath]!.mScript.mSpellScriptData.mEffectAmount.PercentManaRestore = Math.fround(0.1); });
    expect(() => build(input)).toThrow(/Presence of Mind normal-mode.*PercentManaRestore disagree/);
  });

  it.each(["ARAM", "KINGPORO"])("retains the independently guarded %s reference without using it as the runtime ratio", mode => {
    const input = fixture();
    editGame(input, game => { game[presencePath]!.mScript.mSpellScriptData.mEffectAmountGameMode![mode]!
      .mEffectAmountPerMode.PercentManaRestore = Math.fround(0.15); });
    expect(() => build(input)).toThrow(/Presence of Mind.*reference.*PercentManaRestore disagree/);
  });

  it.each(["MinFlatRestore", "MaxFlatRestore"] as const)("retains conflicting abbreviated field %s instead of silently repairing it", field => {
    const input = fixture();
    editGame(input, game => { game[presencePath]!.mScript.mSpellScriptData.mEffectAmount[field]! += 1; });
    expect(() => build(input)).toThrow(/Presence of Mind retained abbreviated 6-50 tooltip/);
  });

  it("rejects a changed client ranged description even when the detailed table remains intact", () => {
    const input = fixture();
    input.catalog.runes.find(rune => rune.id === 8009)!.clientDescription =
      input.catalog.runes.find(rune => rune.id === 8009)!.clientDescription.replace("80% for ranged", "70% for ranged");
    expect(() => build(input)).toThrow(/Presence of Mind reviewed abbreviated client description/);
  });

  it("rejects a re-pinned ranged Mana formula that disagrees with the client multiplier", () => {
    const input = fixture();
    editWiki(input, "Template:Rune data Presence of Mind", text => text.replace(
      "|6*0.8; then +0.8*0.8*x for 5; then +2*0.8*x for 5; then +3.2*0.8*x for 5; then +4*0.8*x for 2; then +8*0.8; then +4*0.8|",
      "|6*0.7; then +0.8*0.7*x for 5; then +2*0.7*x for 5; then +3.2*0.7*x for 5; then +4*0.7*x for 2; then +8*0.7; then +4*0.7|",
    ));
    expect(() => build(input)).toThrow(/Presence of Mind ranged Wiki\/client multiplier disagree/);
  });

  it.each(["Mana percent", "Energy percent", "delay", "Energy flat", "cooldown", "old regeneration"] as const)(
    "rejects an altered current Wiki %s rule", field => {
      const input = fixture();
      const replacements: Record<typeof field, [string, string]> = {
        "Mana percent": ["15% of your '''maximum''' mana", "10% of your '''maximum''' mana"],
        "Energy percent": ["15% of your '''maximum''' energy", "10% of your '''maximum''' energy"],
        delay: ["after a 1-second delay", "after a 2-second delay"],
        "Energy flat": ["{{as|6 energy}}", "{{as|7 energy}}"],
        cooldown: ["(8 second cooldown)", "(9 second cooldown)"],
        "old regeneration": ["Damaging an enemy champion restores", "Damaging an enemy champion regenerates"],
      };
      const [before, after] = replacements[field];
      editWiki(input, "Template:Rune data Presence of Mind", text => text.replace(before, after));
      expect(() => build(input)).toThrow(/Presence of Mind/);
    },
  );

  it.each(["missing", "ID", "name", "script", "type", "data type"] as const)("requires the exact Presence game %s", field => {
    const input = fixture();
    editGame(input, game => {
      const perk = game[presencePath]!;
      if (field === "missing") delete game[presencePath];
      else if (field === "ID") perk.mPerkId = 9111;
      else if (field === "name") perk.mPerkName = "Triumph";
      else if (field === "script") perk.mScript.mSpellScriptName += ".changed";
      else if (field === "type") perk.__type = "UnreviewedPerk";
      else perk.mScript.mSpellScriptData.__type = "UnreviewedData";
    });
    expect(() => build(input)).toThrow(/Presence of Mind/);
  });

  it.each(["missing", "identity", "timing", "movement", "arrival"] as const)("cross-checks the Presence visual missile %s", field => {
    const input = fixture();
    editGame(input, records => {
      const game = records as unknown as Record<string, {
        ObjectName: string; mSpell: { mMissileSpec: {
          movementComponent: { __type: string; mTravelTime: number };
          behaviors: { __type: string }[];
        } };
      }>;
      if (field === "missing") delete game[presenceMissilePath];
      else if (field === "identity") game[presenceMissilePath]!.ObjectName = "OtherVisualMissile";
      else if (field === "timing") game[presenceMissilePath]!.mSpell.mMissileSpec.movementComponent.mTravelTime = 2;
      else if (field === "movement") game[presenceMissilePath]!.mSpell.mMissileSpec.movementComponent.__type = "LinearMovement";
      else game[presenceMissilePath]!.mSpell.mMissileSpec.behaviors[0]!.__type = "UnreviewedArrival";
    });
    expect(() => build(input)).toThrow(/Presence of Mind/);
  });

  it.each([
    "Ability resource", "Cast time", "Death", "Energy", "Mana", "Mana regeneration", "Presence of Mind", "Range type", "Rune",
    "Template:Data Akali/Twilight Shroud", "Template:Data Ryze/Arcane Mastery", "Template:Range difference",
    "Template:Rune data Presence of Mind", "Template:Tip data/Resurrection", "Template:Tip data/Zombie state", "Template:Zombie state info",
  ])("retains complete new source %s rather than only favorable excerpts", title => {
    const input = fixture();
    editWiki(input, title, text => text + "\n<!-- unrelated editorial addition -->\n");
    expect(() => build(input)).toThrow(/full reviewed revision changed/);
  });
});

describe("reviewed combat rune numeric rules", () => {
  it("reads the current Wiki formulas and cross-checks their client float32 values", () => {
    expect(build()).toMatchObject({
      schema: 1, dataset: "16.21", patch: "26.21",
      absorbLife: { heal: 27 },
      pressTheAttack: { modelLevel: 20, damage: 2960 / 17, hitsRequired: 3, stackDuration: 4,
        cooldown: 6, damageIncrease: 0.08, combatDuration: 5, combatExpiryModel: "last-qualified-activity",
        adaptiveDamageModel: "current-derived-bonus-ad-vs-ap", activationFrameModel: "simulation-tick" },
      presenceOfMind: { modelLevel: 20, manaRestore: 56, rangedManaRatio: 0.8, energyRestore: 6,
        damageCooldown: 8, takedownResourceRatio: 0.15, takedownDelay: 1, maximumResourceModel: "current-at-delivery" },
      legendAlacrity: { baseAttackSpeed: 0.03, attackSpeedPerStack: 0.015, pointsPerStack: 100, maxStacks: 10, championKillPoints: 100 },
      legendHaste: { baseHaste: 0, hastePerStack: 1.5, pointsPerStack: 100, maxStacks: 10, championKillPoints: 100 },
      legendBloodline: { baseLifeSteal: 0, lifeStealPerStack: 0.0045, pointsPerStack: 100, maxStacks: 15, championKillPoints: 100, bonusHealth: 85 },
      coupDeGrace: { healthThreshold: 0.4, damageIncrease: 0.08 },
      cutDown: { healthThreshold: 0.6, damageIncrease: 0.08 },
      lastStand: { healthThreshold: 0.6, maximumHealthThreshold: 0.3, minimumDamageIncrease: 0.05, maximumDamageIncrease: 0.11 },
      secondWind: { duration: 10, missingHealthPerSecond: 0.004, tickInterval: 0.5, missingHealthModel: "current-at-regeneration-tick" },
      triumph: { maximumHealthRatio: 0.025, missingHealthRatio: 0.05, delay: 1, bonusGold: 20,
        missingHealthModel: "at-native-kill-credit" },
    });
    const game = JSON.parse(originalGame) as Game;
    expect(game[gamePaths[1]]!.mScript.mSpellScriptData.mEffectAmount.BonusPercentDamage).not.toBe(0.08);
    expect(game[gamePaths[1]]!.mScript.mSpellScriptData.mEffectAmount.EnemyHealthPercentageThreshold).not.toBe(0.6);
    expect(originalCatalog.runes.filter((rune) => selected.includes(rune.id)).map((rune) => rune.combatStatus))
      .toEqual(Array(22).fill("manual-effects"));
  });

  it("binds all 126 complete Wiki revisions, full client bytes, and evidence excerpts", () => {
    expect(originalBundle.pages.map((page) => [page.title, page.revid])).toEqual([
      ["Absorb Life", 3980915],
      ["Champion ability", 4086204],
      ["Champion summoned units", 4023248],
      ["Cooldown", 4050188],
      ["Coup de Grace", 3860002],
      ["Cut Down", 4014921],
      ["Damage", 4084890],
      ["Damage modifier", 4050138],
      ["Haste", 4070414],
      ["Haste/Reducing ability cooldowns", 4039444],
      ["Healing", 4041638],
      ["Health regeneration", 4073061],
      ["Kill", 4053216],
      ["Last Stand", 3926332],
      ["Legend: Alacrity", 3980881],
      ["Legend: Haste", 3980882],
      ["Second Wind", 4012933],
      ["Takedown", 4081718],
      ["Template:Data Udyr/Bridge Between", 3983420],
      ["Template:Data Udyr/Wingborne Storm", 4008208],
      ["Template:Rune data Absorb Life", 3997095],
      ["Template:Rune data Coup de Grace", 3859780],
      ["Template:Rune data Cut Down", 3859781],
      ["Template:Rune data Last Stand", 3859782],
      ["Template:Rune data Legend: Alacrity", 3958705],
      ["Template:Rune data Legend: Haste", 3958696],
      ["Template:Rune data Second Wind", 3960974],
      ["True damage", 4052642],
      ["Udyr", 3991262],
      ["Unit", 4085583],
      ["Health", 4073062],
      ["Legend: Bloodline", 4021767],
      ["Life steal", 4060425],
      ["Template:Data Galio/Shield of Durand", 3990299],
      ["Template:Data K'Sante/All Out", 4051537],
      ["Template:Data Kled/Dismounted Skaarl the Cowardly Lizard", 4038397],
      ["Template:Data Kled/Skaarl the Cowardly Lizard", 4058479],
      ["Template:Data Malphite/Granite Shield", 3973718],
      ["Template:Data Ornn/Living Forge", 4089066],
      ["Template:Data Pyke/Gift of the Drowned Ones", 4007005],
      ["Template:Data Vladimir/Crimson Pact", 4073468],
      ["Template:Rune data Legend: Bloodline", 3971359],
      ["Assist", 4016680],
      ["Heal and shield power", 4021804],
      ["Template:Rune data Triumph", 3825924],
      ["Triumph", 3980916],
      ["Template:Healing modifiers", 4021803],
      ["Ability resource", 4093317],
      ["Cast time", 4090549],
      ["Death", 4051174],
      ["Energy", 4073066],
      ["Mana", 4073064],
      ["Mana regeneration", 4073055],
      ["Presence of Mind", 4062635],
      ["Range type", 4089646],
      ["Rune", 4091810],
      ["Template:Data Akali/Twilight Shroud", 4007406],
      ["Template:Data Ryze/Arcane Mastery", 4059875],
      ["Template:Range difference", 4060743],
      ["Template:Rune data Presence of Mind", 3985219],
      ["Template:Tip data/Resurrection", 4060644],
      ["Template:Tip data/Zombie state", 4060726],
      ["Template:Zombie state info", 3905023],
      ["Adaptive force", 4063874],
      ["Attack effects", 4084301],
      ["Basic attack", 4091314],
      ["Combat status", 4058480],
      ["Press the Attack", 4082445],
      ["Stack", 4093072],
      ["Template:Rune data Press the Attack", 4015574],
      ["Template:Tip data/Adaptive damage", 4015091],
      ["Attack effects/Abilities", 4003212],
      ["Blink", 4047228],
      ["Dash", 4091669],
      ["Fleet Footwork", 4052588],
      ["Movement speed", 4064468],
      ["Named item effect", 4045631],
      ["Template:Energized info", 4064669],
      ["Template:Rune data Fleet Footwork", 4051351],
      ["Template:Tip data/Energized", 4013385],
      ["Lethal Tempo", 4060427],
      ["Template:Rune data Lethal Tempo", 4065934],
      ["Conqueror", 4091967],
      ["Template:Rune data Conqueror", 4060685],
      ["Cast instance", 4069908],
      ["Template:Tip data/Cast instance", 4069909],
      ["Template:Data Kayle/Divine Ascent", 4051190],
      ["Template:Data Garen/Judgment", 4009435],
      ["Template:Data Wukong/Cyclone", 4021867],
      ["Template:Data Mordekaiser/Darkness Rise", 4070051],
      ["Template:Rune data Grasp of the Undying", 4058228],
      ["Grasp of the Undying", 4052352],
      ["Template:Data Azir/Arise!", 4044339],
      ["Template:Data Gangplank/Parrrley", 4063653],
      ["Template:Data Urgot/Purge", 4058781],
      ["Template:Rune data Bone Plating", 3985159],
      ["Bone Plating", 4072632],
      ["Template:Data Braum/Unbreakable", 4012056],
      ["Template:Data Kled/Violent Tendencies", 4072987],
      ["Template:Rune data Shield Bash", 4044093],
      ["Shield Bash", 4015237],
      ["Shield", 4021810],
      ["Template:Data Hwei/Pool of Reflection", 3992645],
      ["Template:Data Kled/Chaaaaaaaarge!!!", 4070347],
      ["Template:Data Nunu/Absolute Zero", 4088349],
      ["Template:Data Mordekaiser/Indestructible", 4016354],
      ["Template:Data Camille/Adaptive Defenses", 4051341],
      ["Template:Rune data Overgrowth", 3825902],
      ["Overgrowth", 4002405],
      ["Template:Rune data Aftershock", 4022990],
      ["Aftershock", 4023199],
      ["Template:Tip data/Immobilize", 4060567],
      ["Armor", 4073057],
      ["Magic resistance", 4073058],
      ["Range", 4058499],
      ["Spell shield", 3981674],
      ["Template:Rune data Font of Life", 3996429],
      ["Font of Life", 4015111],
      ["Template:Tip data/Slow", 4060507],
      ["Template:Tip data/Drowsy", 3308207],
      ["Template:Rune data Taste of Blood", 3997097],
      ["Taste of Blood", 3997098],
      ["Template:Rune data Scorch", 3985169],
      ["Scorch", 4024859],
      ["Template:Tip data/Ability damage", 4060550],
      ["Template:Data Bel'Veth/Royal Maelstrom", 4046605],
    ]);
    expect(sha(JSON.stringify(originalBundle.pages.slice(0, 42))))
      .toBe("e226a7cfeb994f2c09911fc2c6bbf812a86b9267bf1f854e9abbe4efaeec4274");
    expect(sha(JSON.stringify(originalBundle.pages.slice(0, 47))))
      .toBe("30b2308ee9059b00f8effc7cd4c850248affa93142c16aa0f7779d773c8cbac1");
    expect(sha(JSON.stringify(originalBundle.pages.slice(0, 63))))
      .toBe("7aabdf6a53e50da3ad8f3003c3aa57d396bdaeaa97e5d9437999898dcb34d876");
    expect(sha(JSON.stringify(originalBundle.pages.slice(0, 71))))
      .toBe("3815191530203e108b4426841a4fb59c476e14be9430dd6907dae104a266c449");
    expect(sha(JSON.stringify(originalBundle.pages.slice(0, 82))))
      .toBe("3709677749ded83a50d8ac439cb7415780319a6e86536dc8bd971b4a0d8f2862");
    expect(sha(JSON.stringify(originalBundle.pages.slice(0, 90))))
      .toBe("2fcb83a6bd54cf8eda8cd749fd23adb0ec7e09142df8c7b06b7cd22a48f893a0");
    expect(sha(JSON.stringify(originalBundle.pages.slice(0, 95))))
      .toBe("69c3c557408546429863411d73de7e3fa9e5dcd72d7e755e78ecc871ccbeab84");
    expect(sha(JSON.stringify(originalBundle.pages.slice(0, 99))))
      .toBe("17b7fb33bf7812b6fed4ce84ee79a6d3c5bbe59f01886eae7ae178afdc0493ea");
    expect(sha(JSON.stringify(originalBundle.pages.slice(0, 107))))
      .toBe("2c98468d3c43ce964d4b945aec065113013dca0f53e8b442ac2fb9962c867b9c");
    expect(sha(JSON.stringify(originalBundle.pages.slice(0, 109))))
      .toBe("157c9b00d6015d90427e1085d41feedfd57f5a2bd3c1a01103da253dbf6811ba");
    expect(sha(JSON.stringify(originalBundle.pages.slice(0, 116))))
      .toBe("8db8a8516ebe5fcdcde2a0ed85682ab71466d669dbe4fdf9b22946510e1f6bf6");
    expect(sha(JSON.stringify(originalBundle.pages.slice(0, 120))))
      .toBe("afe95d44eaf5772c153a3178a2d0f5e892f03682bdcd35932e090c64675ff9a2");
    expect(sha(JSON.stringify(originalBundle.pages.slice(0, 122))))
      .toBe("afb0e71133960857e7600c8ecb4a11053aae234aeed74b05a1f83919330b25fa");
    for (const page of originalBundle.pages) expect(sha(page.content)).toBe(page.sha256);
    expect(originalGame.length).toBeGreaterThan(2_000_000);
    expect(Object.keys(JSON.parse(originalGame) as object)).toHaveLength(335);
    expect(originalBundle.gameData).toEqual({ url: COMBAT_RUNE_GAME_URL, sha256: sha(originalGame) });
    expect(sha(originalGame)).toBe("f0212502bb1180c0920a1be7074af8de2e6d4cefe3fc51f2a0ca9e08116a2c9f");
    const evidence = build().evidence;
    expect(new Set(evidence.map((entry) => entry.title)).size).toBe(126);
    for (const excerpt of evidence) {
      const source = originalBundle.pages.find((page) => page.title === excerpt.title)!;
      expect(excerpt.revid).toBe(source.revid);
      expect(source.content).toContain(excerpt.text);
    }
    expect(new Set(evidence.map((entry) => JSON.stringify(entry))).size).toBe(evidence.length);
  });

  it("uses Conqueror's exact level-20 adaptive growth, cooldown and form healing rates", () => {
    expect(build().conqueror).toMatchObject({
      modelLevel: 20, maxStacks: 12, stackDuration: 5, castCooldown: 4,
      meleeBasicStacks: 2, rangedBasicStacks: 1, spellStacks: 2,
      adaptiveADRatio: 0.6, adaptiveAPRatio: 1, meleeHealingRatio: 0.08, rangedHealingRatio: 0.05,
    });
    expect(build().conqueror.adaptiveForcePerStack).toBeCloseTo(362 / 85, 13);
  });

  it("checks both Conqueror's client coefficients and the whole perk", () => {
    const numeric = fixture();
    editGame(numeric, records => { records[conquerorPath]!.mScript.mSpellScriptData.mEffectAmount.BuffDuration = 6; });
    expect(() => build(numeric)).toThrow(/Conqueror Wiki\/game BuffDuration disagree/);
    const metadata = fixture();
    editGame(metadata, records => { records[conquerorPath]!.mPerkName = "Unreviewed Conqueror"; });
    expect(() => build(metadata)).toThrow(/Conqueror complete client perk changed/);
  });

  it("uses Absorb Life's explicit level-20 piecewise calculation rather than its level-18 tooltip endpoint", () => {
    const game = JSON.parse(originalGame) as Game;
    const perk = game[gamePaths[4]]!.mScript.mSpellScriptData;
    expect(perk.mEffectAmount.TooltipMaxHeal).toBe(23);
    expect(perk.mCalculations!.HealAmount.mFormulaParts).toEqual([{
      mLevel1Value: 1, mInitialBonusPerLevel: 0.25,
      mBreakpoints: [
        { mLevel: 6, mBonusPerLevelAtAndAfter: 1, __type: "Breakpoint" },
        { mLevel: 11, mBonusPerLevelAtAndAfter: 2, __type: "Breakpoint" },
      ], __type: "ByCharLevelBreakpointsCalculationPart",
    }]);
    expect(build().absorbLife.heal).toBe(1 + 4 * 0.25 + 5 + 10 * 2);
    const evidence = build().evidence.map((entry) => entry.text).join("\n");
    expect(evidence).toContain("1 to 20 by 1");
    expect(evidence).toContain("reducing their health to zero does <u>not</u> count as a kill");
    expect(evidence).toContain("[[Ward]] kills");
    expect(evidence).toContain("* {{tip|Ward}}");
    expect(evidence).toContain("'''Healing''' cannot increase a unit's current health over its maximum");
  });

  it("reads Alacrity's declared stack rules without inventing names for opaque client values", () => {
    const game = JSON.parse(originalGame) as Game;
    const amounts = game[gamePaths[5]]!.mScript.mSpellScriptData.mEffectAmount;
    expect(amounts).toMatchObject({
      AttackSpeedBase: Math.fround(0.03), AttackSpeedPerStack: Math.fround(0.015), MaxLegendStacks: 10,
      LargeMonsterKillValue: 25, MinionKillValue: 4,
      "{3e1fdd4a}": 100, "{8fb410e2}": 100, "{f6570baa}": 100,
    });
    expect(amounts).not.toHaveProperty("ChampionKillValue");
    expect(amounts).not.toHaveProperty("PointsPerStack");
    const rules = build().legendAlacrity;
    expect(rules).toEqual({ baseAttackSpeed: 0.03, attackSpeedPerStack: 0.015,
      pointsPerStack: 100, maxStacks: 10, championKillPoints: 100 });
    expect(rules.baseAttackSpeed + rules.attackSpeedPerStack * rules.maxStacks).toBeCloseTo(0.18, 15);
    const evidence = build().evidence.map((entry) => entry.text).join("\n");
    expect(evidence).toContain("100 points for champion {{tip|takedown|takedowns}}");
    expect(evidence).toContain("100+25 stacks instead of the correct 100");
    expect(evidence).toContain("either a [[kill]] or an [[assist]] is acceptable");
    expect(evidence).toContain("most non-{{tip|takedown}} effects");
    expect(evidence).toContain("are attributed to their owner");
    expect(evidence).toContain("{{Outdated|Last updated: [[V14.22]]");
  });

  it("reads Haste's basic-only rule and named zero base without promoting legacy Tenacity", () => {
    const amounts = (JSON.parse(originalGame) as Game)[gamePaths[6]]!.mScript.mSpellScriptData.mEffectAmount;
    expect(amounts).toMatchObject({ HasteBase: 0, HastePerStack: 1.5, MaxLegendStacks: 10,
      LargeMonsterKillValue: 25, MinionKillValue: 4,
      "{3e1fdd4a}": 100, "{8fb410e2}": 100, "{f6570baa}": 100 });
    expect(amounts).not.toHaveProperty("ChampionKillValue");
    expect(amounts).not.toHaveProperty("PointsPerStack");
    expect(build().legendHaste).toEqual({ baseHaste: 0, hastePerStack: 1.5,
      pointsPerStack: 100, maxStacks: 10, championKillPoints: 100 });
    const rule = build().legendHaste;
    expect(rule.baseHaste + rule.hastePerStack * rule.maxStacks).toBe(15);
    const catalog = originalCatalog.runes.find((rune) => rune.id === 9105)!;
    expect(catalog.name).toBe("Legend: Haste");
    expect(catalog.pathId).toBe(8000); expect(catalog.slot).toBe(2);
    expect(catalog.wiki.content).toContain("basic ability haste");
  });

  it("retains the full cooldown-classification evidence, cap, and source-specific Udyr exceptions", () => {
    const evidence = build().evidence.map((entry) => entry.text).join("\n");
    expect(evidence).toContain("It stacks additively with ability haste");
    expect(evidence).toContain("total haste''' is capped at '''500'''");
    expect(evidence).toContain("does not affect static cooldowns nor target immunity cooldowns, unless otherwise stated");
    expect(evidence).toContain("Recharge'' is not technically a cooldown");
    expect(evidence).toContain("'''current''' cooldown");
    expect(evidence).toContain("{{sbc|Pseudo-Ultimate}}");
    expect(evidence).toContain("* {{cai|Wingborne Storm|Udyr}}");
    expect(evidence).toContain("has no {{tip|ability|ultimate ability}} and instead has 4 {{tip|ability|basic abilities}}");
    expect(evidence).toContain("Unaffected by ability haste, but affected by ultimate haste");
    expect(evidence).toContain("Axiom Arc");
    expect(evidence).toContain("Last updated:''' April 19th, 2026, patch [[V26.08]]");
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
    expect(() => build(missing)).toThrow(/all 126 complete/);
    const duplicate = fixture(); duplicate.bundle.pages[1] = structuredClone(duplicate.bundle.pages[0]!);
    expect(() => build(duplicate)).toThrow(/duplicate Wiki source/);
    const extra = fixture(); extra.bundle.pages.push(structuredClone(extra.bundle.pages[0]!));
    expect(() => build(extra)).toThrow(/all 126 complete/);
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
    const retained = new Set([...gamePaths, ...fleetClientPaths, tempoPath, ...tempoBolts, conquerorPath,
      triumphMissilePath, presenceMissilePath, graspPath, graspHealMissile, bonePath, shieldBashPath, overgrowthPath, aftershockPath, fontPath, tastePath, scorchPath]);
    editGame(game, (records) => {
      for (const key of Object.keys(records)) if (!retained.has(key)) delete records[key];
    });
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

describe("Haste source identity and numeric semantics", () => {
  it.each(["HasteBase", "HastePerStack", "MaxLegendStacks", "LargeMonsterKillValue", "MinionKillValue"])
  ("cross-checks Haste's named client %s", (key) => {
    const input = fixture(); editGame(input, (game) => { game[gamePaths[6]]!.mScript.mSpellScriptData.mEffectAmount[key]! += 1; });
    expect(() => build(input)).toThrow(new RegExp(`Legend: Haste Wiki/game ${key} disagree`));
  });

  it.each(["{3e1fdd4a}", "{8fb410e2}", "{f6570baa}"])
  ("keeps opaque Haste field %s sealed as complete bytes", (key) => {
    const input = fixture(); editGame(input, (game) => { game[gamePaths[6]]!.mScript.mSpellScriptData.mEffectAmount[key] = 200; });
    expect(() => build(input)).toThrow(/complete reviewed game source changed/);
  });

  it("requires basic ability haste rather than interpreting a legacy or ultimate-only effect", () => {
    const input = fixture(); editDescription(input, "Legend: Haste", "basic ability haste", "ultimate haste");
    expect(() => build(input)).toThrow(/Legend: Haste reviewed formula changed/);
    const named = fixture(); named.catalog.runes.find((rune) => rune.id === 9105)!.name = "Legend: Tenacity";
    expect(() => build(named)).toThrow(/Legend: Haste catalog identity or position differs/);
  });

  it("cross-checks per-stack haste and requires its explicit maximum to agree", () => {
    const max = fixture(); editDescription(max, "Legend: Haste", "{{as|15|ability haste}}", "{{as|16|ability haste}}");
    expect(() => build(max)).toThrow(/maximum haste and stack descriptions disagree/);
    const per = fixture(); editDescription(per, "Legend: Haste", "{{fd|1.5}}", "{{fd|2}}");
    editDescription(per, "Legend: Haste", "{{as|15|ability haste}}", "{{as|20|ability haste}}");
    expect(() => build(per)).toThrow(/Legend: Haste Wiki\/game HastePerStack disagree/);
    const stacks = fixture(); editWiki(stacks, "Template:Rune data Legend: Haste", (text) =>
      text.replace("up to 10:", "up to 11:").replace("{{as|15|ability haste}}", "{{as|16.5|ability haste}}"));
    expect(() => build(stacks)).toThrow(/Legend: Haste Wiki\/game MaxLegendStacks disagree/);
  });

  it.each([
    ["every 100 points earned", "every 200 points earned"],
    ["* 100 points for champion", "* 200 points for champion"],
    ["* 100 points for epic monster", "* 200 points for epic monster"],
  ])("keeps exact Haste Wiki-only point semantics for %s", (old, next) => {
    const input = fixture(); editWiki(input, "Template:Rune data Legend: Haste", (text) => text.replace(old, next));
    expect(() => build(input)).toThrow(/Template:Rune data Legend: Haste full reviewed revision changed/);
  });

  it.each([
    ["* 25 points for large monster kills", "* 26 points for large monster kills", "LargeMonsterKillValue"],
    ["* 4 points for minion kills", "* 5 points for minion kills", "MinionKillValue"],
  ])("cross-checks Haste's named reward %s", (old, next, field) => {
    const input = fixture(); editWiki(input, "Template:Rune data Legend: Haste", (text) => text.replace(old, next));
    expect(() => build(input)).toThrow(new RegExp(`Legend: Haste Wiki/game ${field} disagree`));
  });

  it("rejects missing, duplicate, fractional and nonpositive Haste progression rules", () => {
    const missing = fixture(); editWiki(missing, "Template:Rune data Legend: Haste", (text) => text.replace("|description2", "|historical2"));
    expect(() => build(missing)).toThrow(/complete current point description/);
    const duplicate = fixture(); editWiki(duplicate, "Template:Rune data Legend: Haste", (text) =>
      text + "\n" + text.split("\n").find((line) => /^\|description2\s*=/.test(line))!);
    expect(() => build(duplicate)).toThrow(/complete current point description/);
    const reward = fixture(); editWiki(reward, "Template:Rune data Legend: Haste", (text) => text + "\n* 100 points for champion {{tip|takedown|takedowns}}");
    expect(() => build(reward)).toThrow(/current champion point rule/);
    const fraction = fixture(); editWiki(fraction, "Template:Rune data Legend: Haste", (text) => text.replace("every 100 points", "every 100.5 points"));
    expect(() => build(fraction)).toThrow(/Legend: Haste points reviewed formula changed/);
    const zero = fixture(); editWiki(zero, "Template:Rune data Legend: Haste", (text) => text.replace("every 100 points", "every 0 points"));
    expect(() => build(zero)).toThrow(/positive safe integer point and stack rules/);
  });

  it("checks Haste's actual client identity, object, script and amount presence", () => {
    const missing = fixture(); editGame(missing, (game) => { delete game[gamePaths[6]]; });
    expect(() => build(missing)).toThrow(/Legend: Haste game perk must be an object/);
    const id = fixture(); editGame(id, (game) => { game[gamePaths[6]]!.mPerkId = 9103; });
    expect(() => build(id)).toThrow(/Legend: Haste game ID differs/);
    const amounts = fixture(); editGame(amounts, (game) => {
      delete (game[gamePaths[6]]!.mScript.mSpellScriptData as Partial<GamePerk["mScript"]["mSpellScriptData"]>).mEffectAmount;
    });
    expect(() => build(amounts)).toThrow(/Legend: Haste game amounts must be an object/);
  });

  it.each(["Legend: Haste", "Haste", "Cooldown", "Champion ability", "Haste/Reducing ability cooldowns", "Template:Data Udyr/Bridge Between", "Template:Data Udyr/Wingborne Storm", "Udyr"])
  ("requires complete current source %s rather than a favorable evidence excerpt", (title) => {
    const input = fixture(); const snippets = build().evidence.filter((entry) => entry.title === title).map((entry) => entry.text).join("\n");
    editWiki(input, title, () => snippets);
    expect(() => build(input)).toThrow(new RegExp(`${title} full reviewed revision changed`));
  });

  it("retains the source cap and specific Awaken exception without rewriting either as basic haste", () => {
    const cap = fixture(); editWiki(cap, "Haste", (text) => text.replace("total haste''' is capped at '''500'''", "total haste''' is uncapped"));
    expect(() => build(cap)).toThrow(/Haste reviewed rule changed/);
    const awaken = fixture(); editWiki(awaken, "Template:Data Udyr/Bridge Between", (text) =>
      text.replace("Unaffected by ability haste, but affected by ultimate haste", "Affected by basic ability haste"));
    expect(() => build(awaken)).toThrow(/Bridge Between reviewed rule changed/);
  });

  it("rejects jointly re-pinned Haste source and client formula changes", () => {
    const input = fixture(); editDescription(input, "Legend: Haste", "{{fd|1.5}}", "{{fd|2}}");
    editDescription(input, "Legend: Haste", "{{as|15|ability haste}}", "{{as|20|ability haste}}");
    editGame(input, (game) => { game[gamePaths[6]]!.mScript.mSpellScriptData.mEffectAmount.HastePerStack = 2; });
    expect(() => build(input)).toThrow(/Template:Rune data Legend: Haste full reviewed revision changed/);
  });
});

describe("re-pinned semantic changes", () => {
  it.each([
    ["basealacrity|3", "basealacrity|4", "AttackSpeedBase"],
    ["scalingalacrity|1.5", "scalingalacrity|2", "AttackSpeedPerStack"],
  ])("cross-checks Alacrity's current Wiki %s against the named client field", (old, next, field) => {
    const input = fixture(); editDescription(input, "Legend: Alacrity", old, next);
    expect(() => build(input)).toThrow(new RegExp(`Legend: Alacrity Wiki/game ${field} disagree`));
  });

  it("requires Alacrity's two current maximum-stack descriptions to agree", () => {
    const input = fixture(); editDescription(input, "Legend: Alacrity", "*10}}", "*11}}");
    expect(() => build(input)).toThrow(/maximum stack descriptions disagree/);
    const client = fixture(); editWiki(client, "Template:Rune data Legend: Alacrity", (text) =>
      text.replace("*10}}", "*11}}").replace("up to 10:", "up to 11:"));
    expect(() => build(client)).toThrow(/MaxLegendStacks disagree/);
  });

  it.each([
    ["* 25 points for large monster kills", "* 26 points for large monster kills", "LargeMonsterKillValue"],
    ["* 4 points for minion kills", "* 5 points for minion kills", "MinionKillValue"],
  ])("cross-checks the retained Alacrity point rule %s", (old, next, field) => {
    const input = fixture(); editWiki(input, "Template:Rune data Legend: Alacrity", (text) => text.replace(old, next));
    expect(() => build(input)).toThrow(new RegExp(`Legend: Alacrity Wiki/game ${field} disagree`));
  });

  it.each([
    ["every 100 points earned", "every 200 points earned"],
    ["* 100 points for champion", "* 200 points for champion"],
    ["* 100 points for epic monster", "* 200 points for epic monster"],
  ])("retains exact Wiki-only point semantics for %s without labeling opaque client keys", (old, next) => {
    const input = fixture(); editWiki(input, "Template:Rune data Legend: Alacrity", (text) => text.replace(old, next));
    expect(() => build(input)).toThrow(/Template:Rune data Legend: Alacrity full reviewed revision changed/);
  });

  it("rejects missing, duplicate, fractional and nonpositive Alacrity progression rules", () => {
    const missing = fixture(); editWiki(missing, "Template:Rune data Legend: Alacrity", (text) => text.replace("|description2", "|historical2"));
    expect(() => build(missing)).toThrow(/complete current point description/);
    const duplicate = fixture(); editWiki(duplicate, "Template:Rune data Legend: Alacrity", (text) =>
      text + "\n" + text.split("\n").find((line) => /^\|description2\s*=/.test(line))!);
    expect(() => build(duplicate)).toThrow(/complete current point description/);
    const reward = fixture(); editWiki(reward, "Template:Rune data Legend: Alacrity", (text) =>
      text + "\n* 100 points for champion {{tip|takedown|takedowns}}");
    expect(() => build(reward)).toThrow(/current champion point rule/);
    const fraction = fixture(); editWiki(fraction, "Template:Rune data Legend: Alacrity", (text) => text.replace("every 100 points", "every 100.5 points"));
    expect(() => build(fraction)).toThrow(/Legend: Alacrity points reviewed formula changed/);
    const zero = fixture(); editWiki(zero, "Template:Rune data Legend: Alacrity", (text) => text.replace("every 100 points", "every 0 points"));
    expect(() => build(zero)).toThrow(/positive safe integer point and stack rules/);
  });

  it.each(["AttackSpeedBase", "AttackSpeedPerStack", "MaxLegendStacks", "LargeMonsterKillValue", "MinionKillValue"])
  ("cross-checks Alacrity's named client %s", (key) => {
    const input = fixture(); editGame(input, (game) => { game[gamePaths[5]]!.mScript.mSpellScriptData.mEffectAmount[key]! += 1; });
    expect(() => build(input)).toThrow(new RegExp(`Legend: Alacrity Wiki/game ${key} disagree`));
  });

  it.each(["{3e1fdd4a}", "{8fb410e2}", "{f6570baa}"])
  ("keeps opaque Alacrity field %s sealed as complete client bytes", (key) => {
    const input = fixture(); editGame(input, (game) => { game[gamePaths[5]]!.mScript.mSpellScriptData.mEffectAmount[key] = 200; });
    expect(() => build(input)).toThrow(/complete reviewed game source changed/);
  });

  it("checks Alacrity's client identity and rejects missing script amounts", () => {
    const id = fixture(); editGame(id, (game) => { game[gamePaths[5]]!.mPerkId = 9103; });
    expect(() => build(id)).toThrow(/Legend: Alacrity game ID differs/);
    const amounts = fixture(); editGame(amounts, (game) => {
      delete (game[gamePaths[5]]!.mScript.mSpellScriptData as Partial<GamePerk["mScript"]["mSpellScriptData"]>).mEffectAmount;
    });
    expect(() => build(amounts)).toThrow(/Legend: Alacrity game amounts must be an object/);
  });

  it.each([
    ["Champion summoned units", "most non-{{tip|takedown}} effects", "most {{tip|takedown}} effects"],
    ["Champion summoned units", "are attributed to their owner.", "are attributed to the clone."],
    ["Takedown", "either a [[kill]] or an [[assist]] is acceptable", "only a [[kill]] is acceptable"],
    ["Legend: Alacrity", "100+25 stacks instead of the correct 100", "125 stacks instead of the correct 100"],
  ])("requires the retained progression/clone evidence from %s", (title, old, next) => {
    const input = fixture(); editWiki(input, title, (text) => text.replace(old, next));
    expect(() => build(input)).toThrow(new RegExp(`${title} reviewed rule changed`));
  });

  it.each(["Legend: Alacrity", "Takedown", "Champion summoned units"])
  ("rejects progression source excerpts in place of the complete %s revision", (title) => {
    const input = fixture();
    const excerpts = build().evidence.filter((entry) => entry.title === title).map((entry) => entry.text).join("\n");
    editWiki(input, title, () => excerpts);
    expect(() => build(input)).toThrow(new RegExp(`${title} full reviewed revision changed`));
  });

  it("rejects jointly re-pinned Alacrity Wiki and named client values", () => {
    const input = fixture(); editDescription(input, "Legend: Alacrity", "basealacrity|3", "basealacrity|4");
    editGame(input, (game) => { game[gamePaths[5]]!.mScript.mSpellScriptData.mEffectAmount.AttackSpeedBase = Math.fround(0.04); });
    expect(() => build(input)).toThrow(/Template:Rune data Legend: Alacrity full reviewed revision changed/);
  });

  it.each([
    ["1; then", "2; then", "mLevel1Value"],
    ["+0.25*x", "+0.5*x", "mInitialBonusPerLevel"],
    ["for 4;", "for 3;", "first breakpoint Wiki/game mLevel"],
    ["+1*x", "+1.5*x", "first breakpoint Wiki/game mBonusPerLevelAtAndAfter"],
    ["for 5;", "for 4;", "second breakpoint Wiki/game mLevel"],
    ["+2*x", "+3*x", "second breakpoint Wiki/game mBonusPerLevelAtAndAfter"],
  ])("cross-checks Absorb Life's changed piecewise term %s against client breakpoints", (old, next, field) => {
    const input = fixture(); editDescription(input, "Absorb Life", old, next);
    expect(() => build(input)).toThrow(new RegExp(`${field} disagree`));
  });

  it("requires an explicit level-20 domain rather than extrapolating a level-18 description", () => {
    const input = fixture(); editDescription(input, "Absorb Life", "1 to 20 by 1", "1 to 18 by 1");
    expect(() => build(input)).toThrow(/explicit level-20 formula/);
  });

  it.each(["mLevel1Value", "mInitialBonusPerLevel"] as const)("cross-checks Absorb Life client %s", (key) => {
    const input = fixture(); editGame(input, (game) => {
      game[gamePaths[4]]!.mScript.mSpellScriptData.mCalculations!.HealAmount.mFormulaParts[0]![key] += 1;
    });
    expect(() => build(input)).toThrow(new RegExp(`Absorb Life Wiki/game ${key} disagree`));
  });

  it.each([0, 1])("cross-checks Absorb Life client breakpoint %s levels and rates", (index) => {
    for (const key of ["mLevel", "mBonusPerLevelAtAndAfter"] as const) {
      const input = fixture(); editGame(input, (game) => {
        game[gamePaths[4]]!.mScript.mSpellScriptData.mCalculations!.HealAmount.mFormulaParts[0]!.mBreakpoints[index]![key] += 1;
      });
      expect(() => build(input)).toThrow(new RegExp(`breakpoint Wiki/game ${key} disagree`));
    }
  });

  it("rejects missing, duplicate and unreviewed Absorb Life calculation structures", () => {
    const missing = fixture(); editGame(missing, (game) => {
      delete game[gamePaths[4]]!.mScript.mSpellScriptData.mCalculations;
    });
    expect(() => build(missing)).toThrow(/Absorb Life game calculations must be an object/);
    const calculation = fixture(); editGame(calculation, (game) => {
      game[gamePaths[4]]!.mScript.mSpellScriptData.mCalculations!.HealAmount.__type = "UnreviewedCalculation";
    });
    expect(() => build(calculation)).toThrow(/exactly one reviewed HealAmount/);
    for (const count of [0, 2]) {
      const parts = fixture(); editGame(parts, (game) => {
        const calculation = game[gamePaths[4]]!.mScript.mSpellScriptData.mCalculations!.HealAmount;
        calculation.mFormulaParts = Array.from({ length: count }, () => structuredClone(calculation.mFormulaParts[0]!));
      });
      expect(() => build(parts)).toThrow(/exactly one reviewed HealAmount/);
    }
    const part = fixture(); editGame(part, (game) => {
      game[gamePaths[4]]!.mScript.mSpellScriptData.mCalculations!.HealAmount.mFormulaParts[0]!.__type = "ByCharLevelInterpolationCalculationPart";
    });
    expect(() => build(part)).toThrow(/reviewed character-level breakpoint/);
    const breakpoints = fixture(); editGame(breakpoints, (game) => {
      game[gamePaths[4]]!.mScript.mSpellScriptData.mCalculations!.HealAmount.mFormulaParts[0]!.mBreakpoints.pop();
    });
    expect(() => build(breakpoints)).toThrow(/reviewed character-level breakpoint/);
    const breakpointType = fixture(); editGame(breakpointType, (game) => {
      game[gamePaths[4]]!.mScript.mSpellScriptData.mCalculations!.HealAmount.mFormulaParts[0]!.mBreakpoints[0]!.__type = "UnreviewedBreakpoint";
    });
    expect(() => build(breakpointType)).toThrow(/reviewed level breakpoint types/);
  });

  it("retains the complete client source even for the unused level-18 Absorb Life display endpoint", () => {
    const input = fixture(); editGame(input, (game) => {
      game[gamePaths[4]]!.mScript.mSpellScriptData.mEffectAmount.TooltipMaxHeal = 27;
    });
    expect(() => build(input)).toThrow(/complete reviewed game source changed/);
  });

  it("checks Absorb Life's kill eligibility evidence rather than silently narrowing it to champions", () => {
    const kill = fixture(); editWiki(kill, "Kill", (text) => text.replace("A '''kill''' is the event of inflicting the final blow on an enemy unit", "A '''kill''' is the event of inflicting the final blow on an enemy champion"));
    expect(() => build(kill)).toThrow(/hostile-unit definition is required/);
    const wards = fixture(); editWiki(wards, "Unit", (text) => text.replace("* {{tip|Ward}}\n", ""));
    expect(() => build(wards)).toThrow(/Unit reviewed rule changed/);
    const healing = fixture(); editWiki(healing, "Healing", (text) => text.replace("'''Healing''' cannot increase a unit's current health over its maximum.", "Healing can exceed maximum health."));
    expect(() => build(healing)).toThrow(/Healing reviewed rule changed/);
  });

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


describe("Legend: Bloodline reviewed source contract", () => {
  it("converts percentage-valued client life steal once and awards health only at the fifteen-stack cap", () => {
    const rule = build().legendBloodline;
    expect(rule).toEqual({ baseLifeSteal: 0, lifeStealPerStack: 0.0045,
      pointsPerStack: 100, maxStacks: 15, championKillPoints: 100, bonusHealth: 85 });
    expect(rule.lifeStealPerStack * rule.maxStacks).toBeCloseTo(0.0675, 15);
    const amounts = (JSON.parse(originalGame) as Game)[gamePaths[7]]!.mScript.mSpellScriptData.mEffectAmount;
    expect(amounts).toMatchObject({ LifeStealBase: 0, LifeStealPerStack: Math.fround(0.45),
      MaxLegendStacks: 15, BonusHealth: 85, LargeMonsterKillValue: 25, MinionKillValue: 4,
      "{3e1fdd4a}": 100, "{8fb410e2}": 100, "{f6570baa}": 100 });
    expect(amounts).not.toHaveProperty("ChampionKillValue");
    expect(amounts).not.toHaveProperty("PointsPerStack");
    const rune = originalCatalog.runes.find((entry) => entry.id === 9103)!;
    expect([rune.name, rune.pathId, rune.slot]).toEqual(["Legend: Bloodline", 8000, 2]);
    expect(rune.wiki.revid).toBe(3971359);
    const evidence = build().evidence.map((entry) => entry.text).join("\n");
    expect(evidence).toContain("at maximum stacks, at which you also gain");
    expect(evidence).toContain("Life steal per stack increased to {{fd|0.45}}%");
    expect(evidence).toContain("Bonus health reduced to 85 from 100");
  });

  it("retains full life-steal eligibility and the direct-health/champion exceptions without treating blurb as the rule", () => {
    const evidence = build().evidence.map((entry) => entry.text).join("\n");
    for (const rule of [
      "Life steal does not benefit from", "stacks additively", "post-mitigation damage dealt",
      "regardless of subtype", "Some pets basic attacks", "{{cai|Riposte|Fiora}}",
      "An increase to the maximum health also affects current health by the same amount",
      "this is not considered a form of healing", "Units alive at 0 current health",
      "by 10% from all sources", "maximum of 5 upgrades", "per 14 '''bonus''' health",
      "These two bonuses do not stack with each other", "will not increase '''Vladimir's'''",
      "additional sources of health are applied", "even if he is '''DISMOUNTED'''",
      "The current status of '''Kled's''' own health is preserved",
      "By increases or decreases to maximum health", "By healing and health regeneration",
      "reset back to its original value", "health is still applied to his '''current''' health",
      "replenishes to full strength", "instantly granted upon learning the ability",
    ]) expect(evidence).toContain(rule);
    const allOut = build().evidence.filter((entry) => entry.title === "Template:Data K'Sante/All Out");
    expect(allOut.some((entry) => entry.text.startsWith("|description5"))).toBe(true);
    expect(allOut.some((entry) => entry.text.startsWith("|blurb"))).toBe(false);
  });

  it.each(["LifeStealBase", "LifeStealPerStack", "MaxLegendStacks", "BonusHealth", "LargeMonsterKillValue", "MinionKillValue"])(
    "rejects a changed named Bloodline client field %s before the full-byte guard", (field) => {
      const input = fixture(); editGame(input, (records) => {
        records[gamePaths[7]]!.mScript.mSpellScriptData.mEffectAmount[field]! += 1;
      });
      expect(() => build(input)).toThrow(new RegExp(`Legend: Bloodline Wiki/game ${field} disagree`));
    });

  it("requires the exact current client identity and complete named client object", () => {
    const absent = fixture(); editGame(absent, (records) => { delete records[gamePaths[7]]; });
    expect(() => build(absent)).toThrow(/Legend: Bloodline game perk must be an object/);
    const id = fixture(); editGame(id, (records) => { records[gamePaths[7]]!.mPerkId = 9104; });
    expect(() => build(id)).toThrow(/Legend: Bloodline game ID differs/);
    const name = fixture(); editGame(name, (records) => { records[gamePaths[7]]!.mPerkName = "LegendAlacrity"; });
    expect(() => build(name)).toThrow(/Legend: Bloodline game name or script path differs/);
    const script = fixture(); editGame(script, (records) => { records[gamePaths[7]]!.mScript.mSpellScriptName += ".changed"; });
    expect(() => build(script)).toThrow(/Legend: Bloodline game name or script path differs/);
  });

  it.each([
    ["scalingbloodline|0.45", "scalingbloodline|0.5", "LifeStealPerStack"],
    ["hpbloodline|85", "hpbloodline|100", "BonusHealth"],
    ["* 25 points for large monster kills", "* 26 points for large monster kills", "LargeMonsterKillValue"],
    ["* 4 points for minion kills", "* 5 points for minion kills", "MinionKillValue"],
  ])("cross-checks Bloodline's re-pinned %s against its named client value", (old, next, field) => {
    const input = fixture(); editWiki(input, "Template:Rune data Legend: Bloodline", (text) => text.replace(old, next));
    expect(() => build(input)).toThrow(new RegExp(`Legend: Bloodline Wiki/game ${field} disagree`));
  });

  it("requires both maximum-stack descriptions and the cap-only health clause", () => {
    const maximum = fixture(); editDescription(maximum, "Legend: Bloodline", "*15}}", "*14}}");
    expect(() => build(maximum)).toThrow(/Legend: Bloodline maximum stack descriptions disagree/);
    const clause = fixture(); editDescription(clause, "Legend: Bloodline", "at maximum stacks, at which", "at every stack, at which");
    expect(() => build(clause)).toThrow(/Legend: Bloodline reviewed formula changed/);
  });

  it("does not infer opaque reward/threshold meanings or accept malformed or duplicate point descriptions", () => {
    const opaque = fixture(); editGame(opaque, (records) => {
      records[gamePaths[7]]!.mScript.mSpellScriptData.mEffectAmount["{3e1fdd4a}"] = 200;
    });
    expect(() => build(opaque)).toThrow(/complete reviewed game source changed/);
    for (const [old, next] of [
      ["every 100 points", "every 100.5 points"], ["every 100 points", "every 0 points"],
    ]) {
      const input = fixture(); editWiki(input, "Template:Rune data Legend: Bloodline", (text) => text.replace(old!, next!));
      expect(() => build(input)).toThrow(/Legend: Bloodline points reviewed formula changed|positive safe integer/);
    }
    const duplicate = fixture(); editWiki(duplicate, "Template:Rune data Legend: Bloodline", (text) =>
      text + "\n* 100 points for champion {{tip|takedown|takedowns}}\n");
    expect(() => build(duplicate)).toThrow(/Legend: Bloodline needs its current champion point rule/);
    const noPoints = fixture(); editWiki(noPoints, "Template:Rune data Legend: Bloodline", (text) => text.replace("|description2", "|historical2"));
    expect(() => build(noPoints)).toThrow(/Legend: Bloodline needs its complete current point description/);
  });

  it.each(["Legend: Bloodline", "Life steal", "Health", "Template:Data Ornn/Living Forge", "Template:Data Pyke/Gift of the Drowned Ones",
    "Template:Data Vladimir/Crimson Pact", "Template:Data Kled/Skaarl the Cowardly Lizard", "Template:Data Kled/Dismounted Skaarl the Cowardly Lizard",
    "Template:Data K'Sante/All Out", "Template:Data Malphite/Granite Shield", "Template:Data Galio/Shield of Durand"])(
    "rejects excerpts-only replacements of the complete reviewed %s source", (title) => {
      const input = fixture();
      const excerpts = build().evidence.filter((entry) => entry.title === title).map((entry) => entry.text).join("\n");
      editWiki(input, title, () => excerpts);
      expect(() => build(input)).toThrow(new RegExp(`${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} full reviewed revision changed`));
    });
});

describe("Triumph reviewed source contract", () => {
  it("compiles the current maximum-plus-missing-health heal and retains the separate economic reward", () => {
    expect(build().triumph).toEqual({ maximumHealthRatio: 0.025, missingHealthRatio: 0.05,
      delay: 1, bonusGold: 20, missingHealthModel: "at-native-kill-credit" });
    const rule = build().triumph;
    expect(rule.maximumHealthRatio * 1000 + rule.missingHealthRatio * 800).toBe(65);
    const amounts = (JSON.parse(originalGame) as Game)[gamePaths[8]]!.mScript.mSpellScriptData.mEffectAmount;
    expect(amounts).toEqual({ MissingHealthRestored: Math.fround(0.05), BonusGold: 20,
      TriumphMaxHealthRestored: Math.fround(0.025) });
    const rune = originalCatalog.runes.find((entry) => entry.id === 9111)!;
    expect([rune.name, rune.pathId, rune.slot, rune.wiki.revid]).toEqual(["Triumph", 8000, 1, 3825924]);
  });

  it("retains takedown, snapshot, missile, stasis, assist and self-healing evidence without resolving their timing gaps", () => {
    const evidence = build().evidence.map((entry) => entry.text).join("\n");
    for (const text of [
      "against an enemy champion", "both after a 1-second delay", "{{g|20}}",
      "missing health at the moment the takedown happened", "all pending '''Triumph''' heals",
      "unblockable", "prevent both the bonus gold and healing", "properly granted to units in stasis",
      "An '''assist''' takes place when an ally has helped a teammate",
      "effectiveness of self and outgoing", "multiplicatively with other heal modifiers",
      "Self heals|Healing source is the user", "{{stil|Bonus health}}",
    ]) expect(evidence).toContain(text);
  });

  it.each([
    ["{{fd|2.5}}%", "{{fd|3}}%", "TriumphMaxHealthRestored"],
    ["(+ 5%", "(+ 6%", "MissingHealthRestored"],
    ["{{g|20}}", "{{g|21}}", "BonusGold"],
  ])("cross-checks the current Triumph Wiki %s against its named client amount", (old, next, field) => {
    const input = fixture(); editDescription(input, "Triumph", old, next);
    expect(() => build(input)).toThrow(new RegExp(`Triumph Wiki/game ${field} disagree`));
  });

  it.each(["TriumphMaxHealthRestored", "MissingHealthRestored", "BonusGold"])(
    "rejects missing, changed and nonfinite Triumph client %s", (field) => {
      for (const value of [undefined, -1, 0, Number.NaN, Number.POSITIVE_INFINITY, 99]) {
        const input = fixture(); editGame(input, (records) => {
          const amounts = records[gamePaths[8]]!.mScript.mSpellScriptData.mEffectAmount;
          if (value === undefined) delete amounts[field];
          else amounts[field] = value;
        });
        expect(() => build(input)).toThrow(new RegExp(`Triumph Wiki/game ${field} disagree`));
      }
    });

  it("requires a unique complete current description and both health components", () => {
    const missing = fixture(); editWiki(missing, "Template:Rune data Triumph", (text) => text.replace("|description  =", "|historical ="));
    expect(() => build(missing)).toThrow(/Triumph needs its complete current description/);
    const duplicate = fixture(); editWiki(duplicate, "Template:Rune data Triumph", (text) =>
      text + "\n" + text.split("\n").find((line) => /^\|description\s*=/.test(line))!);
    expect(() => build(duplicate)).toThrow(/Triumph needs its complete current description/);
    for (const [old, next] of [
      ["{{as|{{fd|2.5}}% of your '''maximum''' health}} ", ""],
      ["{{as|(+ 5% of your '''missing''' health)}}", ""],
      ["against an enemy champion", "against an enemy unit"],
    ]) {
      const input = fixture(); editDescription(input, "Triumph", old!, next!);
      expect(() => build(input)).toThrow(/Triumph reviewed formula changed/);
    }
  });

  it.each([
    ["{{fd|2.5}}%", "{{fd|0}}%"], ["{{fd|2.5}}%", "{{fd|-1}}%"],
    ["(+ 5%", "(+ 0%"], ["(+ 5%", "(+ NaN%"],
    ["{{g|20}}", "{{g|0}}"], ["{{g|20}}", "{{g|-1}}"],
    ["a 1-second delay", "a 0-second delay"], ["a 1-second delay", "a Infinity-second delay"],
    ["{{fd|2.5}}%", `{{fd|${"9".repeat(400)}}}%`],
  ])("rejects nonpositive or malformed Triumph Wiki amount %s", (old, next) => {
    const input = fixture(); editDescription(input, "Triumph", old, next);
    expect(() => build(input)).toThrow(/Triumph.*(?:formula|positive|finite|invalid|disagree)/);
  });

  it("requires the actual Triumph client identity, script and amount container", () => {
    const absent = fixture(); editGame(absent, (records) => { delete records[gamePaths[8]]; });
    expect(() => build(absent)).toThrow(/Triumph game perk must be an object/);
    const id = fixture(); editGame(id, (records) => { records[gamePaths[8]]!.mPerkId = 9101; });
    expect(() => build(id)).toThrow(/Triumph game ID differs/);
    const name = fixture(); editGame(name, (records) => { records[gamePaths[8]]!.mPerkName = "AbsorbLife"; });
    expect(() => build(name)).toThrow(/Triumph game name, type or script path differs/);
    const script = fixture(); editGame(script, (records) => { records[gamePaths[8]]!.mScript.mSpellScriptName += ".changed"; });
    expect(() => build(script)).toThrow(/Triumph game name, type or script path differs/);
    const type = fixture(); editGame(type, (records) => { records[gamePaths[8]]!.__type = "UnreviewedPerk"; });
    expect(() => build(type)).toThrow(/Triumph game name, type or script path differs/);
    const amounts = fixture(); editGame(amounts, (records) => {
      delete (records[gamePaths[8]]!.mScript.mSpellScriptData as Partial<GamePerk["mScript"]["mSpellScriptData"]>).mEffectAmount;
    });
    expect(() => build(amounts)).toThrow(/Triumph game amounts must be an object/);
  });

  it("corroborates one second with the fixed-time visual missile without treating it as executable server logic", () => {
    interface Missile {
      __type: string; objectPath: string; ObjectName: string; mScriptName: string;
      mSpell: { mMissileSpec: { movementComponent: { __type: string; mTravelTime: number } } };
    }
    const movement = (records: Game) =>
      (records[triumphMissilePath] as unknown as Missile).mSpell.mMissileSpec.movementComponent;
    expect(movement(JSON.parse(originalGame) as Game)).toMatchObject({ __type: "FixedTimeMovement", mTravelTime: 1 });
    const delay = fixture(); editDescription(delay, "Triumph", "a 1-second delay", "a 2-second delay");
    expect(() => build(delay)).toThrow(/Triumph.*(?:delay|travel|mTravelTime|disagree)/i);
    const missing = fixture(); editGame(missing, (records) => { delete records[triumphMissilePath]; });
    expect(() => build(missing)).toThrow(/Triumph.*missile.*object/i);
    for (const key of ["__type", "objectPath", "ObjectName", "mScriptName"] as const) {
      const identity = fixture(); editGame(identity, (records) => {
        (records[triumphMissilePath] as unknown as Missile)[key] += ".changed";
      });
      expect(() => build(identity)).toThrow(/Triumph visual missile identity differs/);
    }
    const type = fixture(); editGame(type, (records) => { movement(records).__type = "SpeedMovement"; });
    expect(() => build(type)).toThrow(/Triumph.*(?:fixed|movement|missile)/i);
    for (const value of [0, -1, 2, Number.NaN, Number.POSITIVE_INFINITY]) {
      const input = fixture(); editGame(input, (records) => { movement(records).mTravelTime = value; });
      expect(() => build(input)).toThrow(/Triumph.*(?:delay|travel|mTravelTime|disagree)/i);
    }
  });

  it("rejects ARAM replacement values and jointly re-pinned Wiki/client formulas", () => {
    const aram = fixture(); editGame(aram, (records) => {
      records[gamePaths[8]]!.mScript.mSpellScriptData.mEffectAmount = {
        MissingHealthRestored: Math.fround(0.03), BonusGold: 10, TriumphMaxHealthRestored: Math.fround(0.015),
      };
    });
    expect(() => build(aram)).toThrow(/Triumph Wiki\/game .* disagree/);
    const jointlyChanged = fixture(); editDescription(jointlyChanged, "Triumph", "{{fd|2.5}}%", "{{fd|3}}%");
    editGame(jointlyChanged, (records) => {
      records[gamePaths[8]]!.mScript.mSpellScriptData.mEffectAmount.TriumphMaxHealthRestored = Math.fround(0.03);
    });
    expect(() => build(jointlyChanged)).toThrow(/Template:Rune data Triumph full reviewed revision changed/);
  });

  it.each(triumphSources)("requires the complete pinned %s revision rather than retained excerpts", (title) => {
    const input = fixture();
    const excerpts = build().evidence.filter((entry) => entry.title === title).map((entry) => entry.text).join("\n");
    editWiki(input, title, () => excerpts);
    expect(() => build(input)).toThrow(new RegExp(`${title} full reviewed revision changed`));
  });

  it("binds the missing-health snapshot evidence and preserves unrelated full client bytes", () => {
    const snapshot = fixture(); editWiki(snapshot, "Triumph", (text) =>
      text.replace("missing health at the moment the takedown happened", "missing health at the moment the missile arrives"));
    expect(() => build(snapshot)).toThrow(/Triumph reviewed rule changed/);
    const mode = fixture(); editGame(mode, (records) => {
      const data = records[gamePaths[8]]!.mScript.mSpellScriptData as unknown as {
        mEffectAmountGameMode: { ARAM: { mEffectAmountPerMode: Record<string, number> } };
      };
      data.mEffectAmountGameMode.ARAM.mEffectAmountPerMode.BonusGold = 20;
    });
    expect(() => build(mode)).toThrow(/complete reviewed game source changed/);
  });
});

describe("Fleet Footwork source rules and simulation choices", () => {
  it("evaluates the level-20 stat growth curve and keeps charge, heal and speed rules independent", () => {
    const rule = build().fleetFootwork;
    expect(rule).toEqual({
      modelLevel: 20, healBase: 124257 / 680, bonusADRatio: 0.1, apRatio: 0.05,
      rangedHealRatio: 0.6, minionHealRatio: 0.15, moveSpeedIncrease: 0.2,
      rangedMoveSpeedRatio: 0.75, moveSpeedDuration: 1,
      maxCharges: 100, attackCharges: 6, unitsPerCharge: 24,
      chargeModel: "current-at-connected-on-hit", chargePrecision: "continuous",
      healDeliveryModel: "immediate-at-consumption", statSamplingModel: "current-at-consumption",
    });
    expect(rule.healBase * rule.rangedHealRatio).toBeCloseTo(372771 / 3400, 12);
    const amounts = (JSON.parse(originalGame) as Game)[fleetPath]!.mScript.mSpellScriptData.mEffectAmount;
    expect(amounts.HealBase).toBe(15);
    expect(amounts.HealMax).toBe(160);
    const source = build().evidence;
    const notes = source.filter(row => row.title === "Template:Energized info").map(row => row.text).join("\n");
    expect(notes).toContain("6 ''Energize'' stacks while 1 is generated for every 24");
    expect(notes).toContain("being {{tip|airborne|displaced}}");
    expect(notes).toContain("Hitting abilities that apply [[on-hit]] effects");
    expect(source.some(row => row.title === "Fleet Footwork" && row.text.includes("1 for every 25 units"))).toBe(true);
    expect(source.some(row => row.title === "Template:Tip data/Energized" && row.text.includes("consume the charges on-hit"))).toBe(true);
  });

  it("retains the named heal interpolation separately from the opaque calculation and missile travel time", () => {
    const records = JSON.parse(originalGame);
    const calculations = records[fleetPath].mScript.mSpellScriptData.mCalculations;
    expect(calculations.HealAmount).toMatchObject({
      mFormulaParts: [
        { __type: "ByCharLevelInterpolationCalculationPart", mStartValue: 15, mEndValue: 160,
          mScaleByStatProgressionMultiplier: true },
        { __type: "StatByNamedDataValueCalculationPart", mDataValue: "HealBonusADRatio" },
        { __type: "StatByNamedDataValueCalculationPart", mDataValue: "HealAPRatio" },
      ],
      mRangedMultiplier: { mDataValue: "RangedHealMod" },
    });
    expect(calculations["{ad820ad4}"].mFormulaParts[0]).toMatchObject({ mStartValue: 5, mEndValue: 100 });
    const missile = records[fleetPath + "/Spells/FleetFootwork_HealMis"];
    expect(missile.mSpell.mMissileSpec.movementComponent).toMatchObject({
      __type: "FixedTimeMovement", mTravelTime: Math.fround(0.35),
    });
  });

  it.each([
    [fleetTemplate, "up to 100.", "up to 99."],
    [fleetTemplate, "At 100", "At 99"],
    ["Template:Tip data/Energized", "up to 100.", "up to 99."],
    ["Template:Tip data/Energized", "At 100 charges", "At 99 charges"],
  ])("cross-checks the %s charge threshold '%s'", (title, old, next) => {
    const input = fixture();
    editWiki(input, title, text => text.replace(old, next));
    expect(() => build(input)).toThrow(/charge caps and consumption thresholds disagree/);
  });

  it.each(["HealBase", "HealMax", "HealBonusADRatio", "HealAPRatio", "RangedHealMod", "MinionHealMod",
    "MSBuff", "MSDuration", "RangedMSMod"])("requires the named client %s to match the parsed template", field => {
    const input = fixture();
    editGame(input, records => { records[fleetPath]!.mScript.mSpellScriptData.mEffectAmount[field]! += 1; });
    expect(() => build(input)).toThrow(new RegExp(`Fleet Footwork Wiki/game ${field} disagree`));
  });

  it.each([
    ["(145/17)", "(145/18)"], ["0.7025", "0.75"], ["*0.6", "*0.66"], ["for 20", "for 18"],
    ["10%|6%", "10%|7%"], ["5%|3%", "5%|4%"], ["1 second", "2 second"],
    ["20%|15%", "22%|15%"], ["15% effective", "12% effective"],
  ])("rejects changes to the current Fleet template's %s", (old, next) => {
    const input = fixture();
    editWiki(input, fleetTemplate, text => text.replace(old, next));
    expect(() => build(input)).toThrow(/Fleet Footwork.*(?:curve|matching|disagree)/);
  });

  it.each([
    ["6 ''Energize'' stacks", "8 ''Energize'' stacks"],
    ["generate 6 stacks", "generate 5 stacks"],
    ["24 in-game units", "25 in-game units"],
  ])("requires the current transcluded charge rule for %s", (old, next) => {
    const input = fixture();
    editWiki(input, "Template:Energized info", text => text.replace(old, next));
    expect(() => build(input)).toThrow(/matching charge|full reviewed revision changed/);
  });

  it.each(["HealAmount", "{ad820ad4}", "MoveSpeedCalc"])("binds the complete %s calculation", key => {
    const input = fixture();
    editGame(input, records => {
      const calculations = records[fleetPath]!.mScript.mSpellScriptData.mCalculations as Record<string, unknown>;
      calculations[key] = { __type: "GameCalculation", mFormulaParts: [] };
    });
    expect(() => build(input)).toThrow(`Fleet Footwork reviewed ${key} calculation changed`);
  });

  it.each(fleetClientPaths)("binds the complete client object %s", key => {
    const input = fixture();
    editGame(input, records => { Object.assign(records[key]!, { unreviewedField: 1 }); });
    expect(() => build(input)).toThrow(`Fleet Footwork full reviewed client object changed: ${key}`);
  });

  it("requires the current game identity, tooltip and normal-mode script data", () => {
    const id = fixture();
    editGame(id, records => { records[fleetPath]!.mPerkId = 8005; });
    expect(() => build(id)).toThrow(/Fleet Footwork game ID differs/);
    const script = fixture();
    editGame(script, records => { records[fleetPath]!.mScript.mSpellScriptName += ".changed"; });
    expect(() => build(script)).toThrow(/Fleet Footwork game name, type or script path differs/);
    const mode = fixture();
    editGame(mode, records => { records[fleetPath]!.mScript.mSpellScriptData.mEffectAmountGameMode = {}; });
    expect(() => build(mode)).toThrow(/Fleet Footwork requires reviewed normal-mode/);
    const tooltip = fixture();
    tooltip.catalog.runes.find(rune => rune.id === 8021)!.clientDescription += " amended";
    expect(() => build(tooltip)).toThrow(/Fleet Footwork retained client description changed/);
  });
});
