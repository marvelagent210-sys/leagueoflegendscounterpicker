# Counters to Samira (patch 26.20)

## Simulated duels

The duel simulator played each of the 90 other champions with a simulator kit against Samira: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Samira wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Samira --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.88 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +1.00 |
| 2 | Udyr | +0.88 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +1.00 |
| 3 | Fiora | +0.86 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +1.00 |
| 4 | Master Yi | +0.86 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +1.00 |
| 5 | Trundle | +0.85 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +1.00 |
| 6 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +1.00 |
| 7 | Poppy | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 8 | Darius | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 9 | Gangplank | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 10 | Urgot | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 11 | Malphite | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 12 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 13 | Skarner | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 14 | Cho'Gath | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 15 | Garen | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 16 | Renekton | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 17 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 18 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 19 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 20 | Ashe | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 21 | Illaoi | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +0.99 | +0.00 |
| 22 | Camille | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 23 | Tahm Kench | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 24 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 25 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 26 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 27 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 28 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 29 | Kalista | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 30 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 31 | Annie | +0.77 | +1.00 | +1.00 | +0.78 | +0.07 | +1.00 | +0.00 |
| 32 | Vayne | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 33 | Yasuo | +0.75 | +1.00 | +1.00 | +0.98 | −0.01 | +0.54 | +0.00 |
| 34 | Mordekaiser | +0.74 | +1.00 | +1.00 | +0.95 | −0.05 | +0.61 | +0.00 |
| 35 | Sion | +0.73 | +0.98 | +0.83 | +0.92 | −0.05 | +1.00 | +0.00 |
| 36 | Volibear | +0.68 | +1.00 | +0.48 | +1.00 | +0.07 | +1.00 | +0.00 |
| 37 | Gwen | +0.58 | +0.99 | +0.99 | +0.05 | −0.19 | +1.00 | +0.00 |
| 38 | Jayce | +0.47 | +1.00 | +0.26 | +0.25 | +0.05 | +1.00 | +0.00 |
| 39 | Cassiopeia | +0.42 | +1.00 | +1.00 | −0.59 | −0.04 | – | +0.00 |
| 40 | Yone | +0.41 | +0.99 | +0.97 | −0.41 | −0.00 | +0.05 | +0.00 |
| 41 | Sett | +0.40 | +1.00 | +1.00 | −1.00 | +0.00 | +1.00 | +0.00 |
| 42 | Olaf | +0.40 | +0.15 | +1.00 | +1.00 | −0.07 | −0.80 | +0.00 |
| 43 | Kennen | +0.38 | +1.00 | +1.00 | −0.81 | +0.03 | – | +0.00 |
| 44 | Ziggs | +0.35 | +1.00 | +1.00 | −0.99 | +0.08 | – | +0.00 |
| 45 | Jhin | +0.35 | +1.00 | +1.00 | −1.00 | +0.07 | – | +0.00 |
| 46 | Jinx | +0.34 | +1.00 | +1.00 | −1.00 | +0.03 | – | +0.00 |
| 47 | Malzahar | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 48 | Miss Fortune | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 49 | Xayah | +0.34 | +1.00 | +1.00 | −1.00 | +0.01 | – | +0.00 |
| 50 | Aurora | +0.33 | +1.00 | +1.00 | −1.00 | −0.04 | – | +0.00 |
| 51 | Draven | +0.33 | +1.00 | +1.00 | −1.00 | −0.04 | – | +0.00 |
| 52 | Vel'Koz | +0.32 | +1.00 | +0.95 | −1.00 | +0.02 | – | +0.00 |
| 53 | Riven | +0.29 | +1.00 | −1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 54 | Xin Zhao | +0.26 | +0.52 | +0.52 | −0.42 | −0.08 | +1.00 | +0.00 |
| 55 | Caitlyn | +0.25 | +1.00 | +0.38 | −1.00 | +0.06 | +1.00 | +0.00 |
| 56 | Gnar | +0.12 | +0.33 | +0.33 | −0.31 | −0.02 | +0.18 | +0.00 |
| 57 | Anivia | +0.11 | +0.21 | +0.33 | +0.08 | −0.23 | −0.01 | +0.00 |
| 58 | Aatrox | +0.08 | −1.00 | +0.99 | +0.92 | −0.02 | −0.98 | +0.00 |
| 59 | Tristana | +0.03 | +1.00 | −0.53 | −1.00 | +0.08 | +1.00 | +0.00 |
| 60 | Varus | −0.04 | −0.37 | +1.00 | −1.00 | +0.04 | – | +0.00 |
| 61 | Ornn | −0.19 | −0.12 | +0.53 | −1.00 | +0.06 | −1.00 | +0.00 |
| 62 | Quinn | −0.40 | −0.29 | −0.31 | −1.00 | −0.09 | – | +0.00 |
| 63 | Teemo | −0.41 | −0.20 | −1.00 | −0.30 | −0.06 | – | +0.00 |
| 64 | Rammus | −0.44 | −0.30 | −1.00 | −1.00 | −0.11 | +1.00 | +0.00 |
| 65 | Karthus | −0.50 | −1.00 | +0.00 | −0.99 | −0.04 | – | +0.00 |
| 66 | Ambessa | −0.59 | −1.00 | −1.00 | −1.00 | +0.07 | +1.00 | +0.00 |
| 67 | Pantheon | −0.60 | −1.00 | −1.00 | −1.00 | −0.00 | +1.00 | +0.00 |
| 68 | Kassadin | −0.60 | −1.00 | −1.00 | −1.00 | −0.03 | +1.00 | +0.00 |
| 69 | Lux | −0.62 | −0.41 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 70 | Zyra | −0.70 | −0.99 | −0.74 | −1.00 | +0.02 | – | +0.00 |
| 71 | Akali | −0.73 | −1.00 | −1.00 | −1.00 | −0.04 | −0.25 | +0.00 |
| 72 | Twitch | −0.76 | −1.00 | −0.92 | −1.00 | −0.04 | – | +0.00 |
| 73 | Kai'Sa | −0.77 | −0.95 | −0.99 | −1.00 | −0.04 | – | +0.00 |
| 74 | Brand | −0.77 | −1.00 | −0.96 | −1.00 | −0.03 | – | +0.00 |
| 75 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 76 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 77 | Ezreal | −0.78 | −0.99 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 78 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 79 | Sivir | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 80 | Irelia | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | −0.80 | +0.00 |
| 81 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 82 | Vladimir | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 83 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 84 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 85 | Rumble | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | −0.91 | +0.00 |
| 86 | Smolder | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 87 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 88 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 89 | Singed | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 90 | Morgana | −0.82 | −1.00 | −1.00 | −1.00 | −0.25 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Samira's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Samira's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Samira` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Vladimir (net +0.41)

- **0.51** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Samira's Wild Rush. Untargetable for 2 s, long enough to use ahead of Wild Rush. (Vladimir W Sanguine Pool → Samira E Wild Rush)
- **0.32** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Samira's Inferno Trigger. Untargetable for 2 s, long enough to use ahead of Inferno Trigger. (Vladimir W Sanguine Pool → Samira R Inferno Trigger)
- Watch out: Blade Whirl blocks Vladimir's basic attacks, which are projectiles.

#### 2. Pantheon (net +0.38)

- **0.48** invulnerable: Aegis Assault makes Pantheon invulnerable to Samira's Wild Rush. Invulnerable for 1.5 s, long enough to use ahead of Wild Rush. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Samira E Wild Rush)
- **0.31** invulnerable: Aegis Assault makes Pantheon invulnerable to Samira's Inferno Trigger. Invulnerable for 1.5 s, long enough to use ahead of Inferno Trigger. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Samira R Inferno Trigger)
- Watch out: Samira's basic attacks reach 325 units farther than Pantheon's (500 vs 175 attack range).

#### 3. Master Yi (net +0.31)

- **0.48** untargetable: Alpha Strike makes Master Yi untargetable, dodging Samira's Wild Rush. Untargetable for ?; Wild Rush takes 0.41 s to land, enough to react. (Master Yi Q Alpha Strike → Samira E Wild Rush)
- **0.19** untargetable: Alpha Strike makes Master Yi untargetable, dodging Samira's Inferno Trigger. Untargetable for ?; Inferno Trigger lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Samira R Inferno Trigger)
- Watch out: Samira's basic attacks reach 325 units farther than Master Yi's (500 vs 175 attack range).

#### 4. Malzahar (net +0.24)

- **0.22** cc immunity: Void Shift makes Malzahar immune to Samira's Daredevil Impulse (airborne). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Samira I Daredevil Impulse)
- **0.15** dash stop: Nether Grasp's knockdown can stop Samira's Wild Rush mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Malzahar R Nether Grasp → Samira E Wild Rush)
- **0.11** dash stop: Nether Grasp's knockdown can stop Samira's Daredevil Impulse mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Malzahar R Nether Grasp → Samira I Daredevil Impulse)
- Watch out: Blade Whirl blocks Malzahar's basic attacks, which are projectiles.

#### 5. Camille (net +0.23)

- **0.29** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Samira's Wild Rush. Untargetable for 0.5 s; Wild Rush takes 0.41 s to land, enough to react. (Camille R The Hextech Ultimatum → Samira E Wild Rush)
- **0.14** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Samira's Inferno Trigger. Untargetable for 0.5 s; Inferno Trigger lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Camille R The Hextech Ultimatum → Samira R Inferno Trigger)
- **0.09** cc immunity: The Hextech Ultimatum is displacement immune, ignoring Samira's Daredevil Impulse (airborne) during it. Only during The Hextech Ultimatum (0.5 s). (Camille R The Hextech Ultimatum → Samira I Daredevil Impulse)
- Watch out: Samira's basic attacks reach 375 units farther than Camille's (500 vs 125 attack range).

#### 6. Warwick (net +0.21)

- **0.22** cc immunity: Infinite Duress makes Warwick immune to Samira's Daredevil Impulse (airborne). Immune for ?; Daredevil Impulse takes 0.46 s to land, enough to react. (Warwick R Infinite Duress → Samira I Daredevil Impulse)
- **0.15** dash stop: Infinite Duress's knockdown can stop Samira's Wild Rush mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Warwick R Infinite Duress → Samira E Wild Rush)
- **0.11** dash stop: Infinite Duress's knockdown can stop Samira's Daredevil Impulse mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Warwick R Infinite Duress → Samira I Daredevil Impulse)
- Watch out: Samira's basic attacks reach 375 units farther than Warwick's (500 vs 125 attack range).

#### 7. Nocturne (net +0.20)

- **0.60** spell shield: Shroud of Darkness's spell shield blocks Samira's Wild Rush. Spell shield for 1.5 s, long enough to use ahead of Wild Rush. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Samira E Wild Rush)
- **0.18** spell shield: Shroud of Darkness's spell shield blocks part of Samira's Inferno Trigger. Spell shield for 1.5 s, long enough to use ahead of Inferno Trigger. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the damage of one shot. (Nocturne W Shroud of Darkness → Samira R Inferno Trigger)
- **0.09** cc immunity: Paranoia is displacement immune, ignoring Samira's Daredevil Impulse (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Samira I Daredevil Impulse)
- Watch out: Samira's basic attacks reach 375 units farther than Nocturne's (500 vs 125 attack range).

#### 8. Fizz (net +0.20)

- **0.60** untargetable: Playful makes Fizz untargetable, dodging Samira's Wild Rush. Untargetable for 0.75 s; Wild Rush takes 0.41 s to land, enough to react. (Fizz E Playful → Samira E Wild Rush)
- **0.26** untargetable: Playful makes Fizz untargetable, dodging Samira's Inferno Trigger. Untargetable for 0.75 s; Inferno Trigger lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Samira R Inferno Trigger)
- Watch out: Blade Whirl blocks part of Fizz's Chum the Waters, a projectile.

#### 9. Kayn (net +0.18)

- **0.29** untargetable: Umbral Trespass makes Kayn untargetable, dodging Samira's Wild Rush. Untargetable for 0.25 s; Wild Rush takes 0.41 s to land, enough to react. (Kayn R Umbral Trespass → Samira E Wild Rush)
- **0.14** untargetable: Umbral Trespass makes Kayn untargetable, dodging Samira's Inferno Trigger. Untargetable for 0.25 s; Inferno Trigger lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kayn R Umbral Trespass → Samira R Inferno Trigger)
- Watch out: Samira's basic attacks reach 325 units farther than Kayn's (500 vs 175 attack range).

#### 10. Yasuo (net +0.16)

- **0.35** projectile block: Wind Wall blocks Samira's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Samira basic attacks)
- **0.32** projectile block: Wind Wall blocks Samira's Inferno Trigger, a projectile. Wind Wall for 4 s, long enough to use ahead of Inferno Trigger. (Yasuo W Wind Wall → Samira R Inferno Trigger)
- **0.13** projectile block: Wind Wall blocks part of Samira's Flair, a projectile. Wind Wall for 4 s, long enough to use ahead of Flair. Only part of the ability is a projectile. Only the shot will be destroyed by projectile-intercepting effects. (Yasuo W Wind Wall → Samira Q Flair)
- Watch out: Blade Whirl blocks part of Yasuo's Steel Tempest, a projectile.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Vladimir | +0.41 | 0.67 | 0.26 |  |
| 2 | Pantheon | +0.38 | 0.64 | 0.26 |  |
| 3 | Master Yi | +0.31 | 0.57 | 0.26 |  |
| 4 | Malzahar | +0.24 | 0.43 | 0.19 |  |
| 5 | Camille | +0.23 | 0.38 | 0.15 |  |
| 6 | Warwick | +0.21 | 0.41 | 0.20 |  |
| 7 | Nocturne | +0.20 | 0.78 | 0.58 |  |
| 8 | Fizz | +0.20 | 0.73 | 0.53 |  |
| 9 | Kayn | +0.18 | 0.36 | 0.18 |  |
| 10 | Yasuo | +0.16 | 0.54 | 0.38 |  |
| 11 | Xin Zhao | +0.14 | 0.40 | 0.26 |  |
| 12 | Nilah | +0.08 | 0.30 | 0.22 |  |
| 13 | Shen | +0.06 | 0.33 | 0.27 |  |
| 14 | Jax | +0.05 | 0.35 | 0.30 |  |
| 15 | Rammus | +0.02 | 0.32 | 0.30 |  |
| 16 | Sivir | 0.00 | 0.56 | 0.56 |  |
| 17 | Kayle | 0.00 | 0.48 | 0.48 |  |
| 18 | Udyr | 0.00 | 0.45 | 0.45 |  |
| 19 | Aurora | -0.02 | 0.37 | 0.39 |  |
| 20 | Singed | -0.03 | 0.92 | 0.95 |  |
| 21 | Fiora | -0.03 | 0.63 | 0.66 |  |
| 22 | Jarvan IV | -0.04 | 0.09 | 0.13 |  |
| 23 | Rek'Sai | -0.05 | 0.43 | 0.48 |  |
| 24 | Bard | -0.05 | 0.41 | 0.46 |  |
| 25 | Viktor | -0.06 | 0.39 | 0.45 |  |
| 26 | Yone | -0.08 | 0.30 | 0.38 |  |
| 27 | Yuumi | -0.09 | 0.77 | 0.86 |  |
| 28 | Zed | -0.10 | 0.35 | 0.45 |  |
| 29 | Volibear | -0.10 | 0.09 | 0.19 |  |
| 30 | Xayah | -0.11 | 0.40 | 0.51 |  |
| 31 | Vi | -0.11 | 0.09 | 0.20 |  |
| 32 | Evelynn | -0.12 | 0.36 | 0.48 |  |
| 33 | Shaco | -0.12 | 0.36 | 0.48 |  |
| 34 | Alistar | -0.13 | 0.17 | 0.30 |  |
| 35 | Lissandra | -0.16 | 0.46 | 0.62 |  |
| 36 | K'Sante | -0.16 | 0.18 | 0.34 |  |
| 37 | Wukong | -0.18 | 0.00 | 0.18 |  |
| 38 | Rell | -0.18 | 0.00 | 0.18 |  |
| 39 | Cassiopeia | -0.19 | 0.35 | 0.54 |  |
| 40 | Aurelion Sol | -0.19 | 0.00 | 0.19 |  |
| 41 | Bel'Veth | -0.19 | 0.00 | 0.19 |  |
| 42 | Ambessa | -0.20 | 0.00 | 0.20 |  |
| 43 | Karthus | -0.20 | 0.00 | 0.20 |  |
| 44 | Sett | -0.21 | 0.09 | 0.30 |  |
| 45 | Morgana | -0.22 | 0.35 | 0.57 |  |
| 46 | Gwen | -0.26 | 0.57 | 0.83 |  |
| 47 | Mel | -0.26 | 0.39 | 0.65 |  |
| 48 | Tryndamere | -0.26 | 0.00 | 0.26 |  |
| 49 | Zac | -0.28 | 0.41 | 0.69 |  |
| 50 | Nasus | -0.28 | 0.33 | 0.61 |  |
| 51 | Malphite | -0.28 | 0.30 | 0.58 |  |
| 52 | Renekton | -0.30 | 0.00 | 0.30 |  |
| 53 | Zeri | -0.31 | 0.00 | 0.31 |  |
| 54 | Lulu | -0.32 | 0.30 | 0.62 |  |
| 55 | Kalista | -0.32 | 0.16 | 0.48 |  |
| 56 | Nidalee | -0.32 | 0.00 | 0.32 |  |
| 57 | Annie | -0.33 | 0.05 | 0.38 |  |
| 58 | Teemo | -0.34 | 0.43 | 0.77 | blind (Blinding Dart) |
| 59 | Jayce | -0.35 | 0.00 | 0.35 |  |
| 60 | Jinx | -0.36 | 0.41 | 0.77 |  |
| 61 | Veigar | -0.37 | 0.37 | 0.74 |  |
| 62 | Illaoi | -0.37 | 0.09 | 0.46 |  |
| 63 | Ryze | -0.37 | 0.00 | 0.37 |  |
| 64 | Rakan | -0.38 | 0.00 | 0.38 |  |
| 65 | Katarina | -0.39 | 0.38 | 0.77 |  |
| 66 | Soraka | -0.39 | 0.00 | 0.39 |  |
| 67 | Kennen | -0.40 | 0.00 | 0.40 |  |
| 68 | Naafiri | -0.42 | 0.00 | 0.42 |  |
| 69 | Orianna | -0.43 | 0.00 | 0.43 |  |
| 70 | Yunara | -0.44 | 0.05 | 0.49 |  |
| 71 | Vel'Koz | -0.44 | 0.00 | 0.44 |  |
| 72 | Sion | -0.45 | 0.22 | 0.67 |  |
| 73 | Mordekaiser | -0.45 | 0.08 | 0.53 |  |
| 74 | Lee Sin | -0.45 | 0.00 | 0.45 |  |
| 75 | Galio | -0.46 | 0.00 | 0.46 |  |
| 76 | Shyvana | -0.47 | 0.09 | 0.56 |  |
| 77 | Azir | -0.47 | 0.00 | 0.47 |  |
| 78 | Ekko | -0.47 | 0.00 | 0.47 |  |
| 79 | Karma | -0.47 | 0.00 | 0.47 |  |
| 80 | Quinn | -0.47 | 0.00 | 0.47 |  |
| 81 | Zaahen | -0.48 | 0.21 | 0.69 |  |
| 82 | Gnar | -0.49 | 0.00 | 0.49 |  |
| 83 | LeBlanc | -0.49 | 0.00 | 0.49 |  |
| 84 | Twitch | -0.51 | 0.00 | 0.51 |  |
| 85 | Vex | -0.52 | 0.44 | 0.96 |  |
| 86 | Braum | -0.53 | 0.70 | 1.23 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 87 | Darius | -0.53 | 0.00 | 0.53 |  |
| 88 | Garen | -0.53 | 0.00 | 0.53 |  |
| 89 | Kog'Maw | -0.53 | 0.00 | 0.53 |  |
| 90 | Miss Fortune | -0.53 | 0.00 | 0.53 |  |
| 91 | Trundle | -0.53 | 0.00 | 0.53 |  |
| 92 | Twisted Fate | -0.54 | 0.00 | 0.54 |  |
| 93 | Hwei | -0.55 | 0.41 | 0.96 |  |
| 94 | Gangplank | -0.55 | 0.30 | 0.85 |  |
| 95 | Olaf | -0.55 | 0.21 | 0.76 |  |
| 96 | Kai'Sa | -0.55 | 0.00 | 0.55 |  |
| 97 | Kassadin | -0.55 | 0.00 | 0.55 |  |
| 98 | Thresh | -0.55 | 0.00 | 0.55 |  |
| 99 | Anivia | -0.56 | 0.04 | 0.60 |  |
| 100 | Zyra | -0.56 | 0.03 | 0.59 |  |
| 101 | Zilean | -0.56 | 0.00 | 0.56 |  |
| 102 | Riven | -0.57 | 0.00 | 0.57 |  |
| 103 | Taric | -0.57 | 0.00 | 0.57 |  |
| 104 | Aatrox | -0.59 | 0.00 | 0.59 |  |
| 105 | Xerath | -0.60 | 0.00 | 0.60 |  |
| 106 | Diana | -0.62 | 0.00 | 0.62 |  |
| 107 | Varus | -0.63 | 0.41 | 1.04 |  |
| 108 | Elise | -0.63 | 0.00 | 0.63 |  |
| 109 | Milio | -0.63 | 0.00 | 0.63 |  |
| 110 | Tahm Kench | -0.64 | 0.00 | 0.64 |  |
| 111 | Poppy | -0.65 | 0.45 | 1.10 |  |
| 112 | Kled | -0.65 | 0.20 | 0.85 |  |
| 113 | Viego | -0.65 | 0.09 | 0.74 |  |
| 114 | Fiddlesticks | -0.65 | 0.00 | 0.65 |  |
| 115 | Neeko | -0.65 | 0.00 | 0.65 |  |
| 116 | Maokai | -0.66 | 0.72 | 1.38 |  |
| 117 | Ahri | -0.66 | 0.40 | 1.06 |  |
| 118 | Ivern | -0.66 | 0.00 | 0.66 |  |
| 119 | Lux | -0.67 | 0.00 | 0.67 |  |
| 120 | Talon | -0.67 | 0.00 | 0.67 |  |
| 121 | Aphelios | -0.68 | 0.00 | 0.68 |  |
| 122 | Kindred | -0.69 | 0.00 | 0.69 |  |
| 123 | Swain | -0.69 | 0.00 | 0.69 |  |
| 124 | Vayne | -0.69 | 0.00 | 0.69 |  |
| 125 | Locke | -0.71 | 0.00 | 0.71 |  |
| 126 | Rengar | -0.72 | 0.36 | 1.08 |  |
| 127 | Corki | -0.72 | 0.00 | 0.72 |  |
| 128 | Pyke | -0.72 | 0.00 | 0.72 |  |
| 129 | Kha'Zix | -0.74 | 0.00 | 0.74 |  |
| 130 | Syndra | -0.74 | 0.00 | 0.74 |  |
| 131 | Caitlyn | -0.75 | 0.09 | 0.84 |  |
| 132 | Senna | -0.75 | 0.05 | 0.80 |  |
| 133 | Janna | -0.76 | 0.00 | 0.76 |  |
| 134 | Zoe | -0.78 | 0.00 | 0.78 |  |
| 135 | Brand | -0.79 | 0.00 | 0.79 |  |
| 136 | Lucian | -0.79 | 0.00 | 0.79 |  |
| 137 | Nautilus | -0.80 | 0.00 | 0.80 |  |
| 138 | Smolder | -0.80 | 0.00 | 0.80 |  |
| 139 | Sylas | -0.80 | 0.00 | 0.80 |  |
| 140 | Yorick | -0.81 | 0.00 | 0.81 |  |
| 141 | Akali | -0.82 | 0.00 | 0.82 |  |
| 142 | Amumu | -0.84 | 0.19 | 1.03 |  |
| 143 | Leona | -0.86 | 0.00 | 0.86 |  |
| 144 | Qiyana | -0.86 | 0.00 | 0.86 |  |
| 145 | Rumble | -0.86 | 0.00 | 0.86 |  |
| 146 | Skarner | -0.87 | 0.00 | 0.87 |  |
| 147 | Akshan | -0.88 | 0.00 | 0.88 |  |
| 148 | Cho'Gath | -0.89 | 0.00 | 0.89 |  |
| 149 | Draven | -0.89 | 0.00 | 0.89 |  |
| 150 | Dr. Mundo | -0.89 | 0.00 | 0.89 |  |
| 151 | Ezreal | -0.90 | 0.00 | 0.90 |  |
| 152 | Heimerdinger | -0.90 | 0.00 | 0.90 |  |
| 153 | Jhin | -0.91 | 0.00 | 0.91 |  |
| 154 | Ziggs | -0.91 | 0.00 | 0.91 |  |
| 155 | Tristana | -0.93 | 0.12 | 1.05 |  |
| 156 | Ashe | -0.96 | 0.06 | 1.02 |  |
| 157 | Graves | -1.02 | 0.00 | 1.02 |  |
| 158 | Irelia | -1.02 | 0.00 | 1.02 |  |
| 159 | Lillia | -1.02 | 0.00 | 1.02 |  |
| 160 | Sona | -1.02 | 0.00 | 1.02 |  |
| 161 | Hecarim | -1.09 | 0.09 | 1.18 |  |
| 162 | Nami | -1.11 | 0.00 | 1.11 |  |
| 163 | Urgot | -1.13 | 0.00 | 1.13 |  |
| 164 | Seraphine | -1.14 | 0.00 | 1.14 |  |
| 165 | Taliyah | -1.14 | 0.00 | 1.14 |  |
| 166 | Blitzcrank | -1.20 | 0.00 | 1.20 |  |
| 167 | Renata Glasc | -1.21 | 0.00 | 1.21 |  |
| 168 | Nunu & Willump | -1.22 | 0.00 | 1.22 |  |
| 169 | Gragas | -1.23 | 0.00 | 1.23 |  |
| 170 | Briar | -1.26 | 0.00 | 1.26 |  |
| 171 | Sejuani | -1.26 | 0.00 | 1.26 |  |
| 172 | Ornn | -1.30 | 0.09 | 1.39 |  |
