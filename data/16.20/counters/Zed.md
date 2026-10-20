# Counters to Zed (patch 26.20)

Every champion ranked by what its kit does against Zed's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zed's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zed` for the full ledger of a matchup, with sources.

## Top 10

### 1. Kayle (net +1.02)

- **0.90** invulnerable: Divine Judgment makes Kayle invulnerable to Zed's Death Mark. Invulnerable for 2.5 s, long enough to use ahead of Death Mark. (Kayle R Divine Judgment → Zed R Death Mark)
- **0.24** range: Kayle's basic attacks reach 500 units farther than Zed's (625 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Kayle basic attacks → Zed basic attacks)
- Watch out: Death Mark makes Zed untargetable, dodging Kayle's Starfire Spellblade.

### 2. Sivir (net +0.76)

- **0.45** spell shield: Spell Shield's spell shield blocks part of Zed's Death Mark. Spell shield for 1.5 s, long enough to use ahead of Death Mark. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the mark's application. They will not prevent Zed from initiating Death Mark against the target nor block the detonation from a mark that is already applied. (Sivir E Spell Shield → Zed R Death Mark)
- **0.31** range: Sivir's basic attacks reach 375 units farther than Zed's (500 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Sivir basic attacks → Zed basic attacks)

### 3. Xayah (net +0.73)

- **0.90** untargetable: Featherstorm makes Xayah untargetable, dodging Zed's Death Mark. Untargetable for 1.5 s, long enough to use ahead of Death Mark. (Xayah R Featherstorm → Zed R Death Mark)
- **0.26** range: Xayah's basic attacks reach 400 units farther than Zed's (525 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Xayah basic attacks → Zed basic attacks)
- Watch out: Death Mark makes Zed untargetable, dodging Xayah's Featherstorm.

### 4. Vladimir (net +0.59)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zed's Death Mark. Untargetable for 2 s, long enough to use ahead of Death Mark. (Vladimir W Sanguine Pool → Zed R Death Mark)
- **0.12** range: Vladimir's basic attacks reach 325 units farther than Zed's (450 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Vladimir basic attacks → Zed basic attacks)
- Watch out: Death Mark makes Zed untargetable, dodging Vladimir's Hemoplague.

### 5. Bard (net +0.39)

- **0.90** untargetable: Tempered Fate makes Bard untargetable, dodging Zed's Death Mark. Untargetable for 2.5 s, long enough to use ahead of Death Mark. (Bard R Tempered Fate → Zed R Death Mark)
- **0.24** range: Bard's basic attacks reach 375 units farther than Zed's (500 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Bard basic attacks → Zed basic attacks)
- Watch out: Death Mark makes Zed untargetable, dodging Bard's Tempered Fate.

### 6. Master Yi (net +0.39)

- **0.54** untargetable: Alpha Strike makes Master Yi untargetable, dodging Zed's Death Mark. Untargetable for ?; Death Mark lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Zed R Death Mark)
- **0.06** cc immunity: Highlander makes Master Yi immune to Zed's Shadow Slash (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Zed E Shadow Slash)
- **0.05** cleanse: Highlander cleanses Zed's Shadow Slash (slow) after it lands. 85 s cooldown; usable while crowd controlled. (Master Yi R Highlander → Zed E Shadow Slash)
- Watch out: Death Mark makes Zed untargetable, dodging Master Yi's Alpha Strike.

### 7. Aurora (net +0.31)

- **0.54** untargetable: Between Worlds makes Aurora untargetable, dodging Zed's Death Mark. Untargetable for 0.4 s; Death Mark lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Zed R Death Mark)
- **0.19** range: Aurora's basic attacks reach 425 units farther than Zed's (550 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Aurora basic attacks → Zed basic attacks)
- Watch out: Death Mark makes Zed untargetable, dodging Aurora's Between Worlds.

### 8. Fiora (net +0.30)

- **0.54** parry: Riposte parries Zed's Death Mark. Parry for 0.75 s; Death Mark lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Zed R Death Mark)
- **0.07** attack speed slow: Riposte cuts Zed's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Zed basic attacks)
- Watch out: Death Mark makes Zed untargetable, dodging Fiora's Riposte.

### 9. Twitch (net +0.29)

- **0.29** range: Twitch's basic attacks reach 425 units farther than Zed's (550 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Twitch basic attacks → Zed basic attacks)

### 10. Kai'Sa (net +0.26)

- **0.26** range: Kai'Sa's basic attacks reach 400 units farther than Zed's (525 vs 125 attack range). Zed closes the gap with Death Mark, Living Shadow. (Kai'Sa basic attacks → Zed basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kayle | +1.02 | 1.14 | 0.12 |  |
| 2 | Sivir | +0.76 | 0.76 | 0.00 |  |
| 3 | Xayah | +0.73 | 1.16 | 0.43 |  |
| 4 | Vladimir | +0.59 | 1.02 | 0.43 |  |
| 5 | Bard | +0.39 | 1.14 | 0.75 |  |
| 6 | Master Yi | +0.39 | 0.63 | 0.24 |  |
| 7 | Aurora | +0.31 | 0.73 | 0.42 |  |
| 8 | Fiora | +0.30 | 0.58 | 0.28 |  |
| 9 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 10 | Kai'Sa | +0.26 | 0.26 | 0.00 |  |
| 11 | Lissandra | +0.25 | 1.05 | 0.80 |  |
| 12 | Pantheon | +0.25 | 0.90 | 0.65 |  |
| 13 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 14 | Yuumi | +0.20 | 0.75 | 0.55 |  |
| 15 | Teemo | +0.20 | 0.60 | 0.40 |  |
| 16 | Singed | +0.12 | 0.54 | 0.42 | grounding (Mega Adhesive) |
| 17 | Kindred | +0.11 | 0.31 | 0.20 |  |
| 18 | Twisted Fate | +0.11 | 0.29 | 0.18 |  |
| 19 | Kayn | +0.10 | 0.54 | 0.44 |  |
| 20 | Samira | +0.10 | 0.45 | 0.35 |  |
| 21 | Gwen | +0.06 | 0.54 | 0.48 |  |
| 22 | Shaco | +0.04 | 0.54 | 0.50 |  |
| 23 | Milio | +0.01 | 0.33 | 0.32 |  |
| 24 | Nasus | +0.01 | 0.29 | 0.28 |  |
| 25 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 26 | Zilean | -0.01 | 0.22 | 0.23 |  |
| 27 | Nidalee | -0.02 | 0.20 | 0.22 |  |
| 28 | Quinn | -0.05 | 0.26 | 0.31 |  |
| 29 | Rek'Sai | -0.06 | 0.90 | 0.96 |  |
| 30 | Lulu | -0.06 | 0.51 | 0.57 |  |
| 31 | Corki | -0.07 | 0.22 | 0.29 |  |
| 32 | Kog'Maw | -0.08 | 0.18 | 0.26 |  |
| 33 | Zoe | -0.12 | 0.22 | 0.34 |  |
| 34 | Dr. Mundo | -0.12 | 0.00 | 0.12 |  |
| 35 | Xin Zhao | -0.13 | 0.90 | 1.03 |  |
| 36 | Olaf | -0.14 | 0.06 | 0.20 |  |
| 37 | Zeri | -0.16 | 0.29 | 0.45 |  |
| 38 | LeBlanc | -0.16 | 0.15 | 0.31 |  |
| 39 | Soraka | -0.17 | 0.18 | 0.35 |  |
| 40 | Cassiopeia | -0.19 | 0.68 | 0.87 | grounding (Miasma) |
| 41 | Vayne | -0.19 | 0.29 | 0.48 |  |
| 42 | Taric | -0.20 | 0.00 | 0.20 |  |
| 43 | Mel | -0.22 | 0.42 | 0.64 |  |
| 44 | Shen | -0.23 | 0.29 | 0.52 |  |
| 45 | Akshan | -0.23 | 0.22 | 0.45 |  |
| 46 | Miss Fortune | -0.23 | 0.22 | 0.45 |  |
| 47 | Jayce | -0.23 | 0.20 | 0.43 |  |
| 48 | Udyr | -0.23 | 0.10 | 0.33 |  |
| 49 | Nilah | -0.26 | 0.35 | 0.61 |  |
| 50 | Camille | -0.27 | 0.54 | 0.81 |  |
| 51 | Yorick | -0.27 | 0.00 | 0.27 |  |
| 52 | Elise | -0.28 | 0.22 | 0.50 |  |
| 53 | Jinx | -0.28 | 0.19 | 0.47 |  |
| 54 | Ryze | -0.28 | 0.16 | 0.44 |  |
| 55 | Karma | -0.28 | 0.15 | 0.43 |  |
| 56 | Vel'Koz | -0.29 | 0.18 | 0.47 |  |
| 57 | Fizz | -0.30 | 0.54 | 0.84 |  |
| 58 | Heimerdinger | -0.31 | 0.19 | 0.50 |  |
| 59 | Lux | -0.32 | 0.19 | 0.51 |  |
| 60 | Xerath | -0.32 | 0.18 | 0.50 |  |
| 61 | Ivern | -0.32 | 0.13 | 0.45 |  |
| 62 | Katarina | -0.32 | 0.00 | 0.32 |  |
| 63 | Yasuo | -0.34 | 0.28 | 0.62 |  |
| 64 | Kha'Zix | -0.34 | 0.00 | 0.34 |  |
| 65 | Sylas | -0.34 | 0.00 | 0.34 |  |
| 66 | Malzahar | -0.36 | 0.21 | 0.57 |  |
| 67 | Kalista | -0.37 | 0.27 | 0.64 |  |
| 68 | Ashe | -0.37 | 0.24 | 0.61 |  |
| 69 | Graves | -0.37 | 0.16 | 0.53 |  |
| 70 | Lucian | -0.38 | 0.24 | 0.62 |  |
| 71 | Sion | -0.39 | 0.06 | 0.45 |  |
| 72 | Ezreal | -0.40 | 0.22 | 0.62 |  |
| 73 | Gnar | -0.40 | 0.22 | 0.62 |  |
| 74 | Rengar | -0.41 | 0.06 | 0.47 |  |
| 75 | Braum | -0.42 | 0.38 | 0.80 |  |
| 76 | Anivia | -0.42 | 0.16 | 0.58 |  |
| 77 | Karthus | -0.42 | 0.13 | 0.55 |  |
| 78 | Aatrox | -0.42 | 0.00 | 0.42 |  |
| 79 | Varus | -0.43 | 0.18 | 0.61 |  |
| 80 | Veigar | -0.43 | 0.16 | 0.59 |  |
| 81 | Caitlyn | -0.44 | 0.24 | 0.68 |  |
| 82 | Draven | -0.44 | 0.24 | 0.68 |  |
| 83 | Jax | -0.45 | 0.31 | 0.76 |  |
| 84 | Smolder | -0.45 | 0.22 | 0.67 |  |
| 85 | Janna | -0.46 | 0.24 | 0.70 |  |
| 86 | Nunu & Willump | -0.46 | 0.14 | 0.60 |  |
| 87 | Garen | -0.46 | 0.11 | 0.57 |  |
| 88 | Viktor | -0.47 | 0.22 | 0.69 |  |
| 89 | Ziggs | -0.47 | 0.18 | 0.65 |  |
| 90 | Fiddlesticks | -0.47 | 0.13 | 0.60 |  |
| 91 | Rumble | -0.48 | 0.00 | 0.48 |  |
| 92 | Talon | -0.48 | 0.00 | 0.48 |  |
| 93 | Kennen | -0.49 | 0.19 | 0.68 |  |
| 94 | Morgana | -0.51 | 0.20 | 0.71 |  |
| 95 | Maokai | -0.52 | 0.54 | 1.06 |  |
| 96 | Vex | -0.52 | 0.18 | 0.70 |  |
| 97 | Blitzcrank | -0.52 | 0.00 | 0.52 |  |
| 98 | Riven | -0.52 | 0.00 | 0.52 |  |
| 99 | Shyvana | -0.52 | 0.00 | 0.52 |  |
| 100 | Syndra | -0.53 | 0.15 | 0.68 |  |
| 101 | Alistar | -0.53 | 0.05 | 0.58 |  |
| 102 | Evelynn | -0.54 | 0.54 | 1.08 |  |
| 103 | Brand | -0.54 | 0.15 | 0.69 |  |
| 104 | Kassadin | -0.54 | 0.00 | 0.54 |  |
| 105 | Nocturne | -0.55 | 0.45 | 1.00 |  |
| 106 | Aurelion Sol | -0.55 | 0.15 | 0.70 |  |
| 107 | Bel'Veth | -0.56 | 0.00 | 0.56 |  |
| 108 | Senna | -0.57 | 0.22 | 0.79 |  |
| 109 | Jhin | -0.57 | 0.18 | 0.75 |  |
| 110 | Illaoi | -0.57 | 0.00 | 0.57 |  |
| 111 | Renekton | -0.57 | 0.00 | 0.57 |  |
| 112 | Sona | -0.59 | 0.27 | 0.86 |  |
| 113 | Gangplank | -0.59 | 0.06 | 0.65 |  |
| 114 | Wukong | -0.59 | 0.00 | 0.59 |  |
| 115 | Annie | -0.60 | 0.15 | 0.75 |  |
| 116 | Hwei | -0.60 | 0.15 | 0.75 |  |
| 117 | Warwick | -0.61 | 0.04 | 0.65 |  |
| 118 | Lee Sin | -0.61 | 0.00 | 0.61 |  |
| 119 | Tristana | -0.62 | 0.24 | 0.86 |  |
| 120 | Orianna | -0.62 | 0.18 | 0.80 |  |
| 121 | Swain | -0.63 | 0.14 | 0.77 |  |
| 122 | Thresh | -0.63 | 0.13 | 0.76 |  |
| 123 | Mordekaiser | -0.64 | 0.07 | 0.71 |  |
| 124 | Azir | -0.66 | 0.18 | 0.84 |  |
| 125 | Cho'Gath | -0.66 | 0.00 | 0.66 |  |
| 126 | Irelia | -0.67 | 0.03 | 0.70 |  |
| 127 | Locke | -0.67 | 0.00 | 0.67 |  |
| 128 | Aphelios | -0.68 | 0.32 | 1.00 |  |
| 129 | Akali | -0.68 | 0.00 | 0.68 |  |
| 130 | Darius | -0.69 | 0.00 | 0.69 |  |
| 131 | Trundle | -0.69 | 0.00 | 0.69 |  |
| 132 | Renata Glasc | -0.72 | 0.26 | 0.98 |  |
| 133 | Ahri | -0.72 | 0.15 | 0.87 |  |
| 134 | Sett | -0.72 | 0.00 | 0.72 |  |
| 135 | Lillia | -0.73 | 0.07 | 0.80 |  |
| 136 | Skarner | -0.75 | 0.07 | 0.82 |  |
| 137 | Zyra | -0.76 | 0.16 | 0.92 |  |
| 138 | Neeko | -0.76 | 0.15 | 0.91 |  |
| 139 | Diana | -0.76 | 0.00 | 0.76 |  |
| 140 | Rammus | -0.77 | 0.29 | 1.06 |  |
| 141 | Urgot | -0.77 | 0.10 | 0.87 |  |
| 142 | Seraphine | -0.78 | 0.19 | 0.97 |  |
| 143 | Ekko | -0.79 | 0.00 | 0.79 |  |
| 144 | Naafiri | -0.79 | 0.00 | 0.79 |  |
| 145 | Nami | -0.86 | 0.15 | 1.01 |  |
| 146 | Galio | -0.87 | 0.00 | 0.87 |  |
| 147 | Leona | -0.88 | 0.00 | 0.88 |  |
| 148 | Nautilus | -0.89 | 0.00 | 0.89 |  |
| 149 | Rakan | -0.90 | 0.08 | 0.98 |  |
| 150 | Gragas | -0.93 | 0.00 | 0.93 |  |
| 151 | Malphite | -0.94 | 0.19 | 1.13 |  |
| 152 | Tahm Kench | -0.96 | 0.00 | 0.96 |  |
| 153 | Zaahen | -0.97 | 0.03 | 1.00 |  |
| 154 | Pyke | -0.97 | 0.00 | 0.97 |  |
| 155 | Poppy | -0.99 | 0.00 | 0.99 |  |
| 156 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 157 | Taliyah | -1.02 | 0.18 | 1.20 |  |
| 158 | Kled | -1.04 | 0.12 | 1.16 |  |
| 159 | Amumu | -1.04 | 0.00 | 1.04 |  |
| 160 | Viego | -1.05 | 0.06 | 1.11 |  |
| 161 | Zac | -1.05 | 0.00 | 1.05 |  |
| 162 | Qiyana | -1.06 | 0.00 | 1.06 |  |
| 163 | Rell | -1.06 | 0.00 | 1.06 |  |
| 164 | Sejuani | -1.07 | 0.00 | 1.07 |  |
| 165 | Volibear | -1.09 | 0.00 | 1.09 |  |
| 166 | Yone | -1.09 | 0.00 | 1.09 |  |
| 167 | Vi | -1.10 | 0.00 | 1.10 |  |
| 168 | Briar | -1.11 | 0.00 | 1.11 |  |
| 169 | Hecarim | -1.12 | 0.00 | 1.12 |  |
| 170 | Jarvan IV | -1.12 | 0.00 | 1.12 |  |
| 171 | K'Sante | -1.20 | 0.00 | 1.20 |  |
| 172 | Ornn | -1.27 | 0.00 | 1.27 |  |
