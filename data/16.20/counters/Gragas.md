# Counters to Gragas (patch 26.20)

## Simulated duels

The duel simulator played each of the 94 other champions with a simulator kit against Gragas: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Gragas wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Gragas --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.86 | +1.00 | +1.00 | +1.00 | +0.43 | +1.00 | +0.00 |
| 2 | Poppy | +0.84 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | +0.00 |
| 3 | Master Yi | +0.83 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.50 |
| 4 | Zaahen | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 5 | Kayle | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 6 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | −0.08 | – | +1.00 |
| 7 | Gangplank | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 8 | Olaf | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 9 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 10 | Illaoi | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 11 | Yone | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 12 | Aatrox | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 13 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 14 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 15 | Renekton | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 16 | Udyr | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 17 | Xin Zhao | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 18 | Warwick | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 19 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 20 | Vayne | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 21 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 22 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 23 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 24 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 25 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 26 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 27 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 28 | Ambessa | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 29 | Sett | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 30 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 31 | Riven | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 32 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 33 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 34 | Rammus | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 35 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 36 | Camille | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 37 | Mordekaiser | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 38 | Irelia | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 39 | Ezreal | +0.76 | +0.95 | +0.95 | +0.94 | +0.01 | +1.00 | +0.00 |
| 40 | Wukong | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 41 | Yasuo | +0.72 | +1.00 | +1.00 | +1.00 | +0.03 | +0.20 | +0.00 |
| 42 | Sion | +0.69 | +1.00 | +1.00 | +0.50 | −0.07 | +1.00 | +0.00 |
| 43 | Quinn | +0.55 | +1.00 | +0.00 | +0.95 | +0.06 | +1.00 | +0.00 |
| 44 | Kog'Maw | +0.50 | +1.00 | +1.00 | +0.00 | +0.00 | +0.00 | +0.00 |
| 45 | Hecarim | +0.45 | +0.48 | +0.48 | +1.00 | +0.09 | +0.00 | +0.00 |
| 46 | Teemo | +0.40 | +1.00 | +1.00 | −1.00 | +0.02 | +1.00 | +0.00 |
| 47 | Aurora | +0.40 | +1.00 | +1.00 | −1.00 | +0.02 | +1.00 | +0.00 |
| 48 | Malphite | +0.34 | +1.00 | +1.00 | −1.00 | +0.06 | – | +0.00 |
| 49 | Miss Fortune | +0.21 | +1.00 | +1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 50 | Ashe | +0.20 | +1.00 | +1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 51 | Samira | +0.18 | +1.00 | +1.00 | −1.00 | −0.17 | −0.93 | +0.00 |
| 52 | Jhin | +0.11 | +0.78 | +0.78 | −0.96 | +0.11 | −1.00 | +0.00 |
| 53 | Tahm Kench | +0.10 | +0.14 | +0.14 | +0.16 | −0.08 | – | +0.00 |
| 54 | Kalista | +0.07 | −0.87 | +0.73 | +0.00 | +0.03 | +1.00 | +0.00 |
| 55 | Shen | +0.07 | +0.01 | +0.10 | +0.15 | +0.02 | – | +0.00 |
| 56 | Morgana | +0.05 | +0.04 | +0.04 | +0.06 | +0.11 | +0.01 | +0.00 |
| 57 | Smolder | +0.04 | +0.28 | +0.28 | −1.00 | −0.02 | +1.00 | +0.00 |
| 58 | Anivia | +0.03 | +0.18 | +0.17 | −0.26 | −0.15 | +0.17 | +0.00 |
| 59 | Malzahar | +0.00 | +0.02 | +0.04 | −0.08 | +0.07 | −0.08 | +0.00 |
| 60 | Urgot | −0.00 | −0.05 | −0.05 | +0.03 | +0.07 | +0.02 | +0.00 |
| 61 | Ornn | −0.03 | −0.06 | −0.05 | +0.00 | +0.02 | – | +0.00 |
| 62 | Sivir | −0.04 | −0.76 | +1.00 | −0.86 | +0.00 | +0.74 | +0.00 |
| 63 | Leona | −0.07 | −0.05 | −0.05 | −0.09 | −0.12 | – | +0.00 |
| 64 | Annie | −0.08 | −0.02 | −0.03 | −0.11 | +0.13 | −0.63 | +0.00 |
| 65 | Singed | −0.11 | −0.01 | −0.03 | −0.03 | +0.01 | −1.00 | +0.00 |
| 66 | Pantheon | −0.17 | −0.29 | +0.00 | −1.00 | +0.03 | +1.00 | +0.00 |
| 67 | Nautilus | −0.21 | −0.01 | +0.04 | −1.00 | +0.03 | – | +0.00 |
| 68 | Heimerdinger | −0.22 | −0.02 | −0.04 | −1.00 | +0.01 | −0.05 | +0.00 |
| 69 | Xayah | −0.28 | −1.00 | +1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 70 | Karthus | −0.29 | −0.37 | −0.31 | −0.37 | −0.05 | −0.40 | +0.00 |
| 71 | Veigar | −0.31 | −0.40 | −0.31 | −0.22 | +0.06 | −1.00 | +0.00 |
| 72 | Kassadin | −0.32 | −1.00 | −0.97 | +1.00 | +0.02 | – | +0.00 |
| 73 | Skarner | −0.35 | −1.00 | −1.00 | +1.00 | −0.11 | – | +0.00 |
| 74 | Kennen | −0.38 | −0.58 | −0.58 | −0.11 | −0.08 | −0.61 | +0.00 |
| 75 | Vel'Koz | −0.58 | −0.59 | −0.59 | −1.00 | +0.11 | −1.00 | +0.00 |
| 76 | Rumble | −0.60 | −1.00 | −1.00 | −1.00 | −0.02 | +1.00 | +0.00 |
| 77 | Akali | −0.63 | −1.00 | −0.25 | −1.00 | −0.12 | −1.00 | +0.00 |
| 78 | Ziggs | −0.68 | −1.00 | −1.00 | −1.00 | +0.16 | −0.04 | +0.00 |
| 79 | Lissandra | −0.70 | −1.00 | −1.00 | −1.00 | +0.14 | −0.17 | +0.00 |
| 80 | Zyra | −0.70 | −1.00 | −0.65 | −1.00 | +0.07 | −1.00 | +0.00 |
| 81 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 82 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 83 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 84 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 85 | Draven | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 86 | Cassiopeia | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 87 | Jinx | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 88 | Lux | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 89 | Varus | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 90 | Tristana | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 91 | Brand | −0.81 | −0.97 | −0.97 | −1.00 | −0.15 | −1.00 | +0.00 |
| 92 | Twitch | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 93 | Kai'Sa | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 94 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Gragas's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Gragas's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Gragas` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +1.83)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Gragas's Body Slam. Spell shield for 1.5 s, long enough to use ahead of Body Slam. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Gragas E Body Slam)
- **0.80** spell shield: Shroud of Darkness's spell shield blocks Gragas's Explosive Cask. Spell shield for 1.5 s, long enough to use ahead of Explosive Cask. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Gragas R Explosive Cask)
- **0.29** spell shield: Shroud of Darkness's spell shield blocks Gragas's Drunken Rage. Spell shield for 1.5 s, long enough to use ahead of Drunken Rage. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Gragas W Drunken Rage)

#### 2. Sivir (net +1.74)

- **0.80** spell shield: Spell Shield's spell shield blocks Gragas's Body Slam. Spell shield for 1.5 s, long enough to use ahead of Body Slam. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Gragas E Body Slam)
- **0.80** spell shield: Spell Shield's spell shield blocks Gragas's Explosive Cask. Spell shield for 1.5 s, long enough to use ahead of Explosive Cask. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Gragas R Explosive Cask)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Gragas's (500 vs 125 attack range). Gragas closes the gap with Body Slam. (Sivir basic attacks → Gragas basic attacks)

#### 3. Maokai (net +1.68)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Gragas's Body Slam. Untargetable for 1.4 s; Body Slam takes 0.66 s to land, enough to react. (Maokai W Twisted Advance → Gragas E Body Slam)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Gragas's Explosive Cask. Untargetable for 1.4 s; Explosive Cask takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Gragas R Explosive Cask)
- **0.23** interrupt: Bramble Smash's airborne interrupts Gragas's Drunken Rage (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Gragas W Drunken Rage)

#### 4. Fizz (net +1.55)

- **1.00** untargetable: Playful makes Fizz untargetable, dodging Gragas's Body Slam. Untargetable for 0.75 s; Body Slam takes 0.66 s to land, enough to react. (Fizz E Playful → Gragas E Body Slam)
- **0.80** untargetable: Playful makes Fizz untargetable, dodging Gragas's Explosive Cask. Untargetable for 0.75 s; Explosive Cask takes 0.25 s to land, enough to react. (Fizz E Playful → Gragas R Explosive Cask)
- **0.21** untargetable: Playful makes Fizz untargetable, dodging Gragas's Drunken Rage. Untargetable for 0.75 s; Drunken Rage lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Gragas W Drunken Rage)

#### 5. Morgana (net +1.46)

- **0.85** cc immunity: Black Shield makes Morgana immune to Gragas's Body Slam (airborne, stun). Immune for 5 s, long enough to use ahead of Body Slam. (Morgana E Black Shield → Gragas E Body Slam)
- **0.80** cc immunity: Black Shield makes Morgana immune to Gragas's Explosive Cask (airborne). Immune for 5 s, long enough to use ahead of Explosive Cask. (Morgana E Black Shield → Gragas R Explosive Cask)
- **0.19** range: Morgana's basic attacks reach 325 units farther than Gragas's (450 vs 125 attack range). Gragas closes the gap with Body Slam. (Morgana basic attacks → Gragas basic attacks)

#### 6. Udyr (net +1.46)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Gragas's Body Slam (airborne, stun). Immune for 1.5 s, long enough to use ahead of Body Slam. (Udyr E Blazing Stampede → Gragas E Body Slam)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Gragas's Explosive Cask (airborne). Immune for 1.5 s, long enough to use ahead of Explosive Cask. (Udyr E Blazing Stampede → Gragas R Explosive Cask)
- **0.20** interrupt: Blazing Stampede's stun interrupts Gragas's Drunken Rage (normal channel). Blazing Stampede must land during the channel. (Udyr E Blazing Stampede → Gragas W Drunken Rage)

#### 7. Fiora (net +1.45)

- **0.95** parry: Riposte parries Gragas's Body Slam and stuns back. Parry for 0.75 s; Body Slam takes 0.66 s to land, enough to react. Negating Body Slam's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Gragas E Body Slam)
- **0.90** parry: Riposte parries Gragas's Explosive Cask and stuns back. Parry for 0.75 s; Explosive Cask takes 0.25 s to land, enough to react. Negating Explosive Cask's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Gragas R Explosive Cask)
- **0.16** parry: Riposte parries Gragas's Drunken Rage. Parry for 0.75 s; Drunken Rage lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Gragas W Drunken Rage)

#### 8. Bard (net +1.41)

- **0.74** untargetable: Tempered Fate makes Bard untargetable, dodging Gragas's Explosive Cask. Untargetable for 2.5 s, long enough to use ahead of Explosive Cask. (Bard R Tempered Fate → Gragas R Explosive Cask)
- **0.49** untargetable: Tempered Fate makes Bard untargetable, dodging Gragas's Body Slam. Untargetable for 2.5 s, long enough to use ahead of Body Slam. (Bard R Tempered Fate → Gragas E Body Slam)
- **0.36** range: Bard's basic attacks reach 375 units farther than Gragas's (500 vs 125 attack range). Gragas closes the gap with Body Slam. (Bard basic attacks → Gragas basic attacks)

#### 9. Vladimir (net +1.38)

- **0.85** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Gragas's Body Slam. Untargetable for 2 s, long enough to use ahead of Body Slam. (Vladimir W Sanguine Pool → Gragas E Body Slam)
- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Gragas's Explosive Cask. Untargetable for 2 s, long enough to use ahead of Explosive Cask. (Vladimir W Sanguine Pool → Gragas R Explosive Cask)
- **0.26** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Gragas's Drunken Rage. Untargetable for 2 s, long enough to use ahead of Drunken Rage. (Vladimir W Sanguine Pool → Gragas W Drunken Rage)
- Watch out: Body Slam's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 10. Zaahen (net +1.35)

- **0.74** cc immunity: Grim Deliverance makes Zaahen immune to Gragas's Explosive Cask (airborne). Immune for ?; Explosive Cask takes 0.25 s to land, enough to react. (Zaahen R Grim Deliverance → Gragas R Explosive Cask)
- **0.49** cc immunity: Grim Deliverance makes Zaahen immune to Gragas's Body Slam (airborne, stun). Immune for ?; Body Slam takes 0.66 s to land, enough to react. (Zaahen R Grim Deliverance → Gragas E Body Slam)
- **0.20** interrupt: The Darkin Glaive's airborne interrupts Gragas's Drunken Rage (normal channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Gragas W Drunken Rage)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.83 | 1.83 | 0.00 |  |
| 2 | Sivir | +1.74 | 1.74 | 0.00 |  |
| 3 | Maokai | +1.68 | 1.68 | 0.00 |  |
| 4 | Fizz | +1.55 | 1.55 | 0.00 |  |
| 5 | Morgana | +1.46 | 1.46 | 0.00 |  |
| 6 | Udyr | +1.46 | 1.46 | 0.00 |  |
| 7 | Fiora | +1.45 | 1.45 | 0.00 |  |
| 8 | Bard | +1.41 | 1.41 | 0.00 |  |
| 9 | Vladimir | +1.38 | 1.50 | 0.12 |  |
| 10 | Zaahen | +1.35 | 1.35 | 0.00 |  |
| 11 | Xayah | +1.32 | 1.32 | 0.00 |  |
| 12 | Lissandra | +1.30 | 1.30 | 0.00 |  |
| 13 | Rek'Sai | +1.29 | 1.29 | 0.00 |  |
| 14 | Yasuo | +1.28 | 1.28 | 0.00 | projectile block (Wind Wall) |
| 15 | Aurora | +1.25 | 1.25 | 0.00 |  |
| 16 | Braum | +1.25 | 1.25 | 0.00 | projectile block (Unbreakable) |
| 17 | Gwen | +1.24 | 1.24 | 0.00 |  |
| 18 | Samira | +1.23 | 1.23 | 0.00 | projectile block (Blade Whirl) |
| 19 | Kled | +1.22 | 1.22 | 0.00 |  |
| 20 | Mel | +1.19 | 1.19 | 0.00 | projectile block (Rebuttal) |
| 21 | Evelynn | +1.16 | 1.16 | 0.00 |  |
| 22 | Camille | +1.15 | 1.15 | 0.00 |  |
| 23 | Shaco | +1.15 | 1.15 | 0.00 |  |
| 24 | Rengar | +1.14 | 1.14 | 0.00 |  |
| 25 | Alistar | +1.12 | 1.12 | 0.00 |  |
| 26 | Sion | +1.09 | 1.29 | 0.20 |  |
| 27 | Gangplank | +1.07 | 1.07 | 0.00 |  |
| 28 | Milio | +1.05 | 1.05 | 0.00 |  |
| 29 | Yuumi | +1.02 | 1.79 | 0.77 |  |
| 30 | Kalista | +1.02 | 1.02 | 0.00 |  |
| 31 | Master Yi | +1.00 | 1.31 | 0.31 |  |
| 32 | Olaf | +1.00 | 1.00 | 0.00 |  |
| 33 | Vex | +0.98 | 0.98 | 0.00 | dash stop (Doom 'n Gloom) |
| 34 | Viktor | +0.97 | 0.97 | 0.00 | dash stop (Gravity Field) |
| 35 | Zed | +0.93 | 0.93 | 0.00 |  |
| 36 | Kayle | +0.91 | 0.91 | 0.00 |  |
| 37 | Teemo | +0.87 | 0.87 | 0.00 |  |
| 38 | Singed | +0.84 | 0.84 | 0.00 | grounding (Mega Adhesive) |
| 39 | Hwei | +0.81 | 0.81 | 0.00 | dash stop (Grim Visage) |
| 40 | Ahri | +0.80 | 0.80 | 0.00 | dash stop (Charm) |
| 41 | Cassiopeia | +0.80 | 0.80 | 0.00 | grounding (Miasma) |
| 42 | Lulu | +0.80 | 0.80 | 0.00 |  |
| 43 | Jinx | +0.79 | 0.79 | 0.00 | dash stop (Flame Chompers!) |
| 44 | Veigar | +0.77 | 0.77 | 0.00 | dash stop (Event Horizon) |
| 45 | Rell | +0.75 | 0.75 | 0.00 |  |
| 46 | Xin Zhao | +0.74 | 0.74 | 0.00 |  |
| 47 | Yone | +0.74 | 0.74 | 0.00 |  |
| 48 | K'Sante | +0.73 | 0.73 | 0.00 |  |
| 49 | Gnar | +0.63 | 0.63 | 0.00 |  |
| 50 | Malzahar | +0.62 | 1.42 | 0.80 |  |
| 51 | Nilah | +0.62 | 0.62 | 0.00 |  |
| 52 | Renata Glasc | +0.61 | 0.61 | 0.00 |  |
| 53 | Vayne | +0.58 | 0.58 | 0.00 |  |
| 54 | Anivia | +0.56 | 0.56 | 0.00 |  |
| 55 | Heimerdinger | +0.55 | 0.55 | 0.00 |  |
| 56 | Seraphine | +0.54 | 0.54 | 0.00 |  |
| 57 | Jax | +0.53 | 0.53 | 0.00 |  |
| 58 | Thresh | +0.52 | 0.52 | 0.00 |  |
| 59 | Draven | +0.51 | 0.51 | 0.00 |  |
| 60 | Sona | +0.51 | 0.51 | 0.00 |  |
| 61 | Ornn | +0.50 | 0.50 | 0.00 |  |
| 62 | Garen | +0.49 | 0.49 | 0.00 |  |
| 63 | Nami | +0.49 | 0.49 | 0.00 |  |
| 64 | Zilean | +0.49 | 0.49 | 0.00 |  |
| 65 | Blitzcrank | +0.48 | 0.48 | 0.00 |  |
| 66 | Elise | +0.48 | 0.48 | 0.00 |  |
| 67 | Sejuani | +0.48 | 0.48 | 0.00 |  |
| 68 | Kindred | +0.47 | 0.47 | 0.00 |  |
| 69 | Ashe | +0.46 | 0.46 | 0.00 |  |
| 70 | Jayce | +0.46 | 0.46 | 0.00 |  |
| 71 | Tristana | +0.46 | 0.46 | 0.00 |  |
| 72 | Zoe | +0.46 | 0.46 | 0.00 |  |
| 73 | Kennen | +0.45 | 0.45 | 0.00 |  |
| 74 | Amumu | +0.44 | 0.44 | 0.00 |  |
| 75 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 76 | Aphelios | +0.43 | 0.43 | 0.00 |  |
| 77 | Malphite | +0.43 | 0.43 | 0.00 |  |
| 78 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 79 | Brand | +0.42 | 0.42 | 0.00 |  |
| 80 | Ziggs | +0.42 | 0.42 | 0.00 |  |
| 81 | Sett | +0.40 | 0.40 | 0.00 |  |
| 82 | Soraka | +0.40 | 0.40 | 0.00 |  |
| 83 | Rakan | +0.39 | 0.39 | 0.00 |  |
| 84 | Urgot | +0.39 | 0.39 | 0.00 |  |
| 85 | Annie | +0.38 | 0.38 | 0.00 |  |
| 86 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 87 | Azir | +0.37 | 0.37 | 0.00 |  |
| 88 | Cho'Gath | +0.37 | 0.37 | 0.00 |  |
| 89 | Orianna | +0.37 | 0.37 | 0.00 |  |
| 90 | Swain | +0.37 | 0.37 | 0.00 |  |
| 91 | Volibear | +0.37 | 0.37 | 0.00 |  |
| 92 | Syndra | +0.36 | 0.36 | 0.00 |  |
| 93 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 94 | Aurelion Sol | +0.34 | 0.48 | 0.14 |  |
| 95 | Zyra | +0.34 | 0.34 | 0.00 |  |
| 96 | Poppy | +0.33 | 0.73 | 0.40 | dash stop (Steadfast Presence) |
| 97 | Leona | +0.33 | 0.33 | 0.00 |  |
| 98 | Riven | +0.33 | 0.33 | 0.00 |  |
| 99 | Corki | +0.32 | 0.32 | 0.00 |  |
| 100 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 101 | Neeko | +0.32 | 0.32 | 0.00 |  |
| 102 | Senna | +0.32 | 0.32 | 0.00 |  |
| 103 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 104 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 105 | Lux | +0.29 | 0.29 | 0.00 |  |
| 106 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 107 | Kayn | +0.28 | 1.18 | 0.90 |  |
| 108 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 109 | Shyvana | +0.27 | 0.27 | 0.00 |  |
| 110 | Warwick | +0.26 | 1.49 | 1.23 |  |
| 111 | Hecarim | +0.25 | 0.25 | 0.00 |  |
| 112 | Rammus | +0.24 | 0.64 | 0.40 |  |
| 113 | Graves | +0.24 | 0.24 | 0.00 |  |
| 114 | Jarvan IV | +0.24 | 0.24 | 0.00 |  |
| 115 | Mordekaiser | +0.24 | 0.24 | 0.00 |  |
| 116 | Quinn | +0.23 | 0.55 | 0.32 |  |
| 117 | Varus | +0.22 | 0.39 | 0.17 |  |
| 118 | Karma | +0.22 | 0.22 | 0.00 |  |
| 119 | LeBlanc | +0.22 | 0.22 | 0.00 |  |
| 120 | Illaoi | +0.21 | 0.21 | 0.00 |  |
| 121 | Irelia | +0.21 | 0.21 | 0.00 |  |
| 122 | Lillia | +0.21 | 0.21 | 0.00 |  |
| 123 | Aatrox | +0.20 | 0.20 | 0.00 |  |
| 124 | Zac | +0.19 | 0.86 | 0.67 | dash stop (Stretching Strikes) |
| 125 | Kassadin | +0.19 | 0.19 | 0.00 |  |
| 126 | Viego | +0.18 | 0.50 | 0.32 |  |
| 127 | Bel'Veth | +0.17 | 0.17 | 0.00 |  |
| 128 | Renekton | +0.17 | 0.17 | 0.00 |  |
| 129 | Skarner | +0.16 | 0.16 | 0.00 |  |
| 130 | Sylas | +0.16 | 0.16 | 0.00 |  |
| 131 | Taric | +0.15 | 0.15 | 0.00 |  |
| 132 | Yorick | +0.15 | 0.15 | 0.00 |  |
| 133 | Trundle | +0.14 | 0.14 | 0.00 |  |
| 134 | Darius | +0.13 | 0.13 | 0.00 |  |
| 135 | Pyke | +0.10 | 0.32 | 0.22 |  |
| 136 | Ambessa | +0.10 | 0.10 | 0.00 |  |
| 137 | Briar | +0.10 | 0.10 | 0.00 |  |
| 138 | Diana | +0.10 | 0.10 | 0.00 |  |
| 139 | Lee Sin | +0.10 | 0.10 | 0.00 |  |
| 140 | Wukong | +0.10 | 0.10 | 0.00 |  |
| 141 | Nautilus | +0.10 | 0.10 | 0.00 |  |
| 142 | Qiyana | +0.10 | 0.10 | 0.00 |  |
| 143 | Akali | 0.00 | 0.00 | 0.00 |  |
| 144 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 145 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 146 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 147 | Locke | 0.00 | 0.00 | 0.00 |  |
| 148 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 149 | Talon | 0.00 | 0.00 | 0.00 |  |
| 150 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 151 | Ivern | -0.02 | 0.19 | 0.21 |  |
| 152 | Twisted Fate | -0.07 | 0.63 | 0.70 |  |
| 153 | Vel'Koz | -0.13 | 0.43 | 0.56 |  |
| 154 | Vi | -0.14 | 0.44 | 0.58 |  |
| 155 | Janna | -0.20 | 0.60 | 0.80 |  |
| 156 | Xerath | -0.20 | 0.42 | 0.62 |  |
| 157 | Caitlyn | -0.20 | 0.36 | 0.56 |  |
| 158 | Lucian | -0.20 | 0.36 | 0.56 |  |
| 159 | Akshan | -0.22 | 0.34 | 0.56 |  |
| 160 | Miss Fortune | -0.24 | 0.32 | 0.56 |  |
| 161 | Shen | -0.27 | 0.63 | 0.90 |  |
| 162 | Taliyah | -0.28 | 0.68 | 0.96 |  |
| 163 | Tahm Kench | -0.28 | 0.49 | 0.77 |  |
| 164 | Jhin | -0.29 | 0.27 | 0.56 |  |
| 165 | Pantheon | -0.30 | 0.67 | 0.97 |  |
| 166 | Fiddlesticks | -0.31 | 0.54 | 0.85 |  |
| 167 | Karthus | -0.37 | 0.19 | 0.56 |  |
| 168 | Katarina | -0.38 | 0.12 | 0.50 |  |
| 169 | Ryze | -0.46 | 0.24 | 0.70 |  |
| 170 | Nunu & Willump | -0.66 | 0.20 | 0.86 |  |
| 171 | Galio | -0.71 | 0.42 | 1.13 |  |
| 172 | Naafiri | -0.90 | 0.00 | 0.90 |  |
