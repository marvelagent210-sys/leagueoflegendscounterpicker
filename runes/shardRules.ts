/** Numeric shard rules compiled from pinned sources before a fight starts. */
export interface ShardEvidence {
  title: string;
  revid: number;
  text: string;
}

/** Percentages are fractions; one adaptive-force point supplies adaptiveAdRatio AD or 1 AP. */
export interface ShardRules {
  adaptiveForce: number;
  adaptiveAdRatio: number;
  attackSpeed: number;
  abilityHaste: number;
  moveSpeed: number;
  healthPerLevel: number;
  health: number;
  tenacity: number;
  slowResist: number;
  evidence: ShardEvidence[];
}
