# Counters to Nasus (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 48 other champions with a simulator kit against Nasus: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Nasus wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Nasus --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 2 | Aatrox | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 3 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 4 | Yorick | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 5 | Volibear | +0.45 | +0.93 | +0.11 | +0.65 | +0.08 | – | +0.00 |
| 6 | Fiora | +0.26 | +1.00 | −1.00 | +1.00 | +0.24 | – | +0.00 |
| 7 | Darius | +0.21 | +1.00 | −1.00 | +1.00 | −0.05 | – | +0.00 |
| 8 | Dr. Mundo | +0.21 | +0.27 | +0.27 | +0.25 | +0.02 | – | +0.00 |
| 9 | Poppy | +0.02 | −0.00 | −0.01 | +0.04 | +0.11 | – | +0.00 |
| 10 | Cho'Gath | −0.04 | −0.08 | −0.07 | −0.07 | +0.10 | – | +0.00 |
| 11 | Gnar | −0.04 | −0.07 | −0.06 | −0.13 | +0.17 | −0.08 | +0.00 |
| 12 | Shen | −0.07 | −0.08 | −0.06 | −0.15 | +0.05 | – | +0.00 |
| 13 | Skarner | −0.10 | −0.12 | −0.11 | −0.13 | +0.04 | −0.19 | +0.00 |
| 14 | Tahm Kench | −0.10 | −0.11 | −0.11 | −0.19 | +0.09 | −0.20 | +0.00 |
| 15 | Ornn | −0.18 | −0.23 | −0.25 | −0.28 | +0.13 | −0.27 | +0.00 |
| 16 | Sion | −0.36 | −0.23 | −0.29 | −1.00 | +0.04 | – | +0.00 |
| 17 | Urgot | −0.36 | −0.17 | −0.16 | −1.00 | +0.13 | −1.00 | +0.00 |
| 18 | Aurora | −0.46 | −0.18 | −0.60 | −1.00 | +0.21 | −1.00 | +0.00 |
| 19 | Heimerdinger | −0.58 | −1.00 | −0.33 | −1.00 | +0.35 | −1.00 | +0.00 |
| 20 | Kled | −0.66 | −0.55 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 21 | Kayle | −0.72 | −1.00 | −1.00 | −1.00 | +0.50 | −1.00 | +0.00 |
| 22 | Gwen | −0.76 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 23 | Gangplank | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 24 | Riven | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 25 | Pantheon | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 26 | Yone | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 27 | Ambessa | −0.77 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | +0.00 |
| 28 | Udyr | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 29 | Akali | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 30 | Camille | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 31 | Illaoi | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 32 | Jayce | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 33 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 34 | Renekton | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 35 | Garen | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 36 | Trundle | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 37 | Tryndamere | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 38 | Jax | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 39 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 40 | Singed | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 41 | Malphite | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 42 | Yasuo | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 43 | Teemo | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 44 | Kennen | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −0.98 | +0.00 |
| 45 | Olaf | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 46 | Mordekaiser | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 47 | Quinn | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 48 | Irelia | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Nasus's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nasus's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nasus` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.79)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Nasus's (500 vs 125 attack range). Nasus has no dash or blink to close the gap. (Sivir basic attacks → Nasus basic attacks)
- **0.35** spell shield: Spell Shield's spell shield blocks Nasus's Wither. Spell shield for 1.5 s, long enough to use ahead of Wither. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nasus W Wither)
- Watch out: Wither cuts Sivir's attack speed by 75% for 5 s.

#### 2. Teemo (net +0.75)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Nasus's (500 vs 125 attack range). Nasus has no dash or blink to close the gap. (Teemo basic attacks → Nasus basic attacks)
- **0.43** blind: Blinding Dart's blind makes Nasus's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Nasus basic attacks)
- Watch out: Wither cuts Teemo's attack speed by 75% for 5 s.

#### 3. Elise (net +0.67)

- **0.65** range: Elise's basic attacks reach 425 units farther than Nasus's (550 vs 125 attack range). Nasus has no dash or blink to close the gap. (Elise basic attacks → Nasus basic attacks)
- **0.35** untargetable: Rappel makes Elise untargetable, dodging Nasus's Wither. Untargetable for 0.6 s; Wither takes 0.25 s to land, enough to react. (Elise E Rappel → Nasus W Wither)
- Watch out: Wither cuts Elise's attack speed by 75% for 5 s.

#### 4. Yuumi (net +0.66)

- **0.64** range: Yuumi's basic attacks reach 300 units farther than Nasus's (425 vs 125 attack range). Nasus has no dash or blink to close the gap. (Yuumi basic attacks → Nasus basic attacks)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Nasus's Wither. Untargetable for ?; Wither takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nasus W Wither)
- Watch out: Wither cuts Yuumi's attack speed by 75% for 5 s.

#### 5. Lulu (net +0.66)

- **0.72** range: Lulu's basic attacks reach 425 units farther than Nasus's (550 vs 125 attack range). Nasus has no dash or blink to close the gap. (Lulu basic attacks → Nasus basic attacks)
- **0.30** disarm: Whimsy disarms Nasus for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Nasus basic attacks)
- Watch out: Wither cuts Lulu's attack speed by 75% for 5 s.

#### 6. Xayah (net +0.59)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Nasus's (525 vs 125 attack range). Nasus has no dash or blink to close the gap. (Xayah basic attacks → Nasus basic attacks)
- **0.21** untargetable: Featherstorm makes Xayah untargetable, dodging Nasus's Wither. Untargetable for 1.5 s, long enough to use ahead of Wither. (Xayah R Featherstorm → Nasus W Wither)
- Watch out: Wither cuts Xayah's attack speed by 75% for 5 s.

#### 7. Bard (net +0.55)

- **0.72** range: Bard's basic attacks reach 375 units farther than Nasus's (500 vs 125 attack range). Nasus has no dash or blink to close the gap. (Bard basic attacks → Nasus basic attacks)
- **0.22** untargetable: Tempered Fate makes Bard untargetable, dodging Nasus's Wither. Untargetable for 2.5 s, long enough to use ahead of Wither. (Bard R Tempered Fate → Nasus W Wither)
- Watch out: Wither cuts Bard's attack speed by 75% for 5 s.

#### 8. Vladimir (net +0.51)

- **0.37** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nasus's Wither. Untargetable for 2 s, long enough to use ahead of Wither. (Vladimir W Sanguine Pool → Nasus W Wither)
- **0.36** range: Vladimir's basic attacks reach 325 units farther than Nasus's (450 vs 125 attack range). Nasus has no dash or blink to close the gap. (Vladimir basic attacks → Nasus basic attacks)
- Watch out: Wither cuts Vladimir's attack speed by 75% for 5 s.

#### 9. Aurora (net +0.50)

- **0.58** range: Aurora's basic attacks reach 425 units farther than Nasus's (550 vs 125 attack range). Nasus has no dash or blink to close the gap. (Aurora basic attacks → Nasus basic attacks)
- **0.21** untargetable: Between Worlds makes Aurora untargetable, dodging Nasus's Wither. Untargetable for 0.4 s; Wither takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nasus W Wither)
- Watch out: Wither cuts Aurora's attack speed by 75% for 5 s.

#### 10. Kindred (net +0.44)

- **0.94** range: Kindred's basic attacks reach 375 units farther than Nasus's (500 vs 125 attack range). Nasus has no dash or blink to close the gap. (Kindred basic attacks → Nasus basic attacks)
- Watch out: Wither cuts Kindred's attack speed by 75% for 5 s.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.79 | 1.29 | 0.50 | range (attacks) |
| 2 | Teemo | +0.75 | 1.11 | 0.36 | range (attacks), blind (Blinding Dart) |
| 3 | Elise | +0.67 | 1.00 | 0.33 | range (attacks) |
| 4 | Yuumi | +0.66 | 1.09 | 0.43 | range (attacks) |
| 5 | Lulu | +0.66 | 1.02 | 0.36 | range (attacks) |
| 6 | Xayah | +0.59 | 0.98 | 0.39 | range (attacks) |
| 7 | Bard | +0.55 | 0.94 | 0.39 | range (attacks) |
| 8 | Vladimir | +0.51 | 0.73 | 0.22 |  |
| 9 | Aurora | +0.50 | 0.79 | 0.29 | range (attacks) |
| 10 | Kindred | +0.44 | 0.94 | 0.50 | range (attacks) |
| 11 | Milio | +0.44 | 0.83 | 0.39 | range (attacks) |
| 12 | Lissandra | +0.44 | 0.66 | 0.22 |  |
| 13 | Zeri | +0.43 | 0.88 | 0.45 | range (attacks) |
| 14 | Twisted Fate | +0.43 | 0.86 | 0.43 | range (attacks) |
| 15 | Twitch | +0.43 | 0.86 | 0.43 | range (attacks) |
| 16 | Vayne | +0.43 | 0.86 | 0.43 | range (attacks) |
| 17 | Aphelios | +0.43 | 0.82 | 0.39 | range (attacks) |
| 18 | Sona | +0.41 | 0.83 | 0.42 | range (attacks) |
| 19 | Kai'Sa | +0.38 | 0.77 | 0.39 | range (attacks) |
| 20 | Quinn | +0.38 | 0.77 | 0.39 | range (attacks) |
| 21 | Renata Glasc | +0.38 | 0.77 | 0.39 | range (attacks) |
| 22 | Varus | +0.38 | 0.65 | 0.27 | range (attacks) |
| 23 | Ashe | +0.36 | 0.72 | 0.36 | range (attacks) |
| 24 | Caitlyn | +0.36 | 0.72 | 0.36 | range (attacks) |
| 25 | Draven | +0.36 | 0.72 | 0.36 | range (attacks) |
| 26 | Janna | +0.36 | 0.72 | 0.36 | range (attacks) |
| 27 | Kayle | +0.36 | 0.72 | 0.36 | range (attacks) |
| 28 | Tristana | +0.36 | 0.72 | 0.36 | range (attacks) |
| 29 | Yunara | +0.36 | 0.72 | 0.36 | range (attacks) |
| 30 | Kalista | +0.36 | 0.69 | 0.33 | range (attacks) |
| 31 | Lucian | +0.33 | 0.72 | 0.39 | range (attacks) |
| 32 | Akshan | +0.32 | 0.68 | 0.36 | range (attacks) |
| 33 | Gnar | +0.32 | 0.66 | 0.34 | range (attacks) |
| 34 | Ezreal | +0.32 | 0.65 | 0.33 | range (attacks) |
| 35 | Miss Fortune | +0.32 | 0.65 | 0.33 | range (attacks) |
| 36 | Senna | +0.32 | 0.65 | 0.33 | range (attacks) |
| 37 | Smolder | +0.32 | 0.65 | 0.33 | range (attacks) |
| 38 | Viktor | +0.32 | 0.65 | 0.33 | range (attacks) |
| 39 | Zilean | +0.32 | 0.65 | 0.33 | range (attacks) |
| 40 | Zoe | +0.32 | 0.65 | 0.33 | range (attacks) |
| 41 | Corki | +0.30 | 0.60 | 0.30 | range (attacks) |
| 42 | Nidalee | +0.30 | 0.60 | 0.30 | range (attacks) |
| 43 | Jinx | +0.29 | 0.58 | 0.29 | range (attacks) |
| 44 | Kennen | +0.29 | 0.58 | 0.29 | range (attacks) |
| 45 | Lux | +0.29 | 0.58 | 0.29 | range (attacks) |
| 46 | Seraphine | +0.29 | 0.58 | 0.29 | range (attacks) |
| 47 | Jayce | +0.28 | 0.61 | 0.33 | range (attacks) |
| 48 | Samira | +0.28 | 0.61 | 0.33 | range (attacks) |
| 49 | Azir | +0.26 | 0.53 | 0.27 | range (attacks) |
| 50 | Jhin | +0.26 | 0.53 | 0.27 | range (attacks) |
| 51 | Mel | +0.26 | 0.53 | 0.27 | range (attacks) |
| 52 | Orianna | +0.26 | 0.53 | 0.27 | range (attacks) |
| 53 | Soraka | +0.26 | 0.53 | 0.27 | range (attacks) |
| 54 | Taliyah | +0.26 | 0.53 | 0.27 | range (attacks) |
| 55 | Vel'Koz | +0.26 | 0.53 | 0.27 | range (attacks) |
| 56 | Vex | +0.26 | 0.53 | 0.27 | range (attacks) |
| 57 | Xerath | +0.26 | 0.53 | 0.27 | range (attacks) |
| 58 | Ziggs | +0.26 | 0.53 | 0.27 | range (attacks) |
| 59 | Kog'Maw | +0.25 | 0.54 | 0.29 | range (attacks) |
| 60 | Malzahar | +0.25 | 0.47 | 0.22 |  |
| 61 | Heimerdinger | +0.25 | 0.45 | 0.20 |  |
| 62 | Anivia | +0.24 | 0.48 | 0.24 |  |
| 63 | Morgana | +0.24 | 0.48 | 0.24 |  |
| 64 | Ryze | +0.24 | 0.48 | 0.24 |  |
| 65 | Veigar | +0.24 | 0.48 | 0.24 |  |
| 66 | Zyra | +0.24 | 0.48 | 0.24 |  |
| 67 | Hwei | +0.23 | 0.46 | 0.23 |  |
| 68 | Ahri | +0.22 | 0.44 | 0.22 |  |
| 69 | Annie | +0.22 | 0.44 | 0.22 |  |
| 70 | Aurelion Sol | +0.22 | 0.44 | 0.22 |  |
| 71 | Brand | +0.22 | 0.44 | 0.22 |  |
| 72 | Cassiopeia | +0.22 | 0.44 | 0.22 |  |
| 73 | Karma | +0.22 | 0.44 | 0.22 |  |
| 74 | LeBlanc | +0.22 | 0.44 | 0.22 |  |
| 75 | Nami | +0.22 | 0.44 | 0.22 |  |
| 76 | Neeko | +0.22 | 0.44 | 0.22 |  |
| 77 | Syndra | +0.22 | 0.44 | 0.22 |  |
| 78 | Swain | +0.21 | 0.42 | 0.21 |  |
| 79 | Maokai | +0.18 | 0.45 | 0.27 |  |
| 80 | Fiddlesticks | +0.17 | 0.39 | 0.22 |  |
| 81 | Graves | +0.16 | 0.49 | 0.33 |  |
| 82 | Ivern | +0.16 | 0.38 | 0.22 |  |
| 83 | Karthus | +0.15 | 0.39 | 0.24 |  |
| 84 | Thresh | +0.15 | 0.39 | 0.24 |  |
| 85 | Fiora | +0.08 | 0.41 | 0.33 |  |
| 86 | Nilah | +0.05 | 0.55 | 0.50 |  |
| 87 | Nocturne | +0.04 | 0.43 | 0.39 |  |
| 88 | Master Yi | +0.03 | 0.42 | 0.39 |  |
| 89 | Rammus | +0.03 | 0.32 | 0.29 |  |
| 90 | Urgot | +0.03 | 0.30 | 0.27 |  |
| 91 | Jax | +0.02 | 0.35 | 0.33 |  |
| 92 | Lillia | 0.00 | 0.22 | 0.22 |  |
| 93 | Gwen | -0.01 | 0.35 | 0.36 |  |
| 94 | Kayn | -0.02 | 0.22 | 0.24 |  |
| 95 | Rakan | -0.04 | 0.25 | 0.29 |  |
| 96 | Evelynn | -0.05 | 0.22 | 0.27 |  |
| 97 | Shen | -0.06 | 0.33 | 0.39 |  |
| 98 | Rek'Sai | -0.08 | 0.22 | 0.30 |  |
| 99 | Malphite | -0.08 | 0.21 | 0.29 |  |
| 100 | Zed | -0.08 | 0.21 | 0.29 |  |
| 101 | Ekko | -0.09 | 0.24 | 0.33 |  |
| 102 | Singed | -0.09 | 0.18 | 0.27 |  |
| 103 | Kled | -0.11 | 0.31 | 0.42 |  |
| 104 | Shaco | -0.11 | 0.22 | 0.33 |  |
| 105 | Nunu & Willump | -0.14 | 0.13 | 0.27 |  |
| 106 | Irelia | -0.17 | 0.10 | 0.27 |  |
| 107 | Camille | -0.18 | 0.21 | 0.39 |  |
| 108 | Katarina | -0.21 | 0.12 | 0.33 |  |
| 109 | Gangplank | -0.21 | 0.08 | 0.29 |  |
| 110 | Sion | -0.21 | 0.06 | 0.27 |  |
| 111 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 112 | Mordekaiser | -0.25 | 0.08 | 0.33 |  |
| 113 | Ambessa | -0.25 | 0.00 | 0.25 |  |
| 114 | Skarner | -0.27 | 0.06 | 0.33 |  |
| 115 | Amumu | -0.27 | 0.00 | 0.27 |  |
| 116 | Diana | -0.27 | 0.00 | 0.27 |  |
| 117 | Fizz | -0.27 | 0.00 | 0.27 |  |
| 118 | Galio | -0.27 | 0.00 | 0.27 |  |
| 119 | Lee Sin | -0.27 | 0.00 | 0.27 |  |
| 120 | Ornn | -0.27 | 0.00 | 0.27 |  |
| 121 | Poppy | -0.27 | 0.00 | 0.27 |  |
| 122 | Yone | -0.27 | 0.00 | 0.27 |  |
| 123 | Zaahen | -0.28 | 0.05 | 0.33 |  |
| 124 | Alistar | -0.29 | 0.04 | 0.33 |  |
| 125 | Akali | -0.29 | 0.00 | 0.29 |  |
| 126 | Cho'Gath | -0.29 | 0.00 | 0.29 |  |
| 127 | Gragas | -0.29 | 0.00 | 0.29 |  |
| 128 | Illaoi | -0.29 | 0.00 | 0.29 |  |
| 129 | Kassadin | -0.29 | 0.00 | 0.29 |  |
| 130 | Leona | -0.29 | 0.00 | 0.29 |  |
| 131 | Naafiri | -0.29 | 0.00 | 0.29 |  |
| 132 | Pyke | -0.29 | 0.00 | 0.29 |  |
| 133 | Rumble | -0.29 | 0.00 | 0.29 |  |
| 134 | Shyvana | -0.29 | 0.00 | 0.29 |  |
| 135 | Sylas | -0.29 | 0.00 | 0.29 |  |
| 136 | Tahm Kench | -0.29 | 0.00 | 0.29 |  |
| 137 | Yasuo | -0.29 | 0.00 | 0.29 |  |
| 138 | Zac | -0.29 | 0.00 | 0.29 |  |
| 139 | Rengar | -0.30 | 0.09 | 0.39 |  |
| 140 | Warwick | -0.30 | 0.06 | 0.36 |  |
| 141 | Qiyana | -0.30 | 0.00 | 0.30 |  |
| 142 | Viego | -0.31 | 0.19 | 0.50 |  |
| 143 | Garen | -0.31 | 0.12 | 0.43 |  |
| 144 | Udyr | -0.31 | 0.11 | 0.42 |  |
| 145 | Braum | -0.33 | 0.00 | 0.33 |  |
| 146 | Dr. Mundo | -0.33 | 0.00 | 0.33 |  |
| 147 | Hecarim | -0.33 | 0.00 | 0.33 |  |
| 148 | Nautilus | -0.33 | 0.00 | 0.33 |  |
| 149 | Pantheon | -0.33 | 0.00 | 0.33 |  |
| 150 | Renekton | -0.33 | 0.00 | 0.33 |  |
| 151 | Sejuani | -0.33 | 0.00 | 0.33 |  |
| 152 | Sett | -0.33 | 0.00 | 0.33 |  |
| 153 | Volibear | -0.33 | 0.00 | 0.33 |  |
| 154 | Olaf | -0.34 | 0.05 | 0.39 |  |
| 155 | Rell | -0.35 | 0.00 | 0.35 |  |
| 156 | Blitzcrank | -0.36 | 0.00 | 0.36 |  |
| 157 | Darius | -0.36 | 0.00 | 0.36 |  |
| 158 | Jarvan IV | -0.36 | 0.00 | 0.36 |  |
| 159 | Talon | -0.36 | 0.00 | 0.36 |  |
| 160 | Vi | -0.36 | 0.00 | 0.36 |  |
| 161 | Aatrox | -0.39 | 0.00 | 0.39 |  |
| 162 | Bel'Veth | -0.39 | 0.00 | 0.39 |  |
| 163 | Locke | -0.39 | 0.00 | 0.39 |  |
| 164 | Riven | -0.39 | 0.00 | 0.39 |  |
| 165 | Taric | -0.39 | 0.00 | 0.39 |  |
| 166 | Yorick | -0.39 | 0.00 | 0.39 |  |
| 167 | Briar | -0.40 | 0.00 | 0.40 |  |
| 168 | Trundle | -0.42 | 0.00 | 0.42 |  |
| 169 | K'Sante | -0.43 | 0.00 | 0.43 |  |
| 170 | Tryndamere | -0.43 | 0.00 | 0.43 |  |
| 171 | Xin Zhao | -0.45 | 0.00 | 0.45 |  |
| 172 | Wukong | -0.50 | 0.00 | 0.50 |  |
