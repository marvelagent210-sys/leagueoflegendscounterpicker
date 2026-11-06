/** Compile the first four combat effects from complete, reviewed Wiki and client inputs. */
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { RuneCatalog, RuneWikiSource } from "../../runes/catalog";
import type { CombatRuneRules, RuneEffectEvidence } from "../../runes/effectRules";
import { datasetDir } from "../config";
import { loadRuneCatalog } from "./catalog";

export interface CombatRuneSourceBundle {
  schema: 1;
  dataset: string;
  patch: string;
  pages: RuneWikiSource[];
  gameData: { url: string; sha256: string };
}

export const COMBAT_RUNE_GAME_URL = "https://raw.communitydragon.org/16.21/game/perks.cdtb.bin.json";
const GAME_SHA256 = "f0212502bb1180c0920a1be7074af8de2e6d4cefe3fc51f2a0ca9e08116a2c9f";
const REVIEWED: Readonly<Record<string, { revid: number; timestamp: string; sha256: string }>> = {
  "Coup de Grace": {
    "revid": 3860002,
    "timestamp": "2025-02-06T18:25:06Z",
    "sha256": "84df929d8cf6ebbd382d6bb5461528b53f6cb3200d449e2918f330e82e516cd4"
  },
  "Cut Down": {
    "revid": 4014921,
    "timestamp": "2026-05-01T13:54:08Z",
    "sha256": "4fd3f69ad4524623dc6d35a5d87f99118000048c04546ac52d763fbf8b8c6638"
  },
  "Damage": {
    "revid": 4084890,
    "timestamp": "2026-10-13T21:42:38Z",
    "sha256": "14423dac41fd45509e3c186dc6a6ea9833e78b976e01d3b2817b3d7584a87236"
  },
  "Damage modifier": {
    "revid": 4050138,
    "timestamp": "2026-08-04T23:17:04Z",
    "sha256": "450a1a563c78a2ed0f82411d17ec654ece5b1a5ec3f6bcbf990a819d483a2856"
  },
  "Health regeneration": {
    "revid": 4073061,
    "timestamp": "2026-10-02T13:17:00Z",
    "sha256": "3dafb693e2297ad5f7c8f8ab4fab6eff20507f03cbc2822a99455f177b61779a"
  },
  "Last Stand": {
    "revid": 3926332,
    "timestamp": "2025-07-12T00:22:31Z",
    "sha256": "0d253f4a535df029f52d93b99df56bfb70a24861edaaf1707bd80241c6994b6b"
  },
  "Second Wind": {
    "revid": 4012933,
    "timestamp": "2026-04-27T18:00:51Z",
    "sha256": "41854e8f0f75189d5bb725f460616874bffd9b38b1ef1b4eac35522418dbe98b"
  },
  "Template:Rune data Coup de Grace": {
    "revid": 3859780,
    "timestamp": "2025-02-06T03:21:10Z",
    "sha256": "655a20b9492a1379d2f5606565b21f4ce4836070021bf2e887a4c7e9996418b5"
  },
  "Template:Rune data Cut Down": {
    "revid": 3859781,
    "timestamp": "2025-02-06T03:21:31Z",
    "sha256": "a31f78f4e97fa4e2b9b1484a3bf25f9d9cfdb8dc275bfbee41be2848636cfa0c"
  },
  "Template:Rune data Last Stand": {
    "revid": 3859782,
    "timestamp": "2025-02-06T03:22:08Z",
    "sha256": "669d1b6c2f5b77093f61ab19ffec1b17b4ba770badb6a7c082eea6ed296f877e"
  },
  "Template:Rune data Second Wind": {
    "revid": 3960974,
    "timestamp": "2025-10-24T16:06:20Z",
    "sha256": "b51dc3b87c2cbf6dbf23723d33d3dc05093d3ba1026d4b3d1fa0246df5215e4f"
  },
  "True damage": {
    "revid": 4052642,
    "timestamp": "2026-08-19T15:41:09Z",
    "sha256": "a2beab5644f87926658a3e991ee31f647934b6a7bf372a669a00b47fdadb381f"
  }
};
const RUNE_SOURCES = [
  { id: 8014, name: "Coup de Grace", path: 8000, slot: 3, game: "Perks/Styles/Precision/CoupDeGrace" },
  { id: 8017, name: "Cut Down", path: 8000, slot: 3, game: "Perks/Styles/Precision/CutDown" },
  { id: 8299, name: "Last Stand", path: 8000, slot: 3, game: "Perks/Styles/Precision/LastStand" },
  { id: 8444, name: "Second Wind", path: 8400, slot: 2, game: "Perks/Styles/Resolve/SecondWind" },
] as const;
const sha256 = (text: string) => createHash("sha256").update(text).digest("hex");
function requireThat(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Combat runes: ${message}`);
}
function record(value: unknown, name: string): Record<string, unknown> {
  requireThat(value !== null && typeof value === "object" && !Array.isArray(value), `${name} must be an object`);
  return value as Record<string, unknown>;
}

/** Numeric reads and evidence only; this neither equips effects nor certifies a full page. */
export function buildCombatRuneRules(catalog: RuneCatalog, bundle: CombatRuneSourceBundle, gameText: string): CombatRuneRules {
  const input = record(bundle, "source bundle");
  requireThat(input.schema === 1 && input.dataset === "16.21" && input.patch === "26.21", "source dataset or patch needs review");
  requireThat(catalog?.schema === 1 && catalog.dataset === input.dataset && catalog.patch === input.patch
    && catalog.ddragonVersion === "16.21.1" && catalog.communityDragonVersion === "16.21", "catalog versions differ from the reviewed inputs");
  const gameSource = record(input.gameData, "game source");
  requireThat(gameSource.url === COMBAT_RUNE_GAME_URL && gameSource.sha256 === GAME_SHA256, "game source version or hash needs review");
  requireThat(Array.isArray(input.pages) && input.pages.length === Object.keys(REVIEWED).length, "all twelve complete Wiki sources are required");
  const pages = new Map<string, RuneWikiSource>();
  for (const value of input.pages) {
    const page = record(value, "Wiki source");
    requireThat(typeof page.title === "string" && REVIEWED[page.title], "unexpected Wiki source title");
    const reviewed = REVIEWED[page.title]!;
    requireThat(!pages.has(page.title), `duplicate Wiki source ${page.title}`);
    requireThat(page.revid === reviewed.revid && page.timestamp === reviewed.timestamp, `${page.title} revision or timestamp needs review`);
    requireThat(typeof page.content === "string" && page.content.trim().length > 0
      && typeof page.sha256 === "string" && sha256(page.content) === page.sha256, `${page.title} content hash differs`);
    pages.set(page.title, page as unknown as RuneWikiSource);
  }
  for (const name of Object.keys(REVIEWED)) requireThat(pages.has(name), `missing Wiki source ${name}`);
  requireThat(Array.isArray(catalog.runes), "catalog rune inventory is required");
  for (const rule of RUNE_SOURCES) {
    const entries = catalog.runes.filter((rune) => rune.id === rule.id);
    requireThat(entries.length === 1, `catalog needs exactly one ${rule.name} entry`);
    const entry = entries[0]!, source = pages.get(`Template:Rune data ${rule.name}`)!;
    requireThat(entry.name === rule.name && entry.pathId === rule.path && entry.slot === rule.slot,
      `${rule.name} catalog identity or position differs`);
    requireThat(entry.wiki && entry.wiki.title === source.title && entry.wiki.revid === source.revid
      && entry.wiki.timestamp === source.timestamp && entry.wiki.content === source.content
      && entry.wiki.sha256 === source.sha256, `${rule.name} template differs from the catalog's exact source`);
  }
  let game: Record<string, unknown>;
  requireThat(typeof gameText === "string" && gameText.length > 0, "complete game source text is required");
  try { game = record(JSON.parse(gameText), "game data"); }
  catch (error) { throw new Error("Combat runes: invalid game data JSON", { cause: error }); }
  const evidence: RuneEffectEvidence[] = [];
  const quote = (page: RuneWikiSource, text: string) => {
    requireThat(page.content.includes(text), `${page.title} reviewed rule changed: ${text}`);
    if (!evidence.some((entry) => entry.title === page.title && entry.text === text)) evidence.push({ title: page.title, revid: page.revid, text });
  };
  const description = (name: string): { page: RuneWikiSource; text: string } => {
    const page = pages.get(`Template:Rune data ${name}`)!;
    const rows = page.content.split("\n").filter((line) => /^\|description\s*=/.test(line));
    requireThat(rows.length === 1, `${name} needs its complete current description`);
    quote(page, rows[0]!);
    return { page, text: rows[0]! };
  };
  const matchNumbers = (name: string, text: string, pattern: RegExp): number[] => {
    const match = pattern.exec(text);
    requireThat(match && match.length > 1, `${name} reviewed formula changed`);
    const values = match.slice(1).map(Number);
    requireThat(values.every(Number.isFinite), `${name} contains an invalid formula value`);
    return values;
  };
  const client = (name: typeof RUNE_SOURCES[number]["name"]): Record<string, unknown> => {
    const rule = RUNE_SOURCES.find((entry) => entry.name === name)!;
    const perk = record(game[rule.game], `${name} game perk`);
    requireThat(perk.mPerkId === rule.id, `${name} game ID differs`);
    return record(record(record(perk.mScript, `${name} game script`).mSpellScriptData, `${name} game script data`).mEffectAmount, `${name} game amounts`);
  };
  const agree = (name: string, amounts: Record<string, unknown>, key: string, expected: number): void => {
    const actual = amounts[key];
    // Client numbers are stored as float32; this is representation error, not a balance tolerance.
    requireThat(typeof actual === "number" && Number.isFinite(actual) && Math.abs(actual - expected) < 1e-6,
      `${name} Wiki/game ${key} disagree`);
  };

  const coup = description("Coup de Grace"), cut = description("Cut Down"), last = description("Last Stand"), wind = description("Second Wind");
  const [coupPercent, coupHealth] = matchNumbers("Coup de Grace", coup.text, /Deal ([\d.]+)% increased damage to champions below \{\{as\|([\d.]+)%/);
  const [cutPercent, cutHealth] = matchNumbers("Cut Down", cut.text, /Deal ([\d.]+)% increased damage to champions above \{\{as\|([\d.]+)%/);
  const [lastMin, lastHealth, lastMax, lastMaxHealth] = matchNumbers("Last Stand", last.text,
    /Deal ([\d.]+)% increased damage to champions while below \{\{as\|([\d.]+)%[\s\S]*up to ([\d.]+)% increased damage while below \{\{as\|([\d.]+)%/);
  const [windPercent, windSeconds] = matchNumbers("Second Wind", wind.text, /regenerate\}\} \{\{as\|([\d.]+)% of your '''missing''' health\}\} over ([\d.]+) seconds/);
  const coupGame = client("Coup de Grace"), cutGame = client("Cut Down"), lastGame = client("Last Stand"), windGame = client("Second Wind");
  agree("Coup de Grace", coupGame, "BonusPercentDamage", coupPercent! / 100);
  agree("Coup de Grace", coupGame, "EnemyHealthPercentageThreshold", coupHealth! / 100);
  // Cut Down's old max-health-difference fields remain in the client record. They are not its current rule.
  agree("Cut Down", cutGame, "BonusPercentDamage", cutPercent! / 100);
  agree("Cut Down", cutGame, "EnemyHealthPercentageThreshold", cutHealth! / 100);
  agree("Last Stand", lastGame, "MinBonusDamagePercent", lastMin! / 100);
  agree("Last Stand", lastGame, "MaxBonusDamagePercent", lastMax! / 100);
  agree("Last Stand", lastGame, "HealthThresholdStart", lastHealth! / 100);
  agree("Last Stand", lastGame, "HealthThresholdEnd", lastMaxHealth! / 100);
  agree("Second Wind", windGame, "RegenSeconds", windSeconds!);
  agree("Second Wind", windGame, "RegenPercentMax", windPercent! / 100);
  agree("Second Wind", windGame, "RegenFlat", 0);

  quote(pages.get("Coup de Grace")!, "* '''Coup de Grace''' only triggers on damage dealt after the champion is brought {{as|below 40% health}}.");
  const trueAmplification = "* Now affects {{sti|true damage}} dealt, excluding {{si|Smite}}.";
  for (const name of ["Coup de Grace", "Cut Down", "Last Stand"]) quote(pages.get(name)!, trueAmplification);
  quote(pages.get("Cut Down")!, "* {{sbc|Bug Fix:}} No longer applies its damage amplification twice.");
  quote(pages.get("Last Stand")!, "* '''Last Stand''' increases your damage output by {{pp|type='''missing''' health|key=%|key1=%|0;0;0;0;5 to 11;11;11;11|0 to 90 for 10; 99|color=health}}.");
  const trueDamage = pages.get("True damage")!;
  const trueLine = trueDamage.content.split("\n").find((line) => line.startsWith("As of patch [[V25.S1.3]]"));
  requireThat(trueLine, "True damage amplification paragraph is required"); quote(trueDamage, trueLine);
  quote(trueDamage, "True damage dealt by Jungle items ({{ii|Gustwalker Hatchling|icononly=true}}{{ii|Mosstomper Seedling|icononly=true}}{{ii|Scorchclaw Pup|icononly=true}}), {{si|Smite}} (including its upgrades), and {{si|Ignite}} cannot be amplified under any circumstance.");
  const secondWind = pages.get("Second Wind")!, regen = pages.get("Health regeneration")!;
  const hp5Line = secondWind.content.split("\n").find((line) => line.startsWith("* '''Second Wind''' grants"));
  requireThat(hp5Line, "Second Wind's HP5 rule is required"); quote(secondWind, hp5Line);
  const [hpPeriod, hpPercent, hpDuration] = matchNumbers("Second Wind HP5", hp5Line, /\{\{ap\|([\d.]+)\*([\d.]+)\/([\d.]+)\}\}%/);
  requireThat(hpPeriod === 5 && hpPercent === windPercent && hpDuration === windSeconds, "Second Wind HP5 and duration disagree");
  for (const text of ["** Reduced to or equal to [[Damage#0_Damage_Instances|0 damage]].", "** Dealt to {{tip|shield|shields}}.", "** Absorbed by {{tip|invulnerable|invulnerability}}."]) quote(secondWind, text);
  const [tickInterval] = matchNumbers("Health regeneration", regen.content, /Health regeneration occurs in \{\{fd\|([\d.]+)\}\}-second intervals/);
  requireThat(tickInterval === 0.5, "health regeneration interval needs review");
  quote(regen, "Health regeneration occurs in {{fd|0.5}}-second intervals");
  quote(regen, "Note that {{ri|Revitalize}} and {{sti|Heal and Shield Power}} do not affect health regeneration");
  quote(pages.get("Damage")!, "* '''Pet:''' Represents all damage originating from [[champion summoned units]], also to defer attribution to their summoner.");
  const modifiers = pages.get("Damage modifier")!;
  quote(modifiers, "* {{sbc|Undocumented:}} Modifiers to damage dealt now stack additively instead of multiplicatively.");
  quote(modifiers, "** {{note}} Modifiers to damage received still stack multiplicatively.");
  quote(modifiers, "* {{sbc|Undocumented:}} Damage amplifiers are now dealt as a separate damage instance, interacting with pre-modifier effects (e.g {{cai|E|Illaoi}}, {{cai|R|Zed}}).");
  // Reject edits elsewhere too: a reviewed revision is retained in full, not reduced to favorable excerpts.
  for (const page of pages.values()) requireThat(page.sha256 === REVIEWED[page.title]!.sha256, `${page.title} full reviewed revision changed`);
  requireThat(sha256(gameText) === GAME_SHA256, "complete reviewed game source changed");
  return {
    schema: 1, dataset: "16.21", patch: "26.21",
    coupDeGrace: { healthThreshold: coupHealth! / 100, damageIncrease: coupPercent! / 100 },
    cutDown: { healthThreshold: cutHealth! / 100, damageIncrease: cutPercent! / 100 },
    lastStand: { healthThreshold: lastHealth! / 100, maximumHealthThreshold: lastMaxHealth! / 100,
      minimumDamageIncrease: lastMin! / 100, maximumDamageIncrease: lastMax! / 100 },
    secondWind: {
      duration: windSeconds!, missingHealthPerSecond: hpPercent! / 100 / hpDuration!, tickInterval,
      // The HP5 article does not establish snapshot or pulse-phase timing. This is an explicit model interpretation.
      missingHealthModel: "current-at-regeneration-tick",
    }, evidence,
  };
}

/** Offline committed inputs only; a directory cannot relabel sources from another patch. */
export async function loadCombatRuneRules(dataset: string, catalog?: RuneCatalog): Promise<CombatRuneRules> {
  requireThat(dataset === "16.21", "expected the reviewed dataset 16.21");
  const source = catalog ?? await loadRuneCatalog(path.join(datasetDir(dataset), "rune-sources"));
  const [wikiText, gameText] = await Promise.all([
    readFile(path.join(datasetDir(dataset), "rune-combat-sources.json"), "utf8"),
    readFile(path.join(datasetDir(dataset), "rune-game-perks.json"), "utf8"),
  ]);
  return buildCombatRuneRules(source, JSON.parse(wikiText) as CombatRuneSourceBundle, gameText);
}
