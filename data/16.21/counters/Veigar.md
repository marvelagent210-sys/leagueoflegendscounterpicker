# Counters to Veigar (patch 26.21)

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

### 6. Lissandra (net +0.65)

- **0.47** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Veigar's Primordial Burst. Untargetable for 2.5 s, long enough to use ahead of Primordial Burst. (Lissandra R Frozen Tomb → Veigar R Primordial Burst)
- **0.35** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Veigar's Event Horizon. Untargetable for 2.5 s, long enough to use ahead of Event Horizon. (Lissandra R Frozen Tomb → Veigar E Event Horizon)

### 7. Kayle (net +0.61)

- **0.47** invulnerable: Divine Judgment makes Kayle invulnerable to Veigar's Primordial Burst. Invulnerable for 2.5 s, long enough to use ahead of Primordial Burst. (Kayle R Divine Judgment → Veigar R Primordial Burst)
- **0.14** range: Kayle's basic attacks reach 75 units farther than Veigar's (625 vs 550 attack range). Veigar has no dash or blink to close the gap. (Kayle basic attacks → Veigar basic attacks)

### 8. Xayah (net +0.59)

- **0.42** untargetable: Featherstorm makes Xayah untargetable, dodging Veigar's Primordial Burst. Untargetable for 1.5 s, long enough to use ahead of Primordial Burst. (Xayah R Featherstorm → Veigar R Primordial Burst)
- **0.34** untargetable: Featherstorm makes Xayah untargetable, dodging Veigar's Event Horizon. Untargetable for 1.5 s, long enough to use ahead of Event Horizon. (Xayah R Featherstorm → Veigar E Event Horizon)

### 9. Fiora (net +0.54)

- **0.75** parry: Riposte parries Veigar's Event Horizon and stuns back. Parry for 0.75 s; Event Horizon takes 0.25 s to land, enough to react. Negating Event Horizon's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Veigar E Event Horizon)
- **0.55** parry: Riposte parries Veigar's Primordial Burst. Parry for 0.75 s; Primordial Burst takes 0.25 s to land, enough to react. (Fiora W Riposte → Veigar R Primordial Burst)
- **0.06** attack speed slow: Riposte cuts Veigar's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Veigar basic attacks)
- Watch out: Event Horizon's knockdown can stop Fiora's Lunge mid-dash.

### 10. Morgana (net +0.53)

- **0.65** cc immunity: Black Shield makes Morgana immune to Veigar's Event Horizon (knockdown, stun). Immune for 5 s, long enough to use ahead of Event Horizon. (Morgana E Black Shield → Veigar E Event Horizon)
- Watch out: Veigar's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.89 | 0.89 | 0.00 |  |
| 2 | Nocturne | +0.77 | 1.01 | 0.24 |  |
| 3 | Maokai | +0.74 | 0.98 | 0.24 |  |
| 4 | Vladimir | +0.74 | 0.93 | 0.19 |  |
| 5 | Mel | +0.74 | 0.74 | 0.00 | projectile block (Rebuttal) |
| 6 | Lissandra | +0.65 | 0.65 | 0.00 |  |
| 7 | Kayle | +0.61 | 0.61 | 0.00 |  |
| 8 | Xayah | +0.59 | 0.59 | 0.00 |  |
| 9 | Fiora | +0.54 | 1.04 | 0.50 |  |
| 10 | Morgana | +0.53 | 0.65 | 0.12 |  |
| 11 | Yuumi | +0.52 | 0.98 | 0.46 |  |
| 12 | Shaco | +0.49 | 0.65 | 0.16 |  |
| 13 | Master Yi | +0.48 | 0.89 | 0.41 |  |
| 14 | Udyr | +0.46 | 0.70 | 0.24 |  |
| 15 | Yasuo | +0.44 | 0.77 | 0.33 | projectile block (Wind Wall) |
| 16 | Zed | +0.43 | 0.59 | 0.16 |  |
| 17 | Fizz | +0.41 | 0.98 | 0.57 |  |
| 18 | Samira | +0.37 | 0.74 | 0.37 | projectile block (Blade Whirl) |
| 19 | Milio | +0.36 | 0.36 | 0.00 |  |
| 20 | Bard | +0.35 | 0.65 | 0.30 |  |
| 21 | Teemo | +0.31 | 0.31 | 0.00 |  |
| 22 | Gwen | +0.30 | 0.89 | 0.59 |  |
| 23 | Braum | +0.29 | 0.83 | 0.54 | projectile block (Unbreakable) |
| 24 | Lulu | +0.22 | 0.22 | 0.00 |  |
| 25 | Aurora | +0.17 | 0.60 | 0.43 |  |
| 26 | Evelynn | +0.16 | 0.65 | 0.49 |  |
| 27 | Rek'Sai | +0.11 | 0.66 | 0.55 |  |
| 28 | Gangplank | +0.08 | 0.56 | 0.48 |  |
| 29 | Annie | +0.08 | 0.08 | 0.00 |  |
| 30 | Kalista | +0.07 | 0.26 | 0.19 |  |
| 31 | Vex | +0.04 | 0.04 | 0.00 |  |
| 32 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 33 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 34 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 35 | Brand | 0.00 | 0.00 | 0.00 |  |
| 36 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 37 | Draven | 0.00 | 0.00 | 0.00 |  |
| 38 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 39 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 40 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 41 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 42 | Karma | 0.00 | 0.00 | 0.00 |  |
| 43 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 44 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 45 | Lux | 0.00 | 0.00 | 0.00 |  |
| 46 | Nami | 0.00 | 0.00 | 0.00 |  |
| 47 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 48 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 49 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 50 | Senna | 0.00 | 0.00 | 0.00 |  |
| 51 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 52 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 53 | Sona | 0.00 | 0.00 | 0.00 |  |
| 54 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 55 | Swain | 0.00 | 0.00 | 0.00 |  |
| 56 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 57 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 58 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 59 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 60 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 61 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 62 | Tristana | -0.03 | 0.27 | 0.30 |  |
| 63 | Malphite | -0.04 | 0.20 | 0.24 |  |
| 64 | Malzahar | -0.05 | 0.35 | 0.40 |  |
| 65 | Kayn | -0.08 | 0.65 | 0.73 |  |
| 66 | Camille | -0.09 | 0.63 | 0.72 |  |
| 67 | Zaahen | -0.10 | 0.35 | 0.45 |  |
| 68 | Varus | -0.10 | 0.00 | 0.10 |  |
| 69 | Olaf | -0.13 | 0.35 | 0.48 |  |
| 70 | Xin Zhao | -0.15 | 0.42 | 0.57 |  |
| 71 | Vayne | -0.17 | 0.00 | 0.17 |  |
| 72 | Rengar | -0.19 | 0.56 | 0.75 |  |
| 73 | Sion | -0.19 | 0.38 | 0.57 |  |
| 74 | Sett | -0.20 | 0.04 | 0.24 |  |
| 75 | Shyvana | -0.20 | 0.04 | 0.24 |  |
| 76 | Elise | -0.20 | 0.00 | 0.20 |  |
| 77 | Jayce | -0.20 | 0.00 | 0.20 |  |
| 78 | Nidalee | -0.20 | 0.00 | 0.20 |  |
| 79 | Caitlyn | -0.21 | 0.18 | 0.39 |  |
| 80 | Pantheon | -0.23 | 0.55 | 0.78 |  |
| 81 | Rammus | -0.23 | 0.24 | 0.47 |  |
| 82 | Kled | -0.24 | 0.33 | 0.57 |  |
| 83 | Nasus | -0.24 | 0.24 | 0.48 |  |
| 84 | Kassadin | -0.24 | 0.00 | 0.24 |  |
| 85 | Kindred | -0.24 | 0.00 | 0.24 |  |
| 86 | Yunara | -0.24 | 0.00 | 0.24 |  |
| 87 | Jax | -0.25 | 0.25 | 0.50 |  |
| 88 | Garen | -0.27 | 0.18 | 0.45 |  |
| 89 | Corki | -0.27 | 0.00 | 0.27 |  |
| 90 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 91 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 92 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 93 | Alistar | -0.29 | 0.28 | 0.57 |  |
| 94 | Zeri | -0.30 | 0.00 | 0.30 |  |
| 95 | Hecarim | -0.31 | 0.04 | 0.35 |  |
| 96 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 97 | Illaoi | -0.33 | 0.04 | 0.37 |  |
| 98 | Volibear | -0.33 | 0.04 | 0.37 |  |
| 99 | Nilah | -0.34 | 0.22 | 0.56 |  |
| 100 | K'Sante | -0.34 | 0.08 | 0.42 |  |
| 101 | Aurelion Sol | -0.34 | 0.00 | 0.34 |  |
| 102 | LeBlanc | -0.34 | 0.00 | 0.34 |  |
| 103 | Ahri | -0.35 | 0.00 | 0.35 |  |
| 104 | Azir | -0.35 | 0.00 | 0.35 |  |
| 105 | Kai'Sa | -0.35 | 0.00 | 0.35 |  |
| 106 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 107 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 108 | Yone | -0.36 | 0.04 | 0.40 |  |
| 109 | Lillia | -0.38 | 0.00 | 0.38 |  |
| 110 | Warwick | -0.39 | 0.40 | 0.79 |  |
| 111 | Mordekaiser | -0.39 | 0.06 | 0.45 |  |
| 112 | Ziggs | -0.39 | 0.00 | 0.39 |  |
| 113 | Janna | -0.40 | 0.00 | 0.40 |  |
| 114 | Karthus | -0.40 | 0.00 | 0.40 |  |
| 115 | Gnar | -0.41 | 0.00 | 0.41 |  |
| 116 | Quinn | -0.41 | 0.00 | 0.41 |  |
| 117 | Jarvan IV | -0.42 | 0.04 | 0.46 |  |
| 118 | Akshan | -0.42 | 0.00 | 0.42 |  |
| 119 | Bel'Veth | -0.42 | 0.00 | 0.42 |  |
| 120 | Ambessa | -0.43 | 0.00 | 0.43 |  |
| 121 | Ekko | -0.44 | 0.00 | 0.44 |  |
| 122 | Fiddlesticks | -0.44 | 0.00 | 0.44 |  |
| 123 | Lucian | -0.44 | 0.00 | 0.44 |  |
| 124 | Darius | -0.45 | 0.00 | 0.45 |  |
| 125 | Ivern | -0.45 | 0.00 | 0.45 |  |
| 126 | Thresh | -0.45 | 0.00 | 0.45 |  |
| 127 | Trundle | -0.45 | 0.00 | 0.45 |  |
| 128 | Yorick | -0.45 | 0.00 | 0.45 |  |
| 129 | Aatrox | -0.47 | 0.00 | 0.47 |  |
| 130 | Irelia | -0.47 | 0.00 | 0.47 |  |
| 131 | Blitzcrank | -0.48 | 0.00 | 0.48 |  |
| 132 | Cho'Gath | -0.48 | 0.00 | 0.48 |  |
| 133 | Dr. Mundo | -0.48 | 0.00 | 0.48 |  |
| 134 | Rumble | -0.48 | 0.00 | 0.48 |  |
| 135 | Singed | -0.48 | 0.00 | 0.48 |  |
| 136 | Skarner | -0.48 | 0.00 | 0.48 |  |
| 137 | Taric | -0.48 | 0.00 | 0.48 |  |
| 138 | Viego | -0.52 | 0.04 | 0.56 |  |
| 139 | Katarina | -0.52 | 0.00 | 0.52 |  |
| 140 | Tryndamere | -0.52 | 0.00 | 0.52 |  |
| 141 | Talon | -0.53 | 0.00 | 0.53 |  |
| 142 | Graves | -0.54 | 0.00 | 0.54 |  |
| 143 | Nautilus | -0.55 | 0.00 | 0.55 |  |
| 144 | Urgot | -0.55 | 0.00 | 0.55 |  |
| 145 | Leona | -0.57 | 0.00 | 0.57 |  |
| 146 | Locke | -0.57 | 0.00 | 0.57 |  |
| 147 | Renekton | -0.57 | 0.00 | 0.57 |  |
| 148 | Shen | -0.58 | 0.24 | 0.82 |  |
| 149 | Qiyana | -0.58 | 0.00 | 0.58 |  |
| 150 | Briar | -0.61 | 0.00 | 0.61 |  |
| 151 | Kha'Zix | -0.61 | 0.00 | 0.61 |  |
| 152 | Vi | -0.62 | 0.04 | 0.66 |  |
| 153 | Diana | -0.64 | 0.00 | 0.64 |  |
| 154 | Lee Sin | -0.64 | 0.00 | 0.64 |  |
| 155 | Poppy | -0.67 | 0.00 | 0.67 |  |
| 156 | Pyke | -0.67 | 0.00 | 0.67 |  |
| 157 | Rell | -0.67 | 0.00 | 0.67 |  |
| 158 | Wukong | -0.69 | 0.00 | 0.69 |  |
| 159 | Amumu | -0.70 | 0.00 | 0.70 |  |
| 160 | Rakan | -0.70 | 0.00 | 0.70 |  |
| 161 | Sejuani | -0.70 | 0.00 | 0.70 |  |
| 162 | Tahm Kench | -0.72 | 0.00 | 0.72 |  |
| 163 | Taliyah | -0.72 | 0.00 | 0.72 |  |
| 164 | Sylas | -0.74 | 0.00 | 0.74 |  |
| 165 | Gragas | -0.77 | 0.00 | 0.77 |  |
| 166 | Riven | -0.77 | 0.00 | 0.77 |  |
| 167 | Akali | -0.78 | 0.00 | 0.78 |  |
| 168 | Ornn | -0.80 | 0.04 | 0.84 |  |
| 169 | Galio | -0.80 | 0.00 | 0.80 |  |
| 170 | Zac | -0.81 | 0.00 | 0.81 |  |
| 171 | Naafiri | -0.87 | 0.00 | 0.87 |  |
| 172 | Nunu & Willump | -0.97 | 0.00 | 0.97 |  |
