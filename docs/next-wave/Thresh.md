# Thresh: exact sources and implementation limits

This records the authored level-20 kit for dataset 16.20 (patch 26.20). It does not
claim that the new expansion's final matrix, browser, full suite or download has
passed its release checks.

## Primary inputs

The original parsed fields, formulas, parts, notes and revision identities remain
intact. Complete raw templates are supplemental primary evidence; every source
read is recorded while `KitContext` builds the kit.

| Ability | Exact revision |
|---|---|
| [Damnation](https://wiki.leagueoflegends.com/en-us/Template:Data_Thresh/Damnation?oldid=4025498) |4025498|
| [Death Sentence](https://wiki.leagueoflegends.com/en-us/Template:Data_Thresh/Death_Sentence?oldid=4008201) |4008201|
| [Dark Passage](https://wiki.leagueoflegends.com/en-us/Template:Data_Thresh/Dark_Passage?oldid=4017821) |4017821|
| [Flay](https://wiki.leagueoflegends.com/en-us/Template:Data_Thresh/Flay?oldid=4057474) |4057474|
| [The Box](https://wiki.leagueoflegends.com/en-us/Template:Data_Thresh/The_Box?oldid=4024674) |4024674|

The exact [CommunityDragon binary](https://raw.communitydragon.org/16.20/game/data/characters/thresh/thresh.bin.json)
is version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256
`a9d3af3ff303f2c8d636d9121c789b623655809e67f99578393f632fc8f1816c`.
Nine complete object excerpts, including entire arrays and nested calculations,
remain independently attributed to their containing objects:

- `Characters/Thresh/Spells/ThreshPassiveSoulsAbility/ThreshPassiveSouls`;
- `Characters/Thresh/Spells/ThreshQAbility/ThreshQ`;
- `Characters/Thresh/Spells/ThreshQAbility/ThreshQMissile`;
- `Characters/Thresh/Spells/ThreshQAbility/ThreshQLeap`;
- `Characters/Thresh/Spells/ThreshWAbility/ThreshW`;
- `Characters/Thresh/Spells/ThreshWAbility/ThreshWLanternOut`;
- `Characters/Thresh/Spells/ThreshEAbility/ThreshE`;
- `Characters/Thresh/Spells/ThreshEAbility/ThreshEMissile1`;
- `Characters/Thresh/Spells/ThreshRPentaAbility/ThreshRPenta`.

Primary standard-mode mechanics win over conflicting unused binary fields. In
particular, Flay uses 1.7 magic damage per soul, rather than the binary's unused
1.5 passive field; The Box lasts the primary five seconds, rather than four.

## Damnation and charged basic attacks

Thresh begins with zero souls and zero elapsed Flay charge. His level-20 base armor
is 33: the source supplies no armor growth. No invented pre-duel farming or ally
is added to the ordinary duel or reference build.

Actual hostile champion deaths within 1900 drop one soul, with two for Nunu &
Willump. Explicit large minions/monsters drop one and explicit epic monsters drop
two. Smaller explicitly classified minions/monsters contribute one-third expected
soul quantity. The unpublished dynamic drop quota cannot be reconstructed, so
this is a disclosed expectation approximation rather than a simulated history.
Friendly deaths, natural despawns, unclassified pets and champion-class clones do
not silently become eligible champion kills or farm.

Souls expire after eight seconds. The primary gives an observation radius but no
numeric soul pickup radius. Collection therefore requires confirmed Thresh-body
overlap or exact overlap with a placed lantern. Unsupported near-pickup distances
are omitted. Each collected soul grants one AP and one bonus armor, through the
actor's actual status list, and cannot be collected twice.

Flay's noncritical magic proc adds 1.7 per soul plus an AD term charging from 0 to
210% over ten seconds. The endpoints and duration are sourced; the intermediate
linear curve is an explicit approximation because the exact server curve is not
published. Ordinary physical crits remain separate. Accepted blocked attacks
consume charge without damage; dodge and parry preserve it. The source explicitly
leaves blind/reset behavior pending, so a missed blinded attack conservatively
preserves charge. Actual health-based pets use their own health and defenses,
without borrowing owner stats. Hit-count props receive no invented magic proc.

## Death Sentence and Deathly Leap

Q costs 70 mana, starts its nine-second hasted cooldown at declaration and casts
for 0.5 seconds. The finite 1900-speed scythe travels 1100, with the primary 1040
center collision reach and 140 width. It hits the first actual eligible body,
including a real pet in front of its owner. The hook starts from cast-completion
position. The axial facing remains unchanged during the windup and turns on
launch. The source's intermediate 90-degree animation cannot be represented by
the duel's signed facing axis.

An accepted hit deals 300+90% AP, refunds two seconds of actual current cooldown,
applies a 1.5-second stun and the source's estimated 0.4-second initial airborne,
and leaves a full 1.5-second Shackled mark with a 0.05-second reveal tail. Tenacity
shortens the stun independently of the mark. Unrestricted cleanse removes the
opted-in mark even after stun has expired; typed cleanses do not silently gain
that extra behavior. Spell shield blocks the complete packet and refund.
Displacement immunity removes Q's stun and airborne for that contact while
retaining the mark. The replacement effects remain local to the contact and never
mutate another body, future world or compiled packet.

The sourced tug clocks at 0.1 and 0.7 seconds are tracked only while the actual
stun remains and Thresh has not leaped. Neither retained input publishes a tug
speed or distance. Their longitudinal displacement is omitted explicitly.

Recast becomes available after 0.5 seconds on a champion and immediately on an
explicit minion or monster. Thresh cannot recast while rooted or grounded, but an
already marked untargetable target remains a valid leap destination. The leap
tracks actual positions at the primary estimated 1400 speed, freezes a prior
position across a jump beyond the estimated 2000 tracking boundary, and fails
beyond the primary estimated 3000 cast distance. W and E can overlay the dash.
Arrival releases the attack lock; losing or cleansing the mark releases its lock.
These estimated distances and omitted tugs limit exact motion accuracy.

## Dark Passage

W costs 70 mana and has a 17-second hasted cooldown. Its actual projectile flies
for 0.5 seconds to a location within 950. A placed lantern lasts six seconds.
Thresh and at most one actual allied champion-class body can gain one
130+2-per-soul shield for four seconds on entering the primary 350 center radius.
Minions are not fabricated into allies; repeated entry does not refresh the
claimed shield. Moving beyond the 1500 leash returns the lantern and gives
Thresh an unclaimed shield, except during his actual Deathly Leap.

The source states that the lantern blocks pathing and an allied click can dash to
Thresh, but publishes no gameplay body radius/health or allied dash speed. The
duel also has no ally-click command. No targetable substitute body, arbitrary
collision radius or automatic ally dash is invented. The primary 150 pickup
radius remains evidence without implying that an ally clicked it. Ordinary
reference spending values only Thresh's own shield.

## Flay's cast and finite chain

E costs 80 mana at declaration and starts a ten-second hasted cooldown. The chain
begins immediately, independently of its 0.3889-second cast lock. Its signed
source interval is -550 behind to +525 in front, a finite 1075-unit sweep at 2000
speed, with the separately published estimated 270-radius central contact. Its
220 width is transverse: it adds no longitudinal reach. The shared finite mover
clamps the last step to the exact endpoint. Each real body receives at most one
packet across the central hit and later sweep.

Accepted contact deals 245+60% AP and applies a 40% slow for one second. The sourced
200 displacement follows the chosen cast direction, including backward Flay, and
clips against actual terrain. No displacement duration is published. The model
resolves that move in one 30-Hz tick with the minimum one-tick airborne
interruption, then the independent slow. It does not reuse the parser's erroneous
one-second airborne duration. Movement and attack locks last until the actual
chain ends, including the part after the cast permits another spell.

The emitted nonprojectile carrier supplies one real damage/slow/airborne forecast
with a finite arrival time. Its generic pending-cast forecast is suppressed to
avoid duplicate damage. Already contacted bodies and targets beyond the exact
finite interval receive no phantom future hit. Projectile interception does not
stop this ground chain.

## The Box

R costs 100 mana at declaration and starts an 80-second hasted cooldown. Its
0.45-second formation freezes the actual cast-start position and facing, and
completes despite real death or resurrection. The attributed persistent formation
and separate wall scheduler keep the ordinary duel alive until committed effects
resolve; no unrelated dummy damage is applied to the cage interior.

Five breakable walls form a regular pentagon with 400 corner radius, 72-degree
corner angles and 30 width. Only actual champion bodies or explicitly classified
champion clones can break walls. The source clockwise ordering chooses the first
wall when several contacts occur together. That first broken wall deals 550+100%
AP and slows 99% for two seconds. Later walls deal no damage and slow for one
second. Each body has a one-second break lock. Spell shielding still consumes the
actual contacted wall while preventing its packet.

Each five-second wall retains its own broken state. Actual dash and forced paths
are checked against the complete swept segment, including front-corner crossings
in one tick. Ordinary movement uses endpoints; teleports and lateral champion
movement are unavailable. An interior champion is not automatically damaged.
The separate formation telegraph forecasts one packet only when the current body
would actually touch a future wall, and updates as that body moves. It does not
announce unavoidable cast damage to every enemy inside the cage.

## Behavior, spending and checks

Idle remains idle and completed trades retreat. Fight/trade can use real Q2 to
close distance and backward E at close range; R is chosen near a genuine wall
contact rather than merely because its cooldown is ready. Flee can place a real
self lantern. No free ally, full soul stack or precharged hit is used for reference
spending. Reference R damage assumes one genuine wall contact, not five walls of
damage or an automatic cage-center hit.

The test file covers source removal/immutability, actual soul deaths/expiry,
charged attack avoidance and actual pet packets, first-body hook and recast
eligibility, contact-local immunity, cleanse after stun, real lantern flight and
shield claims, finite mirrored Flay endpoints, emitted threat payloads, wall
geometry, post-death formation, resurrection, branch state and short reflection.
Two full 15000-gold production scenarios are authored for the root's serial
validation and are not part of the filtered fast mechanics run.
