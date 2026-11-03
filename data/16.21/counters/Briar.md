# Counters to Briar (patch 26.21)

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
- **0.39** grounding: Mega Adhesive grounds Briar, who then can't cast Blood Frenzy. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Briar W Blood Frenzy)

### 3. Master Yi (net +1.52)

- **1.00** untargetable: Alpha Strike makes Master Yi untargetable, dodging Briar's Certain Death. Untargetable for ?; Certain Death takes 7 s to land, enough to react. (Master Yi Q Alpha Strike → Briar R Certain Death)
- **0.56** untargetable: Alpha Strike makes Master Yi untargetable, dodging Briar's Head Rush. Untargetable for ?; Head Rush takes 0.79 s to land, enough to react. (Master Yi Q Alpha Strike → Briar Q Head Rush)
- **0.25** untargetable: Alpha Strike makes Master Yi untargetable, dodging Briar's Chilling Scream. Untargetable for ?; Chilling Scream lands within 0.2 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Briar E Chilling Scream)
- Watch out: Certain Death's disrupt interrupts Master Yi's Meditate (normal channel).

### 4. Morgana (net +1.51)

- **1.00** cc immunity: Black Shield makes Morgana immune to Briar's Certain Death (disrupt, fear, slow). Immune for 5 s, long enough to use ahead of Certain Death. (Morgana E Black Shield → Briar R Certain Death)
- **0.59** cc immunity: Black Shield makes Morgana immune to Briar's Head Rush (stun). Immune for 5 s, long enough to use ahead of Head Rush. (Morgana E Black Shield → Briar Q Head Rush)
- **0.45** cc immunity: Black Shield makes Morgana immune to Briar's Chilling Scream (airborne, slow, stun). Immune for 5 s, long enough to use ahead of Chilling Scream. (Morgana E Black Shield → Briar E Chilling Scream)

### 5. Udyr (net +1.51)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Briar's Certain Death (disrupt, fear, slow). Immune for 1.5 s, long enough to use ahead of Certain Death. (Udyr E Blazing Stampede → Briar R Certain Death)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Briar's Head Rush (stun). Immune for 1.5 s, long enough to use ahead of Head Rush. (Udyr E Blazing Stampede → Briar Q Head Rush)
- **0.45** cc immunity: Blazing Stampede makes Udyr immune to Briar's Chilling Scream (airborne, slow, stun). Immune for 1.5 s, long enough to use ahead of Chilling Scream. (Udyr E Blazing Stampede → Briar E Chilling Scream)

### 6. Fizz (net +1.50)

- **1.00** untargetable: Playful makes Fizz untargetable, dodging Briar's Certain Death. Untargetable for 0.75 s; Certain Death takes 7 s to land, enough to react. (Fizz E Playful → Briar R Certain Death)
- **0.80** untargetable: Playful makes Fizz untargetable, dodging Briar's Head Rush. Untargetable for 0.75 s; Head Rush takes 0.79 s to land, enough to react. (Fizz E Playful → Briar Q Head Rush)
- **0.27** untargetable: Playful makes Fizz untargetable, dodging Briar's Chilling Scream. Untargetable for 0.75 s; Chilling Scream lands within 0.2 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Briar E Chilling Scream)

### 7. Nocturne (net +1.50)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Briar's Certain Death. Spell shield for 1.5 s, long enough to use ahead of Certain Death. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Briar R Certain Death)
- **0.68** spell shield: Shroud of Darkness's spell shield blocks Briar's Head Rush. Spell shield for 1.5 s, long enough to use ahead of Head Rush. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Briar Q Head Rush)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Briar's Chilling Scream. Spell shield for 1.5 s, long enough to use ahead of Chilling Scream. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Briar E Chilling Scream)

### 8. Vladimir (net +1.49)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Briar's Certain Death. Untargetable for 2 s, long enough to use ahead of Certain Death. (Vladimir W Sanguine Pool → Briar R Certain Death)
- **0.59** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Briar's Head Rush. Untargetable for 2 s, long enough to use ahead of Head Rush. (Vladimir W Sanguine Pool → Briar Q Head Rush)
- **0.45** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Briar's Chilling Scream. Untargetable for 2 s, long enough to use ahead of Chilling Scream. (Vladimir W Sanguine Pool → Briar E Chilling Scream)
- Watch out: Certain Death's disrupt interrupts Vladimir's Tides of Blood (charge-up).

### 9. Maokai (net +1.48)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Briar's Certain Death. Untargetable for 1.4 s; Certain Death takes 7 s to land, enough to react. (Maokai W Twisted Advance → Briar R Certain Death)
- **0.75** untargetable: Twisted Advance makes Maokai untargetable, dodging Briar's Head Rush. Untargetable for 1.4 s; Head Rush takes 0.79 s to land, enough to react. (Maokai W Twisted Advance → Briar Q Head Rush)
- **0.27** untargetable: Twisted Advance makes Maokai untargetable, dodging Briar's Chilling Scream. Untargetable for 1.4 s; Chilling Scream lands within 0.2 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Briar E Chilling Scream)

### 10. Fiora (net +1.47)

- **1.00** parry: Riposte parries Briar's Certain Death and stuns back. Parry for 0.75 s; Certain Death takes 7 s to land, enough to react. Negating Certain Death's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Briar R Certain Death)
- **0.69** parry: Riposte parries Briar's Head Rush and stuns back. Parry for 0.75 s; Head Rush takes 0.79 s to land, enough to react. Negating Head Rush's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Briar Q Head Rush)
- **0.37** parry: Riposte parries Briar's Chilling Scream and stuns back. Parry for 0.75 s; Chilling Scream lands within 0.2 s, faster than a 0.25 s reaction, so it needs prediction. Negating Chilling Scream's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Briar E Chilling Scream)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.62 | 1.62 | 0.00 |  |
| 2 | Singed | +1.61 | 1.61 | 0.00 | grounding (Mega Adhesive) |
| 3 | Master Yi | +1.52 | 1.63 | 0.11 |  |
| 4 | Morgana | +1.51 | 1.51 | 0.00 |  |
| 5 | Udyr | +1.51 | 1.51 | 0.00 |  |
| 6 | Fizz | +1.50 | 1.50 | 0.00 |  |
| 7 | Nocturne | +1.50 | 1.50 | 0.00 |  |
| 8 | Vladimir | +1.49 | 1.54 | 0.05 |  |
| 9 | Maokai | +1.48 | 1.48 | 0.00 |  |
| 10 | Fiora | +1.47 | 1.47 | 0.00 |  |
| 11 | Bard | +1.45 | 1.45 | 0.00 |  |
| 12 | Lissandra | +1.40 | 1.40 | 0.00 |  |
| 13 | Gwen | +1.37 | 1.37 | 0.00 |  |
| 14 | Xayah | +1.33 | 1.33 | 0.00 |  |
| 15 | Yuumi | +1.28 | 1.66 | 0.38 |  |
| 16 | Rek'Sai | +1.27 | 1.27 | 0.00 |  |
| 17 | Samira | +1.26 | 1.26 | 0.00 | projectile block (Blade Whirl) |
| 18 | Olaf | +1.24 | 1.24 | 0.00 |  |
| 19 | Braum | +1.23 | 1.23 | 0.00 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 20 | Mel | +1.23 | 1.23 | 0.00 | projectile block (Rebuttal) |
| 21 | Yasuo | +1.22 | 1.22 | 0.00 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 22 | Zaahen | +1.22 | 1.22 | 0.00 |  |
| 23 | Sion | +1.18 | 1.26 | 0.08 |  |
| 24 | Camille | +1.17 | 1.17 | 0.00 |  |
| 25 | Evelynn | +1.16 | 1.24 | 0.08 |  |
| 26 | Gangplank | +1.14 | 1.14 | 0.00 |  |
| 27 | Kled | +1.11 | 1.11 | 0.00 |  |
| 28 | Zed | +1.11 | 1.11 | 0.00 |  |
| 29 | Aurora | +1.10 | 1.25 | 0.15 |  |
| 30 | Milio | +1.06 | 1.06 | 0.00 |  |
| 31 | Rengar | +1.05 | 1.19 | 0.14 |  |
| 32 | Shaco | +1.04 | 1.24 | 0.20 |  |
| 33 | Alistar | +1.00 | 1.00 | 0.00 |  |
| 34 | Kalista | +0.98 | 0.98 | 0.00 |  |
| 35 | Cassiopeia | +0.87 | 0.87 | 0.00 | grounding (Miasma) |
| 36 | Kayle | +0.85 | 0.85 | 0.00 |  |
| 37 | Kayn | +0.79 | 1.24 | 0.45 |  |
| 38 | Warwick | +0.77 | 1.32 | 0.55 |  |
| 39 | Teemo | +0.77 | 0.85 | 0.08 | blind (Blinding Dart) |
| 40 | Mordekaiser | +0.75 | 0.75 | 0.00 |  |
| 41 | Malzahar | +0.74 | 1.14 | 0.40 |  |
| 42 | Jinx | +0.73 | 0.73 | 0.00 | dash stop (Flame Chompers!) |
| 43 | Hwei | +0.70 | 0.70 | 0.00 | dash stop (Grim Visage) |
| 44 | Jax | +0.67 | 0.67 | 0.00 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 45 | Viktor | +0.67 | 0.67 | 0.00 |  |
| 46 | Ahri | +0.64 | 0.64 | 0.00 |  |
| 47 | Garen | +0.64 | 0.64 | 0.00 |  |
| 48 | Vex | +0.64 | 0.64 | 0.00 |  |
| 49 | Varus | +0.62 | 0.68 | 0.06 |  |
| 50 | Veigar | +0.61 | 0.61 | 0.00 |  |
| 51 | Xin Zhao | +0.60 | 0.60 | 0.00 |  |
| 52 | Nilah | +0.58 | 0.58 | 0.00 |  |
| 53 | Lulu | +0.55 | 0.55 | 0.00 |  |
| 54 | Poppy | +0.50 | 0.70 | 0.20 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 55 | Nasus | +0.40 | 0.40 | 0.00 | attack speed slow (Wither) |
| 56 | Zac | +0.37 | 0.60 | 0.23 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 57 | Katarina | +0.35 | 0.55 | 0.20 |  |
| 58 | Yone | +0.34 | 0.34 | 0.00 |  |
| 59 | Aphelios | +0.32 | 0.32 | 0.00 |  |
| 60 | Malphite | +0.31 | 0.31 | 0.00 |  |
| 61 | Pantheon | +0.28 | 0.76 | 0.48 |  |
| 62 | Amumu | +0.27 | 0.27 | 0.00 |  |
| 63 | Rammus | +0.24 | 0.40 | 0.16 | attack reflect (Defensive Ball Curl) |
| 64 | Heimerdinger | +0.23 | 0.23 | 0.00 |  |
| 65 | Kindred | +0.23 | 0.23 | 0.00 |  |
| 66 | Zeri | +0.22 | 0.22 | 0.00 |  |
| 67 | Sona | +0.21 | 0.21 | 0.00 |  |
| 68 | Shen | +0.20 | 0.65 | 0.45 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 69 | Renata Glasc | +0.19 | 0.19 | 0.00 |  |
| 70 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 71 | Draven | +0.18 | 0.18 | 0.00 |  |
| 72 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 73 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 74 | Corki | +0.16 | 0.16 | 0.00 |  |
| 75 | Elise | +0.16 | 0.16 | 0.00 |  |
| 76 | Ezreal | +0.16 | 0.16 | 0.00 |  |
| 77 | Gnar | +0.16 | 0.16 | 0.00 |  |
| 78 | Smolder | +0.16 | 0.16 | 0.00 |  |
| 79 | Zilean | +0.16 | 0.16 | 0.00 |  |
| 80 | Zoe | +0.16 | 0.16 | 0.00 |  |
| 81 | Jayce | +0.15 | 0.15 | 0.00 |  |
| 82 | Nidalee | +0.15 | 0.15 | 0.00 |  |
| 83 | Skarner | +0.15 | 0.15 | 0.00 |  |
| 84 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 85 | Kog'Maw | +0.14 | 0.14 | 0.00 |  |
| 86 | Lux | +0.14 | 0.14 | 0.00 |  |
| 87 | Seraphine | +0.14 | 0.14 | 0.00 |  |
| 88 | Azir | +0.13 | 0.13 | 0.00 |  |
| 89 | Orianna | +0.13 | 0.13 | 0.00 |  |
| 90 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 91 | Ziggs | +0.13 | 0.13 | 0.00 |  |
| 92 | Anivia | +0.12 | 0.12 | 0.00 |  |
| 93 | Graves | +0.12 | 0.12 | 0.00 |  |
| 94 | Zyra | +0.12 | 0.12 | 0.00 |  |
| 95 | Annie | +0.11 | 0.11 | 0.00 |  |
| 96 | Brand | +0.11 | 0.11 | 0.00 |  |
| 97 | Karma | +0.11 | 0.11 | 0.00 |  |
| 98 | Nami | +0.11 | 0.11 | 0.00 |  |
| 99 | Syndra | +0.11 | 0.11 | 0.00 |  |
| 100 | Twitch | +0.10 | 0.21 | 0.11 |  |
| 101 | K'Sante | +0.10 | 0.10 | 0.00 |  |
| 102 | Swain | +0.10 | 0.10 | 0.00 |  |
| 103 | Thresh | +0.10 | 0.10 | 0.00 |  |
| 104 | Kai'Sa | +0.08 | 0.19 | 0.11 |  |
| 105 | Urgot | +0.08 | 0.08 | 0.00 |  |
| 106 | Vayne | +0.07 | 0.21 | 0.14 |  |
| 107 | Rakan | +0.06 | 0.06 | 0.00 |  |
| 108 | Quinn | +0.05 | 0.19 | 0.14 |  |
| 109 | Senna | +0.05 | 0.16 | 0.11 |  |
| 110 | Aurelion Sol | +0.05 | 0.11 | 0.06 |  |
| 111 | Hecarim | +0.05 | 0.05 | 0.00 |  |
| 112 | Illaoi | +0.05 | 0.05 | 0.00 |  |
| 113 | Jarvan IV | +0.05 | 0.05 | 0.00 |  |
| 114 | Lillia | +0.05 | 0.05 | 0.00 |  |
| 115 | Ornn | +0.05 | 0.05 | 0.00 |  |
| 116 | Sett | +0.05 | 0.05 | 0.00 |  |
| 117 | Shyvana | +0.05 | 0.05 | 0.00 |  |
| 118 | Volibear | +0.05 | 0.05 | 0.00 |  |
| 119 | LeBlanc | +0.03 | 0.11 | 0.08 |  |
| 120 | Ivern | +0.03 | 0.10 | 0.07 |  |
| 121 | Irelia | +0.03 | 0.03 | 0.00 |  |
| 122 | Neeko | 0.00 | 0.11 | 0.11 |  |
| 123 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 124 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 125 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 126 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 127 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 128 | Darius | 0.00 | 0.00 | 0.00 |  |
| 129 | Diana | 0.00 | 0.00 | 0.00 |  |
| 130 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 131 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 132 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 133 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 134 | Leona | 0.00 | 0.00 | 0.00 |  |
| 135 | Locke | 0.00 | 0.00 | 0.00 |  |
| 136 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 137 | Rell | 0.00 | 0.00 | 0.00 |  |
| 138 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 139 | Riven | 0.00 | 0.00 | 0.00 |  |
| 140 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 141 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 142 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 143 | Taric | 0.00 | 0.00 | 0.00 |  |
| 144 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 145 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 146 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 147 | Nunu & Willump | -0.03 | 0.34 | 0.37 |  |
| 148 | Viego | -0.08 | 0.10 | 0.18 |  |
| 149 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 150 | Lucian | -0.10 | 0.18 | 0.28 |  |
| 151 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 152 | Akali | -0.11 | 0.00 | 0.11 |  |
| 153 | Miss Fortune | -0.12 | 0.16 | 0.28 |  |
| 154 | Twisted Fate | -0.14 | 0.21 | 0.35 |  |
| 155 | Talon | -0.14 | 0.00 | 0.14 |  |
| 156 | Akshan | -0.15 | 0.17 | 0.32 |  |
| 157 | Jhin | -0.15 | 0.13 | 0.28 |  |
| 158 | Vel'Koz | -0.15 | 0.13 | 0.28 |  |
| 159 | Pyke | -0.15 | 0.00 | 0.15 |  |
| 160 | Vi | -0.17 | 0.05 | 0.22 |  |
| 161 | Xerath | -0.18 | 0.13 | 0.31 |  |
| 162 | Karthus | -0.18 | 0.10 | 0.28 |  |
| 163 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 164 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 165 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 166 | Janna | -0.22 | 0.18 | 0.40 |  |
| 167 | Ryze | -0.23 | 0.12 | 0.35 |  |
| 168 | Tahm Kench | -0.26 | 0.00 | 0.26 |  |
| 169 | Fiddlesticks | -0.30 | 0.10 | 0.40 |  |
| 170 | Taliyah | -0.35 | 0.13 | 0.48 |  |
| 171 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 172 | Galio | -0.55 | 0.00 | 0.55 |  |
