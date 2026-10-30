# Viktor — batch 14 source and model notes

The module uses the existing level-20, maximum-rank duel model. It imports directly in its focused tests; registry and matrix integration belong to the batch controller. All numerical spell values come through `KitContext`, including the source's explicit level-20 shield value.

## Pinned evidence

The original parsed ability fields, formulas, flags, page revisions and notes are retained. Each record additionally contains its complete raw wiki template and the exact game objects used by the module. The object text is complete JSON for that object, without dropping unrelated fields or rounding encoded numbers.

| Ability | Exact wiki revision | Promoted game objects under `Characters/Viktor/Spells/` |
| --- | ---: | --- |
| Glorious Evolution | 3954293 | `ViktorPassiveAbility/ViktorPassive` |
| Siphon Power | 3971354 | `ViktorQAbility/ViktorQ`, `ViktorQBuff`, `ViktorQReturn` |
| Gravity Field | 4070086 | `ViktorWAbility/ViktorW` |
| Hextech Ray | 4008553 | `ViktorEAbility/ViktorEMissile`, `ViktorEMissile2` |
| Arcane Storm | 4011945 | `ViktorRAbility/ViktorR`, `ViktorRGuide` |

Game data: `https://raw.communitydragon.org/16.20/game/data/characters/viktor/viktor.bin.json`; version `16.20.8248524+branch.releases-16-20.content.release`; full-download SHA-256 `bc2c38ea6d95ac5fad04bd4ca45f794b120e2fe96e3cf53ecbfe15c215929367`.

## Finite augment setup

`hexFragments` is an explicit actual preduel history, default **0**. `augmentMask` chooses purchased Q=1, W=2, E=4, R=8; default −1 enumerates legal whole augment sets under the same fragment budget. At 100 fragments the choices are Q/W/E; at 200 they are QW/QE/WE; at 300 the only fully spent set is QWE; at 400 it is QWER. A pinned smaller set may retain unspent fragments. R alone or a purchased set exceeding the actual history is rejected.

The pinned primary says each ability costs 100 and R can be augmented after all three basics. It does not explicitly establish automatic R evolution at 300. This implementation therefore requires a fourth purchase, 400 total, and records the ambiguity rather than granting an unsourced free augment. The variant helper's 100 breakpoint is checked against both the primary quote and the exact game object's `EvolutionStackBreakpoint` during compilation.

Actual hostile champion kills add 20 fragments; explicitly classified ordinary minion/monster kills add 1, while epic monsters and siege/super minions add 10. Siege/super classification uses the existing explicit `largeMinion` body marker. Clones, expiry and removal do not grant champion takedowns. The duel has no fabricated farm or absent teammate assists. It fixes augment purchases before the duel; newly earned fragments remain available history and are not automatically spent mid-fight. No siege/super classification is inferred from a name or collision radius, and no absent combat body is invented. ARAM fragment cadence is inactive.

## Siphon Power and Discharge

Q costs 65 mana, has a 5-second cast-start cooldown and a 0.25-second cast. Its 600-range device travels at 2000 and deals **120 + 40% AP magic**. Successful completion grants a **151.765 + 25% AP** shield for 2.5 seconds and a four-second Discharge window independently of the device's successful damage. The parsed source explicitly extends its shield series past level 18; capping at 140 or adding the unused binary mana ratio would change that source. Lost-target free cancellation grants no shield/Discharge and restores the cast-start cooldown.

Discharge is the next real basic attack, with a captured non-projectile replacement packet of **120 + 100% total AD + 50% AP magic**. It replaces the whole normal base packet, preserves attached on-hits and actual basic-attack defenses/categories, and suppresses bonus critical damage. Blind, dodge, parry and attack damage blocks still work. A supported ward body neither consumes Discharge nor receives its replacement effect. The shared captured packet remains independent across branch clones.

Augmented Q grants 30% bonus movement speed for 2.5 seconds on actual device contact, including a spell-shielded contact. The remaining positive shield from this Q is multiplied by 1.6. A broken shield is not recreated. Applying the increase to the still-positive remaining layer is an explicit interpretation of “shield strength is increased”; no unsourced extra return-missile delay is added.

## Gravity Field and Magnetize

W costs 65, cooldown 13, cast 0.25, placement 800. It remains 4.5 seconds with primary radius 340. It activates 0.75 seconds after release, then makes actual guarded occupant contacts every 0.25 seconds. Each real recipient's refreshing one-second Heavy Gravity debuff stacks to five, consumes, and can knock down/stun for 1.5 seconds once per field. Later fifth stacks consume without a second ordinary stun. The cadence uses cumulative 30-Hz rounding rather than repeatedly rounding a quarter second.

The accepted slow and stack expiry agree. Cleansing the accepted slow removes its linked stack history before the next field contact. Slow immunity can permit contact stacks without the slow under the declared model assumption; actual stun/knockdown still check current CC immunity. A spell shield denies one actual contact. Champion and real pet state, separate fields, and branch copies retain separate entitlement. A released field remains pending after Viktor dies.

Augmented W adds a 20% one-second slow to actual Q, Discharge, E, Aftershock and initial R contacts; R periodic damage does not gain it. Discharge's slow runs only after a real attack passes avoidance and is not damage-blocked.

The pinned wiki disagrees with the binary: **4.5 seconds / 0.25 cadence / five stacks / radius 340** versus **4 / 0.5 / six / 275**. The original primary values remain authoritative here. Raw `IGNORE___replaced_the_values_in_the__json` entries have no numeric values; they are retained data and are never interpreted as instructions. The separate untargetable-entry multiple-stun bug remains unresolved and is not generalized.

## Hextech Ray and Aftershock

E costs 100, cooldown 8, with no cast lock. It places a fixed start within 550 and fires a 500-long vector, full width 90, at 1050. It deals **230 + 50% AP magic**. `aim.distance` selects the start ahead of Viktor; `aim.direction` chooses forward/backward travel independently. Later caster movement does not drag the path. The placed origin and chosen direction are captured before the generic hit decision, so a ray starting near the target uses its actual short flight rather than travel from Viktor.

Ground interception suppresses contacts on the intercepted traveled segment and does not destroy the ray. Augmented E schedules a separate full-path Aftershock after one second, speed 1500, dealing **140 + 80% AP magic**. The aftershock still covers the original path when the first ray was intercepted. The initial ray stops at Viktor's real death; an already scheduled aftershock continues after death. Ray and aftershock use their own real contacts and ordinary finite skillshot decisions. Aftershock includes the elapsed one-second delay and the remaining flight from its fixed origin to the recipient hitbox, rather than assuming travel along the entire 500-unit path. At exhausted branch capacity, uncertain damage uses the accepted probability once.

The scalar arena cannot express arbitrary lateral vectors or fully distinguish casting over a wall from crossing its ground contact. Segment interception is resolved at 30 Hz. Primary width 90 is treated as full width, independently of the binary's separate generic missile-width field. Ordinary map sight bubbles are absent; E does not invent true sight to expose invisibility.

## Arcane Storm and guide commands

R costs 100, casts in 0.25, placement 700, radius 325. It deals one initial **250 + 50% AP magic** burst, followed by six separate **145 + 35% AP** pulses at seconds 1 through 6 of a 6.5-second storm. Full unchanged occupancy totals **1120 + 260% AP**. Its 80-second cooldown starts after the field. Spell shields block the initial packet, while periodic packets leave later spell shields intact. The initial disrupt interrupts a real channel through the engine's silence-immunity guards without imposing a persistent silence status.

Initial actual damage chooses the nearest eligible champion body, including explicitly classified real champion pets and excluding clones. The locked storm follows through invisibility. A lost/invalid body does not cause automatic reacquisition. A storm with no existing target/command can acquire the nearest actual eligible champion once when Viktor dies. Released movement commands and pulses persist after death.

The exact primary explicitly states speed **300 at distance ≤300 from Viktor**, **200 at ≥900**, with linear interpolation between. Augmented R multiplies speed by 1.25. Binary maximum 275 and far threshold 1000 conflict; the primary rule is used and disclosed. Guides to enemy, self or an explicit point are actual zero-cost internal overlay commands that preserve attack windup. They work under cast-inhibiting crowd control and at unrestricted command distance, but require a live, nonstasis owner and an existing storm. A guide creates no new burst, cast count or field.

An augmented storm grows only after an actually damaged eligible champion is killed: +40% of base radius each, at most six growths; +3 seconds each until total extension reaches the original 6.5 seconds. Actual initial lethal packets can grow it before the first pulse. Each burst or pulse captures its recipients before applying damage, so a lethal hit's growth affects later packets without extending that same packet to previously out-of-range bodies. Expiry, clones and unrelated kills do not qualify. Additional actual champion bodies are used in tests, rather than inventing teammates in an ordinary duel. The map has no fog-of-war simulation; storm sight is not converted into true sight.

## Allocation and verification

The allocation heuristic prices each selected Q missile plus one real replacement Discharge per available Q cycle once, subtracting the displaced ordinary basic damage. It prices the chosen E stages and six initial R pulses once, with no imaginary kill growth; R cooldown includes its field duration. Q shielding is priced once per available cycle. Full E/R occupancy is a heuristic assumption, while combat requires actual contacts. Hook-owned moving fields have limited generic defensive threat forecasts.

The direct-module focused suite checks source pins, whole finite augment sets and invalid setup, level-20 shield/cancellation/device guards, replacement basic categories and defenses, W cadence/occupants/cleanse/immunities/death/branches, fixed E vectors/interception/death/Aftershock, and actual R disrupt/pulses/guides/follow/death/real growth caps. The original eighth run passed **74/74** before peer corrections. Peer regressions reproduced same-packet storm growth, misplaced-origin ray timing, full-path Aftershock timing, and the classified siege/super reward. The final peer run is recorded externally as `Viktor-peer-complete-v2` (**82/82**). Three full-occupancy Aftershock fixtures retain their exact damage expectations and now explicitly root the target: the engine’s low-speed rule turns base movement speed 0 into 110, and a direct step helper had previously ignored queued probability scaling. Moving-target timing checks remain probabilistic and unchanged. Earlier failing reports are preserved externally; batch-wide typechecks, reflected production, the fresh complete matrix, full regression and browser validation remain the batch controller's responsibility.
