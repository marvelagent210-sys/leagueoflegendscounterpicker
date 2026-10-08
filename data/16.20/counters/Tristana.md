# Counters to Tristana (patch 26.20)

Every champion ranked by what its kit does against Tristana's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Tristana's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Tristana` for the full ledger of a matchup, with sources.

## Top 10

### 1. Samira (net +0.93)

- **0.80** projectile block: Blade Whirl blocks Tristana's Buster Shot, a projectile. Blade Whirl for 0.75 s; Buster Shot takes 0.6 s to land, enough to react. (Samira W Blade Whirl → Tristana R Buster Shot)
- **0.35** projectile block: Blade Whirl blocks Tristana's Explosive Charge, a projectile. Blade Whirl for 0.75 s; Explosive Charge takes 100.29 s to land, enough to react. (Samira W Blade Whirl → Tristana E Explosive Charge)
- **0.30** projectile block: Blade Whirl blocks Tristana's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Tristana basic attacks)
- Watch out: Tristana's basic attacks reach 200 units farther than Samira's (700 vs 500 attack range).

### 2. Elise (net +0.91)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Tristana's Buster Shot. Untargetable for 0.6 s; Buster Shot takes 0.6 s to land, enough to react. (Elise E Rappel → Tristana R Buster Shot)
- **0.39** untargetable: Rappel makes Elise untargetable, dodging Tristana's Explosive Charge. Untargetable for 0.6 s; Explosive Charge takes 100.29 s to land, enough to react. (Elise E Rappel → Tristana E Explosive Charge)
- Watch out: Tristana's basic attacks reach 150 units farther than Elise's (700 vs 550 attack range).

### 3. Yasuo (net +0.86)

- **0.80** projectile block: Wind Wall blocks Tristana's Buster Shot, a projectile. Wind Wall for 4 s, long enough to use ahead of Buster Shot. (Yasuo W Wind Wall → Tristana R Buster Shot)
- **0.40** projectile block: Wind Wall blocks Tristana's Explosive Charge, a projectile. Wind Wall for 4 s, long enough to use ahead of Explosive Charge. (Yasuo W Wind Wall → Tristana E Explosive Charge)
- **0.39** projectile block: Wind Wall blocks Tristana's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Tristana basic attacks)
- Watch out: Tristana's basic attacks reach 525 units farther than Yasuo's (700 vs 175 attack range).

### 4. Aurora (net +0.86)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Tristana's Buster Shot. Untargetable for 0.4 s; Buster Shot takes 0.6 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Tristana R Buster Shot)
- **0.22** untargetable: Between Worlds makes Aurora untargetable, dodging Tristana's Explosive Charge. Untargetable for 0.4 s; Explosive Charge takes 100.29 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Tristana E Explosive Charge)
- **0.08** cc immunity: Between Worlds is displacement immune, ignoring Tristana's Buster Shot (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Tristana R Buster Shot)
- Watch out: Tristana's basic attacks reach 150 units farther than Aurora's (700 vs 550 attack range).

### 5. Lissandra (net +0.81)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Tristana's Buster Shot. Untargetable for 2.5 s, long enough to use ahead of Buster Shot. (Lissandra R Frozen Tomb → Tristana R Buster Shot)
- **0.23** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Tristana's Explosive Charge. Untargetable for 2.5 s, long enough to use ahead of Explosive Charge. (Lissandra R Frozen Tomb → Tristana E Explosive Charge)
- **0.15** dash stop: Frozen Tomb's knockdown can stop Tristana's Rocket Jump mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Tristana W Rocket Jump)
- Watch out: Tristana's basic attacks reach 150 units farther than Lissandra's (700 vs 550 attack range).

### 6. Braum (net +0.80)

- **0.80** projectile block: Unbreakable blocks Tristana's Buster Shot, a projectile. Unbreakable for 4 s, long enough to use ahead of Buster Shot. (Braum E Unbreakable → Tristana R Buster Shot)
- **0.50** projectile block: Unbreakable blocks Tristana's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Tristana basic attacks)
- **0.45** projectile block: Unbreakable blocks Tristana's Explosive Charge, a projectile. Unbreakable for 4 s, long enough to use ahead of Explosive Charge. (Braum E Unbreakable → Tristana E Explosive Charge)
- Watch out: Tristana's basic attacks reach 575 units farther than Braum's (700 vs 125 attack range).

### 7. Fiora (net +0.77)

- **0.90** parry: Riposte parries Tristana's Buster Shot and stuns back. Parry for 0.75 s; Buster Shot takes 0.6 s to land, enough to react. Negating Buster Shot's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Tristana R Buster Shot)
- **0.42** parry: Riposte parries Tristana's Explosive Charge. Parry for 0.75 s; Explosive Charge takes 100.29 s to land, enough to react. (Fiora W Riposte → Tristana E Explosive Charge)
- **0.09** attack speed slow: Riposte cuts Tristana's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Tristana basic attacks)
- Watch out: Tristana's basic attacks reach 550 units farther than Fiora's (700 vs 150 attack range).

### 8. Mel (net +0.77)

- **0.80** projectile block: Rebuttal blocks Tristana's Buster Shot, a projectile. Rebuttal for 0.75 s; Buster Shot takes 0.6 s to land, enough to react. (Mel W Rebuttal → Tristana R Buster Shot)
- **0.33** projectile block: Rebuttal blocks Tristana's Explosive Charge, a projectile. Rebuttal for 0.75 s; Explosive Charge takes 100.29 s to land, enough to react. (Mel W Rebuttal → Tristana E Explosive Charge)
- **0.30** projectile block: Rebuttal blocks Tristana's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Tristana basic attacks)
- Watch out: Tristana's basic attacks reach 150 units farther than Mel's (700 vs 550 attack range).

### 9. Nocturne (net +0.75)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Tristana's Buster Shot. Spell shield for 1.5 s, long enough to use ahead of Buster Shot. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Tristana R Buster Shot)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Tristana's Explosive Charge. Spell shield for 1.5 s, long enough to use ahead of Explosive Charge. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Tristana E Explosive Charge)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Tristana's Buster Shot (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Tristana R Buster Shot)
- Watch out: Tristana's basic attacks reach 575 units farther than Nocturne's (700 vs 125 attack range).

### 10. Camille (net +0.75)

- **0.80** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Tristana's Buster Shot. Untargetable for 0.5 s; Buster Shot takes 0.6 s to land, enough to react. (Camille R The Hextech Ultimatum → Tristana R Buster Shot)
- **0.22** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Tristana's Explosive Charge. Untargetable for 0.5 s; Explosive Charge takes 100.29 s to land, enough to react. (Camille R The Hextech Ultimatum → Tristana E Explosive Charge)
- **0.08** cc immunity: The Hextech Ultimatum is displacement immune, ignoring Tristana's Buster Shot (airborne) during it. Only during The Hextech Ultimatum (0.5 s). (Camille R The Hextech Ultimatum → Tristana R Buster Shot)
- Watch out: Tristana's basic attacks reach 575 units farther than Camille's (700 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +0.93 | 1.05 | 0.12 | projectile block (Blade Whirl) |
| 2 | Elise | +0.91 | 1.00 | 0.09 |  |
| 3 | Yasuo | +0.86 | 1.10 | 0.24 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 4 | Aurora | +0.86 | 0.93 | 0.07 |  |
| 5 | Lissandra | +0.81 | 0.95 | 0.14 |  |
| 6 | Braum | +0.80 | 1.16 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Fiora | +0.77 | 1.13 | 0.36 |  |
| 8 | Mel | +0.77 | 1.04 | 0.27 | projectile block (Rebuttal) |
| 9 | Nocturne | +0.75 | 1.11 | 0.36 |  |
| 10 | Camille | +0.75 | 0.93 | 0.18 |  |
| 11 | Bard | +0.74 | 0.92 | 0.18 |  |
| 12 | Rek'Sai | +0.70 | 0.94 | 0.24 |  |
| 13 | Ekko | +0.69 | 0.93 | 0.24 |  |
| 14 | Evelynn | +0.68 | 0.92 | 0.24 |  |
| 15 | Shaco | +0.68 | 0.92 | 0.24 |  |
| 16 | Maokai | +0.67 | 1.03 | 0.36 |  |
| 17 | Zed | +0.67 | 0.91 | 0.24 |  |
| 18 | Master Yi | +0.64 | 1.10 | 0.46 |  |
| 19 | Gwen | +0.64 | 1.00 | 0.36 |  |
| 20 | Sivir | +0.64 | 1.00 | 0.36 |  |
| 21 | Kled | +0.62 | 0.80 | 0.18 |  |
| 22 | Zaahen | +0.60 | 0.84 | 0.24 |  |
| 23 | Xayah | +0.59 | 0.91 | 0.32 |  |
| 24 | Warwick | +0.57 | 0.98 | 0.41 |  |
| 25 | Udyr | +0.52 | 0.88 | 0.36 |  |
| 26 | Vladimir | +0.51 | 1.01 | 0.50 |  |
| 27 | Kalista | +0.50 | 0.61 | 0.11 |  |
| 28 | Morgana | +0.42 | 0.87 | 0.45 |  |
| 29 | Yuumi | +0.40 | 1.03 | 0.63 |  |
| 30 | Kayle | +0.38 | 0.52 | 0.14 |  |
| 31 | Milio | +0.36 | 0.68 | 0.32 |  |
| 32 | Alistar | +0.31 | 0.67 | 0.36 |  |
| 33 | Pantheon | +0.31 | 0.60 | 0.29 |  |
| 34 | Kindred | +0.29 | 0.47 | 0.18 |  |
| 35 | Kayn | +0.28 | 0.92 | 0.64 |  |
| 36 | Vex | +0.22 | 0.36 | 0.14 |  |
| 37 | Ahri | +0.16 | 0.30 | 0.14 |  |
| 38 | Xin Zhao | +0.15 | 0.51 | 0.36 |  |
| 39 | Jax | +0.14 | 0.50 | 0.36 |  |
| 40 | Olaf | +0.12 | 0.84 | 0.72 |  |
| 41 | Teemo | +0.11 | 0.47 | 0.36 | blind (Blinding Dart) |
| 42 | Lulu | +0.07 | 0.34 | 0.27 |  |
| 43 | Nilah | +0.06 | 0.42 | 0.36 |  |
| 44 | Yone | +0.05 | 0.23 | 0.18 |  |
| 45 | Sion | +0.04 | 0.84 | 0.80 |  |
| 46 | Hwei | +0.03 | 0.30 | 0.27 |  |
| 47 | Veigar | +0.03 | 0.30 | 0.27 |  |
| 48 | Cassiopeia | +0.02 | 0.29 | 0.27 |  |
| 49 | Gangplank | -0.02 | 0.70 | 0.72 |  |
| 50 | Rengar | -0.02 | 0.70 | 0.72 |  |
| 51 | Jinx | -0.02 | 0.30 | 0.32 |  |
| 52 | Viktor | -0.02 | 0.30 | 0.32 |  |
| 53 | K'Sante | -0.02 | 0.16 | 0.18 |  |
| 54 | Malphite | -0.04 | 0.32 | 0.36 |  |
| 55 | Corki | -0.06 | 0.08 | 0.14 |  |
| 56 | Jarvan IV | -0.10 | 0.08 | 0.18 |  |
| 57 | Azir | -0.11 | 0.00 | 0.11 |  |
| 58 | Gnar | -0.11 | 0.00 | 0.11 |  |
| 59 | Yunara | -0.11 | 0.00 | 0.11 |  |
| 60 | Malzahar | -0.12 | 0.59 | 0.71 |  |
| 61 | Annie | -0.14 | 0.00 | 0.14 |  |
| 62 | Ezreal | -0.14 | 0.00 | 0.14 |  |
| 63 | Neeko | -0.14 | 0.00 | 0.14 |  |
| 64 | Vayne | -0.14 | 0.00 | 0.14 |  |
| 65 | Zeri | -0.14 | 0.00 | 0.14 |  |
| 66 | Ziggs | -0.14 | 0.00 | 0.14 |  |
| 67 | Zoe | -0.14 | 0.00 | 0.14 |  |
| 68 | Rammus | -0.15 | 0.36 | 0.51 |  |
| 69 | Thresh | -0.15 | 0.00 | 0.15 |  |
| 70 | Hecarim | -0.16 | 0.08 | 0.24 |  |
| 71 | Ornn | -0.16 | 0.08 | 0.24 |  |
| 72 | Volibear | -0.16 | 0.08 | 0.24 |  |
| 73 | Graves | -0.16 | 0.00 | 0.16 |  |
| 74 | Kai'Sa | -0.16 | 0.00 | 0.16 |  |
| 75 | LeBlanc | -0.16 | 0.00 | 0.16 |  |
| 76 | Nidalee | -0.16 | 0.00 | 0.16 |  |
| 77 | Poppy | -0.18 | 0.38 | 0.56 |  |
| 78 | Anivia | -0.18 | 0.00 | 0.18 |  |
| 79 | Ashe | -0.18 | 0.00 | 0.18 |  |
| 80 | Briar | -0.18 | 0.00 | 0.18 |  |
| 81 | Fizz | -0.18 | 0.00 | 0.18 |  |
| 82 | Jayce | -0.18 | 0.00 | 0.18 |  |
| 83 | Senna | -0.18 | 0.00 | 0.18 |  |
| 84 | Sylas | -0.18 | 0.00 | 0.18 |  |
| 85 | Aurelion Sol | -0.20 | 0.00 | 0.20 |  |
| 86 | Shen | -0.21 | 0.48 | 0.69 |  |
| 87 | Amumu | -0.21 | 0.15 | 0.36 |  |
| 88 | Viego | -0.21 | 0.08 | 0.29 |  |
| 89 | Aphelios | -0.21 | 0.06 | 0.27 |  |
| 90 | Heimerdinger | -0.21 | 0.06 | 0.27 |  |
| 91 | Zyra | -0.22 | 0.00 | 0.22 |  |
| 92 | Akali | -0.24 | 0.00 | 0.24 |  |
| 93 | Ambessa | -0.24 | 0.00 | 0.24 |  |
| 94 | Bel'Veth | -0.24 | 0.00 | 0.24 |  |
| 95 | Lee Sin | -0.24 | 0.00 | 0.24 |  |
| 96 | Wukong | -0.24 | 0.00 | 0.24 |  |
| 97 | Qiyana | -0.24 | 0.00 | 0.24 |  |
| 98 | Rakan | -0.24 | 0.00 | 0.24 |  |
| 99 | Rell | -0.24 | 0.00 | 0.24 |  |
| 100 | Riven | -0.24 | 0.00 | 0.24 |  |
| 101 | Talon | -0.24 | 0.00 | 0.24 |  |
| 102 | Taric | -0.25 | 0.47 | 0.72 |  |
| 103 | Caitlyn | -0.26 | 0.00 | 0.26 |  |
| 104 | Brand | -0.27 | 0.00 | 0.27 |  |
| 105 | Draven | -0.27 | 0.00 | 0.27 |  |
| 106 | Ivern | -0.27 | 0.00 | 0.27 |  |
| 107 | Kennen | -0.27 | 0.00 | 0.27 |  |
| 108 | Lux | -0.27 | 0.00 | 0.27 |  |
| 109 | Nami | -0.27 | 0.00 | 0.27 |  |
| 110 | Renata Glasc | -0.27 | 0.00 | 0.27 |  |
| 111 | Smolder | -0.27 | 0.00 | 0.27 |  |
| 112 | Sona | -0.27 | 0.00 | 0.27 |  |
| 113 | Soraka | -0.27 | 0.00 | 0.27 |  |
| 114 | Syndra | -0.27 | 0.00 | 0.27 |  |
| 115 | Twitch | -0.27 | 0.00 | 0.27 |  |
| 116 | Varus | -0.27 | 0.00 | 0.27 |  |
| 117 | Zilean | -0.27 | 0.00 | 0.27 |  |
| 118 | Illaoi | -0.28 | 0.08 | 0.36 |  |
| 119 | Sett | -0.28 | 0.08 | 0.36 |  |
| 120 | Shyvana | -0.28 | 0.08 | 0.36 |  |
| 121 | Zac | -0.29 | 0.30 | 0.59 |  |
| 122 | Quinn | -0.30 | 0.00 | 0.30 |  |
| 123 | Galio | -0.32 | 0.00 | 0.32 |  |
| 124 | Karma | -0.32 | 0.00 | 0.32 |  |
| 125 | Orianna | -0.32 | 0.00 | 0.32 |  |
| 126 | Pyke | -0.32 | 0.00 | 0.32 |  |
| 127 | Seraphine | -0.32 | 0.00 | 0.32 |  |
| 128 | Swain | -0.32 | 0.00 | 0.32 |  |
| 129 | Urgot | -0.32 | 0.00 | 0.32 |  |
| 130 | Lillia | -0.34 | 0.00 | 0.34 |  |
| 131 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 132 | Aatrox | -0.36 | 0.00 | 0.36 |  |
| 133 | Diana | -0.36 | 0.00 | 0.36 |  |
| 134 | Irelia | -0.36 | 0.00 | 0.36 |  |
| 135 | Kassadin | -0.36 | 0.00 | 0.36 |  |
| 136 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 137 | Kog'Maw | -0.36 | 0.00 | 0.36 |  |
| 138 | Leona | -0.36 | 0.00 | 0.36 |  |
| 139 | Locke | -0.36 | 0.00 | 0.36 |  |
| 140 | Nautilus | -0.36 | 0.00 | 0.36 |  |
| 141 | Renekton | -0.36 | 0.00 | 0.36 |  |
| 142 | Sejuani | -0.36 | 0.00 | 0.36 |  |
| 143 | Tryndamere | -0.36 | 0.00 | 0.36 |  |
| 144 | Garen | -0.37 | 0.35 | 0.72 |  |
| 145 | Vi | -0.38 | 0.08 | 0.46 |  |
| 146 | Akshan | -0.41 | 0.00 | 0.41 |  |
| 147 | Singed | -0.42 | 0.30 | 0.72 |  |
| 148 | Lucian | -0.44 | 0.00 | 0.44 |  |
| 149 | Gragas | -0.46 | 0.00 | 0.46 |  |
| 150 | Fiddlesticks | -0.49 | 0.00 | 0.49 |  |
| 151 | Ryze | -0.49 | 0.00 | 0.49 |  |
| 152 | Twisted Fate | -0.51 | 0.00 | 0.51 |  |
| 153 | Jhin | -0.53 | 0.00 | 0.53 |  |
| 154 | Katarina | -0.54 | 0.00 | 0.54 |  |
| 155 | Miss Fortune | -0.55 | 0.00 | 0.55 |  |
| 156 | Vel'Koz | -0.56 | 0.00 | 0.56 |  |
| 157 | Naafiri | -0.58 | 0.00 | 0.58 |  |
| 158 | Tahm Kench | -0.61 | 0.00 | 0.61 |  |
| 159 | Mordekaiser | -0.63 | 0.09 | 0.72 |  |
| 160 | Xerath | -0.63 | 0.00 | 0.63 |  |
| 161 | Taliyah | -0.64 | 0.00 | 0.64 |  |
| 162 | Skarner | -0.65 | 0.07 | 0.72 |  |
| 163 | Janna | -0.67 | 0.00 | 0.67 |  |
| 164 | Blitzcrank | -0.72 | 0.00 | 0.72 |  |
| 165 | Cho'Gath | -0.72 | 0.00 | 0.72 |  |
| 166 | Darius | -0.72 | 0.00 | 0.72 |  |
| 167 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 168 | Rumble | -0.72 | 0.00 | 0.72 |  |
| 169 | Trundle | -0.72 | 0.00 | 0.72 |  |
| 170 | Yorick | -0.72 | 0.00 | 0.72 |  |
| 171 | Karthus | -0.73 | 0.00 | 0.73 |  |
| 172 | Nunu & Willump | -0.89 | 0.18 | 1.07 |  |
