# Counters to Pantheon (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 45 other champions with a simulator kit against Pantheon: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Pantheon wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Pantheon --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.89 | +1.00 | +1.00 | +1.00 | +0.59 | +1.00 | +0.00 |
| 2 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.25 | – | +0.00 |
| 3 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.12 | – | +1.00 |
| 4 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 5 | Aurora | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 6 | Malphite | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 7 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 8 | Cho'Gath | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 9 | Olaf | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 10 | Kennen | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 11 | Tahm Kench | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 12 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 13 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 14 | Fiora | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 15 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 16 | Yone | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 17 | Shen | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 18 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 19 | Kled | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 20 | Udyr | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 21 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 22 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 23 | Rumble | +0.77 | +1.00 | +1.00 | +0.96 | −0.01 | – | +0.00 |
| 24 | Volibear | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 25 | Aatrox | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 26 | Zaahen | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 27 | Mordekaiser | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 28 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 29 | Sion | +0.76 | +0.97 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 30 | Gnar | +0.72 | +0.97 | +1.00 | +0.93 | +0.07 | +0.32 | +0.00 |
| 31 | Quinn | +0.65 | +1.00 | +1.00 | +1.00 | +0.34 | −1.00 | +0.00 |
| 32 | Urgot | +0.61 | +1.00 | +1.00 | +1.00 | +0.07 | −1.00 | +0.00 |
| 33 | Jayce | +0.56 | +1.00 | +1.00 | +0.00 | −0.00 | – | +0.00 |
| 34 | Camille | +0.47 | +0.00 | +1.00 | +1.00 | −0.19 | – | +0.00 |
| 35 | Gwen | +0.33 | +1.00 | +1.00 | −1.00 | −0.01 | – | +0.00 |
| 36 | Akali | +0.24 | +0.34 | +0.37 | +0.34 | −0.19 | – | +0.00 |
| 37 | Yasuo | +0.23 | +0.00 | +0.00 | +1.00 | +0.07 | – | +0.00 |
| 38 | Singed | +0.11 | +0.16 | +0.17 | +0.09 | −0.03 | – | +0.00 |
| 39 | Irelia | −0.24 | +0.32 | −1.00 | −0.32 | +0.11 | – | +0.00 |
| 40 | Ambessa | −0.74 | −1.00 | −1.00 | −1.00 | +0.24 | – | +0.00 |
| 41 | Garen | −0.74 | −1.00 | −1.00 | −1.00 | +0.20 | – | +0.00 |
| 42 | Riven | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 43 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 44 | Sett | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 45 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Pantheon's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Pantheon's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Pantheon` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.45)

- **0.90** spell shield: Spell Shield's spell shield blocks Pantheon's Grand Starfall. Spell shield for 1.5 s, long enough to use ahead of Grand Starfall. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Pantheon R Grand Starfall)
- **0.56** spell shield: Spell Shield's spell shield blocks Pantheon's Shield Vault. Spell shield for 1.5 s, long enough to use ahead of Shield Vault. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Pantheon W Shield Vault)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Pantheon's (500 vs 175 attack range). Pantheon closes the gap with Grand Starfall, Shield Vault. (Sivir basic attacks → Pantheon basic attacks)

#### 2. Bard (net +1.17)

- **0.90** untargetable: Tempered Fate makes Bard untargetable, dodging Pantheon's Grand Starfall. Untargetable for 2.5 s, long enough to use ahead of Grand Starfall. (Bard R Tempered Fate → Pantheon R Grand Starfall)
- **0.37** untargetable: Tempered Fate makes Bard untargetable, dodging Pantheon's Shield Vault. Untargetable for 2.5 s, long enough to use ahead of Shield Vault. (Bard R Tempered Fate → Pantheon W Shield Vault)
- **0.21** range: Bard's basic attacks reach 325 units farther than Pantheon's (500 vs 175 attack range). Pantheon closes the gap with Grand Starfall, Shield Vault. (Bard basic attacks → Pantheon basic attacks)
- Watch out: Aegis Assault makes Pantheon invulnerable to Bard's Cosmic Binding (its crowd control still applies).

#### 3. Kayle (net +0.79)

- **0.45** invulnerable: Divine Judgment makes Kayle invulnerable to Pantheon's Grand Starfall (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Grand Starfall. (Kayle R Divine Judgment → Pantheon R Grand Starfall)
- **0.24** range: Kayle's basic attacks reach 450 units farther than Pantheon's (625 vs 175 attack range). Pantheon closes the gap with Grand Starfall, Shield Vault. (Kayle basic attacks → Pantheon basic attacks)
- **0.19** invulnerable: Divine Judgment makes Kayle invulnerable to Pantheon's Shield Vault (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Shield Vault. (Kayle R Divine Judgment → Pantheon W Shield Vault)

#### 4. Udyr (net +0.77)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Pantheon's Shield Vault (stun). Immune for 1.5 s, long enough to use ahead of Shield Vault. (Udyr E Blazing Stampede → Pantheon W Shield Vault)
- **0.23** cc immunity: Blazing Stampede makes Udyr immune to Pantheon's Grand Starfall (slow). Immune for 1.5 s, long enough to use ahead of Grand Starfall. (Udyr E Blazing Stampede → Pantheon R Grand Starfall)
- **0.11** interrupt: Blazing Stampede's stun interrupts Pantheon's Comet Spear (charge-up). Blazing Stampede must land during the charge-up. Pantheon can release Comet Spear early instead of charging it fully. (Udyr E Blazing Stampede → Pantheon Q Comet Spear)
- Watch out: Aegis Assault makes Pantheon invulnerable to Udyr's Wingborne Storm (its crowd control still applies).

#### 5. Lissandra (net +0.76)

- **0.90** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Pantheon's Grand Starfall. Untargetable for 2.5 s, long enough to use ahead of Grand Starfall. (Lissandra R Frozen Tomb → Pantheon R Grand Starfall)
- **0.37** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Pantheon's Shield Vault. Untargetable for 2.5 s, long enough to use ahead of Shield Vault. (Lissandra R Frozen Tomb → Pantheon W Shield Vault)
- **0.19** dash stop: Frozen Tomb's knockdown can stop Pantheon's Shield Vault mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Pantheon W Shield Vault)
- Watch out: Aegis Assault makes Pantheon invulnerable to Lissandra's Frozen Tomb (its crowd control still applies).

#### 6. Nocturne (net +0.74)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Pantheon's Grand Starfall. Spell shield for 1.5 s, long enough to use ahead of Grand Starfall. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Pantheon R Grand Starfall)
- **0.68** spell shield: Shroud of Darkness's spell shield blocks Pantheon's Shield Vault. Spell shield for 1.5 s, long enough to use ahead of Shield Vault. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Pantheon W Shield Vault)
- **0.09** interrupt: Unspeakable Horror's fear interrupts Pantheon's Comet Spear (charge-up). Unspeakable Horror must land during the charge-up. Pantheon can release Comet Spear early instead of charging it fully. (Nocturne E Unspeakable Horror → Pantheon Q Comet Spear)
- Watch out: Aegis Assault makes Pantheon invulnerable to Nocturne's Paranoia (its crowd control still applies).

#### 7. Yuumi (net +0.68)

- **0.54** untargetable: You and Me! makes Yuumi untargetable, dodging Pantheon's Grand Starfall. Untargetable for ?; Grand Starfall lands within 0.1 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Pantheon R Grand Starfall)
- **0.48** untargetable: You and Me! makes Yuumi untargetable, dodging Pantheon's Shield Vault. Untargetable for ?; Shield Vault lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Pantheon W Shield Vault)
- **0.18** range: Yuumi's basic attacks reach 250 units farther than Pantheon's (425 vs 175 attack range). Pantheon closes the gap with Grand Starfall, Shield Vault. (Yuumi basic attacks → Pantheon basic attacks)
- Watch out: Aegis Assault makes Pantheon invulnerable to Yuumi's Final Chapter (its crowd control still applies).

#### 8. Shen (net +0.65)

- **0.75** attack block: Spirit's Refuge blocks Pantheon's Shield Vault, an empowered attack. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. The 3 strikes that occur after Empowered Shield Vault each apply a stack of Mortal Will, even if the attacks are dodged, blocked, or missed while Pantheon is blinded. (Shen W Spirit's Refuge → Pantheon W Shield Vault)
- **0.33** attack block: Spirit's Refuge blocks Pantheon's basic attacks (with Mortal Will). Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Pantheon basic attacks)
- **0.10** interrupt: Shadow Dash's taunt interrupts Pantheon's Comet Spear (charge-up). Shadow Dash must land during the charge-up. Pantheon can release Comet Spear early instead of charging it fully. (Shen E Shadow Dash → Pantheon Q Comet Spear)
- Watch out: Aegis Assault makes Pantheon invulnerable to Shen's Shadow Dash (its crowd control still applies).

#### 9. Xayah (net +0.63)

- **0.90** untargetable: Featherstorm makes Xayah untargetable, dodging Pantheon's Grand Starfall. Untargetable for 1.5 s, long enough to use ahead of Grand Starfall. (Xayah R Featherstorm → Pantheon R Grand Starfall)
- **0.36** untargetable: Featherstorm makes Xayah untargetable, dodging Pantheon's Shield Vault. Untargetable for 1.5 s, long enough to use ahead of Shield Vault. (Xayah R Featherstorm → Pantheon W Shield Vault)
- **0.22** range: Xayah's basic attacks reach 350 units farther than Pantheon's (525 vs 175 attack range). Pantheon closes the gap with Grand Starfall, Shield Vault. (Xayah basic attacks → Pantheon basic attacks)
- Watch out: Aegis Assault makes Pantheon invulnerable to Xayah's Featherstorm.

#### 10. Vladimir (net +0.62)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Pantheon's Grand Starfall. Untargetable for 2 s, long enough to use ahead of Grand Starfall. (Vladimir W Sanguine Pool → Pantheon R Grand Starfall)
- **0.59** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Pantheon's Shield Vault. Untargetable for 2 s, long enough to use ahead of Shield Vault. (Vladimir W Sanguine Pool → Pantheon W Shield Vault)
- **0.10** range: Vladimir's basic attacks reach 275 units farther than Pantheon's (450 vs 175 attack range). Pantheon closes the gap with Grand Starfall, Shield Vault. (Vladimir basic attacks → Pantheon basic attacks)
- Watch out: Aegis Assault makes Pantheon invulnerable to Vladimir's Hemoplague.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.45 | 1.45 | 0.00 |  |
| 2 | Bard | +1.17 | 1.31 | 0.14 |  |
| 3 | Kayle | +0.79 | 0.79 | 0.00 |  |
| 4 | Udyr | +0.77 | 0.94 | 0.17 |  |
| 5 | Lissandra | +0.76 | 1.28 | 0.52 |  |
| 6 | Nocturne | +0.74 | 1.33 | 0.59 |  |
| 7 | Yuumi | +0.68 | 0.96 | 0.28 |  |
| 8 | Shen | +0.65 | 1.02 | 0.37 | attack block (Spirit's Refuge) |
| 9 | Xayah | +0.63 | 1.30 | 0.67 |  |
| 10 | Vladimir | +0.62 | 1.30 | 0.68 |  |
| 11 | Teemo | +0.59 | 0.94 | 0.35 | blind (Blinding Dart), blind (Blinding Dart) |
| 12 | Fiora | +0.58 | 0.79 | 0.21 |  |
| 13 | Rek'Sai | +0.57 | 1.20 | 0.63 |  |
| 14 | Singed | +0.52 | 0.75 | 0.23 | grounding (Mega Adhesive) |
| 15 | Elise | +0.51 | 1.01 | 0.50 |  |
| 16 | Milio | +0.50 | 0.76 | 0.26 |  |
| 17 | Aurora | +0.48 | 0.83 | 0.35 |  |
| 18 | Kindred | +0.45 | 0.60 | 0.15 |  |
| 19 | Kled | +0.45 | 0.45 | 0.00 |  |
| 20 | Gwen | +0.43 | 0.71 | 0.28 |  |
| 21 | Lulu | +0.42 | 0.57 | 0.15 |  |
| 22 | Morgana | +0.41 | 0.82 | 0.41 |  |
| 23 | Taric | +0.35 | 0.63 | 0.28 |  |
| 24 | Kalista | +0.35 | 0.57 | 0.22 |  |
| 25 | Shaco | +0.33 | 0.73 | 0.40 |  |
| 26 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 27 | Malzahar | +0.30 | 0.88 | 0.58 |  |
| 28 | Rengar | +0.28 | 0.69 | 0.41 |  |
| 29 | Twitch | +0.27 | 0.27 | 0.00 |  |
| 30 | Maokai | +0.24 | 0.88 | 0.64 |  |
| 31 | Cassiopeia | +0.24 | 0.81 | 0.57 | grounding (Miasma) |
| 32 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 33 | Kai'Sa | +0.22 | 0.22 | 0.00 |  |
| 34 | Olaf | +0.21 | 0.49 | 0.28 |  |
| 35 | Kayn | +0.19 | 0.76 | 0.57 |  |
| 36 | Gangplank | +0.18 | 0.59 | 0.41 |  |
| 37 | Viktor | +0.16 | 0.57 | 0.41 |  |
| 38 | Vex | +0.16 | 0.51 | 0.35 |  |
| 39 | Jax | +0.15 | 1.00 | 0.85 | attack dodge (Counter Strike) |
| 40 | Twisted Fate | +0.15 | 0.36 | 0.21 |  |
| 41 | Master Yi | +0.14 | 0.94 | 0.80 |  |
| 42 | Sion | +0.11 | 0.62 | 0.51 |  |
| 43 | Yorick | +0.09 | 0.09 | 0.00 |  |
| 44 | Vayne | +0.08 | 0.36 | 0.28 |  |
| 45 | Zilean | +0.08 | 0.31 | 0.23 |  |
| 46 | Poppy | +0.07 | 0.62 | 0.55 | dash stop (Steadfast Presence) |
| 47 | Hwei | +0.07 | 0.57 | 0.50 |  |
| 48 | Camille | +0.06 | 0.75 | 0.69 |  |
| 49 | Garen | +0.05 | 0.48 | 0.43 |  |
| 50 | Xin Zhao | +0.04 | 0.65 | 0.61 |  |
| 51 | Alistar | 0.00 | 0.49 | 0.49 |  |
| 52 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 53 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 54 | Renata Glasc | -0.01 | 0.32 | 0.33 |  |
| 55 | Zoe | -0.02 | 0.28 | 0.30 |  |
| 56 | Caitlyn | -0.04 | 0.24 | 0.28 |  |
| 57 | Mordekaiser | -0.04 | 0.19 | 0.23 |  |
| 58 | Veigar | -0.05 | 0.50 | 0.55 |  |
| 59 | Taliyah | -0.06 | 0.24 | 0.30 |  |
| 60 | Braum | -0.07 | 0.33 | 0.40 |  |
| 61 | Janna | -0.07 | 0.30 | 0.37 |  |
| 62 | Jayce | -0.07 | 0.28 | 0.35 |  |
| 63 | Soraka | -0.08 | 0.25 | 0.33 |  |
| 64 | Sona | -0.09 | 0.31 | 0.40 |  |
| 65 | Akshan | -0.09 | 0.19 | 0.28 |  |
| 66 | Heimerdinger | -0.11 | 0.30 | 0.41 |  |
| 67 | Ashe | -0.11 | 0.29 | 0.40 |  |
| 68 | Nilah | -0.12 | 0.72 | 0.84 | attack dodge (Jubilant Veil) |
| 69 | Zac | -0.12 | 0.51 | 0.63 | dash stop (Stretching Strikes) |
| 70 | Kog'Maw | -0.12 | 0.16 | 0.28 |  |
| 71 | Jinx | -0.13 | 0.55 | 0.68 |  |
| 72 | Rammus | -0.15 | 0.41 | 0.56 |  |
| 73 | Vel'Koz | -0.15 | 0.26 | 0.41 |  |
| 74 | Anivia | -0.17 | 0.27 | 0.44 |  |
| 75 | Nidalee | -0.18 | 0.18 | 0.36 |  |
| 76 | Aatrox | -0.19 | 0.11 | 0.30 |  |
| 77 | Aphelios | -0.20 | 0.33 | 0.53 |  |
| 78 | Quinn | -0.21 | 0.33 | 0.54 |  |
| 79 | Varus | -0.22 | 0.18 | 0.40 |  |
| 80 | Karma | -0.22 | 0.13 | 0.35 |  |
| 81 | LeBlanc | -0.23 | 0.13 | 0.36 |  |
| 82 | Bel'Veth | -0.23 | 0.11 | 0.34 |  |
| 83 | Ryze | -0.24 | 0.15 | 0.39 |  |
| 84 | Zed | -0.25 | 0.65 | 0.90 |  |
| 85 | Brand | -0.26 | 0.25 | 0.51 |  |
| 86 | Gnar | -0.26 | 0.25 | 0.51 |  |
| 87 | Nunu & Willump | -0.27 | 0.30 | 0.57 |  |
| 88 | Kennen | -0.27 | 0.28 | 0.55 |  |
| 89 | Zeri | -0.27 | 0.28 | 0.55 |  |
| 90 | Ivern | -0.27 | 0.11 | 0.38 |  |
| 91 | Shyvana | -0.27 | 0.10 | 0.37 |  |
| 92 | Seraphine | -0.28 | 0.26 | 0.54 |  |
| 93 | Tahm Kench | -0.28 | 0.11 | 0.39 |  |
| 94 | Rumble | -0.28 | 0.00 | 0.28 |  |
| 95 | Warwick | -0.29 | 0.45 | 0.74 |  |
| 96 | Thresh | -0.30 | 0.21 | 0.51 |  |
| 97 | Lillia | -0.30 | 0.10 | 0.40 |  |
| 98 | Ahri | -0.31 | 0.53 | 0.84 |  |
| 99 | Tristana | -0.31 | 0.29 | 0.60 |  |
| 100 | Malphite | -0.31 | 0.26 | 0.57 |  |
| 101 | Amumu | -0.33 | 0.27 | 0.60 |  |
| 102 | Zyra | -0.33 | 0.21 | 0.54 |  |
| 103 | Ekko | -0.34 | 0.66 | 1.00 |  |
| 104 | Yone | -0.34 | 0.30 | 0.64 |  |
| 105 | Neeko | -0.34 | 0.19 | 0.53 |  |
| 106 | Jhin | -0.34 | 0.17 | 0.51 |  |
| 107 | Orianna | -0.35 | 0.21 | 0.56 |  |
| 108 | Ezreal | -0.35 | 0.20 | 0.55 |  |
| 109 | Lee Sin | -0.35 | 0.05 | 0.40 |  |
| 110 | Skarner | -0.36 | 0.16 | 0.52 |  |
| 111 | Nami | -0.37 | 0.25 | 0.62 |  |
| 112 | Samira | -0.38 | 0.26 | 0.64 |  |
| 113 | Corki | -0.39 | 0.29 | 0.68 |  |
| 114 | Blitzcrank | -0.41 | 0.11 | 0.52 |  |
| 115 | Mel | -0.42 | 0.25 | 0.67 |  |
| 116 | Katarina | -0.42 | 0.00 | 0.42 |  |
| 117 | Urgot | -0.43 | 0.16 | 0.59 |  |
| 118 | Kassadin | -0.43 | 0.11 | 0.54 |  |
| 119 | Xerath | -0.44 | 0.25 | 0.69 |  |
| 120 | Karthus | -0.44 | 0.11 | 0.55 |  |
| 121 | Ambessa | -0.45 | 0.05 | 0.50 |  |
| 122 | Hecarim | -0.45 | 0.05 | 0.50 |  |
| 123 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 124 | Ziggs | -0.46 | 0.26 | 0.72 |  |
| 125 | Smolder | -0.46 | 0.20 | 0.66 |  |
| 126 | Yasuo | -0.47 | 0.26 | 0.73 |  |
| 127 | Lucian | -0.47 | 0.21 | 0.68 |  |
| 128 | Darius | -0.47 | 0.08 | 0.55 |  |
| 129 | Trundle | -0.47 | 0.08 | 0.55 |  |
| 130 | Rakan | -0.48 | 0.11 | 0.59 |  |
| 131 | Kha'Zix | -0.48 | 0.00 | 0.48 |  |
| 132 | Miss Fortune | -0.49 | 0.20 | 0.69 |  |
| 133 | Leona | -0.49 | 0.11 | 0.60 |  |
| 134 | Lux | -0.50 | 0.18 | 0.68 |  |
| 135 | Nautilus | -0.50 | 0.05 | 0.55 |  |
| 136 | Swain | -0.51 | 0.22 | 0.73 |  |
| 137 | Gragas | -0.51 | 0.09 | 0.60 |  |
| 138 | Sett | -0.53 | 0.10 | 0.63 |  |
| 139 | Annie | -0.54 | 0.25 | 0.79 |  |
| 140 | Sejuani | -0.54 | 0.11 | 0.65 |  |
| 141 | Vi | -0.54 | 0.11 | 0.65 |  |
| 142 | Senna | -0.55 | 0.22 | 0.77 |  |
| 143 | Azir | -0.55 | 0.21 | 0.76 |  |
| 144 | Illaoi | -0.55 | 0.00 | 0.55 |  |
| 145 | Evelynn | -0.56 | 0.74 | 1.30 |  |
| 146 | Graves | -0.56 | 0.14 | 0.70 |  |
| 147 | Renekton | -0.56 | 0.11 | 0.67 |  |
| 148 | Sylas | -0.57 | 0.10 | 0.67 |  |
| 149 | Jarvan IV | -0.57 | 0.05 | 0.62 |  |
| 150 | Cho'Gath | -0.59 | 0.11 | 0.70 |  |
| 151 | Irelia | -0.59 | 0.10 | 0.69 |  |
| 152 | Riven | -0.59 | 0.09 | 0.68 |  |
| 153 | Volibear | -0.60 | 0.10 | 0.70 |  |
| 154 | Aurelion Sol | -0.61 | 0.19 | 0.80 |  |
| 155 | Ornn | -0.61 | 0.11 | 0.72 |  |
| 156 | Viego | -0.62 | 0.05 | 0.67 |  |
| 157 | Galio | -0.63 | 0.11 | 0.74 |  |
| 158 | K'Sante | -0.63 | 0.11 | 0.74 |  |
| 159 | Rell | -0.63 | 0.10 | 0.73 |  |
| 160 | Fizz | -0.63 | 0.05 | 0.68 |  |
| 161 | Briar | -0.64 | 0.05 | 0.69 |  |
| 162 | Wukong | -0.66 | 0.05 | 0.71 |  |
| 163 | Zaahen | -0.69 | 0.40 | 1.09 |  |
| 164 | Fiddlesticks | -0.70 | 0.22 | 0.92 |  |
| 165 | Qiyana | -0.72 | 0.05 | 0.77 |  |
| 166 | Talon | -0.79 | 0.00 | 0.79 |  |
| 167 | Diana | -0.84 | 0.05 | 0.89 |  |
| 168 | Draven | -0.85 | 0.31 | 1.16 |  |
| 169 | Akali | -0.90 | 0.00 | 0.90 |  |
| 170 | Locke | -0.90 | 0.00 | 0.90 |  |
| 171 | Syndra | -0.97 | 0.22 | 1.19 |  |
| 172 | Pyke | -1.78 | 0.09 | 1.87 |  |
