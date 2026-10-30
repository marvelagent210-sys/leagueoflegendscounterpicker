# Blitzcrank implementation and evidence audit

The simulator reads gameplay quantities from retained source records through `KitContext` during compilation. Primary pins and parsed numeric fields remain intact; supplemental evidence preserves full raw templates and exact object-scoped binary excerpts. Runtime packets use compiled values rather than reading source files during fights.

## Exact sources

- [Mana Barrier, revision 3908089](https://wiki.leagueoflegends.com/en-us/Template:Data_Blitzcrank/Mana_Barrier?oldid=3908089).
- [Overdrive, revision 3906572](https://wiki.leagueoflegends.com/en-us/Template:Data_Blitzcrank/Overdrive?oldid=3906572).
- [Power Fist, revision 4041159](https://wiki.leagueoflegends.com/en-us/Template:Data_Blitzcrank/Power_Fist?oldid=4041159).
- [Rocket Grab, revision 4026708](https://wiki.leagueoflegends.com/en-us/Template:Data_Blitzcrank/Rocket_Grab?oldid=4026708).
- [Static Field, revision 3956748](https://wiki.leagueoflegends.com/en-us/Template:Data_Blitzcrank/Static_Field?oldid=3956748).

Supplementary game evidence is the [exact 16.20 Blitzcrank binary](https://raw.communitydragon.org/16.20/game/data/characters/blitzcrank/blitzcrank.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `290a6b00f9a4615935bc1e8cd58ab6f31c417b76fb6351ce8bd121e429e7d187`. The retained strict source audit verifies **7 attributed game objects** and **7 exact excerpts**, including complete arrays. Full pinned inputs and read-only integrity reports are preserved outside source under `/workspace/counter-next-wave/batch11-audit`.

## Runtime behavior

Mana Barrier begins ready without preduel damage. Incoming post-mitigation damage first previews existing shields. When actual health damage reaches 30% maximum health, a shield equal to 35% maximum mana is created for up to ten seconds and starts its independent 90-second clock. The triggering packet bypasses the new barrier only for the portion above the health threshold; existing shields retain their normal priority. The threshold exception is consumed by that packet and does not leak into later hits.

Rocket Grab retains its declaration origin and direction. Its finite 1080-unit, 1800-speed missile uses the actual 70-unit collision radius and first eligible champion or damageable pet. The primary's narrow terminal rectangle extends the center check to 1115 units. The accepted recipient receives its damage and independent 0.65-second stun; if still alive, it is pulled toward the saved point 75 units in front of the original caster position. The pull uses actual pet coordinates and guards, clips an obstructed terrain endpoint and supplies standard sight. Displacement immunity does not remove the independent stun. Its cast locks are released after real contact or flight termination rather than after a fabricated hit.

Overdrive grants the source attack-speed and movement bonuses for five seconds. Movement decays linearly to its minimum over the primary's 2.9 seconds, retaining the full bonus on the first stat update, then applies the independently guarded 30% self-slow for 1.5 seconds.

Power Fist resets the actual attack timer and grants a five-second, uncancellable next-basic entitlement. Its bonus physical AD/AP packet follows critical modifiers once. A spell shield guards the whole empowered basic, including its ordinary damage and knockup; a target becoming untargetable during windup does not cancel the sourced enhanced hit. Its cooldown begins after the entitlement ends. Hit-count props do not acquire unsupported champion knockups.

Static Field queues one lightning bolt per real connected on-hit, including an attack blocked after valid contact. The target-local queue consumes one per second, with no invented three-stack cap. Its passive is unavailable during R's cooldown. The active checks the completion position, strips eligible actual damage shields even when a spell shield blocks its damage, and independently applies the source silence. Actual pets retain their own shields and marks. Fight behavior can use R offensively; hold/trade preserve it, fleeing uses Overdrive and completed trades keep the shared retreat priority.

## Explicit limits and source conflicts

Mana Barrier uses **maximum mana**, as the primary explicitly states. Static Field's primary and executable `PassiveDamage` calculation use 2% maximum mana; the binary's unused 5% `PassiveManaRatio` array remains evidence without replacing the executable formula. Overdrive's primary 2.9-second observed decay wins over binary `MoveSpeedModMinTime` 2.5.

Rocket Grab's terminal rectangle is projected onto the duel line; lateral misses and lateral terrain routing are unavailable. Power Fist's random short lateral displacement has no sourced deterministic lane direction, so the implementation retains one-second airborne with zero axial displacement. Structures, jungle plants, wards and ambient allied bodies are not invented. The allocator uses nominal passive and buff cadence; actual fights still spend mana and resolve cooldown, health and shield conditions.

## Validation coverage

`tests/kits/blitzcrank.test.ts` covers source attribution, threshold shielding and existing-shield order, finite grab travel and terminal checks, actual pet pulls, attack empowerment, Static Field queues and shield destruction, expiry, cloned state and ordinary modes. Its production cases exercise all six scenarios at the full 15,000-gold budget and strict reversed builds/scores. Shared threshold and projectile regression cases are in `tests/sim/batch11CombatContracts.test.ts`. Final batch-wide source freeze, matrix, complete serial suite, browser and private package checks are recorded separately by the release workflow.
