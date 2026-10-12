# Counters to Sett (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 47 other champions with a simulator kit against Sett: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Sett wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Sett --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Teemo | +0.85 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | +0.00 |
| 2 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.04 | – | +1.00 |
| 3 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.05 | – | +1.00 |
| 4 | Kayle | +0.82 | +1.00 | +0.84 | +0.92 | +0.50 | +1.00 | +0.00 |
| 5 | Gnar | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 6 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 7 | Aurora | +0.80 | +0.98 | +0.98 | +0.98 | +0.23 | +0.85 | +0.00 |
| 8 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 9 | Gwen | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 10 | Poppy | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 11 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 12 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 13 | Rumble | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 14 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 15 | Pantheon | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 16 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 17 | Mordekaiser | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 18 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 19 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 20 | Kled | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 21 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 22 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 23 | Aatrox | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 24 | Garen | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 25 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 26 | Udyr | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 27 | Yone | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 28 | Jayce | +0.68 | +1.00 | +1.00 | +0.52 | +0.05 | – | +0.00 |
| 29 | Renekton | +0.57 | +1.00 | +1.00 | +0.04 | +0.02 | – | +0.00 |
| 30 | Camille | +0.50 | +0.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 31 | Quinn | +0.33 | +1.00 | +1.00 | −1.00 | −0.07 | +0.45 | +0.00 |
| 32 | Malphite | +0.24 | +0.29 | +0.28 | +0.29 | +0.09 | – | +0.00 |
| 33 | Volibear | +0.23 | +1.00 | −0.90 | +1.00 | −0.11 | – | +0.00 |
| 34 | Tahm Kench | +0.09 | +0.11 | +0.07 | +0.07 | +0.11 | – | +0.00 |
| 35 | Urgot | +0.08 | +0.09 | +0.06 | +0.06 | +0.19 | −0.04 | +0.00 |
| 36 | Shen | +0.07 | +0.10 | +0.12 | +0.04 | +0.00 | – | +0.00 |
| 37 | Ornn | +0.07 | +0.09 | +0.07 | +0.08 | +0.04 | – | +0.00 |
| 38 | Irelia | +0.03 | −1.00 | +0.60 | +0.60 | +0.04 | – | +0.00 |
| 39 | Singed | +0.01 | −0.03 | +0.05 | +0.05 | −0.06 | – | +0.00 |
| 40 | Heimerdinger | −0.00 | −0.04 | −0.10 | −0.07 | +0.35 | −0.06 | +0.00 |
| 41 | Skarner | −0.02 | −0.03 | −0.01 | −0.01 | −0.07 | – | +0.00 |
| 42 | Sion | −0.06 | −0.17 | +0.00 | +0.00 | −0.05 | – | +0.00 |
| 43 | Yasuo | −0.21 | +1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 44 | Kennen | −0.61 | −1.00 | −1.00 | −1.00 | −0.07 | +0.99 | +0.00 |
| 45 | Riven | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 46 | Akali | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 47 | Ambessa | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |

## Interaction ledger (partial confidence)

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

#### 2. Morgana (net +1.46)

- **1.00** cc immunity: Black Shield makes Morgana immune to Sett's The Show Stopper (slow, suppression). Immune for 5 s, long enough to use ahead of The Show Stopper. (Morgana E Black Shield → Sett R The Show Stopper)
- **0.54** cc immunity: Black Shield makes Morgana immune to Sett's Facebreaker (airborne, slow, stun). Immune for 5 s, long enough to use ahead of Facebreaker. (Morgana E Black Shield → Sett E Facebreaker)
- **0.19** range: Morgana's basic attacks reach 325 units farther than Sett's (450 vs 125 attack range). Sett closes the gap with The Show Stopper. (Morgana basic attacks → Sett basic attacks)

#### 3. Bard (net +1.45)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Sett's The Show Stopper. Untargetable for 2.5 s, long enough to use ahead of The Show Stopper. (Bard R Tempered Fate → Sett R The Show Stopper)
- **0.36** range: Bard's basic attacks reach 375 units farther than Sett's (500 vs 125 attack range). Sett closes the gap with The Show Stopper. (Bard basic attacks → Sett basic attacks)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Sett's Facebreaker. Untargetable for 2.5 s, long enough to use ahead of Facebreaker. (Bard R Tempered Fate → Sett E Facebreaker)
- Watch out: The Show Stopper is displacement immune, ignoring Bard's Tempered Fate (stasis) during it.

#### 4. Xayah (net +1.42)

- **0.88** untargetable: Featherstorm makes Xayah untargetable, dodging Sett's The Show Stopper. Untargetable for 1.5 s, long enough to use ahead of The Show Stopper. (Xayah R Featherstorm → Sett R The Show Stopper)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Sett's (525 vs 125 attack range). Sett closes the gap with The Show Stopper. (Xayah basic attacks → Sett basic attacks)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Sett's Facebreaker. Untargetable for 1.5 s, long enough to use ahead of Facebreaker. (Xayah R Featherstorm → Sett E Facebreaker)

#### 5. Nocturne (net +1.39)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Sett's The Show Stopper. Spell shield for 1.5 s, long enough to use ahead of The Show Stopper. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sett R The Show Stopper)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Sett's Facebreaker. Spell shield for 1.5 s, long enough to use ahead of Facebreaker. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sett E Facebreaker)
- **0.07** cc immunity: Paranoia is displacement immune, ignoring Sett's Facebreaker (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Sett E Facebreaker)

#### 6. Vladimir (net +1.37)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Sett's The Show Stopper. Untargetable for 2 s, long enough to use ahead of The Show Stopper. (Vladimir W Sanguine Pool → Sett R The Show Stopper)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Sett's Facebreaker. Untargetable for 2 s, long enough to use ahead of Facebreaker. (Vladimir W Sanguine Pool → Sett E Facebreaker)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Sett's (450 vs 125 attack range). Sett closes the gap with The Show Stopper. (Vladimir basic attacks → Sett basic attacks)
- Watch out: Facebreaker's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 7. Udyr (net +1.35)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Sett's The Show Stopper (slow, suppression). Immune for 1.5 s, long enough to use ahead of The Show Stopper. (Udyr E Blazing Stampede → Sett R The Show Stopper)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Sett's Facebreaker (airborne, slow, stun). Immune for 1.5 s, long enough to use ahead of Facebreaker. (Udyr E Blazing Stampede → Sett E Facebreaker)

#### 8. Lissandra (net +1.34)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Sett's The Show Stopper. Untargetable for 2.5 s, long enough to use ahead of The Show Stopper. (Lissandra R Frozen Tomb → Sett R The Show Stopper)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Sett's Facebreaker. Untargetable for 2.5 s, long enough to use ahead of Facebreaker. (Lissandra R Frozen Tomb → Sett E Facebreaker)
- **0.22** range: Lissandra's basic attacks reach 425 units farther than Sett's (550 vs 125 attack range). Sett closes the gap with The Show Stopper. (Lissandra basic attacks → Sett basic attacks)
- Watch out: The Show Stopper is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

#### 9. Elise (net +1.18)

- **0.60** untargetable: Rappel makes Elise untargetable, dodging Sett's The Show Stopper. Untargetable for 0.6 s; The Show Stopper lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Sett R The Show Stopper)
- **0.51** untargetable: Rappel makes Elise untargetable, dodging Sett's Facebreaker. Untargetable for 0.6 s; Facebreaker takes 0.25 s to land, enough to react. (Elise E Rappel → Sett E Facebreaker)
- **0.32** range: Elise's basic attacks reach 425 units farther than Sett's (550 vs 125 attack range). Sett closes the gap with The Show Stopper. (Elise basic attacks → Sett basic attacks)

#### 10. Olaf (net +1.17)

- **1.00** cc immunity: Ragnarok makes Olaf immune to Sett's The Show Stopper (slow, suppression). Immune for 3 s, long enough to use ahead of The Show Stopper. (Olaf R Ragnarok → Sett R The Show Stopper)
- **0.33** cc immunity: Ragnarok makes Olaf immune to Sett's Facebreaker (airborne, slow, stun). Immune for 3 s, long enough to use ahead of Facebreaker. (Olaf R Ragnarok → Sett E Facebreaker)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.73 | 1.73 | 0.00 |  |
| 2 | Morgana | +1.46 | 1.46 | 0.00 |  |
| 3 | Bard | +1.45 | 1.53 | 0.08 |  |
| 4 | Xayah | +1.42 | 1.42 | 0.00 |  |
| 5 | Nocturne | +1.39 | 1.39 | 0.00 |  |
| 6 | Vladimir | +1.37 | 1.45 | 0.08 |  |
| 7 | Udyr | +1.35 | 1.35 | 0.00 |  |
| 8 | Lissandra | +1.34 | 1.39 | 0.05 |  |
| 9 | Elise | +1.18 | 1.18 | 0.00 |  |
| 10 | Olaf | +1.17 | 1.17 | 0.00 |  |
| 11 | Milio | +1.11 | 1.18 | 0.07 |  |
| 12 | Fiora | +1.04 | 1.04 | 0.00 |  |
| 13 | Gangplank | +1.03 | 1.03 | 0.00 |  |
| 14 | Rek'Sai | +1.02 | 1.18 | 0.16 |  |
| 15 | Kayle | +0.95 | 0.95 | 0.00 |  |
| 16 | Rengar | +0.94 | 1.08 | 0.14 |  |
| 17 | Sion | +0.93 | 1.18 | 0.25 |  |
| 18 | Maokai | +0.93 | 1.00 | 0.07 |  |
| 19 | Yuumi | +0.91 | 1.32 | 0.41 |  |
| 20 | Master Yi | +0.90 | 1.13 | 0.23 |  |
| 21 | Kalista | +0.90 | 1.09 | 0.19 |  |
| 22 | Gwen | +0.86 | 0.86 | 0.00 |  |
| 23 | Aurora | +0.85 | 1.00 | 0.15 |  |
| 24 | Alistar | +0.82 | 0.94 | 0.12 |  |
| 25 | Kindred | +0.79 | 0.79 | 0.00 |  |
| 26 | Ekko | +0.78 | 0.78 | 0.00 |  |
| 27 | Teemo | +0.77 | 0.85 | 0.08 | blind (Blinding Dart) |
| 28 | Cassiopeia | +0.70 | 0.70 | 0.00 | grounding (Miasma) |
| 29 | Evelynn | +0.69 | 0.77 | 0.08 |  |
| 30 | Zed | +0.69 | 0.69 | 0.00 |  |
| 31 | Singed | +0.60 | 0.67 | 0.07 | grounding (Mega Adhesive) |
| 32 | Zaahen | +0.59 | 0.77 | 0.18 |  |
| 33 | Camille | +0.59 | 0.74 | 0.15 |  |
| 34 | Lulu | +0.58 | 0.66 | 0.08 |  |
| 35 | Shaco | +0.57 | 0.77 | 0.20 |  |
| 36 | Kled | +0.55 | 0.79 | 0.24 |  |
| 37 | Pantheon | +0.53 | 0.63 | 0.10 |  |
| 38 | Aphelios | +0.52 | 0.52 | 0.00 |  |
| 39 | Garen | +0.49 | 0.49 | 0.00 |  |
| 40 | Warwick | +0.48 | 0.84 | 0.36 |  |
| 41 | Taric | +0.48 | 0.48 | 0.00 |  |
| 42 | Malzahar | +0.44 | 0.89 | 0.45 |  |
| 43 | Jax | +0.44 | 0.44 | 0.00 |  |
| 44 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 45 | Nilah | +0.41 | 0.49 | 0.08 |  |
| 46 | Sona | +0.41 | 0.41 | 0.00 |  |
| 47 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 48 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 49 | Xin Zhao | +0.34 | 0.52 | 0.18 |  |
| 50 | Heimerdinger | +0.34 | 0.34 | 0.00 |  |
| 51 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 52 | Twitch | +0.32 | 0.43 | 0.11 |  |
| 53 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 54 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 55 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 56 | Renata Glasc | +0.31 | 0.38 | 0.07 |  |
| 57 | Vex | +0.31 | 0.34 | 0.03 |  |
| 58 | Corki | +0.30 | 0.37 | 0.07 |  |
| 59 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 60 | Draven | +0.29 | 0.36 | 0.07 |  |
| 61 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 62 | Lux | +0.29 | 0.29 | 0.00 |  |
| 63 | Seraphine | +0.29 | 0.29 | 0.00 |  |
| 64 | Varus | +0.28 | 0.39 | 0.11 |  |
| 65 | Tristana | +0.28 | 0.36 | 0.08 |  |
| 66 | Viktor | +0.28 | 0.32 | 0.04 |  |
| 67 | Kai'Sa | +0.27 | 0.38 | 0.11 |  |
| 68 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 69 | Mel | +0.27 | 0.27 | 0.00 |  |
| 70 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 71 | Kayn | +0.25 | 0.77 | 0.52 |  |
| 72 | Vayne | +0.25 | 0.43 | 0.18 |  |
| 73 | Gnar | +0.25 | 0.33 | 0.08 |  |
| 74 | Zoe | +0.25 | 0.32 | 0.07 |  |
| 75 | Jinx | +0.25 | 0.29 | 0.04 |  |
| 76 | Graves | +0.24 | 0.24 | 0.00 |  |
| 77 | Jayce | +0.23 | 0.30 | 0.07 |  |
| 78 | Annie | +0.22 | 0.22 | 0.00 |  |
| 79 | Brand | +0.22 | 0.22 | 0.00 |  |
| 80 | Karma | +0.22 | 0.22 | 0.00 |  |
| 81 | Senna | +0.21 | 0.32 | 0.11 |  |
| 82 | Samira | +0.21 | 0.30 | 0.09 |  |
| 83 | Veigar | +0.20 | 0.24 | 0.04 |  |
| 84 | Orianna | +0.19 | 0.27 | 0.08 |  |
| 85 | Ahri | +0.18 | 0.22 | 0.04 |  |
| 86 | Hwei | +0.16 | 0.23 | 0.07 |  |
| 87 | Skarner | +0.16 | 0.16 | 0.00 |  |
| 88 | Syndra | +0.15 | 0.22 | 0.07 |  |
| 89 | LeBlanc | +0.14 | 0.22 | 0.08 |  |
| 90 | Swain | +0.14 | 0.21 | 0.07 |  |
| 91 | Azir | +0.11 | 0.27 | 0.16 |  |
| 92 | Quinn | +0.10 | 0.38 | 0.28 |  |
| 93 | Ziggs | +0.10 | 0.27 | 0.17 |  |
| 94 | Anivia | +0.10 | 0.24 | 0.14 |  |
| 95 | Twisted Fate | +0.08 | 0.43 | 0.35 |  |
| 96 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 97 | Lucian | +0.08 | 0.36 | 0.28 |  |
| 98 | Malphite | +0.08 | 0.28 | 0.20 |  |
| 99 | Zyra | +0.08 | 0.24 | 0.16 |  |
| 100 | Neeko | +0.07 | 0.22 | 0.15 |  |
| 101 | Hecarim | +0.07 | 0.07 | 0.00 |  |
| 102 | Illaoi | +0.07 | 0.07 | 0.00 |  |
| 103 | Shyvana | +0.07 | 0.07 | 0.00 |  |
| 104 | Volibear | +0.07 | 0.07 | 0.00 |  |
| 105 | Thresh | +0.06 | 0.19 | 0.13 |  |
| 106 | Urgot | +0.06 | 0.15 | 0.09 |  |
| 107 | Aurelion Sol | +0.05 | 0.22 | 0.17 |  |
| 108 | Irelia | +0.05 | 0.05 | 0.00 |  |
| 109 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 110 | Nami | +0.04 | 0.22 | 0.18 |  |
| 111 | Ivern | +0.04 | 0.19 | 0.15 |  |
| 112 | Lillia | +0.03 | 0.11 | 0.08 |  |
| 113 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 114 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 115 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 116 | Leona | 0.00 | 0.00 | 0.00 |  |
| 117 | Locke | 0.00 | 0.00 | 0.00 |  |
| 118 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 119 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 120 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 121 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 122 | K'Sante | -0.03 | 0.14 | 0.17 |  |
| 123 | Shen | -0.04 | 0.41 | 0.45 |  |
| 124 | Xerath | -0.05 | 0.27 | 0.32 |  |
| 125 | Amumu | -0.05 | 0.00 | 0.05 |  |
| 126 | Briar | -0.05 | 0.00 | 0.05 |  |
| 127 | Mordekaiser | -0.06 | 0.08 | 0.14 |  |
| 128 | Rakan | -0.07 | 0.13 | 0.20 |  |
| 129 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 130 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 131 | Darius | -0.07 | 0.00 | 0.07 |  |
| 132 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 133 | Akshan | -0.08 | 0.34 | 0.42 |  |
| 134 | Rammus | -0.08 | 0.32 | 0.40 |  |
| 135 | Vel'Koz | -0.08 | 0.27 | 0.35 |  |
| 136 | Braum | -0.08 | 0.00 | 0.08 |  |
| 137 | Diana | -0.08 | 0.00 | 0.08 |  |
| 138 | Fizz | -0.08 | 0.00 | 0.08 |  |
| 139 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 140 | Karthus | -0.09 | 0.19 | 0.28 |  |
| 141 | Ornn | -0.09 | 0.07 | 0.16 |  |
| 142 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 143 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 144 | Akali | -0.11 | 0.00 | 0.11 |  |
| 145 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 146 | Talon | -0.14 | 0.00 | 0.14 |  |
| 147 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 148 | Katarina | -0.16 | 0.12 | 0.28 |  |
| 149 | Aatrox | -0.17 | 0.00 | 0.17 |  |
| 150 | Yone | -0.18 | 0.07 | 0.25 |  |
| 151 | Blitzcrank | -0.18 | 0.00 | 0.18 |  |
| 152 | Nunu & Willump | -0.20 | 0.36 | 0.56 |  |
| 153 | Riven | -0.20 | 0.00 | 0.20 |  |
| 154 | Jarvan IV | -0.21 | 0.07 | 0.28 |  |
| 155 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 156 | Viego | -0.22 | 0.16 | 0.38 |  |
| 157 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 158 | Rell | -0.24 | 0.00 | 0.24 |  |
| 159 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 160 | Fiddlesticks | -0.25 | 0.20 | 0.45 |  |
| 161 | Janna | -0.27 | 0.36 | 0.63 |  |
| 162 | Wukong | -0.28 | 0.00 | 0.28 |  |
| 163 | Yasuo | -0.28 | 0.00 | 0.28 |  |
| 164 | Pyke | -0.30 | 0.00 | 0.30 |  |
| 165 | Gragas | -0.37 | 0.00 | 0.37 |  |
| 166 | Poppy | -0.40 | 0.00 | 0.40 |  |
| 167 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 168 | Galio | -0.48 | 0.00 | 0.48 |  |
| 169 | Taliyah | -0.49 | 0.27 | 0.76 |  |
| 170 | Vi | -0.56 | 0.07 | 0.63 |  |
| 171 | Zac | -0.63 | 0.00 | 0.63 |  |
| 172 | Tahm Kench | -0.66 | 0.00 | 0.66 |  |
