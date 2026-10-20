# Counters to Cho'Gath (patch 26.20)

## Simulated duels

The duel simulator played each of the 94 other champions with a simulator kit against Cho'Gath: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Cho'Gath wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Chogath --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | +0.03 | – | +1.00 |
| 2 | Kayle | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 3 | Corki | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 4 | Kog'Maw | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 5 | Ashe | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 6 | Xayah | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 7 | Miss Fortune | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 8 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 9 | Aurora | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 10 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 11 | Sivir | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 12 | Quinn | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 13 | Varus | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 14 | Jinx | +0.81 | +0.99 | +0.99 | +0.97 | +0.12 | +1.00 | +0.00 |
| 15 | Kalista | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 16 | Aatrox | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 17 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.24 | – | +1.00 |
| 18 | K'Sante | +0.79 | +1.00 | +1.00 | +0.83 | +0.16 | +1.00 | +0.00 |
| 19 | Kled | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 20 | Yorick | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 21 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 22 | Morgana | +0.77 | +0.85 | +0.99 | +0.99 | +0.10 | +0.95 | +0.00 |
| 23 | Yasuo | +0.76 | +1.00 | +0.93 | +1.00 | +0.03 | – | +0.00 |
| 24 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 25 | Nasus | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 26 | Gwen | +0.75 | +0.93 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 27 | Zaahen | +0.74 | +1.00 | +1.00 | +1.00 | −0.21 | – | +0.00 |
| 28 | Mordekaiser | +0.73 | +0.91 | +0.91 | +1.00 | +0.01 | – | +0.00 |
| 29 | Gnar | +0.68 | +0.89 | +0.89 | +0.53 | +0.19 | +1.00 | +0.00 |
| 30 | Volibear | +0.67 | +0.90 | +0.90 | +0.90 | −0.14 | – | +0.00 |
| 31 | Annie | +0.61 | +1.00 | +1.00 | +0.00 | +0.09 | +1.00 | +0.00 |
| 32 | Lux | +0.54 | +0.29 | +0.91 | +0.75 | +0.14 | +0.66 | +0.00 |
| 33 | Heimerdinger | +0.51 | +0.10 | +0.95 | +0.99 | +0.13 | +0.27 | +0.00 |
| 34 | Xin Zhao | +0.33 | +1.00 | +1.00 | −1.00 | +0.00 | – | +0.00 |
| 35 | Draven | +0.30 | +1.00 | +0.53 | −1.00 | +0.11 | +1.00 | +0.00 |
| 36 | Zyra | +0.11 | +0.13 | +0.12 | +0.15 | +0.04 | +0.11 | +0.00 |
| 37 | Vel'Koz | +0.04 | +0.28 | +0.21 | −0.39 | +0.23 | −0.43 | +0.00 |
| 38 | Anivia | +0.03 | +0.04 | −0.00 | −0.01 | +0.00 | +0.22 | +0.00 |
| 39 | Ezreal | −0.07 | −0.06 | +0.81 | −1.00 | +0.10 | −0.70 | +0.00 |
| 40 | Gangplank | −0.20 | −1.00 | +1.00 | −1.00 | +0.11 | – | +0.00 |
| 41 | Sion | −0.23 | +0.00 | +0.00 | −1.00 | −0.05 | – | +0.00 |
| 42 | Singed | −0.25 | −1.00 | +0.10 | +0.16 | −0.23 | – | +0.00 |
| 43 | Tahm Kench | −0.28 | −0.09 | −0.09 | −1.00 | −0.04 | – | +0.00 |
| 44 | Kennen | −0.33 | −0.48 | −0.46 | −1.00 | +0.06 | +1.00 | +0.00 |
| 45 | Brand | −0.52 | −1.00 | +0.05 | −1.00 | +0.10 | −1.00 | +0.00 |
| 46 | Twitch | −0.54 | +0.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 47 | Jayce | −0.55 | −1.00 | −1.00 | +0.00 | +0.05 | – | +0.00 |
| 48 | Jax | −0.56 | −1.00 | −1.00 | +0.00 | −0.04 | – | +0.00 |
| 49 | Lucian | −0.58 | −1.00 | −1.00 | −1.00 | +0.11 | +1.00 | +0.00 |
| 50 | Tristana | −0.69 | −1.00 | −1.00 | −1.00 | +0.07 | +0.00 | +0.00 |
| 51 | Jhin | −0.72 | −0.99 | −0.79 | −1.00 | +0.13 | −0.95 | +0.00 |
| 52 | Poppy | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 53 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 54 | Shen | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 55 | Master Yi | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 56 | Malphite | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 57 | Cassiopeia | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | +0.00 |
| 58 | Ambessa | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 59 | Ziggs | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 60 | Riven | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 61 | Camille | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 62 | Illaoi | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 63 | Sett | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 64 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 65 | Karthus | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 66 | Garen | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 67 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 68 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 69 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 70 | Yone | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 71 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 72 | Irelia | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 73 | Rumble | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 74 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 75 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 76 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 77 | Malzahar | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 78 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 79 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 80 | Gragas | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 81 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 82 | Warwick | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 83 | Pantheon | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 84 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 85 | Renekton | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 86 | Smolder | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 87 | Wukong | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 88 | Tryndamere | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 89 | Samira | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 90 | Udyr | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 91 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 92 | Olaf | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 93 | Kai'Sa | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 94 | Rammus | −0.82 | −1.00 | −1.00 | −1.00 | −0.26 | – | +0.00 |

## Interaction ledger estimates

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

#### 2. Bard (net +1.43)

- **0.72** range: Bard's basic attacks reach 375 units farther than Cho'Gath's (500 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Bard basic attacks → Cho'Gath basic attacks)
- **0.47** untargetable: Tempered Fate makes Bard untargetable, dodging Cho'Gath's Feast. Untargetable for 2.5 s, long enough to use ahead of Feast. (Bard R Tempered Fate → Cho'Gath R Feast)
- **0.31** untargetable: Tempered Fate makes Bard untargetable, dodging Cho'Gath's Rupture. Untargetable for 2.5 s, long enough to use ahead of Rupture. (Bard R Tempered Fate → Cho'Gath Q Rupture)

#### 3. Xayah (net +1.43)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Cho'Gath's (525 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Xayah basic attacks → Cho'Gath basic attacks)
- **0.42** untargetable: Featherstorm makes Xayah untargetable, dodging Cho'Gath's Feast. Untargetable for 1.5 s, long enough to use ahead of Feast. (Xayah R Featherstorm → Cho'Gath R Feast)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Cho'Gath's Rupture. Untargetable for 1.5 s, long enough to use ahead of Rupture. (Xayah R Featherstorm → Cho'Gath Q Rupture)

#### 4. Kayle (net +1.31)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Cho'Gath's (625 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Kayle basic attacks → Cho'Gath basic attacks)
- **0.47** invulnerable: Divine Judgment makes Kayle invulnerable to Cho'Gath's Feast. Invulnerable for 2.5 s, long enough to use ahead of Feast. (Kayle R Divine Judgment → Cho'Gath R Feast)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Cho'Gath's Rupture (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Rupture. (Kayle R Divine Judgment → Cho'Gath Q Rupture)

#### 5. Aurora (net +1.24)

- **0.58** range: Aurora's basic attacks reach 425 units farther than Cho'Gath's (550 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Aurora basic attacks → Cho'Gath basic attacks)
- **0.42** untargetable: Between Worlds makes Aurora untargetable, dodging Cho'Gath's Feast. Untargetable for 0.4 s; Feast takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Cho'Gath R Feast)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Cho'Gath's Rupture. Untargetable for 0.4 s; Rupture takes 0.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Cho'Gath Q Rupture)

#### 6. Lissandra (net +1.15)

- **0.47** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Cho'Gath's Feast. Untargetable for 2.5 s, long enough to use ahead of Feast. (Lissandra R Frozen Tomb → Cho'Gath R Feast)
- **0.44** range: Lissandra's basic attacks reach 425 units farther than Cho'Gath's (550 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Lissandra basic attacks → Cho'Gath basic attacks)
- **0.31** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Cho'Gath's Rupture. Untargetable for 2.5 s, long enough to use ahead of Rupture. (Lissandra R Frozen Tomb → Cho'Gath Q Rupture)

#### 7. Vladimir (net +1.07)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Cho'Gath's Feast. Untargetable for 2 s, long enough to use ahead of Feast. (Vladimir W Sanguine Pool → Cho'Gath R Feast)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Cho'Gath's Rupture. Untargetable for 2 s, long enough to use ahead of Rupture. (Vladimir W Sanguine Pool → Cho'Gath Q Rupture)
- **0.36** range: Vladimir's basic attacks reach 325 units farther than Cho'Gath's (450 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Vladimir basic attacks → Cho'Gath basic attacks)
- Watch out: Rupture's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 8. Teemo (net +1.06)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Cho'Gath's (500 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Teemo basic attacks → Cho'Gath basic attacks)
- **0.38** blind: Blinding Dart's blind makes Cho'Gath's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Cho'Gath basic attacks)

#### 9. Fizz (net +1.04)

- **0.60** untargetable: Playful makes Fizz untargetable, dodging Cho'Gath's Rupture. Untargetable for 0.75 s; Rupture takes 0.5 s to land, enough to react. (Fizz E Playful → Cho'Gath Q Rupture)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Cho'Gath's Feast. Untargetable for 0.75 s; Feast takes 0.25 s to land, enough to react. (Fizz E Playful → Cho'Gath R Feast)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Cho'Gath's Feral Scream. Untargetable for 0.75 s; Feral Scream takes 0.5 s to land, enough to react. (Fizz E Playful → Cho'Gath W Feral Scream)

#### 10. Lulu (net +0.99)

- **0.72** range: Lulu's basic attacks reach 425 units farther than Cho'Gath's (550 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Lulu basic attacks → Cho'Gath basic attacks)
- **0.27** disarm: Whimsy disarms Cho'Gath for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Cho'Gath basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.78 | 1.78 | 0.00 | range (attacks) |
| 2 | Bard | +1.43 | 1.43 | 0.00 | range (attacks) |
| 3 | Xayah | +1.43 | 1.43 | 0.00 | range (attacks) |
| 4 | Kayle | +1.31 | 1.31 | 0.00 | range (attacks) |
| 5 | Aurora | +1.24 | 1.24 | 0.00 | range (attacks) |
| 6 | Lissandra | +1.15 | 1.15 | 0.00 |  |
| 7 | Vladimir | +1.07 | 1.25 | 0.18 |  |
| 8 | Teemo | +1.06 | 1.06 | 0.00 | range (attacks) |
| 9 | Fizz | +1.04 | 1.04 | 0.00 |  |
| 10 | Lulu | +0.99 | 0.99 | 0.00 | range (attacks) |
| 11 | Yuumi | +0.97 | 1.81 | 0.84 | range (attacks) |
| 12 | Maokai | +0.96 | 0.96 | 0.00 |  |
| 13 | Nocturne | +0.96 | 0.96 | 0.00 |  |
| 14 | Kalista | +0.95 | 0.95 | 0.00 | range (attacks) |
| 15 | Morgana | +0.95 | 0.95 | 0.00 |  |
| 16 | Fiora | +0.94 | 0.94 | 0.00 |  |
| 17 | Kindred | +0.94 | 0.94 | 0.00 | range (attacks) |
| 18 | Milio | +0.93 | 0.93 | 0.00 | range (attacks) |
| 19 | Samira | +0.89 | 0.89 | 0.00 | range (attacks) |
| 20 | Gwen | +0.88 | 0.88 | 0.00 |  |
| 21 | Zeri | +0.88 | 0.88 | 0.00 | range (attacks) |
| 22 | Aphelios | +0.87 | 0.87 | 0.00 | range (attacks) |
| 23 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 24 | Udyr | +0.86 | 0.86 | 0.00 |  |
| 25 | Vayne | +0.86 | 0.86 | 0.00 | range (attacks) |
| 26 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 27 | Mel | +0.80 | 0.80 | 0.00 | range (attacks) |
| 28 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 29 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 30 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 31 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 32 | Rek'Sai | +0.72 | 0.72 | 0.00 |  |
| 33 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 34 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 35 | Evelynn | +0.71 | 0.71 | 0.00 |  |
| 36 | Shaco | +0.71 | 0.71 | 0.00 |  |
| 37 | Camille | +0.68 | 0.68 | 0.00 |  |
| 38 | Gnar | +0.66 | 0.66 | 0.00 | range (attacks) |
| 39 | Zed | +0.66 | 0.66 | 0.00 |  |
| 40 | Corki | +0.65 | 0.65 | 0.00 | range (attacks) |
| 41 | Elise | +0.65 | 0.65 | 0.00 | range (attacks) |
| 42 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 43 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 44 | Smolder | +0.65 | 0.65 | 0.00 | range (attacks) |
| 45 | Viktor | +0.65 | 0.65 | 0.00 | range (attacks) |
| 46 | Zilean | +0.65 | 0.65 | 0.00 | range (attacks) |
| 47 | Zoe | +0.65 | 0.65 | 0.00 | range (attacks) |
| 48 | Kled | +0.64 | 0.64 | 0.00 |  |
| 49 | Jayce | +0.61 | 0.61 | 0.00 | range (attacks) |
| 50 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 51 | Vex | +0.60 | 0.60 | 0.00 | range (attacks) |
| 52 | Jinx | +0.58 | 0.58 | 0.00 | range (attacks) |
| 53 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 54 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 55 | Seraphine | +0.58 | 0.58 | 0.00 | range (attacks) |
| 56 | Master Yi | +0.55 | 1.01 | 0.46 |  |
| 57 | Rengar | +0.55 | 0.55 | 0.00 |  |
| 58 | Kog'Maw | +0.54 | 0.54 | 0.00 | range (attacks) |
| 59 | Xin Zhao | +0.54 | 0.54 | 0.00 |  |
| 60 | Azir | +0.53 | 0.53 | 0.00 | range (attacks) |
| 61 | Orianna | +0.53 | 0.53 | 0.00 | range (attacks) |
| 62 | Soraka | +0.53 | 0.53 | 0.00 | range (attacks) |
| 63 | Ziggs | +0.53 | 0.53 | 0.00 | range (attacks) |
| 64 | Nilah | +0.52 | 0.52 | 0.00 |  |
| 65 | Heimerdinger | +0.50 | 0.50 | 0.00 |  |
| 66 | Graves | +0.49 | 0.49 | 0.00 |  |
| 67 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 68 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 69 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 70 | Gangplank | +0.47 | 0.47 | 0.00 |  |
| 71 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 72 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 73 | Annie | +0.44 | 0.44 | 0.00 |  |
| 74 | Brand | +0.44 | 0.44 | 0.00 |  |
| 75 | Cassiopeia | +0.44 | 0.44 | 0.00 |  |
| 76 | Karma | +0.44 | 0.44 | 0.00 |  |
| 77 | LeBlanc | +0.44 | 0.44 | 0.00 |  |
| 78 | Nami | +0.44 | 0.44 | 0.00 |  |
| 79 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 80 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 81 | Varus | +0.43 | 0.65 | 0.22 | range (attacks) |
| 82 | Swain | +0.42 | 0.42 | 0.00 |  |
| 83 | Braum | +0.39 | 0.39 | 0.00 |  |
| 84 | Olaf | +0.39 | 0.39 | 0.00 |  |
| 85 | Thresh | +0.39 | 0.39 | 0.00 |  |
| 86 | Zaahen | +0.39 | 0.39 | 0.00 |  |
| 87 | Quinn | +0.34 | 0.77 | 0.43 | range (attacks) |
| 88 | Alistar | +0.31 | 0.31 | 0.00 |  |
| 89 | Jax | +0.31 | 0.31 | 0.00 |  |
| 90 | Urgot | +0.30 | 0.30 | 0.00 |  |
| 91 | Yasuo | +0.30 | 0.30 | 0.00 |  |
| 92 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 93 | Garen | +0.27 | 0.27 | 0.00 |  |
| 94 | Aurelion Sol | +0.26 | 0.44 | 0.18 |  |
| 95 | Malphite | +0.26 | 0.26 | 0.00 |  |
| 96 | Rakan | +0.25 | 0.25 | 0.00 |  |
| 97 | Lillia | +0.22 | 0.22 | 0.00 |  |
| 98 | Singed | +0.18 | 0.18 | 0.00 |  |
| 99 | Twisted Fate | +0.16 | 0.86 | 0.70 | range (attacks) |
| 100 | Caitlyn | +0.16 | 0.72 | 0.56 | range (attacks) |
| 101 | Lucian | +0.16 | 0.72 | 0.56 | range (attacks) |
| 102 | K'Sante | +0.14 | 0.14 | 0.00 |  |
| 103 | Skarner | +0.13 | 0.13 | 0.00 |  |
| 104 | Akshan | +0.12 | 0.68 | 0.56 | range (attacks) |
| 105 | Irelia | +0.10 | 0.10 | 0.00 |  |
| 106 | Miss Fortune | +0.09 | 0.65 | 0.56 | range (attacks) |
| 107 | Sion | +0.08 | 0.40 | 0.32 |  |
| 108 | Ivern | +0.08 | 0.38 | 0.30 |  |
| 109 | Hecarim | +0.07 | 0.07 | 0.00 |  |
| 110 | Illaoi | +0.07 | 0.07 | 0.00 |  |
| 111 | Jarvan IV | +0.07 | 0.07 | 0.00 |  |
| 112 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 113 | Ornn | +0.07 | 0.07 | 0.00 |  |
| 114 | Sett | +0.07 | 0.07 | 0.00 |  |
| 115 | Shyvana | +0.07 | 0.07 | 0.00 |  |
| 116 | Volibear | +0.07 | 0.07 | 0.00 |  |
| 117 | Yone | +0.07 | 0.07 | 0.00 |  |
| 118 | Malzahar | +0.05 | 0.85 | 0.80 |  |
| 119 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 120 | Akali | 0.00 | 0.00 | 0.00 |  |
| 121 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 122 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 123 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 124 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 125 | Briar | 0.00 | 0.00 | 0.00 |  |
| 126 | Darius | 0.00 | 0.00 | 0.00 |  |
| 127 | Diana | 0.00 | 0.00 | 0.00 |  |
| 128 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 129 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 130 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 131 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 132 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 133 | Leona | 0.00 | 0.00 | 0.00 |  |
| 134 | Locke | 0.00 | 0.00 | 0.00 |  |
| 135 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 136 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 137 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 138 | Rell | 0.00 | 0.00 | 0.00 |  |
| 139 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 140 | Riven | 0.00 | 0.00 | 0.00 |  |
| 141 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 142 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 143 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 144 | Talon | 0.00 | 0.00 | 0.00 |  |
| 145 | Taric | 0.00 | 0.00 | 0.00 |  |
| 146 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 147 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 148 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 149 | Jhin | -0.03 | 0.53 | 0.56 | range (attacks) |
| 150 | Vel'Koz | -0.03 | 0.53 | 0.56 | range (attacks) |
| 151 | Janna | -0.08 | 0.72 | 0.80 | range (attacks) |
| 152 | Xerath | -0.12 | 0.53 | 0.65 | range (attacks) |
| 153 | Karthus | -0.17 | 0.39 | 0.56 |  |
| 154 | Kayn | -0.19 | 0.71 | 0.90 |  |
| 155 | Ryze | -0.22 | 0.48 | 0.70 |  |
| 156 | Viego | -0.22 | 0.26 | 0.48 |  |
| 157 | Pantheon | -0.30 | 0.71 | 1.01 |  |
| 158 | Rammus | -0.34 | 0.29 | 0.63 |  |
| 159 | Pyke | -0.34 | 0.00 | 0.34 |  |
| 160 | Gragas | -0.37 | 0.00 | 0.37 |  |
| 161 | Poppy | -0.40 | 0.00 | 0.40 |  |
| 162 | Taliyah | -0.43 | 0.53 | 0.96 | range (attacks) |
| 163 | Katarina | -0.44 | 0.12 | 0.56 |  |
| 164 | Fiddlesticks | -0.53 | 0.39 | 0.92 |  |
| 165 | Shen | -0.61 | 0.29 | 0.90 |  |
| 166 | Nunu & Willump | -0.75 | 0.23 | 0.98 |  |
| 167 | Vi | -0.83 | 0.07 | 0.90 |  |
| 168 | Warwick | -0.89 | 0.47 | 1.36 |  |
| 169 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 170 | Tahm Kench | -1.00 | 0.00 | 1.00 |  |
| 171 | Zac | -1.00 | 0.00 | 1.00 |  |
| 172 | Galio | -1.18 | 0.00 | 1.18 |  |
