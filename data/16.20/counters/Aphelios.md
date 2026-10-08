# Counters to Aphelios (patch 26.20)

Every champion ranked by what its kit does against Aphelios's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Aphelios's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Aphelios` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.06)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for 0.6 s; Moonlight Vigil takes 1.9 s to land, enough to react. (Elise E Rappel → Aphelios R Moonlight Vigil)
- **0.51** untargetable: Rappel makes Elise untargetable, dodging Aphelios's Binding Eclipse. Untargetable for 0.6 s; Binding Eclipse takes 0.3 s to land, enough to react. (Elise E Rappel → Aphelios Q Binding Eclipse)

### 2. Xayah (net +0.96)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for 1.5 s, long enough to use ahead of Moonlight Vigil. (Xayah R Featherstorm → Aphelios R Moonlight Vigil)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Aphelios's Binding Eclipse. Untargetable for 1.5 s, long enough to use ahead of Binding Eclipse. (Xayah R Featherstorm → Aphelios Q Binding Eclipse)

### 3. Yuumi (net +0.94)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for ?; Moonlight Vigil takes 1.9 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Aphelios R Moonlight Vigil)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Aphelios's Binding Eclipse. Untargetable for ?; Binding Eclipse takes 0.3 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Aphelios Q Binding Eclipse)
- Watch out: Aphelios's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

### 4. Master Yi (net +0.93)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for ?; Moonlight Vigil takes 1.9 s to land, enough to react. (Master Yi Q Alpha Strike → Aphelios R Moonlight Vigil)
- **0.51** untargetable: Alpha Strike makes Master Yi untargetable, dodging Aphelios's Binding Eclipse. Untargetable for ?; Binding Eclipse takes 0.3 s to land, enough to react. (Master Yi Q Alpha Strike → Aphelios Q Binding Eclipse)
- **0.16** cleanse: Highlander cleanses Aphelios's Moonlight Vigil (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove root. (Master Yi R Highlander → Aphelios R Moonlight Vigil)
- Watch out: Aphelios's basic attacks reach 375 units farther than Master Yi's (550 vs 175 attack range).

### 5. Bard (net +0.90)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for 2.5 s, long enough to use ahead of Moonlight Vigil. (Bard R Tempered Fate → Aphelios R Moonlight Vigil)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Aphelios's Binding Eclipse. Untargetable for 2.5 s, long enough to use ahead of Binding Eclipse. (Bard R Tempered Fate → Aphelios Q Binding Eclipse)
- Watch out: Sentry makes Aphelios immune to Bard's Cosmic Binding slow.

### 6. Aurora (net +0.86)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for 0.4 s; Moonlight Vigil takes 1.9 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Aphelios R Moonlight Vigil)
- **0.32** untargetable: Between Worlds makes Aurora untargetable, dodging Aphelios's Binding Eclipse. Untargetable for 0.4 s; Binding Eclipse takes 0.3 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Aphelios Q Binding Eclipse)
- Watch out: Sentry makes Aphelios immune to Aurora's Between Worlds slow.

### 7. Lissandra (net +0.85)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for 2.5 s, long enough to use ahead of Moonlight Vigil. (Lissandra R Frozen Tomb → Aphelios R Moonlight Vigil)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Aphelios's Binding Eclipse. Untargetable for 2.5 s, long enough to use ahead of Binding Eclipse. (Lissandra R Frozen Tomb → Aphelios Q Binding Eclipse)
- Watch out: Sentry makes Aphelios immune to Lissandra's Frozen Tomb slow.

### 8. Morgana (net +0.84)

- **0.80** cc immunity: Black Shield makes Morgana immune to Aphelios's Moonlight Vigil (slow, root). Immune for 5 s, long enough to use ahead of Moonlight Vigil. (Morgana E Black Shield → Aphelios R Moonlight Vigil)
- **0.54** cc immunity: Black Shield makes Morgana immune to Aphelios's Binding Eclipse (root, slow). Immune for 5 s, long enough to use ahead of Binding Eclipse. (Morgana E Black Shield → Aphelios Q Binding Eclipse)
- **0.06** cc immunity: Black Shield makes Morgana immune to Aphelios's Gravitum (slow). Immune for 5 s, long enough to use ahead of Gravitum. (Morgana E Black Shield → Aphelios basic attacks)
- Watch out: Aphelios's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

### 9. Fiora (net +0.81)

- **0.90** parry: Riposte parries Aphelios's Moonlight Vigil and stuns back. Parry for 0.75 s; Moonlight Vigil takes 1.9 s to land, enough to react. Negating Moonlight Vigil's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Aphelios R Moonlight Vigil)
- **0.64** parry: Riposte parries Aphelios's Binding Eclipse and stuns back. Parry for 0.75 s; Binding Eclipse takes 0.3 s to land, enough to react. Negating Binding Eclipse's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Aphelios Q Binding Eclipse)
- **0.09** attack speed slow: Riposte cuts Aphelios's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Aphelios basic attacks)
- Watch out: Aphelios's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### 10. Vladimir (net +0.80)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for 2 s, long enough to use ahead of Moonlight Vigil. (Vladimir W Sanguine Pool → Aphelios R Moonlight Vigil)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Aphelios's Binding Eclipse. Untargetable for 2 s, long enough to use ahead of Binding Eclipse. (Vladimir W Sanguine Pool → Aphelios Q Binding Eclipse)
- Watch out: Aphelios's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.06 | 1.06 | 0.00 |  |
| 2 | Xayah | +0.96 | 0.96 | 0.00 |  |
| 3 | Yuumi | +0.94 | 1.15 | 0.21 |  |
| 4 | Master Yi | +0.93 | 1.29 | 0.36 |  |
| 5 | Bard | +0.90 | 0.97 | 0.07 |  |
| 6 | Aurora | +0.86 | 0.96 | 0.10 |  |
| 7 | Lissandra | +0.85 | 0.97 | 0.12 |  |
| 8 | Morgana | +0.84 | 1.09 | 0.25 |  |
| 9 | Fiora | +0.81 | 1.24 | 0.43 |  |
| 10 | Vladimir | +0.80 | 1.07 | 0.27 |  |
| 11 | Zaahen | +0.74 | 0.98 | 0.24 |  |
| 12 | Udyr | +0.73 | 1.17 | 0.44 |  |
| 13 | Camille | +0.73 | 0.97 | 0.24 |  |
| 14 | Rek'Sai | +0.73 | 0.97 | 0.24 |  |
| 15 | Kled | +0.72 | 0.93 | 0.21 |  |
| 16 | Sivir | +0.71 | 0.71 | 0.00 |  |
| 17 | Milio | +0.69 | 0.76 | 0.07 |  |
| 18 | Samira | +0.68 | 0.68 | 0.00 | projectile block (Blade Whirl) |
| 19 | Maokai | +0.67 | 1.15 | 0.48 |  |
| 20 | Kayn | +0.66 | 0.97 | 0.31 |  |
| 21 | Kalista | +0.66 | 0.71 | 0.05 |  |
| 22 | Warwick | +0.65 | 0.98 | 0.33 |  |
| 23 | Ekko | +0.64 | 0.98 | 0.34 |  |
| 24 | Evelynn | +0.64 | 0.97 | 0.33 |  |
| 25 | Zed | +0.64 | 0.96 | 0.32 |  |
| 26 | Gwen | +0.62 | 1.06 | 0.44 |  |
| 27 | Shaco | +0.61 | 0.97 | 0.36 |  |
| 28 | Mel | +0.60 | 0.67 | 0.07 | projectile block (Rebuttal) |
| 29 | Malzahar | +0.59 | 0.59 | 0.00 |  |
| 30 | Kayle | +0.58 | 0.63 | 0.05 |  |
| 31 | Teemo | +0.54 | 0.60 | 0.06 | blind (Blinding Dart) |
| 32 | Yasuo | +0.51 | 0.75 | 0.24 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 33 | Braum | +0.45 | 0.94 | 0.49 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 34 | Shen | +0.44 | 0.75 | 0.31 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 35 | Alistar | +0.40 | 0.78 | 0.38 |  |
| 36 | Jax | +0.39 | 0.77 | 0.38 | attack dodge (Counter Strike), attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 37 | Kindred | +0.39 | 0.44 | 0.05 |  |
| 38 | Nocturne | +0.38 | 0.83 | 0.45 |  |
| 39 | Varus | +0.33 | 0.38 | 0.05 |  |
| 40 | Nilah | +0.29 | 0.68 | 0.39 | attack dodge (Jubilant Veil) |
| 41 | Lulu | +0.24 | 0.36 | 0.12 |  |
| 42 | Tristana | +0.21 | 0.27 | 0.06 |  |
| 43 | Pantheon | +0.20 | 0.53 | 0.33 |  |
| 44 | Olaf | +0.16 | 0.98 | 0.82 |  |
| 45 | Sion | +0.14 | 0.99 | 0.85 |  |
| 46 | Caitlyn | +0.12 | 0.18 | 0.06 |  |
| 47 | Rengar | +0.10 | 0.94 | 0.84 |  |
| 48 | Annie | +0.08 | 0.08 | 0.00 |  |
| 49 | Gangplank | +0.02 | 0.88 | 0.86 |  |
| 50 | Xin Zhao | +0.01 | 0.48 | 0.47 |  |
| 51 | Heimerdinger | +0.01 | 0.12 | 0.11 |  |
| 52 | Katarina | 0.00 | 0.38 | 0.38 |  |
| 53 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 54 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 55 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 56 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 57 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 58 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 59 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 60 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 61 | Sona | 0.00 | 0.00 | 0.00 |  |
| 62 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 63 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 64 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 65 | Ashe | -0.03 | 0.00 | 0.03 |  |
| 66 | Azir | -0.05 | 0.00 | 0.05 |  |
| 67 | Janna | -0.05 | 0.00 | 0.05 |  |
| 68 | Kog'Maw | -0.05 | 0.00 | 0.05 |  |
| 69 | Lux | -0.05 | 0.00 | 0.05 |  |
| 70 | Miss Fortune | -0.05 | 0.00 | 0.05 |  |
| 71 | Orianna | -0.05 | 0.00 | 0.05 |  |
| 72 | Renata Glasc | -0.05 | 0.00 | 0.05 |  |
| 73 | Senna | -0.05 | 0.00 | 0.05 |  |
| 74 | Twitch | -0.05 | 0.00 | 0.05 |  |
| 75 | Xerath | -0.05 | 0.00 | 0.05 |  |
| 76 | Zeri | -0.05 | 0.00 | 0.05 |  |
| 77 | Ziggs | -0.05 | 0.00 | 0.05 |  |
| 78 | Zilean | -0.05 | 0.00 | 0.05 |  |
| 79 | Brand | -0.06 | 0.00 | 0.06 |  |
| 80 | Jayce | -0.06 | 0.00 | 0.06 |  |
| 81 | Jinx | -0.06 | 0.00 | 0.06 |  |
| 82 | Soraka | -0.06 | 0.00 | 0.06 |  |
| 83 | Ahri | -0.07 | 0.00 | 0.07 |  |
| 84 | Corki | -0.07 | 0.00 | 0.07 |  |
| 85 | Draven | -0.07 | 0.00 | 0.07 |  |
| 86 | Ryze | -0.07 | 0.00 | 0.07 |  |
| 87 | Twisted Fate | -0.07 | 0.00 | 0.07 |  |
| 88 | Viktor | -0.07 | 0.00 | 0.07 |  |
| 89 | Zoe | -0.07 | 0.00 | 0.07 |  |
| 90 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 91 | Karma | -0.08 | 0.00 | 0.08 |  |
| 92 | Nami | -0.08 | 0.00 | 0.08 |  |
| 93 | Yunara | -0.08 | 0.00 | 0.08 |  |
| 94 | Jhin | -0.09 | 0.00 | 0.09 |  |
| 95 | Quinn | -0.09 | 0.00 | 0.09 |  |
| 96 | Smolder | -0.09 | 0.00 | 0.09 |  |
| 97 | Swain | -0.09 | 0.00 | 0.09 |  |
| 98 | Vel'Koz | -0.09 | 0.00 | 0.09 |  |
| 99 | Vex | -0.09 | 0.00 | 0.09 |  |
| 100 | Fiddlesticks | -0.10 | 0.00 | 0.10 |  |
| 101 | Syndra | -0.10 | 0.00 | 0.10 |  |
| 102 | Taliyah | -0.10 | 0.00 | 0.10 |  |
| 103 | Anivia | -0.11 | 0.00 | 0.11 |  |
| 104 | Cassiopeia | -0.11 | 0.00 | 0.11 |  |
| 105 | Hwei | -0.12 | 0.00 | 0.12 |  |
| 106 | Ivern | -0.12 | 0.00 | 0.12 |  |
| 107 | Seraphine | -0.12 | 0.00 | 0.12 |  |
| 108 | Rammus | -0.13 | 0.38 | 0.51 |  |
| 109 | Gnar | -0.13 | 0.00 | 0.13 |  |
| 110 | Graves | -0.13 | 0.00 | 0.13 |  |
| 111 | Thresh | -0.16 | 0.00 | 0.16 |  |
| 112 | Garen | -0.17 | 0.55 | 0.72 |  |
| 113 | Yone | -0.18 | 0.00 | 0.18 |  |
| 114 | Malphite | -0.21 | 0.25 | 0.46 |  |
| 115 | Jarvan IV | -0.23 | 0.00 | 0.23 |  |
| 116 | Sylas | -0.23 | 0.00 | 0.23 |  |
| 117 | Karthus | -0.24 | 0.00 | 0.24 |  |
| 118 | Wukong | -0.24 | 0.00 | 0.24 |  |
| 119 | Rakan | -0.24 | 0.00 | 0.24 |  |
| 120 | Rell | -0.24 | 0.00 | 0.24 |  |
| 121 | Singed | -0.25 | 0.57 | 0.82 |  |
| 122 | Riven | -0.26 | 0.00 | 0.26 |  |
| 123 | Vi | -0.26 | 0.00 | 0.26 |  |
| 124 | K'Sante | -0.27 | 0.00 | 0.27 |  |
| 125 | Viego | -0.27 | 0.00 | 0.27 |  |
| 126 | Naafiri | -0.28 | 0.00 | 0.28 |  |
| 127 | Fizz | -0.30 | 0.00 | 0.30 |  |
| 128 | Urgot | -0.30 | 0.00 | 0.30 |  |
| 129 | Ambessa | -0.31 | 0.00 | 0.31 |  |
| 130 | Lee Sin | -0.31 | 0.00 | 0.31 |  |
| 131 | Talon | -0.31 | 0.00 | 0.31 |  |
| 132 | Akali | -0.32 | 0.00 | 0.32 |  |
| 133 | Briar | -0.32 | 0.00 | 0.32 |  |
| 134 | Taric | -0.33 | 0.44 | 0.77 |  |
| 135 | Galio | -0.33 | 0.00 | 0.33 |  |
| 136 | Lillia | -0.33 | 0.00 | 0.33 |  |
| 137 | Pyke | -0.33 | 0.00 | 0.33 |  |
| 138 | Qiyana | -0.33 | 0.00 | 0.33 |  |
| 139 | Hecarim | -0.34 | 0.00 | 0.34 |  |
| 140 | Amumu | -0.38 | 0.00 | 0.38 |  |
| 141 | Ornn | -0.38 | 0.00 | 0.38 |  |
| 142 | Renekton | -0.38 | 0.00 | 0.38 |  |
| 143 | Volibear | -0.38 | 0.00 | 0.38 |  |
| 144 | Bel'Veth | -0.40 | 0.00 | 0.40 |  |
| 145 | Irelia | -0.40 | 0.00 | 0.40 |  |
| 146 | Aatrox | -0.41 | 0.00 | 0.41 |  |
| 147 | Nautilus | -0.41 | 0.00 | 0.41 |  |
| 148 | Tryndamere | -0.41 | 0.00 | 0.41 |  |
| 149 | Nasus | -0.43 | 0.39 | 0.82 |  |
| 150 | Gragas | -0.43 | 0.00 | 0.43 |  |
| 151 | Illaoi | -0.43 | 0.00 | 0.43 |  |
| 152 | Kassadin | -0.43 | 0.00 | 0.43 |  |
| 153 | Tahm Kench | -0.43 | 0.00 | 0.43 |  |
| 154 | Poppy | -0.44 | 0.00 | 0.44 |  |
| 155 | Kha'Zix | -0.45 | 0.00 | 0.45 |  |
| 156 | Diana | -0.46 | 0.00 | 0.46 |  |
| 157 | Leona | -0.46 | 0.00 | 0.46 |  |
| 158 | Locke | -0.47 | 0.00 | 0.47 |  |
| 159 | Zac | -0.48 | 0.00 | 0.48 |  |
| 160 | Sejuani | -0.49 | 0.00 | 0.49 |  |
| 161 | Shyvana | -0.51 | 0.00 | 0.51 |  |
| 162 | Sett | -0.52 | 0.00 | 0.52 |  |
| 163 | Nunu & Willump | -0.56 | 0.31 | 0.87 |  |
| 164 | Mordekaiser | -0.69 | 0.09 | 0.78 |  |
| 165 | Skarner | -0.71 | 0.16 | 0.87 |  |
| 166 | Blitzcrank | -0.77 | 0.00 | 0.77 |  |
| 167 | Yorick | -0.77 | 0.00 | 0.77 |  |
| 168 | Darius | -0.82 | 0.00 | 0.82 |  |
| 169 | Trundle | -0.82 | 0.00 | 0.82 |  |
| 170 | Dr. Mundo | -0.83 | 0.00 | 0.83 |  |
| 171 | Rumble | -0.86 | 0.00 | 0.86 |  |
| 172 | Cho'Gath | -0.87 | 0.00 | 0.87 |  |
