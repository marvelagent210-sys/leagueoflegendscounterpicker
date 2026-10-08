# Counters to Zed (patch 26.20)

Every champion ranked by what its kit does against Zed's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zed's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zed` for the full ledger of a matchup, with sources.

## Top 10

### 1. Kayle (net +1.14)

- **0.90** invulnerable: Divine Judgment makes Kayle invulnerable to Zed's Death Mark. Invulnerable for 2.5 s, long enough to use ahead of Death Mark. (Kayle R Divine Judgment → Zed R Death Mark)
- **0.24** range: Kayle's basic attacks reach 500 units farther than Zed's (625 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Kayle basic attacks → Zed basic attacks)

### 2. Sivir (net +0.76)

- **0.45** spell shield: Spell Shield's spell shield blocks part of Zed's Death Mark. Spell shield for 1.5 s, long enough to use ahead of Death Mark. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the mark's application. They will not prevent Zed from initiating Death Mark against the target nor block the detonation from a mark that is already applied. (Sivir E Spell Shield → Zed R Death Mark)
- **0.31** range: Sivir's basic attacks reach 375 units farther than Zed's (500 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Sivir basic attacks → Zed basic attacks)

### 3. Xayah (net +0.73)

- **0.90** untargetable: Featherstorm makes Xayah untargetable, dodging Zed's Death Mark. Untargetable for 1.5 s, long enough to use ahead of Death Mark. (Xayah R Featherstorm → Zed R Death Mark)
- **0.26** range: Xayah's basic attacks reach 400 units farther than Zed's (525 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Xayah basic attacks → Zed basic attacks)
- Watch out: Death Mark makes Zed untargetable, dodging Xayah's Featherstorm.

### 4. Taric (net +0.61)

- **0.81** invulnerable: Cosmic Radiance makes Taric invulnerable to Zed's Death Mark. Invulnerable for 2.5 s, long enough to use ahead of Death Mark. (Taric R Cosmic Radiance → Zed R Death Mark)
- Watch out: Death Mark makes Zed untargetable, dodging Taric's Dazzle.

### 5. Kindred (net +0.60)

- **0.49** invulnerable: Lamb's Respite makes Kindred invulnerable to Zed's Death Mark. Invulnerable for ?; Death Mark lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kindred R Lamb's Respite → Zed R Death Mark)
- **0.31** range: Kindred's basic attacks reach 375 units farther than Zed's (500 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Kindred basic attacks → Zed basic attacks)
- Watch out: Death Mark makes Zed untargetable, dodging Kindred's Mounting Dread.

### 6. Vladimir (net +0.59)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zed's Death Mark. Untargetable for 2 s, long enough to use ahead of Death Mark. (Vladimir W Sanguine Pool → Zed R Death Mark)
- **0.12** range: Vladimir's basic attacks reach 325 units farther than Zed's (450 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Vladimir basic attacks → Zed basic attacks)
- Watch out: Death Mark makes Zed untargetable, dodging Vladimir's Hemoplague.

### 7. Master Yi (net +0.39)

- **0.54** untargetable: Alpha Strike makes Master Yi untargetable, dodging Zed's Death Mark. Untargetable for ?; Death Mark lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Zed R Death Mark)
- **0.06** cc immunity: Highlander makes Master Yi immune to Zed's Shadow Slash slow. Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Zed E Shadow Slash)
- **0.05** cleanse: Highlander cleanses Zed's Shadow Slash (slow) after it lands. 85 s cooldown; usable while crowd controlled. (Master Yi R Highlander → Zed E Shadow Slash)
- Watch out: Death Mark makes Zed untargetable, dodging Master Yi's Alpha Strike.

### 8. Fiora (net +0.36)

- **0.54** parry: Riposte parries Zed's Death Mark. Parry for 0.75 s; Death Mark lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Zed R Death Mark)
- **0.07** attack speed slow: Riposte cuts Zed's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Zed basic attacks)
- Watch out: Death Mark makes Zed untargetable, dodging Fiora's Riposte.

### 9. Bard (net +0.34)

- **0.90** untargetable: Tempered Fate makes Bard untargetable, dodging Zed's Death Mark. Untargetable for 2.5 s, long enough to use ahead of Death Mark. (Bard R Tempered Fate → Zed R Death Mark)
- **0.24** range: Bard's basic attacks reach 375 units farther than Zed's (500 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Bard basic attacks → Zed basic attacks)
- Watch out: Death Mark makes Zed untargetable, dodging Bard's Tempered Fate.

### 10. Aurora (net +0.31)

- **0.54** untargetable: Between Worlds makes Aurora untargetable, dodging Zed's Death Mark. Untargetable for 0.4 s; Death Mark lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Zed R Death Mark)
- **0.19** range: Aurora's basic attacks reach 425 units farther than Zed's (550 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Aurora basic attacks → Zed basic attacks)
- Watch out: Death Mark makes Zed untargetable, dodging Aurora's Between Worlds.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kayle | +1.14 | 1.14 | 0.00 |  |
| 2 | Sivir | +0.76 | 0.76 | 0.00 |  |
| 3 | Xayah | +0.73 | 1.16 | 0.43 |  |
| 4 | Taric | +0.61 | 0.81 | 0.20 |  |
| 5 | Kindred | +0.60 | 0.80 | 0.20 |  |
| 6 | Vladimir | +0.59 | 1.02 | 0.43 |  |
| 7 | Master Yi | +0.39 | 0.63 | 0.24 |  |
| 8 | Fiora | +0.36 | 0.58 | 0.22 |  |
| 9 | Bard | +0.34 | 1.14 | 0.80 |  |
| 10 | Aurora | +0.31 | 0.73 | 0.42 |  |
| 11 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 12 | Elise | +0.26 | 0.76 | 0.50 |  |
| 13 | Kai'Sa | +0.26 | 0.26 | 0.00 |  |
| 14 | Lissandra | +0.25 | 1.05 | 0.80 |  |
| 15 | Pantheon | +0.25 | 0.90 | 0.65 |  |
| 16 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 17 | Yuumi | +0.20 | 0.75 | 0.55 |  |
| 18 | Teemo | +0.20 | 0.60 | 0.40 |  |
| 19 | Singed | +0.12 | 0.54 | 0.42 | grounding (Mega Adhesive) |
| 20 | Twisted Fate | +0.11 | 0.29 | 0.18 |  |
| 21 | Shaco | +0.10 | 0.54 | 0.44 |  |
| 22 | Samira | +0.10 | 0.45 | 0.35 |  |
| 23 | Nasus | +0.08 | 0.29 | 0.21 |  |
| 24 | Gwen | +0.06 | 0.54 | 0.48 |  |
| 25 | Nidalee | +0.04 | 0.20 | 0.16 |  |
| 26 | Milio | +0.01 | 0.33 | 0.32 |  |
| 27 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 28 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 29 | Rek'Sai | -0.04 | 0.90 | 0.94 |  |
| 30 | Vayne | -0.04 | 0.29 | 0.33 |  |
| 31 | Quinn | -0.05 | 0.26 | 0.31 |  |
| 32 | Lulu | -0.06 | 0.51 | 0.57 |  |
| 33 | Kog'Maw | -0.08 | 0.18 | 0.26 |  |
| 34 | Kayn | -0.10 | 0.54 | 0.64 |  |
| 35 | Zoe | -0.12 | 0.22 | 0.34 |  |
| 36 | Xin Zhao | -0.13 | 0.90 | 1.03 |  |
| 37 | Olaf | -0.14 | 0.06 | 0.20 |  |
| 38 | Zeri | -0.16 | 0.29 | 0.45 |  |
| 39 | Zilean | -0.16 | 0.22 | 0.38 |  |
| 40 | LeBlanc | -0.16 | 0.15 | 0.31 |  |
| 41 | Shen | -0.17 | 0.29 | 0.46 |  |
| 42 | Soraka | -0.17 | 0.18 | 0.35 |  |
| 43 | Cassiopeia | -0.19 | 0.68 | 0.87 | grounding (Miasma) |
| 44 | Ekko | -0.20 | 0.54 | 0.74 |  |
| 45 | Jayce | -0.20 | 0.20 | 0.40 |  |
| 46 | Yorick | -0.20 | 0.00 | 0.20 |  |
| 47 | Mel | -0.22 | 0.42 | 0.64 |  |
| 48 | Akshan | -0.23 | 0.22 | 0.45 |  |
| 49 | Miss Fortune | -0.23 | 0.22 | 0.45 |  |
| 50 | Udyr | -0.23 | 0.10 | 0.33 |  |
| 51 | Camille | -0.25 | 0.54 | 0.79 |  |
| 52 | Nilah | -0.26 | 0.35 | 0.61 |  |
| 53 | Corki | -0.27 | 0.20 | 0.47 |  |
| 54 | Jinx | -0.28 | 0.19 | 0.47 |  |
| 55 | Ryze | -0.28 | 0.16 | 0.44 |  |
| 56 | Karma | -0.28 | 0.15 | 0.43 |  |
| 57 | Vel'Koz | -0.29 | 0.18 | 0.47 |  |
| 58 | Ezreal | -0.30 | 0.22 | 0.52 |  |
| 59 | Heimerdinger | -0.31 | 0.19 | 0.50 |  |
| 60 | Lux | -0.32 | 0.19 | 0.51 |  |
| 61 | Xerath | -0.32 | 0.18 | 0.50 |  |
| 62 | Ivern | -0.32 | 0.13 | 0.45 |  |
| 63 | Katarina | -0.32 | 0.00 | 0.32 |  |
| 64 | Yasuo | -0.34 | 0.28 | 0.62 |  |
| 65 | Kha'Zix | -0.34 | 0.00 | 0.34 |  |
| 66 | Malzahar | -0.36 | 0.21 | 0.57 |  |
| 67 | Kalista | -0.37 | 0.27 | 0.64 |  |
| 68 | Ashe | -0.37 | 0.24 | 0.61 |  |
| 69 | Graves | -0.37 | 0.16 | 0.53 |  |
| 70 | Lucian | -0.38 | 0.24 | 0.62 |  |
| 71 | Sion | -0.39 | 0.06 | 0.45 |  |
| 72 | Gnar | -0.40 | 0.22 | 0.62 |  |
| 73 | Draven | -0.41 | 0.24 | 0.65 |  |
| 74 | Rengar | -0.41 | 0.06 | 0.47 |  |
| 75 | Braum | -0.42 | 0.38 | 0.80 |  |
| 76 | Anivia | -0.42 | 0.16 | 0.58 |  |
| 77 | Karthus | -0.42 | 0.13 | 0.55 |  |
| 78 | Aatrox | -0.42 | 0.00 | 0.42 |  |
| 79 | Jax | -0.43 | 0.31 | 0.74 |  |
| 80 | Varus | -0.43 | 0.18 | 0.61 |  |
| 81 | Veigar | -0.43 | 0.16 | 0.59 |  |
| 82 | Caitlyn | -0.44 | 0.24 | 0.68 |  |
| 83 | Smolder | -0.45 | 0.22 | 0.67 |  |
| 84 | Illaoi | -0.45 | 0.00 | 0.45 |  |
| 85 | Janna | -0.46 | 0.24 | 0.70 |  |
| 86 | Nunu & Willump | -0.46 | 0.14 | 0.60 |  |
| 87 | Shyvana | -0.46 | 0.00 | 0.46 |  |
| 88 | Viktor | -0.47 | 0.22 | 0.69 |  |
| 89 | Ziggs | -0.47 | 0.18 | 0.65 |  |
| 90 | Fiddlesticks | -0.47 | 0.13 | 0.60 |  |
| 91 | Garen | -0.47 | 0.11 | 0.58 |  |
| 92 | Locke | -0.48 | 0.00 | 0.48 |  |
| 93 | Rumble | -0.48 | 0.00 | 0.48 |  |
| 94 | Talon | -0.48 | 0.00 | 0.48 |  |
| 95 | Kennen | -0.49 | 0.19 | 0.68 |  |
| 96 | Morgana | -0.51 | 0.20 | 0.71 |  |
| 97 | Kassadin | -0.51 | 0.00 | 0.51 |  |
| 98 | Maokai | -0.52 | 0.54 | 1.06 |  |
| 99 | Vex | -0.52 | 0.18 | 0.70 |  |
| 100 | Riven | -0.52 | 0.00 | 0.52 |  |
| 101 | Sona | -0.53 | 0.27 | 0.80 |  |
| 102 | Syndra | -0.53 | 0.15 | 0.68 |  |
| 103 | Alistar | -0.53 | 0.05 | 0.58 |  |
| 104 | Evelynn | -0.54 | 0.54 | 1.08 |  |
| 105 | Brand | -0.54 | 0.15 | 0.69 |  |
| 106 | Blitzcrank | -0.54 | 0.00 | 0.54 |  |
| 107 | Nocturne | -0.55 | 0.45 | 1.00 |  |
| 108 | Aurelion Sol | -0.55 | 0.15 | 0.70 |  |
| 109 | Bel'Veth | -0.56 | 0.00 | 0.56 |  |
| 110 | Wukong | -0.56 | 0.00 | 0.56 |  |
| 111 | Senna | -0.57 | 0.22 | 0.79 |  |
| 112 | Jhin | -0.57 | 0.18 | 0.75 |  |
| 113 | Renekton | -0.57 | 0.00 | 0.57 |  |
| 114 | Sylas | -0.57 | 0.00 | 0.57 |  |
| 115 | Gangplank | -0.59 | 0.06 | 0.65 |  |
| 116 | Annie | -0.60 | 0.15 | 0.75 |  |
| 117 | Hwei | -0.60 | 0.15 | 0.75 |  |
| 118 | Warwick | -0.61 | 0.04 | 0.65 |  |
| 119 | Lee Sin | -0.61 | 0.00 | 0.61 |  |
| 120 | Orianna | -0.62 | 0.18 | 0.80 |  |
| 121 | Swain | -0.63 | 0.14 | 0.77 |  |
| 122 | Thresh | -0.63 | 0.13 | 0.76 |  |
| 123 | Cho'Gath | -0.63 | 0.00 | 0.63 |  |
| 124 | Aphelios | -0.64 | 0.32 | 0.96 |  |
| 125 | Mordekaiser | -0.64 | 0.07 | 0.71 |  |
| 126 | Trundle | -0.65 | 0.00 | 0.65 |  |
| 127 | Azir | -0.66 | 0.18 | 0.84 |  |
| 128 | Darius | -0.66 | 0.00 | 0.66 |  |
| 129 | Tristana | -0.67 | 0.24 | 0.91 |  |
| 130 | Akali | -0.68 | 0.00 | 0.68 |  |
| 131 | Sett | -0.69 | 0.00 | 0.69 |  |
| 132 | Renata Glasc | -0.72 | 0.26 | 0.98 |  |
| 133 | Ahri | -0.72 | 0.15 | 0.87 |  |
| 134 | Lillia | -0.73 | 0.07 | 0.80 |  |
| 135 | Irelia | -0.73 | 0.03 | 0.76 |  |
| 136 | Skarner | -0.75 | 0.07 | 0.82 |  |
| 137 | Zyra | -0.76 | 0.16 | 0.92 |  |
| 138 | Neeko | -0.76 | 0.15 | 0.91 |  |
| 139 | Rammus | -0.77 | 0.29 | 1.06 |  |
| 140 | Urgot | -0.77 | 0.10 | 0.87 |  |
| 141 | Seraphine | -0.78 | 0.19 | 0.97 |  |
| 142 | Naafiri | -0.79 | 0.00 | 0.79 |  |
| 143 | Fizz | -0.81 | 0.00 | 0.81 |  |
| 144 | Diana | -0.82 | 0.00 | 0.82 |  |
| 145 | Nami | -0.86 | 0.15 | 1.01 |  |
| 146 | Galio | -0.87 | 0.00 | 0.87 |  |
| 147 | Leona | -0.88 | 0.00 | 0.88 |  |
| 148 | Nautilus | -0.89 | 0.00 | 0.89 |  |
| 149 | Rakan | -0.90 | 0.08 | 0.98 |  |
| 150 | Gragas | -0.90 | 0.00 | 0.90 |  |
| 151 | Malphite | -0.91 | 0.19 | 1.10 |  |
| 152 | Tahm Kench | -0.96 | 0.00 | 0.96 |  |
| 153 | Zaahen | -0.97 | 0.03 | 1.00 |  |
| 154 | Pyke | -0.97 | 0.00 | 0.97 |  |
| 155 | Poppy | -0.99 | 0.00 | 0.99 |  |
| 156 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 157 | Hecarim | -1.00 | 0.00 | 1.00 |  |
| 158 | Taliyah | -1.02 | 0.18 | 1.20 |  |
| 159 | Kled | -1.04 | 0.12 | 1.16 |  |
| 160 | Amumu | -1.04 | 0.00 | 1.04 |  |
| 161 | Viego | -1.05 | 0.06 | 1.11 |  |
| 162 | Zac | -1.05 | 0.00 | 1.05 |  |
| 163 | Qiyana | -1.06 | 0.00 | 1.06 |  |
| 164 | Rell | -1.06 | 0.00 | 1.06 |  |
| 165 | Sejuani | -1.07 | 0.00 | 1.07 |  |
| 166 | Vi | -1.07 | 0.00 | 1.07 |  |
| 167 | Briar | -1.09 | 0.00 | 1.09 |  |
| 168 | Volibear | -1.09 | 0.00 | 1.09 |  |
| 169 | Yone | -1.09 | 0.00 | 1.09 |  |
| 170 | Jarvan IV | -1.12 | 0.00 | 1.12 |  |
| 171 | K'Sante | -1.20 | 0.00 | 1.20 |  |
| 172 | Ornn | -1.27 | 0.00 | 1.27 |  |
