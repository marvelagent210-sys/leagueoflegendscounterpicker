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
  absorbLife: { heal: number };
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
