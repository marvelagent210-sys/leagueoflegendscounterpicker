# Counters to Viktor (patch 26.20)

Every champion ranked by what its kit does against Viktor's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Viktor's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Viktor` for the full ledger of a matchup, with sources.

## Top 10

### 1. Vladimir (net +0.79)

- **0.62** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Viktor's Gravity Field. Untargetable for 2 s, long enough to use ahead of Gravity Field. (Vladimir W Sanguine Pool → Viktor W Gravity Field)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Viktor's Arcane Storm. Untargetable for 2 s, long enough to use ahead of Arcane Storm. (Vladimir W Sanguine Pool → Viktor R Arcane Storm)
- **0.26** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Viktor's Siphon Power. Untargetable for 2 s, long enough to use ahead of Siphon Power. (Vladimir W Sanguine Pool → Viktor Q Siphon Power)
- Watch out: Viktor's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

### 2. Lissandra (net +0.78)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Viktor's Arcane Storm. Untargetable for 2.5 s, long enough to use ahead of Arcane Storm. (Lissandra R Frozen Tomb → Viktor R Arcane Storm)
- **0.35** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Viktor's Gravity Field. Untargetable for 2.5 s, long enough to use ahead of Gravity Field. (Lissandra R Frozen Tomb → Viktor W Gravity Field)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Viktor's Siphon Power. Untargetable for 2.5 s, long enough to use ahead of Siphon Power. (Lissandra R Frozen Tomb → Viktor Q Siphon Power)

### 3. Sivir (net +0.78)

- **0.58** spell shield: Spell Shield's spell shield blocks Viktor's Gravity Field. Spell shield for 1.5 s, long enough to use ahead of Gravity Field. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Viktor W Gravity Field)
- **0.28** spell shield: Spell Shield's spell shield blocks part of Viktor's Arcane Storm. Spell shield for 1.5 s, long enough to use ahead of Arcane Storm. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the initial damage. (Sivir E Spell Shield → Viktor R Arcane Storm)
- **0.26** spell shield: Spell Shield's spell shield blocks Viktor's Siphon Power. Spell shield for 1.5 s, long enough to use ahead of Siphon Power. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Viktor Q Siphon Power)

### 4. Maokai (net +0.74)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Viktor's Gravity Field. Untargetable for 1.4 s; Gravity Field takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Viktor W Gravity Field)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Viktor's Arcane Storm. Untargetable for 1.4 s; Arcane Storm takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Viktor R Arcane Storm)
- **0.32** untargetable: Twisted Advance makes Maokai untargetable, dodging Viktor's Siphon Power. Untargetable for 1.4 s; Siphon Power takes 0.55 s to land, enough to react. (Maokai W Twisted Advance → Viktor Q Siphon Power)
- Watch out: Viktor's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

### 5. Elise (net +0.72)

- **0.58** untargetable: Rappel makes Elise untargetable, dodging Viktor's Gravity Field. Untargetable for 0.6 s; Gravity Field takes 0.25 s to land, enough to react. (Elise E Rappel → Viktor W Gravity Field)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Viktor's Arcane Storm. Untargetable for 0.6 s; Arcane Storm takes 0.25 s to land, enough to react. (Elise E Rappel → Viktor R Arcane Storm)
- **0.26** untargetable: Rappel makes Elise untargetable, dodging Viktor's Siphon Power. Untargetable for 0.6 s; Siphon Power takes 0.55 s to land, enough to react. (Elise E Rappel → Viktor Q Siphon Power)
- Watch out: Gravity Field's knockdown can stop Elise's Venomous Bite mid-dash.

### 6. Xayah (net +0.69)

- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Viktor's Arcane Storm. Untargetable for 1.5 s, long enough to use ahead of Arcane Storm. (Xayah R Featherstorm → Viktor R Arcane Storm)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Viktor's Gravity Field. Untargetable for 1.5 s, long enough to use ahead of Gravity Field. (Xayah R Featherstorm → Viktor W Gravity Field)
- **0.19** untargetable: Featherstorm makes Xayah untargetable, dodging Viktor's Siphon Power. Untargetable for 1.5 s, long enough to use ahead of Siphon Power. (Xayah R Featherstorm → Viktor Q Siphon Power)

### 7. Morgana (net +0.67)

- **0.62** cc immunity: Black Shield makes Morgana immune to Viktor's Gravity Field (knockdown, slow, stun). Immune for 5 s, long enough to use ahead of Gravity Field. (Morgana E Black Shield → Viktor W Gravity Field)
- **0.33** cc immunity: Black Shield makes Morgana immune to Viktor's Arcane Storm (disrupt). Immune for 5 s, long enough to use ahead of Arcane Storm. (Morgana E Black Shield → Viktor R Arcane Storm)
- Watch out: Viktor's basic attacks reach 75 units farther than Morgana's (525 vs 450 attack range).

### 8. Master Yi (net +0.64)

- **0.58** untargetable: Alpha Strike makes Master Yi untargetable, dodging Viktor's Gravity Field. Untargetable for ?; Gravity Field takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Viktor W Gravity Field)
- **0.55** untargetable: Alpha Strike makes Master Yi untargetable, dodging Viktor's Arcane Storm. Untargetable for ?; Arcane Storm takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Viktor R Arcane Storm)
- **0.26** untargetable: Alpha Strike makes Master Yi untargetable, dodging Viktor's Siphon Power. Untargetable for ?; Siphon Power takes 0.55 s to land, enough to react. (Master Yi Q Alpha Strike → Viktor Q Siphon Power)
- Watch out: Viktor's basic attacks reach 350 units farther than Master Yi's (525 vs 175 attack range).

### 9. Nocturne (net +0.64)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Viktor's Gravity Field. Spell shield for 1.5 s, long enough to use ahead of Gravity Field. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Viktor W Gravity Field)
- **0.29** spell shield: Shroud of Darkness's spell shield blocks Viktor's Siphon Power. Spell shield for 1.5 s, long enough to use ahead of Siphon Power. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Viktor Q Siphon Power)
- **0.28** spell shield: Shroud of Darkness's spell shield blocks part of Viktor's Arcane Storm. Spell shield for 1.5 s, long enough to use ahead of Arcane Storm. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the initial damage. (Nocturne W Shroud of Darkness → Viktor R Arcane Storm)
- Watch out: Viktor's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

### 10. Yuumi (net +0.63)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Viktor's Gravity Field. Untargetable for ?; Gravity Field takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Viktor W Gravity Field)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Viktor's Arcane Storm. Untargetable for ?; Arcane Storm takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Viktor R Arcane Storm)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Viktor's Siphon Power. Untargetable for ?; Siphon Power takes 0.55 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Viktor Q Siphon Power)
- Watch out: Arcane Storm's disrupt interrupts Yuumi's Final Chapter (normal channel).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Vladimir | +0.79 | 0.96 | 0.17 |  |
| 2 | Lissandra | +0.78 | 0.78 | 0.00 |  |
| 3 | Sivir | +0.78 | 0.78 | 0.00 |  |
| 4 | Maokai | +0.74 | 1.06 | 0.32 |  |
| 5 | Elise | +0.72 | 0.92 | 0.20 |  |
| 6 | Xayah | +0.69 | 0.69 | 0.00 |  |
| 7 | Morgana | +0.67 | 0.79 | 0.12 |  |
| 8 | Master Yi | +0.64 | 1.03 | 0.39 |  |
| 9 | Nocturne | +0.64 | 0.96 | 0.32 |  |
| 10 | Yuumi | +0.63 | 1.09 | 0.46 |  |
| 11 | Teemo | +0.58 | 0.58 | 0.00 | blind (Blinding Dart) |
| 12 | Shaco | +0.56 | 0.78 | 0.22 |  |
| 13 | Kayle | +0.56 | 0.56 | 0.00 |  |
| 14 | Udyr | +0.55 | 0.87 | 0.32 |  |
| 15 | Fiora | +0.50 | 1.07 | 0.57 |  |
| 16 | Bard | +0.48 | 0.78 | 0.30 |  |
| 17 | Zed | +0.47 | 0.69 | 0.22 |  |
| 18 | Mel | +0.43 | 0.43 | 0.00 |  |
| 19 | Milio | +0.36 | 0.36 | 0.00 |  |
| 20 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 21 | Ekko | +0.29 | 0.80 | 0.51 |  |
| 22 | Gwen | +0.26 | 0.92 | 0.66 |  |
| 23 | Aurora | +0.26 | 0.70 | 0.44 |  |
| 24 | Evelynn | +0.22 | 0.78 | 0.56 |  |
| 25 | Rek'Sai | +0.19 | 0.78 | 0.59 |  |
| 26 | Warwick | +0.17 | 0.57 | 0.40 |  |
| 27 | Yasuo | +0.17 | 0.54 | 0.37 |  |
| 28 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 29 | Senna | +0.12 | 0.12 | 0.00 |  |
| 30 | Annie | +0.11 | 0.11 | 0.00 |  |
| 31 | Braum | +0.09 | 0.72 | 0.63 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 32 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 33 | Kindred | +0.08 | 0.32 | 0.24 |  |
| 34 | Kalista | +0.07 | 0.26 | 0.19 |  |
| 35 | Aphelios | +0.07 | 0.07 | 0.00 |  |
| 36 | Heimerdinger | +0.07 | 0.07 | 0.00 |  |
| 37 | Samira | +0.06 | 0.45 | 0.39 |  |
| 38 | Malzahar | +0.04 | 0.44 | 0.40 |  |
| 39 | Vex | +0.04 | 0.04 | 0.00 |  |
| 40 | Zaahen | +0.02 | 0.52 | 0.50 |  |
| 41 | Tristana | +0.02 | 0.32 | 0.30 |  |
| 42 | Brand | 0.00 | 0.00 | 0.00 |  |
| 43 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 44 | Draven | 0.00 | 0.00 | 0.00 |  |
| 45 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 46 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 47 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 48 | Karma | 0.00 | 0.00 | 0.00 |  |
| 49 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 50 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 51 | Lux | 0.00 | 0.00 | 0.00 |  |
| 52 | Nami | 0.00 | 0.00 | 0.00 |  |
| 53 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 54 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 55 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 56 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 57 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 58 | Sona | 0.00 | 0.00 | 0.00 |  |
| 59 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 60 | Swain | 0.00 | 0.00 | 0.00 |  |
| 61 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 62 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 63 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 64 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 65 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 66 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 67 | Camille | -0.04 | 0.74 | 0.78 |  |
| 68 | Varus | -0.06 | 0.00 | 0.06 |  |
| 69 | Jax | -0.07 | 0.52 | 0.59 |  |
| 70 | Malphite | -0.07 | 0.25 | 0.32 |  |
| 71 | Kayn | -0.11 | 0.78 | 0.89 |  |
| 72 | Gangplank | -0.11 | 0.54 | 0.65 |  |
| 73 | Sion | -0.11 | 0.54 | 0.65 |  |
| 74 | Olaf | -0.13 | 0.52 | 0.65 |  |
| 75 | Kled | -0.15 | 0.47 | 0.62 |  |
| 76 | Pantheon | -0.16 | 0.41 | 0.57 |  |
| 77 | Rammus | -0.16 | 0.32 | 0.48 |  |
| 78 | Vayne | -0.17 | 0.00 | 0.17 |  |
| 79 | Nilah | -0.20 | 0.42 | 0.62 |  |
| 80 | Jayce | -0.20 | 0.00 | 0.20 |  |
| 81 | Nidalee | -0.20 | 0.00 | 0.20 |  |
| 82 | Yunara | -0.24 | 0.00 | 0.24 |  |
| 83 | Garen | -0.25 | 0.32 | 0.57 |  |
| 84 | Corki | -0.25 | 0.04 | 0.29 |  |
| 85 | Shyvana | -0.26 | 0.04 | 0.30 |  |
| 86 | Sett | -0.28 | 0.04 | 0.32 |  |
| 87 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 88 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 89 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 90 | Taric | -0.29 | 0.32 | 0.61 |  |
| 91 | Caitlyn | -0.29 | 0.22 | 0.51 |  |
| 92 | Xin Zhao | -0.30 | 0.34 | 0.64 |  |
| 93 | Kassadin | -0.30 | 0.00 | 0.30 |  |
| 94 | Zeri | -0.30 | 0.00 | 0.30 |  |
| 95 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 96 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 97 | Hecarim | -0.35 | 0.04 | 0.39 |  |
| 98 | Ahri | -0.35 | 0.00 | 0.35 |  |
| 99 | Azir | -0.35 | 0.00 | 0.35 |  |
| 100 | Kai'Sa | -0.35 | 0.00 | 0.35 |  |
| 101 | LeBlanc | -0.35 | 0.00 | 0.35 |  |
| 102 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 103 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 104 | Aurelion Sol | -0.36 | 0.00 | 0.36 |  |
| 105 | Rengar | -0.37 | 0.56 | 0.93 |  |
| 106 | Alistar | -0.38 | 0.28 | 0.66 |  |
| 107 | K'Sante | -0.38 | 0.08 | 0.46 |  |
| 108 | Volibear | -0.38 | 0.04 | 0.42 |  |
| 109 | Yone | -0.39 | 0.04 | 0.43 |  |
| 110 | Fiddlesticks | -0.40 | 0.00 | 0.40 |  |
| 111 | Janna | -0.40 | 0.00 | 0.40 |  |
| 112 | Karthus | -0.40 | 0.00 | 0.40 |  |
| 113 | Illaoi | -0.41 | 0.04 | 0.45 |  |
| 114 | Ziggs | -0.41 | 0.00 | 0.41 |  |
| 115 | Lillia | -0.42 | 0.00 | 0.42 |  |
| 116 | Gnar | -0.43 | 0.00 | 0.43 |  |
| 117 | Ivern | -0.44 | 0.00 | 0.44 |  |
| 118 | Jarvan IV | -0.46 | 0.04 | 0.50 |  |
| 119 | Bel'Veth | -0.46 | 0.00 | 0.46 |  |
| 120 | Galio | -0.47 | 0.00 | 0.47 |  |
| 121 | Quinn | -0.47 | 0.00 | 0.47 |  |
| 122 | Thresh | -0.47 | 0.00 | 0.47 |  |
| 123 | Mordekaiser | -0.49 | 0.08 | 0.57 |  |
| 124 | Ambessa | -0.50 | 0.00 | 0.50 |  |
| 125 | Skarner | -0.52 | 0.09 | 0.61 |  |
| 126 | Katarina | -0.52 | 0.00 | 0.52 |  |
| 127 | Aatrox | -0.53 | 0.00 | 0.53 |  |
| 128 | Irelia | -0.53 | 0.00 | 0.53 |  |
| 129 | Akshan | -0.54 | 0.00 | 0.54 |  |
| 130 | Tahm Kench | -0.54 | 0.00 | 0.54 |  |
| 131 | Graves | -0.55 | 0.00 | 0.55 |  |
| 132 | Darius | -0.57 | 0.00 | 0.57 |  |
| 133 | Trundle | -0.57 | 0.00 | 0.57 |  |
| 134 | Urgot | -0.57 | 0.00 | 0.57 |  |
| 135 | Yorick | -0.57 | 0.00 | 0.57 |  |
| 136 | Lucian | -0.58 | 0.00 | 0.58 |  |
| 137 | Viego | -0.59 | 0.04 | 0.63 |  |
| 138 | Tryndamere | -0.59 | 0.00 | 0.59 |  |
| 139 | Talon | -0.60 | 0.00 | 0.60 |  |
| 140 | Shen | -0.61 | 0.49 | 1.10 |  |
| 141 | Fizz | -0.62 | 0.00 | 0.62 |  |
| 142 | Nautilus | -0.62 | 0.00 | 0.62 |  |
| 143 | Qiyana | -0.64 | 0.00 | 0.64 |  |
| 144 | Blitzcrank | -0.65 | 0.00 | 0.65 |  |
| 145 | Cho'Gath | -0.65 | 0.00 | 0.65 |  |
| 146 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 147 | Rumble | -0.65 | 0.00 | 0.65 |  |
| 148 | Singed | -0.65 | 0.00 | 0.65 |  |
| 149 | Leona | -0.66 | 0.00 | 0.66 |  |
| 150 | Locke | -0.66 | 0.00 | 0.66 |  |
| 151 | Renekton | -0.66 | 0.00 | 0.66 |  |
| 152 | Briar | -0.67 | 0.00 | 0.67 |  |
| 153 | Diana | -0.70 | 0.00 | 0.70 |  |
| 154 | Kha'Zix | -0.70 | 0.00 | 0.70 |  |
| 155 | Lee Sin | -0.71 | 0.00 | 0.71 |  |
| 156 | Pyke | -0.73 | 0.00 | 0.73 |  |
| 157 | Rell | -0.73 | 0.00 | 0.73 |  |
| 158 | Vi | -0.74 | 0.04 | 0.78 |  |
| 159 | Wukong | -0.74 | 0.00 | 0.74 |  |
| 160 | Rakan | -0.74 | 0.00 | 0.74 |  |
| 161 | Sejuani | -0.78 | 0.00 | 0.78 |  |
| 162 | Amumu | -0.80 | 0.00 | 0.80 |  |
| 163 | Sylas | -0.80 | 0.00 | 0.80 |  |
| 164 | Nunu & Willump | -0.81 | 0.21 | 1.02 |  |
| 165 | Ornn | -0.84 | 0.04 | 0.88 |  |
| 166 | Akali | -0.84 | 0.00 | 0.84 |  |
| 167 | Poppy | -0.86 | 0.00 | 0.86 |  |
| 168 | Riven | -0.86 | 0.00 | 0.86 |  |
| 169 | Gragas | -0.90 | 0.00 | 0.90 |  |
| 170 | Zac | -0.92 | 0.00 | 0.92 |  |
| 171 | Taliyah | -0.96 | 0.00 | 0.96 |  |
| 172 | Naafiri | -1.20 | 0.00 | 1.20 |  |
