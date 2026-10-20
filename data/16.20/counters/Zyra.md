# Counters to Zyra (patch 26.20)

## Simulated duels

The duel simulator played each of the 94 other champions with a simulator kit against Zyra: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Zyra wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Zyra --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.87 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +1.00 |
| 2 | Master Yi | +0.84 | +1.00 | +1.00 | +0.99 | −0.03 | +1.00 | +1.00 |
| 3 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +1.00 |
| 4 | Ziggs | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 5 | Irelia | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 6 | Pantheon | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 7 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 8 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 9 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 10 | Tristana | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 11 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 12 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 13 | Camille | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 14 | Miss Fortune | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 15 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 16 | Wukong | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 17 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 18 | Jhin | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 19 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 20 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 21 | Smolder | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 22 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 23 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 24 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 25 | Rumble | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 26 | Warwick | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 27 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.06 |
| 28 | Varus | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 29 | Xayah | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 30 | Aurora | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 31 | Twitch | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 32 | Draven | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 33 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 34 | Lucian | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 35 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 36 | Kalista | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 37 | Kennen | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 38 | Sivir | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 39 | Corki | +0.75 | +1.00 | +1.00 | +1.00 | −0.00 | +0.50 | +0.00 |
| 40 | Xin Zhao | +0.74 | +1.00 | +0.89 | +1.00 | −0.03 | +0.71 | +0.00 |
| 41 | Quinn | +0.73 | +0.96 | +0.92 | +1.00 | −0.08 | – | +0.00 |
| 42 | Gangplank | +0.72 | +1.00 | +1.00 | +1.00 | +0.05 | +0.14 | +0.03 |
| 43 | Garen | +0.71 | +1.00 | +1.00 | +1.00 | −0.02 | +0.18 | +0.00 |
| 44 | Gnar | +0.71 | +1.00 | +1.00 | +1.00 | −0.03 | +0.19 | +0.00 |
| 45 | Gragas | +0.70 | +0.65 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 46 | Samira | +0.70 | +0.74 | +0.99 | +1.00 | −0.02 | – | +0.00 |
| 47 | Volibear | +0.65 | +0.75 | +0.76 | +0.93 | −0.08 | +0.97 | +0.00 |
| 48 | Rammus | +0.62 | +1.00 | +1.00 | +0.10 | −0.03 | +1.00 | +0.00 |
| 49 | Sion | +0.61 | +0.88 | +0.97 | +0.64 | −0.04 | +0.23 | +0.00 |
| 50 | Jinx | +0.57 | +0.26 | +1.00 | +0.75 | +0.03 | +1.00 | +0.00 |
| 51 | Darius | +0.56 | +1.00 | +0.96 | −0.07 | −0.11 | +1.00 | +0.00 |
| 52 | Olaf | +0.54 | +0.50 | +0.51 | +1.00 | −0.05 | +1.00 | +0.00 |
| 53 | Teemo | +0.54 | +1.00 | +0.14 | +1.00 | +0.00 | – | +0.00 |
| 54 | Ezreal | +0.54 | +0.32 | +0.93 | +0.99 | −0.01 | +0.27 | +0.00 |
| 55 | Mordekaiser | +0.47 | +0.56 | +0.74 | +0.45 | −0.04 | +0.64 | +0.00 |
| 56 | Singed | +0.46 | +1.00 | +0.06 | +1.00 | −0.11 | +0.08 | +0.00 |
| 57 | Ashe | +0.41 | +1.00 | +1.00 | −1.00 | +0.08 | +1.00 | +0.00 |
| 58 | Poppy | +0.40 | +0.23 | +0.23 | +1.00 | −0.08 | +1.00 | +0.00 |
| 59 | Gwen | +0.39 | −0.03 | +0.46 | +1.00 | −0.14 | +1.00 | +0.00 |
| 60 | Riven | +0.35 | −0.80 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 61 | Vel'Koz | +0.35 | +1.00 | +0.12 | +0.00 | +0.21 | – | +0.00 |
| 62 | Kai'Sa | +0.32 | +1.00 | +1.00 | −1.00 | −0.08 | – | +0.00 |
| 63 | Malzahar | +0.30 | +1.00 | +0.09 | −0.02 | −0.02 | – | +0.00 |
| 64 | Hecarim | +0.29 | +1.00 | +1.00 | −1.00 | −0.08 | +0.03 | +0.00 |
| 65 | Caitlyn | +0.28 | +1.00 | +1.00 | −1.00 | +0.08 | −0.28 | +0.00 |
| 66 | Yone | +0.26 | +0.68 | +0.42 | −0.55 | −0.02 | +1.00 | +0.00 |
| 67 | Amumu | +0.26 | +0.34 | +0.36 | +0.10 | +0.00 | +0.63 | +0.00 |
| 68 | Annie | +0.22 | −0.06 | +0.03 | +1.00 | +0.01 | – | +0.00 |
| 69 | Brand | +0.19 | −0.02 | −0.08 | +1.00 | −0.05 | – | +0.00 |
| 70 | Renekton | +0.19 | +0.24 | +0.19 | +0.22 | +0.01 | +0.32 | +0.00 |
| 71 | Zaahen | +0.15 | −0.47 | −0.24 | +1.00 | +0.18 | +1.00 | +0.00 |
| 72 | Nautilus | +0.14 | +0.17 | +0.20 | +0.01 | +0.04 | +0.41 | +0.00 |
| 73 | Aatrox | +0.14 | −1.00 | +0.87 | +1.00 | −0.16 | −0.06 | +0.00 |
| 74 | Anivia | +0.13 | +0.32 | +0.19 | +0.06 | −0.10 | +0.06 | +0.00 |
| 75 | Skarner | +0.10 | +0.02 | +0.02 | +0.50 | −0.11 | +0.10 | +0.00 |
| 76 | Tahm Kench | +0.09 | +0.07 | +0.08 | +0.19 | +0.01 | +0.18 | +0.00 |
| 77 | Leona | +0.07 | +0.07 | +0.15 | +0.05 | +0.00 | +0.07 | +0.00 |
| 78 | Akali | +0.07 | +0.48 | −0.18 | +0.03 | −0.05 | −0.04 | +0.00 |
| 79 | Malphite | +0.02 | +0.04 | +0.03 | −0.03 | +0.05 | +0.01 | +0.00 |
| 80 | Karthus | +0.02 | +0.03 | +0.02 | −0.04 | +0.05 | +0.05 | +0.00 |
| 81 | Ornn | +0.01 | +0.05 | −0.00 | +0.00 | −0.04 | −0.03 | +0.00 |
| 82 | Shen | +0.00 | −0.03 | −0.01 | +0.02 | +0.07 | −0.02 | +0.00 |
| 83 | Morgana | −0.01 | −0.02 | −0.21 | +0.23 | −0.08 | +0.16 | +0.00 |
| 84 | Urgot | −0.02 | −0.07 | −0.06 | +0.04 | +0.06 | −0.02 | +0.00 |
| 85 | Sett | −0.04 | −0.09 | −0.12 | +0.09 | −0.06 | +0.04 | +0.00 |
| 86 | Illaoi | −0.05 | −0.15 | −0.11 | +0.03 | −0.02 | +0.11 | +0.00 |
| 87 | Lux | −0.06 | −1.00 | −0.05 | +1.00 | +0.04 | – | +0.00 |
| 88 | Cho'Gath | −0.11 | −0.12 | −0.13 | −0.15 | −0.04 | −0.11 | +0.00 |
| 89 | Vladimir | −0.19 | −0.30 | −0.33 | −0.01 | −0.13 | −0.15 | +0.00 |
| 90 | Lissandra | −0.23 | −0.06 | −0.02 | −1.00 | +0.02 | −0.14 | +0.00 |
| 91 | Veigar | −0.25 | −0.01 | −0.08 | −1.00 | −0.03 | – | +0.00 |
| 92 | Cassiopeia | −0.31 | −1.00 | −0.91 | +1.00 | −0.02 | – | +0.00 |
| 93 | Ahri | −0.42 | −0.34 | −0.36 | −1.00 | −0.04 | – | +0.00 |
| 94 | Ambessa | −0.59 | −0.98 | −0.98 | −0.96 | −0.06 | +1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Zyra's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zyra's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zyra` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +1.05)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Zyra's Stranglethorns. Spell shield for 1.5 s, long enough to use ahead of Stranglethorns. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Zyra R Stranglethorns)
- **0.66** spell shield: Shroud of Darkness's spell shield blocks Zyra's Grasping Roots. Spell shield for 1.5 s, long enough to use ahead of Grasping Roots. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Zyra E Grasping Roots)
- **0.16** cc immunity: Paranoia is displacement immune, ignoring Zyra's Stranglethorns (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Zyra R Stranglethorns)
- Watch out: Zyra's basic attacks reach 450 units farther than Nocturne's (575 vs 125 attack range).

#### 2. Fizz (net +1.03)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Zyra's Stranglethorns. Untargetable for 0.75 s; Stranglethorns takes 0.25 s to land, enough to react. (Fizz E Playful → Zyra R Stranglethorns)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Zyra's Grasping Roots. Untargetable for 0.75 s; Grasping Roots takes 1.21 s to land, enough to react. (Fizz E Playful → Zyra E Grasping Roots)
- Watch out: Zyra's basic attacks reach 400 units farther than Fizz's (575 vs 175 attack range).

#### 3. Fiora (net +1.01)

- **0.90** parry: Riposte parries Zyra's Stranglethorns and stuns back. Parry for 0.75 s; Stranglethorns takes 0.25 s to land, enough to react. Negating Stranglethorns's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Zyra R Stranglethorns)
- **0.67** parry: Riposte parries Zyra's Grasping Roots and stuns back. Parry for 0.75 s; Grasping Roots takes 1.21 s to land, enough to react. Negating Grasping Roots's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Zyra E Grasping Roots)
- **0.06** attack speed slow: Riposte cuts Zyra's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Zyra basic attacks)
- Watch out: Zyra's basic attacks reach 425 units farther than Fiora's (575 vs 150 attack range).

#### 4. Sivir (net +0.98)

- **0.80** spell shield: Spell Shield's spell shield blocks Zyra's Stranglethorns. Spell shield for 1.5 s, long enough to use ahead of Stranglethorns. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Zyra R Stranglethorns)
- **0.54** spell shield: Spell Shield's spell shield blocks Zyra's Grasping Roots. Spell shield for 1.5 s, long enough to use ahead of Grasping Roots. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Zyra E Grasping Roots)
- Watch out: Zyra's basic attacks reach 75 units farther than Sivir's (575 vs 500 attack range).

#### 5. Lissandra (net +0.97)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Zyra's Stranglethorns. Untargetable for 2.5 s, long enough to use ahead of Stranglethorns. (Lissandra R Frozen Tomb → Zyra R Stranglethorns)
- **0.34** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Zyra's Grasping Roots. Untargetable for 2.5 s, long enough to use ahead of Grasping Roots. (Lissandra R Frozen Tomb → Zyra E Grasping Roots)

#### 6. Morgana (net +0.94)

- **0.80** cc immunity: Black Shield makes Morgana immune to Zyra's Stranglethorns (airborne). Immune for 5 s, long enough to use ahead of Stranglethorns. (Morgana E Black Shield → Zyra R Stranglethorns)
- **0.57** cc immunity: Black Shield makes Morgana immune to Zyra's Grasping Roots (root). Immune for 5 s, long enough to use ahead of Grasping Roots. (Morgana E Black Shield → Zyra E Grasping Roots)
- Watch out: Zyra's basic attacks reach 125 units farther than Morgana's (575 vs 450 attack range).

#### 7. Bard (net +0.93)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Zyra's Stranglethorns. Untargetable for 2.5 s, long enough to use ahead of Stranglethorns. (Bard R Tempered Fate → Zyra R Stranglethorns)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Zyra's Grasping Roots. Untargetable for 2.5 s, long enough to use ahead of Grasping Roots. (Bard R Tempered Fate → Zyra E Grasping Roots)
- Watch out: Zyra's basic attacks reach 75 units farther than Bard's (575 vs 500 attack range).

#### 8. Xayah (net +0.92)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Zyra's Stranglethorns. Untargetable for 1.5 s, long enough to use ahead of Stranglethorns. (Xayah R Featherstorm → Zyra R Stranglethorns)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Zyra's Grasping Roots. Untargetable for 1.5 s, long enough to use ahead of Grasping Roots. (Xayah R Featherstorm → Zyra E Grasping Roots)

#### 9. Maokai (net +0.91)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Zyra's Stranglethorns. Untargetable for 1.4 s; Stranglethorns takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Zyra R Stranglethorns)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Zyra's Grasping Roots. Untargetable for 1.4 s; Grasping Roots takes 1.21 s to land, enough to react. (Maokai W Twisted Advance → Zyra E Grasping Roots)
- Watch out: Zyra's basic attacks reach 450 units farther than Maokai's (575 vs 125 attack range).

#### 10. Udyr (net +0.91)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Zyra's Stranglethorns (airborne). Immune for 1.5 s, long enough to use ahead of Stranglethorns. (Udyr E Blazing Stampede → Zyra R Stranglethorns)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Zyra's Grasping Roots (root). Immune for 1.5 s, long enough to use ahead of Grasping Roots. (Udyr E Blazing Stampede → Zyra E Grasping Roots)
- Watch out: Zyra's basic attacks reach 450 units farther than Udyr's (575 vs 125 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.05 | 1.29 | 0.24 |  |
| 2 | Fizz | +1.03 | 1.15 | 0.12 |  |
| 3 | Fiora | +1.01 | 1.25 | 0.24 |  |
| 4 | Sivir | +0.98 | 1.07 | 0.09 |  |
| 5 | Lissandra | +0.97 | 0.97 | 0.00 |  |
| 6 | Morgana | +0.94 | 1.09 | 0.15 |  |
| 7 | Bard | +0.93 | 0.97 | 0.04 |  |
| 8 | Xayah | +0.92 | 0.92 | 0.00 |  |
| 9 | Maokai | +0.91 | 1.15 | 0.24 |  |
| 10 | Udyr | +0.91 | 1.15 | 0.24 |  |
| 11 | Vladimir | +0.89 | 1.09 | 0.20 |  |
| 12 | Camille | +0.89 | 1.01 | 0.12 |  |
| 13 | Rek'Sai | +0.85 | 1.01 | 0.16 |  |
| 14 | Gwen | +0.83 | 1.07 | 0.24 |  |
| 15 | Zaahen | +0.81 | 0.97 | 0.16 |  |
| 16 | Aurora | +0.81 | 0.96 | 0.15 |  |
| 17 | Kled | +0.77 | 0.87 | 0.10 |  |
| 18 | Zed | +0.76 | 0.92 | 0.16 |  |
| 19 | Evelynn | +0.73 | 0.97 | 0.24 |  |
| 20 | Master Yi | +0.72 | 1.07 | 0.35 |  |
| 21 | Yuumi | +0.68 | 1.15 | 0.47 |  |
| 22 | Kalista | +0.67 | 0.67 | 0.00 |  |
| 23 | Braum | +0.63 | 0.87 | 0.24 | projectile block (Unbreakable) |
| 24 | Shaco | +0.61 | 0.97 | 0.36 |  |
| 25 | Samira | +0.56 | 0.59 | 0.03 | projectile block (Blade Whirl) |
| 26 | Mel | +0.56 | 0.56 | 0.00 | projectile block (Rebuttal) |
| 27 | Alistar | +0.54 | 0.78 | 0.24 |  |
| 28 | Yasuo | +0.52 | 0.68 | 0.16 | projectile block (Wind Wall) |
| 29 | Olaf | +0.49 | 0.97 | 0.48 |  |
| 30 | Kayle | +0.49 | 0.49 | 0.00 |  |
| 31 | Warwick | +0.46 | 1.14 | 0.68 |  |
| 32 | Sion | +0.42 | 0.98 | 0.56 |  |
| 33 | Gangplank | +0.41 | 0.89 | 0.48 |  |
| 34 | Kayn | +0.39 | 0.97 | 0.58 |  |
| 35 | Milio | +0.35 | 0.35 | 0.00 |  |
| 36 | Rengar | +0.30 | 0.92 | 0.62 |  |
| 37 | Xin Zhao | +0.22 | 0.46 | 0.24 |  |
| 38 | Lulu | +0.22 | 0.22 | 0.00 |  |
| 39 | Tristana | +0.22 | 0.22 | 0.00 |  |
| 40 | K'Sante | +0.20 | 0.32 | 0.12 |  |
| 41 | Vex | +0.16 | 0.16 | 0.00 |  |
| 42 | Teemo | +0.14 | 0.31 | 0.17 |  |
| 43 | Malzahar | +0.11 | 0.57 | 0.46 |  |
| 44 | Malphite | +0.08 | 0.32 | 0.24 |  |
| 45 | Jarvan IV | +0.04 | 0.16 | 0.12 |  |
| 46 | Yone | +0.04 | 0.16 | 0.12 |  |
| 47 | Jax | +0.01 | 0.25 | 0.24 |  |
| 48 | Nilah | +0.01 | 0.22 | 0.21 |  |
| 49 | Hecarim | +0.01 | 0.17 | 0.16 |  |
| 50 | Ornn | 0.00 | 0.16 | 0.16 |  |
| 51 | Volibear | 0.00 | 0.16 | 0.16 |  |
| 52 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 53 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 54 | Annie | 0.00 | 0.00 | 0.00 |  |
| 55 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 56 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 57 | Azir | 0.00 | 0.00 | 0.00 |  |
| 58 | Brand | 0.00 | 0.00 | 0.00 |  |
| 59 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 60 | Corki | 0.00 | 0.00 | 0.00 |  |
| 61 | Draven | 0.00 | 0.00 | 0.00 |  |
| 62 | Elise | 0.00 | 0.00 | 0.00 |  |
| 63 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 64 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 65 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 66 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 67 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 68 | Karma | 0.00 | 0.00 | 0.00 |  |
| 69 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 70 | Lux | 0.00 | 0.00 | 0.00 |  |
| 71 | Nami | 0.00 | 0.00 | 0.00 |  |
| 72 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 73 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 74 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 75 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 76 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 77 | Sona | 0.00 | 0.00 | 0.00 |  |
| 78 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 79 | Swain | 0.00 | 0.00 | 0.00 |  |
| 80 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 81 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 82 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 83 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 84 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 85 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 86 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 87 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 88 | Jayce | -0.04 | 0.00 | 0.04 |  |
| 89 | Kindred | -0.04 | 0.00 | 0.04 |  |
| 90 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 91 | Varus | -0.05 | 0.00 | 0.05 |  |
| 92 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 93 | Graves | -0.06 | 0.00 | 0.06 |  |
| 94 | Illaoi | -0.08 | 0.16 | 0.24 |  |
| 95 | Sett | -0.08 | 0.16 | 0.24 |  |
| 96 | Shyvana | -0.08 | 0.16 | 0.24 |  |
| 97 | LeBlanc | -0.08 | 0.00 | 0.08 |  |
| 98 | Kog'Maw | -0.09 | 0.00 | 0.09 |  |
| 99 | Pantheon | -0.10 | 0.54 | 0.64 |  |
| 100 | Kai'Sa | -0.11 | 0.00 | 0.11 |  |
| 101 | Neeko | -0.11 | 0.00 | 0.11 |  |
| 102 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 103 | Senna | -0.11 | 0.00 | 0.11 |  |
| 104 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 105 | Briar | -0.12 | 0.00 | 0.12 |  |
| 106 | Sylas | -0.12 | 0.00 | 0.12 |  |
| 107 | Ivern | -0.13 | 0.00 | 0.13 |  |
| 108 | Urgot | -0.13 | 0.00 | 0.13 |  |
| 109 | Caitlyn | -0.14 | 0.14 | 0.28 |  |
| 110 | Quinn | -0.14 | 0.00 | 0.14 |  |
| 111 | Vayne | -0.14 | 0.00 | 0.14 |  |
| 112 | Rammus | -0.15 | 0.24 | 0.39 |  |
| 113 | Lillia | -0.15 | 0.00 | 0.15 |  |
| 114 | Ambessa | -0.16 | 0.00 | 0.16 |  |
| 115 | Bel'Veth | -0.16 | 0.00 | 0.16 |  |
| 116 | Ekko | -0.16 | 0.00 | 0.16 |  |
| 117 | Lee Sin | -0.16 | 0.00 | 0.16 |  |
| 118 | Rell | -0.16 | 0.00 | 0.16 |  |
| 119 | Riven | -0.16 | 0.00 | 0.16 |  |
| 120 | Viego | -0.17 | 0.16 | 0.33 |  |
| 121 | Vi | -0.22 | 0.16 | 0.38 |  |
| 122 | Irelia | -0.22 | 0.00 | 0.22 |  |
| 123 | Nasus | -0.24 | 0.24 | 0.48 |  |
| 124 | Aatrox | -0.24 | 0.00 | 0.24 |  |
| 125 | Amumu | -0.24 | 0.00 | 0.24 |  |
| 126 | Diana | -0.24 | 0.00 | 0.24 |  |
| 127 | Kassadin | -0.24 | 0.00 | 0.24 |  |
| 128 | Leona | -0.24 | 0.00 | 0.24 |  |
| 129 | Locke | -0.24 | 0.00 | 0.24 |  |
| 130 | Nautilus | -0.24 | 0.00 | 0.24 |  |
| 131 | Renekton | -0.24 | 0.00 | 0.24 |  |
| 132 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 133 | Tryndamere | -0.24 | 0.00 | 0.24 |  |
| 134 | Vel'Koz | -0.26 | 0.00 | 0.26 |  |
| 135 | Akali | -0.27 | 0.00 | 0.27 |  |
| 136 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 137 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 138 | Garen | -0.30 | 0.18 | 0.48 |  |
| 139 | Talon | -0.30 | 0.00 | 0.30 |  |
| 140 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 141 | Lucian | -0.32 | 0.00 | 0.32 |  |
| 142 | Gragas | -0.34 | 0.00 | 0.34 |  |
| 143 | Qiyana | -0.34 | 0.00 | 0.34 |  |
| 144 | Pyke | -0.35 | 0.00 | 0.35 |  |
| 145 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 146 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 147 | Wukong | -0.36 | 0.00 | 0.36 |  |
| 148 | Shen | -0.37 | 0.24 | 0.61 |  |
| 149 | Janna | -0.40 | 0.00 | 0.40 |  |
| 150 | Mordekaiser | -0.42 | 0.06 | 0.48 |  |
| 151 | Akshan | -0.42 | 0.00 | 0.42 |  |
| 152 | Fiddlesticks | -0.42 | 0.00 | 0.42 |  |
| 153 | Karthus | -0.43 | 0.00 | 0.43 |  |
| 154 | Katarina | -0.43 | 0.00 | 0.43 |  |
| 155 | Poppy | -0.44 | 0.00 | 0.44 |  |
| 156 | Kha'Zix | -0.45 | 0.00 | 0.45 |  |
| 157 | Zac | -0.47 | 0.00 | 0.47 |  |
| 158 | Blitzcrank | -0.48 | 0.00 | 0.48 |  |
| 159 | Cho'Gath | -0.48 | 0.00 | 0.48 |  |
| 160 | Darius | -0.48 | 0.00 | 0.48 |  |
| 161 | Dr. Mundo | -0.48 | 0.00 | 0.48 |  |
| 162 | Rumble | -0.48 | 0.00 | 0.48 |  |
| 163 | Singed | -0.48 | 0.00 | 0.48 |  |
| 164 | Skarner | -0.48 | 0.00 | 0.48 |  |
| 165 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 166 | Taric | -0.48 | 0.00 | 0.48 |  |
| 167 | Trundle | -0.48 | 0.00 | 0.48 |  |
| 168 | Yorick | -0.48 | 0.00 | 0.48 |  |
| 169 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 170 | Naafiri | -0.54 | 0.00 | 0.54 |  |
| 171 | Galio | -0.71 | 0.00 | 0.71 |  |
| 172 | Nunu & Willump | -0.85 | 0.00 | 0.85 |  |
