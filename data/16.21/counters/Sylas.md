# Counters to Sylas (patch 26.21)

Every champion ranked by what its kit does against Sylas's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Sylas's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Sylas` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +1.28)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Sylas's Abduct. Spell shield for 1.5 s, long enough to use ahead of Abduct. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sylas E Abduct)
- **0.56** spell shield: Shroud of Darkness's spell shield blocks Sylas's Kingslayer. Spell shield for 1.5 s, long enough to use ahead of Kingslayer. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sylas W Kingslayer)
- **0.10** cc immunity: Paranoia is displacement immune, ignoring Sylas's Abduct (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Sylas E Abduct)

### 2. Singed (net +1.26)

- **0.49** grounding: Mega Adhesive grounds Sylas, who then can't cast Abduct. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Sylas E Abduct)
- **0.39** grounding: Mega Adhesive grounds Sylas, who then can't cast Abscond. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Sylas E Abscond)
- **0.39** grounding: Mega Adhesive grounds Sylas, who then can't cast Kingslayer. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Sylas W Kingslayer)

### 3. Sivir (net +1.17)

- **0.73** spell shield: Spell Shield's spell shield blocks Sylas's Abduct. Spell shield for 1.5 s, long enough to use ahead of Abduct. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sylas E Abduct)
- **0.48** spell shield: Spell Shield's spell shield blocks Sylas's Kingslayer. Spell shield for 1.5 s, long enough to use ahead of Kingslayer. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sylas W Kingslayer)
- **0.20** range: Sivir's basic attacks reach 325 units farther than Sylas's (500 vs 175 attack range). Sylas closes the gap with Abduct, Abscond, Kingslayer. (Sivir basic attacks → Sylas basic attacks)

### 4. Udyr (net +1.06)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Sylas's Abduct (airborne, stun). Immune for 1.5 s, long enough to use ahead of Abduct. (Udyr E Blazing Stampede → Sylas E Abduct)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Sylas's Chain Lash (slow). Immune for 1.5 s, long enough to use ahead of Chain Lash. (Udyr E Blazing Stampede → Sylas Q Chain Lash)

### 5. Fiora (net +1.05)

- **0.88** parry: Riposte parries Sylas's Abduct and stuns back. Parry for 0.75 s; Abduct takes 0.63 s to land, enough to react. Negating Abduct's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Sylas E Abduct)
- **0.30** parry: Riposte parries Sylas's Kingslayer. Parry for 0.75 s; Kingslayer lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Sylas W Kingslayer)
- **0.07** attack speed slow: Riposte cuts Sylas's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Sylas basic attacks)

### 6. Braum (net +1.00)

- **1.00** projectile block: Unbreakable blocks Sylas's Abduct, a projectile. Unbreakable for 4 s, long enough to use ahead of Abduct. (Braum E Unbreakable → Sylas E Abduct)

### 7. Morgana (net +0.90)

- **0.78** cc immunity: Black Shield makes Morgana immune to Sylas's Abduct (airborne, stun). Immune for 5 s, long enough to use ahead of Abduct. (Morgana E Black Shield → Sylas E Abduct)
- **0.08** range: Morgana's basic attacks reach 275 units farther than Sylas's (450 vs 175 attack range). Sylas closes the gap with Abduct, Abscond, Kingslayer. (Morgana basic attacks → Sylas basic attacks)
- **0.07** cc immunity: Black Shield makes Morgana immune to Sylas's Chain Lash (slow). Immune for 5 s, long enough to use ahead of Chain Lash. (Morgana E Black Shield → Sylas Q Chain Lash)

### 8. Jinx (net +0.89)

- **0.50** dash stop: Flame Chompers!'s knockdown can stop Sylas's Abduct mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Jinx E Flame Chompers! → Sylas E Abduct)
- **0.38** dash stop: Flame Chompers!'s knockdown can stop Sylas's Abscond mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Jinx E Flame Chompers! → Sylas E Abscond)
- **0.30** dash stop: Flame Chompers!'s knockdown can stop Sylas's Kingslayer mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Jinx E Flame Chompers! → Sylas W Kingslayer)

### 9. Hwei (net +0.87)

- **0.50** dash stop: Grim Visage's knockdown can stop Sylas's Abduct mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Sylas E Abduct)
- **0.38** dash stop: Grim Visage's knockdown can stop Sylas's Abscond mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Sylas E Abscond)
- **0.30** dash stop: Grim Visage's knockdown can stop Sylas's Kingslayer mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Sylas W Kingslayer)

### 10. Cassiopeia (net +0.86)

- **0.48** grounding: Miasma grounds Sylas, who then can't cast Abduct. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Sylas E Abduct)
- **0.38** grounding: Miasma grounds Sylas, who then can't cast Abscond. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Sylas E Abscond)
- **0.38** grounding: Miasma grounds Sylas, who then can't cast Kingslayer. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Sylas W Kingslayer)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.28 | 1.28 | 0.00 |  |
| 2 | Singed | +1.26 | 1.26 | 0.00 | grounding (Mega Adhesive) |
| 3 | Sivir | +1.17 | 1.17 | 0.00 |  |
| 4 | Udyr | +1.06 | 1.06 | 0.00 |  |
| 5 | Fiora | +1.05 | 1.05 | 0.00 |  |
| 6 | Braum | +1.00 | 1.00 | 0.00 | projectile block (Unbreakable) |
| 7 | Morgana | +0.90 | 0.90 | 0.00 |  |
| 8 | Jinx | +0.89 | 0.89 | 0.00 | dash stop (Flame Chompers!) |
| 9 | Hwei | +0.87 | 0.87 | 0.00 | dash stop (Grim Visage) |
| 10 | Cassiopeia | +0.86 | 0.86 | 0.00 | grounding (Miasma) |
| 11 | Vex | +0.83 | 0.83 | 0.00 |  |
| 12 | Samira | +0.80 | 0.80 | 0.00 | projectile block (Blade Whirl) |
| 13 | Viktor | +0.80 | 0.80 | 0.00 | dash stop (Gravity Field) |
| 14 | Ahri | +0.79 | 0.79 | 0.00 | dash stop (Charm) |
| 15 | Mel | +0.76 | 0.76 | 0.00 | projectile block (Rebuttal) |
| 16 | Yasuo | +0.75 | 0.75 | 0.00 | projectile block (Wind Wall) |
| 17 | Veigar | +0.74 | 0.74 | 0.00 | dash stop (Event Horizon) |
| 18 | Fizz | +0.71 | 0.71 | 0.00 |  |
| 19 | Rengar | +0.70 | 0.84 | 0.14 |  |
| 20 | Vladimir | +0.70 | 0.78 | 0.08 |  |
| 21 | Gangplank | +0.69 | 0.69 | 0.00 |  |
| 22 | Lissandra | +0.68 | 0.68 | 0.00 |  |
| 23 | Maokai | +0.68 | 0.68 | 0.00 |  |
| 24 | Milio | +0.68 | 0.68 | 0.00 |  |
| 25 | Kayle | +0.66 | 0.66 | 0.00 |  |
| 26 | Poppy | +0.65 | 0.85 | 0.20 | dash stop (Steadfast Presence), dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 27 | Bard | +0.64 | 0.64 | 0.00 |  |
| 28 | Xayah | +0.64 | 0.64 | 0.00 |  |
| 29 | Malzahar | +0.60 | 1.00 | 0.40 |  |
| 30 | Gwen | +0.52 | 0.52 | 0.00 |  |
| 31 | Kalista | +0.52 | 0.52 | 0.00 |  |
| 32 | Kled | +0.52 | 0.52 | 0.00 |  |
| 33 | Olaf | +0.51 | 0.51 | 0.00 |  |
| 34 | Rek'Sai | +0.51 | 0.51 | 0.00 |  |
| 35 | Zaahen | +0.51 | 0.51 | 0.00 |  |
| 36 | Yone | +0.48 | 0.48 | 0.00 |  |
| 37 | Xin Zhao | +0.47 | 0.47 | 0.00 |  |
| 38 | Yuumi | +0.46 | 0.87 | 0.41 |  |
| 39 | Teemo | +0.45 | 0.53 | 0.08 |  |
| 40 | Lulu | +0.44 | 0.44 | 0.00 |  |
| 41 | Sion | +0.40 | 0.53 | 0.13 |  |
| 42 | Alistar | +0.40 | 0.40 | 0.00 |  |
| 43 | Master Yi | +0.36 | 0.59 | 0.23 |  |
| 44 | Amumu | +0.36 | 0.36 | 0.00 |  |
| 45 | Camille | +0.36 | 0.36 | 0.00 |  |
| 46 | Garen | +0.36 | 0.36 | 0.00 |  |
| 47 | Aurora | +0.35 | 0.50 | 0.15 |  |
| 48 | Varus | +0.34 | 0.45 | 0.11 |  |
| 49 | Zed | +0.34 | 0.34 | 0.00 |  |
| 50 | Zac | +0.31 | 0.78 | 0.47 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 51 | Jax | +0.31 | 0.31 | 0.00 |  |
| 52 | Malphite | +0.29 | 0.29 | 0.00 |  |
| 53 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 54 | Evelynn | +0.27 | 0.35 | 0.08 |  |
| 55 | Nilah | +0.27 | 0.27 | 0.00 |  |
| 56 | Aphelios | +0.23 | 0.23 | 0.00 |  |
| 57 | Zeri | +0.21 | 0.21 | 0.00 |  |
| 58 | Kindred | +0.20 | 0.20 | 0.00 |  |
| 59 | K'Sante | +0.20 | 0.20 | 0.00 |  |
| 60 | Sona | +0.19 | 0.19 | 0.00 |  |
| 61 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 62 | Renata Glasc | +0.18 | 0.18 | 0.00 |  |
| 63 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 64 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 65 | Pantheon | +0.17 | 0.67 | 0.50 |  |
| 66 | Draven | +0.17 | 0.17 | 0.00 |  |
| 67 | Shaco | +0.15 | 0.35 | 0.20 |  |
| 68 | Corki | +0.15 | 0.15 | 0.00 |  |
| 69 | Elise | +0.15 | 0.15 | 0.00 |  |
| 70 | Ezreal | +0.15 | 0.15 | 0.00 |  |
| 71 | Smolder | +0.15 | 0.15 | 0.00 |  |
| 72 | Zilean | +0.15 | 0.15 | 0.00 |  |
| 73 | Zoe | +0.15 | 0.15 | 0.00 |  |
| 74 | Gnar | +0.14 | 0.14 | 0.00 |  |
| 75 | Heimerdinger | +0.14 | 0.14 | 0.00 |  |
| 76 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 77 | Lux | +0.14 | 0.14 | 0.00 |  |
| 78 | Warwick | +0.13 | 0.78 | 0.65 |  |
| 79 | Jayce | +0.13 | 0.13 | 0.00 |  |
| 80 | Nidalee | +0.13 | 0.13 | 0.00 |  |
| 81 | Seraphine | +0.13 | 0.13 | 0.00 |  |
| 82 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 83 | Ziggs | +0.13 | 0.13 | 0.00 |  |
| 84 | Anivia | +0.12 | 0.12 | 0.00 |  |
| 85 | Azir | +0.12 | 0.12 | 0.00 |  |
| 86 | Kog'Maw | +0.12 | 0.12 | 0.00 |  |
| 87 | Orianna | +0.12 | 0.12 | 0.00 |  |
| 88 | Zyra | +0.12 | 0.12 | 0.00 |  |
| 89 | Annie | +0.11 | 0.11 | 0.00 |  |
| 90 | Brand | +0.10 | 0.10 | 0.00 |  |
| 91 | Graves | +0.10 | 0.10 | 0.00 |  |
| 92 | Hecarim | +0.10 | 0.10 | 0.00 |  |
| 93 | Illaoi | +0.10 | 0.10 | 0.00 |  |
| 94 | Jarvan IV | +0.10 | 0.10 | 0.00 |  |
| 95 | Karma | +0.10 | 0.10 | 0.00 |  |
| 96 | Nami | +0.10 | 0.10 | 0.00 |  |
| 97 | Ornn | +0.10 | 0.10 | 0.00 |  |
| 98 | Sett | +0.10 | 0.10 | 0.00 |  |
| 99 | Shyvana | +0.10 | 0.10 | 0.00 |  |
| 100 | Syndra | +0.10 | 0.10 | 0.00 |  |
| 101 | Volibear | +0.10 | 0.10 | 0.00 |  |
| 102 | Twitch | +0.09 | 0.20 | 0.11 |  |
| 103 | Swain | +0.09 | 0.09 | 0.00 |  |
| 104 | Thresh | +0.08 | 0.08 | 0.00 |  |
| 105 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 106 | Vayne | +0.06 | 0.20 | 0.14 |  |
| 107 | Kai'Sa | +0.06 | 0.17 | 0.11 |  |
| 108 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 109 | Urgot | +0.06 | 0.06 | 0.00 |  |
| 110 | Senna | +0.05 | 0.16 | 0.11 |  |
| 111 | Rakan | +0.05 | 0.05 | 0.00 |  |
| 112 | Katarina | +0.04 | 0.32 | 0.28 |  |
| 113 | Lillia | +0.04 | 0.04 | 0.00 |  |
| 114 | Rammus | +0.02 | 0.29 | 0.27 |  |
| 115 | Aurelion Sol | +0.02 | 0.10 | 0.08 |  |
| 116 | LeBlanc | +0.02 | 0.10 | 0.08 |  |
| 117 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 118 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 119 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 120 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 121 | Briar | 0.00 | 0.00 | 0.00 |  |
| 122 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 123 | Darius | 0.00 | 0.00 | 0.00 |  |
| 124 | Diana | 0.00 | 0.00 | 0.00 |  |
| 125 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 126 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 127 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 128 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 129 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 130 | Leona | 0.00 | 0.00 | 0.00 |  |
| 131 | Locke | 0.00 | 0.00 | 0.00 |  |
| 132 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 133 | Rell | 0.00 | 0.00 | 0.00 |  |
| 134 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 135 | Riven | 0.00 | 0.00 | 0.00 |  |
| 136 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 137 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 138 | Taric | 0.00 | 0.00 | 0.00 |  |
| 139 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 140 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 141 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 142 | Neeko | -0.01 | 0.10 | 0.11 |  |
| 143 | Quinn | -0.02 | 0.17 | 0.19 |  |
| 144 | Ivern | -0.07 | 0.08 | 0.15 |  |
| 145 | Kayn | -0.10 | 0.35 | 0.45 |  |
| 146 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 147 | Akali | -0.11 | 0.00 | 0.11 |  |
| 148 | Lucian | -0.12 | 0.16 | 0.28 |  |
| 149 | Miss Fortune | -0.13 | 0.15 | 0.28 |  |
| 150 | Talon | -0.14 | 0.00 | 0.14 |  |
| 151 | Jhin | -0.15 | 0.13 | 0.28 |  |
| 152 | Shen | -0.16 | 0.29 | 0.45 |  |
| 153 | Twisted Fate | -0.16 | 0.19 | 0.35 |  |
| 154 | Vel'Koz | -0.16 | 0.12 | 0.28 |  |
| 155 | Gragas | -0.16 | 0.00 | 0.16 |  |
| 156 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 157 | Xerath | -0.20 | 0.12 | 0.32 |  |
| 158 | Karthus | -0.20 | 0.08 | 0.28 |  |
| 159 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 160 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 161 | Janna | -0.23 | 0.17 | 0.40 |  |
| 162 | Viego | -0.23 | 0.10 | 0.33 |  |
| 163 | Ryze | -0.24 | 0.11 | 0.35 |  |
| 164 | Pyke | -0.26 | 0.00 | 0.26 |  |
| 165 | Akshan | -0.27 | 0.15 | 0.42 |  |
| 166 | Vi | -0.28 | 0.10 | 0.38 |  |
| 167 | Taliyah | -0.36 | 0.12 | 0.48 |  |
| 168 | Nunu & Willump | -0.37 | 0.12 | 0.49 |  |
| 169 | Fiddlesticks | -0.37 | 0.08 | 0.45 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Galio | -0.59 | 0.00 | 0.59 |  |
