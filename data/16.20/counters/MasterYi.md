# Counters to Master Yi (patch 26.20)

Every champion ranked by what its kit does against Master Yi's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Master Yi's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> MasterYi` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +0.81)

- **0.41** range: Sivir's basic attacks reach 325 units farther than Master Yi's (500 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Sivir basic attacks → Master Yi basic attacks)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Master Yi's Alpha Strike. Spell shield for 1.5 s, long enough to use ahead of Alpha Strike. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block a single instance of damage. (Sivir E Spell Shield → Master Yi Q Alpha Strike)

### 2. Kayle (net +0.72)

- **0.43** invulnerable: Divine Judgment makes Kayle invulnerable to Master Yi's Alpha Strike. Invulnerable for 2.5 s, long enough to use ahead of Alpha Strike. (Kayle R Divine Judgment → Master Yi Q Alpha Strike)
- **0.36** range: Kayle's basic attacks reach 450 units farther than Master Yi's (625 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Kayle basic attacks → Master Yi basic attacks)
- Watch out: Highlander makes Master Yi immune to Kayle's Radiant Blast slow.

### 3. Vladimir (net +0.40)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Master Yi's Alpha Strike. Untargetable for 2 s, long enough to use ahead of Alpha Strike. (Vladimir W Sanguine Pool → Master Yi Q Alpha Strike)
- **0.15** range: Vladimir's basic attacks reach 275 units farther than Master Yi's (450 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Vladimir basic attacks → Master Yi basic attacks)
- Watch out: Alpha Strike makes Master Yi untargetable, dodging Vladimir's Hemoplague.

### 4. Kai'Sa (net +0.34)

- **0.34** range: Kai'Sa's basic attacks reach 350 units farther than Master Yi's (525 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Kai'Sa basic attacks → Master Yi basic attacks)

### 5. Twitch (net +0.33)

- **0.40** range: Twitch's basic attacks reach 375 units farther than Master Yi's (550 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Twitch basic attacks → Master Yi basic attacks)
- Watch out: Highlander makes Master Yi immune to Twitch's Venom Cask slow.

### 6. Xayah (net +0.28)

- **0.41** untargetable: Featherstorm makes Xayah untargetable, dodging Master Yi's Alpha Strike. Untargetable for 1.5 s, long enough to use ahead of Alpha Strike. (Xayah R Featherstorm → Master Yi Q Alpha Strike)
- **0.34** range: Xayah's basic attacks reach 350 units farther than Master Yi's (525 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Xayah basic attacks → Master Yi basic attacks)
- Watch out: Alpha Strike makes Master Yi untargetable, dodging Xayah's Featherstorm.

### 7. Kindred (net +0.28)

- **0.41** range: Kindred's basic attacks reach 325 units farther than Master Yi's (500 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Kindred basic attacks → Master Yi basic attacks)
- **0.24** invulnerable: Lamb's Respite makes Kindred invulnerable to Master Yi's Alpha Strike. Invulnerable for ?; Alpha Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kindred R Lamb's Respite → Master Yi Q Alpha Strike)
- Watch out: Alpha Strike makes Master Yi untargetable, dodging Kindred's Mounting Dread.

### 8. Yunara (net +0.27)

- **0.36** range: Yunara's basic attacks reach 400 units farther than Master Yi's (575 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Yunara basic attacks → Master Yi basic attacks)
- Watch out: Highlander makes Master Yi immune to Yunara's Arc of Judgment slow.

### 9. Elise (net +0.25)

- **0.48** untargetable: Rappel makes Elise untargetable, dodging Master Yi's Alpha Strike. Untargetable for 0.6 s; Alpha Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Master Yi Q Alpha Strike)
- **0.30** range: Elise's basic attacks reach 375 units farther than Master Yi's (550 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Elise basic attacks → Master Yi basic attacks)
- **0.23** interrupt: Cocoon's stun interrupts Master Yi's Meditate (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Master Yi W Meditate)
- Watch out: Alpha Strike makes Master Yi untargetable, dodging Elise's Cocoon.

### 10. Twisted Fate (net +0.25)

- **0.38** range: Twisted Fate's basic attacks reach 350 units farther than Master Yi's (525 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Twisted Fate basic attacks → Master Yi basic attacks)
- **0.23** interrupt: Pick a Card's stun interrupts Master Yi's Meditate (normal channel). Pick a Card must land during the channel. (Twisted Fate W Pick a Card → Master Yi W Meditate)
- Watch out: Alpha Strike makes Master Yi untargetable, dodging Twisted Fate's Pick a Card.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.81 | 0.81 | 0.00 |  |
| 2 | Kayle | +0.72 | 0.79 | 0.07 |  |
| 3 | Vladimir | +0.40 | 0.95 | 0.55 |  |
| 4 | Kai'Sa | +0.34 | 0.34 | 0.00 |  |
| 5 | Twitch | +0.33 | 0.40 | 0.07 |  |
| 6 | Xayah | +0.28 | 0.75 | 0.47 |  |
| 7 | Kindred | +0.28 | 0.65 | 0.37 |  |
| 8 | Yunara | +0.27 | 0.36 | 0.09 |  |
| 9 | Elise | +0.25 | 1.01 | 0.76 |  |
| 10 | Twisted Fate | +0.25 | 0.61 | 0.36 |  |
| 11 | Taric | +0.25 | 0.59 | 0.34 |  |
| 12 | Singed | +0.16 | 0.89 | 0.73 |  |
| 13 | Yuumi | +0.04 | 0.75 | 0.71 |  |
| 14 | Vayne | +0.04 | 0.60 | 0.56 |  |
| 15 | Nidalee | +0.04 | 0.26 | 0.22 |  |
| 16 | Shen | +0.03 | 0.83 | 0.80 | attack block (Spirit's Refuge) |
| 17 | Fiora | +0.03 | 0.53 | 0.50 |  |
| 18 | Teemo | +0.01 | 0.79 | 0.78 | blind (Blinding Dart) |
| 19 | Quinn | -0.03 | 0.57 | 0.60 |  |
| 20 | Nasus | -0.03 | 0.39 | 0.42 |  |
| 21 | Milio | -0.06 | 0.57 | 0.63 |  |
| 22 | Tryndamere | -0.07 | 0.00 | 0.07 |  |
| 23 | Dr. Mundo | -0.09 | 0.00 | 0.09 |  |
| 24 | Kog'Maw | -0.11 | 0.24 | 0.35 |  |
| 25 | Aurora | -0.12 | 0.51 | 0.63 |  |
| 26 | Pantheon | -0.14 | 0.80 | 0.94 |  |
| 27 | Zilean | -0.14 | 0.53 | 0.67 |  |
| 28 | Lulu | -0.16 | 0.81 | 0.97 |  |
| 29 | Jax | -0.19 | 0.67 | 0.86 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 30 | Gwen | -0.21 | 0.48 | 0.69 |  |
| 31 | Zeri | -0.21 | 0.41 | 0.62 |  |
| 32 | Yorick | -0.21 | 0.20 | 0.41 |  |
| 33 | Bard | -0.23 | 0.80 | 1.03 |  |
| 34 | Jayce | -0.23 | 0.49 | 0.72 |  |
| 35 | Zoe | -0.24 | 0.49 | 0.73 |  |
| 36 | Miss Fortune | -0.24 | 0.30 | 0.54 |  |
| 37 | Kennen | -0.25 | 0.50 | 0.75 |  |
| 38 | Ezreal | -0.25 | 0.30 | 0.55 |  |
| 39 | Akshan | -0.26 | 0.29 | 0.55 |  |
| 40 | Malzahar | -0.28 | 0.41 | 0.69 |  |
| 41 | Katarina | -0.29 | 0.18 | 0.47 |  |
| 42 | LeBlanc | -0.30 | 0.19 | 0.49 |  |
| 43 | Sona | -0.31 | 0.49 | 0.80 |  |
| 44 | Samira | -0.31 | 0.26 | 0.57 |  |
| 45 | Soraka | -0.32 | 0.42 | 0.74 |  |
| 46 | Udyr | -0.32 | 0.23 | 0.55 |  |
| 47 | Xerath | -0.34 | 0.44 | 0.78 |  |
| 48 | Olaf | -0.35 | 0.00 | 0.35 |  |
| 49 | Vel'Koz | -0.37 | 0.46 | 0.83 |  |
| 50 | Kalista | -0.37 | 0.38 | 0.75 |  |
| 51 | Lucian | -0.37 | 0.31 | 0.68 |  |
| 52 | Ashe | -0.38 | 0.47 | 0.85 |  |
| 53 | Vex | -0.39 | 0.42 | 0.81 |  |
| 54 | Zed | -0.39 | 0.24 | 0.63 |  |
| 55 | Annie | -0.40 | 0.45 | 0.85 |  |
| 56 | Draven | -0.41 | 0.54 | 0.95 |  |
| 57 | Corki | -0.41 | 0.51 | 0.92 |  |
| 58 | Kayn | -0.41 | 0.49 | 0.90 |  |
| 59 | Varus | -0.42 | 0.45 | 0.87 |  |
| 60 | Rek'Sai | -0.43 | 0.66 | 1.09 |  |
| 61 | Nilah | -0.44 | 0.64 | 1.08 |  |
| 62 | Aatrox | -0.44 | 0.23 | 0.67 |  |
| 63 | Lissandra | -0.46 | 0.70 | 1.16 |  |
| 64 | Janna | -0.46 | 0.53 | 0.99 |  |
| 65 | Kassadin | -0.46 | 0.23 | 0.69 |  |
| 66 | Renekton | -0.46 | 0.23 | 0.69 |  |
| 67 | Shaco | -0.47 | 0.44 | 0.91 |  |
| 68 | Karthus | -0.47 | 0.16 | 0.63 |  |
| 69 | Veigar | -0.48 | 0.41 | 0.89 |  |
| 70 | Garen | -0.48 | 0.23 | 0.71 |  |
| 71 | Ryze | -0.52 | 0.22 | 0.74 |  |
| 72 | Wukong | -0.52 | 0.11 | 0.63 |  |
| 73 | Brand | -0.54 | 0.44 | 0.98 |  |
| 74 | Caitlyn | -0.54 | 0.36 | 0.90 |  |
| 75 | Jinx | -0.54 | 0.25 | 0.79 |  |
| 76 | Smolder | -0.55 | 0.30 | 0.85 |  |
| 77 | Heimerdinger | -0.56 | 0.40 | 0.96 |  |
| 78 | Kha'Zix | -0.56 | 0.00 | 0.56 |  |
| 79 | Nocturne | -0.57 | 0.61 | 1.18 |  |
| 80 | Cassiopeia | -0.58 | 0.70 | 1.28 |  |
| 81 | Ziggs | -0.58 | 0.45 | 1.03 |  |
| 82 | Sion | -0.58 | 0.23 | 0.81 |  |
| 83 | Graves | -0.58 | 0.20 | 0.78 |  |
| 84 | Swain | -0.59 | 0.41 | 1.00 |  |
| 85 | Karma | -0.59 | 0.19 | 0.78 |  |
| 86 | Mordekaiser | -0.61 | 0.32 | 0.93 |  |
| 87 | Lux | -0.61 | 0.27 | 0.88 |  |
| 88 | Camille | -0.62 | 0.48 | 1.10 |  |
| 89 | Fiddlesticks | -0.62 | 0.40 | 1.02 |  |
| 90 | Ivern | -0.62 | 0.16 | 0.78 |  |
| 91 | Illaoi | -0.62 | 0.00 | 0.62 |  |
| 92 | Bel'Veth | -0.63 | 0.23 | 0.86 |  |
| 93 | Riven | -0.63 | 0.19 | 0.82 |  |
| 94 | Tristana | -0.64 | 0.46 | 1.10 |  |
| 95 | Viktor | -0.64 | 0.39 | 1.03 |  |
| 96 | Anivia | -0.66 | 0.47 | 1.13 |  |
| 97 | Mel | -0.66 | 0.25 | 0.91 |  |
| 98 | Xin Zhao | -0.67 | 0.64 | 1.31 |  |
| 99 | Renata Glasc | -0.67 | 0.53 | 1.20 |  |
| 100 | Shyvana | -0.67 | 0.23 | 0.90 |  |
| 101 | Yasuo | -0.67 | 0.23 | 0.90 |  |
| 102 | Maokai | -0.68 | 0.71 | 1.39 |  |
| 103 | Ahri | -0.69 | 0.41 | 1.10 |  |
| 104 | Syndra | -0.69 | 0.39 | 1.08 |  |
| 105 | Orianna | -0.69 | 0.34 | 1.03 |  |
| 106 | Alistar | -0.69 | 0.23 | 0.92 |  |
| 107 | Azir | -0.70 | 0.34 | 1.04 |  |
| 108 | Senna | -0.70 | 0.32 | 1.02 |  |
| 109 | Aurelion Sol | -0.70 | 0.31 | 1.01 |  |
| 110 | Hwei | -0.71 | 0.44 | 1.15 |  |
| 111 | Locke | -0.71 | 0.00 | 0.71 |  |
| 112 | Rumble | -0.71 | 0.00 | 0.71 |  |
| 113 | Zyra | -0.72 | 0.35 | 1.07 |  |
| 114 | Sylas | -0.72 | 0.23 | 0.95 |  |
| 115 | Talon | -0.72 | 0.00 | 0.72 |  |
| 116 | Neeko | -0.74 | 0.32 | 1.06 |  |
| 117 | Cho'Gath | -0.74 | 0.23 | 0.97 |  |
| 118 | Warwick | -0.74 | 0.21 | 0.95 |  |
| 119 | Blitzcrank | -0.76 | 0.23 | 0.99 |  |
| 120 | Lee Sin | -0.76 | 0.11 | 0.87 |  |
| 121 | Gnar | -0.77 | 0.43 | 1.20 |  |
| 122 | Thresh | -0.79 | 0.39 | 1.18 |  |
| 123 | Braum | -0.79 | 0.23 | 1.02 |  |
| 124 | Morgana | -0.79 | 0.16 | 0.95 |  |
| 125 | Rengar | -0.79 | 0.00 | 0.79 |  |
| 126 | Gangplank | -0.83 | 0.00 | 0.83 |  |
| 127 | Seraphine | -0.84 | 0.46 | 1.30 |  |
| 128 | Jhin | -0.84 | 0.25 | 1.09 |  |
| 129 | Irelia | -0.84 | 0.23 | 1.07 |  |
| 130 | Lillia | -0.84 | 0.18 | 1.02 |  |
| 131 | Trundle | -0.86 | 0.18 | 1.04 |  |
| 132 | Nami | -0.88 | 0.44 | 1.32 |  |
| 133 | Ekko | -0.88 | 0.30 | 1.18 |  |
| 134 | Malphite | -0.89 | 0.35 | 1.24 |  |
| 135 | Darius | -0.89 | 0.17 | 1.06 |  |
| 136 | Sett | -0.90 | 0.23 | 1.13 |  |
| 137 | Galio | -0.91 | 0.23 | 1.14 |  |
| 138 | Rammus | -0.92 | 0.58 | 1.50 |  |
| 139 | Aphelios | -0.93 | 0.36 | 1.29 |  |
| 140 | Skarner | -0.93 | 0.11 | 1.04 |  |
| 141 | Vi | -0.95 | 0.23 | 1.18 |  |
| 142 | Nunu & Willump | -0.97 | 0.19 | 1.16 |  |
| 143 | Ambessa | -0.97 | 0.10 | 1.07 |  |
| 144 | Akali | -0.99 | 0.00 | 0.99 |  |
| 145 | Amumu | -1.00 | 0.20 | 1.20 |  |
| 146 | Evelynn | -1.01 | 0.47 | 1.48 |  |
| 147 | Zaahen | -1.01 | 0.23 | 1.24 |  |
| 148 | Kled | -1.02 | 0.31 | 1.33 |  |
| 149 | Yone | -1.04 | 0.23 | 1.27 |  |
| 150 | Urgot | -1.06 | 0.31 | 1.37 |  |
| 151 | Fizz | -1.06 | 0.11 | 1.17 |  |
| 152 | Nautilus | -1.06 | 0.11 | 1.17 |  |
| 153 | Gragas | -1.07 | 0.20 | 1.27 |  |
| 154 | Tahm Kench | -1.08 | 0.23 | 1.31 |  |
| 155 | Poppy | -1.08 | 0.10 | 1.18 |  |
| 156 | Taliyah | -1.09 | 0.42 | 1.51 |  |
| 157 | Diana | -1.09 | 0.11 | 1.20 |  |
| 158 | Leona | -1.11 | 0.23 | 1.34 |  |
| 159 | Naafiri | -1.12 | 0.00 | 1.12 |  |
| 160 | Rell | -1.13 | 0.23 | 1.36 |  |
| 161 | Pyke | -1.15 | 0.21 | 1.36 |  |
| 162 | Hecarim | -1.15 | 0.10 | 1.25 |  |
| 163 | Rakan | -1.17 | 0.20 | 1.37 |  |
| 164 | Volibear | -1.20 | 0.23 | 1.43 |  |
| 165 | Jarvan IV | -1.20 | 0.11 | 1.31 |  |
| 166 | Qiyana | -1.20 | 0.10 | 1.30 |  |
| 167 | Zac | -1.27 | 0.23 | 1.50 |  |
| 168 | Sejuani | -1.28 | 0.23 | 1.51 |  |
| 169 | K'Sante | -1.36 | 0.23 | 1.59 |  |
| 170 | Viego | -1.47 | 0.11 | 1.58 |  |
| 171 | Ornn | -1.48 | 0.23 | 1.71 |  |
| 172 | Briar | -1.50 | 0.11 | 1.61 |  |
