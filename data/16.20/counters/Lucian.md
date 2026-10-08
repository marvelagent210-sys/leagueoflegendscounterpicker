# Counters to Lucian (patch 26.20)

Every champion ranked by what its kit does against Lucian's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Lucian's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Lucian` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +0.96)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Lucian's The Culling. Untargetable for 0.6 s; The Culling takes 0.43 s to land, enough to react. (Elise E Rappel → Lucian R The Culling)
- **0.28** interrupt: Cocoon's stun interrupts Lucian's The Culling (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Lucian R The Culling)
- **0.26** untargetable: Rappel makes Elise untargetable, dodging Lucian's Piercing Light. Untargetable for 0.6 s; Piercing Light takes 0.25 s to land, enough to react. (Elise E Rappel → Lucian Q Piercing Light)

### 2. Yasuo (net +0.91)

- **0.55** projectile block: Wind Wall blocks Lucian's The Culling, a projectile. Wind Wall for 4 s, long enough to use ahead of The Culling. (Yasuo W Wind Wall → Lucian R The Culling)
- **0.41** projectile block: Wind Wall blocks Lucian's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Lucian basic attacks)
- **0.34** projectile block: Wind Wall blocks Lucian's Ardent Blaze, a projectile. Wind Wall for 4 s, long enough to use ahead of Ardent Blaze. (Yasuo W Wind Wall → Lucian W Ardent Blaze)
- Watch out: Lucian's basic attacks reach 325 units farther than Yasuo's (500 vs 175 attack range).

### 3. Braum (net +0.85)

- **0.55** projectile block: Unbreakable blocks Lucian's The Culling, a projectile. Unbreakable for 4 s, long enough to use ahead of The Culling. (Braum E Unbreakable → Lucian R The Culling)
- **0.54** projectile block: Unbreakable blocks Lucian's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Lucian basic attacks)
- **0.45** projectile block: Unbreakable blocks Lucian's Ardent Blaze, a projectile. Unbreakable for 4 s, long enough to use ahead of Ardent Blaze. (Braum E Unbreakable → Lucian W Ardent Blaze)
- Watch out: Lucian's basic attacks reach 375 units farther than Braum's (500 vs 125 attack range).

### 4. Samira (net +0.79)

- **0.55** projectile block: Blade Whirl blocks Lucian's The Culling, a projectile. Blade Whirl for 0.75 s; The Culling takes 0.43 s to land, enough to react. (Samira W Blade Whirl → Lucian R The Culling)
- **0.32** projectile block: Blade Whirl blocks Lucian's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Lucian basic attacks)
- **0.30** projectile block: Blade Whirl blocks Lucian's Ardent Blaze, a projectile. Blade Whirl for 0.75 s; Ardent Blaze takes 0.81 s to land, enough to react. (Samira W Blade Whirl → Lucian W Ardent Blaze)

### 5. Mel (net +0.78)

- **0.55** projectile block: Rebuttal blocks Lucian's The Culling, a projectile. Rebuttal for 0.75 s; The Culling takes 0.43 s to land, enough to react. (Mel W Rebuttal → Lucian R The Culling)
- **0.32** projectile block: Rebuttal blocks Lucian's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Lucian basic attacks)
- **0.28** projectile block: Rebuttal blocks Lucian's Ardent Blaze, a projectile. Rebuttal for 0.75 s; Ardent Blaze takes 0.81 s to land, enough to react. (Mel W Rebuttal → Lucian W Ardent Blaze)

### 6. Kayle (net +0.76)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Lucian's The Culling. Invulnerable for 2.5 s, long enough to use ahead of The Culling. (Kayle R Divine Judgment → Lucian R The Culling)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Lucian's Piercing Light. Invulnerable for 2.5 s, long enough to use ahead of Piercing Light. (Kayle R Divine Judgment → Lucian Q Piercing Light)
- **0.11** range: Kayle's basic attacks reach 125 units farther than Lucian's (625 vs 500 attack range). Lucian closes the gap with Relentless Pursuit. (Kayle basic attacks → Lucian basic attacks)

### 7. Lissandra (net +0.76)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Lucian's The Culling. Untargetable for 2.5 s, long enough to use ahead of The Culling. (Lissandra R Frozen Tomb → Lucian R The Culling)
- **0.28** interrupt: Frozen Tomb's stun interrupts Lucian's The Culling (normal channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Lucian R The Culling)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Lucian's Piercing Light. Untargetable for 2.5 s, long enough to use ahead of Piercing Light. (Lissandra R Frozen Tomb → Lucian Q Piercing Light)

### 8. Camille (net +0.75)

- **0.55** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Lucian's The Culling. Untargetable for 0.5 s; The Culling takes 0.43 s to land, enough to react. (Camille R The Hextech Ultimatum → Lucian R The Culling)
- **0.28** interrupt: Wall Dive's airborne interrupts Lucian's The Culling (normal channel). Wall Dive must land during the channel. (Camille E Wall Dive → Lucian R The Culling)
- **0.20** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Lucian's Piercing Light. Untargetable for 0.5 s; Piercing Light takes 0.25 s to land, enough to react. (Camille R The Hextech Ultimatum → Lucian Q Piercing Light)
- Watch out: Lucian's basic attacks reach 375 units farther than Camille's (500 vs 125 attack range).

### 9. Bard (net +0.74)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Lucian's The Culling. Untargetable for 2.5 s, long enough to use ahead of The Culling. (Bard R Tempered Fate → Lucian R The Culling)
- **0.28** interrupt: Tempered Fate's stasis interrupts Lucian's The Culling (normal channel). Tempered Fate must land during the channel. (Bard R Tempered Fate → Lucian R The Culling)
- **0.20** untargetable: Tempered Fate makes Bard untargetable, dodging Lucian's Piercing Light. Untargetable for 2.5 s, long enough to use ahead of Piercing Light. (Bard R Tempered Fate → Lucian Q Piercing Light)

### 10. Kayn (net +0.72)

- **0.55** untargetable: Umbral Trespass makes Kayn untargetable, dodging Lucian's The Culling. Untargetable for 0.25 s; The Culling takes 0.43 s to land, enough to react. (Kayn R Umbral Trespass → Lucian R The Culling)
- **0.28** interrupt: Blade's Reach's airborne interrupts Lucian's The Culling (normal channel). Blade's Reach must land during the channel. (Kayn W Blade's Reach → Lucian R The Culling)
- **0.20** untargetable: Umbral Trespass makes Kayn untargetable, dodging Lucian's Piercing Light. Untargetable for 0.25 s; Piercing Light takes 0.25 s to land, enough to react. (Kayn R Umbral Trespass → Lucian Q Piercing Light)
- Watch out: Lucian's basic attacks reach 325 units farther than Kayn's (500 vs 175 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +0.96 | 0.96 | 0.00 |  |
| 2 | Yasuo | +0.91 | 1.12 | 0.21 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 3 | Braum | +0.85 | 1.21 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Samira | +0.79 | 0.79 | 0.00 | projectile block (Blade Whirl) |
| 5 | Mel | +0.78 | 0.78 | 0.00 | projectile block (Rebuttal) |
| 6 | Kayle | +0.76 | 0.76 | 0.00 |  |
| 7 | Lissandra | +0.76 | 0.76 | 0.00 |  |
| 8 | Camille | +0.75 | 0.93 | 0.18 |  |
| 9 | Bard | +0.74 | 0.74 | 0.00 |  |
| 10 | Kayn | +0.72 | 0.93 | 0.21 |  |
| 11 | Rek'Sai | +0.72 | 0.93 | 0.21 |  |
| 12 | Yuumi | +0.71 | 0.78 | 0.07 |  |
| 13 | Evelynn | +0.69 | 0.93 | 0.24 |  |
| 14 | Shaco | +0.69 | 0.93 | 0.24 |  |
| 15 | Vladimir | +0.68 | 0.68 | 0.00 |  |
| 16 | Lulu | +0.64 | 0.64 | 0.00 |  |
| 17 | Maokai | +0.63 | 0.99 | 0.36 |  |
| 18 | Aurora | +0.62 | 0.62 | 0.00 |  |
| 19 | Xayah | +0.62 | 0.62 | 0.00 |  |
| 20 | Xin Zhao | +0.59 | 0.90 | 0.31 |  |
| 21 | Viktor | +0.58 | 0.58 | 0.00 |  |
| 22 | Cassiopeia | +0.57 | 0.57 | 0.00 |  |
| 23 | Kindred | +0.56 | 0.56 | 0.00 |  |
| 24 | Teemo | +0.50 | 0.50 | 0.00 | blind (Blinding Dart) |
| 25 | Pantheon | +0.47 | 0.68 | 0.21 |  |
| 26 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 27 | Hwei | +0.44 | 0.44 | 0.00 |  |
| 28 | Tristana | +0.44 | 0.44 | 0.00 |  |
| 29 | Veigar | +0.44 | 0.44 | 0.00 |  |
| 30 | Shen | +0.43 | 0.67 | 0.24 |  |
| 31 | Malzahar | +0.43 | 0.43 | 0.00 |  |
| 32 | Ekko | +0.42 | 0.66 | 0.24 |  |
| 33 | Vex | +0.42 | 0.42 | 0.00 |  |
| 34 | Sivir | +0.41 | 0.41 | 0.00 |  |
| 35 | Zed | +0.38 | 0.62 | 0.24 |  |
| 36 | Master Yi | +0.37 | 0.68 | 0.31 |  |
| 37 | Nilah | +0.37 | 0.63 | 0.26 |  |
| 38 | Ashe | +0.37 | 0.37 | 0.00 |  |
| 39 | Fiora | +0.36 | 0.70 | 0.34 |  |
| 40 | Nocturne | +0.35 | 0.71 | 0.36 |  |
| 41 | Annie | +0.35 | 0.35 | 0.00 |  |
| 42 | Gwen | +0.34 | 0.68 | 0.34 |  |
| 43 | Anivia | +0.34 | 0.34 | 0.00 |  |
| 44 | Zyra | +0.32 | 0.32 | 0.00 |  |
| 45 | Rammus | +0.30 | 0.66 | 0.36 |  |
| 46 | Jinx | +0.30 | 0.30 | 0.00 |  |
| 47 | Poppy | +0.28 | 0.64 | 0.36 |  |
| 48 | Azir | +0.28 | 0.28 | 0.00 |  |
| 49 | Brand | +0.28 | 0.28 | 0.00 |  |
| 50 | Corki | +0.28 | 0.28 | 0.00 |  |
| 51 | Draven | +0.28 | 0.28 | 0.00 |  |
| 52 | Fiddlesticks | +0.28 | 0.28 | 0.00 |  |
| 53 | Gnar | +0.28 | 0.28 | 0.00 |  |
| 54 | Heimerdinger | +0.28 | 0.28 | 0.00 |  |
| 55 | Janna | +0.28 | 0.28 | 0.00 |  |
| 56 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 57 | Kennen | +0.28 | 0.28 | 0.00 |  |
| 58 | Milio | +0.28 | 0.28 | 0.00 |  |
| 59 | Nami | +0.28 | 0.28 | 0.00 |  |
| 60 | Neeko | +0.28 | 0.28 | 0.00 |  |
| 61 | Orianna | +0.28 | 0.28 | 0.00 |  |
| 62 | Quinn | +0.28 | 0.28 | 0.00 |  |
| 63 | Renata Glasc | +0.28 | 0.28 | 0.00 |  |
| 64 | Seraphine | +0.28 | 0.28 | 0.00 |  |
| 65 | Soraka | +0.28 | 0.28 | 0.00 |  |
| 66 | Swain | +0.28 | 0.28 | 0.00 |  |
| 67 | Syndra | +0.28 | 0.28 | 0.00 |  |
| 68 | Taliyah | +0.28 | 0.28 | 0.00 |  |
| 69 | Thresh | +0.28 | 0.28 | 0.00 |  |
| 70 | Twisted Fate | +0.28 | 0.28 | 0.00 |  |
| 71 | Vayne | +0.28 | 0.28 | 0.00 |  |
| 72 | Vel'Koz | +0.28 | 0.28 | 0.00 |  |
| 73 | Xerath | +0.28 | 0.28 | 0.00 |  |
| 74 | Ziggs | +0.28 | 0.28 | 0.00 |  |
| 75 | Zilean | +0.28 | 0.28 | 0.00 |  |
| 76 | Zoe | +0.28 | 0.28 | 0.00 |  |
| 77 | Zac | +0.27 | 0.58 | 0.31 |  |
| 78 | Yone | +0.27 | 0.43 | 0.16 |  |
| 79 | Aurelion Sol | +0.26 | 0.26 | 0.00 |  |
| 80 | Sona | +0.26 | 0.26 | 0.00 |  |
| 81 | Kalista | +0.23 | 0.23 | 0.00 |  |
| 82 | Warwick | +0.20 | 0.44 | 0.24 |  |
| 83 | Jax | +0.19 | 0.55 | 0.36 | attack dodge (Counter Strike) |
| 84 | Taric | +0.18 | 0.85 | 0.67 |  |
| 85 | Varus | +0.17 | 0.17 | 0.00 |  |
| 86 | Kled | +0.16 | 0.28 | 0.12 |  |
| 87 | Malphite | +0.15 | 0.51 | 0.36 |  |
| 88 | Rakan | +0.15 | 0.28 | 0.13 |  |
| 89 | Urgot | +0.14 | 0.28 | 0.14 |  |
| 90 | Viego | +0.14 | 0.28 | 0.14 |  |
| 91 | Caitlyn | +0.14 | 0.14 | 0.00 |  |
| 92 | Fizz | +0.12 | 0.28 | 0.16 |  |
| 93 | Jarvan IV | +0.12 | 0.28 | 0.16 |  |
| 94 | Sylas | +0.12 | 0.28 | 0.16 |  |
| 95 | K'Sante | +0.11 | 0.28 | 0.17 |  |
| 96 | Briar | +0.10 | 0.28 | 0.18 |  |
| 97 | Lillia | +0.08 | 0.25 | 0.17 |  |
| 98 | Senna | +0.08 | 0.08 | 0.00 |  |
| 99 | Amumu | +0.07 | 0.43 | 0.36 |  |
| 100 | Wukong | +0.07 | 0.28 | 0.21 |  |
| 101 | Ornn | +0.07 | 0.28 | 0.21 |  |
| 102 | Rell | +0.07 | 0.28 | 0.21 |  |
| 103 | Zaahen | +0.07 | 0.28 | 0.21 |  |
| 104 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 105 | Bel'Veth | +0.06 | 0.28 | 0.22 |  |
| 106 | Galio | +0.06 | 0.28 | 0.22 |  |
| 107 | Pyke | +0.06 | 0.28 | 0.22 |  |
| 108 | Volibear | +0.06 | 0.28 | 0.22 |  |
| 109 | Hecarim | +0.05 | 0.26 | 0.21 |  |
| 110 | Singed | +0.04 | 0.76 | 0.72 |  |
| 111 | Lee Sin | +0.04 | 0.28 | 0.24 |  |
| 112 | Riven | +0.04 | 0.28 | 0.24 |  |
| 113 | Vi | +0.04 | 0.28 | 0.24 |  |
| 114 | Ambessa | +0.02 | 0.26 | 0.24 |  |
| 115 | Qiyana | +0.01 | 0.23 | 0.22 |  |
| 116 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 117 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 118 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 119 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 120 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 121 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 122 | Karma | 0.00 | 0.00 | 0.00 |  |
| 123 | Karthus | 0.00 | 0.00 | 0.00 |  |
| 124 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 125 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 126 | Lux | 0.00 | 0.00 | 0.00 |  |
| 127 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 128 | Morgana | 0.00 | 0.00 | 0.00 |  |
| 129 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 130 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 131 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 132 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 133 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 134 | Irelia | -0.01 | 0.28 | 0.29 |  |
| 135 | Aatrox | -0.03 | 0.28 | 0.31 |  |
| 136 | Nautilus | -0.03 | 0.28 | 0.31 |  |
| 137 | Tahm Kench | -0.03 | 0.28 | 0.31 |  |
| 138 | Graves | -0.05 | 0.00 | 0.05 |  |
| 139 | Diana | -0.06 | 0.28 | 0.34 |  |
| 140 | Kassadin | -0.06 | 0.28 | 0.34 |  |
| 141 | Sejuani | -0.06 | 0.28 | 0.34 |  |
| 142 | Shyvana | -0.06 | 0.28 | 0.34 |  |
| 143 | Alistar | -0.08 | 0.28 | 0.36 |  |
| 144 | Gragas | -0.08 | 0.28 | 0.36 |  |
| 145 | Leona | -0.08 | 0.28 | 0.36 |  |
| 146 | Renekton | -0.08 | 0.28 | 0.36 |  |
| 147 | Sett | -0.08 | 0.28 | 0.36 |  |
| 148 | Udyr | -0.08 | 0.28 | 0.36 |  |
| 149 | Naafiri | -0.18 | 0.00 | 0.18 |  |
| 150 | Katarina | -0.24 | 0.12 | 0.36 |  |
| 151 | Akali | -0.24 | 0.00 | 0.24 |  |
| 152 | Talon | -0.24 | 0.00 | 0.24 |  |
| 153 | Mordekaiser | -0.25 | 0.37 | 0.62 |  |
| 154 | Tryndamere | -0.31 | 0.00 | 0.31 |  |
| 155 | Nasus | -0.33 | 0.39 | 0.72 |  |
| 156 | Darius | -0.34 | 0.28 | 0.62 |  |
| 157 | Garen | -0.34 | 0.28 | 0.62 |  |
| 158 | Sion | -0.34 | 0.28 | 0.62 |  |
| 159 | Trundle | -0.34 | 0.28 | 0.62 |  |
| 160 | Yorick | -0.34 | 0.28 | 0.62 |  |
| 161 | Illaoi | -0.36 | 0.00 | 0.36 |  |
| 162 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 163 | Locke | -0.36 | 0.00 | 0.36 |  |
| 164 | Skarner | -0.39 | 0.28 | 0.67 |  |
| 165 | Blitzcrank | -0.44 | 0.28 | 0.72 |  |
| 166 | Cho'Gath | -0.44 | 0.28 | 0.72 |  |
| 167 | Nunu & Willump | -0.44 | 0.28 | 0.72 |  |
| 168 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 169 | Gangplank | -0.72 | 0.00 | 0.72 |  |
| 170 | Olaf | -0.72 | 0.00 | 0.72 |  |
| 171 | Rengar | -0.72 | 0.00 | 0.72 |  |
| 172 | Rumble | -0.72 | 0.00 | 0.72 |  |
