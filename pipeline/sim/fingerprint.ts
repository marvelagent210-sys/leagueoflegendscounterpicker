/** Content-address the inputs that can change a simulated ranking; never use mtimes. */
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import type { SimulationProvenance } from "../../engine/sim/precomputed";
import { KITS } from "../../kits/champions/index";
import { REPO_ROOT, datasetDir } from "../config";

export function fingerprintEntries(entries: Array<[string, Uint8Array | string]>): string {
  const hash = createHash("sha256");
  for (const [name, content] of [...entries].sort(([a], [b]) => a.localeCompare(b))) {
    const bytes = typeof content === "string" ? Buffer.from(content) : content;
    hash.update(JSON.stringify([name, bytes.length]));
    hash.update("\n");
    hash.update(bytes);
  }
  return hash.digest("hex");
}

async function sources(dir: string): Promise<string[]> {
  const files = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(files.map(async (file) => {
    const location = path.join(dir, file.name);
    return file.isDirectory() ? sources(location) : file.name.endsWith(".ts") ? [location] : [];
  }))).flat();
}

export async function simulationProvenance(dataset: string): Promise<SimulationProvenance> {
  return { schema: 1, fingerprint: fingerprintEntries(await simulationInputs(dataset)) };
}

/**
 * The build matrix's inputs: the simulation's, and the item effects, their hints, the build
 * search, the item catalog and the build matrix's own pipeline (npm run build:builds).
 */
export async function buildsProvenance(dataset: string): Promise<SimulationProvenance> {
  const code = [
    ...await sources(path.join(REPO_ROOT, "items")),
    ...await sources(path.join(REPO_ROOT, "pipeline", "items")),
    ...["pipeline/itemData.ts", "pipeline/sim/builds.ts", "pipeline/sim/buildsWorker.ts", "pipeline/sim/buildsWorker.mjs", "pipeline/sim/buildsCheckpoint.ts"].map((file) => path.join(REPO_ROOT, file)),
  ];
  const items = [path.join(datasetDir(dataset), "items.json")];
  const entries = await Promise.all([...code, ...items].map(async (file): Promise<[string, Uint8Array]> => [path.relative(REPO_ROOT, file).replaceAll(path.sep, "/"), await readFile(file)]));
  return { schema: 1, fingerprint: fingerprintEntries([...(await simulationInputs(dataset)), ...entries]) };
}

async function simulationInputs(dataset: string): Promise<Array<[string, Uint8Array]>> {
  const dir = datasetDir(dataset);
  const ids = Object.keys(KITS).sort();
  const code = [
    ...await sources(path.join(REPO_ROOT, "engine")),
    ...await sources(path.join(REPO_ROOT, "kits")),
    ...await sources(path.join(REPO_ROOT, "web", "src", "sim")),
    ...[
      "pipeline/kitData.ts", "pipeline/simData.ts", "pipeline/ledgerData.ts",
      "pipeline/build.ts", "pipeline/simPages.ts", "pipeline/ledgerPages.ts",
      "pipeline/sim/worker.ts", "pipeline/sim/worker.mjs", "pipeline/sim/pool.ts",
      "pipeline/sim/refresh.ts", "pipeline/sim/fingerprint.ts", "web/src/settings.ts",
      "pipeline/sim/checkpoint.ts", "pipeline/sim/pairKeys.ts", "pipeline/sim/reuse.ts",
      "tests/golden/matchups.ts",
    ].map((file) => path.join(REPO_ROOT, file)),
  ];
  const data = [
    ...["champions.json", "rules.json", "runes.json", "glossary.json"].map((file) => path.join(dir, file)),
    ...ids.map((id) => path.join(dir, "abilities", `${id}.json`)),
    ...(await readdir(path.join(dir, "pets"))).filter((file) => file.endsWith(".json")).map((file) => path.join(dir, "pets", file)),
    ...(await readdir(path.join(dir, "profiles"))).filter((file) => file.endsWith(".json")).map((file) => path.join(dir, "profiles", file)),
  ];
  return Promise.all([...code, ...data].map(async (file): Promise<[string, Uint8Array]> => [path.relative(REPO_ROOT, file).replaceAll(path.sep, "/"), await readFile(file)]));
}
