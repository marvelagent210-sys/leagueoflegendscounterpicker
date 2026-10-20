/** Dataset sources are isolated by URL and content revision; failed loads can retry. */
import type { AbilityRecord, PetRecord, RuneRecord } from "../../../engine/abilities";
import type { StatPrices } from "../../../engine/budget";
import type { ChampionDataset } from "../../../engine/types";
import type { SimSource } from "./run";

export type JsonLoader = <T>(url: string) => Promise<T>;

async function fetchJson<T>(url: string): Promise<T> {
  // Node's fetch types omit browser cache modes; this also compiles in the shared tests.
  const response = await fetch(url, { cache: "no-cache" } as Parameters<typeof fetch>[1]);
  if (!response.ok) throw new Error(`Couldn't load ${url} (${response.status})`);
  return (await response.json()) as T;
}

export function createSourceLoader(fetcher: JsonLoader = fetchJson): (dataUrl: string, fingerprint?: string) => Promise<SimSource> {
  const sources = new Map<string, Promise<SimSource>>();
  return (dataUrl, fingerprint) => {
    const key = JSON.stringify([dataUrl, fingerprint]);
    const known = sources.get(key);
    if (known) return known;
    const source = (async (): Promise<SimSource> => {
      const [dataset, rules, pets, runes] = await Promise.all([
        fetcher<ChampionDataset>(`${dataUrl}champions.json`),
        fetcher<{ statPrices: StatPrices }>(`${dataUrl}rules.json`),
        fetcher<Record<string, PetRecord[]>>(`${dataUrl}pets.json`),
        fetcher<RuneRecord[]>(`${dataUrl}runes.json`),
      ]);
      const byId = new Map(dataset.champions.map((champion) => [champion.id, champion]));
      const records = new Map<string, Promise<AbilityRecord[]>>();
      return {
        champion(id) {
          const champion = byId.get(id);
          if (!champion) throw new Error(`No champion ${id}`);
          return champion;
        },
        records(id) {
          const known = records.get(id);
          if (known) return known;
          const loaded = fetcher<AbilityRecord[]>(`${dataUrl}abilities/${id}.json`);
          records.set(id, loaded);
          void loaded.catch(() => records.delete(id));
          return loaded;
        },
        prices: rules.statPrices,
        pets: (id) => pets[id] ?? [],
        runes,
      };
    })();
    sources.set(key, source);
    void source.catch(() => sources.delete(key));
    return source;
  };
}
