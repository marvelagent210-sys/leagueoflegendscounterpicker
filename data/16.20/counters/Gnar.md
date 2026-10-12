# Counters to Gnar (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 45 other champions with a simulator kit against Gnar: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Gnar wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Gnar --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 2 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +1.00 |
| 3 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 4 | Trundle | +0.80 | +1.00 | +1.00 | +1.00 | −0.30 | +1.00 | +1.00 |
| 5 | Aurora | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 6 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 7 | Garen | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 8 | Zaahen | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 9 | Olaf | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 10 | Aatrox | +0.77 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.00 |
| 11 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.27 | +1.00 | +0.00 |
| 12 | Gwen | +0.74 | +1.00 | +1.00 | +1.00 | −0.28 | +0.82 | +0.00 |
| 13 | Tryndamere | +0.74 | +1.00 | +0.97 | +1.00 | −0.25 | +0.85 | +0.00 |
| 14 | Poppy | +0.73 | +1.00 | +1.00 | +1.00 | +0.06 | +0.17 | +0.00 |
| 15 | Quinn | +0.67 | +0.75 | +0.75 | +1.00 | −0.04 | +1.00 | +0.00 |
| 16 | Jax | +0.61 | +1.00 | +1.00 | +1.00 | +0.06 | −0.96 | +0.00 |
| 17 | Camille | +0.59 | +1.00 | +1.00 | +1.00 | −0.10 | −1.00 | +0.00 |
| 18 | Malphite | +0.24 | +0.46 | +0.47 | +0.00 | −0.02 | +0.05 | +0.00 |
| 19 | Udyr | +0.22 | +1.00 | +0.22 | +0.13 | −0.11 | −0.90 | +0.00 |
| 20 | Dr. Mundo | +0.17 | +0.24 | +0.25 | +0.19 | −0.10 | +0.20 | +0.00 |
| 21 | Sion | +0.11 | −0.04 | −0.04 | +0.77 | −0.06 | −0.10 | +0.00 |
| 22 | Jayce | +0.05 | −0.34 | −0.34 | +0.61 | −0.00 | +1.00 | +0.00 |
| 23 | Nasus | +0.04 | +0.06 | +0.07 | +0.13 | −0.17 | +0.08 | +0.00 |
| 24 | Tahm Kench | −0.21 | −0.21 | −0.22 | −0.19 | −0.10 | −0.53 | +0.00 |
| 25 | Ornn | −0.21 | −0.26 | −0.27 | −0.25 | −0.04 | −0.26 | +0.00 |
| 26 | Irelia | −0.32 | −0.82 | −0.70 | +0.83 | −0.03 | −1.00 | +0.00 |
| 27 | Yasuo | −0.41 | −0.94 | −1.00 | +1.00 | −0.16 | −1.00 | +0.00 |
| 28 | Illaoi | −0.43 | −1.00 | −1.00 | +1.00 | −0.18 | −1.00 | +0.00 |
| 29 | Rumble | −0.43 | −1.00 | −1.00 | +1.00 | −0.19 | −1.00 | +0.00 |
| 30 | Urgot | −0.45 | −0.26 | −1.00 | −0.16 | −0.03 | −1.00 | +0.00 |
| 31 | Riven | −0.46 | −1.00 | −1.00 | +1.00 | −0.38 | −1.00 | +0.00 |
| 32 | Renekton | −0.53 | −0.09 | −0.84 | −1.00 | +0.04 | −1.00 | +0.00 |
| 33 | Volibear | −0.55 | +0.11 | −0.92 | −0.91 | −0.39 | −1.00 | +0.00 |
| 34 | Ambessa | −0.56 | −0.52 | −0.94 | −0.52 | −0.12 | −0.76 | +0.00 |
| 35 | Shen | −0.57 | −0.99 | −0.91 | −0.15 | +0.01 | −0.70 | +0.00 |
| 36 | Yone | −0.60 | −0.14 | −0.93 | −1.00 | −0.19 | −1.00 | +0.00 |
| 37 | Kennen | −0.62 | −1.00 | −1.00 | −1.00 | −0.03 | +0.83 | +0.00 |
| 38 | Pantheon | −0.72 | −1.00 | −0.97 | −0.93 | −0.07 | −0.32 | +0.00 |
| 39 | Mordekaiser | −0.77 | −0.88 | −0.97 | −1.00 | −0.06 | −1.00 | +0.00 |
| 40 | Skarner | −0.79 | −0.99 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 41 | Kled | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 42 | Sett | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 43 | Cho'Gath | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 44 | Akali | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 45 | Singed | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Gnar's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Gnar's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Gnar` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Morgana (net +1.09)

- **0.80** cc immunity: Black Shield makes Morgana immune to Gnar's GNAR! (airborne, slow, stun). Immune for 5 s, long enough to use ahead of GNAR!. (Morgana E Black Shield → Gnar R GNAR!)
- **0.46** cc immunity: Black Shield makes Morgana immune to Gnar's Wallop (stun). Immune for 5 s, long enough to use ahead of Wallop. (Morgana E Black Shield → Gnar W Wallop)
- **0.13** cc immunity: Black Shield makes Morgana immune to Gnar's Crunch (slow). Immune for 5 s, long enough to use ahead of Crunch. (Morgana E Black Shield → Gnar E Crunch)

#### 2. Elise (net +1.02)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Gnar's GNAR!. Untargetable for 0.6 s; GNAR! takes 0.25 s to land, enough to react. (Elise E Rappel → Gnar R GNAR!)
- **0.44** untargetable: Rappel makes Elise untargetable, dodging Gnar's Wallop. Untargetable for 0.6 s; Wallop takes 0.6 s to land, enough to react. (Elise E Rappel → Gnar W Wallop)

#### 3. Sivir (net +1.02)

- **0.80** spell shield: Spell Shield's spell shield blocks Gnar's GNAR!. Spell shield for 1.5 s, long enough to use ahead of GNAR!. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Gnar R GNAR!)
- **0.44** spell shield: Spell Shield's spell shield blocks Gnar's Wallop. Spell shield for 1.5 s, long enough to use ahead of Wallop. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Gnar W Wallop)

#### 4. Vladimir (net +0.97)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Gnar's GNAR!. Untargetable for 2 s, long enough to use ahead of GNAR!. (Vladimir W Sanguine Pool → Gnar R GNAR!)
- **0.46** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Gnar's Wallop. Untargetable for 2 s, long enough to use ahead of Wallop. (Vladimir W Sanguine Pool → Gnar W Wallop)
- Watch out: GNAR!'s airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 5. Udyr (net +0.89)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Gnar's GNAR! (airborne, slow, stun). Immune for 1.5 s, long enough to use ahead of GNAR!. (Udyr E Blazing Stampede → Gnar R GNAR!)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Gnar's Wallop (stun). Immune for 1.5 s, long enough to use ahead of Wallop. (Udyr E Blazing Stampede → Gnar W Wallop)
- **0.15** cc immunity: Blazing Stampede makes Udyr immune to Gnar's Crunch (slow). Immune for 1.5 s, long enough to use ahead of Crunch. (Udyr E Blazing Stampede → Gnar E Crunch)
- Watch out: Gnar's basic attacks reach 386.765 units farther than Udyr's (511.765 vs 125 attack range).

#### 6. Fiora (net +0.89)

- **0.90** parry: Riposte parries Gnar's GNAR! and stuns back. Parry for 0.75 s; GNAR! takes 0.25 s to land, enough to react. Negating GNAR!'s immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Gnar R GNAR!)
- **0.56** parry: Riposte parries Gnar's Wallop and stuns back. Parry for 0.75 s; Wallop takes 0.6 s to land, enough to react. Negating Wallop's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Gnar W Wallop)
- **0.08** attack speed slow: Riposte cuts Gnar's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Gnar basic attacks)
- Watch out: Gnar's basic attacks reach 361.765 units farther than Fiora's (511.765 vs 150 attack range).

#### 7. Nocturne (net +0.81)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Gnar's GNAR!. Spell shield for 1.5 s, long enough to use ahead of GNAR!. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Gnar R GNAR!)
- **0.52** spell shield: Shroud of Darkness's spell shield blocks Gnar's Wallop. Spell shield for 1.5 s, long enough to use ahead of Wallop. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Gnar W Wallop)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Gnar's GNAR! (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Gnar R GNAR!)
- Watch out: Gnar's basic attacks reach 386.765 units farther than Nocturne's (511.765 vs 125 attack range).

#### 8. Master Yi (net +0.77)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Gnar's GNAR!. Untargetable for ?; GNAR! takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Gnar R GNAR!)
- **0.44** untargetable: Alpha Strike makes Master Yi untargetable, dodging Gnar's Wallop. Untargetable for ?; Wallop takes 0.6 s to land, enough to react. (Master Yi Q Alpha Strike → Gnar W Wallop)
- **0.10** cleanse: Highlander cleanses Gnar's GNAR! (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove airborne, stun. (Master Yi R Highlander → Gnar R GNAR!)
- Watch out: Gnar's basic attacks reach 336.765 units farther than Master Yi's (511.765 vs 175 attack range).

#### 9. Maokai (net +0.76)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Gnar's GNAR!. Untargetable for 1.4 s; GNAR! takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Gnar R GNAR!)
- **0.57** untargetable: Twisted Advance makes Maokai untargetable, dodging Gnar's Wallop. Untargetable for 1.4 s; Wallop takes 0.6 s to land, enough to react. (Maokai W Twisted Advance → Gnar W Wallop)
- Watch out: Gnar's basic attacks reach 386.765 units farther than Maokai's (511.765 vs 125 attack range).

#### 10. Lissandra (net +0.72)

- **0.50** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Gnar's GNAR!. Untargetable for 2.5 s, long enough to use ahead of GNAR!. (Lissandra R Frozen Tomb → Gnar R GNAR!)
- **0.32** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Gnar's Wallop. Untargetable for 2.5 s, long enough to use ahead of Wallop. (Lissandra R Frozen Tomb → Gnar W Wallop)
- **0.15** dash stop: Frozen Tomb's knockdown can stop Gnar's Crunch mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Gnar E Crunch)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Morgana | +1.09 | 1.09 | 0.00 |  |
| 2 | Elise | +1.02 | 1.02 | 0.00 |  |
| 3 | Sivir | +1.02 | 1.02 | 0.00 |  |
| 4 | Vladimir | +0.97 | 1.03 | 0.06 |  |
| 5 | Udyr | +0.89 | 1.22 | 0.33 |  |
| 6 | Fiora | +0.89 | 1.20 | 0.31 |  |
| 7 | Nocturne | +0.81 | 1.14 | 0.33 |  |
| 8 | Master Yi | +0.77 | 1.20 | 0.43 |  |
| 9 | Maokai | +0.76 | 1.09 | 0.33 |  |
| 10 | Lissandra | +0.72 | 0.72 | 0.00 |  |
| 11 | Gwen | +0.71 | 1.02 | 0.31 |  |
| 12 | Yuumi | +0.70 | 1.15 | 0.45 |  |
| 13 | Bard | +0.66 | 0.66 | 0.00 |  |
| 14 | Aurora | +0.64 | 0.64 | 0.00 |  |
| 15 | Xayah | +0.62 | 0.62 | 0.00 |  |
| 16 | Ekko | +0.56 | 0.78 | 0.22 |  |
| 17 | Milio | +0.54 | 0.54 | 0.00 |  |
| 18 | Kled | +0.52 | 0.63 | 0.11 |  |
| 19 | Camille | +0.50 | 0.66 | 0.16 |  |
| 20 | Kalista | +0.50 | 0.50 | 0.00 |  |
| 21 | Rek'Sai | +0.49 | 0.68 | 0.19 |  |
| 22 | Zaahen | +0.49 | 0.68 | 0.19 |  |
| 23 | Samira | +0.49 | 0.49 | 0.00 |  |
| 24 | Vex | +0.47 | 0.47 | 0.00 |  |
| 25 | Mel | +0.46 | 0.46 | 0.00 |  |
| 26 | Ahri | +0.45 | 0.45 | 0.00 |  |
| 27 | Hwei | +0.45 | 0.45 | 0.00 |  |
| 28 | Jinx | +0.45 | 0.45 | 0.00 |  |
| 29 | Teemo | +0.45 | 0.45 | 0.00 | blind (Blinding Dart) |
| 30 | Malzahar | +0.44 | 0.84 | 0.40 |  |
| 31 | Evelynn | +0.44 | 0.66 | 0.22 |  |
| 32 | Shaco | +0.44 | 0.66 | 0.22 |  |
| 33 | Cassiopeia | +0.43 | 0.43 | 0.00 |  |
| 34 | Viktor | +0.43 | 0.43 | 0.00 |  |
| 35 | Braum | +0.41 | 0.74 | 0.33 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 36 | Veigar | +0.41 | 0.41 | 0.00 |  |
| 37 | Warwick | +0.40 | 0.83 | 0.43 |  |
| 38 | Zed | +0.40 | 0.62 | 0.22 |  |
| 39 | Kayle | +0.40 | 0.40 | 0.00 |  |
| 40 | Yasuo | +0.37 | 0.56 | 0.19 |  |
| 41 | Lulu | +0.32 | 0.32 | 0.00 |  |
| 42 | Kindred | +0.30 | 0.30 | 0.00 |  |
| 43 | Rengar | +0.26 | 0.92 | 0.66 |  |
| 44 | Pantheon | +0.26 | 0.51 | 0.25 |  |
| 45 | Gangplank | +0.22 | 0.88 | 0.66 |  |
| 46 | Alistar | +0.22 | 0.55 | 0.33 |  |
| 47 | Yone | +0.17 | 0.31 | 0.14 |  |
| 48 | Aphelios | +0.13 | 0.13 | 0.00 |  |
| 49 | Heimerdinger | +0.13 | 0.13 | 0.00 |  |
| 50 | Tristana | +0.11 | 0.11 | 0.00 |  |
| 51 | Sion | +0.10 | 0.76 | 0.66 |  |
| 52 | Corki | +0.08 | 0.08 | 0.00 |  |
| 53 | Nilah | +0.07 | 0.31 | 0.24 |  |
| 54 | Ashe | +0.05 | 0.05 | 0.00 |  |
| 55 | Senna | +0.05 | 0.05 | 0.00 |  |
| 56 | Annie | +0.04 | 0.04 | 0.00 |  |
| 57 | Olaf | +0.03 | 0.69 | 0.66 |  |
| 58 | Jax | +0.03 | 0.36 | 0.33 |  |
| 59 | Anivia | +0.03 | 0.03 | 0.00 |  |
| 60 | Kayn | +0.02 | 0.66 | 0.64 |  |
| 61 | Xin Zhao | +0.02 | 0.31 | 0.29 |  |
| 62 | Garen | +0.01 | 0.58 | 0.57 |  |
| 63 | K'Sante | +0.01 | 0.16 | 0.15 |  |
| 64 | Azir | 0.00 | 0.00 | 0.00 |  |
| 65 | Brand | 0.00 | 0.00 | 0.00 |  |
| 66 | Draven | 0.00 | 0.00 | 0.00 |  |
| 67 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 68 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 69 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 70 | Karma | 0.00 | 0.00 | 0.00 |  |
| 71 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 72 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 73 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 74 | Lux | 0.00 | 0.00 | 0.00 |  |
| 75 | Nami | 0.00 | 0.00 | 0.00 |  |
| 76 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 77 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 78 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 79 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 80 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 81 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 82 | Sona | 0.00 | 0.00 | 0.00 |  |
| 83 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 84 | Swain | 0.00 | 0.00 | 0.00 |  |
| 85 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 86 | Thresh | 0.00 | 0.00 | 0.00 |  |
| 87 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 88 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 89 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 90 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 91 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 92 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 93 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 94 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 95 | Poppy | -0.02 | 0.51 | 0.53 |  |
| 96 | Malphite | -0.03 | 0.30 | 0.33 |  |
| 97 | Graves | -0.05 | 0.00 | 0.05 |  |
| 98 | Jarvan IV | -0.06 | 0.08 | 0.14 |  |
| 99 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 100 | Varus | -0.07 | 0.00 | 0.07 |  |
| 101 | Ivern | -0.09 | 0.00 | 0.09 |  |
| 102 | Hecarim | -0.11 | 0.08 | 0.19 |  |
| 103 | Ornn | -0.11 | 0.08 | 0.19 |  |
| 104 | Amumu | -0.12 | 0.21 | 0.33 |  |
| 105 | Rakan | -0.12 | 0.00 | 0.12 |  |
| 106 | Zac | -0.13 | 0.45 | 0.58 |  |
| 107 | Volibear | -0.13 | 0.08 | 0.21 |  |
| 108 | Fizz | -0.14 | 0.00 | 0.14 |  |
| 109 | Sylas | -0.14 | 0.00 | 0.14 |  |
| 110 | Urgot | -0.14 | 0.00 | 0.14 |  |
| 111 | Quinn | -0.15 | 0.00 | 0.15 |  |
| 112 | Briar | -0.16 | 0.00 | 0.16 |  |
| 113 | Lillia | -0.16 | 0.00 | 0.16 |  |
| 114 | Rammus | -0.17 | 0.34 | 0.51 |  |
| 115 | Viego | -0.19 | 0.08 | 0.27 |  |
| 116 | Wukong | -0.19 | 0.00 | 0.19 |  |
| 117 | Rell | -0.19 | 0.00 | 0.19 |  |
| 118 | Caitlyn | -0.20 | 0.08 | 0.28 |  |
| 119 | Singed | -0.21 | 0.45 | 0.66 |  |
| 120 | Bel'Veth | -0.21 | 0.00 | 0.21 |  |
| 121 | Qiyana | -0.21 | 0.00 | 0.21 |  |
| 122 | Akali | -0.22 | 0.00 | 0.22 |  |
| 123 | Ambessa | -0.22 | 0.00 | 0.22 |  |
| 124 | Lee Sin | -0.22 | 0.00 | 0.22 |  |
| 125 | Riven | -0.22 | 0.00 | 0.22 |  |
| 126 | Talon | -0.22 | 0.00 | 0.22 |  |
| 127 | Shyvana | -0.23 | 0.08 | 0.31 |  |
| 128 | Illaoi | -0.25 | 0.08 | 0.33 |  |
| 129 | Sett | -0.25 | 0.08 | 0.33 |  |
| 130 | Irelia | -0.27 | 0.00 | 0.27 |  |
| 131 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 132 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 133 | Karthus | -0.28 | 0.00 | 0.28 |  |
| 134 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 135 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 136 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 137 | Aatrox | -0.29 | 0.00 | 0.29 |  |
| 138 | Nautilus | -0.29 | 0.00 | 0.29 |  |
| 139 | Tryndamere | -0.29 | 0.00 | 0.29 |  |
| 140 | Diana | -0.31 | 0.00 | 0.31 |  |
| 141 | Kassadin | -0.31 | 0.00 | 0.31 |  |
| 142 | Pyke | -0.31 | 0.00 | 0.31 |  |
| 143 | Sejuani | -0.31 | 0.00 | 0.31 |  |
| 144 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 145 | Nasus | -0.32 | 0.34 | 0.66 |  |
| 146 | Taric | -0.32 | 0.30 | 0.62 |  |
| 147 | Shen | -0.33 | 0.34 | 0.67 |  |
| 148 | Galio | -0.33 | 0.00 | 0.33 |  |
| 149 | Kha'Zix | -0.33 | 0.00 | 0.33 |  |
| 150 | Leona | -0.33 | 0.00 | 0.33 |  |
| 151 | Locke | -0.33 | 0.00 | 0.33 |  |
| 152 | Renekton | -0.33 | 0.00 | 0.33 |  |
| 153 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 154 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 155 | Vi | -0.40 | 0.08 | 0.48 |  |
| 156 | Janna | -0.40 | 0.00 | 0.40 |  |
| 157 | Fiddlesticks | -0.42 | 0.00 | 0.42 |  |
| 158 | Gragas | -0.44 | 0.00 | 0.44 |  |
| 159 | Skarner | -0.46 | 0.16 | 0.62 |  |
| 160 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 161 | Mordekaiser | -0.49 | 0.08 | 0.57 |  |
| 162 | Darius | -0.57 | 0.00 | 0.57 |  |
| 163 | Trundle | -0.57 | 0.00 | 0.57 |  |
| 164 | Yorick | -0.57 | 0.00 | 0.57 |  |
| 165 | Katarina | -0.61 | 0.00 | 0.61 |  |
| 166 | Naafiri | -0.61 | 0.00 | 0.61 |  |
| 167 | Blitzcrank | -0.66 | 0.00 | 0.66 |  |
| 168 | Cho'Gath | -0.66 | 0.00 | 0.66 |  |
| 169 | Dr. Mundo | -0.66 | 0.00 | 0.66 |  |
| 170 | Rumble | -0.66 | 0.00 | 0.66 |  |
| 171 | Tahm Kench | -0.66 | 0.00 | 0.66 |  |
| 172 | Nunu & Willump | -0.75 | 0.31 | 1.06 |  |
