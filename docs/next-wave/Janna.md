# Janna: source audit and implemented duel mechanics

Batch 13 implements Tailwind, Howling Gale, Zephyr, Eye of the Storm and Monsoon.
The champion has no invented ally, turret or charge-history variant. Numeric inputs
are read through `KitContext` before compilation seals the source reader. The
focused regressions are [janna.test.ts](../../tests/kits/janna.test.ts); the
batch-wide matrix, strict reflection and release checks are separate gates.

## Pinned evidence

The five primary ability records retain their complete exact manifest-pinned raw
wiki revisions in `data/16.20/abilities/Janna.json`. Supplemental game evidence
retains fourteen complete spell objects from the exact patch 16.20 binary at
`https://raw.communitydragon.org/16.20/game/data/characters/janna/janna.bin.json`.
Each object retains its path, version and binary SHA-256. The strict batch audit
checks those objects against the downloaded binary and preserves every original
primary field; supplementary evidence never silently overwrites a primary value.

| Primary template | Exact revision |
|---|---:|
| Tailwind | 3985378 |
| Howling Gale | 3800440 |
| Zephyr | 3971180 |
| Eye of the Storm | 3933659 |
| Monsoon | 3959332 |

The binary version is `16.20.8248524+branch.releases-16-20.content.release`, with
SHA-256 `a822bf7b062a5df5b03f693b0dedc3abbd8415a71d6f91dc30cae149d9e265f2`.

## Maximum-rank and level-20 behavior

| Ability | Implemented values and delivery |
|---|---|
| Tailwind | Eligible actual allies within 1,200 gain 6% movement speed while facing toward Janna. Her basic on-hit and the existing Zephyr ratio use 30% of her bonus movement speed. |
| Howling Gale | 110 mana; 14-second cooldown begins on initial activation. A ground charge retains initial origin and direction for up to 3 seconds. Damage interpolates 195 + 50% AP through 285 + 80% AP. Range interpolates 1,100 through 1,760 and speed 880 through 1,408, preserving 1.25-second full flight. The primary knockup series is 0.5 through 1.25 seconds, reaching its cap after 1.5 charged seconds. |
| Zephyr | Permanent 10% + 2% per 100 AP movement bonus and ghosting. Active costs 70 mana with a 6-second cooldown and a 0.245-second cast. Its 1,600-speed homing flight uses 550 edge range and deals 175 + 50% AP + 30% bonus movement speed, then slows for 2 seconds by 36% + 6% per 100 AP, capped at 99%. |
| Eye of the Storm | 90 mana, 12-second cooldown, instant self or actual eligible allied recipient within 800 center range at declaration. The sourced 175-unit forgiveness note is retained as evidence for pending-target validation. Its 4-second shield absorbs 240 + 55% AP. The exact shield grants 30 + 10% AP bonus AD while it remains positive. Accepted slow or airborne on an enemy champion refunds 20% of remaining E cooldown once per spell instance. |
| Monsoon | 100 mana and 100-second cooldown begin on the instant cast. Actual enemies within 700 center distance are pushed outward toward 875 center separation over 0.5 seconds, with terrain collision. A stationary interruptible 3-second channel heals self and actual nearby eligible allies twelve times, at absolute quarter-second deadlines, for 50 + 12.5% AP each. |

Howling Gale's manual release is a second ability activation for cast listeners.
Automatic release has no additional activation or payment. Charging has no damage
or control contact. The launched piercing projectile traverses actual hostile
bodies, respects projectile walls and interception, and applies actual pet area
damage scaling. Its uncertain decisive control uses ordinary independent hit and
miss branches. An already anchored charge or released projectile can finish after
caster death; no new cast or second charge is granted by resurrection.

Zephyr's primary damage already includes Tailwind. Its ratio is therefore applied
once. Both its first missile forecast and actual contact use the current AP-scaled
slow. Target loss during the cast uses the shared free-cancellation contract;
launched missile loss and projectile defenses remain their actual events.

Eye of the Storm's AD uses the shared exact-shield dependency. Destroying that
shield removes the effective AD synchronously, even if another shield survives or
Janna is dead. Self casts do not create a second allied shield. Actual allied
Champion-class pets can be selected explicitly by an aimed cast. Spell shielding,
parry, slow immunity and crowd-control immunity deny the corresponding E refund;
damage alone is insufficient. A piercing storm or area blast earns at most one
refund across multiple eligible contacts.

Monsoon healing follows the actual channel action. Movement, a permitted basic
attack, an ordinary spell, disabling control, death or resurrection stops future
pulses. Every pulse uses current AP, recipient healing modifiers and actual range;
the initial hostile push can be denied while the beneficial channel continues.

## Source conflicts and explicit limits

- The primary Howling Gale knockup series reaches 1.25 seconds after 1.5 charged
  seconds. The binary instead encodes a 0.5-second base plus 0.25 seconds per
  charged second, reaching that cap at 3 seconds. The implemented primary series
  controls this visible conflict. Continuous charge damage and range interpolate
  the recorded endpoints; no unsourced damage staircase is introduced.
- The Eye of the Storm blurb mentions decay, but its primary lifetime is 4 seconds
  and its binary `DecayGracePeriod` is also 4 seconds. No earlier decay curve is
  supplied. The full shield remains through the grace period, then expires.
- The E refund wording does not distinguish total cooldown from remaining
  cooldown explicitly. The implementation interprets the percentage as a fraction
  of the actual remaining clock, with normal tick rounding; it does not refund a
  fixed percentage of an already elapsed clock.
- The current Zephyr primary does not say that casting removes its passive
  movement/ghosting. Those benefits persist through its active cooldown. The
  primary instant Q/E/R cast times take precedence over generic client cast-time
  metadata, and the primary W damage retains its additional movement ratio.
- The arena is one-dimensional. Width 240 governs sidestep probability, while
  actual on-axis travel intersects real body radii without an invented endpoint
  lollipop. Vertical movement, terrain routing and lateral ally facing lack full
  metadata. An allied pet's real movement or attack declaration can establish a
  heading; an unknown initial stationary orientation supplies no directional aura.
- Actual league turret structures and their kill-credit transfers are unavailable
  here. Summoned minion-class turrets are not relabeled as structures. No allied
  champion or minion body is fabricated. Aimed self/ally selection is a simulation
  command policy, not a reconstruction of the live client cursor system.

## Ordinary behavior and allocation

Idle makes no casts. Completed trades retreat before optional abilities. E protects
against visible incoming damage or prepares an available basic attack. W is used
in actual range; Q anchors toward a visible enemy and releases when its current
contact chance is favorable, when peeling in flee, or after half charge, with the
normal automatic deadline retained. Fight can use R after substantial missing
health and a nearby enemy or visible threat. Hold, trade and flee reserve R. An
ordinary active Monsoon is allowed to finish instead of immediately self-canceling.

The reference allocator prices self E shield/AD uptime, minimum-charge Q, Zephyr,
basic Tailwind damage and sustained Monsoon healing with channel time. It includes
the sourced Zephyr movement passive in reference initialization, but does not price
imaginary allies, guaranteed mature Q hits, E refund loops or turret damage. Actual
fights still require mana, real contacts, current shields and missing health.

## Meaningful regressions

The focused suite checks numeric formulas, evidence loss, sealed reader use,
anchored/manual/automatic/post-death Q clocks, fixed headings, real piercing pet
contacts, projectile destruction, hit/miss branch independence, current AP slow
forecasts, exact E shield/AD lifetime including owner death, per-cast accepted
control refunds, real directional ally movement, quarter-second heal cadence,
terrain-limited push, control/attack/move/cast channel cancellation, ordinary modes,
and unchanged 15,000-gold production searches against Darius and Heimerdinger.

Eye of the Storm declares an actual ally within its primary 800-unit range. Its pinned 175-unit forgiveness is retained as evidence but does not enlarge the instantaneous declaration range.
