# Counters to Briar (patch 26.20)

Every champion ranked by what its kit does against Briar's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Briar's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Briar` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.62)

- **1.00** spell shield: Spell Shield's spell shield blocks Briar's Certain Death. Spell shield for 1.5 s, long enough to use ahead of Certain Death. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Briar R Certain Death)
- **0.56** spell shield: Spell Shield's spell shield blocks Briar's Head Rush. Spell shield for 1.5 s, long enough to use ahead of Head Rush. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Briar Q Head Rush)
- **0.42** spell shield: Spell Shield's spell shield blocks Briar's Chilling Scream. Spell shield for 1.5 s, long enough to use ahead of Chilling Scream. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Briar E Chilling Scream)

### 2. Singed (net +1.61)

- **0.49** grounding: Mega Adhesive grounds Briar, who then can't cast Certain Death. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Briar R Certain Death)
- **0.40** anti-heal: Insanity Potion's Grievous Wounds cuts Briar's healing from Certain Death by 40%. (Singed R Insanity Potion → Briar R Certain Death)
- **0.39** grounding: Mega Adhesive grounds Briar, who then can't cast Head Rush. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Briar Q Head Rush)

### 3. Fiora (net +1.55)

- **1.10** parry: Riposte parries Briar's Certain Death and stuns back. Parry for 0.75 s; Certain Death takes 7 s to land, enough to react. Negating Certain Death's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Briar R Certain Death)
- **0.69** parry: Riposte parries Briar's Head Rush and stuns back. Parry for 0.75 s; Head Rush takes 0.79 s to land, enough to react. Negating Head Rush's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Briar Q Head Rush)
- **0.37** parry: Riposte parries Briar's Chilling Scream and stuns back. Parry for 0.75 s; Chilling Scream lands within 0.2 s, faster than a 0.25 s reaction, so it needs prediction. Negating Chilling Scream's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Briar E Chilling Scream)

### 4. Morgana (net +1.51)

- **1.00** cc immunity: Black Shield makes Morgana immune to Briar's Certain Death (disrupt, fear, slow). Immune for 5 s, long enough to use ahead of Certain Death. (Morgana E Black Shield → Briar R Certain Death)
- **0.59** cc immunity: Black Shield makes Morgana immune to Briar's Head Rush (stun). Immune for 5 s, long enough to use ahead of Head Rush. (Morgana E Black Shield → Briar Q Head Rush)
- **0.45** cc immunity: Black Shield makes Morgana immune to Briar's Chilling Scream (airborne, slow, stun). Immune for 5 s, long enough to use ahead of Chilling Scream. (Morgana E Black Shield → Briar E Chilling Scream)

### 5. Udyr (net +1.51)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Briar's Certain Death (disrupt, fear, slow). Immune for 1.5 s, long enough to use ahead of Certain Death. (Udyr E Blazing Stampede → Briar R Certain Death)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Briar's Head Rush (stun). Immune for 1.5 s, long enough to use ahead of Head Rush. (Udyr E Blazing Stampede → Briar Q Head Rush)
- **0.45** cc immunity: Blazing Stampede makes Udyr immune to Briar's Chilling Scream (airborne, slow, stun). Immune for 1.5 s, long enough to use ahead of Chilling Scream. (Udyr E Blazing Stampede → Briar E Chilling Scream)

### 6. Master Yi (net +1.50)

- **1.00** untargetable: Alpha Strike makes Master Yi untargetable, dodging Briar's Certain Death. Untargetable for ?; Certain Death takes 7 s to land, enough to react. (Master Yi Q Alpha Strike → Briar R Certain Death)
- **0.56** untargetable: Alpha Strike makes Master Yi untargetable, dodging Briar's Head Rush. Untargetable for ?; Head Rush takes 0.79 s to land, enough to react. (Master Yi Q Alpha Strike → Briar Q Head Rush)
- **0.25** untargetable: Alpha Strike makes Master Yi untargetable, dodging Briar's Chilling Scream. Untargetable for ?; Chilling Scream lands within 0.2 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Briar E Chilling Scream)
- Watch out: Certain Death's disrupt interrupts Master Yi's Meditate (normal channel).

### 7. Elise (net +1.50)

- **1.00** untargetable: Rappel makes Elise untargetable, dodging Briar's Certain Death. Untargetable for 0.6 s; Certain Death takes 7 s to land, enough to react. (Elise E Rappel → Briar R Certain Death)
- **0.56** untargetable: Rappel makes Elise untargetable, dodging Briar's Head Rush. Untargetable for 0.6 s; Head Rush takes 0.79 s to land, enough to react. (Elise E Rappel → Briar Q Head Rush)
- **0.25** untargetable: Rappel makes Elise untargetable, dodging Briar's Chilling Scream. Untargetable for 0.6 s; Chilling Scream lands within 0.2 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Briar E Chilling Scream)

### 8. Nocturne (net +1.50)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Briar's Certain Death. Spell shield for 1.5 s, long enough to use ahead of Certain Death. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Briar R Certain Death)
- **0.68** spell shield: Shroud of Darkness's spell shield blocks Briar's Head Rush. Spell shield for 1.5 s, long enough to use ahead of Head Rush. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Briar Q Head Rush)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Briar's Chilling Scream. Spell shield for 1.5 s, long enough to use ahead of Chilling Scream. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Briar E Chilling Scream)

### 9. Vladimir (net +1.45)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Briar's Certain Death. Untargetable for 2 s, long enough to use ahead of Certain Death. (Vladimir W Sanguine Pool → Briar R Certain Death)
- **0.59** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Briar's Head Rush. Untargetable for 2 s, long enough to use ahead of Head Rush. (Vladimir W Sanguine Pool → Briar Q Head Rush)
- **0.45** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Briar's Chilling Scream. Untargetable for 2 s, long enough to use ahead of Chilling Scream. (Vladimir W Sanguine Pool → Briar E Chilling Scream)
- Watch out: Certain Death's disrupt interrupts Vladimir's Tides of Blood (charge-up).

### 10. Maokai (net +1.44)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Briar's Certain Death. Untargetable for 1.4 s; Certain Death takes 7 s to land, enough to react. (Maokai W Twisted Advance → Briar R Certain Death)
- **0.75** untargetable: Twisted Advance makes Maokai untargetable, dodging Briar's Head Rush. Untargetable for 1.4 s; Head Rush takes 0.79 s to land, enough to react. (Maokai W Twisted Advance → Briar Q Head Rush)
- **0.27** untargetable: Twisted Advance makes Maokai untargetable, dodging Briar's Chilling Scream. Untargetable for 1.4 s; Chilling Scream lands within 0.2 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Briar E Chilling Scream)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.62 | 1.62 | 0.00 |  |
| 2 | Singed | +1.61 | 1.61 | 0.00 | grounding (Mega Adhesive) |
| 3 | Fiora | +1.55 | 1.55 | 0.00 |  |
| 4 | Morgana | +1.51 | 1.51 | 0.00 |  |
| 5 | Udyr | +1.51 | 1.51 | 0.00 |  |
| 6 | Master Yi | +1.50 | 1.61 | 0.11 |  |
| 7 | Elise | +1.50 | 1.50 | 0.00 |  |
| 8 | Nocturne | +1.50 | 1.50 | 0.00 |  |
| 9 | Vladimir | +1.45 | 1.50 | 0.05 |  |
| 10 | Maokai | +1.44 | 1.44 | 0.00 |  |
| 11 | Bard | +1.42 | 1.42 | 0.00 |  |
| 12 | Lissandra | +1.39 | 1.39 | 0.00 |  |
| 13 | Gwen | +1.34 | 1.34 | 0.00 |  |
| 14 | Xayah | +1.31 | 1.31 | 0.00 |  |
| 15 | Samira | +1.26 | 1.26 | 0.00 | projectile block (Blade Whirl) |
| 16 | Yuumi | +1.25 | 1.63 | 0.38 |  |
| 17 | Ekko | +1.25 | 1.25 | 0.00 |  |
| 18 | Rek'Sai | +1.25 | 1.25 | 0.00 |  |
| 19 | Olaf | +1.24 | 1.24 | 0.00 |  |
| 20 | Braum | +1.23 | 1.23 | 0.00 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 21 | Mel | +1.23 | 1.23 | 0.00 | projectile block (Rebuttal) |
| 22 | Yasuo | +1.22 | 1.22 | 0.00 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 23 | Zaahen | +1.22 | 1.22 | 0.00 |  |
| 24 | Sion | +1.18 | 1.26 | 0.08 |  |
| 25 | Camille | +1.16 | 1.16 | 0.00 |  |
| 26 | Warwick | +1.14 | 1.32 | 0.18 |  |
| 27 | Evelynn | +1.14 | 1.22 | 0.08 |  |
| 28 | Gangplank | +1.14 | 1.14 | 0.00 |  |
| 29 | Kled | +1.11 | 1.11 | 0.00 |  |
| 30 | Aurora | +1.09 | 1.24 | 0.15 |  |
| 31 | Zed | +1.09 | 1.09 | 0.00 |  |
| 32 | Milio | +1.06 | 1.06 | 0.00 |  |
| 33 | Rengar | +1.05 | 1.19 | 0.14 |  |
| 34 | Shaco | +1.02 | 1.22 | 0.20 |  |
| 35 | Alistar | +1.00 | 1.00 | 0.00 |  |
| 36 | Kalista | +0.98 | 0.98 | 0.00 |  |
| 37 | Cassiopeia | +0.87 | 0.87 | 0.00 | grounding (Miasma) |
| 38 | Kayle | +0.81 | 0.81 | 0.00 |  |
| 39 | Kayn | +0.77 | 1.22 | 0.45 |  |
| 40 | Teemo | +0.77 | 0.85 | 0.08 | blind (Blinding Dart) |
| 41 | Mordekaiser | +0.75 | 0.75 | 0.00 |  |
| 42 | Malzahar | +0.74 | 1.14 | 0.40 |  |
| 43 | Kindred | +0.74 | 0.74 | 0.00 |  |
| 44 | Jinx | +0.73 | 0.73 | 0.00 | dash stop (Flame Chompers!) |
| 45 | Hwei | +0.70 | 0.70 | 0.00 | dash stop (Grim Visage) |
| 46 | Jax | +0.67 | 0.67 | 0.00 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 47 | Viktor | +0.67 | 0.67 | 0.00 |  |
| 48 | Pantheon | +0.64 | 0.69 | 0.05 |  |
| 49 | Ahri | +0.64 | 0.64 | 0.00 |  |
| 50 | Garen | +0.64 | 0.64 | 0.00 |  |
| 51 | Vex | +0.64 | 0.64 | 0.00 |  |
| 52 | Varus | +0.62 | 0.68 | 0.06 |  |
| 53 | Veigar | +0.61 | 0.61 | 0.00 |  |
| 54 | Nilah | +0.58 | 0.58 | 0.00 |  |
| 55 | Xin Zhao | +0.56 | 0.56 | 0.00 |  |
| 56 | Lulu | +0.55 | 0.55 | 0.00 |  |
| 57 | Taric | +0.52 | 0.52 | 0.00 |  |
| 58 | Poppy | +0.50 | 0.70 | 0.20 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 59 | Nasus | +0.40 | 0.40 | 0.00 | attack speed slow (Wither) |
| 60 | Zac | +0.37 | 0.60 | 0.23 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 61 | Katarina | +0.35 | 0.55 | 0.20 |  |
| 62 | Yone | +0.34 | 0.34 | 0.00 |  |
| 63 | Aphelios | +0.32 | 0.32 | 0.00 |  |
| 64 | Malphite | +0.31 | 0.31 | 0.00 |  |
| 65 | Amumu | +0.27 | 0.27 | 0.00 |  |
| 66 | Rammus | +0.24 | 0.40 | 0.16 | attack reflect (Defensive Ball Curl) |
| 67 | Heimerdinger | +0.23 | 0.23 | 0.00 |  |
| 68 | Zeri | +0.22 | 0.22 | 0.00 |  |
| 69 | Sona | +0.21 | 0.21 | 0.00 |  |
| 70 | Shen | +0.20 | 0.65 | 0.45 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 71 | Corki | +0.20 | 0.20 | 0.00 |  |
| 72 | Renata Glasc | +0.19 | 0.19 | 0.00 |  |
| 73 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 74 | Draven | +0.18 | 0.18 | 0.00 |  |
| 75 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 76 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 77 | Ezreal | +0.16 | 0.16 | 0.00 |  |
| 78 | Gnar | +0.16 | 0.16 | 0.00 |  |
| 79 | Smolder | +0.16 | 0.16 | 0.00 |  |
| 80 | Zilean | +0.16 | 0.16 | 0.00 |  |
| 81 | Zoe | +0.16 | 0.16 | 0.00 |  |
| 82 | Jayce | +0.15 | 0.15 | 0.00 |  |
| 83 | Nidalee | +0.15 | 0.15 | 0.00 |  |
| 84 | Skarner | +0.15 | 0.15 | 0.00 |  |
| 85 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 86 | Kog'Maw | +0.14 | 0.14 | 0.00 |  |
| 87 | Lux | +0.14 | 0.14 | 0.00 |  |
| 88 | Seraphine | +0.14 | 0.14 | 0.00 |  |
| 89 | Azir | +0.13 | 0.13 | 0.00 |  |
| 90 | Orianna | +0.13 | 0.13 | 0.00 |  |
| 91 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 92 | Ziggs | +0.13 | 0.13 | 0.00 |  |
| 93 | Anivia | +0.12 | 0.12 | 0.00 |  |
| 94 | Graves | +0.12 | 0.12 | 0.00 |  |
| 95 | Zyra | +0.12 | 0.12 | 0.00 |  |
| 96 | Annie | +0.11 | 0.11 | 0.00 |  |
| 97 | Brand | +0.11 | 0.11 | 0.00 |  |
| 98 | Karma | +0.11 | 0.11 | 0.00 |  |
| 99 | Nami | +0.11 | 0.11 | 0.00 |  |
| 100 | Syndra | +0.11 | 0.11 | 0.00 |  |
| 101 | Twitch | +0.10 | 0.21 | 0.11 |  |
| 102 | K'Sante | +0.10 | 0.10 | 0.00 |  |
| 103 | Swain | +0.10 | 0.10 | 0.00 |  |
| 104 | Thresh | +0.10 | 0.10 | 0.00 |  |
| 105 | Kai'Sa | +0.08 | 0.19 | 0.11 |  |
| 106 | Urgot | +0.08 | 0.08 | 0.00 |  |
| 107 | Vayne | +0.07 | 0.21 | 0.14 |  |
| 108 | Rakan | +0.06 | 0.06 | 0.00 |  |
| 109 | Quinn | +0.05 | 0.19 | 0.14 |  |
| 110 | Senna | +0.05 | 0.16 | 0.11 |  |
| 111 | Aurelion Sol | +0.05 | 0.11 | 0.06 |  |
| 112 | Hecarim | +0.05 | 0.05 | 0.00 |  |
| 113 | Illaoi | +0.05 | 0.05 | 0.00 |  |
| 114 | Jarvan IV | +0.05 | 0.05 | 0.00 |  |
| 115 | Lillia | +0.05 | 0.05 | 0.00 |  |
| 116 | Ornn | +0.05 | 0.05 | 0.00 |  |
| 117 | Sett | +0.05 | 0.05 | 0.00 |  |
| 118 | Shyvana | +0.05 | 0.05 | 0.00 |  |
| 119 | Volibear | +0.05 | 0.05 | 0.00 |  |
| 120 | LeBlanc | +0.03 | 0.11 | 0.08 |  |
| 121 | Ivern | +0.03 | 0.10 | 0.07 |  |
| 122 | Irelia | +0.03 | 0.03 | 0.00 |  |
| 123 | Neeko | 0.00 | 0.11 | 0.11 |  |
| 124 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 125 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 126 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 127 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 128 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 129 | Darius | 0.00 | 0.00 | 0.00 |  |
| 130 | Diana | 0.00 | 0.00 | 0.00 |  |
| 131 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 132 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 133 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 134 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 135 | Leona | 0.00 | 0.00 | 0.00 |  |
| 136 | Locke | 0.00 | 0.00 | 0.00 |  |
| 137 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 138 | Rell | 0.00 | 0.00 | 0.00 |  |
| 139 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 140 | Riven | 0.00 | 0.00 | 0.00 |  |
| 141 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 142 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 143 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 144 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 145 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 146 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 147 | Nunu & Willump | -0.03 | 0.34 | 0.37 |  |
| 148 | Viego | -0.08 | 0.10 | 0.18 |  |
| 149 | Galio | -0.09 | 0.00 | 0.09 |  |
| 150 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 151 | Lucian | -0.10 | 0.18 | 0.28 |  |
| 152 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 153 | Akali | -0.11 | 0.00 | 0.11 |  |
| 154 | Miss Fortune | -0.12 | 0.16 | 0.28 |  |
| 155 | Twisted Fate | -0.14 | 0.21 | 0.35 |  |
| 156 | Talon | -0.14 | 0.00 | 0.14 |  |
| 157 | Akshan | -0.15 | 0.17 | 0.32 |  |
| 158 | Jhin | -0.15 | 0.13 | 0.28 |  |
| 159 | Vel'Koz | -0.15 | 0.13 | 0.28 |  |
| 160 | Pyke | -0.15 | 0.00 | 0.15 |  |
| 161 | Vi | -0.17 | 0.05 | 0.22 |  |
| 162 | Xerath | -0.18 | 0.13 | 0.31 |  |
| 163 | Karthus | -0.18 | 0.10 | 0.28 |  |
| 164 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 165 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 166 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 167 | Janna | -0.22 | 0.18 | 0.40 |  |
| 168 | Ryze | -0.23 | 0.12 | 0.35 |  |
| 169 | Tahm Kench | -0.26 | 0.00 | 0.26 |  |
| 170 | Fiddlesticks | -0.30 | 0.10 | 0.40 |  |
| 171 | Taliyah | -0.35 | 0.13 | 0.48 |  |
| 172 | Naafiri | -0.45 | 0.00 | 0.45 |  |
