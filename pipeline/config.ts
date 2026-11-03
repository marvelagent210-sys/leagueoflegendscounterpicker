import path from "node:path";
import { fileURLToPath } from "node:url";

export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const DATA_DIR = path.join(REPO_ROOT, "data");
export const RAW_DIR = path.join(DATA_DIR, "raw");

export const USER_AGENT =
  "lol-kit-counterpicker/0.1 (+https://github.com/marvelagent210-sys/leagueoflegendscounterpicker)";

export const DDRAGON = "https://ddragon.leagueoflegends.com";
export const CDRAGON = "https://raw.communitydragon.org/latest";
import { WIKI_BASE } from "../engine/abilityText";

export { WIKI_BASE };
export const WIKI_API = `${WIKI_BASE}api.php`;
export const WIKI_LICENSE = "CC BY-SA 3.0";

/** Wiki page whose rendered table is the oracle for level-20 base stats. */
export const WIKI_LEVEL20_PAGE = "List of champions/Statistics at level 20";
export const WIKI_CHAMPION_DATA_PAGE = "Module:ChampionData/data";
/**
 * Every current item's stats, effects and limits (the item catalog, M8). Its subpages
 * "Module:ItemData/data/<item>" are an older copy that this module has moved past.
 */
export const WIKI_ITEM_DATA_PAGE = "Module:ItemData/data";
/** The wiki's summoner spell data (cooldowns, ranges, effects), read with each spell's article. */
export const WIKI_SPELL_DATA_PAGE = "Module:SpellData/data";

/**
 * The game rules item effects follow that their own text leaves out: how Energized charges
 * build, when combat ends, what omnivamp heals from, and how critical strike damage adds up.
 */
export const WIKI_ITEM_RULE_PAGES = ["Combat status", "Critical strike", "Template:Critical damage", "Template:Tip data/Energized", "Vamp"];

/** Dataset folder name, e.g. Data Dragon "16.20.1" -> "16.20". */
export function datasetName(ddragonVersion: string): string {
  const [major, minor] = ddragonVersion.split(".");
  if (!major || !minor) throw new Error(`Unexpected Data Dragon version: ${ddragonVersion}`);
  return `${major}.${minor}`;
}

/**
 * Player-facing patch name. Data Dragon's major version trails the year-based
 * patch name by 10 (Data Dragon 16.20 is patch 26.20).
 */
export function patchName(dataset: string): string {
  const [major, minor] = dataset.split(".").map(Number);
  if (major === undefined || minor === undefined) throw new Error(`Bad dataset name: ${dataset}`);
  return `${major + 10}.${minor}`;
}

export function rawDir(dataset: string): string {
  return path.join(RAW_DIR, dataset);
}

export function datasetDir(dataset: string): string {
  return path.join(DATA_DIR, dataset);
}

/**
 * Wiki pages whose lists classify abilities (every dash, every spell shield, every source
 * of each crowd control type, ...), whose definitions the interaction rules cite, and whose
 * game rules the duel simulator encodes. They are maintained by the wiki's editors and
 * pinned by revision like every other page.
 */
/**
 * Runes the simulator reads (PLAN §4.1: Udyr's Triple Tonic is the one rune it models): the
 * rune's data template, its article (whose patch history is newer than the item data), and
 * the data of the elixirs it grants.
 */
export const WIKI_RUNE_PAGES = [
  "Template:Rune data Triple Tonic",
  "Triple Tonic",
  "Module:ItemData/data/Elixir of Avarice",
  "Module:ItemData/data/Elixir of Force",
  "Module:ItemData/data/Elixir of Skill",
];

export const WIKI_GLOSSARY_PAGES = [
  // Lists of abilities by mechanic
  "Projectile",
  "Spell shield",
  "Untargetability",
  "Invulnerability",
  "Dash",
  "Blink",
  "Channel",
  "Stealth",
  "Grievous Wounds",
  "Tenacity",
  "Types of Crowd Control/Summary",
  "Types of Crowd Control/Sources",
  "Template:List of true sight abilities",
  "Template:Tip data/Minimum health threshold",
  "Template:Tip data/Resurrection",
  "Template:Tip data/Slow-immune",
  "Template:Tip data/Displacement immune",
  // Definitions cited by the interaction rules
  "Template:Tip data/Blind",
  "Template:Tip data/Dodge",
  "Template:Tip data/Block",
  "Template:Tip data/Knockdown",
  "Template:Tip data/Lunge",
  "Template:Tip data/Untargetable",
  "Template:Tip data/Stasis (buff)",
  "Template:Tip data/Spell shield",
  "Template:Tip data/Cc-immune",
  "Template:Tip data/Cleanse",
  "Template:Tip data/Tenacity",
  "Template:Tip data/Execute",
  "Template:Tip data/Cast-inhibiting crowd control",
  "Template:Tip data/Disarming crowd control",
  "Template:Tip data/Homing projectile destruction",
  "Template:Tip data/Uncancellable windup",
  "Template:Tip data/Charm",
  "Template:Tip data/Flee",
  "Template:Tip data/Taunt",
  "Template:Tip data/Berserk",
  "Template:Tip data/Sleep",
  "Template:Tip data/Polymorph",
  "Types of Crowd Control",
  "Range",
  // Game rules the duel simulator encodes (engine/rules/), and the stat gold values of the stat budget
  "Armor",
  "Magic resistance",
  "Armor penetration",
  "Magic penetration",
  "Damage",
  "Damage modifier",
  "Shield",
  "Healing",
  "Critical strike",
  "Movement speed",
  "Slow resist",
  "Haste",
  "Attack speed",
  "Basic attack",
  "Cast time",
  "Template:Rounded up to next game tick",
  "Module:Gold value/data",
];
