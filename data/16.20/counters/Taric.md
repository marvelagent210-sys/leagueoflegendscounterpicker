# Counters to Taric (patch 26.20)

Every champion ranked by what its kit does against Taric's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Taric's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Taric` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.44)

- **0.88** range: Sivir's basic attacks reach 350 units farther than Taric's (500 vs 150 attack range). Taric has no dash or blink to close the gap. (Sivir basic attacks → Taric basic attacks)
- **0.56** spell shield: Spell Shield's spell shield blocks Taric's Dazzle. Spell shield for 1.5 s, long enough to use ahead of Dazzle. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Taric E Dazzle)

### 2. Teemo (net +1.13)

- **0.63** range: Teemo's basic attacks reach 350 units farther than Taric's (500 vs 150 attack range). Taric has no dash or blink to close the gap. (Teemo basic attacks → Taric basic attacks)
- **0.50** blind: Blinding Dart's blind makes Taric's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Taric basic attacks)

### 3. Lulu (net +1.08)

- **0.72** range: Lulu's basic attacks reach 400 units farther than Taric's (550 vs 150 attack range). Taric has no dash or blink to close the gap. (Lulu basic attacks → Taric basic attacks)
- **0.36** disarm: Whimsy disarms Taric for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Taric basic attacks)

### 4. Milio (net +1.08)

- **0.72** range: Milio's basic attacks reach 375 units farther than Taric's (525 vs 150 attack range). Taric has no dash or blink to close the gap. (Milio basic attacks → Taric basic attacks)
- **0.26** cleanse: Breath of Life cleanses Taric's Dazzle (stun) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Taric E Dazzle)
- **0.19** tenacity: Breath of Life's 65% tenacity shortens Taric's Dazzle (stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Taric E Dazzle)

### 5. Xayah (net +1.05)

- **0.72** range: Xayah's basic attacks reach 375 units farther than Taric's (525 vs 150 attack range). Taric has no dash or blink to close the gap. (Xayah basic attacks → Taric basic attacks)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Taric's Dazzle. Untargetable for 1.5 s, long enough to use ahead of Dazzle. (Xayah R Featherstorm → Taric E Dazzle)

### 6. Bard (net +1.01)

- **0.67** range: Bard's basic attacks reach 350 units farther than Taric's (500 vs 150 attack range). Taric has no dash or blink to close the gap. (Bard basic attacks → Taric basic attacks)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Taric's Dazzle. Untargetable for 2.5 s, long enough to use ahead of Dazzle. (Bard R Tempered Fate → Taric E Dazzle)

### 7. Morgana (net +0.96)

- **0.60** cc immunity: Black Shield makes Morgana immune to Taric's Dazzle (stun). Immune for 5 s, long enough to use ahead of Dazzle. (Morgana E Black Shield → Taric E Dazzle)
- **0.36** range: Morgana's basic attacks reach 300 units farther than Taric's (450 vs 150 attack range). Taric has no dash or blink to close the gap. (Morgana basic attacks → Taric basic attacks)

### 8. Kayle (net +0.89)

- **0.72** range: Kayle's basic attacks reach 475 units farther than Taric's (625 vs 150 attack range). Taric has no dash or blink to close the gap. (Kayle basic attacks → Taric basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Taric's Dazzle (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Dazzle. (Kayle R Divine Judgment → Taric E Dazzle)

### 9. Kindred (net +0.88)

- **0.88** range: Kindred's basic attacks reach 350 units farther than Taric's (500 vs 150 attack range). Taric has no dash or blink to close the gap. (Kindred basic attacks → Taric basic attacks)

### 10. Zeri (net +0.88)

- **0.88** range: Zeri's basic attacks reach 400 units farther than Taric's (550 vs 150 attack range). Taric has no dash or blink to close the gap. (Zeri basic attacks → Taric basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.44 | 1.44 | 0.00 | range (attacks) |
| 2 | Teemo | +1.13 | 1.13 | 0.00 | range (attacks), blind (Blinding Dart) |
| 3 | Lulu | +1.08 | 1.08 | 0.00 | range (attacks) |
| 4 | Milio | +1.08 | 1.08 | 0.00 | range (attacks) |
| 5 | Xayah | +1.05 | 1.05 | 0.00 | range (attacks) |
| 6 | Bard | +1.01 | 1.01 | 0.00 | range (attacks) |
| 7 | Morgana | +0.96 | 0.96 | 0.00 |  |
| 8 | Kayle | +0.89 | 0.89 | 0.00 | range (attacks) |
| 9 | Kindred | +0.88 | 0.88 | 0.00 | range (attacks) |
| 10 | Zeri | +0.88 | 0.88 | 0.00 | range (attacks) |
| 11 | Kalista | +0.87 | 0.87 | 0.00 | range (attacks) |
| 12 | Vladimir | +0.86 | 0.93 | 0.07 |  |
| 13 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 14 | Vayne | +0.86 | 0.86 | 0.00 | range (attacks) |
| 15 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 16 | Aurora | +0.78 | 0.78 | 0.00 | range (attacks) |
| 17 | Lissandra | +0.78 | 0.78 | 0.00 |  |
| 18 | Aphelios | +0.77 | 0.77 | 0.00 | range (attacks) |
| 19 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 20 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 21 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 22 | Kai'Sa | +0.72 | 0.72 | 0.00 | range (attacks) |
| 23 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 24 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 25 | Nocturne | +0.70 | 0.70 | 0.00 |  |
| 26 | Udyr | +0.70 | 0.70 | 0.00 |  |
| 27 | Elise | +0.65 | 0.65 | 0.00 | range (attacks) |
| 28 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 29 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 30 | Smolder | +0.65 | 0.65 | 0.00 | range (attacks) |
| 31 | Zilean | +0.65 | 0.65 | 0.00 | range (attacks) |
| 32 | Zoe | +0.65 | 0.65 | 0.00 | range (attacks) |
| 33 | Gnar | +0.62 | 0.62 | 0.00 | range (attacks) |
| 34 | Yuumi | +0.61 | 1.01 | 0.40 | range (attacks) |
| 35 | Viktor | +0.61 | 0.61 | 0.00 | range (attacks) |
| 36 | Varus | +0.60 | 0.71 | 0.11 | range (attacks) |
| 37 | Corki | +0.60 | 0.60 | 0.00 | range (attacks) |
| 38 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 39 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 40 | Jayce | +0.57 | 0.57 | 0.00 | range (attacks) |
| 41 | Samira | +0.57 | 0.57 | 0.00 | range (attacks) |
| 42 | Nidalee | +0.56 | 0.56 | 0.00 | range (attacks) |
| 43 | Rengar | +0.56 | 0.56 | 0.00 |  |
| 44 | Quinn | +0.54 | 0.72 | 0.18 | range (attacks) |
| 45 | Jinx | +0.54 | 0.54 | 0.00 | range (attacks) |
| 46 | Nilah | +0.54 | 0.54 | 0.00 |  |
| 47 | Seraphine | +0.54 | 0.54 | 0.00 | range (attacks) |
| 48 | Mel | +0.53 | 0.53 | 0.00 | range (attacks) |
| 49 | Soraka | +0.53 | 0.53 | 0.00 | range (attacks) |
| 50 | Vex | +0.53 | 0.53 | 0.00 | range (attacks) |
| 51 | Ziggs | +0.53 | 0.53 | 0.00 | range (attacks) |
| 52 | Fiora | +0.51 | 0.51 | 0.00 |  |
| 53 | Gangplank | +0.51 | 0.51 | 0.00 |  |
| 54 | Kog'Maw | +0.51 | 0.51 | 0.00 | range (attacks) |
| 55 | Azir | +0.50 | 0.50 | 0.00 | range (attacks) |
| 56 | Orianna | +0.50 | 0.50 | 0.00 | range (attacks) |
| 57 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 58 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 59 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 60 | Twisted Fate | +0.46 | 0.81 | 0.35 | range (attacks) |
| 61 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 62 | Graves | +0.45 | 0.45 | 0.00 |  |
| 63 | Caitlyn | +0.44 | 0.72 | 0.28 | range (attacks) |
| 64 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 65 | Annie | +0.44 | 0.44 | 0.00 |  |
| 66 | Brand | +0.44 | 0.44 | 0.00 |  |
| 67 | Cassiopeia | +0.44 | 0.44 | 0.00 |  |
| 68 | Nami | +0.44 | 0.44 | 0.00 |  |
| 69 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 70 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 71 | Fizz | +0.42 | 0.42 | 0.00 |  |
| 72 | Maokai | +0.42 | 0.42 | 0.00 |  |
| 73 | Jax | +0.41 | 0.41 | 0.00 | attack dodge (Counter Strike) |
| 74 | Karma | +0.41 | 0.41 | 0.00 |  |
| 75 | Kled | +0.41 | 0.41 | 0.00 |  |
| 76 | LeBlanc | +0.41 | 0.41 | 0.00 |  |
| 77 | Heimerdinger | +0.40 | 0.40 | 0.00 |  |
| 78 | Lucian | +0.39 | 0.67 | 0.28 | range (attacks) |
| 79 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 80 | Swain | +0.39 | 0.39 | 0.00 |  |
| 81 | Miss Fortune | +0.37 | 0.65 | 0.28 | range (attacks) |
| 82 | Aurelion Sol | +0.36 | 0.44 | 0.08 |  |
| 83 | Thresh | +0.36 | 0.36 | 0.00 |  |
| 84 | Akshan | +0.35 | 0.63 | 0.28 | range (attacks) |
| 85 | Gwen | +0.34 | 0.34 | 0.00 |  |
| 86 | Olaf | +0.34 | 0.34 | 0.00 |  |
| 87 | Rek'Sai | +0.34 | 0.34 | 0.00 |  |
| 88 | Malzahar | +0.33 | 0.73 | 0.40 |  |
| 89 | Janna | +0.32 | 0.72 | 0.40 | range (attacks) |
| 90 | Alistar | +0.27 | 0.27 | 0.00 |  |
| 91 | Singed | +0.27 | 0.27 | 0.00 |  |
| 92 | Urgot | +0.27 | 0.27 | 0.00 |  |
| 93 | Jhin | +0.25 | 0.53 | 0.28 | range (attacks) |
| 94 | Malphite | +0.25 | 0.25 | 0.00 |  |
| 95 | Sion | +0.24 | 0.36 | 0.12 |  |
| 96 | Vel'Koz | +0.22 | 0.50 | 0.28 | range (attacks) |
| 97 | Ivern | +0.22 | 0.36 | 0.14 |  |
| 98 | Rakan | +0.22 | 0.22 | 0.00 |  |
| 99 | Evelynn | +0.21 | 0.21 | 0.00 |  |
| 100 | Shaco | +0.21 | 0.21 | 0.00 |  |
| 101 | Zaahen | +0.21 | 0.21 | 0.00 |  |
| 102 | Camille | +0.20 | 0.20 | 0.00 |  |
| 103 | Zed | +0.20 | 0.20 | 0.00 |  |
| 104 | Lillia | +0.19 | 0.19 | 0.00 |  |
| 105 | Xerath | +0.18 | 0.50 | 0.32 | range (attacks) |
| 106 | Garen | +0.18 | 0.18 | 0.00 |  |
| 107 | Xin Zhao | +0.17 | 0.17 | 0.00 |  |
| 108 | Rammus | +0.14 | 0.38 | 0.24 |  |
| 109 | Master Yi | +0.14 | 0.34 | 0.20 |  |
| 110 | Ryze | +0.13 | 0.48 | 0.35 |  |
| 111 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 112 | Karthus | +0.08 | 0.36 | 0.28 |  |
| 113 | Taliyah | +0.02 | 0.50 | 0.48 | range (attacks) |
| 114 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 115 | Akali | 0.00 | 0.00 | 0.00 |  |
| 116 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 117 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 118 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 119 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 120 | Braum | 0.00 | 0.00 | 0.00 |  |
| 121 | Briar | 0.00 | 0.00 | 0.00 |  |
| 122 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 123 | Darius | 0.00 | 0.00 | 0.00 |  |
| 124 | Diana | 0.00 | 0.00 | 0.00 |  |
| 125 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 126 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 127 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 128 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 129 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 130 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 131 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 132 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 133 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 134 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 135 | Leona | 0.00 | 0.00 | 0.00 |  |
| 136 | Locke | 0.00 | 0.00 | 0.00 |  |
| 137 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 138 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 139 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 140 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 141 | Rell | 0.00 | 0.00 | 0.00 |  |
| 142 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 143 | Riven | 0.00 | 0.00 | 0.00 |  |
| 144 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 145 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 146 | Sett | 0.00 | 0.00 | 0.00 |  |
| 147 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 148 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 149 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 150 | Talon | 0.00 | 0.00 | 0.00 |  |
| 151 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 152 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 153 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 154 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 155 | Yone | 0.00 | 0.00 | 0.00 |  |
| 156 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 157 | Shen | -0.06 | 0.39 | 0.45 |  |
| 158 | Fiddlesticks | -0.08 | 0.36 | 0.44 |  |
| 159 | Katarina | -0.10 | 0.18 | 0.28 |  |
| 160 | Pyke | -0.14 | 0.00 | 0.14 |  |
| 161 | Gragas | -0.15 | 0.00 | 0.15 |  |
| 162 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 163 | Viego | -0.20 | 0.00 | 0.20 |  |
| 164 | Pantheon | -0.22 | 0.28 | 0.50 |  |
| 165 | Kayn | -0.24 | 0.21 | 0.45 |  |
| 166 | Vi | -0.35 | 0.00 | 0.35 |  |
| 167 | Warwick | -0.43 | 0.21 | 0.64 |  |
| 168 | Zac | -0.43 | 0.00 | 0.43 |  |
| 169 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 170 | Nunu & Willump | -0.49 | 0.00 | 0.49 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Galio | -0.59 | 0.00 | 0.59 |  |
