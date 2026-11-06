# Kit-Based Counter Picker: Plan

Status: M1 to M4 done; M5 built and waiting for your review of the golden matchups; M6 built. A private Codespaces preview starts the packaged app automatically. All-champion expansion began on 2026-10-14. The private workspace's batches 7 to 15 were merged into this branch on 30 October, with this branch's own Gragas, Hecarim, Warwick and Wukong, bringing implemented coverage to 145 of 173 champions. Batches 16 to 19, written here on 31 October, add the last 28: every champion has a kit, with 14,878 unordered pairings. Current data sources use patch 26.21 (Data Dragon 16.21.1). Items and runes are M8 (§13), in progress: the item catalog and every item's effects are done, duels can be played with fixed builds, the build search finds both sides' builds, and the matrix with builds, computed for all 14,878 pairings on 1 and 2 November, is what the app shows by default. The rune source catalog, page-layout validation and explicit stat shards in manual duels and browser plain-stat duels are implemented. Four partial combat effects can be selected in manual plain-stat duels; full rune pages and page search remain unfinished.

The [ordered improvement roadmap](docs/IMPROVEMENT_ROADMAP.md) records the next
eleven improvements. Full rune combat is step 1 and remains in progress; the
four manual effects below are its first partial batch.

Accuracy audit on 2026-10-13: combat, crowd control, movement, budgets, source-backed
champion mechanics, result caches, and ranking consistency were corrected; all 1,176
supported duels and ledger rankings were refreshed. That snapshot's validation was 1,161 tests
passing, 2 active draft golden failures (Garen–Yasuo and Malphite–Yasuo),
and 5 existing skips. Type checks, production build, and all 12 production Chromium
checks pass; all 48 stale-fallback rankings match the current matrix. See
[ACCURACY.md](ACCURACY.md) for the evidence, remaining limits, and current validation;
the milestone reports below retain their historical numbers.

## All-champion expansion

The first batch added Amumu, Annie, Ashe, Brand, Leona, Lux, Master Yi, Morgana,
Nautilus, Rammus, Vayne, and Xin Zhao. That 61-kit snapshot covered 1,830 unordered
pairings and left 112 champions to implement.

The second batch implements Ahri, Cassiopeia, Kassadin, Lissandra, Veigar, and
Vladimir. That snapshot covered 67 of 173 champions, with 2,211
unordered pairings and 106 champions remaining. Its pairings were freshly
rebuilt under fingerprint `cc2d3696…`. Both TypeScript projects, the production build,
583 focused checks, 132 side-swap searches and all 16 browser checks pass. The full
suite has 1,887 passing tests, the two original draft winner failures, and five existing
skips across 89 files. All 66 live fallback scores match the matrix within 2.45e-15.
The private package is identified by `cc2d3696`. The generated
[coverage report](data/16.20/reports/coverage.md)
lists the complete queue and each implemented kit's source-read and assumption counts.

The third batch implements Anivia, Karthus, Malzahar, Vel'Koz, Ziggs and Zyra.
Coverage is 73 of 173 champions, with 100 remaining. All 2,628 unordered
pairs have been refreshed under fingerprint `393ffdb2…`. Its 351 champion regressions, shared kit contracts,
both TypeScript projects and 144 full-variant Darius reflection checks pass.
The final full suite has 2,335 passing tests, the two original draft winner
failures and five existing skips. All 17 production browser checks pass, and all
72 live fallback scores match the matrix within 2.46e-15. Full validation and
remaining limits are recorded in [ACCURACY.md](ACCURACY.md).

The fourth batch implements Caitlyn, Ezreal, Jhin, Jinx, Lucian and Miss Fortune.
Coverage is 79 of 173 champions, with 94 remaining and 3,081 unordered pairings.
All 3,081 pairs are freshly rebuilt under fingerprint `bc04dfd2…`. Pinned source
conflicts and explicit one-dimensional/expected-value assumptions stay with each kit.
The full serial suite has 2,684 passing tests, two original draft winner failures
and five existing skips; types, freshness and production build pass. All 17 production
browser checks pass, including 78 complete live fallback rankings and six new source
pages at phone width. Private delivery packages the frozen model and source snapshot;
evidence is in [ACCURACY.md](ACCURACY.md).

The fifth batch implements Corki, Draven, Kog'Maw, Sivir, Tristana and Twitch.
Implemented coverage is 85 of 173 champions, leaving 88 and requiring 3,570 unordered
pairings. The full matrix was freshly regenerated and passes freshness, type and
production-build checks. The final serial suite has 3,026 passing tests, the two
original draft winner failures and five existing skips. All 17 browser checks pass,
including 84 complete live fallback rankings and six source pages at phone width.
Private packaging verifies the exact compiled/source snapshot and startup helper
before publishing a new preview branch; the previous package remains preserved.
Shared contracts cover moving post-death phases, persistent aftermath, separately
ordered basic packets, piercing basic skillshots, spell-shield consumption and actual
pet contacts. Pinned source gaps remain explicit in the three new pair audits.

The sixth batch implements Kai'Sa, Kalista, Samira, Smolder, Varus and Xayah.
Implemented coverage is 91 of 173 champions, leaving 82. All 4,095 unordered
pairings were freshly regenerated and pass provenance, type and production-build
checks. The final serial suite records 3,397 passes, the two original draft winner
failures and five existing skips. Actual production searches pass strict side
reflection for all 90 Darius rivals and all 15 new-champion pairings. All 17 browser
checks pass, including seven source pages at phone width and all 90 live fallback
rankings. Long formulas now wrap within phone width. Private delivery requires
exact archive/source integrity and five startup checks before publication to a new
preview branch. Shared work covers pre-physical passives, visible fixed-time
missiles, projectile interception, independent dash/channel clocks, terrain flight,
sourced summoned-unit classes, lethal-pet attribution and committed post-death
basic missiles. Source conflicts remain explicit in the three new pair audits.

This branch's seventh batch implemented Gragas, Hecarim, Warwick and Wukong, and merged the
private 91-kit build (`158c0a49`), which had been published only as an archive, into
this branch. Coverage is 95 of 173 champions, with 78 remaining and 4,465 unordered
pairings. Every restriction the four kits quote was broken on purpose to confirm a
test catches it: Warwick 21 of 21, Gragas 14 of 14, Wukong 63 of 63 and Hecarim 47
of 47. `npm run build:data` now also reproduces the curated ability evidence, the
marksmen's included, and all 173 ability records rebuild byte-identically from the
downloads. All 4,465 pairs were computed under fingerprint `090fdf2d…`. The 91 champions
the private build simulated keep its results exactly (24 entries within 2.2e-16). The
full suite has 3,514 passing tests, the two original draft winner failures and five
existing skips. All 41 production browser checks pass, and all 94 live fallback scores
against Darius match the matrix within 3.83e-15. Validation is recorded in
[ACCURACY.md](ACCURACY.md).

On review on 20 October, the two draft expectations that had failed since the wave-3
import now say Yasuo beats Garen and Malphite. After Last Breath his critical strikes
ignore 60% of bonus armor, adding to his armor penetration as the wiki's note says, and
that alone decides both matchups (+0.78 for him). No simulated score changed; the
matrix was refreshed under fingerprint `248fa67b…` because the golden file is part of
it. The full suite passes for the first time since that import: 3,516 tests pass and
the five disputed matchups are skipped.

The private workspace continued from the 91-kit build in batches 7 to 15, recorded below as it reported them; they were merged into this branch on 30 October (see the end of this log).

The seventh batch registers Akshan, Aphelios, Graves, Kindred, Senna and Zeri.
Coverage is 97 of 173 champions, leaving 76 and requiring 4,656 unordered pairings.
Pinned sources include 41 primary ability templates and seven versioned binary files,
including Kindred's Wolf companion. Its source, combat, reflection and full-matrix validation
are complete, and its exact model and source form the seventh private delivery. Shared work covers anchored smoke
vision, camouflage, selective silence exceptions, actual alternative-attack pet contacts,
committed pet projectiles and spatial health floors with separate healing and cost rules.

The eighth batch implements Diana, Ekko, Evelynn, Fizz, Katarina and LeBlanc.
Coverage is 103 of 173 champions, leaving 70. All 5,253 unordered pairs were freshly
computed under fingerprint `50faa123…` with four workers in 7,155.1 seconds. The
source audit validates 33 exact primary revisions, six versioned binary files,
24 objects and 33 exact excerpts. All 676 focused tests, both TypeScript projects,
provenance freshness and production build pass. The final serial suite records
4,283 passes, the two retained draft winner failures and five existing skips.
Strict production searches pass 204 Darius directions and 30 directions among the
new champions, with exact spending and options. All 17 browser groups pass, including
102 complete live fallback rankings and seven source pages at phone width. Shared
work covers selective spell defenses, actual clone/pet classes, cosmetic clone
attacks, pet attack resolution, precise projectile destruction, channel cancellation
windows, live dash tracking and completion-time target validation. Co-location
geometry and ordinary scenario mode rules have dedicated regressions. The private
compiled/source package must pass archive, startup and preservation verification
before publication. Remaining source and geometry limits stay in each audit.

The ninth batch implements Kha'Zix, Naafiri, Nocturne, Rengar, Talon and Zed.
Coverage is 109 of 173 champions, leaving 64. All 5,886 unordered pairs were
freshly computed under fingerprint `d2cb2f6a…` with four production workers,
starting without checkpoints. After an interruption, 854 verified results were
retained under that same fingerprint and the remaining 5,032 pairs were computed.
No checkpoint was imported from another model. The source audit validates 36 exact primary revisions,
six versioned binary files, 37 objects and 115 exact excerpts; all 36 full raw
wiki revisions remain in the authored records. All 1,147 focused tests pass.
The final serial suite records 4,686 passes, the two retained draft winner
failures and five existing skips. Both TypeScript projects, provenance freshness,
production build, 216 Darius reflection directions, 30 new-champion directions and
17 browser groups pass. Kha'Zix has four legal three-evolution variants. Shared work
covers multiplicative total movement speed, explicit death-persistent effects and
pets, independent cast/dash clocks, instant overlays and declaration-timed lines.
The private compiled/source package must pass archive, startup and preservation
verification before publication. Each champion audit retains its source conflicts
and model limits.

The tenth batch implements Hecarim, Jarvan IV, Lee Sin, Wukong, Vi and Warwick.
Coverage is 115 of 173 champions, leaving 58. All 6,555 unordered pairs were
freshly computed under fingerprint `d9b033ae…` with four production workers,
starting with zero checkpoints. Every saved worker index matches that fresh
invocation's canonical dispatch, and no checkpoint was imported from another model.
The source audit verifies 34 primary revisions (33 ability templates and Wukong's
pet article), six exact versioned binaries, 56 distinct game objects across
59 source records and 185 exact excerpts. All full raw revisions are retained.
All 891 focused tests pass. The final unfiltered serial suite records 5,097
passes, the two retained draft winner failures and five existing skips. Both
TypeScript projects, final provenance freshness, the production build, 228 Darius
reflection directions, 30 new-champion directions and 17 browser groups pass.
Shared changes observe resolved damage with actual source/target identities,
preserving damage-based healing before Riposte's late damage negation while
keeping actual health loss and shield absorption separate for damage triggers. They
apply typed shields to real pets, respect explicitly sourced pet state immunity
and preserve exact ability-stage identity for pet crowd control. Wukong's clone
has independent combat state and copied attacks. Missing finite movement timings,
terrain projections and unsupported preduel history remain explicit in each audit.
The private compiled/source package must pass archive, five actual startup checks
and preservation of all ten previous previews before publication.

The eleventh batch implements Alistar, Blitzcrank, Braum, Galio, Gragas and Maokai.
Coverage is 121 of 173 champions, leaving 52. All 7,260 unordered pairs were
freshly computed under fingerprint `0678eb2d…` with four production workers,
starting with zero checkpoints. Every raw saved worker index matches that fresh
invocation's canonical dispatch; no checkpoint was imported or its index rewritten.
The source audit verifies 31 primary revisions (30 ability templates and Maokai's
separate Sapling article), six exact versioned binaries, 61 distinct game
objects across 61 source records and 1058 exact excerpts. Every full
raw revision is retained. All 2,671 focused tests pass. The final unfiltered
serial suite records 5,536 passes, the same two retained draft winner failures
and five existing skips. Both TypeScript projects, final provenance freshness,
the production build, 240 Darius directions, 30 directions among the six new
champions and all 17 browser groups pass. Browser live fallback checks cover
all 120 rivals, and seven source pages are checked at phone width.
Shared mechanics preserve first-packet threshold shields, actual ground and
projectile origins, collision effects before projectile interception ends a
flight, and real pet displacement/death identity. Returning and curved projectiles
retain their individual collision and destruction rules. Channel interruption
exceptions and temporary movement speeds are explicit. Missing finite movement
timings, one-dimensional geometry and unavailable allies remain documented limits.
Private packaging requires archive integrity, five actual startup checks and
preservation of all eleven previous previews before publication.

The twelfth batch implements Nunu & Willump, Rakan, Rell, Sejuani, Taric and Thresh.
Coverage is 127 of 173 champions, leaving 46. All 8,001 unordered pairs were
freshly computed under fingerprint `60f98b36…` with four production workers,
starting with zero checkpoints. Every raw saved worker index matches that fresh
invocation's canonical dispatch; no checkpoint was imported or its index rewritten.
The strict source audit verifies 31 ability-template revisions, including both
independently pinned Rell W forms, six exact versioned binaries, 49 distinct
game objects across 49 source records and 126 exact excerpts.
There are no separate pet-article pins in this batch. Every full raw revision is
retained, original primary values are preserved, and unpromoted evidence is not
accepted. All 3,314 focused tests pass. The final unfiltered serial suite records
6,075 passes, the same two retained draft winner failures and five existing
skips. Both TypeScript projects, final provenance freshness, the production build,
252 Darius directions, 30 directions among the six new champions and all 17 browser
groups pass. Browser live fallback checks cover all 126 rivals and seven source
pages at 390-pixel phone width. Each new kit preserves its own casts, resources,
contacts, control and actual-body lifecycle. Conditional ally effects use real
eligible bodies; missing allies, farm history and unsourced timing remain explicit
limits in the individual audits. Private packaging requires archive integrity,
five actual startup checks and preservation of all twelve previous previews
before publication.

The thirteenth batch implements Janna, Karma, Lulu, Nami, Sona and Soraka.
Coverage is 133 of 173 champions, leaving 40. All 8,778 unordered pairs were
freshly computed under fingerprint `1c41a50f…` with four production workers,
starting with zero checkpoints. Every raw saved worker index matches that fresh
invocation's canonical dispatch; no checkpoint was imported or its index rewritten.
The strict source audit verifies 33 ability-template revisions, including the
three independently pinned Karma Mantra forms, six exact versioned binaries, 100 distinct
game objects across 115 source records and 115 exact excerpts.
There are no separate pet-article pins in this batch. Every full raw revision is
retained, original primary values are preserved, and unpromoted evidence is not
accepted. All 3,754 focused tests pass. The actual unfiltered serial suite records
6,526 passes, two retained draft winner failures, one exhaustive-search timeout
and five existing skips. A subsequent retest of the complete seven-test browser
file passes all seven tests. Distinct assertion coverage across those two commands
is 6,527 passes, two retained failures and five skips; this is a derived count,
not a passing unfiltered suite. The CI harness explicitly revises wall-clock
allowances to 30 seconds by default, 180 seconds for the golden-search driver and
900 seconds for the complete browser variant search. All result assertions and
model inputs remain intact; earlier timing failures are preserved. Both TypeScript projects, final provenance freshness, the production build,
264 Darius directions, 30 directions among the six new champions and all 17 browser
groups pass. Browser live fallback checks cover all 132 rivals and seven source
pages at 390-pixel phone width. Each new kit preserves its own casts, resources,
contacts, control and actual-body lifecycle. Conditional ally effects use real
eligible bodies. Shared rules retain shield-dependent and CC-dependent stats,
exact per-shield absorption, paid target cancellations and real pet declarations.
Hook-created uncertain packets use normal branch-local skillshot forks; actual
ground delays, recipient health expiry and centered contacts keep their own clocks.
Missing allies, farm history and unsourced timing remain explicit
limits in the individual audits. Private packaging requires archive integrity,
five actual startup checks and preservation of all thirteen previous previews
before publication.

The fourteenth batch implements Hwei, Orianna, Ryze, Syndra, Taliyah and Viktor.
Coverage is 139 of 173 champions, leaving 34. All 9,591 unordered pairs were
freshly computed under fingerprint `d2a43aca…` with four production workers,
starting with zero checkpoints. Every raw saved worker index matches that fresh
invocation's canonical dispatch; no checkpoint was imported or its index rewritten.
The strict source audit verifies 40 ability-template revisions and one separately
pinned Orianna Ball article, six exact versioned binaries, 85 distinct game
objects across 85 source records and 169 exact excerpts. Every full raw
revision is retained, original primary values are preserved, and unpromoted
evidence is not accepted. All 4,327 focused tests pass. The actual unfiltered
serial suite records 7,091 passes, precisely two retained draft winner failures
and five existing skips out of 7,098 assertions; its process exits with failure.
All 6,534 previous assertion identities are retained, including all 6,527
previously passing assertions. The exhaustive Heimerdinger–Udyr case passes in
118.862 seconds within the existing 900-second allowance. All five current
golden files and the existing test harness remain byte-for-byte unchanged from
the start of batch 14. Both TypeScript projects, final provenance freshness, the
production build, 276 Darius directions, 30 directions among the six new champions
and all 17 browser groups pass. Browser live fallback checks cover all 138 rivals,
with three new live matchups and seven source pages at 390-pixel phone width.
The actual phone screenshot was visually inspected. The kits retain actual body
and pet identities, cast and resource clocks, vector origins, per-packet recipient
snapshots and finite spell histories. Shared movement notifications preserve
accepted transitions and completed landing effects. Missing allies, farm history,
unsupported lateral geometry and unsourced timing remain explicit limits in the
individual audits. A separate legacy review corrects Wukong's Nimbus Strike:
protected attacks keep their windup and timer, ordinary basic attacks still stop,
and unrelated or already launched attacks remain independent. Its five primary
records and original game excerpts are preserved. The separately pinned
Uncancellable windup revision 4072133 and exact Cyclone interaction note are
restored; 42 old game fields are checked exactly. Private packaging requires archive integrity, five actual
startup checks and preservation of all fourteen previous previews before publication.

The fifteenth batch implements Neeko, Swain, Twisted Fate, Vex, Xerath and Zoe.
Coverage is 145 of 173 champions, leaving 28. All 10,440 unordered pairs were
freshly computed under fingerprint `244198f8…` with four production workers,
starting with zero checkpoints. Every raw saved worker index matches that fresh
invocation's canonical dispatch; no checkpoint was imported or its index rewritten.
The strict source audit verifies 31 original ability-template revisions, 3 separately pinned
supplemental wiki revisions and six exact
versioned binaries, 61 distinct game objects across 63 source
records and 87 exact excerpts. Full raw revisions are retained, original
primary values are preserved, and unpromoted evidence is not accepted.
All 4,766 focused tests pass. The actual unfiltered serial suite records 7,542
passes, precisely two retained draft winner failures and five existing skips out
of 7,549 assertions; its process exits with failure. All 7,098 previous assertion
identities are retained, including all 7,091 previously passing assertions. The
exhaustive Heimerdinger–Udyr case passes in 134.297 seconds within the
existing 900-second allowance. All five current golden files and the existing
test harness remain byte-for-byte unchanged from the start of batch 15.
Both TypeScript projects, final provenance freshness, the production build,
288 Darius directions, 30 directions among the six new champions and all 17
browser groups pass. Browser live fallback checks cover all 144 rivals, with
three new live matchups and seven source pages at 390-pixel phone width.
Root inspected the actual final phone screenshot. The individual audits retain
source restrictions, gameplay assumptions and unsupported mechanics. Actual farm,
allies and spell histories are required where an ability depends on them.
Private packaging requires archive integrity, five actual startup checks and
preservation of all fifteen previous previews before publication.

On 30 October batches 7 to 15 were merged into this branch on the 91-kit import they
grew from, keeping this branch's own Gragas, Hecarim, Warwick and Wukong, the Yasuo
review and the item work. Coverage is 145 of 173 champions, with 28 remaining and
10,440 unordered pairings. All 10,440 pairs were computed under fingerprint
`3f852499…`; a container restart stopped the refresh once, and it resumed from 4,746
verified checkpoints of that fingerprint. The 19,740 directed entries without Gragas,
Hecarim, Warwick or Wukong match the private build's matrix exactly; the 1,140 with
them differ because those four are this branch's kits. The full suite passes: 7,473
tests pass and the five existing ones are skipped. The production build passes too.
Validation is recorded in [ACCURACY.md](ACCURACY.md).

Batches 16 to 19 followed on 31 October, written in this repository: Briar, Lillia,
Nidalee, Rek'Sai, Shyvana and Zac; Bel'Veth, Elise, Kayn, Nilah, Pyke and Qiyana;
Fiddlesticks, Renata Glasc, Shaco, Sylas, Viego and Zilean; and Aurelion Sol, Azir, Bard,
Ivern, Locke, Mel, Milio, Seraphine, Yunara and Yuumi. Every champion now has a kit: 173
of 173, with 14,878 unordered pairings, all computed under fingerprint `d28cd1a6…`. The
20,880 directed entries among the earlier 145 kits are unchanged. The full suite passes
(7,893 tests, five skipped), and so does the production build.
Validation is recorded in [ACCURACY.md](ACCURACY.md).

Each batch must read pinned source values, check meaningful damage/timing/counterplay
cases, exercise ordinary behavior, regenerate all affected duels, and pass type/build
checks before updating the private preview. Unresolved source conflicts and model
limitations stay visible in the kit pages. Golden draft winners and margins are not
tuning targets.

Source audits for twelve casters were recorded in
[docs/next-wave](docs/next-wave/README.md): Ahri, Anivia, Cassiopeia, Karthus,
Kassadin, Lissandra, Malzahar, Veigar, Vel'Koz, Vladimir, Ziggs, and Zyra. These
audits cover pinned formulas, counterplay, tests, and required shared-engine work;
the second and third batches now implement all twelve. Their resurrection,
post-death spellcasting, channel, beam, mine and plant mechanics are covered by
the corresponding batch regressions. The fourth to sixth batches add separate source
audits for their marksman pairs. The seventh batch was read directly from the pinned
sources: each kit page lists its sources and assumptions, and the generated coverage
report counts them.

### First expansion validation (61-kit snapshot)

Production browser validation exposed two reflected-geometry boundaries affecting
Lux–Darius and Xin Zhao–Darius. Projectile forecasts and Darius's Decimate positioning
are corrected, with ten regression checks. All 1,830 unordered duels are rebuilt and
pass the final provenance check. Both TypeScript projects, 258 focused mechanics
checks and ten reflection regressions pass. The full suite has 1,435 passing tests,
the same two active draft golden failures, and five existing skips across 78 files.
The production build and all 13 browser checks pass. All 60 live stale-matrix
recovery scores against Darius agree with the matrix within 2.6e-15, and the phone
layout has no page overflow. Existing timeout limits and fixture expectations are
unchanged. Evidence for that snapshot and current batch validation is recorded in
[ACCURACY.md](ACCURACY.md).

The seventh batch implements Akshan, Aphelios, Graves, Kindred, Senna and Zeri.
All 4,656 unordered pairs were freshly generated under fingerprint `f5ee5ef4…`.
The final serial suite has 3,877 passes, the two retained draft winner failures and
five existing skips. All 539 focused tests, types, freshness and production build
pass. Strict production reflection covers 192 Darius directions and 30 directions
among the new champions. All 17 browser groups pass, including 96 complete live
fallback rankings and seven source pages at phone width. The private compiled/source
package requires exact integrity checks and five startup checks before publication.
Evidence and remaining modeling limits are recorded in [ACCURACY.md](ACCURACY.md).

## 1. What we're building

A static web app for top lane. You pick the enemy champion, and it ranks every champion in the game by how well its **kit** beats the enemy's kit in a **1v1 at level 20**. Every result explains itself down to individual ability interactions.

### Ground rules (decided)

| Rule | Detail |
|---|---|
| Kits only | No win rates, matchup statistics, tier lists or meta. No runes or summoner spells, with one exception: Udyr's Triple Tonic (§4.1). Correctness is checked with hand-written tests (§8), not statistics. M8 (in progress, §13) adds items and runes. |
| Level 20 | Completing the Top Lane Role Quest raises the level cap from 18 to 20, so both champions are level 20. Base stats keep growing through level 20. Effects that scale with champion level use the game's own formulas, which say whether they keep growing past 18 or cap there. Skill points work differently for Udyr (§4.1). |
| Pure 1v1 | No draft, teammates, jungler or lane phases, and no early-game power spikes. |
| Any champion | You can play every champion, so all 173 are candidates. The enemy can also be any champion; champions the client tags as top lane are listed first. |
| Static web app | No backend, accounts or API keys. |
| Stat budget | Both champions get the same amount of gold, as plain stats only (§10). M8 (in progress) replaces it with full item builds and keeps plain stats as a setting. |

## 2. How a counter is decided

Champion B counters champion A when B's kit wins the 1v1 situations that decide top lane:
- all-ins, whoever starts them;
- short trades;
- the spacing game, meaning who controls when a fight happens.

Two engines work together:

1. **Interaction ledger.** Lists every ability-vs-ability interaction between the two kits, built from per-ability data flags and the wiki's interaction notes. Examples: "Poppy W stops Riven's Q dashes"; "Yasuo W can't block Darius E (not a projectile)"; "Teemo's blind doesn't make Gangplank's Q miss".
2. **Duel simulator.** Plays the fights out with exact level-20 numbers: windups, missile speeds, cooldowns, crowd control (CC) durations, shields, heals and resource costs. For each scenario it returns win probability, HP left and time-to-kill, plus a timeline.

The simulator decides the score. The ledger explains it and flags hard counters. Until a champion's simulator behavior is verified, its matchups fall back to a ledger-only estimate marked **partial**.

## 3. Data sources (checked 2026-10-08)

| Source | What we use | Notes |
|---|---|---|
| LoL Wiki `Module:ChampionData/data` | Base stats and growth; attack windup parameters (`as_ratio`, `windup_modifier`, `attack_delay_offset`); pathing and selection radius; client positions | Current. Each entry records its last-changed patch (up to V26.20). |
| LoL Wiki glossary pages ("Dash", "Untargetability", "Spell shield", "Projectile", "Channel", "Types of Crowd Control/Sources" and /Summary, ...) | Which abilities dash, blink or lunge; which grant untargetability, invulnerability, stasis, spell shields or projectile blocking; every source of each crowd control type; channels and charge-ups; the crowd control rules table (what each type disables, tenacity, interrupts, which abilities cleanse it) | Maintained by the wiki's editors, so new or reworked abilities are picked up with the pages. 35 pages, pinned by revision. |
| LoL Wiki ability data, `Template:Data <Champion>/<Ability>` | Values per rank and ratios; cooldown, cost, range, width, missile speed, cast time; flags `targeting`, `projectile`, `spellshield`, `parry`, `grounded`, `knockdown`; **notes** with edge-case interactions | 2,251 pages covering every form and variant (Mini and Mega Gnar, Hwei's 10 spells, Aphelios's weapons, Udyr's awakened stances, and so on). Fetched through the MediaWiki API at 50 pages per request and pinned by revision ID. |
| CommunityDragon game files (16.20) | Authoritative numbers and formulas: base stats, spell calculations (including the level-scaling formulas that decide behavior past level 18), cast times, windup cancel rules, missile data, collision radius | Cross-checks the wiki. A value they state for a champion's base form replaces the wiki's, and each replacement is logged in `reports/game-files.md`. |
| Data Dragon 16.20.1 | Champion roster, ability ranks, icons | Not used for stats: 16.20 reports 0 attack damage per level for every champion. Tooltip text isn't used because it's partly unfilled placeholders. |
| Wiki page "List of champions/Statistics at level 20" | Test oracle for our level-20 stat math | |
| Meraki Analytics | Not used | Stale since about mid-2025 and missing Zaahen and Locke. |

The pipeline runs these stages:
1. `fetch`: cache raw files per patch.
2. `parse`: turn wiki markup into JSON.
3. `normalize`: map everything to one schema.
4. `crosscheck`: compare wiki values with game files and report mismatches.

The result goes into `data/<patch>/`, committed to the repo along with a per-patch diff report.

## 4. Kit model

### 4.1 Champion at level 20

- **Stats.** A stat at level *n* = base + growth × (*n* − 1) × (0.7025 + 0.0175 × (*n* − 1)). At level 20 that is 19.665 × growth, compared with 17 × growth at level 18.
- **Attack speed and windup.** Attack speed growth is bonus attack speed, scaled by the champion's attack-speed ratio. Attack windup comes from the windup parameters.
- **Other basics.** Collision radius (which affects skillshot hit chance), movement speed, health and resource regeneration, and resource pool.
- **Ability ranks and skill points.** A champion gains one skill point per level.
  - **Everyone except Udyr** has every ability fully ranked once 18 points are spent. A few start with one ability already learned (the R of Elise, Jayce, Karma and Nidalee; Yuumi's W), and Aphelios spends his points on bonus stats instead of abilities. For all of them, levels 19 and 20 add stats only.
  - **Udyr** has no ultimate and four abilities with 6 ranks each (24 ranks). He's the only champion whose skill points continue past 18: he gets points at levels 19 and 20, for 20 in total. Triple Tonic's Elixir of Skill adds a 21st point if he drinks it before level 18.
  - Even with 21 points, 3 of Udyr's ranks stay empty, so his rank split is a real choice. The engine tries every valid split in each matchup and uses the best one, and you can pin a split instead.
  - Triple Tonic is a rune, so it's the one exception to "no runes". It's a setting that's on by default for Udyr. When it's on, the rune's other two elixirs (Force and Avarice) also apply, with the effects the wiki gives them.
  - Several of Udyr's Awaken bonuses keep scaling with champion level through level 20. For example, the bonus attack speed from Wilding Claw's Awaken goes from 70% at level 18 to about 75.9% at level 20.
- **Forms and states.** Mini/Mega Gnar, Kayle's evolutions, Nidalee/Jayce/Elise forms, Udyr's stances and awakenings, Shyvana's dragon form, and others.
- **Stack assumptions.** Some kits grow with game time: Nasus Q, Sion W health, Cho'Gath R, Smolder Q, Gangplank's ultimate upgrades and others. The default is "typical by the time a top laner reaches level 20", adjustable per champion.

### 4.2 Ability record

There is one record per ability per form:

- **Numbers at max rank.** Each effect is a base value plus ratios: AD, bonus AD, AP, max or bonus HP, armor, magic resist (MR), attack speed, and the target's max, current or missing HP.
- **Timing.** Cooldown; cast time and whether attack speed shortens it; channel or charge time; recast windows; charges and recharge; lockouts.
- **Geometry.** Range (measured from center or edge), width or radius, missile speed, dash speed and distance.
- **Delivery flags:**
  - targeting type;
  - projectile (can be intercepted);
  - blocked by spell shields;
  - how parries, dodges and blinds treat it;
  - usable while grounded or knocked down;
  - needs a unit, wall or brush.
- **Effects** (typed):
  - **Offense:** damage, empowered attack, auto-attack reset, on-hit, execute threshold, anti-heal.
  - **Control:** each CC type with its duration.
  - **Movement:** dash and blink.
  - **Defense:** shield, heal, damage reduction, untargetable, invulnerable, stasis, CC immunity, unstoppable, cleanse, tenacity, death prevention, revive.
  - **Vision:** stealth, camouflage, reveal.
  - **Other:** stat buff or steal, summons, terrain or zones, transformation, resource gain and spend.
- **Exceptions from the wiki notes.** For example: "Blinding Dart does not make on-hit abilities (Parrrley, Mystic Shot) miss."
- **Evidence.** Every value and effect links back to the wiki revision or game file it came from.

### 4.3 Global game rules

These are encoded once and unit-tested:
- **Damage:** armor and MR multipliers including negative values; the order of reduction and penetration.
- **Defense:** shield order; healing modifiers.
- **Crits.**
- **CC rules:** CC categories, what tenacity reduces, what can be cleansed.
- **Movement:** slow stacking (only the strongest slow applies); movement-speed soft caps; what interrupts a dash.
- **Attacks and casting:** attack timer, windup and cancel rules, spell buffering.
- **Range:** edge-to-edge versus center measurement.
- **Timing:** the server's 30 ticks per second.

### 4.4 Behaviors

Each champion has a behavior that tells the simulator how to play the kit:
- an **all-in** rotation;
- a **short-trade** pattern;
- a **spacing** preference;
- **reactions** to enemy casts.

A default behavior is generated from the ability data: close the gap when out of range, lead with CC, use damage on cooldown, and use defensive tools in response to big threats. Unusual kits get small hand-written TypeScript modules on top. Examples:
- Sylas R steals the enemy's ultimate, so in a 1v1 he gets *your* ultimate.
- Mordekaiser R steals stats.
- Gnar has a rage cycle.
- Riven has animation cancels and a Q chain.
- Fiora's vitals depend on positioning.
- Yasuo R needs an airborne target.
- Illaoi has tentacles; Yorick has ghouls and the Maiden; Heimerdinger has turrets; Gangplank has barrels.
- Sion, Zac and Anivia have revive passives.
- Hwei, Aphelios and Viego have unique kits.

## 5. Interaction ledger

For every ordered pair (your ability, enemy ability), including basic attacks and passives, the ledger runs these checks. What each ability does (dashes, untargetability, the crowd control it applies, ...) comes from the wiki's glossary lists, joined with the ability's own interaction flags and description (§13, M3).

| Check | Examples and edge cases |
|---|---|
| Projectile interception | Yasuo W, Samira W and Braum E against abilities flagged as projectiles. Yasuo's Q3 whirlwind is a missile and can be intercepted. |
| Spell shields | Sivir E and Nocturne W against abilities flagged as spell-shieldable. Partial cases too: a spell shield removes only the silence from Garen Q. |
| Parries and dodges | Fiora W, Jax E and Shen W against attacks and abilities. Riposte stuns back only if Riposte itself negates an immobilizing effect. Lifesteal from a parried hit still heals the attacker. |
| Anti-dash | Poppy W against dashes. It doesn't stop dashes by CC-immune, displacement-immune, untargetable or spell-shielded units, such as Malphite R, Volibear R or Zed R. |
| Grounding | Cassiopeia W and Singed W against movement abilities. |
| Blind, disarm, attack-speed slow | Against basic attacks and attack-based abilities, with the listed exceptions. |
| Untargetable, invulnerable, stasis | Against targeted abilities, when the ability's cast time leaves enough time to react. |
| CC immunity, cleanse, tenacity | Against each CC effect. |
| Interrupts | Hard CC against channels and charge-ups. |
| Death prevention | Against executes. |
| Damage reflection | Against attackers. |
| Reveal; anti-heal | Reveal against stealth; anti-heal against healing. |
| Range | Range measured from center or from edge. Teemo's Q out-ranges his own basic attack by 45–70 units against champions. |

Each entry stores the direction, severity, timing condition and evidence.

## 6. Duel simulator

### Model

- **One dimension.** The simulator tracks the distance between the two champions. 2D effects such as side-stepping, cones and facing enter through the hit model.
- **Event timing.** Events are quantized to the server's 30 ticks per second. Tracked state includes:
  - attack timers, windups and cancels;
  - cast times and missiles in flight;
  - CC, buffs and debuffs;
  - shields and heals;
  - cooldowns, resources, stacks and forms.
- **Skillshot hit model.** Compares two times:
  - the time until impact (cast time plus travel);
  - the time the target needs to leave the hit area, based on movement speed and collision radius, plus reaction time (default 0.25 s) and any dash available.
- **Probabilities.** The simulator branches on the few skillshots that decide a fight (hit or miss) and averages the minor ones. That gives exact win probabilities and is fast enough to precompute every pairing at build time.
- **Skill level.** Both sides play perfectly within human reaction time, including reactions such as:
  - Fiora W into a telegraphed stun;
  - Jax E as attacks come in;
  - Yasuo W into projectiles;
  - untargetable abilities saved for executes.

### Scenarios

Every scenario starts at level 20 with full HP and resource and everything off cooldown.

1. **You engage:** all-in from your best engage range.
2. **The enemy engages.**
3. **Brawl:** fight from melee range.
4. **Short trade:** your best trade, then disengage. The result is the net HP exchanged.
5. **Spacing:** can the longer-ranged or faster side keep its distance and win, or can the other side force contact?
6. **Escape:** can whoever loses the all-in get away?

### Environment toggles (defaults in brackets)

- Minion wave present [on]: dash targets for Yasuo and Irelia; graves for Yorick.
- Walls nearby [on]: Camille E; Poppy and Vayne wall stuns; Illaoi tentacles.
- Brush nearby [on]: Rengar.
- Lane setup [on]: Heimerdinger turrets and Teemo mushrooms placed in advance.

## 7. Scoring and output

- **Counter score.** A weighted blend of the scenario results; the weights live in one config file.
- **Hard-counter badges.** Taken from the ledger.
- **Result basis.** "Simulated" when both kits are simulated, "Interaction estimate" when the result uses the ledger. These labels describe coverage, rather than certifying accuracy.

### Pages

1. **Enemy picker.** A ranked list of all champions with score bars and the top three reasons for each.
2. **Matchup page.** Verdict, scenario results, key interactions, fight timelines, side-by-side level-20 numbers, and the assumptions used.
3. **Kit page.** Everything the engine knows about one champion, with evidence links, so you can audit it.
4. **Settings.** Stat budget, environment toggles, reaction time, stack assumptions, scenario weights, and Udyr's Triple Tonic and rank split.

Every pairing (173 × 172) is precomputed for the default settings at build time. When you change settings, the selected enemy's list is recomputed in a background Web Worker.

## 8. Validation without statistics

1. **Math tests.** Level-20 stats against the wiki's level-20 table; damage, penetration, tenacity and slow stacking; skill points (every champion fully ranked at 18; Udyr at 20 points, or 21 with Triple Tonic).
2. **Interaction tests.** For example:
   - Yasuo W blocks the Q3 whirlwind but not Darius E.
   - Poppy W doesn't stop Malphite R.
   - Teemo's blind doesn't make Gangplank Q miss.
   - Riposte stuns back only under the right conditions.
3. **Golden matchups.** About 60 kit-driven top-lane matchups, written together with you as the domain expert. Each states the expected winner and a rough margin. Draft examples to confirm:
   - Poppy beats Riven, Irelia and Yasuo (W stops their dashes).
   - Teemo beats Tryndamere (blind).
   - Jax beats Tryndamere (E dodges his attacks).

   A failing test blocks a release.
4. **Kit audits.** You skim the kit pages for anything wrong, and each correction becomes a test.

## 9. Build order

| # | Milestone | Done when |
|---|---|---|
| M1 | Data pipeline and level-20 stat math | All 173 champions are fetched and parsed, and their stats match the wiki's level-20 table. |
| M2 | Ability records for every champion, plus kit pages | Every ability is parsed with numbers, flags and evidence, and mismatches with the game files are listed. |
| M3 | Interaction ledger and interaction tests | The ledger works for any pair, and the first usable ranking exists (ledger-only, marked "partial"). |
| M4 | Simulator core and global rules | Generic mechanics pass unit tests on synthetic kits. |
| M5 | Behavior wave 1 (about 25 top laners you choose, e.g. the ones you face most) and golden matchups | Golden tests pass and you've reviewed the results. |
| M6 | Web app on GitHub Pages | Picker, matchup page, kit page and settings are live. |
| M7 | Behavior waves 2 and 3 | All remaining top-lane champions, then all 173, are simulated. |
| M8 | Items and runes (in progress, §13) | Every matchup plays the item build and rune page found best for each side against the other's, and every item and rune has wiki evidence and tests. |
| M9 | Patch automation | A scheduled job refetches the data, rebuilds, runs the tests, and opens a PR with a diff report. |

## 10. Stat budget at level 20 (decided)

With zero items, ability ratios (AP, bonus AD, bonus HP) would add nothing at level 20, and a large part of many kits would never be measured. So both champions get the **same gold budget, spent on plain stats only**, with no item passives or actives:
- The gold is allocated according to each champion's own ratios.
- Defensive stats are split against the opponent's damage type.
- Stats are priced at their base gold values from the wiki.
- Penetration is capped near what a full build's items give: 40 lethality, 35% armor penetration, 20 flat and 40% magic penetration. Uncapped, penetration at gold value cost less than the armor it cancels, both sides bought up to 138 lethality (more than any item build reaches), and armor stopped mattering (decided in M5).

A slider runs from 0 gold (pure kit) up to a full build. The default is 15,000 gold, about what a top laner has when the role quest takes it to level 20 (set in M4; see §13).

M8 (in progress, §13) replaces plain stats with item builds and rune pages; plain stats stay available as a setting.

## 11. Tech and layout

The whole project is TypeScript: Node scripts for the pipeline, Vitest for tests, Vite + React for the UI, and GitHub Pages deployed through GitHub Actions.

```
pipeline/   fetch, parse, normalize, crosscheck
data/       generated kit data per patch (committed)
engine/     game rules, interaction ledger, duel simulator, scoring
kits/       per-champion behaviors and overrides (each override quotes the wiki text it rests on)
tests/      math, interaction and golden-matchup tests
web/        the app
```

## 12. Risks

- **Behavior work is the bulk of the project.** There are 173 champions and 2,251 ability pages including variants. It's done in waves, and the ledger-only fallback keeps the app useful in the meantime.
- **Wiki errors or lag after a patch.** Mitigated by cross-checking against the game files and pinning revisions.
- **The 1D simplification.** Side-stepping, cones and facing are approximated by the hit model.
- **Assumptions shape the results.** Reaction time, environment, stacks and behaviors are all explicit, adjustable and shown on every matchup page.
- **Legal.** The app needs Riot's fan-project disclaimer and attribution under the wiki's license.
- **Items and runes multiply the computing.** Searching builds and rune pages makes a full refresh an estimated 20 to 80 processor-hours instead of about 5 (M8, §13); the build matrix took 78. Incremental refreshes and shards on GitHub's runners (done on 3 November, §13) bring a patch's refresh to about two hours: 26.21's took 98 processor-hours, two hours from the push to the commit.

## 13. Progress

### M1: data pipeline and level-20 stat math (done)

- `npm run fetch` downloads every source for the current patch. That's 173 champions, 174 game data files and 2,436 wiki data pages, of which 1,206 are redirects. Exact versions and wiki revisions are recorded per patch.
- `npm run build:data` writes `data/16.20/`. The engine computes base stats at any level up to 20, including attack speed and windup. Every one of the 175 champion forms matches the wiki's level-20 table, which serves as the test oracle. The one exception is documented: the table shows Jhin's attack speed growing, but his attack speed ratio is 0, so in game it doesn't.
- Skill points are modeled: everyone is fully ranked at 18; Udyr has 20 points at level 20, or 21 with Triple Tonic, and his rank splits are listed.
- Findings:
  - Data Dragon 16.20.1 reports 0 AD per level for every champion. The game files confirm the real values (for example, Darius gains 5 AD per level).
  - The game files replaced 16 wiki values:
    - Vi's AD per level: 3.5 → 3.9;
    - Singed's and Vayne's attack-speed ratios;
    - Locke's selection radius;
    - 12 attack windup values for 11 champions that the wiki hadn't updated.
  - Differences for Mega Gnar and Kled's two forms are reported but not applied.
  - Senna's attack cast time scales with level and stops at 18. This is the game's flag (`mScalePastDefaultMaxLevel`) that decides what keeps growing at levels 19 and 20. M2 reads the same flag for abilities.

### M2: ability records and kit pages (done)

- The wiki's ability pages are parsed with a small wikitext engine. Its value templates (`{{ap}}`, `{{pp}}`, `{{pplevel}}`) are ported from the wiki's own Lua module, so ranks and level progressions come out exactly as the wiki computes them.
- `data/16.20/abilities/` holds 1,057 ability records for all 173 champions:
  - every innate, Q, W, E and R, plus 10 basic-attack pages;
  - cooldowns, costs, ranges, widths, speeds and cast times;
  - the interaction flags: projectile, spell shield, parry, grounded, knocked down;
  - values by rank and by level with their scaling ratios. 99.7% of 1,973 leveling values are fully understood; the 5 exceptions are one-off formulas such as Syndra's AP².
  - crowd control and other mechanics with their durations, and the wiki's notes verbatim.
- `data/16.20/kits/` has a readable page per champion, with every value linked to the exact wiki revision.
- Level 19-20 findings:
  - The game files write the "scale past level 18" flag only when it is false. A level formula without it keeps scaling at 19 and 20.
  - Of the level-based values the wiki defines up to level 20, all 144 that link to a game formula agree with it, with no disagreements.
  - 15 values that stop at 18 on the wiki were extended to level 20 from the game formulas.
  - 94 level-based values have no matching game formula. Their levels 19-20 are marked unknown and get checked per champion in M5.
- 39 of 1,188 ability cooldowns and costs differ between the wiki and the game files, for example Mordekaiser's R and Camille's W cooldowns. They are listed in `reports/abilities.md` but not applied, because an ability's root spell in the game files isn't always the one whose values apply. They are resolved per champion in M5.
- Limitation: mechanics are read from the wiki's keywords. For example, Poppy's W lists "dash" because enemies dash into it. M3 gives each ability's mechanics their exact roles (applies, triggers on, blocks).

### M3: interaction ledger and ledger-only ranking (done)

- **Removed abilities.** The wiki keeps the data pages of abilities that were reworked away, and M2 had read 110 of them as current (for example Kayle's old ultimate and Dr. Mundo's pre-2021 kit). A page now counts as current only when a slot redirect (`Template:Data Corki/W`) or the champion's skill list in Module:ChampionData points to it, which leaves 947 records; the rest are listed in `reports/abilities.md`.
- **Glossary.** What each ability does comes from the wiki's own classification pages: every dash (by targeting), blink and lunge; untargetability, vanish, stasis, invulnerability, spell shields and projectile blockers; channels and charge-ups; stealth and true sight; Grievous Wounds and tenacity; and every source of each crowd control type. That's 1,005 entries from 35 pages, all but one resolved to a current ability. The crowd control rules table (what each type disables, whether tenacity shortens it, whether it interrupts channels, which abilities cleanse it) is parsed as well.
- **Fight profiles** (`profiles/<champion>.json`), one per ability:
  - delivery: the wiki's flags (projectile, spell shield, parry, grounded, knockdown, disruptable) and whether it's an empowered attack, an on-hit spell or a change to every basic attack;
  - the crowd control it applies to the enemy, with duration and conditions ("If Riposte negates ... Fiora stuns the target"), leaving out effects the lists give only against non-champions (Darius's R fears minions, not champions);
  - movement, and whether knockdowns can interrupt it (Malphite's R can't be stopped);
  - the states it gives its caster. A state counts only when the sentence gives it to the caster: Kalista's R protects her Oathsworn and Tahm Kench's R the unit he devours, so neither counts for them.
  - basic attacks at level 20 per form, including Jayce's cannon, Kayle's 625 range from level 16 and Tristana's 700.
- **Curated data** lives in `kits/`: 2 profile overrides (Riposte's parry and Rammus's W returning damage to attackers, both written as prose on the wiki) and 5 attack forms. Each quotes the wiki text it rests on, and the build fails if that text disappears.
- **Ledger** (`engine/ledger/`): 18 checks covering every row of §5. Each entry has the side it favors, the two abilities, a one-line summary, timing (reaction windows from cast time and missile travel, uptime from duration and cooldown), the wiki's conditions and notes, an impact from 0 to 1, and its sources with revision IDs.
  - Some exceptions come straight from the wiki: Teemo's blind doesn't affect on-hit spells such as Parrrley; Riposte stuns back only after negating an immobilizing effect; Poppy's W can only ground a target whose dash it stopped; states from dying or transforming (Kayn's form change, Kog'Maw's zombie state) aren't dodges.
  - The weights are in one file (`engine/ledger/weights.ts`). Impact = how much the countered ability matters to its kit × how much of its use the counter covers × how completely it counters it. One counter used against several abilities counts with diminishing returns.
- **Ledger-only ranking** (marked partial): `counters/<champion>.md` and `rankings.json` rank every champion against every enemy. "Hard counter" badges go to interactions that shut down part of a kit every time it's used (projectiles, basic attacks, dashes, range). The build computes all 29,756 ledgers in about 7 seconds.
- **Commands.** `npm run matchup -- Fiora Darius` prints a full ledger; `npm run counters -- Tryndamere` prints a ranking.
- **What the ranking gets right and where it's limited:**
  - Against Tryndamere, Teemo ranks first (blind and range) and Jax 13th (Counter Strike dodges his attacks).
  - It counts interactions; it doesn't play the fight. Poppy vs Yasuo shows both hard counters (Poppy's W stops Sweeping Blade; Wind Wall blocks Keeper's Verdict) and nets them slightly in Yasuo's favor. Whether stopping Yasuo's dashes wins the fight is the simulator's call (M4-M5).
  - Without damage numbers or the stat budget, ranged champions with a dodge rank high against most melee champions.
- **Tests:** 306 pass. Besides the earlier suites:
  - glossary parsing;
  - profile facts;
  - the §8 interaction tests: Wind Wall blocks the Steel Tempest whirlwind but not Darius's E; Poppy's W doesn't stop Malphite's R; Teemo's blind doesn't make Parrrley miss; Riposte stuns back only against immobilizing effects;
  - ranking sanity checks.

### M4: simulator core and global rules (done)

- **Global rules** (`engine/rules/`). Each rule comes from a wiki page pinned by revision (the pages are fetched with the glossary) and is unit-tested against the wiki's own examples:
  - damage: resistance multipliers, including negative resistances; flat reduction, then percentage reduction, then percentage penetration, then lethality and flat magic penetration; damage dealt modifiers add up, damage received modifiers multiply;
  - shields absorb after resistances, the one expiring soonest first (Black Shield and Camille's W first of all), by damage type; Grievous Wounds cuts healing and health regeneration by 40%; critical strikes deal 200%;
  - movement speed soft caps; only the strongest slow applies; slow resist;
  - crowd control: what each of the 21 types disables, as in the wiki's summary table (a test keeps the two in step); tenacity, which multiplies within a group of sources and adds across groups; what it shortens; displacements; immobilizing types;
  - timing: 30 ticks per second, with durations rounded up to the next tick; ability haste; the attack speed cap and floor; the attack timer (windup, launch, then cooldown).
- **Kit format** (`engine/sim/spec.ts`). A fighter has level-20 stats, a basic attack, and abilities.
  - Each ability is a delivery plus effects:
    - deliveries: self, aura, unit-targeted (instant or a homing missile), line skillshot, ground circle, dash, blink;
    - effects: damage (with ratios of the caster's or target's stats), crowd control, knock-ups, knock-backs and pulls, shields, heals, defensive states, timed stat changes, damage over time, Grievous Wounds, cleanses, empowered attacks, attack resets, executes, projectile walls, delayed effects.
  - Channels and the wiki's interaction flags are part of the format.
  - Kit hooks handle what the generic effects can't. M5 compiles real champions into this format.
- **The fight** (`engine/sim/simulate.ts`, `combat.ts`, `actions.ts`):
  - Every interaction of the ledger happens in the fight as the wiki describes it, including:
    - spell shields; parries (Riposte stuns back only after negating an immobilizing effect); dodges, blocks and reflected damage;
    - blinds, which count only if present when an attack is declared; projectile walls and blocking auras;
    - untargetability, which drops homing missiles and attack windups and cancels a targeted cast without its cooldown;
    - crowd control and displacement immunity; knockdowns on dashes; channel interrupts;
    - minimum health thresholds against executes; sleep that a hit ends but damage over time doesn't.
  - One dimension, with the wiki's range rules:
    - attacks are measured edge to edge, unit-targeted spells and auras center to center, and skillshots center to the target's edge;
    - champions collide by pathing radius (35 for most);
    - charm drags, fear drives away, taunt forces attacks;
    - a target that walks out of attack range during a windup cancels the attack.
  - Windups and casts that end on the same tick all complete before either takes effect, so neither side gets the first word. Two deaths on one tick are a draw. The two sides alternate going first.
- **Skillshots.**
  - The hit chance compares the time until impact with the time the target needs to step out, after a 0.25 s reaction.
  - Decisive skillshots split the fight into a world where they land and one where they miss, weighted by that chance, up to 64 branches. A skillshot is decisive if it applies crowd control or deals at least 15% of the target's maximum health.
  - Minor ones count by their expected value.
  - A ready dash or blink can dodge.
  - The result is an exact probability under the model, and deterministic.
- **Default behavior** (`engine/sim/behavior.ts`):
  - It sees what the enemy starts only after the reaction time.
  - It saves defensive tools for the threats they answer:
    - a spell shield or untargetability for crowd control or a big hit;
    - a dodge for basic attacks;
    - crowd control immunity for immobilizing effects;
    - projectile blockers for projectiles;
    - a minimum health threshold for lethal damage;
    - a dash for a decisive skillshot.
  - It cleanses long crowd control and finishes with executes.
  - It leads with crowd control, throwing crowd control skillshots only when they're likely to land, and uses damage on cooldown.
  - It weaves attack resets between attacks, closes gaps, and kites when it out-ranges the enemy.
  - When chasing, it gets close enough that the target can't walk out of range during the windup.
  - Modes: fight, trade (walk in, use the burst, back off), hold (hit back without chasing), kite, flee.
- **Scenarios** (`engine/sim/scenarios.ts`). These are the six of §6, each scored from −1 to +1 and weighted 0.25 / 0.25 / 0.2 / 0.15 / 0.1 / 0.05:
  - The all-ins start from each side's longest opener, or its attack range.
  - The short trade is scored as the health exchanged in your trade minus in theirs.
  - Spacing applies only when one side out-ranges the other by 100 units or out-runs it by 15.
  - Escape compares how often each side gets away from the other's all-in, within 8 s or 1,400 units.
- **Stat budget** (`engine/budget.ts`, prices in `data/<dataset>/rules.json` from Module:Gold value/data):
  - It buys AD, AP, attack speed, crit, ability haste, lethality, magic penetration, health, armor and magic resistance in 50-gold steps.
  - Each step goes to whichever stat raises ln(damage per second against the enemy) + ln(effective health against the enemy's damage mix) the most. Damage follows the champion's own ratios; ability shields and heals count toward effective health.
  - The allocation runs twice, so each side answers what the other bought.
  - The default is 15,000 gold.
- **Command.** `npm run duel -- Garen Darius [--gold 15000] [--log brawl] [--sweep]` prints every scenario, what each side bought, a fight's timeline, and the score at budgets from 0 to 20,000 gold. Until M5 compiles the abilities, champions fight with base stats and basic attacks only.
- **Assumptions to review** (all in one place: `SimSettings` and `scenarios.ts`):
  - reaction time 0.25 s; hit-model spread 0.06 s;
  - an attack is cancelled once the target is past attack range (the wiki doesn't give a margin);
  - a trade lasts at most 4 s, and is over once the trader is 700 units away;
  - spell shields and similar tools are kept for crowd control or a hit worth 15% of maximum health.
- **Speed.** A matchup (budget plus six scenarios) takes about 26 ms with stats only, so all 29,756 pairings take about 13 minutes on one core. Real kits will cost more; M6 spreads the precompute across cores.
- **Tests.** 388 pass, 82 of them new:
  - the rules against the wiki's examples;
  - every generic mechanic on synthetic kits whose results are worked out by hand:
    - attack timing, missile travel, crits, empowered attacks and attack resets;
    - blinds, dodges, parries, projectile walls;
    - stuns and tenacity, slows and the soft cap, sleep, charm, fear and taunt;
    - delayed effects, dashes and knockdowns, channel interrupts;
    - spell shields with and without time to react, Riposte, untargetability during a cast time, cleanses, minimum health against executes;
    - shields, Grievous Wounds, damage over time and regeneration;
  - branching: weights sum to 1 over 16 branches, the expected value applies below the branch limit, and a dash dodges;
  - kiting, chasing, trades and escapes; mirror symmetry; the budget.

### M5: behavior wave 1 and golden matchups (built; waiting for your review)

- **Wave 1** (my pick; swap any): Aatrox, Camille, Darius, Dr. Mundo, Fiora, Garen, Gwen, Irelia, Jax, Malphite, Mordekaiser, Nasus, Olaf, Ornn, Poppy, Renekton, Riven, Sett, Shen, Teemo, Tryndamere, Urgot, Volibear, Yasuo, Yone.
- **Kits** (`kits/champions/<id>.ts`):
  - Every number is read from the wiki's ability data at level 20 and max rank, by label, field or quoted sentence (`engine/kits/context.ts`). A read fails loudly when the wiki's text changes.
  - Kits read only while they are built; a read during a fight throws.
  - What the wiki doesn't say is written down as an assumption. Each kit page (`kits/<id>.md`) now ends with the simulator's kit: every ability as the simulator sees it, the assumptions, and every wiki value read, with its revision.
  - Values with no level 19-20 formula use their level-18 value; each one is listed as an assumption.
- **Engine additions** for wave 1:
  - shared cooldowns between versions of a spell; casting during a dash (Umbral Dash during The Darkin Blade); aimed dashes and dashes through the enemy;
  - areas with sweet spots and weaker parts (The Darkin Blade, Decimate's handle); attacks split into physical, magic and true damage (Precision Protocol);
  - Purge replacing basic attacks; healing increases (World Ender); slow resist; minimum damage (Infected Bonesaw);
  - fair fights: each fight runs with each side moving first on tied ticks, at half weight each, so every score is exactly the negative of the reverse matchup;
  - crowd control shortens dodging: a stunned target only has the time after the stun to step out of a skillshot;
  - hits whose damage a kit's hooks compute (Haymaker grows with Grit) tell the enemy how big they are, so Riposte can parry them.
- **Wiki vs game files** (the 39 differences from M2): five concern wave 1, and three matter at max rank. The wiki's values are used, since each is a recent change in the ability's patch history that the game files don't have yet:
  - Camille's W cooldown, 10 (V26.16);
  - Jax's Q cost, 50 (V26.12);
  - Mordekaiser's E cooldown, 8 (V26.15).
  Mordekaiser's R and Volibear's Q cooldowns agree at max rank.
- **Stat budget changes:**
  - Percentage armor and magic penetration can be bought at their wiki gold values (41.67 and 46.15 per point). Each point is a separate 1% source, and sources multiply, so it never reaches 100%.
  - Penetration is capped near what items give (§10): 40 lethality; 35% armor penetration, the most items give (Lord Dominik's Regards); 40% magic penetration (Void Staff); 20 flat magic penetration (Spellslinger's Shoes). Uncapped, AD champions spent 5,000 to 7,000 of their 15,000 gold on penetration, up to 138 lethality, and armor stopped mattering. With the caps they buy 1,500 to 6,800 gold of armor.
  - Both sides answer each other over 8 rounds: each round, each side answers the average of what the other has built so far, and the result is the average of the answers. The old two-pass allocation left armor that didn't see the penetration coming.
  - Kits tell the budget what their hooks do: damage, healing, whether they attack at all (Urgot), stats worth more to them (Living Forge; Yasuo's and Yone's doubled crit), and extra gold (Ornn's Masterwork).
- **Results.** `npm run build:data` now runs all 300 wave-1 matchups on every core, in about a minute:
  - `counters/<id>.md` ranks the other 24 by their simulated score (full confidence), above the ledger ranking (partial);
  - `simulated.json` has every score and scenario;
  - `reports/simulator.md` has the standings, the golden matchups and what the budget buys.
  `npm run golden` prints the golden matchups' scores without a build.
- **Bugs the review found** (all fixed):
  - Sett's Right Punch nearly doubled his attack rate; the wiki's note says only its windup is faster.
  - Attacks made from bonus attack range (Riven, Gwen, Nasus, Renekton and Volibear buffs) were cancelled as out of range on every tick.
  - Irelia never used Defiant Dance, and Ornn hardly ever used his ultimate.
  - Fury of the Sands ignored its cap of 240 damage per second.
- **Golden matchups** (`tests/golden/matchups.ts`): 44 drafted, each with the kit interaction it rests on, for you to confirm, change or extend toward the 60 of §8. 41 hold. 3 are marked disputed and skipped by the tests until you decide:
  - Poppy vs Fiora: Fiora wins (−0.74). Poppy's damage is all physical; Fiora answers it with 5,600 gold of armor, and Poppy spends her gold on damage rather than health.
  - Fiora vs Aatrox: Aatrox wins (−0.25). Each of his hits shortens Deathbringer Stance's cooldown, so the budget buys him 312% attack speed.
  - Urgot vs Ornn: even (0.00). Every all-in runs the full 30 seconds: Ornn's armor, worth 30% more through Living Forge, holds against Urgot's all-physical damage.
  Before the penetration caps, Jax vs Tryndamere, Malphite vs Tryndamere, Teemo vs Garen and Gwen vs Malphite failed instead, and Poppy vs Fiora and Urgot vs Ornn held. Teemo vs Garen holds by a hair (+0.02).
- **Findings:**
  - *Scores are nearly all-or-nothing.* 225 of 300 matchups score beyond ±0.6, because a duel has one winner and the all-ins carry 70% of the weight. The score says who wins more than by how much, and one change can move a champion far (fixing Sett's Right Punch took him from first place to near the bottom).
  - *Plain stats bend some builds* away from anything an item build would give: Fiora spends 9,700 gold on AD (her Vitals grow with bonus AD), Gwen 8,500 on AP with no attack speed, Aatrox 7,800 on attack speed.
  - *Standings* (average score): Darius and Fiora lead (+0.64, +0.61); Riven, Yasuo and Urgot trail (−0.58, −0.47, −0.46), and the tanks Ornn and Shen are near the bottom.
- **Tests.** 541 pass and 3 are skipped (the disputed golden matchups). New: every wave-1 kit compiles and fights with several of its abilities, with spot checks of values read from the wiki; the engine additions on synthetic kits; fair-fight symmetry; the budget's penetration; the simulator pages and `simulated.json`.

### M6: web app on GitHub Pages (built; live once Pages is turned on)

- **The app** (`web/`, Vite + React) has four pages. The URL's hash addresses each one, so a static host serves them all from one file:
  - *Picker* (`#/vs/<champion>`):
    - Pick any champion as the enemy.
    - Simulated duels rank the other 24 wave-1 champions (full confidence); open a row for its six scenarios.
    - The interaction ledger ranks all 173 (partial), with hard-counter tags and the strongest reasons.
  - *Matchup* (`#/matchup/<you>/<enemy>`):
    - the verdict and each scenario's outcomes;
    - the timeline of each fight's likeliest branch;
    - both champions' level-20 numbers and what the budget bought;
    - the assumptions and every ledger interaction.
  - *Kit* (`#/kit/<champion>`):
    - base stats at level 20;
    - the simulator's kit, with its assumptions and every wiki value it read, linked to its revision;
    - the ledger's fight profile and the wiki's ability data.
  - *Settings*: gold, reaction time, lane surroundings, scenario weights, and the kit assumptions (Garen's Courage stacks, Nasus's Siphoning Strike stacks, Sett's Facebreaker stun). Udyr's Triple Tonic and rank split wait for his kit (M7).
- **Data.**
  - `npm run web:data` copies what the app reads from the newest dataset into `web/public/data/` (not committed). Every web build runs it.
  - Default results come precomputed from `simulated.json`.
  - The ledger runs in the browser from the profiles and the glossary.
- **Settings** stay in the visitor's browser.
  - Changing the weights reruns kit variant selection and the duels, because weights can change which rank split or upgrade is best.
  - Changing anything else reruns the duels against the chosen enemy, in up to four Web Workers (about 5 s for 24 duels). A banner says the results use the visitor's settings.
- **Shared ability text.** The text that describes abilities, effects and profiles moved from the pipeline's Markdown pages into `engine/`:
  - `engine/sim/describe.ts`;
  - `engine/abilityText.ts`;
  - `engine/profileText.ts`.

  The kit pages in `data/` and the app now say the same thing.
- **Timelines** now say who inflicts crowd control: "Darius: inflicts airborne for 0.50 s". The old line read as if Darius were airborne.
- **Deploy.** `.github/workflows/pages.yml`:
  - type-checks, tests and builds every pull request;
  - on each push to main, also publishes `web/dist` to GitHub Pages.

  Pages must be turned on once: Settings → Pages → Source: GitHub Actions.
- **Browser check** (Playwright, against the production build):
  - the picker loads in under a second;
  - a matchup simulates in about 0.8 s and matches `simulated.json`;
  - no page scrolls sideways at phone width (390 px), in light or dark mode;
  - no console errors.
- **Tests.** 557 pass and 3 are skipped. New tests cover:
  - the routes;
  - the settings: cleaning stored values, which changes rerun the fights, and blending;
  - four matchups run the way the browser runs them, which must match `simulated.json` to its three decimals, so the app's code and the precomputed data can't drift apart.

### M7: behavior wave 2 (built)

- **Wave 2**, 24 more top laners: Akali, Ambessa, Aurora, Cho'Gath, Gangplank, Gnar, Heimerdinger, Illaoi, Jayce, Kayle, K'Sante, Kennen, Kled, Pantheon, Quinn, Rumble, Singed, Sion, Skarner, Tahm Kench, Trundle, Udyr, Yorick and Zaahen. With wave 1, 49 champions have kits, and `simulated.json` holds 1,176 matchups.
- **Kits** that needed the most care:
  - *Udyr*: 24 stance ranks for 20 skill points (21 with Triple Tonic). Each matchup plays the rank split best against that enemy.
  - *Jayce*: two stances whose spells keep their own cooldowns, running in both stances; Hammer Stance's resistances hold only while he is in it.
  - *Kled*: Skaarl takes hits until she flees; Courage remounts him once.
  - *Gnar*: Rage, then Mega Gnar for 15 s, then tired for 15 s. Catching the boomerang or the boulder refunds part of their cooldown, and GNAR! stuns into walls.
  - *Sion*: Glory in Death's frenzy. *Tahm Kench*: grey health and Devour. *Skarner*: Ixtal's Impact into walls, broken by crowd control.
  - *The pet champions*: Illaoi's Tentacles and the Spirit; Yorick's graves, Mist Walkers and the Maiden; Heimerdinger's turrets, beams and upgrades (each matchup plays the upgrade best for him); Gangplank's Powder Kegs, which chain.
- **Engine additions**:
  - abilities: charge-ups, ability charges, recast chains, post-effect cooldowns and cooldown refunds;
  - movement: accelerating charges, charges the enemy can step aside from, leaps that take a fixed time, charges that lock on; casts and channels the caster can move during don't hold it still for skillshots;
  - fights: forms, lethal saves and two-life champions, invisibility, terrain, fields (chasing ones, and ones whose pulses come in clusters), damage that falls off on repeated hits, and damage over time that stacks;
  - pets: summons that fight, pets that count hits (Tentacles, kegs), pets their owner sets off, leashes, and area damage on pets;
  - kit variants: options each matchup chooses between, recorded for both sides when both kits have a choice (Heimerdinger against Udyr).
- **Lane setup.** When the lane was set up in advance (the default), Teemo's mushroom, Illaoi's Tentacle, Yorick's graves and Heimerdinger's turrets are on the field as the fight starts. The settings page turns that off for all four.
- **Audit** of the wave, narrower than planned: four kits (Akali, Ambessa, Aurora and Cho'Gath) were read in full against the wiki, and the other 20 only where a fight or the usage scan raised a question. The fights of all 24 were watched, and all 49 kits were scanned for abilities that never get used. It found:
  - Riven only used Wind Slash when it would kill, so it went unused in most fights. She now also fires it at its full bonus for the enemy's missing health, below 30% health, or just before Blade of the Exile ends; the bonus is read from the wiki.
  - Aurora's Between Worlds now leaps (25 to 250 units) before the shockwave, which starts ahead of where she lands.
  - Cast times: the wiki's "Cast time" article says nothing interrupts them except death, which is what the engine does. Charges and channels are interrupted as before.
- **Round robin of 49** (average score against the other 48; `reports/simulator.md` has the full table):
  - top: Yorick +0.74, K'Sante +0.61, Trundle +0.58, Fiora +0.54, Zaahen +0.51;
  - bottom: Akali −0.71, Ambessa −0.61, Pantheon −0.52, Skarner −0.50, Sett −0.46.
- **Outliers**, checked against the wiki and their fights; no kit bug was found behind any of them. A win is any score above 0:
  - *Yorick* wins 47 of 48 and loses only to Zaahen; all his wins but Aatrox (+0.21) are by 0.25 or more. His summons' damage is mostly their own: a Mist Walker hits for 113 at level 20 and the Maiden for 100 (plus Touch of the Maiden's share of maximum health), with 20% and 30% of his bonus AD on top, as the wiki gives it. That bonus is small next to their base damage, so the budget buys him health and resistances instead (5,600, 4,600 and 1,600 gold on average), and the health also makes his summons tankier: they get 15% and 60% of his bonus health.
  - *K'Sante* loses only to Fiora, Olaf, Yorick, Trundle, Tryndamere and, narrowly (−0.21), Garen. His abilities scale with bonus armor and magic resistance, so the resistances the budget buys are also his damage; All Out adds true damage on top.
  - *Trundle* loses only to Dr. Mundo, Nasus, Tryndamere, Tahm Kench and Yorick: Subjugate takes 30% of the enemy's maximum health and 40% of its resistances.
  - *Akali* loses 47 of 48 matchups; her one win, over Pantheon, is narrow (+0.24). Her abilities scale with AP, but per gold the budget's damage model finds AD better for her, since it also feeds her attacks; without items like Lich Bane or Hextech Rocketbelt, she ends up an auto-attacker with weak spells. This is the cost of plain stats (section 10), not of her kit.
  - *Ambessa* spends her budget on damage (5,000 gold of AD, 3,000 of critical strike, no health) and loses the long fights.
- **Golden matchups.** 25 new kit-driven expectations for wave 2, across the existing groups: dashes Poppy stops, range and blinds, dodges and parries, tank busters, immunity and armor. 64 of 69 hold. Two new ones are disputed, with what the simulator shows instead:
  - Trundle beats Dr. Mundo: Mundo's 8,600 gold of health, Maximum Dosage and armor outlast Subjugate.
  - Malphite beats Gangplank: both buy armor, so Gangplank's true and magic damage carry the long fight.
- **Tests.** 744 pass and 5 are skipped (the disputed golden matchups). New: every wave-2 kit's values from the wiki and its fights, tick by tick; the engine additions on synthetic kits; both sides' kit options in matchups, in the build and in the browser.
- **Known gap: quoted restrictions can go untested.** A kit quoting a wiki rule ("Trial by Fire cannot be applied with Parrrley nor Powder Keg") only checks that the sentence is still on the wiki; the kit's code enforces the rule, and a test may or may not. Breaking the four restrictions Akali, Ambessa and Aurora quote, in eight ways one at a time (attacks that don't break stealth, or break it at the wrong point of the windup; Ambessa acting while she holds the enemy), failed no test, and seven of the eight changed matchup results: with Ambessa able to attack while she holds the enemy, her loss to Gnar (−0.56) becomes a win (+0.76). Before wave 3: a test for each quoted restriction, each shown to fail when its rule is broken, then a full audit of the 49 kits.

### M8: items and runes (in progress)

It starts once all 173 champions have kits; at the M7 pace (46 kits from 14 to 20 October) the last 78 take about two weeks. M8 itself is about 5 to 7 weeks of work. Each matchup then plays the item build and rune page found best for each side against the other's, instead of plain stats.

Progress (20 October, while the remaining kits are written elsewhere):

- **Item data, done.** `npm run fetch -- --only items` and `npm run build:items` write the catalog to `items.json` and `reports/items.md`. It holds the 106 finished items, the 7 tier-2 boots and the 3 transformed Tear items, with each effect's notes and values by level, and the wiki rule pages item effects quote (`--only item-rules`).
- **Item effects, done.** Every item's effects are modeled from its wiki text, or left out with a reason (`items/`, `reports/item-effects.md`): 99 item modules, and 12 items whose effects can't act in a duel (allies, takedowns, summoner spells, other enemies). `npm run duel -- A B --items "..." --enemy-items "..."` plays a matchup with fixed builds. With both builds fixed, a matchup's six scenarios take 0.25 to 0.85 s.
- **Build search, first version (1 November).** `npm run duel -- A B --search` finds both builds (`pipeline/items/search.ts`). A quick estimate (`items/estimate.ts`) scores a build by the stat budget's objective with each item's stats, stat statuses (percentage penetration), critical strike damage and on-hit effects, matching what `equipItems` puts on the champion; it takes about 60 µs. A beam search fills the build slot by slot, keeping the best builds overall and the best of each profile (AD, crit, attack speed, AP, tank); one-item swaps that keep the profile polish each route; the sides answer each other for four rounds; then each side's three best routes fight the other's, and Udyr's rule picks. A matchup takes about 6 to 8 s of search and 1 to 13 s of fights.
- **Item hints for the quick estimate (1 November).** The first version saw no passive that works through hooks (76 of 106 items), so it leaned to crit and attack-speed items. Each such item now gives the estimate a hint (`ItemBudget`, `items/equip.ts`, read from the same wiki numbers as its hooks): what its hooks and actives give on average over the stat budget's ten-second reference fight, as stats (Rabadon's Deathcap's AP, Liandry's Torment's Suffering), statuses on the enemy (Black Cleaver's armor reduction, Frozen Heart's cripple, Grievous Wounds), damage (Spellblade, Kraken Slayer, actives), healing and shields (Sterak's Gage's Lifeline, Guardian Angel's revive). Shared arithmetic is in `items/hints.ts`: what triggers before the fight ends, Spellblade's procs after casts, stacks gained from none, what a shield absorbs while it lasts. Life steal and omnivamp heal; Grievous Wounds counts against the enemy's heals, the part of the objective buying stats never changed; item haste for some abilities and item mana count as well. Nine items keep no hint: seven whose effects are slows, movement speed or cleanses, which the estimate doesn't value, Horizon Focus (damage beyond 600 units, rare in a duel) and Serpent's Fang (the enemy shields it cuts aren't valued yet). The stat budget itself now reads damage dealt and taken modifiers and healing modifiers, as the fight applies them; of the 173 kits only Kassadin starts with one (10% less magic damage), so only his stat budget changes.
  - Checked against fights (`tests/items/hints.test.ts`): a holder with 12,000 gold of plain stats holds the item against an idle enemy that comes back to full health instead of dying, so ten seconds of damage count and missing health runs from none to all. For Darius, Vayne, Ahri, Malphite and Jax, most items that deal damage of their own come within 25% of their fights; the test holds Darius's twenty such items to that. The rest differ where a kit casts or attacks less in fights than the budget assumes: Spellblade on Malphite and Ahri (about twice), attack-count items on ranged champions who kite (about 1.5 times), Terminus's penetration on Ahri.
  - Fixed on the way: Bandlepipes and Fimbulwinter never saw crowd control from casts, because item ticks come before a tick's actions; they read the previous tick's now.
  - Searches now find bruiser routes (Darius: Guardian Angel, Trinity Force, Frozen Heart, Sterak's Gage, Experimental Hexplate, Black Cleaver). Still leaning: Zhonya's Hourglass, Guardian Angel and Terminus come up for most champions, mages included.
- **Kits calibrated to their own fights (1 November).** The stat budget's reference counts every attack at attack speed and every ability once per cooldown, and kits differ in fights: the budget gives Darius 66% of the damage per second he deals, Ahri twice her casts, Annie two and a half times hers. Item hints follow the same counts, so on-hit and Spellblade items gained on mages. The search now calibrates both sides first (`pipeline/items/calibrate.ts`, about a second): each champion with the stat budget's plain stats fights the enemy, idle and coming back to full health, for ten seconds from three distances, and its damage, basic attacks and casts against the reference's give shares (within a quarter and four times) that the estimate scales its terms by (`BudgetHints.calibration`; the stat budget never sets it). One share for all damage: fights log an empowered attack (Crippling Strike) as an attack where the reference counts its bonus as the ability's. Passives that depend on when casts come (Spellblade's cooldown, Liandry's Torment's burn) walk the calibration fights' own cast times: of three models tried against eight kits' fights with Trinity Force, they came closest (19% off on average, against 37% for evenly spaced casts and 41% for all abilities cast together at the start); fights that change pace with items stay off (Darius executes sooner with Trinity Force: half the procs).
  - Defensive hints, checked against a steady attacker (`tests/items/hints.test.ts`): Darius stands idle, so that only his items keep him alive, against 250 damage a second in small hits, physical or magic, and the time he lives longer turns into health. Sterak's Gage, Immortal Shieldbow, Seraph's Embrace, Death's Dance, Protoplasm Harness, Guardian Angel (its stasis left out), Kaenic Rookern, Banshee's Veil and Edge of Night come within 30% (most within 20%). Not checked so: healing over time (Unending Despair), which a fight that long counts beyond the budget's ten seconds, and omnivamp, which needs the holder to fight.
  - What the searches find, checked in fights: Zhonya's Hourglass and Guardian Angel come up for most champions, and fights agree that a stasis or a revive decides a duel. Vayne's searched build (Zhonya's Hourglass, Yun Tal Wildarrows, Edge of Night, Mortal Reminder, Guardian Angel, Infinity Edge) scores +0.79 against Garen's searched build; Kraken Slayer for Zhonya's, +0.53; Blade of the Ruined King for Guardian Angel, +0.29; a standard marksman build (Blade of the Ruined King, Guinsoo's Rageblade, Kraken Slayer, Phantom Dancer, Lord Dominik's Regards, Infinity Edge), −0.03.
  - Cost: the estimate takes about 200 µs for a full build with its hints (60 µs before), so a matchup's search took 25 to 30 s, and fights 2 to 42 s.
- **A faster search (1 November).** About 12 s a matchup now (14 sample matchups: 8 to 18 s), from 30 to 55 s:
  - Valuations (`budgetScope`, `engine/budget.ts`): while the budget values finished units, their derived stats (`withSettledStats`, `engine/sim/derived.ts`), damage per second, damage multipliers and ability uses are worked out once each; checking a unit's statuses on every derive was half the estimate's time. A full build's estimate takes about 120 µs.
  - Rounds: the sides answer each other until a pair of best builds comes back. They often go round a cycle instead of settling (Darius and Garen each alternate between two builds, one answering the other's), so each side's routes now hold the cycle's other best builds, for the fights to see; in Darius against Garen they show Darius's crit build losing to Garen's other build.
  - A smaller beam (8 builds and 1 of each profile, from 20 and 3): on 16 matchups the final score was the same in 13 and moved either way in 3, in half the search time.
  - Routes are screened (`screenScore`): the all-in scenarios with one branch each choose the routes, and only the pair chosen plays every scenario. Against every scenario on ten matchups, the screen chose another pair in five, whose full score was within 0.05 of the full choice's, in a fifth to a half of the time.
  - The matrix with builds would take about 50 processor-hours (12 to 13 hours on four cores), within the 20 to 80 estimated. Kit variants (Udyr's rank splits, Aphelios's weapons) keep the builds found for the default variant and choose between variants in fights, as the duel command already does.
- **The build matrix (1 November).** `npm run build:builds -- --threads 4` plays the build search for all 14,878 pairings (`pipeline/sim/builds.ts`, `buildsWorker.ts`), six items each, and writes `simulated-builds.json`: both directions' scores and scenarios, each side's build as indices into a list of the items named, and the variants played by kits with a choice. `reports/builds.md` gives each champion's most-built items across its matchups.
  - Each pairing is checkpointed as it finishes (`.cache/builds/<dataset>/<format>/<fingerprint>/`), so a run that stops resumes where it left off. The fingerprint (`buildsProvenance`) covers the simulation's inputs, the item code, the build search and the item catalog; `--check` holds the written file to it.
  - `--smoke` plays each kit against the next (172 pairings), and its checkpoints count for the full run. The first smoke run found two kits (Aurelion Sol, Azir) whose calibrated estimate of an empty build was inflated, so that no item looked useful and the search found no build; the estimate now scales a calibrated kit's own damage the same way with items and without, and the search falls back to every item when too few help on their own. The second smoke run played all 172 without failures in 12.8 minutes.
  - The full run took 19.4 hours on four threads, not the 12 to 13 estimated: 77.8 processor-hours, 18.8 s a pairing on its thread against 12 s alone. No pairing failed (ACCURACY.md has the validation).
  - What it shows: 94% of builds hold Guardian Angel or Zhonya's Hourglass, and Yun Tal Wildarrows (72%) and Terminus (62%) come up for most champions, tanks and some mages included. Against the plain matrix the scores correlate at r = 0.65. Two limits show: in a lopsided matchup the losing side's build barely moves the result, so its listed build is close to arbitrary (Malphite's found build against Darius scores within 0.03 of a tank build or an ability power one); and ranged champions with basic-attack builds keep melee kits without a long enough gap-closer out of reach, with no summoner spells or terrain in the duel (Annie with a critical strike build beats Darius at +0.91). Both are open questions for the next version: a tie-break toward builds that fit the kit when fights can't tell routes apart, and summoner spells.
- **The app with builds (1 November).** Where the dataset has a current build matrix, the picker ranks the duels with item builds by default, each row opening on both sides' builds, and the matchup page shows the result with builds above the plain-stats fights; plain stats are a toggle on both pages and in the settings (`web/src/builds.ts`). The build search is too slow for the browser, so the builds hold at the default fight settings: scenario weights reweigh their scenarios, the plain stats' gold doesn't enter them, and any other changed setting shows plain stats. The web export publishes the matrix with its fingerprint, and the app leaves out one that doesn't match the current inputs.
- **The plain-stats matrix, refreshed (2–3 November).** The build search changed `engine/budget.ts`, and with it the simulation fingerprint, so `npm run build:sim` recomputed every pairing (about 6.9 hours on four threads). 14,734 of the 14,878 are identical to before; the 144 that changed all involve Kassadin, whose 10% magic damage reduction the stat budget now reads.
- **Incremental refresh (3 November).** Each matrix records what its pairings were computed from (`inputs`, `pipeline/sim/pairKeys.ts`): a shared key for the code a fight runs (the worker and every module it imports, kit modules aside), the stat prices and the runes, and for item builds the item catalog and the format; and a key per kit, for its module and its champion, ability and pet records. Provenance enters neither (wiki revision ids, game-file versions, URLs and hashes, the patch a champion last changed in). `npm run build:sim`, `npm run build:builds` and `npm run build:data` take a pairing's result from the dataset's own matrix, or else the previous dataset's, when its shared key and both kits' keys are unchanged, and compute the rest (`pipeline/sim/reuse.ts`). With nothing changed, a refresh takes 3 seconds instead of 7 hours (plain stats) or 19 (builds).
  - What it saves on a patch: 26.21's data, as fetched, changes the records of 69 kits, so 9,522 of the 14,878 plain-stats pairings (64%) would be recomputed. Only 33 of those champions' numbers changed; the others have edited notes or wording, which a kit's key counts because kits quote notes and descriptions. Keying each kit on what it actually reads would bring that toward the 35% of pairings the number changes touch. Every patch so far changed some item, and the catalog is in the build matrix's shared key, so that matrix is recomputed in full each patch.
  - A reused plain result needs its stat spending, which the simulator report reads: `simulated-spent.json` keeps it, to the whole gold piece. Scenario scores keep three decimals and spending whole gold everywhere now, so that a page shows what the files hold and a reused result reads back exactly. That moved 2,761 of the counter pages' 178,536 scenario cells (1.5%) by 0.01 once, which had been rounded twice; no aggregate score or rank changed.
  - `--plan` prints how many pairings a refresh would compute, and `--shard i/N` computes only the i-th of N shares of them into checkpoints, for machines to split a refresh; a run without it writes the outputs.
- **Sharded refresh on GitHub Actions (3 November).** `.github/workflows/refresh.yml` runs a refresh on GitHub's runners. A plan job counts the pending pairings and splits each matrix's into shards, one per hour of computing on a four-core runner and at most 20 (in all since 26.21, shared between the matrices; `pipeline/sim/ciPlan.ts`); each shard computes its share into checkpoints; a last job reads them all back, writes the outputs, checks them, commits them to the branch and runs the tests. It starts when `.github/refresh-request.json` changes on a branch, or from the Actions tab, and runs the same Node.js version as local refreshes so that both give the same numbers to the last bit. Standard runners are free for a public repository: a full build-matrix refresh (about 78 processor-hours) takes about an hour on twenty of them. Its first run (3 November) computed Darius's 172 pairings in each matrix again on five runners and reproduced every committed result exactly, six minutes from the push to the commit. This is the computing half of M9; the scheduled refetch and the pull request with a diff report remain.
- **Patch 26.21 (3 November).** The first patch moved with the incremental and sharded refresh.
  - The fetch was compared with 26.20 (33 champions' numbers changed, 5 items), and 27 re-pinned wiki pages were read again.
  - 15 kits and 3 item effects took 26.21's wording.
  - The tests moved to dataset 16.21; `data/16.20/` stays as the previous patch's snapshot.
  - `npm run build:data -- --skip-duels` built everything but the duels in minutes.
  - The refresh workflow then computed the 10,222 plain-stats pairings whose inputs changed (4,656 reused from 26.20) and the whole build matrix, whose item catalog changed. That took 98 processor-hours on 25 runners, and the commit came two hours after the push.
  - One golden matchup no longer holds as reviewed: Trundle still beats Sion, but by +0.18 rather than the "clear" margin (+0.46 under 26.20). Sion's health growth (95 a level, was 87) accounts for all of it, so on review the expectation is now slight (ACCURACY.md).
  - 8 of the 76 recomputed kits changed only in comments or assumption texts that named 16.20. The kit key hashes the module's source, so it counts them; their 804 pairings came out identical. Kits name no patch now, so this won't recur.
  - GitHub took 20 jobs at a time, so 5 of the 25 shards waited up to 48 minutes for a runner. The plan now sizes the two matrices' shards together, at most 20 in all (`planShards`): for this refresh, 4 plain-stats and 16 build shards of about 72 minutes, about 75 minutes in all.
  - 35 kits' assumption texts were then respaced (ACCURACY.md). Their fights didn't change, but their keys did, so a refresh computed their 5,425 pairings per matrix again on 3 and 7 shards sized together. All of them came out identical, 1 hour 27 minutes from the push to the commit.
  - Shards with interleaved shares of the same kind of pairings took from 38 to 86 minutes, so the slowest runner, not the plan, set the time.
- **Rune sources and page structure (4 November).** The separate `rune-catalog.json` contains all 62 current runes in five paths and seven stat shards. Its offline build verifies pinned Data Dragon 16.21.1 and CommunityDragon 16.21 inputs against 63 complete wiki revisions, retaining source hashes, path/row membership and original descriptions. `npm run build:runes -- --check` detects changed sources or stale catalog/report output. `npm run runes:page -- --file page.json` validates primary, secondary and shard selections structurally. New rune effects, champion-specific substitutions and page search are not applied. The existing combat `runes.json` and both matrices remain separate. The [rune audit](docs/runes/README.md) records the scaling-health conflict: the wiki reaches 200 at level 20, while the client tooltip stops at 180.
- **Stat shards in manual duels (5 November).** `npm run duel -- A B --shards 5005,5001,5001 --enemy-shards 5008,5008,5011` now applies all seven stat-shard types from six complete pinned rule revisions. Shards are installed once at actual fight initialization, before the kit's setup, preserving innate effects, forms, resurrection and stat conversions. Two scaling-health shards add 400 health at level 20. Adaptive force compares purchased bonus AD with AP, excludes champion passives and uses the champion's recorded type on ties. The plain-stat allocation remains its no-shard reference; actual fights and kit-variant comparisons include the shards. All seven shard types also work with reviewed fixed item builds. Adaptive eligibility pins the complete catalog and item implementation, counts fixed eligible passives and excludes Awe/Void Infusion. Rabadon, Overlord, Blackfire, Hubris and Mejai remain blocked, as does Sterak on forms with differing base AD. Shards with `--search` remain unsupported until valuation accounts for them. Kai'Sa now records rune AD/AP/attack-speed origins separately: these stats improve combat and Supercharge timing without qualifying for Living Weapon evolutions. All seven shards work for her in plain-stat duels and reviewed fixed item builds. These manual options do not change precomputed picker results or full rune pages. Source conflicts and all assumptions remain in the [rune audit](docs/runes/README.md).
- **Browser stat shards (5 November).** Settings now offers separate opt-in shard selections for your counter candidates and the enemy. Each choice reruns plain-stat duels in browser workers; both cached matrices are bypassed, and selections enter the live result/cache keys. The controls show compiled level-20 values, including 200 health per scaling shard. Every kit variant receives the same side’s choices before variant selection, combat snapshots include them, and Swap sides carries the shard choices with the champions. Stored legacy settings retain the existing defaults. A compact, revision-bound shard bundle is compiled from the retained sources during atomic web export; invalid or unavailable selected data fails clearly. Full pages and item-build shard search remain separate.
- **Partial manual combat runes (6 November).** `--combat-runes` and `--enemy-combat-runes` apply only the selected effects of Coup de Grace (8014), Cut Down (8017), Last Stand (8299) and Second Wind (8444), from twelve complete pinned Wiki revisions and the versioned 16.21 game perks file. Selections must fit a legal page, so the three Precision choices cannot be combined. Full-page fillers are never equipped. Every kit variant receives the appropriate side's effects before selection; the purchased-stat allocation remains its no-rune reference. Combat-rune flags support plain-stat duels only and reject fixed items and build search pending item-amplifier composition review. The damage amplifiers retain the engine's aggregate damage model rather than the source's separate amplifier instances. Second Wind's current-missing-health sampling and half-second first pulse are declared model assumptions. See the [rune audit](docs/runes/README.md) for exact rules and limits.
- **Not yet:** complete rune combat, champion-specific page substitutions, browser combat-rune selections and rune-page search. These are part of step 1 in the [ordered roadmap](docs/IMPROVEMENT_ROADMAP.md).

See ACCURACY.md for the validation.

- **What changes.**
  - Two ground rules (§1): items and runes join the kits. The plain-stat budget (§10) becomes a setting, so the kit-only view stays available.
  - Builds are full: six finished items without boots, or five with one of the seven tier-2 boots. The two formats are a toggle (decided on 20 October): a search plays one of them, for both sides (`pipeline/items/rules.ts` `BUILD_FORMATS`), and the app gets the switch. Order doesn't matter, and no item appears twice. Full builds cost more than the default 15,000 gold, which stays for the plain-stat setting.
- **Item data and behavior** (done on 20 October).
  - The catalog for patch 26.20 (Data Dragon 16.20.1, purchasable on Summoner's Rift) is 106 finished items (105 at 2,000 gold or more, plus Mejai's Soulstealer) and 7 tier-2 boots. Left out: trinkets, consumables, starters, components, basic Boots, the 7 tier-3 boots (free upgrades), the 5 support quest upgrades, items only one champion can buy, and 33 copies the data carries for other modes.
  - Items put their stats, passives and actives on a champion's kit through the engine's extension points, without changing the engine (`items/equip.ts`). Shared mechanics: Spellblade, Lifeline, Energized, Annul, Immolate, combat status, ultimate and basic ability haste, decaying shields.
  - Actives are abilities the default behavior casts: it saves Zhonya's Hourglass for the threats stasis answers, as kits' defenses are.
  - Actives can be used under any crowd control but knock-ups and stuns (suppression, sleep and stasis count as stuns), and the cleanse item (Mercurial Scimitar) under stuns too, never knocked up (confirmed on 20 October; suppression counting as a stun confirmed on 1 November). The wiki stops items under every cast-inhibiting type, silence included; kit abilities keep that rule.
  - Stacks a game gathers are options with stated defaults: Tear items are stacked and transformed, Yun Tal Wildarrows and Rod of Ages are fully stacked, and Mejai's Soulstealer and Heartsteel have none.
  - What the engine can't express yet, to fix with the next matrix refresh (each changes the fingerprint):
    - Randuin's Omen's Resilience: the damage hooks can't tell a critical outcome from an ordinary one.
    - Heal and shield power, shields received (Spirit Visage) and champion size.
    - Actualizer's doubled costs and faster cooldowns.
    - Tenacity groups: the wiki adds the groups (Mercury's Treads' 30% and Courage's 60% are 90%); the engine multiplies them (72%).
    - The engine's own stasis state lets a unit act (Lissandra's Frozen Tomb on herself). Item stasis stops attacks, walking and casts itself.
- **Runes** (about 1 week).
  - The source catalog now holds all 62 runes and seven stat shards, with exact raw inputs and source revisions. Combat `runes.json` still holds only Triple Tonic until the new effects are implemented.
  - About half matter in a level-20 1v1. The others are recorded as having no effect, with the reason.
  - Runes that stack over a game (Legend, Conditioning, Eyeball Collection) need stated assumptions about what they have gathered by level 20.
- **Item rules** (confirmed on 20 October). A build holds at most one item from each group:
  - %pen: Lord Dominik's Regards, Serylda's Grudge, Mortal Reminder, Void Staff, Cryptbloom and Terminus;
  - Spellblade: Trinity Force, Lich Bane, Essence Reaver, Iceborn Gauntlet and Dusk and Dawn;
  - Lifeline: Sterak's Gage, Maw of Malmortius, Immortal Shieldbow and Protoplasm Harness;
  - Hydras: Ravenous, Titanic and Profane Hydra, and Stridebreaker;
  - Sunfire Aegis or Hollow Radiance; Mortal Reminder or Morellonomicon (Grievous Wounds); Banshee's Veil or Edge of Night (Annul).
  - The Tear items (Manamune, Archangel's Staff, Winter's Approach) can be combined.
  - That leaves 1,538,705,768 builds per side with six items, or 661,723,587 with five items and boots, by the toggle.
  - These rules stand (kept on review, 20 October), and `pipeline/items/rules.ts` gives them to the build search; `items.json` counts the builds above from the catalog. The game file's own caps, which the wiki's limits match (`reports/items.md`), differ in three places:
    - The Tear items are one per build (TearItems), and so are Archangel's Staff and the Lifeline items.
    - Mortal Reminder and Morellonomicon can be combined.
    - Penetration is two groups, both with Terminus: Lord Dominik's Regards, Mortal Reminder, Serylda's Grudge and Black Cleaver (LastWhisper), and Void Staff, Cryptbloom and Bloodletter's Curse (VoidPen).
  - Under the game file's caps there would be 1,510,649,782 or 653,589,622 builds per side.
- **Build and rune search** (1 to 2 weeks).
  - Each side has about 1.5 billion builds with six items, or 0.66 billion with five items and boots, and about a million rune pages. Fighting every pairing of builds alone, at about 0.1 s a pairing, would take about 7.5 billion processor-years per matchup with six items (1.4 billion with boots), so nothing is searched exhaustively.
  - Per champion, the search drops items its kit can't use and items another beats on every stat it uses, at the same price or less. For hybrids such as Kai'Sa and Kog'Maw this removes little, which the steps below don't depend on.
  - The quick estimate, like today's stat budget (about 23 µs a build), assembles builds slot by slot. It keeps the best 50 partial builds and tries one- and two-item swaps, so thresholds such as Kai'Sa's evolutions can be crossed.
  - So that it doesn't settle on one route: it starts once from each usable finished item, keeps the best few builds of each profile (mostly AP, attack speed, crit or tank), and restarts from random swaps.
  - Both sides take turns answering each other's build for 8 rounds, as the stat budget does now. Runes follow the same turns: keystone first, then each row and the shards; items and runes alternate a few times.
  - Each route's best build gets real fights, and each side takes the loadout that does best against the other's best answer: the rule Udyr's rank splits use. The matchup page lists each route's best build with its score, and routes within a small margin as equally good.
  - On a sample of matchups, hybrids first, a much larger search measures how often this one misses a better build.
  - The result is the best loadout found within the model, not a guaranteed optimum.
  - Player data, such as lolalytics' most-built items (31 for Kog'Maw top in Emerald+), is kept for the comparison at the end. Limiting the search to it would hide niche builds.
- **Incremental refresh and the app** (about 1 week).
  - Refreshes recompute only the matchups a change affects (done on 3 November, above). Changes to the golden file, the pages or the reports recompute nothing.
  - The picker, the matchup pages and the Kit Counter Picker show each side's build and runes.
- **Computing.**
  - A matchup costs about 4.6 seconds of processor time now (4,465 pairs in 5,184 s on four workers), stat budget included. With both builds fixed, one matchup's fights take 0.12 to 1.4 s (Kog'Maw's 0.18 to 0.29 s).
  - All 173 champions make 14,878 pairs. With the search above, a matchup takes about 5 to 20 seconds, and tens of seconds for hybrids. That's roughly 20 to 80 processor-hours per full refresh: under a day on four cores, about an hour on 64. To be measured once items exist.
- **Limits it keeps.**
  - Best means best for a level-20 1v1 in these scenarios. Laning, item timings, teamfights and team composition stay out.
  - Items change most patches, so each patch update re-checks them; M9 automates that.
- **Done when** every matchup records both sides' builds and runes, every item and rune has its wiki evidence and tests, and the golden matchups are reviewed again with items. Items capture counters that plain stats can't, such as Randuin's Omen against critical strikes if it is still in the game. Some reviewed results may change, Yasuo against Garen and Malphite among them.
