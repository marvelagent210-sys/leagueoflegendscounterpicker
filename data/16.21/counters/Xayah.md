# Counters to Xayah (patch 26.21)

Every champion ranked by what its kit does against Xayah's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Xayah's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Xayah` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +0.67)

- **0.55** spell shield: Spell Shield's spell shield blocks Xayah's Featherstorm. Spell shield for 1.5 s, long enough to use ahead of Featherstorm. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Xayah R Featherstorm)
- **0.23** spell shield: Spell Shield's spell shield blocks part of Xayah's Bladecaller. Spell shield for 1.5 s, long enough to use ahead of Bladecaller. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block a single instance of damage. (Sivir E Spell Shield → Xayah E Bladecaller)

### 2. Kayle (net +0.61)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Xayah's Featherstorm. Invulnerable for 2.5 s, long enough to use ahead of Featherstorm. (Kayle R Divine Judgment → Xayah R Featherstorm)
- **0.18** range: Kayle's basic attacks reach 100 units farther than Xayah's (625 vs 525 attack range). Xayah has no dash or blink to close the gap. (Kayle basic attacks → Xayah basic attacks)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Xayah's Bladecaller (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Bladecaller. (Kayle R Divine Judgment → Xayah E Bladecaller)
- Watch out: Featherstorm makes Xayah untargetable, dodging Kayle's Starfire Spellblade.

### 3. Samira (net +0.11)

- **0.32** projectile block: Blade Whirl blocks Xayah's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Xayah basic attacks)
- **0.26** projectile block: Blade Whirl blocks Xayah's Bladecaller, a projectile. Blade Whirl for 0.75 s; Bladecaller lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Samira W Blade Whirl → Xayah E Bladecaller)
- **0.17** projectile block: Blade Whirl blocks part of Xayah's Featherstorm, a projectile. Blade Whirl for 0.75 s; Featherstorm lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Only part of the ability is a projectile. The individual missiles have 1100 range but start slightly behind Xayah, reducing their total range. (Samira W Blade Whirl → Xayah R Featherstorm)
- Watch out: Featherstorm makes Xayah untargetable, dodging Samira's Wild Rush.

### 4. Teemo (net +0.10)

- **0.50** blind: Blinding Dart's blind makes Xayah's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Xayah basic attacks)
- Watch out: Featherstorm makes Xayah untargetable, dodging Teemo's Noxious Trap.

### 5. Milio (net +0.02)

- **0.24** cleanse: Breath of Life cleanses Xayah's Bladecaller (root) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Xayah E Bladecaller)
- **0.19** tenacity: Breath of Life's 65% tenacity shortens Xayah's Bladecaller (root). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Xayah E Bladecaller)
- Watch out: Featherstorm makes Xayah untargetable, dodging Milio's Ultra Mega Fire Kick.

### 6. Vladimir (net +0.01)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Xayah's Featherstorm. Untargetable for 2 s, long enough to use ahead of Featherstorm. (Vladimir W Sanguine Pool → Xayah R Featherstorm)
- **0.49** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Xayah's Bladecaller. Untargetable for 2 s, long enough to use ahead of Bladecaller. (Vladimir W Sanguine Pool → Xayah E Bladecaller)
- Watch out: Featherstorm makes Xayah untargetable, dodging Vladimir's Hemoplague.

### 7. Kai'Sa (net 0.00)

- No interaction in Kai'Sa's favor.

### 8. Twitch (net 0.00)

- No interaction in Twitch's favor.

### 9. Yunara (net 0.00)

- No interaction in Yunara's favor.

### 10. Bard (net -0.04)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Xayah's Featherstorm. Untargetable for 2.5 s, long enough to use ahead of Featherstorm. (Bard R Tempered Fate → Xayah R Featherstorm)
- **0.32** untargetable: Tempered Fate makes Bard untargetable, dodging Xayah's Bladecaller. Untargetable for 2.5 s, long enough to use ahead of Bladecaller. (Bard R Tempered Fate → Xayah E Bladecaller)
- Watch out: Featherstorm makes Xayah untargetable, dodging Bard's Tempered Fate.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.67 | 0.67 | 0.00 |  |
| 2 | Kayle | +0.61 | 0.81 | 0.20 |  |
| 3 | Samira | +0.11 | 0.51 | 0.40 |  |
| 4 | Teemo | +0.10 | 0.50 | 0.40 | blind (Blinding Dart) |
| 5 | Milio | +0.02 | 0.34 | 0.32 |  |
| 6 | Vladimir | +0.01 | 0.80 | 0.79 |  |
| 7 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 8 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 9 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 10 | Bard | -0.04 | 0.71 | 0.75 |  |
| 11 | Yuumi | -0.06 | 0.59 | 0.65 |  |
| 12 | Fiora | -0.10 | 0.58 | 0.68 |  |
| 13 | Braum | -0.11 | 1.07 | 1.18 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 14 | Mel | -0.14 | 0.50 | 0.64 |  |
| 15 | Lissandra | -0.15 | 0.71 | 0.86 |  |
| 16 | Kindred | -0.20 | 0.00 | 0.20 |  |
| 17 | Udyr | -0.24 | 0.70 | 0.94 |  |
| 18 | Kog'Maw | -0.26 | 0.00 | 0.26 |  |
| 19 | Aurora | -0.27 | 0.43 | 0.70 |  |
| 20 | Master Yi | -0.28 | 0.47 | 0.75 |  |
| 21 | Corki | -0.29 | 0.00 | 0.29 |  |
| 22 | Yasuo | -0.30 | 0.77 | 1.07 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 23 | Zilean | -0.30 | 0.00 | 0.30 |  |
| 24 | LeBlanc | -0.31 | 0.00 | 0.31 |  |
| 25 | Twisted Fate | -0.31 | 0.00 | 0.31 |  |
| 26 | Tryndamere | -0.34 | 0.00 | 0.34 |  |
| 27 | Zoe | -0.34 | 0.00 | 0.34 |  |
| 28 | Kayn | -0.35 | 0.43 | 0.78 |  |
| 29 | Soraka | -0.35 | 0.00 | 0.35 |  |
| 30 | Morgana | -0.36 | 0.49 | 0.85 |  |
| 31 | Nidalee | -0.36 | 0.00 | 0.36 |  |
| 32 | Gwen | -0.37 | 0.47 | 0.84 |  |
| 33 | Shaco | -0.42 | 0.43 | 0.85 |  |
| 34 | Shen | -0.43 | 0.39 | 0.82 |  |
| 35 | Karma | -0.43 | 0.00 | 0.43 |  |
| 36 | Ryze | -0.44 | 0.00 | 0.44 |  |
| 37 | Akshan | -0.45 | 0.00 | 0.45 |  |
| 38 | Zeri | -0.45 | 0.00 | 0.45 |  |
| 39 | Caitlyn | -0.46 | 0.22 | 0.68 |  |
| 40 | Ashe | -0.47 | 0.14 | 0.61 |  |
| 41 | Vayne | -0.48 | 0.00 | 0.48 |  |
| 42 | Ivern | -0.49 | 0.00 | 0.49 |  |
| 43 | Malzahar | -0.50 | 0.35 | 0.85 |  |
| 44 | Elise | -0.50 | 0.00 | 0.50 |  |
| 45 | Heimerdinger | -0.50 | 0.00 | 0.50 |  |
| 46 | Jayce | -0.50 | 0.00 | 0.50 |  |
| 47 | Fizz | -0.51 | 0.59 | 1.10 |  |
| 48 | Lulu | -0.51 | 0.36 | 0.87 |  |
| 49 | Anivia | -0.51 | 0.09 | 0.60 |  |
| 50 | Lux | -0.51 | 0.00 | 0.51 |  |
| 51 | Quinn | -0.51 | 0.00 | 0.51 |  |
| 52 | Jinx | -0.53 | 0.00 | 0.53 |  |
| 53 | Rek'Sai | -0.54 | 0.71 | 1.25 |  |
| 54 | Tristana | -0.54 | 0.32 | 0.86 |  |
| 55 | Graves | -0.59 | 0.00 | 0.59 |  |
| 56 | Veigar | -0.59 | 0.00 | 0.59 |  |
| 57 | Varus | -0.61 | 0.00 | 0.61 |  |
| 58 | Ezreal | -0.62 | 0.00 | 0.62 |  |
| 59 | Gnar | -0.62 | 0.00 | 0.62 |  |
| 60 | Lucian | -0.62 | 0.00 | 0.62 |  |
| 61 | Pantheon | -0.63 | 0.67 | 1.30 |  |
| 62 | Sylas | -0.64 | 0.00 | 0.64 |  |
| 63 | Vel'Koz | -0.64 | 0.00 | 0.64 |  |
| 64 | Olaf | -0.65 | 0.32 | 0.97 |  |
| 65 | Annie | -0.65 | 0.11 | 0.76 |  |
| 66 | Ziggs | -0.65 | 0.00 | 0.65 |  |
| 67 | Senna | -0.67 | 0.12 | 0.79 |  |
| 68 | Miss Fortune | -0.67 | 0.00 | 0.67 |  |
| 69 | Smolder | -0.67 | 0.00 | 0.67 |  |
| 70 | Kennen | -0.68 | 0.00 | 0.68 |  |
| 71 | Brand | -0.69 | 0.00 | 0.69 |  |
| 72 | Karthus | -0.69 | 0.00 | 0.69 |  |
| 73 | Viktor | -0.69 | 0.00 | 0.69 |  |
| 74 | Draven | -0.70 | 0.00 | 0.70 |  |
| 75 | Syndra | -0.70 | 0.00 | 0.70 |  |
| 76 | Vex | -0.70 | 0.00 | 0.70 |  |
| 77 | Nasus | -0.72 | 0.39 | 1.11 |  |
| 78 | Kha'Zix | -0.72 | 0.00 | 0.72 |  |
| 79 | Xerath | -0.72 | 0.00 | 0.72 |  |
| 80 | Zed | -0.73 | 0.43 | 1.16 |  |
| 81 | Alistar | -0.73 | 0.26 | 0.99 |  |
| 82 | Nocturne | -0.75 | 0.69 | 1.44 |  |
| 83 | Jhin | -0.75 | 0.00 | 0.75 |  |
| 84 | Aatrox | -0.76 | 0.00 | 0.76 |  |
| 85 | Hwei | -0.76 | 0.00 | 0.76 |  |
| 86 | Xin Zhao | -0.77 | 0.63 | 1.40 |  |
| 87 | Jax | -0.77 | 0.41 | 1.18 | attack dodge (Counter Strike) |
| 88 | Kalista | -0.77 | 0.25 | 1.02 |  |
| 89 | Swain | -0.77 | 0.00 | 0.77 |  |
| 90 | Orianna | -0.80 | 0.00 | 0.80 |  |
| 91 | Bel'Veth | -0.81 | 0.00 | 0.81 |  |
| 92 | Thresh | -0.81 | 0.00 | 0.81 |  |
| 93 | Nilah | -0.83 | 0.35 | 1.18 |  |
| 94 | Fiddlesticks | -0.85 | 0.00 | 0.85 |  |
| 95 | Katarina | -0.85 | 0.00 | 0.85 |  |
| 96 | Talon | -0.86 | 0.00 | 0.86 |  |
| 97 | Ahri | -0.87 | 0.00 | 0.87 |  |
| 98 | Cassiopeia | -0.87 | 0.00 | 0.87 |  |
| 99 | Lee Sin | -0.87 | 0.00 | 0.87 |  |
| 100 | Maokai | -0.90 | 0.54 | 1.44 |  |
| 101 | Azir | -0.90 | 0.00 | 0.90 |  |
| 102 | Sona | -0.90 | 0.00 | 0.90 |  |
| 103 | Evelynn | -0.91 | 0.43 | 1.34 |  |
| 104 | Neeko | -0.91 | 0.00 | 0.91 |  |
| 105 | Rengar | -0.92 | 0.49 | 1.41 |  |
| 106 | Kassadin | -0.92 | 0.00 | 0.92 |  |
| 107 | Shyvana | -0.92 | 0.00 | 0.92 |  |
| 108 | Zyra | -0.92 | 0.00 | 0.92 |  |
| 109 | Akali | -0.94 | 0.00 | 0.94 |  |
| 110 | Camille | -0.95 | 0.43 | 1.38 |  |
| 111 | Riven | -0.96 | 0.00 | 0.96 |  |
| 112 | Dr. Mundo | -0.97 | 0.00 | 0.97 |  |
| 113 | Seraphine | -0.97 | 0.00 | 0.97 |  |
| 114 | Naafiri | -0.98 | 0.00 | 0.98 |  |
| 115 | Renata Glasc | -0.98 | 0.00 | 0.98 |  |
| 116 | Lillia | -0.99 | 0.00 | 0.99 |  |
| 117 | Gangplank | -1.00 | 0.42 | 1.42 |  |
| 118 | Aphelios | -1.00 | 0.00 | 1.00 |  |
| 119 | Irelia | -1.01 | 0.00 | 1.01 |  |
| 120 | Nami | -1.01 | 0.00 | 1.01 |  |
| 121 | Illaoi | -1.02 | 0.00 | 1.02 |  |
| 122 | Janna | -1.02 | 0.00 | 1.02 |  |
| 123 | Renekton | -1.02 | 0.00 | 1.02 |  |
| 124 | Urgot | -1.03 | 0.00 | 1.03 |  |
| 125 | Aurelion Sol | -1.04 | 0.00 | 1.04 |  |
| 126 | Locke | -1.05 | 0.00 | 1.05 |  |
| 127 | Taric | -1.05 | 0.00 | 1.05 |  |
| 128 | Zaahen | -1.06 | 0.19 | 1.25 |  |
| 129 | Garen | -1.06 | 0.18 | 1.24 |  |
| 130 | Rammus | -1.09 | 0.38 | 1.47 |  |
| 131 | Sion | -1.10 | 0.34 | 1.44 |  |
| 132 | Kled | -1.10 | 0.19 | 1.29 |  |
| 133 | Ekko | -1.12 | 0.00 | 1.12 |  |
| 134 | Rakan | -1.12 | 0.00 | 1.12 |  |
| 135 | Yorick | -1.12 | 0.00 | 1.12 |  |
| 136 | Warwick | -1.14 | 0.20 | 1.34 |  |
| 137 | Diana | -1.15 | 0.00 | 1.15 |  |
| 138 | Singed | -1.19 | 0.00 | 1.19 |  |
| 139 | Wukong | -1.20 | 0.00 | 1.20 |  |
| 140 | Taliyah | -1.20 | 0.00 | 1.20 |  |
| 141 | Nautilus | -1.23 | 0.00 | 1.23 |  |
| 142 | Rumble | -1.25 | 0.00 | 1.25 |  |
| 143 | Ambessa | -1.26 | 0.00 | 1.26 |  |
| 144 | Viego | -1.26 | 0.00 | 1.26 |  |
| 145 | Yone | -1.26 | 0.00 | 1.26 |  |
| 146 | Malphite | -1.28 | 0.25 | 1.53 |  |
| 147 | Mordekaiser | -1.29 | 0.09 | 1.38 |  |
| 148 | Jarvan IV | -1.29 | 0.00 | 1.29 |  |
| 149 | Leona | -1.29 | 0.00 | 1.29 |  |
| 150 | Pyke | -1.29 | 0.00 | 1.29 |  |
| 151 | Blitzcrank | -1.30 | 0.00 | 1.30 |  |
| 152 | Qiyana | -1.30 | 0.00 | 1.30 |  |
| 153 | Tahm Kench | -1.30 | 0.00 | 1.30 |  |
| 154 | Gragas | -1.32 | 0.00 | 1.32 |  |
| 155 | Briar | -1.33 | 0.00 | 1.33 |  |
| 156 | Rell | -1.33 | 0.00 | 1.33 |  |
| 157 | Darius | -1.37 | 0.00 | 1.37 |  |
| 158 | Poppy | -1.37 | 0.00 | 1.37 |  |
| 159 | K'Sante | -1.38 | 0.00 | 1.38 |  |
| 160 | Trundle | -1.38 | 0.00 | 1.38 |  |
| 161 | Zac | -1.39 | 0.00 | 1.39 |  |
| 162 | Amumu | -1.42 | 0.00 | 1.42 |  |
| 163 | Hecarim | -1.42 | 0.00 | 1.42 |  |
| 164 | Volibear | -1.42 | 0.00 | 1.42 |  |
| 165 | Cho'Gath | -1.43 | 0.00 | 1.43 |  |
| 166 | Sejuani | -1.43 | 0.00 | 1.43 |  |
| 167 | Sett | -1.47 | 0.00 | 1.47 |  |
| 168 | Vi | -1.47 | 0.00 | 1.47 |  |
| 169 | Ornn | -1.49 | 0.00 | 1.49 |  |
| 170 | Galio | -1.55 | 0.00 | 1.55 |  |
| 171 | Nunu & Willump | -1.57 | 0.00 | 1.57 |  |
| 172 | Skarner | -1.59 | 0.00 | 1.59 |  |
