/** Compiles the simulator kits of a committed dataset's champions (CLI, tests, build). */
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { AbilityRecord } from "../engine/abilities";
import { type CompiledKit, compileKit } from "../engine/kits/compile";
import { baseFighter } from "../engine/sim/fromChampion";
import type { FighterSpec } from "../engine/sim/spec";
import type { Champion } from "../engine/types";
import { KITS } from "../kits/champions/index";
import { datasetDir } from "./config";

export async function loadRecords(dataset: string, championId: string): Promise<AbilityRecord[]> {
  return JSON.parse(await readFile(path.join(datasetDir(dataset), "abilities", `${championId}.json`), "utf8")) as AbilityRecord[];
}

/** The champion's compiled kit, or undefined when it has none yet. */
export async function loadKit(dataset: string, champion: Champion, options: Record<string, number> = {}): Promise<CompiledKit | undefined> {
  const module = KITS[champion.id];
  if (!module) return undefined;
  return compileKit(champion, await loadRecords(dataset, champion.id), module, options);
}

/** A fighter with its kit when it has one, else base stats and basic attacks only. */
export async function loadFighter(dataset: string, champion: Champion): Promise<{ spec: FighterSpec; kit?: CompiledKit }> {
  const kit = await loadKit(dataset, champion);
  return kit ? { spec: kit.spec, kit } : { spec: baseFighter(champion) };
}
