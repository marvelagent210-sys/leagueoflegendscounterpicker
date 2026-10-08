# Counters to Sivir (patch 26.20)

Every champion ranked by what its kit does against Sivir's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Sivir's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Sivir` for the full ledger of a matchup, with sources.

## Top 10

### 1. Teemo (net +0.24)

- **0.66** blind: Blinding Dart's blind makes Sivir's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Sivir basic attacks)
- Watch out: Spell Shield's spell shield blocks Teemo's Blinding Dart.

### 2. Kayle (net +0.22)

- **0.22** range: Kayle's basic attacks reach 125 units farther than Sivir's (625 vs 500 attack range). Sivir has no dash or blink to close the gap. (Kayle basic attacks → Sivir basic attacks)

### 3. Yunara (net +0.14)

- **0.14** range: Yunara's basic attacks reach 75 units farther than Sivir's (575 vs 500 attack range). Sivir has no dash or blink to close the gap. (Yunara basic attacks → Sivir basic attacks)

### 4. Samira (net 0.00)

- **0.42** projectile block: Blade Whirl blocks Sivir's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Sivir basic attacks)
- **0.28** projectile block: Blade Whirl blocks Sivir's Boomerang Blade, a projectile. Blade Whirl for 0.75 s; Boomerang Blade takes 1.11 s to land, enough to react. (Samira W Blade Whirl → Sivir Q Boomerang Blade)
- Watch out: Spell Shield's spell shield blocks Samira's Wild Rush.

### 5. Kai'Sa (net 0.00)

- No interaction in Kai'Sa's favor.

### 6. Twitch (net 0.00)

- No interaction in Twitch's favor.

### 7. Mel (net -0.12)

- **0.42** projectile block: Rebuttal blocks Sivir's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Sivir basic attacks)
- **0.26** projectile block: Rebuttal blocks Sivir's Boomerang Blade, a projectile. Rebuttal for 0.75 s; Boomerang Blade takes 1.11 s to land, enough to react. (Mel W Rebuttal → Sivir Q Boomerang Blade)
- Watch out: Spell Shield's spell shield blocks Mel's Golden Eclipse.

### 8. Miss Fortune (net -0.14)

- No interaction in Miss Fortune's favor.
- Watch out: Spell Shield's spell shield blocks part of Miss Fortune's Double Up.

### 9. Anivia (net -0.28)

- **0.12** range: Anivia's basic attacks reach 100 units farther than Sivir's (600 vs 500 attack range). Sivir has no dash or blink to close the gap. (Anivia basic attacks → Sivir basic attacks)
- Watch out: Spell Shield's spell shield blocks Anivia's Frostbite.

### 10. Akshan (net -0.28)

- No interaction in Akshan's favor.
- Watch out: Spell Shield's spell shield blocks part of Akshan's Comeuppance.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +0.24 | 0.66 | 0.42 | blind (Blinding Dart) |
| 2 | Kayle | +0.22 | 0.22 | 0.00 |  |
| 3 | Yunara | +0.14 | 0.14 | 0.00 |  |
| 4 | Samira | 0.00 | 0.56 | 0.56 | projectile block (Blade Whirl) |
| 5 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 6 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 7 | Mel | -0.12 | 0.55 | 0.67 | projectile block (Rebuttal) |
| 8 | Miss Fortune | -0.14 | 0.00 | 0.14 |  |
| 9 | Anivia | -0.28 | 0.12 | 0.40 |  |
| 10 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 11 | Kog'Maw | -0.28 | 0.00 | 0.28 |  |
| 12 | Zeri | -0.28 | 0.00 | 0.28 |  |
| 13 | Kindred | -0.30 | 0.00 | 0.30 |  |
| 14 | Zoe | -0.30 | 0.00 | 0.30 |  |
| 15 | Soraka | -0.33 | 0.00 | 0.33 |  |
| 16 | Braum | -0.34 | 0.93 | 1.27 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 17 | Karma | -0.35 | 0.00 | 0.35 |  |
| 18 | LeBlanc | -0.36 | 0.00 | 0.36 |  |
| 19 | Nidalee | -0.36 | 0.00 | 0.36 |  |
| 20 | Yuumi | -0.37 | 0.00 | 0.37 |  |
| 21 | Yasuo | -0.38 | 0.70 | 1.08 | projectile block (Wind Wall) |
| 22 | Graves | -0.41 | 0.00 | 0.41 |  |
| 23 | Jinx | -0.41 | 0.00 | 0.41 |  |
| 24 | Lucian | -0.41 | 0.00 | 0.41 |  |
| 25 | Tryndamere | -0.41 | 0.00 | 0.41 |  |
| 26 | Vladimir | -0.41 | 0.00 | 0.41 |  |
| 27 | Twisted Fate | -0.42 | 0.00 | 0.42 |  |
| 28 | Swain | -0.50 | 0.00 | 0.50 |  |
| 29 | Milio | -0.51 | 0.00 | 0.51 |  |
| 30 | Vel'Koz | -0.51 | 0.00 | 0.51 |  |
| 31 | Varus | -0.52 | 0.28 | 0.80 |  |
| 32 | Shen | -0.53 | 0.51 | 1.04 | attack block (Spirit's Refuge) |
| 33 | Caitlyn | -0.54 | 0.27 | 0.81 |  |
| 34 | Corki | -0.55 | 0.00 | 0.55 |  |
| 35 | Ezreal | -0.55 | 0.00 | 0.55 |  |
| 36 | Karthus | -0.55 | 0.00 | 0.55 |  |
| 37 | Vayne | -0.56 | 0.00 | 0.56 |  |
| 38 | Lulu | -0.59 | 0.47 | 1.06 | disarm (Whimsy) |
| 39 | Malzahar | -0.61 | 0.00 | 0.61 |  |
| 40 | Ashe | -0.62 | 0.18 | 0.80 |  |
| 41 | Lillia | -0.62 | 0.00 | 0.62 |  |
| 42 | Ryze | -0.63 | 0.00 | 0.63 |  |
| 43 | Tristana | -0.64 | 0.36 | 1.00 |  |
| 44 | Brand | -0.65 | 0.00 | 0.65 |  |
| 45 | Morgana | -0.65 | 0.00 | 0.65 |  |
| 46 | Lissandra | -0.67 | 0.00 | 0.67 |  |
| 47 | Xayah | -0.67 | 0.00 | 0.67 |  |
| 48 | Annie | -0.68 | 0.14 | 0.82 |  |
| 49 | Naafiri | -0.68 | 0.00 | 0.68 |  |
| 50 | Zilean | -0.68 | 0.00 | 0.68 |  |
| 51 | Jayce | -0.69 | 0.00 | 0.69 |  |
| 52 | Smolder | -0.69 | 0.00 | 0.69 |  |
| 53 | Aurora | -0.70 | 0.00 | 0.70 |  |
| 54 | Draven | -0.70 | 0.00 | 0.70 |  |
| 55 | Vex | -0.70 | 0.00 | 0.70 |  |
| 56 | Katarina | -0.71 | 0.18 | 0.89 |  |
| 57 | Senna | -0.71 | 0.16 | 0.87 |  |
| 58 | Aphelios | -0.71 | 0.00 | 0.71 |  |
| 59 | Neeko | -0.71 | 0.00 | 0.71 |  |
| 60 | Nilah | -0.72 | 0.46 | 1.18 | attack dodge (Jubilant Veil) |
| 61 | Fiddlesticks | -0.72 | 0.00 | 0.72 |  |
| 62 | Gwen | -0.72 | 0.00 | 0.72 |  |
| 63 | Jax | -0.74 | 0.53 | 1.27 | attack dodge (Counter Strike) |
| 64 | Fiora | -0.74 | 0.12 | 0.86 |  |
| 65 | Illaoi | -0.75 | 0.00 | 0.75 |  |
| 66 | Kennen | -0.75 | 0.00 | 0.75 |  |
| 67 | Locke | -0.75 | 0.00 | 0.75 |  |
| 68 | Elise | -0.76 | 0.00 | 0.76 |  |
| 69 | Ivern | -0.76 | 0.00 | 0.76 |  |
| 70 | Zed | -0.76 | 0.00 | 0.76 |  |
| 71 | Quinn | -0.77 | 0.00 | 0.77 |  |
| 72 | Viktor | -0.78 | 0.00 | 0.78 |  |
| 73 | Nasus | -0.79 | 0.50 | 1.29 | attack speed slow (Wither) |
| 74 | Sona | -0.80 | 0.00 | 0.80 |  |
| 75 | Heimerdinger | -0.81 | 0.00 | 0.81 |  |
| 76 | Lux | -0.81 | 0.00 | 0.81 |  |
| 77 | Master Yi | -0.81 | 0.00 | 0.81 |  |
| 78 | Yorick | -0.81 | 0.00 | 0.81 |  |
| 79 | Xerath | -0.82 | 0.00 | 0.82 |  |
| 80 | Taliyah | -0.85 | 0.00 | 0.85 |  |
| 81 | Rammus | -0.86 | 0.50 | 1.36 | attack reflect (Defensive Ball Curl) |
| 82 | Syndra | -0.86 | 0.00 | 0.86 |  |
| 83 | Bard | -0.87 | 0.00 | 0.87 |  |
| 84 | Jhin | -0.87 | 0.00 | 0.87 |  |
| 85 | Fizz | -0.88 | 0.00 | 0.88 |  |
| 86 | Hwei | -0.88 | 0.00 | 0.88 |  |
| 87 | Veigar | -0.89 | 0.00 | 0.89 |  |
| 88 | Aatrox | -0.92 | 0.00 | 0.92 |  |
| 89 | Cassiopeia | -0.92 | 0.00 | 0.92 |  |
| 90 | Dr. Mundo | -0.94 | 0.00 | 0.94 |  |
| 91 | Jarvan IV | -0.94 | 0.00 | 0.94 |  |
| 92 | Renekton | -0.94 | 0.00 | 0.94 |  |
| 93 | Rumble | -0.94 | 0.00 | 0.94 |  |
| 94 | Kalista | -0.95 | 0.00 | 0.95 |  |
| 95 | Kha'Zix | -0.95 | 0.00 | 0.95 |  |
| 96 | Orianna | -0.96 | 0.00 | 0.96 |  |
| 97 | Ziggs | -0.96 | 0.00 | 0.96 |  |
| 98 | Bel'Veth | -0.97 | 0.00 | 0.97 |  |
| 99 | Renata Glasc | -0.97 | 0.00 | 0.97 |  |
| 100 | Zyra | -0.98 | 0.09 | 1.07 |  |
| 101 | Ahri | -0.98 | 0.00 | 0.98 |  |
| 102 | Wukong | -0.98 | 0.00 | 0.98 |  |
| 103 | Yone | -0.98 | 0.00 | 0.98 |  |
| 104 | Kayn | -0.99 | 0.00 | 0.99 |  |
| 105 | Thresh | -1.00 | 0.00 | 1.00 |  |
| 106 | Gnar | -1.02 | 0.00 | 1.02 |  |
| 107 | Kassadin | -1.05 | 0.00 | 1.05 |  |
| 108 | Seraphine | -1.07 | 0.00 | 1.07 |  |
| 109 | Udyr | -1.07 | 0.00 | 1.07 |  |
| 110 | Azir | -1.08 | 0.00 | 1.08 |  |
| 111 | Shaco | -1.09 | 0.00 | 1.09 |  |
| 112 | Talon | -1.10 | 0.00 | 1.10 |  |
| 113 | Lee Sin | -1.11 | 0.00 | 1.11 |  |
| 114 | Zaahen | -1.11 | 0.00 | 1.11 |  |
| 115 | Nami | -1.12 | 0.00 | 1.12 |  |
| 116 | Urgot | -1.13 | 0.00 | 1.13 |  |
| 117 | Singed | -1.14 | 0.27 | 1.41 |  |
| 118 | Aurelion Sol | -1.14 | 0.00 | 1.14 |  |
| 119 | Janna | -1.17 | 0.00 | 1.17 |  |
| 120 | Shyvana | -1.17 | 0.00 | 1.17 |  |
| 121 | Sylas | -1.17 | 0.00 | 1.17 |  |
| 122 | Irelia | -1.20 | 0.00 | 1.20 |  |
| 123 | Akali | -1.21 | 0.00 | 1.21 |  |
| 124 | Malphite | -1.22 | 0.33 | 1.55 |  |
| 125 | Olaf | -1.22 | 0.00 | 1.22 |  |
| 126 | Ornn | -1.22 | 0.00 | 1.22 |  |
| 127 | Warwick | -1.22 | 0.00 | 1.22 |  |
| 128 | Hecarim | -1.27 | 0.00 | 1.27 |  |
| 129 | Mordekaiser | -1.30 | 0.12 | 1.42 |  |
| 130 | Ambessa | -1.31 | 0.00 | 1.31 |  |
| 131 | Diana | -1.33 | 0.00 | 1.33 |  |
| 132 | Rakan | -1.34 | 0.00 | 1.34 |  |
| 133 | Nautilus | -1.36 | 0.00 | 1.36 |  |
| 134 | Trundle | -1.36 | 0.00 | 1.36 |  |
| 135 | Zac | -1.37 | 0.00 | 1.37 |  |
| 136 | Alistar | -1.38 | 0.00 | 1.38 |  |
| 137 | Kled | -1.38 | 0.00 | 1.38 |  |
| 138 | Ekko | -1.41 | 0.00 | 1.41 |  |
| 139 | Rek'Sai | -1.41 | 0.00 | 1.41 |  |
| 140 | Tahm Kench | -1.41 | 0.00 | 1.41 |  |
| 141 | Garen | -1.44 | 0.00 | 1.44 |  |
| 142 | Taric | -1.44 | 0.00 | 1.44 |  |
| 143 | Pantheon | -1.45 | 0.00 | 1.45 |  |
| 144 | Rengar | -1.45 | 0.00 | 1.45 |  |
| 145 | Riven | -1.46 | 0.00 | 1.46 |  |
| 146 | Amumu | -1.47 | 0.00 | 1.47 |  |
| 147 | Qiyana | -1.47 | 0.00 | 1.47 |  |
| 148 | Nocturne | -1.51 | 0.00 | 1.51 |  |
| 149 | Sejuani | -1.53 | 0.00 | 1.53 |  |
| 150 | Viego | -1.53 | 0.00 | 1.53 |  |
| 151 | Poppy | -1.57 | 0.00 | 1.57 |  |
| 152 | Xin Zhao | -1.57 | 0.00 | 1.57 |  |
| 153 | Rell | -1.58 | 0.00 | 1.58 |  |
| 154 | Camille | -1.60 | 0.00 | 1.60 |  |
| 155 | Galio | -1.60 | 0.00 | 1.60 |  |
| 156 | Evelynn | -1.61 | 0.00 | 1.61 |  |
| 157 | Vi | -1.61 | 0.00 | 1.61 |  |
| 158 | Briar | -1.62 | 0.00 | 1.62 |  |
| 159 | Gangplank | -1.62 | 0.00 | 1.62 |  |
| 160 | Volibear | -1.62 | 0.00 | 1.62 |  |
| 161 | Gragas | -1.67 | 0.00 | 1.67 |  |
| 162 | Leona | -1.67 | 0.00 | 1.67 |  |
| 163 | K'Sante | -1.69 | 0.00 | 1.69 |  |
| 164 | Pyke | -1.69 | 0.00 | 1.69 |  |
| 165 | Sett | -1.73 | 0.00 | 1.73 |  |
| 166 | Darius | -1.74 | 0.00 | 1.74 |  |
| 167 | Maokai | -1.74 | 0.00 | 1.74 |  |
| 168 | Cho'Gath | -1.78 | 0.00 | 1.78 |  |
| 169 | Sion | -1.82 | 0.00 | 1.82 |  |
| 170 | Skarner | -1.91 | 0.00 | 1.91 |  |
| 171 | Blitzcrank | -1.97 | 0.00 | 1.97 |  |
| 172 | Nunu & Willump | -1.99 | 0.00 | 1.99 |  |
