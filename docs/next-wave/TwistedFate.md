# Twisted Fate implementation audit

Batch 15 implements Loaded Dice, Wild Cards, Pick a Card, Stacked Deck and
Destiny/Gate from dataset 16.20. Cards, resources, targets, projectiles and
teleportation have actual finite state. There is no invented farm or extra
ally, and no matchmaking win-rate inference.

## Exact source inputs

All original parsed fields, notes and attributed sources remain intact. Each
ability also retains its complete exact raw revision and separately attributed
object excerpts from the versioned champion binary.

| Ability | Pinned revision |
|---|---|
| Loaded Dice | [4005221](https://wiki.leagueoflegends.com/en-us/Template:Data_Twisted_Fate/Loaded_Dice?oldid=4005221) |
| Wild Cards | [3950864](https://wiki.leagueoflegends.com/en-us/Template:Data_Twisted_Fate/Wild_Cards?oldid=3950864) |
| Pick a Card | [4004668](https://wiki.leagueoflegends.com/en-us/Template:Data_Twisted_Fate/Pick_a_Card?oldid=4004668) |
| Stacked Deck | [3963571](https://wiki.leagueoflegends.com/en-us/Template:Data_Twisted_Fate/Stacked_Deck?oldid=3963571) |
| Destiny | [4017975](https://wiki.leagueoflegends.com/en-us/Template:Data_Twisted_Fate/Destiny?oldid=4017975) |

The [16.20 champion binary](https://raw.communitydragon.org/16.20/game/data/characters/twistedfate/twistedfate.bin.json)
has version `16.20.8248524+branch.releases-16-20.content.release` and SHA-256
`af35647443a0cb448bddf19d1dfe8e71fb29c55203fe1181ba43c13618f44785`.
Its card attack, critical multiplier, missile and Gate definitions support
their matching sourced mechanics. Numeric reads occur through `KitContext`
during compilation, including behavior costs and Loaded Dice expectations.

## Maximum rank and level 20

| Mechanic | Implemented value |
|---|---|
| Loaded Dice | Expected 4 + 3 × critical chance gold per actual kill; recorded as future gold only |
| Wild Cards | 240 + 50% bonus AD + 85% AP magic damage; 5-second cooldown; 1450 range; 80 width; 1000 missile speed |
| Blue Card | (120 + 100% total AD + 100% AP) × (1 + 0.575 × critical chance); restores 150 mana |
| Red Card | (90 + 100% total AD + 70% AP) × (1 + 0.35 × critical chance); 325 splash radius; 50% slow for 2.5 seconds |
| Gold Card | (45 + 100% total AD + 50% AP) × (1 + 0.25 × critical chance); 2-second stun |
| Pick a Card | 70 mana; 6-second cycling window; separate 6-second selected window; 6-second hasted cooldown after use/expiry; fixed 0.25-second windup and 1500-speed missile |
| Stacked Deck | Permanent 55% bonus attack speed; three stored stacks, consumed on the next hit for 165 + 20% bonus AD + 40% AP noncritical proc magic, reduced to 50% against explicitly classified structures |
| Destiny/Gate | 100 activation mana; 10-second reveal/recast window; 0.5-second recast delay; 1.5-second Gate; 5500 destination cap; 110-second hasted cooldown after recast/expiry |

`firstCard` explicitly selects an initial Blue/Red/Gold hover phase as 0/1/2;
the default is 0. It does not claim knowledge of the actual random server
starting phase or optimize it after seeing a matchup. `deckStacks` is actual
prior history from 0 to 3, defaulting to zero rather than an invented respawn.
Fractional, nonfinite and out-of-range options are rejected.

## Card clocks, contacts and defenses

Shuffling costs mana and reports one ability activation. The free internal
lock selects only the currently hovered card, resets the basic timer, works
under accepted cast-inhibiting control, and is not another cast. The phase
uses the parsed note's 0.528-second interval; that note's raw rounding template
and pending-test annotation conflict with the main 0.5-second description.
The discrepancy remains explicit. Absolute clocks keep shuffling expiry and
the later selected-card expiry independent.

A selected attack replaces its entire ordinary AD/critical damage packet with
the sourced magic formula and a captured linear critical-chance multiplier.
It does not add an extra physical attack or critically multiply its on-hits.
The attack windup is eight ticks on the 30 Hz grid, and its launched missile
keeps the selected card independently of later mutable selection state.

Actual target death, untargetability, stasis, range loss or disappearing pet
identity cancels an unlaunched attack without consuming the card, granting
mana or adding Stacked Deck. Existing expiry still applies. An empowered
windup already declared before expiry retains its captured entitlement, an
explicit interpretation where the precise boundary is unsourced. Expiry
starts the cooldown once; its later launch cannot restart or extend it.
Launched cards remain committed after the selection clock expires.

Blind and dodge miss; parry and the card's whole-attack spell shield deny its
connected card/on-hit callbacks. A damage-only basic block denies the base
card damage but retains the accepted utility/on-hits. The primary does not
fully enumerate every combined on-hit/block/shield interaction, so this
guard policy remains visible. Ordinary target protections and CC immunity,
tenacity and slow resistance continue to apply.

Blue restores at most 150 actual mana on accepted contact. Red uses the actual
primary's position, including when it is a pet, and independently tests each
real nearby recipient's hitbox and defenses. It cannot duplicate its primary,
invent a splash victim, undo a consumed shield, or overwrite a pet's accepted
slow with an earlier view of that pet. Gold's stun belongs to the actual target.
One connected primary attack counts once for Stacked Deck regardless of splash
recipients. Explicit ward bodies do not consume Stacked Deck or card
empowerment; no ward is spawned merely to manufacture an interaction.

The next accepted basic after three stored stacks adds E's noncritical magic
proc once. Blind, dodge and parry preserve the stacks. A damage block does not
deny the proc, matching the explicit primary note. The permanent attack-speed
bonus modifies the ordinary attack clocks. Loaded Dice records expected future
gold for each actual deduplicated kill; that cannot buy pre-fight stats.

## Wild Cards, Destiny and Gate

Wild Cards launches from completion position along declaration facing. Its
three-ray fan is represented by the central axial ray: every body in this
1D world lies on that axis and receives at most one contact. There is no
invented lateral enemy to hit. Actual pet hitboxes, projectile walls and spell
defenses apply, and released projectiles can finish after their owner dies.

Destiny marks actual targetable enemy champion bodies, including represented
champion-class summons. Its reveal respects the primary's spell-shield flag
and parry, and cannot mark an untargetable body. True sight exposes ordinary
invisibility; nearsight retains priority. Reveal deals no damage, does not
manufacture allies, and grants no fictional global map information.

Gate is unavailable before its 0.5-second delay and after the recast window.
Root, ground and silence deny its declaration. Its actual 1.5-second cast lock
represents the immobile, attack-disabled channel. Accepted root/ground cancel
that lock explicitly, while ordinary channel-interrupting control also stops
it. A rejected root cannot cancel a protected Gate. W and its lock can overlay
the channel; Q and attacks cannot bypass it. Death prevents the blink.

The destination is absolute from declaration, clamps to 5500, and projects out
of actual terrain. Enemy crossings cannot reverse it. Completion reports an
actual blink and removes only hostile homing champion missiles or pet missiles
aimed at this actual champion. Missiles aimed at other pets or champions and
nonhoming projectiles remain. Gate declaration starts the ultimate cooldown,
including when interrupted; an unused recast starts it at window expiry.

## Behavior, budget and verification

AI waits for a legal Gold hover, or chooses Blue when mana is low. It uses Gate
to flee, reserves Destiny in other duel modes and honors completed trades.
There is no free future phase knowledge. The budget prices sourced Q and
permanent attack speed, one Deck proc per four connected basic attacks, and a
Gold replacement per realistic hasted cycle plus phase wait and windup. The
replacement subtracts that attack's ordinary expected physical contribution.
Teleportation, nonexistent splash recipients and future farming gold add no
damage to the price.

Focused tests cover exact source formulas and explicit histories, sealed
context reads, hover/window clocks, free locks under silence, all three magic
replacements and critical snapshots, cancellation and expiry, real pet target
identity, Red splash/shield persistence, E stacking/blocks/wards, deduplicated
gold, Wild Cards launch/collision, Destiny defenses/visibility, Gate unlock,
control, death, W overlays, destination capture and precise projectile removal,
branch independence, behavior and strict production Darius reflection.
Complete batch matrix, browser and publication verification remain separate
root release steps; this audit does not claim they passed.

Remaining uncertainties are the exact server hover interval, W's precise
post-effect boundary between launch and impact, selected-window expiry during
an already declared windup, and underspecified combined block/on-hit cases.
Lateral navigation, map-wide allies and ward/structure encounters are absent
unless an actual represented body supplies them.
