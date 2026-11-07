# Accuracy and usability roadmap

These improvements are being taken in the agreed order. The existing champion,
item and stat-shard coverage remains available while each step is implemented
and checked. This list records goals, not a claim that the work is complete.

| Order | Improvement | Status and scope |
|--:|---|---|
| 1 | Full rune combat effects | **In progress.** The source catalog, page-layout validator and seven stat shards are available. Partial manual plain-stat effects cover Coup de Grace, Cut Down, Last Stand, Second Wind, Absorb Life and Legend: Alacrity. Alacrity requires declared starting points and currently progresses only from real champion-body kills. Complete pages, keystones, remaining effects, champion-specific substitutions, browser effect controls and page search remain unfinished. |
| 2 | Controlled in-game measurements | Planned. Compare recorded damage, timing and interactions with reproducible in-game setups, retain the setup and patch, and turn discrepancies into mechanics regressions. |
| 3 | Summoner spells and browser boots format | Planned. Add explicit summoner loadouts and their combat behavior, and expose the existing five-items-with-boots build format in the browser. |
| 4 | Better combat decisions | Planned. Improve spacing, chase, disengage, defensive timing and ability sequencing, with reproducible scenarios that show the decisions and their limits. |
| 5 | Dynamic item mechanics and adaptive selection | Planned. Model changing stacks, conditional passives and source-qualified dynamic stats so item and adaptive-shard choices can use them consistently. |
| 6 | Joint item, rune and shard optimization | Planned. Search compatible loadouts together, account for their interactions in valuation, and retain the actual loadout behind each result. |
| 7 | Ranking stability | Planned. Show how sensitive close rankings are to scenario weights, uncertain assumptions and search choices, rather than treating small score differences as decisive. |
| 8 | Automated patch monitoring | Planned. Detect source changes, produce reviewable diffs and refresh affected results. Incremental reuse and distributed refreshes already provide the computing foundation. |
| 9 | Game-stage presets | Planned. Extend the controlled level-20 setup with declared levels, budgets, ranks and stack assumptions for other stages of a game. |
| 10 | Better two-dimensional geometry | Planned. Improve side-stepping, facing, area placement, terrain and pet positions beyond the current one-dimensional approximations. |
| 11 | Phone and offline app features | Planned. Add persistent offline access, champion pools and saved comparisons with clear model-version and update behavior. |

Step 1's six manual effects use the retained patch 26.21 sources. The health
amplifiers use the simulator's aggregate outgoing-damage model; the source's
separate amplifier damage instances are not represented. Second Wind's missing
health sampling and first regeneration pulse are explicit timing assumptions.
Item-build composition is not yet reviewed, so combat-rune flags reject fixed
items and build search. See the [rune audit](runes/README.md) for commands,
numeric rules, provenance and compatibility limits.

Absorb Life uses actual hostile combat kill events and heals 27 health at level
20; it does not add assumed farm. The [mechanics gap audit](runes/MECHANICS_GAPS.md)
records unresolved packet semantics, Conditioning's resistance classes and
recursion, Unflinching's CC phases, and the remaining Legend progression and
stat-origin requirements.
The Garen follow-up corrects the known attack-speed shard contribution to
Judgment spins while preserving its effect on basic attacks. Broader
attack-speed eligibility and cast-snapshot timing remain qualified assumptions;
Legend: Alacrity now adds declared starting points and a champion-kill progression
subset; other Legend runes, farm/assist progression and full pages remain unfinished.
The earlier shared-runtime Garen change required a full recomputation of both
default matrices and produced identical default result payloads. The
[accuracy log](../ACCURACY.md) records the completed refresh and release validation.
The Alacrity follow-up's [incremental refresh](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/42382830823)
computed all 172 affected pairings per matrix, with all 344 new checkpoints
verified and default result payloads unchanged. Its completed release checks are
also recorded in the accuracy log. Step 1 remains in progress.

The remaining steps will need their own source review, implementation and
validation. Their calculation costs will be measured as they are built; this
roadmap does not assign an unmeasured runtime multiplier or completion date.
