/** The dataset the app reads, fetched once from data/ next to the page (pipeline/webData.ts writes it). */
import type { AbilityRecord, PetRecord, RuneRecord } from "../../engine/abilities";
import type { StatPrices } from "../../engine/budget";
import type { Glossary } from "../../engine/glossary";
import { type LedgerContext, ledgerContext } from "../../engine/ledger/index";
import type { KitProfile } from "../../engine/profiles";
import type { Champion, ChampionDataset } from "../../engine/types";
import { KITS } from "../../kits/champions/index";
import { type PrecomputedBuilds, type PrecomputedMatchups, precomputedBuildsCurrent } from "../../engine/sim/precomputed";
import { precomputedCompatible } from "./sim/cache";

export type SimulatedFile = PrecomputedMatchups;

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
  /** False for legacy, stale or incomplete precomputed matrices: the browser reruns them. */
  precomputedCompatible: boolean;
  /** Identity for result caches, including the current engine and parsed inputs. */
  simulationFingerprint: string;
  prices: StatPrices;
  /** Each champion's pets (turrets, Mist Walkers, ...), for the kits that use them. */
  pets: Map<string, PetRecord[]>;
  /** The runes the simulator models (Triple Tonic). */
  runes: RuneRecord[];
  /** Champions with a simulator kit, by name. */
  kitIds: string[];
  /**
   * The duel results with item builds (npm run build:builds), when the dataset has them and
   * they are the current inputs': the build search is too slow to run in the browser.
   */
  builds?: PrecomputedBuilds;
  /** Where the builds' item records come from: the wiki module's revision and the Data Dragon version. */
  itemSources?: ItemSources;
}

/** Where the builds' items, summoner spells and runes come from, for the attribution. */
export interface ItemSources {
  title: string;
  revid: number;
  ddragon: string;
  /** The summoner spells' wiki module and revision. */
  spellData?: { title: string; revid: number };
  /** The Community Dragon version the rune catalog was checked against. */
  cdragon?: string;
}

/** The build format the build matrix plays: six items. */
export const BUILDS_FORMAT = "sixItems";

const cache = new Map<string, Promise<unknown>>();

function fetchJson<T>(path: string): Promise<T> {
  let found = cache.get(path);
  if (!found) {
    found = fetch(new URL(path, document.baseURI), { cache: "no-cache" }).then(async (response) => {
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
    const index = await fetchJson<{ dataset: string; patch: string; simulationFingerprint?: string; buildsFingerprint?: string; itemSources?: ItemSources }>("data/index.json");
    const dir = `data/${index.dataset}/`;
    const [dataset, profiles, glossary, simulated, rules, pets, runes] = await Promise.all([
      fetchJson<ChampionDataset>(`${dir}champions.json`),
      fetchJson<KitProfile[]>(`${dir}profiles.json`),
      fetchJson<Glossary>(`${dir}glossary.json`),
      fetchJson<SimulatedFile>(`${dir}simulated.json`),
      fetchJson<{ statPrices: StatPrices }>(`${dir}rules.json`),
      fetchJson<Record<string, PetRecord[]>>(`${dir}pets.json`),
      fetchJson<RuneRecord[]>(`${dir}runes.json`),
    ]);
    const champions = [...dataset.champions].sort((a, b) => a.name.localeCompare(b.name));
    const byId = new Map(champions.map((champion) => [champion.id, champion]));
    const kitIds = Object.keys(KITS)
      .filter((id) => byId.has(id))
      .sort((a, b) => (byId.get(a)?.name ?? a).localeCompare(byId.get(b)?.name ?? b));
    // Optional: a dataset without builds, or with stale ones, shows plain stats only.
    const builds = index.buildsFingerprint ? await fetchJson<PrecomputedBuilds>(`${dir}simulated-builds.json`).catch(() => undefined) : undefined;
    const currentBuilds = builds && precomputedBuildsCurrent(builds, index.dataset, index.patch, index.buildsFingerprint, BUILDS_FORMAT, kitIds) ? builds : undefined;
    return {
      dataset: index.dataset,
      patch: index.patch,
      dataUrl: new URL(dir, document.baseURI).href,
      champions,
      byId,
      profiles: new Map(profiles.map((profile) => [profile.champion, profile])),
      ledger: ledgerContext(glossary),
      simulated,
      precomputedCompatible: precomputedCompatible(simulated, index.dataset, index.patch, index.simulationFingerprint, kitIds),
      simulationFingerprint: index.simulationFingerprint ?? "legacy",
      prices: rules.statPrices,
      pets: new Map(Object.entries(pets)),
      runes,
      kitIds,
      ...(currentBuilds ? { builds: currentBuilds, ...(index.itemSources ? { itemSources: index.itemSources } : {}) } : {}),
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
