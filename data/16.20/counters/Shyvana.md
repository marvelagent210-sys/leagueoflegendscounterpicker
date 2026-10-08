# Counters to Shyvana (patch 26.20)

Every champion ranked by what its kit does against Shyvana's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Shyvana's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Shyvana` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.17)

- **0.73** spell shield: Spell Shield's spell shield blocks Shyvana's Dragon's Descent. Spell shield for 1.5 s, long enough to use ahead of Dragon's Descent. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Shyvana R Dragon's Descent)
- **0.44** range: Sivir's basic attacks reach 350 units farther than Shyvana's (500 vs 150 attack range). Shyvana closes the gap with Dragon's Descent. (Sivir basic attacks → Shyvana basic attacks)

### 2. Udyr (net +1.06)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Shyvana's Dragon's Descent (fear, slow). Immune for 1.5 s, long enough to use ahead of Dragon's Descent. (Udyr E Blazing Stampede → Shyvana R Dragon's Descent)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Shyvana's Molten Burst (slow). Immune for 1.5 s, long enough to use ahead of Molten Burst. (Udyr E Blazing Stampede → Shyvana E Molten Burst)

### 3. Elise (net +1.05)

- **0.73** untargetable: Rappel makes Elise untargetable, dodging Shyvana's Dragon's Descent. Untargetable for 0.6 s; Dragon's Descent takes 0.25 s to land, enough to react. (Elise E Rappel → Shyvana R Dragon's Descent)
- **0.32** range: Elise's basic attacks reach 400 units farther than Shyvana's (550 vs 150 attack range). Shyvana closes the gap with Dragon's Descent. (Elise basic attacks → Shyvana basic attacks)

### 4. Morgana (net +1.00)

- **0.78** cc immunity: Black Shield makes Morgana immune to Shyvana's Dragon's Descent (fear, slow). Immune for 5 s, long enough to use ahead of Dragon's Descent. (Morgana E Black Shield → Shyvana R Dragon's Descent)
- **0.18** range: Morgana's basic attacks reach 300 units farther than Shyvana's (450 vs 150 attack range). Shyvana closes the gap with Dragon's Descent. (Morgana basic attacks → Shyvana basic attacks)
- **0.08** cc immunity: Black Shield makes Morgana immune to Shyvana's Molten Burst (slow). Immune for 5 s, long enough to use ahead of Molten Burst. (Morgana E Black Shield → Shyvana E Molten Burst)

### 5. Maokai (net +0.93)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Shyvana's Dragon's Descent. Untargetable for 1.4 s; Dragon's Descent takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Shyvana R Dragon's Descent)
- Watch out: Dragon's Descent is displacement immune, ignoring Maokai's Bramble Smash (airborne) during it.

### 6. Fiora (net +0.92)

- **0.88** parry: Riposte parries Shyvana's Dragon's Descent and stuns back. Parry for 0.75 s; Dragon's Descent takes 0.25 s to land, enough to react. Negating Dragon's Descent's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Shyvana R Dragon's Descent)
- **0.07** attack speed slow: Riposte cuts Shyvana's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Shyvana basic attacks)

### 7. Nocturne (net +0.90)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Shyvana's Dragon's Descent. Spell shield for 1.5 s, long enough to use ahead of Dragon's Descent. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Shyvana R Dragon's Descent)

### 8. Yuumi (net +0.89)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Shyvana's Dragon's Descent. Untargetable for ?; Dragon's Descent takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Shyvana R Dragon's Descent)
- **0.30** range: Yuumi's basic attacks reach 275 units farther than Shyvana's (425 vs 150 attack range). Shyvana closes the gap with Dragon's Descent. (Yuumi basic attacks → Shyvana basic attacks)
- Watch out: Dragon's Descent's fear interrupts Yuumi's Final Chapter (normal channel).

### 9. Vladimir (net +0.86)

- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Shyvana's Dragon's Descent. Untargetable for 2 s, long enough to use ahead of Dragon's Descent. (Vladimir W Sanguine Pool → Shyvana R Dragon's Descent)
- **0.16** range: Vladimir's basic attacks reach 300 units farther than Shyvana's (450 vs 150 attack range). Shyvana closes the gap with Dragon's Descent. (Vladimir basic attacks → Shyvana basic attacks)
- Watch out: Dragon's Descent's fear interrupts Vladimir's Tides of Blood (charge-up).

### 10. Rengar (net +0.84)

- **0.80** cleanse: Battle Roar cleanses Shyvana's Dragon's Descent (fear, slow) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Shyvana R Dragon's Descent)
- **0.08** cleanse: Battle Roar cleanses Shyvana's Molten Burst (slow) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Shyvana E Molten Burst)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.17 | 1.17 | 0.00 |  |
| 2 | Udyr | +1.06 | 1.06 | 0.00 |  |
| 3 | Elise | +1.05 | 1.05 | 0.00 |  |
| 4 | Morgana | +1.00 | 1.00 | 0.00 |  |
| 5 | Maokai | +0.93 | 1.00 | 0.07 |  |
| 6 | Fiora | +0.92 | 0.92 | 0.00 |  |
| 7 | Nocturne | +0.90 | 0.90 | 0.00 |  |
| 8 | Yuumi | +0.89 | 1.30 | 0.41 |  |
| 9 | Vladimir | +0.86 | 0.94 | 0.08 |  |
| 10 | Rengar | +0.84 | 0.84 | 0.00 |  |
| 11 | Xayah | +0.82 | 0.82 | 0.00 |  |
| 12 | Milio | +0.80 | 0.87 | 0.07 |  |
| 13 | Aurora | +0.75 | 0.75 | 0.00 |  |
| 14 | Bard | +0.74 | 0.82 | 0.08 |  |
| 15 | Gwen | +0.73 | 0.73 | 0.00 |  |
| 16 | Cassiopeia | +0.70 | 0.70 | 0.00 | grounding (Miasma) |
| 17 | Gangplank | +0.70 | 0.70 | 0.00 |  |
| 18 | Teemo | +0.70 | 0.70 | 0.00 |  |
| 19 | Singed | +0.69 | 0.76 | 0.07 | grounding (Mega Adhesive) |
| 20 | Master Yi | +0.67 | 0.90 | 0.23 |  |
| 21 | Kindred | +0.67 | 0.67 | 0.00 |  |
| 22 | Lissandra | +0.65 | 0.70 | 0.05 |  |
| 23 | Kayle | +0.60 | 0.60 | 0.00 |  |
| 24 | Lulu | +0.55 | 0.63 | 0.08 |  |
| 25 | Mel | +0.53 | 0.53 | 0.00 |  |
| 26 | Ekko | +0.52 | 0.52 | 0.00 |  |
| 27 | Garen | +0.52 | 0.52 | 0.00 |  |
| 28 | Aphelios | +0.51 | 0.51 | 0.00 |  |
| 29 | Olaf | +0.51 | 0.51 | 0.00 |  |
| 30 | Kalista | +0.49 | 0.68 | 0.19 |  |
| 31 | Evelynn | +0.48 | 0.48 | 0.00 |  |
| 32 | Shaco | +0.48 | 0.48 | 0.00 |  |
| 33 | Samira | +0.47 | 0.56 | 0.09 |  |
| 34 | Zed | +0.46 | 0.46 | 0.00 |  |
| 35 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 36 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 37 | Sona | +0.41 | 0.41 | 0.00 |  |
| 38 | Braum | +0.37 | 0.45 | 0.08 | projectile block (Unbreakable) |
| 39 | Vayne | +0.36 | 0.43 | 0.07 |  |
| 40 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 41 | Kai'Sa | +0.36 | 0.36 | 0.00 |  |
| 42 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 43 | Kled | +0.34 | 0.58 | 0.24 |  |
| 44 | Sion | +0.34 | 0.53 | 0.19 |  |
| 45 | Varus | +0.34 | 0.45 | 0.11 |  |
| 46 | Zaahen | +0.33 | 0.51 | 0.18 |  |
| 47 | Heimerdinger | +0.33 | 0.33 | 0.00 |  |
| 48 | Rek'Sai | +0.32 | 0.48 | 0.16 |  |
| 49 | Camille | +0.32 | 0.47 | 0.15 |  |
| 50 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 51 | Senna | +0.32 | 0.32 | 0.00 |  |
| 52 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 53 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 54 | Renata Glasc | +0.31 | 0.38 | 0.07 |  |
| 55 | Jax | +0.31 | 0.31 | 0.00 |  |
| 56 | Malzahar | +0.29 | 0.72 | 0.43 |  |
| 57 | Draven | +0.29 | 0.36 | 0.07 |  |
| 58 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 59 | Lux | +0.29 | 0.29 | 0.00 |  |
| 60 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 61 | Alistar | +0.28 | 0.40 | 0.12 |  |
| 62 | Nilah | +0.28 | 0.36 | 0.08 |  |
| 63 | Tristana | +0.28 | 0.36 | 0.08 |  |
| 64 | Nidalee | +0.28 | 0.28 | 0.00 |  |
| 65 | Mordekaiser | +0.27 | 0.41 | 0.14 |  |
| 66 | Pantheon | +0.27 | 0.37 | 0.10 |  |
| 67 | Seraphine | +0.27 | 0.27 | 0.00 |  |
| 68 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 69 | Viktor | +0.26 | 0.30 | 0.04 |  |
| 70 | Zoe | +0.25 | 0.32 | 0.07 |  |
| 71 | Kog'Maw | +0.25 | 0.25 | 0.00 |  |
| 72 | Vex | +0.24 | 0.27 | 0.03 |  |
| 73 | Gnar | +0.23 | 0.31 | 0.08 |  |
| 74 | Corki | +0.23 | 0.30 | 0.07 |  |
| 75 | Jinx | +0.23 | 0.27 | 0.04 |  |
| 76 | Taric | +0.23 | 0.23 | 0.00 |  |
| 77 | Annie | +0.22 | 0.22 | 0.00 |  |
| 78 | Brand | +0.22 | 0.22 | 0.00 |  |
| 79 | Graves | +0.22 | 0.22 | 0.00 |  |
| 80 | Jayce | +0.21 | 0.28 | 0.07 |  |
| 81 | Karma | +0.21 | 0.21 | 0.00 |  |
| 82 | LeBlanc | +0.21 | 0.21 | 0.00 |  |
| 83 | Veigar | +0.20 | 0.24 | 0.04 |  |
| 84 | Warwick | +0.19 | 0.52 | 0.33 |  |
| 85 | Ahri | +0.18 | 0.22 | 0.04 |  |
| 86 | Orianna | +0.17 | 0.25 | 0.08 |  |
| 87 | Hwei | +0.16 | 0.23 | 0.07 |  |
| 88 | Syndra | +0.15 | 0.22 | 0.07 |  |
| 89 | Skarner | +0.15 | 0.15 | 0.00 |  |
| 90 | Neeko | +0.14 | 0.22 | 0.08 |  |
| 91 | Swain | +0.13 | 0.20 | 0.07 |  |
| 92 | Quinn | +0.12 | 0.36 | 0.24 |  |
| 93 | Ziggs | +0.10 | 0.27 | 0.17 |  |
| 94 | Anivia | +0.10 | 0.24 | 0.14 |  |
| 95 | Azir | +0.09 | 0.25 | 0.16 |  |
| 96 | Aurelion Sol | +0.09 | 0.22 | 0.13 |  |
| 97 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 98 | Zyra | +0.08 | 0.24 | 0.16 |  |
| 99 | Lucian | +0.06 | 0.34 | 0.28 |  |
| 100 | Twisted Fate | +0.05 | 0.40 | 0.35 |  |
| 101 | Xin Zhao | +0.05 | 0.23 | 0.18 |  |
| 102 | Thresh | +0.05 | 0.18 | 0.13 |  |
| 103 | Akshan | +0.04 | 0.32 | 0.28 |  |
| 104 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 105 | Nami | +0.04 | 0.22 | 0.18 |  |
| 106 | Urgot | +0.04 | 0.13 | 0.09 |  |
| 107 | Yasuo | +0.03 | 0.31 | 0.28 |  |
| 108 | Ivern | +0.03 | 0.18 | 0.15 |  |
| 109 | Lillia | +0.02 | 0.10 | 0.08 |  |
| 110 | Akali | 0.00 | 0.00 | 0.00 |  |
| 111 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 112 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 113 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 114 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 115 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 116 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 117 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 118 | Leona | 0.00 | 0.00 | 0.00 |  |
| 119 | Locke | 0.00 | 0.00 | 0.00 |  |
| 120 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 121 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 122 | Talon | 0.00 | 0.00 | 0.00 |  |
| 123 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 124 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 125 | Kayn | -0.01 | 0.48 | 0.49 |  |
| 126 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 127 | Malphite | -0.01 | 0.19 | 0.20 |  |
| 128 | Rammus | -0.04 | 0.29 | 0.33 |  |
| 129 | Amumu | -0.05 | 0.00 | 0.05 |  |
| 130 | Briar | -0.05 | 0.00 | 0.05 |  |
| 131 | Vel'Koz | -0.07 | 0.25 | 0.32 |  |
| 132 | Xerath | -0.07 | 0.25 | 0.32 |  |
| 133 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 134 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 135 | Darius | -0.07 | 0.00 | 0.07 |  |
| 136 | Sett | -0.07 | 0.00 | 0.07 |  |
| 137 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 138 | Diana | -0.08 | 0.00 | 0.08 |  |
| 139 | Fizz | -0.08 | 0.00 | 0.08 |  |
| 140 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 141 | Qiyana | -0.08 | 0.00 | 0.08 |  |
| 142 | Rakan | -0.09 | 0.11 | 0.20 |  |
| 143 | Karthus | -0.10 | 0.18 | 0.28 |  |
| 144 | Katarina | -0.10 | 0.18 | 0.28 |  |
| 145 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 146 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 147 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 148 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 149 | Janna | -0.16 | 0.36 | 0.52 |  |
| 150 | Shen | -0.16 | 0.29 | 0.45 |  |
| 151 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 152 | Ornn | -0.16 | 0.00 | 0.16 |  |
| 153 | Aatrox | -0.17 | 0.00 | 0.17 |  |
| 154 | K'Sante | -0.17 | 0.00 | 0.17 |  |
| 155 | Nunu & Willump | -0.18 | 0.33 | 0.51 |  |
| 156 | Blitzcrank | -0.18 | 0.00 | 0.18 |  |
| 157 | Pyke | -0.19 | 0.00 | 0.19 |  |
| 158 | Riven | -0.20 | 0.00 | 0.20 |  |
| 159 | Rell | -0.24 | 0.00 | 0.24 |  |
| 160 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 161 | Yone | -0.25 | 0.00 | 0.25 |  |
| 162 | Fiddlesticks | -0.27 | 0.18 | 0.45 |  |
| 163 | Gragas | -0.27 | 0.00 | 0.27 |  |
| 164 | Viego | -0.27 | 0.00 | 0.27 |  |
| 165 | Jarvan IV | -0.28 | 0.00 | 0.28 |  |
| 166 | Poppy | -0.30 | 0.00 | 0.30 |  |
| 167 | Galio | -0.35 | 0.00 | 0.35 |  |
| 168 | Taliyah | -0.37 | 0.25 | 0.62 |  |
| 169 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 170 | Vi | -0.51 | 0.00 | 0.51 |  |
| 171 | Zac | -0.55 | 0.00 | 0.55 |  |
| 172 | Tahm Kench | -0.58 | 0.00 | 0.58 |  |
