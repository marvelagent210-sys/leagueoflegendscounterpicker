import type { Manifest } from "./manifest";
import type { Level20Row } from "./parse/level20Table";

/** The committed oracle file: data/<dataset>/oracle/level20.json. */
export interface Level20Oracle {
  source: { title: string; revid: number; championDataRevid: number };
  rows: Level20Row[];
}

export function normalizeOracle(manifest: Manifest, rows: Level20Row[]): Level20Oracle {
  return {
    source: {
      title: manifest.wiki.level20Table.title,
      revid: manifest.wiki.level20Table.revid,
      championDataRevid: manifest.wiki.championData.revid,
    },
    rows,
  };
}
