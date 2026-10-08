# Counters to Ashe (patch 26.20)

Every champion ranked by what its kit does against Ashe's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ashe's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ashe` for the full ledger of a matchup, with sources.

## Top 10

### 1. Mel (net +1.02)

- **0.80** projectile block: Rebuttal blocks Ashe's Enchanted Crystal Arrow, a projectile. Rebuttal for 0.75 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. (Mel W Rebuttal → Ashe R Enchanted Crystal Arrow)
- **0.30** projectile block: Rebuttal blocks Ashe's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Ashe basic attacks)
- **0.27** projectile block: Rebuttal blocks Ashe's Volley, a projectile. Rebuttal for 0.75 s; Volley takes 0.25 s to land, enough to react. (Mel W Rebuttal → Ashe W Volley)

### 2. Samira (net +0.96)

- **0.80** projectile block: Blade Whirl blocks Ashe's Enchanted Crystal Arrow, a projectile. Blade Whirl for 0.75 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Ashe R Enchanted Crystal Arrow)
- **0.30** projectile block: Blade Whirl blocks Ashe's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Ashe basic attacks)
- **0.28** projectile block: Blade Whirl blocks Ashe's Volley, a projectile. Blade Whirl for 0.75 s; Volley takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Ashe W Volley)
- Watch out: Ashe's basic attacks reach 100 units farther than Samira's (600 vs 500 attack range).

### 3. Yasuo (net +0.83)

- **0.80** projectile block: Wind Wall blocks Ashe's Enchanted Crystal Arrow, a projectile. Wind Wall for 4 s, long enough to use ahead of Enchanted Crystal Arrow. (Yasuo W Wind Wall → Ashe R Enchanted Crystal Arrow)
- **0.39** projectile block: Wind Wall blocks Ashe's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Ashe basic attacks)
- **0.30** projectile block: Wind Wall blocks Ashe's Volley, a projectile. Wind Wall for 4 s, long enough to use ahead of Volley. (Yasuo W Wind Wall → Ashe W Volley)
- Watch out: Ashe's basic attacks reach 425 units farther than Yasuo's (600 vs 175 attack range).

### 4. Elise (net +0.80)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Ashe's Enchanted Crystal Arrow. Untargetable for 0.6 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. (Elise E Rappel → Ashe R Enchanted Crystal Arrow)

### 5. Braum (net +0.79)

- **0.80** projectile block: Unbreakable blocks Ashe's Enchanted Crystal Arrow, a projectile. Unbreakable for 4 s, long enough to use ahead of Enchanted Crystal Arrow. (Braum E Unbreakable → Ashe R Enchanted Crystal Arrow)
- **0.50** projectile block: Unbreakable blocks Ashe's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Ashe basic attacks)
- **0.39** projectile block: Unbreakable blocks Ashe's Volley, a projectile. Unbreakable for 4 s, long enough to use ahead of Volley. (Braum E Unbreakable → Ashe W Volley)
- Watch out: Ashe's basic attacks reach 475 units farther than Braum's (600 vs 125 attack range).

### 6. Lissandra (net +0.68)

- **0.68** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ashe's Enchanted Crystal Arrow. Untargetable for 2.5 s, long enough to use ahead of Enchanted Crystal Arrow. (Lissandra R Frozen Tomb → Ashe R Enchanted Crystal Arrow)

### 7. Sivir (net +0.62)

- **0.80** spell shield: Spell Shield's spell shield blocks Ashe's Enchanted Crystal Arrow. Spell shield for 1.5 s, long enough to use ahead of Enchanted Crystal Arrow. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ashe R Enchanted Crystal Arrow)
- Watch out: Ashe's basic attacks reach 100 units farther than Sivir's (600 vs 500 attack range).

### 8. Aurora (net +0.61)

- **0.61** untargetable: Between Worlds makes Aurora untargetable, dodging Ashe's Enchanted Crystal Arrow. Untargetable for 0.4 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Ashe R Enchanted Crystal Arrow)

### 9. Fiora (net +0.59)

- **0.90** parry: Riposte parries Ashe's Enchanted Crystal Arrow and stuns back. Parry for 0.75 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. Negating Enchanted Crystal Arrow's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ashe R Enchanted Crystal Arrow)
- **0.09** attack speed slow: Riposte cuts Ashe's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Ashe basic attacks)
- Watch out: Ashe's basic attacks reach 450 units farther than Fiora's (600 vs 150 attack range).

### 10. Bard (net +0.59)

- **0.68** untargetable: Tempered Fate makes Bard untargetable, dodging Ashe's Enchanted Crystal Arrow. Untargetable for 2.5 s, long enough to use ahead of Enchanted Crystal Arrow. (Bard R Tempered Fate → Ashe R Enchanted Crystal Arrow)
- Watch out: Ashe's basic attacks reach 100 units farther than Bard's (600 vs 500 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Mel | +1.02 | 1.02 | 0.00 | projectile block (Rebuttal) |
| 2 | Samira | +0.96 | 1.02 | 0.06 | projectile block (Blade Whirl) |
| 3 | Yasuo | +0.83 | 1.07 | 0.24 | projectile block (Wind Wall) |
| 4 | Elise | +0.80 | 0.80 | 0.00 |  |
| 5 | Braum | +0.79 | 1.15 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 6 | Lissandra | +0.68 | 0.68 | 0.00 |  |
| 7 | Sivir | +0.62 | 0.80 | 0.18 |  |
| 8 | Aurora | +0.61 | 0.61 | 0.00 |  |
| 9 | Fiora | +0.59 | 0.95 | 0.36 |  |
| 10 | Bard | +0.59 | 0.68 | 0.09 |  |
| 11 | Morgana | +0.56 | 0.83 | 0.27 |  |
| 12 | Ekko | +0.56 | 0.80 | 0.24 |  |
| 13 | Udyr | +0.48 | 0.84 | 0.36 |  |
| 14 | Vladimir | +0.48 | 0.80 | 0.32 |  |
| 15 | Xayah | +0.47 | 0.61 | 0.14 |  |
| 16 | Zaahen | +0.46 | 0.70 | 0.24 |  |
| 17 | Camille | +0.46 | 0.64 | 0.18 |  |
| 18 | Gwen | +0.44 | 0.80 | 0.36 |  |
| 19 | Maokai | +0.44 | 0.80 | 0.36 |  |
| 20 | Nocturne | +0.44 | 0.80 | 0.36 |  |
| 21 | Evelynn | +0.44 | 0.68 | 0.24 |  |
| 22 | Rek'Sai | +0.44 | 0.68 | 0.24 |  |
| 23 | Shaco | +0.44 | 0.68 | 0.24 |  |
| 24 | Kled | +0.44 | 0.60 | 0.16 |  |
| 25 | Kalista | +0.42 | 0.47 | 0.05 |  |
| 26 | Milio | +0.41 | 0.55 | 0.14 |  |
| 27 | Master Yi | +0.38 | 0.85 | 0.47 |  |
| 28 | Zed | +0.37 | 0.61 | 0.24 |  |
| 29 | Kayle | +0.34 | 0.34 | 0.00 |  |
| 30 | Lulu | +0.34 | 0.34 | 0.00 |  |
| 31 | Warwick | +0.33 | 0.75 | 0.42 |  |
| 32 | Teemo | +0.29 | 0.47 | 0.18 | blind (Blinding Dart) |
| 33 | Yuumi | +0.26 | 0.80 | 0.54 |  |
| 34 | Alistar | +0.20 | 0.56 | 0.36 |  |
| 35 | Kindred | +0.19 | 0.28 | 0.09 |  |
| 36 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 37 | Varus | +0.12 | 0.18 | 0.06 |  |
| 38 | Pantheon | +0.11 | 0.40 | 0.29 |  |
| 39 | Aphelios | +0.03 | 0.03 | 0.00 |  |
| 40 | Heimerdinger | +0.03 | 0.03 | 0.00 |  |
| 41 | Sion | +0.02 | 0.82 | 0.80 |  |
| 42 | Jax | +0.02 | 0.38 | 0.36 |  |
| 43 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 44 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 45 | Annie | 0.00 | 0.00 | 0.00 |  |
| 46 | Brand | 0.00 | 0.00 | 0.00 |  |
| 47 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 48 | Corki | 0.00 | 0.00 | 0.00 |  |
| 49 | Draven | 0.00 | 0.00 | 0.00 |  |
| 50 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 51 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 52 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 53 | Lux | 0.00 | 0.00 | 0.00 |  |
| 54 | Nami | 0.00 | 0.00 | 0.00 |  |
| 55 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 56 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 57 | Senna | 0.00 | 0.00 | 0.00 |  |
| 58 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 59 | Sona | 0.00 | 0.00 | 0.00 |  |
| 60 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 61 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 62 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 63 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 64 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 65 | Vex | 0.00 | 0.00 | 0.00 |  |
| 66 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 67 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 68 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 69 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 70 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 71 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 72 | Kayn | -0.01 | 0.68 | 0.69 |  |
| 73 | Nilah | -0.01 | 0.33 | 0.34 |  |
| 74 | Olaf | -0.02 | 0.70 | 0.72 |  |
| 75 | Gangplank | -0.05 | 0.67 | 0.72 |  |
| 76 | Rengar | -0.05 | 0.67 | 0.72 |  |
| 77 | Azir | -0.05 | 0.00 | 0.05 |  |
| 78 | Gnar | -0.05 | 0.00 | 0.05 |  |
| 79 | Xin Zhao | -0.06 | 0.30 | 0.36 |  |
| 80 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 81 | Kai'Sa | -0.07 | 0.00 | 0.07 |  |
| 82 | LeBlanc | -0.07 | 0.00 | 0.07 |  |
| 83 | Nidalee | -0.07 | 0.00 | 0.07 |  |
| 84 | Jayce | -0.09 | 0.00 | 0.09 |  |
| 85 | Thresh | -0.09 | 0.00 | 0.09 |  |
| 86 | Graves | -0.11 | 0.00 | 0.11 |  |
| 87 | Malphite | -0.12 | 0.24 | 0.36 |  |
| 88 | Jinx | -0.14 | 0.00 | 0.14 |  |
| 89 | Karma | -0.14 | 0.00 | 0.14 |  |
| 90 | Orianna | -0.14 | 0.00 | 0.14 |  |
| 91 | Seraphine | -0.14 | 0.00 | 0.14 |  |
| 92 | Swain | -0.14 | 0.00 | 0.14 |  |
| 93 | Viktor | -0.14 | 0.00 | 0.14 |  |
| 94 | Malzahar | -0.16 | 0.42 | 0.58 |  |
| 95 | Rammus | -0.16 | 0.36 | 0.52 |  |
| 96 | Briar | -0.18 | 0.00 | 0.18 |  |
| 97 | Fizz | -0.18 | 0.00 | 0.18 |  |
| 98 | Jarvan IV | -0.18 | 0.00 | 0.18 |  |
| 99 | Kog'Maw | -0.18 | 0.00 | 0.18 |  |
| 100 | K'Sante | -0.18 | 0.00 | 0.18 |  |
| 101 | Rakan | -0.18 | 0.00 | 0.18 |  |
| 102 | Sylas | -0.18 | 0.00 | 0.18 |  |
| 103 | Yone | -0.18 | 0.00 | 0.18 |  |
| 104 | Ivern | -0.19 | 0.00 | 0.19 |  |
| 105 | Quinn | -0.21 | 0.00 | 0.21 |  |
| 106 | Urgot | -0.22 | 0.00 | 0.22 |  |
| 107 | Akali | -0.24 | 0.00 | 0.24 |  |
| 108 | Ambessa | -0.24 | 0.00 | 0.24 |  |
| 109 | Bel'Veth | -0.24 | 0.00 | 0.24 |  |
| 110 | Hecarim | -0.24 | 0.00 | 0.24 |  |
| 111 | Lee Sin | -0.24 | 0.00 | 0.24 |  |
| 112 | Wukong | -0.24 | 0.00 | 0.24 |  |
| 113 | Ornn | -0.24 | 0.00 | 0.24 |  |
| 114 | Qiyana | -0.24 | 0.00 | 0.24 |  |
| 115 | Rell | -0.24 | 0.00 | 0.24 |  |
| 116 | Riven | -0.24 | 0.00 | 0.24 |  |
| 117 | Talon | -0.24 | 0.00 | 0.24 |  |
| 118 | Volibear | -0.24 | 0.00 | 0.24 |  |
| 119 | Lillia | -0.25 | 0.00 | 0.25 |  |
| 120 | Caitlyn | -0.28 | 0.00 | 0.28 |  |
| 121 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 122 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 123 | Viego | -0.30 | 0.00 | 0.30 |  |
| 124 | Pyke | -0.32 | 0.00 | 0.32 |  |
| 125 | Shen | -0.33 | 0.36 | 0.69 |  |
| 126 | Galio | -0.33 | 0.00 | 0.33 |  |
| 127 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 128 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 129 | Aatrox | -0.36 | 0.00 | 0.36 |  |
| 130 | Amumu | -0.36 | 0.00 | 0.36 |  |
| 131 | Diana | -0.36 | 0.00 | 0.36 |  |
| 132 | Illaoi | -0.36 | 0.00 | 0.36 |  |
| 133 | Irelia | -0.36 | 0.00 | 0.36 |  |
| 134 | Kassadin | -0.36 | 0.00 | 0.36 |  |
| 135 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 136 | Leona | -0.36 | 0.00 | 0.36 |  |
| 137 | Locke | -0.36 | 0.00 | 0.36 |  |
| 138 | Nautilus | -0.36 | 0.00 | 0.36 |  |
| 139 | Renekton | -0.36 | 0.00 | 0.36 |  |
| 140 | Sejuani | -0.36 | 0.00 | 0.36 |  |
| 141 | Sett | -0.36 | 0.00 | 0.36 |  |
| 142 | Shyvana | -0.36 | 0.00 | 0.36 |  |
| 143 | Tryndamere | -0.36 | 0.00 | 0.36 |  |
| 144 | Akshan | -0.37 | 0.00 | 0.37 |  |
| 145 | Lucian | -0.37 | 0.00 | 0.37 |  |
| 146 | Janna | -0.40 | 0.00 | 0.40 |  |
| 147 | Katarina | -0.41 | 0.18 | 0.59 |  |
| 148 | Twisted Fate | -0.42 | 0.00 | 0.42 |  |
| 149 | Vel'Koz | -0.42 | 0.00 | 0.42 |  |
| 150 | Garen | -0.44 | 0.28 | 0.72 |  |
| 151 | Taric | -0.44 | 0.28 | 0.72 |  |
| 152 | Singed | -0.45 | 0.27 | 0.72 |  |
| 153 | Xerath | -0.45 | 0.00 | 0.45 |  |
| 154 | Gragas | -0.46 | 0.00 | 0.46 |  |
| 155 | Vi | -0.47 | 0.00 | 0.47 |  |
| 156 | Fiddlesticks | -0.48 | 0.00 | 0.48 |  |
| 157 | Karthus | -0.55 | 0.00 | 0.55 |  |
| 158 | Taliyah | -0.55 | 0.00 | 0.55 |  |
| 159 | Poppy | -0.56 | 0.00 | 0.56 |  |
| 160 | Zac | -0.61 | 0.00 | 0.61 |  |
| 161 | Mordekaiser | -0.63 | 0.09 | 0.72 |  |
| 162 | Naafiri | -0.63 | 0.00 | 0.63 |  |
| 163 | Tahm Kench | -0.65 | 0.00 | 0.65 |  |
| 164 | Skarner | -0.68 | 0.04 | 0.72 |  |
| 165 | Blitzcrank | -0.72 | 0.00 | 0.72 |  |
| 166 | Cho'Gath | -0.72 | 0.00 | 0.72 |  |
| 167 | Darius | -0.72 | 0.00 | 0.72 |  |
| 168 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 169 | Rumble | -0.72 | 0.00 | 0.72 |  |
| 170 | Trundle | -0.72 | 0.00 | 0.72 |  |
| 171 | Yorick | -0.72 | 0.00 | 0.72 |  |
| 172 | Nunu & Willump | -1.01 | 0.09 | 1.10 |  |
