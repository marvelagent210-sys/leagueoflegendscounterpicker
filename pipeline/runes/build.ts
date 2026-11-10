/** Build or verify the committed source-only rune catalog, without fetching or changing duel inputs. */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DATA_DIR, datasetDir } from "../config";
import { latestDataset } from "../datasets";
import { writeText } from "../lib/files";
import { loadRuneCatalog, runesReport } from "./catalog";

export async function buildRuneFiles(dataset: string, check = false): Promise<void> {
  if (!/^\d+\.\d+$/.test(dataset)) throw new Error("Rune catalog: --dataset needs a version such as 16.21");
  const directory = datasetDir(dataset);
  const catalog = await loadRuneCatalog(path.join(directory, "rune-sources"));
  if (catalog.dataset !== dataset) throw new Error(`Rune catalog: source dataset ${catalog.dataset} differs from ${dataset}`);
  const outputs = [
    [path.join(directory, "rune-catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`],
    [path.join(directory, "reports", "runes.md"), runesReport(catalog)],
  ] as const;
  if (check) {
    for (const [filename, expected] of outputs) {
      let actual: string;
      try { actual = await readFile(filename, "utf8"); }
      catch { throw new Error(`Rune catalog: missing ${filename}; run npm run build:runes`); }
      if (actual !== expected) throw new Error(`Rune catalog: stale ${filename}; run npm run build:runes`);
    }
  } else {
    for (const [filename, content] of outputs) await writeText(filename, content);
  }
  console.log(`[runes] Dataset ${dataset}: ${catalog.runes.length} runes, ${catalog.paths.length} paths, ${catalog.shards.length} stat shards; ${check ? "committed outputs match" : "source catalog written"}; combat effects remain unchanged`);
}

async function main(args: string[]): Promise<void> {
  let dataset: string | undefined;
  let check = false;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === "--dataset" && !dataset && args[index + 1] && !args[index + 1]!.startsWith("--")) dataset = args[++index];
    else if (arg === "--check" && !check) check = true;
    else throw new Error(`Rune catalog: unknown or incomplete argument ${arg}`);
  }
  await buildRuneFiles(dataset ?? await latestDataset(DATA_DIR, "rune-sources/manifest.json"), check);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
