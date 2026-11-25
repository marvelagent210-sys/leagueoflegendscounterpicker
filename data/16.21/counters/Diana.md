# Counters to Diana (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Diana: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Diana wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Diana --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.87 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.81 |
| 2 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.40 |
| 3 | Master Yi | +0.82 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.87 |
| 4 | Bel'Veth | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.34 |
| 5 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.63 |
| 6 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.28 |
| 7 | Udyr | +0.81 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.52 |
| 8 | Fiora | +0.81 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.93 |
| 9 | Kog'Maw | +0.80 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.27 |
| 10 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.68 |
| 11 | Zeri | +0.80 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.23 |
| 12 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.22 |
| 13 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.64 |
| 14 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.23 |
| 15 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.14 |
| 16 | Xayah | +0.79 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.05 |
| 17 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.24 |
| 18 | Shyvana | +0.78 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.27 |
| 19 | Ashe | +0.78 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.17 |
| 20 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.40 |
| 21 | Twisted Fate | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | −0.07 |
| 22 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.31 |
| 23 | Kalista | +0.78 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | −0.29 |
| 24 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.19 |
| 25 | Corki | +0.77 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | −0.20 |
| 26 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.24 |
| 27 | Olaf | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | – | +0.54 |
| 28 | Zac | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.07 |
| 29 | Warwick | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.13 |
| 30 | Sivir | +0.77 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | −0.14 |
| 31 | Kled | +0.77 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.16 |
| 32 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.11 | +0.86 | −0.07 |
| 33 | Renekton | +0.76 | +1.00 | +1.00 | +1.00 | −0.06 | – | −0.07 |
| 34 | Xin Zhao | +0.76 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.22 |
| 35 | Viego | +0.76 | +1.00 | +1.00 | +1.00 | −0.06 | – | −0.12 |
| 36 | Maokai | +0.76 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.14 |
| 37 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.16 |
| 38 | Darius | +0.75 | +1.00 | +1.00 | +1.00 | −0.11 | – | −0.18 |
| 39 | Zaahen | +0.75 | +1.00 | +1.00 | +1.00 | −0.11 | – | −0.21 |
| 40 | Aatrox | +0.74 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.40 |
| 41 | Gnar | +0.74 | +0.86 | +0.94 | +1.00 | −0.11 | +1.00 | +0.11 |
| 42 | Illaoi | +0.73 | +1.00 | +0.94 | +1.00 | −0.14 | – | −0.12 |
| 43 | Karma | +0.68 | +0.63 | +0.98 | +0.98 | −0.10 | +0.99 | −0.01 |
| 44 | Lulu | +0.60 | +1.00 | +1.00 | +1.00 | +0.01 | −1.00 | −0.10 |
| 45 | Quinn | +0.56 | +1.00 | +1.00 | +1.00 | −0.09 | −1.00 | −0.46 |
| 46 | Varus | +0.29 | −1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.12 |
| 47 | Aurora | +0.28 | −1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.18 |
| 48 | Taric | +0.26 | +0.35 | +0.35 | +0.32 | −0.02 | – | +0.03 |
| 49 | Lillia | +0.22 | +0.47 | +0.01 | +0.01 | −0.06 | +0.93 | +0.28 |
| 50 | Garen | +0.22 | −1.00 | +1.00 | +1.00 | −0.01 | – | −0.03 |
| 51 | Wukong | +0.17 | −1.00 | +1.00 | +1.00 | −0.14 | – | −0.55 |
| 52 | Neeko | +0.12 | +0.90 | +0.04 | +0.01 | −0.13 | −1.00 | −0.09 |
| 53 | Ezreal | +0.08 | −1.00 | +0.58 | +0.58 | −0.15 | +0.98 | −0.13 |
| 54 | Tahm Kench | +0.04 | +0.09 | +0.07 | +0.07 | −0.09 | – | −0.00 |
| 55 | Singed | +0.03 | +0.06 | +0.06 | +0.07 | −0.09 | – | −0.08 |
| 56 | Yone | +0.02 | +1.00 | −0.51 | −0.51 | −0.09 | – | +0.23 |
| 57 | Morgana | +0.02 | +0.01 | +0.06 | +0.06 | −0.14 | +0.00 | +0.20 |
| 58 | Sion | −0.01 | +0.00 | +0.00 | +0.00 | −0.13 | – | +0.28 |
| 59 | Hwei | −0.10 | −0.13 | −0.11 | −0.11 | −0.09 | −0.12 | +0.13 |
| 60 | Soraka | −0.12 | −0.21 | −0.09 | −0.05 | −0.03 | −0.20 | −0.23 |
| 61 | Bard | −0.16 | +0.93 | −1.00 | −1.00 | −0.17 | +0.83 | +0.06 |
| 62 | Swain | −0.17 | −0.23 | −0.17 | −0.17 | −0.08 | −0.23 | −0.01 |
| 63 | Nami | −0.21 | −0.33 | −0.17 | −0.20 | −0.07 | −0.28 | −0.07 |
| 64 | Anivia | −0.24 | −0.29 | −0.27 | −0.27 | −0.15 | −0.14 | −0.06 |
| 65 | Vi | −0.24 | +1.00 | −1.00 | −1.00 | −0.11 | – | +0.01 |
| 66 | Malphite | −0.25 | −0.08 | −0.09 | −1.00 | +0.00 | – | +0.25 |
| 67 | Graves | −0.31 | +1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.37 |
| 68 | Jinx | −0.37 | −1.00 | −0.01 | −0.01 | −0.12 | −1.00 | −0.01 |
| 69 | Orianna | −0.41 | −1.00 | −1.00 | +1.00 | −0.09 | −1.00 | +0.14 |
| 70 | Heimerdinger | −0.42 | −0.37 | −0.10 | −1.00 | −0.07 | −1.00 | +0.28 |
| 71 | Lux | −0.45 | −0.22 | −0.60 | −0.60 | −0.15 | −1.00 | −0.05 |
| 72 | Lissandra | −0.46 | −0.24 | −1.00 | −0.20 | −0.10 | −1.00 | +0.05 |
| 73 | Shen | −0.51 | −0.48 | −1.00 | −0.49 | +0.03 | – | +0.11 |
| 74 | Rammus | −0.52 | +0.00 | −1.00 | −1.00 | −0.19 | – | +0.12 |
| 75 | Zyra | −0.53 | −1.00 | −0.37 | −0.35 | −0.12 | −1.00 | +0.09 |
| 76 | Cho'Gath | −0.53 | +0.00 | −1.00 | −1.00 | −0.09 | – | −0.26 |
| 77 | Jayce | −0.56 | −1.00 | −1.00 | +0.00 | +0.01 | – | −0.06 |
| 78 | Vel'Koz | −0.59 | −0.14 | −1.00 | −1.00 | −0.10 | −1.00 | +0.23 |
| 79 | Brand | −0.59 | −0.11 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 80 | Syndra | −0.60 | −0.13 | −1.00 | −1.00 | −0.07 | −1.00 | −0.21 |
| 81 | Kayle | −0.62 | −1.00 | −1.00 | −1.00 | −0.15 | +1.00 | +0.04 |
| 82 | Zilean | −0.63 | −1.00 | −1.00 | −1.00 | −0.12 | +1.00 | −0.14 |
| 83 | Kai'Sa | −0.63 | −1.00 | −1.00 | −1.00 | −0.13 | +0.97 | −0.15 |
| 84 | Rakan | −0.69 | −1.00 | −1.00 | −1.00 | −0.03 | +0.00 | +0.31 |
| 85 | Rengar | −0.72 | −1.00 | −1.00 | −1.00 | +0.34 | – | +0.06 |
| 86 | Nilah | −0.72 | −1.00 | −1.00 | −1.00 | +0.32 | – | +0.10 |
| 87 | Smolder | −0.72 | −1.00 | −1.00 | −1.00 | −0.10 | +0.00 | −0.20 |
| 88 | Gangplank | −0.75 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.49 |
| 89 | Jarvan IV | −0.75 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.51 |
| 90 | Ambessa | −0.76 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.29 |
| 91 | Annie | −0.76 | −1.00 | −1.00 | −1.00 | −0.03 | −0.53 | −0.03 |
| 92 | Sett | −0.76 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.09 |
| 93 | Camille | −0.76 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.43 |
| 94 | Ornn | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.13 |
| 95 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.07 |
| 96 | Zed | −0.77 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.36 |
| 97 | Aurelion Sol | −0.77 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −0.12 |
| 98 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.23 |
| 99 | Kha'Zix | −0.77 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.46 |
| 100 | Sylas | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 101 | Riven | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.09 |
| 102 | Lee Sin | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.09 |
| 103 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.10 |
| 104 | Sejuani | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.12 |
| 105 | Alistar | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.11 |
| 106 | Rek'Sai | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | −0.03 |
| 107 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.25 |
| 108 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.06 |
| 109 | Braum | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.09 |
| 110 | Fizz | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.07 |
| 111 | Kayn | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.04 |
| 112 | Nocturne | −0.79 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.24 |
| 113 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.05 |
| 114 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.02 |
| 115 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.03 |
| 116 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.49 |
| 117 | Irelia | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.03 |
| 118 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.04 |
| 119 | Gragas | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.15 |
| 120 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.13 |
| 121 | Briar | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.21 |
| 122 | Rumble | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.10 |
| 123 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.10 |
| 124 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.18 |
| 125 | Cassiopeia | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.11 |
| 126 | Ahri | −0.80 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.24 |
| 127 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.14 |
| 128 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.27 |
| 129 | Vex | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.16 |
| 130 | Ekko | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.12 |
| 131 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.02 |
| 132 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.12 |
| 133 | Evelynn | −0.81 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.15 |
| 134 | Shaco | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.21 |
| 135 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.23 |
| 136 | Ziggs | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.04 |
| 137 | Malzahar | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.04 |
| 138 | Azir | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.09 |
| 139 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.05 |
| 140 | Sona | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.03 |
| 141 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.08 |
| 142 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | −0.12 |
| 143 | Akshan | −0.82 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.05 |
| 144 | Mel | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.13 |
| 145 | Veigar | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.02 |
| 146 | Kennen | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.01 |
| 147 | Blitzcrank | −0.82 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.09 |
| 148 | Karthus | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.06 |
| 149 | Zoe | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.07 |
| 150 | Draven | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.04 |
| 151 | Elise | −0.82 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.19 |
| 152 | Viktor | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.02 |
| 153 | Taliyah | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.12 |
| 154 | Janna | −0.82 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.22 |
| 155 | Milio | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.09 |
| 156 | Miss Fortune | −0.83 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.09 |
| 157 | Seraphine | −0.83 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.13 |
| 158 | Jhin | −0.83 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.15 |
| 159 | Senna | −0.83 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.22 |
| 160 | Tristana | −0.83 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.25 |
| 161 | Kindred | −0.83 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.16 |
| 162 | Twitch | −0.83 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.09 |
| 163 | Caitlyn | −0.83 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.16 |
| 164 | Nidalee | −0.83 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.17 |
| 165 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.17 |
| 166 | Fiddlesticks | −0.84 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.27 |
| 167 | Yunara | −0.84 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.22 |
| 168 | Ryze | −0.84 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.41 |
| 169 | Yuumi | −0.85 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.49 |
| 170 | Pyke | −0.85 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.39 |
| 171 | Thresh | −0.85 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | −0.36 |
| 172 | Renata Glasc | −0.86 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.60 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Diana's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Diana's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Diana` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.33)

- **0.69** spell shield: Spell Shield's spell shield blocks Diana's Lunar Rush. Spell shield for 1.5 s, long enough to use ahead of Lunar Rush. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Diana E Lunar Rush)
- **0.44** range: Sivir's basic attacks reach 350 units farther than Diana's (500 vs 150 attack range). Diana closes the gap with Lunar Rush. (Sivir basic attacks → Diana basic attacks)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Diana's Moonfall. Spell shield for 1.5 s, long enough to use ahead of Moonfall. A spell shield blocks only the first enemy ability that reaches it. The beam of moonlight does not crash down if champions hit blocked the initial effect with spell shield.
  - Enemy champions protected by spell shield do not count towards the damage increase. (Sivir E Spell Shield → Diana R Moonfall)

#### 2. Bard (net +1.24)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Diana's Moonfall. Untargetable for 2.5 s, long enough to use ahead of Moonfall. (Bard R Tempered Fate → Diana R Moonfall)
- **0.34** range: Bard's basic attacks reach 350 units farther than Diana's (500 vs 150 attack range). Diana closes the gap with Lunar Rush. (Bard basic attacks → Diana basic attacks)
- **0.20** untargetable: Tempered Fate can deny the initial targeting of Diana's Lunar Rush, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Lunar Rush will still deal damage even if the target is untargetable by the end of the dash. (Bard R Tempered Fate → Diana E Lunar Rush)

#### 3. Lissandra (net +1.17)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Diana's Moonfall. Untargetable for 2.5 s, long enough to use ahead of Moonfall. (Lissandra R Frozen Tomb → Diana R Moonfall)
- **0.22** range: Lissandra's basic attacks reach 400 units farther than Diana's (550 vs 150 attack range). Diana closes the gap with Lunar Rush. (Lissandra basic attacks → Diana basic attacks)
- **0.20** dash stop: Frozen Tomb's knockdown can stop Diana's Lunar Rush mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Diana E Lunar Rush)

#### 4. Xayah (net +1.15)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Diana's Moonfall. Untargetable for 1.5 s, long enough to use ahead of Moonfall. (Xayah R Featherstorm → Diana R Moonfall)
- **0.36** range: Xayah's basic attacks reach 375 units farther than Diana's (525 vs 150 attack range). Diana closes the gap with Lunar Rush. (Xayah basic attacks → Diana basic attacks)
- **0.19** untargetable: Featherstorm can deny the initial targeting of Diana's Lunar Rush, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Lunar Rush will still deal damage even if the target is untargetable by the end of the dash. (Xayah R Featherstorm → Diana E Lunar Rush)

#### 5. Fiora (net +1.14)

- **0.90** parry: Riposte parries Diana's Moonfall and stuns back. Parry for 0.75 s; Moonfall takes 0.25 s to land, enough to react. Negating Moonfall's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Diana R Moonfall)
- **0.44** parry: Riposte parries Diana's Lunar Rush. Parry for 0.75 s; Lunar Rush lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Diana E Lunar Rush)
- **0.06** attack speed slow: Riposte cuts Diana's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Diana basic attacks)

#### 6. Vladimir (net +1.10)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Diana's Moonfall. Untargetable for 2 s, long enough to use ahead of Moonfall. (Vladimir W Sanguine Pool → Diana R Moonfall)
- **0.37** untargetable: Sanguine Pool can deny the initial targeting of Diana's Lunar Rush, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Lunar Rush will still deal damage even if the target is untargetable by the end of the dash. (Vladimir W Sanguine Pool → Diana E Lunar Rush)
- **0.16** range: Vladimir's basic attacks reach 300 units farther than Diana's (450 vs 150 attack range). Diana closes the gap with Lunar Rush. (Vladimir basic attacks → Diana basic attacks)
- Watch out: Moonfall's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 7. Nocturne (net +1.08)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Diana's Lunar Rush. Spell shield for 1.5 s, long enough to use ahead of Lunar Rush. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Diana E Lunar Rush)
- **0.40** spell shield: Shroud of Darkness's spell shield blocks part of Diana's Moonfall. Spell shield for 1.5 s, long enough to use ahead of Moonfall. A spell shield blocks only the first enemy ability that reaches it. The beam of moonlight does not crash down if champions hit blocked the initial effect with spell shield.
  - Enemy champions protected by spell shield do not count towards the damage increase. (Nocturne W Shroud of Darkness → Diana R Moonfall)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Diana's Moonfall (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Diana R Moonfall)

#### 8. Aurora (net +1.07)

- **0.70** untargetable: Between Worlds makes Aurora untargetable, dodging Diana's Moonfall. Untargetable for 0.4 s; Moonfall takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Diana R Moonfall)
- **0.29** range: Aurora's basic attacks reach 400 units farther than Diana's (550 vs 150 attack range). Diana closes the gap with Lunar Rush. (Aurora basic attacks → Diana basic attacks)
- **0.12** untargetable: Between Worlds can deny the initial targeting of Diana's Lunar Rush, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Does not destroy inbound projectiles. Lunar Rush will still deal damage even if the target is untargetable by the end of the dash. (Aurora R Between Worlds → Diana E Lunar Rush)

#### 9. Master Yi (net +0.99)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Diana's Moonfall. Untargetable for ?; Moonfall takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Diana R Moonfall)
- **0.21** untargetable: Alpha Strike can deny the initial targeting of Diana's Lunar Rush, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Lunar Rush will still deal damage even if the target is untargetable by the end of the dash. (Master Yi Q Alpha Strike → Diana E Lunar Rush)
- **0.15** cleanse: Highlander cleanses Diana's Moonfall (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Master Yi R Highlander → Diana R Moonfall)
- Watch out: Moonfall's airborne interrupts Master Yi's Meditate (normal channel).

#### 10. Morgana (net +0.98)

- **0.80** cc immunity: Black Shield makes Morgana immune to Diana's Moonfall (airborne, slow). Immune for 5 s, long enough to use ahead of Moonfall. (Morgana E Black Shield → Diana R Moonfall)
- **0.18** range: Morgana's basic attacks reach 300 units farther than Diana's (450 vs 150 attack range). Diana closes the gap with Lunar Rush. (Morgana basic attacks → Diana basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.33 | 1.33 | 0.00 |  |
| 2 | Bard | +1.24 | 1.24 | 0.00 |  |
| 3 | Lissandra | +1.17 | 1.17 | 0.00 |  |
| 4 | Xayah | +1.15 | 1.15 | 0.00 |  |
| 5 | Fiora | +1.14 | 1.14 | 0.00 |  |
| 6 | Vladimir | +1.10 | 1.15 | 0.05 |  |
| 7 | Nocturne | +1.08 | 1.08 | 0.00 |  |
| 8 | Aurora | +1.07 | 1.07 | 0.00 |  |
| 9 | Master Yi | +0.99 | 1.10 | 0.11 |  |
| 10 | Morgana | +0.98 | 0.98 | 0.00 |  |
| 11 | Kayle | +0.96 | 0.96 | 0.00 |  |
| 12 | Fizz | +0.92 | 0.92 | 0.00 |  |
| 13 | Maokai | +0.92 | 0.92 | 0.00 |  |
| 14 | Rek'Sai | +0.92 | 0.92 | 0.00 |  |
| 15 | Gwen | +0.91 | 0.91 | 0.00 |  |
| 16 | Evelynn | +0.86 | 0.86 | 0.00 |  |
| 17 | Shaco | +0.86 | 0.86 | 0.00 |  |
| 18 | Yuumi | +0.84 | 1.22 | 0.38 |  |
| 19 | Camille | +0.83 | 0.83 | 0.00 |  |
| 20 | Kalista | +0.81 | 0.81 | 0.00 |  |
| 21 | Olaf | +0.80 | 0.80 | 0.00 |  |
| 22 | Udyr | +0.80 | 0.80 | 0.00 |  |
| 23 | Zaahen | +0.80 | 0.80 | 0.00 |  |
| 24 | Kled | +0.77 | 0.77 | 0.00 |  |
| 25 | Zed | +0.76 | 0.76 | 0.00 |  |
| 26 | Sion | +0.72 | 0.80 | 0.08 |  |
| 27 | Vex | +0.72 | 0.72 | 0.00 |  |
| 28 | Viktor | +0.70 | 0.70 | 0.00 | dash stop (Gravity Field) |
| 29 | Jinx | +0.67 | 0.67 | 0.00 | dash stop (Flame Chompers!) |
| 30 | Teemo | +0.67 | 0.67 | 0.00 |  |
| 31 | Alistar | +0.64 | 0.64 | 0.00 |  |
| 32 | Braum | +0.64 | 0.64 | 0.00 | projectile block (Unbreakable) |
| 33 | Gangplank | +0.64 | 0.64 | 0.00 |  |
| 34 | Rengar | +0.64 | 0.64 | 0.00 |  |
| 35 | Veigar | +0.64 | 0.64 | 0.00 | dash stop (Event Horizon) |
| 36 | Hwei | +0.63 | 0.63 | 0.00 | dash stop (Grim Visage) |
| 37 | Ahri | +0.62 | 0.62 | 0.00 | dash stop (Charm) |
| 38 | Samira | +0.62 | 0.62 | 0.00 |  |
| 39 | Lulu | +0.61 | 0.61 | 0.00 |  |
| 40 | Cassiopeia | +0.60 | 0.60 | 0.00 |  |
| 41 | Mel | +0.59 | 0.59 | 0.00 |  |
| 42 | Xin Zhao | +0.56 | 0.56 | 0.00 |  |
| 43 | Milio | +0.51 | 0.51 | 0.00 |  |
| 44 | Aphelios | +0.46 | 0.46 | 0.00 |  |
| 45 | Yasuo | +0.46 | 0.46 | 0.00 |  |
| 46 | Warwick | +0.44 | 0.99 | 0.55 |  |
| 47 | Kindred | +0.44 | 0.44 | 0.00 |  |
| 48 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 49 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 50 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 51 | Pantheon | +0.41 | 0.89 | 0.48 |  |
| 52 | Kayn | +0.41 | 0.86 | 0.45 |  |
| 53 | Sona | +0.41 | 0.41 | 0.00 |  |
| 54 | Malzahar | +0.39 | 0.79 | 0.40 |  |
| 55 | Singed | +0.39 | 0.39 | 0.00 |  |
| 56 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 57 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 58 | Draven | +0.36 | 0.36 | 0.00 |  |
| 59 | Kai'Sa | +0.36 | 0.36 | 0.00 |  |
| 60 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 61 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 62 | Nilah | +0.34 | 0.34 | 0.00 |  |
| 63 | Corki | +0.32 | 0.32 | 0.00 |  |
| 64 | Elise | +0.32 | 0.32 | 0.00 |  |
| 65 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 66 | Senna | +0.32 | 0.32 | 0.00 |  |
| 67 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 68 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 69 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 70 | Gnar | +0.31 | 0.31 | 0.00 |  |
| 71 | Poppy | +0.30 | 0.50 | 0.20 | dash stop (Steadfast Presence) |
| 72 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 73 | Lux | +0.29 | 0.29 | 0.00 |  |
| 74 | Heimerdinger | +0.28 | 0.28 | 0.00 |  |
| 75 | Jax | +0.28 | 0.28 | 0.00 |  |
| 76 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 77 | Nidalee | +0.28 | 0.28 | 0.00 |  |
| 78 | Yone | +0.28 | 0.28 | 0.00 |  |
| 79 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 80 | Seraphine | +0.27 | 0.27 | 0.00 |  |
| 81 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 82 | Ziggs | +0.27 | 0.27 | 0.00 |  |
| 83 | Malphite | +0.26 | 0.26 | 0.00 |  |
| 84 | Azir | +0.25 | 0.25 | 0.00 |  |
| 85 | Kog'Maw | +0.25 | 0.25 | 0.00 |  |
| 86 | Orianna | +0.25 | 0.25 | 0.00 |  |
| 87 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 88 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 89 | Quinn | +0.22 | 0.36 | 0.14 |  |
| 90 | Annie | +0.22 | 0.22 | 0.00 |  |
| 91 | Brand | +0.22 | 0.22 | 0.00 |  |
| 92 | Graves | +0.22 | 0.22 | 0.00 |  |
| 93 | Nami | +0.22 | 0.22 | 0.00 |  |
| 94 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 95 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 96 | Varus | +0.21 | 0.27 | 0.06 |  |
| 97 | Garen | +0.21 | 0.21 | 0.00 |  |
| 98 | Karma | +0.21 | 0.21 | 0.00 |  |
| 99 | LeBlanc | +0.21 | 0.21 | 0.00 |  |
| 100 | Swain | +0.20 | 0.20 | 0.00 |  |
| 101 | Amumu | +0.19 | 0.19 | 0.00 |  |
| 102 | Thresh | +0.18 | 0.18 | 0.00 |  |
| 103 | Zac | +0.17 | 0.40 | 0.23 | dash stop (Stretching Strikes) |
| 104 | Aurelion Sol | +0.16 | 0.22 | 0.06 |  |
| 105 | K'Sante | +0.16 | 0.16 | 0.00 |  |
| 106 | Urgot | +0.13 | 0.13 | 0.00 |  |
| 107 | Rammus | +0.11 | 0.27 | 0.16 |  |
| 108 | Ivern | +0.11 | 0.18 | 0.07 |  |
| 109 | Rakan | +0.11 | 0.11 | 0.00 |  |
| 110 | Lillia | +0.10 | 0.10 | 0.00 |  |
| 111 | Skarner | +0.10 | 0.10 | 0.00 |  |
| 112 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 113 | Hecarim | +0.08 | 0.08 | 0.00 |  |
| 114 | Illaoi | +0.08 | 0.08 | 0.00 |  |
| 115 | Jarvan IV | +0.08 | 0.08 | 0.00 |  |
| 116 | Ornn | +0.08 | 0.08 | 0.00 |  |
| 117 | Sett | +0.08 | 0.08 | 0.00 |  |
| 118 | Shyvana | +0.08 | 0.08 | 0.00 |  |
| 119 | Volibear | +0.08 | 0.08 | 0.00 |  |
| 120 | Akshan | +0.07 | 0.32 | 0.25 |  |
| 121 | Lucian | +0.06 | 0.34 | 0.28 |  |
| 122 | Mordekaiser | +0.06 | 0.06 | 0.00 |  |
| 123 | Twisted Fate | +0.05 | 0.40 | 0.35 |  |
| 124 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 125 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 126 | Akali | 0.00 | 0.00 | 0.00 |  |
| 127 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 128 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 129 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 130 | Briar | 0.00 | 0.00 | 0.00 |  |
| 131 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 132 | Darius | 0.00 | 0.00 | 0.00 |  |
| 133 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 134 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 135 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 136 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 137 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 138 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 139 | Leona | 0.00 | 0.00 | 0.00 |  |
| 140 | Locke | 0.00 | 0.00 | 0.00 |  |
| 141 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 142 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 143 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 144 | Rell | 0.00 | 0.00 | 0.00 |  |
| 145 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 146 | Riven | 0.00 | 0.00 | 0.00 |  |
| 147 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 148 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 149 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 150 | Talon | 0.00 | 0.00 | 0.00 |  |
| 151 | Taric | 0.00 | 0.00 | 0.00 |  |
| 152 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 153 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 154 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 155 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 156 | Vel'Koz | -0.03 | 0.25 | 0.28 |  |
| 157 | Janna | -0.04 | 0.36 | 0.40 |  |
| 158 | Viego | -0.04 | 0.08 | 0.12 |  |
| 159 | Xerath | -0.06 | 0.25 | 0.31 |  |
| 160 | Pyke | -0.08 | 0.00 | 0.08 |  |
| 161 | Karthus | -0.10 | 0.18 | 0.28 |  |
| 162 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 163 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 164 | Nunu & Willump | -0.12 | 0.25 | 0.37 |  |
| 165 | Vi | -0.14 | 0.08 | 0.22 |  |
| 166 | Shen | -0.18 | 0.27 | 0.45 |  |
| 167 | Katarina | -0.20 | 0.00 | 0.20 |  |
| 168 | Fiddlesticks | -0.22 | 0.18 | 0.40 |  |
| 169 | Taliyah | -0.23 | 0.25 | 0.48 |  |
| 170 | Tahm Kench | -0.26 | 0.00 | 0.26 |  |
| 171 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 172 | Galio | -0.55 | 0.00 | 0.55 |  |
