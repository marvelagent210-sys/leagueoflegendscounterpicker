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
}

export type WorkerResponse = { id: number; run: MatchupRun } | { id: number; error: string };
