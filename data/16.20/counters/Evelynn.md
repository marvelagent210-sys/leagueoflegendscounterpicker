# Counters to Evelynn (patch 26.20)

Every champion ranked by what its kit does against Evelynn's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Evelynn's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Evelynn` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.61)

- **0.90** spell shield: Spell Shield's spell shield blocks Evelynn's Last Caress. Spell shield for 1.5 s, long enough to use ahead of Last Caress. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Evelynn R Last Caress)
- **0.59** spell shield: Spell Shield's spell shield blocks Evelynn's Empowered Whiplash. Spell shield for 1.5 s, long enough to use ahead of Empowered Whiplash. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Evelynn E Empowered Whiplash)
- **0.31** range: Sivir's basic attacks reach 375 units farther than Evelynn's (500 vs 125 attack range). Evelynn closes the gap with Empowered Whiplash, Last Caress. (Sivir basic attacks → Evelynn basic attacks)

### 2. Kayle (net +1.40)

- **0.90** invulnerable: Divine Judgment makes Kayle invulnerable to Evelynn's Last Caress. Invulnerable for 2.5 s, long enough to use ahead of Last Caress. (Kayle R Divine Judgment → Evelynn R Last Caress)
- **0.38** invulnerable: Divine Judgment makes Kayle invulnerable to Evelynn's Empowered Whiplash. Invulnerable for 2.5 s, long enough to use ahead of Empowered Whiplash. (Kayle R Divine Judgment → Evelynn E Empowered Whiplash)
- **0.24** range: Kayle's basic attacks reach 500 units farther than Evelynn's (625 vs 125 attack range). Evelynn closes the gap with Empowered Whiplash, Last Caress. (Kayle basic attacks → Evelynn basic attacks)

### 3. Fiora (net +1.20)

- **0.90** parry: Riposte parries Evelynn's Last Caress. Parry for 0.75 s; Last Caress takes 0.35 s to land, enough to react. (Fiora W Riposte → Evelynn R Last Caress)
- **0.67** parry: Riposte parries Evelynn's Allure and stuns back. Parry for 0.75 s; Allure takes 0.25 s to land, enough to react. Negating Allure's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Evelynn W Allure)
- **0.62** parry: Riposte parries Evelynn's Empowered Whiplash. Parry for 0.75 s, timed to Empowered Whiplash. (Fiora W Riposte → Evelynn E Empowered Whiplash)
- Watch out: Last Caress makes Evelynn untargetable, dodging Fiora's Riposte.

### 4. Elise (net +1.15)

- **0.90** untargetable: Rappel makes Elise untargetable, dodging Evelynn's Last Caress. Untargetable for 0.6 s; Last Caress takes 0.35 s to land, enough to react. (Elise E Rappel → Evelynn R Last Caress)
- **0.59** untargetable: Rappel makes Elise untargetable, dodging Evelynn's Empowered Whiplash. Untargetable for 0.6 s, timed to Empowered Whiplash. (Elise E Rappel → Evelynn E Empowered Whiplash)
- **0.54** untargetable: Rappel makes Elise untargetable, dodging Evelynn's Allure. Untargetable for 0.6 s; Allure takes 0.25 s to land, enough to react. (Elise E Rappel → Evelynn W Allure)
- Watch out: Last Caress makes Evelynn untargetable, dodging Elise's Cocoon.

### 5. Kindred (net +1.07)

- **0.72** invulnerable: Lamb's Respite makes Kindred invulnerable to Evelynn's Last Caress. Invulnerable for ?; Last Caress takes 0.35 s to land, enough to react. (Kindred R Lamb's Respite → Evelynn R Last Caress)
- **0.36** invulnerable: Lamb's Respite makes Kindred invulnerable to Evelynn's Empowered Whiplash. Invulnerable for ?, timed to Empowered Whiplash. (Kindred R Lamb's Respite → Evelynn E Empowered Whiplash)
- **0.31** range: Kindred's basic attacks reach 375 units farther than Evelynn's (500 vs 125 attack range). Evelynn closes the gap with Empowered Whiplash, Last Caress. (Kindred basic attacks → Evelynn basic attacks)
- Watch out: Last Caress makes Evelynn untargetable, dodging Kindred's Mounting Dread.

### 6. Master Yi (net +1.01)

- **0.90** untargetable: Alpha Strike makes Master Yi untargetable, dodging Evelynn's Last Caress. Untargetable for ?; Last Caress takes 0.35 s to land, enough to react. (Master Yi Q Alpha Strike → Evelynn R Last Caress)
- **0.59** untargetable: Alpha Strike makes Master Yi untargetable, dodging Evelynn's Empowered Whiplash. Untargetable for ?, timed to Empowered Whiplash. (Master Yi Q Alpha Strike → Evelynn E Empowered Whiplash)
- **0.54** untargetable: Alpha Strike makes Master Yi untargetable, dodging Evelynn's Allure. Untargetable for ?; Allure takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Evelynn W Allure)
- Watch out: Last Caress makes Evelynn untargetable, dodging Master Yi's Alpha Strike.

### 7. Vladimir (net +1.00)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Evelynn's Last Caress. Untargetable for 2 s, long enough to use ahead of Last Caress. (Vladimir W Sanguine Pool → Evelynn R Last Caress)
- **0.62** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Evelynn's Empowered Whiplash. Untargetable for 2 s, long enough to use ahead of Empowered Whiplash. (Vladimir W Sanguine Pool → Evelynn E Empowered Whiplash)
- **0.57** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Evelynn's Allure. Untargetable for 2 s, long enough to use ahead of Allure. (Vladimir W Sanguine Pool → Evelynn W Allure)
- Watch out: Last Caress makes Evelynn untargetable, dodging Vladimir's Hemoplague.

### 8. Xayah (net +0.91)

- **0.79** untargetable: Featherstorm makes Xayah untargetable, dodging Evelynn's Last Caress. Untargetable for 1.5 s, long enough to use ahead of Last Caress. (Xayah R Featherstorm → Evelynn R Last Caress)
- **0.37** untargetable: Featherstorm makes Xayah untargetable, dodging Evelynn's Empowered Whiplash. Untargetable for 1.5 s, long enough to use ahead of Empowered Whiplash. (Xayah R Featherstorm → Evelynn E Empowered Whiplash)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Evelynn's Allure. Untargetable for 1.5 s, long enough to use ahead of Allure. (Xayah R Featherstorm → Evelynn W Allure)
- Watch out: Last Caress makes Evelynn untargetable, dodging Xayah's Featherstorm.

### 9. Aurora (net +0.85)

- **0.79** untargetable: Between Worlds makes Aurora untargetable, dodging Evelynn's Last Caress. Untargetable for 0.4 s; Last Caress takes 0.35 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Evelynn R Last Caress)
- **0.37** untargetable: Between Worlds makes Aurora untargetable, dodging Evelynn's Empowered Whiplash. Untargetable for 0.4 s, timed to Empowered Whiplash. Does not destroy inbound projectiles. (Aurora R Between Worlds → Evelynn E Empowered Whiplash)
- **0.33** untargetable: Between Worlds makes Aurora untargetable, dodging Evelynn's Allure. Untargetable for 0.4 s; Allure takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Evelynn W Allure)
- Watch out: Last Caress makes Evelynn untargetable, dodging Aurora's Between Worlds.

### 10. Gwen (net +0.82)

- **0.90** untargetable: Hallowed Mist makes Gwen untargetable, dodging Evelynn's Last Caress. Untargetable for ?; Last Caress takes 0.35 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Evelynn R Last Caress)
- **0.59** untargetable: Hallowed Mist makes Gwen untargetable, dodging Evelynn's Empowered Whiplash. Untargetable for ?, timed to Empowered Whiplash. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Evelynn E Empowered Whiplash)
- **0.54** untargetable: Hallowed Mist makes Gwen untargetable, dodging Evelynn's Allure. Untargetable for ?; Allure takes 0.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Evelynn W Allure)
- Watch out: Last Caress makes Evelynn untargetable, dodging Gwen's Needlework.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.61 | 1.61 | 0.00 |  |
| 2 | Kayle | +1.40 | 1.40 | 0.00 |  |
| 3 | Fiora | +1.20 | 1.43 | 0.23 |  |
| 4 | Elise | +1.15 | 1.67 | 0.52 |  |
| 5 | Kindred | +1.07 | 1.28 | 0.21 |  |
| 6 | Master Yi | +1.01 | 1.48 | 0.47 |  |
| 7 | Vladimir | +1.00 | 1.51 | 0.51 |  |
| 8 | Xayah | +0.91 | 1.34 | 0.43 |  |
| 9 | Aurora | +0.85 | 1.27 | 0.42 |  |
| 10 | Gwen | +0.82 | 1.37 | 0.55 |  |
| 11 | Yuumi | +0.79 | 1.74 | 0.95 |  |
| 12 | Taric | +0.76 | 0.97 | 0.21 |  |
| 13 | Shaco | +0.73 | 1.20 | 0.47 |  |
| 14 | Pantheon | +0.56 | 1.30 | 0.74 |  |
| 15 | Bard | +0.54 | 1.44 | 0.90 |  |
| 16 | Zed | +0.54 | 1.08 | 0.54 |  |
| 17 | Lissandra | +0.46 | 1.36 | 0.90 |  |
| 18 | Maokai | +0.41 | 1.53 | 1.12 |  |
| 19 | Ekko | +0.41 | 1.23 | 0.82 |  |
| 20 | Nocturne | +0.39 | 1.39 | 1.00 |  |
| 21 | Singed | +0.39 | 0.82 | 0.43 | grounding (Mega Adhesive) |
| 22 | Udyr | +0.35 | 0.70 | 0.35 |  |
| 23 | Kai'Sa | +0.34 | 0.34 | 0.00 |  |
| 24 | Camille | +0.29 | 1.13 | 0.84 |  |
| 25 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 26 | Milio | +0.28 | 0.61 | 0.33 |  |
| 27 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 28 | Rek'Sai | +0.16 | 1.21 | 1.05 |  |
| 29 | Teemo | +0.15 | 0.57 | 0.42 |  |
| 30 | Rengar | +0.14 | 0.64 | 0.50 |  |
| 31 | Olaf | +0.14 | 0.34 | 0.20 |  |
| 32 | Samira | +0.12 | 0.48 | 0.36 |  |
| 33 | Nidalee | +0.12 | 0.28 | 0.16 |  |
| 34 | Jinx | +0.08 | 0.59 | 0.51 | dash stop (Flame Chompers!) |
| 35 | Morgana | +0.06 | 0.78 | 0.72 |  |
| 36 | Kayn | +0.05 | 1.21 | 1.16 |  |
| 37 | Nasus | +0.05 | 0.27 | 0.22 |  |
| 38 | Xin Zhao | +0.01 | 1.05 | 1.04 |  |
| 39 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 40 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 41 | Vayne | -0.05 | 0.29 | 0.34 |  |
| 42 | Lulu | -0.06 | 0.57 | 0.63 |  |
| 43 | Kog'Maw | -0.08 | 0.18 | 0.26 |  |
| 44 | LeBlanc | -0.09 | 0.23 | 0.32 |  |
| 45 | Vex | -0.13 | 0.57 | 0.70 |  |
| 46 | Zoe | -0.13 | 0.22 | 0.35 |  |
| 47 | Gangplank | -0.16 | 0.49 | 0.65 |  |
| 48 | Veigar | -0.16 | 0.49 | 0.65 |  |
| 49 | Nilah | -0.17 | 0.51 | 0.68 |  |
| 50 | Kalista | -0.17 | 0.47 | 0.64 |  |
| 51 | Twisted Fate | -0.17 | 0.37 | 0.54 |  |
| 52 | Zilean | -0.17 | 0.22 | 0.39 |  |
| 53 | Soraka | -0.18 | 0.18 | 0.36 |  |
| 54 | Hwei | -0.19 | 0.63 | 0.82 | dash stop (Grim Visage) |
| 55 | Jax | -0.19 | 0.59 | 0.78 | attack dodge (Counter Strike) |
| 56 | Cassiopeia | -0.20 | 0.77 | 0.97 | grounding (Miasma) |
| 57 | Karma | -0.21 | 0.23 | 0.44 |  |
| 58 | Jayce | -0.21 | 0.20 | 0.41 |  |
| 59 | Yorick | -0.21 | 0.00 | 0.21 |  |
| 60 | Viktor | -0.22 | 0.56 | 0.78 |  |
| 61 | Zeri | -0.22 | 0.29 | 0.51 |  |
| 62 | Quinn | -0.23 | 0.26 | 0.49 |  |
| 63 | Garen | -0.25 | 0.40 | 0.65 |  |
| 64 | Mel | -0.27 | 0.45 | 0.72 |  |
| 65 | Yasuo | -0.27 | 0.38 | 0.65 |  |
| 66 | Sion | -0.28 | 0.36 | 0.64 |  |
| 67 | Corki | -0.28 | 0.20 | 0.48 |  |
| 68 | Malzahar | -0.31 | 0.72 | 1.03 |  |
| 69 | Heimerdinger | -0.31 | 0.20 | 0.51 |  |
| 70 | Alistar | -0.33 | 0.27 | 0.60 |  |
| 71 | Ezreal | -0.33 | 0.22 | 0.55 |  |
| 72 | Shen | -0.34 | 0.59 | 0.93 | attack block (Spirit's Refuge) |
| 73 | Aatrox | -0.34 | 0.08 | 0.42 |  |
| 74 | Kha'Zix | -0.35 | 0.00 | 0.35 |  |
| 75 | Ahri | -0.36 | 0.51 | 0.87 |  |
| 76 | Lux | -0.37 | 0.19 | 0.56 |  |
| 77 | Mordekaiser | -0.39 | 0.32 | 0.71 |  |
| 78 | Braum | -0.41 | 0.39 | 0.80 |  |
| 79 | Illaoi | -0.43 | 0.08 | 0.51 |  |
| 80 | Ashe | -0.44 | 0.24 | 0.68 |  |
| 81 | Gnar | -0.44 | 0.22 | 0.66 |  |
| 82 | Graves | -0.44 | 0.16 | 0.60 |  |
| 83 | Smolder | -0.45 | 0.22 | 0.67 |  |
| 84 | Anivia | -0.45 | 0.16 | 0.61 |  |
| 85 | Ivern | -0.47 | 0.13 | 0.60 |  |
| 86 | Draven | -0.48 | 0.24 | 0.72 |  |
| 87 | Shyvana | -0.48 | 0.00 | 0.48 |  |
| 88 | Akshan | -0.49 | 0.30 | 0.79 |  |
| 89 | Varus | -0.49 | 0.30 | 0.79 |  |
| 90 | Kennen | -0.49 | 0.19 | 0.68 |  |
| 91 | Katarina | -0.50 | 0.12 | 0.62 |  |
| 92 | Talon | -0.50 | 0.00 | 0.50 |  |
| 93 | Miss Fortune | -0.51 | 0.22 | 0.73 |  |
| 94 | Sylas | -0.51 | 0.08 | 0.59 |  |
| 95 | Kassadin | -0.52 | 0.00 | 0.52 |  |
| 96 | Sona | -0.53 | 0.27 | 0.80 |  |
| 97 | Riven | -0.53 | 0.00 | 0.53 |  |
| 98 | Warwick | -0.54 | 0.47 | 1.01 |  |
| 99 | Ziggs | -0.54 | 0.18 | 0.72 |  |
| 100 | Locke | -0.55 | 0.00 | 0.55 |  |
| 101 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 102 | Blitzcrank | -0.56 | 0.00 | 0.56 |  |
| 103 | Bel'Veth | -0.57 | 0.00 | 0.57 |  |
| 104 | Senna | -0.58 | 0.22 | 0.80 |  |
| 105 | Wukong | -0.59 | 0.00 | 0.59 |  |
| 106 | Vel'Koz | -0.60 | 0.18 | 0.78 |  |
| 107 | Lee Sin | -0.60 | 0.08 | 0.68 |  |
| 108 | Annie | -0.61 | 0.15 | 0.76 |  |
| 109 | Brand | -0.61 | 0.15 | 0.76 |  |
| 110 | Syndra | -0.61 | 0.15 | 0.76 |  |
| 111 | Poppy | -0.62 | 0.57 | 1.19 | dash stop (Steadfast Presence) |
| 112 | Thresh | -0.62 | 0.21 | 0.83 |  |
| 113 | Aurelion Sol | -0.63 | 0.15 | 0.78 |  |
| 114 | Renata Glasc | -0.64 | 0.34 | 0.98 |  |
| 115 | Aphelios | -0.64 | 0.33 | 0.97 |  |
| 116 | Ryze | -0.64 | 0.16 | 0.80 |  |
| 117 | Swain | -0.64 | 0.14 | 0.78 |  |
| 118 | Xerath | -0.65 | 0.18 | 0.83 |  |
| 119 | Renekton | -0.65 | 0.00 | 0.65 |  |
| 120 | Kled | -0.67 | 0.49 | 1.16 |  |
| 121 | Caitlyn | -0.68 | 0.32 | 1.00 |  |
| 122 | Tristana | -0.68 | 0.24 | 0.92 |  |
| 123 | Cho'Gath | -0.68 | 0.00 | 0.68 |  |
| 124 | Lucian | -0.69 | 0.24 | 0.93 |  |
| 125 | Akali | -0.69 | 0.08 | 0.77 |  |
| 126 | Sett | -0.69 | 0.08 | 0.77 |  |
| 127 | Karthus | -0.70 | 0.13 | 0.83 |  |
| 128 | Azir | -0.72 | 0.18 | 0.90 |  |
| 129 | Zyra | -0.73 | 0.24 | 0.97 |  |
| 130 | Orianna | -0.73 | 0.18 | 0.91 |  |
| 131 | Lillia | -0.73 | 0.07 | 0.80 |  |
| 132 | Darius | -0.73 | 0.00 | 0.73 |  |
| 133 | Trundle | -0.73 | 0.00 | 0.73 |  |
| 134 | Skarner | -0.74 | 0.13 | 0.87 |  |
| 135 | Zaahen | -0.78 | 0.34 | 1.12 |  |
| 136 | Seraphine | -0.78 | 0.19 | 0.97 |  |
| 137 | Urgot | -0.78 | 0.18 | 0.96 |  |
| 138 | Irelia | -0.78 | 0.03 | 0.81 |  |
| 139 | Neeko | -0.82 | 0.15 | 0.97 |  |
| 140 | Fizz | -0.83 | 0.08 | 0.91 |  |
| 141 | Nami | -0.86 | 0.15 | 1.01 |  |
| 142 | Janna | -0.87 | 0.24 | 1.11 |  |
| 143 | Amumu | -0.87 | 0.18 | 1.05 |  |
| 144 | Jhin | -0.89 | 0.18 | 1.07 |  |
| 145 | Fiddlesticks | -0.90 | 0.21 | 1.11 |  |
| 146 | Nunu & Willump | -0.91 | 0.20 | 1.11 |  |
| 147 | Ambessa | -0.92 | 0.08 | 1.00 |  |
| 148 | Diana | -0.92 | 0.00 | 0.92 |  |
| 149 | Malphite | -0.93 | 0.18 | 1.11 |  |
| 150 | Leona | -0.95 | 0.00 | 0.95 |  |
| 151 | Rakan | -0.96 | 0.08 | 1.04 |  |
| 152 | Nautilus | -0.99 | 0.00 | 0.99 |  |
| 153 | Hecarim | -1.00 | 0.00 | 1.00 |  |
| 154 | Yone | -1.03 | 0.19 | 1.22 |  |
| 155 | Galio | -1.06 | 0.00 | 1.06 |  |
| 156 | Qiyana | -1.06 | 0.00 | 1.06 |  |
| 157 | Rammus | -1.10 | 0.27 | 1.37 |  |
| 158 | Volibear | -1.10 | 0.00 | 1.10 |  |
| 159 | Zac | -1.13 | 0.44 | 1.57 | dash stop (Stretching Strikes) |
| 160 | Sejuani | -1.13 | 0.00 | 1.13 |  |
| 161 | Briar | -1.14 | 0.08 | 1.22 |  |
| 162 | Gragas | -1.14 | 0.00 | 1.14 |  |
| 163 | Rell | -1.17 | 0.00 | 1.17 |  |
| 164 | Jarvan IV | -1.18 | 0.00 | 1.18 |  |
| 165 | Pyke | -1.21 | 0.00 | 1.21 |  |
| 166 | Naafiri | -1.27 | 0.08 | 1.35 |  |
| 167 | Ornn | -1.28 | 0.00 | 1.28 |  |
| 168 | K'Sante | -1.33 | 0.00 | 1.33 |  |
| 169 | Viego | -1.38 | 0.06 | 1.44 |  |
| 170 | Vi | -1.42 | 0.08 | 1.50 |  |
| 171 | Taliyah | -1.51 | 0.18 | 1.69 |  |
| 172 | Tahm Kench | -1.57 | 0.00 | 1.57 |  |
