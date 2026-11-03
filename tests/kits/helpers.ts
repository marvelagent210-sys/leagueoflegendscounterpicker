/** Loads committed champion data and ability records for kit tests (no network). */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { AbilityRecord, PetRecord, RuneRecord } from "../../engine/abilities";
import { type CompiledKit, compileKit } from "../../engine/kits/compile";
import { KitContext } from "../../engine/kits/context";
import type { Champion, ChampionDataset } from "../../engine/types";
import { KITS } from "../../kits/champions/index";

const DATASET_DIR = path.join(import.meta.dirname, "..", "..", "data", "16.21");

let champions: Champion[] | undefined;

export function championData(id: string): Champion {
  champions ??= (JSON.parse(readFileSync(path.join(DATASET_DIR, "champions.json"), "utf8")) as ChampionDataset).champions;
  const found = champions.find((c) => c.id === id);
  if (!found) throw new Error(`No champion ${id}`);
  return found;
}

export function records(id: string): AbilityRecord[] {
  return JSON.parse(readFileSync(path.join(DATASET_DIR, "abilities", `${id}.json`), "utf8")) as AbilityRecord[];
}

/** The champion's pets; none for most champions. */
export function pets(id: string): PetRecord[] {
  const file = path.join(DATASET_DIR, "pets", `${id}.json`);
  return existsSync(file) ? (JSON.parse(readFileSync(file, "utf8")) as PetRecord[]) : [];
}

let runeRecords: RuneRecord[] | undefined;

/** The runes the simulator models (Triple Tonic). */
export function runes(): RuneRecord[] {
  runeRecords ??= JSON.parse(readFileSync(path.join(DATASET_DIR, "runes.json"), "utf8")) as RuneRecord[];
  return runeRecords;
}

export function context(id: string): KitContext {
  return new KitContext(championData(id), records(id), pets(id), runes());
}

export function kit(id: string, options: Record<string, number> = {}): CompiledKit {
  const module = KITS[id];
  if (!module) throw new Error(`No kit for ${id}`);
  return compileKit(championData(id), records(id), module, options, pets(id), runes());
}
