# Counters to K'Sante (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 37 other champions with a simulator kit against K'Sante: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (K'Sante wins every time) to +1 (the champion does). Run `npm run duel -- <champion> KSante --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.86 | +1.00 | +1.00 | +1.00 | +0.37 | +1.00 | +0.00 |
| 2 | Olaf | +0.85 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +1.00 |
| 3 | Trundle | +0.75 | +1.00 | +1.00 | +1.00 | −0.32 | +1.00 | +0.00 |
| 4 | Tryndamere | +0.56 | +1.00 | +1.00 | +1.00 | −0.28 | −1.00 | +0.00 |
| 5 | Garen | +0.21 | +1.00 | −1.00 | +1.00 | −0.10 | – | +0.00 |
| 6 | Jax | −0.12 | +0.00 | +0.00 | +0.00 | −0.17 | −1.00 | +0.00 |
| 7 | Camille | −0.42 | −1.00 | −1.00 | +1.00 | −0.16 | – | −1.00 |
| 8 | Gwen | −0.75 | −1.00 | −1.00 | −1.00 | −0.18 | – | +1.00 |
| 9 | Malphite | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 10 | Kayle | −0.78 | −1.00 | −1.00 | −1.00 | +0.50 | −1.00 | −1.00 |
| 11 | Ornn | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 12 | Poppy | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 13 | Irelia | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 14 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 15 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 16 | Ambessa | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 17 | Mordekaiser | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 18 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 19 | Aurora | −0.80 | −1.00 | −1.00 | −1.00 | +0.32 | −1.00 | −1.00 |
| 20 | Yasuo | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 21 | Sett | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 22 | Singed | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 23 | Renekton | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 24 | Kennen | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 25 | Dr. Mundo | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 26 | Cho'Gath | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 27 | Nasus | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 28 | Akali | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 29 | Teemo | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −1.00 |
| 30 | Riven | −0.84 | −1.00 | −1.00 | −1.00 | −0.23 | – | −0.50 |
| 31 | Zaahen | −0.85 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −1.00 |
| 32 | Quinn | −0.86 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −1.00 |
| 33 | Darius | −0.86 | −1.00 | −1.00 | −1.00 | −0.15 | – | −1.00 |
| 34 | Volibear | −0.86 | −1.00 | −1.00 | −1.00 | −0.16 | – | −1.00 |
| 35 | Aatrox | −0.87 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −1.00 |
| 36 | Rumble | −0.87 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −1.00 |
| 37 | Yone | −0.88 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −1.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against K'Sante's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in K'Sante's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> KSante` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +1.74)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks K'Sante's All Out. Spell shield for 1.5 s, long enough to use ahead of All Out. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → K'Sante R All Out)
- **0.90** spell shield: Shroud of Darkness's spell shield blocks K'Sante's Path Maker. Spell shield for 1.5 s, long enough to use ahead of Path Maker. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → K'Sante W Path Maker)
- **0.46** spell shield: Shroud of Darkness's spell shield blocks K'Sante's Ntofo Strikes. Spell shield for 1.5 s, long enough to use ahead of Ntofo Strikes. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → K'Sante Q Ntofo Strikes)

#### 2. Fiora (net +1.69)

- **1.10** parry: Riposte parries K'Sante's All Out and stuns back. Parry for 0.75 s; All Out takes 0.55 s to land, enough to react. Negating All Out's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → K'Sante R All Out)
- **0.88** parry: Riposte parries K'Sante's Path Maker and stuns back. Parry for 0.75 s; Path Maker takes 0.35 s to land, enough to react. Negating Path Maker's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → K'Sante W Path Maker)
- **0.53** parry: Riposte parries K'Sante's Ntofo Strikes and stuns back. Parry for 0.75 s; Ntofo Strikes takes 0.45 s to land, enough to react. Negating Ntofo Strikes's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → K'Sante Q Ntofo Strikes)

#### 3. Sivir (net +1.69)

- **1.00** spell shield: Spell Shield's spell shield blocks K'Sante's All Out. Spell shield for 1.5 s, long enough to use ahead of All Out. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → K'Sante R All Out)
- **0.73** spell shield: Spell Shield's spell shield blocks K'Sante's Path Maker. Spell shield for 1.5 s, long enough to use ahead of Path Maker. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → K'Sante W Path Maker)
- **0.41** spell shield: Spell Shield's spell shield blocks K'Sante's Ntofo Strikes. Spell shield for 1.5 s, long enough to use ahead of Ntofo Strikes. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → K'Sante Q Ntofo Strikes)

#### 4. Udyr (net +1.65)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to K'Sante's All Out (airborne, root, stun). Immune for 1.5 s, long enough to use ahead of All Out. (Udyr E Blazing Stampede → K'Sante R All Out)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to K'Sante's Path Maker (airborne, stun). Immune for 1.5 s, long enough to use ahead of Path Maker. (Udyr E Blazing Stampede → K'Sante W Path Maker)
- **0.60** cc immunity: Blazing Stampede makes Udyr immune to K'Sante's Ntofo Strikes (airborne, slow, stun). Immune for 1.5 s, long enough to use ahead of Ntofo Strikes. (Udyr E Blazing Stampede → K'Sante Q Ntofo Strikes)

#### 5. Elise (net +1.63)

- **1.00** untargetable: Rappel makes Elise untargetable, dodging K'Sante's All Out. Untargetable for 0.6 s; All Out takes 0.55 s to land, enough to react. (Elise E Rappel → K'Sante R All Out)
- **0.73** untargetable: Rappel makes Elise untargetable, dodging K'Sante's Path Maker. Untargetable for 0.6 s; Path Maker takes 0.35 s to land, enough to react. (Elise E Rappel → K'Sante W Path Maker)
- **0.41** untargetable: Rappel makes Elise untargetable, dodging K'Sante's Ntofo Strikes. Untargetable for 0.6 s; Ntofo Strikes takes 0.45 s to land, enough to react. (Elise E Rappel → K'Sante Q Ntofo Strikes)

#### 6. Morgana (net +1.59)

- **1.00** cc immunity: Black Shield makes Morgana immune to K'Sante's All Out (airborne, root, stun). Immune for 5 s, long enough to use ahead of All Out. (Morgana E Black Shield → K'Sante R All Out)
- **0.78** cc immunity: Black Shield makes Morgana immune to K'Sante's Path Maker (airborne, stun). Immune for 5 s, long enough to use ahead of Path Maker. (Morgana E Black Shield → K'Sante W Path Maker)
- **0.43** cc immunity: Black Shield makes Morgana immune to K'Sante's Ntofo Strikes (airborne, slow, stun). Immune for 5 s, long enough to use ahead of Ntofo Strikes. (Morgana E Black Shield → K'Sante Q Ntofo Strikes)

#### 7. Maokai (net +1.48)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging K'Sante's All Out. Untargetable for 1.4 s; All Out takes 0.55 s to land, enough to react. (Maokai W Twisted Advance → K'Sante R All Out)
- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging K'Sante's Path Maker. Untargetable for 1.4 s; Path Maker takes 0.35 s to land, enough to react. (Maokai W Twisted Advance → K'Sante W Path Maker)
- **0.49** untargetable: Twisted Advance makes Maokai untargetable, dodging K'Sante's Ntofo Strikes. Untargetable for 1.4 s; Ntofo Strikes takes 0.45 s to land, enough to react. (Maokai W Twisted Advance → K'Sante Q Ntofo Strikes)
- Watch out: All Out is displacement immune, ignoring Maokai's Bramble Smash (airborne) during it.

#### 8. Vladimir (net +1.47)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging K'Sante's All Out. Untargetable for 2 s, long enough to use ahead of All Out. (Vladimir W Sanguine Pool → K'Sante R All Out)
- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging K'Sante's Path Maker. Untargetable for 2 s, long enough to use ahead of Path Maker. (Vladimir W Sanguine Pool → K'Sante W Path Maker)
- **0.43** untargetable: Sanguine Pool makes Vladimir untargetable, dodging K'Sante's Ntofo Strikes. Untargetable for 2 s, long enough to use ahead of Ntofo Strikes. (Vladimir W Sanguine Pool → K'Sante Q Ntofo Strikes)
- Watch out: Ntofo Strikes's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 9. Gwen (net +1.47)

- **1.00** untargetable: Hallowed Mist makes Gwen untargetable, dodging K'Sante's All Out. Untargetable for ?; All Out takes 0.55 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → K'Sante R All Out)
- **0.73** untargetable: Hallowed Mist makes Gwen untargetable, dodging K'Sante's Path Maker. Untargetable for ?; Path Maker takes 0.35 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → K'Sante W Path Maker)
- **0.41** untargetable: Hallowed Mist makes Gwen untargetable, dodging K'Sante's Ntofo Strikes. Untargetable for ?; Ntofo Strikes takes 0.45 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → K'Sante Q Ntofo Strikes)

#### 10. Yuumi (net +1.42)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging K'Sante's All Out. Untargetable for ?; All Out takes 0.55 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → K'Sante R All Out)
- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging K'Sante's Path Maker. Untargetable for ?; Path Maker takes 0.35 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → K'Sante W Path Maker)
- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging K'Sante's Ntofo Strikes. Untargetable for ?; Ntofo Strikes takes 0.45 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → K'Sante Q Ntofo Strikes)
- Watch out: Ntofo Strikes's airborne interrupts Yuumi's Final Chapter (normal channel).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.74 | 1.74 | 0.00 |  |
| 2 | Fiora | +1.69 | 1.69 | 0.00 |  |
| 3 | Sivir | +1.69 | 1.69 | 0.00 |  |
| 4 | Udyr | +1.65 | 1.65 | 0.00 |  |
| 5 | Elise | +1.63 | 1.63 | 0.00 |  |
| 6 | Morgana | +1.59 | 1.59 | 0.00 |  |
| 7 | Maokai | +1.48 | 1.62 | 0.14 |  |
| 8 | Vladimir | +1.47 | 1.58 | 0.11 |  |
| 9 | Gwen | +1.47 | 1.47 | 0.00 |  |
| 10 | Yuumi | +1.42 | 1.85 | 0.43 |  |
| 11 | Xayah | +1.38 | 1.38 | 0.00 |  |
| 12 | Master Yi | +1.36 | 1.59 | 0.23 |  |
| 13 | Lissandra | +1.36 | 1.46 | 0.10 |  |
| 14 | Aurora | +1.36 | 1.36 | 0.00 |  |
| 15 | Ekko | +1.35 | 1.35 | 0.00 |  |
| 16 | Bard | +1.34 | 1.50 | 0.16 |  |
| 17 | Evelynn | +1.33 | 1.33 | 0.00 |  |
| 18 | Olaf | +1.33 | 1.33 | 0.00 |  |
| 19 | Shaco | +1.33 | 1.33 | 0.00 |  |
| 20 | Rengar | +1.30 | 1.30 | 0.00 |  |
| 21 | Gangplank | +1.22 | 1.22 | 0.00 |  |
| 22 | Zed | +1.20 | 1.20 | 0.00 |  |
| 23 | Rek'Sai | +1.03 | 1.35 | 0.32 |  |
| 24 | Warwick | +1.00 | 1.52 | 0.52 |  |
| 25 | Zaahen | +0.98 | 1.33 | 0.35 |  |
| 26 | Camille | +0.97 | 1.27 | 0.30 |  |
| 27 | Milio | +0.97 | 1.11 | 0.14 |  |
| 28 | Sion | +0.93 | 1.34 | 0.41 |  |
| 29 | Cassiopeia | +0.84 | 0.84 | 0.00 | grounding (Miasma) |
| 30 | Kayle | +0.84 | 0.84 | 0.00 |  |
| 31 | Alistar | +0.83 | 1.06 | 0.23 |  |
| 32 | Kindred | +0.78 | 0.78 | 0.00 |  |
| 33 | Kayn | +0.74 | 1.33 | 0.59 |  |
| 34 | Kled | +0.73 | 1.20 | 0.47 |  |
| 35 | Teemo | +0.73 | 0.73 | 0.00 | blind (Blinding Dart) |
| 36 | Kalista | +0.66 | 1.04 | 0.38 |  |
| 37 | Malzahar | +0.63 | 1.13 | 0.50 |  |
| 38 | Pantheon | +0.63 | 0.74 | 0.11 |  |
| 39 | Singed | +0.61 | 0.75 | 0.14 | grounding (Mega Adhesive) |
| 40 | Taric | +0.56 | 0.56 | 0.00 |  |
| 41 | Garen | +0.55 | 0.55 | 0.00 |  |
| 42 | Vex | +0.52 | 0.58 | 0.06 |  |
| 43 | Jax | +0.46 | 0.46 | 0.00 | attack dodge (Counter Strike) |
| 44 | Nasus | +0.43 | 0.43 | 0.00 | attack speed slow (Wither) |
| 45 | Lulu | +0.42 | 0.58 | 0.16 | disarm (Whimsy) |
| 46 | Jinx | +0.41 | 0.49 | 0.08 |  |
| 47 | Viktor | +0.38 | 0.46 | 0.08 |  |
| 48 | Ahri | +0.35 | 0.43 | 0.08 |  |
| 49 | Veigar | +0.34 | 0.42 | 0.08 |  |
| 50 | Hwei | +0.32 | 0.46 | 0.14 |  |
| 51 | Mel | +0.32 | 0.32 | 0.00 |  |
| 52 | Nilah | +0.29 | 0.45 | 0.16 | attack dodge (Jubilant Veil) |
| 53 | Aphelios | +0.27 | 0.27 | 0.00 |  |
| 54 | Xin Zhao | +0.24 | 0.60 | 0.36 |  |
| 55 | Zeri | +0.22 | 0.22 | 0.00 |  |
| 56 | Sona | +0.21 | 0.21 | 0.00 |  |
| 57 | Twitch | +0.21 | 0.21 | 0.00 |  |
| 58 | Corki | +0.18 | 0.32 | 0.14 |  |
| 59 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 60 | Heimerdinger | +0.18 | 0.18 | 0.00 |  |
| 61 | Kai'Sa | +0.18 | 0.18 | 0.00 |  |
| 62 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 63 | Hecarim | +0.17 | 0.17 | 0.00 |  |
| 64 | Illaoi | +0.17 | 0.17 | 0.00 |  |
| 65 | Shyvana | +0.17 | 0.17 | 0.00 |  |
| 66 | Volibear | +0.17 | 0.17 | 0.00 |  |
| 67 | Samira | +0.16 | 0.34 | 0.18 |  |
| 68 | Ezreal | +0.16 | 0.16 | 0.00 |  |
| 69 | Senna | +0.16 | 0.16 | 0.00 |  |
| 70 | Smolder | +0.16 | 0.16 | 0.00 |  |
| 71 | Zilean | +0.16 | 0.16 | 0.00 |  |
| 72 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 73 | Lux | +0.14 | 0.14 | 0.00 |  |
| 74 | Nidalee | +0.14 | 0.14 | 0.00 |  |
| 75 | Seraphine | +0.14 | 0.14 | 0.00 |  |
| 76 | Kog'Maw | +0.13 | 0.13 | 0.00 |  |
| 77 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 78 | Braum | +0.11 | 0.27 | 0.16 |  |
| 79 | Annie | +0.11 | 0.11 | 0.00 |  |
| 80 | Brand | +0.11 | 0.11 | 0.00 |  |
| 81 | Graves | +0.11 | 0.11 | 0.00 |  |
| 82 | Karma | +0.10 | 0.10 | 0.00 |  |
| 83 | LeBlanc | +0.10 | 0.10 | 0.00 |  |
| 84 | Skarner | +0.10 | 0.10 | 0.00 |  |
| 85 | Amumu | +0.08 | 0.18 | 0.10 |  |
| 86 | Vayne | +0.07 | 0.21 | 0.14 |  |
| 87 | Malphite | +0.05 | 0.45 | 0.40 |  |
| 88 | Renata Glasc | +0.05 | 0.19 | 0.14 |  |
| 89 | Draven | +0.04 | 0.18 | 0.14 |  |
| 90 | Sett | +0.03 | 0.17 | 0.14 |  |
| 91 | Tristana | +0.02 | 0.18 | 0.16 |  |
| 92 | Zoe | +0.02 | 0.16 | 0.14 |  |
| 93 | Varus | +0.02 | 0.13 | 0.11 |  |
| 94 | Jayce | 0.00 | 0.14 | 0.14 |  |
| 95 | Akali | 0.00 | 0.00 | 0.00 |  |
| 96 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 97 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 98 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 99 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 100 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 101 | Leona | 0.00 | 0.00 | 0.00 |  |
| 102 | Locke | 0.00 | 0.00 | 0.00 |  |
| 103 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 104 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 105 | Talon | 0.00 | 0.00 | 0.00 |  |
| 106 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 107 | Poppy | -0.01 | 0.59 | 0.60 | dash stop (Steadfast Presence) |
| 108 | Gnar | -0.01 | 0.15 | 0.16 |  |
| 109 | Shen | -0.02 | 0.43 | 0.45 | attack block (Spirit's Refuge) |
| 110 | Orianna | -0.03 | 0.13 | 0.16 |  |
| 111 | Syndra | -0.03 | 0.11 | 0.14 |  |
| 112 | Swain | -0.04 | 0.10 | 0.14 |  |
| 113 | Neeko | -0.05 | 0.11 | 0.16 |  |
| 114 | Ivern | -0.06 | 0.09 | 0.15 |  |
| 115 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 116 | Briar | -0.10 | 0.00 | 0.10 |  |
| 117 | Lucian | -0.11 | 0.17 | 0.28 |  |
| 118 | Urgot | -0.11 | 0.07 | 0.18 |  |
| 119 | Lillia | -0.11 | 0.05 | 0.16 |  |
| 120 | Akshan | -0.12 | 0.16 | 0.28 |  |
| 121 | Miss Fortune | -0.12 | 0.16 | 0.28 |  |
| 122 | Bel'Veth | -0.14 | 0.00 | 0.14 |  |
| 123 | Cho'Gath | -0.14 | 0.00 | 0.14 |  |
| 124 | Darius | -0.14 | 0.00 | 0.14 |  |
| 125 | Trundle | -0.14 | 0.00 | 0.14 |  |
| 126 | Yone | -0.15 | 0.35 | 0.50 |  |
| 127 | Twisted Fate | -0.15 | 0.20 | 0.35 |  |
| 128 | Ornn | -0.15 | 0.17 | 0.32 |  |
| 129 | Jhin | -0.15 | 0.13 | 0.28 |  |
| 130 | Anivia | -0.16 | 0.12 | 0.28 |  |
| 131 | Thresh | -0.16 | 0.09 | 0.25 |  |
| 132 | Diana | -0.16 | 0.00 | 0.16 |  |
| 133 | Fizz | -0.16 | 0.00 | 0.16 |  |
| 134 | Lee Sin | -0.16 | 0.00 | 0.16 |  |
| 135 | Qiyana | -0.16 | 0.00 | 0.16 |  |
| 136 | Rammus | -0.17 | 0.43 | 0.60 | attack reflect (Defensive Ball Curl) |
| 137 | Mordekaiser | -0.18 | 0.10 | 0.28 |  |
| 138 | Azir | -0.19 | 0.13 | 0.32 |  |
| 139 | Karthus | -0.19 | 0.09 | 0.28 |  |
| 140 | Zyra | -0.20 | 0.12 | 0.32 |  |
| 141 | Aurelion Sol | -0.20 | 0.11 | 0.31 |  |
| 142 | Sylas | -0.20 | 0.00 | 0.20 |  |
| 143 | Xerath | -0.21 | 0.13 | 0.34 |  |
| 144 | Ziggs | -0.21 | 0.13 | 0.34 |  |
| 145 | Ryze | -0.23 | 0.12 | 0.35 |  |
| 146 | Nautilus | -0.24 | 0.00 | 0.24 |  |
| 147 | Nami | -0.25 | 0.11 | 0.36 |  |
| 148 | Viego | -0.28 | 0.17 | 0.45 |  |
| 149 | Katarina | -0.28 | 0.00 | 0.28 |  |
| 150 | Yorick | -0.28 | 0.00 | 0.28 |  |
| 151 | Vel'Koz | -0.29 | 0.13 | 0.42 |  |
| 152 | Quinn | -0.30 | 0.18 | 0.48 |  |
| 153 | Wukong | -0.32 | 0.00 | 0.32 |  |
| 154 | Pyke | -0.32 | 0.00 | 0.32 |  |
| 155 | Aatrox | -0.33 | 0.00 | 0.33 |  |
| 156 | Yasuo | -0.35 | 0.21 | 0.56 |  |
| 157 | Rakan | -0.35 | 0.05 | 0.40 |  |
| 158 | Blitzcrank | -0.35 | 0.00 | 0.35 |  |
| 159 | Fiddlesticks | -0.38 | 0.09 | 0.47 |  |
| 160 | Jarvan IV | -0.39 | 0.17 | 0.56 |  |
| 161 | Riven | -0.40 | 0.00 | 0.40 |  |
| 162 | Nunu & Willump | -0.41 | 0.22 | 0.63 |  |
| 163 | Zac | -0.42 | 0.40 | 0.82 | dash stop (Stretching Strikes) |
| 164 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 165 | Rell | -0.47 | 0.00 | 0.47 |  |
| 166 | Sejuani | -0.48 | 0.00 | 0.48 |  |
| 167 | Gragas | -0.65 | 0.00 | 0.65 |  |
| 168 | Janna | -0.68 | 0.18 | 0.86 |  |
| 169 | Galio | -0.78 | 0.00 | 0.78 |  |
| 170 | Tahm Kench | -0.82 | 0.00 | 0.82 |  |
| 171 | Vi | -0.83 | 0.17 | 1.00 |  |
| 172 | Taliyah | -0.91 | 0.13 | 1.04 |  |
