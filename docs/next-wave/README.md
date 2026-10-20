# Expansion batches: source audits and implementation status

These audits were prepared on 14 October 2026 while the 61-kit matrix was refreshing.
The second expansion batch registered Ahri, Cassiopeia, Kassadin, Lissandra,
Veigar, and Vladimir. The third registered Anivia, Karthus, Malzahar, Vel'Koz,
Ziggs, and Zyra. The fourth batch adds Caitlyn, Ezreal, Jhin, Jinx, Lucian and Miss Fortune.
The fifth adds Corki, Draven, Kog'Maw, Sivir, Tristana and Twitch.
The sixth adds Kai'Sa, Kalista, Samira, Smolder, Varus and Xayah.
Implemented coverage is 91 of 173 champions, leaving 82 to implement and
4,095 unordered pairings to simulate. Current release
validation is recorded in [ACCURACY.md](../../ACCURACY.md).

All twelve casters and eighteen marksmen in these audits now have registered kits. The audits retain
their original formulas and evidence gaps;
they are not independent test reports. Their references to the source freeze
describe the 61-kit refresh, rather than a restriction on later implementation.

| Audit | Focus | Implementation status |
|---|---|---|
| [Ahri, Lissandra, Kassadin](Ahri-Lissandra-Kassadin.md) | Mana formulas, cast events, return trajectories, recast clocks and special cancellation rules | All three registered in batch 2 |
| [Veigar, Vel'Koz, Ziggs](Veigar-Velkoz-Ziggs.md) | Cage boundaries, persistent casts, directed beams, progressive rifts, finite mines and bounce geometry | Veigar in batch 2; Vel'Koz and Ziggs in batch 3 |
| [Vladimir, Cassiopeia, Karthus](Vladimir-Cassiopeia-Karthus.md) | Health conversions, facing, poison clocks, targeting-loss exceptions and post-death spellcasting | Vladimir and Cassiopeia in batch 2; Karthus in batch 3 |
| [Anivia, Malzahar, Zyra](Anivia-Malzahar-Zyra.md) | Attackable resurrection, channel/tether lifecycles, plant damage categories, spawn snapshots and seed geometry | All three registered in batch 3 |
| [Caitlyn and Jhin](Caitlyn-Jhin.md) | Attack snapshots, critical packets, reloads, finite traps and separately timed channel shots | Registered in batch 4 |
| [Ezreal and Lucian](Ezreal-Lucian.md) | Spell contacts, independent attacks, blinks, fixed beams and mobile channels | Registered in batch 4 |
| [Jinx and Miss Fortune](Jinx-MissFortune.md) | Weapon policies, target-specific passives, actual bounces, trap phases and traveling waves | Registered in batch 4 |
| [Corki and Draven](Corki-Draven.md) | Ordered critical packets, finite ammunition, persistent trails, axe catches and returning ultimates | Registered in batch 5 |
| [Kog'Maw and Tristana](KogMaw-Tristana.md) | Moving post-death explosion, range and resource clocks, stacked bombs and displacement | Registered in batch 5 |
| [Sivir and Twitch](Sivir-Twitch.md) | Independent boomerang passes, shield-triggered healing, poison, stealth and piercing basic skillshots | Registered in batch 5 |
| [Kai'Sa and Kalista](Kaisa-Kalista.md) | Fixed-time missile contacts, Plasma, isolated volleys, hop movement and finite Rend stacks | Registered in batch 6 |
| [Samira and Smolder](Samira-Smolder.md) | Style sequences, projectile destruction, mobile channels, decelerating missiles and terrain flight | Registered in batch 6 |
| [Varus and Xayah](Varus-Xayah.md) | Charge clocks, target-specific Blight, timed zones, feather placement and ordered returns | Registered in batch 6 |

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
remain visible assumptions where server behavior is unverified.
