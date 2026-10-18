# Counters to Morgana (patch 26.20)

## Simulated duels

The duel simulator played each of the 72 other champions with a simulator kit against Morgana: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Morgana wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Morgana --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Master Yi | +0.87 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +1.00 |
| 2 | Fiora | +0.87 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +1.00 |
| 3 | Ashe | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 4 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 5 | Heimerdinger | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 6 | Urgot | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 7 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 8 | Annie | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 9 | Cassiopeia | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 10 | Gnar | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 11 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 12 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 13 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 14 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 15 | Vayne | +0.78 | +1.00 | +0.94 | +1.00 | −0.03 | +1.00 | +0.00 |
| 16 | Aurora | +0.76 | +1.00 | +1.00 | +0.99 | +0.00 | +0.66 | +0.00 |
| 17 | Quinn | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 18 | Dr. Mundo | +0.76 | +0.90 | +0.98 | +1.00 | −0.09 | +0.99 | +0.00 |
| 19 | Jayce | +0.75 | +0.87 | +1.00 | +0.92 | +0.02 | +0.97 | +0.00 |
| 20 | Vladimir | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 21 | Kennen | +0.53 | +0.52 | +0.55 | +0.98 | −0.19 | +1.00 | +0.00 |
| 22 | Anivia | +0.42 | +0.55 | +0.41 | +0.93 | −0.12 | +0.12 | +0.00 |
| 23 | Vel'Koz | +0.42 | +0.55 | +0.74 | +0.20 | +0.07 | – | +0.00 |
| 24 | Gangplank | +0.34 | +1.00 | +0.68 | −0.75 | −0.02 | +0.75 | +0.02 |
| 25 | Teemo | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 26 | Malzahar | +0.33 | +1.00 | +1.00 | −1.00 | −0.03 | – | +0.00 |
| 27 | Ziggs | +0.26 | +1.00 | +1.00 | −0.77 | +0.11 | −1.00 | +0.00 |
| 28 | Brand | +0.19 | +0.17 | −0.02 | +0.38 | −0.02 | +0.75 | +0.00 |
| 29 | Kled | +0.16 | +1.00 | +0.00 | −0.17 | −0.12 | −0.35 | +0.00 |
| 30 | Renekton | +0.15 | +0.50 | +0.09 | +0.04 | −0.10 | +0.06 | +0.00 |
| 31 | Veigar | +0.07 | +0.13 | +0.18 | −0.20 | −0.00 | +0.29 | +0.00 |
| 32 | Lux | +0.05 | −0.05 | −0.01 | +0.28 | −0.02 | +0.10 | +0.00 |
| 33 | Trundle | +0.02 | −0.57 | −0.05 | +1.00 | −0.27 | +0.19 | +0.00 |
| 34 | Zyra | +0.01 | +0.21 | +0.02 | −0.23 | +0.08 | −0.16 | +0.00 |
| 35 | Yasuo | −0.01 | −0.00 | +0.87 | −1.00 | −0.16 | −0.01 | +0.00 |
| 36 | Zaahen | −0.04 | −1.00 | −0.18 | +1.00 | +0.32 | +0.04 | +0.00 |
| 37 | Tahm Kench | −0.06 | −0.11 | −0.05 | −0.02 | −0.11 | −0.01 | +0.00 |
| 38 | Ahri | −0.11 | −0.44 | +0.22 | −0.42 | −0.02 | +0.36 | +0.00 |
| 39 | Shen | −0.12 | −0.19 | −0.13 | −0.12 | −0.08 | −0.06 | +0.00 |
| 40 | Darius | −0.14 | +1.00 | −0.85 | −1.00 | −0.06 | +0.32 | +0.00 |
| 41 | Ornn | −0.14 | −0.21 | −0.15 | −0.16 | −0.07 | −0.09 | +0.00 |
| 42 | Karthus | −0.18 | −0.11 | +0.00 | −0.62 | −0.06 | – | +0.00 |
| 43 | Malphite | −0.20 | −0.22 | −0.22 | −0.37 | +0.08 | −0.32 | +0.00 |
| 44 | Udyr | −0.21 | −0.34 | −0.92 | +1.00 | −0.06 | −0.84 | +0.00 |
| 45 | Sett | −0.25 | −0.48 | −0.18 | −0.12 | −0.12 | −0.48 | +0.00 |
| 46 | Rammus | −0.26 | +0.02 | +0.01 | −0.82 | −0.11 | −0.86 | +0.00 |
| 47 | Tryndamere | −0.31 | −1.00 | −0.93 | +1.00 | −0.16 | +0.00 | +0.00 |
| 48 | Irelia | −0.41 | −0.83 | −0.89 | +0.64 | −0.07 | −1.00 | +0.00 |
| 49 | Olaf | −0.41 | −1.00 | −1.00 | +1.00 | −0.10 | −1.00 | +0.00 |
| 50 | Akali | −0.53 | −0.15 | −1.00 | −0.73 | −0.05 | −0.93 | +0.00 |
| 51 | Illaoi | −0.54 | −1.00 | −0.73 | −0.02 | −0.07 | −0.89 | +0.00 |
| 52 | Riven | −0.55 | −1.00 | −1.00 | +0.02 | +0.24 | −0.89 | +0.00 |
| 53 | Kassadin | −0.58 | −0.95 | −0.97 | −1.00 | +0.03 | +1.00 | +0.00 |
| 54 | Lissandra | −0.59 | −1.00 | −0.65 | −0.98 | +0.05 | +0.16 | +0.00 |
| 55 | Pantheon | −0.69 | −1.00 | −1.00 | −1.00 | +0.06 | +0.00 | +0.00 |
| 56 | Mordekaiser | −0.72 | −0.98 | −1.00 | −0.55 | −0.08 | −0.99 | +0.00 |
| 57 | Aatrox | −0.73 | −0.98 | −1.00 | −1.00 | −0.22 | +0.00 | +0.00 |
| 58 | Garen | −0.74 | −1.00 | −1.00 | −1.00 | −0.08 | −0.29 | +0.00 |
| 59 | Yone | −0.76 | −0.97 | −0.86 | −1.00 | −0.03 | −0.97 | +0.00 |
| 60 | Cho'Gath | −0.77 | −0.99 | −0.85 | −0.99 | −0.10 | −0.95 | +0.00 |
| 61 | Rumble | −0.77 | −0.95 | −0.95 | −0.89 | −0.16 | −0.94 | +0.00 |
| 62 | Sion | −0.78 | −0.97 | −1.00 | −1.00 | +0.05 | −0.99 | +0.00 |
| 63 | Singed | −0.79 | −0.96 | −1.00 | −0.83 | −0.23 | −1.00 | +0.00 |
| 64 | Camille | −0.79 | −0.95 | −0.96 | −1.00 | −0.14 | −0.93 | +0.00 |
| 65 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 66 | Leona | −0.81 | −0.99 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 67 | Gwen | −0.81 | −0.97 | −0.97 | −0.94 | −0.31 | −0.87 | +0.00 |
| 68 | Ambessa | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 69 | Skarner | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 70 | Amumu | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 71 | Volibear | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 72 | Xin Zhao | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Morgana's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Morgana's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Morgana` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Yuumi (net +0.80)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Morgana's Dark Binding. Untargetable for ?; Dark Binding takes 1.33 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Morgana Q Dark Binding)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Morgana's Soul Shackles. Untargetable for ?; Soul Shackles takes 0.35 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Morgana R Soul Shackles)
- Watch out: Black Shield makes Morgana immune to Yuumi's Final Chapter (slow).

#### 2. Master Yi (net +0.79)

- **0.55** untargetable: Alpha Strike makes Master Yi untargetable, dodging Morgana's Soul Shackles. Untargetable for ?; Soul Shackles takes 0.35 s to land, enough to react. (Master Yi Q Alpha Strike → Morgana R Soul Shackles)
- **0.51** untargetable: Alpha Strike makes Master Yi untargetable, dodging Morgana's Dark Binding. Untargetable for ?; Dark Binding takes 1.33 s to land, enough to react. (Master Yi Q Alpha Strike → Morgana Q Dark Binding)
- **0.11** cleanse: Highlander cleanses Morgana's Soul Shackles (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove stun. (Master Yi R Highlander → Morgana R Soul Shackles)
- Watch out: Morgana's basic attacks reach 275 units farther than Master Yi's (450 vs 175 attack range).

#### 3. Vladimir (net +0.67)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Morgana's Soul Shackles. Untargetable for 2 s, long enough to use ahead of Soul Shackles. (Vladimir W Sanguine Pool → Morgana R Soul Shackles)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Morgana's Dark Binding. Untargetable for 2 s, long enough to use ahead of Dark Binding. (Vladimir W Sanguine Pool → Morgana Q Dark Binding)
- Watch out: Black Shield makes Morgana immune to Vladimir's Sanguine Pool (slow).

#### 4. Sivir (net +0.65)

- **0.51** spell shield: Spell Shield's spell shield blocks Morgana's Dark Binding. Spell shield for 1.5 s, long enough to use ahead of Dark Binding. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Morgana Q Dark Binding)
- **0.28** spell shield: Spell Shield's spell shield blocks part of Morgana's Soul Shackles. Spell shield for 1.5 s, long enough to use ahead of Soul Shackles. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the tether's application and initial damage but not the aftereffects of one already applied. (Sivir E Spell Shield → Morgana R Soul Shackles)

#### 5. Kayle (net +0.61)

- **0.32** range: Kayle's basic attacks reach 175 units farther than Morgana's (625 vs 450 attack range). Morgana has no dash or blink to close the gap. (Kayle basic attacks → Morgana basic attacks)
- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Morgana's Soul Shackles (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Soul Shackles. (Kayle R Divine Judgment → Morgana R Soul Shackles)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Morgana's Dark Binding (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Dark Binding. (Kayle R Divine Judgment → Morgana Q Dark Binding)
- Watch out: Black Shield makes Morgana immune to Kayle's Radiant Blast (slow).

#### 6. Zed (net +0.51)

- **0.55** untargetable: Death Mark makes Zed untargetable, dodging Morgana's Soul Shackles. Untargetable for 0.6 s; Soul Shackles takes 0.35 s to land, enough to react. (Zed R Death Mark → Morgana R Soul Shackles)
- **0.32** untargetable: Death Mark makes Zed untargetable, dodging Morgana's Dark Binding. Untargetable for 0.6 s; Dark Binding takes 1.33 s to land, enough to react. (Zed R Death Mark → Morgana Q Dark Binding)
- Watch out: Morgana's basic attacks reach 325 units farther than Zed's (450 vs 125 attack range).

#### 7. Gwen (net +0.49)

- **0.55** untargetable: Hallowed Mist makes Gwen untargetable, dodging Morgana's Soul Shackles. Untargetable for ?; Soul Shackles takes 0.35 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Morgana R Soul Shackles)
- **0.51** untargetable: Hallowed Mist makes Gwen untargetable, dodging Morgana's Dark Binding. Untargetable for ?; Dark Binding takes 1.33 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Morgana Q Dark Binding)
- Watch out: Morgana's basic attacks reach 300 units farther than Gwen's (450 vs 150 attack range).

#### 8. Aurora (net +0.46)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Morgana's Soul Shackles. Untargetable for 0.4 s; Soul Shackles takes 0.35 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Morgana R Soul Shackles)
- **0.32** untargetable: Between Worlds makes Aurora untargetable, dodging Morgana's Dark Binding. Untargetable for 0.4 s; Dark Binding takes 1.33 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Morgana Q Dark Binding)
- **0.14** range: Aurora's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range). Morgana has no dash or blink to close the gap. (Aurora basic attacks → Morgana basic attacks)
- Watch out: Black Shield makes Morgana immune to Aurora's Between Worlds (slow).

#### 9. Xayah (net +0.36)

- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Morgana's Soul Shackles. Untargetable for 1.5 s, long enough to use ahead of Soul Shackles. (Xayah R Featherstorm → Morgana R Soul Shackles)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Morgana's Dark Binding. Untargetable for 1.5 s, long enough to use ahead of Dark Binding. (Xayah R Featherstorm → Morgana Q Dark Binding)
- **0.14** range: Xayah's basic attacks reach 75 units farther than Morgana's (525 vs 450 attack range). Morgana has no dash or blink to close the gap. (Xayah basic attacks → Morgana basic attacks)
- Watch out: Black Shield makes Morgana immune to Xayah's Bladecaller (root).

#### 10. Fiora (net +0.32)

- **0.65** parry: Riposte parries Morgana's Soul Shackles and stuns back. Parry for 0.75 s; Soul Shackles takes 0.35 s to land, enough to react. Negating Soul Shackles's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Morgana R Soul Shackles)
- **0.64** parry: Riposte parries Morgana's Dark Binding and stuns back. Parry for 0.75 s; Dark Binding takes 1.33 s to land, enough to react. Negating Dark Binding's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Morgana Q Dark Binding)
- **0.06** attack speed slow: Riposte cuts Morgana's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Morgana basic attacks)
- Watch out: Black Shield makes Morgana immune to Fiora's Riposte (cripple, slow, stun).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +0.80 | 0.98 | 0.18 |  |
| 2 | Master Yi | +0.79 | 0.95 | 0.16 |  |
| 3 | Vladimir | +0.67 | 0.82 | 0.15 |  |
| 4 | Sivir | +0.65 | 0.65 | 0.00 |  |
| 5 | Kayle | +0.61 | 0.69 | 0.08 |  |
| 6 | Zed | +0.51 | 0.71 | 0.20 |  |
| 7 | Gwen | +0.49 | 0.81 | 0.32 |  |
| 8 | Aurora | +0.46 | 0.85 | 0.39 |  |
| 9 | Xayah | +0.36 | 0.85 | 0.49 |  |
| 10 | Fiora | +0.32 | 0.99 | 0.67 |  |
| 11 | Rek'Sai | +0.26 | 0.72 | 0.46 |  |
| 12 | Olaf | +0.25 | 0.72 | 0.47 |  |
| 13 | Samira | +0.22 | 0.57 | 0.35 | projectile block (Blade Whirl) |
| 14 | Milio | +0.17 | 0.71 | 0.54 |  |
| 15 | Ezreal | +0.16 | 0.16 | 0.00 |  |
| 16 | Mel | +0.15 | 0.67 | 0.52 | projectile block (Rebuttal) |
| 17 | Zeri | +0.14 | 0.22 | 0.08 |  |
| 18 | Udyr | +0.11 | 0.98 | 0.87 |  |
| 19 | Nidalee | +0.11 | 0.11 | 0.00 |  |
| 20 | Gangplank | +0.10 | 0.68 | 0.58 |  |
| 21 | Kayn | +0.09 | 0.72 | 0.63 |  |
| 22 | Yunara | +0.08 | 0.22 | 0.14 |  |
| 23 | Miss Fortune | +0.06 | 0.16 | 0.10 |  |
| 24 | Fizz | +0.03 | 0.98 | 0.95 |  |
| 25 | Kai'Sa | +0.03 | 0.14 | 0.11 |  |
| 26 | Twitch | +0.02 | 0.21 | 0.19 |  |
| 27 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 28 | Teemo | -0.02 | 0.31 | 0.33 |  |
| 29 | Smolder | -0.03 | 0.16 | 0.19 |  |
| 30 | Evelynn | -0.06 | 0.72 | 0.78 |  |
| 31 | Katarina | -0.07 | 0.12 | 0.19 |  |
| 32 | Kindred | -0.08 | 0.00 | 0.08 |  |
| 33 | Kog'Maw | -0.10 | 0.00 | 0.10 |  |
| 34 | Nocturne | -0.11 | 0.77 | 0.88 |  |
| 35 | Graves | -0.11 | 0.00 | 0.11 |  |
| 36 | Karthus | -0.11 | 0.00 | 0.11 |  |
| 37 | Akshan | -0.14 | 0.00 | 0.14 |  |
| 38 | Garen | -0.16 | 0.36 | 0.52 |  |
| 39 | Zaahen | -0.21 | 0.72 | 0.93 |  |
| 40 | Lissandra | -0.24 | 0.83 | 1.07 |  |
| 41 | Caitlyn | -0.24 | 0.36 | 0.60 |  |
| 42 | Nasus | -0.24 | 0.24 | 0.48 |  |
| 43 | Annie | -0.24 | 0.19 | 0.43 |  |
| 44 | Bard | -0.25 | 0.72 | 0.97 |  |
| 45 | Tryndamere | -0.26 | 0.00 | 0.26 |  |
| 46 | Twisted Fate | -0.28 | 0.16 | 0.44 |  |
| 47 | Rengar | -0.29 | 0.78 | 1.07 |  |
| 48 | Kennen | -0.29 | 0.14 | 0.43 |  |
| 49 | Illaoi | -0.29 | 0.00 | 0.29 |  |
| 50 | Akali | -0.30 | 0.00 | 0.30 |  |
| 51 | Shaco | -0.32 | 0.72 | 1.04 |  |
| 52 | Naafiri | -0.33 | 0.00 | 0.33 |  |
| 53 | Kalista | -0.34 | 0.65 | 0.99 |  |
| 54 | Talon | -0.34 | 0.00 | 0.34 |  |
| 55 | Braum | -0.35 | 0.87 | 1.22 | projectile block (Unbreakable) |
| 56 | LeBlanc | -0.37 | 0.08 | 0.45 |  |
| 57 | Locke | -0.37 | 0.00 | 0.37 |  |
| 58 | Elise | -0.38 | 0.16 | 0.54 |  |
| 59 | Zilean | -0.39 | 0.16 | 0.55 |  |
| 60 | Corki | -0.39 | 0.15 | 0.54 |  |
| 61 | Malzahar | -0.40 | 0.49 | 0.89 |  |
| 62 | Ryze | -0.40 | 0.12 | 0.52 |  |
| 63 | Brand | -0.40 | 0.11 | 0.51 |  |
| 64 | Pantheon | -0.41 | 0.41 | 0.82 |  |
| 65 | Tristana | -0.42 | 0.45 | 0.87 |  |
| 66 | Draven | -0.42 | 0.18 | 0.60 |  |
| 67 | Kassadin | -0.42 | 0.00 | 0.42 |  |
| 68 | Lux | -0.44 | 0.14 | 0.58 |  |
| 69 | Jax | -0.46 | 0.25 | 0.71 |  |
| 70 | Vex | -0.47 | 0.13 | 0.60 |  |
| 71 | Jinx | -0.47 | 0.11 | 0.58 |  |
| 72 | Dr. Mundo | -0.47 | 0.00 | 0.47 |  |
| 73 | Zoe | -0.49 | 0.16 | 0.65 |  |
| 74 | Ahri | -0.49 | 0.11 | 0.60 |  |
| 75 | Senna | -0.50 | 0.24 | 0.74 |  |
| 76 | Quinn | -0.50 | 0.14 | 0.64 |  |
| 77 | Maokai | -0.52 | 0.98 | 1.50 |  |
| 78 | Xerath | -0.52 | 0.10 | 0.62 |  |
| 79 | Kha'Zix | -0.52 | 0.00 | 0.52 |  |
| 80 | Vayne | -0.53 | 0.21 | 0.74 |  |
| 81 | Veigar | -0.53 | 0.12 | 0.65 |  |
| 82 | Vel'Koz | -0.53 | 0.10 | 0.63 |  |
| 83 | Swain | -0.54 | 0.08 | 0.62 |  |
| 84 | Lulu | -0.55 | 0.40 | 0.95 |  |
| 85 | Varus | -0.56 | 0.29 | 0.85 |  |
| 86 | Ashe | -0.56 | 0.27 | 0.83 |  |
| 87 | Jhin | -0.57 | 0.13 | 0.70 |  |
| 88 | Rumble | -0.57 | 0.00 | 0.57 |  |
| 89 | Sona | -0.59 | 0.21 | 0.80 |  |
| 90 | Ekko | -0.59 | 0.00 | 0.59 |  |
| 91 | Jayce | -0.59 | 0.00 | 0.59 |  |
| 92 | Syndra | -0.60 | 0.11 | 0.71 |  |
| 93 | Kled | -0.61 | 0.68 | 1.29 |  |
| 94 | Soraka | -0.61 | 0.13 | 0.74 |  |
| 95 | Sion | -0.64 | 0.73 | 1.37 |  |
| 96 | Alistar | -0.64 | 0.57 | 1.21 |  |
| 97 | Ziggs | -0.65 | 0.13 | 0.78 |  |
| 98 | Yasuo | -0.67 | 0.66 | 1.33 | projectile block (Wind Wall) |
| 99 | Viktor | -0.67 | 0.12 | 0.79 |  |
| 100 | Bel'Veth | -0.67 | 0.00 | 0.67 |  |
| 101 | Karma | -0.68 | 0.08 | 0.76 |  |
| 102 | Renekton | -0.68 | 0.00 | 0.68 |  |
| 103 | Warwick | -0.70 | 0.72 | 1.42 |  |
| 104 | Heimerdinger | -0.70 | 0.16 | 0.86 |  |
| 105 | Ivern | -0.70 | 0.00 | 0.70 |  |
| 106 | Shen | -0.71 | 0.24 | 0.95 |  |
| 107 | Nilah | -0.71 | 0.22 | 0.93 |  |
| 108 | Fiddlesticks | -0.71 | 0.00 | 0.71 |  |
| 109 | Azir | -0.74 | 0.10 | 0.84 |  |
| 110 | Orianna | -0.74 | 0.10 | 0.84 |  |
| 111 | Irelia | -0.76 | 0.00 | 0.76 |  |
| 112 | Anivia | -0.77 | 0.18 | 0.95 |  |
| 113 | Camille | -0.79 | 0.72 | 1.51 |  |
| 114 | Aatrox | -0.79 | 0.00 | 0.79 |  |
| 115 | Hwei | -0.81 | 0.11 | 0.92 |  |
| 116 | Singed | -0.82 | 0.18 | 1.00 |  |
| 117 | Cassiopeia | -0.83 | 0.11 | 0.94 |  |
| 118 | Mordekaiser | -0.83 | 0.06 | 0.89 |  |
| 119 | Aphelios | -0.84 | 0.25 | 1.09 |  |
| 120 | Xin Zhao | -0.86 | 0.36 | 1.22 |  |
| 121 | Sylas | -0.90 | 0.00 | 0.90 |  |
| 122 | Lillia | -0.92 | 0.00 | 0.92 |  |
| 123 | Zyra | -0.94 | 0.15 | 1.09 |  |
| 124 | Nami | -0.94 | 0.11 | 1.05 |  |
| 125 | Thresh | -0.94 | 0.00 | 0.94 |  |
| 126 | Cho'Gath | -0.95 | 0.00 | 0.95 |  |
| 127 | Janna | -0.96 | 0.18 | 1.14 |  |
| 128 | Taric | -0.96 | 0.00 | 0.96 |  |
| 129 | Yorick | -0.97 | 0.00 | 0.97 |  |
| 130 | Renata Glasc | -0.98 | 0.19 | 1.17 |  |
| 131 | Seraphine | -0.98 | 0.11 | 1.09 |  |
| 132 | Diana | -0.98 | 0.00 | 0.98 |  |
| 133 | Lee Sin | -0.98 | 0.00 | 0.98 |  |
| 134 | Shyvana | -1.00 | 0.00 | 1.00 |  |
| 135 | Aurelion Sol | -1.03 | 0.11 | 1.14 |  |
| 136 | Trundle | -1.04 | 0.00 | 1.04 |  |
| 137 | Volibear | -1.04 | 0.00 | 1.04 |  |
| 138 | Neeko | -1.07 | 0.11 | 1.18 |  |
| 139 | Darius | -1.07 | 0.00 | 1.07 |  |
| 140 | Malphite | -1.09 | 0.16 | 1.25 |  |
| 141 | Gnar | -1.09 | 0.00 | 1.09 |  |
| 142 | Wukong | -1.11 | 0.00 | 1.11 |  |
| 143 | Ambessa | -1.17 | 0.00 | 1.17 |  |
| 144 | Nunu & Willump | -1.18 | 0.17 | 1.35 |  |
| 145 | Rakan | -1.25 | 0.00 | 1.25 |  |
| 146 | Riven | -1.25 | 0.00 | 1.25 |  |
| 147 | Rammus | -1.26 | 0.24 | 1.50 |  |
| 148 | Urgot | -1.28 | 0.00 | 1.28 |  |
| 149 | Pyke | -1.29 | 0.00 | 1.29 |  |
| 150 | Taliyah | -1.31 | 0.10 | 1.41 |  |
| 151 | Poppy | -1.32 | 0.00 | 1.32 |  |
| 152 | Skarner | -1.35 | 0.07 | 1.42 |  |
| 153 | Jarvan IV | -1.35 | 0.00 | 1.35 |  |
| 154 | Yone | -1.36 | 0.00 | 1.36 |  |
| 155 | Qiyana | -1.37 | 0.00 | 1.37 |  |
| 156 | Tahm Kench | -1.37 | 0.00 | 1.37 |  |
| 157 | Blitzcrank | -1.38 | 0.00 | 1.38 |  |
| 158 | Nautilus | -1.39 | 0.00 | 1.39 |  |
| 159 | Leona | -1.41 | 0.00 | 1.41 |  |
| 160 | Amumu | -1.44 | 0.00 | 1.44 |  |
| 161 | Vi | -1.44 | 0.00 | 1.44 |  |
| 162 | Zac | -1.45 | 0.00 | 1.45 |  |
| 163 | Gragas | -1.46 | 0.00 | 1.46 |  |
| 164 | Sett | -1.46 | 0.00 | 1.46 |  |
| 165 | Briar | -1.51 | 0.00 | 1.51 |  |
| 166 | Hecarim | -1.51 | 0.00 | 1.51 |  |
| 167 | Sejuani | -1.53 | 0.00 | 1.53 |  |
| 168 | Viego | -1.53 | 0.00 | 1.53 |  |
| 169 | Ornn | -1.57 | 0.00 | 1.57 |  |
| 170 | K'Sante | -1.59 | 0.00 | 1.59 |  |
| 171 | Rell | -1.60 | 0.00 | 1.60 |  |
| 172 | Galio | -1.61 | 0.00 | 1.61 |  |
