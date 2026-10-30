# Swain implementation audit

Batch 15 implements Ravenous Flock, Death's Hand, Vision of Empire, Nevermove,
Demonic Ascension and Demonflare from dataset 16.20. The model follows actual
cast, target, projectile, health, resource and movement state. It does not use a
champion's observed matchmaking win rate.

## Exact source inputs

Every original parsed field, note and attributed source remains intact. The
records also retain their complete exact raw revisions and excerpts from the
versioned champion binary.

| Ability | Pinned revision |
|---|---|
| Ravenous Flock | [4008055](https://wiki.leagueoflegends.com/en-us/Template:Data_Swain/Ravenous_Flock?oldid=4008055) |
| Death's Hand | [4042686](https://wiki.leagueoflegends.com/en-us/Template:Data_Swain/Death%27s_Hand?oldid=4042686) |
| Vision of Empire | [4078269](https://wiki.leagueoflegends.com/en-us/Template:Data_Swain/Vision_of_Empire?oldid=4078269) |
| Nevermove | [4008056](https://wiki.leagueoflegends.com/en-us/Template:Data_Swain/Nevermove?oldid=4008056) |
| Demonic Ascension | [4020887](https://wiki.leagueoflegends.com/en-us/Template:Data_Swain/Demonic_Ascension?oldid=4020887) |
| Demonflare | [4002226](https://wiki.leagueoflegends.com/en-us/Template:Data_Swain/Demonflare?oldid=4002226) |

The [16.20 champion binary](https://raw.communitydragon.org/16.20/game/data/characters/swain/swain.bin.json)
has version `16.20.8248524+branch.releases-16-20.content.release` and SHA-256
`c3669d990eb0d2af8be1387ff7fb3ff4380dfed1da496567392aa14a40d4a2fe`.
Its object-scoped excerpts support missile geometry, ability data and tick
timing. They do not silently replace a conflicting primary value.

## Maximum rank and level 20

| Mechanic | Implemented values |
|---|---|
| Ravenous Flock | 15 bonus health and 6% maximum-health healing per actual collected fragment; 1200 raven speed; 1100 pickup distance |
| Death's Hand | 180 + 45% AP magic damage for the first bolt, plus 45 + 11.25% AP per extra bolt; five rays over a 32-degree fan; 725 range; 60 mana; 3-second cooldown |
| Vision of Empire | 250 + 60% AP magic damage, halved only for actual minion-class recipients; 325 radius; 7500 range; 50% slow for 1.5 seconds; 80 mana |
| Nevermove | 850 outward range; no outward damage; 250 + 70% AP on return detonation; 100 detonation radius; 1.5-second root; independent 290-unit pull; 70 mana |
| Demonic Ascension | 17.5 + 2% AP persistent magic and 22.5 + 2.5% AP + 0.75% bonus HP healing per 0.5-second drain; 90% less healing from minions and monsters; 650 reach; 100 mana; 120-second hasted cooldown |
| Demonflare | 350 + 40% AP magic damage; 675 range; 3000 missile speed; 50% slow decaying over 1.5 seconds; static 8-second cooldown |

Numeric ability and binary values are read during compilation through
`KitContext`. `souls` is explicit nonnegative integer history and defaults to
zero. No farm, extra champion, prior heal or future gold is invented.

## Actual fragments and spells

W and the independent E pull send a real finite raven from their actual victim.
Collection waits for its arrival at living Swain. Increasing maximum health
first grants its 15 current health, then the 6% heal uses the resulting maximum.
Healing denial and Grievous Wounds still apply. A real hostile champion death,
including a represented champion-class summon, creates a fragment that becomes
collectible after one second and expires after 16 seconds. Collection and death
notifications are deduplicated; expiry and minion kills do not become champion
deaths. Killing Swain discards uncollected carriers without paying a heal.

Q uses five actual rays and each recipient's circle to determine its number of
contacts. Its source is Swain's completion position with declaration facing;
crossing him does not reverse the fan. One spell shield blocks the entire
per-recipient spell. The implementation divides that recipient's total damage
equally across its connected bolts, so flat reductions are applied per bolt.
The exact raw revision comments question that even split. This packet policy
is an explicit uncertainty, not a server-verified result. The primary's
nonprojectile completion contacts take precedence over the client's 0.2-second
dummy flight. Contacts share a completion snapshot; an unsupported order or
precise inter-bolt delay is not invented. The declared finite cast can finish
after Swain dies, with mana and cooldown paid once at declaration.

W captures its absolute selected point at declaration, then lands after its
0.25-second cast and 1.5-second delay. Enemy or caster movement cannot retarget
the area. Each actual recipient has independent hitbox geometry, defenses and
damage. Minion classification alone halves its damage; monsters and unknown
classes do not silently become minions. Actual champion-class recipients gain
six seconds of ordinary sight even when their damage/Soul contact is stopped
by spell shield or parry. Sight does not expose invisibility. Unfinished casts
do not survive death, while released areas can finish.

Nevermove launches at declaration and has harmless outward and damaging return
legs. It follows the pinned stepped speed tables, beginning at 1125 outward and
2000 returning, rather than a contradictory acceleration sign in the prose.
The return follows the actual moving owner and detonates on the first actual
eligible hostile body, including a represented minion or summon. Primary
100-radius detonation takes precedence over the binary's 205 value. Nearby
recipients receive independent spell defenses and roots. Projectile walls and
interception stop the real leg; a return miss uses ordinary finite branching.

E2 is free and can overlay another actual cast. It operates only on actual
champion-class targets still rooted by this Swain's E. Root removal, a dash or
a blink permanently revokes that root's recast entitlement. Another source's
root cannot substitute. Each target has separate spell-shield/parry guards.
The 290-unit pull rebounds excess distance on the starting side if it would
cross Swain. Pull travel duration is unsourced: guarded immediate displacement
models interruption and terrain clipping without inventing an airborne hold.
The original root retains its own expiry. Motion immunity can deny movement
without denying a separately accepted Soul contact.

## Demonic Energy and Demonflare

R pays mana and starts its hasted cooldown at declaration, then activates after
its mobile 0.5-second cast. Its first drain/energy tick is 0.5 seconds later;
that initial phase is explicit because the primary does not quantify it.
Energy starts at 50, loses 5 per tick, or 7.5 after five seconds, and gains 10
once per tick if at least one actual champion was successfully drained, capped
at 50. Minions and monsters grant their reduced healing without sustaining
champion energy. Actual champion takedowns refill energy. Spell shields do not
block the aura. Damage immunity can prevent HP loss without preventing its
separate healing, while untargetability and stasis deny the contact.

Demonflare unlocks two seconds after activation. It has an independent static
eight-second cooldown and at most 100 releases per activation. After its
mobile 0.25-second cast, two opposed axial missiles begin at Swain's actual
completion position. Their cast identity prevents duplicate contacts. A wall
can stop one ray while the other continues. The accepted slow decays on the
actual recipient, including pets, and respects expiry, resistance and cleanses.
Released missiles can finish after death; the aura cannot.

Live energy exhaustion can release an available nova, while death never does.
An unavailable nova does not become a free cast. A manual nova already in its
cast lock can still complete alongside an exhaustion release, retaining the
specific source-described edge rather than concealing it.

## Behavior, budget and verification

AI prioritizes legal pulls, uses R near real foes, preserves a fresh ultimate
in hold/trade modes, and retreats after completed trades. Budget damage uses
actual axial Q contacts at normal attack reach, sourced hasted basic-spell
rates, a ten-second mana envelope, and a five-second R engagement amortized
over its real cooldown. It prices no imaginary multi-target heal or extra
Soul history.

Focused tests cover source formulas and sealed context access, exact geometry,
per-bolt reductions, declaration/completion positions, a declared Q surviving
death, W declaration capture, delayed ravens, real clone/minion/monster
recipients, death/drop deduplication and expiry, exact Nevermove speed steps,
first-body return collision, E2 entitlement and immunities, resource and energy
clocks, automatic/manual flare edges, branch independence, AI, and strict
production Darius reflection. The complete batch matrix and release verdict
are separate root validation steps; this document does not claim they passed.

Remaining boundaries include lateral map navigation, independent fog-of-war
benefits, unsourced pull duration, exact Q packet chronology and the questioned
even damage split. The 1D world only contains actual represented bodies.
