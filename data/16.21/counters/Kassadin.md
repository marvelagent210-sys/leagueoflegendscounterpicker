# Counters to Kassadin (patch 26.21)

Every champion ranked by what its kit does against Kassadin's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kassadin's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kassadin` for the full ledger of a matchup, with sources.

## Top 10

### 1. Yuumi (net +1.16)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Kassadin's Riftwalk. Untargetable for ?; Riftwalk takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Kassadin R Riftwalk)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Kassadin's Null Sphere. Untargetable for ?; Null Sphere takes 0.71 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Kassadin Q Null Sphere)
- **0.30** range: Yuumi's basic attacks reach 275 units farther than Kassadin's (425 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Yuumi basic attacks → Kassadin basic attacks)
- Watch out: Null Sphere's disrupt interrupts Yuumi's Final Chapter (normal channel).

### 2. Sivir (net +1.09)

- **0.47** spell shield: Spell Shield's spell shield blocks Kassadin's Riftwalk. Spell shield for 1.5 s, long enough to use ahead of Riftwalk. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kassadin R Riftwalk)
- **0.44** range: Sivir's basic attacks reach 350 units farther than Kassadin's (500 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Sivir basic attacks → Kassadin basic attacks)
- **0.28** spell shield: Spell Shield's spell shield blocks Kassadin's Null Sphere. Spell shield for 1.5 s, long enough to use ahead of Null Sphere. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kassadin Q Null Sphere)

### 3. Xayah (net +0.92)

- **0.41** untargetable: Featherstorm makes Xayah untargetable, dodging Kassadin's Riftwalk. Untargetable for 1.5 s, long enough to use ahead of Riftwalk. (Xayah R Featherstorm → Kassadin R Riftwalk)
- **0.36** range: Xayah's basic attacks reach 375 units farther than Kassadin's (525 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Xayah basic attacks → Kassadin basic attacks)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Kassadin's Nether Blade. Untargetable for 1.5 s, long enough to use ahead of Nether Blade. (Xayah R Featherstorm → Kassadin W Nether Blade)

### 4. Bard (net +0.91)

- **0.42** untargetable: Tempered Fate makes Bard untargetable, dodging Kassadin's Riftwalk. Untargetable for 2.5 s, long enough to use ahead of Riftwalk. (Bard R Tempered Fate → Kassadin R Riftwalk)
- **0.34** range: Bard's basic attacks reach 350 units farther than Kassadin's (500 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Bard basic attacks → Kassadin basic attacks)
- **0.20** untargetable: Tempered Fate makes Bard untargetable, dodging Kassadin's Nether Blade. Untargetable for 2.5 s, long enough to use ahead of Nether Blade. (Bard R Tempered Fate → Kassadin W Nether Blade)

### 5. Kayle (net +0.91)

- **0.42** invulnerable: Divine Judgment makes Kayle invulnerable to Kassadin's Riftwalk. Invulnerable for 2.5 s, long enough to use ahead of Riftwalk. (Kayle R Divine Judgment → Kassadin R Riftwalk)
- **0.36** range: Kayle's basic attacks reach 475 units farther than Kassadin's (625 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Kayle basic attacks → Kassadin basic attacks)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Kassadin's Nether Blade. Invulnerable for 2.5 s, long enough to use ahead of Nether Blade. (Kayle R Divine Judgment → Kassadin W Nether Blade)

### 6. Aurora (net +0.83)

- **0.41** untargetable: Between Worlds makes Aurora untargetable, dodging Kassadin's Riftwalk. Untargetable for 0.4 s; Riftwalk takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kassadin R Riftwalk)
- **0.29** range: Aurora's basic attacks reach 400 units farther than Kassadin's (550 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Aurora basic attacks → Kassadin basic attacks)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Kassadin's Null Sphere. Untargetable for 0.4 s; Null Sphere takes 0.71 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kassadin Q Null Sphere)

### 7. Fizz (net +0.82)

- **0.55** untargetable: Playful makes Fizz untargetable, dodging Kassadin's Riftwalk. Untargetable for 0.75 s; Riftwalk takes 0.25 s to land, enough to react. (Fizz E Playful → Kassadin R Riftwalk)
- **0.42** untargetable: Playful makes Fizz untargetable, dodging Kassadin's Null Sphere. Untargetable for 0.75 s; Null Sphere takes 0.71 s to land, enough to react. (Fizz E Playful → Kassadin Q Null Sphere)
- **0.25** untargetable: Playful makes Fizz untargetable, dodging Kassadin's Nether Blade. Untargetable for 0.75 s; Nether Blade lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Kassadin W Nether Blade)

### 8. Lissandra (net +0.79)

- **0.42** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Kassadin's Riftwalk. Untargetable for 2.5 s, long enough to use ahead of Riftwalk. (Lissandra R Frozen Tomb → Kassadin R Riftwalk)
- **0.22** range: Lissandra's basic attacks reach 400 units farther than Kassadin's (550 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Lissandra basic attacks → Kassadin basic attacks)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Kassadin's Nether Blade. Untargetable for 2.5 s, long enough to use ahead of Nether Blade. (Lissandra R Frozen Tomb → Kassadin W Nether Blade)

### 9. Vladimir (net +0.78)

- **0.48** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kassadin's Riftwalk. Untargetable for 2 s, long enough to use ahead of Riftwalk. (Vladimir W Sanguine Pool → Kassadin R Riftwalk)
- **0.30** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kassadin's Nether Blade. Untargetable for 2 s, long enough to use ahead of Nether Blade. (Vladimir W Sanguine Pool → Kassadin W Nether Blade)
- **0.30** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kassadin's Null Sphere. Untargetable for 2 s, long enough to use ahead of Null Sphere. (Vladimir W Sanguine Pool → Kassadin Q Null Sphere)
- Watch out: Null Sphere's disrupt interrupts Vladimir's Tides of Blood (charge-up).

### 10. Teemo (net +0.78)

- **0.38** blind: Blinding Dart's blind makes Kassadin's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Kassadin basic attacks)
- **0.32** range: Teemo's basic attacks reach 350 units farther than Kassadin's (500 vs 150 attack range). Kassadin closes the gap with Riftwalk. (Teemo basic attacks → Kassadin basic attacks)
- **0.15** blind: Blinding Dart's blind makes Kassadin's Nether Blade, an empowered attack, miss. Blind for 3 s. Nether Blade will not grant mana if the attack is dodged or if it misses, but will do so if the attack is blocked. In all cases the damage is parried. Spell shield will block the active damage but not the passive one. (Teemo Q Blinding Dart → Kassadin W Nether Blade)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +1.16 | 1.59 | 0.43 |  |
| 2 | Sivir | +1.09 | 1.09 | 0.00 |  |
| 3 | Xayah | +0.92 | 0.92 | 0.00 |  |
| 4 | Bard | +0.91 | 0.91 | 0.00 |  |
| 5 | Kayle | +0.91 | 0.91 | 0.00 |  |
| 6 | Aurora | +0.83 | 0.83 | 0.00 |  |
| 7 | Fizz | +0.82 | 0.82 | 0.00 |  |
| 8 | Lissandra | +0.79 | 0.79 | 0.00 |  |
| 9 | Vladimir | +0.78 | 0.87 | 0.09 |  |
| 10 | Teemo | +0.78 | 0.78 | 0.00 |  |
| 11 | Maokai | +0.76 | 0.76 | 0.00 |  |
| 12 | Nocturne | +0.71 | 0.71 | 0.00 |  |
| 13 | Cassiopeia | +0.70 | 0.70 | 0.00 | grounding (Miasma) |
| 14 | Fiora | +0.68 | 0.68 | 0.00 |  |
| 15 | Gwen | +0.65 | 0.65 | 0.00 |  |
| 16 | Lulu | +0.63 | 0.63 | 0.00 |  |
| 17 | Rek'Sai | +0.57 | 0.57 | 0.00 |  |
| 18 | Evelynn | +0.55 | 0.55 | 0.00 |  |
| 19 | Samira | +0.55 | 0.55 | 0.00 |  |
| 20 | Shaco | +0.55 | 0.55 | 0.00 |  |
| 21 | Camille | +0.54 | 0.54 | 0.00 |  |
| 22 | Xin Zhao | +0.54 | 0.54 | 0.00 |  |
| 23 | Zed | +0.54 | 0.54 | 0.00 |  |
| 24 | Mel | +0.52 | 0.52 | 0.00 |  |
| 25 | Master Yi | +0.50 | 0.73 | 0.23 |  |
| 26 | Singed | +0.49 | 0.49 | 0.00 | grounding (Mega Adhesive) |
| 27 | Kindred | +0.44 | 0.44 | 0.00 |  |
| 28 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 29 | Aphelios | +0.43 | 0.43 | 0.00 |  |
| 30 | Nilah | +0.43 | 0.43 | 0.00 |  |
| 31 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 32 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 33 | Braum | +0.42 | 0.42 | 0.00 | projectile block (Unbreakable) |
| 34 | Milio | +0.42 | 0.42 | 0.00 |  |
| 35 | Morgana | +0.42 | 0.42 | 0.00 |  |
| 36 | Jax | +0.41 | 0.41 | 0.00 |  |
| 37 | Sona | +0.41 | 0.41 | 0.00 |  |
| 38 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 39 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 40 | Draven | +0.36 | 0.36 | 0.00 |  |
| 41 | Kai'Sa | +0.36 | 0.36 | 0.00 |  |
| 42 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 43 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 44 | Kalista | +0.34 | 0.34 | 0.00 |  |
| 45 | Udyr | +0.33 | 0.33 | 0.00 |  |
| 46 | Corki | +0.32 | 0.32 | 0.00 |  |
| 47 | Elise | +0.32 | 0.32 | 0.00 |  |
| 48 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 49 | Senna | +0.32 | 0.32 | 0.00 |  |
| 50 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 51 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 52 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 53 | Gnar | +0.31 | 0.31 | 0.00 |  |
| 54 | Viktor | +0.30 | 0.30 | 0.00 |  |
| 55 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 56 | Lux | +0.29 | 0.29 | 0.00 |  |
| 57 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 58 | Yasuo | +0.29 | 0.29 | 0.00 |  |
| 59 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 60 | Nidalee | +0.28 | 0.28 | 0.00 |  |
| 61 | Jinx | +0.27 | 0.27 | 0.00 |  |
| 62 | Seraphine | +0.27 | 0.27 | 0.00 |  |
| 63 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 64 | Vex | +0.27 | 0.27 | 0.00 |  |
| 65 | Ziggs | +0.27 | 0.27 | 0.00 |  |
| 66 | Azir | +0.25 | 0.25 | 0.00 |  |
| 67 | Heimerdinger | +0.25 | 0.25 | 0.00 |  |
| 68 | Kled | +0.25 | 0.25 | 0.00 |  |
| 69 | Kog'Maw | +0.25 | 0.25 | 0.00 |  |
| 70 | Orianna | +0.25 | 0.25 | 0.00 |  |
| 71 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 72 | Veigar | +0.24 | 0.24 | 0.00 |  |
| 73 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 74 | Hwei | +0.23 | 0.23 | 0.00 |  |
| 75 | Ahri | +0.22 | 0.22 | 0.00 |  |
| 76 | Annie | +0.22 | 0.22 | 0.00 |  |
| 77 | Brand | +0.22 | 0.22 | 0.00 |  |
| 78 | Graves | +0.22 | 0.22 | 0.00 |  |
| 79 | Nami | +0.22 | 0.22 | 0.00 |  |
| 80 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 81 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 82 | Karma | +0.21 | 0.21 | 0.00 |  |
| 83 | LeBlanc | +0.21 | 0.21 | 0.00 |  |
| 84 | Swain | +0.20 | 0.20 | 0.00 |  |
| 85 | Malphite | +0.19 | 0.19 | 0.00 |  |
| 86 | Thresh | +0.18 | 0.18 | 0.00 |  |
| 87 | Varus | +0.16 | 0.27 | 0.11 |  |
| 88 | Quinn | +0.15 | 0.36 | 0.21 |  |
| 89 | Olaf | +0.15 | 0.15 | 0.00 |  |
| 90 | Zaahen | +0.15 | 0.15 | 0.00 |  |
| 91 | Pantheon | +0.14 | 0.65 | 0.51 |  |
| 92 | Aurelion Sol | +0.13 | 0.22 | 0.09 |  |
| 93 | Urgot | +0.13 | 0.13 | 0.00 |  |
| 94 | Garen | +0.12 | 0.12 | 0.00 |  |
| 95 | Rakan | +0.11 | 0.11 | 0.00 |  |
| 96 | Kayn | +0.10 | 0.55 | 0.45 |  |
| 97 | Lillia | +0.10 | 0.10 | 0.00 |  |
| 98 | Gangplank | +0.09 | 0.09 | 0.00 |  |
| 99 | Rengar | +0.09 | 0.09 | 0.00 |  |
| 100 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 101 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 102 | Lucian | +0.06 | 0.34 | 0.28 |  |
| 103 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 104 | Twisted Fate | +0.05 | 0.40 | 0.35 |  |
| 105 | Alistar | +0.05 | 0.05 | 0.00 |  |
| 106 | Akshan | +0.04 | 0.32 | 0.28 |  |
| 107 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 108 | Ivern | +0.03 | 0.18 | 0.15 |  |
| 109 | Sion | 0.00 | 0.16 | 0.16 |  |
| 110 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 111 | Akali | 0.00 | 0.00 | 0.00 |  |
| 112 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 113 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 114 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 115 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 116 | Briar | 0.00 | 0.00 | 0.00 |  |
| 117 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 118 | Darius | 0.00 | 0.00 | 0.00 |  |
| 119 | Diana | 0.00 | 0.00 | 0.00 |  |
| 120 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 121 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 122 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 123 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 124 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 125 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 126 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 127 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 128 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 129 | Leona | 0.00 | 0.00 | 0.00 |  |
| 130 | Locke | 0.00 | 0.00 | 0.00 |  |
| 131 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 132 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 133 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 134 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 135 | Rell | 0.00 | 0.00 | 0.00 |  |
| 136 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 137 | Riven | 0.00 | 0.00 | 0.00 |  |
| 138 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 139 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 140 | Sett | 0.00 | 0.00 | 0.00 |  |
| 141 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 142 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 143 | Talon | 0.00 | 0.00 | 0.00 |  |
| 144 | Taric | 0.00 | 0.00 | 0.00 |  |
| 145 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 146 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 147 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 148 | Yone | 0.00 | 0.00 | 0.00 |  |
| 149 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 150 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 151 | Rammus | -0.03 | 0.29 | 0.32 |  |
| 152 | Vel'Koz | -0.03 | 0.25 | 0.28 |  |
| 153 | Janna | -0.04 | 0.36 | 0.40 |  |
| 154 | Malzahar | -0.04 | 0.36 | 0.40 |  |
| 155 | Shen | -0.07 | 0.38 | 0.45 |  |
| 156 | Xerath | -0.08 | 0.25 | 0.33 |  |
| 157 | Karthus | -0.10 | 0.18 | 0.28 |  |
| 158 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 159 | Pyke | -0.18 | 0.00 | 0.18 |  |
| 160 | Gragas | -0.19 | 0.00 | 0.19 |  |
| 161 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 162 | Taliyah | -0.23 | 0.25 | 0.48 |  |
| 163 | Viego | -0.25 | 0.00 | 0.25 |  |
| 164 | Katarina | -0.28 | 0.00 | 0.28 |  |
| 165 | Fiddlesticks | -0.29 | 0.18 | 0.47 |  |
| 166 | Nunu & Willump | -0.35 | 0.14 | 0.49 |  |
| 167 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 168 | Vi | -0.46 | 0.00 | 0.46 |  |
| 169 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 170 | Zac | -0.50 | 0.00 | 0.50 |  |
| 171 | Warwick | -0.54 | 0.15 | 0.69 |  |
| 172 | Galio | -0.59 | 0.00 | 0.59 |  |
