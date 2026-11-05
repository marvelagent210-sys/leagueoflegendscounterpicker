/** Reviewed, static item builds whose eligible adaptive AD/AP is already in bonus. */
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { REPO_ROOT } from "../config";
import { findItem } from "../itemData";
import type { ItemCatalog } from "../items/records";

declare const REVIEWED_BUILD: unique symbol;

/** An audit contract produced only after the catalog and item implementation pass review. */
export interface AdaptiveItemEligibility {
  readonly [REVIEWED_BUILD]: true;
  readonly schema: 1;
  readonly dataset: "16.21";
  /** Canonical names after the same Tear transformations used by equipBuild. */
  readonly items: readonly string[];
  readonly catalogSHA256: string;
  readonly implementationSHA256: string;
}

const REVIEWED_CATALOG = "9fa27e07d191e2a23ad8a7fc04bc3d8956736036c1892e4aa1c3fae4bee52cab";
const REVIEWED_IMPLEMENTATION = "f4ae022c30f2c6dfd3e9274000f1c28642e275505c3b9b9bfda5a6c225ee8d05";
const UNSUPPORTED: Readonly<Record<string, string>> = {
  "Rabadon's Deathcap": "Magical Opus needs source-qualified AP amplification, including otherwise excluded passive AP and excluding adaptive force itself",
  "Overlord's Bloodmail": "Tyranny and Retribution need dynamic eligible AD and adaptive-type reevaluation",
  "Blackfire Torch": "Blackfire needs dynamic eligible AP and adaptive-type reevaluation",
  "Mejai's Soulstealer": "Glory stack gains and losses need dynamic eligible AP and adaptive-type reevaluation",
  "Hubris": "Eminence's pre-fight AD buff is not represented by the current item module",
};

const sha256 = (value: string | Uint8Array) => createHash("sha256").update(value).digest("hex");

/** Include every catalog field: a changed or future item needs another explicit review. */
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value !== null && typeof value === "object") {
    return `{${Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
      .map(([key, entry]) => `${JSON.stringify(key)}:${canonical(entry)}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

async function itemSources(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const location = path.join(dir, entry.name);
    return entry.isDirectory() ? itemSources(location) : entry.name.endsWith(".ts") ? [location] : [];
  }))).flat();
}

async function implementationHash(): Promise<string> {
  const files = [...await itemSources(path.join(REPO_ROOT, "items")), path.join(REPO_ROOT, "pipeline/itemData.ts")]
    .map((file) => path.relative(REPO_ROOT, file).replaceAll(path.sep, "/")).sort();
  const entries = await Promise.all(files.map(async (file) => [file, sha256(await readFile(path.join(REPO_ROOT, file)))]));
  return sha256(JSON.stringify(entries));
}

/**
 * The reviewed fixed passives (Sterak, Rod and Dawncore) enter spec.bonus.
 * Excluded Awe/Void Infusion/Rapids stats stay outside that pool. Champion
 * passives are also outside it. The five exceptions above must remain explicit
 * until their source-qualified eligible contributions can be evaluated correctly.
 * This helper does not equip items or grant any stats.
 */
export async function reviewAdaptiveItemBuild(
  catalog: ItemCatalog,
  names: readonly string[],
  options: { stacked?: boolean } = {},
): Promise<AdaptiveItemEligibility> {
  if (!catalog || catalog.dataset !== "16.21" || catalog.patch !== "26.21") {
    throw new Error("Adaptive item eligibility requires the reviewed 16.21 / 26.21 catalog");
  }
  const catalogSHA256 = sha256(canonical(catalog));
  if (catalogSHA256 !== REVIEWED_CATALOG) throw new Error("Adaptive item eligibility: item catalog changed and needs review");
  const implementationSHA256 = await implementationHash();
  if (implementationSHA256 !== REVIEWED_IMPLEMENTATION) throw new Error("Adaptive item eligibility: item implementation changed and needs review");
  if (!Array.isArray(names) || !Array.from(names).every((name) => typeof name === "string" && name.trim().length > 0)) {
    throw new Error("Adaptive item eligibility needs an array of nonempty item names");
  }
  if (!options || typeof options !== "object" || Array.isArray(options)
    || (options.stacked !== undefined && typeof options.stacked !== "boolean")) {
    throw new Error("Adaptive item eligibility needs a boolean stacked option");
  }
  const stacked = options.stacked ?? true;
  const items = names.map((name) => {
    const record = findItem(catalog, name);
    return stacked && record.transformsInto ? findItem(catalog, record.transformsInto) : record;
  });
  if (new Set(items.map((item) => item.name)).size !== items.length) {
    throw new Error("Adaptive item eligibility: a fixed build cannot hold an item twice");
  }
  for (const item of items) {
    const reason = UNSUPPORTED[item.name];
    if (reason) throw new Error(`Adaptive shards with ${item.name} are not supported yet: ${reason}`);
  }
  return Object.freeze({
    schema: 1, dataset: "16.21", items: Object.freeze(items.map((item) => item.name)),
    catalogSHA256, implementationSHA256,
  }) as AdaptiveItemEligibility;
}
