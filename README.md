# leagueoflegendscounterpicker

A kit-based 1v1 counter picker for top lane: pick the enemy champion, get every champion ranked by how well its kit beats theirs at level 20, with the reasoning behind each result. No win rates or statistics.

Status: milestones 1 to 4 of 8 are done, and milestone 5 is built and waiting for review:

- the data pipeline and level-20 stats;
- every champion's abilities;
- the interaction ledger, with a first counter ranking;
- the duel simulator's core, which applies the game's rules and is tested on synthetic kits;
- wave 1: 25 top laners whose kits the simulator plays out, and golden matchups to check it against.

Between two of the 25, the ranking comes from simulated duels (*full* confidence). Everywhere else it is still *partial*: the ledger weighs how the kits' abilities interact without playing the fight out. See [PLAN.md](PLAN.md) for the plan and progress.

## Setup

Requires Node.js 22.19 or later.

```sh
npm ci
npm test
```

## Matchups and counters

```sh
npm run matchup -- Fiora Darius     # every interaction between two kits, with timing, conditions and sources
npm run counters -- Tryndamere      # champions ranked against an enemy: by simulated duels (wave 1), then by the ledger (partial)
```

Names are matched loosely (`"dr mundo"`, `wukong`). For example, the ledger finds that Riposte parries Darius's Apprehend and stuns him back, and that Teemo's blind makes Tryndamere's basic attacks miss.

## Duel simulator

```sh
npm run duel -- Garen Darius                 # the six scenarios at level 20 with the default 15,000-gold stat budget
npm run duel -- Garen Darius --log brawl     # plus the timeline of one fight
npm run duel -- Garen Darius --sweep         # plus the score at budgets from 0 to 20,000 gold
```

The simulator plays a duel out at 30 ticks per second, in one dimension. Both champions spend the same gold on plain stats. Each prints a score from -1 to +1 for these scenarios:

- you engage;
- the enemy engages;
- brawl;
- short trade;
- spacing;
- escape.

Uncertain skillshots that decide a fight split it into weighted branches, so results are exact probabilities.

These 25 champions fight with their abilities (`kits/champions/`): Aatrox, Camille, Darius, Dr. Mundo, Fiora, Garen, Gwen, Irelia, Jax, Malphite, Mordekaiser, Nasus, Olaf, Ornn, Poppy, Renekton, Riven, Sett, Shen, Teemo, Tryndamere, Urgot, Volibear, Yasuo and Yone. Every number in a kit is read from the wiki; the kit page lists them with their revisions, along with the kit's assumptions. Other champions fight with their base stats and basic attacks only.

```sh
npm run golden       # every golden matchup (tests/golden/matchups.ts) with its simulated score
```

## Data pipeline

```sh
npm run fetch        # download the current patch's sources into data/raw/ (not committed)
npm run fetch -- --only glossary   # refetch just the wiki's glossary pages
npm run build:data   # rebuild data/<dataset>/ from those downloads (about a minute: it simulates every wave-1 matchup)
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
| `counters/<champion>.md` | Every champion ranked against this one: by simulated duels for the 25 champions with kits (full), and by the interaction ledger (partial), with the strongest reasons |
| `rankings.json` | The ledger rankings, machine-readable |
| `simulated.json` | Every simulated matchup between champions with kits: the score and each scenario's |
| `oracle/level20.json` | The wiki's level-20 stat table, which the tests check the stat math against |
| `manifest.json`, `wiki-revisions.json` | The exact source versions and wiki revisions used |
| `reports/level20-stats.md` | Base stats of every form at level 20 |
| `reports/game-files.md` | Where the game files disagree with the wiki on base stats, and which value is used |
| `reports/abilities.md` | Parsing coverage, level 19-20 values, ability cooldowns and costs that differ from the game files, and the removed abilities skipped |
| `reports/ledger.md` | The glossary pages used, what the profiles found, hard counters by check, and each champion's best ledger-only counter |
| `reports/simulator.md` | The simulated standings, the golden matchups with their scores, and what the stat budget buys each champion |

Tests run offline against the committed data.

## Data sources and attribution

- [League of Legends Wiki](https://wiki.leagueoflegends.com/en-us/): champion stats and ability data, licensed [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Data derived from it is under the same license (see [data/README.md](data/README.md)).
- [CommunityDragon](https://www.communitydragon.org/): the game's data files and client data.
- [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon): champion roster, ability ranks and icons.

leagueoflegendscounterpicker isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
