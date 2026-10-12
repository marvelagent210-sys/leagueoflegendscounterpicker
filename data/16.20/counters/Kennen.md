# Counters to Kennen (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 47 other champions with a simulator kit against Kennen: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Kennen wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Kennen --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Poppy | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 2 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 3 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 4 | Malphite | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +0.99 | +0.00 |
| 5 | Renekton | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 6 | Fiora | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 7 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 8 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 9 | Kayle | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 10 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +0.98 | +0.00 |
| 11 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 12 | Udyr | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 13 | Jax | +0.75 | +0.83 | +1.00 | +0.91 | +0.04 | +1.00 | +0.00 |
| 14 | Skarner | +0.69 | +1.00 | +1.00 | +1.00 | +0.07 | −0.18 | +0.00 |
| 15 | Urgot | +0.67 | +1.00 | +1.00 | +0.90 | +0.12 | −0.25 | +0.00 |
| 16 | Jayce | +0.64 | +1.00 | +1.00 | +1.00 | −0.01 | −0.61 | +0.00 |
| 17 | Gnar | +0.62 | +1.00 | +1.00 | +1.00 | +0.03 | −0.83 | +0.00 |
| 18 | Trundle | +0.61 | +1.00 | +1.00 | +1.00 | −0.37 | −0.32 | +0.00 |
| 19 | Sett | +0.61 | +1.00 | +1.00 | +1.00 | +0.07 | −0.99 | +0.00 |
| 20 | Tryndamere | +0.61 | +1.00 | +1.00 | +1.00 | −0.07 | −0.78 | +0.00 |
| 21 | Olaf | +0.60 | +1.00 | +1.00 | +1.00 | −0.01 | −1.00 | +0.00 |
| 22 | Camille | +0.58 | +1.00 | +1.00 | +1.00 | −0.11 | −1.00 | +0.00 |
| 23 | Darius | +0.57 | +1.00 | +1.00 | +1.00 | −0.19 | −0.99 | +0.00 |
| 24 | Volibear | +0.48 | +0.82 | +0.83 | +0.81 | −0.25 | −0.54 | +0.00 |
| 25 | Zaahen | +0.46 | +1.00 | +1.00 | −0.69 | −0.01 | +1.00 | +0.00 |
| 26 | Sion | +0.31 | +0.05 | +0.04 | +0.97 | −0.01 | +0.92 | +0.00 |
| 27 | Mordekaiser | +0.29 | +0.81 | +0.29 | +0.55 | +0.01 | −0.97 | +0.00 |
| 28 | Aatrox | +0.28 | +0.59 | +0.94 | −0.02 | −0.02 | −0.96 | +0.00 |
| 29 | Tahm Kench | +0.21 | +0.40 | +0.40 | +0.11 | −0.01 | −0.06 | +0.00 |
| 30 | Gwen | +0.16 | +1.00 | +1.00 | −0.97 | −0.29 | −1.00 | +0.00 |
| 31 | Illaoi | +0.05 | −0.18 | −0.21 | +0.87 | +0.04 | −0.36 | +0.00 |
| 32 | Ornn | +0.00 | −0.02 | −0.01 | +0.01 | +0.12 | −0.14 | +0.00 |
| 33 | Shen | −0.17 | −0.61 | −0.11 | +0.03 | +0.13 | −0.18 | +0.00 |
| 34 | Kled | −0.27 | +1.00 | −0.93 | −0.99 | −0.15 | −0.71 | +0.00 |
| 35 | Irelia | −0.37 | −1.00 | −1.00 | +1.00 | +0.04 | −0.75 | +0.00 |
| 36 | Riven | −0.45 | −1.00 | −1.00 | +0.00 | +0.08 | +0.39 | +0.00 |
| 37 | Cho'Gath | −0.50 | −0.38 | −0.38 | −1.00 | −0.10 | −0.93 | +0.00 |
| 38 | Rumble | −0.65 | −1.00 | −1.00 | −1.00 | −0.04 | +0.56 | +0.00 |
| 39 | Singed | −0.73 | −0.99 | −0.78 | −0.92 | −0.03 | −1.00 | +0.00 |
| 40 | Yasuo | −0.74 | −1.00 | −1.00 | −1.00 | +0.08 | −0.50 | +0.00 |
| 41 | Garen | −0.74 | −1.00 | −1.00 | −1.00 | +0.07 | −0.54 | +0.00 |
| 42 | Quinn | −0.76 | −0.98 | −0.98 | −1.00 | +0.04 | – | +0.00 |
| 43 | Aurora | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 44 | Yone | −0.78 | −0.94 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 45 | Ambessa | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 46 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 47 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −0.96 | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Kennen's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kennen's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kennen` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Elise (net +0.75)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Kennen's Slicing Maelstrom. Untargetable for 0.6 s; Slicing Maelstrom takes 0.25 s to land, enough to react. (Elise E Rappel → Kennen R Slicing Maelstrom)
- **0.40** untargetable: Rappel makes Elise untargetable, dodging Kennen's Mark of the Storm. Untargetable for 0.6 s, timed to Mark of the Storm. (Elise E Rappel → Kennen I Mark of the Storm)

#### 2. Sivir (net +0.75)

- **0.55** spell shield: Spell Shield's spell shield blocks Kennen's Slicing Maelstrom. Spell shield for 1.5 s, long enough to use ahead of Slicing Maelstrom. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kennen R Slicing Maelstrom)
- **0.40** spell shield: Spell Shield's spell shield blocks Kennen's Mark of the Storm. Spell shield for 1.5 s, long enough to use ahead of Mark of the Storm. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kennen I Mark of the Storm)

#### 3. Kayle (net +0.69)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Kennen's Slicing Maelstrom. Invulnerable for 2.5 s, long enough to use ahead of Slicing Maelstrom. (Kayle R Divine Judgment → Kennen R Slicing Maelstrom)
- **0.14** range: Kayle's basic attacks reach 75 units farther than Kennen's (625 vs 550 attack range). Kennen has no dash or blink to close the gap. (Kayle basic attacks → Kennen basic attacks)

#### 4. Aurora (net +0.68)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Kennen's Slicing Maelstrom. Untargetable for 0.4 s; Slicing Maelstrom takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kennen R Slicing Maelstrom)
- **0.25** untargetable: Between Worlds makes Aurora untargetable, dodging Kennen's Mark of the Storm. Untargetable for 0.4 s, timed to Mark of the Storm. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kennen I Mark of the Storm)

#### 5. Bard (net +0.68)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Kennen's Slicing Maelstrom. Untargetable for 2.5 s, long enough to use ahead of Slicing Maelstrom. (Bard R Tempered Fate → Kennen R Slicing Maelstrom)
- **0.26** untargetable: Tempered Fate makes Bard untargetable, dodging Kennen's Mark of the Storm. Untargetable for 2.5 s, long enough to use ahead of Mark of the Storm. (Bard R Tempered Fate → Kennen I Mark of the Storm)

#### 6. Lissandra (net +0.68)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Kennen's Slicing Maelstrom. Untargetable for 2.5 s, long enough to use ahead of Slicing Maelstrom. (Lissandra R Frozen Tomb → Kennen R Slicing Maelstrom)
- **0.26** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Kennen's Mark of the Storm. Untargetable for 2.5 s, long enough to use ahead of Mark of the Storm. (Lissandra R Frozen Tomb → Kennen I Mark of the Storm)

#### 7. Xayah (net +0.68)

- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Kennen's Slicing Maelstrom. Untargetable for 1.5 s, long enough to use ahead of Slicing Maelstrom. (Xayah R Featherstorm → Kennen R Slicing Maelstrom)
- **0.25** untargetable: Featherstorm makes Xayah untargetable, dodging Kennen's Mark of the Storm. Untargetable for 1.5 s, long enough to use ahead of Mark of the Storm. (Xayah R Featherstorm → Kennen I Mark of the Storm)

#### 8. Vladimir (net +0.55)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kennen's Slicing Maelstrom. Untargetable for 2 s, long enough to use ahead of Slicing Maelstrom. (Vladimir W Sanguine Pool → Kennen R Slicing Maelstrom)
- **0.43** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kennen's Mark of the Storm. Untargetable for 2 s, long enough to use ahead of Mark of the Storm. (Vladimir W Sanguine Pool → Kennen I Mark of the Storm)
- Watch out: Kennen's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

#### 9. Kindred (net +0.55)

- **0.55** invulnerable: Lamb's Respite makes Kindred invulnerable to Kennen's Slicing Maelstrom. Invulnerable for ?; Slicing Maelstrom takes 0.25 s to land, enough to react. (Kindred R Lamb's Respite → Kennen R Slicing Maelstrom)

#### 10. Fiora (net +0.54)

- **0.55** parry: Riposte parries Kennen's Slicing Maelstrom. Parry for 0.75 s; Slicing Maelstrom takes 0.25 s to land, enough to react. (Fiora W Riposte → Kennen R Slicing Maelstrom)
- **0.53** parry: Riposte parries Kennen's Mark of the Storm and stuns back. Parry for 0.75 s, timed to Mark of the Storm. Negating Mark of the Storm's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Kennen I Mark of the Storm)
- **0.07** attack speed slow: Riposte cuts Kennen's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Kennen basic attacks)
- Watch out: Kennen's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +0.75 | 0.75 | 0.00 |  |
| 2 | Sivir | +0.75 | 0.75 | 0.00 |  |
| 3 | Kayle | +0.69 | 0.69 | 0.00 |  |
| 4 | Aurora | +0.68 | 0.68 | 0.00 |  |
| 5 | Bard | +0.68 | 0.68 | 0.00 |  |
| 6 | Lissandra | +0.68 | 0.68 | 0.00 |  |
| 7 | Xayah | +0.68 | 0.68 | 0.00 |  |
| 8 | Vladimir | +0.55 | 0.77 | 0.22 |  |
| 9 | Kindred | +0.55 | 0.55 | 0.00 |  |
| 10 | Fiora | +0.54 | 0.83 | 0.29 |  |
| 11 | Maokai | +0.54 | 0.83 | 0.29 |  |
| 12 | Camille | +0.54 | 0.68 | 0.14 |  |
| 13 | Nocturne | +0.51 | 0.80 | 0.29 |  |
| 14 | Ekko | +0.51 | 0.70 | 0.19 |  |
| 15 | Rek'Sai | +0.50 | 0.68 | 0.18 |  |
| 16 | Evelynn | +0.49 | 0.68 | 0.19 |  |
| 17 | Shaco | +0.49 | 0.68 | 0.19 |  |
| 18 | Zed | +0.49 | 0.68 | 0.19 |  |
| 19 | Gwen | +0.46 | 0.75 | 0.29 |  |
| 20 | Samira | +0.40 | 0.40 | 0.00 |  |
| 21 | Mel | +0.39 | 0.39 | 0.00 |  |
| 22 | Teemo | +0.38 | 0.38 | 0.00 |  |
| 23 | Yuumi | +0.33 | 0.83 | 0.50 |  |
| 24 | Braum | +0.32 | 0.61 | 0.29 | projectile block (Unbreakable) |
| 25 | Morgana | +0.29 | 0.43 | 0.14 |  |
| 26 | Xin Zhao | +0.28 | 0.55 | 0.27 |  |
| 27 | Yasuo | +0.28 | 0.46 | 0.18 |  |
| 28 | Milio | +0.28 | 0.28 | 0.00 |  |
| 29 | Pantheon | +0.27 | 0.55 | 0.28 |  |
| 30 | Lulu | +0.27 | 0.27 | 0.00 |  |
| 31 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 32 | Udyr | +0.26 | 0.55 | 0.29 |  |
| 33 | Master Yi | +0.25 | 0.75 | 0.50 |  |
| 34 | Kalista | +0.20 | 0.20 | 0.00 |  |
| 35 | Kled | +0.14 | 0.25 | 0.11 |  |
| 36 | Jax | +0.11 | 0.40 | 0.29 |  |
| 37 | Nilah | +0.10 | 0.34 | 0.24 |  |
| 38 | Zaahen | +0.08 | 0.26 | 0.18 |  |
| 39 | Annie | +0.08 | 0.08 | 0.00 |  |
| 40 | Kayn | +0.05 | 0.68 | 0.63 |  |
| 41 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 42 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 43 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 44 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 45 | Azir | 0.00 | 0.00 | 0.00 |  |
| 46 | Brand | 0.00 | 0.00 | 0.00 |  |
| 47 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 48 | Corki | 0.00 | 0.00 | 0.00 |  |
| 49 | Draven | 0.00 | 0.00 | 0.00 |  |
| 50 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 51 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 52 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 53 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 54 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 55 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 56 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 57 | Karma | 0.00 | 0.00 | 0.00 |  |
| 58 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 59 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 60 | Lux | 0.00 | 0.00 | 0.00 |  |
| 61 | Nami | 0.00 | 0.00 | 0.00 |  |
| 62 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 63 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 64 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 65 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 66 | Senna | 0.00 | 0.00 | 0.00 |  |
| 67 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 68 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 69 | Sona | 0.00 | 0.00 | 0.00 |  |
| 70 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 71 | Swain | 0.00 | 0.00 | 0.00 |  |
| 72 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 73 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 74 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 75 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 76 | Vex | 0.00 | 0.00 | 0.00 |  |
| 77 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 78 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 79 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 80 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 81 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 82 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 83 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 84 | Taric | -0.03 | 0.55 | 0.58 |  |
| 85 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 86 | Graves | -0.06 | 0.00 | 0.06 |  |
| 87 | Alistar | -0.08 | 0.21 | 0.29 |  |
| 88 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 89 | Malphite | -0.10 | 0.19 | 0.29 |  |
| 90 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 91 | Varus | -0.11 | 0.00 | 0.11 |  |
| 92 | Malzahar | -0.12 | 0.28 | 0.40 |  |
| 93 | Rakan | -0.12 | 0.00 | 0.12 |  |
| 94 | Rengar | -0.14 | 0.44 | 0.58 |  |
| 95 | Briar | -0.14 | 0.00 | 0.14 |  |
| 96 | Fizz | -0.14 | 0.00 | 0.14 |  |
| 97 | Jarvan IV | -0.14 | 0.00 | 0.14 |  |
| 98 | K'Sante | -0.14 | 0.00 | 0.14 |  |
| 99 | Sylas | -0.14 | 0.00 | 0.14 |  |
| 100 | Urgot | -0.14 | 0.00 | 0.14 |  |
| 101 | Yone | -0.14 | 0.00 | 0.14 |  |
| 102 | Lillia | -0.16 | 0.00 | 0.16 |  |
| 103 | Hecarim | -0.18 | 0.00 | 0.18 |  |
| 104 | Wukong | -0.18 | 0.00 | 0.18 |  |
| 105 | Ornn | -0.18 | 0.00 | 0.18 |  |
| 106 | Rell | -0.18 | 0.00 | 0.18 |  |
| 107 | Akali | -0.19 | 0.00 | 0.19 |  |
| 108 | Ambessa | -0.19 | 0.00 | 0.19 |  |
| 109 | Bel'Veth | -0.19 | 0.00 | 0.19 |  |
| 110 | Lee Sin | -0.19 | 0.00 | 0.19 |  |
| 111 | Qiyana | -0.19 | 0.00 | 0.19 |  |
| 112 | Quinn | -0.19 | 0.00 | 0.19 |  |
| 113 | Riven | -0.19 | 0.00 | 0.19 |  |
| 114 | Talon | -0.19 | 0.00 | 0.19 |  |
| 115 | Volibear | -0.19 | 0.00 | 0.19 |  |
| 116 | Ivern | -0.20 | 0.00 | 0.20 |  |
| 117 | Gangplank | -0.22 | 0.36 | 0.58 |  |
| 118 | Warwick | -0.22 | 0.27 | 0.49 |  |
| 119 | Irelia | -0.25 | 0.00 | 0.25 |  |
| 120 | Shen | -0.26 | 0.38 | 0.64 |  |
| 121 | Rammus | -0.27 | 0.29 | 0.56 |  |
| 122 | Aatrox | -0.27 | 0.00 | 0.27 |  |
| 123 | Nautilus | -0.27 | 0.00 | 0.27 |  |
| 124 | Tryndamere | -0.27 | 0.00 | 0.27 |  |
| 125 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 126 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 127 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 128 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 129 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 130 | Nasus | -0.29 | 0.29 | 0.58 |  |
| 131 | Amumu | -0.29 | 0.00 | 0.29 |  |
| 132 | Diana | -0.29 | 0.00 | 0.29 |  |
| 133 | Illaoi | -0.29 | 0.00 | 0.29 |  |
| 134 | Kassadin | -0.29 | 0.00 | 0.29 |  |
| 135 | Kha'Zix | -0.29 | 0.00 | 0.29 |  |
| 136 | Leona | -0.29 | 0.00 | 0.29 |  |
| 137 | Locke | -0.29 | 0.00 | 0.29 |  |
| 138 | Renekton | -0.29 | 0.00 | 0.29 |  |
| 139 | Sejuani | -0.29 | 0.00 | 0.29 |  |
| 140 | Sett | -0.29 | 0.00 | 0.29 |  |
| 141 | Shyvana | -0.29 | 0.00 | 0.29 |  |
| 142 | Olaf | -0.32 | 0.26 | 0.58 |  |
| 143 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 144 | Pyke | -0.34 | 0.00 | 0.34 |  |
| 145 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 146 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 147 | Viego | -0.35 | 0.00 | 0.35 |  |
| 148 | Galio | -0.37 | 0.00 | 0.37 |  |
| 149 | Sion | -0.39 | 0.28 | 0.67 |  |
| 150 | Garen | -0.40 | 0.14 | 0.54 |  |
| 151 | Janna | -0.40 | 0.00 | 0.40 |  |
| 152 | Karthus | -0.42 | 0.00 | 0.42 |  |
| 153 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 154 | Gragas | -0.45 | 0.00 | 0.45 |  |
| 155 | Mordekaiser | -0.47 | 0.07 | 0.54 |  |
| 156 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 157 | Poppy | -0.49 | 0.00 | 0.49 |  |
| 158 | Darius | -0.54 | 0.00 | 0.54 |  |
| 159 | Trundle | -0.54 | 0.00 | 0.54 |  |
| 160 | Yorick | -0.54 | 0.00 | 0.54 |  |
| 161 | Katarina | -0.57 | 0.00 | 0.57 |  |
| 162 | Vi | -0.57 | 0.00 | 0.57 |  |
| 163 | Blitzcrank | -0.58 | 0.00 | 0.58 |  |
| 164 | Cho'Gath | -0.58 | 0.00 | 0.58 |  |
| 165 | Dr. Mundo | -0.58 | 0.00 | 0.58 |  |
| 166 | Rumble | -0.58 | 0.00 | 0.58 |  |
| 167 | Singed | -0.58 | 0.00 | 0.58 |  |
| 168 | Skarner | -0.58 | 0.00 | 0.58 |  |
| 169 | Naafiri | -0.59 | 0.00 | 0.59 |  |
| 170 | Zac | -0.74 | 0.00 | 0.74 |  |
| 171 | Tahm Kench | -0.77 | 0.00 | 0.77 |  |
| 172 | Nunu & Willump | -1.07 | 0.00 | 1.07 |  |
