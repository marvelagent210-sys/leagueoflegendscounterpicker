# Counters to Annie (patch 26.20)

Every champion ranked by what its kit does against Annie's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Annie's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Annie` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +0.82)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Annie's Summon: Tibbers. Untargetable for 0.6 s; Summon: Tibbers takes 0.25 s to land, enough to react. (Elise E Rappel → Annie R Summon: Tibbers)
- **0.40** untargetable: Rappel makes Elise untargetable, dodging Annie's Pyromania. Untargetable for 0.6 s, timed to Pyromania. (Elise E Rappel → Annie I Pyromania)
- **0.29** untargetable: Rappel makes Elise untargetable, dodging Annie's Disintegrate. Untargetable for 0.6 s; Disintegrate takes 0.7 s to land, enough to react. (Elise E Rappel → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 75 units farther than Elise's (625 vs 550 attack range).

### 2. Maokai (net +0.73)

- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Annie's Pyromania. Untargetable for 1.4 s, timed to Pyromania. (Maokai W Twisted Advance → Annie I Pyromania)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Annie's Summon: Tibbers. Untargetable for 1.4 s; Summon: Tibbers takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Annie R Summon: Tibbers)
- **0.35** untargetable: Twisted Advance makes Maokai untargetable, dodging Annie's Disintegrate. Untargetable for 1.4 s; Disintegrate takes 0.7 s to land, enough to react. (Maokai W Twisted Advance → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 500 units farther than Maokai's (625 vs 125 attack range).

### 3. Lissandra (net +0.73)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Annie's Summon: Tibbers. Untargetable for 2.5 s, long enough to use ahead of Summon: Tibbers. (Lissandra R Frozen Tomb → Annie R Summon: Tibbers)
- **0.26** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Annie's Pyromania. Untargetable for 2.5 s, long enough to use ahead of Pyromania. (Lissandra R Frozen Tomb → Annie I Pyromania)
- **0.24** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Annie's Disintegrate. Untargetable for 2.5 s, long enough to use ahead of Disintegrate. (Lissandra R Frozen Tomb → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 75 units farther than Lissandra's (625 vs 550 attack range).

### 4. Aurora (net +0.73)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Annie's Summon: Tibbers. Untargetable for 0.4 s; Summon: Tibbers takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Annie R Summon: Tibbers)
- **0.25** untargetable: Between Worlds makes Aurora untargetable, dodging Annie's Pyromania. Untargetable for 0.4 s, timed to Pyromania. Does not destroy inbound projectiles. (Aurora R Between Worlds → Annie I Pyromania)
- **0.23** untargetable: Between Worlds makes Aurora untargetable, dodging Annie's Disintegrate. Untargetable for 0.4 s; Disintegrate takes 0.7 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 75 units farther than Aurora's (625 vs 550 attack range).

### 5. Kayle (net +0.72)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Annie's Summon: Tibbers. Invulnerable for 2.5 s, long enough to use ahead of Summon: Tibbers. (Kayle R Divine Judgment → Annie R Summon: Tibbers)
- **0.24** invulnerable: Divine Judgment makes Kayle invulnerable to Annie's Disintegrate. Invulnerable for 2.5 s, long enough to use ahead of Disintegrate. (Kayle R Divine Judgment → Annie Q Disintegrate)
- **0.21** invulnerable: Divine Judgment makes Kayle invulnerable to Annie's Molten Shield. Invulnerable for 2.5 s, long enough to use ahead of Molten Shield. (Kayle R Divine Judgment → Annie E Molten Shield)

### 6. Fiora (net +0.70)

- **0.55** parry: Riposte parries Annie's Summon: Tibbers. Parry for 0.75 s; Summon: Tibbers takes 0.25 s to land, enough to react. (Fiora W Riposte → Annie R Summon: Tibbers)
- **0.53** parry: Riposte parries Annie's Pyromania and stuns back. Parry for 0.75 s, timed to Pyromania. Negating Pyromania's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Annie I Pyromania)
- **0.30** parry: Riposte parries Annie's Disintegrate. Parry for 0.75 s; Disintegrate takes 0.7 s to land, enough to react. (Fiora W Riposte → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 475 units farther than Fiora's (625 vs 150 attack range).

### 7. Bard (net +0.70)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Annie's Summon: Tibbers. Untargetable for 2.5 s, long enough to use ahead of Summon: Tibbers. (Bard R Tempered Fate → Annie R Summon: Tibbers)
- **0.26** untargetable: Tempered Fate makes Bard untargetable, dodging Annie's Pyromania. Untargetable for 2.5 s, long enough to use ahead of Pyromania. (Bard R Tempered Fate → Annie I Pyromania)
- **0.24** untargetable: Tempered Fate makes Bard untargetable, dodging Annie's Disintegrate. Untargetable for 2.5 s, long enough to use ahead of Disintegrate. (Bard R Tempered Fate → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 125 units farther than Bard's (625 vs 500 attack range).

### 8. Sivir (net +0.68)

- **0.55** spell shield: Spell Shield's spell shield blocks Annie's Summon: Tibbers. Spell shield for 1.5 s, long enough to use ahead of Summon: Tibbers. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Annie R Summon: Tibbers)
- **0.40** spell shield: Spell Shield's spell shield blocks Annie's Pyromania. Spell shield for 1.5 s, long enough to use ahead of Pyromania. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Annie I Pyromania)
- **0.29** spell shield: Spell Shield's spell shield blocks Annie's Disintegrate. Spell shield for 1.5 s, long enough to use ahead of Disintegrate. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 125 units farther than Sivir's (625 vs 500 attack range).

### 9. Nocturne (net +0.66)

- **0.55** spell shield: Shroud of Darkness's spell shield blocks Annie's Summon: Tibbers. Spell shield for 1.5 s, long enough to use ahead of Summon: Tibbers. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Annie R Summon: Tibbers)
- **0.50** spell shield: Shroud of Darkness's spell shield blocks Annie's Pyromania. Spell shield for 1.5 s, long enough to use ahead of Pyromania. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Annie I Pyromania)
- **0.33** spell shield: Shroud of Darkness's spell shield blocks Annie's Disintegrate. Spell shield for 1.5 s, long enough to use ahead of Disintegrate. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 500 units farther than Nocturne's (625 vs 125 attack range).

### 10. Xayah (net +0.65)

- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Annie's Summon: Tibbers. Untargetable for 1.5 s, long enough to use ahead of Summon: Tibbers. (Xayah R Featherstorm → Annie R Summon: Tibbers)
- **0.25** untargetable: Featherstorm makes Xayah untargetable, dodging Annie's Pyromania. Untargetable for 1.5 s, long enough to use ahead of Pyromania. (Xayah R Featherstorm → Annie I Pyromania)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Annie's Disintegrate. Untargetable for 1.5 s, long enough to use ahead of Disintegrate. (Xayah R Featherstorm → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 100 units farther than Xayah's (625 vs 525 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +0.82 | 0.85 | 0.03 |  |
| 2 | Maokai | +0.73 | 0.95 | 0.22 |  |
| 3 | Lissandra | +0.73 | 0.77 | 0.04 |  |
| 4 | Aurora | +0.73 | 0.75 | 0.02 |  |
| 5 | Kayle | +0.72 | 0.72 | 0.00 |  |
| 6 | Fiora | +0.70 | 0.92 | 0.22 |  |
| 7 | Bard | +0.70 | 0.77 | 0.07 |  |
| 8 | Sivir | +0.68 | 0.82 | 0.14 |  |
| 9 | Nocturne | +0.66 | 0.88 | 0.22 |  |
| 10 | Xayah | +0.65 | 0.76 | 0.11 |  |
| 11 | Camille | +0.64 | 0.75 | 0.11 |  |
| 12 | Gwen | +0.63 | 0.85 | 0.22 |  |
| 13 | Ekko | +0.63 | 0.78 | 0.15 |  |
| 14 | Vladimir | +0.62 | 0.89 | 0.27 |  |
| 15 | Rek'Sai | +0.62 | 0.77 | 0.15 |  |
| 16 | Evelynn | +0.61 | 0.76 | 0.15 |  |
| 17 | Shaco | +0.61 | 0.76 | 0.15 |  |
| 18 | Zed | +0.60 | 0.75 | 0.15 |  |
| 19 | Kindred | +0.58 | 0.65 | 0.07 |  |
| 20 | Pantheon | +0.54 | 0.79 | 0.25 |  |
| 21 | Xin Zhao | +0.50 | 0.72 | 0.22 |  |
| 22 | Yuumi | +0.48 | 1.00 | 0.52 |  |
| 23 | Master Yi | +0.40 | 0.85 | 0.45 |  |
| 24 | Braum | +0.33 | 0.55 | 0.22 |  |
| 25 | Udyr | +0.33 | 0.55 | 0.22 |  |
| 26 | Samira | +0.33 | 0.38 | 0.05 |  |
| 27 | Mel | +0.28 | 0.36 | 0.08 |  |
| 28 | Yasuo | +0.27 | 0.42 | 0.15 |  |
| 29 | Morgana | +0.24 | 0.43 | 0.19 |  |
| 30 | Taric | +0.23 | 0.67 | 0.44 |  |
| 31 | Milio | +0.17 | 0.28 | 0.11 |  |
| 32 | Kayn | +0.16 | 0.76 | 0.60 |  |
| 33 | Kalista | +0.16 | 0.20 | 0.04 |  |
| 34 | Teemo | +0.15 | 0.29 | 0.14 |  |
| 35 | Kled | +0.15 | 0.25 | 0.10 |  |
| 36 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 37 | Lulu | +0.13 | 0.21 | 0.08 |  |
| 38 | Zaahen | +0.11 | 0.26 | 0.15 |  |
| 39 | Jax | +0.01 | 0.23 | 0.22 |  |
| 40 | Rengar | 0.00 | 0.44 | 0.44 |  |
| 41 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 42 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 43 | Senna | 0.00 | 0.00 | 0.00 |  |
| 44 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 45 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 46 | Alistar | -0.01 | 0.21 | 0.22 |  |
| 47 | Nilah | -0.02 | 0.20 | 0.22 |  |
| 48 | Ahri | -0.04 | 0.00 | 0.04 |  |
| 49 | Azir | -0.04 | 0.00 | 0.04 |  |
| 50 | Corki | -0.04 | 0.00 | 0.04 |  |
| 51 | Ezreal | -0.04 | 0.00 | 0.04 |  |
| 52 | Gnar | -0.04 | 0.00 | 0.04 |  |
| 53 | Neeko | -0.04 | 0.00 | 0.04 |  |
| 54 | Vayne | -0.04 | 0.00 | 0.04 |  |
| 55 | Vex | -0.04 | 0.00 | 0.04 |  |
| 56 | Zeri | -0.04 | 0.00 | 0.04 |  |
| 57 | Ziggs | -0.04 | 0.00 | 0.04 |  |
| 58 | Zoe | -0.04 | 0.00 | 0.04 |  |
| 59 | Kai'Sa | -0.05 | 0.00 | 0.05 |  |
| 60 | LeBlanc | -0.05 | 0.00 | 0.05 |  |
| 61 | Nidalee | -0.05 | 0.00 | 0.05 |  |
| 62 | Thresh | -0.06 | 0.00 | 0.06 |  |
| 63 | Graves | -0.07 | 0.00 | 0.07 |  |
| 64 | Jayce | -0.07 | 0.00 | 0.07 |  |
| 65 | Gangplank | -0.08 | 0.36 | 0.44 |  |
| 66 | Malphite | -0.08 | 0.14 | 0.22 |  |
| 67 | Aphelios | -0.08 | 0.00 | 0.08 |  |
| 68 | Brand | -0.08 | 0.00 | 0.08 |  |
| 69 | Cassiopeia | -0.08 | 0.00 | 0.08 |  |
| 70 | Draven | -0.08 | 0.00 | 0.08 |  |
| 71 | Heimerdinger | -0.08 | 0.00 | 0.08 |  |
| 72 | Hwei | -0.08 | 0.00 | 0.08 |  |
| 73 | Kennen | -0.08 | 0.00 | 0.08 |  |
| 74 | Lux | -0.08 | 0.00 | 0.08 |  |
| 75 | Nami | -0.08 | 0.00 | 0.08 |  |
| 76 | Renata Glasc | -0.08 | 0.00 | 0.08 |  |
| 77 | Smolder | -0.08 | 0.00 | 0.08 |  |
| 78 | Sona | -0.08 | 0.00 | 0.08 |  |
| 79 | Soraka | -0.08 | 0.00 | 0.08 |  |
| 80 | Syndra | -0.08 | 0.00 | 0.08 |  |
| 81 | Twitch | -0.08 | 0.00 | 0.08 |  |
| 82 | Veigar | -0.08 | 0.00 | 0.08 |  |
| 83 | Zilean | -0.08 | 0.00 | 0.08 |  |
| 84 | Briar | -0.11 | 0.00 | 0.11 |  |
| 85 | Fizz | -0.11 | 0.00 | 0.11 |  |
| 86 | Jarvan IV | -0.11 | 0.00 | 0.11 |  |
| 87 | Jinx | -0.11 | 0.00 | 0.11 |  |
| 88 | Karma | -0.11 | 0.00 | 0.11 |  |
| 89 | K'Sante | -0.11 | 0.00 | 0.11 |  |
| 90 | Orianna | -0.11 | 0.00 | 0.11 |  |
| 91 | Seraphine | -0.11 | 0.00 | 0.11 |  |
| 92 | Swain | -0.11 | 0.00 | 0.11 |  |
| 93 | Sylas | -0.11 | 0.00 | 0.11 |  |
| 94 | Varus | -0.11 | 0.00 | 0.11 |  |
| 95 | Viktor | -0.11 | 0.00 | 0.11 |  |
| 96 | Yone | -0.11 | 0.00 | 0.11 |  |
| 97 | Aurelion Sol | -0.12 | 0.00 | 0.12 |  |
| 98 | Rakan | -0.12 | 0.00 | 0.12 |  |
| 99 | Kog'Maw | -0.14 | 0.00 | 0.14 |  |
| 100 | Akali | -0.15 | 0.00 | 0.15 |  |
| 101 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 102 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 103 | Hecarim | -0.15 | 0.00 | 0.15 |  |
| 104 | Lee Sin | -0.15 | 0.00 | 0.15 |  |
| 105 | Wukong | -0.15 | 0.00 | 0.15 |  |
| 106 | Ornn | -0.15 | 0.00 | 0.15 |  |
| 107 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 108 | Rell | -0.15 | 0.00 | 0.15 |  |
| 109 | Riven | -0.15 | 0.00 | 0.15 |  |
| 110 | Talon | -0.15 | 0.00 | 0.15 |  |
| 111 | Urgot | -0.15 | 0.00 | 0.15 |  |
| 112 | Volibear | -0.15 | 0.00 | 0.15 |  |
| 113 | Lillia | -0.16 | 0.00 | 0.16 |  |
| 114 | Warwick | -0.18 | 0.27 | 0.45 |  |
| 115 | Olaf | -0.18 | 0.26 | 0.44 |  |
| 116 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 117 | Aatrox | -0.22 | 0.00 | 0.22 |  |
| 118 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 119 | Diana | -0.22 | 0.00 | 0.22 |  |
| 120 | Illaoi | -0.22 | 0.00 | 0.22 |  |
| 121 | Irelia | -0.22 | 0.00 | 0.22 |  |
| 122 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 123 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 124 | Leona | -0.22 | 0.00 | 0.22 |  |
| 125 | Locke | -0.22 | 0.00 | 0.22 |  |
| 126 | Nautilus | -0.22 | 0.00 | 0.22 |  |
| 127 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 128 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 129 | Sett | -0.22 | 0.00 | 0.22 |  |
| 130 | Shyvana | -0.22 | 0.00 | 0.22 |  |
| 131 | Tryndamere | -0.22 | 0.00 | 0.22 |  |
| 132 | Ivern | -0.23 | 0.00 | 0.23 |  |
| 133 | Quinn | -0.24 | 0.00 | 0.24 |  |
| 134 | Malzahar | -0.26 | 0.28 | 0.54 |  |
| 135 | Rammus | -0.27 | 0.22 | 0.49 |  |
| 136 | Caitlyn | -0.28 | 0.00 | 0.28 |  |
| 137 | Sion | -0.29 | 0.28 | 0.57 |  |
| 138 | Garen | -0.30 | 0.14 | 0.44 |  |
| 139 | Pyke | -0.30 | 0.00 | 0.30 |  |
| 140 | Galio | -0.33 | 0.00 | 0.33 |  |
| 141 | Viego | -0.33 | 0.00 | 0.33 |  |
| 142 | Akshan | -0.35 | 0.00 | 0.35 |  |
| 143 | Lucian | -0.35 | 0.00 | 0.35 |  |
| 144 | Jhin | -0.36 | 0.00 | 0.36 |  |
| 145 | Miss Fortune | -0.36 | 0.00 | 0.36 |  |
| 146 | Shen | -0.38 | 0.22 | 0.60 |  |
| 147 | Gragas | -0.38 | 0.00 | 0.38 |  |
| 148 | Mordekaiser | -0.39 | 0.05 | 0.44 |  |
| 149 | Ryze | -0.39 | 0.00 | 0.39 |  |
| 150 | Vel'Koz | -0.39 | 0.00 | 0.39 |  |
| 151 | Twisted Fate | -0.40 | 0.00 | 0.40 |  |
| 152 | Poppy | -0.42 | 0.00 | 0.42 |  |
| 153 | Xerath | -0.43 | 0.00 | 0.43 |  |
| 154 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 155 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 156 | Darius | -0.44 | 0.00 | 0.44 |  |
| 157 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 158 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 159 | Singed | -0.44 | 0.00 | 0.44 |  |
| 160 | Skarner | -0.44 | 0.00 | 0.44 |  |
| 161 | Trundle | -0.44 | 0.00 | 0.44 |  |
| 162 | Yorick | -0.44 | 0.00 | 0.44 |  |
| 163 | Karthus | -0.47 | 0.00 | 0.47 |  |
| 164 | Janna | -0.48 | 0.00 | 0.48 |  |
| 165 | Fiddlesticks | -0.50 | 0.00 | 0.50 |  |
| 166 | Katarina | -0.50 | 0.00 | 0.50 |  |
| 167 | Taliyah | -0.53 | 0.00 | 0.53 |  |
| 168 | Vi | -0.53 | 0.00 | 0.53 |  |
| 169 | Naafiri | -0.56 | 0.00 | 0.56 |  |
| 170 | Zac | -0.69 | 0.00 | 0.69 |  |
| 171 | Tahm Kench | -0.72 | 0.00 | 0.72 |  |
| 172 | Nunu & Willump | -0.93 | 0.00 | 0.93 |  |
