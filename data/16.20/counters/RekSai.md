# Counters to Rek'Sai (patch 26.20)

Every champion ranked by what its kit does against Rek'Sai's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Rek'Sai's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> RekSai` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.41)

- **0.90** spell shield: Spell Shield's spell shield blocks Rek'Sai's Void Rush. Spell shield for 1.5 s, long enough to use ahead of Void Rush. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rek'Sai R Void Rush)
- **0.35** spell shield: Spell Shield's spell shield blocks Rek'Sai's Unburrow. Spell shield for 1.5 s, long enough to use ahead of Unburrow. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rek'Sai W Unburrow)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Rek'Sai's (500 vs 175 attack range). Rek'Sai closes the gap with Tunnel, Void Rush. (Sivir basic attacks → Rek'Sai basic attacks)

### 2. Fiora (net +0.90)

- **0.90** parry: Riposte parries Rek'Sai's Void Rush. Parry for 0.75 s; Void Rush takes 1.32 s to land, enough to react. (Fiora W Riposte → Rek'Sai R Void Rush)
- **0.31** parry: Riposte parries Rek'Sai's Unburrow and stuns back. Parry for 0.75 s; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Unburrow's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rek'Sai W Unburrow)
- **0.28** parry: Riposte parries Rek'Sai's Furious Bite. Parry for 0.75 s; Furious Bite takes 0.25 s to land, enough to react. (Fiora W Riposte → Rek'Sai E Furious Bite)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Fiora's Riposte.

### 3. Kayle (net +0.83)

- **0.45** invulnerable: Divine Judgment makes Kayle invulnerable to Rek'Sai's Void Rush (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Void Rush. (Kayle R Divine Judgment → Rek'Sai R Void Rush)
- **0.24** range: Kayle's basic attacks reach 450 units farther than Rek'Sai's (625 vs 175 attack range). Rek'Sai closes the gap with Tunnel, Void Rush. (Kayle basic attacks → Rek'Sai basic attacks)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Rek'Sai's Furious Bite. Invulnerable for 2.5 s, long enough to use ahead of Furious Bite. (Kayle R Divine Judgment → Rek'Sai E Furious Bite)

### 4. Elise (net +0.77)

- **0.90** untargetable: Rappel makes Elise untargetable, dodging Rek'Sai's Void Rush. Untargetable for 0.6 s; Void Rush takes 1.32 s to land, enough to react. (Elise E Rappel → Rek'Sai R Void Rush)
- **0.27** untargetable: Rappel makes Elise untargetable, dodging Rek'Sai's Furious Bite. Untargetable for 0.6 s; Furious Bite takes 0.25 s to land, enough to react. (Elise E Rappel → Rek'Sai E Furious Bite)
- **0.21** untargetable: Rappel makes Elise untargetable, dodging Rek'Sai's Unburrow. Untargetable for 0.6 s; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Rek'Sai W Unburrow)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Elise's Cocoon.

### 5. Gwen (net +0.54)

- **0.90** untargetable: Hallowed Mist makes Gwen untargetable, dodging Rek'Sai's Void Rush. Untargetable for ?; Void Rush takes 1.32 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Rek'Sai R Void Rush)
- **0.27** untargetable: Hallowed Mist makes Gwen untargetable, dodging Rek'Sai's Furious Bite. Untargetable for ?; Furious Bite takes 0.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Rek'Sai E Furious Bite)
- **0.21** untargetable: Hallowed Mist makes Gwen untargetable, dodging Rek'Sai's Unburrow. Untargetable for ?; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Rek'Sai W Unburrow)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Gwen's Needlework.

### 6. Kindred (net +0.54)

- **0.36** invulnerable: Lamb's Respite makes Kindred invulnerable to Rek'Sai's Void Rush (its crowd control still applies). Invulnerable for ?; Void Rush takes 1.32 s to land, enough to react. (Kindred R Lamb's Respite → Rek'Sai R Void Rush)
- **0.27** range: Kindred's basic attacks reach 325 units farther than Rek'Sai's (500 vs 175 attack range). Rek'Sai closes the gap with Tunnel, Void Rush. (Kindred basic attacks → Rek'Sai basic attacks)
- **0.19** invulnerable: Lamb's Respite makes Kindred invulnerable to Rek'Sai's Furious Bite. Invulnerable for ?; Furious Bite takes 0.25 s to land, enough to react. (Kindred R Lamb's Respite → Rek'Sai E Furious Bite)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Kindred's Mounting Dread.

### 7. Shaco (net +0.53)

- **0.90** untargetable: Hallucinate makes Shaco untargetable, dodging Rek'Sai's Void Rush. Untargetable for 0.5 s; Void Rush takes 1.32 s to land, enough to react. (Shaco R Hallucinate → Rek'Sai R Void Rush)
- **0.20** untargetable: Hallucinate makes Shaco untargetable, dodging Rek'Sai's Furious Bite. Untargetable for 0.5 s; Furious Bite takes 0.25 s to land, enough to react. (Shaco R Hallucinate → Rek'Sai E Furious Bite)
- **0.20** untargetable: Hallucinate makes Shaco untargetable, dodging Rek'Sai's Unburrow. Untargetable for 0.5 s; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Shaco R Hallucinate → Rek'Sai W Unburrow)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Shaco's Jack in the Box.

### 8. Xayah (net +0.51)

- **0.79** untargetable: Featherstorm makes Xayah untargetable, dodging Rek'Sai's Void Rush. Untargetable for 1.5 s, long enough to use ahead of Void Rush. (Xayah R Featherstorm → Rek'Sai R Void Rush)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Rek'Sai's Unburrow. Untargetable for 1.5 s, long enough to use ahead of Unburrow. (Xayah R Featherstorm → Rek'Sai W Unburrow)
- **0.22** range: Xayah's basic attacks reach 350 units farther than Rek'Sai's (525 vs 175 attack range). Rek'Sai closes the gap with Tunnel, Void Rush. (Xayah basic attacks → Rek'Sai basic attacks)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Xayah's Featherstorm.

### 9. Vladimir (net +0.49)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rek'Sai's Void Rush. Untargetable for 2 s, long enough to use ahead of Void Rush. (Vladimir W Sanguine Pool → Rek'Sai R Void Rush)
- **0.35** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rek'Sai's Unburrow. Untargetable for 2 s, long enough to use ahead of Unburrow. (Vladimir W Sanguine Pool → Rek'Sai W Unburrow)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rek'Sai's Furious Bite. Untargetable for 2 s, long enough to use ahead of Furious Bite. (Vladimir W Sanguine Pool → Rek'Sai E Furious Bite)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Vladimir's Hemoplague.

### 10. Yuumi (net +0.45)

- **0.90** untargetable: You and Me! makes Yuumi untargetable, dodging Rek'Sai's Void Rush. Untargetable for ?; Void Rush takes 1.32 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rek'Sai R Void Rush)
- **0.48** untargetable: You and Me! makes Yuumi untargetable, dodging Rek'Sai's Unburrow. Untargetable for ?; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rek'Sai W Unburrow)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Rek'Sai's Furious Bite. Untargetable for ?; Furious Bite takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rek'Sai E Furious Bite)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Yuumi's Final Chapter.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.41 | 1.41 | 0.00 |  |
| 2 | Fiora | +0.90 | 1.13 | 0.23 |  |
| 3 | Kayle | +0.83 | 0.83 | 0.00 |  |
| 4 | Elise | +0.77 | 1.29 | 0.52 |  |
| 5 | Gwen | +0.54 | 1.09 | 0.55 |  |
| 6 | Kindred | +0.54 | 0.75 | 0.21 |  |
| 7 | Shaco | +0.53 | 1.05 | 0.52 |  |
| 8 | Xayah | +0.51 | 1.22 | 0.71 |  |
| 9 | Vladimir | +0.49 | 1.25 | 0.76 |  |
| 10 | Yuumi | +0.45 | 1.43 | 0.98 |  |
| 11 | Master Yi | +0.43 | 1.09 | 0.66 |  |
| 12 | Bard | +0.41 | 1.33 | 0.92 |  |
| 13 | Aurora | +0.37 | 1.14 | 0.77 |  |
| 14 | Singed | +0.37 | 0.82 | 0.45 | grounding (Mega Adhesive) |
| 15 | Lissandra | +0.31 | 1.28 | 0.97 |  |
| 16 | Nocturne | +0.25 | 1.32 | 1.07 |  |
| 17 | Ekko | +0.24 | 1.06 | 0.82 |  |
| 18 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 19 | Teemo | +0.23 | 0.67 | 0.44 |  |
| 20 | Twitch | +0.16 | 0.27 | 0.11 |  |
| 21 | Taric | +0.15 | 0.49 | 0.34 |  |
| 22 | Olaf | +0.13 | 0.33 | 0.20 |  |
| 23 | Kai'Sa | +0.11 | 0.22 | 0.11 |  |
| 24 | Nasus | +0.08 | 0.30 | 0.22 |  |
| 25 | Samira | +0.05 | 0.48 | 0.43 |  |
| 26 | Zed | +0.04 | 0.94 | 0.90 |  |
| 27 | Maokai | 0.00 | 1.13 | 1.13 |  |
| 28 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 29 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 30 | Vex | -0.02 | 0.70 | 0.72 |  |
| 31 | Jinx | -0.02 | 0.57 | 0.59 | dash stop (Flame Chompers!) |
| 32 | Nidalee | -0.09 | 0.18 | 0.27 |  |
| 33 | Kog'Maw | -0.10 | 0.16 | 0.26 |  |
| 34 | Veigar | -0.11 | 0.55 | 0.66 | dash stop (Event Horizon) |
| 35 | Corki | -0.15 | 0.35 | 0.50 |  |
| 36 | Milio | -0.15 | 0.22 | 0.37 |  |
| 37 | Evelynn | -0.16 | 1.05 | 1.21 |  |
| 38 | Vayne | -0.16 | 0.27 | 0.43 |  |
| 39 | Udyr | -0.17 | 0.40 | 0.57 |  |
| 40 | Viktor | -0.19 | 0.59 | 0.78 | dash stop (Gravity Field) |
| 41 | Zoe | -0.19 | 0.20 | 0.39 |  |
| 42 | Soraka | -0.19 | 0.17 | 0.36 |  |
| 43 | Cassiopeia | -0.21 | 0.76 | 0.97 | grounding (Miasma) |
| 44 | LeBlanc | -0.21 | 0.13 | 0.34 |  |
| 45 | Zeri | -0.23 | 0.28 | 0.51 |  |
| 46 | Zilean | -0.24 | 0.20 | 0.44 |  |
| 47 | Morgana | -0.26 | 0.46 | 0.72 |  |
| 48 | Camille | -0.27 | 1.01 | 1.28 |  |
| 49 | Mel | -0.27 | 0.45 | 0.72 |  |
| 50 | Hwei | -0.29 | 0.54 | 0.83 | dash stop (Grim Visage) |
| 51 | Jayce | -0.30 | 0.18 | 0.48 |  |
| 52 | Karma | -0.31 | 0.13 | 0.44 |  |
| 53 | Shyvana | -0.32 | 0.16 | 0.48 |  |
| 54 | Ahri | -0.34 | 0.54 | 0.88 | dash stop (Charm) |
| 55 | Ezreal | -0.35 | 0.20 | 0.55 |  |
| 56 | Illaoi | -0.35 | 0.16 | 0.51 |  |
| 57 | Gangplank | -0.37 | 0.28 | 0.65 |  |
| 58 | Alistar | -0.38 | 0.26 | 0.64 |  |
| 59 | Lux | -0.38 | 0.18 | 0.56 |  |
| 60 | Braum | -0.39 | 0.45 | 0.84 | projectile block (Unbreakable) |
| 61 | Heimerdinger | -0.39 | 0.12 | 0.51 |  |
| 62 | Kha'Zix | -0.40 | 0.00 | 0.40 |  |
| 63 | Jax | -0.41 | 0.40 | 0.81 |  |
| 64 | Twisted Fate | -0.41 | 0.25 | 0.66 |  |
| 65 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 66 | Ashe | -0.44 | 0.24 | 0.68 |  |
| 67 | Rengar | -0.46 | 0.29 | 0.75 |  |
| 68 | Graves | -0.46 | 0.14 | 0.60 |  |
| 69 | Aatrox | -0.46 | 0.00 | 0.46 |  |
| 70 | Smolder | -0.47 | 0.20 | 0.67 |  |
| 71 | Kayn | -0.48 | 1.05 | 1.53 |  |
| 72 | Lulu | -0.48 | 0.50 | 0.98 |  |
| 73 | Anivia | -0.48 | 0.16 | 0.64 |  |
| 74 | Varus | -0.49 | 0.30 | 0.79 |  |
| 75 | Gnar | -0.49 | 0.19 | 0.68 |  |
| 76 | Kennen | -0.50 | 0.18 | 0.68 |  |
| 77 | Draven | -0.52 | 0.22 | 0.74 |  |
| 78 | Kassadin | -0.52 | 0.00 | 0.52 |  |
| 79 | Sona | -0.54 | 0.26 | 0.80 |  |
| 80 | Ivern | -0.54 | 0.11 | 0.65 |  |
| 81 | Locke | -0.55 | 0.00 | 0.55 |  |
| 82 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 83 | Xin Zhao | -0.56 | 0.54 | 1.10 |  |
| 84 | Shen | -0.56 | 0.37 | 0.93 |  |
| 85 | Pantheon | -0.57 | 0.63 | 1.20 |  |
| 86 | Senna | -0.58 | 0.22 | 0.80 |  |
| 87 | Yasuo | -0.59 | 0.34 | 0.93 |  |
| 88 | Ziggs | -0.59 | 0.17 | 0.76 |  |
| 89 | Bel'Veth | -0.59 | 0.00 | 0.59 |  |
| 90 | Blitzcrank | -0.61 | 0.00 | 0.61 |  |
| 91 | Annie | -0.62 | 0.15 | 0.77 |  |
| 92 | Brand | -0.62 | 0.14 | 0.76 |  |
| 93 | Malzahar | -0.64 | 0.72 | 1.36 |  |
| 94 | Kalista | -0.64 | 0.45 | 1.09 |  |
| 95 | Quinn | -0.65 | 0.22 | 0.87 |  |
| 96 | Ryze | -0.65 | 0.15 | 0.80 |  |
| 97 | Syndra | -0.65 | 0.14 | 0.79 |  |
| 98 | Poppy | -0.67 | 0.57 | 1.24 | dash stop (Steadfast Presence) |
| 99 | Nilah | -0.67 | 0.35 | 1.02 |  |
| 100 | Akshan | -0.67 | 0.19 | 0.86 |  |
| 101 | Katarina | -0.67 | 0.12 | 0.79 |  |
| 102 | Swain | -0.67 | 0.12 | 0.79 |  |
| 103 | Mordekaiser | -0.68 | 0.07 | 0.75 |  |
| 104 | Cho'Gath | -0.69 | 0.00 | 0.69 |  |
| 105 | Garen | -0.69 | 0.00 | 0.69 |  |
| 106 | Sylas | -0.69 | 0.00 | 0.69 |  |
| 107 | Talon | -0.69 | 0.00 | 0.69 |  |
| 108 | Tristana | -0.70 | 0.24 | 0.94 |  |
| 109 | Sion | -0.71 | 0.33 | 1.04 |  |
| 110 | Renekton | -0.71 | 0.00 | 0.71 |  |
| 111 | Lucian | -0.72 | 0.21 | 0.93 |  |
| 112 | Karthus | -0.72 | 0.11 | 0.83 |  |
| 113 | Lee Sin | -0.72 | 0.00 | 0.72 |  |
| 114 | Aphelios | -0.73 | 0.24 | 0.97 |  |
| 115 | Thresh | -0.74 | 0.11 | 0.85 |  |
| 116 | Miss Fortune | -0.75 | 0.20 | 0.95 |  |
| 117 | Darius | -0.75 | 0.00 | 0.75 |  |
| 118 | Riven | -0.75 | 0.00 | 0.75 |  |
| 119 | Trundle | -0.75 | 0.00 | 0.75 |  |
| 120 | Caitlyn | -0.76 | 0.24 | 1.00 |  |
| 121 | Renata Glasc | -0.76 | 0.24 | 1.00 |  |
| 122 | Orianna | -0.77 | 0.16 | 0.93 |  |
| 123 | Lillia | -0.79 | 0.05 | 0.84 |  |
| 124 | Malphite | -0.80 | 0.36 | 1.16 |  |
| 125 | Seraphine | -0.80 | 0.17 | 0.97 |  |
| 126 | Irelia | -0.81 | 0.00 | 0.81 |  |
| 127 | Hecarim | -0.83 | 0.17 | 1.00 |  |
| 128 | Akali | -0.83 | 0.00 | 0.83 |  |
| 129 | Azir | -0.84 | 0.16 | 1.00 |  |
| 130 | Vel'Koz | -0.85 | 0.16 | 1.01 |  |
| 131 | Zyra | -0.85 | 0.16 | 1.01 |  |
| 132 | Neeko | -0.86 | 0.14 | 1.00 |  |
| 133 | Amumu | -0.87 | 0.19 | 1.06 |  |
| 134 | Jhin | -0.90 | 0.17 | 1.07 |  |
| 135 | Xerath | -0.90 | 0.16 | 1.06 |  |
| 136 | Nami | -0.90 | 0.14 | 1.04 |  |
| 137 | Urgot | -0.90 | 0.08 | 0.98 |  |
| 138 | Yone | -0.92 | 0.36 | 1.28 |  |
| 139 | Skarner | -0.92 | 0.00 | 0.92 |  |
| 140 | Zaahen | -0.97 | 0.20 | 1.17 |  |
| 141 | Kled | -0.98 | 0.24 | 1.22 |  |
| 142 | Leona | -0.98 | 0.00 | 0.98 |  |
| 143 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 144 | Fizz | -1.00 | 0.00 | 1.00 |  |
| 145 | Sett | -1.02 | 0.16 | 1.18 |  |
| 146 | Diana | -1.02 | 0.00 | 1.02 |  |
| 147 | Nautilus | -1.02 | 0.00 | 1.02 |  |
| 148 | K'Sante | -1.03 | 0.32 | 1.35 |  |
| 149 | Volibear | -1.03 | 0.16 | 1.19 |  |
| 150 | Rakan | -1.03 | 0.06 | 1.09 |  |
| 151 | Wukong | -1.05 | 0.00 | 1.05 |  |
| 152 | Aurelion Sol | -1.06 | 0.14 | 1.20 |  |
| 153 | Jarvan IV | -1.09 | 0.16 | 1.25 |  |
| 154 | Qiyana | -1.09 | 0.00 | 1.09 |  |
| 155 | Warwick | -1.13 | 0.47 | 1.60 |  |
| 156 | Ornn | -1.13 | 0.16 | 1.29 |  |
| 157 | Sejuani | -1.16 | 0.00 | 1.16 |  |
| 158 | Rammus | -1.21 | 0.30 | 1.51 |  |
| 159 | Zac | -1.23 | 0.40 | 1.63 | dash stop (Stretching Strikes) |
| 160 | Janna | -1.23 | 0.22 | 1.45 |  |
| 161 | Rell | -1.23 | 0.00 | 1.23 |  |
| 162 | Briar | -1.25 | 0.00 | 1.25 |  |
| 163 | Gragas | -1.27 | 0.00 | 1.27 |  |
| 164 | Fiddlesticks | -1.30 | 0.11 | 1.41 |  |
| 165 | Nunu & Willump | -1.33 | 0.00 | 1.33 |  |
| 166 | Naafiri | -1.35 | 0.00 | 1.35 |  |
| 167 | Pyke | -1.35 | 0.00 | 1.35 |  |
| 168 | Viego | -1.36 | 0.16 | 1.52 |  |
| 169 | Galio | -1.53 | 0.00 | 1.53 |  |
| 170 | Taliyah | -1.56 | 0.16 | 1.72 |  |
| 171 | Tahm Kench | -1.59 | 0.00 | 1.59 |  |
| 172 | Vi | -1.63 | 0.16 | 1.79 |  |
