# Counters to Aatrox (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 44 other champions with a simulator kit against Aatrox: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Aatrox wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Aatrox --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.89 | +1.00 | +1.00 | +1.00 | +0.70 | +0.81 | +0.00 |
| 2 | Teemo | +0.88 | +1.00 | +1.00 | +1.00 | +0.50 | +1.00 | +0.00 |
| 3 | K'Sante | +0.87 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +1.00 |
| 4 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.13 | – | +1.00 |
| 5 | Zaahen | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.00 |
| 6 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 7 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 8 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 9 | Jax | +0.56 | +1.00 | +1.00 | +0.00 | +0.04 | – | +0.00 |
| 10 | Kled | +0.56 | +1.00 | +1.00 | +0.00 | +0.01 | – | +0.00 |
| 11 | Quinn | +0.45 | +0.44 | +0.44 | +1.00 | +0.34 | −0.27 | +0.00 |
| 12 | Aurora | −0.05 | −0.44 | −1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 13 | Olaf | −0.22 | −0.54 | −1.00 | +1.00 | −0.06 | – | +0.00 |
| 14 | Fiora | −0.25 | −1.00 | −1.00 | +1.00 | +0.17 | – | +1.00 |
| 15 | Kennen | −0.29 | −0.94 | −0.59 | +0.00 | +0.02 | +0.96 | +0.00 |
| 16 | Rumble | −0.35 | −1.00 | −1.00 | +0.99 | −0.08 | – | +0.00 |
| 17 | Singed | −0.35 | −0.26 | −0.23 | −0.90 | −0.09 | – | +0.00 |
| 18 | Camille | −0.67 | −1.00 | −1.00 | −1.00 | +0.34 | – | +1.00 |
| 19 | Riven | −0.73 | −1.00 | −1.00 | −1.00 | +0.26 | – | +0.00 |
| 20 | Yone | −0.74 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.49 |
| 21 | Irelia | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 22 | Malphite | −0.75 | −1.00 | −1.00 | −1.00 | +0.16 | – | +0.00 |
| 23 | Sion | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 24 | Gwen | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 25 | Ambessa | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 26 | Yasuo | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 27 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 28 | Pantheon | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 29 | Gnar | −0.77 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | +0.00 |
| 30 | Renekton | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 31 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 32 | Garen | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 33 | Jayce | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 34 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 35 | Udyr | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.05 |
| 36 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 37 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 38 | Nasus | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 39 | Mordekaiser | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 40 | Cho'Gath | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 41 | Tahm Kench | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 42 | Volibear | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 43 | Dr. Mundo | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 44 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |

## Interaction ledger (partial confidence)

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

#### 4. Elise (net +0.90)

- **0.42** untargetable: Rappel makes Elise untargetable, dodging Aatrox's The Darkin Blade. Untargetable for 0.6 s; The Darkin Blade takes 0.6 s to land, enough to react. (Elise E Rappel → Aatrox Q The Darkin Blade)
- **0.36** untargetable: Rappel makes Elise untargetable, dodging Aatrox's Infernal Chains. Untargetable for 0.6 s; Infernal Chains takes 0.71 s to land, enough to react. (Elise E Rappel → Aatrox W Infernal Chains)
- **0.30** range: Elise's basic attacks reach 375 units farther than Aatrox's (550 vs 175 attack range). Aatrox closes the gap with Umbral Dash. (Elise basic attacks → Aatrox basic attacks)

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
| 4 | Elise | +0.90 | 0.90 | 0.00 |  |
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
| 19 | Kindred | +0.61 | 0.61 | 0.00 |  |
| 20 | Gwen | +0.60 | 0.60 | 0.00 |  |
| 21 | Cassiopeia | +0.59 | 0.59 | 0.00 |  |
| 22 | Samira | +0.59 | 0.59 | 0.00 |  |
| 23 | Aurora | +0.58 | 0.73 | 0.15 |  |
| 24 | Kayle | +0.58 | 0.58 | 0.00 |  |
| 25 | Mel | +0.55 | 0.55 | 0.00 |  |
| 26 | Gangplank | +0.54 | 0.54 | 0.00 |  |
| 27 | Jinx | +0.53 | 0.53 | 0.00 |  |
| 28 | Viktor | +0.53 | 0.53 | 0.00 |  |
| 29 | Hwei | +0.49 | 0.49 | 0.00 |  |
| 30 | Kled | +0.49 | 0.49 | 0.00 |  |
| 31 | Rengar | +0.47 | 0.61 | 0.14 |  |
| 32 | Ahri | +0.47 | 0.47 | 0.00 |  |
| 33 | Veigar | +0.47 | 0.47 | 0.00 |  |
| 34 | Camille | +0.46 | 0.46 | 0.00 |  |
| 35 | Rek'Sai | +0.46 | 0.46 | 0.00 |  |
| 36 | Braum | +0.45 | 0.45 | 0.00 | projectile block (Unbreakable) |
| 37 | Corki | +0.45 | 0.45 | 0.00 |  |
| 38 | Ekko | +0.45 | 0.45 | 0.00 |  |
| 39 | Master Yi | +0.44 | 0.67 | 0.23 |  |
| 40 | Malzahar | +0.43 | 0.83 | 0.40 |  |
| 41 | Malphite | +0.42 | 0.42 | 0.00 |  |
| 42 | Olaf | +0.42 | 0.42 | 0.00 |  |
| 43 | Zaahen | +0.42 | 0.42 | 0.00 |  |
| 44 | Zed | +0.42 | 0.42 | 0.00 |  |
| 45 | Aphelios | +0.41 | 0.41 | 0.00 |  |
| 46 | Jax | +0.41 | 0.41 | 0.00 | attack dodge (Counter Strike) |
| 47 | Zeri | +0.41 | 0.41 | 0.00 |  |
| 48 | Milio | +0.40 | 0.40 | 0.00 |  |
| 49 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 50 | Sona | +0.39 | 0.39 | 0.00 |  |
| 51 | Yasuo | +0.37 | 0.37 | 0.00 |  |
| 52 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 53 | Renata Glasc | +0.36 | 0.36 | 0.00 |  |
| 54 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 55 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 56 | Nilah | +0.35 | 0.35 | 0.00 |  |
| 57 | Yone | +0.35 | 0.35 | 0.00 |  |
| 58 | Evelynn | +0.34 | 0.42 | 0.08 |  |
| 59 | Alistar | +0.34 | 0.34 | 0.00 |  |
| 60 | Draven | +0.34 | 0.34 | 0.00 |  |
| 61 | K'Sante | +0.33 | 0.33 | 0.00 |  |
| 62 | Poppy | +0.30 | 0.50 | 0.20 | dash stop (Steadfast Presence) |
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
| 75 | Warwick | +0.25 | 0.65 | 0.40 |  |
| 76 | Seraphine | +0.25 | 0.25 | 0.00 |  |
| 77 | Soraka | +0.25 | 0.25 | 0.00 |  |
| 78 | Ziggs | +0.25 | 0.25 | 0.00 |  |
| 79 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 80 | Heimerdinger | +0.24 | 0.24 | 0.00 |  |
| 81 | Kog'Maw | +0.24 | 0.24 | 0.00 |  |
| 82 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 83 | Kai'Sa | +0.23 | 0.34 | 0.11 |  |
| 84 | Azir | +0.23 | 0.23 | 0.00 |  |
| 85 | Orianna | +0.23 | 0.23 | 0.00 |  |
| 86 | Shaco | +0.22 | 0.42 | 0.20 |  |
| 87 | Annie | +0.22 | 0.22 | 0.00 |  |
| 88 | Senna | +0.21 | 0.32 | 0.11 |  |
| 89 | Brand | +0.21 | 0.21 | 0.00 |  |
| 90 | Nami | +0.21 | 0.21 | 0.00 |  |
| 91 | Syndra | +0.21 | 0.21 | 0.00 |  |
| 92 | Xin Zhao | +0.21 | 0.21 | 0.00 |  |
| 93 | Graves | +0.20 | 0.20 | 0.00 |  |
| 94 | Taric | +0.20 | 0.20 | 0.00 |  |
| 95 | Pantheon | +0.19 | 0.30 | 0.11 |  |
| 96 | Karma | +0.19 | 0.19 | 0.00 |  |
| 97 | Katarina | +0.18 | 0.46 | 0.28 |  |
| 98 | Hecarim | +0.18 | 0.18 | 0.00 |  |
| 99 | Swain | +0.18 | 0.18 | 0.00 |  |
| 100 | Amumu | +0.17 | 0.17 | 0.00 |  |
| 101 | Illaoi | +0.17 | 0.17 | 0.00 |  |
| 102 | Jarvan IV | +0.17 | 0.17 | 0.00 |  |
| 103 | Ornn | +0.17 | 0.17 | 0.00 |  |
| 104 | Sett | +0.17 | 0.17 | 0.00 |  |
| 105 | Shyvana | +0.17 | 0.17 | 0.00 |  |
| 106 | Volibear | +0.17 | 0.17 | 0.00 |  |
| 107 | Thresh | +0.16 | 0.16 | 0.00 |  |
| 108 | Garen | +0.12 | 0.12 | 0.00 |  |
| 109 | Urgot | +0.12 | 0.12 | 0.00 |  |
| 110 | Quinn | +0.11 | 0.34 | 0.23 |  |
| 111 | Aurelion Sol | +0.11 | 0.21 | 0.10 |  |
| 112 | LeBlanc | +0.11 | 0.19 | 0.08 |  |
| 113 | Neeko | +0.10 | 0.21 | 0.11 |  |
| 114 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 115 | Rakan | +0.09 | 0.09 | 0.00 |  |
| 116 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 117 | Lillia | +0.08 | 0.08 | 0.00 |  |
| 118 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 119 | Rammus | +0.03 | 0.38 | 0.35 |  |
| 120 | Twisted Fate | +0.03 | 0.38 | 0.35 |  |
| 121 | Lucian | +0.03 | 0.31 | 0.28 |  |
| 122 | Miss Fortune | +0.02 | 0.30 | 0.28 |  |
| 123 | Ivern | +0.01 | 0.16 | 0.15 |  |
| 124 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 125 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 126 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 127 | Briar | 0.00 | 0.00 | 0.00 |  |
| 128 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 129 | Darius | 0.00 | 0.00 | 0.00 |  |
| 130 | Diana | 0.00 | 0.00 | 0.00 |  |
| 131 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 132 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 133 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 134 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 135 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 136 | Leona | 0.00 | 0.00 | 0.00 |  |
| 137 | Locke | 0.00 | 0.00 | 0.00 |  |
| 138 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 139 | Rell | 0.00 | 0.00 | 0.00 |  |
| 140 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 141 | Riven | 0.00 | 0.00 | 0.00 |  |
| 142 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 143 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 144 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 145 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 146 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 147 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 148 | Kayn | -0.03 | 0.42 | 0.45 |  |
| 149 | Jhin | -0.03 | 0.25 | 0.28 |  |
| 150 | Vel'Koz | -0.05 | 0.23 | 0.28 |  |
| 151 | Shen | -0.06 | 0.39 | 0.45 |  |
| 152 | Janna | -0.06 | 0.34 | 0.40 |  |
| 153 | Xerath | -0.10 | 0.23 | 0.33 |  |
| 154 | Akali | -0.11 | 0.00 | 0.11 |  |
| 155 | Karthus | -0.12 | 0.16 | 0.28 |  |
| 156 | Akshan | -0.13 | 0.29 | 0.42 |  |
| 157 | Ryze | -0.13 | 0.22 | 0.35 |  |
| 158 | Talon | -0.14 | 0.00 | 0.14 |  |
| 159 | Galio | -0.18 | 0.00 | 0.18 |  |
| 160 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 161 | Zac | -0.19 | 0.31 | 0.50 |  |
| 162 | Viego | -0.19 | 0.17 | 0.36 |  |
| 163 | Gragas | -0.20 | 0.00 | 0.20 |  |
| 164 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 165 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 166 | Taliyah | -0.25 | 0.23 | 0.48 |  |
| 167 | Pyke | -0.29 | 0.00 | 0.29 |  |
| 168 | Fiddlesticks | -0.30 | 0.17 | 0.47 |  |
| 169 | Vi | -0.33 | 0.17 | 0.50 |  |
| 170 | Nunu & Willump | -0.36 | 0.13 | 0.49 |  |
| 171 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 172 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
