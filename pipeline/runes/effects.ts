/** Compile supported manual combat effects from complete, reviewed Wiki and client inputs. */
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { RuneCatalog, RuneWikiSource } from "../../runes/catalog";
import type { CombatRuneRules, RuneEffectEvidence } from "../../runes/effectRules";
import { TOP_LANE_MAX_LEVEL } from "../../engine/stats";
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
  "Absorb Life": {
    "revid": 3980915,
    "timestamp": "2026-01-02T12:22:36Z",
    "sha256": "66bdc1876b2f0fe619f648366e4d9a521602d62d1b93ec285e994ac73aa95e3d"
  },
  "Champion ability": {
    "revid": 4086204,
    "timestamp": "2026-10-18T01:31:34Z",
    "sha256": "9a842b853ac7df583520b0928169b19090c7c1dd755e6bd6cb7b56024562058b"
  },
  "Champion summoned units": {
    "revid": 4023248,
    "timestamp": "2026-05-28T12:29:08Z",
    "sha256": "466db9a514495259e6601adc83ea3916f98b368d6774be572a878846fa44021a"
  },
  "Cooldown": {
    "revid": 4050188,
    "timestamp": "2026-08-05T12:42:06Z",
    "sha256": "2f8a8e06693d8513310eaa0650661c0899b8e3a31c8906c46ba83e3eee38ede7"
  },
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
  "Haste": {
    "revid": 4070414,
    "timestamp": "2026-09-29T20:47:34Z",
    "sha256": "927ef62dbdbfc70cdc10c78d245991e714c83f457306d73d285d21a487d27ceb"
  },
  "Haste/Reducing ability cooldowns": {
    "revid": 4039444,
    "timestamp": "2026-07-04T04:07:14Z",
    "sha256": "d98ec7aaff167b448d7b74fb89b9352ee987263ca66093f8a7520bc61dd29df3"
  },
  "Healing": {
    "revid": 4041638,
    "timestamp": "2026-07-10T06:45:09Z",
    "sha256": "ca0a5ee26be2bea722614b78de604547314e8b0a92fa1ba08c087382ad99c9d4"
  },
  "Health regeneration": {
    "revid": 4073061,
    "timestamp": "2026-10-02T13:17:00Z",
    "sha256": "3dafb693e2297ad5f7c8f8ab4fab6eff20507f03cbc2822a99455f177b61779a"
  },
  "Kill": {
    "revid": 4053216,
    "timestamp": "2026-08-23T01:05:22Z",
    "sha256": "8568c501e84f3e775932fd0282a3c7d94794f962f81792820b1803a903a984b2"
  },
  "Last Stand": {
    "revid": 3926332,
    "timestamp": "2025-07-12T00:22:31Z",
    "sha256": "0d253f4a535df029f52d93b99df56bfb70a24861edaaf1707bd80241c6994b6b"
  },
  "Legend: Alacrity": {
    "revid": 3980881,
    "timestamp": "2026-01-02T11:57:29Z",
    "sha256": "ffc62c0f8a1008ec2a2fb97f78fc1d9920213fcf313ab55dbd4659e55f01bdaa"
  },
  "Legend: Haste": {
    "revid": 3980882,
    "timestamp": "2026-01-02T11:57:55Z",
    "sha256": "da7a292238cff3554e3888f68ef81e4203abfb2b85c7e41d1618684a6d06fbd3"
  },
  "Second Wind": {
    "revid": 4012933,
    "timestamp": "2026-04-27T18:00:51Z",
    "sha256": "41854e8f0f75189d5bb725f460616874bffd9b38b1ef1b4eac35522418dbe98b"
  },
  "Takedown": {
    "revid": 4081718,
    "timestamp": "2026-10-09T12:20:53Z",
    "sha256": "d8a5380cd2e742f6f76b0a0b63040f67e89c181eb27c25c48a1443cbde36229b"
  },
  "Template:Data Udyr/Bridge Between": {
    "revid": 3983420,
    "timestamp": "2026-01-12T02:24:27Z",
    "sha256": "91a9df8f18aee2b6a796592d098eeff24b5e7b34773ee98bc7a10caccc83988e"
  },
  "Template:Data Udyr/Wingborne Storm": {
    "revid": 4008208,
    "timestamp": "2026-04-14T05:41:32Z",
    "sha256": "f7283a8ebc94c8a1dfcba79840251ac13a314d2bfb478eb307bb1f60732d73b6"
  },
  "Template:Rune data Absorb Life": {
    "revid": 3997095,
    "timestamp": "2026-03-06T17:27:29Z",
    "sha256": "d494e4a0c5f9b2262e2426108789ea4da00007d7b3ebf9b4323fa29dfe5aa538"
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
  "Template:Rune data Legend: Alacrity": {
    "revid": 3958705,
    "timestamp": "2025-10-10T09:39:17Z",
    "sha256": "7813d6e3c06cfdceec4e376be6909ccc618ea41ee52d21ed904010a09868056e"
  },
  "Template:Rune data Legend: Haste": {
    "revid": 3958696,
    "timestamp": "2025-10-10T09:26:49Z",
    "sha256": "892804ab9e9eb64530b55b4b89b2cc7df78b7dee878eb2119d65de9d713711be"
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
  },
  "Udyr": {
    "revid": 3991262,
    "timestamp": "2026-02-12T19:03:05Z",
    "sha256": "0e696537af66bb2e5371d2af96458fe9d5b1f6e4b87cc29e252eea0192104fc0"
  },
  "Unit": {
    "revid": 4085583,
    "timestamp": "2026-10-15T15:33:50Z",
    "sha256": "1d753f71725a446cbb4fe8d2c0e7866fc46a9077f032f10ecea1db2fe12c253a"
  },
  "Health": {
    "revid": 4073062,
    "timestamp": "2026-10-02T13:19:01Z",
    "sha256": "c78ab307b179e0d780c33cf8abfc31dadb091be2cead0fc264d0d1632351a664"
  },
  "Legend: Bloodline": {
    "revid": 4021767,
    "timestamp": "2026-05-21T06:14:37Z",
    "sha256": "3df918a5ed1b563451a00945316905df648dce25788cb248b31cd5ff510ce42f"
  },
  "Life steal": {
    "revid": 4060425,
    "timestamp": "2026-09-09T23:47:53Z",
    "sha256": "af41dac470d9a2171ae000c03326fb7e5cc8a7fffe13dfabb3e45ccf95313ea9"
  },
  "Template:Data Galio/Shield of Durand": {
    "revid": 3990299,
    "timestamp": "2026-02-07T07:08:21Z",
    "sha256": "de0eb4c03d6bbff6a2803dd6e4ff3bdd7ffd58fe59c45da1c3d5be4a3feac22d"
  },
  "Template:Data K'Sante/All Out": {
    "revid": 4051537,
    "timestamp": "2026-08-12T20:43:25Z",
    "sha256": "4ba35fd0d46bd5d6c982b4ed6ddc6f73664e9f571e1e5c1fa41a6b12ef45dd58"
  },
  "Template:Data Kled/Dismounted Skaarl the Cowardly Lizard": {
    "revid": 4038397,
    "timestamp": "2026-06-30T09:32:46Z",
    "sha256": "12b043731a0f2d4bd116fcf4ceb4b76d5b5c44b1cf2733687b54a29d0bdd303c"
  },
  "Template:Data Kled/Skaarl the Cowardly Lizard": {
    "revid": 4058479,
    "timestamp": "2026-09-03T17:35:19Z",
    "sha256": "320e8686665acf32777cc82dff12256979ad812bf2a7955b8cd54715e2eb6390"
  },
  "Template:Data Malphite/Granite Shield": {
    "revid": 3973718,
    "timestamp": "2025-12-12T09:23:57Z",
    "sha256": "33c5435118fc69603feb6b583c803932dc969251fd76766705ce79ab85428de9"
  },
  "Template:Data Ornn/Living Forge": {
    "revid": 4089066,
    "timestamp": "2026-10-22T20:31:26Z",
    "sha256": "19e82b0d0f97583306d0f2abea77bd335e480e5664c70b9e7d87cc9829457da3"
  },
  "Template:Data Pyke/Gift of the Drowned Ones": {
    "revid": 4007005,
    "timestamp": "2026-04-09T16:09:25Z",
    "sha256": "fb56ad11ff45c4ef612b81209c3aa57633b1b475645cb16cfcb8253cbb186401"
  },
  "Template:Data Vladimir/Crimson Pact": {
    "revid": 4073468,
    "timestamp": "2026-10-02T20:04:37Z",
    "sha256": "83b1db52ff54ad799021a0cadcabc0e8211db8141550dab4ef885a9f4a3e0d6c"
  },
  "Template:Rune data Legend: Bloodline": {
    "revid": 3971359,
    "timestamp": "2025-12-02T21:39:42Z",
    "sha256": "c9f5c1ca762b135a41c6be7f42555b471231b304ad7761237d89c9ad229e13c7"
  },
  "Assist": {
    "revid": 4016680,
    "timestamp": "2026-05-12T09:59:03Z",
    "sha256": "f65310a33c1eb7496b86af7b46a28cd465b43fe7884d9c6745bf9b3b76494d1e"
  },
  "Heal and shield power": {
    "revid": 4021804,
    "timestamp": "2026-05-21T15:27:59Z",
    "sha256": "4ed9bf176a6c83956f5fc9997ec035b55b37b7d0d2e1bebe420b21367d44c87c"
  },
  "Template:Rune data Triumph": {
    "revid": 3825924,
    "timestamp": "2024-11-27T23:39:48Z",
    "sha256": "45f9059f1e4828ca23955f2eacf7a8555f5589e2aec5f29f7b89937a3e9d13f6"
  },
  "Triumph": {
    "revid": 3980916,
    "timestamp": "2026-01-02T12:22:57Z",
    "sha256": "686cf579e3adf19602275258eba63dfee2404c807c9218693ad7b8d45121f651"
  },
  "Template:Healing modifiers": {
    "revid": 4021803,
    "timestamp": "2026-05-21T15:27:06Z",
    "sha256": "be12d5fbff797a03e87385dd2fc92bb56582f70ce0f82bed0f03261bbb908d5c"
  }
};
const RUNE_SOURCES = [
  { id: 9101, name: "Absorb Life", path: 8000, slot: 1, game: "Perks/Styles/Precision/AbsorbLife" },
  { id: 9111, name: "Triumph", path: 8000, slot: 1, game: "Perks/Styles/Precision/Triumph" },
  { id: 8014, name: "Coup de Grace", path: 8000, slot: 3, game: "Perks/Styles/Precision/CoupDeGrace" },
  { id: 8017, name: "Cut Down", path: 8000, slot: 3, game: "Perks/Styles/Precision/CutDown" },
  { id: 8299, name: "Last Stand", path: 8000, slot: 3, game: "Perks/Styles/Precision/LastStand" },
  { id: 9103, name: "Legend: Bloodline", path: 8000, slot: 2, game: "Perks/Styles/Precision/LegendBloodline" },
  { id: 9104, name: "Legend: Alacrity", path: 8000, slot: 2, game: "Perks/Styles/Precision/LegendAlacrity" },
  { id: 9105, name: "Legend: Haste", path: 8000, slot: 2, game: "Perks/Styles/Precision/LegendHaste" },
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
  requireThat(Array.isArray(input.pages) && input.pages.length === Object.keys(REVIEWED).length, `all ${Object.keys(REVIEWED).length} complete Wiki sources are required`);
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
  const clientData = (name: typeof RUNE_SOURCES[number]["name"]): Record<string, unknown> => {
    const rule = RUNE_SOURCES.find((entry) => entry.name === name)!;
    const perk = record(game[rule.game], `${name} game perk`);
    requireThat(perk.mPerkId === rule.id, `${name} game ID differs`);
    return record(record(perk.mScript, `${name} game script`).mSpellScriptData, `${name} game script data`);
  };
  const client = (name: typeof RUNE_SOURCES[number]["name"]): Record<string, unknown> =>
    record(clientData(name).mEffectAmount, `${name} game amounts`);
  const agree = (name: string, amounts: Record<string, unknown>, key: string, expected: number): void => {
    const actual = amounts[key];
    // Client numbers are stored as float32; this is representation error, not a balance tolerance.
    requireThat(typeof actual === "number" && Number.isFinite(actual) && Math.abs(actual - expected) < 1e-6,
      `${name} Wiki/game ${key} disagree`);
  };

  const alacrity = description("Legend: Alacrity");
  const [alacrityBase, alacrityPerStack, alacrityMaxStacks] = matchNumbers("Legend: Alacrity", alacrity.text,
    /\{\{#vardefineecho:basealacrity\|([\d.]+)\}\}[\s\S]*\{\{#vardefineecho:scalingalacrity\|([\d.]+)\}\}[\s\S]*\{\{#var:scalingalacrity\}\}\*(\d+)/);
  const legendDescriptions = alacrity.page.content.split("\n").filter((line) => /^\|description2\s*=/.test(line));
  requireThat(legendDescriptions.length === 1, "Legend: Alacrity needs its complete current point description");
  quote(alacrity.page, legendDescriptions[0]!);
  const [legendPointsPerStack, legendMaximum] = matchNumbers("Legend: Alacrity points", legendDescriptions[0]!,
    /Gain ''Legend'' stacks for every (\d+) points earned, up to (\d+):/);
  requireThat(alacrityMaxStacks === legendMaximum, "Legend: Alacrity maximum stack descriptions disagree");
  const legendReward = (name: string, pattern: RegExp): number => {
    const rows = alacrity.page.content.split("\n").filter((line) => pattern.test(line));
    requireThat(rows.length === 1, `Legend: Alacrity needs its current ${name} point rule`);
    quote(alacrity.page, rows[0]!);
    return matchNumbers(`Legend: Alacrity ${name}`, rows[0]!, pattern)[0]!;
  };
  const championKillPoints = legendReward("champion", /^\* (\d+) points for champion \{\{tip\|takedown\|takedowns\}\}$/);
  const epicPoints = legendReward("epic monster", /^\* (\d+) points for epic monster \{\{tip\|takedown\|takedowns\}\}$/);
  const largeMonsterPoints = legendReward("large monster", /^\* (\d+) points for large monster kills$/);
  const minionPoints = legendReward("minion", /^\* (\d+) points for minion kills$/);
  requireThat([legendPointsPerStack, legendMaximum, championKillPoints, epicPoints, largeMonsterPoints, minionPoints]
    .every((value) => Number.isSafeInteger(value) && value! > 0)
    && Number.isSafeInteger(legendPointsPerStack! * legendMaximum!), "Legend: Alacrity needs positive safe integer point and stack rules");
  const alacrityGame = client("Legend: Alacrity");
  agree("Legend: Alacrity", alacrityGame, "AttackSpeedBase", alacrityBase! / 100);
  agree("Legend: Alacrity", alacrityGame, "AttackSpeedPerStack", alacrityPerStack! / 100);
  agree("Legend: Alacrity", alacrityGame, "MaxLegendStacks", alacrityMaxStacks!);
  agree("Legend: Alacrity", alacrityGame, "LargeMonsterKillValue", largeMonsterPoints);
  agree("Legend: Alacrity", alacrityGame, "MinionKillValue", minionPoints);
  // The client retains three opaque 100-valued keys. They are covered by the
  // complete client hash, not relabeled as decoded reward/threshold semantics.
  // The exact Wiki point rules above establish the champion/epic/stack values.

  const haste = description("Legend: Haste");
  const [hastePerStack, hasteMaximum] = matchNumbers("Legend: Haste", haste.text,
    /\{\{fd\|([\d.]+)\}\} basic ability haste[\s\S]*up to \{\{as\|([\d.]+)\|ability haste\}\} at maximum stacks/);
  const hastePointDescriptions = haste.page.content.split("\n").filter((line) => /^\|description2\s*=/.test(line));
  requireThat(hastePointDescriptions.length === 1, "Legend: Haste needs its complete current point description");
  quote(haste.page, hastePointDescriptions[0]!);
  const [hastePointsPerStack, hasteMaxStacks] = matchNumbers("Legend: Haste points", hastePointDescriptions[0]!,
    /Gain ''Legend'' stacks for every (\d+) points earned, up to (\d+):/);
  const hasteReward = (name: string, pattern: RegExp): number => {
    const rows = haste.page.content.split("\n").filter((line) => pattern.test(line));
    requireThat(rows.length === 1, `Legend: Haste needs its current ${name} point rule`);
    quote(haste.page, rows[0]!);
    return matchNumbers(`Legend: Haste ${name}`, rows[0]!, pattern)[0]!;
  };
  const hasteChampionPoints = hasteReward("champion", /^\* (\d+) points for champion \{\{tip\|takedown\|takedowns\}\}$/);
  const hasteEpicPoints = hasteReward("epic monster", /^\* (\d+) points for epic monster \{\{tip\|takedown\|takedowns\}\}$/);
  const hasteLargeMonsterPoints = hasteReward("large monster", /^\* (\d+) points for large monster kills$/);
  const hasteMinionPoints = hasteReward("minion", /^\* (\d+) points for minion kills$/);
  requireThat([hastePointsPerStack, hasteMaxStacks, hasteChampionPoints, hasteEpicPoints, hasteLargeMonsterPoints, hasteMinionPoints]
    .every((value) => Number.isSafeInteger(value) && value! > 0)
    && Number.isSafeInteger(hastePointsPerStack! * hasteMaxStacks!), "Legend: Haste needs positive safe integer point and stack rules");
  requireThat(hastePerStack! > 0 && hastePerStack! * hasteMaxStacks! === hasteMaximum, "Legend: Haste maximum haste and stack descriptions disagree");
  const hasteGame = client("Legend: Haste");
  agree("Legend: Haste", hasteGame, "HasteBase", 0);
  agree("Legend: Haste", hasteGame, "HastePerStack", hastePerStack!);
  agree("Legend: Haste", hasteGame, "MaxLegendStacks", hasteMaxStacks!);
  agree("Legend: Haste", hasteGame, "LargeMonsterKillValue", hasteLargeMonsterPoints);
  agree("Legend: Haste", hasteGame, "MinionKillValue", hasteMinionPoints);
  // Haste's three opaque 100-valued fields remain hash-sealed, just as Alacrity's do.
  // Its complete Wiki template establishes the threshold and champion/epic awards.

  const bloodline = description("Legend: Bloodline");
  const [bloodlinePerStackPercent, bloodlineDescriptionStacks, bloodlineBonusHealth] = matchNumbers("Legend: Bloodline", bloodline.text,
    /\{\{#vardefineecho:scalingbloodline\|([\d.]+)\}\}% life steal[\s\S]*\{\{#var:scalingbloodline\}\}\*(\d+)\}\}[\s\S]*at maximum stacks, at which you also gain \{\{as\|\{\{#vardefineecho:hpbloodline\|([\d.]+)\}\} '''bonus''' health\}\}/);
  const bloodlinePointDescriptions = bloodline.page.content.split("\n").filter((line) => /^\|description2\s*=/.test(line));
  requireThat(bloodlinePointDescriptions.length === 1, "Legend: Bloodline needs its complete current point description");
  quote(bloodline.page, bloodlinePointDescriptions[0]!);
  const [bloodlinePointsPerStack, bloodlineMaxStacks] = matchNumbers("Legend: Bloodline points", bloodlinePointDescriptions[0]!,
    /Gain ''Legend'' stacks for every (\d+) points earned, up to (\d+):/);
  requireThat(bloodlineDescriptionStacks === bloodlineMaxStacks, "Legend: Bloodline maximum stack descriptions disagree");
  const bloodlineReward = (name: string, pattern: RegExp): number => {
    const rows = bloodline.page.content.split("\n").filter((line) => pattern.test(line));
    requireThat(rows.length === 1, `Legend: Bloodline needs its current ${name} point rule`);
    quote(bloodline.page, rows[0]!);
    return matchNumbers(`Legend: Bloodline ${name}`, rows[0]!, pattern)[0]!;
  };
  const bloodlineChampionPoints = bloodlineReward("champion", /^\* (\d+) points for champion \{\{tip\|takedown\|takedowns\}\}$/);
  const bloodlineEpicPoints = bloodlineReward("epic monster", /^\* (\d+) points for epic monster \{\{tip\|takedown\|takedowns\}\}$/);
  const bloodlineLargeMonsterPoints = bloodlineReward("large monster", /^\* (\d+) points for large monster kills$/);
  const bloodlineMinionPoints = bloodlineReward("minion", /^\* (\d+) points for minion kills$/);
  requireThat([bloodlinePointsPerStack, bloodlineMaxStacks, bloodlineChampionPoints, bloodlineEpicPoints,
    bloodlineLargeMonsterPoints, bloodlineMinionPoints].every((value) => Number.isSafeInteger(value) && value! > 0)
    && Number.isSafeInteger(bloodlinePointsPerStack! * bloodlineMaxStacks!), "Legend: Bloodline needs positive safe integer point and stack rules");
  requireThat(bloodlinePerStackPercent! > 0 && bloodlineBonusHealth! > 0
    && Number.isFinite(bloodlinePerStackPercent! * bloodlineMaxStacks!), "Legend: Bloodline needs finite positive life steal and cap health");
  const bloodlinePerk = record(game["Perks/Styles/Precision/LegendBloodline"], "Legend: Bloodline game perk");
  requireThat(bloodlinePerk.mPerkName === "LegendBloodline"
    && record(bloodlinePerk.mScript, "Legend: Bloodline game script").mSpellScriptName
      === "ASSETS/Perks/Styles/Precision/LegendBloodline/LegendBloodline.lua", "Legend: Bloodline game name or script path differs");
  const bloodlineGame = client("Legend: Bloodline");
  agree("Legend: Bloodline", bloodlineGame, "LifeStealBase", 0);
  // Unlike Alacrity's fraction-valued client fields, these values are percentages.
  agree("Legend: Bloodline", bloodlineGame, "LifeStealPerStack", bloodlinePerStackPercent!);
  agree("Legend: Bloodline", bloodlineGame, "MaxLegendStacks", bloodlineMaxStacks!);
  agree("Legend: Bloodline", bloodlineGame, "BonusHealth", bloodlineBonusHealth!);
  agree("Legend: Bloodline", bloodlineGame, "LargeMonsterKillValue", bloodlineLargeMonsterPoints);
  agree("Legend: Bloodline", bloodlineGame, "MinionKillValue", bloodlineMinionPoints);
  // The three opaque 100-valued client fields remain unnamed. The complete Wiki
  // point description establishes champion/epic rewards and the stack threshold.

  const absorb = description("Absorb Life");
  const [healBase, firstRate, firstLevels, secondRate, secondLevels, finalRate, formulaMaximum] = matchNumbers("Absorb Life", absorb.text,
    /Killing an enemy \{\{tip\|heals\}\} you for \{\{pp\|([\d.]+); then \+([\d.]+)\*x for (\d+);then \+([\d.]+)\*x for (\d+); then \+([\d.]+)\*x\|1 to (\d+) by 1\|/);
  requireThat(TOP_LANE_MAX_LEVEL === 20 && formulaMaximum === TOP_LANE_MAX_LEVEL
    && firstLevels! > 0 && secondLevels! > 0 && firstLevels! + secondLevels! < formulaMaximum! - 1,
  "Absorb Life needs its explicit level-20 formula and reviewed breakpoints");
  const healAt = (level: number) => healBase!
    + Math.min(level - 1, firstLevels!) * firstRate!
    + Math.min(Math.max(0, level - 1 - firstLevels!), secondLevels!) * secondRate!
    + Math.max(0, level - 1 - firstLevels! - secondLevels!) * finalRate!;
  const absorbData = clientData("Absorb Life");
  const calculation = record(record(absorbData.mCalculations, "Absorb Life game calculations").HealAmount, "Absorb Life HealAmount calculation");
  requireThat(calculation.__type === "GameCalculation" && Array.isArray(calculation.mFormulaParts)
    && calculation.mFormulaParts.length === 1, "Absorb Life needs exactly one reviewed HealAmount calculation part");
  const part = record(calculation.mFormulaParts[0], "Absorb Life HealAmount formula part");
  requireThat(part.__type === "ByCharLevelBreakpointsCalculationPart" && Array.isArray(part.mBreakpoints)
    && part.mBreakpoints.length === 2, "Absorb Life needs the reviewed character-level breakpoint calculation");
  agree("Absorb Life", part, "mLevel1Value", healBase!);
  agree("Absorb Life", part, "mInitialBonusPerLevel", firstRate!);
  const firstBreakpoint = record(part.mBreakpoints[0], "Absorb Life first breakpoint");
  const secondBreakpoint = record(part.mBreakpoints[1], "Absorb Life second breakpoint");
  requireThat(firstBreakpoint.__type === "Breakpoint" && secondBreakpoint.__type === "Breakpoint",
    "Absorb Life needs reviewed level breakpoint types");
  agree("Absorb Life first breakpoint", firstBreakpoint, "mLevel", firstLevels! + 2);
  agree("Absorb Life first breakpoint", firstBreakpoint, "mBonusPerLevelAtAndAfter", secondRate!);
  agree("Absorb Life second breakpoint", secondBreakpoint, "mLevel", firstLevels! + secondLevels! + 2);
  agree("Absorb Life second breakpoint", secondBreakpoint, "mBonusPerLevelAtAndAfter", finalRate!);
  // TooltipMaxHeal is a level-18 display endpoint, not a level-20 formula cap.
  // The explicit Wiki level domain and complete client breakpoint calculation
  // supply the actual rule used by this level-20 simulator.
  const absorbHeal = healAt(TOP_LANE_MAX_LEVEL);
  requireThat(Number.isFinite(absorbHeal) && absorbHeal > 0, "Absorb Life needs finite positive level-20 healing");

  const triumph = description("Triumph");
  const [triumphMaximumPercent, triumphMissingPercent, triumphBonusGold, triumphDelay] = matchNumbers("Triumph", triumph.text,
    /^\|description\s*= \{\{sbc\|Passive:\}\} Scoring a \{\{tip\|takedown\}\} against an enemy champion \{\{tip\|heals\}\} you for \{\{as\|\{\{fd\|([\d.]+)\}\}% of your '''maximum''' health\}\} \{\{as\|\(\+ ([\d.]+)% of your '''missing''' health\)\}\} and grants you an additional \{\{g\|([\d.]+)\}\}, both after a ([\d.]+)-second delay\.$/);
  requireThat(triumphMaximumPercent! > 0 && triumphMaximumPercent! < 100
    && triumphMissingPercent! > 0 && triumphMissingPercent! < 100 && triumphDelay! > 0
    && Number.isSafeInteger(triumphBonusGold) && triumphBonusGold! > 0,
  "Triumph needs finite positive healing ratios, delay and integer economic gold");
  const triumphPerk = record(game["Perks/Styles/Precision/Triumph"], "Triumph game perk");
  requireThat(triumphPerk.__type === "Perk" && triumphPerk.mPerkName === "Triumph"
    && record(triumphPerk.mScript, "Triumph game script").mSpellScriptName
      === "ASSETS/Perks/Styles/Precision/Triumph.lua", "Triumph game name, type or script path differs");
  // Only the normal mode effect amounts establish this Summoner's Rift rule.
  // ARAM/KINGPORO overrides and the short tooltip are not formula inputs.
  const triumphGame = client("Triumph");
  agree("Triumph", triumphGame, "TriumphMaxHealthRestored", triumphMaximumPercent! / 100);
  agree("Triumph", triumphGame, "MissingHealthRestored", triumphMissingPercent! / 100);
  agree("Triumph", triumphGame, "BonusGold", triumphBonusGold!);
  const triumphMissilePath = "Perks/Styles/Precision/Triumph/Spells/PerkSoulFeastVisualMissile";
  const triumphMissile = record(game[triumphMissilePath], "Triumph visual missile");
  requireThat(triumphMissile.__type === "SpellObject" && triumphMissile.objectPath === triumphMissilePath
    && triumphMissile.ObjectName === "PerkSoulFeastVisualMissile" && triumphMissile.mScriptName === "PerkSoulFeastVisualMissile",
  "Triumph visual missile identity differs");
  const triumphMissileSpell = record(triumphMissile.mSpell, "Triumph visual missile spell");
  const triumphMissileSpec = record(triumphMissileSpell.mMissileSpec, "Triumph visual missile specification");
  const triumphMovement = record(triumphMissileSpec.movementComponent, "Triumph visual missile movement");
  requireThat(triumphMissileSpell.__type === "SpellDataResource" && triumphMissileSpec.__type === "MissileSpecification"
    && triumphMovement.__type === "FixedTimeMovement", "Triumph needs the reviewed fixed-time visual missile");
  // Visual timing corroborates the complete template's delay; the client does
  // not contain executable server Lua or prove the simulation's event phase.
  agree("Triumph delay", triumphMovement, "mTravelTime", triumphDelay!);

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

  quote(pages.get("Legend: Alacrity")!, "* {{sbc|Bug Fix:}} Killing the first {{ui|Voidgrub}} in a spawn group as well as any {{ui|Rift Herald}} no longer grants Legend stacks as if the user has slain both an epic and a large monster, for a total of 100+25 stacks instead of the correct 100.");
  const takedown = pages.get("Takedown")!;
  quote(takedown, "A '''{{tip|takedown}}''' is the term used for situations where either a [[kill]] or an [[assist]] is acceptable, such as to trigger a passive effect. Some effects have a limit time in which kills or assists will qualify.");
  quote(takedown, "* {{ri|Legend: Alacrity}}");
  const summons = pages.get("Champion summoned units")!;
  quote(summons, "{{Outdated|Last updated: [[V14.22]] - Making sure everything is current}}");
  quote(summons, "A '''clone''' is a copy of a champion that is considered a champion for the purposes of targeting and interacting with most non-{{tip|takedown}} effects, but otherwise considered a {{tip|pet}}.");
  quote(summons, "[[Takedown]]s scored by '''clones''', including those against non-champions, are attributed to their owner.");
  quote(summons, "Clones do not generally interact with [[rune]]s, but may inherit some buffs granted by runes on a case-by-case basis.");
  quote(pages.get("Absorb Life")!, "* {{sbc|Bug Fix:}} Shared minions killed through {{iis|World Atlas}} and {{iis|Runic Compass}} execute effects now properly count as a unit kill for the ally.");
  const kill = pages.get("Kill")!;
  const killDefinition = kill.content.split("\n").find((line) => line.startsWith("A '''kill''' is the event of inflicting the final blow on an enemy unit"));
  requireThat(killDefinition, "Kill's hostile-unit definition is required"); quote(kill, killDefinition);
  quote(kill, "If the champion is protected by certain effects (e.g. {{tip|resurrection}}), reducing their health to zero does <u>not</u> count as a kill.");
  quote(kill, "* [[Ward]] kills grant no experience and only dispense gold to the killer.");
  quote(kill, "=== Runes ===\n* {{ri|Absorb Life}}");
  quote(pages.get("Unit")!, "* {{tip|Champion}}\n* {{tip|Minion}}\n* {{tip|Monster}}\n* {{tip|Ward}}\n* [[Champion summoned units|Summon]] ([[Terrain#Player-Generated|champion-generated terrain]] and {{tip|pets}})");
  quote(pages.get("Healing")!, "'''Healing''' cannot increase a unit's current health over its maximum.");
  quote(pages.get("Healing")!, "* {{ri|Absorb Life}}");
  quote(takedown, "* {{ri|Triumph}}");
  const assist = pages.get("Assist")!;
  quote(assist, "An '''assist''' takes place when an ally has helped a teammate score a [[kill]] on an enemy [[champion]] recently before that enemy's [[death]].");
  quote(assist, "* Granting a {{tip|heal}}, {{tip|shield}}, or otherwise form of [[buff]] to the killer or another assistor.");
  const triumphArticle = pages.get("Triumph")!;
  quote(triumphArticle, "* The healing is calculated based on your missing health at the moment the takedown happened.");
  quote(triumphArticle, "** If during the delay another takedown is achieved, all pending '''Triumph''' heals have their calculated value updated to the new amount, which is of course based on your missing health at the moment the latest takedown happened.{{bug|2}}");
  quote(triumphArticle, "* A missile with a fixed travel time of 1 seconds handles the delay and functionally triggers the benefits.");
  quote(triumphArticle, "** The missile is set as ''unblockable'', which means that it isn't destroyed by colliding with effects such as {{cai|Wind Wall|Yasuo}}.");
  quote(triumphArticle, "** The missile can be {{tip|Homing_projectile_destruction|popped}} by effects that (unintentionally) destroy missiles from their own team aimed at them such as {{cai|Trickster|Fizz}}<!--Fizz E2 specifically--> or {{cai|Frozen Tomb|Lissandra}}<!--both of these's missile pops are bugged in this way at the time of this note's creation in late 2023-->. This will prevent both the bonus gold and healing from being received.{{bug}}");
  quote(triumphArticle, "* Heal health ratio reduced to {{as|5% '''missing''' health}} from {{as|10%|health}}.");
  quote(triumphArticle, "* {{sbc|New Effect:}} Now has a base heal of {{as|{{fd|2.5}}% '''maximum''' health}}.");
  quote(triumphArticle, "* Bonus gold on takedown reduced to {{g|20}} from {{g|25}}.");
  quote(triumphArticle, "* {{sbc|Bug Fix:}} Gold and healing are now properly granted to units in stasis when a takedown is earned.");
  quote(pages.get("Healing")!, "* {{ri|Triumph}}");
  quote(pages.get("Healing")!, "* {{tip|Grievous Wounds}} is a debuff that reduces all healing received by 40%.");
  quote(pages.get("Healing")!, "* {{cai|Lamb's Respite|Kindred}} negates all healing effects on a unit once they've reached a certain health threshold.");
  quote(pages.get("Heal and shield power")!, "'''{{sti|Heal and shield power|Heal and shield power}}''' is a [[champion statistic]] that increases the effectiveness of self and outgoing [[Healing|heal]]s and [[shield]]s. It {{tip|stacks additively}}.");
  quote(pages.get("Heal and shield power")!, "* Heal Power stacks additively with itself, but multiplicatively with other heal modifiers.");
  quote(pages.get("Template:Healing modifiers")!, "| {{tt|Self heals|Healing source is the user}} || {{a|Yes}} || {{a|Yes}} || {{a|Yes}} || {{a|Yes}} || {{a|No}}");
  quote(pages.get("Template:Healing modifiers")!, "| {{stil|Bonus health}} || {{a|No}} || {{a|No}} || {{a|No}} || {{a|No}} || {{a|No}}");

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
  // Complete general and champion-specific sources retain the distinction between
  // basic/ultimate effect classes, static/target clocks and flat/total refunds.
  quote(pages.get("Legend: Haste")!, "* {{sbc|Bug Fix:}} Basic ability haste is now properly granted.");
  quote(pages.get("Legend: Haste")!, "* {{sbc|Bug Fix:}} Killing the first {{ui|Voidgrub}} in a spawn group as well as any {{ui|Rift Herald}} no longer grants Legend stacks as if the user has slain both an epic and a large monster, for a total of 100+25 stacks instead of the correct 100.");
  quote(pages.get("Haste")!, "{{Tocright}}'''Haste''' is a category of [[champion statistic|stats]] that reduce the '''total''' cooldown of non-[[basic attack]] [[Terminology#Spell|spells]], and thus improves their '''casting rate'''. It is the analog to [[attack speed]] for basic attacks. '''Haste''' does not affect static cooldowns nor target immunity cooldowns, unless otherwise stated. Haste is categorized based on the spell it affects; [[#Ability haste|champion ability haste]] ([[#Basic ability haste|basic]], [[#Ultimate haste|ultimate]]), [[#Item haste|item haste]], [[#Summoner spell haste|summoner spell haste]], and [[#Trinket haste|trinket haste]].");
  quote(pages.get("Haste")!, "{{as|{{sti|'''Ability haste'''}}|ability haste}}, or {{as|{{sti|'''AH'''}}|ability haste}} reduces the cooldowns of [[champion ability|champion abilities]] by a percentage. It is the most common form of '''haste''' and it is the only '''haste''' stat that is displayed by the game client in the HUD's player stat overview. It is capped at '''500''', which is equivalent to {{fd|83.{{recurring|3}}}}% cooldown reduction.");
  quote(pages.get("Haste")!, "'''Basic ability haste''' reduces the cooldowns of champion basic abilities. It stacks additively with ability haste. The resulting additive '''total haste''' is capped at '''500''', which is equivalent to {{fd|83.{{recurring|3}}}}% cooldown reduction.");
  quote(pages.get("Haste")!, "<math>\\pagecolor{Black}\\color{White}{\\rm New\\ Cooldown}={\\rm Base\\ Cooldown}\\times\\frac{100}{100+{\\rm Haste}}</math>");
  quote(pages.get("Haste")!, "'''''Last updated:''' April 19th, 2026, patch [[V26.08]]''");
  quote(pages.get("Cooldown")!, "''Normal Cooldowns'' are the most basic form of cooldowns. Abilities or Items that have normal cooldowns get reduced by the respective haste. The cooldown associated with runes is considered a normal cooldown, but there are currently no sources of haste that affects runes.");
  quote(pages.get("Cooldown")!, "''Static Cooldowns'' are cooldowns that can not be reduced by any means of ability haste, unless it has a way to reduce itself or by an associated effect.");
  quote(pages.get("Cooldown")!, "''Recharge'' is not technically a cooldown but is usually affected by ability haste. An effect with a recharge will cost a ''charge'' to cast. The effect stores multiple charges up to a maximum, and generates one after the recharge is complete (e.g. {{cai|Hawkshot|Ashe}}).");
  quote(pages.get("Cooldown")!, "* {{cai|Terrify|Fiddlesticks}}{{tt|*|Affected by ability haste}}");
  quote(pages.get("Cooldown")!, "* {{cai|Assassin's Path|Talon}}{{tt|*|Affected by ability haste}}");
  quote(pages.get("Champion ability")!, "All of a champion's abilities together is called their '''kit'''. Most champions' '''kit''' follows a similar structure. An innate ability, a number of basic abilities—typically three—and an ultimate ability. Each ability may grant a number of effects or even have different behaviors.");
  quote(pages.get("Champion ability")!, "* {{sbc|Basic ability:}} A ''basic ability'' is part of a champion's common and repeatable move set.");
  quote(pages.get("Champion ability")!, "* {{sbc|Ultimate:}} The ''ultimate'' ability is a champion's signature ability. It involves high-potency effects that can change the game.");
  quote(pages.get("Champion ability")!, "* {{sbc|Pseudo-Ultimate}}: A ''pseudo-ultimate'' is an ability classified as an ultimate for effects that interact with ultimate abilities (\"ultimate effects\"), such as {{cai|Hijack|Sylas}} and {{ri|Axiom Arcanist}}, but deviates greatly from the typical design. This includes transforming champions' transformation ability, low-cooldown abilities like {{cai|Portal Jump|Zoe}}, as well as abilities that upgrade other abilities to new ones upon casting the pseudo-ultimate.");
  quote(pages.get("Champion ability")!, "* {{cai|Wingborne Storm|Udyr}}");
  quote(pages.get("Haste/Reducing ability cooldowns")!, "Some champions have abilities that decrease their cooldowns by a flat amount, or by a percentage, affecting either their '''base''' cooldown or '''current''' cooldown. Some abilities can also completely refresh their cooldown. '''Base''' reduction occurs before ability haste takes effect while flat reduction occurs after ability haste takes effect.");
  quote(pages.get("Haste/Reducing ability cooldowns")!, "* Base (applies before AH)");
  quote(pages.get("Haste/Reducing ability cooldowns")!, "* Flat (applies after AH)");
  quote(pages.get("Haste/Reducing ability cooldowns")!, "* Percent (applies to '''base''' / '''current''' / '''total''' cooldown)");
  quote(pages.get("Template:Data Udyr/Bridge Between")!, "|description  = {{sbc|Innate - Awakened Spirit:}} '''Udyr''' has no {{tip|ability|ultimate ability}} and instead has 4 {{tip|ability|basic abilities}} that each incur a {{sti|cd|{{tt|{{fd|1.5}}-second global cooldown|Affected by ability haste}}}} when cast. Each ability grants a ''Stance'' that empowers his basic attacks, and switching ''Stances'' will replace the empowered attacks of the previous ''Stance''.");
  quote(pages.get("Template:Data Udyr/Bridge Between")!, "|customlabel  = {{tt|Cooldown|Unaffected by ability haste, but affected by ultimate haste}}");
  quote(pages.get("Template:Data Udyr/Bridge Between")!, "* ''Awakened Spirit's'' cooldown is affected by {{sti|ah|icononly=true}} {{as|ultimate haste|ah}}.");
  quote(pages.get("Template:Data Udyr/Bridge Between")!, "* {{iis|Axiom Arc}} {{nie|Flux}} does not count neither ''Awakened Spirit'' nor ''{{ai|Wingborne Storm|Udyr}}'' as ultimate abilities.");
  quote(pages.get("Template:Data Udyr/Wingborne Storm")!, "|skill        = R");
  quote(pages.get("Template:Data Udyr/Wingborne Storm")!, "|cooldown     = {{tt|6|Starts on-cast, but recasting refreshes the cooldown}}");
  quote(pages.get("Udyr")!, "* He is one of the few characters without an ultimate along with {{ci|Jayce}}. Udyr has 4 skills that can be leveled up to the maximum rank of 6.");
  // The direct cap award composes the general maximum/current-health rule with
  // champion-specific conversion and fixed-cap rules. These sources do not prove
  // dead/fallen restoration timing or immediate resizing of existing shields.
  quote(pages.get("Legend: Bloodline")!, "* Life steal per stack increased to {{fd|0.45}}% from {{fd|0.4}}%.");
  quote(pages.get("Legend: Bloodline")!, "* Life steal per stack increased to {{fd|0.4}}% from {{fd|0.35}}%.");
  quote(pages.get("Legend: Bloodline")!, "* Bonus health reduced to 85 from 100.");
  quote(pages.get("Life steal")!, "{{as|{{sti|'''Life steal'''}}}} is a [[Champion statistic|stat]] that grants {{tip|heal|healing}} equal to a percentage of the {{tip|basic damage}} dealt. It applies to [[basic attack]]s, including those that are modified (such as {{ai|Siphoning Strike|Nasus}} or {{tip|Spellblade}}), and abilities that are considered by the game engine to act as one (usually those which trigger [[on-hit]] effects e.g. {{ai|Mystic Shot|Ezreal}}, {{ai|Parrrley|Gangplank}}, {{ai|Steel Tempest|Yasuo}}). Life steal does not benefit from {{sti|Heal Power|link=Heal and shield power}}. The damage of most item {{tip|on-hit}} effects benefits from life steal, denoted by the icon.");
  quote(pages.get("Life steal")!, "* Life steal '''{{tip|stacks additively}}'''.");
  quote(pages.get("Life steal")!, "* Life steal does not apply to damage dealt to [[structures]] nor {{ai|H-28G Evolution Turret|Heimerdinger}} or {{ai|H-28Q Apex Turret|Heimerdinger}}.");
  quote(pages.get("Life steal")!, "* Life steal applies on damage to [[wards]] ''after'' the damage is reduced to 1, restoring effectively no health.");
  quote(pages.get("Life steal")!, "The healing is based on the post-mitigation damage dealt, meaning after sources of [[armor]], [[magic resistance]], and {{tt|some sources|see interactions with damage modifiers}} of [[damage modifier|damage reduction]] are taken into account.");
  quote(pages.get("Life steal")!, "Generally speaking, all {{tip|basic damage}} applies '''life steal''' by default, regardless of subtype: {{tip|physical damage}} dealt by {{tip|basic attack|basic attacks}}, {{tip|true damage}} dealt by {{cai|Hextech Munitions|Corki}} basic attacks and {{tip|true damage}} dealt by {{cai|Precision Protocol|Camille}} all trigger '''life steal''' based on the damage dealt.");
  quote(pages.get("Life steal")!, "Some pets basic attacks also apply '''life steal''' ({{cis|Annie}} {{ui|Tibbers}}, {{cis|Ivern}} {{ui|Daisy}}, {{cis|Malzahar}} {{ui|Voidling}}). {{bug|2|Expectation since V13.14's Yorick ghoul leap and R basic attacks change to stop applying life steal}}");
  quote(pages.get("Life steal")!, "The following effects do not reduce the effectiveness of healing granted by lifesteal.");
  quote(pages.get("Life steal")!, "* {{cai|Riposte|Fiora}}");
  quote(pages.get("Health")!, "Every champion has a certain amount of base health that increases through [[Champion statistic#Growing statistics|growth per level]]. '''Maximum''' health refers to '''base''' plus '''bonus''' health, and is the largest value that health can be restored to, not counting [[Shield|shields]]. '''Bonus''' health can be gained from any source other than levels, for example from [[Champion ability|abilities]], [[Buff|buffs]], [[Item (League of Legends)|items]], [[Rune (League of Legends)|runes]], and others.");
  quote(pages.get("Health")!, "An increase to the maximum health also affects current health by the same amount. A decrease in maximum health does not change current health, unless it would exceed the reduction of maximum health, in which case the champion's current health would be equal to 100% of the new maximum.");
  quote(pages.get("Health")!, "* Units alive at 0 current health {{tt|cannot be damaged|Not invulnerability, on-hit effects and damage events are completely negated while a unit is at 0 health to prevent interactions such as life stealing from a dead target}} in any way and are ignored by {{tip|turrets}} (unless the unit damages a {{tip|champion}} while within their range) and {{tip|minions}}.");
  quote(pages.get("Healing")!, "'''Healing''' cannot increase a unit's current health over its maximum. The act of [[Experience (champion)|leveling up]] and certain [[Health#Champion abilities|champion abilities]] (such as {{cai|Wild Growth|Lulu}}) will increase a unit's current health by the same amount as the increase to their maximum health, but this is not considered a form of healing. As a result, they are not affected by healing reduction.");
  quote(pages.get("Template:Data Ornn/Living Forge")!, "|description2 = {{sbc|Innate - Master Craftsman:}} '''Ornn''' uses his craftsmanship in forgery to upgrade {{tt|most|See notes}} [[Legendary item]]s that he and his teammates own into {{sbc|Masterwork}} items, increasing the [[Gold efficiency (League of Legends)|gold value]] of all {{tt|upgradeable stats|See notes}} on the item by exactly {{g|1000}}, shared equally among them. When '''Ornn''' reaches [[Experience (champion)|level]] 13, the first eligible [[Legendary item]] in his inventory is upgraded automatically. For each level after 13 and before 18 (levels 14–17, total of 4, once per ally per game), '''Ornn''' can upgrade the first eligible [[Legendary item]] in an allied champion's inventory into its {{sbc|Masterwork}} variant. He can do so by selecting the ally while within 600 range, and forges the item's upgrade by performing ''Living Forge's'' {{tip|channel}}.<br><br>Additionally, '''Ornn''' increases his {{sti|{{as|'''bonus''' armor}}}}, {{sti|{{as|'''bonus''' magic resistance}}}} and {{sti|{{as|'''bonus''' health}}}} by 10% from all sources, further increased by 4% each time he upgrades a ''Legendary'' item into a {{sbc|Masterwork}} item, for a total increase of 30% to each stat after the maximum of 5 upgrades.");
  quote(pages.get("Template:Data Pyke/Gift of the Drowned Ones")!, "|description  = {{sbc|Innate:}} '''Pyke's''' {{sti|health|{{as|'''maximum''' health}}}} cannot increase except through [[Growth#Increasing_Statistics|growth (per level)]], instead he gains{{ft|{{sti|{{as|1 '''bonus''' attack damage}}}} {{as|per 14 '''bonus''' health}}.|{{sti|{{as|'''bonus''' attack damage}}}} equal to {{as|{{fd|7.143}}% of '''bonus''' health}}.}}");
  quote(pages.get("Template:Data Vladimir/Crimson Pact")!, "-->{{#vardefine:cp1|3.333}}<!-- Crimson's Pact 3.33% bonus health as ability power");
  quote(pages.get("Template:Data Vladimir/Crimson Pact")!, "|description  = {{sbc|Innate:}} '''Vladimir''' gains {{as|({{fd|{{#var:cp1}}}}% '''bonus''' health)}} as {{sti|ap|{{as|ability power}}}} and {{as|({{#var:cp2}}% AP)}} as {{sti|health|{{as|'''bonus''' health}}}}. These two bonuses do not stack with each other.");
  quote(pages.get("Template:Data Vladimir/Crimson Pact")!, "* ''Crimson Pact'' only affects '''Vladimir's''' {{as|'''maximum''' health}} and will not increase '''Vladimir's''' {{as|'''current''' health}} to prevent '''Vladimir''' from restoring health whenever his {{as|ability power}} fluctuates.");
  quote(pages.get("Template:Data Vladimir/Crimson Pact")!, "** '''Vladimir's''' {{as|'''current''' health}} can decrease to match his {{as|'''maximum''' health}} if ''Crimson Pact's'' {{as|'''bonus''' health}} is lost.");
  quote(pages.get("Template:Data Kled/Skaarl the Cowardly Lizard")!, "|description  = {{sbc|Innate:}} '''Kled''' rides his semi-trusty mount, '''{{ui|Skaarl|nolink=true}}'''. While {{sbc|Mounted}}, all damage dealt to the duo is suffered by '''{{ui|Skaarl|nolink=true}}''', who has {{pplevel|color=health|{{#expr:{{ccd|Kled & Skaarl|hp_base}}-{{ccd|Kled|hp_base}}}}+{{#expr:{{ccd|Kled & Skaarl|hp_lvl}}-{{ccd|Kled|hp_lvl}}}}*(x-1)*(0.7025+0.0175*(x-1))|formula={{#expr:{{ccd|Kled & Skaarl|hp_base}}-{{ccd|Kled|hp_base}}}}+{{#expr:({{ccd|Kled & Skaarl|hp_lvl}}-{{ccd|Kled|hp_lvl}})*17 round 1}}/17*(x-1)*(0.7025+0.0175*(x-1))}} {{as|'''base''' health}}; additional sources of health are applied to '''{{uis|Skaarl|nolink=true}}''' {{as|'''maximum''' health}}. Effects based on percentage health consider '''Kled''' and '''{{uis|Skaarl|nolink=true}}''' combined {{as|'''maximum''' health}}.");
  quote(pages.get("Template:Data Kled/Skaarl the Cowardly Lizard")!, "|description4 = While {{sbc|Mounted}}, {{tip|heal|healing}} and {{as|{{sti|health regeneration}}}} will first replenish '''{{uis|Skaarl|nolink=true}}''' health and will only apply to '''Kled's''' health while '''{{ui|Skaarl|nolink=true}}''' is at ''full'' health.");
  quote(pages.get("Template:Data Kled/Dismounted Skaarl the Cowardly Lizard")!, "|description  = {{sbc|Innate:}} '''Kled''' is only vulnerable to {{tip|death}} while {{sbc|Dismounted}}. '''Kled''' has {{sti|health|{{as|{{pplevel|{{ccd|Kled|hp_base}}+{{ccd|Kled|hp_lvl}}*(x-1)*(0.7025+0.0175*(x-1))}} '''base''' health}}}}, which is not improved by sources of {{as|'''bonus''' health}}, his {{as|movement speed}} is reduced{{ft|by {{as|{{#expr:{{ccd|Kled & Skaarl|ms}}-{{ccd|Kled|ms}}}}|movement speed}}|to {{as|{{ccd|Kled|ms}}|movement speed}}}}, and he gains {{sti|attack range|{{#expr:{{ccd|Kled|range}}-{{ccd|Kled & Skaarl|range}}}} '''total'''<!--not base, but possibly not bonus either because it doesn't affect acquisition range--> attack range}}. Effects based on percentage health consider '''Kled''' and '''{{uis|Skaarl|nolink=true}}''' combined {{as|'''maximum''' health}}, meaning that a {{sbc|Dismounted}} '''Kled''' is never considered to be at ''full'' health.");
  quote(pages.get("Template:Data Kled/Dismounted Skaarl the Cowardly Lizard")!, "|description3 = {{sbc|Innate - Courage:}} '''Kled''' gains 15 {{as|Courage|buzzword}} after completing a basic attack against a champion and 5 {{as|Courage|buzzword}} for lane {{tip|minion}} kills and when basic attacking {{tip|structures}} or epic {{tip|monsters}}. He can also restore {{as|Courage|buzzword}} from hitting enemies with ''{{ai|Pocket Pistol|Kled}}''. Upon reaching 100 {{as|Courage|buzzword}}, '''{{ui|Skaarl|nolink=true}}''' instantly restores {{as|{{pp|key=%|40 to 70 for 4|1 to 16}} of her '''maximum''' health}} and reunites with '''Kled''' over {{fd|0.25}} seconds, after which he consumes all {{as|Courage|buzzword}} to become {{sbc|Mounted}} and the duo become {{tip|lockout|unable}} to declare basic attacks or cast their {{tip|abilities}} for {{fd|0.25}} seconds. ''Mounting up'' resets the {{sti|cooldowns}} of ''{{ai|Bear Trap on a Rope|Kled}}'' and ''{{ai|Jousting|Kled}}''.");
  quote(pages.get("Template:Data Kled/Dismounted Skaarl the Cowardly Lizard")!, "|description5 = ''The current status of '''Kled's''' own health is preserved between subsequent dismounts.''");
  quote(pages.get("Template:Data Kled/Dismounted Skaarl the Cowardly Lizard")!, "* Sources of increased {{as|'''maximum''' health}} that additionally restore {{as|'''current''' health}} will restore '''Kled's''' {{as|'''current''' health}} even if he is '''DISMOUNTED'''.");
  quote(pages.get("Template:Data K'Sante/All Out")!, "|description4     = {{sbc|All Out:}} '''K'Sante''' gains a [[Health#Health_threshold|health threshold]] equal to {{sti|{{as|65% '''maximum''' health}}}} which cannot be {{tt|modified|By increases or decreases to maximum health}} nor {{tt|exceeded|By healing and health regeneration}} by any means. Upon entering ''All Out'', his {{as|'''current''' health}} is reduced to this threshold if it is above it. Additionally, his {{sti|armor|{{as|'''base''' armor}}}} and {{sti|mr|{{as|'''base''' magic resistance}}}} are reduced by {{as|85% '''bonus''' armor}} and {{as|85% '''bonus''' magic resistance}}, respectively. In return, he gains {{sti|{{as|'''bonus''' attack speed}}}}, {{sti|lethality|{{as|50% {{tt|'''bonus'''-armor penetration|Affects bonus armor only}}}}}}, and {{sti|{{as|20% omnivamp}}}}, and modifies his {{tip|ability|basic abilities}} which can be cast at no cost.<br><br>Upon entering ''All Out'', '''K'Sante''' is restored to {{as|100% '''maximum''' mana}}. His {{as|mana}} then decays to {{as|0|mana}} over the duration of the buff, after which the {{tt|amount of {{as|mana}}|Preserves the exact amount of mana, not his mana percentage at the time}} he had {{tt|prior to entering ''All Out''|After paying All Out's mana cost}} is restored.");
  quote(pages.get("Template:Data K'Sante/All Out")!, "|description5     = '''''K'Sante''' retains his {{as|'''maximum''' health}} and '''bonus''' resistances during All Out. Health lost from gaining the health threshold is '''not''' restored after the effect ends. If the target is pulled over terrain, '''K'Sante''' will {{tip|vanish}} during their displacement and reappear near the end of it.''");
  quote(pages.get("Template:Data K'Sante/All Out")!, "* Gaining '''bonus''' health during ''All Out'' causes the health threshold to be briefly increased then reset back to its original value.");
  quote(pages.get("Template:Data K'Sante/All Out")!, "** The '''bonus''' health is still applied to his '''current''' health.");
  quote(pages.get("Template:Data Malphite/Granite Shield")!, "|description2 = {{sbc|Innate - Granite Shield:}} '''Malphite''' grants himself a {{tip|shield}} equal to {{as|10% of his '''maximum''' health}}. The shield lasts until it is broken, and replenishes to full strength after a few seconds of not taking damage.");
  quote(pages.get("Template:Data Galio/Shield of Durand")!, "|description  = {{sbc|Passive:}} '''Galio''' gains ''Anti-Magic Bulwark'', and restores it after {{pp|12 to 8 for 3|1;6;11}} seconds without taking damage.<br/><br/>{{sbc|Anti-Magic Bulwark:}} Gain a {{tip|shield}} that absorbs {{as|magic damage}}.");
  quote(pages.get("Template:Data Galio/Shield of Durand")!, "|leveling    = {{st|Magic Shield Strength|{{as|{{ap|7.5 to 13.5}}% of '''maximum''' health}}}}");
  quote(pages.get("Template:Data Galio/Shield of Durand")!, "* Since ''Anti-Magic Bulwark'' is instantly granted upon learning the ability, the {{tip|shield}} may be gained once per game while in combat.");
  // Reject edits elsewhere too: a reviewed revision is retained in full, not reduced to favorable excerpts.
  for (const page of pages.values()) requireThat(page.sha256 === REVIEWED[page.title]!.sha256, `${page.title} full reviewed revision changed`);
  requireThat(sha256(gameText) === GAME_SHA256, "complete reviewed game source changed");
  return {
    schema: 1, dataset: "16.21", patch: "26.21",
    absorbLife: { heal: absorbHeal },
    triumph: {
      maximumHealthRatio: triumphMaximumPercent! / 100, missingHealthRatio: triumphMissingPercent! / 100,
      delay: triumphDelay!,
      // Reference economic value only: the fixed-loadout duel does not award or spend it.
      bonusGold: triumphBonusGold!,
      // The source establishes missing HP at takedown, not this exact native
      // callback phase. Both HP terms use the chosen immutable credit frame;
      // maximum-HP timing and current modifiers at delivery remain assumptions.
      missingHealthModel: "at-native-kill-credit",
    },
    legendAlacrity: { baseAttackSpeed: alacrityBase! / 100, attackSpeedPerStack: alacrityPerStack! / 100,
      pointsPerStack: legendPointsPerStack!, maxStacks: alacrityMaxStacks!, championKillPoints },
    legendHaste: { baseHaste: 0, hastePerStack: hastePerStack!, pointsPerStack: hastePointsPerStack!,
      maxStacks: hasteMaxStacks!, championKillPoints: hasteChampionPoints },
    legendBloodline: { baseLifeSteal: 0, lifeStealPerStack: Number((bloodlinePerStackPercent! / 100).toPrecision(15)),
      pointsPerStack: bloodlinePointsPerStack!, maxStacks: bloodlineMaxStacks!,
      championKillPoints: bloodlineChampionPoints, bonusHealth: bloodlineBonusHealth! },
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
