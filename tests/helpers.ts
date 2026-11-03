import path from "node:path";
import { DATA_DIR } from "../pipeline/config";
import { latestDataset } from "../pipeline/datasets";
import { readJson } from "../pipeline/lib/files";
import type { Level20Oracle } from "../pipeline/oracle";
import type { WikiChampionEntry } from "../pipeline/parse/championData";
import type { Champion, ChampionDataset, FormStats } from "../engine/types";

/** The newest committed dataset and its level-20 oracle. Tests never touch the network. */
export async function loadDataset(): Promise<{ data: ChampionDataset; oracle: Level20Oracle }> {
  const dataset = await latestDataset(DATA_DIR, "champions.json");
  const dir = path.join(DATA_DIR, dataset);
  return {
    data: await readJson<ChampionDataset>(path.join(dir, "champions.json")),
    oracle: await readJson<Level20Oracle>(path.join(dir, "oracle", "level20.json")),
  };
}

export function champion(data: ChampionDataset, id: string): Champion {
  const found = data.champions.find((c) => c.id === id);
  if (!found) throw new Error(`No champion ${id}`);
  return found;
}

const growth = (base: number, perLevel = 0) => ({ base, perLevel });

/** Form stats for unit tests: a plain melee champion unless overridden. */
export function makeFormStats(overrides: Partial<FormStats> = {}): FormStats {
  return {
    hp: growth(600, 100),
    hpRegen: growth(8, 0.8),
    resource: growth(300, 50),
    resourceRegen: growth(8, 0.5),
    armor: growth(30, 4.5),
    magicResist: growth(32, 2.05),
    attackDamage: growth(60, 3.5),
    attackSpeed: { base: 0.625, ratio: 0.625, bonusPerLevel: 2.5 },
    attackRange: 125,
    moveSpeed: 340,
    windup: { percent: 0.25, modifier: 1, source: "offset" },
    critDamageModifier: 1,
    gameplayRadius: 65,
    ...overrides,
  };
}

export function makeEntry(overrides: Partial<WikiChampionEntry> = {}): WikiChampionEntry {
  return {
    name: "Testchamp",
    id: 9001,
    apiname: "Testchamp",
    title: "the Test",
    resource: "Mana",
    rangeType: "Melee",
    adaptiveType: "Physical",
    lastChanged: "26.21",
    roles: ["Juggernaut"],
    positions: ["Top"],
    stats: makeFormStats(),
    ...overrides,
  };
}
