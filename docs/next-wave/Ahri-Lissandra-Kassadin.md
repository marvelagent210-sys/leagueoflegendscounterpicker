# Next-wave source blueprint: Ahri, Lissandra, Kassadin

Prepared 14 October 2026 by reading the committed dataset 16.20 (patch 26.20), the current engine, and the generated source reports. This is a design audit only. None of these three champions has been implemented or registered by this document. No checkout files were edited and no simulator tests or benchmarks were run.

All formulas below use maximum spell rank and level 20. Read every number and quote during `KitModule.build`, before `KitContext.seal()`; do not read records inside combat hooks. Ability paths are `data/16.20/abilities/<Champion>.json`; each referenced slot is the unique record with `kind` I/Q/W/E/R. Generated `data/16.20/kits/<Champion>.md` is a useful presentation and game-file cross-check, but the JSON records and their revision IDs are the pinned implementation inputs.

## Sources, base stats, and shared rules

Champion records are `data/16.20/champions.json`, keyed by `champions[].id`, and their first `forms[].stats`. Base-stat revisions from `wiki-revisions.json`: `Template:Data Ahri` 2951436, `Template:Data Lissandra` 2951499, `Template:Data Kassadin` 2951485. Preserve `baseFighter` and the repository's level-20 growth factor 19.665; do not hand-copy rounded report values into a kit.

| Level-20 base stat | Ahri | Lissandra | Kassadin |
|---|---:|---:|---:|
| HP | 2635.16 | 2783.15 | 2868.145 |
| HP regeneration / 5 s | 14.299 | 17.81575 | 15.8325 |
| Maximum mana | 909.625 | 1064.95 | 2110.855 |
| Mana regeneration / 5 s | 23.732 | 15.866 | 21.732 |
| AD | 111.995 | 108.0955 | 135.6935 |
| Armor | 103.593 | 104.593 | 99.66 |
| MR | 55.5645 | 55.5645 | 55.5645 |
| Attacks / s | 0.93839375 | 0.840359375 | 1.10566718959 |
| Attack range | 550 | 550 | 150 |
| Attack missile speed | 1750 | 2200 | Melee |
| Movement speed | 330 | 325 | 335 |
| Gameplay / pathing radius | 65 / 35 | 65 / 35 | 65 / 35 |

Basic attacks retain ordinary critical strike, blind, dodge, block, projectile, windup, and range rules. All three have `critDamageModifier: 1`. Ahri and Lissandra use ranged attacks; Kassadin is melee. No pet infobox file exists for any of these three in `data/16.20/pets/`; Lissandra's Thralls are described in her passive record instead. Do not fabricate pet HP or armor.

Relevant committed glossary revisions: Basic attack 4072132; Uncancellable windup tip 4072133; Cast time 4050299; Channel 4002276; Dash 4035700; Blink 4047228; Projectile 3999064; Range 4058499; Shield 4021810; Spell shield 3981674; Untargetability 3965000; Charm tip 4060686; Knockdown tip 4060618; Slow resist 4058780; Tenacity 4021927; Types of Crowd Control/Sources 4061740 and Summary 4035704; Stasis buff tip 3598956. `glossary.entries` explicitly lists Ahri Charm as charm/slow/knockdown, Kassadin Null Sphere as disrupt, and Lissandra Frozen Tomb as self-only stasis. `CC_RULES` makes charm involuntary movement toward the source and interruptible by tenacity; root prevents movement abilities; stasis has no tenacity. Do not label disrupt as silence or knockdown as an airborne duration without supporting evidence.

`rules.json` supplies equal plain-stat gold pricing, source `Module:Gold value/data` revision 4060632, checked V14.21. Mana is not a purchasable stat in `BUDGET_STATS`. A Kassadin maximum-mana ratio still matters because his level-20 base mana is large and `maxResource` buffs exist. Combat scores are simulator outcomes, not observed player win rates.

## Ahri

### I — Essence Theft

Pinned source: [Template:Data Ahri/Essence Theft, revision 4038191](https://wiki.leagueoflegends.com/en-us/Template:Data_Ahri/Essence_Theft?oldid=4038191).

Source facts and extraction:

- `I.levelValue("At 9 stacks")` reads `parts[0].values[0].series`: **102.058823529412 + 0.20 AP** at 20, not the level-18 endpoint 95. Pin the AP share with `I.quoted("(+ 20% AP)") / 100` and the threshold with `I.quoted("At 9 stacks")`.
- Exact text: "Ahri generates a stack of Essence Fragment whenever she kills a minion or monster." The isolated duel supplies neither pre-fight farm nor generic minion/monster kills. Start at zero stacks; champion-owned pets must not silently be classified as those creatures.
- `I.levelValue("Additionally, whenever Ahri scores a champion takedown")` reads `parts[1].values[0].series`: **175.588235294118 + 0.30 AP** at 20. Exact text: "whenever Ahri scores a champion takedown within 3 seconds of damaging them". Read the three-second eligibility timer and AP share by quoted text.
- The generated game-file report confirms both level-19/20 extensions: `AhriPassive.MinionHeal` and `AhriPassive.ChampionHeal`.

Implementation: use damage provenance/last damaging tick for the three-second timer; award exactly once per actual takedown. Generic `onDamageDealt` sees damage and health, not a canonical champion-takedown event. Do not call pet death a champion takedown. For a standard one-enemy duel the takedown ends the fight, so the heal and R refresh usually cannot help kill a second enemy; record this scope explicitly. If implementing a same-tick heal or zombie interaction, first settle the repository's death event ordering and Sion `fallen` semantics rather than inferring a takedown from any transient `hp <= 0`.

Budget/default behavior: no passive continuous healing in an ordinary isolated duel; no assumed nine fragments and no periodic champion heals. Regression: exact level-20 values; zero pre-fight stacks; pet kills do not count; eligibility expires just past 3 s; one heal per actual takedown; no resurrection of a unit already at zero health under the existing `heal` rule.

### Q — Orb of Deception

Pinned source: [Template:Data Ahri/Orb of Deception, revision 4074380](https://wiki.leagueoflegends.com/en-us/Template:Data_Ahri/Orb_of_Deception?oldid=4074380).

Numbers: `Q.formula("Damage Per Pass")` = **135 + 0.50 AP**; outward hit is magic, inward hit true. `Q.formula("Total Mixed Damage")` = **270 + 1.00 AP**, a cross-check, not one homogeneous packet. `Q.cooldown()` = **7 s**, `Q.cost()` = **95 mana**, `Q.castTime()` = **0.25 s**; range `Q.field("range", "Without return point")` = **900**; width **200**; turn-circle radius `Q.field("effectRadius", "Circle check")` = **100**. Outbound speed `Q.field("speed", "Outgoing")` = **1550**; return initial speed `Q.field("speed", "Returning")` = **60**; cap **2600** from `Q.fieldNumbers("speed")`; return acceleration **1900** is in the returning field's label, so validate/read that label and register it as evidence, like Brand's sourced acceleration parsing.

Exact source clauses:

- "Upon reaching maximum range, it returns to her to deal the same amount in true damage to enemies it passes through."
- "Enemies can be hit only once per pass."
- "Orb of Deception will hit additional units around the return point in a small circle when the orb turns around." The note then explicitly prevents an initial-pass duplicate for an enemy already hit.
- "If Ahri dies while the orb is out, the orb will visually disappear but continue to deal damage and return to Ahri."
- "This ability will cast from wherever the caster is at the end of the cast time."

Implementation: retain outbound missile after the enemy contact, hit ledger per pass, then reverse toward Ahri's current position and accelerate. It is not a homing missile aimed at the enemy after turnaround. Turn-circle checks belong to both passes, deduplicated against each pass's prior line contacts. Separate outbound and return hit packets must independently observe shield/parry/untargetability at impact. Source flag is `spellShield: special`; the committed record does not explain whether one shield suppresses one pass or additional linked effects. Do not invent a complete special rule; pin an explicit independent-impact assumption or obtain a further pinned source. `projectile: true` applies to the trajectory, including return; destroyed outbound missiles must not produce an unexplained return.

Actual API gap: standard `line` missiles disappear after their first connected champion hit; `homing` always follows the enemy; no piercing hit ledger, end-of-flight callback, or owner homing target exists. Acceleration already exists and can be reused for the return, but not the direction/continuation. Implement reusable piercing/return missile state, or rigorously model a branch-safe kit trajectory that still uses projectile-wall, pet, chance, and threat handling. A purely delayed true-damage packet would miss enemy/Ahri movement and blocker timing.

Regression: one outbound and one return hit at most; true hit ignores MR but observes damage shields; outward projectile continues after contact; moving/dashing Ahri alters return path; each turn-circle hit occurs once per pass; target crossing behind the original direction cannot be auto-aimed again; return starts at 60 then accelerates to 2600; projectile wall on either leg destroys it; shield timing and stasis differ between passes. Standard fight termination makes death-persistence unobservable after a terminal kill: label that limit, do not claim to simulate post-result damage.

Budget/default behavior: reference DPS should value one magic and one true pass per actual Q use, preserving separate mixes, not only magic or two copies of a single damage type. Combat must retain actual hit opportunities. Expose a representative combined damage estimate for threat/behavior without applying combined damage. Q can follow Charm; preserve endpoint origin per the quote, and choose/document fixed cast direction rather than silently following the enemy's side change during cast.

### W — Fox-Fire

Pinned source: [Template:Data Ahri/Fox-Fire, revision 4074423](https://wiki.leagueoflegends.com/en-us/Template:Data_Ahri/Fox-Fire?oldid=4074423).

Numbers: primary `W.formula("Primary Magic Damage")` = **120 + 0.40 AP**; subsequent `W.formula("Subsequent Magic Damage")` = **48 + 0.16 AP**; three-flame total `W.formula("Total Single-Target Damage")` = **216 + 0.72 AP**. Cooldown **5 s**, starts **post-effect** according to cooldown field label; cost **30 mana**, instant. Orbit radius **150**, non-priority search **550 from each flame**, prioritized search **725 from Ahri**, via labeled `effectRadius` values. Missile speed **1400** via labeled `speed` value.

Exact source clauses and quote-derived timing:

- "gains 40% bonus movement speed that decays over 2 seconds".
- "conjures three flames which orbit her clockwise for up to 2.5 seconds".
- "After 0.25 seconds of the cast, each flame targets a visible enemy based on priority, or after 0.4 seconds, simply targets the closest visible enemy in range."
- "subsequent flames against a target dealing 40% damage".
- Priority: "enemy champions hit by Charm, then enemy champions, then minions that would die to Fox-Fire's damage, and then the target of Ahri's last basic attack within 3 seconds."
- "Each missile of Fox-Fire has its own shorter non-priority range." "Any unused Fox-Fires will fizzle upon death."

Implementation: three independent homing missiles, first/full and later/40% per target, with actual travel and visible-target selection. In a one-enemy duel the enemy champion is the source's prioritized target; do not force a generic 0.4 s delay when champion priority permits 0.25 s. Unused flames survive until 2.5 s and permit late target acquisition. A lingering state can hold post-effect cooldown, but choose/document whether "post-effect" ends at flame launch, final missile impact, or flame expiry; the record gives no finer explanation. Movement-speed decay must replace status arrays when updating the value because `derive` caches by status-array identity/length.

Source uncertainty: the orbit field says **75.92° per second** but its parsed label says **2.65 rad/s**. These are inconsistent by roughly a factor of two (75.92° ≈ 1.325 rad). Do not use both as interchangeable. Full circular orbital missile positions also do not fit the one-dimensional lane; the 150-unit origin offset/range treatment needs a visible assumption. The record's spell-shield flag is true, but it does not explicitly say whether the first shielded flame causes following flames to use reduced damage; use a tested, documented per-target contact policy rather than counting only health damage unless newly pinned evidence settles it. Minion-only double damage below 20% HP has no champion effect.

Regression: exact 120/48/48 packets; independent shield and wall contacts; targeting delay 0.25 versus 0.4; no target while invisible/untargetable; acquire visible enemy after activation; death fizzles unused flames; movement bonus decays to zero over 2 s without stale cache; post-effect cooldown starts once; no total-packet flat-reduction shortcut. Default behavior must use W before/while R dash as explicitly permitted and not leave it unused because hook-based damage lacks traits. Give `roles`/`estimate` and avoid accidental attack cancellation for instant utility casts where a source exception is not given.

### E — Charm

Pinned source: [Template:Data Ahri/Charm, revision 4074445](https://wiki.leagueoflegends.com/en-us/Template:Data_Ahri/Charm?oldid=4074445).

`E.formula("Magic Damage")` = **240 + 0.85 AP**; `E.number("Disable Duration")` = **1.8 s**; `E.quoted("slowing them by 65%") / 100` = **0.65**. Cooldown **12 s**, cost **60 mana**, cast **0.25 s**, range **1000**, width **120**, missile **1550**, first-enemy collision. Source: "knocking them down and charming and slowing them by 65% for a duration." Note: "Charm is able to slow targets otherwise immune to slows upon charming them." End-of-cast origin is explicit.

Implementation: magic damage, instantaneous dash knockdown, charm and charm-associated slow share the successful guarded contact. Tenacity shortens the charm and its slow rather than adding a separate unsourced fixed slow duration. CC immunity, Black Shield and spell shield can prevent the charm; its slow-immunity exception is contingent on **charming**. Do not remove the target's full slow immunity, because unrelated slows must remain prevented. Generic `applyCC` rejects slow-immune targets, and `derive` globally discards all slows while immune; an effect/status-scoped exception is needed in both application and movement derivation. Generic airborne with a positive invented duration would add an unintended knockup; `applyCC` with zero duration does not interrupt a dash. Add/use an instantaneous knockdown action that honors actual displacement/knockdown protections and exact `onDashEnd` once.

Regression: moving charm target walks toward Ahri, not its previous voluntary direction; Highlander slow immunity still receives the Charm-associated 65% movement slow when charm applies; ordinary slows remain immune; charm prevented by CC immunity/Black Shield does not bypass slow immunity; tenacity applies consistently; shield/parry blocks the packet; unstoppable dash is not interrupted; eligible dash stops immediately with one dash-end callback; blocker/minion/pet first-contact policy is explicit. Default behavior should prioritize E setup when a meaningful hit can occur; do not fabricate the historical removed damage amplification, which is absent from this committed revision.

### R — Spirit Rush

Pinned source: [Template:Data Ahri/Spirit Rush, revision 4074438](https://wiki.leagueoflegends.com/en-us/Template:Data_Ahri/Spirit_Rush?oldid=4074438).

`R.formula("Magic Damage")` = **175 + 0.35 AP per target per cast**; three casts at most before a takedown give a sole enemy **525 + 1.05 AP**, not three bolts to that same enemy per dash. Cooldown **100 s**, source label "Starts after first cast, and refreshes upon gaining recasts". First cost **100 mana**, recasts **zero**; instant cast; maximum dash distance **500**, bolt search **600 around destination**; dash speed **1200 + current movement speed**, read `R.field("speed", "Dash speed")` and validated `fieldNumbers`/text for +100% movement speed. Bolt speed **1400**.

Exact clauses: "to up to 3 nearby visible enemies"; "recast twice more within 15 seconds of the activation"; "a 1-second static cooldown between casts"; essence consumption "extends the recast duration by and up to 10 seconds, and grants an additional recast, storing up to 3 recasts at a time"; "recast duration will persist even after using all recasts"; "Fox-Fire can be cast during the dash". Notes say bolts do not fire if Ahri dies during dash, but **do** fire if interrupted otherwise, including resurrection. Every cast is an ability activation, explicitly relevant to Force Pulse.

Implementation: dynamic `speedFor` already supports 1200 + `derive(unit).moveSpeed`; `onDashEnd` is the correct bolt creation point, including interruption. Check target visibility and 600 search at actual dash-end position; one bolt per visible enemy, not three against one target. W can be `overlay` during the dash. Dash flags grounded/knockdown are true. Projectile wall stops bolts, not the movement itself; spell shield blocks individual bolts. Fixed initial 15-second expiry, stock of 2 initial recasts, 1-second static spacing and first-cast cooldown require branch-local state. Source cooldown starts after first cast, not after all dashes. Refresh normal cooldown upon qualifying extra recast grant.

Actual API mismatch: generic `chain` resets its window after each stage, deletes it after final stage, and represents a fixed linear sequence; it cannot directly preserve the initial expiry after consuming stock, or grant up to 3 dynamic recasts. Use dedicated stock/expiry state or a reusable recast-stock extension, with charge-free first/recast separation. Ordinary `charges` continuously recharge and therefore are also wrong. Exact interpretation of "extends ... by and up to 10 seconds" should be documented; it must not become an uncapped +10 per takedown.

Regression: only first cast pays 100; second/third remain gated for 1 s despite haste; original 15-second boundary does not restart after each dash; stock consumed but expiry retained; extra grant capped at 3 and resets 100-s cooldown as sourced; one 175 + .35 AP bolt per sole target; invisible enemy gets no new bolt; W overlay retains dash clock; death cancels bolts, other eligible interruption emits them from interruption position; exact movement speed changes dash duration. Default behavior needs purposeful short-range dash/retreat aim and all three recasts in ordinary relevant fights, without spending all recasts automatically into bad positions. Budget should value actual one-target three-cast package once per R cycle and not continuously free casts every second.

## Lissandra

### I — Iceborn Subjugation

Pinned source: [Template:Data Lissandra/Iceborn Subjugation, revision 4038403](https://wiki.leagueoflegends.com/en-us/Template:Data_Lissandra/Iceborn_Subjugation?oldid=4038403).

Numbers: triggering radius `I.field("effectRadius", "Aura radius")` = **1350 center-to-edge**; Thrall slow/explosion radius `I.field("effectRadius", "Thrall slow")` = **450**; slow **25%**, life **4 s**, explosion **580 + 0.50 AP** at 20. Read `I.levelValue("after which they shatter")` for 580 and `I.quoted("(+ 50% AP)")` for ratio. Report confirms `LissandraPassive.TotalDamage` level-20 extension. Age-dependent movement is `I.seriesIn("Frozen Thralls are ice spirits")`, variable `seconds alive`, with 0.25-s points:

`[33.475, 78.65, 117.325, 149.825, 177.775, 201.175, 221.325, 238.225, 252.85, 263.9, 275.6, 284.7, 292.175, 298.675, 303.875, 308.75, 325]` at ages `[0, .25, .5, .75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4]`.

Exact source: "Whenever a nearby enemy champion dies ... from their corpse"; prioritizes nearby visible champions; Thralls are **champion clones, untargetable and invulnerable**, revealed through fog and continue chasing into brush. Note: "will not summon a Thrall against enemy champions that enter a zombie state, and will instead summon one after they've left the state." A kill/takedown by Lissandra is not required: **nearby death** is.

One-enemy duel policy: there is no living enemy champion remaining after the sole enemy's final death, and current simulator ends that result immediately. No free starting Thrall, passive DPS or pre-fight slow belongs in ordinary budgets. Record passive as a source-verified out-of-scope terminal effect; do not claim its 4-s chase/explosion participates in these duels. If expanded to multiple enemies later, need canonical champion death events (not pet death), zombie-final-death distinction and an untargetable/invulnerable clone entity with age-based speed; ordinary `PetSpec` fixed speed/normal pet damage defenses are insufficient. Do not invent HP/MR from absent pet data. Tests: exact 580 scaling, radius semantics, zero default starting Thralls, no Thrall on zombie entry, no fake champion classification of pets.

### Q — Ice Shard

Pinned source: [Template:Data Lissandra/Ice Shard, revision 4007664](https://wiki.leagueoflegends.com/en-us/Template:Data_Lissandra/Ice_Shard?oldid=4007664).

`Q.formula("Magic Damage")` = **220 + 0.75 AP**, slow `Q.fraction("Slow")` = **0.36** for **1.5 s** (quoted); cooldown **3 s**, cost **75 mana**, cast **.25 s**; speed **2200**. Initial width **150**, shattered width **180** from labeled width values. Standard range field **825 including area check after missile end**, enhanced endpoint **950 from cast origin**.

Detailed source note disambiguates 825: "initial Ice Shard missile has a range of 700 units ... after 0.33"; if no collision, it checks **100 radius around a point 25 units in front**. Thus the frontmost circle edge is 700 + 25 + 100 = 825. This is not a real constant-width 825-unit missile. Collision or that endpoint hit creates a new shattered missile, same speed, starting at contact, continuing toward the original **950-unit endpoint**. The infobox is an effective reach; model the note rather than treating it as contradictory. Exact note: "Spell shield will block the damage and the slow but will not stop the projectile from shattering." End-of-cast origin is explicit.

Implementation: initial real flight range 700, endpoint circle at 725 radius 100, shatter on enemy contact even when shield blocks. Shattered travel width 180, fixed endpoint set at cast, with one per-target damage application unless further pinned evidence proves repeated hits; the committed record does not explicitly state hit deduplication. Enemy pets can provide the shatter trigger and extend range to reach the sole enemy champion. A simple 950-wide line overstates untriggered reach. Current line missiles stop on champion contact and never collide with pets; a contact/end-of-flight hook and non-damage shatter state is a real API gap shared with Ahri Q. Resolve projectile-wall destruction separately from a spell shield; a destroyed initial projectile should not conjure a shatter.

Regression: enemy at ordinary 800 reach can be touched by endpoint-circle but enemy beyond 825 cannot trigger without an earlier unit; untriggered projectile doesn't fly to 950; pet at 300 can enable enemy hit at 940; shielded initial unit still triggers; endpoint-circle contact and flight contact do not duplicate champion damage; wider second missile respects fixed endpoint/direction after caster moves; actual 2200 speed produces quantized timing close to quoted .33 without hard-coding both incompatible exact clocks. Default behavior should know effective reach 825/conditional 950 and avoid unsourced guaranteed long-range poke. Budget counts one champion hit per Q use, not each initial/shattered stage as independent spell DPS.

### W — Ring of Frost

Pinned source: [Template:Data Lissandra/Ring of Frost, revision 3936419](https://wiki.leagueoflegends.com/en-us/Template:Data_Lissandra/Ring_of_Frost?oldid=3936419).

`W.formula("Magic Damage")` = **210 + 0.70 AP**; `W.number("Root Duration")` = **1.65 s**; cooldown **8 s**, cost **40**, instant, effect radius **275**. Auto/self-centered AoE, non-projectile; spell shield true. Ordinary aura hit geometry is currently center-based; source has no edge-specific label, so do not silently enlarge the 275 range without a policy.

Implementation uses aura packet with magic/root, ordinary guarded contact and pet AoE as supported. Root is not a stun: target can attack/cast non-movement spells, and moving channels/dashes follow the global root rules. Black Shield can keep CC immunity for the same shield-breaking packet. Regression: correct 275 boundary, root length after tenacity, shield/parry/invulnerable/CC-immune distinctions, no projectile-wall blocking, no accidental airborne, root stops only movement abilities/channels required by the rules. Default behavior must use W when in range without treating it as a targeted projectile; budget one damage hit / cycle.

### E — Glacial Path

Pinned source: [Template:Data Lissandra/Glacial Path, revision 4050877](https://wiki.leagueoflegends.com/en-us/Template:Data_Lissandra/Glacial_Path?oldid=4050877).

`E.formula("Magic Damage")` = **210 + 0.60 AP**; cooldown **12 s**, starts on first cast; cost **100**, cast **.25 s**; range **1025**, width **250**. Speed text **1200 - 640**, parsed label "Claw missile speed, decelerates over time". Read both limits from `E.fieldNumbers("speed")`; quote **1.25 s** deceleration duration from "decelerating over 1.25 seconds". Recast unlock **.5 s** while claw active. Recast is free/instant only insofar as the record provides no separate cost/cast field; explicitly document this reading.

Exact notes: both casts count as ability activations; can recast for trajectory plus **0.2–0.3 s after the claw sinks**; claw can hit near endpoint then; recast cannot occur while **grounded or rooted**; can cross every wall if claw is at least halfway through it; endpoint revealed to enemies within **600**. Recast: "blinks to the claw's current location, ending its trajectory."

Implementation: outgoing piercing claw; remember true current position even after champion contact, and E2 blink to that position—not an arbitrary fixed 1025-distance blink. Cooldown starts first cast; recast .5-s gate; early recast ends further missile damage; no walking teleport while rooted/grounded. Initial E is not movement and is castable while grounded; generic movement restrictions apply only E2. Existing acceleration representation/predictor only supports positive acceleration; falling speed requires signed acceleration with minimum speed, or a bespoke trajectory with consistent threat ETA. **Deceleration curve is not supplied**: linear 1200→640 over1.25 is a defensible visible assumption, not a sourced exact curve. Source gives late grace as a range; choose e.g. .25 and label it, not silently an exact .3. Two-dimensional wall-halfway rule does not map exactly to existing scalar terrain gaps; wall-crossing behavior needs a stated terrain limitation.

Regression: projectile continues after first damage; one damage application to same enemy; correct position at .5-s recast unlock and after near-end flight; grounded/rooted first E versus recast; E2 no additional mana/normal E CD; end trajectory immediately on blink; projectile wall destruction invalidates recast unless new pinned evidence says otherwise; grace expires at chosen bound; source spell shield negates damage without erasing an independent claw-position record; both actual casts emit Force Pulse notifications, not every claw update. Default behavior must sometimes use E2 to enter W range or disengage; a passive unused recast is not a complete implementation. Budget one E damage use, no extra burst from E2; terrain/1D/deceleration assumptions visible.

### R — Frozen Tomb

Pinned source: [Template:Data Lissandra/Frozen Tomb, revision 4017996](https://wiki.leagueoflegends.com/en-us/Template:Data_Lissandra/Frozen_Tomb?oldid=4017996).

Shared cooldown **80 s**, mana **100**. Enemy cast time `R.castTime("Enemy cast")` = **.375 s**; self cast instant (field text ".375 • None" plus exact self-cast text). Enemy target range **550**; maximum ice-field radius **550**. Enemy direct control **1.5-s stun plus instantaneous knockdown**, read quoted text. Self stasis **2.5 s**, **10 healing pulses every .25 s**, minimum `R.formula("Minimum Heal per Tick")` = **20 + .055 AP**, maximum **40 + .11 AP**; minimum total **200 + .55 AP**, maximum **400 + 1.10 AP**. Source variable `R.seriesIn("missing health at the time of cast")` defines bonus-heal percentage equal to missing-health percentage at cast (0..100 in 10-point entries). At 50% missing HP, total = **300 + .825 AP**, snapshot once, not re-evaluated after each heal.

Ice field: `R.formula("Magic Damage")` = **350 + .75 AP once per enemy**; expands over **1.5 s** and covers surrounding area for **3 s**; slow **75%** for **.5 s** refreshed every **.25 s**. Quote/note: "Enemies can only be damaged by the field of ice once every 4 seconds". No per-pulse damage multiplication. Exact field growth curve and whether 3-s duration is counted from start or fully spread are not explicit; document chosen policy. Standard reading is a 3-s field from cast/contact, expanding through first1.5 s, but it remains an assumption.

Special defense/cancellation notes:

- "Spell shield will block the single-targeted portion and the radiating ice damage, but will not stop it from spreading."
- Enemy cast cancels if target becomes untargetable, dies or is too far during cast, **without cost or cooldown**.
- "The ability is not cancelled by loss of sight of the target." This only applies to enemy cast.
- Self stasis destroys incoming targeted enemy projectiles by becoming untargetable; current state helper already destroys homing projectiles and rejects damage in stasis. Self heal remains permitted by current `heal`.

Implementation: separate enemy and self AbilitySpec keys sharing one R cooldown, with enemy target and self delivery. Enemy cast creates a field even if direct stun is shielded; direct shield must also protect its linked ice damage for the **same cast**, not consume then immediately permit full field damage one pulse later. Conversely, a different later spell shield at field entry is a new guard. Need explicit per-target per-cast blocked/damaged state, four-second damage ledger, independent repeated slow pulses, field growth and pinned fixed center. Source says field spreads "from the target"; whether center follows enemy movement is not specified, so choose/document fixed contact-center rather than confidently claiming either.

Actual API gaps: `cancelOnInvalidTarget` uses `canTarget`, which includes visibility; `dropTargeting` globally cancels a targeted cast when target becomes invisible. Enemy R must retain cast through invisibility/nearsight visibility loss yet cancel untargetability/death/range. A policy-specific target-revalidation flag and drop-targeting exception are necessary. Existing `field` pulses repeat full damage and fixed radius; growth and once-per-cast/per-enemy guards require hooks or reusable field state. Generic `chain` is not appropriate for the self/enemy alternatives. Zero-duration stun cannot represent instantaneous knockdown.

Regression: target leaving550, entering untargetability or dying at .375 boundary cancels with no payment/CD; invisibility during cast does not cancel; selfcast instant under allowed ordinary CC constraints (the source does not say universally usable while disabled); stasis drops incoming homing attack/spell and prevents all damage; 10 pulses use frozen missing-HP share and preserve .25 timeline quantization including final pulse; Grievous Wounds reduces actual heal; growth does not hit outer target immediately; field one damage hit then repeated slow, not12 damage hits; spell shield blocks stun plus this cast's damage yet field spreads; target's pet entry has separately documented policy. Default behavior needs real choice: self-R to survive/heal incoming lethal pressure and enemy-R for locking target, with shared cooldown preventing both. Budget values self heal versus enemy burst as alternatives, not one use providing both maximum heal and targeted stun plus12 bursts. Include representative damage and healing callbacks without duplicating declared effects.

## Kassadin

### I — Void Stone

Pinned source: [Template:Data Kassadin/Void Stone, revision 3913958](https://wiki.leagueoflegends.com/en-us/Template:Data_Kassadin/Void_Stone?oldid=3913958).

Exact text: "Kassadin is permanently ghosted and takes 10% reduced magic damage." `I.quoted("takes 10% reduced magic damage") /100` = **.10**. Use permanent `ghosted` and `magicReduction` states in `start`. Existing damage derivation supports magic-only reduction and budget initialization reads `start`, so do not add the same reduction through a second hint. Ghosting concerns unit collision; isolated two-champion lane still keeps explicit champion contact rules. No AP damage/healing effect. Regression: magic .9 multiplier through shield interaction, physical/true unaffected, no accidental global10% reduction, persistent magic also reduced, permanent state retained across normal casts.

### Q — Null Sphere

Pinned source: [Template:Data Kassadin/Null Sphere, revision 4060362](https://wiki.leagueoflegends.com/en-us/Template:Data_Kassadin/Null_Sphere?oldid=4060362).

`Q.formula("Magic Damage")` = **185 + .80 AP**; magic shield `Q.formula("Magic Shield Strength")` = **200 + .30 AP**, lasts **1.5 s** (quoted). Cooldown **7 s**, mana **80**, cast **.25 s**, target range **650**, homing missile **1400**, projectile/spell shield true. Exact note: "The shield is granted at the start of the cast time." Damage and **channel disrupt** occur at missile impact, not at start.

Implementation: magic-only shield in `onCastStart`; damage/disrupt in target missile's guarded packet. A spell shield can stop impact effects while Kassadin keeps his own already-granted shield. Projectile wall may stop missile, not retroactively remove shield. Ordinary channel disrupt is an instant interruption, not a silence, stun, movement restriction or permanent suppression. `CCType` lacks disrupt and `interrupt` is internal; zero-duration silence returns before interrupt. Add a narrow channel-disrupt effect/helper with correct immunity/guard handling and no lingering CC. Pinned channel glossary determines whether nominally uninterruptible channels resist disrupt; test the engine's actual channel declaration rather than overriding all actions indiscriminately. Do not interrupt ordinary uninterruptible cast times or stationary buffs by calling it silence.

Regression: shield available before .25 cast completion and expires1.5 s after **start**, absorbs magic but not physical/true; null sphere wall/shield leaves selfshield; interrupt Master Yi Meditate on impact; no silence persists and target can cast next tick; respects uninterruptible channels; no basic attack forced interruption beyond actual disrupt rules; homing target becomes untargetable destroys missile. Default behavior roles should retain offensive Q use despite defensive shield traits and optionally use shield against incoming magic; budget values declared damage and shield once with actual7-s cycle, never healing on impact.

### W — Nether Blade

Pinned source: [Template:Data Kassadin/Nether Blade, revision 4022982](https://wiki.leagueoflegends.com/en-us/Template:Data_Kassadin/Nether_Blade?oldid=4022982).

Passive exact quote: "basic attacks deal 25 (+ 10% AP) bonus magic damage on-hit" → **25 + .10 AP** via validated quoted numbers. Active `W.formula("Increased Bonus Magic Damage")` = **150 + .80 AP**. W active is an **increased/replacement on-hit**, not 150+.8 AP **plus** the passive25+.1 AP; keep ordinary physical AD separately. Cooldown **7 s post-effect**, mana **1**, instant, empowers next attack for **5 s**; uncancellable windup; **+50 attack range** and attack timer reset.

Mana restoration: `W.baseOf("Mana Restored Against Champions") /100` = **.30 of missing mana**, ordinary nonchampion fraction **.06**. `W.formula(...)` currently fails because `missingMana` is absent from `STAT_REFS`; read base percentage plus exact `baseStat`/quoted evidence and compute dynamic `derive(self).maxResource - self.resource`, or add true resource refs once. Do not substitute missing health. Snapshot restoration when the connected attack resolves, after any relevant mana spending; clamp to maxResource.

Exact notes:

- "passive damage applies proc damage and the active damage applies spell damage".
- Enhanced attack applies other on-hits and can critically strike normally; the magical enhancement must not inherit ordinary attack crit without evidence.
- "will not grant mana if the attack is dodged or if it misses, but will do so if the attack is blocked. In all cases the damage is parried."
- "Spell shield will block the active damage but not the passive one."
- Structures receive passive; empowerment triggers but is not consumed/applied against them (structures outside current duel).

Critical source ambiguity to settle: active replacement wording plus shield note could mean a spell-shielded active attack falls back to passive25+.1 AP, while unshielded active attack replaces it. Do not produce active+passive175+.9 AP on every normal W hit by interpreting the shield note as universal additive damage. Re-read the pinned notes/formula together and test a documented policy; if no further source exists, mark this fallback interpretation explicitly rather than claiming perfect certification.

Existing engine supports `spellShieldOnHit` for partial empowered packets and leaves `attack.onHit` intact, but simply keeping passive in `attack.onHit` plus active in empower **double counts** unshielded damage. An impact-aware replacement/fallback hook is needed. The active **mana restoration** must survive a basic damage block. `onAttackHit({blocked})` is appropriate, but partial spell shield currently skips the whole empowered on-hit packet; whether shield should prevent mana restore is not stated in this note, so don't infer it from damage shielding. Passive ordinary on-hit must retain its guard behavior. Parry, dodge and blind should deny restoration; block should grant it. `onAttackResolved` sees misses; preserve valid W window/cooldown spending semantics when avoided attacks consume empowerment.

Regression: ordinary attack physicalAD+25+.1 AP; successful W physicalAD+150+.8 AP total magic; 100% crit affects only ordinary physical; spell-shielded W retains ordinary attack and specified passive fallback, active denied; blocked W heals **mana**30%missing while magic damage guarded; blind/dodge/parry restorezero; uncancellable windup survives range departure/ordinary compatible disables; +50 range, five-second expiry and post-effect CD; no negative/>max mana; no W passive attached twice to item-free attack. Default behavior should weave W between attacks for reset and missing mana, not only at full mana or only when enemy can die. Budget references passive on-hit rate plus **active-minus-passive** incremental W contribution, not full replacement + passive; post-effect hold includes empowered attack wait. Restoration matters for sustained actual casts even though generic allocation ignores mana exhaustion.

### E — Force Pulse

Pinned source: [Template:Data Kassadin/Force Pulse, revision 4007623](https://wiki.leagueoflegends.com/en-us/Template:Data_Kassadin/Force_Pulse?oldid=4007623).

`E.formula("Magic Damage")` = **190 + .70 AP**; slow **70%** for **1 s**, cooldown **17 s**, mana **80**, cast **.25 s**, cone range **600**, angle **78°**, detection radius **1800**. Radius field has two values, only detection is labeled; use `E.fieldValues("effectRadius")[0]` for600 and `E.field("effectRadius", "Ability cast detection")` for1800, never `E.field("effectRadius")` (ambiguous). Exact passive: "Each time Kassadin or a nearby champion casts an ability, Force Pulse's current cooldown is reduced by 0.75 seconds." End-of-cast origin is explicit.

Exact exclusions: "Untargetable champions do not reduce Force Pulse's cooldown upon ability activations"; "Toggle abilities and transformation abilities do not count". This revision has no six-stack casting requirement; do not implement obsolete stacks from memory. E itself and eligible recasts are genuine activations. Ahri R and Lissandra E records explicitly confirm each recast counts. Do not count hook-delivered damage-only helper ability packets as player casts, minion/pet spell pulses, ongoing toggle ticks or transformation helpers.

Implementation: non-projectile directed cone (in1D directional area), damage+slow guarded. Observe actual eligible cast events for self and enemy within1800, apply **.75 s flat current-CD refund**, floor at readiness; don't save refunds when E already ready unless source says so. `refund` can handle duration math but current `KitHooks` only hears that kit's own `onCastStart/onCast`; no opponent-cast observer. A tick scan of `.action` misses instant casts and multiple activations same tick. Add canonical activation notification to both observers, with type/classification and targetability snapshot. Decide source-consistent start-versus-completion timing for ordinary casts and cancellation; bare "casts an ability" does not settle canceled pre-completion casts. Pin a documented policy and test it; don't duplicate both events. Self refund when E casts should reduce its newly-started cooldown once under the chosen order, not reduce a previous ready0 timer.

Regression: one cast = one .75 refund regardless haste; self/enemy and eligible recasts count;1800 boundary, farther enemy no refund; caster untargetable no refund; AmumuW toggle and transforms no refund; charged/canceled casts follow stated policy; 3 instant commands same tick all detected; cooldown never negative; E's own activation exactly once; event packet branch copies deterministic; cone points same cast direction even if target crosses during .25, source explicitly retains end position rather than start origin. Budget normal17-s cycle understates haste-like passive; reference needs expected qualifying activation rate, tied to opponent's spells and own cycles, or an explicit approximation. Actual combat always uses events; no artificial17→fixed shorterCD silently. No projectile wall blocks cone; spell shield/parry does.

### R — Riftwalk

Pinned source: [Template:Data Kassadin/Riftwalk, revision 4060363](https://wiki.leagueoflegends.com/en-us/Template:Data_Kassadin/Riftwalk?oldid=4060363).

`R.formula("Magic Damage")` conceptually = **110 + .50 AP + .02 maxMana**; `R.formula("Bonus Damage Per Stack")` = **55 + .07 AP + .01 maxMana**; maximum four-stack total = **330 + .78 AP + .06 maxMana**. Both `.formula` calls currently fail unsupported `maxMana`; a real resource stat ref or validated custom reader is needed. At base20 mana2110.855 and0AP: zero-stack hit **152.2171**, four-stack hit **456.6513**. These base-only numbers are checks, not hard-coded formulas. Cooldown **2 s**, cast **.25 s**, max blink **500**, no minimum, arrival AoE radius **270**. Cost `fields.cost.values[0].series` variable `Stacks`: points `[0,1,2,3,4]`, values **[40,80,160,320,640]**. `R.cost()` currently throws because at20 cannot evaluate nonlevelvariable; validate/read raw series plus field evidence, or extend resource-cost callback API.

Exact text: "He then gains a stack of Riftwalk for 15 seconds, refreshing on subsequent casts and stacking up to 4 times." Use **pre-cast** stack count for both cost/damage, then increment/refresh after successful arrival. First cast at zero costs40 and gets zero-stack damage; second costs80/one-stack hit. Independent memory tracks shared15-s expiry; on expiration **all stacks reset**, not one at a time. At full base mana the five zero→four casts cost40+80+160+320+640=1240 before regeneration; repeated capped640 casts must become unaffordable naturally. Zero-distance blink is valid and hits270 around actual arrival. Grounded/rooted restrictions apply; actual blink not a dash, no airborne travel or onDashEnd. Source note permits Flash during cast but summoner spells are outside model; record this scope.

Actual API gap: `AbilitySpec.cost` is number or stats Formula, no memory-dependent `costFor`; affordability and payment share `costOf`, so a memory-dependent callback should be evaluated in both. Mutating a shared AbilitySpec's cost inside hooks is unsafe across worlds/candidate builds; a fixed cost40 plus manually paying remaining cost after blink may allow an otherwise unaffordable cast. Alternative separate stack-specific R versions can share cooldownKey and be usable per memory, but reference grouping/dynamicdamage must not count them as five independent skills. Damage supports `amountFor`, so stacks+maxResource can be evaluated safely on impact after preserving the **pre-cast** value. Proper maxMana/currentMana/missingMana `StatRef` support benefits W/R, and should use derive.maxResource/unit.resource rather than base mana.

Regression: sourcezero/four-stack formulas, exact cost ladder and cappedstack; first/second order; .25 cast then500 blink/270 AoE; mana640 gate denies movement anddamage with no payment; stacks all disappear at15-sboundary andrefresh on successful cast; failed cast does not gain stack; target shield blocks damage but successful blink still gains stack/payscost; direction/aim zero-distance allowed; ghosting/terrain and root/ground behavior match blink rules; no missed maxmana ratio; same branch copies cannot share mutatedcost. Default behavior should weave W to refill mana and choose short/zero-distance R in melee range rather than dash500 past the target. Flee should reserve a realistically affordable R. Budget max-stack always-on damage divided by2-sCD overvalues sustained mana use; choose a documented resource-aware reference sequence/rate, ideally using fixed-point W restoration/regen and actual spell costs. No mana purchases are available, and no item mana/passives are present to subsidize it.

## Shared changes actually justified by these records

1. **Cast activation observation and classification:** necessary for KassadinE and explicitly sourced recasts in AhriR/LissandraE. Must detect instant/multiple casts, distinguish toggle/transformation/internal delivery, snapshot range and untargetability, remain branch-safe. Existing kit-local onCast events cannot observe the enemy.
2. **Memory-dependent cost or safe stack-specific alternatives:** required by KassadinR affordability/payment. Add callback to centralized `costOf` or documented safe alternatives; no mutable spec or post-delivery extra charge. **Mana formula refs** are absent from both `StatRef` and `KitContext.STAT_REFS` and are needed by KassadinW/R. Reference evaluator and damage estimates must read the same values.
3. **Instant channel disrupt and dash knockdown:** Null Sphere disrupt lacks representation; Charm/FrozenTomb knockdown must not fabricate extra airborne CC or fail at zero duration. Keep these distinct and preserve immunity/guard rules and exactly one `onDashEnd` callback.
4. **Policy-specific target retention/revalidation:** FrozenTomb enemy cast must survive sight loss while still canceling untargetability/death/range without cost/CD. Both `completeOneCast` and `dropTargeting` currently conflate invisible with invalid targetedcasts.
5. **Piercing and multistage trajectories:** AhriQ, LissandraQ/E need per-target hit history, continue-after-contact, endpoint handling, conditional shatter, owner-return homing and/or signed deceleration with a speed floor. Positive acceleration exists; a second raw delayed damage packet is not equivalent. Keep threat ETA/blocker/pet/chance/branch behavior aligned. Some features can be kit-local hooks, but manual trajectories must not bypass shared combat guards or mutate global arrays incorrectly during iteration.
6. **Charm-scoped slow immunity bypass:** successful charm's own slow applies despite slow immunity. Add scoped status metadata/application and derive behavior; never strip general immunity.
7. **Recast stock and fixed expiry:** AhriR needs dynamic stock, fixed originalwindow persisting after chargesconsumed, free/static recasts and cooldownrefresh grants. Generic stagechains reset windows; generic charges replenish forever.
8. **Linked field damage guards/growth:** FrozenTomb one damage per4s, gradual550 radius, repeated .5sslow, linked shielded cast while field stillexists. Ordinaryfield repeatsdamage eachpulse and has fixedradius. This can be implemented branch-safe in kit hooks or reusable field API.
9. **Replacement empowered on-hit with passive fallback:** KassadinW unshielded active must not double-count passive, while spellshield active-only suppression preserves passive. Mana restoration on block is distinct from damage. Existing partial `spellShieldOnHit` is useful but insufficient by itself.

No shared changes are necessary for numeric aura W, permanent magicReduction, shield-at-cast-start, dynamic Ahri dash speed, normal homing bolts, source evidence collection, or static cooldown calculation: these APIs already exist.

## Acceptance gate for a future implementation

Keep these champions unsupported until passive/QWER behavior, source citations, assumptions, budget and normal/default duel behavior are implemented and reviewed. Minimum evidence should include source-reader numeric/cast/resource regressions, counterplay packet tests, movement/timing boundary tests, branch-safety tests, and real non-scripted representative duel traces showing meaningful ability use. Do not equate a registered module or plausible opening damage with full mechanics coverage. The most consequential unresolved policies are AhriQ shield special/orbit-speed conflict, AhriR dynamic recast expiry, LissandraE curve/grace/terrain, FrozenTomb field growth/duration/center and linked shield semantics, KassadinW active replacement/fallback/restoration guards, and cast activation/death event timing. Each unresolved source interpretation must be exposed through `kit.assume` before publication.
