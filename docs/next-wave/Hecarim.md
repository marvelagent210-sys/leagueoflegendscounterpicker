# Hecarim implementation and evidence audit

The simulator reads gameplay quantities from retained source records through `KitContext` during compilation. Primary pins and parsed numeric fields remain intact; supplemental evidence preserves complete raw templates and exact binary excerpts.

## Exact sources

- [Devastating Charge, revision 3959924](https://wiki.leagueoflegends.com/en-us/Template:Data_Hecarim/Devastating_Charge?oldid=3959924).
- [Warpath, revision 3985372](https://wiki.leagueoflegends.com/en-us/Template:Data_Hecarim/Warpath?oldid=3985372).
- [Rampage, revision 3989863](https://wiki.leagueoflegends.com/en-us/Template:Data_Hecarim/Rampage?oldid=3989863).
- [Onslaught of Shadows, revision 4007604](https://wiki.leagueoflegends.com/en-us/Template:Data_Hecarim/Onslaught_of_Shadows?oldid=4007604).
- [Spirit of Dread, revision 4061151](https://wiki.leagueoflegends.com/en-us/Template:Data_Hecarim/Spirit_of_Dread?oldid=4061151).

Supplementary game evidence is the [exact 16.20 Hecarim binary](https://raw.communitydragon.org/16.20/game/data/characters/hecarim/hecarim.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `b4274755f94e324f7200a1adf9c6a5bc808db6ade6a2f7176dcbac35fd46401e`. The records retain **6 attributed game objects** and **39 exact excerpts**, including complete arrays. Full pinned inputs and the strict exact-value audit are preserved outside source under `/workspace/counter-next-wave/batch10-audit`.

## Runtime behavior

Warpath samples actual final movement speed every quarter second and converts only the positive amount above base into bonus attack damage. Its keyed contribution participates in ordinary attack-damage conversions and reductions once. The duel starts without travel or Rampage history.

Rampage begins at zero stacks, snapshots its pre-hit stack damage across every contacted body, and gains at most one stack for a cast that actually damages health or a shield. Cooldown reduction follows the accepted new stack before haste. Actual minions receive the primary reduction; other pets use their own identity and area resistance. Eight-second expiry loses one stack, then one per second.

Spirit of Dread grants its sourced resistances and four one-second damage ticks. Its healing observes resolved damage to bodies currently in the area, including shield absorption. Hecarim's own damage heals at 25%; real allied pet basic and spell damage heals at 12.5%, including their damage resolved before late Riposte negation. The nonchampion allowance is shared across the actual minion and monster recipients of that activation. Invulnerable damage and health-counter props grant no fabricated healing.

Devastating Charge resets the real attack timer and builds its stepped movement multiplier from elapsed time and empowerment from actual traveled distance. The real next basic preserves its target, critical chance, ordinary on-hits and life steal, ignores blindness, and attempts separate guarded control. Dodge/block prevent damage while the knockback still attempts; spell shield and parry protect the complete activation. Root preserves the empowerment while allowing an ordinary basic. The extra range does not apply under root/ground. Terrain clips the approach and knockback; a blocked approach outside ordinary reach leaves the empowerment unspent. The source's explicit resurrection exception clears a pending charge.

Onslaught uses finite sourced travel and displacement immunity. The central spectral rider is an independent piercing missile, so projectile walls can stop its damage while the dash still reaches its fear endpoint. Released flight survives caster death; a dead caster supplies no arrival fear. Actual pet damage and control use pet-local statuses and coordinates. Co-location uses reflected facing. Ready R is reserved in hold/trade modes and completed trades retreat.

## Explicit limits and source conflicts

The primary Rampage duration of eight seconds wins over the binary's `RampageDuration` six; the binary `BuffDuration` eight remains retained. Spirit of Dread's primary one-second ticks win over binary `TickTime` 0.5, and the binary's additional healing-AD coefficient is retained without inventing a primary coefficient. Charge reaches its movement cap after the primary three seconds rather than binary 2.5. R uses primary speed, fear-distance scaling and timing rather than generic missile/cast metadata.

Neither source supplies a finite speed for E's attack dash or a duration for its knockback. These use an explicitly documented immediate guarded projection; a travel-time interruption window is unavailable. The scalar arena resolves the central R rider only. The four lateral riders and their formation remain source evidence; they do not multiply damage against the one target. Lateral evasion, fog/brush sight and terrain paths around obstacles are outside the one-dimensional model. No ally champion or lane wave is fabricated.

The retained [Riposte revision 4007365](https://wiki.leagueoflegends.com/en-us/Template:Data_Fiora/Riposte?oldid=4007365) explicitly permits life steal and damage-based healing before its late damage negation. Healing therefore uses the resolved post-mitigation packet, including shields, while actual health loss and shield absorption remain separate for damage-triggered stacks, hunts and combat. Invulnerability and stasis produce no healing packet. Focused regressions cover unshielded and shielded Riposte without duplicate healing.

## Validation

`tests/kits/hecarim.test.ts` passes **53 focused tests** in the final combined review report `/workspace/counter-browser/batch10-focused-tests.json` (**891 passed, zero failed or skipped**). Coverage includes full 15,000-gold production searches in all six scenarios, exact reversed builds and unchanged `1e-10` aggregate/scenario bounds; actual pet contacts and defenses; resource and cooldown windows; movement and terrain; source attribution; and ready-R hold/trade and completed-retreat behavior. Hecarim and Lee Sin also run all six scenarios against Heimerdinger's actual pets. Final batch-wide source freeze, complete matrix, serial suite, browser and private package validation remain separate root release checks.
