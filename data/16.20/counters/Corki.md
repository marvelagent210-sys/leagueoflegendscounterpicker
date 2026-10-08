# Counters to Corki (patch 26.20)

Every champion ranked by what its kit does against Corki's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Corki's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Corki` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +0.81)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Corki's Missile Barrage. Untargetable for 0.6 s; Missile Barrage takes 0.82 s to land, enough to react. (Elise E Rappel → Corki R Missile Barrage)
- **0.51** untargetable: Rappel makes Elise untargetable, dodging Corki's Special Delivery. Untargetable for 0.6 s; Special Delivery takes 1.2 s to land, enough to react. (Elise E Rappel → Corki W Special Delivery)

### 2. Mel (net +0.66)

- **0.47** projectile block: Rebuttal blocks Corki's Missile Barrage, a projectile. Rebuttal for 0.75 s; Missile Barrage takes 0.82 s to land, enough to react. (Mel W Rebuttal → Corki R Missile Barrage)
- **0.25** projectile block: Rebuttal blocks Corki's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Corki basic attacks)
- **0.25** projectile block: Rebuttal blocks Corki's Phosphorus Bomb, a projectile. Rebuttal for 0.75 s; Phosphorus Bomb takes 1 s to land, enough to react. (Mel W Rebuttal → Corki Q Phosphorus Bomb)

### 3. Fiora (net +0.63)

- **0.64** parry: Riposte parries Corki's Special Delivery and stuns back. Parry for 0.75 s; Special Delivery takes 1.2 s to land, enough to react. Negating Special Delivery's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Corki W Special Delivery)
- **0.55** parry: Riposte parries Corki's Missile Barrage. Parry for 0.75 s; Missile Barrage takes 0.82 s to land, enough to react. (Fiora W Riposte → Corki R Missile Barrage)
- **0.07** attack speed slow: Riposte cuts Corki's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Corki basic attacks)
- Watch out: Corki's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### 4. Samira (net +0.63)

- **0.52** projectile block: Blade Whirl blocks Corki's Missile Barrage, a projectile. Blade Whirl for 0.75 s; Missile Barrage takes 0.82 s to land, enough to react. (Samira W Blade Whirl → Corki R Missile Barrage)
- **0.27** projectile block: Blade Whirl blocks Corki's Phosphorus Bomb, a projectile. Blade Whirl for 0.75 s; Phosphorus Bomb takes 1 s to land, enough to react. (Samira W Blade Whirl → Corki Q Phosphorus Bomb)
- **0.25** projectile block: Blade Whirl blocks Corki's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Corki basic attacks)
- Watch out: Special Delivery is displacement immune, ignoring Samira's Daredevil Impulse (airborne) during it.

### 5. Maokai (net +0.61)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Corki's Special Delivery. Untargetable for 1.4 s; Special Delivery takes 1.2 s to land, enough to react. (Maokai W Twisted Advance → Corki W Special Delivery)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Corki's Missile Barrage. Untargetable for 1.4 s; Missile Barrage takes 0.82 s to land, enough to react. (Maokai W Twisted Advance → Corki R Missile Barrage)
- Watch out: Corki's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 6. Vladimir (net +0.59)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Corki's Missile Barrage. Untargetable for 2 s, long enough to use ahead of Missile Barrage. (Vladimir W Sanguine Pool → Corki R Missile Barrage)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Corki's Special Delivery. Untargetable for 2 s, long enough to use ahead of Special Delivery. (Vladimir W Sanguine Pool → Corki W Special Delivery)
- Watch out: Corki's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 7. Sivir (net +0.55)

- **0.55** spell shield: Spell Shield's spell shield blocks Corki's Missile Barrage. Spell shield for 1.5 s, long enough to use ahead of Missile Barrage. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Corki R Missile Barrage)

### 8. Gwen (net +0.51)

- **0.55** untargetable: Hallowed Mist makes Gwen untargetable, dodging Corki's Missile Barrage. Untargetable for ?; Missile Barrage takes 0.82 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Corki R Missile Barrage)
- **0.51** untargetable: Hallowed Mist makes Gwen untargetable, dodging Corki's Special Delivery. Untargetable for ?; Special Delivery takes 1.2 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Corki W Special Delivery)
- Watch out: Corki's basic attacks reach 400 units farther than Gwen's (550 vs 150 attack range).

### 9. Braum (net +0.49)

- **0.55** projectile block: Unbreakable blocks Corki's Missile Barrage, a projectile. Unbreakable for 4 s, long enough to use ahead of Missile Barrage. (Braum E Unbreakable → Corki R Missile Barrage)
- **0.42** projectile block: Unbreakable blocks Corki's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Corki basic attacks)
- **0.42** projectile block: Unbreakable blocks Corki's Phosphorus Bomb, a projectile. Unbreakable for 4 s, long enough to use ahead of Phosphorus Bomb. (Braum E Unbreakable → Corki Q Phosphorus Bomb)
- Watch out: Corki's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 10. Yuumi (net +0.48)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Corki's Special Delivery. Untargetable for ?; Special Delivery takes 1.2 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Corki W Special Delivery)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Corki's Missile Barrage. Untargetable for ?; Missile Barrage takes 0.82 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Corki R Missile Barrage)
- Watch out: Special Delivery's airborne interrupts Yuumi's Final Chapter (normal channel).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +0.81 | 0.81 | 0.00 |  |
| 2 | Mel | +0.66 | 0.66 | 0.00 | projectile block (Rebuttal) |
| 3 | Fiora | +0.63 | 0.93 | 0.30 |  |
| 4 | Samira | +0.63 | 0.72 | 0.09 | projectile block (Blade Whirl) |
| 5 | Maokai | +0.61 | 0.98 | 0.37 |  |
| 6 | Vladimir | +0.59 | 0.82 | 0.23 |  |
| 7 | Sivir | +0.55 | 0.55 | 0.00 |  |
| 8 | Gwen | +0.51 | 0.81 | 0.30 |  |
| 9 | Braum | +0.49 | 0.87 | 0.38 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 10 | Yuumi | +0.48 | 0.98 | 0.50 |  |
| 11 | Aurora | +0.48 | 0.48 | 0.00 |  |
| 12 | Lissandra | +0.47 | 0.52 | 0.05 |  |
| 13 | Xayah | +0.47 | 0.47 | 0.00 |  |
| 14 | Kayle | +0.46 | 0.46 | 0.00 |  |
| 15 | Master Yi | +0.41 | 0.92 | 0.51 |  |
| 16 | Udyr | +0.40 | 0.70 | 0.30 |  |
| 17 | Bard | +0.40 | 0.48 | 0.08 |  |
| 18 | Pantheon | +0.39 | 0.68 | 0.29 |  |
| 19 | Morgana | +0.39 | 0.54 | 0.15 |  |
| 20 | Teemo | +0.39 | 0.39 | 0.00 |  |
| 21 | Kindred | +0.36 | 0.36 | 0.00 |  |
| 22 | Ekko | +0.33 | 0.53 | 0.20 |  |
| 23 | Nocturne | +0.32 | 0.62 | 0.30 |  |
| 24 | Yasuo | +0.31 | 0.78 | 0.47 | projectile block (Wind Wall) |
| 25 | Vex | +0.30 | 0.33 | 0.03 |  |
| 26 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 27 | Evelynn | +0.28 | 0.48 | 0.20 |  |
| 28 | Shaco | +0.28 | 0.48 | 0.20 |  |
| 29 | Zed | +0.27 | 0.47 | 0.20 |  |
| 30 | Ahri | +0.26 | 0.30 | 0.04 |  |
| 31 | Jinx | +0.26 | 0.30 | 0.04 |  |
| 32 | Viktor | +0.25 | 0.29 | 0.04 |  |
| 33 | Hwei | +0.23 | 0.30 | 0.07 |  |
| 34 | Veigar | +0.23 | 0.27 | 0.04 |  |
| 35 | Lulu | +0.20 | 0.28 | 0.08 |  |
| 36 | Camille | +0.19 | 0.49 | 0.30 |  |
| 37 | Rek'Sai | +0.15 | 0.50 | 0.35 |  |
| 38 | Malzahar | +0.07 | 0.50 | 0.43 |  |
| 39 | Aphelios | +0.07 | 0.07 | 0.00 |  |
| 40 | Heimerdinger | +0.07 | 0.07 | 0.00 |  |
| 41 | Kalista | +0.06 | 0.25 | 0.19 |  |
| 42 | Tristana | +0.06 | 0.14 | 0.08 |  |
| 43 | Annie | +0.04 | 0.04 | 0.00 |  |
| 44 | Jax | +0.02 | 0.32 | 0.30 |  |
| 45 | Milio | +0.02 | 0.09 | 0.07 |  |
| 46 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 47 | Brand | 0.00 | 0.00 | 0.00 |  |
| 48 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 49 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 50 | Karma | 0.00 | 0.00 | 0.00 |  |
| 51 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 52 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 53 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 54 | Lux | 0.00 | 0.00 | 0.00 |  |
| 55 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 56 | Senna | 0.00 | 0.00 | 0.00 |  |
| 57 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 58 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 59 | Sona | 0.00 | 0.00 | 0.00 |  |
| 60 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 61 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 62 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 63 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 64 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 65 | Kled | -0.03 | 0.32 | 0.35 |  |
| 66 | Rengar | -0.04 | 0.56 | 0.60 |  |
| 67 | Warwick | -0.04 | 0.49 | 0.53 |  |
| 68 | Zaahen | -0.04 | 0.33 | 0.37 |  |
| 69 | Nilah | -0.04 | 0.28 | 0.32 |  |
| 70 | Graves | -0.06 | 0.00 | 0.06 |  |
| 71 | Draven | -0.07 | 0.00 | 0.07 |  |
| 72 | Jayce | -0.07 | 0.00 | 0.07 |  |
| 73 | Renata Glasc | -0.07 | 0.00 | 0.07 |  |
| 74 | Swain | -0.07 | 0.00 | 0.07 |  |
| 75 | Syndra | -0.07 | 0.00 | 0.07 |  |
| 76 | Vayne | -0.07 | 0.00 | 0.07 |  |
| 77 | Zoe | -0.07 | 0.00 | 0.07 |  |
| 78 | Gnar | -0.08 | 0.00 | 0.08 |  |
| 79 | Neeko | -0.08 | 0.00 | 0.08 |  |
| 80 | Orianna | -0.08 | 0.00 | 0.08 |  |
| 81 | Xin Zhao | -0.09 | 0.37 | 0.46 |  |
| 82 | Varus | -0.11 | 0.00 | 0.11 |  |
| 83 | Hecarim | -0.12 | 0.07 | 0.19 |  |
| 84 | Volibear | -0.13 | 0.07 | 0.20 |  |
| 85 | Aurelion Sol | -0.13 | 0.00 | 0.13 |  |
| 86 | Gangplank | -0.14 | 0.46 | 0.60 |  |
| 87 | Anivia | -0.14 | 0.00 | 0.14 |  |
| 88 | Alistar | -0.15 | 0.27 | 0.42 |  |
| 89 | Azir | -0.16 | 0.00 | 0.16 |  |
| 90 | Zyra | -0.16 | 0.00 | 0.16 |  |
| 91 | Yone | -0.17 | 0.22 | 0.39 |  |
| 92 | Ziggs | -0.17 | 0.00 | 0.17 |  |
| 93 | K'Sante | -0.18 | 0.14 | 0.32 |  |
| 94 | Nami | -0.18 | 0.00 | 0.18 |  |
| 95 | Thresh | -0.18 | 0.00 | 0.18 |  |
| 96 | Caitlyn | -0.19 | 0.09 | 0.28 |  |
| 97 | Kayn | -0.20 | 0.48 | 0.68 |  |
| 98 | Akali | -0.20 | 0.00 | 0.20 |  |
| 99 | Ambessa | -0.20 | 0.00 | 0.20 |  |
| 100 | Briar | -0.20 | 0.00 | 0.20 |  |
| 101 | Talon | -0.20 | 0.00 | 0.20 |  |
| 102 | Amumu | -0.21 | 0.14 | 0.35 |  |
| 103 | Ivern | -0.21 | 0.00 | 0.21 |  |
| 104 | Poppy | -0.22 | 0.38 | 0.60 |  |
| 105 | Fizz | -0.22 | 0.00 | 0.22 |  |
| 106 | Malphite | -0.23 | 0.27 | 0.50 |  |
| 107 | Illaoi | -0.23 | 0.07 | 0.30 |  |
| 108 | Shyvana | -0.23 | 0.07 | 0.30 |  |
| 109 | Taric | -0.24 | 0.36 | 0.60 |  |
| 110 | Quinn | -0.24 | 0.00 | 0.24 |  |
| 111 | Sylas | -0.24 | 0.00 | 0.24 |  |
| 112 | Urgot | -0.24 | 0.00 | 0.24 |  |
| 113 | Lillia | -0.25 | 0.00 | 0.25 |  |
| 114 | Irelia | -0.26 | 0.00 | 0.26 |  |
| 115 | Olaf | -0.27 | 0.33 | 0.60 |  |
| 116 | Bel'Veth | -0.27 | 0.00 | 0.27 |  |
| 117 | Ornn | -0.28 | 0.07 | 0.35 |  |
| 118 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 119 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 120 | Lee Sin | -0.28 | 0.00 | 0.28 |  |
| 121 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 122 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 123 | Qiyana | -0.28 | 0.00 | 0.28 |  |
| 124 | Tryndamere | -0.28 | 0.00 | 0.28 |  |
| 125 | Nasus | -0.30 | 0.30 | 0.60 |  |
| 126 | Sett | -0.30 | 0.07 | 0.37 |  |
| 127 | Kassadin | -0.30 | 0.00 | 0.30 |  |
| 128 | Kha'Zix | -0.30 | 0.00 | 0.30 |  |
| 129 | Leona | -0.30 | 0.00 | 0.30 |  |
| 130 | Locke | -0.30 | 0.00 | 0.30 |  |
| 131 | Renekton | -0.30 | 0.00 | 0.30 |  |
| 132 | Vel'Koz | -0.32 | 0.00 | 0.32 |  |
| 133 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 134 | Rammus | -0.33 | 0.30 | 0.63 |  |
| 135 | Viego | -0.33 | 0.07 | 0.40 |  |
| 136 | Rakan | -0.33 | 0.00 | 0.33 |  |
| 137 | Shen | -0.35 | 0.30 | 0.65 |  |
| 138 | Jarvan IV | -0.35 | 0.07 | 0.42 |  |
| 139 | Wukong | -0.35 | 0.00 | 0.35 |  |
| 140 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 141 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 142 | Singed | -0.37 | 0.30 | 0.67 |  |
| 143 | Garen | -0.37 | 0.19 | 0.56 |  |
| 144 | Diana | -0.38 | 0.00 | 0.38 |  |
| 145 | Pyke | -0.39 | 0.00 | 0.39 |  |
| 146 | Sion | -0.40 | 0.35 | 0.75 |  |
| 147 | Nautilus | -0.40 | 0.00 | 0.40 |  |
| 148 | Riven | -0.40 | 0.00 | 0.40 |  |
| 149 | Karthus | -0.43 | 0.00 | 0.43 |  |
| 150 | Rell | -0.43 | 0.00 | 0.43 |  |
| 151 | Aatrox | -0.45 | 0.00 | 0.45 |  |
| 152 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 153 | Skarner | -0.51 | 0.09 | 0.60 |  |
| 154 | Janna | -0.52 | 0.00 | 0.52 |  |
| 155 | Zac | -0.53 | 0.30 | 0.83 |  |
| 156 | Sejuani | -0.54 | 0.00 | 0.54 |  |
| 157 | Galio | -0.55 | 0.00 | 0.55 |  |
| 158 | Gragas | -0.56 | 0.00 | 0.56 |  |
| 159 | Katarina | -0.58 | 0.00 | 0.58 |  |
| 160 | Dr. Mundo | -0.60 | 0.00 | 0.60 |  |
| 161 | Naafiri | -0.60 | 0.00 | 0.60 |  |
| 162 | Rumble | -0.60 | 0.00 | 0.60 |  |
| 163 | Taliyah | -0.62 | 0.00 | 0.62 |  |
| 164 | Mordekaiser | -0.63 | 0.07 | 0.70 |  |
| 165 | Darius | -0.63 | 0.00 | 0.63 |  |
| 166 | Trundle | -0.63 | 0.00 | 0.63 |  |
| 167 | Vi | -0.64 | 0.07 | 0.71 |  |
| 168 | Cho'Gath | -0.67 | 0.00 | 0.67 |  |
| 169 | Yorick | -0.70 | 0.00 | 0.70 |  |
| 170 | Blitzcrank | -0.78 | 0.00 | 0.78 |  |
| 171 | Tahm Kench | -0.86 | 0.00 | 0.86 |  |
| 172 | Nunu & Willump | -0.91 | 0.20 | 1.11 |  |
