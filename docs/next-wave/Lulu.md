# Lulu: actual Pix origins, polymorph and temporary health

Lulu uses the pinned patch 26.20 records at maximum ability ranks and level 20.
Her five full primary revisions remain in the authored dataset: Pix, Faerie
Companion 4046485, Glitterlance 3881438, Whimsy 4007673, Help, Pix! 3945270 and
Wild Growth 4007674. Sixteen exact object excerpts retain their paths in
`https://raw.communitydragon.org/16.20/game/data/characters/lulu/lulu.bin.json`,
version `16.20.8248524+branch.releases-16-20.content.release`, with SHA-256
`637780a5697549faccde5abc3b7af9ce5b2c3086ee39ed78ef6ef675a19fe6de`.
Primary formulas take precedence over conflicting client metadata.

## Source values

| Effect | Maximum-rank or level-20 value |
|---|---|
| Pix bolts | Three bolts, each 43 + 5% AP magic damage at level 20; total 129 + 15% AP |
| Bolt flight | 60 full width; 900 initial speed, 5200 acceleration and 2600 maximum speed; retained client travel range 1200 |
| Q | 200 + 50% AP for the first bolt, 100 + 25% AP for the second; 70% damage against minions |
| Q geometry and cost | 950 range, 120 full width, 1450 speed, 0.25-second cast; 70 mana and 7-second cooldown |
| Q control | 80% slow decaying over its accepted 2-second duration |
| Enemy W | 650 range, 0.2419-second cast and 2250-speed homing missile; 2-second polymorph and movement reduction of 60 |
| Ally or self W | Instant; 30% attack speed and 25% + 5% per 100 AP movement speed for 4 seconds |
| Shared W cost | 65 mana and 18-second cooldown across all recipients |
| E | 650 range, instant; 230 + 50% AP hostile magic damage or allied champion shielding |
| E lifetime | Hostile attachment and true sight for 4 seconds; friendly attachment for 6.25 seconds and shield for 2.5 seconds |
| Shared E cost | 80 mana and 8-second cooldown across all recipients |
| R | 575 + 55% AP bonus maximum and current health for 7 seconds; 900 target range |
| R control | 400 center-radius initial knockup for 1 second, with 275 knockback; 60% slow within 400 center distance, lingering 0.25 seconds |
| R cost and size | 100 mana and 80-second cooldown; the sourced 40% size increase remains an explicit geometry limit |

The bolt damage series is extended to level 20 using the preserved primary
per-level progression. Its displayed level-18 endpoint is 39 damage per bolt.
The exact client Q line width is 60; the implemented 120 full width follows the
primary record. Every numeric source read occurs during kit compilation, before
the context seals. Reference allocation callbacks use captured values.

## Actual attachment and attack events

Pix is an untargetable attachment, initially on Lulu. The arena does not create
an attackable fairy or an imaginary ally. E moves Pix to an actual recipient.
Only attachment to an allied Champion-class body transfers the attack trigger to
that body's real basic declaration. Enemy and nonchampion attachments retain
Lulu's trigger while moving the actual origin of her Pix bolts.

A valid declaration creates three independently traveling accelerated missiles.
Blindness or a later dodge of the basic does not erase those declarations;
abilities that apply on-hit effects do not fabricate a basic attack. Each bolt
collides with the first actual hostile body, obeys projectile destruction and
uses proc damage rather than ordinary basic lifesteal. Spell shields do not
consume these bolts. Riposte still negates health damage under the shared damage
rules. Already launched bolts can finish after Lulu dies.

A dead, expired or distant host returns Pix to Lulu. The attached leash uses the
primary's explicitly estimated 2050 distance. The free-follow leash, exact
far-side offset, visual following delay and three-bolt stagger lack complete
geometry. The model uses the real host center and simultaneous independent
launches. It does not invent structures or wards, which the source says do not
intercept the bolts.

## Glitterlance and Whimsy

Q captures Pix's location when the cast is declared and Lulu's location when it
completes. Both actual origins aim at one fixed cursor; they can fire in the same
or opposite directions. Each body has its own full-first and half-second damage
entitlement for that cast. A shielded first ray does not incorrectly reduce an
unshielded second ray. Minions retain their separate damage reduction.

Each uncertain decisive ray uses the simulator's ordinary hit and miss branches
and unchanged branch budget. Those ray outcomes are independent because the
one-dimensional arena has no joint lateral movement state. Finite warnings use
the current origins and real flight time. The accepted slow decays over its
tenacity-adjusted lifetime and continues during released aftermath after caster
death. Later casts retain their own serial and recipient identity.

Enemy W observes the primary's explicit cancellation bug: loss of range, sight,
targetability or target life during its cast still pays the normal mana and
cooldown. Early visibility and untargetability cancellations settle the payment
at that actual cancellation tick. A committed missile retains its normal
projectile defenses. Spell shield, parry or crowd-control immunity denies the
appropriate polymorph packet.

The movement reduction removes 60 after positive movement bonuses, before slow
modifiers and soft caps, and is not reduced by slow resistance. Its exact source
and ability link it to the accepted polymorph; cleanse or shortened control ends
the penalty immediately. With 350 base speed and a 25% speed bonus, it produces
377.5 raw movement speed rather than multiplying the penalty by that bonus.
Ally and self W remain instant and share the hostile W cooldown.

## Help, Pix! and Wild Growth

E uses actual recipients. Enemy damage can be blocked while Pix still attaches
and true sight remains, as the primary notes require. Friendly Champion-class
recipients receive the actual shield. Other friendly units can carry Pix without
receiving a champion-only shield. Shield destruction does not detach Pix, and a
leash return does not erase the independent shield.

The retained E bug redirects a selected nonchampion to a targetable allied or
enemy champion within 75 center distance, including one hidden from ordinary
selection. The source leaves allied, hostile and equal-distance priority
unresolved. Nearest center followed by stable identity is the arena's explicit
tie policy. No eligible body means no invented recipient or redirection.

R grants actual maximum and current health directly, without treating the gain
as healing or applying healing reduction. It anchors both initial displacement
and the continuing slow to the actual selected recipient. Champion and pet
health caps return at expiry; refreshing the same health bonus cannot grant it
again. An already emitted aura on a surviving real ally can continue after Lulu
dies and ends when that recipient dies or the duration expires.

The primary supplies a 40% size increase, but the retained sources do not pin
generic gameplay-radius, pathing-radius or cap transformations. Those geometry
changes remain unimplemented and visible; the kit does not silently guess them.
Exact lateral displacement, Pix offsets, client cursor selection and unsupported
ally spell ownership likewise remain arena limits. The E redirection is distinct
from the passive's unimplemented full enchantment-credit routing to arbitrary
allied champions; only actual Champion-class summoned bodies are available here.

## Ordinary behavior and allocation

Idle does not cast. Completed trades retreat before optional spell choices.
Visible incoming threats can trigger self E, and fight can use R when health is
low and an enemy or threat is nearby. W peels an acting or nearby enemy, while Q
uses the actual Lulu or Pix reach. Offensive E is used when an immediate shield
is not reserved. Self W shares the control cooldown and can support an actual
basic opportunity or escape. Hold and trade reserve R.

Reference pricing includes baseline Pix cadence, the nominal 1.5-bolt Q packet,
one hostile E packet and self E shielding per cooldown. It does not price
invented allied output, damaging R or simultaneous W control and self-buff
uptime. The actual simulation still requires legal resources, recipients,
declarations, projectile contacts, defenses and recipient-local lifecycles.

## Meaningful checks

The focused tests cover source retention and missing-evidence rejection, sealed
reference reads, exact damage formulas, basic declaration timing, enemy and
nonchampion attachments, real collision bodies, projectile defenses, committed
post-death bolts, two Q origins and cursor directions, per-cast reduction,
branch-local outcomes, post-death slow decay, paid invalidation, polymorph
cleanse and movement ordering, actual E recipients and redirection, independent
shield and attachment lifetimes, R health and control, actual ally expiry,
ordinary behavior and unchanged full-budget production searches against Darius
and Heimerdinger. Source and geometry limits above remain part of the result.
