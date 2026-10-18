# Counters to Poppy (patch 26.20)

## Simulated duels

The duel simulator played each of the 72 other champions with a simulator kit against Poppy: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Poppy wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Poppy --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 2 | Vayne | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 3 | K'Sante | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 4 | Nasus | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 5 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 6 | Dr. Mundo | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 7 | Yorick | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 8 | Cho'Gath | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 9 | Illaoi | +0.74 | +1.00 | +0.93 | +1.00 | −0.09 | – | +0.00 |
| 10 | Volibear | +0.74 | +1.00 | +1.00 | +1.00 | −0.24 | – | +0.00 |
| 11 | Zaahen | +0.73 | +1.00 | +1.00 | +1.00 | −0.29 | – | +0.00 |
| 12 | Trundle | +0.73 | +1.00 | +1.00 | +1.00 | −0.29 | – | +0.00 |
| 13 | Fiora | +0.28 | +0.63 | +0.63 | −0.18 | −0.34 | – | +0.53 |
| 14 | Gangplank | +0.21 | −1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 15 | Anivia | +0.03 | −0.17 | +0.19 | +0.13 | −0.10 | +0.15 | +0.00 |
| 16 | Tahm Kench | −0.13 | −0.14 | −0.12 | −0.13 | −0.16 | – | +0.00 |
| 17 | Aatrox | −0.25 | +1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 18 | Ashe | −0.29 | +1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 19 | Kled | −0.32 | −1.00 | +0.00 | +0.00 | −0.28 | – | +0.00 |
| 20 | Quinn | −0.39 | −1.00 | +0.00 | −0.06 | −0.20 | −1.00 | +0.00 |
| 21 | Heimerdinger | −0.40 | −1.00 | −1.00 | +1.00 | +0.01 | −1.00 | +0.00 |
| 22 | Zyra | −0.40 | −0.23 | −0.23 | −1.00 | +0.08 | −1.00 | +0.00 |
| 23 | Karthus | −0.49 | −0.31 | −0.65 | −1.00 | −0.11 | −0.32 | +0.00 |
| 24 | Malphite | −0.55 | −1.00 | −0.55 | −0.55 | +0.01 | – | +0.00 |
| 25 | Lux | −0.63 | −0.25 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 26 | Lissandra | −0.72 | −1.00 | −1.00 | −1.00 | +0.01 | −0.26 | +0.00 |
| 27 | Master Yi | −0.73 | −1.00 | −1.00 | −1.00 | −0.02 | – | +1.00 |
| 28 | Kayle | −0.75 | −1.00 | −1.00 | −1.00 | +0.33 | −1.00 | +0.00 |
| 29 | Ornn | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 30 | Jayce | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 31 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 32 | Ambessa | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 33 | Annie | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 34 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 35 | Vel'Koz | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 36 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 37 | Yasuo | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 38 | Teemo | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 39 | Cassiopeia | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 40 | Ziggs | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 41 | Irelia | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 42 | Sett | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 43 | Yone | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 44 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 45 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 46 | Xin Zhao | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 47 | Ahri | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 48 | Renekton | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 49 | Malzahar | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 50 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 51 | Aurora | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 52 | Mordekaiser | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 53 | Morgana | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 54 | Kassadin | −0.82 | −1.00 | −1.00 | −1.00 | −0.23 | – | +0.00 |
| 55 | Urgot | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 56 | Rumble | −0.82 | −1.00 | −1.00 | −1.00 | −0.23 | – | +0.00 |
| 57 | Gnar | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 58 | Singed | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 59 | Jax | −0.82 | −1.00 | −1.00 | −1.00 | −0.25 | – | +0.00 |
| 60 | Skarner | −0.82 | −1.00 | −1.00 | −1.00 | −0.25 | – | +0.00 |
| 61 | Pantheon | −0.82 | −1.00 | −1.00 | −1.00 | −0.27 | – | +0.00 |
| 62 | Gwen | −0.82 | −1.00 | −1.00 | −1.00 | −0.28 | – | +0.00 |
| 63 | Udyr | −0.82 | −1.00 | −1.00 | −1.00 | −0.28 | – | +0.00 |
| 64 | Sion | −0.83 | −1.00 | −1.00 | −1.00 | −0.28 | – | +0.00 |
| 65 | Camille | −0.83 | −1.00 | −1.00 | −1.00 | −0.31 | – | +0.00 |
| 66 | Akali | −0.83 | −1.00 | −1.00 | −1.00 | −0.31 | – | +0.00 |
| 67 | Tryndamere | −0.83 | −1.00 | −1.00 | −1.00 | −0.31 | – | +0.00 |
| 68 | Brand | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 69 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 70 | Garen | −0.83 | −1.00 | −1.00 | −1.00 | −0.32 | – | +0.00 |
| 71 | Riven | −0.83 | −1.00 | −1.00 | −1.00 | −0.34 | – | +0.00 |
| 72 | Kennen | −0.85 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Poppy's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Poppy's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Poppy` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.57)

- **0.80** spell shield: Spell Shield's spell shield blocks Poppy's Keeper's Verdict. Spell shield for 1.5 s, long enough to use ahead of Keeper's Verdict. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Poppy R Keeper's Verdict)
- **0.59** spell shield: Spell Shield's spell shield blocks Poppy's Heroic Charge. Spell shield for 1.5 s, long enough to use ahead of Heroic Charge. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Poppy E Heroic Charge)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Poppy's (500 vs 125 attack range). Poppy closes the gap with Heroic Charge. (Sivir basic attacks → Poppy basic attacks)

#### 2. Nocturne (net +1.56)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Poppy's Keeper's Verdict. Spell shield for 1.5 s, long enough to use ahead of Keeper's Verdict. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Poppy R Keeper's Verdict)
- **0.72** spell shield: Shroud of Darkness's spell shield blocks Poppy's Heroic Charge. Spell shield for 1.5 s, long enough to use ahead of Heroic Charge. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Poppy E Heroic Charge)
- **0.20** interrupt: Unspeakable Horror's fear interrupts Poppy's Keeper's Verdict (charge-up). Unspeakable Horror must land during the charge-up. Poppy can release Keeper's Verdict early instead of charging it fully. (Nocturne E Unspeakable Horror → Poppy R Keeper's Verdict)

#### 3. Maokai (net +1.40)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Poppy's Heroic Charge. Untargetable for 1.4 s; Heroic Charge takes 0.26 s to land, enough to react. (Maokai W Twisted Advance → Poppy E Heroic Charge)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Poppy's Keeper's Verdict. Untargetable for 1.4 s; Keeper's Verdict takes 0.45 s to land, enough to react. (Maokai W Twisted Advance → Poppy R Keeper's Verdict)
- **0.20** interrupt: Bramble Smash's airborne interrupts Poppy's Keeper's Verdict (charge-up). Bramble Smash must land during the charge-up. Poppy can release Keeper's Verdict early instead of charging it fully. (Maokai Q Bramble Smash → Poppy R Keeper's Verdict)

#### 4. Xayah (net +1.37)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Poppy's Keeper's Verdict. Untargetable for 1.5 s, long enough to use ahead of Keeper's Verdict. (Xayah R Featherstorm → Poppy R Keeper's Verdict)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Poppy's (525 vs 125 attack range). Poppy closes the gap with Heroic Charge. (Xayah basic attacks → Poppy basic attacks)
- **0.37** untargetable: Featherstorm makes Xayah untargetable, dodging Poppy's Heroic Charge. Untargetable for 1.5 s, long enough to use ahead of Heroic Charge. (Xayah R Featherstorm → Poppy E Heroic Charge)

#### 5. Morgana (net +1.32)

- **0.80** cc immunity: Black Shield makes Morgana immune to Poppy's Keeper's Verdict (airborne). Immune for 5 s, long enough to use ahead of Keeper's Verdict. (Morgana E Black Shield → Poppy R Keeper's Verdict)
- **0.62** cc immunity: Black Shield makes Morgana immune to Poppy's Heroic Charge (airborne, stun). Immune for 5 s, long enough to use ahead of Heroic Charge. (Morgana E Black Shield → Poppy E Heroic Charge)
- **0.19** range: Morgana's basic attacks reach 325 units farther than Poppy's (450 vs 125 attack range). Poppy closes the gap with Heroic Charge. (Morgana basic attacks → Poppy basic attacks)

#### 6. Lissandra (net +1.28)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Poppy's Keeper's Verdict. Untargetable for 2.5 s, long enough to use ahead of Keeper's Verdict. (Lissandra R Frozen Tomb → Poppy R Keeper's Verdict)
- **0.38** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Poppy's Heroic Charge. Untargetable for 2.5 s, long enough to use ahead of Heroic Charge. (Lissandra R Frozen Tomb → Poppy E Heroic Charge)
- **0.22** range: Lissandra's basic attacks reach 425 units farther than Poppy's (550 vs 125 attack range). Poppy closes the gap with Heroic Charge. (Lissandra basic attacks → Poppy basic attacks)

#### 7. Udyr (net +1.26)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Poppy's Heroic Charge (airborne, stun). Immune for 1.5 s, long enough to use ahead of Heroic Charge. (Udyr E Blazing Stampede → Poppy E Heroic Charge)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Poppy's Keeper's Verdict (airborne). Immune for 1.5 s, long enough to use ahead of Keeper's Verdict. (Udyr E Blazing Stampede → Poppy R Keeper's Verdict)
- **0.20** interrupt: Blazing Stampede's stun interrupts Poppy's Keeper's Verdict (charge-up). Blazing Stampede must land during the charge-up. Poppy can release Keeper's Verdict early instead of charging it fully. (Udyr E Blazing Stampede → Poppy R Keeper's Verdict)

#### 8. Vladimir (net +1.24)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Poppy's Keeper's Verdict. Untargetable for 2 s, long enough to use ahead of Keeper's Verdict. (Vladimir W Sanguine Pool → Poppy R Keeper's Verdict)
- **0.62** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Poppy's Heroic Charge. Untargetable for 2 s, long enough to use ahead of Heroic Charge. (Vladimir W Sanguine Pool → Poppy E Heroic Charge)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Poppy's (450 vs 125 attack range). Poppy closes the gap with Heroic Charge. (Vladimir basic attacks → Poppy basic attacks)
- Watch out: Keeper's Verdict's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 9. Shaco (net +1.19)

- **0.80** untargetable: Hallucinate makes Shaco untargetable, dodging Poppy's Keeper's Verdict. Untargetable for 0.5 s; Keeper's Verdict takes 0.45 s to land, enough to react. (Shaco R Hallucinate → Poppy R Keeper's Verdict)
- **0.38** untargetable: Hallucinate makes Shaco untargetable, dodging Poppy's Heroic Charge. Untargetable for 0.5 s; Heroic Charge takes 0.26 s to land, enough to react. (Shaco R Hallucinate → Poppy E Heroic Charge)
- **0.20** interrupt: Jack in the Box's fear interrupts Poppy's Keeper's Verdict (charge-up). Jack in the Box must land during the charge-up. Poppy can release Keeper's Verdict early instead of charging it fully. (Shaco W Jack in the Box → Poppy R Keeper's Verdict)

#### 10. Sion (net +1.18)

- **0.80** cc immunity: Unstoppable Onslaught makes Sion immune to Poppy's Keeper's Verdict (airborne). Immune for 8 s, long enough to use ahead of Keeper's Verdict. (Sion R Unstoppable Onslaught → Poppy R Keeper's Verdict)
- **0.40** cc immunity: Unstoppable Onslaught makes Sion immune to Poppy's Heroic Charge (airborne, stun). Immune for 8 s, long enough to use ahead of Heroic Charge. (Sion R Unstoppable Onslaught → Poppy E Heroic Charge)
- **0.20** interrupt: Decimating Smash's airborne interrupts Poppy's Keeper's Verdict (charge-up). Decimating Smash must land during the charge-up. Poppy can release Keeper's Verdict early instead of charging it fully. (Sion Q Decimating Smash → Poppy R Keeper's Verdict)
- Watch out: Keeper's Verdict's airborne interrupts Sion's Decimating Smash (charge-up).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.57 | 1.57 | 0.00 |  |
| 2 | Nocturne | +1.56 | 1.56 | 0.00 |  |
| 3 | Maokai | +1.40 | 1.40 | 0.00 |  |
| 4 | Xayah | +1.37 | 1.37 | 0.00 |  |
| 5 | Morgana | +1.32 | 1.32 | 0.00 |  |
| 6 | Lissandra | +1.28 | 1.28 | 0.00 |  |
| 7 | Udyr | +1.26 | 1.26 | 0.00 |  |
| 8 | Vladimir | +1.24 | 1.29 | 0.05 |  |
| 9 | Shaco | +1.19 | 1.19 | 0.00 |  |
| 10 | Sion | +1.18 | 1.26 | 0.08 |  |
| 11 | Yuumi | +1.14 | 1.52 | 0.38 |  |
| 12 | Master Yi | +1.08 | 1.18 | 0.10 |  |
| 13 | Mel | +1.07 | 1.07 | 0.00 | projectile block (Rebuttal) |
| 14 | Bard | +1.06 | 1.40 | 0.34 |  |
| 15 | Milio | +1.00 | 1.00 | 0.00 |  |
| 16 | Olaf | +1.00 | 1.00 | 0.00 |  |
| 17 | Zed | +0.99 | 0.99 | 0.00 |  |
| 18 | Warwick | +0.97 | 1.47 | 0.50 |  |
| 19 | Malzahar | +0.97 | 1.32 | 0.35 |  |
| 20 | Viktor | +0.96 | 0.96 | 0.00 |  |
| 21 | Gangplank | +0.92 | 0.92 | 0.00 |  |
| 22 | Lulu | +0.91 | 0.91 | 0.00 |  |
| 23 | Vex | +0.88 | 0.88 | 0.00 |  |
| 24 | Kayle | +0.86 | 0.86 | 0.00 |  |
| 25 | Zaahen | +0.83 | 1.40 | 0.57 |  |
| 26 | Aurora | +0.83 | 1.33 | 0.50 |  |
| 27 | Kalista | +0.82 | 1.10 | 0.28 |  |
| 28 | Cassiopeia | +0.80 | 0.80 | 0.00 |  |
| 29 | Fiora | +0.77 | 1.27 | 0.50 |  |
| 30 | Renata Glasc | +0.77 | 0.77 | 0.00 |  |
| 31 | Hwei | +0.73 | 0.73 | 0.00 | dash stop (Grim Visage) |
| 32 | Fizz | +0.71 | 1.40 | 0.69 |  |
| 33 | Alistar | +0.70 | 1.20 | 0.50 |  |
| 34 | Braum | +0.70 | 1.20 | 0.50 | projectile block (Unbreakable) |
| 35 | Jinx | +0.69 | 0.69 | 0.00 | dash stop (Flame Chompers!) |
| 36 | Teemo | +0.69 | 0.69 | 0.00 |  |
| 37 | Rek'Sai | +0.67 | 1.24 | 0.57 |  |
| 38 | Seraphine | +0.67 | 0.67 | 0.00 |  |
| 39 | Veigar | +0.67 | 0.67 | 0.00 |  |
| 40 | Heimerdinger | +0.66 | 0.66 | 0.00 |  |
| 41 | Samira | +0.65 | 1.10 | 0.45 | projectile block (Blade Whirl) |
| 42 | Anivia | +0.64 | 0.64 | 0.00 |  |
| 43 | Kled | +0.63 | 1.32 | 0.69 |  |
| 44 | Evelynn | +0.62 | 1.19 | 0.57 |  |
| 45 | Rengar | +0.62 | 0.98 | 0.36 |  |
| 46 | Nami | +0.62 | 0.62 | 0.00 |  |
| 47 | Sona | +0.61 | 0.61 | 0.00 |  |
| 48 | Gwen | +0.60 | 1.10 | 0.50 |  |
| 49 | Blitzcrank | +0.60 | 0.60 | 0.00 |  |
| 50 | Singed | +0.59 | 0.59 | 0.00 |  |
| 51 | Yasuo | +0.57 | 1.20 | 0.63 | projectile block (Wind Wall) |
| 52 | Ashe | +0.56 | 0.56 | 0.00 |  |
| 53 | Draven | +0.56 | 0.56 | 0.00 |  |
| 54 | Rammus | +0.52 | 0.67 | 0.15 |  |
| 55 | Zilean | +0.52 | 0.52 | 0.00 |  |
| 56 | Zoe | +0.52 | 0.52 | 0.00 |  |
| 57 | Sett | +0.50 | 0.50 | 0.00 |  |
| 58 | Kennen | +0.49 | 0.49 | 0.00 |  |
| 59 | Camille | +0.48 | 1.26 | 0.78 |  |
| 60 | Malphite | +0.48 | 0.48 | 0.00 |  |
| 61 | Garen | +0.47 | 0.47 | 0.00 |  |
| 62 | Orianna | +0.47 | 0.47 | 0.00 |  |
| 63 | Soraka | +0.47 | 0.47 | 0.00 |  |
| 64 | Aphelios | +0.44 | 0.44 | 0.00 |  |
| 65 | Zyra | +0.44 | 0.44 | 0.00 |  |
| 66 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 67 | Annie | +0.42 | 0.42 | 0.00 |  |
| 68 | Brand | +0.42 | 0.42 | 0.00 |  |
| 69 | Neeko | +0.42 | 0.42 | 0.00 |  |
| 70 | Syndra | +0.42 | 0.42 | 0.00 |  |
| 71 | Swain | +0.41 | 0.41 | 0.00 |  |
| 72 | Cho'Gath | +0.40 | 0.40 | 0.00 |  |
| 73 | Janna | +0.36 | 0.76 | 0.40 |  |
| 74 | Tahm Kench | +0.35 | 0.60 | 0.25 |  |
| 75 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 76 | Senna | +0.32 | 0.32 | 0.00 |  |
| 77 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 78 | Rell | +0.31 | 1.00 | 0.69 |  |
| 79 | Shyvana | +0.30 | 0.30 | 0.00 |  |
| 80 | Lux | +0.29 | 0.29 | 0.00 |  |
| 81 | Twisted Fate | +0.28 | 0.63 | 0.35 |  |
| 82 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 83 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 84 | Skarner | +0.27 | 0.27 | 0.00 |  |
| 85 | Mordekaiser | +0.26 | 0.26 | 0.00 |  |
| 86 | Xin Zhao | +0.25 | 0.75 | 0.50 |  |
| 87 | Ahri | +0.24 | 0.68 | 0.44 |  |
| 88 | Fiddlesticks | +0.24 | 0.60 | 0.36 |  |
| 89 | Vel'Koz | +0.23 | 0.47 | 0.24 |  |
| 90 | Kayn | +0.22 | 1.19 | 0.97 |  |
| 91 | Gnar | +0.22 | 0.73 | 0.51 |  |
| 92 | Varus | +0.22 | 0.27 | 0.05 |  |
| 93 | Karma | +0.22 | 0.22 | 0.00 |  |
| 94 | K'Sante | +0.21 | 0.80 | 0.59 |  |
| 95 | Darius | +0.20 | 0.20 | 0.00 |  |
| 96 | Kassadin | +0.20 | 0.20 | 0.00 |  |
| 97 | Taric | +0.20 | 0.20 | 0.00 |  |
| 98 | Trundle | +0.20 | 0.20 | 0.00 |  |
| 99 | Yorick | +0.20 | 0.20 | 0.00 |  |
| 100 | Vayne | +0.19 | 0.63 | 0.44 |  |
| 101 | Aurelion Sol | +0.18 | 0.62 | 0.44 |  |
| 102 | Tristana | +0.18 | 0.56 | 0.38 |  |
| 103 | Xerath | +0.16 | 0.47 | 0.31 |  |
| 104 | Corki | +0.12 | 0.50 | 0.38 |  |
| 105 | Jayce | +0.12 | 0.50 | 0.38 |  |
| 106 | Elise | +0.11 | 0.52 | 0.41 |  |
| 107 | Kindred | +0.09 | 0.47 | 0.38 |  |
| 108 | Nilah | +0.08 | 0.58 | 0.50 |  |
| 109 | Thresh | +0.06 | 0.59 | 0.53 |  |
| 110 | Azir | +0.06 | 0.47 | 0.41 |  |
| 111 | Zeri | +0.06 | 0.44 | 0.38 |  |
| 112 | Zac | +0.04 | 0.90 | 0.86 | dash stop (Stretching Strikes) |
| 113 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 114 | Volibear | +0.03 | 0.40 | 0.37 |  |
| 115 | Yone | +0.01 | 0.70 | 0.69 |  |
| 116 | Urgot | +0.01 | 0.55 | 0.54 |  |
| 117 | Jhin | +0.01 | 0.27 | 0.26 |  |
| 118 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 119 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 120 | Ziggs | -0.02 | 0.47 | 0.49 |  |
| 121 | Yunara | -0.02 | 0.36 | 0.38 |  |
| 122 | Sejuani | -0.03 | 0.60 | 0.63 |  |
| 123 | Kai'Sa | -0.06 | 0.38 | 0.44 |  |
| 124 | Hecarim | -0.07 | 0.31 | 0.38 |  |
| 125 | Lillia | -0.08 | 0.30 | 0.38 |  |
| 126 | Nidalee | -0.08 | 0.30 | 0.38 |  |
| 127 | Nunu & Willump | -0.08 | 0.27 | 0.35 |  |
| 128 | Illaoi | -0.09 | 0.20 | 0.29 |  |
| 129 | Karthus | -0.09 | 0.19 | 0.28 |  |
| 130 | Quinn | -0.10 | 0.58 | 0.68 |  |
| 131 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 132 | Jax | -0.12 | 0.38 | 0.50 |  |
| 133 | Amumu | -0.14 | 0.49 | 0.63 |  |
| 134 | Taliyah | -0.17 | 0.85 | 1.02 |  |
| 135 | Ornn | -0.17 | 0.60 | 0.77 |  |
| 136 | Katarina | -0.18 | 0.00 | 0.18 |  |
| 137 | Viego | -0.21 | 0.59 | 0.80 |  |
| 138 | LeBlanc | -0.21 | 0.22 | 0.43 |  |
| 139 | Leona | -0.23 | 0.40 | 0.63 |  |
| 140 | Akshan | -0.23 | 0.34 | 0.57 |  |
| 141 | Irelia | -0.25 | 0.25 | 0.50 |  |
| 142 | Rakan | -0.26 | 0.53 | 0.79 |  |
| 143 | Caitlyn | -0.28 | 0.36 | 0.64 |  |
| 144 | Lucian | -0.28 | 0.36 | 0.64 |  |
| 145 | Jarvan IV | -0.28 | 0.30 | 0.58 |  |
| 146 | Ambessa | -0.29 | 0.20 | 0.49 |  |
| 147 | Aatrox | -0.30 | 0.20 | 0.50 |  |
| 148 | Diana | -0.30 | 0.20 | 0.50 |  |
| 149 | Nautilus | -0.30 | 0.20 | 0.50 |  |
| 150 | Renekton | -0.30 | 0.20 | 0.50 |  |
| 151 | Graves | -0.31 | 0.24 | 0.55 |  |
| 152 | Gragas | -0.33 | 0.40 | 0.73 |  |
| 153 | Pyke | -0.36 | 0.40 | 0.76 |  |
| 154 | Ivern | -0.36 | 0.19 | 0.55 |  |
| 155 | Riven | -0.39 | 0.40 | 0.79 |  |
| 156 | Galio | -0.41 | 0.57 | 0.98 |  |
| 157 | Vi | -0.41 | 0.50 | 0.91 |  |
| 158 | Bel'Veth | -0.47 | 0.20 | 0.67 |  |
| 159 | Lee Sin | -0.48 | 0.20 | 0.68 |  |
| 160 | Wukong | -0.48 | 0.20 | 0.68 |  |
| 161 | Pantheon | -0.49 | 0.55 | 1.04 |  |
| 162 | Briar | -0.50 | 0.20 | 0.70 |  |
| 163 | Qiyana | -0.50 | 0.18 | 0.68 |  |
| 164 | Kha'Zix | -0.50 | 0.00 | 0.50 |  |
| 165 | Locke | -0.50 | 0.00 | 0.50 |  |
| 166 | Tryndamere | -0.50 | 0.00 | 0.50 |  |
| 167 | Ekko | -0.57 | 0.00 | 0.57 |  |
| 168 | Sylas | -0.65 | 0.20 | 0.85 |  |
| 169 | Shen | -0.66 | 0.47 | 1.13 |  |
| 170 | Talon | -0.72 | 0.00 | 0.72 |  |
| 171 | Akali | -0.73 | 0.00 | 0.73 |  |
| 172 | Naafiri | -1.13 | 0.00 | 1.13 |  |
