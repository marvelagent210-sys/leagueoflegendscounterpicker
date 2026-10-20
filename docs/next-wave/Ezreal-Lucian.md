# Ezreal and Lucian: pinned source audit and implemented contracts

Both modules use maximum ability ranks and the repository's level-20 champion statistics. All ordinary ability values come from the exact wiki revisions below, retained in `data/16.20/abilities/`. Reads go through the strict, sealed kit source context; runtime hooks do not read source data. AD means total attack damage, bonus AD means purchased or otherwise bonus attack damage, and AP means ability power.

| Champion | Passive | Q | W | E | R |
| --- | ---: | ---: | ---: | ---: | ---: |
| Ezreal | 3932280 | 4064006 | 4059864 | 3989862 | 4013235 |
| Lucian | 4064854 | 4064855 | 3594941 | 4008455 | 4007670 |

Links use the source page and its pinned revision, for example [Mystic Shot 4064006](https://wiki.leagueoflegends.com/en-us/index.php?oldid=4064006) and [Lightslinger 4064854](https://wiki.leagueoflegends.com/en-us/index.php?oldid=4064854). The additional [Types of Crowd Control 4061028](https://wiki.leagueoflegends.com/en-us/index.php?oldid=4061028) evidence explicitly says blind has no effect on on-hit abilities including Mystic Shot, Parrrley, and Steel Tempest. Ezreal Q retains this exception; it must not inherit ordinary basic-attack blind failure.

The versioned game evidence uses **16.20.8248524+branch.releases-16-20.content.release** and is separately attributed through `gameSources`, including its object path and full-file SHA-256:

| Champion | Versioned file | SHA-256 |
| --- | --- | --- |
| Ezreal | [ezreal.bin.json](https://raw.communitydragon.org/16.20/game/data/characters/ezreal/ezreal.bin.json) | `c940c43be0abc156a58206955688d013ff0960cb8501d48c9750e944963cca0a` |
| Lucian | [lucian.bin.json](https://raw.communitydragon.org/16.20/game/data/characters/lucian/lucian.bin.json) | `5fb83f89c40863507666081dfa5a5f5bfe24ebf3e6622e79b78386006b82b0a0` |

## Ezreal

Rising Spell Force grants **10% bonus attack speed** per contacted enemy, up to **five stacks**, for **six seconds**, refreshing the shared timer. Spell shields expressly permit stacks. The implementation excludes untargetable misses and conservatively excludes parried or dodged contacts; the source does not settle these latter passive interactions. Expected-value contacts can add fractional stacks. Expired stacks contribute zero before the next contact, including at the exact expiration tick.

| Spell | Maximum-rank raw damage | Cost | Cooldown | Cast time | Delivery |
| --- | --- | ---: | ---: | ---: | --- |
| Q | 120 + 130% AD + 40% AP physical | 40 | 4.5 s | 0.25 s | Range 1200, width 120, speed 2000; first enemy collision |
| W detonation | 300 + 100% bonus AD + 90% AP magic | 50 | 8 s | 0.25 s | Orb range 1200, width 160, speed 1700; four-second champion mark |
| E | 280 + 60% bonus AD + 75% AP magic | 70 | 14 s | 0.25 s | Blink up to 475, then acquire within 750; bolt speed 2000 |
| R | 750 + 100% bonus AD + 110% AP magic | 100 | 90 s | 1 s | Global line, width 320, speed 2000; unit piercing |

Q is basic damage with full on-hits and life steal, while remaining a spell for spell shields and projectile walls. It does not multiply its own packet by critical chance. Each contact refunds **1.5 seconds from all four ability cooldowns**, including Q, even through a spell shield. The spell contact callback receives actual summon identity and statistics. No synthetic basic attack is declared: the model applies the attack on-hit packet, while arbitrary declaration-only on-attack passives remain outside this contract.

W passes ordinary summons and attaches only to the enemy champion in this duel model. A connected basic attack consumes its mark and separately exposes the detonation to spell shield; an ability blocked by spell shield retains the mark and restores no mana. A valid ability detonation restores **60 mana plus that ability's cost**. Attack block/dodge cannot trigger the basic-like Q detonation. The raw source does not explicitly define the initial zero-damage orb's spell-shield behavior; attaching through a shield without consuming it is an explicit interpretation. The first resolved valid packet owns a simultaneous detonation.

E first completes its blink from the then-current position, then chooses the nearest targetable enemy, prioritizing a Flux-marked champion. Health-based enemy summons can take its homing bolt; hit-count props are conservatively excluded because their acquisition class is not pinned. An invisible enemy remains eligible. Its launch-time one-second reveal is ordinary sight, represented as a mark; it does not counter invisibility. The bolt is independently blockable in flight.

R retains its cast-start location and direction. Its finite **25000** projectile range comes from the pinned `EzrealR` game object. Summons classified as minions take the separate **300 + 100% bonus AD + 110% AP** formula. No obsolete per-unit damage falloff is imported. It contacts each pierced unit once, with its own passive stack and defenses.

The policy places W before a ready Q only when the orb is in reach and no defensive cast has priority. E preserves the default defensive response and can reposition between attacks. The budget adds successful-Q cooldown refunds, one W detonation per nominal cycle, and the passive's additional basic attacks bounded by the actual attack-speed cap. Hit chance, mana exhaustion and passive buildup are still simulated outcomes; the budget estimate assumes full stacks and does not promise them.

## Lucian

The pinned wiki describes the secondary Lightslinger shot as 50/55/60% AD at levels 1/7/13. The exact game object's `TotalDamage` calculation also contains **+10% AD at level 19**, producing **70% AD at level 20**. This extension is cited to the game file, rather than attributed to the wiki. Against minion-class summons, the secondary basic packet is **100% AD**.

After a cast, a **3.5-second** empowerment is consumed when the first basic attack is declared. Once its windup actually launches, the second shot is scheduled **0.25 seconds** later and launches independently at the game-sourced **2800** missile speed. Cancelling the first windup produces no second shot. This launch-relative delay is an explicit interpretation of the source's on-attack wording. Each shot has an independent critical expectation, full on-hits and life steal, its own target, and its own E-refund tag. Projectile walls, blind, attack dodge and attack block retain their ordinary effects.

If the original target dies or becomes untargetable before the second launch, the shot can retarget within **50 units beyond attack range**, prioritizing the champion, then a low-health summon. The pinned retarget note expressly permits a champion without sight. Independent pending-shot schedules survive branch cloning without shared mutable arrays.

Vigilance starts with zero charges. An accepted immobilization of the nearby enemy champion within **1000 center units** adds two charges for **six seconds**, capped at four. Each declared empowered shot adds **5 + 15% AD magic damage**, including the secondary shot; its packet does not inherit life steal. Declaration-time consumption is an explicit timing assumption. Ally healing, shielding and allied W triggers do not exist in a two-champion duel.

| Spell | Maximum-rank raw damage | Cost | Cooldown | Cast time | Delivery |
| --- | --- | ---: | ---: | ---: | --- |
| Q | 250 + 100% bonus AD physical | 80 | 5 s | 0.25 s | Target within 500 edge units; fixed-direction beam reaches 1000, width 120 |
| W | 215 + 90% AP magic | 60 | 10 s | 0.25 s | Range 900, width 110, speed 1600; first collision |
| E | None | 0 | 14 s | None | Dash 200–425 at speed 1350; attack reset |
| R bullet | 45 + 25% AD + 15% AP physical | 100 | 90 s after channel | None | Range 1200, width 220, speed 2800; each bullet hits first enemy |

Q holds its declared direction and can be dodged. It also contacts health-based summons on the beam. Targeting a summon as a primary beam extender and early cancellation when the original target dies are not modeled.

W leaves a **six-second** mark even through spell shield. Subsequent connected damage grants **80 flat movement speed for one second**; fully shield-absorbed packets still count, while missed attacks do not. Its own newly applied mark does not trigger on that same W's preceding damage. Persistent effects trigger once per ability cast and target. The sources omit cross-explosion arm geometry, so secondary cross contacts and range-end splash beyond the known corridor are not invented. Ordinary map sight is absent.

E refunds **two seconds per Lightslinger champion contact**, or **one second per summon contact**, independently for both shots. It resets the attack timer, overlays W and R, and is locked during Q. It crosses intervening terrain when its endpoint is clear; an endpoint overlapping a wall is clipped to that wall's near edge using pathing radius. This is the one-dimensional interpretation of the explicit no-extension exception.

R's exact game calculation is **22 × [1 + critical chance × (critical damage − 1)]**. The module floors that value with a small serialization tolerance; flooring is a documented interpretation rather than executable server-script evidence. Default 200% critical damage gives **22–44 shots**. Shot count is snapshotted at declaration; each bullet's damage uses impact-time AD/AP. Minion-class summons take **90 + 50% AD + 30% AP** per bullet.

The mobile channel lasts **three seconds**; cancel recast unlocks at **0.75 seconds**, and cooldown starts when the channel ends or is interrupted. Bullets originate **35 units forward** along the original fixed facing. Their schedules use cumulative tick rounding, with the first at one interval and the final at completion; first-shot phase is not given by the source. Alternating lateral gun offsets are omitted. Root preserves the channel; silence interrupts future emissions. E preserves its original absolute end time and firing direction. Every emitted projectile has separate spell-shield, wall, target-protection and summon-interception resolution.

The initial estimate describes one bullet plus its first launch delay and flight, rather than the full channel as instant damage. Because R has zero cast time, runtime threat perception primarily sees emitted bullets and does not forecast later unlaunched shots. Per-bullet lateral avoidance remains the shared expected-value model; it does not retain a rival's sideways position between bullets.

The policy spends a primed Lightslinger attack before another offensive cast, uses an E reset when useful, and closes toward a rival beyond Culling range. The stat budget values woven secondary attacks bounded by attack speed and one complete Culling per cooldown plus channel duration. It does not grant allied Vigilance or guarantee full channel occupancy.

## Focused validation

`tests/sim/ezrealLucianAccuracy.test.ts` contains 70 passing checks covering exact source evidence and formulas, shield/mark ordering, strict expiration, blink target selection, summon contact, projectile interception, independent second shots and refund tags, cloned pending state, actual dash terrain endpoints in both directions, Culling counts/timing/impact stats/interruptions, and attack-speed-cap budget behavior.

Both kits also complete production **15000-gold** matchups against Darius in both directions with exactly reflected builds, full spending, aggregate and scenario antisymmetry within `1e-12`, and actual normal-policy use of Q/W/E/R. These checks validate the declared model; they do not remove its one-dimensional geometry, expected-value projectile avoidance, source timing interpretations or disclosed omissions.
