# Counters to Brand (patch 26.20)

Every champion ranked by what its kit does against Brand's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Brand's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Brand` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +0.84)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Brand's Pyroclasm. Untargetable for 0.6 s; Pyroclasm takes 1.25 s to land, enough to react. (Elise E Rappel → Brand R Pyroclasm)
- **0.42** untargetable: Rappel makes Elise untargetable, dodging Brand's Sear. Untargetable for 0.6 s; Sear takes 0.94 s to land, enough to react. (Elise E Rappel → Brand Q Sear)
- **0.32** untargetable: Rappel makes Elise untargetable, dodging Brand's Conflagration. Untargetable for 0.6 s; Conflagration takes 1 s to land, enough to react. (Elise E Rappel → Brand E Conflagration)

### 2. Mel (net +0.79)

- **0.55** projectile block: Rebuttal blocks Brand's Pyroclasm, a projectile. Rebuttal for 0.75 s; Pyroclasm takes 1.25 s to land, enough to react. (Mel W Rebuttal → Brand R Pyroclasm)
- **0.38** projectile block: Rebuttal blocks Brand's Sear, a projectile. Rebuttal for 0.75 s; Sear takes 0.94 s to land, enough to react. (Mel W Rebuttal → Brand Q Sear)
- **0.18** projectile block: Rebuttal blocks Brand's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Brand basic attacks)

### 3. Samira (net +0.79)

- **0.55** projectile block: Blade Whirl blocks Brand's Pyroclasm, a projectile. Blade Whirl for 0.75 s; Pyroclasm takes 1.25 s to land, enough to react. (Samira W Blade Whirl → Brand R Pyroclasm)
- **0.39** projectile block: Blade Whirl blocks Brand's Sear, a projectile. Blade Whirl for 0.75 s; Sear takes 0.94 s to land, enough to react. (Samira W Blade Whirl → Brand Q Sear)
- **0.19** projectile block: Blade Whirl blocks Brand's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Brand basic attacks)

### 4. Bard (net +0.76)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Brand's Pyroclasm. Untargetable for 2.5 s, long enough to use ahead of Pyroclasm. (Bard R Tempered Fate → Brand R Pyroclasm)
- **0.31** untargetable: Tempered Fate makes Bard untargetable, dodging Brand's Sear. Untargetable for 2.5 s, long enough to use ahead of Sear. (Bard R Tempered Fate → Brand Q Sear)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Brand's Conflagration. Untargetable for 2.5 s, long enough to use ahead of Conflagration. (Bard R Tempered Fate → Brand E Conflagration)

### 5. Lissandra (net +0.76)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Brand's Pyroclasm. Untargetable for 2.5 s, long enough to use ahead of Pyroclasm. (Lissandra R Frozen Tomb → Brand R Pyroclasm)
- **0.31** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Brand's Sear. Untargetable for 2.5 s, long enough to use ahead of Sear. (Lissandra R Frozen Tomb → Brand Q Sear)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Brand's Conflagration. Untargetable for 2.5 s, long enough to use ahead of Conflagration. (Lissandra R Frozen Tomb → Brand E Conflagration)

### 6. Braum (net +0.73)

- **0.60** projectile block: Unbreakable blocks Brand's Sear, a projectile. Unbreakable for 4 s, long enough to use ahead of Sear. (Braum E Unbreakable → Brand Q Sear)
- **0.55** projectile block: Unbreakable blocks Brand's Pyroclasm, a projectile. Unbreakable for 4 s, long enough to use ahead of Pyroclasm. (Braum E Unbreakable → Brand R Pyroclasm)
- **0.31** projectile block: Unbreakable blocks Brand's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Brand basic attacks)
- Watch out: Brand's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 7. Maokai (net +0.70)

- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Brand's Pyroclasm. Untargetable for 1.4 s; Pyroclasm takes 1.25 s to land, enough to react. (Maokai W Twisted Advance → Brand R Pyroclasm)
- **0.53** untargetable: Twisted Advance makes Maokai untargetable, dodging Brand's Sear. Untargetable for 1.4 s; Sear takes 0.94 s to land, enough to react. (Maokai W Twisted Advance → Brand Q Sear)
- **0.42** untargetable: Twisted Advance makes Maokai untargetable, dodging Brand's Conflagration. Untargetable for 1.4 s; Conflagration takes 1 s to land, enough to react. (Maokai W Twisted Advance → Brand E Conflagration)
- Watch out: Brand's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 8. Fiora (net +0.69)

- **0.55** parry: Riposte parries Brand's Pyroclasm. Parry for 0.75 s; Pyroclasm takes 1.25 s to land, enough to react. (Fiora W Riposte → Brand R Pyroclasm)
- **0.54** parry: Riposte parries Brand's Sear and stuns back. Parry for 0.75 s; Sear takes 0.94 s to land, enough to react. Negating Sear's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Brand Q Sear)
- **0.33** parry: Riposte parries Brand's Conflagration. Parry for 0.75 s; Conflagration takes 1 s to land, enough to react. (Fiora W Riposte → Brand E Conflagration)
- Watch out: Brand's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### 9. Yasuo (net +0.69)

- **0.55** projectile block: Wind Wall blocks Brand's Pyroclasm, a projectile. Wind Wall for 4 s, long enough to use ahead of Pyroclasm. (Yasuo W Wind Wall → Brand R Pyroclasm)
- **0.43** projectile block: Wind Wall blocks Brand's Sear, a projectile. Wind Wall for 4 s, long enough to use ahead of Sear. (Yasuo W Wind Wall → Brand Q Sear)
- **0.24** projectile block: Wind Wall blocks Brand's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Brand basic attacks)
- Watch out: Brand's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 10. Aurora (net +0.69)

- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Brand's Pyroclasm. Untargetable for 0.4 s; Pyroclasm takes 1.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Brand R Pyroclasm)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Brand's Sear. Untargetable for 0.4 s; Sear takes 0.94 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Brand Q Sear)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Brand's Conflagration. Untargetable for 0.4 s; Conflagration takes 1 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Brand E Conflagration)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +0.84 | 0.84 | 0.00 |  |
| 2 | Mel | +0.79 | 0.79 | 0.00 | projectile block (Rebuttal) |
| 3 | Samira | +0.79 | 0.79 | 0.00 | projectile block (Blade Whirl) |
| 4 | Bard | +0.76 | 0.76 | 0.00 |  |
| 5 | Lissandra | +0.76 | 0.76 | 0.00 |  |
| 6 | Braum | +0.73 | 0.95 | 0.22 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Maokai | +0.70 | 0.92 | 0.22 |  |
| 8 | Fiora | +0.69 | 0.91 | 0.22 |  |
| 9 | Yasuo | +0.69 | 0.83 | 0.14 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 10 | Aurora | +0.69 | 0.69 | 0.00 |  |
| 11 | Xayah | +0.69 | 0.69 | 0.00 |  |
| 12 | Sivir | +0.65 | 0.65 | 0.00 |  |
| 13 | Vladimir | +0.64 | 0.85 | 0.21 |  |
| 14 | Gwen | +0.62 | 0.84 | 0.22 |  |
| 15 | Ekko | +0.62 | 0.77 | 0.15 |  |
| 16 | Rek'Sai | +0.62 | 0.76 | 0.14 |  |
| 17 | Evelynn | +0.61 | 0.76 | 0.15 |  |
| 18 | Shaco | +0.61 | 0.76 | 0.15 |  |
| 19 | Camille | +0.61 | 0.72 | 0.11 |  |
| 20 | Yuumi | +0.59 | 1.09 | 0.50 |  |
| 21 | Kayle | +0.56 | 0.56 | 0.00 |  |
| 22 | Udyr | +0.55 | 0.77 | 0.22 |  |
| 23 | Master Yi | +0.54 | 0.98 | 0.44 |  |
| 24 | Zed | +0.54 | 0.69 | 0.15 |  |
| 25 | Nocturne | +0.53 | 0.75 | 0.22 |  |
| 26 | Morgana | +0.40 | 0.51 | 0.11 |  |
| 27 | Kindred | +0.36 | 0.36 | 0.00 |  |
| 28 | Milio | +0.36 | 0.36 | 0.00 |  |
| 29 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 30 | Kled | +0.28 | 0.36 | 0.08 |  |
| 31 | Kalista | +0.28 | 0.28 | 0.00 |  |
| 32 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 33 | Pantheon | +0.26 | 0.51 | 0.25 |  |
| 34 | Zaahen | +0.24 | 0.38 | 0.14 |  |
| 35 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 36 | Kayn | +0.17 | 0.76 | 0.59 |  |
| 37 | Xin Zhao | +0.17 | 0.38 | 0.21 |  |
| 38 | Alistar | +0.09 | 0.31 | 0.22 |  |
| 39 | Annie | +0.08 | 0.08 | 0.00 |  |
| 40 | Aphelios | +0.06 | 0.06 | 0.00 |  |
| 41 | Heimerdinger | +0.06 | 0.06 | 0.00 |  |
| 42 | Rengar | +0.05 | 0.49 | 0.44 |  |
| 43 | Nilah | +0.02 | 0.20 | 0.18 |  |
| 44 | Jax | +0.01 | 0.23 | 0.22 |  |
| 45 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 46 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 47 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 48 | Azir | 0.00 | 0.00 | 0.00 |  |
| 49 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 50 | Corki | 0.00 | 0.00 | 0.00 |  |
| 51 | Draven | 0.00 | 0.00 | 0.00 |  |
| 52 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 53 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 54 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 55 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 56 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 57 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 58 | Karma | 0.00 | 0.00 | 0.00 |  |
| 59 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 60 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 61 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 62 | Lux | 0.00 | 0.00 | 0.00 |  |
| 63 | Nami | 0.00 | 0.00 | 0.00 |  |
| 64 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 65 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 66 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 67 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 68 | Senna | 0.00 | 0.00 | 0.00 |  |
| 69 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 70 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 71 | Sona | 0.00 | 0.00 | 0.00 |  |
| 72 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 73 | Swain | 0.00 | 0.00 | 0.00 |  |
| 74 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 75 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 76 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 77 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 78 | Vex | 0.00 | 0.00 | 0.00 |  |
| 79 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 80 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 81 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 82 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 83 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 84 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 85 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 86 | Gangplank | -0.01 | 0.43 | 0.44 |  |
| 87 | Malzahar | -0.01 | 0.39 | 0.40 |  |
| 88 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 89 | Graves | -0.05 | 0.00 | 0.05 |  |
| 90 | Olaf | -0.06 | 0.38 | 0.44 |  |
| 91 | Taric | -0.08 | 0.36 | 0.44 |  |
| 92 | Malphite | -0.08 | 0.14 | 0.22 |  |
| 93 | Rakan | -0.09 | 0.00 | 0.09 |  |
| 94 | Garen | -0.10 | 0.31 | 0.41 |  |
| 95 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 96 | Aurelion Sol | -0.10 | 0.00 | 0.10 |  |
| 97 | Fizz | -0.10 | 0.00 | 0.10 |  |
| 98 | Jarvan IV | -0.10 | 0.00 | 0.10 |  |
| 99 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 100 | Yone | -0.10 | 0.00 | 0.10 |  |
| 101 | Briar | -0.11 | 0.00 | 0.11 |  |
| 102 | K'Sante | -0.11 | 0.00 | 0.11 |  |
| 103 | Urgot | -0.11 | 0.00 | 0.11 |  |
| 104 | Varus | -0.11 | 0.00 | 0.11 |  |
| 105 | Lillia | -0.12 | 0.00 | 0.12 |  |
| 106 | Hecarim | -0.14 | 0.00 | 0.14 |  |
| 107 | Wukong | -0.14 | 0.00 | 0.14 |  |
| 108 | Ornn | -0.14 | 0.00 | 0.14 |  |
| 109 | Rell | -0.14 | 0.00 | 0.14 |  |
| 110 | Akali | -0.15 | 0.00 | 0.15 |  |
| 111 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 112 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 113 | Lee Sin | -0.15 | 0.00 | 0.15 |  |
| 114 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 115 | Riven | -0.15 | 0.00 | 0.15 |  |
| 116 | Talon | -0.15 | 0.00 | 0.15 |  |
| 117 | Volibear | -0.15 | 0.00 | 0.15 |  |
| 118 | Warwick | -0.16 | 0.39 | 0.55 |  |
| 119 | Irelia | -0.19 | 0.00 | 0.19 |  |
| 120 | Ivern | -0.19 | 0.00 | 0.19 |  |
| 121 | Sion | -0.20 | 0.39 | 0.59 |  |
| 122 | Aatrox | -0.21 | 0.00 | 0.21 |  |
| 123 | Nautilus | -0.21 | 0.00 | 0.21 |  |
| 124 | Tryndamere | -0.21 | 0.00 | 0.21 |  |
| 125 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 126 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 127 | Diana | -0.22 | 0.00 | 0.22 |  |
| 128 | Illaoi | -0.22 | 0.00 | 0.22 |  |
| 129 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 130 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 131 | Leona | -0.22 | 0.00 | 0.22 |  |
| 132 | Locke | -0.22 | 0.00 | 0.22 |  |
| 133 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 134 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 135 | Sett | -0.22 | 0.00 | 0.22 |  |
| 136 | Shyvana | -0.22 | 0.00 | 0.22 |  |
| 137 | Quinn | -0.23 | 0.00 | 0.23 |  |
| 138 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 139 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 140 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 141 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 142 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 143 | Galio | -0.33 | 0.00 | 0.33 |  |
| 144 | Pyke | -0.33 | 0.00 | 0.33 |  |
| 145 | Xerath | -0.33 | 0.00 | 0.33 |  |
| 146 | Rammus | -0.35 | 0.22 | 0.57 |  |
| 147 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 148 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 149 | Viego | -0.35 | 0.00 | 0.35 |  |
| 150 | Mordekaiser | -0.36 | 0.05 | 0.41 |  |
| 151 | Skarner | -0.37 | 0.07 | 0.44 |  |
| 152 | Shen | -0.38 | 0.22 | 0.60 |  |
| 153 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 154 | Janna | -0.40 | 0.00 | 0.40 |  |
| 155 | Darius | -0.41 | 0.00 | 0.41 |  |
| 156 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 157 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 158 | Gragas | -0.42 | 0.00 | 0.42 |  |
| 159 | Poppy | -0.42 | 0.00 | 0.42 |  |
| 160 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 161 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 162 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 163 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 164 | Singed | -0.44 | 0.00 | 0.44 |  |
| 165 | Fiddlesticks | -0.47 | 0.00 | 0.47 |  |
| 166 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 167 | Katarina | -0.50 | 0.00 | 0.50 |  |
| 168 | Naafiri | -0.56 | 0.00 | 0.56 |  |
| 169 | Vi | -0.65 | 0.00 | 0.65 |  |
| 170 | Tahm Kench | -0.71 | 0.00 | 0.71 |  |
| 171 | Zac | -0.71 | 0.00 | 0.71 |  |
| 172 | Nunu & Willump | -0.76 | 0.17 | 0.93 |  |
