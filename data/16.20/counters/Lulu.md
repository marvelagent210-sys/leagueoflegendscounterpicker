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

### 2. Vladimir (net +0.64)

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

### 8. Nocturne (net +0.43)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Lulu's Wild Growth. Spell shield for 1.5 s, long enough to use ahead of Wild Growth. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Lulu R Wild Growth)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Lulu's Whimsy. Spell shield for 1.5 s, long enough to use ahead of Whimsy. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Lulu W Whimsy)
- **0.18** spell shield: Shroud of Darkness's spell shield blocks part of Lulu's Help, Pix!. Spell shield for 1.5 s, long enough to use ahead of Help, Pix!. A spell shield blocks only the first enemy ability that reaches it. Spell shield and Riposte will block the damage but Pix will still follow regardless. (Nocturne W Shroud of Darkness → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Nocturne for 2 s: no basic attacks.

### 9. Fizz (net +0.35)

- **0.48** untargetable: Playful makes Fizz untargetable, dodging Lulu's Wild Growth. Untargetable for 0.75 s; Wild Growth lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Lulu R Wild Growth)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Lulu's Whimsy. Untargetable for 0.75 s; Whimsy takes 0.53 s to land, enough to react. (Fizz E Playful → Lulu W Whimsy)
- **0.27** untargetable: Playful makes Fizz untargetable, dodging Lulu's Help, Pix!. Untargetable for 0.75 s; Help, Pix! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Fizz for 2 s: no basic attacks.

### 10. Mel (net +0.33)

- **0.37** projectile block: Rebuttal blocks Lulu's Whimsy, a projectile. Rebuttal for 0.75 s; Whimsy takes 0.53 s to land, enough to react. (Mel W Rebuttal → Lulu W Whimsy)
- **0.30** projectile block: Rebuttal blocks Lulu's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Lulu basic attacks)
- **0.25** projectile block: Rebuttal blocks Lulu's Glitterlance, a projectile. Rebuttal for 0.75 s; Glitterlance takes 0.91 s to land, enough to react. (Mel W Rebuttal → Lulu Q Glitterlance)
- Watch out: Whimsy disarms Mel for 2 s: no basic attacks.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Lissandra | +0.76 | 0.97 | 0.21 |  |
| 2 | Vladimir | +0.64 | 1.11 | 0.47 |  |
| 3 | Bard | +0.61 | 0.97 | 0.36 |  |
| 4 | Sivir | +0.59 | 1.06 | 0.47 |  |
| 5 | Morgana | +0.55 | 0.95 | 0.40 |  |
| 6 | Xayah | +0.51 | 0.87 | 0.36 |  |
| 7 | Rek'Sai | +0.48 | 0.98 | 0.50 |  |
| 8 | Nocturne | +0.43 | 1.15 | 0.72 |  |
| 9 | Fizz | +0.35 | 0.77 | 0.42 |  |
| 10 | Mel | +0.33 | 0.58 | 0.25 |  |
| 11 | Samira | +0.32 | 0.62 | 0.30 | projectile block (Blade Whirl) |
| 12 | Kalista | +0.28 | 0.58 | 0.30 |  |
| 13 | Yasuo | +0.23 | 0.72 | 0.49 | projectile block (Wind Wall) |
| 14 | Udyr | +0.21 | 0.96 | 0.75 |  |
| 15 | Fiora | +0.20 | 0.86 | 0.66 |  |
| 16 | Braum | +0.17 | 0.83 | 0.66 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 17 | Aurora | +0.16 | 0.58 | 0.42 |  |
| 18 | Maokai | +0.15 | 0.76 | 0.61 |  |
| 19 | Master Yi | +0.07 | 0.97 | 0.90 |  |
| 20 | Camille | +0.07 | 0.61 | 0.54 |  |
| 21 | Evelynn | +0.06 | 0.63 | 0.57 |  |
| 22 | Zed | +0.06 | 0.57 | 0.51 |  |
| 23 | Gwen | +0.05 | 0.75 | 0.70 |  |
| 24 | Alistar | +0.05 | 0.71 | 0.66 |  |
| 25 | Teemo | +0.05 | 0.47 | 0.42 | blind (Blinding Dart) |
| 26 | Zaahen | +0.04 | 0.56 | 0.52 |  |
| 27 | Kled | -0.05 | 0.48 | 0.53 |  |
| 28 | Tristana | -0.07 | 0.27 | 0.34 |  |
| 29 | Heimerdinger | -0.07 | 0.12 | 0.19 |  |
| 30 | Kayle | -0.10 | 0.24 | 0.34 |  |
| 31 | Shaco | -0.11 | 0.63 | 0.74 |  |
| 32 | Annie | -0.13 | 0.08 | 0.21 |  |
| 33 | Milio | -0.16 | 0.20 | 0.36 |  |
| 34 | Vex | -0.17 | 0.08 | 0.25 |  |
| 35 | Sion | -0.18 | 0.89 | 1.07 |  |
| 36 | Swain | -0.19 | 0.00 | 0.19 |  |
| 37 | Olaf | -0.20 | 0.88 | 1.08 |  |
| 38 | Ahri | -0.21 | 0.00 | 0.21 |  |
| 39 | Brand | -0.21 | 0.00 | 0.21 |  |
| 40 | Cassiopeia | -0.21 | 0.00 | 0.21 |  |
| 41 | Hwei | -0.21 | 0.00 | 0.21 |  |
| 42 | Karma | -0.21 | 0.00 | 0.21 |  |
| 43 | Nami | -0.21 | 0.00 | 0.21 |  |
| 44 | Syndra | -0.21 | 0.00 | 0.21 |  |
| 45 | Gangplank | -0.22 | 0.77 | 0.99 |  |
| 46 | Anivia | -0.22 | 0.00 | 0.22 |  |
| 47 | Veigar | -0.22 | 0.00 | 0.22 |  |
| 48 | Zyra | -0.22 | 0.00 | 0.22 |  |
| 49 | Aphelios | -0.24 | 0.12 | 0.36 |  |
| 50 | Azir | -0.25 | 0.00 | 0.25 |  |
| 51 | Orianna | -0.25 | 0.00 | 0.25 |  |
| 52 | Soraka | -0.25 | 0.00 | 0.25 |  |
| 53 | Ziggs | -0.25 | 0.00 | 0.25 |  |
| 54 | Jinx | -0.27 | 0.00 | 0.27 |  |
| 55 | Kennen | -0.27 | 0.00 | 0.27 |  |
| 56 | Kog'Maw | -0.27 | 0.00 | 0.27 |  |
| 57 | Lux | -0.27 | 0.00 | 0.27 |  |
| 58 | Seraphine | -0.27 | 0.00 | 0.27 |  |
| 59 | Jax | -0.28 | 0.38 | 0.66 |  |
| 60 | Nidalee | -0.28 | 0.00 | 0.28 |  |
| 61 | Thresh | -0.28 | 0.00 | 0.28 |  |
| 62 | LeBlanc | -0.29 | 0.00 | 0.29 |  |
| 63 | Corki | -0.30 | 0.00 | 0.30 |  |
| 64 | Elise | -0.30 | 0.00 | 0.30 |  |
| 65 | Ezreal | -0.30 | 0.00 | 0.30 |  |
| 66 | Jayce | -0.30 | 0.00 | 0.30 |  |
| 67 | Smolder | -0.30 | 0.00 | 0.30 |  |
| 68 | Viktor | -0.30 | 0.00 | 0.30 |  |
| 69 | Zilean | -0.30 | 0.00 | 0.30 |  |
| 70 | Zoe | -0.30 | 0.00 | 0.30 |  |
| 71 | Yuumi | -0.31 | 0.77 | 1.08 |  |
| 72 | Malphite | -0.31 | 0.32 | 0.63 |  |
| 73 | Aurelion Sol | -0.31 | 0.00 | 0.31 |  |
| 74 | Gnar | -0.32 | 0.00 | 0.32 |  |
| 75 | Neeko | -0.32 | 0.00 | 0.32 |  |
| 76 | Yone | -0.34 | 0.08 | 0.42 |  |
| 77 | Ashe | -0.34 | 0.00 | 0.34 |  |
| 78 | Draven | -0.34 | 0.00 | 0.34 |  |
| 79 | Yunara | -0.34 | 0.00 | 0.34 |  |
| 80 | Renata Glasc | -0.36 | 0.00 | 0.36 |  |
| 81 | Varus | -0.36 | 0.00 | 0.36 |  |
| 82 | Graves | -0.37 | 0.00 | 0.37 |  |
| 83 | Ornn | -0.39 | 0.08 | 0.47 |  |
| 84 | Sona | -0.39 | 0.00 | 0.39 |  |
| 85 | Ivern | -0.41 | 0.00 | 0.41 |  |
| 86 | Lillia | -0.41 | 0.00 | 0.41 |  |
| 87 | Senna | -0.41 | 0.00 | 0.41 |  |
| 88 | Zeri | -0.41 | 0.00 | 0.41 |  |
| 89 | Malzahar | -0.42 | 0.49 | 0.91 |  |
| 90 | K'Sante | -0.42 | 0.16 | 0.58 |  |
| 91 | Rakan | -0.42 | 0.00 | 0.42 |  |
| 92 | Nilah | -0.43 | 0.33 | 0.76 |  |
| 93 | Jarvan IV | -0.43 | 0.08 | 0.51 |  |
| 94 | Urgot | -0.43 | 0.00 | 0.43 |  |
| 95 | Hecarim | -0.44 | 0.08 | 0.52 |  |
| 96 | Sylas | -0.44 | 0.00 | 0.44 |  |
| 97 | Rengar | -0.45 | 0.77 | 1.22 |  |
| 98 | Volibear | -0.46 | 0.08 | 0.54 |  |
| 99 | Ambessa | -0.47 | 0.00 | 0.47 |  |
| 100 | Kai'Sa | -0.47 | 0.00 | 0.47 |  |
| 101 | Kindred | -0.47 | 0.00 | 0.47 |  |
| 102 | Lee Sin | -0.49 | 0.00 | 0.49 |  |
| 103 | Twitch | -0.51 | 0.00 | 0.51 |  |
| 104 | Rammus | -0.54 | 0.36 | 0.90 |  |
| 105 | Ekko | -0.54 | 0.00 | 0.54 |  |
| 106 | Vayne | -0.54 | 0.00 | 0.54 |  |
| 107 | Illaoi | -0.55 | 0.08 | 0.63 |  |
| 108 | Shyvana | -0.55 | 0.08 | 0.63 |  |
| 109 | Briar | -0.55 | 0.00 | 0.55 |  |
| 110 | Rell | -0.55 | 0.00 | 0.55 |  |
| 111 | Irelia | -0.57 | 0.00 | 0.57 |  |
| 112 | Caitlyn | -0.58 | 0.18 | 0.76 |  |
| 113 | Sett | -0.58 | 0.08 | 0.66 |  |
| 114 | Quinn | -0.58 | 0.00 | 0.58 |  |
| 115 | Kayn | -0.60 | 0.63 | 1.23 |  |
| 116 | Bel'Veth | -0.60 | 0.00 | 0.60 |  |
| 117 | Riven | -0.60 | 0.00 | 0.60 |  |
| 118 | Amumu | -0.61 | 0.00 | 0.61 |  |
| 119 | Diana | -0.61 | 0.00 | 0.61 |  |
| 120 | Akali | -0.62 | 0.00 | 0.62 |  |
| 121 | Kassadin | -0.63 | 0.00 | 0.63 |  |
| 122 | Leona | -0.63 | 0.00 | 0.63 |  |
| 123 | Nautilus | -0.64 | 0.00 | 0.64 |  |
| 124 | Xin Zhao | -0.65 | 0.10 | 0.75 |  |
| 125 | Nasus | -0.66 | 0.36 | 1.02 |  |
| 126 | Renekton | -0.66 | 0.00 | 0.66 |  |
| 127 | Sejuani | -0.66 | 0.00 | 0.66 |  |
| 128 | Jhin | -0.69 | 0.00 | 0.69 |  |
| 129 | Vel'Koz | -0.69 | 0.00 | 0.69 |  |
| 130 | Aatrox | -0.70 | 0.00 | 0.70 |  |
| 131 | Qiyana | -0.70 | 0.00 | 0.70 |  |
| 132 | Locke | -0.72 | 0.00 | 0.72 |  |
| 133 | Miss Fortune | -0.72 | 0.00 | 0.72 |  |
| 134 | Talon | -0.72 | 0.00 | 0.72 |  |
| 135 | Xerath | -0.73 | 0.00 | 0.73 |  |
| 136 | Tryndamere | -0.74 | 0.00 | 0.74 |  |
| 137 | Garen | -0.75 | 0.33 | 1.08 |  |
| 138 | Pyke | -0.76 | 0.00 | 0.76 |  |
| 139 | Lucian | -0.78 | 0.00 | 0.78 |  |
| 140 | Kha'Zix | -0.79 | 0.00 | 0.79 |  |
| 141 | Gragas | -0.80 | 0.00 | 0.80 |  |
| 142 | Ryze | -0.81 | 0.00 | 0.81 |  |
| 143 | Karthus | -0.85 | 0.00 | 0.85 |  |
| 144 | Warwick | -0.87 | 0.65 | 1.52 |  |
| 145 | Skarner | -0.87 | 0.15 | 1.02 |  |
| 146 | Vi | -0.87 | 0.08 | 0.95 |  |
| 147 | Viego | -0.87 | 0.08 | 0.95 |  |
| 148 | Akshan | -0.87 | 0.00 | 0.87 |  |
| 149 | Mordekaiser | -0.89 | 0.09 | 0.98 |  |
| 150 | Fiddlesticks | -0.89 | 0.00 | 0.89 |  |
| 151 | Wukong | -0.89 | 0.00 | 0.89 |  |
| 152 | Poppy | -0.91 | 0.00 | 0.91 |  |
| 153 | Twisted Fate | -0.93 | 0.00 | 0.93 |  |
| 154 | Shen | -0.96 | 0.36 | 1.32 |  |
| 155 | Janna | -0.97 | 0.00 | 0.97 |  |
| 156 | Singed | -0.97 | 0.00 | 0.97 |  |
| 157 | Cho'Gath | -0.99 | 0.00 | 0.99 |  |
| 158 | Rumble | -0.99 | 0.00 | 0.99 |  |
| 159 | Katarina | -1.00 | 0.00 | 1.00 |  |
| 160 | Darius | -1.02 | 0.00 | 1.02 |  |
| 161 | Dr. Mundo | -1.02 | 0.00 | 1.02 |  |
| 162 | Yorick | -1.04 | 0.00 | 1.04 |  |
| 163 | Blitzcrank | -1.06 | 0.00 | 1.06 |  |
| 164 | Zac | -1.06 | 0.00 | 1.06 |  |
| 165 | Trundle | -1.07 | 0.00 | 1.07 |  |
| 166 | Taric | -1.08 | 0.00 | 1.08 |  |
| 167 | Taliyah | -1.09 | 0.00 | 1.09 |  |
| 168 | Pantheon | -1.17 | 0.15 | 1.32 |  |
| 169 | Naafiri | -1.21 | 0.00 | 1.21 |  |
| 170 | Tahm Kench | -1.22 | 0.00 | 1.22 |  |
| 171 | Nunu & Willump | -1.30 | 0.29 | 1.59 |  |
| 172 | Galio | -1.45 | 0.00 | 1.45 |  |
