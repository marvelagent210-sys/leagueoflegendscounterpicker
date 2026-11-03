# Counters to Blitzcrank (patch 26.21)

Every champion ranked by what its kit does against Blitzcrank's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Blitzcrank's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Blitzcrank` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.97)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Blitzcrank's (500 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Sivir basic attacks → Blitzcrank basic attacks)
- **0.65** spell shield: Spell Shield's spell shield blocks Blitzcrank's Rocket Grab. Spell shield for 1.5 s, long enough to use ahead of Rocket Grab. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Blitzcrank Q Rocket Grab)
- **0.55** spell shield: Spell Shield's spell shield blocks Blitzcrank's Static Field. Spell shield for 1.5 s, long enough to use ahead of Static Field. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Blitzcrank R Static Field)

### 2. Morgana (net +1.38)

- **0.70** cc immunity: Black Shield makes Morgana immune to Blitzcrank's Rocket Grab (airborne, stun). Immune for 5 s, long enough to use ahead of Rocket Grab. (Morgana E Black Shield → Blitzcrank Q Rocket Grab)
- **0.41** cc immunity: Black Shield makes Morgana immune to Blitzcrank's Power Fist (airborne). Immune for 5 s, long enough to use ahead of Power Fist. (Morgana E Black Shield → Blitzcrank E Power Fist)
- **0.39** range: Morgana's basic attacks reach 325 units farther than Blitzcrank's (450 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Morgana basic attacks → Blitzcrank basic attacks)

### 3. Teemo (net +1.38)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Blitzcrank's (500 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Teemo basic attacks → Blitzcrank basic attacks)
- **0.47** blind: Blinding Dart's blind makes Blitzcrank's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Blitzcrank basic attacks)
- **0.46** blind: Blinding Dart's blind makes Blitzcrank's Power Fist, an empowered attack, miss. Blind for 3 s. {{{{{1<noinclude>|Ability data</noinclude>}}}|Power Fist|{{{2|}}}|{{{3|}}}|{{{4|}}}|{{{5|}}}
|champion     = Blitzcrank
|skill        = E
|icon         = Power Fist.png
|blurb        = {{sbc|Active:}} {{ci|Blitzcrank}} charges up a fist to make the next {{tip|basic damage|basic attack}} deal double damage and {{tip|airborne|knock up}} the target into the air.
|description  = {{sbc|Active:}} '''Blitzcrank''' empowers their next {{tip|basic attack}} within 5 seconds to have an {{tip|uncancellable windup}}, deal {{as|100% AD}} {{as|(+ 25% AP)}} {{as|'''bonus''' physical damage}} and {{tip|airborne|knock up}} the target for 1 second. This damage is affected by {{tip|critical strike}} modifiers.
|description3 = ''Power Fist {{tip|basic attack reset|resets}} '''Blitzcrank's''' basic attack timer.''
|cooldown     = {{ap|7 to 5}}
|cdstart      = post-effect
|cost         = 25
|costtype     = mana
|cast time    = none
|targeting    = Auto
|affects      = Enemy, Structure
|damagetype   = Physical
|spelleffects = Special
|spellshield  = true
|parry        = true
|notes = 
* ''Power Fist'' deals {{tip|basic damage}}, but also triggers spell effects by also being tagged as {{tip|spell damage}}.
** This includes the {{tip|basic attack}} itself.
<!--* The {{tip|airborne|knockup}} is not applied if the attack is {{tip|block|blocked}}, {{tip|dodge|dodged}} or {{tip|blind|missed}}.-->
* {{tip|Spell shield}} prevents the {{tip|airborne|knockup}} and the damage, including the damage of the basic attack itself.{{bug|2}}
* The enhanced attack will still complete and hit the target even if they become {{tip|untargetable}} during the {{tip|attack windup|attack's windup}}.<!--still true in 26.8-->
* The knockup does not trigger against {{tip|structures}}, [[jungle plants]], and {{tip|wards}}.
** The ''Power Fist'' buff does not get consumed if the knockup doesn't trigger, allowing '''Blitzcrank''' to repeatedly attack structures for bonus damage.{{bug|2}}
* The target is displaced a short distance during the {{tip|airborne|knockup}} in a random direction.
}}. (Teemo Q Blinding Dart → Blitzcrank E Power Fist)

### 4. Xayah (net +1.30)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Blitzcrank's (525 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Xayah basic attacks → Blitzcrank basic attacks)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Blitzcrank's Rocket Grab. Untargetable for 1.5 s, long enough to use ahead of Rocket Grab. (Xayah R Featherstorm → Blitzcrank Q Rocket Grab)
- **0.29** untargetable: Featherstorm makes Xayah untargetable, dodging Blitzcrank's Static Field. Untargetable for 1.5 s, long enough to use ahead of Static Field. (Xayah R Featherstorm → Blitzcrank R Static Field)

### 5. Bard (net +1.27)

- **0.72** range: Bard's basic attacks reach 375 units farther than Blitzcrank's (500 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Bard basic attacks → Blitzcrank basic attacks)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Blitzcrank's Rocket Grab. Untargetable for 2.5 s, long enough to use ahead of Rocket Grab. (Bard R Tempered Fate → Blitzcrank Q Rocket Grab)
- **0.30** untargetable: Tempered Fate makes Bard untargetable, dodging Blitzcrank's Static Field. Untargetable for 2.5 s, long enough to use ahead of Static Field. (Bard R Tempered Fate → Blitzcrank R Static Field)

### 6. Nocturne (net +1.26)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Blitzcrank's Rocket Grab. Spell shield for 1.5 s, long enough to use ahead of Rocket Grab. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Blitzcrank Q Rocket Grab)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Blitzcrank's Static Field. Spell shield for 1.5 s, long enough to use ahead of Static Field. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Blitzcrank R Static Field)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Blitzcrank's Power Fist. Spell shield for 1.5 s, long enough to use ahead of Power Fist. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Blitzcrank E Power Fist)

### 7. Samira (net +1.20)

- **0.61** range: Samira's basic attacks reach 375 units farther than Blitzcrank's (500 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Samira basic attacks → Blitzcrank basic attacks)
- **0.59** projectile block: Blade Whirl blocks Blitzcrank's Rocket Grab, a projectile. Blade Whirl for 0.75 s; Rocket Grab takes 0.87 s to land, enough to react. (Samira W Blade Whirl → Blitzcrank Q Rocket Grab)

### 8. Milio (net +1.18)

- **0.77** range: Milio's basic attacks reach 400 units farther than Blitzcrank's (525 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Milio basic attacks → Blitzcrank basic attacks)
- **0.27** cleanse: Breath of Life cleanses Blitzcrank's Rocket Grab (stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Blitzcrank Q Rocket Grab)
- **0.19** tenacity: Breath of Life's 65% tenacity shortens Blitzcrank's Rocket Grab (stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Blitzcrank Q Rocket Grab)

### 9. Fiora (net +1.17)

- **0.80** parry: Riposte parries Blitzcrank's Rocket Grab and stuns back. Parry for 0.75 s; Rocket Grab takes 0.87 s to land, enough to react. Negating Rocket Grab's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Blitzcrank Q Rocket Grab)
- **0.55** parry: Riposte parries Blitzcrank's Static Field. Parry for 0.75 s; Static Field takes 0.25 s to land, enough to react. (Fiora W Riposte → Blitzcrank R Static Field)
- **0.35** parry: Riposte parries Blitzcrank's Power Fist and stuns back. Parry for 0.75 s; Power Fist lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Power Fist's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Blitzcrank E Power Fist)

### 10. Vladimir (net +1.15)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Blitzcrank's Rocket Grab. Untargetable for 2 s, long enough to use ahead of Rocket Grab. (Vladimir W Sanguine Pool → Blitzcrank Q Rocket Grab)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Blitzcrank's Static Field. Untargetable for 2 s, long enough to use ahead of Static Field. (Vladimir W Sanguine Pool → Blitzcrank R Static Field)
- **0.36** range: Vladimir's basic attacks reach 325 units farther than Blitzcrank's (450 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Vladimir basic attacks → Blitzcrank basic attacks)
- Watch out: Power Fist's airborne interrupts Vladimir's Tides of Blood (charge-up).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.97 | 1.97 | 0.00 | range (attacks) |
| 2 | Morgana | +1.38 | 1.38 | 0.00 |  |
| 3 | Teemo | +1.38 | 1.38 | 0.00 | range (attacks), blind (Blinding Dart), blind (Blinding Dart) |
| 4 | Xayah | +1.30 | 1.30 | 0.00 | range (attacks) |
| 5 | Bard | +1.27 | 1.27 | 0.00 | range (attacks) |
| 6 | Nocturne | +1.26 | 1.26 | 0.00 |  |
| 7 | Samira | +1.20 | 1.20 | 0.00 | range (attacks), projectile block (Blade Whirl) |
| 8 | Milio | +1.18 | 1.18 | 0.00 | range (attacks) |
| 9 | Fiora | +1.17 | 1.17 | 0.00 |  |
| 10 | Vladimir | +1.15 | 1.39 | 0.24 |  |
| 11 | Aurora | +1.13 | 1.13 | 0.00 | range (attacks) |
| 12 | Udyr | +1.10 | 1.10 | 0.00 |  |
| 13 | Kalista | +1.07 | 1.07 | 0.00 | range (attacks) |
| 14 | Mel | +1.07 | 1.07 | 0.00 | projectile block (Rebuttal), range (attacks) |
| 15 | Lulu | +1.06 | 1.06 | 0.00 | range (attacks) |
| 16 | Fizz | +1.01 | 1.01 | 0.00 |  |
| 17 | Kayle | +1.01 | 1.01 | 0.00 | range (attacks) |
| 18 | Maokai | +1.01 | 1.01 | 0.00 |  |
| 19 | Lissandra | +0.99 | 0.99 | 0.00 |  |
| 20 | Gwen | +0.96 | 0.96 | 0.00 |  |
| 21 | Kindred | +0.94 | 0.94 | 0.00 | range (attacks) |
| 22 | Zeri | +0.88 | 0.88 | 0.00 | range (attacks) |
| 23 | Nilah | +0.86 | 0.86 | 0.00 |  |
| 24 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 25 | Vayne | +0.86 | 0.86 | 0.00 | range (attacks) |
| 26 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 27 | Rengar | +0.82 | 0.82 | 0.00 |  |
| 28 | Gangplank | +0.80 | 0.80 | 0.00 |  |
| 29 | Aphelios | +0.77 | 0.77 | 0.00 | range (attacks) |
| 30 | Jax | +0.77 | 0.77 | 0.00 | attack dodge (Counter Strike) |
| 31 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 32 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 33 | Kled | +0.73 | 0.73 | 0.00 |  |
| 34 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 35 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 36 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 37 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 38 | Vex | +0.71 | 0.71 | 0.00 | range (attacks) |
| 39 | Braum | +0.70 | 0.70 | 0.00 | projectile block (Unbreakable) |
| 40 | Yasuo | +0.68 | 0.68 | 0.00 | projectile block (Wind Wall) |
| 41 | Gnar | +0.66 | 0.66 | 0.00 | range (attacks) |
| 42 | Corki | +0.65 | 0.65 | 0.00 | range (attacks) |
| 43 | Elise | +0.65 | 0.65 | 0.00 | range (attacks) |
| 44 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 45 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 46 | Smolder | +0.65 | 0.65 | 0.00 | range (attacks) |
| 47 | Viktor | +0.65 | 0.65 | 0.00 | range (attacks) |
| 48 | Zilean | +0.65 | 0.65 | 0.00 | range (attacks) |
| 49 | Zoe | +0.65 | 0.65 | 0.00 | range (attacks) |
| 50 | Jayce | +0.61 | 0.61 | 0.00 | range (attacks) |
| 51 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 52 | Jinx | +0.58 | 0.58 | 0.00 | range (attacks) |
| 53 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 54 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 55 | Seraphine | +0.58 | 0.58 | 0.00 | range (attacks) |
| 56 | Rek'Sai | +0.57 | 0.57 | 0.00 |  |
| 57 | Olaf | +0.56 | 0.56 | 0.00 |  |
| 58 | Camille | +0.55 | 0.55 | 0.00 |  |
| 59 | Kog'Maw | +0.54 | 0.54 | 0.00 | range (attacks) |
| 60 | Azir | +0.53 | 0.53 | 0.00 | range (attacks) |
| 61 | Evelynn | +0.53 | 0.53 | 0.00 |  |
| 62 | Orianna | +0.53 | 0.53 | 0.00 | range (attacks) |
| 63 | Shaco | +0.53 | 0.53 | 0.00 |  |
| 64 | Soraka | +0.53 | 0.53 | 0.00 | range (attacks) |
| 65 | Ziggs | +0.53 | 0.53 | 0.00 | range (attacks) |
| 66 | Zed | +0.52 | 0.52 | 0.00 |  |
| 67 | Graves | +0.49 | 0.49 | 0.00 |  |
| 68 | Zaahen | +0.49 | 0.49 | 0.00 |  |
| 69 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 70 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 71 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 72 | Yuumi | +0.47 | 1.67 | 1.20 | range (attacks) |
| 73 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 74 | Alistar | +0.45 | 0.45 | 0.00 |  |
| 75 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 76 | Annie | +0.44 | 0.44 | 0.00 |  |
| 77 | Brand | +0.44 | 0.44 | 0.00 |  |
| 78 | Cassiopeia | +0.44 | 0.44 | 0.00 |  |
| 79 | Karma | +0.44 | 0.44 | 0.00 |  |
| 80 | LeBlanc | +0.44 | 0.44 | 0.00 |  |
| 81 | Nami | +0.44 | 0.44 | 0.00 |  |
| 82 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 83 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 84 | Malphite | +0.42 | 0.42 | 0.00 |  |
| 85 | Swain | +0.42 | 0.42 | 0.00 |  |
| 86 | Master Yi | +0.40 | 0.96 | 0.56 |  |
| 87 | Heimerdinger | +0.40 | 0.40 | 0.00 |  |
| 88 | Thresh | +0.39 | 0.39 | 0.00 |  |
| 89 | Nasus | +0.36 | 0.36 | 0.00 |  |
| 90 | K'Sante | +0.35 | 0.35 | 0.00 |  |
| 91 | Urgot | +0.30 | 0.30 | 0.00 |  |
| 92 | Xin Zhao | +0.28 | 0.28 | 0.00 |  |
| 93 | Rakan | +0.25 | 0.25 | 0.00 |  |
| 94 | Varus | +0.23 | 0.53 | 0.30 | range (attacks) |
| 95 | Garen | +0.22 | 0.22 | 0.00 |  |
| 96 | Lillia | +0.22 | 0.22 | 0.00 |  |
| 97 | Sion | +0.21 | 0.60 | 0.39 |  |
| 98 | Aurelion Sol | +0.20 | 0.44 | 0.24 |  |
| 99 | Quinn | +0.19 | 0.77 | 0.58 | range (attacks) |
| 100 | Hecarim | +0.19 | 0.19 | 0.00 |  |
| 101 | Illaoi | +0.18 | 0.18 | 0.00 |  |
| 102 | Jarvan IV | +0.18 | 0.18 | 0.00 |  |
| 103 | Ornn | +0.18 | 0.18 | 0.00 |  |
| 104 | Sett | +0.18 | 0.18 | 0.00 |  |
| 105 | Shyvana | +0.18 | 0.18 | 0.00 |  |
| 106 | Volibear | +0.18 | 0.18 | 0.00 |  |
| 107 | Yone | +0.18 | 0.18 | 0.00 |  |
| 108 | Irelia | +0.10 | 0.10 | 0.00 |  |
| 109 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 110 | Ivern | 0.00 | 0.38 | 0.38 |  |
| 111 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 112 | Akali | 0.00 | 0.00 | 0.00 |  |
| 113 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 114 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 115 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 116 | Briar | 0.00 | 0.00 | 0.00 |  |
| 117 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 118 | Darius | 0.00 | 0.00 | 0.00 |  |
| 119 | Diana | 0.00 | 0.00 | 0.00 |  |
| 120 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 121 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 122 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 123 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 124 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 125 | Leona | 0.00 | 0.00 | 0.00 |  |
| 126 | Locke | 0.00 | 0.00 | 0.00 |  |
| 127 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 128 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 129 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 130 | Rell | 0.00 | 0.00 | 0.00 |  |
| 131 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 132 | Riven | 0.00 | 0.00 | 0.00 |  |
| 133 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 134 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 135 | Singed | 0.00 | 0.00 | 0.00 |  |
| 136 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 137 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 138 | Talon | 0.00 | 0.00 | 0.00 |  |
| 139 | Taric | 0.00 | 0.00 | 0.00 |  |
| 140 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 141 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 142 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 143 | Caitlyn | -0.12 | 0.72 | 0.84 | range (attacks) |
| 144 | Lucian | -0.12 | 0.72 | 0.84 | range (attacks) |
| 145 | Akshan | -0.16 | 0.68 | 0.84 | range (attacks) |
| 146 | Twisted Fate | -0.19 | 0.86 | 1.05 | range (attacks) |
| 147 | Miss Fortune | -0.19 | 0.65 | 0.84 | range (attacks) |
| 148 | Malzahar | -0.22 | 0.98 | 1.20 |  |
| 149 | Viego | -0.22 | 0.37 | 0.59 |  |
| 150 | Jhin | -0.31 | 0.53 | 0.84 | range (attacks) |
| 151 | Vel'Koz | -0.31 | 0.53 | 0.84 | range (attacks) |
| 152 | Rammus | -0.41 | 0.36 | 0.77 |  |
| 153 | Pyke | -0.41 | 0.00 | 0.41 |  |
| 154 | Xerath | -0.43 | 0.53 | 0.96 | range (attacks) |
| 155 | Karthus | -0.45 | 0.39 | 0.84 |  |
| 156 | Janna | -0.48 | 0.72 | 1.20 | range (attacks) |
| 157 | Gragas | -0.48 | 0.00 | 0.48 |  |
| 158 | Ryze | -0.57 | 0.48 | 1.05 |  |
| 159 | Poppy | -0.60 | 0.00 | 0.60 |  |
| 160 | Shen | -0.61 | 0.74 | 1.35 | attack block (Spirit's Refuge) |
| 161 | Kayn | -0.82 | 0.53 | 1.35 |  |
| 162 | Katarina | -0.84 | 0.00 | 0.84 |  |
| 163 | Taliyah | -0.91 | 0.53 | 1.44 | range (attacks) |
| 164 | Vi | -0.92 | 0.18 | 1.10 |  |
| 165 | Fiddlesticks | -0.93 | 0.39 | 1.32 |  |
| 166 | Pantheon | -0.96 | 0.52 | 1.48 |  |
| 167 | Zac | -1.21 | 0.00 | 1.21 |  |
| 168 | Warwick | -1.24 | 0.70 | 1.94 |  |
| 169 | Naafiri | -1.35 | 0.00 | 1.35 |  |
| 170 | Nunu & Willump | -1.38 | 0.00 | 1.38 |  |
| 171 | Tahm Kench | -1.46 | 0.00 | 1.46 |  |
| 172 | Galio | -1.74 | 0.00 | 1.74 |  |
