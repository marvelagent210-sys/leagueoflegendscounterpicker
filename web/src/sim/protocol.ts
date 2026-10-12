/** Messages between the app and its simulation workers. */
import type { AppSettings } from "../settings";
import type { MatchupRun } from "./run";

export interface WorkerRequest {
  id: number;
  /** Absolute URL of the dataset's folder, ending with "/". */
  dataUrl: string;
  you: string;
  enemy: string;
  settings: AppSettings;
  /** Keep the most likely fight of each scenario as a timeline. */
  log: boolean;
  /** The kit options a side played in the precomputed matchup (Udyr's rank split), to try first. */
  variant?: MatchupVariant;
}

/** A side's kit options in a matchup: 0 is you, 1 the enemy. */
export interface MatchupVariant {
  side: 0 | 1;
  options: Record<string, number>;
}

export type WorkerResponse = { id: number; run: MatchupRun } | { id: number; error: string };
