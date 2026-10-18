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

### 2. Yasuo (net +0.86)

- **0.80** projectile block: Wind Wall blocks Tristana's Buster Shot, a projectile. Wind Wall for 4 s, long enough to use ahead of Buster Shot. (Yasuo W Wind Wall → Tristana R Buster Shot)
- **0.40** projectile block: Wind Wall blocks Tristana's Explosive Charge, a projectile. Wind Wall for 4 s, long enough to use ahead of Explosive Charge. (Yasuo W Wind Wall → Tristana E Explosive Charge)
- **0.39** projectile block: Wind Wall blocks Tristana's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Tristana basic attacks)
- Watch out: Tristana's basic attacks reach 525 units farther than Yasuo's (700 vs 175 attack range).

### 3. Aurora (net +0.81)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Tristana's Buster Shot. Untargetable for 0.4 s; Buster Shot takes 0.6 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Tristana R Buster Shot)
- **0.11** untargetable: Between Worlds can deny the initial targeting of Tristana's Explosive Charge, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Does not destroy inbound projectiles. Explosive Charge's detonation will deal damage to the primary target even if they have become untargetable. (Aurora R Between Worlds → Tristana E Explosive Charge)
- **0.08** cc immunity: Between Worlds is displacement immune, ignoring Tristana's Buster Shot (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Tristana R Buster Shot)
- Watch out: Tristana's basic attacks reach 150 units farther than Aurora's (700 vs 550 attack range).

### 4. Braum (net +0.80)

- **0.80** projectile block: Unbreakable blocks Tristana's Buster Shot, a projectile. Unbreakable for 4 s, long enough to use ahead of Buster Shot. (Braum E Unbreakable → Tristana R Buster Shot)
- **0.50** projectile block: Unbreakable blocks Tristana's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Tristana basic attacks)
- **0.45** projectile block: Unbreakable blocks Tristana's Explosive Charge, a projectile. Unbreakable for 4 s, long enough to use ahead of Explosive Charge. (Braum E Unbreakable → Tristana E Explosive Charge)
- Watch out: Tristana's basic attacks reach 575 units farther than Braum's (700 vs 125 attack range).

### 5. Fiora (net +0.77)

- **0.90** parry: Riposte parries Tristana's Buster Shot and stuns back. Parry for 0.75 s; Buster Shot takes 0.6 s to land, enough to react. Negating Buster Shot's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Tristana R Buster Shot)
- **0.42** parry: Riposte parries Tristana's Explosive Charge. Parry for 0.75 s; Explosive Charge takes 100.29 s to land, enough to react. (Fiora W Riposte → Tristana E Explosive Charge)
- **0.09** attack speed slow: Riposte cuts Tristana's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Tristana basic attacks)
- Watch out: Tristana's basic attacks reach 550 units farther than Fiora's (700 vs 150 attack range).

### 6. Mel (net +0.77)

- **0.80** projectile block: Rebuttal blocks Tristana's Buster Shot, a projectile. Rebuttal for 0.75 s; Buster Shot takes 0.6 s to land, enough to react. (Mel W Rebuttal → Tristana R Buster Shot)
- **0.33** projectile block: Rebuttal blocks Tristana's Explosive Charge, a projectile. Rebuttal for 0.75 s; Explosive Charge takes 100.29 s to land, enough to react. (Mel W Rebuttal → Tristana E Explosive Charge)
- **0.30** projectile block: Rebuttal blocks Tristana's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Tristana basic attacks)
- Watch out: Tristana's basic attacks reach 150 units farther than Mel's (700 vs 550 attack range).

### 7. Lissandra (net +0.76)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Tristana's Buster Shot. Untargetable for 2.5 s, long enough to use ahead of Buster Shot. (Lissandra R Frozen Tomb → Tristana R Buster Shot)
- **0.15** dash stop: Frozen Tomb's knockdown can stop Tristana's Rocket Jump mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Tristana W Rocket Jump)
- **0.11** untargetable: Frozen Tomb can deny the initial targeting of Tristana's Explosive Charge, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Explosive Charge's detonation will deal damage to the primary target even if they have become untargetable. (Lissandra R Frozen Tomb → Tristana E Explosive Charge)
- Watch out: Tristana's basic attacks reach 150 units farther than Lissandra's (700 vs 550 attack range).

### 8. Nocturne (net +0.75)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Tristana's Buster Shot. Spell shield for 1.5 s, long enough to use ahead of Buster Shot. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Tristana R Buster Shot)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Tristana's Explosive Charge. Spell shield for 1.5 s, long enough to use ahead of Explosive Charge. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Tristana E Explosive Charge)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Tristana's Buster Shot (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Tristana R Buster Shot)
- Watch out: Tristana's basic attacks reach 575 units farther than Nocturne's (700 vs 125 attack range).

### 9. Fizz (net +0.74)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Tristana's Buster Shot. Untargetable for 0.75 s; Buster Shot takes 0.6 s to land, enough to react. (Fizz E Playful → Tristana R Buster Shot)
- **0.23** untargetable: Playful can deny the initial targeting of Tristana's Explosive Charge, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Explosive Charge's detonation will deal damage to the primary target even if they have become untargetable. (Fizz E Playful → Tristana E Explosive Charge)
- Watch out: Tristana's basic attacks reach 525 units farther than Fizz's (700 vs 175 attack range).

### 10. Camille (net +0.70)

- **0.80** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Tristana's Buster Shot. Untargetable for 0.5 s; Buster Shot takes 0.6 s to land, enough to react. (Camille R The Hextech Ultimatum → Tristana R Buster Shot)
- **0.11** untargetable: The Hextech Ultimatum can deny the initial targeting of Tristana's Explosive Charge, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Explosive Charge's detonation will deal damage to the primary target even if they have become untargetable. (Camille R The Hextech Ultimatum → Tristana E Explosive Charge)
- **0.08** cc immunity: The Hextech Ultimatum is displacement immune, ignoring Tristana's Buster Shot (airborne) during it. Only during The Hextech Ultimatum (0.5 s). (Camille R The Hextech Ultimatum → Tristana R Buster Shot)
- Watch out: Tristana's basic attacks reach 575 units farther than Camille's (700 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +0.93 | 1.05 | 0.12 | projectile block (Blade Whirl) |
| 2 | Yasuo | +0.86 | 1.10 | 0.24 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 3 | Aurora | +0.81 | 0.88 | 0.07 |  |
| 4 | Braum | +0.80 | 1.16 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Fiora | +0.77 | 1.13 | 0.36 |  |
| 6 | Mel | +0.77 | 1.04 | 0.27 | projectile block (Rebuttal) |
| 7 | Lissandra | +0.76 | 0.90 | 0.14 |  |
| 8 | Nocturne | +0.75 | 1.11 | 0.36 |  |
| 9 | Fizz | +0.74 | 0.92 | 0.18 |  |
| 10 | Camille | +0.70 | 0.88 | 0.18 |  |
| 11 | Bard | +0.68 | 0.86 | 0.18 |  |
| 12 | Sivir | +0.64 | 1.00 | 0.36 |  |
| 13 | Rek'Sai | +0.64 | 0.88 | 0.24 |  |
| 14 | Evelynn | +0.62 | 0.86 | 0.24 |  |
| 15 | Shaco | +0.62 | 0.86 | 0.24 |  |
| 16 | Zed | +0.62 | 0.86 | 0.24 |  |
| 17 | Kled | +0.62 | 0.80 | 0.18 |  |
| 18 | Zaahen | +0.60 | 0.84 | 0.24 |  |
| 19 | Maokai | +0.56 | 0.92 | 0.36 |  |
| 20 | Master Yi | +0.54 | 1.00 | 0.46 |  |
| 21 | Gwen | +0.54 | 0.90 | 0.36 |  |
| 22 | Xayah | +0.54 | 0.86 | 0.32 |  |
| 23 | Udyr | +0.52 | 0.88 | 0.36 |  |
| 24 | Kalista | +0.50 | 0.61 | 0.11 |  |
| 25 | Morgana | +0.42 | 0.87 | 0.45 |  |
| 26 | Vladimir | +0.41 | 0.91 | 0.50 |  |
| 27 | Kayle | +0.38 | 0.52 | 0.14 |  |
| 28 | Milio | +0.36 | 0.68 | 0.32 |  |
| 29 | Alistar | +0.31 | 0.67 | 0.36 |  |
| 30 | Yuumi | +0.29 | 0.92 | 0.63 |  |
| 31 | Warwick | +0.24 | 0.98 | 0.74 |  |
| 32 | Kayn | +0.22 | 0.86 | 0.64 |  |
| 33 | Vex | +0.22 | 0.36 | 0.14 |  |
| 34 | Ahri | +0.16 | 0.30 | 0.14 |  |
| 35 | Xin Zhao | +0.15 | 0.51 | 0.36 |  |
| 36 | Jax | +0.14 | 0.50 | 0.36 |  |
| 37 | Olaf | +0.12 | 0.84 | 0.72 |  |
| 38 | Teemo | +0.11 | 0.47 | 0.36 | blind (Blinding Dart) |
| 39 | Lulu | +0.07 | 0.34 | 0.27 |  |
| 40 | Nilah | +0.06 | 0.42 | 0.36 |  |
| 41 | Yone | +0.05 | 0.23 | 0.18 |  |
| 42 | Sion | +0.04 | 0.84 | 0.80 |  |
| 43 | Hwei | +0.03 | 0.30 | 0.27 |  |
| 44 | Veigar | +0.03 | 0.30 | 0.27 |  |
| 45 | Cassiopeia | +0.02 | 0.29 | 0.27 |  |
| 46 | Gangplank | -0.02 | 0.70 | 0.72 |  |
| 47 | Rengar | -0.02 | 0.70 | 0.72 |  |
| 48 | Jinx | -0.02 | 0.30 | 0.32 |  |
| 49 | Viktor | -0.02 | 0.30 | 0.32 |  |
| 50 | K'Sante | -0.02 | 0.16 | 0.18 |  |
| 51 | Malphite | -0.04 | 0.32 | 0.36 |  |
| 52 | Elise | -0.09 | 0.00 | 0.09 |  |
| 53 | Jarvan IV | -0.10 | 0.08 | 0.18 |  |
| 54 | Azir | -0.11 | 0.00 | 0.11 |  |
| 55 | Gnar | -0.11 | 0.00 | 0.11 |  |
| 56 | Yunara | -0.11 | 0.00 | 0.11 |  |
| 57 | Pantheon | -0.12 | 0.60 | 0.72 |  |
| 58 | Malzahar | -0.12 | 0.59 | 0.71 |  |
| 59 | Annie | -0.14 | 0.00 | 0.14 |  |
| 60 | Corki | -0.14 | 0.00 | 0.14 |  |
| 61 | Ezreal | -0.14 | 0.00 | 0.14 |  |
| 62 | Neeko | -0.14 | 0.00 | 0.14 |  |
| 63 | Vayne | -0.14 | 0.00 | 0.14 |  |
| 64 | Zeri | -0.14 | 0.00 | 0.14 |  |
| 65 | Ziggs | -0.14 | 0.00 | 0.14 |  |
| 66 | Zoe | -0.14 | 0.00 | 0.14 |  |
| 67 | Rammus | -0.15 | 0.36 | 0.51 |  |
| 68 | Thresh | -0.15 | 0.00 | 0.15 |  |
| 69 | Hecarim | -0.16 | 0.08 | 0.24 |  |
| 70 | Ornn | -0.16 | 0.08 | 0.24 |  |
| 71 | Volibear | -0.16 | 0.08 | 0.24 |  |
| 72 | Graves | -0.16 | 0.00 | 0.16 |  |
| 73 | Kai'Sa | -0.16 | 0.00 | 0.16 |  |
| 74 | LeBlanc | -0.16 | 0.00 | 0.16 |  |
| 75 | Nidalee | -0.16 | 0.00 | 0.16 |  |
| 76 | Poppy | -0.18 | 0.38 | 0.56 |  |
| 77 | Anivia | -0.18 | 0.00 | 0.18 |  |
| 78 | Ashe | -0.18 | 0.00 | 0.18 |  |
| 79 | Briar | -0.18 | 0.00 | 0.18 |  |
| 80 | Jayce | -0.18 | 0.00 | 0.18 |  |
| 81 | Kindred | -0.18 | 0.00 | 0.18 |  |
| 82 | Senna | -0.18 | 0.00 | 0.18 |  |
| 83 | Sylas | -0.18 | 0.00 | 0.18 |  |
| 84 | Aurelion Sol | -0.20 | 0.00 | 0.20 |  |
| 85 | Shen | -0.21 | 0.48 | 0.69 |  |
| 86 | Amumu | -0.21 | 0.15 | 0.36 |  |
| 87 | Viego | -0.21 | 0.08 | 0.29 |  |
| 88 | Aphelios | -0.21 | 0.06 | 0.27 |  |
| 89 | Heimerdinger | -0.21 | 0.06 | 0.27 |  |
| 90 | Zyra | -0.22 | 0.00 | 0.22 |  |
| 91 | Akali | -0.24 | 0.00 | 0.24 |  |
| 92 | Ambessa | -0.24 | 0.00 | 0.24 |  |
| 93 | Bel'Veth | -0.24 | 0.00 | 0.24 |  |
| 94 | Ekko | -0.24 | 0.00 | 0.24 |  |
| 95 | Lee Sin | -0.24 | 0.00 | 0.24 |  |
| 96 | Wukong | -0.24 | 0.00 | 0.24 |  |
| 97 | Qiyana | -0.24 | 0.00 | 0.24 |  |
| 98 | Rakan | -0.24 | 0.00 | 0.24 |  |
| 99 | Rell | -0.24 | 0.00 | 0.24 |  |
| 100 | Riven | -0.24 | 0.00 | 0.24 |  |
| 101 | Talon | -0.24 | 0.00 | 0.24 |  |
| 102 | Caitlyn | -0.26 | 0.00 | 0.26 |  |
| 103 | Brand | -0.27 | 0.00 | 0.27 |  |
| 104 | Draven | -0.27 | 0.00 | 0.27 |  |
| 105 | Ivern | -0.27 | 0.00 | 0.27 |  |
| 106 | Kennen | -0.27 | 0.00 | 0.27 |  |
| 107 | Lux | -0.27 | 0.00 | 0.27 |  |
| 108 | Nami | -0.27 | 0.00 | 0.27 |  |
| 109 | Renata Glasc | -0.27 | 0.00 | 0.27 |  |
| 110 | Smolder | -0.27 | 0.00 | 0.27 |  |
| 111 | Sona | -0.27 | 0.00 | 0.27 |  |
| 112 | Soraka | -0.27 | 0.00 | 0.27 |  |
| 113 | Syndra | -0.27 | 0.00 | 0.27 |  |
| 114 | Twitch | -0.27 | 0.00 | 0.27 |  |
| 115 | Varus | -0.27 | 0.00 | 0.27 |  |
| 116 | Zilean | -0.27 | 0.00 | 0.27 |  |
| 117 | Illaoi | -0.28 | 0.08 | 0.36 |  |
| 118 | Sett | -0.28 | 0.08 | 0.36 |  |
| 119 | Shyvana | -0.28 | 0.08 | 0.36 |  |
| 120 | Zac | -0.29 | 0.30 | 0.59 |  |
| 121 | Quinn | -0.30 | 0.00 | 0.30 |  |
| 122 | Karma | -0.32 | 0.00 | 0.32 |  |
| 123 | Orianna | -0.32 | 0.00 | 0.32 |  |
| 124 | Pyke | -0.32 | 0.00 | 0.32 |  |
| 125 | Seraphine | -0.32 | 0.00 | 0.32 |  |
| 126 | Swain | -0.32 | 0.00 | 0.32 |  |
| 127 | Urgot | -0.32 | 0.00 | 0.32 |  |
| 128 | Lillia | -0.34 | 0.00 | 0.34 |  |
| 129 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 130 | Aatrox | -0.36 | 0.00 | 0.36 |  |
| 131 | Diana | -0.36 | 0.00 | 0.36 |  |
| 132 | Irelia | -0.36 | 0.00 | 0.36 |  |
| 133 | Kassadin | -0.36 | 0.00 | 0.36 |  |
| 134 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 135 | Kog'Maw | -0.36 | 0.00 | 0.36 |  |
| 136 | Leona | -0.36 | 0.00 | 0.36 |  |
| 137 | Locke | -0.36 | 0.00 | 0.36 |  |
| 138 | Nautilus | -0.36 | 0.00 | 0.36 |  |
| 139 | Renekton | -0.36 | 0.00 | 0.36 |  |
| 140 | Sejuani | -0.36 | 0.00 | 0.36 |  |
| 141 | Tryndamere | -0.36 | 0.00 | 0.36 |  |
| 142 | Garen | -0.37 | 0.35 | 0.72 |  |
| 143 | Vi | -0.38 | 0.08 | 0.46 |  |
| 144 | Akshan | -0.41 | 0.00 | 0.41 |  |
| 145 | Singed | -0.42 | 0.30 | 0.72 |  |
| 146 | Lucian | -0.44 | 0.00 | 0.44 |  |
| 147 | Gragas | -0.46 | 0.00 | 0.46 |  |
| 148 | Fiddlesticks | -0.49 | 0.00 | 0.49 |  |
| 149 | Ryze | -0.49 | 0.00 | 0.49 |  |
| 150 | Twisted Fate | -0.51 | 0.00 | 0.51 |  |
| 151 | Jhin | -0.53 | 0.00 | 0.53 |  |
| 152 | Katarina | -0.54 | 0.00 | 0.54 |  |
| 153 | Miss Fortune | -0.55 | 0.00 | 0.55 |  |
| 154 | Vel'Koz | -0.56 | 0.00 | 0.56 |  |
| 155 | Naafiri | -0.58 | 0.00 | 0.58 |  |
| 156 | Tahm Kench | -0.61 | 0.00 | 0.61 |  |
| 157 | Mordekaiser | -0.63 | 0.09 | 0.72 |  |
| 158 | Xerath | -0.63 | 0.00 | 0.63 |  |
| 159 | Taliyah | -0.64 | 0.00 | 0.64 |  |
| 160 | Skarner | -0.65 | 0.07 | 0.72 |  |
| 161 | Janna | -0.67 | 0.00 | 0.67 |  |
| 162 | Blitzcrank | -0.72 | 0.00 | 0.72 |  |
| 163 | Cho'Gath | -0.72 | 0.00 | 0.72 |  |
| 164 | Darius | -0.72 | 0.00 | 0.72 |  |
| 165 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 166 | Rumble | -0.72 | 0.00 | 0.72 |  |
| 167 | Taric | -0.72 | 0.00 | 0.72 |  |
| 168 | Trundle | -0.72 | 0.00 | 0.72 |  |
| 169 | Yorick | -0.72 | 0.00 | 0.72 |  |
| 170 | Karthus | -0.73 | 0.00 | 0.73 |  |
| 171 | Galio | -0.78 | 0.00 | 0.78 |  |
| 172 | Nunu & Willump | -0.89 | 0.18 | 1.07 |  |
