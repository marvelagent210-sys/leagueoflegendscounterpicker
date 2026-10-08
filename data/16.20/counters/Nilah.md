# Counters to Nilah (patch 26.20)

Every champion ranked by what its kit does against Nilah's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nilah's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nilah` for the full ledger of a matchup, with sources.

## Top 10

### 1. Lissandra (net +1.03)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Nilah's Apotheosis. Untargetable for 2.5 s, long enough to use ahead of Apotheosis. (Lissandra R Frozen Tomb → Nilah R Apotheosis)
- **0.39** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Nilah's Slipstream. Untargetable for 2.5 s, long enough to use ahead of Slipstream. (Lissandra R Frozen Tomb → Nilah E Slipstream)
- **0.20** dash stop: Frozen Tomb's knockdown can stop Nilah's Slipstream mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Nilah E Slipstream)
- Watch out: Jubilant Veil dodges Lissandra's basic attacks.

### 2. Vladimir (net +1.01)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nilah's Apotheosis. Untargetable for 2 s, long enough to use ahead of Apotheosis. (Vladimir W Sanguine Pool → Nilah R Apotheosis)
- **0.68** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nilah's Slipstream. Untargetable for 2 s, long enough to use ahead of Slipstream. (Vladimir W Sanguine Pool → Nilah E Slipstream)
- **0.12** range: Vladimir's basic attacks reach 225 units farther than Nilah's (450 vs 225 attack range). Nilah closes the gap with Slipstream. (Vladimir basic attacks → Nilah basic attacks)
- Watch out: Jubilant Veil dodges Vladimir's basic attacks.

### 3. Bard (net +0.91)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Nilah's Apotheosis. Untargetable for 2.5 s, long enough to use ahead of Apotheosis. (Bard R Tempered Fate → Nilah R Apotheosis)
- **0.39** untargetable: Tempered Fate makes Bard untargetable, dodging Nilah's Slipstream. Untargetable for 2.5 s, long enough to use ahead of Slipstream. (Bard R Tempered Fate → Nilah E Slipstream)
- **0.26** range: Bard's basic attacks reach 275 units farther than Nilah's (500 vs 225 attack range). Nilah closes the gap with Slipstream. (Bard basic attacks → Nilah basic attacks)
- Watch out: Jubilant Veil dodges Bard's basic attacks (with Traveler's Call).

### 4. Xayah (net +0.83)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Nilah's Apotheosis. Untargetable for 1.5 s, long enough to use ahead of Apotheosis. (Xayah R Featherstorm → Nilah R Apotheosis)
- **0.38** untargetable: Featherstorm makes Xayah untargetable, dodging Nilah's Slipstream. Untargetable for 1.5 s, long enough to use ahead of Slipstream. (Xayah R Featherstorm → Nilah E Slipstream)
- **0.29** range: Xayah's basic attacks reach 300 units farther than Nilah's (525 vs 225 attack range). Nilah closes the gap with Slipstream. (Xayah basic attacks → Nilah basic attacks)
- Watch out: Jubilant Veil dodges Xayah's basic attacks (with Clean Cuts).

### 5. Elise (net +0.75)

- **0.64** untargetable: Rappel makes Elise untargetable, dodging Nilah's Slipstream. Untargetable for 0.6 s; Slipstream takes 0.25 s to land, enough to react. (Elise E Rappel → Nilah E Slipstream)
- **0.48** untargetable: Rappel makes Elise untargetable, dodging Nilah's Apotheosis. Untargetable for 0.6 s; Apotheosis lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Nilah R Apotheosis)
- **0.26** range: Elise's basic attacks reach 325 units farther than Nilah's (550 vs 225 attack range). Nilah closes the gap with Slipstream. (Elise basic attacks → Nilah basic attacks)
- Watch out: Jubilant Veil dodges Elise's basic attacks (with Spider Queen).

### 6. Sivir (net +0.72)

- **0.64** spell shield: Spell Shield's spell shield blocks Nilah's Slipstream. Spell shield for 1.5 s, long enough to use ahead of Slipstream. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nilah E Slipstream)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Nilah's Apotheosis. Spell shield for 1.5 s, long enough to use ahead of Apotheosis. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the burst damage. (Sivir E Spell Shield → Nilah R Apotheosis)
- **0.34** range: Sivir's basic attacks reach 275 units farther than Nilah's (500 vs 225 attack range). Nilah closes the gap with Slipstream. (Sivir basic attacks → Nilah basic attacks)
- Watch out: Jubilant Veil dodges Sivir's basic attacks (with Fleet of Foot).

### 7. Morgana (net +0.71)

- **0.80** cc immunity: Black Shield makes Morgana immune to Nilah's Apotheosis (airborne, slow). Immune for 5 s, long enough to use ahead of Apotheosis. (Morgana E Black Shield → Nilah R Apotheosis)
- **0.13** range: Morgana's basic attacks reach 225 units farther than Nilah's (450 vs 225 attack range). Nilah closes the gap with Slipstream. (Morgana basic attacks → Nilah basic attacks)
- Watch out: Jubilant Veil dodges Morgana's basic attacks.

### 8. Rek'Sai (net +0.67)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Nilah's Apotheosis. Untargetable for 1.5 s, long enough to use ahead of Apotheosis. (Rek'Sai R Void Rush → Nilah R Apotheosis)
- **0.39** untargetable: Void Rush makes Rek'Sai untargetable, dodging Nilah's Slipstream. Untargetable for 1.5 s, long enough to use ahead of Slipstream. (Rek'Sai R Void Rush → Nilah E Slipstream)
- **0.08** cc immunity: Void Rush is displacement immune, ignoring Nilah's Apotheosis (airborne) during it. Only during Void Rush (1.5 s). (Rek'Sai R Void Rush → Nilah R Apotheosis)
- Watch out: Jubilant Veil dodges Rek'Sai's basic attacks (with Fury of the Xer'Sai).

### 9. Maokai (net +0.66)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Nilah's Slipstream. Untargetable for 1.4 s; Slipstream takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Nilah E Slipstream)
- **0.48** untargetable: Twisted Advance makes Maokai untargetable, dodging Nilah's Apotheosis. Untargetable for 1.4 s; Apotheosis lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Nilah R Apotheosis)
- Watch out: Jubilant Veil dodges Maokai's basic attacks (with Sap Magic).

### 10. Nocturne (net +0.60)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Nilah's Slipstream. Spell shield for 1.5 s, long enough to use ahead of Slipstream. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nilah E Slipstream)
- **0.40** spell shield: Shroud of Darkness's spell shield blocks part of Nilah's Apotheosis. Spell shield for 1.5 s, long enough to use ahead of Apotheosis. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the burst damage. (Nocturne W Shroud of Darkness → Nilah R Apotheosis)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Nilah's Apotheosis (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Nilah R Apotheosis)
- Watch out: Jubilant Veil dodges Nocturne's basic attacks (with Umbra Blades).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Lissandra | +1.03 | 1.23 | 0.20 |  |
| 2 | Vladimir | +1.01 | 1.26 | 0.25 |  |
| 3 | Bard | +0.91 | 1.26 | 0.35 |  |
| 4 | Xayah | +0.83 | 1.18 | 0.35 |  |
| 5 | Elise | +0.75 | 1.14 | 0.39 |  |
| 6 | Sivir | +0.72 | 1.18 | 0.46 |  |
| 7 | Morgana | +0.71 | 0.93 | 0.22 |  |
| 8 | Rek'Sai | +0.67 | 1.02 | 0.35 |  |
| 9 | Maokai | +0.66 | 1.04 | 0.38 |  |
| 10 | Nocturne | +0.60 | 1.08 | 0.48 |  |
| 11 | Aurora | +0.60 | 0.87 | 0.27 |  |
| 12 | Singed | +0.58 | 1.08 | 0.50 |  |
| 13 | Teemo | +0.58 | 0.91 | 0.33 | blind (Blinding Dart) |
| 14 | Kayle | +0.56 | 0.96 | 0.40 |  |
| 15 | Fiora | +0.49 | 1.00 | 0.51 |  |
| 16 | Yuumi | +0.47 | 1.25 | 0.78 |  |
| 17 | Sion | +0.47 | 0.80 | 0.33 |  |
| 18 | Gwen | +0.46 | 0.88 | 0.42 |  |
| 19 | Master Yi | +0.44 | 1.08 | 0.64 |  |
| 20 | Lulu | +0.43 | 0.76 | 0.33 | disarm (Whimsy) |
| 21 | Vex | +0.39 | 0.64 | 0.25 |  |
| 22 | Kalista | +0.38 | 0.75 | 0.37 |  |
| 23 | Hwei | +0.38 | 0.59 | 0.21 | dash stop (Grim Visage) |
| 24 | Ahri | +0.38 | 0.58 | 0.20 | dash stop (Charm) |
| 25 | Cassiopeia | +0.36 | 0.56 | 0.20 |  |
| 26 | Kindred | +0.35 | 0.81 | 0.46 |  |
| 27 | Jinx | +0.35 | 0.62 | 0.27 | dash stop (Flame Chompers!) |
| 28 | Veigar | +0.34 | 0.56 | 0.22 |  |
| 29 | Ekko | +0.32 | 0.70 | 0.38 |  |
| 30 | Shaco | +0.30 | 0.68 | 0.38 |  |
| 31 | Zed | +0.26 | 0.61 | 0.35 |  |
| 32 | Camille | +0.25 | 0.66 | 0.41 |  |
| 33 | Olaf | +0.20 | 0.80 | 0.60 |  |
| 34 | Viktor | +0.20 | 0.62 | 0.42 |  |
| 35 | Evelynn | +0.17 | 0.68 | 0.51 |  |
| 36 | Malzahar | +0.15 | 0.75 | 0.60 |  |
| 37 | Pantheon | +0.12 | 0.84 | 0.72 |  |
| 38 | Alistar | +0.09 | 0.64 | 0.55 |  |
| 39 | Milio | +0.09 | 0.44 | 0.35 |  |
| 40 | Udyr | +0.07 | 0.80 | 0.73 |  |
| 41 | Heimerdinger | +0.06 | 0.24 | 0.18 |  |
| 42 | Varus | +0.05 | 0.69 | 0.64 |  |
| 43 | Corki | +0.04 | 0.32 | 0.28 |  |
| 44 | Kled | +0.02 | 0.40 | 0.38 |  |
| 45 | Annie | +0.02 | 0.22 | 0.20 |  |
| 46 | Kayn | +0.01 | 0.68 | 0.67 |  |
| 47 | Malphite | +0.01 | 0.41 | 0.40 |  |
| 48 | Ashe | +0.01 | 0.34 | 0.33 |  |
| 49 | Gangplank | 0.00 | 0.64 | 0.64 |  |
| 50 | Anivia | 0.00 | 0.22 | 0.22 |  |
| 51 | Taric | -0.01 | 0.53 | 0.54 |  |
| 52 | Yunara | -0.01 | 0.32 | 0.33 |  |
| 53 | Zyra | -0.01 | 0.21 | 0.22 |  |
| 54 | Jax | -0.02 | 0.62 | 0.64 | attack dodge (Counter Strike) |
| 55 | Brand | -0.02 | 0.18 | 0.20 |  |
| 56 | Nami | -0.02 | 0.18 | 0.20 |  |
| 57 | Neeko | -0.02 | 0.18 | 0.20 |  |
| 58 | Syndra | -0.02 | 0.18 | 0.20 |  |
| 59 | Lux | -0.03 | 0.24 | 0.27 |  |
| 60 | Mel | -0.03 | 0.22 | 0.25 |  |
| 61 | Soraka | -0.03 | 0.22 | 0.25 |  |
| 62 | Ziggs | -0.03 | 0.22 | 0.25 |  |
| 63 | Swain | -0.03 | 0.16 | 0.19 |  |
| 64 | Sona | -0.04 | 0.34 | 0.38 |  |
| 65 | Renata Glasc | -0.04 | 0.31 | 0.35 |  |
| 66 | Draven | -0.04 | 0.29 | 0.33 |  |
| 67 | Zilean | -0.04 | 0.26 | 0.30 |  |
| 68 | Zoe | -0.04 | 0.26 | 0.30 |  |
| 69 | Karma | -0.04 | 0.16 | 0.20 |  |
| 70 | LeBlanc | -0.04 | 0.16 | 0.20 |  |
| 71 | Xin Zhao | -0.05 | 0.55 | 0.60 |  |
| 72 | Nasus | -0.05 | 0.50 | 0.55 | attack speed slow (Wither) |
| 73 | Twitch | -0.05 | 0.35 | 0.40 |  |
| 74 | Vayne | -0.05 | 0.35 | 0.40 |  |
| 75 | Seraphine | -0.05 | 0.22 | 0.27 |  |
| 76 | Orianna | -0.05 | 0.20 | 0.25 |  |
| 77 | Rammus | -0.06 | 0.50 | 0.56 | attack reflect (Defensive Ball Curl) |
| 78 | Zaahen | -0.06 | 0.48 | 0.54 |  |
| 79 | Tristana | -0.06 | 0.36 | 0.42 |  |
| 80 | Kai'Sa | -0.06 | 0.29 | 0.35 |  |
| 81 | Nidalee | -0.06 | 0.22 | 0.28 |  |
| 82 | Gnar | -0.07 | 0.24 | 0.31 |  |
| 83 | Poppy | -0.08 | 0.50 | 0.58 | dash stop (Steadfast Presence) |
| 84 | Jayce | -0.08 | 0.22 | 0.30 |  |
| 85 | Samira | -0.08 | 0.22 | 0.30 |  |
| 86 | Aurelion Sol | -0.08 | 0.18 | 0.26 |  |
| 87 | Thresh | -0.09 | 0.13 | 0.22 |  |
| 88 | Senna | -0.10 | 0.30 | 0.40 |  |
| 89 | Yone | -0.10 | 0.28 | 0.38 |  |
| 90 | Kennen | -0.10 | 0.24 | 0.34 |  |
| 91 | Smolder | -0.11 | 0.26 | 0.37 |  |
| 92 | Ivern | -0.13 | 0.14 | 0.27 |  |
| 93 | Graves | -0.14 | 0.16 | 0.30 |  |
| 94 | Lillia | -0.15 | 0.05 | 0.20 |  |
| 95 | Ornn | -0.17 | 0.08 | 0.25 |  |
| 96 | Mordekaiser | -0.18 | 0.12 | 0.30 |  |
| 97 | Ezreal | -0.19 | 0.26 | 0.45 |  |
| 98 | Amumu | -0.19 | 0.19 | 0.38 |  |
| 99 | Quinn | -0.20 | 0.29 | 0.49 |  |
| 100 | Hecarim | -0.22 | 0.08 | 0.30 |  |
| 101 | Rakan | -0.22 | 0.05 | 0.27 |  |
| 102 | Caitlyn | -0.25 | 0.36 | 0.61 |  |
| 103 | Jarvan IV | -0.25 | 0.08 | 0.33 |  |
| 104 | Azir | -0.27 | 0.20 | 0.47 |  |
| 105 | Sylas | -0.27 | 0.00 | 0.27 |  |
| 106 | Shyvana | -0.28 | 0.08 | 0.36 |  |
| 107 | Urgot | -0.28 | 0.08 | 0.36 |  |
| 108 | Aphelios | -0.29 | 0.39 | 0.68 |  |
| 109 | K'Sante | -0.29 | 0.16 | 0.45 |  |
| 110 | Nautilus | -0.30 | 0.00 | 0.30 |  |
| 111 | Ambessa | -0.31 | 0.00 | 0.31 |  |
| 112 | Katarina | -0.32 | 0.46 | 0.78 |  |
| 113 | Illaoi | -0.32 | 0.08 | 0.40 |  |
| 114 | Garen | -0.33 | 0.21 | 0.54 |  |
| 115 | Kog'Maw | -0.33 | 0.20 | 0.53 |  |
| 116 | Vel'Koz | -0.33 | 0.20 | 0.53 |  |
| 117 | Lee Sin | -0.33 | 0.00 | 0.33 |  |
| 118 | Rengar | -0.34 | 0.64 | 0.98 |  |
| 119 | Diana | -0.34 | 0.00 | 0.34 |  |
| 120 | Qiyana | -0.34 | 0.00 | 0.34 |  |
| 121 | Aatrox | -0.35 | 0.00 | 0.35 |  |
| 122 | Akali | -0.35 | 0.00 | 0.35 |  |
| 123 | Kha'Zix | -0.35 | 0.00 | 0.35 |  |
| 124 | Xerath | -0.36 | 0.20 | 0.56 |  |
| 125 | Kassadin | -0.36 | 0.00 | 0.36 |  |
| 126 | Lucian | -0.37 | 0.26 | 0.63 |  |
| 127 | Karthus | -0.37 | 0.13 | 0.50 |  |
| 128 | Yasuo | -0.37 | 0.00 | 0.37 |  |
| 129 | Ryze | -0.38 | 0.19 | 0.57 |  |
| 130 | Skarner | -0.39 | 0.10 | 0.49 |  |
| 131 | Sejuani | -0.39 | 0.00 | 0.39 |  |
| 132 | Shen | -0.40 | 0.60 | 1.00 | attack block (Spirit's Refuge) |
| 133 | Zac | -0.40 | 0.40 | 0.80 | dash stop (Stretching Strikes) |
| 134 | Galio | -0.40 | 0.00 | 0.40 |  |
| 135 | Leona | -0.40 | 0.00 | 0.40 |  |
| 136 | Tryndamere | -0.40 | 0.00 | 0.40 |  |
| 137 | Zeri | -0.41 | 0.36 | 0.77 |  |
| 138 | Jhin | -0.41 | 0.22 | 0.63 |  |
| 139 | Sett | -0.41 | 0.08 | 0.49 |  |
| 140 | Pyke | -0.41 | 0.00 | 0.41 |  |
| 141 | Talon | -0.41 | 0.00 | 0.41 |  |
| 142 | Braum | -0.43 | 0.00 | 0.43 |  |
| 143 | Riven | -0.43 | 0.00 | 0.43 |  |
| 144 | Janna | -0.44 | 0.29 | 0.73 |  |
| 145 | Darius | -0.45 | 0.00 | 0.45 |  |
| 146 | Trundle | -0.45 | 0.00 | 0.45 |  |
| 147 | Miss Fortune | -0.46 | 0.26 | 0.72 |  |
| 148 | Yorick | -0.49 | 0.00 | 0.49 |  |
| 149 | Cho'Gath | -0.52 | 0.00 | 0.52 |  |
| 150 | Rumble | -0.52 | 0.00 | 0.52 |  |
| 151 | Taliyah | -0.53 | 0.20 | 0.73 |  |
| 152 | Tahm Kench | -0.53 | 0.00 | 0.53 |  |
| 153 | Fiddlesticks | -0.56 | 0.14 | 0.70 |  |
| 154 | Irelia | -0.57 | 0.00 | 0.57 |  |
| 155 | Briar | -0.58 | 0.00 | 0.58 |  |
| 156 | Wukong | -0.59 | 0.00 | 0.59 |  |
| 157 | Akshan | -0.61 | 0.25 | 0.86 |  |
| 158 | Fizz | -0.61 | 0.00 | 0.61 |  |
| 159 | Nunu & Willump | -0.62 | 0.25 | 0.87 |  |
| 160 | Bel'Veth | -0.62 | 0.00 | 0.62 |  |
| 161 | Gragas | -0.62 | 0.00 | 0.62 |  |
| 162 | Locke | -0.62 | 0.00 | 0.62 |  |
| 163 | Twisted Fate | -0.63 | 0.32 | 0.95 |  |
| 164 | Dr. Mundo | -0.68 | 0.00 | 0.68 |  |
| 165 | Vi | -0.69 | 0.08 | 0.77 |  |
| 166 | Renekton | -0.71 | 0.00 | 0.71 |  |
| 167 | Naafiri | -0.78 | 0.00 | 0.78 |  |
| 168 | Viego | -0.80 | 0.08 | 0.88 |  |
| 169 | Volibear | -0.83 | 0.08 | 0.91 |  |
| 170 | Rell | -0.83 | 0.00 | 0.83 |  |
| 171 | Blitzcrank | -0.86 | 0.00 | 0.86 |  |
| 172 | Warwick | -0.91 | 0.66 | 1.57 |  |
