# Counters to Lillia (patch 26.20)

Every champion ranked by what its kit does against Lillia's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Lillia's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Lillia` for the full ledger of a matchup, with sources.

## Top 10

### 1. Mel (net +1.02)

- **0.80** projectile block: Rebuttal blocks Lillia's Lilting Lullaby, a projectile. Rebuttal for 0.75 s; Lilting Lullaby takes 0.4 s to land, enough to react. (Mel W Rebuttal → Lillia R Lilting Lullaby)
- **0.15** projectile block: Rebuttal blocks part of Lillia's Swirlseed, a projectile. Rebuttal for 0.75 s; Swirlseed takes 0.54 s to land, enough to react. Only part of the ability is a projectile. Swirlseed's origin is determined from Lillia's position at the start of cast, the rolling direction is determined from Lillia's position at the end of cast (when the projectile is created, not when the seed starts rolling). Projectile destroying effects will still make the rolling seed detonate upon colliding with them, but not when the initial arcing missile is destroyed.
  - If Unbreakable blocks the initial projectile, it is destroyed and deals 0 damage to him, as well as not triggering the cone-shaped area of effect. (Mel W Rebuttal → Lillia E Swirlseed)
- **0.15** range: Mel's basic attacks reach 225 units farther than Lillia's (550 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Mel basic attacks → Lillia basic attacks)

### 2. Samira (net +1.02)

- **0.80** projectile block: Blade Whirl blocks Lillia's Lilting Lullaby, a projectile. Blade Whirl for 0.75 s; Lilting Lullaby takes 0.4 s to land, enough to react. (Samira W Blade Whirl → Lillia R Lilting Lullaby)
- **0.16** projectile block: Blade Whirl blocks part of Lillia's Swirlseed, a projectile. Blade Whirl for 0.75 s; Swirlseed takes 0.54 s to land, enough to react. Only part of the ability is a projectile. Swirlseed's origin is determined from Lillia's position at the start of cast, the rolling direction is determined from Lillia's position at the end of cast (when the projectile is created, not when the seed starts rolling). Projectile destroying effects will still make the rolling seed detonate upon colliding with them, but not when the initial arcing missile is destroyed.
  - If Unbreakable blocks the initial projectile, it is destroyed and deals 0 damage to him, as well as not triggering the cone-shaped area of effect. (Samira W Blade Whirl → Lillia E Swirlseed)
- **0.14** range: Samira's basic attacks reach 175 units farther than Lillia's (500 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Samira basic attacks → Lillia basic attacks)

### 3. Aurora (net +1.00)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Lillia's Lilting Lullaby. Untargetable for 0.4 s; Lilting Lullaby takes 0.4 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Lillia R Lilting Lullaby)
- **0.16** range: Aurora's basic attacks reach 225 units farther than Lillia's (550 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Aurora basic attacks → Lillia basic attacks)
- **0.08** cc immunity: Between Worlds is displacement immune, ignoring Lillia's Lilting Lullaby (sleep) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Lillia R Lilting Lullaby)

### 4. Lissandra (net +0.99)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Lillia's Lilting Lullaby. Untargetable for 2.5 s, long enough to use ahead of Lilting Lullaby. (Lissandra R Frozen Tomb → Lillia R Lilting Lullaby)
- **0.14** dash stop: Frozen Tomb's knockdown can stop Lillia's Watch Out! Eep! mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Lillia W Watch Out! Eep!)
- **0.12** range: Lissandra's basic attacks reach 225 units farther than Lillia's (550 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Lissandra basic attacks → Lillia basic attacks)

### 5. Xayah (net +0.99)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Lillia's Lilting Lullaby. Untargetable for 1.5 s, long enough to use ahead of Lilting Lullaby. (Xayah R Featherstorm → Lillia R Lilting Lullaby)
- **0.19** range: Xayah's basic attacks reach 200 units farther than Lillia's (525 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Xayah basic attacks → Lillia basic attacks)

### 6. Elise (net +0.98)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Lillia's Lilting Lullaby. Untargetable for 0.6 s; Lilting Lullaby takes 0.4 s to land, enough to react. (Elise E Rappel → Lillia R Lilting Lullaby)
- **0.18** range: Elise's basic attacks reach 225 units farther than Lillia's (550 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Elise basic attacks → Lillia basic attacks)

### 7. Bard (net +0.97)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Lillia's Lilting Lullaby. Untargetable for 2.5 s, long enough to use ahead of Lilting Lullaby. (Bard R Tempered Fate → Lillia R Lilting Lullaby)
- **0.17** range: Bard's basic attacks reach 175 units farther than Lillia's (500 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Bard basic attacks → Lillia basic attacks)

### 8. Morgana (net +0.92)

- **0.80** cc immunity: Black Shield makes Morgana immune to Lillia's Lilting Lullaby (sleep, slow, drowsy). Immune for 5 s, long enough to use ahead of Lilting Lullaby. (Morgana E Black Shield → Lillia R Lilting Lullaby)
- **0.10** cc immunity: Black Shield makes Morgana immune to Lillia's Swirlseed (slow). Immune for 5 s, long enough to use ahead of Swirlseed. (Morgana E Black Shield → Lillia E Swirlseed)
- **0.07** range: Morgana's basic attacks reach 125 units farther than Lillia's (450 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Morgana basic attacks → Lillia basic attacks)

### 9. Milio (net +0.89)

- **0.58** cleanse: Breath of Life cleanses Lillia's Lilting Lullaby (sleep, slow, drowsy) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Lillia R Lilting Lullaby)
- **0.22** tenacity: Breath of Life's 65% tenacity shortens Lillia's Lilting Lullaby (sleep, slow). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Lillia R Lilting Lullaby)
- **0.19** range: Milio's basic attacks reach 200 units farther than Lillia's (525 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Milio basic attacks → Lillia basic attacks)

### 10. Yasuo (net +0.85)

- **0.80** projectile block: Wind Wall blocks Lillia's Lilting Lullaby, a projectile. Wind Wall for 4 s, long enough to use ahead of Lilting Lullaby. (Yasuo W Wind Wall → Lillia R Lilting Lullaby)
- **0.19** projectile block: Wind Wall blocks part of Lillia's Swirlseed, a projectile. Wind Wall for 4 s, long enough to use ahead of Swirlseed. Only part of the ability is a projectile. Swirlseed's origin is determined from Lillia's position at the start of cast, the rolling direction is determined from Lillia's position at the end of cast (when the projectile is created, not when the seed starts rolling). Projectile destroying effects will still make the rolling seed detonate upon colliding with them, but not when the initial arcing missile is destroyed.
  - If Unbreakable blocks the initial projectile, it is destroyed and deals 0 damage to him, as well as not triggering the cone-shaped area of effect. (Yasuo W Wind Wall → Lillia E Swirlseed)
- Watch out: Lillia's basic attacks reach 150 units farther than Yasuo's (325 vs 175 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Mel | +1.02 | 1.02 | 0.00 | projectile block (Rebuttal) |
| 2 | Samira | +1.02 | 1.02 | 0.00 | projectile block (Blade Whirl) |
| 3 | Aurora | +1.00 | 1.00 | 0.00 |  |
| 4 | Lissandra | +0.99 | 0.99 | 0.00 |  |
| 5 | Xayah | +0.99 | 0.99 | 0.00 |  |
| 6 | Elise | +0.98 | 0.98 | 0.00 |  |
| 7 | Bard | +0.97 | 0.97 | 0.00 |  |
| 8 | Morgana | +0.92 | 0.92 | 0.00 |  |
| 9 | Milio | +0.89 | 0.89 | 0.00 |  |
| 10 | Yasuo | +0.85 | 0.90 | 0.05 | projectile block (Wind Wall) |
| 11 | Master Yi | +0.84 | 1.02 | 0.18 |  |
| 12 | Fiora | +0.83 | 0.93 | 0.10 |  |
| 13 | Vladimir | +0.82 | 0.87 | 0.05 |  |
| 14 | Braum | +0.81 | 0.92 | 0.11 | projectile block (Unbreakable) |
| 15 | Kled | +0.81 | 0.83 | 0.02 |  |
| 16 | Camille | +0.79 | 0.84 | 0.05 |  |
| 17 | Rek'Sai | +0.79 | 0.84 | 0.05 |  |
| 18 | Kalista | +0.79 | 0.79 | 0.00 |  |
| 19 | Zaahen | +0.78 | 0.83 | 0.05 |  |
| 20 | Udyr | +0.75 | 0.86 | 0.11 |  |
| 21 | Warwick | +0.73 | 0.97 | 0.24 |  |
| 22 | Ekko | +0.73 | 0.80 | 0.07 |  |
| 23 | Evelynn | +0.73 | 0.80 | 0.07 |  |
| 24 | Shaco | +0.73 | 0.80 | 0.07 |  |
| 25 | Zed | +0.73 | 0.80 | 0.07 |  |
| 26 | Gwen | +0.70 | 0.80 | 0.10 |  |
| 27 | Maokai | +0.69 | 0.80 | 0.11 |  |
| 28 | Kayle | +0.67 | 0.67 | 0.00 |  |
| 29 | Sivir | +0.62 | 0.62 | 0.00 |  |
| 30 | Olaf | +0.61 | 0.83 | 0.22 |  |
| 31 | Kindred | +0.60 | 0.60 | 0.00 |  |
| 32 | Sion | +0.59 | 0.83 | 0.24 |  |
| 33 | Yuumi | +0.55 | 0.91 | 0.36 |  |
| 34 | Alistar | +0.55 | 0.66 | 0.11 |  |
| 35 | Rengar | +0.47 | 0.69 | 0.22 |  |
| 36 | Gangplank | +0.46 | 0.68 | 0.22 |  |
| 37 | Vex | +0.46 | 0.46 | 0.00 |  |
| 38 | Teemo | +0.45 | 0.45 | 0.00 |  |
| 39 | Jinx | +0.44 | 0.44 | 0.00 |  |
| 40 | Hwei | +0.43 | 0.43 | 0.00 |  |
| 41 | Viktor | +0.42 | 0.42 | 0.00 |  |
| 42 | Cassiopeia | +0.41 | 0.41 | 0.00 |  |
| 43 | Lulu | +0.41 | 0.41 | 0.00 |  |
| 44 | Ahri | +0.39 | 0.39 | 0.00 |  |
| 45 | Veigar | +0.38 | 0.38 | 0.00 |  |
| 46 | Kayn | +0.37 | 0.80 | 0.43 |  |
| 47 | Nocturne | +0.37 | 0.48 | 0.11 |  |
| 48 | Malzahar | +0.34 | 0.67 | 0.33 |  |
| 49 | Tristana | +0.34 | 0.34 | 0.00 |  |
| 50 | Aphelios | +0.33 | 0.33 | 0.00 |  |
| 51 | Xin Zhao | +0.32 | 0.40 | 0.08 |  |
| 52 | Pantheon | +0.30 | 0.40 | 0.10 |  |
| 53 | Garen | +0.27 | 0.43 | 0.16 |  |
| 54 | Singed | +0.26 | 0.48 | 0.22 |  |
| 55 | Ashe | +0.25 | 0.25 | 0.00 |  |
| 56 | Corki | +0.25 | 0.25 | 0.00 |  |
| 57 | Zeri | +0.25 | 0.25 | 0.00 |  |
| 58 | Varus | +0.24 | 0.29 | 0.05 |  |
| 59 | Twitch | +0.24 | 0.24 | 0.00 |  |
| 60 | Vayne | +0.24 | 0.24 | 0.00 |  |
| 61 | Sona | +0.23 | 0.23 | 0.00 |  |
| 62 | Heimerdinger | +0.22 | 0.22 | 0.00 |  |
| 63 | Renata Glasc | +0.22 | 0.22 | 0.00 |  |
| 64 | Senna | +0.22 | 0.22 | 0.00 |  |
| 65 | Yunara | +0.22 | 0.22 | 0.00 |  |
| 66 | Draven | +0.20 | 0.20 | 0.00 |  |
| 67 | Taric | +0.19 | 0.38 | 0.19 |  |
| 68 | Kai'Sa | +0.19 | 0.19 | 0.00 |  |
| 69 | Yone | +0.18 | 0.22 | 0.04 |  |
| 70 | Ezreal | +0.18 | 0.18 | 0.00 |  |
| 71 | Smolder | +0.18 | 0.18 | 0.00 |  |
| 72 | Zilean | +0.18 | 0.18 | 0.00 |  |
| 73 | Zoe | +0.18 | 0.18 | 0.00 |  |
| 74 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 75 | Annie | +0.16 | 0.16 | 0.00 |  |
| 76 | Gnar | +0.16 | 0.16 | 0.00 |  |
| 77 | Kennen | +0.16 | 0.16 | 0.00 |  |
| 78 | Lux | +0.16 | 0.16 | 0.00 |  |
| 79 | Nilah | +0.15 | 0.20 | 0.05 |  |
| 80 | Nidalee | +0.15 | 0.15 | 0.00 |  |
| 81 | Soraka | +0.15 | 0.15 | 0.00 |  |
| 82 | Ziggs | +0.15 | 0.15 | 0.00 |  |
| 83 | Zyra | +0.15 | 0.15 | 0.00 |  |
| 84 | Jayce | +0.14 | 0.14 | 0.00 |  |
| 85 | Seraphine | +0.14 | 0.14 | 0.00 |  |
| 86 | Azir | +0.13 | 0.13 | 0.00 |  |
| 87 | Kog'Maw | +0.13 | 0.13 | 0.00 |  |
| 88 | Orianna | +0.13 | 0.13 | 0.00 |  |
| 89 | Jax | +0.12 | 0.23 | 0.11 |  |
| 90 | Brand | +0.12 | 0.12 | 0.00 |  |
| 91 | Nami | +0.12 | 0.12 | 0.00 |  |
| 92 | Neeko | +0.12 | 0.12 | 0.00 |  |
| 93 | Syndra | +0.12 | 0.12 | 0.00 |  |
| 94 | Malphite | +0.11 | 0.22 | 0.11 |  |
| 95 | K'Sante | +0.11 | 0.16 | 0.05 |  |
| 96 | Karma | +0.11 | 0.11 | 0.00 |  |
| 97 | LeBlanc | +0.11 | 0.11 | 0.00 |  |
| 98 | Swain | +0.10 | 0.10 | 0.00 |  |
| 99 | Poppy | +0.08 | 0.38 | 0.30 |  |
| 100 | Graves | +0.08 | 0.08 | 0.00 |  |
| 101 | Thresh | +0.07 | 0.07 | 0.00 |  |
| 102 | Aurelion Sol | +0.06 | 0.12 | 0.06 |  |
| 103 | Quinn | +0.05 | 0.19 | 0.14 |  |
| 104 | Caitlyn | +0.04 | 0.29 | 0.25 |  |
| 105 | Jarvan IV | +0.04 | 0.08 | 0.04 |  |
| 106 | Amumu | +0.03 | 0.14 | 0.11 |  |
| 107 | Hecarim | +0.03 | 0.08 | 0.05 |  |
| 108 | Ornn | +0.03 | 0.08 | 0.05 |  |
| 109 | Volibear | +0.02 | 0.08 | 0.06 |  |
| 110 | Ivern | +0.01 | 0.08 | 0.07 |  |
| 111 | Zac | 0.00 | 0.30 | 0.30 |  |
| 112 | Nasus | 0.00 | 0.22 | 0.22 |  |
| 113 | Rakan | 0.00 | 0.00 | 0.00 |  |
| 114 | Urgot | 0.00 | 0.00 | 0.00 |  |
| 115 | Shyvana | -0.02 | 0.08 | 0.10 |  |
| 116 | Illaoi | -0.03 | 0.08 | 0.11 |  |
| 117 | Sett | -0.03 | 0.08 | 0.11 |  |
| 118 | Rammus | -0.04 | 0.22 | 0.26 |  |
| 119 | Fizz | -0.04 | 0.00 | 0.04 |  |
| 120 | Sylas | -0.04 | 0.00 | 0.04 |  |
| 121 | Briar | -0.05 | 0.00 | 0.05 |  |
| 122 | Wukong | -0.05 | 0.00 | 0.05 |  |
| 123 | Rell | -0.05 | 0.00 | 0.05 |  |
| 124 | Akshan | -0.06 | 0.16 | 0.22 |  |
| 125 | Skarner | -0.06 | 0.13 | 0.19 |  |
| 126 | Viego | -0.06 | 0.08 | 0.14 |  |
| 127 | Bel'Veth | -0.06 | 0.00 | 0.06 |  |
| 128 | Qiyana | -0.06 | 0.00 | 0.06 |  |
| 129 | Akali | -0.07 | 0.00 | 0.07 |  |
| 130 | Ambessa | -0.07 | 0.00 | 0.07 |  |
| 131 | Irelia | -0.07 | 0.00 | 0.07 |  |
| 132 | Lee Sin | -0.07 | 0.00 | 0.07 |  |
| 133 | Riven | -0.07 | 0.00 | 0.07 |  |
| 134 | Talon | -0.07 | 0.00 | 0.07 |  |
| 135 | Miss Fortune | -0.08 | 0.18 | 0.26 |  |
| 136 | Lucian | -0.08 | 0.17 | 0.25 |  |
| 137 | Aatrox | -0.08 | 0.00 | 0.08 |  |
| 138 | Nautilus | -0.08 | 0.00 | 0.08 |  |
| 139 | Tryndamere | -0.08 | 0.00 | 0.08 |  |
| 140 | Jhin | -0.10 | 0.15 | 0.25 |  |
| 141 | Vel'Koz | -0.10 | 0.13 | 0.23 |  |
| 142 | Diana | -0.10 | 0.00 | 0.10 |  |
| 143 | Kassadin | -0.10 | 0.00 | 0.10 |  |
| 144 | Sejuani | -0.10 | 0.00 | 0.10 |  |
| 145 | Mordekaiser | -0.11 | 0.05 | 0.16 |  |
| 146 | Kha'Zix | -0.11 | 0.00 | 0.11 |  |
| 147 | Leona | -0.11 | 0.00 | 0.11 |  |
| 148 | Locke | -0.11 | 0.00 | 0.11 |  |
| 149 | Renekton | -0.11 | 0.00 | 0.11 |  |
| 150 | Twisted Fate | -0.14 | 0.21 | 0.35 |  |
| 151 | Galio | -0.14 | 0.00 | 0.14 |  |
| 152 | Pyke | -0.14 | 0.00 | 0.14 |  |
| 153 | Xerath | -0.16 | 0.13 | 0.29 |  |
| 154 | Darius | -0.16 | 0.00 | 0.16 |  |
| 155 | Trundle | -0.16 | 0.00 | 0.16 |  |
| 156 | Yorick | -0.16 | 0.00 | 0.16 |  |
| 157 | Katarina | -0.17 | 0.12 | 0.29 |  |
| 158 | Janna | -0.18 | 0.20 | 0.38 |  |
| 159 | Vi | -0.21 | 0.08 | 0.29 |  |
| 160 | Karthus | -0.21 | 0.07 | 0.28 |  |
| 161 | Gragas | -0.21 | 0.00 | 0.21 |  |
| 162 | Ryze | -0.22 | 0.13 | 0.35 |  |
| 163 | Blitzcrank | -0.22 | 0.00 | 0.22 |  |
| 164 | Cho'Gath | -0.22 | 0.00 | 0.22 |  |
| 165 | Dr. Mundo | -0.22 | 0.00 | 0.22 |  |
| 166 | Rumble | -0.22 | 0.00 | 0.22 |  |
| 167 | Fiddlesticks | -0.25 | 0.09 | 0.34 |  |
| 168 | Nunu & Willump | -0.28 | 0.28 | 0.56 |  |
| 169 | Shen | -0.30 | 0.22 | 0.52 |  |
| 170 | Tahm Kench | -0.33 | 0.00 | 0.33 |  |
| 171 | Taliyah | -0.35 | 0.13 | 0.48 |  |
| 172 | Naafiri | -0.43 | 0.00 | 0.43 |  |
