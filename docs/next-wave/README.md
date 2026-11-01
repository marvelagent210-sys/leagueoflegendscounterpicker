# Expansion batches: source audits and implementation status

These audits were prepared on 14 October 2026 while the 61-kit matrix was refreshing.
The second expansion batch registered Ahri, Cassiopeia, Kassadin, Lissandra,
Veigar, and Vladimir. The third registered Anivia, Karthus, Malzahar, Vel'Koz,
Ziggs, and Zyra. The fourth batch adds Caitlyn, Ezreal, Jhin, Jinx, Lucian and Miss Fortune.
The fifth adds Corki, Draven, Kog'Maw, Sivir, Tristana and Twitch.
The sixth adds Kai'Sa, Kalista, Samira, Smolder, Varus and Xayah.
The seventh adds Akshan, Aphelios, Graves, Kindred, Senna and Zeri.
The eighth registers Diana, Ekko, Evelynn, Fizz, Katarina and LeBlanc.
The ninth registers Kha'Zix, Naafiri, Nocturne, Rengar, Talon and Zed.
The tenth registers Hecarim, Jarvan IV, Lee Sin, Wukong, Vi and Warwick.
The eleventh registers Alistar, Blitzcrank, Braum, Galio, Gragas and Maokai.
The twelfth registers Nunu & Willump, Rakan, Rell, Sejuani, Taric and Thresh.
The thirteenth registers Janna, Karma, Lulu, Nami, Sona and Soraka.
The fourteenth registers Hwei, Orianna, Ryze, Syndra, Taliyah and Viktor.
The fifteenth registers Neeko, Swain, Twisted Fate, Vex, Xerath and Zoe.
The seventh to fifteenth batches were written in the private workspace and merged into
this repository on 30 October; Gragas, Hecarim, Warwick and Wukong use this repository's
own kits, not the audited ones here. Batches 16 to 19 were written in this repository and
register the last 28 champions, so implemented coverage is all 173, with 14,878 unordered
pairings; each kit page lists its own sources and assumptions. Release evidence and
remaining limits are recorded in [ACCURACY.md](../../ACCURACY.md).

All twelve casters and twenty-four marksmen in these audits now have registered kits. The audits retain
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
| [Akshan](Akshan.md) | Double shots, passive shields, boomerangs, terrain swings and committed ultimate shots | Registered in batch 7; validation complete |
| [Aphelios](Aphelios.md) | Finite weapon pairs, ammunition, off-hand contacts, marks, sentries and returning Chakrams | Registered in batch 7; validation complete |
| [Graves and Zeri](Graves-Zeri.md) | Shotgun reloads, anchored smoke, spell attacks, pellet collision, terrain and overcharge | Registered in batch 7; validation complete |
| [Kindred and Senna](Kindred-Senna.md) | Real Wolf targets, shared health protection, Mist beams, delayed roots and camouflage | Registered in batch 7; validation complete |
| [Diana](Diana.md) | Moonlight consumption, target-tracking dashes, distinct shield orbs and delayed pulls | Registered in batch 8; validation complete |
| [Ekko](Ekko.md) | Independent boomerang passes, Resonance, delayed fields and four-second history | Registered in batch 8; validation complete |
| [Evelynn and Fizz](Evelynn-Fizz.md) | Target-local marks, selective stealth breaks, phased untargetability and lure interception | Registered in batch 8; validation complete |
| [Katarina](Katarina.md) | Actual dagger locations, Shunpo anchors and independently launched channel knives | Registered in batch 8; validation complete |
| [LeBlanc](Leblanc.md) | Mark ordering, return pads, tether lifecycle and cosmetic clone attacks | Registered in batch 8; validation complete |
| [Kha'Zix](Khazix.md) | Legal evolutions, actual isolation, independent spike rays and stealth charges | Registered in batch 9; validation complete |
| [Naafiri](Naafiri.md) | Actual packmates, target-local bleeds, untargetability and tracking pursuit | Registered in batch 9; validation complete |
| [Nocturne](Nocturne.md) | Declaration-timed trail, real basic cleave, spell shield, fear tether and nearsight | Registered in batch 9; validation complete |
| [Rengar](Rengar.md) | Ferocity, empowered casts, leap basics, actual health loss and camouflage | Registered in batch 9; validation complete |
| [Talon](Talon.md) | Target-local Wounds, bleeding, independent close-cast dash, terrain and blade returns | Registered in batch 9; validation complete |
| [Zed](Zed.md) | Independent shadows, grouped slashes, per-target shurikens and actual Death Mark accounting | Registered in batch 9; validation complete |
| [Hecarim](Hecarim.md) | Movement-derived attack damage, Rampage stacks, actual damage healing and charge contacts | Registered in batch 10; validation complete |
| [Jarvan IV](JarvanIV.md) | Target-local Martial Cadence, flag auras, Dragon Strike tracking and Cataclysm terrain | Registered in batch 10; validation complete |
| [Lee Sin](LeeSin.md) | Energy and Flurry, target marks, staged recasts, actual anchors, shields and knockback | Registered in batch 10; validation complete |
| [Wukong](MonkeyKing.md) | Independent clone attacks and copied spells, armor reduction and shared knockup history | Registered in batch 10; validation complete |
| [Vi](Vi.md) | Charged dash contacts, target-local Denting Blows, empowered attacks and tracking ultimate | Registered in batch 10; validation complete |
| [Warwick](Warwick.md) | Actual passive healing, attached bites, target health thresholds, fear and suppression | Registered in batch 10; validation complete |
| [Alistar](Alistar.md) | Actual nearby deaths, deduplicated Roar credits, buffered headbutt and Trample contacts | Registered in batch 11; validation complete |
| [Blitzcrank](Blitzcrank.md) | Threshold mana shield, first-body hook, empowered attacks and actual shield removal | Registered in batch 11; validation complete |
| [Braum](Braum.md) | Target-local passive stacks, actual ally anchors, directional damage and projectile interception | Registered in batch 11; validation complete |
| [Galio](Galio.md) | Passive cooldown contacts, curved gusts, charged taunt and conditional actual-ally landing | Registered in batch 11; validation complete |
| [Gragas](Gragas.md) | Fermenting ground barrels, real drink channel, body collisions and centered explosions | Registered in batch 11; validation complete |
| [Maokai](Maokai.md) | Actual saplings, brush-qualified empowerment, untargetable pursuit and traveling root branches | Registered in batch 11; validation complete |
| [Nunu & Willump](Nunu.md) | Consume, rolling snowball, barrage contacts and guarded ultimate channel | Registered in batch 12; validation complete |
| [Rakan](Rakan.md) | Passive shield, real quill contacts, dash anchors and charm lifecycles | Registered in batch 12; validation complete |
| [Rell](Rell.md) | Snapshotted resistance theft, shared form clocks, shield removal and nondisabling kinematics | Registered in batch 12; validation complete |
| [Sejuani](Sejuani.md) | Frost armor, actual melee contacts, target-local stacks and projectile control | Registered in batch 12; validation complete |
| [Taric](Taric.md) | Bravado, finite charges, real Bastion anchors and delayed protection | Registered in batch 12; validation complete |
| [Thresh](Thresh.md) | Explicit souls, actual hook targets, guarded lantern anchors and finite walls | Registered in batch 12; validation complete |
| [Janna](Janna.md) | Charged gusts, actual ally shields, directional movement and interruptible healing | Registered in batch 13; validation complete |
| [Karma](Karma.md) | Finite Mantra state, separately sourced empowered casts, actual tethers and shields | Registered in batch 13; validation complete |
| [Lulu](Lulu.md) | Actual Pix attachment, independent bolts, polymorph and temporary health | Registered in batch 13; validation complete |
| [Nami](Nami.md) | Actual bounce identities, charged attack buffs, traveling waves and movement | Registered in batch 13; validation complete |
| [Sona](Sona.md) | Finite Accelerando history, ordered Power Chords, actual auras and Crescendo | Registered in batch 13; validation complete |
| [Soraka](Soraka.md) | Starcall return lifecycle, real ally health costs, Equinox and conditional healing | Registered in batch 13; validation complete |
| [Hwei](Hwei.md) | Ten spells, real isolation and geometry, accepted slow stacks and finite marks | Registered in batch 14; validation complete |
| [Orianna](Orianna.md) | Actual Ball identity, travel and attachment, recipient shields and local command origins | Registered in batch 14; validation complete |
| [Ryze](Ryze.md) | Derived mana, target-local Flux, Overload resets and actual Realm Warp passengers | Registered in batch 14; validation complete |
| [Syndra](Syndra.md) | Finite Splinter collection, actual spheres, delayed pickups and ordered executions | Registered in batch 14; validation complete |
| [Taliyah](Taliyah.md) | Declaration-timed mine rows, actual movement crossings, Worked Ground and finite rocks | Registered in batch 14; validation complete |
| [Viktor](Viktor.md) | Finite augment history, empowered attack packets, vector rays and snapshotted storm contacts | Registered in batch 14; validation complete |
| [Neeko](Neeko.md) | Actual clone identities, spell contacts, disguise restrictions and delayed crowd control | Registered in batch 15; validation complete |
| [Swain](Swain.md) | Finite souls, returning Nevermove, timed vision contacts and persistent demon state | Registered in batch 15; validation complete |
| [TwistedFate](TwistedFate.md) | Ordered card selection, empowered attacks, Stacked Deck and actual teleport destinations | Registered in batch 15; validation complete |
| [Vex](Vex.md) | Target-local Gloom, Doom fear, actual movement interactions and committed pursuit | Registered in batch 15; validation complete |
| [Xerath](Xerath.md) | Charged beams, delayed explosions, travel-dependent stun and finite ultimate shots | Registered in batch 15; validation complete |
| [Zoe](Zoe.md) | Paddle Star trajectories, sleep lifecycle, explicit spell shards and Portal Jump returns | Registered in batch 15; validation complete |

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
