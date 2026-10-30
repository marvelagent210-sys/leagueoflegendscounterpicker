# Vi implementation and evidence audit

Vi's Q is a real charge and release, E modifies an actual basic attack, and Denting Blows belongs to the actual champion or summon hit. Cease and Desist tracks its committed target through its pursuit and grab phases.

## Exact sources

| Slot | Pinned primary revision | Rules used |
| --- | --- | --- |
| I | [Blast Shield, 4064865](https://wiki.leagueoflegends.com/en-us/Template:Data_Vi/Blast_Shield?oldid=4064865) | 10% maximum-health shield for three seconds, level-based static cooldown, four-second Denting refund and Q's spell-shield exception. |
| Q | [Vault Breaker, 3921391](https://wiki.leagueoflegends.com/en-us/Template:Data_Vi/Vault_Breaker?oldid=3921391) | Four-second mobile charge, 15% self slow, full charge after 1.25 seconds, release scaling, half-mana refunds, three-second interrupted cooldown and actual swept contact. |
| W | [Denting Blows, 3932548](https://wiki.leagueoflegends.com/en-us/Template:Data_Vi/Denting_Blows?oldid=3932548) | Four-second target-local stacks, third-hit maximum-health proc before 20% armor reduction, attack speed, nonchampion cap and blind/dodge exceptions. |
| E | [Relentless Force, 3986710](https://wiki.leagueoflegends.com/en-us/Template:Data_Vi/Relentless_Force?oldid=3986710) | Two charges, real basic reset and uncancellable windup, six-second empowerment, bonus range, modified damage/critical bonus, one primary W stack and separately shielded secondary cone. |
| R | [Cease and Desist, 4004943](https://wiki.leagueoflegends.com/en-us/Template:Data_Vi/Cease_and_Desist?oldid=4004943) | 800 cast range, relocation tracking, initial 800 speed, grab within 300, timed damage/control, displacement immunity, secondary contacts, terrain landing and cancellation exceptions. |

Complete raw revisions remain in supplemental sources without replacing primary fields or pins. The supplementary [16.20 binary](https://raw.communitydragon.org/16.20/game/data/characters/vi/vi.bin.json) uses version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `eb1a916d530dd1c8c8f96d9fdeffca172414a19d22c37d74aac35ad0a5ea4070`. Relevant ability, proc, buff, attack, dash and secondary-contact objects are retained as exact JSON excerpts, including complete arrays. The cone's binary 35-degree angle is attributed, while primary geometry and timing remain authoritative where they conflict with older indicators. Numeric values are consumed only during compilation.

## Runtime behavior

Blast Shield starts ready and Denting starts empty. An accepted Q/E/R contact can grant the shield; W cannot. Q's spell-shield exception remains distinct from parry and untargetability. Each actual third W stack refunds the current passive cooldown. The original primary level cap overrides the binary's extra high-level breakpoint.

W stores and refreshes each actual target's stacks for four seconds. Its third stack consumes them and deals the physical proc before armor reduction. The nonchampion cap is applied using the actual target class; an explicitly Champion-class clone is distinct from a minion or unclassified summon. Real pet statuses are synchronized before secondary packets, so consumed stacks cannot reappear. Structures, wards and hit-count/fixed-damage objects receive no fabricated W marks. The primary's blind/dodge exception applies to W without allowing the missed ordinary basic's damage.

Q pays its real cost, starts a mobile interruptible charge, and applies the sourced self slow. Explicit release interpolates damage, range and speed up to the full-charge threshold. Timeout and accepted interrupts refund half the mana with their distinct cooldown rules. Root/ground interrupt a live charge only when the control is actually accepted; immunity does not create a false interruption. Release sweeps actual body hitboxes, passes nonchampions, stops on Champion-class bodies even under spell shield, and uses target-local repeat locks. The sourced 50-unit terrain allowance requires a clear endpoint. Knockdown can end travel before contact.

E preserves the ordinary basic's actual declaration, windup, target and on-hit application. The modified physical packet replaces ordinary AD damage, receives the primary's AD critical bonus, and applies life steal. An ordinary on-hit is still applied once. Only the primary receives W; actual secondary bodies in the forward projected cone receive independently guarded spell packets. A primary spell shield does not erase E's basic damage, while a secondary shield blocks that secondary contact. Two real charges and their recharge clock remain separate from the short post-effect static cooldown.

R validates target range, visibility and targetability throughout its cast before paying cost. Released pursuit tracks relocation and reveals the target. Entering grab range applies independently guarded airborne and schedules damage 0.75 seconds into the estimated 1.05-second grab. Terrain decides whether Vi can land on the opposite pathing boundary. She has displacement immunity, rather than general CC immunity: stun still applies while the committed dash continues. E can overlay the grab; ordinary attacks are locked. Actual secondary bodies along the swept path receive one independently guarded packet and their own repeat lock.

Death stops further R damage and releases its targeting states. Resurrection during the cast cancels before cost; resurrection during pursuit retains the primary's seven-second displacement-immunity bug. That exception is resolved after the actual resurrection state is installed, because the shared dash-end callback precedes it. The source's long-distance cancellation has the same explicit linger. Ordinary hold/trade reserve a truly ready offensive R; completed trade keeps retreat priority.

## Explicit limits

- The sources give Q's airborne duration but no numerical champion knockback distance or nonchampion pull distance/duration. Those movements are not invented.
- R's acceleration curve is unpublished. Travel uses its sourced initial 800 speed; unrelated generic binary missile speed is not substituted. Grab duration and long-distance cancellation threshold retain their source's estimated status.
- R secondary displacement is lateral. Its control/damage are implemented without assigning a fictitious forward displacement on the duel axis.
- The primary's brief forced walk after an untargetable target has no finite duration. Pursuit cancels outside grab range; inside range it can apply airborne without damage, as stated by the primary.
- Cone width, player summoner blinks, Urgot-specific execution and allied lane bodies are outside this scalar duel. No preloaded stacks, kills or charges beyond the ability's actual starting stock are supplied.

## Validation

Focused checks cover exact evidence and failure guards, full 15,000-gold six-scenario production with strict `1e-10` reversal and exact builds, actual target classes/stacks, blind/dodge/block distinctions, charge/resource/refund/CC/terrain clocks, actual empowered basics and cones, charges, R relocation/guards/secondary contacts/death/resurrection, ready ultimate reservation and completed retreat. Final focused results are recorded with Wukong and Warwick outside the repository in `/workspace/counter-browser/batch10-back-review-shared-final.json`. The root workflow separately validates the full matrix, production browser and private download.
