# Counters to Galio (patch 26.20)

Every champion ranked by what its kit does against Galio's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Galio's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Galio` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +1.83)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Galio's Hero's Entrance. Spell shield for 1.5 s, long enough to use ahead of Hero's Entrance. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Galio R Hero's Entrance)
- **0.70** spell shield: Shroud of Darkness's spell shield blocks Galio's Shield of Durand. Spell shield for 1.5 s, long enough to use ahead of Shield of Durand. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Galio W Shield of Durand)
- **0.20** cc immunity: Paranoia is displacement immune, ignoring Galio's Justice Punch (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Galio E Justice Punch)

### 2. Udyr (net +1.70)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Galio's Justice Punch (airborne). Immune for 1.5 s, long enough to use ahead of Justice Punch. (Udyr E Blazing Stampede → Galio E Justice Punch)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Galio's Hero's Entrance (airborne). Immune for 1.5 s, long enough to use ahead of Hero's Entrance. (Udyr E Blazing Stampede → Galio R Hero's Entrance)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Galio's Shield of Durand (taunt, slow). Immune for 1.5 s, long enough to use ahead of Shield of Durand. (Udyr E Blazing Stampede → Galio W Shield of Durand)

### 3. Morgana (net +1.61)

- **1.00** cc immunity: Black Shield makes Morgana immune to Galio's Hero's Entrance (airborne). Immune for 5 s, long enough to use ahead of Hero's Entrance. (Morgana E Black Shield → Galio R Hero's Entrance)
- **0.66** cc immunity: Black Shield makes Morgana immune to Galio's Justice Punch (airborne). Immune for 5 s, long enough to use ahead of Justice Punch. (Morgana E Black Shield → Galio E Justice Punch)
- **0.65** cc immunity: Black Shield makes Morgana immune to Galio's Shield of Durand (taunt, slow). Immune for 5 s, long enough to use ahead of Shield of Durand. (Morgana E Black Shield → Galio W Shield of Durand)

### 4. Sivir (net +1.60)

- **1.00** spell shield: Spell Shield's spell shield blocks Galio's Hero's Entrance. Spell shield for 1.5 s, long enough to use ahead of Hero's Entrance. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Galio R Hero's Entrance)
- **0.61** spell shield: Spell Shield's spell shield blocks Galio's Shield of Durand. Spell shield for 1.5 s, long enough to use ahead of Shield of Durand. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Galio W Shield of Durand)
- **0.29** range: Sivir's basic attacks reach 350 units farther than Galio's (500 vs 150 attack range). Galio closes the gap with Justice Punch, Hero's Entrance. (Sivir basic attacks → Galio basic attacks)

### 5. Xayah (net +1.55)

- **1.00** untargetable: Featherstorm makes Xayah untargetable, dodging Galio's Hero's Entrance. Untargetable for 1.5 s, long enough to use ahead of Hero's Entrance. (Xayah R Featherstorm → Galio R Hero's Entrance)
- **0.44** untargetable: Featherstorm makes Xayah untargetable, dodging Galio's Justice Punch. Untargetable for 1.5 s, long enough to use ahead of Justice Punch. (Xayah R Featherstorm → Galio E Justice Punch)
- **0.34** untargetable: Featherstorm makes Xayah untargetable, dodging Galio's Shield of Durand. Untargetable for 1.5 s, long enough to use ahead of Shield of Durand. (Xayah R Featherstorm → Galio W Shield of Durand)

### 6. Bard (net +1.54)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Galio's Hero's Entrance. Untargetable for 2.5 s, long enough to use ahead of Hero's Entrance. (Bard R Tempered Fate → Galio R Hero's Entrance)
- **0.45** untargetable: Tempered Fate makes Bard untargetable, dodging Galio's Justice Punch. Untargetable for 2.5 s, long enough to use ahead of Justice Punch. (Bard R Tempered Fate → Galio E Justice Punch)
- **0.35** untargetable: Tempered Fate makes Bard untargetable, dodging Galio's Shield of Durand. Untargetable for 2.5 s, long enough to use ahead of Shield of Durand. (Bard R Tempered Fate → Galio W Shield of Durand)

### 7. Rek'Sai (net +1.53)

- **1.00** untargetable: Void Rush makes Rek'Sai untargetable, dodging Galio's Hero's Entrance. Untargetable for 1.5 s, long enough to use ahead of Hero's Entrance. (Rek'Sai R Void Rush → Galio R Hero's Entrance)
- **0.45** untargetable: Void Rush makes Rek'Sai untargetable, dodging Galio's Justice Punch. Untargetable for 1.5 s, long enough to use ahead of Justice Punch. (Rek'Sai R Void Rush → Galio E Justice Punch)
- **0.35** untargetable: Void Rush makes Rek'Sai untargetable, dodging Galio's Shield of Durand. Untargetable for 1.5 s, long enough to use ahead of Shield of Durand. (Rek'Sai R Void Rush → Galio W Shield of Durand)

### 8. Vladimir (net +1.51)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Galio's Hero's Entrance. Untargetable for 2 s, long enough to use ahead of Hero's Entrance. (Vladimir W Sanguine Pool → Galio R Hero's Entrance)
- **0.66** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Galio's Justice Punch. Untargetable for 2 s, long enough to use ahead of Justice Punch. (Vladimir W Sanguine Pool → Galio E Justice Punch)
- **0.65** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Galio's Shield of Durand. Untargetable for 2 s, long enough to use ahead of Shield of Durand. (Vladimir W Sanguine Pool → Galio W Shield of Durand)
- Watch out: Justice Punch's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 9. Lissandra (net +1.48)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Galio's Hero's Entrance. Untargetable for 2.5 s, long enough to use ahead of Hero's Entrance. (Lissandra R Frozen Tomb → Galio R Hero's Entrance)
- **0.45** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Galio's Justice Punch. Untargetable for 2.5 s, long enough to use ahead of Justice Punch. (Lissandra R Frozen Tomb → Galio E Justice Punch)
- **0.35** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Galio's Shield of Durand. Untargetable for 2.5 s, long enough to use ahead of Shield of Durand. (Lissandra R Frozen Tomb → Galio W Shield of Durand)

### 10. Elise (net +1.42)

- **0.63** untargetable: Rappel makes Elise untargetable, dodging Galio's Justice Punch. Untargetable for 0.6 s; Justice Punch takes 0.51 s to land, enough to react. (Elise E Rappel → Galio E Justice Punch)
- **0.60** untargetable: Rappel makes Elise untargetable, dodging Galio's Hero's Entrance. Untargetable for 0.6 s; Hero's Entrance lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Galio R Hero's Entrance)
- **0.36** untargetable: Rappel makes Elise untargetable, dodging Galio's Shield of Durand. Untargetable for 0.6 s; Shield of Durand lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Galio W Shield of Durand)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.83 | 1.83 | 0.00 |  |
| 2 | Udyr | +1.70 | 1.70 | 0.00 |  |
| 3 | Morgana | +1.61 | 1.61 | 0.00 |  |
| 4 | Sivir | +1.60 | 1.60 | 0.00 |  |
| 5 | Xayah | +1.55 | 1.55 | 0.00 |  |
| 6 | Bard | +1.54 | 1.54 | 0.00 |  |
| 7 | Rek'Sai | +1.53 | 1.53 | 0.00 |  |
| 8 | Vladimir | +1.51 | 1.60 | 0.09 |  |
| 9 | Lissandra | +1.48 | 1.48 | 0.00 |  |
| 10 | Elise | +1.42 | 1.42 | 0.00 |  |
| 11 | Maokai | +1.40 | 1.40 | 0.00 |  |
| 12 | Sion | +1.35 | 1.51 | 0.16 |  |
| 13 | Olaf | +1.31 | 1.31 | 0.00 |  |
| 14 | Rengar | +1.27 | 1.27 | 0.00 |  |
| 15 | Kalista | +1.25 | 1.25 | 0.00 |  |
| 16 | Fiora | +1.24 | 1.24 | 0.00 |  |
| 17 | Alistar | +1.23 | 1.23 | 0.00 |  |
| 18 | Gangplank | +1.22 | 1.22 | 0.00 |  |
| 19 | Yuumi | +1.18 | 1.61 | 0.43 |  |
| 20 | Kled | +1.12 | 1.12 | 0.00 |  |
| 21 | Aurora | +1.10 | 1.10 | 0.00 |  |
| 22 | Camille | +1.10 | 1.10 | 0.00 |  |
| 23 | Evelynn | +1.06 | 1.06 | 0.00 |  |
| 24 | Zaahen | +1.06 | 1.06 | 0.00 |  |
| 25 | Shaco | +1.05 | 1.05 | 0.00 |  |
| 26 | Gwen | +1.02 | 1.02 | 0.00 |  |
| 27 | Warwick | +1.01 | 1.38 | 0.37 |  |
| 28 | Cassiopeia | +0.96 | 0.96 | 0.00 | grounding (Miasma), grounding (Miasma) |
| 29 | Singed | +0.92 | 0.92 | 0.00 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 30 | Master Yi | +0.91 | 1.14 | 0.23 |  |
| 31 | Ekko | +0.90 | 0.90 | 0.00 |  |
| 32 | Kayle | +0.90 | 0.90 | 0.00 |  |
| 33 | Zed | +0.87 | 0.87 | 0.00 |  |
| 34 | Malzahar | +0.86 | 1.26 | 0.40 |  |
| 35 | Taric | +0.83 | 0.83 | 0.00 |  |
| 36 | Xin Zhao | +0.83 | 0.83 | 0.00 |  |
| 37 | K'Sante | +0.78 | 0.78 | 0.00 |  |
| 38 | Milio | +0.77 | 0.77 | 0.00 |  |
| 39 | Kindred | +0.73 | 0.73 | 0.00 |  |
| 40 | Vex | +0.73 | 0.73 | 0.00 |  |
| 41 | Pantheon | +0.63 | 0.74 | 0.11 |  |
| 42 | Kayn | +0.61 | 1.06 | 0.45 |  |
| 43 | Braum | +0.60 | 0.60 | 0.00 | projectile block (Unbreakable) |
| 44 | Yone | +0.59 | 0.59 | 0.00 |  |
| 45 | Lulu | +0.58 | 0.58 | 0.00 |  |
| 46 | Teemo | +0.56 | 0.56 | 0.00 |  |
| 47 | Corki | +0.55 | 0.55 | 0.00 |  |
| 48 | Malphite | +0.50 | 0.50 | 0.00 |  |
| 49 | Mordekaiser | +0.48 | 0.48 | 0.00 |  |
| 50 | Ornn | +0.48 | 0.48 | 0.00 |  |
| 51 | Sett | +0.48 | 0.48 | 0.00 |  |
| 52 | Volibear | +0.48 | 0.48 | 0.00 |  |
| 53 | Vayne | +0.47 | 0.47 | 0.00 |  |
| 54 | Viktor | +0.47 | 0.47 | 0.00 |  |
| 55 | Yasuo | +0.47 | 0.47 | 0.00 |  |
| 56 | Samira | +0.46 | 0.46 | 0.00 |  |
| 57 | Hwei | +0.45 | 0.45 | 0.00 |  |
| 58 | Ahri | +0.43 | 0.43 | 0.00 |  |
| 59 | Garen | +0.43 | 0.43 | 0.00 |  |
| 60 | Mel | +0.43 | 0.43 | 0.00 |  |
| 61 | Veigar | +0.43 | 0.43 | 0.00 |  |
| 62 | Draven | +0.42 | 0.42 | 0.00 |  |
| 63 | Renata Glasc | +0.42 | 0.42 | 0.00 |  |
| 64 | Nilah | +0.40 | 0.40 | 0.00 |  |
| 65 | Zilean | +0.40 | 0.40 | 0.00 |  |
| 66 | Zoe | +0.40 | 0.40 | 0.00 |  |
| 67 | Jinx | +0.39 | 0.39 | 0.00 |  |
| 68 | Heimerdinger | +0.38 | 0.38 | 0.00 |  |
| 69 | Jax | +0.37 | 0.37 | 0.00 |  |
| 70 | Jayce | +0.37 | 0.37 | 0.00 |  |
| 71 | Kennen | +0.37 | 0.37 | 0.00 |  |
| 72 | Seraphine | +0.36 | 0.36 | 0.00 |  |
| 73 | Ziggs | +0.36 | 0.36 | 0.00 |  |
| 74 | Shyvana | +0.35 | 0.35 | 0.00 |  |
| 75 | Sona | +0.35 | 0.35 | 0.00 |  |
| 76 | Anivia | +0.34 | 0.34 | 0.00 |  |
| 77 | Hecarim | +0.34 | 0.34 | 0.00 |  |
| 78 | Soraka | +0.34 | 0.34 | 0.00 |  |
| 79 | Annie | +0.33 | 0.33 | 0.00 |  |
| 80 | Aphelios | +0.33 | 0.33 | 0.00 |  |
| 81 | Ashe | +0.33 | 0.33 | 0.00 |  |
| 82 | Brand | +0.33 | 0.33 | 0.00 |  |
| 83 | Gnar | +0.33 | 0.33 | 0.00 |  |
| 84 | Nami | +0.33 | 0.33 | 0.00 |  |
| 85 | Poppy | +0.32 | 0.52 | 0.20 |  |
| 86 | Jarvan IV | +0.32 | 0.32 | 0.00 |  |
| 87 | Syndra | +0.32 | 0.32 | 0.00 |  |
| 88 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 89 | Swain | +0.31 | 0.31 | 0.00 |  |
| 90 | Illaoi | +0.30 | 0.30 | 0.00 |  |
| 91 | Thresh | +0.30 | 0.30 | 0.00 |  |
| 92 | Amumu | +0.29 | 0.29 | 0.00 |  |
| 93 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 94 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 95 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 96 | Urgot | +0.27 | 0.27 | 0.00 |  |
| 97 | Azir | +0.26 | 0.26 | 0.00 |  |
| 98 | Orianna | +0.26 | 0.26 | 0.00 |  |
| 99 | Zyra | +0.25 | 0.25 | 0.00 |  |
| 100 | Kai'Sa | +0.24 | 0.24 | 0.00 |  |
| 101 | Neeko | +0.24 | 0.24 | 0.00 |  |
| 102 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 103 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 104 | Senna | +0.22 | 0.22 | 0.00 |  |
| 105 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 106 | Quinn | +0.21 | 0.42 | 0.21 |  |
| 107 | Lux | +0.19 | 0.19 | 0.00 |  |
| 108 | Nidalee | +0.19 | 0.19 | 0.00 |  |
| 109 | Aatrox | +0.18 | 0.18 | 0.00 |  |
| 110 | Bel'Veth | +0.18 | 0.18 | 0.00 |  |
| 111 | Blitzcrank | +0.18 | 0.18 | 0.00 |  |
| 112 | Cho'Gath | +0.18 | 0.18 | 0.00 |  |
| 113 | Irelia | +0.18 | 0.18 | 0.00 |  |
| 114 | Kassadin | +0.18 | 0.18 | 0.00 |  |
| 115 | Leona | +0.18 | 0.18 | 0.00 |  |
| 116 | Rell | +0.18 | 0.18 | 0.00 |  |
| 117 | Renekton | +0.18 | 0.18 | 0.00 |  |
| 118 | Riven | +0.18 | 0.18 | 0.00 |  |
| 119 | Sejuani | +0.18 | 0.18 | 0.00 |  |
| 120 | Skarner | +0.18 | 0.18 | 0.00 |  |
| 121 | Sylas | +0.18 | 0.18 | 0.00 |  |
| 122 | Yorick | +0.18 | 0.18 | 0.00 |  |
| 123 | Kog'Maw | +0.17 | 0.17 | 0.00 |  |
| 124 | Trundle | +0.17 | 0.17 | 0.00 |  |
| 125 | Darius | +0.16 | 0.16 | 0.00 |  |
| 126 | Rakan | +0.16 | 0.16 | 0.00 |  |
| 127 | Graves | +0.15 | 0.15 | 0.00 |  |
| 128 | Aurelion Sol | +0.14 | 0.23 | 0.09 |  |
| 129 | Karma | +0.14 | 0.14 | 0.00 |  |
| 130 | LeBlanc | +0.14 | 0.14 | 0.00 |  |
| 131 | Lillia | +0.14 | 0.14 | 0.00 |  |
| 132 | Rammus | +0.13 | 0.45 | 0.32 |  |
| 133 | Twisted Fate | +0.10 | 0.45 | 0.35 |  |
| 134 | Briar | +0.09 | 0.09 | 0.00 |  |
| 135 | Diana | +0.09 | 0.09 | 0.00 |  |
| 136 | Fizz | +0.09 | 0.09 | 0.00 |  |
| 137 | Lee Sin | +0.09 | 0.09 | 0.00 |  |
| 138 | Wukong | +0.09 | 0.09 | 0.00 |  |
| 139 | Nautilus | +0.09 | 0.09 | 0.00 |  |
| 140 | Ambessa | +0.08 | 0.08 | 0.00 |  |
| 141 | Qiyana | +0.08 | 0.08 | 0.00 |  |
| 142 | Vel'Koz | +0.07 | 0.35 | 0.28 |  |
| 143 | Viego | +0.07 | 0.32 | 0.25 |  |
| 144 | Varus | +0.07 | 0.18 | 0.11 |  |
| 145 | Vi | +0.02 | 0.48 | 0.46 |  |
| 146 | Janna | +0.02 | 0.42 | 0.40 |  |
| 147 | Xerath | +0.02 | 0.35 | 0.33 |  |
| 148 | Shen | 0.00 | 0.45 | 0.45 |  |
| 149 | Pyke | 0.00 | 0.18 | 0.18 |  |
| 150 | Akali | 0.00 | 0.00 | 0.00 |  |
| 151 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 152 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 153 | Locke | 0.00 | 0.00 | 0.00 |  |
| 154 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 155 | Talon | 0.00 | 0.00 | 0.00 |  |
| 156 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 157 | Gragas | -0.01 | 0.18 | 0.19 |  |
| 158 | Ivern | -0.03 | 0.12 | 0.15 |  |
| 159 | Caitlyn | -0.04 | 0.24 | 0.28 |  |
| 160 | Lucian | -0.06 | 0.22 | 0.28 |  |
| 161 | Miss Fortune | -0.06 | 0.22 | 0.28 |  |
| 162 | Akshan | -0.07 | 0.21 | 0.28 |  |
| 163 | Zac | -0.09 | 0.41 | 0.50 |  |
| 164 | Jhin | -0.10 | 0.18 | 0.28 |  |
| 165 | Taliyah | -0.13 | 0.35 | 0.48 |  |
| 166 | Karthus | -0.16 | 0.12 | 0.28 |  |
| 167 | Fiddlesticks | -0.17 | 0.30 | 0.47 |  |
| 168 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 169 | Nunu & Willump | -0.20 | 0.29 | 0.49 |  |
| 170 | Katarina | -0.28 | 0.00 | 0.28 |  |
| 171 | Tahm Kench | -0.32 | 0.18 | 0.50 |  |
| 172 | Naafiri | -0.45 | 0.00 | 0.45 |  |
