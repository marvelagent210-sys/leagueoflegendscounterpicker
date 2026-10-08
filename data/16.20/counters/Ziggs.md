# Counters to Ziggs (patch 26.20)

Every champion ranked by what its kit does against Ziggs's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ziggs's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ziggs` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +1.03)

- **0.85** spell shield: Shroud of Darkness's spell shield blocks Ziggs's Satchel Charge. Spell shield for 1.5 s, long enough to use ahead of Satchel Charge. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ziggs W Satchel Charge)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Ziggs's Mega Inferno Bomb. Spell shield for 1.5 s, long enough to use ahead of Mega Inferno Bomb. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ziggs R Mega Inferno Bomb)
- **0.17** cc immunity: Paranoia is displacement immune, ignoring Ziggs's Satchel Charge (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Ziggs W Satchel Charge)
- Watch out: Ziggs's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 2. Elise (net +0.96)

- **0.68** untargetable: Rappel makes Elise untargetable, dodging Ziggs's Satchel Charge. Untargetable for 0.6 s; Satchel Charge takes 0.82 s to land, enough to react. (Elise E Rappel → Ziggs W Satchel Charge)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Ziggs's Mega Inferno Bomb. Untargetable for 0.6 s; Mega Inferno Bomb takes 2.6 s to land, enough to react. (Elise E Rappel → Ziggs R Mega Inferno Bomb)

### 3. Sivir (net +0.96)

- **0.68** spell shield: Spell Shield's spell shield blocks Ziggs's Satchel Charge. Spell shield for 1.5 s, long enough to use ahead of Satchel Charge. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ziggs W Satchel Charge)
- **0.55** spell shield: Spell Shield's spell shield blocks Ziggs's Mega Inferno Bomb. Spell shield for 1.5 s, long enough to use ahead of Mega Inferno Bomb. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ziggs R Mega Inferno Bomb)

### 4. Braum (net +0.95)

- **0.85** projectile block: Unbreakable blocks Ziggs's Satchel Charge, a projectile. Unbreakable for 4 s, long enough to use ahead of Satchel Charge. (Braum E Unbreakable → Ziggs W Satchel Charge)
- **0.45** projectile block: Unbreakable blocks Ziggs's Hexplosive Minefield, a projectile. Unbreakable for 4 s, long enough to use ahead of Hexplosive Minefield. (Braum E Unbreakable → Ziggs E Hexplosive Minefield)
- **0.39** projectile block: Unbreakable blocks Ziggs's Bouncing Bomb, a projectile. Unbreakable for 4 s, long enough to use ahead of Bouncing Bomb. (Braum E Unbreakable → Ziggs Q Bouncing Bomb)
- Watch out: Ziggs's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 5. Samira (net +0.91)

- **0.62** projectile block: Blade Whirl blocks Ziggs's Satchel Charge, a projectile. Blade Whirl for 0.75 s; Satchel Charge takes 0.82 s to land, enough to react. (Samira W Blade Whirl → Ziggs W Satchel Charge)
- **0.38** projectile block: Blade Whirl blocks Ziggs's Hexplosive Minefield, a projectile. Blade Whirl for 0.75 s; Hexplosive Minefield takes 0.83 s to land, enough to react. (Samira W Blade Whirl → Ziggs E Hexplosive Minefield)
- **0.28** projectile block: Blade Whirl blocks Ziggs's Bouncing Bomb, a projectile. Blade Whirl for 0.75 s; Bouncing Bomb takes 1.07 s to land, enough to react. (Samira W Blade Whirl → Ziggs Q Bouncing Bomb)

### 6. Maokai (net +0.86)

- **0.85** untargetable: Twisted Advance makes Maokai untargetable, dodging Ziggs's Satchel Charge. Untargetable for 1.4 s; Satchel Charge takes 0.82 s to land, enough to react. (Maokai W Twisted Advance → Ziggs W Satchel Charge)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Ziggs's Mega Inferno Bomb. Untargetable for 1.4 s; Mega Inferno Bomb takes 2.6 s to land, enough to react. (Maokai W Twisted Advance → Ziggs R Mega Inferno Bomb)
- Watch out: Ziggs's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 7. Yasuo (net +0.86)

- **0.70** projectile block: Wind Wall blocks Ziggs's Satchel Charge, a projectile. Wind Wall for 4 s, long enough to use ahead of Satchel Charge. (Yasuo W Wind Wall → Ziggs W Satchel Charge)
- **0.43** projectile block: Wind Wall blocks Ziggs's Hexplosive Minefield, a projectile. Wind Wall for 4 s, long enough to use ahead of Hexplosive Minefield. (Yasuo W Wind Wall → Ziggs E Hexplosive Minefield)
- **0.30** projectile block: Wind Wall blocks Ziggs's Bouncing Bomb, a projectile. Wind Wall for 4 s, long enough to use ahead of Bouncing Bomb. (Yasuo W Wind Wall → Ziggs Q Bouncing Bomb)
- Watch out: Ziggs's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 8. Mel (net +0.85)

- **0.58** projectile block: Rebuttal blocks Ziggs's Satchel Charge, a projectile. Rebuttal for 0.75 s; Satchel Charge takes 0.82 s to land, enough to react. (Mel W Rebuttal → Ziggs W Satchel Charge)
- **0.35** projectile block: Rebuttal blocks Ziggs's Hexplosive Minefield, a projectile. Rebuttal for 0.75 s; Hexplosive Minefield takes 0.83 s to land, enough to react. (Mel W Rebuttal → Ziggs E Hexplosive Minefield)
- **0.27** projectile block: Rebuttal blocks Ziggs's Bouncing Bomb, a projectile. Rebuttal for 0.75 s; Bouncing Bomb takes 1.07 s to land, enough to react. (Mel W Rebuttal → Ziggs Q Bouncing Bomb)

### 9. Fiora (net +0.84)

- **0.82** parry: Riposte parries Ziggs's Satchel Charge and stuns back. Parry for 0.75 s; Satchel Charge takes 0.82 s to land, enough to react. Negating Satchel Charge's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ziggs W Satchel Charge)
- **0.55** parry: Riposte parries Ziggs's Mega Inferno Bomb. Parry for 0.75 s; Mega Inferno Bomb takes 2.6 s to land, enough to react. (Fiora W Riposte → Ziggs R Mega Inferno Bomb)
- **0.06** attack speed slow: Riposte cuts Ziggs's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Ziggs basic attacks)
- Watch out: Ziggs's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### 10. Vladimir (net +0.80)

- **0.72** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ziggs's Satchel Charge. Untargetable for 2 s, long enough to use ahead of Satchel Charge. (Vladimir W Sanguine Pool → Ziggs W Satchel Charge)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ziggs's Mega Inferno Bomb. Untargetable for 2 s, long enough to use ahead of Mega Inferno Bomb. (Vladimir W Sanguine Pool → Ziggs R Mega Inferno Bomb)
- Watch out: Ziggs's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.03 | 1.30 | 0.27 |  |
| 2 | Elise | +0.96 | 0.96 | 0.00 |  |
| 3 | Sivir | +0.96 | 0.96 | 0.00 |  |
| 4 | Braum | +0.95 | 1.22 | 0.27 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Samira | +0.91 | 0.91 | 0.00 | projectile block (Blade Whirl) |
| 6 | Maokai | +0.86 | 1.13 | 0.27 |  |
| 7 | Yasuo | +0.86 | 1.03 | 0.17 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 8 | Mel | +0.85 | 0.85 | 0.00 | projectile block (Rebuttal) |
| 9 | Fiora | +0.84 | 1.11 | 0.27 |  |
| 10 | Vladimir | +0.80 | 1.00 | 0.20 |  |
| 11 | Lissandra | +0.77 | 0.77 | 0.00 |  |
| 12 | Bard | +0.72 | 0.72 | 0.00 |  |
| 13 | Gwen | +0.69 | 0.96 | 0.27 |  |
| 14 | Aurora | +0.69 | 0.69 | 0.00 |  |
| 15 | Kayle | +0.69 | 0.69 | 0.00 |  |
| 16 | Yuumi | +0.65 | 1.13 | 0.48 |  |
| 17 | Morgana | +0.65 | 0.78 | 0.13 |  |
| 18 | Xayah | +0.65 | 0.65 | 0.00 |  |
| 19 | Udyr | +0.64 | 0.91 | 0.27 |  |
| 20 | Ekko | +0.60 | 0.78 | 0.18 |  |
| 21 | Camille | +0.60 | 0.73 | 0.13 |  |
| 22 | Rek'Sai | +0.59 | 0.76 | 0.17 |  |
| 23 | Master Yi | +0.58 | 1.03 | 0.45 |  |
| 24 | Evelynn | +0.54 | 0.72 | 0.18 |  |
| 25 | Shaco | +0.54 | 0.72 | 0.18 |  |
| 26 | Vex | +0.53 | 0.53 | 0.00 |  |
| 27 | Kindred | +0.51 | 0.51 | 0.00 |  |
| 28 | Zed | +0.47 | 0.65 | 0.18 |  |
| 29 | Pantheon | +0.46 | 0.72 | 0.26 |  |
| 30 | Ahri | +0.43 | 0.43 | 0.00 | dash stop (Charm) |
| 31 | Hwei | +0.43 | 0.43 | 0.00 | dash stop (Grim Visage) |
| 32 | Jinx | +0.43 | 0.43 | 0.00 | dash stop (Flame Chompers!) |
| 33 | Viktor | +0.41 | 0.41 | 0.00 | dash stop (Gravity Field) |
| 34 | Veigar | +0.39 | 0.39 | 0.00 |  |
| 35 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 36 | Kled | +0.33 | 0.43 | 0.10 |  |
| 37 | Kalista | +0.33 | 0.33 | 0.00 |  |
| 38 | Xin Zhao | +0.30 | 0.55 | 0.25 |  |
| 39 | Zaahen | +0.28 | 0.45 | 0.17 |  |
| 40 | Malzahar | +0.27 | 0.67 | 0.40 |  |
| 41 | Warwick | +0.26 | 0.72 | 0.46 |  |
| 42 | Yone | +0.25 | 0.38 | 0.13 |  |
| 43 | Lulu | +0.25 | 0.25 | 0.00 |  |
| 44 | K'Sante | +0.21 | 0.34 | 0.13 |  |
| 45 | Rengar | +0.20 | 0.73 | 0.53 |  |
| 46 | Cassiopeia | +0.20 | 0.20 | 0.00 |  |
| 47 | Corki | +0.17 | 0.17 | 0.00 |  |
| 48 | Gangplank | +0.14 | 0.67 | 0.53 |  |
| 49 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 50 | Kayn | +0.10 | 0.72 | 0.62 |  |
| 51 | Alistar | +0.09 | 0.36 | 0.27 |  |
| 52 | Malphite | +0.08 | 0.35 | 0.27 |  |
| 53 | Milio | +0.06 | 0.06 | 0.00 |  |
| 54 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 55 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 56 | Jarvan IV | +0.04 | 0.17 | 0.13 |  |
| 57 | Annie | +0.04 | 0.04 | 0.00 |  |
| 58 | Nilah | +0.03 | 0.25 | 0.22 |  |
| 59 | Poppy | +0.02 | 0.49 | 0.47 | dash stop (Steadfast Presence) |
| 60 | Jax | +0.01 | 0.28 | 0.27 |  |
| 61 | Hecarim | +0.01 | 0.18 | 0.17 |  |
| 62 | Ornn | 0.00 | 0.17 | 0.17 |  |
| 63 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 64 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 65 | Azir | 0.00 | 0.00 | 0.00 |  |
| 66 | Brand | 0.00 | 0.00 | 0.00 |  |
| 67 | Draven | 0.00 | 0.00 | 0.00 |  |
| 68 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 69 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 70 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 71 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 72 | Karma | 0.00 | 0.00 | 0.00 |  |
| 73 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 74 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 75 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 76 | Lux | 0.00 | 0.00 | 0.00 |  |
| 77 | Nami | 0.00 | 0.00 | 0.00 |  |
| 78 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 79 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 80 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 81 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 82 | Senna | 0.00 | 0.00 | 0.00 |  |
| 83 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 84 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 85 | Sona | 0.00 | 0.00 | 0.00 |  |
| 86 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 87 | Swain | 0.00 | 0.00 | 0.00 |  |
| 88 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 89 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 90 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 91 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 92 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 93 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 94 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 95 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 96 | Volibear | -0.01 | 0.17 | 0.18 |  |
| 97 | Taric | -0.02 | 0.51 | 0.53 |  |
| 98 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 99 | Graves | -0.06 | 0.00 | 0.06 |  |
| 100 | Amumu | -0.07 | 0.20 | 0.27 |  |
| 101 | Olaf | -0.08 | 0.45 | 0.53 |  |
| 102 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 103 | Illaoi | -0.10 | 0.17 | 0.27 |  |
| 104 | Sett | -0.10 | 0.17 | 0.27 |  |
| 105 | Shyvana | -0.10 | 0.17 | 0.27 |  |
| 106 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 107 | Varus | -0.11 | 0.00 | 0.11 |  |
| 108 | Briar | -0.13 | 0.00 | 0.13 |  |
| 109 | Fizz | -0.13 | 0.00 | 0.13 |  |
| 110 | Sylas | -0.13 | 0.00 | 0.13 |  |
| 111 | Urgot | -0.13 | 0.00 | 0.13 |  |
| 112 | Sion | -0.15 | 0.47 | 0.62 |  |
| 113 | Viego | -0.15 | 0.17 | 0.32 |  |
| 114 | Lillia | -0.15 | 0.00 | 0.15 |  |
| 115 | Wukong | -0.17 | 0.00 | 0.17 |  |
| 116 | Rell | -0.17 | 0.00 | 0.17 |  |
| 117 | Akali | -0.18 | 0.00 | 0.18 |  |
| 118 | Ambessa | -0.18 | 0.00 | 0.18 |  |
| 119 | Bel'Veth | -0.18 | 0.00 | 0.18 |  |
| 120 | Lee Sin | -0.18 | 0.00 | 0.18 |  |
| 121 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 122 | Quinn | -0.18 | 0.00 | 0.18 |  |
| 123 | Riven | -0.18 | 0.00 | 0.18 |  |
| 124 | Talon | -0.18 | 0.00 | 0.18 |  |
| 125 | Caitlyn | -0.19 | 0.09 | 0.28 |  |
| 126 | Ivern | -0.19 | 0.00 | 0.19 |  |
| 127 | Irelia | -0.23 | 0.00 | 0.23 |  |
| 128 | Rammus | -0.24 | 0.27 | 0.51 |  |
| 129 | Zac | -0.25 | 0.43 | 0.68 | dash stop (Stretching Strikes) |
| 130 | Aatrox | -0.25 | 0.00 | 0.25 |  |
| 131 | Nautilus | -0.25 | 0.00 | 0.25 |  |
| 132 | Tryndamere | -0.25 | 0.00 | 0.25 |  |
| 133 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 134 | Diana | -0.27 | 0.00 | 0.27 |  |
| 135 | Kassadin | -0.27 | 0.00 | 0.27 |  |
| 136 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 137 | Leona | -0.27 | 0.00 | 0.27 |  |
| 138 | Locke | -0.27 | 0.00 | 0.27 |  |
| 139 | Renekton | -0.27 | 0.00 | 0.27 |  |
| 140 | Sejuani | -0.27 | 0.00 | 0.27 |  |
| 141 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 142 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 143 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 144 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 145 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 146 | Singed | -0.32 | 0.21 | 0.53 |  |
| 147 | Pyke | -0.32 | 0.00 | 0.32 |  |
| 148 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 149 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 150 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 151 | Shen | -0.36 | 0.27 | 0.63 |  |
| 152 | Vi | -0.36 | 0.17 | 0.53 |  |
| 153 | Galio | -0.36 | 0.00 | 0.36 |  |
| 154 | Garen | -0.38 | 0.12 | 0.50 |  |
| 155 | Janna | -0.40 | 0.00 | 0.40 |  |
| 156 | Karthus | -0.41 | 0.00 | 0.41 |  |
| 157 | Gragas | -0.42 | 0.00 | 0.42 |  |
| 158 | Mordekaiser | -0.44 | 0.06 | 0.50 |  |
| 159 | Fiddlesticks | -0.44 | 0.00 | 0.44 |  |
| 160 | Skarner | -0.47 | 0.06 | 0.53 |  |
| 161 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 162 | Darius | -0.50 | 0.00 | 0.50 |  |
| 163 | Trundle | -0.50 | 0.00 | 0.50 |  |
| 164 | Yorick | -0.50 | 0.00 | 0.50 |  |
| 165 | Blitzcrank | -0.53 | 0.00 | 0.53 |  |
| 166 | Cho'Gath | -0.53 | 0.00 | 0.53 |  |
| 167 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 168 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 169 | Katarina | -0.55 | 0.00 | 0.55 |  |
| 170 | Naafiri | -0.58 | 0.00 | 0.58 |  |
| 171 | Tahm Kench | -0.75 | 0.00 | 0.75 |  |
| 172 | Nunu & Willump | -0.88 | 0.14 | 1.02 |  |
