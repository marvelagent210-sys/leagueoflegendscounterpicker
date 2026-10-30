# Taliyah — batch 14 source and model notes

The [module](../../kits/champions/Taliyah.ts) implements the level-20, maximum-rank duel model through `KitContext`. Peer review corrected E to commit its real rows at declaration and corrected actual champion spell-damage reports to reset Rock Surfing. Both corrections have before-failure and after-pass evidence in the external batch-14 audit directory. The preserved [staged source notes](../../../counter-next-wave/batch14-audit/Taliyah.source-notes.md) describe the earlier preparation stage; their original status and proposed tests remain historical evidence.

## Pinned primary and game evidence

All five original parsed records remain in `Taliyah.abilities-before.json`. Promotion retains the original primary fields, formulas, flags, page revisions and notes, and adds the complete raw templates and exact object-scoped game excerpts. [The staged inventory](../../../counter-next-wave/batch14-audit/staged-input-integrity.json) records the five raw files and their hashes.

| Ability | Exact primary page | Revision |
| --- | --- | ---: |
| Rock Surfing | `Template:Data Taliyah/Rock Surfing` | 3986175 |
| Threaded Volley | `Template:Data Taliyah/Threaded Volley` | 4013247 |
| Seismic Shove | `Template:Data Taliyah/Seismic Shove` | 4028078 |
| Unraveled Earth | `Template:Data Taliyah/Unraveled Earth` | 3985881 |
| Weaver's Wall | `Template:Data Taliyah/Weaver's Wall` | 4008075 |

Game file: `https://raw.communitydragon.org/16.20/game/data/characters/taliyah/taliyah.bin.json`; version `16.20.8248524+branch.releases-16-20.content.release`; full-download SHA-256 `511d569f7777d5858618cc51816bb97c1bc18dcfe871e2804cf9abc860128b1c` (72,204 bytes). The saved download and metadata are `Taliyah.bin.json` and `Taliyah.bin.meta.json` in the batch-14 audit directory.

The [preserved initial strict source audit](../../../counter-browser/batch14-before-kit-peer-corrections/evidence-integrity.json) verifies these nine Taliyah objects and 93 excerpts. The peer corrections below change behavior, not these pinned source records; the final batch-wide audit is a separate gate. Each path below begins `Characters/Taliyah/Spells/`.

| Object suffix | Verified excerpts |
| --- | ---: |
| `TaliyahPassiveAbility/TaliyahPassive` | 3 |
| `TaliyahQAbility/TaliyahQ` | 20 |
| `TaliyahQAbility/TaliyahQMis` | 12 |
| `TaliyahQAbility/TaliyahQMisBig` | 9 |
| `TaliyahWVCAbility/TaliyahWVC` | 7 |
| `TaliyahEAbility/TaliyahE` | 13 |
| `TaliyahRAbility/TaliyahR` | 14 |
| `TaliyahRAbility/TaliyahRMis` | 11 |
| `TaliyahRAbility/TaliyahRBlowUp` | 4 |

## Maximum-rank values and clocks

`AP` denotes current ability power. Ordinary Q/W cooldowns start on successful cast completion; E commits its mana, cooldown and row schedule at declaration. These cooldowns use ordinary ability haste. The engine advances at 30 Hz and rounds finite durations upward: a 0.25-second cast occupies eight ticks, W's 0.792-second declaration-to-impact delay occupies 24 ticks, and a 0.75-second stun occupies 23 ticks.

| Ability | Effect | Mana, cooldown and timing |
| --- | --- | --- |
| Rock Surfing | 40% bonus movement speed at level 20, accumulated in four quarter-value steps | 0.4-second nearby-terrain gate, then 0.25-second steps; three seconds away before equivalent step decay; static two-second combat/cast lock |
| Q: Threaded Volley | First contact per body/cast: `125 + 0.50 AP`; later four: `50 + 0.20 AP` each; five-hit total `325 + 1.30 AP` | 75 mana, three-second base cooldown, 0.25-second initial cast; five releases over 1.5 seconds |
| Q on Worked Ground | Primary Boulder target: `225 + 0.90 AP`; secondary targets: `125 + 0.50 AP`; 40% slow for 1.5 seconds | 10 mana, 50% base cooldown reduction, post-haste cooldown floor 0.75 seconds; same initial cast |
| W: Seismic Shove | Zero damage; 400-unit vector displacement over one second, radius 225, range 900 | Zero mana, eight-second cooldown, 0.25-second cast; impact 0.792 seconds after declaration |
| E: Unraveled Earth | Eruption `240 + 0.60 AP`; first detonation `85 + 0.30 AP`; at most four factors `1, .75, .5, .25`, totaling `212.5 + 0.75 AP` detonation damage | 90 mana, 14-second cooldown, 0.25-second cast; row release begins at declaration with 0.17-second spacing; each row lasts four seconds |
| E control | 20% field slow; one accepted detonation can schedule a 0.75-second stun, or two seconds for an actual monster | Stun waits for actual displacement completion; a field slow refresh lasts two ticks |
| R: Weaver's Wall | Full rank-three length 6,500; emergence 1,500 units/second; no damage | 100 mana, one-second channel; 120-second hasted cooldown starts after the wall expires or is destroyed; champion damage imposes a separate static three-second initial-cast lock |

## Independent Q volley and actual Worked Ground

No Worked Ground exists at duel start. Ordinary Q creates one radius-400 patch at the declaration position when the cast completes, lasting 30 seconds from creation. Worked Q consumes only the oldest overlapping live patch. Patches and consumed history remain independent in cloned branches; moving to fresh ground can create another patch.

After the initial cast, ordinary stones release at offsets `0, .5, 1, 1.25, 1.5` seconds. Each starts 50 units ahead of Taliyah's actual position at that release and retains the originally declared axial direction. Its remaining flight is 950 units, preserving the 1,000-unit range measured from that release position. Attack declarations remain locked until the third release; movement and legal W/E casts can occur while later stones are pending. Stasis permits the later releases. Death or resurrection clears unlaunched stones; already committed missiles remain independent. A new Q waits for the volley to finish.

Each shard has full width 200, a radius-175 explosion, initial speed 3,600 and acceleration −5,000 units/second² down to a 1,500 floor. The primary's displayed 3,600→1,800 speed description also explains that the 1,500 minimum is not reached before normal destination arrival. The actual missile movement component supplies that floor. Boulder uses its own fixed 2,000 speed and radius-225 explosion; its generic 3,600 `missileSpeed` field does not replace the movement component.

Every missile uses real first-body collision, projectile interception and its own skillshot branch. A real pet impact can splash nearby actual enemy bodies. Each body's first physical explosion contact spends the full-damage tier even if a spell shield denies that packet; later contacts from that volley are persistent area damage. Untargetable/stasis bodies receive no explosion contact and spend no tier. Actual impact AP is read for each packet. Contacts give 0.5 seconds of standard sight; no unsourced sight radius is added. An explicitly classified monster receives 40 extra damage per ordinary shard, or 72 extra on the primary Boulder hit; Boulder also stuns actual monsters for three seconds. No pet, monster or secondary victim is created to obtain those effects.

## W vectors and E row projection

W offers separate away and toward-caster commands sharing one cooldown. Both anchor the selected location and direction at declaration, so later caster movement does not move the marker. The 0.792-second delay is measured from that declaration, with current local spell-shield, parry and displacement/CC immunity checks at impact. The target can leave the radius and make W miss. The active `TaliyahWVC` wrapper corroborates zero maximum-rank mana, radius 225 and cooldown eight; the stale child W's different values are not substituted. Other lateral vectors have no representation on the one-dimensional arena axis.

E retains the authored 22-stone inventory: six rows, with two stones in the first and four in each later row. Declaration position/direction remain fixed. The primary's “Effect at cast time start” requires row delivery to begin at declaration while the ordinary cast lock remains active. Row start ticks are `0, 6, 11, 16, 21, 26` for a tick-zero declaration; each lives 120 ticks. Mana and cooldown commit at that declaration, so death during the remaining cast lock preserves the paid field. Actual first-row anti-dash contact can occur before the cast lock ends. The preserved earlier candidate used completion-based clocks; its passing results remain historical evidence.

Exact lateral mine centers are unpublished, and the primary 80-degree angle is estimated. The model therefore projects six equally spaced row centers across the primary 800-unit reach, at `(row + .5) × 800 / 6`, with radius-85 mine contact checks including the moving body's radius. Each projected row grants one shared contact opportunity. Its unlocated lateral stones grant no additional automatic contacts. Spawn eruption covers that row's axial strip and can damage each real body only once across the entire cast. Standing in an active row refreshes the field slow.

Only real swept dash or forced movement crossing a spawned, unspent row consumes a mine. Walking, blinks, zero-distance terminal events, pre-spawn movement, untargetable crossings and stasis do not. The first continuous swept displacement can receive up to four packets. The original parser incorrectly labels the falloff as champion-level scaling; unchanged primary fields, the retained raw `type=stones detonated|0 to 75 for 4`, the primary maximum-total formula and binary `MineDamageFalloff = .25` establish count-based factors `1, .75, .5, .25`.

The first accepted detonation schedules one stun after the actual displacement ends. Once that displacement ends, the target's once-per-cast entitlement closes. Later movement may consume remaining row opportunities but gains no further damage or stun. A denied detonation cannot schedule an unguarded stun; a new spell shield after an accepted detonation does not erase the already accepted delayed stun. Current defenses still guard delivery. Actual monsters receive 2.25 times E eruption/detonation damage and their own two-second stun. Placed rows and their movement observers survive Taliyah's death, with separate actual champion/pet identities and independent branch state.

The shared movement transition fixes preserve this deferred control through accepted dash-to-forced and forced-to-forced replacements, and through denied pet displacement. A completed landing packet resolves before its terminal movement observer applies E's stun; an unfinished dash can still be interrupted by a real swept contact. The preserved actual landing reproduction now deals its 100 true landing damage with E active and then remains stunned.

## Wall emergence, surfing and passive boundaries

An uninterrupted one-second R channel creates a traveling wall from the declared origin/direction. Its direction-only cast always uses the full 6,500 length; cursor distance does not shorten it. A free explicit recast during the channel opts into surfing. Recasts do not count as fresh ability activations. Initial root/ground restrictions are distinct from accepted root/silence channel interruption; ground applied after channel start permits the ride recast. An interrupted channel removes its own pending effect and starts the post-effect cooldown.

Primary emergence speed 1,500 overrides binary `TaliyahRMis` speed 1,700 and generic 2,000. The primary's 1,200 explicitly describes jump-off speed. The source supplies no independent surf velocity, so the surfer follows the real wall front at 1,500 as an explicit interpretation. Detailed tables lock the first 0.65 + 0.35 seconds of surf; 0.65 is estimated. After that one-second lock, a basic cast or explicit jump can dismount. This follows the detailed phases despite a conflicting 0.75-second prose sentence. Accepted immobilization or silence can dismount a rider; the model does not grant unstoppable movement.

The wall creates actual terrain segments as it advances. Projectile blockers stop future emergence, preserve already created terrain, dismount a rider and apply the sourced 0.25-second stun. Surf crosses its own evolving wall; actual foreign terrain preempts entry. Explicit jumps clamp the command to at least 150 and at most 700 units, travel at 1,200, and clamp to clear endpoints. The sourced 1,000-unit cross-terrain extension requires two-dimensional exit geometry and is not granted automatically. Automatic dismounts retain the actual position. Unquantified lateral knock-aside becomes guarded knockdown/disruption at real wall contacts, without invented axial escape.

Segments expire four seconds after actual wall completion. Manual destruction becomes available after emergence finishes and starts the cooldown; an available destroy recast can be used while disabled. Unquantified gradual disintegration, map edges and the adjacent-expiry shield bug's unspecified range remain unsupported. Axial terrain blocks the lane rather than providing a navigable parallel two-dimensional wall. The channel/surf grants standard sight without an invented radius; resurrection clears retained R activity.

Rock Surfing reaches 40% at level 20 in quarter-value increments after its 0.4-second nearby-terrain gate and subsequent 0.25-second steps. It begins equivalent decay after three seconds away. The explicit nearby-wall environment qualifies. Generated terrain qualifies at actual body contact because no primary proximity radius is supplied. The source policy resets the two-second lock on ordinary casts and actual champion combat; dealing default/proc damage does not reset it. Actual Q/E damage reports are matched by their emitted spell names. A late real mine hit resets a rebuilt passive; dealing default damage and a fully spell-shielded mine contact do not invent champion combat damage. The arena supplies no invented turret or extra environmental body.

## Resource policy, allocation and recorded verification

The ordinary policy prepares legal E rows and uses an actual W pull when possible, selects Worked Q only while overlapping real ground, and approaches opponents outside true Q/E reach. It does not guarantee a four-mine combo. Completed trades retreat. R is reserved for flee, where a legal away wall requires a sufficiently near enemy and no imminent damaging threat during the one-second channel; flee may also use W/E for peel. Idle creates no casts or extra bodies. Actual casts pay mana and remain subject to all movement, cooldown, control and counterplay clocks.

Reference allocation prices the alternating stationary ordinary/worked Q cycle and one E eruption per cooldown. With `h = 1 + abilityHaste / 100`, its magic damage rate is:

```text
((325 + 1.30 AP) + (225 + 0.90 AP))
  / (max(3 / h, 1.5) + max(0.75, 1.5 / h) + 2 × 0.25)
  + (240 + 0.60 AP) / (14 / h + 0.25)
```

The E reference retains one conservative cast-lock overhead per cycle even though its real cooldown now starts at declaration. It grants no guaranteed E detonations, R damage, fictional ally benefit or monster reward. This reference does not refill mana or guarantee that a moving duel can sustain its stationary Q cycle.

The [focused tests](../../tests/kits/taliyah.test.ts) cover source/object reads, finite volley and history, current origins/AP, defenses and real pets, independent clone state, vector timing, row contacts/falloff, delayed stuns, wall phases/interception/terrain, passive gates and legal policy. Preserved Taliyah-only history includes `Taliyah-tests-run-v2.json` at 73/73 passed, `v4` at 75/75, and the expanded `v5` at 76/77 with one shared dash-to-forced transition failure. Earlier failed attempts remain in the audit directory.

The subsequent [movement-fix proof](../../../counter-next-wave/batch14-audit/Ryze-movement-finish-v1.json) records 117/117 passing: all 77 Taliyah assertions, 27 batch-14 combat contracts and 13 movement transitions. Adjacent movement contracts also passed 93/93. The then-canonical batch-14 preflight, completed `2026-10-27T06:58:06.663812+00:00`, passed typecheck, focused tests and strict evidence audit with actual exit codes 0/0/0. Its focused report contains 4,229 passed, zero failed/skipped, including all 77 Taliyah assertions from that candidate. Source provenance stayed exactly `0d56ea8140198892be4e1cfcfb30b5dbded8206f8c09a1bafe4cc8af3f5ee8a9` before and after that preflight. Root preserved those reports as valid evidence of the older candidate before authorizing the E-clock and passive-report corrections; neither passing count claims validation of those new changes.

The actual peer-correction run `peer-back-after-v2.json` passed **184/184**: all **81 Taliyah** assertions, **63 Syndra** assertions, 27 shared batch-14 combat contracts and 13 movement transitions. `peer-back-before-v1.json` preserves the five failing assertions that demonstrated the corrected defects before implementation. Existing test IDs remain; the row-clock fixture was corrected to the primary cast-start rule, and its pre-spawn test now crosses genuinely unspawned farther rows. These focused results validate the new Taliyah paths; final batch-wide gates remain separate.

The strict batch audit at that milestone verifies 40 ability pins plus one pet pin, all 41 retained raw revisions, six binaries, 85 game-source objects and 169 excerpts, with primary values preserved, unpromoted inputs disallowed and zero failures. These are source and focused-preflight results. A fresh batch-14 matrix, final full-suite validation, production reflection/browser checks and refreshed private preview were still pending at this documented preflight milestone.
