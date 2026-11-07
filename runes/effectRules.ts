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
  coupDeGrace: { healthThreshold: number; damageIncrease: number };
  cutDown: { healthThreshold: number; damageIncrease: number };
  legendAlacrity: {
    baseAttackSpeed: number;
    attackSpeedPerStack: number;
    pointsPerStack: number;
    maxStacks: number;
    championKillPoints: number;
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
