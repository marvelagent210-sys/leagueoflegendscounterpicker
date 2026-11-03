# Counters to Anivia (patch 26.21)

Every champion ranked by what its kit does against Anivia's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Anivia's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Anivia` for the full ledger of a matchup, with sources.

## Top 10

### 1. Fizz (net +1.03)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Anivia's Crystallize. Untargetable for 0.75 s; Crystallize takes 0.25 s to land, enough to react. (Fizz E Playful → Anivia W Crystallize)
- **0.65** untargetable: Playful makes Fizz untargetable, dodging Anivia's Flash Frost. Untargetable for 0.75 s; Flash Frost takes 1.41 s to land, enough to react. (Fizz E Playful → Anivia Q Flash Frost)
- **0.39** untargetable: Playful makes Fizz untargetable, dodging Anivia's Frostbite. Untargetable for 0.75 s; Frostbite takes 0.63 s to land, enough to react. (Fizz E Playful → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 425 units farther than Fizz's (600 vs 175 attack range).

### 2. Fiora (net +0.94)

- **0.80** parry: Riposte parries Anivia's Crystallize and stuns back. Parry for 0.75 s; Crystallize takes 0.25 s to land, enough to react. Negating Crystallize's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Anivia W Crystallize)
- **0.56** parry: Riposte parries Anivia's Flash Frost and stuns back. Parry for 0.75 s; Flash Frost takes 1.41 s to land, enough to react. Negating Flash Frost's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Anivia Q Flash Frost)
- **0.30** parry: Riposte parries Anivia's Frostbite. Parry for 0.75 s; Frostbite takes 0.63 s to land, enough to react. (Fiora W Riposte → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 450 units farther than Fiora's (600 vs 150 attack range).

### 3. Maokai (net +0.86)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Anivia's Crystallize. Untargetable for 1.4 s; Crystallize takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Anivia W Crystallize)
- **0.57** untargetable: Twisted Advance makes Maokai untargetable, dodging Anivia's Flash Frost. Untargetable for 1.4 s; Flash Frost takes 1.41 s to land, enough to react. (Maokai W Twisted Advance → Anivia Q Flash Frost)
- **0.35** untargetable: Twisted Advance makes Maokai untargetable, dodging Anivia's Frostbite. Untargetable for 1.4 s; Frostbite takes 0.63 s to land, enough to react. (Maokai W Twisted Advance → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 475 units farther than Maokai's (600 vs 125 attack range).

### 4. Udyr (net +0.83)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Anivia's Crystallize (airborne). Immune for 1.5 s, long enough to use ahead of Crystallize. (Udyr E Blazing Stampede → Anivia W Crystallize)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Anivia's Flash Frost (slow, stun). Immune for 1.5 s, long enough to use ahead of Flash Frost. (Udyr E Blazing Stampede → Anivia Q Flash Frost)
- **0.10** cc immunity: Blazing Stampede makes Udyr immune to Anivia's Glacial Storm (slow). Immune for 1.5 s, long enough to use ahead of Glacial Storm. (Udyr E Blazing Stampede → Anivia R Glacial Storm)
- Watch out: Anivia's basic attacks reach 475 units farther than Udyr's (600 vs 125 attack range).

### 5. Morgana (net +0.77)

- **0.70** cc immunity: Black Shield makes Morgana immune to Anivia's Crystallize (airborne). Immune for 5 s, long enough to use ahead of Crystallize. (Morgana E Black Shield → Anivia W Crystallize)
- **0.46** cc immunity: Black Shield makes Morgana immune to Anivia's Flash Frost (slow, stun). Immune for 5 s, long enough to use ahead of Flash Frost. (Morgana E Black Shield → Anivia Q Flash Frost)
- **0.08** cc immunity: Black Shield makes Morgana immune to Anivia's Glacial Storm (slow). Immune for 5 s, long enough to use ahead of Glacial Storm. (Morgana E Black Shield → Anivia R Glacial Storm)
- Watch out: Anivia's basic attacks reach 150 units farther than Morgana's (600 vs 450 attack range).

### 6. Gwen (net +0.76)

- **0.68** untargetable: Hallowed Mist makes Gwen untargetable, dodging Anivia's Crystallize. Untargetable for ?; Crystallize takes 0.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Anivia W Crystallize)
- **0.44** untargetable: Hallowed Mist makes Gwen untargetable, dodging Anivia's Flash Frost. Untargetable for ?; Flash Frost takes 1.41 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Anivia Q Flash Frost)
- **0.29** untargetable: Hallowed Mist makes Gwen untargetable, dodging Anivia's Frostbite. Untargetable for ?; Frostbite takes 0.63 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 450 units farther than Gwen's (600 vs 150 attack range).

### 7. Vladimir (net +0.72)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Anivia's Crystallize. Untargetable for 2 s, long enough to use ahead of Crystallize. (Vladimir W Sanguine Pool → Anivia W Crystallize)
- **0.46** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Anivia's Flash Frost. Untargetable for 2 s, long enough to use ahead of Flash Frost. (Vladimir W Sanguine Pool → Anivia Q Flash Frost)
- **0.31** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Anivia's Glacial Storm. Untargetable for 2 s, long enough to use ahead of Glacial Storm. (Vladimir W Sanguine Pool → Anivia R Glacial Storm)
- Watch out: Anivia's basic attacks reach 150 units farther than Vladimir's (600 vs 450 attack range).

### 8. Braum (net +0.69)

- **0.65** projectile block: Unbreakable blocks Anivia's Flash Frost, a projectile. Unbreakable for 4 s, long enough to use ahead of Flash Frost. (Braum E Unbreakable → Anivia Q Flash Frost)
- **0.39** projectile block: Unbreakable blocks Anivia's Frostbite, a projectile. Unbreakable for 4 s, long enough to use ahead of Frostbite. (Braum E Unbreakable → Anivia E Frostbite)
- **0.33** projectile block: Unbreakable blocks Anivia's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Anivia basic attacks)
- Watch out: Anivia's basic attacks reach 475 units farther than Braum's (600 vs 125 attack range).

### 9. Lissandra (net +0.63)

- **0.37** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Anivia's Crystallize. Untargetable for 2.5 s, long enough to use ahead of Crystallize. (Lissandra R Frozen Tomb → Anivia W Crystallize)
- **0.32** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Anivia's Flash Frost. Untargetable for 2.5 s, long enough to use ahead of Flash Frost. (Lissandra R Frozen Tomb → Anivia Q Flash Frost)
- **0.27** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Anivia's Glacial Storm. Untargetable for 2.5 s, long enough to use ahead of Glacial Storm. (Lissandra R Frozen Tomb → Anivia R Glacial Storm)

### 10. Aurora (net +0.59)

- **0.35** untargetable: Between Worlds makes Aurora untargetable, dodging Anivia's Crystallize. Untargetable for 0.4 s; Crystallize takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Anivia W Crystallize)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Anivia's Flash Frost. Untargetable for 0.4 s; Flash Frost takes 1.41 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Anivia Q Flash Frost)
- **0.23** untargetable: Between Worlds makes Aurora untargetable, dodging Anivia's Frostbite. Untargetable for 0.4 s; Frostbite takes 0.63 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Anivia E Frostbite)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +1.03 | 1.15 | 0.12 |  |
| 2 | Fiora | +0.94 | 1.18 | 0.24 |  |
| 3 | Maokai | +0.86 | 1.10 | 0.24 |  |
| 4 | Udyr | +0.83 | 1.07 | 0.24 |  |
| 5 | Morgana | +0.77 | 0.95 | 0.18 |  |
| 6 | Gwen | +0.76 | 1.00 | 0.24 |  |
| 7 | Vladimir | +0.72 | 1.05 | 0.33 |  |
| 8 | Braum | +0.69 | 0.93 | 0.24 | projectile block (Unbreakable) |
| 9 | Lissandra | +0.63 | 0.63 | 0.00 |  |
| 10 | Aurora | +0.59 | 0.59 | 0.00 |  |
| 11 | Mel | +0.58 | 0.58 | 0.00 |  |
| 12 | Bard | +0.57 | 0.63 | 0.06 |  |
| 13 | Samira | +0.56 | 0.60 | 0.04 | projectile block (Blade Whirl) |
| 14 | Yasuo | +0.51 | 0.67 | 0.16 | projectile block (Wind Wall) |
| 15 | Xayah | +0.51 | 0.60 | 0.09 |  |
| 16 | Master Yi | +0.49 | 1.13 | 0.64 |  |
| 17 | Rek'Sai | +0.48 | 0.64 | 0.16 |  |
| 18 | Camille | +0.48 | 0.60 | 0.12 |  |
| 19 | Evelynn | +0.45 | 0.61 | 0.16 |  |
| 20 | Shaco | +0.45 | 0.61 | 0.16 |  |
| 21 | Zed | +0.42 | 0.58 | 0.16 |  |
| 22 | Kled | +0.41 | 0.51 | 0.10 |  |
| 23 | Zaahen | +0.38 | 0.54 | 0.16 |  |
| 24 | Kalista | +0.37 | 0.40 | 0.03 |  |
| 25 | Nocturne | +0.36 | 0.60 | 0.24 |  |
| 26 | Kayle | +0.35 | 0.35 | 0.00 |  |
| 27 | Yuumi | +0.33 | 1.24 | 0.91 |  |
| 28 | Rengar | +0.33 | 0.81 | 0.48 |  |
| 29 | Gangplank | +0.29 | 0.77 | 0.48 |  |
| 30 | Sivir | +0.28 | 0.40 | 0.12 |  |
| 31 | Milio | +0.26 | 0.35 | 0.09 |  |
| 32 | Lulu | +0.22 | 0.22 | 0.00 |  |
| 33 | Alistar | +0.20 | 0.44 | 0.24 |  |
| 34 | Teemo | +0.19 | 0.31 | 0.12 |  |
| 35 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 36 | K'Sante | +0.16 | 0.28 | 0.12 |  |
| 37 | Vex | +0.14 | 0.14 | 0.00 |  |
| 38 | Aphelios | +0.11 | 0.11 | 0.00 |  |
| 39 | Heimerdinger | +0.11 | 0.11 | 0.00 |  |
| 40 | Xin Zhao | +0.10 | 0.34 | 0.24 |  |
| 41 | Olaf | +0.07 | 0.55 | 0.48 |  |
| 42 | Malphite | +0.06 | 0.30 | 0.24 |  |
| 43 | Jarvan IV | +0.02 | 0.14 | 0.12 |  |
| 44 | Yone | +0.02 | 0.14 | 0.12 |  |
| 45 | Jax | +0.01 | 0.25 | 0.24 |  |
| 46 | Nilah | 0.00 | 0.22 | 0.22 |  |
| 47 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 48 | Annie | 0.00 | 0.00 | 0.00 |  |
| 49 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 50 | Brand | 0.00 | 0.00 | 0.00 |  |
| 51 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 52 | Corki | 0.00 | 0.00 | 0.00 |  |
| 53 | Elise | 0.00 | 0.00 | 0.00 |  |
| 54 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 55 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 56 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 57 | Lux | 0.00 | 0.00 | 0.00 |  |
| 58 | Nami | 0.00 | 0.00 | 0.00 |  |
| 59 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 60 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 61 | Senna | 0.00 | 0.00 | 0.00 |  |
| 62 | Sona | 0.00 | 0.00 | 0.00 |  |
| 63 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 64 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 65 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 66 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 67 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 68 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 69 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 70 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 71 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 72 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 73 | Hecarim | -0.01 | 0.15 | 0.16 |  |
| 74 | Ornn | -0.02 | 0.14 | 0.16 |  |
| 75 | Volibear | -0.02 | 0.14 | 0.16 |  |
| 76 | Azir | -0.03 | 0.00 | 0.03 |  |
| 77 | Gnar | -0.03 | 0.00 | 0.03 |  |
| 78 | Kai'Sa | -0.04 | 0.00 | 0.04 |  |
| 79 | LeBlanc | -0.04 | 0.00 | 0.04 |  |
| 80 | Nidalee | -0.04 | 0.00 | 0.04 |  |
| 81 | Jayce | -0.06 | 0.00 | 0.06 |  |
| 82 | Kindred | -0.06 | 0.00 | 0.06 |  |
| 83 | Thresh | -0.06 | 0.00 | 0.06 |  |
| 84 | Graves | -0.07 | 0.00 | 0.07 |  |
| 85 | Jinx | -0.09 | 0.00 | 0.09 |  |
| 86 | Karma | -0.09 | 0.00 | 0.09 |  |
| 87 | Orianna | -0.09 | 0.00 | 0.09 |  |
| 88 | Seraphine | -0.09 | 0.00 | 0.09 |  |
| 89 | Swain | -0.09 | 0.00 | 0.09 |  |
| 90 | Viktor | -0.09 | 0.00 | 0.09 |  |
| 91 | Illaoi | -0.10 | 0.14 | 0.24 |  |
| 92 | Sett | -0.10 | 0.14 | 0.24 |  |
| 93 | Shyvana | -0.10 | 0.14 | 0.24 |  |
| 94 | Garen | -0.11 | 0.37 | 0.48 |  |
| 95 | Briar | -0.12 | 0.00 | 0.12 |  |
| 96 | Kog'Maw | -0.12 | 0.00 | 0.12 |  |
| 97 | Rakan | -0.12 | 0.00 | 0.12 |  |
| 98 | Sylas | -0.12 | 0.00 | 0.12 |  |
| 99 | Urgot | -0.15 | 0.00 | 0.15 |  |
| 100 | Akali | -0.16 | 0.00 | 0.16 |  |
| 101 | Ambessa | -0.16 | 0.00 | 0.16 |  |
| 102 | Bel'Veth | -0.16 | 0.00 | 0.16 |  |
| 103 | Ekko | -0.16 | 0.00 | 0.16 |  |
| 104 | Lee Sin | -0.16 | 0.00 | 0.16 |  |
| 105 | Lillia | -0.16 | 0.00 | 0.16 |  |
| 106 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 107 | Qiyana | -0.16 | 0.00 | 0.16 |  |
| 108 | Rell | -0.16 | 0.00 | 0.16 |  |
| 109 | Riven | -0.16 | 0.00 | 0.16 |  |
| 110 | Talon | -0.16 | 0.00 | 0.16 |  |
| 111 | Sion | -0.17 | 0.58 | 0.75 |  |
| 112 | Smolder | -0.18 | 0.00 | 0.18 |  |
| 113 | Varus | -0.20 | 0.00 | 0.20 |  |
| 114 | Nasus | -0.24 | 0.24 | 0.48 |  |
| 115 | Aatrox | -0.24 | 0.00 | 0.24 |  |
| 116 | Amumu | -0.24 | 0.00 | 0.24 |  |
| 117 | Diana | -0.24 | 0.00 | 0.24 |  |
| 118 | Irelia | -0.24 | 0.00 | 0.24 |  |
| 119 | Kassadin | -0.24 | 0.00 | 0.24 |  |
| 120 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 121 | Leona | -0.24 | 0.00 | 0.24 |  |
| 122 | Nautilus | -0.24 | 0.00 | 0.24 |  |
| 123 | Renekton | -0.24 | 0.00 | 0.24 |  |
| 124 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 125 | Tryndamere | -0.24 | 0.00 | 0.24 |  |
| 126 | Draven | -0.26 | 0.00 | 0.26 |  |
| 127 | Syndra | -0.26 | 0.00 | 0.26 |  |
| 128 | Aurelion Sol | -0.31 | 0.00 | 0.31 |  |
| 129 | Ivern | -0.33 | 0.00 | 0.33 |  |
| 130 | Skarner | -0.35 | 0.13 | 0.48 |  |
| 131 | Malzahar | -0.38 | 0.54 | 0.92 |  |
| 132 | Viego | -0.40 | 0.14 | 0.54 |  |
| 133 | Quinn | -0.41 | 0.00 | 0.41 |  |
| 134 | Mordekaiser | -0.42 | 0.06 | 0.48 |  |
| 135 | Kayn | -0.45 | 0.61 | 1.06 |  |
| 136 | Blitzcrank | -0.48 | 0.00 | 0.48 |  |
| 137 | Cho'Gath | -0.48 | 0.00 | 0.48 |  |
| 138 | Darius | -0.48 | 0.00 | 0.48 |  |
| 139 | Dr. Mundo | -0.48 | 0.00 | 0.48 |  |
| 140 | Rumble | -0.48 | 0.00 | 0.48 |  |
| 141 | Singed | -0.48 | 0.00 | 0.48 |  |
| 142 | Taric | -0.48 | 0.00 | 0.48 |  |
| 143 | Trundle | -0.48 | 0.00 | 0.48 |  |
| 144 | Yorick | -0.48 | 0.00 | 0.48 |  |
| 145 | Locke | -0.50 | 0.00 | 0.50 |  |
| 146 | Rammus | -0.53 | 0.24 | 0.77 |  |
| 147 | Caitlyn | -0.56 | 0.00 | 0.56 |  |
| 148 | Gragas | -0.56 | 0.00 | 0.56 |  |
| 149 | Jhin | -0.56 | 0.00 | 0.56 |  |
| 150 | Miss Fortune | -0.56 | 0.00 | 0.56 |  |
| 151 | Akshan | -0.62 | 0.00 | 0.62 |  |
| 152 | Lucian | -0.62 | 0.00 | 0.62 |  |
| 153 | Poppy | -0.64 | 0.00 | 0.64 |  |
| 154 | Vel'Koz | -0.65 | 0.00 | 0.65 |  |
| 155 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 156 | Pantheon | -0.72 | 0.44 | 1.16 |  |
| 157 | Xerath | -0.73 | 0.00 | 0.73 |  |
| 158 | Karthus | -0.74 | 0.00 | 0.74 |  |
| 159 | Twisted Fate | -0.74 | 0.00 | 0.74 |  |
| 160 | Warwick | -0.78 | 0.69 | 1.47 |  |
| 161 | Vi | -0.79 | 0.14 | 0.93 |  |
| 162 | Janna | -0.80 | 0.00 | 0.80 |  |
| 163 | Katarina | -0.80 | 0.00 | 0.80 |  |
| 164 | Shen | -0.82 | 0.24 | 1.06 |  |
| 165 | Pyke | -0.87 | 0.00 | 0.87 |  |
| 166 | Fiddlesticks | -0.94 | 0.00 | 0.94 |  |
| 167 | Taliyah | -1.00 | 0.00 | 1.00 |  |
| 168 | Naafiri | -1.02 | 0.00 | 1.02 |  |
| 169 | Zac | -1.10 | 0.00 | 1.10 |  |
| 170 | Nunu & Willump | -1.18 | 0.24 | 1.42 |  |
| 171 | Tahm Kench | -1.24 | 0.00 | 1.24 |  |
| 172 | Galio | -1.33 | 0.00 | 1.33 |  |
