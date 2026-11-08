# leagueoflegendscounterpicker

A kit-based 1v1 counter picker for top lane: pick the enemy champion, get every champion ranked by how well its kit beats theirs at level 20, with the reasoning behind each result. No win rates or statistics.

Status: milestones 1 to 4 of 8 are done, milestone 5 is built and waiting for review, milestones 6 and 7 are built, and milestone 8 (items and runes) is in progress:

- the data pipeline and level-20 stats;
- every champion's abilities;
- the interaction ledger, with a first counter ranking;
- the duel simulator's core, which applies the game's rules and is tested on synthetic kits;
- waves 1 and 2: 49 top laners, plus all 124 other champions in nineteen expansion batches, with source-backed mechanics tests;
- the web app: picker, matchup, kit and settings pages, with a private Codespaces preview;
- items: the item catalog, every item's effects, duels with fixed or searched builds, and the build matrix, which plays the build search for every pairing and which the app shows once built.
- runes: a source-backed catalog, structural page validation and all seven stat shards in explicit manual duels and browser plain-stat duels, plus seven partial combat effects in manual plain-stat duels; full rune effects and page search remain in progress ([details](docs/runes/README.md)).

Every champion has a kit, so between any two the ranking comes from simulated duels under the displayed settings and kit assumptions. Beside it, the ledger estimates how the abilities interact without playing the fight out. The app labels these bases **Simulated** and **Interaction estimate**; neither certifies every mechanic or decision. See [PLAN.md](PLAN.md) for the plan and progress.

The [ordered improvement roadmap](docs/IMPROVEMENT_ROADMAP.md) starts with full
rune combat, then in-game validation, summoner spells and the remaining accuracy
and usability improvements. Step 1 is in progress.

## Setup

Requires Node.js 22.19 or later.

```sh
npm ci
npm run typecheck
npm run build:sim -- --threads 4   # refresh duels, counter pages, ledger rankings and reports after engine changes
npm run build:sim -- --check       # check whether committed duel results match current inputs
npm run build:builds -- --threads 4   # the duels with item builds: the build search for every pairing (about 19 hours on four threads)
npm run build:builds -- --check       # check whether the committed build matrix matches current inputs
npm run build:sim -- --plan        # how many pairings a refresh would compute; unchanged ones are reused
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

Where the dataset has a current build matrix (`simulated-builds.json`, from `npm run build:builds`), the picker ranks the duels with item builds by default, and each row opens on both sides' builds; the matchup page shows the result with builds above the plain-stats fights, which stay the ones to watch tick by tick. Plain stats are a click away on both pages and in the settings. The build search is too slow for the browser, so the builds hold at the default fight settings: scenario weights reweigh their scenarios, the plain stats' gold doesn't enter them, and any other changed setting shows plain stats instead. A build matrix that doesn't match the current inputs is left out.

The [private mobile preview](https://codespaces.new/marvelagent210-sys/leagueoflegendscounterpicker/tree/counter-picker-download-244198f8?quickstart=1) uses a packaged build in a GitHub Codespace. Preview updates follow validation of each batch. Its `README-MOBILE.md` explains startup, phone access and resuming it. Keep port 8000's visibility **Private**. The downloadable package also includes the exact working source and parsed inputs in `SOURCE`, with computer setup instructions in `README-PRIVATE.md`.

Completed release checks are recorded in [ACCURACY.md](ACCURACY.md). The Haste follow-up completed its genuine full matrix refresh and release checks on 8 November; default results changed in 172 plain-stat pairings and 186 build-matrix pairings. Five draft winner expectations stay marked disputed, each with what the simulator shows instead, and the tests skip them.

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
npm run duel -- Darius Garen --shards 5005,5001,5001 --enemy-shards 5008,5008,5011
                                             # explicit stat shards; see docs/runes for supported modes and allocation assumptions
npm run duel -- Darius Garen --combat-runes 8299,8444 --enemy-combat-runes 8014
                                             # partial rune effects in plain-stat duels; no inferred full page
npm run duel -- Darius Yorick --combat-runes 9101,8299
                                             # Absorb Life heals on actual hostile combat kills; no farm is assumed
npm run duel -- Garen Darius --combat-runes 9104,8299 --legend-points 950 --enemy-combat-runes 8014,9104 --enemy-legend-points 0
                                             # Alacrity requires declared starting Legend points for each selected side
npm run duel -- Darius Garen --combat-runes 9105,8299 --legend-points 1000 --enemy-combat-runes 9104 --enemy-legend-points 0
                                             # Haste adds basic-ability haste; the two Legend runes cannot share one side's row
npm run duel -- KogMaw Garen --items "Nashor's Tooth, Guinsoo's Rageblade, Rabadon's Deathcap, Sorcerer's Shoes, Lich Bane, Zhonya's Hourglass" --enemy-items "Stridebreaker, Black Cleaver, Plated Steelcaps, Sterak's Gage, Dead Man's Plate, Spirit Visage"
                                             # item builds instead of the stat budget
npm run duel -- Ahri Malphite --search       # the build search picks both builds (--format fiveItemsWithBoots for boots)
```

Garen's Judgment excludes the recorded attack-speed shard and active Alacrity
rune attack speed from spin scaling; both retain their normal combat benefits.
Other attack-speed sources retain
the existing model, including unresolved temporary item-passive eligibility.
See the [rune audit](docs/runes/README.md) for the source and timing limits.

With `--items` and `--enemy-items`, each side holds a build of up to six items instead of the stat budget, checked against the build rules (`pipeline/items/rules.ts`): one pair of boots, no item twice, one item of each one-per-build group. A full build is six items, or five items and boots: the two formats the build search will toggle between. Tear items are fully stacked (Manamune is Muramana) unless `--unstacked`, and `--item-option "Heartsteel.stacked=600"` changes an item's option. The output lists what each build's items leave out and assumes. Every item's effects are modeled from its wiki text, or left out with a reason ([item effects](data/16.21/reports/item-effects.md)).

With `--search`, the build search (`pipeline/items/search.ts`, PLAN.md M8) picks both builds: it fills each side's build slot by slot by a quick estimate, keeping the best build of each profile (AD, crit, attack speed, AP, tank) as a route; the sides answer each other's best build until a pair of best builds comes back; then each side's routes fight the other's in a screen of the all-in scenarios, each side takes the route whose worst result is best, and that pair plays every scenario. The quick estimate counts items' stats, stat statuses, critical strike damage and on-hit effects, and what their passives and actives give on average over a ten-second fight (`items/hints.ts`), with each kit's damage, attacks and casts calibrated first to a fight of its own (`pipeline/items/calibrate.ts`); the fights between routes settle the rest.

```sh
npm run build:builds -- --smoke --threads 4   # each kit against the next (172 pairings): a check before a full run
npm run build:builds -- --threads 4           # all 14,878 pairings, resuming from checkpoints
```

`npm run build:builds` plays the build search for every pairing, six items each (`--format fiveItemsWithBoots` for five and boots), and writes `simulated-builds.json` and [the build report](data/16.21/reports/builds.md): each champion's most-built items across its matchups. A pairing takes about 19 s on one of four threads, so a full run takes about 19 hours on four. Each pairing is checkpointed as it finishes (`.cache/builds/`, not committed), so a run that stops resumes where it left off, as long as the inputs are the same: the simulator's, the item code, the build search and the item catalog. A pairing that fails is reported and the rest go on; nothing is written until every pairing has played.

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

Implemented coverage is all 173 champions, with 14,878 unordered simulated pairings. Batches 7 to 15 were written in the private workspace and merged here, except Gragas, Hecarim, Warwick and Wukong, which use this repository's own kits; batches 16 to 19 were written here. The generated [coverage report](data/16.21/reports/coverage.md) lists each kit's source values and assumptions. Coverage does not certify every mechanic; each kit retains its source evidence and assumptions. Source audits are recorded in [docs/next-wave](docs/next-wave/README.md).

Kit values come from the pinned sources; the kit page lists their revisions and the kit's assumptions. Some kits have a choice to make (Udyr's rank split, Heimerdinger's upgrade, Kayn's form): both sides choose their best conservative variant across the opponent's choices, and `simulated.json` records the actual pairing. This does not establish a mixed-strategy equilibrium. A manual duel always plays both champions' kits.

```sh
npm run golden       # every golden matchup (tests/golden/matchups.ts) with its simulated score
```

### Incremental refreshes

Both refreshes, and `npm run build:data`, compute only the pairings whose inputs changed. Each matrix records the inputs its pairings were computed from (`inputs`, `pipeline/sim/pairKeys.ts`):

- one key for what every fight shares: the code the fight runs (the worker and every module it imports, kit modules aside), the stat prices and the runes, and for item builds the item catalog and the build format;
- one key per kit: its module, and its champion, ability and pet records.

Provenance enters neither: wiki revision ids, game-file versions, URLs and hashes, and the patch a champion last changed in. A refresh takes a pairing's result from the dataset's own matrix, or else from the previous dataset's, when the shared key and both kits' keys are unchanged, and computes the rest (`pipeline/sim/reuse.ts`). So a refetch that changes no data computes nothing, a change to one kit recomputes its 172 pairings, and a change to the engine (or, for item builds, to any item) recomputes all of them. A kit's key covers its whole records, so a wiki edit to an ability's notes counts as a change even when the kit reads nothing of it: moving to patch 26.21 changed 76 kits (their records, or their modules for the new wording), so 10,222 of the 14,878 plain-stats pairings (69%) were computed again and 4,656 reused.

```sh
npm run build:sim -- --plan       # 26.21 before its refresh: {"dataset":"16.21","pairings":14878,"reused":4656,"pending":10222}
npm run build:builds -- --plan    # the same for the build matrix
npm run build:sim -- --shard 0/4  # the first of four shares of the pending pairings, into checkpoints only
```

`--plan` computes and writes nothing. `--shard i/N` computes only the i-th of N even shares of the pending pairings (counting from 0) and writes only their checkpoints, so that separate machines can split a refresh; a run without `--shard`, given the shards' checkpoints, then writes the outputs. `--recompute Darius,Garen` computes those champions' pairings again whatever is stored, to check that a refresh reproduces its results.

### Sharded refreshes

The [refresh workflow](.github/workflows/refresh.yml) runs a refresh on GitHub's runners, split into shards that run side by side. Push a change to [`.github/refresh-request.json`](.github/refresh-request.json) on a branch, or start the workflow from the Actions tab:

```json
{ "dataset": "16.21", "matrices": ["sim", "builds"], "recompute": [], "shards": { "builds": 20 } }
```

Every field is optional: the newest dataset, both matrices, nothing forced. Without a shard count, the matrices share 20 shards, the number of jobs GitHub runs at once: a shard per hour of computing on a four-core runner, at most 20 in all, split between the matrices so that their shards end together (`pipeline/sim/ciPlan.ts`). The plan job counts the pending pairings (`--plan`); each shard computes its share (`--shard i/N`) and uploads its checkpoints; the last job reads them all back, writes the outputs, checks them (`--check`), commits them to the branch and runs the tests. Runners use the same Node.js version as local refreshes, so both give the same numbers to the last bit. On a public repository the standard runners cost nothing, and twenty of them make a full refresh of the build matrix (about 78 processor-hours) take about an hour. Its first run computed Darius's pairings again on five runners and reproduced every committed result exactly, six minutes from the push to the commit ([ACCURACY.md](ACCURACY.md)). Patch 26.21's refresh, 10,222 plain-stats pairings and the whole build matrix (98 processor-hours), took two hours from the push to the commit. The runners take 20 jobs at a time, so 5 of its 25 shards waited for one. The plan now shares the 20 between the matrices: for that refresh, 4 plain-stats and 16 build shards of about 72 minutes each.

## Data pipeline

```sh
npm run fetch        # download the current patch's sources into data/raw/ (not committed)
npm run fetch -- --only glossary   # refetch just the wiki's glossary pages
npm run fetch -- --only items      # refetch just the item catalog's sources
npm run fetch -- --only item-rules # refetch just the wiki rule pages item effects quote (Energized, combat status, ...)
npm run build:data   # rebuild data/<dataset>/ from those downloads, with the pairings whose inputs changed
npm run build:items  # rebuild the item catalog (items.json, reports/items.md, reports/item-effects.md)
```

Each patch gets a folder named after its Data Dragon version, e.g. `data/16.21/` for patch 26.21; the previous patch's folder stays as it was, and a new patch's refresh reuses its results. It contains:

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
| `simulated.json` | Every simulated matchup between champions with kits: the score and each scenario's, the options played by kits with a choice, and the inputs each matchup was computed from |
| `simulated-spent.json` | The gold each side spent on each stat in each simulated matchup, to the whole gold piece: the simulator report reads it, and a refresh reuses it with the matchups it reuses |
| `simulated-builds.json` | Every simulated matchup with item builds (`npm run build:builds`): the score and each scenario's, each side's build, the options played by kits with a choice, and the inputs each matchup was computed from |
| `items.json` | The item catalog (M8): the 106 finished items and 7 tier-2 boots with stats, effects (their notes and values by level) and limits, the 3 transformed Tear items, the game file's one-per-build groups, the stat cross-check, and the wiki rule pages item effects quote. Item builds use it in `npm run duel` and the build matrix |
| `oracle/level20.json` | The wiki's level-20 stat table, which the tests check the stat math against |
| `manifest.json`, `wiki-revisions.json` | The exact source versions and wiki revisions used |
| `reports/level20-stats.md` | Base stats of every form at level 20 |
| `reports/game-files.md` | Where the game files disagree with the wiki on base stats, and which value is used |
| `reports/abilities.md` | Parsing coverage, level 19-20 values, ability cooldowns and costs that differ from the game files, and the removed abilities skipped |
| `reports/ledger.md` | The glossary pages used, what the profiles found, hard counters by check, and each champion's best ledger-only counter |
| `reports/simulator.md` | The simulated standings, the golden matchups with their scores, and what the stat budget buys each champion |
| `reports/items.md` | The item catalog, readable: how it's chosen, the one-per-build groups, the cross-check against the game file, and every item's stats and effects |
| `reports/item-effects.md` | What the simulator makes of each item: the effects it models, what it leaves out and why, its simplifications and options |
| `reports/builds.md` | The build matrix's run, and each champion's most-built items across its matchups |

Tests run offline against the committed data.

See [ACCURACY.md](ACCURACY.md) for the validation workflow, source-backed corrections,
and the model's remaining limits. Rebuild the committed rankings with `npm run build:sim`
after changing simulator inputs: it recomputes only the matchups the change affects.
`npm run build:sim -- --check` detects stale results, and `npm run build:builds -- --check`
a stale build matrix.

## Data sources and attribution

- [League of Legends Wiki](https://wiki.leagueoflegends.com/en-us/): champion stats and ability data, licensed [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Data derived from it is under the same license (see [data/README.md](data/README.md)).
- [CommunityDragon](https://www.communitydragon.org/): the game's data files and client data.
- [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon): champion roster, ability ranks and icons.

leagueoflegendscounterpicker isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
