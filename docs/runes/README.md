# Runes: sources, page structure and partial combat effects

The source catalog and page validator describe the current rune system. Explicit
manual-duel options and browser plain-stat duels apply all seven stat shards.
Manual plain-stat duels also support six partial combat effects, listed below.
Full rune pages and rune-page search remain unfinished. The existing
Udyr-specific Triple Tonic behavior still reads its original `runes.json`;
default matchup matrices keep their existing settings without these optional
selections. Full rune combat is step 1 of the [ordered improvement
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
```

Each flag takes comma-separated rune IDs for that side. These six effects are
supported as partial manual selections:

| Rune | ID | Implemented rule |
|---|--:|---|
| Coup de Grace | 8014 | 8% increased damage to the enemy champion while its health is strictly below 40%. |
| Cut Down | 8017 | 8% increased damage to the enemy champion while its health is strictly above 60%. |
| Last Stand | 8299 | Increased damage to the enemy champion while the owner is strictly below 60% health: rises linearly from the 5% lower endpoint toward 11% as health falls to 30%, then stays at 11%. Exactly 60% health receives no increase. |
| Second Wind | 8444 | Positive hostile champion or owned-pet damage to the champion body's health enables ten seconds of bonus regeneration. The model regenerates 0.2% of current missing health at each half-second pulse. |
| Absorb Life | 9101 | Heals 27 health at level 20 for each actual hostile combat kill credited to the champion by the engine, subject to standard healing modifiers and caps. |
| Legend: Alacrity | 9104 | 3% bonus attack speed plus 1.5 percentage points per completed 100-point stack, capped at ten stacks (18%). Requires declared starting points; actual champion-body kills add 100 points. |

The three Precision health-damage runes occupy the same source-defined row, so select at most
one of them. Second Wind, Absorb Life and Alacrity can accompany any one of those
three, subject to the same page validator.
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

The offline compiler checks twenty-one complete Wiki revisions in
`data/16.21/rune-combat-sources.json` and the complete versioned CommunityDragon
`perks.cdtb.bin.json`, retained as `data/16.21/rune-game-perks.json`. It checks
full-content hashes, exact revisions and excerpts, binds the six templates to
the catalog, and cross-checks the numeric rules against current game fields.
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
- Eligible champion true damage is amplified under the retained V25.S1.3 rule.
  Exact `Smite` and `Ignite` labels are excluded. This is not a general summoner
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

Full pages, keystones, the remaining historical-state effects, champion-specific
substitutions, item compatibility, separate amplifier packets and automatic rune
selection require further implementation and validation. These six catalog entries are
marked `manual-effects`; that status identifies this limited manual interface,
not complete rune-page fidelity.

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
every champion kill effect. Other Legend runes, full farm/assist progression,
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
particular, Conditioning, the other Legend runes and Unflinching remain
unimplemented. Alacrity's supported point-state and kill progression are described
above; they do not resolve every progression category or attack-speed source.

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
separately from the twenty-one-page combat-rune bundle. Its exact revision and
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
