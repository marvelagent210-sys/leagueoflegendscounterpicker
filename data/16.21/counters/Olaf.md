# Counters to Olaf (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Olaf: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Olaf wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Olaf --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.88 | +1.00 | +1.00 | +1.00 | +0.50 | +1.00 | +0.04 |
| 2 | Nasus | +0.85 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.85 |
| 3 | Sivir | +0.84 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.28 |
| 4 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.90 |
| 5 | Aphelios | +0.83 | +1.00 | +1.00 | +1.00 | +0.35 | +1.00 | −0.48 |
| 6 | Corki | +0.82 | +0.92 | +1.00 | +1.00 | +0.33 | +1.00 | −0.10 |
| 7 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.96 |
| 8 | Kalista | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | −0.17 |
| 9 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.10 |
| 10 | Tryndamere | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.57 |
| 11 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | +0.19 | – | −0.35 |
| 12 | Quinn | +0.79 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | −0.70 |
| 13 | Darius | +0.74 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.80 |
| 14 | Kog'Maw | +0.63 | +1.00 | +1.00 | +0.00 | +0.23 | +1.00 | −0.10 |
| 15 | Teemo | +0.47 | +1.00 | +1.00 | −1.00 | +0.38 | +1.00 | +0.32 |
| 16 | Xayah | +0.47 | +1.00 | +1.00 | −0.78 | +0.30 | +1.00 | −0.42 |
| 17 | Zilean | +0.44 | −0.53 | +1.00 | +1.00 | +0.24 | +1.00 | −0.25 |
| 18 | Zeri | +0.43 | +1.00 | +1.00 | −1.00 | +0.04 | +1.00 | +0.40 |
| 19 | Illaoi | +0.40 | +0.32 | +0.30 | +1.00 | +0.08 | – | −0.11 |
| 20 | Kled | +0.38 | +1.00 | +1.00 | −0.80 | −0.03 | – | +0.16 |
| 21 | Yunara | +0.34 | +0.83 | +0.82 | −1.00 | +0.28 | +0.98 | −0.22 |
| 22 | Taric | +0.30 | +1.00 | −0.35 | +0.50 | +0.08 | – | −0.19 |
| 23 | Annie | +0.29 | +1.00 | +1.00 | −1.00 | +0.10 | +0.05 | −0.51 |
| 24 | Miss Fortune | +0.25 | +1.00 | +1.00 | −1.00 | +0.28 | −1.00 | +0.12 |
| 25 | Ivern | +0.18 | +1.00 | +1.00 | −1.00 | +0.04 | −0.82 | −0.82 |
| 26 | Morgana | +0.15 | −0.03 | +1.00 | −1.00 | +0.12 | +1.00 | −0.27 |
| 27 | Twitch | +0.13 | +1.00 | +0.45 | −1.00 | +0.21 | −0.56 | −0.08 |
| 28 | Heimerdinger | +0.09 | −1.00 | +0.98 | +1.00 | +0.11 | −1.00 | −0.36 |
| 29 | Vel'Koz | +0.08 | −0.34 | +0.99 | −1.00 | +0.20 | +0.99 | −0.24 |
| 30 | Draven | +0.05 | +0.26 | +1.00 | −1.00 | +0.14 | −0.56 | −0.68 |
| 31 | Aatrox | +0.04 | +0.49 | +0.54 | −1.00 | +0.07 | – | −0.73 |
| 32 | Volibear | −0.01 | +0.01 | −0.04 | +0.01 | +0.03 | – | −0.17 |
| 33 | Ashe | −0.09 | +1.00 | −0.15 | −1.00 | +0.29 | −1.00 | −0.91 |
| 34 | Kai'Sa | −0.23 | −0.29 | −0.04 | −1.00 | −0.01 | +1.00 | −0.82 |
| 35 | Lulu | −0.24 | +0.49 | −0.90 | −1.00 | +0.19 | +0.25 | +0.08 |
| 36 | Jax | −0.28 | −0.50 | −0.50 | +0.00 | −0.01 | – | +0.03 |
| 37 | Sona | −0.28 | +0.03 | +0.03 | −1.00 | +0.16 | −1.00 | −0.37 |
| 38 | Shyvana | −0.32 | −1.00 | −1.00 | +1.00 | +0.11 | – | −0.05 |
| 39 | Neeko | −0.34 | −0.33 | −0.25 | −1.00 | +0.22 | −0.03 | −0.41 |
| 40 | Aurora | −0.35 | −1.00 | −1.00 | +1.00 | +0.11 | −0.80 | +0.24 |
| 41 | Sion | −0.42 | −0.56 | −0.51 | −0.57 | +0.02 | – | +0.04 |
| 42 | Karthus | −0.43 | −1.00 | +0.00 | −1.00 | +0.11 | +0.00 | +0.08 |
| 43 | Karma | −0.45 | −0.30 | −0.39 | −1.00 | +0.03 | −0.61 | −0.42 |
| 44 | Mordekaiser | −0.48 | +0.27 | −1.00 | −1.00 | +0.06 | −1.00 | −0.10 |
| 45 | Lucian | −0.55 | −1.00 | −1.00 | −1.00 | +0.20 | +1.00 | +0.41 |
| 46 | Syndra | −0.56 | −1.00 | −0.09 | −1.00 | +0.14 | −1.00 | −0.12 |
| 47 | Jinx | −0.58 | −0.52 | −0.51 | −1.00 | +0.16 | −1.00 | −0.82 |
| 48 | Tristana | −0.58 | −1.00 | −1.00 | −1.00 | +0.23 | +1.00 | −0.28 |
| 49 | Lillia | −0.58 | −0.98 | −1.00 | −1.00 | +0.00 | +1.00 | +0.22 |
| 50 | Caitlyn | −0.59 | −1.00 | −0.87 | −1.00 | +0.17 | +0.82 | −0.53 |
| 51 | Kennen | −0.59 | −1.00 | −1.00 | −1.00 | +0.01 | +1.00 | +0.15 |
| 52 | Irelia | −0.60 | −0.69 | −0.69 | −1.00 | +0.11 | −0.69 | −0.12 |
| 53 | Cassiopeia | −0.67 | −0.61 | −0.88 | −1.00 | +0.29 | −1.00 | −0.89 |
| 54 | Smolder | −0.68 | −1.00 | −1.00 | −1.00 | +0.26 | +0.00 | −0.30 |
| 55 | Nami | −0.68 | −0.58 | −0.89 | −1.00 | +0.19 | −0.94 | −0.93 |
| 56 | Ambessa | −0.70 | −1.00 | −1.00 | −1.00 | +0.55 | −1.00 | +0.45 |
| 57 | Rengar | −0.70 | −1.00 | −1.00 | −1.00 | +0.34 | – | +0.46 |
| 58 | Milio | −0.71 | −0.62 | −1.00 | −1.00 | +0.26 | −1.00 | −0.79 |
| 59 | Zyra | −0.71 | −0.54 | −1.00 | −1.00 | +0.05 | −1.00 | −0.56 |
| 60 | Gwen | −0.72 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.68 |
| 61 | Fiora | −0.72 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.82 |
| 62 | Aurelion Sol | −0.72 | −1.00 | −1.00 | −1.00 | +0.57 | −1.00 | −0.09 |
| 63 | Yasuo | −0.73 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.35 |
| 64 | Orianna | −0.73 | −1.00 | −1.00 | −1.00 | +0.24 | −0.64 | −0.08 |
| 65 | Master Yi | −0.74 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.74 |
| 66 | Wukong | −0.74 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.42 |
| 67 | Rumble | −0.74 | −1.00 | −1.00 | −0.91 | +0.02 | – | +0.29 |
| 68 | Nilah | −0.74 | −1.00 | −1.00 | −1.00 | +0.20 | −0.50 | −0.38 |
| 69 | Gangplank | −0.74 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.33 |
| 70 | Udyr | −0.75 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.50 |
| 71 | Rakan | −0.75 | −1.00 | −1.00 | −0.92 | +0.03 | −0.99 | +0.49 |
| 72 | Dr. Mundo | −0.75 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.43 |
| 73 | Zed | −0.75 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.60 |
| 74 | Zaahen | −0.75 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.09 |
| 75 | Janna | −0.76 | −1.00 | −1.00 | −1.00 | +0.15 | −0.47 | −0.69 |
| 76 | Jayce | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.43 |
| 77 | Singed | −0.76 | −0.99 | −0.95 | −0.89 | −0.12 | – | −0.02 |
| 78 | Lee Sin | −0.76 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.10 |
| 79 | Hecarim | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.03 |
| 80 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.03 |
| 81 | Gnar | −0.76 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.10 |
| 82 | Malphite | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.17 |
| 83 | Jarvan IV | −0.77 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.64 |
| 84 | Viego | −0.77 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.13 |
| 85 | Sejuani | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.03 |
| 86 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.46 |
| 87 | Renekton | −0.77 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.09 |
| 88 | Diana | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | – | −0.54 |
| 89 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.04 | −0.88 | +0.15 |
| 90 | Nocturne | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.12 |
| 91 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.20 |
| 92 | Shaco | −0.78 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.15 |
| 93 | Mel | −0.78 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | −0.31 |
| 94 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.04 |
| 95 | Locke | −0.78 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.18 |
| 96 | Ornn | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −0.15 |
| 97 | Kindred | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.02 |
| 98 | Camille | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.12 |
| 99 | Kayn | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.09 |
| 100 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.23 |
| 101 | Yuumi | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.05 |
| 102 | Bel'Veth | −0.79 | −1.00 | −1.00 | −1.00 | +0.16 | – | −0.72 |
| 103 | Fizz | −0.79 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.17 |
| 104 | Azir | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.10 |
| 105 | Sylas | −0.79 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.11 |
| 106 | Ezreal | −0.79 | −0.99 | −1.00 | −1.00 | +0.08 | −1.00 | −0.14 |
| 107 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.44 |
| 108 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.22 |
| 109 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.53 |
| 110 | Xin Zhao | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.21 |
| 111 | Anivia | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.37 |
| 112 | Jhin | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −0.99 | −0.25 |
| 113 | Graves | −0.80 | −1.00 | −1.00 | −1.00 | +0.28 | −1.00 | −0.86 |
| 114 | Swain | −0.80 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.30 |
| 115 | Yone | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.65 |
| 116 | Zac | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.16 |
| 117 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.16 |
| 118 | Sett | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.44 |
| 119 | Ryze | −0.80 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.34 |
| 120 | Rek'Sai | −0.81 | −1.00 | −1.00 | −1.00 | −0.16 | – | −0.02 |
| 121 | Zoe | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.28 |
| 122 | Nidalee | −0.81 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.53 |
| 123 | Vi | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.33 |
| 124 | Hwei | −0.81 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.41 |
| 125 | Poppy | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.41 |
| 126 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.36 |
| 127 | Riven | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.36 |
| 128 | Garen | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.42 |
| 129 | K'Sante | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.28 |
| 130 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.27 |
| 131 | Twisted Fate | −0.81 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.46 |
| 132 | Skarner | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.07 |
| 133 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.54 |
| 134 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.28 |
| 135 | Pantheon | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.32 |
| 136 | Gragas | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.01 |
| 137 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.07 |
| 138 | Brand | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.43 |
| 139 | Lux | −0.82 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | −0.96 |
| 140 | Urgot | −0.82 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.63 |
| 141 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.00 |
| 142 | Elise | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.56 |
| 143 | Braum | −0.82 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.28 |
| 144 | Renata Glasc | −0.82 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −0.96 |
| 145 | LeBlanc | −0.82 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.38 |
| 146 | Vex | −0.82 | −1.00 | −0.97 | −1.00 | +0.05 | −1.00 | −0.71 |
| 147 | Varus | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.63 |
| 148 | Taliyah | −0.82 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.43 |
| 149 | Seraphine | −0.82 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −1.00 |
| 150 | Blitzcrank | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.38 |
| 151 | Rell | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.49 |
| 152 | Senna | −0.82 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.75 |
| 153 | Nunu & Willump | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | – | −0.32 |
| 154 | Soraka | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.82 |
| 155 | Maokai | −0.83 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.34 |
| 156 | Tahm Kench | −0.83 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.40 |
| 157 | Ekko | −0.83 | −1.00 | −1.00 | −1.00 | −0.15 | – | −0.43 |
| 158 | Rammus | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.06 |
| 159 | Veigar | −0.83 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.56 |
| 160 | Lissandra | −0.83 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.78 |
| 161 | Evelynn | −0.83 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.57 |
| 162 | Nautilus | −0.83 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.64 |
| 163 | Fiddlesticks | −0.83 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.87 |
| 164 | Bard | −0.84 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.99 |
| 165 | Malzahar | −0.84 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.94 |
| 166 | Leona | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.74 |
| 167 | Katarina | −0.85 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.45 |
| 168 | Qiyana | −0.85 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | −0.56 |
| 169 | Amumu | −0.85 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.70 |
| 170 | Warwick | −0.86 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.95 |
| 171 | Alistar | −0.86 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.58 |
| 172 | Briar | −0.87 | −1.00 | −1.00 | −1.00 | −0.44 | – | −0.36 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Olaf's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Olaf's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Olaf` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.22)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Olaf's (500 vs 125 attack range). Olaf has no dash or blink to close the gap. (Sivir basic attacks → Olaf basic attacks)
- **0.28** spell shield: Spell Shield's spell shield blocks Olaf's Reckless Swing. Spell shield for 1.5 s, long enough to use ahead of Reckless Swing. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Olaf E Reckless Swing)

#### 2. Teemo (net +1.02)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Olaf's (500 vs 125 attack range). Olaf has no dash or blink to close the gap. (Teemo basic attacks → Olaf basic attacks)
- **0.50** blind: Blinding Dart's blind makes Olaf's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Olaf basic attacks)
- Watch out: Ragnarok makes Olaf immune to Teemo's Blinding Dart (blind).

#### 3. Yuumi (net +0.92)

- **0.64** range: Yuumi's basic attacks reach 300 units farther than Olaf's (425 vs 125 attack range). Olaf has no dash or blink to close the gap. (Yuumi basic attacks → Olaf basic attacks)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Olaf's Reckless Swing. Untargetable for ?; Reckless Swing takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Olaf E Reckless Swing)
- Watch out: Ragnarok makes Olaf immune to Yuumi's Final Chapter (slow).

#### 4. Kindred (net +0.89)

- **0.94** range: Kindred's basic attacks reach 375 units farther than Olaf's (500 vs 125 attack range). Olaf has no dash or blink to close the gap. (Kindred basic attacks → Olaf basic attacks)
- Watch out: Ragnarok makes Olaf immune to Kindred's Mounting Dread (slow).

#### 5. Kayle (net +0.87)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Olaf's (625 vs 125 attack range). Olaf has no dash or blink to close the gap. (Kayle basic attacks → Olaf basic attacks)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Olaf's Reckless Swing. Invulnerable for 2.5 s, long enough to use ahead of Reckless Swing. (Kayle R Divine Judgment → Olaf E Reckless Swing)
- Watch out: Ragnarok makes Olaf immune to Kayle's Radiant Blast (slow).

#### 6. Zeri (net +0.83)

- **0.88** range: Zeri's basic attacks reach 425 units farther than Olaf's (550 vs 125 attack range). Olaf has no dash or blink to close the gap. (Zeri basic attacks → Olaf basic attacks)
- Watch out: Ragnarok makes Olaf immune to Zeri's Ultrashock Laser (slow).

#### 7. Twitch (net +0.81)

- **0.86** range: Twitch's basic attacks reach 425 units farther than Olaf's (550 vs 125 attack range). Olaf has no dash or blink to close the gap. (Twitch basic attacks → Olaf basic attacks)
- Watch out: Ragnarok makes Olaf immune to Twitch's Venom Cask (slow).

#### 8. Kai'Sa (net +0.77)

- **0.77** range: Kai'Sa's basic attacks reach 400 units farther than Olaf's (525 vs 125 attack range). Olaf has no dash or blink to close the gap. (Kai'Sa basic attacks → Olaf basic attacks)

#### 9. Lucian (net +0.72)

- **0.72** range: Lucian's basic attacks reach 375 units farther than Olaf's (500 vs 125 attack range). Olaf has no dash or blink to close the gap. (Lucian basic attacks → Olaf basic attacks)

#### 10. Akshan (net +0.68)

- **0.68** range: Akshan's basic attacks reach 375 units farther than Olaf's (500 vs 125 attack range). Olaf has no dash or blink to close the gap. (Akshan basic attacks → Olaf basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.22 | 1.22 | 0.00 | range (attacks) |
| 2 | Teemo | +1.02 | 1.18 | 0.16 | range (attacks), blind (Blinding Dart) |
| 3 | Yuumi | +0.92 | 1.09 | 0.17 | range (attacks) |
| 4 | Kindred | +0.89 | 0.94 | 0.05 | range (attacks) |
| 5 | Kayle | +0.87 | 0.92 | 0.05 | range (attacks) |
| 6 | Zeri | +0.83 | 0.88 | 0.05 | range (attacks) |
| 7 | Twitch | +0.81 | 0.86 | 0.05 | range (attacks) |
| 8 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 9 | Lucian | +0.72 | 0.72 | 0.00 | range (attacks) |
| 10 | Akshan | +0.68 | 0.68 | 0.00 | range (attacks) |
| 11 | Xayah | +0.65 | 0.97 | 0.32 | range (attacks) |
| 12 | Corki | +0.65 | 0.65 | 0.00 | range (attacks) |
| 13 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 14 | Yunara | +0.64 | 0.72 | 0.08 | range (attacks) |
| 15 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 16 | Miss Fortune | +0.59 | 0.65 | 0.06 | range (attacks) |
| 17 | Vladimir | +0.57 | 0.66 | 0.09 |  |
| 18 | Aurora | +0.56 | 0.78 | 0.22 | range (attacks) |
| 19 | Twisted Fate | +0.55 | 0.86 | 0.31 | range (attacks) |
| 20 | Samira | +0.55 | 0.76 | 0.21 | range (attacks) |
| 21 | Vayne | +0.52 | 0.86 | 0.34 | range (attacks) |
| 22 | Milio | +0.50 | 0.83 | 0.33 | range (attacks) |
| 23 | Smolder | +0.48 | 0.65 | 0.17 | range (attacks) |
| 24 | Kog'Maw | +0.48 | 0.54 | 0.06 | range (attacks) |
| 25 | Graves | +0.43 | 0.49 | 0.06 |  |
| 26 | Draven | +0.38 | 0.72 | 0.34 | range (attacks) |
| 27 | Quinn | +0.35 | 0.77 | 0.42 | range (attacks) |
| 28 | Caitlyn | +0.35 | 0.72 | 0.37 | range (attacks) |
| 29 | Master Yi | +0.35 | 0.35 | 0.00 |  |
| 30 | Mel | +0.34 | 0.67 | 0.33 | range (attacks) |
| 31 | Nasus | +0.34 | 0.39 | 0.05 |  |
| 32 | Karthus | +0.33 | 0.39 | 0.06 |  |
| 33 | Elise | +0.32 | 0.65 | 0.33 | range (attacks) |
| 34 | Kennen | +0.32 | 0.58 | 0.26 | range (attacks) |
| 35 | Zilean | +0.30 | 0.65 | 0.35 | range (attacks) |
| 36 | Zoe | +0.30 | 0.65 | 0.35 | range (attacks) |
| 37 | Senna | +0.28 | 0.65 | 0.37 | range (attacks) |
| 38 | Jayce | +0.24 | 0.61 | 0.37 | range (attacks) |
| 39 | Jinx | +0.22 | 0.58 | 0.36 | range (attacks) |
| 40 | Lux | +0.22 | 0.58 | 0.36 | range (attacks) |
| 41 | LeBlanc | +0.22 | 0.44 | 0.22 |  |
| 42 | Vex | +0.21 | 0.53 | 0.32 | range (attacks) |
| 43 | Lulu | +0.20 | 1.08 | 0.88 | range (attacks) |
| 44 | Annie | +0.18 | 0.44 | 0.26 |  |
| 45 | Katarina | +0.18 | 0.18 | 0.00 |  |
| 46 | Xerath | +0.16 | 0.53 | 0.37 | range (attacks) |
| 47 | Ryze | +0.15 | 0.48 | 0.33 |  |
| 48 | Soraka | +0.14 | 0.53 | 0.39 | range (attacks) |
| 49 | Gwen | +0.14 | 0.28 | 0.14 |  |
| 50 | Zed | +0.14 | 0.20 | 0.06 |  |
| 51 | Viktor | +0.13 | 0.65 | 0.52 | range (attacks) |
| 52 | Veigar | +0.13 | 0.48 | 0.35 |  |
| 53 | Vel'Koz | +0.12 | 0.53 | 0.41 | range (attacks) |
| 54 | Jhin | +0.10 | 0.53 | 0.43 | range (attacks) |
| 55 | Ahri | +0.10 | 0.44 | 0.34 |  |
| 56 | Fiora | +0.09 | 0.35 | 0.26 |  |
| 57 | Ziggs | +0.08 | 0.53 | 0.45 | range (attacks) |
| 58 | Jax | +0.08 | 0.41 | 0.33 | attack dodge (Counter Strike) |
| 59 | Brand | +0.06 | 0.44 | 0.38 |  |
| 60 | Syndra | +0.05 | 0.44 | 0.39 |  |
| 61 | Swain | +0.04 | 0.42 | 0.38 |  |
| 62 | Sona | +0.03 | 0.83 | 0.80 | range (attacks) |
| 63 | Ashe | +0.02 | 0.72 | 0.70 | range (attacks) |
| 64 | Bard | 0.00 | 0.92 | 0.92 | range (attacks) |
| 65 | Varus | 0.00 | 0.71 | 0.71 | range (attacks) |
| 66 | Garen | 0.00 | 0.12 | 0.12 |  |
| 67 | Karma | -0.02 | 0.44 | 0.46 |  |
| 68 | Fiddlesticks | -0.02 | 0.39 | 0.41 |  |
| 69 | Gnar | -0.03 | 0.66 | 0.69 | range (attacks) |
| 70 | Ivern | -0.05 | 0.38 | 0.43 |  |
| 71 | Talon | -0.05 | 0.00 | 0.05 |  |
| 72 | Heimerdinger | -0.06 | 0.45 | 0.51 |  |
| 73 | Akali | -0.06 | 0.00 | 0.06 |  |
| 74 | Dr. Mundo | -0.06 | 0.00 | 0.06 |  |
| 75 | Illaoi | -0.06 | 0.00 | 0.06 |  |
| 76 | Tryndamere | -0.06 | 0.00 | 0.06 |  |
| 77 | Anivia | -0.07 | 0.48 | 0.55 |  |
| 78 | Kha'Zix | -0.07 | 0.00 | 0.07 |  |
| 79 | Gangplank | -0.10 | 0.07 | 0.17 |  |
| 80 | Hwei | -0.11 | 0.46 | 0.57 |  |
| 81 | Tristana | -0.12 | 0.72 | 0.84 | range (attacks) |
| 82 | Shen | -0.12 | 0.39 | 0.51 |  |
| 83 | Nocturne | -0.12 | 0.34 | 0.46 |  |
| 84 | Singed | -0.12 | 0.27 | 0.39 |  |
| 85 | Kayn | -0.13 | 0.20 | 0.33 |  |
| 86 | Rek'Sai | -0.13 | 0.20 | 0.33 |  |
| 87 | Evelynn | -0.14 | 0.20 | 0.34 |  |
| 88 | Kassadin | -0.15 | 0.00 | 0.15 |  |
| 89 | Aphelios | -0.16 | 0.82 | 0.98 | range (attacks) |
| 90 | Locke | -0.17 | 0.00 | 0.17 |  |
| 91 | Rumble | -0.17 | 0.00 | 0.17 |  |
| 92 | Shaco | -0.19 | 0.20 | 0.39 |  |
| 93 | Nilah | -0.20 | 0.60 | 0.80 |  |
| 94 | Thresh | -0.21 | 0.39 | 0.60 |  |
| 95 | Pantheon | -0.21 | 0.28 | 0.49 |  |
| 96 | Renata Glasc | -0.22 | 0.77 | 0.99 | range (attacks) |
| 97 | Naafiri | -0.23 | 0.00 | 0.23 |  |
| 98 | Morgana | -0.25 | 0.47 | 0.72 |  |
| 99 | Rengar | -0.25 | 0.08 | 0.33 |  |
| 100 | Ekko | -0.26 | 0.00 | 0.26 |  |
| 101 | Janna | -0.27 | 0.72 | 0.99 | range (attacks) |
| 102 | Kalista | -0.29 | 0.69 | 0.98 | range (attacks) |
| 103 | Azir | -0.30 | 0.53 | 0.83 | range (attacks) |
| 104 | Orianna | -0.30 | 0.53 | 0.83 | range (attacks) |
| 105 | Irelia | -0.30 | 0.10 | 0.40 |  |
| 106 | Mordekaiser | -0.30 | 0.09 | 0.39 |  |
| 107 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 108 | Lissandra | -0.34 | 0.64 | 0.98 |  |
| 109 | Taric | -0.34 | 0.00 | 0.34 |  |
| 110 | Udyr | -0.37 | 0.11 | 0.48 |  |
| 111 | Bel'Veth | -0.37 | 0.00 | 0.37 |  |
| 112 | Yorick | -0.37 | 0.00 | 0.37 |  |
| 113 | Seraphine | -0.39 | 0.58 | 0.97 | range (attacks) |
| 114 | Malzahar | -0.39 | 0.47 | 0.86 |  |
| 115 | Cho'Gath | -0.39 | 0.00 | 0.39 |  |
| 116 | Darius | -0.39 | 0.00 | 0.39 |  |
| 117 | Trundle | -0.39 | 0.00 | 0.39 |  |
| 118 | Nunu & Willump | -0.42 | 0.13 | 0.55 |  |
| 119 | Aatrox | -0.42 | 0.00 | 0.42 |  |
| 120 | Cassiopeia | -0.43 | 0.44 | 0.87 |  |
| 121 | Fizz | -0.43 | 0.42 | 0.85 |  |
| 122 | Zaahen | -0.45 | 0.05 | 0.50 |  |
| 123 | Zyra | -0.49 | 0.48 | 0.97 |  |
| 124 | Shyvana | -0.51 | 0.00 | 0.51 |  |
| 125 | Sylas | -0.51 | 0.00 | 0.51 |  |
| 126 | Nami | -0.52 | 0.44 | 0.96 |  |
| 127 | Neeko | -0.53 | 0.44 | 0.97 |  |
| 128 | Aurelion Sol | -0.56 | 0.44 | 1.00 |  |
| 129 | Blitzcrank | -0.56 | 0.00 | 0.56 |  |
| 130 | Alistar | -0.59 | 0.04 | 0.63 |  |
| 131 | Lillia | -0.61 | 0.22 | 0.83 |  |
| 132 | Volibear | -0.61 | 0.00 | 0.61 |  |
| 133 | Yasuo | -0.64 | 0.16 | 0.80 |  |
| 134 | Pyke | -0.64 | 0.00 | 0.64 |  |
| 135 | Riven | -0.66 | 0.00 | 0.66 |  |
| 136 | Urgot | -0.67 | 0.30 | 0.97 |  |
| 137 | Taliyah | -0.68 | 0.53 | 1.21 | range (attacks) |
| 138 | Braum | -0.71 | 0.23 | 0.94 |  |
| 139 | Lee Sin | -0.71 | 0.00 | 0.71 |  |
| 140 | Maokai | -0.76 | 0.37 | 1.13 |  |
| 141 | Rammus | -0.77 | 0.38 | 1.15 |  |
| 142 | Malphite | -0.79 | 0.25 | 1.04 |  |
| 143 | Rakan | -0.79 | 0.25 | 1.04 |  |
| 144 | Xin Zhao | -0.79 | 0.20 | 0.99 |  |
| 145 | Sion | -0.79 | 0.06 | 0.85 |  |
| 146 | Diana | -0.80 | 0.00 | 0.80 |  |
| 147 | Wukong | -0.80 | 0.00 | 0.80 |  |
| 148 | Kled | -0.85 | 0.31 | 1.16 |  |
| 149 | Skarner | -0.88 | 0.06 | 0.94 |  |
| 150 | Qiyana | -0.97 | 0.00 | 0.97 |  |
| 151 | Leona | -0.98 | 0.00 | 0.98 |  |
| 152 | Gragas | -1.00 | 0.00 | 1.00 |  |
| 153 | Poppy | -1.00 | 0.00 | 1.00 |  |
| 154 | Ambessa | -1.02 | 0.00 | 1.02 |  |
| 155 | Viego | -1.04 | 0.19 | 1.23 |  |
| 156 | Camille | -1.05 | 0.20 | 1.25 |  |
| 157 | Warwick | -1.05 | 0.05 | 1.10 |  |
| 158 | Amumu | -1.05 | 0.00 | 1.05 |  |
| 159 | Nautilus | -1.06 | 0.00 | 1.06 |  |
| 160 | Tahm Kench | -1.07 | 0.00 | 1.07 |  |
| 161 | Zac | -1.12 | 0.00 | 1.12 |  |
| 162 | Sejuani | -1.13 | 0.00 | 1.13 |  |
| 163 | Sett | -1.17 | 0.00 | 1.17 |  |
| 164 | Jarvan IV | -1.19 | 0.00 | 1.19 |  |
| 165 | Hecarim | -1.21 | 0.00 | 1.21 |  |
| 166 | Rell | -1.22 | 0.00 | 1.22 |  |
| 167 | Yone | -1.22 | 0.00 | 1.22 |  |
| 168 | Vi | -1.23 | 0.00 | 1.23 |  |
| 169 | Briar | -1.24 | 0.00 | 1.24 |  |
| 170 | Ornn | -1.28 | 0.00 | 1.28 |  |
| 171 | Galio | -1.31 | 0.00 | 1.31 |  |
| 172 | K'Sante | -1.33 | 0.00 | 1.33 |  |
