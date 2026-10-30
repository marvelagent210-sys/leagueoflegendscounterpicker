# Sona: exact sources and implementation boundaries

This audit describes the authored level-20, maximum-rank Sona kit for dataset
16.20 (patch 26.20). It records source decisions and meaningful regression scope;
the expansion's final matrix, browser checks and private archive are separate gates.

## Retained sources

| Primary ability template | Revision |
|---|---|
| [Power Chord](https://wiki.leagueoflegends.com/en-us/Template:Data_Sona/Power_Chord?oldid=4047882) | 4047882 |
| [Hymn of Valor](https://wiki.leagueoflegends.com/en-us/Template:Data_Sona/Hymn_of_Valor?oldid=4049803) | 4049803 |
| [Aria of Perseverance](https://wiki.leagueoflegends.com/en-us/Template:Data_Sona/Aria_of_Perseverance?oldid=4008052) | 4008052 |
| [Song of Celerity](https://wiki.leagueoflegends.com/en-us/Template:Data_Sona/Song_of_Celerity?oldid=4012188) | 4012188 |
| [Crescendo](https://wiki.leagueoflegends.com/en-us/Template:Data_Sona/Crescendo?oldid=4047883) | 4047883 |

Each primary record and numeric field remains intact. Full exact raw templates are
retained as attributed supplementary sources. All source values are captured through
`KitContext` during compilation; combat and budget callbacks never reopen the data.

The exact [CommunityDragon binary](https://raw.communitydragon.org/16.20/game/data/characters/sona/sona.bin.json)
is version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256
`682d46bfcdcb56ae7a3677881f3a0ff17b484124d373118b5be6094b1aff4968`.
Twenty-one complete spell objects are retained with exact paths and attribution.
They include the base passive, three passive-stack missiles, passive count buff,
ordinary passive attack, the three basic spells, their passive attack/debuff
objects, Q missile/on-hit, W missile/shield and R. Primary standard-mode rank values
override stale spell metadata and alternate game-mode arrays.

## Permanent history and Accelerando

The explicit `accelerando` option represents stacks already earned before the duel.
Its default is zero; runtime values are integer-clamped to 0–120. No farming or
teammate history is fabricated merely because the champion is level 20.

Each actual accepted Q hit on an enemy Champion-class body earns one stack.
Each actual W heal of another wounded allied champion earns one stack. A W shield
on another actual Champion-class body earns one stack once that specific grant
has absorbed at least 105 damage. Its larger AP-scaled shield does not inflate
the threshold. Exact consumed-shield snapshots distinguish Sona's shield from
another shield or a legacy custom refund. Shield credit is cumulative within one
grant and occurs at most once for that grant. Self W healing and shielding earn
no ally credit. No body means no hypothetical second Q or allied W benefit.

Each stack grants 0.5 basic ability haste, up to 60. This adds to purchased haste
for Q/W/E cooldowns while Crescendo retains ordinary purchased haste only. At the
cap, subsequent earned events instead remove 1.5 seconds from R's current cooldown;
they never store a refund for a future R. The primary Q description says accepted
hits grant stacks, whereas its blurb uses damage wording; accepted guarded contacts
govern. Spell shields, parry, projectile destruction and target loss deny Q contact
credit. Invulnerability does not fabricate a miss.

## Melody and the three basic casts

Q/W/E have the primary's zero cast time. Their binary `spellCastTime:0.25`
metadata is retained as a source conflict rather than replacing the primary.
Each completed basic cast imposes an unhasted 0.5-second cooldown floor on the
other two basic spells, preserving any longer existing deadline. It replaces the
active three-second aura and increments Power Chord up to three.

Only one aura can tag new bodies at a time. Sona and each actual eligible ally
can receive its effect once per activation, including an ally entering during the
three seconds. The 400 aura radius is explicitly center-to-edge. Tagged effects
retain their own duration when the body leaves or another aura becomes active.
Already spent Q Melody does not regenerate merely by standing inside its old aura.

Q grants a five-second entitlement to `30 + 0.10 × Sona AP` bonus magic damage
on a connected basic attack. AP is snapshotted when the entitlement is granted.
Damage blocks, blind, dodge and parry deny the proc. An actual allied pet's basic
uses that real attack actor and its available penetration metadata; it does not
borrow a second champion's actions or resources. Ward and jungle-plant exceptions
need actual targeting metadata and are not inferred from unrelated summoned bodies.

W grants a 1.5-second shield of `105 + 0.25 AP`. Same-source grants replace the
prior W shield rather than stacking. E tags actual allies with `18% + 0.0002 AP`
movement speed for three seconds. Self E is handled separately.

## Q: two actual sound bolts

Hymn of Valor costs 70 mana and has an eight-second base cooldown. It selects
at most two real visible enemies within 825 center range, prioritizing champion
targeting class, then distance and stable body identity. An isolated opponent
receives one bolt. Selected targets gain one second of ordinary unit sight; the
source gives no area-vision radius, so no extra scouting region is invented.

Each bolt is an independent 1300-speed homing projectile dealing
`190 + 0.40 AP` area damage. Actual pets use their own area damage resistance,
protection and health. Each missile can be destroyed, intercepted or lose its own
target independently. Spell shields and parry belong to the contacted body rather
than its owner. Accepted champion contacts each earn their own Accelerando event.

## W: self heal and one real allied tone

Aria costs 100 mana and has a ten-second base cooldown. It immediately heals Sona
for `90 + 0.30 AP` and launches one 1300-speed tone to the eligible real ally with
the greatest missing-health percentage within 1000 center range. Ties prefer the
nearest body and then stable ID. If everyone is healthy, the nearest eligible ally
can still receive a tone but earns no heal credit. The heal occurs on actual arrival,
uses the recipient's healing modifiers and respects actual death, stasis and
untargetability. A selected ally entering stealth remains followed without reveal.
Projectile interception uses the one-dimensional path to that actual body.

An ally beyond the aura can receive the tone without receiving the W shield.
An ally entering the aura later can receive a shield without being the tone target.
Those separate entitlements and their credit events are not conflated.

## Power Chord: declaration identity and separate bonus packet

Power Chord starts empty. First reaching three stacks resets the basic attack timer.
The next real basic declaration consumes the stacks and gains an uncancellable
windup, subject to the shared polymorph/death exceptions. Its Q/W/E identity travels
with the attack, so casting a different spell while the missile is in flight does
not change the old chord. Earned stacks survive resurrection.

The primary's explicit level continuation yields these level-20 values:

| Last basic | Bonus packet and additional effect |
|---|---|
| Q: Staccato | `405 + 0.30 AP` magic damage |
| W: Diminuendo | `270 + 0.20 AP` magic damage; `25% + 0.0004 AP` outgoing damage reduction for three seconds |
| E: Tempo | `270 + 0.20 AP` magic damage; `50% + 0.0004 AP` slow for two seconds, capped at 99% |

Ordinary basic damage can still critically strike. Chord and Q Melody are separate
noncritical bonus packets. Blind, dodge, parry and attack blocks deny the chord.
The primary spell-shield flag is represented by a guarded separate chord packet;
its spell shield does not erase ordinary basic damage or the independent Melody.
Diminuendo does not override the global rule that ordinary damage reduction does
not reduce true damage. Its sourced 8% visual size change lacks a pinned generic
gameplay/pathing-radius conversion, so radius changes are an explicit geometry limit.

## E and R clocks

Song of Celerity costs 65 mana and has a fourteen-second base cooldown. Self movement
speed is `20% + 0.0002 AP` for up to seven seconds. Actual HP or shield damage makes
it end at the three-second minimum, or immediately if three seconds already elapsed.
Fully negated damage creates no false damage event. Recipients keep their own
three-second ally movement effect independently.

Crescendo costs 100 mana and has a 100-second maximum-rank cooldown. It retains
the actual origin and direction at declaration, completes a 0.25-second cast and
launches a 2400-speed piercing projectile with 1000 range and 280 full width.
It deals `350 + 0.50 AP` magic damage and stuns for 1.5 seconds. The expanded
cast-at-start note establishes origin; it does not establish pre-cast delivery.
Projectile walls, actual interception, body-local spell shielding/parry and CC
immunity retain their separate effects. Pet damage categories and contact hooks
remain actual-body operations.

## Policy, reference spending and verification scope

Fight uses reachable R, meaningful missing-health W, Q and real basics. Hold and
trade reserve R. Flee can use E and W; completed trades retreat before optional
actions. Idle grants no free spells or healing.

Reference spending prices self-only Q damage, one Melody per available attack,
a bounded ordinary Q/W chord cadence, self W healing and its nominal shield.
It uses explicit initial history for basic haste and never prices fictional
allied healing, second bolts or shield credits. Actual fights must still pay mana
and earn contacts. This estimate does not preload future Accelerando stacks.

Authored regressions cover exact pins and source mutation failure, history bounds,
basic-only haste and current-cooldown refunds, isolated versus actual multi-target
bolts, area resistance and defenses, tone travel/selection/stealth, actual shield
attribution, aura boundaries and spent entitlement handling, attack snapshots,
Power Chord damage/control/defenses, resurrection and branch independence, E clocks,
declared R origin, walls and immunity, ordinary modes and exact full-budget
production searches. The Darius check retains all six scenarios, exact 15000-gold
spending and unchanged 1e-10 side-reflection tolerance; the Heimerdinger check uses
actual pets and the ordinary search. Final shared gates determine release status.

A Melody already granted to an actual allied champion body retains its own five-second lifetime and can trigger after Sona dies; death does not tag new allies or create a new aura.

Melody/aura and Aria ally selection explicitly allow actual allied invisibility as a source-specific visibility policy. Hostile stealth, nearsight, untargetability and other abilities retain their own visibility rules.
