# Counters to Vex (patch 26.20)

Every champion ranked by what its kit does against Vex's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Vex's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Vex` for the full ledger of a matchup, with sources.

## Top 10

### 1. Mel (net +0.95)

- **0.70** projectile block: Rebuttal blocks Vex's Shadow Surge, a projectile. Rebuttal for 0.75 s; Shadow Surge takes 2.13 s to land, enough to react. (Mel W Rebuttal → Vex R Shadow Surge)
- **0.30** projectile block: Rebuttal blocks Vex's Looming Darkness, a projectile. Rebuttal for 0.75 s; Looming Darkness takes 0.87 s to land, enough to react. (Mel W Rebuttal → Vex E Looming Darkness)
- **0.27** projectile block: Rebuttal blocks Vex's Mistral Bolt, a projectile. Rebuttal for 0.75 s; Mistral Bolt takes 2.15 s to land, enough to react. (Mel W Rebuttal → Vex Q Mistral Bolt)

### 2. Sivir (net +0.70)

- **0.70** spell shield: Spell Shield's spell shield blocks Vex's Shadow Surge. Spell shield for 1.5 s, long enough to use ahead of Shadow Surge. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Vex R Shadow Surge)

### 3. Xayah (net +0.70)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Vex's Shadow Surge. Untargetable for 1.5 s, long enough to use ahead of Shadow Surge. (Xayah R Featherstorm → Vex R Shadow Surge)

### 4. Lissandra (net +0.65)

- **0.70** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Vex's Shadow Surge. Untargetable for 2.5 s, long enough to use ahead of Shadow Surge. (Lissandra R Frozen Tomb → Vex R Shadow Surge)
- Watch out: Shadow Surge is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

### 5. Samira (net +0.52)

- **0.70** projectile block: Blade Whirl blocks Vex's Shadow Surge, a projectile. Blade Whirl for 0.75 s; Shadow Surge takes 2.13 s to land, enough to react. (Samira W Blade Whirl → Vex R Shadow Surge)
- **0.33** projectile block: Blade Whirl blocks Vex's Looming Darkness, a projectile. Blade Whirl for 0.75 s; Looming Darkness takes 0.87 s to land, enough to react. (Samira W Blade Whirl → Vex E Looming Darkness)
- **0.28** projectile block: Blade Whirl blocks Vex's Mistral Bolt, a projectile. Blade Whirl for 0.75 s; Mistral Bolt takes 2.15 s to land, enough to react. (Samira W Blade Whirl → Vex Q Mistral Bolt)
- Watch out: Doom 'n Gloom's knockdown can stop Samira's Wild Rush mid-dash.

### 6. Zed (net +0.52)

- **0.70** untargetable: Death Mark makes Zed untargetable, dodging Vex's Shadow Surge. Untargetable for 0.6 s; Shadow Surge takes 2.13 s to land, enough to react. (Zed R Death Mark → Vex R Shadow Surge)
- Watch out: Vex's basic attacks reach 425 units farther than Zed's (550 vs 125 attack range).

### 7. Vladimir (net +0.50)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Vex's Shadow Surge. Untargetable for 2 s, long enough to use ahead of Shadow Surge. (Vladimir W Sanguine Pool → Vex R Shadow Surge)
- Watch out: Vex's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 8. Morgana (net +0.47)

- **0.55** cc immunity: Black Shield makes Morgana immune to Vex's Doom 'n Gloom (fear, knockdown, slow). Immune for 5 s, long enough to use ahead of Doom 'n Gloom. (Morgana E Black Shield → Vex I Doom 'n Gloom)
- **0.10** cc immunity: Black Shield makes Morgana immune to Vex's Looming Darkness (slow). Immune for 5 s, long enough to use ahead of Looming Darkness. (Morgana E Black Shield → Vex E Looming Darkness)
- Watch out: Vex's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

### 9. Nocturne (net +0.46)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Vex's Shadow Surge. Spell shield for 1.5 s, long enough to use ahead of Shadow Surge. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Vex R Shadow Surge)
- **0.03** cc immunity: Paranoia is displacement immune, ignoring Vex's Doom 'n Gloom (knockdown) during it. Only during Paranoia. (Nocturne R Paranoia → Vex I Doom 'n Gloom)
- Watch out: Vex's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 10. Braum (net +0.44)

- **0.70** projectile block: Unbreakable blocks Vex's Shadow Surge, a projectile. Unbreakable for 4 s, long enough to use ahead of Shadow Surge. (Braum E Unbreakable → Vex R Shadow Surge)
- **0.45** projectile block: Unbreakable blocks Vex's Looming Darkness, a projectile. Unbreakable for 4 s, long enough to use ahead of Looming Darkness. (Braum E Unbreakable → Vex E Looming Darkness)
- **0.39** projectile block: Unbreakable blocks Vex's Mistral Bolt, a projectile. Unbreakable for 4 s, long enough to use ahead of Mistral Bolt. (Braum E Unbreakable → Vex Q Mistral Bolt)
- Watch out: Doom 'n Gloom's knockdown can stop Braum's Stand Behind Me mid-dash.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Mel | +0.95 | 0.95 | 0.00 | projectile block (Rebuttal) |
| 2 | Sivir | +0.70 | 0.70 | 0.00 |  |
| 3 | Xayah | +0.70 | 0.70 | 0.00 |  |
| 4 | Lissandra | +0.65 | 0.70 | 0.05 |  |
| 5 | Samira | +0.52 | 0.96 | 0.44 | projectile block (Blade Whirl) |
| 6 | Zed | +0.52 | 0.70 | 0.18 |  |
| 7 | Vladimir | +0.50 | 0.70 | 0.20 |  |
| 8 | Morgana | +0.47 | 0.60 | 0.13 |  |
| 9 | Nocturne | +0.46 | 0.73 | 0.27 |  |
| 10 | Braum | +0.44 | 1.07 | 0.63 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 11 | Kayle | +0.42 | 0.42 | 0.00 |  |
| 12 | Master Yi | +0.39 | 0.81 | 0.42 |  |
| 13 | Yasuo | +0.37 | 1.00 | 0.63 | projectile block (Wind Wall) |
| 14 | Maokai | +0.36 | 0.70 | 0.34 |  |
| 15 | Udyr | +0.34 | 0.61 | 0.27 |  |
| 16 | Bard | +0.32 | 0.70 | 0.38 |  |
| 17 | Shaco | +0.32 | 0.70 | 0.38 |  |
| 18 | Teemo | +0.27 | 0.35 | 0.08 |  |
| 19 | Yuumi | +0.23 | 0.70 | 0.47 |  |
| 20 | Milio | +0.23 | 0.30 | 0.07 |  |
| 21 | Fiora | +0.21 | 0.73 | 0.52 |  |
| 22 | Lulu | +0.17 | 0.25 | 0.08 |  |
| 23 | Cassiopeia | +0.17 | 0.17 | 0.00 |  |
| 24 | Aurora | +0.15 | 0.72 | 0.57 |  |
| 25 | Evelynn | +0.13 | 0.70 | 0.57 |  |
| 26 | Gwen | +0.10 | 0.70 | 0.60 |  |
| 27 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 28 | Heimerdinger | +0.09 | 0.09 | 0.00 |  |
| 29 | Fizz | +0.06 | 0.70 | 0.64 |  |
| 30 | Annie | +0.04 | 0.04 | 0.00 |  |
| 31 | Rek'Sai | +0.02 | 0.72 | 0.70 |  |
| 32 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 33 | Brand | 0.00 | 0.00 | 0.00 |  |
| 34 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 35 | Karma | 0.00 | 0.00 | 0.00 |  |
| 36 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 37 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 38 | Lux | 0.00 | 0.00 | 0.00 |  |
| 39 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 40 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 41 | Sona | 0.00 | 0.00 | 0.00 |  |
| 42 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 43 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 44 | Jinx | -0.04 | 0.00 | 0.04 |  |
| 45 | Veigar | -0.04 | 0.00 | 0.04 |  |
| 46 | Viktor | -0.04 | 0.00 | 0.04 |  |
| 47 | Gangplank | -0.05 | 0.48 | 0.53 |  |
| 48 | Draven | -0.07 | 0.00 | 0.07 |  |
| 49 | Hwei | -0.07 | 0.00 | 0.07 |  |
| 50 | Renata Glasc | -0.07 | 0.00 | 0.07 |  |
| 51 | Swain | -0.07 | 0.00 | 0.07 |  |
| 52 | Syndra | -0.07 | 0.00 | 0.07 |  |
| 53 | Zoe | -0.07 | 0.00 | 0.07 |  |
| 54 | Orianna | -0.08 | 0.00 | 0.08 |  |
| 55 | Varus | -0.10 | 0.00 | 0.10 |  |
| 56 | Kayn | -0.11 | 0.70 | 0.81 |  |
| 57 | Senna | -0.11 | 0.00 | 0.11 |  |
| 58 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 59 | Camille | -0.12 | 0.72 | 0.84 |  |
| 60 | Kalista | -0.13 | 0.23 | 0.36 |  |
| 61 | Malzahar | -0.14 | 0.31 | 0.45 |  |
| 62 | Anivia | -0.14 | 0.00 | 0.14 |  |
| 63 | Neeko | -0.15 | 0.00 | 0.15 |  |
| 64 | Zyra | -0.16 | 0.00 | 0.16 |  |
| 65 | Nami | -0.18 | 0.00 | 0.18 |  |
| 66 | Garen | -0.19 | 0.31 | 0.50 |  |
| 67 | Elise | -0.19 | 0.00 | 0.19 |  |
| 68 | Nidalee | -0.19 | 0.00 | 0.19 |  |
| 69 | Olaf | -0.21 | 0.32 | 0.53 |  |
| 70 | Tristana | -0.22 | 0.14 | 0.36 |  |
| 71 | Kindred | -0.22 | 0.00 | 0.22 |  |
| 72 | Yunara | -0.22 | 0.00 | 0.22 |  |
| 73 | Jax | -0.24 | 0.28 | 0.52 |  |
| 74 | Shyvana | -0.24 | 0.03 | 0.27 |  |
| 75 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 76 | Malphite | -0.26 | 0.21 | 0.47 |  |
| 77 | Corki | -0.26 | 0.00 | 0.26 |  |
| 78 | Jayce | -0.26 | 0.00 | 0.26 |  |
| 79 | Kassadin | -0.27 | 0.00 | 0.27 |  |
| 80 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 81 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 82 | Caitlyn | -0.30 | 0.09 | 0.39 |  |
| 83 | Zeri | -0.30 | 0.00 | 0.30 |  |
| 84 | Zaahen | -0.31 | 0.32 | 0.63 |  |
| 85 | Sett | -0.31 | 0.03 | 0.34 |  |
| 86 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 87 | Volibear | -0.34 | 0.03 | 0.37 |  |
| 88 | Rammus | -0.35 | 0.27 | 0.62 |  |
| 89 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 90 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 91 | Vayne | -0.35 | 0.00 | 0.35 |  |
| 92 | Vel'Koz | -0.35 | 0.00 | 0.35 |  |
| 93 | Illaoi | -0.36 | 0.03 | 0.39 |  |
| 94 | Sion | -0.39 | 0.34 | 0.73 |  |
| 95 | Mordekaiser | -0.39 | 0.25 | 0.64 |  |
| 96 | Nilah | -0.39 | 0.25 | 0.64 |  |
| 97 | Ahri | -0.39 | 0.00 | 0.39 |  |
| 98 | LeBlanc | -0.40 | 0.00 | 0.40 |  |
| 99 | Xin Zhao | -0.41 | 0.35 | 0.76 |  |
| 100 | Aurelion Sol | -0.41 | 0.00 | 0.41 |  |
| 101 | Karthus | -0.41 | 0.00 | 0.41 |  |
| 102 | Hecarim | -0.42 | 0.03 | 0.45 |  |
| 103 | Lucian | -0.42 | 0.00 | 0.42 |  |
| 104 | Rengar | -0.43 | 0.49 | 0.92 |  |
| 105 | Singed | -0.43 | 0.17 | 0.60 |  |
| 106 | Skarner | -0.43 | 0.10 | 0.53 |  |
| 107 | Ambessa | -0.43 | 0.00 | 0.43 |  |
| 108 | Fiddlesticks | -0.43 | 0.00 | 0.43 |  |
| 109 | Pantheon | -0.44 | 0.35 | 0.79 |  |
| 110 | Ivern | -0.44 | 0.00 | 0.44 |  |
| 111 | Alistar | -0.45 | 0.25 | 0.70 |  |
| 112 | Ekko | -0.45 | 0.00 | 0.45 |  |
| 113 | Kai'Sa | -0.46 | 0.00 | 0.46 |  |
| 114 | Lillia | -0.46 | 0.00 | 0.46 |  |
| 115 | Gnar | -0.47 | 0.00 | 0.47 |  |
| 116 | Irelia | -0.48 | 0.00 | 0.48 |  |
| 117 | Quinn | -0.48 | 0.00 | 0.48 |  |
| 118 | Kled | -0.50 | 0.30 | 0.80 |  |
| 119 | Warwick | -0.51 | 0.36 | 0.87 |  |
| 120 | Azir | -0.51 | 0.00 | 0.51 |  |
| 121 | Bel'Veth | -0.51 | 0.00 | 0.51 |  |
| 122 | K'Sante | -0.52 | 0.06 | 0.58 |  |
| 123 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 124 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 125 | Taric | -0.53 | 0.00 | 0.53 |  |
| 126 | Tryndamere | -0.53 | 0.00 | 0.53 |  |
| 127 | Ziggs | -0.53 | 0.00 | 0.53 |  |
| 128 | Graves | -0.54 | 0.00 | 0.54 |  |
| 129 | Akshan | -0.55 | 0.00 | 0.55 |  |
| 130 | Katarina | -0.55 | 0.00 | 0.55 |  |
| 131 | Thresh | -0.55 | 0.00 | 0.55 |  |
| 132 | Shen | -0.56 | 0.27 | 0.83 |  |
| 133 | Darius | -0.57 | 0.00 | 0.57 |  |
| 134 | Trundle | -0.57 | 0.00 | 0.57 |  |
| 135 | Leona | -0.58 | 0.00 | 0.58 |  |
| 136 | Locke | -0.58 | 0.00 | 0.58 |  |
| 137 | Renekton | -0.58 | 0.00 | 0.58 |  |
| 138 | Cho'Gath | -0.60 | 0.00 | 0.60 |  |
| 139 | Urgot | -0.61 | 0.00 | 0.61 |  |
| 140 | Yone | -0.63 | 0.03 | 0.66 |  |
| 141 | Janna | -0.63 | 0.00 | 0.63 |  |
| 142 | Briar | -0.64 | 0.00 | 0.64 |  |
| 143 | Yorick | -0.64 | 0.00 | 0.64 |  |
| 144 | Aatrox | -0.66 | 0.00 | 0.66 |  |
| 145 | Nautilus | -0.68 | 0.00 | 0.68 |  |
| 146 | Talon | -0.68 | 0.00 | 0.68 |  |
| 147 | Viego | -0.69 | 0.03 | 0.72 |  |
| 148 | Jarvan IV | -0.71 | 0.03 | 0.74 |  |
| 149 | Blitzcrank | -0.71 | 0.00 | 0.71 |  |
| 150 | Lee Sin | -0.71 | 0.00 | 0.71 |  |
| 151 | Diana | -0.72 | 0.00 | 0.72 |  |
| 152 | Amumu | -0.75 | 0.00 | 0.75 |  |
| 153 | Pyke | -0.80 | 0.00 | 0.80 |  |
| 154 | Qiyana | -0.81 | 0.00 | 0.81 |  |
| 155 | Kha'Zix | -0.82 | 0.00 | 0.82 |  |
| 156 | Sylas | -0.83 | 0.00 | 0.83 |  |
| 157 | Nunu & Willump | -0.86 | 0.20 | 1.06 |  |
| 158 | Vi | -0.87 | 0.03 | 0.90 |  |
| 159 | Naafiri | -0.87 | 0.00 | 0.87 |  |
| 160 | Rakan | -0.87 | 0.00 | 0.87 |  |
| 161 | Poppy | -0.88 | 0.00 | 0.88 |  |
| 162 | Akali | -0.89 | 0.00 | 0.89 |  |
| 163 | Rell | -0.89 | 0.00 | 0.89 |  |
| 164 | Tahm Kench | -0.91 | 0.00 | 0.91 |  |
| 165 | Riven | -0.94 | 0.00 | 0.94 |  |
| 166 | Sejuani | -0.94 | 0.00 | 0.94 |  |
| 167 | Zac | -0.96 | 0.00 | 0.96 |  |
| 168 | Ornn | -0.97 | 0.03 | 1.00 |  |
| 169 | Gragas | -0.98 | 0.00 | 0.98 |  |
| 170 | Wukong | -0.99 | 0.00 | 0.99 |  |
| 171 | Taliyah | -1.00 | 0.00 | 1.00 |  |
| 172 | Galio | -1.11 | 0.00 | 1.11 |  |
