# Counters to Samira (patch 26.20)

Every champion ranked by what its kit does against Samira's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Samira's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Samira` for the full ledger of a matchup, with sources.

## Top 10

### 1. Vladimir (net +0.41)

- **0.51** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Samira's Wild Rush. Untargetable for 2 s, long enough to use ahead of Wild Rush. (Vladimir W Sanguine Pool → Samira E Wild Rush)
- **0.32** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Samira's Inferno Trigger. Untargetable for 2 s, long enough to use ahead of Inferno Trigger. (Vladimir W Sanguine Pool → Samira R Inferno Trigger)
- Watch out: Blade Whirl blocks Vladimir's basic attacks, which are projectiles.

### 2. Pantheon (net +0.38)

- **0.48** invulnerable: Aegis Assault makes Pantheon invulnerable to Samira's Wild Rush. Invulnerable for 1.5 s, long enough to use ahead of Wild Rush. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Samira E Wild Rush)
- **0.31** invulnerable: Aegis Assault makes Pantheon invulnerable to Samira's Inferno Trigger. Invulnerable for 1.5 s, long enough to use ahead of Inferno Trigger. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Samira R Inferno Trigger)
- Watch out: Samira's basic attacks reach 325 units farther than Pantheon's (500 vs 175 attack range).

### 3. Master Yi (net +0.31)

- **0.48** untargetable: Alpha Strike makes Master Yi untargetable, dodging Samira's Wild Rush. Untargetable for ?; Wild Rush takes 0.41 s to land, enough to react. (Master Yi Q Alpha Strike → Samira E Wild Rush)
- **0.19** untargetable: Alpha Strike makes Master Yi untargetable, dodging Samira's Inferno Trigger. Untargetable for ?; Inferno Trigger lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Samira R Inferno Trigger)
- Watch out: Samira's basic attacks reach 325 units farther than Master Yi's (500 vs 175 attack range).

### 4. Malzahar (net +0.24)

- **0.22** cc immunity: Void Shift makes Malzahar immune to Samira's Daredevil Impulse (airborne). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Samira I Daredevil Impulse)
- **0.15** dash stop: Nether Grasp's knockdown can stop Samira's Wild Rush mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Malzahar R Nether Grasp → Samira E Wild Rush)
- **0.11** dash stop: Nether Grasp's knockdown can stop Samira's Daredevil Impulse mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Malzahar R Nether Grasp → Samira I Daredevil Impulse)
- Watch out: Blade Whirl blocks Malzahar's basic attacks, which are projectiles.

### 5. Camille (net +0.23)

- **0.29** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Samira's Wild Rush. Untargetable for 0.5 s; Wild Rush takes 0.41 s to land, enough to react. (Camille R The Hextech Ultimatum → Samira E Wild Rush)
- **0.14** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Samira's Inferno Trigger. Untargetable for 0.5 s; Inferno Trigger lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Camille R The Hextech Ultimatum → Samira R Inferno Trigger)
- **0.09** cc immunity: The Hextech Ultimatum is displacement immune, ignoring Samira's Daredevil Impulse (airborne) during it. Only during The Hextech Ultimatum (0.5 s). (Camille R The Hextech Ultimatum → Samira I Daredevil Impulse)
- Watch out: Samira's basic attacks reach 375 units farther than Camille's (500 vs 125 attack range).

### 6. Warwick (net +0.21)

- **0.22** cc immunity: Infinite Duress makes Warwick immune to Samira's Daredevil Impulse (airborne). Immune for ?; Daredevil Impulse takes 0.46 s to land, enough to react. (Warwick R Infinite Duress → Samira I Daredevil Impulse)
- **0.15** dash stop: Infinite Duress's knockdown can stop Samira's Wild Rush mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Warwick R Infinite Duress → Samira E Wild Rush)
- **0.11** dash stop: Infinite Duress's knockdown can stop Samira's Daredevil Impulse mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Warwick R Infinite Duress → Samira I Daredevil Impulse)
- Watch out: Samira's basic attacks reach 375 units farther than Warwick's (500 vs 125 attack range).

### 7. Nocturne (net +0.20)

- **0.60** spell shield: Shroud of Darkness's spell shield blocks Samira's Wild Rush. Spell shield for 1.5 s, long enough to use ahead of Wild Rush. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Samira E Wild Rush)
- **0.18** spell shield: Shroud of Darkness's spell shield blocks part of Samira's Inferno Trigger. Spell shield for 1.5 s, long enough to use ahead of Inferno Trigger. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the damage of one shot. (Nocturne W Shroud of Darkness → Samira R Inferno Trigger)
- **0.09** cc immunity: Paranoia is displacement immune, ignoring Samira's Daredevil Impulse (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Samira I Daredevil Impulse)
- Watch out: Samira's basic attacks reach 375 units farther than Nocturne's (500 vs 125 attack range).

### 8. Kayn (net +0.18)

- **0.29** untargetable: Umbral Trespass makes Kayn untargetable, dodging Samira's Wild Rush. Untargetable for 0.25 s; Wild Rush takes 0.41 s to land, enough to react. (Kayn R Umbral Trespass → Samira E Wild Rush)
- **0.14** untargetable: Umbral Trespass makes Kayn untargetable, dodging Samira's Inferno Trigger. Untargetable for 0.25 s; Inferno Trigger lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kayn R Umbral Trespass → Samira R Inferno Trigger)
- Watch out: Samira's basic attacks reach 325 units farther than Kayn's (500 vs 175 attack range).

### 9. Yasuo (net +0.16)

- **0.35** projectile block: Wind Wall blocks Samira's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Samira basic attacks)
- **0.32** projectile block: Wind Wall blocks Samira's Inferno Trigger, a projectile. Wind Wall for 4 s, long enough to use ahead of Inferno Trigger. (Yasuo W Wind Wall → Samira R Inferno Trigger)
- **0.13** projectile block: Wind Wall blocks part of Samira's Flair, a projectile. Wind Wall for 4 s, long enough to use ahead of Flair. Only part of the ability is a projectile. Only the shot will be destroyed by projectile-intercepting effects. (Yasuo W Wind Wall → Samira Q Flair)
- Watch out: Blade Whirl blocks part of Yasuo's Steel Tempest, a projectile.

### 10. Xin Zhao (net +0.14)

- **0.28** invulnerable: Crescent Guard makes Xin Zhao invulnerable to Samira's Wild Rush. Invulnerable for 4 s, long enough to use ahead of Wild Rush. Only invulnerable to champions a certain distance away. (Xin Zhao R Crescent Guard → Samira E Wild Rush)
- **0.24** invulnerable: Crescent Guard makes Xin Zhao invulnerable to Samira's Inferno Trigger. Invulnerable for 4 s, long enough to use ahead of Inferno Trigger. Only invulnerable to champions a certain distance away. (Xin Zhao R Crescent Guard → Samira R Inferno Trigger)
- Watch out: Samira's basic attacks reach 325 units farther than Xin Zhao's (500 vs 175 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Vladimir | +0.41 | 0.67 | 0.26 |  |
| 2 | Pantheon | +0.38 | 0.64 | 0.26 |  |
| 3 | Master Yi | +0.31 | 0.57 | 0.26 |  |
| 4 | Malzahar | +0.24 | 0.43 | 0.19 |  |
| 5 | Camille | +0.23 | 0.38 | 0.15 |  |
| 6 | Warwick | +0.21 | 0.41 | 0.20 |  |
| 7 | Nocturne | +0.20 | 0.78 | 0.58 |  |
| 8 | Kayn | +0.18 | 0.36 | 0.18 |  |
| 9 | Yasuo | +0.16 | 0.54 | 0.38 |  |
| 10 | Xin Zhao | +0.14 | 0.40 | 0.26 |  |
| 11 | Nilah | +0.08 | 0.30 | 0.22 |  |
| 12 | Shen | +0.06 | 0.33 | 0.27 |  |
| 13 | Jax | +0.05 | 0.35 | 0.30 |  |
| 14 | Rammus | +0.02 | 0.32 | 0.30 |  |
| 15 | Sivir | 0.00 | 0.56 | 0.56 |  |
| 16 | Kayle | 0.00 | 0.48 | 0.48 |  |
| 17 | Udyr | 0.00 | 0.45 | 0.45 |  |
| 18 | Aurora | -0.02 | 0.37 | 0.39 |  |
| 19 | Singed | -0.03 | 0.92 | 0.95 |  |
| 20 | Fiora | -0.03 | 0.63 | 0.66 |  |
| 21 | Jarvan IV | -0.04 | 0.09 | 0.13 |  |
| 22 | Rek'Sai | -0.05 | 0.43 | 0.48 |  |
| 23 | Bard | -0.05 | 0.41 | 0.46 |  |
| 24 | Elise | -0.06 | 0.57 | 0.63 |  |
| 25 | Ekko | -0.06 | 0.41 | 0.47 |  |
| 26 | Viktor | -0.06 | 0.39 | 0.45 |  |
| 27 | Yone | -0.08 | 0.30 | 0.38 |  |
| 28 | Yuumi | -0.09 | 0.77 | 0.86 |  |
| 29 | Zed | -0.10 | 0.35 | 0.45 |  |
| 30 | Volibear | -0.10 | 0.09 | 0.19 |  |
| 31 | Xayah | -0.11 | 0.40 | 0.51 |  |
| 32 | Vi | -0.11 | 0.09 | 0.20 |  |
| 33 | Evelynn | -0.12 | 0.36 | 0.48 |  |
| 34 | Shaco | -0.12 | 0.36 | 0.48 |  |
| 35 | Alistar | -0.13 | 0.17 | 0.30 |  |
| 36 | Lissandra | -0.16 | 0.46 | 0.62 |  |
| 37 | K'Sante | -0.16 | 0.18 | 0.34 |  |
| 38 | Taric | -0.17 | 0.40 | 0.57 |  |
| 39 | Wukong | -0.18 | 0.00 | 0.18 |  |
| 40 | Rell | -0.18 | 0.00 | 0.18 |  |
| 41 | Cassiopeia | -0.19 | 0.35 | 0.54 |  |
| 42 | Aurelion Sol | -0.19 | 0.00 | 0.19 |  |
| 43 | Bel'Veth | -0.19 | 0.00 | 0.19 |  |
| 44 | Ambessa | -0.20 | 0.00 | 0.20 |  |
| 45 | Karthus | -0.20 | 0.00 | 0.20 |  |
| 46 | Sett | -0.21 | 0.09 | 0.30 |  |
| 47 | Morgana | -0.22 | 0.35 | 0.57 |  |
| 48 | Gwen | -0.26 | 0.57 | 0.83 |  |
| 49 | Mel | -0.26 | 0.39 | 0.65 |  |
| 50 | Tryndamere | -0.26 | 0.00 | 0.26 |  |
| 51 | Zac | -0.28 | 0.41 | 0.69 |  |
| 52 | Nasus | -0.28 | 0.33 | 0.61 |  |
| 53 | Malphite | -0.28 | 0.30 | 0.58 |  |
| 54 | Renekton | -0.30 | 0.00 | 0.30 |  |
| 55 | Zeri | -0.31 | 0.00 | 0.31 |  |
| 56 | Lulu | -0.32 | 0.30 | 0.62 |  |
| 57 | Kalista | -0.32 | 0.16 | 0.48 |  |
| 58 | Nidalee | -0.32 | 0.00 | 0.32 |  |
| 59 | Annie | -0.33 | 0.05 | 0.38 |  |
| 60 | Teemo | -0.34 | 0.43 | 0.77 | blind (Blinding Dart) |
| 61 | Kindred | -0.34 | 0.35 | 0.69 |  |
| 62 | Jayce | -0.35 | 0.00 | 0.35 |  |
| 63 | Jinx | -0.36 | 0.41 | 0.77 |  |
| 64 | Veigar | -0.37 | 0.37 | 0.74 |  |
| 65 | Illaoi | -0.37 | 0.09 | 0.46 |  |
| 66 | Ryze | -0.37 | 0.00 | 0.37 |  |
| 67 | Rakan | -0.38 | 0.00 | 0.38 |  |
| 68 | Katarina | -0.39 | 0.38 | 0.77 |  |
| 69 | Soraka | -0.39 | 0.00 | 0.39 |  |
| 70 | Kennen | -0.40 | 0.00 | 0.40 |  |
| 71 | Naafiri | -0.42 | 0.00 | 0.42 |  |
| 72 | Orianna | -0.43 | 0.00 | 0.43 |  |
| 73 | Yunara | -0.44 | 0.05 | 0.49 |  |
| 74 | Vel'Koz | -0.44 | 0.00 | 0.44 |  |
| 75 | Sion | -0.45 | 0.22 | 0.67 |  |
| 76 | Mordekaiser | -0.45 | 0.08 | 0.53 |  |
| 77 | Lee Sin | -0.45 | 0.00 | 0.45 |  |
| 78 | Galio | -0.46 | 0.00 | 0.46 |  |
| 79 | Shyvana | -0.47 | 0.09 | 0.56 |  |
| 80 | Azir | -0.47 | 0.00 | 0.47 |  |
| 81 | Karma | -0.47 | 0.00 | 0.47 |  |
| 82 | Quinn | -0.47 | 0.00 | 0.47 |  |
| 83 | Zaahen | -0.48 | 0.21 | 0.69 |  |
| 84 | Gnar | -0.49 | 0.00 | 0.49 |  |
| 85 | LeBlanc | -0.49 | 0.00 | 0.49 |  |
| 86 | Twitch | -0.51 | 0.00 | 0.51 |  |
| 87 | Vex | -0.52 | 0.44 | 0.96 |  |
| 88 | Braum | -0.53 | 0.70 | 1.23 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 89 | Darius | -0.53 | 0.00 | 0.53 |  |
| 90 | Fizz | -0.53 | 0.00 | 0.53 |  |
| 91 | Garen | -0.53 | 0.00 | 0.53 |  |
| 92 | Kog'Maw | -0.53 | 0.00 | 0.53 |  |
| 93 | Miss Fortune | -0.53 | 0.00 | 0.53 |  |
| 94 | Trundle | -0.53 | 0.00 | 0.53 |  |
| 95 | Twisted Fate | -0.54 | 0.00 | 0.54 |  |
| 96 | Hwei | -0.55 | 0.41 | 0.96 |  |
| 97 | Gangplank | -0.55 | 0.30 | 0.85 |  |
| 98 | Olaf | -0.55 | 0.21 | 0.76 |  |
| 99 | Kai'Sa | -0.55 | 0.00 | 0.55 |  |
| 100 | Kassadin | -0.55 | 0.00 | 0.55 |  |
| 101 | Thresh | -0.55 | 0.00 | 0.55 |  |
| 102 | Anivia | -0.56 | 0.04 | 0.60 |  |
| 103 | Zyra | -0.56 | 0.03 | 0.59 |  |
| 104 | Zilean | -0.56 | 0.00 | 0.56 |  |
| 105 | Riven | -0.57 | 0.00 | 0.57 |  |
| 106 | Aatrox | -0.59 | 0.00 | 0.59 |  |
| 107 | Xerath | -0.60 | 0.00 | 0.60 |  |
| 108 | Diana | -0.62 | 0.00 | 0.62 |  |
| 109 | Varus | -0.63 | 0.41 | 1.04 |  |
| 110 | Corki | -0.63 | 0.09 | 0.72 |  |
| 111 | Milio | -0.63 | 0.00 | 0.63 |  |
| 112 | Tahm Kench | -0.64 | 0.00 | 0.64 |  |
| 113 | Poppy | -0.65 | 0.45 | 1.10 |  |
| 114 | Kled | -0.65 | 0.20 | 0.85 |  |
| 115 | Viego | -0.65 | 0.09 | 0.74 |  |
| 116 | Fiddlesticks | -0.65 | 0.00 | 0.65 |  |
| 117 | Neeko | -0.65 | 0.00 | 0.65 |  |
| 118 | Maokai | -0.66 | 0.72 | 1.38 |  |
| 119 | Ahri | -0.66 | 0.40 | 1.06 |  |
| 120 | Ivern | -0.66 | 0.00 | 0.66 |  |
| 121 | Lux | -0.67 | 0.00 | 0.67 |  |
| 122 | Talon | -0.67 | 0.00 | 0.67 |  |
| 123 | Aphelios | -0.68 | 0.00 | 0.68 |  |
| 124 | Swain | -0.69 | 0.00 | 0.69 |  |
| 125 | Vayne | -0.69 | 0.00 | 0.69 |  |
| 126 | Locke | -0.71 | 0.00 | 0.71 |  |
| 127 | Rengar | -0.72 | 0.36 | 1.08 |  |
| 128 | Pyke | -0.72 | 0.00 | 0.72 |  |
| 129 | Kha'Zix | -0.74 | 0.00 | 0.74 |  |
| 130 | Syndra | -0.74 | 0.00 | 0.74 |  |
| 131 | Caitlyn | -0.75 | 0.09 | 0.84 |  |
| 132 | Senna | -0.75 | 0.05 | 0.80 |  |
| 133 | Janna | -0.76 | 0.00 | 0.76 |  |
| 134 | Zoe | -0.78 | 0.00 | 0.78 |  |
| 135 | Brand | -0.79 | 0.00 | 0.79 |  |
| 136 | Lucian | -0.79 | 0.00 | 0.79 |  |
| 137 | Nautilus | -0.80 | 0.00 | 0.80 |  |
| 138 | Smolder | -0.80 | 0.00 | 0.80 |  |
| 139 | Sylas | -0.80 | 0.00 | 0.80 |  |
| 140 | Yorick | -0.81 | 0.00 | 0.81 |  |
| 141 | Akali | -0.82 | 0.00 | 0.82 |  |
| 142 | Amumu | -0.84 | 0.19 | 1.03 |  |
| 143 | Leona | -0.86 | 0.00 | 0.86 |  |
| 144 | Qiyana | -0.86 | 0.00 | 0.86 |  |
| 145 | Rumble | -0.86 | 0.00 | 0.86 |  |
| 146 | Skarner | -0.87 | 0.00 | 0.87 |  |
| 147 | Akshan | -0.88 | 0.00 | 0.88 |  |
| 148 | Draven | -0.88 | 0.00 | 0.88 |  |
| 149 | Cho'Gath | -0.89 | 0.00 | 0.89 |  |
| 150 | Dr. Mundo | -0.89 | 0.00 | 0.89 |  |
| 151 | Ezreal | -0.90 | 0.00 | 0.90 |  |
| 152 | Heimerdinger | -0.90 | 0.00 | 0.90 |  |
| 153 | Jhin | -0.91 | 0.00 | 0.91 |  |
| 154 | Ziggs | -0.91 | 0.00 | 0.91 |  |
| 155 | Tristana | -0.93 | 0.12 | 1.05 |  |
| 156 | Ashe | -0.96 | 0.06 | 1.02 |  |
| 157 | Graves | -1.02 | 0.00 | 1.02 |  |
| 158 | Irelia | -1.02 | 0.00 | 1.02 |  |
| 159 | Lillia | -1.02 | 0.00 | 1.02 |  |
| 160 | Sona | -1.02 | 0.00 | 1.02 |  |
| 161 | Hecarim | -1.09 | 0.09 | 1.18 |  |
| 162 | Nami | -1.11 | 0.00 | 1.11 |  |
| 163 | Urgot | -1.13 | 0.00 | 1.13 |  |
| 164 | Seraphine | -1.14 | 0.00 | 1.14 |  |
| 165 | Taliyah | -1.14 | 0.00 | 1.14 |  |
| 166 | Blitzcrank | -1.20 | 0.00 | 1.20 |  |
| 167 | Renata Glasc | -1.21 | 0.00 | 1.21 |  |
| 168 | Nunu & Willump | -1.22 | 0.00 | 1.22 |  |
| 169 | Gragas | -1.23 | 0.00 | 1.23 |  |
| 170 | Briar | -1.26 | 0.00 | 1.26 |  |
| 171 | Sejuani | -1.26 | 0.00 | 1.26 |  |
| 172 | Ornn | -1.30 | 0.09 | 1.39 |  |
