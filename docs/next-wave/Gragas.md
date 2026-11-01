# Gragas implementation and evidence audit

The simulator reads gameplay quantities from retained source records through `KitContext` during compilation. Primary pins and parsed numeric fields remain intact; supplemental evidence preserves full raw templates and exact object-scoped binary excerpts. Runtime packets use compiled values rather than reading source files during fights.

## Exact sources

- [Barrel Roll, revision 3907002](https://wiki.leagueoflegends.com/en-us/Template:Data_Gragas/Barrel_Roll?oldid=3907002).
- [Body Slam, revision 4007602](https://wiki.leagueoflegends.com/en-us/Template:Data_Gragas/Body_Slam?oldid=4007602).
- [Drunken Rage, revision 4013236](https://wiki.leagueoflegends.com/en-us/Template:Data_Gragas/Drunken_Rage?oldid=4013236).
- [Explosive Cask, revision 3906845](https://wiki.leagueoflegends.com/en-us/Template:Data_Gragas/Explosive_Cask?oldid=3906845).
- [Happy Hour, revision 3985369](https://wiki.leagueoflegends.com/en-us/Template:Data_Gragas/Happy_Hour?oldid=3985369).

Supplementary game evidence is the [exact 16.20 Gragas binary](https://raw.communitydragon.org/16.20/game/data/characters/gragas/gragas.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `c8f2dd383f9e220c90ab63b9de9db5fbc97c1751ab2141f243cafdc8074863dc`. The retained strict source audit verifies **10 attributed game objects** and **301 exact excerpts**, including complete arrays. Full pinned inputs and read-only integrity reports are preserved outside source under `/workspace/counter-next-wave/batch11-audit`.

## Runtime behavior

Happy Hour begins ready and heals only when a real Q/W/E/R cast completes, using the independent six-second static clock. Barrel detonation is not a second activation. Idle time, failed deliveries and readiness alone grant no healing; ordinary received-healing modifiers apply.

Barrel Roll pays its cost and starts its hasted cooldown at declaration. After the real cast lock, a finite nonhoming cask flies to the requested ground point. Arrival alone arms the manual recast and starts its four-second lifetime. Damage and slow ferment linearly for two seconds from the primary minimum to maximum. Detonation checks each real recipient's class, area resistance, spell shield, parry and damage defenses; the primary damage reduction belongs only to minions. Manual detonation and automatic expiry resolve the same explosion once. Released ground casks can persist through death/resurrection and expire without a living caster holding a button.

Drunken Rage is a mobile, interruptible 0.75-second channel that prevents attacks and other spell casts. Damage reduction starts immediately and includes the drink. Successful completion grants a five-second, uncancellable real next basic with the source bonus range. Its ordinary AD critical packet, on-hits and life steal remain one basic. Before those effects, a separate area packet checks bodies around the attacked recipient, using each one's maximum health. Only the maximum-health term is capped against monsters. The bonus packet neither crits nor life steals. Blindness, dodge, block and parry on the primary deny the area trigger; a spell shield blocks only its own bonus magic packet while preserving eligible ordinary damage and independent secondary recipients. Spending, expiry or channel interruption starts the post-effect cooldown.

Body Slam moves the actual caster at primary 910 speed and tests swept collision with the first actual enemy champion or pet. A real collision stops movement even if damage is denied, then checks nearby recipients independently for damage, displacement and stun. Displacement immunity does not remove the independent stun. Contact refunds 40% of the current hasted cooldown once. Its final forward lollipop checks only a normal arrival. Q and R can overlay E, while W and another E cannot; interruption, death or resurrection cannot fabricate arrival damage.

Explosive Cask locks casting for 0.25 seconds and flies to the selected ground center over exactly 0.5 seconds, independent of intervening bodies. Projectile destruction cancels the pending explosion. At landing each actual enemy independently receives damage and a 900-unit push away from the explosion center. The displacement uses the shared control, black-shield and terrain guards; exact epicenter overlap uses the saved throw direction for reflection. Sight lasts one second without inventing a reveal debuff. Released flight can survive death/resurrection, while an unfinished cast cannot launch during resurrection.

The ordinary policy drinks before close combat, prefers full barrel fermentation unless the target is leaving, aims E backward while fleeing and aims R behind the enemy to push inward. Hold/trade preserve a ready R, and completed trades retreat first. Ground explosions use their actual centers for directional defenses rather than the caster's later position.

## Explicit limits and source conflicts

Primary E 910 speed, instant cast and 30-unit forward lollipop take precedence over binary 900, 0.25 and 40 metadata. Primary R 1000 range and 400 radius take precedence over binary 1050 and 350. Drunken Rage's primary channel timing takes precedence over unrelated binary cast-time metadata.

Neither primary nor exact E record quantifies Body Slam's knockback distance or duration. It uses a guarded zero-distance immediate displacement to represent interruption, plus the independently sourced one-second stun; it does not invent a knockback offset or airborne time. R specifies 900 distance but no travel duration, so the model uses an explicitly immediate, terrain-clipped displacement without invented airborne duration. These approximations can affect displacement-sensitive interactions.

Barrel Roll carries the ordinary scalar sidestep estimate from its cast-completion geometry through fermentation; manual recast does not create a fresh stochastic branch. W's source ward/structure exceptions remain evidence, but no simulated structure is relabeled from an arbitrary pet. The one-dimensional arena has no lateral wall route, allies or fabricated lane wave.

## Validation coverage

`tests/kits/gragas.test.ts` covers exact evidence and source conflicts, state cloning, Happy Hour cadence, arrival-gated and single-resolution barrels, fermentation, channel interruption, critical/basic/area separation, actual pet classes and defenses, swept dash/refund behavior, ground-origin defenses, cask displacement and ordinary modes. Production cases exercise all six scenarios at 15,000 gold, exact reversed builds, strict scores and actual Heimerdinger pets. Final batch-wide source freeze, matrix, complete serial suite, browser and private package checks are recorded separately by the release workflow.
