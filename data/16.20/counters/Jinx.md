# Counters to Jinx (patch 26.20)

Every champion ranked by what its kit does against Jinx's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Jinx's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Jinx` for the full ledger of a matchup, with sources.

## Top 10

### 1. Mel (net +0.76)

- **0.55** projectile block: Rebuttal blocks Jinx's Super Mega Death Rocket!, a projectile. Rebuttal for 0.75 s; Super Mega Death Rocket! takes 0.6 s to land, enough to react. (Mel W Rebuttal → Jinx R Super Mega Death Rocket!)
- **0.27** projectile block: Rebuttal blocks Jinx's Zap!, a projectile. Rebuttal for 0.75 s; Zap! takes 1.05 s to land, enough to react. (Mel W Rebuttal → Jinx W Zap!)
- **0.24** projectile block: Rebuttal blocks Jinx's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Jinx basic attacks)

### 2. Vladimir (net +0.71)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jinx's Super Mega Death Rocket!. Untargetable for 2 s, long enough to use ahead of Super Mega Death Rocket!. (Vladimir W Sanguine Pool → Jinx R Super Mega Death Rocket!)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jinx's Flame Chompers!. Untargetable for 2 s, long enough to use ahead of Flame Chompers!. (Vladimir W Sanguine Pool → Jinx E Flame Chompers!)
- Watch out: Jinx's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

### 3. Yuumi (net +0.69)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Jinx's Super Mega Death Rocket!. Untargetable for ?; Super Mega Death Rocket! takes 0.6 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jinx R Super Mega Death Rocket!)
- **0.42** untargetable: You and Me! makes Yuumi untargetable, dodging Jinx's Flame Chompers!. Untargetable for ?; Flame Chompers! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jinx E Flame Chompers!)
- Watch out: Jinx's basic attacks reach 100 units farther than Yuumi's (525 vs 425 attack range).

### 4. Kayle (net +0.68)

- **0.41** invulnerable: Divine Judgment makes Kayle invulnerable to Jinx's Super Mega Death Rocket!. Invulnerable for 2.5 s, long enough to use ahead of Super Mega Death Rocket!. (Kayle R Divine Judgment → Jinx R Super Mega Death Rocket!)
- **0.18** range: Kayle's basic attacks reach 100 units farther than Jinx's (625 vs 525 attack range). Jinx has no dash or blink to close the gap. (Kayle basic attacks → Jinx basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Jinx's Flame Chompers! (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Flame Chompers!. (Kayle R Divine Judgment → Jinx E Flame Chompers!)

### 5. Lissandra (net +0.57)

- **0.41** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jinx's Super Mega Death Rocket!. Untargetable for 2.5 s, long enough to use ahead of Super Mega Death Rocket!. (Lissandra R Frozen Tomb → Jinx R Super Mega Death Rocket!)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jinx's Flame Chompers!. Untargetable for 2.5 s, long enough to use ahead of Flame Chompers!. (Lissandra R Frozen Tomb → Jinx E Flame Chompers!)

### 6. Master Yi (net +0.54)

- **0.55** untargetable: Alpha Strike makes Master Yi untargetable, dodging Jinx's Super Mega Death Rocket!. Untargetable for ?; Super Mega Death Rocket! takes 0.6 s to land, enough to react. (Master Yi Q Alpha Strike → Jinx R Super Mega Death Rocket!)
- **0.31** untargetable: Alpha Strike makes Master Yi untargetable, dodging Jinx's Flame Chompers!. Untargetable for ?; Flame Chompers! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Jinx E Flame Chompers!)
- **0.06** cc immunity: Highlander makes Master Yi immune to Jinx's Zap! slow. Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Jinx W Zap!)
- Watch out: Jinx's basic attacks reach 350 units farther than Master Yi's (525 vs 175 attack range).

### 7. Xayah (net +0.53)

- **0.37** untargetable: Featherstorm makes Xayah untargetable, dodging Jinx's Super Mega Death Rocket!. Untargetable for 1.5 s, long enough to use ahead of Super Mega Death Rocket!. (Xayah R Featherstorm → Jinx R Super Mega Death Rocket!)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Jinx's Flame Chompers!. Untargetable for 1.5 s, long enough to use ahead of Flame Chompers!. (Xayah R Featherstorm → Jinx E Flame Chompers!)

### 8. Elise (net +0.48)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Jinx's Super Mega Death Rocket!. Untargetable for 0.6 s; Super Mega Death Rocket! takes 0.6 s to land, enough to react. (Elise E Rappel → Jinx R Super Mega Death Rocket!)
- **0.31** untargetable: Rappel makes Elise untargetable, dodging Jinx's Flame Chompers!. Untargetable for 0.6 s; Flame Chompers! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Jinx E Flame Chompers!)
- Watch out: Flame Chompers!'s knockdown can stop Elise's Venomous Bite mid-dash.

### 9. Maokai (net +0.47)

- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Jinx's Super Mega Death Rocket!. Untargetable for 1.4 s; Super Mega Death Rocket! takes 0.6 s to land, enough to react. (Maokai W Twisted Advance → Jinx R Super Mega Death Rocket!)
- **0.42** untargetable: Twisted Advance makes Maokai untargetable, dodging Jinx's Flame Chompers!. Untargetable for 1.4 s; Flame Chompers! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Jinx E Flame Chompers!)
- Watch out: Jinx's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

### 10. Udyr (net +0.47)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Jinx's Flame Chompers! (knockdown, root). Immune for 1.5 s, long enough to use ahead of Flame Chompers!. (Udyr E Blazing Stampede → Jinx E Flame Chompers!)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Jinx's Zap! (slow). Immune for 1.5 s, long enough to use ahead of Zap!. (Udyr E Blazing Stampede → Jinx W Zap!)
- Watch out: Jinx's basic attacks reach 400 units farther than Udyr's (525 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Mel | +0.76 | 0.76 | 0.00 | projectile block (Rebuttal) |
| 2 | Vladimir | +0.71 | 0.82 | 0.11 |  |
| 3 | Yuumi | +0.69 | 0.76 | 0.07 |  |
| 4 | Kayle | +0.68 | 0.68 | 0.00 |  |
| 5 | Lissandra | +0.57 | 0.57 | 0.00 |  |
| 6 | Master Yi | +0.54 | 0.79 | 0.25 |  |
| 7 | Xayah | +0.53 | 0.53 | 0.00 |  |
| 8 | Elise | +0.48 | 0.71 | 0.23 |  |
| 9 | Maokai | +0.47 | 0.76 | 0.29 |  |
| 10 | Udyr | +0.47 | 0.76 | 0.29 |  |
| 11 | Morgana | +0.47 | 0.58 | 0.11 |  |
| 12 | Yasuo | +0.46 | 0.81 | 0.35 | projectile block (Wind Wall) |
| 13 | Sivir | +0.41 | 0.41 | 0.00 |  |
| 14 | Malzahar | +0.39 | 0.39 | 0.00 |  |
| 15 | Teemo | +0.38 | 0.38 | 0.00 |  |
| 16 | Samira | +0.36 | 0.77 | 0.41 | projectile block (Blade Whirl) |
| 17 | Milio | +0.36 | 0.36 | 0.00 |  |
| 18 | Shaco | +0.32 | 0.51 | 0.19 |  |
| 19 | Zed | +0.28 | 0.47 | 0.19 |  |
| 20 | Bard | +0.27 | 0.57 | 0.30 |  |
| 21 | Lulu | +0.27 | 0.27 | 0.00 |  |
| 22 | Braum | +0.26 | 0.90 | 0.64 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 23 | Fiora | +0.21 | 0.78 | 0.57 |  |
| 24 | Nocturne | +0.21 | 0.50 | 0.29 |  |
| 25 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 26 | Pantheon | +0.13 | 0.68 | 0.55 |  |
| 27 | Senna | +0.12 | 0.12 | 0.00 |  |
| 28 | Ekko | +0.11 | 0.63 | 0.52 |  |
| 29 | Kindred | +0.11 | 0.39 | 0.28 |  |
| 30 | Annie | +0.11 | 0.11 | 0.00 |  |
| 31 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 32 | Warwick | +0.08 | 0.27 | 0.19 |  |
| 33 | Kayn | +0.06 | 0.51 | 0.45 |  |
| 34 | Kalista | +0.06 | 0.28 | 0.22 |  |
| 35 | Aphelios | +0.06 | 0.06 | 0.00 |  |
| 36 | Heimerdinger | +0.06 | 0.06 | 0.00 |  |
| 37 | Gwen | +0.04 | 0.71 | 0.67 |  |
| 38 | Vex | +0.04 | 0.04 | 0.00 |  |
| 39 | Aurora | +0.03 | 0.48 | 0.45 |  |
| 40 | Rek'Sai | +0.02 | 0.59 | 0.57 |  |
| 41 | Tristana | +0.02 | 0.32 | 0.30 |  |
| 42 | Rammus | 0.00 | 0.29 | 0.29 |  |
| 43 | Brand | 0.00 | 0.00 | 0.00 |  |
| 44 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 45 | Draven | 0.00 | 0.00 | 0.00 |  |
| 46 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 47 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 48 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 49 | Janna | 0.00 | 0.00 | 0.00 |  |
| 50 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 51 | Karma | 0.00 | 0.00 | 0.00 |  |
| 52 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 53 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 54 | Lux | 0.00 | 0.00 | 0.00 |  |
| 55 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 56 | Nami | 0.00 | 0.00 | 0.00 |  |
| 57 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 58 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 59 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 60 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 61 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 62 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 63 | Sona | 0.00 | 0.00 | 0.00 |  |
| 64 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 65 | Swain | 0.00 | 0.00 | 0.00 |  |
| 66 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 67 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 68 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 69 | Varus | 0.00 | 0.00 | 0.00 |  |
| 70 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 71 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 72 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 73 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 74 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 75 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 76 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 77 | Caitlyn | -0.04 | 0.22 | 0.26 |  |
| 78 | Malphite | -0.06 | 0.23 | 0.29 |  |
| 79 | Evelynn | -0.08 | 0.51 | 0.59 |  |
| 80 | Gangplank | -0.09 | 0.49 | 0.58 |  |
| 81 | Karthus | -0.11 | 0.00 | 0.11 |  |
| 82 | Taric | -0.12 | 0.42 | 0.54 |  |
| 83 | Sion | -0.13 | 0.38 | 0.51 |  |
| 84 | Vayne | -0.18 | 0.00 | 0.18 |  |
| 85 | Xin Zhao | -0.20 | 0.45 | 0.65 |  |
| 86 | Olaf | -0.22 | 0.36 | 0.58 |  |
| 87 | Garen | -0.23 | 0.28 | 0.51 |  |
| 88 | Shyvana | -0.23 | 0.04 | 0.27 |  |
| 89 | Jayce | -0.23 | 0.00 | 0.23 |  |
| 90 | Nidalee | -0.23 | 0.00 | 0.23 |  |
| 91 | Sett | -0.25 | 0.04 | 0.29 |  |
| 92 | Tahm Kench | -0.25 | 0.00 | 0.25 |  |
| 93 | Corki | -0.26 | 0.04 | 0.30 |  |
| 94 | Kassadin | -0.27 | 0.00 | 0.27 |  |
| 95 | Jax | -0.28 | 0.31 | 0.59 |  |
| 96 | Yunara | -0.28 | 0.00 | 0.28 |  |
| 97 | Nasus | -0.29 | 0.29 | 0.58 |  |
| 98 | Zaahen | -0.29 | 0.23 | 0.52 |  |
| 99 | Katarina | -0.29 | 0.00 | 0.29 |  |
| 100 | Rengar | -0.30 | 0.60 | 0.90 |  |
| 101 | Akshan | -0.30 | 0.00 | 0.30 |  |
| 102 | Aurelion Sol | -0.30 | 0.00 | 0.30 |  |
| 103 | Lucian | -0.30 | 0.00 | 0.30 |  |
| 104 | Zeri | -0.30 | 0.00 | 0.30 |  |
| 105 | Hecarim | -0.33 | 0.04 | 0.37 |  |
| 106 | Camille | -0.34 | 0.50 | 0.84 |  |
| 107 | Nilah | -0.35 | 0.27 | 0.62 |  |
| 108 | Ahri | -0.35 | 0.00 | 0.35 |  |
| 109 | Kai'Sa | -0.35 | 0.00 | 0.35 |  |
| 110 | Azir | -0.36 | 0.00 | 0.36 |  |
| 111 | Quinn | -0.37 | 0.00 | 0.37 |  |
| 112 | Alistar | -0.39 | 0.30 | 0.69 |  |
| 113 | Illaoi | -0.39 | 0.04 | 0.43 |  |
| 114 | Volibear | -0.39 | 0.04 | 0.43 |  |
| 115 | Galio | -0.39 | 0.00 | 0.39 |  |
| 116 | LeBlanc | -0.39 | 0.00 | 0.39 |  |
| 117 | Shen | -0.40 | 0.29 | 0.69 |  |
| 118 | K'Sante | -0.41 | 0.08 | 0.49 |  |
| 119 | Yone | -0.41 | 0.04 | 0.45 |  |
| 120 | Ivern | -0.43 | 0.00 | 0.43 |  |
| 121 | Ziggs | -0.43 | 0.00 | 0.43 |  |
| 122 | Nunu & Willump | -0.44 | 0.14 | 0.58 |  |
| 123 | Mordekaiser | -0.44 | 0.07 | 0.51 |  |
| 124 | Lillia | -0.44 | 0.00 | 0.44 |  |
| 125 | Bel'Veth | -0.45 | 0.00 | 0.45 |  |
| 126 | Gnar | -0.45 | 0.00 | 0.45 |  |
| 127 | Kled | -0.47 | 0.22 | 0.69 |  |
| 128 | Skarner | -0.47 | 0.07 | 0.54 |  |
| 129 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 130 | Jarvan IV | -0.49 | 0.04 | 0.53 |  |
| 131 | Ambessa | -0.51 | 0.00 | 0.51 |  |
| 132 | Darius | -0.51 | 0.00 | 0.51 |  |
| 133 | Trundle | -0.51 | 0.00 | 0.51 |  |
| 134 | Yorick | -0.51 | 0.00 | 0.51 |  |
| 135 | Viego | -0.52 | 0.04 | 0.56 |  |
| 136 | Thresh | -0.52 | 0.00 | 0.52 |  |
| 137 | Vi | -0.53 | 0.04 | 0.57 |  |
| 138 | Aatrox | -0.53 | 0.00 | 0.53 |  |
| 139 | Irelia | -0.54 | 0.00 | 0.54 |  |
| 140 | Graves | -0.55 | 0.00 | 0.55 |  |
| 141 | Urgot | -0.56 | 0.00 | 0.56 |  |
| 142 | Blitzcrank | -0.58 | 0.00 | 0.58 |  |
| 143 | Cho'Gath | -0.58 | 0.00 | 0.58 |  |
| 144 | Dr. Mundo | -0.58 | 0.00 | 0.58 |  |
| 145 | Rumble | -0.58 | 0.00 | 0.58 |  |
| 146 | Singed | -0.58 | 0.00 | 0.58 |  |
| 147 | Tryndamere | -0.60 | 0.00 | 0.60 |  |
| 148 | Talon | -0.61 | 0.00 | 0.61 |  |
| 149 | Nautilus | -0.65 | 0.00 | 0.65 |  |
| 150 | Diana | -0.67 | 0.00 | 0.67 |  |
| 151 | Leona | -0.67 | 0.00 | 0.67 |  |
| 152 | Fizz | -0.68 | 0.00 | 0.68 |  |
| 153 | Pyke | -0.68 | 0.00 | 0.68 |  |
| 154 | Qiyana | -0.68 | 0.00 | 0.68 |  |
| 155 | Kha'Zix | -0.69 | 0.00 | 0.69 |  |
| 156 | Locke | -0.69 | 0.00 | 0.69 |  |
| 157 | Poppy | -0.69 | 0.00 | 0.69 |  |
| 158 | Renekton | -0.69 | 0.00 | 0.69 |  |
| 159 | Zac | -0.72 | 0.00 | 0.72 |  |
| 160 | Briar | -0.73 | 0.00 | 0.73 |  |
| 161 | Wukong | -0.74 | 0.00 | 0.74 |  |
| 162 | Lee Sin | -0.76 | 0.00 | 0.76 |  |
| 163 | Naafiri | -0.76 | 0.00 | 0.76 |  |
| 164 | Sejuani | -0.77 | 0.00 | 0.77 |  |
| 165 | Amumu | -0.79 | 0.00 | 0.79 |  |
| 166 | Gragas | -0.79 | 0.00 | 0.79 |  |
| 167 | Rell | -0.80 | 0.00 | 0.80 |  |
| 168 | Rakan | -0.81 | 0.00 | 0.81 |  |
| 169 | Ornn | -0.83 | 0.04 | 0.87 |  |
| 170 | Akali | -0.84 | 0.00 | 0.84 |  |
| 171 | Riven | -0.84 | 0.00 | 0.84 |  |
| 172 | Sylas | -0.89 | 0.00 | 0.89 |  |
