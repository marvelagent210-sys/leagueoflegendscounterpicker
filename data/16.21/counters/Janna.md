# Counters to Janna (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Janna: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Janna wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Janna --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Rengar | +0.88 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.76 |
| 2 | Fiora | +0.86 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +1.00 |
| 3 | Poppy | +0.85 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.43 |
| 4 | Gangplank | +0.85 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.94 |
| 5 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +1.00 |
| 6 | Zeri | +0.84 | +1.00 | +1.00 | +1.00 | +0.06 | – | +1.00 |
| 7 | Kayle | +0.84 | +1.00 | +1.00 | +1.00 | +0.38 | – | +0.01 |
| 8 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +1.00 |
| 9 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.96 |
| 10 | Warwick | +0.83 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.51 |
| 11 | Lee Sin | +0.83 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.51 |
| 12 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.98 |
| 13 | Shyvana | +0.83 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.99 |
| 14 | Nasus | +0.83 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.83 |
| 15 | Diana | +0.82 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.22 |
| 16 | Kled | +0.82 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.49 |
| 17 | Zaahen | +0.82 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.34 |
| 18 | Camille | +0.82 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.88 |
| 19 | Fizz | +0.82 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.55 |
| 20 | Volibear | +0.82 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.85 |
| 21 | Sylas | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | −0.18 |
| 22 | Ashe | +0.82 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.71 |
| 23 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.85 |
| 24 | Tristana | +0.81 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.21 |
| 25 | Nocturne | +0.81 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.78 |
| 26 | Gragas | +0.81 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.40 |
| 27 | Dr. Mundo | +0.81 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.41 |
| 28 | Zed | +0.81 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.58 |
| 29 | Pantheon | +0.81 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.13 |
| 30 | Irelia | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.01 |
| 31 | Udyr | +0.81 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.72 |
| 32 | Ambessa | +0.80 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.46 |
| 33 | Ziggs | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | −0.00 |
| 34 | Braum | +0.80 | +0.99 | +1.00 | +1.00 | −0.04 | +1.00 | +0.21 |
| 35 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.19 |
| 36 | Kassadin | +0.80 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.45 |
| 37 | Annie | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.18 |
| 38 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.35 |
| 39 | Viego | +0.80 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.33 |
| 40 | Renekton | +0.80 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.31 |
| 41 | Smolder | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.17 |
| 42 | Neeko | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | −0.07 |
| 43 | Miss Fortune | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.21 |
| 44 | Sejuani | +0.79 | +0.94 | +1.00 | +1.00 | −0.08 | +1.00 | +0.43 |
| 45 | Sona | +0.79 | +0.95 | +1.00 | +1.00 | +0.00 | – | +0.50 |
| 46 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.38 |
| 47 | Samira | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.08 |
| 48 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.04 |
| 49 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.26 |
| 50 | Sion | +0.79 | +0.91 | +1.00 | +1.00 | −0.09 | +1.00 | +0.48 |
| 51 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | −0.08 |
| 52 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +0.91 | +0.15 |
| 53 | Mordekaiser | +0.79 | +0.95 | +0.98 | +1.00 | −0.16 | +1.00 | +0.53 |
| 54 | Rumble | +0.79 | +0.98 | +0.94 | +1.00 | −0.13 | +0.94 | +0.60 |
| 55 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.01 |
| 56 | Caitlyn | +0.78 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | −0.20 |
| 57 | Zilean | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.20 |
| 58 | Swain | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.08 |
| 59 | Vi | +0.78 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +0.29 |
| 60 | Yunara | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.01 |
| 61 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.02 |
| 62 | Jinx | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 63 | Aurora | +0.78 | +0.99 | +1.00 | +0.88 | +0.04 | – | +0.39 |
| 64 | Orianna | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.02 |
| 65 | Akshan | +0.78 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.21 |
| 66 | Cassiopeia | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.01 |
| 67 | Varus | +0.78 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.06 |
| 68 | Kindred | +0.77 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.28 |
| 69 | Xayah | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.03 |
| 70 | Malzahar | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.04 |
| 71 | Kalista | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.07 |
| 72 | Cho'Gath | +0.77 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | −0.13 |
| 73 | Jhin | +0.77 | +1.00 | +1.00 | +1.00 | +0.00 | – | −0.11 |
| 74 | Teemo | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.05 |
| 75 | Shaco | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | −0.09 |
| 76 | Draven | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | −0.08 |
| 77 | Olaf | +0.76 | +1.00 | +1.00 | +1.00 | −0.15 | +0.47 | +0.69 |
| 78 | Kai'Sa | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 79 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.12 |
| 80 | Twisted Fate | +0.75 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.19 |
| 81 | Kennen | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 82 | Quinn | +0.75 | +1.00 | +1.00 | +1.00 | −0.13 | – | −0.10 |
| 83 | Yasuo | +0.75 | +1.00 | +0.99 | +1.00 | −0.08 | +0.56 | +0.12 |
| 84 | Kayn | +0.74 | +1.00 | +0.89 | +1.00 | −0.16 | +0.73 | +0.30 |
| 85 | Zoe | +0.70 | +1.00 | +1.00 | +0.50 | −0.02 | +1.00 | +0.03 |
| 86 | Gnar | +0.67 | +1.00 | +1.00 | +1.00 | −0.12 | −0.07 | +0.01 |
| 87 | Gwen | +0.66 | +0.60 | +0.94 | +1.00 | −0.28 | +0.96 | +0.34 |
| 88 | Malphite | +0.66 | +1.00 | +1.00 | +0.19 | +0.00 | +1.00 | +0.38 |
| 89 | Bard | +0.66 | +0.84 | +0.85 | +1.00 | −0.17 | – | −0.08 |
| 90 | Heimerdinger | +0.65 | +1.00 | +0.55 | +1.00 | +0.03 | +0.55 | −0.01 |
| 91 | Mel | +0.64 | +1.00 | +1.00 | +0.24 | +0.06 | – | +0.30 |
| 92 | Riven | +0.60 | +1.00 | +1.00 | +1.00 | −0.19 | −1.00 | +0.66 |
| 93 | Milio | +0.57 | +1.00 | +0.20 | +1.00 | +0.09 | – | +0.00 |
| 94 | Galio | +0.55 | +0.50 | +0.50 | +1.00 | −0.08 | +1.00 | +0.27 |
| 95 | Lucian | +0.53 | +1.00 | +0.15 | +1.00 | −0.12 | – | +0.05 |
| 96 | Zac | +0.50 | +1.00 | +0.12 | +0.95 | −0.22 | +0.78 | −0.29 |
| 97 | Tahm Kench | +0.48 | +0.24 | +0.57 | +0.98 | −0.06 | +0.96 | −0.07 |
| 98 | Hwei | +0.42 | +0.83 | +0.07 | +0.80 | −0.03 | – | −0.05 |
| 99 | Hecarim | +0.41 | +1.00 | +1.00 | −1.00 | −0.04 | +1.00 | +0.27 |
| 100 | Jarvan IV | +0.41 | +1.00 | −0.66 | +1.00 | −0.10 | +1.00 | +0.73 |
| 101 | Xin Zhao | +0.39 | +1.00 | −0.05 | +1.00 | −0.12 | −0.16 | −0.28 |
| 102 | Karma | +0.37 | +0.64 | −0.07 | +0.96 | +0.00 | – | −0.01 |
| 103 | Sett | +0.36 | +1.00 | −0.71 | +1.00 | −0.18 | +1.00 | +0.25 |
| 104 | Nilah | +0.33 | +0.18 | +0.22 | +1.00 | −0.11 | +0.22 | +0.58 |
| 105 | Lillia | +0.30 | −0.03 | +0.39 | +0.72 | −0.06 | +0.56 | +0.39 |
| 106 | Darius | +0.29 | −1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.23 |
| 107 | Garen | +0.29 | +1.00 | −1.00 | +1.00 | −0.10 | +1.00 | +0.11 |
| 108 | Azir | +0.28 | +1.00 | −0.76 | +1.00 | −0.05 | – | +0.05 |
| 109 | Aatrox | +0.24 | −0.18 | +0.34 | +1.00 | −0.23 | +0.42 | −0.17 |
| 110 | Anivia | +0.24 | +0.36 | +0.27 | +0.30 | −0.10 | – | +0.21 |
| 111 | Nidalee | +0.13 | +0.46 | −0.70 | +1.00 | −0.06 | – | −0.21 |
| 112 | Rell | +0.11 | +1.00 | −1.00 | +1.00 | +0.06 | −1.00 | +0.11 |
| 113 | Nautilus | +0.11 | +0.16 | −0.81 | +0.94 | +0.05 | +0.72 | +0.18 |
| 114 | Briar | +0.10 | +0.18 | +1.00 | −0.32 | −0.31 | −1.00 | +0.22 |
| 115 | Wukong | +0.09 | +1.00 | −1.00 | +1.00 | −0.26 | −0.93 | +0.40 |
| 116 | Rek'Sai | +0.08 | +1.00 | −1.00 | +1.00 | −0.15 | −1.00 | +0.02 |
| 117 | Leona | +0.07 | +0.59 | −0.80 | +1.00 | −0.08 | −0.80 | +0.34 |
| 118 | Rammus | +0.06 | −0.09 | −0.04 | −0.08 | −0.06 | +1.00 | +0.43 |
| 119 | Illaoi | +0.02 | −1.00 | +0.37 | +1.00 | −0.10 | −0.10 | −0.00 |
| 120 | Ezreal | +0.01 | −0.19 | −0.15 | +0.47 | −0.01 | – | −0.00 |
| 121 | Taric | −0.01 | +0.04 | −0.12 | +0.07 | +0.01 | −0.11 | −0.00 |
| 122 | Ornn | −0.11 | −0.14 | −0.14 | −0.05 | −0.09 | −0.23 | +0.13 |
| 123 | Vel'Koz | −0.12 | +1.00 | −0.83 | −0.55 | +0.27 | −0.89 | −0.05 |
| 124 | Locke | −0.16 | −1.00 | −0.74 | +0.97 | −0.12 | +0.89 | +0.30 |
| 125 | Yone | −0.17 | −0.17 | −0.17 | −0.17 | −0.26 | −0.17 | +0.10 |
| 126 | Twitch | −0.20 | +1.00 | −0.87 | −1.00 | −0.05 | – | −0.08 |
| 127 | Seraphine | −0.21 | −0.95 | −0.46 | +0.86 | −0.03 | – | −0.13 |
| 128 | Karthus | −0.23 | −0.30 | −0.25 | −0.34 | −0.01 | −0.19 | +0.00 |
| 129 | Amumu | −0.25 | +0.11 | −0.62 | −1.00 | −0.05 | +0.66 | +0.42 |
| 130 | Ahri | −0.25 | −1.00 | −0.69 | +1.00 | −0.09 | – | +0.17 |
| 131 | Sivir | −0.33 | −1.00 | −1.00 | +1.00 | −0.07 | – | +0.35 |
| 132 | Elise | −0.35 | −1.00 | −1.00 | +1.00 | −0.08 | – | +0.00 |
| 133 | Viktor | −0.35 | −1.00 | −1.00 | +1.00 | −0.08 | – | +0.01 |
| 134 | Morgana | −0.41 | −1.00 | −1.00 | +1.00 | −0.04 | −1.00 | +0.00 |
| 135 | Zyra | −0.41 | −1.00 | −1.00 | +1.00 | −0.01 | −1.00 | −0.10 |
| 136 | Rakan | −0.41 | −1.00 | −1.00 | +1.00 | −0.16 | −0.93 | +0.09 |
| 137 | Skarner | −0.42 | −1.00 | −1.00 | +0.95 | −0.07 | −1.00 | +0.00 |
| 138 | Evelynn | −0.42 | −1.00 | −0.15 | −1.00 | −0.02 | +0.70 | −0.03 |
| 139 | Singed | −0.42 | −1.00 | −1.00 | +1.00 | −0.16 | −1.00 | +0.00 |
| 140 | Ekko | −0.43 | −1.00 | −1.00 | +1.00 | −0.17 | −1.00 | −0.18 |
| 141 | Ryze | −0.44 | −0.96 | −0.78 | +0.42 | −0.05 | −0.78 | −0.14 |
| 142 | Akali | −0.47 | −0.51 | −0.94 | −0.47 | −0.06 | −0.03 | +0.06 |
| 143 | Urgot | −0.47 | −1.00 | −1.00 | +0.72 | −0.04 | −1.00 | −0.17 |
| 144 | Brand | −0.53 | −1.00 | −1.00 | +0.45 | −0.09 | −1.00 | −0.08 |
| 145 | Graves | −0.53 | −0.81 | −1.00 | −1.00 | +0.10 | +1.00 | +0.07 |
| 146 | Kha'Zix | −0.58 | −1.00 | −1.00 | −1.00 | −0.03 | +1.00 | +0.53 |
| 147 | Lux | −0.61 | −0.96 | −1.00 | −0.28 | −0.01 | – | −0.04 |
| 148 | Shen | −0.61 | −1.00 | −1.00 | −0.08 | −0.09 | −1.00 | +0.32 |
| 149 | Aurelion Sol | −0.64 | −1.00 | −1.00 | −1.00 | +0.43 | −0.06 | −0.06 |
| 150 | Xerath | −0.67 | −0.45 | −1.00 | −1.00 | −0.01 | −1.00 | −0.08 |
| 151 | Qiyana | −0.71 | −1.00 | −1.00 | −1.00 | −0.17 | +0.07 | +0.23 |
| 152 | Nunu & Willump | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.40 |
| 153 | Lissandra | −0.76 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.25 |
| 154 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.02 |
| 155 | Vex | −0.77 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.18 |
| 156 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.07 |
| 157 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.04 |
| 158 | Nami | −0.78 | −0.98 | −1.00 | −1.00 | −0.00 | – | −0.20 |
| 159 | Renata Glasc | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.19 |
| 160 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.12 |
| 161 | Talon | −0.80 | −1.00 | −0.94 | −1.00 | −0.19 | −0.94 | +0.13 |
| 162 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.30 |
| 163 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 164 | Alistar | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.12 |
| 165 | Fiddlesticks | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.34 |
| 166 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.14 |
| 167 | Veigar | −0.81 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.16 |
| 168 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.14 |
| 169 | Naafiri | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.13 |
| 170 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 171 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.04 |
| 172 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.02 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Janna's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Janna's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Janna` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Rell (net +1.78)

- **0.40** interrupt: Ferromancy: Crash Down's airborne interrupts Janna's Monsoon (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Janna R Monsoon)
- **0.40** interrupt: Ferromancy: Mount Up's airborne interrupts Janna's Monsoon (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Janna R Monsoon)
- **0.40** interrupt: Full Tilt's stun interrupts Janna's Monsoon (normal channel). Full Tilt must land during the channel. (Rell E Full Tilt → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 375 units farther than Rell's (550 vs 175 attack range).

#### 2. Nocturne (net +1.50)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Janna's Monsoon. Spell shield for 1.5 s, long enough to use ahead of Monsoon. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Janna R Monsoon)
- **0.70** spell shield: Shroud of Darkness's spell shield blocks Janna's Howling Gale. Spell shield for 1.5 s, long enough to use ahead of Howling Gale. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Janna Q Howling Gale)
- **0.40** interrupt: Unspeakable Horror's fear interrupts Janna's Monsoon (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

#### 3. Braum (net +1.48)

- **0.70** projectile block: Unbreakable blocks Janna's Howling Gale, a projectile. Unbreakable for 4 s, long enough to use ahead of Howling Gale. (Braum E Unbreakable → Janna Q Howling Gale)
- **0.50** projectile block: Unbreakable blocks Janna's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Janna basic attacks)
- **0.40** interrupt: Concussive Blows's stun interrupts Janna's Monsoon (normal channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 4. Yasuo (net +1.47)

- **0.63** projectile block: Wind Wall blocks Janna's Howling Gale, a projectile. Wind Wall for 4 s, long enough to use ahead of Howling Gale. (Yasuo W Wind Wall → Janna Q Howling Gale)
- **0.40** interrupt: Last Breath's airborne interrupts Janna's Monsoon (normal channel). Last Breath must land during the channel. (Yasuo R Last Breath → Janna R Monsoon)
- **0.40** interrupt: Steel Tempest's airborne interrupts Janna's Monsoon (normal channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 5. Fizz (net +1.27)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Janna's Howling Gale. Untargetable for 0.75 s; Howling Gale takes 1.25 s to land, enough to react. (Fizz E Playful → Janna Q Howling Gale)
- **0.48** untargetable: Playful makes Fizz untargetable, dodging Janna's Monsoon. Untargetable for 0.75 s; Monsoon lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Janna R Monsoon)
- **0.40** interrupt: Chum the Waters's airborne interrupts Janna's Monsoon (normal channel). Chum the Waters must land during the channel. (Fizz R Chum the Waters → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 6. Zaahen (net +1.25)

- **0.48** cc immunity: Grim Deliverance makes Zaahen immune to Janna's Monsoon (airborne). Immune for ?; Monsoon lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Zaahen R Grim Deliverance → Janna R Monsoon)
- **0.40** interrupt: Dreaded Return's airborne interrupts Janna's Monsoon (normal channel). Dreaded Return must land during the channel. (Zaahen W Dreaded Return → Janna R Monsoon)
- **0.40** interrupt: The Darkin Glaive's airborne interrupts Janna's Monsoon (normal channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 375 units farther than Zaahen's (550 vs 175 attack range).

#### 7. K'Sante (net +1.25)

- **0.40** interrupt: All Out's airborne interrupts Janna's Monsoon (normal channel). All Out must land during the channel. (K'Sante R All Out → Janna R Monsoon)
- **0.40** interrupt: Ntofo Strikes's airborne interrupts Janna's Monsoon (normal channel). Ntofo Strikes must land during the channel. (K'Sante Q Ntofo Strikes → Janna R Monsoon)
- **0.40** interrupt: Path Maker's airborne interrupts Janna's Monsoon (normal channel). Path Maker must land during the channel. (K'Sante W Path Maker → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 400 units farther than K'Sante's (550 vs 150 attack range).

#### 8. Alistar (net +1.23)

- **0.64** cleanse: Unbreakable Will cleanses Janna's Monsoon (airborne) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Janna R Monsoon)
- **0.40** interrupt: Pulverize's airborne interrupts Janna's Monsoon (normal channel). Pulverize must land during the channel. (Alistar Q Pulverize → Janna R Monsoon)
- **0.40** interrupt: Trample's stun interrupts Janna's Monsoon (normal channel). Trample must land during the channel. (Alistar E Trample → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 425 units farther than Alistar's (550 vs 125 attack range).

#### 9. Rek'Sai (net +1.23)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Janna's Monsoon. Untargetable for 1.5 s, long enough to use ahead of Monsoon. (Rek'Sai R Void Rush → Janna R Monsoon)
- **0.40** interrupt: Unburrow's airborne interrupts Janna's Monsoon (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Janna R Monsoon)
- **0.35** untargetable: Void Rush makes Rek'Sai untargetable, dodging Janna's Howling Gale. Untargetable for 1.5 s, long enough to use ahead of Howling Gale. (Rek'Sai R Void Rush → Janna Q Howling Gale)
- Watch out: Janna's basic attacks reach 375 units farther than Rek'Sai's (550 vs 175 attack range).

#### 10. Sivir (net +1.17)

- **0.80** spell shield: Spell Shield's spell shield blocks Janna's Monsoon. Spell shield for 1.5 s, long enough to use ahead of Monsoon. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Janna R Monsoon)
- **0.61** spell shield: Spell Shield's spell shield blocks Janna's Howling Gale. Spell shield for 1.5 s, long enough to use ahead of Howling Gale. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Janna Q Howling Gale)
- **0.27** spell shield: Spell Shield's spell shield blocks Janna's Zephyr. Spell shield for 1.5 s, long enough to use ahead of Zephyr. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Janna W Zephyr)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +1.78 | 2.00 | 0.22 |  |
| 2 | Nocturne | +1.50 | 1.86 | 0.36 |  |
| 3 | Braum | +1.48 | 1.84 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Yasuo | +1.47 | 1.69 | 0.22 | projectile block (Wind Wall) |
| 5 | Fizz | +1.27 | 1.44 | 0.17 |  |
| 6 | Zaahen | +1.25 | 1.47 | 0.22 |  |
| 7 | K'Sante | +1.25 | 1.43 | 0.18 |  |
| 8 | Alistar | +1.23 | 1.59 | 0.36 |  |
| 9 | Rek'Sai | +1.23 | 1.45 | 0.22 |  |
| 10 | Sivir | +1.17 | 1.17 | 0.00 |  |
| 11 | Bard | +1.11 | 1.11 | 0.00 |  |
| 12 | Lissandra | +1.11 | 1.11 | 0.00 |  |
| 13 | Maokai | +1.06 | 1.42 | 0.36 |  |
| 14 | Camille | +1.03 | 1.21 | 0.18 |  |
| 15 | Xayah | +1.02 | 1.02 | 0.00 |  |
| 16 | Kled | +0.99 | 1.13 | 0.14 |  |
| 17 | Lulu | +0.97 | 0.97 | 0.00 |  |
| 18 | Morgana | +0.96 | 1.14 | 0.18 |  |
| 19 | Udyr | +0.90 | 1.26 | 0.36 |  |
| 20 | Vladimir | +0.90 | 1.20 | 0.30 |  |
| 21 | Evelynn | +0.87 | 1.11 | 0.24 |  |
| 22 | Shaco | +0.87 | 1.11 | 0.24 |  |
| 23 | Yone | +0.86 | 1.03 | 0.17 |  |
| 24 | Heimerdinger | +0.85 | 0.85 | 0.00 |  |
| 25 | Sejuani | +0.84 | 1.20 | 0.36 |  |
| 26 | Kalista | +0.83 | 0.83 | 0.00 |  |
| 27 | Ornn | +0.81 | 1.03 | 0.22 |  |
| 28 | Anivia | +0.80 | 0.80 | 0.00 |  |
| 29 | Gnar | +0.80 | 0.80 | 0.00 |  |
| 30 | Nami | +0.80 | 0.80 | 0.00 |  |
| 31 | Viktor | +0.80 | 0.80 | 0.00 |  |
| 32 | Renata Glasc | +0.78 | 0.78 | 0.00 |  |
| 33 | Fiora | +0.76 | 1.12 | 0.36 |  |
| 34 | Samira | +0.76 | 0.76 | 0.00 | projectile block (Blade Whirl) |
| 35 | Seraphine | +0.76 | 0.76 | 0.00 |  |
| 36 | Thresh | +0.74 | 0.80 | 0.06 |  |
| 37 | Aurora | +0.73 | 0.73 | 0.00 |  |
| 38 | Mel | +0.72 | 0.72 | 0.00 | projectile block (Rebuttal) |
| 39 | Aurelion Sol | +0.67 | 0.80 | 0.13 |  |
| 40 | Tristana | +0.67 | 0.67 | 0.00 |  |
| 41 | Rakan | +0.65 | 0.80 | 0.15 |  |
| 42 | Malzahar | +0.64 | 1.39 | 0.75 |  |
| 43 | Vex | +0.63 | 0.63 | 0.00 |  |
| 44 | Sion | +0.62 | 1.50 | 0.88 |  |
| 45 | Urgot | +0.62 | 0.80 | 0.18 |  |
| 46 | Xin Zhao | +0.57 | 0.91 | 0.34 |  |
| 47 | Gwen | +0.56 | 0.92 | 0.36 |  |
| 48 | Sett | +0.56 | 0.92 | 0.36 |  |
| 49 | Riven | +0.56 | 0.80 | 0.24 |  |
| 50 | Blitzcrank | +0.48 | 1.20 | 0.72 |  |
| 51 | Annie | +0.48 | 0.48 | 0.00 |  |
| 52 | Teemo | +0.47 | 0.47 | 0.00 | blind (Blinding Dart) |
| 53 | Viego | +0.46 | 0.92 | 0.46 |  |
| 54 | Zed | +0.46 | 0.70 | 0.24 |  |
| 55 | Milio | +0.46 | 0.46 | 0.00 |  |
| 56 | Amumu | +0.44 | 0.80 | 0.36 |  |
| 57 | Leona | +0.44 | 0.80 | 0.36 |  |
| 58 | Nilah | +0.44 | 0.73 | 0.29 |  |
| 59 | Rammus | +0.42 | 1.16 | 0.74 |  |
| 60 | Malphite | +0.40 | 0.76 | 0.36 |  |
| 61 | Ahri | +0.40 | 0.40 | 0.00 |  |
| 62 | Ashe | +0.40 | 0.40 | 0.00 |  |
| 63 | Azir | +0.40 | 0.40 | 0.00 |  |
| 64 | Brand | +0.40 | 0.40 | 0.00 |  |
| 65 | Cassiopeia | +0.40 | 0.40 | 0.00 |  |
| 66 | Draven | +0.40 | 0.40 | 0.00 |  |
| 67 | Elise | +0.40 | 0.40 | 0.00 |  |
| 68 | Hwei | +0.40 | 0.40 | 0.00 |  |
| 69 | Jayce | +0.40 | 0.40 | 0.00 |  |
| 70 | Kennen | +0.40 | 0.40 | 0.00 |  |
| 71 | Neeko | +0.40 | 0.40 | 0.00 |  |
| 72 | Orianna | +0.40 | 0.40 | 0.00 |  |
| 73 | Sona | +0.40 | 0.40 | 0.00 |  |
| 74 | Soraka | +0.40 | 0.40 | 0.00 |  |
| 75 | Swain | +0.40 | 0.40 | 0.00 |  |
| 76 | Syndra | +0.40 | 0.40 | 0.00 |  |
| 77 | Vayne | +0.40 | 0.40 | 0.00 |  |
| 78 | Veigar | +0.40 | 0.40 | 0.00 |  |
| 79 | Ziggs | +0.40 | 0.40 | 0.00 |  |
| 80 | Zilean | +0.40 | 0.40 | 0.00 |  |
| 81 | Zoe | +0.40 | 0.40 | 0.00 |  |
| 82 | Zyra | +0.40 | 0.40 | 0.00 |  |
| 83 | Volibear | +0.39 | 0.63 | 0.24 |  |
| 84 | Kayle | +0.37 | 0.37 | 0.00 |  |
| 85 | Master Yi | +0.36 | 0.99 | 0.63 |  |
| 86 | Pyke | +0.35 | 0.80 | 0.45 |  |
| 87 | Jarvan IV | +0.35 | 0.52 | 0.17 |  |
| 88 | Hecarim | +0.30 | 0.52 | 0.22 |  |
| 89 | Olaf | +0.27 | 0.99 | 0.72 |  |
| 90 | Zac | +0.24 | 1.20 | 0.96 |  |
| 91 | Jax | +0.23 | 0.59 | 0.36 |  |
| 92 | Sylas | +0.23 | 0.40 | 0.17 |  |
| 93 | Gangplank | +0.22 | 0.94 | 0.72 |  |
| 94 | Rengar | +0.22 | 0.94 | 0.72 |  |
| 95 | Briar | +0.22 | 0.40 | 0.18 |  |
| 96 | Taliyah | +0.20 | 1.16 | 0.96 |  |
| 97 | Gragas | +0.20 | 0.80 | 0.60 |  |
| 98 | Wukong | +0.18 | 0.40 | 0.22 |  |
| 99 | Lillia | +0.18 | 0.38 | 0.20 |  |
| 100 | Yuumi | +0.17 | 1.05 | 0.88 |  |
| 101 | Varus | +0.17 | 0.32 | 0.15 |  |
| 102 | Singed | +0.16 | 0.88 | 0.72 |  |
| 103 | Shyvana | +0.16 | 0.52 | 0.36 |  |
| 104 | Ambessa | +0.16 | 0.40 | 0.24 |  |
| 105 | Bel'Veth | +0.16 | 0.40 | 0.24 |  |
| 106 | Lee Sin | +0.16 | 0.40 | 0.24 |  |
| 107 | Vi | +0.13 | 0.92 | 0.79 |  |
| 108 | Qiyana | +0.12 | 0.36 | 0.24 |  |
| 109 | Tahm Kench | +0.11 | 1.20 | 1.09 |  |
| 110 | Quinn | +0.09 | 0.40 | 0.31 |  |
| 111 | Cho'Gath | +0.08 | 0.80 | 0.72 |  |
| 112 | Irelia | +0.08 | 0.40 | 0.32 |  |
| 113 | Aatrox | +0.06 | 0.40 | 0.34 |  |
| 114 | Nautilus | +0.06 | 0.40 | 0.34 |  |
| 115 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 116 | Warwick | +0.04 | 1.41 | 1.37 |  |
| 117 | Kayn | +0.04 | 1.11 | 1.07 |  |
| 118 | Diana | +0.04 | 0.40 | 0.36 |  |
| 119 | Kassadin | +0.04 | 0.40 | 0.36 |  |
| 120 | Renekton | +0.04 | 0.40 | 0.36 |  |
| 121 | Fiddlesticks | 0.00 | 0.80 | 0.80 |  |
| 122 | Corki | 0.00 | 0.00 | 0.00 |  |
| 123 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 124 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 125 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 126 | Karma | 0.00 | 0.00 | 0.00 |  |
| 127 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 128 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 129 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 130 | Lux | 0.00 | 0.00 | 0.00 |  |
| 131 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 132 | Senna | 0.00 | 0.00 | 0.00 |  |
| 133 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 134 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 135 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 136 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 137 | Graves | -0.07 | 0.00 | 0.07 |  |
| 138 | Vel'Koz | -0.12 | 0.40 | 0.52 |  |
| 139 | Illaoi | -0.13 | 0.23 | 0.36 |  |
| 140 | Mordekaiser | -0.19 | 0.49 | 0.68 |  |
| 141 | Garen | -0.21 | 0.47 | 0.68 |  |
| 142 | Xerath | -0.22 | 0.40 | 0.62 |  |
| 143 | Galio | -0.24 | 1.13 | 1.37 |  |
| 144 | Akali | -0.24 | 0.00 | 0.24 |  |
| 145 | Ekko | -0.24 | 0.00 | 0.24 |  |
| 146 | Talon | -0.24 | 0.00 | 0.24 |  |
| 147 | Skarner | -0.26 | 0.46 | 0.72 |  |
| 148 | Ivern | -0.26 | 0.00 | 0.26 |  |
| 149 | Darius | -0.28 | 0.40 | 0.68 |  |
| 150 | Trundle | -0.28 | 0.40 | 0.68 |  |
| 151 | Yorick | -0.28 | 0.40 | 0.68 |  |
| 152 | Twisted Fate | -0.30 | 0.40 | 0.70 |  |
| 153 | Taric | -0.32 | 0.40 | 0.72 |  |
| 154 | Tryndamere | -0.34 | 0.00 | 0.34 |  |
| 155 | Poppy | -0.36 | 0.40 | 0.76 |  |
| 156 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 157 | Caitlyn | -0.36 | 0.18 | 0.54 |  |
| 158 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 159 | Locke | -0.36 | 0.00 | 0.36 |  |
| 160 | Shen | -0.38 | 0.76 | 1.14 |  |
| 161 | Katarina | -0.50 | 0.32 | 0.82 |  |
| 162 | Akshan | -0.51 | 0.00 | 0.51 |  |
| 163 | Jhin | -0.54 | 0.00 | 0.54 |  |
| 164 | Lucian | -0.54 | 0.00 | 0.54 |  |
| 165 | Miss Fortune | -0.56 | 0.00 | 0.56 |  |
| 166 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 167 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 168 | Rumble | -0.72 | 0.00 | 0.72 |  |
| 169 | Karthus | -0.74 | 0.00 | 0.74 |  |
| 170 | Pantheon | -0.82 | 0.37 | 1.19 |  |
| 171 | Naafiri | -1.03 | 0.00 | 1.03 |  |
| 172 | Nunu & Willump | -1.10 | 0.46 | 1.56 |  |
