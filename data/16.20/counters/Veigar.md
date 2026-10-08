# Counters to Veigar (patch 26.20)

Every champion ranked by what its kit does against Veigar's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Veigar's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Veigar` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +0.89)

- **0.61** spell shield: Spell Shield's spell shield blocks Veigar's Event Horizon. Spell shield for 1.5 s, long enough to use ahead of Event Horizon. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Veigar E Event Horizon)
- **0.55** spell shield: Spell Shield's spell shield blocks Veigar's Primordial Burst. Spell shield for 1.5 s, long enough to use ahead of Primordial Burst. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Veigar R Primordial Burst)

### 2. Nocturne (net +0.77)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Veigar's Event Horizon. Spell shield for 1.5 s, long enough to use ahead of Event Horizon. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Veigar E Event Horizon)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Veigar's Primordial Burst. Spell shield for 1.5 s, long enough to use ahead of Primordial Burst. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Veigar R Primordial Burst)
- **0.04** cc immunity: Paranoia is displacement immune, ignoring Veigar's Event Horizon (knockdown) during it. Only during Paranoia. (Nocturne R Paranoia → Veigar E Event Horizon)
- Watch out: Veigar's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 3. Maokai (net +0.74)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Veigar's Event Horizon. Untargetable for 1.4 s; Event Horizon takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Veigar E Event Horizon)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Veigar's Primordial Burst. Untargetable for 1.4 s; Primordial Burst takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Veigar R Primordial Burst)
- Watch out: Veigar's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 4. Vladimir (net +0.74)

- **0.65** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Veigar's Event Horizon. Untargetable for 2 s, long enough to use ahead of Event Horizon. (Vladimir W Sanguine Pool → Veigar E Event Horizon)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Veigar's Primordial Burst. Untargetable for 2 s, long enough to use ahead of Primordial Burst. (Vladimir W Sanguine Pool → Veigar R Primordial Burst)
- Watch out: Veigar's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 5. Mel (net +0.74)

- **0.55** projectile block: Rebuttal blocks Veigar's Primordial Burst, a projectile. Rebuttal for 0.75 s; Primordial Burst takes 0.25 s to land, enough to react. (Mel W Rebuttal → Veigar R Primordial Burst)
- **0.27** projectile block: Rebuttal blocks Veigar's Baleful Strike, a projectile. Rebuttal for 0.75 s; Baleful Strike takes 0.73 s to land, enough to react. (Mel W Rebuttal → Veigar Q Baleful Strike)
- **0.20** projectile block: Rebuttal blocks Veigar's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Veigar basic attacks)

### 6. Elise (net +0.69)

- **0.61** untargetable: Rappel makes Elise untargetable, dodging Veigar's Event Horizon. Untargetable for 0.6 s; Event Horizon takes 0.25 s to land, enough to react. (Elise E Rappel → Veigar E Event Horizon)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Veigar's Primordial Burst. Untargetable for 0.6 s; Primordial Burst takes 0.25 s to land, enough to react. (Elise E Rappel → Veigar R Primordial Burst)
- Watch out: Event Horizon's knockdown can stop Elise's Venomous Bite mid-dash.

### 7. Lissandra (net +0.65)

- **0.47** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Veigar's Primordial Burst. Untargetable for 2.5 s, long enough to use ahead of Primordial Burst. (Lissandra R Frozen Tomb → Veigar R Primordial Burst)
- **0.35** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Veigar's Event Horizon. Untargetable for 2.5 s, long enough to use ahead of Event Horizon. (Lissandra R Frozen Tomb → Veigar E Event Horizon)

### 8. Kayle (net +0.61)

- **0.47** invulnerable: Divine Judgment makes Kayle invulnerable to Veigar's Primordial Burst. Invulnerable for 2.5 s, long enough to use ahead of Primordial Burst. (Kayle R Divine Judgment → Veigar R Primordial Burst)
- **0.14** range: Kayle's basic attacks reach 75 units farther than Veigar's (625 vs 550 attack range). Veigar has no dash or blink to close the gap. (Kayle basic attacks → Veigar basic attacks)

### 9. Xayah (net +0.59)

- **0.42** untargetable: Featherstorm makes Xayah untargetable, dodging Veigar's Primordial Burst. Untargetable for 1.5 s, long enough to use ahead of Primordial Burst. (Xayah R Featherstorm → Veigar R Primordial Burst)
- **0.34** untargetable: Featherstorm makes Xayah untargetable, dodging Veigar's Event Horizon. Untargetable for 1.5 s, long enough to use ahead of Event Horizon. (Xayah R Featherstorm → Veigar E Event Horizon)

### 10. Fiora (net +0.54)

- **0.75** parry: Riposte parries Veigar's Event Horizon and stuns back. Parry for 0.75 s; Event Horizon takes 0.25 s to land, enough to react. Negating Event Horizon's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Veigar E Event Horizon)
- **0.55** parry: Riposte parries Veigar's Primordial Burst. Parry for 0.75 s; Primordial Burst takes 0.25 s to land, enough to react. (Fiora W Riposte → Veigar R Primordial Burst)
- **0.06** attack speed slow: Riposte cuts Veigar's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Veigar basic attacks)
- Watch out: Event Horizon's knockdown can stop Fiora's Lunge mid-dash.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.89 | 0.89 | 0.00 |  |
| 2 | Nocturne | +0.77 | 1.01 | 0.24 |  |
| 3 | Maokai | +0.74 | 0.98 | 0.24 |  |
| 4 | Vladimir | +0.74 | 0.93 | 0.19 |  |
| 5 | Mel | +0.74 | 0.74 | 0.00 | projectile block (Rebuttal) |
| 6 | Elise | +0.69 | 0.89 | 0.20 |  |
| 7 | Lissandra | +0.65 | 0.65 | 0.00 |  |
| 8 | Kayle | +0.61 | 0.61 | 0.00 |  |
| 9 | Xayah | +0.59 | 0.59 | 0.00 |  |
| 10 | Fiora | +0.54 | 1.04 | 0.50 |  |
| 11 | Morgana | +0.53 | 0.65 | 0.12 |  |
| 12 | Yuumi | +0.52 | 0.98 | 0.46 |  |
| 13 | Shaco | +0.49 | 0.65 | 0.16 |  |
| 14 | Master Yi | +0.48 | 0.89 | 0.41 |  |
| 15 | Udyr | +0.46 | 0.70 | 0.24 |  |
| 16 | Yasuo | +0.44 | 0.77 | 0.33 | projectile block (Wind Wall) |
| 17 | Zed | +0.43 | 0.59 | 0.16 |  |
| 18 | Samira | +0.37 | 0.74 | 0.37 | projectile block (Blade Whirl) |
| 19 | Milio | +0.36 | 0.36 | 0.00 |  |
| 20 | Bard | +0.35 | 0.65 | 0.30 |  |
| 21 | Ekko | +0.31 | 0.75 | 0.44 |  |
| 22 | Teemo | +0.31 | 0.31 | 0.00 |  |
| 23 | Gwen | +0.30 | 0.89 | 0.59 |  |
| 24 | Braum | +0.29 | 0.83 | 0.54 | projectile block (Unbreakable) |
| 25 | Lulu | +0.22 | 0.22 | 0.00 |  |
| 26 | Aurora | +0.17 | 0.60 | 0.43 |  |
| 27 | Evelynn | +0.16 | 0.65 | 0.49 |  |
| 28 | Kindred | +0.15 | 0.39 | 0.24 |  |
| 29 | Rek'Sai | +0.11 | 0.66 | 0.55 |  |
| 30 | Gangplank | +0.08 | 0.56 | 0.48 |  |
| 31 | Annie | +0.08 | 0.08 | 0.00 |  |
| 32 | Kalista | +0.07 | 0.26 | 0.19 |  |
| 33 | Pantheon | +0.05 | 0.55 | 0.50 |  |
| 34 | Vex | +0.04 | 0.04 | 0.00 |  |
| 35 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 36 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 37 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 38 | Brand | 0.00 | 0.00 | 0.00 |  |
| 39 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 40 | Draven | 0.00 | 0.00 | 0.00 |  |
| 41 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 42 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 43 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 44 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 45 | Karma | 0.00 | 0.00 | 0.00 |  |
| 46 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 47 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 48 | Lux | 0.00 | 0.00 | 0.00 |  |
| 49 | Nami | 0.00 | 0.00 | 0.00 |  |
| 50 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 51 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 52 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 53 | Senna | 0.00 | 0.00 | 0.00 |  |
| 54 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 55 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 56 | Sona | 0.00 | 0.00 | 0.00 |  |
| 57 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 58 | Swain | 0.00 | 0.00 | 0.00 |  |
| 59 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 60 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 61 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 62 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 63 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 64 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 65 | Warwick | -0.02 | 0.40 | 0.42 |  |
| 66 | Tristana | -0.03 | 0.27 | 0.30 |  |
| 67 | Malphite | -0.04 | 0.20 | 0.24 |  |
| 68 | Malzahar | -0.05 | 0.35 | 0.40 |  |
| 69 | Kayn | -0.08 | 0.65 | 0.73 |  |
| 70 | Camille | -0.09 | 0.63 | 0.72 |  |
| 71 | Taric | -0.09 | 0.39 | 0.48 |  |
| 72 | Zaahen | -0.10 | 0.35 | 0.45 |  |
| 73 | Varus | -0.10 | 0.00 | 0.10 |  |
| 74 | Olaf | -0.13 | 0.35 | 0.48 |  |
| 75 | Xin Zhao | -0.15 | 0.42 | 0.57 |  |
| 76 | Vayne | -0.17 | 0.00 | 0.17 |  |
| 77 | Rengar | -0.19 | 0.56 | 0.75 |  |
| 78 | Sion | -0.19 | 0.38 | 0.57 |  |
| 79 | Sett | -0.20 | 0.04 | 0.24 |  |
| 80 | Shyvana | -0.20 | 0.04 | 0.24 |  |
| 81 | Jayce | -0.20 | 0.00 | 0.20 |  |
| 82 | Nidalee | -0.20 | 0.00 | 0.20 |  |
| 83 | Caitlyn | -0.21 | 0.18 | 0.39 |  |
| 84 | Rammus | -0.23 | 0.24 | 0.47 |  |
| 85 | Corki | -0.23 | 0.04 | 0.27 |  |
| 86 | Kled | -0.24 | 0.33 | 0.57 |  |
| 87 | Nasus | -0.24 | 0.24 | 0.48 |  |
| 88 | Kassadin | -0.24 | 0.00 | 0.24 |  |
| 89 | Yunara | -0.24 | 0.00 | 0.24 |  |
| 90 | Jax | -0.25 | 0.25 | 0.50 |  |
| 91 | Garen | -0.27 | 0.18 | 0.45 |  |
| 92 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 93 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 94 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 95 | Alistar | -0.29 | 0.28 | 0.57 |  |
| 96 | Zeri | -0.30 | 0.00 | 0.30 |  |
| 97 | Hecarim | -0.31 | 0.04 | 0.35 |  |
| 98 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 99 | Illaoi | -0.33 | 0.04 | 0.37 |  |
| 100 | Volibear | -0.33 | 0.04 | 0.37 |  |
| 101 | Nilah | -0.34 | 0.22 | 0.56 |  |
| 102 | K'Sante | -0.34 | 0.08 | 0.42 |  |
| 103 | Aurelion Sol | -0.34 | 0.00 | 0.34 |  |
| 104 | LeBlanc | -0.34 | 0.00 | 0.34 |  |
| 105 | Ahri | -0.35 | 0.00 | 0.35 |  |
| 106 | Azir | -0.35 | 0.00 | 0.35 |  |
| 107 | Kai'Sa | -0.35 | 0.00 | 0.35 |  |
| 108 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 109 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 110 | Yone | -0.36 | 0.04 | 0.40 |  |
| 111 | Lillia | -0.38 | 0.00 | 0.38 |  |
| 112 | Mordekaiser | -0.39 | 0.06 | 0.45 |  |
| 113 | Ziggs | -0.39 | 0.00 | 0.39 |  |
| 114 | Janna | -0.40 | 0.00 | 0.40 |  |
| 115 | Karthus | -0.40 | 0.00 | 0.40 |  |
| 116 | Gnar | -0.41 | 0.00 | 0.41 |  |
| 117 | Quinn | -0.41 | 0.00 | 0.41 |  |
| 118 | Jarvan IV | -0.42 | 0.04 | 0.46 |  |
| 119 | Akshan | -0.42 | 0.00 | 0.42 |  |
| 120 | Bel'Veth | -0.42 | 0.00 | 0.42 |  |
| 121 | Ambessa | -0.43 | 0.00 | 0.43 |  |
| 122 | Galio | -0.43 | 0.00 | 0.43 |  |
| 123 | Fiddlesticks | -0.44 | 0.00 | 0.44 |  |
| 124 | Lucian | -0.44 | 0.00 | 0.44 |  |
| 125 | Darius | -0.45 | 0.00 | 0.45 |  |
| 126 | Ivern | -0.45 | 0.00 | 0.45 |  |
| 127 | Thresh | -0.45 | 0.00 | 0.45 |  |
| 128 | Trundle | -0.45 | 0.00 | 0.45 |  |
| 129 | Yorick | -0.45 | 0.00 | 0.45 |  |
| 130 | Aatrox | -0.47 | 0.00 | 0.47 |  |
| 131 | Irelia | -0.47 | 0.00 | 0.47 |  |
| 132 | Blitzcrank | -0.48 | 0.00 | 0.48 |  |
| 133 | Cho'Gath | -0.48 | 0.00 | 0.48 |  |
| 134 | Dr. Mundo | -0.48 | 0.00 | 0.48 |  |
| 135 | Rumble | -0.48 | 0.00 | 0.48 |  |
| 136 | Singed | -0.48 | 0.00 | 0.48 |  |
| 137 | Skarner | -0.48 | 0.00 | 0.48 |  |
| 138 | Viego | -0.52 | 0.04 | 0.56 |  |
| 139 | Katarina | -0.52 | 0.00 | 0.52 |  |
| 140 | Tryndamere | -0.52 | 0.00 | 0.52 |  |
| 141 | Talon | -0.53 | 0.00 | 0.53 |  |
| 142 | Graves | -0.54 | 0.00 | 0.54 |  |
| 143 | Nautilus | -0.55 | 0.00 | 0.55 |  |
| 144 | Urgot | -0.55 | 0.00 | 0.55 |  |
| 145 | Fizz | -0.57 | 0.00 | 0.57 |  |
| 146 | Leona | -0.57 | 0.00 | 0.57 |  |
| 147 | Locke | -0.57 | 0.00 | 0.57 |  |
| 148 | Renekton | -0.57 | 0.00 | 0.57 |  |
| 149 | Shen | -0.58 | 0.24 | 0.82 |  |
| 150 | Qiyana | -0.58 | 0.00 | 0.58 |  |
| 151 | Briar | -0.61 | 0.00 | 0.61 |  |
| 152 | Kha'Zix | -0.61 | 0.00 | 0.61 |  |
| 153 | Vi | -0.62 | 0.04 | 0.66 |  |
| 154 | Lee Sin | -0.63 | 0.00 | 0.63 |  |
| 155 | Diana | -0.64 | 0.00 | 0.64 |  |
| 156 | Poppy | -0.67 | 0.00 | 0.67 |  |
| 157 | Pyke | -0.67 | 0.00 | 0.67 |  |
| 158 | Rell | -0.67 | 0.00 | 0.67 |  |
| 159 | Wukong | -0.69 | 0.00 | 0.69 |  |
| 160 | Amumu | -0.70 | 0.00 | 0.70 |  |
| 161 | Rakan | -0.70 | 0.00 | 0.70 |  |
| 162 | Sejuani | -0.70 | 0.00 | 0.70 |  |
| 163 | Tahm Kench | -0.72 | 0.00 | 0.72 |  |
| 164 | Taliyah | -0.72 | 0.00 | 0.72 |  |
| 165 | Sylas | -0.74 | 0.00 | 0.74 |  |
| 166 | Gragas | -0.77 | 0.00 | 0.77 |  |
| 167 | Riven | -0.77 | 0.00 | 0.77 |  |
| 168 | Akali | -0.78 | 0.00 | 0.78 |  |
| 169 | Ornn | -0.80 | 0.04 | 0.84 |  |
| 170 | Zac | -0.81 | 0.00 | 0.81 |  |
| 171 | Naafiri | -0.87 | 0.00 | 0.87 |  |
| 172 | Nunu & Willump | -0.97 | 0.00 | 0.97 |  |
