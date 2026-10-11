# Counters to Darius (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 30 other champions with a simulator kit against Darius: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Darius wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Darius --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.89 | +1.00 | +1.00 | +1.00 | +0.59 | +1.00 | +0.00 |
| 2 | Teemo | +0.88 | +1.00 | +1.00 | +1.00 | +0.53 | +1.00 | +0.00 |
| 3 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 4 | Quinn | +0.70 | +1.00 | +0.48 | +1.00 | +0.23 | +1.00 | +0.00 |
| 5 | Fiora | +0.62 | +0.57 | +0.57 | +1.00 | +0.13 | – | +1.00 |
| 6 | Kennen | −0.09 | +0.92 | −1.00 | −1.00 | +0.19 | +1.00 | +0.00 |
| 7 | Cho'Gath | −0.75 | −1.00 | −1.00 | −1.00 | +0.19 | – | +0.00 |
| 8 | Ornn | −0.75 | −1.00 | −1.00 | −1.00 | +0.19 | – | +0.00 |
| 9 | Malphite | −0.75 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.00 |
| 10 | Riven | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 11 | Poppy | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 12 | Irelia | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 13 | Yone | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 14 | Aatrox | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 15 | Yasuo | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 16 | Camille | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 17 | Volibear | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 18 | Nasus | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 19 | Mordekaiser | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 20 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 21 | Garen | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 22 | Renekton | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 23 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 24 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 25 | Tryndamere | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 26 | Olaf | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 27 | Dr. Mundo | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 28 | Jax | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 29 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 30 | Gwen | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Darius's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Darius's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Darius` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.74)

- **0.81** range: Sivir's basic attacks reach 325 units farther than Darius's (500 vs 175 attack range). Darius has no dash or blink to close the gap. (Sivir basic attacks → Darius basic attacks)
- **0.65** spell shield: Spell Shield's spell shield blocks Darius's Apprehend. Spell shield for 1.5 s, long enough to use ahead of Apprehend. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Darius E Apprehend)
- **0.55** spell shield: Spell Shield's spell shield blocks Darius's Noxian Guillotine. Spell shield for 1.5 s, long enough to use ahead of Noxian Guillotine. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Darius R Noxian Guillotine)

#### 2. Elise (net +1.54)

- **0.65** untargetable: Rappel makes Elise untargetable, dodging Darius's Apprehend. Untargetable for 0.6 s; Apprehend takes 0.25 s to land, enough to react. (Elise E Rappel → Darius E Apprehend)
- **0.61** range: Elise's basic attacks reach 375 units farther than Darius's (550 vs 175 attack range). Darius has no dash or blink to close the gap. (Elise basic attacks → Darius basic attacks)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Darius's Noxian Guillotine. Untargetable for 0.6 s; Noxian Guillotine takes 0.37 s to land, enough to react. (Elise E Rappel → Darius R Noxian Guillotine)

#### 3. Bard (net +1.35)

- **0.62** range: Bard's basic attacks reach 325 units farther than Darius's (500 vs 175 attack range). Darius has no dash or blink to close the gap. (Bard basic attacks → Darius basic attacks)
- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Darius's Noxian Guillotine. Untargetable for 2.5 s, long enough to use ahead of Noxian Guillotine. (Bard R Tempered Fate → Darius R Noxian Guillotine)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Darius's Apprehend. Untargetable for 2.5 s, long enough to use ahead of Apprehend. (Bard R Tempered Fate → Darius E Apprehend)

#### 4. Xayah (net +1.33)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Darius's (525 vs 175 attack range). Darius has no dash or blink to close the gap. (Xayah basic attacks → Darius basic attacks)
- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Darius's Noxian Guillotine. Untargetable for 1.5 s, long enough to use ahead of Noxian Guillotine. (Xayah R Featherstorm → Darius R Noxian Guillotine)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Darius's Apprehend. Untargetable for 1.5 s, long enough to use ahead of Apprehend. (Xayah R Featherstorm → Darius E Apprehend)

#### 5. Kayle (net +1.27)

- **0.72** range: Kayle's basic attacks reach 450 units farther than Darius's (625 vs 175 attack range). Darius has no dash or blink to close the gap. (Kayle basic attacks → Darius basic attacks)
- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Darius's Noxian Guillotine. Invulnerable for 2.5 s, long enough to use ahead of Noxian Guillotine. (Kayle R Divine Judgment → Darius R Noxian Guillotine)

#### 6. Kindred (net +1.25)

- **0.81** range: Kindred's basic attacks reach 325 units farther than Darius's (500 vs 175 attack range). Darius has no dash or blink to close the gap. (Kindred basic attacks → Darius basic attacks)
- **0.44** invulnerable: Lamb's Respite makes Kindred invulnerable to Darius's Noxian Guillotine. Invulnerable for ?; Noxian Guillotine takes 0.37 s to land, enough to react. (Kindred R Lamb's Respite → Darius R Noxian Guillotine)

#### 7. Aurora (net +1.21)

- **0.54** range: Aurora's basic attacks reach 375 units farther than Darius's (550 vs 175 attack range). Darius has no dash or blink to close the gap. (Aurora basic attacks → Darius basic attacks)
- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Darius's Noxian Guillotine. Untargetable for 0.4 s; Noxian Guillotine takes 0.37 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Darius R Noxian Guillotine)
- **0.35** untargetable: Between Worlds makes Aurora untargetable, dodging Darius's Apprehend. Untargetable for 0.4 s; Apprehend takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Darius E Apprehend)

#### 8. Teemo (net +1.21)

- **0.59** range: Teemo's basic attacks reach 325 units farther than Darius's (500 vs 175 attack range). Darius has no dash or blink to close the gap. (Teemo basic attacks → Darius basic attacks)
- **0.47** blind: Blinding Dart's blind makes Darius's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Darius basic attacks)
- **0.30** blind: Blinding Dart's blind makes Darius's Crippling Strike, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Darius W Crippling Strike)

#### 9. Vladimir (net +1.20)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Darius's Apprehend. Untargetable for 2 s, long enough to use ahead of Apprehend. (Vladimir W Sanguine Pool → Darius E Apprehend)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Darius's Noxian Guillotine. Untargetable for 2 s, long enough to use ahead of Noxian Guillotine. (Vladimir W Sanguine Pool → Darius R Noxian Guillotine)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Darius's (450 vs 175 attack range). Darius has no dash or blink to close the gap. (Vladimir basic attacks → Darius basic attacks)
- Watch out: Apprehend's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 10. Lissandra (net +1.14)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Darius's Noxian Guillotine. Untargetable for 2.5 s, long enough to use ahead of Noxian Guillotine. (Lissandra R Frozen Tomb → Darius R Noxian Guillotine)
- **0.41** range: Lissandra's basic attacks reach 375 units farther than Darius's (550 vs 175 attack range). Darius has no dash or blink to close the gap. (Lissandra basic attacks → Darius basic attacks)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Darius's Apprehend. Untargetable for 2.5 s, long enough to use ahead of Apprehend. (Lissandra R Frozen Tomb → Darius E Apprehend)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.74 | 1.74 | 0.00 | range (attacks) |
| 2 | Elise | +1.54 | 1.54 | 0.00 | range (attacks) |
| 3 | Bard | +1.35 | 1.35 | 0.00 | range (attacks) |
| 4 | Xayah | +1.33 | 1.33 | 0.00 | range (attacks) |
| 5 | Kayle | +1.27 | 1.27 | 0.00 | range (attacks) |
| 6 | Kindred | +1.25 | 1.25 | 0.00 | range (attacks) |
| 7 | Aurora | +1.21 | 1.21 | 0.00 | range (attacks) |
| 8 | Teemo | +1.21 | 1.21 | 0.00 | range (attacks), blind (Blinding Dart) |
| 9 | Vladimir | +1.20 | 1.27 | 0.07 |  |
| 10 | Lissandra | +1.14 | 1.14 | 0.00 |  |
| 11 | Yuumi | +1.13 | 1.52 | 0.39 | range (attacks) |
| 12 | Fiora | +1.10 | 1.10 | 0.00 |  |
| 13 | Morgana | +1.07 | 1.07 | 0.00 |  |
| 14 | Nocturne | +1.05 | 1.05 | 0.00 |  |
| 15 | Lulu | +1.02 | 1.02 | 0.00 | range (attacks) |
| 16 | Maokai | +0.98 | 0.98 | 0.00 |  |
| 17 | Gwen | +0.93 | 0.93 | 0.00 |  |
| 18 | Master Yi | +0.89 | 1.06 | 0.17 |  |
| 19 | Kalista | +0.86 | 0.86 | 0.00 | range (attacks) |
| 20 | Zeri | +0.83 | 0.83 | 0.00 | range (attacks) |
| 21 | Aphelios | +0.82 | 0.82 | 0.00 | range (attacks) |
| 22 | Twitch | +0.81 | 0.81 | 0.00 | range (attacks) |
| 23 | Vayne | +0.81 | 0.81 | 0.00 | range (attacks) |
| 24 | Milio | +0.78 | 0.78 | 0.00 | range (attacks) |
| 25 | Sona | +0.77 | 0.77 | 0.00 | range (attacks) |
| 26 | Ekko | +0.76 | 0.76 | 0.00 |  |
| 27 | Rek'Sai | +0.75 | 0.75 | 0.00 |  |
| 28 | Udyr | +0.75 | 0.75 | 0.00 |  |
| 29 | Evelynn | +0.73 | 0.73 | 0.00 |  |
| 30 | Shaco | +0.73 | 0.73 | 0.00 |  |
| 31 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 32 | Renata Glasc | +0.72 | 0.72 | 0.00 | range (attacks) |
| 33 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 34 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 35 | Camille | +0.70 | 0.70 | 0.00 |  |
| 36 | Draven | +0.68 | 0.68 | 0.00 | range (attacks) |
| 37 | Cassiopeia | +0.67 | 0.67 | 0.00 |  |
| 38 | Kai'Sa | +0.67 | 0.67 | 0.00 | range (attacks) |
| 39 | Zed | +0.66 | 0.66 | 0.00 |  |
| 40 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 41 | Corki | +0.63 | 0.63 | 0.00 | range (attacks) |
| 42 | Varus | +0.61 | 0.71 | 0.10 | range (attacks) |
| 43 | Ezreal | +0.61 | 0.61 | 0.00 | range (attacks) |
| 44 | Smolder | +0.61 | 0.61 | 0.00 | range (attacks) |
| 45 | Zilean | +0.61 | 0.61 | 0.00 | range (attacks) |
| 46 | Zoe | +0.61 | 0.61 | 0.00 | range (attacks) |
| 47 | Gangplank | +0.59 | 0.59 | 0.00 |  |
| 48 | Rengar | +0.59 | 0.59 | 0.00 |  |
| 49 | Gnar | +0.57 | 0.57 | 0.00 | range (attacks) |
| 50 | Vex | +0.57 | 0.57 | 0.00 | range (attacks) |
| 51 | Viktor | +0.57 | 0.57 | 0.00 | range (attacks) |
| 52 | Jax | +0.55 | 0.55 | 0.00 |  |
| 53 | Kennen | +0.54 | 0.54 | 0.00 | range (attacks) |
| 54 | Lux | +0.54 | 0.54 | 0.00 | range (attacks) |
| 55 | Singed | +0.54 | 0.54 | 0.00 |  |
| 56 | Jayce | +0.53 | 0.53 | 0.00 | range (attacks) |
| 57 | Nidalee | +0.53 | 0.53 | 0.00 | range (attacks) |
| 58 | Samira | +0.53 | 0.53 | 0.00 | range (attacks) |
| 59 | Jinx | +0.51 | 0.51 | 0.00 | range (attacks) |
| 60 | Kled | +0.51 | 0.51 | 0.00 |  |
| 61 | Seraphine | +0.51 | 0.51 | 0.00 | range (attacks) |
| 62 | Quinn | +0.50 | 0.67 | 0.17 | range (attacks) |
| 63 | Mel | +0.50 | 0.50 | 0.00 | range (attacks) |
| 64 | Soraka | +0.50 | 0.50 | 0.00 | range (attacks) |
| 65 | Ziggs | +0.50 | 0.50 | 0.00 | range (attacks) |
| 66 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 67 | Xin Zhao | +0.48 | 0.48 | 0.00 |  |
| 68 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 69 | Pantheon | +0.47 | 0.55 | 0.08 |  |
| 70 | Azir | +0.47 | 0.47 | 0.00 |  |
| 71 | Heimerdinger | +0.47 | 0.47 | 0.00 |  |
| 72 | Kog'Maw | +0.47 | 0.47 | 0.00 |  |
| 73 | Orianna | +0.47 | 0.47 | 0.00 |  |
| 74 | Nilah | +0.45 | 0.45 | 0.00 |  |
| 75 | Veigar | +0.45 | 0.45 | 0.00 |  |
| 76 | Caitlyn | +0.44 | 0.72 | 0.28 | range (attacks) |
| 77 | Annie | +0.44 | 0.44 | 0.00 |  |
| 78 | Taric | +0.44 | 0.44 | 0.00 |  |
| 79 | Hwei | +0.43 | 0.43 | 0.00 |  |
| 80 | Ahri | +0.41 | 0.41 | 0.00 |  |
| 81 | Brand | +0.41 | 0.41 | 0.00 |  |
| 82 | Graves | +0.41 | 0.41 | 0.00 |  |
| 83 | Nami | +0.41 | 0.41 | 0.00 |  |
| 84 | Neeko | +0.41 | 0.41 | 0.00 |  |
| 85 | Syndra | +0.41 | 0.41 | 0.00 |  |
| 86 | Twisted Fate | +0.40 | 0.75 | 0.35 | range (attacks) |
| 87 | Olaf | +0.39 | 0.39 | 0.00 |  |
| 88 | Karma | +0.38 | 0.38 | 0.00 |  |
| 89 | LeBlanc | +0.38 | 0.38 | 0.00 |  |
| 90 | Zaahen | +0.38 | 0.38 | 0.00 |  |
| 91 | Nasus | +0.36 | 0.36 | 0.00 |  |
| 92 | Swain | +0.36 | 0.36 | 0.00 |  |
| 93 | Malzahar | +0.34 | 0.74 | 0.40 |  |
| 94 | Lucian | +0.34 | 0.62 | 0.28 | range (attacks) |
| 95 | Aurelion Sol | +0.34 | 0.41 | 0.07 |  |
| 96 | Miss Fortune | +0.33 | 0.61 | 0.28 | range (attacks) |
| 97 | Thresh | +0.33 | 0.33 | 0.00 |  |
| 98 | Akshan | +0.31 | 0.59 | 0.28 | range (attacks) |
| 99 | Sion | +0.31 | 0.42 | 0.11 |  |
| 100 | Alistar | +0.31 | 0.31 | 0.00 |  |
| 101 | Malphite | +0.31 | 0.31 | 0.00 |  |
| 102 | Kayn | +0.28 | 0.73 | 0.45 |  |
| 103 | Janna | +0.28 | 0.68 | 0.40 | range (attacks) |
| 104 | Garen | +0.24 | 0.24 | 0.00 |  |
| 105 | Urgot | +0.23 | 0.23 | 0.00 |  |
| 106 | Jhin | +0.22 | 0.50 | 0.28 | range (attacks) |
| 107 | Warwick | +0.22 | 0.47 | 0.25 |  |
| 108 | Ivern | +0.21 | 0.33 | 0.12 |  |
| 109 | Vel'Koz | +0.19 | 0.47 | 0.28 |  |
| 110 | Rakan | +0.18 | 0.18 | 0.00 |  |
| 111 | Lillia | +0.16 | 0.16 | 0.00 |  |
| 112 | Xerath | +0.15 | 0.47 | 0.32 |  |
| 113 | Rammus | +0.14 | 0.36 | 0.22 |  |
| 114 | K'Sante | +0.14 | 0.14 | 0.00 |  |
| 115 | Skarner | +0.12 | 0.12 | 0.00 |  |
| 116 | Ryze | +0.10 | 0.45 | 0.35 |  |
| 117 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 118 | Shen | +0.07 | 0.52 | 0.45 |  |
| 119 | Hecarim | +0.07 | 0.07 | 0.00 |  |
| 120 | Illaoi | +0.07 | 0.07 | 0.00 |  |
| 121 | Jarvan IV | +0.07 | 0.07 | 0.00 |  |
| 122 | Ornn | +0.07 | 0.07 | 0.00 |  |
| 123 | Sett | +0.07 | 0.07 | 0.00 |  |
| 124 | Shyvana | +0.07 | 0.07 | 0.00 |  |
| 125 | Volibear | +0.07 | 0.07 | 0.00 |  |
| 126 | Yone | +0.07 | 0.07 | 0.00 |  |
| 127 | Karthus | +0.05 | 0.33 | 0.28 |  |
| 128 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 129 | Akali | 0.00 | 0.00 | 0.00 |  |
| 130 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 131 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 132 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 133 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 134 | Braum | 0.00 | 0.00 | 0.00 |  |
| 135 | Briar | 0.00 | 0.00 | 0.00 |  |
| 136 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 137 | Diana | 0.00 | 0.00 | 0.00 |  |
| 138 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 139 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 140 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 141 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 142 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 143 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 144 | Leona | 0.00 | 0.00 | 0.00 |  |
| 145 | Locke | 0.00 | 0.00 | 0.00 |  |
| 146 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 147 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 148 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 149 | Rell | 0.00 | 0.00 | 0.00 |  |
| 150 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 151 | Riven | 0.00 | 0.00 | 0.00 |  |
| 152 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 153 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 154 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 155 | Talon | 0.00 | 0.00 | 0.00 |  |
| 156 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 157 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 158 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 159 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 160 | Taliyah | -0.01 | 0.47 | 0.48 |  |
| 161 | Fiddlesticks | -0.09 | 0.34 | 0.43 |  |
| 162 | Katarina | -0.10 | 0.18 | 0.28 |  |
| 163 | Viego | -0.11 | 0.07 | 0.18 |  |
| 164 | Pyke | -0.12 | 0.00 | 0.12 |  |
| 165 | Gragas | -0.13 | 0.00 | 0.13 |  |
| 166 | Galio | -0.16 | 0.00 | 0.16 |  |
| 167 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 168 | Nunu & Willump | -0.22 | 0.24 | 0.46 |  |
| 169 | Vi | -0.24 | 0.07 | 0.31 |  |
| 170 | Zac | -0.37 | 0.00 | 0.37 |  |
| 171 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 172 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
