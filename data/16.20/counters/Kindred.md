# Counters to Kindred (patch 26.20)

Every champion ranked by what its kit does against Kindred's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kindred's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kindred` for the full ledger of a matchup, with sources.

## Top 10

### 1. Samira (net +0.69)

- **0.42** projectile block: Blade Whirl blocks Kindred's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Kindred basic attacks)
- **0.39** projectile block: Blade Whirl blocks Kindred's Dance of Arrows, a projectile. Blade Whirl for 0.75 s; Dance of Arrows takes 0.6 s to land, enough to react. (Samira W Blade Whirl → Kindred Q Dance of Arrows)
- **0.28** projectile block: Blade Whirl blocks Kindred's Mounting Dread, a projectile. Blade Whirl for 0.75 s; Mounting Dread takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Kindred E Mounting Dread)

### 2. Mel (net +0.67)

- **0.42** projectile block: Rebuttal blocks Kindred's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Kindred basic attacks)
- **0.36** projectile block: Rebuttal blocks Kindred's Dance of Arrows, a projectile. Rebuttal for 0.75 s; Dance of Arrows takes 0.6 s to land, enough to react. (Mel W Rebuttal → Kindred Q Dance of Arrows)
- **0.26** projectile block: Rebuttal blocks Kindred's Mounting Dread, a projectile. Rebuttal for 0.75 s; Mounting Dread takes 0.25 s to land, enough to react. (Mel W Rebuttal → Kindred E Mounting Dread)

### 3. Teemo (net +0.66)

- **0.66** blind: Blinding Dart's blind makes Kindred's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Kindred basic attacks)

### 4. Braum (net +0.64)

- **0.70** projectile block: Unbreakable blocks Kindred's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Kindred basic attacks)
- **0.60** projectile block: Unbreakable blocks Kindred's Dance of Arrows, a projectile. Unbreakable for 4 s, long enough to use ahead of Dance of Arrows. (Braum E Unbreakable → Kindred Q Dance of Arrows)
- **0.45** projectile block: Unbreakable blocks Kindred's Mounting Dread, a projectile. Unbreakable for 4 s, long enough to use ahead of Mounting Dread. (Braum E Unbreakable → Kindred E Mounting Dread)
- Watch out: Kindred's basic attacks reach 375 units farther than Braum's (500 vs 125 attack range).

### 5. Yasuo (net +0.56)

- **0.54** projectile block: Wind Wall blocks Kindred's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Kindred basic attacks)
- **0.43** projectile block: Wind Wall blocks Kindred's Dance of Arrows, a projectile. Wind Wall for 4 s, long enough to use ahead of Dance of Arrows. (Yasuo W Wind Wall → Kindred Q Dance of Arrows)
- **0.31** projectile block: Wind Wall blocks Kindred's Mounting Dread, a projectile. Wind Wall for 4 s, long enough to use ahead of Mounting Dread. (Yasuo W Wind Wall → Kindred E Mounting Dread)
- Watch out: Kindred's basic attacks reach 325 units farther than Yasuo's (500 vs 175 attack range).

### 6. Lulu (net +0.47)

- **0.47** disarm: Whimsy disarms Kindred for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Kindred basic attacks)

### 7. Yuumi (net +0.36)

- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Kindred's Mounting Dread. Untargetable for ?; Mounting Dread takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Kindred E Mounting Dread)
- Watch out: Kindred's basic attacks reach 75 units farther than Yuumi's (500 vs 425 attack range).

### 8. Varus (net +0.36)

- **0.22** anti-heal: Hail of Arrows's Grievous Wounds cuts Kindred's healing from Lamb's Respite by 40%. (Varus E Hail of Arrows → Kindred R Lamb's Respite)
- **0.18** anti-heal: Hail of Arrows's Grievous Wounds cuts Kindred's healing from Wolf's Frenzy by 40%. (Varus E Hail of Arrows → Kindred W Wolf's Frenzy)
- **0.05** range: Varus's basic attacks reach 75 units farther than Kindred's (575 vs 500 attack range). Kindred closes the gap with Dance of Arrows. (Varus basic attacks → Kindred basic attacks)

### 9. Vladimir (net +0.32)

- **0.32** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kindred's Mounting Dread. Untargetable for 2 s, long enough to use ahead of Mounting Dread. (Vladimir W Sanguine Pool → Kindred E Mounting Dread)

### 10. Sivir (net +0.30)

- **0.30** spell shield: Spell Shield's spell shield blocks Kindred's Mounting Dread. Spell shield for 1.5 s, long enough to use ahead of Mounting Dread. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kindred E Mounting Dread)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +0.69 | 0.69 | 0.00 | projectile block (Blade Whirl) |
| 2 | Mel | +0.67 | 0.67 | 0.00 | projectile block (Rebuttal) |
| 3 | Teemo | +0.66 | 0.66 | 0.00 | blind (Blinding Dart) |
| 4 | Braum | +0.64 | 1.11 | 0.47 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Yasuo | +0.56 | 0.83 | 0.27 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 6 | Lulu | +0.47 | 0.47 | 0.00 | disarm (Whimsy) |
| 7 | Yuumi | +0.36 | 0.45 | 0.09 |  |
| 8 | Varus | +0.36 | 0.36 | 0.00 |  |
| 9 | Vladimir | +0.32 | 0.32 | 0.00 |  |
| 10 | Sivir | +0.30 | 0.30 | 0.00 |  |
| 11 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 12 | Hwei | +0.28 | 0.28 | 0.00 |  |
| 13 | Jinx | +0.28 | 0.28 | 0.00 |  |
| 14 | Lissandra | +0.28 | 0.28 | 0.00 |  |
| 15 | Ahri | +0.26 | 0.26 | 0.00 |  |
| 16 | Fizz | +0.25 | 0.45 | 0.20 |  |
| 17 | Veigar | +0.24 | 0.24 | 0.00 |  |
| 18 | Viktor | +0.24 | 0.24 | 0.00 |  |
| 19 | Vex | +0.22 | 0.22 | 0.00 |  |
| 20 | Bard | +0.21 | 0.21 | 0.00 |  |
| 21 | Kayle | +0.21 | 0.21 | 0.00 |  |
| 22 | Shen | +0.20 | 0.51 | 0.31 | attack block (Spirit's Refuge) |
| 23 | Aurora | +0.20 | 0.20 | 0.00 |  |
| 24 | Malzahar | +0.20 | 0.20 | 0.00 |  |
| 25 | Xayah | +0.20 | 0.20 | 0.00 |  |
| 26 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 27 | Caitlyn | +0.14 | 0.14 | 0.00 |  |
| 28 | Nilah | +0.12 | 0.46 | 0.34 | attack dodge (Jubilant Veil) |
| 29 | Ashe | +0.09 | 0.09 | 0.00 |  |
| 30 | Morgana | +0.08 | 0.08 | 0.00 |  |
| 31 | Senna | +0.08 | 0.08 | 0.00 |  |
| 32 | Annie | +0.07 | 0.07 | 0.00 |  |
| 33 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 34 | Jax | +0.06 | 0.53 | 0.47 | attack dodge (Counter Strike) |
| 35 | Anivia | +0.06 | 0.06 | 0.00 |  |
| 36 | Milio | +0.06 | 0.06 | 0.00 |  |
| 37 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 38 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 39 | Kalista | +0.04 | 0.04 | 0.00 |  |
| 40 | Zyra | +0.04 | 0.04 | 0.00 |  |
| 41 | Rammus | +0.03 | 0.50 | 0.47 | attack reflect (Defensive Ball Curl) |
| 42 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 43 | Azir | 0.00 | 0.00 | 0.00 |  |
| 44 | Brand | 0.00 | 0.00 | 0.00 |  |
| 45 | Corki | 0.00 | 0.00 | 0.00 |  |
| 46 | Elise | 0.00 | 0.00 | 0.00 |  |
| 47 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 48 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 49 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 50 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 51 | Janna | 0.00 | 0.00 | 0.00 |  |
| 52 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 53 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 54 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 55 | Karma | 0.00 | 0.00 | 0.00 |  |
| 56 | Karthus | 0.00 | 0.00 | 0.00 |  |
| 57 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 58 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 59 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 60 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 61 | Lux | 0.00 | 0.00 | 0.00 |  |
| 62 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 63 | Nami | 0.00 | 0.00 | 0.00 |  |
| 64 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 65 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 66 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 67 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 68 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 69 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 70 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 71 | Sona | 0.00 | 0.00 | 0.00 |  |
| 72 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 73 | Swain | 0.00 | 0.00 | 0.00 |  |
| 74 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 75 | Thresh | 0.00 | 0.00 | 0.00 |  |
| 76 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 77 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 78 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 79 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 80 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 81 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 82 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 83 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 84 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 85 | Camille | -0.03 | 0.20 | 0.23 |  |
| 86 | Master Yi | -0.04 | 0.37 | 0.41 |  |
| 87 | Fiora | -0.06 | 0.38 | 0.44 |  |
| 88 | Kayn | -0.06 | 0.21 | 0.27 |  |
| 89 | Rek'Sai | -0.06 | 0.21 | 0.27 |  |
| 90 | Yone | -0.06 | 0.14 | 0.20 |  |
| 91 | Graves | -0.06 | 0.00 | 0.06 |  |
| 92 | Maokai | -0.07 | 0.40 | 0.47 |  |
| 93 | Poppy | -0.09 | 0.38 | 0.47 |  |
| 94 | Evelynn | -0.10 | 0.21 | 0.31 |  |
| 95 | Shaco | -0.10 | 0.21 | 0.31 |  |
| 96 | Nocturne | -0.11 | 0.36 | 0.47 |  |
| 97 | Zac | -0.11 | 0.30 | 0.41 |  |
| 98 | Zed | -0.11 | 0.20 | 0.31 |  |
| 99 | Kled | -0.11 | 0.05 | 0.16 |  |
| 100 | Pantheon | -0.12 | 0.15 | 0.27 |  |
| 101 | Malphite | -0.14 | 0.33 | 0.47 |  |
| 102 | Gwen | -0.14 | 0.30 | 0.44 |  |
| 103 | Warwick | -0.14 | 0.17 | 0.31 |  |
| 104 | Katarina | -0.16 | 0.31 | 0.47 |  |
| 105 | Singed | -0.17 | 0.77 | 0.94 |  |
| 106 | Aurelion Sol | -0.17 | 0.00 | 0.17 |  |
| 107 | Rakan | -0.17 | 0.00 | 0.17 |  |
| 108 | Smolder | -0.18 | 0.00 | 0.18 |  |
| 109 | Urgot | -0.19 | 0.00 | 0.19 |  |
| 110 | Viego | -0.19 | 0.00 | 0.19 |  |
| 111 | Jarvan IV | -0.20 | 0.00 | 0.20 |  |
| 112 | Sylas | -0.20 | 0.00 | 0.20 |  |
| 113 | Zaahen | -0.22 | 0.05 | 0.27 |  |
| 114 | K'Sante | -0.22 | 0.00 | 0.22 |  |
| 115 | Lillia | -0.22 | 0.00 | 0.22 |  |
| 116 | Briar | -0.23 | 0.00 | 0.23 |  |
| 117 | Naafiri | -0.23 | 0.00 | 0.23 |  |
| 118 | Hecarim | -0.27 | 0.00 | 0.27 |  |
| 119 | Wukong | -0.27 | 0.00 | 0.27 |  |
| 120 | Ornn | -0.27 | 0.00 | 0.27 |  |
| 121 | Rell | -0.27 | 0.00 | 0.27 |  |
| 122 | Bel'Veth | -0.29 | 0.00 | 0.29 |  |
| 123 | Galio | -0.29 | 0.00 | 0.29 |  |
| 124 | Qiyana | -0.29 | 0.00 | 0.29 |  |
| 125 | Volibear | -0.29 | 0.00 | 0.29 |  |
| 126 | Xin Zhao | -0.31 | 0.10 | 0.41 |  |
| 127 | Akali | -0.31 | 0.00 | 0.31 |  |
| 128 | Ambessa | -0.31 | 0.00 | 0.31 |  |
| 129 | Ekko | -0.31 | 0.00 | 0.31 |  |
| 130 | Lee Sin | -0.31 | 0.00 | 0.31 |  |
| 131 | Riven | -0.31 | 0.00 | 0.31 |  |
| 132 | Talon | -0.31 | 0.00 | 0.31 |  |
| 133 | Vi | -0.31 | 0.00 | 0.31 |  |
| 134 | Amumu | -0.33 | 0.14 | 0.47 |  |
| 135 | Draven | -0.35 | 0.00 | 0.35 |  |
| 136 | Syndra | -0.35 | 0.00 | 0.35 |  |
| 137 | Udyr | -0.36 | 0.11 | 0.47 |  |
| 138 | Irelia | -0.38 | 0.00 | 0.38 |  |
| 139 | Aatrox | -0.41 | 0.00 | 0.41 |  |
| 140 | Nautilus | -0.41 | 0.00 | 0.41 |  |
| 141 | Tahm Kench | -0.41 | 0.00 | 0.41 |  |
| 142 | Tryndamere | -0.41 | 0.00 | 0.41 |  |
| 143 | Alistar | -0.43 | 0.04 | 0.47 |  |
| 144 | Nasus | -0.44 | 0.50 | 0.94 | attack speed slow (Wither) |
| 145 | Diana | -0.44 | 0.00 | 0.44 |  |
| 146 | Kassadin | -0.44 | 0.00 | 0.44 |  |
| 147 | Sejuani | -0.44 | 0.00 | 0.44 |  |
| 148 | Shyvana | -0.44 | 0.00 | 0.44 |  |
| 149 | Gragas | -0.47 | 0.00 | 0.47 |  |
| 150 | Illaoi | -0.47 | 0.00 | 0.47 |  |
| 151 | Kha'Zix | -0.47 | 0.00 | 0.47 |  |
| 152 | Leona | -0.47 | 0.00 | 0.47 |  |
| 153 | Renekton | -0.47 | 0.00 | 0.47 |  |
| 154 | Sett | -0.47 | 0.00 | 0.47 |  |
| 155 | Garen | -0.69 | 0.12 | 0.81 |  |
| 156 | Mordekaiser | -0.69 | 0.12 | 0.81 |  |
| 157 | Sion | -0.76 | 0.05 | 0.81 |  |
| 158 | Nunu & Willump | -0.81 | 0.13 | 0.94 |  |
| 159 | Darius | -0.81 | 0.00 | 0.81 |  |
| 160 | Trundle | -0.81 | 0.00 | 0.81 |  |
| 161 | Yorick | -0.81 | 0.00 | 0.81 |  |
| 162 | Skarner | -0.82 | 0.06 | 0.88 |  |
| 163 | Locke | -0.82 | 0.00 | 0.82 |  |
| 164 | Pyke | -0.83 | 0.00 | 0.83 |  |
| 165 | Rengar | -0.86 | 0.08 | 0.94 |  |
| 166 | Gangplank | -0.87 | 0.07 | 0.94 |  |
| 167 | Taric | -0.88 | 0.00 | 0.88 |  |
| 168 | Olaf | -0.89 | 0.05 | 0.94 |  |
| 169 | Blitzcrank | -0.94 | 0.00 | 0.94 |  |
| 170 | Cho'Gath | -0.94 | 0.00 | 0.94 |  |
| 171 | Dr. Mundo | -0.94 | 0.00 | 0.94 |  |
| 172 | Rumble | -0.94 | 0.00 | 0.94 |  |
