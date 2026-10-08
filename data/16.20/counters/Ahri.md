# Counters to Ahri (patch 26.20)

Every champion ranked by what its kit does against Ahri's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ahri's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ahri` for the full ledger of a matchup, with sources.

## Top 10

### 1. Mel (net +1.03)

- **0.70** projectile block: Rebuttal blocks Ahri's Spirit Rush, a projectile. Rebuttal for 0.75 s; Spirit Rush takes 0.42 s to land, enough to react. (Mel W Rebuttal → Ahri R Spirit Rush)
- **0.47** projectile block: Rebuttal blocks Ahri's Charm, a projectile. Rebuttal for 0.75 s; Charm takes 0.9 s to land, enough to react. (Mel W Rebuttal → Ahri E Charm)
- **0.25** projectile block: Rebuttal blocks Ahri's Orb of Deception, a projectile. Rebuttal for 0.75 s; Orb of Deception takes 0.83 s to land, enough to react. (Mel W Rebuttal → Ahri Q Orb of Deception)

### 2. Sivir (net +0.98)

- **0.70** spell shield: Spell Shield's spell shield blocks Ahri's Spirit Rush. Spell shield for 1.5 s, long enough to use ahead of Spirit Rush. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ahri R Spirit Rush)
- **0.56** spell shield: Spell Shield's spell shield blocks Ahri's Charm. Spell shield for 1.5 s, long enough to use ahead of Charm. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ahri E Charm)

### 3. Lissandra (net +0.96)

- **0.70** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ahri's Spirit Rush. Untargetable for 2.5 s, long enough to use ahead of Spirit Rush. (Lissandra R Frozen Tomb → Ahri R Spirit Rush)
- **0.35** dash stop: Frozen Tomb's knockdown can stop Ahri's Spirit Rush mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Ahri R Spirit Rush)
- **0.34** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ahri's Charm. Untargetable for 2.5 s, long enough to use ahead of Charm. (Lissandra R Frozen Tomb → Ahri E Charm)

### 4. Nocturne (net +0.87)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Ahri's Charm. Spell shield for 1.5 s, long enough to use ahead of Charm. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ahri E Charm)
- **0.70** spell shield: Shroud of Darkness's spell shield blocks Ahri's Spirit Rush. Spell shield for 1.5 s, long enough to use ahead of Spirit Rush. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ahri R Spirit Rush)
- **0.04** cc immunity: Paranoia is displacement immune, ignoring Ahri's Charm (knockdown) during it. Only during Paranoia. (Nocturne R Paranoia → Ahri E Charm)
- Watch out: Ahri's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 5. Xayah (net +0.87)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Ahri's Spirit Rush. Untargetable for 1.5 s, long enough to use ahead of Spirit Rush. (Xayah R Featherstorm → Ahri R Spirit Rush)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Ahri's Charm. Untargetable for 1.5 s, long enough to use ahead of Charm. (Xayah R Featherstorm → Ahri E Charm)

### 6. Kayle (net +0.86)

- **0.70** invulnerable: Divine Judgment makes Kayle invulnerable to Ahri's Spirit Rush. Invulnerable for 2.5 s, long enough to use ahead of Spirit Rush. (Kayle R Divine Judgment → Ahri R Spirit Rush)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Ahri's Charm (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Charm. (Kayle R Divine Judgment → Ahri E Charm)
- **0.07** range: Kayle's basic attacks reach 75 units farther than Ahri's (625 vs 550 attack range). Ahri closes the gap with Spirit Rush. (Kayle basic attacks → Ahri basic attacks)

### 7. Maokai (net +0.83)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Ahri's Charm. Untargetable for 1.4 s; Charm takes 0.9 s to land, enough to react. (Maokai W Twisted Advance → Ahri E Charm)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Ahri's Spirit Rush. Untargetable for 1.4 s; Spirit Rush takes 0.42 s to land, enough to react. (Maokai W Twisted Advance → Ahri R Spirit Rush)
- Watch out: Ahri's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 8. Vladimir (net +0.82)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ahri's Spirit Rush. Untargetable for 2 s, long enough to use ahead of Spirit Rush. (Vladimir W Sanguine Pool → Ahri R Spirit Rush)
- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ahri's Charm. Untargetable for 2 s, long enough to use ahead of Charm. (Vladimir W Sanguine Pool → Ahri E Charm)
- Watch out: Ahri's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 9. Yasuo (net +0.79)

- **0.70** projectile block: Wind Wall blocks Ahri's Spirit Rush, a projectile. Wind Wall for 4 s, long enough to use ahead of Spirit Rush. (Yasuo W Wind Wall → Ahri R Spirit Rush)
- **0.58** projectile block: Wind Wall blocks Ahri's Charm, a projectile. Wind Wall for 4 s, long enough to use ahead of Charm. (Yasuo W Wind Wall → Ahri E Charm)
- **0.29** projectile block: Wind Wall blocks Ahri's Orb of Deception, a projectile. Wind Wall for 4 s, long enough to use ahead of Orb of Deception. (Yasuo W Wind Wall → Ahri Q Orb of Deception)
- Watch out: Charm's knockdown can stop Yasuo's Sweeping Blade mid-dash.

### 10. Elise (net +0.77)

- **0.70** untargetable: Rappel makes Elise untargetable, dodging Ahri's Spirit Rush. Untargetable for 0.6 s; Spirit Rush takes 0.42 s to land, enough to react. (Elise E Rappel → Ahri R Spirit Rush)
- **0.56** untargetable: Rappel makes Elise untargetable, dodging Ahri's Charm. Untargetable for 0.6 s; Charm takes 0.9 s to land, enough to react. (Elise E Rappel → Ahri E Charm)
- Watch out: Charm's knockdown can stop Elise's Venomous Bite mid-dash.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Mel | +1.03 | 1.03 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 2 | Sivir | +0.98 | 0.98 | 0.00 |  |
| 3 | Lissandra | +0.96 | 0.96 | 0.00 |  |
| 4 | Nocturne | +0.87 | 1.09 | 0.22 |  |
| 5 | Xayah | +0.87 | 0.87 | 0.00 |  |
| 6 | Kayle | +0.86 | 0.86 | 0.00 |  |
| 7 | Maokai | +0.83 | 1.05 | 0.22 |  |
| 8 | Vladimir | +0.82 | 1.00 | 0.18 |  |
| 9 | Yasuo | +0.79 | 1.11 | 0.32 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 10 | Elise | +0.77 | 0.98 | 0.21 |  |
| 11 | Shaco | +0.72 | 0.87 | 0.15 |  |
| 12 | Zed | +0.72 | 0.87 | 0.15 |  |
| 13 | Master Yi | +0.69 | 1.10 | 0.41 |  |
| 14 | Braum | +0.68 | 1.22 | 0.54 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 15 | Samira | +0.66 | 1.06 | 0.40 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 16 | Yuumi | +0.58 | 1.05 | 0.47 |  |
| 17 | Bard | +0.57 | 0.87 | 0.30 |  |
| 18 | Fiora | +0.56 | 1.06 | 0.50 |  |
| 19 | Morgana | +0.49 | 0.60 | 0.11 |  |
| 20 | Udyr | +0.48 | 0.70 | 0.22 |  |
| 21 | Kindred | +0.45 | 0.71 | 0.26 |  |
| 22 | Ekko | +0.44 | 0.89 | 0.45 |  |
| 23 | Aurora | +0.44 | 0.88 | 0.44 |  |
| 24 | Vex | +0.39 | 0.39 | 0.00 |  |
| 25 | Gwen | +0.38 | 0.98 | 0.60 |  |
| 26 | Evelynn | +0.36 | 0.87 | 0.51 |  |
| 27 | Milio | +0.36 | 0.36 | 0.00 |  |
| 28 | Hwei | +0.35 | 0.35 | 0.00 |  |
| 29 | Jinx | +0.35 | 0.35 | 0.00 |  |
| 30 | Veigar | +0.35 | 0.35 | 0.00 |  |
| 31 | Viktor | +0.35 | 0.35 | 0.00 |  |
| 32 | Rek'Sai | +0.34 | 0.88 | 0.54 |  |
| 33 | Cassiopeia | +0.33 | 0.33 | 0.00 |  |
| 34 | Pantheon | +0.31 | 0.84 | 0.53 |  |
| 35 | Malzahar | +0.30 | 0.70 | 0.40 |  |
| 36 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 37 | Taric | +0.27 | 0.71 | 0.44 |  |
| 38 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 39 | Xin Zhao | +0.19 | 0.78 | 0.59 |  |
| 40 | Kayn | +0.15 | 0.87 | 0.72 |  |
| 41 | Warwick | +0.13 | 0.56 | 0.43 |  |
| 42 | Camille | +0.12 | 0.88 | 0.76 |  |
| 43 | Singed | +0.08 | 0.52 | 0.44 |  |
| 44 | Gangplank | +0.07 | 0.51 | 0.44 |  |
| 45 | Aphelios | +0.07 | 0.07 | 0.00 |  |
| 46 | Heimerdinger | +0.07 | 0.07 | 0.00 |  |
| 47 | Kalista | +0.06 | 0.26 | 0.20 |  |
| 48 | Annie | +0.04 | 0.04 | 0.00 |  |
| 49 | Varus | +0.01 | 0.12 | 0.11 |  |
| 50 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 51 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 52 | Brand | 0.00 | 0.00 | 0.00 |  |
| 53 | Draven | 0.00 | 0.00 | 0.00 |  |
| 54 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 55 | Karma | 0.00 | 0.00 | 0.00 |  |
| 56 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 57 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 58 | Lux | 0.00 | 0.00 | 0.00 |  |
| 59 | Nami | 0.00 | 0.00 | 0.00 |  |
| 60 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 61 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 62 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 63 | Senna | 0.00 | 0.00 | 0.00 |  |
| 64 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 65 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 66 | Sona | 0.00 | 0.00 | 0.00 |  |
| 67 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 68 | Swain | 0.00 | 0.00 | 0.00 |  |
| 69 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 70 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 71 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 72 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 73 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 74 | Yone | -0.01 | 0.39 | 0.40 |  |
| 75 | Malphite | -0.04 | 0.18 | 0.22 |  |
| 76 | Garen | -0.09 | 0.32 | 0.41 |  |
| 77 | Olaf | -0.10 | 0.34 | 0.44 |  |
| 78 | Zaahen | -0.12 | 0.34 | 0.46 |  |
| 79 | Mordekaiser | -0.12 | 0.29 | 0.41 |  |
| 80 | Tristana | -0.16 | 0.14 | 0.30 |  |
| 81 | Rengar | -0.17 | 0.56 | 0.73 |  |
| 82 | Sion | -0.17 | 0.36 | 0.53 |  |
| 83 | Sett | -0.18 | 0.04 | 0.22 |  |
| 84 | Shyvana | -0.18 | 0.04 | 0.22 |  |
| 85 | Vayne | -0.18 | 0.00 | 0.18 |  |
| 86 | Jayce | -0.21 | 0.00 | 0.21 |  |
| 87 | Nidalee | -0.21 | 0.00 | 0.21 |  |
| 88 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 89 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 90 | Poppy | -0.24 | 0.44 | 0.68 |  |
| 91 | Rammus | -0.24 | 0.22 | 0.46 |  |
| 92 | Corki | -0.26 | 0.04 | 0.30 |  |
| 93 | Yunara | -0.26 | 0.00 | 0.26 |  |
| 94 | Jax | -0.27 | 0.23 | 0.50 |  |
| 95 | Kled | -0.28 | 0.33 | 0.61 |  |
| 96 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 97 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 98 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 99 | Hecarim | -0.30 | 0.04 | 0.34 |  |
| 100 | Zeri | -0.30 | 0.00 | 0.30 |  |
| 101 | Alistar | -0.31 | 0.27 | 0.58 |  |
| 102 | Caitlyn | -0.31 | 0.09 | 0.40 |  |
| 103 | Illaoi | -0.32 | 0.04 | 0.36 |  |
| 104 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 105 | Volibear | -0.34 | 0.04 | 0.38 |  |
| 106 | Aurelion Sol | -0.34 | 0.00 | 0.34 |  |
| 107 | Skarner | -0.35 | 0.09 | 0.44 |  |
| 108 | K'Sante | -0.35 | 0.08 | 0.43 |  |
| 109 | Kai'Sa | -0.35 | 0.00 | 0.35 |  |
| 110 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 111 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 112 | Azir | -0.36 | 0.00 | 0.36 |  |
| 113 | LeBlanc | -0.36 | 0.00 | 0.36 |  |
| 114 | Amumu | -0.37 | 0.35 | 0.72 |  |
| 115 | Nilah | -0.38 | 0.20 | 0.58 |  |
| 116 | Katarina | -0.38 | 0.12 | 0.50 |  |
| 117 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 118 | Lillia | -0.39 | 0.00 | 0.39 |  |
| 119 | Janna | -0.40 | 0.00 | 0.40 |  |
| 120 | Bel'Veth | -0.41 | 0.00 | 0.41 |  |
| 121 | Darius | -0.41 | 0.00 | 0.41 |  |
| 122 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 123 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 124 | Jarvan IV | -0.43 | 0.04 | 0.47 |  |
| 125 | Galio | -0.43 | 0.00 | 0.43 |  |
| 126 | Quinn | -0.43 | 0.00 | 0.43 |  |
| 127 | Ziggs | -0.43 | 0.00 | 0.43 |  |
| 128 | Akshan | -0.44 | 0.00 | 0.44 |  |
| 129 | Ambessa | -0.44 | 0.00 | 0.44 |  |
| 130 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 131 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 132 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 133 | Fiddlesticks | -0.44 | 0.00 | 0.44 |  |
| 134 | Lucian | -0.44 | 0.00 | 0.44 |  |
| 135 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 136 | Gnar | -0.45 | 0.00 | 0.45 |  |
| 137 | Aatrox | -0.47 | 0.00 | 0.47 |  |
| 138 | Irelia | -0.47 | 0.00 | 0.47 |  |
| 139 | Thresh | -0.48 | 0.00 | 0.48 |  |
| 140 | Ivern | -0.49 | 0.00 | 0.49 |  |
| 141 | Zac | -0.51 | 0.35 | 0.86 |  |
| 142 | Tryndamere | -0.53 | 0.00 | 0.53 |  |
| 143 | Urgot | -0.54 | 0.00 | 0.54 |  |
| 144 | Graves | -0.55 | 0.00 | 0.55 |  |
| 145 | Talon | -0.55 | 0.00 | 0.55 |  |
| 146 | Viego | -0.56 | 0.04 | 0.60 |  |
| 147 | Leona | -0.57 | 0.00 | 0.57 |  |
| 148 | Nautilus | -0.57 | 0.00 | 0.57 |  |
| 149 | Locke | -0.58 | 0.00 | 0.58 |  |
| 150 | Renekton | -0.58 | 0.00 | 0.58 |  |
| 151 | Fizz | -0.60 | 0.00 | 0.60 |  |
| 152 | Qiyana | -0.60 | 0.00 | 0.60 |  |
| 153 | Shen | -0.61 | 0.22 | 0.83 |  |
| 154 | Diana | -0.62 | 0.00 | 0.62 |  |
| 155 | Kha'Zix | -0.62 | 0.00 | 0.62 |  |
| 156 | Vi | -0.64 | 0.04 | 0.68 |  |
| 157 | Briar | -0.64 | 0.00 | 0.64 |  |
| 158 | Lee Sin | -0.66 | 0.00 | 0.66 |  |
| 159 | Wukong | -0.69 | 0.00 | 0.69 |  |
| 160 | Pyke | -0.70 | 0.00 | 0.70 |  |
| 161 | Rell | -0.71 | 0.00 | 0.71 |  |
| 162 | Tahm Kench | -0.71 | 0.00 | 0.71 |  |
| 163 | Nunu & Willump | -0.72 | 0.21 | 0.93 |  |
| 164 | Sejuani | -0.72 | 0.00 | 0.72 |  |
| 165 | Taliyah | -0.72 | 0.00 | 0.72 |  |
| 166 | Rakan | -0.74 | 0.00 | 0.74 |  |
| 167 | Akali | -0.78 | 0.00 | 0.78 |  |
| 168 | Riven | -0.79 | 0.00 | 0.79 |  |
| 169 | Sylas | -0.79 | 0.00 | 0.79 |  |
| 170 | Ornn | -0.80 | 0.04 | 0.84 |  |
| 171 | Gragas | -0.80 | 0.00 | 0.80 |  |
| 172 | Naafiri | -0.86 | 0.00 | 0.86 |  |
