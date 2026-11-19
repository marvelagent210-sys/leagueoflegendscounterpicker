/** Reviewed combat-rune rules compiled offline from complete, pinned sources. */
export interface RuneEffectEvidence {
  title: string;
  revid: number;
  text: string;
}

export interface CombatRuneRules {
  schema: 1;
  dataset: string;
  patch: string;
  grasp: {
    maxStacks: 4;
    stackInterval: number;
    combatWindow: number;
    readyWindow: number;
    meleeDamageRatio: number;
    rangedDamageRatio: number;
    meleeHealRatio: number;
    rangedHealRatio: number;
    meleeHealth: number;
    rangedHealth: number;
    healDelay: number;
  };
  conqueror: {
    modelLevel: 20;
    maxStacks: 12;
    stackDuration: number;
    castCooldown: number;
    meleeBasicStacks: 2;
    rangedBasicStacks: 1;
    spellStacks: 2;
    adaptiveForcePerStack: number;
    adaptiveADRatio: number;
    adaptiveAPRatio: number;
    meleeHealingRatio: number;
    rangedHealingRatio: number;
  };
  lethalTempo: {
    modelLevel: 20;
    maxStacks: 6;
    stackDuration: number;
    decayInterval: number;
    attackSpeedPerStack: number;
    rangedAttackSpeedRatio: number;
    boltDamage: number;
    rangedBoltRatio: number;
    bonusAttackSpeedRatio: number;
    boltSpeed: number;
    boltGate: "max-stacks-before-attack";
    boltStatModel: "at-launch";
    boltTravelModel: "fixed-endpoint";
  };
  pressTheAttack: {
    modelLevel: 20;
    damage: number;
    hitsRequired: 3;
    stackDuration: number;
    cooldown: number;
    damageIncrease: number;
    combatDuration: number;
    combatExpiryModel: "last-qualified-activity";
    adaptiveDamageModel: "current-derived-bonus-ad-vs-ap";
    activationFrameModel: "simulation-tick";
  };
  fleetFootwork: {
    modelLevel: 20;
    healBase: number;
    bonusADRatio: number;
    apRatio: number;
    rangedHealRatio: number;
    /** Retained source factor for minions, outside the manual champion target model. */
    minionHealRatio: number;
    moveSpeedIncrease: number;
    rangedMoveSpeedRatio: number;
    moveSpeedDuration: number;
    maxCharges: number;
    attackCharges: number;
    unitsPerCharge: number;
    chargeModel: "current-at-connected-on-hit";
    chargePrecision: "continuous";
    healDeliveryModel: "immediate-at-consumption";
    statSamplingModel: "current-at-consumption";
  };
  absorbLife: { heal: number };
  presenceOfMind: {
    /** This manual interface uses the application's fixed level-20 model. */
    modelLevel: 20;
    manaRestore: number;
    rangedManaRatio: number;
    energyRestore: number;
    damageCooldown: number;
    takedownResourceRatio: number;
    takedownDelay: number;
    /** Explicit local policy; the sources do not establish cap sampling time. */
    maximumResourceModel: "current-at-delivery";
  };
  triumph: {
    maximumHealthRatio: number;
    missingHealthRatio: number;
    delay: number;
    /** Economic source reference only; partial duels neither award nor spend it. */
    bonusGold: number;
    /** Chosen local phase for both terms; only a takedown missing-HP snapshot is sourced. */
    missingHealthModel: "at-native-kill-credit";
  };
  coupDeGrace: { healthThreshold: number; damageIncrease: number };
  cutDown: { healthThreshold: number; damageIncrease: number };
  legendAlacrity: {
    baseAttackSpeed: number;
    attackSpeedPerStack: number;
    pointsPerStack: number;
    maxStacks: number;
    championKillPoints: number;
  };
  legendHaste: {
    baseHaste: number;
    hastePerStack: number;
    pointsPerStack: number;
    maxStacks: number;
    championKillPoints: number;
  };
  legendBloodline: {
    baseLifeSteal: number;
    lifeStealPerStack: number;
    pointsPerStack: number;
    maxStacks: number;
    championKillPoints: number;
    /** A one-time direct maximum-health award only at maximum stacks. */
    bonusHealth: number;
  };
  lastStand: {
    healthThreshold: number;
    maximumHealthThreshold: number;
    minimumDamageIncrease: number;
    maximumDamageIncrease: number;
  };
  secondWind: {
    duration: number;
    missingHealthPerSecond: number;
    tickInterval: number;
    /** The article gives an HP5 formula but does not establish snapshot timing. */
    missingHealthModel: "current-at-regeneration-tick";
  };
  evidence: RuneEffectEvidence[];
}
