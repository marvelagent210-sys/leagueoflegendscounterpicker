# Counters to Lulu (patch 26.20)

Every champion ranked by what its kit does against Lulu's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Lulu's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Lulu` for the full ledger of a matchup, with sources.

## Top 10

### 1. Lissandra (net +0.76)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Lulu's Wild Growth. Untargetable for 2.5 s, long enough to use ahead of Wild Growth. (Lissandra R Frozen Tomb → Lulu R Wild Growth)
- **0.24** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Lulu's Whimsy. Untargetable for 2.5 s, long enough to use ahead of Whimsy. (Lissandra R Frozen Tomb → Lulu W Whimsy)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Lulu's Help, Pix!. Untargetable for 2.5 s, long enough to use ahead of Help, Pix!. (Lissandra R Frozen Tomb → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Lissandra for 2 s: no basic attacks.

### 2. Vladimir (net +0.67)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lulu's Wild Growth. Untargetable for 2 s, long enough to use ahead of Wild Growth. (Vladimir W Sanguine Pool → Lulu R Wild Growth)
- **0.45** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lulu's Whimsy. Untargetable for 2 s, long enough to use ahead of Whimsy. (Vladimir W Sanguine Pool → Lulu W Whimsy)
- **0.32** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lulu's Help, Pix!. Untargetable for 2 s, long enough to use ahead of Help, Pix!. (Vladimir W Sanguine Pool → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Vladimir for 2 s: no basic attacks.

### 3. Bard (net +0.61)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Lulu's Wild Growth. Untargetable for 2.5 s, long enough to use ahead of Wild Growth. (Bard R Tempered Fate → Lulu R Wild Growth)
- **0.24** untargetable: Tempered Fate makes Bard untargetable, dodging Lulu's Whimsy. Untargetable for 2.5 s, long enough to use ahead of Whimsy. (Bard R Tempered Fate → Lulu W Whimsy)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Lulu's Help, Pix!. Untargetable for 2.5 s, long enough to use ahead of Help, Pix!. (Bard R Tempered Fate → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Bard for 2 s: no basic attacks.

### 4. Sivir (net +0.59)

- **0.80** spell shield: Spell Shield's spell shield blocks Lulu's Wild Growth. Spell shield for 1.5 s, long enough to use ahead of Wild Growth. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Lulu R Wild Growth)
- **0.45** spell shield: Spell Shield's spell shield blocks Lulu's Whimsy. Spell shield for 1.5 s, long enough to use ahead of Whimsy. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Lulu W Whimsy)
- **0.15** spell shield: Spell Shield's spell shield blocks part of Lulu's Help, Pix!. Spell shield for 1.5 s, long enough to use ahead of Help, Pix!. A spell shield blocks only the first enemy ability that reaches it. Spell shield and Riposte will block the damage but Pix will still follow regardless. (Sivir E Spell Shield → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Sivir for 2 s: no basic attacks.

### 5. Morgana (net +0.55)

- **0.80** cc immunity: Black Shield makes Morgana immune to Lulu's Wild Growth (airborne, slow). Immune for 5 s, long enough to use ahead of Wild Growth. (Morgana E Black Shield → Lulu R Wild Growth)
- **0.27** cc immunity: Black Shield makes Morgana immune to Lulu's Whimsy (disarm, polymorph, slow). Immune for 5 s, long enough to use ahead of Whimsy. (Morgana E Black Shield → Lulu W Whimsy)
- **0.07** cc immunity: Black Shield makes Morgana immune to Lulu's Glitterlance (slow). Immune for 5 s, long enough to use ahead of Glitterlance. (Morgana E Black Shield → Lulu Q Glitterlance)
- Watch out: Whimsy disarms Morgana for 2 s: no basic attacks.

### 6. Xayah (net +0.51)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Lulu's Wild Growth. Untargetable for 1.5 s, long enough to use ahead of Wild Growth. (Xayah R Featherstorm → Lulu R Wild Growth)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Lulu's Whimsy. Untargetable for 1.5 s, long enough to use ahead of Whimsy. (Xayah R Featherstorm → Lulu W Whimsy)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Lulu's Help, Pix!. Untargetable for 1.5 s, long enough to use ahead of Help, Pix!. (Xayah R Featherstorm → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Xayah for 2 s: no basic attacks.

### 7. Rek'Sai (net +0.48)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Lulu's Wild Growth. Untargetable for 1.5 s, long enough to use ahead of Wild Growth. (Rek'Sai R Void Rush → Lulu R Wild Growth)
- **0.24** untargetable: Void Rush makes Rek'Sai untargetable, dodging Lulu's Whimsy. Untargetable for 1.5 s, long enough to use ahead of Whimsy. (Rek'Sai R Void Rush → Lulu W Whimsy)
- **0.21** untargetable: Void Rush makes Rek'Sai untargetable, dodging Lulu's Help, Pix!. Untargetable for 1.5 s, long enough to use ahead of Help, Pix!. (Rek'Sai R Void Rush → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Rek'Sai for 2 s: no basic attacks.

### 8. Elise (net +0.45)

- **0.48** untargetable: Rappel makes Elise untargetable, dodging Lulu's Wild Growth. Untargetable for 0.6 s; Wild Growth lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Lulu R Wild Growth)
- **0.45** untargetable: Rappel makes Elise untargetable, dodging Lulu's Whimsy. Untargetable for 0.6 s; Whimsy takes 0.53 s to land, enough to react. (Elise E Rappel → Lulu W Whimsy)
- **0.18** untargetable: Rappel makes Elise untargetable, dodging Lulu's Help, Pix!. Untargetable for 0.6 s; Help, Pix! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Elise for 2 s: no basic attacks.

### 9. Nocturne (net +0.43)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Lulu's Wild Growth. Spell shield for 1.5 s, long enough to use ahead of Wild Growth. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Lulu R Wild Growth)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Lulu's Whimsy. Spell shield for 1.5 s, long enough to use ahead of Whimsy. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Lulu W Whimsy)
- **0.18** spell shield: Shroud of Darkness's spell shield blocks part of Lulu's Help, Pix!. Spell shield for 1.5 s, long enough to use ahead of Help, Pix!. A spell shield blocks only the first enemy ability that reaches it. Spell shield and Riposte will block the damage but Pix will still follow regardless. (Nocturne W Shroud of Darkness → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Nocturne for 2 s: no basic attacks.

### 10. Mel (net +0.33)

- **0.37** projectile block: Rebuttal blocks Lulu's Whimsy, a projectile. Rebuttal for 0.75 s; Whimsy takes 0.53 s to land, enough to react. (Mel W Rebuttal → Lulu W Whimsy)
- **0.30** projectile block: Rebuttal blocks Lulu's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Lulu basic attacks)
- **0.25** projectile block: Rebuttal blocks Lulu's Glitterlance, a projectile. Rebuttal for 0.75 s; Glitterlance takes 0.91 s to land, enough to react. (Mel W Rebuttal → Lulu Q Glitterlance)
- Watch out: Whimsy disarms Mel for 2 s: no basic attacks.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Lissandra | +0.76 | 0.97 | 0.21 |  |
| 2 | Vladimir | +0.67 | 1.11 | 0.44 |  |
| 3 | Bard | +0.61 | 0.97 | 0.36 |  |
| 4 | Sivir | +0.59 | 1.06 | 0.47 |  |
| 5 | Morgana | +0.55 | 0.95 | 0.40 |  |
| 6 | Xayah | +0.51 | 0.87 | 0.36 |  |
| 7 | Rek'Sai | +0.48 | 0.98 | 0.50 |  |
| 8 | Elise | +0.45 | 0.75 | 0.30 |  |
| 9 | Nocturne | +0.43 | 1.15 | 0.72 |  |
| 10 | Mel | +0.33 | 0.58 | 0.25 |  |
| 11 | Samira | +0.32 | 0.62 | 0.30 | projectile block (Blade Whirl) |
| 12 | Kalista | +0.28 | 0.58 | 0.30 |  |
| 13 | Yasuo | +0.23 | 0.72 | 0.49 | projectile block (Wind Wall) |
| 14 | Udyr | +0.21 | 0.96 | 0.75 |  |
| 15 | Fiora | +0.20 | 0.86 | 0.66 |  |
| 16 | Braum | +0.17 | 0.83 | 0.66 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 17 | Master Yi | +0.16 | 0.97 | 0.81 |  |
| 18 | Aurora | +0.16 | 0.58 | 0.42 |  |
| 19 | Maokai | +0.15 | 0.76 | 0.61 |  |
| 20 | Ekko | +0.11 | 0.65 | 0.54 |  |
| 21 | Camille | +0.07 | 0.61 | 0.54 |  |
| 22 | Evelynn | +0.06 | 0.63 | 0.57 |  |
| 23 | Zed | +0.06 | 0.57 | 0.51 |  |
| 24 | Gwen | +0.05 | 0.75 | 0.70 |  |
| 25 | Alistar | +0.05 | 0.71 | 0.66 |  |
| 26 | Teemo | +0.05 | 0.47 | 0.42 | blind (Blinding Dart) |
| 27 | Zaahen | +0.04 | 0.56 | 0.52 |  |
| 28 | Kled | -0.05 | 0.48 | 0.53 |  |
| 29 | Tristana | -0.07 | 0.27 | 0.34 |  |
| 30 | Heimerdinger | -0.07 | 0.12 | 0.19 |  |
| 31 | Kayle | -0.10 | 0.24 | 0.34 |  |
| 32 | Warwick | -0.11 | 0.65 | 0.76 |  |
| 33 | Shaco | -0.11 | 0.63 | 0.74 |  |
| 34 | Sion | -0.12 | 0.89 | 1.01 |  |
| 35 | Yuumi | -0.12 | 0.77 | 0.89 |  |
| 36 | Malzahar | -0.12 | 0.49 | 0.61 |  |
| 37 | Annie | -0.13 | 0.08 | 0.21 |  |
| 38 | Milio | -0.16 | 0.20 | 0.36 |  |
| 39 | Vex | -0.17 | 0.08 | 0.25 |  |
| 40 | Swain | -0.19 | 0.00 | 0.19 |  |
| 41 | Olaf | -0.20 | 0.88 | 1.08 |  |
| 42 | Corki | -0.20 | 0.08 | 0.28 |  |
| 43 | Ahri | -0.21 | 0.00 | 0.21 |  |
| 44 | Brand | -0.21 | 0.00 | 0.21 |  |
| 45 | Cassiopeia | -0.21 | 0.00 | 0.21 |  |
| 46 | Hwei | -0.21 | 0.00 | 0.21 |  |
| 47 | Karma | -0.21 | 0.00 | 0.21 |  |
| 48 | Nami | -0.21 | 0.00 | 0.21 |  |
| 49 | Syndra | -0.21 | 0.00 | 0.21 |  |
| 50 | Gangplank | -0.22 | 0.77 | 0.99 |  |
| 51 | Anivia | -0.22 | 0.00 | 0.22 |  |
| 52 | Veigar | -0.22 | 0.00 | 0.22 |  |
| 53 | Zyra | -0.22 | 0.00 | 0.22 |  |
| 54 | Aphelios | -0.24 | 0.12 | 0.36 |  |
| 55 | Azir | -0.25 | 0.00 | 0.25 |  |
| 56 | Orianna | -0.25 | 0.00 | 0.25 |  |
| 57 | Soraka | -0.25 | 0.00 | 0.25 |  |
| 58 | Ziggs | -0.25 | 0.00 | 0.25 |  |
| 59 | Kayn | -0.26 | 0.63 | 0.89 |  |
| 60 | Aurelion Sol | -0.27 | 0.00 | 0.27 |  |
| 61 | Jinx | -0.27 | 0.00 | 0.27 |  |
| 62 | Kennen | -0.27 | 0.00 | 0.27 |  |
| 63 | Kog'Maw | -0.27 | 0.00 | 0.27 |  |
| 64 | Lux | -0.27 | 0.00 | 0.27 |  |
| 65 | Seraphine | -0.27 | 0.00 | 0.27 |  |
| 66 | Jax | -0.28 | 0.38 | 0.66 |  |
| 67 | Nidalee | -0.28 | 0.00 | 0.28 |  |
| 68 | Thresh | -0.28 | 0.00 | 0.28 |  |
| 69 | LeBlanc | -0.29 | 0.00 | 0.29 |  |
| 70 | Ezreal | -0.30 | 0.00 | 0.30 |  |
| 71 | Jayce | -0.30 | 0.00 | 0.30 |  |
| 72 | Smolder | -0.30 | 0.00 | 0.30 |  |
| 73 | Viktor | -0.30 | 0.00 | 0.30 |  |
| 74 | Zilean | -0.30 | 0.00 | 0.30 |  |
| 75 | Zoe | -0.30 | 0.00 | 0.30 |  |
| 76 | Malphite | -0.31 | 0.32 | 0.63 |  |
| 77 | Varus | -0.31 | 0.00 | 0.31 |  |
| 78 | Gnar | -0.32 | 0.00 | 0.32 |  |
| 79 | Neeko | -0.32 | 0.00 | 0.32 |  |
| 80 | Yone | -0.34 | 0.08 | 0.42 |  |
| 81 | Ashe | -0.34 | 0.00 | 0.34 |  |
| 82 | Draven | -0.34 | 0.00 | 0.34 |  |
| 83 | Yunara | -0.34 | 0.00 | 0.34 |  |
| 84 | Ivern | -0.35 | 0.00 | 0.35 |  |
| 85 | Renata Glasc | -0.36 | 0.00 | 0.36 |  |
| 86 | Graves | -0.37 | 0.00 | 0.37 |  |
| 87 | Ornn | -0.39 | 0.08 | 0.47 |  |
| 88 | Sona | -0.39 | 0.00 | 0.39 |  |
| 89 | Kindred | -0.41 | 0.06 | 0.47 |  |
| 90 | Lillia | -0.41 | 0.00 | 0.41 |  |
| 91 | Senna | -0.41 | 0.00 | 0.41 |  |
| 92 | Zeri | -0.41 | 0.00 | 0.41 |  |
| 93 | K'Sante | -0.42 | 0.16 | 0.58 |  |
| 94 | Pantheon | -0.42 | 0.15 | 0.57 |  |
| 95 | Fizz | -0.42 | 0.00 | 0.42 |  |
| 96 | Rakan | -0.42 | 0.00 | 0.42 |  |
| 97 | Rammus | -0.43 | 0.36 | 0.79 |  |
| 98 | Nilah | -0.43 | 0.33 | 0.76 |  |
| 99 | Jarvan IV | -0.43 | 0.08 | 0.51 |  |
| 100 | Urgot | -0.43 | 0.00 | 0.43 |  |
| 101 | Caitlyn | -0.44 | 0.18 | 0.62 |  |
| 102 | Hecarim | -0.44 | 0.08 | 0.52 |  |
| 103 | Sylas | -0.44 | 0.00 | 0.44 |  |
| 104 | Rengar | -0.45 | 0.77 | 1.22 |  |
| 105 | Volibear | -0.46 | 0.08 | 0.54 |  |
| 106 | Ambessa | -0.47 | 0.00 | 0.47 |  |
| 107 | Kai'Sa | -0.47 | 0.00 | 0.47 |  |
| 108 | Lee Sin | -0.49 | 0.00 | 0.49 |  |
| 109 | Quinn | -0.50 | 0.00 | 0.50 |  |
| 110 | Twitch | -0.51 | 0.00 | 0.51 |  |
| 111 | Jhin | -0.53 | 0.00 | 0.53 |  |
| 112 | Vel'Koz | -0.53 | 0.00 | 0.53 |  |
| 113 | Vayne | -0.54 | 0.00 | 0.54 |  |
| 114 | Illaoi | -0.55 | 0.08 | 0.63 |  |
| 115 | Shyvana | -0.55 | 0.08 | 0.63 |  |
| 116 | Briar | -0.55 | 0.00 | 0.55 |  |
| 117 | Rell | -0.55 | 0.00 | 0.55 |  |
| 118 | Xerath | -0.56 | 0.00 | 0.56 |  |
| 119 | Irelia | -0.57 | 0.00 | 0.57 |  |
| 120 | Ryze | -0.57 | 0.00 | 0.57 |  |
| 121 | Sett | -0.58 | 0.08 | 0.66 |  |
| 122 | Galio | -0.58 | 0.00 | 0.58 |  |
| 123 | Miss Fortune | -0.58 | 0.00 | 0.58 |  |
| 124 | Bel'Veth | -0.60 | 0.00 | 0.60 |  |
| 125 | Riven | -0.60 | 0.00 | 0.60 |  |
| 126 | Amumu | -0.61 | 0.00 | 0.61 |  |
| 127 | Diana | -0.61 | 0.00 | 0.61 |  |
| 128 | Fiddlesticks | -0.61 | 0.00 | 0.61 |  |
| 129 | Akali | -0.62 | 0.00 | 0.62 |  |
| 130 | Kassadin | -0.63 | 0.00 | 0.63 |  |
| 131 | Leona | -0.63 | 0.00 | 0.63 |  |
| 132 | Lucian | -0.64 | 0.00 | 0.64 |  |
| 133 | Nautilus | -0.64 | 0.00 | 0.64 |  |
| 134 | Xin Zhao | -0.65 | 0.10 | 0.75 |  |
| 135 | Nasus | -0.66 | 0.36 | 1.02 |  |
| 136 | Renekton | -0.66 | 0.00 | 0.66 |  |
| 137 | Sejuani | -0.66 | 0.00 | 0.66 |  |
| 138 | Karthus | -0.68 | 0.00 | 0.68 |  |
| 139 | Shen | -0.69 | 0.36 | 1.05 |  |
| 140 | Aatrox | -0.70 | 0.00 | 0.70 |  |
| 141 | Pyke | -0.70 | 0.00 | 0.70 |  |
| 142 | Qiyana | -0.70 | 0.00 | 0.70 |  |
| 143 | Vi | -0.72 | 0.08 | 0.80 |  |
| 144 | Locke | -0.72 | 0.00 | 0.72 |  |
| 145 | Talon | -0.72 | 0.00 | 0.72 |  |
| 146 | Akshan | -0.73 | 0.00 | 0.73 |  |
| 147 | Gragas | -0.73 | 0.00 | 0.73 |  |
| 148 | Taliyah | -0.73 | 0.00 | 0.73 |  |
| 149 | Janna | -0.74 | 0.00 | 0.74 |  |
| 150 | Tryndamere | -0.74 | 0.00 | 0.74 |  |
| 151 | Garen | -0.75 | 0.33 | 1.08 |  |
| 152 | Twisted Fate | -0.75 | 0.00 | 0.75 |  |
| 153 | Viego | -0.78 | 0.08 | 0.86 |  |
| 154 | Kha'Zix | -0.79 | 0.00 | 0.79 |  |
| 155 | Poppy | -0.81 | 0.00 | 0.81 |  |
| 156 | Zac | -0.84 | 0.00 | 0.84 |  |
| 157 | Katarina | -0.86 | 0.00 | 0.86 |  |
| 158 | Skarner | -0.87 | 0.15 | 1.02 |  |
| 159 | Tahm Kench | -0.87 | 0.00 | 0.87 |  |
| 160 | Mordekaiser | -0.89 | 0.09 | 0.98 |  |
| 161 | Wukong | -0.89 | 0.00 | 0.89 |  |
| 162 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 163 | Singed | -0.97 | 0.00 | 0.97 |  |
| 164 | Taric | -0.98 | 0.10 | 1.08 |  |
| 165 | Cho'Gath | -0.99 | 0.00 | 0.99 |  |
| 166 | Rumble | -0.99 | 0.00 | 0.99 |  |
| 167 | Darius | -1.02 | 0.00 | 1.02 |  |
| 168 | Dr. Mundo | -1.02 | 0.00 | 1.02 |  |
| 169 | Yorick | -1.04 | 0.00 | 1.04 |  |
| 170 | Nunu & Willump | -1.05 | 0.29 | 1.34 |  |
| 171 | Blitzcrank | -1.06 | 0.00 | 1.06 |  |
| 172 | Trundle | -1.07 | 0.00 | 1.07 |  |
