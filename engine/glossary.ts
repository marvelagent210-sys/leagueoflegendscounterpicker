/**
 * The wiki's own classification of abilities by mechanic, read from its glossary pages
 * (every dash, every spell shield, every source of each crowd control type, ...), and
 * its crowd control rules table. Committed as data/<dataset>/glossary.json.
 */
import type { AbilityKind } from "./abilities";

/** Names of the lists, with the page each comes from. */
export const GLOSSARY_LISTS = {
  projectileBlock: "Projectile",
  spellShield: "Spell shield",
  untargetable: "Untargetability",
  vanish: "Untargetability",
  stasis: "Untargetability",
  invulnerable: "Invulnerability",
  dash: "Dash",
  dashNoTerrain: "Dash",
  dashCancel: "Dash",
  knockdown: "Dash",
  dashInterruptibleByCC: "Dash",
  lunge: "Dash",
  blink: "Blink",
  channel: "Channel",
  charged: "Channel",
  camouflage: "Stealth",
  invisibility: "Stealth",
  stealthTrap: "Stealth",
  trueSight: "Template:List of true sight abilities",
  grievousWounds: "Grievous Wounds",
  tenacity: "Tenacity",
  tenacityReduction: "Tenacity",
  minimumHealth: "Template:Tip data/Minimum health threshold",
  resurrection: "Template:Tip data/Resurrection",
  slowImmune: "Template:Tip data/Slow-immune",
  crowdControl: "Types of Crowd Control/Sources",
} as const;

export type GlossaryList = keyof typeof GLOSSARY_LISTS;

export interface GlossaryEntry {
  list: GlossaryList;
  /**
   * The sub-list the ability appears in, where the page has several: the targeting of a
   * dash ("direction-targeted"), the kind of channel ("movement"), or the crowd control
   * type of a source ("stun", "airborne: knock up").
   */
  label?: string;
  /** Champion id and ability record name. */
  champion: string;
  ability: string;
  kind: AbilityKind;
  /** The page's own qualifier after the ability, e.g. "(second cast)" or "(to non-champions)". */
  qualifier?: string;
  /** Footnotes on the item, e.g. "Does not destroy inbound projectiles". */
  note?: string;
}

/** How a crowd control type affects its target, from the wiki's summary table. */
export interface CrowdControlRule {
  /** Crowd control types the row covers, lowercase: ["stun", "suspension"]. */
  types: string[];
  movement: string;
  attacking: string;
  abilities: string;
  interruptsChannels: string;
  /** Whether tenacity shortens it. */
  tenacity: boolean;
  /** Champion abilities that remove it (cleanses). */
  removedBy: Array<{ champion: string; ability: string; kind: AbilityKind }>;
}

export interface Glossary {
  /** Revision of each page read, by title. */
  pages: Record<string, number>;
  entries: GlossaryEntry[];
  crowdControl: CrowdControlRule[];
  /** Mentions that name no current ability record (removed abilities, typos on the wiki). */
  unresolved: Array<{ list: GlossaryList; page: string; mention: string }>;
}
