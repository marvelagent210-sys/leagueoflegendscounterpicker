import path from "node:path";
import { fileURLToPath } from "node:url";

export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const DATA_DIR = path.join(REPO_ROOT, "data");
export const RAW_DIR = path.join(DATA_DIR, "raw");

export const USER_AGENT =
  "lol-kit-counterpicker/0.1 (+https://github.com/marvelagent210-sys/leagueoflegendscounterpicker)";

export const DDRAGON = "https://ddragon.leagueoflegends.com";
export const CDRAGON = "https://raw.communitydragon.org/latest";
export const WIKI_BASE = "https://wiki.leagueoflegends.com/en-us/";
export const WIKI_API = `${WIKI_BASE}api.php`;
export const WIKI_LICENSE = "CC BY-SA 3.0";

/** Wiki page whose rendered table is the oracle for level-20 base stats. */
export const WIKI_LEVEL20_PAGE = "List of champions/Statistics at level 20";
export const WIKI_CHAMPION_DATA_PAGE = "Module:ChampionData/data";

/** Dataset folder name, e.g. Data Dragon "16.20.1" -> "16.20". */
export function datasetName(ddragonVersion: string): string {
  const [major, minor] = ddragonVersion.split(".");
  if (!major || !minor) throw new Error(`Unexpected Data Dragon version: ${ddragonVersion}`);
  return `${major}.${minor}`;
}

/**
 * Player-facing patch name. Data Dragon's major version trails the year-based
 * patch name by 10 (Data Dragon 16.20 is patch 26.20).
 */
export function patchName(dataset: string): string {
  const [major, minor] = dataset.split(".").map(Number);
  if (major === undefined || minor === undefined) throw new Error(`Bad dataset name: ${dataset}`);
  return `${major + 10}.${minor}`;
}

export function rawDir(dataset: string): string {
  return path.join(RAW_DIR, dataset);
}

export function datasetDir(dataset: string): string {
  return path.join(DATA_DIR, dataset);
}
