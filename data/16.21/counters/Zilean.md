# Counters to Zilean (patch 26.21)

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

### 3. Samira (net +0.56)

- **0.43** projectile block: Blade Whirl blocks Zilean's Time Bomb, a projectile. Blade Whirl for 0.75 s; Time Bomb takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Zilean Q Time Bomb)
- **0.27** projectile block: Blade Whirl blocks Zilean's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Zilean basic attacks)

### 4. Mel (net +0.54)

- **0.41** projectile block: Rebuttal blocks Zilean's Time Bomb, a projectile. Rebuttal for 0.75 s; Time Bomb takes 0.25 s to land, enough to react. (Mel W Rebuttal → Zilean Q Time Bomb)
- **0.27** projectile block: Rebuttal blocks Zilean's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Zilean basic attacks)

### 5. Nocturne (net +0.47)

- **0.56** spell shield: Shroud of Darkness's spell shield blocks Zilean's Time Bomb. Spell shield for 1.5 s, long enough to use ahead of Time Bomb. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Zilean Q Time Bomb)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Zilean's Time Warp. Spell shield for 1.5 s, long enough to use ahead of Time Warp. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Zilean E Time Warp)
- Watch out: Zilean's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 6. Yasuo (net +0.46)

- **0.48** projectile block: Wind Wall blocks Zilean's Time Bomb, a projectile. Wind Wall for 4 s, long enough to use ahead of Time Bomb. (Yasuo W Wind Wall → Zilean Q Time Bomb)
- **0.35** projectile block: Wind Wall blocks Zilean's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Zilean basic attacks)
- Watch out: Zilean's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 7. Udyr (net +0.44)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Zilean's Time Bomb (stun). Immune for 1.5 s, long enough to use ahead of Time Bomb. (Udyr E Blazing Stampede → Zilean Q Time Bomb)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Zilean's Time Warp (slow). Immune for 1.5 s, long enough to use ahead of Time Warp. (Udyr E Blazing Stampede → Zilean E Time Warp)
- Watch out: Zilean's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range).

### 8. Teemo (net +0.43)

- **0.43** blind: Blinding Dart's blind makes Zilean's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Zilean basic attacks)

### 9. Fiora (net +0.42)

- **0.59** parry: Riposte parries Zilean's Time Bomb and stuns back. Parry for 0.75 s; Time Bomb takes 0.25 s to land, enough to react. Negating Time Bomb's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Zilean Q Time Bomb)
- **0.26** parry: Riposte parries Zilean's Time Warp. Parry for 0.75 s; Time Warp lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Zilean E Time Warp)
- **0.08** attack speed slow: Riposte cuts Zilean's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Zilean basic attacks)
- Watch out: Zilean's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### 10. Morgana (net +0.39)

- **0.49** cc immunity: Black Shield makes Morgana immune to Zilean's Time Bomb (stun). Immune for 5 s, long enough to use ahead of Time Bomb. (Morgana E Black Shield → Zilean Q Time Bomb)
- **0.11** cc immunity: Black Shield makes Morgana immune to Zilean's Time Warp (slow). Immune for 5 s, long enough to use ahead of Time Warp. (Morgana E Black Shield → Zilean E Time Warp)
- Watch out: Zilean's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.68 | 0.68 | 0.00 |  |
| 2 | Braum | +0.61 | 0.93 | 0.32 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 3 | Samira | +0.56 | 0.56 | 0.00 | projectile block (Blade Whirl) |
| 4 | Mel | +0.54 | 0.54 | 0.00 | projectile block (Rebuttal) |
| 5 | Nocturne | +0.47 | 0.79 | 0.32 |  |
| 6 | Yasuo | +0.46 | 0.66 | 0.20 | projectile block (Wind Wall) |
| 7 | Udyr | +0.44 | 0.76 | 0.32 |  |
| 8 | Teemo | +0.43 | 0.43 | 0.00 | blind (Blinding Dart) |
| 9 | Fiora | +0.42 | 0.74 | 0.32 |  |
| 10 | Morgana | +0.39 | 0.55 | 0.16 |  |
| 11 | Milio | +0.35 | 0.35 | 0.00 |  |
| 12 | Fizz | +0.34 | 0.49 | 0.15 |  |
| 13 | Bard | +0.31 | 0.31 | 0.00 |  |
| 14 | Lissandra | +0.31 | 0.31 | 0.00 |  |
| 15 | Vladimir | +0.30 | 0.55 | 0.25 |  |
| 16 | Kayle | +0.30 | 0.30 | 0.00 |  |
| 17 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 18 | Xayah | +0.30 | 0.30 | 0.00 |  |
| 19 | Kalista | +0.27 | 0.27 | 0.00 |  |
| 20 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 21 | Aurora | +0.23 | 0.23 | 0.00 |  |
| 22 | Kled | +0.21 | 0.33 | 0.12 |  |
| 23 | Zaahen | +0.14 | 0.34 | 0.20 |  |
| 24 | Maokai | +0.13 | 0.45 | 0.32 |  |
| 25 | Rek'Sai | +0.11 | 0.31 | 0.20 |  |
| 26 | Varus | +0.11 | 0.22 | 0.11 |  |
| 27 | Annie | +0.08 | 0.08 | 0.00 |  |
| 28 | Camille | +0.07 | 0.23 | 0.16 |  |
| 29 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 30 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 31 | Gwen | +0.04 | 0.36 | 0.32 |  |
| 32 | Nilah | +0.04 | 0.30 | 0.26 |  |
| 33 | Jax | +0.03 | 0.35 | 0.32 |  |
| 34 | Evelynn | +0.01 | 0.23 | 0.22 |  |
| 35 | Shaco | +0.01 | 0.23 | 0.22 |  |
| 36 | Zed | +0.01 | 0.23 | 0.22 |  |
| 37 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 38 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 39 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 40 | Azir | 0.00 | 0.00 | 0.00 |  |
| 41 | Brand | 0.00 | 0.00 | 0.00 |  |
| 42 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 43 | Corki | 0.00 | 0.00 | 0.00 |  |
| 44 | Elise | 0.00 | 0.00 | 0.00 |  |
| 45 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 46 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 47 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 48 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 49 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 50 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 51 | Karma | 0.00 | 0.00 | 0.00 |  |
| 52 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 53 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 54 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 55 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 56 | Lux | 0.00 | 0.00 | 0.00 |  |
| 57 | Nami | 0.00 | 0.00 | 0.00 |  |
| 58 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 59 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 60 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 61 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 62 | Senna | 0.00 | 0.00 | 0.00 |  |
| 63 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 64 | Sona | 0.00 | 0.00 | 0.00 |  |
| 65 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 66 | Swain | 0.00 | 0.00 | 0.00 |  |
| 67 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 68 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 69 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 70 | Vex | 0.00 | 0.00 | 0.00 |  |
| 71 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 72 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 73 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 74 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 75 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 76 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 77 | Malzahar | -0.02 | 0.38 | 0.40 |  |
| 78 | Yuumi | -0.03 | 0.49 | 0.52 |  |
| 79 | Alistar | -0.03 | 0.29 | 0.32 |  |
| 80 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 81 | Graves | -0.07 | 0.00 | 0.07 |  |
| 82 | Master Yi | -0.10 | 0.43 | 0.53 |  |
| 83 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 84 | Rengar | -0.11 | 0.54 | 0.65 |  |
| 85 | Malphite | -0.11 | 0.21 | 0.32 |  |
| 86 | Xin Zhao | -0.14 | 0.16 | 0.30 |  |
| 87 | Rakan | -0.14 | 0.00 | 0.14 |  |
| 88 | Jarvan IV | -0.15 | 0.00 | 0.15 |  |
| 89 | Sylas | -0.15 | 0.00 | 0.15 |  |
| 90 | Yone | -0.15 | 0.00 | 0.15 |  |
| 91 | Briar | -0.16 | 0.00 | 0.16 |  |
| 92 | K'Sante | -0.16 | 0.00 | 0.16 |  |
| 93 | Urgot | -0.16 | 0.00 | 0.16 |  |
| 94 | Gangplank | -0.18 | 0.47 | 0.65 |  |
| 95 | Lillia | -0.18 | 0.00 | 0.18 |  |
| 96 | Smolder | -0.19 | 0.00 | 0.19 |  |
| 97 | Hecarim | -0.20 | 0.00 | 0.20 |  |
| 98 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 99 | Ornn | -0.20 | 0.00 | 0.20 |  |
| 100 | Quinn | -0.20 | 0.00 | 0.20 |  |
| 101 | Rell | -0.20 | 0.00 | 0.20 |  |
| 102 | Ivern | -0.21 | 0.00 | 0.21 |  |
| 103 | Akali | -0.22 | 0.00 | 0.22 |  |
| 104 | Ambessa | -0.22 | 0.00 | 0.22 |  |
| 105 | Bel'Veth | -0.22 | 0.00 | 0.22 |  |
| 106 | Ekko | -0.22 | 0.00 | 0.22 |  |
| 107 | Lee Sin | -0.22 | 0.00 | 0.22 |  |
| 108 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 109 | Riven | -0.22 | 0.00 | 0.22 |  |
| 110 | Talon | -0.22 | 0.00 | 0.22 |  |
| 111 | Volibear | -0.22 | 0.00 | 0.22 |  |
| 112 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 113 | Aurelion Sol | -0.28 | 0.00 | 0.28 |  |
| 114 | Irelia | -0.28 | 0.00 | 0.28 |  |
| 115 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 116 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 117 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 118 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 119 | Olaf | -0.30 | 0.35 | 0.65 |  |
| 120 | Rammus | -0.30 | 0.32 | 0.62 |  |
| 121 | Aatrox | -0.30 | 0.00 | 0.30 |  |
| 122 | Nautilus | -0.30 | 0.00 | 0.30 |  |
| 123 | Tryndamere | -0.30 | 0.00 | 0.30 |  |
| 124 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 125 | Singed | -0.32 | 0.33 | 0.65 |  |
| 126 | Garen | -0.32 | 0.29 | 0.61 |  |
| 127 | Amumu | -0.32 | 0.00 | 0.32 |  |
| 128 | Diana | -0.32 | 0.00 | 0.32 |  |
| 129 | Illaoi | -0.32 | 0.00 | 0.32 |  |
| 130 | Kassadin | -0.32 | 0.00 | 0.32 |  |
| 131 | Kha'Zix | -0.32 | 0.00 | 0.32 |  |
| 132 | Leona | -0.32 | 0.00 | 0.32 |  |
| 133 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 134 | Sejuani | -0.32 | 0.00 | 0.32 |  |
| 135 | Sett | -0.32 | 0.00 | 0.32 |  |
| 136 | Shyvana | -0.32 | 0.00 | 0.32 |  |
| 137 | Xerath | -0.33 | 0.00 | 0.33 |  |
| 138 | Shen | -0.34 | 0.33 | 0.67 |  |
| 139 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 140 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 141 | Katarina | -0.38 | 0.22 | 0.60 |  |
| 142 | Sion | -0.39 | 0.37 | 0.76 |  |
| 143 | Viego | -0.39 | 0.00 | 0.39 |  |
| 144 | Janna | -0.40 | 0.00 | 0.40 |  |
| 145 | Kayn | -0.42 | 0.23 | 0.65 |  |
| 146 | Draven | -0.44 | 0.00 | 0.44 |  |
| 147 | Karthus | -0.44 | 0.00 | 0.44 |  |
| 148 | Syndra | -0.44 | 0.00 | 0.44 |  |
| 149 | Fiddlesticks | -0.47 | 0.00 | 0.47 |  |
| 150 | Pantheon | -0.48 | 0.23 | 0.71 |  |
| 151 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 152 | Gragas | -0.49 | 0.00 | 0.49 |  |
| 153 | Poppy | -0.52 | 0.00 | 0.52 |  |
| 154 | Mordekaiser | -0.53 | 0.08 | 0.61 |  |
| 155 | Warwick | -0.54 | 0.35 | 0.89 |  |
| 156 | Skarner | -0.59 | 0.06 | 0.65 |  |
| 157 | Darius | -0.61 | 0.00 | 0.61 |  |
| 158 | Naafiri | -0.61 | 0.00 | 0.61 |  |
| 159 | Trundle | -0.61 | 0.00 | 0.61 |  |
| 160 | Yorick | -0.61 | 0.00 | 0.61 |  |
| 161 | Blitzcrank | -0.65 | 0.00 | 0.65 |  |
| 162 | Cho'Gath | -0.65 | 0.00 | 0.65 |  |
| 163 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 164 | Rumble | -0.65 | 0.00 | 0.65 |  |
| 165 | Taric | -0.65 | 0.00 | 0.65 |  |
| 166 | Vi | -0.65 | 0.00 | 0.65 |  |
| 167 | Locke | -0.76 | 0.00 | 0.76 |  |
| 168 | Tahm Kench | -0.80 | 0.00 | 0.80 |  |
| 169 | Zac | -0.80 | 0.00 | 0.80 |  |
| 170 | Galio | -0.81 | 0.00 | 0.81 |  |
| 171 | Nunu & Willump | -1.00 | 0.14 | 1.14 |  |
| 172 | Pyke | -1.12 | 0.00 | 1.12 |  |
