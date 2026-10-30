# Warwick implementation and evidence audit

Warwick uses real pre-basic passive damage, an independently scheduled Q bite, actual Blood Hunt recipients, and a champion-collision ultimate with a finite suppression channel. Healing observes resolved post-mitigation damage to the actual target, including health-based summoned bodies.

## Exact sources

| Slot | Pinned primary revision | Rules used |
| --- | --- | --- |
| I | [Eternal Hunger, 4051829](https://wiki.leagueoflegends.com/en-us/Template:Data_Warwick/Eternal_Hunger?oldid=4051829) | Level-scaled magic on-hit before ordinary damage, bonus AD/AP scaling, strict 50%/25% healing thresholds and increased healing. |
| Q | [Jaws of the Beast, 4007380](https://wiki.leagueoflegends.com/en-us/Template:Data_Warwick/Jaws_of_the_Beast?oldid=4007380) | Raw 0.2475-second bite delay, tap/hold attachment, health-ratio damage and monster cap, passive/on-hit ordering, post-mitigation healing, displacement immunity and post-effect cooldown. |
| W | [Blood Hunt, 4052302](https://wiki.leagueoflegends.com/en-us/Template:Data_Warwick/Blood_Hunt?oldid=4052302) | 50%/25% thresholds, 1.25-second AS, real champion trail marks, combat movement suppression/rebuild, 4000 active search from cast-start position and empty-search refund. |
| E | [Primal Howl, 4047663](https://wiki.leagueoflegends.com/en-us/Template:Data_Warwick/Primal_Howl?oldid=4047663) | Up to 2.75 seconds of reduction, one-second recast gate, real fear/slow contacts, reset and recast lockout, resurrection/expiry/R-triggered howls. |
| R | [Infinite Duress, 4052859](https://wiki.leagueoflegends.com/en-us/Template:Data_Warwick/Infinite_Duress?oldid=4052859) | Observed movement-speed range, declaration-time flight CC immunity, first champion collision, suppression, six weighted packets and three on-hit contacts, target-specific healing and interruptions. |

Each unchanged primary record retains its entire exact raw template in notes. Five supplementary spell objects retain exact object paths and complete selected arrays from the [16.20 binary](https://raw.communitydragon.org/16.20/game/data/characters/warwick/warwick.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `6dcba55865f26bc3ff20a8004be73b4414d514bf2e8fad46d430193a3301f0fb`. Primary W search radius and E duration override conflicting binary/client or stale blurb values. Q uses the exact raw `rutngt` delay without altering the parsed primary text. All consumed numbers are read during kit compilation.

## Runtime behavior

Eternal Hunger precedes ordinary basic damage and applies only when that contact's actual guards allow it. Its healing reads its own resolved post-mitigation packet at the current strict HP threshold. Grievous Wounds and normal healing modifiers remain in the shared healing path. Actual pet basics retain their own recipient ID and do not damage the owner. Hit-count, fixed-damage and instant-champion-attack objects do not manufacture health-based healing.

Q schedules an eight-tick bite independently of movement. Its passive/on-hit packet resolves before Q damage; its own healing excludes that passive damage. The bite remains committed after caster death or resurrection and retains target guards. Tap/hold follow actual relocation, cross terrain and receive displacement immunity. Root/ground deny initiating hold but preserve tap and do not interrupt an existing hold. Other accepted channel-interrupting CC ends attachment without erasing the bite. Hold can extend through a real target dash/displacement; cooldown starts after attachment. A target dying before the tapped bite refunds cooldown without refunding mana.

Blood Hunt begins without invented trails or prior damage. Qualifying basic/ability damage refreshes AS, while a new attack windup can grant a missing buff without refreshing one already present. The active snapshots its search origin at cast declaration and chooses the nearest real Champion-class body, including clones. No result pays cost and incurs only the sourced reduced cooldown. Trail marks and movement bonuses belong to their actual recipients, expire or clear by their conditions, and never legalize targeting an invisible unit. Champion combat suppresses trail speed for half a second before the sourced rebuild.

E supplies real damage reduction and independently guarded fear/slow contacts at the manual gate, expiry or accepted R channel. A manual recast counts as an activation and imposes its real attack/cast lockout; automatic triggers do not invent an activation. R-triggered howl retains the original reduction deadline. Each pet receives its own control guards and status state.

R range uses observed movement-speed samples from the preceding source window, rather than a fabricated prefight speed history. The leap contacts the first actual champion/Champion-class clone along its swept hitbox and ignores other target classes. Collision spell shield or CC immunity prevents the channel. Accepted suppression reveals the target and schedules six contacts, alternating two ninths and one ninth of total damage. The three larger contacts apply the actual passive/on-hit behavior. Own damage to this channel's actual target receives R healing, and R damage also applies life steal. A later spell shield does not block an established channel. Removing suppression leaves the channel striking without damage; caster CC, stasis, death/resurrection and target death/resurrection end the remaining contacts. A real R-triggered howl retains E reduction.

Hold/trade reserve an actually available R, and completed trade preserves ordinary retreat. Reference damage uses real cooldown and contact rates without prefight stacks, allied sources or invented minions.

## Explicit limits

- Neither pinned primary templates nor the binary supply a finite R dash speed. Flight is explicitly projected as one swept movement step after the sourced 0.1-second cast. Generic zero missile-speed metadata is not interpreted as a travel speed. This limits reaction timing during flight.
- The source's estimated post-miss slide has no complete timing rule and is not added as guessed travel. Singed-specific suppression immunity, zombie-state cutoff, summoner interactions and item triggers are not fabricated.
- Movement-speed samples use observed startup values only and the ordinary 30 Hz clock. The source's quarter-second sampling and contact deadlines round to simulation ticks.
- The duel has no ambient allied lane minions, structures, full fog/brush trails or lateral placement. Blood Hunt does not infer unseen allies' earlier damage. Explicit actual clone/champion recipients remain distinct from ordinary pets.
- Standard monster classification cannot infer every epic/size distinction. Only the primary's explicit generic monster cap is used.

The retained [Riposte revision 4007365](https://wiki.leagueoflegends.com/en-us/Template:Data_Fiora/Riposte?oldid=4007365) explicitly permits life steal and damage-based healing before its late damage negation. Healing therefore uses the resolved post-mitigation packet, including shields, while actual health loss and shield absorption remain separate for damage-triggered stacks, hunts and combat. Invulnerability and stasis produce no healing packet. Focused regressions cover unshielded and shielded Riposte without duplicate healing.

## Validation

Focused checks cover exact immutable evidence, full 15,000-gold six-scenario production against Darius and actual Heimerdinger pets, strict `1e-10` score reversal and exact builds, passive order/HP/healing/guards, real pet healing, delayed Q/attachment/death/resurrection/refunds, hunt origin/thresholds/visibility, E clocks/independent guards, R collision/weighted contacts/healing/cleanse/interrupts, branch isolation, actual ready R reservation and completed retreat. The new full-production checks retain the established 60-second per-test limit. All **59 Warwick checks** pass in the final combined **891-test** report `/workspace/counter-browser/batch10-focused-tests.json`, with zero failures or skips; full matrix, browser and private delivery verification are separate root release checks.
