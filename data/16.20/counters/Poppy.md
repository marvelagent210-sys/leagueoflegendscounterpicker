# Counters to Poppy (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 47 other champions with a simulator kit against Poppy: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Poppy wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Poppy --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 2 | K'Sante | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 3 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 4 | Yorick | +0.76 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 5 | Fiora | +0.74 | +1.00 | +1.00 | +1.00 | −0.38 | – | +0.49 |
| 6 | Zaahen | +0.73 | +1.00 | +1.00 | +1.00 | −0.26 | – | +0.00 |
| 7 | Trundle | +0.73 | +1.00 | +1.00 | +1.00 | −0.27 | – | +0.00 |
| 8 | Volibear | +0.71 | +1.00 | +0.89 | +1.00 | −0.21 | – | +0.00 |
| 9 | Teemo | +0.30 | −1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 10 | Dr. Mundo | +0.16 | +0.21 | +0.25 | +0.25 | −0.15 | – | +0.00 |
| 11 | Malphite | −0.01 | −0.03 | +0.01 | −0.02 | +0.02 | – | +0.00 |
| 12 | Nasus | −0.02 | +0.01 | +0.00 | −0.04 | −0.11 | – | +0.00 |
| 13 | Tahm Kench | −0.12 | −0.14 | −0.11 | −0.10 | −0.17 | – | +0.00 |
| 14 | Shen | −0.16 | −0.19 | −0.25 | −0.11 | −0.07 | – | +0.00 |
| 15 | Illaoi | −0.17 | +1.00 | −1.00 | −0.70 | −0.08 | – | +0.00 |
| 16 | Udyr | −0.24 | +0.01 | +0.03 | −1.00 | −0.17 | – | +0.00 |
| 17 | Cho'Gath | −0.25 | +1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 18 | Ornn | −0.25 | −0.31 | −0.30 | −0.31 | −0.10 | – | +0.00 |
| 19 | Ambessa | −0.35 | −1.00 | −1.00 | +1.00 | −0.08 | – | +0.00 |
| 20 | Gnar | −0.73 | −1.00 | −1.00 | −1.00 | −0.06 | −0.17 | +0.00 |
| 21 | Heimerdinger | −0.76 | −1.00 | −1.00 | −0.80 | −0.01 | −1.00 | +0.00 |
| 22 | Kayle | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 23 | Sett | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 24 | Jayce | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 25 | Yone | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 26 | Irelia | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 27 | Yasuo | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 28 | Garen | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 29 | Aatrox | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 30 | Mordekaiser | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 31 | Rumble | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 32 | Skarner | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 33 | Renekton | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 34 | Quinn | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 35 | Aurora | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 36 | Singed | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 37 | Jax | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.00 |
| 38 | Sion | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.00 |
| 39 | Urgot | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 40 | Pantheon | −0.82 | −1.00 | −1.00 | −1.00 | −0.25 | – | +0.00 |
| 41 | Kled | −0.82 | −1.00 | −1.00 | −1.00 | −0.26 | – | +0.00 |
| 42 | Akali | −0.82 | −1.00 | −1.00 | −1.00 | −0.26 | – | +0.00 |
| 43 | Riven | −0.83 | −1.00 | −1.00 | −1.00 | −0.28 | – | +0.00 |
| 44 | Tryndamere | −0.83 | −1.00 | −1.00 | −1.00 | −0.29 | – | +0.00 |
| 45 | Camille | −0.83 | −1.00 | −1.00 | −1.00 | −0.30 | – | +0.00 |
| 46 | Gwen | −0.83 | −1.00 | −1.00 | −1.00 | −0.31 | – | +0.00 |
| 47 | Kennen | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |

## Interaction ledger (partial confidence)

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

#### 6. Warwick (net +1.28)

- **0.80** cc immunity: Infinite Duress makes Warwick immune to Poppy's Keeper's Verdict (airborne). Immune for ?; Keeper's Verdict takes 0.45 s to land, enough to react. (Warwick R Infinite Duress → Poppy R Keeper's Verdict)
- **0.39** cc immunity: Infinite Duress makes Warwick immune to Poppy's Heroic Charge (airborne, stun). Immune for ?; Heroic Charge takes 0.26 s to land, enough to react. (Warwick R Infinite Duress → Poppy E Heroic Charge)
- **0.20** interrupt: Primal Howl's fear interrupts Poppy's Keeper's Verdict (charge-up). Primal Howl must land during the charge-up. Poppy can release Keeper's Verdict early instead of charging it fully. (Warwick E Primal Howl → Poppy R Keeper's Verdict)
- Watch out: Keeper's Verdict's airborne interrupts Warwick's Jaws of the Beast (movement channel).

#### 7. Lissandra (net +1.28)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Poppy's Keeper's Verdict. Untargetable for 2.5 s, long enough to use ahead of Keeper's Verdict. (Lissandra R Frozen Tomb → Poppy R Keeper's Verdict)
- **0.38** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Poppy's Heroic Charge. Untargetable for 2.5 s, long enough to use ahead of Heroic Charge. (Lissandra R Frozen Tomb → Poppy E Heroic Charge)
- **0.22** range: Lissandra's basic attacks reach 425 units farther than Poppy's (550 vs 125 attack range). Poppy closes the gap with Heroic Charge. (Lissandra basic attacks → Poppy basic attacks)

#### 8. Udyr (net +1.26)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Poppy's Heroic Charge (airborne, stun). Immune for 1.5 s, long enough to use ahead of Heroic Charge. (Udyr E Blazing Stampede → Poppy E Heroic Charge)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Poppy's Keeper's Verdict (airborne). Immune for 1.5 s, long enough to use ahead of Keeper's Verdict. (Udyr E Blazing Stampede → Poppy R Keeper's Verdict)
- **0.20** interrupt: Blazing Stampede's stun interrupts Poppy's Keeper's Verdict (charge-up). Blazing Stampede must land during the charge-up. Poppy can release Keeper's Verdict early instead of charging it fully. (Udyr E Blazing Stampede → Poppy R Keeper's Verdict)

#### 9. Vladimir (net +1.24)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Poppy's Keeper's Verdict. Untargetable for 2 s, long enough to use ahead of Keeper's Verdict. (Vladimir W Sanguine Pool → Poppy R Keeper's Verdict)
- **0.62** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Poppy's Heroic Charge. Untargetable for 2 s, long enough to use ahead of Heroic Charge. (Vladimir W Sanguine Pool → Poppy E Heroic Charge)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Poppy's (450 vs 125 attack range). Poppy closes the gap with Heroic Charge. (Vladimir basic attacks → Poppy basic attacks)
- Watch out: Keeper's Verdict's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 10. Elise (net +1.21)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Poppy's Keeper's Verdict. Untargetable for 0.6 s; Keeper's Verdict takes 0.45 s to land, enough to react. (Elise E Rappel → Poppy R Keeper's Verdict)
- **0.59** untargetable: Rappel makes Elise untargetable, dodging Poppy's Heroic Charge. Untargetable for 0.6 s; Heroic Charge takes 0.26 s to land, enough to react. (Elise E Rappel → Poppy E Heroic Charge)
- **0.32** range: Elise's basic attacks reach 425 units farther than Poppy's (550 vs 125 attack range). Poppy closes the gap with Heroic Charge. (Elise basic attacks → Poppy basic attacks)
- Watch out: Steadfast Presence stops Elise's Venomous Bite dash.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.57 | 1.57 | 0.00 |  |
| 2 | Nocturne | +1.56 | 1.56 | 0.00 |  |
| 3 | Maokai | +1.40 | 1.40 | 0.00 |  |
| 4 | Xayah | +1.37 | 1.37 | 0.00 |  |
| 5 | Morgana | +1.32 | 1.32 | 0.00 |  |
| 6 | Warwick | +1.28 | 1.45 | 0.17 |  |
| 7 | Lissandra | +1.28 | 1.28 | 0.00 |  |
| 8 | Udyr | +1.26 | 1.26 | 0.00 |  |
| 9 | Vladimir | +1.24 | 1.29 | 0.05 |  |
| 10 | Elise | +1.21 | 1.62 | 0.41 |  |
| 11 | Shaco | +1.19 | 1.19 | 0.00 |  |
| 12 | Yuumi | +1.14 | 1.52 | 0.38 |  |
| 13 | Sion | +1.13 | 1.21 | 0.08 |  |
| 14 | Master Yi | +1.08 | 1.18 | 0.10 |  |
| 15 | Mel | +1.07 | 1.07 | 0.00 | projectile block (Rebuttal) |
| 16 | Bard | +1.06 | 1.40 | 0.34 |  |
| 17 | Milio | +1.00 | 1.00 | 0.00 |  |
| 18 | Olaf | +1.00 | 1.00 | 0.00 |  |
| 19 | Zed | +0.99 | 0.99 | 0.00 |  |
| 20 | Gangplank | +0.92 | 0.92 | 0.00 |  |
| 21 | Vex | +0.88 | 0.88 | 0.00 |  |
| 22 | Malzahar | +0.87 | 1.22 | 0.35 |  |
| 23 | Kayle | +0.86 | 0.86 | 0.00 |  |
| 24 | Viktor | +0.86 | 0.86 | 0.00 |  |
| 25 | Aurora | +0.83 | 1.33 | 0.50 |  |
| 26 | Kalista | +0.82 | 1.10 | 0.28 |  |
| 27 | Lulu | +0.81 | 0.81 | 0.00 |  |
| 28 | Cassiopeia | +0.80 | 0.80 | 0.00 |  |
| 29 | Fiora | +0.77 | 1.27 | 0.50 |  |
| 30 | Hwei | +0.73 | 0.73 | 0.00 | dash stop (Grim Visage) |
| 31 | Jinx | +0.69 | 0.69 | 0.00 | dash stop (Flame Chompers!) |
| 32 | Teemo | +0.69 | 0.69 | 0.00 |  |
| 33 | Rek'Sai | +0.67 | 1.24 | 0.57 |  |
| 34 | Veigar | +0.67 | 0.67 | 0.00 |  |
| 35 | Samira | +0.65 | 1.10 | 0.45 | projectile block (Blade Whirl) |
| 36 | Taric | +0.65 | 0.65 | 0.00 |  |
| 37 | Zaahen | +0.63 | 1.20 | 0.57 |  |
| 38 | Evelynn | +0.62 | 1.19 | 0.57 |  |
| 39 | Rengar | +0.62 | 0.98 | 0.36 |  |
| 40 | Sona | +0.61 | 0.61 | 0.00 |  |
| 41 | Kled | +0.60 | 1.29 | 0.69 |  |
| 42 | Gwen | +0.60 | 1.10 | 0.50 |  |
| 43 | Singed | +0.59 | 0.59 | 0.00 |  |
| 44 | Renata Glasc | +0.58 | 0.58 | 0.00 |  |
| 45 | Ashe | +0.56 | 0.56 | 0.00 |  |
| 46 | Draven | +0.56 | 0.56 | 0.00 |  |
| 47 | Kindred | +0.54 | 0.92 | 0.38 |  |
| 48 | Zilean | +0.52 | 0.52 | 0.00 |  |
| 49 | Zoe | +0.52 | 0.52 | 0.00 |  |
| 50 | Alistar | +0.50 | 1.00 | 0.50 |  |
| 51 | Braum | +0.50 | 1.00 | 0.50 | projectile block (Unbreakable) |
| 52 | Kennen | +0.49 | 0.49 | 0.00 |  |
| 53 | Seraphine | +0.49 | 0.49 | 0.00 |  |
| 54 | Malphite | +0.48 | 0.48 | 0.00 |  |
| 55 | Garen | +0.47 | 0.47 | 0.00 |  |
| 56 | Orianna | +0.47 | 0.47 | 0.00 |  |
| 57 | Soraka | +0.47 | 0.47 | 0.00 |  |
| 58 | Camille | +0.46 | 1.24 | 0.78 |  |
| 59 | Heimerdinger | +0.46 | 0.46 | 0.00 |  |
| 60 | Ekko | +0.44 | 1.01 | 0.57 |  |
| 61 | Anivia | +0.44 | 0.44 | 0.00 |  |
| 62 | Aphelios | +0.44 | 0.44 | 0.00 |  |
| 63 | Zyra | +0.44 | 0.44 | 0.00 |  |
| 64 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 65 | Annie | +0.42 | 0.42 | 0.00 |  |
| 66 | Brand | +0.42 | 0.42 | 0.00 |  |
| 67 | Nami | +0.42 | 0.42 | 0.00 |  |
| 68 | Neeko | +0.42 | 0.42 | 0.00 |  |
| 69 | Syndra | +0.42 | 0.42 | 0.00 |  |
| 70 | Swain | +0.41 | 0.41 | 0.00 |  |
| 71 | Sett | +0.40 | 0.40 | 0.00 |  |
| 72 | Yasuo | +0.37 | 1.00 | 0.63 | projectile block (Wind Wall) |
| 73 | Rammus | +0.32 | 0.47 | 0.15 |  |
| 74 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 75 | Senna | +0.32 | 0.32 | 0.00 |  |
| 76 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 77 | Shyvana | +0.30 | 0.30 | 0.00 |  |
| 78 | Lux | +0.29 | 0.29 | 0.00 |  |
| 79 | Twisted Fate | +0.28 | 0.63 | 0.35 |  |
| 80 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 81 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 82 | Skarner | +0.27 | 0.27 | 0.00 |  |
| 83 | Mordekaiser | +0.26 | 0.26 | 0.00 |  |
| 84 | Ahri | +0.24 | 0.68 | 0.44 |  |
| 85 | Vel'Koz | +0.23 | 0.47 | 0.24 |  |
| 86 | Kayn | +0.22 | 1.19 | 0.97 |  |
| 87 | Corki | +0.22 | 0.60 | 0.38 |  |
| 88 | Varus | +0.22 | 0.27 | 0.05 |  |
| 89 | Karma | +0.22 | 0.22 | 0.00 |  |
| 90 | Blitzcrank | +0.20 | 0.20 | 0.00 |  |
| 91 | Cho'Gath | +0.20 | 0.20 | 0.00 |  |
| 92 | Darius | +0.20 | 0.20 | 0.00 |  |
| 93 | Kassadin | +0.20 | 0.20 | 0.00 |  |
| 94 | Trundle | +0.20 | 0.20 | 0.00 |  |
| 95 | Yorick | +0.20 | 0.20 | 0.00 |  |
| 96 | Xin Zhao | +0.19 | 0.69 | 0.50 |  |
| 97 | Vayne | +0.19 | 0.63 | 0.44 |  |
| 98 | Tristana | +0.18 | 0.56 | 0.38 |  |
| 99 | Janna | +0.16 | 0.56 | 0.40 |  |
| 100 | Xerath | +0.16 | 0.47 | 0.31 |  |
| 101 | Jayce | +0.12 | 0.50 | 0.38 |  |
| 102 | Nilah | +0.08 | 0.58 | 0.50 |  |
| 103 | Azir | +0.06 | 0.47 | 0.41 |  |
| 104 | Zeri | +0.06 | 0.44 | 0.38 |  |
| 105 | Fiddlesticks | +0.04 | 0.40 | 0.36 |  |
| 106 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 107 | Volibear | +0.03 | 0.40 | 0.37 |  |
| 108 | Gnar | +0.02 | 0.53 | 0.51 |  |
| 109 | K'Sante | +0.01 | 0.60 | 0.59 |  |
| 110 | Jhin | +0.01 | 0.27 | 0.26 |  |
| 111 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 112 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 113 | Ziggs | -0.02 | 0.47 | 0.49 |  |
| 114 | Aurelion Sol | -0.02 | 0.42 | 0.44 |  |
| 115 | Yunara | -0.02 | 0.36 | 0.38 |  |
| 116 | Tahm Kench | -0.05 | 0.20 | 0.25 |  |
| 117 | Kai'Sa | -0.06 | 0.38 | 0.44 |  |
| 118 | Pantheon | -0.07 | 0.55 | 0.62 |  |
| 119 | Hecarim | -0.07 | 0.31 | 0.38 |  |
| 120 | Lillia | -0.08 | 0.30 | 0.38 |  |
| 121 | Nidalee | -0.08 | 0.30 | 0.38 |  |
| 122 | Nunu & Willump | -0.08 | 0.27 | 0.35 |  |
| 123 | Illaoi | -0.09 | 0.20 | 0.29 |  |
| 124 | Karthus | -0.09 | 0.19 | 0.28 |  |
| 125 | Yone | -0.10 | 0.59 | 0.69 |  |
| 126 | Quinn | -0.10 | 0.58 | 0.68 |  |
| 127 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 128 | Jax | -0.12 | 0.38 | 0.50 |  |
| 129 | Thresh | -0.14 | 0.39 | 0.53 |  |
| 130 | Katarina | -0.18 | 0.00 | 0.18 |  |
| 131 | Urgot | -0.19 | 0.35 | 0.54 |  |
| 132 | LeBlanc | -0.21 | 0.22 | 0.43 |  |
| 133 | Akshan | -0.23 | 0.34 | 0.57 |  |
| 134 | Amumu | -0.25 | 0.38 | 0.63 |  |
| 135 | Irelia | -0.25 | 0.25 | 0.50 |  |
| 136 | Zac | -0.26 | 0.60 | 0.86 | dash stop (Stretching Strikes) |
| 137 | Caitlyn | -0.28 | 0.36 | 0.64 |  |
| 138 | Lucian | -0.28 | 0.36 | 0.64 |  |
| 139 | Jarvan IV | -0.28 | 0.30 | 0.58 |  |
| 140 | Ambessa | -0.29 | 0.20 | 0.49 |  |
| 141 | Aatrox | -0.30 | 0.20 | 0.50 |  |
| 142 | Diana | -0.30 | 0.20 | 0.50 |  |
| 143 | Nautilus | -0.30 | 0.20 | 0.50 |  |
| 144 | Renekton | -0.30 | 0.20 | 0.50 |  |
| 145 | Graves | -0.31 | 0.24 | 0.55 |  |
| 146 | Galio | -0.32 | 0.20 | 0.52 |  |
| 147 | Ivern | -0.36 | 0.19 | 0.55 |  |
| 148 | Ornn | -0.37 | 0.40 | 0.77 |  |
| 149 | Viego | -0.41 | 0.39 | 0.80 |  |
| 150 | Leona | -0.43 | 0.20 | 0.63 |  |
| 151 | Sejuani | -0.43 | 0.20 | 0.63 |  |
| 152 | Rakan | -0.46 | 0.33 | 0.79 |  |
| 153 | Bel'Veth | -0.47 | 0.20 | 0.67 |  |
| 154 | Lee Sin | -0.48 | 0.20 | 0.68 |  |
| 155 | Wukong | -0.48 | 0.20 | 0.68 |  |
| 156 | Fizz | -0.49 | 0.20 | 0.69 |  |
| 157 | Rell | -0.49 | 0.20 | 0.69 |  |
| 158 | Briar | -0.50 | 0.20 | 0.70 |  |
| 159 | Qiyana | -0.50 | 0.18 | 0.68 |  |
| 160 | Kha'Zix | -0.50 | 0.00 | 0.50 |  |
| 161 | Locke | -0.50 | 0.00 | 0.50 |  |
| 162 | Tryndamere | -0.50 | 0.00 | 0.50 |  |
| 163 | Vi | -0.51 | 0.40 | 0.91 |  |
| 164 | Gragas | -0.53 | 0.20 | 0.73 |  |
| 165 | Taliyah | -0.55 | 0.47 | 1.02 |  |
| 166 | Pyke | -0.56 | 0.20 | 0.76 |  |
| 167 | Riven | -0.59 | 0.20 | 0.79 |  |
| 168 | Sylas | -0.65 | 0.20 | 0.85 |  |
| 169 | Shen | -0.66 | 0.47 | 1.13 |  |
| 170 | Talon | -0.72 | 0.00 | 0.72 |  |
| 171 | Akali | -0.73 | 0.00 | 0.73 |  |
| 172 | Naafiri | -1.13 | 0.00 | 1.13 |  |
