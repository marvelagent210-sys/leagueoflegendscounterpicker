# Counters to Milio (patch 26.20)

Every champion ranked by what its kit does against Milio's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Milio's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Milio` for the full ledger of a matchup, with sources.

## Top 10

### 1. Samira (net +0.63)

- **0.47** projectile block: Blade Whirl blocks Milio's Ultra Mega Fire Kick, a projectile. Blade Whirl for 0.75 s; Ultra Mega Fire Kick takes 1 s to land, enough to react. (Samira W Blade Whirl → Milio Q Ultra Mega Fire Kick)
- **0.32** projectile block: Blade Whirl blocks Milio's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Milio basic attacks)

### 2. Yasuo (net +0.52)

- **0.53** projectile block: Wind Wall blocks Milio's Ultra Mega Fire Kick, a projectile. Wind Wall for 4 s, long enough to use ahead of Ultra Mega Fire Kick. (Yasuo W Wind Wall → Milio Q Ultra Mega Fire Kick)
- **0.41** projectile block: Wind Wall blocks Milio's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Milio basic attacks)
- Watch out: Milio's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

### 3. Sivir (net +0.51)

- **0.51** spell shield: Spell Shield's spell shield blocks Milio's Ultra Mega Fire Kick. Spell shield for 1.5 s, long enough to use ahead of Ultra Mega Fire Kick. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Milio Q Ultra Mega Fire Kick)

### 4. Teemo (net +0.35)

- **0.50** blind: Blinding Dart's blind makes Milio's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Milio basic attacks)
- Watch out: Breath of Life cleanses Teemo's Blinding Dart (blind) after it lands.

### 5. Kayle (net +0.29)

- **0.18** range: Kayle's basic attacks reach 100 units farther than Milio's (625 vs 525 attack range). Milio has no dash or blink to close the gap. (Kayle basic attacks → Milio basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Milio's Ultra Mega Fire Kick (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Ultra Mega Fire Kick. (Kayle R Divine Judgment → Milio Q Ultra Mega Fire Kick)
- Watch out: Breath of Life cleanses Kayle's Radiant Blast (slow) after it lands.

### 6. Braum (net +0.27)

- **0.70** projectile block: Unbreakable blocks Milio's Ultra Mega Fire Kick, a projectile. Unbreakable for 4 s, long enough to use ahead of Ultra Mega Fire Kick. (Braum E Unbreakable → Milio Q Ultra Mega Fire Kick)
- **0.54** projectile block: Unbreakable blocks Milio's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Milio basic attacks)
- Watch out: Milio's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

### 7. Mel (net +0.25)

- **0.44** projectile block: Rebuttal blocks Milio's Ultra Mega Fire Kick, a projectile. Rebuttal for 0.75 s; Ultra Mega Fire Kick takes 1 s to land, enough to react. (Mel W Rebuttal → Milio Q Ultra Mega Fire Kick)
- **0.32** projectile block: Rebuttal blocks Milio's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Milio basic attacks)
- Watch out: Breath of Life cleanses Mel's Solar Snare (slow, root) after it lands.

### 8. Vladimir (net +0.25)

- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Milio's Ultra Mega Fire Kick. Untargetable for 2 s, long enough to use ahead of Ultra Mega Fire Kick. (Vladimir W Sanguine Pool → Milio Q Ultra Mega Fire Kick)
- Watch out: Milio's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

### 9. Aurora (net +0.20)

- **0.32** untargetable: Between Worlds makes Aurora untargetable, dodging Milio's Ultra Mega Fire Kick. Untargetable for 0.4 s; Ultra Mega Fire Kick takes 1 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Milio Q Ultra Mega Fire Kick)
- **0.07** cc immunity: Between Worlds is displacement immune, ignoring Milio's Ultra Mega Fire Kick (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Milio Q Ultra Mega Fire Kick)
- Watch out: Breath of Life cleanses Aurora's Between Worlds (slow) after it lands.

### 10. Kalista (net +0.19)

- **0.25** cleanse: Fate's Call cleanses Milio's Ultra Mega Fire Kick (airborne, slow, stun) after it lands. 120 s cooldown; usable while crowd controlled. (Kalista R Fate's Call → Milio Q Ultra Mega Fire Kick)
- Watch out: Breath of Life cleanses Kalista's Rend (slow) after it lands.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +0.63 | 0.63 | 0.00 | projectile block (Blade Whirl) |
| 2 | Yasuo | +0.52 | 0.74 | 0.22 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 3 | Sivir | +0.51 | 0.51 | 0.00 |  |
| 4 | Teemo | +0.35 | 0.50 | 0.15 | blind (Blinding Dart) |
| 5 | Kayle | +0.29 | 0.35 | 0.06 |  |
| 6 | Braum | +0.27 | 0.97 | 0.70 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Mel | +0.25 | 0.60 | 0.35 | projectile block (Rebuttal) |
| 8 | Vladimir | +0.25 | 0.54 | 0.29 |  |
| 9 | Aurora | +0.20 | 0.36 | 0.16 |  |
| 10 | Kalista | +0.19 | 0.25 | 0.06 |  |
| 11 | Elise | +0.16 | 0.51 | 0.35 |  |
| 12 | Lulu | +0.16 | 0.36 | 0.20 |  |
| 13 | Rek'Sai | +0.15 | 0.37 | 0.22 |  |
| 14 | Fiora | +0.10 | 0.69 | 0.59 |  |
| 15 | Kled | +0.10 | 0.32 | 0.22 |  |
| 16 | Kindred | +0.10 | 0.16 | 0.06 |  |
| 17 | Yuumi | +0.07 | 0.70 | 0.63 |  |
| 18 | Master Yi | +0.06 | 0.63 | 0.57 |  |
| 19 | Gwen | +0.05 | 0.51 | 0.46 |  |
| 20 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 21 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 22 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 23 | Zed | -0.01 | 0.32 | 0.33 |  |
| 24 | Xayah | -0.02 | 0.32 | 0.34 |  |
| 25 | Corki | -0.02 | 0.07 | 0.09 |  |
| 26 | Azir | -0.06 | 0.00 | 0.06 |  |
| 27 | Kog'Maw | -0.06 | 0.00 | 0.06 |  |
| 28 | Twitch | -0.06 | 0.00 | 0.06 |  |
| 29 | Zeri | -0.06 | 0.00 | 0.06 |  |
| 30 | Ziggs | -0.06 | 0.00 | 0.06 |  |
| 31 | Nocturne | -0.07 | 0.70 | 0.77 |  |
| 32 | Yunara | -0.07 | 0.00 | 0.07 |  |
| 33 | Nilah | -0.09 | 0.35 | 0.44 |  |
| 34 | Draven | -0.09 | 0.00 | 0.09 |  |
| 35 | Graves | -0.12 | 0.00 | 0.12 |  |
| 36 | Smolder | -0.12 | 0.00 | 0.12 |  |
| 37 | Malphite | -0.13 | 0.32 | 0.45 |  |
| 38 | Ekko | -0.14 | 0.36 | 0.50 |  |
| 39 | Jarvan IV | -0.16 | 0.07 | 0.23 |  |
| 40 | Udyr | -0.17 | 0.70 | 0.87 |  |
| 41 | Morgana | -0.17 | 0.54 | 0.71 |  |
| 42 | Annie | -0.17 | 0.11 | 0.28 |  |
| 43 | LeBlanc | -0.22 | 0.00 | 0.22 |  |
| 44 | Wukong | -0.22 | 0.00 | 0.22 |  |
| 45 | Vex | -0.23 | 0.07 | 0.30 |  |
| 46 | Zaahen | -0.24 | 0.33 | 0.57 |  |
| 47 | Senna | -0.24 | 0.12 | 0.36 |  |
| 48 | Anivia | -0.26 | 0.09 | 0.35 |  |
| 49 | Evelynn | -0.28 | 0.33 | 0.61 |  |
| 50 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 51 | Kennen | -0.28 | 0.00 | 0.28 |  |
| 52 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 53 | Shaco | -0.30 | 0.33 | 0.63 |  |
| 54 | Quinn | -0.30 | 0.00 | 0.30 |  |
| 55 | Jax | -0.32 | 0.41 | 0.73 | attack dodge (Counter Strike) |
| 56 | Akali | -0.32 | 0.00 | 0.32 |  |
| 57 | Talon | -0.32 | 0.00 | 0.32 |  |
| 58 | Camille | -0.33 | 0.37 | 0.70 |  |
| 59 | Bard | -0.33 | 0.33 | 0.66 |  |
| 60 | Fizz | -0.34 | 0.00 | 0.34 |  |
| 61 | Miss Fortune | -0.34 | 0.00 | 0.34 |  |
| 62 | Zilean | -0.35 | 0.00 | 0.35 |  |
| 63 | Zyra | -0.35 | 0.00 | 0.35 |  |
| 64 | Lissandra | -0.36 | 0.33 | 0.69 |  |
| 65 | Tristana | -0.36 | 0.32 | 0.68 |  |
| 66 | Ahri | -0.36 | 0.00 | 0.36 |  |
| 67 | Brand | -0.36 | 0.00 | 0.36 |  |
| 68 | Jayce | -0.36 | 0.00 | 0.36 |  |
| 69 | Jinx | -0.36 | 0.00 | 0.36 |  |
| 70 | Lux | -0.36 | 0.00 | 0.36 |  |
| 71 | Vayne | -0.36 | 0.00 | 0.36 |  |
| 72 | Veigar | -0.36 | 0.00 | 0.36 |  |
| 73 | Viktor | -0.36 | 0.00 | 0.36 |  |
| 74 | Zoe | -0.36 | 0.00 | 0.36 |  |
| 75 | Illaoi | -0.37 | 0.07 | 0.44 |  |
| 76 | Swain | -0.37 | 0.00 | 0.37 |  |
| 77 | Syndra | -0.37 | 0.00 | 0.37 |  |
| 78 | Heimerdinger | -0.38 | 0.07 | 0.45 |  |
| 79 | Bel'Veth | -0.38 | 0.00 | 0.38 |  |
| 80 | Nami | -0.38 | 0.00 | 0.38 |  |
| 81 | Soraka | -0.38 | 0.00 | 0.38 |  |
| 82 | Aatrox | -0.40 | 0.00 | 0.40 |  |
| 83 | Karma | -0.40 | 0.00 | 0.40 |  |
| 84 | Tryndamere | -0.40 | 0.00 | 0.40 |  |
| 85 | Ashe | -0.41 | 0.14 | 0.55 |  |
| 86 | Caitlyn | -0.42 | 0.22 | 0.64 |  |
| 87 | Kassadin | -0.42 | 0.00 | 0.42 |  |
| 88 | Kayn | -0.43 | 0.33 | 0.76 |  |
| 89 | Gangplank | -0.44 | 0.46 | 0.90 |  |
| 90 | Nasus | -0.44 | 0.39 | 0.83 |  |
| 91 | Katarina | -0.44 | 0.22 | 0.66 |  |
| 92 | Varus | -0.44 | 0.22 | 0.66 |  |
| 93 | Hwei | -0.45 | 0.00 | 0.45 |  |
| 94 | Kha'Zix | -0.45 | 0.00 | 0.45 |  |
| 95 | Janna | -0.46 | 0.00 | 0.46 |  |
| 96 | Garen | -0.48 | 0.32 | 0.80 |  |
| 97 | Karthus | -0.48 | 0.00 | 0.48 |  |
| 98 | Locke | -0.49 | 0.00 | 0.49 |  |
| 99 | Maokai | -0.50 | 0.70 | 1.20 |  |
| 100 | Olaf | -0.50 | 0.33 | 0.83 |  |
| 101 | Pantheon | -0.50 | 0.26 | 0.76 |  |
| 102 | Thresh | -0.50 | 0.00 | 0.50 |  |
| 103 | Diana | -0.51 | 0.00 | 0.51 |  |
| 104 | Gnar | -0.54 | 0.00 | 0.54 |  |
| 105 | Rengar | -0.56 | 0.56 | 1.12 |  |
| 106 | Ivern | -0.58 | 0.00 | 0.58 |  |
| 107 | Malzahar | -0.60 | 0.35 | 0.95 |  |
| 108 | Riven | -0.60 | 0.00 | 0.60 |  |
| 109 | Orianna | -0.61 | 0.00 | 0.61 |  |
| 110 | Alistar | -0.63 | 0.27 | 0.90 |  |
| 111 | Cassiopeia | -0.63 | 0.00 | 0.63 |  |
| 112 | Vel'Koz | -0.65 | 0.00 | 0.65 |  |
| 113 | Sona | -0.66 | 0.00 | 0.66 |  |
| 114 | Jhin | -0.67 | 0.00 | 0.67 |  |
| 115 | Irelia | -0.68 | 0.00 | 0.68 |  |
| 116 | Sylas | -0.68 | 0.00 | 0.68 |  |
| 117 | Xerath | -0.68 | 0.00 | 0.68 |  |
| 118 | Mordekaiser | -0.69 | 0.09 | 0.78 |  |
| 119 | Aphelios | -0.69 | 0.07 | 0.76 |  |
| 120 | Twisted Fate | -0.69 | 0.00 | 0.69 |  |
| 121 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 122 | Volibear | -0.72 | 0.07 | 0.79 |  |
| 123 | Neeko | -0.72 | 0.00 | 0.72 |  |
| 124 | Renekton | -0.72 | 0.00 | 0.72 |  |
| 125 | Rammus | -0.73 | 0.38 | 1.11 |  |
| 126 | Yorick | -0.73 | 0.00 | 0.73 |  |
| 127 | Aurelion Sol | -0.76 | 0.00 | 0.76 |  |
| 128 | Galio | -0.77 | 0.00 | 0.77 |  |
| 129 | Rakan | -0.77 | 0.00 | 0.77 |  |
| 130 | Darius | -0.78 | 0.00 | 0.78 |  |
| 131 | Trundle | -0.78 | 0.00 | 0.78 |  |
| 132 | Shyvana | -0.80 | 0.07 | 0.87 |  |
| 133 | Renata Glasc | -0.80 | 0.00 | 0.80 |  |
| 134 | Singed | -0.81 | 0.33 | 1.14 |  |
| 135 | Lee Sin | -0.81 | 0.00 | 0.81 |  |
| 136 | Naafiri | -0.81 | 0.00 | 0.81 |  |
| 137 | Seraphine | -0.81 | 0.00 | 0.81 |  |
| 138 | Shen | -0.83 | 0.39 | 1.22 |  |
| 139 | Viego | -0.84 | 0.07 | 0.91 |  |
| 140 | Dr. Mundo | -0.84 | 0.00 | 0.84 |  |
| 141 | Fiddlesticks | -0.84 | 0.00 | 0.84 |  |
| 142 | Taliyah | -0.85 | 0.00 | 0.85 |  |
| 143 | Yone | -0.86 | 0.07 | 0.93 |  |
| 144 | Xin Zhao | -0.87 | 0.16 | 1.03 |  |
| 145 | Rumble | -0.88 | 0.00 | 0.88 |  |
| 146 | Urgot | -0.88 | 0.00 | 0.88 |  |
| 147 | Lillia | -0.89 | 0.00 | 0.89 |  |
| 148 | Rell | -0.89 | 0.00 | 0.89 |  |
| 149 | Warwick | -0.90 | 0.41 | 1.31 |  |
| 150 | Pyke | -0.91 | 0.00 | 0.91 |  |
| 151 | Taric | -0.92 | 0.16 | 1.08 |  |
| 152 | Cho'Gath | -0.93 | 0.00 | 0.93 |  |
| 153 | K'Sante | -0.97 | 0.14 | 1.11 |  |
| 154 | Hecarim | -0.98 | 0.07 | 1.05 |  |
| 155 | Poppy | -1.00 | 0.00 | 1.00 |  |
| 156 | Gragas | -1.05 | 0.00 | 1.05 |  |
| 157 | Qiyana | -1.05 | 0.00 | 1.05 |  |
| 158 | Briar | -1.06 | 0.00 | 1.06 |  |
| 159 | Sion | -1.08 | 0.35 | 1.43 |  |
| 160 | Nautilus | -1.08 | 0.00 | 1.08 |  |
| 161 | Ornn | -1.09 | 0.07 | 1.16 |  |
| 162 | Ambessa | -1.10 | 0.00 | 1.10 |  |
| 163 | Leona | -1.10 | 0.00 | 1.10 |  |
| 164 | Sejuani | -1.10 | 0.00 | 1.10 |  |
| 165 | Sett | -1.11 | 0.07 | 1.18 |  |
| 166 | Blitzcrank | -1.18 | 0.00 | 1.18 |  |
| 167 | Amumu | -1.21 | 0.00 | 1.21 |  |
| 168 | Skarner | -1.28 | 0.09 | 1.37 |  |
| 169 | Vi | -1.36 | 0.07 | 1.43 |  |
| 170 | Zac | -1.39 | 0.00 | 1.39 |  |
| 171 | Tahm Kench | -1.50 | 0.00 | 1.50 |  |
| 172 | Nunu & Willump | -1.52 | 0.20 | 1.72 |  |
