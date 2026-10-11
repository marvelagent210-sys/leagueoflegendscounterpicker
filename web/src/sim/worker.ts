/** A simulation worker: loads the dataset once, then runs the matchups it is sent. */
import type { AbilityRecord, PetRecord } from "../../../engine/abilities";
import type { StatPrices } from "../../../engine/budget";
import type { ChampionDataset } from "../../../engine/types";
import type { WorkerRequest, WorkerResponse } from "./protocol";
import { type SimSource, runMatchup } from "./run";

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null;
  postMessage(message: WorkerResponse): void;
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Couldn't load ${url} (${response.status})`);
  return (await response.json()) as T;
}

let source: Promise<SimSource> | undefined;

function load(dataUrl: string): Promise<SimSource> {
  source ??= (async () => {
    const [dataset, rules, pets] = await Promise.all([
      fetchJson<ChampionDataset>(`${dataUrl}champions.json`),
      fetchJson<{ statPrices: StatPrices }>(`${dataUrl}rules.json`),
      fetchJson<Record<string, PetRecord[]>>(`${dataUrl}pets.json`),
    ]);
    const byId = new Map(dataset.champions.map((champion) => [champion.id, champion]));
    const records = new Map<string, Promise<AbilityRecord[]>>();
    return {
      champion(id: string) {
        const champion = byId.get(id);
        if (!champion) throw new Error(`No champion ${id}`);
        return champion;
      },
      records(id: string) {
        let found = records.get(id);
        if (!found) {
          found = fetchJson<AbilityRecord[]>(`${dataUrl}abilities/${id}.json`);
          records.set(id, found);
        }
        return found;
      },
      prices: rules.statPrices,
      pets: (id: string) => pets[id] ?? [],
    };
  })();
  return source;
}

scope.onmessage = (event) => {
  const request = event.data;
  load(request.dataUrl)
    .then((data) => runMatchup(data, request.you, request.enemy, request.settings, request.log))
    .then((run) => scope.postMessage({ id: request.id, run }))
    .catch((error: unknown) => scope.postMessage({ id: request.id, error: error instanceof Error ? error.message : String(error) }));
};
