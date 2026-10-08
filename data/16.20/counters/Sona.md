# Counters to Sona (patch 26.20)

Every champion ranked by what its kit does against Sona's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Sona's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Sona` for the full ledger of a matchup, with sources.

## Top 10

### 1. Samira (net +1.02)

- **0.80** projectile block: Blade Whirl blocks Sona's Crescendo, a projectile. Blade Whirl for 0.75 s; Crescendo takes 0.67 s to land, enough to react. (Samira W Blade Whirl → Sona R Crescendo)
- **0.35** projectile block: Blade Whirl blocks Sona's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Sona basic attacks)
- **0.17** projectile block: Blade Whirl blocks Sona's Hymn of Valor, a projectile. Blade Whirl for 0.75 s; Hymn of Valor lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Samira W Blade Whirl → Sona Q Hymn of Valor)

### 2. Mel (net +1.01)

- **0.80** projectile block: Rebuttal blocks Sona's Crescendo, a projectile. Rebuttal for 0.75 s; Crescendo takes 0.67 s to land, enough to react. (Mel W Rebuttal → Sona R Crescendo)
- **0.34** projectile block: Rebuttal blocks Sona's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Sona basic attacks)
- **0.16** projectile block: Rebuttal blocks Sona's Hymn of Valor, a projectile. Rebuttal for 0.75 s; Hymn of Valor lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Mel W Rebuttal → Sona Q Hymn of Valor)

### 3. Yasuo (net +0.84)

- **0.80** projectile block: Wind Wall blocks Sona's Crescendo, a projectile. Wind Wall for 4 s, long enough to use ahead of Crescendo. (Yasuo W Wind Wall → Sona R Crescendo)
- **0.45** projectile block: Wind Wall blocks Sona's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Sona basic attacks)
- **0.31** projectile block: Wind Wall blocks Sona's Hymn of Valor, a projectile. Wind Wall for 4 s, long enough to use ahead of Hymn of Valor. (Yasuo W Wind Wall → Sona Q Hymn of Valor)
- Watch out: Sona's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 4. Aurora (net +0.80)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Sona's Crescendo. Untargetable for 0.4 s; Crescendo takes 0.67 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Sona R Crescendo)

### 5. Bard (net +0.80)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Sona's Crescendo. Untargetable for 2.5 s, long enough to use ahead of Crescendo. (Bard R Tempered Fate → Sona R Crescendo)

### 6. Elise (net +0.80)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Sona's Crescendo. Untargetable for 0.6 s; Crescendo takes 0.67 s to land, enough to react. (Elise E Rappel → Sona R Crescendo)

### 7. Lissandra (net +0.80)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Sona's Crescendo. Untargetable for 2.5 s, long enough to use ahead of Crescendo. (Lissandra R Frozen Tomb → Sona R Crescendo)

### 8. Sivir (net +0.80)

- **0.80** spell shield: Spell Shield's spell shield blocks Sona's Crescendo. Spell shield for 1.5 s, long enough to use ahead of Crescendo. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sona R Crescendo)

### 9. Xayah (net +0.80)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Sona's Crescendo. Untargetable for 1.5 s, long enough to use ahead of Crescendo. (Xayah R Featherstorm → Sona R Crescendo)

### 10. Braum (net +0.79)

- **0.80** projectile block: Unbreakable blocks Sona's Crescendo, a projectile. Unbreakable for 4 s, long enough to use ahead of Crescendo. (Braum E Unbreakable → Sona R Crescendo)
- **0.58** projectile block: Unbreakable blocks Sona's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Sona basic attacks)
- **0.45** projectile block: Unbreakable blocks Sona's Hymn of Valor, a projectile. Unbreakable for 4 s, long enough to use ahead of Hymn of Valor. (Braum E Unbreakable → Sona Q Hymn of Valor)
- Watch out: Sona's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +1.02 | 1.02 | 0.00 | projectile block (Blade Whirl) |
| 2 | Mel | +1.01 | 1.01 | 0.00 | projectile block (Rebuttal) |
| 3 | Yasuo | +0.84 | 1.10 | 0.26 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 4 | Aurora | +0.80 | 0.80 | 0.00 |  |
| 5 | Bard | +0.80 | 0.80 | 0.00 |  |
| 6 | Elise | +0.80 | 0.80 | 0.00 |  |
| 7 | Lissandra | +0.80 | 0.80 | 0.00 |  |
| 8 | Sivir | +0.80 | 0.80 | 0.00 |  |
| 9 | Xayah | +0.80 | 0.80 | 0.00 |  |
| 10 | Braum | +0.79 | 1.20 | 0.41 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 11 | Milio | +0.66 | 0.66 | 0.00 |  |
| 12 | Kled | +0.61 | 0.76 | 0.15 |  |
| 13 | Camille | +0.59 | 0.80 | 0.21 |  |
| 14 | Morgana | +0.59 | 0.80 | 0.21 |  |
| 15 | Kalista | +0.58 | 0.58 | 0.00 |  |
| 16 | Fiora | +0.54 | 0.95 | 0.41 |  |
| 17 | Rek'Sai | +0.54 | 0.80 | 0.26 |  |
| 18 | Vladimir | +0.54 | 0.80 | 0.26 |  |
| 19 | Zaahen | +0.54 | 0.80 | 0.26 |  |
| 20 | Kayle | +0.54 | 0.54 | 0.00 |  |
| 21 | Teemo | +0.54 | 0.54 | 0.00 | blind (Blinding Dart) |
| 22 | Ekko | +0.53 | 0.80 | 0.27 |  |
| 23 | Evelynn | +0.53 | 0.80 | 0.27 |  |
| 24 | Shaco | +0.53 | 0.80 | 0.27 |  |
| 25 | Zed | +0.53 | 0.80 | 0.27 |  |
| 26 | Gwen | +0.39 | 0.80 | 0.41 |  |
| 27 | Maokai | +0.39 | 0.80 | 0.41 |  |
| 28 | Nocturne | +0.39 | 0.80 | 0.41 |  |
| 29 | Udyr | +0.39 | 0.80 | 0.41 |  |
| 30 | Lulu | +0.39 | 0.39 | 0.00 |  |
| 31 | Warwick | +0.36 | 0.80 | 0.44 |  |
| 32 | Kindred | +0.36 | 0.36 | 0.00 |  |
| 33 | Master Yi | +0.31 | 0.80 | 0.49 |  |
| 34 | Yuumi | +0.29 | 0.80 | 0.51 |  |
| 35 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 36 | Alistar | +0.23 | 0.64 | 0.41 |  |
| 37 | Kayn | +0.14 | 0.80 | 0.66 |  |
| 38 | Varus | +0.13 | 0.18 | 0.05 |  |
| 39 | Pantheon | +0.09 | 0.40 | 0.31 |  |
| 40 | Annie | +0.08 | 0.08 | 0.00 |  |
| 41 | Malzahar | +0.05 | 0.40 | 0.35 |  |
| 42 | Nilah | +0.04 | 0.38 | 0.34 |  |
| 43 | Jax | +0.03 | 0.44 | 0.41 | attack dodge (Counter Strike) |
| 44 | Xin Zhao | +0.01 | 0.40 | 0.39 |  |
| 45 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 46 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 47 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 48 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 49 | Azir | 0.00 | 0.00 | 0.00 |  |
| 50 | Brand | 0.00 | 0.00 | 0.00 |  |
| 51 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 52 | Corki | 0.00 | 0.00 | 0.00 |  |
| 53 | Draven | 0.00 | 0.00 | 0.00 |  |
| 54 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 55 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 56 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 57 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 58 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 59 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 60 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 61 | Karma | 0.00 | 0.00 | 0.00 |  |
| 62 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 63 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 64 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 65 | Lux | 0.00 | 0.00 | 0.00 |  |
| 66 | Nami | 0.00 | 0.00 | 0.00 |  |
| 67 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 68 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 69 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 70 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 71 | Senna | 0.00 | 0.00 | 0.00 |  |
| 72 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 73 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 74 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 75 | Swain | 0.00 | 0.00 | 0.00 |  |
| 76 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 77 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 78 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 79 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 80 | Vex | 0.00 | 0.00 | 0.00 |  |
| 81 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 82 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 83 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 84 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 85 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 86 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 87 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 88 | Olaf | -0.03 | 0.80 | 0.83 |  |
| 89 | Sion | -0.05 | 0.80 | 0.85 |  |
| 90 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 91 | Thresh | -0.07 | 0.00 | 0.07 |  |
| 92 | Caitlyn | -0.08 | 0.18 | 0.26 |  |
| 93 | Graves | -0.09 | 0.00 | 0.09 |  |
| 94 | Malphite | -0.14 | 0.27 | 0.41 |  |
| 95 | Quinn | -0.14 | 0.00 | 0.14 |  |
| 96 | Rammus | -0.15 | 0.41 | 0.56 | attack reflect (Defensive Ball Curl) |
| 97 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 98 | Rakan | -0.17 | 0.00 | 0.17 |  |
| 99 | Gangplank | -0.19 | 0.64 | 0.83 |  |
| 100 | Rengar | -0.19 | 0.64 | 0.83 |  |
| 101 | Fizz | -0.19 | 0.00 | 0.19 |  |
| 102 | Jarvan IV | -0.19 | 0.00 | 0.19 |  |
| 103 | Sylas | -0.19 | 0.00 | 0.19 |  |
| 104 | Yone | -0.19 | 0.00 | 0.19 |  |
| 105 | Briar | -0.21 | 0.00 | 0.21 |  |
| 106 | K'Sante | -0.21 | 0.00 | 0.21 |  |
| 107 | Urgot | -0.21 | 0.00 | 0.21 |  |
| 108 | Akshan | -0.23 | 0.00 | 0.23 |  |
| 109 | Lillia | -0.23 | 0.00 | 0.23 |  |
| 110 | Vel'Koz | -0.24 | 0.00 | 0.24 |  |
| 111 | Hecarim | -0.26 | 0.00 | 0.26 |  |
| 112 | Jhin | -0.26 | 0.00 | 0.26 |  |
| 113 | Lucian | -0.26 | 0.00 | 0.26 |  |
| 114 | Wukong | -0.26 | 0.00 | 0.26 |  |
| 115 | Ornn | -0.26 | 0.00 | 0.26 |  |
| 116 | Rell | -0.26 | 0.00 | 0.26 |  |
| 117 | Akali | -0.27 | 0.00 | 0.27 |  |
| 118 | Ambessa | -0.27 | 0.00 | 0.27 |  |
| 119 | Bel'Veth | -0.27 | 0.00 | 0.27 |  |
| 120 | Lee Sin | -0.27 | 0.00 | 0.27 |  |
| 121 | Qiyana | -0.27 | 0.00 | 0.27 |  |
| 122 | Riven | -0.27 | 0.00 | 0.27 |  |
| 123 | Talon | -0.27 | 0.00 | 0.27 |  |
| 124 | Volibear | -0.27 | 0.00 | 0.27 |  |
| 125 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 126 | Viego | -0.29 | 0.00 | 0.29 |  |
| 127 | Shen | -0.30 | 0.42 | 0.72 | attack block (Spirit's Refuge) |
| 128 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 129 | Galio | -0.35 | 0.00 | 0.35 |  |
| 130 | Pyke | -0.35 | 0.00 | 0.35 |  |
| 131 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 132 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 133 | Fiddlesticks | -0.36 | 0.00 | 0.36 |  |
| 134 | Irelia | -0.36 | 0.00 | 0.36 |  |
| 135 | Aatrox | -0.39 | 0.00 | 0.39 |  |
| 136 | Nautilus | -0.39 | 0.00 | 0.39 |  |
| 137 | Tryndamere | -0.39 | 0.00 | 0.39 |  |
| 138 | Janna | -0.40 | 0.00 | 0.40 |  |
| 139 | Nasus | -0.41 | 0.42 | 0.83 | attack speed slow (Wither) |
| 140 | Katarina | -0.41 | 0.18 | 0.59 |  |
| 141 | Amumu | -0.41 | 0.00 | 0.41 |  |
| 142 | Diana | -0.41 | 0.00 | 0.41 |  |
| 143 | Illaoi | -0.41 | 0.00 | 0.41 |  |
| 144 | Kassadin | -0.41 | 0.00 | 0.41 |  |
| 145 | Kha'Zix | -0.41 | 0.00 | 0.41 |  |
| 146 | Leona | -0.41 | 0.00 | 0.41 |  |
| 147 | Locke | -0.41 | 0.00 | 0.41 |  |
| 148 | Renekton | -0.41 | 0.00 | 0.41 |  |
| 149 | Sejuani | -0.41 | 0.00 | 0.41 |  |
| 150 | Sett | -0.41 | 0.00 | 0.41 |  |
| 151 | Shyvana | -0.41 | 0.00 | 0.41 |  |
| 152 | Taric | -0.47 | 0.36 | 0.83 |  |
| 153 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 154 | Karthus | -0.49 | 0.00 | 0.49 |  |
| 155 | Vi | -0.49 | 0.00 | 0.49 |  |
| 156 | Gragas | -0.51 | 0.00 | 0.51 |  |
| 157 | Singed | -0.56 | 0.27 | 0.83 |  |
| 158 | Garen | -0.56 | 0.21 | 0.77 |  |
| 159 | Naafiri | -0.61 | 0.00 | 0.61 |  |
| 160 | Poppy | -0.61 | 0.00 | 0.61 |  |
| 161 | Zac | -0.62 | 0.00 | 0.62 |  |
| 162 | Tahm Kench | -0.64 | 0.00 | 0.64 |  |
| 163 | Mordekaiser | -0.67 | 0.10 | 0.77 |  |
| 164 | Darius | -0.77 | 0.00 | 0.77 |  |
| 165 | Trundle | -0.77 | 0.00 | 0.77 |  |
| 166 | Yorick | -0.77 | 0.00 | 0.77 |  |
| 167 | Blitzcrank | -0.83 | 0.00 | 0.83 |  |
| 168 | Cho'Gath | -0.83 | 0.00 | 0.83 |  |
| 169 | Dr. Mundo | -0.83 | 0.00 | 0.83 |  |
| 170 | Rumble | -0.83 | 0.00 | 0.83 |  |
| 171 | Skarner | -0.83 | 0.00 | 0.83 |  |
| 172 | Nunu & Willump | -1.17 | 0.00 | 1.17 |  |
