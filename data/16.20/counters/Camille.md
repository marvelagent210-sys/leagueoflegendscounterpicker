# Counters to Camille (patch 26.20)

## Simulated duels

The duel simulator played each of the 94 other champions with a simulator kit against Camille: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Camille wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Camille --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.91 | +1.00 | +1.00 | +1.00 | +0.46 | – | +1.00 |
| 2 | Yorick | +0.85 | +1.00 | +1.00 | +1.00 | +0.11 | – | +1.00 |
| 3 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 4 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.31 | – | +0.00 |
| 5 | Ashe | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 6 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | −0.05 | – | +1.00 |
| 7 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 8 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.10 | – | +1.00 |
| 9 | Kled | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 10 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 11 | Warwick | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 12 | Morgana | +0.79 | +0.96 | +0.95 | +1.00 | +0.14 | +0.93 | +0.00 |
| 13 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 14 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 15 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 16 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 17 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 18 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 19 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 20 | Kalista | +0.77 | +1.00 | +0.79 | +1.00 | +0.14 | +1.00 | +0.00 |
| 21 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 22 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 23 | Zaahen | +0.75 | +1.00 | +1.00 | +1.00 | +0.17 | – | −1.00 |
| 24 | Wukong | +0.74 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.50 |
| 25 | Aatrox | +0.72 | +1.00 | +1.00 | +1.00 | −0.01 | – | −1.00 |
| 26 | Volibear | +0.62 | +1.00 | +0.55 | +1.00 | −0.21 | – | +0.00 |
| 27 | K'Sante | +0.39 | +1.00 | +1.00 | −1.00 | +0.17 | – | +0.50 |
| 28 | Yone | +0.33 | +1.00 | +1.00 | −1.00 | −0.01 | – | +0.00 |
| 29 | Mordekaiser | +0.30 | +0.98 | +0.98 | −1.00 | −0.13 | – | +0.00 |
| 30 | Lux | +0.27 | +0.32 | +0.77 | +0.00 | +0.10 | −0.12 | +0.00 |
| 31 | Kog'Maw | +0.24 | +0.00 | +0.00 | +1.00 | +0.28 | +0.00 | +0.00 |
| 32 | Yasuo | +0.21 | +1.00 | −1.00 | +1.00 | −0.06 | – | +0.00 |
| 33 | Malzahar | +0.16 | +0.82 | +1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 34 | Sion | +0.07 | −0.02 | +0.25 | +0.00 | +0.03 | – | +0.00 |
| 35 | Irelia | +0.06 | +1.00 | +0.03 | −0.95 | −0.09 | – | +0.00 |
| 36 | Xin Zhao | +0.01 | +0.07 | +0.00 | +0.00 | −0.04 | – | +0.00 |
| 37 | Draven | −0.03 | +1.00 | +0.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 38 | Corki | −0.08 | −1.00 | +1.00 | +0.00 | +0.14 | −1.00 | +0.00 |
| 39 | Anivia | −0.12 | +0.04 | +0.23 | −1.00 | −0.05 | +0.23 | +0.00 |
| 40 | Jinx | −0.20 | −1.00 | +0.00 | +0.66 | +0.12 | −1.00 | +0.00 |
| 41 | Gangplank | −0.20 | +1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 42 | Sett | −0.22 | −1.00 | +1.00 | −1.00 | +0.01 | – | +0.00 |
| 43 | Kayle | −0.28 | +0.16 | −1.00 | −1.00 | +0.22 | +1.00 | +0.00 |
| 44 | Master Yi | −0.28 | +0.00 | −1.00 | +0.00 | +0.12 | −1.00 | +1.00 |
| 45 | Gwen | −0.31 | −1.00 | −1.00 | +1.00 | +0.15 | – | +0.00 |
| 46 | Ezreal | −0.33 | −0.94 | +1.00 | −1.00 | +0.04 | −1.00 | −1.00 |
| 47 | Heimerdinger | −0.38 | −1.00 | −1.00 | +1.00 | +0.12 | −1.00 | +0.00 |
| 48 | Cassiopeia | −0.39 | −1.00 | −1.00 | +1.00 | +0.05 | −1.00 | +0.00 |
| 49 | Pantheon | −0.46 | −1.00 | +0.00 | −1.00 | +0.22 | – | +0.00 |
| 50 | Quinn | −0.47 | −0.27 | −0.27 | −1.00 | +0.11 | −1.00 | −1.00 |
| 51 | Annie | −0.49 | −1.00 | −1.00 | −0.50 | +0.09 | +1.00 | +0.00 |
| 52 | Jayce | −0.54 | −1.00 | −1.00 | +0.00 | +0.07 | – | +0.00 |
| 53 | Tahm Kench | −0.56 | −1.00 | −1.00 | +0.00 | −0.03 | – | +0.00 |
| 54 | Riven | −0.57 | −1.00 | −1.00 | +0.00 | +0.09 | – | −0.50 |
| 55 | Kennen | −0.58 | −1.00 | −1.00 | −1.00 | +0.16 | +1.00 | +0.00 |
| 56 | Gnar | −0.60 | −1.00 | −1.00 | −1.00 | +0.19 | +0.73 | +0.00 |
| 57 | Urgot | −0.61 | −0.37 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 58 | Udyr | −0.72 | −1.00 | −1.00 | −1.00 | +0.01 | – | +1.00 |
| 59 | Ambessa | −0.74 | −1.00 | −1.00 | −1.00 | +0.25 | – | +0.00 |
| 60 | Vel'Koz | −0.77 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | +0.00 |
| 61 | Ziggs | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.00 |
| 62 | Ornn | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 63 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 64 | Gragas | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 65 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 66 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 67 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 68 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 69 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 70 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 71 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 72 | Smolder | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 73 | Caitlyn | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 74 | Tristana | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 75 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 76 | Leona | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 77 | Xayah | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 78 | Aurora | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 79 | Singed | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 80 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 81 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 82 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 83 | Miss Fortune | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 84 | Zyra | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 85 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 86 | Sivir | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 87 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 88 | Brand | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 89 | Twitch | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 90 | Varus | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 91 | Jhin | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 92 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 93 | Kai'Sa | −0.84 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −1.00 |
| 94 | Hecarim | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | – | −1.00 |

## Interaction ledger estimates

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
- **0.23** range: Sivir's basic attacks reach 375 units farther than Camille's (500 vs 125 attack range). Camille closes the gap with Hookshot, The Hextech Ultimatum, Wall Dive. (Sivir basic attacks → Camille basic attacks)

#### 2. Udyr (net +1.19)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Camille's The Hextech Ultimatum (airborne, disrupt). Immune for 1.5 s, long enough to use ahead of The Hextech Ultimatum. (Udyr E Blazing Stampede → Camille R The Hextech Ultimatum)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Camille's Wall Dive (airborne, stun). Immune for 1.5 s, long enough to use ahead of Wall Dive. (Udyr E Blazing Stampede → Camille E Wall Dive)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Camille's Tactical Sweep (slow). Immune for 1.5 s, long enough to use ahead of Tactical Sweep. (Udyr E Blazing Stampede → Camille W Tactical Sweep)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Udyr's Blazing Stampede.

#### 3. Olaf (net +1.05)

- **1.00** cc immunity: Ragnarok makes Olaf immune to Camille's The Hextech Ultimatum (airborne, disrupt). Immune for 3 s, long enough to use ahead of The Hextech Ultimatum. (Olaf R Ragnarok → Camille R The Hextech Ultimatum)
- **0.48** cc immunity: Ragnarok makes Olaf immune to Camille's Wall Dive (airborne, stun). Immune for 3 s, long enough to use ahead of Wall Dive. (Olaf R Ragnarok → Camille E Wall Dive)
- **0.05** cc immunity: Ragnarok makes Olaf immune to Camille's Tactical Sweep (slow). Immune for 3 s, long enough to use ahead of Tactical Sweep. (Olaf R Ragnarok → Camille W Tactical Sweep)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Olaf's Reckless Swing.

#### 4. Vladimir (net +0.99)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Camille's The Hextech Ultimatum. Untargetable for 2 s, long enough to use ahead of The Hextech Ultimatum. (Vladimir W Sanguine Pool → Camille R The Hextech Ultimatum)
- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Camille's Wall Dive. Untargetable for 2 s, long enough to use ahead of Wall Dive. (Vladimir W Sanguine Pool → Camille E Wall Dive)
- **0.13** untargetable: Sanguine Pool can deny the initial targeting of Camille's Precision Protocol, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. The enhanced attack will still complete and hit the target even if they become untargetable during the attack's windup. (Vladimir W Sanguine Pool → Camille Q Precision Protocol)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Vladimir's Hemoplague.

#### 5. Fiora (net +0.99)

- **0.88** parry: Riposte parries Camille's Wall Dive and stuns back. Parry for 0.75 s; Wall Dive takes 0.38 s to land, enough to react. Negating Wall Dive's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Camille E Wall Dive)
- **0.70** parry: Riposte parries Camille's The Hextech Ultimatum and stuns back. Parry for 0.75 s; The Hextech Ultimatum lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating The Hextech Ultimatum's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Camille R The Hextech Ultimatum)
- **0.16** parry: Riposte parries Camille's Precision Protocol. Parry for 0.75 s; Precision Protocol lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Camille Q Precision Protocol)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Fiora's Riposte.

#### 6. Xayah (net +0.95)

- **0.94** untargetable: Featherstorm makes Xayah untargetable, dodging Camille's The Hextech Ultimatum. Untargetable for 1.5 s, long enough to use ahead of The Hextech Ultimatum. (Xayah R Featherstorm → Camille R The Hextech Ultimatum)
- **0.46** untargetable: Featherstorm makes Xayah untargetable, dodging Camille's Wall Dive. Untargetable for 1.5 s, long enough to use ahead of Wall Dive. (Xayah R Featherstorm → Camille E Wall Dive)
- **0.19** range: Xayah's basic attacks reach 400 units farther than Camille's (525 vs 125 attack range). Camille closes the gap with Hookshot, The Hextech Ultimatum, Wall Dive. (Xayah basic attacks → Camille basic attacks)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Xayah's Featherstorm.

#### 7. Morgana (net +0.79)

- **1.00** cc immunity: Black Shield makes Morgana immune to Camille's The Hextech Ultimatum (airborne, disrupt). Immune for 5 s, long enough to use ahead of The Hextech Ultimatum. (Morgana E Black Shield → Camille R The Hextech Ultimatum)
- **0.78** cc immunity: Black Shield makes Morgana immune to Camille's Wall Dive (airborne, stun). Immune for 5 s, long enough to use ahead of Wall Dive. (Morgana E Black Shield → Camille E Wall Dive)
- **0.10** range: Morgana's basic attacks reach 325 units farther than Camille's (450 vs 125 attack range). Camille closes the gap with Hookshot, The Hextech Ultimatum, Wall Dive. (Morgana basic attacks → Camille basic attacks)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Morgana's Soul Shackles.

#### 8. Rengar (net +0.73)

- **0.80** cleanse: Battle Roar cleanses Camille's The Hextech Ultimatum (airborne) after it lands. 10 s cooldown; usable while crowd controlled. Doesn't remove disrupt. (Rengar W Battle Roar → Camille R The Hextech Ultimatum)
- **0.80** cleanse: Battle Roar cleanses Camille's Wall Dive (airborne, stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Camille E Wall Dive)
- **0.09** cleanse: Battle Roar cleanses Camille's Tactical Sweep (slow) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Camille W Tactical Sweep)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Rengar's Bola Strike.

#### 9. Kayle (net +0.73)

- **0.50** invulnerable: Divine Judgment makes Kayle invulnerable to Camille's The Hextech Ultimatum (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of The Hextech Ultimatum. (Kayle R Divine Judgment → Camille R The Hextech Ultimatum)
- **0.24** invulnerable: Divine Judgment makes Kayle invulnerable to Camille's Wall Dive (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Wall Dive. (Kayle R Divine Judgment → Camille E Wall Dive)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Camille's Precision Protocol. Invulnerable for 2.5 s, long enough to use ahead of Precision Protocol. (Kayle R Divine Judgment → Camille Q Precision Protocol)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Kayle's Starfire Spellblade.

#### 10. Sion (net +0.63)

- **1.00** cc immunity: Unstoppable Onslaught makes Sion immune to Camille's The Hextech Ultimatum (airborne, disrupt). Immune for 8 s, long enough to use ahead of The Hextech Ultimatum. (Sion R Unstoppable Onslaught → Camille R The Hextech Ultimatum)
- **0.50** cc immunity: Unstoppable Onslaught makes Sion immune to Camille's Wall Dive (airborne, stun). Immune for 8 s, long enough to use ahead of Wall Dive. (Sion R Unstoppable Onslaught → Camille E Wall Dive)
- **0.06** cc immunity: Unstoppable Onslaught makes Sion immune to Camille's Tactical Sweep (slow). Immune for 8 s, long enough to use ahead of Tactical Sweep. (Sion R Unstoppable Onslaught → Camille W Tactical Sweep)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Sion's Unstoppable Onslaught.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.60 | 1.60 | 0.00 |  |
| 2 | Udyr | +1.19 | 1.53 | 0.34 |  |
| 3 | Olaf | +1.05 | 1.25 | 0.20 |  |
| 4 | Vladimir | +0.99 | 1.51 | 0.52 |  |
| 5 | Fiora | +0.99 | 1.28 | 0.29 |  |
| 6 | Xayah | +0.95 | 1.38 | 0.43 |  |
| 7 | Morgana | +0.79 | 1.51 | 0.72 |  |
| 8 | Rengar | +0.73 | 1.22 | 0.49 |  |
| 9 | Kayle | +0.73 | 0.85 | 0.12 |  |
| 10 | Sion | +0.63 | 1.26 | 0.63 |  |
| 11 | Bard | +0.62 | 1.44 | 0.82 |  |
| 12 | Nocturne | +0.60 | 1.60 | 1.00 |  |
| 13 | Lissandra | +0.58 | 1.44 | 0.86 |  |
| 14 | Master Yi | +0.58 | 1.12 | 0.54 |  |
| 15 | Aurora | +0.55 | 0.97 | 0.42 |  |
| 16 | Gwen | +0.54 | 1.05 | 0.51 |  |
| 17 | Gangplank | +0.50 | 1.15 | 0.65 |  |
| 18 | Singed | +0.49 | 0.94 | 0.45 | grounding (Mega Adhesive) |
| 19 | Fizz | +0.43 | 1.33 | 0.90 |  |
| 20 | Teemo | +0.41 | 0.82 | 0.41 | blind (Blinding Dart) |
| 21 | Alistar | +0.40 | 1.00 | 0.60 |  |
| 22 | Yuumi | +0.36 | 1.50 | 1.14 |  |
| 23 | Shaco | +0.34 | 0.86 | 0.52 |  |
| 24 | Jinx | +0.34 | 0.84 | 0.50 | dash stop (Flame Chompers!), dash stop (Flame Chompers!) |
| 25 | Kalista | +0.33 | 1.03 | 0.70 |  |
| 26 | Milio | +0.33 | 0.70 | 0.37 |  |
| 27 | Zed | +0.27 | 0.81 | 0.54 |  |
| 28 | Rek'Sai | +0.26 | 1.28 | 1.02 |  |
| 29 | Twitch | +0.21 | 0.21 | 0.00 |  |
| 30 | Maokai | +0.20 | 1.32 | 1.12 |  |
| 31 | Kai'Sa | +0.19 | 0.19 | 0.00 |  |
| 32 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 33 | Vex | +0.12 | 0.84 | 0.72 |  |
| 34 | Nasus | +0.11 | 0.39 | 0.28 |  |
| 35 | Malzahar | +0.10 | 1.21 | 1.11 |  |
| 36 | Veigar | +0.09 | 0.72 | 0.63 | dash stop (Event Horizon) |
| 37 | Viktor | +0.04 | 0.78 | 0.74 | dash stop (Gravity Field) |
| 38 | Kindred | +0.03 | 0.23 | 0.20 |  |
| 39 | Hwei | +0.02 | 0.81 | 0.79 | dash stop (Grim Visage), dash stop (Grim Visage) |
| 40 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 41 | Lulu | -0.07 | 0.54 | 0.61 |  |
| 42 | Zilean | -0.07 | 0.16 | 0.23 |  |
| 43 | Nidalee | -0.07 | 0.15 | 0.22 |  |
| 44 | Ahri | -0.12 | 0.76 | 0.88 | dash stop (Charm), dash stop (Charm) |
| 45 | Kog'Maw | -0.12 | 0.14 | 0.26 |  |
| 46 | Dr. Mundo | -0.12 | 0.00 | 0.12 |  |
| 47 | Nilah | -0.13 | 0.53 | 0.66 |  |
| 48 | Corki | -0.13 | 0.16 | 0.29 |  |
| 49 | Cassiopeia | -0.16 | 0.76 | 0.92 | grounding (Miasma) |
| 50 | LeBlanc | -0.20 | 0.11 | 0.31 |  |
| 51 | Taric | -0.20 | 0.00 | 0.20 |  |
| 52 | Jax | -0.22 | 0.57 | 0.79 | attack dodge (Counter Strike) |
| 53 | Soraka | -0.22 | 0.13 | 0.35 |  |
| 54 | Zaahen | -0.23 | 0.85 | 1.08 |  |
| 55 | Garen | -0.23 | 0.37 | 0.60 |  |
| 56 | Zoe | -0.23 | 0.16 | 0.39 |  |
| 57 | Samira | -0.23 | 0.15 | 0.38 |  |
| 58 | Kayn | -0.24 | 0.86 | 1.10 |  |
| 59 | Zeri | -0.26 | 0.22 | 0.48 |  |
| 60 | Evelynn | -0.27 | 0.86 | 1.13 |  |
| 61 | Vayne | -0.29 | 0.21 | 0.50 |  |
| 62 | Jayce | -0.30 | 0.15 | 0.45 |  |
| 63 | Yorick | -0.31 | 0.00 | 0.31 |  |
| 64 | Karma | -0.33 | 0.11 | 0.44 |  |
| 65 | Kha'Zix | -0.34 | 0.00 | 0.34 |  |
| 66 | Quinn | -0.35 | 0.19 | 0.54 |  |
| 67 | Elise | -0.35 | 0.16 | 0.51 |  |
| 68 | Heimerdinger | -0.35 | 0.15 | 0.50 |  |
| 69 | Sylas | -0.36 | 0.00 | 0.36 |  |
| 70 | Shyvana | -0.38 | 0.15 | 0.53 |  |
| 71 | Kled | -0.39 | 0.82 | 1.21 |  |
| 72 | Warwick | -0.40 | 1.08 | 1.48 |  |
| 73 | Lux | -0.40 | 0.14 | 0.54 |  |
| 74 | Xin Zhao | -0.43 | 0.63 | 1.06 |  |
| 75 | Graves | -0.44 | 0.12 | 0.56 |  |
| 76 | Illaoi | -0.45 | 0.15 | 0.60 |  |
| 77 | Ashe | -0.46 | 0.18 | 0.64 |  |
| 78 | Aatrox | -0.46 | 0.00 | 0.46 |  |
| 79 | Varus | -0.47 | 0.31 | 0.78 |  |
| 80 | Poppy | -0.48 | 0.78 | 1.26 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 81 | Katarina | -0.48 | 0.18 | 0.66 |  |
| 82 | Anivia | -0.48 | 0.12 | 0.60 |  |
| 83 | Talon | -0.48 | 0.00 | 0.48 |  |
| 84 | Ezreal | -0.49 | 0.16 | 0.65 |  |
| 85 | Gnar | -0.50 | 0.16 | 0.66 |  |
| 86 | Smolder | -0.51 | 0.16 | 0.67 |  |
| 87 | Rumble | -0.51 | 0.00 | 0.51 |  |
| 88 | Ivern | -0.53 | 0.10 | 0.63 |  |
| 89 | Draven | -0.54 | 0.18 | 0.72 |  |
| 90 | Kennen | -0.54 | 0.14 | 0.68 |  |
| 91 | Mel | -0.54 | 0.13 | 0.67 |  |
| 92 | Kassadin | -0.54 | 0.00 | 0.54 |  |
| 93 | Blitzcrank | -0.55 | 0.00 | 0.55 |  |
| 94 | Riven | -0.55 | 0.00 | 0.55 |  |
| 95 | Pantheon | -0.58 | 0.75 | 1.33 |  |
| 96 | Twisted Fate | -0.58 | 0.21 | 0.79 |  |
| 97 | Bel'Veth | -0.59 | 0.00 | 0.59 |  |
| 98 | Ziggs | -0.60 | 0.13 | 0.73 |  |
| 99 | Sett | -0.61 | 0.15 | 0.76 |  |
| 100 | Brand | -0.61 | 0.11 | 0.72 |  |
| 101 | Syndra | -0.61 | 0.11 | 0.72 |  |
| 102 | Renekton | -0.61 | 0.00 | 0.61 |  |
| 103 | Shen | -0.63 | 0.55 | 1.18 |  |
| 104 | Senna | -0.63 | 0.16 | 0.79 |  |
| 105 | Annie | -0.64 | 0.11 | 0.75 |  |
| 106 | Wukong | -0.64 | 0.00 | 0.64 |  |
| 107 | Sona | -0.65 | 0.21 | 0.86 |  |
| 108 | Miss Fortune | -0.65 | 0.16 | 0.81 |  |
| 109 | Mordekaiser | -0.66 | 0.09 | 0.75 |  |
| 110 | Yasuo | -0.66 | 0.00 | 0.66 |  |
| 111 | Aurelion Sol | -0.68 | 0.11 | 0.79 |  |
| 112 | Cho'Gath | -0.68 | 0.00 | 0.68 |  |
| 113 | Lee Sin | -0.68 | 0.00 | 0.68 |  |
| 114 | Swain | -0.69 | 0.10 | 0.79 |  |
| 115 | Tristana | -0.70 | 0.18 | 0.88 |  |
| 116 | Thresh | -0.70 | 0.10 | 0.80 |  |
| 117 | Locke | -0.70 | 0.00 | 0.70 |  |
| 118 | Akshan | -0.71 | 0.17 | 0.88 |  |
| 119 | Vel'Koz | -0.71 | 0.13 | 0.84 |  |
| 120 | Irelia | -0.71 | 0.03 | 0.74 |  |
| 121 | Yone | -0.72 | 0.49 | 1.21 |  |
| 122 | Amumu | -0.72 | 0.33 | 1.05 |  |
| 123 | Akali | -0.72 | 0.00 | 0.72 |  |
| 124 | Darius | -0.72 | 0.00 | 0.72 |  |
| 125 | Trundle | -0.73 | 0.00 | 0.73 |  |
| 126 | Orianna | -0.75 | 0.13 | 0.88 |  |
| 127 | Aphelios | -0.76 | 0.24 | 1.00 |  |
| 128 | Xerath | -0.76 | 0.13 | 0.89 |  |
| 129 | Malphite | -0.77 | 0.40 | 1.17 |  |
| 130 | Lillia | -0.79 | 0.05 | 0.84 |  |
| 131 | Renata Glasc | -0.80 | 0.19 | 0.99 |  |
| 132 | Azir | -0.80 | 0.13 | 0.93 |  |
| 133 | Ryze | -0.80 | 0.12 | 0.92 |  |
| 134 | Skarner | -0.81 | 0.06 | 0.87 |  |
| 135 | Ekko | -0.82 | 0.00 | 0.82 |  |
| 136 | Seraphine | -0.83 | 0.14 | 0.97 |  |
| 137 | Diana | -0.83 | 0.00 | 0.83 |  |
| 138 | Lucian | -0.84 | 0.18 | 1.02 |  |
| 139 | Urgot | -0.84 | 0.08 | 0.92 |  |
| 140 | Braum | -0.84 | 0.00 | 0.84 |  |
| 141 | Karthus | -0.87 | 0.10 | 0.97 |  |
| 142 | Neeko | -0.88 | 0.11 | 0.99 |  |
| 143 | Caitlyn | -0.89 | 0.18 | 1.07 |  |
| 144 | Zyra | -0.89 | 0.12 | 1.01 |  |
| 145 | Leona | -0.91 | 0.00 | 0.91 |  |
| 146 | Zac | -0.92 | 0.70 | 1.62 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 147 | Nami | -0.93 | 0.11 | 1.04 |  |
| 148 | Volibear | -0.94 | 0.15 | 1.09 |  |
| 149 | K'Sante | -0.97 | 0.30 | 1.27 |  |
| 150 | Jhin | -0.97 | 0.13 | 1.10 |  |
| 151 | Nautilus | -0.97 | 0.00 | 0.97 |  |
| 152 | Hecarim | -0.99 | 0.15 | 1.14 |  |
| 153 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 154 | Nunu & Willump | -1.01 | 0.13 | 1.14 |  |
| 155 | Rammus | -1.03 | 0.38 | 1.41 |  |
| 156 | Janna | -1.03 | 0.18 | 1.21 |  |
| 157 | Fiddlesticks | -1.03 | 0.10 | 1.13 |  |
| 158 | Rakan | -1.03 | 0.06 | 1.09 |  |
| 159 | Qiyana | -1.07 | 0.00 | 1.07 |  |
| 160 | Jarvan IV | -1.10 | 0.15 | 1.25 |  |
| 161 | Rell | -1.12 | 0.00 | 1.12 |  |
| 162 | Ornn | -1.14 | 0.15 | 1.29 |  |
| 163 | Gragas | -1.15 | 0.00 | 1.15 |  |
| 164 | Sejuani | -1.15 | 0.00 | 1.15 |  |
| 165 | Briar | -1.17 | 0.00 | 1.17 |  |
| 166 | Pyke | -1.17 | 0.00 | 1.17 |  |
| 167 | Viego | -1.22 | 0.20 | 1.42 |  |
| 168 | Vi | -1.45 | 0.15 | 1.60 |  |
| 169 | Naafiri | -1.50 | 0.00 | 1.50 |  |
| 170 | Tahm Kench | -1.55 | 0.00 | 1.55 |  |
| 171 | Galio | -1.60 | 0.00 | 1.60 |  |
| 172 | Taliyah | -1.68 | 0.13 | 1.81 |  |
