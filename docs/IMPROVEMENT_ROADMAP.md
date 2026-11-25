# Accuracy and usability roadmap

These improvements are being taken in the agreed order. The existing champion,
item and stat-shard coverage remains available while each step is implemented
and checked. This list records goals, not a claim that the work is complete.

| Order | Improvement | Status and scope |
|--:|---|---|
| 1 | Full rune combat effects | **In progress.** The source catalog, page-layout validator and seven stat shards are available. Twenty-one partial manual plain-stat effects cover Taste of Blood, Font of Life, Aftershock, Overgrowth, Shield Bash, Bone Plating, Grasp of the Undying, Coup de Grace, Cut Down, Last Stand, Second Wind, Absorb Life, the three Legend runes, Triumph, Presence of Mind, and all four Precision keystones, Press the Attack, Fleet Footwork, Lethal Tempo and Conqueror. Press the Attack is the first Precision keystone. Its 17 November refresh reproduced all default results across 173 champions. Presence implementation began on 13 November; its local provenance refresh reused all 14,878 pairings per matrix with zero new computation. Complete default result payloads are unchanged; local validation passed 9,510 tests with five existing skips. Pull-request checks run separately against the delivery head. Triumph's genuine full refresh and checkpoint audit completed on 11 November, with default result payloads unchanged. Each selected Legend requires declared starting points and currently progresses only from real champion-body kills. Haste's genuine full matrix refresh and release checks completed on 8 November, including the observed default-result changes. Bloodline's genuine full refresh and checkpoint audit completed on 10 November: plain-stat payloads are unchanged and 22 build pairings changed. Complete pages, remaining keystones and effects, champion-specific substitutions, browser effect controls and page search remain unfinished. |
| 2 | Controlled in-game measurements | Planned. Compare recorded damage, timing and interactions with reproducible in-game setups, retain the setup and patch, and turn discrepancies into mechanics regressions. |
| 3 | Summoner spells and browser boots format | **Implemented** (merged 24 November 2026). The seven spells that act in a duel (Flash, Ignite, Exhaust, Barrier, Heal, Ghost, Cleanse) are modeled from the wiki's spell data with their casting rules; manual duels take `--spells`, and the build matrix gives each side Flash and the second spell that does best in screen fights against the other side's. Smite and Teleport do nothing in a duel. The browser shows each matrix build's spells, and a second build matrix with five items and boots, chosen beside six items and plain stats. |
| 4 | Better combat decisions | **In progress.** Scans of every champion's fights find decisions that cost the fight, and each change is kept only if it helps on average and the golden matchups still hold. First batch (24 November): no basic attacks the enemy walks out of, for kits' own behaviors too (cancels 1.21 → 0.33 a fight); rooted champions keep attacking and casting; Thresh's lantern self-shield; buffs kept for crowd control or dashes go up when the enemy has none. Second batch: kiting champions no longer stand in a melee enemy's reach (Caitlyn +0.52 on average), and Karthus keeps mana for Lay Waste. Tried and left out, with their measurements: chaining crowd control onto a held enemy, counting knock-backs in the attack check, shielding dashes in range, and low-health blocks. Spacing, chase, disengage and ability sequencing remain. See the [accuracy log](../ACCURACY.md#roadmap-step-4-attacks-the-enemy-walks-out-of-24-november-2026). |
| 5 | Dynamic item mechanics and adaptive selection | **In progress.** First items (25 November): Ionian Boots' Ionian Insight (summoner spell haste, now that duels have summoner spells) and Randuin's Omen's Resilience (critical strikes' damage cut, applied to the critical share of expected damage); 85 of 116 items have every effect modeled. Then Actualizer's Mana Made Real (doubled mana costs, ability damage, faster basic cooldowns). Still to do: heal and shield power (5 support items and Actualizer's healing and shielding; its wiki rule page isn't pinned yet), and changing stacks and conditional passives valued consistently by the build search's estimate and adaptive shards. |
| 6 | Joint item, rune and shard optimization | Planned. Search compatible loadouts together, account for their interactions in valuation, and retain the actual loadout behind each result. |
| 7 | Ranking stability | Planned. Show how sensitive close rankings are to scenario weights, uncertain assumptions and search choices, rather than treating small score differences as decisive. |
| 8 | Automated patch monitoring | Planned. Detect source changes, produce reviewable diffs and refresh affected results. Incremental reuse and distributed refreshes already provide the computing foundation. |
| 9 | Game-stage presets | Planned. Extend the controlled level-20 setup with declared levels, budgets, ranks and stack assumptions for other stages of a game. |
| 10 | Better two-dimensional geometry | Planned. Improve side-stepping, facing, area placement, terrain and pet positions beyond the current one-dimensional approximations. |
| 11 | Phone and offline app features | Planned. Add persistent offline access, champion pools and saved comparisons with clear model-version and update behavior. |

Step 1's twenty-one manual effects use the retained patch 26.21 sources. The health
amplifiers and Press the Attack use the simulator's aggregate outgoing-damage model; the source's
separate amplifier damage instances are not represented. Second Wind's missing
health sampling and first regeneration pulse are explicit timing assumptions.
Item-build composition is not yet reviewed, so combat-rune flags reject fixed
items and build search. See the [rune audit](runes/README.md) for commands,
numeric rules, provenance and compatibility limits.

Taste of Blood heals the injured owner after qualifying champion damage.
Its current bonus-AD and AP scaling, full-health gate and cooldown follow
the pinned rules. [Taste of Blood rules](runes/README.md#taste-of-blood) · [Accuracy log](../ACCURACY.md#taste-of-blood-20-november-2026)

Font of Life heals the owner when qualifying crowd control applies. The
manual model uses the native heal and the current form's ranged modifier. [Font of Life rules](runes/README.md#font-of-life) · [Accuracy log](../ACCURACY.md#font-of-life-20-november-2026)

Aftershock grants capped resistances from accepted immobilization and detonates
a 350-unit magic shockwave at expiry. [Aftershock rules](runes/README.md#aftershock) · [Accuracy log](../ACCURACY.md#aftershock-20-november-2026)

Overgrowth uses each side's declared qualifying deaths for flat gains and
the separate base and bonus health increase. The simulator applies their
champion-specific health handling before combat. [Overgrowth rules](runes/README.md#overgrowth) · [Accuracy log](../ACCURACY.md#overgrowth-19-november-2026)

Shield Bash adds a separate adaptive proc based on the strongest eligible
shield peak. The model follows health shields through growth, absorption,
and their two-second grace period. [Shield Bash rules](runes/README.md#shield-bash) · [Accuracy log](../ACCURACY.md#shield-bash-19-november-2026)

Bone Plating adds three post-mitigation reductions within a 1.5-second
window after the first qualifying hit. The simulator tracks individual casts
and preserves the cooldown through revival. [Bone Plating rules](runes/README.md#bone-plating) · [Accuracy log](../ACCURACY.md#bone-plating-19-november-2026)

Grasp of the Undying adds the first Resolve keystone for manual duels. Its
damage clock qualifies the next champion on-hit for a separate magic proc,
an ordinary heal and direct permanent bonus health. The 19 November refresh
verified all 14,878 pairings per matrix and reproduced both previous default
results. [Grasp rules](runes/README.md#grasp-of-the-undying) · [Accuracy log](../ACCURACY.md#grasp-of-the-undying-19-november-2026)

Conqueror gives manual duels all four Precision keystones. It adds
adaptive force, full-stack healing and cast identity for repeated damage
and reviewed summon attacks. The 19 November refresh recalculated and
verified all 14,878 pairings in each matrix, reproducing both previous
default results. [Conqueror rules](runes/README.md#conqueror) · [Accuracy log](../ACCURACY.md#conqueror-19-november-2026)

Lethal Tempo adds timed attack speed stacks, immediate form-dependent scaling
and separate adaptive projectile damage. Its manual duel model fires the first
bolt from an attack made with six stacks already held. The 19 November
refresh verified all 14,878 pairings in each matrix, matching both published
default results. [Lethal Tempo rules](runes/README.md#lethal-tempo) · [Accuracy log](../ACCURACY.md#lethal-tempo-18-november-2026)

Fleet Footwork adds declared starting charges, charge gain from movement and completed attacks, and healing on champion contact. The 18 November recovery verified all 29,756 default pair results and reproduced both published matrices. [Fleet rules](runes/README.md#fleet-footwork) · [Refresh audit](../ACCURACY.md#matchup-refresh-and-recovery)

Press the Attack adds accepted on-hit application events and a bounded champion-combat activity surface. Its level-20 formula, per-ability eligibility, same-tick activation exclusion, one five-second activity clock and pet/clone limits are recorded in the [rune audit](runes/README.md#press-the-attack-first-keystone-and-declared-event-policies). The 17 November refresh computed 14,878 pairings per matrix with zero reuse and the audit verified all 29,756 new checkpoints.

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

Bloodline implementation began on 8 November; its genuine full refresh and
checkpoint audit completed on 10 November. It adds zero base life steal and
0.45% per completed 100-point stack, capped at fifteen
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
and lethal-packet stack ordering remain qualified. The
[10 November full refresh](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/42769645596)
computed all 14,878 pairings per matrix with zero reuse, and all 29,756 genuine
checkpoints match the final forward/reverse outputs. Plain-stat payloads are
unchanged; 22 build pairings changed, all involving Kled or K'Sante. Aggregate
scores changed in 22, scenarios in 19 and decoded build lists/item sets in nine;
variants and spending are unchanged. All 22 workflow jobs and 9,151 tests across
262 files passed, with five existing skips. The accuracy log records validation
receipts and the complete comparison. These results do not establish a globally
optimal build search or measured live-game accuracy. Step 1 remains in progress.

Triumph is an explicit manual selection with no inferred pre-fight entitlement. It stores 2.5% maximum HP plus 5% missing HP at the immutable native credit frame before all `onKill` callbacks, then uses ordinary healing on the first upkeep at its one-second deadline. This native phase, maximum-HP timing, delivery-time modifiers and recipient lifecycle are declared policies with unmeasured live behavior. The heal never prolongs a completed duel. Its +20 gold is economic reference only; assists, farm, pet victims, the repeat-takedown update bug and friendly missile-destruction exceptions remain unsupported. Triumph and Absorb Life share a row; one Legend can accompany Triumph with explicit starting points.

The 47-page combat bundle preserves the prior 42 complete objects and frozen full client source. The genuine [11 November full refresh](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/43056538392) computed all 14,878 pairings per matrix with zero reuse; all 29,756 new checkpoints match final forward/reverse outputs. Complete default result payloads are unchanged. All 22 jobs and 9,280 tests across 266 files passed, with five existing skips; both matrix freshness checks, the 24 formerly stale-file tests and production build passed. The offline catalog freshness check passed on 12 November; final PR validation is tracked in the accuracy log. These results do not establish live-game accuracy or repair the earlier documented build-selection regressions. Full pages, browser effect controls, item/rune composition and rune-aware allocation/search remain unfinished. Step 1 stays in progress.

Presence of Mind implementation began on 13 November as the tenth partial manual effect for explicit Mana/Energy users. The detailed level-20 source curve supplies 56 mana (44.8 for the current owner's ranged form) or 6 energy per accepted damage event, with one eight-second cooldown consumed even at full resource. Native actual champion-body kill credit schedules 15% of the current derived maximum resource one second later. Current-cap sampling, shield/zero packet criteria and recipient lifecycle are explicit policies; delayed resource restoration is separate from Triumph healing and never extends an ended duel. Normal dead/zero-HP damage observation, execute-only damage events, clone targets and general clone-origin attribution remain bounded limits. The local refresh reused all 14,878 pairings per matrix with zero new computation. Both TypeScript projects, ordinary matrix freshness, catalog freshness and the browser build passed; the complete default comparison found unchanged result payloads. The full local suite passed 9,510 tests across 269 files with five existing skips; pull-request checks run separately against the delivery head. No new checkpoints or full recomputation are claimed. Full pages, browser combat-rune controls, item/rune composition and rune-aware search remain unfinished. See the [rune audit](runes/README.md) and [accuracy log](../ACCURACY.md).

The remaining steps will need their own source review, implementation and
validation. Their calculation costs will be measured as they are built; this
roadmap does not assign an unmeasured runtime multiplier or completion date.
