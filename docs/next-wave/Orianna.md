# Orianna implementation audit

Orianna is implemented for expansion batch 14 using the repository's patch 26.20 / Data Dragon 16.20.1 inputs, at level 20 and maximum ability ranks. This audit describes her implementation and its declared boundaries; registration and whole-release validation are tracked separately.

## Pinned primary evidence

| Record | Revision | Runtime facts |
| --- | ---: | --- |
| [Clockwork Windup](https://wiki.leagueoflegends.com/en-us/Template:Data_Orianna/Clockwork_Windup?oldid=4026443) | 4026443 | Ball command lock, estimated leashes and pickup, actual-target attack stacks, supplied level-20 series |
| [Command: Attack](https://wiki.leagueoflegends.com/en-us/Template:Data_Orianna/Command:_Attack?oldid=3995779) | 3995779 | Q damage and reduced packet, range, movement, landing, buffering and blocker caveat |
| [Command: Dissonance](https://wiki.leagueoflegends.com/en-us/Template:Data_Orianna/Command:_Dissonance?oldid=3958109) | 3958109 | W pulse, stationary movement field, exposure and exit decay |
| [Command: Protect](https://wiki.leagueoflegends.com/en-us/Template:Data_Orianna/Command:_Protect?oldid=3804030) | 3804030 | Possession armor/MR, actual ally, transit damage, shield arrival, invalidation and interception |
| [Command: Shockwave](https://wiki.leagueoflegends.com/en-us/Template:Data_Orianna/Command:_Shockwave?oldid=4026444) | 4026444 | R completion emitter, damage, stun, fixed displacement and conflicting terrain wording |
| [Orianna / The Ball](https://wiki.leagueoflegends.com/en-us/Orianna?oldid=3892665) | 3892665 | Untargetable utility classification, terrain immunity, attachment and instantaneous return |

Every full raw ability revision is retained as a same-pin source supplement and note. The complete Ball article is retained in its pet record's `text.fullRawRevision`. All existing primary fields, numerical series, notes and parsed pet values remain intact. No newly fetched current page replaces a pinned revision.

The exact supplementary binary is [Orianna's 16.20 game file](https://raw.communitydragon.org/16.20/game/data/characters/orianna/orianna.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `6d24efd8a5dd4beed5c83765e3e045e0bad4a6c9a9f0e2e58b041d0a51992c4c`. Thirteen complete top-level spell objects are retained with URL, release, hash and exact object path:

- `OriannaPAbility/{OriannaP,OriannaPSelf,OriannaPStack}` retains the passive's actual named stack count, duration and AP calculations.
- `OrianaIzunaCommandAbility/{OrianaIzunaCommand,OrianaIzuna}` separates current command damage calculations from the real Q carrier's 80 half-width, 1400 speed and nontracking movement. The game command identifiers use **Oriana**, with one n.
- `OrianaDissonanceCommandAbility/{OrianaDissonanceCommand,OrianaDissonanceAlly,OrianaDissonanceEnemy}` retains the named field and `SlowAndHasteDuration` values and actual recipient records.
- `OrianaRedactCommandAbility/{OrianaRedactCommand,OrianaRedact,OrianaRedactShield}` retains command resistance/shield/damage values and the actual 1850-speed carrier.
- `OrianaDetonateCommandAbility/{OrianaDetonateCommand,OrianaStun}` retains the named 415 `AoERadius`, independent 0.75 stun and 0.5 cast clock.

These are object-scoped source records, not guessed server behavior. The strict independent check `Orianna-promoted-integrity-first.json` verifies five ability pins, one pet pin, all six full raw texts, one exact binary and all thirteen complete object excerpts with Decimal parsing and no tolerance.

## Source values and clocks

| Component | Maximum-rank / level-20 result |
| --- | --- |
| Basic passive | `54.7058823529412 + 0.15 AP` magic on-hit; same-target subsequent hits add 15%, then 30%; four-second refresh |
| Possession | 30 armor and 30 MR to the actual attached host; independent of any shield |
| Ball | Estimated center leash 1290 on ground, 1355 on ally; pickup 135; global command lock 0.01 seconds; leash snap imposes at least 0.75 seconds until R can start |
| Q | `180 + 0.55 AP` first actual body; `126 + 0.385 AP` after first; mana 35; cooldown 3 seconds; 825 declaration range; 1400 movement; full flight width 160; 175 center landing radius; minimum 150 displacement when initially attached to self |
| W | `230 + 0.80 AP`; mana 80; cooldown 7 seconds; 225 center radius; stationary field 3 seconds; 40% haste/slow; linear two-second exit tail |
| E | `180 + 0.30 AP` transit damage; arrival shield `195 + 0.45 AP` for 2.5 seconds; mana 60; cooldown 9 seconds; 1120 declaration range; separately sourced 175 completion forgiveness; 1850 speed; full travel width 160 |
| R | `475 + 1.10 AP`; mana 100; cooldown 80 seconds; 0.5-second cast; 415 center radius; independent 0.75-second stun; fixed 325 displacement toward and potentially across the Ball |

The supplied passive level-20 series is used directly. It is not clamped to 18 or extrapolated a second time. The 0.01-second global lock becomes one simulation tick. The radius and width conventions are explicit in the tests: Q's flight includes real target hitboxes; its 175 landing, W's 225 field and R's 415 pulse use target centers.

## Ball and command lifecycle

The Ball is one branch-local utility state with self attachment, actual ally attachment, ground, Q transit and E transit states. It is not spawned as a damageable pet with invented health or collision size. Every emitted spell uses its actual Ball position. Actual movement notifications synchronize self and allied host coordinates before later commands in the same tick, including forced movement and blinks. They enforce the actual leash and ground pickup without replaying field refresh or buffered commands. An in-progress R separately retains its captured host coordinate through an ownership snap and a later same-tick host death. Possession bonuses disappear synchronously on departure and apply only to the actual attached host. They remain after E's shield expires or breaks.

Q begins at the current Ball, rather than Orianna's body. It orders real path contacts, including hostile pets, and deduplicates them against the same cast's landing. The first actual contacted body consumes the full-damage entitlement even if its spell shield or parry denies damage. Later bodies receive 70%; a nearby landing victim that was not struck on the path can receive its one packet. Generic skillshot probabilities and ordinary finite branches are retained for substantial damage; the actual path and landing opportunities remain independent at the finite model's stated geometry boundary. Pet contacts do not inherit the champion's hit/miss branch.

E defaults to Orianna. Its explicit ally control selects only a real living targetable Champion-class allied body inside the declaration range. The pinned stealth exception uses a local allied-invisibility policy. Its transit follows the actual host position, damages actual hostile bodies it crosses once each, and grants its shield only on arrival. Recasting onto the already attached host refreshes one same-source shield without a global Ball command lock; it does not stack the old shield. The refresh synchronizes an actual pet's authoritative status array before applying the replacement. Other sources' shields and statuses are preserved.

A host that dies or becomes untargetable, enters stasis or disappears before arrival causes E to snap home without an arrival shield. A host that dies after attachment leaves the Ball at its last actual observed position. An E intercepted by a directional defense resolves its actual collision before snapping; destruction before contact supplies neither contact damage nor arrival shield. Q uses its separately documented blocker policy below.

W and R cannot execute in Q transit. The explicit free `W-buffer` and `R-buffer` controls request the real spell after arrival. A request does not count as a cast, pay mana, start the spell cooldown or release an early remote pulse. The real declaration still requires ordinary resources, cooldowns, action and CC permissions. E disables all other commands while its own transit is active. Snapping, owner death/resurrection or insufficient arrival mana discard pending buffer requests.

R captures the actual host identity at declaration and uses that host's completion position, including the primary's beyond-leash exception after ordinary Ball ownership snaps home. Ground and self positions remain distinct. Spell shield, parry and untargetability guard the actual pulse. Its independent stun remains valid when displacement immunity denies movement. The fixed displacement can cross the Ball center, stops on the chosen terrain boundary, and respects actual recipient defenses. Its uncertain control packet uses a real delayed-area finite branch; actual pets keep independent full area packets.

## Movement field and attack state

W's field stays at its creation coordinate when a subsequent command moves the Ball. A real recipient's last accepted exposure controls its exit clock. The latest own-source slow replaces earlier own-source refresh records, while other sources remain intact. Tenacity shortens the accepted hostile exit clock; the implementation does not repeatedly create a new two-second slow after exit. Removing the slow after exit does not cause it to reappear. Re-entry restores full strength. Actual allied recipients receive the sourced speed bonus and their own exit tail without fabricating a teammate.

Passive stacks begin empty. A first connected on-hit uses baseline damage, the next same-body hits use 115% and 130%, and the count caps at two. The exact four-second target-local deadline is tested. Actual hostile pets have distinct identities; switching bodies does not borrow previous target stacks. Blind, parry, dodge and blocked contacts do not grant stacks. Structure entities are outside this arena.

## Reference allocation and action policy

The generic attack evaluator already prices the baseline passive. Orianna's custom reference hint adds only its 30% maximum-stack increment, preventing a duplicated full passive contribution. A numerical sourced DPS regression independently checks this combination. Q includes its 825/1400 reference transit time in addition to hasted cooldown, while W and R retain their independent source clocks. E prices one self arrival shield per hasted nine-second cooldown. It supplies no invented ally value, guaranteed E transit hits or permanent remote possession resistance.

Actual combat does not receive free reference packets. It still needs mana, real Ball travel, contacts, shield arrival and possession. Behavior can return E for a real incoming threat, place Q for a nearby W/R, buffer during actual Q transit, and use ordinary attacks between commands. Fresh R is reserved outside fight mode. Completed trades retreat before optional spells. Idle creates no spell or ally history.

## Remaining source and model boundaries

- The primary passive gives estimated ally leash **1355**, whereas E's note says the standard leash increases by 100, implying **1390**. The implementation explicitly chooses the primary's 1355 estimate and preserves both statements.
- Q's Yasuo-versus-Braum note is explicitly pending for test and leaves Blade Whirl uncertain. This model lets an actual projectile wall drop Q at its crossing, without a landing packet, and lets Q pass interception/destruction auras. E follows ordinary actual wall, aura and directional interception rules. This is a visible source boundary, not a claim that the Q ambiguity was resolved.
- R's description says it cannot move targets through terrain; its note says it can. This implementation follows the description's terrain blocking. The note remains preserved.
- No finite R toss duration is supplied. A fixed 325-unit guarded movement uses one simulation tick, with its separately sourced 0.75-second stun. No unsourced trajectory duration is assigned from the stun clock.
- Owner-death/resurrection Ball behavior is not established by the staged primary records. This implementation cancels pending Ball commands and resets possession rather than inventing new post-death casts. The declaration and released-packet boundary is tested and remains an explicit assumption.
- Both haste and slow use the binary's named two-second `SlowAndHasteDuration`. Field exposure is refreshed each simulation tick; the source does not supply an exact server refresh cadence.
- Q command `castRadius:145`, carrier `castRadius:220`, and old anonymous carrier damage arrays do not replace the named primary landing radius or current command damage. E command and carrier speed metadata differ; the actual primary/carrier 1850 value is used. R targeter radius 410 and command `castRadius:20` do not replace the named gameplay radius 415.
- One-dimensional geometry cannot reconstruct correlated lateral dodges, arbitrary ally placement or all field occupancy paths. Utility sight is attributed by source, but no hidden map entities or extra combat targets are created.

## Actual regression evidence

`Orianna-boundaries-complete-fourth-command.json` records an actual unchanged-source run of the complete Orianna test file: **93 passed, 0 failed, 0 skipped**, exit 0. The proof pins hashes for the module, tests, abilities and pet record before and after execution, plus the actual JSON report and log hashes.

The checks include source integrity, arrival and possession, command locks, deferred buffers, path/landing ordering and deduplication, projectile distinctions, invisibility and invalid actual allies, shield refresh, moving-host R completion, terrain and immunity, source-local field refresh/expiry/tenacity/dispel, target-local passive stacks, finite Q/R branches and independent real pets. The complete run includes ordinary 15,000-gold six-scenario Darius matchups in both directions, exact reversed builds, finite outcomes, complete spending and unchanged `1e-10` score/scenario reflection tolerance.

Earlier actual failures remain in the separate first/second/third reports. They exposed fixture mistakes and real implementation defects in slow refresh, budget double counting and ally shield refresh; they were not overwritten or relabeled as passes. Whole-batch source, matrix, browser and delivery validation remain root's separate release gates.

The final independent movement review reproduced a same-tick attachment defect: a real allied host moved from 500 to 800 during pet movement, but W still emitted from the stale 500 coordinate. The failing standalone proof remains in `Orianna-peer-attached-movement-before-v1-command.json`; it recorded zero actual damage where the actual 800-coordinate pulse should deal 310 at 100 AP. The correction synchronizes actual movement, without replaying tick effects. `Orianna-peer-movement-complete-v2-command.json` records **102 passed, 0 failed, 0 skipped** with unchanged source hashes during execution. Its nine new regressions cover self/ally Q and W origins, actual forced movement, immediate leash snaps and pickup, and captured R through leash snap and same-tick host death. The original 93 assertions remain unchanged. Final whole-batch validation is separate.
