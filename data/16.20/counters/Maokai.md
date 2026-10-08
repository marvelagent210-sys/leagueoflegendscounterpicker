# Counters to Maokai (patch 26.20)

Every champion ranked by what its kit does against Maokai's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Maokai's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Maokai` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.74)

- **0.80** spell shield: Spell Shield's spell shield blocks Maokai's Nature's Grasp. Spell shield for 1.5 s, long enough to use ahead of Nature's Grasp. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Maokai R Nature's Grasp)
- **0.73** spell shield: Spell Shield's spell shield blocks Maokai's Twisted Advance. Spell shield for 1.5 s, long enough to use ahead of Twisted Advance. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Maokai W Twisted Advance)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Maokai's (500 vs 125 attack range). Maokai closes the gap with Twisted Advance. (Sivir basic attacks → Maokai basic attacks)

### 2. Fiora (net +1.03)

- **0.90** parry: Riposte parries Maokai's Nature's Grasp and stuns back. Parry for 0.75 s; Nature's Grasp takes 30.5 s to land, enough to react. Negating Nature's Grasp's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Maokai R Nature's Grasp)
- **0.88** parry: Riposte parries Maokai's Twisted Advance and stuns back. Parry for 0.75 s; Twisted Advance takes 0.4 s to land, enough to react. Negating Twisted Advance's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Maokai W Twisted Advance)
- **0.51** parry: Riposte parries Maokai's Bramble Smash and stuns back. Parry for 0.75 s; Bramble Smash takes 0.68 s to land, enough to react. Negating Bramble Smash's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Fiora's Riposte.

### 3. Udyr (net +0.98)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Maokai's Twisted Advance (root). Immune for 1.5 s, long enough to use ahead of Twisted Advance. (Udyr E Blazing Stampede → Maokai W Twisted Advance)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Maokai's Nature's Grasp (root). Immune for 1.5 s, long enough to use ahead of Nature's Grasp. (Udyr E Blazing Stampede → Maokai R Nature's Grasp)
- **0.63** cc immunity: Blazing Stampede makes Udyr immune to Maokai's Bramble Smash (airborne, slow, stun). Immune for 1.5 s, long enough to use ahead of Bramble Smash. (Udyr E Blazing Stampede → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Udyr's Blazing Stampede.

### 4. Aurora (net +0.93)

- **0.75** untargetable: Between Worlds makes Aurora untargetable, dodging Maokai's Nature's Grasp. Untargetable for 0.4 s; Nature's Grasp takes 30.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Maokai R Nature's Grasp)
- **0.46** untargetable: Between Worlds makes Aurora untargetable, dodging Maokai's Twisted Advance. Untargetable for 0.4 s; Twisted Advance takes 0.4 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Maokai W Twisted Advance)
- **0.30** untargetable: Between Worlds makes Aurora untargetable, dodging Maokai's Bramble Smash. Untargetable for 0.4 s; Bramble Smash takes 0.68 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Aurora's Between Worlds.

### 5. Yuumi (net +0.92)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Maokai's Twisted Advance. Untargetable for ?; Twisted Advance takes 0.4 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Maokai W Twisted Advance)
- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Maokai's Nature's Grasp. Untargetable for ?; Nature's Grasp takes 30.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Maokai R Nature's Grasp)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Maokai's Bramble Smash. Untargetable for ?; Bramble Smash takes 0.68 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Yuumi's Final Chapter.

### 6. Kayle (net +0.92)

- **0.40** invulnerable: Divine Judgment makes Kayle invulnerable to Maokai's Nature's Grasp (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Nature's Grasp. (Kayle R Divine Judgment → Maokai R Nature's Grasp)
- **0.36** range: Kayle's basic attacks reach 500 units farther than Maokai's (625 vs 125 attack range). Maokai closes the gap with Twisted Advance. (Kayle basic attacks → Maokai basic attacks)
- **0.24** invulnerable: Divine Judgment makes Kayle invulnerable to Maokai's Twisted Advance (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Twisted Advance. (Kayle R Divine Judgment → Maokai W Twisted Advance)

### 7. Xayah (net +0.90)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Maokai's Nature's Grasp. Untargetable for 1.5 s, long enough to use ahead of Nature's Grasp. (Xayah R Featherstorm → Maokai R Nature's Grasp)
- **0.46** untargetable: Featherstorm makes Xayah untargetable, dodging Maokai's Twisted Advance. Untargetable for 1.5 s, long enough to use ahead of Twisted Advance. (Xayah R Featherstorm → Maokai W Twisted Advance)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range). Maokai closes the gap with Twisted Advance. (Xayah basic attacks → Maokai basic attacks)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Xayah's Bladecaller.

### 8. Vladimir (net +0.88)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Maokai's Nature's Grasp. Untargetable for 2 s, long enough to use ahead of Nature's Grasp. (Vladimir W Sanguine Pool → Maokai R Nature's Grasp)
- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Maokai's Twisted Advance. Untargetable for 2 s, long enough to use ahead of Twisted Advance. (Vladimir W Sanguine Pool → Maokai W Twisted Advance)
- **0.41** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Maokai's Bramble Smash. Untargetable for 2 s, long enough to use ahead of Bramble Smash. (Vladimir W Sanguine Pool → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Vladimir's Hemoplague.

### 9. Olaf (net +0.76)

- **0.80** cc immunity: Ragnarok makes Olaf immune to Maokai's Nature's Grasp (root). Immune for 3 s, long enough to use ahead of Nature's Grasp. (Olaf R Ragnarok → Maokai R Nature's Grasp)
- **0.48** cc immunity: Ragnarok makes Olaf immune to Maokai's Twisted Advance (root). Immune for 3 s, long enough to use ahead of Twisted Advance. (Olaf R Ragnarok → Maokai W Twisted Advance)
- **0.31** cc immunity: Ragnarok makes Olaf immune to Maokai's Bramble Smash (airborne, slow, stun). Immune for 3 s, long enough to use ahead of Bramble Smash. (Olaf R Ragnarok → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Olaf's Reckless Swing.

### 10. Gwen (net +0.72)

- **0.80** untargetable: Hallowed Mist makes Gwen untargetable, dodging Maokai's Nature's Grasp. Untargetable for ?; Nature's Grasp takes 30.5 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Maokai R Nature's Grasp)
- **0.73** untargetable: Hallowed Mist makes Gwen untargetable, dodging Maokai's Twisted Advance. Untargetable for ?; Twisted Advance takes 0.4 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Maokai W Twisted Advance)
- **0.40** untargetable: Hallowed Mist makes Gwen untargetable, dodging Maokai's Bramble Smash. Untargetable for ?; Bramble Smash takes 0.68 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Gwen's Needlework.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.74 | 1.74 | 0.00 |  |
| 2 | Fiora | +1.03 | 1.48 | 0.45 |  |
| 3 | Udyr | +0.98 | 1.57 | 0.59 |  |
| 4 | Aurora | +0.93 | 1.35 | 0.42 |  |
| 5 | Yuumi | +0.92 | 1.90 | 0.98 |  |
| 6 | Kayle | +0.92 | 0.92 | 0.00 |  |
| 7 | Xayah | +0.90 | 1.44 | 0.54 |  |
| 8 | Vladimir | +0.88 | 1.47 | 0.59 |  |
| 9 | Olaf | +0.76 | 1.13 | 0.37 |  |
| 10 | Gwen | +0.72 | 1.27 | 0.55 |  |
| 11 | Master Yi | +0.68 | 1.39 | 0.71 |  |
| 12 | Samira | +0.66 | 1.38 | 0.72 | projectile block (Blade Whirl) |
| 13 | Elise | +0.58 | 1.59 | 1.01 |  |
| 14 | Kindred | +0.56 | 0.96 | 0.40 |  |
| 15 | Morgana | +0.52 | 1.50 | 0.98 |  |
| 16 | Zed | +0.52 | 1.06 | 0.54 |  |
| 17 | Milio | +0.50 | 1.20 | 0.70 |  |
| 18 | Bard | +0.49 | 1.48 | 0.99 |  |
| 19 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 20 | Mel | +0.39 | 1.33 | 0.94 | projectile block (Rebuttal) |
| 21 | Kalista | +0.39 | 1.11 | 0.72 |  |
| 22 | Braum | +0.38 | 1.18 | 0.80 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 23 | Gangplank | +0.38 | 1.08 | 0.70 |  |
| 24 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 25 | Nocturne | +0.37 | 1.48 | 1.11 |  |
| 26 | Rengar | +0.36 | 1.23 | 0.87 |  |
| 27 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 28 | Lissandra | +0.35 | 1.34 | 0.99 |  |
| 29 | Sion | +0.32 | 1.14 | 0.82 |  |
| 30 | Shaco | +0.22 | 1.12 | 0.90 |  |
| 31 | Yasuo | +0.15 | 1.10 | 0.95 | projectile block (Wind Wall), projectile block (Wind Wall), projectile block (Wind Wall) |
| 32 | Taric | +0.07 | 0.49 | 0.42 |  |
| 33 | Nidalee | +0.03 | 0.30 | 0.27 |  |
| 34 | Ekko | +0.01 | 1.14 | 1.13 |  |
| 35 | Rek'Sai | 0.00 | 1.13 | 1.13 |  |
| 36 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 37 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 38 | Kog'Maw | -0.03 | 0.27 | 0.30 |  |
| 39 | Teemo | -0.05 | 0.69 | 0.74 |  |
| 40 | Warwick | -0.10 | 1.20 | 1.30 |  |
| 41 | Zeri | -0.11 | 0.44 | 0.55 |  |
| 42 | Kled | -0.14 | 1.15 | 1.29 |  |
| 43 | Malzahar | -0.15 | 1.00 | 1.15 |  |
| 44 | Lulu | -0.15 | 0.61 | 0.76 |  |
| 45 | Camille | -0.18 | 1.12 | 1.30 |  |
| 46 | Singed | -0.18 | 0.67 | 0.85 | grounding (Mega Adhesive) |
| 47 | Nasus | -0.18 | 0.27 | 0.45 |  |
| 48 | Garen | -0.19 | 0.57 | 0.76 |  |
| 49 | Zaahen | -0.20 | 1.13 | 1.33 |  |
| 50 | Ezreal | -0.23 | 0.32 | 0.55 |  |
| 51 | Pantheon | -0.24 | 0.64 | 0.88 |  |
| 52 | Twisted Fate | -0.24 | 0.43 | 0.67 |  |
| 53 | Kayn | -0.26 | 1.12 | 1.38 |  |
| 54 | Vayne | -0.27 | 0.43 | 0.70 |  |
| 55 | Alistar | -0.35 | 0.90 | 1.25 |  |
| 56 | Vex | -0.36 | 0.34 | 0.70 |  |
| 57 | Zoe | -0.38 | 0.32 | 0.70 |  |
| 58 | Cassiopeia | -0.39 | 0.70 | 1.09 | grounding (Miasma) |
| 59 | Sona | -0.39 | 0.41 | 0.80 |  |
| 60 | Smolder | -0.40 | 0.32 | 0.72 |  |
| 61 | LeBlanc | -0.40 | 0.22 | 0.62 |  |
| 62 | Evelynn | -0.41 | 1.12 | 1.53 |  |
| 63 | Yorick | -0.42 | 0.00 | 0.42 |  |
| 64 | Soraka | -0.43 | 0.27 | 0.70 |  |
| 65 | Ashe | -0.44 | 0.36 | 0.80 |  |
| 66 | Zilean | -0.44 | 0.32 | 0.76 |  |
| 67 | Miss Fortune | -0.45 | 0.32 | 0.77 |  |
| 68 | Graves | -0.46 | 0.24 | 0.70 |  |
| 69 | Jinx | -0.47 | 0.29 | 0.76 |  |
| 70 | Illaoi | -0.48 | 0.07 | 0.55 |  |
| 71 | Quinn | -0.49 | 0.38 | 0.87 |  |
| 72 | Akshan | -0.49 | 0.34 | 0.83 |  |
| 73 | Varus | -0.52 | 0.39 | 0.91 |  |
| 74 | Jayce | -0.54 | 0.30 | 0.84 |  |
| 75 | Kennen | -0.54 | 0.29 | 0.83 |  |
| 76 | Locke | -0.55 | 0.00 | 0.55 |  |
| 77 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 78 | Corki | -0.61 | 0.37 | 0.98 |  |
| 79 | Draven | -0.62 | 0.36 | 0.98 |  |
| 80 | Lucian | -0.63 | 0.36 | 0.99 |  |
| 81 | Kha'Zix | -0.63 | 0.00 | 0.63 |  |
| 82 | Karthus | -0.64 | 0.19 | 0.83 |  |
| 83 | Nilah | -0.66 | 0.38 | 1.04 |  |
| 84 | Aphelios | -0.67 | 0.48 | 1.15 |  |
| 85 | Tristana | -0.67 | 0.36 | 1.03 |  |
| 86 | Wukong | -0.68 | 0.00 | 0.68 |  |
| 87 | Lux | -0.69 | 0.29 | 0.98 |  |
| 88 | Lillia | -0.69 | 0.11 | 0.80 |  |
| 89 | Jax | -0.70 | 0.28 | 0.98 |  |
| 90 | Brand | -0.70 | 0.22 | 0.92 |  |
| 91 | Katarina | -0.70 | 0.12 | 0.82 |  |
| 92 | Azir | -0.71 | 0.27 | 0.98 |  |
| 93 | Karma | -0.71 | 0.22 | 0.93 |  |
| 94 | Kassadin | -0.71 | 0.00 | 0.71 |  |
| 95 | Annie | -0.73 | 0.22 | 0.95 |  |
| 96 | Xin Zhao | -0.74 | 0.53 | 1.27 |  |
| 97 | Viktor | -0.74 | 0.32 | 1.06 |  |
| 98 | Orianna | -0.74 | 0.27 | 1.01 |  |
| 99 | Veigar | -0.74 | 0.24 | 0.98 |  |
| 100 | Renekton | -0.74 | 0.00 | 0.74 |  |
| 101 | Heimerdinger | -0.75 | 0.30 | 1.05 |  |
| 102 | Gnar | -0.76 | 0.33 | 1.09 |  |
| 103 | Aatrox | -0.76 | 0.00 | 0.76 |  |
| 104 | Renata Glasc | -0.77 | 0.38 | 1.15 |  |
| 105 | Talon | -0.78 | 0.00 | 0.78 |  |
| 106 | Lee Sin | -0.80 | 0.00 | 0.80 |  |
| 107 | Senna | -0.81 | 0.32 | 1.13 |  |
| 108 | Syndra | -0.82 | 0.22 | 1.04 |  |
| 109 | Skarner | -0.82 | 0.12 | 0.94 |  |
| 110 | Ahri | -0.83 | 0.22 | 1.05 |  |
| 111 | Mordekaiser | -0.84 | 0.06 | 0.90 |  |
| 112 | Bel'Veth | -0.85 | 0.00 | 0.85 |  |
| 113 | Seraphine | -0.86 | 0.29 | 1.15 |  |
| 114 | Ziggs | -0.86 | 0.27 | 1.13 |  |
| 115 | Anivia | -0.86 | 0.24 | 1.10 |  |
| 116 | Vel'Koz | -0.88 | 0.27 | 1.15 |  |
| 117 | Caitlyn | -0.89 | 0.36 | 1.25 |  |
| 118 | Swain | -0.89 | 0.21 | 1.10 |  |
| 119 | Akali | -0.90 | 0.00 | 0.90 |  |
| 120 | Zyra | -0.91 | 0.24 | 1.15 |  |
| 121 | Ryze | -0.92 | 0.24 | 1.16 |  |
| 122 | Ivern | -0.92 | 0.19 | 1.11 |  |
| 123 | Cho'Gath | -0.92 | 0.00 | 0.92 |  |
| 124 | Xerath | -0.93 | 0.27 | 1.20 |  |
| 125 | Neeko | -0.93 | 0.22 | 1.15 |  |
| 126 | Hecarim | -0.93 | 0.07 | 1.00 |  |
| 127 | Sett | -0.93 | 0.07 | 1.00 |  |
| 128 | Shyvana | -0.93 | 0.07 | 1.00 |  |
| 129 | Malphite | -0.95 | 0.25 | 1.20 |  |
| 130 | Darius | -0.98 | 0.00 | 0.98 |  |
| 131 | Fizz | -0.98 | 0.00 | 0.98 |  |
| 132 | Trundle | -0.98 | 0.00 | 0.98 |  |
| 133 | Aurelion Sol | -0.99 | 0.22 | 1.21 |  |
| 134 | Nami | -1.00 | 0.22 | 1.22 |  |
| 135 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 136 | Hwei | -1.01 | 0.23 | 1.24 |  |
| 137 | Riven | -1.02 | 0.00 | 1.02 |  |
| 138 | Diana | -1.04 | 0.00 | 1.04 |  |
| 139 | Blitzcrank | -1.05 | 0.00 | 1.05 |  |
| 140 | Janna | -1.06 | 0.36 | 1.42 |  |
| 141 | Irelia | -1.09 | 0.05 | 1.14 |  |
| 142 | Jhin | -1.10 | 0.27 | 1.37 |  |
| 143 | Thresh | -1.10 | 0.19 | 1.29 |  |
| 144 | Urgot | -1.10 | 0.15 | 1.25 |  |
| 145 | Shen | -1.18 | 0.27 | 1.45 |  |
| 146 | Sylas | -1.18 | 0.00 | 1.18 |  |
| 147 | Nautilus | -1.20 | 0.00 | 1.20 |  |
| 148 | Volibear | -1.21 | 0.07 | 1.28 |  |
| 149 | Jarvan IV | -1.24 | 0.07 | 1.31 |  |
| 150 | Yone | -1.25 | 0.07 | 1.32 |  |
| 151 | Leona | -1.25 | 0.00 | 1.25 |  |
| 152 | Rakan | -1.27 | 0.13 | 1.40 |  |
| 153 | Fiddlesticks | -1.30 | 0.20 | 1.50 |  |
| 154 | Qiyana | -1.32 | 0.00 | 1.32 |  |
| 155 | Naafiri | -1.35 | 0.00 | 1.35 |  |
| 156 | Amumu | -1.40 | 0.00 | 1.40 |  |
| 157 | Galio | -1.40 | 0.00 | 1.40 |  |
| 158 | Poppy | -1.40 | 0.00 | 1.40 |  |
| 159 | Rammus | -1.41 | 0.27 | 1.68 |  |
| 160 | Briar | -1.44 | 0.00 | 1.44 |  |
| 161 | Nunu & Willump | -1.47 | 0.22 | 1.69 |  |
| 162 | Ornn | -1.47 | 0.07 | 1.54 |  |
| 163 | K'Sante | -1.48 | 0.14 | 1.62 |  |
| 164 | Sejuani | -1.50 | 0.00 | 1.50 |  |
| 165 | Viego | -1.53 | 0.16 | 1.69 |  |
| 166 | Pyke | -1.54 | 0.00 | 1.54 |  |
| 167 | Gragas | -1.63 | 0.00 | 1.63 |  |
| 168 | Taliyah | -1.66 | 0.27 | 1.93 |  |
| 169 | Vi | -1.66 | 0.07 | 1.73 |  |
| 170 | Rell | -1.67 | 0.00 | 1.67 |  |
| 171 | Tahm Kench | -1.82 | 0.00 | 1.82 |  |
| 172 | Zac | -2.00 | 0.00 | 2.00 |  |
