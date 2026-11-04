/** Validate a page's layout; this command never equips runes in a simulation. */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { validateRunePage } from "../../runes/pages";
import { DATA_DIR, datasetDir } from "../config";
import { latestDataset } from "../datasets";
import { loadRuneCatalog } from "./catalog";

export async function main(args = process.argv.slice(2)): Promise<void> {
  const { values } = parseArgs({ args, options: { dataset: { type: "string" }, file: { type: "string" }, help: { type: "boolean" } } });
  if (values.help) {
    console.log("Usage: npm run runes:page -- --file page.json [--dataset 16.21]\nChecks primary, secondary and shard rows only. Rune effects and champion-specific substitutions are not applied.");
    return;
  }
  if (!values.file) throw new Error("Provide a rune-page JSON file with --file");
  const dataset = values.dataset ?? await latestDataset(DATA_DIR, "manifest.json");
  if (!/^\d+\.\d+$/.test(dataset)) throw new Error("Expected a dataset such as 16.21");
  const catalog = await loadRuneCatalog(path.join(datasetDir(dataset), "rune-sources"));
  if (catalog.dataset !== dataset) throw new Error(`Rune catalog: source dataset ${catalog.dataset} differs from ${dataset}`);
  const page: unknown = JSON.parse(await readFile(values.file, "utf8"));
  const result = validateRunePage(catalog, page);
  console.log(JSON.stringify({ dataset, scope: "structural-only", effectsApplied: false, ...result }, null, 2));
  if (!result.valid) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
