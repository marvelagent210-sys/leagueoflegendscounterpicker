# Nunu & Willump: source audit and implementation boundary

This audit describes the authored level-20 kit for dataset 16.20 (patch 26.20).
It records the source rules, explicit approximations and focused mechanics checks.
The batch-wide matrix, production tests, browser checks and private package remain
the release controller's responsibility.

## Exact primary inputs

The five existing records keep their original fields, parts, leveling and revision
identities. Their full raw pinned templates are retained as supplemental primary
text. Runtime numbers and restrictions are read through `KitContext` while the kit
builds; combat hooks use those captured values.

| Ability | Exact revision |
| --- | --- |
| [Call of the Freljord](https://wiki.leagueoflegends.com/en-us/Template:Data_Nunu/Call_of_the_Freljord?oldid=4013400) | 4013400 |
| [Consume](https://wiki.leagueoflegends.com/en-us/Template:Data_Nunu/Consume?oldid=3985877) | 3985877 |
| [Biggest Snowball Ever!](https://wiki.leagueoflegends.com/en-us/Template:Data_Nunu/Biggest_Snowball_Ever!?oldid=4007735) | 4007735 |
| [Snowball Barrage](https://wiki.leagueoflegends.com/en-us/Template:Data_Nunu/Snowball_Barrage?oldid=4013466) | 4013466 |
| [Absolute Zero](https://wiki.leagueoflegends.com/en-us/Template:Data_Nunu/Absolute_Zero?oldid=4010574) | 4010574 |

Supplemental evidence uses the exact [CommunityDragon Nunu binary](https://raw.communitydragon.org/16.20/game/data/characters/nunu/nunu.bin.json),
version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256
`22203ef5c49ac91e1f3a26ef0a30bb48df529ccae437608d6ebe6cb5c51c9424`.
Eight independently attributed object records retain 85 exact excerpts, including
whole seven-value arrays and nested missile specifications:

- `Characters/Nunu/Spells/NunuPassiveAbility/NunuPassive`;
- `Characters/Nunu/Spells/NunuQAbility/NunuQ`;
- `Characters/Nunu/Spells/NunuWAbility/NunuW`;
- `Characters/Nunu/Spells/NunuWAbility/NunuWSnowballMissile`;
- `Characters/Nunu/Spells/NunuEAbility/NunuE`;
- `Characters/Nunu/Spells/NunuEAbility/NunuESnowballBurstFire`;
- `Characters/Nunu/Spells/NunuEAbility/NunuESnowballMissile`;
- `Characters/Nunu/Spells/NunuRAbility/NunuR`.

The source supplement does not replace primary values. In particular, E's primary
50 full width and R's primary 650 radius win over the binary's 40 and 500. The
primary's aggregate E scaling says 135% AP, while its individual packet says 12%
AP. Nine real 12% AP packets are retained, with the discrepancy disclosed rather
than adding an unexplained bonus to the final packet.

## Passive: actual damage and actual allied bodies

Call of the Freljord starts inactive. Actual damage by Nunu to a champion or an
explicitly large or epic monster opens that target's static ten-second trigger
clock. Absorbed shield damage qualifies; an invulnerable or parried zero-damage
packet does not. Each eligible trigger grants 20% bonus AS and 10% MS for four
seconds, extending an active buff by four seconds up to 44 remaining seconds.
Ability haste does not shorten the target clock.

An actual friendly Champion-class pet within the sourced range can receive the
shared buff. The recipient is selected by its current attack speed, including its
own active bonus-AS and total-AS modifiers, supplied bonus-AS basis and cap, and
its own applicable cripple effects. No attack statistics are borrowed from its
owner. The buff changes that body's real attack cadence. No ally is created to
make the passive stronger, and an unclassified summon is not assumed to be an
allied champion.

While active, an accepted ordinary basic independently contacts actual secondary
bodies for 30% AD area basic damage. The actual primary body is excluded, no
on-hit effect is repeated, and a critical primary does not add critical damage to
the splash. The source's missing cone angle is an explicit geometry limit: the
binary's 210 cast radius supplies a forward extent on the duel axis. Hit-count
objects are not given invented health interactions.

## Q: one declared bite target

Consume uses the actual reachable champion, or otherwise a reachable actual pet.
It records that body when its 0.3-second cast starts and revalidates the same body
at completion against the primary 125 edge range and targeting rules. Range loss,
death or loss of targetability cancels the bite with cost and prior cooldown
restored; a different nearby body cannot silently replace the declared target.

Champion-class targets take 220 + 65% AP + 5% bonus HP magic damage. Actual Minion-
or Monster-class pets take 1200 true damage. Unclassified health pets use the
conservative champion packet. A connected bite heals 111 + 54% AP + 6% bonus HP
against champions, or 185 + 90% AP + 10% bonus HP against minions and monsters.
Only health strictly below 50% maximum HP increases healing by 50%. Healing passes
through ordinary healing modifiers and Grievous Wounds. Spell shields block both
damage and healing.

A bite that would kill an actual minion or explicitly small or medium monster
attempts the source's stun and pull over the real cast time, with its own defensive
guards. It does not heal early. An unclassified monster is not guessed small, and
no jungle creature or lane wave is fabricated.

## W: held body, released projectile and elapsed charge

The initial cast starts a mobile ten-second channel, cleanses ordinary slows, and
grants slow immunity and ghosting. The first second is 50% slower. Movement bonuses
present at declaration are preserved, and the wiki's explicitly estimated
14-MS increments every 0.25 seconds use its documented acceleration delay and
level-20 cap of 255 additional MS. The duel projects steering onto the declared
axis; no lateral turning path is invented. The unsourced snowball-to-Willump
offset is explicitly zero.

The held snowball is a real non-projectile threat for perception. Projectile walls
and interception do not consume it. Its manual movement respects disabling CC
while the source's specific ground, root and silence list releases it. Death also
releases exactly one current-size ball. Ordinary stun can stop movement without
substituting a broader channel-interruption rule.

Growth retains the full primary time series: damage rises from 72 + 30% AP to
360 + 150% AP after the first second through five seconds; airborne rises from
0.5 to 0.75 seconds, followed by an independently delayed stun rising to 0.75.
The exact binary collision radius grows from 75 to 200. Primary explosion radii
130 to 390 take precedence over missile display widths. Actual monster bodies
retain the binary's separately sourced collision and impact scalars.

While steered, the ball contacts each actual minion or explicitly small monster
once for the primary 33.3% roll damage. A champion, explicitly large pet, medium or
large monster, epic monster, or real terrain detonates it. The explosion originates
at the actual contact coordinate; each body retains its own defenses. A steered
detonation applies the source's estimated 0.1-second stun to Willump.

Manual release opens after 0.5 seconds. Released flight freezes damage, radius and
travel distance at its actual age. It uses the primary size-dependent speed plus
preserved bonus movement, travels 750 to 1750 according to the source's time
curve, and can collide with any actual enemy body. A projectile wall destroys
flight without a fabricated endpoint explosion. Braum-style interception first
resolves the actual collision explosion, including its follow-up stun, then ends
the original missile. Released flight and its independent delayed stun can remain
relevant after the caster dies. The initial fifteen seconds of a match are not
recreated as a lock at the start of a level-20 duel.

## E: independently emitted volleys and target-local Snowbound

Each accepted volley emits three real projectiles at the exact binary 0.15-second
intervals, quantized from absolute elapsed times. Each launch uses Nunu's current
position and current direction toward the enemy. The primary's 0.4-second volley
window is retained as context; it is not turned into one instantaneous triple
packet. Projectile range is 700 and speed is 2000. The source's 225 forward
shatter extent is projected onto the duel axis; its off-axis 22.5-degree cone is
outside this geometry model.

Every hit deals 45 + 12% AP. Three accepted hits slow that target once for one
second. Champion-class and explicitly large-monster contacts gain their own
four-second Snowbound mark. Two optional recasts cost no additional mana and
retain haste-scaled one-second gaps within the original three-second window.
A late accepted volley finishes emitting after the recast window closes.

At three seconds, living Willump checks each actual marked body against the exact
450 radius. Accepted contacts take 60 + 80% AP and the primary level-20 root of
1.61764705882353 seconds. Marks outside that check cannot produce a later phantom
root. Each target retains its own spell shield, area resistance, status list and
identity. The post-effect cooldown begins after the original spell window.
Actual death cancels unthrown balls and the caster-owned root; already emitted
projectiles retain their own finite flight. Perception carries actual finite
arrival estimates and packet damage, and interception resolves the real shatter
before destroying the original flight.

## R: partial release and remaining shield

Absolute Zero grants 85 + 150% AP + 50% bonus HP shield on its actual cast, then
channels for up to three seconds in the primary 650 radius. Slow begins at 50%
after 0.25 seconds and advances in 4.5-point steps to 95%. Each real contact keeps
ordinary spell-shield, CC-immunity and targetability rules.

Manual recast opens after 0.5 seconds. Movement, attacks, a permitted other spell,
interrupting CC, resurrection, expiry and death release one explosion at the
caster's real position. Damage is 1% of the maximum 1275 + 300% AP per elapsed
0.03 seconds, capped at 100%; an immediate interruption can deal zero. The release
slow lasts the actual elapsed channel time. Cooldown begins when the channel ends.

The actual remaining shield decays over three seconds after release, retaining
damage already absorbed. The exact decay curve is unpublished, so the explicit
approximation is linear loss from that remainder; absorption does not replenish
the shield. Shield and release memory remain independent in cloned worlds.

## Validation and remaining limits

The focused mechanics run passed 76 tests. It covers exact pins and binary
attribution, missing-evidence rejection, clean initial state, resource eligibility,
target-local passive clocks and current allied attack speed, real pet cadence,
critical splash and primary identity, Q formulas and invalid declarations, healing
modifiers, held and released W, terrain and monster classes, separate airborne and
stun, projectile walls and interception, actual death releases, E emission clocks,
recast windows, shatter, target-local guards and marks, finite perception, emitted
flight after death, R partial timing and shield decay, resurrection, directional
origins, completed trades and branch isolation.

Run `npx vitest run tests/kits/nunu.test.ts -t 'Nunu mechanics' --maxWorkers=1`.
The actual focused report and log are
`/workspace/counter-browser/batch12-nunu-mechanics-final.json` and its adjacent
`.log`. Two production tests are authored with the ordinary 15,000-gold allocation:
all six scenarios against upgraded Heimerdinger pets, and reflected Darius builds,
scenario scores and aggregate score at the batch's unchanged `1e-10` tolerance.
They were deliberately excluded from the fast run and still require the serial
release preflight.

This is an item-free duel model with 30 Hz clocks and one-dimensional geometry.
Structures, allied champions, farms, lateral steering, fog-of-war areas and item
on-hit replication are not fabricated. Explicit size metadata is required for
size-dependent monster rules. Unknown cone geometry, snowball offset, estimated
W acceleration and own stun, the primary/binary disagreements, and R's unpublished
shield decay curve remain visible model boundaries rather than hidden precision
claims.
