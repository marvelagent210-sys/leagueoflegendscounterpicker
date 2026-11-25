# Counters to Nocturne (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Nocturne: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Nocturne wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Nocturne --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Teemo | +0.85 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.25 |
| 2 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.14 |
| 3 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.69 |
| 4 | Gangplank | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.38 |
| 5 | Malphite | +0.82 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.20 |
| 6 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | −0.04 |
| 7 | Kog'Maw | +0.81 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.28 |
| 8 | Warwick | +0.80 | +1.00 | +1.00 | +1.00 | +0.17 | – | −0.15 |
| 9 | Fiora | +0.79 | +1.00 | +1.00 | +1.00 | +0.14 | – | −0.13 |
| 10 | Shyvana | +0.79 | +1.00 | +1.00 | +1.00 | +0.16 | – | −0.25 |
| 11 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | +0.21 | – | −0.43 |
| 12 | Diana | +0.79 | +1.00 | +1.00 | +1.00 | +0.13 | – | −0.24 |
| 13 | Ivern | +0.78 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.72 |
| 14 | Udyr | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.06 |
| 15 | Shen | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.01 |
| 16 | Kalista | +0.78 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | −0.72 |
| 17 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.13 | – | −0.40 |
| 18 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.12 |
| 19 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.17 |
| 20 | Alistar | +0.77 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.37 |
| 21 | Lee Sin | +0.77 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.15 |
| 22 | Aatrox | +0.77 | +1.00 | +1.00 | +1.00 | +0.26 | – | −0.90 |
| 23 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.12 |
| 24 | K'Sante | +0.77 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.72 |
| 25 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.34 |
| 26 | Trundle | +0.76 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.30 |
| 27 | Taric | +0.76 | +1.00 | +1.00 | +1.00 | +0.00 | – | −0.26 |
| 28 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.48 |
| 29 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.39 |
| 30 | Illaoi | +0.76 | +1.00 | +1.00 | +1.00 | −0.03 | – | −0.31 |
| 31 | Wukong | +0.75 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.57 |
| 32 | Dr. Mundo | +0.75 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.36 |
| 33 | Braum | +0.74 | +0.99 | +0.99 | +1.00 | −0.01 | – | −0.51 |
| 34 | Kennen | +0.70 | +0.83 | +0.90 | +1.00 | +0.15 | +0.53 | −0.19 |
| 35 | Neeko | +0.69 | +0.84 | +0.89 | +0.88 | +0.15 | +0.89 | −0.50 |
| 36 | Lulu | +0.60 | +1.00 | +1.00 | +1.00 | +0.14 | −1.00 | −0.52 |
| 37 | Morgana | +0.57 | +0.84 | +0.83 | +0.80 | +0.12 | −0.02 | −0.52 |
| 38 | Quinn | +0.56 | +1.00 | +1.00 | +1.00 | +0.08 | −1.00 | −0.97 |
| 39 | Karma | +0.52 | +0.86 | +0.58 | +0.96 | +0.10 | −0.38 | −0.13 |
| 40 | Xayah | +0.41 | +1.00 | +1.00 | −1.00 | +0.28 | +1.00 | −0.72 |
| 41 | Rengar | +0.38 | +1.00 | +1.00 | −1.00 | +0.46 | – | −0.54 |
| 42 | Irelia | +0.27 | −0.63 | +1.00 | +0.78 | +0.10 | – | −0.40 |
| 43 | Jayce | +0.25 | +1.00 | −1.00 | +1.00 | +0.14 | – | +0.09 |
| 44 | Milio | +0.25 | +1.00 | +0.50 | −0.03 | +0.21 | −1.00 | −1.00 |
| 45 | Kayle | +0.20 | +0.00 | +1.00 | −1.00 | +0.56 | +1.00 | −0.63 |
| 46 | Rek'Sai | +0.19 | +1.00 | −1.00 | +1.00 | +0.02 | – | −0.63 |
| 47 | Akali | +0.17 | −0.93 | +1.00 | +0.63 | +0.07 | – | −0.01 |
| 48 | Tristana | +0.16 | +1.00 | +1.00 | −1.00 | +0.05 | −1.00 | −0.87 |
| 49 | Anivia | +0.14 | +0.22 | +0.23 | +0.14 | −0.07 | +0.10 | −0.01 |
| 50 | Yasuo | +0.14 | −0.88 | +0.78 | +0.60 | +0.15 | – | +0.20 |
| 51 | Skarner | +0.05 | +0.00 | +1.00 | −1.00 | +0.01 | – | −0.18 |
| 52 | Mordekaiser | +0.04 | +0.63 | −1.00 | +0.63 | +0.02 | – | −0.05 |
| 53 | Kayn | +0.02 | +0.07 | +0.07 | +0.07 | +0.01 | – | −0.66 |
| 54 | Brand | −0.04 | +0.11 | −0.44 | +0.15 | +0.08 | +0.26 | −0.47 |
| 55 | Ezreal | −0.06 | +0.87 | +0.00 | −1.00 | +0.03 | −0.43 | −0.79 |
| 56 | Sion | −0.11 | +0.00 | −0.46 | +0.00 | −0.02 | – | +0.42 |
| 57 | Rammus | −0.25 | −1.00 | +1.00 | −1.00 | −0.09 | – | −0.22 |
| 58 | Pantheon | −0.25 | +0.00 | +0.00 | −1.00 | −0.03 | – | −0.50 |
| 59 | Gwen | −0.29 | −0.12 | −0.12 | −1.00 | +0.15 | – | −0.47 |
| 60 | Annie | −0.29 | −1.00 | +1.00 | −1.00 | +0.15 | −1.00 | −0.26 |
| 61 | Sivir | −0.30 | +1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.38 |
| 62 | Bard | −0.31 | −1.00 | +1.00 | −1.00 | +0.15 | −1.00 | −0.67 |
| 63 | Elise | −0.31 | +1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.63 |
| 64 | Corki | −0.32 | −1.00 | +1.00 | −1.00 | +0.14 | −1.00 | −0.81 |
| 65 | Camille | −0.32 | −1.00 | −1.00 | +1.00 | +0.08 | – | −0.04 |
| 66 | Zeri | −0.34 | +0.00 | −1.00 | −1.00 | +0.11 | +1.00 | −0.08 |
| 67 | Heimerdinger | −0.40 | −1.00 | −1.00 | +1.00 | +0.16 | −1.00 | −0.52 |
| 68 | Aphelios | −0.42 | −1.00 | −1.00 | +1.00 | +0.16 | −1.00 | −0.95 |
| 69 | Jinx | −0.45 | −0.02 | −0.80 | −0.62 | +0.12 | −0.97 | −0.94 |
| 70 | Jarvan IV | −0.48 | −1.00 | +0.00 | −1.00 | +0.18 | – | −0.13 |
| 71 | Rakan | −0.53 | +0.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.17 |
| 72 | Zaahen | −0.56 | −1.00 | −0.19 | −1.00 | +0.17 | – | −0.68 |
| 73 | Gragas | −0.56 | −1.00 | +0.00 | −1.00 | −0.02 | −1.00 | −0.23 |
| 74 | Bel'Veth | −0.59 | −1.00 | −1.00 | +0.09 | −0.03 | – | −0.94 |
| 75 | Lillia | −0.60 | −1.00 | −1.00 | −1.00 | +0.07 | +0.89 | +0.08 |
| 76 | Lissandra | −0.61 | −0.28 | −1.00 | −1.00 | +0.07 | −1.00 | +0.06 |
| 77 | Samira | −0.69 | −0.71 | −1.00 | −1.00 | +0.08 | −0.33 | −0.76 |
| 78 | Gnar | −0.69 | −1.00 | −1.00 | −1.00 | +0.28 | −0.21 | −0.26 |
| 79 | Orianna | −0.70 | −1.00 | −1.00 | −1.00 | +0.20 | +0.00 | −0.51 |
| 80 | Volibear | −0.70 | −0.86 | −1.00 | −0.86 | +0.07 | – | −0.02 |
| 81 | Aurelion Sol | −0.73 | −1.00 | −1.00 | −1.00 | +0.52 | −1.00 | −0.15 |
| 82 | Ambessa | −0.74 | −1.00 | −1.00 | −1.00 | +0.40 | – | −0.57 |
| 83 | Zac | −0.75 | −1.00 | −0.92 | −0.92 | +0.01 | – | −0.22 |
| 84 | Master Yi | −0.75 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.29 |
| 85 | Maokai | −0.76 | −1.00 | −1.00 | −1.00 | +0.25 | – | −0.36 |
| 86 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.20 | – | −0.24 |
| 87 | Kassadin | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.03 |
| 88 | Sylas | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.02 |
| 89 | Vel'Koz | −0.77 | −1.00 | −1.00 | −1.00 | +0.27 | −1.00 | −0.23 |
| 90 | Riven | −0.77 | −1.00 | −1.00 | −1.00 | +0.24 | – | −0.63 |
| 91 | Sett | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.28 |
| 92 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.27 | −1.00 | −0.40 |
| 93 | Singed | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.01 |
| 94 | Sejuani | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.23 |
| 95 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.14 |
| 96 | Hecarim | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | – | −0.60 |
| 97 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | +0.18 | – | −0.64 |
| 98 | Garen | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.42 |
| 99 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.07 |
| 100 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.11 |
| 101 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.14 |
| 102 | Zilean | −0.79 | −1.00 | −1.00 | −1.00 | +0.28 | −1.00 | −0.59 |
| 103 | Tahm Kench | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.24 |
| 104 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.11 |
| 105 | Fizz | −0.79 | −1.00 | −1.00 | −1.00 | +0.11 | – | −0.54 |
| 106 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.23 |
| 107 | Miss Fortune | −0.79 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | −0.46 |
| 108 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.30 |
| 109 | Akshan | −0.80 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.48 |
| 110 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.41 |
| 111 | Rumble | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.35 |
| 112 | Viego | −0.80 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.60 |
| 113 | Smolder | −0.80 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −0.69 |
| 114 | Aurora | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.17 |
| 115 | Cassiopeia | −0.80 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −0.62 |
| 116 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | +0.13 | – | −0.77 |
| 117 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | −0.70 |
| 118 | Vi | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.55 |
| 119 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.18 |
| 120 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.25 |
| 121 | Mel | −0.80 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.41 |
| 122 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | +0.28 | −1.00 | −0.86 |
| 123 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.30 |
| 124 | Yone | −0.80 | −1.00 | −1.00 | −1.00 | +0.16 | – | −0.92 |
| 125 | Kindred | −0.80 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.54 |
| 126 | Ashe | −0.80 | −1.00 | −1.00 | −1.00 | +0.27 | −1.00 | −0.89 |
| 127 | Syndra | −0.80 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.42 |
| 128 | Rell | −0.80 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.50 |
| 129 | Shaco | −0.81 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.65 |
| 130 | Taliyah | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.24 |
| 131 | Swain | −0.81 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.55 |
| 132 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.47 |
| 133 | Azir | −0.81 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.47 |
| 134 | Naafiri | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.63 |
| 135 | Janna | −0.81 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.78 |
| 136 | Senna | −0.81 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −0.90 |
| 137 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.57 |
| 138 | Yunara | −0.81 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | −0.95 |
| 139 | Nunu & Willump | −0.81 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.57 |
| 140 | Xin Zhao | −0.81 | −0.98 | −1.00 | −1.00 | +0.01 | – | −0.75 |
| 141 | Nami | −0.81 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.62 |
| 142 | Hwei | −0.81 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.50 |
| 143 | Ekko | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.56 |
| 144 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.49 |
| 145 | Vex | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.37 |
| 146 | Twitch | −0.82 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.70 |
| 147 | Zoe | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.42 |
| 148 | Jhin | −0.82 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.51 |
| 149 | Sona | −0.82 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.74 |
| 150 | Xerath | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.42 |
| 151 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.34 |
| 152 | Urgot | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.54 |
| 153 | Blitzcrank | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.38 |
| 154 | Varus | −0.82 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.71 |
| 155 | Viktor | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.57 |
| 156 | Malzahar | −0.82 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.40 |
| 157 | Seraphine | −0.82 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.85 |
| 158 | Soraka | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.49 |
| 159 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.82 |
| 160 | LeBlanc | −0.82 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.52 |
| 161 | Graves | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −1.00 |
| 162 | Fiddlesticks | −0.83 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.72 |
| 163 | Lux | −0.83 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.71 |
| 164 | Yuumi | −0.83 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.77 |
| 165 | Draven | −0.83 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.80 |
| 166 | Nidalee | −0.83 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.71 |
| 167 | Kai'Sa | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.94 |
| 168 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.84 |
| 169 | Twisted Fate | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.89 |
| 170 | Pyke | −0.85 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.96 |
| 171 | Nilah | −0.86 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.86 |
| 172 | Briar | −0.87 | −1.00 | −1.00 | −1.00 | −0.24 | – | −0.89 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Nocturne's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nocturne's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nocturne` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.51)

- **0.90** spell shield: Spell Shield's spell shield blocks Nocturne's Paranoia. Spell shield for 1.5 s, long enough to use ahead of Paranoia. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nocturne R Paranoia)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Nocturne's (500 vs 125 attack range). Nocturne closes the gap with Paranoia. (Sivir basic attacks → Nocturne basic attacks)
- **0.27** spell shield: Spell Shield's spell shield blocks part of Nocturne's Unspeakable Horror. Spell shield for 1.5 s, long enough to use ahead of Unspeakable Horror. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the tether's application but not the damage and aftereffects of one already applied. {{{{{1<noinclude>|Ability data</noinclude>}}}|Unspeakable Horror|{{{2|}}}|{{{3|}}}|{{{4|}}}|{{{5|}}}
|champion     = Nocturne
|skill        = E
|icon         = false
|blurb        = {{sbc|Passive:}} {{ci|Nocturne}} gains {{sti|ms|{{as|'''bonus''' movement speed}}}} while moving towards {{tip|fear|feared}} targets.
|blurb2      = {{sbc|Active:}} '''Nocturne''' torments the target, forming a {{tip|tether}} that continually deals {{as|magic damage}}.
|blurb3      = If the tether is not broken after a short time, the target is briefly {{tip|fear|feared}} and {{tip|slow|slowed}}.
|description  = {{sbc|Passive:}} '''Nocturne''' gains {{sti|ms|{{as|90% '''bonus''' movement speed}}}} while facing nearby {{tip|fear|feared}} targets.
|icon2        =  Unspeakable Horror.png
|description2 = {{sbc|Active:}} '''Nocturne''' torments the target, forming a {{tip|tether}} between himself and the target for 2 seconds, during which the target takes {{as|magic damage}} every {{fd|0.5}} seconds over the duration.
|leveling2    = {{st|Total Magic Damage|{{ap|80 to 260}} {{as|(+ 100% AP)}}|Magic Damage per Tick|{{ap|80/4 to 260/4}} {{as|(+ {{ap|100/4}}% AP)}}}}
|description3 = If the tether is not broken by the end of its duration, the target is {{tip|fear|feared}} for a duration while being {{tip|slow|slowed}} by 90%.
|leveling3    = {{st|Disable Duration|{{ap|1.25 to 2.25}} seconds}}
|effect radius= {{tip|cr|icononly = true}} {{tt|1000|Fear MS radius}}
|target range = {{tip|cr|icononly = true}} 425
|tether radius= {{tip|er|icononly = true}} 465
|cooldown     = {{ap|15 to 11}}
|cost         = {{ap|60 to 80}}
|costtype     = mana
|cast time    = none
|targeting    = Unit
|affects      = Enemies
|damagetype   = Magic
|spellshield  = Special
|spelleffects = special
|projectile   = False
|callforhelp  = True
|notes        = 
* ''Unspeakable Horror'' deals {{tip|persistent damage}}, additionally tagged as {{tip|indirect damage}}, and applies {{tip|spell effects}}.
* Feared enemies in a {{tip|cr|icononly = true}} 180° total angle within '''Nocturne's''' facing direction will trigger ''Unspeakable Horror's'' passive.
* Casting ''Unspeakable Horror'' may grant '''Nocturne''' permanent {{tip|ghosting}} until he has [[death|died]].{{bug}}
* {{tip|Spell shield}} will block the tether's application but not the damage and aftereffects of one already applied.
}}. (Sivir E Spell Shield → Nocturne E Unspeakable Horror)

#### 2. Vladimir (net +0.87)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nocturne's Paranoia. Untargetable for 2 s, long enough to use ahead of Paranoia. (Vladimir W Sanguine Pool → Nocturne R Paranoia)
- **0.57** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for 2 s, long enough to use ahead of Unspeakable Horror. (Vladimir W Sanguine Pool → Nocturne E Unspeakable Horror)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Nocturne's (450 vs 125 attack range). Nocturne closes the gap with Paranoia. (Vladimir basic attacks → Nocturne basic attacks)
- Watch out: Shroud of Darkness's spell shield blocks part of Vladimir's Hemoplague.

#### 3. Gwen (net +0.78)

- **0.90** untargetable: Hallowed Mist makes Gwen untargetable, dodging Nocturne's Paranoia. Untargetable for ?; Paranoia takes 2.22 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Nocturne R Paranoia)
- **0.32** untargetable: Hallowed Mist makes Gwen untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for ?; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks part of Gwen's Needlework.

#### 4. Xayah (net +0.75)

- **0.90** untargetable: Featherstorm makes Xayah untargetable, dodging Nocturne's Paranoia. Untargetable for 1.5 s, long enough to use ahead of Paranoia. (Xayah R Featherstorm → Nocturne R Paranoia)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range). Nocturne closes the gap with Paranoia. (Xayah basic attacks → Nocturne basic attacks)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for 1.5 s, long enough to use ahead of Unspeakable Horror. (Xayah R Featherstorm → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks Xayah's Featherstorm.

#### 5. Yuumi (net +0.75)

- **0.90** untargetable: You and Me! makes Yuumi untargetable, dodging Nocturne's Paranoia. Untargetable for ?; Paranoia takes 2.22 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nocturne R Paranoia)
- **0.42** untargetable: You and Me! makes Yuumi untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for ?; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nocturne E Unspeakable Horror)
- **0.32** range: Yuumi's basic attacks reach 300 units farther than Nocturne's (425 vs 125 attack range). Nocturne closes the gap with Paranoia. (Yuumi basic attacks → Nocturne basic attacks)
- Watch out: Unspeakable Horror's fear interrupts Yuumi's Final Chapter (normal channel).

#### 6. Fiora (net +0.60)

- **0.90** parry: Riposte parries Nocturne's Paranoia. Parry for 0.75 s; Paranoia takes 2.22 s to land, enough to react. (Fiora W Riposte → Nocturne R Paranoia)
- **0.44** parry: Riposte parries Nocturne's Unspeakable Horror and stuns back. Parry for 0.75 s; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Unspeakable Horror's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Nocturne E Unspeakable Horror)
- **0.09** attack speed slow: Riposte cuts Nocturne's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Nocturne basic attacks)
- Watch out: Shroud of Darkness's spell shield blocks Fiora's Riposte.

#### 7. Aurora (net +0.59)

- **0.90** untargetable: Between Worlds makes Aurora untargetable, dodging Nocturne's Paranoia. Untargetable for 0.4 s; Paranoia takes 2.22 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nocturne R Paranoia)
- **0.29** range: Aurora's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range). Nocturne closes the gap with Paranoia. (Aurora basic attacks → Nocturne basic attacks)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for 0.4 s; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks Aurora's Between Worlds.

#### 8. Kayle (net +0.58)

- **0.45** invulnerable: Divine Judgment makes Kayle invulnerable to Nocturne's Paranoia (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Paranoia. (Kayle R Divine Judgment → Nocturne R Paranoia)
- **0.36** range: Kayle's basic attacks reach 500 units farther than Nocturne's (625 vs 125 attack range). Nocturne closes the gap with Paranoia. (Kayle basic attacks → Nocturne basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Nocturne's Unspeakable Horror (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Unspeakable Horror. (Kayle R Divine Judgment → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks Kayle's Starfire Spellblade.

#### 9. Master Yi (net +0.57)

- **0.90** untargetable: Alpha Strike makes Master Yi untargetable, dodging Nocturne's Paranoia. Untargetable for ?; Paranoia takes 2.22 s to land, enough to react. (Master Yi Q Alpha Strike → Nocturne R Paranoia)
- **0.32** untargetable: Alpha Strike makes Master Yi untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for ?; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Nocturne E Unspeakable Horror)
- **0.08** cc immunity: Highlander makes Master Yi immune to Nocturne's Unspeakable Horror (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks part of Master Yi's Alpha Strike.

#### 10. Zed (net +0.55)

- **0.90** untargetable: Death Mark makes Zed untargetable, dodging Nocturne's Paranoia. Untargetable for 0.6 s; Paranoia takes 2.22 s to land, enough to react. (Zed R Death Mark → Nocturne R Paranoia)
- **0.20** untargetable: Death Mark makes Zed untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for 0.6 s; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Zed R Death Mark → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks part of Zed's Death Mark.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.51 | 1.51 | 0.00 |  |
| 2 | Vladimir | +0.87 | 1.37 | 0.50 |  |
| 3 | Gwen | +0.78 | 1.06 | 0.28 |  |
| 4 | Xayah | +0.75 | 1.44 | 0.69 |  |
| 5 | Yuumi | +0.75 | 1.43 | 0.68 |  |
| 6 | Fiora | +0.60 | 1.14 | 0.54 |  |
| 7 | Aurora | +0.59 | 1.29 | 0.70 |  |
| 8 | Kayle | +0.58 | 0.90 | 0.32 |  |
| 9 | Master Yi | +0.57 | 1.18 | 0.61 |  |
| 10 | Zed | +0.55 | 1.00 | 0.45 |  |
| 11 | Lissandra | +0.48 | 1.29 | 0.81 |  |
| 12 | Bard | +0.46 | 1.43 | 0.97 |  |
| 13 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 14 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 15 | Teemo | +0.36 | 0.84 | 0.48 | blind (Blinding Dart) |
| 16 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 17 | Fizz | +0.20 | 1.11 | 0.91 |  |
| 18 | Zeri | +0.16 | 0.44 | 0.28 |  |
| 19 | Shaco | +0.12 | 1.00 | 0.88 |  |
| 20 | Udyr | +0.12 | 0.82 | 0.70 |  |
| 21 | Olaf | +0.12 | 0.46 | 0.34 |  |
| 22 | Morgana | +0.11 | 0.88 | 0.77 |  |
| 23 | Kindred | +0.11 | 0.47 | 0.36 |  |
| 24 | Milio | +0.07 | 0.77 | 0.70 |  |
| 25 | Rengar | +0.02 | 0.65 | 0.63 |  |
| 26 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 27 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 28 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 29 | Kog'Maw | -0.02 | 0.27 | 0.29 |  |
| 30 | Nasus | -0.04 | 0.39 | 0.43 |  |
| 31 | Soraka | -0.08 | 0.27 | 0.35 |  |
| 32 | Zoe | -0.10 | 0.32 | 0.42 |  |
| 33 | Gangplank | -0.11 | 0.58 | 0.69 |  |
| 34 | Miss Fortune | -0.11 | 0.32 | 0.43 |  |
| 35 | Graves | -0.11 | 0.24 | 0.35 |  |
| 36 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 37 | Mel | -0.17 | 0.53 | 0.70 |  |
| 38 | Samira | -0.20 | 0.58 | 0.78 |  |
| 39 | Jinx | -0.21 | 0.29 | 0.50 |  |
| 40 | LeBlanc | -0.21 | 0.22 | 0.43 |  |
| 41 | Akshan | -0.22 | 0.34 | 0.56 |  |
| 42 | Karma | -0.22 | 0.22 | 0.44 |  |
| 43 | Singed | -0.23 | 0.40 | 0.63 |  |
| 44 | Corki | -0.23 | 0.32 | 0.55 |  |
| 45 | Rek'Sai | -0.25 | 1.07 | 1.32 |  |
| 46 | Nidalee | -0.28 | 0.30 | 0.58 |  |
| 47 | Ezreal | -0.32 | 0.32 | 0.64 |  |
| 48 | Garen | -0.32 | 0.32 | 0.64 |  |
| 49 | Vayne | -0.34 | 0.43 | 0.77 |  |
| 50 | Kayn | -0.35 | 1.00 | 1.35 |  |
| 51 | Lucian | -0.35 | 0.36 | 0.71 |  |
| 52 | Anivia | -0.36 | 0.24 | 0.60 |  |
| 53 | Maokai | -0.37 | 1.11 | 1.48 |  |
| 54 | Lillia | -0.37 | 0.11 | 0.48 |  |
| 55 | Aphelios | -0.38 | 0.45 | 0.83 |  |
| 56 | Evelynn | -0.39 | 1.00 | 1.39 |  |
| 57 | Smolder | -0.39 | 0.32 | 0.71 |  |
| 58 | Twisted Fate | -0.41 | 0.43 | 0.84 |  |
| 59 | Illaoi | -0.42 | 0.00 | 0.42 |  |
| 60 | Lulu | -0.43 | 0.72 | 1.15 |  |
| 61 | Braum | -0.43 | 0.45 | 0.88 | projectile block (Unbreakable) |
| 62 | Ashe | -0.44 | 0.36 | 0.80 |  |
| 63 | Vex | -0.46 | 0.27 | 0.73 |  |
| 64 | Swain | -0.46 | 0.21 | 0.67 |  |
| 65 | Zilean | -0.47 | 0.32 | 0.79 |  |
| 66 | Malzahar | -0.48 | 0.62 | 1.10 |  |
| 67 | Kalista | -0.49 | 0.65 | 1.14 |  |
| 68 | Cassiopeia | -0.49 | 0.43 | 0.92 |  |
| 69 | Locke | -0.50 | 0.00 | 0.50 |  |
| 70 | Kennen | -0.51 | 0.29 | 0.80 |  |
| 71 | Varus | -0.52 | 0.39 | 0.91 |  |
| 72 | Mordekaiser | -0.53 | 0.31 | 0.84 |  |
| 73 | Brand | -0.53 | 0.22 | 0.75 |  |
| 74 | Draven | -0.55 | 0.36 | 0.91 |  |
| 75 | Renekton | -0.56 | 0.00 | 0.56 |  |
| 76 | Sona | -0.57 | 0.41 | 0.98 |  |
| 77 | Kha'Zix | -0.57 | 0.00 | 0.57 |  |
| 78 | Jax | -0.58 | 0.41 | 0.99 | attack dodge (Counter Strike) |
| 79 | Camille | -0.60 | 1.00 | 1.60 |  |
| 80 | Nilah | -0.60 | 0.48 | 1.08 |  |
| 81 | Elise | -0.60 | 0.32 | 0.92 |  |
| 82 | Jayce | -0.61 | 0.30 | 0.91 |  |
| 83 | Lux | -0.62 | 0.29 | 0.91 |  |
| 84 | Viktor | -0.64 | 0.32 | 0.96 |  |
| 85 | Karthus | -0.64 | 0.19 | 0.83 |  |
| 86 | Katarina | -0.64 | 0.12 | 0.76 |  |
| 87 | Annie | -0.66 | 0.22 | 0.88 |  |
| 88 | Renata Glasc | -0.67 | 0.38 | 1.05 |  |
| 89 | Senna | -0.67 | 0.32 | 0.99 |  |
| 90 | Neeko | -0.69 | 0.22 | 0.91 |  |
| 91 | Taric | -0.70 | 0.00 | 0.70 |  |
| 92 | Trundle | -0.70 | 0.00 | 0.70 |  |
| 93 | Vel'Koz | -0.71 | 0.27 | 0.98 |  |
| 94 | Kassadin | -0.71 | 0.00 | 0.71 |  |
| 95 | Heimerdinger | -0.72 | 0.27 | 0.99 |  |
| 96 | Tristana | -0.75 | 0.36 | 1.11 |  |
| 97 | Veigar | -0.77 | 0.24 | 1.01 |  |
| 98 | Aatrox | -0.77 | 0.00 | 0.77 |  |
| 99 | Yasuo | -0.80 | 0.31 | 1.11 |  |
| 100 | Orianna | -0.80 | 0.27 | 1.07 |  |
| 101 | Sion | -0.81 | 0.48 | 1.29 |  |
| 102 | Gnar | -0.81 | 0.33 | 1.14 |  |
| 103 | Syndra | -0.81 | 0.22 | 1.03 |  |
| 104 | Quinn | -0.82 | 0.38 | 1.20 |  |
| 105 | Caitlyn | -0.83 | 0.36 | 1.19 |  |
| 106 | Zaahen | -0.83 | 0.33 | 1.16 |  |
| 107 | Seraphine | -0.84 | 0.29 | 1.13 |  |
| 108 | Talon | -0.84 | 0.00 | 0.84 |  |
| 109 | Ryze | -0.86 | 0.24 | 1.10 |  |
| 110 | Bel'Veth | -0.86 | 0.00 | 0.86 |  |
| 111 | Alistar | -0.87 | 0.36 | 1.23 |  |
| 112 | Ahri | -0.87 | 0.22 | 1.09 |  |
| 113 | Lee Sin | -0.88 | 0.00 | 0.88 |  |
| 114 | Xin Zhao | -0.89 | 0.53 | 1.42 |  |
| 115 | Ivern | -0.89 | 0.19 | 1.08 |  |
| 116 | Akali | -0.90 | 0.00 | 0.90 |  |
| 117 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 118 | Shyvana | -0.90 | 0.00 | 0.90 |  |
| 119 | Hwei | -0.92 | 0.23 | 1.15 |  |
| 120 | Irelia | -0.93 | 0.05 | 0.98 |  |
| 121 | Skarner | -0.94 | 0.09 | 1.03 |  |
| 122 | Cho'Gath | -0.96 | 0.00 | 0.96 |  |
| 123 | Azir | -0.99 | 0.27 | 1.26 |  |
| 124 | Xerath | -0.99 | 0.27 | 1.26 |  |
| 125 | Urgot | -0.99 | 0.15 | 1.14 |  |
| 126 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 127 | Jhin | -1.02 | 0.27 | 1.29 |  |
| 128 | Ziggs | -1.03 | 0.27 | 1.30 |  |
| 129 | Malphite | -1.04 | 0.25 | 1.29 |  |
| 130 | Wukong | -1.04 | 0.00 | 1.04 |  |
| 131 | Rammus | -1.05 | 0.38 | 1.43 |  |
| 132 | Zyra | -1.05 | 0.24 | 1.29 |  |
| 133 | Kled | -1.06 | 0.44 | 1.50 |  |
| 134 | Diana | -1.08 | 0.00 | 1.08 |  |
| 135 | Jarvan IV | -1.09 | 0.00 | 1.09 |  |
| 136 | Amumu | -1.10 | 0.00 | 1.10 |  |
| 137 | Nautilus | -1.10 | 0.00 | 1.10 |  |
| 138 | Yone | -1.10 | 0.00 | 1.10 |  |
| 139 | Shen | -1.11 | 0.39 | 1.50 |  |
| 140 | Fiddlesticks | -1.11 | 0.20 | 1.31 |  |
| 141 | Thresh | -1.11 | 0.19 | 1.30 |  |
| 142 | Darius | -1.12 | 0.00 | 1.12 |  |
| 143 | Nami | -1.14 | 0.22 | 1.36 |  |
| 144 | Pantheon | -1.15 | 0.59 | 1.74 |  |
| 145 | Aurelion Sol | -1.17 | 0.22 | 1.39 |  |
| 146 | Blitzcrank | -1.26 | 0.00 | 1.26 |  |
| 147 | Leona | -1.26 | 0.00 | 1.26 |  |
| 148 | Ornn | -1.27 | 0.00 | 1.27 |  |
| 149 | Sylas | -1.28 | 0.00 | 1.28 |  |
| 150 | Ekko | -1.31 | 0.00 | 1.31 |  |
| 151 | Qiyana | -1.35 | 0.00 | 1.35 |  |
| 152 | Rakan | -1.37 | 0.13 | 1.50 |  |
| 153 | Sett | -1.39 | 0.00 | 1.39 |  |
| 154 | Volibear | -1.42 | 0.00 | 1.42 |  |
| 155 | Warwick | -1.43 | 0.34 | 1.77 |  |
| 156 | Taliyah | -1.47 | 0.27 | 1.74 |  |
| 157 | Hecarim | -1.48 | 0.00 | 1.48 |  |
| 158 | Janna | -1.50 | 0.36 | 1.86 |  |
| 159 | Briar | -1.50 | 0.00 | 1.50 |  |
| 160 | Sejuani | -1.54 | 0.00 | 1.54 |  |
| 161 | Nunu & Willump | -1.56 | 0.20 | 1.76 |  |
| 162 | Poppy | -1.56 | 0.00 | 1.56 |  |
| 163 | Riven | -1.59 | 0.00 | 1.59 |  |
| 164 | Viego | -1.62 | 0.09 | 1.71 |  |
| 165 | Tahm Kench | -1.69 | 0.00 | 1.69 |  |
| 166 | Zac | -1.73 | 0.00 | 1.73 |  |
| 167 | K'Sante | -1.74 | 0.00 | 1.74 |  |
| 168 | Pyke | -1.76 | 0.00 | 1.76 |  |
| 169 | Gragas | -1.83 | 0.00 | 1.83 |  |
| 170 | Rell | -1.84 | 0.00 | 1.84 |  |
| 171 | Vi | -2.01 | 0.00 | 2.01 |  |
| 172 | Galio | -2.24 | 0.00 | 2.24 |  |
