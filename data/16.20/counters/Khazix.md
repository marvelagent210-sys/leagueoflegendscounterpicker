# Counters to Kha'Zix (patch 26.20)

Every champion ranked by what its kit does against Kha'Zix's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kha'Zix's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Khazix` for the full ledger of a matchup, with sources.

## Top 10

### 1. Yuumi (net +1.10)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Kha'Zix's Taste Their Fear. Untargetable for ?; Taste Their Fear takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Kha'Zix Q Taste Their Fear)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Kha'Zix's Evolved Reaper Claws. Untargetable for ?, timed to Evolved Reaper Claws. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Kha'Zix Q Evolved Reaper Claws)
- **0.32** range: Yuumi's basic attacks reach 300 units farther than Kha'Zix's (425 vs 125 attack range). Kha'Zix closes the gap with Leap. (Yuumi basic attacks → Kha'Zix basic attacks)

### 2. Elise (net +1.00)

- **0.33** untargetable: Rappel makes Elise untargetable, dodging Kha'Zix's Evolved Reaper Claws. Untargetable for 0.6 s, timed to Evolved Reaper Claws. (Elise E Rappel → Kha'Zix Q Evolved Reaper Claws)
- **0.32** range: Elise's basic attacks reach 425 units farther than Kha'Zix's (550 vs 125 attack range). Kha'Zix closes the gap with Leap. (Elise basic attacks → Kha'Zix basic attacks)
- **0.29** untargetable: Rappel makes Elise untargetable, dodging Kha'Zix's Taste Their Fear. Untargetable for 0.6 s; Taste Their Fear takes 0.25 s to land, enough to react. (Elise E Rappel → Kha'Zix Q Taste Their Fear)

### 3. Sivir (net +0.95)

- **0.47** range: Sivir's basic attacks reach 375 units farther than Kha'Zix's (500 vs 125 attack range). Kha'Zix closes the gap with Leap. (Sivir basic attacks → Kha'Zix basic attacks)
- **0.33** spell shield: Spell Shield's spell shield blocks Kha'Zix's Evolved Reaper Claws. Spell shield for 1.5 s, long enough to use ahead of Evolved Reaper Claws. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kha'Zix Q Evolved Reaper Claws)
- **0.29** spell shield: Spell Shield's spell shield blocks Kha'Zix's Taste Their Fear. Spell shield for 1.5 s, long enough to use ahead of Taste Their Fear. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kha'Zix Q Taste Their Fear)

### 4. Hwei (net +0.84)

- **0.40** dash stop: Grim Visage's knockdown can stop Kha'Zix's Leap mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Kha'Zix E Leap)
- **0.23** range: Hwei's basic attacks reach 425 units farther than Kha'Zix's (550 vs 125 attack range). Kha'Zix closes the gap with Leap. (Hwei basic attacks → Kha'Zix basic attacks)
- **0.14** reveal: Spiraling Despair reveals Kha'Zix through Evolved Adaptive Cloaking's stealth. (Hwei R Spiraling Despair → Kha'Zix R Evolved Adaptive Cloaking)

### 5. Vex (net +0.82)

- **0.34** dash stop: Doom 'n Gloom's knockdown can stop Kha'Zix's Leap mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Vex I Doom 'n Gloom → Kha'Zix E Leap)
- **0.27** range: Vex's basic attacks reach 425 units farther than Kha'Zix's (550 vs 125 attack range). Kha'Zix closes the gap with Leap. (Vex basic attacks → Kha'Zix basic attacks)
- **0.14** reveal: Shadow Surge reveals Kha'Zix through Evolved Adaptive Cloaking's stealth. (Vex R Shadow Surge → Kha'Zix R Evolved Adaptive Cloaking)

### 6. Kindred (net +0.80)

- **0.47** range: Kindred's basic attacks reach 375 units farther than Kha'Zix's (500 vs 125 attack range). Kha'Zix closes the gap with Leap. (Kindred basic attacks → Kha'Zix basic attacks)
- **0.23** invulnerable: Lamb's Respite makes Kindred invulnerable to Kha'Zix's Taste Their Fear. Invulnerable for ?; Taste Their Fear takes 0.25 s to land, enough to react. (Kindred R Lamb's Respite → Kha'Zix Q Taste Their Fear)
- **0.20** invulnerable: Lamb's Respite makes Kindred invulnerable to Kha'Zix's Evolved Reaper Claws. Invulnerable for ?, timed to Evolved Reaper Claws. (Kindred R Lamb's Respite → Kha'Zix Q Evolved Reaper Claws)

### 7. Lulu (net +0.79)

- **0.36** range: Lulu's basic attacks reach 425 units farther than Kha'Zix's (550 vs 125 attack range). Kha'Zix closes the gap with Leap. (Lulu basic attacks → Kha'Zix basic attacks)
- **0.22** disarm: Whimsy disarms Kha'Zix for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Kha'Zix basic attacks)
- **0.14** reveal: Help, Pix! reveals Kha'Zix through Evolved Adaptive Cloaking's stealth. (Lulu E Help, Pix! → Kha'Zix R Evolved Adaptive Cloaking)

### 8. Samira (net +0.74)

- **0.30** projectile block: Blade Whirl blocks Kha'Zix's Evolved Spike Racks, a projectile. Blade Whirl for 0.75 s, timed to Evolved Spike Racks. (Samira W Blade Whirl → Kha'Zix W Evolved Spike Racks)
- **0.30** range: Samira's basic attacks reach 375 units farther than Kha'Zix's (500 vs 125 attack range). Kha'Zix closes the gap with Leap. (Samira basic attacks → Kha'Zix basic attacks)
- **0.29** projectile block: Blade Whirl blocks Kha'Zix's Void Spike, a projectile. Blade Whirl for 0.75 s; Void Spike takes 0.85 s to land, enough to react. (Samira W Blade Whirl → Kha'Zix W Void Spike)

### 9. Xayah (net +0.72)

- **0.38** range: Xayah's basic attacks reach 400 units farther than Kha'Zix's (525 vs 125 attack range). Kha'Zix closes the gap with Leap. (Xayah basic attacks → Kha'Zix basic attacks)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Kha'Zix's Taste Their Fear. Untargetable for 1.5 s, long enough to use ahead of Taste Their Fear. (Xayah R Featherstorm → Kha'Zix Q Taste Their Fear)
- **0.21** untargetable: Featherstorm makes Xayah untargetable, dodging Kha'Zix's Evolved Reaper Claws. Untargetable for 1.5 s, long enough to use ahead of Evolved Reaper Claws. (Xayah R Featherstorm → Kha'Zix Q Evolved Reaper Claws)

### 10. Bard (net +0.71)

- **0.36** range: Bard's basic attacks reach 375 units farther than Kha'Zix's (500 vs 125 attack range). Kha'Zix closes the gap with Leap. (Bard basic attacks → Kha'Zix basic attacks)
- **0.24** untargetable: Tempered Fate makes Bard untargetable, dodging Kha'Zix's Taste Their Fear. Untargetable for 2.5 s, long enough to use ahead of Taste Their Fear. (Bard R Tempered Fate → Kha'Zix Q Taste Their Fear)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Kha'Zix's Evolved Reaper Claws. Untargetable for 2.5 s, long enough to use ahead of Evolved Reaper Claws. (Bard R Tempered Fate → Kha'Zix Q Evolved Reaper Claws)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +1.10 | 1.10 | 0.00 |  |
| 2 | Elise | +1.00 | 1.00 | 0.00 |  |
| 3 | Sivir | +0.95 | 0.95 | 0.00 |  |
| 4 | Hwei | +0.84 | 0.84 | 0.00 | dash stop (Grim Visage) |
| 5 | Vex | +0.82 | 0.82 | 0.00 |  |
| 6 | Kindred | +0.80 | 0.80 | 0.00 |  |
| 7 | Lulu | +0.79 | 0.79 | 0.00 |  |
| 8 | Samira | +0.74 | 0.74 | 0.00 |  |
| 9 | Xayah | +0.72 | 0.72 | 0.00 |  |
| 10 | Bard | +0.71 | 0.71 | 0.00 |  |
| 11 | Kayle | +0.71 | 0.71 | 0.00 |  |
| 12 | Yasuo | +0.71 | 0.71 | 0.00 |  |
| 13 | Viktor | +0.70 | 0.70 | 0.00 |  |
| 14 | Jinx | +0.69 | 0.69 | 0.00 | dash stop (Flame Chompers!) |
| 15 | Mel | +0.69 | 0.69 | 0.00 |  |
| 16 | Braum | +0.68 | 0.68 | 0.00 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 17 | Vladimir | +0.68 | 0.68 | 0.00 |  |
| 18 | Singed | +0.66 | 0.66 | 0.00 |  |
| 19 | Teemo | +0.65 | 0.65 | 0.00 |  |
| 20 | Twisted Fate | +0.64 | 0.64 | 0.00 |  |
| 21 | Aurora | +0.63 | 0.63 | 0.00 |  |
| 22 | Maokai | +0.63 | 0.63 | 0.00 |  |
| 23 | Ahri | +0.62 | 0.62 | 0.00 | dash stop (Charm) |
| 24 | Lissandra | +0.62 | 0.62 | 0.00 |  |
| 25 | Veigar | +0.61 | 0.61 | 0.00 |  |
| 26 | Cassiopeia | +0.60 | 0.60 | 0.00 |  |
| 27 | Malzahar | +0.60 | 0.60 | 0.00 |  |
| 28 | Kai'Sa | +0.59 | 0.59 | 0.00 |  |
| 29 | Renata Glasc | +0.59 | 0.59 | 0.00 |  |
| 30 | Caitlyn | +0.57 | 0.57 | 0.00 |  |
| 31 | Nocturne | +0.57 | 0.57 | 0.00 |  |
| 32 | Master Yi | +0.56 | 0.56 | 0.00 |  |
| 33 | Akshan | +0.55 | 0.55 | 0.00 |  |
| 34 | Fiora | +0.52 | 0.52 | 0.00 |  |
| 35 | Morgana | +0.52 | 0.52 | 0.00 |  |
| 36 | Nidalee | +0.51 | 0.51 | 0.00 |  |
| 37 | Zac | +0.51 | 0.51 | 0.00 | dash stop (Stretching Strikes) |
| 38 | Poppy | +0.50 | 0.50 | 0.00 | dash stop (Steadfast Presence) |
| 39 | Gwen | +0.48 | 0.48 | 0.00 |  |
| 40 | Pantheon | +0.48 | 0.48 | 0.00 |  |
| 41 | Aphelios | +0.45 | 0.45 | 0.00 |  |
| 42 | Milio | +0.45 | 0.45 | 0.00 |  |
| 43 | Varus | +0.45 | 0.45 | 0.00 |  |
| 44 | Zyra | +0.45 | 0.45 | 0.00 |  |
| 45 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 46 | Karma | +0.43 | 0.43 | 0.00 |  |
| 47 | LeBlanc | +0.43 | 0.43 | 0.00 |  |
| 48 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 49 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 50 | Fiddlesticks | +0.41 | 0.41 | 0.00 |  |
| 51 | Kled | +0.41 | 0.41 | 0.00 |  |
| 52 | Sona | +0.41 | 0.41 | 0.00 |  |
| 53 | Kayn | +0.40 | 0.40 | 0.00 |  |
| 54 | Rek'Sai | +0.40 | 0.40 | 0.00 |  |
| 55 | Thresh | +0.40 | 0.40 | 0.00 |  |
| 56 | Kalista | +0.38 | 0.38 | 0.00 |  |
| 57 | Quinn | +0.38 | 0.38 | 0.00 |  |
| 58 | Ekko | +0.37 | 0.37 | 0.00 |  |
| 59 | Garen | +0.37 | 0.37 | 0.00 |  |
| 60 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 61 | Draven | +0.36 | 0.36 | 0.00 |  |
| 62 | Janna | +0.36 | 0.36 | 0.00 |  |
| 63 | Lucian | +0.36 | 0.36 | 0.00 |  |
| 64 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 65 | Urgot | +0.36 | 0.36 | 0.00 |  |
| 66 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 67 | Evelynn | +0.35 | 0.35 | 0.00 |  |
| 68 | Nilah | +0.35 | 0.35 | 0.00 |  |
| 69 | Shaco | +0.35 | 0.35 | 0.00 |  |
| 70 | Camille | +0.34 | 0.34 | 0.00 |  |
| 71 | Xin Zhao | +0.34 | 0.34 | 0.00 |  |
| 72 | Zed | +0.34 | 0.34 | 0.00 |  |
| 73 | Gnar | +0.33 | 0.33 | 0.00 |  |
| 74 | Rengar | +0.33 | 0.33 | 0.00 |  |
| 75 | Taric | +0.33 | 0.33 | 0.00 |  |
| 76 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 77 | Miss Fortune | +0.32 | 0.32 | 0.00 |  |
| 78 | Senna | +0.32 | 0.32 | 0.00 |  |
| 79 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 80 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 81 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 82 | Warwick | +0.31 | 0.31 | 0.00 |  |
| 83 | Corki | +0.30 | 0.30 | 0.00 |  |
| 84 | Jayce | +0.30 | 0.30 | 0.00 |  |
| 85 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 86 | Lux | +0.29 | 0.29 | 0.00 |  |
| 87 | Seraphine | +0.29 | 0.29 | 0.00 |  |
| 88 | Azir | +0.27 | 0.27 | 0.00 |  |
| 89 | Heimerdinger | +0.27 | 0.27 | 0.00 |  |
| 90 | Jhin | +0.27 | 0.27 | 0.00 |  |
| 91 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 92 | Orianna | +0.27 | 0.27 | 0.00 |  |
| 93 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 94 | Taliyah | +0.27 | 0.27 | 0.00 |  |
| 95 | Vel'Koz | +0.27 | 0.27 | 0.00 |  |
| 96 | Xerath | +0.27 | 0.27 | 0.00 |  |
| 97 | Ziggs | +0.27 | 0.27 | 0.00 |  |
| 98 | Jax | +0.25 | 0.25 | 0.00 |  |
| 99 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 100 | Graves | +0.24 | 0.24 | 0.00 |  |
| 101 | Nasus | +0.24 | 0.24 | 0.00 |  |
| 102 | Rammus | +0.24 | 0.24 | 0.00 |  |
| 103 | Ryze | +0.24 | 0.24 | 0.00 |  |
| 104 | Shen | +0.24 | 0.24 | 0.00 |  |
| 105 | Mordekaiser | +0.23 | 0.23 | 0.00 |  |
| 106 | Skarner | +0.23 | 0.23 | 0.00 |  |
| 107 | Annie | +0.22 | 0.22 | 0.00 |  |
| 108 | Aurelion Sol | +0.22 | 0.22 | 0.00 |  |
| 109 | Brand | +0.22 | 0.22 | 0.00 |  |
| 110 | Nami | +0.22 | 0.22 | 0.00 |  |
| 111 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 112 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 113 | Aatrox | +0.21 | 0.21 | 0.00 |  |
| 114 | Akali | +0.21 | 0.21 | 0.00 |  |
| 115 | Ambessa | +0.21 | 0.21 | 0.00 |  |
| 116 | Briar | +0.21 | 0.21 | 0.00 |  |
| 117 | Fizz | +0.21 | 0.21 | 0.00 |  |
| 118 | Illaoi | +0.21 | 0.21 | 0.00 |  |
| 119 | Lee Sin | +0.21 | 0.21 | 0.00 |  |
| 120 | Naafiri | +0.21 | 0.21 | 0.00 |  |
| 121 | Sett | +0.21 | 0.21 | 0.00 |  |
| 122 | Swain | +0.21 | 0.21 | 0.00 |  |
| 123 | Sylas | +0.21 | 0.21 | 0.00 |  |
| 124 | Vi | +0.21 | 0.21 | 0.00 |  |
| 125 | Yone | +0.20 | 0.20 | 0.00 |  |
| 126 | Amumu | +0.19 | 0.19 | 0.00 |  |
| 127 | Ivern | +0.19 | 0.19 | 0.00 |  |
| 128 | Karthus | +0.19 | 0.19 | 0.00 |  |
| 129 | Katarina | +0.18 | 0.18 | 0.00 |  |
| 130 | Malphite | +0.16 | 0.16 | 0.00 |  |
| 131 | Nunu & Willump | +0.15 | 0.15 | 0.00 |  |
| 132 | Udyr | +0.15 | 0.15 | 0.00 |  |
| 133 | Rakan | +0.13 | 0.13 | 0.00 |  |
| 134 | Lillia | +0.11 | 0.11 | 0.00 |  |
| 135 | Gangplank | +0.10 | 0.10 | 0.00 |  |
| 136 | Viego | +0.09 | 0.09 | 0.00 |  |
| 137 | Sion | +0.08 | 0.08 | 0.00 |  |
| 138 | Olaf | +0.07 | 0.07 | 0.00 |  |
| 139 | Zaahen | +0.07 | 0.07 | 0.00 |  |
| 140 | Alistar | +0.06 | 0.06 | 0.00 |  |
| 141 | Irelia | +0.05 | 0.05 | 0.00 |  |
| 142 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 143 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 144 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 145 | Darius | 0.00 | 0.00 | 0.00 |  |
| 146 | Diana | 0.00 | 0.00 | 0.00 |  |
| 147 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 148 | Galio | 0.00 | 0.00 | 0.00 |  |
| 149 | Gragas | 0.00 | 0.00 | 0.00 |  |
| 150 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 151 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 152 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 153 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 154 | Leona | 0.00 | 0.00 | 0.00 |  |
| 155 | Locke | 0.00 | 0.00 | 0.00 |  |
| 156 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 157 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 158 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 159 | Pyke | 0.00 | 0.00 | 0.00 |  |
| 160 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 161 | Rell | 0.00 | 0.00 | 0.00 |  |
| 162 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 163 | Riven | 0.00 | 0.00 | 0.00 |  |
| 164 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 165 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 166 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 167 | Tahm Kench | 0.00 | 0.00 | 0.00 |  |
| 168 | Talon | 0.00 | 0.00 | 0.00 |  |
| 169 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 170 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 171 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 172 | Yorick | 0.00 | 0.00 | 0.00 |  |
