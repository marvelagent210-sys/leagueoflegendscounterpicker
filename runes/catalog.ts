/** Source catalog only. These records do not equip runes or change a fight. */
export interface RuneWikiSource {
  title: string;
  revid: number;
  timestamp: string;
  sha256: string;
  content: string;
}

export interface RuneCatalogPath {
  id: number;
  key: string;
  name: string;
  icon: string;
  /** Keystone row, followed by the three lesser-rune rows. */
  slots: number[][];
  allowedSecondaryPathIds: number[];
}

export interface CatalogRune {
  id: number;
  key: string;
  name: string;
  pathId: number;
  slot: number;
  icon: string;
  shortDescription: string;
  longDescription: string;
  clientDescription: string;
  wiki: RuneWikiSource;
  combatStatus: "not-implemented" | "legacy-udyr-only";
}

export interface CatalogShard {
  id: number;
  name: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  tooltip: string;
}

export interface RuneCatalog {
  schema: 1;
  dataset: string;
  patch: string;
  ddragonVersion: string;
  communityDragonVersion: string;
  paths: RuneCatalogPath[];
  runes: CatalogRune[];
  /** Offense, flex, defense. The same shard may be chosen in different rows. */
  shardSlots: number[][];
  shards: CatalogShard[];
  /** Full Rune article: page rules, shard values and contextual replacements. */
  rules: RuneWikiSource;
  sources: Record<string, { url: string; sha256: string }>;
  limitations: string[];
}
