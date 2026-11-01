# leagueoflegendscounterpicker

A kit-based 1v1 counter picker for top lane: pick the enemy champion, get every champion ranked by how well its kit beats theirs at level 20, with the reasoning behind each result. No win rates or statistics.

Status: milestones 1 to 4 of 8 are done, milestone 5 is built and waiting for review, milestone 6 is built, and milestone 7 has its first part (the second wave of top laners) built:

- the data pipeline and level-20 stats;
- every champion's abilities;
- the interaction ledger, with a first counter ranking;
- the duel simulator's core, which applies the game's rules and is tested on synthetic kits;
- waves 1 and 2: 49 top laners, plus all 124 other champions in nineteen expansion batches, with source-backed mechanics tests;
- the web app: picker, matchup, kit and settings pages, with a private Codespaces preview.

Every champion has a kit, so between any two the ranking comes from simulated duels under the displayed settings and kit assumptions. Beside it, the ledger estimates how the abilities interact without playing the fight out. The app labels these bases **Simulated** and **Interaction estimate**; neither certifies every mechanic or decision. See [PLAN.md](PLAN.md) for the plan and progress.

## Setup

Requires Node.js 22.19 or later.

```sh
npm ci
npm run typecheck
npm run build:sim -- --threads 4   # refresh duels, counter pages, ledger rankings and reports after engine changes
npm run build:sim -- --check       # check whether committed duel results match current inputs
npm test
```

## Web app

```sh
npm run dev          # the app at http://localhost:5173, reading the newest dataset
npm run build:web    # a static build in web/dist/
npm run preview      # serve that build
```

The app has four pages:

- the picker (`#/vs/<champion>`): every champion ranked against the enemy you choose;
- a matchup (`#/matchup/<you>/<enemy>`): the scenarios, each fight's timeline, both champions' numbers, the assumptions and every interaction;
- a kit (`#/kit/<champion>`): everything the engine knows about one champion, with links to the wiki revisions it read;
- the settings (`#/settings`).

Results at the default settings are precomputed by `npm run build:data`, or refreshed from committed parsed data with `npm run build:sim` without fetching raw sources. Each matrix records a fingerprint of its simulator, kits and input data. The browser reruns outdated results instead of presenting them as current. Changed settings, including weights that affect kit variant choices, run again in Web Workers. Settings stay in the browser.

The [private mobile preview](https://codespaces.new/marvelagent210-sys/leagueoflegendscounterpicker/tree/counter-picker-download-244198f8?quickstart=1) uses a packaged build in a GitHub Codespace. Preview updates follow validation of each batch. Its `README-MOBILE.md` explains startup, phone access and resuming it. Keep port 8000's visibility **Private**. The downloadable package also includes the exact working source and parsed inputs in `SOURCE`, with computer setup instructions in `README-PRIVATE.md`.

The full test suite passes. Five draft winner expectations stay marked disputed, each with what the simulator shows instead, and the tests skip them. See [ACCURACY.md](ACCURACY.md) for current validation and model limits.

`.github/workflows/pages.yml` runs the type checks, tests and build on every pull request. On each push to main it also publishes the app to GitHub Pages. Pages must be turned on once, with "GitHub Actions" as the source (Settings → Pages).

## Matchups and counters

```sh
npm run matchup -- Fiora Darius     # every interaction between two kits, with timing, conditions and sources
npm run counters -- Tryndamere      # champions ranked against an enemy: by simulated duels (champions with kits), then by the ledger (partial)
```

Names are matched loosely (`"dr mundo"`, `wukong`). For example, parrying Darius's Apprehend empowers Riposte's shock to stun if it hits, and Teemo's blind makes Tryndamere's basic attacks miss.

## Duel simulator

```sh
npm run duel -- Garen Darius                 # the six scenarios at level 20 with the default 15,000-gold stat budget
npm run duel -- Garen Darius --log brawl     # plus the timeline of one fight
npm run duel -- Garen Darius --sweep         # plus the score at budgets from 0 to 20,000 gold
npm run duel -- KogMaw Garen --items "Nashor's Tooth, Guinsoo's Rageblade, Rabadon's Deathcap, Sorcerer's Shoes, Lich Bane, Zhonya's Hourglass" --enemy-items "Stridebreaker, Black Cleaver, Plated Steelcaps, Sterak's Gage, Dead Man's Plate, Spirit Visage"
                                             # item builds instead of the stat budget
```

With `--items` and `--enemy-items`, each side holds a build of up to six items instead of the stat budget, checked against the build rules (`pipeline/items/rules.ts`): one pair of boots, no item twice, one item of each one-per-build group. A full build is six items, or five items and boots: the two formats the build search will toggle between. Tear items are fully stacked (Manamune is Muramana) unless `--unstacked`, and `--item-option "Heartsteel.stacked=600"` changes an item's option. The output lists what each build's items leave out and assumes. Every item's effects are modeled from its wiki text, or left out with a reason ([item effects](data/16.20/reports/item-effects.md)); the build search that picks builds is still to come (PLAN.md M8).

The simulator plays a duel out at 30 ticks per second, in one dimension. Both champions spend the same gold on plain stats, with penetration capped near what items give. Each prints a score from -1 to +1 for these scenarios:

- you engage;
- the enemy engages;
- brawl;
- short trade;
- spacing;
- escape.

Uncertain skillshots that decide a fight split it into weighted branches, using the model's estimated hit chances. Smaller hits and hits beyond the branch limit use expected effects. These are model probabilities, not observed player win rates.

All 173 champions fight with their abilities (`kits/champions/`):

- wave 1: Aatrox, Camille, Darius, Dr. Mundo, Fiora, Garen, Gwen, Irelia, Jax, Malphite, Mordekaiser, Nasus, Olaf, Ornn, Poppy, Renekton, Riven, Sett, Shen, Teemo, Tryndamere, Urgot, Volibear, Yasuo and Yone;
- wave 2: Akali, Ambessa, Aurora, Cho'Gath, Gangplank, Gnar, Heimerdinger, Illaoi, Jayce, Kayle, K'Sante, Kennen, Kled, Pantheon, Quinn, Rumble, Singed, Sion, Skarner, Tahm Kench, Trundle, Udyr, Yorick and Zaahen.
- expansion batch 1: Amumu, Annie, Ashe, Brand, Leona, Lux, Master Yi, Morgana, Nautilus, Rammus, Vayne and Xin Zhao.
- expansion batch 2: Ahri, Cassiopeia, Kassadin, Lissandra, Veigar and Vladimir.
- expansion batch 3: Anivia, Karthus, Malzahar, Vel'Koz, Ziggs and Zyra.
- expansion batch 4: Caitlyn, Ezreal, Jhin, Jinx, Lucian and Miss Fortune.
- expansion batch 5: Corki, Draven, Kog'Maw, Sivir, Tristana and Twitch.
- expansion batch 6: Kai'Sa, Kalista, Samira, Smolder, Varus and Xayah.
- expansion batch 7: Akshan, Aphelios, Graves, Kindred, Senna and Zeri.
- expansion batch 8: Diana, Ekko, Evelynn, Fizz, Katarina and LeBlanc.
- expansion batch 9: Kha'Zix, Naafiri, Nocturne, Rengar, Talon and Zed.
- expansion batch 10: Hecarim, Jarvan IV, Lee Sin, Wukong, Vi and Warwick.
- expansion batch 11: Alistar, Blitzcrank, Braum, Galio, Gragas and Maokai.
- expansion batch 12: Nunu & Willump, Rakan, Rell, Sejuani, Taric and Thresh.
- expansion batch 13: Janna, Karma, Lulu, Nami, Sona and Soraka.
- expansion batch 14: Hwei, Orianna, Ryze, Syndra, Taliyah and Viktor.
- expansion batch 15: Neeko, Swain, Twisted Fate, Vex, Xerath and Zoe.
- expansion batch 16: Briar, Lillia, Nidalee, Rek'Sai, Shyvana and Zac.
- expansion batch 17: Bel'Veth, Elise, Kayn, Nilah, Pyke and Qiyana.
- expansion batch 18: Fiddlesticks, Renata Glasc, Shaco, Sylas, Viego and Zilean.
- expansion batch 19: Aurelion Sol, Azir, Bard, Ivern, Locke, Mel, Milio, Seraphine, Yunara and Yuumi.

Implemented coverage is all 173 champions, with 14,878 unordered simulated pairings. Batches 7 to 15 were written in the private workspace and merged here, except Gragas, Hecarim, Warwick and Wukong, which use this repository's own kits; batches 16 to 19 were written here. The generated [coverage report](data/16.20/reports/coverage.md) lists each kit's source values and assumptions. Coverage does not certify every mechanic; each kit retains its source evidence and assumptions. Source audits are recorded in [docs/next-wave](docs/next-wave/README.md).

Kit values come from the pinned sources; the kit page lists their revisions and the kit's assumptions. Some kits have a choice to make (Udyr's rank split, Heimerdinger's upgrade, Kayn's form): both sides choose their best conservative variant across the opponent's choices, and `simulated.json` records the actual pairing. This does not establish a mixed-strategy equilibrium. A manual duel always plays both champions' kits.

```sh
npm run golden       # every golden matchup (tests/golden/matchups.ts) with its simulated score
```

## Data pipeline

```sh
npm run fetch        # download the current patch's sources into data/raw/ (not committed)
npm run fetch -- --only glossary   # refetch just the wiki's glossary pages
npm run fetch -- --only items      # refetch just the item catalog's sources
npm run fetch -- --only item-rules # refetch just the wiki rule pages item effects quote (Energized, combat status, ...)
npm run build:data   # rebuild data/<dataset>/ from those downloads, including all 14,878 pairings
npm run build:items  # rebuild the item catalog (items.json, reports/items.md, reports/item-effects.md)
```

Each patch gets a folder named after its Data Dragon version, e.g. `data/16.20/` for patch 26.20. It contains:

| File | Contents |
|---|---|
| `champions.json` | Every champion with its forms and base stats |
| `abilities/<champion>.json` | Every ability: cooldowns, costs, ranges, interaction flags, values by rank and level, crowd control with durations, and the wiki's notes |
| `kits/<champion>.md` | A readable page per champion for checking the data, with links to the exact wiki revisions; for champions with a simulator kit, the kit as the simulator plays it, its assumptions and every wiki value it read |
| `glossary.json` | The wiki's lists of abilities by mechanic (dashes, untargetability, spell shields, each crowd control type's sources, ...) and its crowd control rules |
| `rules.json` | Game values the simulator reads from the wiki: the gold value of each stat, which prices the stat budget |
| `profiles/<champion>.json` | What each ability does in a fight: how it's delivered, the crowd control it applies, how it moves, what it protects against; and basic attacks at level 20 |
| `counters/<champion>.md` | Every champion ranked against this one: by simulated duels, and by interaction estimates, with the strongest reasons |
| `rankings.json` | The ledger rankings, machine-readable |
| `simulated.json` | Every simulated matchup between champions with kits: the score and each scenario's, and the options played by kits with a choice |
| `items.json` | The item catalog (M8): the 106 finished items and 7 tier-2 boots with stats, effects (their notes and values by level) and limits, the 3 transformed Tear items, the game file's one-per-build groups, the stat cross-check, and the wiki rule pages item effects quote. Item builds use it in `npm run duel`; the precomputed matrix doesn't yet |
| `oracle/level20.json` | The wiki's level-20 stat table, which the tests check the stat math against |
| `manifest.json`, `wiki-revisions.json` | The exact source versions and wiki revisions used |
| `reports/level20-stats.md` | Base stats of every form at level 20 |
| `reports/game-files.md` | Where the game files disagree with the wiki on base stats, and which value is used |
| `reports/abilities.md` | Parsing coverage, level 19-20 values, ability cooldowns and costs that differ from the game files, and the removed abilities skipped |
| `reports/ledger.md` | The glossary pages used, what the profiles found, hard counters by check, and each champion's best ledger-only counter |
| `reports/simulator.md` | The simulated standings, the golden matchups with their scores, and what the stat budget buys each champion |
| `reports/items.md` | The item catalog, readable: how it's chosen, the one-per-build groups, the cross-check against the game file, and every item's stats and effects |
| `reports/item-effects.md` | What the simulator makes of each item: the effects it models, what it leaves out and why, its simplifications and options |

Tests run offline against the committed data.

See [ACCURACY.md](ACCURACY.md) for the validation workflow, source-backed corrections,
and the model's remaining limits. Rebuild the committed rankings with `npm run build:sim`
after changing simulator inputs; `npm run build:sim -- --check` detects stale results.

## Data sources and attribution

- [League of Legends Wiki](https://wiki.leagueoflegends.com/en-us/): champion stats and ability data, licensed [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Data derived from it is under the same license (see [data/README.md](data/README.md)).
- [CommunityDragon](https://www.communitydragon.org/): the game's data files and client data.
- [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon): champion roster, ability ranks and icons.

leagueoflegendscounterpicker isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
