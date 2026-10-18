/** Messages between the app and its simulation workers. */
import type { MatchupVariant } from "../../../engine/sim/matchup";
import type { AppSettings } from "../settings";
import type { MatchupRun } from "./run";

export type { MatchupVariant };

export interface WorkerRequest {
  id: number;
  /** Absolute URL of the dataset's folder, ending with "/". */
  dataUrl: string;
  /** Identifies engine and parsed input revisions, even at the same dataset URL. */
  dataFingerprint?: string;
  you: string;
  enemy: string;
  settings: AppSettings;
  /** Keep the most likely fight of each scenario as a timeline. */
  log: boolean;
  /** Legacy hints accepted for compatibility; live optimization considers every variant. */
  variants?: MatchupVariant[];
}

export type WorkerResponse = { id: number; run: MatchupRun } | { id: number; error: string };
