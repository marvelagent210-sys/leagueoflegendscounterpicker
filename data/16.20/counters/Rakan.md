# Counters to Rakan (patch 26.20)

Every champion ranked by what its kit does against Rakan's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Rakan's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Rakan` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +1.37)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Rakan's Grand Entrance. Spell shield for 1.5 s, long enough to use ahead of Grand Entrance. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Rakan W Grand Entrance)
- **0.80** spell shield: Shroud of Darkness's spell shield blocks Rakan's The Quickness. Spell shield for 1.5 s, long enough to use ahead of The Quickness. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Rakan R The Quickness)
- **0.20** cc immunity: Paranoia is displacement immune, ignoring Rakan's Grand Entrance (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Rakan W Grand Entrance)
- Watch out: Rakan's basic attacks reach 175 units farther than Nocturne's (300 vs 125 attack range).

### 2. Sivir (net +1.34)

- **0.80** spell shield: Spell Shield's spell shield blocks Rakan's The Quickness. Spell shield for 1.5 s, long enough to use ahead of The Quickness. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rakan R The Quickness)
- **0.73** spell shield: Spell Shield's spell shield blocks Rakan's Grand Entrance. Spell shield for 1.5 s, long enough to use ahead of Grand Entrance. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rakan W Grand Entrance)
- **0.17** range: Sivir's basic attacks reach 200 units farther than Rakan's (500 vs 300 attack range). Rakan closes the gap with Battle Dance, Grand Entrance. (Sivir basic attacks → Rakan basic attacks)

### 3. Elise (net +1.31)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Rakan's The Quickness. Untargetable for 0.6 s; The Quickness takes 0.5 s to land, enough to react. (Elise E Rappel → Rakan R The Quickness)
- **0.73** untargetable: Rappel makes Elise untargetable, dodging Rakan's Grand Entrance. Untargetable for 0.6 s; Grand Entrance takes 0.38 s to land, enough to react. (Elise E Rappel → Rakan W Grand Entrance)
- **0.14** range: Elise's basic attacks reach 250 units farther than Rakan's (550 vs 300 attack range). Rakan closes the gap with Battle Dance, Grand Entrance. (Elise basic attacks → Rakan basic attacks)

### 4. Maokai (net +1.27)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Rakan's Grand Entrance. Untargetable for 1.4 s; Grand Entrance takes 0.38 s to land, enough to react. (Maokai W Twisted Advance → Rakan W Grand Entrance)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Rakan's The Quickness. Untargetable for 1.4 s; The Quickness takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Rakan R The Quickness)
- Watch out: Rakan's basic attacks reach 175 units farther than Maokai's (300 vs 125 attack range).

### 5. Udyr (net +1.27)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Rakan's Grand Entrance (airborne). Immune for 1.5 s, long enough to use ahead of Grand Entrance. (Udyr E Blazing Stampede → Rakan W Grand Entrance)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Rakan's The Quickness (charm, slow). Immune for 1.5 s, long enough to use ahead of The Quickness. (Udyr E Blazing Stampede → Rakan R The Quickness)
- Watch out: Rakan's basic attacks reach 175 units farther than Udyr's (300 vs 125 attack range).

### 6. Fiora (net +1.25)

- **0.90** parry: Riposte parries Rakan's The Quickness and stuns back. Parry for 0.75 s; The Quickness takes 0.5 s to land, enough to react. Negating The Quickness's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rakan R The Quickness)
- **0.88** parry: Riposte parries Rakan's Grand Entrance and stuns back. Parry for 0.75 s; Grand Entrance takes 0.38 s to land, enough to react. Negating Grand Entrance's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rakan W Grand Entrance)
- **0.07** attack speed slow: Riposte cuts Rakan's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Rakan basic attacks)
- Watch out: Rakan's basic attacks reach 150 units farther than Fiora's (300 vs 150 attack range).

### 7. Morgana (net +1.25)

- **0.80** cc immunity: Black Shield makes Morgana immune to Rakan's The Quickness (charm, slow). Immune for 5 s, long enough to use ahead of The Quickness. (Morgana E Black Shield → Rakan R The Quickness)
- **0.78** cc immunity: Black Shield makes Morgana immune to Rakan's Grand Entrance (airborne). Immune for 5 s, long enough to use ahead of Grand Entrance. (Morgana E Black Shield → Rakan W Grand Entrance)
- **0.06** range: Morgana's basic attacks reach 150 units farther than Rakan's (450 vs 300 attack range). Rakan closes the gap with Battle Dance, Grand Entrance. (Morgana basic attacks → Rakan basic attacks)

### 8. Lissandra (net +1.22)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rakan's The Quickness. Untargetable for 2.5 s, long enough to use ahead of The Quickness. (Lissandra R Frozen Tomb → Rakan R The Quickness)
- **0.48** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rakan's Grand Entrance. Untargetable for 2.5 s, long enough to use ahead of Grand Entrance. (Lissandra R Frozen Tomb → Rakan W Grand Entrance)
- **0.24** dash stop: Frozen Tomb's knockdown can stop Rakan's Grand Entrance mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Rakan W Grand Entrance)

### 9. Vladimir (net +1.19)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rakan's The Quickness. Untargetable for 2 s, long enough to use ahead of The Quickness. (Vladimir W Sanguine Pool → Rakan R The Quickness)
- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rakan's Grand Entrance. Untargetable for 2 s, long enough to use ahead of Grand Entrance. (Vladimir W Sanguine Pool → Rakan W Grand Entrance)
- **0.05** range: Vladimir's basic attacks reach 150 units farther than Rakan's (450 vs 300 attack range). Rakan closes the gap with Battle Dance, Grand Entrance. (Vladimir basic attacks → Rakan basic attacks)
- Watch out: The Quickness's charm interrupts Vladimir's Tides of Blood (charge-up).

### 10. Master Yi (net +1.17)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Rakan's The Quickness. Untargetable for ?; The Quickness takes 0.5 s to land, enough to react. (Master Yi Q Alpha Strike → Rakan R The Quickness)
- **0.73** untargetable: Alpha Strike makes Master Yi untargetable, dodging Rakan's Grand Entrance. Untargetable for ?; Grand Entrance takes 0.38 s to land, enough to react. (Master Yi Q Alpha Strike → Rakan W Grand Entrance)
- **0.16** cleanse: Highlander cleanses Rakan's The Quickness (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove charm. (Master Yi R Highlander → Rakan R The Quickness)
- Watch out: The Quickness's charm interrupts Master Yi's Meditate (normal channel).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.37 | 1.50 | 0.13 |  |
| 2 | Sivir | +1.34 | 1.34 | 0.00 |  |
| 3 | Elise | +1.31 | 1.31 | 0.00 |  |
| 4 | Maokai | +1.27 | 1.40 | 0.13 |  |
| 5 | Udyr | +1.27 | 1.40 | 0.13 |  |
| 6 | Fiora | +1.25 | 1.36 | 0.11 |  |
| 7 | Morgana | +1.25 | 1.25 | 0.00 |  |
| 8 | Lissandra | +1.22 | 1.22 | 0.00 |  |
| 9 | Vladimir | +1.19 | 1.24 | 0.05 |  |
| 10 | Master Yi | +1.17 | 1.37 | 0.20 |  |
| 11 | Bard | +1.17 | 1.17 | 0.00 |  |
| 12 | Aurora | +1.15 | 1.15 | 0.00 |  |
| 13 | Xayah | +1.12 | 1.12 | 0.00 |  |
| 14 | Yuumi | +1.11 | 1.49 | 0.38 |  |
| 15 | Warwick | +1.07 | 1.33 | 0.26 |  |
| 16 | Gwen | +1.06 | 1.17 | 0.11 |  |
| 17 | Camille | +1.03 | 1.09 | 0.06 |  |
| 18 | Rek'Sai | +1.03 | 1.09 | 0.06 |  |
| 19 | Ekko | +0.98 | 1.06 | 0.08 |  |
| 20 | Zaahen | +0.98 | 1.04 | 0.06 |  |
| 21 | Evelynn | +0.96 | 1.04 | 0.08 |  |
| 22 | Shaco | +0.96 | 1.04 | 0.08 |  |
| 23 | Kled | +0.94 | 0.94 | 0.00 |  |
| 24 | Zed | +0.90 | 0.98 | 0.08 |  |
| 25 | Rengar | +0.87 | 1.12 | 0.25 |  |
| 26 | Vex | +0.87 | 0.87 | 0.00 |  |
| 27 | Kalista | +0.84 | 0.84 | 0.00 |  |
| 28 | Jinx | +0.81 | 0.81 | 0.00 | dash stop (Flame Chompers!), dash stop (Flame Chompers!) |
| 29 | Sion | +0.79 | 1.05 | 0.26 |  |
| 30 | Olaf | +0.79 | 1.04 | 0.25 |  |
| 31 | Hwei | +0.79 | 0.79 | 0.00 | dash stop (Grim Visage), dash stop (Grim Visage) |
| 32 | Milio | +0.77 | 0.77 | 0.00 |  |
| 33 | Cassiopeia | +0.76 | 0.76 | 0.00 | grounding (Miasma) |
| 34 | Malzahar | +0.74 | 1.11 | 0.37 |  |
| 35 | Ahri | +0.74 | 0.74 | 0.00 | dash stop (Charm), dash stop (Charm) |
| 36 | Viktor | +0.74 | 0.74 | 0.00 | dash stop (Gravity Field) |
| 37 | Gangplank | +0.73 | 0.98 | 0.25 |  |
| 38 | Singed | +0.71 | 0.96 | 0.25 | grounding (Mega Adhesive) |
| 39 | Kayle | +0.71 | 0.71 | 0.00 |  |
| 40 | Alistar | +0.70 | 0.83 | 0.13 |  |
| 41 | Veigar | +0.70 | 0.70 | 0.00 | dash stop (Event Horizon) |
| 42 | Kindred | +0.63 | 0.63 | 0.00 |  |
| 43 | Kayn | +0.56 | 1.04 | 0.48 |  |
| 44 | Teemo | +0.50 | 0.50 | 0.00 |  |
| 45 | Yone | +0.49 | 0.54 | 0.05 |  |
| 46 | Pantheon | +0.48 | 0.59 | 0.11 |  |
| 47 | Poppy | +0.46 | 0.79 | 0.33 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 48 | Mordekaiser | +0.46 | 0.64 | 0.18 |  |
| 49 | Lulu | +0.42 | 0.42 | 0.00 |  |
| 50 | Xin Zhao | +0.41 | 0.50 | 0.09 |  |
| 51 | Zac | +0.38 | 0.70 | 0.32 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 52 | Samira | +0.38 | 0.38 | 0.00 |  |
| 53 | Mel | +0.36 | 0.36 | 0.00 |  |
| 54 | K'Sante | +0.35 | 0.40 | 0.05 |  |
| 55 | Corki | +0.33 | 0.33 | 0.00 |  |
| 56 | Braum | +0.29 | 0.42 | 0.13 | projectile block (Unbreakable) |
| 57 | Malphite | +0.26 | 0.39 | 0.13 |  |
| 58 | Varus | +0.25 | 0.30 | 0.05 |  |
| 59 | Taric | +0.24 | 0.46 | 0.22 |  |
| 60 | Aphelios | +0.24 | 0.24 | 0.00 |  |
| 61 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 62 | Yasuo | +0.23 | 0.29 | 0.06 |  |
| 63 | Nilah | +0.22 | 0.27 | 0.05 |  |
| 64 | Amumu | +0.20 | 0.33 | 0.13 |  |
| 65 | Garen | +0.19 | 0.37 | 0.18 |  |
| 66 | Jax | +0.18 | 0.31 | 0.13 |  |
| 67 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 68 | Twitch | +0.18 | 0.18 | 0.00 |  |
| 69 | Vayne | +0.18 | 0.18 | 0.00 |  |
| 70 | Zeri | +0.18 | 0.18 | 0.00 |  |
| 71 | Sona | +0.17 | 0.17 | 0.00 |  |
| 72 | Heimerdinger | +0.16 | 0.16 | 0.00 |  |
| 73 | Renata Glasc | +0.16 | 0.16 | 0.00 |  |
| 74 | Senna | +0.16 | 0.16 | 0.00 |  |
| 75 | Yunara | +0.16 | 0.16 | 0.00 |  |
| 76 | Hecarim | +0.15 | 0.21 | 0.06 |  |
| 77 | Jarvan IV | +0.15 | 0.20 | 0.05 |  |
| 78 | Draven | +0.15 | 0.15 | 0.00 |  |
| 79 | Ornn | +0.14 | 0.20 | 0.06 |  |
| 80 | Ezreal | +0.14 | 0.14 | 0.00 |  |
| 81 | Kai'Sa | +0.14 | 0.14 | 0.00 |  |
| 82 | Smolder | +0.14 | 0.14 | 0.00 |  |
| 83 | Zilean | +0.14 | 0.14 | 0.00 |  |
| 84 | Zoe | +0.14 | 0.14 | 0.00 |  |
| 85 | Volibear | +0.13 | 0.20 | 0.07 |  |
| 86 | Anivia | +0.12 | 0.12 | 0.00 |  |
| 87 | Annie | +0.12 | 0.12 | 0.00 |  |
| 88 | Gnar | +0.12 | 0.12 | 0.00 |  |
| 89 | Kennen | +0.12 | 0.12 | 0.00 |  |
| 90 | Lux | +0.12 | 0.12 | 0.00 |  |
| 91 | Jayce | +0.11 | 0.11 | 0.00 |  |
| 92 | Nidalee | +0.11 | 0.11 | 0.00 |  |
| 93 | Seraphine | +0.11 | 0.11 | 0.00 |  |
| 94 | Soraka | +0.11 | 0.11 | 0.00 |  |
| 95 | Ziggs | +0.11 | 0.11 | 0.00 |  |
| 96 | Zyra | +0.11 | 0.11 | 0.00 |  |
| 97 | Azir | +0.10 | 0.10 | 0.00 |  |
| 98 | Kog'Maw | +0.10 | 0.10 | 0.00 |  |
| 99 | Orianna | +0.10 | 0.10 | 0.00 |  |
| 100 | Shyvana | +0.09 | 0.20 | 0.11 |  |
| 101 | Brand | +0.09 | 0.09 | 0.00 |  |
| 102 | Nami | +0.09 | 0.09 | 0.00 |  |
| 103 | Neeko | +0.09 | 0.09 | 0.00 |  |
| 104 | Syndra | +0.09 | 0.09 | 0.00 |  |
| 105 | Karma | +0.08 | 0.08 | 0.00 |  |
| 106 | LeBlanc | +0.08 | 0.08 | 0.00 |  |
| 107 | Swain | +0.08 | 0.08 | 0.00 |  |
| 108 | Illaoi | +0.07 | 0.20 | 0.13 |  |
| 109 | Sett | +0.07 | 0.20 | 0.13 |  |
| 110 | Graves | +0.07 | 0.07 | 0.00 |  |
| 111 | Thresh | +0.06 | 0.06 | 0.00 |  |
| 112 | Viego | +0.05 | 0.20 | 0.15 |  |
| 113 | Nasus | +0.04 | 0.29 | 0.25 |  |
| 114 | Aurelion Sol | +0.03 | 0.09 | 0.06 |  |
| 115 | Rammus | +0.01 | 0.29 | 0.28 |  |
| 116 | Quinn | 0.00 | 0.14 | 0.14 |  |
| 117 | Lillia | 0.00 | 0.00 | 0.00 |  |
| 118 | Urgot | 0.00 | 0.00 | 0.00 |  |
| 119 | Ivern | -0.01 | 0.06 | 0.07 |  |
| 120 | Fizz | -0.05 | 0.00 | 0.05 |  |
| 121 | Sylas | -0.05 | 0.00 | 0.05 |  |
| 122 | Briar | -0.06 | 0.00 | 0.06 |  |
| 123 | Wukong | -0.06 | 0.00 | 0.06 |  |
| 124 | Rell | -0.06 | 0.00 | 0.06 |  |
| 125 | Caitlyn | -0.07 | 0.21 | 0.28 |  |
| 126 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 127 | Irelia | -0.07 | 0.00 | 0.07 |  |
| 128 | Qiyana | -0.07 | 0.00 | 0.07 |  |
| 129 | Akali | -0.08 | 0.00 | 0.08 |  |
| 130 | Ambessa | -0.08 | 0.00 | 0.08 |  |
| 131 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 132 | Riven | -0.08 | 0.00 | 0.08 |  |
| 133 | Talon | -0.08 | 0.00 | 0.08 |  |
| 134 | Aatrox | -0.09 | 0.00 | 0.09 |  |
| 135 | Nautilus | -0.09 | 0.00 | 0.09 |  |
| 136 | Tryndamere | -0.09 | 0.00 | 0.09 |  |
| 137 | Vi | -0.10 | 0.20 | 0.30 |  |
| 138 | Diana | -0.11 | 0.00 | 0.11 |  |
| 139 | Kassadin | -0.11 | 0.00 | 0.11 |  |
| 140 | Sejuani | -0.11 | 0.00 | 0.11 |  |
| 141 | Akshan | -0.12 | 0.12 | 0.24 |  |
| 142 | Skarner | -0.12 | 0.10 | 0.22 |  |
| 143 | Kha'Zix | -0.13 | 0.00 | 0.13 |  |
| 144 | Leona | -0.13 | 0.00 | 0.13 |  |
| 145 | Locke | -0.13 | 0.00 | 0.13 |  |
| 146 | Renekton | -0.13 | 0.00 | 0.13 |  |
| 147 | Katarina | -0.14 | 0.18 | 0.32 |  |
| 148 | Miss Fortune | -0.14 | 0.14 | 0.28 |  |
| 149 | Lucian | -0.15 | 0.13 | 0.28 |  |
| 150 | Pyke | -0.15 | 0.00 | 0.15 |  |
| 151 | Vel'Koz | -0.16 | 0.10 | 0.26 |  |
| 152 | Galio | -0.16 | 0.00 | 0.16 |  |
| 153 | Jhin | -0.17 | 0.11 | 0.28 |  |
| 154 | Darius | -0.18 | 0.00 | 0.18 |  |
| 155 | Trundle | -0.18 | 0.00 | 0.18 |  |
| 156 | Yorick | -0.18 | 0.00 | 0.18 |  |
| 157 | Twisted Fate | -0.19 | 0.16 | 0.35 |  |
| 158 | Xerath | -0.21 | 0.10 | 0.31 |  |
| 159 | Karthus | -0.22 | 0.06 | 0.28 |  |
| 160 | Gragas | -0.23 | 0.00 | 0.23 |  |
| 161 | Shen | -0.24 | 0.29 | 0.53 |  |
| 162 | Janna | -0.25 | 0.15 | 0.40 |  |
| 163 | Ryze | -0.25 | 0.10 | 0.35 |  |
| 164 | Blitzcrank | -0.25 | 0.00 | 0.25 |  |
| 165 | Cho'Gath | -0.25 | 0.00 | 0.25 |  |
| 166 | Dr. Mundo | -0.25 | 0.00 | 0.25 |  |
| 167 | Rumble | -0.25 | 0.00 | 0.25 |  |
| 168 | Fiddlesticks | -0.31 | 0.07 | 0.38 |  |
| 169 | Tahm Kench | -0.35 | 0.00 | 0.35 |  |
| 170 | Nunu & Willump | -0.37 | 0.25 | 0.62 |  |
| 171 | Taliyah | -0.38 | 0.10 | 0.48 |  |
| 172 | Naafiri | -0.48 | 0.00 | 0.48 |  |
