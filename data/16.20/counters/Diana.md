# Counters to Diana (patch 26.20)

Every champion ranked by what its kit does against Diana's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Diana's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Diana` for the full ledger of a matchup, with sources.

## Top 10

### 1. Bard (net +1.34)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Diana's Moonfall. Untargetable for 2.5 s, long enough to use ahead of Moonfall. (Bard R Tempered Fate → Diana R Moonfall)
- **0.40** untargetable: Tempered Fate makes Bard untargetable, dodging Diana's Lunar Rush. Untargetable for 2.5 s, long enough to use ahead of Lunar Rush. (Bard R Tempered Fate → Diana E Lunar Rush)
- **0.34** range: Bard's basic attacks reach 350 units farther than Diana's (500 vs 150 attack range). Diana closes the gap with Lunar Rush. (Bard basic attacks → Diana basic attacks)

### 2. Elise (net +1.33)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Diana's Moonfall. Untargetable for 0.6 s; Moonfall takes 0.25 s to land, enough to react. (Elise E Rappel → Diana R Moonfall)
- **0.42** untargetable: Rappel makes Elise untargetable, dodging Diana's Lunar Rush. Untargetable for 0.6 s; Lunar Rush lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Diana E Lunar Rush)
- **0.32** range: Elise's basic attacks reach 400 units farther than Diana's (550 vs 150 attack range). Diana closes the gap with Lunar Rush. (Elise basic attacks → Diana basic attacks)

### 3. Sivir (net +1.33)

- **0.69** spell shield: Spell Shield's spell shield blocks Diana's Lunar Rush. Spell shield for 1.5 s, long enough to use ahead of Lunar Rush. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Diana E Lunar Rush)
- **0.44** range: Sivir's basic attacks reach 350 units farther than Diana's (500 vs 150 attack range). Diana closes the gap with Lunar Rush. (Sivir basic attacks → Diana basic attacks)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Diana's Moonfall. Spell shield for 1.5 s, long enough to use ahead of Moonfall. A spell shield blocks only the first enemy ability that reaches it. The beam of moonlight does not crash down if champions hit blocked the initial effect with spell shield.
  - Enemy champions protected by spell shield do not count towards the damage increase. (Sivir E Spell Shield → Diana R Moonfall)

### 4. Vladimir (net +1.28)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Diana's Moonfall. Untargetable for 2 s, long enough to use ahead of Moonfall. (Vladimir W Sanguine Pool → Diana R Moonfall)
- **0.74** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Diana's Lunar Rush. Untargetable for 2 s, long enough to use ahead of Lunar Rush. (Vladimir W Sanguine Pool → Diana E Lunar Rush)
- **0.16** range: Vladimir's basic attacks reach 300 units farther than Diana's (450 vs 150 attack range). Diana closes the gap with Lunar Rush. (Vladimir basic attacks → Diana basic attacks)
- Watch out: Moonfall's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 5. Lissandra (net +1.27)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Diana's Moonfall. Untargetable for 2.5 s, long enough to use ahead of Moonfall. (Lissandra R Frozen Tomb → Diana R Moonfall)
- **0.40** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Diana's Lunar Rush. Untargetable for 2.5 s, long enough to use ahead of Lunar Rush. (Lissandra R Frozen Tomb → Diana E Lunar Rush)
- **0.22** range: Lissandra's basic attacks reach 400 units farther than Diana's (550 vs 150 attack range). Diana closes the gap with Lunar Rush. (Lissandra basic attacks → Diana basic attacks)

### 6. Xayah (net +1.25)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Diana's Moonfall. Untargetable for 1.5 s, long enough to use ahead of Moonfall. (Xayah R Featherstorm → Diana R Moonfall)
- **0.39** untargetable: Featherstorm makes Xayah untargetable, dodging Diana's Lunar Rush. Untargetable for 1.5 s, long enough to use ahead of Lunar Rush. (Xayah R Featherstorm → Diana E Lunar Rush)
- **0.36** range: Xayah's basic attacks reach 375 units farther than Diana's (525 vs 150 attack range). Diana closes the gap with Lunar Rush. (Xayah basic attacks → Diana basic attacks)

### 7. Fiora (net +1.14)

- **0.90** parry: Riposte parries Diana's Moonfall and stuns back. Parry for 0.75 s; Moonfall takes 0.25 s to land, enough to react. Negating Moonfall's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Diana R Moonfall)
- **0.44** parry: Riposte parries Diana's Lunar Rush. Parry for 0.75 s; Lunar Rush lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Diana E Lunar Rush)
- **0.06** attack speed slow: Riposte cuts Diana's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Diana basic attacks)

### 8. Aurora (net +1.13)

- **0.70** untargetable: Between Worlds makes Aurora untargetable, dodging Diana's Moonfall. Untargetable for 0.4 s; Moonfall takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Diana R Moonfall)
- **0.29** range: Aurora's basic attacks reach 400 units farther than Diana's (550 vs 150 attack range). Diana closes the gap with Lunar Rush. (Aurora basic attacks → Diana basic attacks)
- **0.23** untargetable: Between Worlds makes Aurora untargetable, dodging Diana's Lunar Rush. Untargetable for 0.4 s; Lunar Rush lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Diana E Lunar Rush)

### 9. Master Yi (net +1.09)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Diana's Moonfall. Untargetable for ?; Moonfall takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Diana R Moonfall)
- **0.42** untargetable: Alpha Strike makes Master Yi untargetable, dodging Diana's Lunar Rush. Untargetable for ?; Lunar Rush lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Diana E Lunar Rush)
- **0.15** cleanse: Highlander cleanses Diana's Moonfall (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Master Yi R Highlander → Diana R Moonfall)
- Watch out: Moonfall's airborne interrupts Master Yi's Meditate (normal channel).

### 10. Nocturne (net +1.08)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Diana's Lunar Rush. Spell shield for 1.5 s, long enough to use ahead of Lunar Rush. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Diana E Lunar Rush)
- **0.40** spell shield: Shroud of Darkness's spell shield blocks part of Diana's Moonfall. Spell shield for 1.5 s, long enough to use ahead of Moonfall. A spell shield blocks only the first enemy ability that reaches it. The beam of moonlight does not crash down if champions hit blocked the initial effect with spell shield.
  - Enemy champions protected by spell shield do not count towards the damage increase. (Nocturne W Shroud of Darkness → Diana R Moonfall)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Diana's Moonfall (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Diana R Moonfall)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Bard | +1.34 | 1.34 | 0.00 |  |
| 2 | Elise | +1.33 | 1.33 | 0.00 |  |
| 3 | Sivir | +1.33 | 1.33 | 0.00 |  |
| 4 | Vladimir | +1.28 | 1.33 | 0.05 |  |
| 5 | Lissandra | +1.27 | 1.27 | 0.00 |  |
| 6 | Xayah | +1.25 | 1.25 | 0.00 |  |
| 7 | Fiora | +1.14 | 1.14 | 0.00 |  |
| 8 | Aurora | +1.13 | 1.13 | 0.00 |  |
| 9 | Master Yi | +1.09 | 1.20 | 0.11 |  |
| 10 | Nocturne | +1.08 | 1.08 | 0.00 |  |
| 11 | Maokai | +1.04 | 1.04 | 0.00 |  |
| 12 | Rek'Sai | +1.02 | 1.02 | 0.00 |  |
| 13 | Gwen | +1.01 | 1.01 | 0.00 |  |
| 14 | Morgana | +0.98 | 0.98 | 0.00 |  |
| 15 | Yuumi | +0.96 | 1.34 | 0.38 |  |
| 16 | Kayle | +0.96 | 0.96 | 0.00 |  |
| 17 | Ekko | +0.94 | 0.94 | 0.00 |  |
| 18 | Evelynn | +0.92 | 0.92 | 0.00 |  |
| 19 | Shaco | +0.92 | 0.92 | 0.00 |  |
| 20 | Camille | +0.89 | 0.89 | 0.00 |  |
| 21 | Kindred | +0.88 | 0.88 | 0.00 |  |
| 22 | Pantheon | +0.84 | 0.89 | 0.05 |  |
| 23 | Zed | +0.82 | 0.82 | 0.00 |  |
| 24 | Warwick | +0.81 | 0.99 | 0.18 |  |
| 25 | Kalista | +0.81 | 0.81 | 0.00 |  |
| 26 | Olaf | +0.80 | 0.80 | 0.00 |  |
| 27 | Udyr | +0.80 | 0.80 | 0.00 |  |
| 28 | Zaahen | +0.80 | 0.80 | 0.00 |  |
| 29 | Kled | +0.77 | 0.77 | 0.00 |  |
| 30 | Sion | +0.72 | 0.80 | 0.08 |  |
| 31 | Vex | +0.72 | 0.72 | 0.00 |  |
| 32 | Viktor | +0.70 | 0.70 | 0.00 | dash stop (Gravity Field) |
| 33 | Jinx | +0.67 | 0.67 | 0.00 | dash stop (Flame Chompers!) |
| 34 | Teemo | +0.67 | 0.67 | 0.00 |  |
| 35 | Alistar | +0.64 | 0.64 | 0.00 |  |
| 36 | Braum | +0.64 | 0.64 | 0.00 | projectile block (Unbreakable) |
| 37 | Gangplank | +0.64 | 0.64 | 0.00 |  |
| 38 | Rengar | +0.64 | 0.64 | 0.00 |  |
| 39 | Veigar | +0.64 | 0.64 | 0.00 | dash stop (Event Horizon) |
| 40 | Hwei | +0.63 | 0.63 | 0.00 | dash stop (Grim Visage) |
| 41 | Ahri | +0.62 | 0.62 | 0.00 | dash stop (Charm) |
| 42 | Samira | +0.62 | 0.62 | 0.00 |  |
| 43 | Lulu | +0.61 | 0.61 | 0.00 |  |
| 44 | Cassiopeia | +0.60 | 0.60 | 0.00 |  |
| 45 | Mel | +0.59 | 0.59 | 0.00 |  |
| 46 | Xin Zhao | +0.56 | 0.56 | 0.00 |  |
| 47 | Taric | +0.54 | 0.54 | 0.00 |  |
| 48 | Milio | +0.51 | 0.51 | 0.00 |  |
| 49 | Kayn | +0.47 | 0.92 | 0.45 |  |
| 50 | Aphelios | +0.46 | 0.46 | 0.00 |  |
| 51 | Yasuo | +0.46 | 0.46 | 0.00 |  |
| 52 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 53 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 54 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 55 | Sona | +0.41 | 0.41 | 0.00 |  |
| 56 | Malzahar | +0.39 | 0.79 | 0.40 |  |
| 57 | Singed | +0.39 | 0.39 | 0.00 |  |
| 58 | Corki | +0.38 | 0.38 | 0.00 |  |
| 59 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 60 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 61 | Draven | +0.36 | 0.36 | 0.00 |  |
| 62 | Kai'Sa | +0.36 | 0.36 | 0.00 |  |
| 63 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 64 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 65 | Nilah | +0.34 | 0.34 | 0.00 |  |
| 66 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 67 | Senna | +0.32 | 0.32 | 0.00 |  |
| 68 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 69 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 70 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 71 | Gnar | +0.31 | 0.31 | 0.00 |  |
| 72 | Poppy | +0.30 | 0.50 | 0.20 | dash stop (Steadfast Presence) |
| 73 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 74 | Lux | +0.29 | 0.29 | 0.00 |  |
| 75 | Heimerdinger | +0.28 | 0.28 | 0.00 |  |
| 76 | Jax | +0.28 | 0.28 | 0.00 |  |
| 77 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 78 | Nidalee | +0.28 | 0.28 | 0.00 |  |
| 79 | Yone | +0.28 | 0.28 | 0.00 |  |
| 80 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 81 | Seraphine | +0.27 | 0.27 | 0.00 |  |
| 82 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 83 | Ziggs | +0.27 | 0.27 | 0.00 |  |
| 84 | Malphite | +0.26 | 0.26 | 0.00 |  |
| 85 | Azir | +0.25 | 0.25 | 0.00 |  |
| 86 | Kog'Maw | +0.25 | 0.25 | 0.00 |  |
| 87 | Orianna | +0.25 | 0.25 | 0.00 |  |
| 88 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 89 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 90 | Quinn | +0.22 | 0.36 | 0.14 |  |
| 91 | Annie | +0.22 | 0.22 | 0.00 |  |
| 92 | Brand | +0.22 | 0.22 | 0.00 |  |
| 93 | Graves | +0.22 | 0.22 | 0.00 |  |
| 94 | Nami | +0.22 | 0.22 | 0.00 |  |
| 95 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 96 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 97 | Varus | +0.21 | 0.27 | 0.06 |  |
| 98 | Garen | +0.21 | 0.21 | 0.00 |  |
| 99 | Karma | +0.21 | 0.21 | 0.00 |  |
| 100 | LeBlanc | +0.21 | 0.21 | 0.00 |  |
| 101 | Swain | +0.20 | 0.20 | 0.00 |  |
| 102 | Amumu | +0.19 | 0.19 | 0.00 |  |
| 103 | Thresh | +0.18 | 0.18 | 0.00 |  |
| 104 | Zac | +0.17 | 0.40 | 0.23 | dash stop (Stretching Strikes) |
| 105 | Aurelion Sol | +0.16 | 0.22 | 0.06 |  |
| 106 | K'Sante | +0.16 | 0.16 | 0.00 |  |
| 107 | Urgot | +0.13 | 0.13 | 0.00 |  |
| 108 | Rammus | +0.11 | 0.27 | 0.16 |  |
| 109 | Ivern | +0.11 | 0.18 | 0.07 |  |
| 110 | Rakan | +0.11 | 0.11 | 0.00 |  |
| 111 | Lillia | +0.10 | 0.10 | 0.00 |  |
| 112 | Skarner | +0.10 | 0.10 | 0.00 |  |
| 113 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 114 | Hecarim | +0.08 | 0.08 | 0.00 |  |
| 115 | Illaoi | +0.08 | 0.08 | 0.00 |  |
| 116 | Jarvan IV | +0.08 | 0.08 | 0.00 |  |
| 117 | Ornn | +0.08 | 0.08 | 0.00 |  |
| 118 | Sett | +0.08 | 0.08 | 0.00 |  |
| 119 | Shyvana | +0.08 | 0.08 | 0.00 |  |
| 120 | Volibear | +0.08 | 0.08 | 0.00 |  |
| 121 | Akshan | +0.07 | 0.32 | 0.25 |  |
| 122 | Lucian | +0.06 | 0.34 | 0.28 |  |
| 123 | Mordekaiser | +0.06 | 0.06 | 0.00 |  |
| 124 | Twisted Fate | +0.05 | 0.40 | 0.35 |  |
| 125 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 126 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 127 | Akali | 0.00 | 0.00 | 0.00 |  |
| 128 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 129 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 130 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 131 | Briar | 0.00 | 0.00 | 0.00 |  |
| 132 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 133 | Darius | 0.00 | 0.00 | 0.00 |  |
| 134 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 135 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 136 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 137 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 138 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 139 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 140 | Leona | 0.00 | 0.00 | 0.00 |  |
| 141 | Locke | 0.00 | 0.00 | 0.00 |  |
| 142 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 143 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 144 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 145 | Rell | 0.00 | 0.00 | 0.00 |  |
| 146 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 147 | Riven | 0.00 | 0.00 | 0.00 |  |
| 148 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 149 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 150 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 151 | Talon | 0.00 | 0.00 | 0.00 |  |
| 152 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 153 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 154 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 155 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 156 | Vel'Koz | -0.03 | 0.25 | 0.28 |  |
| 157 | Janna | -0.04 | 0.36 | 0.40 |  |
| 158 | Viego | -0.04 | 0.08 | 0.12 |  |
| 159 | Xerath | -0.06 | 0.25 | 0.31 |  |
| 160 | Pyke | -0.08 | 0.00 | 0.08 |  |
| 161 | Galio | -0.09 | 0.00 | 0.09 |  |
| 162 | Karthus | -0.10 | 0.18 | 0.28 |  |
| 163 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 164 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 165 | Nunu & Willump | -0.12 | 0.25 | 0.37 |  |
| 166 | Vi | -0.14 | 0.08 | 0.22 |  |
| 167 | Shen | -0.18 | 0.27 | 0.45 |  |
| 168 | Katarina | -0.20 | 0.00 | 0.20 |  |
| 169 | Fiddlesticks | -0.22 | 0.18 | 0.40 |  |
| 170 | Taliyah | -0.23 | 0.25 | 0.48 |  |
| 171 | Tahm Kench | -0.26 | 0.00 | 0.26 |  |
| 172 | Naafiri | -0.45 | 0.00 | 0.45 |  |
