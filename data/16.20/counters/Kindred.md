# Counters to Kindred (patch 26.20)

Every champion ranked by what its kit does against Kindred's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kindred's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kindred` for the full ledger of a matchup, with sources.

## Top 10

### 1. Teemo (net +0.47)

- **0.66** blind: Blinding Dart's blind makes Kindred's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Kindred basic attacks)
- Watch out: Lamb's Respite makes Kindred invulnerable to Teemo's Noxious Trap (its crowd control still applies).

### 2. Lulu (net +0.41)

- **0.47** disarm: Whimsy disarms Kindred for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Kindred basic attacks)
- Watch out: Lamb's Respite makes Kindred invulnerable to Lulu's Help, Pix! (its crowd control still applies).

### 3. Samira (net +0.34)

- **0.42** projectile block: Blade Whirl blocks Kindred's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Kindred basic attacks)
- **0.39** projectile block: Blade Whirl blocks Kindred's Dance of Arrows, a projectile. Blade Whirl for 0.75 s; Dance of Arrows takes 0.6 s to land, enough to react. (Samira W Blade Whirl → Kindred Q Dance of Arrows)
- **0.28** projectile block: Blade Whirl blocks Kindred's Mounting Dread, a projectile. Blade Whirl for 0.75 s; Mounting Dread takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Kindred E Mounting Dread)
- Watch out: Lamb's Respite makes Kindred invulnerable to Samira's Wild Rush.

### 4. Sivir (net +0.30)

- **0.30** spell shield: Spell Shield's spell shield blocks Kindred's Mounting Dread. Spell shield for 1.5 s, long enough to use ahead of Mounting Dread. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kindred E Mounting Dread)

### 5. Braum (net +0.28)

- **0.70** projectile block: Unbreakable blocks Kindred's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Kindred basic attacks)
- **0.60** projectile block: Unbreakable blocks Kindred's Dance of Arrows, a projectile. Unbreakable for 4 s, long enough to use ahead of Dance of Arrows. (Braum E Unbreakable → Kindred Q Dance of Arrows)
- **0.45** projectile block: Unbreakable blocks Kindred's Mounting Dread, a projectile. Unbreakable for 4 s, long enough to use ahead of Mounting Dread. (Braum E Unbreakable → Kindred E Mounting Dread)
- Watch out: Kindred's basic attacks reach 375 units farther than Braum's (500 vs 125 attack range).

### 6. Kayle (net +0.21)

- **0.11** range: Kayle's basic attacks reach 125 units farther than Kindred's (625 vs 500 attack range). Kindred closes the gap with Dance of Arrows. (Kayle basic attacks → Kindred basic attacks)
- **0.10** invulnerable: Divine Judgment makes Kayle invulnerable to Kindred's Mounting Dread (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Mounting Dread. (Kayle R Divine Judgment → Kindred E Mounting Dread)

### 7. Mel (net +0.15)

- **0.42** projectile block: Rebuttal blocks Kindred's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Kindred basic attacks)
- **0.36** projectile block: Rebuttal blocks Kindred's Dance of Arrows, a projectile. Rebuttal for 0.75 s; Dance of Arrows takes 0.6 s to land, enough to react. (Mel W Rebuttal → Kindred Q Dance of Arrows)
- **0.26** projectile block: Rebuttal blocks Kindred's Mounting Dread, a projectile. Rebuttal for 0.75 s; Mounting Dread takes 0.25 s to land, enough to react. (Mel W Rebuttal → Kindred E Mounting Dread)
- Watch out: Lamb's Respite makes Kindred invulnerable to Mel's Golden Eclipse.

### 8. Yuumi (net +0.11)

- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Kindred's Mounting Dread. Untargetable for ?; Mounting Dread takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Kindred E Mounting Dread)
- Watch out: Lamb's Respite makes Kindred invulnerable to Yuumi's Final Chapter (its crowd control still applies).

### 9. Bard (net +0.11)

- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Kindred's Mounting Dread. Untargetable for 2.5 s, long enough to use ahead of Mounting Dread. (Bard R Tempered Fate → Kindred E Mounting Dread)
- Watch out: Lamb's Respite makes Kindred invulnerable to Bard's Cosmic Binding (its crowd control still applies).

### 10. Varus (net +0.08)

- **0.22** anti-heal: Hail of Arrows's Grievous Wounds cuts Kindred's healing from Lamb's Respite by 40%. (Varus E Hail of Arrows → Kindred R Lamb's Respite)
- **0.18** anti-heal: Hail of Arrows's Grievous Wounds cuts Kindred's healing from Wolf's Frenzy by 40%. (Varus E Hail of Arrows → Kindred W Wolf's Frenzy)
- **0.05** range: Varus's basic attacks reach 75 units farther than Kindred's (575 vs 500 attack range). Kindred closes the gap with Dance of Arrows. (Varus basic attacks → Kindred basic attacks)
- Watch out: Lamb's Respite makes Kindred invulnerable to Varus's Chain of Corruption (its crowd control still applies).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +0.47 | 0.66 | 0.19 | blind (Blinding Dart) |
| 2 | Lulu | +0.41 | 0.47 | 0.06 | disarm (Whimsy) |
| 3 | Samira | +0.34 | 0.69 | 0.35 | projectile block (Blade Whirl) |
| 4 | Sivir | +0.30 | 0.30 | 0.00 |  |
| 5 | Braum | +0.28 | 1.11 | 0.83 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 6 | Kayle | +0.21 | 0.21 | 0.00 |  |
| 7 | Mel | +0.15 | 0.67 | 0.52 | projectile block (Rebuttal) |
| 8 | Yuumi | +0.11 | 0.45 | 0.34 |  |
| 9 | Bard | +0.11 | 0.21 | 0.10 |  |
| 10 | Varus | +0.08 | 0.36 | 0.28 |  |
| 11 | Yasuo | +0.07 | 0.83 | 0.76 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 12 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 13 | Aurora | +0.01 | 0.20 | 0.19 |  |
| 14 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 15 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 16 | Shen | -0.03 | 0.51 | 0.54 | attack block (Spirit's Refuge) |
| 17 | Elise | -0.06 | 0.30 | 0.36 |  |
| 18 | Hwei | -0.07 | 0.28 | 0.35 |  |
| 19 | Viktor | -0.08 | 0.24 | 0.32 |  |
| 20 | Lissandra | -0.09 | 0.28 | 0.37 |  |
| 21 | Caitlyn | -0.09 | 0.14 | 0.23 |  |
| 22 | Twisted Fate | -0.09 | 0.00 | 0.09 |  |
| 23 | Vex | -0.10 | 0.22 | 0.32 |  |
| 24 | Milio | -0.10 | 0.06 | 0.16 |  |
| 25 | Kalista | -0.10 | 0.04 | 0.14 |  |
| 26 | Vladimir | -0.11 | 0.32 | 0.43 |  |
| 27 | Jinx | -0.11 | 0.28 | 0.39 |  |
| 28 | Kled | -0.11 | 0.05 | 0.16 |  |
| 29 | Malzahar | -0.12 | 0.20 | 0.32 |  |
| 30 | Veigar | -0.15 | 0.24 | 0.39 |  |
| 31 | Xayah | -0.15 | 0.20 | 0.35 |  |
| 32 | Nidalee | -0.15 | 0.00 | 0.15 |  |
| 33 | Zilean | -0.15 | 0.00 | 0.15 |  |
| 34 | Taliyah | -0.16 | 0.00 | 0.16 |  |
| 35 | Vayne | -0.16 | 0.00 | 0.16 |  |
| 36 | Zoe | -0.16 | 0.00 | 0.16 |  |
| 37 | Fiora | -0.17 | 0.38 | 0.55 |  |
| 38 | Cassiopeia | -0.17 | 0.29 | 0.46 |  |
| 39 | Renata Glasc | -0.17 | 0.00 | 0.17 |  |
| 40 | Soraka | -0.17 | 0.00 | 0.17 |  |
| 41 | Ashe | -0.19 | 0.09 | 0.28 |  |
| 42 | Heimerdinger | -0.19 | 0.05 | 0.24 |  |
| 43 | Jayce | -0.20 | 0.00 | 0.20 |  |
| 44 | Akshan | -0.21 | 0.00 | 0.21 |  |
| 45 | Janna | -0.21 | 0.00 | 0.21 |  |
| 46 | Karma | -0.21 | 0.00 | 0.21 |  |
| 47 | Quinn | -0.21 | 0.00 | 0.21 |  |
| 48 | Ivern | -0.22 | 0.00 | 0.22 |  |
| 49 | Vel'Koz | -0.23 | 0.00 | 0.23 |  |
| 50 | LeBlanc | -0.24 | 0.00 | 0.24 |  |
| 51 | Morgana | -0.25 | 0.08 | 0.33 |  |
| 52 | Kog'Maw | -0.26 | 0.00 | 0.26 |  |
| 53 | Anivia | -0.27 | 0.06 | 0.33 |  |
| 54 | Master Yi | -0.28 | 0.37 | 0.65 |  |
| 55 | Tristana | -0.29 | 0.18 | 0.47 |  |
| 56 | Gnar | -0.30 | 0.00 | 0.30 |  |
| 57 | Ryze | -0.31 | 0.00 | 0.31 |  |
| 58 | Singed | -0.32 | 0.77 | 1.09 |  |
| 59 | Shaco | -0.32 | 0.21 | 0.53 |  |
| 60 | Nilah | -0.35 | 0.46 | 0.81 | attack dodge (Jubilant Veil) |
| 61 | Gwen | -0.36 | 0.30 | 0.66 |  |
| 62 | Kayn | -0.36 | 0.21 | 0.57 |  |
| 63 | Aurelion Sol | -0.36 | 0.00 | 0.36 |  |
| 64 | Brand | -0.36 | 0.00 | 0.36 |  |
| 65 | Corki | -0.36 | 0.00 | 0.36 |  |
| 66 | Sona | -0.36 | 0.00 | 0.36 |  |
| 67 | Thresh | -0.36 | 0.00 | 0.36 |  |
| 68 | Zyra | -0.38 | 0.04 | 0.42 |  |
| 69 | Jhin | -0.38 | 0.00 | 0.38 |  |
| 70 | Xerath | -0.38 | 0.00 | 0.38 |  |
| 71 | Aphelios | -0.39 | 0.05 | 0.44 |  |
| 72 | Rammus | -0.40 | 0.50 | 0.90 | attack reflect (Defensive Ball Curl) |
| 73 | Katarina | -0.41 | 0.31 | 0.72 |  |
| 74 | Camille | -0.41 | 0.20 | 0.61 |  |
| 75 | Lux | -0.41 | 0.00 | 0.41 |  |
| 76 | Smolder | -0.41 | 0.00 | 0.41 |  |
| 77 | Tryndamere | -0.41 | 0.00 | 0.41 |  |
| 78 | Zeri | -0.41 | 0.00 | 0.41 |  |
| 79 | Miss Fortune | -0.42 | 0.00 | 0.42 |  |
| 80 | Neeko | -0.42 | 0.00 | 0.42 |  |
| 81 | Orianna | -0.42 | 0.00 | 0.42 |  |
| 82 | Udyr | -0.43 | 0.11 | 0.54 |  |
| 83 | Azir | -0.43 | 0.00 | 0.43 |  |
| 84 | Nasus | -0.44 | 0.50 | 0.94 | attack speed slow (Wither) |
| 85 | Ahri | -0.45 | 0.26 | 0.71 |  |
| 86 | Pantheon | -0.45 | 0.15 | 0.60 |  |
| 87 | Warwick | -0.47 | 0.17 | 0.64 |  |
| 88 | Ezreal | -0.47 | 0.00 | 0.47 |  |
| 89 | Fiddlesticks | -0.47 | 0.00 | 0.47 |  |
| 90 | Seraphine | -0.48 | 0.00 | 0.48 |  |
| 91 | Nami | -0.50 | 0.00 | 0.50 |  |
| 92 | Ziggs | -0.51 | 0.00 | 0.51 |  |
| 93 | Poppy | -0.54 | 0.38 | 0.92 |  |
| 94 | Rek'Sai | -0.54 | 0.21 | 0.75 |  |
| 95 | Sylas | -0.54 | 0.00 | 0.54 |  |
| 96 | Senna | -0.55 | 0.08 | 0.63 |  |
| 97 | Graves | -0.55 | 0.00 | 0.55 |  |
| 98 | Karthus | -0.55 | 0.00 | 0.55 |  |
| 99 | Kennen | -0.55 | 0.00 | 0.55 |  |
| 100 | Maokai | -0.56 | 0.40 | 0.96 |  |
| 101 | Bel'Veth | -0.56 | 0.00 | 0.56 |  |
| 102 | Lucian | -0.56 | 0.00 | 0.56 |  |
| 103 | Nocturne | -0.57 | 0.36 | 0.93 |  |
| 104 | Yone | -0.57 | 0.14 | 0.71 |  |
| 105 | Annie | -0.58 | 0.07 | 0.65 |  |
| 106 | Wukong | -0.58 | 0.00 | 0.58 |  |
| 107 | Lee Sin | -0.59 | 0.00 | 0.59 |  |
| 108 | Naafiri | -0.59 | 0.00 | 0.59 |  |
| 109 | Urgot | -0.59 | 0.00 | 0.59 |  |
| 110 | Jax | -0.60 | 0.53 | 1.13 | attack dodge (Counter Strike) |
| 111 | Zac | -0.60 | 0.30 | 0.90 |  |
| 112 | Zed | -0.60 | 0.20 | 0.80 |  |
| 113 | Lillia | -0.60 | 0.00 | 0.60 |  |
| 114 | Aatrox | -0.61 | 0.00 | 0.61 |  |
| 115 | Fizz | -0.63 | 0.00 | 0.63 |  |
| 116 | Rakan | -0.63 | 0.00 | 0.63 |  |
| 117 | Malphite | -0.64 | 0.33 | 0.97 |  |
| 118 | Draven | -0.66 | 0.00 | 0.66 |  |
| 119 | Swain | -0.66 | 0.00 | 0.66 |  |
| 120 | Syndra | -0.66 | 0.00 | 0.66 |  |
| 121 | Tahm Kench | -0.66 | 0.00 | 0.66 |  |
| 122 | Riven | -0.67 | 0.00 | 0.67 |  |
| 123 | Shyvana | -0.67 | 0.00 | 0.67 |  |
| 124 | Viego | -0.70 | 0.00 | 0.70 |  |
| 125 | Alistar | -0.71 | 0.04 | 0.75 |  |
| 126 | Hecarim | -0.72 | 0.00 | 0.72 |  |
| 127 | Jarvan IV | -0.72 | 0.00 | 0.72 |  |
| 128 | Galio | -0.73 | 0.00 | 0.73 |  |
| 129 | Ekko | -0.74 | 0.22 | 0.96 |  |
| 130 | Briar | -0.74 | 0.00 | 0.74 |  |
| 131 | Ambessa | -0.76 | 0.00 | 0.76 |  |
| 132 | Rell | -0.77 | 0.00 | 0.77 |  |
| 133 | Talon | -0.77 | 0.00 | 0.77 |  |
| 134 | Xin Zhao | -0.78 | 0.10 | 0.88 |  |
| 135 | K'Sante | -0.78 | 0.00 | 0.78 |  |
| 136 | Sett | -0.79 | 0.00 | 0.79 |  |
| 137 | Kha'Zix | -0.80 | 0.00 | 0.80 |  |
| 138 | Amumu | -0.81 | 0.14 | 0.95 |  |
| 139 | Vi | -0.81 | 0.00 | 0.81 |  |
| 140 | Yorick | -0.81 | 0.00 | 0.81 |  |
| 141 | Nautilus | -0.82 | 0.00 | 0.82 |  |
| 142 | Mordekaiser | -0.84 | 0.12 | 0.96 |  |
| 143 | Ornn | -0.85 | 0.00 | 0.85 |  |
| 144 | Volibear | -0.85 | 0.00 | 0.85 |  |
| 145 | Taric | -0.88 | 0.10 | 0.98 |  |
| 146 | Diana | -0.88 | 0.00 | 0.88 |  |
| 147 | Illaoi | -0.88 | 0.00 | 0.88 |  |
| 148 | Irelia | -0.88 | 0.00 | 0.88 |  |
| 149 | Leona | -0.88 | 0.00 | 0.88 |  |
| 150 | Gragas | -0.89 | 0.00 | 0.89 |  |
| 151 | Kassadin | -0.90 | 0.00 | 0.90 |  |
| 152 | Qiyana | -0.91 | 0.00 | 0.91 |  |
| 153 | Locke | -0.93 | 0.00 | 0.93 |  |
| 154 | Akali | -0.94 | 0.00 | 0.94 |  |
| 155 | Dr. Mundo | -0.94 | 0.00 | 0.94 |  |
| 156 | Sejuani | -0.94 | 0.00 | 0.94 |  |
| 157 | Renekton | -0.96 | 0.00 | 0.96 |  |
| 158 | Sion | -0.98 | 0.05 | 1.03 |  |
| 159 | Garen | -1.00 | 0.12 | 1.12 |  |
| 160 | Zaahen | -1.04 | 0.05 | 1.09 |  |
| 161 | Evelynn | -1.07 | 0.21 | 1.28 |  |
| 162 | Rengar | -1.08 | 0.08 | 1.16 |  |
| 163 | Olaf | -1.09 | 0.05 | 1.14 |  |
| 164 | Nunu & Willump | -1.15 | 0.13 | 1.28 |  |
| 165 | Rumble | -1.16 | 0.00 | 1.16 |  |
| 166 | Skarner | -1.19 | 0.06 | 1.25 |  |
| 167 | Blitzcrank | -1.20 | 0.00 | 1.20 |  |
| 168 | Gangplank | -1.25 | 0.07 | 1.32 |  |
| 169 | Darius | -1.25 | 0.00 | 1.25 |  |
| 170 | Trundle | -1.25 | 0.00 | 1.25 |  |
| 171 | Pyke | -1.30 | 0.00 | 1.30 |  |
| 172 | Cho'Gath | -1.43 | 0.00 | 1.43 |  |
