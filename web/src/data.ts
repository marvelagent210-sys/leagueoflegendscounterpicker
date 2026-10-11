/** The dataset the app reads, fetched once from data/ next to the page (pipeline/webData.ts writes it). */
import type { AbilityRecord, PetRecord } from "../../engine/abilities";
import type { StatPrices } from "../../engine/budget";
import type { Glossary } from "../../engine/glossary";
import { type LedgerContext, ledgerContext } from "../../engine/ledger/index";
import type { KitProfile } from "../../engine/profiles";
import type { Champion, ChampionDataset } from "../../engine/types";
import { KITS } from "../../kits/champions/index";

export interface SimulatedFile {
  gold: number;
  values: string[];
  /** you -> enemy -> [score, ...scenario scores] */
  matchups: Record<string, Record<string, Array<number | null>>>;
}

export interface AppData {
  dataset: string;
  patch: string;
  /** Absolute URL of the dataset's folder, for the workers. */
  dataUrl: string;
  champions: Champion[];
  byId: Map<string, Champion>;
  profiles: Map<string, KitProfile>;
  ledger: LedgerContext;
  simulated: SimulatedFile;
  prices: StatPrices;
  /** Each champion's pets (turrets, Mist Walkers, ...), for the kits that use them. */
  pets: Map<string, PetRecord[]>;
  /** Champions with a simulator kit, by name. */
  kitIds: string[];
}

const cache = new Map<string, Promise<unknown>>();

function fetchJson<T>(path: string): Promise<T> {
  let found = cache.get(path);
  if (!found) {
    found = fetch(new URL(path, document.baseURI)).then(async (response) => {
      if (!response.ok) throw new Error(`Couldn't load ${path} (${response.status})`);
      return response.json() as Promise<unknown>;
    });
    found.catch(() => cache.delete(path));
    cache.set(path, found);
  }
  return found as Promise<T>;
}

let app: Promise<AppData> | undefined;

export function loadAppData(): Promise<AppData> {
  app ??= (async () => {
    const index = await fetchJson<{ dataset: string; patch: string }>("data/index.json");
    const dir = `data/${index.dataset}/`;
    const [dataset, profiles, glossary, simulated, rules, pets] = await Promise.all([
      fetchJson<ChampionDataset>(`${dir}champions.json`),
      fetchJson<KitProfile[]>(`${dir}profiles.json`),
      fetchJson<Glossary>(`${dir}glossary.json`),
      fetchJson<SimulatedFile>(`${dir}simulated.json`),
      fetchJson<{ statPrices: StatPrices }>(`${dir}rules.json`),
      fetchJson<Record<string, PetRecord[]>>(`${dir}pets.json`),
    ]);
    const champions = [...dataset.champions].sort((a, b) => a.name.localeCompare(b.name));
    const byId = new Map(champions.map((champion) => [champion.id, champion]));
    return {
      dataset: index.dataset,
      patch: index.patch,
      dataUrl: new URL(dir, document.baseURI).href,
      champions,
      byId,
      profiles: new Map(profiles.map((profile) => [profile.champion, profile])),
      ledger: ledgerContext(glossary),
      simulated,
      prices: rules.statPrices,
      pets: new Map(Object.entries(pets)),
      kitIds: Object.keys(KITS)
        .filter((id) => byId.has(id))
        .sort((a, b) => (byId.get(a)?.name ?? a).localeCompare(byId.get(b)?.name ?? b)),
    };
  })();
  app.catch(() => {
    app = undefined;
  });
  return app;
}

export function loadRecords(data: AppData, id: string): Promise<AbilityRecord[]> {
  return fetchJson<AbilityRecord[]>(`data/${data.dataset}/abilities/${id}.json`);
}

/** Finds a champion by id or name, ignoring case and punctuation. */
export function findChampion(data: AppData, query: string | undefined): Champion | undefined {
  if (!query) return undefined;
  const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const wanted = key(query);
  return data.champions.find((c) => key(c.id) === wanted || key(c.name) === wanted);
}
