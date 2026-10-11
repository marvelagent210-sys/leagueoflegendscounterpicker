# Counters to Urgot (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 24 other champions with a simulator kit against Urgot: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Urgot wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Urgot --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +1.00 |
| 2 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 3 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 4 | Olaf | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 5 | Malphite | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 6 | Mordekaiser | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 7 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 8 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 9 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 10 | Yone | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 11 | Aatrox | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 12 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 13 | Volibear | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 14 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 15 | Camille | +0.77 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 16 | Dr. Mundo | +0.41 | +0.46 | +0.47 | +0.38 | −0.03 | +1.00 | +0.00 |
| 17 | Nasus | +0.38 | +0.19 | +0.21 | +1.00 | −0.12 | +1.00 | +0.00 |
| 18 | Renekton | +0.15 | +0.09 | +0.10 | +0.10 | −0.13 | +1.00 | +0.00 |
| 19 | Sett | +0.04 | −0.05 | −0.04 | −0.05 | −0.17 | +1.00 | +0.00 |
| 20 | Shen | +0.01 | +0.03 | +0.01 | +0.08 | −0.04 | −0.05 | +0.00 |
| 21 | Ornn | +0.00 | −0.01 | −0.01 | −0.01 | +0.03 | +0.03 | +0.00 |
| 22 | Yasuo | −0.55 | −0.91 | −0.91 | −0.91 | −0.09 | +1.00 | +0.00 |
| 23 | Irelia | −0.63 | −1.00 | −1.00 | −1.00 | −0.17 | +1.00 | +0.00 |
| 24 | Riven | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Urgot's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Urgot's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Urgot` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Elise (net +1.33)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Urgot's Fear Beyond Death. Untargetable for 0.6 s; Fear Beyond Death takes 1.28 s to land, enough to react. (Elise E Rappel → Urgot R Fear Beyond Death)
- **0.74** untargetable: Rappel makes Elise untargetable, dodging Urgot's Disdain. Untargetable for 0.6 s; Disdain takes 0.85 s to land, enough to react. (Elise E Rappel → Urgot E Disdain)
- **0.16** range: Elise's basic attacks reach 200 units farther than Urgot's (550 vs 350 attack range). Urgot closes the gap with Disdain. (Elise basic attacks → Urgot basic attacks)

#### 2. Morgana (net +1.28)

- **0.80** cc immunity: Black Shield makes Morgana immune to Urgot's Fear Beyond Death (fear, slow, suppression). Immune for 5 s, long enough to use ahead of Fear Beyond Death. (Morgana E Black Shield → Urgot R Fear Beyond Death)
- **0.79** cc immunity: Black Shield makes Morgana immune to Urgot's Disdain (airborne, stun). Immune for 5 s, long enough to use ahead of Disdain. (Morgana E Black Shield → Urgot E Disdain)
- **0.08** cc immunity: Black Shield makes Morgana immune to Urgot's Corrosive Charge (slow). Immune for 5 s, long enough to use ahead of Corrosive Charge. (Morgana E Black Shield → Urgot Q Corrosive Charge)

#### 3. Fiora (net +1.23)

- **0.90** parry: Riposte parries Urgot's Fear Beyond Death and stuns back. Parry for 0.75 s; Fear Beyond Death takes 1.28 s to land, enough to react. Negating Fear Beyond Death's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Urgot R Fear Beyond Death)
- **0.89** parry: Riposte parries Urgot's Disdain and stuns back. Parry for 0.75 s; Disdain takes 0.85 s to land, enough to react. Negating Disdain's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Urgot E Disdain)
- **0.06** attack speed slow: Riposte cuts Urgot's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Urgot basic attacks)
- Watch out: Urgot's basic attacks reach 200 units farther than Fiora's (350 vs 150 attack range).

#### 4. Vladimir (net +1.18)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Urgot's Fear Beyond Death. Untargetable for 2 s, long enough to use ahead of Fear Beyond Death. (Vladimir W Sanguine Pool → Urgot R Fear Beyond Death)
- **0.79** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Urgot's Disdain. Untargetable for 2 s, long enough to use ahead of Disdain. (Vladimir W Sanguine Pool → Urgot E Disdain)
- **0.05** range: Vladimir's basic attacks reach 100 units farther than Urgot's (450 vs 350 attack range). Urgot closes the gap with Disdain. (Vladimir basic attacks → Urgot basic attacks)
- Watch out: Disdain's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 5. Udyr (net +1.13)

- **0.85** cc immunity: Blazing Stampede makes Udyr immune to Urgot's Disdain (airborne, stun). Immune for 1.5 s, long enough to use ahead of Disdain. (Udyr E Blazing Stampede → Urgot E Disdain)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Urgot's Fear Beyond Death (fear, slow, suppression). Immune for 1.5 s, long enough to use ahead of Fear Beyond Death. (Udyr E Blazing Stampede → Urgot R Fear Beyond Death)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Urgot's Corrosive Charge (slow). Immune for 1.5 s, long enough to use ahead of Corrosive Charge. (Udyr E Blazing Stampede → Urgot Q Corrosive Charge)
- Watch out: Urgot's basic attacks reach 225 units farther than Udyr's (350 vs 125 attack range).

#### 6. Mel (net +1.13)

- **0.80** projectile block: Rebuttal blocks Urgot's Fear Beyond Death, a projectile. Rebuttal for 0.75 s; Fear Beyond Death takes 1.28 s to land, enough to react. (Mel W Rebuttal → Urgot R Fear Beyond Death)
- **0.26** projectile block: Rebuttal blocks Urgot's Corrosive Charge, a projectile. Rebuttal for 0.75 s; Corrosive Charge takes 0.25 s to land, enough to react. (Mel W Rebuttal → Urgot Q Corrosive Charge)
- **0.22** projectile block: Rebuttal blocks Urgot's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Urgot basic attacks)

#### 7. Samira (net +1.13)

- **0.80** projectile block: Blade Whirl blocks Urgot's Fear Beyond Death, a projectile. Blade Whirl for 0.75 s; Fear Beyond Death takes 1.28 s to land, enough to react. (Samira W Blade Whirl → Urgot R Fear Beyond Death)
- **0.28** projectile block: Blade Whirl blocks Urgot's Corrosive Charge, a projectile. Blade Whirl for 0.75 s; Corrosive Charge takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Urgot Q Corrosive Charge)
- **0.22** projectile block: Blade Whirl blocks Urgot's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Urgot basic attacks)

#### 8. Sivir (net +1.13)

- **0.74** spell shield: Spell Shield's spell shield blocks Urgot's Disdain. Spell shield for 1.5 s, long enough to use ahead of Disdain. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Urgot E Disdain)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Urgot's Fear Beyond Death. Spell shield for 1.5 s, long enough to use ahead of Fear Beyond Death. A spell shield blocks only the first enemy ability that reaches it. Spell shield will not block the recast's chains. (Sivir E Spell Shield → Urgot R Fear Beyond Death)
- **0.19** range: Sivir's basic attacks reach 150 units farther than Urgot's (500 vs 350 attack range). Urgot closes the gap with Disdain. (Sivir basic attacks → Urgot basic attacks)

#### 9. Lissandra (net +1.12)

- **0.74** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Urgot's Fear Beyond Death. Untargetable for 2.5 s, long enough to use ahead of Fear Beyond Death. (Lissandra R Frozen Tomb → Urgot R Fear Beyond Death)
- **0.43** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Urgot's Disdain. Untargetable for 2.5 s, long enough to use ahead of Disdain. (Lissandra R Frozen Tomb → Urgot E Disdain)
- **0.21** dash stop: Frozen Tomb's knockdown can stop Urgot's Disdain mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Urgot E Disdain)

#### 10. Maokai (net +1.10)

- **0.85** untargetable: Twisted Advance makes Maokai untargetable, dodging Urgot's Disdain. Untargetable for 1.4 s; Disdain takes 0.85 s to land, enough to react. (Maokai W Twisted Advance → Urgot E Disdain)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Urgot's Fear Beyond Death. Untargetable for 1.4 s; Fear Beyond Death takes 1.28 s to land, enough to react. (Maokai W Twisted Advance → Urgot R Fear Beyond Death)
- Watch out: Urgot's basic attacks reach 225 units farther than Maokai's (350 vs 125 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.33 | 1.33 | 0.00 |  |
| 2 | Morgana | +1.28 | 1.28 | 0.00 |  |
| 3 | Fiora | +1.23 | 1.36 | 0.13 |  |
| 4 | Vladimir | +1.18 | 1.25 | 0.07 |  |
| 5 | Udyr | +1.13 | 1.28 | 0.15 |  |
| 6 | Mel | +1.13 | 1.13 | 0.00 | projectile block (Rebuttal) |
| 7 | Samira | +1.13 | 1.13 | 0.00 | projectile block (Blade Whirl) |
| 8 | Sivir | +1.13 | 1.13 | 0.00 |  |
| 9 | Lissandra | +1.12 | 1.12 | 0.00 |  |
| 10 | Maokai | +1.10 | 1.25 | 0.15 |  |
| 11 | Bard | +1.10 | 1.10 | 0.00 |  |
| 12 | Master Yi | +1.06 | 1.37 | 0.31 |  |
| 13 | Gwen | +1.04 | 1.17 | 0.13 |  |
| 14 | Xayah | +1.03 | 1.03 | 0.00 |  |
| 15 | Braum | +1.00 | 1.15 | 0.15 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 16 | Nocturne | +0.99 | 1.14 | 0.15 |  |
| 17 | Yasuo | +0.98 | 1.06 | 0.08 | projectile block (Wind Wall) |
| 18 | Yuumi | +0.94 | 1.33 | 0.39 |  |
| 19 | Ekko | +0.94 | 1.04 | 0.10 |  |
| 20 | Rek'Sai | +0.90 | 0.98 | 0.08 |  |
| 21 | Zaahen | +0.89 | 0.97 | 0.08 |  |
| 22 | Aurora | +0.88 | 1.03 | 0.15 |  |
| 23 | Milio | +0.88 | 0.88 | 0.00 |  |
| 24 | Camille | +0.84 | 0.92 | 0.08 |  |
| 25 | Warwick | +0.81 | 1.17 | 0.36 |  |
| 26 | Kled | +0.81 | 0.84 | 0.03 |  |
| 27 | Kalista | +0.79 | 0.79 | 0.00 |  |
| 28 | Evelynn | +0.78 | 0.96 | 0.18 |  |
| 29 | Zed | +0.77 | 0.87 | 0.10 |  |
| 30 | Kayle | +0.73 | 0.73 | 0.00 |  |
| 31 | Gangplank | +0.72 | 1.02 | 0.30 |  |
| 32 | Sion | +0.69 | 1.04 | 0.35 |  |
| 33 | Olaf | +0.67 | 0.97 | 0.30 |  |
| 34 | Shaco | +0.66 | 0.96 | 0.30 |  |
| 35 | Alistar | +0.62 | 0.77 | 0.15 |  |
| 36 | Vex | +0.61 | 0.61 | 0.00 |  |
| 37 | Kindred | +0.59 | 0.59 | 0.00 |  |
| 38 | Rengar | +0.58 | 1.02 | 0.44 |  |
| 39 | Viktor | +0.57 | 0.57 | 0.00 | dash stop (Gravity Field) |
| 40 | Jinx | +0.56 | 0.56 | 0.00 | dash stop (Flame Chompers!) |
| 41 | Veigar | +0.55 | 0.55 | 0.00 | dash stop (Event Horizon) |
| 42 | Malzahar | +0.54 | 0.94 | 0.40 |  |
| 43 | Ahri | +0.54 | 0.54 | 0.00 | dash stop (Charm) |
| 44 | Hwei | +0.54 | 0.54 | 0.00 | dash stop (Grim Visage) |
| 45 | Cassiopeia | +0.51 | 0.51 | 0.00 | grounding (Miasma) |
| 46 | Kayn | +0.43 | 0.96 | 0.53 |  |
| 47 | Pantheon | +0.43 | 0.59 | 0.16 |  |
| 48 | Lulu | +0.43 | 0.43 | 0.00 |  |
| 49 | Teemo | +0.41 | 0.49 | 0.08 |  |
| 50 | Mordekaiser | +0.32 | 0.55 | 0.23 |  |
| 51 | Xin Zhao | +0.32 | 0.44 | 0.12 |  |
| 52 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 53 | Garen | +0.31 | 0.54 | 0.23 |  |
| 54 | Aphelios | +0.30 | 0.30 | 0.00 |  |
| 55 | Nilah | +0.28 | 0.36 | 0.08 |  |
| 56 | Jax | +0.24 | 0.39 | 0.15 |  |
| 57 | Yone | +0.24 | 0.30 | 0.06 |  |
| 58 | Corki | +0.24 | 0.24 | 0.00 |  |
| 59 | Ashe | +0.22 | 0.22 | 0.00 |  |
| 60 | Zeri | +0.22 | 0.22 | 0.00 |  |
| 61 | Heimerdinger | +0.21 | 0.21 | 0.00 |  |
| 62 | Sona | +0.21 | 0.21 | 0.00 |  |
| 63 | Yunara | +0.20 | 0.20 | 0.00 |  |
| 64 | Poppy | +0.19 | 0.54 | 0.35 | dash stop (Steadfast Presence) |
| 65 | Renata Glasc | +0.19 | 0.19 | 0.00 |  |
| 66 | Draven | +0.18 | 0.18 | 0.00 |  |
| 67 | Ezreal | +0.16 | 0.16 | 0.00 |  |
| 68 | Smolder | +0.16 | 0.16 | 0.00 |  |
| 69 | Zilean | +0.16 | 0.16 | 0.00 |  |
| 70 | Zoe | +0.16 | 0.16 | 0.00 |  |
| 71 | Anivia | +0.15 | 0.15 | 0.00 |  |
| 72 | Annie | +0.15 | 0.15 | 0.00 |  |
| 73 | Gnar | +0.14 | 0.14 | 0.00 |  |
| 74 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 75 | Lux | +0.14 | 0.14 | 0.00 |  |
| 76 | Taric | +0.13 | 0.40 | 0.27 |  |
| 77 | Nidalee | +0.13 | 0.13 | 0.00 |  |
| 78 | Seraphine | +0.13 | 0.13 | 0.00 |  |
| 79 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 80 | Ziggs | +0.13 | 0.13 | 0.00 |  |
| 81 | Zyra | +0.13 | 0.13 | 0.00 |  |
| 82 | Singed | +0.12 | 0.42 | 0.30 | grounding (Mega Adhesive) |
| 83 | Malphite | +0.12 | 0.27 | 0.15 |  |
| 84 | Azir | +0.12 | 0.12 | 0.00 |  |
| 85 | Jayce | +0.12 | 0.12 | 0.00 |  |
| 86 | Orianna | +0.12 | 0.12 | 0.00 |  |
| 87 | K'Sante | +0.11 | 0.18 | 0.07 |  |
| 88 | Brand | +0.11 | 0.11 | 0.00 |  |
| 89 | Kog'Maw | +0.11 | 0.11 | 0.00 |  |
| 90 | Nami | +0.11 | 0.11 | 0.00 |  |
| 91 | Syndra | +0.11 | 0.11 | 0.00 |  |
| 92 | Twitch | +0.10 | 0.21 | 0.11 |  |
| 93 | Karma | +0.10 | 0.10 | 0.00 |  |
| 94 | Senna | +0.09 | 0.20 | 0.11 |  |
| 95 | Swain | +0.09 | 0.09 | 0.00 |  |
| 96 | Vayne | +0.07 | 0.21 | 0.14 |  |
| 97 | Amumu | +0.06 | 0.21 | 0.15 |  |
| 98 | Kai'Sa | +0.06 | 0.17 | 0.11 |  |
| 99 | Graves | +0.06 | 0.06 | 0.00 |  |
| 100 | Thresh | +0.06 | 0.06 | 0.00 |  |
| 101 | Varus | +0.05 | 0.15 | 0.10 |  |
| 102 | Aurelion Sol | +0.04 | 0.11 | 0.07 |  |
| 103 | Jarvan IV | +0.03 | 0.09 | 0.06 |  |
| 104 | LeBlanc | +0.02 | 0.10 | 0.08 |  |
| 105 | Hecarim | +0.01 | 0.09 | 0.08 |  |
| 106 | Ornn | +0.01 | 0.09 | 0.08 |  |
| 107 | Quinn | 0.00 | 0.17 | 0.17 |  |
| 108 | Neeko | 0.00 | 0.11 | 0.11 |  |
| 109 | Volibear | 0.00 | 0.09 | 0.09 |  |
| 110 | Lillia | 0.00 | 0.00 | 0.00 |  |
| 111 | Rakan | 0.00 | 0.00 | 0.00 |  |
| 112 | Caitlyn | -0.01 | 0.27 | 0.28 |  |
| 113 | Nasus | -0.03 | 0.27 | 0.30 |  |
| 114 | Shyvana | -0.04 | 0.09 | 0.13 |  |
| 115 | Ivern | -0.05 | 0.07 | 0.12 |  |
| 116 | Illaoi | -0.06 | 0.09 | 0.15 |  |
| 117 | Sett | -0.06 | 0.09 | 0.15 |  |
| 118 | Fizz | -0.06 | 0.00 | 0.06 |  |
| 119 | Sylas | -0.06 | 0.00 | 0.06 |  |
| 120 | Zac | -0.08 | 0.43 | 0.51 | dash stop (Stretching Strikes) |
| 121 | Briar | -0.08 | 0.00 | 0.08 |  |
| 122 | Rell | -0.08 | 0.00 | 0.08 |  |
| 123 | Bel'Veth | -0.09 | 0.00 | 0.09 |  |
| 124 | Ambessa | -0.10 | 0.00 | 0.10 |  |
| 125 | Irelia | -0.10 | 0.00 | 0.10 |  |
| 126 | Lee Sin | -0.10 | 0.00 | 0.10 |  |
| 127 | Riven | -0.10 | 0.00 | 0.10 |  |
| 128 | Rammus | -0.11 | 0.27 | 0.38 |  |
| 129 | Miss Fortune | -0.12 | 0.16 | 0.28 |  |
| 130 | Aatrox | -0.12 | 0.00 | 0.12 |  |
| 131 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 132 | Tryndamere | -0.12 | 0.00 | 0.12 |  |
| 133 | Diana | -0.13 | 0.00 | 0.13 |  |
| 134 | Kassadin | -0.13 | 0.00 | 0.13 |  |
| 135 | Sejuani | -0.13 | 0.00 | 0.13 |  |
| 136 | Lucian | -0.14 | 0.14 | 0.28 |  |
| 137 | Skarner | -0.14 | 0.13 | 0.27 |  |
| 138 | Jhin | -0.15 | 0.13 | 0.28 |  |
| 139 | Leona | -0.15 | 0.00 | 0.15 |  |
| 140 | Locke | -0.15 | 0.00 | 0.15 |  |
| 141 | Renekton | -0.15 | 0.00 | 0.15 |  |
| 142 | Twisted Fate | -0.16 | 0.19 | 0.35 |  |
| 143 | Vel'Koz | -0.16 | 0.12 | 0.28 |  |
| 144 | Shen | -0.17 | 0.38 | 0.55 |  |
| 145 | Xerath | -0.20 | 0.12 | 0.32 |  |
| 146 | Akali | -0.21 | 0.00 | 0.21 |  |
| 147 | Janna | -0.22 | 0.18 | 0.40 |  |
| 148 | Karthus | -0.22 | 0.06 | 0.28 |  |
| 149 | Ryze | -0.23 | 0.12 | 0.35 |  |
| 150 | Darius | -0.23 | 0.00 | 0.23 |  |
| 151 | Trundle | -0.23 | 0.00 | 0.23 |  |
| 152 | Yorick | -0.23 | 0.00 | 0.23 |  |
| 153 | Talon | -0.24 | 0.00 | 0.24 |  |
| 154 | Viego | -0.26 | 0.09 | 0.35 |  |
| 155 | Galio | -0.27 | 0.00 | 0.27 |  |
| 156 | Qiyana | -0.27 | 0.00 | 0.27 |  |
| 157 | Akshan | -0.28 | 0.14 | 0.42 |  |
| 158 | Wukong | -0.28 | 0.00 | 0.28 |  |
| 159 | Gragas | -0.29 | 0.00 | 0.29 |  |
| 160 | Blitzcrank | -0.30 | 0.00 | 0.30 |  |
| 161 | Cho'Gath | -0.30 | 0.00 | 0.30 |  |
| 162 | Dr. Mundo | -0.30 | 0.00 | 0.30 |  |
| 163 | Rumble | -0.30 | 0.00 | 0.30 |  |
| 164 | Pyke | -0.33 | 0.00 | 0.33 |  |
| 165 | Vi | -0.34 | 0.09 | 0.43 |  |
| 166 | Taliyah | -0.36 | 0.12 | 0.48 |  |
| 167 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 168 | Fiddlesticks | -0.37 | 0.07 | 0.44 |  |
| 169 | Katarina | -0.43 | 0.00 | 0.43 |  |
| 170 | Nunu & Willump | -0.51 | 0.28 | 0.79 |  |
| 171 | Naafiri | -0.53 | 0.00 | 0.53 |  |
| 172 | Tahm Kench | -0.62 | 0.00 | 0.62 |  |
