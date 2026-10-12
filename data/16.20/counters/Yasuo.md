# Counters to Yasuo (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 44 other champions with a simulator kit against Yasuo: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Yasuo wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Yasuo --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Teemo | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 2 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 3 | Quinn | +0.80 | +1.00 | +1.00 | +0.85 | +0.21 | +1.00 | +0.00 |
| 4 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 5 | Fiora | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 6 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 7 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 8 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 9 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 10 | Malphite | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 11 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 12 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 13 | Mordekaiser | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 14 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 15 | Tahm Kench | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 16 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 17 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 18 | Aatrox | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 19 | Trundle | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 20 | Zaahen | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 21 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 22 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 23 | Volibear | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 24 | Olaf | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 25 | Kennen | +0.74 | +1.00 | +1.00 | +1.00 | −0.08 | +0.50 | +0.00 |
| 26 | Kayle | +0.67 | +1.00 | +0.11 | +1.00 | +0.63 | +1.00 | +0.00 |
| 27 | Aurora | +0.65 | +1.00 | +1.00 | +0.22 | +0.04 | +1.00 | +0.00 |
| 28 | Urgot | +0.55 | +0.91 | +0.91 | +0.91 | +0.09 | −1.00 | +0.00 |
| 29 | Jayce | +0.45 | +1.00 | −0.23 | +1.00 | +0.07 | – | +0.00 |
| 30 | Gnar | +0.41 | +1.00 | +0.94 | −1.00 | +0.16 | +1.00 | +0.00 |
| 31 | Riven | +0.27 | +0.00 | +1.00 | +0.00 | −0.03 | – | +0.00 |
| 32 | Sett | +0.21 | +1.00 | −1.00 | +1.00 | −0.07 | – | +0.00 |
| 33 | Singed | −0.00 | +0.03 | +0.01 | +0.01 | −0.08 | – | +0.00 |
| 34 | Sion | −0.01 | +0.00 | +0.00 | +0.00 | −0.08 | – | +0.00 |
| 35 | Ornn | −0.21 | −0.02 | −0.02 | −1.00 | +0.14 | – | +0.00 |
| 36 | Pantheon | −0.23 | +0.00 | +0.00 | −1.00 | −0.07 | – | +0.00 |
| 37 | Shen | −0.33 | −1.00 | −1.00 | +1.00 | −0.00 | – | +0.00 |
| 38 | Rumble | −0.69 | −0.90 | −0.90 | −0.80 | −0.08 | – | +0.00 |
| 39 | Ambessa | −0.76 | −1.00 | −0.92 | −1.00 | −0.04 | – | +0.00 |
| 40 | Skarner | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 41 | Yone | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 42 | Irelia | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 43 | Gwen | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 44 | Akali | −0.83 | −1.00 | −1.00 | −1.00 | −0.28 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Yasuo's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Yasuo's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Yasuo` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Udyr (net +1.04)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Yasuo's Last Breath (airborne). Immune for 1.5 s, long enough to use ahead of Last Breath. (Udyr E Blazing Stampede → Yasuo R Last Breath)
- **0.64** cc immunity: Blazing Stampede makes Udyr immune to Yasuo's Steel Tempest (airborne). Immune for 1.5 s, long enough to use ahead of Steel Tempest. (Udyr E Blazing Stampede → Yasuo Q Steel Tempest)
- Watch out: Wind Wall blocks Udyr's Wilding Claw, a projectile.

#### 2. Vladimir (net +0.92)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Yasuo's Last Breath. Untargetable for 2 s, long enough to use ahead of Last Breath. (Vladimir W Sanguine Pool → Yasuo R Last Breath)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Yasuo's Steel Tempest. Untargetable for 2 s, long enough to use ahead of Steel Tempest. (Vladimir W Sanguine Pool → Yasuo Q Steel Tempest)
- **0.36** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Yasuo's Sweeping Blade. Untargetable for 2 s, long enough to use ahead of Sweeping Blade. (Vladimir W Sanguine Pool → Yasuo E Sweeping Blade)
- Watch out: Wind Wall blocks Vladimir's Tides of Blood, a projectile.

#### 3. Nocturne (net +0.80)

- **0.50** spell shield: Shroud of Darkness's spell shield blocks part of Yasuo's Last Breath. Spell shield for 1.5 s, long enough to use ahead of Last Breath. A spell shield blocks only the first enemy ability that reaches it. Last Breath requires the target to be affected by airborne from an enemy source, and simultaneously that the target is not considered cc-immune, displacement immune, or untargetable during it.
  - Last Breath cannot be cast if there are no nearby enemy champions that meet the conditions.
    - Attempting to cast the ability on an enemy champion that is not airborne will indicate that they "Must Be Airborne!".
    - Spell shield will not prevent Last Breath from being cast and the target will be knocked up and dealt the damage.
      - The spell shield is still consumed in this case.
  - Self-applied or allied-applied displacements do not allow Last Breath to target the champion. Those applied by the neutral team (e.g. Dragon initial knock back) can be targeted.
  - An indicator will be placed towards enemy champions that meet the cast conditions within range of Last Breath to signify the ability can be cast.
  - The Hextech Ultimatum will prevent Yasuo from casting Last Breath on an airborne enemy champion far outside its borders.
    - Yasuo can only do so if the airborne enemy champion is positioned slightly outside of the borders. (Nocturne W Shroud of Darkness → Yasuo R Last Breath)
- **0.48** spell shield: Shroud of Darkness's spell shield blocks Yasuo's Steel Tempest. Spell shield for 1.5 s, long enough to use ahead of Steel Tempest. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Yasuo Q Steel Tempest)
- **0.36** spell shield: Shroud of Darkness's spell shield blocks Yasuo's Sweeping Blade. Spell shield for 1.5 s, long enough to use ahead of Sweeping Blade. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Yasuo E Sweeping Blade)
- Watch out: Wind Wall blocks Nocturne's Duskbringer, a projectile.

#### 4. Gangplank (net +0.74)

- **0.80** cleanse: Remove Scurvy cleanses Yasuo's Last Breath (airborne) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Yasuo R Last Breath)
- **0.37** cleanse: Remove Scurvy cleanses Yasuo's Steel Tempest (airborne) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Yasuo Q Steel Tempest)
- Watch out: Wind Wall blocks Gangplank's Parrrley, a projectile.

#### 5. Morgana (net +0.67)

- **1.00** cc immunity: Black Shield makes Morgana immune to Yasuo's Last Breath (airborne). Immune for 5 s, long enough to use ahead of Last Breath. (Morgana E Black Shield → Yasuo R Last Breath)
- **0.44** cc immunity: Black Shield makes Morgana immune to Yasuo's Steel Tempest (airborne). Immune for 5 s, long enough to use ahead of Steel Tempest. (Morgana E Black Shield → Yasuo Q Steel Tempest)
- **0.11** range: Morgana's basic attacks reach 275 units farther than Yasuo's (450 vs 175 attack range). Yasuo closes the gap with Sweeping Blade, Last Breath. (Morgana basic attacks → Yasuo basic attacks)
- Watch out: Wind Wall blocks Morgana's Dark Binding, a projectile.

#### 6. Master Yi (net +0.67)

- **0.60** untargetable: Alpha Strike makes Master Yi untargetable, dodging Yasuo's Last Breath. Untargetable for ?; Last Breath lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Yasuo R Last Breath)
- **0.43** untargetable: Alpha Strike makes Master Yi untargetable, dodging Yasuo's Steel Tempest. Untargetable for ?; Steel Tempest takes 0.38 s to land, enough to react. (Master Yi Q Alpha Strike → Yasuo Q Steel Tempest)
- **0.36** untargetable: Alpha Strike makes Master Yi untargetable, dodging Yasuo's Sweeping Blade. Untargetable for ?; Sweeping Blade takes 0.63 s to land, enough to react. (Master Yi Q Alpha Strike → Yasuo E Sweeping Blade)
- Watch out: Steel Tempest's airborne interrupts Master Yi's Meditate (normal channel).

#### 7. Camille (net +0.66)

- **0.36** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Yasuo's Sweeping Blade. Untargetable for 0.5 s; Sweeping Blade takes 0.63 s to land, enough to react. (Camille R The Hextech Ultimatum → Yasuo E Sweeping Blade)
- **0.36** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Yasuo's Last Breath. Untargetable for 0.5 s; Last Breath lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Camille R The Hextech Ultimatum → Yasuo R Last Breath)
- **0.34** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Yasuo's Steel Tempest. Untargetable for 0.5 s; Steel Tempest takes 0.38 s to land, enough to react. (Camille R The Hextech Ultimatum → Yasuo Q Steel Tempest)

#### 8. Fiora (net +0.64)

- **0.70** parry: Riposte parries Yasuo's Last Breath and stuns back. Parry for 0.75 s; Last Breath lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Last Breath's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Yasuo R Last Breath)
- **0.54** parry: Riposte parries Yasuo's Steel Tempest and stuns back. Parry for 0.75 s; Steel Tempest takes 0.38 s to land, enough to react. Negating Steel Tempest's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Yasuo Q Steel Tempest)
- **0.36** parry: Riposte parries Yasuo's Sweeping Blade. Parry for 0.75 s; Sweeping Blade takes 0.63 s to land, enough to react. (Fiora W Riposte → Yasuo E Sweeping Blade)
- Watch out: Wind Wall blocks Fiora's Riposte, a projectile.

#### 9. Olaf (net +0.64)

- **0.63** cc immunity: Ragnarok makes Olaf immune to Yasuo's Last Breath (airborne). Immune for 3 s, long enough to use ahead of Last Breath. (Olaf R Ragnarok → Yasuo R Last Breath)
- **0.34** cc immunity: Ragnarok makes Olaf immune to Yasuo's Steel Tempest (airborne). Immune for 3 s, long enough to use ahead of Steel Tempest. (Olaf R Ragnarok → Yasuo Q Steel Tempest)
- Watch out: Wind Wall blocks part of Olaf's Undertow, a projectile.

#### 10. Alistar (net +0.64)

- **0.50** cleanse: Unbreakable Will cleanses Yasuo's Last Breath (airborne) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Yasuo R Last Breath)
- **0.28** cleanse: Unbreakable Will cleanses Yasuo's Steel Tempest (airborne) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Yasuo Q Steel Tempest)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Udyr | +1.04 | 1.32 | 0.28 |  |
| 2 | Vladimir | +0.92 | 1.41 | 0.49 |  |
| 3 | Nocturne | +0.80 | 1.11 | 0.31 |  |
| 4 | Gangplank | +0.74 | 0.99 | 0.25 |  |
| 5 | Morgana | +0.67 | 1.33 | 0.66 |  |
| 6 | Master Yi | +0.67 | 0.90 | 0.23 |  |
| 7 | Camille | +0.66 | 0.66 | 0.00 |  |
| 8 | Fiora | +0.64 | 1.07 | 0.43 |  |
| 9 | Olaf | +0.64 | 0.80 | 0.16 |  |
| 10 | Alistar | +0.64 | 0.64 | 0.00 |  |
| 11 | Rek'Sai | +0.59 | 0.93 | 0.34 |  |
| 12 | Bard | +0.56 | 1.11 | 0.55 |  |
| 13 | Sion | +0.55 | 0.88 | 0.33 |  |
| 14 | Xin Zhao | +0.55 | 0.55 | 0.00 |  |
| 15 | Taric | +0.54 | 0.54 | 0.00 |  |
| 16 | Warwick | +0.49 | 0.89 | 0.40 |  |
| 17 | Pantheon | +0.47 | 0.73 | 0.26 |  |
| 18 | Jax | +0.45 | 0.45 | 0.00 |  |
| 19 | Ekko | +0.44 | 0.73 | 0.29 |  |
| 20 | Elise | +0.39 | 1.11 | 0.72 |  |
| 21 | Sivir | +0.38 | 1.08 | 0.70 |  |
| 22 | Lissandra | +0.37 | 1.06 | 0.69 |  |
| 23 | Nilah | +0.37 | 0.37 | 0.00 |  |
| 24 | Malzahar | +0.36 | 1.00 | 0.64 |  |
| 25 | Gwen | +0.35 | 0.90 | 0.55 |  |
| 26 | K'Sante | +0.35 | 0.56 | 0.21 |  |
| 27 | Yuumi | +0.34 | 1.63 | 1.29 |  |
| 28 | Rengar | +0.34 | 1.01 | 0.67 |  |
| 29 | Zed | +0.34 | 0.62 | 0.28 |  |
| 30 | Singed | +0.32 | 0.71 | 0.39 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 31 | Xayah | +0.30 | 1.07 | 0.77 |  |
| 32 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 33 | Jarvan IV | +0.28 | 0.28 | 0.00 |  |
| 34 | Sett | +0.28 | 0.28 | 0.00 |  |
| 35 | Volibear | +0.28 | 0.28 | 0.00 |  |
| 36 | Evelynn | +0.27 | 0.65 | 0.38 |  |
| 37 | Aurora | +0.23 | 0.84 | 0.61 |  |
| 38 | Cassiopeia | +0.23 | 0.84 | 0.61 | grounding (Miasma), grounding (Miasma) |
| 39 | Kayn | +0.20 | 0.65 | 0.45 |  |
| 40 | Kalista | +0.19 | 0.76 | 0.57 |  |
| 41 | Yone | +0.19 | 0.46 | 0.27 |  |
| 42 | Kayle | +0.18 | 0.80 | 0.62 |  |
| 43 | Malphite | +0.16 | 0.47 | 0.31 |  |
| 44 | Shaco | +0.14 | 0.65 | 0.51 |  |
| 45 | Illaoi | +0.09 | 0.28 | 0.19 |  |
| 46 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 47 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 48 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 49 | Darius | 0.00 | 0.00 | 0.00 |  |
| 50 | Garen | 0.00 | 0.00 | 0.00 |  |
| 51 | Rell | 0.00 | 0.00 | 0.00 |  |
| 52 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 53 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 54 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 55 | Zaahen | -0.03 | 0.55 | 0.58 |  |
| 56 | Shyvana | -0.03 | 0.28 | 0.31 |  |
| 57 | Zeri | -0.04 | 0.28 | 0.32 |  |
| 58 | Rammus | -0.06 | 0.29 | 0.35 |  |
| 59 | Kindred | -0.07 | 0.76 | 0.83 |  |
| 60 | Maokai | -0.15 | 0.95 | 1.10 |  |
| 61 | Shen | -0.16 | 0.42 | 0.58 |  |
| 62 | Samira | -0.16 | 0.38 | 0.54 |  |
| 63 | Viktor | -0.17 | 0.37 | 0.54 |  |
| 64 | Nidalee | -0.18 | 0.18 | 0.36 |  |
| 65 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 66 | Vi | -0.22 | 0.28 | 0.50 |  |
| 67 | Jayce | -0.22 | 0.18 | 0.40 |  |
| 68 | Aurelion Sol | -0.22 | 0.14 | 0.36 |  |
| 69 | Lulu | -0.23 | 0.49 | 0.72 |  |
| 70 | Rakan | -0.23 | 0.06 | 0.29 |  |
| 71 | Kled | -0.27 | 0.56 | 0.83 |  |
| 72 | Soraka | -0.27 | 0.17 | 0.44 |  |
| 73 | Annie | -0.27 | 0.15 | 0.42 |  |
| 74 | Kennen | -0.28 | 0.18 | 0.46 |  |
| 75 | Lee Sin | -0.28 | 0.00 | 0.28 |  |
| 76 | Rumble | -0.28 | 0.00 | 0.28 |  |
| 77 | Kassadin | -0.29 | 0.00 | 0.29 |  |
| 78 | Cho'Gath | -0.30 | 0.00 | 0.30 |  |
| 79 | Dr. Mundo | -0.30 | 0.00 | 0.30 |  |
| 80 | Corki | -0.31 | 0.47 | 0.78 |  |
| 81 | Azir | -0.31 | 0.16 | 0.47 |  |
| 82 | Yorick | -0.31 | 0.00 | 0.31 |  |
| 83 | Teemo | -0.33 | 0.57 | 0.90 |  |
| 84 | Orianna | -0.34 | 0.16 | 0.50 |  |
| 85 | Skarner | -0.34 | 0.00 | 0.34 |  |
| 86 | Poppy | -0.37 | 0.63 | 1.00 | dash stop (Steadfast Presence) |
| 87 | Vex | -0.37 | 0.63 | 1.00 |  |
| 88 | Mel | -0.37 | 0.37 | 0.74 |  |
| 89 | Gnar | -0.37 | 0.19 | 0.56 |  |
| 90 | Aatrox | -0.37 | 0.00 | 0.37 |  |
| 91 | Karma | -0.40 | 0.13 | 0.53 |  |
| 92 | Fizz | -0.40 | 0.00 | 0.40 |  |
| 93 | Yunara | -0.41 | 0.24 | 0.65 |  |
| 94 | Riven | -0.41 | 0.00 | 0.41 |  |
| 95 | Locke | -0.42 | 0.00 | 0.42 |  |
| 96 | Karthus | -0.43 | 0.11 | 0.54 |  |
| 97 | Veigar | -0.44 | 0.33 | 0.77 |  |
| 98 | Kog'Maw | -0.44 | 0.16 | 0.60 |  |
| 99 | Jinx | -0.46 | 0.35 | 0.81 |  |
| 100 | Zilean | -0.46 | 0.20 | 0.66 |  |
| 101 | Diana | -0.46 | 0.00 | 0.46 |  |
| 102 | Twitch | -0.47 | 0.27 | 0.74 |  |
| 103 | Galio | -0.47 | 0.00 | 0.47 |  |
| 104 | LeBlanc | -0.50 | 0.13 | 0.63 |  |
| 105 | Thresh | -0.50 | 0.11 | 0.61 |  |
| 106 | Aphelios | -0.51 | 0.24 | 0.75 |  |
| 107 | Anivia | -0.51 | 0.16 | 0.67 |  |
| 108 | Milio | -0.52 | 0.22 | 0.74 |  |
| 109 | Zyra | -0.52 | 0.16 | 0.68 |  |
| 110 | Kai'Sa | -0.57 | 0.22 | 0.79 |  |
| 111 | Lux | -0.58 | 0.18 | 0.76 |  |
| 112 | Vel'Koz | -0.59 | 0.16 | 0.75 |  |
| 113 | Nautilus | -0.60 | 0.00 | 0.60 |  |
| 114 | Leona | -0.61 | 0.00 | 0.61 |  |
| 115 | Ryze | -0.62 | 0.15 | 0.77 |  |
| 116 | Quinn | -0.63 | 0.22 | 0.85 |  |
| 117 | Amumu | -0.64 | 0.18 | 0.82 |  |
| 118 | Syndra | -0.64 | 0.14 | 0.78 |  |
| 119 | Smolder | -0.65 | 0.20 | 0.85 |  |
| 120 | Braum | -0.66 | 0.28 | 0.94 |  |
| 121 | Swain | -0.66 | 0.12 | 0.78 |  |
| 122 | Blitzcrank | -0.68 | 0.00 | 0.68 |  |
| 123 | Vayne | -0.69 | 0.27 | 0.96 |  |
| 124 | Brand | -0.69 | 0.14 | 0.83 |  |
| 125 | Hwei | -0.70 | 0.32 | 1.02 |  |
| 126 | Hecarim | -0.70 | 0.30 | 1.00 |  |
| 127 | Zoe | -0.70 | 0.20 | 0.90 |  |
| 128 | Neeko | -0.71 | 0.14 | 0.85 |  |
| 129 | Kha'Zix | -0.71 | 0.00 | 0.71 |  |
| 130 | Senna | -0.72 | 0.22 | 0.94 |  |
| 131 | Draven | -0.73 | 0.22 | 0.95 |  |
| 132 | Naafiri | -0.74 | 0.00 | 0.74 |  |
| 133 | Sylas | -0.75 | 0.00 | 0.75 |  |
| 134 | Viego | -0.76 | 0.28 | 1.04 |  |
| 135 | Ezreal | -0.76 | 0.20 | 0.96 |  |
| 136 | Ahri | -0.79 | 0.32 | 1.11 |  |
| 137 | Zac | -0.80 | 0.18 | 0.98 |  |
| 138 | Ivern | -0.80 | 0.11 | 0.91 |  |
| 139 | Irelia | -0.82 | 0.00 | 0.82 |  |
| 140 | Ashe | -0.83 | 0.24 | 1.07 |  |
| 141 | Sona | -0.84 | 0.26 | 1.10 |  |
| 142 | Akali | -0.84 | 0.00 | 0.84 |  |
| 143 | Talon | -0.84 | 0.00 | 0.84 |  |
| 144 | Twisted Fate | -0.85 | 0.25 | 1.10 |  |
| 145 | Lillia | -0.85 | 0.05 | 0.90 |  |
| 146 | Tristana | -0.86 | 0.24 | 1.10 |  |
| 147 | Ziggs | -0.86 | 0.17 | 1.03 |  |
| 148 | Xerath | -0.87 | 0.16 | 1.03 |  |
| 149 | Miss Fortune | -0.88 | 0.20 | 1.08 |  |
| 150 | Heimerdinger | -0.88 | 0.12 | 1.00 |  |
| 151 | Graves | -0.89 | 0.14 | 1.03 |  |
| 152 | Tahm Kench | -0.90 | 0.00 | 0.90 |  |
| 153 | Lucian | -0.91 | 0.21 | 1.12 |  |
| 154 | Qiyana | -0.91 | 0.00 | 0.91 |  |
| 155 | Caitlyn | -0.93 | 0.24 | 1.17 |  |
| 156 | Ornn | -0.95 | 0.28 | 1.23 |  |
| 157 | Urgot | -0.98 | 0.08 | 1.06 |  |
| 158 | Katarina | -0.98 | 0.00 | 0.98 |  |
| 159 | Sejuani | -0.98 | 0.00 | 0.98 |  |
| 160 | Seraphine | -1.02 | 0.17 | 1.19 |  |
| 161 | Nami | -1.02 | 0.14 | 1.16 |  |
| 162 | Varus | -1.04 | 0.18 | 1.22 |  |
| 163 | Renata Glasc | -1.05 | 0.24 | 1.29 |  |
| 164 | Janna | -1.08 | 0.22 | 1.30 |  |
| 165 | Jhin | -1.09 | 0.17 | 1.26 |  |
| 166 | Fiddlesticks | -1.10 | 0.11 | 1.21 |  |
| 167 | Akshan | -1.16 | 0.19 | 1.35 |  |
| 168 | Gragas | -1.17 | 0.00 | 1.17 |  |
| 169 | Nunu & Willump | -1.18 | 0.00 | 1.18 |  |
| 170 | Pyke | -1.20 | 0.00 | 1.20 |  |
| 171 | Briar | -1.22 | 0.00 | 1.22 |  |
| 172 | Taliyah | -1.49 | 0.16 | 1.65 |  |
