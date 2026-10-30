# Hwei: source audit and simulation contract

Patch **26.20**, Data Dragon **16.20.1**. All nine basic choices use their parent
Q/W/E rank 5, regardless of the parser's second-key ability kind. R uses rank 3.
The source record retains every original primary field and note and appends the
complete raw text of all 15 pinned revisions. Exact object-scoped excerpts from
29 distinct spell objects are promoted from the pinned Hwei binary.

| Ability | Pinned primary page | Revision |
| --- | --- | ---: |
| Crushing Maw | `Template:Data Hwei/Crushing Maw` | 4008532 |
| Molten Fissure | `Template:Data Hwei/Molten Fissure` | 4026407 |
| Stirring Lights | `Template:Data Hwei/Stirring Lights` | 3927605 |
| Subject: Torment | `Template:Data Hwei/Subject: Torment` | 4026410 |
| Signature of the Visionary | `Template:Data Hwei/Signature of the Visionary` | 4038347 |
| Devastating Fire | `Template:Data Hwei/Devastating Fire` | 4026403 |
| Fleeting Current | `Template:Data Hwei/Fleeting Current` | 3959274 |
| Grim Visage | `Template:Data Hwei/Grim Visage` | 4021906 |
| Subject: Disaster | `Template:Data Hwei/Subject: Disaster` | 3970734 |
| Spiraling Despair | `Template:Data Hwei/Spiraling Despair` | 4008531 |
| Wash Brush | `Template:Data Hwei/Wash Brush` | 3970738 |
| Gaze of the Abyss | `Template:Data Hwei/Gaze of the Abyss` | 4010562 |
| Pool of Reflection | `Template:Data Hwei/Pool of Reflection` | 3992645 |
| Severing Bolt | `Template:Data Hwei/Severing Bolt` | 4026406 |
| Subject: Serenity | `Template:Data Hwei/Subject: Serenity` | 3970735 |

The binary URL is
`https://raw.communitydragon.org/16.20/game/data/characters/hwei/hwei.bin.json`,
release `16.20.8248524+branch.releases-16-20.content.release`, SHA-256
`f12b7f7fb3abcac2ee2974ae33edd6331566e304dfc68581e891f262945e0d60`.
Client metadata corroborates declarations and supplies explicitly attributed
geometry; it does not override conflicting primary values or establish absent
server script behavior. All runtime numbers are captured through KitContext
before sealing. No lazy hook or budget read changes the evidence afterward.

## Spell books and resources

Q, W and E open one mood, with free non-activation entry and Wash Brush. Selected
spells share their parent group's cost and cooldown: Q 120 mana / 6 seconds,
W 110 mana / 16 seconds, E 70 mana / 10 seconds. Book-entry cooldown identities
are separate, so toggling cannot reset the group's actual cooldown. Selection
exits the mood. R is unavailable inside a mood; Wash Brush remains legal under
cast-inhibiting control. Ordinary selected spells retain their casting guards.
The primary 10-second E cooldown overrides the client's 11-second declaration.
Primary instant WE and mood toggles override stale 0.25-second client entries.

## Damage, marks and actual recipients

- Signature uses the supplied level-20 continuation **313.823529411765 + 35% AP**,
  a 4-second mark, 0.85-second delayed detonation and 285 edge radius. Every cast
  retains its own serial across missiles, pools, delayed stages and clones.
  Same-cast damage cannot consume or reapply that cast's own mark. Consumption
  freezes the actual impact coordinate; the victim can leave before detonation.
  Mark application, consumption and explosion retain independent spell defenses.
- QQ travels 800 at speed 2,000, colliding with the first real damageable enemy.
  Its collision explosion uses radius 175; untouched expiry centers 100 farther.
  Damage is **170 + 80% AP + 7% target maximum HP**, capping only the HP component
  at 250 against actual monsters. Advertised explosion reach is kept separate
  from missile travel, including the endpoint-only target case.
- QW lands **1 second from declaration**, including its 0.5-second cast. Its base
  is **160 + 30% AP**. The exact raw primary 11-point table establishes linear
  **100–350% total damage** with missing-health fraction for isolated or
  immobilized recipients. Isolation snapshots the actual eligible recipients
  at impact, excluding stasis and untargetability while retaining invisible
  area recipients. An earlier recipient's death cannot change that cast's
  isolation for later recipients. It caps monster bonus
  damage at 300 and applies minion/non-epic monster 50% damage independently.
- QE declares seven delayed eruptions from its actual cast-start origin, first
  at 0.6 seconds and then the primary's explicitly estimated 0.2-second spacing.
  One recipient gets at most one **80 + 30% AP** shockwave per cast. Distinct
  2.5-second lava pools may overlap, each with ten absolute quarter-second
  **20 + 6% AP** persistent packets. Shockwaves are spell-shieldable; lava is not.
  Minions take 60%, monsters 135%, and live lava occupancy supplies 35% slow.
- WE provides exactly three nine-second entitlements. Each actual connected
  basic or claimed cast group spends once and restores 65 mana once, clamped to
  actual maximum. Its separate **60 + 15% AP** proc bypasses spell shields even
  when the parent is denied. Parent parry/stasis/untargetability, basic blindness
  and dodge remain relevant. Actual nonchampion AoE procs take the 50% rule.
  The proc cannot recursively spend another stock or supply independent ink.

Only actual supplied bodies participate. The pinned Signature description says
"enemies hit", while its radius tooltip calls the target a "marked champion".
This unresolved wording is retained: the implementation follows the broad
primary description for real damageable bodies and does not invent minions,
clones, allies or wave occupants. Hit-count props retain standard immunity.

## Support, control and finite lifecycle

WQ preserves declaration origin and actual aim. A released six-second path
refreshes **40% + 3% per 100 AP** movement speed and ghosting for 0.5 seconds at
absolute 0.125-second intervals, on self and real allied Champion-class bodies.
WW creates its actual 650-range, 350-radius pool at declaration, before its
0.3-second cast completes. Initial shield is **130 + 30% AP**. Each 0.264-second
refresh replenishes remaining capacity by **21.6666666666667 + 5% AP**, capped at
**260 + 60% AP**. Actual allies receive 85%. Absorption reduces real remaining
shield; the pool regenerates capacity, rather than repeatedly granting a full
cap or healing health. Expired recipients reenter with the initial amount.

EQ uses a first-body speed-1,300, range-1,100 projectile, knockdown, 1.5-second fear
and its distance table `[0,300,600,900,1100] → [70,78,86,94,99]%`, with normal
accepted-CC duration and immunity. EW placement is an actual finite blockable
projectile. Its eye expands for 0.2 seconds, arms 0.7 seconds after placement and
lasts 3 seconds. It locks the nearest real visible Champion-class body within
350, then waits 0.3 seconds before a 600-range, first-body seeker. The seeker
can hit a real intervening minion; its 2-second root and 2.5-second reveal belong
to that contacted body. Trigger, launch and sight radii 350/600/450 stay distinct.

EE resolves 0.6 seconds from declaration in the actual center-axis slice of two
680-by-340 rectangles rotated ±20 degrees. Rectangle/circle intersection keeps
it distinct from a 400-radius disk. A conservative circumscribed broad phase
admits circles touching rotated edges; the actual rectangle/circle intersection
guards each packet, and the finite champion branch uses the independently
computed axial clearance rather than that broad-phase radius. A guarded immediate displacement pulls real
off-center recipients toward the declared center; absent server pull duration
is not replaced with invented airborne time. Its 70% slow starts after immediate
pull resolution and decays over its accepted 1.25-second lifetime. QE, EQ, EE and
R explicitly opt into the same-source multiplicative Hwei slow group. Refreshes
of one component do not multiply that component repeatedly; ordinary external
slows retain the global strongest-slow rule.

R initially passes actual nonchampions and attaches to the first real
Champion-class body, with 1,300 travel and a separate 40-edge terminal check.
Accepted attachment tracks that exact body through movement and owner death.
Twelve absolute quarter-second **7.5 + 1.25% AP** packets precede one
**450 + 80% AP** explosion, for **540 + 95% AP** total on a stationary unprotected
host. Each accepted pulse adds one 10% Despair stack, up to twelve. Blocked
pulses add none. The actual accepted 0.25-second slow owns the stack deadline;
a true exposure gap or dispel resets it before the next accepted pulse. Equal
deadlines count as contiguous renewal on the 30 Hz grid. The shared tenacity
floor does not shorten this naturally sub-0.3-second pulse. A real host's combat death detonates once, including nearby
actual bodies, without transferring the aura to another champion. Detonation
clears the source's Despair statuses. Released ground events and actual carriers
retain explicit post-death settlement; no fake damage keeper extends fights.

## Source gaps and explicit model boundaries

- Server QE eruption-center offsets are absent. Seven uniformly spaced axial
  centers across range 1,200 are an explicit spatial approximation. The client's
  speed-800 carrier is used for interception; it does not prove those offsets or
  server onset. Interception removes unreleased eruptions and retains old lava.
- WQ width 225 and QE eruption spacing 0.2 seconds are explicitly estimated in
  the primary. WQ axial expansion uses the client's speed 1,700 after cast
  completion as a declared onset interpretation, not a verified server clock.
- WW primary admits inconsistent one/two bonus shield ticks on cast. The stated
  initial amount is used without those bonus ticks. Conflicting client shield
  duration 1 second and full-stack time 3 seconds are not silently substituted.
- EW's primary 1,700 launch-speed field is interpreted for placement and seeker.
  The client's accelerating 1,300→2,100 seeker conflicts; it is retained in the
  exact evidence. Invalid/dead/too-distant targets before firing cause a fizzle.
  A released seeker follows actual target direction until first contact/range.
- WE multi-target/cast ordering is not fully specified. One cast entitlement may
  proc on each actually contacted body once and refunds mana once. Already
  claimed released-cast entitlement is retained after owner death; unused
  ordinary self stocks end on death.
- Initial R aura radius and growth curve are absent. The implementation declares
  linear 0→500 over 3 seconds, using current radius for early-death detonation.
  The 12×10% stack declaration would exceed 100%; the multiplier is capped at
  nonnegative movement, retaining the global movement floor. This cap and early
  geometry are explicit interpretations, not sourced server behavior.
  Primary Despair duration 0.25 seconds overrides the binary's approximately
  0.35-second `SlowDuration`; neither expiry nor re-entry retains old stacks.
- No unsupported lateral sidestep, brush sight coverage, ally, preduel cast or
  minion body is fabricated. Finite skillshot branching and scalar geometry
  retain their existing general limits.

## Budget and ordinary play

Reference allocation prices one legal QQ, EQ and R stream, bounded WE procs and
one passive-pair cadence. It does not sum nine independent basic cooldowns or
price simultaneous W damage and imaginary ally shielding. Ordinary AI enters
books, claims WE, chooses QQ/QW/QE from range/control/stationary state and uses
actual EQ/EE, WW and WQ control/defense. Hold/trade reserve R and completed trades
retreat before optional casting.

## Actual validation

The complete Hwei regression file passed **82/82** tests, including source reads,
book/cost isolation, endpoint-only QQ contact, actual pet collisions, QW timing
and isolation, cast-serial ink, independent defended WE proc, regenerated shields,
QE overlap and interception, real eye targeting, exact EE slice and guarded pull,
finite host-local R/death, ordinary policy and cloned state. Full 15,000-gold
production checks pass all six reflected Darius scenarios with exact reversed
builds and unchanged **1e-10** tolerance, and all six finite Heimerdinger turret
scenarios. These are completed actual checks; complete batch integration and
registry-wide matrix/browser validation belong to the separate batch gate.

The initial three focused failures remain in the external v2 report. They led to
separate advertised QQ reach/travel, the shared immediate-displacement contract
for unsourced EE duration, and a corrected packet-level test observation. The
subsequent v3 mechanics and v4 complete 63-test reports remain preserved.
The independent peer review then exposed QW eligibility/order, rotated-edge EE
broad-phase loss and expired/dispelled R stacks. Its unchanged-source failing
proofs are preserved in `peer-front-hwei-before-v1` and `-v2`; the complete
81-test pass is pinned by `peer-front-hwei-complete-v1-command.json`. A subsequent
regression checks that a finite champion miss leaves a real pet as QW's sole
recipient and keeps sibling branches independent. The current 82-test pass is
pinned by `peer-front-finished-v1-command.json`; its source and test hashes stayed
unchanged throughout that run. All original assertions, budgets and reflection
tolerances are retained.
