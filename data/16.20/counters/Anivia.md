# Counters to Anivia (patch 26.20)

Every champion ranked by what its kit does against Anivia's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Anivia's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Anivia` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.00)

- **0.68** untargetable: Rappel makes Elise untargetable, dodging Anivia's Crystallize. Untargetable for 0.6 s; Crystallize takes 0.25 s to land, enough to react. (Elise E Rappel → Anivia W Crystallize)
- **0.44** untargetable: Rappel makes Elise untargetable, dodging Anivia's Flash Frost. Untargetable for 0.6 s; Flash Frost takes 1.41 s to land, enough to react. (Elise E Rappel → Anivia Q Flash Frost)
- **0.29** untargetable: Rappel makes Elise untargetable, dodging Anivia's Frostbite. Untargetable for 0.6 s; Frostbite takes 0.63 s to land, enough to react. (Elise E Rappel → Anivia E Frostbite)

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

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Anivia's Flash Frost (slow, stun). Immune for 1.5 s, long enough to use ahead of Flash Frost. (Udyr E Blazing Stampede → Anivia Q Flash Frost)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Anivia's Crystallize (airborne). Immune for 1.5 s, long enough to use ahead of Crystallize. (Udyr E Blazing Stampede → Anivia W Crystallize)
- **0.10** cc immunity: Blazing Stampede makes Udyr immune to Anivia's Glacial Storm (slow). Immune for 1.5 s, long enough to use ahead of Glacial Storm. (Udyr E Blazing Stampede → Anivia R Glacial Storm)
- Watch out: Anivia's basic attacks reach 475 units farther than Udyr's (600 vs 125 attack range).

### 5. Vladimir (net +0.78)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Anivia's Crystallize. Untargetable for 2 s, long enough to use ahead of Crystallize. (Vladimir W Sanguine Pool → Anivia W Crystallize)
- **0.46** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Anivia's Flash Frost. Untargetable for 2 s, long enough to use ahead of Flash Frost. (Vladimir W Sanguine Pool → Anivia Q Flash Frost)
- **0.31** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Anivia's Glacial Storm. Untargetable for 2 s, long enough to use ahead of Glacial Storm. (Vladimir W Sanguine Pool → Anivia R Glacial Storm)
- Watch out: Anivia's basic attacks reach 150 units farther than Vladimir's (600 vs 450 attack range).

### 6. Morgana (net +0.77)

- **0.70** cc immunity: Black Shield makes Morgana immune to Anivia's Crystallize (airborne). Immune for 5 s, long enough to use ahead of Crystallize. (Morgana E Black Shield → Anivia W Crystallize)
- **0.46** cc immunity: Black Shield makes Morgana immune to Anivia's Flash Frost (slow, stun). Immune for 5 s, long enough to use ahead of Flash Frost. (Morgana E Black Shield → Anivia Q Flash Frost)
- **0.08** cc immunity: Black Shield makes Morgana immune to Anivia's Glacial Storm (slow). Immune for 5 s, long enough to use ahead of Glacial Storm. (Morgana E Black Shield → Anivia R Glacial Storm)
- Watch out: Anivia's basic attacks reach 150 units farther than Morgana's (600 vs 450 attack range).

### 7. Gwen (net +0.76)

- **0.68** untargetable: Hallowed Mist makes Gwen untargetable, dodging Anivia's Crystallize. Untargetable for ?; Crystallize takes 0.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Anivia W Crystallize)
- **0.44** untargetable: Hallowed Mist makes Gwen untargetable, dodging Anivia's Flash Frost. Untargetable for ?; Flash Frost takes 1.41 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Anivia Q Flash Frost)
- **0.29** untargetable: Hallowed Mist makes Gwen untargetable, dodging Anivia's Frostbite. Untargetable for ?; Frostbite takes 0.63 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 450 units farther than Gwen's (600 vs 150 attack range).

### 8. Yuumi (net +0.71)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Anivia's Flash Frost. Untargetable for ?; Flash Frost takes 1.41 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Anivia Q Flash Frost)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Anivia's Crystallize. Untargetable for ?; Crystallize takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Anivia W Crystallize)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Anivia's Frostbite. Untargetable for ?; Frostbite takes 0.63 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Anivia E Frostbite)
- Watch out: Flash Frost's stun interrupts Yuumi's Final Chapter (normal channel).

### 9. Braum (net +0.69)

- **0.65** projectile block: Unbreakable blocks Anivia's Flash Frost, a projectile. Unbreakable for 4 s, long enough to use ahead of Flash Frost. (Braum E Unbreakable → Anivia Q Flash Frost)
- **0.39** projectile block: Unbreakable blocks Anivia's Frostbite, a projectile. Unbreakable for 4 s, long enough to use ahead of Frostbite. (Braum E Unbreakable → Anivia E Frostbite)
- **0.33** projectile block: Unbreakable blocks Anivia's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Anivia basic attacks)
- Watch out: Anivia's basic attacks reach 475 units farther than Braum's (600 vs 125 attack range).

### 10. Master Yi (net +0.66)

- **0.68** untargetable: Alpha Strike makes Master Yi untargetable, dodging Anivia's Crystallize. Untargetable for ?; Crystallize takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Anivia W Crystallize)
- **0.44** untargetable: Alpha Strike makes Master Yi untargetable, dodging Anivia's Flash Frost. Untargetable for ?; Flash Frost takes 1.41 s to land, enough to react. (Master Yi Q Alpha Strike → Anivia Q Flash Frost)
- **0.29** untargetable: Alpha Strike makes Master Yi untargetable, dodging Anivia's Frostbite. Untargetable for ?; Frostbite takes 0.63 s to land, enough to react. (Master Yi Q Alpha Strike → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 425 units farther than Master Yi's (600 vs 175 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.00 | 1.00 | 0.00 |  |
| 2 | Fiora | +0.94 | 1.18 | 0.24 |  |
| 3 | Maokai | +0.86 | 1.10 | 0.24 |  |
| 4 | Udyr | +0.83 | 1.07 | 0.24 |  |
| 5 | Vladimir | +0.78 | 1.05 | 0.27 |  |
| 6 | Morgana | +0.77 | 0.95 | 0.18 |  |
| 7 | Gwen | +0.76 | 1.00 | 0.24 |  |
| 8 | Yuumi | +0.71 | 1.24 | 0.53 |  |
| 9 | Braum | +0.69 | 0.93 | 0.24 | projectile block (Unbreakable) |
| 10 | Master Yi | +0.66 | 1.13 | 0.47 |  |
| 11 | Lissandra | +0.63 | 0.63 | 0.00 |  |
| 12 | Aurora | +0.59 | 0.59 | 0.00 |  |
| 13 | Mel | +0.58 | 0.58 | 0.00 |  |
| 14 | Bard | +0.57 | 0.63 | 0.06 |  |
| 15 | Samira | +0.56 | 0.60 | 0.04 | projectile block (Blade Whirl) |
| 16 | Ekko | +0.51 | 0.67 | 0.16 |  |
| 17 | Yasuo | +0.51 | 0.67 | 0.16 | projectile block (Wind Wall) |
| 18 | Xayah | +0.51 | 0.60 | 0.09 |  |
| 19 | Rek'Sai | +0.48 | 0.64 | 0.16 |  |
| 20 | Camille | +0.48 | 0.60 | 0.12 |  |
| 21 | Evelynn | +0.45 | 0.61 | 0.16 |  |
| 22 | Shaco | +0.45 | 0.61 | 0.16 |  |
| 23 | Zed | +0.42 | 0.58 | 0.16 |  |
| 24 | Kled | +0.41 | 0.51 | 0.10 |  |
| 25 | Zaahen | +0.38 | 0.54 | 0.16 |  |
| 26 | Kalista | +0.37 | 0.40 | 0.03 |  |
| 27 | Nocturne | +0.36 | 0.60 | 0.24 |  |
| 28 | Kayle | +0.35 | 0.35 | 0.00 |  |
| 29 | Rengar | +0.33 | 0.81 | 0.48 |  |
| 30 | Gangplank | +0.29 | 0.77 | 0.48 |  |
| 31 | Sivir | +0.28 | 0.40 | 0.12 |  |
| 32 | Kindred | +0.27 | 0.33 | 0.06 |  |
| 33 | Milio | +0.26 | 0.35 | 0.09 |  |
| 34 | Lulu | +0.22 | 0.22 | 0.00 |  |
| 35 | Alistar | +0.20 | 0.44 | 0.24 |  |
| 36 | Teemo | +0.19 | 0.31 | 0.12 |  |
| 37 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 38 | Pantheon | +0.17 | 0.44 | 0.27 |  |
| 39 | Warwick | +0.16 | 0.69 | 0.53 |  |
| 40 | K'Sante | +0.16 | 0.28 | 0.12 |  |
| 41 | Corki | +0.14 | 0.14 | 0.00 |  |
| 42 | Vex | +0.14 | 0.14 | 0.00 |  |
| 43 | Aphelios | +0.11 | 0.11 | 0.00 |  |
| 44 | Heimerdinger | +0.11 | 0.11 | 0.00 |  |
| 45 | Xin Zhao | +0.10 | 0.34 | 0.24 |  |
| 46 | Olaf | +0.07 | 0.55 | 0.48 |  |
| 47 | Malphite | +0.06 | 0.30 | 0.24 |  |
| 48 | Malzahar | +0.02 | 0.54 | 0.52 |  |
| 49 | Jarvan IV | +0.02 | 0.14 | 0.12 |  |
| 50 | Yone | +0.02 | 0.14 | 0.12 |  |
| 51 | Jax | +0.01 | 0.25 | 0.24 |  |
| 52 | Kayn | 0.00 | 0.61 | 0.61 |  |
| 53 | Nilah | 0.00 | 0.22 | 0.22 |  |
| 54 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 55 | Annie | 0.00 | 0.00 | 0.00 |  |
| 56 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 57 | Brand | 0.00 | 0.00 | 0.00 |  |
| 58 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 59 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 60 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 61 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 62 | Lux | 0.00 | 0.00 | 0.00 |  |
| 63 | Nami | 0.00 | 0.00 | 0.00 |  |
| 64 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 65 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 66 | Senna | 0.00 | 0.00 | 0.00 |  |
| 67 | Sona | 0.00 | 0.00 | 0.00 |  |
| 68 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 69 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 70 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 71 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 72 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 73 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 74 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 75 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 76 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 77 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 78 | Hecarim | -0.01 | 0.15 | 0.16 |  |
| 79 | Ornn | -0.02 | 0.14 | 0.16 |  |
| 80 | Volibear | -0.02 | 0.14 | 0.16 |  |
| 81 | Azir | -0.03 | 0.00 | 0.03 |  |
| 82 | Gnar | -0.03 | 0.00 | 0.03 |  |
| 83 | Kai'Sa | -0.04 | 0.00 | 0.04 |  |
| 84 | LeBlanc | -0.04 | 0.00 | 0.04 |  |
| 85 | Nidalee | -0.04 | 0.00 | 0.04 |  |
| 86 | Sion | -0.06 | 0.58 | 0.64 |  |
| 87 | Jayce | -0.06 | 0.00 | 0.06 |  |
| 88 | Thresh | -0.06 | 0.00 | 0.06 |  |
| 89 | Graves | -0.07 | 0.00 | 0.07 |  |
| 90 | Jinx | -0.09 | 0.00 | 0.09 |  |
| 91 | Karma | -0.09 | 0.00 | 0.09 |  |
| 92 | Orianna | -0.09 | 0.00 | 0.09 |  |
| 93 | Seraphine | -0.09 | 0.00 | 0.09 |  |
| 94 | Swain | -0.09 | 0.00 | 0.09 |  |
| 95 | Viktor | -0.09 | 0.00 | 0.09 |  |
| 96 | Illaoi | -0.10 | 0.14 | 0.24 |  |
| 97 | Sett | -0.10 | 0.14 | 0.24 |  |
| 98 | Shyvana | -0.10 | 0.14 | 0.24 |  |
| 99 | Garen | -0.11 | 0.37 | 0.48 |  |
| 100 | Varus | -0.11 | 0.00 | 0.11 |  |
| 101 | Briar | -0.12 | 0.00 | 0.12 |  |
| 102 | Fizz | -0.12 | 0.00 | 0.12 |  |
| 103 | Kog'Maw | -0.12 | 0.00 | 0.12 |  |
| 104 | Rakan | -0.12 | 0.00 | 0.12 |  |
| 105 | Sylas | -0.12 | 0.00 | 0.12 |  |
| 106 | Taric | -0.14 | 0.34 | 0.48 |  |
| 107 | Urgot | -0.15 | 0.00 | 0.15 |  |
| 108 | Akali | -0.16 | 0.00 | 0.16 |  |
| 109 | Ambessa | -0.16 | 0.00 | 0.16 |  |
| 110 | Bel'Veth | -0.16 | 0.00 | 0.16 |  |
| 111 | Lee Sin | -0.16 | 0.00 | 0.16 |  |
| 112 | Lillia | -0.16 | 0.00 | 0.16 |  |
| 113 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 114 | Qiyana | -0.16 | 0.00 | 0.16 |  |
| 115 | Rell | -0.16 | 0.00 | 0.16 |  |
| 116 | Riven | -0.16 | 0.00 | 0.16 |  |
| 117 | Talon | -0.16 | 0.00 | 0.16 |  |
| 118 | Smolder | -0.18 | 0.00 | 0.18 |  |
| 119 | Ivern | -0.22 | 0.00 | 0.22 |  |
| 120 | Viego | -0.23 | 0.14 | 0.37 |  |
| 121 | Nasus | -0.24 | 0.24 | 0.48 |  |
| 122 | Aatrox | -0.24 | 0.00 | 0.24 |  |
| 123 | Amumu | -0.24 | 0.00 | 0.24 |  |
| 124 | Aurelion Sol | -0.24 | 0.00 | 0.24 |  |
| 125 | Diana | -0.24 | 0.00 | 0.24 |  |
| 126 | Irelia | -0.24 | 0.00 | 0.24 |  |
| 127 | Kassadin | -0.24 | 0.00 | 0.24 |  |
| 128 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 129 | Leona | -0.24 | 0.00 | 0.24 |  |
| 130 | Nautilus | -0.24 | 0.00 | 0.24 |  |
| 131 | Renekton | -0.24 | 0.00 | 0.24 |  |
| 132 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 133 | Tryndamere | -0.24 | 0.00 | 0.24 |  |
| 134 | Quinn | -0.25 | 0.00 | 0.25 |  |
| 135 | Draven | -0.26 | 0.00 | 0.26 |  |
| 136 | Syndra | -0.26 | 0.00 | 0.26 |  |
| 137 | Caitlyn | -0.28 | 0.00 | 0.28 |  |
| 138 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 139 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 140 | Rammus | -0.32 | 0.24 | 0.56 |  |
| 141 | Akshan | -0.34 | 0.00 | 0.34 |  |
| 142 | Galio | -0.34 | 0.00 | 0.34 |  |
| 143 | Lucian | -0.34 | 0.00 | 0.34 |  |
| 144 | Skarner | -0.35 | 0.13 | 0.48 |  |
| 145 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 146 | Shen | -0.37 | 0.24 | 0.61 |  |
| 147 | Vel'Koz | -0.37 | 0.00 | 0.37 |  |
| 148 | Twisted Fate | -0.39 | 0.00 | 0.39 |  |
| 149 | Janna | -0.40 | 0.00 | 0.40 |  |
| 150 | Mordekaiser | -0.42 | 0.06 | 0.48 |  |
| 151 | Xerath | -0.42 | 0.00 | 0.42 |  |
| 152 | Gragas | -0.43 | 0.00 | 0.43 |  |
| 153 | Poppy | -0.44 | 0.00 | 0.44 |  |
| 154 | Karthus | -0.46 | 0.00 | 0.46 |  |
| 155 | Vi | -0.48 | 0.14 | 0.62 |  |
| 156 | Blitzcrank | -0.48 | 0.00 | 0.48 |  |
| 157 | Cho'Gath | -0.48 | 0.00 | 0.48 |  |
| 158 | Darius | -0.48 | 0.00 | 0.48 |  |
| 159 | Dr. Mundo | -0.48 | 0.00 | 0.48 |  |
| 160 | Rumble | -0.48 | 0.00 | 0.48 |  |
| 161 | Singed | -0.48 | 0.00 | 0.48 |  |
| 162 | Trundle | -0.48 | 0.00 | 0.48 |  |
| 163 | Yorick | -0.48 | 0.00 | 0.48 |  |
| 164 | Locke | -0.50 | 0.00 | 0.50 |  |
| 165 | Fiddlesticks | -0.52 | 0.00 | 0.52 |  |
| 166 | Katarina | -0.52 | 0.00 | 0.52 |  |
| 167 | Taliyah | -0.52 | 0.00 | 0.52 |  |
| 168 | Naafiri | -0.57 | 0.00 | 0.57 |  |
| 169 | Nunu & Willump | -0.73 | 0.24 | 0.97 |  |
| 170 | Tahm Kench | -0.74 | 0.00 | 0.74 |  |
| 171 | Zac | -0.74 | 0.00 | 0.74 |  |
| 172 | Pyke | -0.75 | 0.00 | 0.75 |  |
