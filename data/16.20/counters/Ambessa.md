# Counters to Ambessa (patch 26.20)

## Simulated duels

The duel simulator played each of the 90 other champions with a simulator kit against Ambessa: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Ambessa wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Ambessa --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Ashe | +0.89 | +1.00 | +1.00 | +1.00 | +0.57 | +1.00 | +0.00 |
| 2 | Kayle | +0.86 | +1.00 | +1.00 | +1.00 | +0.43 | +1.00 | +0.00 |
| 3 | Teemo | +0.85 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | +0.00 |
| 4 | Cassiopeia | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 5 | Sivir | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 6 | Kog'Maw | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 7 | Quinn | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 8 | Varus | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 9 | Aurora | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 10 | Morgana | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 11 | Illaoi | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 12 | Vayne | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 13 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 14 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 15 | Kalista | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 16 | Poppy | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 17 | Yasuo | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 18 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 19 | Cho'Gath | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 20 | Gwen | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 21 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 22 | Fiora | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 23 | Gangplank | +0.76 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 24 | Master Yi | +0.75 | +1.00 | +1.00 | +1.00 | −0.31 | +1.00 | +0.00 |
| 25 | Nasus | +0.75 | +1.00 | +1.00 | +1.00 | −0.31 | +1.00 | +0.00 |
| 26 | Tahm Kench | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 27 | Yorick | +0.75 | +1.00 | +1.00 | +1.00 | −0.19 | – | +0.00 |
| 28 | Trundle | +0.74 | +1.00 | +1.00 | +1.00 | −0.37 | +1.00 | +0.00 |
| 29 | Dr. Mundo | +0.74 | +1.00 | +1.00 | +1.00 | −0.20 | – | +0.00 |
| 30 | Garen | +0.74 | +1.00 | +1.00 | +1.00 | −0.20 | – | +0.00 |
| 31 | Xayah | +0.74 | +1.00 | +0.50 | +1.00 | +0.45 | +1.00 | +0.00 |
| 32 | Aatrox | +0.74 | +1.00 | +1.00 | +1.00 | −0.21 | – | +0.00 |
| 33 | Mordekaiser | +0.74 | +0.98 | +0.99 | +0.96 | −0.14 | – | +0.00 |
| 34 | Renekton | +0.74 | +1.00 | +1.00 | +1.00 | −0.23 | – | +0.00 |
| 35 | Kled | +0.74 | +1.00 | +1.00 | +1.00 | −0.25 | – | +0.00 |
| 36 | Camille | +0.74 | +1.00 | +1.00 | +1.00 | −0.25 | – | +0.00 |
| 37 | Tryndamere | +0.73 | +1.00 | +1.00 | +1.00 | −0.29 | – | +0.00 |
| 38 | Volibear | +0.73 | +1.00 | +1.00 | +1.00 | −0.32 | – | +0.00 |
| 39 | Olaf | +0.72 | +1.00 | +1.00 | +1.00 | −0.50 | +1.00 | +0.00 |
| 40 | Gnar | +0.70 | +0.94 | +0.94 | +0.61 | +0.19 | +0.76 | +0.00 |
| 41 | Lux | +0.68 | +1.00 | +1.00 | +0.83 | +0.15 | −0.06 | +0.00 |
| 42 | Vel'Koz | +0.66 | +1.00 | +1.00 | +0.95 | +0.50 | −1.00 | +0.00 |
| 43 | Zaahen | +0.63 | +0.56 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 44 | Heimerdinger | +0.60 | +0.85 | +0.85 | +1.00 | +0.21 | −0.57 | +0.00 |
| 45 | Kennen | +0.59 | +1.00 | +1.00 | +1.00 | −0.12 | −0.90 | +0.00 |
| 46 | Zyra | +0.59 | +0.98 | +0.98 | +0.96 | +0.06 | −1.00 | +0.00 |
| 47 | Samira | +0.59 | +1.00 | +1.00 | +1.00 | −0.07 | −1.00 | +0.00 |
| 48 | Yone | +0.51 | +1.00 | +0.11 | +1.00 | −0.12 | – | +0.00 |
| 49 | Irelia | +0.44 | −0.23 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 50 | Jinx | +0.33 | −0.20 | +0.40 | +1.00 | +0.23 | +0.40 | +0.00 |
| 51 | Tristana | +0.32 | +0.00 | +0.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 52 | Brand | +0.28 | +1.00 | −1.00 | +0.89 | +0.02 | +0.94 | +0.00 |
| 53 | Rammus | +0.27 | +1.00 | +1.00 | −1.00 | −0.37 | – | +0.00 |
| 54 | Jayce | +0.26 | +1.00 | −1.00 | +1.00 | +0.20 | – | +0.00 |
| 55 | Anivia | +0.23 | −0.02 | +1.00 | +0.10 | −0.25 | +0.05 | +0.00 |
| 56 | Singed | +0.15 | +1.00 | −1.00 | +1.00 | −0.41 | – | +0.00 |
| 57 | Annie | +0.12 | −1.00 | +1.00 | +0.00 | +0.13 | +1.00 | +0.00 |
| 58 | Karthus | +0.01 | +0.00 | +0.00 | +0.00 | +0.06 | +0.00 | +0.00 |
| 59 | Sion | −0.02 | +0.00 | +0.00 | +0.00 | −0.15 | – | +0.00 |
| 60 | Draven | −0.03 | +0.00 | +1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 61 | Sett | −0.23 | −1.00 | +1.00 | −1.00 | −0.03 | – | +0.00 |
| 62 | Ziggs | −0.26 | −1.00 | +1.00 | −1.00 | +0.26 | −1.00 | +0.00 |
| 63 | Miss Fortune | −0.26 | −1.00 | +1.00 | −1.00 | +0.26 | −1.00 | +0.00 |
| 64 | Corki | −0.28 | −1.00 | +1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 65 | Kai'Sa | −0.33 | −1.00 | −1.00 | +1.00 | −0.17 | +0.00 | +0.00 |
| 66 | Urgot | −0.40 | −1.00 | −1.00 | +0.94 | +0.10 | −1.00 | +0.00 |
| 67 | Ezreal | −0.45 | −1.00 | −0.75 | +0.49 | −0.07 | −1.00 | +0.00 |
| 68 | Lissandra | −0.51 | −1.00 | −1.00 | −0.52 | −0.05 | +1.00 | +0.00 |
| 69 | Xin Zhao | −0.55 | −1.00 | −1.00 | +0.28 | −0.35 | – | +0.00 |
| 70 | Riven | −0.56 | −1.00 | −1.00 | +0.00 | −0.00 | – | +0.00 |
| 71 | Shen | −0.56 | −1.00 | −1.00 | +0.00 | −0.05 | – | +0.00 |
| 72 | Udyr | −0.64 | −1.00 | −1.00 | −1.00 | −0.29 | +1.00 | +0.00 |
| 73 | Jhin | −0.70 | −0.93 | −0.93 | −0.93 | +0.36 | −1.00 | +0.00 |
| 74 | Ornn | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 75 | Smolder | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 76 | Malzahar | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 77 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 78 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 79 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 80 | Lucian | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 81 | Ahri | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 82 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 83 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 84 | Twitch | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 85 | Leona | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 86 | Rumble | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 87 | Caitlyn | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 88 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 89 | Kassadin | −0.82 | −1.00 | −1.00 | −1.00 | −0.28 | – | +0.00 |
| 90 | Pantheon | −0.83 | −1.00 | −1.00 | −1.00 | −0.32 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Ambessa's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ambessa's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ambessa` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Singed (net +1.45)

- **0.49** grounding: Mega Adhesive grounds Ambessa, who then can't cast Public Execution. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Ambessa R Public Execution)
- **0.40** anti-heal: Insanity Potion's Grievous Wounds cuts Ambessa's healing from Public Execution by 40%. (Singed R Insanity Potion → Ambessa R Public Execution)
- **0.32** grounding: Mega Adhesive grounds Ambessa, who then can't cast Drakehound's Step. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Ambessa I Drakehound's Step)

#### 2. Sivir (net +1.31)

- **1.00** spell shield: Spell Shield's spell shield blocks Ambessa's Public Execution. Spell shield for 1.5 s, long enough to use ahead of Public Execution. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ambessa R Public Execution)
- **0.31** range: Sivir's basic attacks reach 375 units farther than Ambessa's (500 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Sivir basic attacks → Ambessa basic attacks)

#### 3. Xayah (net +1.26)

- **1.00** untargetable: Featherstorm makes Xayah untargetable, dodging Ambessa's Public Execution. Untargetable for 1.5 s, long enough to use ahead of Public Execution. (Xayah R Featherstorm → Ambessa R Public Execution)
- **0.26** range: Xayah's basic attacks reach 400 units farther than Ambessa's (525 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Xayah basic attacks → Ambessa basic attacks)

#### 4. Bard (net +1.24)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Ambessa's Public Execution. Untargetable for 2.5 s, long enough to use ahead of Public Execution. (Bard R Tempered Fate → Ambessa R Public Execution)
- **0.24** range: Bard's basic attacks reach 375 units farther than Ambessa's (500 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Bard basic attacks → Ambessa basic attacks)

#### 5. Lissandra (net +1.22)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ambessa's Public Execution. Untargetable for 2.5 s, long enough to use ahead of Public Execution. (Lissandra R Frozen Tomb → Ambessa R Public Execution)
- **0.15** dash stop: Frozen Tomb's knockdown can stop Ambessa's Drakehound's Step mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Ambessa I Drakehound's Step)
- **0.15** range: Lissandra's basic attacks reach 425 units farther than Ambessa's (550 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Lissandra basic attacks → Ambessa basic attacks)

#### 6. Morgana (net +1.17)

- **1.00** cc immunity: Black Shield makes Morgana immune to Ambessa's Public Execution (stun, suppression). Immune for 5 s, long enough to use ahead of Public Execution. (Morgana E Black Shield → Ambessa R Public Execution)
- **0.13** range: Morgana's basic attacks reach 325 units farther than Ambessa's (450 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Morgana basic attacks → Ambessa basic attacks)
- **0.08** cc immunity: Black Shield makes Morgana immune to Ambessa's Lacerate (slow). Immune for 5 s, long enough to use ahead of Lacerate. (Morgana E Black Shield → Ambessa E Lacerate)

#### 7. Milio (net +1.10)

- **0.69** cleanse: Breath of Life cleanses Ambessa's Public Execution (stun, suppression) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Ambessa R Public Execution)
- **0.27** tenacity: Breath of Life's 65% tenacity shortens Ambessa's Public Execution (stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Ambessa R Public Execution)
- **0.26** range: Milio's basic attacks reach 400 units farther than Ambessa's (525 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Milio basic attacks → Ambessa basic attacks)

#### 8. Vladimir (net +1.07)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ambessa's Public Execution. Untargetable for 2 s, long enough to use ahead of Public Execution. (Vladimir W Sanguine Pool → Ambessa R Public Execution)
- **0.12** range: Vladimir's basic attacks reach 325 units farther than Ambessa's (450 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Vladimir basic attacks → Ambessa basic attacks)
- Watch out: Public Execution's stun interrupts Vladimir's Tides of Blood (charge-up).

#### 9. Kled (net +1.06)

- **0.95** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Ambessa's Public Execution (stun, suppression). Immune for ?; Public Execution takes 0.7 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Ambessa R Public Execution)
- **0.09** range: Kled's basic attacks reach 125 units farther than Ambessa's (250 vs 125 attack range). Ambessa closes the gap with Drakehound's Step, Public Execution. (Kled basic attacks → Ambessa basic attacks)
- **0.03** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Ambessa's Lacerate (slow). Immune for ?; Lacerate lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kled R Chaaaaaaaarge!!! → Ambessa E Lacerate)

#### 10. Udyr (net +1.06)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Ambessa's Public Execution (stun, suppression). Immune for 1.5 s, long enough to use ahead of Public Execution. (Udyr E Blazing Stampede → Ambessa R Public Execution)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Ambessa's Lacerate (slow). Immune for 1.5 s, long enough to use ahead of Lacerate. (Udyr E Blazing Stampede → Ambessa E Lacerate)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Singed | +1.45 | 1.45 | 0.00 | grounding (Mega Adhesive) |
| 2 | Sivir | +1.31 | 1.31 | 0.00 |  |
| 3 | Xayah | +1.26 | 1.26 | 0.00 |  |
| 4 | Bard | +1.24 | 1.24 | 0.00 |  |
| 5 | Lissandra | +1.22 | 1.22 | 0.00 |  |
| 6 | Morgana | +1.17 | 1.17 | 0.00 |  |
| 7 | Milio | +1.10 | 1.10 | 0.00 |  |
| 8 | Vladimir | +1.07 | 1.12 | 0.05 |  |
| 9 | Kled | +1.06 | 1.06 | 0.00 |  |
| 10 | Udyr | +1.06 | 1.06 | 0.00 |  |
| 11 | Aurora | +1.04 | 1.19 | 0.15 |  |
| 12 | Fiora | +1.03 | 1.03 | 0.00 |  |
| 13 | Olaf | +1.02 | 1.02 | 0.00 |  |
| 14 | Zaahen | +1.01 | 1.01 | 0.00 |  |
| 15 | Camille | +1.00 | 1.00 | 0.00 |  |
| 16 | Fizz | +1.00 | 1.00 | 0.00 |  |
| 17 | Gwen | +1.00 | 1.00 | 0.00 |  |
| 18 | Maokai | +1.00 | 1.00 | 0.00 |  |
| 19 | Nocturne | +1.00 | 1.00 | 0.00 |  |
| 20 | Rek'Sai | +1.00 | 1.00 | 0.00 |  |
| 21 | Zed | +1.00 | 1.00 | 0.00 |  |
| 22 | Master Yi | +0.97 | 1.07 | 0.10 |  |
| 23 | Kalista | +0.96 | 0.96 | 0.00 |  |
| 24 | Sion | +0.95 | 1.03 | 0.08 |  |
| 25 | Evelynn | +0.92 | 1.00 | 0.08 |  |
| 26 | Gangplank | +0.84 | 0.84 | 0.00 |  |
| 27 | Yuumi | +0.83 | 1.21 | 0.38 |  |
| 28 | Alistar | +0.82 | 0.82 | 0.00 |  |
| 29 | Shaco | +0.80 | 1.00 | 0.20 |  |
| 30 | Cassiopeia | +0.79 | 0.79 | 0.00 | grounding (Miasma) |
| 31 | Kayle | +0.74 | 0.74 | 0.00 |  |
| 32 | Rengar | +0.70 | 0.84 | 0.14 |  |
| 33 | Varus | +0.66 | 0.71 | 0.05 |  |
| 34 | Kayn | +0.60 | 1.00 | 0.40 |  |
| 35 | Warwick | +0.59 | 1.09 | 0.50 |  |
| 36 | Jinx | +0.51 | 0.51 | 0.00 |  |
| 37 | Viktor | +0.50 | 0.50 | 0.00 |  |
| 38 | Xin Zhao | +0.50 | 0.50 | 0.00 |  |
| 39 | Malzahar | +0.47 | 0.82 | 0.35 |  |
| 40 | Teemo | +0.47 | 0.55 | 0.08 |  |
| 41 | Hwei | +0.47 | 0.47 | 0.00 |  |
| 42 | Lulu | +0.47 | 0.47 | 0.00 |  |
| 43 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 44 | Veigar | +0.43 | 0.43 | 0.00 |  |
| 45 | Vex | +0.43 | 0.43 | 0.00 |  |
| 46 | Garen | +0.37 | 0.37 | 0.00 |  |
| 47 | Katarina | +0.35 | 0.53 | 0.18 |  |
| 48 | Aphelios | +0.31 | 0.31 | 0.00 |  |
| 49 | Kindred | +0.31 | 0.31 | 0.00 |  |
| 50 | Nilah | +0.31 | 0.31 | 0.00 |  |
| 51 | Poppy | +0.29 | 0.49 | 0.20 |  |
| 52 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 53 | Jax | +0.27 | 0.27 | 0.00 |  |
| 54 | Sona | +0.27 | 0.27 | 0.00 |  |
| 55 | Renata Glasc | +0.26 | 0.26 | 0.00 |  |
| 56 | Nasus | +0.25 | 0.25 | 0.00 |  |
| 57 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 58 | Draven | +0.24 | 0.24 | 0.00 |  |
| 59 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 60 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 61 | Corki | +0.22 | 0.22 | 0.00 |  |
| 62 | Elise | +0.22 | 0.22 | 0.00 |  |
| 63 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 64 | Gnar | +0.22 | 0.22 | 0.00 |  |
| 65 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 66 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 67 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 68 | Jayce | +0.20 | 0.20 | 0.00 |  |
| 69 | Nidalee | +0.20 | 0.20 | 0.00 |  |
| 70 | Samira | +0.20 | 0.20 | 0.00 |  |
| 71 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 72 | Lux | +0.19 | 0.19 | 0.00 |  |
| 73 | Seraphine | +0.19 | 0.19 | 0.00 |  |
| 74 | Twitch | +0.18 | 0.29 | 0.11 |  |
| 75 | Azir | +0.18 | 0.18 | 0.00 |  |
| 76 | Heimerdinger | +0.18 | 0.18 | 0.00 |  |
| 77 | Kog'Maw | +0.18 | 0.18 | 0.00 |  |
| 78 | Mel | +0.18 | 0.18 | 0.00 |  |
| 79 | Orianna | +0.18 | 0.18 | 0.00 |  |
| 80 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 81 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 82 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 83 | Graves | +0.16 | 0.16 | 0.00 |  |
| 84 | Malphite | +0.16 | 0.16 | 0.00 |  |
| 85 | Zyra | +0.16 | 0.16 | 0.00 |  |
| 86 | Vayne | +0.15 | 0.29 | 0.14 |  |
| 87 | Kai'Sa | +0.15 | 0.26 | 0.11 |  |
| 88 | Amumu | +0.15 | 0.15 | 0.00 |  |
| 89 | Annie | +0.15 | 0.15 | 0.00 |  |
| 90 | Brand | +0.15 | 0.15 | 0.00 |  |
| 91 | Karma | +0.15 | 0.15 | 0.00 |  |
| 92 | Nami | +0.15 | 0.15 | 0.00 |  |
| 93 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 94 | Yone | +0.15 | 0.15 | 0.00 |  |
| 95 | Swain | +0.14 | 0.14 | 0.00 |  |
| 96 | Thresh | +0.13 | 0.13 | 0.00 |  |
| 97 | Quinn | +0.12 | 0.26 | 0.14 |  |
| 98 | Senna | +0.11 | 0.22 | 0.11 |  |
| 99 | Rammus | +0.10 | 0.25 | 0.15 |  |
| 100 | Urgot | +0.10 | 0.10 | 0.00 |  |
| 101 | Zac | +0.09 | 0.32 | 0.23 |  |
| 102 | Aurelion Sol | +0.09 | 0.15 | 0.06 |  |
| 103 | Rakan | +0.08 | 0.08 | 0.00 |  |
| 104 | LeBlanc | +0.07 | 0.15 | 0.08 |  |
| 105 | Lillia | +0.07 | 0.07 | 0.00 |  |
| 106 | Ivern | +0.06 | 0.13 | 0.07 |  |
| 107 | Mordekaiser | +0.06 | 0.06 | 0.00 |  |
| 108 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 109 | Neeko | +0.04 | 0.15 | 0.11 |  |
| 110 | Irelia | +0.03 | 0.03 | 0.00 |  |
| 111 | Pantheon | +0.02 | 0.50 | 0.48 |  |
| 112 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 113 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 114 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 115 | Braum | 0.00 | 0.00 | 0.00 |  |
| 116 | Briar | 0.00 | 0.00 | 0.00 |  |
| 117 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 118 | Darius | 0.00 | 0.00 | 0.00 |  |
| 119 | Diana | 0.00 | 0.00 | 0.00 |  |
| 120 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 121 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 122 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 123 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 124 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 125 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 126 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 127 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 128 | Leona | 0.00 | 0.00 | 0.00 |  |
| 129 | Locke | 0.00 | 0.00 | 0.00 |  |
| 130 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 131 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 132 | Rell | 0.00 | 0.00 | 0.00 |  |
| 133 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 134 | Riven | 0.00 | 0.00 | 0.00 |  |
| 135 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 136 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 137 | Sett | 0.00 | 0.00 | 0.00 |  |
| 138 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 139 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 140 | Taric | 0.00 | 0.00 | 0.00 |  |
| 141 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 142 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 143 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 144 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 145 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 146 | Caitlyn | -0.02 | 0.24 | 0.26 |  |
| 147 | Lucian | -0.02 | 0.24 | 0.26 |  |
| 148 | Twisted Fate | -0.06 | 0.29 | 0.35 |  |
| 149 | Miss Fortune | -0.06 | 0.22 | 0.28 |  |
| 150 | Vel'Koz | -0.06 | 0.18 | 0.24 |  |
| 151 | Akshan | -0.08 | 0.22 | 0.30 |  |
| 152 | Jhin | -0.08 | 0.18 | 0.26 |  |
| 153 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 154 | Viego | -0.11 | 0.06 | 0.17 |  |
| 155 | Akali | -0.11 | 0.00 | 0.11 |  |
| 156 | Xerath | -0.13 | 0.18 | 0.31 |  |
| 157 | Talon | -0.14 | 0.00 | 0.14 |  |
| 158 | Karthus | -0.15 | 0.13 | 0.28 |  |
| 159 | Pyke | -0.15 | 0.00 | 0.15 |  |
| 160 | Janna | -0.16 | 0.24 | 0.40 |  |
| 161 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 162 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 163 | Shen | -0.20 | 0.25 | 0.45 |  |
| 164 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 165 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 166 | Nunu & Willump | -0.22 | 0.13 | 0.35 |  |
| 167 | Vi | -0.22 | 0.00 | 0.22 |  |
| 168 | Fiddlesticks | -0.23 | 0.13 | 0.36 |  |
| 169 | Tahm Kench | -0.25 | 0.00 | 0.25 |  |
| 170 | Taliyah | -0.30 | 0.18 | 0.48 |  |
| 171 | Naafiri | -0.40 | 0.00 | 0.40 |  |
| 172 | Galio | -0.54 | 0.00 | 0.54 |  |
