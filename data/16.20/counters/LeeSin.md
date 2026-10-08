# Counters to Lee Sin (patch 26.20)

Every champion ranked by what its kit does against Lee Sin's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Lee Sin's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> LeeSin` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.11)

- **0.80** spell shield: Spell Shield's spell shield blocks Lee Sin's Dragon's Rage. Spell shield for 1.5 s, long enough to use ahead of Dragon's Rage. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Lee Sin R Dragon's Rage)
- **0.31** range: Sivir's basic attacks reach 375 units farther than Lee Sin's (500 vs 125 attack range). Lee Sin closes the gap with Resonating Strike, Safeguard. (Sivir basic attacks → Lee Sin basic attacks)

### 2. Elise (net +1.02)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Lee Sin's Dragon's Rage. Untargetable for 0.6 s; Dragon's Rage takes 0.25 s to land, enough to react. (Elise E Rappel → Lee Sin R Dragon's Rage)
- **0.22** range: Elise's basic attacks reach 425 units farther than Lee Sin's (550 vs 125 attack range). Lee Sin closes the gap with Resonating Strike, Safeguard. (Elise basic attacks → Lee Sin basic attacks)

### 3. Morgana (net +0.98)

- **0.80** cc immunity: Black Shield makes Morgana immune to Lee Sin's Dragon's Rage (airborne, root). Immune for 5 s, long enough to use ahead of Dragon's Rage. (Morgana E Black Shield → Lee Sin R Dragon's Rage)
- **0.13** range: Morgana's basic attacks reach 325 units farther than Lee Sin's (450 vs 125 attack range). Lee Sin closes the gap with Resonating Strike, Safeguard. (Morgana basic attacks → Lee Sin basic attacks)
- **0.09** cc immunity: Black Shield makes Morgana immune to Lee Sin's Cripple (slow). Immune for 5 s, long enough to use ahead of Cripple. (Morgana E Black Shield → Lee Sin E Cripple)

### 4. Lissandra (net +0.97)

- **0.68** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Lee Sin's Dragon's Rage. Untargetable for 2.5 s, long enough to use ahead of Dragon's Rage. (Lissandra R Frozen Tomb → Lee Sin R Dragon's Rage)
- **0.19** dash stop: Frozen Tomb's knockdown can stop Lee Sin's Resonating Strike mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Lee Sin Q Resonating Strike)
- **0.18** dash stop: Frozen Tomb's knockdown can stop Lee Sin's Safeguard mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Lee Sin W Safeguard)

### 5. Fiora (net +0.93)

- **0.90** parry: Riposte parries Lee Sin's Dragon's Rage and stuns back. Parry for 0.75 s; Dragon's Rage takes 0.25 s to land, enough to react. Negating Dragon's Rage's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Lee Sin R Dragon's Rage)
- **0.06** attack speed slow: Riposte cuts Lee Sin's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Lee Sin basic attacks)

### 6. Bard (net +0.92)

- **0.68** untargetable: Tempered Fate makes Bard untargetable, dodging Lee Sin's Dragon's Rage. Untargetable for 2.5 s, long enough to use ahead of Dragon's Rage. (Bard R Tempered Fate → Lee Sin R Dragon's Rage)
- **0.24** range: Bard's basic attacks reach 375 units farther than Lee Sin's (500 vs 125 attack range). Lee Sin closes the gap with Resonating Strike, Safeguard. (Bard basic attacks → Lee Sin basic attacks)

### 7. Nocturne (net +0.88)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Lee Sin's Dragon's Rage. Spell shield for 1.5 s, long enough to use ahead of Dragon's Rage. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Lee Sin R Dragon's Rage)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Lee Sin's Dragon's Rage (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Lee Sin R Dragon's Rage)

### 8. Vladimir (net +0.87)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lee Sin's Dragon's Rage. Untargetable for 2 s, long enough to use ahead of Dragon's Rage. (Vladimir W Sanguine Pool → Lee Sin R Dragon's Rage)
- **0.12** range: Vladimir's basic attacks reach 325 units farther than Lee Sin's (450 vs 125 attack range). Lee Sin closes the gap with Resonating Strike, Safeguard. (Vladimir basic attacks → Lee Sin basic attacks)
- Watch out: Dragon's Rage's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 9. Xayah (net +0.87)

- **0.61** untargetable: Featherstorm makes Xayah untargetable, dodging Lee Sin's Dragon's Rage. Untargetable for 1.5 s, long enough to use ahead of Dragon's Rage. (Xayah R Featherstorm → Lee Sin R Dragon's Rage)
- **0.26** range: Xayah's basic attacks reach 400 units farther than Lee Sin's (525 vs 125 attack range). Lee Sin closes the gap with Resonating Strike, Safeguard. (Xayah basic attacks → Lee Sin basic attacks)

### 10. Udyr (net +0.86)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Lee Sin's Dragon's Rage (airborne, root). Immune for 1.5 s, long enough to use ahead of Dragon's Rage. (Udyr E Blazing Stampede → Lee Sin R Dragon's Rage)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Lee Sin's Cripple (slow). Immune for 1.5 s, long enough to use ahead of Cripple. (Udyr E Blazing Stampede → Lee Sin E Cripple)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.11 | 1.11 | 0.00 |  |
| 2 | Elise | +1.02 | 1.02 | 0.00 |  |
| 3 | Morgana | +0.98 | 0.98 | 0.00 |  |
| 4 | Lissandra | +0.97 | 0.97 | 0.00 |  |
| 5 | Fiora | +0.93 | 0.93 | 0.00 |  |
| 6 | Bard | +0.92 | 0.92 | 0.00 |  |
| 7 | Nocturne | +0.88 | 0.88 | 0.00 |  |
| 8 | Vladimir | +0.87 | 0.92 | 0.05 |  |
| 9 | Xayah | +0.87 | 0.87 | 0.00 |  |
| 10 | Udyr | +0.86 | 0.86 | 0.00 |  |
| 11 | Singed | +0.85 | 0.85 | 0.00 |  |
| 12 | Milio | +0.81 | 0.81 | 0.00 |  |
| 13 | Ekko | +0.80 | 0.80 | 0.00 |  |
| 14 | Gwen | +0.80 | 0.80 | 0.00 |  |
| 15 | Maokai | +0.80 | 0.80 | 0.00 |  |
| 16 | Warwick | +0.77 | 0.95 | 0.18 |  |
| 17 | Master Yi | +0.76 | 0.87 | 0.11 |  |
| 18 | Jinx | +0.76 | 0.76 | 0.00 | dash stop (Flame Chompers!) |
| 19 | Sion | +0.75 | 0.83 | 0.08 |  |
| 20 | Cassiopeia | +0.72 | 0.72 | 0.00 |  |
| 21 | Hwei | +0.72 | 0.72 | 0.00 | dash stop (Grim Visage) |
| 22 | Rek'Sai | +0.72 | 0.72 | 0.00 |  |
| 23 | Olaf | +0.71 | 0.71 | 0.00 |  |
| 24 | Vex | +0.71 | 0.71 | 0.00 |  |
| 25 | Viktor | +0.71 | 0.71 | 0.00 |  |
| 26 | Zaahen | +0.70 | 0.70 | 0.00 |  |
| 27 | Aurora | +0.69 | 0.84 | 0.15 |  |
| 28 | Kalista | +0.69 | 0.69 | 0.00 |  |
| 29 | Kled | +0.69 | 0.69 | 0.00 |  |
| 30 | Camille | +0.68 | 0.68 | 0.00 |  |
| 31 | Gangplank | +0.68 | 0.68 | 0.00 |  |
| 32 | Ahri | +0.66 | 0.66 | 0.00 |  |
| 33 | Yuumi | +0.63 | 1.01 | 0.38 |  |
| 34 | Veigar | +0.63 | 0.63 | 0.00 |  |
| 35 | Zed | +0.61 | 0.61 | 0.00 |  |
| 36 | Evelynn | +0.60 | 0.68 | 0.08 |  |
| 37 | Kindred | +0.59 | 0.59 | 0.00 |  |
| 38 | Kayle | +0.58 | 0.58 | 0.00 |  |
| 39 | Alistar | +0.56 | 0.56 | 0.00 |  |
| 40 | Rengar | +0.55 | 0.69 | 0.14 |  |
| 41 | Teemo | +0.49 | 0.57 | 0.08 |  |
| 42 | Lulu | +0.49 | 0.49 | 0.00 |  |
| 43 | Poppy | +0.48 | 0.68 | 0.20 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 44 | Shaco | +0.48 | 0.68 | 0.20 |  |
| 45 | Malzahar | +0.45 | 0.85 | 0.40 |  |
| 46 | Samira | +0.45 | 0.45 | 0.00 |  |
| 47 | Mel | +0.42 | 0.42 | 0.00 |  |
| 48 | Braum | +0.38 | 0.38 | 0.00 |  |
| 49 | Yone | +0.36 | 0.36 | 0.00 |  |
| 50 | Pantheon | +0.35 | 0.40 | 0.05 |  |
| 51 | Zac | +0.34 | 0.59 | 0.25 | dash stop (Stretching Strikes) |
| 52 | Nilah | +0.33 | 0.33 | 0.00 |  |
| 53 | Aphelios | +0.31 | 0.31 | 0.00 |  |
| 54 | Garen | +0.31 | 0.31 | 0.00 |  |
| 55 | Varus | +0.30 | 0.36 | 0.06 |  |
| 56 | Xin Zhao | +0.30 | 0.30 | 0.00 |  |
| 57 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 58 | Corki | +0.28 | 0.28 | 0.00 |  |
| 59 | Jax | +0.28 | 0.28 | 0.00 |  |
| 60 | Taric | +0.28 | 0.28 | 0.00 |  |
| 61 | Yasuo | +0.28 | 0.28 | 0.00 |  |
| 62 | Amumu | +0.27 | 0.27 | 0.00 |  |
| 63 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 64 | Sona | +0.27 | 0.27 | 0.00 |  |
| 65 | Malphite | +0.26 | 0.26 | 0.00 |  |
| 66 | Renata Glasc | +0.26 | 0.26 | 0.00 |  |
| 67 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 68 | Draven | +0.24 | 0.24 | 0.00 |  |
| 69 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 70 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 71 | Kayn | +0.23 | 0.68 | 0.45 |  |
| 72 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 73 | Gnar | +0.22 | 0.22 | 0.00 |  |
| 74 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 75 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 76 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 77 | Jayce | +0.20 | 0.20 | 0.00 |  |
| 78 | Nidalee | +0.20 | 0.20 | 0.00 |  |
| 79 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 80 | Lux | +0.19 | 0.19 | 0.00 |  |
| 81 | Seraphine | +0.19 | 0.19 | 0.00 |  |
| 82 | Twitch | +0.18 | 0.29 | 0.11 |  |
| 83 | Azir | +0.18 | 0.18 | 0.00 |  |
| 84 | Heimerdinger | +0.18 | 0.18 | 0.00 |  |
| 85 | Kog'Maw | +0.18 | 0.18 | 0.00 |  |
| 86 | Orianna | +0.18 | 0.18 | 0.00 |  |
| 87 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 88 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 89 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 90 | Graves | +0.16 | 0.16 | 0.00 |  |
| 91 | K'Sante | +0.16 | 0.16 | 0.00 |  |
| 92 | Zyra | +0.16 | 0.16 | 0.00 |  |
| 93 | Vayne | +0.15 | 0.29 | 0.14 |  |
| 94 | Kai'Sa | +0.15 | 0.26 | 0.11 |  |
| 95 | Annie | +0.15 | 0.15 | 0.00 |  |
| 96 | Brand | +0.15 | 0.15 | 0.00 |  |
| 97 | Karma | +0.15 | 0.15 | 0.00 |  |
| 98 | Nami | +0.15 | 0.15 | 0.00 |  |
| 99 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 100 | Swain | +0.14 | 0.14 | 0.00 |  |
| 101 | Thresh | +0.13 | 0.13 | 0.00 |  |
| 102 | Quinn | +0.12 | 0.26 | 0.14 |  |
| 103 | Rammus | +0.11 | 0.27 | 0.16 |  |
| 104 | Senna | +0.11 | 0.22 | 0.11 |  |
| 105 | Urgot | +0.10 | 0.10 | 0.00 |  |
| 106 | Aurelion Sol | +0.09 | 0.15 | 0.06 |  |
| 107 | Hecarim | +0.08 | 0.08 | 0.00 |  |
| 108 | Illaoi | +0.08 | 0.08 | 0.00 |  |
| 109 | Jarvan IV | +0.08 | 0.08 | 0.00 |  |
| 110 | Ornn | +0.08 | 0.08 | 0.00 |  |
| 111 | Rakan | +0.08 | 0.08 | 0.00 |  |
| 112 | Sett | +0.08 | 0.08 | 0.00 |  |
| 113 | Shyvana | +0.08 | 0.08 | 0.00 |  |
| 114 | Volibear | +0.08 | 0.08 | 0.00 |  |
| 115 | LeBlanc | +0.07 | 0.15 | 0.08 |  |
| 116 | Lillia | +0.07 | 0.07 | 0.00 |  |
| 117 | Mordekaiser | +0.06 | 0.06 | 0.00 |  |
| 118 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 119 | Ivern | +0.05 | 0.13 | 0.08 |  |
| 120 | Neeko | +0.04 | 0.15 | 0.11 |  |
| 121 | Irelia | +0.03 | 0.03 | 0.00 |  |
| 122 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 123 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 124 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 125 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 126 | Briar | 0.00 | 0.00 | 0.00 |  |
| 127 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 128 | Darius | 0.00 | 0.00 | 0.00 |  |
| 129 | Diana | 0.00 | 0.00 | 0.00 |  |
| 130 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 131 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 132 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 133 | Leona | 0.00 | 0.00 | 0.00 |  |
| 134 | Locke | 0.00 | 0.00 | 0.00 |  |
| 135 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 136 | Rell | 0.00 | 0.00 | 0.00 |  |
| 137 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 138 | Riven | 0.00 | 0.00 | 0.00 |  |
| 139 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 140 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 141 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 142 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 143 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 144 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 145 | Caitlyn | -0.04 | 0.24 | 0.28 |  |
| 146 | Lucian | -0.04 | 0.24 | 0.28 |  |
| 147 | Katarina | -0.05 | 0.18 | 0.23 |  |
| 148 | Twisted Fate | -0.06 | 0.29 | 0.35 |  |
| 149 | Miss Fortune | -0.06 | 0.22 | 0.28 |  |
| 150 | Viego | -0.09 | 0.14 | 0.23 |  |
| 151 | Galio | -0.09 | 0.00 | 0.09 |  |
| 152 | Jhin | -0.10 | 0.18 | 0.28 |  |
| 153 | Vel'Koz | -0.10 | 0.18 | 0.28 |  |
| 154 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 155 | Akali | -0.11 | 0.00 | 0.11 |  |
| 156 | Xerath | -0.13 | 0.18 | 0.31 |  |
| 157 | Talon | -0.14 | 0.00 | 0.14 |  |
| 158 | Karthus | -0.15 | 0.13 | 0.28 |  |
| 159 | Vi | -0.15 | 0.08 | 0.23 |  |
| 160 | Janna | -0.16 | 0.24 | 0.40 |  |
| 161 | Shen | -0.18 | 0.27 | 0.45 |  |
| 162 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 163 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 164 | Pyke | -0.19 | 0.00 | 0.19 |  |
| 165 | Akshan | -0.20 | 0.22 | 0.42 |  |
| 166 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 167 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 168 | Nunu & Willump | -0.25 | 0.13 | 0.38 |  |
| 169 | Fiddlesticks | -0.28 | 0.13 | 0.41 |  |
| 170 | Tahm Kench | -0.29 | 0.00 | 0.29 |  |
| 171 | Taliyah | -0.30 | 0.18 | 0.48 |  |
| 172 | Naafiri | -0.45 | 0.00 | 0.45 |  |
