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

### 2. Lulu (net +0.98)

- **0.72** range: Lulu's basic attacks reach 400 units farther than Taric's (550 vs 150 attack range). Taric has no dash or blink to close the gap. (Lulu basic attacks → Taric basic attacks)
- **0.36** disarm: Whimsy disarms Taric for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Taric basic attacks)
- Watch out: Cosmic Radiance makes Taric invulnerable to Lulu's Help, Pix! (its crowd control still applies).

### 3. Teemo (net +0.94)

- **0.63** range: Teemo's basic attacks reach 350 units farther than Taric's (500 vs 150 attack range). Taric has no dash or blink to close the gap. (Teemo basic attacks → Taric basic attacks)
- **0.50** blind: Blinding Dart's blind makes Taric's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Taric basic attacks)
- Watch out: Cosmic Radiance makes Taric invulnerable to Teemo's Noxious Trap (its crowd control still applies).

### 4. Milio (net +0.92)

- **0.72** range: Milio's basic attacks reach 375 units farther than Taric's (525 vs 150 attack range). Taric has no dash or blink to close the gap. (Milio basic attacks → Taric basic attacks)
- **0.26** cleanse: Breath of Life cleanses Taric's Dazzle (stun) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Taric E Dazzle)
- **0.19** tenacity: Breath of Life's 65% tenacity shortens Taric's Dazzle (stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Taric E Dazzle)
- Watch out: Cosmic Radiance makes Taric invulnerable to Milio's Ultra Mega Fire Kick (its crowd control still applies).

### 5. Bard (net +0.91)

- **0.67** range: Bard's basic attacks reach 350 units farther than Taric's (500 vs 150 attack range). Taric has no dash or blink to close the gap. (Bard basic attacks → Taric basic attacks)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Taric's Dazzle. Untargetable for 2.5 s, long enough to use ahead of Dazzle. (Bard R Tempered Fate → Taric E Dazzle)
- Watch out: Cosmic Radiance makes Taric invulnerable to Bard's Cosmic Binding (its crowd control still applies).

### 6. Kayle (net +0.89)

- **0.72** range: Kayle's basic attacks reach 475 units farther than Taric's (625 vs 150 attack range). Taric has no dash or blink to close the gap. (Kayle basic attacks → Taric basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Taric's Dazzle (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Dazzle. (Kayle R Divine Judgment → Taric E Dazzle)

### 7. Kindred (net +0.88)

- **0.88** range: Kindred's basic attacks reach 350 units farther than Taric's (500 vs 150 attack range). Taric has no dash or blink to close the gap. (Kindred basic attacks → Taric basic attacks)
- **0.10** invulnerable: Lamb's Respite makes Kindred invulnerable to Taric's Dazzle (its crowd control still applies). Invulnerable for ?; Dazzle lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kindred R Lamb's Respite → Taric E Dazzle)
- Watch out: Cosmic Radiance makes Taric invulnerable to Kindred's Mounting Dread (its crowd control still applies).

### 8. Twitch (net +0.86)

- **0.86** range: Twitch's basic attacks reach 400 units farther than Taric's (550 vs 150 attack range). Taric has no dash or blink to close the gap. (Twitch basic attacks → Taric basic attacks)

### 9. Kalista (net +0.73)

- **0.61** range: Kalista's basic attacks reach 375 units farther than Taric's (525 vs 150 attack range). Taric has no dash or blink to close the gap. (Kalista basic attacks → Taric basic attacks)
- **0.26** cleanse: Fate's Call cleanses Taric's Dazzle (stun) after it lands. 120 s cooldown; usable while crowd controlled. (Kalista R Fate's Call → Taric E Dazzle)
- Watch out: Cosmic Radiance makes Taric invulnerable to Kalista's Basic Attack.

### 10. Kai'Sa (net +0.72)

- **0.72** range: Kai'Sa's basic attacks reach 375 units farther than Taric's (525 vs 150 attack range). Taric has no dash or blink to close the gap. (Kai'Sa basic attacks → Taric basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.44 | 1.44 | 0.00 | range (attacks) |
| 2 | Lulu | +0.98 | 1.08 | 0.10 | range (attacks) |
| 3 | Teemo | +0.94 | 1.13 | 0.19 | range (attacks), blind (Blinding Dart) |
| 4 | Milio | +0.92 | 1.08 | 0.16 | range (attacks) |
| 5 | Bard | +0.91 | 1.01 | 0.10 | range (attacks) |
| 6 | Kayle | +0.89 | 0.89 | 0.00 | range (attacks) |
| 7 | Kindred | +0.88 | 0.98 | 0.10 | range (attacks) |
| 8 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 9 | Kalista | +0.73 | 0.87 | 0.14 | range (attacks) |
| 10 | Kai'Sa | +0.72 | 0.72 | 0.00 | range (attacks) |
| 11 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 12 | Vayne | +0.70 | 0.86 | 0.16 | range (attacks) |
| 13 | Elise | +0.63 | 0.99 | 0.36 | range (attacks) |
| 14 | Morgana | +0.63 | 0.96 | 0.33 |  |
| 15 | Renata Glasc | +0.60 | 0.77 | 0.17 | range (attacks) |
| 16 | Udyr | +0.58 | 0.70 | 0.12 |  |
| 17 | Zilean | +0.50 | 0.65 | 0.15 | range (attacks) |
| 18 | Zoe | +0.49 | 0.65 | 0.16 | range (attacks) |
| 19 | Xayah | +0.48 | 1.05 | 0.57 | range (attacks) |
| 20 | Zeri | +0.47 | 0.88 | 0.41 | range (attacks) |
| 21 | Sona | +0.47 | 0.83 | 0.36 | range (attacks) |
| 22 | Aurora | +0.46 | 0.78 | 0.32 | range (attacks) |
| 23 | Ashe | +0.44 | 0.72 | 0.28 | range (attacks) |
| 24 | Kled | +0.41 | 0.41 | 0.00 |  |
| 25 | Fiora | +0.40 | 0.51 | 0.11 |  |
| 26 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 27 | Lissandra | +0.38 | 0.78 | 0.40 |  |
| 28 | Yuumi | +0.36 | 1.01 | 0.65 | range (attacks) |
| 29 | Soraka | +0.36 | 0.53 | 0.17 | range (attacks) |
| 30 | Jayce | +0.34 | 0.57 | 0.23 | range (attacks) |
| 31 | Aphelios | +0.33 | 0.77 | 0.44 | range (attacks) |
| 32 | Varus | +0.32 | 0.71 | 0.39 | range (attacks) |
| 33 | Gnar | +0.32 | 0.62 | 0.30 | range (attacks) |
| 34 | Twisted Fate | +0.31 | 0.81 | 0.50 | range (attacks) |
| 35 | Nidalee | +0.30 | 0.56 | 0.26 | range (attacks) |
| 36 | Viktor | +0.29 | 0.61 | 0.32 | range (attacks) |
| 37 | Rengar | +0.26 | 0.56 | 0.30 |  |
| 38 | Tristana | +0.25 | 0.72 | 0.47 | range (attacks) |
| 39 | Kog'Maw | +0.25 | 0.51 | 0.26 | range (attacks) |
| 40 | Smolder | +0.24 | 0.65 | 0.41 | range (attacks) |
| 41 | Corki | +0.24 | 0.60 | 0.36 | range (attacks) |
| 42 | Vladimir | +0.21 | 0.93 | 0.72 |  |
| 43 | Caitlyn | +0.21 | 0.72 | 0.51 | range (attacks) |
| 44 | Nocturne | +0.21 | 0.70 | 0.49 |  |
| 45 | Vex | +0.21 | 0.53 | 0.32 | range (attacks) |
| 46 | Quinn | +0.20 | 0.72 | 0.52 | range (attacks) |
| 47 | Karma | +0.20 | 0.41 | 0.21 |  |
| 48 | Ezreal | +0.18 | 0.65 | 0.47 | range (attacks) |
| 49 | Lux | +0.17 | 0.58 | 0.41 | range (attacks) |
| 50 | Samira | +0.17 | 0.57 | 0.40 | range (attacks) |
| 51 | LeBlanc | +0.17 | 0.41 | 0.24 |  |
| 52 | Heimerdinger | +0.16 | 0.40 | 0.24 |  |
| 53 | Akshan | +0.14 | 0.63 | 0.49 | range (attacks) |
| 54 | Anivia | +0.14 | 0.48 | 0.34 |  |
| 55 | Olaf | +0.14 | 0.34 | 0.20 |  |
| 56 | Gangplank | +0.13 | 0.51 | 0.38 |  |
| 57 | Jinx | +0.12 | 0.54 | 0.42 | range (attacks) |
| 58 | Gwen | +0.12 | 0.34 | 0.22 |  |
| 59 | Singed | +0.12 | 0.27 | 0.15 |  |
| 60 | Janna | +0.11 | 0.72 | 0.61 | range (attacks) |
| 61 | Hwei | +0.11 | 0.46 | 0.35 |  |
| 62 | Veigar | +0.09 | 0.48 | 0.39 |  |
| 63 | Orianna | +0.08 | 0.50 | 0.42 | range (attacks) |
| 64 | Brand | +0.08 | 0.44 | 0.36 |  |
| 65 | Draven | +0.06 | 0.72 | 0.66 | range (attacks) |
| 66 | Seraphine | +0.06 | 0.54 | 0.48 | range (attacks) |
| 67 | Zyra | +0.06 | 0.48 | 0.42 |  |
| 68 | Kennen | +0.03 | 0.58 | 0.55 | range (attacks) |
| 69 | Senna | +0.02 | 0.65 | 0.63 | range (attacks) |
| 70 | Ziggs | +0.02 | 0.53 | 0.51 | range (attacks) |
| 71 | Neeko | +0.02 | 0.44 | 0.42 |  |
| 72 | Nilah | +0.01 | 0.54 | 0.53 |  |
| 73 | Mel | +0.01 | 0.53 | 0.52 | range (attacks) |
| 74 | Azir | +0.01 | 0.50 | 0.49 | range (attacks) |
| 75 | Thresh | 0.00 | 0.36 | 0.36 |  |
| 76 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 77 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 78 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 79 | Shaco | -0.01 | 0.21 | 0.22 |  |
| 80 | Cassiopeia | -0.02 | 0.44 | 0.46 |  |
| 81 | Ivern | -0.02 | 0.36 | 0.38 |  |
| 82 | Alistar | -0.03 | 0.27 | 0.30 |  |
| 83 | Graves | -0.04 | 0.45 | 0.49 |  |
| 84 | Nami | -0.06 | 0.44 | 0.50 |  |
| 85 | Mordekaiser | -0.06 | 0.09 | 0.15 |  |
| 86 | Maokai | -0.07 | 0.42 | 0.49 |  |
| 87 | Vel'Koz | -0.08 | 0.50 | 0.58 | range (attacks) |
| 88 | Malzahar | -0.12 | 0.73 | 0.85 |  |
| 89 | Sion | -0.12 | 0.36 | 0.48 |  |
| 90 | Jhin | -0.13 | 0.53 | 0.66 | range (attacks) |
| 91 | Urgot | -0.13 | 0.27 | 0.40 |  |
| 92 | Taliyah | -0.14 | 0.50 | 0.64 | range (attacks) |
| 93 | Aurelion Sol | -0.14 | 0.44 | 0.58 |  |
| 94 | Garen | -0.14 | 0.18 | 0.32 |  |
| 95 | Rek'Sai | -0.15 | 0.34 | 0.49 |  |
| 96 | Lucian | -0.18 | 0.67 | 0.85 | range (attacks) |
| 97 | Ryze | -0.18 | 0.48 | 0.66 |  |
| 98 | Lillia | -0.19 | 0.19 | 0.38 |  |
| 99 | Aatrox | -0.20 | 0.00 | 0.20 |  |
| 100 | Rumble | -0.22 | 0.00 | 0.22 |  |
| 101 | Annie | -0.23 | 0.44 | 0.67 |  |
| 102 | Syndra | -0.23 | 0.44 | 0.67 |  |
| 103 | Shyvana | -0.23 | 0.00 | 0.23 |  |
| 104 | Rakan | -0.24 | 0.22 | 0.46 |  |
| 105 | Miss Fortune | -0.25 | 0.65 | 0.90 | range (attacks) |
| 106 | Master Yi | -0.25 | 0.34 | 0.59 |  |
| 107 | Malphite | -0.25 | 0.25 | 0.50 |  |
| 108 | Ahri | -0.27 | 0.44 | 0.71 |  |
| 109 | Jax | -0.27 | 0.41 | 0.68 | attack dodge (Counter Strike) |
| 110 | Swain | -0.27 | 0.39 | 0.66 |  |
| 111 | Bel'Veth | -0.28 | 0.00 | 0.28 |  |
| 112 | Blitzcrank | -0.28 | 0.00 | 0.28 |  |
| 113 | Lee Sin | -0.28 | 0.00 | 0.28 |  |
| 114 | Shen | -0.29 | 0.39 | 0.68 |  |
| 115 | Rammus | -0.32 | 0.38 | 0.70 |  |
| 116 | Xin Zhao | -0.32 | 0.17 | 0.49 |  |
| 117 | Kha'Zix | -0.33 | 0.00 | 0.33 |  |
| 118 | Pantheon | -0.35 | 0.28 | 0.63 |  |
| 119 | Camille | -0.35 | 0.20 | 0.55 |  |
| 120 | Braum | -0.36 | 0.00 | 0.36 |  |
| 121 | Katarina | -0.39 | 0.18 | 0.57 |  |
| 122 | Xerath | -0.40 | 0.50 | 0.90 | range (attacks) |
| 123 | Riven | -0.40 | 0.00 | 0.40 |  |
| 124 | Skarner | -0.40 | 0.00 | 0.40 |  |
| 125 | Illaoi | -0.41 | 0.00 | 0.41 |  |
| 126 | Nautilus | -0.41 | 0.00 | 0.41 |  |
| 127 | Ekko | -0.42 | 0.23 | 0.65 |  |
| 128 | Leona | -0.43 | 0.00 | 0.43 |  |
| 129 | Darius | -0.44 | 0.00 | 0.44 |  |
| 130 | Trundle | -0.44 | 0.00 | 0.44 |  |
| 131 | Ambessa | -0.45 | 0.00 | 0.45 |  |
| 132 | Hecarim | -0.45 | 0.00 | 0.45 |  |
| 133 | Kassadin | -0.46 | 0.00 | 0.46 |  |
| 134 | Locke | -0.46 | 0.00 | 0.46 |  |
| 135 | Sylas | -0.46 | 0.00 | 0.46 |  |
| 136 | Karthus | -0.47 | 0.36 | 0.83 |  |
| 137 | Amumu | -0.48 | 0.00 | 0.48 |  |
| 138 | Sett | -0.48 | 0.00 | 0.48 |  |
| 139 | Cho'Gath | -0.49 | 0.00 | 0.49 |  |
| 140 | Fizz | -0.50 | 0.00 | 0.50 |  |
| 141 | Irelia | -0.50 | 0.00 | 0.50 |  |
| 142 | Sejuani | -0.50 | 0.00 | 0.50 |  |
| 143 | Yone | -0.51 | 0.00 | 0.51 |  |
| 144 | Briar | -0.52 | 0.00 | 0.52 |  |
| 145 | Jarvan IV | -0.52 | 0.00 | 0.52 |  |
| 146 | Wukong | -0.52 | 0.00 | 0.52 |  |
| 147 | Rell | -0.52 | 0.00 | 0.52 |  |
| 148 | Renekton | -0.52 | 0.00 | 0.52 |  |
| 149 | Diana | -0.54 | 0.00 | 0.54 |  |
| 150 | Yasuo | -0.54 | 0.00 | 0.54 |  |
| 151 | Gragas | -0.56 | 0.00 | 0.56 |  |
| 152 | K'Sante | -0.56 | 0.00 | 0.56 |  |
| 153 | Talon | -0.56 | 0.00 | 0.56 |  |
| 154 | Ornn | -0.58 | 0.00 | 0.58 |  |
| 155 | Volibear | -0.59 | 0.00 | 0.59 |  |
| 156 | Zed | -0.61 | 0.20 | 0.81 |  |
| 157 | Warwick | -0.62 | 0.21 | 0.83 |  |
| 158 | Qiyana | -0.62 | 0.00 | 0.62 |  |
| 159 | Zaahen | -0.63 | 0.21 | 0.84 |  |
| 160 | Akali | -0.63 | 0.00 | 0.63 |  |
| 161 | Poppy | -0.65 | 0.00 | 0.65 |  |
| 162 | Kayn | -0.68 | 0.21 | 0.89 |  |
| 163 | Viego | -0.71 | 0.00 | 0.71 |  |
| 164 | Tahm Kench | -0.75 | 0.00 | 0.75 |  |
| 165 | Evelynn | -0.76 | 0.21 | 0.97 |  |
| 166 | Fiddlesticks | -0.77 | 0.36 | 1.13 |  |
| 167 | Naafiri | -0.81 | 0.00 | 0.81 |  |
| 168 | Galio | -0.83 | 0.00 | 0.83 |  |
| 169 | Nunu & Willump | -0.88 | 0.00 | 0.88 |  |
| 170 | Vi | -0.89 | 0.00 | 0.89 |  |
| 171 | Zac | -0.92 | 0.00 | 0.92 |  |
| 172 | Pyke | -1.17 | 0.00 | 1.17 |  |
