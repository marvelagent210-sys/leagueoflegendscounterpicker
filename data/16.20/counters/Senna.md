# Counters to Senna (patch 26.20)

Every champion ranked by what its kit does against Senna's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Senna's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Senna` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.06)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Senna's Dawning Shadow. Untargetable for 0.6 s; Dawning Shadow takes 1 s to land, enough to react. (Elise E Rappel → Senna R Dawning Shadow)
- **0.54** untargetable: Rappel makes Elise untargetable, dodging Senna's Last Embrace. Untargetable for 0.6 s; Last Embrace takes 1.33 s to land, enough to react. (Elise E Rappel → Senna W Last Embrace)
- **0.41** untargetable: Rappel makes Elise untargetable, dodging Senna's Piercing Darkness. Untargetable for 0.6 s; Piercing Darkness takes 80 s to land, enough to react. (Elise E Rappel → Senna Q Piercing Darkness)

### 2. Yuumi (net +0.99)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Senna's Last Embrace. Untargetable for ?; Last Embrace takes 1.33 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Senna W Last Embrace)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Senna's Dawning Shadow. Untargetable for ?; Dawning Shadow takes 1 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Senna R Dawning Shadow)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Senna's Piercing Darkness. Untargetable for ?; Piercing Darkness takes 80 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Senna Q Piercing Darkness)
- Watch out: Senna's basic attacks reach 175 units farther than Yuumi's (600 vs 425 attack range).

### 3. Maokai (net +0.81)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Senna's Last Embrace. Untargetable for 1.4 s; Last Embrace takes 1.33 s to land, enough to react. (Maokai W Twisted Advance → Senna W Last Embrace)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Senna's Dawning Shadow. Untargetable for 1.4 s; Dawning Shadow takes 1 s to land, enough to react. (Maokai W Twisted Advance → Senna R Dawning Shadow)
- **0.45** untargetable: Twisted Advance makes Maokai untargetable, dodging Senna's Piercing Darkness. Untargetable for 1.4 s; Piercing Darkness takes 80 s to land, enough to react. (Maokai W Twisted Advance → Senna Q Piercing Darkness)
- Watch out: Senna's basic attacks reach 475 units farther than Maokai's (600 vs 125 attack range).

### 4. Lissandra (net +0.80)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Senna's Dawning Shadow. Untargetable for 2.5 s, long enough to use ahead of Dawning Shadow. (Lissandra R Frozen Tomb → Senna R Dawning Shadow)
- **0.34** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Senna's Last Embrace. Untargetable for 2.5 s, long enough to use ahead of Last Embrace. (Lissandra R Frozen Tomb → Senna W Last Embrace)
- **0.23** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Senna's Piercing Darkness. Untargetable for 2.5 s, long enough to use ahead of Piercing Darkness. (Lissandra R Frozen Tomb → Senna Q Piercing Darkness)

### 5. Aurora (net +0.79)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Senna's Dawning Shadow. Untargetable for 0.4 s; Dawning Shadow takes 1 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Senna R Dawning Shadow)
- **0.33** untargetable: Between Worlds makes Aurora untargetable, dodging Senna's Last Embrace. Untargetable for 0.4 s; Last Embrace takes 1.33 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Senna W Last Embrace)
- **0.22** untargetable: Between Worlds makes Aurora untargetable, dodging Senna's Piercing Darkness. Untargetable for 0.4 s; Piercing Darkness takes 80 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Senna Q Piercing Darkness)

### 6. Mel (net +0.78)

- **0.55** projectile block: Rebuttal blocks Senna's Dawning Shadow, a projectile. Rebuttal for 0.75 s; Dawning Shadow takes 1 s to land, enough to react. (Mel W Rebuttal → Senna R Dawning Shadow)
- **0.46** projectile block: Rebuttal blocks Senna's Last Embrace, a projectile. Rebuttal for 0.75 s; Last Embrace takes 1.33 s to land, enough to react. (Mel W Rebuttal → Senna W Last Embrace)

### 7. Fiora (net +0.77)

- **0.67** parry: Riposte parries Senna's Last Embrace and stuns back. Parry for 0.75 s; Last Embrace takes 1.33 s to land, enough to react. Negating Last Embrace's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Senna W Last Embrace)
- **0.55** parry: Riposte parries Senna's Dawning Shadow. Parry for 0.75 s; Dawning Shadow takes 1 s to land, enough to react. (Fiora W Riposte → Senna R Dawning Shadow)
- **0.43** parry: Riposte parries Senna's Piercing Darkness. Parry for 0.75 s; Piercing Darkness takes 80 s to land, enough to react. (Fiora W Riposte → Senna Q Piercing Darkness)
- Watch out: Senna's basic attacks reach 450 units farther than Fiora's (600 vs 150 attack range).

### 8. Samira (net +0.75)

- **0.55** projectile block: Blade Whirl blocks Senna's Dawning Shadow, a projectile. Blade Whirl for 0.75 s; Dawning Shadow takes 1 s to land, enough to react. (Samira W Blade Whirl → Senna R Dawning Shadow)
- **0.49** projectile block: Blade Whirl blocks Senna's Last Embrace, a projectile. Blade Whirl for 0.75 s; Last Embrace takes 1.33 s to land, enough to react. (Samira W Blade Whirl → Senna W Last Embrace)
- Watch out: Senna's basic attacks reach 100 units farther than Samira's (600 vs 500 attack range).

### 9. Vladimir (net +0.74)

- **0.57** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Senna's Last Embrace. Untargetable for 2 s, long enough to use ahead of Last Embrace. (Vladimir W Sanguine Pool → Senna W Last Embrace)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Senna's Dawning Shadow. Untargetable for 2 s, long enough to use ahead of Dawning Shadow. (Vladimir W Sanguine Pool → Senna R Dawning Shadow)
- **0.43** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Senna's Piercing Darkness. Untargetable for 2 s, long enough to use ahead of Piercing Darkness. (Vladimir W Sanguine Pool → Senna Q Piercing Darkness)
- Watch out: Senna's basic attacks reach 150 units farther than Vladimir's (600 vs 450 attack range).

### 10. Yasuo (net +0.72)

- **0.55** projectile block: Wind Wall blocks Senna's Dawning Shadow, a projectile. Wind Wall for 4 s, long enough to use ahead of Dawning Shadow. (Yasuo W Wind Wall → Senna R Dawning Shadow)
- **0.55** projectile block: Wind Wall blocks Senna's Last Embrace, a projectile. Wind Wall for 4 s, long enough to use ahead of Last Embrace. (Yasuo W Wind Wall → Senna W Last Embrace)
- **0.11** reveal: Last Breath reveals Senna through Curse of the Black Mist's stealth. (Yasuo R Last Breath → Senna E Curse of the Black Mist)
- Watch out: Senna's basic attacks reach 425 units farther than Yasuo's (600 vs 175 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.06 | 1.06 | 0.00 |  |
| 2 | Yuumi | +0.99 | 1.13 | 0.14 |  |
| 3 | Maokai | +0.81 | 1.13 | 0.32 |  |
| 4 | Lissandra | +0.80 | 0.80 | 0.00 |  |
| 5 | Aurora | +0.79 | 0.79 | 0.00 |  |
| 6 | Mel | +0.78 | 0.78 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 7 | Fiora | +0.77 | 1.09 | 0.32 |  |
| 8 | Samira | +0.75 | 0.80 | 0.05 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 9 | Vladimir | +0.74 | 0.98 | 0.24 |  |
| 10 | Yasuo | +0.72 | 0.94 | 0.22 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 11 | Bard | +0.72 | 0.80 | 0.08 |  |
| 12 | Sivir | +0.71 | 0.87 | 0.16 |  |
| 13 | Master Yi | +0.70 | 1.02 | 0.32 |  |
| 14 | Kayle | +0.69 | 0.69 | 0.00 |  |
| 15 | Nocturne | +0.67 | 0.99 | 0.32 |  |
| 16 | Xayah | +0.67 | 0.79 | 0.12 |  |
| 17 | Braum | +0.66 | 0.98 | 0.32 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 18 | Gwen | +0.63 | 0.95 | 0.32 |  |
| 19 | Camille | +0.63 | 0.79 | 0.16 |  |
| 20 | Ekko | +0.60 | 0.82 | 0.22 |  |
| 21 | Evelynn | +0.58 | 0.80 | 0.22 |  |
| 22 | Kayn | +0.58 | 0.80 | 0.22 |  |
| 23 | Rek'Sai | +0.58 | 0.80 | 0.22 |  |
| 24 | Shaco | +0.58 | 0.80 | 0.22 |  |
| 25 | Zed | +0.57 | 0.79 | 0.22 |  |
| 26 | Pantheon | +0.55 | 0.77 | 0.22 |  |
| 27 | Kindred | +0.55 | 0.63 | 0.08 |  |
| 28 | Morgana | +0.50 | 0.74 | 0.24 |  |
| 29 | Udyr | +0.44 | 0.76 | 0.32 |  |
| 30 | Lulu | +0.41 | 0.41 | 0.00 |  |
| 31 | Xin Zhao | +0.36 | 0.68 | 0.32 |  |
| 32 | Malzahar | +0.33 | 0.49 | 0.16 |  |
| 33 | Kled | +0.32 | 0.46 | 0.14 |  |
| 34 | Teemo | +0.27 | 0.43 | 0.16 | blind (Blinding Dart) |
| 35 | Shen | +0.26 | 0.48 | 0.22 |  |
| 36 | Milio | +0.24 | 0.36 | 0.12 |  |
| 37 | Varus | +0.24 | 0.24 | 0.00 |  |
| 38 | Kalista | +0.23 | 0.27 | 0.04 |  |
| 39 | Warwick | +0.20 | 0.42 | 0.22 |  |
| 40 | Jax | +0.18 | 0.50 | 0.32 |  |
| 41 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 42 | Zaahen | +0.15 | 0.37 | 0.22 |  |
| 43 | Caitlyn | +0.11 | 0.11 | 0.00 |  |
| 44 | Hwei | +0.11 | 0.11 | 0.00 |  |
| 45 | Renata Glasc | +0.11 | 0.11 | 0.00 |  |
| 46 | Vex | +0.11 | 0.11 | 0.00 |  |
| 47 | Zyra | +0.11 | 0.11 | 0.00 |  |
| 48 | Nilah | +0.10 | 0.40 | 0.30 |  |
| 49 | Rengar | +0.07 | 0.72 | 0.65 |  |
| 50 | Fiddlesticks | +0.05 | 0.11 | 0.06 |  |
| 51 | Kai'Sa | +0.05 | 0.11 | 0.06 |  |
| 52 | LeBlanc | +0.05 | 0.11 | 0.06 |  |
| 53 | Nidalee | +0.05 | 0.11 | 0.06 |  |
| 54 | Twisted Fate | +0.05 | 0.11 | 0.06 |  |
| 55 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 56 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 57 | Akshan | +0.03 | 0.11 | 0.08 |  |
| 58 | Thresh | +0.03 | 0.11 | 0.08 |  |
| 59 | Rammus | 0.00 | 0.32 | 0.32 |  |
| 60 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 61 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 62 | Annie | 0.00 | 0.00 | 0.00 |  |
| 63 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 64 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 65 | Brand | 0.00 | 0.00 | 0.00 |  |
| 66 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 67 | Corki | 0.00 | 0.00 | 0.00 |  |
| 68 | Draven | 0.00 | 0.00 | 0.00 |  |
| 69 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 70 | Janna | 0.00 | 0.00 | 0.00 |  |
| 71 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 72 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 73 | Lux | 0.00 | 0.00 | 0.00 |  |
| 74 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 75 | Nami | 0.00 | 0.00 | 0.00 |  |
| 76 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 77 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 78 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 79 | Sona | 0.00 | 0.00 | 0.00 |  |
| 80 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 81 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 82 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 83 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 84 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 85 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 86 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 87 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 88 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 89 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 90 | Karma | -0.01 | 0.11 | 0.12 |  |
| 91 | Taric | -0.02 | 0.63 | 0.65 |  |
| 92 | Alistar | -0.02 | 0.30 | 0.32 |  |
| 93 | Azir | -0.04 | 0.00 | 0.04 |  |
| 94 | Briar | -0.05 | 0.11 | 0.16 |  |
| 95 | Fizz | -0.05 | 0.11 | 0.16 |  |
| 96 | Naafiri | -0.05 | 0.11 | 0.16 |  |
| 97 | Sylas | -0.05 | 0.11 | 0.16 |  |
| 98 | Gnar | -0.05 | 0.00 | 0.05 |  |
| 99 | Quinn | -0.06 | 0.00 | 0.06 |  |
| 100 | Taliyah | -0.06 | 0.00 | 0.06 |  |
| 101 | Katarina | -0.08 | 0.24 | 0.32 |  |
| 102 | Jayce | -0.08 | 0.00 | 0.08 |  |
| 103 | Lucian | -0.08 | 0.00 | 0.08 |  |
| 104 | Urgot | -0.09 | 0.11 | 0.20 |  |
| 105 | Graves | -0.09 | 0.00 | 0.09 |  |
| 106 | Ivern | -0.10 | 0.00 | 0.10 |  |
| 107 | Gangplank | -0.11 | 0.54 | 0.65 |  |
| 108 | Malphite | -0.11 | 0.21 | 0.32 |  |
| 109 | Akali | -0.11 | 0.11 | 0.22 |  |
| 110 | Ambessa | -0.11 | 0.11 | 0.22 |  |
| 111 | Lee Sin | -0.11 | 0.11 | 0.22 |  |
| 112 | Vi | -0.11 | 0.11 | 0.22 |  |
| 113 | Jinx | -0.12 | 0.00 | 0.12 |  |
| 114 | Orianna | -0.12 | 0.00 | 0.12 |  |
| 115 | Seraphine | -0.12 | 0.00 | 0.12 |  |
| 116 | Swain | -0.12 | 0.00 | 0.12 |  |
| 117 | Vel'Koz | -0.12 | 0.00 | 0.12 |  |
| 118 | Viktor | -0.12 | 0.00 | 0.12 |  |
| 119 | Xerath | -0.12 | 0.00 | 0.12 |  |
| 120 | Jarvan IV | -0.16 | 0.00 | 0.16 |  |
| 121 | Kog'Maw | -0.16 | 0.00 | 0.16 |  |
| 122 | K'Sante | -0.16 | 0.00 | 0.16 |  |
| 123 | Rakan | -0.16 | 0.00 | 0.16 |  |
| 124 | Viego | -0.16 | 0.00 | 0.16 |  |
| 125 | Yone | -0.16 | 0.00 | 0.16 |  |
| 126 | Aatrox | -0.21 | 0.11 | 0.32 |  |
| 127 | Illaoi | -0.21 | 0.11 | 0.32 |  |
| 128 | Sett | -0.21 | 0.11 | 0.32 |  |
| 129 | Zac | -0.21 | 0.11 | 0.32 |  |
| 130 | Bel'Veth | -0.22 | 0.00 | 0.22 |  |
| 131 | Galio | -0.22 | 0.00 | 0.22 |  |
| 132 | Hecarim | -0.22 | 0.00 | 0.22 |  |
| 133 | Lillia | -0.22 | 0.00 | 0.22 |  |
| 134 | Wukong | -0.22 | 0.00 | 0.22 |  |
| 135 | Ornn | -0.22 | 0.00 | 0.22 |  |
| 136 | Pyke | -0.22 | 0.00 | 0.22 |  |
| 137 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 138 | Rell | -0.22 | 0.00 | 0.22 |  |
| 139 | Riven | -0.22 | 0.00 | 0.22 |  |
| 140 | Talon | -0.22 | 0.00 | 0.22 |  |
| 141 | Volibear | -0.22 | 0.00 | 0.22 |  |
| 142 | Karthus | -0.24 | 0.00 | 0.24 |  |
| 143 | Garen | -0.25 | 0.40 | 0.65 |  |
| 144 | Sion | -0.26 | 0.39 | 0.65 |  |
| 145 | Olaf | -0.28 | 0.37 | 0.65 |  |
| 146 | Singed | -0.29 | 0.36 | 0.65 |  |
| 147 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 148 | Amumu | -0.32 | 0.00 | 0.32 |  |
| 149 | Diana | -0.32 | 0.00 | 0.32 |  |
| 150 | Gragas | -0.32 | 0.00 | 0.32 |  |
| 151 | Irelia | -0.32 | 0.00 | 0.32 |  |
| 152 | Kassadin | -0.32 | 0.00 | 0.32 |  |
| 153 | Kha'Zix | -0.32 | 0.00 | 0.32 |  |
| 154 | Leona | -0.32 | 0.00 | 0.32 |  |
| 155 | Locke | -0.32 | 0.00 | 0.32 |  |
| 156 | Nautilus | -0.32 | 0.00 | 0.32 |  |
| 157 | Poppy | -0.32 | 0.00 | 0.32 |  |
| 158 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 159 | Sejuani | -0.32 | 0.00 | 0.32 |  |
| 160 | Shyvana | -0.32 | 0.00 | 0.32 |  |
| 161 | Tahm Kench | -0.32 | 0.00 | 0.32 |  |
| 162 | Tryndamere | -0.32 | 0.00 | 0.32 |  |
| 163 | Mordekaiser | -0.50 | 0.15 | 0.65 |  |
| 164 | Nunu & Willump | -0.51 | 0.14 | 0.65 |  |
| 165 | Skarner | -0.51 | 0.14 | 0.65 |  |
| 166 | Blitzcrank | -0.65 | 0.00 | 0.65 |  |
| 167 | Cho'Gath | -0.65 | 0.00 | 0.65 |  |
| 168 | Darius | -0.65 | 0.00 | 0.65 |  |
| 169 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 170 | Rumble | -0.65 | 0.00 | 0.65 |  |
| 171 | Trundle | -0.65 | 0.00 | 0.65 |  |
| 172 | Yorick | -0.65 | 0.00 | 0.65 |  |
