# Counters to Yuumi (patch 26.20)

Every champion ranked by what its kit does against Yuumi's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Yuumi's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Yuumi` for the full ledger of a matchup, with sources.

## Top 10

### 1. Kayle (net +0.46)

- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Yuumi's Final Chapter (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Final Chapter. (Kayle R Divine Judgment → Yuumi R Final Chapter)
- **0.18** range: Kayle's basic attacks reach 200 units farther than Yuumi's (625 vs 425 attack range). Yuumi closes the gap with You and Me!. (Kayle basic attacks → Yuumi basic attacks)

### 2. Sivir (net +0.37)

- **0.28** spell shield: Spell Shield's spell shield blocks part of Yuumi's Final Chapter. Spell shield for 1.5 s, long enough to use ahead of Final Chapter. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block a single instance of damage. (Sivir E Spell Shield → Yuumi R Final Chapter)
- **0.09** range: Sivir's basic attacks reach 75 units farther than Yuumi's (500 vs 425 attack range). Yuumi closes the gap with You and Me!. (Sivir basic attacks → Yuumi basic attacks)

### 3. Braum (net +0.26)

- **0.60** projectile block: Unbreakable blocks Yuumi's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Yuumi basic attacks)
- **0.55** projectile block: Unbreakable blocks Yuumi's Final Chapter, a projectile. Unbreakable for 4 s, long enough to use ahead of Final Chapter. (Braum E Unbreakable → Yuumi R Final Chapter)
- **0.40** projectile block: Unbreakable blocks Yuumi's Prowling Projectile, a projectile. Unbreakable for 4 s, long enough to use ahead of Prowling Projectile. (Braum E Unbreakable → Yuumi Q Prowling Projectile)
- Watch out: You and Me! makes Yuumi untargetable, dodging Braum's Glacial Fissure.

### 4. Aurora (net +0.22)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Yuumi's Final Chapter. Untargetable for 0.4 s; Final Chapter takes 0.37 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Yuumi R Final Chapter)
- **0.09** range: Aurora's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range). Yuumi closes the gap with You and Me!. (Aurora basic attacks → Yuumi basic attacks)
- Watch out: You and Me! makes Yuumi untargetable, dodging Aurora's Between Worlds.

### 5. Yunara (net +0.14)

- **0.14** range: Yunara's basic attacks reach 150 units farther than Yuumi's (575 vs 425 attack range). Yuumi closes the gap with You and Me!. (Yunara basic attacks → Yuumi basic attacks)

### 6. Twitch (net +0.13)

- **0.13** range: Twitch's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range). Yuumi closes the gap with You and Me!. (Twitch basic attacks → Yuumi basic attacks)

### 7. Lulu (net +0.12)

- **0.40** disarm: Whimsy disarms Yuumi for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Yuumi basic attacks)
- **0.28** interrupt: Wild Growth's airborne interrupts Yuumi's Final Chapter (normal channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Yuumi R Final Chapter)
- **0.14** interrupt: Wild Growth's airborne interrupts Yuumi's You and Me! (movement channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Yuumi W You and Me!)
- Watch out: You and Me! makes Yuumi untargetable, dodging Lulu's Wild Growth.

### 8. Twisted Fate (net +0.12)

- **0.28** interrupt: Pick a Card's stun interrupts Yuumi's Final Chapter (normal channel). Pick a Card must land during the channel. (Twisted Fate W Pick a Card → Yuumi R Final Chapter)
- **0.23** interrupt: Pick a Card's stun interrupts Yuumi's Prowling Projectile (normal channel). Pick a Card must land during the channel. (Twisted Fate W Pick a Card → Yuumi Q Prowling Projectile)
- **0.14** interrupt: Pick a Card's stun interrupts Yuumi's You and Me! (movement channel). Pick a Card must land during the channel. (Twisted Fate W Pick a Card → Yuumi W You and Me!)
- Watch out: You and Me! makes Yuumi untargetable, dodging Twisted Fate's Pick a Card.

### 9. Kai'Sa (net +0.10)

- **0.10** range: Kai'Sa's basic attacks reach 100 units farther than Yuumi's (525 vs 425 attack range). Yuumi closes the gap with You and Me!. (Kai'Sa basic attacks → Yuumi basic attacks)

### 10. Samira (net +0.09)

- **0.55** projectile block: Blade Whirl blocks Yuumi's Final Chapter, a projectile. Blade Whirl for 0.75 s; Final Chapter takes 0.37 s to land, enough to react. (Samira W Blade Whirl → Yuumi R Final Chapter)
- **0.36** projectile block: Blade Whirl blocks Yuumi's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Yuumi basic attacks)
- **0.26** projectile block: Blade Whirl blocks Yuumi's Prowling Projectile, a projectile. Blade Whirl for 0.75 s; Prowling Projectile takes 0.89 s to land, enough to react. (Samira W Blade Whirl → Yuumi Q Prowling Projectile)
- Watch out: You and Me! makes Yuumi untargetable, dodging Samira's Wild Rush.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kayle | +0.46 | 0.46 | 0.00 |  |
| 2 | Sivir | +0.37 | 0.37 | 0.00 |  |
| 3 | Braum | +0.26 | 1.38 | 1.12 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Aurora | +0.22 | 0.64 | 0.42 |  |
| 5 | Yunara | +0.14 | 0.14 | 0.00 |  |
| 6 | Twitch | +0.13 | 0.13 | 0.00 |  |
| 7 | Lulu | +0.12 | 0.89 | 0.77 | disarm (Whimsy) |
| 8 | Twisted Fate | +0.12 | 0.54 | 0.42 |  |
| 9 | Kai'Sa | +0.10 | 0.10 | 0.00 |  |
| 10 | Samira | +0.09 | 0.86 | 0.77 | projectile block (Blade Whirl) |
| 11 | Xayah | +0.06 | 0.65 | 0.59 |  |
| 12 | Master Yi | -0.04 | 0.71 | 0.75 |  |
| 13 | Elise | -0.05 | 1.06 | 1.11 |  |
| 14 | Milio | -0.07 | 0.63 | 0.70 |  |
| 15 | Vladimir | -0.07 | 0.55 | 0.62 |  |
| 16 | Mel | -0.11 | 0.87 | 0.98 | projectile block (Rebuttal) |
| 17 | Kindred | -0.11 | 0.34 | 0.45 |  |
| 18 | Teemo | -0.14 | 0.64 | 0.78 | blind (Blinding Dart) |
| 19 | Fiora | -0.15 | 0.60 | 0.75 |  |
| 20 | Quinn | -0.16 | 0.52 | 0.68 |  |
| 21 | Vayne | -0.17 | 0.53 | 0.70 |  |
| 22 | Kayn | -0.19 | 0.96 | 1.15 |  |
| 23 | Shaco | -0.20 | 0.94 | 1.14 |  |
| 24 | Lissandra | -0.20 | 0.81 | 1.01 |  |
| 25 | Zed | -0.20 | 0.55 | 0.75 |  |
| 26 | Zoe | -0.21 | 0.49 | 0.70 |  |
| 27 | Bard | -0.22 | 0.81 | 1.03 |  |
| 28 | Soraka | -0.23 | 0.47 | 0.70 |  |
| 29 | Vex | -0.23 | 0.47 | 0.70 |  |
| 30 | Malzahar | -0.25 | 0.57 | 0.82 |  |
| 31 | Ashe | -0.26 | 0.54 | 0.80 |  |
| 32 | Tryndamere | -0.27 | 0.00 | 0.27 |  |
| 33 | Kalista | -0.28 | 0.44 | 0.72 |  |
| 34 | Nidalee | -0.28 | 0.08 | 0.36 |  |
| 35 | Sona | -0.29 | 0.51 | 0.80 |  |
| 36 | Singed | -0.30 | 1.27 | 1.57 |  |
| 37 | Gwen | -0.30 | 0.55 | 0.85 |  |
| 38 | Zilean | -0.32 | 0.52 | 0.84 |  |
| 39 | Kennen | -0.33 | 0.50 | 0.83 |  |
| 40 | Yasuo | -0.34 | 1.29 | 1.63 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 41 | Taric | -0.36 | 0.65 | 1.01 |  |
| 42 | Varus | -0.36 | 0.44 | 0.80 |  |
| 43 | Shen | -0.37 | 0.84 | 1.21 | attack block (Spirit's Refuge) |
| 44 | Vel'Koz | -0.39 | 0.48 | 0.87 |  |
| 45 | Tristana | -0.40 | 0.63 | 1.03 |  |
| 46 | Xerath | -0.40 | 0.47 | 0.87 |  |
| 47 | Cassiopeia | -0.41 | 0.78 | 1.19 |  |
| 48 | Jayce | -0.41 | 0.47 | 0.88 |  |
| 49 | Zeri | -0.41 | 0.14 | 0.55 |  |
| 50 | Rek'Sai | -0.45 | 0.98 | 1.43 |  |
| 51 | Ezreal | -0.45 | 0.10 | 0.55 |  |
| 52 | Nilah | -0.47 | 0.78 | 1.25 | attack dodge (Jubilant Veil) |
| 53 | Draven | -0.47 | 0.51 | 0.98 |  |
| 54 | Annie | -0.48 | 0.52 | 1.00 |  |
| 55 | Corki | -0.48 | 0.50 | 0.98 |  |
| 56 | Akshan | -0.48 | 0.07 | 0.55 |  |
| 57 | Camille | -0.50 | 0.96 | 1.46 |  |
| 58 | Heimerdinger | -0.50 | 0.55 | 1.05 |  |
| 59 | Veigar | -0.52 | 0.46 | 0.98 |  |
| 60 | Wukong | -0.52 | 0.38 | 0.90 |  |
| 61 | Azir | -0.53 | 0.45 | 0.98 |  |
| 62 | Janna | -0.55 | 0.50 | 1.05 |  |
| 63 | Lillia | -0.55 | 0.36 | 0.91 |  |
| 64 | Karthus | -0.55 | 0.00 | 0.55 |  |
| 65 | Yorick | -0.56 | 0.40 | 0.96 |  |
| 66 | Ahri | -0.58 | 0.47 | 1.05 |  |
| 67 | Syndra | -0.58 | 0.46 | 1.04 |  |
| 68 | Orianna | -0.58 | 0.45 | 1.03 |  |
| 69 | Warwick | -0.59 | 0.57 | 1.16 |  |
| 70 | Brand | -0.59 | 0.50 | 1.09 |  |
| 71 | Katarina | -0.60 | 0.34 | 0.94 |  |
| 72 | Kog'Maw | -0.60 | 0.05 | 0.65 |  |
| 73 | Miss Fortune | -0.62 | 0.10 | 0.72 |  |
| 74 | Sion | -0.63 | 0.60 | 1.23 |  |
| 75 | Viktor | -0.63 | 0.46 | 1.09 |  |
| 76 | Lee Sin | -0.63 | 0.38 | 1.01 |  |
| 77 | LeBlanc | -0.63 | 0.05 | 0.68 |  |
| 78 | Renata Glasc | -0.64 | 0.51 | 1.15 |  |
| 79 | Udyr | -0.64 | 0.45 | 1.09 |  |
| 80 | Fiddlesticks | -0.64 | 0.43 | 1.07 |  |
| 81 | Dr. Mundo | -0.64 | 0.00 | 0.64 |  |
| 82 | Ziggs | -0.65 | 0.48 | 1.13 |  |
| 83 | Swain | -0.65 | 0.46 | 1.11 |  |
| 84 | Aurelion Sol | -0.66 | 0.45 | 1.11 |  |
| 85 | Nasus | -0.66 | 0.43 | 1.09 | attack speed slow (Wither) |
| 86 | Renekton | -0.66 | 0.42 | 1.08 |  |
| 87 | Seraphine | -0.68 | 0.47 | 1.15 |  |
| 88 | Zyra | -0.68 | 0.47 | 1.15 |  |
| 89 | Pantheon | -0.68 | 0.28 | 0.96 |  |
| 90 | Jinx | -0.69 | 0.07 | 0.76 |  |
| 91 | Gnar | -0.70 | 0.45 | 1.15 |  |
| 92 | Neeko | -0.70 | 0.45 | 1.15 |  |
| 93 | Graves | -0.70 | 0.00 | 0.70 |  |
| 94 | Anivia | -0.71 | 0.53 | 1.24 |  |
| 95 | Lucian | -0.71 | 0.07 | 0.78 |  |
| 96 | Smolder | -0.73 | 0.10 | 0.83 |  |
| 97 | Nocturne | -0.75 | 0.68 | 1.43 |  |
| 98 | Hwei | -0.76 | 0.48 | 1.24 |  |
| 99 | Aatrox | -0.76 | 0.43 | 1.19 |  |
| 100 | Nami | -0.77 | 0.49 | 1.26 |  |
| 101 | Caitlyn | -0.78 | 0.20 | 0.98 |  |
| 102 | Evelynn | -0.79 | 0.95 | 1.74 |  |
| 103 | Ekko | -0.79 | 0.55 | 1.34 |  |
| 104 | Fizz | -0.79 | 0.38 | 1.17 |  |
| 105 | Hecarim | -0.80 | 0.38 | 1.18 |  |
| 106 | Morgana | -0.80 | 0.18 | 0.98 |  |
| 107 | Garen | -0.82 | 0.49 | 1.31 |  |
| 108 | Jax | -0.83 | 0.67 | 1.50 | attack dodge (Counter Strike) |
| 109 | Ambessa | -0.83 | 0.38 | 1.21 |  |
| 110 | Rammus | -0.85 | 0.83 | 1.68 | attack reflect (Defensive Ball Curl) |
| 111 | Kled | -0.86 | 0.58 | 1.44 |  |
| 112 | Xin Zhao | -0.87 | 0.71 | 1.58 |  |
| 113 | Illaoi | -0.87 | 0.00 | 0.87 |  |
| 114 | Locke | -0.87 | 0.00 | 0.87 |  |
| 115 | Karma | -0.88 | 0.05 | 0.93 |  |
| 116 | Malphite | -0.89 | 0.66 | 1.55 |  |
| 117 | Shyvana | -0.89 | 0.41 | 1.30 |  |
| 118 | Lux | -0.89 | 0.09 | 0.98 |  |
| 119 | Sett | -0.91 | 0.41 | 1.32 |  |
| 120 | Ryze | -0.91 | 0.07 | 0.98 |  |
| 121 | Maokai | -0.92 | 0.98 | 1.90 |  |
| 122 | Olaf | -0.92 | 0.17 | 1.09 |  |
| 123 | Thresh | -0.93 | 0.41 | 1.34 |  |
| 124 | Zaahen | -0.94 | 0.60 | 1.54 |  |
| 125 | Urgot | -0.94 | 0.39 | 1.33 |  |
| 126 | Aphelios | -0.94 | 0.21 | 1.15 |  |
| 127 | Riven | -0.95 | 0.40 | 1.35 |  |
| 128 | Sylas | -0.96 | 0.41 | 1.37 |  |
| 129 | Diana | -0.96 | 0.38 | 1.34 |  |
| 130 | Senna | -0.99 | 0.14 | 1.13 |  |
| 131 | Ivern | -0.99 | 0.00 | 0.99 |  |
| 132 | Mordekaiser | -1.00 | 0.52 | 1.52 |  |
| 133 | Taliyah | -1.02 | 0.46 | 1.48 |  |
| 134 | Alistar | -1.04 | 0.54 | 1.58 |  |
| 135 | Skarner | -1.05 | 0.48 | 1.53 |  |
| 136 | Jhin | -1.05 | 0.08 | 1.13 |  |
| 137 | Naafiri | -1.06 | 0.00 | 1.06 |  |
| 138 | Vi | -1.08 | 0.43 | 1.51 |  |
| 139 | Nautilus | -1.09 | 0.38 | 1.47 |  |
| 140 | Kassadin | -1.10 | 0.43 | 1.53 |  |
| 141 | Volibear | -1.10 | 0.41 | 1.51 |  |
| 142 | Kha'Zix | -1.10 | 0.00 | 1.10 |  |
| 143 | Rakan | -1.11 | 0.38 | 1.49 |  |
| 144 | Akali | -1.11 | 0.00 | 1.11 |  |
| 145 | Irelia | -1.12 | 0.41 | 1.53 |  |
| 146 | Bel'Veth | -1.13 | 0.42 | 1.55 |  |
| 147 | Darius | -1.13 | 0.39 | 1.52 |  |
| 148 | Trundle | -1.13 | 0.39 | 1.52 |  |
| 149 | Poppy | -1.14 | 0.38 | 1.52 |  |
| 150 | Jarvan IV | -1.15 | 0.38 | 1.53 |  |
| 151 | Galio | -1.18 | 0.43 | 1.61 |  |
| 152 | Talon | -1.18 | 0.00 | 1.18 |  |
| 153 | Rumble | -1.19 | 0.00 | 1.19 |  |
| 154 | Yone | -1.20 | 0.43 | 1.63 |  |
| 155 | Pyke | -1.20 | 0.40 | 1.60 |  |
| 156 | Tahm Kench | -1.22 | 0.43 | 1.65 |  |
| 157 | Qiyana | -1.23 | 0.35 | 1.58 |  |
| 158 | Viego | -1.24 | 0.38 | 1.62 |  |
| 159 | Briar | -1.25 | 0.38 | 1.63 |  |
| 160 | Gangplank | -1.28 | 0.14 | 1.42 |  |
| 161 | Blitzcrank | -1.29 | 0.43 | 1.72 |  |
| 162 | Cho'Gath | -1.30 | 0.43 | 1.73 |  |
| 163 | Amumu | -1.32 | 0.40 | 1.72 |  |
| 164 | Gragas | -1.32 | 0.40 | 1.72 |  |
| 165 | Ornn | -1.33 | 0.43 | 1.76 |  |
| 166 | Rengar | -1.36 | 0.15 | 1.51 |  |
| 167 | Leona | -1.40 | 0.43 | 1.83 |  |
| 168 | K'Sante | -1.42 | 0.43 | 1.85 |  |
| 169 | Nunu & Willump | -1.43 | 0.41 | 1.84 |  |
| 170 | Zac | -1.44 | 0.41 | 1.85 |  |
| 171 | Rell | -1.45 | 0.41 | 1.86 |  |
| 172 | Sejuani | -1.47 | 0.43 | 1.90 |  |
