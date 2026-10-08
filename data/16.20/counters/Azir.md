# Counters to Azir (patch 26.20)

Every champion ranked by what its kit does against Azir's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Azir's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Azir` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.08)

- **0.80** spell shield: Spell Shield's spell shield blocks Azir's Emperor's Divide. Spell shield for 1.5 s, long enough to use ahead of Emperor's Divide. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Azir R Emperor's Divide)
- **0.56** spell shield: Spell Shield's spell shield blocks Azir's Shifting Sands. Spell shield for 1.5 s, long enough to use ahead of Shifting Sands. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Azir E Shifting Sands)

### 2. Lissandra (net +1.00)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Azir's Emperor's Divide. Untargetable for 2.5 s, long enough to use ahead of Emperor's Divide. (Lissandra R Frozen Tomb → Azir R Emperor's Divide)
- **0.31** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Azir's Shifting Sands. Untargetable for 2.5 s, long enough to use ahead of Shifting Sands. (Lissandra R Frozen Tomb → Azir E Shifting Sands)
- **0.16** dash stop: Frozen Tomb's knockdown can stop Azir's Shifting Sands mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Azir E Shifting Sands)

### 3. Nocturne (net +0.99)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Azir's Emperor's Divide. Spell shield for 1.5 s, long enough to use ahead of Emperor's Divide. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Azir R Emperor's Divide)
- **0.60** spell shield: Shroud of Darkness's spell shield blocks Azir's Shifting Sands. Spell shield for 1.5 s, long enough to use ahead of Shifting Sands. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Azir E Shifting Sands)
- **0.16** cc immunity: Paranoia is displacement immune, ignoring Azir's Emperor's Divide (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Azir R Emperor's Divide)
- Watch out: Azir's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

### 4. Elise (net +0.97)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Azir's Emperor's Divide. Untargetable for 0.6 s; Emperor's Divide takes 0.9 s to land, enough to react. (Elise E Rappel → Azir R Emperor's Divide)
- **0.34** untargetable: Rappel makes Elise untargetable, dodging Azir's Shifting Sands. Untargetable for 0.6 s; Shifting Sands lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Azir E Shifting Sands)

### 5. Bard (net +0.96)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Azir's Emperor's Divide. Untargetable for 2.5 s, long enough to use ahead of Emperor's Divide. (Bard R Tempered Fate → Azir R Emperor's Divide)
- **0.31** untargetable: Tempered Fate makes Bard untargetable, dodging Azir's Shifting Sands. Untargetable for 2.5 s, long enough to use ahead of Shifting Sands. (Bard R Tempered Fate → Azir E Shifting Sands)

### 6. Vladimir (net +0.95)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Azir's Emperor's Divide. Untargetable for 2 s, long enough to use ahead of Emperor's Divide. (Vladimir W Sanguine Pool → Azir R Emperor's Divide)
- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Azir's Shifting Sands. Untargetable for 2 s, long enough to use ahead of Shifting Sands. (Vladimir W Sanguine Pool → Azir E Shifting Sands)
- Watch out: Azir's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

### 7. Xayah (net +0.90)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Azir's Emperor's Divide. Untargetable for 1.5 s, long enough to use ahead of Emperor's Divide. (Xayah R Featherstorm → Azir R Emperor's Divide)
- **0.30** untargetable: Featherstorm makes Xayah untargetable, dodging Azir's Shifting Sands. Untargetable for 1.5 s, long enough to use ahead of Shifting Sands. (Xayah R Featherstorm → Azir E Shifting Sands)

### 8. Aurora (net +0.88)

- **0.75** untargetable: Between Worlds makes Aurora untargetable, dodging Azir's Emperor's Divide. Untargetable for 0.4 s; Emperor's Divide takes 0.9 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Azir R Emperor's Divide)
- **0.18** untargetable: Between Worlds makes Aurora untargetable, dodging Azir's Shifting Sands. Untargetable for 0.4 s; Shifting Sands lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Azir E Shifting Sands)
- **0.16** cc immunity: Between Worlds is displacement immune, ignoring Azir's Emperor's Divide (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Azir R Emperor's Divide)

### 9. Fiora (net +0.85)

- **0.90** parry: Riposte parries Azir's Emperor's Divide and stuns back. Parry for 0.75 s; Emperor's Divide takes 0.9 s to land, enough to react. Negating Emperor's Divide's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Azir R Emperor's Divide)
- **0.36** parry: Riposte parries Azir's Shifting Sands. Parry for 0.75 s; Shifting Sands lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Azir E Shifting Sands)
- **0.06** attack speed slow: Riposte cuts Azir's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Azir basic attacks)
- Watch out: Azir's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range).

### 10. Rek'Sai (net +0.84)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Azir's Emperor's Divide. Untargetable for 1.5 s, long enough to use ahead of Emperor's Divide. (Rek'Sai R Void Rush → Azir R Emperor's Divide)
- **0.31** untargetable: Void Rush makes Rek'Sai untargetable, dodging Azir's Shifting Sands. Untargetable for 1.5 s, long enough to use ahead of Shifting Sands. (Rek'Sai R Void Rush → Azir E Shifting Sands)
- **0.16** cc immunity: Void Rush is displacement immune, ignoring Azir's Emperor's Divide (airborne) during it. Only during Void Rush (1.5 s). (Rek'Sai R Void Rush → Azir R Emperor's Divide)
- Watch out: Azir's basic attacks reach 350 units farther than Rek'Sai's (525 vs 175 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.08 | 1.08 | 0.00 |  |
| 2 | Lissandra | +1.00 | 1.00 | 0.00 |  |
| 3 | Nocturne | +0.99 | 1.26 | 0.27 |  |
| 4 | Elise | +0.97 | 0.97 | 0.00 |  |
| 5 | Bard | +0.96 | 0.96 | 0.00 |  |
| 6 | Vladimir | +0.95 | 1.10 | 0.15 |  |
| 7 | Xayah | +0.90 | 0.90 | 0.00 |  |
| 8 | Aurora | +0.88 | 0.88 | 0.00 |  |
| 9 | Fiora | +0.85 | 1.10 | 0.25 |  |
| 10 | Rek'Sai | +0.84 | 1.00 | 0.16 |  |
| 11 | Camille | +0.80 | 0.93 | 0.13 |  |
| 12 | Morgana | +0.74 | 0.84 | 0.10 |  |
| 13 | Ekko | +0.73 | 0.91 | 0.18 |  |
| 14 | Gwen | +0.72 | 0.97 | 0.25 |  |
| 15 | Evelynn | +0.72 | 0.90 | 0.18 |  |
| 16 | Shaco | +0.72 | 0.90 | 0.18 |  |
| 17 | Maokai | +0.71 | 0.98 | 0.27 |  |
| 18 | Warwick | +0.70 | 1.06 | 0.36 |  |
| 19 | Master Yi | +0.70 | 1.04 | 0.34 |  |
| 20 | Zaahen | +0.67 | 0.83 | 0.16 |  |
| 21 | Zed | +0.66 | 0.84 | 0.18 |  |
| 22 | Kled | +0.65 | 0.74 | 0.09 |  |
| 23 | Kayle | +0.62 | 0.62 | 0.00 |  |
| 24 | Udyr | +0.59 | 0.86 | 0.27 |  |
| 25 | Kalista | +0.56 | 0.56 | 0.00 |  |
| 26 | Pantheon | +0.55 | 0.76 | 0.21 |  |
| 27 | Yuumi | +0.53 | 0.98 | 0.45 |  |
| 28 | Vex | +0.51 | 0.51 | 0.00 |  |
| 29 | Samira | +0.47 | 0.47 | 0.00 | projectile block (Blade Whirl) |
| 30 | Mel | +0.46 | 0.46 | 0.00 | projectile block (Rebuttal) |
| 31 | Kindred | +0.43 | 0.43 | 0.00 |  |
| 32 | Alistar | +0.39 | 0.66 | 0.27 |  |
| 33 | Ahri | +0.36 | 0.36 | 0.00 |  |
| 34 | Hwei | +0.36 | 0.36 | 0.00 |  |
| 35 | Jinx | +0.36 | 0.36 | 0.00 |  |
| 36 | Jax | +0.35 | 0.62 | 0.27 | attack dodge (Counter Strike) |
| 37 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 38 | Veigar | +0.35 | 0.35 | 0.00 |  |
| 39 | Viktor | +0.35 | 0.35 | 0.00 |  |
| 40 | Kayn | +0.32 | 0.90 | 0.58 |  |
| 41 | Yasuo | +0.31 | 0.47 | 0.16 | projectile block (Wind Wall) |
| 42 | Olaf | +0.30 | 0.83 | 0.53 |  |
| 43 | Xin Zhao | +0.30 | 0.53 | 0.23 |  |
| 44 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 45 | Sion | +0.28 | 0.83 | 0.55 |  |
| 46 | Nilah | +0.27 | 0.47 | 0.20 |  |
| 47 | Malzahar | +0.26 | 0.63 | 0.37 |  |
| 48 | Lulu | +0.25 | 0.25 | 0.00 |  |
| 49 | Yone | +0.24 | 0.36 | 0.12 |  |
| 50 | Braum | +0.23 | 0.50 | 0.27 | projectile block (Unbreakable) |
| 51 | K'Sante | +0.19 | 0.32 | 0.13 |  |
| 52 | Corki | +0.16 | 0.16 | 0.00 |  |
| 53 | Rengar | +0.15 | 0.68 | 0.53 |  |
| 54 | Gangplank | +0.14 | 0.67 | 0.53 |  |
| 55 | Tristana | +0.11 | 0.11 | 0.00 |  |
| 56 | Malphite | +0.07 | 0.34 | 0.27 |  |
| 57 | Milio | +0.06 | 0.06 | 0.00 |  |
| 58 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 59 | Ashe | +0.05 | 0.05 | 0.00 |  |
| 60 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 61 | Jarvan IV | +0.04 | 0.16 | 0.12 |  |
| 62 | Annie | +0.04 | 0.04 | 0.00 |  |
| 63 | Senna | +0.04 | 0.04 | 0.00 |  |
| 64 | Anivia | +0.03 | 0.03 | 0.00 |  |
| 65 | Hecarim | +0.01 | 0.17 | 0.16 |  |
| 66 | Ornn | 0.00 | 0.16 | 0.16 |  |
| 67 | Brand | 0.00 | 0.00 | 0.00 |  |
| 68 | Draven | 0.00 | 0.00 | 0.00 |  |
| 69 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 70 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 71 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 72 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 73 | Karma | 0.00 | 0.00 | 0.00 |  |
| 74 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 75 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 76 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 77 | Lux | 0.00 | 0.00 | 0.00 |  |
| 78 | Nami | 0.00 | 0.00 | 0.00 |  |
| 79 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 80 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 81 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 82 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 83 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 84 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 85 | Sona | 0.00 | 0.00 | 0.00 |  |
| 86 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 87 | Swain | 0.00 | 0.00 | 0.00 |  |
| 88 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 89 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 90 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 91 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 92 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 93 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 94 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 95 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 96 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 97 | Taric | -0.01 | 0.49 | 0.50 |  |
| 98 | Volibear | -0.01 | 0.16 | 0.17 |  |
| 99 | Shen | -0.03 | 0.60 | 0.63 | attack block (Spirit's Refuge) |
| 100 | Thresh | -0.03 | 0.00 | 0.03 |  |
| 101 | Graves | -0.04 | 0.00 | 0.04 |  |
| 102 | Varus | -0.05 | 0.00 | 0.05 |  |
| 103 | Poppy | -0.06 | 0.41 | 0.47 |  |
| 104 | Viego | -0.06 | 0.16 | 0.22 |  |
| 105 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 106 | Ivern | -0.07 | 0.00 | 0.07 |  |
| 107 | Amumu | -0.08 | 0.19 | 0.27 |  |
| 108 | Zac | -0.09 | 0.37 | 0.46 |  |
| 109 | Shyvana | -0.09 | 0.16 | 0.25 |  |
| 110 | Rakan | -0.10 | 0.00 | 0.10 |  |
| 111 | Illaoi | -0.11 | 0.16 | 0.27 |  |
| 112 | Sett | -0.11 | 0.16 | 0.27 |  |
| 113 | Fizz | -0.12 | 0.00 | 0.12 |  |
| 114 | Sylas | -0.12 | 0.00 | 0.12 |  |
| 115 | Urgot | -0.12 | 0.00 | 0.12 |  |
| 116 | Briar | -0.13 | 0.00 | 0.13 |  |
| 117 | Lillia | -0.13 | 0.00 | 0.13 |  |
| 118 | Quinn | -0.14 | 0.00 | 0.14 |  |
| 119 | Rammus | -0.15 | 0.27 | 0.42 |  |
| 120 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 121 | Rell | -0.16 | 0.00 | 0.16 |  |
| 122 | Bel'Veth | -0.17 | 0.00 | 0.17 |  |
| 123 | Qiyana | -0.17 | 0.00 | 0.17 |  |
| 124 | Akali | -0.18 | 0.00 | 0.18 |  |
| 125 | Ambessa | -0.18 | 0.00 | 0.18 |  |
| 126 | Lee Sin | -0.18 | 0.00 | 0.18 |  |
| 127 | Riven | -0.18 | 0.00 | 0.18 |  |
| 128 | Talon | -0.18 | 0.00 | 0.18 |  |
| 129 | Caitlyn | -0.21 | 0.07 | 0.28 |  |
| 130 | Irelia | -0.22 | 0.00 | 0.22 |  |
| 131 | Singed | -0.23 | 0.30 | 0.53 |  |
| 132 | Aatrox | -0.23 | 0.00 | 0.23 |  |
| 133 | Nautilus | -0.23 | 0.00 | 0.23 |  |
| 134 | Tryndamere | -0.23 | 0.00 | 0.23 |  |
| 135 | Vi | -0.24 | 0.16 | 0.40 |  |
| 136 | Akshan | -0.24 | 0.00 | 0.24 |  |
| 137 | Diana | -0.25 | 0.00 | 0.25 |  |
| 138 | Kassadin | -0.25 | 0.00 | 0.25 |  |
| 139 | Pyke | -0.25 | 0.00 | 0.25 |  |
| 140 | Sejuani | -0.25 | 0.00 | 0.25 |  |
| 141 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 142 | Galio | -0.26 | 0.00 | 0.26 |  |
| 143 | Vel'Koz | -0.26 | 0.00 | 0.26 |  |
| 144 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 145 | Leona | -0.27 | 0.00 | 0.27 |  |
| 146 | Locke | -0.27 | 0.00 | 0.27 |  |
| 147 | Renekton | -0.27 | 0.00 | 0.27 |  |
| 148 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 149 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 150 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 151 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 152 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 153 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 154 | Garen | -0.36 | 0.11 | 0.47 |  |
| 155 | Gragas | -0.37 | 0.00 | 0.37 |  |
| 156 | Fiddlesticks | -0.38 | 0.00 | 0.38 |  |
| 157 | Karthus | -0.38 | 0.00 | 0.38 |  |
| 158 | Janna | -0.40 | 0.00 | 0.40 |  |
| 159 | Mordekaiser | -0.41 | 0.06 | 0.47 |  |
| 160 | Skarner | -0.44 | 0.06 | 0.50 |  |
| 161 | Katarina | -0.46 | 0.00 | 0.46 |  |
| 162 | Darius | -0.47 | 0.00 | 0.47 |  |
| 163 | Trundle | -0.47 | 0.00 | 0.47 |  |
| 164 | Yorick | -0.47 | 0.00 | 0.47 |  |
| 165 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 166 | Tahm Kench | -0.49 | 0.00 | 0.49 |  |
| 167 | Blitzcrank | -0.53 | 0.00 | 0.53 |  |
| 168 | Cho'Gath | -0.53 | 0.00 | 0.53 |  |
| 169 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 170 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 171 | Naafiri | -0.55 | 0.00 | 0.55 |  |
| 172 | Nunu & Willump | -0.78 | 0.12 | 0.90 |  |
