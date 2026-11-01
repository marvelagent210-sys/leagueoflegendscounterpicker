# Vex implementation audit

Batch 15 implements Doom 'n Gloom, Mistral Bolt, Personal Space, Looming
Darkness and Shadow Surge from dataset 16.20. Damage, marks, casts, movement,
projectiles, shields and cooldowns use the actual simulated bodies. This is a
kit simulation; its results are not measured match win rates.

## Exact source inputs

All five original parsed ability records and their values remain intact. Each
retains its full pinned raw revision and separately attributed excerpts from the
versioned champion binary.

| Ability | Exact wiki revision |
|---|---|
| Doom 'n Gloom | [3986733](https://wiki.leagueoflegends.com/en-us/Template:Data_Vex/Doom_%27n_Gloom?oldid=3986733) |
| Mistral Bolt | [4053302](https://wiki.leagueoflegends.com/en-us/Template:Data_Vex/Mistral_Bolt?oldid=4053302) |
| Personal Space | [4008547](https://wiki.leagueoflegends.com/en-us/Template:Data_Vex/Personal_Space?oldid=4008547) |
| Looming Darkness | [4034711](https://wiki.leagueoflegends.com/en-us/Template:Data_Vex/Looming_Darkness?oldid=4034711) |
| Shadow Surge | [4057925](https://wiki.leagueoflegends.com/en-us/Template:Data_Vex/Shadow_Surge?oldid=4057925) |

The [16.20 champion binary](https://raw.communitydragon.org/16.20/game/data/characters/vex/vex.bin.json)
has version `16.20.8248524+branch.releases-16-20.content.release` and SHA-256
`a119398a4f9857af030c8ede72b087aa4ed699601a94f1c813b4f5afa219daa9`.
Thirteen object-scoped sources retain supporting ability, missile and passive
definitions. Numeric values used by the kit are read through `KitContext`.
Client parameters support the attribution without silently replacing a
conflicting primary value.

## Maximum rank and level 20

| Mechanic | Implemented value |
|---|---|
| Doom | Static 16-second cooldown; 1.5-second fear; 60–99% slow using the primary distance bands from 250 to 800 units |
| Gloom | `40 + 110 / 17 × 19` = approximately 162.941176470588 + 25% AP magic damage; 60% of this damage against nonchampions |
| Gloom history | Six-second mark; 1600 detection radius; champion detonation refunds 25% of the full Doom cooldown, other eligible bodies refund 10% |
| Mistral Bolt | 250 + 70% AP magic damage; 65 mana; 4-second cooldown; 0.15-second cast; 1200 range |
| Personal Space | 240 + 30% AP magic damage; 150 + 75% AP shield for 2.5 seconds; 75 mana; 12-second cooldown; 0.25-second mobile cast lock |
| Looming Darkness | 130 + 60% AP magic damage; 50% slow for 2 seconds; 110 mana; 12-second cooldown; 0.25-second cast; 800 cast range |
| Shadow Surge | 175 + 20% AP initial damage and 350 + 50% AP arrival damage; 100 mana; 100-second post-effect cooldown; 0.25-second first cast; 3000 missile range |

Gloom uses the primary's explicit level progression through level 20, rather
than stopping the level-18 value at 150. No Gloom mark, target movement,
previous kill or ultimate reset is granted before the duel starts.

## Doom and Gloom lifecycles

Doom starts ready. Declaring Q, W or E spends it and starts its static clock,
including a cast that later misses. Ability haste does not shorten that clock.
Each released spell captures whether that cast owns Doom; casting another
basic spell cannot steal an empowerment from a missile already in flight.
R does not consume Doom.

Accepted Doom control fears the actual recipient and interrupts a champion's
interruptible dash. The primary explicitly exempts nonchampions from that
knockdown. Q and W fear away from Vex; E fears away from its actual explosion
center. The fear slow uses distance from Vex, independently of the E flee
origin. Its strength interpolates the source's distance bands and remains
dependent on the exact accepted fear from the same caster and ability.
Cleansing that fear removes the slow's effect immediately, including a cached
movement-speed read. Slow immunity and resistance retain their normal roles.
The primary's explicit exception preserves accepted fear after Vex dies;
normal expiration and cleanses still apply.

Actual hostile dash and blink events create Gloom on champions, explicit clones
and represented native monsters. Forced displacement and the specified Yone
Soul Unbound return do not. Blink detection uses the position the body left:
entering from outside 1600 units does not create a mark. A continuing dash
creates one event entitlement, with the source-backed 0.5-second listener
lockout. A later distinct eligible event may refresh the mark. Protected
untargetability does not prevent the passive mark itself.

The simulator stores ordinary minions, monsters and summons in the same pet
container. Their targeting class alone cannot establish that a unit is native.
The explicit `summoned:false` marker distinguishes represented native units;
existing summoned minion-class bodies remain summons. E can also mark an actual
native minion, while ordinary summoned pets remain excluded except clones.
An actual champion clone receives the nonchampion damage and cooldown refund.
These classifications do not manufacture a wave, monster or ally.

Vex's ordinary combat model has two real champion units. It does not generalize
an extra champion body placed in the pet container into every real-champion
passive or takedown interaction. The explicit clone and native-unit paths above
remain separate from those two champion identities.

Q, W and connected basics can consume a target-local Gloom mark once. E applies
or refreshes it without detonating it. An empowered basic becomes non-projectile
and retains its ordinary AD packet; near-expiry marks extend to at least half a
second when that windup starts. Blind, dodge and parry retain ordinary contact
rules. A damage-only basic block can consume the mark and grant its refund
while preventing the extra damage. A spell shield blocks the ordinary spell
and Doom payload; the primary separately allows Gloom's mark and empowered
basic attack interaction.

## Spell geometry and counterplay

Mistral Bolt launches from Vex's completion position in its declared direction.
It starts at 600 speed and 360 width, changing after 500 actual travel units to
3200 speed and 160 width. The simulator samples the transition on its 30 Hz
clock. It does not invent an intermediate client acceleration curve. Its hit
probability uses the shared model's initial width and speed; the subsequent
narrow geometry is not a second independent hit roll. Actual pet contacts,
projectile destruction, spell shields and parry remain active. A released bolt
can finish after its owner dies.

Personal Space resolves its damage and self shield at declaration, before the
0.25-second lock finishes. Vex may move during that lock. Its ordinary radius is
475, increased to 550 against a champion currently dashing. Each actual nearby
recipient has separate defenses. Blocking an enemy's spell contact does not
remove Vex's independent self shield. The current pet representation does not
give ordinary pets a champion dash action from which to infer that enhancement.

Looming Darkness captures its absolute location and cast distance at declaration.
Later movement by either champion cannot move the landing or resize it. The
projectile launches from Vex's completion position at 1300 speed. Its actual
radius is selected before both the probability decision and contact resolution.
The primary lists radii from 200 to 300 but omits the intermediate cast-distance
breakpoints. The implementation therefore discloses a linear interpolation over
0–800 distance. The client's `RadiusGrowthRate:13` has no published distance or
time unit and does not establish those missing breakpoints. The missile may be
destroyed even when no champion would be hit. A real E kill refunds Doom once;
there is no assumed farming refund.

## Shadow Surge

The first missile travels at 1600 speed with 260 width, piercing ordinary
nonchampion bodies and stopping on an actual champion or explicit
champion-class clone. The mark retains the actual body's identity for four
seconds, supplies its sourced reveal, and grants a separately guarded recast.
A spell shield can deny that mark. Root, ground and an untargetable marked
target prevent declaring the recast.

A shielded or parried first contact still ends that missile and releases its
pending own state, allowing the ordinary post-effect cooldown to start. It
does not leave the cooldown held indefinitely while waiting for a mark that
was never granted.

The recast tracks its actual moving body without a maximum chase distance.
It grants displacement immunity, forbids ordinary movement, attacks and basic
casts during the custom dash, and may cross terrain. It grants no general
damage or crowd-control immunity. The pinned wiki labels its 2200 dash speed
as estimated; that uncertainty remains explicit. The existing implementation
pauses that custom movement during actual stasis. Stasis-item interruption is
not separately verified by the retained source table.

Arrival deals its independently defended damage, consumes the mark and ends
the dash. A takedown of the credited real champion within eight seconds grants
one free first cast, available after 0.5 seconds for a finite twelve-second
window. Credit is installed before the first hit's damage, so a lethal initial
hit can earn the reset. An ordinary duel creates no second champion or
guaranteed reset. Clone death is not treated as a real champion takedown.

The primary specifies a post-effect cooldown without defining the unused-reset
boundary. The implemented policy starts the ordinary hasted cooldown when an
unused free-repeat window expires. This is an explicit unresolved server timing
detail. The free cast cannot remain available after that deadline. Standard
trajectory sight is represented on actual nearby bodies for the source's
estimated 0.4 seconds, within 650 units; it is not a map-vision or terrain-sight
simulation.

## Valuation and verification

The nominal budget includes ordinary Q/E/R first-hit throughput, one Gloom
detonation at E's reference rate, the R arrival packet at its normal cooldown,
and Personal Space's damage and shield once each. All source numbers are
captured before the source reader is sealed. Runtime outcomes still pay mana,
resolve finite state, wait for actual contacts and apply defenses. Nominal
throughput is not a guarantee that every skillshot, detonation or recast lands.

The default behavior uses W when its actual range and mode permit it, pursues a
legal R recast in fight/trade modes, leaves a completed trade alone, and respects
the dash lock. It creates no preloaded marks, farmed minions or artificial
reset victims.

`tests/kits/vex.test.ts` covers attributed formulas, sealed-source valuation,
Doom spending and inheritance, real movement identity and exclusions, Gloom
consumption/refunds, branching, immediate W, Q's transition and blockers,
declared E geometry and native-unit eligibility, dependent fear slows, real
E kills, target-guarded R tracking and the finite reset window. Batch-wide
source, production worker, full-suite and matrix evidence is recorded by the
release pipeline separately; this document is not a completed release report.
