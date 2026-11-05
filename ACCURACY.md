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

## Fourth expansion batch: six marksmen, 18 October 2026

Caitlyn, Ezreal, Jhin, Jinx, Lucian and Miss Fortune bring implemented coverage to
**79 of 173 champions**, leaving **94**. The matrix requires **3,081 unordered
pairs / 6,162 directed entries**. These remain controlled level-20 kit simulations,
with programmed policies and plain-stat budgets, rather than observed win rates.

The three new champion test files contain **250 passing checks**. They exercise
actual numbers, casts, contact defenses, target identity, resources, cooldowns,
ordinary policies and full-budget reflected Darius cases. The shared regressions
cover attack snapshots, one-packet critical/additive damage, fixed attack speed,
actual pet protection and contact callbacks, timed casts over channels, terrain
endpoints and projectile perception. All 79 registered kits pass the ordinary
fight/finite-metadata contract. Both TypeScript projects pass.

- Caitlyn separates Count from independent trap/net Headshots. Their added physical
  damage remains inside one basic packet with only ordinary AD critically striking.
  Q widens and reduces after actual first contact; trap revelation preserves its full
  packet. Net's missile, suppression failure, recoil and endpoint terrain checks have
  distinct clocks. Ace in the Hole preserves a pre-existing spell shield through its
  cast/channel and checks it on the real homing shot. That shot is forecast throughout
  the channel with its own flight time and defense metadata.
- Jhin has real four-round ammunition, launch-time consumption, fourth-shot critical
  and missing-health damage, reloads and fixed growth-only attack speed. Manual R
  shots are excluded from one-second independent budget valuation. Their projectiles
  leave at 0.2 seconds while the 0.25-second lock retains the original parent channel.
  Accepted CC ends the retained channel while its committed shot completes. Normal
  policy fires all four shots against an uninterrupted target; Darius's real airborne
  correctly stops the tested channel after the third shot.
- Ezreal distinguishes successful spell contact from HP damage and basic-attack
  classification. Q's spell-shield cooldown refund, on-hits, passive stacks and blind
  exception are separate. W detonates only on eligible real contacts, with its mana
  refund. E chooses an actual target after the blink, including its mark priority,
  without converting ordinary sight into true sight. R is a real piercing projectile.
- Lucian's second shot is an independent delayed basic attack with full on-hits and
  life steal, actual target identity and its own critical outcome. His E can overlay
  the mobile channel and cross terrain only with a clear endpoint. Culling emits real
  fixed-axis projectiles using its exact pinned critical-dependent shot count;
  perception follows emitted bullets instead of treating the full channel as one hit.
- Jinx snapshots weapon, critical chance, rocket scale and speed per attack. Minigun
  stacks, first-rocket consumption, mana and weapon policies do not drift or starve
  offensive actions. Internal impact helpers cannot be cast as free spells. Chomper
  toss, arming, shielded control and independent explosion are separate. R accelerates,
  scales by real traveled distance and collides with the champion before collateral.
- Miss Fortune tracks Love Tap across actual targets and folds it into one basic
  packet. Q chooses a real secondary body behind its primary, handles shielded/invalid
  contacts separately and retains its killed-primary critical exception. W's refunds,
  capped AS uptime and Strut buildup are distinct. E ticks and eighteen traveling R
  waves have their own timing and damage; budget hints do not confuse an initial
  forecast with sustained damage or award repeated same-target Love Taps.

Exact versioned game calculations supply three level-20 values omitted from the wiki's
ordinary-level tables: Jhin's 52% innate AD increase, Lucian's 70% AD second shot and
Miss Fortune's 110% AD Love Tap. Each retains its precise URL/version/object/SHA-256
separately from wiki quotations. Jhin's contradictory idle-reload/trap client constants
remain documented; the explicit wiki timings are retained without server-script proof.

New test fixture corrections use the pinned 0.681 Caitlyn base attack speed, Jhin's
15.625% windup and Jinx's max-rank ten-second E cooldown. A zero-cast Chomper spell
is tested through its real tossed packet. Existing golden files remain byte-for-byte
unchanged: no winner, margin, skip or acceptance tolerance was tuned to this batch.

The frozen model is
`bc04dfd2c7fa0a9f58423fdc473b499b4233a2d74c14119a9e324ac36db5e7d9`.
All **3,081 unordered pairs / 6,162 directed entries** were freshly computed with
four workers in **3,099.7 seconds**, writing **257** simulator and ledger files.
All 79 rows are complete and the final freshness check passes. No checkpoint was
copied or relabeled from an earlier model. Jhin's zero external AS ratio retains
his level growth, giving an actual level-20 rhythm of **0.99371875**; external AS
and cripples leave that rhythm unchanged while bonus AS still contributes to AD.

The final serial suite has **2,684 passing tests, the two original draft winner
failures and five existing skips**, across **103 files / 2,691 tests**, in
**350.9 seconds**. All stale-data assertions are resolved. The Heimerdinger–Udyr
full variant search passes in **106.7 seconds** within its unchanged 180-second
limit. Both TypeScript projects and the production build pass. Golden files,
winners, margins, skips, acceptance tolerances and timeout limits remain unchanged.

The corrected source passes **156 complete production side-swap searches** for
all 78 Darius opponents, plus **30 searches** covering both directions of all 15
pairings among the six new champions. Purchased spending and selected variants
reflect exactly. Maximum aggregate/scenario sums in the Darius check are
**3.83e-15 / 3.29e-14**; the new-champion checks stay within
**6.67e-16 / 2.67e-15**. The exact frozen fingerprint is verified throughout.

All **17 production Chromium checks pass**. Every one of the **78 live stale-matrix
fallback scores** agrees with the rebuilt matrix, with maximum difference
**3.774758283725532e-15**, and every ranking position agrees. Live logged matchups
cover all six new champions with finite initialized stats and actual worker runs.
Their kit pages preserve exact pinned ability, pet and versioned game attribution;
no game evidence is linked as wiki revision zero. The citation verifier includes
Jhin's separate Lotus Trap pet-page revision as well as ability-template revisions.

At **390 pixels**, all six source pages and the matchup page stay at a 390-pixel
document width. The wide combat stats table scrolls within its 356-pixel container
(the full table is 582 pixels). The actual screenshot was visually checked. Page,
console, HTTP and request errors are all zero; all three worker contexts have zero
unfinished jobs. Private delivery packages the compiled build and exact source
snapshot; packaging/startup and remote-byte receipts accompany that delivery.

## Fifth expansion batch: validated on 19 October 2026

Corki, Draven, Kog'Maw, Sivir, Tristana and Twitch bring registered coverage to
**85 of 173 champions**, leaving **88**. This model requires **3,570 unordered
pairs / 7,140 directed entries**. All pairs were freshly recomputed from the frozen
model. The completed 79-champion report above remains a historical validation snapshot.

The frozen source fingerprint is
`5d28e2451925b24ce97f0b72890ba8fb1047125bd6b1da3b3e2cd637530a06c4`.
The three champion suites pass **241 focused checks** (Corki/Draven 80,
Kog'Maw/Tristana 90, Sivir/Twitch 71), including actual post-death effects and pet
contacts. Source review corrected Draven Q/W refresh legality, preserved Tristana's
independent stun after a wall stops knockback, retained Corki's due pet burn pulse
and full lingering interval, and kept champion rocket splash dodgeable after a
summon intercepts the missile. Cloned active, pending and resumed windups retain
independent on-hit arrays; Kog'Maw's W cannot duplicate damage across branches.

The fallback profiles were also regenerated from the reviewed records. Corki's retired
Special Delivery is retained as an explicitly historical source, supported by the
pinned client spell registry, and excluded from current kit lookups and displays.
Draven's profile no longer misattributes the slow's two-second duration to knock-aside;
Kog'Maw's uncertain spacing note retains its pending-test qualifier. Nine additional
profile/archive regressions and both TypeScript projects pass.

All 31 ability templates were retrieved by their exact pinned revisions and checked
against the existing records. Versioned game-file excerpts retain separate URL,
version, object and SHA-256 attribution. The pair audits in
[docs/next-wave](docs/next-wave/README.md) document formulas, source conflicts and
explicit geometry and policy limits.

Shared work adds ordered critical basic packets, piercing basic skillshots using the
existing finite branch budget, genuine spell-shield consumption callbacks, actual-pet
contact state, moving post-death phases and finite persistent aftermath. Ordinary
registered-kit behavior and stat-reference contracts pass before the matrix refresh.
Before regeneration, all 84 Darius opponents and all 15 pairings among the six new
champions pass independent production-worker searches in both orientations, including
complete variant selection and exact reflected spending. The unchanged score tolerance
is `1e-10`; maximum aggregate sums are `3.83e-15` and `3.05e-15`, respectively.
The corresponding maximum scenario sums are `3.29e-14` and `1.08e-14`.
The new Corki–Tristana regression also reproduces the actual allocated short trade:
using the shared spatial margin at maximum Q reach keeps the declaration and impact
on the same ticks after reflection. Its three checks pass without changing score
tolerances or golden expectations. Adjacent custom new-kit range checks use the same
engine margin.

Final validation:

- All **3,570** unordered pairs were recomputed with four workers from an empty
  fingerprint-specific checkpoint directory. The refresh wrote **263** simulator
  and ledger files in **3,119.9 seconds**, preserving parsed source data and profiles.
  Every one of the **7,140** directed entries matches its checkpoint. Freshness and
  both TypeScript projects pass.
- The full serial suite completes with **3,026 passing tests, two existing draft
  winner failures, and five existing skips** (**3,033 total**). The two failures
  remain Garen–Yasuo and Malphite–Yasuo, at scores `−0.7758431083` and
  `−0.7759328978`. There are no additional failures. All five golden files remain
  byte-for-byte unchanged, and the command still exits with failure for those two
  disagreements. The full Heimerdinger–Udyr variant-search regression passes in
  **104.5 seconds** with its unchanged **180-second** limit.
- The production build passes. Chromium passes **17 checks**, including live
  agreement for all three new marksman pairs, the six source pages at **390-pixel**
  phone width, cached ranks, changed weights, cancellation and retry. Every one of
  **84** live fallback rankings against Darius matches the refreshed matrix within
  the existing `1e-10` tolerance; the largest score difference is **`3.77e-15`**.
  Corki's archived Special Delivery remains in source data and is absent from
  current ability headings. The phone screenshot was also inspected visually.
- Page, console, HTTP, request and worker error counts are zero. All three browser
  contexts have no unfinished posted jobs. Independent delivery review confirms
  coverage, source pins, variant selections and checkpoint correspondence.
- Private delivery includes the compiled app and exact parsed source snapshot.
  Publication requires every archive member and source digest to match, a valid
  archive CRC, and all five startup checks, including freshness from extracted
  `SOURCE`. It uses a new private preview branch and preserves the previous ZIP
  and the repository's main commit.

## Sixth expansion batch: six more marksmen

Kai'Sa, Kalista, Samira, Smolder, Varus and Xayah bring implemented coverage to
**91 of 173 champions**, leaving **82**. This model covers **4,095 unordered pairs /
8,190 directed entries** with simulation fingerprint
`158c0a49217720e7f577473a978738b4398ba1ad18390275c2d4ebad164a57a9`.
The preceding 85-champion report remains a historical snapshot.

The independent source audit checks **31 exact primary wiki templates** (including
Kalista's basic attack page), six binary hashes, and **26 game-source records with
54 exact excerpts**. Every revision, URL, game version, object value and SHA matches.
Source conflicts remain explicit, including Kalista's unresolved positive
attack-speed contribution to hop velocity. The chosen policies and limits are
recorded in [Kai'Sa/Kalista](docs/next-wave/Kaisa-Kalista.md),
[Samira/Smolder](docs/next-wave/Samira-Smolder.md), and
[Varus/Xayah](docs/next-wave/Varus-Xayah.md).

Shared integration covers pre-physical target-local passives, visible fixed-time
projectiles, interception during flight, actual-pet contact guards, independent
channel/dash clocks, terrain flight and legal landing positions. Summons retain
the targeting class stated by their pinned source; unknown units do not inherit
minion-only damage modifiers. Lethal pet packets retain ability and persistence
attribution for exact refunds and stack credit. Already-launched basic missiles can
complete after their owner's death, including reflected trade kills.

Validation of this snapshot:

- All **4,095** unordered pairs were recomputed with four workers from an empty
  fingerprint directory. No prior-fingerprint checkpoints were reused. All **269**
  generated simulator and ledger files pass freshness checks. Both TypeScript
  projects and the production build pass.
- Independent comparison checks every checkpoint against all **8,190** generated
  directions, including scenarios, aggregates, spending and selected variants.
  All **180** Heimerdinger/Udyr variant selections and all 91 spending summaries
  match. Every supported counter page contains the correct 90-rival ranking.
- Actual production-worker searches pass both orientations for all **90** Darius
  rivals and all **15** pairings among the six new champions. Swapped spending
  and options match exactly. The largest scenario reflection difference is
  **`3.29e-14`**, below the unchanged **`1e-10`** tolerance.
- The final serial suite records **3,397 passing tests, 2 failing draft winner
  expectations and 5 existing skips**. The failures remain Garen–Yasuo and
  Malphite–Yasuo. All five golden files are byte-for-byte unchanged, and the
  test command still exits with failure for those disagreements. The complete
  Heimerdinger–Udyr search passes in **150.2 seconds** under its unchanged
  **180-second** limit.
- Chromium passes all **17 browser checks**, including live agreement for all
  three new pairs, seven source pages at **390-pixel** phone width, cached ranks,
  changed weights, cancellation and retry. All **90** live fallback rankings
  against Darius match the refreshed matrix within the unchanged `1e-10`
  tolerance; the largest score difference is **`3.78e-15`**.
- Long assumption formulas wrap within phone width, while numeric tables scroll
  inside their containers. The phone screenshot was inspected visually. Page,
  console, HTTP and request errors are zero; all three browser contexts have no
  unfinished posted jobs. Corki's historical Special Delivery record remains
  byte-identical to batch 5 and absent from current ability headings.
- Private delivery includes the compiled app and exact parsed source snapshot.
  Publication requires every archive member and source digest to match, valid
  archive CRCs, and all five startup checks, including freshness from extracted
  `SOURCE`. It uses a new private preview branch and preserves the previous ZIP
  and the repository's main commit.

## Seventh expansion batch: Gragas, Hecarim, Warwick and Wukong, 18–20 October 2026

Gragas, Hecarim, Warwick and Wukong bring implemented coverage to **95 of 173
champions**. **78 remain**, and the supported matrix requires **4,465 unordered pairs /
8,930 directed entries**. These are controlled kit simulations, not measured player win
rates or certification of every mechanic. The batch also merges the private 91-kit
build into this branch (below).

The four new champion test files contain **100 passing checks** (Warwick 23, Gragas 18,
Wukong 34, Hecarim 25). Each quoted restriction was also broken on purpose, one at a
time, to confirm that a test fails. Rerun on the merged engine, **21 of 21** Warwick
mutations, **14 of 14** Gragas, **63 of 63** Wukong and **47 of 47** Hecarim mutations
are caught. Wukong's first pass left two survivors, and each became a new test: a
cooldown cut from ability hits on a running Crushing Blow cooldown, and the clone's
shared knock-up, which only shows when the clone and Wukong first reach the enemy on
different ticks. On the merged engine one Hecarim mutation, letting any damage give
Rampage a stack, first survived: the one-stack-per-cast guard also blocks stacks before
the first cast, which is when the test attacked. The test now also attacks after a
missed cast.

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
- Hecarim's Warpath turns 24% of his bonus movement speed into attack damage, read every
  0.25 s, never less than none when he is slowed. Rampage's stacks come only from its
  own damage: one a cast however many enemies it damages, pets included, and every enemy
  a cast hits takes the stacks it started with. It deals 60% to the summons their pet
  data classes as minions. Each stack adds 3% (+ 3% per 100 bonus AD), up to three, and
  they set its base cooldown from 4 down to 1.75 s. They last 8 s after its last hit,
  then go one a second. Spirit of Dread pulses four times, through spell shields, and
  gives 25 armor and magic resistance. It heals him for 25% of the damage he deals to
  the enemy in its 525-unit area while it lasts. Devastating Charge's run-up is ghosted
  and 25% faster, 3.33% more every 0.25 s up to 65% at 3 s, and stands still during
  Onslaught of Shadows' dash. The charge takes the place of his attack: silence and
  blindness don't stop it, stuns and disarms do, and roots and grounds hold it. It
  reaches 50 to 250 farther and deals 90 (+ 50% bonus AD) up to double. It knocks back
  150 to 350 units, stopping at the lane wall, and stuns for 0.25 s after the knock
  back. All of these follow the distance he had traveled when he charged; being knocked
  about doesn't count. Dodges and blocks stop its damage, not its knock back. An enemy
  gone out of reach by his arrival leaves the charge for later. Onslaught of Shadows
  dashes 300 to 1000 units with displacement immunity, and its riders (a projectile
  wave) strike once. Its fear on arrival lasts 0.75 to 1.5 s by the distance dashed,
  within 315 of where he stops. Its slow follows the enemy's distance from him (none
  within 150, 99% at 300) as a negative share of speed, and ends with the fear, a
  cleansed one included. The run-up's ramp time disagrees with the pinned game file
  (TimeToMaxMoveSpeed 2.5 s against the wiki's 3 s): the wiki is used and the excerpt is
  recorded. The charge's dash speed and its knock back's duration are in neither source
  and are explicit assumptions.

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
glossary's uncancellable-windup rule, which Nimbus Strike's interruption honors, and
Devastating Charge's two game-file values.

Wukong's behavior ends a spin early once its knock-up has landed, if his attacks would
deal more than its pulses. Measured against 27 opponents when it was introduced, it
changed 9 scores. Eight rose, the largest from **−0.82 to +0.73** against Gwen and from
**−0.81 to +0.53** against Xin Zhao; one fell, from **+0.72 to +0.45** against Volibear.
Later kit corrections came after that comparison; the matrix below is the reference.
Winners and margins were not tuned toward any expectation.

### Merging the private 91-kit build

The private workspace published its 91-kit build (`158c0a49`) only as an archive and a
preview branch based on `main`. Its `SOURCE` folder was imported as one commit on the
73-kit build it started from, then merged with this branch. The three code conflicts
were mechanical: both sides added a dash option in the same place (`distanceFor` and
`crossTerrain`), changed the same dash-distance line, and registered kits. The private
build's attack hooks now say which attack started and whether it targets a pet. With
that, Warwick's Blood Hunt counts an enemy pet by its own health, and the active's mark
only on the champion, as the wiki's text reads; a new test covers it.

The private build had added evidence to 17 marksmen's ability records by hand, which a
rebuild from `data/raw` would have dropped, and with it text their kits quote. The
pipeline now reproduces all of it. There are 54 game-file excerpts: 44 quote the file
exactly as written ("2250.0", new `exact`), 8 re-serialize it, and 2 are lines written
by hand that the build checks against the file (new `lines`). There are 13 texts
rendered by hand from templates, each pinned to its revision, and Varus's note on his
Hail of Arrows damage type. Five corrections (new `RECORD_CORRECTIONS`) each state what
the parser gives and fail the build if that changes: Corki's retired Special Delivery is
marked historical, Draven's Stand Aside knock aside loses the slow's 2 seconds,
Kog'Maw's and Tristana's notes keep text the parser drops, and Varus's Hail of Arrows is
physical damage, as its text and formula say. The 17 records' content is identical to
the private build's, and all 173 records rebuild byte-identically.

Three fight profiles (Anivia, Malzahar, Wukong) were older than their records' curated
interaction tables; they now match a rebuild, as do all 173 profiles and the glossary.
Nine kits' assumptions from the private builds had lost the spaces around their numbers
("A300radius desecrated field lasts4seconds"); only spaces, leading zeros, formula
spacing and glued words were restored. The engine's pet classes, read from each pet's
wiki targeting, let Rampage deal 60% to minion-class summons and gain its stack from
damaging a pet. After the refresh, all 8,190 directed results among the 91 champions the
private build simulated match its `158c0a49` matrix: 8,166 bit for bit and 24 within
2.2e-16 of floating-point rounding, with every scenario value and every Heimerdinger and
Udyr kit choice the same. The merge changes none of those duels.

### 76-kit snapshot (superseded)

Before the merge, Gragas, Warwick and Wukong were validated on a 76-kit matrix
(fingerprint `c280f431…`, commit `9a217e2`). All 2,850 pairs were computed afresh,
and the 73 earlier kits' results were unchanged apart from rounding (at most
2.2e-16). The full suite had 2,419 passing tests, the two draft winner failures and
five skips; the Heimerdinger–Udyr search timed out only under full parallel load and
passed alone in 148.6 seconds. All 18 browser checks passed, and all 75 live fallback
scores against Darius matched the matrix within 2.46e-15. The validation below
supersedes it.

### Seventh-batch validation

Model fingerprint:
`090fdf2d6feba7dec518d2eab5665eb2365f70a7691fa5107e9d9b5f36107ac5`.

The refresh computed all **4,465 pairs** afresh on four workers. A container restart
stopped it after 492 verified pair checkpoints of this same fingerprint; the resumed run
reused those and computed the other 3,973 in **3,815.6 seconds**, writing **273**
simulator and ledger files. All 95 rows and 8,930 directed entries are complete,
`npm run build:sim -- --check` passes for the fingerprint above, and every directed
score is the exact negative of its mirror. Both TypeScript projects pass. All 173
ability records, all 173 fight profiles and the glossary rebuild identically from the
downloads.

Against the 76-kit snapshot, 5,502 of the 5,700 shared directed entries are unchanged.
Of the 198 that change, 192 are the private build's corrections among the original 73
kits and 6 involve Gragas, Warwick or Wukong. The largest is Annie against Warwick, from
+0.12 to −0.78, with two sources: the merged engine flips the brawl, and Blood Hunt's
fix flips the enemy engage (with the fix reverted Annie scores −0.28).

By mean score against the other 94, Warwick ranks **23rd** (+0.195, 61 wins), Wukong
**46th** (+0.032, 50 wins), Gragas **67th** (−0.202, 35 wins) and Hecarim **93rd**
(−0.616, 9 wins). Warwick's best matchup is Wukong (+0.86) and his worst Xayah (−0.89);
Wukong's are Draven (+0.80) and Darius (−0.88), Gragas's Vladimir (+0.83) and Fiora
(−0.86), and Hecarim's Vladimir (+0.80) and Kayle (−0.87). Hecarim's logged fights use
his kit as written: from range, Onslaught of Shadows' full 1000-unit dash fears for
1.5 s and the charge lands at nearly double its base damage. He loses on sustained
damage at level 20, often against heavy armor: Darius spends 3,500 gold on it against him.

The full suite ran **3,521 tests across 125 files** on four workers in **157.1
seconds**: **3,514 passed**, the five existing tests were skipped, and only the two
original draft Garen–Yasuo and Malphite–Yasuo expectations failed. The Heimerdinger–Udyr
full variant search passed within its unchanged 180-second limit.

The production Chromium run passed **all 41 checks** for Hecarim, Gragas, Warwick,
Wukong and three merged marksmen (Varus, Xayah, Kalista). The picker lists all 95
simulated champions, and each of the seven counter pages ranks all 94 opponents. Their
matchup pages against Darius show the matrix scores. Each kit page shows its assumptions
without horizontal scrolling at 1,200 pixels; Wukong's, Hecarim's and Xayah's cite their
pinned game files (Xayah's exact `mSpell.missileSpeed: 2500.0`), and Varus's shows the
respaced text. The matchup page fits a 390-pixel phone. With the stored results marked
stale, the production workers reran all **94 Darius opponents** in the browser in 60.7
seconds, Heimerdinger's and Udyr's kit-option searches included. Every live score agrees
with the matrix within **3.83e-15**, every scenario within its three-decimal rounding,
and the whole ranking order agrees. Page, console, HTTP and request errors are all zero.

## Review of the Yasuo golden matchups, 20 October 2026

Two draft expectations, Garen beats Yasuo and Malphite beats Yasuo, had failed since the
wave-3 import corrected Yasuo's kit: both scored −0.776 for the expected winner. Undoing
the import's Yasuo corrections one at a time shows what decides them: Last Breath's
critical-strike bonus armor ignorance, alone. Without it Garen and Malphite win every
all-in (+0.78 each). Undoing Steel Tempest's cast-time scaling, life steal, the parry
rules, Sweeping Blade's Flow or its ghosting leaves both lost; only the cast time moves
Garen at all, to −0.73. The ignorance is read from
[Template:Data Yasuo/Last Breath revision 4027670](https://wiki.leagueoflegends.com/en-us/Template:Data_Yasuo/Last_Breath?oldid=4027670):
for 15 seconds his critical strikes ignore 60% of the target's bonus armor, and its note
says this "stacks additively with sources of percentage armor penetration". With the
capped 35% armor penetration and Intent's doubled crit chance (100%), every attack
Yasuo lands after Last Breath ignores 95% of the target's bonus armor.

Two other readings were checked, and neither changes the winners. If the ignorance
multiplied with armor penetration instead (74% ignored), Garen would still lose at
−0.78 and Malphite at −0.74. The stat budget values stats at the start of a fight and
doesn't see this mid-fight buff, so Garen and Malphite buy armor against Yasuo (3,043
and 8,314 gold); a budget that sees it moves their gold out of armor, and they still
lose (−0.77). Firing Garen's Demacian Justice below 20% or 35% of his health, rather
than only when it kills, changes neither score either.

On review the additive stacking stands, as the wiki has it, and both expectations now
say Yasuo wins, resting on that interaction. A multiplicative version was committed
and reverted on the way; the engine and every kit end up exactly as they were, so no
simulated score changes. The matrix is refreshed only because the golden file is part
of the simulation fingerprint.

### Validation of the review

Model fingerprint:
`248fa67b24bbbef9305f9a394077dedefcd1c386fd5759199fd0bc2e5e6598d2`.

The refresh computed all **4,465 pairs** on four workers in **5,184.2 seconds** and
rewrote 273 simulator and ledger files; only `simulated.json` and the simulator report
changed. All 8,930 directed scores, every scenario and every kit choice are identical
to the previous matrix (`090fdf2d…`), and only the fingerprint differs.
`npm run build:sim -- --check` passes, both TypeScript projects pass, and the report
now shows 65 of 69 expectations holding.

The full suite ran **3,521 tests across 125 files** on four workers in **191
seconds**: **3,516 passed** and the five disputed matchups were skipped. No test failed,
for the first time since the wave-3 import.

The production build passes. In Chromium, the matchup pages for Yasuo against Garen and
Malphite, both ways round, show the stored ±0.78 within about two seconds, without the
rerun banner. Yasuo's, Garen's and Malphite's counter pages rank all 94 opponents, their
matchups against Darius show the matrix scores, their kit pages show their assumptions
without horizontal scrolling, and the matchup page fits a 390-pixel phone. Page, console
and HTTP errors are all zero.

## Item catalog, 20 October 2026

The first step of M8 (PLAN.md §13): the items the build search will choose from, read from
pinned sources. The simulator doesn't use them yet, so no simulated score changes, and
`npm run build:sim -- --check` still matches fingerprint `248fa67b…`.

- **Sources.**
  - Data Dragon 16.20.1's item list decides which items the Summoner's Rift shop sells, and their gold.
  - The items' game file gives stats and item groups. It comes from CommunityDragon 16.20.8248524, the dataset's own game build.
  - [Module:ItemData/data revision 4082420](https://wiki.leagueoflegends.com/en-us/Module:ItemData/data?oldid=4082420) gives stats, effects and limits.
- **The wiki's per-item subpages are out of date.** The `Module:ItemData/data/<item>` pages are an older copy, last edited in June 2025. There, Infinity Edge has 65 AD and 40% critical strike damage; the 16.20 game file and the combined module give 75 AD and 30%. The catalog reads the combined module.
  - Triple Tonic's elixirs are still read from those subpages. Moving them is a follow-up, since it changes `runes.json` and so the simulation fingerprint.
- **The catalog has 106 finished items and 7 tier-2 boots,** the counts confirmed on review.
- **Cross-check:** all 323 stats the wiki gives for those items match the game file, once its float noise is rounded (30.000001% is 30%). The one difference is Redemption's gold: 2,250 on the wiki, 2,300 in Data Dragon. The catalog uses Data Dragon's.
- **One-per-build groups:**
  - Nine game-file caps bind the catalog. Besides the boots, the wiki's limits name the same items in each.
  - They differ in three places from the rules confirmed on review (PLAN.md §13):
    - The Tear items are one per build.
    - Mortal Reminder and Morellonomicon can be combined.
    - Penetration is two groups: LastWhisper (Lord Dominik's Regards, Mortal Reminder, Serylda's Grudge, Black Cleaver) and VoidPen (Void Staff, Cryptbloom, Bloodletter's Curse). Terminus is in both.
  - Shown these differences, the review kept its rules. `pipeline/items/rules.ts` gives them to the build search.
  - Counted from the catalog, those rules allow 1,538,705,768 builds per side with six items and 661,723,587 with five items and boots: 2,200,429,355 together, before the two formats became a toggle (20 October). The game file's caps would allow 2,164,239,404 together.
- **Effects:**
  - All 163 effect and restriction texts render without wiki markup, with both melee and ranged values.
  - The shared evaluator shows only the melee value of `{{rd}}`, so the item step spells out both before rendering. Melee/ranged values that scale by level render as level progressions.
- **Tests:** `tests/items.test.ts` (14 tests) covers the selection, the text, the records, the cross-check, the groups, the build counts and the committed catalog.
- **Full suite:** 3,529 of 3,535 tests pass and 5 are skipped. The one failure is the browser's full Heimerdinger–Udyr variant search (`tests/web/run.test.ts`), which ran past its 180-second limit on this machine. It passes alone in about 150 seconds, and the code from before the item work takes as long on this machine (162 s); the earlier validation measured 106 seconds. It doesn't involve items.

## Item effects, 20 October 2026

The second step of M8: what each item does in a duel, read from its wiki text the way kits
read their abilities. The precomputed matrix doesn't use items yet; `npm run build:sim --
--check` still matches fingerprint `248fa67b…`, and no simulated score changes.

- **Catalog additions.**
  - The wiki module's further description paragraphs were dropped before; seven items keep rules there. For example, Hextech Rocketbelt and Titanic Hydra reset the attack timer, and Spear of Shojin gives one stack per cast per second.
  - Each effect now carries its value templates as series with their sentences, its active range and the item's tags (`OnHitAppliesLifeSteal` decides whether on-hit damage heals through life steal).
  - Muramana, Seraph's Embrace and Fimbulwinter join as transforms, their `=>` fields resolved from the base item. Their stats match the game file too (332 stats in all, the same one difference).
- **Rules beyond the items' text** come from pinned wiki pages fetched with the items:
  - [Template:Tip data/Energized revision 4013385](https://wiki.leagueoflegends.com/en-us/Template:Tip_data/Energized?oldid=4013385): 6 charges an attack, one per 24 units travelled, full at 100.
  - [Combat status revision 4058480](https://wiki.leagueoflegends.com/en-us/Combat_status?oldid=4058480): out of combat 5 seconds after the last damage or crowd control.
  - [Vamp revision 4058226](https://wiki.leagueoflegends.com/en-us/Vamp?oldid=4058226): omnivamp heals from post-mitigation physical, magic and true damage.
  - [Critical strike revision 4059009](https://wiki.leagueoflegends.com/en-us/Critical_strike?oldid=4059009) and [Template:Critical damage revision 4001015](https://wiki.leagueoflegends.com/en-us/Template:Critical_damage?oldid=4001015): crit damage adds up, and a champion's modifier scales the total. Infinity Edge makes most crits 230%, and Yasuo's 218.5%.
  - A quote no longer on these pages, or in an item's text, fails the build.
- **Coverage** (`reports/item-effects.md`), of 116 items:
  - 5 have stats only, and 83 have every effect modeled. The rest leave part out, each with its reason.
  - 12 have no effect that can act in a duel: their effects work through allies, a takedown (which ends the duel), summoner spells or other enemies.
  - Actualizer's active isn't cast, since its costs aren't modeled.
- **Findings while modeling.**
  - A stat effect in a kit's `start` replaces another of the same stat (their memo key is `effect:<stat>`). So items keep each stat under their own key: Lord Dominik's Regards' 35% armor penetration stays a separate source next to Darius's innate.
  - The engine's stasis state makes a unit invulnerable and untargetable, but it can still attack and cast. Item stasis (Zhonya's Hourglass, Guardian Angel) adds the no-attack and no-movement states and blocks casts itself. Lissandra's self-cast Frozen Tomb has the same gap; its fix is in the engine, for the next refresh.
  - When item actives can be used (confirmed on review, 20 October): under any crowd control but knock-ups and stuns, and the cleanse item (Mercurial Scimitar) under stuns too, never knocked up. Suppression counts as a stun (confirmed on review, 1 November), and so do sleep and stasis: they stop a champion at least as fully, and Mercurial Scimitar removes suppression and sleep. A dash (Hextech Rocketbelt) still can't be used while rooted or grounded. The wiki's [Cast-inhibiting crowd control revision 4035713](https://wiki.leagueoflegends.com/en-us/Template:Tip_data/Cast-inhibiting_crowd_control?oldid=4035713) page says every cast-inhibiting type stops items, silence included; the review's rule is used for items, and kit abilities keep the wiki's (`items/equip.ts` `STOPS_ITEMS`).
  - Leona's W and an item are both called Eclipse. Item damage is labeled with the item's name, so her W would have counted as the item's damage, and the item's passive would have skipped it. When a kit has an ability of the item's name, the item's damage now reads "Eclipse (item)".
  - An Energized attack that hits a pet (Tibbers, the Maiden of the Mist) spends the charges there; before, the next attack on the champion fired them. Its effects don't hit the pet, which is stated as an assumption.
  - Hollow Radiance's Desolate was left out as needing a kill, but its smaller eruption follows any non-champion kill, and a duel's pets are those. Killing a pet now erupts where it died, on the enemy within 350 units; only the champion-takedown eruption stays out. The effects that reach other enemies (the Hydras' Cleave, Runaan's Hurricane's bolts, Statikk Shiv's bounces, Luden's Echo's orbs) now say those can only be pets in a duel, and that the model leaves them out; Luden's Echo puts all its orbs' damage on the target, as with no other enemies.
- **Tests:** 64 item tests pass (`tests/items.test.ts`, `tests/items/effects.test.ts`, `tests/items/mechanics.test.ts`):
  - every item builds for a melee and a ranged champion;
  - a changed quote fails the build;
  - each shared mechanic plays as its wiki text says in synthetic fights (Spellblade, Lifeline, Energized, Annul, Guardian Angel, Death's Dance, auras, item haste, burns and executes);
  - the build rules the duel command checks, the label of an item named like a kit's ability, and the crowd control each kind of item active can be used under.
- **Speed:** with both builds fixed, a matchup's six scenarios took 0.25 to 0.85 s on four sample matchups. With the stat budget the same matchups took 1.8 to 3.1 s, its allocation included.
- **Full suite:** 3,579 of 3,585 tests pass and 5 are skipped. The one failure is again the browser's Heimerdinger–Udyr variant search (`tests/web/run.test.ts`), past its 180-second limit under the suite's load (193 to 229 s); alone it passes in 156 seconds. It doesn't involve items: nothing outside the item tests imports `items/`. `npm run build:sim -- --check` still matches `248fa67b…`.

## Seventh expansion batch (private workspace): validated model and private delivery

The private workspace continued from the 91-kit build; its batches 7 to 15 follow as it
recorded them, before they were merged into this branch on 30 October.

Akshan, Aphelios, Graves, Kindred, Senna and Zeri bring coverage to **97 of 173
champions**, with **76 remaining**. All **4,656 unordered pairings / 9,312 directed
entries** were freshly generated with four workers under fingerprint
`f5ee5ef463912c6f174e508dbec6048b257131ffddc1550d4a034afc061d84bd`.
The refresh took **8,997.1 seconds** and updated **275** simulator and ledger files.
Parsed source records and profiles remain preserved.

The source review checks **41 exact primary wiki templates**, the separately pinned
Aphelios Sentry pet page and **seven versioned binary hashes**, including Kindred's
Wolf. All **39 game-source records / 121 exact excerpts** match those binaries.
Source conflicts and explicit limits remain with [Akshan](docs/next-wave/Akshan.md),
[Aphelios](docs/next-wave/Aphelios.md), [Graves/Zeri](docs/next-wave/Graves-Zeri.md)
and [Kindred/Senna](docs/next-wave/Kindred-Senna.md).

Shared contracts cover actual pet contacts and projectile lifetimes, independent
cast/dash clocks, anchored nearsight, camouflage detection and shared health-floor
protection. Duskwave skips a follow-up whose initial hit removed its target; a
surviving pet still receives its actual off-hand attack and returned Chakram.
Failed simulation workers now stop and await their siblings, suppress late progress
and report the failed dataset and pair without discarding valid checkpoints.

- All **539 focused tests** pass, including the production Aphelios–Heimerdinger
  regression, lethal/surviving pet contacts and worker failure cleanup. Both
  TypeScript projects, provenance freshness and the production build pass.
- An independent read-only audit validates every one of the **4,656 checkpoints**,
  all matrix directions and six scenarios, rounded display scores, finite spending,
  generated budget means, legal variant selections, all 97 counter rankings,
  exact coverage and seven source pages. It reports **zero issues**.
- Production searches pass strict side reflection for **192 Darius directions**
  covering all 96 rivals and **30 directions** among the six new champions. Spending
  and selected options match exactly. The largest scenario reflection difference is
  **3.2862601528904634e-14**, below the unchanged **1e-10** tolerance.
- The final unfiltered serial suite records **3,877 passing tests, 2 retained draft
  winner failures and 5 existing skips**. Garen–Yasuo and Malphite–Yasuo remain the
  two failures; all five golden files are byte-for-byte unchanged. The command
  honestly exits with failure. The full Heimerdinger–Udyr search passes in
  **148.01 seconds**, under its unchanged **180-second** limit, without concurrent
  heavy jobs.
- Chromium passes all **17 browser check groups**, including the three new live
  pairings and seven source pages at **390-pixel** phone width. Every one of the
  **96** live stale-cache fallback results and ranks agrees with the fresh matrix;
  the largest score difference is **3.774758283725532e-15**. Page, console, HTTP
  and request errors are zero, and no posted worker jobs remain unfinished.
  The phone screenshot was inspected visually.
- Private delivery packages the compiled app and exact working source. Archive
  CRCs, every member digest, source inventory and five startup checks must pass
  before publication to a new private fingerprint branch. Earlier previews, local
  source HEAD, golden files and externally updated main commits are preserved.

## Eighth expansion validation (103-kit snapshot)

Diana, Ekko, Evelynn, Fizz, Katarina and LeBlanc bring coverage to **103 of 173
champions**, with **70 remaining**. All **5,253 unordered pairings / 10,506 directed
entries** were freshly computed with four production workers under fingerprint
`50faa12336b7e4b5c3fbc5a0290ba7ec2dc32a6cb919e7cf50b43a01cdb585ad`.
The refresh started with zero checkpoints, completed in **7,155.1 seconds**, updated
**281** simulator/ledger files and preserved parsed inputs and profiles. No checkpoint
was copied from another model. Source HEAD and all five golden files remain unchanged.

The exact source audit verifies **33 primary revisions** (32 ability templates and
LeBlanc's separate clone article), **six** versioned binaries, **24** curated game
objects and **33** numeric excerpts. Arrays and scalars are compared exactly with
Decimal parsing; URLs, object paths, bytes, SHA-256, version and source attribution
are checked independently. Primary/bin conflicts remain explicit, including Diana's
E cast/speed metadata, Ekko's E distance/W delay/R cost, Katarina's E range and
LeBlanc's W radius. Individual audits are linked in [docs/next-wave](docs/next-wave/README.md).

Shared changes distinguish spell dodge and block, preserve actual pet/clone classes
and pathing radii, make clone attacks cosmetic without hit/retaliation events, and
report pet attack resolution separately. Missile destruction uses the first actual
wall/aura coordinate. Voluntary channel cancellation respects opening/closing locks;
CC still interrupts. A per-dash callback tracks targets after same-tick cast completions,
and opted-in targeted dashes revalidate range/visibility before paying cast costs.

Production checks exposed and corrected exact-overlap direction choices after Shunpo:
Diana's Q/E, Evelynn's R/Q recasts and Fizz's R now use reflected facing. A last-tick
blink during empowered Whiplash cancels without mana/cooldown/empowerment loss, while
post-commit target loss gives no refund. Custom policies preserve completed-trade
retreat and reserve offensive ultimates in hold/trade modes, using tests where R is
actually eligible. Defensive reactions remain available against real incoming threats.

- All **676 focused tests** pass. Both TypeScript projects, final provenance freshness
  and production build pass.
- An independent read-only audit checks every one of the **5,253 checkpoints**, all
  matrix directions/scenarios, legal variants/spending, 103 budget means and rankings,
  complete coverage and seven source pages. It reports **zero issues**.
- Strict production reflection passes **204 Darius directions** and **30 directions**
  among the six new champions. Spending and selected variants match exactly. The
  largest scenario difference is **3.2862601528904634e-14**, below unchanged **1e-10**.
- The final unfiltered serial suite records **4,283 passing tests, 2 retained draft
  winner failures and 5 existing skips / 4,290 total**. Garen–Yasuo and Malphite–Yasuo
  remain the two failures; the command honestly exits with failure. The full
  Heimerdinger–Udyr variant search passes in **109.40 seconds** under its
  unchanged **180-second** limit, with no concurrent heavy jobs.
- Chromium passes all **17 browser check groups**, including three new live matchups,
  all **102** live stale-cache fallback score/rank and seven source pages at
  **390-pixel** phone width. The largest fallback score difference is **3.774758283725532e-15**.
  Page, console, HTTP and request errors are zero; no posted worker jobs remain pending.
  The phone screenshot is inspected before private packaging.
- Private delivery packages the compiled app and exact working source. Every ZIP member,
  CRC, source inventory and five startup checks must pass before publication to a new
  private fingerprint branch. Older previews, main, local source HEAD and golden files
  are preserved; no Codespace or public hosting is created by this work.

Unquantified dash speeds retain explicit earliest-tick approximations; lateral geometry,
Diana's orbital phase and Q projection, Katarina's unsourced pickup trigger radius, Ekko's
path interpolation and LeBlanc's clone health snapshot interpretation remain documented.
Each kit links its retained source conflicts and model interpretations.

## Ninth expansion validation (109-kit snapshot)

Kha'Zix, Naafiri, Nocturne, Rengar, Talon and Zed bring coverage to **109 of 173 champions**, with
**64 remaining**. All **5,886 unordered pairings / 11,772 directed entries** were
freshly computed with four production workers under fingerprint
`d2cb2f6a86c2ddf52db35ee35fc28c7e9f84f3526adf3c8f8783155d55c00e8b`. The initial attempt started with zero checkpoints and
was interrupted after saving 854 pairs. Their exact bytes were verified and retained
under the same fingerprint; the resumed invocation computed the remaining 5,032 pairs.
No checkpoint was copied from another model, and no raw checkpoint index was rewritten.
The audit validates each recorded worker index against its actual invocation's
dispatch map and checks every final matrix direction in canonical pair order.
The local source HEAD and all five
retained golden files remain unchanged.

The strict source audit verifies **36 primary revisions** (34 ability templates and
the separate Naafiri and Zed pet articles), **six** exact versioned binaries,
**37** curated game objects and **115** exact numeric excerpts. Every full raw
wiki revision is retained in its authored record. Arrays and scalar values are
compared exactly with Decimal parsing, including object paths, SHA-256 and version.
Primary/bin conflicts and unquantified movement timing remain explicit in the
[individual audits](docs/next-wave/README.md).

Kha'Zix has four legal combinations of three evolutions. Isolation uses actual
nearby target classes and summons, with the lane-minion proxy declared as an
assumption. Naafiri uses the pinned W Call of the Pack and R Hounds' Pursuit layout,
actual Packmate bodies and target-local bleed consumption. Nocturne's declared
missile and trail, spell-shield trigger, fear tether and nearsight use separate
clocks and guards. Rengar's Ferocity and healing use actual duel events. Talon's
close-range Q retains its independent cast clock during movement. Zed uses actual
independent shadows, grouped E damage and accepted damage accounting for Death Mark.

Shared engine changes add independent movement multipliers before soft caps,
explicit opt-ins for death-persistent statuses and pets, reflected basic-attack
facing at exact overlap, casts that retain declaration-time dashes, instant overlays
on those dashes, and lines released at declaration without duplicate completion.
Standard sight remains distinct from true sight. Each new champion has source,
counterplay, target-identity, lifecycle and ordinary-mode regressions.

- All **1,147 focused tests** pass. Both TypeScript projects, final provenance
  freshness and the production build pass.
- The final unfiltered serial suite records **4,686 passing tests, 2 retained
  draft winner failures and 5 existing skips / 4,693 total**.
  Garen–Yasuo and Malphite–Yasuo remain the two failures; the command honestly exits
  with failure. The Heimerdinger–Udyr full search passes within its unchanged
  180-second limit with no concurrent heavy work.
- A separate read-only audit checks all **5,886 checkpoints**, every matrix
  direction/scenario, legal variants and spending, all 109 budget means and counter
  rankings, complete coverage and seven source pages. It reports **zero issues**.
- Strict production reflection passes **216 Darius directions** and **30 directions**
  among the six added champions. Spending and selected variants match exactly;
  scenario differences remain within the unchanged **1e-10** limit.
- Chromium passes all **17 browser check groups**, including three new live
  matchups, all **108** supported live fallback scores and rankings, and seven
  source pages at **390-pixel** phone width. Page, console, request and HTTP errors
  are zero, with no pending worker jobs. The phone screenshot is inspected.
- Private delivery packages the compiled app and exact working source. ZIP member
  hashes, CRC, source inventory and five actual startup checks must pass before
  publication to a new private fingerprint branch. The nine older previews,
  historical helper/proof files, remote main, local HEAD and golden files are
  preserved. This work creates no Codespace or public hosting.

One-dimensional projection, finite skillshot branching, abstract lane minions and
brush, unavailable preduel history and missing source timing remain model limits.
Coverage does not claim exact reproduction of every champion interaction; each
individual audit records its remaining approximations and evidence conflicts.

## Tenth expansion validation (115-kit snapshot)

Hecarim, Jarvan IV, Lee Sin, Wukong, Vi and Warwick bring coverage to **115 of 173 champions**, with
**58 remaining**. All **6,555 unordered pairings / 13,110 directed entries** were
freshly computed with four production workers under fingerprint
`d9b033ae559724a9cef49565920eb1e9d2d40eb32d8e61328e29f0f316ab134c`. The actual refresh began with **zero checkpoints**
and completed all 6,555 pairs under this exact source freeze. A separate audit
verifies every raw worker index against the fresh canonical dispatch and every
final matrix direction. No checkpoint came from another model and no raw index
was rewritten. The local source HEAD and all five golden files remain unchanged.

The strict source audit verifies **34 primary revisions**: **33 ability templates**
and Wukong's separate pet article. It checks **six** exact versioned binaries,
**56 distinct game objects** across **59 source records** and **185 exact excerpts**.
Every full raw revision remains in the authored data. Complete arrays, scalar
values, object paths, versions and SHA-256 hashes are compared exactly with
Decimal parsing. Primary/game-file conflicts and missing timing remain explicit
in the [individual source audits](docs/next-wave/README.md).

Hecarim derives his passive from current movement speed and heals from resolved
damage around Spirit of Dread. Jarvan IV retains target-local passive clocks,
actual flag auras, Dragon Strike contacts and Cataclysm terrain. Lee Sin keeps
energy, Flurry, target marks, recast windows, real anchors and source-classified
shields distinct. Wukong's clone has its own identity, health, statuses, attacks
and copied spell contacts, with shared target history for Cyclone knockups.
Vi preserves charge/release clocks, target-local Denting Blows and actual tracking
contacts. Warwick heals from resolved packets and separates attached bites,
fear, flight projection and suppression lifecycles.

Damage-based healing follows the retained Riposte revision's explicit vamp rule:
it uses post-mitigation damage before late parry negation, including shield damage.
Actual health loss and shield absorption remain separate for stacks, hunts and
combat events. The same ordering preserves actual allied pet-spell damage for
Hecarim's healing, while parry still denies debuffs and hit callbacks. Invulnerability
and stasis grant no damage-based healing. Focused regressions and an independent
review cover the correction; the earlier incomplete model and its stopped-run
evidence are retained separately and none of its checkpoints enters this model.

Shared changes add opt-in damage observation with real source and victim identity,
including pets and clone actors, and separate accepted health/shield damage from
immunity. Typed shields now protect actual pets. Explicit pet state immunity
preserves source exceptions, and non-damage pet contacts retain exact stage keys
when several stages share a display name. Existing champion-only damage hooks keep
their scope. Missing finite dash speeds, one-dimensional displacement and terrain,
unavailable allies and preduel history remain stated limits rather than guessed data.

- All **891 focused tests** pass. Both TypeScript projects, final provenance
  freshness and the production build pass.
- The final unfiltered serial suite records **5,097 passing tests, 2 retained
  draft winner failures and 5 existing skips / 5,104 total**.
  Garen–Yasuo and Malphite–Yasuo remain the two failures; the full command honestly
  exits with failure. The Heimerdinger–Udyr full search passes in
  **102.100 seconds** within its unchanged 180-second limit.
- The independent audit checks all **6,555 checkpoints**, both matrix directions
  and every scenario, complete legal variants and spending, all **115** budget means
  and counter rankings, coverage and seven source pages. It reports **zero issues**.
- Strict production reflection passes **228 Darius directions** and **30 directions**
  among the six added champions: **258 directions** in total. Spending and selected
  variants match exactly; all aggregate and scenario differences remain within
  the unchanged **1e-10** limit.
- Chromium passes all **17 browser check groups**, including three new live
  matchups, every **114** supported live fallback score/ranking and seven source
  pages at **390-pixel** phone width. Page, console, HTTP and request errors are
  zero, with no pending worker jobs. The actual phone screenshot was visually inspected.
- Private delivery packages the compiled app and exact working source. ZIP member
  hashes, safe inventory, CRC, source bytes and five actual startup checks must pass
  before publication to a new private fingerprint branch. All **ten** older previews,
  historical helper/proof files, remote main, local HEAD and golden files are
  preserved. This workflow creates no Codespace or public hosting.

Coverage does not certify every mechanic or every player decision. One-dimensional
geometry, finite skillshot branching, abstract lane minions and brush, absent
preduel events and unquantified source timing remain model limits.

## Eleventh expansion validation (121-kit snapshot)

Alistar, Blitzcrank, Braum, Galio, Gragas and Maokai bring coverage to **121 of 173 champions**, with
**52 remaining**. All **7,260 unordered pairings / 14,520 directed entries** were
freshly computed with four production workers under fingerprint
`0678eb2da46eec316542e5b47a8cb9849ed6bb3a7dc1dc63af3752bb05ade074`. The actual refresh began with **zero checkpoints**
and completed every pair under this exact source freeze. A separate audit checks
every raw worker index against that invocation's canonical dispatch and every
final matrix direction. No checkpoint came from another model and no raw index
was rewritten. The local source HEAD and all five golden files remain unchanged.

The strict source audit verifies **31 primary revisions**: **30 ability templates**
and Maokai's separate Sapling article. It checks **six** exact versioned binaries,
**61 distinct game objects** across **61 source records** and **1058 exact excerpts**.
Every full raw revision remains in the authored data. Arrays, scalar values,
object paths, versions and SHA-256 hashes are compared exactly with Decimal
parsing. Source conflicts, unquantified timings and geometry assumptions remain
in the [individual source audits](docs/next-wave/README.md).

Alistar observes actual nearby combat deaths and deduplicates passive stack
credits for simultaneous control from one cast on one target. Buffered
Headbutt/Pulverize and Trample keep their separate contact clocks. Blitzcrank's Mana
Barrier absorbs only damage beyond the health threshold on its triggering packet,
after existing shields; it scales from maximum mana. Rocket Grab preserves actual
body selection and guarded displacement, and Static Field removes real shields.
Braum's guard uses the damage's ground or traveled projectile origin, resolves
collision effects before ending intercepted flights and keeps the first frontal
nontrue packet's shield/vamp ordering. Rear-departing shots and genuine newly
emitted collision bounces keep their independent lifecycles. Returning missiles
and curved rays preserve source-specific destruction and collision rules.

Galio retains actual curved gust contacts, the passive cooldown's qualifying
bodies, channel interruption exceptions and charged taunt. His ultimate requires
an explicitly eligible real allied champion body; ordinary duels acquire no ally
or invented ultimate budget. Gragas keeps real drink completion, fermenting barrel
age, body collision refunds and center-relative explosions. Maokai's saplings
retain actual identities, brush-qualified empowerment and real pursuit; his
ultimate models the central traveling branch and its trailers, with unsized
lateral branches explicitly omitted. Shared pet movement and death observation use
actual combat bodies and preserve immunity, terrain and despawn boundaries.

- All **2,671 focused tests** pass. Both TypeScript projects, final provenance
  freshness and the production build pass.
- The final unfiltered serial suite records **5,536 passing tests, 2 retained
  draft winner failures and 5 existing skips / 5,543 total**.
  Garen–Yasuo and Malphite–Yasuo remain the two failures; the full command honestly
  exits with failure. The Heimerdinger–Udyr full search passes in
  **145.757 seconds** within its unchanged 180-second limit.
- The independent audit checks all **7,260 checkpoints**, both matrix directions
  and every scenario, complete legal variants and spending, all **121** budget means
  and counter rankings, coverage and seven source pages. It reports **zero issues**.
- Strict production reflection passes **240 Darius directions** and **30 directions**
  among the six added champions: **270 directions** in total. Spending and selected
  variants match exactly; aggregate and scenario differences stay within the
  unchanged **1e-10** limit.
- Chromium passes all **17 browser check groups**, including three new live
  matchups, all **120** supported live fallback scores/rankings and seven source
  pages at **390-pixel** phone width. Page, console, HTTP and request errors are
  zero, with no pending worker jobs. The actual phone screenshot was visually inspected.
- Private delivery packages the compiled app and exact working source. ZIP member
  hashes, safe inventory, CRC, source bytes and five actual startup checks must pass
  before publication to a new private fingerprint branch. All **eleven** older
  previews, historical helper/proof files, remote main, local HEAD and golden files
  are preserved. This workflow creates no Codespace or public hosting.

Coverage does not certify every mechanic or player decision. Scalar geometry,
finite skillshot branching, abstract lane minions and brush, absent preduel
history, unavailable allies and unquantified source timing remain model limits.

## Twelfth expansion validation (127-kit snapshot)

Nunu & Willump, Rakan, Rell, Sejuani, Taric and Thresh bring coverage to **127 of 173 champions**, with
**46 remaining**. All **8,001 unordered pairings / 16,002 directed entries** were freshly
computed with four production workers under fingerprint
`60f98b364c8647567737d7153792fb92e8116ea03324cc7358e548a6cc76d89d`. The actual refresh began with **zero checkpoints**
and completed every pair under this exact source freeze. A separate audit checks
every raw worker index against that invocation's canonical dispatch and every
final matrix direction. No checkpoint came from another model and no raw index
was rewritten. The local source HEAD and all five golden files remain unchanged.

The strict source audit verifies **31 ability-template revisions**, including both
independently pinned Rell W forms, with **zero separate pet-article pins**. It
checks **six** exact versioned binaries, **49 distinct game objects** across
**49 source records** and **126 exact excerpts**. Every full raw revision
remains in the authored data. Arrays, scalar values, object paths, versions and
SHA-256 hashes are compared exactly with Decimal parsing. The final strict report
requires original primary values to remain preserved and rejects unpromoted game
evidence. Source conflicts and unquantified timings remain explicit in the
[individual source audits](docs/next-wave/README.md).

The six kits use actual cast and resource clocks, target-local contacts, defensive
guards and real body identities. Rell's two W records remain distinct while the
runtime forms share their cooldown. Her passive snapshots each target's first
resistances, her Q removes accepted non-monster shields and her ultimate keeps
nondisabling kinematics separate from the initial pull. Conditional ally spells
across the batch require real eligible bodies; ordinary duels acquire no invented
teammate. Farm history, unsupported lateral geometry and missing finite movement
timings remain declared model boundaries.

- All **3,314 focused tests** pass. Both TypeScript projects, final provenance
  freshness and the production build pass.
- The final unfiltered serial suite records **6,075 passing tests, 2 retained
  draft winner failures and 5 existing skips / 6,082 total**.
  Garen–Yasuo and Malphite–Yasuo remain the two failures; the full command honestly
  exits with failure. The Heimerdinger–Udyr full search passes in
  **175.570 seconds** within its unchanged 180-second limit.
- The independent audit checks all **8,001 checkpoints**, both matrix directions and
  every scenario, complete legal variants and spending, all **127** budget means and
  counter rankings, coverage and seven source pages. It reports **zero issues**.
- Strict production reflection passes **252 Darius directions** and **30 directions**
  among the six added champions: **282 directions** in total. Spending and selected
  variants match exactly; aggregate and scenario differences stay within the
  unchanged **1e-10** limit.
- Chromium passes all **17 browser check groups**, including three new live matchups,
  all **126** supported live fallback scores/rankings and seven source pages at
  **390-pixel** phone width. Page, console, HTTP and request errors are zero, with no
  pending worker jobs. The actual phone screenshot was visually inspected.
- Private delivery packages the compiled app and exact working source. ZIP member
  hashes, safe inventory, CRC, source bytes and five actual startup checks must pass
  before publication to a new private fingerprint branch. All **twelve** older
  previews, historical helper/proof files, remote main, local HEAD and golden files
  are preserved. This workflow creates no Codespace or public hosting.

Coverage does not certify every mechanic or player decision. Scalar geometry,
finite skillshot branching, abstract lane minions and brush, absent preduel history,
unavailable allies and unquantified source timing remain model limits.

## Thirteenth expansion validation (133-kit snapshot)

Janna, Karma, Lulu, Nami, Sona and Soraka bring coverage to **133 of 173 champions**, with
**40 remaining**. All **8,778 unordered pairings / 17,556 directed entries** were freshly
computed with four production workers under fingerprint
`1c41a50fa21c36ec6e1705bcc7efd7ba3efea5855a5f73fb6007f1ac23ec8eda`. The actual refresh began with **zero checkpoints**
and completed every pair under this exact source freeze. A separate audit checks
every raw worker index against that invocation's canonical dispatch and every
final matrix direction. No checkpoint came from another model and no raw index
was rewritten. The local source HEAD is unchanged. All golden expectations remain
intact: four golden files match their original checksums, and the golden-search
driver differs only in its CI deadline, raised from 60 to 180 seconds.

The strict source audit verifies **33 ability-template revisions**, including the
three independently pinned Karma Mantra forms, with **zero separate pet-article pins**. It
checks **six** exact versioned binaries, **100 distinct game objects** across
**115 source records** and **115 exact excerpts**. Every full raw revision
remains in the authored data. Arrays, scalar values, object paths, versions and
SHA-256 hashes are compared exactly with Decimal parsing. The final strict report
requires original primary values to remain preserved and rejects unpromoted game
evidence. Source conflicts and unquantified timings remain explicit in the
[individual source audits](docs/next-wave/README.md).

The six kits use actual cast and resource clocks, target-local contacts, defensive
guards and real body identities. Karma retains separate primary records for her
three Mantra forms. Shield-dependent bonuses end with their exact source's shield;
polymorph's flat movement penalty ends with its accepted control. Damage reports
identify the standard shield and exact amount absorbed, including actual pet
recipients. Target cancellation preserves each spell's explicit free or paid rule,
including early loss of visibility. Actual pet basic declarations stay separate
from connected hits, and explicitly released ally buffs can finish after caster
death without enabling new actions. Temporary pet health, refresh, expiry and
healing reduction use the recipient's own state. Hook-created uncertain packets
retain normal finite skillshot branching and independent cloned queues. Ground
delivery preserves actual per-cast delays, initialized zone identity and centered
champion/pet contacts. Ally effects require real eligible bodies; ordinary duels
acquire no invented teammate. Each kit audit retains its source conflicts and
remaining limits. Farm history, unsupported lateral and size geometry, and missing
finite movement timings remain declared model boundaries.

- All **3,754 focused tests** pass. Both TypeScript projects, final provenance
  freshness and the production build pass.
- The actual unfiltered serial suite records **6,526 passing tests, 3 failures
  and 5 existing skips / 6,534 total**, and exits with failure.
  It retains the Garen–Yasuo and Malphite–Yasuo draft winner failures plus an
  exhaustive Heimerdinger–Udyr timing failure. The subsequent complete browser-file
  retest records **7 passes, 0 failures and 0 skips**. Its Heimerdinger–Udyr search
  passes in **284.473 seconds** with a revised **900-second CI deadline**.
  Across both actual commands, distinct assertion coverage is **6,527 passes,
  2 retained failures and 5 skips / 6,534 total**, counting the six repeated
  successful assertions once. This derived coverage does not change the raw
  failed full-suite verdict. The deadline changed from 180 to 360, then 900
  seconds for cloud runtime variation; each failed attempt remains preserved.
  Golden searches now allow 180 seconds per case and the configured default is
  30 seconds. All 60 variant pairings and every result assertion remain intact;
  earlier timing failures are preserved. These are revised CI allowances; custom live searches
  can still take minutes. Default rankings use the precomputed matrix.
- The independent audit checks all **8,778 checkpoints**, both matrix directions and
  every scenario, complete legal variants and spending, all **133** budget means and
  counter rankings, coverage and seven source pages. It reports **zero issues**.
- Strict production reflection passes **264 Darius directions** and **30 directions**
  among the six added champions: **294 directions** in total. Spending and selected
  variants match exactly; aggregate and scenario differences stay within the
  unchanged **1e-10** limit.
- Chromium passes all **17 browser check groups**, including three new live matchups,
  all **132** supported live fallback scores/rankings and seven source pages at
  **390-pixel** phone width. Page, console, HTTP and request errors are zero, with no
  pending worker jobs. The actual phone screenshot was visually inspected.
- Private delivery packages the compiled app and exact working source. ZIP member
  hashes, safe inventory, CRC, source bytes and five actual startup checks must pass
  before publication to a new private fingerprint branch. All **thirteen** older
  previews, historical helper/proof files, remote main, local HEAD and golden expectations
  are preserved. This workflow creates no Codespace or public hosting.

Coverage does not certify every mechanic or player decision. Scalar geometry,
finite skillshot branching, abstract lane minions and brush, absent preduel history,
unavailable allies and unquantified source timing remain model limits.

## Fourteenth expansion validation (139-kit snapshot)

Hwei, Orianna, Ryze, Syndra, Taliyah and Viktor bring coverage to **139 of 173 champions**, with
**34 remaining**. All **9,591 unordered pairings / 19,182 directed entries** were
freshly computed with four production workers under fingerprint
`d2a43acafdaaa5cfc3f9999c23903335f60717713b8dd4b9c9b07de80e711858`. The actual refresh began with **zero checkpoints**
and completed every pair under this exact source freeze. A separate audit checks
every raw worker index against that invocation's canonical dispatch and every
final matrix direction. No checkpoint came from another model and no raw index
was rewritten. The local source HEAD is unchanged. **All five current golden
files** and the existing test harness match their batch 14 starting checksums.
Original golden expectations remain preserved; batch 14 changes no test deadline.

The strict source audit verifies **40 ability-template revisions** and **one
separately pinned Orianna Ball article**, retaining **41 full raw revisions**.
It checks **six** exact versioned binaries, **85 distinct game objects** across
**85 source records** and **169 exact excerpts**. Arrays, scalar values,
object paths, versions and SHA-256 hashes are compared exactly with Decimal
parsing. Original primary values remain preserved and unpromoted game evidence
is rejected. Source conflicts and unquantified timings remain explicit in the
[individual source audits](docs/next-wave/README.md).

The six kits preserve actual cast clocks, resource costs, recipient identities
and finite histories. Hwei uses eligible-body isolation snapshots, exact rotated
rectangle contacts and accepted Despair slow renewal. Orianna's Ball retains its
actual position, travel, attachment and local command origin. Ryze derives mana
without recurring resource refills and transports only actual eligible bodies.
Syndra collects actual Splinters on their delayed arrival, including large-minion
mana restoration. Taliyah commits mine rows at declaration time and responds to
actual accepted movement; completed landings resolve before terminal observers.
Viktor preserves ray-local travel decisions and snapshots storm recipients before
a packet can grow the field. Shared rules retain independent empowered attack
packets, multiplicative ability power, source-grouped slows, carried pet state and
accepted movement transitions. A separate legacy follow-up corrects Wukong's
Nimbus Strike so protected current and pending attacks retain their own windup
and timer. Ordinary basic windups remain interruptible; ability-like pet deliveries,
other recipients and launched projectiles remain independent. This follow-up
preserves all five original primary records and game evidence, verifies 42 exact
game fields, and restores the separately pinned Uncancellable windup revision
4072133 plus Cyclone's exact interaction-table note. The previous complete matrix
and its failed evidence checks are retained, and the corrected model receives a
new source freeze and fresh matrix. These modeled mechanics do not imply exhaustive
server equivalence. Missing allies, absent farm history, lateral geometry and
unquantified timing retain the explicit limits in each champion audit.

- All **4,327 focused tests** pass. Both TypeScript projects, final provenance
  freshness and the production build pass.
- The actual unfiltered serial suite records **7,091 passing tests, 2 retained
  failures and 5 existing skips / 7,098 total**, and exits with failure. Its only
  failures are the unchanged Garen–Yasuo and Malphite–Yasuo draft winner expectations.
  Every previous assertion identity is retained, including all **6,527** previously
  passing assertions. The exhaustive Heimerdinger–Udyr case passes within this same
  unfiltered run in **118.862 seconds**. The existing 30-second default,
  180-second golden driver and 900-second exhaustive-search allowances remain
  unchanged. All legal variant searches and result assertions remain intact;
  earlier failed attempts remain preserved. Custom live searches can still take
  minutes; default rankings use the precomputed matrix.
- The independent audit checks all **9,591 checkpoints**, both matrix directions,
  every scenario, legal variants and spending, all **139** budget means and counter
  rankings, coverage and seven source pages. It reports **zero issues**.
- Strict production reflection passes **276 Darius directions** and **30 directions**
  among the six added champions: **306 directions** in total. Spending and selected
  variants match exactly; aggregate and scenario differences stay within the
  unchanged **1e-10** limit.
- Chromium passes all **17 browser check groups**, including three new live matchups,
  all **138** supported live fallback scores/rankings and seven source pages at
  **390-pixel** phone width. Page, console, HTTP and request errors are zero, with no
  pending worker jobs. The actual phone screenshot was visually inspected.
- Private delivery packages the compiled app and exact working source. ZIP member
  hashes, safe inventory, CRC, source bytes and five actual startup checks must pass
  before publication to a new private fingerprint branch. All **fourteen** older
  previews, historical helper/proof files, remote main, local HEAD and original
  golden expectations are preserved. This workflow creates no Codespace or public hosting.

Coverage does not certify every mechanic or player decision. Scalar geometry,
finite skillshot branching, abstract lane minions and brush, absent preduel history,
unavailable allies and unquantified source timing remain model limits.

## Fifteenth expansion validation (145-kit snapshot)

Neeko, Swain, Twisted Fate, Vex, Xerath and Zoe bring coverage to **145 of 173 champions**, with
**28 remaining**. All **10,440 unordered pairings / 20,880 directed entries** were
computed from zero checkpoints under the actual frozen source fingerprint
`244198f803f736138620972d8074c840a983121b91aa6dadb54a3856ad1df2b6`, using four production workers. No old-model checkpoint was reused or
restamped. The independent audit verifies every raw dispatch index against this
fresh invocation, both matrix directions, spending, legal options, all 145 budget
means and rankings, complete roster coverage and seven generated source pages.

All **4,766 focused checks** and both TypeScript projects pass. The actual
unfiltered full suite reports **7,542 passes, two retained draft winner
failures and five existing skips out of 7,549 assertions**, with exit code 1.
Only Garen–Yasuo and Malphite–Yasuo retain their draft winner failures. All **7,098
previous assertion identities** and all **7,091 previously passing assertions**
are preserved. The full Heimerdinger–Udyr case passes in
**134.297 seconds** within the unchanged 900-second allowance.
All five current golden files and the established test harness match their
batch 15 starting checksums; original golden expectations remain preserved.
No test deadline changes in this batch.

The strict source audit verifies **31 original ability-template revisions**,
retaining their full raw text and original primary values. **3 separately pinned
wiki supplements** retain Champion summoned units (revision 4023248); Flash (revision 4008665); Module:SpellData/data (revision 4089805). The audit checks **six exact
versioned binaries**, **61 distinct game objects**, **63
object-scoped source records** and **87 excerpts** using exact numeric,
complete-array and dictionary-fragment comparisons. Every comparison stays
inside the cited binary object. Missing sources and unpromoted records fail the
audit. The individual champion audits document assumptions and any unsupported
mechanics; coverage alone does not certify every mechanic or in-game decision.

Final provenance freshness and the production build pass. Strict production
reflection verifies **288 Darius directions** and **30 directions among the six
new champions**: **318 directions** total, with unchanged `1e-10` tolerance and
exact reflected spending and options. All **17 production browser groups** pass,
including the three new live pairs, all **144** fallback rivals, default legal
option metadata, seven source pages at 390-pixel width, worker lifecycles,
initialized stats, reruns, cancellation, retry and unsupported labels. Root
visually inspected the actual final phone screenshot. No unexpected page,
console, HTTP or request errors and no pending worker jobs remain.

The package contains the exact compiled app and working source, with five actual
startup checks required before publication. Publication is restricted to a new
fingerprint branch of the existing private repository. The fifteen earlier
private previews, main branch and local HEAD must remain unchanged. No Codespace
or public hosting is created by this delivery workflow.

## Merge into this branch, 30–31 October 2026

Batches 7 to 15 were merged on the 91-kit import they grew from, so this branch keeps
its own Gragas, Hecarim, Warwick and Wukong (with their tests and data), the Yasuo
review and the item work.

Model fingerprint:
`3f85249931932b5e6580192c3834a28abcd8ce49689ddba6900eeb5059660975`.

The refresh computed all **10,440 pairs** on four workers. A container restart stopped
it after 4,746 verified pair checkpoints of this same fingerprint; the resumed run
reused those and computed the other 5,694 in **8,583.3 seconds**, writing **323**
simulator and ledger files. All 145 rows and 20,880 directed entries are complete,
`npm run build:sim -- --check` passes for the fingerprint above, and every directed
score is the exact negative of its mirror. Both TypeScript projects pass.

Against the private build's matrix (`244198f8…`), **19,740 of the 20,880 directed
entries** are identical, every scenario value included. The **1,140** that differ are
exactly the entries of Gragas, Hecarim, Warwick and Wukong, whose kits are this
branch's. The largest is Warwick against Xayah, from +0.74 in the private build to
−0.89 here. By mean score against the other 144, Warwick ranks **29th** (+0.302, 102
wins), Wukong **57th** (+0.150, 89 wins), Gragas **81st** (−0.054, 67 wins) and Hecarim
**130th** (−0.519, 22 wins); the private build's versions ranked 47th, 84th, 104th and
133rd.

The full suite ran **7,478 tests across 190 files** on one worker in **1,203.2
seconds**: **7,473 passed** and the five existing tests were skipped, the Heimerdinger–Udyr
full variant search included within its unchanged 180-second limit. `npm run build:web`
passes.

## Batches 16 to 19: the last 28 champions (173-kit snapshot), 31 October 2026

Batches 16 to 19 were written in this repository after the merge above. They complete
the roster: **173 of 173 champions** have kits, with **14,878 unordered pairings /
29,756 directed entries**.

- Batch 16: Briar, Lillia, Nidalee, Rek'Sai, Shyvana and Zac.
- Batch 17: Bel'Veth, Elise, Kayn, Nilah, Pyke and Qiyana.
- Batch 18: Fiddlesticks, Renata Glasc, Shaco, Sylas, Viego and Zilean.
- Batch 19: Aurelion Sol, Azir, Bard, Ivern, Locke, Mel, Milio, Seraphine, Yunara and Yuumi.

Each kit reads its values from the pinned ability records at level 20 and quotes the
wiki for each rule it applies; a quote no longer on the wiki fails the build. Each has its
own test file for its values and quoted restrictions, and passes the shared kit checks:
every formula finite, budget hints still evaluable after the kit is sealed, and fights in
which it deals damage and uses at least three abilities. What a duel can't hold is left
out with a stated assumption on the kit page. Among them:

- **Played alone.** With no ally, Yuumi can't attach, so You and Me! does nothing and her spells keep their unattached forms; Milio's shields and heals go on himself.
- **Gathered over the game.** Aurelion Sol's Stardust (200) and Bard's Chimes (40) are kit options with those defaults.
- **Two forms.** By level 20 Kayn has both forms, so like Udyr's rank split he plays whichever does better in the matchup.
- **Rules from the wiki's tables.** Aurelion Sol stands still to breathe: by Breath of Light's channel table, moving, attacking or casting an ability ends it, so he opens with Singularity.
- **One-dimensional lane.** Azir's soldiers stab only the enemy champion, and Emperor's Divide's wall spans the whole line, as Crystallize's does.

The shared engine gained three things for them, none of which changes an earlier kit:

- the kit reader finds an ability by its template page when two records share a name (Kayn's);
- `fieldSeries` reads a field's raw series (Nilah's Formless Blade cast time, by bonus attack speed);
- a channel's pulses can pass spell shields while its completion can't (Apotheosis: "Spell shield will only block the burst damage").

`npm run build:data` also rebuilds the private workspace's curated ability evidence for its
50 kits, so all 173 ability records rebuild from the downloads.

Before the refresh, a smoke round robin played each new kit, in every variant, against
every other kit from both sides: **4,438 pairs and 9,972 runs** of the stat budget's hints
and all six scenarios (one branch each), with no runtime error.

Model fingerprint:
`d28cd1a6862d54eb5b53314b8a6ca90d9d30ea029fde49646ea316d47b84ebfa`.

The refresh computed all **14,878 pairs** on four workers. The container was reclaimed
twice while the session sat idle, after 4,810 and 5,049 verified pair checkpoints of this
fingerprint; each resumed run reused them, and the last computed the other 9,829 in
**13,330.9 seconds**, writing **351** simulator and ledger files. All 173 rows and 29,756
directed entries are complete, `npm run build:sim -- --check` passes for the fingerprint
above, and every directed score is the exact negative of its mirror. Both TypeScript
projects pass.

All **20,880** directed entries among the 145 earlier kits are identical to the 145-kit
matrix (`3f852499…`), every scenario value included: the engine's additions change none of
their duels.

By mean score against the other 172, Ivern ranks highest of the 28 (**7th**, +0.657, 163
wins: Daisy fights beside him for 45 s), then Shyvana (**15th**) and Zac (**36th**). Pyke
(**172nd**, 4 wins), Yuumi (**171st**, 4 wins), Qiyana (**169th**) and Renata Glasc
(**167th**) rank lowest. Over all 173, Yorick, Nasus, K'Sante, Vayne and Fiora lead, and
Thresh, Pyke and Yuumi trail.

The full suite ran **7,898 tests across 219 files** on one worker in **1,014.5 seconds**:
**7,893 passed** and the five existing tests were skipped, the Heimerdinger–Udyr full
variant search included within its unchanged 180-second limit. `npm run build:web`
passes. The Kit Counter Picker's page renders all 173 at 390 pixels with no console error.

## The build matrix, 1–2 November 2026

`npm run build:builds -- --threads 4` played the build search (`pipeline/items/search.ts`)
for all **14,878 pairings**, six items each, under inputs fingerprint
`3b4c26efe9c32989484794ee19bec409fec573420da63ad4a2d8461f1f939dab` (the simulation's
inputs, the item code, the build search and the item catalog).

- **Smoke runs first.** The first smoke run (each kit against the next, 172 pairings)
  failed for Aurelion Sol's and Azir's pairings: their calibrated estimate of an empty
  build was inflated, so no item looked useful and the search found no build. The estimate
  now scales a calibrated kit's own damage the same way with items and without, and the
  search falls back to every item when too few help alone (a regression test holds both).
  The second smoke run played all 172 without failures in 12.8 minutes.
- **The run.** 19.4 hours on four threads, resuming the smoke run's 172 checkpoints:
  **77.8 processor-hours**, 18.8 s a pairing on its thread (12 s alone). No pairing failed.
  The process held about 3.2 GB throughout. `npm run build:builds -- --check` passes.
- **The builds.** 29,756 directed builds, 2,680 of them distinct, from 76 of the catalog's
  113 items. 94% hold Guardian Angel or Zhonya's Hourglass (29% both): a revive or a stasis
  decides a duel, as fights showed before the run. Guardian Angel is in 90% of builds,
  Yun Tal Wildarrows in 72%, Terminus in 62%, Frozen Heart in 41% and Infinity Edge in 40%
  (`reports/builds.md` has each champion's). Mages whose damage is their abilities build
  ability power (Cassiopeia, Aurelion Sol, Azir); many others, tanks and some mages among
  them, build for basic attacks.
- **Against plain stats.** Over all pairings the scores with builds correlate with the plain
  matrix's (`d28cd1a6…`, from before M8's changes to the stat budget) at r = 0.65; 2,160
  pairings change winner where both scores are beyond ±0.2. With builds, Fiora, Aphelios,
  Yorick, Jax and Nasus lead on average, and Pyke, Thresh, Yuumi, Qiyana and Karthus trail.
- **Two limits the results show.**
  - When a matchup is lopsided (71% of directed scores are beyond ±0.5), the losing side's
    build barely moves it, so the build listed for that side is close to arbitrary. Against
    Darius's build, Malphite's found build scores +0.77 for Darius; a tank build (Sunfire
    Aegis, Thornmail, Frozen Heart, Randuin's Omen, Force of Nature, Dead Man's Plate) +0.75;
    an ability power build with Zhonya's Hourglass, Rabadon's Deathcap and Guardian Angel
    +0.74.
  - A ranged champion with a basic-attack build keeps a melee champion out of reach when the
    melee kit has no gap-closer as long as its range: Annie with a critical strike build
    beats Darius at +0.91 (−0.14 with plain stats). The duel has no summoner spells,
    terrain or second dimension to close the gap, and in the six-item format no boots.

The app shows these results by default where the dataset has them (`web/src/builds.ts`),
with plain stats a toggle away; a headless browser check of the picker and matchup pages
with this file found the builds, Udyr's rank split and the item catalog's revision in place,
with no console error.

## Plain-stats refresh after the build search, 2–3 November 2026

The build search changed the stat budget (`engine/budget.ts`: it now reads damage dealt and
taken modifiers and healing modifiers, as fights apply them), so the plain-stats matrix was
refreshed under the new inputs fingerprint
`b9e4777795b1350531f40334eef0e55d25236fc9d8a18bd7ccc9a819399255e7`.

- `npm run build:sim -- --threads 4` computed 14,486 pairs in about 6.7 hours before the
  container restarted; the relaunched run verified those checkpoints, computed the other
  392 and wrote 351 simulator and ledger files in 429.8 seconds. Aphelios's pairings, with
  every weapon variant played, took about 13 s each against about 1.6 s for most.
- **14,734 of the 14,878 pairings are identical** to the previous matrix (`d28cd1a6…`),
  every scenario value included. The other **144 all involve Kassadin**, the one kit that
  starts with a damage modifier (10% less magic damage taken), which the stat budget now
  reads: both sides of his matchups buy differently, and some of his duels change winner
  (Amumu against Kassadin from −0.74 to +0.76). The variants played are unchanged.
- `npm run build:sim -- --check` and `npm run build:builds -- --check` both pass.
- The full suite ran **7,969 tests across 224 files** on four workers in 218 seconds:
  **7,964 passed** and the five disputed golden expectations were skipped, the
  stale-matrix check among those that pass again. Both TypeScript projects and
  `npm run build:web` pass.

## Incremental refresh, 3 November 2026

Refreshes now reuse every pairing whose inputs are unchanged (`pipeline/sim/pairKeys.ts`,
`pipeline/sim/reuse.ts`; README, "Incremental refreshes"). What was checked:

- **The keys cover what a fight reads.** The workers read `champions.json`, the stat prices
  in `rules.json`, `runes.json`, each kit's `abilities/<id>.json` and `pets/<id>.json`, and,
  for item builds, `items.json`; nothing else (a scan of every module the two workers import
  for file reads, `require` and computed imports). Kit modules import only the shared
  `kits/champions/util.ts`, which is in the shared key with the engine, and the kit registry
  holds only the map from ids to kits. A test holds both committed matrices' recorded inputs
  to the inputs computed from the current code and data.
- **Both matrices were stamped while verified current.** Before the inputs were written into
  `simulated.json` and `simulated-builds.json`, both passed their fingerprint checks; the
  plain matrix's stat spending (`simulated-spent.json`) came from its 14,878 checkpoints, each
  checked against the score in the file.
- **A reused pairing reads back exactly as computing it again writes it.** Six pairings
  computed again (Darius–Garen, Udyr–Yasuo, Ahri–Kayn, Heimerdinger–Jax, Annie–Malphite,
  Aphelios–Vayne) gave the reused scores, scenario scores, spending and kit variants
  exactly; a test repeats this for two of them. Scenario scores are now kept at three
  decimals with symmetric rounding, and spending in whole gold, in every output: 2,761 of the
  counter pages' 178,536 scenario cells (1.5%) moved by 0.01 once, from being rounded twice
  before, and the simulator report's spending moved by up to 1 gold. No aggregate score or
  rank changed.
- **A refresh with nothing changed reuses everything.** `npm run build:sim` reused all
  14,878 pairings and wrote its 352 files in 2.6 seconds; `npm run build:builds` reused all
  14,878 in about a second. A second run of both left every file in `data/16.20/`
  byte-for-byte identical. `--check` passes for both, with fingerprints `30202eca…` (plain)
  and `210a6675…` (builds).
- **What a patch would reuse.** Against 26.21's data as fetched, with the current kit
  modules, 69 kits' keys differ from 26.20's, so 9,522 of the 14,878 plain-stats pairings
  (64%) would be computed again. The item catalog changed too, so the whole build matrix
  would be.
- The full suite passed: **7,975 tests across 225 files** on four workers in 220 seconds,
  with the five disputed golden expectations skipped as before. Both TypeScript projects pass.

## Sharded refresh on GitHub Actions, 3 November 2026

The refresh workflow's first run ([run 41566738646](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/41566738646))
checked it end to end. Its request had Darius's pairings computed again in both matrices,
whatever was stored, so that what GitHub's runners compute could be compared with the
committed results.

- The plan job found 172 pairings to compute in each matrix (14,706 reused) and split them
  as requested: two plain-stats shards and three item-build shards, each on its own
  four-core runner.
- The runners worked out the same fingerprints as local refreshes (`30202eca…` for plain
  stats, `210a6675…` for builds), so their checkpoints are for the same inputs. Side by side,
  the plain-stats shards took 1.1 and 2.7 minutes and the item-build shards 2.3, 2.8 and 4.7
  minutes (0.6 processor-hours for the 172 build pairings, 13.0 s each on average).
- The last job found every shard's checkpoints (172 for each matrix), wrote the outputs and
  checked them. **Every pairing computed on the runners equals the committed result**:
  `simulated.json`, `simulated-spent.json`, `simulated-builds.json`, the counter and kit pages
  and the simulator report came out byte-for-byte unchanged. The one change, which it
  committed as `3de79cb`, is the build report's line on how the refresh ran.
- The outputs were committed six minutes after the push. Both TypeScript projects and the
  full suite (7,980 tests across 226 files, the five disputed golden expectations skipped)
  then passed on the runner in another eight minutes.

## Patch 26.21, 3 November 2026

The dataset moved to patch 26.21 (Data Dragon 16.21.1, CommunityDragon 16.21, the wiki as
fetched on 3 November). `data/16.21/` holds it; `data/16.20/` stays as the previous patch's
snapshot, and the tests, the app and the kits' tests now read 16.21.

- **Curated evidence.** 27 wiki pages that kits' evidence pins at a revision had new
  revisions. Each was read again against the previous revision (`pipeline/abilities/`) and
  re-pinned: 12 carry the patch's number changes, 14 wiki edits (new or reworded notes for
  Kha'Zix, Rengar, Sejuani, Syndra, Taric, Thresh, Twisted Fate and Zeri; Maokai's
  restructured Sapling Toss; Vex's reworded blurb), and Neeko's changed revision without
  changing its text.
  Caitlyn's and Varus's hand-rendered excerpts take 26.21's text; Taliyah's game-file excerpt
  lines take the 26.21 file's values, as the build checks them. Zoe's Sleepy Trouble Bubble
  gets back, as an anchored note, a sentence 26.21 moved where the parser doesn't read.
- **Kits.** All 173 compile against 26.21. 15 needed their quotes changed for new wording or
  numbers; four rules changed:
  - Caitlyn: a champion that springs a trap can't spring another anywhere for 3 seconds (the
    note that let another spot's trap catch them is gone);
  - Zoe: the wake-up damage has a fixed window of 3.25 seconds from the sleep's start, which
    tenacity, a cleanse or an early wake no longer shorten;
  - Varus: Piercing Arrow's charge raises Blight, the empowered W and the cooldown refund by
    up to 70% (was 50%), now read from the wiki rather than written in the kit;
  - Maokai: 26.21 dropped the minion damage row; minions take the ordinary explosion.
  Compiling each kit whose code didn't change against both patches, every changed value is
  one the patch notes list (Darius's Q cooldown, Lee Sin's W and R, Locke's mana, W cost and
  E, Nidalee's E and Pounce, Nunu's R, Orianna's ratios, Qiyana's Q, Yone's Q, the base
  stats), and values the notes change at ranks a duel doesn't use stay put (Gwen's R at rank
  3, Tristana's Q and Zyra's W at rank 5). Assumption texts that wrote 26.20's numbers (Lee
  Sin, Nunu, Ryze, Varus) now read them from the kit's values.
- **Items.** Bastionbreaker's Shaped Charge (40 / 20), Bloodletter's Curse's Vile Decay (no
  rate limit on stacks) and Dawncore's First Light (15 AP per 100% base mana regeneration)
  follow the new text.
- **Tests.** Every test that pinned a 26.20 value was checked against the patch and moved to
  26.21; two new tests pin Caitlyn's and Zoe's new rules.
- **The refresh.** The refresh workflow's
  [run 41575445956](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/41575445956)
  computed both matrices on GitHub's runners.
  - The plan job found 10,222 plain-stats pairings to compute, reusing 4,656 from 26.20, and
    all 14,878 build pairings, since the item catalog changed.
  - 76 kits' inputs differ from 26.20's: 68 kits' records changed, and 8 kits (Alistar,
    Corki, Ekko, Ezreal, Karthus, Kindred, Vayne, Veigar) changed only because a comment or
    assumption text named 16.20. The engine, stat prices and runes didn't change, so the
    shared key is 26.20's.
  - Five plain-stats shards took 36 to 75 minutes and twenty build shards 34 to 76 minutes:
    24.5 runner-hours, or 98 processor-hours. That is 7.2 processor-seconds a plain pairing
    (6.7 estimated) and 18.8 a build pairing (as estimated).
  - The runners took 20 jobs at a time, so five build shards waited 34 to 48 minutes for
    one. The outputs were committed (`1e2f19e`) two hours after the push; with 20 shards in
    all, about 75 minutes would have done, which the plan now does (`planShards`).
  - In the same job, the typecheck passed and the tests failed only on Trundle–Sion (below).
- **Checks.**
  - `npm run build:sim -- --check` and `npm run build:builds -- --check` pass locally, with
    fingerprints `fd1489b1…` (plain stats) and `8f33771f…` (builds).
  - Runners and local machines agree. The 804 plain-stats pairings computed again only for
    the eight text-only changes equal 26.20's exactly, in scores, scenarios and kit variants,
    and so do the 4,656 reused ones. Aphelios–Urgot's build search, run again locally, gives
    the runners' +0.45.
- **What moved with plain stats.** 3,243 of the 9,418 pairings with a changed kit record
  moved (34%): 107 changed winner, and 84 moved by 0.5 or more. None of the other 5,460
  moved.
  - Each champion whose average moved most has a matching change in the patch.
  - Risers: Vel'Koz +0.094 (Organic Deconstruction 35 – 205 (+ 65% AP), was 35 – 180
    (+ 60% AP)), Miss Fortune +0.058 (Bullet Time's waves crit for 145%, was 130%), Sion
    +0.044 (health growth), Darius +0.035 (Decimate's cooldown 4 seconds at rank 5, was 5),
    Nunu +0.028 (Absolute Zero).
  - Fallers: Rammus −0.057 (Defensive Ball Curl's resistances), Jinx −0.051 (610 base
    health, was 630; 3 attack damage a level, was 3.25), Lee Sin −0.049 (Dragon's Rage 550
    at rank 3, was 625), Varus −0.042 (Blighted Quiver's on-hit and maximum-health damage),
    Caitlyn −0.040 (the trap rule).
  - One of the largest moves runs against a buff and tips a near tie. Under 26.20, Orianna beat
    Kassadin in the engage and spacing fights with 0.2% to 3% of her health left
    (Kassadin's score −0.82). Her 26.21 ability power ratios move about 100 gold of her
    budget out of attack speed, health and resistances, mostly into ability power, and
    Kassadin's magic damage now wins those fights first (+0.38).
- **What moved with item builds.** 2,981 of the 9,418 pairings moved (32%): 234 changed
  winner, and 250 moved by 0.5 or more. Ryze rose most (+0.076) and Lee Sin fell most
  (−0.067).
  - Between kits that didn't change, 183 of 5,460 pairings moved and 6 changed winner. 165
    of the 183 hold one of the five changed items (Bastionbreaker, Bloodletter's Curse,
    Dawncore, Gluttonous Greaves, Hubris) in either patch's builds.
  - In the other 18, the search settled on other builds. Those items are the only inputs
    that differ, and the search weighs them among its candidates.
  - Builds move further than plain stats because the search can settle on different builds
    once a kit changes. Xin Zhao's 26.21 build loses to Jayce's at −0.86; his 26.20 build
    would hold the same Jayce build to −0.51. The search's limit, listed below, shows
    whenever a patch moves it.
- **Golden matchups.** Trundle beats Sion (clear) no longer held, leaving 64 of 69
  expectations holding:
  - Trundle wins by +0.18; the expectation needs +0.25, and he won by +0.46 under 26.20.
  - The brawl, which Trundle used to win, ends with both champions dead, and the
    enemy-engage scenario falls from +0.85 to +0.66.
  - Sion's health growth alone accounts for it (95 a level, was 87). With 26.20's 87, the
    26.21 data gives +0.456 again, whichever patch's abilities Sion has. With 95, it gives
    +0.181 either way. His R changes (40% bonus AD on the minimum damage, was 60%; 450 / 900
    / 1350 base maximum, was 400 / 800 / 1200) don't move this matchup.
  - On review the expectation is now slight: the winner holds, and the patch took the
    margin. The simulator report shows 65 of 69 holding again. Only the report's golden
    table and the two matrices' fingerprints changed; every pairing was reused.
- **Suite and app.**
  - The full suite ran 7,987 tests across 226 files on four workers: 7,981 passed, the five
    disputed golden expectations were skipped as before, and Trundle–Sion failed. With its
    margin at slight, the golden suites pass (64 tested, 5 disputed skipped). Both
    TypeScript projects pass.
  - The production build exports 16.21 with both matrices' fingerprints. In Chromium:
    - the picker lists all 173 champions;
    - the matchup pages for Trundle–Sion, Kassadin–Orianna and Xin Zhao–Jayce show the
      stored scores, with builds and with plain stats, without a rerun;
    - Zoe's, Caitlyn's, Varus's and Sion's kit pages show 26.21's rules;
    - the matchup page fits a 390-pixel phone;
    - page, console and HTTP errors are all zero.
- **Assumption texts.** 35 kits from the imported batches had lost the spacing in their
  assumption texts, which the kit pages list. Two examples: "for216magic and1.75second stun
  at level20" and "doesnot resetEcooldown".
  - The fix follows `571b782`'s. It restores spaces, leading zeros (.5 is 0.5), hyphens
    before a noun ("a 1.75-second stun") and spaces in sums ("255 + 2.5% own max HP").
  - It splits run-together words from a reviewed table: 336 splits, found with an English
    word list. Names, game-file fields (`lineWidth`, `ZoneDuration`) and ability keys
    ("W2/E2", "Q1/W2/E4/R8") stay as written. Twisted Fate's and Viktor's option labels get
    the same.
  - With whitespace and hyphens removed, every compiled text keeps its characters (bar
    inserted zeros), so no number or claim changed.
  - Compiled against 16.21, each kit's fight spec is identical to before, with every
    function's source, its variants and its option defaults.
  - A kit's key hashes its module, so the refresh workflow's
    [run 41613091138](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/41613091138)
    computed the 5,425 pairings in each matrix that involve those kits again.
  - The plan sized both matrices together for the first time: 3 plain-stats shards and 7
    build shards, all running at once.
    - The plain-stats shards took 51 to 69 minutes and the build shards 38 to 86.
    - That is 10.4 runner-hours, about 7.7 processor-seconds a plain pairing and 19.6 a build
      pairing.
    - The outputs were committed (`80926e4`) 1 hour 27 minutes after the push.
  - Every result came out identical: scores, scenarios, kit variants, stat spending and
    builds.
  - Only the 35 kit pages' assumption lists, the kits' input keys, the fingerprints and the
    build report's line on the refresh changed.
  - Both matrices pass `--check`, with fingerprints `788b7364…` (plain stats) and
    `98e3750f…` (builds).
  - The full suite passes: 7,988 tests across 226 files, with the five disputed golden
    expectations skipped, on four workers in 327 seconds. The run's own test job passed as
    well.

## Rune catalog and page structure (4 November 2026)

The rune foundation contains 62 runes across five paths and seven stat shards,
with layout from versioned Data Dragon 16.21.1 and CommunityDragon 16.21 sources.
All 62 wiki rune templates and the Rune rules article are retained in full,
with revision IDs, timestamps and content hashes. The deterministic offline build
checks source-file hashes, versioned URLs, cross-source rune IDs, paths and rows.
Its check mode rejects stale catalog/report output without writing either file.

The page validator checks one primary selection in each of four rows, two
secondary lesser runes in different rows of an allowed second path, and one shard
per slot. Reusing the same shard across two eligible rows is valid. Validation
is structural only: it does not apply the rules article's champion-specific
substitutions or equip a rune in a fight.

Original client markup, unresolved placeholders and wiki formulas remain intact.
The sources disagree on the scaling-health shard: the rules article specifies
10 health per level through level 20 (200), while the client says 10–180.
Neither description is silently converted into a combat bonus by this catalog.
Each new rune remains explicitly unimplemented; Triple Tonic's status means only
its existing Udyr-specific behavior. Numeric effects, timing, history-dependent
stacks, rune-page search and UI selections require later implementation and tests.

The legacy combat `runes.json`, champion kits, engine runtime and both committed
matchup matrices are unchanged by this foundation. The [rune audit](docs/runes/README.md)
provides commands, provenance details and the next implementation steps.

## Stat shards in manual duels (5 November 2026)

All seven stat-shard types can be selected explicitly for either side of a
manual duel. Their numeric rules and stacking semantics are read from six complete
pinned revisions, whose content hashes and exact formula excerpts are checked
before use. The existing catalog's Rune article is bound to the same raw revision.

Shard bonuses are applied once before the kit's initialization. They do not
replace innate health/AD start effects, and existing stat conversions see them.
Permanent movement, tenacity and slow-resist statuses have their own keys and
survive protected death. Forms and branched worlds retain independent state.

Adaptive shards compare raw purchased bonus AD with purchased AP, excluding
champion passive stats. Equal purchases use the champion's adaptive type; all
adaptive shards share the choice before any is added. Item passive eligibility
has several source-specific exceptions, so adaptive shards with item builds are
rejected in this batch. Nonadaptive shards work with fixed items. Shards with
build search are rejected until its valuation accounts for them.

The initial shard batch rejected Kai'Sa's adaptive and attack-speed shards to
avoid false evolution unlocks. The follow-up below replaces that restriction
with explicit rune-origin accounting.

The plain-stat allocation remains its no-shard reference; actual fights and
kit-variant comparisons include the selected shards. This is an explicit
allocation approximation, not a shard-aware optimal allocation. Scaling health
follows the wiki's level-20 formula (200 per selection) while retaining the client
180-endpoint discrepancy. Tenacity follows the existing newer Courage-specific
exception rather than silently changing the simulator's grouping model.

Default simulation workers, legacy rune data and both precomputed matchup
matrices are unchanged. The manual CLI and its explicit flags use the new code;
full rune-page effects, shard controls in the browser and rune-page search remain
future work. Numeric reads, duplicate/unknown selections, source drift, adaptive
choices, fixed items, crowd control, slow resistance, Ornn/Jhin, forms, branch
isolation and protected death have targeted regression tests.

Spacing applicability still uses base movement speed. The movement-speed shard
affects actual movement in fights but does not make a previously inapplicable
spacing scenario qualify. The CLI prints this inherited scorer limitation along
with the allocation approximation.

## Kai'Sa shard evolution eligibility (5 November 2026)

Kai'Sa's current passive source (revision 4089050) restricts Living Weapon to
permanent stats from items and stat growth. Rune AD, AP and attack speed now
retain separate scalar origin records in each unit's memory. Her Q/W/E
qualification checks subtract exactly those contributions from the bonus pool.
Combat damage, Plasma scaling and Supercharge charge timing continue to use all
combat stats. Existing purchased-stat thresholds and growth contributions are
retained. The source's adaptive-force item exclusion and the current limitation
for item-passive stats outside the direct bonus pool remain explicit.

All seven shard types can therefore be selected for Kai'Sa in plain-stat manual
duels; nonadaptive shards can also accompany fixed item builds. Adaptive shards
with items and all shards with build search still reject until those modes have
complete source eligibility and valuation. Default workers select no shards.

The origin amounts initialize once before kit setup, remain private to each
world, and survive branch cloning, form changes and protected death through the
existing unit-memory contract. Budget reference worlds disable initialization,
so their no-shard allocation and qualifying stat pool remain unchanged.

## Remaining limits

- Every one of the 173 champions has a kit, so every pairing is a simulated duel; the
  interaction ledger's heuristic estimates sit beside the duels, not in their place.
- Item builds come from a search, not an exhaustive one. In a lopsided matchup the losing
  side's listed build is close to arbitrary, since its build barely moves the result; and
  the builds hold at the default fight settings only, since the browser can't search them.
  A change to either kit, or to any item the search weighs, can make it settle on other
  builds, so the build matrix moves more than plain stats from one patch to the next.
- Duels have no summoner spells, and in the six-item format no boots, so a melee kit
  without a gap-closer as long as the enemy's range can be kept out of reach by a ranged
  champion's basic attacks (Annie with a critical strike build beats Darius).
- Movement is one-dimensional. Facing, side-stepping, vitals, terrain placement,
  pet placement, and some multi-hit geometry still use explicit approximations.
- Skillshot branching has a finite limit; minor hits and further branches use expected
  effects. Those approximations are most consequential around death, shields, and CC.
- Behaviors are programmed policies with a reaction-time model, rather than an
  exhaustive search over every possible action sequence.
- The stat budget values stats at the start of a fight. Buffs a kit gains during the
  fight, such as Last Breath's armor ignorance, are invisible to it unless the kit
  hints them, so the other side can buy stats the buff later ignores.
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
  effects still apply once.
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
  Against a feared enemy walking away, Hecarim's attacks often start at the edge of
  range and are cancelled when it walks out: the shared chase policy doesn't close in
  first. Rampage's 60% against minions follows each summon's wiki targeting class, so an
  unclassified summon takes its full damage.
