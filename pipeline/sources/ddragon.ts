import { DDRAGON } from "../config";
import { fetchJson, fetchText } from "../lib/http";

/** The subset of Data Dragon's championFull.json that the pipeline reads. */
export interface DDragonChampionFull {
  version: string;
  data: Record<string, DDragonChampion>;
}

export interface DDragonChampion {
  id: string;
  key: string;
  name: string;
  title: string;
  tags: string[];
  partype: string;
  image: { full: string };
  stats: Record<string, number>;
  spells: Array<{ id: string; name: string; maxrank: number; image: { full: string } }>;
  passive: { name: string; image: { full: string } };
}

export async function latestVersion(): Promise<string> {
  const versions = await fetchJson<string[]>(`${DDRAGON}/api/versions.json`);
  const latest = versions[0];
  if (!latest) throw new Error("Data Dragon returned no versions");
  return latest;
}

/** Returns the raw text so it can be cached byte-for-byte. */
export function championFullText(version: string): Promise<string> {
  return fetchText(`${DDRAGON}/cdn/${version}/data/en_US/championFull.json`);
}
