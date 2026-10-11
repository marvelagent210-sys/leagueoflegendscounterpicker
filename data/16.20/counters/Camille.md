# Counters to Camille (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 24 other champions with a simulator kit against Camille: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Camille wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Camille --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Poppy | +0.94 | +1.00 | +1.00 | +1.00 | +0.63 | – | +1.00 |
| 2 | Fiora | +0.90 | +1.00 | +1.00 | +1.00 | +0.42 | – | +1.00 |
| 3 | Garen | +0.86 | +1.00 | +1.00 | +1.00 | +0.49 | – | +0.00 |
| 4 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 5 | Olaf | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 6 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 7 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 8 | Nasus | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 9 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.19 | – | +0.00 |
| 10 | Volibear | +0.73 | +1.00 | +1.00 | +1.00 | −0.28 | – | +0.00 |
| 11 | Dr. Mundo | +0.73 | +1.00 | +1.00 | +1.00 | −0.29 | – | +0.00 |
| 12 | Aatrox | +0.61 | +0.91 | +1.00 | +1.00 | −0.51 | – | −1.00 |
| 13 | Yone | +0.38 | +1.00 | +1.00 | −1.00 | −0.02 | – | +1.00 |
| 14 | Teemo | +0.37 | +1.00 | +1.00 | −1.00 | +0.12 | +1.00 | −1.00 |
| 15 | Urgot | +0.17 | −1.00 | +1.00 | +1.00 | +0.49 | −1.00 | +0.00 |
| 16 | Mordekaiser | +0.13 | +0.70 | +0.70 | −1.00 | −0.19 | – | +0.00 |
| 17 | Irelia | +0.05 | +1.00 | +0.03 | −0.95 | −0.16 | – | +0.00 |
| 18 | Riven | +0.00 | −1.00 | +0.00 | +1.00 | +0.34 | – | +0.00 |
| 19 | Sett | −0.23 | −1.00 | +1.00 | −1.00 | −0.06 | – | +0.00 |
| 20 | Gwen | −0.31 | −1.00 | −1.00 | +1.00 | +0.12 | – | +0.00 |
| 21 | Shen | −0.32 | −1.00 | +0.00 | +0.00 | −0.26 | – | +0.00 |
| 22 | Yasuo | −0.51 | −1.00 | +0.00 | −1.00 | −0.09 | – | +0.00 |
| 23 | Ornn | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 24 | Darius | −0.87 | −1.00 | −1.00 | −1.00 | −0.19 | – | −1.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Camille's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Camille's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Camille` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.60)

- **1.00** spell shield: Spell Shield's spell shield blocks Camille's The Hextech Ultimatum. Spell shield for 1.5 s, long enough to use ahead of The Hextech Ultimatum. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Camille R The Hextech Ultimatum)
- **0.73** spell shield: Spell Shield's spell shield blocks Camille's Wall Dive. Spell shield for 1.5 s, long enough to use ahead of Wall Dive. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Camille E Wall Dive)
- **0.23** range: Sivir's basic attacks reach 375 units farther than Camille's (500 vs 125 attack range). Camille closes the gap with Hookshot, Wall Dive, The Hextech Ultimatum. (Sivir basic attacks → Camille basic attacks)

#### 2. Udyr (net +1.19)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Camille's Wall Dive (airborne, stun). Immune for 1.5 s, long enough to use ahead of Wall Dive. (Udyr E Blazing Stampede → Camille E Wall Dive)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Camille's The Hextech Ultimatum (airborne, disrupt). Immune for 1.5 s, long enough to use ahead of The Hextech Ultimatum. (Udyr E Blazing Stampede → Camille R The Hextech Ultimatum)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Camille's Tactical Sweep (slow). Immune for 1.5 s, long enough to use ahead of Tactical Sweep. (Udyr E Blazing Stampede → Camille W Tactical Sweep)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Udyr's Blazing Stampede.

#### 3. Olaf (net +1.05)

- **1.00** cc immunity: Ragnarok makes Olaf immune to Camille's The Hextech Ultimatum (airborne, disrupt). Immune for 3 s, long enough to use ahead of The Hextech Ultimatum. (Olaf R Ragnarok → Camille R The Hextech Ultimatum)
- **0.48** cc immunity: Ragnarok makes Olaf immune to Camille's Wall Dive (airborne, stun). Immune for 3 s, long enough to use ahead of Wall Dive. (Olaf R Ragnarok → Camille E Wall Dive)
- **0.05** cc immunity: Ragnarok makes Olaf immune to Camille's Tactical Sweep (slow). Immune for 3 s, long enough to use ahead of Tactical Sweep. (Olaf R Ragnarok → Camille W Tactical Sweep)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Olaf's Reckless Swing.

#### 4. Fiora (net +1.02)

- **0.88** parry: Riposte parries Camille's Wall Dive and stuns back. Parry for 0.75 s; Wall Dive takes 0.38 s to land, enough to react. Negating Wall Dive's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Camille E Wall Dive)
- **0.70** parry: Riposte parries Camille's The Hextech Ultimatum and stuns back. Parry for 0.75 s; The Hextech Ultimatum lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating The Hextech Ultimatum's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Camille R The Hextech Ultimatum)
- **0.09** attack speed slow: Riposte cuts Camille's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Camille basic attacks)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Fiora's Riposte.

#### 5. Vladimir (net +0.97)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Camille's The Hextech Ultimatum. Untargetable for 2 s, long enough to use ahead of The Hextech Ultimatum. (Vladimir W Sanguine Pool → Camille R The Hextech Ultimatum)
- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Camille's Wall Dive. Untargetable for 2 s, long enough to use ahead of Wall Dive. (Vladimir W Sanguine Pool → Camille E Wall Dive)
- **0.09** range: Vladimir's basic attacks reach 325 units farther than Camille's (450 vs 125 attack range). Camille closes the gap with Hookshot, Wall Dive, The Hextech Ultimatum. (Vladimir basic attacks → Camille basic attacks)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Vladimir's Hemoplague.

#### 6. Xayah (net +0.93)

- **0.94** untargetable: Featherstorm makes Xayah untargetable, dodging Camille's The Hextech Ultimatum. Untargetable for 1.5 s, long enough to use ahead of The Hextech Ultimatum. (Xayah R Featherstorm → Camille R The Hextech Ultimatum)
- **0.46** untargetable: Featherstorm makes Xayah untargetable, dodging Camille's Wall Dive. Untargetable for 1.5 s, long enough to use ahead of Wall Dive. (Xayah R Featherstorm → Camille E Wall Dive)
- **0.19** range: Xayah's basic attacks reach 400 units farther than Camille's (525 vs 125 attack range). Camille closes the gap with Hookshot, Wall Dive, The Hextech Ultimatum. (Xayah basic attacks → Camille basic attacks)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Xayah's Featherstorm.

#### 7. Kayle (net +0.80)

- **0.50** invulnerable: Divine Judgment makes Kayle invulnerable to Camille's The Hextech Ultimatum (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of The Hextech Ultimatum. (Kayle R Divine Judgment → Camille R The Hextech Ultimatum)
- **0.24** invulnerable: Divine Judgment makes Kayle invulnerable to Camille's Wall Dive (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Wall Dive. (Kayle R Divine Judgment → Camille E Wall Dive)
- **0.18** range: Kayle's basic attacks reach 500 units farther than Camille's (625 vs 125 attack range). Camille closes the gap with Hookshot, Wall Dive, The Hextech Ultimatum. (Kayle basic attacks → Camille basic attacks)

#### 8. Morgana (net +0.79)

- **1.00** cc immunity: Black Shield makes Morgana immune to Camille's The Hextech Ultimatum (airborne, disrupt). Immune for 5 s, long enough to use ahead of The Hextech Ultimatum. (Morgana E Black Shield → Camille R The Hextech Ultimatum)
- **0.78** cc immunity: Black Shield makes Morgana immune to Camille's Wall Dive (airborne, stun). Immune for 5 s, long enough to use ahead of Wall Dive. (Morgana E Black Shield → Camille E Wall Dive)
- **0.10** range: Morgana's basic attacks reach 325 units farther than Camille's (450 vs 125 attack range). Camille closes the gap with Hookshot, Wall Dive, The Hextech Ultimatum. (Morgana basic attacks → Camille basic attacks)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Morgana's Soul Shackles.

#### 9. Rengar (net +0.73)

- **0.80** cleanse: Battle Roar cleanses Camille's Wall Dive (airborne, stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Camille E Wall Dive)
- **0.80** cleanse: Battle Roar cleanses Camille's The Hextech Ultimatum (airborne) after it lands. 10 s cooldown; usable while crowd controlled. Doesn't remove disrupt. (Rengar W Battle Roar → Camille R The Hextech Ultimatum)
- **0.09** cleanse: Battle Roar cleanses Camille's Tactical Sweep (slow) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Camille W Tactical Sweep)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Rengar's Bola Strike.

#### 10. Elise (net +0.68)

- **0.73** untargetable: Rappel makes Elise untargetable, dodging Camille's Wall Dive. Untargetable for 0.6 s; Wall Dive takes 0.38 s to land, enough to react. (Elise E Rappel → Camille E Wall Dive)
- **0.60** untargetable: Rappel makes Elise untargetable, dodging Camille's The Hextech Ultimatum. Untargetable for 0.6 s; The Hextech Ultimatum lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Camille R The Hextech Ultimatum)
- **0.16** range: Elise's basic attacks reach 425 units farther than Camille's (550 vs 125 attack range). Camille closes the gap with Hookshot, Wall Dive, The Hextech Ultimatum. (Elise basic attacks → Camille basic attacks)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Elise's Cocoon.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.60 | 1.60 | 0.00 |  |
| 2 | Udyr | +1.19 | 1.53 | 0.34 |  |
| 3 | Olaf | +1.05 | 1.25 | 0.20 |  |
| 4 | Fiora | +1.02 | 1.25 | 0.23 |  |
| 5 | Vladimir | +0.97 | 1.48 | 0.51 |  |
| 6 | Xayah | +0.93 | 1.36 | 0.43 |  |
| 7 | Kayle | +0.80 | 0.80 | 0.00 |  |
| 8 | Morgana | +0.79 | 1.51 | 0.72 |  |
| 9 | Rengar | +0.73 | 1.22 | 0.49 |  |
| 10 | Elise | +0.68 | 1.19 | 0.51 |  |
| 11 | Sion | +0.63 | 1.26 | 0.63 |  |
| 12 | Master Yi | +0.62 | 1.10 | 0.48 |  |
| 13 | Nocturne | +0.60 | 1.60 | 1.00 |  |
| 14 | Lissandra | +0.58 | 1.44 | 0.86 |  |
| 15 | Bard | +0.55 | 1.42 | 0.87 |  |
| 16 | Aurora | +0.55 | 0.97 | 0.42 |  |
| 17 | Gwen | +0.52 | 1.03 | 0.51 |  |
| 18 | Yuumi | +0.50 | 1.46 | 0.96 |  |
| 19 | Gangplank | +0.50 | 1.15 | 0.65 |  |
| 20 | Singed | +0.49 | 0.94 | 0.45 | grounding (Mega Adhesive) |
| 21 | Kindred | +0.41 | 0.61 | 0.20 |  |
| 22 | Alistar | +0.40 | 1.00 | 0.60 |  |
| 23 | Shaco | +0.39 | 0.84 | 0.45 |  |
| 24 | Taric | +0.35 | 0.55 | 0.20 |  |
| 25 | Jinx | +0.34 | 0.84 | 0.50 | dash stop (Flame Chompers!), dash stop (Flame Chompers!) |
| 26 | Kalista | +0.33 | 1.03 | 0.70 |  |
| 27 | Milio | +0.33 | 0.70 | 0.37 |  |
| 28 | Rek'Sai | +0.27 | 1.28 | 1.01 |  |
| 29 | Teemo | +0.26 | 0.67 | 0.41 | blind (Blinding Dart) |
| 30 | Zed | +0.25 | 0.79 | 0.54 |  |
| 31 | Twitch | +0.21 | 0.21 | 0.00 |  |
| 32 | Malzahar | +0.20 | 1.21 | 1.01 |  |
| 33 | Kai'Sa | +0.19 | 0.19 | 0.00 |  |
| 34 | Maokai | +0.18 | 1.30 | 1.12 |  |
| 35 | Nasus | +0.18 | 0.39 | 0.21 |  |
| 36 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 37 | Vex | +0.12 | 0.84 | 0.72 |  |
| 38 | Warwick | +0.10 | 1.08 | 0.98 |  |
| 39 | Ekko | +0.09 | 0.86 | 0.77 |  |
| 40 | Veigar | +0.09 | 0.72 | 0.63 | dash stop (Event Horizon) |
| 41 | Viktor | +0.04 | 0.78 | 0.74 | dash stop (Gravity Field) |
| 42 | Hwei | +0.02 | 0.81 | 0.79 | dash stop (Grim Visage), dash stop (Grim Visage) |
| 43 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 44 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 45 | Nidalee | -0.01 | 0.15 | 0.16 |  |
| 46 | Pantheon | -0.06 | 0.69 | 0.75 |  |
| 47 | Lulu | -0.07 | 0.54 | 0.61 |  |
| 48 | Ahri | -0.12 | 0.76 | 0.88 | dash stop (Charm), dash stop (Charm) |
| 49 | Kog'Maw | -0.12 | 0.14 | 0.26 |  |
| 50 | Cassiopeia | -0.16 | 0.76 | 0.92 | grounding (Miasma) |
| 51 | Vayne | -0.17 | 0.21 | 0.38 |  |
| 52 | Corki | -0.19 | 0.30 | 0.49 |  |
| 53 | LeBlanc | -0.20 | 0.11 | 0.31 |  |
| 54 | Soraka | -0.22 | 0.13 | 0.35 |  |
| 55 | Zaahen | -0.23 | 0.85 | 1.08 |  |
| 56 | Zilean | -0.23 | 0.16 | 0.39 |  |
| 57 | Zoe | -0.23 | 0.16 | 0.39 |  |
| 58 | Samira | -0.23 | 0.15 | 0.38 |  |
| 59 | Garen | -0.24 | 0.37 | 0.61 |  |
| 60 | Nilah | -0.25 | 0.41 | 0.66 |  |
| 61 | Zeri | -0.26 | 0.22 | 0.48 |  |
| 62 | Yorick | -0.27 | 0.00 | 0.27 |  |
| 63 | Jayce | -0.28 | 0.15 | 0.43 |  |
| 64 | Evelynn | -0.29 | 0.84 | 1.13 |  |
| 65 | Kayn | -0.29 | 0.84 | 1.13 |  |
| 66 | Twisted Fate | -0.32 | 0.21 | 0.53 |  |
| 67 | Shyvana | -0.32 | 0.15 | 0.47 |  |
| 68 | Quinn | -0.33 | 0.19 | 0.52 |  |
| 69 | Illaoi | -0.33 | 0.15 | 0.48 |  |
| 70 | Karma | -0.33 | 0.11 | 0.44 |  |
| 71 | Kha'Zix | -0.34 | 0.00 | 0.34 |  |
| 72 | Heimerdinger | -0.35 | 0.15 | 0.50 |  |
| 73 | Jax | -0.36 | 0.41 | 0.77 | attack dodge (Counter Strike) |
| 74 | Kled | -0.39 | 0.82 | 1.21 |  |
| 75 | Ezreal | -0.39 | 0.16 | 0.55 |  |
| 76 | Lux | -0.40 | 0.14 | 0.54 |  |
| 77 | Katarina | -0.43 | 0.18 | 0.61 |  |
| 78 | Varus | -0.44 | 0.31 | 0.75 |  |
| 79 | Graves | -0.44 | 0.12 | 0.56 |  |
| 80 | Poppy | -0.46 | 0.78 | 1.24 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 81 | Ashe | -0.46 | 0.18 | 0.64 |  |
| 82 | Aatrox | -0.46 | 0.00 | 0.46 |  |
| 83 | Xin Zhao | -0.47 | 0.59 | 1.06 |  |
| 84 | Anivia | -0.48 | 0.12 | 0.60 |  |
| 85 | Talon | -0.48 | 0.00 | 0.48 |  |
| 86 | Gnar | -0.50 | 0.16 | 0.66 |  |
| 87 | Smolder | -0.51 | 0.16 | 0.67 |  |
| 88 | Ivern | -0.51 | 0.10 | 0.61 |  |
| 89 | Kassadin | -0.51 | 0.00 | 0.51 |  |
| 90 | Locke | -0.51 | 0.00 | 0.51 |  |
| 91 | Rumble | -0.51 | 0.00 | 0.51 |  |
| 92 | Draven | -0.52 | 0.18 | 0.70 |  |
| 93 | Shen | -0.53 | 0.39 | 0.92 |  |
| 94 | Kennen | -0.54 | 0.14 | 0.68 |  |
| 95 | Mel | -0.54 | 0.13 | 0.67 |  |
| 96 | Riven | -0.55 | 0.00 | 0.55 |  |
| 97 | Blitzcrank | -0.56 | 0.00 | 0.56 |  |
| 98 | Miss Fortune | -0.57 | 0.16 | 0.73 |  |
| 99 | Sona | -0.59 | 0.21 | 0.80 |  |
| 100 | Akshan | -0.59 | 0.17 | 0.76 |  |
| 101 | Sett | -0.59 | 0.15 | 0.74 |  |
| 102 | Bel'Veth | -0.59 | 0.00 | 0.59 |  |
| 103 | Ziggs | -0.60 | 0.13 | 0.73 |  |
| 104 | Sylas | -0.60 | 0.00 | 0.60 |  |
| 105 | Brand | -0.61 | 0.11 | 0.72 |  |
| 106 | Syndra | -0.61 | 0.11 | 0.72 |  |
| 107 | Renekton | -0.61 | 0.00 | 0.61 |  |
| 108 | Senna | -0.63 | 0.16 | 0.79 |  |
| 109 | Wukong | -0.63 | 0.00 | 0.63 |  |
| 110 | Annie | -0.64 | 0.11 | 0.75 |  |
| 111 | Vel'Koz | -0.65 | 0.13 | 0.78 |  |
| 112 | Ryze | -0.66 | 0.12 | 0.78 |  |
| 113 | Mordekaiser | -0.66 | 0.09 | 0.75 |  |
| 114 | Cho'Gath | -0.66 | 0.00 | 0.66 |  |
| 115 | Yasuo | -0.66 | 0.00 | 0.66 |  |
| 116 | Aurelion Sol | -0.68 | 0.11 | 0.79 |  |
| 117 | Lee Sin | -0.68 | 0.00 | 0.68 |  |
| 118 | Xerath | -0.69 | 0.13 | 0.82 |  |
| 119 | Swain | -0.69 | 0.10 | 0.79 |  |
| 120 | Thresh | -0.70 | 0.10 | 0.80 |  |
| 121 | Darius | -0.70 | 0.00 | 0.70 |  |
| 122 | Trundle | -0.70 | 0.00 | 0.70 |  |
| 123 | Yone | -0.72 | 0.49 | 1.21 |  |
| 124 | Amumu | -0.72 | 0.33 | 1.05 |  |
| 125 | Akali | -0.72 | 0.00 | 0.72 |  |
| 126 | Aphelios | -0.73 | 0.24 | 0.97 |  |
| 127 | Karthus | -0.73 | 0.10 | 0.83 |  |
| 128 | Malphite | -0.75 | 0.40 | 1.15 |  |
| 129 | Lucian | -0.75 | 0.18 | 0.93 |  |
| 130 | Tristana | -0.75 | 0.18 | 0.93 |  |
| 131 | Orianna | -0.75 | 0.13 | 0.88 |  |
| 132 | Irelia | -0.76 | 0.03 | 0.79 |  |
| 133 | Lillia | -0.79 | 0.05 | 0.84 |  |
| 134 | Renata Glasc | -0.80 | 0.19 | 0.99 |  |
| 135 | Azir | -0.80 | 0.13 | 0.93 |  |
| 136 | Skarner | -0.81 | 0.06 | 0.87 |  |
| 137 | Caitlyn | -0.82 | 0.18 | 1.00 |  |
| 138 | Seraphine | -0.83 | 0.14 | 0.97 |  |
| 139 | Urgot | -0.84 | 0.08 | 0.92 |  |
| 140 | Braum | -0.84 | 0.00 | 0.84 |  |
| 141 | Hecarim | -0.85 | 0.15 | 1.00 |  |
| 142 | Neeko | -0.88 | 0.11 | 0.99 |  |
| 143 | Fizz | -0.88 | 0.00 | 0.88 |  |
| 144 | Zyra | -0.89 | 0.12 | 1.01 |  |
| 145 | Diana | -0.89 | 0.00 | 0.89 |  |
| 146 | Zac | -0.90 | 0.70 | 1.60 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 147 | Leona | -0.91 | 0.00 | 0.91 |  |
| 148 | Nami | -0.93 | 0.11 | 1.04 |  |
| 149 | Volibear | -0.94 | 0.15 | 1.09 |  |
| 150 | Jhin | -0.94 | 0.13 | 1.07 |  |
| 151 | Janna | -0.95 | 0.18 | 1.13 |  |
| 152 | K'Sante | -0.97 | 0.30 | 1.27 |  |
| 153 | Nautilus | -0.97 | 0.00 | 0.97 |  |
| 154 | Fiddlesticks | -0.98 | 0.10 | 1.08 |  |
| 155 | Nunu & Willump | -0.99 | 0.13 | 1.12 |  |
| 156 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 157 | Rammus | -1.02 | 0.38 | 1.40 |  |
| 158 | Rakan | -1.03 | 0.06 | 1.09 |  |
| 159 | Qiyana | -1.07 | 0.00 | 1.07 |  |
| 160 | Jarvan IV | -1.10 | 0.15 | 1.25 |  |
| 161 | Galio | -1.10 | 0.00 | 1.10 |  |
| 162 | Rell | -1.12 | 0.00 | 1.12 |  |
| 163 | Ornn | -1.14 | 0.15 | 1.29 |  |
| 164 | Gragas | -1.14 | 0.00 | 1.14 |  |
| 165 | Sejuani | -1.15 | 0.00 | 1.15 |  |
| 166 | Briar | -1.16 | 0.00 | 1.16 |  |
| 167 | Pyke | -1.17 | 0.00 | 1.17 |  |
| 168 | Viego | -1.20 | 0.20 | 1.40 |  |
| 169 | Naafiri | -1.29 | 0.00 | 1.29 |  |
| 170 | Vi | -1.42 | 0.15 | 1.57 |  |
| 171 | Tahm Kench | -1.53 | 0.00 | 1.53 |  |
| 172 | Taliyah | -1.59 | 0.13 | 1.72 |  |
