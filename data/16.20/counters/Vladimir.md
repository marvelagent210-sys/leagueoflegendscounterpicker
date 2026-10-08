# Counters to Vladimir (patch 26.20)

Every champion ranked by what its kit does against Vladimir's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Vladimir's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Vladimir` for the full ledger of a matchup, with sources.

## Top 10

### 1. Kayle (net +0.97)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Vladimir's Hemoplague. Invulnerable for 2.5 s, long enough to use ahead of Hemoplague. (Kayle R Divine Judgment → Vladimir R Hemoplague)
- **0.32** range: Kayle's basic attacks reach 175 units farther than Vladimir's (625 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Kayle basic attacks → Vladimir basic attacks)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Vladimir's Transfusion. Invulnerable for 2.5 s, long enough to use ahead of Transfusion. (Kayle R Divine Judgment → Vladimir Q Transfusion)

### 2. Sivir (net +0.41)

- **0.28** spell shield: Spell Shield's spell shield blocks part of Vladimir's Hemoplague. Spell shield for 1.5 s, long enough to use ahead of Hemoplague. A spell shield blocks only the first enemy ability that reaches it. Spell shield does not negate the detonation. (Sivir E Spell Shield → Vladimir R Hemoplague)
- **0.25** spell shield: Spell Shield's spell shield blocks Vladimir's Transfusion. Spell shield for 1.5 s, long enough to use ahead of Transfusion. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Vladimir Q Transfusion)

### 3. Yunara (net +0.22)

- **0.22** range: Yunara's basic attacks reach 125 units farther than Vladimir's (575 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Yunara basic attacks → Vladimir basic attacks)

### 4. Twitch (net +0.21)

- **0.21** range: Twitch's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Twitch basic attacks → Vladimir basic attacks)

### 5. Kai'Sa (net +0.14)

- **0.14** range: Kai'Sa's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Kai'Sa basic attacks → Vladimir basic attacks)

### 6. Kindred (net +0.11)

- **0.33** invulnerable: Lamb's Respite makes Kindred invulnerable to Vladimir's Hemoplague. Invulnerable for ?; Hemoplague lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kindred R Lamb's Respite → Vladimir R Hemoplague)
- **0.19** invulnerable: Lamb's Respite makes Kindred invulnerable to Vladimir's Transfusion. Invulnerable for ?; Transfusion takes 0.25 s to land, enough to react. (Kindred R Lamb's Respite → Vladimir Q Transfusion)
- Watch out: Sanguine Pool makes Vladimir untargetable, dodging Kindred's Mounting Dread.

### 7. Yuumi (net +0.07)

- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Vladimir's Transfusion. Untargetable for ?; Transfusion takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Vladimir Q Transfusion)
- **0.33** untargetable: You and Me! makes Yuumi untargetable, dodging Vladimir's Hemoplague. Untargetable for ?; Hemoplague lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Vladimir R Hemoplague)
- Watch out: Sanguine Pool makes Vladimir untargetable, dodging Yuumi's Final Chapter.

### 8. Xayah (net -0.01)

- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Vladimir's Hemoplague. Untargetable for 1.5 s, long enough to use ahead of Hemoplague. (Xayah R Featherstorm → Vladimir R Hemoplague)
- **0.19** untargetable: Featherstorm makes Xayah untargetable, dodging Vladimir's Transfusion. Untargetable for 1.5 s, long enough to use ahead of Transfusion. (Xayah R Featherstorm → Vladimir Q Transfusion)
- **0.14** range: Xayah's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Xayah basic attacks → Vladimir basic attacks)
- Watch out: Sanguine Pool makes Vladimir untargetable, dodging Xayah's Featherstorm.

### 9. Elise (net -0.10)

- **0.33** untargetable: Rappel makes Elise untargetable, dodging Vladimir's Hemoplague. Untargetable for 0.6 s; Hemoplague lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Vladimir R Hemoplague)
- **0.25** untargetable: Rappel makes Elise untargetable, dodging Vladimir's Transfusion. Untargetable for 0.6 s; Transfusion takes 0.25 s to land, enough to react. (Elise E Rappel → Vladimir Q Transfusion)
- **0.16** range: Elise's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Elise basic attacks → Vladimir basic attacks)
- Watch out: Sanguine Pool makes Vladimir untargetable, dodging Elise's Cocoon.

### 10. Aurora (net -0.13)

- **0.33** untargetable: Between Worlds makes Aurora untargetable, dodging Vladimir's Hemoplague. Untargetable for 0.4 s; Hemoplague lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Vladimir R Hemoplague)
- **0.19** untargetable: Between Worlds makes Aurora untargetable, dodging Vladimir's Transfusion. Untargetable for 0.4 s; Transfusion takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Vladimir Q Transfusion)
- **0.14** range: Aurora's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Aurora basic attacks → Vladimir basic attacks)
- Watch out: Sanguine Pool makes Vladimir untargetable, dodging Aurora's Between Worlds.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kayle | +0.97 | 0.97 | 0.00 |  |
| 2 | Sivir | +0.41 | 0.41 | 0.00 |  |
| 3 | Yunara | +0.22 | 0.22 | 0.00 |  |
| 4 | Twitch | +0.21 | 0.21 | 0.00 |  |
| 5 | Kai'Sa | +0.14 | 0.14 | 0.00 |  |
| 6 | Kindred | +0.11 | 0.43 | 0.32 |  |
| 7 | Yuumi | +0.07 | 0.62 | 0.55 |  |
| 8 | Xayah | -0.01 | 0.79 | 0.80 |  |
| 9 | Elise | -0.10 | 0.70 | 0.80 |  |
| 10 | Aurora | -0.13 | 0.57 | 0.70 |  |
| 11 | Fiora | -0.14 | 0.47 | 0.61 |  |
| 12 | Tryndamere | -0.15 | 0.00 | 0.15 |  |
| 13 | Twisted Fate | -0.18 | 0.26 | 0.44 |  |
| 14 | Taric | -0.21 | 0.72 | 0.93 |  |
| 15 | Gwen | -0.25 | 0.46 | 0.71 |  |
| 16 | Milio | -0.25 | 0.29 | 0.54 |  |
| 17 | Varus | -0.27 | 0.53 | 0.80 |  |
| 18 | Nidalee | -0.27 | 0.11 | 0.38 |  |
| 19 | Lissandra | -0.28 | 0.77 | 1.05 |  |
| 20 | Kog'Maw | -0.28 | 0.00 | 0.28 |  |
| 21 | Bard | -0.29 | 0.66 | 0.95 |  |
| 22 | Vayne | -0.32 | 0.28 | 0.60 |  |
| 23 | Zeri | -0.33 | 0.22 | 0.55 |  |
| 24 | Dr. Mundo | -0.36 | 0.00 | 0.36 |  |
| 25 | Braum | -0.39 | 0.59 | 0.98 |  |
| 26 | Ezreal | -0.39 | 0.16 | 0.55 |  |
| 27 | Master Yi | -0.40 | 0.55 | 0.95 |  |
| 28 | Teemo | -0.41 | 0.29 | 0.70 |  |
| 29 | Samira | -0.41 | 0.26 | 0.67 |  |
| 30 | Zoe | -0.42 | 0.23 | 0.65 |  |
| 31 | Singed | -0.43 | 0.62 | 1.05 |  |
| 32 | Mel | -0.43 | 0.38 | 0.81 |  |
| 33 | LeBlanc | -0.43 | 0.08 | 0.51 |  |
| 34 | Shaco | -0.45 | 0.50 | 0.95 |  |
| 35 | Caitlyn | -0.46 | 0.36 | 0.82 |  |
| 36 | Zilean | -0.46 | 0.25 | 0.71 |  |
| 37 | Ashe | -0.48 | 0.32 | 0.80 |  |
| 38 | Rek'Sai | -0.49 | 0.76 | 1.25 |  |
| 39 | Soraka | -0.50 | 0.20 | 0.70 |  |
| 40 | Vex | -0.50 | 0.20 | 0.70 |  |
| 41 | Tristana | -0.51 | 0.50 | 1.01 |  |
| 42 | Nasus | -0.51 | 0.22 | 0.73 |  |
| 43 | Katarina | -0.52 | 0.36 | 0.88 |  |
| 44 | Miss Fortune | -0.53 | 0.16 | 0.69 |  |
| 45 | Sona | -0.54 | 0.26 | 0.80 |  |
| 46 | Smolder | -0.54 | 0.16 | 0.70 |  |
| 47 | Ryze | -0.54 | 0.12 | 0.66 |  |
| 48 | Kennen | -0.55 | 0.22 | 0.77 |  |
| 49 | Akshan | -0.55 | 0.00 | 0.55 |  |
| 50 | Karthus | -0.55 | 0.00 | 0.55 |  |
| 51 | Olaf | -0.57 | 0.09 | 0.66 |  |
| 52 | Zed | -0.59 | 0.43 | 1.02 |  |
| 53 | Corki | -0.59 | 0.23 | 0.82 |  |
| 54 | Quinn | -0.59 | 0.23 | 0.82 |  |
| 55 | Shen | -0.60 | 0.30 | 0.90 |  |
| 56 | Heimerdinger | -0.60 | 0.26 | 0.86 |  |
| 57 | Xin Zhao | -0.62 | 0.76 | 1.38 |  |
| 58 | Pantheon | -0.62 | 0.68 | 1.30 |  |
| 59 | Annie | -0.62 | 0.27 | 0.89 |  |
| 60 | Draven | -0.63 | 0.25 | 0.88 |  |
| 61 | Brand | -0.64 | 0.21 | 0.85 |  |
| 62 | Vel'Koz | -0.64 | 0.18 | 0.82 |  |
| 63 | Jayce | -0.65 | 0.08 | 0.73 |  |
| 64 | Karma | -0.65 | 0.08 | 0.73 |  |
| 65 | Lulu | -0.67 | 0.44 | 1.11 |  |
| 66 | Xerath | -0.67 | 0.18 | 0.85 |  |
| 67 | Morgana | -0.67 | 0.15 | 0.82 |  |
| 68 | Lux | -0.68 | 0.14 | 0.82 |  |
| 69 | Aatrox | -0.68 | 0.10 | 0.78 |  |
| 70 | Kha'Zix | -0.68 | 0.00 | 0.68 |  |
| 71 | Lucian | -0.68 | 0.00 | 0.68 |  |
| 72 | Kassadin | -0.70 | 0.09 | 0.79 |  |
| 73 | Graves | -0.70 | 0.00 | 0.70 |  |
| 74 | Jinx | -0.71 | 0.11 | 0.82 |  |
| 75 | Bel'Veth | -0.73 | 0.09 | 0.82 |  |
| 76 | Illaoi | -0.73 | 0.00 | 0.73 |  |
| 77 | Locke | -0.73 | 0.00 | 0.73 |  |
| 78 | Senna | -0.74 | 0.24 | 0.98 |  |
| 79 | Veigar | -0.74 | 0.19 | 0.93 |  |
| 80 | Kayn | -0.75 | 0.51 | 1.26 |  |
| 81 | Swain | -0.76 | 0.16 | 0.92 |  |
| 82 | Anivia | -0.78 | 0.27 | 1.05 |  |
| 83 | Udyr | -0.79 | 0.19 | 0.98 |  |
| 84 | Viktor | -0.79 | 0.17 | 0.96 |  |
| 85 | Ekko | -0.80 | 0.43 | 1.23 |  |
| 86 | Aphelios | -0.80 | 0.27 | 1.07 |  |
| 87 | Ziggs | -0.80 | 0.20 | 1.00 |  |
| 88 | Hwei | -0.81 | 0.19 | 1.00 |  |
| 89 | Ivern | -0.81 | 0.00 | 0.81 |  |
| 90 | Ahri | -0.82 | 0.18 | 1.00 |  |
| 91 | Orianna | -0.82 | 0.15 | 0.97 |  |
| 92 | Lillia | -0.82 | 0.05 | 0.87 |  |
| 93 | Malzahar | -0.83 | 0.19 | 1.02 |  |
| 94 | Yorick | -0.83 | 0.07 | 0.90 |  |
| 95 | Jhin | -0.84 | 0.13 | 0.97 |  |
| 96 | Jax | -0.85 | 0.27 | 1.12 |  |
| 97 | Syndra | -0.85 | 0.18 | 1.03 |  |
| 98 | Shyvana | -0.86 | 0.08 | 0.94 |  |
| 99 | Nocturne | -0.87 | 0.50 | 1.37 |  |
| 100 | Garen | -0.87 | 0.20 | 1.07 |  |
| 101 | Kalista | -0.87 | 0.20 | 1.07 |  |
| 102 | Lee Sin | -0.87 | 0.05 | 0.92 |  |
| 103 | Maokai | -0.88 | 0.59 | 1.47 |  |
| 104 | Renata Glasc | -0.89 | 0.26 | 1.15 |  |
| 105 | Zyra | -0.89 | 0.20 | 1.09 |  |
| 106 | Renekton | -0.89 | 0.09 | 0.98 |  |
| 107 | Seraphine | -0.90 | 0.19 | 1.09 |  |
| 108 | Neeko | -0.91 | 0.16 | 1.07 |  |
| 109 | Rumble | -0.91 | 0.00 | 0.91 |  |
| 110 | Yasuo | -0.92 | 0.49 | 1.41 |  |
| 111 | Gangplank | -0.92 | 0.12 | 1.04 |  |
| 112 | Talon | -0.92 | 0.00 | 0.92 |  |
| 113 | Nami | -0.93 | 0.20 | 1.13 |  |
| 114 | Cassiopeia | -0.93 | 0.16 | 1.09 |  |
| 115 | Janna | -0.95 | 0.25 | 1.20 |  |
| 116 | Azir | -0.95 | 0.15 | 1.10 |  |
| 117 | Mordekaiser | -0.96 | 0.14 | 1.10 |  |
| 118 | Thresh | -0.96 | 0.08 | 1.04 |  |
| 119 | Camille | -0.97 | 0.51 | 1.48 |  |
| 120 | Gnar | -0.97 | 0.06 | 1.03 |  |
| 121 | Naafiri | -0.99 | 0.00 | 0.99 |  |
| 122 | Evelynn | -1.00 | 0.51 | 1.51 |  |
| 123 | Nilah | -1.01 | 0.25 | 1.26 |  |
| 124 | Fiddlesticks | -1.01 | 0.10 | 1.11 |  |
| 125 | Irelia | -1.01 | 0.08 | 1.09 |  |
| 126 | Akali | -1.02 | 0.00 | 1.02 |  |
| 127 | Sylas | -1.03 | 0.08 | 1.11 |  |
| 128 | Aurelion Sol | -1.05 | 0.16 | 1.21 |  |
| 129 | Alistar | -1.05 | 0.15 | 1.20 |  |
| 130 | Hecarim | -1.05 | 0.05 | 1.10 |  |
| 131 | Rengar | -1.06 | 0.12 | 1.18 |  |
| 132 | Ambessa | -1.07 | 0.05 | 1.12 |  |
| 133 | Fizz | -1.08 | 0.05 | 1.13 |  |
| 134 | Cho'Gath | -1.11 | 0.10 | 1.21 |  |
| 135 | Wukong | -1.12 | 0.05 | 1.17 |  |
| 136 | Sion | -1.13 | 0.19 | 1.32 |  |
| 137 | Kled | -1.14 | 0.14 | 1.28 |  |
| 138 | Malphite | -1.15 | 0.19 | 1.34 |  |
| 139 | Trundle | -1.18 | 0.07 | 1.25 |  |
| 140 | Urgot | -1.18 | 0.07 | 1.25 |  |
| 141 | Rakan | -1.19 | 0.05 | 1.24 |  |
| 142 | Rammus | -1.20 | 0.29 | 1.49 |  |
| 143 | Darius | -1.20 | 0.07 | 1.27 |  |
| 144 | Nautilus | -1.21 | 0.05 | 1.26 |  |
| 145 | Skarner | -1.22 | 0.14 | 1.36 |  |
| 146 | Taliyah | -1.23 | 0.17 | 1.40 |  |
| 147 | Poppy | -1.24 | 0.05 | 1.29 |  |
| 148 | Zaahen | -1.25 | 0.16 | 1.41 |  |
| 149 | Tahm Kench | -1.25 | 0.11 | 1.36 |  |
| 150 | Yone | -1.25 | 0.11 | 1.36 |  |
| 151 | Qiyana | -1.26 | 0.05 | 1.31 |  |
| 152 | Riven | -1.28 | 0.07 | 1.35 |  |
| 153 | Diana | -1.28 | 0.05 | 1.33 |  |
| 154 | Jarvan IV | -1.28 | 0.05 | 1.33 |  |
| 155 | Nunu & Willump | -1.29 | 0.17 | 1.46 |  |
| 156 | Leona | -1.29 | 0.11 | 1.40 |  |
| 157 | Blitzcrank | -1.33 | 0.11 | 1.44 |  |
| 158 | Vi | -1.34 | 0.10 | 1.44 |  |
| 159 | Zac | -1.36 | 0.08 | 1.44 |  |
| 160 | Amumu | -1.36 | 0.07 | 1.43 |  |
| 161 | Gragas | -1.36 | 0.07 | 1.43 |  |
| 162 | Sett | -1.37 | 0.08 | 1.45 |  |
| 163 | Viego | -1.37 | 0.05 | 1.42 |  |
| 164 | Warwick | -1.39 | 0.14 | 1.53 |  |
| 165 | Sejuani | -1.39 | 0.11 | 1.50 |  |
| 166 | Volibear | -1.39 | 0.08 | 1.47 |  |
| 167 | Briar | -1.45 | 0.05 | 1.50 |  |
| 168 | Pyke | -1.46 | 0.08 | 1.54 |  |
| 169 | K'Sante | -1.47 | 0.11 | 1.58 |  |
| 170 | Ornn | -1.47 | 0.09 | 1.56 |  |
| 171 | Galio | -1.51 | 0.09 | 1.60 |  |
| 172 | Rell | -1.51 | 0.08 | 1.59 |  |
