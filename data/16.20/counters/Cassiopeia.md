# Counters to Cassiopeia (patch 26.20)

Every champion ranked by what its kit does against Cassiopeia's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Cassiopeia's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Cassiopeia` for the full ledger of a matchup, with sources.

## Top 10

### 1. Vladimir (net +0.93)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Cassiopeia's Petrifying Gaze. Untargetable for 2 s, long enough to use ahead of Petrifying Gaze. (Vladimir W Sanguine Pool → Cassiopeia R Petrifying Gaze)
- **0.45** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Cassiopeia's Miasma. Untargetable for 2 s, long enough to use ahead of Miasma. (Vladimir W Sanguine Pool → Cassiopeia W Miasma)
- **0.24** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Cassiopeia's Twin Fang. Untargetable for 2 s, long enough to use ahead of Twin Fang. (Vladimir W Sanguine Pool → Cassiopeia E Twin Fang)
- Watch out: Cassiopeia's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 2. Sivir (net +0.92)

- **0.80** spell shield: Spell Shield's spell shield blocks Cassiopeia's Petrifying Gaze. Spell shield for 1.5 s, long enough to use ahead of Petrifying Gaze. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Cassiopeia R Petrifying Gaze)
- **0.23** spell shield: Spell Shield's spell shield blocks Cassiopeia's Twin Fang. Spell shield for 1.5 s, long enough to use ahead of Twin Fang. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Cassiopeia E Twin Fang)

### 3. Xayah (net +0.87)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Cassiopeia's Petrifying Gaze. Untargetable for 1.5 s, long enough to use ahead of Petrifying Gaze. (Xayah R Featherstorm → Cassiopeia R Petrifying Gaze)
- **0.22** untargetable: Featherstorm makes Xayah untargetable, dodging Cassiopeia's Twin Fang. Untargetable for 1.5 s, long enough to use ahead of Twin Fang. (Xayah R Featherstorm → Cassiopeia E Twin Fang)
- **0.22** untargetable: Featherstorm makes Xayah untargetable, dodging Cassiopeia's Miasma. Untargetable for 1.5 s, long enough to use ahead of Miasma. (Xayah R Featherstorm → Cassiopeia W Miasma)

### 4. Bard (net +0.83)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Cassiopeia's Petrifying Gaze. Untargetable for 2.5 s, long enough to use ahead of Petrifying Gaze. (Bard R Tempered Fate → Cassiopeia R Petrifying Gaze)
- **0.23** untargetable: Tempered Fate makes Bard untargetable, dodging Cassiopeia's Miasma. Untargetable for 2.5 s, long enough to use ahead of Miasma. (Bard R Tempered Fate → Cassiopeia W Miasma)
- **0.22** untargetable: Tempered Fate makes Bard untargetable, dodging Cassiopeia's Twin Fang. Untargetable for 2.5 s, long enough to use ahead of Twin Fang. (Bard R Tempered Fate → Cassiopeia E Twin Fang)
- Watch out: Miasma grounds Bard, who then can't cast Magical Journey.

### 5. Lissandra (net +0.83)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Cassiopeia's Petrifying Gaze. Untargetable for 2.5 s, long enough to use ahead of Petrifying Gaze. (Lissandra R Frozen Tomb → Cassiopeia R Petrifying Gaze)
- **0.23** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Cassiopeia's Miasma. Untargetable for 2.5 s, long enough to use ahead of Miasma. (Lissandra R Frozen Tomb → Cassiopeia W Miasma)
- **0.22** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Cassiopeia's Twin Fang. Untargetable for 2.5 s, long enough to use ahead of Twin Fang. (Lissandra R Frozen Tomb → Cassiopeia E Twin Fang)
- Watch out: Miasma grounds Lissandra, who then can't cast Glacial Path.

### 6. Morgana (net +0.83)

- **0.80** cc immunity: Black Shield makes Morgana immune to Cassiopeia's Petrifying Gaze (slow, stun). Immune for 5 s, long enough to use ahead of Petrifying Gaze. (Morgana E Black Shield → Cassiopeia R Petrifying Gaze)
- **0.27** cc immunity: Black Shield makes Morgana immune to Cassiopeia's Miasma (ground, slow). Immune for 5 s, long enough to use ahead of Miasma. (Morgana E Black Shield → Cassiopeia W Miasma)
- Watch out: Cassiopeia's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

### 7. Kayle (net +0.68)

- **0.40** invulnerable: Divine Judgment makes Kayle invulnerable to Cassiopeia's Petrifying Gaze (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Petrifying Gaze. (Kayle R Divine Judgment → Cassiopeia R Petrifying Gaze)
- **0.22** invulnerable: Divine Judgment makes Kayle invulnerable to Cassiopeia's Twin Fang. Invulnerable for 2.5 s, long enough to use ahead of Twin Fang. (Kayle R Divine Judgment → Cassiopeia E Twin Fang)
- **0.14** range: Kayle's basic attacks reach 75 units farther than Cassiopeia's (625 vs 550 attack range). Cassiopeia has no dash or blink to close the gap. (Kayle basic attacks → Cassiopeia basic attacks)

### 8. Elise (net +0.64)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Cassiopeia's Petrifying Gaze. Untargetable for 0.6 s; Petrifying Gaze takes 0.5 s to land, enough to react. (Elise E Rappel → Cassiopeia R Petrifying Gaze)
- **0.42** untargetable: Rappel makes Elise untargetable, dodging Cassiopeia's Miasma. Untargetable for 0.6 s; Miasma takes 0.48 s to land, enough to react. (Elise E Rappel → Cassiopeia W Miasma)
- **0.23** untargetable: Rappel makes Elise untargetable, dodging Cassiopeia's Twin Fang. Untargetable for 0.6 s; Twin Fang takes 0.41 s to land, enough to react. (Elise E Rappel → Cassiopeia E Twin Fang)
- Watch out: Miasma grounds Elise, who then can't cast Rappel.

### 9. Milio (net +0.63)

- **0.49** cleanse: Breath of Life cleanses Cassiopeia's Petrifying Gaze (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Cassiopeia R Petrifying Gaze)
- **0.22** tenacity: Breath of Life's 65% tenacity shortens Cassiopeia's Petrifying Gaze (slow, stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Cassiopeia R Petrifying Gaze)
- **0.10** cleanse: Breath of Life cleanses Cassiopeia's Miasma (ground, slow) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Cassiopeia W Miasma)

### 10. Fiora (net +0.59)

- **0.90** parry: Riposte parries Cassiopeia's Petrifying Gaze and stuns back. Parry for 0.75 s; Petrifying Gaze takes 0.5 s to land, enough to react. Negating Petrifying Gaze's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Cassiopeia R Petrifying Gaze)
- **0.45** parry: Riposte parries Cassiopeia's Miasma. Parry for 0.75 s; Miasma takes 0.48 s to land, enough to react. (Fiora W Riposte → Cassiopeia W Miasma)
- **0.24** parry: Riposte parries Cassiopeia's Twin Fang. Parry for 0.75 s; Twin Fang takes 0.41 s to land, enough to react. (Fiora W Riposte → Cassiopeia E Twin Fang)
- Watch out: Miasma grounds Fiora, who then can't cast Lunge.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Vladimir | +0.93 | 1.09 | 0.16 |  |
| 2 | Sivir | +0.92 | 0.92 | 0.00 |  |
| 3 | Xayah | +0.87 | 0.87 | 0.00 |  |
| 4 | Bard | +0.83 | 0.97 | 0.14 |  |
| 5 | Lissandra | +0.83 | 0.97 | 0.14 |  |
| 6 | Morgana | +0.83 | 0.94 | 0.11 |  |
| 7 | Kayle | +0.68 | 0.68 | 0.00 |  |
| 8 | Elise | +0.64 | 1.07 | 0.43 |  |
| 9 | Milio | +0.63 | 0.63 | 0.00 |  |
| 10 | Fiora | +0.59 | 1.19 | 0.60 |  |
| 11 | Master Yi | +0.58 | 1.28 | 0.70 |  |
| 12 | Mel | +0.51 | 0.51 | 0.00 |  |
| 13 | Nocturne | +0.49 | 0.92 | 0.43 |  |
| 14 | Udyr | +0.48 | 0.94 | 0.46 |  |
| 15 | Gwen | +0.47 | 1.07 | 0.60 |  |
| 16 | Aurora | +0.46 | 0.87 | 0.41 |  |
| 17 | Shaco | +0.44 | 0.97 | 0.53 |  |
| 18 | Olaf | +0.43 | 0.87 | 0.44 |  |
| 19 | Yuumi | +0.41 | 1.19 | 0.78 |  |
| 20 | Maokai | +0.39 | 1.09 | 0.70 |  |
| 21 | Kalista | +0.35 | 0.56 | 0.21 |  |
| 22 | Gangplank | +0.31 | 0.75 | 0.44 |  |
| 23 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 24 | Ekko | +0.22 | 0.99 | 0.77 |  |
| 25 | Rek'Sai | +0.21 | 0.97 | 0.76 |  |
| 26 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 27 | Evelynn | +0.20 | 0.97 | 0.77 |  |
| 28 | Zed | +0.19 | 0.87 | 0.68 |  |
| 29 | Samira | +0.19 | 0.54 | 0.35 |  |
| 30 | Kindred | +0.17 | 0.46 | 0.29 |  |
| 31 | Camille | +0.16 | 0.92 | 0.76 |  |
| 32 | Rengar | +0.16 | 0.75 | 0.59 |  |
| 33 | Varus | +0.16 | 0.22 | 0.06 |  |
| 34 | Zaahen | +0.11 | 0.87 | 0.76 |  |
| 35 | Aphelios | +0.11 | 0.11 | 0.00 |  |
| 36 | Heimerdinger | +0.11 | 0.11 | 0.00 |  |
| 37 | Alistar | +0.10 | 0.70 | 0.60 |  |
| 38 | Annie | +0.08 | 0.08 | 0.00 |  |
| 39 | Braum | +0.07 | 0.67 | 0.60 | projectile block (Unbreakable) |
| 40 | Malzahar | +0.07 | 0.47 | 0.40 |  |
| 41 | Garen | +0.04 | 0.45 | 0.41 |  |
| 42 | Taric | +0.02 | 0.46 | 0.44 |  |
| 43 | Sion | +0.01 | 0.88 | 0.87 |  |
| 44 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 45 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 46 | Brand | 0.00 | 0.00 | 0.00 |  |
| 47 | Draven | 0.00 | 0.00 | 0.00 |  |
| 48 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 49 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 50 | Karma | 0.00 | 0.00 | 0.00 |  |
| 51 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 52 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 53 | Lux | 0.00 | 0.00 | 0.00 |  |
| 54 | Nami | 0.00 | 0.00 | 0.00 |  |
| 55 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 56 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 57 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 58 | Senna | 0.00 | 0.00 | 0.00 |  |
| 59 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 60 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 61 | Sona | 0.00 | 0.00 | 0.00 |  |
| 62 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 63 | Swain | 0.00 | 0.00 | 0.00 |  |
| 64 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 65 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 66 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 67 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 68 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 69 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 70 | Warwick | -0.02 | 0.88 | 0.90 |  |
| 71 | Tristana | -0.02 | 0.27 | 0.29 |  |
| 72 | Kled | -0.06 | 0.74 | 0.80 |  |
| 73 | Xin Zhao | -0.10 | 0.49 | 0.59 |  |
| 74 | Singed | -0.11 | 0.33 | 0.44 |  |
| 75 | Vex | -0.17 | 0.00 | 0.17 |  |
| 76 | Ziggs | -0.20 | 0.00 | 0.20 |  |
| 77 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 78 | Yasuo | -0.23 | 0.61 | 0.84 | projectile block (Wind Wall) |
| 79 | Kayn | -0.24 | 0.97 | 1.21 |  |
| 80 | Pantheon | -0.24 | 0.57 | 0.81 |  |
| 81 | Thresh | -0.24 | 0.00 | 0.24 |  |
| 82 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 83 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 84 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 85 | Azir | -0.29 | 0.00 | 0.29 |  |
| 86 | Corki | -0.29 | 0.00 | 0.29 |  |
| 87 | Ezreal | -0.29 | 0.00 | 0.29 |  |
| 88 | Jayce | -0.29 | 0.00 | 0.29 |  |
| 89 | LeBlanc | -0.29 | 0.00 | 0.29 |  |
| 90 | Nidalee | -0.29 | 0.00 | 0.29 |  |
| 91 | Yunara | -0.29 | 0.00 | 0.29 |  |
| 92 | Zeri | -0.29 | 0.00 | 0.29 |  |
| 93 | Skarner | -0.31 | 0.13 | 0.44 |  |
| 94 | Ivern | -0.31 | 0.00 | 0.31 |  |
| 95 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 96 | Ahri | -0.33 | 0.00 | 0.33 |  |
| 97 | Kai'Sa | -0.33 | 0.00 | 0.33 |  |
| 98 | Vayne | -0.33 | 0.00 | 0.33 |  |
| 99 | Zoe | -0.33 | 0.00 | 0.33 |  |
| 100 | Aurelion Sol | -0.35 | 0.00 | 0.35 |  |
| 101 | Nilah | -0.36 | 0.20 | 0.56 |  |
| 102 | Mordekaiser | -0.36 | 0.05 | 0.41 |  |
| 103 | Jax | -0.37 | 0.23 | 0.60 |  |
| 104 | Caitlyn | -0.39 | 0.18 | 0.57 |  |
| 105 | Akshan | -0.39 | 0.00 | 0.39 |  |
| 106 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 107 | Janna | -0.40 | 0.00 | 0.40 |  |
| 108 | Lillia | -0.41 | 0.00 | 0.41 |  |
| 109 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 110 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 111 | Gnar | -0.43 | 0.00 | 0.43 |  |
| 112 | Graves | -0.43 | 0.00 | 0.43 |  |
| 113 | Illaoi | -0.43 | 0.00 | 0.43 |  |
| 114 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 115 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 116 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 117 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 118 | Urgot | -0.51 | 0.00 | 0.51 |  |
| 119 | Twisted Fate | -0.52 | 0.00 | 0.52 |  |
| 120 | Nunu & Willump | -0.53 | 0.28 | 0.81 |  |
| 121 | Quinn | -0.54 | 0.00 | 0.54 |  |
| 122 | Malphite | -0.56 | 0.14 | 0.70 |  |
| 123 | Irelia | -0.57 | 0.00 | 0.57 |  |
| 124 | Lucian | -0.57 | 0.00 | 0.57 |  |
| 125 | Katarina | -0.58 | 0.22 | 0.80 |  |
| 126 | Jarvan IV | -0.58 | 0.00 | 0.58 |  |
| 127 | Volibear | -0.58 | 0.00 | 0.58 |  |
| 128 | Rammus | -0.59 | 0.22 | 0.81 |  |
| 129 | Aatrox | -0.59 | 0.00 | 0.59 |  |
| 130 | Nautilus | -0.59 | 0.00 | 0.59 |  |
| 131 | Tryndamere | -0.59 | 0.00 | 0.59 |  |
| 132 | Diana | -0.60 | 0.00 | 0.60 |  |
| 133 | Kha'Zix | -0.60 | 0.00 | 0.60 |  |
| 134 | Locke | -0.60 | 0.00 | 0.60 |  |
| 135 | Renekton | -0.60 | 0.00 | 0.60 |  |
| 136 | Rell | -0.62 | 0.00 | 0.62 |  |
| 137 | Ornn | -0.64 | 0.00 | 0.64 |  |
| 138 | Darius | -0.67 | 0.00 | 0.67 |  |
| 139 | Ryze | -0.68 | 0.00 | 0.68 |  |
| 140 | Talon | -0.68 | 0.00 | 0.68 |  |
| 141 | Amumu | -0.70 | 0.00 | 0.70 |  |
| 142 | Kassadin | -0.70 | 0.00 | 0.70 |  |
| 143 | Leona | -0.70 | 0.00 | 0.70 |  |
| 144 | Sejuani | -0.70 | 0.00 | 0.70 |  |
| 145 | Sett | -0.70 | 0.00 | 0.70 |  |
| 146 | Shyvana | -0.70 | 0.00 | 0.70 |  |
| 147 | Wukong | -0.71 | 0.00 | 0.71 |  |
| 148 | Taliyah | -0.71 | 0.00 | 0.71 |  |
| 149 | Hecarim | -0.72 | 0.00 | 0.72 |  |
| 150 | Lee Sin | -0.72 | 0.00 | 0.72 |  |
| 151 | Qiyana | -0.72 | 0.00 | 0.72 |  |
| 152 | Fiddlesticks | -0.73 | 0.00 | 0.73 |  |
| 153 | Rakan | -0.76 | 0.00 | 0.76 |  |
| 154 | Akali | -0.77 | 0.00 | 0.77 |  |
| 155 | Fizz | -0.77 | 0.00 | 0.77 |  |
| 156 | Ambessa | -0.79 | 0.00 | 0.79 |  |
| 157 | Gragas | -0.80 | 0.00 | 0.80 |  |
| 158 | Poppy | -0.80 | 0.00 | 0.80 |  |
| 159 | Riven | -0.82 | 0.00 | 0.82 |  |
| 160 | Yone | -0.83 | 0.00 | 0.83 |  |
| 161 | K'Sante | -0.84 | 0.00 | 0.84 |  |
| 162 | Bel'Veth | -0.85 | 0.00 | 0.85 |  |
| 163 | Sylas | -0.86 | 0.00 | 0.86 |  |
| 164 | Briar | -0.87 | 0.00 | 0.87 |  |
| 165 | Zac | -0.92 | 0.00 | 0.92 |  |
| 166 | Pyke | -0.93 | 0.00 | 0.93 |  |
| 167 | Viego | -0.94 | 0.00 | 0.94 |  |
| 168 | Tahm Kench | -0.95 | 0.00 | 0.95 |  |
| 169 | Galio | -0.96 | 0.00 | 0.96 |  |
| 170 | Shen | -1.08 | 0.22 | 1.30 |  |
| 171 | Vi | -1.09 | 0.00 | 1.09 |  |
| 172 | Naafiri | -1.18 | 0.00 | 1.18 |  |
