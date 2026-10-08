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

### 7. Elise (net +0.51)

- **0.70** untargetable: Rappel makes Elise untargetable, dodging Vex's Shadow Surge. Untargetable for 0.6 s; Shadow Surge takes 2.13 s to land, enough to react. (Elise E Rappel → Vex R Shadow Surge)
- Watch out: Doom 'n Gloom's knockdown can stop Elise's Venomous Bite mid-dash.

### 8. Vladimir (net +0.50)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Vex's Shadow Surge. Untargetable for 2 s, long enough to use ahead of Shadow Surge. (Vladimir W Sanguine Pool → Vex R Shadow Surge)
- Watch out: Vex's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 9. Morgana (net +0.47)

- **0.55** cc immunity: Black Shield makes Morgana immune to Vex's Doom 'n Gloom (fear, knockdown, slow). Immune for 5 s, long enough to use ahead of Doom 'n Gloom. (Morgana E Black Shield → Vex I Doom 'n Gloom)
- **0.10** cc immunity: Black Shield makes Morgana immune to Vex's Looming Darkness (slow). Immune for 5 s, long enough to use ahead of Looming Darkness. (Morgana E Black Shield → Vex E Looming Darkness)
- Watch out: Vex's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

### 10. Nocturne (net +0.46)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Vex's Shadow Surge. Spell shield for 1.5 s, long enough to use ahead of Shadow Surge. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Vex R Shadow Surge)
- **0.03** cc immunity: Paranoia is displacement immune, ignoring Vex's Doom 'n Gloom (knockdown) during it. Only during Paranoia. (Nocturne R Paranoia → Vex I Doom 'n Gloom)
- Watch out: Vex's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Mel | +0.95 | 0.95 | 0.00 | projectile block (Rebuttal) |
| 2 | Sivir | +0.70 | 0.70 | 0.00 |  |
| 3 | Xayah | +0.70 | 0.70 | 0.00 |  |
| 4 | Lissandra | +0.65 | 0.70 | 0.05 |  |
| 5 | Samira | +0.52 | 0.96 | 0.44 | projectile block (Blade Whirl) |
| 6 | Zed | +0.52 | 0.70 | 0.18 |  |
| 7 | Elise | +0.51 | 0.70 | 0.19 |  |
| 8 | Vladimir | +0.50 | 0.70 | 0.20 |  |
| 9 | Morgana | +0.47 | 0.60 | 0.13 |  |
| 10 | Nocturne | +0.46 | 0.73 | 0.27 |  |
| 11 | Braum | +0.44 | 1.07 | 0.63 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 12 | Kayle | +0.42 | 0.42 | 0.00 |  |
| 13 | Master Yi | +0.39 | 0.81 | 0.42 |  |
| 14 | Yasuo | +0.37 | 1.00 | 0.63 | projectile block (Wind Wall) |
| 15 | Maokai | +0.36 | 0.70 | 0.34 |  |
| 16 | Udyr | +0.34 | 0.61 | 0.27 |  |
| 17 | Bard | +0.32 | 0.70 | 0.38 |  |
| 18 | Shaco | +0.32 | 0.70 | 0.38 |  |
| 19 | Teemo | +0.27 | 0.35 | 0.08 |  |
| 20 | Ekko | +0.25 | 0.70 | 0.45 |  |
| 21 | Yuumi | +0.23 | 0.70 | 0.47 |  |
| 22 | Milio | +0.23 | 0.30 | 0.07 |  |
| 23 | Fiora | +0.21 | 0.73 | 0.52 |  |
| 24 | Lulu | +0.17 | 0.25 | 0.08 |  |
| 25 | Cassiopeia | +0.17 | 0.17 | 0.00 |  |
| 26 | Aurora | +0.15 | 0.72 | 0.57 |  |
| 27 | Evelynn | +0.13 | 0.70 | 0.57 |  |
| 28 | Gwen | +0.10 | 0.70 | 0.60 |  |
| 29 | Kindred | +0.10 | 0.32 | 0.22 |  |
| 30 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 31 | Heimerdinger | +0.09 | 0.09 | 0.00 |  |
| 32 | Annie | +0.04 | 0.04 | 0.00 |  |
| 33 | Rek'Sai | +0.02 | 0.72 | 0.70 |  |
| 34 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 35 | Brand | 0.00 | 0.00 | 0.00 |  |
| 36 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 37 | Karma | 0.00 | 0.00 | 0.00 |  |
| 38 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 39 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 40 | Lux | 0.00 | 0.00 | 0.00 |  |
| 41 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 42 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 43 | Sona | 0.00 | 0.00 | 0.00 |  |
| 44 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 45 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 46 | Jinx | -0.04 | 0.00 | 0.04 |  |
| 47 | Veigar | -0.04 | 0.00 | 0.04 |  |
| 48 | Viktor | -0.04 | 0.00 | 0.04 |  |
| 49 | Gangplank | -0.05 | 0.48 | 0.53 |  |
| 50 | Draven | -0.07 | 0.00 | 0.07 |  |
| 51 | Hwei | -0.07 | 0.00 | 0.07 |  |
| 52 | Renata Glasc | -0.07 | 0.00 | 0.07 |  |
| 53 | Swain | -0.07 | 0.00 | 0.07 |  |
| 54 | Syndra | -0.07 | 0.00 | 0.07 |  |
| 55 | Zoe | -0.07 | 0.00 | 0.07 |  |
| 56 | Orianna | -0.08 | 0.00 | 0.08 |  |
| 57 | Varus | -0.10 | 0.00 | 0.10 |  |
| 58 | Kayn | -0.11 | 0.70 | 0.81 |  |
| 59 | Senna | -0.11 | 0.00 | 0.11 |  |
| 60 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 61 | Camille | -0.12 | 0.72 | 0.84 |  |
| 62 | Warwick | -0.13 | 0.36 | 0.49 |  |
| 63 | Kalista | -0.13 | 0.23 | 0.36 |  |
| 64 | Malzahar | -0.14 | 0.31 | 0.45 |  |
| 65 | Anivia | -0.14 | 0.00 | 0.14 |  |
| 66 | Neeko | -0.15 | 0.00 | 0.15 |  |
| 67 | Pantheon | -0.16 | 0.35 | 0.51 |  |
| 68 | Zyra | -0.16 | 0.00 | 0.16 |  |
| 69 | Nami | -0.18 | 0.00 | 0.18 |  |
| 70 | Garen | -0.19 | 0.31 | 0.50 |  |
| 71 | Nidalee | -0.19 | 0.00 | 0.19 |  |
| 72 | Olaf | -0.21 | 0.32 | 0.53 |  |
| 73 | Taric | -0.21 | 0.32 | 0.53 |  |
| 74 | Tristana | -0.22 | 0.14 | 0.36 |  |
| 75 | Yunara | -0.22 | 0.00 | 0.22 |  |
| 76 | Jax | -0.24 | 0.28 | 0.52 |  |
| 77 | Shyvana | -0.24 | 0.03 | 0.27 |  |
| 78 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 79 | Malphite | -0.26 | 0.21 | 0.47 |  |
| 80 | Jayce | -0.26 | 0.00 | 0.26 |  |
| 81 | Kassadin | -0.27 | 0.00 | 0.27 |  |
| 82 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 83 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 84 | Caitlyn | -0.30 | 0.09 | 0.39 |  |
| 85 | Corki | -0.30 | 0.03 | 0.33 |  |
| 86 | Zeri | -0.30 | 0.00 | 0.30 |  |
| 87 | Zaahen | -0.31 | 0.32 | 0.63 |  |
| 88 | Sett | -0.31 | 0.03 | 0.34 |  |
| 89 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 90 | Hecarim | -0.34 | 0.03 | 0.37 |  |
| 91 | Volibear | -0.34 | 0.03 | 0.37 |  |
| 92 | Rammus | -0.35 | 0.27 | 0.62 |  |
| 93 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 94 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 95 | Vayne | -0.35 | 0.00 | 0.35 |  |
| 96 | Vel'Koz | -0.35 | 0.00 | 0.35 |  |
| 97 | Illaoi | -0.36 | 0.03 | 0.39 |  |
| 98 | Sion | -0.39 | 0.34 | 0.73 |  |
| 99 | Mordekaiser | -0.39 | 0.25 | 0.64 |  |
| 100 | Nilah | -0.39 | 0.25 | 0.64 |  |
| 101 | Ahri | -0.39 | 0.00 | 0.39 |  |
| 102 | LeBlanc | -0.40 | 0.00 | 0.40 |  |
| 103 | Xin Zhao | -0.41 | 0.35 | 0.76 |  |
| 104 | Aurelion Sol | -0.41 | 0.00 | 0.41 |  |
| 105 | Karthus | -0.41 | 0.00 | 0.41 |  |
| 106 | Lucian | -0.42 | 0.00 | 0.42 |  |
| 107 | Rengar | -0.43 | 0.49 | 0.92 |  |
| 108 | Singed | -0.43 | 0.17 | 0.60 |  |
| 109 | Skarner | -0.43 | 0.10 | 0.53 |  |
| 110 | Ambessa | -0.43 | 0.00 | 0.43 |  |
| 111 | Fiddlesticks | -0.43 | 0.00 | 0.43 |  |
| 112 | Ivern | -0.44 | 0.00 | 0.44 |  |
| 113 | Alistar | -0.45 | 0.25 | 0.70 |  |
| 114 | Kai'Sa | -0.46 | 0.00 | 0.46 |  |
| 115 | Lillia | -0.46 | 0.00 | 0.46 |  |
| 116 | Gnar | -0.47 | 0.00 | 0.47 |  |
| 117 | Irelia | -0.48 | 0.00 | 0.48 |  |
| 118 | Quinn | -0.48 | 0.00 | 0.48 |  |
| 119 | Kled | -0.50 | 0.30 | 0.80 |  |
| 120 | Azir | -0.51 | 0.00 | 0.51 |  |
| 121 | Bel'Veth | -0.51 | 0.00 | 0.51 |  |
| 122 | K'Sante | -0.52 | 0.06 | 0.58 |  |
| 123 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 124 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 125 | Tryndamere | -0.53 | 0.00 | 0.53 |  |
| 126 | Ziggs | -0.53 | 0.00 | 0.53 |  |
| 127 | Graves | -0.54 | 0.00 | 0.54 |  |
| 128 | Akshan | -0.55 | 0.00 | 0.55 |  |
| 129 | Katarina | -0.55 | 0.00 | 0.55 |  |
| 130 | Thresh | -0.55 | 0.00 | 0.55 |  |
| 131 | Shen | -0.56 | 0.27 | 0.83 |  |
| 132 | Darius | -0.57 | 0.00 | 0.57 |  |
| 133 | Trundle | -0.57 | 0.00 | 0.57 |  |
| 134 | Leona | -0.58 | 0.00 | 0.58 |  |
| 135 | Locke | -0.58 | 0.00 | 0.58 |  |
| 136 | Renekton | -0.58 | 0.00 | 0.58 |  |
| 137 | Cho'Gath | -0.60 | 0.00 | 0.60 |  |
| 138 | Urgot | -0.61 | 0.00 | 0.61 |  |
| 139 | Yone | -0.63 | 0.03 | 0.66 |  |
| 140 | Janna | -0.63 | 0.00 | 0.63 |  |
| 141 | Briar | -0.64 | 0.00 | 0.64 |  |
| 142 | Fizz | -0.64 | 0.00 | 0.64 |  |
| 143 | Yorick | -0.64 | 0.00 | 0.64 |  |
| 144 | Aatrox | -0.66 | 0.00 | 0.66 |  |
| 145 | Nautilus | -0.68 | 0.00 | 0.68 |  |
| 146 | Talon | -0.68 | 0.00 | 0.68 |  |
| 147 | Viego | -0.69 | 0.03 | 0.72 |  |
| 148 | Jarvan IV | -0.71 | 0.03 | 0.74 |  |
| 149 | Blitzcrank | -0.71 | 0.00 | 0.71 |  |
| 150 | Lee Sin | -0.71 | 0.00 | 0.71 |  |
| 151 | Diana | -0.72 | 0.00 | 0.72 |  |
| 152 | Galio | -0.73 | 0.00 | 0.73 |  |
| 153 | Amumu | -0.75 | 0.00 | 0.75 |  |
| 154 | Pyke | -0.80 | 0.00 | 0.80 |  |
| 155 | Qiyana | -0.81 | 0.00 | 0.81 |  |
| 156 | Kha'Zix | -0.82 | 0.00 | 0.82 |  |
| 157 | Sylas | -0.83 | 0.00 | 0.83 |  |
| 158 | Nunu & Willump | -0.86 | 0.20 | 1.06 |  |
| 159 | Vi | -0.87 | 0.03 | 0.90 |  |
| 160 | Naafiri | -0.87 | 0.00 | 0.87 |  |
| 161 | Rakan | -0.87 | 0.00 | 0.87 |  |
| 162 | Poppy | -0.88 | 0.00 | 0.88 |  |
| 163 | Akali | -0.89 | 0.00 | 0.89 |  |
| 164 | Rell | -0.89 | 0.00 | 0.89 |  |
| 165 | Tahm Kench | -0.91 | 0.00 | 0.91 |  |
| 166 | Riven | -0.94 | 0.00 | 0.94 |  |
| 167 | Sejuani | -0.94 | 0.00 | 0.94 |  |
| 168 | Zac | -0.96 | 0.00 | 0.96 |  |
| 169 | Ornn | -0.97 | 0.03 | 1.00 |  |
| 170 | Gragas | -0.98 | 0.00 | 0.98 |  |
| 171 | Wukong | -0.99 | 0.00 | 0.99 |  |
| 172 | Taliyah | -1.00 | 0.00 | 1.00 |  |
