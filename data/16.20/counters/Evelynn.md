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

### 2. Kayle (net +1.28)

- **0.90** invulnerable: Divine Judgment makes Kayle invulnerable to Evelynn's Last Caress. Invulnerable for 2.5 s, long enough to use ahead of Last Caress. (Kayle R Divine Judgment → Evelynn R Last Caress)
- **0.38** invulnerable: Divine Judgment makes Kayle invulnerable to Evelynn's Empowered Whiplash. Invulnerable for 2.5 s, long enough to use ahead of Empowered Whiplash. (Kayle R Divine Judgment → Evelynn E Empowered Whiplash)
- **0.24** range: Kayle's basic attacks reach 500 units farther than Evelynn's (625 vs 125 attack range). Evelynn closes the gap with Empowered Whiplash, Last Caress. (Kayle basic attacks → Evelynn basic attacks)
- Watch out: Last Caress makes Evelynn untargetable, dodging Kayle's Starfire Spellblade.

### 3. Fiora (net +1.14)

- **0.90** parry: Riposte parries Evelynn's Last Caress. Parry for 0.75 s; Last Caress takes 0.35 s to land, enough to react. (Fiora W Riposte → Evelynn R Last Caress)
- **0.67** parry: Riposte parries Evelynn's Allure and stuns back. Parry for 0.75 s; Allure takes 0.25 s to land, enough to react. Negating Allure's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Evelynn W Allure)
- **0.62** parry: Riposte parries Evelynn's Empowered Whiplash. Parry for 0.75 s, timed to Empowered Whiplash. (Fiora W Riposte → Evelynn E Empowered Whiplash)
- Watch out: Last Caress makes Evelynn untargetable, dodging Fiora's Riposte.

### 4. Master Yi (net +1.01)

- **0.90** untargetable: Alpha Strike makes Master Yi untargetable, dodging Evelynn's Last Caress. Untargetable for ?; Last Caress takes 0.35 s to land, enough to react. (Master Yi Q Alpha Strike → Evelynn R Last Caress)
- **0.59** untargetable: Alpha Strike makes Master Yi untargetable, dodging Evelynn's Empowered Whiplash. Untargetable for ?, timed to Empowered Whiplash. (Master Yi Q Alpha Strike → Evelynn E Empowered Whiplash)
- **0.54** untargetable: Alpha Strike makes Master Yi untargetable, dodging Evelynn's Allure. Untargetable for ?; Allure takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Evelynn W Allure)
- Watch out: Last Caress makes Evelynn untargetable, dodging Master Yi's Alpha Strike.

### 5. Vladimir (net +1.00)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Evelynn's Last Caress. Untargetable for 2 s, long enough to use ahead of Last Caress. (Vladimir W Sanguine Pool → Evelynn R Last Caress)
- **0.62** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Evelynn's Empowered Whiplash. Untargetable for 2 s, long enough to use ahead of Empowered Whiplash. (Vladimir W Sanguine Pool → Evelynn E Empowered Whiplash)
- **0.57** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Evelynn's Allure. Untargetable for 2 s, long enough to use ahead of Allure. (Vladimir W Sanguine Pool → Evelynn W Allure)
- Watch out: Last Caress makes Evelynn untargetable, dodging Vladimir's Hemoplague.

### 6. Xayah (net +0.91)

- **0.79** untargetable: Featherstorm makes Xayah untargetable, dodging Evelynn's Last Caress. Untargetable for 1.5 s, long enough to use ahead of Last Caress. (Xayah R Featherstorm → Evelynn R Last Caress)
- **0.37** untargetable: Featherstorm makes Xayah untargetable, dodging Evelynn's Empowered Whiplash. Untargetable for 1.5 s, long enough to use ahead of Empowered Whiplash. (Xayah R Featherstorm → Evelynn E Empowered Whiplash)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Evelynn's Allure. Untargetable for 1.5 s, long enough to use ahead of Allure. (Xayah R Featherstorm → Evelynn W Allure)
- Watch out: Last Caress makes Evelynn untargetable, dodging Xayah's Featherstorm.

### 7. Aurora (net +0.85)

- **0.79** untargetable: Between Worlds makes Aurora untargetable, dodging Evelynn's Last Caress. Untargetable for 0.4 s; Last Caress takes 0.35 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Evelynn R Last Caress)
- **0.37** untargetable: Between Worlds makes Aurora untargetable, dodging Evelynn's Empowered Whiplash. Untargetable for 0.4 s, timed to Empowered Whiplash. Does not destroy inbound projectiles. (Aurora R Between Worlds → Evelynn E Empowered Whiplash)
- **0.33** untargetable: Between Worlds makes Aurora untargetable, dodging Evelynn's Allure. Untargetable for 0.4 s; Allure takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Evelynn W Allure)
- Watch out: Last Caress makes Evelynn untargetable, dodging Aurora's Between Worlds.

### 8. Gwen (net +0.82)

- **0.90** untargetable: Hallowed Mist makes Gwen untargetable, dodging Evelynn's Last Caress. Untargetable for ?; Last Caress takes 0.35 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Evelynn R Last Caress)
- **0.59** untargetable: Hallowed Mist makes Gwen untargetable, dodging Evelynn's Empowered Whiplash. Untargetable for ?, timed to Empowered Whiplash. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Evelynn E Empowered Whiplash)
- **0.54** untargetable: Hallowed Mist makes Gwen untargetable, dodging Evelynn's Allure. Untargetable for ?; Allure takes 0.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Evelynn W Allure)
- Watch out: Last Caress makes Evelynn untargetable, dodging Gwen's Needlework.

### 9. Yuumi (net +0.79)

- **0.90** untargetable: You and Me! makes Yuumi untargetable, dodging Evelynn's Last Caress. Untargetable for ?; Last Caress takes 0.35 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Evelynn R Last Caress)
- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Evelynn's Empowered Whiplash. Untargetable for ?, timed to Empowered Whiplash. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Evelynn E Empowered Whiplash)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Evelynn's Allure. Untargetable for ?; Allure takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Evelynn W Allure)
- Watch out: Last Caress makes Evelynn untargetable, dodging Yuumi's Final Chapter.

### 10. Fizz (net +0.67)

- **0.90** untargetable: Playful makes Fizz untargetable, dodging Evelynn's Last Caress. Untargetable for 0.75 s; Last Caress takes 0.35 s to land, enough to react. (Fizz E Playful → Evelynn R Last Caress)
- **0.80** untargetable: Playful makes Fizz untargetable, dodging Evelynn's Empowered Whiplash. Untargetable for 0.75 s, timed to Empowered Whiplash. (Fizz E Playful → Evelynn E Empowered Whiplash)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Evelynn's Allure. Untargetable for 0.75 s; Allure takes 0.25 s to land, enough to react. (Fizz E Playful → Evelynn W Allure)
- Watch out: Last Caress makes Evelynn untargetable, dodging Fizz's Chum the Waters.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.61 | 1.61 | 0.00 |  |
| 2 | Kayle | +1.28 | 1.40 | 0.12 |  |
| 3 | Fiora | +1.14 | 1.43 | 0.29 |  |
| 4 | Master Yi | +1.01 | 1.48 | 0.47 |  |
| 5 | Vladimir | +1.00 | 1.51 | 0.51 |  |
| 6 | Xayah | +0.91 | 1.34 | 0.43 |  |
| 7 | Aurora | +0.85 | 1.27 | 0.42 |  |
| 8 | Gwen | +0.82 | 1.37 | 0.55 |  |
| 9 | Yuumi | +0.79 | 1.74 | 0.95 |  |
| 10 | Fizz | +0.67 | 1.61 | 0.94 |  |
| 11 | Shaco | +0.67 | 1.20 | 0.53 |  |
| 12 | Bard | +0.59 | 1.44 | 0.85 |  |
| 13 | Zed | +0.54 | 1.08 | 0.54 |  |
| 14 | Lissandra | +0.46 | 1.36 | 0.90 |  |
| 15 | Maokai | +0.41 | 1.53 | 1.12 |  |
| 16 | Nocturne | +0.39 | 1.39 | 1.00 |  |
| 17 | Singed | +0.39 | 0.82 | 0.43 | grounding (Mega Adhesive) |
| 18 | Udyr | +0.35 | 0.70 | 0.35 |  |
| 19 | Kai'Sa | +0.34 | 0.34 | 0.00 |  |
| 20 | Kayn | +0.29 | 1.21 | 0.92 |  |
| 21 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 22 | Milio | +0.28 | 0.61 | 0.33 |  |
| 23 | Camille | +0.27 | 1.13 | 0.86 |  |
| 24 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 25 | Rengar | +0.22 | 0.72 | 0.50 |  |
| 26 | Pantheon | +0.15 | 1.30 | 1.15 |  |
| 27 | Teemo | +0.15 | 0.57 | 0.42 |  |
| 28 | Rek'Sai | +0.14 | 1.21 | 1.07 |  |
| 29 | Olaf | +0.14 | 0.34 | 0.20 |  |
| 30 | Samira | +0.12 | 0.48 | 0.36 |  |
| 31 | Kindred | +0.10 | 0.31 | 0.21 |  |
| 32 | Jinx | +0.08 | 0.59 | 0.51 | dash stop (Flame Chompers!) |
| 33 | Morgana | +0.06 | 0.78 | 0.72 |  |
| 34 | Nidalee | +0.06 | 0.28 | 0.22 |  |
| 35 | Xin Zhao | +0.01 | 1.05 | 1.04 |  |
| 36 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 37 | Zilean | -0.01 | 0.22 | 0.23 |  |
| 38 | Nasus | -0.02 | 0.27 | 0.29 |  |
| 39 | Lulu | -0.06 | 0.57 | 0.63 |  |
| 40 | Corki | -0.08 | 0.22 | 0.30 |  |
| 41 | Kog'Maw | -0.08 | 0.18 | 0.26 |  |
| 42 | LeBlanc | -0.09 | 0.23 | 0.32 |  |
| 43 | Hwei | -0.12 | 0.71 | 0.83 | dash stop (Grim Visage) |
| 44 | Dr. Mundo | -0.12 | 0.00 | 0.12 |  |
| 45 | Vex | -0.13 | 0.57 | 0.70 |  |
| 46 | Karma | -0.13 | 0.31 | 0.44 |  |
| 47 | Zoe | -0.13 | 0.22 | 0.35 |  |
| 48 | Gangplank | -0.16 | 0.49 | 0.65 |  |
| 49 | Veigar | -0.16 | 0.49 | 0.65 |  |
| 50 | Kalista | -0.17 | 0.47 | 0.64 |  |
| 51 | Twisted Fate | -0.17 | 0.37 | 0.54 |  |
| 52 | Soraka | -0.18 | 0.18 | 0.36 |  |
| 53 | Cassiopeia | -0.20 | 0.77 | 0.97 | grounding (Miasma) |
| 54 | Vayne | -0.20 | 0.29 | 0.49 |  |
| 55 | Taric | -0.21 | 0.00 | 0.21 |  |
| 56 | Viktor | -0.22 | 0.56 | 0.78 |  |
| 57 | Elise | -0.22 | 0.30 | 0.52 |  |
| 58 | Zeri | -0.22 | 0.29 | 0.51 |  |
| 59 | Quinn | -0.23 | 0.26 | 0.49 |  |
| 60 | Garen | -0.24 | 0.40 | 0.64 |  |
| 61 | Jayce | -0.24 | 0.20 | 0.44 |  |
| 62 | Mel | -0.27 | 0.45 | 0.72 |  |
| 63 | Yasuo | -0.27 | 0.38 | 0.65 |  |
| 64 | Sylas | -0.27 | 0.08 | 0.35 |  |
| 65 | Nilah | -0.28 | 0.40 | 0.68 |  |
| 66 | Sion | -0.28 | 0.36 | 0.64 |  |
| 67 | Yorick | -0.28 | 0.00 | 0.28 |  |
| 68 | Malzahar | -0.31 | 0.72 | 1.03 |  |
| 69 | Heimerdinger | -0.31 | 0.20 | 0.51 |  |
| 70 | Alistar | -0.33 | 0.27 | 0.60 |  |
| 71 | Aatrox | -0.34 | 0.08 | 0.42 |  |
| 72 | Kha'Zix | -0.35 | 0.00 | 0.35 |  |
| 73 | Ahri | -0.36 | 0.51 | 0.87 |  |
| 74 | Lux | -0.37 | 0.19 | 0.56 |  |
| 75 | Mordekaiser | -0.39 | 0.32 | 0.71 |  |
| 76 | Shen | -0.40 | 0.59 | 0.99 | attack block (Spirit's Refuge) |
| 77 | Braum | -0.41 | 0.39 | 0.80 |  |
| 78 | Jax | -0.41 | 0.39 | 0.80 |  |
| 79 | Ashe | -0.44 | 0.24 | 0.68 |  |
| 80 | Ezreal | -0.44 | 0.22 | 0.66 |  |
| 81 | Gnar | -0.44 | 0.22 | 0.66 |  |
| 82 | Graves | -0.44 | 0.16 | 0.60 |  |
| 83 | Smolder | -0.45 | 0.22 | 0.67 |  |
| 84 | Anivia | -0.45 | 0.16 | 0.61 |  |
| 85 | Ivern | -0.47 | 0.13 | 0.60 |  |
| 86 | Akshan | -0.49 | 0.30 | 0.79 |  |
| 87 | Varus | -0.49 | 0.30 | 0.79 |  |
| 88 | Kennen | -0.49 | 0.19 | 0.68 |  |
| 89 | Katarina | -0.50 | 0.12 | 0.62 |  |
| 90 | Talon | -0.50 | 0.00 | 0.50 |  |
| 91 | Draven | -0.51 | 0.24 | 0.75 |  |
| 92 | Miss Fortune | -0.51 | 0.22 | 0.73 |  |
| 93 | Lee Sin | -0.52 | 0.16 | 0.68 |  |
| 94 | Blitzcrank | -0.53 | 0.00 | 0.53 |  |
| 95 | Riven | -0.53 | 0.00 | 0.53 |  |
| 96 | Ziggs | -0.54 | 0.18 | 0.72 |  |
| 97 | Shyvana | -0.54 | 0.00 | 0.54 |  |
| 98 | Kled | -0.55 | 0.61 | 1.16 |  |
| 99 | Illaoi | -0.55 | 0.08 | 0.63 |  |
| 100 | Kassadin | -0.55 | 0.00 | 0.55 |  |
| 101 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 102 | Bel'Veth | -0.57 | 0.00 | 0.57 |  |
| 103 | Senna | -0.58 | 0.22 | 0.80 |  |
| 104 | Sona | -0.59 | 0.27 | 0.86 |  |
| 105 | Caitlyn | -0.60 | 0.40 | 1.00 |  |
| 106 | Vel'Koz | -0.60 | 0.18 | 0.78 |  |
| 107 | Annie | -0.61 | 0.15 | 0.76 |  |
| 108 | Brand | -0.61 | 0.15 | 0.76 |  |
| 109 | Syndra | -0.61 | 0.15 | 0.76 |  |
| 110 | Poppy | -0.62 | 0.57 | 1.19 | dash stop (Steadfast Presence) |
| 111 | Tristana | -0.62 | 0.24 | 0.86 |  |
| 112 | Thresh | -0.62 | 0.21 | 0.83 |  |
| 113 | Wukong | -0.62 | 0.00 | 0.62 |  |
| 114 | Aurelion Sol | -0.63 | 0.15 | 0.78 |  |
| 115 | Renata Glasc | -0.64 | 0.34 | 0.98 |  |
| 116 | Ryze | -0.64 | 0.16 | 0.80 |  |
| 117 | Swain | -0.64 | 0.14 | 0.78 |  |
| 118 | Xerath | -0.65 | 0.18 | 0.83 |  |
| 119 | Renekton | -0.65 | 0.00 | 0.65 |  |
| 120 | Skarner | -0.66 | 0.21 | 0.87 |  |
| 121 | Aphelios | -0.67 | 0.33 | 1.00 |  |
| 122 | Lucian | -0.69 | 0.24 | 0.93 |  |
| 123 | Akali | -0.69 | 0.08 | 0.77 |  |
| 124 | Karthus | -0.70 | 0.13 | 0.83 |  |
| 125 | Cho'Gath | -0.71 | 0.00 | 0.71 |  |
| 126 | Azir | -0.72 | 0.18 | 0.90 |  |
| 127 | Sett | -0.72 | 0.08 | 0.80 |  |
| 128 | Zyra | -0.73 | 0.24 | 0.97 |  |
| 129 | Orianna | -0.73 | 0.18 | 0.91 |  |
| 130 | Lillia | -0.73 | 0.07 | 0.80 |  |
| 131 | Irelia | -0.73 | 0.03 | 0.76 |  |
| 132 | Locke | -0.74 | 0.00 | 0.74 |  |
| 133 | Darius | -0.76 | 0.00 | 0.76 |  |
| 134 | Trundle | -0.77 | 0.00 | 0.77 |  |
| 135 | Zaahen | -0.78 | 0.34 | 1.12 |  |
| 136 | Seraphine | -0.78 | 0.19 | 0.97 |  |
| 137 | Urgot | -0.78 | 0.18 | 0.96 |  |
| 138 | Fiddlesticks | -0.82 | 0.29 | 1.11 |  |
| 139 | Neeko | -0.82 | 0.15 | 0.97 |  |
| 140 | Nami | -0.86 | 0.15 | 1.01 |  |
| 141 | Diana | -0.86 | 0.00 | 0.86 |  |
| 142 | Janna | -0.87 | 0.24 | 1.11 |  |
| 143 | Amumu | -0.87 | 0.18 | 1.05 |  |
| 144 | Ekko | -0.87 | 0.00 | 0.87 |  |
| 145 | Warwick | -0.89 | 0.47 | 1.36 |  |
| 146 | Jhin | -0.89 | 0.18 | 1.07 |  |
| 147 | Nunu & Willump | -0.91 | 0.20 | 1.11 |  |
| 148 | Ambessa | -0.92 | 0.08 | 1.00 |  |
| 149 | Leona | -0.95 | 0.00 | 0.95 |  |
| 150 | Malphite | -0.96 | 0.18 | 1.14 |  |
| 151 | Rakan | -0.96 | 0.08 | 1.04 |  |
| 152 | Nautilus | -0.99 | 0.00 | 0.99 |  |
| 153 | Yone | -1.03 | 0.19 | 1.22 |  |
| 154 | Qiyana | -1.06 | 0.00 | 1.06 |  |
| 155 | Rammus | -1.10 | 0.27 | 1.37 |  |
| 156 | Volibear | -1.10 | 0.00 | 1.10 |  |
| 157 | Zac | -1.13 | 0.44 | 1.57 | dash stop (Stretching Strikes) |
| 158 | Hecarim | -1.13 | 0.00 | 1.13 |  |
| 159 | Sejuani | -1.13 | 0.00 | 1.13 |  |
| 160 | Briar | -1.16 | 0.08 | 1.24 |  |
| 161 | Gragas | -1.16 | 0.00 | 1.16 |  |
| 162 | Rell | -1.17 | 0.00 | 1.17 |  |
| 163 | Jarvan IV | -1.18 | 0.00 | 1.18 |  |
| 164 | Pyke | -1.21 | 0.00 | 1.21 |  |
| 165 | Naafiri | -1.27 | 0.08 | 1.35 |  |
| 166 | Ornn | -1.28 | 0.00 | 1.28 |  |
| 167 | K'Sante | -1.33 | 0.00 | 1.33 |  |
| 168 | Viego | -1.38 | 0.06 | 1.44 |  |
| 169 | Vi | -1.45 | 0.08 | 1.53 |  |
| 170 | Galio | -1.47 | 0.00 | 1.47 |  |
| 171 | Taliyah | -1.51 | 0.18 | 1.69 |  |
| 172 | Tahm Kench | -1.57 | 0.00 | 1.57 |  |
