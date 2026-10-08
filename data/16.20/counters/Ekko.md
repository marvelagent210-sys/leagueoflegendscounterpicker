# Counters to Ekko (patch 26.20)

Every champion ranked by what its kit does against Ekko's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ekko's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ekko` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.41)

- **0.90** spell shield: Spell Shield's spell shield blocks Ekko's Chronobreak. Spell shield for 1.5 s, long enough to use ahead of Chronobreak. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ekko R Chronobreak)
- **0.39** spell shield: Spell Shield's spell shield blocks Ekko's Parallel Convergence. Spell shield for 1.5 s, long enough to use ahead of Parallel Convergence. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ekko W Parallel Convergence)
- **0.31** range: Sivir's basic attacks reach 375 units farther than Ekko's (500 vs 125 attack range). Ekko closes the gap with Phase Dive, Chronobreak. (Sivir basic attacks → Ekko basic attacks)

### 2. Kayle (net +1.00)

- **0.70** invulnerable: Divine Judgment makes Kayle invulnerable to Ekko's Chronobreak. Invulnerable for 2.5 s, long enough to use ahead of Chronobreak. (Kayle R Divine Judgment → Ekko R Chronobreak)
- **0.24** range: Kayle's basic attacks reach 500 units farther than Ekko's (625 vs 125 attack range). Ekko closes the gap with Phase Dive, Chronobreak. (Kayle basic attacks → Ekko basic attacks)
- **0.11** invulnerable: Divine Judgment makes Kayle invulnerable to Ekko's Parallel Convergence (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Parallel Convergence. (Kayle R Divine Judgment → Ekko W Parallel Convergence)

### 3. Fiora (net +0.91)

- **0.90** parry: Riposte parries Ekko's Chronobreak. Parry for 0.75 s; Chronobreak takes 0.5 s to land, enough to react. (Fiora W Riposte → Ekko R Chronobreak)
- **0.52** parry: Riposte parries Ekko's Parallel Convergence and stuns back. Parry for 0.75 s; Parallel Convergence takes 0.25 s to land, enough to react. Negating Parallel Convergence's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ekko W Parallel Convergence)
- **0.08** attack speed slow: Riposte cuts Ekko's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Ekko basic attacks)
- Watch out: Chronobreak makes Ekko untargetable, dodging Fiora's Riposte.

### 4. Master Yi (net +0.88)

- **0.90** untargetable: Alpha Strike makes Master Yi untargetable, dodging Ekko's Chronobreak. Untargetable for ?; Chronobreak takes 0.5 s to land, enough to react. (Master Yi Q Alpha Strike → Ekko R Chronobreak)
- **0.39** untargetable: Alpha Strike makes Master Yi untargetable, dodging Ekko's Parallel Convergence. Untargetable for ?; Parallel Convergence takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Ekko W Parallel Convergence)
- **0.05** cc immunity: Highlander makes Master Yi immune to Ekko's Timewinder slow. Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Ekko Q Timewinder)
- Watch out: Chronobreak makes Ekko untargetable, dodging Master Yi's Alpha Strike.

### 5. Vladimir (net +0.80)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ekko's Chronobreak. Untargetable for 2 s, long enough to use ahead of Chronobreak. (Vladimir W Sanguine Pool → Ekko R Chronobreak)
- **0.42** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ekko's Parallel Convergence. Untargetable for 2 s, long enough to use ahead of Parallel Convergence. (Vladimir W Sanguine Pool → Ekko W Parallel Convergence)
- **0.12** range: Vladimir's basic attacks reach 325 units farther than Ekko's (450 vs 125 attack range). Ekko closes the gap with Phase Dive, Chronobreak. (Vladimir basic attacks → Ekko basic attacks)
- Watch out: Chronobreak makes Ekko untargetable, dodging Vladimir's Hemoplague.

### 6. Yuumi (net +0.79)

- **0.90** untargetable: You and Me! makes Yuumi untargetable, dodging Ekko's Chronobreak. Untargetable for ?; Chronobreak takes 0.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ekko R Chronobreak)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Ekko's Parallel Convergence. Untargetable for ?; Parallel Convergence takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ekko W Parallel Convergence)
- **0.21** range: Yuumi's basic attacks reach 300 units farther than Ekko's (425 vs 125 attack range). Ekko closes the gap with Phase Dive, Chronobreak. (Yuumi basic attacks → Ekko basic attacks)
- Watch out: Chronobreak makes Ekko untargetable, dodging Yuumi's Final Chapter.

### 7. Elise (net +0.77)

- **0.90** untargetable: Rappel makes Elise untargetable, dodging Ekko's Chronobreak. Untargetable for 0.6 s; Chronobreak takes 0.5 s to land, enough to react. (Elise E Rappel → Ekko R Chronobreak)
- **0.39** untargetable: Rappel makes Elise untargetable, dodging Ekko's Parallel Convergence. Untargetable for 0.6 s; Parallel Convergence takes 0.25 s to land, enough to react. (Elise E Rappel → Ekko W Parallel Convergence)
- **0.22** range: Elise's basic attacks reach 425 units farther than Ekko's (550 vs 125 attack range). Ekko closes the gap with Phase Dive, Chronobreak. (Elise basic attacks → Ekko basic attacks)
- Watch out: Chronobreak makes Ekko untargetable, dodging Elise's Cocoon.

### 8. Kindred (net +0.74)

- **0.59** invulnerable: Lamb's Respite makes Kindred invulnerable to Ekko's Chronobreak. Invulnerable for ?; Chronobreak takes 0.5 s to land, enough to react. (Kindred R Lamb's Respite → Ekko R Chronobreak)
- **0.31** range: Kindred's basic attacks reach 375 units farther than Ekko's (500 vs 125 attack range). Ekko closes the gap with Phase Dive, Chronobreak. (Kindred basic attacks → Ekko basic attacks)
- **0.11** invulnerable: Lamb's Respite makes Kindred invulnerable to Ekko's Parallel Convergence (its crowd control still applies). Invulnerable for ?; Parallel Convergence takes 0.25 s to land, enough to react. (Kindred R Lamb's Respite → Ekko W Parallel Convergence)
- Watch out: Chronobreak makes Ekko untargetable, dodging Kindred's Mounting Dread.

### 9. Singed (net +0.70)

- **0.44** grounding: Mega Adhesive grounds Ekko, who then can't cast Chronobreak. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Ekko R Chronobreak)
- **0.39** grounding: Mega Adhesive grounds Ekko, who then can't cast Phase Dive. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Ekko E Phase Dive)
- **0.36** anti-heal: Insanity Potion's Grievous Wounds cuts Ekko's healing from Chronobreak by 40%. (Singed R Insanity Potion → Ekko R Chronobreak)
- Watch out: Chronobreak makes Ekko untargetable, dodging Singed's Fling.

### 10. Xayah (net +0.56)

- **0.63** untargetable: Featherstorm makes Xayah untargetable, dodging Ekko's Chronobreak. Untargetable for 1.5 s, long enough to use ahead of Chronobreak. (Xayah R Featherstorm → Ekko R Chronobreak)
- **0.26** range: Xayah's basic attacks reach 400 units farther than Ekko's (525 vs 125 attack range). Ekko closes the gap with Phase Dive, Chronobreak. (Xayah basic attacks → Ekko basic attacks)
- **0.22** untargetable: Featherstorm makes Xayah untargetable, dodging Ekko's Parallel Convergence. Untargetable for 1.5 s, long enough to use ahead of Parallel Convergence. (Xayah R Featherstorm → Ekko W Parallel Convergence)
- Watch out: Chronobreak makes Ekko untargetable, dodging Xayah's Featherstorm.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.41 | 1.41 | 0.00 |  |
| 2 | Kayle | +1.00 | 1.00 | 0.00 |  |
| 3 | Fiora | +0.91 | 1.18 | 0.27 |  |
| 4 | Master Yi | +0.88 | 1.18 | 0.30 |  |
| 5 | Vladimir | +0.80 | 1.23 | 0.43 |  |
| 6 | Yuumi | +0.79 | 1.34 | 0.55 |  |
| 7 | Elise | +0.77 | 1.32 | 0.55 |  |
| 8 | Kindred | +0.74 | 0.96 | 0.22 |  |
| 9 | Singed | +0.70 | 1.18 | 0.48 | grounding (Mega Adhesive) |
| 10 | Xayah | +0.56 | 1.00 | 0.44 |  |
| 11 | Gwen | +0.55 | 1.10 | 0.55 |  |
| 12 | Aurora | +0.51 | 0.93 | 0.42 |  |
| 13 | Taric | +0.42 | 0.65 | 0.23 |  |
| 14 | Pantheon | +0.34 | 1.00 | 0.66 |  |
| 15 | Shaco | +0.30 | 0.82 | 0.52 |  |
| 16 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 17 | Kai'Sa | +0.26 | 0.26 | 0.00 |  |
| 18 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 19 | Zed | +0.20 | 0.74 | 0.54 |  |
| 20 | Bard | +0.15 | 1.06 | 0.91 |  |
| 21 | Teemo | +0.15 | 0.65 | 0.50 | blind (Blinding Dart) |
| 22 | Udyr | +0.15 | 0.51 | 0.36 |  |
| 23 | Milio | +0.14 | 0.50 | 0.36 |  |
| 24 | Nocturne | +0.12 | 1.13 | 1.01 |  |
| 25 | Lissandra | +0.10 | 1.01 | 0.91 |  |
| 26 | Kayn | +0.10 | 0.82 | 0.72 |  |
| 27 | Nasus | +0.09 | 0.33 | 0.24 |  |
| 28 | Twisted Fate | +0.09 | 0.29 | 0.20 |  |
| 29 | Samira | +0.06 | 0.47 | 0.41 |  |
| 30 | Olaf | +0.04 | 0.26 | 0.22 |  |
| 31 | Nidalee | +0.03 | 0.20 | 0.17 |  |
| 32 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 33 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 34 | Maokai | -0.01 | 1.13 | 1.14 |  |
| 35 | Malzahar | -0.06 | 0.58 | 0.64 |  |
| 36 | Katarina | -0.06 | 0.36 | 0.42 |  |
| 37 | Quinn | -0.08 | 0.26 | 0.34 |  |
| 38 | Camille | -0.09 | 0.77 | 0.86 |  |
| 39 | Vayne | -0.09 | 0.29 | 0.38 |  |
| 40 | Kog'Maw | -0.09 | 0.18 | 0.27 |  |
| 41 | Lulu | -0.11 | 0.54 | 0.65 |  |
| 42 | Jinx | -0.11 | 0.52 | 0.63 |  |
| 43 | Rengar | -0.13 | 0.40 | 0.53 |  |
| 44 | Morgana | -0.14 | 0.59 | 0.73 |  |
| 45 | Zoe | -0.18 | 0.22 | 0.40 |  |
| 46 | Shen | -0.19 | 0.33 | 0.52 |  |
| 47 | LeBlanc | -0.20 | 0.15 | 0.35 |  |
| 48 | Zilean | -0.21 | 0.22 | 0.43 |  |
| 49 | Cassiopeia | -0.22 | 0.77 | 0.99 | grounding (Miasma) |
| 50 | Miss Fortune | -0.23 | 0.22 | 0.45 |  |
| 51 | Soraka | -0.23 | 0.18 | 0.41 |  |
| 52 | Yorick | -0.23 | 0.00 | 0.23 |  |
| 53 | Rek'Sai | -0.24 | 0.82 | 1.06 |  |
| 54 | Kalista | -0.24 | 0.41 | 0.65 |  |
| 55 | Vex | -0.25 | 0.45 | 0.70 |  |
| 56 | Jayce | -0.25 | 0.20 | 0.45 |  |
| 57 | Varus | -0.26 | 0.54 | 0.80 |  |
| 58 | Gangplank | -0.26 | 0.39 | 0.65 |  |
| 59 | Zeri | -0.26 | 0.29 | 0.55 |  |
| 60 | Viktor | -0.29 | 0.51 | 0.80 |  |
| 61 | Mel | -0.30 | 0.43 | 0.73 |  |
| 62 | Veigar | -0.31 | 0.44 | 0.75 |  |
| 63 | Sion | -0.31 | 0.27 | 0.58 |  |
| 64 | Nilah | -0.32 | 0.38 | 0.70 |  |
| 65 | Ryze | -0.32 | 0.16 | 0.48 |  |
| 66 | Akshan | -0.33 | 0.22 | 0.55 |  |
| 67 | Ezreal | -0.33 | 0.22 | 0.55 |  |
| 68 | Corki | -0.33 | 0.20 | 0.53 |  |
| 69 | Karma | -0.33 | 0.15 | 0.48 |  |
| 70 | Heimerdinger | -0.34 | 0.21 | 0.55 |  |
| 71 | Vel'Koz | -0.35 | 0.18 | 0.53 |  |
| 72 | Xerath | -0.36 | 0.18 | 0.54 |  |
| 73 | Xin Zhao | -0.37 | 0.69 | 1.06 |  |
| 74 | Hwei | -0.37 | 0.48 | 0.85 |  |
| 75 | Kha'Zix | -0.37 | 0.00 | 0.37 |  |
| 76 | Braum | -0.38 | 0.42 | 0.80 | projectile block (Unbreakable) |
| 77 | Ivern | -0.38 | 0.13 | 0.51 |  |
| 78 | Garen | -0.39 | 0.27 | 0.66 |  |
| 79 | Evelynn | -0.41 | 0.82 | 1.23 |  |
| 80 | Lucian | -0.42 | 0.24 | 0.66 |  |
| 81 | Karthus | -0.42 | 0.13 | 0.55 |  |
| 82 | Poppy | -0.44 | 0.57 | 1.01 | dash stop (Steadfast Presence) |
| 83 | Ahri | -0.44 | 0.45 | 0.89 |  |
| 84 | Jax | -0.44 | 0.35 | 0.79 |  |
| 85 | Warwick | -0.44 | 0.33 | 0.77 |  |
| 86 | Yasuo | -0.44 | 0.29 | 0.73 |  |
| 87 | Smolder | -0.45 | 0.22 | 0.67 |  |
| 88 | Aatrox | -0.45 | 0.00 | 0.45 |  |
| 89 | Alistar | -0.46 | 0.20 | 0.66 |  |
| 90 | Lux | -0.47 | 0.19 | 0.66 |  |
| 91 | Caitlyn | -0.49 | 0.24 | 0.73 |  |
| 92 | Janna | -0.49 | 0.24 | 0.73 |  |
| 93 | Draven | -0.50 | 0.24 | 0.74 |  |
| 94 | Kennen | -0.51 | 0.19 | 0.70 |  |
| 95 | Anivia | -0.51 | 0.16 | 0.67 |  |
| 96 | Nunu & Willump | -0.52 | 0.17 | 0.69 |  |
| 97 | Shyvana | -0.52 | 0.00 | 0.52 |  |
| 98 | Sona | -0.53 | 0.27 | 0.80 |  |
| 99 | Kassadin | -0.53 | 0.00 | 0.53 |  |
| 100 | Graves | -0.54 | 0.16 | 0.70 |  |
| 101 | Illaoi | -0.55 | 0.00 | 0.55 |  |
| 102 | Locke | -0.55 | 0.00 | 0.55 |  |
| 103 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 104 | Talon | -0.55 | 0.00 | 0.55 |  |
| 105 | Ashe | -0.56 | 0.24 | 0.80 |  |
| 106 | Gnar | -0.56 | 0.22 | 0.78 |  |
| 107 | Fiddlesticks | -0.56 | 0.13 | 0.69 |  |
| 108 | Aurelion Sol | -0.58 | 0.15 | 0.73 |  |
| 109 | Riven | -0.58 | 0.00 | 0.58 |  |
| 110 | Bel'Veth | -0.59 | 0.00 | 0.59 |  |
| 111 | Senna | -0.60 | 0.22 | 0.82 |  |
| 112 | Ziggs | -0.60 | 0.18 | 0.78 |  |
| 113 | Wukong | -0.60 | 0.00 | 0.60 |  |
| 114 | Brand | -0.62 | 0.15 | 0.77 |  |
| 115 | Jhin | -0.63 | 0.18 | 0.81 |  |
| 116 | Annie | -0.63 | 0.15 | 0.78 |  |
| 117 | Blitzcrank | -0.63 | 0.00 | 0.63 |  |
| 118 | Aphelios | -0.64 | 0.34 | 0.98 |  |
| 119 | Syndra | -0.64 | 0.15 | 0.79 |  |
| 120 | Sylas | -0.64 | 0.00 | 0.64 |  |
| 121 | Mordekaiser | -0.65 | 0.08 | 0.73 |  |
| 122 | Swain | -0.66 | 0.14 | 0.80 |  |
| 123 | Renekton | -0.66 | 0.00 | 0.66 |  |
| 124 | Tristana | -0.69 | 0.24 | 0.93 |  |
| 125 | Azir | -0.73 | 0.18 | 0.91 |  |
| 126 | Thresh | -0.73 | 0.13 | 0.86 |  |
| 127 | Lillia | -0.73 | 0.07 | 0.80 |  |
| 128 | Orianna | -0.74 | 0.18 | 0.92 |  |
| 129 | Renata Glasc | -0.75 | 0.26 | 1.01 |  |
| 130 | Darius | -0.76 | 0.00 | 0.76 |  |
| 131 | Trundle | -0.76 | 0.00 | 0.76 |  |
| 132 | Zac | -0.77 | 0.37 | 1.14 |  |
| 133 | Cho'Gath | -0.77 | 0.00 | 0.77 |  |
| 134 | Sett | -0.78 | 0.00 | 0.78 |  |
| 135 | Seraphine | -0.80 | 0.19 | 0.99 |  |
| 136 | Skarner | -0.80 | 0.09 | 0.89 |  |
| 137 | Irelia | -0.80 | 0.03 | 0.83 |  |
| 138 | Lee Sin | -0.80 | 0.00 | 0.80 |  |
| 139 | Rammus | -0.82 | 0.32 | 1.14 |  |
| 140 | Zyra | -0.83 | 0.16 | 0.99 |  |
| 141 | Neeko | -0.83 | 0.15 | 0.98 |  |
| 142 | Kled | -0.85 | 0.32 | 1.17 |  |
| 143 | Zaahen | -0.88 | 0.26 | 1.14 |  |
| 144 | Nami | -0.88 | 0.15 | 1.03 |  |
| 145 | Amumu | -0.89 | 0.18 | 1.07 |  |
| 146 | Malphite | -0.90 | 0.21 | 1.11 |  |
| 147 | Akali | -0.90 | 0.00 | 0.90 |  |
| 148 | Galio | -0.90 | 0.00 | 0.90 |  |
| 149 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 150 | Fizz | -0.92 | 0.00 | 0.92 |  |
| 151 | Urgot | -0.94 | 0.10 | 1.04 |  |
| 152 | Diana | -0.94 | 0.00 | 0.94 |  |
| 153 | Rakan | -0.98 | 0.08 | 1.06 |  |
| 154 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 155 | Hecarim | -1.00 | 0.00 | 1.00 |  |
| 156 | Nautilus | -1.01 | 0.00 | 1.01 |  |
| 157 | Yone | -1.05 | 0.18 | 1.23 |  |
| 158 | Taliyah | -1.06 | 0.18 | 1.24 |  |
| 159 | Gragas | -1.07 | 0.00 | 1.07 |  |
| 160 | Leona | -1.08 | 0.00 | 1.08 |  |
| 161 | Qiyana | -1.09 | 0.00 | 1.09 |  |
| 162 | Tahm Kench | -1.09 | 0.00 | 1.09 |  |
| 163 | Volibear | -1.11 | 0.00 | 1.11 |  |
| 164 | Vi | -1.14 | 0.00 | 1.14 |  |
| 165 | Sejuani | -1.15 | 0.00 | 1.15 |  |
| 166 | Pyke | -1.16 | 0.00 | 1.16 |  |
| 167 | Viego | -1.19 | 0.06 | 1.25 |  |
| 168 | Jarvan IV | -1.19 | 0.00 | 1.19 |  |
| 169 | Rell | -1.20 | 0.00 | 1.20 |  |
| 170 | Briar | -1.25 | 0.00 | 1.25 |  |
| 171 | Ornn | -1.31 | 0.00 | 1.31 |  |
| 172 | K'Sante | -1.35 | 0.00 | 1.35 |  |
