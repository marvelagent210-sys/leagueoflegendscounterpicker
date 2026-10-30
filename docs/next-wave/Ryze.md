# Ryze: actual bonus mana, target-owned Flux and an independent portal

Implemented for expansion batch 14 from the pinned patch 26.20 / Data Dragon
16.20.1 inputs. This describes the kit's deterministic model and its remaining
interpretations; it does not claim observed lane win rates or complete map play.

## Source inventory and rank selection

All five original primary records retain their parsed fields, amounts, notes and
complete raw revision text. The primary pins are:

| Ability | Primary template revision |
| --- | ---: |
| Arcane Mastery | 4059875 |
| Overload | 4064862 |
| Rune Prison | 3989878 |
| Spell Flux | 4064864 |
| Realm Warp | 4064863 |

Eleven complete, precisely attributed game objects come from
`https://raw.communitydragon.org/16.20/game/data/characters/ryze/ryze.bin.json`,
version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256
`5016862b0b9c7c9ffc5000762ed41aa1ad295523fca4a4410335ee091cf44fb6`.
The passive, Q wrapper, initial and spreading Q missiles, W/root, initial and
spreading E missiles, and R/channel/arrival objects are retained separately.
The independent promoted-input audit compares every whole object with Decimal
parsing and no numeric tolerance. No separate pet article is introduced.

Q, W and E use rank 5; R uses rank 3. Q's maximum primary damage is 155,
not the binary dummy/rank-zero entry 55 or the unused next-rank entry 175.
The Q wrapper's cooldown is 5 s; the inner projectile's conflicting 6 s field
does not replace it. The Q wrapper's unrelated `DamageAmp` rank array is not
the R-rank multiplier. R rank 3 supplies 90% increased Flux Q damage.
E's actual missile movement component is 4,000, agreeing with the primary;
the generic 3,500 client field is not used. Spread missiles use 1,500.

## Maximum-rank formulas and clocks

Let A be actual derived AP, M0 unmodified level-20 maximum mana, M actual maximum
mana and B actual bonus mana. Arcane Mastery gives
`M = (M0 + external maximum-mana buffs) × (1 + 0.001 A)` and
`B = max(0, M − M0)`. Consequently a plain-AP build has nonzero bonus mana even
without mana items. The conversion reads live AP, including AP buffs, and all
three basic spells read real B. Ryze has no intrinsic mana-to-AP conversion;
the source's recursion examples require items absent from this plain-stat model.

| Ability | Maximum-rank result | Cost and ordinary cooldown |
| --- | --- | --- |
| Q | `155 + 0.55 A + 0.02 B` magic; Flux multiplies the whole packet by 1.9 | 32 mana; 5 s |
| Q Runes | Two live Runes grant 44% movement speed for 2 s when Q consumes them | Other basic casts reset Q and grant one Rune; cap 2; refreshed 4 s window |
| W | `180 + 0.60 A + 0.03 B` magic; 50% slow for 1.5 s, or root with Flux | 90 mana; 9 s |
| E | `180 + 0.50 A + 0.02 B` magic on the actual primary; 4 s Flux marks | 80 mana; 2.5 s |
| R | Independent 2 s portal; 1,000–3,000 destination distance; 465 selection radius | 100 mana; 140 s |

Full converted mana initializes once at duel setup when no explicit starting
resource overrides it. Hooks do not repeatedly refill it. AP changes alter the
maximum and formula scaling without replenishing already spent mana; normal
regeneration and maximum-resource caps remain in force.

Q, W and E have 0.25 s casts, rounded to the engine's 30 Hz grid. Successful
W/E completion resets Q and refreshes a Rune; a freely cancelled target cast does
neither. Q consumes Runes on completed cast and grants one 2 s movement buff only
when two live Runes exist. R is not another basic and cannot reset Q or grant a
Rune. Event placement inside these casts is not quantified by the source; the
completion policy is explicit. The source's optional input buffer is represented
by the first legal decision tick rather than an invented player command queue.

## Actual delivery and Flux ownership

Q fixes its origin and facing at declaration, retains the cast lock, then releases
a 1,700-speed, 1,000-center-range bolt of 110 full width. The first actual enemy
body absorbs the initial flight. Its pet damage category is single target,
including when a pet takes the collision instead of its owner. The same pet
cannot be processed again as an extra primary or owner hit. Decisive uncertain
hits use the engine's normal finite branching.

Flux belongs to the real target and originating Ryze for its own four-second
window. One Ryze cannot consume another source's mark. W chooses slow versus
root from live Flux at accepted contact. Accepted Q consumes that body's mark,
amplifies the entire packet by 1.9 and sends non-interceptable 1,500-speed area
packets only to actual nearby Fluxed bodies. Their committed damage travels to
the selected recipients; accepted arrival consumes remaining source marks. The
model does not create nearby enemies, minions or clones to manufacture a bounce.

E's initial 4,000-speed orb is interceptable and damages only its declared primary.
Accepted contact refreshes that body's Flux and launches mark-only 1,500-speed
carriers to actual neighboring bodies. These carriers are not stopped by
projectile walls. Their marks arrive after actual travel, without secondary E
HP damage. An already Fluxed primary permits propagation through the connected
graph of bodies that were previously Fluxed. Each body is selected at most once
per cast, each further hop waits for accepted carrier arrival, and its previous
mark must still be live. Newly marked recipients do not become new prior-mark
seeds during that cast. The primary only says "spreads farther"; it does not
quantify server graph order or depth, so this graph interpretation remains a
visible model assumption.

The primary leaves bounce range center-versus-edge untested. The model uses
350 center distance. The stated 400 E / 500 Q large-unit exceptions require an
explicit large `sizeClass`; neither collision radius nor a clone-looking name
implies it. Area selection can reach a real invisible body, while manual
unit-target declarations still require legal visibility. Untargetable/stasis
bodies remain guarded. Initial and secondary packets independently retain their
ordinary spell-shield/parry checks. A denied packet neither grants nor consumes
Flux. Damage-only invulnerability does not prevent accepted Flux or control.
These exact mark/defense ordering details are not all quantified by the primary.

Manual W/E pet variants capture one actual eligible body. Their free completion
cancellation checks death, targetability, visibility and edge range; they cannot
redirect a failed cast to the enemy champion. The ordinary target variants use
the same source-prescribed free unit-target cancellation policy.

## Realm Warp, disruption and revival

The portal is anchored to the actual cast position and has its own finite timer.
It does not occupy an ordinary channel action, so movement, attacks and other
casts can continue. Accepted channel-interrupting CC, the explicit root/ground
exceptions, and a genuine guarded channel disruption cancel it. For example,
Kassadin's actual Null Sphere disrupts the portal, while a spell shield or parry
that denies that packet preserves it. Ordinary damage, blind, slow and disarm
alone do not cancel it; damage immunity does not prevent an accepted disruption.

The raw R table explicitly contains `revival-false`: entering resurrection does
**not** cancel an already opened portal while the caster remains alive. Revival
still forbids new actions; the previously committed timer can complete and move
that actual body. Existing pinned Zed Death Mark revision 4050166 corroborates
the template convention: it uses the same `revival-false` marker and explicitly
says entering resurrection before its dash does not cancel that phase. Actual
caster death still cancels Ryze's portal, including a counted-death zombie window
whose runtime body temporarily retains positive HP. The caster-death rule is
separate from the source permission for already-zombie allied recipients.

At completion, real eligible allied bodies inside the original 465 center radius
retain their actual offsets relative to the destination. The caster may have
walked out and therefore need not teleport. The destination clamps to the primary
1,000 minimum and 3,000 maximum on the simulated axis. The source's 515 sight
radius adds no fabricated fog-of-war benefit. Primary 2 s charge, estimated
0.75 s arrival and 465/515 radii override conflicting 2.1/0.65/365/450 client fields.
Each landing projects out of actual terrain into the nearest clear axial space;
a tie follows facing. This projection can alter offsets and is not a claim about
full map landing geometry.

Movement observers receive the actual final blink and body identity after terrain
clamping, before arrival locking. A follower already attached to an actual carrier
moves with that carrier and is not independently teleported a second time.
Arrival root, disarm, silence and untargetability share the source's estimated
0.75 s interval, rounded to 23 ticks without tenacity shortening. Existing ordinary
windups and pet windups stop at arrival; this preexisting-action edge is an explicit
interpretation. A real retained channel omits arrival silence, as the primary says.

An explicit `unstoppableForceMarker` body flag excludes that distinct server
state; ordinary displacement immunity is not treated as proof of it. The source's
listed Caitlyn/Galio/Kayn/Jhin/Xerath R and Warwick Q, Recall and Teleport channel
exceptions use actual champion/action identities when those entities exist.
Pet entities do not currently expose a general champion-channel or zombie-action
representation. Their real health, targetability, control, attachment and lifecycle
are retained; the kit invents no teammate or zombie pet to obtain utility value.

## Behavior, allocation and regression evidence

The ordinary policy uses E/Q and W/Q reset sequences, chooses rooted W for useful
control, preserves the usual trade-completion retreat and can open a legal away
portal while fleeing. Hold and trade reserve a fresh portal. Idle creates no
casts, allies, mana or passive damage.

Allocation uses a sustained legal E-Q cadence plus separate W-Q slots, hasted
cooldowns, all cast time and a ten-second starting-mana-plus-regeneration envelope.
One E supports one amplified Q; a W slot supports an ordinary Q. Mana availability
scales those cycle rates together. The reference prices neither fictional bounce
victims nor teammates. R is utility, while its passive Q multiplier remains active.
Actual misses, travel, evolving Flux, control and mana exhaustion remain simulation
outcomes instead of reference-budget entitlements.

The companion tests cover primary/object reads, live AP-to-mana and bonus-mana
formulas, no mana refill, Runes and expiry, declaration origin, free cancellation,
source-specific Flux, primary/secondary pet categories, actual graph carriers,
projectile walls, invisibility, manual pets, branch-local state, portal clocks and
radius boundaries, movement notifications, carried followers, control/disruption
and immunity ordering, arrival locks, terrain, revival and counted death. They also
run all six 15,000-gold scenarios with exact reverse builds and 1e-10 score/scenario
reflection against Darius, and six production scenarios against actual Heimerdinger
pets. Batch-wide source, reflection, matrix and browser gates remain separate
requirements before the private preview is refreshed.
