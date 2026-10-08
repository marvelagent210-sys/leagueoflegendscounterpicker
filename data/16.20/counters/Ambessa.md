# Counters to Ambessa (patch 26.20)

Every champion ranked by what its kit does against Ambessa's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ambessa's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ambessa` for the full ledger of a matchup, with sources.

## Top 10

### 1. Singed (net +1.45)

- **0.49** grounding: Mega Adhesive grounds Ambessa, who then can't cast Public Execution. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Ambessa R Public Execution)
- **0.40** anti-heal: Insanity Potion's Grievous Wounds cuts Ambessa's healing from Public Execution by 40%. (Singed R Insanity Potion → Ambessa R Public Execution)
- **0.32** grounding: Mega Adhesive grounds Ambessa, who then can't cast Drakehound's Step. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Ambessa I Drakehound's Step)

### 2. Sivir (net +1.31)

- **1.00** spell shield: Spell Shield's spell shield blocks Ambessa's Public Execution. Spell shield for 1.5 s, long enough to use ahead of Public Execution. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ambessa R Public Execution)
- **0.31** range: Sivir's basic attacks reach 375 units farther than Ambessa's (500 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Sivir basic attacks → Ambessa basic attacks)

### 3. Xayah (net +1.26)

- **1.00** untargetable: Featherstorm makes Xayah untargetable, dodging Ambessa's Public Execution. Untargetable for 1.5 s, long enough to use ahead of Public Execution. (Xayah R Featherstorm → Ambessa R Public Execution)
- **0.26** range: Xayah's basic attacks reach 400 units farther than Ambessa's (525 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Xayah basic attacks → Ambessa basic attacks)

### 4. Bard (net +1.24)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Ambessa's Public Execution. Untargetable for 2.5 s, long enough to use ahead of Public Execution. (Bard R Tempered Fate → Ambessa R Public Execution)
- **0.24** range: Bard's basic attacks reach 375 units farther than Ambessa's (500 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Bard basic attacks → Ambessa basic attacks)

### 5. Elise (net +1.22)

- **1.00** untargetable: Rappel makes Elise untargetable, dodging Ambessa's Public Execution. Untargetable for 0.6 s; Public Execution takes 0.7 s to land, enough to react. (Elise E Rappel → Ambessa R Public Execution)
- **0.22** range: Elise's basic attacks reach 425 units farther than Ambessa's (550 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Elise basic attacks → Ambessa basic attacks)

### 6. Lissandra (net +1.22)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ambessa's Public Execution. Untargetable for 2.5 s, long enough to use ahead of Public Execution. (Lissandra R Frozen Tomb → Ambessa R Public Execution)
- **0.15** dash stop: Frozen Tomb's knockdown can stop Ambessa's Drakehound's Step mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Ambessa I Drakehound's Step)
- **0.15** range: Lissandra's basic attacks reach 425 units farther than Ambessa's (550 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Lissandra basic attacks → Ambessa basic attacks)

### 7. Morgana (net +1.17)

- **1.00** cc immunity: Black Shield makes Morgana immune to Ambessa's Public Execution (stun, suppression). Immune for 5 s, long enough to use ahead of Public Execution. (Morgana E Black Shield → Ambessa R Public Execution)
- **0.13** range: Morgana's basic attacks reach 325 units farther than Ambessa's (450 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Morgana basic attacks → Ambessa basic attacks)
- **0.08** cc immunity: Black Shield makes Morgana immune to Ambessa's Lacerate (slow). Immune for 5 s, long enough to use ahead of Lacerate. (Morgana E Black Shield → Ambessa E Lacerate)

### 8. Fiora (net +1.13)

- **1.10** parry: Riposte parries Ambessa's Public Execution and stuns back. Parry for 0.75 s; Public Execution takes 0.7 s to land, enough to react. Negating Public Execution's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ambessa R Public Execution)
- **0.06** attack speed slow: Riposte cuts Ambessa's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Ambessa basic attacks)

### 9. Milio (net +1.10)

- **0.69** cleanse: Breath of Life cleanses Ambessa's Public Execution (stun, suppression) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Ambessa R Public Execution)
- **0.27** tenacity: Breath of Life's 65% tenacity shortens Ambessa's Public Execution (stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Ambessa R Public Execution)
- **0.26** range: Milio's basic attacks reach 400 units farther than Ambessa's (525 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Milio basic attacks → Ambessa basic attacks)

### 10. Vladimir (net +1.07)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ambessa's Public Execution. Untargetable for 2 s, long enough to use ahead of Public Execution. (Vladimir W Sanguine Pool → Ambessa R Public Execution)
- **0.12** range: Vladimir's basic attacks reach 325 units farther than Ambessa's (450 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Vladimir basic attacks → Ambessa basic attacks)
- Watch out: Public Execution's stun interrupts Vladimir's Tides of Blood (charge-up).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Singed | +1.45 | 1.45 | 0.00 | grounding (Mega Adhesive) |
| 2 | Sivir | +1.31 | 1.31 | 0.00 |  |
| 3 | Xayah | +1.26 | 1.26 | 0.00 |  |
| 4 | Bard | +1.24 | 1.24 | 0.00 |  |
| 5 | Elise | +1.22 | 1.22 | 0.00 |  |
| 6 | Lissandra | +1.22 | 1.22 | 0.00 |  |
| 7 | Morgana | +1.17 | 1.17 | 0.00 |  |
| 8 | Fiora | +1.13 | 1.13 | 0.00 |  |
| 9 | Milio | +1.10 | 1.10 | 0.00 |  |
| 10 | Vladimir | +1.07 | 1.12 | 0.05 |  |
| 11 | Kled | +1.06 | 1.06 | 0.00 |  |
| 12 | Udyr | +1.06 | 1.06 | 0.00 |  |
| 13 | Aurora | +1.04 | 1.19 | 0.15 |  |
| 14 | Olaf | +1.02 | 1.02 | 0.00 |  |
| 15 | Zaahen | +1.01 | 1.01 | 0.00 |  |
| 16 | Camille | +1.00 | 1.00 | 0.00 |  |
| 17 | Ekko | +1.00 | 1.00 | 0.00 |  |
| 18 | Gwen | +1.00 | 1.00 | 0.00 |  |
| 19 | Maokai | +1.00 | 1.00 | 0.00 |  |
| 20 | Nocturne | +1.00 | 1.00 | 0.00 |  |
| 21 | Rek'Sai | +1.00 | 1.00 | 0.00 |  |
| 22 | Zed | +1.00 | 1.00 | 0.00 |  |
| 23 | Master Yi | +0.97 | 1.07 | 0.10 |  |
| 24 | Kalista | +0.96 | 0.96 | 0.00 |  |
| 25 | Sion | +0.95 | 1.03 | 0.08 |  |
| 26 | Warwick | +0.92 | 1.09 | 0.17 |  |
| 27 | Evelynn | +0.92 | 1.00 | 0.08 |  |
| 28 | Gangplank | +0.84 | 0.84 | 0.00 |  |
| 29 | Yuumi | +0.83 | 1.21 | 0.38 |  |
| 30 | Alistar | +0.82 | 0.82 | 0.00 |  |
| 31 | Shaco | +0.80 | 1.00 | 0.20 |  |
| 32 | Cassiopeia | +0.79 | 0.79 | 0.00 | grounding (Miasma) |
| 33 | Kindred | +0.76 | 0.76 | 0.00 |  |
| 34 | Kayle | +0.74 | 0.74 | 0.00 |  |
| 35 | Rengar | +0.70 | 0.84 | 0.14 |  |
| 36 | Varus | +0.66 | 0.71 | 0.05 |  |
| 37 | Kayn | +0.60 | 1.00 | 0.40 |  |
| 38 | Jinx | +0.51 | 0.51 | 0.00 |  |
| 39 | Viktor | +0.50 | 0.50 | 0.00 |  |
| 40 | Xin Zhao | +0.50 | 0.50 | 0.00 |  |
| 41 | Malzahar | +0.47 | 0.82 | 0.35 |  |
| 42 | Teemo | +0.47 | 0.55 | 0.08 |  |
| 43 | Hwei | +0.47 | 0.47 | 0.00 |  |
| 44 | Lulu | +0.47 | 0.47 | 0.00 |  |
| 45 | Pantheon | +0.45 | 0.50 | 0.05 |  |
| 46 | Taric | +0.45 | 0.45 | 0.00 |  |
| 47 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 48 | Veigar | +0.43 | 0.43 | 0.00 |  |
| 49 | Vex | +0.43 | 0.43 | 0.00 |  |
| 50 | Garen | +0.37 | 0.37 | 0.00 |  |
| 51 | Katarina | +0.35 | 0.53 | 0.18 |  |
| 52 | Aphelios | +0.31 | 0.31 | 0.00 |  |
| 53 | Nilah | +0.31 | 0.31 | 0.00 |  |
| 54 | Poppy | +0.29 | 0.49 | 0.20 |  |
| 55 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 56 | Jax | +0.27 | 0.27 | 0.00 |  |
| 57 | Sona | +0.27 | 0.27 | 0.00 |  |
| 58 | Renata Glasc | +0.26 | 0.26 | 0.00 |  |
| 59 | Nasus | +0.25 | 0.25 | 0.00 |  |
| 60 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 61 | Draven | +0.24 | 0.24 | 0.00 |  |
| 62 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 63 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 64 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 65 | Gnar | +0.22 | 0.22 | 0.00 |  |
| 66 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 67 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 68 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 69 | Corki | +0.20 | 0.20 | 0.00 |  |
| 70 | Jayce | +0.20 | 0.20 | 0.00 |  |
| 71 | Nidalee | +0.20 | 0.20 | 0.00 |  |
| 72 | Samira | +0.20 | 0.20 | 0.00 |  |
| 73 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 74 | Lux | +0.19 | 0.19 | 0.00 |  |
| 75 | Seraphine | +0.19 | 0.19 | 0.00 |  |
| 76 | Twitch | +0.18 | 0.29 | 0.11 |  |
| 77 | Azir | +0.18 | 0.18 | 0.00 |  |
| 78 | Heimerdinger | +0.18 | 0.18 | 0.00 |  |
| 79 | Kog'Maw | +0.18 | 0.18 | 0.00 |  |
| 80 | Mel | +0.18 | 0.18 | 0.00 |  |
| 81 | Orianna | +0.18 | 0.18 | 0.00 |  |
| 82 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 83 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 84 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 85 | Graves | +0.16 | 0.16 | 0.00 |  |
| 86 | Malphite | +0.16 | 0.16 | 0.00 |  |
| 87 | Zyra | +0.16 | 0.16 | 0.00 |  |
| 88 | Vayne | +0.15 | 0.29 | 0.14 |  |
| 89 | Kai'Sa | +0.15 | 0.26 | 0.11 |  |
| 90 | Amumu | +0.15 | 0.15 | 0.00 |  |
| 91 | Annie | +0.15 | 0.15 | 0.00 |  |
| 92 | Brand | +0.15 | 0.15 | 0.00 |  |
| 93 | Karma | +0.15 | 0.15 | 0.00 |  |
| 94 | Nami | +0.15 | 0.15 | 0.00 |  |
| 95 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 96 | Yone | +0.15 | 0.15 | 0.00 |  |
| 97 | Swain | +0.14 | 0.14 | 0.00 |  |
| 98 | Thresh | +0.13 | 0.13 | 0.00 |  |
| 99 | Quinn | +0.12 | 0.26 | 0.14 |  |
| 100 | Senna | +0.11 | 0.22 | 0.11 |  |
| 101 | Rammus | +0.10 | 0.25 | 0.15 |  |
| 102 | Urgot | +0.10 | 0.10 | 0.00 |  |
| 103 | Zac | +0.09 | 0.32 | 0.23 |  |
| 104 | Aurelion Sol | +0.09 | 0.15 | 0.06 |  |
| 105 | Rakan | +0.08 | 0.08 | 0.00 |  |
| 106 | LeBlanc | +0.07 | 0.15 | 0.08 |  |
| 107 | Lillia | +0.07 | 0.07 | 0.00 |  |
| 108 | Ivern | +0.06 | 0.13 | 0.07 |  |
| 109 | Mordekaiser | +0.06 | 0.06 | 0.00 |  |
| 110 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 111 | Neeko | +0.04 | 0.15 | 0.11 |  |
| 112 | Irelia | +0.03 | 0.03 | 0.00 |  |
| 113 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 114 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 115 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 116 | Braum | 0.00 | 0.00 | 0.00 |  |
| 117 | Briar | 0.00 | 0.00 | 0.00 |  |
| 118 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 119 | Darius | 0.00 | 0.00 | 0.00 |  |
| 120 | Diana | 0.00 | 0.00 | 0.00 |  |
| 121 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 122 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 123 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 124 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 125 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 126 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 127 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 128 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 129 | Leona | 0.00 | 0.00 | 0.00 |  |
| 130 | Locke | 0.00 | 0.00 | 0.00 |  |
| 131 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 132 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 133 | Rell | 0.00 | 0.00 | 0.00 |  |
| 134 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 135 | Riven | 0.00 | 0.00 | 0.00 |  |
| 136 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 137 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 138 | Sett | 0.00 | 0.00 | 0.00 |  |
| 139 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 140 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 141 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 142 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 143 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 144 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 145 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 146 | Caitlyn | -0.02 | 0.24 | 0.26 |  |
| 147 | Lucian | -0.02 | 0.24 | 0.26 |  |
| 148 | Twisted Fate | -0.06 | 0.29 | 0.35 |  |
| 149 | Miss Fortune | -0.06 | 0.22 | 0.28 |  |
| 150 | Vel'Koz | -0.06 | 0.18 | 0.24 |  |
| 151 | Akshan | -0.08 | 0.22 | 0.30 |  |
| 152 | Jhin | -0.08 | 0.18 | 0.26 |  |
| 153 | Galio | -0.08 | 0.00 | 0.08 |  |
| 154 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 155 | Viego | -0.11 | 0.06 | 0.17 |  |
| 156 | Akali | -0.11 | 0.00 | 0.11 |  |
| 157 | Xerath | -0.13 | 0.18 | 0.31 |  |
| 158 | Talon | -0.14 | 0.00 | 0.14 |  |
| 159 | Karthus | -0.15 | 0.13 | 0.28 |  |
| 160 | Pyke | -0.15 | 0.00 | 0.15 |  |
| 161 | Janna | -0.16 | 0.24 | 0.40 |  |
| 162 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 163 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 164 | Shen | -0.20 | 0.25 | 0.45 |  |
| 165 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 166 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 167 | Nunu & Willump | -0.22 | 0.13 | 0.35 |  |
| 168 | Vi | -0.22 | 0.00 | 0.22 |  |
| 169 | Fiddlesticks | -0.23 | 0.13 | 0.36 |  |
| 170 | Tahm Kench | -0.25 | 0.00 | 0.25 |  |
| 171 | Taliyah | -0.30 | 0.18 | 0.48 |  |
| 172 | Naafiri | -0.40 | 0.00 | 0.40 |  |
