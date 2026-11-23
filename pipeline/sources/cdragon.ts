import { CDRAGON } from "../config";
import { fetchJson, fetchText } from "../lib/http";

const GAME_DATA = `${CDRAGON}/plugins/rcp-be-lol-game-data/global/default/v1`;

export async function contentVersion(): Promise<string> {
  const metadata = await fetchJson<{ version: string }>(`${CDRAGON}/content-metadata.json`);
  return metadata.version;
}

export function championSummaryText(): Promise<string> {
  return fetchText(`${GAME_DATA}/champion-summary.json`);
}

/** Client champion details: ability descriptions plus per-rank cooldowns, costs and ranges. */
export function championDetailText(championKey: number): Promise<string> {
  return fetchText(`${GAME_DATA}/champions/${championKey}.json`);
}

/**
 * A character's game data file (base stats, attack data, spell data), converted to JSON
 * by CommunityDragon. `name` is the character's internal name, e.g. "Darius" or "GnarBig".
 */
export function characterBinText(name: string): Promise<string> {
  const folder = name.toLowerCase();
  return fetchText(`${CDRAGON}/game/data/characters/${folder}/${folder}.bin.json`);
}

/** The items' game data file: every item's stats and price, and the item groups that cap how many of a kind a build holds. */
export function itemsBinText(): Promise<string> {
  return fetchText(`${CDRAGON}/game/items.cdtb.bin.json`);
}
