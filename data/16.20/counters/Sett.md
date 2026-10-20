# Counters to Sett (patch 26.20)

## Simulated duels

The duel simulator played each of the 75 other champions with a simulator kit against Sett: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Sett wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Sett --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 2 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.00 |
| 3 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.09 | – | +1.00 |
| 4 | Fiora | +0.82 | +1.00 | +1.00 | +1.00 | −0.10 | – | +1.00 |
| 5 | Kayle | +0.81 | +1.00 | +0.94 | +0.92 | +0.29 | +1.00 | +0.00 |
| 6 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 7 | Ashe | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 8 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 9 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 10 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 11 | Malphite | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 12 | Yasuo | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 13 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 14 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 15 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 16 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 17 | Illaoi | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 18 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 19 | Garen | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 20 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 21 | Aatrox | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 22 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 23 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 24 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 25 | Warwick | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 26 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 27 | Wukong | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 28 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 29 | Volibear | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 30 | Gwen | +0.75 | +1.00 | +1.00 | +0.89 | −0.05 | – | +0.00 |
| 31 | Mordekaiser | +0.70 | +0.98 | +0.84 | +0.93 | −0.08 | – | +0.00 |
| 32 | Quinn | +0.70 | +1.00 | +0.91 | +1.00 | +0.16 | −0.03 | +0.00 |
| 33 | Jayce | +0.33 | +1.00 | +1.00 | −1.00 | −0.03 | – | +0.00 |
| 34 | Pantheon | +0.33 | +1.00 | +1.00 | −1.00 | −0.03 | – | +0.00 |
| 35 | Morgana | +0.25 | +0.18 | +0.48 | +0.12 | +0.12 | +0.48 | +0.00 |
| 36 | Ambessa | +0.23 | −1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 37 | Camille | +0.22 | −1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 38 | Irelia | +0.11 | −1.00 | +0.60 | +1.00 | +0.02 | – | +0.00 |
| 39 | Lux | +0.05 | +0.05 | −0.00 | +0.01 | +0.13 | +0.16 | +0.00 |
| 40 | Zyra | +0.04 | +0.12 | +0.09 | −0.09 | +0.06 | −0.04 | +0.00 |
| 41 | Malzahar | +0.04 | −0.11 | −0.04 | +0.84 | +0.04 | −1.00 | +0.00 |
| 42 | Anivia | +0.04 | +0.03 | +0.07 | +0.02 | −0.06 | +0.18 | +0.00 |
| 43 | Heimerdinger | +0.01 | +0.01 | −0.01 | −0.04 | +0.14 | −0.05 | +0.00 |
| 44 | Singed | +0.01 | +0.03 | +0.05 | −0.02 | −0.07 | – | +0.00 |
| 45 | Tahm Kench | +0.00 | −0.06 | +0.06 | +0.06 | −0.08 | – | +0.00 |
| 46 | Sion | −0.01 | −1.00 | +1.00 | +0.00 | −0.04 | – | +0.00 |
| 47 | Annie | −0.05 | +0.10 | +0.02 | −0.54 | +0.10 | +0.15 | +0.00 |
| 48 | Gnar | −0.07 | +1.00 | −1.00 | −1.00 | +0.20 | +1.00 | +0.00 |
| 49 | Vel'Koz | −0.09 | +0.01 | −0.15 | −0.34 | +0.20 | −0.17 | +0.00 |
| 50 | Karthus | −0.15 | −0.21 | −0.19 | −0.20 | +0.08 | −0.20 | +0.00 |
| 51 | Riven | −0.22 | +1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 52 | Rammus | −0.23 | −1.00 | +1.00 | −1.00 | −0.07 | – | +0.00 |
| 53 | Ornn | −0.28 | −0.11 | −0.13 | −1.00 | +0.06 | – | +0.00 |
| 54 | Veigar | −0.50 | −0.04 | −1.00 | −1.00 | +0.03 | −0.44 | +0.00 |
| 55 | Shen | −0.56 | −1.00 | −1.00 | +0.00 | −0.02 | – | +0.00 |
| 56 | Leona | −0.57 | −0.20 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 57 | Aurora | −0.58 | −1.00 | −1.00 | −1.00 | +0.18 | +0.95 | +0.00 |
| 58 | Lissandra | −0.69 | −1.00 | −1.00 | −0.47 | +0.05 | −1.00 | +0.00 |
| 59 | Kennen | −0.69 | −1.00 | −1.00 | −1.00 | −0.09 | +0.23 | +0.00 |
| 60 | Master Yi | −0.71 | −1.00 | −1.00 | −1.00 | −0.05 | +0.00 | +0.00 |
| 61 | Yone | −0.71 | −0.72 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 62 | Rumble | −0.72 | −1.00 | −0.78 | −1.00 | −0.02 | – | +0.00 |
| 63 | Brand | −0.75 | −1.00 | −0.97 | −1.00 | +0.03 | −0.58 | +0.00 |
| 64 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 65 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 66 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 67 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 68 | Gragas | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 69 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 70 | Cassiopeia | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 71 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 72 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 73 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 74 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 75 | Udyr | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Sett's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Sett's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Sett` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.73)

- **1.00** spell shield: Spell Shield's spell shield blocks Sett's The Show Stopper. Spell shield for 1.5 s, long enough to use ahead of The Show Stopper. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sett R The Show Stopper)
- **0.51** spell shield: Spell Shield's spell shield blocks Sett's Facebreaker. Spell shield for 1.5 s, long enough to use ahead of Facebreaker. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sett E Facebreaker)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Sett's (500 vs 125 attack range). Sett closes the gap with The Show Stopper. (Sivir basic attacks → Sett basic attacks)

#### 2. Bard (net +1.50)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Sett's The Show Stopper. Untargetable for 2.5 s, long enough to use ahead of The Show Stopper. (Bard R Tempered Fate → Sett R The Show Stopper)
- **0.36** range: Bard's basic attacks reach 375 units farther than Sett's (500 vs 125 attack range). Sett closes the gap with The Show Stopper. (Bard basic attacks → Sett basic attacks)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Sett's Facebreaker. Untargetable for 2.5 s, long enough to use ahead of Facebreaker. (Bard R Tempered Fate → Sett E Facebreaker)
- Watch out: The Show Stopper is displacement immune, ignoring Bard's Tempered Fate (stasis) during it.

#### 3. Xayah (net +1.47)

- **0.88** untargetable: Featherstorm makes Xayah untargetable, dodging Sett's The Show Stopper. Untargetable for 1.5 s, long enough to use ahead of The Show Stopper. (Xayah R Featherstorm → Sett R The Show Stopper)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Sett's (525 vs 125 attack range). Sett closes the gap with The Show Stopper. (Xayah basic attacks → Sett basic attacks)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Sett's Facebreaker. Untargetable for 1.5 s, long enough to use ahead of Facebreaker. (Xayah R Featherstorm → Sett E Facebreaker)

#### 4. Morgana (net +1.46)

- **1.00** cc immunity: Black Shield makes Morgana immune to Sett's The Show Stopper (slow, suppression). Immune for 5 s, long enough to use ahead of The Show Stopper. (Morgana E Black Shield → Sett R The Show Stopper)
- **0.54** cc immunity: Black Shield makes Morgana immune to Sett's Facebreaker (airborne, slow, stun). Immune for 5 s, long enough to use ahead of Facebreaker. (Morgana E Black Shield → Sett E Facebreaker)
- **0.19** range: Morgana's basic attacks reach 325 units farther than Sett's (450 vs 125 attack range). Sett closes the gap with The Show Stopper. (Morgana basic attacks → Sett basic attacks)

#### 5. Vladimir (net +1.39)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Sett's The Show Stopper. Untargetable for 2 s, long enough to use ahead of The Show Stopper. (Vladimir W Sanguine Pool → Sett R The Show Stopper)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Sett's Facebreaker. Untargetable for 2 s, long enough to use ahead of Facebreaker. (Vladimir W Sanguine Pool → Sett E Facebreaker)
- **0.26** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Sett's Knuckle Down. Untargetable for 2 s, long enough to use ahead of Knuckle Down. (Vladimir W Sanguine Pool → Sett Q Knuckle Down)
- Watch out: Facebreaker's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 6. Lissandra (net +1.39)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Sett's The Show Stopper. Untargetable for 2.5 s, long enough to use ahead of The Show Stopper. (Lissandra R Frozen Tomb → Sett R The Show Stopper)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Sett's Facebreaker. Untargetable for 2.5 s, long enough to use ahead of Facebreaker. (Lissandra R Frozen Tomb → Sett E Facebreaker)
- **0.22** range: Lissandra's basic attacks reach 425 units farther than Sett's (550 vs 125 attack range). Sett closes the gap with The Show Stopper. (Lissandra basic attacks → Sett basic attacks)
- Watch out: The Show Stopper is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

#### 7. Nocturne (net +1.39)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Sett's The Show Stopper. Spell shield for 1.5 s, long enough to use ahead of The Show Stopper. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sett R The Show Stopper)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Sett's Facebreaker. Spell shield for 1.5 s, long enough to use ahead of Facebreaker. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sett E Facebreaker)
- **0.07** cc immunity: Paranoia is displacement immune, ignoring Sett's Facebreaker (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Sett E Facebreaker)

#### 8. Udyr (net +1.35)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Sett's The Show Stopper (slow, suppression). Immune for 1.5 s, long enough to use ahead of The Show Stopper. (Udyr E Blazing Stampede → Sett R The Show Stopper)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Sett's Facebreaker (airborne, slow, stun). Immune for 1.5 s, long enough to use ahead of Facebreaker. (Udyr E Blazing Stampede → Sett E Facebreaker)

#### 9. Olaf (net +1.17)

- **1.00** cc immunity: Ragnarok makes Olaf immune to Sett's The Show Stopper (slow, suppression). Immune for 3 s, long enough to use ahead of The Show Stopper. (Olaf R Ragnarok → Sett R The Show Stopper)
- **0.33** cc immunity: Ragnarok makes Olaf immune to Sett's Facebreaker (airborne, slow, stun). Immune for 3 s, long enough to use ahead of Facebreaker. (Olaf R Ragnarok → Sett E Facebreaker)

#### 10. Milio (net +1.11)

- **0.62** cleanse: Breath of Life cleanses Sett's The Show Stopper (slow, suppression) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Sett R The Show Stopper)
- **0.38** range: Milio's basic attacks reach 400 units farther than Sett's (525 vs 125 attack range). Sett closes the gap with The Show Stopper. (Milio basic attacks → Sett basic attacks)
- **0.25** cleanse: Breath of Life cleanses Sett's Facebreaker (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Sett E Facebreaker)
- Watch out: The Show Stopper is displacement immune, ignoring Milio's Ultra Mega Fire Kick (airborne) during it.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.73 | 1.73 | 0.00 |  |
| 2 | Bard | +1.50 | 1.58 | 0.08 |  |
| 3 | Xayah | +1.47 | 1.47 | 0.00 |  |
| 4 | Morgana | +1.46 | 1.46 | 0.00 |  |
| 5 | Vladimir | +1.39 | 1.52 | 0.13 |  |
| 6 | Lissandra | +1.39 | 1.44 | 0.05 |  |
| 7 | Nocturne | +1.39 | 1.39 | 0.00 |  |
| 8 | Udyr | +1.35 | 1.35 | 0.00 |  |
| 9 | Olaf | +1.17 | 1.17 | 0.00 |  |
| 10 | Milio | +1.11 | 1.18 | 0.07 |  |
| 11 | Fiora | +1.07 | 1.07 | 0.00 |  |
| 12 | Rek'Sai | +1.06 | 1.22 | 0.16 |  |
| 13 | Gangplank | +1.03 | 1.03 | 0.00 |  |
| 14 | Kayle | +1.00 | 1.00 | 0.00 |  |
| 15 | Maokai | +0.98 | 1.05 | 0.07 |  |
| 16 | Fizz | +0.97 | 1.05 | 0.08 |  |
| 17 | Rengar | +0.94 | 1.08 | 0.14 |  |
| 18 | Sion | +0.91 | 1.18 | 0.27 |  |
| 19 | Kalista | +0.90 | 1.09 | 0.19 |  |
| 20 | Gwen | +0.89 | 0.89 | 0.00 |  |
| 21 | Aurora | +0.87 | 1.02 | 0.15 |  |
| 22 | Master Yi | +0.83 | 1.17 | 0.34 |  |
| 23 | Alistar | +0.82 | 0.94 | 0.12 |  |
| 24 | Teemo | +0.77 | 0.85 | 0.08 | blind (Blinding Dart) |
| 25 | Evelynn | +0.72 | 0.80 | 0.08 |  |
| 26 | Zed | +0.72 | 0.72 | 0.00 |  |
| 27 | Cassiopeia | +0.70 | 0.70 | 0.00 | grounding (Miasma) |
| 28 | Yuumi | +0.61 | 1.39 | 0.78 |  |
| 29 | Camille | +0.61 | 0.76 | 0.15 |  |
| 30 | Shaco | +0.60 | 0.80 | 0.20 |  |
| 31 | Singed | +0.60 | 0.67 | 0.07 | grounding (Mega Adhesive) |
| 32 | Zaahen | +0.59 | 0.77 | 0.18 |  |
| 33 | Lulu | +0.58 | 0.66 | 0.08 |  |
| 34 | Kled | +0.55 | 0.79 | 0.24 |  |
| 35 | Aphelios | +0.52 | 0.52 | 0.00 |  |
| 36 | Garen | +0.49 | 0.49 | 0.00 |  |
| 37 | Kindred | +0.47 | 0.47 | 0.00 |  |
| 38 | Jax | +0.44 | 0.44 | 0.00 |  |
| 39 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 40 | Nilah | +0.41 | 0.49 | 0.08 |  |
| 41 | Sona | +0.41 | 0.41 | 0.00 |  |
| 42 | Xin Zhao | +0.40 | 0.58 | 0.18 |  |
| 43 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 44 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 45 | Heimerdinger | +0.34 | 0.34 | 0.00 |  |
| 46 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 47 | Twitch | +0.32 | 0.43 | 0.11 |  |
| 48 | Elise | +0.32 | 0.32 | 0.00 |  |
| 49 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 50 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 51 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 52 | Renata Glasc | +0.31 | 0.38 | 0.07 |  |
| 53 | Vex | +0.31 | 0.34 | 0.03 |  |
| 54 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 55 | Draven | +0.29 | 0.36 | 0.07 |  |
| 56 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 57 | Lux | +0.29 | 0.29 | 0.00 |  |
| 58 | Seraphine | +0.29 | 0.29 | 0.00 |  |
| 59 | Tristana | +0.28 | 0.36 | 0.08 |  |
| 60 | Viktor | +0.28 | 0.32 | 0.04 |  |
| 61 | Kai'Sa | +0.27 | 0.38 | 0.11 |  |
| 62 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 63 | Mel | +0.27 | 0.27 | 0.00 |  |
| 64 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 65 | Vayne | +0.25 | 0.43 | 0.18 |  |
| 66 | Gnar | +0.25 | 0.33 | 0.08 |  |
| 67 | Zoe | +0.25 | 0.32 | 0.07 |  |
| 68 | Jinx | +0.25 | 0.29 | 0.04 |  |
| 69 | Graves | +0.24 | 0.24 | 0.00 |  |
| 70 | Corki | +0.23 | 0.30 | 0.07 |  |
| 71 | Jayce | +0.23 | 0.30 | 0.07 |  |
| 72 | Varus | +0.22 | 0.39 | 0.17 |  |
| 73 | Annie | +0.22 | 0.22 | 0.00 |  |
| 74 | Brand | +0.22 | 0.22 | 0.00 |  |
| 75 | Karma | +0.22 | 0.22 | 0.00 |  |
| 76 | Senna | +0.21 | 0.32 | 0.11 |  |
| 77 | Samira | +0.21 | 0.30 | 0.09 |  |
| 78 | Veigar | +0.20 | 0.24 | 0.04 |  |
| 79 | Orianna | +0.19 | 0.27 | 0.08 |  |
| 80 | Ahri | +0.18 | 0.22 | 0.04 |  |
| 81 | Hwei | +0.16 | 0.23 | 0.07 |  |
| 82 | Skarner | +0.16 | 0.16 | 0.00 |  |
| 83 | Syndra | +0.15 | 0.22 | 0.07 |  |
| 84 | LeBlanc | +0.14 | 0.22 | 0.08 |  |
| 85 | Swain | +0.14 | 0.21 | 0.07 |  |
| 86 | Azir | +0.11 | 0.27 | 0.16 |  |
| 87 | Ziggs | +0.10 | 0.27 | 0.17 |  |
| 88 | Anivia | +0.10 | 0.24 | 0.14 |  |
| 89 | Malphite | +0.08 | 0.28 | 0.20 |  |
| 90 | Zyra | +0.08 | 0.24 | 0.16 |  |
| 91 | Neeko | +0.07 | 0.22 | 0.15 |  |
| 92 | Illaoi | +0.07 | 0.07 | 0.00 |  |
| 93 | Shyvana | +0.07 | 0.07 | 0.00 |  |
| 94 | Volibear | +0.07 | 0.07 | 0.00 |  |
| 95 | Malzahar | +0.06 | 0.89 | 0.83 |  |
| 96 | Thresh | +0.06 | 0.19 | 0.13 |  |
| 97 | Urgot | +0.06 | 0.15 | 0.09 |  |
| 98 | Irelia | +0.05 | 0.05 | 0.00 |  |
| 99 | Nami | +0.04 | 0.22 | 0.18 |  |
| 100 | Lillia | +0.03 | 0.11 | 0.08 |  |
| 101 | Aurelion Sol | +0.02 | 0.22 | 0.20 |  |
| 102 | Quinn | 0.00 | 0.38 | 0.38 |  |
| 103 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 104 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 105 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 106 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 107 | Leona | 0.00 | 0.00 | 0.00 |  |
| 108 | Locke | 0.00 | 0.00 | 0.00 |  |
| 109 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 110 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 111 | Taric | 0.00 | 0.00 | 0.00 |  |
| 112 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 113 | Hecarim | -0.01 | 0.07 | 0.08 |  |
| 114 | Ivern | -0.03 | 0.19 | 0.22 |  |
| 115 | K'Sante | -0.03 | 0.14 | 0.17 |  |
| 116 | Amumu | -0.05 | 0.00 | 0.05 |  |
| 117 | Briar | -0.05 | 0.00 | 0.05 |  |
| 118 | Mordekaiser | -0.06 | 0.08 | 0.14 |  |
| 119 | Rakan | -0.07 | 0.13 | 0.20 |  |
| 120 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 121 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 122 | Darius | -0.07 | 0.00 | 0.07 |  |
| 123 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 124 | Braum | -0.08 | 0.00 | 0.08 |  |
| 125 | Diana | -0.08 | 0.00 | 0.08 |  |
| 126 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 127 | Ornn | -0.09 | 0.07 | 0.16 |  |
| 128 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 129 | Akali | -0.11 | 0.00 | 0.11 |  |
| 130 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 131 | Kayn | -0.14 | 0.80 | 0.94 |  |
| 132 | Talon | -0.14 | 0.00 | 0.14 |  |
| 133 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 134 | Rammus | -0.17 | 0.32 | 0.49 |  |
| 135 | Aatrox | -0.17 | 0.00 | 0.17 |  |
| 136 | Yone | -0.18 | 0.07 | 0.25 |  |
| 137 | Blitzcrank | -0.18 | 0.00 | 0.18 |  |
| 138 | Caitlyn | -0.20 | 0.36 | 0.56 |  |
| 139 | Lucian | -0.20 | 0.36 | 0.56 |  |
| 140 | Riven | -0.20 | 0.00 | 0.20 |  |
| 141 | Jarvan IV | -0.21 | 0.07 | 0.28 |  |
| 142 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 143 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 144 | Miss Fortune | -0.24 | 0.32 | 0.56 |  |
| 145 | Rell | -0.24 | 0.00 | 0.24 |  |
| 146 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 147 | Akshan | -0.26 | 0.34 | 0.60 |  |
| 148 | Viego | -0.26 | 0.16 | 0.42 |  |
| 149 | Twisted Fate | -0.27 | 0.43 | 0.70 |  |
| 150 | Pantheon | -0.28 | 0.70 | 0.98 |  |
| 151 | Wukong | -0.28 | 0.00 | 0.28 |  |
| 152 | Yasuo | -0.28 | 0.00 | 0.28 |  |
| 153 | Jhin | -0.29 | 0.27 | 0.56 |  |
| 154 | Pyke | -0.32 | 0.00 | 0.32 |  |
| 155 | Vel'Koz | -0.33 | 0.27 | 0.60 |  |
| 156 | Xerath | -0.36 | 0.27 | 0.63 |  |
| 157 | Katarina | -0.36 | 0.12 | 0.48 |  |
| 158 | Karthus | -0.37 | 0.19 | 0.56 |  |
| 159 | Warwick | -0.38 | 0.84 | 1.22 |  |
| 160 | Gragas | -0.40 | 0.00 | 0.40 |  |
| 161 | Ryze | -0.46 | 0.24 | 0.70 |  |
| 162 | Shen | -0.49 | 0.41 | 0.90 |  |
| 163 | Poppy | -0.50 | 0.00 | 0.50 |  |
| 164 | Nunu & Willump | -0.52 | 0.36 | 0.88 |  |
| 165 | Janna | -0.56 | 0.36 | 0.92 |  |
| 166 | Fiddlesticks | -0.65 | 0.20 | 0.85 |  |
| 167 | Vi | -0.66 | 0.07 | 0.73 |  |
| 168 | Zac | -0.78 | 0.00 | 0.78 |  |
| 169 | Taliyah | -0.83 | 0.27 | 1.10 |  |
| 170 | Tahm Kench | -0.84 | 0.00 | 0.84 |  |
| 171 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 172 | Galio | -1.25 | 0.00 | 1.25 |  |
