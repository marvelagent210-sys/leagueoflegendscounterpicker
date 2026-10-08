# Counters to Singed (patch 26.20)

Every champion ranked by what its kit does against Singed's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Singed's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Singed` for the full ledger of a matchup, with sources.

## Top 10

### 1. Xayah (net +1.19)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Singed's (525 vs 125 attack range). Singed has no dash or blink to close the gap. (Xayah basic attacks → Singed basic attacks)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Singed's Fling. Untargetable for 1.5 s, long enough to use ahead of Fling. (Xayah R Featherstorm → Singed E Fling)
- **0.22** untargetable: Featherstorm makes Xayah untargetable, dodging Singed's Mega Adhesive. Untargetable for 1.5 s, long enough to use ahead of Mega Adhesive. (Xayah R Featherstorm → Singed W Mega Adhesive)

### 2. Sivir (net +1.14)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Singed's (500 vs 125 attack range). Singed has no dash or blink to close the gap. (Sivir basic attacks → Singed basic attacks)
- **0.47** spell shield: Spell Shield's spell shield blocks Singed's Fling. Spell shield for 1.5 s, long enough to use ahead of Fling. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Singed E Fling)
- Watch out: Insanity Potion's Grievous Wounds cuts Sivir's healing from Spell Shield by 40%.

### 3. Teemo (net +1.03)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Singed's (500 vs 125 attack range). Singed has no dash or blink to close the gap. (Teemo basic attacks → Singed basic attacks)
- **0.35** blind: Blinding Dart's blind makes Singed's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Singed basic attacks)

### 4. Lulu (net +0.97)

- **0.72** range: Lulu's basic attacks reach 425 units farther than Singed's (550 vs 125 attack range). Singed has no dash or blink to close the gap. (Lulu basic attacks → Singed basic attacks)
- **0.25** disarm: Whimsy disarms Singed for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Singed basic attacks)

### 5. Kayle (net +0.88)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Singed's (625 vs 125 attack range). Singed has no dash or blink to close the gap. (Kayle basic attacks → Singed basic attacks)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Singed's Fling (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Fling. (Kayle R Divine Judgment → Singed E Fling)

### 6. Twitch (net +0.86)

- **0.86** range: Twitch's basic attacks reach 425 units farther than Singed's (550 vs 125 attack range). Singed has no dash or blink to close the gap. (Twitch basic attacks → Singed basic attacks)

### 7. Mel (net +0.85)

- **0.53** range: Mel's basic attacks reach 425 units farther than Singed's (550 vs 125 attack range). Singed has no dash or blink to close the gap. (Mel basic attacks → Singed basic attacks)
- **0.32** projectile block: Rebuttal blocks Singed's Mega Adhesive, a projectile. Rebuttal for 0.75 s; Mega Adhesive takes 0.25 s to land, enough to react. (Mel W Rebuttal → Singed W Mega Adhesive)

### 8. Morgana (net +0.82)

- **0.49** cc immunity: Black Shield makes Morgana immune to Singed's Fling (airborne, root). Immune for 5 s, long enough to use ahead of Fling. (Morgana E Black Shield → Singed E Fling)
- **0.39** range: Morgana's basic attacks reach 325 units farther than Singed's (450 vs 125 attack range). Singed has no dash or blink to close the gap. (Morgana basic attacks → Singed basic attacks)
- **0.24** cc immunity: Black Shield makes Morgana immune to Singed's Mega Adhesive (ground, slow). Immune for 5 s, long enough to use ahead of Mega Adhesive. (Morgana E Black Shield → Singed W Mega Adhesive)
- Watch out: Insanity Potion's Grievous Wounds cuts Morgana's healing from Soul Siphon by 40%.

### 9. Milio (net +0.81)

- **0.77** range: Milio's basic attacks reach 400 units farther than Singed's (525 vs 125 attack range). Singed has no dash or blink to close the gap. (Milio basic attacks → Singed basic attacks)
- **0.24** cleanse: Breath of Life cleanses Singed's Fling (root) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Singed E Fling)
- **0.19** tenacity: Breath of Life's 65% tenacity shortens Singed's Fling (root). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Singed E Fling)
- Watch out: Insanity Potion's Grievous Wounds cuts Milio's healing from Breath of Life by 40%.

### 10. Renata Glasc (net +0.77)

- **0.77** range: Renata Glasc's basic attacks reach 425 units farther than Singed's (550 vs 125 attack range). Singed has no dash or blink to close the gap. (Renata Glasc basic attacks → Singed basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Xayah | +1.19 | 1.19 | 0.00 | range (attacks) |
| 2 | Sivir | +1.14 | 1.41 | 0.27 | range (attacks) |
| 3 | Teemo | +1.03 | 1.03 | 0.00 | range (attacks) |
| 4 | Lulu | +0.97 | 0.97 | 0.00 | range (attacks) |
| 5 | Kayle | +0.88 | 0.88 | 0.00 | range (attacks) |
| 6 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 7 | Mel | +0.85 | 0.85 | 0.00 | range (attacks) |
| 8 | Morgana | +0.82 | 1.00 | 0.18 |  |
| 9 | Milio | +0.81 | 1.14 | 0.33 | range (attacks) |
| 10 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 11 | Bard | +0.73 | 1.15 | 0.42 | range (attacks) |
| 12 | Kalista | +0.73 | 0.95 | 0.22 | range (attacks) |
| 13 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 14 | Viktor | +0.65 | 0.65 | 0.00 | range (attacks) |
| 15 | Jinx | +0.58 | 0.58 | 0.00 | range (attacks) |
| 16 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 17 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 18 | Sona | +0.56 | 0.83 | 0.27 | range (attacks) |
| 19 | Kog'Maw | +0.54 | 0.54 | 0.00 | range (attacks) |
| 20 | Gangplank | +0.53 | 0.53 | 0.00 |  |
| 21 | Orianna | +0.53 | 0.53 | 0.00 | range (attacks) |
| 22 | Vayne | +0.52 | 0.86 | 0.34 | range (attacks) |
| 23 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 24 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 25 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 26 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 27 | Ashe | +0.45 | 0.72 | 0.27 | range (attacks) |
| 28 | Heimerdinger | +0.45 | 0.45 | 0.00 |  |
| 29 | Annie | +0.44 | 0.44 | 0.00 |  |
| 30 | Brand | +0.44 | 0.44 | 0.00 |  |
| 31 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 32 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 33 | Vladimir | +0.43 | 1.05 | 0.62 |  |
| 34 | Malzahar | +0.43 | 0.83 | 0.40 |  |
| 35 | Kai'Sa | +0.43 | 0.77 | 0.34 | range (attacks) |
| 36 | Vex | +0.43 | 0.60 | 0.17 | range (attacks) |
| 37 | Aurora | +0.42 | 1.02 | 0.60 | range (attacks) |
| 38 | Tristana | +0.42 | 0.72 | 0.30 | range (attacks) |
| 39 | Varus | +0.42 | 0.53 | 0.11 | range (attacks) |
| 40 | Elise | +0.38 | 1.31 | 0.93 | range (attacks) |
| 41 | Corki | +0.37 | 0.67 | 0.30 | range (attacks) |
| 42 | Miss Fortune | +0.37 | 0.65 | 0.28 | range (attacks) |
| 43 | Ezreal | +0.35 | 0.65 | 0.30 | range (attacks) |
| 44 | Twisted Fate | +0.34 | 0.86 | 0.52 | range (attacks) |
| 45 | Kindred | +0.32 | 1.09 | 0.77 | range (attacks) |
| 46 | Udyr | +0.32 | 0.84 | 0.52 |  |
| 47 | Zilean | +0.32 | 0.65 | 0.33 | range (attacks) |
| 48 | Ziggs | +0.32 | 0.53 | 0.21 | range (attacks) |
| 49 | Zoe | +0.31 | 0.65 | 0.34 | range (attacks) |
| 50 | Jayce | +0.31 | 0.61 | 0.30 | range (attacks) |
| 51 | Seraphine | +0.31 | 0.58 | 0.27 | range (attacks) |
| 52 | Yuumi | +0.30 | 1.57 | 1.27 | range (attacks) |
| 53 | Senna | +0.29 | 0.65 | 0.36 | range (attacks) |
| 54 | Aphelios | +0.25 | 0.82 | 0.57 | range (attacks) |
| 55 | Jhin | +0.25 | 0.53 | 0.28 | range (attacks) |
| 56 | Vel'Koz | +0.25 | 0.53 | 0.28 | range (attacks) |
| 57 | Lissandra | +0.24 | 0.87 | 0.63 |  |
| 58 | Nocturne | +0.23 | 0.63 | 0.40 |  |
| 59 | Azir | +0.23 | 0.53 | 0.30 | range (attacks) |
| 60 | Zeri | +0.22 | 0.88 | 0.66 | range (attacks) |
| 61 | Gnar | +0.21 | 0.66 | 0.45 | range (attacks) |
| 62 | Xerath | +0.20 | 0.53 | 0.33 | range (attacks) |
| 63 | Maokai | +0.18 | 0.85 | 0.67 |  |
| 64 | Thresh | +0.18 | 0.39 | 0.21 |  |
| 65 | Rengar | +0.17 | 0.60 | 0.43 |  |
| 66 | Nami | +0.17 | 0.44 | 0.27 |  |
| 67 | Quinn | +0.15 | 0.77 | 0.62 | range (attacks) |
| 68 | Yunara | +0.15 | 0.72 | 0.57 | range (attacks) |
| 69 | Smolder | +0.15 | 0.65 | 0.50 | range (attacks) |
| 70 | Caitlyn | +0.14 | 0.72 | 0.58 | range (attacks) |
| 71 | LeBlanc | +0.14 | 0.44 | 0.30 |  |
| 72 | Garen | +0.13 | 0.31 | 0.18 |  |
| 73 | Olaf | +0.12 | 0.39 | 0.27 |  |
| 74 | Cassiopeia | +0.11 | 0.44 | 0.33 |  |
| 75 | Karthus | +0.11 | 0.39 | 0.28 |  |
| 76 | Gwen | +0.09 | 0.66 | 0.57 |  |
| 77 | Nasus | +0.09 | 0.27 | 0.18 |  |
| 78 | Braum | +0.06 | 0.45 | 0.39 | projectile block (Unbreakable) |
| 79 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 80 | Aurelion Sol | +0.05 | 0.44 | 0.39 |  |
| 81 | Shaco | +0.04 | 0.43 | 0.39 |  |
| 82 | Samira | +0.03 | 0.95 | 0.92 | range (attacks) |
| 83 | Nidalee | +0.03 | 0.60 | 0.57 | range (attacks) |
| 84 | Karma | +0.02 | 0.44 | 0.42 |  |
| 85 | Ivern | +0.02 | 0.38 | 0.36 |  |
| 86 | Fiora | 0.00 | 0.81 | 0.81 |  |
| 87 | Swain | 0.00 | 0.42 | 0.42 |  |
| 88 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 89 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 90 | Lucian | -0.04 | 0.72 | 0.76 | range (attacks) |
| 91 | Soraka | -0.05 | 0.53 | 0.58 | range (attacks) |
| 92 | Graves | -0.07 | 0.49 | 0.56 |  |
| 93 | Ahri | -0.08 | 0.44 | 0.52 |  |
| 94 | Jax | -0.11 | 0.28 | 0.39 |  |
| 95 | Zed | -0.12 | 0.42 | 0.54 |  |
| 96 | Urgot | -0.12 | 0.30 | 0.42 |  |
| 97 | Taric | -0.12 | 0.15 | 0.27 |  |
| 98 | Master Yi | -0.16 | 0.73 | 0.89 |  |
| 99 | Janna | -0.16 | 0.72 | 0.88 | range (attacks) |
| 100 | Taliyah | -0.18 | 0.53 | 0.71 | range (attacks) |
| 101 | Cho'Gath | -0.18 | 0.00 | 0.18 |  |
| 102 | Ryze | -0.21 | 0.48 | 0.69 |  |
| 103 | Malphite | -0.24 | 0.25 | 0.49 |  |
| 104 | Lillia | -0.26 | 0.22 | 0.48 |  |
| 105 | Akshan | -0.28 | 0.68 | 0.96 | range (attacks) |
| 106 | Kled | -0.28 | 0.64 | 0.92 |  |
| 107 | Sion | -0.31 | 0.41 | 0.72 |  |
| 108 | Alistar | -0.31 | 0.32 | 0.63 |  |
| 109 | Yasuo | -0.32 | 0.39 | 0.71 |  |
| 110 | Illaoi | -0.33 | 0.07 | 0.40 |  |
| 111 | Yorick | -0.33 | 0.00 | 0.33 |  |
| 112 | Rek'Sai | -0.37 | 0.45 | 0.82 |  |
| 113 | Evelynn | -0.39 | 0.43 | 0.82 |  |
| 114 | Diana | -0.39 | 0.00 | 0.39 |  |
| 115 | Nautilus | -0.39 | 0.00 | 0.39 |  |
| 116 | Mordekaiser | -0.41 | 0.06 | 0.47 |  |
| 117 | Jarvan IV | -0.42 | 0.07 | 0.49 |  |
| 118 | Ornn | -0.45 | 0.07 | 0.52 |  |
| 119 | Rammus | -0.47 | 0.27 | 0.74 |  |
| 120 | Camille | -0.49 | 0.45 | 0.94 |  |
| 121 | Amumu | -0.49 | 0.00 | 0.49 |  |
| 122 | Kassadin | -0.49 | 0.00 | 0.49 |  |
| 123 | Leona | -0.49 | 0.00 | 0.49 |  |
| 124 | Rell | -0.49 | 0.00 | 0.49 |  |
| 125 | Sejuani | -0.49 | 0.00 | 0.49 |  |
| 126 | Dr. Mundo | -0.51 | 0.00 | 0.51 |  |
| 127 | Trundle | -0.51 | 0.00 | 0.51 |  |
| 128 | Pantheon | -0.52 | 0.23 | 0.75 |  |
| 129 | Darius | -0.54 | 0.00 | 0.54 |  |
| 130 | Nilah | -0.58 | 0.50 | 1.08 |  |
| 131 | Xin Zhao | -0.59 | 0.16 | 0.75 |  |
| 132 | Poppy | -0.59 | 0.00 | 0.59 |  |
| 133 | Qiyana | -0.59 | 0.00 | 0.59 |  |
| 134 | Sett | -0.60 | 0.07 | 0.67 |  |
| 135 | K'Sante | -0.61 | 0.14 | 0.75 |  |
| 136 | Nunu & Willump | -0.62 | 0.14 | 0.76 |  |
| 137 | Akali | -0.64 | 0.00 | 0.64 |  |
| 138 | Kha'Zix | -0.66 | 0.00 | 0.66 |  |
| 139 | Locke | -0.66 | 0.00 | 0.66 |  |
| 140 | Renekton | -0.66 | 0.00 | 0.66 |  |
| 141 | Tryndamere | -0.66 | 0.00 | 0.66 |  |
| 142 | Katarina | -0.67 | 0.00 | 0.67 |  |
| 143 | Yone | -0.68 | 0.07 | 0.75 |  |
| 144 | Fizz | -0.68 | 0.00 | 0.68 |  |
| 145 | Fiddlesticks | -0.69 | 0.39 | 1.08 |  |
| 146 | Shyvana | -0.69 | 0.07 | 0.76 |  |
| 147 | Ekko | -0.70 | 0.48 | 1.18 |  |
| 148 | Rakan | -0.71 | 0.25 | 0.96 |  |
| 149 | Wukong | -0.76 | 0.00 | 0.76 |  |
| 150 | Irelia | -0.77 | 0.10 | 0.87 |  |
| 151 | Hecarim | -0.79 | 0.07 | 0.86 |  |
| 152 | Gragas | -0.84 | 0.00 | 0.84 |  |
| 153 | Lee Sin | -0.85 | 0.00 | 0.85 |  |
| 154 | Riven | -0.87 | 0.00 | 0.87 |  |
| 155 | Shen | -0.89 | 0.27 | 1.16 |  |
| 156 | Galio | -0.92 | 0.00 | 0.92 |  |
| 157 | Zaahen | -1.00 | 0.39 | 1.39 |  |
| 158 | Talon | -1.02 | 0.00 | 1.02 |  |
| 159 | Pyke | -1.07 | 0.00 | 1.07 |  |
| 160 | Aatrox | -1.08 | 0.00 | 1.08 |  |
| 161 | Vi | -1.10 | 0.07 | 1.17 |  |
| 162 | Volibear | -1.11 | 0.07 | 1.18 |  |
| 163 | Zac | -1.17 | 0.00 | 1.17 |  |
| 164 | Sylas | -1.26 | 0.00 | 1.26 |  |
| 165 | Viego | -1.28 | 0.26 | 1.54 |  |
| 166 | Kayn | -1.37 | 0.43 | 1.80 |  |
| 167 | Warwick | -1.39 | 0.47 | 1.86 |  |
| 168 | Ambessa | -1.45 | 0.00 | 1.45 |  |
| 169 | Tahm Kench | -1.58 | 0.00 | 1.58 |  |
| 170 | Briar | -1.61 | 0.00 | 1.61 |  |
| 171 | Bel'Veth | -1.65 | 0.00 | 1.65 |  |
| 172 | Naafiri | -1.70 | 0.00 | 1.70 |  |
