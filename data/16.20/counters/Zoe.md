# Counters to Zoe (patch 26.20)

Every champion ranked by what its kit does against Zoe's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zoe's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zoe` for the full ledger of a matchup, with sources.

## Top 10

### 1. Samira (net +0.78)

- **0.55** projectile block: Blade Whirl blocks Zoe's Sleepy Trouble Bubble, a projectile. Blade Whirl for 0.75 s; Sleepy Trouble Bubble takes 0.68 s to land, enough to react. (Samira W Blade Whirl → Zoe E Sleepy Trouble Bubble)
- **0.27** projectile block: Blade Whirl blocks Zoe's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Zoe basic attacks)
- **0.26** projectile block: Blade Whirl blocks Zoe's Paddle Star!, a projectile. Blade Whirl for 0.75 s; Paddle Star! takes 0.92 s to land, enough to react. (Samira W Blade Whirl → Zoe Q Paddle Star!)

### 2. Mel (net +0.74)

- **0.51** projectile block: Rebuttal blocks Zoe's Sleepy Trouble Bubble, a projectile. Rebuttal for 0.75 s; Sleepy Trouble Bubble takes 0.68 s to land, enough to react. (Mel W Rebuttal → Zoe E Sleepy Trouble Bubble)
- **0.27** projectile block: Rebuttal blocks Zoe's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Zoe basic attacks)
- **0.25** projectile block: Rebuttal blocks Zoe's Paddle Star!, a projectile. Rebuttal for 0.75 s; Paddle Star! takes 0.92 s to land, enough to react. (Mel W Rebuttal → Zoe Q Paddle Star!)

### 3. Braum (net +0.73)

- **0.70** projectile block: Unbreakable blocks Zoe's Sleepy Trouble Bubble, a projectile. Unbreakable for 4 s, long enough to use ahead of Sleepy Trouble Bubble. (Braum E Unbreakable → Zoe E Sleepy Trouble Bubble)
- **0.45** projectile block: Unbreakable blocks Zoe's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Zoe basic attacks)
- **0.40** projectile block: Unbreakable blocks Zoe's Paddle Star!, a projectile. Unbreakable for 4 s, long enough to use ahead of Paddle Star!. (Braum E Unbreakable → Zoe Q Paddle Star!)
- Watch out: Zoe's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 4. Yasuo (net +0.70)

- **0.63** projectile block: Wind Wall blocks Zoe's Sleepy Trouble Bubble, a projectile. Wind Wall for 4 s, long enough to use ahead of Sleepy Trouble Bubble. (Yasuo W Wind Wall → Zoe E Sleepy Trouble Bubble)
- **0.35** projectile block: Wind Wall blocks Zoe's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Zoe basic attacks)
- **0.28** projectile block: Wind Wall blocks Zoe's Paddle Star!, a projectile. Wind Wall for 4 s, long enough to use ahead of Paddle Star!. (Yasuo W Wind Wall → Zoe Q Paddle Star!)
- Watch out: Zoe's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 5. Elise (net +0.61)

- **0.61** untargetable: Rappel makes Elise untargetable, dodging Zoe's Sleepy Trouble Bubble. Untargetable for 0.6 s; Sleepy Trouble Bubble takes 0.68 s to land, enough to react. (Elise E Rappel → Zoe E Sleepy Trouble Bubble)

### 6. Morgana (net +0.49)

- **0.65** cc immunity: Black Shield makes Morgana immune to Zoe's Sleepy Trouble Bubble (sleep, slow, drowsy). Immune for 5 s, long enough to use ahead of Sleepy Trouble Bubble. (Morgana E Black Shield → Zoe E Sleepy Trouble Bubble)
- Watch out: Zoe's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

### 7. Fiora (net +0.47)

- **0.75** parry: Riposte parries Zoe's Sleepy Trouble Bubble and stuns back. Parry for 0.75 s; Sleepy Trouble Bubble takes 0.68 s to land, enough to react. Negating Sleepy Trouble Bubble's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Zoe E Sleepy Trouble Bubble)
- **0.08** attack speed slow: Riposte cuts Zoe's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Zoe basic attacks)
- Watch out: Zoe's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### 8. Teemo (net +0.43)

- **0.43** blind: Blinding Dart's blind makes Zoe's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Zoe basic attacks)

### 9. Vladimir (net +0.42)

- **0.65** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zoe's Sleepy Trouble Bubble. Untargetable for 2 s, long enough to use ahead of Sleepy Trouble Bubble. (Vladimir W Sanguine Pool → Zoe E Sleepy Trouble Bubble)
- Watch out: Zoe's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 10. Maokai (net +0.38)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Zoe's Sleepy Trouble Bubble. Untargetable for 1.4 s; Sleepy Trouble Bubble takes 0.68 s to land, enough to react. (Maokai W Twisted Advance → Zoe E Sleepy Trouble Bubble)
- Watch out: Zoe's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +0.78 | 0.78 | 0.00 | projectile block (Blade Whirl) |
| 2 | Mel | +0.74 | 0.74 | 0.00 | projectile block (Rebuttal) |
| 3 | Braum | +0.73 | 1.05 | 0.32 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Yasuo | +0.70 | 0.90 | 0.20 | projectile block (Wind Wall) |
| 5 | Elise | +0.61 | 0.61 | 0.00 |  |
| 6 | Morgana | +0.49 | 0.65 | 0.16 |  |
| 7 | Fiora | +0.47 | 0.79 | 0.32 |  |
| 8 | Teemo | +0.43 | 0.43 | 0.00 | blind (Blinding Dart) |
| 9 | Vladimir | +0.42 | 0.65 | 0.23 |  |
| 10 | Maokai | +0.38 | 0.70 | 0.32 |  |
| 11 | Udyr | +0.38 | 0.70 | 0.32 |  |
| 12 | Aurora | +0.38 | 0.38 | 0.00 |  |
| 13 | Milio | +0.36 | 0.36 | 0.00 |  |
| 14 | Bard | +0.35 | 0.35 | 0.00 |  |
| 15 | Lissandra | +0.35 | 0.35 | 0.00 |  |
| 16 | Xayah | +0.34 | 0.34 | 0.00 |  |
| 17 | Cassiopeia | +0.33 | 0.33 | 0.00 |  |
| 18 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 19 | Sivir | +0.30 | 0.30 | 0.00 |  |
| 20 | Gwen | +0.29 | 0.61 | 0.32 |  |
| 21 | Kalista | +0.26 | 0.26 | 0.00 |  |
| 22 | Kayle | +0.25 | 0.25 | 0.00 |  |
| 23 | Master Yi | +0.24 | 0.73 | 0.49 |  |
| 24 | Camille | +0.23 | 0.39 | 0.16 |  |
| 25 | Yuumi | +0.21 | 0.70 | 0.49 |  |
| 26 | Kled | +0.21 | 0.33 | 0.12 |  |
| 27 | Rek'Sai | +0.19 | 0.39 | 0.20 |  |
| 28 | Ekko | +0.18 | 0.40 | 0.22 |  |
| 29 | Kindred | +0.16 | 0.16 | 0.00 |  |
| 30 | Zaahen | +0.15 | 0.35 | 0.20 |  |
| 31 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 32 | Evelynn | +0.13 | 0.35 | 0.22 |  |
| 33 | Shaco | +0.13 | 0.35 | 0.22 |  |
| 34 | Zed | +0.12 | 0.34 | 0.22 |  |
| 35 | Nocturne | +0.10 | 0.42 | 0.32 |  |
| 36 | Aphelios | +0.07 | 0.07 | 0.00 |  |
| 37 | Corki | +0.07 | 0.07 | 0.00 |  |
| 38 | Heimerdinger | +0.07 | 0.07 | 0.00 |  |
| 39 | Vex | +0.07 | 0.07 | 0.00 |  |
| 40 | Nilah | +0.04 | 0.30 | 0.26 |  |
| 41 | Annie | +0.04 | 0.04 | 0.00 |  |
| 42 | Jax | +0.03 | 0.35 | 0.32 |  |
| 43 | Pantheon | +0.02 | 0.30 | 0.28 |  |
| 44 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 45 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 46 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 47 | Azir | 0.00 | 0.00 | 0.00 |  |
| 48 | Brand | 0.00 | 0.00 | 0.00 |  |
| 49 | Draven | 0.00 | 0.00 | 0.00 |  |
| 50 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 51 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 52 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 53 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 54 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 55 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 56 | Karma | 0.00 | 0.00 | 0.00 |  |
| 57 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 58 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 59 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 60 | Lux | 0.00 | 0.00 | 0.00 |  |
| 61 | Nami | 0.00 | 0.00 | 0.00 |  |
| 62 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 63 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 64 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 65 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 66 | Senna | 0.00 | 0.00 | 0.00 |  |
| 67 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 68 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 69 | Sona | 0.00 | 0.00 | 0.00 |  |
| 70 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 71 | Swain | 0.00 | 0.00 | 0.00 |  |
| 72 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 73 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 74 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 75 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 76 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 77 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 78 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 79 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 80 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 81 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 82 | K'Sante | -0.02 | 0.14 | 0.16 |  |
| 83 | Alistar | -0.04 | 0.28 | 0.32 |  |
| 84 | Malphite | -0.04 | 0.28 | 0.32 |  |
| 85 | Warwick | -0.05 | 0.43 | 0.48 |  |
| 86 | Malzahar | -0.05 | 0.35 | 0.40 |  |
| 87 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 88 | Aurelion Sol | -0.07 | 0.00 | 0.07 |  |
| 89 | Graves | -0.07 | 0.00 | 0.07 |  |
| 90 | Jarvan IV | -0.08 | 0.07 | 0.15 |  |
| 91 | Yone | -0.08 | 0.07 | 0.15 |  |
| 92 | Gangplank | -0.09 | 0.56 | 0.65 |  |
| 93 | Rengar | -0.09 | 0.56 | 0.65 |  |
| 94 | Varus | -0.10 | 0.00 | 0.10 |  |
| 95 | Xin Zhao | -0.13 | 0.17 | 0.30 |  |
| 96 | Hecarim | -0.13 | 0.07 | 0.20 |  |
| 97 | Ornn | -0.13 | 0.07 | 0.20 |  |
| 98 | Rakan | -0.14 | 0.00 | 0.14 |  |
| 99 | Volibear | -0.15 | 0.07 | 0.22 |  |
| 100 | Fizz | -0.15 | 0.00 | 0.15 |  |
| 101 | Sylas | -0.15 | 0.00 | 0.15 |  |
| 102 | Briar | -0.16 | 0.00 | 0.16 |  |
| 103 | Urgot | -0.16 | 0.00 | 0.16 |  |
| 104 | Quinn | -0.17 | 0.00 | 0.17 |  |
| 105 | Ivern | -0.18 | 0.00 | 0.18 |  |
| 106 | Lillia | -0.18 | 0.00 | 0.18 |  |
| 107 | Caitlyn | -0.19 | 0.09 | 0.28 |  |
| 108 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 109 | Rell | -0.20 | 0.00 | 0.20 |  |
| 110 | Akali | -0.22 | 0.00 | 0.22 |  |
| 111 | Ambessa | -0.22 | 0.00 | 0.22 |  |
| 112 | Bel'Veth | -0.22 | 0.00 | 0.22 |  |
| 113 | Lee Sin | -0.22 | 0.00 | 0.22 |  |
| 114 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 115 | Riven | -0.22 | 0.00 | 0.22 |  |
| 116 | Talon | -0.22 | 0.00 | 0.22 |  |
| 117 | Rammus | -0.23 | 0.32 | 0.55 |  |
| 118 | Illaoi | -0.25 | 0.07 | 0.32 |  |
| 119 | Sett | -0.25 | 0.07 | 0.32 |  |
| 120 | Shyvana | -0.25 | 0.07 | 0.32 |  |
| 121 | Viego | -0.26 | 0.07 | 0.33 |  |
| 122 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 123 | Irelia | -0.28 | 0.00 | 0.28 |  |
| 124 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 125 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 126 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 127 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 128 | Garen | -0.29 | 0.32 | 0.61 |  |
| 129 | Kayn | -0.30 | 0.35 | 0.65 |  |
| 130 | Olaf | -0.30 | 0.35 | 0.65 |  |
| 131 | Aatrox | -0.30 | 0.00 | 0.30 |  |
| 132 | Nautilus | -0.30 | 0.00 | 0.30 |  |
| 133 | Tryndamere | -0.30 | 0.00 | 0.30 |  |
| 134 | Singed | -0.31 | 0.34 | 0.65 |  |
| 135 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 136 | Amumu | -0.32 | 0.00 | 0.32 |  |
| 137 | Diana | -0.32 | 0.00 | 0.32 |  |
| 138 | Kassadin | -0.32 | 0.00 | 0.32 |  |
| 139 | Kha'Zix | -0.32 | 0.00 | 0.32 |  |
| 140 | Leona | -0.32 | 0.00 | 0.32 |  |
| 141 | Locke | -0.32 | 0.00 | 0.32 |  |
| 142 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 143 | Sejuani | -0.32 | 0.00 | 0.32 |  |
| 144 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 145 | Shen | -0.34 | 0.33 | 0.67 |  |
| 146 | Sion | -0.35 | 0.38 | 0.73 |  |
| 147 | Pyke | -0.35 | 0.00 | 0.35 |  |
| 148 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 149 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 150 | Galio | -0.40 | 0.00 | 0.40 |  |
| 151 | Janna | -0.40 | 0.00 | 0.40 |  |
| 152 | Fiddlesticks | -0.44 | 0.00 | 0.44 |  |
| 153 | Karthus | -0.44 | 0.00 | 0.44 |  |
| 154 | Gragas | -0.46 | 0.00 | 0.46 |  |
| 155 | Vi | -0.48 | 0.07 | 0.55 |  |
| 156 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 157 | Taric | -0.49 | 0.16 | 0.65 |  |
| 158 | Poppy | -0.52 | 0.00 | 0.52 |  |
| 159 | Mordekaiser | -0.53 | 0.08 | 0.61 |  |
| 160 | Skarner | -0.56 | 0.09 | 0.65 |  |
| 161 | Katarina | -0.60 | 0.00 | 0.60 |  |
| 162 | Darius | -0.61 | 0.00 | 0.61 |  |
| 163 | Naafiri | -0.61 | 0.00 | 0.61 |  |
| 164 | Trundle | -0.61 | 0.00 | 0.61 |  |
| 165 | Yorick | -0.61 | 0.00 | 0.61 |  |
| 166 | Blitzcrank | -0.65 | 0.00 | 0.65 |  |
| 167 | Cho'Gath | -0.65 | 0.00 | 0.65 |  |
| 168 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 169 | Rumble | -0.65 | 0.00 | 0.65 |  |
| 170 | Zac | -0.69 | 0.00 | 0.69 |  |
| 171 | Tahm Kench | -0.80 | 0.00 | 0.80 |  |
| 172 | Nunu & Willump | -0.93 | 0.21 | 1.14 |  |
