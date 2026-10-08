/**
 * The interaction ledger: every way one kit's abilities stop, weaken or punish the other
 * kit's abilities in a 1v1, with the evidence behind each.
 */
import type { AbilityKind } from "../abilities";
import type { Evidence } from "../profiles";

export type CheckId =
  | "projectile block"
  | "spell shield"
  | "parry"
  | "attack dodge"
  | "attack block"
  | "blind"
  | "disarm"
  | "attack speed slow"
  | "attack reflect"
  | "dash stop"
  | "grounding"
  | "untargetable"
  | "invulnerable"
  | "cc immunity"
  | "cleanse"
  | "tenacity"
  | "interrupt"
  | "death prevention"
  | "reveal"
  | "anti-heal"
  | "range";

/** An ability, or a champion's basic attacks (kind "A", name "Basic attacks"). */
export interface AbilityRef {
  champion: string;
  kind: AbilityKind;
  name: string;
}

export interface LedgerEntry {
  check: CheckId;
  /** The champion whose kit gains from the interaction. */
  favors: string;
  /** The ability doing the countering. */
  by: AbilityRef;
  /** The ability it counters. */
  against: AbilityRef;
  /** "negates", "partly negates", "interrupts", "removes", "shortens", "reduces", "punishes", "reveals", "out-ranges". */
  effect: string;
  /** One sentence for people. */
  summary: string;
  /** When it works: reaction windows, durations and uptime. */
  timing?: string;
  /** Limits from the wiki: "only from the front", "only if it negates an immobilizing effect". */
  conditions: string[];
  /**
   * How much the interaction matters, 0 to 1: how important the countered ability is to its
   * kit, times how completely and how often the counter applies (engine/ledger/weights.ts).
   */
  impact: number;
  evidence: Evidence[];
}

export interface Ledger {
  you: string;
  enemy: string;
  entries: LedgerEntry[];
  /** Sum of impacts favoring each side, and the difference (you - enemy). */
  score: { you: number; enemy: number; net: number };
  /** Ledger-only results are "partial" until both kits are simulated (PLAN.md §7). */
  confidence: "partial" | "full";
}
