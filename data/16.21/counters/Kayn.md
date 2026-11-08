# Counters to Kayn (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Kayn: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Kayn wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Kayn --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.88 | +1.00 | +1.00 | +1.00 | +0.28 | – | +1.00 |
| 2 | K'Sante | +0.87 | +1.00 | +1.00 | +1.00 | +0.23 | – | +1.00 |
| 3 | Kayle | +0.86 | +1.00 | +1.00 | +1.00 | +0.37 | +1.00 | +0.00 |
| 4 | Kog'Maw | +0.85 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | +0.00 |
| 5 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | +0.04 | – | +1.00 |
| 6 | Sivir | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 7 | Quinn | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 8 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 9 | Aphelios | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 10 | Annie | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 11 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.00 |
| 12 | Yunara | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 13 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 14 | Aurora | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 15 | Malphite | +0.81 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.00 |
| 16 | Graves | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 17 | Gnar | +0.81 | +1.00 | +0.98 | +1.00 | +0.12 | +1.00 | +0.00 |
| 18 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.13 | – | +1.00 |
| 19 | Akshan | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 20 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 21 | Ashe | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.07 |
| 22 | Malzahar | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 23 | Riven | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.00 |
| 24 | Twisted Fate | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 25 | Rakan | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 26 | Kalista | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 27 | Neeko | +0.81 | +1.00 | +0.98 | +0.98 | +0.09 | +1.00 | +0.00 |
| 28 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 29 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 30 | Sylas | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 31 | Warwick | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 32 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 33 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 34 | Viego | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 35 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 36 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 37 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 38 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 39 | Lee Sin | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 40 | Ivern | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 41 | Tahm Kench | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 42 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 43 | Diana | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 44 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 45 | Alistar | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 46 | Sett | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 47 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 48 | Shyvana | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 49 | Mordekaiser | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 50 | Sion | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 51 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 52 | Udyr | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 53 | Gragas | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 54 | Braum | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 55 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 56 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 57 | Camille | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 58 | Rammus | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 59 | Singed | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 60 | Yone | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 61 | Zac | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 62 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 63 | Cho'Gath | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 64 | Aatrox | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 65 | Lulu | +0.76 | +1.00 | +1.00 | +1.00 | +0.08 | +0.46 | +0.00 |
| 66 | Xin Zhao | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 67 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 68 | Milio | +0.72 | +0.99 | +0.88 | +0.78 | +0.05 | +0.87 | +0.00 |
| 69 | Karma | +0.69 | +0.51 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 70 | Wukong | +0.68 | +1.00 | +1.00 | +0.35 | +0.28 | – | +0.00 |
| 71 | Jinx | +0.68 | +0.74 | +0.78 | +0.98 | +0.14 | +0.77 | +0.00 |
| 72 | Lux | +0.67 | +0.80 | +0.83 | +0.89 | +0.08 | +0.75 | +0.00 |
| 73 | Orianna | +0.65 | +1.00 | +1.00 | +1.00 | +0.12 | −0.72 | +0.00 |
| 74 | Akali | +0.64 | +0.82 | +0.72 | +0.93 | +0.06 | – | +0.00 |
| 75 | Urgot | +0.63 | +1.00 | +1.00 | +1.00 | +0.23 | −1.00 | +0.00 |
| 76 | Elise | +0.62 | +1.00 | +1.00 | +1.00 | +0.17 | −1.00 | +0.00 |
| 77 | Kennen | +0.61 | +1.00 | +1.00 | +1.00 | −0.09 | −0.72 | +0.00 |
| 78 | Irelia | +0.58 | +0.67 | +0.95 | +0.42 | +0.23 | – | +0.00 |
| 79 | Corki | +0.58 | +0.07 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 80 | Hwei | +0.57 | +0.93 | +0.85 | +0.10 | +0.06 | +0.90 | +0.00 |
| 81 | Nilah | +0.56 | +1.00 | +1.00 | +0.00 | +0.02 | – | +0.00 |
| 82 | Zeri | +0.54 | +0.52 | +1.00 | +0.52 | +0.06 | +0.52 | +0.00 |
| 83 | Bard | +0.53 | +0.86 | +0.86 | +1.00 | −0.02 | −0.91 | +0.00 |
| 84 | Shen | +0.53 | +0.19 | +1.00 | +0.84 | +0.09 | – | +0.00 |
| 85 | Garen | +0.51 | +1.00 | −0.06 | +1.00 | +0.18 | – | +0.00 |
| 86 | Xayah | +0.51 | −0.27 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 87 | Zilean | +0.51 | −0.13 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 88 | Lillia | +0.44 | +0.05 | +0.81 | +0.60 | +0.01 | +1.00 | +0.00 |
| 89 | Pantheon | +0.40 | +1.00 | +1.00 | −0.78 | +0.13 | – | +0.00 |
| 90 | Ambessa | +0.39 | +1.00 | +1.00 | −0.82 | +0.11 | – | +0.00 |
| 91 | Rumble | +0.37 | −0.40 | +1.00 | +0.96 | −0.05 | – | +0.00 |
| 92 | Kassadin | +0.36 | +1.00 | +1.00 | −0.82 | −0.06 | – | +0.00 |
| 93 | Bel'Veth | +0.33 | −0.62 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 94 | Shaco | +0.32 | +0.90 | +0.90 | −0.89 | +0.07 | – | +0.00 |
| 95 | Tristana | +0.30 | −1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 96 | Ezreal | +0.27 | +0.05 | +0.14 | +0.56 | +0.09 | +0.94 | +0.00 |
| 97 | Cassiopeia | +0.24 | +0.90 | −0.66 | +1.00 | +0.32 | −0.66 | +0.00 |
| 98 | Brand | +0.24 | −0.39 | +0.81 | +0.94 | +0.09 | −0.64 | +0.00 |
| 99 | Smolder | +0.20 | +0.08 | +0.54 | +0.08 | +0.15 | +0.08 | +0.00 |
| 100 | Leona | +0.18 | +0.71 | −0.66 | +0.82 | −0.11 | – | +0.00 |
| 101 | Fizz | +0.17 | +0.57 | −0.72 | +1.00 | −0.07 | – | +0.00 |
| 102 | Rengar | +0.17 | +0.13 | +0.13 | +0.13 | +0.41 | – | +0.00 |
| 103 | Lucian | +0.14 | −1.00 | +1.00 | +1.00 | +0.17 | −0.82 | +0.00 |
| 104 | Heimerdinger | +0.14 | +0.69 | +0.56 | −1.00 | +0.34 | −0.26 | +0.00 |
| 105 | Vel'Koz | +0.11 | −0.48 | +0.99 | −0.64 | +0.24 | +0.71 | +0.00 |
| 106 | Kai'Sa | +0.09 | −0.82 | +1.00 | −0.10 | +0.03 | +0.63 | +0.00 |
| 107 | Samira | +0.08 | +0.05 | −0.95 | +1.00 | +0.04 | +1.00 | +0.00 |
| 108 | Anivia | +0.01 | −0.11 | +0.11 | +0.12 | −0.12 | +0.03 | +0.00 |
| 109 | Nocturne | +0.00 | −0.07 | −0.07 | −0.07 | −0.01 | – | +1.00 |
| 110 | Mel | −0.06 | +0.79 | −0.31 | −0.84 | +0.01 | −0.10 | +0.00 |
| 111 | Jhin | −0.11 | −0.94 | +1.00 | −0.84 | +0.24 | +0.01 | +0.00 |
| 112 | Ziggs | −0.13 | −0.79 | −1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 113 | Morgana | −0.13 | −1.00 | −0.01 | +0.96 | +0.11 | −0.84 | +0.00 |
| 114 | Nautilus | −0.14 | −0.86 | −0.93 | +1.00 | +0.05 | +1.00 | +0.00 |
| 115 | Rell | −0.19 | −0.43 | −0.43 | −0.43 | +0.06 | +1.00 | +0.00 |
| 116 | Rek'Sai | −0.20 | −0.97 | +1.00 | −0.97 | +0.02 | – | +0.00 |
| 117 | Varus | −0.21 | −0.71 | +1.00 | −0.99 | +0.02 | −0.84 | +0.00 |
| 118 | Vex | −0.25 | +0.13 | −0.89 | +0.00 | +0.08 | −0.74 | +0.00 |
| 119 | Swain | −0.28 | −0.26 | −0.23 | −0.80 | +0.19 | −0.26 | +0.00 |
| 120 | Amumu | −0.29 | −1.00 | +0.76 | −1.00 | −0.00 | – | +0.00 |
| 121 | Nami | −0.30 | −0.86 | +0.46 | −0.86 | +0.12 | −0.47 | +0.00 |
| 122 | Ryze | −0.34 | −0.80 | −0.99 | +0.86 | +0.08 | −0.80 | +0.00 |
| 123 | Kindred | −0.40 | −0.32 | −0.85 | −0.85 | +0.09 | +0.50 | +0.00 |
| 124 | Senna | −0.44 | −0.59 | −0.06 | −1.00 | +0.14 | −1.00 | +0.00 |
| 125 | Viktor | −0.48 | −0.84 | −0.84 | +0.09 | −0.01 | −0.78 | +0.00 |
| 126 | Draven | −0.50 | −0.26 | −0.84 | −0.84 | +0.18 | −0.84 | +0.00 |
| 127 | Zoe | −0.51 | −0.53 | −0.54 | −1.00 | +0.05 | −0.53 | +0.00 |
| 128 | Zyra | −0.57 | −1.00 | −0.10 | −1.00 | −0.01 | −0.92 | +0.00 |
| 129 | Miss Fortune | −0.59 | −0.25 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 130 | Azir | −0.62 | −0.69 | −0.69 | −1.00 | +0.07 | −0.84 | +0.00 |
| 131 | Nidalee | −0.62 | −0.31 | −0.97 | −1.00 | −0.03 | −0.99 | +0.00 |
| 132 | Jarvan IV | −0.68 | −0.90 | −0.90 | −0.80 | −0.01 | – | +0.00 |
| 133 | Janna | −0.68 | −0.85 | −1.00 | −1.00 | +0.21 | −0.51 | +0.00 |
| 134 | Soraka | −0.70 | −1.00 | −0.80 | −0.75 | −0.01 | −1.00 | +0.00 |
| 135 | Syndra | −0.71 | −0.99 | −0.84 | −1.00 | +0.12 | −0.69 | +0.00 |
| 136 | Sejuani | −0.73 | −0.99 | −0.90 | −0.90 | −0.00 | – | +0.00 |
| 137 | Skarner | −0.73 | −0.91 | −0.91 | −0.91 | −0.13 | – | +0.00 |
| 138 | Aurelion Sol | −0.73 | −1.00 | −1.00 | −1.00 | +0.44 | −1.00 | +0.00 |
| 139 | Evelynn | −0.74 | −1.00 | −1.00 | −1.00 | +0.23 | – | +0.00 |
| 140 | Master Yi | −0.74 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +1.00 |
| 141 | Vi | −0.75 | −0.94 | −0.94 | −0.94 | −0.10 | – | +0.00 |
| 142 | Nunu & Willump | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 143 | LeBlanc | −0.76 | −1.00 | −0.81 | −1.00 | −0.03 | −1.00 | +0.00 |
| 144 | Briar | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 145 | Hecarim | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 146 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 147 | Galio | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 148 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.21 | −0.99 | +0.00 |
| 149 | Naafiri | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 150 | Twitch | −0.77 | −0.93 | −0.99 | −1.00 | +0.04 | −0.99 | +0.00 |
| 151 | Locke | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 152 | Caitlyn | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 153 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | −0.85 | +0.00 |
| 154 | Seraphine | −0.78 | −0.99 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 155 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 156 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 157 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 158 | Ekko | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 159 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 160 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 161 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 162 | Qiyana | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 163 | Veigar | −0.79 | −0.99 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 164 | Karthus | −0.80 | −1.00 | −0.99 | −1.00 | +0.01 | −1.00 | +0.00 |
| 165 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 166 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 167 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 168 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 169 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 170 | Sona | −0.80 | −1.00 | −0.99 | −1.00 | −0.02 | −1.00 | +0.00 |
| 171 | Pyke | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 172 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Kayn's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kayn's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kayn` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Singed (net +1.37)

- **0.45** interrupt: Fling's airborne interrupts Kayn's Umbral Trespass (movement channel). Fling must land during the channel. (Singed E Fling → Kayn R Umbral Trespass)
- **0.44** grounding: Mega Adhesive grounds Kayn, who then can't cast Umbral Trespass. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Kayn R Umbral Trespass)
- **0.39** grounding: Mega Adhesive grounds Kayn, who then can't cast Reaping Slash. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Kayn Q Reaping Slash)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Singed's Fling.

#### 2. Rell (net +1.08)

- **0.45** interrupt: Ferromancy: Crash Down's airborne interrupts Kayn's Umbral Trespass (movement channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Kayn R Umbral Trespass)
- **0.45** interrupt: Ferromancy: Mount Up's airborne interrupts Kayn's Umbral Trespass (movement channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Kayn R Umbral Trespass)
- **0.45** interrupt: Full Tilt's stun interrupts Kayn's Umbral Trespass (movement channel). Full Tilt must land during the channel. (Rell E Full Tilt → Kayn R Umbral Trespass)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Rell's Magnet Storm.

#### 3. Sivir (net +0.99)

- **0.49** spell shield: Spell Shield's spell shield blocks Kayn's Blade's Reach. Spell shield for 1.5 s, long enough to use ahead of Blade's Reach. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kayn W Blade's Reach)
- **0.45** spell shield: Spell Shield's spell shield blocks part of Kayn's Umbral Trespass. Spell shield for 1.5 s, long enough to use ahead of Umbral Trespass. A spell shield blocks only the first enemy ability that reaches it. If Umbral Trespass is targeted on an enemy with a spell shield or a Fiora with her Riposte active, the ability will fail to cast entirely, being placed on full cooldown without triggering the active's effects (as well as on-cast effects).
  - Spell shield will not block the damage from the recast. (Sivir E Spell Shield → Kayn R Umbral Trespass)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Kayn's (500 vs 175 attack range). Kayn closes the gap with Reaping Slash, Umbral Trespass. (Sivir basic attacks → Kayn basic attacks)

#### 4. Blitzcrank (net +0.82)

- **0.45** interrupt: Power Fist's airborne interrupts Kayn's Umbral Trespass (movement channel). Power Fist must land during the channel. (Blitzcrank E Power Fist → Kayn R Umbral Trespass)
- **0.45** interrupt: Rocket Grab's airborne interrupts Kayn's Umbral Trespass (movement channel). Rocket Grab must land during the channel. (Blitzcrank Q Rocket Grab → Kayn R Umbral Trespass)
- **0.45** interrupt: Static Field's silence interrupts Kayn's Umbral Trespass (movement channel). Static Field must land during the channel. (Blitzcrank R Static Field → Kayn R Umbral Trespass)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Blitzcrank's Rocket Grab.

#### 5. Kayle (net +0.65)

- **0.45** invulnerable: Divine Judgment makes Kayle invulnerable to Kayn's Umbral Trespass (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Umbral Trespass. (Kayle R Divine Judgment → Kayn R Umbral Trespass)
- **0.24** range: Kayle's basic attacks reach 450 units farther than Kayn's (625 vs 175 attack range). Kayn closes the gap with Reaping Slash, Umbral Trespass. (Kayle basic attacks → Kayn basic attacks)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Kayn's Blade's Reach (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Blade's Reach. (Kayle R Divine Judgment → Kayn W Blade's Reach)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Kayle's Starfire Spellblade.

#### 6. Fiora (net +0.62)

- **0.62** parry: Riposte parries Kayn's Blade's Reach and stuns back. Parry for 0.75 s; Blade's Reach takes 0.55 s to land, enough to react. Negating Blade's Reach's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Kayn W Blade's Reach)
- **0.54** parry: Riposte parries Kayn's Umbral Trespass. Parry for 0.75 s; Umbral Trespass lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Kayn R Umbral Trespass)
- **0.06** attack speed slow: Riposte cuts Kayn's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Kayn basic attacks)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Fiora's Riposte.

#### 7. Lulu (net +0.60)

- **0.45** interrupt: Whimsy's polymorph interrupts Kayn's Umbral Trespass (movement channel). Whimsy must land during the channel. (Lulu W Whimsy → Kayn R Umbral Trespass)
- **0.45** interrupt: Wild Growth's airborne interrupts Kayn's Umbral Trespass (movement channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Kayn R Umbral Trespass)
- **0.22** disarm: Whimsy disarms Kayn for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Kayn basic attacks)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Lulu's Wild Growth.

#### 8. Heimerdinger (net +0.58)

- **0.45** interrupt: CH-2 Electron Storm Grenade's stun interrupts Kayn's Umbral Trespass (movement channel). CH-2 Electron Storm Grenade must land during the channel. (Heimerdinger E CH-2 Electron Storm Grenade → Kayn R Umbral Trespass)
- **0.45** interrupt: CH-3X Lightning Grenade's stun interrupts Kayn's Umbral Trespass (movement channel). CH-3X Lightning Grenade must land during the channel. (Heimerdinger E CH-3X Lightning Grenade → Kayn R Umbral Trespass)
- **0.12** range: Heimerdinger's basic attacks reach 375 units farther than Kayn's (550 vs 175 attack range). Kayn closes the gap with Reaping Slash, Umbral Trespass. (Heimerdinger basic attacks → Kayn basic attacks)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Heimerdinger's CH-2 Electron Storm Grenade.

#### 9. Udyr (net +0.58)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Kayn's Blade's Reach (airborne, slow). Immune for 1.5 s, long enough to use ahead of Blade's Reach. (Udyr E Blazing Stampede → Kayn W Blade's Reach)
- **0.45** interrupt: Blazing Stampede's stun interrupts Kayn's Umbral Trespass (movement channel). Blazing Stampede must land during the channel. (Udyr E Blazing Stampede → Kayn R Umbral Trespass)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Udyr's Blazing Stampede.

#### 10. Alistar (net +0.56)

- **0.45** interrupt: Pulverize's airborne interrupts Kayn's Umbral Trespass (movement channel). Pulverize must land during the channel. (Alistar Q Pulverize → Kayn R Umbral Trespass)
- **0.45** interrupt: Trample's stun interrupts Kayn's Umbral Trespass (movement channel). Trample must land during the channel. (Alistar E Trample → Kayn R Umbral Trespass)
- **0.26** cleanse: Unbreakable Will cleanses Kayn's Blade's Reach (airborne, slow) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Kayn W Blade's Reach)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Alistar's Headbutt.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Singed | +1.37 | 1.80 | 0.43 | grounding (Mega Adhesive) |
| 2 | Rell | +1.08 | 2.25 | 1.17 |  |
| 3 | Sivir | +0.99 | 0.99 | 0.00 |  |
| 4 | Blitzcrank | +0.82 | 1.35 | 0.53 |  |
| 5 | Kayle | +0.65 | 0.77 | 0.12 |  |
| 6 | Fiora | +0.62 | 0.91 | 0.29 |  |
| 7 | Lulu | +0.60 | 1.23 | 0.63 |  |
| 8 | Heimerdinger | +0.58 | 1.09 | 0.51 |  |
| 9 | Udyr | +0.58 | 0.93 | 0.35 |  |
| 10 | Alistar | +0.56 | 1.16 | 0.60 |  |
| 11 | Anivia | +0.45 | 1.06 | 0.61 |  |
| 12 | Malzahar | +0.43 | 1.46 | 1.03 |  |
| 13 | Viktor | +0.43 | 1.21 | 0.78 |  |
| 14 | Gnar | +0.43 | 1.09 | 0.66 |  |
| 15 | Milio | +0.43 | 0.76 | 0.33 |  |
| 16 | Sion | +0.42 | 1.07 | 0.65 |  |
| 17 | Zilean | +0.42 | 0.65 | 0.23 |  |
| 18 | Shaco | +0.37 | 0.92 | 0.55 |  |
| 19 | Riven | +0.37 | 0.90 | 0.53 |  |
| 20 | Nocturne | +0.35 | 1.35 | 1.00 |  |
| 21 | Fizz | +0.35 | 1.29 | 0.94 |  |
| 22 | Xayah | +0.35 | 0.78 | 0.43 |  |
| 23 | Vladimir | +0.34 | 0.85 | 0.51 |  |
| 24 | Zoe | +0.30 | 0.65 | 0.35 |  |
| 25 | Soraka | +0.26 | 0.62 | 0.36 |  |
| 26 | Yasuo | +0.25 | 0.90 | 0.65 |  |
| 27 | Master Yi | +0.25 | 0.74 | 0.49 |  |
| 28 | Cassiopeia | +0.24 | 1.21 | 0.97 | grounding (Miasma) |
| 29 | Camille | +0.24 | 1.10 | 0.86 |  |
| 30 | Taric | +0.24 | 0.45 | 0.21 |  |
| 31 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 32 | Aurelion Sol | +0.21 | 0.99 | 0.78 |  |
| 33 | Vayne | +0.20 | 0.72 | 0.52 |  |
| 34 | Sejuani | +0.19 | 1.32 | 1.13 |  |
| 35 | Cho'Gath | +0.19 | 0.90 | 0.71 |  |
| 36 | Jayce | +0.19 | 0.63 | 0.44 |  |
| 37 | Thresh | +0.18 | 1.01 | 0.83 |  |
| 38 | Yorick | +0.17 | 0.45 | 0.28 |  |
| 39 | Twisted Fate | +0.16 | 0.70 | 0.54 |  |
| 40 | Quinn | +0.16 | 0.67 | 0.51 |  |
| 41 | Twitch | +0.16 | 0.27 | 0.11 |  |
| 42 | Sett | +0.14 | 0.94 | 0.80 |  |
| 43 | Aurora | +0.14 | 0.64 | 0.50 |  |
| 44 | Maokai | +0.13 | 1.25 | 1.12 |  |
| 45 | Elise | +0.13 | 0.65 | 0.52 |  |
| 46 | Olaf | +0.13 | 0.33 | 0.20 |  |
| 47 | Bard | +0.12 | 0.97 | 0.85 |  |
| 48 | Zaahen | +0.11 | 1.23 | 1.12 |  |
| 49 | Vex | +0.11 | 0.81 | 0.70 |  |
| 50 | Kai'Sa | +0.11 | 0.22 | 0.11 |  |
| 51 | Sylas | +0.10 | 0.45 | 0.35 |  |
| 52 | K'Sante | +0.09 | 1.42 | 1.33 |  |
| 53 | Renata Glasc | +0.09 | 1.07 | 0.98 |  |
| 54 | Veigar | +0.08 | 0.73 | 0.65 |  |
| 55 | Gwen | +0.08 | 0.63 | 0.55 |  |
| 56 | Teemo | +0.06 | 0.50 | 0.44 |  |
| 57 | Kindred | +0.06 | 0.27 | 0.21 |  |
| 58 | Xin Zhao | +0.05 | 1.09 | 1.04 |  |
| 59 | Yuumi | +0.05 | 1.01 | 0.96 |  |
| 60 | Braum | +0.05 | 0.85 | 0.80 |  |
| 61 | Kalista | +0.04 | 0.68 | 0.64 |  |
| 62 | Aatrox | +0.03 | 0.45 | 0.42 |  |
| 63 | Urgot | +0.02 | 0.98 | 0.96 |  |
| 64 | Lissandra | +0.02 | 0.92 | 0.90 |  |
| 65 | Rek'Sai | +0.01 | 1.08 | 1.07 |  |
| 66 | Seraphine | +0.01 | 0.98 | 0.97 |  |
| 67 | Ashe | +0.01 | 0.69 | 0.68 |  |
| 68 | Rengar | 0.00 | 0.53 | 0.53 |  |
| 69 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 70 | Nilah | -0.01 | 0.67 | 0.68 |  |
| 71 | Nami | -0.02 | 0.99 | 1.01 |  |
| 72 | Janna | -0.04 | 1.07 | 1.11 |  |
| 73 | Nidalee | -0.04 | 0.18 | 0.22 |  |
| 74 | Leona | -0.05 | 0.90 | 0.95 |  |
| 75 | Kennen | -0.05 | 0.63 | 0.68 |  |
| 76 | Shyvana | -0.05 | 0.49 | 0.54 |  |
| 77 | Nasus | -0.05 | 0.24 | 0.29 |  |
| 78 | Jinx | -0.06 | 0.45 | 0.51 |  |
| 79 | Garen | -0.07 | 0.57 | 0.64 |  |
| 80 | Draven | -0.08 | 0.67 | 0.75 |  |
| 81 | Morgana | -0.09 | 0.63 | 0.72 |  |
| 82 | Hwei | -0.10 | 0.73 | 0.83 |  |
| 83 | Ziggs | -0.10 | 0.62 | 0.72 |  |
| 84 | Kassadin | -0.10 | 0.45 | 0.55 |  |
| 85 | Zed | -0.10 | 0.44 | 0.54 |  |
| 86 | Corki | -0.10 | 0.20 | 0.30 |  |
| 87 | Kog'Maw | -0.10 | 0.16 | 0.26 |  |
| 88 | Fiddlesticks | -0.11 | 1.01 | 1.12 |  |
| 89 | Amumu | -0.11 | 0.94 | 1.05 |  |
| 90 | Rakan | -0.11 | 0.93 | 1.04 |  |
| 91 | Kled | -0.12 | 1.04 | 1.16 |  |
| 92 | Bel'Veth | -0.12 | 0.45 | 0.57 |  |
| 93 | Dr. Mundo | -0.12 | 0.00 | 0.12 |  |
| 94 | Varus | -0.13 | 0.66 | 0.79 |  |
| 95 | Zac | -0.14 | 1.48 | 1.62 |  |
| 96 | Katarina | -0.14 | 0.48 | 0.62 |  |
| 97 | Ahri | -0.15 | 0.72 | 0.87 |  |
| 98 | Yone | -0.16 | 1.06 | 1.22 |  |
| 99 | Annie | -0.16 | 0.60 | 0.76 |  |
| 100 | Vel'Koz | -0.17 | 0.61 | 0.78 |  |
| 101 | Brand | -0.17 | 0.59 | 0.76 |  |
| 102 | Syndra | -0.17 | 0.59 | 0.76 |  |
| 103 | Samira | -0.18 | 0.18 | 0.36 |  |
| 104 | Warwick | -0.20 | 1.18 | 1.38 |  |
| 105 | Sona | -0.20 | 0.66 | 0.86 |  |
| 106 | Mordekaiser | -0.20 | 0.51 | 0.71 |  |
| 107 | Renekton | -0.20 | 0.45 | 0.65 |  |
| 108 | Swain | -0.21 | 0.57 | 0.78 |  |
| 109 | Gangplank | -0.21 | 0.44 | 0.65 |  |
| 110 | LeBlanc | -0.21 | 0.13 | 0.34 |  |
| 111 | Tahm Kench | -0.22 | 1.35 | 1.57 |  |
| 112 | Poppy | -0.22 | 0.97 | 1.19 | dash stop (Steadfast Presence) |
| 113 | Tristana | -0.22 | 0.64 | 0.86 |  |
| 114 | Xerath | -0.22 | 0.61 | 0.83 |  |
| 115 | Jax | -0.23 | 0.57 | 0.80 |  |
| 116 | Lee Sin | -0.23 | 0.45 | 0.68 |  |
| 117 | Zeri | -0.23 | 0.28 | 0.51 |  |
| 118 | Galio | -0.24 | 1.23 | 1.47 |  |
| 119 | Wukong | -0.24 | 0.42 | 0.66 |  |
| 120 | Rammus | -0.26 | 1.14 | 1.40 |  |
| 121 | Taliyah | -0.27 | 1.42 | 1.69 |  |
| 122 | Gragas | -0.28 | 0.90 | 1.18 |  |
| 123 | Evelynn | -0.29 | 0.92 | 1.21 |  |
| 124 | Shen | -0.30 | 0.69 | 0.99 |  |
| 125 | Orianna | -0.30 | 0.61 | 0.91 |  |
| 126 | Darius | -0.31 | 0.45 | 0.76 |  |
| 127 | Irelia | -0.31 | 0.45 | 0.76 |  |
| 128 | Karma | -0.31 | 0.13 | 0.44 |  |
| 129 | Azir | -0.32 | 0.58 | 0.90 |  |
| 130 | Trundle | -0.32 | 0.45 | 0.77 |  |
| 131 | Pyke | -0.34 | 0.90 | 1.24 |  |
| 132 | Ornn | -0.36 | 0.92 | 1.28 |  |
| 133 | Skarner | -0.36 | 0.51 | 0.87 |  |
| 134 | Lillia | -0.37 | 0.43 | 0.80 |  |
| 135 | Lux | -0.38 | 0.18 | 0.56 |  |
| 136 | Zyra | -0.39 | 0.58 | 0.97 |  |
| 137 | Kha'Zix | -0.40 | 0.00 | 0.40 |  |
| 138 | Diana | -0.41 | 0.45 | 0.86 |  |
| 139 | Neeko | -0.43 | 0.56 | 0.99 |  |
| 140 | Ezreal | -0.46 | 0.20 | 0.66 |  |
| 141 | Graves | -0.46 | 0.14 | 0.60 |  |
| 142 | Smolder | -0.47 | 0.20 | 0.67 |  |
| 143 | Ivern | -0.50 | 0.11 | 0.61 |  |
| 144 | Miss Fortune | -0.53 | 0.20 | 0.73 |  |
| 145 | Malphite | -0.54 | 0.60 | 1.14 |  |
| 146 | Nautilus | -0.54 | 0.45 | 0.99 |  |
| 147 | Talon | -0.54 | 0.00 | 0.54 |  |
| 148 | Viego | -0.55 | 0.94 | 1.49 |  |
| 149 | Mel | -0.55 | 0.17 | 0.72 |  |
| 150 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 151 | Nunu & Willump | -0.56 | 0.55 | 1.11 |  |
| 152 | Illaoi | -0.56 | 0.07 | 0.63 |  |
| 153 | Volibear | -0.58 | 0.52 | 1.10 |  |
| 154 | Senna | -0.58 | 0.22 | 0.80 |  |
| 155 | Pantheon | -0.59 | 0.57 | 1.16 |  |
| 156 | Ambessa | -0.60 | 0.40 | 1.00 |  |
| 157 | Ryze | -0.65 | 0.15 | 0.80 |  |
| 158 | Vi | -0.66 | 0.91 | 1.57 |  |
| 159 | Akshan | -0.67 | 0.19 | 0.86 |  |
| 160 | Hecarim | -0.69 | 0.44 | 1.13 |  |
| 161 | Aphelios | -0.69 | 0.31 | 1.00 |  |
| 162 | Lucian | -0.72 | 0.21 | 0.93 |  |
| 163 | Karthus | -0.72 | 0.11 | 0.83 |  |
| 164 | Jarvan IV | -0.73 | 0.45 | 1.18 |  |
| 165 | Qiyana | -0.73 | 0.36 | 1.09 |  |
| 166 | Locke | -0.74 | 0.00 | 0.74 |  |
| 167 | Caitlyn | -0.76 | 0.24 | 1.00 |  |
| 168 | Briar | -0.79 | 0.45 | 1.24 |  |
| 169 | Akali | -0.83 | 0.00 | 0.83 |  |
| 170 | Ekko | -0.87 | 0.00 | 0.87 |  |
| 171 | Jhin | -0.90 | 0.17 | 1.07 |  |
| 172 | Naafiri | -1.35 | 0.00 | 1.35 |  |
