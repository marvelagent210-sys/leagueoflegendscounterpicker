/** Compiles the simulator kits of a committed dataset's champions (CLI, tests, build). */
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { AbilityRecord, PetRecord, RuneRecord } from "../engine/abilities";
import { type CompiledKit, compileKit } from "../engine/kits/compile";
import type { KitVariant } from "../engine/sim/matchup";
import { baseFighter } from "../engine/sim/fromChampion";
import type { FighterSpec } from "../engine/sim/spec";
import type { Champion } from "../engine/types";
import { KITS } from "../kits/champions/index";
import { datasetDir } from "./config";

export async function loadRecords(dataset: string, championId: string): Promise<AbilityRecord[]> {
  return JSON.parse(await readFile(path.join(datasetDir(dataset), "abilities", `${championId}.json`), "utf8")) as AbilityRecord[];
}

/** The champion's pets (turrets, Mist Walkers, ...); none for most champions. */
export async function loadPets(dataset: string, championId: string): Promise<PetRecord[]> {
  try {
    return JSON.parse(await readFile(path.join(datasetDir(dataset), "pets", `${championId}.json`), "utf8")) as PetRecord[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

/** The runes the simulator models (Triple Tonic), read once per dataset. */
const runesByDataset = new Map<string, Promise<RuneRecord[]>>();
export function loadRunes(dataset: string): Promise<RuneRecord[]> {
  let runes = runesByDataset.get(dataset);
  if (!runes) {
    runes = readFile(path.join(datasetDir(dataset), "runes.json"), "utf8").then((text) => JSON.parse(text) as RuneRecord[]);
    runesByDataset.set(dataset, runes);
  }
  return runes;
}

/** The champion's compiled kit, or undefined when it has none yet. */
export async function loadKit(dataset: string, champion: Champion, options: Record<string, number> = {}): Promise<CompiledKit | undefined> {
  const module = KITS[champion.id];
  if (!module) return undefined;
  return compileKit(champion, await loadRecords(dataset, champion.id), module, options, await loadPets(dataset, champion.id), await loadRunes(dataset));
}

/** A fighter with its kit when it has one, else base stats and basic attacks only. */
export async function loadFighter(dataset: string, champion: Champion): Promise<{ spec: FighterSpec; kit?: CompiledKit }> {
  const kit = await loadKit(dataset, champion);
  return kit ? { spec: kit.spec, kit } : { spec: baseFighter(champion) };
}

/**
 * The fighter as each of its kit's variants (Udyr's rank splits, PLAN §4.1), or just the one
 * fighter; matchups keep the variant best for it (engine/sim/matchup.ts bestMatchup).
 */
export async function loadVariants(dataset: string, champion: Champion, options: Record<string, number> = {}): Promise<KitVariant[]> {
  const kit = await loadKit(dataset, champion, options);
  if (!kit) return [{ spec: baseFighter(champion) }];
  if (kit.variants.length === 0) return [{ spec: kit.spec }];
  const variants: KitVariant[] = [];
  for (const variant of kit.variants) {
    const compiled = await loadKit(dataset, champion, variant);
    if (compiled) variants.push({ spec: compiled.spec, options: variant });
  }
  return variants;
}
