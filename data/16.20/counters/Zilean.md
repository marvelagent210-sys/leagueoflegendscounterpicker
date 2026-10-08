# Counters to Zilean (patch 26.20)

Every champion ranked by what its kit does against Zilean's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zilean's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zilean` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +0.68)

- **0.47** spell shield: Spell Shield's spell shield blocks Zilean's Time Bomb. Spell shield for 1.5 s, long enough to use ahead of Time Bomb. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Zilean Q Time Bomb)
- **0.41** spell shield: Spell Shield's spell shield blocks Zilean's Time Warp. Spell shield for 1.5 s, long enough to use ahead of Time Warp. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Zilean E Time Warp)

### 2. Braum (net +0.61)

- **0.70** projectile block: Unbreakable blocks Zilean's Time Bomb, a projectile. Unbreakable for 4 s, long enough to use ahead of Time Bomb. (Braum E Unbreakable → Zilean Q Time Bomb)
- **0.45** projectile block: Unbreakable blocks Zilean's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Zilean basic attacks)
- Watch out: Zilean's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 3. Elise (net +0.59)

- **0.47** untargetable: Rappel makes Elise untargetable, dodging Zilean's Time Bomb. Untargetable for 0.6 s; Time Bomb takes 0.25 s to land, enough to react. (Elise E Rappel → Zilean Q Time Bomb)
- **0.24** untargetable: Rappel makes Elise untargetable, dodging Zilean's Time Warp. Untargetable for 0.6 s; Time Warp lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Zilean E Time Warp)

### 4. Samira (net +0.56)

- **0.43** projectile block: Blade Whirl blocks Zilean's Time Bomb, a projectile. Blade Whirl for 0.75 s; Time Bomb takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Zilean Q Time Bomb)
- **0.27** projectile block: Blade Whirl blocks Zilean's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Zilean basic attacks)

### 5. Mel (net +0.54)

- **0.41** projectile block: Rebuttal blocks Zilean's Time Bomb, a projectile. Rebuttal for 0.75 s; Time Bomb takes 0.25 s to land, enough to react. (Mel W Rebuttal → Zilean Q Time Bomb)
- **0.27** projectile block: Rebuttal blocks Zilean's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Zilean basic attacks)

### 6. Nocturne (net +0.47)

- **0.56** spell shield: Shroud of Darkness's spell shield blocks Zilean's Time Bomb. Spell shield for 1.5 s, long enough to use ahead of Time Bomb. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Zilean Q Time Bomb)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Zilean's Time Warp. Spell shield for 1.5 s, long enough to use ahead of Time Warp. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Zilean E Time Warp)
- Watch out: Zilean's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 7. Vladimir (net +0.46)

- **0.49** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zilean's Time Bomb. Untargetable for 2 s, long enough to use ahead of Time Bomb. (Vladimir W Sanguine Pool → Zilean Q Time Bomb)
- **0.43** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zilean's Time Warp. Untargetable for 2 s, long enough to use ahead of Time Warp. (Vladimir W Sanguine Pool → Zilean E Time Warp)
- Watch out: Zilean's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 8. Yasuo (net +0.46)

- **0.48** projectile block: Wind Wall blocks Zilean's Time Bomb, a projectile. Wind Wall for 4 s, long enough to use ahead of Time Bomb. (Yasuo W Wind Wall → Zilean Q Time Bomb)
- **0.35** projectile block: Wind Wall blocks Zilean's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Zilean basic attacks)
- Watch out: Zilean's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 9. Maokai (net +0.44)

- **0.62** untargetable: Twisted Advance makes Maokai untargetable, dodging Zilean's Time Bomb. Untargetable for 1.4 s; Time Bomb takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Zilean Q Time Bomb)
- **0.27** untargetable: Twisted Advance makes Maokai untargetable, dodging Zilean's Time Warp. Untargetable for 1.4 s; Time Warp lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Zilean E Time Warp)
- Watch out: Zilean's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 10. Udyr (net +0.44)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Zilean's Time Bomb (stun). Immune for 1.5 s, long enough to use ahead of Time Bomb. (Udyr E Blazing Stampede → Zilean Q Time Bomb)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Zilean's Time Warp (slow). Immune for 1.5 s, long enough to use ahead of Time Warp. (Udyr E Blazing Stampede → Zilean E Time Warp)
- Watch out: Zilean's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.68 | 0.68 | 0.00 |  |
| 2 | Braum | +0.61 | 0.93 | 0.32 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 3 | Elise | +0.59 | 0.59 | 0.00 |  |
| 4 | Samira | +0.56 | 0.56 | 0.00 | projectile block (Blade Whirl) |
| 5 | Mel | +0.54 | 0.54 | 0.00 | projectile block (Rebuttal) |
| 6 | Nocturne | +0.47 | 0.79 | 0.32 |  |
| 7 | Vladimir | +0.46 | 0.71 | 0.25 |  |
| 8 | Yasuo | +0.46 | 0.66 | 0.20 | projectile block (Wind Wall) |
| 9 | Maokai | +0.44 | 0.76 | 0.32 |  |
| 10 | Udyr | +0.44 | 0.76 | 0.32 |  |
| 11 | Bard | +0.44 | 0.44 | 0.00 |  |
| 12 | Lissandra | +0.44 | 0.44 | 0.00 |  |
| 13 | Teemo | +0.43 | 0.43 | 0.00 | blind (Blinding Dart) |
| 14 | Fiora | +0.42 | 0.74 | 0.32 |  |
| 15 | Xayah | +0.42 | 0.42 | 0.00 |  |
| 16 | Morgana | +0.39 | 0.55 | 0.16 |  |
| 17 | Aurora | +0.38 | 0.38 | 0.00 |  |
| 18 | Milio | +0.35 | 0.35 | 0.00 |  |
| 19 | Yuumi | +0.32 | 0.84 | 0.52 |  |
| 20 | Kayle | +0.30 | 0.30 | 0.00 |  |
| 21 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 22 | Gwen | +0.27 | 0.59 | 0.32 |  |
| 23 | Kalista | +0.27 | 0.27 | 0.00 |  |
| 24 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 25 | Rek'Sai | +0.24 | 0.44 | 0.20 |  |
| 26 | Camille | +0.23 | 0.39 | 0.16 |  |
| 27 | Ekko | +0.21 | 0.43 | 0.22 |  |
| 28 | Kled | +0.21 | 0.33 | 0.12 |  |
| 29 | Evelynn | +0.17 | 0.39 | 0.22 |  |
| 30 | Shaco | +0.17 | 0.39 | 0.22 |  |
| 31 | Zed | +0.16 | 0.38 | 0.22 |  |
| 32 | Kindred | +0.15 | 0.15 | 0.00 |  |
| 33 | Master Yi | +0.14 | 0.67 | 0.53 |  |
| 34 | Zaahen | +0.14 | 0.34 | 0.20 |  |
| 35 | Varus | +0.11 | 0.22 | 0.11 |  |
| 36 | Annie | +0.08 | 0.08 | 0.00 |  |
| 37 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 38 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 39 | Nilah | +0.04 | 0.30 | 0.26 |  |
| 40 | Jax | +0.03 | 0.35 | 0.32 |  |
| 41 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 42 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 43 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 44 | Azir | 0.00 | 0.00 | 0.00 |  |
| 45 | Brand | 0.00 | 0.00 | 0.00 |  |
| 46 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 47 | Corki | 0.00 | 0.00 | 0.00 |  |
| 48 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 49 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 50 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 51 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 52 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 53 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 54 | Karma | 0.00 | 0.00 | 0.00 |  |
| 55 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 56 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 57 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 58 | Lux | 0.00 | 0.00 | 0.00 |  |
| 59 | Nami | 0.00 | 0.00 | 0.00 |  |
| 60 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 61 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 62 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 63 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 64 | Senna | 0.00 | 0.00 | 0.00 |  |
| 65 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 66 | Sona | 0.00 | 0.00 | 0.00 |  |
| 67 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 68 | Swain | 0.00 | 0.00 | 0.00 |  |
| 69 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 70 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 71 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 72 | Vex | 0.00 | 0.00 | 0.00 |  |
| 73 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 74 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 75 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 76 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 77 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 78 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 79 | Malzahar | -0.02 | 0.38 | 0.40 |  |
| 80 | Alistar | -0.03 | 0.29 | 0.32 |  |
| 81 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 82 | Graves | -0.07 | 0.00 | 0.07 |  |
| 83 | Pantheon | -0.08 | 0.23 | 0.31 |  |
| 84 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 85 | Rengar | -0.11 | 0.54 | 0.65 |  |
| 86 | Malphite | -0.11 | 0.21 | 0.32 |  |
| 87 | Xin Zhao | -0.14 | 0.16 | 0.30 |  |
| 88 | Rakan | -0.14 | 0.00 | 0.14 |  |
| 89 | Fizz | -0.15 | 0.00 | 0.15 |  |
| 90 | Jarvan IV | -0.15 | 0.00 | 0.15 |  |
| 91 | Sylas | -0.15 | 0.00 | 0.15 |  |
| 92 | Yone | -0.15 | 0.00 | 0.15 |  |
| 93 | Briar | -0.16 | 0.00 | 0.16 |  |
| 94 | K'Sante | -0.16 | 0.00 | 0.16 |  |
| 95 | Urgot | -0.16 | 0.00 | 0.16 |  |
| 96 | Gangplank | -0.18 | 0.47 | 0.65 |  |
| 97 | Lillia | -0.18 | 0.00 | 0.18 |  |
| 98 | Smolder | -0.19 | 0.00 | 0.19 |  |
| 99 | Hecarim | -0.20 | 0.00 | 0.20 |  |
| 100 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 101 | Ornn | -0.20 | 0.00 | 0.20 |  |
| 102 | Quinn | -0.20 | 0.00 | 0.20 |  |
| 103 | Rell | -0.20 | 0.00 | 0.20 |  |
| 104 | Warwick | -0.21 | 0.35 | 0.56 |  |
| 105 | Ivern | -0.21 | 0.00 | 0.21 |  |
| 106 | Akali | -0.22 | 0.00 | 0.22 |  |
| 107 | Ambessa | -0.22 | 0.00 | 0.22 |  |
| 108 | Bel'Veth | -0.22 | 0.00 | 0.22 |  |
| 109 | Lee Sin | -0.22 | 0.00 | 0.22 |  |
| 110 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 111 | Riven | -0.22 | 0.00 | 0.22 |  |
| 112 | Talon | -0.22 | 0.00 | 0.22 |  |
| 113 | Volibear | -0.22 | 0.00 | 0.22 |  |
| 114 | Kayn | -0.26 | 0.39 | 0.65 |  |
| 115 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 116 | Aurelion Sol | -0.28 | 0.00 | 0.28 |  |
| 117 | Irelia | -0.28 | 0.00 | 0.28 |  |
| 118 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 119 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 120 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 121 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 122 | Olaf | -0.30 | 0.35 | 0.65 |  |
| 123 | Rammus | -0.30 | 0.32 | 0.62 |  |
| 124 | Aatrox | -0.30 | 0.00 | 0.30 |  |
| 125 | Nautilus | -0.30 | 0.00 | 0.30 |  |
| 126 | Tryndamere | -0.30 | 0.00 | 0.30 |  |
| 127 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 128 | Singed | -0.32 | 0.33 | 0.65 |  |
| 129 | Garen | -0.32 | 0.29 | 0.61 |  |
| 130 | Amumu | -0.32 | 0.00 | 0.32 |  |
| 131 | Diana | -0.32 | 0.00 | 0.32 |  |
| 132 | Illaoi | -0.32 | 0.00 | 0.32 |  |
| 133 | Kassadin | -0.32 | 0.00 | 0.32 |  |
| 134 | Kha'Zix | -0.32 | 0.00 | 0.32 |  |
| 135 | Leona | -0.32 | 0.00 | 0.32 |  |
| 136 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 137 | Sejuani | -0.32 | 0.00 | 0.32 |  |
| 138 | Sett | -0.32 | 0.00 | 0.32 |  |
| 139 | Shyvana | -0.32 | 0.00 | 0.32 |  |
| 140 | Xerath | -0.33 | 0.00 | 0.33 |  |
| 141 | Shen | -0.34 | 0.33 | 0.67 |  |
| 142 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 143 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 144 | Katarina | -0.38 | 0.22 | 0.60 |  |
| 145 | Sion | -0.39 | 0.37 | 0.76 |  |
| 146 | Viego | -0.39 | 0.00 | 0.39 |  |
| 147 | Galio | -0.40 | 0.00 | 0.40 |  |
| 148 | Janna | -0.40 | 0.00 | 0.40 |  |
| 149 | Draven | -0.44 | 0.00 | 0.44 |  |
| 150 | Karthus | -0.44 | 0.00 | 0.44 |  |
| 151 | Syndra | -0.44 | 0.00 | 0.44 |  |
| 152 | Fiddlesticks | -0.47 | 0.00 | 0.47 |  |
| 153 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 154 | Gragas | -0.49 | 0.00 | 0.49 |  |
| 155 | Taric | -0.50 | 0.15 | 0.65 |  |
| 156 | Poppy | -0.52 | 0.00 | 0.52 |  |
| 157 | Mordekaiser | -0.53 | 0.08 | 0.61 |  |
| 158 | Skarner | -0.59 | 0.06 | 0.65 |  |
| 159 | Darius | -0.61 | 0.00 | 0.61 |  |
| 160 | Naafiri | -0.61 | 0.00 | 0.61 |  |
| 161 | Trundle | -0.61 | 0.00 | 0.61 |  |
| 162 | Yorick | -0.61 | 0.00 | 0.61 |  |
| 163 | Blitzcrank | -0.65 | 0.00 | 0.65 |  |
| 164 | Cho'Gath | -0.65 | 0.00 | 0.65 |  |
| 165 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 166 | Rumble | -0.65 | 0.00 | 0.65 |  |
| 167 | Vi | -0.65 | 0.00 | 0.65 |  |
| 168 | Locke | -0.76 | 0.00 | 0.76 |  |
| 169 | Tahm Kench | -0.80 | 0.00 | 0.80 |  |
| 170 | Zac | -0.80 | 0.00 | 0.80 |  |
| 171 | Nunu & Willump | -1.00 | 0.14 | 1.14 |  |
| 172 | Pyke | -1.12 | 0.00 | 1.12 |  |
