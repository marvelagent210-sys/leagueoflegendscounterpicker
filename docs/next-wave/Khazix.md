# Kha'Zix implementation and source audit

The runtime kit uses the committed 16.20 dataset at level 20 and maximum spell ranks. Gameplay numbers are read through `KitContext` while the kit is built. Each of the nine primary ability records retains its original fields and revision, plus the complete raw text fetched for that exact revision.

## Exact sources

| Ability | Immutable primary template | Revision |
| --- | --- | --- |
| Unseen Threat | [Unseen Threat](https://wiki.leagueoflegends.com/en-us/Template:Data_Kha%27Zix/Unseen_Threat?oldid=4064849) | 4064849 |
| Taste Their Fear | [Taste Their Fear](https://wiki.leagueoflegends.com/en-us/Template:Data_Kha%27Zix/Taste_Their_Fear?oldid=4006997) | 4006997 |
| Evolved Reaper Claws | [Evolved Reaper Claws](https://wiki.leagueoflegends.com/en-us/Template:Data_Kha%27Zix/Evolved_Reaper_Claws?oldid=3994647) | 3994647 |
| Void Spike | [Void Spike](https://wiki.leagueoflegends.com/en-us/Template:Data_Kha%27Zix/Void_Spike?oldid=3971345) | 3971345 |
| Evolved Spike Racks | [Evolved Spike Racks](https://wiki.leagueoflegends.com/en-us/Template:Data_Kha%27Zix/Evolved_Spike_Racks?oldid=4064850) | 4064850 |
| Leap | [Leap](https://wiki.leagueoflegends.com/en-us/Template:Data_Kha%27Zix/Leap?oldid=4072117) | 4072117 |
| Evolved Wings | [Evolved Wings](https://wiki.leagueoflegends.com/en-us/Template:Data_Kha%27Zix/Evolved_Wings?oldid=4072116) | 4072116 |
| Void Assault | [Void Assault](https://wiki.leagueoflegends.com/en-us/Template:Data_Kha%27Zix/Void_Assault?oldid=3969560) | 3969560 |
| Evolved Adaptive Cloaking | [Evolved Adaptive Cloaking](https://wiki.leagueoflegends.com/en-us/Template:Data_Kha%27Zix/Evolved_Adaptive_Cloaking?oldid=3906950) | 3906950 |

Supplementary evidence comes from the exact [16.20 Kha'Zix binary JSON](https://raw.communitydragon.org/16.20/game/data/characters/khazix/khazix.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `a245ce53e1b2e489ba9b359b3e6be299f28aeade045b9e1914a013cceb2de931`. Six curated object citations retain seven exact JSON excerpts, including complete arrays:

- `Characters/Khazix/Spells/KhazixPassiveAbility/KhazixPassive`: the full 31-entry character-level damage array, independently confirming 155 at level 20.
- `Characters/Khazix/Spells/KhazixRAbility/KhazixR`: all eight named `DataValues` arrays for base/evolved stealth duration, recast window, movement speed, evolution points, recast delay and number of casts.
- `Characters/Khazix/Spells/KhazixWAbility/KhazixWLong`: `castConeAngle:28.0` and `mCastingBreaksStealth:true`.
- The ordinary Q, W and E spell objects: `mCastingBreaksStealth:true` for each spell.

The raw wiki revisions, binary bytes and retrieval/hash metadata are retained outside the repository in `/workspace/counter-next-wave/batch9-audit`. The retained source excerpts are part of the model inputs and its fingerprint. Floating-point binary tokens are preserved rather than rounded to their familiar decimal labels; the primary wiki's 40% R movement bonus supplies the gameplay coefficient.

## Evolutions and target identity

At level 20 the three R ranks grant three unique evolutions. Automatic variant search evaluates exactly four legal configurations, each omitting one of Q, W, E or R. The `unevolved` option accepts 0 for automatic selection or 1–4 for a fixed omitted ability. Ordinary compilation with 0 uses Q/W/E as its reference configuration. It does not grant the fourth evolution from The Hunt is On! without the required quest history.

Isolation uses the actual contacted target and actual allied bodies within 375 center units, including living hidden, untargetable and stasis allies. Monster-class bodies protect other monsters but do not protect champions. Wards and the primary template's nine excluded summon categories do not prevent isolation. Dead and expired pets do not protect an ally. Names and kinds identify the explicitly excluded props because the simulator has no equivalent internal game tags.

With `environment.minions` enabled, an explicit allied lane-wave proxy conservatively prevents isolation of non-monster targets. The arena has no independent lane-minion collision bodies or outer turrets; none are fabricated. Aimed Q can select an actual pet, remembers that specific target, and never transfers the spell to its owner when the summon dies.

## Runtime mechanics

**Unseen Threat.** The exposed duel starts without a prefight proc. An observed enemy-champion sight-loss transition or an actual R activation arms the passive; R arms it even through true sight. A connected, unblocked basic against a champion-class target deals `155 + 0.5 bonusAD` magic damage and applies a 25% slow for two seconds. It bypasses spell shields and does not create a second basic attack. Blind, dodge, attack block and Riposte preserve the armed proc. Actual champion-class clones use the same impact path; minion, monster and other summons take their ordinary basic while preserving Unseen Threat. Pet and champion contacts remain distinct, so a pet attack cannot damage its owner. Item/rune cast-instance stacks are outside the plain-stat model.

**Taste Their Fear.** Q costs 20 mana, casts for 0.25 seconds and has a four-second base cooldown. Its ordinary center range is 325; evolving Q gives 375 range and 50 extra basic range. The ordinary packet is `180 + 1.05 bonusAD`; isolated targets take `378 + 2.205 bonusAD`. The evolved cooldown's 45% reduction samples isolation at declaration, while the damage samples isolation at completion. A target entering or leaving an ally's protection during the cast therefore changes only the corresponding source-defined result. Completion revalidates the selected real body's range, visibility, targetability and life. Invalid casts restore their 20 mana and leave no Q cooldown. Actual spell shields and parries guard the damage independently from the declaration-time cooldown choice.

**Void Spike.** W costs 75 mana, casts for 0.25 seconds, has a nine-second cooldown and releases from the caster's position at completion. Each finite ray travels at 1700 up to 1025 units with a 140-wide collision envelope. Its first actual enemy contact produces a 275-radius explosion at the collision coordinate, dealing `195 + bonusAD`. The caster heals `135 + 0.5 AP` only while his center is inside an actual explosion. Maximum-range expiry and projectile destruction create no explosion or healing. An already released spike continues after caster death; the corpse cannot heal.

Evolved W launches three rays. A cast damages each actual recipient at most once and heals at most once, and later rays pass through targets already contacted by that cast. The 40% slow increases to 60% if the target is isolated at impact; both last 2.25 seconds. Champion-class contacts also receive standard sight for that duration. Spell shield suppresses damage and slow but cannot suppress that sight. Standard sight does not expose invisibility or override nearsight. All rays use actual target hitboxes, projected wall intersections and separate serialized flight state, so cloned worlds do not share mutable missile progress.

**Leap.** E costs 50 mana, has a 12-second cooldown and deals `205 + 0.4 bonusAD` only around the landing point within 300 units plus the recipient's hitbox. Unevolved maximum displacement is 700; Evolved Wings raises it to 1000. Location aim permits shorter or backward destinations. Terrain traversal and destination clipping use the real arena segments and pathing radius. Root, grounding and silence prevent the relevant declaration. An actual champion takedown resets evolved E; pet and clone deaths do not. The immediate movement approximation described below cannot represent midair casts or finite-flight counterplay.

**Void Assault.** The first cast costs 100 mana and starts its 70-second, haste-adjusted cooldown immediately. Ordinary R grants 1.25 seconds of invisibility and 40% movement speed, with two casts total; evolved R grants two seconds per activation and three casts total. Recasts cost no additional mana. Each actual stealth exit starts a static two-second lockout, followed by its own twelve-second recast window. These recast clocks ignore ability haste. Natural expiry, basic-attack launch and basic-spell declaration share the same exit bookkeeping; movement speed ends with the associated invisibility. Q/W/E declarations break R stealth, while a basic breaks it at the end of its windup.

## Behavior and reference budget

The normal policy uses Q/W/E/R during all-in scenarios, preserves ordinary trade bookkeeping before custom priorities, reserves every R stage in trade and hold, and retreats after a completed trade before considering renewed offense. Tests verify reservation with the root R or free recast actually eligible, rather than merely on cooldown. Idle preserves the shared idle decision.

Flee explicitly recognizes the location-targeted E despite its custom delivery: a ready, legal E jumps to its maximum backward destination when the pursuer is within the approach/landing envelope. The next decision continues normal retreat walking. Grounded, busy or distant cases retain ordinary movement/defense. Overlap direction uses the shared reflected `directionTo` rule for both leaps and all spike rays.

The reference budget values an isolated target without represented allies: evolved Q cooldown where applicable, normal W/E cadence, one passive proc per allowed R cast and one W heal per cooldown. It grants no prefight passive, takedown reset or fourth evolution. This pricing reference does not claim that the default lane-wave environment guarantees isolation or healing; runtime allies, geometry, guards and actual R exits decide those outcomes.

## Source conflicts and explicit limits

- Neither pinned Leap template nor the exact E objects supplies a reliable travel speed or duration. E therefore uses the existing immediate displacement fallback, with no invented finite travel constant. Midair Q, buffered casts, travel-time knockdown and anti-dash interception are not represented. The primary's unknown minimum dash distance is also unresolved; zero or shorter chosen displacements are permitted by the location model.
- The versioned evolved-W cone value 28 is interpreted as the total cone, with side rays at ±14 degrees. The primary leaves its angle unpublished. Real targets lie on the duel axis, while ray collision/explosion calculations retain their lateral distance. The scalar projectile-wall API uses each ray's projected segment. This is a documented geometry interpretation rather than a claimed server transform.
- Primary W width 140, explosion radius 275 and projectile speed 1700 take precedence over conflicting generic binary cast/missile metadata. The E objects' generic `missileSpeed:20` and an unrelated missile named `EzrealEssenceFluxMissile` are not treated as leap speeds.
- The manual spike flights use a shared scalar skillshot weight. Lateral dodge correlation among the three rays and fully independent branch outcomes are not represented. Actual target contacts, projectile walls, per-target defenses and cast-level hit/heal deduplication remain separate.
- Shared visibility has no fog/brush-occlusion region or pet-vision system. Passive sight checks observe the enemy champion, and standard sight is retained without granting true sight. Isolation indicators, allied assists, structures, lane farming, summoner spells and external item effects are outside this duel. The Hunt is On! and preduel evolution-menu casts do not create synthetic history.

## Validation

The focused `tests/kits/khazix.test.ts` suite covers all nine primary revisions, exact binary provenance, missing-source failure, four legal variants, stat-responsive budgets, declaration/completion isolation sampling, all listed isolation exclusions, real pet identity, Q cancellation, W flight/explosion/healing/expiry/walls/death, actual pet/clone basic contacts, independent branches, packet defenses, landing geometry, terrain, resource/CC gates, real takedown resets, every R exit/recast boundary and scenario-mode reservation.

It also runs the normal six-scenario, 15,000-gold production matchup against Darius, with finite outcomes, ordinary Q/W/E/R casts, exact reflected builds and every applicable reflected score within `1e-12`. Separate tests cover co-location and backward escape geometry on both sides. The command is `npx vitest run tests/kits/khazix.test.ts --maxWorkers=1`; the latest successful JSON and log are retained outside the repository as `/workspace/counter-browser/batch9-khazix-resumed-validated.json` and its adjacent `.log`. These focused checks do not substitute for the root's full matrix, production variant-search reflection, full serial suite, browser and private-package validation.
