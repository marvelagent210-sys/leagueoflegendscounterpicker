# Counters to Neeko (patch 26.20)

Every champion ranked by what its kit does against Neeko's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Neeko's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Neeko` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.17)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Neeko's Pop Blossom. Untargetable for 0.6 s; Pop Blossom takes 0.6 s to land, enough to react. (Elise E Rappel → Neeko R Pop Blossom)
- **0.51** untargetable: Rappel makes Elise untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 0.6 s; Tangle-Barbs takes 1.02 s to land, enough to react. (Elise E Rappel → Neeko E Tangle-Barbs)
- **0.11** reveal: Cocoon reveals Neeko through Shapesplitter's stealth. (Elise E Cocoon → Neeko W Shapesplitter)

### 2. Morgana (net +1.07)

- **0.80** cc immunity: Black Shield makes Morgana immune to Neeko's Pop Blossom (airborne, stun). Immune for 5 s, long enough to use ahead of Pop Blossom. (Morgana E Black Shield → Neeko R Pop Blossom)
- **0.54** cc immunity: Black Shield makes Morgana immune to Neeko's Tangle-Barbs (root). Immune for 5 s, long enough to use ahead of Tangle-Barbs. (Morgana E Black Shield → Neeko E Tangle-Barbs)
- **0.11** reveal: Soul Shackles reveals Neeko through Shapesplitter's stealth. (Morgana R Soul Shackles → Neeko W Shapesplitter)
- Watch out: Neeko's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

### 3. Fiora (net +1.01)

- **0.90** parry: Riposte parries Neeko's Pop Blossom and stuns back. Parry for 0.75 s; Pop Blossom takes 0.6 s to land, enough to react. Negating Pop Blossom's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Neeko R Pop Blossom)
- **0.64** parry: Riposte parries Neeko's Tangle-Barbs and stuns back. Parry for 0.75 s; Tangle-Barbs takes 1.02 s to land, enough to react. Negating Tangle-Barbs's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Neeko E Tangle-Barbs)
- **0.05** attack speed slow: Riposte cuts Neeko's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Neeko basic attacks)
- Watch out: Neeko's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### 4. Bard (net +0.97)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Neeko's Pop Blossom. Untargetable for 2.5 s, long enough to use ahead of Pop Blossom. (Bard R Tempered Fate → Neeko R Pop Blossom)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 2.5 s, long enough to use ahead of Tangle-Barbs. (Bard R Tempered Fate → Neeko E Tangle-Barbs)

### 5. Lissandra (net +0.97)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Neeko's Pop Blossom. Untargetable for 2.5 s, long enough to use ahead of Pop Blossom. (Lissandra R Frozen Tomb → Neeko R Pop Blossom)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 2.5 s, long enough to use ahead of Tangle-Barbs. (Lissandra R Frozen Tomb → Neeko E Tangle-Barbs)

### 6. Maokai (net +0.93)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Neeko's Pop Blossom. Untargetable for 1.4 s; Pop Blossom takes 0.6 s to land, enough to react. (Maokai W Twisted Advance → Neeko R Pop Blossom)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 1.4 s; Tangle-Barbs takes 1.02 s to land, enough to react. (Maokai W Twisted Advance → Neeko E Tangle-Barbs)
- Watch out: Neeko's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 7. Udyr (net +0.93)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Neeko's Pop Blossom (airborne, stun). Immune for 1.5 s, long enough to use ahead of Pop Blossom. (Udyr E Blazing Stampede → Neeko R Pop Blossom)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Neeko's Tangle-Barbs (root). Immune for 1.5 s, long enough to use ahead of Tangle-Barbs. (Udyr E Blazing Stampede → Neeko E Tangle-Barbs)
- Watch out: Neeko's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range).

### 8. Aurora (net +0.93)

- **0.75** untargetable: Between Worlds makes Aurora untargetable, dodging Neeko's Pop Blossom. Untargetable for 0.4 s; Pop Blossom takes 0.6 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Neeko R Pop Blossom)
- **0.32** untargetable: Between Worlds makes Aurora untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 0.4 s; Tangle-Barbs takes 1.02 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Neeko E Tangle-Barbs)
- **0.08** cc immunity: Between Worlds is displacement immune, ignoring Neeko's Pop Blossom (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Neeko R Pop Blossom)

### 9. Vladimir (net +0.91)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Neeko's Pop Blossom. Untargetable for 2 s, long enough to use ahead of Pop Blossom. (Vladimir W Sanguine Pool → Neeko R Pop Blossom)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 2 s, long enough to use ahead of Tangle-Barbs. (Vladimir W Sanguine Pool → Neeko E Tangle-Barbs)
- Watch out: Neeko's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 10. Xayah (net +0.91)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Neeko's Pop Blossom. Untargetable for 1.5 s, long enough to use ahead of Pop Blossom. (Xayah R Featherstorm → Neeko R Pop Blossom)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 1.5 s, long enough to use ahead of Tangle-Barbs. (Xayah R Featherstorm → Neeko E Tangle-Barbs)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.17 | 1.17 | 0.00 |  |
| 2 | Morgana | +1.07 | 1.18 | 0.11 |  |
| 3 | Fiora | +1.01 | 1.23 | 0.22 |  |
| 4 | Bard | +0.97 | 0.97 | 0.00 |  |
| 5 | Lissandra | +0.97 | 0.97 | 0.00 |  |
| 6 | Maokai | +0.93 | 1.15 | 0.22 |  |
| 7 | Udyr | +0.93 | 1.15 | 0.22 |  |
| 8 | Aurora | +0.93 | 0.93 | 0.00 |  |
| 9 | Vladimir | +0.91 | 1.07 | 0.16 |  |
| 10 | Xayah | +0.91 | 0.91 | 0.00 |  |
| 11 | Kled | +0.90 | 0.98 | 0.08 |  |
| 12 | Camille | +0.88 | 0.99 | 0.11 |  |
| 13 | Rek'Sai | +0.86 | 1.00 | 0.14 |  |
| 14 | Gwen | +0.84 | 1.06 | 0.22 |  |
| 15 | Ekko | +0.83 | 0.98 | 0.15 |  |
| 16 | Zaahen | +0.83 | 0.97 | 0.14 |  |
| 17 | Evelynn | +0.82 | 0.97 | 0.15 |  |
| 18 | Shaco | +0.82 | 0.97 | 0.15 |  |
| 19 | Braum | +0.77 | 0.99 | 0.22 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 20 | Zed | +0.76 | 0.91 | 0.15 |  |
| 21 | Warwick | +0.75 | 1.08 | 0.33 |  |
| 22 | Master Yi | +0.74 | 1.06 | 0.32 |  |
| 23 | Milio | +0.72 | 0.72 | 0.00 |  |
| 24 | Yasuo | +0.71 | 0.85 | 0.14 | projectile block (Wind Wall) |
| 25 | Sivir | +0.71 | 0.71 | 0.00 |  |
| 26 | Yuumi | +0.70 | 1.15 | 0.45 |  |
| 27 | Nocturne | +0.69 | 0.91 | 0.22 |  |
| 28 | Kalista | +0.67 | 0.67 | 0.00 |  |
| 29 | Samira | +0.65 | 0.65 | 0.00 | projectile block (Blade Whirl) |
| 30 | Mel | +0.61 | 0.61 | 0.00 | projectile block (Rebuttal) |
| 31 | Rengar | +0.59 | 1.03 | 0.44 |  |
| 32 | Alistar | +0.56 | 0.78 | 0.22 |  |
| 33 | Kayle | +0.56 | 0.56 | 0.00 |  |
| 34 | Olaf | +0.53 | 0.97 | 0.44 |  |
| 35 | Sion | +0.49 | 0.98 | 0.49 |  |
| 36 | Kayn | +0.43 | 0.99 | 0.56 |  |
| 37 | Gangplank | +0.43 | 0.87 | 0.44 |  |
| 38 | Kindred | +0.42 | 0.42 | 0.00 |  |
| 39 | Pantheon | +0.34 | 0.53 | 0.19 |  |
| 40 | Malzahar | +0.32 | 0.69 | 0.37 |  |
| 41 | Lulu | +0.32 | 0.32 | 0.00 |  |
| 42 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 43 | Xin Zhao | +0.25 | 0.46 | 0.21 |  |
| 44 | Vex | +0.15 | 0.15 | 0.00 |  |
| 45 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 46 | Hwei | +0.11 | 0.11 | 0.00 |  |
| 47 | Kai'Sa | +0.11 | 0.11 | 0.00 |  |
| 48 | Karma | +0.11 | 0.11 | 0.00 |  |
| 49 | LeBlanc | +0.11 | 0.11 | 0.00 |  |
| 50 | Nidalee | +0.11 | 0.11 | 0.00 |  |
| 51 | Renata Glasc | +0.11 | 0.11 | 0.00 |  |
| 52 | Zyra | +0.11 | 0.11 | 0.00 |  |
| 53 | Corki | +0.08 | 0.08 | 0.00 |  |
| 54 | Thresh | +0.07 | 0.11 | 0.04 |  |
| 55 | K'Sante | +0.05 | 0.16 | 0.11 |  |
| 56 | Annie | +0.04 | 0.04 | 0.00 |  |
| 57 | Nilah | +0.02 | 0.20 | 0.18 |  |
| 58 | Jax | +0.01 | 0.23 | 0.22 |  |
| 59 | Fizz | +0.01 | 0.11 | 0.10 |  |
| 60 | Sylas | +0.01 | 0.11 | 0.10 |  |
| 61 | Garen | 0.00 | 0.41 | 0.41 |  |
| 62 | Malphite | 0.00 | 0.22 | 0.22 |  |
| 63 | Briar | 0.00 | 0.11 | 0.11 |  |
| 64 | Urgot | 0.00 | 0.11 | 0.11 |  |
| 65 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 66 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 67 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 68 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 69 | Azir | 0.00 | 0.00 | 0.00 |  |
| 70 | Brand | 0.00 | 0.00 | 0.00 |  |
| 71 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 72 | Draven | 0.00 | 0.00 | 0.00 |  |
| 73 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 74 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 75 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 76 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 77 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 78 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 79 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 80 | Lux | 0.00 | 0.00 | 0.00 |  |
| 81 | Nami | 0.00 | 0.00 | 0.00 |  |
| 82 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 83 | Senna | 0.00 | 0.00 | 0.00 |  |
| 84 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 85 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 86 | Sona | 0.00 | 0.00 | 0.00 |  |
| 87 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 88 | Swain | 0.00 | 0.00 | 0.00 |  |
| 89 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 90 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 91 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 92 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 93 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 94 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 95 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 96 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 97 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 98 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 99 | Taric | -0.02 | 0.42 | 0.44 |  |
| 100 | Jarvan IV | -0.02 | 0.08 | 0.10 |  |
| 101 | Yone | -0.02 | 0.08 | 0.10 |  |
| 102 | Illaoi | -0.03 | 0.19 | 0.22 |  |
| 103 | Akali | -0.04 | 0.11 | 0.15 |  |
| 104 | Ambessa | -0.04 | 0.11 | 0.15 |  |
| 105 | Lee Sin | -0.04 | 0.11 | 0.15 |  |
| 106 | Graves | -0.05 | 0.00 | 0.05 |  |
| 107 | Varus | -0.05 | 0.00 | 0.05 |  |
| 108 | Hecarim | -0.06 | 0.08 | 0.14 |  |
| 109 | Ornn | -0.06 | 0.08 | 0.14 |  |
| 110 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 111 | Sett | -0.07 | 0.15 | 0.22 |  |
| 112 | Volibear | -0.07 | 0.08 | 0.15 |  |
| 113 | Caitlyn | -0.08 | 0.20 | 0.28 |  |
| 114 | Rakan | -0.09 | 0.00 | 0.09 |  |
| 115 | Aatrox | -0.10 | 0.11 | 0.21 |  |
| 116 | Ivern | -0.11 | 0.00 | 0.11 |  |
| 117 | Lillia | -0.12 | 0.00 | 0.12 |  |
| 118 | Akshan | -0.13 | 0.11 | 0.24 |  |
| 119 | Viego | -0.13 | 0.08 | 0.21 |  |
| 120 | Shyvana | -0.14 | 0.08 | 0.22 |  |
| 121 | Wukong | -0.14 | 0.00 | 0.14 |  |
| 122 | Quinn | -0.14 | 0.00 | 0.14 |  |
| 123 | Rell | -0.14 | 0.00 | 0.14 |  |
| 124 | Rammus | -0.15 | 0.22 | 0.37 |  |
| 125 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 126 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 127 | Riven | -0.15 | 0.00 | 0.15 |  |
| 128 | Talon | -0.15 | 0.00 | 0.15 |  |
| 129 | Irelia | -0.19 | 0.00 | 0.19 |  |
| 130 | Nautilus | -0.21 | 0.00 | 0.21 |  |
| 131 | Tryndamere | -0.21 | 0.00 | 0.21 |  |
| 132 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 133 | Vi | -0.22 | 0.15 | 0.37 |  |
| 134 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 135 | Diana | -0.22 | 0.00 | 0.22 |  |
| 136 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 137 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 138 | Leona | -0.22 | 0.00 | 0.22 |  |
| 139 | Locke | -0.22 | 0.00 | 0.22 |  |
| 140 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 141 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 142 | Pyke | -0.23 | 0.00 | 0.23 |  |
| 143 | Twisted Fate | -0.24 | 0.11 | 0.35 |  |
| 144 | Galio | -0.24 | 0.00 | 0.24 |  |
| 145 | Vel'Koz | -0.26 | 0.00 | 0.26 |  |
| 146 | Mordekaiser | -0.27 | 0.14 | 0.41 |  |
| 147 | Fiddlesticks | -0.27 | 0.11 | 0.38 |  |
| 148 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 149 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 150 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 151 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 152 | Gragas | -0.32 | 0.00 | 0.32 |  |
| 153 | Skarner | -0.33 | 0.11 | 0.44 |  |
| 154 | Zac | -0.33 | 0.11 | 0.44 |  |
| 155 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 156 | Shen | -0.38 | 0.22 | 0.60 |  |
| 157 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 158 | Janna | -0.40 | 0.00 | 0.40 |  |
| 159 | Darius | -0.41 | 0.00 | 0.41 |  |
| 160 | Katarina | -0.41 | 0.00 | 0.41 |  |
| 161 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 162 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 163 | Naafiri | -0.42 | 0.11 | 0.53 |  |
| 164 | Poppy | -0.42 | 0.00 | 0.42 |  |
| 165 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 166 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 167 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 168 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 169 | Singed | -0.44 | 0.00 | 0.44 |  |
| 170 | Tahm Kench | -0.47 | 0.00 | 0.47 |  |
| 171 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 172 | Nunu & Willump | -0.81 | 0.00 | 0.81 |  |
