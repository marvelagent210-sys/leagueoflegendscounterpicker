# leagueoflegendscounterpicker

A kit-based 1v1 counter picker for top lane: pick the enemy champion, get every champion ranked by how well its kit beats theirs at level 20, with the reasoning behind each result. No win rates or statistics.

Status: milestones 1 and 2 of 8 are done (data pipeline, level-20 stats, and every champion's abilities). See [PLAN.md](PLAN.md) for the plan and progress.

## Setup

Requires Node.js 22.19 or later.

```sh
npm ci
npm test
```

## Data pipeline

```sh
npm run fetch        # download the current patch's sources into data/raw/ (not committed)
npm run build:data   # rebuild data/<dataset>/ from those downloads
```

Each patch gets a folder named after its Data Dragon version, e.g. `data/16.20/` for patch 26.20. It contains:

| File | Contents |
|---|---|
| `champions.json` | Every champion with its forms and base stats |
| `abilities/<champion>.json` | Every ability: cooldowns, costs, ranges, interaction flags, values by rank and level, crowd control with durations, and the wiki's notes |
| `kits/<champion>.md` | A readable page per champion for checking the data, with links to the exact wiki revisions |
| `oracle/level20.json` | The wiki's level-20 stat table, which the tests check the stat math against |
| `manifest.json`, `wiki-revisions.json` | The exact source versions and wiki revisions used |
| `reports/level20-stats.md` | Base stats of every form at level 20 |
| `reports/game-files.md` | Where the game files disagree with the wiki on base stats, and which value is used |
| `reports/abilities.md` | Parsing coverage, level 19-20 values, and ability cooldowns and costs that differ from the game files |

Tests run offline against the committed data.

## Data sources and attribution

- [League of Legends Wiki](https://wiki.leagueoflegends.com/en-us/): champion stats and ability data, licensed [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Data derived from it is under the same license (see [data/README.md](data/README.md)).
- [CommunityDragon](https://www.communitydragon.org/): the game's data files and client data.
- [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon): champion roster, ability ranks and icons.

leagueoflegendscounterpicker isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
