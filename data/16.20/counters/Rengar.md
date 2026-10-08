# Counters to Rengar (patch 26.20)

Every champion ranked by what its kit does against Rengar's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Rengar's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Rengar` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.45)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Rengar's (500 vs 125 attack range). Rengar has no dash or blink to close the gap. (Sivir basic attacks → Rengar basic attacks)
- **0.51** spell shield: Spell Shield's spell shield blocks Rengar's Bola Strike. Spell shield for 1.5 s, long enough to use ahead of Bola Strike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rengar E Bola Strike)

### 2. Yuumi (net +1.36)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Rengar's Bola Strike. Untargetable for ?; Bola Strike takes 0.92 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rengar E Bola Strike)
- **0.64** range: Yuumi's basic attacks reach 300 units farther than Rengar's (425 vs 125 attack range). Rengar has no dash or blink to close the gap. (Yuumi basic attacks → Rengar basic attacks)
- **0.33** untargetable: You and Me! makes Yuumi untargetable, dodging Rengar's Thrill of the Hunt. Untargetable for ?; Thrill of the Hunt lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rengar R Thrill of the Hunt)
- Watch out: Battle Roar cleanses Yuumi's Final Chapter (slow) after it lands.

### 3. Kindred (net +1.08)

- **0.94** range: Kindred's basic attacks reach 375 units farther than Rengar's (500 vs 125 attack range). Rengar has no dash or blink to close the gap. (Kindred basic attacks → Rengar basic attacks)
- **0.16** invulnerable: Lamb's Respite makes Kindred invulnerable to Rengar's Bola Strike (its crowd control still applies). Invulnerable for ?; Bola Strike takes 0.92 s to land, enough to react. (Kindred R Lamb's Respite → Rengar E Bola Strike)
- **0.13** invulnerable: Lamb's Respite makes Kindred invulnerable to Rengar's Thrill of the Hunt (its crowd control still applies). Invulnerable for ?; Thrill of the Hunt lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kindred R Lamb's Respite → Rengar R Thrill of the Hunt)
- Watch out: Battle Roar cleanses Kindred's Mounting Dread (slow) after it lands.

### 4. Vladimir (net +1.06)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rengar's Thrill of the Hunt. Untargetable for 2 s, long enough to use ahead of Thrill of the Hunt. (Vladimir W Sanguine Pool → Rengar R Thrill of the Hunt)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rengar's Bola Strike. Untargetable for 2 s, long enough to use ahead of Bola Strike. (Vladimir W Sanguine Pool → Rengar E Bola Strike)
- **0.36** range: Vladimir's basic attacks reach 325 units farther than Rengar's (450 vs 125 attack range). Rengar has no dash or blink to close the gap. (Vladimir basic attacks → Rengar basic attacks)
- Watch out: Battle Roar cleanses Vladimir's Sanguine Pool (slow) after it lands.

### 5. Teemo (net +1.04)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Rengar's (500 vs 125 attack range). Rengar has no dash or blink to close the gap. (Teemo basic attacks → Rengar basic attacks)
- **0.50** blind: Blinding Dart's blind makes Rengar's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Rengar basic attacks)
- **0.36** blind: Blinding Dart's blind makes Rengar's Thrill of the Hunt, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Rengar R Thrill of the Hunt)
- Watch out: Battle Roar cleanses Teemo's Blinding Dart (blind) after it lands.

### 6. Kayle (net +1.01)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Rengar's (625 vs 125 attack range). Rengar has no dash or blink to close the gap. (Kayle basic attacks → Rengar basic attacks)
- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Rengar's Thrill of the Hunt (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Thrill of the Hunt. (Kayle R Divine Judgment → Rengar R Thrill of the Hunt)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Rengar's Bola Strike (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Bola Strike. (Kayle R Divine Judgment → Rengar E Bola Strike)
- Watch out: Battle Roar cleanses Kayle's Radiant Blast (slow) after it lands.

### 7. Xayah (net +0.92)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Rengar's (525 vs 125 attack range). Rengar has no dash or blink to close the gap. (Xayah basic attacks → Rengar basic attacks)
- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Rengar's Thrill of the Hunt. Untargetable for 1.5 s, long enough to use ahead of Thrill of the Hunt. (Xayah R Featherstorm → Rengar R Thrill of the Hunt)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Rengar's Bola Strike. Untargetable for 1.5 s, long enough to use ahead of Bola Strike. (Xayah R Featherstorm → Rengar E Bola Strike)
- Watch out: Battle Roar cleanses Xayah's Bladecaller (root) after it lands.

### 8. Elise (net +0.91)

- **0.65** range: Elise's basic attacks reach 425 units farther than Rengar's (550 vs 125 attack range). Rengar has no dash or blink to close the gap. (Elise basic attacks → Rengar basic attacks)
- **0.51** untargetable: Rappel makes Elise untargetable, dodging Rengar's Bola Strike. Untargetable for 0.6 s; Bola Strike takes 0.92 s to land, enough to react. (Elise E Rappel → Rengar E Bola Strike)
- **0.33** untargetable: Rappel makes Elise untargetable, dodging Rengar's Thrill of the Hunt. Untargetable for 0.6 s; Thrill of the Hunt lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Rengar R Thrill of the Hunt)
- Watch out: Battle Roar cleanses Elise's Cocoon (stun) after it lands.

### 9. Kai'Sa (net +0.80)

- **0.77** range: Kai'Sa's basic attacks reach 400 units farther than Rengar's (525 vs 125 attack range). Rengar has no dash or blink to close the gap. (Kai'Sa basic attacks → Rengar basic attacks)
- **0.14** reveal: Void Seeker reveals Rengar through Thrill of the Hunt's stealth. (Kai'Sa W Void Seeker → Rengar R Thrill of the Hunt)
- Watch out: Bola Strike reveals Kai'Sa through Supercharge's stealth.

### 10. Zeri (net +0.80)

- **0.88** range: Zeri's basic attacks reach 425 units farther than Rengar's (550 vs 125 attack range). Rengar has no dash or blink to close the gap. (Zeri basic attacks → Rengar basic attacks)
- Watch out: Battle Roar cleanses Zeri's Ultrashock Laser (slow) after it lands.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.45 | 1.45 | 0.00 | range (attacks) |
| 2 | Yuumi | +1.36 | 1.51 | 0.15 | range (attacks) |
| 3 | Kindred | +1.08 | 1.16 | 0.08 | range (attacks) |
| 4 | Vladimir | +1.06 | 1.18 | 0.12 |  |
| 5 | Teemo | +1.04 | 1.36 | 0.32 | range (attacks), blind (Blinding Dart) |
| 6 | Kayle | +1.01 | 1.09 | 0.08 | range (attacks) |
| 7 | Xayah | +0.92 | 1.41 | 0.49 | range (attacks) |
| 8 | Elise | +0.91 | 1.47 | 0.56 | range (attacks) |
| 9 | Kai'Sa | +0.80 | 0.91 | 0.11 | range (attacks) |
| 10 | Zeri | +0.80 | 0.88 | 0.08 | range (attacks) |
| 11 | Master Yi | +0.79 | 0.79 | 0.00 |  |
| 12 | Nidalee | +0.74 | 0.74 | 0.00 | range (attacks) |
| 13 | Samira | +0.72 | 1.08 | 0.36 | range (attacks), projectile block (Blade Whirl) |
| 14 | Lucian | +0.72 | 0.72 | 0.00 | range (attacks) |
| 15 | Aurora | +0.70 | 1.05 | 0.35 | range (attacks) |
| 16 | Akshan | +0.68 | 0.82 | 0.14 | range (attacks) |
| 17 | Twitch | +0.67 | 0.86 | 0.19 | range (attacks) |
| 18 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 19 | Bard | +0.63 | 1.44 | 0.81 | range (attacks) |
| 20 | Yunara | +0.58 | 0.72 | 0.14 | range (attacks) |
| 21 | Twisted Fate | +0.57 | 1.00 | 0.43 | range (attacks) |
| 22 | Gwen | +0.57 | 0.68 | 0.11 |  |
| 23 | Milio | +0.56 | 1.12 | 0.56 | range (attacks) |
| 24 | Miss Fortune | +0.56 | 0.65 | 0.09 | range (attacks) |
| 25 | Smolder | +0.49 | 0.65 | 0.16 | range (attacks) |
| 26 | Fiora | +0.47 | 0.83 | 0.36 |  |
| 27 | Rek'Sai | +0.46 | 0.75 | 0.29 |  |
| 28 | Lulu | +0.45 | 1.22 | 0.77 | range (attacks) |
| 29 | Kog'Maw | +0.45 | 0.54 | 0.09 | range (attacks) |
| 30 | Mel | +0.44 | 0.97 | 0.53 | range (attacks), projectile block (Rebuttal) |
| 31 | Vex | +0.43 | 0.92 | 0.49 | range (attacks) |
| 32 | Zed | +0.41 | 0.47 | 0.06 |  |
| 33 | Graves | +0.40 | 0.49 | 0.09 |  |
| 34 | Viktor | +0.37 | 0.93 | 0.56 | range (attacks) |
| 35 | Nilah | +0.34 | 0.98 | 0.64 | attack dodge (Jubilant Veil) |
| 36 | Jinx | +0.30 | 0.90 | 0.60 | range (attacks) |
| 37 | Gangplank | +0.30 | 0.46 | 0.16 |  |
| 38 | Karthus | +0.30 | 0.39 | 0.09 |  |
| 39 | Nasus | +0.30 | 0.39 | 0.09 |  |
| 40 | Morgana | +0.29 | 1.07 | 0.78 |  |
| 41 | Lissandra | +0.28 | 1.19 | 0.91 |  |
| 42 | Garen | +0.27 | 0.46 | 0.19 |  |
| 43 | Malzahar | +0.26 | 0.98 | 0.72 |  |
| 44 | Olaf | +0.25 | 0.33 | 0.08 |  |
| 45 | Caitlyn | +0.24 | 0.86 | 0.62 | range (attacks) |
| 46 | Jax | +0.23 | 0.76 | 0.53 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 47 | Sona | +0.19 | 0.83 | 0.64 | range (attacks) |
| 48 | Veigar | +0.19 | 0.75 | 0.56 |  |
| 49 | Katarina | +0.18 | 0.18 | 0.00 |  |
| 50 | Ahri | +0.17 | 0.73 | 0.56 |  |
| 51 | Vayne | +0.16 | 0.86 | 0.70 | range (attacks) |
| 52 | Draven | +0.16 | 0.72 | 0.56 | range (attacks) |
| 53 | Kennen | +0.14 | 0.58 | 0.44 | range (attacks) |
| 54 | LeBlanc | +0.14 | 0.58 | 0.44 |  |
| 55 | Quinn | +0.13 | 0.77 | 0.64 | range (attacks) |
| 56 | Ekko | +0.13 | 0.53 | 0.40 |  |
| 57 | Zilean | +0.11 | 0.65 | 0.54 | range (attacks) |
| 58 | Kalista | +0.10 | 0.90 | 0.80 | range (attacks) |
| 59 | Zoe | +0.09 | 0.65 | 0.56 | range (attacks) |
| 60 | Ashe | +0.05 | 0.72 | 0.67 | range (attacks) |
| 61 | Udyr | +0.05 | 0.70 | 0.65 |  |
| 62 | Illaoi | +0.05 | 0.14 | 0.09 |  |
| 63 | Corki | +0.04 | 0.60 | 0.56 | range (attacks) |
| 64 | Tristana | +0.02 | 0.72 | 0.70 | range (attacks) |
| 65 | Varus | +0.02 | 0.71 | 0.69 | range (attacks) |
| 66 | Jayce | 0.00 | 0.61 | 0.61 | range (attacks) |
| 67 | Kayn | 0.00 | 0.53 | 0.53 |  |
| 68 | Annie | 0.00 | 0.44 | 0.44 |  |
| 69 | Nocturne | -0.02 | 0.63 | 0.65 |  |
| 70 | Lux | -0.02 | 0.58 | 0.60 | range (attacks) |
| 71 | Akali | -0.02 | 0.14 | 0.16 |  |
| 72 | Hwei | -0.03 | 0.92 | 0.95 |  |
| 73 | Renata Glasc | -0.03 | 0.91 | 0.94 | range (attacks) |
| 74 | Naafiri | -0.04 | 0.14 | 0.18 |  |
| 75 | Ryze | -0.05 | 0.48 | 0.53 |  |
| 76 | Brand | -0.05 | 0.44 | 0.49 |  |
| 77 | Senna | -0.07 | 0.65 | 0.72 | range (attacks) |
| 78 | Soraka | -0.07 | 0.53 | 0.60 | range (attacks) |
| 79 | Dr. Mundo | -0.07 | 0.00 | 0.07 |  |
| 80 | Shen | -0.08 | 0.75 | 0.83 | attack block (Spirit's Refuge) |
| 81 | Xerath | -0.08 | 0.53 | 0.61 | range (attacks) |
| 82 | Kassadin | -0.09 | 0.00 | 0.09 |  |
| 83 | Tryndamere | -0.09 | 0.00 | 0.09 |  |
| 84 | Aphelios | -0.10 | 0.84 | 0.94 | range (attacks) |
| 85 | Vel'Koz | -0.10 | 0.53 | 0.63 | range (attacks) |
| 86 | Fiddlesticks | -0.11 | 0.53 | 0.64 |  |
| 87 | Jhin | -0.11 | 0.53 | 0.64 | range (attacks) |
| 88 | Evelynn | -0.14 | 0.50 | 0.64 |  |
| 89 | Azir | -0.15 | 0.53 | 0.68 | range (attacks) |
| 90 | Orianna | -0.15 | 0.53 | 0.68 | range (attacks) |
| 91 | Locke | -0.15 | 0.00 | 0.15 |  |
| 92 | Rumble | -0.15 | 0.00 | 0.15 |  |
| 93 | Cassiopeia | -0.16 | 0.59 | 0.75 |  |
| 94 | Syndra | -0.16 | 0.44 | 0.60 |  |
| 95 | Singed | -0.17 | 0.43 | 0.60 |  |
| 96 | Braum | -0.18 | 0.70 | 0.88 | projectile block (Unbreakable) |
| 97 | Karma | -0.19 | 0.58 | 0.77 |  |
| 98 | Ziggs | -0.20 | 0.53 | 0.73 | range (attacks) |
| 99 | Swain | -0.21 | 0.42 | 0.63 |  |
| 100 | Talon | -0.21 | 0.00 | 0.21 |  |
| 101 | Janna | -0.22 | 0.72 | 0.94 | range (attacks) |
| 102 | Gnar | -0.26 | 0.66 | 0.92 | range (attacks) |
| 103 | Taric | -0.26 | 0.30 | 0.56 |  |
| 104 | Pantheon | -0.28 | 0.41 | 0.69 |  |
| 105 | Zyra | -0.30 | 0.62 | 0.92 |  |
| 106 | Shaco | -0.30 | 0.50 | 0.80 |  |
| 107 | Kled | -0.31 | 0.72 | 1.03 |  |
| 108 | Anivia | -0.33 | 0.48 | 0.81 |  |
| 109 | Kha'Zix | -0.33 | 0.00 | 0.33 |  |
| 110 | Yasuo | -0.34 | 0.67 | 1.01 | projectile block (Wind Wall) |
| 111 | Seraphine | -0.34 | 0.58 | 0.92 | range (attacks) |
| 112 | Ivern | -0.34 | 0.38 | 0.72 |  |
| 113 | Maokai | -0.36 | 0.87 | 1.23 |  |
| 114 | Mordekaiser | -0.36 | 0.19 | 0.55 |  |
| 115 | Heimerdinger | -0.37 | 0.47 | 0.84 |  |
| 116 | Thresh | -0.42 | 0.53 | 0.95 |  |
| 117 | Nami | -0.45 | 0.44 | 0.89 |  |
| 118 | Zaahen | -0.45 | 0.33 | 0.78 |  |
| 119 | Lillia | -0.47 | 0.22 | 0.69 |  |
| 120 | Aatrox | -0.47 | 0.14 | 0.61 |  |
| 121 | Renekton | -0.49 | 0.00 | 0.49 |  |
| 122 | Aurelion Sol | -0.52 | 0.44 | 0.96 |  |
| 123 | Irelia | -0.52 | 0.10 | 0.62 |  |
| 124 | Sion | -0.53 | 0.35 | 0.88 |  |
| 125 | Bel'Veth | -0.54 | 0.00 | 0.54 |  |
| 126 | Lee Sin | -0.55 | 0.14 | 0.69 |  |
| 127 | Cho'Gath | -0.55 | 0.00 | 0.55 |  |
| 128 | Xin Zhao | -0.57 | 0.32 | 0.89 |  |
| 129 | Fizz | -0.57 | 0.14 | 0.71 |  |
| 130 | Urgot | -0.58 | 0.44 | 1.02 |  |
| 131 | Neeko | -0.59 | 0.44 | 1.03 |  |
| 132 | Darius | -0.59 | 0.00 | 0.59 |  |
| 133 | Trundle | -0.60 | 0.00 | 0.60 |  |
| 134 | Yorick | -0.60 | 0.00 | 0.60 |  |
| 135 | Malphite | -0.61 | 0.25 | 0.86 |  |
| 136 | Warwick | -0.62 | 0.46 | 1.08 |  |
| 137 | Poppy | -0.62 | 0.36 | 0.98 |  |
| 138 | Taliyah | -0.64 | 0.53 | 1.17 | range (attacks) |
| 139 | Diana | -0.64 | 0.00 | 0.64 |  |
| 140 | Nunu & Willump | -0.67 | 0.20 | 0.87 |  |
| 141 | Skarner | -0.67 | 0.19 | 0.86 |  |
| 142 | Ambessa | -0.70 | 0.14 | 0.84 |  |
| 143 | Sylas | -0.70 | 0.14 | 0.84 |  |
| 144 | Camille | -0.73 | 0.49 | 1.22 |  |
| 145 | Rammus | -0.73 | 0.38 | 1.11 |  |
| 146 | Alistar | -0.79 | 0.27 | 1.06 |  |
| 147 | Zac | -0.80 | 0.39 | 1.19 |  |
| 148 | Hecarim | -0.80 | 0.00 | 0.80 |  |
| 149 | Blitzcrank | -0.82 | 0.00 | 0.82 |  |
| 150 | Wukong | -0.84 | 0.00 | 0.84 |  |
| 151 | Shyvana | -0.84 | 0.00 | 0.84 |  |
| 152 | Rakan | -0.87 | 0.25 | 1.12 |  |
| 153 | Yone | -0.91 | 0.15 | 1.06 |  |
| 154 | Volibear | -0.91 | 0.00 | 0.91 |  |
| 155 | Sett | -0.94 | 0.14 | 1.08 |  |
| 156 | Amumu | -0.97 | 0.15 | 1.12 |  |
| 157 | Vi | -0.97 | 0.14 | 1.11 |  |
| 158 | Riven | -1.03 | 0.00 | 1.03 |  |
| 159 | Leona | -1.04 | 0.00 | 1.04 |  |
| 160 | Briar | -1.05 | 0.14 | 1.19 |  |
| 161 | Tahm Kench | -1.06 | 0.00 | 1.06 |  |
| 162 | Viego | -1.07 | 0.19 | 1.26 |  |
| 163 | Jarvan IV | -1.07 | 0.00 | 1.07 |  |
| 164 | Nautilus | -1.08 | 0.00 | 1.08 |  |
| 165 | Qiyana | -1.10 | 0.00 | 1.10 |  |
| 166 | Gragas | -1.14 | 0.00 | 1.14 |  |
| 167 | Pyke | -1.16 | 0.00 | 1.16 |  |
| 168 | Sejuani | -1.21 | 0.00 | 1.21 |  |
| 169 | Ornn | -1.24 | 0.00 | 1.24 |  |
| 170 | Galio | -1.27 | 0.00 | 1.27 |  |
| 171 | K'Sante | -1.30 | 0.00 | 1.30 |  |
| 172 | Rell | -1.46 | 0.00 | 1.46 |  |
