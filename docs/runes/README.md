# Runes: sources, page structure and partial combat effects

The source catalog and page validator describe the current rune system. Explicit
manual-duel options and browser plain-stat duels apply all seven stat shards.
Manual plain-stat duels also support twenty partial combat effects, including
Font of Life, Aftershock, Overgrowth, Shield Bash, Bone Plating, Grasp of the Undying and all four Precision keystones.
The Grasp refresh recalculated all 14,878 pairings per default matrix and
reproduced both previous results. [Grasp refresh audit](../../ACCURACY.md#grasp-of-the-undying-19-november-2026)
The Conqueror refresh recalculated all 14,878 pairings per default matrix
and reproduced both previous results. [Conqueror refresh audit](../../ACCURACY.md#conqueror-19-november-2026)
The Fleet Footwork refresh verified both default matrices against 29,756
pair results and reproduced the prior published results.
[Refresh audit](../../ACCURACY.md#matchup-refresh-and-recovery)
Press the Attack is the first Precision keystone. Its 17 November refresh
reproduced both default matrices and passed 9,755 tests with five skips.
Presence of Mind implementation began on 13 November; its local provenance
refresh reused all 14,878 pairings per matrix with zero new computation.
Complete default result payloads are unchanged; local validation passed 9,510
tests with five existing skips. Pull-request checks run separately against the
delivery head.
Triumph's genuine full refresh and checkpoint audit completed on 11 November;
complete default result payloads are unchanged. Bloodline's genuine full refresh
and checkpoint audit completed on 10 November. Full rune pages and rune-page
search remain unfinished. The existing Udyr-specific Triple Tonic behavior still
reads its original `runes.json`; default matchups select none of these optional
effects. Full rune combat is step 1 of the [ordered improvement
roadmap](../IMPROVEMENT_ROADMAP.md) and remains in progress.

For dataset 16.21 (patch 26.21), the catalog contains **62 runes in five paths**,
**seven distinct stat shards**, and **three shard rows**. In particular, the
current Sorcery keystones include Stormraider's Surge and Deathfire Touch.

## Reproduce and verify

```sh
npm run fetch:runes -- --dataset 16.21  # explicit network refetch of catalog sources
npm run build:runes -- --dataset 16.21  # deterministic offline catalog and report
npm run build:runes -- --dataset 16.21 --check  # verify without writing
npm run runes:page -- --dataset 16.21 --file page.json
```

The committed inputs in `data/16.21/rune-sources/` include:

- Data Dragon's versioned `16.21.1` rune roster, IDs, paths and rows;
- CommunityDragon's versioned `16.21` client perks and path layouts, including
  stat-shard IDs and row choices;
- 62 exact wiki rune-template revisions and the full `Rune` rules article;
- a manifest of exact source URLs and SHA-256 hashes.

The offline build checks those hashes, versions, IDs, row membership and wiki
metadata. The output retains complete wiki wikitext, revision IDs and timestamps.
Client descriptions retain their original markup and unresolved placeholders;
they are source evidence, not evaluated damage or level-20 formulas. A missing,
inconsistent or changed input fails verification.

`rune-catalog.json` and `reports/runes.md` are separate from the combat inputs.
Expanding legacy `runes.json` before the new effects are implemented would change
both simulation fingerprints and invalidate all 14,878 pairings in each matrix.

## A page to validate

Save this as `page.json`:

```json
{
  "primaryPathId": 8000,
  "secondaryPathId": 8400,
  "primary": [8010, 9111, 9104, 8299],
  "secondary": [8444, 8453],
  "shards": [5005, 5001, 5001]
}
```

This is Conqueror, Triumph, Legend: Alacrity and Last Stand, with Second Wind and
Revitalize. The shards are attack speed and two scaling-health choices.

Validation requires different primary and secondary paths, one rune from each
primary row, two secondary lesser runes from different rows, and one legal shard
from each shard row. A shard present in two rows can be selected twice. Secondary
selections are normalized into row order. Invalid pages return a nonzero exit
code and explanatory issues. The command explicitly reports
`scope: "structural-only"` and `effectsApplied: false`.

The validator does not apply champion-specific substitutions. The full rules
article preserves those rules, including replacement runes for champions without
mana or particular abilities. A structurally valid page is not proof that the
client will retain every selection for a particular champion and loadout.

## Evidence conflicts and remaining combat work

The pinned rules article gives scaling health as 10 per champion level through
level 20: **200 health at level 20**. The versioned client description says
"10-180 Health". Both are retained. Explicit shard equipment follows the reviewed
wiki formula; the catalog build itself applies no health bonus.

Each additional rune needs its own numeric reads, trigger and timing tests,
interaction checks, and any historical-stack assumptions. Unimplemented
effects are marked as such; they are not declared ineffective in a duel. Triple
Tonic's status means only the existing Udyr-specific support, not a general page
implementation. Later milestones will equip effects, search pages with item
builds, refresh affected pairings and expose the selected pages in the app.

Wiki-derived data follows the [data attribution and license](../../data/README.md).

## Apply partial combat effects in a manual duel

```sh
npm run duel -- Darius Garen --combat-runes 8299,8444 --enemy-combat-runes 8014
npm run duel -- Darius Garen --combat-runes 8017 --enemy-combat-runes 8444 --log brawl
npm run duel -- Darius Garen --combat-runes 8299,8444 --shards 5005,5001,5001
npm run duel -- Darius Yorick --combat-runes 9101,8299
npm run duel -- Garen Darius --combat-runes 9104,8299 --legend-points 950 --enemy-combat-runes 8014,9104 --enemy-legend-points 0
npm run duel -- Darius Garen --combat-runes 9105,8299 --legend-points 1000 --enemy-combat-runes 9104 --enemy-legend-points 0
npm run duel -- Darius Garen --combat-runes 9103,8299 --legend-points 1499 --enemy-combat-runes 9105 --enemy-legend-points 0
npm run duel -- Darius Sion --gold 0 --combat-runes 9111 --log brawl
npm run duel -- Darius Sion --gold 0 --combat-runes 9111,9103 --legend-points 1499 --log brawl
npm run duel -- Gangplank Urgot --dataset 16.21 --gold 0 --combat-runes 8437,8444,8014 --enemy-combat-runes 8437 --log brawl
npm run duel -- Kled Braum --dataset 16.21 --gold 0 --combat-runes 8437,8473 --enemy-combat-runes 8473 --log brawl
npm run duel -- Camille Malphite --dataset 16.21 --gold 0 --combat-runes 8401,8437,8473 --enemy-combat-runes 8401 --log brawl
```

Each combat-rune flag takes comma-separated rune IDs for that side. These twenty effects are
supported as partial manual selections:

| Rune | ID | Implemented rule |
|---|--:|---|
| Press the Attack | 8005 | Three qualified on-hit applications consume stacks for adaptive proc damage (`2960/17` at level 20) and 8% increased champion damage. Four-second stack refresh, six-second proc cooldown and a declared five-second combat clock; event eligibility and timing limits are detailed below. |
| Lethal Tempo | 8008 | Up to six stacks of 6% melee or 4.8% ranged attack speed. Qualifying attacks refresh the six-second timer. An attack made with six stacks already held can launch an adaptive bolt. |
| Conqueror | 8010 | Up to twelve stacks of adaptive force with a five-second refresh. Qualified spell damage gains stacks once every four seconds per cast. At full stacks, eligible damage heals the fighter. |
| Fleet Footwork | 8021 | At 100 Energized charges the next qualified champion hit heals the owner and grants one second of bonus movement speed. Declare starting charges separately for each side. |
| Coup de Grace | 8014 | 8% increased damage to the enemy champion while its health is strictly below 40%. |
| Cut Down | 8017 | 8% increased damage to the enemy champion while its health is strictly above 60%. |
| Last Stand | 8299 | Increased damage to the enemy champion while the owner is strictly below 60% health: rises linearly from the 5% lower endpoint toward 11% as health falls to 30%, then stays at 11%. Exactly 60% health receives no increase. |
| Shield Bash | 8401 | A qualifying champion on-hit deals `560/17` adaptive damage at level 20 plus 2.5% of bonus health and 15% of the strongest eligible shield's peak. Each shield remains eligible for two seconds after it ends. |
| Grasp of the Undying | 8437 | Damage starts a four-stack timer. A qualified champion on-hit consumes the primed charge for magic damage, a delayed heal and permanent bonus health. Ranged applications use 40% effectiveness. |
| Aftershock | 8439 | A qualifying champion immobilization grants 45 plus 75% of each bonus resistance for 2.5 seconds, with independent caps. A 350-unit magic shockwave follows. The cooldown is 20 seconds. |
| Second Wind | 8444 | Positive hostile champion or owned-pet damage to the champion body's health enables ten seconds of bonus regeneration. The model regenerates 0.2% of current missing health at each half-second pulse. |
| Overgrowth | 8451 | Each complete set of eight declared qualifying deaths gives 3 bonus health. At 120, both base and bonus health increase by 3.5%. Each side declares its own starting count. |
| Font of Life | 8463 | A qualifying champion slow or immobilization heals the owner for `930/17` at level 20, multiplied by 0.7 in ranged form. Activation starts a 20-second cooldown even at full health. |
| Bone Plating | 8473 | An opposing champion's first health-damaging packet arms three plates for 1.5 seconds. One later packet per cast can spend a plate for up to `1080/17` reduction at level 20. |
| Absorb Life | 9101 | Heals 27 health at level 20 for each actual hostile combat kill credited to the champion by the engine, subject to standard healing modifiers and caps. |
| Triumph | 9111 | Stores 2.5% maximum HP plus 5% missing HP from the declared native champion-body kill-credit frame; attempts ordinary self healing one second later if the duel is still active and the recipient remains eligible. Sourced 20 gold is economic reference only. |
| Presence of Mind | 8009 | At the fixed model level 20, accepted damage restores 56 mana (44.8 for the current owner's ranged form) or 6 energy on an eight-second cooldown; an actual champion-body kill schedules 15% of the current derived maximum resource one second later. Local policies and unsupported events are detailed below. |
| Legend: Alacrity | 9104 | 3% bonus attack speed plus 1.5 percentage points per completed 100-point stack, capped at ten stacks (18%). Requires declared starting points; actual champion-body kills add 100 points. |
| Legend: Haste | 9105 | 1.5 basic ability haste per completed 100-point stack, capped at ten stacks (15). Zero starting points grant zero haste. Requires declared starting points; actual champion-body kills add 100 points. |
| Legend: Bloodline | 9103 | 0.45% life steal per completed 100-point stack, capped at fifteen stacks (6.75%); a one-time direct 85 bonus-health award only at 1,500 points. Requires declared starting points; actual champion-body kills add 100 points. |

The three Precision health-damage runes occupy the same source-defined row, so select at most
one of them. Alacrity, Haste and Bloodline occupy the same Legend row, so select
at most one of those three. Presence of Mind, Triumph and Absorb Life share
Precision's first lesser row, so select at most one of `8009`, `9111` and `9101`.
Choose at most one keystone per fighter. Press the Attack, Lethal Tempo,
Fleet Footwork and Conqueror can accompany one first-row choice, one Legend
and one of the three damage runes. Shield Bash and Font of Life share
Resolve's first lesser row. Either choice can accompany Second Wind or Bone Plating.
Overgrowth occupies the final Resolve row. Select up to two Resolve lesser
rows with a Precision keystone. All three lesser rows fit a primary Resolve
page. Grasp and Aftershock each require Resolve primary and can accompany up to two Precision
lesser runes from different rows. Only the explicitly named effects
are equipped; a legal completion does not activate its filler choices. Presence and
Triumph have no history flag; a selected Legend still requires that side's
explicit `--legend-points` or `--enemy-legend-points`, including zero. No pre-duel
Presence or Triumph entitlement is inferred. Presence requires an explicit
Mana or Energy resource type and rejects other types without substituting
Triumph; complete-page automatic substitutions remain unfinished.
Unknown or unimplemented IDs, duplicates and selections that cannot fit a legal page fail. The validator may
use other runes to prove page compatibility, but those fillers are never equipped.
Omitting a side's flag applies none of these optional effects to that side. This
does not remove Udyr's existing separately configured Triple Tonic behavior.

Combat-rune flags support plain-stat duels, including `--log` and `--sweep`, and
can accompany explicit stat shards. They reject fixed item builds and `--search`
until item-amplifier composition and search valuation are reviewed. Each kit
variant receives the correct side's selection before variant comparisons. The
plain-stat allocation remains its no-rune reference; it does not optimize
purchases for the selected effects. These explicit selections are not applied to precomputed
rankings and do not add combat-rune controls to the browser.

The offline compiler checks **120 complete Wiki revisions** in
`data/16.21/rune-combat-sources.json` and the complete versioned CommunityDragon
`perks.cdtb.bin.json`, retained as `data/16.21/rune-game-perks.json`. It checks
full-content hashes, exact revisions and excerpts, binds the twenty templates to
the catalog, and cross-checks numeric rules against frozen normal-mode fields.
Font of Life adds its complete article and template plus the slow and drowsy rules.
Aftershock adds its complete article and template, plus control, armor,
magic resistance, range and spell shield rules, to the previous 109.
Overgrowth adds its complete article and template to the previous 107.
Shield Bash adds the rune article, template, Shield rules, and five reviewed
ability revisions to the previous 99.
Bone Plating adds the complete rune article, template and two reviewed ability
revisions to the 95 already retained.
Grasp adds the complete rune article, template and three reviewed ability
revisions to the 90 already retained. Conqueror adds eight complete sources to
the 82 retained for Lethal Tempo.
Lethal Tempo adds the complete rune article and template to the 80 Fleet
Footwork pages.
Fleet Footwork adds nine complete revisions to the 71 in the Press the Attack release.
At the Presence release, sixteen complete direct dependencies were added while preserving all 47
previous objects and the frozen client descriptor. Twenty-five directly used
pinned complete Wiki revisions were independently re-fetched on 13 November
with matching metadata and content. The full frozen 2,177,672-byte client
remains SHA-256
`f0212502bb1180c0920a1be7074af8de2e6d4cefe3fc51f2a0ca9e08116a2c9f`.
A separately retained complete mutable response differs only in Electrocute's
VFX record; the three directly relevant Presence records match the frozen
objects. This does not replace the frozen client or claim a fresh 13 November
whole-client fetch. Historical Legend and Triumph sections below retain the
bundle counts and validation evidence of their own releases.
Cut Down's obsolete health-difference fields are retained as source data but
are not used for its current 8% rule.

Compatibility limits remain explicit:

- Health conditions use each damage packet's pre-hit health. A hit that first
  crosses Coup de Grace's threshold is not retroactively amplified. Owned-pet
  damage uses the owner's health for Last Stand, while damage to pets does not
  receive these champion-target amplifiers.
- Health-amplifier and Second Wind recipients must be the actual champion body:
  clone and pet targets do not receive these amplifiers or their own Second Wind regeneration. Owned-pet
  damage sources do count. The reviewed pages do not establish full clone
  eligibility, which remains outside this partial implementation.
- The three health-threshold runes amplify eligible champion true damage under
  the retained V25.S1.3 rule, excluding exact `Smite` and `Ignite` labels.
  Press the Attack follows its current specific history and excludes exact
  `Smite`, allowing `Ignite`; it does not inherit the health-rune exclusion.
  This is not a general summoner
  or jungle-damage implementation; those modes need explicit classifications.
- Outgoing increases share the engine's additive `damageDealt` bucket. The
  pinned V26.09 note also specifies separate amplifier damage instances, which
  this aggregate model does not represent. Interactions with pre-modifier
  mechanics such as Illaoi E and Zed R therefore remain approximations. The
  engine's existing flat-reduction and victim-hook order is retained rather
  than independently established by these rune sources. If an existing
  outgoing multiplier is nonpositive and the rune would restore positive
  damage, the adapter rejects that unsupported case rather than dropping the
  amplification silently.
- Second Wind's HP5 formula and general half-second regeneration cadence are
  sourced. Sampling current missing health at each pulse, placing the first
  pulse half a second after the trigger, and refreshing duration without
  postponing the active clock are model interpretations, not measured live-game
  timing. Shield-only, zero and invulnerable damage do not trigger it. It uses
  regeneration rather than a heal event, respects the existing regeneration
  modifiers, and clears when the champion is dead or fallen.

Full pages, the remaining keystones and historical-state effects, champion-specific
substitutions, item compatibility, separate amplifier packets and automatic rune
selection require further implementation and validation. These twenty catalog entries are
marked `manual-effects`; that status identifies this limited manual interface,
not complete rune-page fidelity.

### Font of Life

Select `8463` for either side of a manual plain-stat duel. An accepted
immobilization or positive slow from the owner's champion body against
the opposing champion triggers an immediate self-heal. The heal is
`930/17` in melee form and 70% of that in ranged form at model level 20.
It uses ordinary healing modifiers and caps. The 20-second cooldown
starts even at full health. Corki's live rune page substitutes Demolish.
[Rune template](https://wiki.leagueoflegends.com/en-us/?oldid=3996429) · [Rune article](https://wiki.leagueoflegends.com/en-us/?oldid=4015111)

```bash
npm run duel -- Ashe Nasus --dataset 16.21 --gold 0 --combat-runes 8463 --enemy-combat-runes 8463 --log brawl
```

When drowsiness gradually gains strength, the heal triggers at the first
positive slow seen in upkeep. Slow immunity can suppress that component
while the later sleep still qualifies. This manual mode simulates the
owner heal. The source also heals a nearby ally within 1,000 units in a
team setting. [Slow rules](https://wiki.leagueoflegends.com/en-us/?oldid=4060507) · [Drowsy rules](https://wiki.leagueoflegends.com/en-us/?oldid=3308207) · [Open mechanics questions](MECHANICS_GAPS.md#font-of-life)

### Aftershock

Select `8439` for either side of a manual plain-stat duel. The opposing
champion must accept a native immobilization from the rune owner's champion
body. Displacement immunity prevents activation even when a root applies.
The sourced Yorick substitution requires selecting Grasp explicitly in the
manual duel. [Rune article](https://wiki.leagueoflegends.com/en-us/?oldid=4023199) · [Immobilization rules](https://wiki.leagueoflegends.com/en-us/?oldid=4060567)

```bash
npm run duel -- Leona Malphite --dataset 16.21 --gold 0 --combat-runes 8439,8451 --overgrowth-deaths 120 --enemy-combat-runes 8439 --log brawl
```

Activation grants 45 plus 75% of each current bonus resistance for 2.5
seconds, with each grant capped independently at `2690/17` at model level
20. The model floors each bonus input at zero and starts the 20-second
cooldown when the control applies. The two grants retain their original
values through the window. [Rune template](https://wiki.leagueoflegends.com/en-us/?oldid=4022990) · [Armor](https://wiki.leagueoflegends.com/en-us/?oldid=4073057) · [Magic resistance](https://wiki.leagueoflegends.com/en-us/?oldid=4073058)

At expiry, the magic shockwave uses the then-current bonus health and the
distance between champion centers. It deals `2230/17` plus 8% of bonus
health before mitigation within 350 units. The separate damage instance can
spend Bone Plating and passes ordinary spell shields. Death, a fallen state
or attackable resurrection cancels a pending shockwave under the model's
lifecycle policy. [Range rules](https://wiki.leagueoflegends.com/en-us/?oldid=4058499) · [Spell shield rules](https://wiki.leagueoflegends.com/en-us/?oldid=3981674) · [Open mechanics questions](MECHANICS_GAPS.md#aftershock)

### Overgrowth

Use `--overgrowth-deaths` and `--enemy-overgrowth-deaths` for the sides that
select `8451`. Give each selected side a nonnegative whole count, including
explicit zero. The count represents pre-duel qualifying deaths and stays
fixed during the simulation.

```bash
npm run duel -- Vladimir Pyke --dataset 16.21 --gold 0 --combat-runes 8451 --overgrowth-deaths 120 --enemy-combat-runes 8451 --enemy-overgrowth-deaths 119 --log brawl
```

Every eight qualifying deaths grant 3 flat bonus health. At 119 deaths this
is 42 bonus health. At 120 deaths it rises to 45 and multiplies effective
base and bonus health separately by 1.035. Bonus-health ratios use the boosted
bonus pool. The multiplier also applies to later permanent health gains.
The 1,400-unit range, direct vision and dead-owner progression describe
the source game rules for the supplied starting history. [Rune template](https://wiki.leagueoflegends.com/en-us/?oldid=3825902) · [Rune article](https://wiki.leagueoflegends.com/en-us/?oldid=4002405) · [Versioned client](https://raw.communitydragon.org/16.21/game/perks.cdtb.bin.json)

The rune installs its health before the kit's setup callback. Pyke
converts the gain into attack damage. Ornn's bonus-health conversion
applies to the flat award before the percentage. Permanent health gains
apply directly to current health by the scaled amount, subject to the
simulator's existing caps and death-state rules. [Pyke's Gift of the Drowned Ones](https://wiki.leagueoflegends.com/en-us/?oldid=4007005) · [Ornn's Living Forge](https://wiki.leagueoflegends.com/en-us/?oldid=4089066) · [Health rules](https://wiki.leagueoflegends.com/en-us/?oldid=4073062)

The simulator applies Kled's base-health percentage to his own pool and
Skaarl's base pool, with the bonus-health portion on Skaarl. Vladimir's
conversions keep their existing nonrecursive contract. These ordering
choices await controlled live checks. [Open mechanics questions](MECHANICS_GAPS.md#overgrowth)

### Shield Bash

Select `8401` on either side of a manual plain-stat duel. A qualifying
champion on-hit deals adaptive damage equal to `560/17` at level 20 plus
2.5% of the owner's bonus health and 15% of the strongest eligible shield
peak. The level-20 value follows the explicit Wiki interpolation. The
versioned client's named fields give the formula's endpoints of 5 and 30,
both ratios, and the two-second grace period. [Rune template](https://wiki.leagueoflegends.com/en-us/?oldid=4044093) · [Rune article](https://wiki.leagueoflegends.com/en-us/?oldid=4015237) · [Versioned client](https://raw.communitydragon.org/16.21/game/perks.cdtb.bin.json)

Ordinary, magic and physical health shields qualify. The simulator keeps
each shield's original amount or highest subsequent amount until the
shield ends and for two seconds after expiry, depletion, replacement or
removal. The strongest eligible shield supplies the ratio when multiple
shields overlap. The proc spends eligibility for all shields granted before
the native on-hit snapshot. Later growth of those spent shields keeps their
spent status. Shields issued after the snapshot can arm a later hit.
[Shield rules](https://wiki.leagueoflegends.com/en-us/?oldid=4021810) · [Hwei's Pool of Reflection](https://wiki.leagueoflegends.com/en-us/?oldid=3992645)

The model uses the actual owner and opposing champion bodies. It preserves
eligibility through a denied or protected contact and clears eligibility
on death, falling or resurrection. The proc uses current derived bonus AD
versus AP, the champion's tie preference, and the native on-hit
effectiveness. It deals a separate proc packet outside the spell-hit and
life-steal paths. The eligibility snapshot, stat sampling and exact expiry
boundary are simulator policies. [Open mechanics questions](MECHANICS_GAPS.md#shield-bash)

### Bone Plating

Select `8473` on either side. Each duel starts with the rune available. The
first positive health loss dealt by the actual opposing champion arms it
for 1.5 seconds. The triggering packet keeps its normal damage. The rune
stays available after zero, shield-only or invulnerable damage.

Each of the next three distinct opposing cast instances can spend one plate.
A later packet of the triggering cast can spend a plate, as with Kled's
fourth W attack. The level-20 reduction is `30 + (60 − 30) × 19 / 17`, or
about 63.53 damage per plate. The Wiki extends the formula to level 20.
The versioned client supplies the interpolation endpoints, three charges,
1.5 seconds and a 55-second cooldown. [Rune template](https://wiki.leagueoflegends.com/en-us/?oldid=3985159) · [Rune article](https://wiki.leagueoflegends.com/en-us/?oldid=4072632) · [Versioned client](https://raw.communitydragon.org/16.21/game/perks.cdtb.bin.json)

Plates reduce post-mitigation damage, including true damage. The simulator
applies the reduction after pre-damage reactions and before ordinary shield
absorption. Braum's complete frontal block can reduce a packet to zero
before the rune sees it. Native attacks, missiles, delayed and periodic
effects retain their cast identity. The manual effect uses actual champion
bodies and requires a native cast ID to spend a plate. [Braum's Unbreakable](https://wiki.leagueoflegends.com/en-us/?oldid=4012056) · [Kled's Violent Tendencies](https://wiki.leagueoflegends.com/en-us/?oldid=4072987)

The window ends as soon as the third plate is spent or at 1.5 seconds.
The model starts the 55-second cooldown at that endpoint and treats the
exact expiry tick as inactive. The exact ready tick can arm it again.
Resurrection, falling or counted death end the active plates and preserve
the scheduled readiness. These timing and shield-order choices are local
model policies. [Open mechanics questions](MECHANICS_GAPS.md#bone-plating)

### Grasp of the Undying

Select `8437` for either side of a manual plain-stat duel. Each side starts
with zero stacks and zero prior Grasp health.

| Effect at consumption | Melee | Ranged |
|---|---:|---:|
| Raw magic damage | 3.5% maximum health | 1.4% maximum health |
| Raw self-heal | 1.3% maximum health | 0.52% maximum health |
| Permanent direct bonus health | 5 | 2 |

- Qualifying damage starts a three-second charging window. The first stack
  matures after one second and later stacks follow at one-second intervals.
  Qualifying damage renews the window. Four stacks prime an on-hit for five
  seconds. Damage can renew this primed window. A charging pulse at its
  deadline counts. Primed stacks expire before contacts on the exact expiry
  tick. The first-stack phase, primed refresh and equality boundaries are
  declared simulator policies. [Rune template](https://wiki.leagueoflegends.com/en-us/?oldid=4058228) · [Rune article](https://wiki.leagueoflegends.com/en-us/?oldid=4052352)
- Accepted champion damage includes zero and shielded damage. Positive damage
  to classified enemy minions, monsters, champion-class summons and turrets
  can also charge it. Ordinary pet damage can credit the owner. A hostile
  clone's hit can charge its victim's rune and belongs to the clone on the
  outgoing side. The clock tracks damage events. [Combat status](https://wiki.leagueoflegends.com/en-us/?oldid=4058480)
- An unblocked, unprotected native on-hit from the owner against the opposing
  champion body consumes the charge. Gangplank's Parrrley uses ranged values.
  The separate magic proc keeps full value on fractional on-hit applications
  such as Azir's primary soldier and Urgot's Purge. [Rune article](https://wiki.leagueoflegends.com/en-us/?oldid=4052352) · [Parrrley](https://wiki.leagueoflegends.com/en-us/?oldid=4063653) · [Arise!](https://wiki.leagueoflegends.com/en-us/?oldid=4044339) · [Purge](https://wiki.leagueoflegends.com/en-us/?oldid=4058781)
- Damage and the pending heal share a maximum-health and form sample taken
  before the award. The direct award applies at contact. It follows the same
  Ornn and Pyke conversions and Kled and K'Sante health boundaries as other
  direct bonus health. The heal uses ordinary modifiers and caps twelve ticks
  after contact, based on the client's 0.4-second missile flight. The model
  uses a local schedule for the heal and the award. [Health](https://wiki.leagueoflegends.com/en-us/?oldid=4073062) · [Patch 26.21 client data](https://raw.communitydragon.org/16.21/game/perks.cdtb.bin.json)

The model covers actual champion-body procs. Live timing, clone consumption,
unclassified targets and pre-duel stacking need further validation.
[Mechanics gaps](MECHANICS_GAPS.md#grasp-of-the-undying)

### Conqueror

Select `8010` for either side of a manual plain-stat duel. Each fighter starts
with zero stacks. The duel log records each increase.

```sh
npm run duel -- Garen Mordekaiser --dataset 16.21 --gold 0 --combat-runes 8010 --enemy-combat-runes 8010 --log brawl
```

- A qualified basic application normally grants two stacks in melee form or
  one in ranged form. A connected basic attack that is blocked still grants
  stacks. Blinds, dodges, parries and invulnerability prevent the
  corresponding trigger. A positive spell or source-qualified non-basic
  packet grants two stacks per cast, with another gain available four seconds
  after that cast last gained stacks. Repeated eligible damage refreshes the
  five-second timer between these gains in the duel model. Due stacks expire
  before contacts on the same tick. [Rune template](https://wiki.leagueoflegends.com/en-us/?oldid=4060685) · [Rune notes](https://wiki.leagueoflegends.com/en-us/?oldid=4091967)
- At level 20 each stack grants `362/85` adaptive force. The model compares
  plain-stat purchases and shard bonuses and uses the fighter’s recorded
  adaptive type on a tie. Each point becomes 0.6 bonus AD or 1 AP. The stat
  updates when stacks change or the fighter changes form.
  [Rune template](https://wiki.leagueoflegends.com/en-us/?oldid=4060685) · [Adaptive force](https://wiki.leagueoflegends.com/en-us/?oldid=4063874)
- With twelve stacks already held, the fighter heals for 8% in melee form
  or 5% in ranged form from eligible champion damage. The duel uses the
  native post-mitigation packet amount, including shield absorption and
  before health floors and overkill. Ordinary healing modifiers and caps
  apply. [Rune template](https://wiki.leagueoflegends.com/en-us/?oldid=4060685) · [Healing](https://wiki.leagueoflegends.com/en-us/?oldid=4041638)
- Azir’s soldier contact, Ezreal Q and Miss Fortune Q grant two stacks.
  Smolder Q, Urgot’s Purge and Gangplank’s ranged on-hit application use
  one. Reviewed melee basic-damage abilities include Fiora Q, Viego R,
  Volibear W, Warwick Q and the on-hit pulses of his R, and Yasuo and
  Yone’s primary Q contacts. Kayle’s modeled fire wave shares
  her ranged attack’s application. Master Yi’s Alpha Strike marks share
  one cast. Garen and Wukong gain two stacks per eligible spin in the
  model. Mordekaiser’s Q or E can carry its cast identity into Darkness Rise.
  [Rune notes](https://wiki.leagueoflegends.com/en-us/?oldid=4091967)
- Reviewed native attacks from Elise’s spiderlings, Heimerdinger’s regular
  turret, Shaco’s regular box, Yorick’s Mist Walkers and Zyra’s plants use
  non-basic pet damage classification. The next attack from a Mist Walker
  that leaped shares Mourning Mist’s cast. Daisy gives one stack from
  Ivern’s on-hit exception. [Damage tags](https://wiki.leagueoflegends.com/en-us/?oldid=4084890) · [Rune notes](https://wiki.leagueoflegends.com/en-us/?oldid=4091967)

The partial model tracks native and reviewed deliveries to the opposing
champion body. Unclassified custom packets, some periodic sources and clone
credit need further review. [Mechanics gaps](MECHANICS_GAPS.md#conqueror)

### Lethal Tempo

Select rune `8008` for either side of a manual plain-stat duel. Each selected
fighter begins with zero stacks. The duel log labels delivered bolts
“Lethal Tempo”.

```sh
npm run duel -- Lucian Sion --dataset 16.21 --gold 0 --combat-runes 8008 --enemy-combat-runes 8008 --log brawl
```

- Completing an eligible basic attack windup against an opposing champion or
  classified champion clone grants one stack, up to six. The model also
  grants a stack on each accepted contact from a source-qualified attack
  replacement. Canceled windups, vanished targets and protected targets at
  launch give no stack. A completed windup still counts when the target
  subsequently blocks the basic hit. Each gain refreshes the six-second timer.
  At expiry one stack drops immediately, followed by one every 0.3 seconds.
  The duel expires due stacks before processing an attack on the same tick.
  [Rune template](https://wiki.leagueoflegends.com/en-us/?oldid=4065934) · [Attack effects](https://wiki.leagueoflegends.com/en-us/?oldid=4084301) · [Riot 14.20 notes](https://www.leagueoflegends.com/en-us/news/game-updates/patch-14-20-notes/)
- Each held stack grants 6% bonus attack speed in melee form or 4.8% in ranged
  form. Form changes immediately update all held stacks, including Jayce’s
  Hammer and Cannon. Attacks follow the simulator’s configured attack speed
  limits. Garen’s Judgment spin count excludes rune attack speed.
  [Rune article](https://wiki.leagueoflegends.com/en-us/?oldid=4060427) · [Garen sources](../../data/16.21/kits/Garen.md)
- The model requires six stacks before a qualifying attack to launch a bolt,
  so the first bolt can launch on the seventh event. The sources leave the
  sixth-attack ordering open. Each level-20 bolt starts at `552/17` melee or
  `46023/2125` ranged. It increases by 1% for each percentage point of current
  uncapped bonus attack speed, including the rune’s own stacks. The reviewed
  calculations apply ranged multipliers of `0.8` to stack speed and `0.667` to
  base bolt damage. The frozen client’s ranged display fields give 4% and
  6–24 damage. [Rune template](https://wiki.leagueoflegends.com/en-us/?oldid=4065934) · [Rune article](https://wiki.leagueoflegends.com/en-us/?oldid=4060427)
- At launch the bolt samples the current form, bonus attack speed, and the
  higher of bonus AD and AP. A tie uses the champion’s recorded adaptive type.
  Its separate proc damage resolves against the opponent’s current defenses
  on arrival. The four retained client bolt objects use a nontracking spline
  at 2,500 units per second. The duel uses a one-dimensional path to the launch
  endpoint and requires the champion’s hitbox to cover that point on arrival.
  Walls, interception and target protection can prevent delivery. The bolt
  leaves the target’s spell shield intact and triggers no spell or on-hit
  effects. Bolts target the opposing champion body, and pending bolts resolve
  only during an active duel. [Adaptive damage](https://wiki.leagueoflegends.com/en-us/?oldid=4015091) · [Rune article](https://wiki.leagueoflegends.com/en-us/?oldid=4060427) · [Mechanics gaps](MECHANICS_GAPS.md#lethal-tempo)
- Akshan, Lucian and Master Yi can stack with their reviewed passive extra
  strikes. Zeri’s Burst Fire stacks on its first accepted primary round, once
  per burst. Azir’s soldier command grants a stack and personal attacks can
  fire the bolt. Graves’ shotgun counts once at the end of its windup.
  The simulator applies one full stack to an accepted positive
  hit share, and applies that share and the ability’s reviewed on-attack damage
  ratio to the bolt. Urgot’s Purge uses 50%, Katarina’s Death Lotus uses 35%,
  and Bel’Veth’s Royal Maelstrom uses 12–24% by slash. [Attack effects](https://wiki.leagueoflegends.com/en-us/?oldid=4084301) · [Zeri sources](../../data/16.21/kits/Zeri.md) · [Azir sources](../../data/16.21/kits/Azir.md) · [Graves sources](../../data/16.21/kits/Graves.md)

The 19 November refresh recomputed all 14,878 pairings in each default
matrix. The audit verified all 29,756 pair results against the generated data
and confirmed that both matrices match the previously published results.
[Accuracy log](../../ACCURACY.md#lethal-tempo-18-november-2026)

### Fleet Footwork

Use `--energized-charges` for your fighter and `--enemy-energized-charges` for
the opposing fighter. Each side selecting Fleet must declare its own starting
pool as a decimal from 0 through 100, including an explicit zero. In this
example Lucian enters the fight fully charged and Sion starts empty.

```sh
npm run duel -- Lucian Sion --dataset 16.21 --gold 0 --combat-runes 8021 --energized-charges 100 --enemy-combat-runes 8021 --enemy-energized-charges 0 --log brawl
```

The model gains one charge per 24 units of actual movement, including dashes,
blinks and displacement. It sums each observed segment so a round trip can earn
charges even if the champion returns to its starting position. Completing a
basic attack windup that triggers on-attack effects grants six charges. Each
accepted on-hit from a marked ability also grants six. Other eligible basic
strikes can spend an existing pool. [Energized notes](https://wiki.leagueoflegends.com/en-us/?oldid=4064669)

At 100 charges an eligible, unblocked hit on the opposing champion body spends
the pool. At level 20 the melee heal is `124257/680 + 0.10 × bonus AD + 0.05 × AP`,
about 182.73 base HP. Ranged champions receive 60% of that total. Bonus movement
speed lasts one second and is 20% for melee or 15% for ranged. Healing uses
the simulator’s ordinary modifiers and health cap. A full-health owner can
still spend charges and receive the speed buff. [Fleet template](https://wiki.leagueoflegends.com/en-us/?oldid=4051351)

The duel uses the current pool, form and stats when contact resolves. For example,
a melee champion starting at 94 charges can gain six on its first windup, then
spend all 100 when that attack hits. Exact threshold ordering, fractional charges,
immediate healing and reduced-effectiveness ability interactions are simulator
choices. The manual implementation covers champion-body targets. The source’s
15% healing against minions is retained for reference. Shared Energized items,
complete rune pages and browser combat-rune selection remain open work.
[Mechanics gaps](MECHANICS_GAPS.md#fleet-footwork)

The champion-specific rules include these cases.

- Zeri’s Living Battery zap leaves the pool alone. The first accepted primary
  Burst Fire round gains six charges. It can spend charges that were already
  full. If that round fills the pool, a later accepted primary round from the
  same burst can spend it. [Zeri sources](../../data/16.21/kits/Zeri.md)
- Azir’s soldier command gains six at windup completion. The soldier’s stab
  leaves the pool available for Azir’s next eligible personal attack.
  [Azir sources](../../data/16.21/kits/Azir.md)
- Aphelios gains six on each accepted Severum Onslaught attack. A Calibrum mark
  attack gains six at its issued windup. The Moonlight Vigil follow-up can
  spend an existing full pool without gaining charges.
  [Aphelios sources](../../data/16.21/kits/Aphelios.md)
- Akshan’s and Lucian’s passive second shots and Master Yi’s Double Strike
  second hit gain six on accepted contact in this model.
  [Akshan sources](../../data/16.21/kits/Akshan.md) · [Lucian sources](../../data/16.21/kits/Lucian.md) · [Master Yi sources](../../data/16.21/kits/MasterYi.md)

### Press the Attack: first keystone and declared event policies

Implementation began on **17 November 2026**, after the merged Presence of Mind
release. Rune **8005** is the eleventh partial manual effect and the first
Precision keystone. The 17 November refresh computed all 14,878 pairings in
each default matrix, with zero reuse. The audit verified every new checkpoint
against both matchup directions. Scores, scenarios, variants, builds and stat
allocations matched the previous baseline. [Workflow run](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/44141258128)

The complete [PTA template 4015574](https://wiki.leagueoflegends.com/en-us/?oldid=4015574)
gives three on-hit stacks, a refreshed **four-second** stack window, a
**six-second cooldown after consumption**, adaptive proc damage and **8%**
increased damage against champions. Its explicit expression
`40 + (160 - 40) / 17 * (level - 1)`, listed for levels 1–20, gives
**`2960/17 = 174.11764705882354` at level 20**. The frozen client's named
`MinDamage=40` and `MaxDamage=160` fields contain no detailed level calculation
or hidden-script cap proof. This documentation-supported arithmetic is the
chosen fixed-level model; it is not a live level-20 measurement.

The complete [PTA article 4082445](https://wiki.leagueoflegends.com/en-us/?oldid=4082445)
distinguishes each actual on-hit application from an attack declaration or its
split damage packets. Multiple applications within one issued attack can add
multiple stacks. AoE on-hits are excluded except Azir W, and the article gives
specific secondary-target and Twitch R exceptions. Eligibility is recorded in
typed kit metadata and native custom-contact adapters, rather than inferred
from an ability's display name or a bare `appliesOnHit` flag. Unclassified
ability contacts are outside this partial effect.

The optional source-side native event captures immutable tick, sequence,
source/target body identity, ability flags, block state and scale before legacy
callbacks. Dispatch follows the existing on-hit/victim callback phase. Connected
damage-blocked contacts can qualify; blind, dodge, parry and whole-hit spell
shields follow their native acceptance guards, with explicit source-specific
exceptions such as Senna Q retained. Renekton explicitly declares two
or three W strike applications, but other attached on-hit effects retain their
existing once-per-attack approximation. This shared-tick event model does not
establish complete per-strike item or live callback ordering.

Reviewed ability-on-hit metadata opts in Akshan E shots; Bel'Veth Q; Briar Q;
Elise spider Q; Evelynn ordinary E; Ezreal Q, Fiora Q, Fizz Q, Gangplank Q,
Irelia Q and Katarina E; Miss
Fortune Q and its bounce; Smolder primary Q; Urgot W; Viego R; Volibear W;
Warwick Q and strong R; and Yasuo/Yone Q and Q3. Explicit exclusions include
Evelynn empowered E, Katarina passive/R, Smolder splash/bolt branches and
Galio's internal replacement smash event, whose outer basic remains eligible.
The source-qualified declaration metadata does not create missing kit effects.

| Custom native path | Coverage and remaining qualification |
|---|---|
| Master Yi Double Strike | Captures its second actual application before its custom damage/on-hit packets and dispatches after legacy incoming-on-hit callbacks. Alpha Strike remains excluded. |
| Renekton W | Declares two or three sourced strike applications. Rune events are distinct; other attached on-hits still execute once under the existing approximation. |
| Senna Q | Captures the declared primary target; area secondary contacts are excluded. The source-specific spell-shield exception is preserved. Delivery follows attached on-hit effects, the legacy incoming-on-hit callback and relic/soul/refund follow-ups. |
| Bel'Veth E | Captures each manually delivered slash before its packets and Feast callbacks. A conservative local guard requires a living target outside stasis, untargetability, parry and dodge; connected damage blocks qualify. Exact E dodge parity and the existing Feast guard gaps remain unmeasured. |
| Twitch R | Retains the declared target at bolt launch, then marks collateral contacts ineligible even if a pet intercepts first. The retained [R template 4063223](https://wiki.leagueoflegends.com/en-us/?oldid=4063223) classifies non-targeted damage as AoE for PTA. |
| Existing routed basics | Lucian's repeated shots, Azir's first soldier stab, Aphelios follow-up attacks, Graves's first pellet per victim and Zeri's first packet per first victim retain their native application paths. |

Nocturne passive secondary on-hits, Yunara Q spread and Kayle E secondary splash
are already omitted native kit mechanics; their PTA interactions are not
claimed. One-dimensional targeting and all other existing kit assumptions
remain in force.

Stacks and amplification belong to the actual living champion body against the
single actual opposing champion body. Same-body forms retain primitive state,
which copies independently with a branched world. Stack expiry is inclusive at
120 ticks; cooldown readiness is inclusive at 180 ticks after consumption,
without ability haste. These equality boundaries and the post-on-hit phase are
explicit local policies. Actors classified as pets/clones do not stack it; pet/clone victims
do not receive the bounded amplifier, and clone-victim reset behavior is
unsupported. Dead bodies immediately stop stacking and amplification; the first
dead-body upkeep clears stacks and buff state. Post-death stacking,
lethal/reflection priority and complete protected-state parity remain
unmeasured; a rune timer never prolongs an ended duel.

New amplification excludes the **whole activation simulation tick (30 Hz)**.
The third hit, triggering proc and other same-tick packets do not gain the new
8%. A later proc while amplification is already active keeps its original
activation tick and can be amplified. This is a local mapping of the source's
same-frame rule, not measured game-frame equivalence. The proc is separate from
ability-hit hooks and ignores partial on-hit effectiveness such as Urgot W's
scale. Amplification follows PTA's current V25.S1.3 true-damage history: exact
`Smite` is excluded, while `Ignite` is not excluded by this adapter.

The [adaptive-damage template 4015091](https://wiki.leagueoflegends.com/en-us/?oldid=4015091)
compares bonus AD with AP and uses the champion's adaptive type on a tie. The
model samples **current derived bonus AD and AP at proc delivery**, carrying the
source champion's `Physical`/`Magic` tie type through every form. No adaptive
shard is required. The separate adaptive-force stat-origin rules and start-time
shard selector are not transferred to this damage decision; dynamic sampling
and stat-origin inclusion remain declared model choices.

The [Combat status article 4058480](https://wiki.leagueoflegends.com/en-us/?oldid=4058480)
includes damage, zero-damage events and CC, distinguishes independent clones,
and says ordinary pets can put their owner in combat. This effect uses **one
five-second / 150-tick clock since the last qualified accepted activity**,
including connected eligible on-hits even when their damage is blocked. Own
or hostile ordinary pet-to-champion activity can refresh it; events classified as actual clone actors do not.
Expiry is checked before a late event refreshes the clock, so expired amplification is not revived. The
acquired combat wording and two named five-second client fields do not prove
two consecutive clocks; this chosen interpretation does not add ten seconds.

The new activity surface is bounded by native accepted damage/CC paths.
Accepted zero raw damage is observable; spell-shield-prevented effects are
excluded. Native invulnerability, stasis and parry guards, pet-victim pipelines
and source-specific modern combat exceptions remain outside its parity claim.
Owner-emitted effects with an unmarked causal clone origin cannot establish
universal clone attribution. Ordinary pet activity refresh does not imply pet
or clone inheritance of the damage amplifier: this partial amplifier applies
to actual living champion-body source damage only.

A shared pure outgoing-rune resolver sums PTA and compatible health-rune
increases before one target-qualified adapter, avoiding multiplicative cross
terms between selected rune amplifiers. It shares the engine's existing
additive outgoing bucket. The retained [Damage modifier article 4050138](https://wiki.leagueoflegends.com/en-us/?oldid=4050138)
is marked outdated; its V26.09 note describes separate amplifier instances.
Those separate instances and interactions with pre-modifier mechanics are not
implemented by this aggregate approximation. Existing item raw hooks retain
their own composition, so manual combat-rune flags still reject fixed items
and build search. Full pages, the remaining keystones, browser effect controls,
item/rune composition and rune-aware allocation/search remain unfinished.

The Press the Attack release retained **71 complete page objects**, preserving all 63
previous objects and adding eight full pages. The thirteen-page preparation
also reuses retained Rune, Damage, Damage modifier, Champion summoned units and
Unit revisions. Two whole-client refetch attempts on 14 November failed
**HTTP 522**; the first has no separately retained full response body or
headers. The complete frozen 2,177,672-byte client remains SHA-256
`f0212502bb1180c0920a1be7074af8de2e6d4cefe3fc51f2a0ca9e08116a2c9f`.
The retained Precision style, PTA main record and six VFX records match that
frozen file. No successful fresh whole-client equality or live-game test is
claimed. VFX identities are not executable spell-script proof.

Commands for the partial manual selection:

```sh
npm run duel -- Lucian Sion --dataset 16.21 --gold 0 --combat-runes 8005 --log brawl
npm run duel -- Sion Lucian --dataset 16.21 --gold 0 --enemy-combat-runes 8005 --log brawl
npm run duel -- Lucian Sion --dataset 16.21 --gold 0 --combat-runes 8005,9111,9104,8014 --legend-points 0
```

PTA needs no history flag; a selected Legend still requires its own side's
explicit starting points. The page validator enforces primary-only keystones
and one choice per row. Only explicitly selected effects are equipped. Stat
shards, side-specific selections, variant comparison, logs and gold sweeps
retain the manual plain-stat interface; its allocation remains the no-rune
reference. The accuracy log records verification of the source and published matchup results.
[Accuracy log](../../ACCURACY.md#press-the-attack-eleventh-partial-manual-effect-17-november-implementation)

### Presence of Mind: level-20 restoration and local validation

Implementation began on **13 November 2026**, following the retained 11–12
November source audit and design. The local provenance refresh reused all 14,878 pairings per matrix with zero
new computation. The complete default comparison found unchanged result payloads. Local
validation passed 9,510 tests across 269 files, with five existing skips;
pull-request checks run separately against the delivery head.

The complete [template 3985219](https://wiki.leagueoflegends.com/en-us/?oldid=3985219)
and [article 4062635](https://wiki.leagueoflegends.com/en-us/?oldid=4062635), with
the exact 31-entry client table indexed from level zero, give **56 mana at
level 20**, **44.8 for the current owner's ranged form**, or **6 energy**. The
Mana-only ranged factor is 0.8. The detailed curve gives 44 at level 18, 52 at level 19 and 56
at level 20; conflicting named 6–50 endpoint fields and tooltip text remain retained
rather than interpolated or used as a cap. The current effect is flat
restoration, with no retired regeneration pulses or maximum-resource stacks.

An accepted reported packet against the actual opposing champion body must
remove HP or absorb a shield: actual HP loss plus absorption must be positive.
The owner body or an ordinary native owned-pet actor can trigger it, including
a released pet missile after removal. One body-local **eight-second / 240-tick**
cooldown is shared across forms and consumed even at a full pool, before the
resource effect. Ability haste does not scale it. Full-Mana consumption follows
a bug-labelled source note interpreted as cooldown use; full-Energy consumption,
current-form sampling and exact callback phase are explicit model policies.

One actual native champion-body kill schedules **15% of the current derived
maximum Mana or Energy after one second /30 ticks**, capped by the ordinary
resource effect. Native credit establishes the real body kill and tick, not a
resource snapshot. Cap sampling at delivery is an unmeasured local policy;
current Ryze AP-to-Mana and Akali shroud caps are derived then. A changed
resource kind consumes the pending entitlement without transferring it.
No pre-fight, assist, farm or multiplayer queue is inferred.

This is resource restoration, not HP healing or regeneration. Heal amplification,
Grievous Wounds and `noHealing` do not alter its amount. Under the declared
resource policy, living, fallen, counted-dead and ordinary dead recipients can
receive the delayed effect only while the world is already active. The timer
never prolongs an ended duel and restores no HP. Its primitive Unit memory is
retained across same-body forms and copied independently with the world.

The damage arm uses the existing alive/positive-HP observer, which may include
fallen or protected bodies. Ordinary dead/zero-HP damage procs and execute-only
damage observations remain unsupported; an execute can still create the
independent native takedown entitlement. Actual reported clone actors and
clone/pet targets are excluded from this bounded subset. Kit packets with a
causal clone origin can instead report the owner, as Shaco's explosion does;
those packets can qualify without proving universal clone-origin behavior.
Zero-effective parries, general zero-damage events and complete visual-missile
semantics remain qualified. These exclusions and phases are not measured live
rules. The [mechanics gap audit](MECHANICS_GAPS.md) retains the distinctions.

Exact Mana or Energy resource types are required; other types fail without
automatic Triumph substitution. Select only one of Presence, Absorb Life and
Triumph. One Legend is compatible with its side's explicit points; Presence
needs no history flag. Stat shards remain available, while fixed items, build
search, full pages, browser effect controls and rune-aware allocation/search
remain unfinished. Allocation stays at the no-rune reference.

The native CLI checks cover these commands, including resource-limited combat
on either selected side and Mana/Energy bodies with explicit shards:

```sh
npm run duel -- Cassiopeia Sion --dataset 16.21 --gold 0 --combat-runes 8009 --log brawl
npm run duel -- Sion Cassiopeia --dataset 16.21 --gold 0 --enemy-combat-runes 8009 --log brawl
npm run duel -- Cassiopeia Akali --dataset 16.21 --gold 0 --combat-runes 8009 --enemy-combat-runes 8009 --shards 5005,5001,5011 --enemy-shards 5008,5008,5001 --log brawl
npm run duel -- Cassiopeia Sion --dataset 16.21 --gold 0 --sweep --combat-runes 8009,9105 --legend-points 99 --enemy-combat-runes 8009,9104 --enemy-legend-points 199
```

The Cassiopeia/Sion zero-gold comparison gives 26 brawl casts with Presence
versus 24 without it. The swept command preserves the separate declared Legend
history for each budget; its 5,000-gold result differs materially from the same
Legend selections without Presence. Exact model scores and focused-check
receipts are recorded in the [accuracy log](../../ACCURACY.md). These are local
simulator checks, not in-game measurements or complete rune-page validation.

The normal local provenance refresh completed on 13 November, reusing all
14,878 pairings in each matrix with zero new computation. Both ordinary matrix
freshness checks, both TypeScript projects, offline catalog freshness and the
production browser build passed. Independent complete comparison found
unchanged aggregate/scenario scores, variants, raw and decoded builds, item
sets and spending across all 173 champions. Only simulation provenance changed;
all per-pair input keys remain equal. The full local suite passed **9,510 tests
across 269 files**, with five existing skips. No new checkpoints are claimed.
Pull-request checks run separately against the actual delivery head; the
[accuracy log](../../ACCURACY.md) records the local commands and exact proofs.

### Triumph: native credit, delayed healing and full refresh

Implementation began on 11 November 2026. The genuine full matrix refresh,
checkpoint audit and core release checks completed that day; default result
payloads are unchanged. Final delivery CI is tracked in [PR #26](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/pull/26).
The source, native-credit, champion and CLI checks establish their stated local
contracts; no live-game measurements were made.

The complete [Triumph template 3825924](https://wiki.leagueoflegends.com/en-us/?oldid=3825924)
and [article 3980916](https://wiki.leagueoflegends.com/en-us/?oldid=3980916),
corroborated by the frozen client fields, give the Summoner's Rift heal as
`0.025 × maximum HP + 0.05 × missing HP`, delayed one second. The article explicitly
uses missing HP at takedown. Its short client description omits the maximum-HP
term; alternative-mode overrides do not replace this rule.

Native `notifyKill` captures and freezes scalar credited-owner health and
lifecycle facts after its existing victim deduplication and owned-pet credit
choice, before **all** composed `onKill` callbacks. Both formula terms use this
same frame. That phase and the maximum-HP choice are declared local policies;
the sources do not establish exact global live ordering or maximum-HP timing.
The frame follows the victim's lethal transition, so it is not a pre-lethal or
pre-packet snapshot. Kit kill-heals, Legend awards and later killing-packet
life steal cannot rewrite the stored facts.

Only an actual hostile champion-body kill qualifies. Native owned-pet kills
credit their owner once; pet or clone victims, friendlies, farm, assists and
protected victim resurrection entry do not qualify. A counted positive-HP
fallen victim does qualify. Triumph stores a fixed raw heal and deadline in
the actual recipient body's primitive memory. It does not use a side-only
scheduled heal or a shared mutable template. Same-body forms retain the pending
amount, world copies get independent memory, and a fresh replacement body starts
without it. Copied pet hooks cannot redeem the owner's state.

At the first due upkeep tick, one second after credit (30 ticks at 30 Hz), the
rune consumes the pending entitlement before ordinary self healing. Damage,
regeneration or other healing during the delay cannot change the fixed raw
amount. Current Grievous Wounds, healing increases/denial, maximum HP and absolute
or fractional healing ceilings govern delivery under an explicit modifier-timing
policy. Existing healing support does not implement every heal/shield-power or
Revitalize stacking interaction. Normal victory ends immediately; only existing
hostile persistent output can keep the duel active long enough for redemption.
The Sion examples above use his native post-death combat for that possibility.

Dead, zero-HP, fallen, death-defied or counted-dead recipients receive no new
entitlement and cancel pending healing. The counted-death guard is sticky even
if HP is manually restored before upkeep, preventing a banked heal on a later
return. Positive-HP attackable resurrection follows ordinary healing, and stasis
alone remains eligible. These are explicit recipient-lifecycle policies with
unmeasured Triumph-specific live behavior, distinct from protected victim
resurrection never creating a kill. Broader respawn, replacement-memory transfer
and possession need separate lifecycle work.

Kled uses combined Kled+Skaarl maximum HP for both percentage-health terms, then
his fixed own-health ceiling limits a dismounted ordinary heal. K'Sante retains
maximum HP while All Out fixes its healing ceiling at 65% of entry maximum HP;
that ceiling is neither a formula denominator nor recalculated after health
gains. Actual champion fixtures cover legal Triumph plus Bloodline at 1,499
points: the native snapshot precedes its +85 cap award. Dismounted Kled can gain
85 maximum HP but only 20 current HP, increasing missing HP by 65; a later
snapshot would change both terms. Renata's kit kill-save likewise leaves the
prior native entitlement intact. These tests establish local behavior, not live
callback order.

The compiled `bonusGold: 20` is **economic reference only**. Combat neither
awards nor spends it, records a wallet grant, enlarges the fixed stat budget,
nor changes shopping/search accounting. One pending slot covers the current
single-hostile-body duel only. General assists, multiplayer queues and the
article's repeat-takedown pending-heal update bug remain unsupported. A timer
also omits the visual missile and its documented unintended friendly-destruction
exceptions, including Fizz Trickster and Lissandra's self Frozen Tomb. The
source's Wind Wall-unblockable behavior and stasis eligibility do not establish
full missile parity.

The genuine [11 November full refresh](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/43056538392) computed all
**14,878 pairings per matrix with zero reuse**. All **29,756 new checkpoints**
match complete final forward/reverse scores, scenarios, variants, decoded builds
and spending across all 173 champions. The complete baseline comparison found
zero changed result payloads in either matrix, including item sets and spending;
shared input keys and simulation provenance changed, while kit keys did not.
All 22 jobs and **9,280 tests across 266 files** passed, with five existing skips.
Both matrix freshness checks, all 24 formerly stale-file tests and the production
build passed. The offline catalog freshness check passed again on 12 November.
The [accuracy log](../../ACCURACY.md) records exact source/data identities and
validation receipts. Full pages, browser combat-rune controls, item/rune
composition and rune-aware allocation/search remain unfinished. Roadmap step 1
remains in progress.

### Legend: Bloodline: life steal and the cap-health award

Implementation began on 8 November 2026; the genuine full refresh and checkpoint
audit completed on 10 November.

Each side selecting Bloodline (`9103`) must declare its own starting Legend
points with `--legend-points` or `--enemy-legend-points`, including explicit `0`.
Missing, repeated, malformed or unused point flags fail. Values must be
nonnegative safe integers; effective points cap at 1,500, retaining partial
progress. All three Legend choices share one source-defined row.

| Starting points | Completed stacks | Life steal | Direct bonus health |
|--:|--:|--:|--:|
| 0 or 99 | 0 | 0% | 0 |
| 100 or 199 | 1 | 0.45% | 0 |
| 1,399 | 13 | 5.85% | 0 |
| 1,400 or 1,499 | 14 | 6.3% | 0 |
| 1,500 or more | 15 | 6.75% | 85 |

The [Bloodline template 3971359](https://wiki.leagueoflegends.com/en-us/?oldid=3971359)
and [article 4021767](https://wiki.leagueoflegends.com/en-us/?oldid=4021767)
establish 0.45% per stack, fifteen stacks and health only at the cap. Named
client fields give zero base life steal, 0.45 percentage points per stack,
fifteen stacks and 85 health; compilation converts the percentage to the
runtime fraction `0.0045`. Three opaque client fields equal 100 but remain
undecoded; the Wiki wording establishes the stack and champion reward rules.

Only actual hostile champion-body kills credited by the engine add 100 points,
including native owned-pet credit and victim deduplication. Clone and Spirit
victims do not become champion takedowns through their targeting class.
Protected resurrection entry grants no points; a counted post-death kill
grants once. Starting history can represent earlier real events, but the duel
does not create assists, farm or monster rewards. Progress and permanent stats
survive supported death/form transitions and stay local to each world and
copied branch; independent scenarios and variants restart from declared history.
As with the other Legends, progress uses the existing after-kit kill callback.
Exact live ordering against other kill effects and the lethal packet's own
life steal versus a newly earned stack remain unmeasured.

Life steal adds to the existing `lifeSteal` stat and uses the normal eligible
damage-packet and healing path. Physical, magic and true basic damage can
qualify; ordinary spells do not become eligible merely by dealing damage.
[Life steal 4060425](https://wiki.leagueoflegends.com/en-us/?oldid=4060425)
expressly includes Kled W's fourth-hit percentage-health damage and K'Sante's
All Out bonus from attacks. Those packets carry explicit eligibility and follow
attack blocking and scaling; K'Sante's mark and ordinary spell packets remain
excluded. His existing 20% All Out omnivamp remains a separate healing effect.
Standard healing modifiers,
Grievous Wounds, health caps and the existing `noHealing` life-steal exception
remain in force. The engine's existing shield, overkill and damage-hook
conventions are retained, without treating them as new live-game measurements.
The full source lists specific pet exceptions; this batch does not establish
general pet-vamp inheritance.

The cap award is a once-only permanent direct bonus-health gain, installed
before the kit's `onStart` hook for seeded history. Reinitialization and later
kills at cap cannot restore the award again. [Health 4073062](https://wiki.leagueoflegends.com/en-us/?oldid=4073062)
says maximum-health increases restore the same current health; [Healing
4041638](https://wiki.leagueoflegends.com/en-us/?oldid=4041638) distinguishes that
restoration from healing. For an ordinary living owner the award therefore
adds 85 maximum and current HP, without heal amplification, Grievous Wounds,
healing totals or the ordinary `noHealing` check. This is composition of general
source rules, including the treatment of an otherwise living owner at a
protected healing floor, rather than a measured Bloodline-specific interaction.

The direct gain uses the retained champion rules:

| Champion | Cap award and boundary |
|---|---|
| Ornn | [Living Forge 4089066](https://wiki.leagueoflegends.com/en-us/?oldid=4089066) gives 10% plus 4% per upgrade. The frozen kit assumes five upgrades, so the direct award is 110.5 HP at 30%. |
| Pyke | [Gift of the Drowned Ones 4007005](https://wiki.leagueoflegends.com/en-us/?oldid=4007005) converts the 85 to `85/14` bonus AD, with no maximum- or current-health gain. |
| Vladimir | [Crimson Pact 4073468](https://wiki.leagueoflegends.com/en-us/?oldid=4073468) converts the external 85 health to 2.83305 AP at 3.333%. Its own outputs do not feed each other; only the direct 85 restores current HP. Broader external multiplier/item loops remain outside this contract. |
| Kled | [Mounted Skaarl 4058479](https://wiki.leagueoflegends.com/en-us/?oldid=4058479) assigns the bonus to Skaarl. [Dismounted Skaarl 4038397](https://wiki.leagueoflegends.com/en-us/?oldid=4038397) permits direct restoration while dismounted, capped at Kled's unchanged own maximum. Later remount reads the new Skaarl maximum and preserves Kled's own health. |
| K'Sante | [All Out 4051537](https://wiki.leagueoflegends.com/en-us/?oldid=4051537) retains its original absolute ceiling of 65% of maximum HP on entry for healing/regeneration. Direct bonus-health restoration may exceed it; later healing keeps that ceiling. The brief threshold-reset timing is unspecified. |
| Malphite and Galio | Seeded health precedes [Granite Shield 3973718](https://wiki.leagueoflegends.com/en-us/?oldid=3973718) and [Shield of Durand 3990299](https://wiki.leagueoflegends.com/en-us/?oldid=3990299) setup: +8.5 ordinary shield and +11.475 rank-five magic shield. Later recharge reads new maximum health; future Galio casts read new bonus health. |

An earned award does not immediately resize an existing shield or resnapshot
an active damage reduction; the retained sources do not establish that behavior.
Dead, zero-HP, fallen, death-defied or resurrecting owners keep progress and
permanent stats without current-health restoration. This conservative policy
prevents revival; exact restoration in those windows remains unmeasured.

The genuine [10 November full refresh](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/42769645596)
computed all 14,878 pairings in each default matrix with zero reuse. All 29,756
new checkpoints match the complete forward/reverse scores, scenarios, variants,
decoded builds and spending. Plain-stat payloads are unchanged; 22 build pairings
changed, all involving Kled or K'Sante. Aggregate scores changed in 22, scenarios
in 19 and decoded builds/item sets in nine; variants and spending are unchanged.
All 22 workflow jobs and 9,151 tests across 262 files passed, with five existing
skips. See the [accuracy log](../../ACCURACY.md) for the complete comparison and
validation receipts. The build search remains heuristic, and these changes do
not establish a global optimum or measured live-game accuracy. Full pages,
browser combat-rune controls, item/rune composition and rune-aware
allocation/search remain unfinished.

### Legend: Haste and qualified cooldowns

Each side selecting Haste (`9105`) must declare its own starting Legend points
with `--legend-points` or `--enemy-legend-points`, using the same explicit-history
contract as Alacrity. Missing, repeated, malformed or unused point flags fail;
explicit `0` means an unstacked start. Values must be nonnegative safe integers.
Effective progress caps at 1,000 points, with partial progress preserved:

| Starting points | Completed stacks | Basic ability haste |
|--:|--:|--:|
| 0 or 99 | 0 | 0 |
| 100 or 199 | 1 | 1.5 |
| 950 or 999 | 9 | 13.5 |
| 1,000 or more | 10 | 15 |

Actual enemy champion-body kills credited by the engine add 100 points, including
owned-pet credit. The body-identity, native deduplication, protected-resurrection,
post-death and dead-owner rules described for Alacrity below also apply to Haste.
Clone or Spirit victims do not become champion takedowns through their targeting
class. Declared history can represent prior real events; the 1v1 does not create
assists, farm or monster rewards. Point and stat state are local to each world,
form and branch, and independent scenarios and variants restart from the declared
history. The grant is installed before the kit's `onStart` hook. Progress uses the
existing after-kit kill-hook phase, whose complete live-game ordering is not
established by these sources.

The complete [Haste template 3958696](https://wiki.leagueoflegends.com/en-us/?oldid=3958696)
and [article 3980882](https://wiki.leagueoflegends.com/en-us/?oldid=3980882) establish
zero base haste, 1.5 per stack, ten stacks and the 100-point rules. Named client
fields cross-check base, per-stack and cap values. Three opaque client fields
equal 100, but their semantic names remain undecoded.

Basic haste shortens eligible basic-ability cooldowns, rather than ordinary
ultimate cooldowns. The full [Haste revision 4070414](https://wiki.leagueoflegends.com/en-us/?oldid=4070414)
combines generic haste additively with the appropriate basic, ultimate or
ability-specific contribution, capped at 500. The engine uses that qualified
value for native cast scheduling, charge recharge, held cooldown release and
total-cooldown refunds. Static cast cooldowns retain their exclusion; their
separate charge timer follows its own source rule. The full
[Cooldown revision 4050188](https://wiki.leagueoflegends.com/en-us/?oldid=4050188)
also retains exceptions for target-specific timers. Champion-owned clocks use
their reviewed ability classification rather than treating every timer as a
basic ability. A stack gain affects later scheduling; it does not rescale a
cooldown already running.

Shared cooldown aliases and reviewed exceptions retain their parent class.
Udyr's specific [Bridge Between revision 3983420](https://wiki.leagueoflegends.com/en-us/?oldid=3983420)
defines all four stance abilities, including his R slot, as basic. The generic
Champion ability page also lists Wingborne Storm as a pseudo-ultimate for
ultimate interactions; that broader label does not replace the specific
cooldown rule. Awakened Spirit's tooltip explicitly excludes generic ability
haste and accepts only ultimate haste. His ordinary 1.5-second global stance
lock uses qualified basic haste. The 0.5-second empowered lock retains its fixed
interpretation because the retained sources do not establish its haste eligibility.

The same cooldown contract carries unconditional basic and ultimate item haste
as separate stats, plus ability-specific conditional bonuses. This corrects
item recharge and champion-owned timer paths without enabling combat-rune item
mode: all combat-rune flags still reject fixed builds and item search until
composition and valuation are reviewed. The plain-stat allocation remains its
no-rune reference.

The shared-engine and Udyr corrections changed default matchup results even
though default fights select no combat runes. The
[8 November full refresh](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/42468696945)
genuinely recomputed all 14,878 pairings in each default matrix, with zero reuse.
All 22 jobs passed, and all 29,756 genuine checkpoints match the final forward
and reverse scores, scenarios, variants, decoded builds and spending. The
baseline comparison found 172 changed plain-stat pairings, all involving Udyr,
and 186 changed build payloads, including 182 changed aggregate scores. The
full suite passed 8,977 tests across 258 files with five existing skips; both
matrix freshness checks and the final production build pass. See the
[accuracy log](../../ACCURACY.md) for the complete result comparison.
Full pages, browser combat-rune controls, rune-aware allocation/search and general
farm/assist/monster progression remain unfinished. No new in-game measurements
are claimed.

### Legend: Alacrity: declared history and champion-kill progress

Each side selecting `9104` must also supply its own starting point value:
`--legend-points` for your champion, or `--enemy-legend-points` for the enemy.
Explicit `0` is required for an unstacked start. Level 20 does not establish
earned Legend points, and the interface does not assume maximum stacks.
Missing, repeated, malformed or unused point flags fail before a score is
shown. Point values must be nonnegative whole numbers within JavaScript's safe
integer range; effective progress is capped at 1,000 points. Output identifies
the declared state and any cap applied.

The rune grants 3% bonus attack speed even at zero points. Each completed
100-point stack adds 1.5 percentage points, up to ten stacks and 18% total:

| Starting points | Stacks | Bonus attack speed |
|--:|--:|--:|
| 0 or 99 | 0 | 3% |
| 100 or 199 | 1 | 4.5% |
| 950 or 999 | 9 | 16.5% |
| 1,000 or more | 10 | 18% |

The point remainder is preserved: 99 points plus a qualifying 100-point award
becomes 199, with one completed stack. Effective progress stops at the cap.
The full Alacrity template and article agree with the current client's named
base-AS, per-stack-AS and maximum-stack fields. Three opaque client fields
contain 100, but their semantic names have not been decoded; the exact Wiki
wording establishes the points-per-stack and champion-takedown rules.

This first progression subset awards 100 points for actual enemy champion-body
kills credited by the engine. An owned pet or clone can earn that credit for
its champion owner. An enemy clone, Illaoi Spirit or ordinary summon is not a
champion-takedown victim merely because it has champion-like targeting.
Protected resurrection entry grants no points; actual destruction later can
qualify. A counted death entering a post-death window grants once even if that
window retains positive health. Native kill identities prevent repeated awards.

The source has no alive-only condition for this progress. A dead owner's
committed damage or still-active pet can therefore earn points without healing
or reviving that owner. Friendly or self destruction, mere damage, shield
depletion, despawn, replacement and natural expiry do not create awards.
The current 1v1 has no general allied-champion assist or farm simulation.
Declared starting points may represent real prior assists, farm and monster
credit; runtime does not infer those events or grant rewards from a summon’s
minion/monster targeting class. The retained sources include the epic-monster
double-credit bug fix, but this batch adds no monster population or reward path.

Attack speed is installed before the kit's `onStart` hook as a permanent rune stat
and survives supported death/form transitions. Point and stat changes remain local
to each world and branch; every independent scenario and variant starts from
the declared state. Garen excludes the active contribution from Judgment spins
while basic attacks retain its benefit. Kai'Sa gains attack speed and a shorter
Supercharge charge without gaining Living Weapon evolution credit. Jhin keeps
his fixed attack rate and converts the additional AS to AD through his existing
stat conversion.

Runtime progress uses the existing kill-hook phase after the kit's own callback.
The retained sources do not establish complete live-game ordering relative to
every champion kill effect. Full farm/assist/monster progression,
item builds, browser controls, full pages and rune-aware allocation/search remain
unfinished.

The [incremental refresh](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/42382830823)
computed all 172 affected Garen pairings in each default matrix and reused the
other 14,706 unchanged pairings per matrix. All 344 new checkpoints match the
final outputs, and default scores, scenarios, builds, variants and spending match
the previous baseline. The [accuracy log](../../ACCURACY.md) records the completed
freshness, test and build validation.

### Absorb Life: kill events and level-20 healing

The full rune template explicitly evaluates levels 1 through 20: base 1 health,
then 0.25 per level at levels 2–5, 1 per level at levels 6–10, and 2 per level at
levels 11–20. This produces **27 health at level 20**. The current client's
character-level breakpoint calculation agrees. Its `TooltipMaxHeal` value of 23
is the level-18 endpoint, not a cap on this explicit level-20 calculation.

The rune listens for actual hostile kills emitted by combat. Real enemy combat
pets qualify under the reviewed generic enemy-unit wording. When an owned pet
scores the kill, the engine credits the champion owner once; the pet does not
also receive the rune heal. Mere damage, assists, a protected zero-health state,
despawn, replacement and natural expiry do not create extra kill events. The
ordinary healing path applies healing modifiers, anti-heal, no-healing states,
maximum-health caps and dead-owner restrictions; it does not revive a dead owner.

The retained Kill, Unit and rune pages support the generic enemy-unit rule.
They do not supply a measured rune-specific eligibility table for every ward,
trap or clone. This implementation uses the engine's actual hostile combat kill
events and does not invent farm, wards, monsters or other populations to trigger
healing. A category the combat model does not represent is not thereby certified
as supported. Rune-specific category eligibility still needs direct evidence or
controlled measurement.

The [mechanics gap audit](MECHANICS_GAPS.md) records remaining packet-order,
resistance-classification, crowd-control-phase and stat-origin work. In
particular, Conditioning and Unflinching remain unimplemented. The three
Legends' supported point-state and kill progression, and Bloodline's direct-health
proof limits, are described above; they do not resolve every progression category
or attack-speed source.

### Garen Judgment and the attack-speed shard

Judgment's full pinned revision 4009435 states that its spin scaling uses only
bonus attack speed from item stats and level growth. The kit now subtracts the
recorded attack-speed shard contribution and active tagged rune attack-speed
statuses, including Alacrity, when computing spins. Their normal basic-attack
benefits remain effective. The existing seven-base-spins and one extra
per 25% eligible bonus attack speed formula is retained; an animation cap is not
used to truncate damage pulses.

Actual cast scheduling and budget estimates use the shared source-qualified
channel pulse callback. Count is captured once per cast, retaining the existing
model assumption rather than establishing live-game snapshot timing. Generic
formula and interval channels keep their existing behavior.

This fixes the known shard-origin error. Other attack-speed sources preserve the
existing model. Item passives are not excluded as a class: Garen's history
explicitly records eligibility for Trinity Force's former Mythic passive.
Temporary Guinsoo's Seething Strike eligibility remains unverified. Alacrity's
active rune contribution is excluded separately; this does not establish full
eligibility for every future attack-speed source.

The full [Judgment source](../../data/16.21/garen-judgment-source.json) is retained
separately from the current thirty-page combat-rune bundle. Its exact revision and
the parsed ability notes establish the shard exclusion; no live-game timing
measurement or complete current-item eligibility audit is claimed. The
[full refresh](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/42225042960)
recomputed all 14,878 pairings in each default matrix and passed its TypeScript
checks and full test suite. Default scores, scenarios, builds, variants and
spending match the previous baseline. See the [accuracy log](../../ACCURACY.md)
for release validation.

## Apply stat shards in a manual duel

```sh
npm run duel -- Darius Garen --shards 5005,5001,5001 --enemy-shards 5008,5008,5011
npm run duel -- Darius Garen --items "Mercury's Treads" --shards 5007,5010,5013
npm run duel -- Kaisa Garen --items "Guinsoo's Rageblade" --shards 5008,5008,5011
```

Each flag takes three IDs in offense, flex and defense order. Omit a side's flag
to keep its ordinary behavior. Unknown, misplaced or incomplete selections fail;
the same scaling-health shard can be selected in both eligible rows.

| Shard | ID | Effect at level 20 |
|---|--:|---|
| Adaptive force | 5008 | 9 adaptive force: 5.4 bonus AD or 9 AP |
| Attack speed | 5005 | 10% bonus attack speed |
| Ability haste | 5007 | 8 ability haste |
| Movement speed | 5010 | 2.5% bonus movement speed |
| Scaling health | 5001 | 200 bonus health per selection |
| Flat health | 5011 | 65 bonus health |
| Tenacity and slow resist | 5013 | 15% tenacity and 15% slow resist |

Values and selection rules are compiled from six complete pinned revisions in
`data/16.21/rune-shard-sources.json`. Their content hashes, exact rule excerpts and
numeric formulas are checked before a fight. Equipment preserves innate start
effects and applies the shards before the champion's setup, so existing stat
conversions and multipliers see them. Form changes and resurrection retain the
bonuses without equipping them twice.

Adaptive force compares the raw purchased bonus AD with purchased AP before any
adaptive shard is added. Champion passive AD/AP is excluded. A tie uses the
champion's recorded adaptive type. Both adaptive shards share that one choice.
Adaptive shards also work with reviewed fixed item builds. The complete
16.21 item catalog and 114 item implementation files are checked against their
reviewed hashes before equipment; changed or future inputs require another
review. The other six shard effects retain their existing fixed-item support.

Eligible fixed passives already enter the purchased-stat pool: Sterak’s Claws,
Rod of Ages’ Timeless and Dawncore’s First Light. Awe and Riftmaker’s
Void Infusion remain excluded from the adaptive choice, while their combat
bonuses still apply. Fully stacked Tear transformations and explicit unstacked
builds use the same item resolution as equipment. Each side’s adaptive choice
uses its own reviewed build and item options.

Five items remain unsupported with adaptive shards: **Rabadon’s Deathcap,
Overlord’s Bloodmail, Blackfire Torch, Hubris and Mejai’s Soulstealer**. The first three require
source-qualified dynamic AD/AP and amplification accounting; Hubris’s Eminence
AD buff is not modelled. Mejai’s Glory can gain or lose stacks while
post-death combat continues, but its current module fixes pre-fight stacks. Rabadon’s amplification of otherwise excluded passive
AP can qualify, while the adaptive shard and its own amplification must be
excluded, so merely comparing derived AD/AP would be incorrect. Sterak’s Gage
with forms whose base AD changes also rejects until form changes can update its
eligible Claws contribution. The reviewed set covers 108 purchasable catalog
entries and three transformed entries, subject to normal build rules.

Kai'Sa supports all seven shard types in plain-stat duels and reviewed fixed
item builds. Exact rune AD, AP and attack-speed contributions are
recorded separately in unit memory and excluded from Living Weapon's evolution
thresholds. They still increase combat damage and shorten Supercharge's charge
time. Purchased stats and level growth retain their eligibility. This follows
her current passive source (revision 4089050): permanent item and growth stats
qualify, while adaptive force does not. Item-passive stats outside the direct
bonus pool retain the kit's existing limitation. Adaptive item builds follow
the five-item and changing-base-AD Sterak restrictions above.

The plain-stat allocation remains the existing no-shard reference: it buys stats
before the free shard bonuses are applied. Actual fights and kit-variant
comparisons include the shards, including each budget in `--sweep`. This does not
claim a shard-aware optimal stat allocation. `--search` with shards is rejected
until the build search can value and carry them consistently. These options do
not select a keystone or the other runes of a page, and they do not change the
precomputed picker rankings. The browser can calculate separate plain-stat results with explicit selections below.

The inherited spacing scenario still qualifies from base movement speeds and
attack ranges. A movement-speed shard changes movement during fights, but cannot
make an otherwise inapplicable spacing scenario qualify. Updating that admission
rule across all item and kit bonuses requires a separate scorer change and
validation; this batch keeps that model limit visible in the command output.

Shard tenacity multiplies with Mercury's Treads: 15% and 30% produce 40.5%.
Shard slow resist multiplies with Boots of Swiftness: 15% and 25% produce 36.25%.
The existing specific Courage rule is retained: its 60% tenacity and the shard
produce 66%. That newer ability note conflicts with the generic tenacity table's
grouping; both sources remain recorded, and this model choice stays explicit.

## Choose shards in the browser

Open **Settings → Stat shards**, enable either side, and choose one shard in each
of its three rows. Your choices apply to every counter candidate; the enemy
choices apply to the champion you face. The controls show the compiled effects
at level 20, including 200 health per scaling-health selection.

With shards selected, the picker and matchup pages calculate plain-stat duels in
browser workers. Cached item-build and default plain-stat scores do not describe
these choices, so they are bypassed. Selections stay in this browser. **Swap
sides** carries the shard selections with the champions, and **Reset to defaults**
clears both sides. The matchup’s Fight setup numbers and assumptions include the
selected effects.

Shard bonuses use the existing no-shard reference allocation of the stat budget;
they affect actual fights and variant selection. Spacing admission still uses
base movement speeds. These controls select stat shards; full rune-page effects
and item-build shard search remain unfinished.

The browser downloads a compact seven-shard bundle with compiled rules and source
references. The atomic export checks the complete retained source catalog and
binds the bundle to the model revision. Invalid, stale or missing selected data
produces an error; it is never silently replaced by an unmodified duel. Legacy
datasets without shard sources keep their existing settings and can clear stored
choices.
