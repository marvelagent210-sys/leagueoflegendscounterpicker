# Accuracy and usability roadmap

These improvements are being taken in the agreed order. The existing champion,
item and stat-shard coverage remains available while each step is implemented
and checked. This list records goals, not a claim that the work is complete.

| Order | Improvement | Status and scope |
|--:|---|---|
| 1 | Full rune combat effects | **In progress.** The source catalog, page-layout validator and seven stat shards are available. Eight partial manual plain-stat effects cover Coup de Grace, Cut Down, Last Stand, Second Wind, Absorb Life and the three Legend runes. Each selected Legend requires declared starting points and currently progresses only from real champion-body kills. Haste's genuine full matrix refresh and release checks completed on 8 November, including the observed default-result changes. The next Bloodline batch awaits its full refresh and release checks. Complete pages, keystones, remaining effects, champion-specific substitutions, browser effect controls and page search remain unfinished. |
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

Step 1's eight manual effects use the retained patch 26.21 sources. The health
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
Legend: Alacrity adds declared starting points and a champion-kill progression
subset. Haste and Bloodline use the same declared-history and champion-kill
subset; farm/assist/monster progression and full pages remain unfinished.
The earlier shared-runtime Garen change required a full recomputation of both
default matrices and produced identical default result payloads. The
[accuracy log](../ACCURACY.md) records the completed refresh and release validation.
The Alacrity follow-up's [incremental refresh](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/42382830823)
computed all 172 affected pairings per matrix, with all 344 new checkpoints
verified and default result payloads unchanged. Its completed release checks are
also recorded in the accuracy log. Step 1 remains in progress.

The Haste batch separates basic and ultimate haste, combines eligible
ability-specific bonuses and applies the source's 500-haste cap. It also corrects
Udyr's stance and Awakened Spirit cooldown classifications and carries qualified
item haste through native and champion-owned clocks. The
[8 November full refresh](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/42468696945)
genuinely recomputed all 14,878 pairings per matrix, with zero reuse; all 29,756
genuine checkpoints match the final outputs. Default payloads changed in 172
plain-stat pairings, all involving Udyr, and 186 build pairings (182 aggregate
scores). All 22 workflow jobs, the full suite, both matrix freshness checks and
the final production build passed. See the accuracy log for the complete result
comparison and the rune audit for the retained Udyr classification distinction
and empowered-lock timing limitation. Step 1 remains in progress.

Bloodline implementation began on 8 November and resumed on 10 November; its
release date remains pending. It adds zero base life steal and 0.45% per completed 100-point stack, capped at fifteen
stacks and 6.75%, plus a one-time direct 85 bonus-health award only at 1,500
points. Each side must declare its own starting points, including zero, and can
select only one of the three Legend runes. Its 42-page combat bundle retains
the previous thirty complete pages and frozen client source. The health award
uses champion-specific conversions, Kled's fixed own-health cap and K'Sante's
original absolute 65% All Out healing ceiling, which direct health can exceed; seeded
health precedes shield setup, while existing shields and reductions are not
immediately resized. Dead or retained-death owners keep progress and permanent
stats without current-health restoration under a conservative, unmeasured
policy. Kled W's fourth-hit and K'Sante All Out's attack-bonus packets gain
explicit source-qualified life-steal eligibility with attack blocking and scaling.
K'Sante's mark and ordinary spells stay excluded, and his 20% omnivamp remains
separate. Broader pet-vamp inheritance
and lethal-packet stack ordering remain qualified. The shared changes require a
genuine full refresh of all 14,878 pairings per matrix. Both matrices, all 29,756
new checkpoint checks and complete default-result comparisons, the full suite, freshness checks and final PR
CI remain pending; no workflow completion or unchanged-default claim is made.

The remaining steps will need their own source review, implementation and
validation. Their calculation costs will be measured as they are built; this
roadmap does not assign an unmeasured runtime multiplier or completion date.
