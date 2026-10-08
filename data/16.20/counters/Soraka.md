# Counters to Soraka (patch 26.20)

Every champion ranked by what its kit does against Soraka's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Soraka's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Soraka` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +0.65)

- **0.65** untargetable: Rappel makes Elise untargetable, dodging Soraka's Equinox. Untargetable for 0.6 s; Equinox takes 0.25 s to land, enough to react. (Elise E Rappel → Soraka E Equinox)

### 2. Morgana (net +0.61)

- **0.70** cc immunity: Black Shield makes Morgana immune to Soraka's Equinox (silence, root). Immune for 5 s, long enough to use ahead of Equinox. (Morgana E Black Shield → Soraka E Equinox)
- **0.08** cc immunity: Black Shield makes Morgana immune to Soraka's Starcall (slow). Immune for 5 s, long enough to use ahead of Starcall. (Morgana E Black Shield → Soraka Q Starcall)
- Watch out: Soraka's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

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
| 1 | Elise | +0.65 | 0.65 | 0.00 |  |
| 2 | Morgana | +0.61 | 0.74 | 0.13 |  |
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
| 27 | Ekko | +0.23 | 0.41 | 0.18 |  |
| 28 | Zaahen | +0.22 | 0.39 | 0.17 |  |
| 29 | Camille | +0.22 | 0.35 | 0.13 |  |
| 30 | Rek'Sai | +0.19 | 0.36 | 0.17 |  |
| 31 | Evelynn | +0.18 | 0.36 | 0.18 |  |
| 32 | Shaco | +0.18 | 0.36 | 0.18 |  |
| 33 | Zed | +0.17 | 0.35 | 0.18 |  |
| 34 | Kindred | +0.17 | 0.17 | 0.00 |  |
| 35 | Nocturne | +0.08 | 0.35 | 0.27 |  |
| 36 | Pantheon | +0.08 | 0.33 | 0.25 |  |
| 37 | Annie | +0.08 | 0.08 | 0.00 |  |
| 38 | Rengar | +0.07 | 0.60 | 0.53 |  |
| 39 | Gangplank | +0.06 | 0.59 | 0.53 |  |
| 40 | Aphelios | +0.06 | 0.06 | 0.00 |  |
| 41 | Heimerdinger | +0.06 | 0.06 | 0.00 |  |
| 42 | Singed | +0.05 | 0.58 | 0.53 |  |
| 43 | Alistar | +0.05 | 0.32 | 0.27 |  |
| 44 | Nilah | +0.03 | 0.25 | 0.22 |  |
| 45 | Jax | +0.01 | 0.28 | 0.27 |  |
| 46 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 47 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 48 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 49 | Azir | 0.00 | 0.00 | 0.00 |  |
| 50 | Brand | 0.00 | 0.00 | 0.00 |  |
| 51 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 52 | Corki | 0.00 | 0.00 | 0.00 |  |
| 53 | Draven | 0.00 | 0.00 | 0.00 |  |
| 54 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 55 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 56 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 57 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 58 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 59 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 60 | Karma | 0.00 | 0.00 | 0.00 |  |
| 61 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 62 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 63 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 64 | Lux | 0.00 | 0.00 | 0.00 |  |
| 65 | Nami | 0.00 | 0.00 | 0.00 |  |
| 66 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 67 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 68 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 69 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 70 | Senna | 0.00 | 0.00 | 0.00 |  |
| 71 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 72 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 73 | Sona | 0.00 | 0.00 | 0.00 |  |
| 74 | Swain | 0.00 | 0.00 | 0.00 |  |
| 75 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 76 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 77 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 78 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 79 | Vex | 0.00 | 0.00 | 0.00 |  |
| 80 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 81 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 82 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 83 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 84 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 85 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 86 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 87 | Malzahar | -0.01 | 0.39 | 0.40 |  |
| 88 | Warwick | -0.02 | 0.41 | 0.43 |  |
| 89 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 90 | Graves | -0.06 | 0.00 | 0.06 |  |
| 91 | Aurelion Sol | -0.07 | 0.00 | 0.07 |  |
| 92 | Xin Zhao | -0.08 | 0.17 | 0.25 |  |
| 93 | Malphite | -0.09 | 0.18 | 0.27 |  |
| 94 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 95 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 96 | Briar | -0.13 | 0.00 | 0.13 |  |
| 97 | Fizz | -0.13 | 0.00 | 0.13 |  |
| 98 | Jarvan IV | -0.13 | 0.00 | 0.13 |  |
| 99 | K'Sante | -0.13 | 0.00 | 0.13 |  |
| 100 | Sylas | -0.13 | 0.00 | 0.13 |  |
| 101 | Urgot | -0.13 | 0.00 | 0.13 |  |
| 102 | Yone | -0.13 | 0.00 | 0.13 |  |
| 103 | Olaf | -0.14 | 0.39 | 0.53 |  |
| 104 | Lillia | -0.15 | 0.00 | 0.15 |  |
| 105 | Katarina | -0.16 | 0.39 | 0.55 |  |
| 106 | Hecarim | -0.17 | 0.00 | 0.17 |  |
| 107 | Ivern | -0.17 | 0.00 | 0.17 |  |
| 108 | Wukong | -0.17 | 0.00 | 0.17 |  |
| 109 | Ornn | -0.17 | 0.00 | 0.17 |  |
| 110 | Quinn | -0.17 | 0.00 | 0.17 |  |
| 111 | Rell | -0.17 | 0.00 | 0.17 |  |
| 112 | Akali | -0.18 | 0.00 | 0.18 |  |
| 113 | Ambessa | -0.18 | 0.00 | 0.18 |  |
| 114 | Bel'Veth | -0.18 | 0.00 | 0.18 |  |
| 115 | Lee Sin | -0.18 | 0.00 | 0.18 |  |
| 116 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 117 | Riven | -0.18 | 0.00 | 0.18 |  |
| 118 | Talon | -0.18 | 0.00 | 0.18 |  |
| 119 | Volibear | -0.18 | 0.00 | 0.18 |  |
| 120 | Sion | -0.19 | 0.42 | 0.61 |  |
| 121 | Garen | -0.22 | 0.28 | 0.50 |  |
| 122 | Rammus | -0.22 | 0.27 | 0.49 |  |
| 123 | Irelia | -0.23 | 0.00 | 0.23 |  |
| 124 | Aatrox | -0.25 | 0.00 | 0.25 |  |
| 125 | Nautilus | -0.25 | 0.00 | 0.25 |  |
| 126 | Tryndamere | -0.25 | 0.00 | 0.25 |  |
| 127 | Kayn | -0.26 | 0.36 | 0.62 |  |
| 128 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 129 | Amumu | -0.27 | 0.00 | 0.27 |  |
| 130 | Diana | -0.27 | 0.00 | 0.27 |  |
| 131 | Illaoi | -0.27 | 0.00 | 0.27 |  |
| 132 | Kassadin | -0.27 | 0.00 | 0.27 |  |
| 133 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 134 | Leona | -0.27 | 0.00 | 0.27 |  |
| 135 | Locke | -0.27 | 0.00 | 0.27 |  |
| 136 | Renekton | -0.27 | 0.00 | 0.27 |  |
| 137 | Sejuani | -0.27 | 0.00 | 0.27 |  |
| 138 | Sett | -0.27 | 0.00 | 0.27 |  |
| 139 | Shyvana | -0.27 | 0.00 | 0.27 |  |
| 140 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 141 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 142 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 143 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 144 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 145 | Pyke | -0.30 | 0.00 | 0.30 |  |
| 146 | Viego | -0.30 | 0.00 | 0.30 |  |
| 147 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 148 | Galio | -0.34 | 0.00 | 0.34 |  |
| 149 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 150 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 151 | Shen | -0.36 | 0.27 | 0.63 |  |
| 152 | Taric | -0.36 | 0.17 | 0.53 |  |
| 153 | Gragas | -0.40 | 0.00 | 0.40 |  |
| 154 | Janna | -0.40 | 0.00 | 0.40 |  |
| 155 | Karthus | -0.41 | 0.00 | 0.41 |  |
| 156 | Fiddlesticks | -0.43 | 0.00 | 0.43 |  |
| 157 | Mordekaiser | -0.44 | 0.06 | 0.50 |  |
| 158 | Skarner | -0.46 | 0.07 | 0.53 |  |
| 159 | Poppy | -0.47 | 0.00 | 0.47 |  |
| 160 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 161 | Vi | -0.49 | 0.00 | 0.49 |  |
| 162 | Darius | -0.50 | 0.00 | 0.50 |  |
| 163 | Trundle | -0.50 | 0.00 | 0.50 |  |
| 164 | Yorick | -0.50 | 0.00 | 0.50 |  |
| 165 | Blitzcrank | -0.53 | 0.00 | 0.53 |  |
| 166 | Cho'Gath | -0.53 | 0.00 | 0.53 |  |
| 167 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 168 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 169 | Naafiri | -0.58 | 0.00 | 0.58 |  |
| 170 | Zac | -0.62 | 0.00 | 0.62 |  |
| 171 | Tahm Kench | -0.75 | 0.00 | 0.75 |  |
| 172 | Nunu & Willump | -0.85 | 0.14 | 0.99 |  |
