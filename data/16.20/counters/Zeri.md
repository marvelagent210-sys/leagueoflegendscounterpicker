# Counters to Zeri (patch 26.20)

Every champion ranked by what its kit does against Zeri's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zeri's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zeri` for the full ledger of a matchup, with sources.

## Top 10

### 1. Lissandra (net +0.59)

- **0.51** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Zeri's Lightning Crash. Untargetable for 2.5 s, long enough to use ahead of Lightning Crash. (Lissandra R Frozen Tomb → Zeri R Lightning Crash)
- **0.16** dash stop: Frozen Tomb's knockdown can stop Zeri's Spark Surge mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Zeri E Spark Surge)

### 2. Kayle (net +0.58)

- **0.51** invulnerable: Divine Judgment makes Kayle invulnerable to Zeri's Lightning Crash. Invulnerable for 2.5 s, long enough to use ahead of Lightning Crash. (Kayle R Divine Judgment → Zeri R Lightning Crash)
- **0.07** range: Kayle's basic attacks reach 75 units farther than Zeri's (625 vs 550 attack range). Zeri closes the gap with Spark Surge. (Kayle basic attacks → Zeri basic attacks)

### 3. Teemo (net +0.58)

- **0.58** blind: Blinding Dart's blind makes Zeri's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Zeri basic attacks)

### 4. Shen (net +0.57)

- **0.60** attack block: Spirit's Refuge blocks Zeri's Spark Surge, which applies on-hit effects. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Zeri E Spark Surge)
- **0.45** attack block: Spirit's Refuge blocks Zeri's basic attacks (with Living Battery). Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Zeri basic attacks)
- **0.13** attack block: Spirit's Refuge blocks Zeri's Burst Fire, which applies on-hit effects. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. Burst Fire is parried by dodge and block.
  - Blind causes Burst Fire to cast in a random direction. The rounds will still deal damage to enemies hit. (Shen W Spirit's Refuge → Zeri Q Burst Fire)
- Watch out: Zeri's basic attacks reach 425 units farther than Shen's (550 vs 125 attack range).

### 5. Bard (net +0.51)

- **0.51** untargetable: Tempered Fate makes Bard untargetable, dodging Zeri's Lightning Crash. Untargetable for 2.5 s, long enough to use ahead of Lightning Crash. (Bard R Tempered Fate → Zeri R Lightning Crash)

### 6. Aurora (net +0.45)

- **0.45** untargetable: Between Worlds makes Aurora untargetable, dodging Zeri's Lightning Crash. Untargetable for 0.4 s; Lightning Crash takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Zeri R Lightning Crash)

### 7. Xayah (net +0.45)

- **0.45** untargetable: Featherstorm makes Xayah untargetable, dodging Zeri's Lightning Crash. Untargetable for 1.5 s, long enough to use ahead of Lightning Crash. (Xayah R Featherstorm → Zeri R Lightning Crash)

### 8. Jax (net +0.43)

- **0.60** attack dodge: Counter Strike dodges Zeri's Spark Surge, which applies on-hit effects. Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Zeri E Spark Surge)
- **0.47** attack dodge: Counter Strike dodges Zeri's basic attacks (with Living Battery). Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Zeri basic attacks)
- **0.13** attack dodge: Counter Strike dodges Zeri's Burst Fire, which applies on-hit effects. Counter Strike lasts 2 s on a 9 s cooldown. Burst Fire is parried by dodge and block.
  - Blind causes Burst Fire to cast in a random direction. The rounds will still deal damage to enemies hit. (Jax E Counter Strike → Zeri Q Burst Fire)
- Watch out: Zeri's basic attacks reach 425 units farther than Jax's (550 vs 125 attack range).

### 9. Nilah (net +0.41)

- **0.53** attack dodge: Jubilant Veil dodges Zeri's Spark Surge, which applies on-hit effects. Jubilant Veil lasts 2.25 s on a 22 s cooldown. (Nilah W Jubilant Veil → Zeri E Spark Surge)
- **0.41** attack dodge: Jubilant Veil dodges Zeri's basic attacks (with Living Battery). Jubilant Veil lasts 2.25 s on a 22 s cooldown. (Nilah W Jubilant Veil → Zeri basic attacks)
- **0.12** attack dodge: Jubilant Veil dodges Zeri's Burst Fire, which applies on-hit effects. Jubilant Veil lasts 2.25 s on a 22 s cooldown. Burst Fire is parried by dodge and block.
  - Blind causes Burst Fire to cast in a random direction. The rounds will still deal damage to enemies hit. (Nilah W Jubilant Veil → Zeri Q Burst Fire)
- Watch out: Zeri's basic attacks reach 325 units farther than Nilah's (550 vs 225 attack range).

### 10. Yuumi (net +0.41)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Zeri's Lightning Crash. Untargetable for ?; Lightning Crash takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Zeri R Lightning Crash)
- Watch out: Zeri's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Lissandra | +0.59 | 0.59 | 0.00 |  |
| 2 | Kayle | +0.58 | 0.58 | 0.00 |  |
| 3 | Teemo | +0.58 | 0.58 | 0.00 | blind (Blinding Dart) |
| 4 | Shen | +0.57 | 0.86 | 0.29 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 5 | Bard | +0.51 | 0.51 | 0.00 |  |
| 6 | Aurora | +0.45 | 0.45 | 0.00 |  |
| 7 | Xayah | +0.45 | 0.45 | 0.00 |  |
| 8 | Jax | +0.43 | 0.87 | 0.44 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 9 | Nilah | +0.41 | 0.77 | 0.36 | attack dodge (Jubilant Veil), attack dodge (Jubilant Veil) |
| 10 | Yuumi | +0.41 | 0.55 | 0.14 |  |
| 11 | Lulu | +0.41 | 0.41 | 0.00 | disarm (Whimsy) |
| 12 | Fizz | +0.34 | 0.55 | 0.21 |  |
| 13 | Vladimir | +0.33 | 0.55 | 0.22 |  |
| 14 | Samira | +0.31 | 0.31 | 0.00 |  |
| 15 | Ahri | +0.30 | 0.30 | 0.00 |  |
| 16 | Hwei | +0.30 | 0.30 | 0.00 |  |
| 17 | Jinx | +0.30 | 0.30 | 0.00 |  |
| 18 | Mel | +0.30 | 0.30 | 0.00 |  |
| 19 | Veigar | +0.30 | 0.30 | 0.00 |  |
| 20 | Vex | +0.30 | 0.30 | 0.00 |  |
| 21 | Viktor | +0.30 | 0.30 | 0.00 |  |
| 22 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 23 | Sivir | +0.28 | 0.28 | 0.00 |  |
| 24 | Pantheon | +0.27 | 0.55 | 0.28 |  |
| 25 | Camille | +0.26 | 0.48 | 0.22 |  |
| 26 | Varus | +0.24 | 0.24 | 0.00 |  |
| 27 | Kayn | +0.23 | 0.51 | 0.28 |  |
| 28 | Rek'Sai | +0.23 | 0.51 | 0.28 |  |
| 29 | Evelynn | +0.22 | 0.51 | 0.29 |  |
| 30 | Shaco | +0.22 | 0.51 | 0.29 |  |
| 31 | Malzahar | +0.22 | 0.22 | 0.00 |  |
| 32 | Master Yi | +0.21 | 0.62 | 0.41 |  |
| 33 | Fiora | +0.16 | 0.60 | 0.44 |  |
| 34 | Zed | +0.16 | 0.45 | 0.29 |  |
| 35 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 36 | Gwen | +0.11 | 0.55 | 0.44 |  |
| 37 | Maokai | +0.11 | 0.55 | 0.44 |  |
| 38 | Caitlyn | +0.09 | 0.09 | 0.00 |  |
| 39 | Milio | +0.06 | 0.06 | 0.00 |  |
| 40 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 41 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 42 | Xin Zhao | +0.04 | 0.45 | 0.41 |  |
| 43 | Yasuo | +0.04 | 0.32 | 0.28 |  |
| 44 | Annie | +0.04 | 0.04 | 0.00 |  |
| 45 | Kalista | +0.04 | 0.04 | 0.00 |  |
| 46 | Rammus | 0.00 | 0.44 | 0.44 | attack reflect (Defensive Ball Curl) |
| 47 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 48 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 49 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 50 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 51 | Azir | 0.00 | 0.00 | 0.00 |  |
| 52 | Brand | 0.00 | 0.00 | 0.00 |  |
| 53 | Corki | 0.00 | 0.00 | 0.00 |  |
| 54 | Draven | 0.00 | 0.00 | 0.00 |  |
| 55 | Elise | 0.00 | 0.00 | 0.00 |  |
| 56 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 57 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 58 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 59 | Janna | 0.00 | 0.00 | 0.00 |  |
| 60 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 61 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 62 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 63 | Karma | 0.00 | 0.00 | 0.00 |  |
| 64 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 65 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 66 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 67 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 68 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 69 | Lux | 0.00 | 0.00 | 0.00 |  |
| 70 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 71 | Nami | 0.00 | 0.00 | 0.00 |  |
| 72 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 73 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 74 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 75 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 76 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 77 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 78 | Senna | 0.00 | 0.00 | 0.00 |  |
| 79 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 80 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 81 | Sona | 0.00 | 0.00 | 0.00 |  |
| 82 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 83 | Swain | 0.00 | 0.00 | 0.00 |  |
| 84 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 85 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 86 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 87 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 88 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 89 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 90 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 91 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 92 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 93 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 94 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 95 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 96 | Yone | -0.05 | 0.16 | 0.21 |  |
| 97 | Braum | -0.06 | 0.38 | 0.44 |  |
| 98 | Poppy | -0.06 | 0.38 | 0.44 |  |
| 99 | Thresh | -0.07 | 0.00 | 0.07 |  |
| 100 | Ivern | -0.08 | 0.00 | 0.08 |  |
| 101 | Warwick | -0.09 | 0.20 | 0.29 |  |
| 102 | Graves | -0.09 | 0.00 | 0.09 |  |
| 103 | Zac | -0.11 | 0.30 | 0.41 |  |
| 104 | Kled | -0.12 | 0.05 | 0.17 |  |
| 105 | Morgana | -0.14 | 0.08 | 0.22 |  |
| 106 | Malphite | -0.15 | 0.29 | 0.44 |  |
| 107 | Nocturne | -0.16 | 0.28 | 0.44 |  |
| 108 | Rakan | -0.18 | 0.00 | 0.18 |  |
| 109 | Viego | -0.19 | 0.00 | 0.19 |  |
| 110 | Katarina | -0.20 | 0.24 | 0.44 |  |
| 111 | Jarvan IV | -0.21 | 0.00 | 0.21 |  |
| 112 | Sylas | -0.21 | 0.00 | 0.21 |  |
| 113 | Singed | -0.22 | 0.66 | 0.88 |  |
| 114 | Briar | -0.22 | 0.00 | 0.22 |  |
| 115 | Karthus | -0.22 | 0.00 | 0.22 |  |
| 116 | K'Sante | -0.22 | 0.00 | 0.22 |  |
| 117 | Naafiri | -0.22 | 0.00 | 0.22 |  |
| 118 | Urgot | -0.22 | 0.00 | 0.22 |  |
| 119 | Zaahen | -0.23 | 0.05 | 0.28 |  |
| 120 | Lillia | -0.25 | 0.00 | 0.25 |  |
| 121 | Hecarim | -0.28 | 0.00 | 0.28 |  |
| 122 | Wukong | -0.28 | 0.00 | 0.28 |  |
| 123 | Ornn | -0.28 | 0.00 | 0.28 |  |
| 124 | Rell | -0.28 | 0.00 | 0.28 |  |
| 125 | Amumu | -0.29 | 0.15 | 0.44 |  |
| 126 | Akali | -0.29 | 0.00 | 0.29 |  |
| 127 | Ambessa | -0.29 | 0.00 | 0.29 |  |
| 128 | Bel'Veth | -0.29 | 0.00 | 0.29 |  |
| 129 | Ekko | -0.29 | 0.00 | 0.29 |  |
| 130 | Galio | -0.29 | 0.00 | 0.29 |  |
| 131 | Lee Sin | -0.29 | 0.00 | 0.29 |  |
| 132 | Pyke | -0.29 | 0.00 | 0.29 |  |
| 133 | Qiyana | -0.29 | 0.00 | 0.29 |  |
| 134 | Riven | -0.29 | 0.00 | 0.29 |  |
| 135 | Talon | -0.29 | 0.00 | 0.29 |  |
| 136 | Vi | -0.29 | 0.00 | 0.29 |  |
| 137 | Volibear | -0.29 | 0.00 | 0.29 |  |
| 138 | Udyr | -0.33 | 0.11 | 0.44 |  |
| 139 | Irelia | -0.39 | 0.00 | 0.39 |  |
| 140 | Alistar | -0.40 | 0.04 | 0.44 |  |
| 141 | Aatrox | -0.41 | 0.00 | 0.41 |  |
| 142 | Nautilus | -0.41 | 0.00 | 0.41 |  |
| 143 | Tahm Kench | -0.41 | 0.00 | 0.41 |  |
| 144 | Tryndamere | -0.41 | 0.00 | 0.41 |  |
| 145 | Nasus | -0.43 | 0.45 | 0.88 | attack speed slow (Wither) |
| 146 | Diana | -0.44 | 0.00 | 0.44 |  |
| 147 | Gragas | -0.44 | 0.00 | 0.44 |  |
| 148 | Illaoi | -0.44 | 0.00 | 0.44 |  |
| 149 | Kassadin | -0.44 | 0.00 | 0.44 |  |
| 150 | Kha'Zix | -0.44 | 0.00 | 0.44 |  |
| 151 | Leona | -0.44 | 0.00 | 0.44 |  |
| 152 | Locke | -0.44 | 0.00 | 0.44 |  |
| 153 | Renekton | -0.44 | 0.00 | 0.44 |  |
| 154 | Sejuani | -0.44 | 0.00 | 0.44 |  |
| 155 | Sett | -0.44 | 0.00 | 0.44 |  |
| 156 | Shyvana | -0.44 | 0.00 | 0.44 |  |
| 157 | Garen | -0.71 | 0.12 | 0.83 |  |
| 158 | Mordekaiser | -0.72 | 0.11 | 0.83 |  |
| 159 | Nunu & Willump | -0.75 | 0.13 | 0.88 |  |
| 160 | Sion | -0.78 | 0.05 | 0.83 |  |
| 161 | Rengar | -0.80 | 0.08 | 0.88 |  |
| 162 | Gangplank | -0.81 | 0.07 | 0.88 |  |
| 163 | Skarner | -0.82 | 0.06 | 0.88 |  |
| 164 | Olaf | -0.83 | 0.05 | 0.88 |  |
| 165 | Darius | -0.83 | 0.00 | 0.83 |  |
| 166 | Trundle | -0.83 | 0.00 | 0.83 |  |
| 167 | Yorick | -0.83 | 0.00 | 0.83 |  |
| 168 | Blitzcrank | -0.88 | 0.00 | 0.88 |  |
| 169 | Cho'Gath | -0.88 | 0.00 | 0.88 |  |
| 170 | Dr. Mundo | -0.88 | 0.00 | 0.88 |  |
| 171 | Rumble | -0.88 | 0.00 | 0.88 |  |
| 172 | Taric | -0.88 | 0.00 | 0.88 |  |
