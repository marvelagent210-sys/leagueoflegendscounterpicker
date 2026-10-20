# Sivir and Twitch: pinned source audit and implemented contracts

Both modules use the repository's level-20 statistics and maximum ability ranks. All numeric reads are recorded by the strict kit compiler before its context is sealed; combat hooks use the resulting constants rather than reading or fetching source data.

| Champion | Passive | Q | W | E | R |
| --- | ---: | ---: | ---: | ---: | ---: |
| Sivir | 3985850 | 4068684 | 4062258 | 3788826 | 3936364 |
| Twitch | 4062255 | 3982645 | 4012250 | 3907215 | 4063223 |

Wiki evidence links retain exact page/revision identities, for example [Ricochet 4062258](https://wiki.leagueoflegends.com/en-us/index.php?oldid=4062258) and [Spray and Pray 4063223](https://wiki.leagueoflegends.com/en-us/index.php?oldid=4063223). Additional game evidence has independent attribution to version **16.20.8248524+branch.releases-16-20.content.release**, object path and full-file SHA-256:

| Champion | Versioned game file | SHA-256 |
| --- | --- | --- |
| Sivir | [sivir.bin.json](https://raw.communitydragon.org/16.20/game/data/characters/sivir/sivir.bin.json) | `e41dd51b70b5a334fe7b149ce9f9566ba620e225521e3e9b0b7ebf0597d72700` |
| Twitch | [twitch.bin.json](https://raw.communitydragon.org/16.20/game/data/characters/twitch/twitch.bin.json) | `9062e3836d1c8e06a571bc0ea55480bf0324ef872ef595c2127e7b0f6789a843` |

## Sivir

Fleet of Foot gives **75 flat movement speed**, decaying linearly over **1.5 seconds**. An actual champion basic-attack declaration grants it even if the subsequent attack is blinded, dodged or blocked. Champion spell contacts also grant it through spell shields. Attacking a summon does not grant this champion-only passive.

| Spell | Maximum-rank result | Cooldown | Cost | Delivery |
| --- | --- | ---: | ---: | --- |
| Q | 160 + 70% bonus AD + 60% AP physical per pass | 8 s | 75 | 1250 range; outgoing speed 1450/width 180; return speed 1200/width 200 |
| W | 40% bonus AS for 4 s; each bounce 50% AD physical | 12 s | 60 | Basic missile speed 1750, bounce speed 1000, bounce search 500 |
| E | One spell shield for 1.5 s; successful block heals 80% AD + 50% AP | 18 s | None | Instant self effect; successful-block heal/passive after 0.25 s |
| R | 30% movement speed for 12 s; each basic declaration refunds 0.5 s from Q/W/E | 80 s | 100 | Instant self effect; no additional allied champion exists in the duel |

Boomerang Blade has two actual traveling passes, each with its own contacted-target sets, spell-shield check and wall interception. It uses the cast-end origin and declared direction. The return follows Sivir's current position and can continue after she dies. Only actual nonchampion contacts reduce later damage on a pass, by **15 percentage points**, down to **40%**. Return starts at full damage. Champion contacts do not increment this falloff.

The game calculation explicitly multiplies Q damage by **1 + 0.4 × critChance × (critDamage − 1)**. This is not a full ordinary critical strike. The raw wiki cast table supplies **0.25 × (1 − min(0.6, 0.5 × bonusAS))**, with matching pinned game parameters and a nominal **0.1-second** minimum. The rendered snapshot of that revision contains a conflicting note claiming **0.198 seconds at 99.8% bonus AS**; its raw note uses the game-tick template `rutngt` with argument `0.1875`. The model uses the explicit table formula and records this unresolved tick-note conflict. Return sidestep share is evaluated at turnaround using actual geometry, without an additional branch.

Ricochet resets the basic timer only on an inactive-to-active W cast. Each actual enhanced basic contact can launch a chain through real nearby enemies; there is no free second hit against a lone champion. Chains prioritize the nearest previously untouched target before repeats, allow at most two contacts per target including the primary, and launch at most eight bounces. Unseen targets remain eligible. Bounces retain the initiating attack's expected crit outcome, apply no additional basic on-hits/life steal, and ignore spell shields. The sourced **65% minion damage factor** applies to modeled ordinary summons; unsupported unit subclasses are not invented.

**Unresolved source interaction:** the exact Ricochet template explicitly marks interactions with dodge, block and blind as “Pending for test”; its parry flag is “unknown.” The implementation permits the bounce search after an actual primary projectile contact even when that primary attack is denied, and resolves bounces as proc ability damage. Ordinary primary basic defenses and independent projectile walls still work. This policy remains an interpretation, not a certified live-client interaction.

E healing is triggered by the shared successful spell-shield-consumption event, checking the actual consumed own E status. Expiration grants no heal. Its heal and passive happen together eight simulation ticks later, representing the sourced quarter second on the 30 Hz clock. R refreshes its own existing buff on an actual qualifying counted champion kill, without stacking movement buffs; summon kills cannot refresh it. Allies and assisted takedowns are absent from this two-champion model.

The budget includes both Q passes with critical scaling and W's capped attack-speed uptime. It assumes one eligible E block/heal per nominal cooldown and no artificial Ricochet target lane or repeated champion takedowns. Its reference does not credit the combat-dependent R cooldown refunds.

## Twitch

Deadly Venom has target-local stacks and clocks. A successful basic on-hit applies one stack, up to **six**, and refreshes the shared **six-second** expiry without restarting the established one-second pulse phase. At level 20, each stack deals **5 + 3% AP true damage** per tick. The source labels this a poison and proc damage over time, without spell effects. AP is read when venom is applied/refreshed. Blind, dodge and parry prevent its application; ordinary attack-damage blocks retain on-hit poison semantics. Spell shields do not deny an ordinary basic on-hit. Each actual summon owns its own statuses; hit-count/fixed-damage props receive no unsupported poison. The explicit passive identity allows already applied venom to continue after Twitch dies.

| Spell | Maximum-rank result | Cooldown | Cost | Delivery |
| --- | --- | ---: | ---: | --- |
| Q | 1 s fade, up to 14 s camouflage; 10%/30% conditional MS; 60% AS for 6 s on exit | 16 s after effect | 40 | Instant activation; 500-unit champion detection from pinned game data |
| W | Initial poison stack plus three one-second field applications; slow 50% + 6% per 100 AP | 9 s | 70 | 0.25 s cast, 950 range, speed 1400, radius 300, 3 s field |
| E | 60 + stacks × (35 + 35% bonus AD) physical, plus stacks × 35% AP magic | 8 s | 90 | 0.25 s cast, 1200 center range, independently shieldable targets |
| R | 60 AD and 300 range for 6 s; piercing basic bolts | 90 s | 100 | Instant buff, bolt speed 5000/width 120, travel 1100 plus other bonus range |

Ambush permits normal actions during the fade. Entry cancels an ordinary pending basic attack; stasis postpones entry. Camouflage detection is distinct from ending Ambush: entering 500 units removes concealment but retains the active duration, and moving back out hides Twitch again. True sight still reveals him. Its 30% movement bonus requires facing an enemy within 1000 who cannot see him; otherwise the bonus is 10%. An attack breaks entered camouflage at declaration; W/E break it at cast declaration, whereas R preserves it. A venom-afflicted actual champion death resets Q; pets grant no reset.

Cask has actual finite travel and can be destroyed before landing by a projectile wall. The landing application is separately spell shieldable. Its three later poison pulses and refreshed occupancy slow persist at the landing position and bypass spell shields. A launched Cask and its fields continue after Twitch dies, and the resulting venom can change the outcome to a delayed draw. Their finite expiry prevents the fight waiting forever. The slow refreshes separately each tick, preventing extra poison applications. Summons receive the same independent spatial checks and their own shield state. The ability grants ordinary sight, not true sight. Suppression during the declared cast prevents launch.

Contaminate requires at least one actual nearby poisoned enemy, snapshots each target's stack count at cast start, then rechecks range at completion. An unseen target is eligible, without a reveal. The target's own spell shield blocks the complete mixed packet. Poison is neither consumed nor refreshed. The combat policy waits for six stacks, imminent poison expiry, a lethal opportunity or range loss; it does not cast repeated zero-stack E packets.

Spray and Pray uses an actual piercing basic missile rather than a homing attack or instantaneous AoE spell. It snapshots direction, blindness and critical chance at attack declaration and preserves ordinary basic on-hits, life steal, block/dodge/parry defenses and independent summon state. Its original target can sidestep or move off the line. The shared hit model branches on decisive uncertainty while branch capacity remains, then uses expected shares for both ordinary and on-hit damage and venom stacks. The champion's dodge chance always comes from that champion, including when the attack was aimed at a stationary pet; pets retain independent whole contacts. Actual successive targets reduce ordinary attack damage to **100/90/80/70/60%**, with full on-hit effects at each contact. Projectile walls remove all later contacts. There are no invented collateral targets.

The game attack object's missile speed is **4000**, conflicting with the explicit ability-page **5000**. This implementation retains the pinned ability-page speed and records the discrepancy. The one-dimensional arena cannot reproduce angular bolt placement, map structures, fog tactics or every item-specific interaction.

The budget adds capped Q attack-speed uptime, R AD uptime, poison buildup and independently typed E scaling. Reference stacks are capped at six and estimated from attack speed plus four sourced Cask applications per nominal cycle, averaging the buildup across the poison window. This remains a reference for stat allocation: actual stack buildup, mana exhaustion, concealment, hit chance and field exposure are resolved by combat.

## Verification

`tests/sim/sivirTwitchAccuracy.test.ts` checks source identity, both boomerang passes, independent shields/walls/falloff, declared passive timing, successful/expired E, real Ricochet targets, R refunds, poison phase/expiry and target ownership, E snapshot/range behavior, camouflage detection/true sight/stasis, Cask pulse counts/fields/summons, actual R replacement/attenuation/defenses, mobile champion branching and exhausted-branch expected shares. Actual death regressions exercise both launched Sivir Q passes, venom's delayed draw, and Cask's full four applications when Twitch dies during travel or after landing. The focused suite passes **71 tests**. Ordinary combat policies must deal damage and use legitimate spells without hidden helper cast loops. Batch-wide allocation, reflection, matrix, browser and delivery evidence is recorded separately after integration.
