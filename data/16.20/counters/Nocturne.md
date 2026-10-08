# Counters to Nocturne (patch 26.20)

Every champion ranked by what its kit does against Nocturne's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nocturne's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nocturne` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.51)

- **0.90** spell shield: Spell Shield's spell shield blocks Nocturne's Paranoia. Spell shield for 1.5 s, long enough to use ahead of Paranoia. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nocturne R Paranoia)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Nocturne's (500 vs 125 attack range). Nocturne closes the gap with Paranoia. (Sivir basic attacks → Nocturne basic attacks)
- **0.27** spell shield: Spell Shield's spell shield blocks part of Nocturne's Unspeakable Horror. Spell shield for 1.5 s, long enough to use ahead of Unspeakable Horror. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the tether's application but not the damage and aftereffects of one already applied. (Sivir E Spell Shield → Nocturne E Unspeakable Horror)

### 2. Kayle (net +0.90)

- **0.45** invulnerable: Divine Judgment makes Kayle invulnerable to Nocturne's Paranoia (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Paranoia. (Kayle R Divine Judgment → Nocturne R Paranoia)
- **0.36** range: Kayle's basic attacks reach 500 units farther than Nocturne's (625 vs 125 attack range). Nocturne closes the gap with Paranoia. (Kayle basic attacks → Nocturne basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Nocturne's Unspeakable Horror (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Unspeakable Horror. (Kayle R Divine Judgment → Nocturne E Unspeakable Horror)

### 3. Vladimir (net +0.87)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nocturne's Paranoia. Untargetable for 2 s, long enough to use ahead of Paranoia. (Vladimir W Sanguine Pool → Nocturne R Paranoia)
- **0.57** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for 2 s, long enough to use ahead of Unspeakable Horror. (Vladimir W Sanguine Pool → Nocturne E Unspeakable Horror)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Nocturne's (450 vs 125 attack range). Nocturne closes the gap with Paranoia. (Vladimir basic attacks → Nocturne basic attacks)
- Watch out: Shroud of Darkness's spell shield blocks Vladimir's Transfusion.

### 4. Gwen (net +0.78)

- **0.90** untargetable: Hallowed Mist makes Gwen untargetable, dodging Nocturne's Paranoia. Untargetable for ?; Paranoia takes 2.22 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Nocturne R Paranoia)
- **0.32** untargetable: Hallowed Mist makes Gwen untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for ?; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks part of Gwen's Needlework.

### 5. Xayah (net +0.75)

- **0.90** untargetable: Featherstorm makes Xayah untargetable, dodging Nocturne's Paranoia. Untargetable for 1.5 s, long enough to use ahead of Paranoia. (Xayah R Featherstorm → Nocturne R Paranoia)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range). Nocturne closes the gap with Paranoia. (Xayah basic attacks → Nocturne basic attacks)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for 1.5 s, long enough to use ahead of Unspeakable Horror. (Xayah R Featherstorm → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks Xayah's Featherstorm.

### 6. Yuumi (net +0.75)

- **0.90** untargetable: You and Me! makes Yuumi untargetable, dodging Nocturne's Paranoia. Untargetable for ?; Paranoia takes 2.22 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nocturne R Paranoia)
- **0.42** untargetable: You and Me! makes Yuumi untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for ?; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nocturne E Unspeakable Horror)
- **0.32** range: Yuumi's basic attacks reach 300 units farther than Nocturne's (425 vs 125 attack range). Nocturne closes the gap with Paranoia. (Yuumi basic attacks → Nocturne basic attacks)
- Watch out: Unspeakable Horror's fear interrupts Yuumi's Final Chapter (normal channel).

### 7. Fiora (net +0.69)

- **0.90** parry: Riposte parries Nocturne's Paranoia. Parry for 0.75 s; Paranoia takes 2.22 s to land, enough to react. (Fiora W Riposte → Nocturne R Paranoia)
- **0.44** parry: Riposte parries Nocturne's Unspeakable Horror and stuns back. Parry for 0.75 s; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Unspeakable Horror's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Nocturne E Unspeakable Horror)
- **0.09** attack speed slow: Riposte cuts Nocturne's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Nocturne basic attacks)
- Watch out: Shroud of Darkness's spell shield blocks Fiora's Riposte.

### 8. Aurora (net +0.59)

- **0.90** untargetable: Between Worlds makes Aurora untargetable, dodging Nocturne's Paranoia. Untargetable for 0.4 s; Paranoia takes 2.22 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nocturne R Paranoia)
- **0.29** range: Aurora's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range). Nocturne closes the gap with Paranoia. (Aurora basic attacks → Nocturne basic attacks)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for 0.4 s; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks Aurora's Between Worlds.

### 9. Master Yi (net +0.57)

- **0.90** untargetable: Alpha Strike makes Master Yi untargetable, dodging Nocturne's Paranoia. Untargetable for ?; Paranoia takes 2.22 s to land, enough to react. (Master Yi Q Alpha Strike → Nocturne R Paranoia)
- **0.32** untargetable: Alpha Strike makes Master Yi untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for ?; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Nocturne E Unspeakable Horror)
- **0.08** cc immunity: Highlander makes Master Yi immune to Nocturne's Unspeakable Horror slow. Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks part of Master Yi's Alpha Strike.

### 10. Kindred (net +0.57)

- **0.47** range: Kindred's basic attacks reach 375 units farther than Nocturne's (500 vs 125 attack range). Nocturne closes the gap with Paranoia. (Kindred basic attacks → Nocturne basic attacks)
- **0.41** invulnerable: Lamb's Respite makes Kindred invulnerable to Nocturne's Paranoia (its crowd control still applies). Invulnerable for ?; Paranoia takes 2.22 s to land, enough to react. (Kindred R Lamb's Respite → Nocturne R Paranoia)
- **0.10** invulnerable: Lamb's Respite makes Kindred invulnerable to Nocturne's Unspeakable Horror (its crowd control still applies). Invulnerable for ?; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kindred R Lamb's Respite → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks Kindred's Mounting Dread.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.51 | 1.51 | 0.00 |  |
| 2 | Kayle | +0.90 | 0.90 | 0.00 |  |
| 3 | Vladimir | +0.87 | 1.37 | 0.50 |  |
| 4 | Gwen | +0.78 | 1.06 | 0.28 |  |
| 5 | Xayah | +0.75 | 1.44 | 0.69 |  |
| 6 | Yuumi | +0.75 | 1.43 | 0.68 |  |
| 7 | Fiora | +0.69 | 1.14 | 0.45 |  |
| 8 | Aurora | +0.59 | 1.29 | 0.70 |  |
| 9 | Master Yi | +0.57 | 1.18 | 0.61 |  |
| 10 | Kindred | +0.57 | 0.93 | 0.36 |  |
| 11 | Zed | +0.55 | 1.00 | 0.45 |  |
| 12 | Lissandra | +0.48 | 1.29 | 0.81 |  |
| 13 | Bard | +0.46 | 1.43 | 0.97 |  |
| 14 | Elise | +0.46 | 1.38 | 0.92 |  |
| 15 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 16 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 17 | Teemo | +0.36 | 0.84 | 0.48 | blind (Blinding Dart) |
| 18 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 19 | Zeri | +0.16 | 0.44 | 0.28 |  |
| 20 | Shaco | +0.12 | 1.00 | 0.88 |  |
| 21 | Udyr | +0.12 | 0.82 | 0.70 |  |
| 22 | Olaf | +0.12 | 0.46 | 0.34 |  |
| 23 | Morgana | +0.11 | 0.88 | 0.77 |  |
| 24 | Milio | +0.07 | 0.77 | 0.70 |  |
| 25 | Rengar | +0.02 | 0.65 | 0.63 |  |
| 26 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 27 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 28 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 29 | Kog'Maw | -0.02 | 0.27 | 0.29 |  |
| 30 | Nasus | -0.04 | 0.39 | 0.43 |  |
| 31 | Soraka | -0.08 | 0.27 | 0.35 |  |
| 32 | Zoe | -0.10 | 0.32 | 0.42 |  |
| 33 | Gangplank | -0.11 | 0.58 | 0.69 |  |
| 34 | Miss Fortune | -0.11 | 0.32 | 0.43 |  |
| 35 | Graves | -0.11 | 0.24 | 0.35 |  |
| 36 | Ekko | -0.12 | 1.01 | 1.13 |  |
| 37 | Nidalee | -0.12 | 0.30 | 0.42 |  |
| 38 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 39 | Mel | -0.17 | 0.53 | 0.70 |  |
| 40 | Samira | -0.20 | 0.58 | 0.78 |  |
| 41 | Taric | -0.21 | 0.49 | 0.70 |  |
| 42 | Jinx | -0.21 | 0.29 | 0.50 |  |
| 43 | LeBlanc | -0.21 | 0.22 | 0.43 |  |
| 44 | Akshan | -0.22 | 0.34 | 0.56 |  |
| 45 | Karma | -0.22 | 0.22 | 0.44 |  |
| 46 | Singed | -0.23 | 0.40 | 0.63 |  |
| 47 | Ezreal | -0.23 | 0.32 | 0.55 |  |
| 48 | Rek'Sai | -0.25 | 1.07 | 1.32 |  |
| 49 | Illaoi | -0.28 | 0.00 | 0.28 |  |
| 50 | Locke | -0.28 | 0.00 | 0.28 |  |
| 51 | Garen | -0.32 | 0.32 | 0.64 |  |
| 52 | Corki | -0.32 | 0.30 | 0.62 |  |
| 53 | Vayne | -0.34 | 0.43 | 0.77 |  |
| 54 | Kayn | -0.35 | 1.00 | 1.35 |  |
| 55 | Lucian | -0.35 | 0.36 | 0.71 |  |
| 56 | Anivia | -0.36 | 0.24 | 0.60 |  |
| 57 | Maokai | -0.37 | 1.11 | 1.48 |  |
| 58 | Lillia | -0.37 | 0.11 | 0.48 |  |
| 59 | Aphelios | -0.38 | 0.45 | 0.83 |  |
| 60 | Evelynn | -0.39 | 1.00 | 1.39 |  |
| 61 | Sona | -0.39 | 0.41 | 0.80 |  |
| 62 | Smolder | -0.39 | 0.32 | 0.71 |  |
| 63 | Twisted Fate | -0.41 | 0.43 | 0.84 |  |
| 64 | Lulu | -0.43 | 0.72 | 1.15 |  |
| 65 | Braum | -0.43 | 0.45 | 0.88 | projectile block (Unbreakable) |
| 66 | Ashe | -0.44 | 0.36 | 0.80 |  |
| 67 | Vex | -0.46 | 0.27 | 0.73 |  |
| 68 | Swain | -0.46 | 0.21 | 0.67 |  |
| 69 | Zilean | -0.47 | 0.32 | 0.79 |  |
| 70 | Malzahar | -0.48 | 0.62 | 1.10 |  |
| 71 | Kalista | -0.49 | 0.65 | 1.14 |  |
| 72 | Cassiopeia | -0.49 | 0.43 | 0.92 |  |
| 73 | Kennen | -0.51 | 0.29 | 0.80 |  |
| 74 | Varus | -0.52 | 0.39 | 0.91 |  |
| 75 | Mordekaiser | -0.53 | 0.31 | 0.84 |  |
| 76 | Brand | -0.53 | 0.22 | 0.75 |  |
| 77 | Jax | -0.54 | 0.41 | 0.95 | attack dodge (Counter Strike) |
| 78 | Draven | -0.55 | 0.36 | 0.91 |  |
| 79 | Renekton | -0.56 | 0.00 | 0.56 |  |
| 80 | Kha'Zix | -0.57 | 0.00 | 0.57 |  |
| 81 | Camille | -0.60 | 1.00 | 1.60 |  |
| 82 | Nilah | -0.60 | 0.48 | 1.08 |  |
| 83 | Jayce | -0.61 | 0.30 | 0.91 |  |
| 84 | Lux | -0.62 | 0.29 | 0.91 |  |
| 85 | Trundle | -0.62 | 0.00 | 0.62 |  |
| 86 | Viktor | -0.64 | 0.32 | 0.96 |  |
| 87 | Karthus | -0.64 | 0.19 | 0.83 |  |
| 88 | Katarina | -0.64 | 0.12 | 0.76 |  |
| 89 | Annie | -0.66 | 0.22 | 0.88 |  |
| 90 | Renata Glasc | -0.67 | 0.38 | 1.05 |  |
| 91 | Senna | -0.67 | 0.32 | 0.99 |  |
| 92 | Kassadin | -0.67 | 0.00 | 0.67 |  |
| 93 | Neeko | -0.69 | 0.22 | 0.91 |  |
| 94 | Vel'Koz | -0.71 | 0.27 | 0.98 |  |
| 95 | Heimerdinger | -0.72 | 0.27 | 0.99 |  |
| 96 | Pantheon | -0.74 | 0.59 | 1.33 |  |
| 97 | Tristana | -0.75 | 0.36 | 1.11 |  |
| 98 | Veigar | -0.77 | 0.24 | 1.01 |  |
| 99 | Aatrox | -0.77 | 0.00 | 0.77 |  |
| 100 | Yasuo | -0.80 | 0.31 | 1.11 |  |
| 101 | Orianna | -0.80 | 0.27 | 1.07 |  |
| 102 | Sion | -0.81 | 0.48 | 1.29 |  |
| 103 | Gnar | -0.81 | 0.33 | 1.14 |  |
| 104 | Syndra | -0.81 | 0.22 | 1.03 |  |
| 105 | Quinn | -0.82 | 0.38 | 1.20 |  |
| 106 | Caitlyn | -0.83 | 0.36 | 1.19 |  |
| 107 | Zaahen | -0.83 | 0.33 | 1.16 |  |
| 108 | Seraphine | -0.84 | 0.29 | 1.13 |  |
| 109 | Fizz | -0.84 | 0.00 | 0.84 |  |
| 110 | Talon | -0.84 | 0.00 | 0.84 |  |
| 111 | Ryze | -0.86 | 0.24 | 1.10 |  |
| 112 | Bel'Veth | -0.86 | 0.00 | 0.86 |  |
| 113 | Alistar | -0.87 | 0.36 | 1.23 |  |
| 114 | Ahri | -0.87 | 0.22 | 1.09 |  |
| 115 | Lee Sin | -0.88 | 0.00 | 0.88 |  |
| 116 | Xin Zhao | -0.89 | 0.53 | 1.42 |  |
| 117 | Ivern | -0.89 | 0.19 | 1.08 |  |
| 118 | Akali | -0.90 | 0.00 | 0.90 |  |
| 119 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 120 | Shyvana | -0.90 | 0.00 | 0.90 |  |
| 121 | Hwei | -0.92 | 0.23 | 1.15 |  |
| 122 | Irelia | -0.93 | 0.05 | 0.98 |  |
| 123 | Skarner | -0.94 | 0.09 | 1.03 |  |
| 124 | Shen | -0.96 | 0.39 | 1.35 |  |
| 125 | Cho'Gath | -0.96 | 0.00 | 0.96 |  |
| 126 | Wukong | -0.96 | 0.00 | 0.96 |  |
| 127 | Azir | -0.99 | 0.27 | 1.26 |  |
| 128 | Xerath | -0.99 | 0.27 | 1.26 |  |
| 129 | Urgot | -0.99 | 0.15 | 1.14 |  |
| 130 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 131 | Hecarim | -1.00 | 0.00 | 1.00 |  |
| 132 | Jhin | -1.02 | 0.27 | 1.29 |  |
| 133 | Ziggs | -1.03 | 0.27 | 1.30 |  |
| 134 | Malphite | -1.04 | 0.25 | 1.29 |  |
| 135 | Rammus | -1.05 | 0.38 | 1.43 |  |
| 136 | Zyra | -1.05 | 0.24 | 1.29 |  |
| 137 | Darius | -1.05 | 0.00 | 1.05 |  |
| 138 | Kled | -1.06 | 0.44 | 1.50 |  |
| 139 | Warwick | -1.08 | 0.34 | 1.42 |  |
| 140 | Diana | -1.08 | 0.00 | 1.08 |  |
| 141 | Jarvan IV | -1.09 | 0.00 | 1.09 |  |
| 142 | Amumu | -1.10 | 0.00 | 1.10 |  |
| 143 | Nautilus | -1.10 | 0.00 | 1.10 |  |
| 144 | Yone | -1.10 | 0.00 | 1.10 |  |
| 145 | Fiddlesticks | -1.11 | 0.20 | 1.31 |  |
| 146 | Thresh | -1.11 | 0.19 | 1.30 |  |
| 147 | Nami | -1.14 | 0.22 | 1.36 |  |
| 148 | Aurelion Sol | -1.17 | 0.22 | 1.39 |  |
| 149 | Blitzcrank | -1.26 | 0.00 | 1.26 |  |
| 150 | Leona | -1.26 | 0.00 | 1.26 |  |
| 151 | Ornn | -1.27 | 0.00 | 1.27 |  |
| 152 | Sylas | -1.28 | 0.00 | 1.28 |  |
| 153 | Qiyana | -1.35 | 0.00 | 1.35 |  |
| 154 | Rakan | -1.37 | 0.13 | 1.50 |  |
| 155 | Sett | -1.39 | 0.00 | 1.39 |  |
| 156 | Volibear | -1.42 | 0.00 | 1.42 |  |
| 157 | Taliyah | -1.47 | 0.27 | 1.74 |  |
| 158 | Janna | -1.50 | 0.36 | 1.86 |  |
| 159 | Briar | -1.50 | 0.00 | 1.50 |  |
| 160 | Sejuani | -1.54 | 0.00 | 1.54 |  |
| 161 | Nunu & Willump | -1.56 | 0.20 | 1.76 |  |
| 162 | Poppy | -1.56 | 0.00 | 1.56 |  |
| 163 | Riven | -1.59 | 0.00 | 1.59 |  |
| 164 | Viego | -1.62 | 0.09 | 1.71 |  |
| 165 | Tahm Kench | -1.69 | 0.00 | 1.69 |  |
| 166 | Zac | -1.73 | 0.00 | 1.73 |  |
| 167 | K'Sante | -1.74 | 0.00 | 1.74 |  |
| 168 | Gragas | -1.76 | 0.00 | 1.76 |  |
| 169 | Pyke | -1.76 | 0.00 | 1.76 |  |
| 170 | Galio | -1.83 | 0.00 | 1.83 |  |
| 171 | Rell | -1.84 | 0.00 | 1.84 |  |
| 172 | Vi | -1.96 | 0.00 | 1.96 |  |
