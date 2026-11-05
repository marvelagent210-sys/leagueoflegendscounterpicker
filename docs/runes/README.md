# Runes: sources, page structure and stat shards

The source catalog and page validator describe the current rune system. Explicit
manual-duel options now apply all seven stat shards. Full rune-page effects and
rune-page search remain unfinished. The existing Udyr-specific Triple Tonic
behavior still reads its original `runes.json`; default matchup matrices keep
their existing settings without these optional shard selections.

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

Before adding full rune effects, each rune needs its own numeric reads, trigger and timing
tests, interaction checks, and any historical-stack assumptions. Unimplemented
effects are marked as such; they are not declared ineffective in a duel. Triple
Tonic's status means only the existing Udyr-specific support, not a general page
implementation. Later milestones will equip effects, search pages with item
builds, refresh affected pairings and expose the selected pages in the app.

Wiki-derived data follows the [data attribution and license](../../data/README.md).

## Apply stat shards in a manual duel

```sh
npm run duel -- Darius Garen --shards 5005,5001,5001 --enemy-shards 5008,5008,5011
npm run duel -- Darius Garen --items "Mercury's Treads" --shards 5007,5010,5013
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
Item passives have several source-specific eligibility exceptions, so adaptive
shard 5008 with item builds is rejected in this first implementation. The other
six shard effects can be used with fixed item builds.

Kai'Sa supports all seven shard types in plain-stat duels, and nonadaptive
shards with fixed items. Exact rune AD, AP and attack-speed contributions are
recorded separately in unit memory and excluded from Living Weapon's evolution
thresholds. They still increase combat damage and shorten Supercharge's charge
time. Purchased stats and level growth retain their eligibility. This follows
her current passive source (revision 4089050): permanent item and growth stats
qualify, while adaptive force does not. Item-passive stats outside the direct
bonus pool retain the kit's existing limitation; adaptive shards with items
remain unsupported.

The plain-stat allocation remains the existing no-shard reference: it buys stats
before the free shard bonuses are applied. Actual fights and kit-variant
comparisons include the shards, including each budget in `--sweep`. This does not
claim a shard-aware optimal stat allocation. `--search` with shards is rejected
until the build search can value and carry them consistently. These options do
not select a keystone or the other runes of a page, and they do not change the
precomputed picker rankings or add shard controls to the browser.

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
