# Caster batches: source audits and implementation status

These audits were prepared on 14 October 2026 while the 61-kit matrix was refreshing.
The second expansion batch registered Ahri, Cassiopeia, Kassadin, Lissandra,
Veigar, and Vladimir. The third registers Anivia, Karthus, Malzahar, Vel'Koz,
Ziggs, and Zyra. A fourth batch (Gragas, Warwick and Wukong, not audited here)
brings implemented source coverage to 76 of 173 champions, leaving 97 to implement
and 2,850 unordered pairings to simulate. Current release validation is recorded in
[ACCURACY.md](../../ACCURACY.md).

All twelve casters in these audits now have registered kits. The audits retain
their original formulas and evidence gaps;
they are not independent test reports. Their references to the source freeze
describe the 61-kit refresh, rather than a restriction on later implementation.

| Audit | Focus | Implementation status |
|---|---|---|
| [Ahri, Lissandra, Kassadin](Ahri-Lissandra-Kassadin.md) | Mana formulas, cast events, return trajectories, recast clocks and special cancellation rules | All three registered in batch 2 |
| [Veigar, Vel'Koz, Ziggs](Veigar-Velkoz-Ziggs.md) | Cage boundaries, persistent casts, directed beams, progressive rifts, finite mines and bounce geometry | Veigar in batch 2; Vel'Koz and Ziggs in batch 3 |
| [Vladimir, Cassiopeia, Karthus](Vladimir-Cassiopeia-Karthus.md) | Health conversions, facing, poison clocks, targeting-loss exceptions and post-death spellcasting | Vladimir and Cassiopeia in batch 2; Karthus in batch 3 |
| [Anivia, Malzahar, Zyra](Anivia-Malzahar-Zyra.md) | Attackable resurrection, channel/tether lifecycles, plant damage categories, spawn snapshots and seed geometry | All three registered in batch 3 |

Each audit lists pinned revisions, maximum-rank and level-20 formulas, counterplay,
remaining evidence gaps, behavior and budget considerations, and meaningful regression
cases. Implementation must read numeric values through KitContext, enforce relevant
quoted restrictions, test ordinary behavior and refresh the affected results. Source
conflicts and missing geometry must stay explicit rather than acquiring guessed values.

The two archived evidence JSON files retain exact revisions already present in the
committed manifest. They recover notes omitted by the parsed records, including
resurrection/cast rules and plant damage snapshots. Before code depends on them, retain
the evidence in the dataset and include it in model provenance; these planning files
are not runtime inputs. Data attribution follows [data/README.md](../../data/README.md).

Batch 3 also retains selected versioned game-file excerpts in the ability records.
Each records its exact URL, game version, object path and SHA-256. These sources
are attributed separately from wiki revisions; client geometry interpretations
remain visible assumptions where server behavior is unverified. They and the
recovered wiki notes are now listed in `pipeline/abilities/evidence.ts`, so
`npm run build:data` regenerates them instead of dropping them.
