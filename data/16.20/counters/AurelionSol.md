# Counters to Aurelion Sol (patch 26.20)

Every champion ranked by what its kit does against Aurelion Sol's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Aurelion Sol's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> AurelionSol` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +1.17)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Aurelion Sol's Falling Star. Spell shield for 1.5 s, long enough to use ahead of Falling Star. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Aurelion Sol R Falling Star)
- **0.72** spell shield: Shroud of Darkness's spell shield blocks Aurelion Sol's The Skies Descend. Spell shield for 1.5 s, long enough to use ahead of The Skies Descend. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Aurelion Sol R The Skies Descend)
- **0.23** spell shield: Shroud of Darkness's spell shield blocks part of Aurelion Sol's Singularity. Spell shield for 1.5 s, long enough to use ahead of Singularity. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block a single instance of damage. (Nocturne W Shroud of Darkness → Aurelion Sol E Singularity)
- Watch out: Aurelion Sol's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 2. Sivir (net +1.14)

- **0.80** spell shield: Spell Shield's spell shield blocks Aurelion Sol's Falling Star. Spell shield for 1.5 s, long enough to use ahead of Falling Star. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Aurelion Sol R Falling Star)
- **0.59** spell shield: Spell Shield's spell shield blocks Aurelion Sol's The Skies Descend. Spell shield for 1.5 s, long enough to use ahead of The Skies Descend. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Aurelion Sol R The Skies Descend)
- **0.18** spell shield: Spell Shield's spell shield blocks part of Aurelion Sol's Singularity. Spell shield for 1.5 s, long enough to use ahead of Singularity. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block a single instance of damage. (Sivir E Spell Shield → Aurelion Sol E Singularity)

### 3. Lissandra (net +1.07)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Aurelion Sol's Falling Star. Untargetable for 2.5 s, long enough to use ahead of Falling Star. (Lissandra R Frozen Tomb → Aurelion Sol R Falling Star)
- **0.38** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Aurelion Sol's The Skies Descend. Untargetable for 2.5 s, long enough to use ahead of The Skies Descend. (Lissandra R Frozen Tomb → Aurelion Sol R The Skies Descend)
- **0.22** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Aurelion Sol's Singularity. Untargetable for 2.5 s, long enough to use ahead of Singularity. (Lissandra R Frozen Tomb → Aurelion Sol E Singularity)

### 4. Rek'Sai (net +1.06)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Aurelion Sol's Falling Star. Untargetable for 1.5 s, long enough to use ahead of Falling Star. (Rek'Sai R Void Rush → Aurelion Sol R Falling Star)
- **0.38** untargetable: Void Rush makes Rek'Sai untargetable, dodging Aurelion Sol's The Skies Descend. Untargetable for 1.5 s, long enough to use ahead of The Skies Descend. (Rek'Sai R Void Rush → Aurelion Sol R The Skies Descend)
- **0.22** untargetable: Void Rush makes Rek'Sai untargetable, dodging Aurelion Sol's Singularity. Untargetable for 1.5 s, long enough to use ahead of Singularity. (Rek'Sai R Void Rush → Aurelion Sol E Singularity)
- Watch out: Aurelion Sol's basic attacks reach 375 units farther than Rek'Sai's (550 vs 175 attack range).

### 5. Vladimir (net +1.05)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Aurelion Sol's Falling Star. Untargetable for 2 s, long enough to use ahead of Falling Star. (Vladimir W Sanguine Pool → Aurelion Sol R Falling Star)
- **0.62** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Aurelion Sol's The Skies Descend. Untargetable for 2 s, long enough to use ahead of The Skies Descend. (Vladimir W Sanguine Pool → Aurelion Sol R The Skies Descend)
- **0.38** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Aurelion Sol's Singularity. Untargetable for 2 s, long enough to use ahead of Singularity. (Vladimir W Sanguine Pool → Aurelion Sol E Singularity)
- Watch out: Aurelion Sol's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 6. Bard (net +1.05)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Aurelion Sol's Falling Star. Untargetable for 2.5 s, long enough to use ahead of Falling Star. (Bard R Tempered Fate → Aurelion Sol R Falling Star)
- **0.38** untargetable: Tempered Fate makes Bard untargetable, dodging Aurelion Sol's The Skies Descend. Untargetable for 2.5 s, long enough to use ahead of The Skies Descend. (Bard R Tempered Fate → Aurelion Sol R The Skies Descend)
- **0.22** untargetable: Tempered Fate makes Bard untargetable, dodging Aurelion Sol's Singularity. Untargetable for 2.5 s, long enough to use ahead of Singularity. (Bard R Tempered Fate → Aurelion Sol E Singularity)

### 7. Xayah (net +1.04)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Aurelion Sol's Falling Star. Untargetable for 1.5 s, long enough to use ahead of Falling Star. (Xayah R Featherstorm → Aurelion Sol R Falling Star)
- **0.37** untargetable: Featherstorm makes Xayah untargetable, dodging Aurelion Sol's The Skies Descend. Untargetable for 1.5 s, long enough to use ahead of The Skies Descend. (Xayah R Featherstorm → Aurelion Sol R The Skies Descend)
- **0.21** untargetable: Featherstorm makes Xayah untargetable, dodging Aurelion Sol's Singularity. Untargetable for 1.5 s, long enough to use ahead of Singularity. (Xayah R Featherstorm → Aurelion Sol E Singularity)

### 8. Morgana (net +1.03)

- **0.80** cc immunity: Black Shield makes Morgana immune to Aurelion Sol's Falling Star (stun). Immune for 5 s, long enough to use ahead of Falling Star. (Morgana E Black Shield → Aurelion Sol R Falling Star)
- **0.62** cc immunity: Black Shield makes Morgana immune to Aurelion Sol's The Skies Descend (airborne, slow). Immune for 5 s, long enough to use ahead of The Skies Descend. (Morgana E Black Shield → Aurelion Sol R The Skies Descend)
- **0.10** cc immunity: Black Shield makes Morgana immune to Aurelion Sol's Singularity (kinematics). Immune for 5 s, long enough to use ahead of Singularity. (Morgana E Black Shield → Aurelion Sol E Singularity)
- Watch out: Aurelion Sol's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

### 9. Udyr (net +1.02)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Aurelion Sol's Falling Star (stun). Immune for 1.5 s, long enough to use ahead of Falling Star. (Udyr E Blazing Stampede → Aurelion Sol R Falling Star)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Aurelion Sol's The Skies Descend (airborne, slow). Immune for 1.5 s, long enough to use ahead of The Skies Descend. (Udyr E Blazing Stampede → Aurelion Sol R The Skies Descend)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Aurelion Sol's Singularity (kinematics). Immune for 1.5 s, long enough to use ahead of Singularity. (Udyr E Blazing Stampede → Aurelion Sol E Singularity)
- Watch out: Aurelion Sol's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range).

### 10. Zaahen (net +1.00)

- **0.48** cc immunity: Grim Deliverance makes Zaahen immune to Aurelion Sol's Falling Star (stun). Immune for ?; Falling Star lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Zaahen R Grim Deliverance → Aurelion Sol R Falling Star)
- **0.38** cc immunity: Grim Deliverance makes Zaahen immune to Aurelion Sol's The Skies Descend (airborne, slow). Immune for ?, timed to The Skies Descend. (Zaahen R Grim Deliverance → Aurelion Sol R The Skies Descend)
- **0.36** death prevention: Aurelion Sol's Singularity can't execute Zaahen during Cultivation of War (resurrection). Cultivation of War lasts 4 s on a ? cooldown. (Zaahen I Cultivation of War → Aurelion Sol E Singularity)
- Watch out: Aurelion Sol's basic attacks reach 375 units farther than Zaahen's (550 vs 175 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.17 | 1.39 | 0.22 |  |
| 2 | Sivir | +1.14 | 1.14 | 0.00 |  |
| 3 | Lissandra | +1.07 | 1.07 | 0.00 |  |
| 4 | Rek'Sai | +1.06 | 1.20 | 0.14 |  |
| 5 | Vladimir | +1.05 | 1.21 | 0.16 |  |
| 6 | Bard | +1.05 | 1.05 | 0.00 |  |
| 7 | Xayah | +1.04 | 1.04 | 0.00 |  |
| 8 | Morgana | +1.03 | 1.14 | 0.11 |  |
| 9 | Udyr | +1.02 | 1.24 | 0.22 |  |
| 10 | Zaahen | +1.00 | 1.14 | 0.14 |  |
| 11 | Maokai | +0.99 | 1.21 | 0.22 |  |
| 12 | Elise | +0.97 | 0.97 | 0.00 |  |
| 13 | Fiora | +0.85 | 1.07 | 0.22 |  |
| 14 | Milio | +0.76 | 0.76 | 0.00 |  |
| 15 | Kalista | +0.74 | 0.74 | 0.00 |  |
| 16 | Aurora | +0.71 | 0.71 | 0.00 |  |
| 17 | Master Yi | +0.70 | 1.01 | 0.31 |  |
| 18 | Camille | +0.68 | 0.79 | 0.11 |  |
| 19 | Gwen | +0.67 | 0.89 | 0.22 |  |
| 20 | Yuumi | +0.66 | 1.11 | 0.45 |  |
| 21 | Alistar | +0.65 | 0.87 | 0.22 |  |
| 22 | Kled | +0.65 | 0.73 | 0.08 |  |
| 23 | Sion | +0.63 | 1.12 | 0.49 |  |
| 24 | Evelynn | +0.63 | 0.78 | 0.15 |  |
| 25 | Shaco | +0.62 | 0.77 | 0.15 |  |
| 26 | Kayle | +0.62 | 0.62 | 0.00 |  |
| 27 | Pantheon | +0.61 | 0.80 | 0.19 |  |
| 28 | Kayn | +0.60 | 1.14 | 0.54 |  |
| 29 | Ekko | +0.58 | 0.73 | 0.15 |  |
| 30 | Warwick | +0.57 | 0.89 | 0.32 |  |
| 31 | Olaf | +0.56 | 1.00 | 0.44 |  |
| 32 | Zed | +0.55 | 0.70 | 0.15 |  |
| 33 | Rengar | +0.52 | 0.96 | 0.44 |  |
| 34 | Malzahar | +0.52 | 0.87 | 0.35 |  |
| 35 | Gangplank | +0.47 | 0.91 | 0.44 |  |
| 36 | Xin Zhao | +0.44 | 0.65 | 0.21 |  |
| 37 | Vex | +0.41 | 0.41 | 0.00 |  |
| 38 | Kindred | +0.36 | 0.36 | 0.00 |  |
| 39 | Kog'Maw | +0.36 | 0.36 | 0.00 |  |
| 40 | Viktor | +0.36 | 0.36 | 0.00 |  |
| 41 | Cassiopeia | +0.35 | 0.35 | 0.00 |  |
| 42 | Ahri | +0.34 | 0.34 | 0.00 |  |
| 43 | Hwei | +0.34 | 0.34 | 0.00 |  |
| 44 | Veigar | +0.34 | 0.34 | 0.00 |  |
| 45 | Jinx | +0.30 | 0.30 | 0.00 |  |
| 46 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 47 | Zilean | +0.28 | 0.28 | 0.00 |  |
| 48 | Lulu | +0.27 | 0.27 | 0.00 |  |
| 49 | Yone | +0.26 | 0.36 | 0.10 |  |
| 50 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 51 | Yasuo | +0.22 | 0.36 | 0.14 |  |
| 52 | K'Sante | +0.20 | 0.31 | 0.11 |  |
| 53 | Tristana | +0.20 | 0.20 | 0.00 |  |
| 54 | Samira | +0.19 | 0.19 | 0.00 |  |
| 55 | Mel | +0.18 | 0.18 | 0.00 |  |
| 56 | Braum | +0.17 | 0.39 | 0.22 |  |
| 57 | Heimerdinger | +0.16 | 0.16 | 0.00 |  |
| 58 | Taric | +0.14 | 0.58 | 0.44 |  |
| 59 | Corki | +0.13 | 0.13 | 0.00 |  |
| 60 | Annie | +0.12 | 0.12 | 0.00 |  |
| 61 | Brand | +0.10 | 0.10 | 0.00 |  |
| 62 | Zac | +0.09 | 0.53 | 0.44 |  |
| 63 | Nami | +0.09 | 0.09 | 0.00 |  |
| 64 | Nilah | +0.08 | 0.26 | 0.18 |  |
| 65 | Aphelios | +0.08 | 0.08 | 0.00 |  |
| 66 | Draven | +0.08 | 0.08 | 0.00 |  |
| 67 | Jayce | +0.08 | 0.08 | 0.00 |  |
| 68 | Kennen | +0.08 | 0.08 | 0.00 |  |
| 69 | Seraphine | +0.08 | 0.08 | 0.00 |  |
| 70 | Swain | +0.08 | 0.08 | 0.00 |  |
| 71 | Vayne | +0.08 | 0.08 | 0.00 |  |
| 72 | Ziggs | +0.08 | 0.08 | 0.00 |  |
| 73 | Renata Glasc | +0.07 | 0.07 | 0.00 |  |
| 74 | Soraka | +0.07 | 0.07 | 0.00 |  |
| 75 | Syndra | +0.07 | 0.07 | 0.00 |  |
| 76 | Zoe | +0.07 | 0.07 | 0.00 |  |
| 77 | Ashe | +0.06 | 0.06 | 0.00 |  |
| 78 | Azir | +0.06 | 0.06 | 0.00 |  |
| 79 | Gnar | +0.06 | 0.06 | 0.00 |  |
| 80 | Neeko | +0.06 | 0.06 | 0.00 |  |
| 81 | Orianna | +0.06 | 0.06 | 0.00 |  |
| 82 | Sona | +0.06 | 0.06 | 0.00 |  |
| 83 | Zyra | +0.06 | 0.06 | 0.00 |  |
| 84 | Jax | +0.05 | 0.27 | 0.22 |  |
| 85 | Malphite | +0.04 | 0.26 | 0.22 |  |
| 86 | Ornn | +0.04 | 0.18 | 0.14 |  |
| 87 | Thresh | +0.04 | 0.08 | 0.04 |  |
| 88 | Garen | +0.03 | 0.44 | 0.41 |  |
| 89 | Poppy | +0.02 | 0.44 | 0.42 |  |
| 90 | Volibear | +0.02 | 0.17 | 0.15 |  |
| 91 | Jarvan IV | +0.02 | 0.12 | 0.10 |  |
| 92 | Amumu | +0.01 | 0.23 | 0.22 |  |
| 93 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 94 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 95 | Karma | 0.00 | 0.00 | 0.00 |  |
| 96 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 97 | Lux | 0.00 | 0.00 | 0.00 |  |
| 98 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 99 | Senna | 0.00 | 0.00 | 0.00 |  |
| 100 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 101 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 102 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 103 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 104 | Hecarim | -0.02 | 0.12 | 0.14 |  |
| 105 | Sylas | -0.02 | 0.08 | 0.10 |  |
| 106 | Tryndamere | -0.03 | 0.18 | 0.21 |  |
| 107 | Rakan | -0.03 | 0.06 | 0.09 |  |
| 108 | Urgot | -0.04 | 0.07 | 0.11 |  |
| 109 | Fizz | -0.04 | 0.06 | 0.10 |  |
| 110 | Singed | -0.05 | 0.39 | 0.44 |  |
| 111 | Sett | -0.05 | 0.17 | 0.22 |  |
| 112 | Quinn | -0.05 | 0.09 | 0.14 |  |
| 113 | Briar | -0.05 | 0.06 | 0.11 |  |
| 114 | Graves | -0.05 | 0.00 | 0.05 |  |
| 115 | Varus | -0.05 | 0.00 | 0.05 |  |
| 116 | Bel'Veth | -0.06 | 0.09 | 0.15 |  |
| 117 | Rell | -0.06 | 0.08 | 0.14 |  |
| 118 | Lillia | -0.06 | 0.06 | 0.12 |  |
| 119 | Rammus | -0.07 | 0.30 | 0.37 |  |
| 120 | Sejuani | -0.08 | 0.14 | 0.22 |  |
| 121 | Riven | -0.08 | 0.07 | 0.15 |  |
| 122 | Wukong | -0.08 | 0.06 | 0.14 |  |
| 123 | Shyvana | -0.09 | 0.13 | 0.22 |  |
| 124 | Viego | -0.09 | 0.12 | 0.21 |  |
| 125 | Ambessa | -0.09 | 0.06 | 0.15 |  |
| 126 | Lee Sin | -0.09 | 0.06 | 0.15 |  |
| 127 | Qiyana | -0.09 | 0.06 | 0.15 |  |
| 128 | Aatrox | -0.11 | 0.10 | 0.21 |  |
| 129 | Irelia | -0.11 | 0.08 | 0.19 |  |
| 130 | Ivern | -0.11 | 0.00 | 0.11 |  |
| 131 | Leona | -0.12 | 0.10 | 0.22 |  |
| 132 | Illaoi | -0.13 | 0.09 | 0.22 |  |
| 133 | Kassadin | -0.13 | 0.09 | 0.22 |  |
| 134 | Renekton | -0.13 | 0.09 | 0.22 |  |
| 135 | Galio | -0.14 | 0.09 | 0.23 |  |
| 136 | Pyke | -0.15 | 0.08 | 0.23 |  |
| 137 | Nautilus | -0.15 | 0.06 | 0.21 |  |
| 138 | Akali | -0.15 | 0.00 | 0.15 |  |
| 139 | Talon | -0.15 | 0.00 | 0.15 |  |
| 140 | Vel'Koz | -0.16 | 0.08 | 0.24 |  |
| 141 | Diana | -0.16 | 0.06 | 0.22 |  |
| 142 | Caitlyn | -0.17 | 0.09 | 0.26 |  |
| 143 | Vi | -0.18 | 0.19 | 0.37 |  |
| 144 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 145 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 146 | Locke | -0.22 | 0.00 | 0.22 |  |
| 147 | Xerath | -0.23 | 0.08 | 0.31 |  |
| 148 | Akshan | -0.23 | 0.00 | 0.23 |  |
| 149 | Gragas | -0.24 | 0.08 | 0.32 |  |
| 150 | Twisted Fate | -0.25 | 0.10 | 0.35 |  |
| 151 | Fiddlesticks | -0.26 | 0.10 | 0.36 |  |
| 152 | Jhin | -0.26 | 0.00 | 0.26 |  |
| 153 | Lucian | -0.26 | 0.00 | 0.26 |  |
| 154 | Mordekaiser | -0.27 | 0.14 | 0.41 |  |
| 155 | Skarner | -0.28 | 0.16 | 0.44 |  |
| 156 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 157 | Shen | -0.30 | 0.30 | 0.60 |  |
| 158 | Yorick | -0.33 | 0.08 | 0.41 |  |
| 159 | Janna | -0.33 | 0.07 | 0.40 |  |
| 160 | Blitzcrank | -0.34 | 0.10 | 0.44 |  |
| 161 | Cho'Gath | -0.34 | 0.10 | 0.44 |  |
| 162 | Darius | -0.34 | 0.07 | 0.41 |  |
| 163 | Trundle | -0.34 | 0.07 | 0.41 |  |
| 164 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 165 | Tahm Kench | -0.36 | 0.10 | 0.46 |  |
| 166 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 167 | Katarina | -0.40 | 0.00 | 0.40 |  |
| 168 | Taliyah | -0.41 | 0.07 | 0.48 |  |
| 169 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 170 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 171 | Naafiri | -0.51 | 0.00 | 0.51 |  |
| 172 | Nunu & Willump | -0.53 | 0.25 | 0.78 |  |
