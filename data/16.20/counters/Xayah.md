# Counters to Xayah (patch 26.20)

Every champion ranked by what its kit does against Xayah's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Xayah's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Xayah` for the full ledger of a matchup, with sources.

## Top 10

### 1. Kayle (net +0.81)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Xayah's Featherstorm. Invulnerable for 2.5 s, long enough to use ahead of Featherstorm. (Kayle R Divine Judgment → Xayah R Featherstorm)
- **0.18** range: Kayle's basic attacks reach 100 units farther than Xayah's (625 vs 525 attack range). Xayah has no dash or blink to close the gap. (Kayle basic attacks → Xayah basic attacks)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Xayah's Bladecaller (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Bladecaller. (Kayle R Divine Judgment → Xayah E Bladecaller)

### 2. Sivir (net +0.67)

- **0.55** spell shield: Spell Shield's spell shield blocks Xayah's Featherstorm. Spell shield for 1.5 s, long enough to use ahead of Featherstorm. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Xayah R Featherstorm)
- **0.23** spell shield: Spell Shield's spell shield blocks part of Xayah's Bladecaller. Spell shield for 1.5 s, long enough to use ahead of Bladecaller. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block a single instance of damage. (Sivir E Spell Shield → Xayah E Bladecaller)

### 3. Kindred (net +0.15)

- **0.30** invulnerable: Lamb's Respite makes Kindred invulnerable to Xayah's Featherstorm. Invulnerable for ?; Featherstorm lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kindred R Lamb's Respite → Xayah R Featherstorm)
- **0.09** invulnerable: Lamb's Respite makes Kindred invulnerable to Xayah's Bladecaller (its crowd control still applies). Invulnerable for ?; Bladecaller lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kindred R Lamb's Respite → Xayah E Bladecaller)
- Watch out: Featherstorm makes Xayah untargetable, dodging Kindred's Mounting Dread.

### 4. Samira (net +0.11)

- **0.32** projectile block: Blade Whirl blocks Xayah's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Xayah basic attacks)
- **0.26** projectile block: Blade Whirl blocks Xayah's Bladecaller, a projectile. Blade Whirl for 0.75 s; Bladecaller lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Samira W Blade Whirl → Xayah E Bladecaller)
- **0.17** projectile block: Blade Whirl blocks part of Xayah's Featherstorm, a projectile. Blade Whirl for 0.75 s; Featherstorm lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Only part of the ability is a projectile. The individual missiles have 1100 range but start slightly behind Xayah, reducing their total range. (Samira W Blade Whirl → Xayah R Featherstorm)
- Watch out: Featherstorm makes Xayah untargetable, dodging Samira's Wild Rush.

### 5. Teemo (net +0.10)

- **0.50** blind: Blinding Dart's blind makes Xayah's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Xayah basic attacks)
- Watch out: Featherstorm makes Xayah untargetable, dodging Teemo's Noxious Trap.

### 6. Milio (net +0.02)

- **0.24** cleanse: Breath of Life cleanses Xayah's Bladecaller (root) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Xayah E Bladecaller)
- **0.19** tenacity: Breath of Life's 65% tenacity shortens Xayah's Bladecaller (root). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Xayah E Bladecaller)
- Watch out: Featherstorm makes Xayah untargetable, dodging Milio's Ultra Mega Fire Kick.

### 7. Vladimir (net +0.01)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Xayah's Featherstorm. Untargetable for 2 s, long enough to use ahead of Featherstorm. (Vladimir W Sanguine Pool → Xayah R Featherstorm)
- **0.49** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Xayah's Bladecaller. Untargetable for 2 s, long enough to use ahead of Bladecaller. (Vladimir W Sanguine Pool → Xayah E Bladecaller)
- Watch out: Featherstorm makes Xayah untargetable, dodging Vladimir's Hemoplague.

### 8. Fiora (net 0.00)

- **0.39** parry: Riposte parries Xayah's Bladecaller and stuns back. Parry for 0.75 s; Bladecaller lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Bladecaller's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Xayah E Bladecaller)
- **0.33** parry: Riposte parries Xayah's Featherstorm. Parry for 0.75 s; Featherstorm lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Xayah R Featherstorm)
- **0.09** attack speed slow: Riposte cuts Xayah's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Xayah basic attacks)
- Watch out: Xayah's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range).

### 9. Kai'Sa (net 0.00)

- No interaction in Kai'Sa's favor.

### 10. Twitch (net 0.00)

- No interaction in Twitch's favor.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kayle | +0.81 | 0.81 | 0.00 |  |
| 2 | Sivir | +0.67 | 0.67 | 0.00 |  |
| 3 | Kindred | +0.15 | 0.35 | 0.20 |  |
| 4 | Samira | +0.11 | 0.51 | 0.40 |  |
| 5 | Teemo | +0.10 | 0.50 | 0.40 | blind (Blinding Dart) |
| 6 | Milio | +0.02 | 0.34 | 0.32 |  |
| 7 | Vladimir | +0.01 | 0.80 | 0.79 |  |
| 8 | Fiora | 0.00 | 0.58 | 0.58 |  |
| 9 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 10 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 11 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 12 | Elise | -0.03 | 0.47 | 0.50 |  |
| 13 | Yuumi | -0.06 | 0.59 | 0.65 |  |
| 14 | Bard | -0.09 | 0.71 | 0.80 |  |
| 15 | Braum | -0.11 | 1.07 | 1.18 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 16 | Mel | -0.14 | 0.50 | 0.64 |  |
| 17 | Lissandra | -0.15 | 0.71 | 0.86 |  |
| 18 | Udyr | -0.24 | 0.70 | 0.94 |  |
| 19 | Kog'Maw | -0.26 | 0.00 | 0.26 |  |
| 20 | Nidalee | -0.26 | 0.00 | 0.26 |  |
| 21 | Aurora | -0.27 | 0.43 | 0.70 |  |
| 22 | Shaco | -0.27 | 0.43 | 0.70 |  |
| 23 | Master Yi | -0.28 | 0.47 | 0.75 |  |
| 24 | Yasuo | -0.30 | 0.77 | 1.07 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 25 | LeBlanc | -0.31 | 0.00 | 0.31 |  |
| 26 | Twisted Fate | -0.31 | 0.00 | 0.31 |  |
| 27 | Shen | -0.33 | 0.39 | 0.72 |  |
| 28 | Vayne | -0.33 | 0.00 | 0.33 |  |
| 29 | Tryndamere | -0.34 | 0.00 | 0.34 |  |
| 30 | Zoe | -0.34 | 0.00 | 0.34 |  |
| 31 | Soraka | -0.35 | 0.00 | 0.35 |  |
| 32 | Morgana | -0.36 | 0.49 | 0.85 |  |
| 33 | Gwen | -0.37 | 0.47 | 0.84 |  |
| 34 | Zilean | -0.42 | 0.00 | 0.42 |  |
| 35 | Karma | -0.43 | 0.00 | 0.43 |  |
| 36 | Ryze | -0.44 | 0.00 | 0.44 |  |
| 37 | Akshan | -0.45 | 0.00 | 0.45 |  |
| 38 | Jayce | -0.45 | 0.00 | 0.45 |  |
| 39 | Zeri | -0.45 | 0.00 | 0.45 |  |
| 40 | Caitlyn | -0.46 | 0.22 | 0.68 |  |
| 41 | Ashe | -0.47 | 0.14 | 0.61 |  |
| 42 | Corki | -0.47 | 0.00 | 0.47 |  |
| 43 | Taric | -0.48 | 0.57 | 1.05 |  |
| 44 | Ivern | -0.49 | 0.00 | 0.49 |  |
| 45 | Malzahar | -0.50 | 0.35 | 0.85 |  |
| 46 | Heimerdinger | -0.50 | 0.00 | 0.50 |  |
| 47 | Rek'Sai | -0.51 | 0.71 | 1.22 |  |
| 48 | Lulu | -0.51 | 0.36 | 0.87 |  |
| 49 | Anivia | -0.51 | 0.09 | 0.60 |  |
| 50 | Lux | -0.51 | 0.00 | 0.51 |  |
| 51 | Quinn | -0.51 | 0.00 | 0.51 |  |
| 52 | Ezreal | -0.52 | 0.00 | 0.52 |  |
| 53 | Jinx | -0.53 | 0.00 | 0.53 |  |
| 54 | Ekko | -0.56 | 0.44 | 1.00 |  |
| 55 | Nasus | -0.59 | 0.39 | 0.98 |  |
| 56 | Tristana | -0.59 | 0.32 | 0.91 |  |
| 57 | Graves | -0.59 | 0.00 | 0.59 |  |
| 58 | Veigar | -0.59 | 0.00 | 0.59 |  |
| 59 | Varus | -0.61 | 0.00 | 0.61 |  |
| 60 | Gnar | -0.62 | 0.00 | 0.62 |  |
| 61 | Lucian | -0.62 | 0.00 | 0.62 |  |
| 62 | Pantheon | -0.63 | 0.67 | 1.30 |  |
| 63 | Vel'Koz | -0.64 | 0.00 | 0.64 |  |
| 64 | Olaf | -0.65 | 0.32 | 0.97 |  |
| 65 | Annie | -0.65 | 0.11 | 0.76 |  |
| 66 | Draven | -0.65 | 0.00 | 0.65 |  |
| 67 | Ziggs | -0.65 | 0.00 | 0.65 |  |
| 68 | Senna | -0.67 | 0.12 | 0.79 |  |
| 69 | Miss Fortune | -0.67 | 0.00 | 0.67 |  |
| 70 | Smolder | -0.67 | 0.00 | 0.67 |  |
| 71 | Kennen | -0.68 | 0.00 | 0.68 |  |
| 72 | Brand | -0.69 | 0.00 | 0.69 |  |
| 73 | Karthus | -0.69 | 0.00 | 0.69 |  |
| 74 | Viktor | -0.69 | 0.00 | 0.69 |  |
| 75 | Syndra | -0.70 | 0.00 | 0.70 |  |
| 76 | Vex | -0.70 | 0.00 | 0.70 |  |
| 77 | Kha'Zix | -0.72 | 0.00 | 0.72 |  |
| 78 | Xerath | -0.72 | 0.00 | 0.72 |  |
| 79 | Zed | -0.73 | 0.43 | 1.16 |  |
| 80 | Alistar | -0.73 | 0.26 | 0.99 |  |
| 81 | Kayn | -0.74 | 0.43 | 1.17 |  |
| 82 | Nocturne | -0.75 | 0.69 | 1.44 |  |
| 83 | Jax | -0.75 | 0.41 | 1.16 | attack dodge (Counter Strike) |
| 84 | Hwei | -0.75 | 0.00 | 0.75 |  |
| 85 | Jhin | -0.75 | 0.00 | 0.75 |  |
| 86 | Aatrox | -0.76 | 0.00 | 0.76 |  |
| 87 | Xin Zhao | -0.77 | 0.63 | 1.40 |  |
| 88 | Kalista | -0.77 | 0.25 | 1.02 |  |
| 89 | Dr. Mundo | -0.77 | 0.00 | 0.77 |  |
| 90 | Swain | -0.77 | 0.00 | 0.77 |  |
| 91 | Orianna | -0.80 | 0.00 | 0.80 |  |
| 92 | Sona | -0.80 | 0.00 | 0.80 |  |
| 93 | Bel'Veth | -0.81 | 0.00 | 0.81 |  |
| 94 | Sylas | -0.81 | 0.00 | 0.81 |  |
| 95 | Thresh | -0.81 | 0.00 | 0.81 |  |
| 96 | Shyvana | -0.82 | 0.00 | 0.82 |  |
| 97 | Nilah | -0.83 | 0.35 | 1.18 |  |
| 98 | Illaoi | -0.83 | 0.00 | 0.83 |  |
| 99 | Fiddlesticks | -0.85 | 0.00 | 0.85 |  |
| 100 | Katarina | -0.85 | 0.00 | 0.85 |  |
| 101 | Locke | -0.86 | 0.00 | 0.86 |  |
| 102 | Talon | -0.86 | 0.00 | 0.86 |  |
| 103 | Ahri | -0.87 | 0.00 | 0.87 |  |
| 104 | Cassiopeia | -0.87 | 0.00 | 0.87 |  |
| 105 | Kassadin | -0.87 | 0.00 | 0.87 |  |
| 106 | Lee Sin | -0.87 | 0.00 | 0.87 |  |
| 107 | Maokai | -0.90 | 0.54 | 1.44 |  |
| 108 | Azir | -0.90 | 0.00 | 0.90 |  |
| 109 | Evelynn | -0.91 | 0.43 | 1.34 |  |
| 110 | Neeko | -0.91 | 0.00 | 0.91 |  |
| 111 | Rengar | -0.92 | 0.49 | 1.41 |  |
| 112 | Zyra | -0.92 | 0.00 | 0.92 |  |
| 113 | Camille | -0.93 | 0.43 | 1.36 |  |
| 114 | Akali | -0.94 | 0.00 | 0.94 |  |
| 115 | Aphelios | -0.96 | 0.00 | 0.96 |  |
| 116 | Riven | -0.96 | 0.00 | 0.96 |  |
| 117 | Seraphine | -0.97 | 0.00 | 0.97 |  |
| 118 | Naafiri | -0.98 | 0.00 | 0.98 |  |
| 119 | Renata Glasc | -0.98 | 0.00 | 0.98 |  |
| 120 | Lillia | -0.99 | 0.00 | 0.99 |  |
| 121 | Gangplank | -1.00 | 0.42 | 1.42 |  |
| 122 | Yorick | -1.00 | 0.00 | 1.00 |  |
| 123 | Nami | -1.01 | 0.00 | 1.01 |  |
| 124 | Janna | -1.02 | 0.00 | 1.02 |  |
| 125 | Renekton | -1.02 | 0.00 | 1.02 |  |
| 126 | Urgot | -1.03 | 0.00 | 1.03 |  |
| 127 | Aurelion Sol | -1.04 | 0.00 | 1.04 |  |
| 128 | Fizz | -1.05 | 0.00 | 1.05 |  |
| 129 | Zaahen | -1.06 | 0.19 | 1.25 |  |
| 130 | Irelia | -1.07 | 0.00 | 1.07 |  |
| 131 | Rammus | -1.09 | 0.38 | 1.47 |  |
| 132 | Sion | -1.10 | 0.34 | 1.44 |  |
| 133 | Kled | -1.10 | 0.19 | 1.29 |  |
| 134 | Garen | -1.11 | 0.18 | 1.29 |  |
| 135 | Rakan | -1.12 | 0.00 | 1.12 |  |
| 136 | Warwick | -1.14 | 0.20 | 1.34 |  |
| 137 | Wukong | -1.15 | 0.00 | 1.15 |  |
| 138 | Singed | -1.19 | 0.00 | 1.19 |  |
| 139 | Taliyah | -1.20 | 0.00 | 1.20 |  |
| 140 | Hecarim | -1.22 | 0.00 | 1.22 |  |
| 141 | Malphite | -1.23 | 0.25 | 1.48 |  |
| 142 | Nautilus | -1.23 | 0.00 | 1.23 |  |
| 143 | Diana | -1.25 | 0.00 | 1.25 |  |
| 144 | Rumble | -1.25 | 0.00 | 1.25 |  |
| 145 | Ambessa | -1.26 | 0.00 | 1.26 |  |
| 146 | Viego | -1.26 | 0.00 | 1.26 |  |
| 147 | Yone | -1.26 | 0.00 | 1.26 |  |
| 148 | Gragas | -1.27 | 0.00 | 1.27 |  |
| 149 | Mordekaiser | -1.29 | 0.09 | 1.38 |  |
| 150 | Jarvan IV | -1.29 | 0.00 | 1.29 |  |
| 151 | Leona | -1.29 | 0.00 | 1.29 |  |
| 152 | Pyke | -1.29 | 0.00 | 1.29 |  |
| 153 | Qiyana | -1.30 | 0.00 | 1.30 |  |
| 154 | Tahm Kench | -1.30 | 0.00 | 1.30 |  |
| 155 | Briar | -1.31 | 0.00 | 1.31 |  |
| 156 | Trundle | -1.32 | 0.00 | 1.32 |  |
| 157 | Darius | -1.33 | 0.00 | 1.33 |  |
| 158 | Rell | -1.33 | 0.00 | 1.33 |  |
| 159 | Blitzcrank | -1.34 | 0.00 | 1.34 |  |
| 160 | Poppy | -1.37 | 0.00 | 1.37 |  |
| 161 | K'Sante | -1.38 | 0.00 | 1.38 |  |
| 162 | Zac | -1.39 | 0.00 | 1.39 |  |
| 163 | Cho'Gath | -1.40 | 0.00 | 1.40 |  |
| 164 | Amumu | -1.42 | 0.00 | 1.42 |  |
| 165 | Sett | -1.42 | 0.00 | 1.42 |  |
| 166 | Vi | -1.42 | 0.00 | 1.42 |  |
| 167 | Volibear | -1.42 | 0.00 | 1.42 |  |
| 168 | Sejuani | -1.43 | 0.00 | 1.43 |  |
| 169 | Ornn | -1.49 | 0.00 | 1.49 |  |
| 170 | Galio | -1.55 | 0.00 | 1.55 |  |
| 171 | Nunu & Willump | -1.57 | 0.00 | 1.57 |  |
| 172 | Skarner | -1.59 | 0.00 | 1.59 |  |
