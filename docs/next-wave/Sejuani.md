# Sejuani: source audit and implementation boundary

This records the authored level-20 kit for dataset 16.20 (patch 26.20).
It describes implemented mechanics and explicit source gaps. The batch's final
matrix, full suite, browser checks and private package are separate release gates.

## Exact inputs

The original parsed fields, formulas, notes and revision identities remain intact.
The full raw templates are supplemental source text; numeric reads and restrictions
are checked through `KitContext` when the kit builds.

| Ability | Exact primary revision |
|---|---|
| [Fury of the North](https://wiki.leagueoflegends.com/en-us/Template:Data_Sejuani/Fury_of_the_North?oldid=3985822) | 3985822 |
| [Arctic Assault](https://wiki.leagueoflegends.com/en-us/Template:Data_Sejuani/Arctic_Assault?oldid=4007753) | 4007753 |
| [Winter's Wrath](https://wiki.leagueoflegends.com/en-us/Template:Data_Sejuani/Winter%27s_Wrath?oldid=3971350) | 3971350 |
| [Permafrost](https://wiki.leagueoflegends.com/en-us/Template:Data_Sejuani/Permafrost?oldid=4061739) | 4061739 |
| [Glacial Prison](https://wiki.leagueoflegends.com/en-us/Template:Data_Sejuani/Glacial_Prison?oldid=4008031) | 4008031 |

The exact [CommunityDragon binary](https://raw.communitydragon.org/16.20/game/data/characters/sejuani/sejuani.bin.json)
has content version `16.20.8248524+branch.releases-16-20.content.release` and SHA-256
`30ed12996a58c7e8e630bd80b6cc4332fdf3e2374875e47762eed04a1a9fc634`.
Eight complete object excerpts retain their nested records and whole arrays:

- `Characters/Sejuani/Spells/SejuaniPassiveAbility/SejuaniPassive`;
- `Characters/Sejuani/Spells/SejuaniQAbility/SejuaniQ`;
- `Characters/Sejuani/Spells/SejuaniWAbility/SejuaniW`;
- `Characters/Sejuani/Spells/SejuaniWDummy`;
- `Characters/Sejuani/Spells/SejuaniEAbility/SejuaniE`;
- `Characters/Sejuani/Spells/SejuaniEAbility/SejuaniE2`;
- `Characters/Sejuani/Spells/SejuaniRAbility/SejuaniR`;
- `Characters/Sejuani/Spells/SejuaniRAbility/SejuaniRMissile`.

Primary values win explicit conflicts. Q travels 650 despite a binary 625 value.
Frost Armor's primary level series extrapolates to 5.29411764705882 seconds at
level 20, or 159 simulation ticks; the binary's level-18 endpoint is 6 seconds.
The primary W 70-degree cone and 150 full width are retained; binary half-angle
35 and half-width 75 corroborate them.

## Frost Armor and Icebreaker

Frost Armor starts ready, adding 10 plus 75% of actual external bonus armor and
magic resistance. Each tick removes its own previous keyed contribution before
recomputing it, preventing recursive scaling and reflecting other real buffs.
New slows and cripples are refused. Existing slows keep their bypass marker and
existing cripples remain effective; acquiring armor does not cleanse them.

The first positive or shield-absorbed qualifying damage starts one fixed three-
second linger. Later qualifying damage updates the out-of-combat recovery clock
without extending that linger. Actual champions and explicitly classified large
monsters qualify. Unknown monster size, ordinary minions and ordinary pets do not
inherit their owner's champion identity. No ambient turret or monster is created.

An accepted own E or R stun marks the actual body Frozen for its captured,
tenacity-adjusted stun duration. CC immunity prevents the mark. Q's airborne does
not create one. A subsequent accepted damaging ability or unblocked, nonblind
basic consumes that body's mark for 10% of its maximum health as magic proc damage.
Only explicitly epic monsters apply the 250 cap. The stun-applying packet cannot
immediately consume its own newly created mark. Target marks are independent
across real pets, champions and cloned simulation branches.

The primary leaves Icebreaker spell-shield and dodge behavior pending testing.
The model uses the shared guarded proc path and discloses this choice. It captures
the original accepted stun duration; the source does not establish whether a later
cleanse also removes the independent Frozen mark, so that interaction remains an
explicit boundary rather than an additional invented cleanse rule.

## Frostbrand and Permafrost

Each target starts with zero Frost. Accepted own basic on-hits and individual W
swings add one of four stacks and refresh the five-second lifetime. A real allied
Champion-class pet within the 1100 aura adds exactly one stack per connected,
unblocked basic when its attack is explicitly classified melee. Multiple damage
packets in that one attack do not multiply Frost. Blind, dodge and parry deny the
contact; unknown attack classification, ranged allies and nonchampion pets do not
qualify. No allied body is created merely to grant stacks. Frozen bodies cannot
gain stacks. Actual Champion-class bodies, explicitly medium or large
Monster-class bodies, and explicitly large Minion-class bodies qualify. Names and
hitbox size do not substitute for missing classification.

E is available only with an actual visible eligible four-stack target within 600.
Cursor priority follows the primary's champion-within-50, nonchampion-within-50,
champion-within-350, then nearest-within-2500 order. Declaration locks one actual
recipient. The 0.25-second cast pays 20 mana and starts its 1.5-second hasted cooldown
even if that recipient becomes hidden, untargetable, dead or out of range. A valid
completion resets Sejuani's attack clock and releases the exact 2000-speed E2
projectile for 255+70% AP magic damage and a one-second stun.

Perception announces one locked recipient with the real cast-plus-flight delay,
projectile identity and 255+70% AP packet. Pet recipients do not become phantom
damage to their champion owner. Invalidated cast recipients remove that forecast
without changing the paid cancellation rule. Already released E flight remains
relevant after caster death.

E/R bola contact consumes that body's Frost, including guarded contact, and starts
eight seconds of Frost immunity for actual champions. No immunity is borrowed by
a pet's owner. E's slight move-block distance is unpublished: an accepted stun
interrupts interruptible dash/forced movement without fabricating a displacement
distance or airborne status; displacement immunity preserves the stun and refuses
that movement interruption.

## Arctic Assault and Winter's Wrath

Q costs 80 mana and moves at 1000 with a 650 maximum, zero minimum aimed distance,
75 center-to-edge sweep radius and actual per-body swept contacts. It damages
each passed body once for 290+75% AP and applies 0.5 airborne. The first actual
Champion-class body stops it even if spell shield guards the packet. Untargetable
bodies do not collide. It can overlay another spell without cancelling either
clock and uses the shared terrain-crossing endpoint rule. The primary's slight
champion knockback and fixed minion/monster pull have no numeric distance; those
offsets are omitted while the quantified airborne remains.

W costs 60 mana at declaration and retains an actual mobile one-second cast.
The first cone swing occurs 0.25 seconds into it, dealing 45+30% AP+4% maximum HP.
The second line swing occurs at one second, dealing 85+60% AP+8% maximum HP and
slowing 75% for 0.25 seconds. Both use the original cast direction but each uses
the caster's then-current position. Each independently resolves real bodies,
spell shields and Frost. Sejuani's death suppresses the unfinished second swing;
an overlapping Q preserves the absolute swing deadlines. The 1D duel represents
the cone on its axis and does not invent lateral contacts. W's unpublished
nonchampion knockback distance is omitted.

## Glacial Prison

R costs 100 mana and casts for 0.25 seconds, then travels 1300 at 1600 with a 120
collision radius. It passes nonchampions and stops on the first actual Champion-
class body. Before 425 actual travel it deals 175+40% AP and stuns one second;
at and beyond 425 it deals 400+80% AP and stuns 1.5 seconds. Empowered real contact
centers one storm on that actual body and excludes that same primary from every
storm packet. A real champion clone retains its own identity; its owner is not
the primary by association.

A natural maximum-range miss also creates one ground storm. A destroying wall
suppresses both the bola and an invented endpoint storm. Braum interception
retains its legitimate champion contact and exactly one collision-centered storm.
Released missiles and storms persist after caster death.

The primary gives 1.5 seconds for the initial 30% storm slow but separately says
the storm shatters after two seconds; binary ZoneDuration is 2. Both primary
statements are retained, leaving the disclosed 0.5-second interval without the
initial slow. At two seconds, each actual secondary body within 450 receives one
400+80% AP area packet, 80% slow for one second and 0.5-second standard sight.
The primary body remains excluded. The initial sight radius is 300. Sight is
represented on affected real bodies, without inventing unseen map objects or a
second immediate area-damage packet at maximum range.

## Ordinary decisions and reference spending

Fight, trade, hold and flee use real Q/W/E/basic actions; hold and trade reserve R.
A completed trade retreats before optional spells. W is not cast against a target
outside its actual reach. E remains a target-local four-stack action.

The reference model prices both W swings and primary empowered R. E and
Icebreaker use the four-stack cadence plus the target-local eight-second champion
lockout instead of treating E's 1.5-second recharge as unrestricted damage.
Purchased resistance multipliers are averaged over the nominal initial three
seconds of the ten-second defense window. That approximation omits the passive's
flat 10 resistance from the spending hint and cannot predict real future armor
recovery; the ordinary simulator uses the full actual passive and clocks.

## Actual packet forecasts

W announces its first and second packets separately at their original 0.25- and
one-second deadlines. Each forecast follows the caster's current position and
fixed direction, disappearing outside the actual axial hit interval or once its
packet is delivered. The generic W cast contributes no duplicate combined packet.
The two swings are priced once through an explicit total-damage reference hint.

R announces the current first eligible actual champion contact, with the correct
near or empowered damage, stun and finite arrival clock. An earlier actual
champion clone hides a direct forecast to its owner while preserving the real
missile's collision entitlement if that clone subsequently moves or dies. The
storm announces its separate finite shatter packet only for an actual secondary
recipient in the area; its original primary remains excluded. Forecast carriers
neither resolve combat packets nor alter the source flight and collision rules.

The focused regression fixture that exposed duplicated W/E damage and the near-R
overestimate is preserved at
`/workspace/counter-browser/batch12-sejuani-perception-before-fix.mts`, with its
actual output beside it. Captured cooldown and cast values are also used by the
reference allocator after source readers seal; combat and allocation hooks never
reopen the pinned ability records.

The focused mechanics run passed 102 tests, with two production checks deliberately
excluded. Its actual report is
`/workspace/counter-browser/batch12-sejuani-accurate-forecasts-final.json`, with
the adjacent `.log`. The suite covers source failure, actual-body classifications,
resistance recomputation, fixed linger/recovery, inherited CC, packet guards,
Frozen consumption, actual E invalidation, mobile and concurrent W clocks,
swept Q contacts and both orientations, the R travel threshold, exact primary
exclusion, natural range expiry, destroying walls, Braum interception, caster
death and branch isolation. It also checks exact W packet deadlines, locked E
cast-plus-flight forecasts, current R near/far and clone collision ordering,
first-frame initialization, actual E/R impact-tick agreement, secondary storm
forecasts and the sealed reference-budget hook.

The first serial gate exposed an overstrong new assertion requiring every spell
in the Darius fights. An observational trace recorded 3,030 ticks, zero E-ready
ticks and no four-stack target: the sourced R Frost immunity prevents assuming
that E must occur. The production assertion now checks the actions those fights
actually use; a separate ordinary-policy case verifies E after four real basic
Frost applications. All 105 Sejuani tests, including both full 15,000-gold
Darius-reversal and Heimerdinger checks, pass in
`/workspace/counter-browser/batch12-sejuani-production-policy-corrected-tests.json`.
The failed first gate and its exact logs remain preserved separately.

The final melee policy addresses the initial R-first lockout. In fight mode,
R waits only when the actual enemy is in ordinary basic reach, basics can connect,
E has its real cooldown and mana available, and the target has neither Frozen nor
Frost immunity. A legal E is prioritized, including an allowed overlay. R may
then consume E's Frozen, apply its own accepted stun, and leave a second actual
Icebreaker for the next basic. This delay does not extend throughout W's 600 range;
blindness, basic avoidance, unavailable E, existing immunity/Frozen, potential
raw R finishing damage or a potentially lethal visible raw forecast allow R.
These finishing/urgency gates are policy estimates, not claims of optimal play.
Idle, completed trades, hold/trade R reservation and fleeing retain their modes.

The final Sejuani suite passes all 115 tests, including both full-budget production
cases. The Darius case now actually uses all four spells. Additional regressions
check melee W/basic sequencing, each R exception, a real E overlay, and separate
5,000-damage Icebreakers around the 215-damage near R on an actual 50,000-HP test
champion. Report:
`/workspace/counter-browser/batch12-sejuani-melee-combo-production-all-spells-tests.json`.
The earlier traces describe the preserved policy before this update.

A final review caught an E priority regression at an elapsed trade deadline before
`tradeDone` had been recorded. The actual failing case is retained in
`batch12-sejuani-trade-deadline-before-fix.json`. The policy now evaluates and
reuses the ordinary trade decision before prioritizing E, preserving its actual
bookkeeping. All 116 Sejuani tests pass, including that deadline, the melee combo
and both full-budget production cases:
`/workspace/counter-browser/batch12-sejuani-trade-deadline-final-tests.json`.
