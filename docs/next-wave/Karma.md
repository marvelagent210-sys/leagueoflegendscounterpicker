# Karma: finite Mantra and actual contact identities

Implemented in batch 13. Values remain pinned to patch 26.20 / Data Dragon
16.20.1. This is a kit simulator with explicit geometry and behavior assumptions,
not an empirical lane win-rate model.

## Source pins and rank handling

Eight primary templates are retained in full in the authored ability records:
Gathering Fire 3985386, Inner Flame 3875842, Soulflare 3875841,
Focused Resolve 3968365, Renewal 4013452, Inspire 4008449,
Defiance 4004072 and Mantra 4005102. The exact versioned Karma binary and
selected complete game objects have their own URL, object path and SHA-256.
The batch source audit verifies each exact excerpt against that binary and
preserves the original parsed primary values.

Karma's three basic abilities use rank 5. Her Mantra and the separate empowered
bonus tables use rank 4. The parsed parent classification of the empowered
records is five ranks; the module explicitly reads those records at rank 4 and
adds the base rank-5 packet separately. No fifth ultimate rank is invented.

At maximum ranks:

| Packet | Source-backed value |
|---|---|
| Inner Flame | 260 + 70% AP magic damage; 40% slow for 1.5 s |
| Soulflare initial explosion | 480 + 100% AP total magic damage |
| Soulflare field | 50% slow; one rupture after 1.5 s for 310 + 50% AP |
| Focused Resolve | 140 + 45% AP at each endpoint; 2 s tether; 2 s root |
| Renewal | Same endpoint damage; root 3.25 s; each heal is 17% + 1% per 100 AP of current missing HP |
| Inspire | 280 + 60% AP shield for 2.5 s; 40% bonus movement speed for 2 s |
| Defiance primary | 445 + 105% AP shield; primary retains Inspire's speed |
| Defiance secondary | 165 + 45% AP shield; 15% speed for 2 s |
| Gathering Fire | 4 s actual remaining Mantra cooldown refund per champion hit |
| Mantra | 34 s hasted cooldown; instant, free; 8 s empowerment window |

The primary instant E and R casts override the binary's 0.25 s spellCastTime
metadata. Inner Flame's root targeting metadata has a 25,000 cast range and 902
missileSpeed; these are not substituted for the primary 950 center flight range
and 1,700 speed. The actual missile object corroborates the 950 flight range.
The field also displays 890 edge range; the simulation uses its explicitly
labeled 950 center range and 120 full width. Soulflare has 160 full width.

## Delivery and counterplay

Mantra starts available but inactive. One completed empowered basic consumes its
selected entitlement and shares the ordinary Q, W or E cooldown. R can activate
during cast-inhibiting crowd control, but that exception does not make the basic
ability castable during the same control. An R overlaid on an already declared
ordinary Q does not retroactively empower it. An empowered cast declared inside
the eight-second window retains its selected variant while its cast completes.
A free canceled target cast retains a still-live Mantra entitlement; the primary
does not specify that disposition, so it remains an explicit assumption.

Q collides with the first real damageable enemy body and produces one explosion
at the missile's actual collision coordinate. Its flight does not deal a separate
direct packet or consume a shield before the explosion. Nearby actual bodies
receive their own defenses and identities. Ordinary Q fizzles at maximum range;
Soulflare explodes and creates a field there. The caster's completion position
is the origin, with the on-cast direction retained.

An impacted Soulflare creates the field at the impacted body's center, which can
differ from the missile contact coordinate. Slow occupancy refreshes each
simulation tick without inventing periodic damage. One independent delayed area
ruptures at the field's actual location. Spell shields block the initial blast
but cannot block field damage; parry remains its own late damage/control defense.
A projectile wall or interception ends the bolt without producing a phantom
range-expiry explosion. Released bolts and fields can complete after caster death.

W revalidates the actual declared target at completion. Death, untargetability
or sight loss cancels without mana or cooldown. A range-only invalidation pays
both. The sourced Renewal bug still grants the initial self heal on that paid
range cancellation. The explicit pet variants retain the chosen real hostile
pet throughout; they do not transfer its tether to the enemy champion.

Each accepted W endpoint has a two-second tether clock and its own reveal.
The primary 825 center-distance leash is checked every tick. Distance break,
caster death/resurrection and target death/resurrection/disappearance end that
tether. Untargetability gained after attachment does not by itself erase the
attachment; stasis denies endpoint delivery. Completion uses live AP, bypasses a
new spell shield, applies its own root, and reveals only while that root remains.
A newly gained parry denies the endpoint. An actual tethered death grants one
immediate second Renewal heal and no corpse damage/root. A body that has already
left tether range supplies no death heal. The initial heal is independent of a
spell shield blocking initial attachment. No unsupported rune proc is added for
the source's Aery, Conqueror or Electrocute bug notes.

E can shield self or an explicitly selected real allied Champion-class pet.
Defiance spreads from that actual primary to eligible real bodies within 700;
a secondary gets only the secondary shield and speed, and the primary is not
counted a second time. Each recipient retains its own shield status. A new
Inspire replaces this Karma's older Inspire shield/speed without removing other
sources' shields. No teammate, farm stack, jungle target or future resurrection
is fabricated to increase a solo score.

Gathering Fire observes accepted damaging ability hits rather than casts or
raw packet counts. Each initial explosion, rupture, W application and W endpoint
can refund once for each real champion or explicitly Champion-class clone.
Ordinary attacks, field-only slows, nonchampion pets, misses, spell shields and
parry give no refund. Damage-only invulnerability does not invent hit avoidance.
Expected-value contacts scale the refund with the contact share.

## Behavior, allocation and limits

Ordinary fight chooses real Mantra, then Renewal when wounded in tether reach
or Soulflare otherwise. Threats can prompt self shielding. Flee uses E and W to
escape without automatically spending a new R. Hold/trade reserve new ultimate
casts. Standard trade bookkeeping runs before optional kit actions so completed
trades retreat. Idle grants no casts or passive income.

Reference allocation values full-contact Q, both W endpoints and ordinary self
E shielding. A sustained Soulflare branch includes passive-refund cadence.
It prices no ally support or missing-health Renewal heal. Actual fights still
require mana, target contact, intact tethers and actual missing health.

Remaining interpretations are visible in the compiled kit page: one-dimensional
axial splash geometry cannot reconstruct independent lateral splash positions;
initial line-hit probability gates the intended champion's blast/splash together,
while an actual pet detonation uses real axial area contacts. Max-range fields
exist physically after a miss, and later actual movement can leave them. An
expected-value champion impact carries its conditional scale to its attached
field; a real pet/max-range field has a full spatial entitlement. AP snapshot
rules, free-cancel Mantra disposition and caster-death tether behavior are not
fully specified by the pinned primary and remain documented assumptions.

## Regression coverage

The companion tests check source/rank reads, exact packet amounts, finite
entitlements, shared cooldowns, disabled-state R, declaration timing, clone-local
state, real first-body collisions, splash identity, projectile blockers, field
origin/delay/occupancy, shield and parry ordering, movement out of fields, both
W endpoints, leash boundaries, free versus paid cancellations, Renewal healing,
real pet targeting, actual allied spread, unrelated-shield preservation, passive
refund classes, ordinary modes and two 15,000-gold production checks. Batch-wide
reflection and matrix gates independently exercise this kit against every
registered rival before any private preview is updated.
