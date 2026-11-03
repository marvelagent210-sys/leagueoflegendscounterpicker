# Counters to Lee Sin (patch 26.21)

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

### 2. Morgana (net +0.98)

- **0.80** cc immunity: Black Shield makes Morgana immune to Lee Sin's Dragon's Rage (airborne, root). Immune for 5 s, long enough to use ahead of Dragon's Rage. (Morgana E Black Shield → Lee Sin R Dragon's Rage)
- **0.13** range: Morgana's basic attacks reach 325 units farther than Lee Sin's (450 vs 125 attack range). Lee Sin closes the gap with Resonating Strike, Safeguard. (Morgana basic attacks → Lee Sin basic attacks)
- **0.09** cc immunity: Black Shield makes Morgana immune to Lee Sin's Cripple (slow). Immune for 5 s, long enough to use ahead of Cripple. (Morgana E Black Shield → Lee Sin E Cripple)

### 3. Lissandra (net +0.97)

- **0.68** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Lee Sin's Dragon's Rage. Untargetable for 2.5 s, long enough to use ahead of Dragon's Rage. (Lissandra R Frozen Tomb → Lee Sin R Dragon's Rage)
- **0.19** dash stop: Frozen Tomb's knockdown can stop Lee Sin's Resonating Strike mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Lee Sin Q Resonating Strike)
- **0.18** dash stop: Frozen Tomb's knockdown can stop Lee Sin's Safeguard mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Lee Sin W Safeguard)

### 4. Fiora (net +0.93)

- **0.90** parry: Riposte parries Lee Sin's Dragon's Rage and stuns back. Parry for 0.75 s; Dragon's Rage takes 0.25 s to land, enough to react. Negating Dragon's Rage's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Lee Sin R Dragon's Rage)
- **0.06** attack speed slow: Riposte cuts Lee Sin's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Lee Sin basic attacks)

### 5. Bard (net +0.92)

- **0.68** untargetable: Tempered Fate makes Bard untargetable, dodging Lee Sin's Dragon's Rage. Untargetable for 2.5 s, long enough to use ahead of Dragon's Rage. (Bard R Tempered Fate → Lee Sin R Dragon's Rage)
- **0.24** range: Bard's basic attacks reach 375 units farther than Lee Sin's (500 vs 125 attack range). Lee Sin closes the gap with Resonating Strike, Safeguard. (Bard basic attacks → Lee Sin basic attacks)

### 6. Nocturne (net +0.88)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Lee Sin's Dragon's Rage. Spell shield for 1.5 s, long enough to use ahead of Dragon's Rage. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Lee Sin R Dragon's Rage)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Lee Sin's Dragon's Rage (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Lee Sin R Dragon's Rage)

### 7. Vladimir (net +0.87)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lee Sin's Dragon's Rage. Untargetable for 2 s, long enough to use ahead of Dragon's Rage. (Vladimir W Sanguine Pool → Lee Sin R Dragon's Rage)
- **0.12** range: Vladimir's basic attacks reach 325 units farther than Lee Sin's (450 vs 125 attack range). Lee Sin closes the gap with Resonating Strike, Safeguard. (Vladimir basic attacks → Lee Sin basic attacks)
- Watch out: Dragon's Rage's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 8. Xayah (net +0.87)

- **0.61** untargetable: Featherstorm makes Xayah untargetable, dodging Lee Sin's Dragon's Rage. Untargetable for 1.5 s, long enough to use ahead of Dragon's Rage. (Xayah R Featherstorm → Lee Sin R Dragon's Rage)
- **0.26** range: Xayah's basic attacks reach 400 units farther than Lee Sin's (525 vs 125 attack range). Lee Sin closes the gap with Resonating Strike, Safeguard. (Xayah basic attacks → Lee Sin basic attacks)

### 9. Udyr (net +0.86)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Lee Sin's Dragon's Rage (airborne, root). Immune for 1.5 s, long enough to use ahead of Dragon's Rage. (Udyr E Blazing Stampede → Lee Sin R Dragon's Rage)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Lee Sin's Cripple (slow). Immune for 1.5 s, long enough to use ahead of Cripple. (Udyr E Blazing Stampede → Lee Sin E Cripple)

### 10. Singed (net +0.85)

- **0.39** grounding: Mega Adhesive grounds Lee Sin, who then can't cast Resonating Strike. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Lee Sin Q Resonating Strike)
- **0.39** grounding: Mega Adhesive grounds Lee Sin, who then can't cast Safeguard. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Lee Sin W Safeguard)
- **0.18** anti-heal: Insanity Potion's Grievous Wounds cuts Lee Sin's healing from Iron Will by 40%. (Singed R Insanity Potion → Lee Sin W Iron Will)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.11 | 1.11 | 0.00 |  |
| 2 | Morgana | +0.98 | 0.98 | 0.00 |  |
| 3 | Lissandra | +0.97 | 0.97 | 0.00 |  |
| 4 | Fiora | +0.93 | 0.93 | 0.00 |  |
| 5 | Bard | +0.92 | 0.92 | 0.00 |  |
| 6 | Nocturne | +0.88 | 0.88 | 0.00 |  |
| 7 | Vladimir | +0.87 | 0.92 | 0.05 |  |
| 8 | Xayah | +0.87 | 0.87 | 0.00 |  |
| 9 | Udyr | +0.86 | 0.86 | 0.00 |  |
| 10 | Singed | +0.85 | 0.85 | 0.00 |  |
| 11 | Milio | +0.81 | 0.81 | 0.00 |  |
| 12 | Fizz | +0.80 | 0.80 | 0.00 |  |
| 13 | Gwen | +0.80 | 0.80 | 0.00 |  |
| 14 | Maokai | +0.80 | 0.80 | 0.00 |  |
| 15 | Master Yi | +0.76 | 0.87 | 0.11 |  |
| 16 | Jinx | +0.76 | 0.76 | 0.00 | dash stop (Flame Chompers!) |
| 17 | Sion | +0.75 | 0.83 | 0.08 |  |
| 18 | Hwei | +0.73 | 0.73 | 0.00 | dash stop (Grim Visage) |
| 19 | Cassiopeia | +0.72 | 0.72 | 0.00 |  |
| 20 | Rek'Sai | +0.72 | 0.72 | 0.00 |  |
| 21 | Viktor | +0.72 | 0.72 | 0.00 |  |
| 22 | Olaf | +0.71 | 0.71 | 0.00 |  |
| 23 | Vex | +0.71 | 0.71 | 0.00 |  |
| 24 | Zaahen | +0.70 | 0.70 | 0.00 |  |
| 25 | Kalista | +0.69 | 0.69 | 0.00 |  |
| 26 | Kled | +0.69 | 0.69 | 0.00 |  |
| 27 | Camille | +0.68 | 0.68 | 0.00 |  |
| 28 | Gangplank | +0.68 | 0.68 | 0.00 |  |
| 29 | Ahri | +0.67 | 0.67 | 0.00 |  |
| 30 | Veigar | +0.64 | 0.64 | 0.00 |  |
| 31 | Yuumi | +0.63 | 1.01 | 0.38 |  |
| 32 | Zed | +0.61 | 0.61 | 0.00 |  |
| 33 | Kayle | +0.58 | 0.58 | 0.00 |  |
| 34 | Alistar | +0.56 | 0.56 | 0.00 |  |
| 35 | Aurora | +0.54 | 0.84 | 0.30 |  |
| 36 | Evelynn | +0.52 | 0.68 | 0.16 |  |
| 37 | Lulu | +0.49 | 0.49 | 0.00 |  |
| 38 | Poppy | +0.48 | 0.68 | 0.20 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 39 | Malzahar | +0.45 | 0.85 | 0.40 |  |
| 40 | Samira | +0.45 | 0.45 | 0.00 |  |
| 41 | Mel | +0.42 | 0.42 | 0.00 |  |
| 42 | Rengar | +0.41 | 0.69 | 0.28 |  |
| 43 | Teemo | +0.41 | 0.57 | 0.16 |  |
| 44 | Braum | +0.38 | 0.38 | 0.00 |  |
| 45 | Warwick | +0.37 | 0.96 | 0.59 |  |
| 46 | Yone | +0.36 | 0.36 | 0.00 |  |
| 47 | Zac | +0.35 | 0.60 | 0.25 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 48 | Nilah | +0.33 | 0.33 | 0.00 |  |
| 49 | Aphelios | +0.31 | 0.31 | 0.00 |  |
| 50 | Garen | +0.31 | 0.31 | 0.00 |  |
| 51 | Kindred | +0.31 | 0.31 | 0.00 |  |
| 52 | Varus | +0.30 | 0.36 | 0.06 |  |
| 53 | Xin Zhao | +0.30 | 0.30 | 0.00 |  |
| 54 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 55 | Shaco | +0.28 | 0.68 | 0.40 |  |
| 56 | Jax | +0.28 | 0.28 | 0.00 |  |
| 57 | Yasuo | +0.28 | 0.28 | 0.00 |  |
| 58 | Amumu | +0.27 | 0.27 | 0.00 |  |
| 59 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 60 | Sona | +0.27 | 0.27 | 0.00 |  |
| 61 | Malphite | +0.26 | 0.26 | 0.00 |  |
| 62 | Renata Glasc | +0.26 | 0.26 | 0.00 |  |
| 63 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 64 | Draven | +0.24 | 0.24 | 0.00 |  |
| 65 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 66 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 67 | Kayn | +0.23 | 0.68 | 0.45 |  |
| 68 | Corki | +0.22 | 0.22 | 0.00 |  |
| 69 | Elise | +0.22 | 0.22 | 0.00 |  |
| 70 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 71 | Gnar | +0.22 | 0.22 | 0.00 |  |
| 72 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 73 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 74 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 75 | Jayce | +0.20 | 0.20 | 0.00 |  |
| 76 | Nidalee | +0.20 | 0.20 | 0.00 |  |
| 77 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 78 | Lux | +0.19 | 0.19 | 0.00 |  |
| 79 | Seraphine | +0.19 | 0.19 | 0.00 |  |
| 80 | Azir | +0.18 | 0.18 | 0.00 |  |
| 81 | Heimerdinger | +0.18 | 0.18 | 0.00 |  |
| 82 | Kog'Maw | +0.18 | 0.18 | 0.00 |  |
| 83 | Orianna | +0.18 | 0.18 | 0.00 |  |
| 84 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 85 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 86 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 87 | Graves | +0.16 | 0.16 | 0.00 |  |
| 88 | K'Sante | +0.16 | 0.16 | 0.00 |  |
| 89 | Zyra | +0.16 | 0.16 | 0.00 |  |
| 90 | Annie | +0.15 | 0.15 | 0.00 |  |
| 91 | Brand | +0.15 | 0.15 | 0.00 |  |
| 92 | Karma | +0.15 | 0.15 | 0.00 |  |
| 93 | Nami | +0.15 | 0.15 | 0.00 |  |
| 94 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 95 | Swain | +0.14 | 0.14 | 0.00 |  |
| 96 | Thresh | +0.13 | 0.13 | 0.00 |  |
| 97 | Quinn | +0.12 | 0.26 | 0.14 |  |
| 98 | Rammus | +0.11 | 0.27 | 0.16 |  |
| 99 | Urgot | +0.10 | 0.10 | 0.00 |  |
| 100 | Aurelion Sol | +0.09 | 0.15 | 0.06 |  |
| 101 | Hecarim | +0.08 | 0.08 | 0.00 |  |
| 102 | Illaoi | +0.08 | 0.08 | 0.00 |  |
| 103 | Jarvan IV | +0.08 | 0.08 | 0.00 |  |
| 104 | Ornn | +0.08 | 0.08 | 0.00 |  |
| 105 | Rakan | +0.08 | 0.08 | 0.00 |  |
| 106 | Sett | +0.08 | 0.08 | 0.00 |  |
| 107 | Shyvana | +0.08 | 0.08 | 0.00 |  |
| 108 | Volibear | +0.08 | 0.08 | 0.00 |  |
| 109 | Twitch | +0.07 | 0.29 | 0.22 |  |
| 110 | Lillia | +0.07 | 0.07 | 0.00 |  |
| 111 | Mordekaiser | +0.06 | 0.06 | 0.00 |  |
| 112 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 113 | Ivern | +0.05 | 0.13 | 0.08 |  |
| 114 | Kai'Sa | +0.04 | 0.26 | 0.22 |  |
| 115 | Irelia | +0.03 | 0.03 | 0.00 |  |
| 116 | Vayne | +0.01 | 0.29 | 0.28 |  |
| 117 | Senna | 0.00 | 0.22 | 0.22 |  |
| 118 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 119 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 120 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 121 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 122 | Briar | 0.00 | 0.00 | 0.00 |  |
| 123 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 124 | Darius | 0.00 | 0.00 | 0.00 |  |
| 125 | Diana | 0.00 | 0.00 | 0.00 |  |
| 126 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 127 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 128 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 129 | Leona | 0.00 | 0.00 | 0.00 |  |
| 130 | Locke | 0.00 | 0.00 | 0.00 |  |
| 131 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 132 | Rell | 0.00 | 0.00 | 0.00 |  |
| 133 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 134 | Riven | 0.00 | 0.00 | 0.00 |  |
| 135 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 136 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 137 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 138 | Taric | 0.00 | 0.00 | 0.00 |  |
| 139 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 140 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 141 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 142 | LeBlanc | -0.01 | 0.15 | 0.16 |  |
| 143 | Caitlyn | -0.04 | 0.24 | 0.28 |  |
| 144 | Lucian | -0.04 | 0.24 | 0.28 |  |
| 145 | Katarina | -0.05 | 0.18 | 0.23 |  |
| 146 | Twisted Fate | -0.06 | 0.29 | 0.35 |  |
| 147 | Miss Fortune | -0.06 | 0.22 | 0.28 |  |
| 148 | Neeko | -0.07 | 0.15 | 0.22 |  |
| 149 | Pantheon | -0.08 | 0.40 | 0.48 |  |
| 150 | Jhin | -0.10 | 0.18 | 0.28 |  |
| 151 | Vel'Koz | -0.10 | 0.18 | 0.28 |  |
| 152 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 153 | Xerath | -0.13 | 0.18 | 0.31 |  |
| 154 | Karthus | -0.15 | 0.13 | 0.28 |  |
| 155 | Vi | -0.15 | 0.08 | 0.23 |  |
| 156 | Janna | -0.16 | 0.24 | 0.40 |  |
| 157 | Shen | -0.18 | 0.27 | 0.45 |  |
| 158 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 159 | Viego | -0.20 | 0.14 | 0.34 |  |
| 160 | Akali | -0.22 | 0.00 | 0.22 |  |
| 161 | Nunu & Willump | -0.25 | 0.13 | 0.38 |  |
| 162 | Fiddlesticks | -0.28 | 0.13 | 0.41 |  |
| 163 | Talon | -0.28 | 0.00 | 0.28 |  |
| 164 | Tahm Kench | -0.29 | 0.00 | 0.29 |  |
| 165 | Taliyah | -0.30 | 0.18 | 0.48 |  |
| 166 | Pyke | -0.30 | 0.00 | 0.30 |  |
| 167 | Akshan | -0.34 | 0.22 | 0.56 |  |
| 168 | Qiyana | -0.36 | 0.00 | 0.36 |  |
| 169 | Wukong | -0.40 | 0.00 | 0.40 |  |
| 170 | Kha'Zix | -0.42 | 0.00 | 0.42 |  |
| 171 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 172 | Galio | -0.55 | 0.00 | 0.55 |  |
