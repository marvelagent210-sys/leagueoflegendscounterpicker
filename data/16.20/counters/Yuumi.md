# Counters to Yuumi (patch 26.20)

Every champion ranked by what its kit does against Yuumi's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Yuumi's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Yuumi` for the full ledger of a matchup, with sources.

## Top 10

### 1. Braum (net +0.64)

- **0.60** projectile block: Unbreakable blocks Yuumi's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Yuumi basic attacks)
- **0.55** projectile block: Unbreakable blocks Yuumi's Final Chapter, a projectile. Unbreakable for 4 s, long enough to use ahead of Final Chapter. (Braum E Unbreakable → Yuumi R Final Chapter)
- **0.40** projectile block: Unbreakable blocks Yuumi's Prowling Projectile, a projectile. Unbreakable for 4 s, long enough to use ahead of Prowling Projectile. (Braum E Unbreakable → Yuumi Q Prowling Projectile)
- Watch out: You and Me! makes Yuumi untargetable, dodging Braum's Glacial Fissure.

### 2. Sivir (net +0.37)

- **0.28** spell shield: Spell Shield's spell shield blocks part of Yuumi's Final Chapter. Spell shield for 1.5 s, long enough to use ahead of Final Chapter. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block a single instance of damage. (Sivir E Spell Shield → Yuumi R Final Chapter)
- **0.09** range: Sivir's basic attacks reach 75 units farther than Yuumi's (500 vs 425 attack range). Yuumi closes the gap with You and Me!. (Sivir basic attacks → Yuumi basic attacks)

### 3. Lulu (net +0.31)

- **0.40** disarm: Whimsy disarms Yuumi for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Yuumi basic attacks)
- **0.28** interrupt: Whimsy's polymorph interrupts Yuumi's Final Chapter (normal channel). Whimsy must land during the channel. (Lulu W Whimsy → Yuumi R Final Chapter)
- **0.28** interrupt: Wild Growth's airborne interrupts Yuumi's Final Chapter (normal channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Yuumi R Final Chapter)
- Watch out: You and Me! makes Yuumi untargetable, dodging Lulu's Wild Growth.

### 4. Aurora (net +0.22)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Yuumi's Final Chapter. Untargetable for 0.4 s; Final Chapter takes 0.37 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Yuumi R Final Chapter)
- **0.09** range: Aurora's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range). Yuumi closes the gap with You and Me!. (Aurora basic attacks → Yuumi basic attacks)
- Watch out: You and Me! makes Yuumi untargetable, dodging Aurora's Between Worlds.

### 5. Kayle (net +0.19)

- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Yuumi's Final Chapter (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Final Chapter. (Kayle R Divine Judgment → Yuumi R Final Chapter)
- **0.18** range: Kayle's basic attacks reach 200 units farther than Yuumi's (625 vs 425 attack range). Yuumi closes the gap with You and Me!. (Kayle basic attacks → Yuumi basic attacks)
- Watch out: You and Me! makes Yuumi untargetable, dodging Kayle's Starfire Spellblade.

### 6. Rell (net +0.14)

- **0.28** interrupt: Ferromancy: Crash Down's airborne interrupts Yuumi's Final Chapter (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Yuumi R Final Chapter)
- **0.28** interrupt: Ferromancy: Mount Up's airborne interrupts Yuumi's Final Chapter (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Yuumi R Final Chapter)
- **0.28** interrupt: Full Tilt's stun interrupts Yuumi's Final Chapter (normal channel). Full Tilt must land during the channel. (Rell E Full Tilt → Yuumi R Final Chapter)
- Watch out: You and Me! makes Yuumi untargetable, dodging Rell's Ferromancy: Crash Down.

### 7. Yunara (net +0.14)

- **0.14** range: Yunara's basic attacks reach 150 units farther than Yuumi's (575 vs 425 attack range). Yuumi closes the gap with You and Me!. (Yunara basic attacks → Yuumi basic attacks)

### 8. Malzahar (net +0.13)

- **0.28** interrupt: Call of the Void's silence interrupts Yuumi's Final Chapter (normal channel). Call of the Void must land during the channel. (Malzahar Q Call of the Void → Yuumi R Final Chapter)
- **0.28** interrupt: Nether Grasp's suppression interrupts Yuumi's Final Chapter (normal channel). Nether Grasp must land during the channel. (Malzahar R Nether Grasp → Yuumi R Final Chapter)
- **0.23** interrupt: Call of the Void's silence interrupts Yuumi's Prowling Projectile (normal channel). Call of the Void must land during the channel. (Malzahar Q Call of the Void → Yuumi Q Prowling Projectile)
- Watch out: You and Me! makes Yuumi untargetable, dodging Malzahar's Nether Grasp.

### 9. Twitch (net +0.13)

- **0.13** range: Twitch's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range). Yuumi closes the gap with You and Me!. (Twitch basic attacks → Yuumi basic attacks)

### 10. Twisted Fate (net +0.12)

- **0.28** interrupt: Pick a Card's stun interrupts Yuumi's Final Chapter (normal channel). Pick a Card must land during the channel. (Twisted Fate W Pick a Card → Yuumi R Final Chapter)
- **0.23** interrupt: Pick a Card's stun interrupts Yuumi's Prowling Projectile (normal channel). Pick a Card must land during the channel. (Twisted Fate W Pick a Card → Yuumi Q Prowling Projectile)
- **0.14** interrupt: Pick a Card's stun interrupts Yuumi's You and Me! (movement channel). Pick a Card must land during the channel. (Twisted Fate W Pick a Card → Yuumi W You and Me!)
- Watch out: You and Me! makes Yuumi untargetable, dodging Twisted Fate's Pick a Card.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Braum | +0.64 | 1.76 | 1.12 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 2 | Sivir | +0.37 | 0.37 | 0.00 |  |
| 3 | Lulu | +0.31 | 1.08 | 0.77 | disarm (Whimsy) |
| 4 | Aurora | +0.22 | 0.64 | 0.42 |  |
| 5 | Kayle | +0.19 | 0.46 | 0.27 |  |
| 6 | Rell | +0.14 | 2.00 | 1.86 |  |
| 7 | Yunara | +0.14 | 0.14 | 0.00 |  |
| 8 | Malzahar | +0.13 | 0.95 | 0.82 |  |
| 9 | Twitch | +0.13 | 0.13 | 0.00 |  |
| 10 | Twisted Fate | +0.12 | 0.54 | 0.42 |  |
| 11 | Kai'Sa | +0.10 | 0.10 | 0.00 |  |
| 12 | Samira | +0.09 | 0.86 | 0.77 | projectile block (Blade Whirl) |
| 13 | Xayah | +0.06 | 0.65 | 0.59 |  |
| 14 | Yasuo | +0.04 | 1.67 | 1.63 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 15 | Zilean | +0.03 | 0.52 | 0.49 |  |
| 16 | Master Yi | -0.04 | 0.71 | 0.75 |  |
| 17 | Kayn | -0.05 | 0.96 | 1.01 |  |
| 18 | Milio | -0.07 | 0.63 | 0.70 |  |
| 19 | Vladimir | -0.07 | 0.55 | 0.62 |  |
| 20 | Heimerdinger | -0.10 | 0.95 | 1.05 |  |
| 21 | Mel | -0.11 | 0.87 | 0.98 | projectile block (Rebuttal) |
| 22 | Bard | -0.11 | 0.81 | 0.92 |  |
| 23 | Teemo | -0.14 | 0.64 | 0.78 | blind (Blinding Dart) |
| 24 | Quinn | -0.16 | 0.52 | 0.68 |  |
| 25 | Janna | -0.17 | 0.88 | 1.05 |  |
| 26 | Lissandra | -0.20 | 0.81 | 1.01 |  |
| 27 | Zed | -0.20 | 0.55 | 0.75 |  |
| 28 | Zoe | -0.21 | 0.49 | 0.70 |  |
| 29 | Soraka | -0.23 | 0.47 | 0.70 |  |
| 30 | Vex | -0.23 | 0.47 | 0.70 |  |
| 31 | Viktor | -0.24 | 0.85 | 1.09 |  |
| 32 | Fiddlesticks | -0.24 | 0.83 | 1.07 |  |
| 33 | Taliyah | -0.26 | 1.22 | 1.48 |  |
| 34 | Aurelion Sol | -0.26 | 0.85 | 1.11 |  |
| 35 | Ashe | -0.26 | 0.54 | 0.80 |  |
| 36 | Gnar | -0.27 | 0.88 | 1.15 |  |
| 37 | Tryndamere | -0.27 | 0.00 | 0.27 |  |
| 38 | Kalista | -0.28 | 0.44 | 0.72 |  |
| 39 | Renata Glasc | -0.29 | 0.86 | 1.15 |  |
| 40 | Tristana | -0.29 | 0.63 | 0.92 |  |
| 41 | Fiora | -0.29 | 0.60 | 0.89 |  |
| 42 | Singed | -0.30 | 1.27 | 1.57 |  |
| 43 | Gwen | -0.30 | 0.55 | 0.85 |  |
| 44 | Shaco | -0.32 | 0.94 | 1.26 |  |
| 45 | Fizz | -0.32 | 0.93 | 1.25 |  |
| 46 | Anivia | -0.33 | 0.91 | 1.24 |  |
| 47 | Seraphine | -0.33 | 0.82 | 1.15 |  |
| 48 | Kennen | -0.33 | 0.50 | 0.83 |  |
| 49 | Camille | -0.36 | 1.14 | 1.50 |  |
| 50 | Warwick | -0.36 | 0.80 | 1.16 |  |
| 51 | Varus | -0.36 | 0.44 | 0.80 |  |
| 52 | Kindred | -0.36 | 0.09 | 0.45 |  |
| 53 | Vel'Koz | -0.39 | 0.48 | 0.87 |  |
| 54 | Nami | -0.40 | 0.86 | 1.26 |  |
| 55 | Sion | -0.40 | 0.83 | 1.23 |  |
| 56 | Xerath | -0.40 | 0.47 | 0.87 |  |
| 57 | Cassiopeia | -0.41 | 0.78 | 1.19 |  |
| 58 | Zeri | -0.41 | 0.14 | 0.55 |  |
| 59 | Nidalee | -0.42 | 0.08 | 0.50 |  |
| 60 | Rammus | -0.43 | 1.25 | 1.68 | attack reflect (Defensive Ball Curl) |
| 61 | Sona | -0.43 | 0.51 | 0.94 |  |
| 62 | Tahm Kench | -0.44 | 1.21 | 1.65 |  |
| 63 | Corki | -0.45 | 0.10 | 0.55 |  |
| 64 | Sylas | -0.46 | 0.41 | 0.87 |  |
| 65 | Blitzcrank | -0.47 | 1.20 | 1.67 |  |
| 66 | Galio | -0.47 | 1.14 | 1.61 |  |
| 67 | Nilah | -0.47 | 0.78 | 1.25 | attack dodge (Jubilant Veil) |
| 68 | Annie | -0.48 | 0.52 | 1.00 |  |
| 69 | Jayce | -0.48 | 0.47 | 0.95 |  |
| 70 | Akshan | -0.48 | 0.07 | 0.55 |  |
| 71 | Rek'Sai | -0.49 | 0.98 | 1.47 |  |
| 72 | Shen | -0.51 | 0.84 | 1.35 | attack block (Spirit's Refuge) |
| 73 | Thresh | -0.52 | 0.82 | 1.34 |  |
| 74 | Vayne | -0.52 | 0.53 | 1.05 |  |
| 75 | Veigar | -0.52 | 0.46 | 0.98 |  |
| 76 | Riven | -0.53 | 0.82 | 1.35 |  |
| 77 | Draven | -0.53 | 0.51 | 1.04 |  |
| 78 | Azir | -0.53 | 0.45 | 0.98 |  |
| 79 | Zaahen | -0.55 | 0.99 | 1.54 |  |
| 80 | Lillia | -0.55 | 0.36 | 0.91 |  |
| 81 | Karthus | -0.55 | 0.00 | 0.55 |  |
| 82 | Urgot | -0.56 | 0.77 | 1.33 |  |
| 83 | Ahri | -0.58 | 0.47 | 1.05 |  |
| 84 | Syndra | -0.58 | 0.46 | 1.04 |  |
| 85 | Orianna | -0.58 | 0.45 | 1.03 |  |
| 86 | Brand | -0.59 | 0.50 | 1.09 |  |
| 87 | Wukong | -0.59 | 0.38 | 0.97 |  |
| 88 | Elise | -0.60 | 0.51 | 1.11 |  |
| 89 | Katarina | -0.60 | 0.34 | 0.94 |  |
| 90 | Kog'Maw | -0.60 | 0.05 | 0.65 |  |
| 91 | Sett | -0.61 | 0.78 | 1.39 |  |
| 92 | Taric | -0.61 | 0.40 | 1.01 |  |
| 93 | Miss Fortune | -0.62 | 0.10 | 0.72 |  |
| 94 | Lee Sin | -0.63 | 0.38 | 1.01 |  |
| 95 | LeBlanc | -0.63 | 0.05 | 0.68 |  |
| 96 | K'Sante | -0.64 | 1.21 | 1.85 |  |
| 97 | Alistar | -0.64 | 0.94 | 1.58 |  |
| 98 | Kled | -0.64 | 0.80 | 1.44 |  |
| 99 | Udyr | -0.64 | 0.45 | 1.09 |  |
| 100 | Zac | -0.65 | 1.20 | 1.85 |  |
| 101 | Ziggs | -0.65 | 0.48 | 1.13 |  |
| 102 | Swain | -0.65 | 0.46 | 1.11 |  |
| 103 | Renekton | -0.66 | 0.42 | 1.08 |  |
| 104 | Xin Zhao | -0.68 | 0.90 | 1.58 |  |
| 105 | Zyra | -0.68 | 0.47 | 1.15 |  |
| 106 | Pantheon | -0.68 | 0.28 | 0.96 |  |
| 107 | Ezreal | -0.68 | 0.10 | 0.78 |  |
| 108 | Jinx | -0.69 | 0.07 | 0.76 |  |
| 109 | Sejuani | -0.70 | 1.20 | 1.90 |  |
| 110 | Neeko | -0.70 | 0.45 | 1.15 |  |
| 111 | Graves | -0.70 | 0.00 | 0.70 |  |
| 112 | Rakan | -0.71 | 0.78 | 1.49 |  |
| 113 | Lucian | -0.71 | 0.07 | 0.78 |  |
| 114 | Yorick | -0.73 | 0.40 | 1.13 |  |
| 115 | Smolder | -0.73 | 0.10 | 0.83 |  |
| 116 | Nocturne | -0.75 | 0.68 | 1.43 |  |
| 117 | Aatrox | -0.76 | 0.43 | 1.19 |  |
| 118 | Vi | -0.77 | 0.81 | 1.58 |  |
| 119 | Pyke | -0.78 | 0.82 | 1.60 |  |
| 120 | Hwei | -0.78 | 0.48 | 1.26 |  |
| 121 | Caitlyn | -0.78 | 0.20 | 0.98 |  |
| 122 | Evelynn | -0.79 | 0.95 | 1.74 |  |
| 123 | Garen | -0.79 | 0.49 | 1.28 |  |
| 124 | Morgana | -0.80 | 0.18 | 0.98 |  |
| 125 | Yone | -0.82 | 0.81 | 1.63 |  |
| 126 | Viego | -0.83 | 0.79 | 1.62 |  |
| 127 | Nasus | -0.83 | 0.43 | 1.26 | attack speed slow (Wither) |
| 128 | Ambessa | -0.83 | 0.38 | 1.21 |  |
| 129 | Diana | -0.84 | 0.38 | 1.22 |  |
| 130 | Jax | -0.87 | 0.67 | 1.54 | attack dodge (Counter Strike) |
| 131 | Karma | -0.88 | 0.05 | 0.93 |  |
| 132 | Lux | -0.89 | 0.09 | 0.98 |  |
| 133 | Irelia | -0.91 | 0.41 | 1.32 |  |
| 134 | Ryze | -0.91 | 0.07 | 0.98 |  |
| 135 | Dr. Mundo | -0.91 | 0.00 | 0.91 |  |
| 136 | Maokai | -0.92 | 0.98 | 1.90 |  |
| 137 | Olaf | -0.92 | 0.17 | 1.09 |  |
| 138 | Amumu | -0.95 | 0.77 | 1.72 |  |
| 139 | Malphite | -0.95 | 0.66 | 1.61 |  |
| 140 | Ornn | -0.96 | 0.80 | 1.76 |  |
| 141 | Cho'Gath | -0.97 | 0.84 | 1.81 |  |
| 142 | Senna | -0.99 | 0.14 | 1.13 |  |
| 143 | Ivern | -0.99 | 0.00 | 0.99 |  |
| 144 | Mordekaiser | -1.00 | 0.52 | 1.52 |  |
| 145 | Aphelios | -1.01 | 0.21 | 1.22 |  |
| 146 | Leona | -1.02 | 0.81 | 1.83 |  |
| 147 | Gragas | -1.02 | 0.77 | 1.79 |  |
| 148 | Shyvana | -1.03 | 0.41 | 1.44 |  |
| 149 | Hecarim | -1.04 | 0.38 | 1.42 |  |
| 150 | Skarner | -1.05 | 0.48 | 1.53 |  |
| 151 | Jhin | -1.05 | 0.08 | 1.13 |  |
| 152 | Naafiri | -1.06 | 0.00 | 1.06 |  |
| 153 | Nautilus | -1.09 | 0.38 | 1.47 |  |
| 154 | Volibear | -1.10 | 0.41 | 1.51 |  |
| 155 | Kha'Zix | -1.10 | 0.00 | 1.10 |  |
| 156 | Akali | -1.11 | 0.00 | 1.11 |  |
| 157 | Bel'Veth | -1.13 | 0.42 | 1.55 |  |
| 158 | Poppy | -1.14 | 0.38 | 1.52 |  |
| 159 | Illaoi | -1.14 | 0.00 | 1.14 |  |
| 160 | Jarvan IV | -1.15 | 0.38 | 1.53 |  |
| 161 | Kassadin | -1.16 | 0.43 | 1.59 |  |
| 162 | Talon | -1.18 | 0.00 | 1.18 |  |
| 163 | Darius | -1.19 | 0.39 | 1.58 |  |
| 164 | Rumble | -1.19 | 0.00 | 1.19 |  |
| 165 | Trundle | -1.21 | 0.39 | 1.60 |  |
| 166 | Qiyana | -1.23 | 0.35 | 1.58 |  |
| 167 | Briar | -1.28 | 0.38 | 1.66 |  |
| 168 | Gangplank | -1.28 | 0.14 | 1.42 |  |
| 169 | Rengar | -1.36 | 0.15 | 1.51 |  |
| 170 | Locke | -1.40 | 0.00 | 1.40 |  |
| 171 | Nunu & Willump | -1.43 | 0.41 | 1.84 |  |
| 172 | Ekko | -1.46 | 0.00 | 1.46 |  |
