# Kog'Maw and Tristana

Both kits use the committed **16.20** ability records and level-20 champion statistics, with maximum ability ranks. Supplemental game evidence comes from the exact versioned CommunityDragon files; it is attributed separately from wiki revision evidence.

| Champion | Ability | Pinned wiki revision |
| --- | --- | --- |
| Kog'Maw | Icathian Surprise | [4038400](https://wiki.leagueoflegends.com/en-us/?oldid=4038400) |
| Kog'Maw | Caustic Spittle | [3960434](https://wiki.leagueoflegends.com/en-us/?oldid=3960434) |
| Kog'Maw | Bio-Arcane Barrage | [4052263](https://wiki.leagueoflegends.com/en-us/?oldid=4052263) |
| Kog'Maw | Void Ooze | [3965135](https://wiki.leagueoflegends.com/en-us/?oldid=3965135) |
| Kog'Maw | Living Artillery | [4007636](https://wiki.leagueoflegends.com/en-us/?oldid=4007636) |
| Tristana | Draw a Bead | [3986179](https://wiki.leagueoflegends.com/en-us/?oldid=3986179) |
| Tristana | Rapid Fire | [4026462](https://wiki.leagueoflegends.com/en-us/?oldid=4026462) |
| Tristana | Rocket Jump | [4007758](https://wiki.leagueoflegends.com/en-us/?oldid=4007758) |
| Tristana | Explosive Charge | [4008204](https://wiki.leagueoflegends.com/en-us/?oldid=4008204) |
| Tristana | Buster Shot | [4008205](https://wiki.leagueoflegends.com/en-us/?oldid=4008205) |

Game source version: `16.20.8248524+branch.releases-16-20.content.release`.

- [Kog'Maw game file](https://raw.communitydragon.org/16.20/game/data/characters/kogmaw/kogmaw.bin.json), SHA-256 `d863884d159b09d561549eff51bc550bf2a6486da3d29275e3cf94531808588b`.
- [Tristana game file](https://raw.communitydragon.org/16.20/game/data/characters/tristana/tristana.bin.json), SHA-256 `68b9df27d732d28a93af63e6816913c44e0d36826c78a258316a2f0718344171`.

## Kog'Maw

Q supplies a permanent 25% bonus attack speed. Its first-target projectile deals `260 + 0.9 AP` magic damage before applying four seconds of 32% armor and MR reduction. The cast follows current rounded basic-attack windup, including attack-speed changes; the exact game object explicitly uses automatic attack cast-time data. The projectile collides with real intervening summons and projectile walls, with their own spell shields and defensive states.

W costs 40 mana and grants 210 attack range for eight seconds without resetting the attack timer. Each empowered attack adds `(0.06 + 0.00015 AP) × target maximum HP` magic damage, capped at 100 on actual summoned minions. The ordinary basic packet and the separate noncritical on-hit retain attack avoidance, full on-hit timing and the actual target's resistances. The empowerment is selected when the attack launches and survives later flight after the buff ends. Structures and neutral monsters are absent.

E deals `230 + 0.65 AP` magic damage along its piercing 1360-range, 240-wide, 1400-speed missile. It deposits ground ooze at launch and each traveled 125-unit interval, using spacing that the pinned wiki explicitly marks **pending for test** as a modeling assumption; each blob persists three seconds from its own placement and refreshes a 60% slow every 0.25 seconds, rounded to eight simulation ticks. Projectile walls stop future deposition while already deposited ooze remains. Ground slow does not consume a fresh spell shield. The source omits a separate blob radius; the model uses half the known strip width as the one-axis blob radius. Its longitudinal overlap approximates the transverse strip.

R deals `180 + 0.75 bonus AD + 0.45 AP` magic damage before its missing-health modifier. The modifier interpolates the pinned table from 1× at full HP to 1.5× at exactly 40% HP; **strictly below 40% HP**, it becomes 2×. Health is checked at impact. The ground strike lands 0.6 seconds after cast completion, and each completed cast adds one of nine shared stacks for eight seconds. Costs are 40, 80, …, 400 mana, with the timer refreshed after each completed cast. The sight mark does not expose stealth.

Icathian Surprise counts the first death immediately, preserves incoming projectiles and lets Kog'Maw move for exactly four seconds while invulnerable, untargetable and immune to CC. Attacks and casts are disabled. Attack range becomes zero even when W was active at death; the lifecycle clears the earlier W range buff. The policy chases the rival in every scenario mode. Bonus movement starts at 10%, gains 2.5 percentage points per 0.264 seconds and clamps at the source's stated actual 45%. The final 400-radius explosion deals **710 true damage at level 20**, checking each target's spell shield, parry, invulnerability and targetability independently, including actual nearby summons.

The wiki explicitly supplies 680/710 damage for levels 19/20. The game **display** calculation agrees with its 140–650 values over levels 1–18; a separate runtime-named object still contains 125–550. That conflicting client object is recorded as a limitation, rather than asserted to reveal server behavior. The documented zombie one-basic-attack bug is not reproduced. The explosion occurs at the exact lifecycle expiry before the corpse is finalized, and the first death is never counted twice.

The stat budget values W uptime over its haste-adjusted cooldown and artillery within a ten-second mana reserve, paying the rising cost of each prospective cast after one Q/W/E. It does not pre-award the death explosion or guarantee ground-strike occupancy.

## Tristana

The passive's pinned table explicitly gives **167.647058823529 bonus range at level 20**, yielding 717.647058823529 total range for basic attacks, E and R. Their separate fields list only levels 1–18; the kit uses the passive table instead of capping those spells at level-18 range. Ordinary attacks use the pinned 2250-speed missile.

Q costs its ranked 35 mana and grants 120% bonus attack speed for seven seconds, without refreshing an existing buff or resetting a declared attack. Its budget contribution respects the shared attack-speed cap.

W uses a 0.25-second cast and the sourced nominal 1100 dash speed for an aimed distance up to 900. Landing deals `210 + bonus AD + 0.5 AP` magic damage in a 350-radius area and applies a 40% two-second slow. Q, E and R may be cast over an active jump, including timed casts. Knockdowns interrupt the jump and prevent the landing packet. A clear endpoint crosses intervening terrain; an endpoint inside terrain clips to its near boundary. The source warns that actual speed varies with distance and terrain, so the vertical arc and exact server speed are not claimed. Counted champion deaths and maximum-stack charge detonations on champions reset W. Ordinary summons are not assumed to be clones.

E's initial application is a shieldable zero-physical-damage packet delivered at 2400 speed after current attack windup. Target invalidation during the cast cancels without mana or cooldown. Its four-second fuse starts on attachment. A charge deals `160 + 0.8 bonus AD + 0.5 AP`, multiplied by `1 + 0.25 × stacks` for zero to four stacks. Connected basic on-hits and damaging abilities add stacks; blind, dodge, block and parry prevent attack stacks, and a spell shield denies a blocked spell's stack. Four stacks detonate immediately unless the last stack is supplied by R.

The exact pinned game calculation additionally multiplies charge damage by **`1 + 0.4 × critical chance × (critical damage − 1)`**. At the current default 200% critical damage and full critical chance, this is 1.4×. It is a deterministic scaling term, not a normal critical roll. Detonation uses caster stats at that moment; the pinned text does not specify an earlier snapshot.

Charges retain actual target IDs and independent timers through movement, branching and Tristana's own death. The primary detonation hits through untargetability while retaining stasis, invulnerability, parry and fresh spell-shield checks. Collateral targets use their own ordinary targetability and defenses. A removed summon leaves its last observed bomb location until the fuse ends; the pinned page does not establish an early target-death detonation, so that rule is not fabricated. Only actual basic-kill contacts trigger the passive `105 + 0.25 AP` magic explosion; a charge kill occurring within a basic's hit callback is not misclassified as a basic kill.

R deals `325 + 0.7 bonus AD + AP` magic damage only to the primary target, then knocks it and nearby enemies back 1000 units at nominal 1500 speed with a 0.7-second stun. Its displacement origin is the caster's cast-completion position. Collateral targets move parallel to the primary direction and take zero magic damage, with no E stack. Each collateral spell shield and defensive state is checked independently. Actual summoned minions retain their own CC immunity, timed forced movement, terrain clipping and early control cleanup. Displacement immunity prevents the knockback and stun while leaving the primary damage intact.

When R applies the fourth E stack, detonation waits until actual forced movement ends or the original four-second fuse expires. Terrain stops, pet movement and a dead caster retain that ordering. Only the airborne debuff ends when forced movement stops; the separately ranked 0.7-second stun and ordinary sight mark retain their duration, including at a touching wall. The model does not claim true sight over stealth.

The policy places E before its basic sequence, activates Q with a charge attached, and preserves basic attacks before early R displacement. The budget includes Q uptime and a full-stack, critical-scaled E per cooldown cycle; kill resets, unrelated passive splash targets and guaranteed jump hits are not pre-awarded.

## Focused validation

`tests/sim/kogMawTristanaAccuracy.test.ts` checks pinned evidence, level-20 range, exact damage formulas, attack avoidance, real summon identity and caps, projectile walls, spell-shield intersections, strict artillery thresholds and costs, movement/death lifecycle clocks, charge persistence, independent branch memory, jump overlays, terrain interruption, R collateral controls and the R fourth-stack/fuse ordering. Default-policy combat and finite budget sensitivity are checked alongside direct mechanical fixtures. Matrix and whole-project validation are recorded separately in `ACCURACY.md` when the batch is frozen.
