# Xerath implementation audit

Batch 15 implements Mana Surge, Arcanopulse, Eye of Destruction, Shocking Orb,
and Rite of the Arcane from dataset 16.20. This is a kit simulation with actual
cast, resource, movement, projectile and target state. It does not infer a
win rate from live match statistics.

## Exact source inputs

The original parsed records remain intact. Each retains its complete raw wiki
revision as an attributed supplement, with separately attributed excerpts from
the exact versioned champion binary.

| Ability | Exact wiki revision |
|---|---|
| Mana Surge | [3986753](https://wiki.leagueoflegends.com/en-us/Template:Data_Xerath/Mana_Surge?oldid=3986753) |
| Arcanopulse | [4057478](https://wiki.leagueoflegends.com/en-us/Template:Data_Xerath/Arcanopulse?oldid=4057478) |
| Eye of Destruction | [4008622](https://wiki.leagueoflegends.com/en-us/Template:Data_Xerath/Eye_of_Destruction?oldid=4008622) |
| Shocking Orb | [3881560](https://wiki.leagueoflegends.com/en-us/Template:Data_Xerath/Shocking_Orb?oldid=3881560) |
| Rite of the Arcane | [4002918](https://wiki.leagueoflegends.com/en-us/Template:Data_Xerath/Rite_of_the_Arcane?oldid=4002918) |

The [16.20 champion binary](https://raw.communitydragon.org/16.20/game/data/characters/xerath/xerath.bin.json)
has version `16.20.8248524+branch.releases-16-20.content.release` and SHA-256
`7bf2c884ad79b8fa87b4e393dc6ff51e60a0c4fe3881ce6d7a6a1a55019867d4`.
Nine object-scoped sources retain the actual attack, ability and missile
definitions. Client fields are supporting evidence; conflicting client
parameters do not silently replace the primary values.

## Maximum rank and level 20

| Mechanic | Implemented value |
|---|---|
| Mana Surge | 225 mana against nonchampions, 450 against champions; static 16-second cooldown; real kills reduce it by 3.5 seconds |
| Arcanopulse | 230 + 90% AP magic damage; 120 mana; 5-second cooldown after the effect; 700–1450 range; 145 width |
| Eye of Destruction | 190 + 65% AP outer damage; 316.73 + 108.355% AP center damage; 120 mana; 10-second cooldown; 275 outer and 125 inner radii |
| Shocking Orb | 190 + 45% AP magic damage; 80 mana; 11-second cooldown; 1125 range; 120 width; 1400 speed |
| Rite of the Arcane | Six shots; 270 + 45% AP each, plus 30 + 5% AP per previously earned stack; five-stack cap; 100 activation mana; 100-second cooldown after the channel |

All numeric source values are read through `KitContext`. Mana Surge grants
nothing when its full amount would exceed maximum mana. It starts ready and
requires a real connected basic attack. A damage block can still trigger it;
blind, ordinary dodge, parry and untargetability prevent the hit callback.
There is no invented farming or prior kill history.

## Casts and counterplay

Arcanopulse starts a mobile, interruptible charge with a three-second maximum.
Its self-slow and range use the parsed quarter-second progression. The primary
describes a random onset between zero and 0.25 seconds; the simulator uses the
conservative 0.25-second onset, reaching maximum range after 1.75 seconds.
Ordinary attacks and other spells are disabled during the charge. Accepted
interruptions and timeout refund 60 mana at maximum rank, then start the
ordinary hasted cooldown. Root alone does not end the charge.

Release captures charge range and direction, removes the charge slow, and
starts the independently uninterruptible 0.528-second cast lock. The beam
origin is Xerath's actual position when that lock ends, so real forced movement
can change it. Damage is independent of charge age. The beam crosses actual
pet hitboxes, respects spell shields and parry, and passes projectile walls.
Death during the release lock prevents the beam. AI releases as soon as the
actual rival is in its current charge range.

Eye of Destruction has its ordinary 0.25-second cast followed by the sourced
0.528-second landing delay. The source gives separate cast and delay values
without identifying the server timer's start event; adding the delay after
cast completion is an explicit timing interpretation. Each recipient uses its own center to qualify for
the inner radius and its own hitbox for the outer overlap. The ground location
stays fixed after declaration. The center slow starts at 80% and declines to
25% over 2.5 seconds. A real target within 100 units of the declared location
also triggers the source's 4.5-second ordinary reveal of Xerath. Released W
impacts survive death; unfinished casts do not.

Declaration checks actual live enemy bodies, including independently represented
pets, so a nearby unit can trigger that reveal while the rival champion is far
away. Allies, untargetability and stasis do not qualify. The source does not
enumerate every meaning of “valid enemy”; excluding those protected bodies is
an explicit interpretation. Both champions may move afterward without moving
the chosen impact point or changing its reveal decision.

Shocking Orb stops at the first actual eligible enemy body, including a pet.
Its 0.75–2.25-second stun uses actual missile travel to the leading-edge contact
point, interpolated over 0–1050 units and capped there. Moving the caster after
launch does not change that travel history. Projectile walls, spell shields,
parry, target protection, tenacity and CC immunity retain their normal roles.
The launched missile can finish after Xerath dies.

Rite of the Arcane opens a real ten-second channel with six finite recasts.
The first shot is available after 0.5 seconds. Each costs no extra mana, has a
static 0.627-second firing lock, and lands at its independently aimed location
after 0.627 seconds. Each shot captures the stacks already earned when it was
declared. A connected shot can grant only one stack even if it hits multiple
actual champion bodies. Minions, ordinary summons and champion clones do not
grant stacks. A protected or missed impact grants none. No stack is granted to
a later channel by an old shot.

Movement cannot cancel the channel during its first 1.25 seconds; afterward
it ends the channel. Real basic attacks may cancel immediately. Accepted
interrupting CC and death also end it, while already declared shots can still
land. The cooldown starts when the channel ends and is halved only if no shots
were used. The last used shot closes the channel on the following 30 Hz upkeep
tick. The channel's ordinary reveal is refreshed while an enemy champion is
within the sourced 5000-unit range, including an independently represented real
additional champion. A champion-class clone does not supply that real-champion
identity.

## Evidence limits and valuation

The primary explicitly marks Mana Surge's dodge interaction as pending test.
The simulator retains ordinary dodge denial; this remains an unresolved server
interaction. The primary does not define Eye of Destruction's slow decay
function. Its implemented linear decline is an explicit assumption; the
versioned binary's different decay coefficient remains visible evidence.
The binary's old Q charge duration, slow parameters and alternate R wrappers
conflict with the primary and do not replace it. The unquantified duration of
R's distant-unit reveal is omitted. Ground-area sight has no independent
terrain or vision-object model in the two-body duel.

The damage budget adds nominal Q throughput, W's center bonus over its ordinary
outer damage, and a complete six-hit R including the successive stack bonuses.
The actual duel still pays mana, locks actions, aims each shot, and resolves
misses and defenses. Nominal budget throughput is not a claim that every shot
lands. No default option grants free charge, stacks or previous passive kills.

## Verification

`tests/kits/xerath.test.ts` covers exact attribution and formulas, real mana
restoration and kills, charge clocks and refunds, accepted and rejected
interruptions, release direction and death, actual pet geometry, fixed W
landings and center slow, E collision travel and blockers, finite R shots,
per-shot stack capture and deduplication, attack and movement cancellation,
unused cooldown refunds, and released effects after death. The batch release
pipeline records its actual final source, test and matrix results separately.
