# Counters to Draven (patch 26.20)

Every champion ranked by what its kit does against Draven's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Draven's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Draven` for the full ledger of a matchup, with sources.

## Top 10

### 1. Kayle (net +0.95)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Draven's Whirling Death. Invulnerable for 2.5 s, long enough to use ahead of Whirling Death. (Kayle R Divine Judgment → Draven R Whirling Death)
- **0.44** death prevention: Draven's Whirling Death can't execute Kayle during Divine Judgment (invulnerable). Divine Judgment lasts 2.5 s on a 80 s cooldown. (Kayle R Divine Judgment → Draven R Whirling Death)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Draven's Stand Aside (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Stand Aside. (Kayle R Divine Judgment → Draven E Stand Aside)

### 2. Samira (net +0.88)

- **0.55** projectile block: Blade Whirl blocks Draven's Whirling Death, a projectile. Blade Whirl for 0.75 s; Whirling Death takes 0.5 s to land, enough to react. (Samira W Blade Whirl → Draven R Whirling Death)
- **0.51** projectile block: Blade Whirl blocks Draven's Stand Aside, a projectile. Blade Whirl for 0.75 s; Stand Aside takes 1.04 s to land, enough to react. (Samira W Blade Whirl → Draven E Stand Aside)
- **0.30** projectile block: Blade Whirl blocks Draven's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Draven basic attacks)

### 3. Mel (net +0.86)

- **0.55** projectile block: Rebuttal blocks Draven's Whirling Death, a projectile. Rebuttal for 0.75 s; Whirling Death takes 0.5 s to land, enough to react. (Mel W Rebuttal → Draven R Whirling Death)
- **0.47** projectile block: Rebuttal blocks Draven's Stand Aside, a projectile. Rebuttal for 0.75 s; Stand Aside takes 1.04 s to land, enough to react. (Mel W Rebuttal → Draven E Stand Aside)
- **0.30** projectile block: Rebuttal blocks Draven's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Draven basic attacks)

### 4. Pantheon (net +0.85)

- **0.55** invulnerable: Aegis Assault makes Pantheon invulnerable to Draven's Whirling Death. Invulnerable for 1.5 s, long enough to use ahead of Whirling Death. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Draven R Whirling Death)
- **0.44** death prevention: Draven's Whirling Death can't execute Pantheon during Aegis Assault (invulnerable). Aegis Assault lasts 1.5 s on a 18 s cooldown. (Pantheon E Aegis Assault → Draven R Whirling Death)
- **0.32** death prevention: Draven's Whirling Death can't execute Pantheon during Grand Starfall (minimum health). Grand Starfall lasts ? on a 150 s cooldown. (Pantheon R Grand Starfall → Draven R Whirling Death)
- Watch out: Draven's basic attacks reach 375 units farther than Pantheon's (550 vs 175 attack range).

### 5. Elise (net +0.84)

- **0.56** untargetable: Rappel makes Elise untargetable, dodging Draven's Stand Aside. Untargetable for 0.6 s; Stand Aside takes 1.04 s to land, enough to react. (Elise E Rappel → Draven E Stand Aside)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Draven's Whirling Death. Untargetable for 0.6 s; Whirling Death takes 0.5 s to land, enough to react. (Elise E Rappel → Draven R Whirling Death)

### 6. Braum (net +0.74)

- **0.70** projectile block: Unbreakable blocks Draven's Stand Aside, a projectile. Unbreakable for 4 s, long enough to use ahead of Stand Aside. (Braum E Unbreakable → Draven E Stand Aside)
- **0.55** projectile block: Unbreakable blocks Draven's Whirling Death, a projectile. Unbreakable for 4 s, long enough to use ahead of Whirling Death. (Braum E Unbreakable → Draven R Whirling Death)
- **0.50** projectile block: Unbreakable blocks Draven's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Draven basic attacks)
- Watch out: Draven's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 7. Yasuo (net +0.73)

- **0.58** projectile block: Wind Wall blocks Draven's Stand Aside, a projectile. Wind Wall for 4 s, long enough to use ahead of Stand Aside. (Yasuo W Wind Wall → Draven E Stand Aside)
- **0.55** projectile block: Wind Wall blocks Draven's Whirling Death, a projectile. Wind Wall for 4 s, long enough to use ahead of Whirling Death. (Yasuo W Wind Wall → Draven R Whirling Death)
- **0.39** projectile block: Wind Wall blocks Draven's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Draven basic attacks)
- Watch out: Draven's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 8. Bard (net +0.72)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Draven's Whirling Death. Untargetable for 2.5 s, long enough to use ahead of Whirling Death. (Bard R Tempered Fate → Draven R Whirling Death)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Draven's Stand Aside. Untargetable for 2.5 s, long enough to use ahead of Stand Aside. (Bard R Tempered Fate → Draven E Stand Aside)

### 9. Lissandra (net +0.72)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Draven's Whirling Death. Untargetable for 2.5 s, long enough to use ahead of Whirling Death. (Lissandra R Frozen Tomb → Draven R Whirling Death)
- **0.34** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Draven's Stand Aside. Untargetable for 2.5 s, long enough to use ahead of Stand Aside. (Lissandra R Frozen Tomb → Draven E Stand Aside)

### 10. Sivir (net +0.70)

- **0.56** spell shield: Spell Shield's spell shield blocks Draven's Stand Aside. Spell shield for 1.5 s, long enough to use ahead of Stand Aside. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Draven E Stand Aside)
- **0.28** spell shield: Spell Shield's spell shield blocks part of Draven's Whirling Death. Spell shield for 1.5 s, long enough to use ahead of Whirling Death. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block one instance of damage. (Sivir E Spell Shield → Draven R Whirling Death)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kayle | +0.95 | 0.95 | 0.00 |  |
| 2 | Samira | +0.88 | 0.88 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 3 | Mel | +0.86 | 0.86 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 4 | Pantheon | +0.85 | 1.16 | 0.31 |  |
| 5 | Elise | +0.84 | 0.84 | 0.00 |  |
| 6 | Braum | +0.74 | 1.10 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Yasuo | +0.73 | 0.95 | 0.22 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 8 | Bard | +0.72 | 0.72 | 0.00 |  |
| 9 | Lissandra | +0.72 | 0.72 | 0.00 |  |
| 10 | Sivir | +0.70 | 0.70 | 0.00 |  |
| 11 | Aurora | +0.66 | 0.66 | 0.00 |  |
| 12 | Kindred | +0.66 | 0.66 | 0.00 |  |
| 13 | Xayah | +0.65 | 0.65 | 0.00 |  |
| 14 | Fiora | +0.64 | 1.00 | 0.36 |  |
| 15 | Vladimir | +0.63 | 0.88 | 0.25 |  |
| 16 | Maokai | +0.62 | 0.98 | 0.36 |  |
| 17 | Zaahen | +0.56 | 0.78 | 0.22 |  |
| 18 | Nocturne | +0.55 | 0.91 | 0.36 |  |
| 19 | Rek'Sai | +0.52 | 0.74 | 0.22 |  |
| 20 | Camille | +0.52 | 0.70 | 0.18 |  |
| 21 | Ekko | +0.50 | 0.74 | 0.24 |  |
| 22 | Kayn | +0.49 | 1.16 | 0.67 |  |
| 23 | Gwen | +0.48 | 0.84 | 0.36 |  |
| 24 | Evelynn | +0.48 | 0.72 | 0.24 |  |
| 25 | Shaco | +0.48 | 0.72 | 0.24 |  |
| 26 | Yuumi | +0.47 | 0.98 | 0.51 |  |
| 27 | Teemo | +0.47 | 0.47 | 0.00 | blind (Blinding Dart) |
| 28 | Kog'Maw | +0.44 | 0.44 | 0.00 |  |
| 29 | Zilean | +0.44 | 0.44 | 0.00 |  |
| 30 | Morgana | +0.42 | 0.60 | 0.18 |  |
| 31 | Master Yi | +0.41 | 0.95 | 0.54 |  |
| 32 | Zed | +0.41 | 0.65 | 0.24 |  |
| 33 | Xin Zhao | +0.38 | 0.72 | 0.34 |  |
| 34 | Udyr | +0.34 | 0.70 | 0.36 |  |
| 35 | Lulu | +0.34 | 0.34 | 0.00 |  |
| 36 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 37 | Anivia | +0.26 | 0.26 | 0.00 |  |
| 38 | Kalista | +0.26 | 0.26 | 0.00 |  |
| 39 | Kled | +0.19 | 0.33 | 0.14 |  |
| 40 | Tryndamere | +0.10 | 0.44 | 0.34 |  |
| 41 | Milio | +0.09 | 0.09 | 0.00 |  |
| 42 | Annie | +0.08 | 0.08 | 0.00 |  |
| 43 | Aphelios | +0.07 | 0.07 | 0.00 |  |
| 44 | Corki | +0.07 | 0.07 | 0.00 |  |
| 45 | Heimerdinger | +0.07 | 0.07 | 0.00 |  |
| 46 | Vex | +0.07 | 0.07 | 0.00 |  |
| 47 | Nilah | +0.04 | 0.33 | 0.29 |  |
| 48 | Jax | +0.02 | 0.38 | 0.36 |  |
| 49 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 50 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 51 | Azir | 0.00 | 0.00 | 0.00 |  |
| 52 | Brand | 0.00 | 0.00 | 0.00 |  |
| 53 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 54 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 55 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 56 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 57 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 58 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 59 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 60 | Karma | 0.00 | 0.00 | 0.00 |  |
| 61 | Kennen | 0.00 | 0.00 | 0.00 |  |
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
| 78 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 79 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 80 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 81 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 82 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 83 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 84 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 85 | K'Sante | -0.04 | 0.14 | 0.18 |  |
| 86 | Malzahar | -0.05 | 0.35 | 0.40 |  |
| 87 | Malphite | -0.05 | 0.31 | 0.36 |  |
| 88 | Taric | -0.06 | 0.66 | 0.72 |  |
| 89 | Thresh | -0.06 | 0.00 | 0.06 |  |
| 90 | Graves | -0.07 | 0.00 | 0.07 |  |
| 91 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 92 | Alistar | -0.09 | 0.27 | 0.36 |  |
| 93 | Warwick | -0.10 | 0.42 | 0.52 |  |
| 94 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 95 | Jarvan IV | -0.10 | 0.07 | 0.17 |  |
| 96 | Yone | -0.10 | 0.07 | 0.17 |  |
| 97 | Varus | -0.11 | 0.00 | 0.11 |  |
| 98 | Hecarim | -0.15 | 0.07 | 0.22 |  |
| 99 | Ornn | -0.15 | 0.07 | 0.22 |  |
| 100 | Rakan | -0.15 | 0.00 | 0.15 |  |
| 101 | Rengar | -0.16 | 0.56 | 0.72 |  |
| 102 | Volibear | -0.17 | 0.07 | 0.24 |  |
| 103 | Fizz | -0.17 | 0.00 | 0.17 |  |
| 104 | Sylas | -0.17 | 0.00 | 0.17 |  |
| 105 | Briar | -0.18 | 0.00 | 0.18 |  |
| 106 | Quinn | -0.18 | 0.00 | 0.18 |  |
| 107 | Urgot | -0.18 | 0.00 | 0.18 |  |
| 108 | Lillia | -0.20 | 0.00 | 0.20 |  |
| 109 | Gangplank | -0.21 | 0.51 | 0.72 |  |
| 110 | Ivern | -0.21 | 0.00 | 0.21 |  |
| 111 | Wukong | -0.22 | 0.00 | 0.22 |  |
| 112 | Rell | -0.22 | 0.00 | 0.22 |  |
| 113 | Rammus | -0.24 | 0.36 | 0.60 |  |
| 114 | Akali | -0.24 | 0.00 | 0.24 |  |
| 115 | Ambessa | -0.24 | 0.00 | 0.24 |  |
| 116 | Bel'Veth | -0.24 | 0.00 | 0.24 |  |
| 117 | Lee Sin | -0.24 | 0.00 | 0.24 |  |
| 118 | Qiyana | -0.24 | 0.00 | 0.24 |  |
| 119 | Riven | -0.24 | 0.00 | 0.24 |  |
| 120 | Talon | -0.24 | 0.00 | 0.24 |  |
| 121 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 122 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 123 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 124 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 125 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 126 | Illaoi | -0.29 | 0.07 | 0.36 |  |
| 127 | Sett | -0.29 | 0.07 | 0.36 |  |
| 128 | Shyvana | -0.29 | 0.07 | 0.36 |  |
| 129 | Viego | -0.29 | 0.07 | 0.36 |  |
| 130 | Irelia | -0.32 | 0.00 | 0.32 |  |
| 131 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 132 | Shen | -0.33 | 0.36 | 0.69 |  |
| 133 | Aatrox | -0.34 | 0.00 | 0.34 |  |
| 134 | Nautilus | -0.34 | 0.00 | 0.34 |  |
| 135 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 136 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 137 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 138 | Amumu | -0.36 | 0.00 | 0.36 |  |
| 139 | Diana | -0.36 | 0.00 | 0.36 |  |
| 140 | Kassadin | -0.36 | 0.00 | 0.36 |  |
| 141 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 142 | Leona | -0.36 | 0.00 | 0.36 |  |
| 143 | Locke | -0.36 | 0.00 | 0.36 |  |
| 144 | Renekton | -0.36 | 0.00 | 0.36 |  |
| 145 | Sejuani | -0.36 | 0.00 | 0.36 |  |
| 146 | Olaf | -0.38 | 0.34 | 0.72 |  |
| 147 | Pyke | -0.38 | 0.00 | 0.38 |  |
| 148 | Janna | -0.40 | 0.00 | 0.40 |  |
| 149 | Galio | -0.42 | 0.00 | 0.42 |  |
| 150 | Sion | -0.44 | 0.36 | 0.80 |  |
| 151 | Fiddlesticks | -0.44 | 0.00 | 0.44 |  |
| 152 | Karthus | -0.46 | 0.00 | 0.46 |  |
| 153 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 154 | Garen | -0.49 | 0.19 | 0.68 |  |
| 155 | Gragas | -0.51 | 0.00 | 0.51 |  |
| 156 | Zac | -0.52 | 0.25 | 0.77 |  |
| 157 | Vi | -0.52 | 0.07 | 0.59 |  |
| 158 | Poppy | -0.56 | 0.00 | 0.56 |  |
| 159 | Mordekaiser | -0.59 | 0.09 | 0.68 |  |
| 160 | Skarner | -0.63 | 0.09 | 0.72 |  |
| 161 | Naafiri | -0.63 | 0.00 | 0.63 |  |
| 162 | Katarina | -0.64 | 0.00 | 0.64 |  |
| 163 | Darius | -0.68 | 0.00 | 0.68 |  |
| 164 | Trundle | -0.68 | 0.00 | 0.68 |  |
| 165 | Yorick | -0.68 | 0.00 | 0.68 |  |
| 166 | Blitzcrank | -0.72 | 0.00 | 0.72 |  |
| 167 | Cho'Gath | -0.72 | 0.00 | 0.72 |  |
| 168 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 169 | Rumble | -0.72 | 0.00 | 0.72 |  |
| 170 | Singed | -0.72 | 0.00 | 0.72 |  |
| 171 | Tahm Kench | -0.84 | 0.00 | 0.84 |  |
| 172 | Nunu & Willump | -1.00 | 0.21 | 1.21 |  |
