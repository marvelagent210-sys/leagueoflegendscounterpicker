# Rune sources and page structure

The first rune milestone supplies the source catalog and validates page structure.
It does not equip a new rune in combat, choose a rune page for a champion, or change
the existing matchup matrices. The existing Udyr-specific Triple Tonic behavior
still reads its original `runes.json`.

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
"10-180 Health". Both are retained; no health bonus is applied by this catalog.

Before adding effects, each rune needs its own numeric reads, trigger and timing
tests, interaction checks, and any historical-stack assumptions. Unimplemented
effects are marked as such; they are not declared ineffective in a duel. Triple
Tonic's status means only the existing Udyr-specific support, not a general page
implementation. Later milestones will equip effects, search pages with item
builds, refresh affected pairings and expose the selected pages in the app.

Wiki-derived data follows the [data attribution and license](../../data/README.md).
