# Counters to Kled (patch 26.20)

## Simulated duels

The duel simulator played each of the 94 other champions with a simulator kit against Kled: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Kled wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Kled --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.87 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +1.00 |
| 2 | Kayle | +0.86 | +1.00 | +1.00 | +1.00 | +0.40 | +1.00 | +0.00 |
| 3 | Vayne | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 4 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 5 | Ashe | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 6 | Kog'Maw | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 7 | Smolder | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 8 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 9 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 10 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 11 | Yorick | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 12 | Quinn | +0.67 | +1.00 | +0.41 | +1.00 | +0.12 | +1.00 | +0.00 |
| 13 | Annie | +0.62 | +1.00 | +1.00 | +0.00 | +0.16 | +1.00 | +0.00 |
| 14 | Dr. Mundo | +0.52 | +0.57 | +0.73 | +0.89 | −0.22 | – | +0.00 |
| 15 | Gwen | +0.49 | +0.45 | +0.46 | +1.00 | +0.07 | – | +0.00 |
| 16 | Yasuo | +0.48 | +0.33 | +0.52 | +1.00 | +0.11 | – | +0.00 |
| 17 | Trundle | +0.47 | +1.00 | +0.00 | +1.00 | −0.15 | – | +0.00 |
| 18 | Caitlyn | +0.42 | +1.00 | +1.00 | −1.00 | +0.11 | +1.00 | +0.00 |
| 19 | Kalista | +0.41 | +1.00 | +1.00 | −1.00 | +0.06 | +1.00 | +0.00 |
| 20 | Poppy | +0.32 | +0.00 | +1.00 | +0.00 | +0.28 | – | +0.00 |
| 21 | Malphite | +0.25 | +0.00 | +0.00 | +1.00 | +0.18 | – | +0.00 |
| 22 | Udyr | +0.24 | +1.00 | −1.00 | +1.00 | +0.09 | – | +0.00 |
| 23 | Jax | +0.22 | +1.00 | −1.00 | +1.00 | +0.01 | – | +0.00 |
| 24 | Zaahen | +0.04 | −0.73 | +0.04 | +1.00 | +0.06 | – | +0.00 |
| 25 | Anivia | +0.02 | +0.22 | +0.22 | −0.27 | −0.05 | −0.34 | +0.00 |
| 26 | Tahm Kench | +0.01 | +0.05 | +0.05 | +0.02 | −0.13 | – | +0.00 |
| 27 | Heimerdinger | −0.10 | −0.73 | −0.94 | +1.00 | +0.14 | +1.00 | +0.00 |
| 28 | Morgana | −0.16 | +0.00 | −1.00 | +0.17 | +0.12 | +0.35 | +0.00 |
| 29 | Fiora | −0.18 | +0.00 | −1.00 | +0.00 | +0.23 | – | +1.00 |
| 30 | Corki | −0.19 | −1.00 | −1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 31 | Varus | −0.20 | −1.00 | −1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 32 | Tristana | −0.20 | −1.00 | −1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 33 | Warwick | −0.20 | +0.00 | +0.00 | −1.00 | +0.12 | – | +0.00 |
| 34 | Kennen | −0.23 | −1.00 | −1.00 | +0.81 | +0.16 | +0.86 | +0.00 |
| 35 | Illaoi | −0.23 | +0.95 | −0.99 | −0.90 | −0.11 | – | +0.00 |
| 36 | Draven | −0.33 | −0.10 | −1.00 | +0.49 | −0.32 | −1.00 | +0.00 |
| 37 | Urgot | −0.37 | −1.00 | −1.00 | +1.00 | +0.19 | −1.00 | +0.00 |
| 38 | Aurora | −0.41 | −1.00 | −1.00 | +1.00 | −0.06 | −1.00 | +0.00 |
| 39 | Cassiopeia | −0.42 | −1.00 | −1.00 | +0.75 | +0.17 | −1.00 | +0.00 |
| 40 | Jinx | −0.46 | −0.94 | −0.94 | −0.17 | +0.11 | +0.29 | +0.00 |
| 41 | Xin Zhao | −0.47 | −0.19 | −0.80 | −1.00 | +0.14 | – | +0.00 |
| 42 | Mordekaiser | −0.56 | −0.82 | −0.40 | −1.00 | +0.03 | – | +0.00 |
| 43 | Irelia | −0.56 | −0.32 | −1.00 | −1.00 | +0.16 | – | +0.00 |
| 44 | Kai'Sa | −0.59 | −1.00 | −1.00 | −1.00 | +0.05 | +1.00 | +0.00 |
| 45 | Lucian | −0.62 | −1.00 | −1.00 | −1.00 | −0.10 | +1.00 | +0.00 |
| 46 | Master Yi | −0.70 | −1.00 | −1.00 | −1.00 | +0.15 | – | +1.00 |
| 47 | Malzahar | −0.73 | −1.00 | −1.00 | −1.00 | −0.08 | −0.22 | +0.00 |
| 48 | Ambessa | −0.74 | −1.00 | −1.00 | −1.00 | +0.25 | – | +0.00 |
| 49 | Jayce | −0.74 | −1.00 | −1.00 | −1.00 | +0.20 | – | +0.00 |
| 50 | Gangplank | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 51 | Garen | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 52 | Hecarim | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 53 | Shen | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 54 | Sett | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 55 | Yone | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 56 | Riven | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 57 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 58 | Akali | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 59 | Singed | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 60 | Pantheon | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 61 | Olaf | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 62 | Volibear | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 63 | Cho'Gath | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 64 | Renekton | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 65 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 66 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 67 | Tryndamere | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 68 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 69 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 70 | Lux | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 71 | Samira | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 72 | Sion | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 73 | Gragas | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 74 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 75 | Wukong | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 76 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 77 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 78 | Aatrox | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 79 | Ezreal | −0.79 | −1.00 | −1.00 | −0.98 | +0.03 | −1.00 | +0.00 |
| 80 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 81 | Karthus | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 82 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 83 | Xayah | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 84 | Brand | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 85 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 86 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 87 | Jhin | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 88 | Twitch | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 89 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 90 | Camille | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 91 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 92 | Miss Fortune | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 93 | Vel'Koz | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 94 | Sivir | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Kled's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kled's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kled` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.38)

- **1.00** spell shield: Spell Shield's spell shield blocks Kled's Chaaaaaaaarge!!!. Spell shield for 1.5 s, long enough to use ahead of Chaaaaaaaarge!!!. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kled R Chaaaaaaaarge!!!)
- **0.44** spell shield: Spell Shield's spell shield blocks Kled's Bear Trap on a Rope. Spell shield for 1.5 s, long enough to use ahead of Bear Trap on a Rope. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kled Q Bear Trap on a Rope)
- **0.16** range: Sivir's basic attacks reach 250 units farther than Kled's (500 vs 250 attack range). Kled closes the gap with Chaaaaaaaarge!!!, Jousting, Pocket Pistol. (Sivir basic attacks → Kled basic attacks)

#### 2. Vladimir (net +1.12)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kled's Chaaaaaaaarge!!!. Untargetable for 2 s, long enough to use ahead of Chaaaaaaaarge!!!. (Vladimir W Sanguine Pool → Kled R Chaaaaaaaarge!!!)
- **0.46** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kled's Bear Trap on a Rope. Untargetable for 2 s, long enough to use ahead of Bear Trap on a Rope. (Vladimir W Sanguine Pool → Kled Q Bear Trap on a Rope)
- **0.05** range: Vladimir's basic attacks reach 200 units farther than Kled's (450 vs 250 attack range). Kled closes the gap with Chaaaaaaaarge!!!, Jousting, Pocket Pistol. (Vladimir basic attacks → Kled basic attacks)
- Watch out: Bear Trap on a Rope's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 3. Xayah (net +1.10)

- **1.00** untargetable: Featherstorm makes Xayah untargetable, dodging Kled's Chaaaaaaaarge!!!. Untargetable for 1.5 s, long enough to use ahead of Chaaaaaaaarge!!!. (Xayah R Featherstorm → Kled R Chaaaaaaaarge!!!)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Kled's Bear Trap on a Rope. Untargetable for 1.5 s, long enough to use ahead of Bear Trap on a Rope. (Xayah R Featherstorm → Kled Q Bear Trap on a Rope)
- **0.13** range: Xayah's basic attacks reach 275 units farther than Kled's (525 vs 250 attack range). Kled closes the gap with Chaaaaaaaarge!!!, Jousting, Pocket Pistol. (Xayah basic attacks → Kled basic attacks)
- Watch out: Chaaaaaaaarge!!! makes Kled immune to Xayah's Bladecaller (root).

#### 4. Nocturne (net +1.06)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Kled's Chaaaaaaaarge!!!. Spell shield for 1.5 s, long enough to use ahead of Chaaaaaaaarge!!!. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Kled R Chaaaaaaaarge!!!)
- **0.52** spell shield: Shroud of Darkness's spell shield blocks Kled's Bear Trap on a Rope. Spell shield for 1.5 s, long enough to use ahead of Bear Trap on a Rope. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Kled Q Bear Trap on a Rope)
- **0.20** cc immunity: Paranoia is displacement immune, ignoring Kled's Chaaaaaaaarge!!! (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Kled R Chaaaaaaaarge!!!)
- Watch out: Chaaaaaaaarge!!! makes Kled immune to Nocturne's Paranoia (nearsight).

#### 5. Zed (net +1.04)

- **1.00** untargetable: Death Mark makes Zed untargetable, dodging Kled's Chaaaaaaaarge!!!. Untargetable for 0.6 s; Chaaaaaaaarge!!! takes 4.5 s to land, enough to react. (Zed R Death Mark → Kled R Chaaaaaaaarge!!!)
- **0.31** untargetable: Death Mark makes Zed untargetable, dodging Kled's Bear Trap on a Rope. Untargetable for 0.6 s; Bear Trap on a Rope takes 0.75 s to land, enough to react. (Zed R Death Mark → Kled Q Bear Trap on a Rope)
- Watch out: Kled's basic attacks reach 125 units farther than Zed's (250 vs 125 attack range).

#### 6. Gwen (net +1.00)

- **1.00** untargetable: Hallowed Mist makes Gwen untargetable, dodging Kled's Chaaaaaaaarge!!!. Untargetable for ?; Chaaaaaaaarge!!! takes 4.5 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Kled R Chaaaaaaaarge!!!)
- **0.44** untargetable: Hallowed Mist makes Gwen untargetable, dodging Kled's Bear Trap on a Rope. Untargetable for ?; Bear Trap on a Rope takes 0.75 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Kled Q Bear Trap on a Rope)
- Watch out: Chaaaaaaaarge!!! makes Kled immune to Gwen's Needlework (slow).

#### 7. Rek'Sai (net +0.98)

- **1.00** untargetable: Void Rush makes Rek'Sai untargetable, dodging Kled's Chaaaaaaaarge!!!. Untargetable for 1.5 s, long enough to use ahead of Chaaaaaaaarge!!!. (Rek'Sai R Void Rush → Kled R Chaaaaaaaarge!!!)
- **0.32** untargetable: Void Rush makes Rek'Sai untargetable, dodging Kled's Bear Trap on a Rope. Untargetable for 1.5 s, long enough to use ahead of Bear Trap on a Rope. (Rek'Sai R Void Rush → Kled Q Bear Trap on a Rope)
- **0.21** cc immunity: Void Rush is displacement immune, ignoring Kled's Chaaaaaaaarge!!! (airborne) during it. Only during Void Rush (1.5 s). (Rek'Sai R Void Rush → Kled R Chaaaaaaaarge!!!)
- Watch out: Chaaaaaaaarge!!! makes Kled immune to Rek'Sai's Unburrow (airborne).

#### 8. Fiora (net +0.97)

- **1.00** parry: Riposte parries Kled's Chaaaaaaaarge!!! and stuns back. Parry for 0.75 s; Chaaaaaaaarge!!! takes 4.5 s to land, enough to react. Negating Chaaaaaaaarge!!!'s immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Kled R Chaaaaaaaarge!!!)
- **0.56** parry: Riposte parries Kled's Bear Trap on a Rope and stuns back. Parry for 0.75 s; Bear Trap on a Rope takes 0.75 s to land, enough to react. Negating Bear Trap on a Rope's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Kled Q Bear Trap on a Rope)
- **0.10** attack speed slow: Riposte cuts Kled's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Kled basic attacks)
- Watch out: Chaaaaaaaarge!!! makes Kled immune to Fiora's Riposte (cripple, slow, stun).

#### 9. Udyr (net +0.94)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Kled's Chaaaaaaaarge!!! (airborne). Immune for 1.5 s, long enough to use ahead of Chaaaaaaaarge!!!. (Udyr E Blazing Stampede → Kled R Chaaaaaaaarge!!!)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Kled's Bear Trap on a Rope (airborne, slow). Immune for 1.5 s, long enough to use ahead of Bear Trap on a Rope. (Udyr E Blazing Stampede → Kled Q Bear Trap on a Rope)
- Watch out: Chaaaaaaaarge!!! makes Kled immune to Udyr's Blazing Stampede (stun).

#### 10. Master Yi (net +0.92)

- **1.00** untargetable: Alpha Strike makes Master Yi untargetable, dodging Kled's Chaaaaaaaarge!!!. Untargetable for ?; Chaaaaaaaarge!!! takes 4.5 s to land, enough to react. (Master Yi Q Alpha Strike → Kled R Chaaaaaaaarge!!!)
- **0.44** untargetable: Alpha Strike makes Master Yi untargetable, dodging Kled's Bear Trap on a Rope. Untargetable for ?; Bear Trap on a Rope takes 0.75 s to land, enough to react. (Master Yi Q Alpha Strike → Kled Q Bear Trap on a Rope)
- **0.08** cc immunity: Highlander makes Master Yi immune to Kled's Bear Trap on a Rope (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Kled Q Bear Trap on a Rope)
- Watch out: Bear Trap on a Rope's airborne interrupts Master Yi's Meditate (normal channel).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.38 | 1.38 | 0.00 |  |
| 2 | Vladimir | +1.12 | 1.28 | 0.16 |  |
| 3 | Xayah | +1.10 | 1.29 | 0.19 |  |
| 4 | Nocturne | +1.06 | 1.50 | 0.44 |  |
| 5 | Zed | +1.04 | 1.16 | 0.12 |  |
| 6 | Gwen | +1.00 | 1.22 | 0.22 |  |
| 7 | Rek'Sai | +0.98 | 1.22 | 0.24 |  |
| 8 | Fiora | +0.97 | 1.31 | 0.34 |  |
| 9 | Udyr | +0.94 | 1.35 | 0.41 |  |
| 10 | Master Yi | +0.92 | 1.33 | 0.41 |  |
| 11 | Olaf | +0.85 | 1.16 | 0.31 |  |
| 12 | Aurora | +0.80 | 1.32 | 0.52 |  |
| 13 | Zaahen | +0.69 | 1.16 | 0.47 |  |
| 14 | Samira | +0.65 | 0.85 | 0.20 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 15 | Yuumi | +0.64 | 1.44 | 0.80 |  |
| 16 | Morgana | +0.61 | 1.29 | 0.68 |  |
| 17 | Fizz | +0.59 | 1.33 | 0.74 |  |
| 18 | Gangplank | +0.57 | 1.00 | 0.43 |  |
| 19 | Evelynn | +0.55 | 1.16 | 0.61 |  |
| 20 | Lissandra | +0.53 | 1.31 | 0.78 |  |
| 21 | Bard | +0.50 | 1.28 | 0.78 |  |
| 22 | Vex | +0.50 | 0.80 | 0.30 |  |
| 23 | Mel | +0.49 | 0.80 | 0.31 | projectile block (Rebuttal) |
| 24 | Jinx | +0.47 | 0.69 | 0.22 | dash stop (Flame Chompers!) |
| 25 | Camille | +0.39 | 1.21 | 0.82 |  |
| 26 | Sion | +0.39 | 1.17 | 0.78 |  |
| 27 | Kalista | +0.39 | 0.99 | 0.60 |  |
| 28 | Teemo | +0.31 | 0.65 | 0.34 | blind (Blinding Dart) |
| 29 | Singed | +0.28 | 0.92 | 0.64 | grounding (Mega Adhesive) |
| 30 | Ahri | +0.28 | 0.61 | 0.33 |  |
| 31 | Yasuo | +0.27 | 0.83 | 0.56 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 32 | Veigar | +0.24 | 0.57 | 0.33 |  |
| 33 | Alistar | +0.23 | 0.93 | 0.70 |  |
| 34 | Shaco | +0.22 | 1.16 | 0.94 |  |
| 35 | Viktor | +0.15 | 0.62 | 0.47 |  |
| 36 | Maokai | +0.14 | 1.29 | 1.15 |  |
| 37 | Hwei | +0.13 | 0.68 | 0.55 | dash stop (Grim Visage) |
| 38 | Kayn | +0.12 | 1.16 | 1.04 |  |
| 39 | Jax | +0.12 | 0.44 | 0.32 | attack dodge (Counter Strike) |
| 40 | Kayle | +0.12 | 0.17 | 0.05 |  |
| 41 | Zeri | +0.12 | 0.17 | 0.05 |  |
| 42 | Corki | +0.12 | 0.12 | 0.00 |  |
| 43 | Ezreal | +0.12 | 0.12 | 0.00 |  |
| 44 | Nasus | +0.11 | 0.42 | 0.31 | attack speed slow (Wither) |
| 45 | Kindred | +0.11 | 0.16 | 0.05 |  |
| 46 | Braum | +0.10 | 1.13 | 1.03 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 47 | Rengar | +0.10 | 1.03 | 0.93 |  |
| 48 | Nidalee | +0.10 | 0.10 | 0.00 |  |
| 49 | Yunara | +0.07 | 0.15 | 0.08 |  |
| 50 | Cassiopeia | +0.06 | 0.80 | 0.74 | grounding (Miasma) |
| 51 | Illaoi | +0.06 | 0.24 | 0.18 |  |
| 52 | Lulu | +0.05 | 0.53 | 0.48 |  |
| 53 | Kog'Maw | +0.04 | 0.09 | 0.05 |  |
| 54 | Malzahar | +0.03 | 1.03 | 1.00 |  |
| 55 | Graves | +0.01 | 0.07 | 0.06 |  |
| 56 | Nilah | -0.02 | 0.38 | 0.40 |  |
| 57 | Warwick | -0.04 | 1.47 | 1.51 |  |
| 58 | Garen | -0.04 | 0.18 | 0.22 |  |
| 59 | Smolder | -0.04 | 0.12 | 0.16 |  |
| 60 | Milio | -0.10 | 0.22 | 0.32 |  |
| 61 | Tryndamere | -0.13 | 0.00 | 0.13 |  |
| 62 | Kennen | -0.14 | 0.11 | 0.25 |  |
| 63 | Annie | -0.15 | 0.10 | 0.25 |  |
| 64 | Draven | -0.19 | 0.14 | 0.33 |  |
| 65 | Twitch | -0.20 | 0.16 | 0.36 |  |
| 66 | Kai'Sa | -0.20 | 0.13 | 0.33 |  |
| 67 | Elise | -0.20 | 0.12 | 0.32 |  |
| 68 | Zilean | -0.21 | 0.12 | 0.33 |  |
| 69 | Zoe | -0.21 | 0.12 | 0.33 |  |
| 70 | Volibear | -0.22 | 0.24 | 0.46 |  |
| 71 | Lux | -0.24 | 0.11 | 0.35 |  |
| 72 | Jayce | -0.24 | 0.10 | 0.34 |  |
| 73 | Kassadin | -0.25 | 0.00 | 0.25 |  |
| 74 | Soraka | -0.27 | 0.10 | 0.37 |  |
| 75 | Brand | -0.28 | 0.08 | 0.36 |  |
| 76 | Syndra | -0.28 | 0.08 | 0.36 |  |
| 77 | Locke | -0.28 | 0.00 | 0.28 |  |
| 78 | Swain | -0.29 | 0.07 | 0.36 |  |
| 79 | Dr. Mundo | -0.32 | 0.00 | 0.32 |  |
| 80 | Ekko | -0.32 | 0.00 | 0.32 |  |
| 81 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 82 | Heimerdinger | -0.33 | 0.15 | 0.48 |  |
| 83 | Ziggs | -0.33 | 0.10 | 0.43 |  |
| 84 | LeBlanc | -0.33 | 0.08 | 0.41 |  |
| 85 | Shyvana | -0.34 | 0.24 | 0.58 |  |
| 86 | Karma | -0.36 | 0.08 | 0.44 |  |
| 87 | Irelia | -0.38 | 0.00 | 0.38 |  |
| 88 | Yorick | -0.38 | 0.00 | 0.38 |  |
| 89 | Quinn | -0.39 | 0.13 | 0.52 |  |
| 90 | Lucian | -0.41 | 0.12 | 0.53 |  |
| 91 | Anivia | -0.41 | 0.10 | 0.51 |  |
| 92 | Rumble | -0.41 | 0.00 | 0.41 |  |
| 93 | Taric | -0.41 | 0.00 | 0.41 |  |
| 94 | Mordekaiser | -0.43 | 0.10 | 0.53 |  |
| 95 | Akali | -0.43 | 0.00 | 0.43 |  |
| 96 | Bel'Veth | -0.43 | 0.00 | 0.43 |  |
| 97 | Ashe | -0.44 | 0.16 | 0.60 |  |
| 98 | Miss Fortune | -0.45 | 0.12 | 0.57 |  |
| 99 | Senna | -0.47 | 0.14 | 0.61 |  |
| 100 | Katarina | -0.47 | 0.12 | 0.59 |  |
| 101 | Varus | -0.49 | 0.23 | 0.72 |  |
| 102 | Aatrox | -0.49 | 0.00 | 0.49 |  |
| 103 | Thresh | -0.51 | 0.06 | 0.57 |  |
| 104 | Darius | -0.51 | 0.00 | 0.51 |  |
| 105 | Trundle | -0.51 | 0.00 | 0.51 |  |
| 106 | Vayne | -0.52 | 0.16 | 0.68 |  |
| 107 | Gnar | -0.52 | 0.11 | 0.63 |  |
| 108 | Ivern | -0.52 | 0.06 | 0.58 |  |
| 109 | Sylas | -0.52 | 0.00 | 0.52 |  |
| 110 | Karthus | -0.53 | 0.06 | 0.59 |  |
| 111 | Riven | -0.54 | 0.00 | 0.54 |  |
| 112 | Talon | -0.54 | 0.00 | 0.54 |  |
| 113 | Sett | -0.55 | 0.24 | 0.79 |  |
| 114 | Caitlyn | -0.56 | 0.18 | 0.74 |  |
| 115 | Yone | -0.57 | 0.52 | 1.09 |  |
| 116 | Malphite | -0.60 | 0.51 | 1.11 |  |
| 117 | Orianna | -0.60 | 0.09 | 0.69 |  |
| 118 | Sona | -0.61 | 0.15 | 0.76 |  |
| 119 | Tristana | -0.62 | 0.18 | 0.80 |  |
| 120 | Poppy | -0.63 | 0.69 | 1.32 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 121 | Twisted Fate | -0.64 | 0.15 | 0.79 |  |
| 122 | Cho'Gath | -0.64 | 0.00 | 0.64 |  |
| 123 | Azir | -0.65 | 0.09 | 0.74 |  |
| 124 | Vel'Koz | -0.65 | 0.09 | 0.74 |  |
| 125 | Aurelion Sol | -0.66 | 0.08 | 0.74 |  |
| 126 | Akshan | -0.67 | 0.11 | 0.78 |  |
| 127 | Jhin | -0.67 | 0.10 | 0.77 |  |
| 128 | Lee Sin | -0.69 | 0.00 | 0.69 |  |
| 129 | Xerath | -0.70 | 0.09 | 0.79 |  |
| 130 | Aphelios | -0.72 | 0.21 | 0.93 |  |
| 131 | K'Sante | -0.73 | 0.47 | 1.20 |  |
| 132 | Blitzcrank | -0.73 | 0.00 | 0.73 |  |
| 133 | Zyra | -0.77 | 0.10 | 0.87 |  |
| 134 | Ryze | -0.77 | 0.09 | 0.86 |  |
| 135 | Diana | -0.77 | 0.00 | 0.77 |  |
| 136 | Kha'Zix | -0.78 | 0.00 | 0.78 |  |
| 137 | Shen | -0.80 | 0.42 | 1.22 | attack block (Spirit's Refuge) |
| 138 | Urgot | -0.81 | 0.03 | 0.84 |  |
| 139 | Lillia | -0.81 | 0.02 | 0.83 |  |
| 140 | Renata Glasc | -0.84 | 0.14 | 0.98 |  |
| 141 | Nami | -0.84 | 0.08 | 0.92 |  |
| 142 | Amumu | -0.86 | 0.27 | 1.13 |  |
| 143 | Seraphine | -0.86 | 0.10 | 0.96 |  |
| 144 | Hecarim | -0.87 | 0.25 | 1.12 |  |
| 145 | Jarvan IV | -0.87 | 0.24 | 1.11 |  |
| 146 | Pyke | -0.90 | 0.00 | 0.90 |  |
| 147 | Skarner | -0.92 | 0.09 | 1.01 |  |
| 148 | Fiddlesticks | -0.92 | 0.06 | 0.98 |  |
| 149 | Rakan | -0.94 | 0.00 | 0.94 |  |
| 150 | Xin Zhao | -0.96 | 0.00 | 0.96 |  |
| 151 | Leona | -0.97 | 0.00 | 0.97 |  |
| 152 | Wukong | -0.98 | 0.00 | 0.98 |  |
| 153 | Janna | -0.99 | 0.14 | 1.13 |  |
| 154 | Naafiri | -0.99 | 0.00 | 0.99 |  |
| 155 | Nautilus | -1.00 | 0.00 | 1.00 |  |
| 156 | Zac | -1.02 | 0.60 | 1.62 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 157 | Ornn | -1.02 | 0.24 | 1.26 |  |
| 158 | Neeko | -1.04 | 0.08 | 1.12 |  |
| 159 | Ambessa | -1.06 | 0.00 | 1.06 |  |
| 160 | Rammus | -1.07 | 0.41 | 1.48 | attack reflect (Defensive Ball Curl) |
| 161 | Rell | -1.07 | 0.00 | 1.07 |  |
| 162 | Briar | -1.11 | 0.00 | 1.11 |  |
| 163 | Sejuani | -1.13 | 0.00 | 1.13 |  |
| 164 | Nunu & Willump | -1.14 | 0.19 | 1.33 |  |
| 165 | Pantheon | -1.16 | 0.00 | 1.16 |  |
| 166 | Gragas | -1.22 | 0.00 | 1.22 |  |
| 167 | Viego | -1.28 | 0.24 | 1.52 |  |
| 168 | Vi | -1.39 | 0.24 | 1.63 |  |
| 169 | Qiyana | -1.44 | 0.00 | 1.44 |  |
| 170 | Tahm Kench | -1.54 | 0.00 | 1.54 |  |
| 171 | Galio | -1.65 | 0.00 | 1.65 |  |
| 172 | Taliyah | -1.71 | 0.09 | 1.80 |  |
