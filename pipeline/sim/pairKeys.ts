/**
 * Keys for reusing a pairing's result between refreshes (PLAN.md §13, incremental refresh).
 *
 * A pairing's result depends on three things:
 * - the code its fight runs: the worker and every module it imports (the engine, the shared kit
 *   code; for item builds also the item effects and the build search);
 * - the shared data every fight reads: the stat prices and the runes (and, for item builds, the
 *   item catalog, the build format, and the summoner spell and rune catalogs the loadouts are
 *   chosen from);
 * - its two kits: each one's module, its champion record, its ability records and its pets.
 *
 * Provenance enters none of them: wiki revision ids, game-file versions, URLs and file hashes,
 * the patch a champion last changed in, and the raw pages kept to audit curated pets change
 * without changing a fight. So a pairing whose shared key and two kit keys equal a stored
 * result's is the same computation, and the stored result stands. The kit registry
 * (kits/champions/index.ts) is left out too: adding a kit changes no other kit's fights.
 *
 * The keys cover the fight's computation only. What a refresh then writes from the results
 * (pages, reports, the files' layout) is the global fingerprint's concern (fingerprint.ts).
 */
import { createHash } from "node:crypto";
import { existsSync, statSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_BUDGET } from "../../engine/budget";
import type { Champion, ChampionDataset } from "../../engine/types";
import { KITS } from "../../kits/champions/index";
import { REPO_ROOT, datasetDir } from "../config";

export type MatrixKind = "sim" | "builds";

/** What a matrix's results were computed from: the shared key and each kit's key. */
export interface PairInputs {
  schema: 1;
  shared: string;
  kits: Record<string, string>;
}

/** The workers that compute a pairing, the roots of each kind's code. */
const WORKERS: Record<MatrixKind, string[]> = {
  sim: ["pipeline/sim/worker.ts", "pipeline/sim/worker.mjs"],
  builds: ["pipeline/sim/buildsWorker.ts", "pipeline/sim/buildsWorker.mjs"],
};

const KIT_DIR = "kits/champions";
const REGISTRY = `${KIT_DIR}/index.ts`;

/** Keys that record where data came from, not what it says. */
const PROVENANCE = new Set(["revid", "version", "url", "sha256", "fetchedAt"]);
/** A champion record's metadata. */
const CHAMPION_METADATA = new Set(["lastChanged", "icon"]);
/** The raw wiki pages pets keep to audit their curation (pipeline/petCuration.ts); fights don't read them. */
const PET_AUDIT = new Set(["fullRawRevision", "pinnedRawRevision", "sourceNotes"]);

export function sha256(text: string | Uint8Array): string {
  return createHash("sha256").update(text).digest("hex");
}

/** JSON with object keys sorted, so that equal data hashes equally whatever its key order. */
export function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(([, v]) => v !== undefined).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

/** The data without its provenance (and without `drop`'s keys), at every depth. */
export function withoutProvenance(value: unknown, drop: ReadonlySet<string> = new Set()): unknown {
  if (Array.isArray(value)) return value.map((item) => withoutProvenance(item, drop));
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([key]) => !PROVENANCE.has(key) && !drop.has(key))
        .map(([key, item]) => [key, withoutProvenance(item, drop)]),
    );
  }
  return value;
}

const IMPORT = /(?:^|[\n;])\s*(import|export)\s+(type\s+)?([\s\S]*?)\sfrom\s+["']([^"']+)["']/g;
const SIDE_EFFECT_IMPORT = /(?:^|[\n;])\s*import\s+["']([^"']+)["']/g;
const DYNAMIC_IMPORT = /import\(\s*["']([^"']+)["']\s*\)/g;

/** The local modules a source file imports at run time (type-only imports left out), repo-relative. */
export function localImports(file: string, source: string): string[] {
  const specifiers: string[] = [];
  for (const match of source.matchAll(IMPORT)) {
    if (match[2] || /^\s*type\s/.test(match[3] ?? "")) continue;
    specifiers.push(match[4]!);
  }
  for (const match of source.matchAll(SIDE_EFFECT_IMPORT)) specifiers.push(match[1]!);
  for (const match of source.matchAll(DYNAMIC_IMPORT)) specifiers.push(match[1]!);
  const found: string[] = [];
  for (const specifier of specifiers) {
    if (!specifier.startsWith(".")) continue;
    const base = path.resolve(REPO_ROOT, path.dirname(file), specifier);
    const candidates = [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts"), base.replace(/\.js$/, ".ts")];
    const resolved = candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
    if (!resolved) throw new Error(`${file}: cannot resolve the import "${specifier}"`);
    found.push(path.relative(REPO_ROOT, resolved).replaceAll(path.sep, "/"));
  }
  return found;
}

/** Every local module the roots run, by following imports (repo-relative paths). */
export async function codeClosure(roots: readonly string[]): Promise<string[]> {
  const seen = new Set<string>();
  const queue = [...roots];
  while (queue.length > 0) {
    const file = queue.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    if (!/\.(ts|tsx|mjs|js)$/.test(file)) continue;
    const source = await readFile(path.join(REPO_ROOT, file), "utf8");
    for (const imported of localImports(file, source)) if (!seen.has(imported)) queue.push(imported);
  }
  return [...seen].sort();
}

/** Each kit's module file, by champion id: kits/champions/<file>.ts whose default export is that champion's kit. */
export async function kitFiles(): Promise<Map<string, string>> {
  const files = new Map<string, string>();
  for (const name of (await readdir(path.join(REPO_ROOT, KIT_DIR))).sort()) {
    if (!name.endsWith(".ts")) continue;
    const file = `${KIT_DIR}/${name}`;
    if (file === REGISTRY) continue;
    const module = (await import(path.join(REPO_ROOT, file))) as { default?: { champion?: unknown } };
    const champion = module.default?.champion;
    if (typeof champion === "string" && KITS[champion] === module.default) files.set(champion, file);
  }
  const missing = Object.keys(KITS).filter((id) => !files.has(id));
  if (missing.length > 0) throw new Error(`No kit module file found for ${missing.join(", ")}`);
  return files;
}

async function readJsonFile(file: string): Promise<unknown> {
  return JSON.parse(await readFile(file, "utf8")) as unknown;
}

async function readOptionalJson(file: string): Promise<unknown> {
  try {
    return await readJsonFile(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function codeHashes(files: readonly string[]): Promise<Array<[string, string]>> {
  return Promise.all(files.map(async (file): Promise<[string, string]> => [file, sha256(await readFile(path.join(REPO_ROOT, file)))]));
}

/** The item catalog as fights read it: its items, groups, transforms, search rules and rule pages, without provenance. */
function catalogContent(catalog: Record<string, unknown>): unknown {
  const { dataset: _dataset, patch: _patch, sources, checks: _checks, ...rest } = catalog;
  const itemData = (sources as { itemData?: { title?: unknown } } | undefined)?.itemData;
  return withoutProvenance({ ...rest, sources: { itemData: { title: itemData?.title } } });
}

/**
 * The summoner spell or rune catalog as fights read it: its records and rule pages (and the
 * title of the page the spells' evidence names), without its dataset, versions, cross-checks or
 * provenance.
 */
function loadoutCatalogContent(catalog: Record<string, unknown>): unknown {
  const { dataset: _dataset, patch: _patch, sources, checks: _checks, ...rest } = catalog;
  const spellData = (sources as { spellData?: { title?: unknown } } | undefined)?.spellData;
  return withoutProvenance({ ...rest, ...(spellData ? { sources: { spellData: { title: spellData.title } } } : {}) });
}

/** What a kit's key is made of: its module's source, and its champion record, ability records and pets as the dataset has them. */
export interface KitParts {
  module: string | Uint8Array;
  champion: unknown;
  abilities: unknown;
  pets: unknown;
}

/** A kit's key: its parts, without provenance, metadata or the pets' audit pages. */
export function kitKey(parts: KitParts): string {
  return sha256(
    canonicalJson({
      module: sha256(parts.module),
      champion: withoutProvenance(parts.champion, CHAMPION_METADATA),
      abilities: withoutProvenance(parts.abilities),
      pets: withoutProvenance(parts.pets, PET_AUDIT),
    }),
  );
}

/**
 * The inputs a matrix's pairings are computed from, under the current code and dataset: the
 * shared key, and each kit's key. `format` is the build format, for item builds.
 */
export async function pairInputs(dataset: string, kind: MatrixKind, format?: string): Promise<PairInputs> {
  const dir = datasetDir(dataset);
  const kits = await kitFiles();
  const kitFileSet = new Set(kits.values());
  const code = (await codeClosure(WORKERS[kind])).filter((file) => file !== REGISTRY && !kitFileSet.has(file));
  const rules = (await readJsonFile(path.join(dir, "rules.json"))) as { statPrices?: unknown };
  const shared: Record<string, unknown> = {
    schema: 1,
    kind,
    code: await codeHashes(code),
    prices: rules.statPrices,
    runes: withoutProvenance(await readJsonFile(path.join(dir, "runes.json"))),
    gold: kind === "sim" ? DEFAULT_BUDGET : undefined,
  };
  if (kind === "builds") {
    if (!format) throw new Error("Item builds' pair inputs need the build format");
    shared.format = format;
    shared.catalog = catalogContent((await readJsonFile(path.join(dir, "items.json"))) as Record<string, unknown>);
    shared.spells = loadoutCatalogContent((await readJsonFile(path.join(dir, "summoners.json"))) as Record<string, unknown>);
    shared.runeCatalog = loadoutCatalogContent((await readJsonFile(path.join(dir, "rune-records.json"))) as Record<string, unknown>);
  }
  const champions = new Map(((await readJsonFile(path.join(dir, "champions.json"))) as ChampionDataset).champions.map((champion: Champion) => [champion.id, champion]));
  const keys: Record<string, string> = {};
  for (const [id, file] of [...kits].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))) {
    const champion = champions.get(id);
    if (!champion) continue;
    keys[id] = kitKey({
      module: await readFile(path.join(REPO_ROOT, file)),
      champion,
      abilities: await readJsonFile(path.join(dir, "abilities", `${id}.json`)),
      pets: await readOptionalJson(path.join(dir, "pets", `${id}.json`)),
    });
  }
  return { schema: 1, shared: sha256(canonicalJson(shared)), kits: keys };
}

/** Whether a stored pairing of `you` and `enemy` was computed from the same inputs as now. */
export function samePairInputs(stored: PairInputs | undefined, current: PairInputs, you: string, enemy: string): boolean {
  return stored !== undefined && stored.schema === current.schema && stored.shared === current.shared && stored.kits[you] !== undefined && stored.kits[you] === current.kits[you] && stored.kits[enemy] !== undefined && stored.kits[enemy] === current.kits[enemy];
}

/** Whether a value read from a file is a PairInputs record. */
export function isPairInputs(value: unknown): value is PairInputs {
  if (value === null || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return record.schema === 1 && typeof record.shared === "string" && record.kits !== null && typeof record.kits === "object" && Object.values(record.kits as object).every((key) => typeof key === "string");
}

/** The "inputs" entry of a matrix file, one kit per line so that a refresh's diff shows the kits that changed. */
export function pairInputsJson(inputs: PairInputs, indent = "  "): string {
  const kits = Object.keys(inputs.kits).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  return [
    `${indent}"inputs": {`,
    `${indent}  "schema": ${inputs.schema},`,
    `${indent}  "shared": ${JSON.stringify(inputs.shared)},`,
    `${indent}  "kits": {`,
    ...kits.map((id, i) => `${indent}    ${JSON.stringify(id)}: ${JSON.stringify(inputs.kits[id])}${i < kits.length - 1 ? "," : ""}`),
    `${indent}  }`,
    `${indent}}`,
  ].join("\n");
}
