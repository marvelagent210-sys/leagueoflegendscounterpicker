# Counters to Rek'Sai (patch 26.21)

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

### 2. Fiora (net +0.82)

- **0.90** parry: Riposte parries Rek'Sai's Void Rush. Parry for 0.75 s; Void Rush takes 1.32 s to land, enough to react. (Fiora W Riposte → Rek'Sai R Void Rush)
- **0.31** parry: Riposte parries Rek'Sai's Unburrow and stuns back. Parry for 0.75 s; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Unburrow's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rek'Sai W Unburrow)
- **0.28** parry: Riposte parries Rek'Sai's Furious Bite. Parry for 0.75 s; Furious Bite takes 0.25 s to land, enough to react. (Fiora W Riposte → Rek'Sai E Furious Bite)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Fiora's Riposte.

### 3. Kayle (net +0.68)

- **0.45** invulnerable: Divine Judgment makes Kayle invulnerable to Rek'Sai's Void Rush (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Void Rush. (Kayle R Divine Judgment → Rek'Sai R Void Rush)
- **0.24** range: Kayle's basic attacks reach 450 units farther than Rek'Sai's (625 vs 175 attack range). Rek'Sai closes the gap with Tunnel, Void Rush. (Kayle basic attacks → Rek'Sai basic attacks)
- **0.23** invulnerable: Divine Judgment makes Kayle invulnerable to Rek'Sai's Queen's Wrath. Invulnerable for 2.5 s, long enough to use ahead of Queen's Wrath. (Kayle R Divine Judgment → Rek'Sai Q Queen's Wrath)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Kayle's Starfire Spellblade.

### 4. Gwen (net +0.56)

- **0.90** untargetable: Hallowed Mist makes Gwen untargetable, dodging Rek'Sai's Void Rush. Untargetable for ?; Void Rush takes 1.32 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Rek'Sai R Void Rush)
- **0.27** untargetable: Hallowed Mist makes Gwen untargetable, dodging Rek'Sai's Furious Bite. Untargetable for ?; Furious Bite takes 0.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Rek'Sai E Furious Bite)
- **0.21** untargetable: Hallowed Mist makes Gwen untargetable, dodging Rek'Sai's Unburrow. Untargetable for ?; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Rek'Sai W Unburrow)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Gwen's Needlework.

### 5. Xayah (net +0.54)

- **0.79** untargetable: Featherstorm makes Xayah untargetable, dodging Rek'Sai's Void Rush. Untargetable for 1.5 s, long enough to use ahead of Void Rush. (Xayah R Featherstorm → Rek'Sai R Void Rush)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Rek'Sai's Unburrow. Untargetable for 1.5 s, long enough to use ahead of Unburrow. (Xayah R Featherstorm → Rek'Sai W Unburrow)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Rek'Sai's Queen's Wrath. Untargetable for 1.5 s, long enough to use ahead of Queen's Wrath. (Xayah R Featherstorm → Rek'Sai Q Queen's Wrath)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Xayah's Featherstorm.

### 6. Vladimir (net +0.52)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rek'Sai's Void Rush. Untargetable for 2 s, long enough to use ahead of Void Rush. (Vladimir W Sanguine Pool → Rek'Sai R Void Rush)
- **0.35** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rek'Sai's Unburrow. Untargetable for 2 s, long enough to use ahead of Unburrow. (Vladimir W Sanguine Pool → Rek'Sai W Unburrow)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rek'Sai's Furious Bite. Untargetable for 2 s, long enough to use ahead of Furious Bite. (Vladimir W Sanguine Pool → Rek'Sai E Furious Bite)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Vladimir's Hemoplague.

### 7. Yuumi (net +0.49)

- **0.90** untargetable: You and Me! makes Yuumi untargetable, dodging Rek'Sai's Void Rush. Untargetable for ?; Void Rush takes 1.32 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rek'Sai R Void Rush)
- **0.48** untargetable: You and Me! makes Yuumi untargetable, dodging Rek'Sai's Unburrow. Untargetable for ?; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rek'Sai W Unburrow)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Rek'Sai's Furious Bite. Untargetable for ?; Furious Bite takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rek'Sai E Furious Bite)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Yuumi's Final Chapter.

### 8. Bard (net +0.49)

- **0.90** untargetable: Tempered Fate makes Bard untargetable, dodging Rek'Sai's Void Rush. Untargetable for 2.5 s, long enough to use ahead of Void Rush. (Bard R Tempered Fate → Rek'Sai R Void Rush)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Rek'Sai's Unburrow. Untargetable for 2.5 s, long enough to use ahead of Unburrow. (Bard R Tempered Fate → Rek'Sai W Unburrow)
- **0.23** untargetable: Tempered Fate makes Bard untargetable, dodging Rek'Sai's Queen's Wrath. Untargetable for 2.5 s, long enough to use ahead of Queen's Wrath. (Bard R Tempered Fate → Rek'Sai Q Queen's Wrath)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Bard's Tempered Fate.

### 9. Master Yi (net +0.45)

- **0.90** untargetable: Alpha Strike makes Master Yi untargetable, dodging Rek'Sai's Void Rush. Untargetable for ?; Void Rush takes 1.32 s to land, enough to react. (Master Yi Q Alpha Strike → Rek'Sai R Void Rush)
- **0.27** untargetable: Alpha Strike makes Master Yi untargetable, dodging Rek'Sai's Furious Bite. Untargetable for ?; Furious Bite takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Rek'Sai E Furious Bite)
- **0.21** untargetable: Alpha Strike makes Master Yi untargetable, dodging Rek'Sai's Unburrow. Untargetable for ?; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Rek'Sai W Unburrow)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Master Yi's Alpha Strike.

### 10. Shaco (net +0.42)

- **0.90** untargetable: Hallucinate makes Shaco untargetable, dodging Rek'Sai's Void Rush. Untargetable for 0.5 s; Void Rush takes 1.32 s to land, enough to react. (Shaco R Hallucinate → Rek'Sai R Void Rush)
- **0.20** untargetable: Hallucinate makes Shaco untargetable, dodging Rek'Sai's Furious Bite. Untargetable for 0.5 s; Furious Bite takes 0.25 s to land, enough to react. (Shaco R Hallucinate → Rek'Sai E Furious Bite)
- **0.20** untargetable: Hallucinate makes Shaco untargetable, dodging Rek'Sai's Unburrow. Untargetable for 0.5 s; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Shaco R Hallucinate → Rek'Sai W Unburrow)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Shaco's Deceive.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.41 | 1.41 | 0.00 |  |
| 2 | Fiora | +0.82 | 1.15 | 0.33 |  |
| 3 | Kayle | +0.68 | 0.88 | 0.20 |  |
| 4 | Gwen | +0.56 | 1.11 | 0.55 |  |
| 5 | Xayah | +0.54 | 1.25 | 0.71 |  |
| 6 | Vladimir | +0.52 | 1.28 | 0.76 |  |
| 7 | Yuumi | +0.49 | 1.47 | 0.98 |  |
| 8 | Bard | +0.49 | 1.36 | 0.87 |  |
| 9 | Master Yi | +0.45 | 1.11 | 0.66 |  |
| 10 | Shaco | +0.42 | 1.07 | 0.65 |  |
| 11 | Aurora | +0.38 | 1.15 | 0.77 |  |
| 12 | Singed | +0.37 | 0.82 | 0.45 | grounding (Mega Adhesive) |
| 13 | Lissandra | +0.33 | 1.30 | 0.97 |  |
| 14 | Nocturne | +0.25 | 1.32 | 1.07 |  |
| 15 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 16 | Teemo | +0.23 | 0.67 | 0.44 |  |
| 17 | Twitch | +0.16 | 0.27 | 0.11 |  |
| 18 | Olaf | +0.13 | 0.33 | 0.20 |  |
| 19 | Fizz | +0.12 | 1.17 | 1.05 |  |
| 20 | Kai'Sa | +0.11 | 0.22 | 0.11 |  |
| 21 | Zed | +0.06 | 0.96 | 0.90 |  |
| 22 | Kindred | +0.06 | 0.27 | 0.21 |  |
| 23 | Samira | +0.05 | 0.48 | 0.43 |  |
| 24 | Maokai | +0.02 | 1.15 | 1.13 |  |
| 25 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 26 | Kayn | -0.01 | 1.07 | 1.08 |  |
| 27 | Vex | -0.02 | 0.70 | 0.72 |  |
| 28 | Jinx | -0.02 | 0.57 | 0.59 | dash stop (Flame Chompers!) |
| 29 | Nasus | -0.04 | 0.30 | 0.34 |  |
| 30 | Corki | -0.10 | 0.20 | 0.30 |  |
| 31 | Kog'Maw | -0.10 | 0.16 | 0.26 |  |
| 32 | Veigar | -0.11 | 0.55 | 0.66 | dash stop (Event Horizon) |
| 33 | Zilean | -0.11 | 0.20 | 0.31 |  |
| 34 | Evelynn | -0.14 | 1.07 | 1.21 |  |
| 35 | Milio | -0.15 | 0.22 | 0.37 |  |
| 36 | Udyr | -0.17 | 0.40 | 0.57 |  |
| 37 | Viktor | -0.19 | 0.59 | 0.78 | dash stop (Gravity Field) |
| 38 | Zoe | -0.19 | 0.20 | 0.39 |  |
| 39 | Nidalee | -0.19 | 0.18 | 0.37 |  |
| 40 | Soraka | -0.19 | 0.17 | 0.36 |  |
| 41 | Dr. Mundo | -0.20 | 0.00 | 0.20 |  |
| 42 | Cassiopeia | -0.21 | 0.76 | 0.97 | grounding (Miasma) |
| 43 | LeBlanc | -0.21 | 0.13 | 0.34 |  |
| 44 | Zeri | -0.23 | 0.28 | 0.51 |  |
| 45 | Camille | -0.26 | 1.02 | 1.28 |  |
| 46 | Morgana | -0.26 | 0.46 | 0.72 |  |
| 47 | Vayne | -0.26 | 0.27 | 0.53 |  |
| 48 | Mel | -0.27 | 0.45 | 0.72 |  |
| 49 | Hwei | -0.30 | 0.54 | 0.84 | dash stop (Grim Visage) |
| 50 | Karma | -0.31 | 0.13 | 0.44 |  |
| 51 | Elise | -0.32 | 0.20 | 0.52 |  |
| 52 | Ahri | -0.34 | 0.54 | 0.88 | dash stop (Charm) |
| 53 | Jayce | -0.34 | 0.18 | 0.52 |  |
| 54 | Taric | -0.34 | 0.00 | 0.34 |  |
| 55 | Gangplank | -0.37 | 0.28 | 0.65 |  |
| 56 | Alistar | -0.38 | 0.26 | 0.64 |  |
| 57 | Lux | -0.38 | 0.18 | 0.56 |  |
| 58 | Braum | -0.39 | 0.45 | 0.84 | projectile block (Unbreakable) |
| 59 | Heimerdinger | -0.39 | 0.12 | 0.51 |  |
| 60 | Kha'Zix | -0.40 | 0.00 | 0.40 |  |
| 61 | Twisted Fate | -0.41 | 0.25 | 0.66 |  |
| 62 | Shyvana | -0.42 | 0.16 | 0.58 |  |
| 63 | Jax | -0.44 | 0.40 | 0.84 |  |
| 64 | Ashe | -0.44 | 0.24 | 0.68 |  |
| 65 | Rengar | -0.46 | 0.29 | 0.75 |  |
| 66 | Ezreal | -0.46 | 0.20 | 0.66 |  |
| 67 | Graves | -0.46 | 0.14 | 0.60 |  |
| 68 | Aatrox | -0.46 | 0.00 | 0.46 |  |
| 69 | Smolder | -0.47 | 0.20 | 0.67 |  |
| 70 | Lulu | -0.48 | 0.50 | 0.98 |  |
| 71 | Anivia | -0.48 | 0.16 | 0.64 |  |
| 72 | Varus | -0.49 | 0.30 | 0.79 |  |
| 73 | Gnar | -0.49 | 0.19 | 0.68 |  |
| 74 | Kennen | -0.50 | 0.18 | 0.68 |  |
| 75 | Yorick | -0.50 | 0.00 | 0.50 |  |
| 76 | Xin Zhao | -0.51 | 0.59 | 1.10 |  |
| 77 | Sylas | -0.51 | 0.00 | 0.51 |  |
| 78 | Ivern | -0.54 | 0.11 | 0.65 |  |
| 79 | Illaoi | -0.55 | 0.16 | 0.71 |  |
| 80 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 81 | Draven | -0.56 | 0.22 | 0.78 |  |
| 82 | Blitzcrank | -0.57 | 0.00 | 0.57 |  |
| 83 | Kassadin | -0.57 | 0.00 | 0.57 |  |
| 84 | Senna | -0.58 | 0.22 | 0.80 |  |
| 85 | Yasuo | -0.59 | 0.34 | 0.93 |  |
| 86 | Ziggs | -0.59 | 0.17 | 0.76 |  |
| 87 | Bel'Veth | -0.59 | 0.00 | 0.59 |  |
| 88 | Annie | -0.62 | 0.15 | 0.77 |  |
| 89 | Brand | -0.62 | 0.14 | 0.76 |  |
| 90 | Malzahar | -0.64 | 0.72 | 1.36 |  |
| 91 | Kalista | -0.64 | 0.45 | 1.09 |  |
| 92 | Tristana | -0.64 | 0.24 | 0.88 |  |
| 93 | Sona | -0.65 | 0.26 | 0.91 |  |
| 94 | Quinn | -0.65 | 0.22 | 0.87 |  |
| 95 | Ryze | -0.65 | 0.15 | 0.80 |  |
| 96 | Syndra | -0.65 | 0.14 | 0.79 |  |
| 97 | Garen | -0.65 | 0.00 | 0.65 |  |
| 98 | Shen | -0.66 | 0.37 | 1.03 |  |
| 99 | Poppy | -0.67 | 0.57 | 1.24 | dash stop (Steadfast Presence) |
| 100 | Nilah | -0.67 | 0.35 | 1.02 |  |
| 101 | Akshan | -0.67 | 0.19 | 0.86 |  |
| 102 | Katarina | -0.67 | 0.12 | 0.79 |  |
| 103 | Swain | -0.67 | 0.12 | 0.79 |  |
| 104 | Mordekaiser | -0.68 | 0.07 | 0.75 |  |
| 105 | Talon | -0.69 | 0.00 | 0.69 |  |
| 106 | Sion | -0.71 | 0.33 | 1.04 |  |
| 107 | Renekton | -0.71 | 0.00 | 0.71 |  |
| 108 | Lucian | -0.72 | 0.21 | 0.93 |  |
| 109 | Karthus | -0.72 | 0.11 | 0.83 |  |
| 110 | Cho'Gath | -0.72 | 0.00 | 0.72 |  |
| 111 | Lee Sin | -0.72 | 0.00 | 0.72 |  |
| 112 | Thresh | -0.74 | 0.11 | 0.85 |  |
| 113 | Locke | -0.74 | 0.00 | 0.74 |  |
| 114 | Miss Fortune | -0.75 | 0.20 | 0.95 |  |
| 115 | Riven | -0.75 | 0.00 | 0.75 |  |
| 116 | Aphelios | -0.76 | 0.24 | 1.00 |  |
| 117 | Caitlyn | -0.76 | 0.24 | 1.00 |  |
| 118 | Renata Glasc | -0.76 | 0.24 | 1.00 |  |
| 119 | Irelia | -0.76 | 0.00 | 0.76 |  |
| 120 | Orianna | -0.77 | 0.16 | 0.93 |  |
| 121 | Lillia | -0.79 | 0.05 | 0.84 |  |
| 122 | Darius | -0.79 | 0.00 | 0.79 |  |
| 123 | Seraphine | -0.80 | 0.17 | 0.97 |  |
| 124 | Trundle | -0.80 | 0.00 | 0.80 |  |
| 125 | Malphite | -0.82 | 0.36 | 1.18 |  |
| 126 | Akali | -0.83 | 0.00 | 0.83 |  |
| 127 | Azir | -0.84 | 0.16 | 1.00 |  |
| 128 | Vel'Koz | -0.85 | 0.16 | 1.01 |  |
| 129 | Zyra | -0.85 | 0.16 | 1.01 |  |
| 130 | Neeko | -0.86 | 0.14 | 1.00 |  |
| 131 | Amumu | -0.87 | 0.19 | 1.06 |  |
| 132 | Jhin | -0.90 | 0.17 | 1.07 |  |
| 133 | Xerath | -0.90 | 0.16 | 1.06 |  |
| 134 | Nami | -0.90 | 0.14 | 1.04 |  |
| 135 | Urgot | -0.90 | 0.08 | 0.98 |  |
| 136 | Pantheon | -0.92 | 0.67 | 1.59 |  |
| 137 | Yone | -0.92 | 0.36 | 1.28 |  |
| 138 | Diana | -0.92 | 0.00 | 0.92 |  |
| 139 | Skarner | -0.92 | 0.00 | 0.92 |  |
| 140 | Ekko | -0.94 | 0.00 | 0.94 |  |
| 141 | Zaahen | -0.97 | 0.20 | 1.17 |  |
| 142 | Kled | -0.98 | 0.24 | 1.22 |  |
| 143 | Leona | -0.98 | 0.00 | 0.98 |  |
| 144 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 145 | Nautilus | -1.02 | 0.00 | 1.02 |  |
| 146 | K'Sante | -1.03 | 0.32 | 1.35 |  |
| 147 | Volibear | -1.03 | 0.16 | 1.19 |  |
| 148 | Rakan | -1.03 | 0.06 | 1.09 |  |
| 149 | Hecarim | -1.06 | 0.17 | 1.23 |  |
| 150 | Sett | -1.06 | 0.16 | 1.22 |  |
| 151 | Aurelion Sol | -1.06 | 0.14 | 1.20 |  |
| 152 | Wukong | -1.07 | 0.00 | 1.07 |  |
| 153 | Jarvan IV | -1.09 | 0.16 | 1.25 |  |
| 154 | Qiyana | -1.09 | 0.00 | 1.09 |  |
| 155 | Ornn | -1.13 | 0.16 | 1.29 |  |
| 156 | Sejuani | -1.16 | 0.00 | 1.16 |  |
| 157 | Rammus | -1.21 | 0.30 | 1.51 |  |
| 158 | Zac | -1.23 | 0.40 | 1.63 | dash stop (Stretching Strikes) |
| 159 | Janna | -1.23 | 0.22 | 1.45 |  |
| 160 | Rell | -1.23 | 0.00 | 1.23 |  |
| 161 | Briar | -1.27 | 0.00 | 1.27 |  |
| 162 | Gragas | -1.29 | 0.00 | 1.29 |  |
| 163 | Fiddlesticks | -1.30 | 0.11 | 1.41 |  |
| 164 | Nunu & Willump | -1.33 | 0.00 | 1.33 |  |
| 165 | Naafiri | -1.35 | 0.00 | 1.35 |  |
| 166 | Pyke | -1.35 | 0.00 | 1.35 |  |
| 167 | Viego | -1.36 | 0.16 | 1.52 |  |
| 168 | Warwick | -1.43 | 0.47 | 1.90 |  |
| 169 | Taliyah | -1.56 | 0.16 | 1.72 |  |
| 170 | Tahm Kench | -1.59 | 0.00 | 1.59 |  |
| 171 | Vi | -1.65 | 0.16 | 1.81 |  |
| 172 | Galio | -1.94 | 0.00 | 1.94 |  |
