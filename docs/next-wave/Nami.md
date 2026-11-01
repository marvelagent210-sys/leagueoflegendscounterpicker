# Nami: real bounces, blessing stock and traveling control

Nami reads the pinned patch 26.20 records, at maximum ability ranks and level 20.
Her full primary revisions remain in the ability dataset: Surging Tides 3985614,
Aqua Prison 4007696, Ebb and Flow 4007697, Tidecaller's Blessing 4042884 and
Tidal Wave 3712330. Supplemental game objects retain the exact versioned binary
URL, object path and SHA-256. Existing primary values have not been replaced by
conflicting client values.

## Sources and formulas

| Effect | Maximum-rank or level-20 value |
|---|---|
| Surging Tides | 100 + 25% AP flat movement speed, decaying over 1.5 seconds; doubled by R |
| Q | 310 + 50% AP magic damage; 850 cast range; 200 enemy center radius; 1.5-second suspension |
| Q allied movement | The primary record gives 225 center radius and explicitly says testing is pending |
| W | 200 + 50% AP magic damage or 155 + 40% AP healing; 725 initial range; 800 bounce range |
| W subsequent legs | Each bounce adds −20% + 15% per 100 AP to the original effectiveness |
| E | Three charges for six seconds; each deals 80 + 20% AP magic damage and slows by 35% + 5% per 100 AP for one second |
| E nonchampion area contacts | 69.8824% proc damage at level 20 in the preserved primary extrapolation; the displayed level-18 endpoint is 66% |
| R | 350 + 60% AP magic damage; 2750 range, 500 full width, 850 speed; estimated 0.5-second knockup and 70% slow lasting 2–4 seconds with actual travel |

Q keeps its primary 0.25-second cast and 0.726-second post-cast flight. The retained
note instead totals 0.264 + 0.726 = 0.99 seconds; that conflict remains visible.
R's retained travel note says 3.267 seconds, which differs from 2750 / 850.
Neither conflict silently changes the primary spell fields. Every numeric value
used by the kit is read while building the kit; combat and budget callbacks do not
read sealed source records.

## Implemented behavior

Surging Tides belongs to the actual recipient. Its flat movement bonus decays
before that recipient's usual movement modifiers and soft caps. R's separate
empowered buff takes priority even when its current value is weaker than a fresh
ordinary buff. If an ordinary buff outlives it, that buff starts at full strength
and decays over its remaining lifetime. A wave grants Nami her doubled buff once
on completed cast, and grants each actual allied body its buff once on crossing.

Q creates one fixed ground landing with the simulator's ordinary skillshot
decision. A linked axial flight supplies the actual arrival and projectile
destruction clock; a destroyed bubble removes its landing. Its enemy geometry is
measured to the center, and its suspension respects tenacity and Last Breath's
existing suspension entitlement. Q's standard sight does not reveal invisibility
or camouflage. Nearby actual allies can receive movement even when an enemy
spell shield blocks the hostile packet.

W captures a real initial target, then follows up to two real recipients,
alternating teams and excluding previously affected bodies. It never supplies an
imaginary third champion. The initial flight uses 2500 speed and subsequent legs
use 1500. Each leg snapshots its damage or healing at launch; each recipient keeps
its own mitigation, healing modifiers and defenses. A shielded enemy is not marked
affected, so it can become the final recipient again. A parried recipient remains
affected. A declared target that becomes invalid during the cast cancels before
mana and cooldown payment, including actual ally targets. Equal-distance bounce
priority is not specified by the source: the arena chooses nearest centers, then
stable real body identity. The source's 60% minimum after two bounces establishes
additive effectiveness instead of compounding two 80% multipliers.

E starts empty and grants one real stock of three entitlements to Nami or an
actual eligible Champion-class ally. A connected basic spends one entitlement
for the whole attack, including an allied basic with several damage packets.
Nami's damaging Q/W/R contacts share one entitlement for all actual recipients of
the same source cast. Launched missiles and zones keep their own cast identity,
so later casts cannot relabel earlier flights. The separate E proc keeps its
own dodge, block and parry rules; it does not make Q's ordinary area damage
dodgeable. A basic proc bypasses spell shields as the E record specifies.
An expired but unused stock does not prevent the ordinary policy from renewing E.
An already blessed real ally keeps its remaining charges after Nami dies, and
released movement buffs continue their decay during remaining aftermath ticks.
Those callbacks do not let the dead caster act, heal itself or regenerate mana.

R travels along the actual line, checks projectile defenses, affects each real
hostile body once and retains separate airborne and slow clocks. Slow duration
uses the wave's actual travel rather than the original target distance. It does
not equate trajectory sight with true sight or a target reveal.

The ordinary fight policy uses E, Q, W, R and basics according to actual resources,
distance, health and control. Hold and trade reserve R; completed trades retreat.
Flee can heal, speed itself or use Q as peel. The allocation reference includes
real Q/W/R damage, at most three E procs per hasted E cooldown and one actual
first-bounce self-heal. It adds no allied statistics or nonexistent bounce targets.

## Explicit limits

The simulator uses a one-dimensional lane. Q's vertical bubble trajectory and
R's ground-vision geometry are not supplied, so they are not invented. The allied
Q radius remains a source uncertainty. Arena projectile interception therefore
uses the documented axial flight and existing body geometry.

The source does not settle root-spell versus E-proc ordering for a root spell
blocked by a spell shield or parry. This implementation preserves E stock when
the root packet is defended; it tests and records that interpretation. Item and
rune enchantment redirection are outside the item-free arena. Actual allied
basics are supported; a pet attack without an actual allied ability identity is
not recast as an invented champion spell. Standard solo matchups contain no allied
champions, structures or wards.

## Regression coverage

The Nami tests exercise source provenance and sealed allocation callbacks,
passive overlap and decay, centered Q geometry, actual flight destruction,
tenacity, standard sight, released post-death Q, real W bounces and defenses,
free target cancellations, exact E stock and defense separation, actual pet
identities, R travel and movement, resource-aware autonomous Q/W/E/R use,
trade/flee policy and mirrored ordinary combat. Batch validation additionally
checks source integrity, production searches, strict reflection and the complete
fresh matrix before updating the private delivery.
