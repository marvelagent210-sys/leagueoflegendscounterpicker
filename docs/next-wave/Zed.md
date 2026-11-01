# Zed implementation and evidence audit

Zed has independent W and R shadow sources, actual per-source projectile contacts, one E damage attempt per target and cast, and a Death Mark ledger built from accepted damage reports. All gameplay quantities are read from retained sources through `KitContext` during compilation.

## Exact sources

| Slot | Immutable primary source | Values and rules used |
| --- | --- | --- |
| I | [Contempt for the Weak, 4052367](https://wiki.leagueoflegends.com/en-us/Template:Data_Zed/Contempt_for_the_Weak?oldid=4052367) | Impact health below 50%; 10% target maximum health at level 20; ten-second champion lock; monsters take 75% capped at 175; blind/dodge preserve the proc, blocked basics consume the champion lock. |
| Q | [Razor Shuriken, 4006897](https://wiki.leagueoflegends.com/en-us/Template:Data_Zed/Razor_Shuriken?oldid=4006897) | 240 + 100% bonus AD; 60% after the first contacted body; 925 range, 100 width, 1700 speed; .25-second cast, 55 energy, six-second cooldown; cast-completion origin and W-swap exception. |
| W | [Living Shadow, 4053262](https://wiki.leagueoflegends.com/en-us/Template:Data_Zed/Living_Shadow?oldid=4053262) | 50 energy restored once per Q/E cast when different sources hit the same target; 325 estimated minimum and 650 maximum placement, 2500 speed, 5.25-second stationary lifetime, 2000 swap range; 20 energy, 16-second cooldown; queued swap/copies, replacement and post-death persistence. |
| E | [Shadow Slash, 4016889](https://wiki.leagueoflegends.com/en-us/Template:Data_Zed/Shadow_Slash?oldid=4016889) | 160 + 70% bonus AD; 315 owner and 290 shadow radius; 40%/60% slow for 1.5 seconds; only one damage attempt per target and cast; shadow-first spell-shield priority; accepted owner hits on champions reduce W's current cooldown by three seconds; 40 energy and three-second cooldown. |
| R | [Death Mark, 4050166](https://wiki.leagueoflegends.com/en-us/Template:Data_Zed/Death_Mark?oldid=4050166) | 625 target range; .6-second delay then .35-second tracking dash to 125 beyond the target; three-second mark dealing current 100% AD + 55% stored physical/magic damage; nine-second shadow; .5-second recast gate, 7.5 + .25-second swap buff and final-1.25-second prohibition; 1950 cancellation, 2200 tracking cutoff and static .5-second cancellation cooldown; 100-second normal cooldown. |
| Pet | [Zed article, 4026038](https://wiki.leagueoflegends.com/en-us/Zed?oldid=4026038) | Actual untargetable Minion classification, 700 sight, shared aimed world location for copied Q, copied E slow, independent one-W/one-R replacement identities, one swap each, and copies that do not create on-cast activations. |

Every full raw ability template is retained as a same-revision supplement. The full exact pet article is also retained in the pet record's `text.pinnedRawRevision`. Their original primary pins and parsed numeric fields remain intact. The fetched raw inputs are preserved outside the repository in `/workspace/counter-next-wave/batch9-audit`.

Supplementary game evidence is the exact [16.20 Zed binary JSON](https://raw.communitydragon.org/16.20/game/data/characters/zed/zed.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `475ea0d11b79d2cc4a97e9d41e4da1b7187500feaa02906de3a2650bcf9653fb`. Six attributed `gameSources` retain 26 exact excerpts and whole arrays from:

- `Characters/Zed/Spells/ZedPassiveAbility/ZedPassive`.
- `Characters/Zed/Spells/ZedQAbility/ZedQ` and `Characters/Zed/Spells/ZedQAbility/ZedQMissile`.
- `Characters/Zed/Spells/ZedWAbility/ZedW`.
- `Characters/Zed/Spells/ZedEAbility/ZedE`.
- `Characters/Zed/Spells/ZedRAbility/ZedR`.

The primary W range and speed, **650/2500**, take precedence over generic binary **700/1600** metadata. W restores the primary's **50** energy at maximum rank; the complete binary array also contains unused later entries 55. R ghosting follows the primary's **three seconds**, retaining the conflicting binary four-second array in evidence. The binary's float encoding of the rank-three 55% R amplification does not replace the primary's exact 55% value.

## Runtime behavior

Contempt evaluates health before ordinary basic damage at impact. Each actual champion-class body owns its cooldown; minion and monster bodies do not share the owner's state. Monster classification alone selects the 75%/175 cap. Hit-count objects receive no extra proc packet. Actual pet basics opt into the shared ordinary attack path so their blind, dodge, parry, block, critical and on-hit rules stay consistent. The passive cannot critically strike; the basic still can.

Each shadow is an actual untargetable Minion-class pet, with its own W/R identity, position, placement clock, expiry and one-use swap. It has no basic attack or clone classification. Creating another shadow replaces only the same source. W moves over finite travel time, queues a requested swap, and delays copied casts until placement. W/R swaps preserve source identity and exchange real positions. Shadows persist after owner death until their ordinary expiry; dead owners issue no new casts.

Q captures one aimed world location at declaration, then launches from each source's actual completion position. A shadow beyond the aim point fires back toward it. Each finite, piercing flight owns its first-contact history: later actual enemy bodies take the reduced formula even if a spell shield blocked the first body. Pet contacts use their own health, classes and guards. Projectile walls destroy only the flights that cross them, and already released missiles continue after caster death. A shadow that expires before releasing its queued Q supplies no missile. W swapping during Q releases the original owner missile immediately and transfers the pending shadow cast to the owner's new position without a duplicate source.

Q and E contact ledgers identify the actual target, cast and source. Two distinct accepted sources must contact the same body for an energy refund, at most once across all bodies and sources for that cast. Shielded or parried copies do not count. Hitting one champion and an unrelated pet with different sources supplies no refund.

E prioritizes shadow slashes for spell shields. Only the first attempted slash can damage, including when a shield blocks it; later slashes carry zero-damage contact packets so their own guards, accepted contacts, energy refund and slow can resolve. The same first-attempt ledger applies when a copied E waits for a traveling W shadow. Accepted owner and shadow contacts determine base or enhanced slow. An accepted owner slash reduces W only for the actual contacted champion-class body. E does not create additional damage from multiple sources and preserves ordinary attack windups and walking.

R creates its source shadow immediately and prevents ordinary declarations during its untargetable delay/dash. The approach direction is taken at the end of the delay, so an enemy that crosses Zed during the delay is approached from its actual new side. The dash tracks real movement and ends untargetability at completion or interruption. Source cancellation before the dash removes only the R shadow and uses its static half-second cooldown. Mark application has its own spell-shield and targetability checks. Ordinary target resurrection clears an already applied mark and its pending ledger.

The mark sums accepted pre-mitigation physical/magic reports against that exact champion, including damage absorbed by shields and real basic/shadow damage. True damage, guarded packets, unrelated pets and the detonation itself never enter the ledger. Detonation uses current AD, continues after caster death, and keeps the duel pending until its scheduled impact. An acquired spell shield cannot block an existing mark. Attached untargetability permits the detonation; stasis, invulnerability and parry retain their ordinary damage guards.

Normal behavior reserves offensive R in hold/trade modes with R actually available. The common trade clock runs before optional offense, and completed trades retreat. W and R swaps are chosen only when they improve the current approach or retreat distance. Budget estimates price sourced Q/E, limited W copies, R base and a limited stored-damage opportunity; runtime receives no forecast damage or guaranteed contacts.

## Explicit limits

- The simulator remains one-dimensional. Every Q source uses its own scalar skillshot contact share; correlated lateral evasion and probabilistic branching among several sources are not represented. Actual geometric pet contacts remain separate full packets.
- W's minimum range is explicitly estimated by the primary. Its recast buff begins at declaration because the source's brief grant delay is unquantified; stationary shadow expiry still begins at actual placement. The documented occasional extra .25-second W lifetime bug is not randomized.
- Standard shadow sight is retained as source evidence; the model has no fog-of-war or independent sight circles. It grants no true sight of invisible enemies.
- Untargetable shadow HP, armor, radius and movement use structural placeholders because the source supplies no combat body and the shadow cannot be attacked. The two cosmetic silhouettes during R are not additional spell sources.
- The model has no structures, actual lane minion wave, summoner spells, external item actives or rune damage beyond existing simulator support. Their theoretical Death Mark contributions create no synthetic damage or preduel history.
- Commands are evaluated each simulator tick; queued recasts after an ordinary cast use the existing behavior scheduler. Source bug interactions involving externally supplied self-resurrection during R remain subject to the shared lifecycle model.

## Validation

`tests/kits/zed.test.ts` passes **56 focused tests**, including exact sources and formula guards; full 15,000-gold production searches in all six normal scenarios; exact reflected builds and scenario scores; passive impact thresholds, locks and real pet classes; source replacement, finite placement, expiry, swaps and post-death retention; Q pass-through, real first bodies, walls, guards and target-specific refunds; one E damage attempt with independent shield/slow resolution, including a queued shadow; mark timing, actual stored damage, shields, target resurrection, post-death impact, displacement, approach-side changes, and co-location facing. Mode fixtures pass the correct side to the actual perception function and make R eligible before checking hold/trade reservation.

The final focused result is `/workspace/counter-browser/batch9-zed-resumed-group-final.json` with its adjacent `.log`. Its production search writes `/workspace/counter-browser/batch9-zed-production.json`; the six reflected scenario differences are zero at the unchanged `1e-12` bound. The local TypeScript check passes. Batch-wide matrix, browser and delivery validation are tracked separately by the root release process.
