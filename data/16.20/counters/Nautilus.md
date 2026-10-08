# Counters to Nautilus (patch 26.20)

Every champion ranked by what its kit does against Nautilus's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nautilus's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nautilus` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.40)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Nautilus's Depth Charge. Untargetable for 0.6 s; Depth Charge takes 3.46 s to land, enough to react. (Elise E Rappel → Nautilus R Depth Charge)
- **0.59** untargetable: Rappel makes Elise untargetable, dodging Nautilus's Dredge Line. Untargetable for 0.6 s; Dredge Line takes 0.81 s to land, enough to react. (Elise E Rappel → Nautilus Q Dredge Line)
- **0.30** range: Elise's basic attacks reach 375 units farther than Nautilus's (550 vs 175 attack range). Nautilus closes the gap with Dredge Line. (Elise basic attacks → Nautilus basic attacks)

### 2. Morgana (net +1.39)

- **0.80** cc immunity: Black Shield makes Morgana immune to Nautilus's Depth Charge (airborne, stun). Immune for 5 s, long enough to use ahead of Depth Charge. (Morgana E Black Shield → Nautilus R Depth Charge)
- **0.62** cc immunity: Black Shield makes Morgana immune to Nautilus's Dredge Line (airborne, stun). Immune for 5 s, long enough to use ahead of Dredge Line. (Morgana E Black Shield → Nautilus Q Dredge Line)
- **0.43** cc immunity: Black Shield makes Morgana immune to Nautilus's Staggering Blow (root). Immune for 5 s, long enough to use ahead of Staggering Blow. (Morgana E Black Shield → Nautilus I Staggering Blow)

### 3. Sivir (net +1.36)

- **0.80** spell shield: Spell Shield's spell shield blocks Nautilus's Depth Charge. Spell shield for 1.5 s, long enough to use ahead of Depth Charge. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nautilus R Depth Charge)
- **0.41** range: Sivir's basic attacks reach 325 units farther than Nautilus's (500 vs 175 attack range). Nautilus closes the gap with Dredge Line. (Sivir basic attacks → Nautilus basic attacks)
- **0.29** spell shield: Spell Shield's spell shield blocks part of Nautilus's Dredge Line. Spell shield for 1.5 s, long enough to use ahead of Dredge Line. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the ability but Nautilus will still dash partway to the target. (Sivir E Spell Shield → Nautilus Q Dredge Line)

### 4. Udyr (net +1.35)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Nautilus's Dredge Line (airborne, stun). Immune for 1.5 s, long enough to use ahead of Dredge Line. (Udyr E Blazing Stampede → Nautilus Q Dredge Line)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Nautilus's Depth Charge (airborne, stun). Immune for 1.5 s, long enough to use ahead of Depth Charge. (Udyr E Blazing Stampede → Nautilus R Depth Charge)
- **0.55** cc immunity: Blazing Stampede makes Udyr immune to Nautilus's Staggering Blow (root). Immune for 1.5 s, long enough to use ahead of Staggering Blow. (Udyr E Blazing Stampede → Nautilus I Staggering Blow)

### 5. Bard (net +1.30)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Nautilus's Depth Charge. Untargetable for 2.5 s, long enough to use ahead of Depth Charge. (Bard R Tempered Fate → Nautilus R Depth Charge)
- **0.38** untargetable: Tempered Fate makes Bard untargetable, dodging Nautilus's Dredge Line. Untargetable for 2.5 s, long enough to use ahead of Dredge Line. (Bard R Tempered Fate → Nautilus Q Dredge Line)
- **0.31** range: Bard's basic attacks reach 325 units farther than Nautilus's (500 vs 175 attack range). Nautilus closes the gap with Dredge Line. (Bard basic attacks → Nautilus basic attacks)

### 6. Fiora (net +1.28)

- **0.90** parry: Riposte parries Nautilus's Depth Charge and stuns back. Parry for 0.75 s; Depth Charge takes 3.46 s to land, enough to react. Negating Depth Charge's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Nautilus R Depth Charge)
- **0.72** parry: Riposte parries Nautilus's Dredge Line and stuns back. Parry for 0.75 s; Dredge Line takes 0.81 s to land, enough to react. Negating Dredge Line's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Nautilus Q Dredge Line)
- **0.08** attack speed slow: Riposte cuts Nautilus's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Nautilus basic attacks)

### 7. Lissandra (net +1.25)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Nautilus's Depth Charge. Untargetable for 2.5 s, long enough to use ahead of Depth Charge. (Lissandra R Frozen Tomb → Nautilus R Depth Charge)
- **0.38** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Nautilus's Dredge Line. Untargetable for 2.5 s, long enough to use ahead of Dredge Line. (Lissandra R Frozen Tomb → Nautilus Q Dredge Line)
- **0.21** range: Lissandra's basic attacks reach 375 units farther than Nautilus's (550 vs 175 attack range). Nautilus closes the gap with Dredge Line. (Lissandra basic attacks → Nautilus basic attacks)

### 8. Xayah (net +1.23)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Nautilus's Depth Charge. Untargetable for 1.5 s, long enough to use ahead of Depth Charge. (Xayah R Featherstorm → Nautilus R Depth Charge)
- **0.37** untargetable: Featherstorm makes Xayah untargetable, dodging Nautilus's Dredge Line. Untargetable for 1.5 s, long enough to use ahead of Dredge Line. (Xayah R Featherstorm → Nautilus Q Dredge Line)
- **0.34** range: Xayah's basic attacks reach 350 units farther than Nautilus's (525 vs 175 attack range). Nautilus closes the gap with Dredge Line. (Xayah basic attacks → Nautilus basic attacks)

### 9. Vladimir (net +1.21)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nautilus's Depth Charge. Untargetable for 2 s, long enough to use ahead of Depth Charge. (Vladimir W Sanguine Pool → Nautilus R Depth Charge)
- **0.62** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nautilus's Dredge Line. Untargetable for 2 s, long enough to use ahead of Dredge Line. (Vladimir W Sanguine Pool → Nautilus Q Dredge Line)
- **0.15** range: Vladimir's basic attacks reach 275 units farther than Nautilus's (450 vs 175 attack range). Nautilus closes the gap with Dredge Line. (Vladimir basic attacks → Nautilus basic attacks)
- Watch out: Depth Charge's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 10. Maokai (net +1.20)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Nautilus's Dredge Line. Untargetable for 1.4 s; Dredge Line takes 0.81 s to land, enough to react. (Maokai W Twisted Advance → Nautilus Q Dredge Line)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Nautilus's Depth Charge. Untargetable for 1.4 s; Depth Charge takes 3.46 s to land, enough to react. (Maokai W Twisted Advance → Nautilus R Depth Charge)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.40 | 1.40 | 0.00 |  |
| 2 | Morgana | +1.39 | 1.39 | 0.00 |  |
| 3 | Sivir | +1.36 | 1.36 | 0.00 |  |
| 4 | Udyr | +1.35 | 1.35 | 0.00 |  |
| 5 | Bard | +1.30 | 1.30 | 0.00 |  |
| 6 | Fiora | +1.28 | 1.28 | 0.00 |  |
| 7 | Lissandra | +1.25 | 1.25 | 0.00 |  |
| 8 | Xayah | +1.23 | 1.23 | 0.00 |  |
| 9 | Vladimir | +1.21 | 1.26 | 0.05 |  |
| 10 | Maokai | +1.20 | 1.20 | 0.00 |  |
| 11 | Aurora | +1.19 | 1.19 | 0.00 |  |
| 12 | Gwen | +1.10 | 1.10 | 0.00 |  |
| 13 | Nocturne | +1.10 | 1.10 | 0.00 |  |
| 14 | Yuumi | +1.09 | 1.47 | 0.38 |  |
| 15 | Milio | +1.08 | 1.08 | 0.00 |  |
| 16 | Rengar | +1.08 | 1.08 | 0.00 |  |
| 17 | Master Yi | +1.06 | 1.17 | 0.11 |  |
| 18 | Olaf | +1.06 | 1.06 | 0.00 |  |
| 19 | Zaahen | +1.06 | 1.06 | 0.00 |  |
| 20 | Warwick | +1.03 | 1.21 | 0.18 |  |
| 21 | Rek'Sai | +1.02 | 1.02 | 0.00 |  |
| 22 | Ekko | +1.01 | 1.01 | 0.00 |  |
| 23 | Sion | +1.00 | 1.08 | 0.08 |  |
| 24 | Gangplank | +1.00 | 1.00 | 0.00 |  |
| 25 | Kled | +1.00 | 1.00 | 0.00 |  |
| 26 | Evelynn | +0.99 | 0.99 | 0.00 |  |
| 27 | Kalista | +0.99 | 0.99 | 0.00 |  |
| 28 | Shaco | +0.99 | 0.99 | 0.00 |  |
| 29 | Camille | +0.97 | 0.97 | 0.00 |  |
| 30 | Zed | +0.89 | 0.89 | 0.00 |  |
| 31 | Kayle | +0.86 | 0.86 | 0.00 |  |
| 32 | Alistar | +0.85 | 0.85 | 0.00 |  |
| 33 | Kindred | +0.82 | 0.82 | 0.00 |  |
| 34 | Braum | +0.80 | 0.80 | 0.00 | projectile block (Unbreakable) |
| 35 | Samira | +0.80 | 0.80 | 0.00 | projectile block (Blade Whirl) |
| 36 | Mel | +0.75 | 0.75 | 0.00 | projectile block (Rebuttal) |
| 37 | Teemo | +0.72 | 0.72 | 0.00 | blind (Blinding Dart) |
| 38 | Vex | +0.68 | 0.68 | 0.00 |  |
| 39 | Malzahar | +0.65 | 1.05 | 0.40 |  |
| 40 | Jinx | +0.65 | 0.65 | 0.00 | dash stop (Flame Chompers!) |
| 41 | Lulu | +0.64 | 0.64 | 0.00 |  |
| 42 | Viktor | +0.62 | 0.62 | 0.00 |  |
| 43 | Hwei | +0.61 | 0.61 | 0.00 | dash stop (Grim Visage) |
| 44 | Yasuo | +0.60 | 0.60 | 0.00 | projectile block (Wind Wall) |
| 45 | Cassiopeia | +0.59 | 0.59 | 0.00 |  |
| 46 | Ahri | +0.57 | 0.57 | 0.00 |  |
| 47 | Veigar | +0.55 | 0.55 | 0.00 |  |
| 48 | Kayn | +0.54 | 0.99 | 0.45 |  |
| 49 | Pantheon | +0.50 | 0.55 | 0.05 |  |
| 50 | Xin Zhao | +0.44 | 0.44 | 0.00 |  |
| 51 | Garen | +0.42 | 0.42 | 0.00 |  |
| 52 | Aphelios | +0.41 | 0.41 | 0.00 |  |
| 53 | Taric | +0.41 | 0.41 | 0.00 |  |
| 54 | Zeri | +0.41 | 0.41 | 0.00 |  |
| 55 | Corki | +0.40 | 0.40 | 0.00 |  |
| 56 | Twitch | +0.40 | 0.40 | 0.00 |  |
| 57 | Vayne | +0.40 | 0.40 | 0.00 |  |
| 58 | Singed | +0.39 | 0.39 | 0.00 |  |
| 59 | Sona | +0.39 | 0.39 | 0.00 |  |
| 60 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 61 | Renata Glasc | +0.36 | 0.36 | 0.00 |  |
| 62 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 63 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 64 | Jax | +0.35 | 0.35 | 0.00 |  |
| 65 | Draven | +0.34 | 0.34 | 0.00 |  |
| 66 | Kai'Sa | +0.34 | 0.34 | 0.00 |  |
| 67 | Malphite | +0.33 | 0.33 | 0.00 |  |
| 68 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 69 | Senna | +0.32 | 0.32 | 0.00 |  |
| 70 | Yone | +0.31 | 0.31 | 0.00 |  |
| 71 | Poppy | +0.30 | 0.50 | 0.20 | dash stop (Steadfast Presence) |
| 72 | Ezreal | +0.30 | 0.30 | 0.00 |  |
| 73 | Nilah | +0.30 | 0.30 | 0.00 |  |
| 74 | Smolder | +0.30 | 0.30 | 0.00 |  |
| 75 | Zilean | +0.30 | 0.30 | 0.00 |  |
| 76 | Zoe | +0.30 | 0.30 | 0.00 |  |
| 77 | Gnar | +0.29 | 0.29 | 0.00 |  |
| 78 | Kennen | +0.27 | 0.27 | 0.00 |  |
| 79 | Lux | +0.27 | 0.27 | 0.00 |  |
| 80 | Jayce | +0.26 | 0.26 | 0.00 |  |
| 81 | Nidalee | +0.26 | 0.26 | 0.00 |  |
| 82 | Seraphine | +0.25 | 0.25 | 0.00 |  |
| 83 | Soraka | +0.25 | 0.25 | 0.00 |  |
| 84 | Ziggs | +0.25 | 0.25 | 0.00 |  |
| 85 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 86 | Heimerdinger | +0.24 | 0.24 | 0.00 |  |
| 87 | Kog'Maw | +0.24 | 0.24 | 0.00 |  |
| 88 | K'Sante | +0.24 | 0.24 | 0.00 |  |
| 89 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 90 | Azir | +0.23 | 0.23 | 0.00 |  |
| 91 | Orianna | +0.23 | 0.23 | 0.00 |  |
| 92 | Annie | +0.22 | 0.22 | 0.00 |  |
| 93 | Varus | +0.21 | 0.27 | 0.06 |  |
| 94 | Brand | +0.21 | 0.21 | 0.00 |  |
| 95 | Nami | +0.21 | 0.21 | 0.00 |  |
| 96 | Neeko | +0.21 | 0.21 | 0.00 |  |
| 97 | Syndra | +0.21 | 0.21 | 0.00 |  |
| 98 | Quinn | +0.20 | 0.34 | 0.14 |  |
| 99 | Graves | +0.20 | 0.20 | 0.00 |  |
| 100 | Karma | +0.19 | 0.19 | 0.00 |  |
| 101 | LeBlanc | +0.19 | 0.19 | 0.00 |  |
| 102 | Amumu | +0.18 | 0.18 | 0.00 |  |
| 103 | Swain | +0.18 | 0.18 | 0.00 |  |
| 104 | Zac | +0.17 | 0.40 | 0.23 | dash stop (Stretching Strikes) |
| 105 | Rammus | +0.16 | 0.32 | 0.16 |  |
| 106 | Thresh | +0.16 | 0.16 | 0.00 |  |
| 107 | Aurelion Sol | +0.15 | 0.21 | 0.06 |  |
| 108 | Hecarim | +0.12 | 0.12 | 0.00 |  |
| 109 | Illaoi | +0.12 | 0.12 | 0.00 |  |
| 110 | Jarvan IV | +0.12 | 0.12 | 0.00 |  |
| 111 | Ornn | +0.12 | 0.12 | 0.00 |  |
| 112 | Sett | +0.12 | 0.12 | 0.00 |  |
| 113 | Shyvana | +0.12 | 0.12 | 0.00 |  |
| 114 | Urgot | +0.12 | 0.12 | 0.00 |  |
| 115 | Volibear | +0.12 | 0.12 | 0.00 |  |
| 116 | Ivern | +0.09 | 0.16 | 0.07 |  |
| 117 | Rakan | +0.09 | 0.09 | 0.00 |  |
| 118 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 119 | Lillia | +0.08 | 0.08 | 0.00 |  |
| 120 | Mordekaiser | +0.08 | 0.08 | 0.00 |  |
| 121 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 122 | Akshan | +0.04 | 0.29 | 0.25 |  |
| 123 | Twisted Fate | +0.03 | 0.38 | 0.35 |  |
| 124 | Lucian | +0.03 | 0.31 | 0.28 |  |
| 125 | Miss Fortune | +0.02 | 0.30 | 0.28 |  |
| 126 | Viego | 0.00 | 0.12 | 0.12 |  |
| 127 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 128 | Akali | 0.00 | 0.00 | 0.00 |  |
| 129 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 130 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 131 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 132 | Briar | 0.00 | 0.00 | 0.00 |  |
| 133 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 134 | Darius | 0.00 | 0.00 | 0.00 |  |
| 135 | Diana | 0.00 | 0.00 | 0.00 |  |
| 136 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 137 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 138 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 139 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 140 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 141 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 142 | Leona | 0.00 | 0.00 | 0.00 |  |
| 143 | Locke | 0.00 | 0.00 | 0.00 |  |
| 144 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 145 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 146 | Rell | 0.00 | 0.00 | 0.00 |  |
| 147 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 148 | Riven | 0.00 | 0.00 | 0.00 |  |
| 149 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 150 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 151 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 152 | Talon | 0.00 | 0.00 | 0.00 |  |
| 153 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 154 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 155 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 156 | Jhin | -0.03 | 0.25 | 0.28 |  |
| 157 | Vel'Koz | -0.05 | 0.23 | 0.28 |  |
| 158 | Janna | -0.06 | 0.34 | 0.40 |  |
| 159 | Xerath | -0.08 | 0.23 | 0.31 |  |
| 160 | Pyke | -0.08 | 0.00 | 0.08 |  |
| 161 | Galio | -0.09 | 0.00 | 0.09 |  |
| 162 | Vi | -0.10 | 0.12 | 0.22 |  |
| 163 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 164 | Shen | -0.12 | 0.33 | 0.45 |  |
| 165 | Karthus | -0.12 | 0.16 | 0.28 |  |
| 166 | Ryze | -0.13 | 0.22 | 0.35 |  |
| 167 | Katarina | -0.20 | 0.00 | 0.20 |  |
| 168 | Fiddlesticks | -0.23 | 0.17 | 0.40 |  |
| 169 | Taliyah | -0.25 | 0.23 | 0.48 |  |
| 170 | Nunu & Willump | -0.25 | 0.12 | 0.37 |  |
| 171 | Tahm Kench | -0.26 | 0.00 | 0.26 |  |
| 172 | Naafiri | -0.45 | 0.00 | 0.45 |  |
