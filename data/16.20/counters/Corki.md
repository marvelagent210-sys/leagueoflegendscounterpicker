# Counters to Corki (patch 26.20)

Every champion ranked by what its kit does against Corki's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Corki's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Corki` for the full ledger of a matchup, with sources.

## Top 10

### 1. Fizz (net +0.84)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Corki's Special Delivery. Untargetable for 0.75 s; Special Delivery takes 1.2 s to land, enough to react. (Fizz E Playful → Corki W Special Delivery)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Corki's Missile Barrage. Untargetable for 0.75 s; Missile Barrage takes 0.82 s to land, enough to react. (Fizz E Playful → Corki R Missile Barrage)
- Watch out: Corki's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

### 2. Samira (net +0.72)

- **0.52** projectile block: Blade Whirl blocks Corki's Missile Barrage, a projectile. Blade Whirl for 0.75 s; Missile Barrage takes 0.82 s to land, enough to react. (Samira W Blade Whirl → Corki R Missile Barrage)
- **0.27** projectile block: Blade Whirl blocks Corki's Phosphorus Bomb, a projectile. Blade Whirl for 0.75 s; Phosphorus Bomb takes 1 s to land, enough to react. (Samira W Blade Whirl → Corki Q Phosphorus Bomb)
- **0.25** projectile block: Blade Whirl blocks Corki's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Corki basic attacks)

### 3. Maokai (net +0.68)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Corki's Special Delivery. Untargetable for 1.4 s; Special Delivery takes 1.2 s to land, enough to react. (Maokai W Twisted Advance → Corki W Special Delivery)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Corki's Missile Barrage. Untargetable for 1.4 s; Missile Barrage takes 0.82 s to land, enough to react. (Maokai W Twisted Advance → Corki R Missile Barrage)
- Watch out: Corki's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 4. Mel (net +0.66)

- **0.47** projectile block: Rebuttal blocks Corki's Missile Barrage, a projectile. Rebuttal for 0.75 s; Missile Barrage takes 0.82 s to land, enough to react. (Mel W Rebuttal → Corki R Missile Barrage)
- **0.25** projectile block: Rebuttal blocks Corki's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Corki basic attacks)
- **0.25** projectile block: Rebuttal blocks Corki's Phosphorus Bomb, a projectile. Rebuttal for 0.75 s; Phosphorus Bomb takes 1 s to land, enough to react. (Mel W Rebuttal → Corki Q Phosphorus Bomb)

### 5. Fiora (net +0.63)

- **0.64** parry: Riposte parries Corki's Special Delivery and stuns back. Parry for 0.75 s; Special Delivery takes 1.2 s to land, enough to react. Negating Special Delivery's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Corki W Special Delivery)
- **0.55** parry: Riposte parries Corki's Missile Barrage. Parry for 0.75 s; Missile Barrage takes 0.82 s to land, enough to react. (Fiora W Riposte → Corki R Missile Barrage)
- **0.07** attack speed slow: Riposte cuts Corki's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Corki basic attacks)
- Watch out: Corki's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### 6. Vladimir (net +0.59)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Corki's Missile Barrage. Untargetable for 2 s, long enough to use ahead of Missile Barrage. (Vladimir W Sanguine Pool → Corki R Missile Barrage)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Corki's Special Delivery. Untargetable for 2 s, long enough to use ahead of Special Delivery. (Vladimir W Sanguine Pool → Corki W Special Delivery)
- Watch out: Corki's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 7. Yasuo (net +0.59)

- **0.55** projectile block: Wind Wall blocks Corki's Missile Barrage, a projectile. Wind Wall for 4 s, long enough to use ahead of Missile Barrage. (Yasuo W Wind Wall → Corki R Missile Barrage)
- **0.32** projectile block: Wind Wall blocks Corki's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Corki basic attacks)
- **0.29** projectile block: Wind Wall blocks Corki's Phosphorus Bomb, a projectile. Wind Wall for 4 s, long enough to use ahead of Phosphorus Bomb. (Yasuo W Wind Wall → Corki Q Phosphorus Bomb)
- Watch out: Corki's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 8. Braum (net +0.57)

- **0.55** projectile block: Unbreakable blocks Corki's Missile Barrage, a projectile. Unbreakable for 4 s, long enough to use ahead of Missile Barrage. (Braum E Unbreakable → Corki R Missile Barrage)
- **0.42** projectile block: Unbreakable blocks Corki's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Corki basic attacks)
- **0.42** projectile block: Unbreakable blocks Corki's Phosphorus Bomb, a projectile. Unbreakable for 4 s, long enough to use ahead of Phosphorus Bomb. (Braum E Unbreakable → Corki Q Phosphorus Bomb)
- Watch out: Corki's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 9. Sivir (net +0.55)

- **0.55** spell shield: Spell Shield's spell shield blocks Corki's Missile Barrage. Spell shield for 1.5 s, long enough to use ahead of Missile Barrage. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Corki R Missile Barrage)

### 10. Lissandra (net +0.52)

- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Corki's Special Delivery. Untargetable for 2.5 s, long enough to use ahead of Special Delivery. (Lissandra R Frozen Tomb → Corki W Special Delivery)
- **0.30** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Corki's Missile Barrage. Untargetable for 2.5 s, long enough to use ahead of Missile Barrage. (Lissandra R Frozen Tomb → Corki R Missile Barrage)
- **0.15** dash stop: Frozen Tomb's knockdown can stop Corki's Valkyrie mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Corki W Valkyrie)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +0.84 | 0.98 | 0.14 |  |
| 2 | Samira | +0.72 | 0.72 | 0.00 | projectile block (Blade Whirl) |
| 3 | Maokai | +0.68 | 0.98 | 0.30 |  |
| 4 | Mel | +0.66 | 0.66 | 0.00 | projectile block (Rebuttal) |
| 5 | Fiora | +0.63 | 0.93 | 0.30 |  |
| 6 | Vladimir | +0.59 | 0.82 | 0.23 |  |
| 7 | Yasuo | +0.59 | 0.78 | 0.19 | projectile block (Wind Wall) |
| 8 | Braum | +0.57 | 0.87 | 0.30 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 9 | Sivir | +0.55 | 0.55 | 0.00 |  |
| 10 | Lissandra | +0.52 | 0.52 | 0.00 |  |
| 11 | Gwen | +0.51 | 0.81 | 0.30 |  |
| 12 | Yuumi | +0.48 | 0.98 | 0.50 |  |
| 13 | Aurora | +0.48 | 0.48 | 0.00 |  |
| 14 | Bard | +0.48 | 0.48 | 0.00 |  |
| 15 | Xayah | +0.47 | 0.47 | 0.00 |  |
| 16 | Kayle | +0.46 | 0.46 | 0.00 |  |
| 17 | Master Yi | +0.41 | 0.92 | 0.51 |  |
| 18 | Udyr | +0.40 | 0.70 | 0.30 |  |
| 19 | Morgana | +0.39 | 0.54 | 0.15 |  |
| 20 | Teemo | +0.39 | 0.39 | 0.00 |  |
| 21 | Camille | +0.34 | 0.49 | 0.15 |  |
| 22 | Vex | +0.33 | 0.33 | 0.00 |  |
| 23 | Nocturne | +0.32 | 0.62 | 0.30 |  |
| 24 | Rek'Sai | +0.31 | 0.50 | 0.19 |  |
| 25 | Ahri | +0.30 | 0.30 | 0.00 |  |
| 26 | Hwei | +0.30 | 0.30 | 0.00 |  |
| 27 | Jinx | +0.30 | 0.30 | 0.00 |  |
| 28 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 29 | Viktor | +0.29 | 0.29 | 0.00 |  |
| 30 | Evelynn | +0.28 | 0.48 | 0.20 |  |
| 31 | Shaco | +0.28 | 0.48 | 0.20 |  |
| 32 | Lulu | +0.28 | 0.28 | 0.00 |  |
| 33 | Zed | +0.27 | 0.47 | 0.20 |  |
| 34 | Veigar | +0.27 | 0.27 | 0.00 |  |
| 35 | Kalista | +0.25 | 0.25 | 0.00 |  |
| 36 | Kled | +0.21 | 0.32 | 0.11 |  |
| 37 | Zaahen | +0.14 | 0.33 | 0.19 |  |
| 38 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 39 | Malzahar | +0.10 | 0.50 | 0.40 |  |
| 40 | Xin Zhao | +0.09 | 0.37 | 0.28 |  |
| 41 | Milio | +0.09 | 0.09 | 0.00 |  |
| 42 | Yone | +0.08 | 0.22 | 0.14 |  |
| 43 | Aphelios | +0.07 | 0.07 | 0.00 |  |
| 44 | Heimerdinger | +0.07 | 0.07 | 0.00 |  |
| 45 | Nilah | +0.04 | 0.28 | 0.24 |  |
| 46 | Annie | +0.04 | 0.04 | 0.00 |  |
| 47 | Jax | +0.02 | 0.32 | 0.30 |  |
| 48 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 49 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 50 | Azir | 0.00 | 0.00 | 0.00 |  |
| 51 | Brand | 0.00 | 0.00 | 0.00 |  |
| 52 | Draven | 0.00 | 0.00 | 0.00 |  |
| 53 | Elise | 0.00 | 0.00 | 0.00 |  |
| 54 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 55 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 56 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 57 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 58 | Karma | 0.00 | 0.00 | 0.00 |  |
| 59 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 60 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 61 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 62 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 63 | Lux | 0.00 | 0.00 | 0.00 |  |
| 64 | Nami | 0.00 | 0.00 | 0.00 |  |
| 65 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 66 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 67 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 68 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 69 | Senna | 0.00 | 0.00 | 0.00 |  |
| 70 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 71 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 72 | Sona | 0.00 | 0.00 | 0.00 |  |
| 73 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 74 | Swain | 0.00 | 0.00 | 0.00 |  |
| 75 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 76 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 77 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 78 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 79 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 80 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 81 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 82 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 83 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 84 | Pantheon | -0.01 | 0.68 | 0.69 |  |
| 85 | K'Sante | -0.01 | 0.14 | 0.15 |  |
| 86 | Alistar | -0.03 | 0.27 | 0.30 |  |
| 87 | Malphite | -0.03 | 0.27 | 0.30 |  |
| 88 | Rengar | -0.04 | 0.56 | 0.60 |  |
| 89 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 90 | Graves | -0.06 | 0.00 | 0.06 |  |
| 91 | Jarvan IV | -0.07 | 0.07 | 0.14 |  |
| 92 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 93 | Varus | -0.11 | 0.00 | 0.11 |  |
| 94 | Poppy | -0.12 | 0.38 | 0.50 |  |
| 95 | Hecarim | -0.12 | 0.07 | 0.19 |  |
| 96 | Ornn | -0.12 | 0.07 | 0.19 |  |
| 97 | Volibear | -0.13 | 0.07 | 0.20 |  |
| 98 | Rakan | -0.13 | 0.00 | 0.13 |  |
| 99 | Gangplank | -0.14 | 0.46 | 0.60 |  |
| 100 | Sylas | -0.14 | 0.00 | 0.14 |  |
| 101 | Briar | -0.15 | 0.00 | 0.15 |  |
| 102 | Urgot | -0.15 | 0.00 | 0.15 |  |
| 103 | Kayn | -0.16 | 0.48 | 0.64 |  |
| 104 | Amumu | -0.16 | 0.14 | 0.30 |  |
| 105 | Lillia | -0.17 | 0.00 | 0.17 |  |
| 106 | Caitlyn | -0.19 | 0.09 | 0.28 |  |
| 107 | Wukong | -0.19 | 0.00 | 0.19 |  |
| 108 | Quinn | -0.19 | 0.00 | 0.19 |  |
| 109 | Rell | -0.19 | 0.00 | 0.19 |  |
| 110 | Akali | -0.20 | 0.00 | 0.20 |  |
| 111 | Ambessa | -0.20 | 0.00 | 0.20 |  |
| 112 | Bel'Veth | -0.20 | 0.00 | 0.20 |  |
| 113 | Ekko | -0.20 | 0.00 | 0.20 |  |
| 114 | Lee Sin | -0.20 | 0.00 | 0.20 |  |
| 115 | Qiyana | -0.20 | 0.00 | 0.20 |  |
| 116 | Riven | -0.20 | 0.00 | 0.20 |  |
| 117 | Talon | -0.20 | 0.00 | 0.20 |  |
| 118 | Ivern | -0.21 | 0.00 | 0.21 |  |
| 119 | Illaoi | -0.23 | 0.07 | 0.30 |  |
| 120 | Sett | -0.23 | 0.07 | 0.30 |  |
| 121 | Shyvana | -0.23 | 0.07 | 0.30 |  |
| 122 | Irelia | -0.26 | 0.00 | 0.26 |  |
| 123 | Olaf | -0.27 | 0.33 | 0.60 |  |
| 124 | Rammus | -0.27 | 0.30 | 0.57 |  |
| 125 | Viego | -0.28 | 0.07 | 0.35 |  |
| 126 | Aatrox | -0.28 | 0.00 | 0.28 |  |
| 127 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 128 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 129 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 130 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 131 | Nautilus | -0.28 | 0.00 | 0.28 |  |
| 132 | Tryndamere | -0.28 | 0.00 | 0.28 |  |
| 133 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 134 | Nasus | -0.30 | 0.30 | 0.60 |  |
| 135 | Singed | -0.30 | 0.30 | 0.60 |  |
| 136 | Diana | -0.30 | 0.00 | 0.30 |  |
| 137 | Kassadin | -0.30 | 0.00 | 0.30 |  |
| 138 | Kha'Zix | -0.30 | 0.00 | 0.30 |  |
| 139 | Leona | -0.30 | 0.00 | 0.30 |  |
| 140 | Locke | -0.30 | 0.00 | 0.30 |  |
| 141 | Renekton | -0.30 | 0.00 | 0.30 |  |
| 142 | Sejuani | -0.30 | 0.00 | 0.30 |  |
| 143 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 144 | Sion | -0.34 | 0.35 | 0.69 |  |
| 145 | Shen | -0.35 | 0.30 | 0.65 |  |
| 146 | Pyke | -0.35 | 0.00 | 0.35 |  |
| 147 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 148 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 149 | Warwick | -0.36 | 0.49 | 0.85 |  |
| 150 | Garen | -0.37 | 0.19 | 0.56 |  |
| 151 | Janna | -0.40 | 0.00 | 0.40 |  |
| 152 | Karthus | -0.43 | 0.00 | 0.43 |  |
| 153 | Zac | -0.45 | 0.30 | 0.75 |  |
| 154 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 155 | Gragas | -0.46 | 0.00 | 0.46 |  |
| 156 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 157 | Mordekaiser | -0.49 | 0.07 | 0.56 |  |
| 158 | Skarner | -0.51 | 0.09 | 0.60 |  |
| 159 | Vi | -0.51 | 0.07 | 0.58 |  |
| 160 | Darius | -0.56 | 0.00 | 0.56 |  |
| 161 | Trundle | -0.56 | 0.00 | 0.56 |  |
| 162 | Yorick | -0.56 | 0.00 | 0.56 |  |
| 163 | Katarina | -0.58 | 0.00 | 0.58 |  |
| 164 | Blitzcrank | -0.60 | 0.00 | 0.60 |  |
| 165 | Cho'Gath | -0.60 | 0.00 | 0.60 |  |
| 166 | Dr. Mundo | -0.60 | 0.00 | 0.60 |  |
| 167 | Naafiri | -0.60 | 0.00 | 0.60 |  |
| 168 | Rumble | -0.60 | 0.00 | 0.60 |  |
| 169 | Taric | -0.60 | 0.00 | 0.60 |  |
| 170 | Tahm Kench | -0.78 | 0.00 | 0.78 |  |
| 171 | Galio | -0.79 | 0.00 | 0.79 |  |
| 172 | Nunu & Willump | -0.89 | 0.20 | 1.09 |  |
