# Next-wave source audit: Vladimir, Cassiopeia, Karthus

Prepared 14 October 2026 from the committed dataset `16.20` (game patch `26.20`, Data Dragon `16.20.1`) and the current 61-kit workspace engine. This is a read-only implementation blueprint. None of these three champions has been implemented or registered by this audit. No checkout files were changed or tests run. All sources below are local committed ability records, champion records, profiles, glossary and rules; no current live wiki text has been substituted for the pinned revisions.

## Source and stat contract

The authoritative numeric records are `data/16.20/abilities/{Vladimir,Cassiopeia,Karthus}.json`, with each page title `Template:Data <Champion>/<Ability>`. Every revision below also appears in `data/16.20/wiki-revisions.json`. `profiles/*.json` helps corroborate targeting and glossary evidence but loses some mechanics and numeric notes, so it must not replace the complete ability records. None of the three has an owned-pet record in `data/16.20/pets/`; enemy pets are still relevant to area hits and Lay Waste isolation.

| Champion | Passive revision | Q revision | W revision | E revision | R revision |
|---|---:|---:|---:|---:|---:|
| Vladimir | Crimson Pact 4073468 | Transfusion 3997094 | Sanguine Pool 4034923 | Tides of Blood 3853799 | Hemoplague 4039794 |
| Cassiopeia | Serpentine Grace 4060357 | Noxious Blast 4060358 | Miasma 3936292 | Twin Fang 4064399 | Petrifying Gaze 4060360 |
| Karthus | Death Defied 3985387 | Lay Waste 4011136 | Wall of Pain 3990033 | Defile 4006733 | Requiem 4015394 |

Relevant glossary page revisions: Untargetability 3965000; Channel 4002276; Cast time 4050299; Range 4058499; Movement speed 4064468; Damage modifier 4050138; Healing 4041638; Spell shield 3981674; Types of Crowd Control/Summary 4035704; Tenacity 4021927; Template:Rounded up to next game tick 4060754. Plain-stat prices are from Module:Gold value/data revision 4060632 (`rules.json`). Item, rune, minion, structure, fountain and vision-map cases remain outside this simulator unless explicitly added.

All standard abilities use maximum ranks Q/W/E 5, R 3. `engine/stats.ts` applies growth factor 19.665 at level 20, not 19. The following values are base statistics only, before passive conversion or the 15,000 gold allocation.

| Stat | Vladimir | Cassiopeia | Karthus |
|---|---:|---:|---:|
| Health | 2763.15 | 2537.17 | 2783.15 |
| Health regen /5 s | 18.799 | 15.3325 | 17.31575 |
| Resource | 2 Crimson Rush display units | 1236.6 mana | 1076.615 mana |
| Resource regen /5 s | 0 | 23.732 | 23.732 |
| Armor | 112.4925 | 110.4255 | 113.4255 |
| Magic resistance | 55.5645 | 57.5645 | 55.5645 |
| Attack damage | 113.995 | 111.995 | 109.91125 |
| Attack speed /s | 0.916791396999 | 0.837848829360 | 0.884332187500 |
| Bonus AS from levels | 39.33% | 29.4975% | 41.49315% |
| Attack windup, s | 0.215281722776 | 0.229158280671 | 0.388711396140 |
| Attack range, edge to edge | 450 | 550 | 450 |
| Attack missile speed | 1600 | 1500 | 1500 |
| Movement speed | 330 | 335 | 335 |
| Gameplay/pathing radius | 65 / 35 | 65 / 35 | 65 / 35 |

All three basic attacks are ranged physical projectile attacks; crit-damage modifier 1. Sources: `champions.json` forms and `profiles/*.json` opening attacks. The champion-page revision itself is not present as a Vladimir/Cassiopeia/Karthus key in `wiki-revisions.json`; do not invent one. Ability records carry the exact revisions needed for the kit contract.

Use `KitContext.ability`, `.field`, `.formula`, `.levelValue`, `.quote/.quoted`, `.flag` while building only, before `kit.seal()`. Never read these in combat hooks. The per-level values noted below are explicitly present through level 20; they must not be clamped to level 18. Sources with disagreement require an explicit assumption and an open verification item.

## Vladimir

### Max-rank numbers and clocks

| Ability | Cooldown / cost / cast | Geometry | Damage, sustain or state |
|---|---|---|---|
| I Crimson Pact | Passive | Self | AP += 3.333% external bonus HP; bonus HP += 160% external AP. Each conversion excludes the other conversion's output. |
| Q Transfusion | 4.6 s; no mana/health cost; 0.25 s cast | Targeted, center range 600; non-projectile; spell shield yes | Normal magic `160 + .60 AP`; normal heal `40 + .35 AP`. Empowered magic `296 + 1.11 AP`; additional heal at level 20 `220 + (.05 + .0004 AP) * missingHP`, in addition to normal heal. |
| W Sanguine Pool | 16 s; 15% **current** HP at activation; instant | Moving self pool radius 350; untargetable/ghosted 2 s | Four ticks at 0, .5, 1, 1.5 s: each magic `75 + .0375 bonusHP`; total `300 + .15 bonusHP`. Heal 30% of each pre-mitigation packet. 40% slow only while in pool. +37.5% bonus MS decays exponentially over 1 s. |
| E Tides of Blood | 5 s starting on cast; staged 2/4/6/8% **max** HP spent by elapsed 0/.25/.5/.75 s; instant declaration, charge up to 1.5 s | 15 equally spaced blood bolts; each range 600, width 120, speed 4000; first enemy per bolt; each enemy damaged once | At zero charge magic `90 + .015 maxHP + .35 AP`; at 1 s charge magic `180 + .06 maxHP + .80 AP`; interpolate damage through first second. At >=1 s, target slow 60% for .5 s. Caster slowed 20% only after first second until release. |
| R Hemoplague | 120 s; no cost; instant | Location center range 625, radius 375; non-projectile; special spell shield | Infection 4 s, +10% incoming non-true damage; burst magic `350 + .70 AP`, amplified by its own mark to `385 + .77 AP`. Heal `350 + .70 AP` for the one infected champion after an additional .4 s. |

Crimson Pact main quote: “These two bonuses do not stack with each other.” Store external AP/HP before conversion rather than iterating the conversion into itself. The coefficient is 3.333% exactly as pinned, not silently 1/30. Innate note: “Crimson Pact only affects Vladimir's maximum health and will not increase Vladimir's current health”. Losing bonus HP can cap current HP down. Ordinary `stat:health` currently heals the increase and is therefore unsuitable for dynamic conversion. Initial world creation does reset HP to the requested fraction of derived max HP after `onStart`; that correctly allows initial full-health setup without licensing mid-fight healing from stat fluctuations. Deathcap/Riftmaker loops are item-specific notes and outside the plain-stat model.

Transfusion main/note source details (3997094):

- “He then generates 1 point of Crimson Rush over the cooldown.” White first stage and one completed stack have no timeout; orange generates the second; on reaching two points, red surge depletes over 2.5 s.
- Level-band +MS is 10/20/30/40% at levels 1/6/11/16, so level 20 is 40%, decaying over .5 s.
- “Crimson Rush depletes 75% slower during Sanguine Pool, Tides of Blood, or stasis.” This is a quarter-speed depletion clock, not merely pausing it or extending by a fixed duration. Resurrection explicitly depletes normally.
- “Casting Transfusion during the surge consumes all Crimson Rush”. Need determine whether surge entitlement snapshots at declaration or completion if the 2.5 s window expires during the .25 s cast; source wording alone does not conclusively settle it.
- Additional heal level series is 30, 40, ..., 220, explicitly `past18:wiki`; the tooltip's 30–200 describes ordinary level 18. Do not use 200 at level 20. Only the additional surge heal is reduced to 35% against minions; normal Q healing is not described as receiving that reduction.
- Healing is immediate at cast completion, despite its visual projectile.
- “Vladimir can cast Sanguine Pool and Hemoplague during Transfusion's cast time.” Both are instant overlays; an offensive behavior must also actually consider them while Q is casting.
- “Transfusion's cast is special cased to not be cancelled if the target becomes untargetable, dies, or is too far away or no longer in sight during the cast time.” Untargetable at completion means no target damage, **but still healing**. A plain `cancelOnInvalidTarget:false` is insufficient because `combat.dropTargeting` unconditionally clears every targeted cast when the target acquires untargetability/invisibility.
- Spell-shield flag is true, but the pinned text does not explicitly establish whether normal/empowered healing survives a spell shield. Do not infer that from the separate untargetability exception without a stated assumption or further pinned evidence.

Sanguine Pool details (4034923): no extra CC immunity is stated; existing attached poison/delayed damage can still harm an untargetable unit. It cannot attack or cast other abilities while pooled, but may move and may recast an already charging E. While following attack commands, its attack range is reduced to 0. Source note: “The first tick damages immediately so the final one occurs 0.5 seconds before Vladimir becomes targetable again.” There is also a zero-damage tick at the end for spell effects/turret aggro; `dealDamage` discards raw <=0, so exact zero-damage proc support is absent. At most record this unsupported interaction while items/turrets are absent. “The slow ends immediately once affected enemies get out of range.” A .25 s field refresh with a lingering slow is observably different. Heal is 30% **pre-mitigation** raw, with tooltip “Damage calculated before modifiers”; do not use standard lifesteal or `mitigated` damage (which includes shield damage). Minion reduction is 18%, irrelevant to current champion-only duel targets but document if pets are treated as minions. The exponential MS decay's rate/curve is not specified numerically in this snapshot.

Tides of Blood details (3853799): recast within up to 1.5 s, automatic release at end **or if interrupted**. This differs from ordinary channels, whose CC interrupt simply deletes the action and never delivers completion damage. Health cost threshold: “If Vladimir is below 12% of his maximum health, Tides of Blood will not cost any health.” Note checks this for each cost tick; a tick can take him below 12%, later ticks then stop. Exact equality at 12% is not “below”. Cost field is cumulative 2/4/6/8% at four quoted elapsed points, so subtract 2% per stage rather than 2+4+6+8%. There are 15 real bolts despite HUD showing 11; interception counts and multi-bolt single-damage restriction matter against enemy pets. A single target-directed bolt is a declared 1D assumption, not a complete nova implementation. Source says damage increases with charge time; exact interpolation curve is unpinned. Snapshot ends with “The following table refers for interactions while Vladimir is channeling:” but does **not** preserve that table, so E's detailed action/CC overlay rules cannot be reconstructed from memory and claimed sourced.

Hemoplague details (4039794): all-source damage amplification including monsters, excludes true damage, multiplicative with most modifiers, includes its own burst. Note: “Hemoplague's modifier to incoming damage stacks additively with Unbreakable Will for a total damage reduction of 45 / 55 / 65%.” Generic negative damageReduction multiplied with Alistar reduction would violate this exception. “Spell shield does not negate the detonation.” Distinguish shield on application (flags `special`) from a new spell shield present only at the delayed burst. Generic `delayed` raw effects bypass a late spell shield but also bypass late untargetability/parry packet guards; burst resolution must explicitly respect the intended target states. Source does not settle heal eligibility if the infected champion died before burst, or detonation becomes untargetable, so flag rather than invent. Standard 1v1 first-champion heal is unreduced; .4 s healing delay must remain even if damage packet is blocked.

### Engine work needed before honest coverage

1. Opt-in targeted-cast survival exception for Q across `dropTargeting`/completion, preserving normal cancellation elsewhere. Heal completion independently from target damage.
2. Non-healing dynamic maximum-HP conversion and cross-stat budget valuation for Crimson Pact. Replacing status arrays is needed to invalidate `derive`'s cache when conversion changes.
3. Charging E releases on interrupt and pays staged health independently of the normal one-time `cost`. Existing `ChannelSpec` has no interrupt callback. E recast may overlay W while other casts remain forbidden during W.
4. Pool movement and action restrictions: `noAttacks` exists; there is no generic self state “no abilities except E recast”. Ability `usable` checks or a narrowly scoped action-state policy are required. Pool slow/contact and immediate first pulse need explicit timing.
5. Incoming non-true damage amplification with self-burst retention and the named Alistar exception, plus correct shield/delayed-heal behavior.
6. Radial E bolts and pet interception are not represented by one ordinary line delivery. They either need scoped projectile creation/geometry or a visible one-axis approximation.

### Required regression cases and behavior/budget notes

Test passive AP/HP conversion separately and together, no recursion, source coefficient 3.333%, full-health opening, AP gain/loss mid-fight with unchanged current HP except cap. Test normal Q and empowered Q at level 20; independent normal+additional heals with missing HP, Grievous Wounds, full HP, surge .25-speed clocks in W/E/stasis, normal clock in resurrection, stack generation/cooldown haste, expiry/declaration boundary. Test Q completion against target disappearance, death, range exit, sight loss, spell shield and parry individually. Test W/R overlay during Q without moving Q's completion, and denied Q/R/new E while pooled except recast of pre-existing E.

Test W health cost as current HP (not max), four exact packets plus explicit zero proc policy, raw heal independent of enemy MR/shields/mitigation, target leaves/re-enters pool, slow removal immediately on exit, ordinary incoming DOT during untargetability, no attacks while pooled, both movement directions and decaying MS.

Test E cost stages/cumulative totals, health crossing 12% on first cost and equality, damage ratios at 0/.25/.75/1/1.5 s, no extra damage after 1 s, release on each relevant channel-interrupt CC, .5 s slow only fully charged, self slow after 1 s, automatic maximum release, W during charge then recast, projectile wall, pet interception and duplicate bolt suppression. Unpinned action table/curve cases need explicit assumptions rather than tests invented as game truth.

Test R non-true amplification/true exclusion/its own burst, exactly 4 s plus .4 s clocks, spell shield at application versus only at burst, stasis/untargetability before burst, target death, named Alistar interaction if/when Alistar is implemented.

Default AI needs a real combo policy: R before damaging Q/E; charged E while approaching, W as timed defense, E release during W, Q surge readiness. Generic `defaultBehavior` permits instant overlays mainly via `react`; it will not necessarily cast R as an offensive overlay during Q. It also treats channels as busy and will not choose a charge release intelligently. No preloaded Crimson Rush without an explicit scenario assumption. Budget must value one empowered Q in a three-cast cycle rather than strongest alternative every 4.6 s; account for Q normal healing plus missing-HP surge heal at a declared reference HP, W/E self health costs, both passive cross-stat gains, and sustained E full-charge damage. Existing `BudgetHints.statMultipliers` only multiplies each purchased stat independently, so it cannot express AP->HP and HP->AP accurately by itself.

## Cassiopeia

### Max-rank numbers and clocks

| Ability | Cooldown / cost / cast | Geometry | Damage, sustain or state |
|---|---|---|---|
| I Serpentine Grace | Passive | Self | All movement-speed bonuses 39.6470588235294% more effective at level 20. No flat level MS or no-boots rule in this pinned passive. |
| Q Noxious Blast | 3.5 s; 70 mana; .25 s | Location range 850, radius 200, .4 s post-cast delay; non-projectile indicated by no affirmative projectile flag | Poison 3 s nominal, seven ticks spaced 3/7 s, total magic `205 + .75 AP`. On champion hit +50% bonus MS decays over 3 s, amplified by I to +69.8235294117647% initially. |
| W Miasma | 16 s; 90 mana; .25 s | Seven venom bolts in an arc, target location range 700, cloud radius 200, speed 3000; clouds 5 s; projectile true, spell shield false | 19 actual packets each `10 + .025 AP`, nominal interval 5/19 = .263157894736842 s. Actual total `190 + .475 AP` (not tooltip `200 + .50 AP`). Sticky ground and initial 80% slow decaying over **area** duration. |
| E Twin Fang | .75 s; 45 mana; .125 s | Targeted center range 700, missile 2500; projectile/SS true | Level-20 ordinary magic `128.235294117647 + .20 AP`; poisoned target adds `120 + .45 AP`, for `248.235294117647 + .65 AP`. Poisoned-target heal `.16 AP`, no flat heal. Kill refunds mana cost. |
| R Petrifying Gaze | 80 s; 100 mana; .5 s | Directional cone reach 850, angle 80 degrees; non-projectile, SS true | Magic `325 + .75 AP`; facing her: stun 2 s; otherwise slow 40% for 2 s. |

Serpentine Grace 4060357 is a **26.20 changed passive**: “increases the effectiveness of all movement speed bonuses by 5 – 36 (based on level)%.” Series explicitly extends beyond 18 to 39.6470588235294 at level 20 (`past18:wiki`). The current committed champion base MS is 335. Do not import historical flat level-MS bonuses, 328 base MS, or inability to buy boots. Boot shopping does not exist in this plain-stat simulator anyway. All bonus sources, including external buffs such as Annie E, need amplification, not only Q. `derived.ts` adds all movement-speed statuses normally, without an effectiveness multiplier hook. Amplify flat and percentage **bonuses** before soft caps; do not amplify base MS or slow debuffs. Whether negative MS stat changes are a “bonus” is not clarified by the passive text.

Noxious Blast 4060358 details:

- Main says poison 3 s with .428571 s interval and seven packets. Notes say actual poisoning “something between 3.2 and 3.3 seconds.” Keep damage pulse span and poison eligibility lifetime separate; do not claim exact 3.2, 3.25 or 3.3 s is sourced.
- Exact rounding note: damage/7 with cumulative rounded-down increments. For total T, a reasonable sourced model is `floor(n*T/7) - floor((n-1)*T/7)`, n=1..7, subject to the noted special AP bugs. The example uses obsolete 75 base / 90% AP values; use its algorithm, not its historical numbers. Current base is 205 / .75 AP.
- Notes mention 1 less damage at exactly 20 or 40 bonus AP but do not give reproducible complete conditions. This is unresolved, not permission to subtract one universally.
- Existing generic DOT quantizes each interval upward to 13 ticks, so seven packets land at ticks 13,26,...91 (3.033 s) and always have fractional equal damage. A duration-based exact pulse schedule plus rounding is needed if claiming the pinned packet math; an equal fractional DOT is a visible approximation.
- Source does not specify the exact first DOT pulse offset, the MS decay function, poison refresh tick rules or whether Q's on-hit MS survives a spell shield. Distinguish uncertainties from grounded values.

Miasma 3936292 details:

- Main seven bolts in an arc are separate projectile portions. Note: “Wind Wall will block the portion of Miasma it destroys.” One monolithic arriving field canceled by one wall overstates partial interception; one circle with `speed` is not a seven-cloud arc.
- Note corrects tooltip DPS to 19 ticks each `10 + .025 AP`, actual total `190 + .475 AP`. Sometimes randomly only 18 packets occur; deterministic 19-packet policy needs an assumption rather than invented randomness. Use notes instead of multiplying nominal DPS *5.
- Sticky debuffs: “not removed by most cleanses”, but cleanses also granting immunity such as Ragnarok can remove them. Existing `cc sticky:true` and `cleanse sticky:true` can express this.
- Slow decays by field age, not duration of each unit's contact or time since its first poisoning. Decay endpoint/function is not pinned; unlike Karthus W, no reduced-slow label is present. Do not assume an 80->40% decay endpoint from memory.
- “If a target becomes untargetable while affected by the ground, the debuff will refresh to 0.25 seconds.” Generic `abilityHit` rejects the target completely while untargetable, so it cannot do that refresh. Track existing contact state separately; `.25` is 8 ticks at 30 Hz. Duration/refresh of poison and slow outside clouds is not explicitly provided.
- At 30 Hz, a repeated ceil(.263157...*30)=8-tick schedule yields 18 full intervals inside 150 ticks, while the note fixes 19 packets. Preserve absolute pulse schedule/count instead of independently rounding each interval. First-pulse offset remains to verify.

Twin Fang 4064399 details:

- Own **Q/W poison**, and poison from other champions when relevant, qualify. Pinned ability says “poisoned target” without enumerating source champions. Current Teemo E and Singed Q exist but carry ordinary DOT status keys, not a normalized poison tag; distinguish poison from Brand burn/Darius bleed/Morgana Tormented Shadow. In a duel the opponent cannot self-poison itself, but future allies/multi-unit modes can make the tag important. Enemy pets poisoned by Cassiopeia are relevant if she is allowed to target them.
- Level-20 series contains two slightly inconsistent representations: main normal-damage level series `128.235294117647` (`past18:wiki`); `Total Enhanced Damage` label base gives `128.234` (`past18:game files`) and an unsupported `other:` rank bonus. Read normal levelValue plus the separately parsed `Bonus Magic Damage` rather than blindly `formula('Total Enhanced Damage')`, which fails `KitContext.statRef` for `other:`. State the 0.001294117647 level-20 source disagreement.
- “Upon reaching the target, Twin Fang will wait for an ongoing Noxious Blast to explode before dealing its damage.” This is **impact-state poison checking with pending Q coordination**, not enhanced damage snapshotted at E cast. Need clarify whether any pending Q or only a Q threatening this target; the note does not quantify the hold radius or timeout.
- Heal is AP-only `.16 AP`, reduced to `.04 AP` against listed minion/small-medium monster classes. No old flat base heal.
- Kill cost refund and poisoned heal depend on the connected hit; shield/wall/untargetability must not trigger them. Damage absorbed by normal shields is still a hit; a spell shield negates the spell. Exact kill-attribution/post-death-form interaction requires a kill event policy (see shared gaps).
- Target becomes untargetable/dead/out of range/unseen **during cast**: cancel with no cost/CD. `cancelOnInvalidTarget:true` already covers completion validation; untargetability dropTargeting covers early cancellation. Missile tracking is ordinary homing, so target state can change after cast but before impact.
- Range is 700 center-to-center. “Displayed range, 765, is slightly larger than the real range” and its cast-indicator note explicitly warn against adding caster radius. E is not an edge-range targeted attack.

Petrifying Gaze 4060360 details:

- “This ability will cast from wherever the caster is at the end of the cast time.” Do not set `castOrigin:'start'`.
- Caster turns toward target direction through .5 s cast; target direction changes if caster facing changes during cast, including knockbacks. Visual effect can disagree.
- Facing condition is relative to the caster's facing, a general 180-degree arc; it is not merely comparing displacement direction to current enemy location. Champions whose animation spins or locks facing use movement direction, or initial facing if spinning in place. Current `Unit` has only `move/moved` relative to the opponent, no persistent absolute facing. `Tryndamere` already exposes a simpler facing assumption; it is not an accurate general implementation for this ultimate.
- Last note literally says “R is an exception ...”; champion name/reference has been lost by extraction. Treat that exception as unresolved, not guess a champion.
- No cone delivery exists; ordinary line or one-direction area can model only the axis intersection. Need explicit cone/facing policy, with geometry and branch decisions preserving direction changes during cast rather than always retargeting to the enemy at completion.

### Required regressions and behavior/budget notes

Passive: current level-20 coefficient, base MS unchanged, own Q percent buff, external flat and percent buffs, slow unaffected, soft caps applied after amplification, bonus replacement/cache invalidation. Q: range/radius/delay, seven exact pulse totals and integer distribution, refreshed poison/timer boundary, spell shield, no wall block for non-projectile blast, MS only champion-hit, decaying bonus. Add declared expectation for uncertain poison lifetime/AP bugs rather than treating arbitrary values as facts.

W: 19 packets summing `190+.475AP`, real absolute cadence, late arrival after travel 700/3000, 5 s lifetime from arrival, target exits/re-enters late and receives aged slow, no duplicate overlap damage from seven clouds, sticky cleanses versus Ragnarok immunity, grounded movement skills, already active dashes, .25 s ground refresh on untargetability, projectile-wall partial cloud removal. The arc, pulse onset and slow endpoint must be sourced or explicitly bounded assumptions.

E: normal/enhanced level-20 arithmetic and `.16AP` healing, poison expiring between cast and impact, poison applying after cast before impact, hold until Q explosion, new spell shield/wall during flight, no heal on shielded spell but heal on ordinary damage shield, no-cost cancellation during cast, true 700 range, mana refund exactly once on normal death and stated post-death form policy. No “all DOTs are poison” shortcut.

R: .5 s completion position, caster displaced or crosses target, initial direction retained/updated according to actual facing, target walking toward/away then stops, target attack/cast turns, spin/locked animations, facing vs back-facing effects, outer reach/cone boundary, stun tenacity, slow immunity (damage survives), spell shield (entire packet blocked), Black Shield (damage but protected CC even if shield breaks), parry and untargetability.

AI needs Q/W to establish poison then repeat E; hold E briefly for a pending Q using the source rule, but avoid unpoisoned mana exhaustion as the default. It must retain range 700 center for E and kite, choose W to prevent enemy engage, and use R against actually facing targets/telegraphed approach rather than grant every R a stun. Generic spell ranking prefers CC before damage, so blindly registering R/W/Q/E can cause poor combos. Declare bounded thresholds and validate real duels, including all source-supported casts actually used. Budget must price poisoned E uptime honestly; a strongest alternate E for every .75 s without poison uptime is optimistic. Typical enhanced-E DPS depends on cast time, haste and mana; regen is ~4.7464 mana/s versus 45/.75 =60 mana/s before haste, so resource exhaustion matters. Q rounded damage and W corrected 19-packet total must match allocator formulas; healing from E must use AP-only and a stated poison uptime.

## Karthus

### Max-rank numbers and clocks

| Ability | Cooldown / cost / cast | Geometry | Damage, sustain or state |
|---|---|---|---|
| I Death Defied | Fatal damage once, 7 s zombie | Anchored at death position | Set HP to 1; untargetable, immune CC and all incoming damage; no walking/basic attacks/items/summoners. Abilities cost zero; E remains on. R disabled after 4 s. HP regen may occur but final death mandatory. |
| Q Lay Waste | 1 s; 40 mana; .25 s | Location range 875, radius 160; detonation .528–.759 s after cast (variable/inconsistent source) | Multi-target magic `116 + .35 AP`; exactly one struck unit `232 + .70 AP`. Spell shield true. |
| W Wall of Pain | 15 s; 70 mana; .25 s | Location range 1000; perpendicular wall length 1200, lifetime 5 s | On contact once per cast: 25% total MR reduction and 80% slow initially, decaying to 40%, both debuff duration 5 s. Spell shield false. |
| E Defile | Static toggle lockout .5 s; 78 mana/s; instant | Self aura radius 550 | Magic per packet `.25 s`: `27.5 + .05 AP` (DPS `110 + .20 AP`), dynamic AP every packet. Toggle-off adds final packet; OOM auto-off. Kill passive restores 50 mana. |
| R Requiem | 160 s starting on cast; 100 mana; .25 s cast then 3 s normal channel | All targetable enemy champions globally, also clones; not an ordinary area-on-all-pets | Magic `500 + .70 AP`, spell shield true at completion, targetability checked at completion; damage only if channel completes. |

Death Defied 3985387 details:

- Main: “Upon taking fatal damage ... zombie state for 7 seconds ... cast his abilities at no cost”. “Requiem becomes disabled after 4 seconds of the duration have elapsed.” Four seconds marks remaining three seconds to channel, but R also has a separate .25 s cast field. Whether the cutoff allows a cast exactly at 4 s, and whether .25 s is included in the 3 s channel in game, need reconciliation before boundary claims. Existing engine normally adds castTime + channel.duration.
- Source: “Death Defied's untargetability does not destroy in-flight projectiles”, corroborated by Untargetability glossary entry revision 3965000. Generic `state:'untargetable'` destroys homing missiles immediately through `dropTargeting`. A scoped retention flag/manual state path is required. Retained missiles still resolve against an invulnerable/untargetable zombie without damage; new targeted spells/attacks cannot start.
- At start HP becomes 1. Health can regenerate but “will always die at the end of it”. Use an unconditional final-death transition, not normal lethal damage that invulnerability would negate or minimum-health effects would preserve.
- Untargetability is not sufficient by itself to prevent existing DOT/delayed damage; explicit invulnerability is required, and explicit CC immunity for directly applied CC. NoMovement and NoAttacks states already exist.
- The initial fatal event already counts as death for outcome/takedown accounting. `Unit.fallen`/Sion offers a one-time post-death pattern; if zombie later kills the opposing champion the result must be both died, rather than a surviving-Karthus win. Merely setting 1 HP without fallen incorrectly reports survival.
- Incoming fatal-hit action cleanup, existing statuses/CC, pending cast/channel behavior on death and revival priority are not explicitly described in the pinned passive. Do not automatically copy Sion's .264 s drain/reanimation, cleanse every debuff, preserve R, or invent a resurrection priority. Defile source does explicitly auto-off on entering resurrection.
- Corpse retains unit collision after final death; simulator ends when a unit finally dies, so this is currently outside subsequent movement. Mana bar draining is display for remaining zombie time; it must not be treated as actual gameplay mana consumption or restrict zero-cost spells.

Lay Waste 4011136 details: delay between cast and detonation is inconsistent but matches VFX, and Defile ticks beyond the first have similar issues. The interval .528–.759 is given without a distribution; do not invent uniform probability, a random seed or a precise mean as game truth. Need a declared deterministic delay (or bounded scenario sensitivity) plus clarify whether measured from cast start or completion: “conjures ... detonates after” and note “delay between the cast and the detonation” do not settle the .25 s composition. It grants area sight, omitted by current map-vision model. “Applies spell damage if it hits a single target and area damage if it hits multiple targets.” Count enemy pets/clones/minions hit by the same blast when determining isolation; champion-only 1v1 is not always isolated because existing Annie/Heimerdinger/Yorick/Illaoi/Gangplank can add hit units. Define whether an untargetable, invulnerable or spell-shielded overlapped unit counts as “struck”; source does not specify those distinctions. Hit-point pets ignore most area spell damage, but may still count for isolation depending on actual game hit classification; unresolved.

Wall of Pain 3990033: not projectile, no spell-shield blocking, no health damage and no physical collision barrier. Its 1200 length is lateral to Karthus facing; on a one-axis world it becomes a crossing at x, not a 1200-long segment along x. Wall thickness/collision radius is missing. Contact once per cast, not repeated MR debuff refresh whenever inside field. A unit touching just before wall expires still receives full 5 s debuff. Slow initial 80%, reduced 40%; exact decay shape must be stated (not sourced as linear by the labels alone). MR reduction is generic `mrReductionPercent:.25` for 5 s, applied before percentage/flat penetration. Two walls are different sources with contact histories; recontact same wall must not reapply. Current `field` only pulses and has no permanent per-cast hit set; memory keyed by stable zone ID or world-owned bookkeeping needed. Wall sight around pillars/center is outside map-vision model.

Defile 4006733: “restores mana whenever he kills an enemy”, not only a champion; notes extend to enemy structures. Only enemy champions/pets currently exist; pet deaths have `onPetDeath` for the **owner**, not a general killer event. Restore once per true kill, not each damage tick or on disappearance/expiry of a pet. Dynamic AP recomputed each tick without re-toggle; generic DOT snapshots AP and therefore is unsuitable. Toggle off immediately adds a packet and OOM auto-off; lack of payment should not silently truncate without that final packet. Whether the immediate first aura packet occurs on toggle or first .25 s is not pinned in the main text; Q note mentions Defile ticks “beyond the first” timing inconsistency. Specify a policy rather than guessing. Static .5 s lockout unaffected by haste. The `staticCooldown` field is the source; it is not a haste-scaled normal cooldown. No on-cast effects for toggle (note); ordinary `onCast` hook or generic on-cast item triggers must respect this if future modules depend on them. Zombie automatically on, cannot off, no mana consumption; resurrection explicitly off.

Requiem 4015394: all targets receive a telegraph even if untargetable or dead; actual completion only targetable champions, and clones. In a one-enemy duel the channel can be a self delivery with no channel range, rather than finite “global” radius or location aim. Its `effectRadius` field is the literal “Global” with no numeric series; a numeric `field('effectRadius')` read would fail, so assert the global text/targeting and use the absence of a range bound. Ground/self channels with no range do not call `areaOnPets` in current engine, which avoids incorrectly damaging ordinary summons; clones need their own unit classification. Zombie exception: Requiem does not affect Neeko disguised as a non-champion. Current duel spec has no disguise/classification support; record the limitation before implementing Neeko. Spell-shield and parry checks belong at completion. Telegraphed global damage must still be visible to reaction AI when the target is currently hidden/untargetable and could become targetable before impact. Normal channel interruption follows glossary; source ends with a missing interaction-table heading, so preserve generic normal rules and mark special undocumented exceptions as unresolved.

### Required regressions and behavior/budget notes

Death Defied: one activation on fatal damage and execute, HP 1, exactly 7 s, no move/attack, Q/W/R cast costs zero with zero initial mana, E auto-on through zombie, R cutoff boundaries relative to cast/channel time, immune existing DOT/delayed damage/direct CC, retained in-flight projectiles, new targeting denied, health regen allowed then mandatory death, original death recorded/final kill produces draw, kill credit/reset rules versus Master Yi and Cassiopeia, branch memory independence. Include death while already casting Q/R or E-off as unresolved lifecycle cases requiring explicit policy; do not inherit Sion animations.

Q: ordinary and isolated formulas, blast radius/target range, bounded delays and tick rounding, AP dynamic-at-impact or source-snapshot policy, isolation count with pet/clone, spell shield/untargetable unit-count policy, pet area mitigation, blast after owner death within zombie and after final death under a declared persistence policy.

W: actual crossing geometry and absent thickness assumption, enemy already touching at spawn, enter late/exit/re-enter, once-per-zone application, two zones independent, debuff full 5 s when wall expires, MR-reduction order with penetration, decaying 80->40% slow, slow immunity preserves MR shred, CC immunity/Black Shield and spell shield interactions. Generic spell-shield false should not consume a shield.

E: correct mana rate 78/s, dynamic AP increase/decrease between packets, radius exit/reentry, cadence/count, toggle-on/off lockout static under haste, final off packet and OOM final packet, affordability boundary, restoration on champion/pet kill exactly once, no restoration when someone else kills or a pet naturally expires, on throughout zombie with zero cost and denied off, off during resurrection. Avoid treating it as a channel: E runs while Q/W/R cast and while Karthus walks.

R: .25+3 s composition under declared verified policy, damage only uninterrupted completion, root/ground versus stun/silence/airborne/other interrupts per normal-channel rules, untargetable at start but targetable at completion, targetable at start but untargetable at completion, spell shield/parry/Black Shield, projectile walls do not block, global reaction when outside range, zombie R cutoff, ordinary pets untouched and clones hit only with a modeled clone identity.

AI should keep E on only when useful/affordable while alive; Q spam with W to improve hit chance, and R when safe or finishing. During zombie, no melee chase, Q/W still usable at fixed death position, E forced on, and R chosen early enough to finish. A generic “R only if it already kills” may miss high-value zombie damage and must be evaluated explicitly. Default fight/hold/kite/trade behavior must not waste three seconds channeling R under immediately interruptible danger while Q/E can deal more.

Budget should value isolated Q only when the reference assumes an isolated opponent; pets invalidate it. No scaling Defile once per .5 s toggle as though each toggle creates the whole continuous damage, and no double-counting E aura represented in both generic effects and `BudgetHints.damage`. Death Defied is a seven-second post-death offensive opportunity, not seven seconds of surviving effective HP. Generic budget has no post-death damage state. Continuous E consumes 78 mana/s and Q 40/s before haste, far above ~4.7464 mana/s regen; affordable uptime depends on initial mana and fight length. Incoming kill restores 50 mana, but single-duel opponent kill ends the fight unless both have post-death mechanics, so do not assume repeated kill mana sustain.

## Shared readiness gates for implementation

These are changes to investigate after the frozen 61-kit refresh, not instructions to edit the current build mid-refresh.

| Gap observed in current engine | Relevant existing code | Minimum scope before registering affected kit |
|---|---|---|
| Targeted casts universally dropped by untargetability/invisibility | `engine/sim/combat.ts:dropTargeting`, `actions.ts:completeOneCast` | Opt-in Q survival with target damage guarded separately; retain normal Cassiopeia E cancellation. |
| Untargetable state destroys inbound homing missiles | `combat.ts:applyEffect('state')`, `dropTargeting` | Opt-in projectile retention for Death Defied with correct impact immunity. |
| No general persistent absolute facing/cone delivery | `state.ts:Unit.move/moved`, `actions.ts` geometry; Tryndamere local assumption | Explicit facing state/update policy or declared one-axis approximation; never always grant Cassiopeia R stun. |
| No channel interruption completion hook | `combat.ts:interrupt`, `actions.ts:progressChannel` | E-specific release-on-interrupt without enabling completion on every ordinary channel. |
| Dynamic maxHP stat buffs normally heal gained HP | `combat.ts:applyEffect('stat')`, `derived.ts` cache | Non-healing Crimson Pact conversion, no recursion and correct cache invalidation. |
| Budget only values within-stat multipliers | `spec.ts:BudgetHints`, `budget.ts:valued/unitOf` | Cross AP/HP conversion in each candidate reference, with actual combat opening stats matching. |
| Received damage modifiers generic multiplicative and true amplification permitted | `rules/damage.ts:mitigate`, `combat.ts:dealDamage` | Hemoplague excludes true and preserves named additive Alistar exception. |
| DOTs have equal snapshotted packets and independently rounded intervals | `combat.ts:applyEffect('dot')`, `simulate.ts:upkeep` | Scoped exact schedules/integer rounding for Cassiopeia, dynamic AP aura for Karthus. |
| Ground fields cannot independently refresh CC while a target is untargetable | `actions.ts:pulseField`, `combat.ts:abilityHit` | Miasma's existing ground refresh .25 s without making all untargetable targets hittable. |
| Targeted missile impact cannot pause for pending ground blast | `actions.ts:advanceMissiles` | Scoped Twin Fang pending-Q hold; no duplicated shield consumption/hit events. |
| No semantic poison tag | `state.ts:Status`, Teemo/Singed normal DOTs | Explicit poison identity for Cassiopeia own fields; future cross-champion sources require classification. |
| No central champion/pet kill notification at initial fatal event | `combat.ts:onLethal`, Sion `fallen`, Yi HP-based takedown; `pets.ts` owner death hook | Correct Death Defied initial death and kill-credit refunds without waiting for zombie final death or counting pet expiry. |
| Single line/circle fields do not preserve radial/arc portion interception | `spec.ts:Delivery`, `actions.ts` missiles/zones | Real multi-projectile bookkeeping or visible 1D approximation for Vladimir E/Cassiopeia W. |
| No universal target identity for clones/disguises/minion class | `spec.ts:PetSpec`, `state.ts:Pet` | Scoped isolation and Requiem target classification; preserve absent-world limits explicitly. |

Keep newly introduced behavior state in `unit.memory` or copyable world records; never module-global mutable arrays/maps across branches. Current derived-stat cache keys by statuses-array identity/length and spec identity, so mutations of existing status values need array replacement or a supported invalidation mechanism. Existing `onAbilityContact` can replace an impact packet before defenses, while `onAbilityHit` runs only after those defenses; choose the hook according to whether poison heal, MS reward or packet rewrite must happen before or after a spell shield.

Completion criteria: source compilation succeeds with exact evidence reads; focused real-mechanic tests include boundary/defense/lifecycle cases; normal AI duels exercise each intended skill and remain finite; allocator and actual opening stats agree for passive conversions; all assumptions render on kit pages; required full suite and fresh fingerprints/matrix complete. This audit establishes none of those implementation/validation claims.
