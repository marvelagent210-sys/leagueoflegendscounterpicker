/**
 * Evidence the wiki's ability templates leave out, which kits quote (KitContext.gameQuote and
 * quote): excerpts of the game's data files where the wiki gives no number (a dash speed, a
 * missile's travel time), and wiki text the template parser drops (interaction tables, known
 * issues). The build adds them to the ability records it writes:
 * - every game excerpt is read again from the downloaded character file, with that file's game
 *   version, CommunityDragon URL and SHA-256, so a new patch re-reads it;
 * - every wiki addition names its source, and a note must still be on its ability's template
 *   (its anchor), or the build fails until the note is checked again;
 * - text from another wiki page is pinned to the revision it was read from: a fetch that brings
 *   a newer revision fails the build until the text is checked again;
 * - a correction fixes what the parser gets wrong in one record (a template it drops that a kit
 *   quotes, a duration it gives the wrong effect), stating what the parser gives there: if it
 *   gives anything else, the build fails until the correction is checked again.
 */
import { createHash } from "node:crypto";
import type { AbilityRecord } from "../../engine/abilities";

export interface GameExcerpt {
  /** Data Dragon id of the champion whose ability record gets the excerpt. */
  champion: string;
  ability: string;
  /** The character file (data/raw/<dataset>/cdragon/bins/<character>.bin.json). */
  character: string;
  /** The object in the file. */
  object: string;
  /**
   * Dotted paths in the object; `DataValues` entries are found by name, arrays indexed with [n].
   * Each becomes "path: value", the value re-serialized from the parsed file, or with `exact`, as
   * written in the file (2250.0 stays 2250.0).
   */
  fields?: string[];
  exact?: boolean;
  /**
   * Lines written by hand instead, each checked against the file: "path: value" must have the
   * field's value; "path.label {…}" must match an object somewhere under path (its entries).
   */
  lines?: string[];
}

export interface WikiAddition {
  champion: string;
  ability: string;
  /** A note the parser drops, as written into the record's notes. */
  note?: string;
  /** Wikitext the ability's template must still contain for the note to stand. */
  anchor?: string;
  /** Text from another wiki page (rendered by hand), with the revision it was read from. */
  source?: { page: { title: string; revid: number }; text: string[] };
}

export interface RecordCorrection {
  champion: string;
  ability: string;
  /** Dotted path in the record, arrays indexed with [n]. */
  path: string;
  /** What the parser gives there (undefined: nothing); anything else fails the build. */
  parsed: unknown;
  /** The corrected value; left out to remove the field. */
  value?: unknown;
  /** Why the parsed value is wrong. */
  reason: string;
  /** Wikitext the ability's template must still contain for the correction to stand. */
  anchor?: string;
}

export const GAME_EXCERPTS: GameExcerpt[] = [
  { champion: "Anivia", ability: "Crystallize", character: "Anivia", object: "Characters/Anivia/Spells/CrystallizeAbility/Crystallize", fields: ["mSpell.DataValues.ChampPushDistance.values", "mSpell.DataValues.NonChampPushDistance.values", "mSpell.missileSpeed", "mSpell.mClientData.mTargeterDefinitions"] },
  { champion: "Malzahar", ability: "Malefic Visions", character: "Malzahar", object: "Characters/Malzahar/Spells/MalzaharEAbility/MalzaharE", fields: ["mSpell.mSpellCalculations.MinionExecuteThreshold"] },
  { champion: "Malzahar", ability: "Nether Grasp", character: "Malzahar", object: "Characters/Malzahar/Spells/MalzaharRAbility/MalzaharR", fields: ["mSpell.castRadius", "mSpell.mClientData.mTargeterDefinitions[0]"] },
  { champion: "Velkoz", ability: "Tectonic Disruption", character: "Velkoz", object: "Characters/Velkoz/Spells/VelkozEAbility/VelkozE", fields: ["mSpell.DataValues.MoveDistance.values", "mSpell.DataValues.MinDetonationTime.values", "mSpell.DataValues.MaxDetonationTime.values"] },
  { champion: "Ziggs", ability: "Hexplosive Minefield", character: "Ziggs", object: "Characters/Ziggs/Spells/ZiggsEAbility/ZiggsE", fields: ["mSpell.DataValues.TriggerRange.values", "mSpell.DataValues.MinePerceptionBubbleSize.values", "mSpell.castRadius"] },
  { champion: "Ziggs", ability: "Bouncing Bomb", character: "Ziggs", object: "Characters/Ziggs/Spells/ZiggsQAbility/ZiggsQ", fields: ["mSpell.DataValues.MaxRange.values", "mSpell.DataValues.MaxRangeFirstBounce.values", "mSpell.DataValues.MaxRangeSecondBounce.values", "mSpell.DataValues.BombTriggerRange.values", "mSpell.DataValues.ExplosionRadius.values", "mSpell.DataValues.BoundingBoxTrigger.values"] },
  { champion: "Ziggs", ability: "Bouncing Bomb", character: "Ziggs", object: "Characters/Ziggs/Spells/ZiggsQAbility/ZiggsQSpell", fields: ["mSpell.missileSpeed", "mSpell.mMissileSpec"] },
  { champion: "Ziggs", ability: "Bouncing Bomb", character: "Ziggs", object: "Characters/Ziggs/Spells/ZiggsQAbility/ZiggsQSpell2", fields: ["mSpell.missileSpeed", "mSpell.mMissileSpec"] },
  { champion: "Ziggs", ability: "Bouncing Bomb", character: "Ziggs", object: "Characters/Ziggs/Spells/ZiggsQAbility/ZiggsQSpell3", fields: ["mSpell.missileSpeed", "mSpell.mMissileSpec"] },
  { champion: "Ziggs", ability: "Satchel Charge", character: "Ziggs", object: "Characters/Ziggs/Spells/ZiggsWAbility/ZiggsW", fields: ["mSpell.DataValues.KnockbackSpeed.values", "mSpell.DataValues.KnockbackGravity.values", "mSpell.DataValues.KnockbackDistance.values", "mSpell.DataValues.KnockbackDistanceAlly.values", "mSpell.DataValues.ExplosionRadius.values", "mSpell.missileSpeed", "mSpell.mMissileSpec.movementComponent"] },
  { champion: "Zyra", ability: "Grasping Roots", character: "ZyraGraspingPlant", object: "Characters/ZyraGraspingPlant/CharacterRecords/Root", fields: ["basicAttack", "attackSpeedModifiable.baseValue", "attackRangeModifiable.baseValue"] },
  { champion: "Zyra", ability: "Grasping Roots", character: "Zyra", object: "Characters/Zyra/Spells/ZyraEAbility/ZyraEPlantAttack", fields: ["mSpell.missileSpeed", "mSpell.spellCastTime"] },
  { champion: "Zyra", ability: "Deadly Spines", character: "Zyra", object: "Characters/Zyra/Spells/ZyraQAbility/ZyraQ", fields: ["mSpell.castRadius", "mSpell.castRadiusSecondary", "mSpell.mClientData.mTargeterDefinitions"] },
  { champion: "Zyra", ability: "Deadly Spines", character: "Zyra", object: "Characters/Zyra/Spells/ZyraQAbility/ZyraQPlantMissile", fields: ["mSpell.mMissileSpec.movementComponent", "mSpell.missileSpeed"] },
  { champion: "Zyra", ability: "Deadly Spines", character: "ZyraThornPlant", object: "Characters/ZyraThornPlant/CharacterRecords/Root", fields: ["basicAttack", "attackSpeedModifiable.baseValue", "attackRangeModifiable.baseValue"] },
  { champion: "MonkeyKing", ability: "Nimbus Strike", character: "MonkeyKing", object: "Characters/MonkeyKing/Spells/MonkeyKingNimbusAbility/MonkeyKingNimbus", fields: ["mSpell.DataValues.DashSpeed.values"] },
  { champion: "Corki", ability: "Missile Barrage", character: "Corki", object: "Characters/Corki/Spells/MissileBarrageAbility/MissileBarrage", fields: ["mSpell.mSpellCalculations"], exact: true },
  { champion: "Corki", ability: "Special Delivery", character: "Corki", object: "Characters/Corki/CharacterRecords/Root", fields: ["spells", "extraSpellsList"] },
  { champion: "Corki", ability: "Valkyrie", character: "Corki", object: "Characters/Corki/Spells/CarpetBombAbility/CarpetBomb", fields: ["mSpell.DataValues.BaseDamage.values", "mSpell.DataValues.APRatio.values", "mSpell.DataValues.TrailDuration.values", "mSpell.DataValues.TicksPerSecond.values", "mSpell.DataValues.MaximumTicks.values", "mSpell.DataValues.DamageRadius.values", "mSpell.DataValues.DashSpeedBase.values", "mSpell.DataValues.DashSpeedRatio.values", "mSpell.DataValues.MinimumRange.values", "mSpell.DataValues.MaximumRange.values", "mSpell.DataValues.ADRatio.values"], exact: true },
  { champion: "Draven", ability: "Stand Aside", character: "Draven", object: "Characters/Draven/Spells/DravenDoubleShotAbility/DravenDoubleShot", fields: ["mSpell.DataValues.BaseDamage.values", "mSpell.DataValues.SlowAmount.values", "mSpell.DataValues.SlowDuration.values", "mSpell.DataValues.KnockbackDuration.values"], exact: true },
  { champion: "Draven", ability: "Spinning Axe", character: "Draven", object: "Characters/Draven/Spells/DravenSpinningAbility/DravenSpinningAttack", fields: ["mSpell.mMissileSpec"], exact: true },
  { champion: "Draven", ability: "Whirling Death", character: "Draven", object: "Characters/Draven/Spells/DravenRCastAbility/DravenR", fields: ["mSpell.castRange", "mSpell.mMissileSpec"], exact: true },
  { champion: "Ezreal", ability: "Trueshot Barrage", character: "Ezreal", object: "Characters/Ezreal/Spells/EzrealRAbility/EzrealR", fields: ["mSpell.castRange"], exact: true },
  { champion: "Jhin", ability: "Whisper", character: "Jhin", object: "Characters/Jhin/Spells/JhinPassiveAbility/JhinPassive", fields: ["mSpell.mSpellCalculations.TotalADPercent", "mSpell.DataValues.OutOfCombatTimeBeforeReload.values"], exact: true },
  { champion: "Jhin", ability: "Curtain Call", character: "Jhin", object: "Characters/Jhin/Spells/JhinRAbility/JhinRShot", fields: ["mSpell.mCantCancelWhileWindingUp", "mSpell.mDoesntBreakChannels"] },
  { champion: "Jinx", ability: "Flame Chompers!", character: "Jinx", object: "Characters/Jinx/Spells/JinxEAbility/JinxEHit", fields: ["mSpell.mMissileSpec.movementComponent"], exact: true },
  { champion: "Jinx", ability: "Switcheroo!", character: "Jinx", object: "Characters/Jinx/Spells/JinxBasicAttack", fields: ["mSpell.missileSpeed"], exact: true },
  { champion: "Jinx", ability: "Switcheroo!", character: "Jinx", object: "Characters/Jinx/Spells/JinxQAbility/JinxQAttack", fields: ["mSpell.missileSpeed"], exact: true },
  { champion: "Jinx", ability: "Switcheroo!", character: "Jinx", object: "Characters/Jinx/CharacterRecords/Root", fields: ["extraAttacks[6]", "basicAttack"], exact: true },
  { champion: "Jinx", ability: "Super Mega Death Rocket!", character: "Jinx", object: "Characters/Jinx/Spells/JinxRAbility/JinxR", fields: ["mSpell.castRange"] },
  { champion: "Kaisa", ability: "Supercharge", character: "Kaisa", object: "Characters/Kaisa/Spells/KaisaEAbility/KaisaE", fields: ["mSpell.mSpellCalculations.TotalCastTime"] },
  { champion: "Kaisa", ability: "Icathian Rain", character: "Kaisa", object: "Characters/Kaisa/Spells/KaisaQAbility/KaisaQLeftMissile1", fields: ["mSpell.mMissileSpec.movementComponent"] },
  { champion: "KogMaw", ability: "Icathian Surprise", character: "KogMaw", object: "Characters/KogMaw/Spells/KogMawIcathianSurpriseReadyAbility/KogMawIcathianDisplay", fields: ["mSpell.mSpellCalculations.PassiveDamage"], exact: true },
  { champion: "KogMaw", ability: "Caustic Spittle", character: "KogMaw", object: "Characters/KogMaw/Spells/KogMawQAbility/KogMawQ", fields: ["mSpell.mUseAutoattackCastTimeData"] },
  { champion: "KogMaw", ability: "Bio-Arcane Barrage", character: "KogMaw", object: "Characters/KogMaw/Spells/KogMawBasicAttack", fields: ["mSpell.missileSpeed"], exact: true },
  { champion: "Lucian", ability: "Lightslinger", character: "Lucian", object: "Characters/Lucian/Spells/LucianPassiveAbility/LucianPassive", lines: ["mSpell.mSpellCalculations.TotalDamage.mFormulaParts[0].mSubpart.mLevel1Value: 0.5", "mSpell.mSpellCalculations.TotalDamage.breakpoint {\"mLevel\":7,\"mAdditionalBonusAtThisLevel\":0.05000000074505806}", "mSpell.mSpellCalculations.TotalDamage.breakpoint {\"mLevel\":13,\"mAdditionalBonusAtThisLevel\":0.05000000074505806}", "mSpell.mSpellCalculations.TotalDamage.breakpoint {\"mLevel\":19,\"mAdditionalBonusAtThisLevel\":0.10000000149011612}", "mSpell.mSpellCalculations.TotalDamage.breakpoint {\"mLevel\":25,\"mAdditionalBonusAtThisLevel\":0.10000000149011612}"] },
  { champion: "Lucian", ability: "Lightslinger", character: "Lucian", object: "Characters/Lucian/Spells/LucianPassiveAbility/LucianPassiveAttack", fields: ["mSpell.mMissileSpec.movementComponent.mSpeed"], exact: true },
  { champion: "Lucian", ability: "The Culling", character: "Lucian", object: "Characters/Lucian/Spells/LucianRAbility/LucianR", fields: ["mSpell.mSpellCalculations.TotalNumShots", "mSpell.DataValues.NumShots.values", "mSpell.DataValues.CritValueMod.values"], exact: true },
  { champion: "MissFortune", ability: "Love Tap", character: "MissFortune", object: "Characters/MissFortune/Spells/MissFortunePassiveAbility/MissFortunePassive", fields: ["mSpell.mSpellCalculations.TotalDamage", "mSpell.mSpellCalculations.MinionDamage"] },
  { champion: "MissFortune", ability: "Love Tap", character: "MissFortune", object: "Characters/MissFortune/Spells/MissFortuneBasicAttack", fields: ["mSpell.missileSpeed"], exact: true },
  { champion: "Samira", ability: "Wild Rush", character: "Samira", object: "Characters/Samira/Spells/SamiraEAbility/SamiraE", fields: ["mSpell.DataValues", "mSpell.mSpellCalculations"], exact: true },
  { champion: "Samira", ability: "Daredevil Impulse", character: "Samira", object: "Characters/Samira/Spells/SamiraPassiveCombo", fields: ["mSpell.DataValues", "mSpell.mSpellCalculations"], exact: true },
  { champion: "Samira", ability: "Daredevil Impulse", character: "Samira", object: "Characters/Samira/Spells/SamiraBasicAttack", fields: ["mSpell.mMissileSpec", "mSpell.missileSpeed"], exact: true },
  { champion: "Samira", ability: "Daredevil Impulse", character: "Samira", object: "Characters/Samira/Spells/SamiraPJuggle", fields: ["mSpell.DataValues", "mSpell.mSpellCalculations", "mSpell.mCastTime"], exact: true },
  { champion: "Samira", ability: "Flair", character: "Samira", object: "Characters/Samira/Spells/SamiraQAbility/SamiraQ", fields: ["mSpell.DataValues", "mSpell.mSpellCalculations"], exact: true },
  { champion: "Samira", ability: "Inferno Trigger", character: "Samira", object: "Characters/Samira/Spells/SamiraRAbility/SamiraR", fields: ["mSpell.DataValues", "mSpell.mSpellCalculations"], exact: true },
  { champion: "Samira", ability: "Inferno Trigger", character: "Samira", object: "Characters/Samira/Spells/SamiraRAbility/SamiraRMissile", fields: ["mSpell.mMissileSpec", "mSpell.missileSpeed"], exact: true },
  { champion: "Samira", ability: "Blade Whirl", character: "Samira", object: "Characters/Samira/Spells/SamiraWAbility/SamiraW", fields: ["mSpell.DataValues", "mSpell.mSpellCalculations"], exact: true },
  { champion: "Sivir", ability: "Fleet of Foot", character: "Sivir", object: "Characters/Sivir/Spells/SivirBasicAttack", fields: ["mSpell.missileSpeed"], exact: true },
  { champion: "Sivir", ability: "Boomerang Blade", character: "Sivir", object: "Characters/Sivir/Spells/SivirQAbility/SivirQ", fields: ["mSpell.DataValues", "mSpell.mSpellCalculations.TotalDamage"], exact: true },
  { champion: "Smolder", ability: "Flap, Flap, Flap", character: "Smolder", object: "Characters/Smolder/Spells/SmolderEAbility/SmolderE", fields: ["mSpell.DataValues", "mSpell.mSpellCalculations", "mSpell.missileSpeed"], exact: true },
  { champion: "Smolder", ability: "Flap, Flap, Flap", character: "Smolder", object: "Characters/Smolder/Spells/SmolderEAbility/SmolderEAttack", fields: ["mSpell.mMissileSpec", "mSpell.missileSpeed"], exact: true },
  { champion: "Smolder", ability: "Dragon Practice", character: "Smolder", object: "Characters/Smolder/Spells/SmolderPAbility/SmolderP", fields: ["mSpell.DataValues", "mSpell.mSpellCalculations"], exact: true },
  { champion: "Smolder", ability: "Dragon Practice", character: "Smolder", object: "Characters/Smolder/Spells/SmolderBasicAttack", fields: ["mSpell.mMissileSpec", "mSpell.missileSpeed"], exact: true },
  { champion: "Smolder", ability: "Super Scorcher Breath", character: "Smolder", object: "Characters/Smolder/Spells/SmolderQAbility/SmolderQ", lines: ["mSpell.DataValues: [{\"name\":\"BaseDamage\",\"values\":[50.0,60.0,70.0,80.0,90.0,100.0,110.0],\"__type\":\"SpellDataValue\"},{\"name\":\"ADRatio\",\"values\":[1.2999999523162842,1.2999999523162842,1.2999999523162842,1.2999999523162842,1.2999999523162842,1.2999999523162842,1.2999999523162842],\"__type\":\"SpellDataValue\"},{\"name\":\"StackTier1\",\"values\":[25.0,25.0,25.0,25.0,25.0,25.0,25.0],\"__type\":\"SpellDataValue\"},{\"name\":\"StackTier2\",\"values\":[125.0,125.0,125.0,125.0,125.0,125.0,125.0],\"__type\":\"SpellDataValue\"},{\"name\":\"StackTier3\",\"values\":[225.0,225.0,225.0,225.0,225.0,225.0,225.0],\"__type\":\"SpellDataValue\"},{\"name\":\"Tier1_ExplosionRadius\",\"values\":[285.0,285.0,285.0,285.0,285.0,285.0,285.0],\"__type\":\"SpellDataValue\"},{\"name\":\"Tier2_BlowbackDistance\",\"values\":[500.0,500.0,500.0,500.0,500.0,500.0,500.0],\"__type\":\"SpellDataValue\"},{\"name\":\"Tier2_BlowbackAmountBase\",\"values\":[2.0,2.0,2.0,2.0,2.0,2.0,2.0],\"__type\":\"SpellDataValue\"},{\"name\":\"Tier2_BlowbackExplosionRadius\",\"values\":[150.0,150.0,150.0,150.0,150.0,150.0,150.0],\"__type\":\"SpellDataValue\"},{\"name\":\"Tier2_BlowbackSpreadAngle\",\"values\":[15.0,15.0,15.0,15.0,15.0,15.0,15.0],\"__type\":\"SpellDataValue\"},{\"name\":\"Tier3_TrueDamagePercent\",\"values\":[0.009999999776482582,0.009999999776482582,0.009999999776482582,0.009999999776482582,0.009999999776482582,0.009999999776482582,0.009999999776482582],\"__type\":\"SpellDataValue\"},{\"name\":\"Tier3_MonsterCap\",\"values\":[300.0,300.0,300.0,300.0,300.0,300.0,300.0],\"__type\":\"SpellDataValue\"},{\"name\":\"CritRatio\",\"values\":[0.75,0.75,0.75,0.75,0.75,0.75,0.75],\"__type\":\"SpellDataValue\"},{\"name\":\"LifestealMod\",\"values\":[0.5,0.5,0.5,0.5,0.5,0.5,0.5],\"__type\":\"SpellDataValue\"},{\"name\":\"Tier3_ExecuteThresholdStart\",\"values\":[6.5,6.5,6.5,6.5,6.5,6.5,6.5],\"__type\":\"SpellDataValue\"},{\"name\":\"Tier3_DotLength\",\"values\":[3.0,3.0,3.0,3.0,3.0,3.0,3.0],\"__type\":\"SpellDataValue\"},{\"name\":\"Tier2_BlowbackPercentageDamage\",\"values\":[50.0,50.0,50.0,50.0,50.0,50.0,50.0],\"__type\":\"SpellDataValue\"},{\"name\":\"minionmod\",\"values\":[1.0,1.0,1.0,1.0,1.0,1.0,1.0],\"__type\":\"SpellDataValue\"},{\"name\":\"Tier3_Burn_Stack_Mult\",\"values\":[4.999999873689376e-05,4.999999873689376e-05,4.999999873689376e-05,4.999999873689376e-05,4.999999873689376e-05,4.999999873689376e-05,4.999999873689376e-05],\"__type\":\"SpellDataValue\"},{\"name\":\"ManaRestore\",\"values\":[15.0,15.0,15.0,15.0,15.0,15.0,15.0],\"__type\":\"SpellDataValue\"}]", "mSpell.mSpellCalculations: {\"TotalDamage\":{\"mMultiplier\":{\"mSubparts\":[{\"mNumber\":1.0,\"__type\":\"NumberCalculationPart\"},{\"mPart1\":{\"mStat\":8,\"mDataValue\":\"CritRatio\",\"__type\":\"StatByNamedDataValueCalculationPart\"},\"mPart2\":{\"mSubparts\":[{\"mNumber\":-1.0,\"__type\":\"NumberCalculationPart\"},{\"mStat\":9,\"mCoefficient\":1.0,\"__type\":\"StatByCoefficientCalculationPart\"}],\"__type\":\"SumOfSubPartsCalculationPart\"},\"__type\":\"ProductOfSubPartsCalculationPart\"}],\"__type\":\"SumOfSubPartsCalculationPart\"},\"mFormulaParts\":[{\"mDataValue\":\"BaseDamage\",\"__type\":\"NamedDataValueCalculationPart\"},{\"mStat\":2,\"mStatFormula\":2,\"mDataValue\":\"ADRatio\",\"__type\":\"StatByNamedDataValueCalculationPart\"}],\"__type\":\"GameCalculation\"},\"Tier2_NumberOfBlowback\":{\"mFormulaParts\":[{\"mDataValue\":\"Tier2_BlowbackAmountBase\",\"__type\":\"NamedDataValueCalculationPart\"},{\"mBuffName\":\"{32bcea5d}\",\"mIconKey\":\"%i:Smolder%\",\"mCoefficient\":0.00800000037997961,\"__type\":\"BuffCounterByCoefficientCalculationPart\"}],\"__type\":\"GameCalculation\"},\"Tier3_ExecuteThreshold\":{\"mMultiplier\":{\"mNumber\":0.009999999776482582,\"__type\":\"NumberCalculationPart\"},\"mExpandedTooltipCalculationDisplay\":5,\"mFormulaParts\":[{\"mDataValue\":\"Tier3_ExecuteThresholdStart\",\"__type\":\"NamedDataValueCalculationPart\"}],\"mDisplayAsPercent\":true,\"mPrecision\":1,\"__type\":\"GameCalculation\"},\"Tier3_Burn\":{\"mFormulaParts\":[{\"mStat\":2,\"mStatFormula\":2,\"mCoefficient\":0.0002500000118743628,\"__type\":\"StatByCoefficientCalculationPart\"},{\"mBuffName\":\"{32bcea5d}\",\"mIconKey\":\"%i:Smolder%\",\"mDataValue\":\"Tier3_Burn_Stack_Mult\",\"__type\":\"BuffCounterByNamedDataValueCalculationPart\"}],\"mDisplayAsPercent\":true,\"mPrecision\":1,\"__type\":\"GameCalculation\"}}", "mSpell.mMissileSpec: {\"movementComponent\":{\"mVisualsTrackHiddenTargets\":true,\"mTargetHeightAugment\":100.0,\"mOffsetInitialTargetHeight\":50.0,\"mStartBoneName\":\"\",\"mStartBoneSkinOverrides\":{\"31\":\"UltGun_Root\"},\"mSpeed\":1800.0,\"__type\":\"FixedSpeedMovement\"},\"verticalFacing\":{\"__type\":\"VeritcalFacingMatchVelocity\"},\"behaviors\":[{\"__type\":\"CastOnMovementComplete\"},{\"__type\":\"DestroyOnMovementComplete\"}],\"__type\":\"MissileSpecification\"}", "mSpell.missileSpeed: 2200.0"] },
  { champion: "Smolder", ability: "Super Scorcher Breath", character: "Smolder", object: "Characters/Smolder/Spells/SmolderQAbility/SmolderQ2BlowbackMissileA", fields: ["mSpell.mMissileSpec"], exact: true },
  { champion: "Smolder", ability: "MMOOOMMMM!", character: "Smolder", object: "Characters/Smolder/Spells/SmolderRAbility/SmolderR", fields: ["mSpell.DataValues", "mSpell.mSpellCalculations"], exact: true },
  { champion: "Smolder", ability: "MMOOOMMMM!", character: "Smolder", object: "Characters/Smolder/Spells/SmolderRAbility/SmolderRMomMissile", fields: ["mSpell.mMissileSpec"], exact: true },
  { champion: "Smolder", ability: "MMOOOMMMM!", character: "Smolder", object: "Characters/Smolder/Spells/SmolderRAbility/SmolderRMomMissileSweetspot", fields: ["mSpell.mMissileSpec"], exact: true },
  { champion: "Smolder", ability: "Achooo!", character: "Smolder", object: "Characters/Smolder/Spells/SmolderWAbility/SmolderW", fields: ["mSpell.DataValues", "mSpell.mSpellCalculations", "mSpell.mMissileSpec", "mSpell.missileSpeed"], exact: true },
  { champion: "Tristana", ability: "Explosive Charge", character: "Tristana", object: "Characters/Tristana/Spells/TristanaEAbility/TristanaE", fields: ["mSpell.DataValues.CritChanceModifier.values", "mSpell.mSpellCalculations.ActiveDamage"], exact: true },
  { champion: "Tristana", ability: "Draw a Bead", character: "Tristana", object: "Characters/Tristana/Spells/TristanaBasicAttack", fields: ["mSpell.missileSpeed"], exact: true },
  { champion: "Twitch", ability: "Deadly Venom", character: "Twitch", object: "Characters/Twitch/Spells/TwitchBasicAttack", fields: ["mSpell.missileSpeed"], exact: true },
  { champion: "Twitch", ability: "Ambush", character: "Twitch", object: "Characters/Twitch/Spells/TwitchHideInShadowsAbility/TwitchHideInShadows", fields: ["mSpell.DataValues"], exact: true },
  { champion: "Varus", ability: "Hail of Arrows", character: "Varus", object: "Characters/Varus/Spells/VarusEAbility/VarusE", fields: ["mSpell.DataValues.GrievousDuration.values"] },
  { champion: "Varus", ability: "Living Vengeance", character: "Varus", object: "Characters/Varus/Spells/VarusBasicAttack", fields: ["mSpell.missileSpeed"], exact: true },
  { champion: "Xayah", ability: "Bladecaller", character: "Xayah", object: "Characters/Xayah/Spells/XayahEAbility/XayahE", fields: ["mSpell.DataValues.FeatherReturnDelay.values", "mSpell.DataValues.CritRatio.values", "mSpell.mSpellCalculations.FeatherDamage.mMultiplier", "mSpell.DataValues.FeatherThreshold.values"], exact: true },
  { champion: "Xayah", ability: "Clean Cuts", character: "Xayah", object: "Characters/Xayah/Spells/XayahBasicAttack", fields: ["mSpell.missileSpeed"], exact: true },
  { champion: "Xayah", ability: "Double Daggers", character: "Xayah", object: "Characters/Xayah/Spells/XayahQAbility/XayahQ", fields: ["mSpell.DataValues.Missile1DelayTime.values", "mSpell.DataValues.Missile2DelayTime.values", "mSpell.DataValues.Missile1DelaySpeed.values", "mSpell.DataValues.Missile2DelaySpeed.values"], exact: true },
  { champion: "Xayah", ability: "Featherstorm", character: "Xayah", object: "Characters/Xayah/Spells/XayahRAbility/XayahRMissile", fields: ["mSpell.missileSpeed", "mSpell.mMissileSpec.mMissileWidth"], exact: true },
];

export const WIKI_ADDITIONS: WikiAddition[] = [
  {
    champion: "Anivia",
    ability: "Rebirth",
    note: "Interaction table (ct): move=false; cast=false; attack=false; items=false; consume=false; spells=false; interrupts=death.",
    anchor: "{{ct|move=false|cast=false|attack=false|items=false|consume=false|spells=false|interrupts=death}}",
  },
  {
    champion: "Anivia",
    ability: "Rebirth",
    source: {"page": {"title": "Template:Tip data/Resurrection", "revid": 4060644}, "text": ["A unit that is protected by Resurrection will enter a revival state and dispel most debuffs upon taking fatal damage. After the state completes, the unit is revived. Resurrection effects do not count for kills or assists.", "Resurrection sources have a hierarchy, and will trigger in the following order:\n# Chronoshift\n# Cultivation of War\n# Guardian Angel\n# Rebirth and Cell Division\n\nResurrection will always take precedence over zombie state effects. Entering resurrection does not cancel cast times. Bailout always takes priority over resurrection."]},
  },
  {
    champion: "Malzahar",
    ability: "Void Shift",
    note: "Void Shift does not prevent E trap drowsy. [https://www.reddit.com/r/zoemains/comments/1mfs9ib/did_you_know_malzahar_could_get_asleep_when/]",
    anchor: "''Void Shift'' does not prevent {{cais|E|Zoe}} trap {{tip|drowsy}}.",
  },
  {
    champion: "Malzahar",
    ability: "Nether Grasp",
    note: "Interaction table (ct): attack=Disabled if attacking Nether Grasp target. Otherwise interrupts after 0.5 seconds of channeling.; cast=interrupts; move=Disabled for the first 0.5 seconds. Interrupts afterwards.; consume=true; items=interrupts,true,interrupts,false,interrupts; spells=true,interrupts,interrupts,interrupts.",
    anchor: "{{ct|channel|attack=Disabled if attacking Nether Grasp target.",
  },
  {
    champion: "MonkeyKing",
    ability: "Cyclone",
    note: "Interaction table (ct): attack=false; move=true; cast=Other abilities are disabled for the first 0.3 seconds, casting them afterwards interrupts.; items=true; consume=true; spells=true,true,true,false,true; interrupts=death.",
    anchor: "{{ct|attack=false|move=true|cast=Other abilities are disabled for the first {{fd|0.3}} seconds, casting them afterwards interrupts.|items=true|consume=true|spells=true,true,true,false,true|interrupts=death}}",
  },
  {
    champion: "MonkeyKing",
    ability: "Nimbus Strike",
    source: {"page": {"title": "Template:Tip data/Uncancellable windup", "revid": 4072133}, "text": ["Some effects cause a basic attack to have an uncancellable windup. Unlike normal basic attacks and similar to the cast time of a spell, the windup of these attacks cannot be interrupted by neither the user themselves nor any status effect, other than death, polymorph, Quinn's Vault, Hextech Rocketbelt Supersonic, and in some cases, untargetability and range.", "Any effect that would disrupt an attack's windup, aside from the ones noted above, are ignored by basic attacks with uncancellable windups. If the attack doesn't lock out other abilities, they may be used normally, and the basic attack will hit during the ability cast."]},
  },
  {
    champion: "Caitlyn",
    ability: "Headshot",
    source: {"page":{"title":"Template:Data Caitlyn/Headshot","revid":3982560},"text":["|description2 = {{sbc|Headshot:}} '''Caitlyn's''' basic attack is empowered to have an {{tip|uncancellable windup}} and deal {{as|{{pp|key=%|60 to 100 for 3|1 to 13}}|ad}} {{as|(+ {{critical damage|0 to 100|critScaling=true}}) AD}} {{as|'''bonus''' physical damage}}, increased to {{as|110% (+ {{critical damage|0 to 100|critScaling=true}}) AD}} against non-champions."]},
  },
  {
    champion: "Caitlyn",
    ability: "Ace in the Hole",
    source: {"page":{"title":"Template:Data Caitlyn/Ace in the Hole","revid":3982561},"text":["|description3 = Once '''Caitlyn''' completes the channel, she fires a homing bullet toward the target that deals {{as|physical damage}} to the first enemy champion it hits, increased by {{critical damage|0 to 30|critScaling=true}}.","{{ct|channel|attack=false|move=false|cast=false|items=false,true,false,false,false|spells=true,false,false,false,false}}"]},
  },
  {
    champion: "Ezreal",
    ability: "Mystic Shot",
    source: {"page":{"title":"Types of Crowd Control","revid":4061028},"text":["Blind has no effect on abilities that trigger on-hit effects (e.g. Mystic Shot, Parrrley, and Steel Tempest)."]},
  },
  {
    champion: "Jhin",
    ability: "Basic Attack",
    source: {"page":{"title":"Template:Data Jhin/Basic Attack","revid":4075435},"text":["|description2 = '''Jhin's''' {{tip|critically strike|critical strikes}} have slightly increased missile speed, but deal only{{ft|{{as|{{critical damage|{{ccd|Jhin|crit_base}}|100|mod={{ccd|Jhin|crit_mod}}}} AD}} {{as|physical damage}}.|{{fd|{{#expr:{{ccd|Jhin|crit_mod}}*100}}}}% of the {{sti|{{as|critical damage}}}} champions usually have.}}"]},
  },
  {
    champion: "Jhin",
    ability: "Curtain Call",
    source: {"page":{"title":"Template:Data Jhin/Curtain Call","revid":4007615},"text":["|description3 = The fourth shot {{tip|critical strike|critically strikes}} for {{as|{{critical damage|200|100}}|critical damage}} damage.","{{ct|channel|cast=interrupts|items=interrupts,true,,false|spells=true,false,interrupts,interrupts,false}}","{{ct|cast|spells=true,false,false,false,false}}"]},
  },
  {
    champion: "Jinx",
    ability: "Super Mega Death Rocket!",
    source: {"page":{"title":"Template:Data Jinx/Super Mega Death Rocket!","revid":4007616},"text":["The maximum damage is reached after traveling 1500 units, which is exactly equal to the range of her Zap!, or roughly 0.85 seconds of travel time. The rocket changes its visual appearance and missile speed slightly earlier, after traveling 1350 units."]},
  },
  {
    champion: "Kaisa",
    ability: "Supercharge",
    source: {"page":{"title":"Template:Data Kai'Sa/Supercharge","revid":4038391},"text":["|cast time    = {{as|{{pp|type='''bonus''' attack speed|1.2;1.155;1.089;0.99;0.924;0.858;0.792;0.726;0.693;0.66;0.627;0.6|key1=%|0;3.90;10.20;21.22;29.88;39.87;51.52;65.29;73.17;81.82;91.39;100|formula= 1.2 /(1 + '''bonus''' attack speed/100) . ''This is capped at 0.6 seconds.''}}|attack speed}}"]},
  },
  {
    champion: "Kaisa",
    ability: "Killer Instinct",
    source: {"page":{"title":"Template:Data Kai'Sa/Killer Instinct","revid":4034697},"text":["|description  = {{sbc|Active:}} '''Kai'Sa''' grants herself a {{tip|shield}} for 2 seconds and {{tip|dash|dashes}} to a target location near a {{tip|sight|visible}} enemy champion that was {{tt|affected|Stack application or consumption}} by {{as|Plasma|buzzword}} within the last 4 seconds. The shield's duration is refreshed when the dash ends."]},
  },
  {
    champion: "Kaisa",
    ability: "Void Seeker",
    source: {"page":{"title":"Template:Data Kai'Sa/Void Seeker","revid":4034696},"text":["|description  = {{sbc|Active:}} '''Kai'Sa''' fires a void bolt in the target direction that briefly grants {{tip|sight}} around its trajectory as it travels, deals {{as|magic damage}} to the first enemy hit, applies {{as|2 Plasma|buzzword}}, and {{tip|true sight|reveals}} them for 4 seconds."]},
  },
  {
    champion: "Lucian",
    ability: "The Culling",
    source: {"page":{"title":"Template:Data Lucian/The Culling","revid":4007670},"text":["While channeling, Relentless Pursuit is usable. Piercing Light and Ardent Blaze are disabled. This ability recasts to end channel."]},
  },
  {
    champion: "Smolder",
    ability: "MMOOOMMMM!",
    source: {"page":{"title":"Template:Data Smolder/MMOOOMMMM!","revid":4078267},"text":["{{ct|cast|move=Disabled in the first {{fd|0.4}} seconds of the cast time.|spells=true,false,false,false,false}}"]},
  },
  {
    champion: "Varus",
    ability: "Piercing Arrow",
    source: {"page":{"title":"Template:Data Varus/Piercing Arrow","revid":4026469},"text":["Starts post-effect, after charge ends the cooldown is reduced equal to the charge duration","2% per 0.05 seconds. This is capped at 1.25 seconds.","825+70+(116.66 per 0.25 seconds). This is capped at 1.5 seconds."]},
  },
  {
    champion: "Xayah",
    ability: "Double Daggers",
    source: {"page":{"title":"Template:Data Xayah/Double Daggers","revid":4008615},"text":["0.25-(0.07 per 100% bonus attack speed). This is capped at 60% reduction at 214.3% bonus attack speed."]},
  },
  {
    champion: "Varus",
    ability: "Hail of Arrows",
    note: "Curated source conflict: the exact pinned template metadata says damagetype = Magic, while its active text and Physical Damage leveling formula say physical damage. The damageType flag follows the explicit description and formula.",
    anchor: "|damagetype   = Magic",
  },
];

export const RECORD_CORRECTIONS: RecordCorrection[] = [
  {
    champion: "Corki",
    ability: "Special Delivery",
    path: "historical",
    parsed: undefined,
    value: true,
    reason: "Retired with The Package: the pinned character record lists no Package spell (its excerpt on this record), so the template is kept as an archive and left out of the current kit.",
  },
  {
    champion: "Draven",
    ability: "Stand Aside",
    path: "parts[0].mechanics[0].duration",
    parsed: { kind: "constant", value: 2 },
    reason: "The 2 seconds are the slow's; the knock aside has no duration in the text.",
    anchor: "{{tip|airborne|knocking them aside}}, though not through terrain, and {{tip|slow|slowing}} them for 2 seconds.",
  },
  {
    champion: "KogMaw",
    ability: "Void Ooze",
    path: "notes[1]",
    parsed: ": The missile leaves a blob of ooze on the ground every 125 units traveled.",
    value: "Pending for test: The missile leaves a blob of ooze on the ground every 125 units traveled.",
    reason: "The parser drops {{pending for test}}; the kit quotes the note with its qualifier.",
    anchor: "* {{pending for test}}: The missile leaves a blob of ooze on the ground every 125 units traveled.",
  },
  {
    champion: "Tristana",
    ability: "Buster Shot",
    path: "notes[3]",
    parsed: "The debuff is removed early when the forced movement stops.",
    value: "The airborne debuff is removed early when the forced movement stops.",
    reason: "The parser drops the icon-only {{tip|airborne}}; the kit quotes the debuff by name.",
    anchor: "* The {{tip|airborne|icononly = true}} debuff is removed early when the forced movement stops.",
  },
  {
    champion: "Varus",
    ability: "Hail of Arrows",
    path: "flags.damageType[0]",
    parsed: "Magic",
    value: "Physical",
    reason: "The template's damagetype says Magic; its description and Physical Damage leveling say physical damage (the record's note records the conflict).",
    anchor: "|damagetype   = Magic",
  },
];

/** The characters whose game files the excerpts read. */
export function excerptCharacters(): string[] {
  return [...new Set(GAME_EXCERPTS.map((excerpt) => excerpt.character))].sort();
}

/** A field of a game object by its dotted path. */
export function fieldAt(object: unknown, path: string): unknown {
  let node: unknown = object;
  for (const token of path.split(".")) {
    const match = /^([^[\]]+)((?:\[\d+\])*)$/.exec(token);
    if (!match?.[1]) throw new Error(`Bad game field path "${path}"`);
    const key = match[1];
    if (Array.isArray(node)) node = node.find((entry) => typeof entry === "object" && entry !== null && (entry as { name?: unknown }).name === key);
    else node = typeof node === "object" && node !== null ? (node as Record<string, unknown>)[key] : undefined;
    for (const index of (match[2] ?? "").matchAll(/\[(\d+)\]/g)) node = Array.isArray(node) ? node[Number(index[1])] : undefined;
    if (node === undefined) throw new Error(`No game field "${path}"`);
  }
  return node;
}

/** End (exclusive) of the JSON value that starts at `i` in `text`. */
function valueEnd(text: string, i: number): number {
  const c = text[i];
  if (c === '"') {
    for (i++; text[i] !== '"'; i += text[i] === "\\" ? 2 : 1) if (i >= text.length) throw new Error("Unterminated JSON string");
    return i + 1;
  }
  if (c === "{" || c === "[") {
    for (let depth = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"') i = valueEnd(text, i) - 1;
      else if (ch === "{" || ch === "[") depth++;
      else if ((ch === "}" || ch === "]") && --depth === 0) return i + 1;
    }
    throw new Error("Unterminated JSON value");
  }
  while (i < text.length && !/[,}\]\s]/.test(text[i]!)) i++;
  return i;
}

const skipSpace = (text: string, i: number) => {
  while (/\s/.test(text[i] ?? "")) i++;
  return i;
};

/** The spans of an object's entries (key, value start, value end) or an array's items (value start, end). */
function members(text: string, start: number): Array<{ key?: string; start: number; end: number }> {
  const out: Array<{ key?: string; start: number; end: number }> = [];
  const object = text[start] === "{";
  let i = skipSpace(text, start + 1);
  while (text[i] !== (object ? "}" : "]")) {
    let key: string | undefined;
    if (object) {
      const keyEnd = valueEnd(text, i);
      key = JSON.parse(text.slice(i, keyEnd)) as string;
      i = skipSpace(text, skipSpace(text, keyEnd) + 1);
    }
    const end = valueEnd(text, i);
    out.push({ ...(key !== undefined ? { key } : {}), start: i, end });
    i = skipSpace(text, end);
    if (text[i] === ",") i = skipSpace(text, i + 1);
  }
  return out;
}

/** A field of a game object as written in the file, found as fieldAt finds it. */
export function rawFieldAt(text: string, object: string, path: string): string {
  let span = members(text, skipSpace(text, 0)).find((member) => member.key === object);
  if (!span) throw new Error(`No game object "${object}"`);
  for (const token of path.split(".")) {
    const match = /^([^[\]]+)((?:\[\d+\])*)$/.exec(token);
    if (!match?.[1]) throw new Error(`Bad game field path "${path}"`);
    const key = match[1];
    const inside = members(text, span.start);
    span = text[span.start] === "["
      ? inside.find((item) => text[item.start] === "{" && members(text, item.start).some((m) => m.key === "name" && JSON.parse(text.slice(m.start, m.end)) === key))
      : inside.find((member) => member.key === key);
    for (const index of (match[2] ?? "").matchAll(/\[(\d+)\]/g)) span = span && text[span.start] === "[" ? members(text, span.start)[Number(index[1])] : undefined;
    if (!span) throw new Error(`No game field "${path}"`);
  }
  return text.slice(span.start, span.end);
}

/** Whether `node` is, or holds somewhere, an object with all of `entries`. */
function holds(node: unknown, entries: Record<string, unknown>): boolean {
  if (Array.isArray(node)) return node.some((item) => holds(item, entries));
  if (typeof node !== "object" || node === null) return false;
  const record = node as Record<string, unknown>;
  return Object.entries(entries).every(([key, value]) => JSON.stringify(record[key]) === JSON.stringify(value)) || Object.values(record).some((value) => holds(value, entries));
}

/** A hand-written excerpt line must still say what the game object says. */
function checkLine(object: unknown, line: string, where: string): void {
  const colon = line.indexOf(": ");
  if (colon > 0 && !line.slice(0, colon).includes(" ")) {
    const path = line.slice(0, colon);
    if (JSON.stringify(JSON.parse(line.slice(colon + 2))) !== JSON.stringify(fieldAt(object, path))) throw new Error(`${where}: ${path} no longer has the value its excerpt gives`);
    return;
  }
  const space = line.indexOf(" ");
  const labeled = line.slice(0, space);
  if (!holds(fieldAt(object, labeled.slice(0, labeled.lastIndexOf("."))), JSON.parse(line.slice(space + 1)) as Record<string, unknown>)) {
    throw new Error(`${where}: nothing under ${labeled} matches its excerpt line`);
  }
}

/** Applies a correction to the record in place, after checking the parser still gives what it corrects. */
function correct(record: AbilityRecord, correction: RecordCorrection): void {
  const tokens: Array<string | number> = [];
  for (const step of correction.path.split(".")) {
    const match = /^([^[\]]+)((?:\[\d+\])*)$/.exec(step);
    if (!match?.[1]) throw new Error(`Bad record path "${correction.path}"`);
    tokens.push(match[1], ...[...(match[2] ?? "").matchAll(/\[(\d+)\]/g)].map((index) => Number(index[1])));
  }
  const last = tokens.pop()!;
  let parent: unknown = record;
  for (const token of tokens) parent = (parent as Record<string | number, unknown> | undefined)?.[token];
  if (typeof parent !== "object" || parent === null) throw new Error(`${correction.champion}'s ${correction.ability} has no ${correction.path}`);
  const holder = parent as Record<string | number, unknown>;
  if (JSON.stringify(holder[last]) !== JSON.stringify(correction.parsed)) {
    throw new Error(`${correction.champion}'s ${correction.ability}: the parser now gives ${JSON.stringify(holder[last])} at ${correction.path}, not ${JSON.stringify(correction.parsed)}: check the correction again`);
  }
  if ("value" in correction) holder[last] = correction.value;
  else delete holder[last];
}

export interface EvidenceInput {
  /** The downloaded text of a character file, by character name. */
  bin(character: string): string | undefined;
  /** The wikitext of a page, by title. */
  wikitext(title: string): string | undefined;
  /** The revision of a fetched wiki page (an ability template or a glossary page), by title. */
  revision(title: string): number | undefined;
  /** The game version the character files are from (manifest.cdragon.version). */
  version: string;
  /** The CommunityDragon patch folder the files were downloaded from ("16.20"). */
  dataset: string;
}

/** Adds the champion's curated evidence to its ability records, in place; fails on anything that no longer checks out. */
export function attachEvidence(records: AbilityRecord[], champion: string, input: EvidenceInput, excerpts = GAME_EXCERPTS, additions = WIKI_ADDITIONS, corrections = RECORD_CORRECTIONS): void {
  const recordFor = (ability: string) => {
    const record = records.find((r) => r.name === ability);
    if (!record) throw new Error(`Curated evidence for ${champion}'s ${ability}, which has no ability record`);
    return record;
  };
  const anchored = (record: AbilityRecord, anchor: string | undefined, what: string) => {
    if (anchor !== undefined && !input.wikitext(record.page.title)?.includes(anchor)) {
      throw new Error(`${record.page.title} no longer says "${anchor}": check the curated ${what} on ${record.name} again`);
    }
  };
  for (const correction of corrections.filter((c) => c.champion === champion)) {
    const record = recordFor(correction.ability);
    anchored(record, correction.anchor, "correction");
    correct(record, correction);
  }
  for (const excerpt of excerpts.filter((e) => e.champion === champion)) {
    const text = input.bin(excerpt.character);
    if (text === undefined) throw new Error(`Missing the game file of ${excerpt.character}; run npm run fetch`);
    const object = (JSON.parse(text) as Record<string, unknown>)[excerpt.object];
    if (object === undefined) throw new Error(`${excerpt.character}'s game file has no ${excerpt.object}`);
    const folder = excerpt.character.toLowerCase();
    const record = recordFor(excerpt.ability);
    (record.gameSources ??= []).push({
      version: input.version,
      url: `https://raw.communitydragon.org/${input.dataset}/game/data/characters/${folder}/${folder}.bin.json`,
      sha256: createHash("sha256").update(text).digest("hex"),
      object: excerpt.object,
      text: excerpt.lines ?? (excerpt.fields ?? []).map((field) => `${field}: ${excerpt.exact ? rawFieldAt(text, excerpt.object, field) : JSON.stringify(fieldAt(object, field))}`),
    });
    for (const line of excerpt.lines ?? []) checkLine(object, line, `${excerpt.character}'s ${excerpt.object}`);
  }
  for (const addition of additions.filter((a) => a.champion === champion)) {
    const record = recordFor(addition.ability);
    anchored(record, addition.anchor, "note");
    if (addition.source !== undefined) {
      const { title, revid } = addition.source.page;
      const fetched = input.revision(title);
      if (fetched !== revid) throw new Error(`${title} is at revision ${fetched ?? "none (not fetched)"}, not ${revid}: check the curated text on ${addition.ability} again`);
    }
    if (addition.note !== undefined) record.notes.push(addition.note);
    if (addition.source !== undefined) (record.sources ??= []).push(addition.source);
  }
}
