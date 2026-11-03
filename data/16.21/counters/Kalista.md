# Counters to Kalista (patch 26.21)

Every champion ranked by what its kit does against Kalista's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kalista's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kalista` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +0.95)

- **0.95** spell shield: Spell Shield's spell shield blocks Kalista's Fate's Call. Spell shield for 1.5 s, long enough to use ahead of Fate's Call. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kalista R Fate's Call)

### 2. Vladimir (net +0.87)

- **0.95** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kalista's Fate's Call. Untargetable for 2 s, long enough to use ahead of Fate's Call. (Vladimir W Sanguine Pool → Kalista R Fate's Call)
- **0.23** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kalista's Basic Attack. Untargetable for 2 s, long enough to use ahead of Basic Attack. (Vladimir W Sanguine Pool → Kalista basic attacks)
- Watch out: Kalista's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

### 3. Xayah (net +0.77)

- **0.95** untargetable: Featherstorm makes Xayah untargetable, dodging Kalista's Fate's Call. Untargetable for 1.5 s, long enough to use ahead of Fate's Call. (Xayah R Featherstorm → Kalista R Fate's Call)
- **0.14** untargetable: Featherstorm makes Xayah untargetable, dodging Kalista's Basic Attack. Untargetable for 1.5 s, long enough to use ahead of Basic Attack. (Xayah R Featherstorm → Kalista basic attacks)
- Watch out: Fate's Call cleanses Xayah's Bladecaller (root) after it lands.

### 4. Rek'Sai (net +0.64)

- **0.95** untargetable: Void Rush makes Rek'Sai untargetable, dodging Kalista's Fate's Call. Untargetable for 1.5 s, long enough to use ahead of Fate's Call. (Rek'Sai R Void Rush → Kalista R Fate's Call)
- **0.20** cc immunity: Void Rush is displacement immune, ignoring Kalista's Fate's Call (airborne) during it. Only during Void Rush (1.5 s). (Rek'Sai R Void Rush → Kalista R Fate's Call)
- **0.14** untargetable: Void Rush makes Rek'Sai untargetable, dodging Kalista's Basic Attack. Untargetable for 1.5 s, long enough to use ahead of Basic Attack. (Rek'Sai R Void Rush → Kalista basic attacks)
- Watch out: Fate's Call cleanses Rek'Sai's Unburrow (airborne) after it lands.

### 5. Aurora (net +0.54)

- **0.57** untargetable: Between Worlds makes Aurora untargetable, dodging Kalista's Fate's Call. Untargetable for 0.4 s; Fate's Call lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kalista R Fate's Call)
- **0.19** cc immunity: Between Worlds is displacement immune, ignoring Kalista's Fate's Call (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Kalista R Fate's Call)
- **0.14** untargetable: Between Worlds makes Aurora untargetable, dodging Kalista's Basic Attack. Untargetable for 0.4 s, timed to Basic Attack. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kalista basic attacks)
- Watch out: Fate's Call cleanses Aurora's Between Worlds (slow) after it lands.

### 6. Nocturne (net +0.49)

- **0.95** spell shield: Shroud of Darkness's spell shield blocks Kalista's Fate's Call. Spell shield for 1.5 s, long enough to use ahead of Fate's Call. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Kalista R Fate's Call)
- **0.19** cc immunity: Paranoia is displacement immune, ignoring Kalista's Fate's Call (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Kalista R Fate's Call)
- Watch out: Kalista's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

### 7. Bard (net +0.42)

- **0.95** untargetable: Tempered Fate makes Bard untargetable, dodging Kalista's Fate's Call. Untargetable for 2.5 s, long enough to use ahead of Fate's Call. (Bard R Tempered Fate → Kalista R Fate's Call)
- **0.14** untargetable: Tempered Fate makes Bard untargetable, dodging Kalista's Basic Attack. Untargetable for 2.5 s, long enough to use ahead of Basic Attack. (Bard R Tempered Fate → Kalista basic attacks)
- Watch out: Fate's Call cleanses Bard's Tempered Fate (stun) after it lands.

### 8. Lissandra (net +0.40)

- **0.95** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Kalista's Fate's Call. Untargetable for 2.5 s, long enough to use ahead of Fate's Call. (Lissandra R Frozen Tomb → Kalista R Fate's Call)
- **0.14** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Kalista's Basic Attack. Untargetable for 2.5 s, long enough to use ahead of Basic Attack. (Lissandra R Frozen Tomb → Kalista basic attacks)
- **0.11** dash stop: Frozen Tomb's knockdown can stop Kalista's Martial Poise mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Kalista I Martial Poise)
- Watch out: Fate's Call cleanses Lissandra's Frozen Tomb (slow, stun) after it lands.

### 9. Master Yi (net +0.37)

- **0.57** untargetable: Alpha Strike makes Master Yi untargetable, dodging Kalista's Fate's Call. Untargetable for ?; Fate's Call lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Kalista R Fate's Call)
- **0.22** untargetable: Alpha Strike makes Master Yi untargetable, dodging Kalista's Basic Attack. Untargetable for ?, timed to Basic Attack. (Master Yi Q Alpha Strike → Kalista basic attacks)
- **0.05** cc immunity: Highlander makes Master Yi immune to Kalista's Rend (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Kalista E Rend)
- Watch out: Kalista's basic attacks reach 350 units farther than Master Yi's (525 vs 175 attack range).

### 10. Zed (net +0.37)

- **0.57** untargetable: Death Mark makes Zed untargetable, dodging Kalista's Fate's Call. Untargetable for 0.6 s; Fate's Call lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Zed R Death Mark → Kalista R Fate's Call)
- **0.14** untargetable: Death Mark makes Zed untargetable, dodging Kalista's Basic Attack. Untargetable for 0.6 s, timed to Basic Attack. (Zed R Death Mark → Kalista basic attacks)
- Watch out: Kalista's basic attacks reach 400 units farther than Zed's (525 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.95 | 0.95 | 0.00 |  |
| 2 | Vladimir | +0.87 | 1.07 | 0.20 |  |
| 3 | Xayah | +0.77 | 1.02 | 0.25 |  |
| 4 | Rek'Sai | +0.64 | 1.09 | 0.45 |  |
| 5 | Aurora | +0.54 | 0.70 | 0.16 |  |
| 6 | Nocturne | +0.49 | 1.14 | 0.65 |  |
| 7 | Bard | +0.42 | 1.02 | 0.60 |  |
| 8 | Lissandra | +0.40 | 1.05 | 0.65 |  |
| 9 | Master Yi | +0.37 | 0.75 | 0.38 |  |
| 10 | Zed | +0.37 | 0.64 | 0.27 |  |
| 11 | Morgana | +0.34 | 0.99 | 0.65 |  |
| 12 | Fiora | +0.32 | 0.81 | 0.49 |  |
| 13 | Samira | +0.32 | 0.48 | 0.16 |  |
| 14 | Udyr | +0.31 | 1.00 | 0.69 |  |
| 15 | Teemo | +0.31 | 0.43 | 0.12 | blind (Blinding Dart) |
| 16 | Olaf | +0.29 | 0.98 | 0.69 |  |
| 17 | Gwen | +0.29 | 0.68 | 0.39 |  |
| 18 | Yuumi | +0.28 | 0.72 | 0.44 |  |
| 19 | Mel | +0.20 | 0.45 | 0.25 |  |
| 20 | Evelynn | +0.17 | 0.64 | 0.47 |  |
| 21 | Kayle | +0.16 | 0.20 | 0.04 |  |
| 22 | Shaco | +0.13 | 0.64 | 0.51 |  |
| 23 | Vex | +0.13 | 0.36 | 0.23 |  |
| 24 | Fizz | +0.03 | 0.72 | 0.69 |  |
| 25 | Zaahen | +0.03 | 0.60 | 0.57 |  |
| 26 | Gangplank | +0.02 | 0.80 | 0.78 |  |
| 27 | Corki | 0.00 | 0.00 | 0.00 |  |
| 28 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 29 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 30 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 31 | Alistar | -0.02 | 0.78 | 0.80 |  |
| 32 | Kayn | -0.04 | 0.64 | 0.68 |  |
| 33 | Kindred | -0.04 | 0.00 | 0.04 |  |
| 34 | Kog'Maw | -0.04 | 0.00 | 0.04 |  |
| 35 | Twitch | -0.04 | 0.00 | 0.04 |  |
| 36 | Zeri | -0.04 | 0.00 | 0.04 |  |
| 37 | Jinx | -0.06 | 0.22 | 0.28 |  |
| 38 | Ahri | -0.06 | 0.20 | 0.26 |  |
| 39 | Yunara | -0.06 | 0.00 | 0.06 |  |
| 40 | Malzahar | -0.07 | 0.62 | 0.69 |  |
| 41 | Veigar | -0.07 | 0.19 | 0.26 |  |
| 42 | Viktor | -0.07 | 0.19 | 0.26 |  |
| 43 | Graves | -0.09 | 0.00 | 0.09 |  |
| 44 | Rengar | -0.10 | 0.80 | 0.90 |  |
| 45 | Jax | -0.12 | 0.45 | 0.57 |  |
| 46 | Smolder | -0.12 | 0.00 | 0.12 |  |
| 47 | Annie | -0.16 | 0.04 | 0.20 |  |
| 48 | LeBlanc | -0.16 | 0.00 | 0.16 |  |
| 49 | Illaoi | -0.17 | 0.19 | 0.36 |  |
| 50 | Sion | -0.19 | 0.98 | 1.17 |  |
| 51 | Yasuo | -0.19 | 0.57 | 0.76 |  |
| 52 | Milio | -0.19 | 0.06 | 0.25 |  |
| 53 | Kennen | -0.20 | 0.00 | 0.20 |  |
| 54 | Hwei | -0.21 | 0.22 | 0.43 |  |
| 55 | Akshan | -0.21 | 0.00 | 0.21 |  |
| 56 | Senna | -0.23 | 0.04 | 0.27 |  |
| 57 | Lucian | -0.23 | 0.00 | 0.23 |  |
| 58 | Elise | -0.25 | 0.00 | 0.25 |  |
| 59 | Warwick | -0.26 | 0.83 | 1.09 |  |
| 60 | Braum | -0.26 | 0.75 | 1.01 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 61 | Akali | -0.26 | 0.00 | 0.26 |  |
| 62 | Draven | -0.26 | 0.00 | 0.26 |  |
| 63 | Talon | -0.26 | 0.00 | 0.26 |  |
| 64 | Vayne | -0.26 | 0.00 | 0.26 |  |
| 65 | Zoe | -0.26 | 0.00 | 0.26 |  |
| 66 | Lux | -0.27 | 0.00 | 0.27 |  |
| 67 | Miss Fortune | -0.27 | 0.00 | 0.27 |  |
| 68 | Zilean | -0.27 | 0.00 | 0.27 |  |
| 69 | Lulu | -0.28 | 0.30 | 0.58 |  |
| 70 | Brand | -0.28 | 0.00 | 0.28 |  |
| 71 | Jayce | -0.28 | 0.00 | 0.28 |  |
| 72 | Swain | -0.29 | 0.00 | 0.29 |  |
| 73 | Syndra | -0.29 | 0.00 | 0.29 |  |
| 74 | Cassiopeia | -0.30 | 0.21 | 0.51 |  |
| 75 | Soraka | -0.30 | 0.00 | 0.30 |  |
| 76 | Caitlyn | -0.31 | 0.07 | 0.38 |  |
| 77 | Tryndamere | -0.32 | 0.00 | 0.32 |  |
| 78 | Camille | -0.33 | 0.70 | 1.03 |  |
| 79 | Heimerdinger | -0.33 | 0.05 | 0.38 |  |
| 80 | Ziggs | -0.33 | 0.00 | 0.33 |  |
| 81 | Kassadin | -0.34 | 0.00 | 0.34 |  |
| 82 | Karma | -0.35 | 0.00 | 0.35 |  |
| 83 | Nasus | -0.36 | 0.33 | 0.69 |  |
| 84 | Ivern | -0.36 | 0.00 | 0.36 |  |
| 85 | Anivia | -0.37 | 0.03 | 0.40 |  |
| 86 | Nilah | -0.38 | 0.37 | 0.75 |  |
| 87 | Kha'Zix | -0.38 | 0.00 | 0.38 |  |
| 88 | Quinn | -0.38 | 0.00 | 0.38 |  |
| 89 | Maokai | -0.39 | 0.72 | 1.11 |  |
| 90 | Kled | -0.39 | 0.60 | 0.99 |  |
| 91 | Vel'Koz | -0.39 | 0.00 | 0.39 |  |
| 92 | Xerath | -0.39 | 0.00 | 0.39 |  |
| 93 | Jhin | -0.40 | 0.00 | 0.40 |  |
| 94 | Ekko | -0.41 | 0.00 | 0.41 |  |
| 95 | Ashe | -0.42 | 0.05 | 0.47 |  |
| 96 | Karthus | -0.42 | 0.00 | 0.42 |  |
| 97 | Shen | -0.43 | 0.43 | 0.86 |  |
| 98 | Locke | -0.43 | 0.00 | 0.43 |  |
| 99 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 100 | Twisted Fate | -0.45 | 0.00 | 0.45 |  |
| 101 | Volibear | -0.47 | 0.19 | 0.66 |  |
| 102 | Ryze | -0.48 | 0.00 | 0.48 |  |
| 103 | Shyvana | -0.49 | 0.19 | 0.68 |  |
| 104 | Bel'Veth | -0.49 | 0.00 | 0.49 |  |
| 105 | Katarina | -0.49 | 0.00 | 0.49 |  |
| 106 | Thresh | -0.49 | 0.00 | 0.49 |  |
| 107 | Varus | -0.49 | 0.00 | 0.49 |  |
| 108 | Tristana | -0.50 | 0.11 | 0.61 |  |
| 109 | Gnar | -0.50 | 0.00 | 0.50 |  |
| 110 | Sylas | -0.52 | 0.00 | 0.52 |  |
| 111 | Orianna | -0.53 | 0.00 | 0.53 |  |
| 112 | Garen | -0.55 | 0.12 | 0.67 |  |
| 113 | Azir | -0.56 | 0.00 | 0.56 |  |
| 114 | Irelia | -0.56 | 0.00 | 0.56 |  |
| 115 | Renekton | -0.57 | 0.00 | 0.57 |  |
| 116 | Sona | -0.58 | 0.00 | 0.58 |  |
| 117 | Naafiri | -0.59 | 0.00 | 0.59 |  |
| 118 | Pantheon | -0.61 | 0.22 | 0.83 |  |
| 119 | Aatrox | -0.61 | 0.00 | 0.61 |  |
| 120 | Yone | -0.65 | 0.30 | 0.95 |  |
| 121 | K'Sante | -0.66 | 0.38 | 1.04 |  |
| 122 | Aphelios | -0.66 | 0.05 | 0.71 |  |
| 123 | Malphite | -0.67 | 0.40 | 1.07 |  |
| 124 | Neeko | -0.67 | 0.00 | 0.67 |  |
| 125 | Zyra | -0.67 | 0.00 | 0.67 |  |
| 126 | Singed | -0.68 | 0.22 | 0.90 |  |
| 127 | Lee Sin | -0.69 | 0.00 | 0.69 |  |
| 128 | Dr. Mundo | -0.70 | 0.00 | 0.70 |  |
| 129 | Nami | -0.71 | 0.00 | 0.71 |  |
| 130 | Pyke | -0.71 | 0.00 | 0.71 |  |
| 131 | Riven | -0.71 | 0.00 | 0.71 |  |
| 132 | Wukong | -0.73 | 0.00 | 0.73 |  |
| 133 | Aurelion Sol | -0.74 | 0.00 | 0.74 |  |
| 134 | Renata Glasc | -0.76 | 0.00 | 0.76 |  |
| 135 | Rumble | -0.76 | 0.00 | 0.76 |  |
| 136 | Seraphine | -0.77 | 0.00 | 0.77 |  |
| 137 | Jarvan IV | -0.78 | 0.19 | 0.97 |  |
| 138 | Viego | -0.78 | 0.19 | 0.97 |  |
| 139 | Mordekaiser | -0.79 | 0.08 | 0.87 |  |
| 140 | Lillia | -0.79 | 0.00 | 0.79 |  |
| 141 | Urgot | -0.79 | 0.00 | 0.79 |  |
| 142 | Diana | -0.81 | 0.00 | 0.81 |  |
| 143 | Rammus | -0.82 | 0.32 | 1.14 |  |
| 144 | Poppy | -0.82 | 0.28 | 1.10 |  |
| 145 | Janna | -0.83 | 0.00 | 0.83 |  |
| 146 | Rakan | -0.84 | 0.00 | 0.84 |  |
| 147 | Yorick | -0.85 | 0.00 | 0.85 |  |
| 148 | Xin Zhao | -0.86 | 0.14 | 1.00 |  |
| 149 | Darius | -0.86 | 0.00 | 0.86 |  |
| 150 | Zac | -0.87 | 0.22 | 1.09 |  |
| 151 | Hecarim | -0.87 | 0.20 | 1.07 |  |
| 152 | Taric | -0.87 | 0.00 | 0.87 |  |
| 153 | Trundle | -0.87 | 0.00 | 0.87 |  |
| 154 | Sett | -0.90 | 0.19 | 1.09 |  |
| 155 | Ornn | -0.93 | 0.19 | 1.12 |  |
| 156 | Vi | -0.94 | 0.19 | 1.13 |  |
| 157 | Cho'Gath | -0.95 | 0.00 | 0.95 |  |
| 158 | Ambessa | -0.96 | 0.00 | 0.96 |  |
| 159 | Qiyana | -0.97 | 0.00 | 0.97 |  |
| 160 | Briar | -0.98 | 0.00 | 0.98 |  |
| 161 | Nunu & Willump | -0.99 | 0.13 | 1.12 |  |
| 162 | Amumu | -0.99 | 0.10 | 1.09 |  |
| 163 | Nautilus | -0.99 | 0.00 | 0.99 |  |
| 164 | Leona | -1.00 | 0.00 | 1.00 |  |
| 165 | Gragas | -1.02 | 0.00 | 1.02 |  |
| 166 | Rell | -1.02 | 0.00 | 1.02 |  |
| 167 | Tahm Kench | -1.03 | 0.00 | 1.03 |  |
| 168 | Blitzcrank | -1.07 | 0.00 | 1.07 |  |
| 169 | Sejuani | -1.10 | 0.00 | 1.10 |  |
| 170 | Taliyah | -1.10 | 0.00 | 1.10 |  |
| 171 | Skarner | -1.20 | 0.06 | 1.26 |  |
| 172 | Galio | -1.37 | 0.00 | 1.37 |  |
