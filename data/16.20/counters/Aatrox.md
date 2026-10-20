# Counters to Aatrox (patch 26.20)

## Simulated duels

The duel simulator played each of the 90 other champions with a simulator kit against Aatrox: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Aatrox wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Aatrox --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.90 | +1.00 | +1.00 | +1.00 | +0.66 | +1.00 | +0.00 |
| 2 | Vayne | +0.88 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +1.00 |
| 3 | K'Sante | +0.87 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +1.00 |
| 4 | Ashe | +0.86 | +1.00 | +1.00 | +1.00 | +0.32 | +1.00 | +0.24 |
| 5 | Kog'Maw | +0.85 | +1.00 | +1.00 | +1.00 | +0.36 | +1.00 | +0.00 |
| 6 | Teemo | +0.85 | +1.00 | +1.00 | +1.00 | +0.34 | +1.00 | +0.00 |
| 7 | Miss Fortune | +0.85 | +1.00 | +1.00 | +1.00 | +0.32 | +1.00 | +0.00 |
| 8 | Draven | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 9 | Xayah | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 10 | Kalista | +0.84 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.07 |
| 11 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | +0.02 | – | +1.00 |
| 12 | Annie | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 13 | Quinn | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 14 | Corki | +0.83 | +0.93 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 15 | Kai'Sa | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 16 | Lux | +0.82 | +0.98 | +1.00 | +1.00 | +0.26 | +0.84 | +0.00 |
| 17 | Sivir | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 18 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | −0.12 | – | +1.00 |
| 19 | Cassiopeia | +0.81 | +1.00 | +1.00 | +0.82 | +0.41 | +0.86 | +0.00 |
| 20 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.17 | – | +1.00 |
| 21 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 22 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 23 | Illaoi | +0.79 | +1.00 | +0.96 | +1.00 | +0.14 | – | +0.00 |
| 24 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 25 | Jinx | +0.77 | +0.98 | +1.00 | +0.72 | +0.19 | +1.00 | +0.00 |
| 26 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 27 | Morgana | +0.73 | +1.00 | +0.98 | +1.00 | +0.22 | −0.00 | +0.00 |
| 28 | Heimerdinger | +0.73 | +0.73 | +1.00 | +1.00 | +0.17 | +0.69 | +0.00 |
| 29 | Jayce | +0.71 | +1.00 | +0.59 | +0.98 | +0.29 | – | +0.00 |
| 30 | Kennen | +0.68 | +1.00 | +1.00 | +1.00 | +0.02 | −0.26 | +0.00 |
| 31 | Fiora | +0.67 | +1.00 | +1.00 | +0.15 | +0.17 | – | +1.00 |
| 32 | Yasuo | +0.57 | +0.69 | +0.67 | +0.66 | +0.02 | – | +0.66 |
| 33 | Brand | +0.54 | +0.81 | +0.30 | +0.79 | +0.19 | +0.80 | +0.00 |
| 34 | Gangplank | +0.53 | +1.00 | −0.17 | +1.00 | +0.12 | – | +1.00 |
| 35 | Aurora | +0.33 | +1.00 | −0.98 | +1.00 | +0.15 | +1.00 | +0.00 |
| 36 | Veigar | +0.29 | +0.93 | +0.07 | +0.41 | +0.10 | −0.55 | +0.00 |
| 37 | Yone | +0.26 | +1.00 | −1.00 | +1.00 | +0.09 | – | +0.49 |
| 38 | Jhin | +0.25 | +1.00 | +1.00 | −1.00 | +0.33 | −0.97 | +0.00 |
| 39 | Poppy | +0.25 | +1.00 | −1.00 | +1.00 | +0.14 | – | +0.00 |
| 40 | Ezreal | +0.23 | −0.50 | +0.56 | +0.89 | +0.08 | +0.27 | +0.00 |
| 41 | Singed | +0.11 | +1.00 | +0.25 | −1.00 | −0.09 | – | +0.00 |
| 42 | Anivia | +0.11 | +0.13 | +0.10 | +0.08 | −0.00 | +0.33 | +0.00 |
| 43 | Ahri | +0.08 | −0.73 | +0.83 | −0.01 | +0.15 | +0.33 | +0.00 |
| 44 | Gnar | +0.01 | +0.55 | +0.54 | −1.00 | +0.25 | −1.00 | +0.00 |
| 45 | Lucian | +0.01 | +0.02 | +1.00 | −1.00 | +0.19 | −0.73 | +0.00 |
| 46 | Lissandra | −0.05 | −0.39 | −0.77 | +0.80 | +0.18 | +0.50 | +0.00 |
| 47 | Olaf | −0.08 | −0.54 | −0.49 | +1.00 | −0.07 | – | +0.00 |
| 48 | Samira | −0.08 | −0.99 | +1.00 | −0.92 | +0.02 | +0.98 | +0.00 |
| 49 | Zyra | −0.14 | −0.87 | +1.00 | −1.00 | +0.16 | +0.06 | +0.00 |
| 50 | Rumble | −0.23 | −0.43 | −1.00 | +0.76 | −0.01 | – | +0.00 |
| 51 | Varus | −0.31 | +0.85 | −1.00 | −1.00 | +0.12 | −0.93 | +0.00 |
| 52 | Garen | −0.33 | −1.00 | −1.00 | +1.00 | +0.01 | – | +0.00 |
| 53 | Tryndamere | −0.36 | −1.00 | −1.00 | +1.00 | −0.14 | – | +0.00 |
| 54 | Master Yi | −0.42 | +0.00 | −1.00 | −1.00 | +0.15 | – | +1.00 |
| 55 | Vel'Koz | −0.42 | −0.12 | −0.91 | −1.00 | +0.40 | −0.28 | +0.00 |
| 56 | Tristana | −0.57 | −1.00 | −1.00 | −1.00 | +0.17 | +1.00 | +0.00 |
| 57 | Riven | −0.68 | −1.00 | −1.00 | −1.00 | +0.28 | – | +1.00 |
| 58 | Ziggs | −0.70 | −1.00 | −1.00 | −0.77 | +0.28 | −0.87 | +0.00 |
| 59 | Camille | −0.72 | −1.00 | −1.00 | −1.00 | +0.01 | – | +1.00 |
| 60 | Udyr | −0.73 | −1.00 | −1.00 | −1.00 | −0.06 | – | +1.00 |
| 61 | Tahm Kench | −0.74 | −1.00 | −1.00 | −1.00 | +0.23 | – | +0.00 |
| 62 | Ambessa | −0.74 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.00 |
| 63 | Irelia | −0.75 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.00 |
| 64 | Ornn | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 65 | Smolder | −0.76 | −1.00 | −1.00 | −1.00 | +0.29 | −1.00 | +0.00 |
| 66 | Sion | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 67 | Urgot | −0.76 | −1.00 | −1.00 | −1.00 | +0.28 | −1.00 | +0.00 |
| 68 | Pantheon | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 69 | Malphite | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 70 | Gwen | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 71 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 72 | Caitlyn | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 73 | Xin Zhao | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 74 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 75 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 76 | Twitch | −0.78 | −0.98 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 77 | Renekton | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 78 | Malzahar | −0.78 | −0.96 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 79 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 80 | Karthus | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 81 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 82 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 83 | Mordekaiser | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 84 | Volibear | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 85 | Cho'Gath | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 86 | Dr. Mundo | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 87 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 88 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 89 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 90 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Aatrox's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Aatrox's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Aatrox` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Singed (net +1.08)

- **0.39** grounding: Mega Adhesive grounds Aatrox, who then can't cast Umbral Dash. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Aatrox E Umbral Dash)
- **0.32** anti-heal: Insanity Potion's Grievous Wounds cuts Aatrox's healing from Umbral Dash by 40%. (Singed R Insanity Potion → Aatrox E Umbral Dash)
- **0.22** anti-heal: Insanity Potion's Grievous Wounds cuts Aatrox's healing from World Ender by 40%. (Singed R Insanity Potion → Aatrox R World Ender)

#### 2. Udyr (net +0.93)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Aatrox's The Darkin Blade (airborne). Immune for 1.5 s, long enough to use ahead of The Darkin Blade. (Udyr E Blazing Stampede → Aatrox Q The Darkin Blade)
- **0.45** cc immunity: Blazing Stampede makes Udyr immune to Aatrox's Infernal Chains (airborne, slow). Immune for 1.5 s, long enough to use ahead of Infernal Chains. (Udyr E Blazing Stampede → Aatrox W Infernal Chains)

#### 3. Sivir (net +0.92)

- **0.42** spell shield: Spell Shield's spell shield blocks Aatrox's The Darkin Blade. Spell shield for 1.5 s, long enough to use ahead of The Darkin Blade. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Aatrox Q The Darkin Blade)
- **0.41** range: Sivir's basic attacks reach 325 units farther than Aatrox's (500 vs 175 attack range). Aatrox closes the gap with Umbral Dash. (Sivir basic attacks → Aatrox basic attacks)
- **0.18** spell shield: Spell Shield's spell shield blocks part of Aatrox's Infernal Chains. Spell shield for 1.5 s, long enough to use ahead of Infernal Chains. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the chain's application and initial damage but not the aftereffects of one already applied. (Sivir E Spell Shield → Aatrox W Infernal Chains)

#### 4. Fizz (net +0.83)

- **0.60** untargetable: Playful makes Fizz untargetable, dodging Aatrox's The Darkin Blade. Untargetable for 0.75 s; The Darkin Blade takes 0.6 s to land, enough to react. (Fizz E Playful → Aatrox Q The Darkin Blade)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Aatrox's Infernal Chains. Untargetable for 0.75 s; Infernal Chains takes 0.71 s to land, enough to react. (Fizz E Playful → Aatrox W Infernal Chains)

#### 5. Fiora (net +0.80)

- **0.54** parry: Riposte parries Aatrox's The Darkin Blade and stuns back. Parry for 0.75 s; The Darkin Blade takes 0.6 s to land, enough to react. Negating The Darkin Blade's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Aatrox Q The Darkin Blade)
- **0.48** parry: Riposte parries Aatrox's Infernal Chains and stuns back. Parry for 0.75 s; Infernal Chains takes 0.71 s to land, enough to react. Negating Infernal Chains's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Aatrox W Infernal Chains)
- **0.09** attack speed slow: Riposte cuts Aatrox's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Aatrox basic attacks)

#### 6. Morgana (net +0.79)

- **0.44** cc immunity: Black Shield makes Morgana immune to Aatrox's The Darkin Blade (airborne). Immune for 5 s, long enough to use ahead of The Darkin Blade. (Morgana E Black Shield → Aatrox Q The Darkin Blade)
- **0.38** cc immunity: Black Shield makes Morgana immune to Aatrox's Infernal Chains (airborne, slow). Immune for 5 s, long enough to use ahead of Infernal Chains. (Morgana E Black Shield → Aatrox W Infernal Chains)
- **0.16** range: Morgana's basic attacks reach 275 units farther than Aatrox's (450 vs 175 attack range). Aatrox closes the gap with Umbral Dash. (Morgana basic attacks → Aatrox basic attacks)

#### 7. Nocturne (net +0.77)

- **0.49** spell shield: Shroud of Darkness's spell shield blocks Aatrox's The Darkin Blade. Spell shield for 1.5 s, long enough to use ahead of The Darkin Blade. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Aatrox Q The Darkin Blade)
- **0.23** spell shield: Shroud of Darkness's spell shield blocks part of Aatrox's Infernal Chains. Spell shield for 1.5 s, long enough to use ahead of Infernal Chains. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the chain's application and initial damage but not the aftereffects of one already applied. (Nocturne W Shroud of Darkness → Aatrox W Infernal Chains)
- **0.14** cc immunity: Paranoia is displacement immune, ignoring Aatrox's The Darkin Blade (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Aatrox Q The Darkin Blade)

#### 8. Yuumi (net +0.76)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Aatrox's The Darkin Blade. Untargetable for ?; The Darkin Blade takes 0.6 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Aatrox Q The Darkin Blade)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Aatrox's Infernal Chains. Untargetable for ?; Infernal Chains takes 0.71 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Aatrox W Infernal Chains)
- **0.27** range: Yuumi's basic attacks reach 250 units farther than Aatrox's (425 vs 175 attack range). Aatrox closes the gap with Umbral Dash. (Yuumi basic attacks → Aatrox basic attacks)
- Watch out: The Darkin Blade's airborne interrupts Yuumi's Final Chapter (normal channel).

#### 9. Maokai (net +0.76)

- **0.53** untargetable: Twisted Advance makes Maokai untargetable, dodging Aatrox's The Darkin Blade. Untargetable for 1.4 s; The Darkin Blade takes 0.6 s to land, enough to react. (Maokai W Twisted Advance → Aatrox Q The Darkin Blade)
- **0.45** untargetable: Twisted Advance makes Maokai untargetable, dodging Aatrox's Infernal Chains. Untargetable for 1.4 s; Infernal Chains takes 0.71 s to land, enough to react. (Maokai W Twisted Advance → Aatrox W Infernal Chains)

#### 10. Xayah (net +0.76)

- **0.34** range: Xayah's basic attacks reach 350 units farther than Aatrox's (525 vs 175 attack range). Aatrox closes the gap with Umbral Dash. (Xayah basic attacks → Aatrox basic attacks)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Aatrox's The Darkin Blade. Untargetable for 1.5 s, long enough to use ahead of The Darkin Blade. (Xayah R Featherstorm → Aatrox Q The Darkin Blade)
- **0.21** untargetable: Featherstorm makes Xayah untargetable, dodging Aatrox's Infernal Chains. Untargetable for 1.5 s, long enough to use ahead of Infernal Chains. (Xayah R Featherstorm → Aatrox W Infernal Chains)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Singed | +1.08 | 1.08 | 0.00 |  |
| 2 | Udyr | +0.93 | 0.93 | 0.00 |  |
| 3 | Sivir | +0.92 | 0.92 | 0.00 |  |
| 4 | Fizz | +0.83 | 0.83 | 0.00 |  |
| 5 | Fiora | +0.80 | 0.80 | 0.00 |  |
| 6 | Morgana | +0.79 | 0.79 | 0.00 |  |
| 7 | Nocturne | +0.77 | 0.77 | 0.00 |  |
| 8 | Yuumi | +0.76 | 1.19 | 0.43 |  |
| 9 | Maokai | +0.76 | 0.76 | 0.00 |  |
| 10 | Xayah | +0.76 | 0.76 | 0.00 |  |
| 11 | Bard | +0.73 | 0.73 | 0.00 |  |
| 12 | Teemo | +0.71 | 0.79 | 0.08 | blind (Blinding Dart) |
| 13 | Lulu | +0.70 | 0.70 | 0.00 |  |
| 14 | Vladimir | +0.68 | 0.78 | 0.10 |  |
| 15 | Lissandra | +0.68 | 0.68 | 0.00 |  |
| 16 | Vex | +0.66 | 0.66 | 0.00 |  |
| 17 | Varus | +0.62 | 0.73 | 0.11 |  |
| 18 | Kalista | +0.61 | 0.61 | 0.00 |  |
| 19 | Gwen | +0.60 | 0.60 | 0.00 |  |
| 20 | Cassiopeia | +0.59 | 0.59 | 0.00 |  |
| 21 | Samira | +0.59 | 0.59 | 0.00 |  |
| 22 | Aurora | +0.58 | 0.73 | 0.15 |  |
| 23 | Kayle | +0.58 | 0.58 | 0.00 |  |
| 24 | Mel | +0.55 | 0.55 | 0.00 |  |
| 25 | Gangplank | +0.54 | 0.54 | 0.00 |  |
| 26 | Jinx | +0.53 | 0.53 | 0.00 |  |
| 27 | Viktor | +0.53 | 0.53 | 0.00 |  |
| 28 | Hwei | +0.49 | 0.49 | 0.00 |  |
| 29 | Kled | +0.49 | 0.49 | 0.00 |  |
| 30 | Rengar | +0.47 | 0.61 | 0.14 |  |
| 31 | Ahri | +0.47 | 0.47 | 0.00 |  |
| 32 | Veigar | +0.47 | 0.47 | 0.00 |  |
| 33 | Camille | +0.46 | 0.46 | 0.00 |  |
| 34 | Rek'Sai | +0.46 | 0.46 | 0.00 |  |
| 35 | Braum | +0.45 | 0.45 | 0.00 | projectile block (Unbreakable) |
| 36 | Master Yi | +0.44 | 0.67 | 0.23 |  |
| 37 | Malzahar | +0.43 | 0.83 | 0.40 |  |
| 38 | Malphite | +0.42 | 0.42 | 0.00 |  |
| 39 | Olaf | +0.42 | 0.42 | 0.00 |  |
| 40 | Zaahen | +0.42 | 0.42 | 0.00 |  |
| 41 | Zed | +0.42 | 0.42 | 0.00 |  |
| 42 | Aphelios | +0.41 | 0.41 | 0.00 |  |
| 43 | Jax | +0.41 | 0.41 | 0.00 | attack dodge (Counter Strike) |
| 44 | Kindred | +0.41 | 0.41 | 0.00 |  |
| 45 | Zeri | +0.41 | 0.41 | 0.00 |  |
| 46 | Milio | +0.40 | 0.40 | 0.00 |  |
| 47 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 48 | Sona | +0.39 | 0.39 | 0.00 |  |
| 49 | Yasuo | +0.37 | 0.37 | 0.00 |  |
| 50 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 51 | Renata Glasc | +0.36 | 0.36 | 0.00 |  |
| 52 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 53 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 54 | Nilah | +0.35 | 0.35 | 0.00 |  |
| 55 | Yone | +0.35 | 0.35 | 0.00 |  |
| 56 | Evelynn | +0.34 | 0.42 | 0.08 |  |
| 57 | Alistar | +0.34 | 0.34 | 0.00 |  |
| 58 | Draven | +0.34 | 0.34 | 0.00 |  |
| 59 | K'Sante | +0.33 | 0.33 | 0.00 |  |
| 60 | Poppy | +0.30 | 0.50 | 0.20 | dash stop (Steadfast Presence) |
| 61 | Corki | +0.30 | 0.30 | 0.00 |  |
| 62 | Elise | +0.30 | 0.30 | 0.00 |  |
| 63 | Ezreal | +0.30 | 0.30 | 0.00 |  |
| 64 | Smolder | +0.30 | 0.30 | 0.00 |  |
| 65 | Zilean | +0.30 | 0.30 | 0.00 |  |
| 66 | Zoe | +0.30 | 0.30 | 0.00 |  |
| 67 | Twitch | +0.29 | 0.40 | 0.11 |  |
| 68 | Gnar | +0.29 | 0.29 | 0.00 |  |
| 69 | Kennen | +0.27 | 0.27 | 0.00 |  |
| 70 | Lux | +0.27 | 0.27 | 0.00 |  |
| 71 | Sion | +0.26 | 0.44 | 0.18 |  |
| 72 | Vayne | +0.26 | 0.40 | 0.14 |  |
| 73 | Jayce | +0.26 | 0.26 | 0.00 |  |
| 74 | Nidalee | +0.26 | 0.26 | 0.00 |  |
| 75 | Seraphine | +0.25 | 0.25 | 0.00 |  |
| 76 | Soraka | +0.25 | 0.25 | 0.00 |  |
| 77 | Ziggs | +0.25 | 0.25 | 0.00 |  |
| 78 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 79 | Heimerdinger | +0.24 | 0.24 | 0.00 |  |
| 80 | Kog'Maw | +0.24 | 0.24 | 0.00 |  |
| 81 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 82 | Kai'Sa | +0.23 | 0.34 | 0.11 |  |
| 83 | Azir | +0.23 | 0.23 | 0.00 |  |
| 84 | Orianna | +0.23 | 0.23 | 0.00 |  |
| 85 | Shaco | +0.22 | 0.42 | 0.20 |  |
| 86 | Annie | +0.22 | 0.22 | 0.00 |  |
| 87 | Senna | +0.21 | 0.32 | 0.11 |  |
| 88 | Brand | +0.21 | 0.21 | 0.00 |  |
| 89 | Nami | +0.21 | 0.21 | 0.00 |  |
| 90 | Syndra | +0.21 | 0.21 | 0.00 |  |
| 91 | Xin Zhao | +0.21 | 0.21 | 0.00 |  |
| 92 | Graves | +0.20 | 0.20 | 0.00 |  |
| 93 | Karma | +0.19 | 0.19 | 0.00 |  |
| 94 | Katarina | +0.18 | 0.46 | 0.28 |  |
| 95 | Hecarim | +0.18 | 0.18 | 0.00 |  |
| 96 | Swain | +0.18 | 0.18 | 0.00 |  |
| 97 | Amumu | +0.17 | 0.17 | 0.00 |  |
| 98 | Illaoi | +0.17 | 0.17 | 0.00 |  |
| 99 | Jarvan IV | +0.17 | 0.17 | 0.00 |  |
| 100 | Ornn | +0.17 | 0.17 | 0.00 |  |
| 101 | Sett | +0.17 | 0.17 | 0.00 |  |
| 102 | Shyvana | +0.17 | 0.17 | 0.00 |  |
| 103 | Volibear | +0.17 | 0.17 | 0.00 |  |
| 104 | Thresh | +0.16 | 0.16 | 0.00 |  |
| 105 | Garen | +0.12 | 0.12 | 0.00 |  |
| 106 | Urgot | +0.12 | 0.12 | 0.00 |  |
| 107 | Quinn | +0.11 | 0.34 | 0.23 |  |
| 108 | Aurelion Sol | +0.11 | 0.21 | 0.10 |  |
| 109 | LeBlanc | +0.11 | 0.19 | 0.08 |  |
| 110 | Neeko | +0.10 | 0.21 | 0.11 |  |
| 111 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 112 | Rakan | +0.09 | 0.09 | 0.00 |  |
| 113 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 114 | Lillia | +0.08 | 0.08 | 0.00 |  |
| 115 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 116 | Rammus | +0.03 | 0.38 | 0.35 |  |
| 117 | Twisted Fate | +0.03 | 0.38 | 0.35 |  |
| 118 | Lucian | +0.03 | 0.31 | 0.28 |  |
| 119 | Miss Fortune | +0.02 | 0.30 | 0.28 |  |
| 120 | Ivern | +0.01 | 0.16 | 0.15 |  |
| 121 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 122 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 123 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 124 | Briar | 0.00 | 0.00 | 0.00 |  |
| 125 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 126 | Darius | 0.00 | 0.00 | 0.00 |  |
| 127 | Diana | 0.00 | 0.00 | 0.00 |  |
| 128 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 129 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 130 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 131 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 132 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 133 | Leona | 0.00 | 0.00 | 0.00 |  |
| 134 | Locke | 0.00 | 0.00 | 0.00 |  |
| 135 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 136 | Rell | 0.00 | 0.00 | 0.00 |  |
| 137 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 138 | Riven | 0.00 | 0.00 | 0.00 |  |
| 139 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 140 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 141 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 142 | Taric | 0.00 | 0.00 | 0.00 |  |
| 143 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 144 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 145 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 146 | Kayn | -0.03 | 0.42 | 0.45 |  |
| 147 | Jhin | -0.03 | 0.25 | 0.28 |  |
| 148 | Warwick | -0.05 | 0.65 | 0.70 |  |
| 149 | Vel'Koz | -0.05 | 0.23 | 0.28 |  |
| 150 | Shen | -0.06 | 0.39 | 0.45 |  |
| 151 | Janna | -0.06 | 0.34 | 0.40 |  |
| 152 | Xerath | -0.10 | 0.23 | 0.33 |  |
| 153 | Akali | -0.11 | 0.00 | 0.11 |  |
| 154 | Karthus | -0.12 | 0.16 | 0.28 |  |
| 155 | Akshan | -0.13 | 0.29 | 0.42 |  |
| 156 | Ryze | -0.13 | 0.22 | 0.35 |  |
| 157 | Talon | -0.14 | 0.00 | 0.14 |  |
| 158 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 159 | Zac | -0.19 | 0.31 | 0.50 |  |
| 160 | Viego | -0.19 | 0.17 | 0.36 |  |
| 161 | Gragas | -0.20 | 0.00 | 0.20 |  |
| 162 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 163 | Pantheon | -0.21 | 0.30 | 0.51 |  |
| 164 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 165 | Taliyah | -0.25 | 0.23 | 0.48 |  |
| 166 | Pyke | -0.29 | 0.00 | 0.29 |  |
| 167 | Fiddlesticks | -0.30 | 0.17 | 0.47 |  |
| 168 | Vi | -0.33 | 0.17 | 0.50 |  |
| 169 | Nunu & Willump | -0.36 | 0.13 | 0.49 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Galio | -0.59 | 0.00 | 0.59 |  |
