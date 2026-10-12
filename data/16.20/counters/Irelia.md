# Counters to Irelia (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 48 other champions with a simulator kit against Irelia: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Irelia wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Irelia --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +1.00 |
| 2 | Fiora | +0.81 | +1.00 | +1.00 | +1.00 | −0.14 | – | +1.00 |
| 3 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 4 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 5 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 6 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 7 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 8 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 9 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 10 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 11 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 12 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 13 | K'Sante | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 14 | Zaahen | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 15 | Gwen | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 16 | Udyr | +0.76 | +0.98 | +1.00 | +0.95 | −0.05 | +0.86 | +0.00 |
| 17 | Tahm Kench | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 18 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 19 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 20 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 21 | Kled | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 22 | Aatrox | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 23 | Singed | +0.71 | +0.91 | +1.00 | +0.82 | −0.03 | – | +0.00 |
| 24 | Volibear | +0.71 | +0.88 | +1.00 | +0.88 | −0.06 | – | +0.00 |
| 25 | Mordekaiser | +0.68 | +0.99 | +0.99 | +0.67 | −0.12 | – | +0.00 |
| 26 | Kayle | +0.68 | +1.00 | +1.00 | +1.00 | +0.09 | −0.38 | +0.00 |
| 27 | Urgot | +0.63 | +1.00 | +1.00 | +1.00 | +0.17 | −1.00 | +0.00 |
| 28 | Illaoi | +0.46 | +0.33 | +1.00 | +0.77 | −0.02 | −0.25 | +0.00 |
| 29 | Aurora | +0.40 | +1.00 | +1.00 | −1.00 | +0.02 | +1.00 | +0.00 |
| 30 | Kennen | +0.37 | +1.00 | +1.00 | −1.00 | −0.04 | +0.75 | +0.00 |
| 31 | Gnar | +0.32 | +0.70 | +0.82 | −0.83 | +0.03 | +1.00 | +0.00 |
| 32 | Yone | +0.29 | +0.11 | +0.11 | +1.00 | +0.01 | – | +0.00 |
| 33 | Pantheon | +0.24 | +1.00 | −0.32 | +0.32 | −0.11 | – | +0.00 |
| 34 | Sion | +0.18 | +0.26 | +0.26 | +0.24 | −0.11 | – | +0.00 |
| 35 | Gangplank | +0.03 | +0.24 | −1.00 | +1.00 | +0.11 | – | +0.00 |
| 36 | Sett | −0.03 | −0.60 | +1.00 | −0.60 | −0.04 | – | +0.00 |
| 37 | Camille | −0.05 | −0.03 | −1.00 | +1.00 | +0.08 | – | +0.00 |
| 38 | Quinn | −0.17 | +0.28 | +0.29 | −1.00 | −0.07 | −1.00 | +0.00 |
| 39 | Skarner | −0.18 | +0.43 | −1.00 | −0.14 | +0.07 | – | +0.00 |
| 40 | Jayce | −0.32 | −1.00 | −1.00 | +0.97 | +0.10 | – | +0.00 |
| 41 | Heimerdinger | −0.39 | −1.00 | −1.00 | +0.98 | +0.10 | −1.00 | +0.00 |
| 42 | Ambessa | −0.44 | −1.00 | +0.23 | −1.00 | −0.00 | – | +0.00 |
| 43 | Olaf | −0.44 | −1.00 | −1.00 | +0.32 | −0.07 | +0.04 | +0.00 |
| 44 | Rumble | −0.52 | −1.00 | −0.03 | −1.00 | −0.06 | – | +0.00 |
| 45 | Akali | −0.56 | −0.55 | −0.61 | −1.00 | −0.07 | – | +0.00 |
| 46 | Riven | −0.70 | −1.00 | −1.00 | −0.64 | +0.01 | – | +0.00 |
| 47 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 48 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Irelia's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Irelia's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Irelia` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Elise (net +1.21)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Irelia's Vanguard's Edge. Untargetable for 0.6 s; Vanguard's Edge takes 0.9 s to land, enough to react. (Elise E Rappel → Irelia R Vanguard's Edge)
- **0.51** untargetable: Rappel makes Elise untargetable, dodging Irelia's Flawless Duet. Untargetable for 0.6 s; Flawless Duet takes 0.39 s to land, enough to react. (Elise E Rappel → Irelia E Flawless Duet)
- **0.48** untargetable: Rappel makes Elise untargetable, dodging Irelia's Bladesurge. Untargetable for 0.6 s; Bladesurge takes 0.43 s to land, enough to react. (Elise E Rappel → Irelia Q Bladesurge)

#### 2. Sivir (net +1.20)

- **0.51** spell shield: Spell Shield's spell shield blocks Irelia's Flawless Duet. Spell shield for 1.5 s, long enough to use ahead of Flawless Duet. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Irelia E Flawless Duet)
- **0.48** spell shield: Spell Shield's spell shield blocks Irelia's Bladesurge. Spell shield for 1.5 s, long enough to use ahead of Bladesurge. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Irelia Q Bladesurge)
- **0.38** range: Sivir's basic attacks reach 300 units farther than Irelia's (500 vs 200 attack range). Irelia closes the gap with Bladesurge. (Sivir basic attacks → Irelia basic attacks)

#### 3. Yuumi (net +1.12)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Irelia's Bladesurge. Untargetable for ?; Bladesurge takes 0.43 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Irelia Q Bladesurge)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Irelia's Flawless Duet. Untargetable for ?; Flawless Duet takes 0.39 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Irelia E Flawless Duet)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Irelia's Vanguard's Edge. Untargetable for ?; Vanguard's Edge takes 0.9 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Irelia R Vanguard's Edge)
- Watch out: Flawless Duet's stun interrupts Yuumi's Final Chapter (normal channel).

#### 4. Bard (net +1.10)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Irelia's Vanguard's Edge. Untargetable for 2.5 s, long enough to use ahead of Vanguard's Edge. (Bard R Tempered Fate → Irelia R Vanguard's Edge)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Irelia's Bladesurge. Untargetable for 2.5 s, long enough to use ahead of Bladesurge. (Bard R Tempered Fate → Irelia Q Bladesurge)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Irelia's Flawless Duet. Untargetable for 2.5 s, long enough to use ahead of Flawless Duet. (Bard R Tempered Fate → Irelia E Flawless Duet)

#### 5. Maokai (net +1.09)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Irelia's Flawless Duet. Untargetable for 1.4 s; Flawless Duet takes 0.39 s to land, enough to react. (Maokai W Twisted Advance → Irelia E Flawless Duet)
- **0.61** untargetable: Twisted Advance makes Maokai untargetable, dodging Irelia's Bladesurge. Untargetable for 1.4 s; Bladesurge takes 0.43 s to land, enough to react. (Maokai W Twisted Advance → Irelia Q Bladesurge)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Irelia's Vanguard's Edge. Untargetable for 1.4 s; Vanguard's Edge takes 0.9 s to land, enough to react. (Maokai W Twisted Advance → Irelia R Vanguard's Edge)
- Watch out: Irelia's basic attacks reach 75 units farther than Maokai's (200 vs 125 attack range).

#### 6. Xayah (net +1.07)

- **0.50** untargetable: Featherstorm makes Xayah untargetable, dodging Irelia's Vanguard's Edge. Untargetable for 1.5 s, long enough to use ahead of Vanguard's Edge. (Xayah R Featherstorm → Irelia R Vanguard's Edge)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Irelia's Bladesurge. Untargetable for 1.5 s, long enough to use ahead of Bladesurge. (Xayah R Featherstorm → Irelia Q Bladesurge)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Irelia's Flawless Duet. Untargetable for 1.5 s, long enough to use ahead of Flawless Duet. (Xayah R Featherstorm → Irelia E Flawless Duet)

#### 7. Fiora (net +1.05)

- **0.64** parry: Riposte parries Irelia's Flawless Duet and stuns back. Parry for 0.75 s; Flawless Duet takes 0.39 s to land, enough to react. Negating Flawless Duet's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Irelia E Flawless Duet)
- **0.55** parry: Riposte parries Irelia's Vanguard's Edge. Parry for 0.75 s; Vanguard's Edge takes 0.9 s to land, enough to react. (Fiora W Riposte → Irelia R Vanguard's Edge)
- **0.50** parry: Riposte parries Irelia's Bladesurge. Parry for 0.75 s; Bladesurge takes 0.43 s to land, enough to react. (Fiora W Riposte → Irelia Q Bladesurge)

#### 8. Lissandra (net +1.02)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Irelia's Vanguard's Edge. Untargetable for 2.5 s, long enough to use ahead of Vanguard's Edge. (Lissandra R Frozen Tomb → Irelia R Vanguard's Edge)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Irelia's Bladesurge. Untargetable for 2.5 s, long enough to use ahead of Bladesurge. (Lissandra R Frozen Tomb → Irelia Q Bladesurge)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Irelia's Flawless Duet. Untargetable for 2.5 s, long enough to use ahead of Flawless Duet. (Lissandra R Frozen Tomb → Irelia E Flawless Duet)

#### 9. Samira (net +1.02)

- **0.55** projectile block: Blade Whirl blocks Irelia's Vanguard's Edge, a projectile. Blade Whirl for 0.75 s; Vanguard's Edge takes 0.9 s to land, enough to react. (Samira W Blade Whirl → Irelia R Vanguard's Edge)
- **0.47** projectile block: Blade Whirl blocks Irelia's Flawless Duet, a projectile. Blade Whirl for 0.75 s; Flawless Duet takes 0.39 s to land, enough to react. (Samira W Blade Whirl → Irelia E Flawless Duet)
- **0.24** range: Samira's basic attacks reach 300 units farther than Irelia's (500 vs 200 attack range). Irelia closes the gap with Bladesurge. (Samira basic attacks → Irelia basic attacks)

#### 10. Vladimir (net +1.01)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Irelia's Vanguard's Edge. Untargetable for 2 s, long enough to use ahead of Vanguard's Edge. (Vladimir W Sanguine Pool → Irelia R Vanguard's Edge)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Irelia's Flawless Duet. Untargetable for 2 s, long enough to use ahead of Flawless Duet. (Vladimir W Sanguine Pool → Irelia E Flawless Duet)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Irelia's Bladesurge. Untargetable for 2 s, long enough to use ahead of Bladesurge. (Vladimir W Sanguine Pool → Irelia Q Bladesurge)
- Watch out: Flawless Duet's stun interrupts Vladimir's Tides of Blood (charge-up).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.21 | 1.21 | 0.00 |  |
| 2 | Sivir | +1.20 | 1.20 | 0.00 |  |
| 3 | Yuumi | +1.12 | 1.53 | 0.41 |  |
| 4 | Bard | +1.10 | 1.10 | 0.00 |  |
| 5 | Maokai | +1.09 | 1.14 | 0.05 |  |
| 6 | Xayah | +1.07 | 1.07 | 0.00 |  |
| 7 | Fiora | +1.05 | 1.05 | 0.00 |  |
| 8 | Lissandra | +1.02 | 1.02 | 0.00 |  |
| 9 | Samira | +1.02 | 1.02 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 10 | Vladimir | +1.01 | 1.09 | 0.08 |  |
| 11 | Aurora | +1.00 | 1.00 | 0.00 |  |
| 12 | Mel | +1.00 | 1.00 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 13 | Braum | +0.93 | 0.98 | 0.05 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 14 | Nocturne | +0.93 | 0.98 | 0.05 |  |
| 15 | Gwen | +0.93 | 0.93 | 0.00 |  |
| 16 | Kayle | +0.90 | 0.90 | 0.00 |  |
| 17 | Kindred | +0.88 | 0.88 | 0.00 |  |
| 18 | Master Yi | +0.84 | 1.07 | 0.23 |  |
| 19 | Yasuo | +0.82 | 0.82 | 0.00 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 20 | Rek'Sai | +0.81 | 0.81 | 0.00 |  |
| 21 | Ekko | +0.80 | 0.83 | 0.03 |  |
| 22 | Evelynn | +0.78 | 0.81 | 0.03 |  |
| 23 | Shaco | +0.78 | 0.81 | 0.03 |  |
| 24 | Singed | +0.77 | 0.87 | 0.10 |  |
| 25 | Camille | +0.76 | 0.79 | 0.03 |  |
| 26 | Morgana | +0.76 | 0.76 | 0.00 |  |
| 27 | Jax | +0.73 | 0.78 | 0.05 | attack dodge (Counter Strike) |
| 28 | Zed | +0.73 | 0.76 | 0.03 |  |
| 29 | Udyr | +0.72 | 0.77 | 0.05 |  |
| 30 | Milio | +0.68 | 0.68 | 0.00 |  |
| 31 | Teemo | +0.62 | 0.62 | 0.00 |  |
| 32 | Pantheon | +0.59 | 0.69 | 0.10 |  |
| 33 | Cassiopeia | +0.57 | 0.57 | 0.00 |  |
| 34 | Lulu | +0.57 | 0.57 | 0.00 |  |
| 35 | Nilah | +0.57 | 0.57 | 0.00 | attack dodge (Jubilant Veil) |
| 36 | Kalista | +0.56 | 0.56 | 0.00 |  |
| 37 | Jinx | +0.54 | 0.54 | 0.00 |  |
| 38 | Viktor | +0.53 | 0.53 | 0.00 |  |
| 39 | Rengar | +0.52 | 0.62 | 0.10 |  |
| 40 | Xin Zhao | +0.52 | 0.52 | 0.00 |  |
| 41 | Hwei | +0.50 | 0.50 | 0.00 |  |
| 42 | Taric | +0.50 | 0.50 | 0.00 |  |
| 43 | Vex | +0.48 | 0.48 | 0.00 |  |
| 44 | Ahri | +0.47 | 0.47 | 0.00 |  |
| 45 | Veigar | +0.47 | 0.47 | 0.00 |  |
| 46 | Varus | +0.46 | 0.57 | 0.11 |  |
| 47 | Gangplank | +0.42 | 0.52 | 0.10 |  |
| 48 | Aphelios | +0.40 | 0.40 | 0.00 |  |
| 49 | Zaahen | +0.40 | 0.40 | 0.00 |  |
| 50 | Zeri | +0.39 | 0.39 | 0.00 |  |
| 51 | Kled | +0.38 | 0.38 | 0.00 |  |
| 52 | Twitch | +0.38 | 0.38 | 0.00 |  |
| 53 | Vayne | +0.38 | 0.38 | 0.00 |  |
| 54 | Kayn | +0.36 | 0.81 | 0.45 |  |
| 55 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 56 | Sona | +0.36 | 0.36 | 0.00 |  |
| 57 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 58 | Renata Glasc | +0.34 | 0.34 | 0.00 |  |
| 59 | Yunara | +0.34 | 0.34 | 0.00 |  |
| 60 | Malzahar | +0.33 | 0.73 | 0.40 |  |
| 61 | Draven | +0.32 | 0.32 | 0.00 |  |
| 62 | Senna | +0.32 | 0.32 | 0.00 |  |
| 63 | Garen | +0.31 | 0.31 | 0.00 |  |
| 64 | Kai'Sa | +0.31 | 0.31 | 0.00 |  |
| 65 | Olaf | +0.30 | 0.40 | 0.10 |  |
| 66 | Sion | +0.29 | 0.42 | 0.13 |  |
| 67 | Alistar | +0.28 | 0.33 | 0.05 |  |
| 68 | Ezreal | +0.28 | 0.28 | 0.00 |  |
| 69 | Smolder | +0.28 | 0.28 | 0.00 |  |
| 70 | Zilean | +0.28 | 0.28 | 0.00 |  |
| 71 | Zoe | +0.28 | 0.28 | 0.00 |  |
| 72 | Shen | +0.27 | 0.75 | 0.48 | attack block (Spirit's Refuge) |
| 73 | Gnar | +0.27 | 0.27 | 0.00 |  |
| 74 | Corki | +0.26 | 0.26 | 0.00 |  |
| 75 | Poppy | +0.25 | 0.50 | 0.25 | dash stop (Steadfast Presence) |
| 76 | Kennen | +0.25 | 0.25 | 0.00 |  |
| 77 | Lux | +0.25 | 0.25 | 0.00 |  |
| 78 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 79 | Heimerdinger | +0.24 | 0.24 | 0.00 |  |
| 80 | Jayce | +0.24 | 0.24 | 0.00 |  |
| 81 | Nidalee | +0.24 | 0.24 | 0.00 |  |
| 82 | Seraphine | +0.24 | 0.24 | 0.00 |  |
| 83 | Soraka | +0.23 | 0.23 | 0.00 |  |
| 84 | Ziggs | +0.23 | 0.23 | 0.00 |  |
| 85 | Annie | +0.22 | 0.22 | 0.00 |  |
| 86 | Azir | +0.22 | 0.22 | 0.00 |  |
| 87 | Kog'Maw | +0.22 | 0.22 | 0.00 |  |
| 88 | Orianna | +0.22 | 0.22 | 0.00 |  |
| 89 | Zyra | +0.22 | 0.22 | 0.00 |  |
| 90 | Brand | +0.19 | 0.19 | 0.00 |  |
| 91 | Nami | +0.19 | 0.19 | 0.00 |  |
| 92 | Neeko | +0.19 | 0.19 | 0.00 |  |
| 93 | Syndra | +0.19 | 0.19 | 0.00 |  |
| 94 | Graves | +0.18 | 0.18 | 0.00 |  |
| 95 | Karma | +0.18 | 0.18 | 0.00 |  |
| 96 | LeBlanc | +0.18 | 0.18 | 0.00 |  |
| 97 | Yone | +0.18 | 0.18 | 0.00 |  |
| 98 | Nasus | +0.17 | 0.27 | 0.10 |  |
| 99 | Swain | +0.17 | 0.17 | 0.00 |  |
| 100 | Thresh | +0.15 | 0.15 | 0.00 |  |
| 101 | Warwick | +0.14 | 0.47 | 0.33 |  |
| 102 | Malphite | +0.13 | 0.18 | 0.05 |  |
| 103 | Quinn | +0.12 | 0.31 | 0.19 |  |
| 104 | Amumu | +0.12 | 0.17 | 0.05 |  |
| 105 | Aurelion Sol | +0.11 | 0.19 | 0.08 |  |
| 106 | Urgot | +0.10 | 0.10 | 0.00 |  |
| 107 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 108 | Lillia | +0.07 | 0.07 | 0.00 |  |
| 109 | Rakan | +0.07 | 0.07 | 0.00 |  |
| 110 | Skarner | +0.07 | 0.07 | 0.00 |  |
| 111 | Mordekaiser | +0.06 | 0.06 | 0.00 |  |
| 112 | Lucian | +0.01 | 0.29 | 0.28 |  |
| 113 | Twisted Fate | 0.00 | 0.35 | 0.35 |  |
| 114 | Miss Fortune | 0.00 | 0.28 | 0.28 |  |
| 115 | Ivern | 0.00 | 0.15 | 0.15 |  |
| 116 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 117 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 118 | Darius | 0.00 | 0.00 | 0.00 |  |
| 119 | Diana | 0.00 | 0.00 | 0.00 |  |
| 120 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 121 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 122 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 123 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 124 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 125 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 126 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 127 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 128 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 129 | Rell | 0.00 | 0.00 | 0.00 |  |
| 130 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 131 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 132 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 133 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 134 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 135 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 136 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 137 | Katarina | -0.01 | 0.32 | 0.33 |  |
| 138 | Akshan | -0.01 | 0.27 | 0.28 |  |
| 139 | Akali | -0.03 | 0.00 | 0.03 |  |
| 140 | Ambessa | -0.03 | 0.00 | 0.03 |  |
| 141 | Briar | -0.03 | 0.00 | 0.03 |  |
| 142 | Lee Sin | -0.03 | 0.00 | 0.03 |  |
| 143 | Riven | -0.03 | 0.00 | 0.03 |  |
| 144 | Talon | -0.03 | 0.00 | 0.03 |  |
| 145 | Rammus | -0.05 | 0.27 | 0.32 |  |
| 146 | Jhin | -0.05 | 0.23 | 0.28 |  |
| 147 | Illaoi | -0.05 | 0.00 | 0.05 |  |
| 148 | Kha'Zix | -0.05 | 0.00 | 0.05 |  |
| 149 | Leona | -0.05 | 0.00 | 0.05 |  |
| 150 | Locke | -0.05 | 0.00 | 0.05 |  |
| 151 | Renekton | -0.05 | 0.00 | 0.05 |  |
| 152 | Sett | -0.05 | 0.00 | 0.05 |  |
| 153 | Vel'Koz | -0.06 | 0.22 | 0.28 |  |
| 154 | Janna | -0.08 | 0.32 | 0.40 |  |
| 155 | Xerath | -0.10 | 0.22 | 0.32 |  |
| 156 | Blitzcrank | -0.10 | 0.00 | 0.10 |  |
| 157 | Cho'Gath | -0.10 | 0.00 | 0.10 |  |
| 158 | Dr. Mundo | -0.10 | 0.00 | 0.10 |  |
| 159 | Rumble | -0.10 | 0.00 | 0.10 |  |
| 160 | Zac | -0.13 | 0.34 | 0.47 |  |
| 161 | Karthus | -0.13 | 0.15 | 0.28 |  |
| 162 | Ryze | -0.14 | 0.21 | 0.35 |  |
| 163 | Pyke | -0.15 | 0.00 | 0.15 |  |
| 164 | Galio | -0.18 | 0.00 | 0.18 |  |
| 165 | Gragas | -0.21 | 0.00 | 0.21 |  |
| 166 | Viego | -0.22 | 0.00 | 0.22 |  |
| 167 | Taliyah | -0.26 | 0.22 | 0.48 |  |
| 168 | Fiddlesticks | -0.30 | 0.15 | 0.45 |  |
| 169 | Vi | -0.41 | 0.00 | 0.41 |  |
| 170 | Nunu & Willump | -0.42 | 0.17 | 0.59 |  |
| 171 | Naafiri | -0.48 | 0.00 | 0.48 |  |
| 172 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
