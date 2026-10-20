# Accuracy and validation

The counter score describes the repository's controlled level-20 1v1 model. Both sides
receive the same gold budget for plain stats. Each result should expose its scenario
scores, kit assumptions, fight timeline, and source revisions. A simulated result is
not an observed player win rate. The app distinguishes simulated fights from
interaction estimates; neither label certifies every interaction or behavior.

## Evidence first

Champion numbers and mechanics are read from the committed patch dataset. Kit code
must use the recorded wiki values and exact notes, including exceptions and level-19–20
scaling. A familiar matchup outcome is not enough evidence to change a mechanic.
Conflicting sources must remain documented until resolved.

There are two complementary checks:

- Mechanics regressions exercise synthetic fighters or source-backed champion kits
  with exact expected damage, timing, status, and resource behavior.
- Golden matchups are player-review drafts under the declared model. Their winner and
  margin expectations must not be used to tune undocumented damage, budgets, or weights.

## Corrections made in this audit

- True damage follows its distinct reduction rules and the post-V25.S1.3 amplification
  rules. Life steal uses post-mitigation damage, including shield absorption.
- Riposte resolves shields and healing in the recorded order. Parrying an immobilize
  empowers Fiora's shock; it does not automatically stun the incoming caster.
- On-hit effects keep expected-value scaling and explicit spell-shield exceptions.
  Attack hooks distinguish a damage block from a dodge and a resolved attack from a hit.
- Temporary protection ends before incoming effects on its expiry tick. Damage over
  time keeps its final scheduled pulse; expired walls and traps cannot block or trigger.
- Formula-based channels deliver the exact pulse count over their duration. Dashes
  cannot skip contact or an anti-dash aura within one tick. Interrupted overlay dashes
  preserve their underlying cast.
- Crowd control respects the documented minimum shortened duration, slow-resist
  stacking, independent cripple stacking, and distinctions between slow and cripple
  immunity. Forced-action crowd control cannot voluntarily sidestep a skillshot.
- Stat allocation accounts for innate effects, damage floors, critical multipliers,
  mutually exclusive spell versions, target-scaled incoming DPS, feasible purchases,
  and the actual attack opportunities within timed empowerment windows.
- Kit variant selection treats both players symmetrically and returns the actual
  selected pair's builds and scenarios.
- The interaction ledger respects defense-specific exceptions, empowered attacks,
  non-dispellable effects, delayed defensive states, vulnerable channel phases, and
  committed effects that survive untargetability.
- Source-backed kit regressions cover Fiora, Poppy, Ornn, Mundo, Urgot, Camille, Jax,
  Garen, Quinn, and Trundle, including King’s Tribute at its recorded level-20 value,
  Vault's exceptional windup interruption, and Perseverance's shield-damage exception.
- Yasuo's Last Breath locks him out of actions during suspension, respects its spell
  shield exception, and ignores bonus armor only for critical damage. Critical and
  ordinary outcomes receive their own mitigation before being averaged into one hit,
  preserving shield, health-floor, vamp, and hook ordering. Steel Tempest uses its
  separate source-backed thrust and whirlwind cast-time curves and static cooldown.
- Budget candidates and behavior predictions evaluate dynamic cast times and cooldowns
  with combat's tick rounding. Ability haste does not shorten static cooldowns.
- Browser caches include source identity and every setting that affects variant
  choice. Old default variants cannot silently pin a run with changed settings.
  Cancelling a run frees its worker without rejecting other active jobs; synchronous
  worker failures also settle their jobs and release the worker slot.
- Generated rankings, CLI results, and the browser use the same full-precision aggregate
  score. Scenario columns round only for storage/display. Equal scores use a stable
  champion identifier order.
- Stateful damage formulas now resolve once against the pre-hit state. Darius's stack
  multiplier and Riven's missing-health multiplier participate in the same mitigation,
  shield, health-floor, healing, and hook transaction as their base damage. Nested caster
  effects retain the victim's stats when their formula refers to the target.
- Explicitly permitted casts preserve an attack at its original launch tick, including
  Darius W into Q and Malphite W into R. Critical chance is captured when the attack is
  declared. Whole-attack spell-shield exceptions and empowered shield destruction are
  represented separately from ordinary shieldable on-hit crowd control.
  Defensive perception includes the preserved attack alongside its cast, uses committed
  critical and shield metadata, and excludes attacks directed at pets. Future attack
  forecasts still use the stats available when the forecast is made.
- Yasuo's Q retains stacks and Q3 knockup when attack defenses deny damage; blind does
  not deny it. E crosses the target with its fixed distance, grants its special Flow,
  and respects knockdown exceptions. R places Yasuo on the target's opposite side.
- Malphite's Granite Shield starts its regeneration clock on the first absorbed hit
  without refreshing it on later shield-only hits. Q steals the enemy's actual raw
  movement-speed loss. Thunderclap's extra damage excludes life steal and its protected
  windup gates Q and E.
- Aatrox's shielded Q contacts reduce his passive cooldown. Darius applies one bleed
  stack per W attack, and his R multiplier uses the stacks present before damage.
  Renekton's empowered Dice and multi-strike W no longer duplicate damage; W's critical
  strike, Fury, and shield destruction follow their specific exceptions. Riven's passive
  respects defenses and life steal, while Exile's buff and cooldown use their actual clocks.
  Renekton's first-strike critical bonus uses the declared critical chance, including
  when a formula multiplies it by attack damage.
- Urgot's execution recast launches a homing chain, then starts its mobile channel only
  after successful suppression. Cleansing suppression cancels the execution. Immunity,
  untargetability, source death, delayed casts, cooldown release, Purge pauses, and
  Tryndamere's one-health exception have explicit lifecycle coverage.
- Tryndamere's Mocking Shout reduces total attack damage, with bonus AD floored separately.
  His instant Q/R preserve an attack windup. Teemo's stocked mushrooms use ability hit
  defenses, and persistent damage does not cancel Move Quick. Tahm Kench's attachment
  follows successful suppression; Tongue Lash's stun and stack consumption use the stacks
  present at impact, and Tongue Lash and Regurgitate enforce their own lockouts.
- Courage and Brittle use the newer, ability-specific additive exception from Courage
  revision 4064595. Independent tenacity groups continue to combine multiplicatively.
- The matchup stats table shows the selected builds both before kit initialization and
  after initial effects/hooks. This captures innate critical modifiers and immediate
  resistance changes without advancing combat to produce a misleading passive snapshot.
- Reflected range boundaries use the same spatial tolerance for completing an attack
  and ending an escape/trade. Floating-point differences can no longer select an extra
  attack or regeneration tick solely from swapping the two champion positions.
- Fiora can cast W/E/R during Lunge. A timed Riposte preserves the dash, fires from its
  ending position at the original cast time, and keeps its remaining lockout. Lunge's
  420-unit stab search uses centers. Bladework's first attack cannot critically strike;
  its second guaranteed critical uses the declaring attack's chance for its adjustment.
- Apprehend's airborne lasts one second while its approximate forced movement lasts
  half a second. Those clocks are represented independently.

## Rebuilding and checking results

After changing simulator, kit, scoring, or parsed input files, run:

```sh
npm run typecheck
npm run build:sim -- --threads 4
npm run build:sim -- --check
npm test
npm run build:web
```

`build:sim` uses committed parsed data without a raw download. It refreshes all
supported simulated pairs, kit simulation sections, counter pages, ledger rankings,
and reports. Generated outputs carry a content fingerprint of their model and inputs.
The browser and CLI reject stale or incomplete matrices. A refresh checks that its
inputs stayed unchanged before writing its results.

Completed pairs are saved atomically under the ignored `.cache/sim/` directory. A retry
reuses only checkpoints whose fingerprint, pair, budget, scenario values, aggregate,
builds, and variants validate. A refresh discards its checkpoints if its inputs change.
The web exporter checks its input fingerprint before and after copying, retries changed
snapshots, and preserves the previous complete export if it cannot publish a replacement.

The pinned rules used in this audit include [True damage revision 4052642](https://wiki.leagueoflegends.com/en-us/True_damage?oldid=4052642),
[Life steal revision 4060425](https://wiki.leagueoflegends.com/en-us/Life_steal?oldid=4060425),
[Perseverance revision 4038338](https://wiki.leagueoflegends.com/en-us/Template:Data_Garen/Perseverance?oldid=4038338),
and [Steel Tempest revision 4072892](https://wiki.leagueoflegends.com/en-us/Template:Data_Yasuo/Steel_Tempest?oldid=4072892).
Champion ability JSON files retain the source revision and exact notes used by kit code.
The specific Courage/Brittle grouping follows [Courage revision 4064595](https://wiki.leagueoflegends.com/en-us/Template:Data_Garen/Courage?oldid=4064595),
with the older [Tenacity revision 4021927](https://wiki.leagueoflegends.com/en-us/Tenacity?oldid=4021927)
retained as conflicting generic evidence. The latest lifecycle audit also checks
[Devour revision 4063964](https://wiki.leagueoflegends.com/en-us/Template:Data_Tahm_Kench/Devour?oldid=4063964),
[Granite Shield revision 3973718](https://wiki.leagueoflegends.com/en-us/Template:Data_Malphite/Granite_Shield?oldid=3973718),
and the remaining exact notes recorded by each kit's compiled evidence.
The final source review also uses [Lunge revision 4007770](https://wiki.leagueoflegends.com/en-us/Template:Data_Fiora/Lunge?oldid=4007770),
[Bladework revision 3906658](https://wiki.leagueoflegends.com/en-us/Template:Data_Fiora/Bladework?oldid=3906658),
and [Apprehend revision 3906616](https://wiki.leagueoflegends.com/en-us/Template:Data_Darius/Apprehend?oldid=3906616)
for casting permissions, centered stab range, critical exceptions, and independent movement/control clocks.

Use `npm run duel -- <you> <enemy> --log <scenario>` to inspect a result. Compare live
browser runs with the refreshed matrix, including champions with kit variants.

## Validation on 13 October 2026

- Both TypeScript projects pass `npm run typecheck`.
- All 1,176 supported unordered duels were recomputed with four workers. The refresh
  wrote 226 simulator and ledger files and retained the parsed champion, ability,
  profile, rule, rune, pet, and glossary inputs.
  That snapshot's model fingerprint is `b1311dfa0642fc86d3a56e9fc15813dd6c5e9fd884918287d3c16eab1c97194b`.
- `npm run build:sim -- --check` passes. Repeating the refresh reused all 1,176
  validated checkpoints in 6.9 seconds and left all 733 dataset files byte-for-byte
  identical.
- The full suite (`npm test -- --maxWorkers=4`) has **1,161 passing tests, 2 failing
  tests, and 5 skipped tests** across 68 files. The existing five disputed skips and
  every golden winner/margin remain unchanged.
- The full Heimerdinger–Udyr variant-search regression passes with a finite
  180-second limit; its completed search took 106.5 seconds in the final suite.
- The production build passes. Production Chromium passes all 12 checks: current matrix
  admission, cached picker ranks, live scores and initialized stats, changed weights,
  cancellation, worker-failure retry, unsupported champion labels, mobile table scrolling,
  and complete stale-matrix fallback. All 48 fallback rankings match exactly; the maximum
  score difference is `7.77e-16` (tolerance `1e-10`). Browser, HTTP/request, and worker
  error counts are zero, with no unfinished posted jobs in all three contexts.

The active draft failures are:

| Expected winner | Opponent | Corrected score for expected winner |
|---|---|--:|
| Garen | Yasuo | −0.775843 |
| Malphite | Yasuo | −0.775933 |

Fiora–Darius now holds at **+0.078503**. Its source review corrected Lunge's stab
reach/casting permissions, Bladework's first-hit critical restriction, and Apprehend's
airborne clock. The plain-stat allocations stayed the same in the logged comparison.
The default reaction window still equals Apprehend's cast time, so that policy cannot
respond before its instant effect lands; this remains a behavior limit.

These expectations describe real individual interactions, but none establishes the
winner under level-20, equal-15,000-gold, plain-stat rules. Last Breath's additive
critical-only bonus armor ignorance and Steel Tempest's attack-speed scaling are now
source-backed and separately tested. These disagreements remain visible for model
and player review; **the full test command still exits with failure**. No damage,
budgets, scenario weights, or fixtures were tuned to force those winners.

The generated simulator report supplies current scores for all 69 draft expectations.
Existing dispute explanations retain their historical numbers; use the current Score
and Status columns when reviewing the new model.

## All-champion expansion on 14 October 2026

The first expansion batch adds Amumu, Annie, Ashe, Brand, Leona, Lux, Master Yi,
Morgana, Nautilus, Rammus, Vayne, and Xin Zhao. The registry now contains 61 of the
173 champions, giving 1,830 unordered simulated pairings. The generated
[coverage report](data/16.20/reports/coverage.md) lists each implemented kit's source
reads and assumptions and the 112 champions still awaiting kits.

All twelve kits read their numbers and exact notes from the committed 16.20 data.
Their focused regressions and shared-engine integration cases total **240 passing
tests**, including damage packets, resources, cooldowns, interrupted casts, spell
shields, attack defenses, projectile travel, and normal duel behavior. Both TypeScript
projects pass. These checks establish specific mechanics; they do not certify every
interaction in a newly registered kit.

The first full-suite run exposed slow allocation and fight checks as well as the
expected stale matrix while expansion results were being rebuilt. A short CPU profile
located repeated derived-stat reads in the allocation loop. Replacing status
filter/reduce and filter/map chains with indexed loops preserves the value order and
arithmetic while avoiding intermediate arrays. The optimized source passes **274
focused tests**, including all 240 new cases, existing derived-stat rules, budget
symmetry, and variant selection. Source changes receive a new result fingerprint;
diagnostic loaders are not part of the app or the production refresh.

Shared combat now represents Black Shield's protection through the damage/CC packet
that breaks it, separate slow and cripple immunity, per-packet flat damage reduction,
distance-based damage immunity, connected on-hit notifications, permitted channel
overlays, interrupted/natural dash endings, accelerating missiles, and traveling
ground-target projectiles. Cast-start origins and directions prevent displacement
from extending the checked spells' reach. An empowered attack can have its bonus
spell-shielded while retaining its ordinary attack damage. Wall knockback ends when
the target actually reaches the wall rather than retaining the unclamped travel clock.

The source review also corrected mechanics that older versions of these champions
would suggest incorrectly: Ashe's current Frost Shot bonus applies continuously,
and the pinned Rammus rework derives attack damage from resistances, grants no E
attack-speed steroid, and gives his R aftershocks slow without repeated damage.
Brand's Pyroclasm follows the recorded acceleration and speed cap on both legs.
Golden winners, margins, and the existing disputed skips remain unchanged.

The new kits retain explicit source or model limitations:

- Brand's source gives a 2% maximum-health burn per stack but conflicting illustrative
  totals for multiple stacks. The explicit per-stack formula is used; its quarter-second
  tick cadence and velocity reset on each Pyroclasm leg are assumptions.
- Lux's wand acceleration curve and Light Binding's unlabeled alternative range are
  unresolved. Her behavior immediately detonates E on arrival rather than optimizing
  how long to hold its field. Leona's E dash speed and Nautilus's separate pull/dash
  distances are not quantified by their sources.
- Yi's Alpha Strike selects only the enemy champion, and Tibbers has no pet-specific
  blind/disarm, recovery, leash, or post-owner-death phase. Vayne's Silver Bolts does
  not implement pet stacks or the source's stasis exception. Pet targeting and spell
  reflection still need broader integration coverage.
- Xin Zhao's E does not continuously track an enemy teleporting across its initial
  dash direction. Vayne's Condemn uses the current one-dimensional axis at impact.
  Rammus's R uses the recorded minimum dash speed because the full speed formula is
  absent. These approximations stay visible in the compiled kit assumptions.
- New defensive/on-hit mechanics resolve in combat, but the generic stat allocator
  does not fully price flat damage reduction, conditional refunds, or every temporary
  resistance contribution. Nautilus's budget hint omits situational outer E rings.

## Validation before the reflected-boundary corrections

- Both TypeScript projects pass. All **274 focused tests** pass, including the 240 new
  mechanics cases and existing derived-stat, allocation-symmetry and variant checks.
- The actual production worker reproduces the complete saved results for
  Aatrox–Darius, Akali–Pantheon and Aatrox–Rammus exactly after the status-read
  optimization, normalizing only the pool index. Scores, scenarios, spent stats and
  variants match; no diagnostic loader is used in the production refresh.
- All **1,830 unordered duels** have fresh checkpoints and the written matrix has
  **61 complete rows and 3,660 directed entries**. All 61 kit simulation sections and
  the generated coverage report are present.
- `npm run build:sim -- --check` passes with model fingerprint
  `e527b9e149827b9574085565bc1182b7a868bef6de36a2ec3c5f1190d8d231f9`.
- The full suite (`npm test -- --maxWorkers=2`) has **1,425 passing tests, 2 failing
  tests and 5 existing skipped tests** across 75 files. Only the unchanged Garen–Yasuo
  and Malphite–Yasuo draft expectations fail; their scores remain −0.775843 and
  −0.775933. The command still exits with failure, and no winner, margin or skip was
  changed to produce these outcomes.
- The former timeout failures all pass within their existing limits. The complete
  Heimerdinger–Udyr variant search takes 161.7 seconds within its 180-second window;
  Teemo–Udyr takes 37.9 seconds within 60 seconds. The complete suite takes 234.7 seconds.

Source audits for twelve further casters are recorded in
[docs/next-wave](docs/next-wave/README.md). They retain pinned formulas, exceptions,
missing evidence, shared-engine requirements, behavior and budget considerations,
and regression plans. They are preparation documents and do not increase implemented
coverage above 61.

## Reflected geometry corrections on 15 October 2026

Production browser validation found two discrepancies when a live calculation
reversed the precomputed pairing: Lux–Darius differed by 0.000952331481 and
Xin Zhao–Darius by 0.000000476316. The other 58 live scores against Darius agreed
within the comparison tolerance, and all 60 rankings agreed. These discrepancies
prevented release of that build.

Light Binding's predicted journey rounded to 13 or 14 ticks from physically
identical reflected positions, postponing one Q cast. Projectile forecasts now
use the shared rounding tolerance and canonical zero travel. Darius's Decimate
positioning also uses the shared tolerance: a gap rounding just below 280 units
previously caused an extra movement step and shortened one Xin Zhao trade by a tick.
Neither Lux nor Xin Zhao's kit needed a source change.

Ten new regressions cover the actual AI boundaries, full swapped matchups and
allocations, and forecast versus actual projectile stepping. The corrected
Lux–Darius aggregate differs from its reversed negative by only 2.6e-15. The
Xin Zhao regression also requires equal trade durations. These checks retain
meaningful movement and extra travel ticks outside the tolerance.

The final source fingerprint is
`890500814e355bdf3a7f082268996e10be8c61c2ffe3b4eca4347e155bdcb1b5`.

### Final validation on 15 October 2026

- Both TypeScript projects pass. The **258 focused mechanics checks** and **10 new
  reflection regressions** pass on the final source.
- All **1,830 unordered pairs** have fresh verified checkpoints. The refresh wrote
  239 simulator and ledger files; the matrix has **61 complete rows and 3,660 directed
  entries**. `npm run build:sim -- --check` passes with the fingerprint above.
- The full suite (`npm test -- --maxWorkers=2`) has **1,435 passing tests, 2 failing
  tests and 5 existing skips** across **78 files**. Only the original Garen–Yasuo and
  Malphite–Yasuo draft expectations fail, at the same scores of −0.775843 and
  −0.775933. The command exits with failure. Winners, margins and skips are unchanged.
- The suite takes 82.3 seconds in the current cloud instance. The complete
  Heimerdinger–Udyr variant check takes 58.0 seconds within its existing 180-second
  limit; Teemo–Udyr takes 11.1 seconds within 60 seconds. These are instance-specific
  timings rather than mobile performance guarantees.
- `npm run build:web` passes. The production matrix and source matrix are
  byte-for-byte identical, and the browser dataset index has the final fingerprint.

- All **13 production Chromium checks pass**, including the new Lux–Morgana live
  duel, current cached ranking, initialized stats, settings reruns, cancellation,
  worker-failure recovery and accurate labels for unsupported champions.
- Deliberately stale matrix data triggers all **60 live rival calculations** against
  Darius. Every rank agrees with the matrix; the largest score difference is
  **2.6e-15**. Lux and Xin Zhao's earlier discrepancies are resolved.
- At a 390-pixel phone width, the document remains 390 pixels wide while the numbers
  table scrolls inside its container. Unexpected page, console, HTTP and request
  error counts are zero, with no unfinished posted worker jobs.

## Second expansion batch: six casters, 15 October 2026

The second batch implements Ahri, Cassiopeia, Kassadin, Lissandra, Veigar and
Vladimir. Coverage is now **67 of 173 champions**, with **106 remaining** and
**2,211 unordered supported pairs** (4,422 directed entries). Every numeric kit
value reads the pinned 16.20 ability records; individual source revisions and
interpretations remain visible in each compiled kit page.

Shared mechanics now support real mana formulas and dynamic cast-cost snapshots,
reserved resources for overlapping casts, persistent facing, caster notifications,
knockdown and channel disruption, replacement empowered on-hits, declared ground
spell delays, and opt-in deliveries that continue after death. Piercing projectiles
track independent champion/pet contacts and support return trajectories and changing
speeds. Pet splash evaluates dynamic damage against a pet target rather than silently
using a zero-stack or target-free reference. Center-based blink reach uses the same
geometry in combat, behavior and scenario setup.

Vladimir's bonus-health/AP conversion is solved simultaneously without converting
its own results again. Cassiopeia's positive movement bonuses use her recorded
level-20 effectiveness. Derived-stat cache validation now observes mutable base,
purchased, conversion and status inputs, including in-place decaying buffs; the
previous length-only status cache could return stale combat stats. The stronger
validation adds allocation work; correctness takes precedence over reusing stale
values.

Source review and reflected-matchup checks cover each new kit. Additional cases
exercise spell-shield and parry consumption, dynamic mana tiers, poison snapshots,
cage boundaries, the rear origin of Petrifying Gaze, cast cancellation, trade-mode
retreat, and damage/CC ordering. Golden winners, margins and disputed skips remain
unchanged. Completed source preparation for the six remaining audited casters is
listed in [docs/next-wave](docs/next-wave/README.md).

These kits retain explicit limitations rather than guessed source precision:

- Ahri's flame orbit has conflicting angular units in the source. Orbit geometry,
  lateral coverage and fallback expected-value return contacts retain stated
  approximations. Her qualifying takedown heal and extra dash apply on Sion's first
  death while his zombie phase continues; each opponent's death is credited once. Lissandra's claw acceleration and spreading ice use documented
  one-dimensional interpretations; her thrall after an ordinary final enemy death
  cannot continue a duel that has already ended.
- Kassadin's arrival damage uses the stated 270-unit center convention, since the
  source does not identify hitbox measurement. His allocator uses a finite,
  resource-aware Riftwalk reference, and the generic pet attack path still omits
  Nether Blade's champion on-hit and mana restoration.
- Cassiopeia's seven-cloud Miasma is represented on the duel axis. Poison timing,
  slow refresh and the distinction between facing and forced movement are modeled;
  lateral cloud coverage, unquantified facing exceptions and pet-specific effects
  remain assumptions rather than certified interactions.
- Veigar starts at an explicit adjustable stack count, default zero, without farming
  during the duel. Q's pet collision/two-target allowance and pet kill stacks remain
  unsupported. Dark Matter uses the recorded 1.221-second declaration-to-impact
  delay, while the source omits Primordial Burst's missile speed; 1500 units/s is
  retained as a visible assumption.
- Vladimir's charge nova uses its target-facing bolt. The source does not establish
  Hemoplague owner-death persistence, so it does not keep an otherwise ended duel
  alive. Rush resets, charge interpolation and unquantified movement curves retain
  the interpretations stated in his kit.

### Second-batch pre-release validation (superseded metadata)

The frozen source fingerprint is
`5fd8b3c43a2ee4635ffccb39885eea2866300d8eeebdb4aeba1944f11f0426c0`.

- Both TypeScript projects pass. All **440 focused tests across 11 new files** pass,
  including all six kits, shared caster lifecycles, mana formulas, stat conversions,
  mutable-stat caching, pet damage and centered blink boundaries.
- A separate read-only preflight runs every **66 supported Darius opponents in both
  orientations**, using **132 complete production variant searches**. Purchased stats
  and chosen options reflect exactly. Maximum aggregate sum is **2.45e-15** and
  maximum reflected scenario sum is **6.22e-15**, within the **1e-10** limit. The
  fingerprint is checked before, during and after the run. No diagnostic loaders,
  virtual source patches, matrix writes or checkpoint reuse are involved. The run
  takes 142.5 seconds on the current instance.

- All **2,211 unordered pairs** were freshly recomputed with four workers, with no
  prior-fingerprint checkpoints copied or relabeled. The refresh wrote **245** simulator
  and ledger files and preserved parsed source data and profiles. The final matrix has
  **67 complete rows and 4,422 directed entries**. `npm run build:sim -- --check` passes.
- The production build passes. Its matrix is byte-for-byte equal to the source matrix,
  and its HTTP dataset index exposes the frozen fingerprint above. Recomputing the
  matrix took 2,587.2 seconds on the current four-core instance.

### Finite internal-effect metadata correction

The first complete suite exposed non-finite cooldown metadata on Ahri's Q-return/R-bolt
and Lissandra's ice-field helper effects. These are internal effects with an explicit
`usable: () => false` guard. Their cooldown metadata is now zero, preserving that guard
and satisfying the same finite-number contract used for every other registered kit.
The existing assertions remain unchanged. Both TypeScript projects and **583 focused
checks across 12 files**, including the complete 67-kit general contract suite, pass.
This source correction requires a new matrix rather than relabeling prior checkpoints.
The corrected fingerprint is
`cc2d36964b514dc2d86ccc2e550d794c04b361e0d345b3fbdbd8ec4fda11c209`.

### Final corrected-source validation

- All **2,211 unordered pairings** have fresh checkpoints under the corrected
  `cc2d3696…` fingerprint; none were copied or relabeled from the earlier pass. The
  refresh wrote **245** generated files in **2,574.8 seconds**, with **67 complete rows
  and 4,422 directed entries**. The final freshness check passes.
- Comparing both complete generations, every score, scenario, purchased build and
  selected kit variant is exactly equal; only their model provenance differs. The
  finite internal-effect metadata correction changes no saved combat result.
- The final production build passes. Its matrix is byte-for-byte equal to the source
  matrix, and its HTTP dataset index carries the full corrected fingerprint above.

- The final full suite has **1,887 passing tests, 2 failing draft expectations and
  5 existing skips across 89 files**. Only Garen–Yasuo and Malphite–Yasuo fail; their
  scores and the original winners/margins/skips are unchanged. The full test command
  still exits with failure. Both newly exposed finite-metadata failures are fixed.
- The corrected source also passes **132 complete production side-swap searches**
  covering all 66 Darius opponents, with exactly reflected spending and selected
  options. Maximum aggregate and scenario sums remain **2.45e-15** and **6.22e-15**.
  Provenance stays equal to the corrected fingerprint throughout this run.

- All **16 production Chromium checks pass**, including Ahri–Lissandra,
  Kassadin–Vladimir and Cassiopeia–Veigar live/matrix comparisons, initialized stats,
  visible source assumptions, current cached ranks, settings reruns, cancellation and
  worker-failure recovery. Deliberately stale data triggers all **66** Darius rivals;
  every rank agrees and maximum score difference is **2.45e-15** at tolerance **1e-10**.
- At a **390-pixel phone width**, document width remains 390 pixels and the wide stats
  table scrolls inside its 356-pixel container. The actual screenshot is visually
  checked. Page, console, HTTP and request errors are all zero; all three worker
  contexts have zero unfinished jobs. The final full suite takes 233.4 seconds while
  the independent reflection preflight runs concurrently on this four-core instance.

## Third expansion batch: six casters, 16 October 2026

Anivia, Karthus, Malzahar, Vel'Koz, Ziggs and Zyra bring implemented coverage to
**73 of 173 champions**. **100 remain**, and the supported matrix requires
**2,628 unordered pairs / 5,256 directed entries**. These are controlled kit
simulations, not measured player win rates or certification of every mechanic.

The five new champion test files contain **351 passing checks**. They exercise
actual damage, resources, defenses, timing, ordinary policies and full-budget
Darius matchups. Shared tests cover the lifecycle, CC, shield-order and pet APIs;
the complete registered-kit contract also checks all 73 kits. Both TypeScript
projects pass. Goldens, margins, tolerances and the five existing skips are unchanged.

- Anivia separates Q passage from its controlled explosion and checks Iced when E
  actually lands. Her storm has independent growth, damage, slow and resource clocks.
  W raises terrain and ejects overlapping units through guarded displacement; its
  unquantified push timing remains an explicit approximation. Rebirth creates an
  attackable six-second egg with sourced level-20 resistances, preserves declared
  cast times, interrupts ordinary channels and retains surviving current health.
- Karthus Q counts actual eligible bodies for isolation. Wall of Pain tracks
  contact and crossings independently for each wall, including pet debuffs. Defile
  has its own pulse/drain clocks and is forced active during Death Defied. The
  seven-second post-death window permits free spells without attacks or voluntary
  movement; R's cutoff and cast-plus-channel timing are explicit. Counted champion
  and actual pet kills trigger the resource refund once; expiry does not.
- Malzahar applies ordinary damage shields before Void Shift's reduction, preserves
  its spell-shield priority and true-damage exceptions, and distinguishes pet damage
  from passive-consuming champion hits. Allied CC bypasses only its sourced hostile
  immunity. E has sixteen absolute ordinal ticks, target-specific pet bounces and
  a pinned level-20 execute threshold of 48. Its AP snapshot/refresh phase policy is
  disclosed. R's tether, suppression, reveal and persistent pool have distinct
  lifetimes, including movement/different-target attack cancellation after 0.5 s,
  immediate reveal loss on suppression removal and the Anivia resurrection exception.
- Vel'Koz tracks passive stacks and research independently. Q uses its real first
  collision, W has two charges and a progressive formed rift, E uses its declared
  origin and variable landing clock, and R creates thirteen directed pulse areas
  with independent research/stack decisions and interruption cleanup. Forecasts
  expose each W packet once rather than adding collapse damage to both stages.
- Ziggs uses three finite Q landing checks and one explosion; W retains its ground
  position, recast and independent self displacement. E places eleven finite mines
  with projected two-dimensional geometry, per-victim falloff and current hitbox
  sizes, including pet triggers. R follows its absolute declaration-to-impact clock
  and separate epicenter. Bounce scaling, inner mine radius, self-dash timing and
  other unresolved geometry remain explicit assumptions; turret execution is not
  applied to champions. Short Fuse on pet-directed attacks remains unimplemented.
- Zyra seeds retain identity, source, charges, lifetime, stepping and growth rules.
  Plants snapshot level/AP, have individual health categories, CC, targets, windups
  and projectile travel, and use shared target marks with separate owner priorities.
  Lasher slows retain contributing plant identity. R's in-flight flurry behavior and
  expiry, same-target damage falloff and independent plant defenses are covered.

Shared pet combat uses the actual pet as the attacking actor. Retaliation cannot
hit its owner by accident; pets do not inherit champion on-hits, critical chance or
life steal. Resistance debuffs apply before owner penetration. Dynamic targetability,
stasis and invulnerability are distinct from already-active damage-over-time, and
status expiry is evaluated at the actual tick. Stationary pets remain stationary.
Launched plant missiles retain their source snapshot after the plant dies. Copies
of a fight preserve independent pet statuses, windups, missiles and zone memory.
A separate champion-to-pet contact hook records Zyra's actual attacked-pet priority
without enabling champion-only procs against every pet.

Supplemental wiki quotations retain their own exact page/revision attribution.
Selected game-file excerpts retain the exact **16.20.8248524+branch.releases-16-20.content.release**
version, URL, object path and SHA-256, separately from wiki citations. Strict readers
reject absent text and unversioned game evidence. Client targeter fields do not
prove server geometry: those interpretations remain assumptions. Kit pages display
these source links and continuous toggle drain. Planning archives are not runtime
inputs.

Defensive forecasting remains a model policy: it does not predict future Iced
changes, and Anivia's pending hook-driven storm pulses are not individually exposed
by the generic threat extractor. Her kit page states that limitation. One-axis
geometry and deterministic policies remain approximations for all six kits.

Frozen model fingerprint:
`393ffdb2b3fa8fa0fd910745f60cf7cf4836df42875ea6d69abde5411a822220`.
All **72 Darius opponents / 144 directed searches** passed through the unmodified
production worker with complete variant searches. Purchased builds and selected
options reflect exactly. Maximum absolute aggregate score sum is
**2.456368441983159e-15**; maximum absolute reflected scenario sum is
**3.2862601528904634e-14**.

Before refresh, the full stable preflight executed **2,342 tests across 97 files**:
**2,330 passed, 7 failed and 5 were skipped**, in **324.3 seconds** while reflection
checks ran concurrently. Five failures compare against the previous 67-kit matrix;
the other two are the original draft Garen–Yasuo and Malphite–Yasuo expectations.
All combat, kit, pet and source regressions pass. The refresh has now completed
all 2,628 verified pair checkpoints and written 251 simulator/ledger files. The
resumed run reused only 364 validated checkpoints of this same frozen model and
computed the remaining 2,264 pairs in 4,604.9 seconds; no older-model result was
copied or relabeled. All 73 matrix rows and 5,256 directed entries are complete,
and `npm run build:sim -- --check` passes for the exact fingerprint above. Both
TypeScript projects and the production web build also pass. Final browser and
post-refresh suite results are recorded below.

The production Chromium run passed **all 17 checks**. Every one of the **72 live
stale-matrix fallback scores** agrees with the refreshed matrix; maximum difference
is **2.456368441983159e-15**, and the entire ranking order agrees. Logged matchups
for all six new champions reproduce the matrix with finite initialized stats,
six scenario results and rendered assumptions. All six kit pages display correct
wiki/game source attribution, with no game evidence linked as wiki revision zero.
Toggle drain is visible, and both new source evidence and combat tables fit the
390-pixel phone viewport; wide tables scroll inside their containers. Page, console,
HTTP and request errors are all zero, with no unfinished worker jobs.


The final complete suite runs serially on this four-core environment: **2,335
passing tests, the two original draft winner failures, and five existing skips**,
across **97 files / 2,342 tests**, in **489.2 seconds**. Its Heimerdinger–Udyr full
variant search passes in **145.0 seconds** within its unchanged 180-second limit.
The preceding two-worker run had one additional timeout at 188.2 seconds; it had
already resolved all five stale-data failures. The complete serial rerun verifies
the same builds, score, scenarios and variant options. No assertion, golden winner,
margin, skip or timeout was weakened. Source identity remains the frozen hash above.

## Fourth expansion batch: Gragas, Warwick and Wukong, 18 October 2026

Gragas, Warwick and Wukong bring implemented coverage to **76 of 173 champions**.
**97 remain**, and the supported matrix requires **2,850 unordered pairs / 5,700
directed entries**. These are controlled kit simulations, not measured player win
rates or certification of every mechanic.

The three new champion test files contain **74 passing checks** (Warwick 22, Gragas 18,
Wukong 34). Each quoted restriction was also broken on purpose, one at a time, to
confirm that a test fails: **20 of 20** Warwick mutations, **14 of 14** Gragas
mutations and **63 of 63** Wukong mutations are caught. Wukong's first pass left two
survivors, and each became a new test: a cooldown cut from ability hits on a running
Crushing Blow cooldown, and the clone's shared knock-up, which only shows when the
clone and Wukong first reach the enemy on different ticks.

- Warwick's Eternal Hunger heals for 100% of its damage below 50% health and 250%
  below 25%. Jaws of the Beast is the tapped bite: it lunges, unless he is rooted or
  grounded, and heals for 75% of its own damage, without its on-hits. Blood Hunt's
  attack speed comes from damage to a hunted enemy, or from starting an attack on one
  when he has none (without refreshing it). Its trail speed is lost for 0.5 s on
  champion combat and builds back over 3.5 s. Primal Howl's damage reduction ends
  with its recast, which fears and slows and locks him out for 0.25 s. Infinite
  Duress leaps 250% of his movement speed averaged over the last 2.5 s (ten samples
  0.25 s apart), never less than 275. It channels only on a target the suppression
  took hold of. Its six strikes deal 2/9 (with on-hits) and 1/9 of the total, and it
  heals for all of its damage. A cleansed suppression keeps him striking for no
  damage. A howl in progress recasts at the channel's start, keeping its damage
  reduction. The leap's speed is in neither the wiki nor the game data and is an
  explicit assumption.
- Gragas's Happy Hour heals 5.5% of his maximum health on Q, W, E and R (not the
  cask's detonation), on its own 6-second static cooldown. Barrel Roll ferments from
  where it lands, goes off when recast or after 4 s, and is set off only once it has
  landed. Drunken Rage channels for 0.75 s, reducing damage from its start; its
  empowered attack reaches 50 farther and can't be cancelled, and a spell shield
  blocks only its bonus. Body Slam stuns and refunds 40% of its remaining cooldown on
  a hit. Explosive Cask lands 0.5 s after it is thrown however far it goes (new
  circle `flight`), knocking back away from where it lands. With walls nearby, its
  900-unit knock back stops at the lane's 300-unit wall.
- Wukong's Stone Skin gives 10.47 armor and 0.35% maximum health every 5 s,
  multiplied by Strength of Stone's stacks. A stack comes from his attacks (blocked
  ones included, on-hit), his ability hits and his clone's hits on champions, none
  from hits on an invulnerable enemy. Crushing Blow reaches 175 farther with an
  uncancellable windup, and abilities cast during that windup keep it (new
  `preserveAttackWindup: "uncancellable"`). Every hit by Wukong or his clone cuts
  0.5 s off its cooldown while it runs, not while its empowered attack still waits.
  The Warrior Trickster clone is left where he cast it, for 4 s, with his current
  health. It attacks for 60% of his attack damage at his live attack speed, and it
  copies Crushing Blow (reset timer, reach and 60% of the bonus). Its attacks are
  basic attacks for dodges, blinds and disarms. Cast during a spin, it carries the
  spin on for the time left. Nimbus Strike dashes at the pinned game-file speed of
  1050 and interrupts cancellable windups on him. It strikes up to two enemy pets
  near the target, and its attack speed lasts while he spins. Cyclone is a mobile,
  uninterruptible 2-second spin of eight pulses. It knocks up once a cast, shared
  with the clone, with a blocked pulse still using it up. It can be recast after
  0.5 s, and ending it with another ability counts as the recast. The second spin
  comes 1 s after that, within 8 s of the first, and the cooldown waits for it.

Shared engine changes are small and opt-in. Dashes can resolve their distance from the
caster's stats at declaration (`distanceFor`, Infinite Duress). Ground areas can land
after a fixed flight time (`flight`, Explosive Cask). A cast can keep only an
uncancellable attack windup (Crushing Blow). Kits can quote a field's value label
(`fieldLabel`). No other kit uses them, and their tests are unchanged.

The build now reproduces the curated evidence the imported 73-kit build had added to
ability records by hand. `pipeline/abilities/evidence.ts` re-reads every pinned
game-file excerpt from the downloaded character file, with its game version, URL and
SHA-256. It also adds the wiki notes the template parser drops. Each note must still
be on its ability's template, or the build fails until the note is checked again. Text
rendered by hand from another wiki page is pinned to that page's revision: a fetch
that brings a newer revision fails the build. All **173** ability records rebuild
byte-identically from `data/raw`. This batch adds Cyclone's interaction table and the
glossary's uncancellable-windup rule, which Nimbus Strike's interruption honors.

Wukong's behavior ends a spin early once its knock-up has landed, if his attacks would
deal more than its pulses. Measured against 27 opponents when it was introduced, it
changed 9 scores. Eight rose, the largest from **−0.82 to +0.73** against Gwen and from
**−0.81 to +0.53** against Xin Zhao; one fell, from **+0.72 to +0.45** against Volibear.
Later kit corrections came after that comparison; the matrix below is the reference.
Winners and margins were not tuned toward any expectation.

### Fourth-batch validation

Model fingerprint:
`c280f4316ecc1d5fb8ea1eefb5066449ebc973eaa286cce57b6705439041d421`.
The refresh computed all **2,850 pairs** afresh on four workers in **3,929.3
seconds**, reusing no checkpoint, and wrote **254** simulator and ledger files. All
76 rows and 5,700 directed entries are complete, and `npm run build:sim -- --check`
passes for the fingerprint above. Every directed score is the exact negative of its
mirror (maximum absolute sum **0**). Of the 5,256 directed entries between the 73
earlier kits, **5,232** are bit-for-bit unchanged and **24** differ by at most
**2.220446049250313e-16**. That is floating-point rounding: the new engine options
change no earlier result. Both TypeScript projects pass.

By mean score against the other 75, Warwick ranks **23rd** (+0.173, 47 wins), Wukong
**41st** (+0.008, 38 wins) and Gragas **57th** (−0.301, 25 wins). Warwick's best
matchup is Wukong (+0.86) and his worst Ashe (−0.87). Gragas's are Vladimir (+0.83)
and Fiora (−0.86), and Wukong's are Vladimir (+0.80) and Darius (−0.88).

The full suite ran **2,427 tests across 101 files** on four workers in **193.7
seconds**. **2,419 passed**, and five existing tests were skipped. The two original
draft Garen–Yasuo and Malphite–Yasuo expectations failed, as before. One test timed
out: the Heimerdinger–Udyr full variant search in `tests/web/run.test.ts`, at its
unchanged 180-second limit, while every core ran other files. Run alone, it passes in
**148.6 seconds**; it took 145.0 seconds in the third batch's serial run.

The production Chromium run passed **all 18 checks**. The picker lists all 76 simulated
champions, and each new champion's counter page ranks all 75 opponents. Their matchup
pages against Darius show the matrix scores. Each new kit page shows its assumptions
without horizontal scrolling at 1,200 pixels, and Wukong's cites the pinned game file.
The matchup page fits a 390-pixel phone. With the stored results marked stale, the
production workers reran all **75 Darius opponents** in the browser in 76.8 seconds.
Every live score agrees with the matrix within **2.456368441983159e-15**, and every
scenario agrees within the matrix's three-decimal rounding (at most 0.00049). Page,
console, HTTP and request errors are all zero.

## Remaining limits

- Only 76 of the dataset's 173 champions have simulator kits. Other pairings use the
  interaction ledger's heuristic estimates.
- Movement is one-dimensional. Facing, side-stepping, vitals, terrain placement,
  pet placement, and some multi-hit geometry still use explicit approximations.
- Skillshot branching has a finite limit; minor hits and further branches use expected
  effects. Those approximations are most consequential around death, shields, and CC.
- Behaviors are programmed policies with a reaction-time model, rather than an
  exhaustive search over every possible action sequence.
- The matchup's numbers table shows base and purchased stats before kit buffs,
  the selected equipped kit, and the fight setup before the first passive tick. It does
  not summarize every subsequent buff or transformation. Poppy's first-tick resistance
  and buckler changes are explicitly excluded from that setup snapshot.
- Stat allocation remains a reference-DPS/survival heuristic with iterative opponent
  responses. It does not prove a globally optimal allocation, and does not model item
  passives or actives. Hook-driven effects require accurate budget hints.
- Simultaneous conservative pure kit variants preserve player symmetry. Where no pure
  saddle point exists, that policy is an assumption, not a mixed-strategy equilibrium.
- Generic Tenacity revision 4021927 lists a different Courage/Brittle grouping than the
  newer, specific Courage revision 4064595. The ability-specific additive exception is
  used and both sources are recorded; it is not generalized to other tenacity sources.
- The ordering of the attack-speed cap and cripples is not explicit in the checked
  source notes. The existing order remains unchanged; the current 3.003 cap is verified.
- Vault's exceptional interruption of an uncancellable windup is modeled, but the
  checked notes do not establish whether Garen's empowerment is refunded afterward.
- Perseverance's shield-damage exception is modeled; its lockout from non-damaging
  enemy ability hits still needs a received-ability event that distinguishes applied
  effects, shield absorption, immunity, and damage reduced to zero.
- Some level-19–20 values and wiki/game-file disagreements remain identified in
  `data/16.20/reports/abilities.md`. New kits need their own source audits.
- Urgot's lethal initial-drill interception, resurrection retry, unquantified preliminary
  push, and true-sight visibility remain unsupported. His initial leash slow is a snapshot.
- Yasuo's circular E/Q combinations and R during E remain unsupported. Partial E Flow
  uses a proportional assumption, and minion dashes use the existing proxy. The source
  does not quantify R's early-release distance. Malphite's size/cone geometry, Q forward
  missile spawn, and exact armor-recursion behavior remain unmodeled.
- Renekton's built-in W strikes are modeled individually; additional external on-hit
  effects still apply once. The current model buys plain stats and has no item effects.
- Teemo's Guerrilla Warfare stealth is not modeled. Tryndamere's critical Fury/refunds
  use expected outcomes, facing uses movement/attack direction, and slash speed remains
  an explicit assumption. Tahm Kench's source does not quantify Regurgitate's spit distance.
- Apprehend's pull/rebound geometry remains collapsed into a half-second pull. Its slow
  currently begins immediately; the pinned note ties it to the rebound without giving
  a numerical onset time for this approximation.
- Warwick's Jaws of the Beast is always the tapped bite, never the held leap behind
  the target. Infinite Duress's leap speed is in neither source and is taken to cover
  its range in 0.5 s, and its three on-attack effects are left out. Gragas's Body
  Slam stuns without moving the enemy, since its knock back distance is in neither
  source, and Explosive Cask's knock back is taken to last 0.5 s. Wukong's clone is
  static, with his resistances as it appears, and its crits are expected values.
  Nimbus Strike's dash doesn't follow an enemy who dashes away during it.
