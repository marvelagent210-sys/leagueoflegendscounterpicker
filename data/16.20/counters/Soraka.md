# Counters to Soraka (patch 26.20)

Every champion ranked by what its kit does against Soraka's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Soraka's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Soraka` for the full ledger of a matchup, with sources.

## Top 10

### 1. Morgana (net +0.61)

- **0.70** cc immunity: Black Shield makes Morgana immune to Soraka's Equinox (silence, root). Immune for 5 s, long enough to use ahead of Equinox. (Morgana E Black Shield → Soraka E Equinox)
- **0.08** cc immunity: Black Shield makes Morgana immune to Soraka's Starcall (slow). Immune for 5 s, long enough to use ahead of Starcall. (Morgana E Black Shield → Soraka Q Starcall)
- Watch out: Soraka's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

### 2. Fizz (net +0.57)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Soraka's Equinox. Untargetable for 0.75 s; Equinox takes 0.25 s to land, enough to react. (Fizz E Playful → Soraka E Equinox)
- Watch out: Soraka's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

### 3. Fiora (net +0.56)

- **0.80** parry: Riposte parries Soraka's Equinox and stuns back. Parry for 0.75 s; Equinox takes 0.25 s to land, enough to react. Negating Equinox's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Soraka E Equinox)
- **0.06** attack speed slow: Riposte cuts Soraka's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Soraka basic attacks)
- Watch out: Soraka's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### 4. Vladimir (net +0.50)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Soraka's Equinox. Untargetable for 2 s, long enough to use ahead of Equinox. (Vladimir W Sanguine Pool → Soraka E Equinox)
- Watch out: Soraka's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 5. Udyr (net +0.49)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Soraka's Equinox (silence, root). Immune for 1.5 s, long enough to use ahead of Equinox. (Udyr E Blazing Stampede → Soraka E Equinox)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Soraka's Starcall (slow). Immune for 1.5 s, long enough to use ahead of Starcall. (Udyr E Blazing Stampede → Soraka Q Starcall)
- Watch out: Soraka's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range).

### 6. Maokai (net +0.43)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Soraka's Equinox. Untargetable for 1.4 s; Equinox takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Soraka E Equinox)
- Watch out: Soraka's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 7. Samira (net +0.39)

- **0.28** projectile block: Blade Whirl blocks Soraka's Starcall, a projectile. Blade Whirl for 0.75 s; Starcall takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Soraka Q Starcall)
- **0.22** projectile block: Blade Whirl blocks Soraka's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Soraka basic attacks)

### 8. Gwen (net +0.38)

- **0.65** untargetable: Hallowed Mist makes Gwen untargetable, dodging Soraka's Equinox. Untargetable for ?; Equinox takes 0.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Soraka E Equinox)
- Watch out: Soraka's basic attacks reach 400 units farther than Gwen's (550 vs 150 attack range).

### 9. Mel (net +0.38)

- **0.27** projectile block: Rebuttal blocks Soraka's Starcall, a projectile. Rebuttal for 0.75 s; Starcall takes 0.25 s to land, enough to react. (Mel W Rebuttal → Soraka Q Starcall)
- **0.22** projectile block: Rebuttal blocks Soraka's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Soraka basic attacks)

### 10. Milio (net +0.38)

- **0.27** cleanse: Breath of Life cleanses Soraka's Equinox (silence, root) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Soraka E Equinox)
- **0.19** tenacity: Breath of Life's 65% tenacity shortens Soraka's Equinox (silence, root). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Soraka E Equinox)
- **0.05** cleanse: Breath of Life cleanses Soraka's Starcall (slow) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Soraka Q Starcall)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Morgana | +0.61 | 0.74 | 0.13 |  |
| 2 | Fizz | +0.57 | 0.70 | 0.13 |  |
| 3 | Fiora | +0.56 | 0.83 | 0.27 |  |
| 4 | Vladimir | +0.50 | 0.70 | 0.20 |  |
| 5 | Udyr | +0.49 | 0.76 | 0.27 |  |
| 6 | Maokai | +0.43 | 0.70 | 0.27 |  |
| 7 | Samira | +0.39 | 0.39 | 0.00 |  |
| 8 | Gwen | +0.38 | 0.65 | 0.27 |  |
| 9 | Mel | +0.38 | 0.38 | 0.00 |  |
| 10 | Milio | +0.38 | 0.38 | 0.00 |  |
| 11 | Bard | +0.36 | 0.36 | 0.00 |  |
| 12 | Lissandra | +0.36 | 0.36 | 0.00 |  |
| 13 | Aurora | +0.35 | 0.35 | 0.00 |  |
| 14 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 15 | Xayah | +0.35 | 0.35 | 0.00 |  |
| 16 | Sivir | +0.33 | 0.33 | 0.00 |  |
| 17 | Master Yi | +0.32 | 0.74 | 0.42 |  |
| 18 | Kayle | +0.32 | 0.32 | 0.00 |  |
| 19 | Braum | +0.30 | 0.57 | 0.27 |  |
| 20 | Kalista | +0.30 | 0.30 | 0.00 |  |
| 21 | Varus | +0.29 | 0.39 | 0.10 |  |
| 22 | Yasuo | +0.27 | 0.44 | 0.17 |  |
| 23 | Kled | +0.27 | 0.37 | 0.10 |  |
| 24 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 25 | Lulu | +0.25 | 0.25 | 0.00 |  |
| 26 | Yuumi | +0.23 | 0.70 | 0.47 |  |
| 27 | Zaahen | +0.22 | 0.39 | 0.17 |  |
| 28 | Camille | +0.22 | 0.35 | 0.13 |  |
| 29 | Rek'Sai | +0.19 | 0.36 | 0.17 |  |
| 30 | Evelynn | +0.18 | 0.36 | 0.18 |  |
| 31 | Shaco | +0.18 | 0.36 | 0.18 |  |
| 32 | Zed | +0.17 | 0.35 | 0.18 |  |
| 33 | Nocturne | +0.08 | 0.35 | 0.27 |  |
| 34 | Annie | +0.08 | 0.08 | 0.00 |  |
| 35 | Rengar | +0.07 | 0.60 | 0.53 |  |
| 36 | Gangplank | +0.06 | 0.59 | 0.53 |  |
| 37 | Aphelios | +0.06 | 0.06 | 0.00 |  |
| 38 | Heimerdinger | +0.06 | 0.06 | 0.00 |  |
| 39 | Singed | +0.05 | 0.58 | 0.53 |  |
| 40 | Alistar | +0.05 | 0.32 | 0.27 |  |
| 41 | Nilah | +0.03 | 0.25 | 0.22 |  |
| 42 | Jax | +0.01 | 0.28 | 0.27 |  |
| 43 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 44 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 45 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 46 | Azir | 0.00 | 0.00 | 0.00 |  |
| 47 | Brand | 0.00 | 0.00 | 0.00 |  |
| 48 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 49 | Corki | 0.00 | 0.00 | 0.00 |  |
| 50 | Draven | 0.00 | 0.00 | 0.00 |  |
| 51 | Elise | 0.00 | 0.00 | 0.00 |  |
| 52 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 53 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 54 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 55 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 56 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 57 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 58 | Karma | 0.00 | 0.00 | 0.00 |  |
| 59 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 60 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 61 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 62 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 63 | Lux | 0.00 | 0.00 | 0.00 |  |
| 64 | Nami | 0.00 | 0.00 | 0.00 |  |
| 65 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 66 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 67 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 68 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 69 | Senna | 0.00 | 0.00 | 0.00 |  |
| 70 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 71 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 72 | Sona | 0.00 | 0.00 | 0.00 |  |
| 73 | Swain | 0.00 | 0.00 | 0.00 |  |
| 74 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 75 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 76 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 77 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 78 | Vex | 0.00 | 0.00 | 0.00 |  |
| 79 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 80 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 81 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 82 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 83 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 84 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 85 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 86 | Malzahar | -0.01 | 0.39 | 0.40 |  |
| 87 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 88 | Graves | -0.06 | 0.00 | 0.06 |  |
| 89 | Aurelion Sol | -0.07 | 0.00 | 0.07 |  |
| 90 | Xin Zhao | -0.08 | 0.17 | 0.25 |  |
| 91 | Malphite | -0.09 | 0.18 | 0.27 |  |
| 92 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 93 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 94 | Briar | -0.13 | 0.00 | 0.13 |  |
| 95 | Jarvan IV | -0.13 | 0.00 | 0.13 |  |
| 96 | K'Sante | -0.13 | 0.00 | 0.13 |  |
| 97 | Sylas | -0.13 | 0.00 | 0.13 |  |
| 98 | Urgot | -0.13 | 0.00 | 0.13 |  |
| 99 | Yone | -0.13 | 0.00 | 0.13 |  |
| 100 | Olaf | -0.14 | 0.39 | 0.53 |  |
| 101 | Lillia | -0.15 | 0.00 | 0.15 |  |
| 102 | Katarina | -0.16 | 0.39 | 0.55 |  |
| 103 | Hecarim | -0.17 | 0.00 | 0.17 |  |
| 104 | Ivern | -0.17 | 0.00 | 0.17 |  |
| 105 | Wukong | -0.17 | 0.00 | 0.17 |  |
| 106 | Ornn | -0.17 | 0.00 | 0.17 |  |
| 107 | Quinn | -0.17 | 0.00 | 0.17 |  |
| 108 | Rell | -0.17 | 0.00 | 0.17 |  |
| 109 | Akali | -0.18 | 0.00 | 0.18 |  |
| 110 | Ambessa | -0.18 | 0.00 | 0.18 |  |
| 111 | Bel'Veth | -0.18 | 0.00 | 0.18 |  |
| 112 | Ekko | -0.18 | 0.00 | 0.18 |  |
| 113 | Lee Sin | -0.18 | 0.00 | 0.18 |  |
| 114 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 115 | Riven | -0.18 | 0.00 | 0.18 |  |
| 116 | Talon | -0.18 | 0.00 | 0.18 |  |
| 117 | Volibear | -0.18 | 0.00 | 0.18 |  |
| 118 | Sion | -0.19 | 0.42 | 0.61 |  |
| 119 | Garen | -0.22 | 0.28 | 0.50 |  |
| 120 | Rammus | -0.22 | 0.27 | 0.49 |  |
| 121 | Irelia | -0.23 | 0.00 | 0.23 |  |
| 122 | Aatrox | -0.25 | 0.00 | 0.25 |  |
| 123 | Nautilus | -0.25 | 0.00 | 0.25 |  |
| 124 | Tryndamere | -0.25 | 0.00 | 0.25 |  |
| 125 | Kayn | -0.26 | 0.36 | 0.62 |  |
| 126 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 127 | Amumu | -0.27 | 0.00 | 0.27 |  |
| 128 | Diana | -0.27 | 0.00 | 0.27 |  |
| 129 | Illaoi | -0.27 | 0.00 | 0.27 |  |
| 130 | Kassadin | -0.27 | 0.00 | 0.27 |  |
| 131 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 132 | Leona | -0.27 | 0.00 | 0.27 |  |
| 133 | Locke | -0.27 | 0.00 | 0.27 |  |
| 134 | Renekton | -0.27 | 0.00 | 0.27 |  |
| 135 | Sejuani | -0.27 | 0.00 | 0.27 |  |
| 136 | Sett | -0.27 | 0.00 | 0.27 |  |
| 137 | Shyvana | -0.27 | 0.00 | 0.27 |  |
| 138 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 139 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 140 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 141 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 142 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 143 | Pyke | -0.30 | 0.00 | 0.30 |  |
| 144 | Viego | -0.30 | 0.00 | 0.30 |  |
| 145 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 146 | Pantheon | -0.33 | 0.33 | 0.66 |  |
| 147 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 148 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 149 | Shen | -0.36 | 0.27 | 0.63 |  |
| 150 | Warwick | -0.40 | 0.41 | 0.81 |  |
| 151 | Gragas | -0.40 | 0.00 | 0.40 |  |
| 152 | Janna | -0.40 | 0.00 | 0.40 |  |
| 153 | Karthus | -0.41 | 0.00 | 0.41 |  |
| 154 | Fiddlesticks | -0.43 | 0.00 | 0.43 |  |
| 155 | Mordekaiser | -0.44 | 0.06 | 0.50 |  |
| 156 | Skarner | -0.46 | 0.07 | 0.53 |  |
| 157 | Poppy | -0.47 | 0.00 | 0.47 |  |
| 158 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 159 | Vi | -0.49 | 0.00 | 0.49 |  |
| 160 | Darius | -0.50 | 0.00 | 0.50 |  |
| 161 | Trundle | -0.50 | 0.00 | 0.50 |  |
| 162 | Yorick | -0.50 | 0.00 | 0.50 |  |
| 163 | Blitzcrank | -0.53 | 0.00 | 0.53 |  |
| 164 | Cho'Gath | -0.53 | 0.00 | 0.53 |  |
| 165 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 166 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 167 | Taric | -0.53 | 0.00 | 0.53 |  |
| 168 | Naafiri | -0.58 | 0.00 | 0.58 |  |
| 169 | Zac | -0.62 | 0.00 | 0.62 |  |
| 170 | Tahm Kench | -0.75 | 0.00 | 0.75 |  |
| 171 | Galio | -0.76 | 0.00 | 0.76 |  |
| 172 | Nunu & Willump | -0.85 | 0.14 | 0.99 |  |
