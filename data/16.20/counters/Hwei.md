# Counters to Hwei (patch 26.20)

Every champion ranked by what its kit does against Hwei's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Hwei's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Hwei` for the full ledger of a matchup, with sources.

## Top 10

### 1. Maokai (net +1.01)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Hwei's Grim Visage. Untargetable for 1.4 s; Grim Visage takes 1.1 s to land, enough to react. (Maokai W Twisted Advance → Hwei Q Grim Visage)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Hwei's Gaze of the Abyss. Untargetable for 1.4 s; Gaze of the Abyss takes 0.78 s to land, enough to react. (Maokai W Twisted Advance → Hwei W Gaze of the Abyss)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Hwei's Spiraling Despair. Untargetable for 1.4 s; Spiraling Despair takes 1.21 s to land, enough to react. (Maokai W Twisted Advance → Hwei R Spiraling Despair)
- Watch out: Hwei's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 2. Udyr (net +0.96)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Hwei's Grim Visage (fear, knockdown, slow). Immune for 1.5 s, long enough to use ahead of Grim Visage. (Udyr E Blazing Stampede → Hwei Q Grim Visage)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Hwei's Gaze of the Abyss (root). Immune for 1.5 s, long enough to use ahead of Gaze of the Abyss. (Udyr E Blazing Stampede → Hwei W Gaze of the Abyss)
- **0.45** cc immunity: Blazing Stampede makes Udyr immune to Hwei's Crushing Maw (airborne, slow). Immune for 1.5 s, long enough to use ahead of Crushing Maw. (Udyr E Blazing Stampede → Hwei E Crushing Maw)
- Watch out: Hwei's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range).

### 3. Mel (net +0.94)

- **0.55** projectile block: Rebuttal blocks Hwei's Spiraling Despair, a projectile. Rebuttal for 0.75 s; Spiraling Despair takes 1.21 s to land, enough to react. (Mel W Rebuttal → Hwei R Spiraling Despair)
- **0.44** projectile block: Rebuttal blocks Hwei's Grim Visage, a projectile. Rebuttal for 0.75 s; Grim Visage takes 1.1 s to land, enough to react. (Mel W Rebuttal → Hwei Q Grim Visage)
- **0.44** projectile block: Rebuttal blocks Hwei's Gaze of the Abyss, a projectile. Rebuttal for 0.75 s; Gaze of the Abyss takes 0.78 s to land, enough to react. (Mel W Rebuttal → Hwei W Gaze of the Abyss)

### 4. Nocturne (net +0.92)

- **0.63** spell shield: Shroud of Darkness's spell shield blocks Hwei's Grim Visage. Spell shield for 1.5 s, long enough to use ahead of Grim Visage. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Hwei Q Grim Visage)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Hwei's Gaze of the Abyss. Spell shield for 1.5 s, long enough to use ahead of Gaze of the Abyss. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Hwei W Gaze of the Abyss)
- **0.41** spell shield: Shroud of Darkness's spell shield blocks Hwei's Crushing Maw. Spell shield for 1.5 s, long enough to use ahead of Crushing Maw. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Hwei E Crushing Maw)
- Watch out: Hwei's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 5. Sivir (net +0.88)

- **0.51** spell shield: Spell Shield's spell shield blocks Hwei's Grim Visage. Spell shield for 1.5 s, long enough to use ahead of Grim Visage. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Hwei Q Grim Visage)
- **0.51** spell shield: Spell Shield's spell shield blocks Hwei's Gaze of the Abyss. Spell shield for 1.5 s, long enough to use ahead of Gaze of the Abyss. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Hwei W Gaze of the Abyss)
- **0.33** spell shield: Spell Shield's spell shield blocks Hwei's Crushing Maw. Spell shield for 1.5 s, long enough to use ahead of Crushing Maw. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Hwei E Crushing Maw)

### 6. Lissandra (net +0.82)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Hwei's Spiraling Despair. Untargetable for 2.5 s, long enough to use ahead of Spiraling Despair. (Lissandra R Frozen Tomb → Hwei R Spiraling Despair)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Hwei's Grim Visage. Untargetable for 2.5 s, long enough to use ahead of Grim Visage. (Lissandra R Frozen Tomb → Hwei Q Grim Visage)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Hwei's Gaze of the Abyss. Untargetable for 2.5 s, long enough to use ahead of Gaze of the Abyss. (Lissandra R Frozen Tomb → Hwei W Gaze of the Abyss)

### 7. Vladimir (net +0.81)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Hwei's Spiraling Despair. Untargetable for 2 s, long enough to use ahead of Spiraling Despair. (Vladimir W Sanguine Pool → Hwei R Spiraling Despair)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Hwei's Grim Visage. Untargetable for 2 s, long enough to use ahead of Grim Visage. (Vladimir W Sanguine Pool → Hwei Q Grim Visage)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Hwei's Gaze of the Abyss. Untargetable for 2 s, long enough to use ahead of Gaze of the Abyss. (Vladimir W Sanguine Pool → Hwei W Gaze of the Abyss)
- Watch out: Hwei's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 8. Morgana (net +0.81)

- **0.54** cc immunity: Black Shield makes Morgana immune to Hwei's Grim Visage (fear, knockdown, slow). Immune for 5 s, long enough to use ahead of Grim Visage. (Morgana E Black Shield → Hwei Q Grim Visage)
- **0.54** cc immunity: Black Shield makes Morgana immune to Hwei's Gaze of the Abyss (root). Immune for 5 s, long enough to use ahead of Gaze of the Abyss. (Morgana E Black Shield → Hwei W Gaze of the Abyss)
- **0.35** cc immunity: Black Shield makes Morgana immune to Hwei's Crushing Maw (airborne, slow). Immune for 5 s, long enough to use ahead of Crushing Maw. (Morgana E Black Shield → Hwei E Crushing Maw)
- Watch out: Hwei's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

### 9. Yuumi (net +0.76)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Hwei's Grim Visage. Untargetable for ?; Grim Visage takes 1.1 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Hwei Q Grim Visage)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Hwei's Gaze of the Abyss. Untargetable for ?; Gaze of the Abyss takes 0.78 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Hwei W Gaze of the Abyss)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Hwei's Spiraling Despair. Untargetable for ?; Spiraling Despair takes 1.21 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Hwei R Spiraling Despair)
- Watch out: Grim Visage's fear interrupts Yuumi's Final Chapter (normal channel).

### 10. Xayah (net +0.75)

- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Hwei's Spiraling Despair. Untargetable for 1.5 s, long enough to use ahead of Spiraling Despair. (Xayah R Featherstorm → Hwei R Spiraling Despair)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Hwei's Grim Visage. Untargetable for 1.5 s, long enough to use ahead of Grim Visage. (Xayah R Featherstorm → Hwei Q Grim Visage)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Hwei's Gaze of the Abyss. Untargetable for 1.5 s, long enough to use ahead of Gaze of the Abyss. (Xayah R Featherstorm → Hwei W Gaze of the Abyss)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Maokai | +1.01 | 1.24 | 0.23 |  |
| 2 | Udyr | +0.96 | 1.19 | 0.23 |  |
| 3 | Mel | +0.94 | 0.94 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal), projectile block (Rebuttal) |
| 4 | Nocturne | +0.92 | 1.15 | 0.23 |  |
| 5 | Sivir | +0.88 | 0.88 | 0.00 |  |
| 6 | Lissandra | +0.82 | 0.82 | 0.00 |  |
| 7 | Vladimir | +0.81 | 1.00 | 0.19 |  |
| 8 | Morgana | +0.81 | 0.92 | 0.11 |  |
| 9 | Yuumi | +0.76 | 1.24 | 0.48 |  |
| 10 | Xayah | +0.75 | 0.75 | 0.00 |  |
| 11 | Elise | +0.74 | 0.97 | 0.23 |  |
| 12 | Master Yi | +0.71 | 1.15 | 0.44 |  |
| 13 | Braum | +0.70 | 1.28 | 0.58 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 14 | Yasuo | +0.70 | 1.02 | 0.32 | projectile block (Wind Wall), projectile block (Wind Wall), projectile block (Wind Wall) |
| 15 | Fiora | +0.63 | 1.16 | 0.53 |  |
| 16 | Zed | +0.60 | 0.75 | 0.15 |  |
| 17 | Kayle | +0.56 | 0.56 | 0.00 |  |
| 18 | Samira | +0.55 | 0.96 | 0.41 | projectile block (Blade Whirl), projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 19 | Bard | +0.52 | 0.82 | 0.30 |  |
| 20 | Shaco | +0.47 | 0.82 | 0.35 |  |
| 21 | Milio | +0.45 | 0.45 | 0.00 |  |
| 22 | Ekko | +0.37 | 0.85 | 0.48 |  |
| 23 | Gwen | +0.34 | 0.97 | 0.63 |  |
| 24 | Gangplank | +0.32 | 0.78 | 0.46 |  |
| 25 | Rek'Sai | +0.29 | 0.83 | 0.54 |  |
| 26 | Teemo | +0.22 | 0.30 | 0.08 |  |
| 27 | Warwick | +0.21 | 0.66 | 0.45 |  |
| 28 | Kalista | +0.21 | 0.43 | 0.22 |  |
| 29 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 30 | Malzahar | +0.20 | 0.60 | 0.40 |  |
| 31 | Evelynn | +0.19 | 0.82 | 0.63 |  |
| 32 | Aurora | +0.15 | 0.75 | 0.60 |  |
| 33 | Aphelios | +0.12 | 0.12 | 0.00 |  |
| 34 | Heimerdinger | +0.12 | 0.12 | 0.00 |  |
| 35 | Olaf | +0.11 | 0.57 | 0.46 |  |
| 36 | Kayn | +0.09 | 0.82 | 0.73 |  |
| 37 | Zaahen | +0.08 | 0.57 | 0.49 |  |
| 38 | Garen | +0.08 | 0.51 | 0.43 |  |
| 39 | Annie | +0.08 | 0.08 | 0.00 |  |
| 40 | Kindred | +0.07 | 0.35 | 0.28 |  |
| 41 | Vex | +0.07 | 0.07 | 0.00 |  |
| 42 | Sion | +0.04 | 0.60 | 0.56 |  |
| 43 | Rengar | +0.03 | 0.95 | 0.92 |  |
| 44 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 45 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 46 | Brand | 0.00 | 0.00 | 0.00 |  |
| 47 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 48 | Draven | 0.00 | 0.00 | 0.00 |  |
| 49 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 50 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 51 | Karma | 0.00 | 0.00 | 0.00 |  |
| 52 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 53 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 54 | Lux | 0.00 | 0.00 | 0.00 |  |
| 55 | Nami | 0.00 | 0.00 | 0.00 |  |
| 56 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 57 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 58 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 59 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 60 | Sona | 0.00 | 0.00 | 0.00 |  |
| 61 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 62 | Swain | 0.00 | 0.00 | 0.00 |  |
| 63 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 64 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 65 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 66 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 67 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 68 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 69 | Malphite | -0.01 | 0.22 | 0.23 |  |
| 70 | Camille | -0.02 | 0.79 | 0.81 |  |
| 71 | Tristana | -0.03 | 0.27 | 0.30 |  |
| 72 | Pantheon | -0.07 | 0.50 | 0.57 |  |
| 73 | Taric | -0.11 | 0.35 | 0.46 |  |
| 74 | Neeko | -0.11 | 0.00 | 0.11 |  |
| 75 | Senna | -0.11 | 0.00 | 0.11 |  |
| 76 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 77 | Varus | -0.11 | 0.00 | 0.11 |  |
| 78 | Kled | -0.13 | 0.55 | 0.68 |  |
| 79 | Mordekaiser | -0.14 | 0.29 | 0.43 |  |
| 80 | Sett | -0.16 | 0.07 | 0.23 |  |
| 81 | Shyvana | -0.16 | 0.07 | 0.23 |  |
| 82 | Alistar | -0.17 | 0.46 | 0.63 |  |
| 83 | Nasus | -0.23 | 0.23 | 0.46 |  |
| 84 | Caitlyn | -0.23 | 0.18 | 0.41 |  |
| 85 | Corki | -0.23 | 0.07 | 0.30 |  |
| 86 | Jayce | -0.23 | 0.00 | 0.23 |  |
| 87 | Kassadin | -0.23 | 0.00 | 0.23 |  |
| 88 | Nidalee | -0.23 | 0.00 | 0.23 |  |
| 89 | Xin Zhao | -0.24 | 0.37 | 0.61 |  |
| 90 | Rammus | -0.27 | 0.23 | 0.50 |  |
| 91 | Hecarim | -0.27 | 0.07 | 0.34 |  |
| 92 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 93 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 94 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 95 | Yunara | -0.28 | 0.00 | 0.28 |  |
| 96 | Jax | -0.29 | 0.24 | 0.53 |  |
| 97 | Illaoi | -0.30 | 0.07 | 0.37 |  |
| 98 | Zeri | -0.30 | 0.00 | 0.30 |  |
| 99 | Skarner | -0.31 | 0.15 | 0.46 |  |
| 100 | K'Sante | -0.32 | 0.14 | 0.46 |  |
| 101 | Vayne | -0.32 | 0.00 | 0.32 |  |
| 102 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 103 | Volibear | -0.33 | 0.07 | 0.40 |  |
| 104 | Aurelion Sol | -0.34 | 0.00 | 0.34 |  |
| 105 | Ahri | -0.35 | 0.00 | 0.35 |  |
| 106 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 107 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 108 | Yone | -0.36 | 0.07 | 0.43 |  |
| 109 | Azir | -0.36 | 0.00 | 0.36 |  |
| 110 | Nilah | -0.38 | 0.21 | 0.59 |  |
| 111 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 112 | Janna | -0.40 | 0.00 | 0.40 |  |
| 113 | Bel'Veth | -0.42 | 0.00 | 0.42 |  |
| 114 | Darius | -0.43 | 0.00 | 0.43 |  |
| 115 | Lillia | -0.43 | 0.00 | 0.43 |  |
| 116 | Trundle | -0.43 | 0.00 | 0.43 |  |
| 117 | Yorick | -0.43 | 0.00 | 0.43 |  |
| 118 | Ziggs | -0.43 | 0.00 | 0.43 |  |
| 119 | Jarvan IV | -0.44 | 0.07 | 0.51 |  |
| 120 | Lucian | -0.44 | 0.00 | 0.44 |  |
| 121 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 122 | Galio | -0.45 | 0.00 | 0.45 |  |
| 123 | Gnar | -0.45 | 0.00 | 0.45 |  |
| 124 | Blitzcrank | -0.46 | 0.00 | 0.46 |  |
| 125 | Cho'Gath | -0.46 | 0.00 | 0.46 |  |
| 126 | Dr. Mundo | -0.46 | 0.00 | 0.46 |  |
| 127 | Kai'Sa | -0.46 | 0.00 | 0.46 |  |
| 128 | Rumble | -0.46 | 0.00 | 0.46 |  |
| 129 | Singed | -0.46 | 0.00 | 0.46 |  |
| 130 | Ambessa | -0.47 | 0.00 | 0.47 |  |
| 131 | LeBlanc | -0.47 | 0.00 | 0.47 |  |
| 132 | Quinn | -0.47 | 0.00 | 0.47 |  |
| 133 | Aatrox | -0.49 | 0.00 | 0.49 |  |
| 134 | Irelia | -0.50 | 0.00 | 0.50 |  |
| 135 | Katarina | -0.51 | 0.00 | 0.51 |  |
| 136 | Thresh | -0.52 | 0.00 | 0.52 |  |
| 137 | Urgot | -0.54 | 0.00 | 0.54 |  |
| 138 | Graves | -0.55 | 0.00 | 0.55 |  |
| 139 | Ivern | -0.55 | 0.00 | 0.55 |  |
| 140 | Tryndamere | -0.56 | 0.00 | 0.56 |  |
| 141 | Akshan | -0.58 | 0.00 | 0.58 |  |
| 142 | Leona | -0.61 | 0.00 | 0.61 |  |
| 143 | Nautilus | -0.61 | 0.00 | 0.61 |  |
| 144 | Diana | -0.63 | 0.00 | 0.63 |  |
| 145 | Locke | -0.63 | 0.00 | 0.63 |  |
| 146 | Renekton | -0.63 | 0.00 | 0.63 |  |
| 147 | Shen | -0.65 | 0.23 | 0.88 |  |
| 148 | Vi | -0.65 | 0.07 | 0.72 |  |
| 149 | Fizz | -0.66 | 0.00 | 0.66 |  |
| 150 | Viego | -0.69 | 0.07 | 0.76 |  |
| 151 | Nunu & Willump | -0.70 | 0.25 | 0.95 |  |
| 152 | Briar | -0.70 | 0.00 | 0.70 |  |
| 153 | Tahm Kench | -0.71 | 0.00 | 0.71 |  |
| 154 | Talon | -0.71 | 0.00 | 0.71 |  |
| 155 | Lee Sin | -0.72 | 0.00 | 0.72 |  |
| 156 | Taliyah | -0.72 | 0.00 | 0.72 |  |
| 157 | Amumu | -0.73 | 0.00 | 0.73 |  |
| 158 | Poppy | -0.73 | 0.00 | 0.73 |  |
| 159 | Sejuani | -0.73 | 0.00 | 0.73 |  |
| 160 | Ornn | -0.77 | 0.07 | 0.84 |  |
| 161 | Rell | -0.77 | 0.00 | 0.77 |  |
| 162 | Rakan | -0.79 | 0.00 | 0.79 |  |
| 163 | Riven | -0.80 | 0.00 | 0.80 |  |
| 164 | Gragas | -0.81 | 0.00 | 0.81 |  |
| 165 | Qiyana | -0.83 | 0.00 | 0.83 |  |
| 166 | Kha'Zix | -0.84 | 0.00 | 0.84 |  |
| 167 | Pyke | -0.84 | 0.00 | 0.84 |  |
| 168 | Naafiri | -0.87 | 0.00 | 0.87 |  |
| 169 | Sylas | -0.87 | 0.00 | 0.87 |  |
| 170 | Akali | -0.91 | 0.00 | 0.91 |  |
| 171 | Wukong | -0.91 | 0.00 | 0.91 |  |
| 172 | Zac | -0.91 | 0.00 | 0.91 |  |
