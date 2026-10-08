# Counters to Locke (patch 26.20)

Every champion ranked by what its kit does against Locke's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Locke's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Locke` for the full ledger of a matchup, with sources.

## Top 10

### 1. Kayn (net +0.99)

- **0.55** untargetable: Umbral Trespass makes Kayn untargetable, dodging Locke's Purgatory. Untargetable for 0.25 s; Purgatory takes 0.5 s to land, enough to react. (Kayn R Umbral Trespass → Locke R Purgatory)
- **0.44** death prevention: Locke's Purgatory can't execute Kayn during The Darkin Scythe (invulnerable). The Darkin Scythe lasts 6 s on a ? cooldown. (Kayn I The Darkin Scythe → Locke R Purgatory)

### 2. Teemo (net +0.97)

- **0.50** blind: Blinding Dart's blind makes Locke's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Locke basic attacks)
- **0.34** range: Teemo's basic attacks reach 375 units farther than Locke's (500 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Teemo basic attacks → Locke basic attacks)
- **0.26** blind: Blinding Dart's blind makes Locke's Ashen Pursuit, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Locke E Ashen Pursuit)

### 3. Kayle (net +0.94)

- **0.44** death prevention: Locke's Purgatory can't execute Kayle during Divine Judgment (invulnerable). Divine Judgment lasts 2.5 s on a 80 s cooldown. (Kayle R Divine Judgment → Locke R Purgatory)
- **0.36** range: Kayle's basic attacks reach 500 units farther than Locke's (625 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Kayle basic attacks → Locke basic attacks)
- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Locke's Purgatory (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Purgatory. (Kayle R Divine Judgment → Locke R Purgatory)

### 4. Kindred (net +0.93)

- **0.47** range: Kindred's basic attacks reach 375 units farther than Locke's (500 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Kindred basic attacks → Locke basic attacks)
- **0.35** death prevention: Locke's Purgatory can't execute Kindred during Lamb's Respite (minimum health). Lamb's Respite lasts ? on a 120 s cooldown. (Kindred R Lamb's Respite → Locke R Purgatory)
- **0.22** invulnerable: Lamb's Respite makes Kindred invulnerable to Locke's Purgatory (its crowd control still applies). Invulnerable for ?; Purgatory takes 0.5 s to land, enough to react. (Kindred R Lamb's Respite → Locke R Purgatory)

### 5. Bard (net +0.91)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Locke's Purgatory. Untargetable for 2.5 s, long enough to use ahead of Purgatory. (Bard R Tempered Fate → Locke R Purgatory)
- **0.36** range: Bard's basic attacks reach 375 units farther than Locke's (500 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Bard basic attacks → Locke basic attacks)

### 6. Pantheon (net +0.90)

- **0.44** death prevention: Locke's Purgatory can't execute Pantheon during Aegis Assault (invulnerable). Aegis Assault lasts 1.5 s on a 18 s cooldown. (Pantheon E Aegis Assault → Locke R Purgatory)
- **0.32** death prevention: Locke's Purgatory can't execute Pantheon during Grand Starfall (minimum health). Grand Starfall lasts ? on a 150 s cooldown. (Pantheon R Grand Starfall → Locke R Purgatory)
- **0.28** invulnerable: Aegis Assault makes Pantheon invulnerable to Locke's Purgatory (its crowd control still applies). Invulnerable for 1.5 s, long enough to use ahead of Purgatory. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Locke R Purgatory)

### 7. Elise (net +0.87)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Locke's Purgatory. Untargetable for 0.6 s; Purgatory takes 0.5 s to land, enough to react. (Elise E Rappel → Locke R Purgatory)
- **0.32** range: Elise's basic attacks reach 425 units farther than Locke's (550 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Elise basic attacks → Locke basic attacks)

### 8. Lissandra (net +0.87)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Locke's Purgatory. Untargetable for 2.5 s, long enough to use ahead of Purgatory. (Lissandra R Frozen Tomb → Locke R Purgatory)
- **0.22** range: Lissandra's basic attacks reach 425 units farther than Locke's (550 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Lissandra basic attacks → Locke basic attacks)
- **0.19** dash stop: Frozen Tomb's knockdown can stop Locke's Ashen Pursuit mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. The wiki marks this dash's knockdown interaction as special. (Lissandra R Frozen Tomb → Locke E Ashen Pursuit)

### 9. Yuumi (net +0.87)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Locke's Purgatory. Untargetable for ?; Purgatory takes 0.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Locke R Purgatory)
- **0.32** range: Yuumi's basic attacks reach 300 units farther than Locke's (425 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Yuumi basic attacks → Locke basic attacks)

### 10. Xayah (net +0.86)

- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Locke's Purgatory. Untargetable for 1.5 s, long enough to use ahead of Purgatory. (Xayah R Featherstorm → Locke R Purgatory)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Locke's (525 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Xayah basic attacks → Locke basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kayn | +0.99 | 0.99 | 0.00 |  |
| 2 | Teemo | +0.97 | 0.97 | 0.00 | blind (Blinding Dart) |
| 3 | Kayle | +0.94 | 0.94 | 0.00 |  |
| 4 | Kindred | +0.93 | 0.93 | 0.00 |  |
| 5 | Bard | +0.91 | 0.91 | 0.00 |  |
| 6 | Pantheon | +0.90 | 0.90 | 0.00 |  |
| 7 | Elise | +0.87 | 0.87 | 0.00 |  |
| 8 | Lissandra | +0.87 | 0.87 | 0.00 |  |
| 9 | Yuumi | +0.87 | 0.87 | 0.00 |  |
| 10 | Xayah | +0.86 | 0.86 | 0.00 |  |
| 11 | Aurora | +0.77 | 0.77 | 0.00 |  |
| 12 | Zilean | +0.76 | 0.76 | 0.00 |  |
| 13 | Sivir | +0.75 | 0.75 | 0.00 |  |
| 14 | Vladimir | +0.73 | 0.73 | 0.00 |  |
| 15 | Lulu | +0.72 | 0.72 | 0.00 |  |
| 16 | Kog'Maw | +0.71 | 0.71 | 0.00 |  |
| 17 | Master Yi | +0.71 | 0.71 | 0.00 |  |
| 18 | Samira | +0.71 | 0.71 | 0.00 |  |
| 19 | Jinx | +0.69 | 0.69 | 0.00 | dash stop (Flame Chompers!) |
| 20 | Mel | +0.67 | 0.67 | 0.00 |  |
| 21 | Singed | +0.66 | 0.66 | 0.00 |  |
| 22 | Viktor | +0.66 | 0.66 | 0.00 |  |
| 23 | Zac | +0.65 | 0.65 | 0.00 | dash stop (Stretching Strikes) |
| 24 | Hwei | +0.63 | 0.63 | 0.00 | dash stop (Grim Visage) |
| 25 | Nilah | +0.62 | 0.62 | 0.00 |  |
| 26 | Jax | +0.61 | 0.61 | 0.00 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 27 | Zaahen | +0.61 | 0.61 | 0.00 |  |
| 28 | Cassiopeia | +0.60 | 0.60 | 0.00 |  |
| 29 | Fiora | +0.60 | 0.60 | 0.00 |  |
| 30 | Shen | +0.60 | 0.60 | 0.00 | attack block (Spirit's Refuge) |
| 31 | Ahri | +0.58 | 0.58 | 0.00 |  |
| 32 | Vex | +0.58 | 0.58 | 0.00 |  |
| 33 | Veigar | +0.57 | 0.57 | 0.00 |  |
| 34 | Ekko | +0.55 | 0.55 | 0.00 |  |
| 35 | Evelynn | +0.55 | 0.55 | 0.00 |  |
| 36 | Gwen | +0.55 | 0.55 | 0.00 |  |
| 37 | Maokai | +0.55 | 0.55 | 0.00 |  |
| 38 | Rek'Sai | +0.55 | 0.55 | 0.00 |  |
| 39 | Shaco | +0.55 | 0.55 | 0.00 |  |
| 40 | Braum | +0.52 | 0.52 | 0.00 |  |
| 41 | Camille | +0.51 | 0.51 | 0.00 |  |
| 42 | Xin Zhao | +0.51 | 0.51 | 0.00 |  |
| 43 | Anivia | +0.50 | 0.50 | 0.00 |  |
| 44 | Malzahar | +0.50 | 0.50 | 0.00 |  |
| 45 | Poppy | +0.50 | 0.50 | 0.00 | dash stop (Steadfast Presence) |
| 46 | Milio | +0.49 | 0.49 | 0.00 |  |
| 47 | Zed | +0.48 | 0.48 | 0.00 |  |
| 48 | Aphelios | +0.47 | 0.47 | 0.00 |  |
| 49 | Taric | +0.46 | 0.46 | 0.00 |  |
| 50 | Varus | +0.45 | 0.45 | 0.00 |  |
| 51 | Tryndamere | +0.44 | 0.44 | 0.00 |  |
| 52 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 53 | Kalista | +0.43 | 0.43 | 0.00 |  |
| 54 | Twisted Fate | +0.43 | 0.43 | 0.00 |  |
| 55 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 56 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 57 | Yasuo | +0.42 | 0.42 | 0.00 |  |
| 58 | Sona | +0.41 | 0.41 | 0.00 |  |
| 59 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 60 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 61 | Quinn | +0.38 | 0.38 | 0.00 |  |
| 62 | Rammus | +0.38 | 0.38 | 0.00 |  |
| 63 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 64 | Morgana | +0.37 | 0.37 | 0.00 |  |
| 65 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 66 | Caitlyn | +0.36 | 0.36 | 0.00 |  |
| 67 | Draven | +0.36 | 0.36 | 0.00 |  |
| 68 | Janna | +0.36 | 0.36 | 0.00 |  |
| 69 | Lucian | +0.36 | 0.36 | 0.00 |  |
| 70 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 71 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 72 | Akshan | +0.34 | 0.34 | 0.00 |  |
| 73 | Gnar | +0.33 | 0.33 | 0.00 |  |
| 74 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 75 | Miss Fortune | +0.32 | 0.32 | 0.00 |  |
| 76 | Senna | +0.32 | 0.32 | 0.00 |  |
| 77 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 78 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 79 | Corki | +0.30 | 0.30 | 0.00 |  |
| 80 | Jayce | +0.30 | 0.30 | 0.00 |  |
| 81 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 82 | Heimerdinger | +0.29 | 0.29 | 0.00 |  |
| 83 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 84 | Lux | +0.29 | 0.29 | 0.00 |  |
| 85 | Seraphine | +0.29 | 0.29 | 0.00 |  |
| 86 | Kled | +0.28 | 0.28 | 0.00 |  |
| 87 | Nocturne | +0.28 | 0.28 | 0.00 |  |
| 88 | Azir | +0.27 | 0.27 | 0.00 |  |
| 89 | Jhin | +0.27 | 0.27 | 0.00 |  |
| 90 | Orianna | +0.27 | 0.27 | 0.00 |  |
| 91 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 92 | Taliyah | +0.27 | 0.27 | 0.00 |  |
| 93 | Vel'Koz | +0.27 | 0.27 | 0.00 |  |
| 94 | Warwick | +0.27 | 0.27 | 0.00 |  |
| 95 | Xerath | +0.27 | 0.27 | 0.00 |  |
| 96 | Ziggs | +0.27 | 0.27 | 0.00 |  |
| 97 | Malphite | +0.25 | 0.25 | 0.00 |  |
| 98 | Graves | +0.24 | 0.24 | 0.00 |  |
| 99 | Ryze | +0.24 | 0.24 | 0.00 |  |
| 100 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 101 | Annie | +0.22 | 0.22 | 0.00 |  |
| 102 | Aurelion Sol | +0.22 | 0.22 | 0.00 |  |
| 103 | Brand | +0.22 | 0.22 | 0.00 |  |
| 104 | Karma | +0.22 | 0.22 | 0.00 |  |
| 105 | LeBlanc | +0.22 | 0.22 | 0.00 |  |
| 106 | Nami | +0.22 | 0.22 | 0.00 |  |
| 107 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 108 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 109 | Garen | +0.21 | 0.21 | 0.00 |  |
| 110 | Swain | +0.21 | 0.21 | 0.00 |  |
| 111 | Fiddlesticks | +0.20 | 0.20 | 0.00 |  |
| 112 | Nunu & Willump | +0.20 | 0.20 | 0.00 |  |
| 113 | Udyr | +0.20 | 0.20 | 0.00 |  |
| 114 | Ivern | +0.19 | 0.19 | 0.00 |  |
| 115 | Karthus | +0.19 | 0.19 | 0.00 |  |
| 116 | Thresh | +0.19 | 0.19 | 0.00 |  |
| 117 | Yone | +0.19 | 0.19 | 0.00 |  |
| 118 | Amumu | +0.18 | 0.18 | 0.00 |  |
| 119 | Katarina | +0.18 | 0.18 | 0.00 |  |
| 120 | Olaf | +0.17 | 0.17 | 0.00 |  |
| 121 | Sion | +0.17 | 0.17 | 0.00 |  |
| 122 | Rengar | +0.15 | 0.15 | 0.00 |  |
| 123 | Urgot | +0.15 | 0.15 | 0.00 |  |
| 124 | Gangplank | +0.14 | 0.14 | 0.00 |  |
| 125 | Alistar | +0.13 | 0.13 | 0.00 |  |
| 126 | Rakan | +0.13 | 0.13 | 0.00 |  |
| 127 | Lillia | +0.11 | 0.11 | 0.00 |  |
| 128 | Skarner | +0.10 | 0.10 | 0.00 |  |
| 129 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 130 | Viego | +0.09 | 0.09 | 0.00 |  |
| 131 | Irelia | +0.05 | 0.05 | 0.00 |  |
| 132 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 133 | Akali | 0.00 | 0.00 | 0.00 |  |
| 134 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 135 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 136 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 137 | Briar | 0.00 | 0.00 | 0.00 |  |
| 138 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 139 | Darius | 0.00 | 0.00 | 0.00 |  |
| 140 | Diana | 0.00 | 0.00 | 0.00 |  |
| 141 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 142 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 143 | Galio | 0.00 | 0.00 | 0.00 |  |
| 144 | Gragas | 0.00 | 0.00 | 0.00 |  |
| 145 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 146 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 147 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 148 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 149 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 150 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 151 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 152 | Leona | 0.00 | 0.00 | 0.00 |  |
| 153 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 154 | Naafiri | 0.00 | 0.00 | 0.00 |  |
| 155 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 156 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 157 | Pyke | 0.00 | 0.00 | 0.00 |  |
| 158 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 159 | Rell | 0.00 | 0.00 | 0.00 |  |
| 160 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 161 | Riven | 0.00 | 0.00 | 0.00 |  |
| 162 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 163 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 164 | Sett | 0.00 | 0.00 | 0.00 |  |
| 165 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 166 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 167 | Tahm Kench | 0.00 | 0.00 | 0.00 |  |
| 168 | Talon | 0.00 | 0.00 | 0.00 |  |
| 169 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 170 | Vi | 0.00 | 0.00 | 0.00 |  |
| 171 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 172 | Yorick | 0.00 | 0.00 | 0.00 |  |
