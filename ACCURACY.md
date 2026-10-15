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

## Remaining limits

- Only 61 of the dataset's 173 champions have simulator kits. Other pairings use the
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
