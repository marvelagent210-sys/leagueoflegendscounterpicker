# Neeko implementation audit

Batch 15 implements Blooming Burst, Shapesplitter, Tangle-Barbs and Pop Blossom,
with a restricted, explicit Inherent Glamour form path. The ordinary duel starts
without an allied champion, stored disguise, clone, passive stacks or minion
wave. This records the implementation and evidence limits; the batch release
pipeline records its actual matrix and full validation separately.

## Exact source inputs

Every original parsed ability record and value is preserved. Full raw revisions
are retained as attributed supplements, alongside exact object-scoped excerpts
from the versioned champion binary.

| Ability | Exact wiki revision |
|---|---|
| Inherent Glamour | [4049951](https://wiki.leagueoflegends.com/en-us/Template:Data_Neeko/Inherent_Glamour?oldid=4049951) |
| Blooming Burst | [3961205](https://wiki.leagueoflegends.com/en-us/Template:Data_Neeko/Blooming_Burst?oldid=3961205) |
| Shapesplitter | [4022848](https://wiki.leagueoflegends.com/en-us/Template:Data_Neeko/Shapesplitter?oldid=4022848) |
| Tangle-Barbs | [4078265](https://wiki.leagueoflegends.com/en-us/Template:Data_Neeko/Tangle-Barbs?oldid=4078265) |
| Pop Blossom | [4058467](https://wiki.leagueoflegends.com/en-us/Template:Data_Neeko/Pop_Blossom?oldid=4058467) |

The retained [Champion summoned units revision 4023248](https://wiki.leagueoflegends.com/en-us/Champion_summoned_units?oldid=4023248)
establishes a clone's distinct identity and champion classification. It does
not supply a complete Neeko-specific clone stat table.

The [16.20 champion binary](https://raw.communitydragon.org/16.20/game/data/characters/neeko/neeko.bin.json)
has version `16.20.8248524+branch.releases-16-20.content.release` and SHA-256
`7fc551c4a04661918bc1e0ed166e5c682306c80bc004bb3e924c5a8ed0b0eb7a`.
Eighteen source records retain the relevant passive, attack, clone and spell
objects. Client values support the audit and retain conflicts; they do not
silently override the primary wiki.

## Maximum rank and level 20

| Mechanic | Implemented value |
|---|---|
| Blooming Burst | 260 + 60% AP initial magic damage, then up to two 135 + 25% AP blooms; 95 extra monster damage per bloom |
| Q clocks and geometry | 90 mana; 7-second cooldown at declaration; 0.25-second cast lock; 800 range; 2000 seed speed; 250 radius; 0.75 seconds between earned blooms |
| Shapesplitter passive | Two connected ordinary on-hits prepare the next declared basic; 170 + 60% AP bonus magic damage, plus 75 against monsters; 40% movement for one second |
| Shapesplitter active | No mana cost; 40% movement for three seconds; 0.5-second invisibility; clone lifetime three seconds; 900 command range; 12-second cooldown after clone expiry |
| Tangle-Barbs | 220 + 65% AP magic damage; 80 mana; 10-second cooldown; 0.25-second cast; 1000 range |
| E flight and control | First contact uses 1300 speed, 140 width and 1.5-second root; later contacts use 1500 speed, 200 width and three-second root |
| Pop Blossom | 550 + 120% AP magic damage; 100 mana; 90-second cooldown at activation; 1.25-second free windup followed by 0.6-second cast |
| R contacts | 590 centered knockup radius for 0.6 seconds, then 600 centered damage/stun radius with 0.75-second stun |
| Restricted Sho'Ma | Two seconds gathering within 400 units; one-second activation cooldown; two attacks per second source-form cap; 200 final movement-speed floor |

All numeric source values are read through `KitContext` during compilation.
Runtime behavior and valuation use captured numeric formulas, avoiding reads
from the sealed source context.

## Blooming Burst and actual contacts

The primary's `Effect at cast time start` rule releases the seed at declaration.
Its 0.25-second action lock continues independently. The chosen ground point,
launch origin and direction are captured then; subsequent caster or enemy
movement cannot retarget it. A backward aim sends the actual projectile
backward. Out-of-range aims clamp to 800 units. Projectile destruction removes
the pending landing, so it cannot create later blooms.

Each burst examines actual recipients in the fixed area. A champion contact,
an explicitly large monster contact, or a real kill can earn the next burst.
A surviving ordinary minion does not. Radius alone does not classify a large
monster. Spell shields block an individual packet but preserve its qualifying
contact and the following bursts. Stasis and untargetability exclude the
protected body at that burst. Each later burst must independently earn another;
the sequence stops when no qualifying body remains, with at most two additions.

The ordinary shared skillshot system supplies decisive branches. At its branch
cap, a champion-dependent follow-up retains the earned probability weight
rather than turning a partial hit into two guaranteed hits. An independently
qualifying actual pet contact may earn a full follow-up. Later bursts share
that earned history; there is no invented independent accuracy roll per bloom.
World copies retain separate finite bloom state. Seeds already released and
earned later bursts can finish after Neeko dies, while no unreleased spell is
created by death.

## Passive attacks, clone and root missile

Shapesplitter starts at zero stacks. Two real connected ordinary attacks prepare
the next declaration. That declaration consumes the stacks, removes projectile
flight and grants movement speed, even if its eventual attack is cancelled,
blinded or dodged. The physical basic packet and extra magic packet remain
separate. Ordinary avoidance and damage blocks still apply. Ward/plant-like
contacts do not consume the empowerment. No passive attacks are assumed before
the duel.

W places one actual champion-class clone with independent health, hitbox,
target identity, statuses and expiry. It has no damaging basic attack and does
not cast copied damage. Owner stats snapshot its HP, resistances, radius and
movement because the retained generic clone article does not establish a full
Neeko-specific table. This is an explicit unresolved interpretation. The clone
is untargetable and invisible for its initial 0.5 seconds. Afterwards actual
positive damage shortens its remaining life to 0.5 seconds, following the
primary; the client's 0.75-second timer is retained as conflicting evidence.
The primary also reports inconsistent disappearance from certain damage-over-
time sources, which is not inferred as a guaranteed exception.

Manual W recasts command the existing body, retaining its identity and
reporting no second ability activation. Commands, real movement control,
terrain and expiry govern its actual movement. Damaging spell declarations
stop its old command. Clone attack/cast animations, emotes and Recall lifetime
extensions are cosmetic or outside the represented command set. The 12-second
hasted cooldown begins when the clone actually expires. Casting a basic attack
breaks Neeko's own invisibility at windup through the ordinary shared rules.

E releases after its 0.25-second cast from the actual completion position,
following the captured declaration direction. It pierces real contacts in
spatial order. The first body receives the initial root; after that contact the
same missile widens, speeds up and supplies the longer root to later bodies.
A spell-shielded first contact still empowers it. Projectile walls, spell
shields, parry, target protection, tenacity and CC immunity remain independent
defenses. No phantom first minion is inserted to guarantee an empowered root.

## Separate ultimate clocks

R activation pays mana and begins cooldown immediately. It starts a 1.25-second
windup that permits ordinary actions; it is not treated as an interruptible
generic channel. The later 0.6-second cast then starts, including during
stasis as the primary explicitly allows. Its initial centered 590-radius
knockup and later centered 600-radius burst are distinct contacts and test
spell shields separately. One ordinary spell-shield charge cannot deny both.

Actual displacement can change Neeko's position before each area is evaluated.
Death before the landing prevents unreleased damage. The implementation grants
no obsolete shield from the client's retained R shield object. A disguise is
removed at the separately sourced half-second reveal deadline. Automatic duel
behavior activates R only within its actual initial radius and uses W for
defensive escape when there is a represented threat.

## Restricted Inherent Glamour and remaining gaps

No allied champion or stored Sho'Ma is supplied to an ordinary two-champion
duel. A manually represented visible allied minion or non-epic monster can
provide a form after two continuous seconds as the nearest eligible body within
400 units. Only one collected form is stored. The represented form snapshots
the source's nominal attack/range/projectile, size, pathing and movement data;
it does not borrow HP, AD, armor or MR. Its lower base movement speed is adopted,
and a separate final 200-speed floor applies after slows and soft caps. Faster
source base movement is not inherited. Breaking the disguise restores the
original attributes and floor independently in each world branch.

This path does not implement the complete Disguise Menu, allied-champion
forms, neutral ownership, ward/plant/trap forms, cosmetic leap, server gathering
progress across switching targets, source-specific attack damage categories,
turret aggro, or individual champion targeting exceptions while disguised.
The source form uses stored nominal attack rate rather than a continuously
recomputed external actor's buffed attack rate. Those are explicit limits of
the restricted manual form path and must not be read as full Inherent Glamour
coverage. The ordinary duel AI never fabricates a form to obtain those bonuses.

## Valuation and verification

Generic delivery valuation counts Q's initial packet and E. Manual budget
contributions add the passive's one-in-three basic cadence, two nominal earned
Q blooms, and the hook-owned ultimate once. They do not price a phantom minion,
an attacking clone, copied ally damage or a disguise's unprovided stats.
Actual resource costs, contacts, defenses, branches and clocks decide which
of those nominal opportunities occur in a duel.

`tests/kits/neeko.test.ts` covers the source-backed formulas, declaration seed
release, captured and backward aims, finite/weighted bloom progression,
actual minion and monster contacts, shields and projectile destruction,
released effects after death, passive consumption and misses, clone identity
and lifetime, ordered E empowerment, the separate R radii and stasis/death
rules, and restricted real-body form gathering, restoration and branch safety.
