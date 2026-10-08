/** Loads a committed dataset's fight profiles and glossary for the ledger (CLI, tests, pages). */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { type LedgerContext, ledgerContext } from "../engine/ledger/index";
import type { Glossary } from "../engine/glossary";
import type { KitProfile } from "../engine/profiles";
import { DATA_DIR, datasetDir, patchName } from "./config";
import { latestDataset } from "./datasets";

export interface LedgerData {
  dataset: string;
  patch: string;
  kits: KitProfile[];
  ctx: LedgerContext;
}

export async function loadLedgerData(dataset?: string): Promise<LedgerData> {
  const name = dataset ?? (await latestDataset(DATA_DIR, "glossary.json"));
  const dir = datasetDir(name);
  const glossary = JSON.parse(await readFile(path.join(dir, "glossary.json"), "utf8")) as Glossary;
  const files = (await readdir(path.join(dir, "profiles"))).filter((file) => file.endsWith(".json")).sort();
  const kits = await Promise.all(
    files.map(async (file) => JSON.parse(await readFile(path.join(dir, "profiles", file), "utf8")) as KitProfile),
  );
  return { dataset: name, patch: patchName(name), kits, ctx: ledgerContext(glossary) };
}

/** Finds a champion by id or name, ignoring case, spaces and punctuation ("dr mundo", "Wukong", "MonkeyKing"). */
export function findKit(kits: KitProfile[], query: string): KitProfile {
  const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const wanted = key(query);
  const found = kits.find((kit) => key(kit.champion) === wanted || key(kit.name) === wanted);
  if (found) return found;
  const close = kits.filter((kit) => key(kit.name).startsWith(wanted) || key(kit.champion).startsWith(wanted));
  if (close.length === 1 && close[0]) return close[0];
  throw new Error(
    close.length > 1
      ? `"${query}" matches several champions: ${close.map((kit) => kit.name).join(", ")}`
      : `No champion named "${query}"`,
  );
}
