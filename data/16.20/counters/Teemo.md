# Counters to Teemo (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 44 other champions with a simulator kit against Teemo: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Teemo wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Teemo --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +1.00 |
| 2 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 3 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 4 | Dr. Mundo | +0.74 | +0.99 | +0.96 | +0.99 | −0.18 | +0.82 | +0.00 |
| 5 | Malphite | +0.74 | +1.00 | +1.00 | +1.00 | −0.40 | +1.00 | +0.00 |
| 6 | Trundle | +0.69 | +1.00 | +1.00 | +1.00 | −0.74 | +1.00 | +0.00 |
| 7 | Jax | +0.55 | +0.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 8 | Fiora | +0.53 | +1.00 | +1.00 | +1.00 | −0.47 | −1.00 | +0.00 |
| 9 | Tahm Kench | −0.02 | −0.07 | +0.03 | +0.04 | −0.12 | +0.04 | +0.00 |
| 10 | Ornn | −0.13 | −0.12 | −0.15 | −0.10 | −0.15 | −0.24 | +0.00 |
| 11 | Poppy | −0.30 | −1.00 | +1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 12 | Sion | −0.33 | −0.42 | −0.62 | −0.06 | −0.05 | −0.47 | +0.00 |
| 13 | Jayce | −0.60 | −1.00 | −1.00 | +0.00 | −0.03 | −1.00 | +0.00 |
| 14 | Yone | −0.64 | −1.00 | −0.08 | −1.00 | −0.49 | −1.00 | +0.00 |
| 15 | Mordekaiser | −0.65 | −0.81 | −0.74 | −0.67 | −0.28 | −0.83 | +0.00 |
| 16 | Shen | −0.73 | −1.00 | −1.00 | −0.63 | −0.04 | −1.00 | +0.00 |
| 17 | Aurora | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 18 | Quinn | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 19 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 20 | Kennen | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 21 | Irelia | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 22 | Renekton | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 23 | Gnar | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 24 | Pantheon | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 25 | Urgot | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 26 | Kled | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 27 | Rumble | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 28 | Yasuo | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 29 | Tryndamere | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.00 |
| 30 | Camille | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.00 |
| 31 | Sett | −0.85 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.00 |
| 32 | Gwen | −0.86 | −1.00 | −1.00 | −1.00 | −0.37 | −1.00 | +0.00 |
| 33 | Zaahen | −0.86 | −1.00 | −1.00 | −1.00 | −0.42 | −1.00 | +0.00 |
| 34 | Udyr | −0.87 | −1.00 | −1.00 | −1.00 | −0.44 | −1.00 | +0.00 |
| 35 | Akali | −0.88 | −1.00 | −1.00 | −1.00 | −0.50 | −1.00 | +0.00 |
| 36 | Aatrox | −0.88 | −1.00 | −1.00 | −1.00 | −0.50 | −1.00 | +0.00 |
| 37 | Darius | −0.88 | −1.00 | −1.00 | −1.00 | −0.53 | −1.00 | +0.00 |
| 38 | Ambessa | −0.89 | −1.00 | −1.00 | −1.00 | −0.57 | −1.00 | +0.00 |
| 39 | Cho'Gath | −0.89 | −1.00 | −1.00 | −1.00 | −0.62 | −1.00 | +0.00 |
| 40 | Volibear | −0.91 | −1.00 | −1.00 | −1.00 | −0.72 | −1.00 | +0.00 |
| 41 | Garen | −0.92 | −1.00 | −1.00 | −1.00 | −0.83 | −1.00 | +0.00 |
| 42 | Olaf | −0.93 | −1.00 | −1.00 | −1.00 | −0.85 | −1.00 | +0.00 |
| 43 | Riven | −0.95 | −1.00 | −1.00 | −1.00 | −1.00 | −1.00 | +0.00 |
| 44 | Singed | −0.95 | −1.00 | −1.00 | −1.00 | −1.00 | −1.00 | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Teemo's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Teemo's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Teemo` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Vladimir (net +0.41)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Teemo's Noxious Trap. Untargetable for 2 s, long enough to use ahead of Noxious Trap. (Vladimir W Sanguine Pool → Teemo R Noxious Trap)
- **0.30** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Teemo's Blinding Dart. Untargetable for 2 s, long enough to use ahead of Blinding Dart. (Vladimir W Sanguine Pool → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Vladimir's basic attacks miss for 3 s.

#### 2. Mel (net +0.40)

- **0.54** projectile block: Rebuttal blocks Teemo's Noxious Trap, a projectile. Rebuttal for 0.75 s; Noxious Trap takes 0.25 s to land, enough to react. (Mel W Rebuttal → Teemo R Noxious Trap)
- **0.30** projectile block: Rebuttal blocks Teemo's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Teemo basic attacks)
- **0.25** projectile block: Rebuttal blocks Teemo's Blinding Dart, a projectile. Rebuttal for 0.75 s; Blinding Dart takes 0.52 s to land, enough to react. (Mel W Rebuttal → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Mel's basic attacks miss for 3 s.

#### 3. Elise (net +0.34)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Teemo's Noxious Trap. Untargetable for 0.6 s; Noxious Trap takes 0.25 s to land, enough to react. (Elise E Rappel → Teemo R Noxious Trap)
- **0.28** untargetable: Rappel makes Elise untargetable, dodging Teemo's Blinding Dart. Untargetable for 0.6 s; Blinding Dart takes 0.52 s to land, enough to react. (Elise E Rappel → Teemo Q Blinding Dart)
- **0.08** reveal: Cocoon reveals Teemo through Guerrilla Warfare's stealth. (Elise E Cocoon → Teemo I Guerrilla Warfare)
- Watch out: Blinding Dart's blind makes Elise's basic attacks miss for 3 s.

#### 4. Samira (net +0.34)

- **0.55** projectile block: Blade Whirl blocks Teemo's Noxious Trap, a projectile. Blade Whirl for 0.75 s; Noxious Trap takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Teemo R Noxious Trap)
- **0.30** projectile block: Blade Whirl blocks Teemo's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Teemo basic attacks)
- **0.27** projectile block: Blade Whirl blocks Teemo's Blinding Dart, a projectile. Blade Whirl for 0.75 s; Blinding Dart takes 0.52 s to land, enough to react. (Samira W Blade Whirl → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Samira's basic attacks miss for 3 s.

#### 5. Yasuo (net +0.33)

- **0.55** projectile block: Wind Wall blocks Teemo's Noxious Trap, a projectile. Wind Wall for 4 s, long enough to use ahead of Noxious Trap. (Yasuo W Wind Wall → Teemo R Noxious Trap)
- **0.39** projectile block: Wind Wall blocks Teemo's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Teemo basic attacks)
- **0.29** projectile block: Wind Wall blocks Teemo's Blinding Dart, a projectile. Wind Wall for 4 s, long enough to use ahead of Blinding Dart. (Yasuo W Wind Wall → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Yasuo's basic attacks miss for 3 s.

#### 6. Braum (net +0.14)

- **0.55** projectile block: Unbreakable blocks Teemo's Noxious Trap, a projectile. Unbreakable for 4 s, long enough to use ahead of Noxious Trap. (Braum E Unbreakable → Teemo R Noxious Trap)
- **0.50** projectile block: Unbreakable blocks Teemo's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Teemo basic attacks)
- **0.42** projectile block: Unbreakable blocks Teemo's Blinding Dart, a projectile. Unbreakable for 4 s, long enough to use ahead of Blinding Dart. (Braum E Unbreakable → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Braum's basic attacks miss for 3 s.

#### 7. Yuumi (net +0.14)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Teemo's Noxious Trap. Untargetable for ?; Noxious Trap takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Teemo R Noxious Trap)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Teemo's Blinding Dart. Untargetable for ?; Blinding Dart takes 0.52 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Yuumi's basic attacks miss for 3 s.

#### 8. Lissandra (net +0.13)

- **0.32** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Teemo's Noxious Trap. Untargetable for 2.5 s, long enough to use ahead of Noxious Trap. (Lissandra R Frozen Tomb → Teemo R Noxious Trap)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Teemo's Blinding Dart. Untargetable for 2.5 s, long enough to use ahead of Blinding Dart. (Lissandra R Frozen Tomb → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Lissandra's basic attacks miss for 3 s.

#### 9. Maokai (net +0.05)

- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Teemo's Noxious Trap. Untargetable for 1.4 s; Noxious Trap takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Teemo R Noxious Trap)
- **0.37** untargetable: Twisted Advance makes Maokai untargetable, dodging Teemo's Blinding Dart. Untargetable for 1.4 s; Blinding Dart takes 0.52 s to land, enough to react. (Maokai W Twisted Advance → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Maokai's basic attacks miss for 3 s.

#### 10. Aurora (net +0.02)

- **0.30** untargetable: Between Worlds makes Aurora untargetable, dodging Teemo's Noxious Trap. Untargetable for 0.4 s; Noxious Trap takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Teemo R Noxious Trap)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Teemo's Blinding Dart. Untargetable for 0.4 s; Blinding Dart takes 0.52 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Aurora's basic attacks miss for 3 s.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Vladimir | +0.41 | 0.70 | 0.29 |  |
| 2 | Mel | +0.40 | 0.75 | 0.35 | projectile block (Rebuttal) |
| 3 | Elise | +0.34 | 0.77 | 0.43 |  |
| 4 | Samira | +0.34 | 0.77 | 0.43 | projectile block (Blade Whirl) |
| 5 | Yasuo | +0.33 | 0.90 | 0.57 | projectile block (Wind Wall) |
| 6 | Braum | +0.14 | 0.91 | 0.77 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Yuumi | +0.14 | 0.78 | 0.64 |  |
| 8 | Lissandra | +0.13 | 0.42 | 0.29 |  |
| 9 | Maokai | +0.05 | 0.74 | 0.69 |  |
| 10 | Aurora | +0.02 | 0.40 | 0.38 |  |
| 11 | Morgana | +0.02 | 0.33 | 0.31 |  |
| 12 | Master Yi | -0.01 | 0.78 | 0.79 |  |
| 13 | Fiora | -0.03 | 0.72 | 0.75 |  |
| 14 | Malzahar | -0.03 | 0.26 | 0.29 |  |
| 15 | Lulu | -0.05 | 0.42 | 0.47 |  |
| 16 | Kayn | -0.06 | 0.44 | 0.50 |  |
| 17 | Bard | -0.08 | 0.42 | 0.50 |  |
| 18 | Gwen | -0.10 | 0.69 | 0.79 |  |
| 19 | Xayah | -0.10 | 0.40 | 0.50 |  |
| 20 | Kayle | -0.11 | 0.43 | 0.54 |  |
| 21 | Tristana | -0.11 | 0.36 | 0.47 |  |
| 22 | Caitlyn | -0.12 | 0.35 | 0.47 |  |
| 23 | Zyra | -0.14 | 0.17 | 0.31 |  |
| 24 | Ekko | -0.15 | 0.50 | 0.65 |  |
| 25 | Evelynn | -0.15 | 0.42 | 0.57 |  |
| 26 | Annie | -0.15 | 0.14 | 0.29 |  |
| 27 | Anivia | -0.19 | 0.12 | 0.31 |  |
| 28 | Zed | -0.20 | 0.40 | 0.60 |  |
| 29 | Heimerdinger | -0.20 | 0.06 | 0.26 |  |
| 30 | Fiddlesticks | -0.21 | 0.08 | 0.29 |  |
| 31 | Karma | -0.21 | 0.08 | 0.29 |  |
| 32 | LeBlanc | -0.21 | 0.08 | 0.29 |  |
| 33 | Hwei | -0.22 | 0.08 | 0.30 |  |
| 34 | Rek'Sai | -0.23 | 0.44 | 0.67 |  |
| 35 | Shaco | -0.23 | 0.42 | 0.65 |  |
| 36 | Thresh | -0.23 | 0.08 | 0.31 |  |
| 37 | Sivir | -0.24 | 0.42 | 0.66 |  |
| 38 | Varus | -0.25 | 0.10 | 0.35 |  |
| 39 | Camille | -0.26 | 0.41 | 0.67 |  |
| 40 | Senna | -0.27 | 0.16 | 0.43 |  |
| 41 | Vex | -0.27 | 0.08 | 0.35 |  |
| 42 | Swain | -0.27 | 0.00 | 0.27 |  |
| 43 | Ashe | -0.29 | 0.18 | 0.47 |  |
| 44 | Ahri | -0.29 | 0.00 | 0.29 |  |
| 45 | Aurelion Sol | -0.29 | 0.00 | 0.29 |  |
| 46 | Brand | -0.29 | 0.00 | 0.29 |  |
| 47 | Cassiopeia | -0.29 | 0.00 | 0.29 |  |
| 48 | Ivern | -0.29 | 0.00 | 0.29 |  |
| 49 | Nami | -0.29 | 0.00 | 0.29 |  |
| 50 | Neeko | -0.29 | 0.00 | 0.29 |  |
| 51 | Syndra | -0.29 | 0.00 | 0.29 |  |
| 52 | Kalista | -0.31 | 0.12 | 0.43 |  |
| 53 | Nidalee | -0.31 | 0.08 | 0.39 |  |
| 54 | Karthus | -0.31 | 0.00 | 0.31 |  |
| 55 | Ryze | -0.31 | 0.00 | 0.31 |  |
| 56 | Veigar | -0.31 | 0.00 | 0.31 |  |
| 57 | Yunara | -0.33 | 0.14 | 0.47 |  |
| 58 | Milio | -0.35 | 0.15 | 0.50 |  |
| 59 | Azir | -0.35 | 0.00 | 0.35 |  |
| 60 | Jhin | -0.35 | 0.00 | 0.35 |  |
| 61 | Orianna | -0.35 | 0.00 | 0.35 |  |
| 62 | Soraka | -0.35 | 0.00 | 0.35 |  |
| 63 | Taliyah | -0.35 | 0.00 | 0.35 |  |
| 64 | Vel'Koz | -0.35 | 0.00 | 0.35 |  |
| 65 | Xerath | -0.35 | 0.00 | 0.35 |  |
| 66 | Ziggs | -0.35 | 0.00 | 0.35 |  |
| 67 | Nocturne | -0.36 | 0.48 | 0.84 |  |
| 68 | Rammus | -0.36 | 0.36 | 0.72 |  |
| 69 | Jinx | -0.38 | 0.00 | 0.38 |  |
| 70 | Kennen | -0.38 | 0.00 | 0.38 |  |
| 71 | Kog'Maw | -0.38 | 0.00 | 0.38 |  |
| 72 | Lux | -0.38 | 0.00 | 0.38 |  |
| 73 | Seraphine | -0.38 | 0.00 | 0.38 |  |
| 74 | Akshan | -0.39 | 0.08 | 0.47 |  |
| 75 | Corki | -0.39 | 0.00 | 0.39 |  |
| 76 | Kled | -0.41 | 0.24 | 0.65 |  |
| 77 | Urgot | -0.41 | 0.08 | 0.49 |  |
| 78 | Kai'Sa | -0.42 | 0.08 | 0.50 |  |
| 79 | Renata Glasc | -0.42 | 0.08 | 0.50 |  |
| 80 | Jayce | -0.43 | 0.00 | 0.43 |  |
| 81 | Miss Fortune | -0.43 | 0.00 | 0.43 |  |
| 82 | Smolder | -0.43 | 0.00 | 0.43 |  |
| 83 | Zilean | -0.43 | 0.00 | 0.43 |  |
| 84 | Zoe | -0.43 | 0.00 | 0.43 |  |
| 85 | Sylas | -0.45 | 0.08 | 0.53 |  |
| 86 | Gnar | -0.45 | 0.00 | 0.45 |  |
| 87 | Lillia | -0.45 | 0.00 | 0.45 |  |
| 88 | Kindred | -0.47 | 0.19 | 0.66 |  |
| 89 | Ambessa | -0.47 | 0.08 | 0.55 |  |
| 90 | Naafiri | -0.47 | 0.08 | 0.55 |  |
| 91 | Draven | -0.47 | 0.00 | 0.47 |  |
| 92 | Janna | -0.47 | 0.00 | 0.47 |  |
| 93 | Malphite | -0.48 | 0.24 | 0.72 |  |
| 94 | Graves | -0.48 | 0.00 | 0.48 |  |
| 95 | Lee Sin | -0.49 | 0.08 | 0.57 |  |
| 96 | Lucian | -0.50 | 0.00 | 0.50 |  |
| 97 | Quinn | -0.50 | 0.00 | 0.50 |  |
| 98 | Rakan | -0.50 | 0.00 | 0.50 |  |
| 99 | Yone | -0.50 | 0.00 | 0.50 |  |
| 100 | Shen | -0.51 | 0.36 | 0.87 |  |
| 101 | Warwick | -0.51 | 0.18 | 0.69 |  |
| 102 | Fizz | -0.51 | 0.08 | 0.59 |  |
| 103 | Ezreal | -0.51 | 0.00 | 0.51 |  |
| 104 | Akali | -0.52 | 0.08 | 0.60 |  |
| 105 | Udyr | -0.54 | 0.34 | 0.88 |  |
| 106 | Aphelios | -0.54 | 0.06 | 0.60 |  |
| 107 | Ornn | -0.54 | 0.00 | 0.54 |  |
| 108 | Sona | -0.54 | 0.00 | 0.54 |  |
| 109 | Galio | -0.56 | 0.00 | 0.56 |  |
| 110 | Jax | -0.57 | 0.38 | 0.95 |  |
| 111 | Twitch | -0.57 | 0.00 | 0.57 |  |
| 112 | Vayne | -0.57 | 0.00 | 0.57 |  |
| 113 | Nilah | -0.58 | 0.33 | 0.91 |  |
| 114 | Viktor | -0.58 | 0.00 | 0.58 |  |
| 115 | Zeri | -0.58 | 0.00 | 0.58 |  |
| 116 | Pantheon | -0.59 | 0.35 | 0.94 |  |
| 117 | Pyke | -0.59 | 0.00 | 0.59 |  |
| 118 | Qiyana | -0.60 | 0.00 | 0.60 |  |
| 119 | Hecarim | -0.62 | 0.00 | 0.62 |  |
| 120 | Irelia | -0.62 | 0.00 | 0.62 |  |
| 121 | Jarvan IV | -0.62 | 0.00 | 0.62 |  |
| 122 | Illaoi | -0.64 | 0.08 | 0.72 |  |
| 123 | Kha'Zix | -0.65 | 0.00 | 0.65 |  |
| 124 | Diana | -0.67 | 0.00 | 0.67 |  |
| 125 | Tahm Kench | -0.67 | 0.00 | 0.67 |  |
| 126 | Amumu | -0.69 | 0.00 | 0.69 |  |
| 127 | Poppy | -0.69 | 0.00 | 0.69 |  |
| 128 | Talon | -0.69 | 0.00 | 0.69 |  |
| 129 | Kassadin | -0.70 | 0.00 | 0.70 |  |
| 130 | Shyvana | -0.70 | 0.00 | 0.70 |  |
| 131 | Zaahen | -0.71 | 0.16 | 0.87 |  |
| 132 | Aatrox | -0.71 | 0.08 | 0.79 |  |
| 133 | Bel'Veth | -0.71 | 0.00 | 0.71 |  |
| 134 | Twisted Fate | -0.72 | 0.08 | 0.80 |  |
| 135 | Leona | -0.72 | 0.00 | 0.72 |  |
| 136 | Nautilus | -0.72 | 0.00 | 0.72 |  |
| 137 | Riven | -0.72 | 0.00 | 0.72 |  |
| 138 | K'Sante | -0.73 | 0.00 | 0.73 |  |
| 139 | Nasus | -0.75 | 0.36 | 1.11 |  |
| 140 | Sejuani | -0.75 | 0.00 | 0.75 |  |
| 141 | Sion | -0.76 | 0.18 | 0.94 |  |
| 142 | Alistar | -0.76 | 0.13 | 0.89 |  |
| 143 | Vi | -0.76 | 0.08 | 0.84 |  |
| 144 | Briar | -0.77 | 0.08 | 0.85 |  |
| 145 | Sett | -0.77 | 0.08 | 0.85 |  |
| 146 | Katarina | -0.77 | 0.00 | 0.77 |  |
| 147 | Viego | -0.80 | 0.00 | 0.80 |  |
| 148 | Gangplank | -0.85 | 0.21 | 1.06 |  |
| 149 | Nunu & Willump | -0.86 | 0.17 | 1.03 |  |
| 150 | Zac | -0.86 | 0.08 | 0.94 |  |
| 151 | Tryndamere | -0.86 | 0.00 | 0.86 |  |
| 152 | Gragas | -0.87 | 0.00 | 0.87 |  |
| 153 | Mordekaiser | -0.89 | 0.13 | 1.02 |  |
| 154 | Xin Zhao | -0.90 | 0.20 | 1.10 |  |
| 155 | Taric | -0.94 | 0.19 | 1.13 |  |
| 156 | Skarner | -0.94 | 0.12 | 1.06 |  |
| 157 | Locke | -0.97 | 0.00 | 0.97 |  |
| 158 | Wukong | -1.00 | 0.00 | 1.00 |  |
| 159 | Olaf | -1.02 | 0.16 | 1.18 |  |
| 160 | Renekton | -1.02 | 0.00 | 1.02 |  |
| 161 | Garen | -1.03 | 0.28 | 1.31 |  |
| 162 | Singed | -1.03 | 0.00 | 1.03 |  |
| 163 | Rengar | -1.04 | 0.32 | 1.36 |  |
| 164 | Cho'Gath | -1.06 | 0.00 | 1.06 |  |
| 165 | Rumble | -1.06 | 0.00 | 1.06 |  |
| 166 | Rell | -1.08 | 0.00 | 1.08 |  |
| 167 | Volibear | -1.09 | 0.00 | 1.09 |  |
| 168 | Darius | -1.21 | 0.00 | 1.21 |  |
| 169 | Trundle | -1.22 | 0.00 | 1.22 |  |
| 170 | Dr. Mundo | -1.26 | 0.00 | 1.26 |  |
| 171 | Yorick | -1.27 | 0.00 | 1.27 |  |
| 172 | Blitzcrank | -1.38 | 0.00 | 1.38 |  |
