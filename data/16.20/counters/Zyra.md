# Counters to Zyra (patch 26.20)

Every champion ranked by what its kit does against Zyra's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zyra's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zyra` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.07)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Zyra's Stranglethorns. Untargetable for 0.6 s; Stranglethorns takes 0.25 s to land, enough to react. (Elise E Rappel → Zyra R Stranglethorns)
- **0.54** untargetable: Rappel makes Elise untargetable, dodging Zyra's Grasping Roots. Untargetable for 0.6 s; Grasping Roots takes 1.21 s to land, enough to react. (Elise E Rappel → Zyra E Grasping Roots)

### 2. Nocturne (net +1.05)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Zyra's Stranglethorns. Spell shield for 1.5 s, long enough to use ahead of Stranglethorns. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Zyra R Stranglethorns)
- **0.66** spell shield: Shroud of Darkness's spell shield blocks Zyra's Grasping Roots. Spell shield for 1.5 s, long enough to use ahead of Grasping Roots. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Zyra E Grasping Roots)
- **0.16** cc immunity: Paranoia is displacement immune, ignoring Zyra's Stranglethorns (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Zyra R Stranglethorns)
- Watch out: Zyra's basic attacks reach 450 units farther than Nocturne's (575 vs 125 attack range).

### 3. Fiora (net +1.01)

- **0.90** parry: Riposte parries Zyra's Stranglethorns and stuns back. Parry for 0.75 s; Stranglethorns takes 0.25 s to land, enough to react. Negating Stranglethorns's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Zyra R Stranglethorns)
- **0.67** parry: Riposte parries Zyra's Grasping Roots and stuns back. Parry for 0.75 s; Grasping Roots takes 1.21 s to land, enough to react. Negating Grasping Roots's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Zyra E Grasping Roots)
- **0.06** attack speed slow: Riposte cuts Zyra's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Zyra basic attacks)
- Watch out: Zyra's basic attacks reach 425 units farther than Fiora's (575 vs 150 attack range).

### 4. Sivir (net +0.98)

- **0.80** spell shield: Spell Shield's spell shield blocks Zyra's Stranglethorns. Spell shield for 1.5 s, long enough to use ahead of Stranglethorns. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Zyra R Stranglethorns)
- **0.54** spell shield: Spell Shield's spell shield blocks Zyra's Grasping Roots. Spell shield for 1.5 s, long enough to use ahead of Grasping Roots. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Zyra E Grasping Roots)
- Watch out: Zyra's basic attacks reach 75 units farther than Sivir's (575 vs 500 attack range).

### 5. Lissandra (net +0.97)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Zyra's Stranglethorns. Untargetable for 2.5 s, long enough to use ahead of Stranglethorns. (Lissandra R Frozen Tomb → Zyra R Stranglethorns)
- **0.34** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Zyra's Grasping Roots. Untargetable for 2.5 s, long enough to use ahead of Grasping Roots. (Lissandra R Frozen Tomb → Zyra E Grasping Roots)

### 6. Morgana (net +0.94)

- **0.80** cc immunity: Black Shield makes Morgana immune to Zyra's Stranglethorns (airborne). Immune for 5 s, long enough to use ahead of Stranglethorns. (Morgana E Black Shield → Zyra R Stranglethorns)
- **0.57** cc immunity: Black Shield makes Morgana immune to Zyra's Grasping Roots (root). Immune for 5 s, long enough to use ahead of Grasping Roots. (Morgana E Black Shield → Zyra E Grasping Roots)
- Watch out: Zyra's basic attacks reach 125 units farther than Morgana's (575 vs 450 attack range).

### 7. Bard (net +0.93)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Zyra's Stranglethorns. Untargetable for 2.5 s, long enough to use ahead of Stranglethorns. (Bard R Tempered Fate → Zyra R Stranglethorns)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Zyra's Grasping Roots. Untargetable for 2.5 s, long enough to use ahead of Grasping Roots. (Bard R Tempered Fate → Zyra E Grasping Roots)
- Watch out: Zyra's basic attacks reach 75 units farther than Bard's (575 vs 500 attack range).

### 8. Xayah (net +0.92)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Zyra's Stranglethorns. Untargetable for 1.5 s, long enough to use ahead of Stranglethorns. (Xayah R Featherstorm → Zyra R Stranglethorns)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Zyra's Grasping Roots. Untargetable for 1.5 s, long enough to use ahead of Grasping Roots. (Xayah R Featherstorm → Zyra E Grasping Roots)

### 9. Maokai (net +0.91)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Zyra's Stranglethorns. Untargetable for 1.4 s; Stranglethorns takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Zyra R Stranglethorns)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Zyra's Grasping Roots. Untargetable for 1.4 s; Grasping Roots takes 1.21 s to land, enough to react. (Maokai W Twisted Advance → Zyra E Grasping Roots)
- Watch out: Zyra's basic attacks reach 450 units farther than Maokai's (575 vs 125 attack range).

### 10. Udyr (net +0.91)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Zyra's Stranglethorns (airborne). Immune for 1.5 s, long enough to use ahead of Stranglethorns. (Udyr E Blazing Stampede → Zyra R Stranglethorns)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Zyra's Grasping Roots (root). Immune for 1.5 s, long enough to use ahead of Grasping Roots. (Udyr E Blazing Stampede → Zyra E Grasping Roots)
- Watch out: Zyra's basic attacks reach 450 units farther than Udyr's (575 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.07 | 1.07 | 0.00 |  |
| 2 | Nocturne | +1.05 | 1.29 | 0.24 |  |
| 3 | Fiora | +1.01 | 1.25 | 0.24 |  |
| 4 | Sivir | +0.98 | 1.07 | 0.09 |  |
| 5 | Lissandra | +0.97 | 0.97 | 0.00 |  |
| 6 | Morgana | +0.94 | 1.09 | 0.15 |  |
| 7 | Bard | +0.93 | 0.97 | 0.04 |  |
| 8 | Xayah | +0.92 | 0.92 | 0.00 |  |
| 9 | Maokai | +0.91 | 1.15 | 0.24 |  |
| 10 | Udyr | +0.91 | 1.15 | 0.24 |  |
| 11 | Vladimir | +0.89 | 1.09 | 0.20 |  |
| 12 | Camille | +0.89 | 1.01 | 0.12 |  |
| 13 | Rek'Sai | +0.85 | 1.01 | 0.16 |  |
| 14 | Gwen | +0.83 | 1.07 | 0.24 |  |
| 15 | Ekko | +0.83 | 0.99 | 0.16 |  |
| 16 | Zaahen | +0.81 | 0.97 | 0.16 |  |
| 17 | Aurora | +0.81 | 0.96 | 0.15 |  |
| 18 | Warwick | +0.80 | 1.14 | 0.34 |  |
| 19 | Kled | +0.77 | 0.87 | 0.10 |  |
| 20 | Zed | +0.76 | 0.92 | 0.16 |  |
| 21 | Evelynn | +0.73 | 0.97 | 0.24 |  |
| 22 | Master Yi | +0.72 | 1.07 | 0.35 |  |
| 23 | Yuumi | +0.68 | 1.15 | 0.47 |  |
| 24 | Kalista | +0.67 | 0.67 | 0.00 |  |
| 25 | Braum | +0.63 | 0.87 | 0.24 | projectile block (Unbreakable) |
| 26 | Shaco | +0.61 | 0.97 | 0.36 |  |
| 27 | Samira | +0.56 | 0.59 | 0.03 | projectile block (Blade Whirl) |
| 28 | Mel | +0.56 | 0.56 | 0.00 | projectile block (Rebuttal) |
| 29 | Alistar | +0.54 | 0.78 | 0.24 |  |
| 30 | Yasuo | +0.52 | 0.68 | 0.16 | projectile block (Wind Wall) |
| 31 | Olaf | +0.49 | 0.97 | 0.48 |  |
| 32 | Kayle | +0.49 | 0.49 | 0.00 |  |
| 33 | Sion | +0.42 | 0.98 | 0.56 |  |
| 34 | Gangplank | +0.41 | 0.89 | 0.48 |  |
| 35 | Kayn | +0.39 | 0.97 | 0.58 |  |
| 36 | Kindred | +0.38 | 0.42 | 0.04 |  |
| 37 | Milio | +0.35 | 0.35 | 0.00 |  |
| 38 | Pantheon | +0.33 | 0.54 | 0.21 |  |
| 39 | Rengar | +0.30 | 0.92 | 0.62 |  |
| 40 | Xin Zhao | +0.22 | 0.46 | 0.24 |  |
| 41 | Lulu | +0.22 | 0.22 | 0.00 |  |
| 42 | Tristana | +0.22 | 0.22 | 0.00 |  |
| 43 | K'Sante | +0.20 | 0.32 | 0.12 |  |
| 44 | Corki | +0.16 | 0.16 | 0.00 |  |
| 45 | Vex | +0.16 | 0.16 | 0.00 |  |
| 46 | Teemo | +0.14 | 0.31 | 0.17 |  |
| 47 | Malzahar | +0.11 | 0.57 | 0.46 |  |
| 48 | Malphite | +0.08 | 0.32 | 0.24 |  |
| 49 | Jarvan IV | +0.04 | 0.16 | 0.12 |  |
| 50 | Yone | +0.04 | 0.16 | 0.12 |  |
| 51 | Jax | +0.01 | 0.25 | 0.24 |  |
| 52 | Nilah | +0.01 | 0.22 | 0.21 |  |
| 53 | Hecarim | +0.01 | 0.17 | 0.16 |  |
| 54 | Ornn | 0.00 | 0.16 | 0.16 |  |
| 55 | Volibear | 0.00 | 0.16 | 0.16 |  |
| 56 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 57 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 58 | Annie | 0.00 | 0.00 | 0.00 |  |
| 59 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 60 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 61 | Azir | 0.00 | 0.00 | 0.00 |  |
| 62 | Brand | 0.00 | 0.00 | 0.00 |  |
| 63 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 64 | Draven | 0.00 | 0.00 | 0.00 |  |
| 65 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 66 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 67 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 68 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 69 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 70 | Karma | 0.00 | 0.00 | 0.00 |  |
| 71 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 72 | Lux | 0.00 | 0.00 | 0.00 |  |
| 73 | Nami | 0.00 | 0.00 | 0.00 |  |
| 74 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 75 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 76 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 77 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 78 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 79 | Sona | 0.00 | 0.00 | 0.00 |  |
| 80 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 81 | Swain | 0.00 | 0.00 | 0.00 |  |
| 82 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 83 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 84 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 85 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 86 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 87 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 88 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 89 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 90 | Jayce | -0.04 | 0.00 | 0.04 |  |
| 91 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 92 | Varus | -0.05 | 0.00 | 0.05 |  |
| 93 | Taric | -0.06 | 0.42 | 0.48 |  |
| 94 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 95 | Graves | -0.06 | 0.00 | 0.06 |  |
| 96 | Illaoi | -0.08 | 0.16 | 0.24 |  |
| 97 | Sett | -0.08 | 0.16 | 0.24 |  |
| 98 | Shyvana | -0.08 | 0.16 | 0.24 |  |
| 99 | LeBlanc | -0.08 | 0.00 | 0.08 |  |
| 100 | Kog'Maw | -0.09 | 0.00 | 0.09 |  |
| 101 | Kai'Sa | -0.11 | 0.00 | 0.11 |  |
| 102 | Neeko | -0.11 | 0.00 | 0.11 |  |
| 103 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 104 | Senna | -0.11 | 0.00 | 0.11 |  |
| 105 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 106 | Briar | -0.12 | 0.00 | 0.12 |  |
| 107 | Fizz | -0.12 | 0.00 | 0.12 |  |
| 108 | Sylas | -0.12 | 0.00 | 0.12 |  |
| 109 | Ivern | -0.13 | 0.00 | 0.13 |  |
| 110 | Urgot | -0.13 | 0.00 | 0.13 |  |
| 111 | Caitlyn | -0.14 | 0.14 | 0.28 |  |
| 112 | Quinn | -0.14 | 0.00 | 0.14 |  |
| 113 | Vayne | -0.14 | 0.00 | 0.14 |  |
| 114 | Rammus | -0.15 | 0.24 | 0.39 |  |
| 115 | Lillia | -0.15 | 0.00 | 0.15 |  |
| 116 | Ambessa | -0.16 | 0.00 | 0.16 |  |
| 117 | Bel'Veth | -0.16 | 0.00 | 0.16 |  |
| 118 | Lee Sin | -0.16 | 0.00 | 0.16 |  |
| 119 | Rell | -0.16 | 0.00 | 0.16 |  |
| 120 | Riven | -0.16 | 0.00 | 0.16 |  |
| 121 | Viego | -0.17 | 0.16 | 0.33 |  |
| 122 | Vi | -0.22 | 0.16 | 0.38 |  |
| 123 | Irelia | -0.22 | 0.00 | 0.22 |  |
| 124 | Nasus | -0.24 | 0.24 | 0.48 |  |
| 125 | Aatrox | -0.24 | 0.00 | 0.24 |  |
| 126 | Amumu | -0.24 | 0.00 | 0.24 |  |
| 127 | Diana | -0.24 | 0.00 | 0.24 |  |
| 128 | Kassadin | -0.24 | 0.00 | 0.24 |  |
| 129 | Leona | -0.24 | 0.00 | 0.24 |  |
| 130 | Locke | -0.24 | 0.00 | 0.24 |  |
| 131 | Nautilus | -0.24 | 0.00 | 0.24 |  |
| 132 | Renekton | -0.24 | 0.00 | 0.24 |  |
| 133 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 134 | Tryndamere | -0.24 | 0.00 | 0.24 |  |
| 135 | Galio | -0.25 | 0.00 | 0.25 |  |
| 136 | Vel'Koz | -0.26 | 0.00 | 0.26 |  |
| 137 | Akali | -0.27 | 0.00 | 0.27 |  |
| 138 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 139 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 140 | Garen | -0.30 | 0.18 | 0.48 |  |
| 141 | Talon | -0.30 | 0.00 | 0.30 |  |
| 142 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 143 | Lucian | -0.32 | 0.00 | 0.32 |  |
| 144 | Gragas | -0.34 | 0.00 | 0.34 |  |
| 145 | Qiyana | -0.34 | 0.00 | 0.34 |  |
| 146 | Pyke | -0.35 | 0.00 | 0.35 |  |
| 147 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 148 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 149 | Wukong | -0.36 | 0.00 | 0.36 |  |
| 150 | Shen | -0.37 | 0.24 | 0.61 |  |
| 151 | Janna | -0.40 | 0.00 | 0.40 |  |
| 152 | Mordekaiser | -0.42 | 0.06 | 0.48 |  |
| 153 | Akshan | -0.42 | 0.00 | 0.42 |  |
| 154 | Fiddlesticks | -0.42 | 0.00 | 0.42 |  |
| 155 | Karthus | -0.43 | 0.00 | 0.43 |  |
| 156 | Katarina | -0.43 | 0.00 | 0.43 |  |
| 157 | Poppy | -0.44 | 0.00 | 0.44 |  |
| 158 | Kha'Zix | -0.45 | 0.00 | 0.45 |  |
| 159 | Zac | -0.47 | 0.00 | 0.47 |  |
| 160 | Blitzcrank | -0.48 | 0.00 | 0.48 |  |
| 161 | Cho'Gath | -0.48 | 0.00 | 0.48 |  |
| 162 | Darius | -0.48 | 0.00 | 0.48 |  |
| 163 | Dr. Mundo | -0.48 | 0.00 | 0.48 |  |
| 164 | Rumble | -0.48 | 0.00 | 0.48 |  |
| 165 | Singed | -0.48 | 0.00 | 0.48 |  |
| 166 | Skarner | -0.48 | 0.00 | 0.48 |  |
| 167 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 168 | Trundle | -0.48 | 0.00 | 0.48 |  |
| 169 | Yorick | -0.48 | 0.00 | 0.48 |  |
| 170 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 171 | Naafiri | -0.54 | 0.00 | 0.54 |  |
| 172 | Nunu & Willump | -0.85 | 0.00 | 0.85 |  |
