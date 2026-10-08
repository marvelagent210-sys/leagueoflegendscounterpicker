# Counters to Syndra (patch 26.20)

Every champion ranked by what its kit does against Syndra's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Syndra's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Syndra` for the full ledger of a matchup, with sources.

## Top 10

### 1. Pantheon (net +0.97)

- **0.55** invulnerable: Aegis Assault makes Pantheon invulnerable to Syndra's Unleashed Power. Invulnerable for 1.5 s, long enough to use ahead of Unleashed Power. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Syndra R Unleashed Power)
- **0.44** death prevention: Syndra's Unleashed Power can't execute Pantheon during Aegis Assault (invulnerable). Aegis Assault lasts 1.5 s on a 18 s cooldown. (Pantheon E Aegis Assault → Syndra R Unleashed Power)
- **0.32** death prevention: Syndra's Unleashed Power can't execute Pantheon during Grand Starfall (minimum health). Grand Starfall lasts ? on a 150 s cooldown. (Pantheon R Grand Starfall → Syndra R Unleashed Power)
- Watch out: Syndra's basic attacks reach 375 units farther than Pantheon's (550 vs 175 attack range).

### 2. Kayle (net +0.97)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Syndra's Unleashed Power. Invulnerable for 2.5 s, long enough to use ahead of Unleashed Power. (Kayle R Divine Judgment → Syndra R Unleashed Power)
- **0.44** death prevention: Syndra's Unleashed Power can't execute Kayle during Divine Judgment (invulnerable). Divine Judgment lasts 2.5 s on a 80 s cooldown. (Kayle R Divine Judgment → Syndra R Unleashed Power)
- **0.18** invulnerable: Divine Judgment makes Kayle invulnerable to Syndra's Scatter the Weak (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Scatter the Weak. (Kayle R Divine Judgment → Syndra E Scatter the Weak)

### 3. Elise (net +0.95)

- **0.63** untargetable: Rappel makes Elise untargetable, dodging Syndra's Scatter the Weak. Untargetable for 0.6 s; Scatter the Weak takes 0.53 s to land, enough to react. (Elise E Rappel → Syndra E Scatter the Weak)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Syndra's Unleashed Power. Untargetable for 0.6 s; Unleashed Power takes 0.25 s to land, enough to react. (Elise E Rappel → Syndra R Unleashed Power)
- **0.19** untargetable: Rappel makes Elise untargetable, dodging Syndra's Force of Will. Untargetable for 0.6 s; Force of Will lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Syndra W Force of Will)

### 4. Fiora (net +0.88)

- **0.77** parry: Riposte parries Syndra's Scatter the Weak and stuns back. Parry for 0.75 s; Scatter the Weak takes 0.53 s to land, enough to react. Negating Scatter the Weak's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Syndra E Scatter the Weak)
- **0.55** parry: Riposte parries Syndra's Unleashed Power. Parry for 0.75 s; Unleashed Power takes 0.25 s to land, enough to react. (Fiora W Riposte → Syndra R Unleashed Power)
- **0.20** parry: Riposte parries Syndra's Force of Will. Parry for 0.75 s; Force of Will lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Syndra W Force of Will)
- Watch out: Syndra's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### 5. Sivir (net +0.86)

- **0.63** spell shield: Spell Shield's spell shield blocks Syndra's Scatter the Weak. Spell shield for 1.5 s, long enough to use ahead of Scatter the Weak. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Syndra E Scatter the Weak)
- **0.32** spell shield: Spell Shield's spell shield blocks Syndra's Force of Will. Spell shield for 1.5 s, long enough to use ahead of Force of Will. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Syndra W Force of Will)
- **0.28** spell shield: Spell Shield's spell shield blocks part of Syndra's Unleashed Power. Spell shield for 1.5 s, long enough to use ahead of Unleashed Power. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the damage of a single sphere. (Sivir E Spell Shield → Syndra R Unleashed Power)

### 6. Vladimir (net +0.85)

- **0.67** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Syndra's Scatter the Weak. Untargetable for 2 s, long enough to use ahead of Scatter the Weak. (Vladimir W Sanguine Pool → Syndra E Scatter the Weak)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Syndra's Unleashed Power. Untargetable for 2 s, long enough to use ahead of Unleashed Power. (Vladimir W Sanguine Pool → Syndra R Unleashed Power)
- **0.33** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Syndra's Force of Will. Untargetable for 2 s, long enough to use ahead of Force of Will. (Vladimir W Sanguine Pool → Syndra W Force of Will)
- Watch out: Syndra's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 7. Maokai (net +0.82)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Syndra's Scatter the Weak. Untargetable for 1.4 s; Scatter the Weak takes 0.53 s to land, enough to react. (Maokai W Twisted Advance → Syndra E Scatter the Weak)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Syndra's Unleashed Power. Untargetable for 1.4 s; Unleashed Power takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Syndra R Unleashed Power)
- **0.25** untargetable: Twisted Advance makes Maokai untargetable, dodging Syndra's Force of Will. Untargetable for 1.4 s; Force of Will lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Syndra W Force of Will)
- Watch out: Syndra's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 8. Nocturne (net +0.81)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Syndra's Scatter the Weak. Spell shield for 1.5 s, long enough to use ahead of Scatter the Weak. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Syndra E Scatter the Weak)
- **0.38** spell shield: Shroud of Darkness's spell shield blocks Syndra's Force of Will. Spell shield for 1.5 s, long enough to use ahead of Force of Will. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Syndra W Force of Will)
- **0.28** spell shield: Shroud of Darkness's spell shield blocks part of Syndra's Unleashed Power. Spell shield for 1.5 s, long enough to use ahead of Unleashed Power. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the damage of a single sphere. (Nocturne W Shroud of Darkness → Syndra R Unleashed Power)
- Watch out: Syndra's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 9. Bard (net +0.78)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Syndra's Unleashed Power. Untargetable for 2.5 s, long enough to use ahead of Unleashed Power. (Bard R Tempered Fate → Syndra R Unleashed Power)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Syndra's Scatter the Weak. Untargetable for 2.5 s, long enough to use ahead of Scatter the Weak. (Bard R Tempered Fate → Syndra E Scatter the Weak)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Syndra's Force of Will. Untargetable for 2.5 s, long enough to use ahead of Force of Will. (Bard R Tempered Fate → Syndra W Force of Will)

### 10. Lissandra (net +0.78)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Syndra's Unleashed Power. Untargetable for 2.5 s, long enough to use ahead of Unleashed Power. (Lissandra R Frozen Tomb → Syndra R Unleashed Power)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Syndra's Scatter the Weak. Untargetable for 2.5 s, long enough to use ahead of Scatter the Weak. (Lissandra R Frozen Tomb → Syndra E Scatter the Weak)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Syndra's Force of Will. Untargetable for 2.5 s, long enough to use ahead of Force of Will. (Lissandra R Frozen Tomb → Syndra W Force of Will)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Pantheon | +0.97 | 1.19 | 0.22 |  |
| 2 | Kayle | +0.97 | 0.97 | 0.00 |  |
| 3 | Elise | +0.95 | 0.95 | 0.00 |  |
| 4 | Fiora | +0.88 | 1.10 | 0.22 |  |
| 5 | Sivir | +0.86 | 0.86 | 0.00 |  |
| 6 | Vladimir | +0.85 | 1.03 | 0.18 |  |
| 7 | Maokai | +0.82 | 1.04 | 0.22 |  |
| 8 | Nocturne | +0.81 | 1.03 | 0.22 |  |
| 9 | Bard | +0.78 | 0.78 | 0.00 |  |
| 10 | Lissandra | +0.78 | 0.78 | 0.00 |  |
| 11 | Samira | +0.74 | 0.74 | 0.00 | projectile block (Blade Whirl) |
| 12 | Gwen | +0.73 | 0.95 | 0.22 |  |
| 13 | Mel | +0.73 | 0.73 | 0.00 | projectile block (Rebuttal) |
| 14 | Xayah | +0.70 | 0.70 | 0.00 |  |
| 15 | Master Yi | +0.69 | 1.08 | 0.39 |  |
| 16 | Aurora | +0.69 | 0.69 | 0.00 |  |
| 17 | Zaahen | +0.68 | 0.82 | 0.14 |  |
| 18 | Kindred | +0.66 | 0.66 | 0.00 |  |
| 19 | Rek'Sai | +0.65 | 0.79 | 0.14 |  |
| 20 | Ekko | +0.64 | 0.79 | 0.15 |  |
| 21 | Yasuo | +0.64 | 0.78 | 0.14 | projectile block (Wind Wall) |
| 22 | Kayn | +0.61 | 1.20 | 0.59 |  |
| 23 | Evelynn | +0.61 | 0.76 | 0.15 |  |
| 24 | Shaco | +0.61 | 0.76 | 0.15 |  |
| 25 | Camille | +0.61 | 0.72 | 0.11 |  |
| 26 | Morgana | +0.60 | 0.71 | 0.11 |  |
| 27 | Yuumi | +0.58 | 1.04 | 0.46 |  |
| 28 | Braum | +0.58 | 0.80 | 0.22 | projectile block (Unbreakable) |
| 29 | Udyr | +0.54 | 0.76 | 0.22 |  |
| 30 | Zed | +0.53 | 0.68 | 0.15 |  |
| 31 | Xin Zhao | +0.52 | 0.73 | 0.21 |  |
| 32 | Kog'Maw | +0.44 | 0.44 | 0.00 |  |
| 33 | Zilean | +0.44 | 0.44 | 0.00 |  |
| 34 | Milio | +0.37 | 0.37 | 0.00 |  |
| 35 | Kalista | +0.29 | 0.29 | 0.00 |  |
| 36 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 37 | Kled | +0.28 | 0.36 | 0.08 |  |
| 38 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 39 | Anivia | +0.26 | 0.26 | 0.00 |  |
| 40 | Taric | +0.23 | 0.67 | 0.44 |  |
| 41 | Tryndamere | +0.23 | 0.44 | 0.21 |  |
| 42 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 43 | Gangplank | +0.16 | 0.60 | 0.44 |  |
| 44 | Rengar | +0.16 | 0.60 | 0.44 |  |
| 45 | Aphelios | +0.10 | 0.10 | 0.00 |  |
| 46 | Heimerdinger | +0.10 | 0.10 | 0.00 |  |
| 47 | Alistar | +0.09 | 0.31 | 0.22 |  |
| 48 | Annie | +0.08 | 0.08 | 0.00 |  |
| 49 | Corki | +0.07 | 0.07 | 0.00 |  |
| 50 | Vex | +0.07 | 0.07 | 0.00 |  |
| 51 | Warwick | +0.05 | 0.46 | 0.41 |  |
| 52 | K'Sante | +0.03 | 0.14 | 0.11 |  |
| 53 | Nilah | +0.02 | 0.20 | 0.18 |  |
| 54 | Jax | +0.01 | 0.23 | 0.22 |  |
| 55 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 56 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 57 | Azir | 0.00 | 0.00 | 0.00 |  |
| 58 | Brand | 0.00 | 0.00 | 0.00 |  |
| 59 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 60 | Draven | 0.00 | 0.00 | 0.00 |  |
| 61 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 62 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 63 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 64 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 65 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 66 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 67 | Karma | 0.00 | 0.00 | 0.00 |  |
| 68 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 69 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 70 | Lux | 0.00 | 0.00 | 0.00 |  |
| 71 | Nami | 0.00 | 0.00 | 0.00 |  |
| 72 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 73 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 74 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 75 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 76 | Senna | 0.00 | 0.00 | 0.00 |  |
| 77 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 78 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 79 | Sona | 0.00 | 0.00 | 0.00 |  |
| 80 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 81 | Swain | 0.00 | 0.00 | 0.00 |  |
| 82 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 83 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 84 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 85 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 86 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 87 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 88 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 89 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 90 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 91 | Malphite | -0.01 | 0.21 | 0.22 |  |
| 92 | Malzahar | -0.02 | 0.38 | 0.40 |  |
| 93 | Garen | -0.03 | 0.38 | 0.41 |  |
| 94 | Jarvan IV | -0.03 | 0.07 | 0.10 |  |
| 95 | Yone | -0.03 | 0.07 | 0.10 |  |
| 96 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 97 | Olaf | -0.05 | 0.39 | 0.44 |  |
| 98 | Graves | -0.05 | 0.00 | 0.05 |  |
| 99 | Hecarim | -0.07 | 0.07 | 0.14 |  |
| 100 | Ornn | -0.07 | 0.07 | 0.14 |  |
| 101 | Aurelion Sol | -0.07 | 0.00 | 0.07 |  |
| 102 | Volibear | -0.08 | 0.07 | 0.15 |  |
| 103 | Rakan | -0.09 | 0.00 | 0.09 |  |
| 104 | Sion | -0.10 | 0.42 | 0.52 |  |
| 105 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 106 | Fizz | -0.10 | 0.00 | 0.10 |  |
| 107 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 108 | Varus | -0.10 | 0.00 | 0.10 |  |
| 109 | Briar | -0.11 | 0.00 | 0.11 |  |
| 110 | Urgot | -0.11 | 0.00 | 0.11 |  |
| 111 | Lillia | -0.12 | 0.00 | 0.12 |  |
| 112 | Wukong | -0.14 | 0.00 | 0.14 |  |
| 113 | Rell | -0.14 | 0.00 | 0.14 |  |
| 114 | Illaoi | -0.15 | 0.07 | 0.22 |  |
| 115 | Sett | -0.15 | 0.07 | 0.22 |  |
| 116 | Shyvana | -0.15 | 0.07 | 0.22 |  |
| 117 | Akali | -0.15 | 0.00 | 0.15 |  |
| 118 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 119 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 120 | Lee Sin | -0.15 | 0.00 | 0.15 |  |
| 121 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 122 | Riven | -0.15 | 0.00 | 0.15 |  |
| 123 | Talon | -0.15 | 0.00 | 0.15 |  |
| 124 | Ivern | -0.16 | 0.00 | 0.16 |  |
| 125 | Quinn | -0.17 | 0.00 | 0.17 |  |
| 126 | Irelia | -0.19 | 0.00 | 0.19 |  |
| 127 | Viego | -0.21 | 0.07 | 0.28 |  |
| 128 | Aatrox | -0.21 | 0.00 | 0.21 |  |
| 129 | Nautilus | -0.21 | 0.00 | 0.21 |  |
| 130 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 131 | Rammus | -0.22 | 0.22 | 0.44 |  |
| 132 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 133 | Diana | -0.22 | 0.00 | 0.22 |  |
| 134 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 135 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 136 | Leona | -0.22 | 0.00 | 0.22 |  |
| 137 | Locke | -0.22 | 0.00 | 0.22 |  |
| 138 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 139 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 140 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 141 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 142 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 143 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 144 | Pyke | -0.28 | 0.00 | 0.28 |  |
| 145 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 146 | Skarner | -0.32 | 0.12 | 0.44 |  |
| 147 | Galio | -0.32 | 0.00 | 0.32 |  |
| 148 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 149 | Zac | -0.34 | 0.25 | 0.59 |  |
| 150 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 151 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 152 | Mordekaiser | -0.36 | 0.05 | 0.41 |  |
| 153 | Gragas | -0.36 | 0.00 | 0.36 |  |
| 154 | Shen | -0.38 | 0.22 | 0.60 |  |
| 155 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 156 | Vi | -0.40 | 0.07 | 0.47 |  |
| 157 | Janna | -0.40 | 0.00 | 0.40 |  |
| 158 | Darius | -0.41 | 0.00 | 0.41 |  |
| 159 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 160 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 161 | Poppy | -0.42 | 0.00 | 0.42 |  |
| 162 | Fiddlesticks | -0.43 | 0.00 | 0.43 |  |
| 163 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 164 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 165 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 166 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 167 | Singed | -0.44 | 0.00 | 0.44 |  |
| 168 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 169 | Katarina | -0.50 | 0.00 | 0.50 |  |
| 170 | Naafiri | -0.56 | 0.00 | 0.56 |  |
| 171 | Nunu & Willump | -0.68 | 0.24 | 0.92 |  |
| 172 | Tahm Kench | -0.71 | 0.00 | 0.71 |  |
