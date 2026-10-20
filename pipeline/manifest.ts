/** Provenance for one dataset. Committed next to the generated data. */
export interface Manifest {
  /** Data Dragon major.minor, e.g. "16.20". Names the dataset folders. */
  dataset: string;
  /** Player-facing patch name, e.g. "26.20". */
  patch: string;
  fetchedAt: string;
  ddragon: { version: string; champions: number };
  cdragon: {
    version: string;
    championDetails: number;
    /** Character names whose game data files were fetched, e.g. "Darius", "GnarBig". */
    characterRecords: string[];
  };
  wiki: {
    site: string;
    license: string;
    championData: { title: string; revid: number };
    level20Table: { title: string; revid: number };
    dataTemplates: { pages: number; missing: string[] };
    /** Glossary pages (WIKI_GLOSSARY_PAGES); fetched with the rest, or alone with --only glossary. */
    glossary?: { pages: number; missing: string[]; fetchedAt: string };
    /** Champion pages with pet infoboxes (turrets, Mist Walkers, ...); fetched with the rest, or alone with --only pets. */
    petPages?: { pages: number; checked: number; missing: string[]; fetchedAt: string };
    /** Rune and elixir pages (WIKI_RUNE_PAGES); fetched with the rest, or alone with --only runes. */
    runePages?: { pages: number; missing: string[]; fetchedAt: string };
  };
  /**
   * The item catalog's sources (M8): Data Dragon's item list, the items' game data file and
   * the wiki's item data module. Fetched with the rest, or alone with --only items.
   */
  items?: { ddragonVersion: string; cdragonVersion: string; itemData: { title: string; revid: number }; fetchedAt: string };
}
