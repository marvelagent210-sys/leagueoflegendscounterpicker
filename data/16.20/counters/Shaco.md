# Counters to Shaco (patch 26.20)

Every champion ranked by what its kit does against Shaco's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Shaco's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Shaco` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.09)

- **0.63** spell shield: Spell Shield's spell shield blocks Shaco's Jack in the Box. Spell shield for 1.5 s, long enough to use ahead of Jack in the Box. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Shaco W Jack in the Box)
- **0.31** range: Sivir's basic attacks reach 375 units farther than Shaco's (500 vs 125 attack range). Shaco closes the gap with Deceive, Hallucinate. (Sivir basic attacks → Shaco basic attacks)
- **0.30** spell shield: Spell Shield's spell shield blocks Shaco's Two-Shiv Poison. Spell shield for 1.5 s, long enough to use ahead of Two-Shiv Poison. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Shaco E Two-Shiv Poison)

### 2. Fiora (net +0.72)

- **0.77** parry: Riposte parries Shaco's Jack in the Box and stuns back. Parry for 0.75 s; Jack in the Box takes 0.25 s to land, enough to react. Negating Jack in the Box's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Shaco W Jack in the Box)
- **0.32** parry: Riposte parries Shaco's Two-Shiv Poison. Parry for 0.75 s; Two-Shiv Poison takes 0.67 s to land, enough to react. (Fiora W Riposte → Shaco E Two-Shiv Poison)
- **0.08** attack speed slow: Riposte cuts Shaco's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Shaco basic attacks)
- Watch out: Hallucinate makes Shaco untargetable, dodging Fiora's Riposte.

### 3. Elise (net +0.68)

- **0.63** untargetable: Rappel makes Elise untargetable, dodging Shaco's Jack in the Box. Untargetable for 0.6 s; Jack in the Box takes 0.25 s to land, enough to react. (Elise E Rappel → Shaco W Jack in the Box)
- **0.30** untargetable: Rappel makes Elise untargetable, dodging Shaco's Two-Shiv Poison. Untargetable for 0.6 s; Two-Shiv Poison takes 0.67 s to land, enough to react. (Elise E Rappel → Shaco E Two-Shiv Poison)
- **0.22** range: Elise's basic attacks reach 425 units farther than Shaco's (550 vs 125 attack range). Shaco closes the gap with Deceive, Hallucinate. (Elise basic attacks → Shaco basic attacks)
- Watch out: Hallucinate makes Shaco untargetable, dodging Elise's Cocoon.

### 4. Master Yi (net +0.47)

- **0.63** untargetable: Alpha Strike makes Master Yi untargetable, dodging Shaco's Jack in the Box. Untargetable for ?; Jack in the Box takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Shaco W Jack in the Box)
- **0.30** untargetable: Alpha Strike makes Master Yi untargetable, dodging Shaco's Two-Shiv Poison. Untargetable for ?; Two-Shiv Poison takes 0.67 s to land, enough to react. (Master Yi Q Alpha Strike → Shaco E Two-Shiv Poison)
- **0.08** cc immunity: Highlander makes Master Yi immune to Shaco's Jack in the Box slow. Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Shaco W Jack in the Box)
- Watch out: Hallucinate makes Shaco untargetable, dodging Master Yi's Alpha Strike.

### 5. Kayle (net +0.47)

- **0.24** range: Kayle's basic attacks reach 500 units farther than Shaco's (625 vs 125 attack range). Shaco closes the gap with Deceive, Hallucinate. (Kayle basic attacks → Shaco basic attacks)
- **0.18** invulnerable: Divine Judgment makes Kayle invulnerable to Shaco's Jack in the Box (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Jack in the Box. (Kayle R Divine Judgment → Shaco W Jack in the Box)
- **0.10** invulnerable: Divine Judgment makes Kayle invulnerable to Shaco's Two-Shiv Poison (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Two-Shiv Poison. (Kayle R Divine Judgment → Shaco E Two-Shiv Poison)

### 6. Kai'Sa (net +0.46)

- **0.26** range: Kai'Sa's basic attacks reach 400 units farther than Shaco's (525 vs 125 attack range). Shaco closes the gap with Deceive, Hallucinate. (Kai'Sa basic attacks → Shaco basic attacks)
- **0.20** reveal: Void Seeker reveals Shaco through Deceive's stealth. (Kai'Sa W Void Seeker → Shaco Q Deceive)

### 7. Vladimir (net +0.45)

- **0.67** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Shaco's Jack in the Box. Untargetable for 2 s, long enough to use ahead of Jack in the Box. (Vladimir W Sanguine Pool → Shaco W Jack in the Box)
- **0.32** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Shaco's Two-Shiv Poison. Untargetable for 2 s, long enough to use ahead of Two-Shiv Poison. (Vladimir W Sanguine Pool → Shaco E Two-Shiv Poison)
- **0.12** range: Vladimir's basic attacks reach 325 units farther than Shaco's (450 vs 125 attack range). Shaco closes the gap with Deceive, Hallucinate. (Vladimir basic attacks → Shaco basic attacks)
- Watch out: Hallucinate makes Shaco untargetable, dodging Vladimir's Hemoplague.

### 8. Udyr (net +0.41)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Shaco's Jack in the Box (fear, slow, root). Immune for 1.5 s, long enough to use ahead of Jack in the Box. (Udyr E Blazing Stampede → Shaco W Jack in the Box)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Shaco's Two-Shiv Poison (slow). Immune for 1.5 s, long enough to use ahead of Two-Shiv Poison. (Udyr E Blazing Stampede → Shaco E Two-Shiv Poison)
- Watch out: Hallucinate makes Shaco untargetable, dodging Udyr's Blazing Stampede.

### 9. Morgana (net +0.32)

- **0.67** cc immunity: Black Shield makes Morgana immune to Shaco's Jack in the Box (fear, slow, root). Immune for 5 s, long enough to use ahead of Jack in the Box. (Morgana E Black Shield → Shaco W Jack in the Box)
- **0.20** reveal: Soul Shackles reveals Shaco through Deceive's stealth. (Morgana R Soul Shackles → Shaco Q Deceive)
- **0.13** range: Morgana's basic attacks reach 325 units farther than Shaco's (450 vs 125 attack range). Shaco closes the gap with Deceive, Hallucinate. (Morgana basic attacks → Shaco basic attacks)
- Watch out: Hallucinate makes Shaco untargetable, dodging Morgana's Soul Shackles.

### 10. Kindred (net +0.32)

- **0.31** range: Kindred's basic attacks reach 375 units farther than Shaco's (500 vs 125 attack range). Shaco closes the gap with Deceive, Hallucinate. (Kindred basic attacks → Shaco basic attacks)
- **0.17** invulnerable: Lamb's Respite makes Kindred invulnerable to Shaco's Jack in the Box (its crowd control still applies). Invulnerable for ?; Jack in the Box takes 0.25 s to land, enough to react. (Kindred R Lamb's Respite → Shaco W Jack in the Box)
- **0.10** invulnerable: Lamb's Respite makes Kindred invulnerable to Shaco's Two-Shiv Poison (its crowd control still applies). Invulnerable for ?; Two-Shiv Poison takes 0.67 s to land, enough to react. (Kindred R Lamb's Respite → Shaco E Two-Shiv Poison)
- Watch out: Hallucinate makes Shaco untargetable, dodging Kindred's Mounting Dread.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.09 | 1.09 | 0.00 |  |
| 2 | Fiora | +0.72 | 0.95 | 0.23 |  |
| 3 | Elise | +0.68 | 1.20 | 0.52 |  |
| 4 | Master Yi | +0.47 | 0.91 | 0.44 |  |
| 5 | Kayle | +0.47 | 0.47 | 0.00 |  |
| 6 | Kai'Sa | +0.46 | 0.46 | 0.00 |  |
| 7 | Vladimir | +0.45 | 0.95 | 0.50 |  |
| 8 | Udyr | +0.41 | 0.76 | 0.35 |  |
| 9 | Morgana | +0.32 | 1.04 | 0.72 |  |
| 10 | Kindred | +0.32 | 0.53 | 0.21 |  |
| 11 | Rengar | +0.30 | 0.80 | 0.50 |  |
| 12 | Milio | +0.30 | 0.63 | 0.33 |  |
| 13 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 14 | Xayah | +0.27 | 0.70 | 0.43 |  |
| 15 | Nidalee | +0.24 | 0.40 | 0.16 |  |
| 16 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 17 | Gwen | +0.23 | 0.78 | 0.55 |  |
| 18 | Teemo | +0.23 | 0.65 | 0.42 | blind (Blinding Dart) |
| 19 | Aurora | +0.21 | 0.63 | 0.42 |  |
| 20 | Yuumi | +0.20 | 1.14 | 0.94 |  |
| 21 | Olaf | +0.19 | 0.39 | 0.20 |  |
| 22 | Samira | +0.12 | 0.48 | 0.36 |  |
| 23 | Lulu | +0.11 | 0.74 | 0.63 |  |
| 24 | Nasus | +0.11 | 0.33 | 0.22 |  |
| 25 | LeBlanc | +0.03 | 0.35 | 0.32 |  |
| 26 | Taric | +0.01 | 0.22 | 0.21 |  |
| 27 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 28 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 29 | Singed | -0.04 | 0.39 | 0.43 |  |
| 30 | Gangplank | -0.05 | 0.60 | 0.65 |  |
| 31 | Twisted Fate | -0.05 | 0.49 | 0.54 |  |
| 32 | Vayne | -0.05 | 0.29 | 0.34 |  |
| 33 | Garen | -0.07 | 0.58 | 0.65 |  |
| 34 | Kog'Maw | -0.08 | 0.18 | 0.26 |  |
| 35 | Karma | -0.09 | 0.35 | 0.44 |  |
| 36 | Zed | -0.10 | 0.44 | 0.54 |  |
| 37 | Nocturne | -0.12 | 0.88 | 1.00 |  |
| 38 | Kalista | -0.13 | 0.51 | 0.64 |  |
| 39 | Zoe | -0.13 | 0.22 | 0.35 |  |
| 40 | Yasuo | -0.14 | 0.51 | 0.65 |  |
| 41 | Zilean | -0.17 | 0.22 | 0.39 |  |
| 42 | Soraka | -0.18 | 0.18 | 0.36 |  |
| 43 | Bard | -0.19 | 0.71 | 0.90 |  |
| 44 | Sion | -0.20 | 0.42 | 0.62 |  |
| 45 | Jayce | -0.21 | 0.20 | 0.41 |  |
| 46 | Yorick | -0.21 | 0.00 | 0.21 |  |
| 47 | Maokai | -0.22 | 0.90 | 1.12 |  |
| 48 | Zeri | -0.22 | 0.29 | 0.51 |  |
| 49 | Quinn | -0.22 | 0.26 | 0.48 |  |
| 50 | Aatrox | -0.22 | 0.20 | 0.42 |  |
| 51 | Lissandra | -0.28 | 0.62 | 0.90 |  |
| 52 | Mel | -0.28 | 0.44 | 0.72 |  |
| 53 | Heimerdinger | -0.28 | 0.23 | 0.51 |  |
| 54 | Corki | -0.28 | 0.20 | 0.48 |  |
| 55 | Alistar | -0.29 | 0.31 | 0.60 |  |
| 56 | Ekko | -0.30 | 0.52 | 0.82 |  |
| 57 | Nilah | -0.30 | 0.38 | 0.68 |  |
| 58 | Malzahar | -0.31 | 0.72 | 1.03 |  |
| 59 | Illaoi | -0.31 | 0.20 | 0.51 |  |
| 60 | Mordekaiser | -0.32 | 0.39 | 0.71 |  |
| 61 | Vex | -0.32 | 0.38 | 0.70 |  |
| 62 | Jinx | -0.32 | 0.19 | 0.51 |  |
| 63 | Pantheon | -0.33 | 0.40 | 0.73 |  |
| 64 | Ezreal | -0.33 | 0.22 | 0.55 |  |
| 65 | Braum | -0.35 | 0.45 | 0.80 | projectile block (Unbreakable) |
| 66 | Kha'Zix | -0.35 | 0.00 | 0.35 |  |
| 67 | Akshan | -0.37 | 0.42 | 0.79 |  |
| 68 | Lux | -0.37 | 0.19 | 0.56 |  |
| 69 | Camille | -0.39 | 0.45 | 0.84 |  |
| 70 | Sylas | -0.39 | 0.20 | 0.59 |  |
| 71 | Jax | -0.43 | 0.35 | 0.78 |  |
| 72 | Cassiopeia | -0.44 | 0.53 | 0.97 |  |
| 73 | Ashe | -0.44 | 0.24 | 0.68 |  |
| 74 | Gnar | -0.44 | 0.22 | 0.66 |  |
| 75 | Graves | -0.44 | 0.16 | 0.60 |  |
| 76 | Smolder | -0.45 | 0.22 | 0.67 |  |
| 77 | Anivia | -0.45 | 0.16 | 0.61 |  |
| 78 | Ivern | -0.45 | 0.13 | 0.58 |  |
| 79 | Hwei | -0.47 | 0.35 | 0.82 |  |
| 80 | Draven | -0.48 | 0.24 | 0.72 |  |
| 81 | Lee Sin | -0.48 | 0.20 | 0.68 |  |
| 82 | Shyvana | -0.48 | 0.00 | 0.48 |  |
| 83 | Kennen | -0.49 | 0.19 | 0.68 |  |
| 84 | Veigar | -0.49 | 0.16 | 0.65 |  |
| 85 | Kled | -0.50 | 0.66 | 1.16 |  |
| 86 | Warwick | -0.50 | 0.48 | 0.98 |  |
| 87 | Thresh | -0.50 | 0.33 | 0.83 |  |
| 88 | Talon | -0.50 | 0.00 | 0.50 |  |
| 89 | Miss Fortune | -0.51 | 0.22 | 0.73 |  |
| 90 | Renata Glasc | -0.52 | 0.46 | 0.98 |  |
| 91 | Kassadin | -0.52 | 0.00 | 0.52 |  |
| 92 | Rek'Sai | -0.53 | 0.52 | 1.05 |  |
| 93 | Sona | -0.53 | 0.27 | 0.80 |  |
| 94 | Riven | -0.53 | 0.00 | 0.53 |  |
| 95 | Ziggs | -0.54 | 0.18 | 0.72 |  |
| 96 | Locke | -0.55 | 0.00 | 0.55 |  |
| 97 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 98 | Caitlyn | -0.56 | 0.44 | 1.00 |  |
| 99 | Viktor | -0.56 | 0.22 | 0.78 |  |
| 100 | Blitzcrank | -0.56 | 0.00 | 0.56 |  |
| 101 | Akali | -0.57 | 0.20 | 0.77 |  |
| 102 | Sett | -0.57 | 0.20 | 0.77 |  |
| 103 | Bel'Veth | -0.57 | 0.00 | 0.57 |  |
| 104 | Senna | -0.58 | 0.22 | 0.80 |  |
| 105 | Wukong | -0.59 | 0.00 | 0.59 |  |
| 106 | Shen | -0.60 | 0.33 | 0.93 |  |
| 107 | Varus | -0.60 | 0.18 | 0.78 |  |
| 108 | Vel'Koz | -0.60 | 0.18 | 0.78 |  |
| 109 | Aphelios | -0.61 | 0.36 | 0.97 |  |
| 110 | Zyra | -0.61 | 0.36 | 0.97 |  |
| 111 | Skarner | -0.61 | 0.26 | 0.87 |  |
| 112 | Annie | -0.61 | 0.15 | 0.76 |  |
| 113 | Brand | -0.61 | 0.15 | 0.76 |  |
| 114 | Syndra | -0.61 | 0.15 | 0.76 |  |
| 115 | Aurelion Sol | -0.62 | 0.15 | 0.77 |  |
| 116 | Katarina | -0.62 | 0.00 | 0.62 |  |
| 117 | Kayn | -0.64 | 0.52 | 1.16 |  |
| 118 | Xerath | -0.64 | 0.18 | 0.82 |  |
| 119 | Ryze | -0.64 | 0.16 | 0.80 |  |
| 120 | Swain | -0.64 | 0.14 | 0.78 |  |
| 121 | Renekton | -0.65 | 0.00 | 0.65 |  |
| 122 | Urgot | -0.66 | 0.30 | 0.96 |  |
| 123 | Tristana | -0.68 | 0.24 | 0.92 |  |
| 124 | Cho'Gath | -0.68 | 0.00 | 0.68 |  |
| 125 | Lucian | -0.69 | 0.24 | 0.93 |  |
| 126 | Karthus | -0.70 | 0.13 | 0.83 |  |
| 127 | Fizz | -0.71 | 0.20 | 0.91 |  |
| 128 | Azir | -0.72 | 0.18 | 0.90 |  |
| 129 | Ahri | -0.72 | 0.15 | 0.87 |  |
| 130 | Evelynn | -0.73 | 0.47 | 1.20 |  |
| 131 | Zaahen | -0.73 | 0.39 | 1.12 |  |
| 132 | Orianna | -0.73 | 0.18 | 0.91 |  |
| 133 | Lillia | -0.73 | 0.07 | 0.80 |  |
| 134 | Darius | -0.73 | 0.00 | 0.73 |  |
| 135 | Trundle | -0.73 | 0.00 | 0.73 |  |
| 136 | Fiddlesticks | -0.76 | 0.33 | 1.09 |  |
| 137 | Seraphine | -0.78 | 0.19 | 0.97 |  |
| 138 | Irelia | -0.78 | 0.03 | 0.81 |  |
| 139 | Ambessa | -0.80 | 0.20 | 1.00 |  |
| 140 | Xin Zhao | -0.82 | 0.22 | 1.04 |  |
| 141 | Neeko | -0.82 | 0.15 | 0.97 |  |
| 142 | Nunu & Willump | -0.86 | 0.24 | 1.10 |  |
| 143 | Nami | -0.86 | 0.15 | 1.01 |  |
| 144 | Janna | -0.87 | 0.24 | 1.11 |  |
| 145 | Jhin | -0.89 | 0.18 | 1.07 |  |
| 146 | Malphite | -0.90 | 0.21 | 1.11 |  |
| 147 | Diana | -0.92 | 0.00 | 0.92 |  |
| 148 | Leona | -0.95 | 0.00 | 0.95 |  |
| 149 | Rakan | -0.96 | 0.08 | 1.04 |  |
| 150 | Nautilus | -0.99 | 0.00 | 0.99 |  |
| 151 | Hecarim | -1.00 | 0.00 | 1.00 |  |
| 152 | Rammus | -1.02 | 0.32 | 1.34 |  |
| 153 | Briar | -1.02 | 0.20 | 1.22 |  |
| 154 | Amumu | -1.05 | 0.00 | 1.05 |  |
| 155 | Galio | -1.05 | 0.00 | 1.05 |  |
| 156 | Qiyana | -1.06 | 0.00 | 1.06 |  |
| 157 | Volibear | -1.10 | 0.00 | 1.10 |  |
| 158 | Gragas | -1.13 | 0.00 | 1.13 |  |
| 159 | Sejuani | -1.13 | 0.00 | 1.13 |  |
| 160 | Naafiri | -1.15 | 0.20 | 1.35 |  |
| 161 | Rell | -1.17 | 0.00 | 1.17 |  |
| 162 | Jarvan IV | -1.18 | 0.00 | 1.18 |  |
| 163 | Poppy | -1.19 | 0.00 | 1.19 |  |
| 164 | Pyke | -1.19 | 0.00 | 1.19 |  |
| 165 | Yone | -1.22 | 0.00 | 1.22 |  |
| 166 | Vi | -1.26 | 0.20 | 1.46 |  |
| 167 | Ornn | -1.28 | 0.00 | 1.28 |  |
| 168 | Zac | -1.30 | 0.20 | 1.50 |  |
| 169 | K'Sante | -1.33 | 0.00 | 1.33 |  |
| 170 | Viego | -1.35 | 0.06 | 1.41 |  |
| 171 | Taliyah | -1.51 | 0.18 | 1.69 |  |
| 172 | Tahm Kench | -1.57 | 0.00 | 1.57 |  |
