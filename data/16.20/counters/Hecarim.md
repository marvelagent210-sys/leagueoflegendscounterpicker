# Counters to Hecarim (patch 26.20)

Every champion ranked by what its kit does against Hecarim's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Hecarim's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Hecarim` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.27)

- **1.00** spell shield: Spell Shield's spell shield blocks Hecarim's Onslaught of Shadows. Spell shield for 1.5 s, long enough to use ahead of Onslaught of Shadows. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Hecarim R Onslaught of Shadows)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Hecarim's (500 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Sivir basic attacks → Hecarim basic attacks)

### 2. Xayah (net +1.22)

- **1.00** untargetable: Featherstorm makes Xayah untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 1.5 s, long enough to use ahead of Onslaught of Shadows. (Xayah R Featherstorm → Hecarim R Onslaught of Shadows)
- **0.22** range: Xayah's basic attacks reach 350 units farther than Hecarim's (525 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Xayah basic attacks → Hecarim basic attacks)

### 3. Elise (net +1.20)

- **1.00** untargetable: Rappel makes Elise untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 0.6 s; Onslaught of Shadows takes 1.37 s to land, enough to react. (Elise E Rappel → Hecarim R Onslaught of Shadows)
- **0.20** range: Elise's basic attacks reach 375 units farther than Hecarim's (550 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Elise basic attacks → Hecarim basic attacks)

### 4. Aurora (net +1.18)

- **1.00** untargetable: Between Worlds makes Aurora untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 0.4 s; Onslaught of Shadows takes 1.37 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Hecarim R Onslaught of Shadows)
- **0.18** range: Aurora's basic attacks reach 375 units farther than Hecarim's (550 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Aurora basic attacks → Hecarim basic attacks)

### 5. Mel (net +1.17)

- **1.00** projectile block: Rebuttal blocks Hecarim's Onslaught of Shadows, a projectile. Rebuttal for 0.75 s; Onslaught of Shadows takes 1.37 s to land, enough to react. (Mel W Rebuttal → Hecarim R Onslaught of Shadows)
- **0.17** range: Mel's basic attacks reach 375 units farther than Hecarim's (550 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Mel basic attacks → Hecarim basic attacks)

### 6. Master Yi (net +1.15)

- **1.00** untargetable: Alpha Strike makes Master Yi untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for ?; Onslaught of Shadows takes 1.37 s to land, enough to react. (Master Yi Q Alpha Strike → Hecarim R Onslaught of Shadows)
- **0.20** cleanse: Highlander cleanses Hecarim's Onslaught of Shadows (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove fear. (Master Yi R Highlander → Hecarim R Onslaught of Shadows)
- **0.11** cc immunity: Highlander makes Master Yi immune to Hecarim's Onslaught of Shadows slow. Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Hecarim R Onslaught of Shadows)
- Watch out: Onslaught of Shadows's fear interrupts Master Yi's Meditate (normal channel).

### 7. Lissandra (net +1.14)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 2.5 s, long enough to use ahead of Onslaught of Shadows. (Lissandra R Frozen Tomb → Hecarim R Onslaught of Shadows)
- **0.14** range: Lissandra's basic attacks reach 375 units farther than Hecarim's (550 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Lissandra basic attacks → Hecarim basic attacks)
- **0.10** dash stop: Frozen Tomb's knockdown can stop Hecarim's Devastating Charge mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. The wiki marks this dash's knockdown interaction as special. (Lissandra R Frozen Tomb → Hecarim E Devastating Charge)
- Watch out: Onslaught of Shadows is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

### 8. Fiora (net +1.14)

- **1.10** parry: Riposte parries Hecarim's Onslaught of Shadows and stuns back. Parry for 0.75 s; Onslaught of Shadows takes 1.37 s to land, enough to react. Negating Onslaught of Shadows's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Hecarim R Onslaught of Shadows)
- **0.08** attack speed slow: Riposte cuts Hecarim's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Hecarim basic attacks)

### 9. Bard (net +1.13)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 2.5 s, long enough to use ahead of Onslaught of Shadows. (Bard R Tempered Fate → Hecarim R Onslaught of Shadows)
- **0.21** range: Bard's basic attacks reach 325 units farther than Hecarim's (500 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Bard basic attacks → Hecarim basic attacks)
- Watch out: Onslaught of Shadows is displacement immune, ignoring Bard's Tempered Fate (stasis) during it.

### 10. Morgana (net +1.11)

- **1.00** cc immunity: Black Shield makes Morgana immune to Hecarim's Onslaught of Shadows (fear, slow). Immune for 5 s, long enough to use ahead of Onslaught of Shadows. (Morgana E Black Shield → Hecarim R Onslaught of Shadows)
- **0.11** range: Morgana's basic attacks reach 275 units farther than Hecarim's (450 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Morgana basic attacks → Hecarim basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.27 | 1.27 | 0.00 |  |
| 2 | Xayah | +1.22 | 1.22 | 0.00 |  |
| 3 | Elise | +1.20 | 1.20 | 0.00 |  |
| 4 | Aurora | +1.18 | 1.18 | 0.00 |  |
| 5 | Mel | +1.17 | 1.17 | 0.00 | projectile block (Rebuttal) |
| 6 | Master Yi | +1.15 | 1.25 | 0.10 |  |
| 7 | Lissandra | +1.14 | 1.19 | 0.05 |  |
| 8 | Fiora | +1.14 | 1.14 | 0.00 |  |
| 9 | Bard | +1.13 | 1.21 | 0.08 |  |
| 10 | Morgana | +1.11 | 1.11 | 0.00 |  |
| 11 | Samira | +1.09 | 1.18 | 0.09 | projectile block (Blade Whirl) |
| 12 | Vladimir | +1.05 | 1.10 | 0.05 |  |
| 13 | Ekko | +1.00 | 1.00 | 0.00 |  |
| 14 | Evelynn | +1.00 | 1.00 | 0.00 |  |
| 15 | Gwen | +1.00 | 1.00 | 0.00 |  |
| 16 | Nocturne | +1.00 | 1.00 | 0.00 |  |
| 17 | Olaf | +1.00 | 1.00 | 0.00 |  |
| 18 | Shaco | +1.00 | 1.00 | 0.00 |  |
| 19 | Udyr | +1.00 | 1.00 | 0.00 |  |
| 20 | Zed | +1.00 | 1.00 | 0.00 |  |
| 21 | Milio | +0.98 | 1.05 | 0.07 |  |
| 22 | Maokai | +0.93 | 1.00 | 0.07 |  |
| 23 | Braum | +0.92 | 1.00 | 0.08 | projectile block (Unbreakable) |
| 24 | Warwick | +0.86 | 1.06 | 0.20 |  |
| 25 | Sion | +0.86 | 1.00 | 0.14 |  |
| 26 | Camille | +0.85 | 1.00 | 0.15 |  |
| 27 | Rek'Sai | +0.83 | 1.00 | 0.17 |  |
| 28 | Zaahen | +0.81 | 1.00 | 0.19 |  |
| 29 | Yuumi | +0.80 | 1.18 | 0.38 |  |
| 30 | Gangplank | +0.80 | 0.80 | 0.00 |  |
| 31 | Rengar | +0.80 | 0.80 | 0.00 |  |
| 32 | Singed | +0.79 | 0.86 | 0.07 | grounding (Mega Adhesive) |
| 33 | Kled | +0.75 | 1.00 | 0.25 |  |
| 34 | Kayle | +0.74 | 0.74 | 0.00 |  |
| 35 | Cassiopeia | +0.72 | 0.72 | 0.00 | grounding (Miasma) |
| 36 | Kindred | +0.72 | 0.72 | 0.00 |  |
| 37 | Kalista | +0.71 | 0.91 | 0.20 |  |
| 38 | Yasuo | +0.70 | 1.00 | 0.30 | projectile block (Wind Wall) |
| 39 | Mordekaiser | +0.69 | 0.84 | 0.15 |  |
| 40 | Alistar | +0.68 | 0.80 | 0.12 |  |
| 41 | Teemo | +0.62 | 0.62 | 0.00 | blind (Blinding Dart) |
| 42 | Kayn | +0.56 | 1.00 | 0.44 |  |
| 43 | Garen | +0.46 | 0.46 | 0.00 |  |
| 44 | Pantheon | +0.45 | 0.50 | 0.05 |  |
| 45 | Taric | +0.45 | 0.45 | 0.00 |  |
| 46 | Lulu | +0.44 | 0.52 | 0.08 |  |
| 47 | Viktor | +0.35 | 0.39 | 0.04 |  |
| 48 | Jax | +0.35 | 0.35 | 0.00 |  |
| 49 | Malzahar | +0.34 | 0.72 | 0.38 |  |
| 50 | Vex | +0.34 | 0.37 | 0.03 |  |
| 51 | Aphelios | +0.34 | 0.34 | 0.00 |  |
| 52 | Jinx | +0.33 | 0.37 | 0.04 |  |
| 53 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 54 | Xin Zhao | +0.31 | 0.50 | 0.19 |  |
| 55 | Varus | +0.31 | 0.36 | 0.05 |  |
| 56 | Veigar | +0.31 | 0.35 | 0.04 |  |
| 57 | Ahri | +0.30 | 0.34 | 0.04 |  |
| 58 | Zeri | +0.28 | 0.28 | 0.00 |  |
| 59 | Hwei | +0.27 | 0.34 | 0.07 |  |
| 60 | Twitch | +0.27 | 0.27 | 0.00 |  |
| 61 | Sona | +0.26 | 0.26 | 0.00 |  |
| 62 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 63 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 64 | Nilah | +0.22 | 0.30 | 0.08 |  |
| 65 | Heimerdinger | +0.22 | 0.22 | 0.00 |  |
| 66 | Kai'Sa | +0.22 | 0.22 | 0.00 |  |
| 67 | Senna | +0.22 | 0.22 | 0.00 |  |
| 68 | Vayne | +0.20 | 0.27 | 0.07 |  |
| 69 | Ezreal | +0.20 | 0.20 | 0.00 |  |
| 70 | Smolder | +0.20 | 0.20 | 0.00 |  |
| 71 | Zilean | +0.20 | 0.20 | 0.00 |  |
| 72 | Kennen | +0.18 | 0.18 | 0.00 |  |
| 73 | Lux | +0.18 | 0.18 | 0.00 |  |
| 74 | Nidalee | +0.18 | 0.18 | 0.00 |  |
| 75 | Renata Glasc | +0.17 | 0.24 | 0.07 |  |
| 76 | Seraphine | +0.17 | 0.17 | 0.00 |  |
| 77 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 78 | Tristana | +0.16 | 0.24 | 0.08 |  |
| 79 | Kog'Maw | +0.16 | 0.16 | 0.00 |  |
| 80 | Draven | +0.15 | 0.22 | 0.07 |  |
| 81 | Annie | +0.15 | 0.15 | 0.00 |  |
| 82 | Brand | +0.14 | 0.14 | 0.00 |  |
| 83 | Graves | +0.14 | 0.14 | 0.00 |  |
| 84 | Zoe | +0.13 | 0.20 | 0.07 |  |
| 85 | Karma | +0.13 | 0.13 | 0.00 |  |
| 86 | LeBlanc | +0.13 | 0.13 | 0.00 |  |
| 87 | Corki | +0.12 | 0.19 | 0.07 |  |
| 88 | Skarner | +0.12 | 0.12 | 0.00 |  |
| 89 | Rammus | +0.11 | 0.32 | 0.21 |  |
| 90 | Gnar | +0.11 | 0.19 | 0.08 |  |
| 91 | Jayce | +0.11 | 0.18 | 0.07 |  |
| 92 | Orianna | +0.08 | 0.16 | 0.08 |  |
| 93 | Poppy | +0.07 | 0.38 | 0.31 |  |
| 94 | Syndra | +0.07 | 0.14 | 0.07 |  |
| 95 | Neeko | +0.06 | 0.14 | 0.08 |  |
| 96 | Swain | +0.05 | 0.12 | 0.07 |  |
| 97 | Amumu | +0.05 | 0.10 | 0.05 |  |
| 98 | Ivern | +0.04 | 0.11 | 0.07 |  |
| 99 | Quinn | +0.03 | 0.22 | 0.19 |  |
| 100 | Aurelion Sol | +0.02 | 0.14 | 0.12 |  |
| 101 | Anivia | +0.01 | 0.16 | 0.15 |  |
| 102 | Malphite | 0.00 | 0.21 | 0.21 |  |
| 103 | Katarina | 0.00 | 0.18 | 0.18 |  |
| 104 | Akali | 0.00 | 0.00 | 0.00 |  |
| 105 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 106 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 107 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 108 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 109 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 110 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 111 | Leona | 0.00 | 0.00 | 0.00 |  |
| 112 | Locke | 0.00 | 0.00 | 0.00 |  |
| 113 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 114 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 115 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 116 | Talon | 0.00 | 0.00 | 0.00 |  |
| 117 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 118 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 119 | Ziggs | -0.01 | 0.17 | 0.18 |  |
| 120 | Azir | -0.01 | 0.16 | 0.17 |  |
| 121 | Zyra | -0.01 | 0.16 | 0.17 |  |
| 122 | Urgot | -0.01 | 0.08 | 0.09 |  |
| 123 | Caitlyn | -0.02 | 0.24 | 0.26 |  |
| 124 | Thresh | -0.02 | 0.11 | 0.13 |  |
| 125 | Lillia | -0.03 | 0.05 | 0.08 |  |
| 126 | Akshan | -0.04 | 0.19 | 0.23 |  |
| 127 | Nunu & Willump | -0.05 | 0.31 | 0.36 |  |
| 128 | Lucian | -0.05 | 0.21 | 0.26 |  |
| 129 | Nami | -0.05 | 0.14 | 0.19 |  |
| 130 | Briar | -0.05 | 0.00 | 0.05 |  |
| 131 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 132 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 133 | Darius | -0.07 | 0.00 | 0.07 |  |
| 134 | Sett | -0.07 | 0.00 | 0.07 |  |
| 135 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 136 | Miss Fortune | -0.08 | 0.20 | 0.28 |  |
| 137 | Diana | -0.08 | 0.00 | 0.08 |  |
| 138 | Fizz | -0.08 | 0.00 | 0.08 |  |
| 139 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 140 | Qiyana | -0.08 | 0.00 | 0.08 |  |
| 141 | Jhin | -0.09 | 0.17 | 0.26 |  |
| 142 | Twisted Fate | -0.10 | 0.25 | 0.35 |  |
| 143 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 144 | Zac | -0.11 | 0.20 | 0.31 |  |
| 145 | Shen | -0.12 | 0.33 | 0.45 |  |
| 146 | Vel'Koz | -0.12 | 0.16 | 0.28 |  |
| 147 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 148 | Pyke | -0.12 | 0.00 | 0.12 |  |
| 149 | Xerath | -0.15 | 0.16 | 0.31 |  |
| 150 | Rakan | -0.15 | 0.06 | 0.21 |  |
| 151 | Yorick | -0.15 | 0.00 | 0.15 |  |
| 152 | Yone | -0.16 | 0.10 | 0.26 |  |
| 153 | Ornn | -0.16 | 0.00 | 0.16 |  |
| 154 | Viego | -0.16 | 0.00 | 0.16 |  |
| 155 | Karthus | -0.17 | 0.11 | 0.28 |  |
| 156 | K'Sante | -0.17 | 0.00 | 0.17 |  |
| 157 | Wukong | -0.17 | 0.00 | 0.17 |  |
| 158 | Aatrox | -0.18 | 0.00 | 0.18 |  |
| 159 | Blitzcrank | -0.19 | 0.00 | 0.19 |  |
| 160 | Ryze | -0.20 | 0.15 | 0.35 |  |
| 161 | Riven | -0.21 | 0.00 | 0.21 |  |
| 162 | Fiddlesticks | -0.25 | 0.11 | 0.36 |  |
| 163 | Gragas | -0.25 | 0.00 | 0.25 |  |
| 164 | Rell | -0.25 | 0.00 | 0.25 |  |
| 165 | Sejuani | -0.25 | 0.00 | 0.25 |  |
| 166 | Janna | -0.30 | 0.22 | 0.52 |  |
| 167 | Jarvan IV | -0.30 | 0.00 | 0.30 |  |
| 168 | Galio | -0.34 | 0.00 | 0.34 |  |
| 169 | Tahm Kench | -0.34 | 0.00 | 0.34 |  |
| 170 | Vi | -0.35 | 0.00 | 0.35 |  |
| 171 | Naafiri | -0.40 | 0.00 | 0.40 |  |
| 172 | Taliyah | -0.47 | 0.16 | 0.63 |  |
