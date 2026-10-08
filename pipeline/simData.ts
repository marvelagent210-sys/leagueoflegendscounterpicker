/** Loads what the duel simulator needs from a committed dataset: champion records and stat prices. */
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { StatPrices } from "../engine/budget";
import type { Champion, ChampionDataset } from "../engine/types";
import { DATA_DIR, datasetDir } from "./config";
import { latestDataset } from "./datasets";
import type { RulesFile } from "./rules";

export interface SimData {
  dataset: string;
  patch: string;
  champions: Champion[];
  prices: StatPrices;
}

export async function loadSimData(dataset?: string): Promise<SimData> {
  const name = dataset ?? (await latestDataset(DATA_DIR, "rules.json"));
  const dir = datasetDir(name);
  const file = JSON.parse(await readFile(path.join(dir, "champions.json"), "utf8")) as ChampionDataset;
  const rules = JSON.parse(await readFile(path.join(dir, "rules.json"), "utf8")) as RulesFile;
  return { dataset: name, patch: file.patch, champions: file.champions, prices: rules.statPrices };
}

/** Finds a champion by id or name, ignoring case, spaces and punctuation. */
export function findChampion(champions: Champion[], query: string): Champion {
  const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const wanted = key(query);
  const found = champions.find((c) => key(c.id) === wanted || key(c.name) === wanted);
  if (found) return found;
  const close = champions.filter((c) => key(c.name).startsWith(wanted) || key(c.id).startsWith(wanted));
  if (close.length === 1 && close[0]) return close[0];
  throw new Error(close.length > 1 ? `"${query}" matches several champions: ${close.map((c) => c.name).join(", ")}` : `No champion named "${query}"`);
}
