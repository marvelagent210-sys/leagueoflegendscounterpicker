# Counters to Elise (patch 26.20)

Every champion ranked by what its kit does against Elise's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Elise's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Elise` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +0.76)

- **0.51** spell shield: Spell Shield's spell shield blocks Elise's Cocoon. Spell shield for 1.5 s, long enough to use ahead of Cocoon. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Elise E Cocoon)
- **0.36** spell shield: Spell Shield's spell shield blocks Elise's Venomous Bite. Spell shield for 1.5 s, long enough to use ahead of Venomous Bite. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Elise Q Venomous Bite)
- **0.27** spell shield: Spell Shield's spell shield blocks Elise's Neurotoxin. Spell shield for 1.5 s, long enough to use ahead of Neurotoxin. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Elise Q Neurotoxin)

### 2. Kayle (net +0.42)

- **0.27** invulnerable: Divine Judgment makes Kayle invulnerable to Elise's Venomous Bite. Invulnerable for 2.5 s, long enough to use ahead of Venomous Bite. (Kayle R Divine Judgment → Elise Q Venomous Bite)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Elise's Neurotoxin. Invulnerable for 2.5 s, long enough to use ahead of Neurotoxin. (Kayle R Divine Judgment → Elise Q Neurotoxin)
- **0.05** range: Kayle's basic attacks reach 75 units farther than Elise's (625 vs 550 attack range). Elise closes the gap with Rappel, Venomous Bite. (Kayle basic attacks → Elise basic attacks)

### 3. Fiora (net +0.17)

- **0.64** parry: Riposte parries Elise's Cocoon and stuns back. Parry for 0.75 s; Cocoon takes 0.94 s to land, enough to react. Negating Cocoon's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Elise E Cocoon)
- **0.38** parry: Riposte parries Elise's Venomous Bite. Parry for 0.75 s; Venomous Bite takes 0.66 s to land, enough to react. (Fiora W Riposte → Elise Q Venomous Bite)
- **0.28** parry: Riposte parries Elise's Neurotoxin. Parry for 0.75 s; Neurotoxin takes 0.51 s to land, enough to react. (Fiora W Riposte → Elise Q Neurotoxin)
- Watch out: Rappel makes Elise untargetable, dodging Fiora's Riposte.

### 4. Vladimir (net +0.10)

- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Elise's Cocoon. Untargetable for 2 s, long enough to use ahead of Cocoon. (Vladimir W Sanguine Pool → Elise E Cocoon)
- **0.38** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Elise's Venomous Bite. Untargetable for 2 s, long enough to use ahead of Venomous Bite. (Vladimir W Sanguine Pool → Elise Q Venomous Bite)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Elise's Neurotoxin. Untargetable for 2 s, long enough to use ahead of Neurotoxin. (Vladimir W Sanguine Pool → Elise Q Neurotoxin)
- Watch out: Rappel makes Elise untargetable, dodging Vladimir's Hemoplague.

### 5. Samira (net +0.06)

- **0.47** projectile block: Blade Whirl blocks Elise's Cocoon, a projectile. Blade Whirl for 0.75 s; Cocoon takes 0.94 s to land, enough to react. (Samira W Blade Whirl → Elise E Cocoon)
- **0.25** projectile block: Blade Whirl blocks Elise's Neurotoxin, a projectile. Blade Whirl for 0.75 s; Neurotoxin takes 0.51 s to land, enough to react. (Samira W Blade Whirl → Elise Q Neurotoxin)
- **0.14** projectile block: Blade Whirl blocks Elise's basic attacks, which are projectiles (in Elise). Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Elise basic attacks)
- Watch out: Rappel makes Elise untargetable, dodging Samira's Wild Rush.

### 6. Kindred (net +0.06)

- **0.26** invulnerable: Lamb's Respite makes Kindred invulnerable to Elise's Venomous Bite. Invulnerable for ?; Venomous Bite takes 0.66 s to land, enough to react. (Kindred R Lamb's Respite → Elise Q Venomous Bite)
- **0.19** invulnerable: Lamb's Respite makes Kindred invulnerable to Elise's Neurotoxin. Invulnerable for ?; Neurotoxin takes 0.51 s to land, enough to react. (Kindred R Lamb's Respite → Elise Q Neurotoxin)
- Watch out: Rappel makes Elise untargetable, dodging Kindred's Mounting Dread.

### 7. Yuumi (net +0.05)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Elise's Cocoon. Untargetable for ?; Cocoon takes 0.94 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Elise E Cocoon)
- **0.60** untargetable: You and Me! makes Yuumi untargetable, dodging Elise's Venomous Bite. Untargetable for ?; Venomous Bite takes 0.66 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Elise Q Venomous Bite)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Elise's Neurotoxin. Untargetable for ?; Neurotoxin takes 0.51 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Elise Q Neurotoxin)
- Watch out: Rappel makes Elise untargetable, dodging Yuumi's Final Chapter.

### 8. Xayah (net +0.03)

- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Elise's Cocoon. Untargetable for 1.5 s, long enough to use ahead of Cocoon. (Xayah R Featherstorm → Elise E Cocoon)
- **0.26** untargetable: Featherstorm makes Xayah untargetable, dodging Elise's Venomous Bite. Untargetable for 1.5 s, long enough to use ahead of Venomous Bite. (Xayah R Featherstorm → Elise Q Venomous Bite)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Elise's Neurotoxin. Untargetable for 1.5 s, long enough to use ahead of Neurotoxin. (Xayah R Featherstorm → Elise Q Neurotoxin)
- Watch out: Rappel makes Elise untargetable, dodging Xayah's Featherstorm.

### 9. Yunara (net 0.00)

- No interaction in Yunara's favor.

### 10. Aurora (net -0.07)

- **0.32** untargetable: Between Worlds makes Aurora untargetable, dodging Elise's Cocoon. Untargetable for 0.4 s; Cocoon takes 0.94 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Elise E Cocoon)
- **0.26** untargetable: Between Worlds makes Aurora untargetable, dodging Elise's Venomous Bite. Untargetable for 0.4 s; Venomous Bite takes 0.66 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Elise Q Venomous Bite)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Elise's Neurotoxin. Untargetable for 0.4 s; Neurotoxin takes 0.51 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Elise Q Neurotoxin)
- Watch out: Rappel makes Elise untargetable, dodging Aurora's Between Worlds.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.76 | 0.76 | 0.00 |  |
| 2 | Kayle | +0.42 | 0.42 | 0.00 |  |
| 3 | Fiora | +0.17 | 0.91 | 0.74 |  |
| 4 | Vladimir | +0.10 | 0.80 | 0.70 |  |
| 5 | Samira | +0.06 | 0.63 | 0.57 | projectile block (Blade Whirl) |
| 6 | Kindred | +0.06 | 0.36 | 0.30 |  |
| 7 | Yuumi | +0.05 | 1.11 | 1.06 |  |
| 8 | Xayah | +0.03 | 0.50 | 0.47 |  |
| 9 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 10 | Aurora | -0.07 | 0.50 | 0.57 |  |
| 11 | Udyr | -0.08 | 0.70 | 0.78 |  |
| 12 | Gwen | -0.11 | 0.76 | 0.87 |  |
| 13 | Kai'Sa | -0.11 | 0.00 | 0.11 |  |
| 14 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 15 | Milio | -0.16 | 0.35 | 0.51 |  |
| 16 | Braum | -0.17 | 0.95 | 1.12 | projectile block (Unbreakable) |
| 17 | Mel | -0.20 | 0.60 | 0.80 | projectile block (Rebuttal) |
| 18 | Nidalee | -0.22 | 0.00 | 0.22 |  |
| 19 | Master Yi | -0.25 | 0.76 | 1.01 |  |
| 20 | Zed | -0.26 | 0.50 | 0.76 |  |
| 21 | Kog'Maw | -0.28 | 0.00 | 0.28 |  |
| 22 | Tryndamere | -0.30 | 0.00 | 0.30 |  |
| 23 | Teemo | -0.34 | 0.43 | 0.77 | blind (Blinding Dart) |
| 24 | Singed | -0.38 | 0.93 | 1.31 |  |
| 25 | Yasuo | -0.39 | 0.72 | 1.11 | projectile block (Wind Wall) |
| 26 | Lissandra | -0.41 | 0.53 | 0.94 |  |
| 27 | Bard | -0.42 | 0.52 | 0.94 |  |
| 28 | Morgana | -0.43 | 0.54 | 0.97 |  |
| 29 | Kalista | -0.43 | 0.25 | 0.68 |  |
| 30 | Lulu | -0.45 | 0.30 | 0.75 |  |
| 31 | Nocturne | -0.46 | 0.92 | 1.38 |  |
| 32 | Jinx | -0.48 | 0.23 | 0.71 |  |
| 33 | Pantheon | -0.51 | 0.50 | 1.01 |  |
| 34 | Vex | -0.51 | 0.19 | 0.70 |  |
| 35 | Ezreal | -0.55 | 0.00 | 0.55 |  |
| 36 | Zeri | -0.55 | 0.00 | 0.55 |  |
| 37 | LeBlanc | -0.56 | 0.00 | 0.56 |  |
| 38 | Maokai | -0.58 | 1.01 | 1.59 |  |
| 39 | Varus | -0.59 | 0.32 | 0.91 |  |
| 40 | Zilean | -0.59 | 0.00 | 0.59 |  |
| 41 | Olaf | -0.60 | 0.33 | 0.93 |  |
| 42 | Twisted Fate | -0.60 | 0.00 | 0.60 |  |
| 43 | Malzahar | -0.61 | 0.48 | 1.09 |  |
| 44 | Zoe | -0.61 | 0.00 | 0.61 |  |
| 45 | Jayce | -0.62 | 0.00 | 0.62 |  |
| 46 | Taric | -0.63 | 0.36 | 0.99 |  |
| 47 | Cassiopeia | -0.64 | 0.43 | 1.07 |  |
| 48 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 49 | Quinn | -0.65 | 0.00 | 0.65 |  |
| 50 | Soraka | -0.65 | 0.00 | 0.65 |  |
| 51 | Nasus | -0.67 | 0.33 | 1.00 |  |
| 52 | Shaco | -0.68 | 0.52 | 1.20 |  |
| 53 | Camille | -0.68 | 0.51 | 1.19 |  |
| 54 | Veigar | -0.69 | 0.20 | 0.89 |  |
| 55 | Karma | -0.69 | 0.00 | 0.69 |  |
| 56 | Smolder | -0.69 | 0.00 | 0.69 |  |
| 57 | Vayne | -0.70 | 0.00 | 0.70 |  |
| 58 | Jax | -0.71 | 0.47 | 1.18 |  |
| 59 | Viktor | -0.72 | 0.20 | 0.92 |  |
| 60 | Hwei | -0.74 | 0.23 | 0.97 |  |
| 61 | Nilah | -0.75 | 0.39 | 1.14 |  |
| 62 | Katarina | -0.75 | 0.32 | 1.07 |  |
| 63 | Kennen | -0.75 | 0.00 | 0.75 |  |
| 64 | Miss Fortune | -0.75 | 0.00 | 0.75 |  |
| 65 | Ekko | -0.77 | 0.55 | 1.32 |  |
| 66 | Rek'Sai | -0.77 | 0.52 | 1.29 |  |
| 67 | Ahri | -0.77 | 0.21 | 0.98 |  |
| 68 | Graves | -0.77 | 0.00 | 0.77 |  |
| 69 | Ashe | -0.80 | 0.00 | 0.80 |  |
| 70 | Sona | -0.80 | 0.00 | 0.80 |  |
| 71 | Corki | -0.81 | 0.00 | 0.81 |  |
| 72 | Heimerdinger | -0.81 | 0.00 | 0.81 |  |
| 73 | Lux | -0.81 | 0.00 | 0.81 |  |
| 74 | Annie | -0.82 | 0.03 | 0.85 |  |
| 75 | Brand | -0.84 | 0.00 | 0.84 |  |
| 76 | Draven | -0.84 | 0.00 | 0.84 |  |
| 77 | Gangplank | -0.87 | 0.46 | 1.33 |  |
| 78 | Illaoi | -0.87 | 0.00 | 0.87 |  |
| 79 | Locke | -0.87 | 0.00 | 0.87 |  |
| 80 | Aatrox | -0.90 | 0.00 | 0.90 |  |
| 81 | Akshan | -0.90 | 0.00 | 0.90 |  |
| 82 | Bel'Veth | -0.90 | 0.00 | 0.90 |  |
| 83 | Swain | -0.90 | 0.00 | 0.90 |  |
| 84 | Rengar | -0.91 | 0.56 | 1.47 |  |
| 85 | Tristana | -0.91 | 0.09 | 1.00 |  |
| 86 | Kayn | -0.92 | 0.52 | 1.44 |  |
| 87 | Ivern | -0.92 | 0.00 | 0.92 |  |
| 88 | Kassadin | -0.93 | 0.00 | 0.93 |  |
| 89 | Warwick | -0.94 | 0.41 | 1.35 |  |
| 90 | Shen | -0.95 | 0.45 | 1.40 |  |
| 91 | Syndra | -0.95 | 0.00 | 0.95 |  |
| 92 | Yorick | -0.95 | 0.00 | 0.95 |  |
| 93 | Lucian | -0.96 | 0.00 | 0.96 |  |
| 94 | Orianna | -0.96 | 0.00 | 0.96 |  |
| 95 | Vel'Koz | -0.96 | 0.00 | 0.96 |  |
| 96 | Ziggs | -0.96 | 0.00 | 0.96 |  |
| 97 | Alistar | -0.97 | 0.27 | 1.24 |  |
| 98 | Aurelion Sol | -0.97 | 0.00 | 0.97 |  |
| 99 | Azir | -0.97 | 0.00 | 0.97 |  |
| 100 | Lillia | -0.98 | 0.00 | 0.98 |  |
| 101 | Ryze | -0.98 | 0.00 | 0.98 |  |
| 102 | Sion | -0.99 | 0.35 | 1.34 |  |
| 103 | Karthus | -0.99 | 0.00 | 0.99 |  |
| 104 | Anivia | -1.00 | 0.00 | 1.00 |  |
| 105 | Kha'Zix | -1.00 | 0.00 | 1.00 |  |
| 106 | Talon | -1.00 | 0.00 | 1.00 |  |
| 107 | Renekton | -1.01 | 0.00 | 1.01 |  |
| 108 | Kled | -1.02 | 0.32 | 1.34 |  |
| 109 | Gnar | -1.02 | 0.00 | 1.02 |  |
| 110 | Lee Sin | -1.02 | 0.00 | 1.02 |  |
| 111 | Sylas | -1.02 | 0.00 | 1.02 |  |
| 112 | Caitlyn | -1.03 | 0.06 | 1.09 |  |
| 113 | Wukong | -1.03 | 0.00 | 1.03 |  |
| 114 | Xerath | -1.03 | 0.00 | 1.03 |  |
| 115 | Riven | -1.04 | 0.00 | 1.04 |  |
| 116 | Shyvana | -1.05 | 0.00 | 1.05 |  |
| 117 | Thresh | -1.05 | 0.00 | 1.05 |  |
| 118 | Aphelios | -1.06 | 0.00 | 1.06 |  |
| 119 | Senna | -1.06 | 0.00 | 1.06 |  |
| 120 | Seraphine | -1.07 | 0.00 | 1.07 |  |
| 121 | Zyra | -1.07 | 0.00 | 1.07 |  |
| 122 | Fizz | -1.10 | 0.00 | 1.10 |  |
| 123 | Xin Zhao | -1.11 | 0.36 | 1.47 |  |
| 124 | Zaahen | -1.11 | 0.33 | 1.44 |  |
| 125 | Nami | -1.12 | 0.00 | 1.12 |  |
| 126 | Renata Glasc | -1.13 | 0.00 | 1.13 |  |
| 127 | Garen | -1.14 | 0.18 | 1.32 |  |
| 128 | Evelynn | -1.15 | 0.52 | 1.67 |  |
| 129 | Neeko | -1.17 | 0.00 | 1.17 |  |
| 130 | Sett | -1.18 | 0.00 | 1.18 |  |
| 131 | Hecarim | -1.20 | 0.00 | 1.20 |  |
| 132 | Rumble | -1.20 | 0.00 | 1.20 |  |
| 133 | Poppy | -1.21 | 0.41 | 1.62 |  |
| 134 | Irelia | -1.21 | 0.00 | 1.21 |  |
| 135 | Jhin | -1.21 | 0.00 | 1.21 |  |
| 136 | Ambessa | -1.22 | 0.00 | 1.22 |  |
| 137 | Akali | -1.23 | 0.00 | 1.23 |  |
| 138 | Malphite | -1.26 | 0.21 | 1.47 |  |
| 139 | Yone | -1.29 | 0.13 | 1.42 |  |
| 140 | Rakan | -1.31 | 0.00 | 1.31 |  |
| 141 | Mordekaiser | -1.32 | 0.08 | 1.40 |  |
| 142 | Janna | -1.32 | 0.00 | 1.32 |  |
| 143 | Diana | -1.33 | 0.00 | 1.33 |  |
| 144 | Urgot | -1.33 | 0.00 | 1.33 |  |
| 145 | Fiddlesticks | -1.34 | 0.00 | 1.34 |  |
| 146 | Amumu | -1.39 | 0.13 | 1.52 |  |
| 147 | Jarvan IV | -1.39 | 0.00 | 1.39 |  |
| 148 | Nautilus | -1.40 | 0.00 | 1.40 |  |
| 149 | Volibear | -1.41 | 0.00 | 1.41 |  |
| 150 | Galio | -1.42 | 0.00 | 1.42 |  |
| 151 | Leona | -1.48 | 0.00 | 1.48 |  |
| 152 | Cho'Gath | -1.49 | 0.00 | 1.49 |  |
| 153 | Briar | -1.50 | 0.00 | 1.50 |  |
| 154 | Rammus | -1.51 | 0.32 | 1.83 |  |
| 155 | Naafiri | -1.51 | 0.00 | 1.51 |  |
| 156 | Trundle | -1.52 | 0.00 | 1.52 |  |
| 157 | Darius | -1.54 | 0.00 | 1.54 |  |
| 158 | Rell | -1.56 | 0.00 | 1.56 |  |
| 159 | Qiyana | -1.58 | 0.00 | 1.58 |  |
| 160 | Skarner | -1.59 | 0.00 | 1.59 |  |
| 161 | Sejuani | -1.61 | 0.00 | 1.61 |  |
| 162 | K'Sante | -1.63 | 0.00 | 1.63 |  |
| 163 | Ornn | -1.63 | 0.00 | 1.63 |  |
| 164 | Blitzcrank | -1.64 | 0.00 | 1.64 |  |
| 165 | Pyke | -1.67 | 0.00 | 1.67 |  |
| 166 | Gragas | -1.68 | 0.00 | 1.68 |  |
| 167 | Viego | -1.75 | 0.00 | 1.75 |  |
| 168 | Zac | -1.78 | 0.26 | 2.04 |  |
| 169 | Vi | -1.78 | 0.00 | 1.78 |  |
| 170 | Taliyah | -1.85 | 0.00 | 1.85 |  |
| 171 | Tahm Kench | -2.00 | 0.00 | 2.00 |  |
| 172 | Nunu & Willump | -2.13 | 0.00 | 2.13 |  |
