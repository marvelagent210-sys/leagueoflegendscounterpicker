# Counters to Cho'Gath (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 37 other champions with a simulator kit against Cho'Gath: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Cho'Gath wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Chogath --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.91 | +1.00 | +1.00 | +1.00 | +0.71 | +1.00 | +0.00 |
| 2 | Teemo | +0.89 | +1.00 | +1.00 | +1.00 | +0.62 | +1.00 | +0.00 |
| 3 | Fiora | +0.86 | +1.00 | +1.00 | +1.00 | +0.17 | – | +1.00 |
| 4 | Quinn | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 5 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 6 | Aurora | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 7 | Aatrox | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 8 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 9 | Mordekaiser | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 10 | Darius | +0.75 | +1.00 | +1.00 | +1.00 | −0.19 | – | +0.00 |
| 11 | Zaahen | +0.75 | +1.00 | +1.00 | +1.00 | −0.19 | – | +0.00 |
| 12 | Trundle | +0.74 | +1.00 | +1.00 | +1.00 | −0.25 | – | +0.00 |
| 13 | Volibear | +0.72 | +0.99 | +0.93 | +0.93 | −0.14 | – | +0.00 |
| 14 | Dr. Mundo | +0.70 | +1.00 | +0.72 | +1.00 | +0.01 | – | +0.00 |
| 15 | Kennen | +0.50 | +0.38 | +0.38 | +1.00 | +0.10 | +0.93 | +0.00 |
| 16 | Poppy | +0.25 | +1.00 | −1.00 | +1.00 | +0.14 | – | +0.00 |
| 17 | Nasus | +0.02 | +0.04 | +0.04 | +0.05 | −0.10 | – | +0.00 |
| 18 | Singed | +0.01 | +0.03 | +0.03 | +0.10 | −0.21 | – | +0.00 |
| 19 | Jax | −0.06 | −1.00 | +0.00 | +1.00 | −0.04 | – | +0.00 |
| 20 | Ornn | −0.12 | −0.04 | −0.04 | −0.51 | +0.10 | – | +0.00 |
| 21 | Yone | −0.31 | −0.50 | −0.33 | −0.35 | +0.00 | – | +0.00 |
| 22 | Shen | −0.34 | −0.59 | −0.59 | −0.13 | +0.06 | – | +0.00 |
| 23 | Ambessa | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 24 | Garen | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 25 | Malphite | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 26 | Camille | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 27 | Yasuo | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 28 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 29 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 30 | Sett | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 31 | Irelia | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 32 | Rumble | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 33 | Renekton | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 34 | Pantheon | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 35 | Riven | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 36 | Tryndamere | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 37 | Olaf | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Cho'Gath's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Cho'Gath's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Chogath` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.78)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Cho'Gath's (500 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Sivir basic attacks → Cho'Gath basic attacks)
- **0.55** spell shield: Spell Shield's spell shield blocks Cho'Gath's Feast. Spell shield for 1.5 s, long enough to use ahead of Feast. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Cho'Gath R Feast)
- **0.42** spell shield: Spell Shield's spell shield blocks Cho'Gath's Rupture. Spell shield for 1.5 s, long enough to use ahead of Rupture. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Cho'Gath Q Rupture)

#### 2. Elise (net +1.49)

- **0.65** range: Elise's basic attacks reach 425 units farther than Cho'Gath's (550 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Elise basic attacks → Cho'Gath basic attacks)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Cho'Gath's Feast. Untargetable for 0.6 s; Feast takes 0.25 s to land, enough to react. (Elise E Rappel → Cho'Gath R Feast)
- **0.42** untargetable: Rappel makes Elise untargetable, dodging Cho'Gath's Rupture. Untargetable for 0.6 s; Rupture takes 0.5 s to land, enough to react. (Elise E Rappel → Cho'Gath Q Rupture)

#### 3. Kindred (net +1.43)

- **0.94** range: Kindred's basic attacks reach 375 units farther than Cho'Gath's (500 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Kindred basic attacks → Cho'Gath basic attacks)
- **0.39** invulnerable: Lamb's Respite makes Kindred invulnerable to Cho'Gath's Feast. Invulnerable for ?; Feast takes 0.25 s to land, enough to react. (Kindred R Lamb's Respite → Cho'Gath R Feast)
- **0.15** invulnerable: Lamb's Respite makes Kindred invulnerable to Cho'Gath's Rupture (its crowd control still applies). Invulnerable for ?; Rupture takes 0.5 s to land, enough to react. (Kindred R Lamb's Respite → Cho'Gath Q Rupture)

#### 4. Bard (net +1.40)

- **0.72** range: Bard's basic attacks reach 375 units farther than Cho'Gath's (500 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Bard basic attacks → Cho'Gath basic attacks)
- **0.47** untargetable: Tempered Fate makes Bard untargetable, dodging Cho'Gath's Feast. Untargetable for 2.5 s, long enough to use ahead of Feast. (Bard R Tempered Fate → Cho'Gath R Feast)
- **0.31** untargetable: Tempered Fate makes Bard untargetable, dodging Cho'Gath's Rupture. Untargetable for 2.5 s, long enough to use ahead of Rupture. (Bard R Tempered Fate → Cho'Gath Q Rupture)

#### 5. Xayah (net +1.40)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Cho'Gath's (525 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Xayah basic attacks → Cho'Gath basic attacks)
- **0.42** untargetable: Featherstorm makes Xayah untargetable, dodging Cho'Gath's Feast. Untargetable for 1.5 s, long enough to use ahead of Feast. (Xayah R Featherstorm → Cho'Gath R Feast)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Cho'Gath's Rupture. Untargetable for 1.5 s, long enough to use ahead of Rupture. (Xayah R Featherstorm → Cho'Gath Q Rupture)

#### 6. Yuumi (net +1.30)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Cho'Gath's Rupture. Untargetable for ?; Rupture takes 0.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Cho'Gath Q Rupture)
- **0.64** range: Yuumi's basic attacks reach 300 units farther than Cho'Gath's (425 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Yuumi basic attacks → Cho'Gath basic attacks)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Cho'Gath's Feast. Untargetable for ?; Feast takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Cho'Gath R Feast)
- Watch out: Rupture's airborne interrupts Yuumi's Final Chapter (normal channel).

#### 7. Kayle (net +1.30)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Cho'Gath's (625 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Kayle basic attacks → Cho'Gath basic attacks)
- **0.47** invulnerable: Divine Judgment makes Kayle invulnerable to Cho'Gath's Feast. Invulnerable for 2.5 s, long enough to use ahead of Feast. (Kayle R Divine Judgment → Cho'Gath R Feast)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Cho'Gath's Rupture (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Rupture. (Kayle R Divine Judgment → Cho'Gath Q Rupture)

#### 8. Aurora (net +1.21)

- **0.58** range: Aurora's basic attacks reach 425 units farther than Cho'Gath's (550 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Aurora basic attacks → Cho'Gath basic attacks)
- **0.42** untargetable: Between Worlds makes Aurora untargetable, dodging Cho'Gath's Feast. Untargetable for 0.4 s; Feast takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Cho'Gath R Feast)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Cho'Gath's Rupture. Untargetable for 0.4 s; Rupture takes 0.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Cho'Gath Q Rupture)

#### 9. Lissandra (net +1.12)

- **0.47** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Cho'Gath's Feast. Untargetable for 2.5 s, long enough to use ahead of Feast. (Lissandra R Frozen Tomb → Cho'Gath R Feast)
- **0.44** range: Lissandra's basic attacks reach 425 units farther than Cho'Gath's (550 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Lissandra basic attacks → Cho'Gath basic attacks)
- **0.31** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Cho'Gath's Rupture. Untargetable for 2.5 s, long enough to use ahead of Rupture. (Lissandra R Frozen Tomb → Cho'Gath Q Rupture)

#### 10. Vladimir (net +1.11)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Cho'Gath's Feast. Untargetable for 2 s, long enough to use ahead of Feast. (Vladimir W Sanguine Pool → Cho'Gath R Feast)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Cho'Gath's Rupture. Untargetable for 2 s, long enough to use ahead of Rupture. (Vladimir W Sanguine Pool → Cho'Gath Q Rupture)
- **0.36** range: Vladimir's basic attacks reach 325 units farther than Cho'Gath's (450 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Vladimir basic attacks → Cho'Gath basic attacks)
- Watch out: Rupture's airborne interrupts Vladimir's Tides of Blood (charge-up).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.78 | 1.78 | 0.00 | range (attacks) |
| 2 | Elise | +1.49 | 1.49 | 0.00 | range (attacks) |
| 3 | Kindred | +1.43 | 1.43 | 0.00 | range (attacks) |
| 4 | Bard | +1.40 | 1.40 | 0.00 | range (attacks) |
| 5 | Xayah | +1.40 | 1.40 | 0.00 | range (attacks) |
| 6 | Yuumi | +1.30 | 1.73 | 0.43 | range (attacks) |
| 7 | Kayle | +1.30 | 1.30 | 0.00 | range (attacks) |
| 8 | Aurora | +1.21 | 1.21 | 0.00 | range (attacks) |
| 9 | Lissandra | +1.12 | 1.12 | 0.00 |  |
| 10 | Vladimir | +1.11 | 1.21 | 0.10 |  |
| 11 | Teemo | +1.06 | 1.06 | 0.00 | range (attacks) |
| 12 | Lulu | +0.99 | 0.99 | 0.00 | range (attacks) |
| 13 | Nocturne | +0.96 | 0.96 | 0.00 |  |
| 14 | Kalista | +0.95 | 0.95 | 0.00 | range (attacks) |
| 15 | Morgana | +0.95 | 0.95 | 0.00 |  |
| 16 | Milio | +0.93 | 0.93 | 0.00 | range (attacks) |
| 17 | Maokai | +0.92 | 0.92 | 0.00 |  |
| 18 | Fiora | +0.91 | 0.91 | 0.00 |  |
| 19 | Samira | +0.89 | 0.89 | 0.00 | range (attacks) |
| 20 | Zeri | +0.88 | 0.88 | 0.00 | range (attacks) |
| 21 | Aphelios | +0.87 | 0.87 | 0.00 | range (attacks) |
| 22 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 23 | Udyr | +0.86 | 0.86 | 0.00 |  |
| 24 | Vayne | +0.86 | 0.86 | 0.00 | range (attacks) |
| 25 | Gwen | +0.84 | 0.84 | 0.00 |  |
| 26 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 27 | Mel | +0.80 | 0.80 | 0.00 | range (attacks) |
| 28 | Ekko | +0.77 | 0.77 | 0.00 |  |
| 29 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 30 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 31 | Master Yi | +0.74 | 0.97 | 0.23 |  |
| 32 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 33 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 34 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 35 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 36 | Rek'Sai | +0.69 | 0.69 | 0.00 |  |
| 37 | Evelynn | +0.68 | 0.68 | 0.00 |  |
| 38 | Shaco | +0.68 | 0.68 | 0.00 |  |
| 39 | Corki | +0.67 | 0.67 | 0.00 | range (attacks) |
| 40 | Camille | +0.66 | 0.66 | 0.00 |  |
| 41 | Gnar | +0.66 | 0.66 | 0.00 | range (attacks) |
| 42 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 43 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 44 | Smolder | +0.65 | 0.65 | 0.00 | range (attacks) |
| 45 | Viktor | +0.65 | 0.65 | 0.00 | range (attacks) |
| 46 | Zilean | +0.65 | 0.65 | 0.00 | range (attacks) |
| 47 | Zoe | +0.65 | 0.65 | 0.00 | range (attacks) |
| 48 | Kled | +0.64 | 0.64 | 0.00 |  |
| 49 | Zed | +0.63 | 0.63 | 0.00 |  |
| 50 | Jayce | +0.61 | 0.61 | 0.00 | range (attacks) |
| 51 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 52 | Vex | +0.60 | 0.60 | 0.00 | range (attacks) |
| 53 | Pantheon | +0.59 | 0.70 | 0.11 |  |
| 54 | Jinx | +0.58 | 0.58 | 0.00 | range (attacks) |
| 55 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 56 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 57 | Seraphine | +0.58 | 0.58 | 0.00 | range (attacks) |
| 58 | Rengar | +0.55 | 0.55 | 0.00 |  |
| 59 | Quinn | +0.54 | 0.77 | 0.23 | range (attacks) |
| 60 | Varus | +0.54 | 0.65 | 0.11 | range (attacks) |
| 61 | Kog'Maw | +0.54 | 0.54 | 0.00 | range (attacks) |
| 62 | Azir | +0.53 | 0.53 | 0.00 | range (attacks) |
| 63 | Orianna | +0.53 | 0.53 | 0.00 | range (attacks) |
| 64 | Soraka | +0.53 | 0.53 | 0.00 | range (attacks) |
| 65 | Ziggs | +0.53 | 0.53 | 0.00 | range (attacks) |
| 66 | Nilah | +0.52 | 0.52 | 0.00 |  |
| 67 | Xin Zhao | +0.52 | 0.52 | 0.00 |  |
| 68 | Twisted Fate | +0.51 | 0.86 | 0.35 | range (attacks) |
| 69 | Heimerdinger | +0.50 | 0.50 | 0.00 |  |
| 70 | Graves | +0.49 | 0.49 | 0.00 |  |
| 71 | Taric | +0.49 | 0.49 | 0.00 |  |
| 72 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 73 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 74 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 75 | Gangplank | +0.47 | 0.47 | 0.00 |  |
| 76 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 77 | Malzahar | +0.45 | 0.85 | 0.40 |  |
| 78 | Caitlyn | +0.44 | 0.72 | 0.28 | range (attacks) |
| 79 | Lucian | +0.44 | 0.72 | 0.28 | range (attacks) |
| 80 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 81 | Annie | +0.44 | 0.44 | 0.00 |  |
| 82 | Brand | +0.44 | 0.44 | 0.00 |  |
| 83 | Cassiopeia | +0.44 | 0.44 | 0.00 |  |
| 84 | Karma | +0.44 | 0.44 | 0.00 |  |
| 85 | LeBlanc | +0.44 | 0.44 | 0.00 |  |
| 86 | Nami | +0.44 | 0.44 | 0.00 |  |
| 87 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 88 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 89 | Swain | +0.42 | 0.42 | 0.00 |  |
| 90 | Akshan | +0.40 | 0.68 | 0.28 | range (attacks) |
| 91 | Braum | +0.39 | 0.39 | 0.00 |  |
| 92 | Olaf | +0.39 | 0.39 | 0.00 |  |
| 93 | Thresh | +0.39 | 0.39 | 0.00 |  |
| 94 | Zaahen | +0.39 | 0.39 | 0.00 |  |
| 95 | Miss Fortune | +0.37 | 0.65 | 0.28 | range (attacks) |
| 96 | Aurelion Sol | +0.34 | 0.44 | 0.10 |  |
| 97 | Janna | +0.32 | 0.72 | 0.40 | range (attacks) |
| 98 | Alistar | +0.31 | 0.31 | 0.00 |  |
| 99 | Jax | +0.31 | 0.31 | 0.00 |  |
| 100 | Urgot | +0.30 | 0.30 | 0.00 |  |
| 101 | Yasuo | +0.30 | 0.30 | 0.00 |  |
| 102 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 103 | Garen | +0.27 | 0.27 | 0.00 |  |
| 104 | Malphite | +0.26 | 0.26 | 0.00 |  |
| 105 | Jhin | +0.25 | 0.53 | 0.28 | range (attacks) |
| 106 | Vel'Koz | +0.25 | 0.53 | 0.28 | range (attacks) |
| 107 | Rakan | +0.25 | 0.25 | 0.00 |  |
| 108 | Kayn | +0.23 | 0.68 | 0.45 |  |
| 109 | Ivern | +0.23 | 0.38 | 0.15 |  |
| 110 | Sion | +0.22 | 0.40 | 0.18 |  |
| 111 | Lillia | +0.22 | 0.22 | 0.00 |  |
| 112 | Xerath | +0.20 | 0.53 | 0.33 | range (attacks) |
| 113 | Singed | +0.18 | 0.18 | 0.00 |  |
| 114 | K'Sante | +0.14 | 0.14 | 0.00 |  |
| 115 | Ryze | +0.13 | 0.48 | 0.35 |  |
| 116 | Skarner | +0.13 | 0.13 | 0.00 |  |
| 117 | Karthus | +0.11 | 0.39 | 0.28 |  |
| 118 | Irelia | +0.10 | 0.10 | 0.00 |  |
| 119 | Warwick | +0.07 | 0.47 | 0.40 |  |
| 120 | Hecarim | +0.07 | 0.07 | 0.00 |  |
| 121 | Illaoi | +0.07 | 0.07 | 0.00 |  |
| 122 | Jarvan IV | +0.07 | 0.07 | 0.00 |  |
| 123 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 124 | Ornn | +0.07 | 0.07 | 0.00 |  |
| 125 | Sett | +0.07 | 0.07 | 0.00 |  |
| 126 | Shyvana | +0.07 | 0.07 | 0.00 |  |
| 127 | Volibear | +0.07 | 0.07 | 0.00 |  |
| 128 | Yone | +0.07 | 0.07 | 0.00 |  |
| 129 | Taliyah | +0.05 | 0.53 | 0.48 | range (attacks) |
| 130 | Viego | +0.01 | 0.26 | 0.25 |  |
| 131 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 132 | Akali | 0.00 | 0.00 | 0.00 |  |
| 133 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 134 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 135 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 136 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 137 | Briar | 0.00 | 0.00 | 0.00 |  |
| 138 | Darius | 0.00 | 0.00 | 0.00 |  |
| 139 | Diana | 0.00 | 0.00 | 0.00 |  |
| 140 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 141 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 142 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 143 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 144 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 145 | Leona | 0.00 | 0.00 | 0.00 |  |
| 146 | Locke | 0.00 | 0.00 | 0.00 |  |
| 147 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 148 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 149 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 150 | Rell | 0.00 | 0.00 | 0.00 |  |
| 151 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 152 | Riven | 0.00 | 0.00 | 0.00 |  |
| 153 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 154 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 155 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 156 | Talon | 0.00 | 0.00 | 0.00 |  |
| 157 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 158 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 159 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 160 | Rammus | -0.06 | 0.29 | 0.35 |  |
| 161 | Fiddlesticks | -0.08 | 0.39 | 0.47 |  |
| 162 | Shen | -0.16 | 0.29 | 0.45 |  |
| 163 | Katarina | -0.16 | 0.12 | 0.28 |  |
| 164 | Galio | -0.18 | 0.00 | 0.18 |  |
| 165 | Pyke | -0.18 | 0.00 | 0.18 |  |
| 166 | Gragas | -0.20 | 0.00 | 0.20 |  |
| 167 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 168 | Nunu & Willump | -0.26 | 0.23 | 0.49 |  |
| 169 | Vi | -0.43 | 0.07 | 0.50 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Zac | -0.50 | 0.00 | 0.50 |  |
