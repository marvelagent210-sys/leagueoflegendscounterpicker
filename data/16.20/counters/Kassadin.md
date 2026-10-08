# Counters to Kassadin (patch 26.20)

Every champion ranked by what its kit does against Kassadin's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kassadin's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kassadin` for the full ledger of a matchup, with sources.

## Top 10

### 1. Yuumi (net +1.10)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Kassadin's Riftwalk. Untargetable for ?; Riftwalk takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Kassadin R Riftwalk)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Kassadin's Null Sphere. Untargetable for ?; Null Sphere takes 0.71 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Kassadin Q Null Sphere)
- **0.30** range: Yuumi's basic attacks reach 275 units farther than Kassadin's (425 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Yuumi basic attacks → Kassadin basic attacks)
- Watch out: Null Sphere's disrupt interrupts Yuumi's Final Chapter (normal channel).

### 2. Sivir (net +1.05)

- **0.47** spell shield: Spell Shield's spell shield blocks Kassadin's Riftwalk. Spell shield for 1.5 s, long enough to use ahead of Riftwalk. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kassadin R Riftwalk)
- **0.44** range: Sivir's basic attacks reach 350 units farther than Kassadin's (500 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Sivir basic attacks → Kassadin basic attacks)
- **0.28** spell shield: Spell Shield's spell shield blocks Kassadin's Null Sphere. Spell shield for 1.5 s, long enough to use ahead of Null Sphere. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kassadin Q Null Sphere)

### 3. Elise (net +0.93)

- **0.47** untargetable: Rappel makes Elise untargetable, dodging Kassadin's Riftwalk. Untargetable for 0.6 s; Riftwalk takes 0.25 s to land, enough to react. (Elise E Rappel → Kassadin R Riftwalk)
- **0.32** range: Elise's basic attacks reach 400 units farther than Kassadin's (550 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Elise basic attacks → Kassadin basic attacks)
- **0.28** untargetable: Rappel makes Elise untargetable, dodging Kassadin's Null Sphere. Untargetable for 0.6 s; Null Sphere takes 0.71 s to land, enough to react. (Elise E Rappel → Kassadin Q Null Sphere)

### 4. Kindred (net +0.90)

- **0.44** range: Kindred's basic attacks reach 350 units farther than Kassadin's (500 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Kindred basic attacks → Kassadin basic attacks)
- **0.41** invulnerable: Lamb's Respite makes Kindred invulnerable to Kassadin's Riftwalk. Invulnerable for ?; Riftwalk takes 0.25 s to land, enough to react. (Kindred R Lamb's Respite → Kassadin R Riftwalk)
- **0.10** invulnerable: Lamb's Respite makes Kindred invulnerable to Kassadin's Null Sphere (its crowd control still applies). Invulnerable for ?; Null Sphere takes 0.71 s to land, enough to react. (Kindred R Lamb's Respite → Kassadin Q Null Sphere)

### 5. Xayah (net +0.87)

- **0.41** untargetable: Featherstorm makes Xayah untargetable, dodging Kassadin's Riftwalk. Untargetable for 1.5 s, long enough to use ahead of Riftwalk. (Xayah R Featherstorm → Kassadin R Riftwalk)
- **0.36** range: Xayah's basic attacks reach 375 units farther than Kassadin's (525 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Xayah basic attacks → Kassadin basic attacks)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Kassadin's Null Sphere. Untargetable for 1.5 s, long enough to use ahead of Null Sphere. (Xayah R Featherstorm → Kassadin Q Null Sphere)

### 6. Bard (net +0.86)

- **0.42** untargetable: Tempered Fate makes Bard untargetable, dodging Kassadin's Riftwalk. Untargetable for 2.5 s, long enough to use ahead of Riftwalk. (Bard R Tempered Fate → Kassadin R Riftwalk)
- **0.34** range: Bard's basic attacks reach 350 units farther than Kassadin's (500 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Bard basic attacks → Kassadin basic attacks)
- **0.20** untargetable: Tempered Fate makes Bard untargetable, dodging Kassadin's Null Sphere. Untargetable for 2.5 s, long enough to use ahead of Null Sphere. (Bard R Tempered Fate → Kassadin Q Null Sphere)

### 7. Kayle (net +0.83)

- **0.42** invulnerable: Divine Judgment makes Kayle invulnerable to Kassadin's Riftwalk. Invulnerable for 2.5 s, long enough to use ahead of Riftwalk. (Kayle R Divine Judgment → Kassadin R Riftwalk)
- **0.36** range: Kayle's basic attacks reach 475 units farther than Kassadin's (625 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Kayle basic attacks → Kassadin basic attacks)
- **0.10** invulnerable: Divine Judgment makes Kayle invulnerable to Kassadin's Null Sphere (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Null Sphere. (Kayle R Divine Judgment → Kassadin Q Null Sphere)

### 8. Aurora (net +0.80)

- **0.41** untargetable: Between Worlds makes Aurora untargetable, dodging Kassadin's Riftwalk. Untargetable for 0.4 s; Riftwalk takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kassadin R Riftwalk)
- **0.29** range: Aurora's basic attacks reach 400 units farther than Kassadin's (550 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Aurora basic attacks → Kassadin basic attacks)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Kassadin's Null Sphere. Untargetable for 0.4 s; Null Sphere takes 0.71 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kassadin Q Null Sphere)

### 9. Lissandra (net +0.74)

- **0.42** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Kassadin's Riftwalk. Untargetable for 2.5 s, long enough to use ahead of Riftwalk. (Lissandra R Frozen Tomb → Kassadin R Riftwalk)
- **0.22** range: Lissandra's basic attacks reach 400 units farther than Kassadin's (550 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Lissandra basic attacks → Kassadin basic attacks)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Kassadin's Null Sphere. Untargetable for 2.5 s, long enough to use ahead of Null Sphere. (Lissandra R Frozen Tomb → Kassadin Q Null Sphere)

### 10. Maokai (net +0.71)

- **0.52** untargetable: Twisted Advance makes Maokai untargetable, dodging Kassadin's Riftwalk. Untargetable for 1.4 s; Riftwalk takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Kassadin R Riftwalk)
- **0.37** untargetable: Twisted Advance makes Maokai untargetable, dodging Kassadin's Null Sphere. Untargetable for 1.4 s; Null Sphere takes 0.71 s to land, enough to react. (Maokai W Twisted Advance → Kassadin Q Null Sphere)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +1.10 | 1.53 | 0.43 |  |
| 2 | Sivir | +1.05 | 1.05 | 0.00 |  |
| 3 | Elise | +0.93 | 0.93 | 0.00 |  |
| 4 | Kindred | +0.90 | 0.90 | 0.00 |  |
| 5 | Xayah | +0.87 | 0.87 | 0.00 |  |
| 6 | Bard | +0.86 | 0.86 | 0.00 |  |
| 7 | Kayle | +0.83 | 0.83 | 0.00 |  |
| 8 | Aurora | +0.80 | 0.80 | 0.00 |  |
| 9 | Lissandra | +0.74 | 0.74 | 0.00 |  |
| 10 | Maokai | +0.71 | 0.71 | 0.00 |  |
| 11 | Vladimir | +0.70 | 0.79 | 0.09 |  |
| 12 | Cassiopeia | +0.70 | 0.70 | 0.00 | grounding (Miasma) |
| 13 | Teemo | +0.70 | 0.70 | 0.00 |  |
| 14 | Nocturne | +0.67 | 0.67 | 0.00 |  |
| 15 | Fiora | +0.65 | 0.65 | 0.00 |  |
| 16 | Lulu | +0.63 | 0.63 | 0.00 |  |
| 17 | Gwen | +0.61 | 0.61 | 0.00 |  |
| 18 | Samira | +0.55 | 0.55 | 0.00 |  |
| 19 | Ekko | +0.53 | 0.53 | 0.00 |  |
| 20 | Evelynn | +0.52 | 0.52 | 0.00 |  |
| 21 | Mel | +0.52 | 0.52 | 0.00 |  |
| 22 | Rek'Sai | +0.52 | 0.52 | 0.00 |  |
| 23 | Shaco | +0.52 | 0.52 | 0.00 |  |
| 24 | Camille | +0.51 | 0.51 | 0.00 |  |
| 25 | Zed | +0.51 | 0.51 | 0.00 |  |
| 26 | Singed | +0.49 | 0.49 | 0.00 | grounding (Mega Adhesive) |
| 27 | Master Yi | +0.46 | 0.69 | 0.23 |  |
| 28 | Taric | +0.46 | 0.46 | 0.00 |  |
| 29 | Xin Zhao | +0.46 | 0.46 | 0.00 |  |
| 30 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 31 | Pantheon | +0.43 | 0.54 | 0.11 |  |
| 32 | Aphelios | +0.43 | 0.43 | 0.00 |  |
| 33 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 34 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 35 | Braum | +0.42 | 0.42 | 0.00 | projectile block (Unbreakable) |
| 36 | Milio | +0.42 | 0.42 | 0.00 |  |
| 37 | Morgana | +0.42 | 0.42 | 0.00 |  |
| 38 | Sona | +0.41 | 0.41 | 0.00 |  |
| 39 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 40 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 41 | Draven | +0.36 | 0.36 | 0.00 |  |
| 42 | Kai'Sa | +0.36 | 0.36 | 0.00 |  |
| 43 | Nilah | +0.36 | 0.36 | 0.00 |  |
| 44 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 45 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 46 | Kalista | +0.34 | 0.34 | 0.00 |  |
| 47 | Udyr | +0.33 | 0.33 | 0.00 |  |
| 48 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 49 | Senna | +0.32 | 0.32 | 0.00 |  |
| 50 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 51 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 52 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 53 | Gnar | +0.31 | 0.31 | 0.00 |  |
| 54 | Jax | +0.31 | 0.31 | 0.00 |  |
| 55 | Corki | +0.30 | 0.30 | 0.00 |  |
| 56 | Viktor | +0.30 | 0.30 | 0.00 |  |
| 57 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 58 | Lux | +0.29 | 0.29 | 0.00 |  |
| 59 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 60 | Yasuo | +0.29 | 0.29 | 0.00 |  |
| 61 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 62 | Nidalee | +0.28 | 0.28 | 0.00 |  |
| 63 | Jinx | +0.27 | 0.27 | 0.00 |  |
| 64 | Seraphine | +0.27 | 0.27 | 0.00 |  |
| 65 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 66 | Vex | +0.27 | 0.27 | 0.00 |  |
| 67 | Ziggs | +0.27 | 0.27 | 0.00 |  |
| 68 | Azir | +0.25 | 0.25 | 0.00 |  |
| 69 | Heimerdinger | +0.25 | 0.25 | 0.00 |  |
| 70 | Kled | +0.25 | 0.25 | 0.00 |  |
| 71 | Kog'Maw | +0.25 | 0.25 | 0.00 |  |
| 72 | Orianna | +0.25 | 0.25 | 0.00 |  |
| 73 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 74 | Veigar | +0.24 | 0.24 | 0.00 |  |
| 75 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 76 | Hwei | +0.23 | 0.23 | 0.00 |  |
| 77 | Ahri | +0.22 | 0.22 | 0.00 |  |
| 78 | Annie | +0.22 | 0.22 | 0.00 |  |
| 79 | Brand | +0.22 | 0.22 | 0.00 |  |
| 80 | Graves | +0.22 | 0.22 | 0.00 |  |
| 81 | Nami | +0.22 | 0.22 | 0.00 |  |
| 82 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 83 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 84 | Karma | +0.21 | 0.21 | 0.00 |  |
| 85 | LeBlanc | +0.21 | 0.21 | 0.00 |  |
| 86 | Swain | +0.20 | 0.20 | 0.00 |  |
| 87 | Malphite | +0.19 | 0.19 | 0.00 |  |
| 88 | Thresh | +0.18 | 0.18 | 0.00 |  |
| 89 | Varus | +0.16 | 0.27 | 0.11 |  |
| 90 | Quinn | +0.15 | 0.36 | 0.21 |  |
| 91 | Olaf | +0.15 | 0.15 | 0.00 |  |
| 92 | Zaahen | +0.15 | 0.15 | 0.00 |  |
| 93 | Aurelion Sol | +0.13 | 0.22 | 0.09 |  |
| 94 | Urgot | +0.13 | 0.13 | 0.00 |  |
| 95 | Garen | +0.12 | 0.12 | 0.00 |  |
| 96 | Rakan | +0.11 | 0.11 | 0.00 |  |
| 97 | Lillia | +0.10 | 0.10 | 0.00 |  |
| 98 | Gangplank | +0.09 | 0.09 | 0.00 |  |
| 99 | Rengar | +0.09 | 0.09 | 0.00 |  |
| 100 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 101 | Kayn | +0.07 | 0.52 | 0.45 |  |
| 102 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 103 | Lucian | +0.06 | 0.34 | 0.28 |  |
| 104 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 105 | Twisted Fate | +0.05 | 0.40 | 0.35 |  |
| 106 | Alistar | +0.05 | 0.05 | 0.00 |  |
| 107 | Akshan | +0.04 | 0.32 | 0.28 |  |
| 108 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 109 | Ivern | +0.03 | 0.18 | 0.15 |  |
| 110 | Sion | 0.00 | 0.16 | 0.16 |  |
| 111 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 112 | Akali | 0.00 | 0.00 | 0.00 |  |
| 113 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 114 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 115 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 116 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 117 | Briar | 0.00 | 0.00 | 0.00 |  |
| 118 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 119 | Darius | 0.00 | 0.00 | 0.00 |  |
| 120 | Diana | 0.00 | 0.00 | 0.00 |  |
| 121 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 122 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 123 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 124 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 125 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 126 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 127 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 128 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 129 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 130 | Leona | 0.00 | 0.00 | 0.00 |  |
| 131 | Locke | 0.00 | 0.00 | 0.00 |  |
| 132 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 133 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 134 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 135 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 136 | Rell | 0.00 | 0.00 | 0.00 |  |
| 137 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 138 | Riven | 0.00 | 0.00 | 0.00 |  |
| 139 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 140 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 141 | Sett | 0.00 | 0.00 | 0.00 |  |
| 142 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 143 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 144 | Talon | 0.00 | 0.00 | 0.00 |  |
| 145 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 146 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 147 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 148 | Yone | 0.00 | 0.00 | 0.00 |  |
| 149 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 150 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 151 | Rammus | -0.03 | 0.29 | 0.32 |  |
| 152 | Vel'Koz | -0.03 | 0.25 | 0.28 |  |
| 153 | Janna | -0.04 | 0.36 | 0.40 |  |
| 154 | Malzahar | -0.04 | 0.36 | 0.40 |  |
| 155 | Xerath | -0.08 | 0.25 | 0.33 |  |
| 156 | Karthus | -0.10 | 0.18 | 0.28 |  |
| 157 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 158 | Shen | -0.16 | 0.29 | 0.45 |  |
| 159 | Galio | -0.18 | 0.00 | 0.18 |  |
| 160 | Pyke | -0.18 | 0.00 | 0.18 |  |
| 161 | Gragas | -0.19 | 0.00 | 0.19 |  |
| 162 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 163 | Warwick | -0.22 | 0.15 | 0.37 |  |
| 164 | Taliyah | -0.23 | 0.25 | 0.48 |  |
| 165 | Viego | -0.25 | 0.00 | 0.25 |  |
| 166 | Katarina | -0.28 | 0.00 | 0.28 |  |
| 167 | Fiddlesticks | -0.29 | 0.18 | 0.47 |  |
| 168 | Nunu & Willump | -0.35 | 0.14 | 0.49 |  |
| 169 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 170 | Vi | -0.46 | 0.00 | 0.46 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Zac | -0.50 | 0.00 | 0.50 |  |
