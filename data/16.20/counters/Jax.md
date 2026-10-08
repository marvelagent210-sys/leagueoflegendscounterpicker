# Counters to Jax (patch 26.20)

Every champion ranked by what its kit does against Jax's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Jax's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Jax` for the full ledger of a matchup, with sources.

## Top 10

### 1. Vladimir (net +0.85)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for 2 s, long enough to use ahead of Grandmaster-at-Arms. (Vladimir W Sanguine Pool → Jax R Grandmaster-at-Arms)
- **0.52** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jax's Counter Strike. Untargetable for 2 s, long enough to use ahead of Counter Strike. (Vladimir W Sanguine Pool → Jax E Counter Strike)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jax's Leap Strike. Untargetable for 2 s, long enough to use ahead of Leap Strike. (Vladimir W Sanguine Pool → Jax Q Leap Strike)
- Watch out: Counter Strike dodges Vladimir's basic attacks.

### 2. Yuumi (net +0.83)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Jax's Leap Strike. Untargetable for ?, timed to Leap Strike. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jax Q Leap Strike)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for ?; Grandmaster-at-Arms takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jax R Grandmaster-at-Arms)
- **0.42** untargetable: You and Me! makes Yuumi untargetable, dodging Jax's Counter Strike. Untargetable for ?; Counter Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jax E Counter Strike)
- Watch out: Counter Strike dodges Yuumi's basic attacks (with Feline Friendship).

### 3. Lissandra (net +0.83)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for 2.5 s, long enough to use ahead of Grandmaster-at-Arms. (Lissandra R Frozen Tomb → Jax R Grandmaster-at-Arms)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jax's Leap Strike. Untargetable for 2.5 s, long enough to use ahead of Leap Strike. (Lissandra R Frozen Tomb → Jax Q Leap Strike)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jax's Counter Strike. Untargetable for 2.5 s, long enough to use ahead of Counter Strike. (Lissandra R Frozen Tomb → Jax E Counter Strike)
- Watch out: Counter Strike dodges Lissandra's basic attacks.

### 4. Bard (net +0.76)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for 2.5 s, long enough to use ahead of Grandmaster-at-Arms. (Bard R Tempered Fate → Jax R Grandmaster-at-Arms)
- **0.36** range: Bard's basic attacks reach 375 units farther than Jax's (500 vs 125 attack range). Jax closes the gap with Leap Strike. (Bard basic attacks → Jax basic attacks)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Jax's Leap Strike. Untargetable for 2.5 s, long enough to use ahead of Leap Strike. (Bard R Tempered Fate → Jax Q Leap Strike)
- Watch out: Counter Strike dodges Bard's basic attacks (with Traveler's Call).

### 5. Xayah (net +0.75)

- **0.52** untargetable: Featherstorm makes Xayah untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for 1.5 s, long enough to use ahead of Grandmaster-at-Arms. (Xayah R Featherstorm → Jax R Grandmaster-at-Arms)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Jax's (525 vs 125 attack range). Jax closes the gap with Leap Strike. (Xayah basic attacks → Jax basic attacks)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Jax's Leap Strike. Untargetable for 1.5 s, long enough to use ahead of Leap Strike. (Xayah R Featherstorm → Jax Q Leap Strike)
- Watch out: Counter Strike dodges Xayah's basic attacks (with Clean Cuts).

### 6. Sivir (net +0.74)

- **0.49** spell shield: Spell Shield's spell shield blocks Jax's Counter Strike. Spell shield for 1.5 s, long enough to use ahead of Counter Strike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Jax E Counter Strike)
- **0.48** spell shield: Spell Shield's spell shield blocks Jax's Leap Strike. Spell shield for 1.5 s, long enough to use ahead of Leap Strike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Jax Q Leap Strike)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Jax's (500 vs 125 attack range). Jax closes the gap with Leap Strike. (Sivir basic attacks → Jax basic attacks)
- Watch out: Counter Strike dodges Sivir's basic attacks (with Fleet of Foot).

### 7. Aurora (net +0.72)

- **0.52** untargetable: Between Worlds makes Aurora untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for 0.4 s; Grandmaster-at-Arms takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Jax R Grandmaster-at-Arms)
- **0.35** untargetable: Between Worlds makes Aurora untargetable, dodging Jax's Leap Strike. Untargetable for 0.4 s, timed to Leap Strike. Does not destroy inbound projectiles. (Aurora R Between Worlds → Jax Q Leap Strike)
- **0.29** range: Aurora's basic attacks reach 425 units farther than Jax's (550 vs 125 attack range). Jax closes the gap with Leap Strike. (Aurora basic attacks → Jax basic attacks)
- Watch out: Counter Strike dodges Aurora's basic attacks (with Spirit Abjuration).

### 8. Elise (net +0.71)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for 0.6 s; Grandmaster-at-Arms takes 0.25 s to land, enough to react. (Elise E Rappel → Jax R Grandmaster-at-Arms)
- **0.48** untargetable: Rappel makes Elise untargetable, dodging Jax's Leap Strike. Untargetable for 0.6 s, timed to Leap Strike. (Elise E Rappel → Jax Q Leap Strike)
- **0.32** range: Elise's basic attacks reach 425 units farther than Jax's (550 vs 125 attack range). Jax closes the gap with Leap Strike. (Elise basic attacks → Jax basic attacks)
- Watch out: Counter Strike dodges Elise's basic attacks (with Spider Queen).

### 9. Maokai (net +0.70)

- **0.61** untargetable: Twisted Advance makes Maokai untargetable, dodging Jax's Leap Strike. Untargetable for 1.4 s, timed to Leap Strike. (Maokai W Twisted Advance → Jax Q Leap Strike)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for 1.4 s; Grandmaster-at-Arms takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Jax R Grandmaster-at-Arms)
- **0.39** untargetable: Twisted Advance makes Maokai untargetable, dodging Jax's Counter Strike. Untargetable for 1.4 s; Counter Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Jax E Counter Strike)
- Watch out: Counter Strike dodges Maokai's basic attacks (with Sap Magic).

### 10. Kayle (net +0.66)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Jax's Grandmaster-at-Arms. Invulnerable for 2.5 s, long enough to use ahead of Grandmaster-at-Arms. (Kayle R Divine Judgment → Jax R Grandmaster-at-Arms)
- **0.36** invulnerable: Divine Judgment makes Kayle invulnerable to Jax's Leap Strike. Invulnerable for 2.5 s, long enough to use ahead of Leap Strike. (Kayle R Divine Judgment → Jax Q Leap Strike)
- **0.36** range: Kayle's basic attacks reach 500 units farther than Jax's (625 vs 125 attack range). Jax closes the gap with Leap Strike. (Kayle basic attacks → Jax basic attacks)
- Watch out: Counter Strike dodges Kayle's basic attacks (with Divine Ascent).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Vladimir | +0.85 | 1.12 | 0.27 |  |
| 2 | Yuumi | +0.83 | 1.50 | 0.67 |  |
| 3 | Lissandra | +0.83 | 1.06 | 0.23 |  |
| 4 | Bard | +0.76 | 1.17 | 0.41 |  |
| 5 | Xayah | +0.75 | 1.16 | 0.41 |  |
| 6 | Sivir | +0.74 | 1.27 | 0.53 |  |
| 7 | Aurora | +0.72 | 1.03 | 0.31 |  |
| 8 | Elise | +0.71 | 1.18 | 0.47 |  |
| 9 | Maokai | +0.70 | 0.98 | 0.28 |  |
| 10 | Kayle | +0.66 | 1.13 | 0.47 |  |
| 11 | Kindred | +0.60 | 1.13 | 0.53 |  |
| 12 | Teemo | +0.57 | 0.95 | 0.38 | blind (Blinding Dart) |
| 13 | Nocturne | +0.54 | 0.95 | 0.41 |  |
| 14 | Gwen | +0.48 | 0.86 | 0.38 |  |
| 15 | Morgana | +0.46 | 0.71 | 0.25 |  |
| 16 | Ekko | +0.44 | 0.79 | 0.35 |  |
| 17 | Shaco | +0.43 | 0.78 | 0.35 |  |
| 18 | Zed | +0.43 | 0.74 | 0.31 |  |
| 19 | Rek'Sai | +0.41 | 0.81 | 0.40 |  |
| 20 | Fiora | +0.40 | 0.91 | 0.51 |  |
| 21 | Cassiopeia | +0.37 | 0.60 | 0.23 |  |
| 22 | Camille | +0.36 | 0.77 | 0.41 |  |
| 23 | Milio | +0.32 | 0.73 | 0.41 |  |
| 24 | Hwei | +0.29 | 0.53 | 0.24 |  |
| 25 | Lulu | +0.28 | 0.66 | 0.38 |  |
| 26 | Jinx | +0.28 | 0.59 | 0.31 |  |
| 27 | Taric | +0.27 | 0.68 | 0.41 |  |
| 28 | Ahri | +0.27 | 0.50 | 0.23 |  |
| 29 | Veigar | +0.25 | 0.50 | 0.25 |  |
| 30 | Vex | +0.24 | 0.52 | 0.28 |  |
| 31 | Malzahar | +0.22 | 0.74 | 0.52 |  |
| 32 | Kayn | +0.21 | 0.78 | 0.57 |  |
| 33 | Master Yi | +0.19 | 0.86 | 0.67 |  |
| 34 | Evelynn | +0.19 | 0.78 | 0.59 |  |
| 35 | Kalista | +0.12 | 0.57 | 0.45 |  |
| 36 | Poppy | +0.12 | 0.50 | 0.38 | dash stop (Steadfast Presence) |
| 37 | Singed | +0.11 | 0.39 | 0.28 |  |
| 38 | Viktor | +0.07 | 0.59 | 0.52 |  |
| 39 | Nilah | +0.02 | 0.64 | 0.62 |  |
| 40 | Xin Zhao | -0.01 | 0.74 | 0.75 |  |
| 41 | Sion | -0.01 | 0.34 | 0.35 |  |
| 42 | Mel | -0.01 | 0.27 | 0.28 |  |
| 43 | Orianna | -0.01 | 0.27 | 0.28 |  |
| 44 | Soraka | -0.01 | 0.27 | 0.28 |  |
| 45 | Ziggs | -0.01 | 0.27 | 0.28 |  |
| 46 | Anivia | -0.01 | 0.24 | 0.25 |  |
| 47 | Zyra | -0.01 | 0.24 | 0.25 |  |
| 48 | Annie | -0.01 | 0.22 | 0.23 |  |
| 49 | Brand | -0.01 | 0.22 | 0.23 |  |
| 50 | Karma | -0.01 | 0.22 | 0.23 |  |
| 51 | LeBlanc | -0.01 | 0.22 | 0.23 |  |
| 52 | Nami | -0.01 | 0.22 | 0.23 |  |
| 53 | Neeko | -0.01 | 0.22 | 0.23 |  |
| 54 | Syndra | -0.01 | 0.22 | 0.23 |  |
| 55 | Swain | -0.01 | 0.21 | 0.22 |  |
| 56 | Heimerdinger | -0.01 | 0.20 | 0.21 |  |
| 57 | Ashe | -0.02 | 0.36 | 0.38 |  |
| 58 | Draven | -0.02 | 0.36 | 0.38 |  |
| 59 | Yunara | -0.02 | 0.36 | 0.38 |  |
| 60 | Nasus | -0.02 | 0.33 | 0.35 |  |
| 61 | Corki | -0.02 | 0.30 | 0.32 |  |
| 62 | Nidalee | -0.02 | 0.30 | 0.32 |  |
| 63 | Lux | -0.02 | 0.29 | 0.31 |  |
| 64 | Seraphine | -0.02 | 0.29 | 0.31 |  |
| 65 | Twitch | -0.03 | 0.43 | 0.46 |  |
| 66 | Vayne | -0.03 | 0.43 | 0.46 |  |
| 67 | Sona | -0.03 | 0.41 | 0.44 |  |
| 68 | Kai'Sa | -0.03 | 0.38 | 0.41 |  |
| 69 | Renata Glasc | -0.03 | 0.38 | 0.41 |  |
| 70 | Gnar | -0.03 | 0.33 | 0.36 |  |
| 71 | Zilean | -0.03 | 0.32 | 0.35 |  |
| 72 | Zoe | -0.03 | 0.32 | 0.35 |  |
| 73 | Gangplank | -0.04 | 0.44 | 0.48 |  |
| 74 | Udyr | -0.05 | 0.70 | 0.75 |  |
| 75 | Jayce | -0.05 | 0.30 | 0.35 |  |
| 76 | Samira | -0.05 | 0.30 | 0.35 |  |
| 77 | Aurelion Sol | -0.05 | 0.22 | 0.27 |  |
| 78 | Thresh | -0.06 | 0.19 | 0.25 |  |
| 79 | Olaf | -0.08 | 0.33 | 0.41 |  |
| 80 | Malphite | -0.10 | 0.21 | 0.31 |  |
| 81 | Kennen | -0.11 | 0.29 | 0.40 |  |
| 82 | Graves | -0.11 | 0.24 | 0.35 |  |
| 83 | Amumu | -0.11 | 0.17 | 0.28 |  |
| 84 | Kled | -0.12 | 0.32 | 0.44 |  |
| 85 | Smolder | -0.12 | 0.32 | 0.44 |  |
| 86 | Ivern | -0.12 | 0.19 | 0.31 |  |
| 87 | Lillia | -0.12 | 0.11 | 0.23 |  |
| 88 | Quinn | -0.13 | 0.38 | 0.51 |  |
| 89 | Rammus | -0.13 | 0.32 | 0.45 |  |
| 90 | Tristana | -0.14 | 0.36 | 0.50 |  |
| 91 | Pantheon | -0.15 | 0.85 | 1.00 |  |
| 92 | Vel'Koz | -0.15 | 0.27 | 0.42 |  |
| 93 | Caitlyn | -0.16 | 0.36 | 0.52 |  |
| 94 | Xerath | -0.17 | 0.27 | 0.44 |  |
| 95 | Shen | -0.18 | 0.56 | 0.74 |  |
| 96 | Senna | -0.18 | 0.32 | 0.50 |  |
| 97 | Rakan | -0.18 | 0.13 | 0.31 |  |
| 98 | Lucian | -0.19 | 0.36 | 0.55 |  |
| 99 | Karthus | -0.22 | 0.19 | 0.41 |  |
| 100 | Rengar | -0.23 | 0.53 | 0.76 |  |
| 101 | Janna | -0.23 | 0.36 | 0.59 |  |
| 102 | Ezreal | -0.24 | 0.32 | 0.56 |  |
| 103 | Jhin | -0.24 | 0.27 | 0.51 |  |
| 104 | Ryze | -0.24 | 0.24 | 0.48 |  |
| 105 | Urgot | -0.24 | 0.15 | 0.39 |  |
| 106 | Kha'Zix | -0.25 | 0.00 | 0.25 |  |
| 107 | Alistar | -0.26 | 0.26 | 0.52 |  |
| 108 | Miss Fortune | -0.27 | 0.32 | 0.59 |  |
| 109 | Mordekaiser | -0.27 | 0.08 | 0.35 |  |
| 110 | Ambessa | -0.27 | 0.00 | 0.27 |  |
| 111 | Diana | -0.28 | 0.00 | 0.28 |  |
| 112 | Lee Sin | -0.28 | 0.00 | 0.28 |  |
| 113 | Ornn | -0.28 | 0.00 | 0.28 |  |
| 114 | Yone | -0.29 | 0.18 | 0.47 |  |
| 115 | Akali | -0.31 | 0.00 | 0.31 |  |
| 116 | Cho'Gath | -0.31 | 0.00 | 0.31 |  |
| 117 | Illaoi | -0.31 | 0.00 | 0.31 |  |
| 118 | Kassadin | -0.31 | 0.00 | 0.31 |  |
| 119 | Leona | -0.31 | 0.00 | 0.31 |  |
| 120 | Rumble | -0.31 | 0.00 | 0.31 |  |
| 121 | Shyvana | -0.31 | 0.00 | 0.31 |  |
| 122 | Sylas | -0.31 | 0.00 | 0.31 |  |
| 123 | Qiyana | -0.32 | 0.00 | 0.32 |  |
| 124 | Kog'Maw | -0.34 | 0.27 | 0.61 |  |
| 125 | Azir | -0.35 | 0.27 | 0.62 |  |
| 126 | Taliyah | -0.35 | 0.27 | 0.62 |  |
| 127 | Varus | -0.35 | 0.27 | 0.62 |  |
| 128 | Braum | -0.35 | 0.00 | 0.35 |  |
| 129 | Hecarim | -0.35 | 0.00 | 0.35 |  |
| 130 | Nautilus | -0.35 | 0.00 | 0.35 |  |
| 131 | Sejuani | -0.35 | 0.00 | 0.35 |  |
| 132 | Skarner | -0.35 | 0.00 | 0.35 |  |
| 133 | Galio | -0.37 | 0.00 | 0.37 |  |
| 134 | Fiddlesticks | -0.38 | 0.20 | 0.58 |  |
| 135 | Jarvan IV | -0.38 | 0.00 | 0.38 |  |
| 136 | Talon | -0.38 | 0.00 | 0.38 |  |
| 137 | Aphelios | -0.39 | 0.38 | 0.77 |  |
| 138 | Pyke | -0.39 | 0.00 | 0.39 |  |
| 139 | Aatrox | -0.41 | 0.00 | 0.41 |  |
| 140 | Riven | -0.41 | 0.00 | 0.41 |  |
| 141 | Zeri | -0.43 | 0.44 | 0.87 |  |
| 142 | Sett | -0.44 | 0.00 | 0.44 |  |
| 143 | Twisted Fate | -0.45 | 0.43 | 0.88 |  |
| 144 | Yasuo | -0.45 | 0.00 | 0.45 |  |
| 145 | K'Sante | -0.46 | 0.00 | 0.46 |  |
| 146 | Tryndamere | -0.46 | 0.00 | 0.46 |  |
| 147 | Garen | -0.49 | 0.18 | 0.67 |  |
| 148 | Akshan | -0.52 | 0.34 | 0.86 |  |
| 149 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 150 | Gragas | -0.53 | 0.00 | 0.53 |  |
| 151 | Trundle | -0.53 | 0.00 | 0.53 |  |
| 152 | Zaahen | -0.54 | 0.20 | 0.74 |  |
| 153 | Darius | -0.55 | 0.00 | 0.55 |  |
| 154 | Nunu & Willump | -0.56 | 0.00 | 0.56 |  |
| 155 | Yorick | -0.60 | 0.00 | 0.60 |  |
| 156 | Locke | -0.61 | 0.00 | 0.61 |  |
| 157 | Naafiri | -0.61 | 0.00 | 0.61 |  |
| 158 | Katarina | -0.63 | 0.00 | 0.63 |  |
| 159 | Zac | -0.64 | 0.34 | 0.98 |  |
| 160 | Tahm Kench | -0.66 | 0.00 | 0.66 |  |
| 161 | Briar | -0.67 | 0.00 | 0.67 |  |
| 162 | Bel'Veth | -0.71 | 0.00 | 0.71 |  |
| 163 | Wukong | -0.71 | 0.00 | 0.71 |  |
| 164 | Vi | -0.72 | 0.00 | 0.72 |  |
| 165 | Irelia | -0.73 | 0.05 | 0.78 |  |
| 166 | Viego | -0.77 | 0.09 | 0.86 |  |
| 167 | Blitzcrank | -0.77 | 0.00 | 0.77 |  |
| 168 | Fizz | -0.82 | 0.00 | 0.82 |  |
| 169 | Renekton | -0.83 | 0.00 | 0.83 |  |
| 170 | Warwick | -1.17 | 0.29 | 1.46 |  |
| 171 | Rell | -1.19 | 0.00 | 1.19 |  |
| 172 | Volibear | -1.22 | 0.00 | 1.22 |  |
