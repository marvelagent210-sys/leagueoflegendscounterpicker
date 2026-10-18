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

### 3. Zaahen (net +1.08)

- **0.48** cc immunity: Grim Deliverance makes Zaahen immune to Aurelion Sol's Falling Star (stun). Immune for ?; Falling Star lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Zaahen R Grim Deliverance → Aurelion Sol R Falling Star)
- **0.38** cc immunity: Grim Deliverance makes Zaahen immune to Aurelion Sol's The Skies Descend (airborne, slow). Immune for ?, timed to The Skies Descend. (Zaahen R Grim Deliverance → Aurelion Sol R The Skies Descend)
- **0.36** death prevention: Cultivation of War allows Zaahen to resurrect after fatal damage from Aurelion Sol's Singularity. Cultivation of War lasts 4 s on a ? cooldown. Only after taking fatal damage. (Zaahen I Cultivation of War → Aurelion Sol E Singularity)
- Watch out: Aurelion Sol's basic attacks reach 375 units farther than Zaahen's (550 vs 175 attack range).

### 4. Fizz (net +1.07)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Aurelion Sol's The Skies Descend. Untargetable for 0.75 s, timed to The Skies Descend. (Fizz E Playful → Aurelion Sol R The Skies Descend)
- **0.48** untargetable: Playful makes Fizz untargetable, dodging Aurelion Sol's Falling Star. Untargetable for 0.75 s; Falling Star lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Aurelion Sol R Falling Star)
- **0.27** untargetable: Playful makes Fizz untargetable, dodging Aurelion Sol's Singularity. Untargetable for 0.75 s; Singularity lands within 0.2 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Aurelion Sol E Singularity)
- Watch out: Aurelion Sol's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

### 5. Lissandra (net +1.07)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Aurelion Sol's Falling Star. Untargetable for 2.5 s, long enough to use ahead of Falling Star. (Lissandra R Frozen Tomb → Aurelion Sol R Falling Star)
- **0.38** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Aurelion Sol's The Skies Descend. Untargetable for 2.5 s, long enough to use ahead of The Skies Descend. (Lissandra R Frozen Tomb → Aurelion Sol R The Skies Descend)
- **0.22** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Aurelion Sol's Singularity. Untargetable for 2.5 s, long enough to use ahead of Singularity. (Lissandra R Frozen Tomb → Aurelion Sol E Singularity)

### 6. Rek'Sai (net +1.06)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Aurelion Sol's Falling Star. Untargetable for 1.5 s, long enough to use ahead of Falling Star. (Rek'Sai R Void Rush → Aurelion Sol R Falling Star)
- **0.38** untargetable: Void Rush makes Rek'Sai untargetable, dodging Aurelion Sol's The Skies Descend. Untargetable for 1.5 s, long enough to use ahead of The Skies Descend. (Rek'Sai R Void Rush → Aurelion Sol R The Skies Descend)
- **0.22** untargetable: Void Rush makes Rek'Sai untargetable, dodging Aurelion Sol's Singularity. Untargetable for 1.5 s, long enough to use ahead of Singularity. (Rek'Sai R Void Rush → Aurelion Sol E Singularity)
- Watch out: Aurelion Sol's basic attacks reach 375 units farther than Rek'Sai's (550 vs 175 attack range).

### 7. Bard (net +1.05)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Aurelion Sol's Falling Star. Untargetable for 2.5 s, long enough to use ahead of Falling Star. (Bard R Tempered Fate → Aurelion Sol R Falling Star)
- **0.38** untargetable: Tempered Fate makes Bard untargetable, dodging Aurelion Sol's The Skies Descend. Untargetable for 2.5 s, long enough to use ahead of The Skies Descend. (Bard R Tempered Fate → Aurelion Sol R The Skies Descend)
- **0.22** untargetable: Tempered Fate makes Bard untargetable, dodging Aurelion Sol's Singularity. Untargetable for 2.5 s, long enough to use ahead of Singularity. (Bard R Tempered Fate → Aurelion Sol E Singularity)

### 8. Xayah (net +1.04)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Aurelion Sol's Falling Star. Untargetable for 1.5 s, long enough to use ahead of Falling Star. (Xayah R Featherstorm → Aurelion Sol R Falling Star)
- **0.37** untargetable: Featherstorm makes Xayah untargetable, dodging Aurelion Sol's The Skies Descend. Untargetable for 1.5 s, long enough to use ahead of The Skies Descend. (Xayah R Featherstorm → Aurelion Sol R The Skies Descend)
- **0.21** untargetable: Featherstorm makes Xayah untargetable, dodging Aurelion Sol's Singularity. Untargetable for 1.5 s, long enough to use ahead of Singularity. (Xayah R Featherstorm → Aurelion Sol E Singularity)

### 9. Morgana (net +1.03)

- **0.80** cc immunity: Black Shield makes Morgana immune to Aurelion Sol's Falling Star (stun). Immune for 5 s, long enough to use ahead of Falling Star. (Morgana E Black Shield → Aurelion Sol R Falling Star)
- **0.62** cc immunity: Black Shield makes Morgana immune to Aurelion Sol's The Skies Descend (airborne, slow). Immune for 5 s, long enough to use ahead of The Skies Descend. (Morgana E Black Shield → Aurelion Sol R The Skies Descend)
- **0.10** cc immunity: Black Shield makes Morgana immune to Aurelion Sol's Singularity (kinematics). Immune for 5 s, long enough to use ahead of Singularity. (Morgana E Black Shield → Aurelion Sol E Singularity)
- Watch out: Aurelion Sol's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

### 10. Udyr (net +1.02)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Aurelion Sol's Falling Star (stun). Immune for 1.5 s, long enough to use ahead of Falling Star. (Udyr E Blazing Stampede → Aurelion Sol R Falling Star)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Aurelion Sol's The Skies Descend (airborne, slow). Immune for 1.5 s, long enough to use ahead of The Skies Descend. (Udyr E Blazing Stampede → Aurelion Sol R The Skies Descend)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Aurelion Sol's Singularity (kinematics). Immune for 1.5 s, long enough to use ahead of Singularity. (Udyr E Blazing Stampede → Aurelion Sol E Singularity)
- Watch out: Aurelion Sol's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.17 | 1.39 | 0.22 |  |
| 2 | Sivir | +1.14 | 1.14 | 0.00 |  |
| 3 | Zaahen | +1.08 | 1.22 | 0.14 |  |
| 4 | Fizz | +1.07 | 1.17 | 0.10 |  |
| 5 | Lissandra | +1.07 | 1.07 | 0.00 |  |
| 6 | Rek'Sai | +1.06 | 1.20 | 0.14 |  |
| 7 | Bard | +1.05 | 1.05 | 0.00 |  |
| 8 | Xayah | +1.04 | 1.04 | 0.00 |  |
| 9 | Morgana | +1.03 | 1.14 | 0.11 |  |
| 10 | Udyr | +1.02 | 1.24 | 0.22 |  |
| 11 | Maokai | +0.99 | 1.21 | 0.22 |  |
| 12 | Vladimir | +0.97 | 1.21 | 0.24 |  |
| 13 | Fiora | +0.85 | 1.07 | 0.22 |  |
| 14 | Milio | +0.76 | 0.76 | 0.00 |  |
| 15 | Kalista | +0.74 | 0.74 | 0.00 |  |
| 16 | Alistar | +0.73 | 0.95 | 0.22 |  |
| 17 | Aurora | +0.71 | 0.71 | 0.00 |  |
| 18 | Camille | +0.68 | 0.79 | 0.11 |  |
| 19 | Gwen | +0.67 | 0.89 | 0.22 |  |
| 20 | Kled | +0.66 | 0.74 | 0.08 |  |
| 21 | Evelynn | +0.63 | 0.78 | 0.15 |  |
| 22 | Shaco | +0.62 | 0.77 | 0.15 |  |
| 23 | Kayle | +0.62 | 0.62 | 0.00 |  |
| 24 | Olaf | +0.56 | 1.00 | 0.44 |  |
| 25 | Zed | +0.55 | 0.70 | 0.15 |  |
| 26 | Rengar | +0.52 | 0.96 | 0.44 |  |
| 27 | Sion | +0.50 | 1.12 | 0.62 |  |
| 28 | Master Yi | +0.47 | 1.01 | 0.54 |  |
| 29 | Gangplank | +0.47 | 0.91 | 0.44 |  |
| 30 | Xin Zhao | +0.44 | 0.65 | 0.21 |  |
| 31 | Vex | +0.41 | 0.41 | 0.00 |  |
| 32 | Viktor | +0.39 | 0.39 | 0.00 |  |
| 33 | Cassiopeia | +0.35 | 0.35 | 0.00 |  |
| 34 | Ahri | +0.34 | 0.34 | 0.00 |  |
| 35 | Hwei | +0.34 | 0.34 | 0.00 |  |
| 36 | Veigar | +0.34 | 0.34 | 0.00 |  |
| 37 | Anivia | +0.31 | 0.31 | 0.00 |  |
| 38 | Lulu | +0.31 | 0.31 | 0.00 |  |
| 39 | Jinx | +0.30 | 0.30 | 0.00 |  |
| 40 | Yone | +0.29 | 0.39 | 0.10 |  |
| 41 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 42 | Yasuo | +0.28 | 0.42 | 0.14 |  |
| 43 | Zilean | +0.28 | 0.28 | 0.00 |  |
| 44 | Yuumi | +0.26 | 1.11 | 0.85 |  |
| 45 | K'Sante | +0.26 | 0.37 | 0.11 |  |
| 46 | Rell | +0.24 | 0.38 | 0.14 |  |
| 47 | Heimerdinger | +0.24 | 0.24 | 0.00 |  |
| 48 | Braum | +0.23 | 0.45 | 0.22 |  |
| 49 | Tristana | +0.20 | 0.20 | 0.00 |  |
| 50 | Samira | +0.19 | 0.19 | 0.00 |  |
| 51 | Mel | +0.18 | 0.18 | 0.00 |  |
| 52 | Kindred | +0.17 | 0.17 | 0.00 |  |
| 53 | Malzahar | +0.15 | 0.90 | 0.75 |  |
| 54 | Gnar | +0.15 | 0.15 | 0.00 |  |
| 55 | Nami | +0.15 | 0.15 | 0.00 |  |
| 56 | Seraphine | +0.14 | 0.14 | 0.00 |  |
| 57 | Renata Glasc | +0.13 | 0.13 | 0.00 |  |
| 58 | Thresh | +0.12 | 0.16 | 0.04 |  |
| 59 | Annie | +0.12 | 0.12 | 0.00 |  |
| 60 | Ornn | +0.10 | 0.24 | 0.14 |  |
| 61 | Brand | +0.10 | 0.10 | 0.00 |  |
| 62 | Nilah | +0.08 | 0.26 | 0.18 |  |
| 63 | Aphelios | +0.08 | 0.08 | 0.00 |  |
| 64 | Corki | +0.08 | 0.08 | 0.00 |  |
| 65 | Draven | +0.08 | 0.08 | 0.00 |  |
| 66 | Elise | +0.08 | 0.08 | 0.00 |  |
| 67 | Jayce | +0.08 | 0.08 | 0.00 |  |
| 68 | Kennen | +0.08 | 0.08 | 0.00 |  |
| 69 | Swain | +0.08 | 0.08 | 0.00 |  |
| 70 | Vayne | +0.08 | 0.08 | 0.00 |  |
| 71 | Ziggs | +0.08 | 0.08 | 0.00 |  |
| 72 | Soraka | +0.07 | 0.07 | 0.00 |  |
| 73 | Syndra | +0.07 | 0.07 | 0.00 |  |
| 74 | Zoe | +0.07 | 0.07 | 0.00 |  |
| 75 | Sejuani | +0.06 | 0.28 | 0.22 |  |
| 76 | Ashe | +0.06 | 0.06 | 0.00 |  |
| 77 | Azir | +0.06 | 0.06 | 0.00 |  |
| 78 | Neeko | +0.06 | 0.06 | 0.00 |  |
| 79 | Orianna | +0.06 | 0.06 | 0.00 |  |
| 80 | Sona | +0.06 | 0.06 | 0.00 |  |
| 81 | Zyra | +0.06 | 0.06 | 0.00 |  |
| 82 | Jax | +0.05 | 0.27 | 0.22 |  |
| 83 | Rakan | +0.05 | 0.14 | 0.09 |  |
| 84 | Amumu | +0.04 | 0.26 | 0.22 |  |
| 85 | Malphite | +0.04 | 0.26 | 0.22 |  |
| 86 | Garen | +0.03 | 0.44 | 0.41 |  |
| 87 | Volibear | +0.02 | 0.17 | 0.15 |  |
| 88 | Urgot | +0.02 | 0.13 | 0.11 |  |
| 89 | Jarvan IV | +0.02 | 0.12 | 0.10 |  |
| 90 | Riven | +0.01 | 0.16 | 0.15 |  |
| 91 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 92 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 93 | Karma | 0.00 | 0.00 | 0.00 |  |
| 94 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 95 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 96 | Lux | 0.00 | 0.00 | 0.00 |  |
| 97 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 98 | Senna | 0.00 | 0.00 | 0.00 |  |
| 99 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 100 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 101 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 102 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 103 | Sett | -0.02 | 0.20 | 0.22 |  |
| 104 | Hecarim | -0.02 | 0.12 | 0.14 |  |
| 105 | Sylas | -0.02 | 0.08 | 0.10 |  |
| 106 | Tryndamere | -0.03 | 0.18 | 0.21 |  |
| 107 | Singed | -0.05 | 0.39 | 0.44 |  |
| 108 | Briar | -0.05 | 0.06 | 0.11 |  |
| 109 | Graves | -0.05 | 0.00 | 0.05 |  |
| 110 | Leona | -0.06 | 0.16 | 0.22 |  |
| 111 | Bel'Veth | -0.06 | 0.09 | 0.15 |  |
| 112 | Lillia | -0.06 | 0.06 | 0.12 |  |
| 113 | Wukong | -0.08 | 0.06 | 0.14 |  |
| 114 | Shyvana | -0.09 | 0.13 | 0.22 |  |
| 115 | Ambessa | -0.09 | 0.06 | 0.15 |  |
| 116 | Lee Sin | -0.09 | 0.06 | 0.15 |  |
| 117 | Qiyana | -0.09 | 0.06 | 0.15 |  |
| 118 | Aatrox | -0.11 | 0.10 | 0.21 |  |
| 119 | Irelia | -0.11 | 0.08 | 0.19 |  |
| 120 | Illaoi | -0.13 | 0.09 | 0.22 |  |
| 121 | Kassadin | -0.13 | 0.09 | 0.22 |  |
| 122 | Renekton | -0.13 | 0.09 | 0.22 |  |
| 123 | Nautilus | -0.15 | 0.06 | 0.21 |  |
| 124 | Akali | -0.15 | 0.00 | 0.15 |  |
| 125 | Ekko | -0.15 | 0.00 | 0.15 |  |
| 126 | Talon | -0.15 | 0.00 | 0.15 |  |
| 127 | Diana | -0.16 | 0.06 | 0.22 |  |
| 128 | Varus | -0.16 | 0.00 | 0.16 |  |
| 129 | Poppy | -0.18 | 0.44 | 0.62 |  |
| 130 | Blitzcrank | -0.20 | 0.24 | 0.44 |  |
| 131 | Kayn | -0.21 | 0.78 | 0.99 |  |
| 132 | Pyke | -0.21 | 0.17 | 0.38 |  |
| 133 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 134 | Viego | -0.22 | 0.21 | 0.43 |  |
| 135 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 136 | Locke | -0.22 | 0.00 | 0.22 |  |
| 137 | Rammus | -0.24 | 0.40 | 0.64 |  |
| 138 | Quinn | -0.24 | 0.09 | 0.33 |  |
| 139 | Cho'Gath | -0.26 | 0.18 | 0.44 |  |
| 140 | Ivern | -0.26 | 0.00 | 0.26 |  |
| 141 | Zac | -0.27 | 0.64 | 0.91 |  |
| 142 | Mordekaiser | -0.27 | 0.14 | 0.41 |  |
| 143 | Skarner | -0.28 | 0.16 | 0.44 |  |
| 144 | Yorick | -0.33 | 0.08 | 0.41 |  |
| 145 | Gragas | -0.34 | 0.14 | 0.48 |  |
| 146 | Darius | -0.34 | 0.07 | 0.41 |  |
| 147 | Trundle | -0.34 | 0.07 | 0.41 |  |
| 148 | Taric | -0.36 | 0.08 | 0.44 |  |
| 149 | Warwick | -0.41 | 0.89 | 1.30 |  |
| 150 | Vel'Koz | -0.44 | 0.08 | 0.52 |  |
| 151 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 152 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 153 | Caitlyn | -0.45 | 0.09 | 0.54 |  |
| 154 | Pantheon | -0.48 | 0.64 | 1.12 |  |
| 155 | Akshan | -0.51 | 0.00 | 0.51 |  |
| 156 | Vi | -0.53 | 0.22 | 0.75 |  |
| 157 | Jhin | -0.54 | 0.00 | 0.54 |  |
| 158 | Lucian | -0.54 | 0.00 | 0.54 |  |
| 159 | Xerath | -0.55 | 0.08 | 0.63 |  |
| 160 | Miss Fortune | -0.56 | 0.00 | 0.56 |  |
| 161 | Twisted Fate | -0.60 | 0.10 | 0.70 |  |
| 162 | Fiddlesticks | -0.64 | 0.17 | 0.81 |  |
| 163 | Janna | -0.67 | 0.13 | 0.80 |  |
| 164 | Karthus | -0.67 | 0.00 | 0.67 |  |
| 165 | Katarina | -0.68 | 0.00 | 0.68 |  |
| 166 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 167 | Tahm Kench | -0.72 | 0.24 | 0.96 |  |
| 168 | Taliyah | -0.74 | 0.22 | 0.96 |  |
| 169 | Shen | -0.75 | 0.30 | 1.05 |  |
| 170 | Naafiri | -0.96 | 0.00 | 0.96 |  |
| 171 | Nunu & Willump | -1.02 | 0.25 | 1.27 |  |
| 172 | Galio | -1.06 | 0.22 | 1.28 |  |
