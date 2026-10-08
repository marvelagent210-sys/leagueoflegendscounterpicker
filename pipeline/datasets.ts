import { readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const DATASET_NAME = /^\d+\.\d+$/;

function compareDatasets(a: string, b: string): number {
  const [aMajor = 0, aMinor = 0] = a.split(".").map(Number);
  const [bMajor = 0, bMinor = 0] = b.split(".").map(Number);
  return aMajor - bMajor || aMinor - bMinor;
}

/**
 * Newest dataset folder (e.g. "16.20") under `dir` that contains `requiredFile`.
 * Use DATA_DIR with "champions.json" for committed data, RAW_DIR with "ddragon" for raw downloads.
 */
export async function latestDataset(dir: string, requiredFile: string): Promise<string> {
  const names = existsSync(dir) ? await readdir(dir) : [];
  const datasets = names
    .filter((name) => DATASET_NAME.test(name) && existsSync(path.join(dir, name, requiredFile)))
    .sort(compareDatasets);
  const latest = datasets.at(-1);
  if (!latest) throw new Error(`No dataset with ${requiredFile} under ${dir}. Run "npm run fetch" first.`);
  return latest;
}
