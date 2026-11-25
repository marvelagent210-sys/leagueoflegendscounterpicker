# Counters to Shaco (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Shaco: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Shaco wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Shaco --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.86 | +1.00 | +1.00 | +1.00 | +0.35 | +1.00 | +0.10 |
| 2 | Kog'Maw | +0.84 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | −0.06 |
| 3 | Miss Fortune | +0.84 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.22 |
| 4 | Orianna | +0.84 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.24 |
| 5 | Gangplank | +0.84 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.57 |
| 6 | Ashe | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | −0.01 |
| 7 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.49 |
| 8 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.92 |
| 9 | Gnar | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.01 |
| 10 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.31 |
| 11 | Garen | +0.83 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.28 |
| 12 | Udyr | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.47 |
| 13 | Urgot | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.03 |
| 14 | Teemo | +0.83 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.15 |
| 15 | Lulu | +0.83 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.12 |
| 16 | Aurora | +0.83 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.12 |
| 17 | Fiora | +0.82 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.73 |
| 18 | Gragas | +0.82 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.37 |
| 19 | Samira | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.13 |
| 20 | Master Yi | +0.82 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.93 |
| 21 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.24 |
| 22 | Heimerdinger | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.03 |
| 23 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.62 |
| 24 | Kalista | +0.82 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.26 |
| 25 | Aphelios | +0.82 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | −0.31 |
| 26 | Corki | +0.82 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | −0.15 |
| 27 | Rell | +0.82 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.14 |
| 28 | Yunara | +0.82 | +0.96 | +1.00 | +1.00 | +0.22 | +0.97 | −0.05 |
| 29 | Ornn | +0.82 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.12 |
| 30 | Ambessa | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.31 |
| 31 | Warwick | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.35 |
| 32 | Riven | +0.81 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.23 |
| 33 | Malphite | +0.81 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.26 |
| 34 | Azir | +0.81 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.21 |
| 35 | Camille | +0.81 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.71 |
| 36 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.25 |
| 37 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.72 |
| 38 | Sivir | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | −0.02 |
| 39 | Jarvan IV | +0.81 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.48 |
| 40 | Shen | +0.81 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.11 |
| 41 | Diana | +0.81 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.21 |
| 42 | Nilah | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.01 |
| 43 | Nocturne | +0.81 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.65 |
| 44 | Swain | +0.81 | +0.97 | +1.00 | +1.00 | +0.10 | +0.97 | +0.04 |
| 45 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.16 |
| 46 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.44 |
| 47 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.06 |
| 48 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.24 |
| 49 | Amumu | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.35 |
| 50 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.40 |
| 51 | Rek'Sai | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.29 |
| 52 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.04 |
| 53 | Irelia | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.18 |
| 54 | Singed | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.07 |
| 55 | Volibear | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.03 |
| 56 | Skarner | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.15 |
| 57 | Zac | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.23 |
| 58 | Zed | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.26 |
| 59 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.15 |
| 60 | Rammus | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.26 |
| 61 | Lee Sin | +0.79 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.13 |
| 62 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.14 |
| 63 | Taric | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.12 |
| 64 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.05 |
| 65 | Sion | +0.78 | +0.97 | +1.00 | +1.00 | −0.08 | – | +0.49 |
| 66 | Pantheon | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.06 |
| 67 | Mordekaiser | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.04 |
| 68 | Alistar | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.04 |
| 69 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.15 |
| 70 | Bel'Veth | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.03 |
| 71 | Tahm Kench | +0.78 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.16 |
| 72 | Maokai | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.09 |
| 73 | Braum | +0.78 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.13 |
| 74 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.06 |
| 75 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.03 |
| 76 | Viego | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.02 |
| 77 | Cho'Gath | +0.77 | +1.00 | +1.00 | +1.00 | +0.02 | – | −0.20 |
| 78 | Vi | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.14 |
| 79 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.05 |
| 80 | Malzahar | +0.77 | +0.85 | +1.00 | +1.00 | +0.05 | +1.00 | −0.05 |
| 81 | Yone | +0.76 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.15 |
| 82 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.02 |
| 83 | Wukong | +0.75 | +1.00 | +1.00 | +1.00 | −0.10 | – | −0.27 |
| 84 | Aatrox | +0.74 | +1.00 | +1.00 | +1.00 | −0.13 | – | −0.22 |
| 85 | Rumble | +0.71 | +0.75 | +1.00 | +1.00 | −0.03 | – | +0.08 |
| 86 | Tristana | +0.71 | +1.00 | +1.00 | +1.00 | +0.02 | +0.00 | +0.06 |
| 87 | Quinn | +0.69 | +1.00 | +1.00 | +1.00 | +0.02 | +0.00 | −0.36 |
| 88 | Kennen | +0.63 | +1.00 | +1.00 | +1.00 | +0.04 | −0.90 | +0.25 |
| 89 | Karma | +0.63 | +1.00 | +1.00 | +0.00 | +0.14 | +1.00 | +0.10 |
| 90 | Neeko | +0.62 | +1.00 | +1.00 | +0.00 | +0.14 | +0.94 | +0.05 |
| 91 | Lucian | +0.62 | +1.00 | +1.00 | +0.00 | +0.05 | +1.00 | +0.20 |
| 92 | Smolder | +0.61 | +1.00 | +1.00 | +0.00 | +0.13 | +1.00 | −0.10 |
| 93 | Elise | +0.61 | +1.00 | +1.00 | +1.00 | +0.06 | −1.00 | −0.04 |
| 94 | Jhin | +0.60 | +1.00 | +1.00 | +1.00 | +0.06 | −1.00 | −0.21 |
| 95 | Twisted Fate | +0.60 | +1.00 | +1.00 | +0.00 | +0.01 | +1.00 | −0.14 |
| 96 | Kai'Sa | +0.59 | +1.00 | +1.00 | +0.00 | +0.02 | +1.00 | −0.27 |
| 97 | Lillia | +0.59 | +0.95 | +0.90 | +0.00 | +0.04 | +1.00 | +0.39 |
| 98 | Varus | +0.57 | +0.19 | +0.86 | +1.00 | −0.00 | +1.00 | +0.10 |
| 99 | Brand | +0.54 | −0.07 | +1.00 | +1.00 | +0.08 | +1.00 | −0.20 |
| 100 | Annie | +0.42 | +1.00 | +1.00 | −1.00 | +0.08 | +1.00 | +0.07 |
| 101 | Rengar | +0.41 | +1.00 | +1.00 | −1.00 | +0.34 | – | +0.34 |
| 102 | Viktor | +0.37 | +0.00 | +1.00 | +1.00 | +0.09 | −1.00 | +0.12 |
| 103 | Morgana | +0.37 | +0.70 | +0.75 | +0.32 | +0.07 | −0.71 | −0.01 |
| 104 | Fizz | +0.35 | +1.00 | +1.00 | −1.00 | +0.06 | – | +0.20 |
| 105 | Akshan | +0.31 | −1.00 | +1.00 | +1.00 | +0.10 | +1.00 | −0.02 |
| 106 | Sett | +0.21 | +1.00 | −1.00 | +1.00 | −0.11 | – | +0.16 |
| 107 | Ezreal | +0.15 | −0.87 | +0.96 | +0.98 | +0.08 | −0.80 | −0.01 |
| 108 | Xayah | +0.13 | +1.00 | −1.00 | +1.00 | +0.17 | −1.00 | +0.05 |
| 109 | Anivia | +0.12 | −0.01 | +0.24 | +0.25 | −0.10 | +0.24 | +0.13 |
| 110 | Nidalee | +0.12 | +1.00 | +0.73 | −1.00 | −0.00 | −1.00 | −0.34 |
| 111 | Rakan | −0.07 | −1.00 | +1.00 | +0.00 | +0.12 | −1.00 | +0.23 |
| 112 | Ziggs | −0.09 | +1.00 | −1.00 | +0.00 | +0.08 | −1.00 | +0.01 |
| 113 | Lux | −0.09 | −1.00 | +0.95 | −1.00 | +0.13 | +0.98 | +0.03 |
| 114 | Kindred | −0.11 | −1.00 | +1.00 | +0.00 | −0.01 | −1.00 | −0.20 |
| 115 | Caitlyn | −0.16 | −0.16 | −1.00 | +1.00 | +0.18 | −0.94 | −0.14 |
| 116 | Twitch | −0.18 | +1.00 | −1.00 | −1.00 | +0.10 | +0.00 | +0.04 |
| 117 | Hwei | −0.19 | −0.07 | −0.35 | +0.00 | +0.09 | −1.00 | +0.07 |
| 118 | Kassadin | −0.20 | −1.00 | +1.00 | −1.00 | −0.02 | – | +0.49 |
| 119 | Sejuani | −0.21 | −1.00 | +1.00 | −1.00 | −0.01 | – | +0.23 |
| 120 | Milio | −0.26 | +1.00 | −1.00 | −1.00 | +0.10 | −0.71 | −0.00 |
| 121 | Bard | −0.27 | −1.00 | +0.34 | +0.00 | −0.01 | −1.00 | −0.11 |
| 122 | Zilean | −0.27 | −1.00 | −1.00 | +1.00 | +0.12 | +0.00 | +0.18 |
| 123 | Syndra | −0.27 | −1.00 | +1.00 | −1.00 | +0.10 | −1.00 | +0.22 |
| 124 | Mel | −0.28 | +1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.05 |
| 125 | Ryze | −0.29 | +1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.17 |
| 126 | Kayn | −0.32 | −1.00 | −0.90 | +0.89 | −0.07 | – | +0.33 |
| 127 | Cassiopeia | −0.33 | −0.85 | −1.00 | +1.00 | +0.19 | −1.00 | −0.02 |
| 128 | Draven | −0.35 | −1.00 | −0.89 | +1.00 | +0.12 | −1.00 | +0.13 |
| 129 | Jinx | −0.45 | −1.00 | +0.00 | −1.00 | +0.06 | +0.00 | −0.14 |
| 130 | Naafiri | −0.53 | −1.00 | −1.00 | +0.00 | +0.05 | – | +0.23 |
| 131 | Zeri | −0.58 | −1.00 | −1.00 | −1.00 | +0.07 | +1.00 | +0.11 |
| 132 | Soraka | −0.70 | −1.00 | −1.00 | −0.54 | +0.05 | −1.00 | −0.03 |
| 133 | Karthus | −0.71 | −1.00 | −1.00 | −0.58 | +0.08 | −1.00 | −0.01 |
| 134 | Briar | −0.71 | −1.00 | −1.00 | −0.56 | −0.23 | – | +0.09 |
| 135 | Sylas | −0.74 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.24 |
| 136 | Aurelion Sol | −0.74 | −1.00 | −1.00 | −1.00 | +0.38 | −1.00 | +0.02 |
| 137 | Hecarim | −0.74 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.30 |
| 138 | Nunu & Willump | −0.75 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.15 |
| 139 | Kha'Zix | −0.76 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.36 |
| 140 | Vel'Koz | −0.76 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | +0.06 |
| 141 | Akali | −0.76 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.29 |
| 142 | Nami | −0.76 | −1.00 | −0.93 | −0.94 | +0.06 | −1.00 | −0.01 |
| 143 | Janna | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | +0.09 |
| 144 | Qiyana | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.17 |
| 145 | Galio | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.04 |
| 146 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.09 |
| 147 | Locke | −0.78 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.31 |
| 148 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.25 |
| 149 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.07 |
| 150 | Katarina | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.06 |
| 151 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.17 |
| 152 | Ekko | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.11 |
| 153 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.19 |
| 154 | Sona | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.01 |
| 155 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.10 |
| 156 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.05 |
| 157 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.03 |
| 158 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 159 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.19 |
| 160 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.05 |
| 161 | Zyra | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.06 |
| 162 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.01 |
| 163 | Fiddlesticks | −0.80 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.18 |
| 164 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.06 |
| 165 | Seraphine | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.06 |
| 166 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.05 |
| 167 | Veigar | −0.81 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.09 |
| 168 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.17 |
| 169 | Renata Glasc | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.41 |
| 170 | Graves | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.47 |
| 171 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.30 |
| 172 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.05 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Shaco's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Shaco's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Shaco` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.09)

- **0.63** spell shield: Spell Shield's spell shield blocks Shaco's Jack in the Box. Spell shield for 1.5 s, long enough to use ahead of Jack in the Box. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Shaco W Jack in the Box)
- **0.31** range: Sivir's basic attacks reach 375 units farther than Shaco's (500 vs 125 attack range). Shaco closes the gap with Deceive, Hallucinate. (Sivir basic attacks → Shaco basic attacks)
- **0.30** spell shield: Spell Shield's spell shield blocks Shaco's Two-Shiv Poison. Spell shield for 1.5 s, long enough to use ahead of Two-Shiv Poison. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Shaco E Two-Shiv Poison)

#### 2. Fiora (net +0.77)

- **0.77** parry: Riposte parries Shaco's Jack in the Box and stuns back. Parry for 0.75 s; Jack in the Box takes 0.25 s to land, enough to react. Negating Jack in the Box's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Shaco W Jack in the Box)
- **0.39** parry: Riposte parries Shaco's Deceive. Parry for 0.75 s; Deceive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Shaco Q Deceive)
- **0.32** parry: Riposte parries Shaco's Two-Shiv Poison. Parry for 0.75 s; Two-Shiv Poison takes 0.67 s to land, enough to react. (Fiora W Riposte → Shaco E Two-Shiv Poison)
- Watch out: Hallucinate makes Shaco untargetable, dodging Fiora's Riposte.

#### 3. Vladimir (net +0.70)

- **0.67** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Shaco's Jack in the Box. Untargetable for 2 s, long enough to use ahead of Jack in the Box. (Vladimir W Sanguine Pool → Shaco W Jack in the Box)
- **0.65** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Shaco's Deceive. Untargetable for 2 s, long enough to use ahead of Deceive. (Vladimir W Sanguine Pool → Shaco Q Deceive)
- **0.32** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Shaco's Two-Shiv Poison. Untargetable for 2 s, long enough to use ahead of Two-Shiv Poison. (Vladimir W Sanguine Pool → Shaco E Two-Shiv Poison)
- Watch out: Hallucinate makes Shaco untargetable, dodging Vladimir's Hemoplague.

#### 4. Kayle (net +0.63)

- **0.39** invulnerable: Divine Judgment makes Kayle invulnerable to Shaco's Deceive. Invulnerable for 2.5 s, long enough to use ahead of Deceive. (Kayle R Divine Judgment → Shaco Q Deceive)
- **0.24** range: Kayle's basic attacks reach 500 units farther than Shaco's (625 vs 125 attack range). Shaco closes the gap with Deceive, Hallucinate. (Kayle basic attacks → Shaco basic attacks)
- **0.18** invulnerable: Divine Judgment makes Kayle invulnerable to Shaco's Jack in the Box (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Jack in the Box. (Kayle R Divine Judgment → Shaco W Jack in the Box)
- Watch out: Hallucinate makes Shaco untargetable, dodging Kayle's Starfire Spellblade.

#### 5. Master Yi (net +0.58)

- **0.63** untargetable: Alpha Strike makes Master Yi untargetable, dodging Shaco's Jack in the Box. Untargetable for ?; Jack in the Box takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Shaco W Jack in the Box)
- **0.37** untargetable: Alpha Strike makes Master Yi untargetable, dodging Shaco's Deceive. Untargetable for ?; Deceive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Shaco Q Deceive)
- **0.30** untargetable: Alpha Strike makes Master Yi untargetable, dodging Shaco's Two-Shiv Poison. Untargetable for ?; Two-Shiv Poison takes 0.67 s to land, enough to react. (Master Yi Q Alpha Strike → Shaco E Two-Shiv Poison)
- Watch out: Hallucinate makes Shaco untargetable, dodging Master Yi's Alpha Strike.

#### 6. Teemo (net +0.55)

- **0.53** blind: Blinding Dart's blind makes Shaco's Deceive, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Shaco Q Deceive)
- **0.43** blind: Blinding Dart's blind makes Shaco's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Shaco basic attacks)
- **0.22** range: Teemo's basic attacks reach 375 units farther than Shaco's (500 vs 125 attack range). Shaco closes the gap with Deceive, Hallucinate. (Teemo basic attacks → Shaco basic attacks)
- Watch out: Hallucinate makes Shaco untargetable, dodging Teemo's Noxious Trap.

#### 7. Rengar (net +0.50)

- **0.56** cleanse: Battle Roar cleanses Shaco's Jack in the Box (fear, slow, root) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Shaco W Jack in the Box)
- **0.20** reveal: Bola Strike reveals Shaco through Deceive's stealth. (Rengar E Bola Strike → Shaco Q Deceive)
- **0.20** reveal: Thrill of the Hunt reveals Shaco through Deceive's stealth. (Rengar R Thrill of the Hunt → Shaco Q Deceive)
- Watch out: Hallucinate makes Shaco untargetable, dodging Rengar's Bola Strike.

#### 8. Kai'Sa (net +0.46)

- **0.26** range: Kai'Sa's basic attacks reach 400 units farther than Shaco's (525 vs 125 attack range). Shaco closes the gap with Deceive, Hallucinate. (Kai'Sa basic attacks → Shaco basic attacks)
- **0.20** reveal: Void Seeker reveals Shaco through Deceive's stealth. (Kai'Sa W Void Seeker → Shaco Q Deceive)

#### 9. Xayah (net +0.42)

- **0.37** untargetable: Featherstorm makes Xayah untargetable, dodging Shaco's Deceive. Untargetable for 1.5 s, long enough to use ahead of Deceive. (Xayah R Featherstorm → Shaco Q Deceive)
- **0.34** untargetable: Featherstorm makes Xayah untargetable, dodging Shaco's Jack in the Box. Untargetable for 1.5 s, long enough to use ahead of Jack in the Box. (Xayah R Featherstorm → Shaco W Jack in the Box)
- **0.26** range: Xayah's basic attacks reach 400 units farther than Shaco's (525 vs 125 attack range). Shaco closes the gap with Deceive, Hallucinate. (Xayah basic attacks → Shaco basic attacks)
- Watch out: Hallucinate makes Shaco untargetable, dodging Xayah's Featherstorm.

#### 10. Udyr (net +0.41)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Shaco's Jack in the Box (fear, slow, root). Immune for 1.5 s, long enough to use ahead of Jack in the Box. (Udyr E Blazing Stampede → Shaco W Jack in the Box)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Shaco's Two-Shiv Poison (slow). Immune for 1.5 s, long enough to use ahead of Two-Shiv Poison. (Udyr E Blazing Stampede → Shaco E Two-Shiv Poison)
- Watch out: Hallucinate makes Shaco untargetable, dodging Udyr's Blazing Stampede.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.09 | 1.09 | 0.00 |  |
| 2 | Fiora | +0.77 | 1.06 | 0.29 |  |
| 3 | Vladimir | +0.70 | 1.20 | 0.50 |  |
| 4 | Kayle | +0.63 | 0.75 | 0.12 |  |
| 5 | Master Yi | +0.58 | 1.02 | 0.44 |  |
| 6 | Teemo | +0.55 | 0.97 | 0.42 | blind (Blinding Dart), blind (Blinding Dart) |
| 7 | Rengar | +0.50 | 1.00 | 0.50 |  |
| 8 | Kai'Sa | +0.46 | 0.46 | 0.00 |  |
| 9 | Xayah | +0.42 | 0.85 | 0.43 |  |
| 10 | Udyr | +0.41 | 0.76 | 0.35 |  |
| 11 | Gwen | +0.34 | 0.89 | 0.55 |  |
| 12 | Yuumi | +0.32 | 1.26 | 0.94 |  |
| 13 | Morgana | +0.32 | 1.04 | 0.72 |  |
| 14 | Fizz | +0.31 | 1.25 | 0.94 |  |
| 15 | Milio | +0.30 | 0.63 | 0.33 |  |
| 16 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 17 | Aurora | +0.27 | 0.69 | 0.42 |  |
| 18 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 19 | Olaf | +0.19 | 0.39 | 0.20 |  |
| 20 | Jax | +0.18 | 0.98 | 0.80 | attack dodge (Counter Strike) |
| 21 | Nidalee | +0.18 | 0.40 | 0.22 |  |
| 22 | Samira | +0.12 | 0.48 | 0.36 |  |
| 23 | Nilah | +0.11 | 0.79 | 0.68 | attack dodge (Jubilant Veil) |
| 24 | Lulu | +0.11 | 0.74 | 0.63 |  |
| 25 | Karma | +0.11 | 0.55 | 0.44 |  |
| 26 | Kindred | +0.10 | 0.31 | 0.21 |  |
| 27 | Nasus | +0.04 | 0.33 | 0.29 |  |
| 28 | LeBlanc | +0.03 | 0.35 | 0.32 |  |
| 29 | Bard | +0.01 | 0.86 | 0.85 |  |
| 30 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 31 | Zilean | -0.01 | 0.22 | 0.23 |  |
| 32 | Shen | -0.02 | 0.97 | 0.99 | attack block (Spirit's Refuge) |
| 33 | Zed | -0.04 | 0.50 | 0.54 |  |
| 34 | Singed | -0.04 | 0.39 | 0.43 |  |
| 35 | Gangplank | -0.05 | 0.60 | 0.65 |  |
| 36 | Twisted Fate | -0.05 | 0.49 | 0.54 |  |
| 37 | Garen | -0.06 | 0.58 | 0.64 |  |
| 38 | Maokai | -0.08 | 1.04 | 1.12 |  |
| 39 | Corki | -0.08 | 0.22 | 0.30 |  |
| 40 | Kog'Maw | -0.08 | 0.18 | 0.26 |  |
| 41 | Elise | -0.10 | 0.42 | 0.52 |  |
| 42 | Nocturne | -0.12 | 0.88 | 1.00 |  |
| 43 | Dr. Mundo | -0.12 | 0.00 | 0.12 |  |
| 44 | Lissandra | -0.13 | 0.77 | 0.90 |  |
| 45 | Kalista | -0.13 | 0.51 | 0.64 |  |
| 46 | Zoe | -0.13 | 0.22 | 0.35 |  |
| 47 | Yasuo | -0.14 | 0.51 | 0.65 |  |
| 48 | Sylas | -0.15 | 0.20 | 0.35 |  |
| 49 | Soraka | -0.18 | 0.18 | 0.36 |  |
| 50 | Sion | -0.20 | 0.42 | 0.62 |  |
| 51 | Vayne | -0.20 | 0.29 | 0.49 |  |
| 52 | Taric | -0.21 | 0.00 | 0.21 |  |
| 53 | Kled | -0.22 | 0.94 | 1.16 |  |
| 54 | Zeri | -0.22 | 0.29 | 0.51 |  |
| 55 | Quinn | -0.22 | 0.26 | 0.48 |  |
| 56 | Aatrox | -0.22 | 0.20 | 0.42 |  |
| 57 | Jayce | -0.24 | 0.20 | 0.44 |  |
| 58 | Hwei | -0.28 | 0.55 | 0.83 |  |
| 59 | Mel | -0.28 | 0.44 | 0.72 |  |
| 60 | Lee Sin | -0.28 | 0.40 | 0.68 |  |
| 61 | Heimerdinger | -0.28 | 0.23 | 0.51 |  |
| 62 | Yorick | -0.28 | 0.00 | 0.28 |  |
| 63 | Alistar | -0.29 | 0.31 | 0.60 |  |
| 64 | Malzahar | -0.31 | 0.72 | 1.03 |  |
| 65 | Mordekaiser | -0.32 | 0.39 | 0.71 |  |
| 66 | Vex | -0.32 | 0.38 | 0.70 |  |
| 67 | Jinx | -0.32 | 0.19 | 0.51 |  |
| 68 | Pantheon | -0.33 | 0.81 | 1.14 |  |
| 69 | Camille | -0.34 | 0.52 | 0.86 |  |
| 70 | Braum | -0.35 | 0.45 | 0.80 | projectile block (Unbreakable) |
| 71 | Kha'Zix | -0.35 | 0.00 | 0.35 |  |
| 72 | Caitlyn | -0.36 | 0.64 | 1.00 |  |
| 73 | Kayn | -0.37 | 0.55 | 0.92 |  |
| 74 | Akshan | -0.37 | 0.42 | 0.79 |  |
| 75 | Lux | -0.37 | 0.19 | 0.56 |  |
| 76 | Skarner | -0.41 | 0.46 | 0.87 |  |
| 77 | Rek'Sai | -0.42 | 0.65 | 1.07 |  |
| 78 | Illaoi | -0.43 | 0.20 | 0.63 |  |
| 79 | Cassiopeia | -0.44 | 0.53 | 0.97 |  |
| 80 | Ashe | -0.44 | 0.24 | 0.68 |  |
| 81 | Ezreal | -0.44 | 0.22 | 0.66 |  |
| 82 | Gnar | -0.44 | 0.22 | 0.66 |  |
| 83 | Graves | -0.44 | 0.16 | 0.60 |  |
| 84 | Smolder | -0.45 | 0.22 | 0.67 |  |
| 85 | Anivia | -0.45 | 0.16 | 0.61 |  |
| 86 | Ivern | -0.45 | 0.13 | 0.58 |  |
| 87 | Kennen | -0.49 | 0.19 | 0.68 |  |
| 88 | Veigar | -0.49 | 0.16 | 0.65 |  |
| 89 | Thresh | -0.50 | 0.33 | 0.83 |  |
| 90 | Talon | -0.50 | 0.00 | 0.50 |  |
| 91 | Draven | -0.51 | 0.24 | 0.75 |  |
| 92 | Miss Fortune | -0.51 | 0.22 | 0.73 |  |
| 93 | Renata Glasc | -0.52 | 0.46 | 0.98 |  |
| 94 | Blitzcrank | -0.53 | 0.00 | 0.53 |  |
| 95 | Riven | -0.53 | 0.00 | 0.53 |  |
| 96 | Ziggs | -0.54 | 0.18 | 0.72 |  |
| 97 | Shyvana | -0.54 | 0.00 | 0.54 |  |
| 98 | Kassadin | -0.55 | 0.00 | 0.55 |  |
| 99 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 100 | Fiddlesticks | -0.56 | 0.53 | 1.09 |  |
| 101 | Xin Zhao | -0.56 | 0.48 | 1.04 |  |
| 102 | Viktor | -0.56 | 0.22 | 0.78 |  |
| 103 | Akali | -0.57 | 0.20 | 0.77 |  |
| 104 | Bel'Veth | -0.57 | 0.00 | 0.57 |  |
| 105 | Senna | -0.58 | 0.22 | 0.80 |  |
| 106 | Sona | -0.59 | 0.27 | 0.86 |  |
| 107 | Sett | -0.60 | 0.20 | 0.80 |  |
| 108 | Varus | -0.60 | 0.18 | 0.78 |  |
| 109 | Vel'Koz | -0.60 | 0.18 | 0.78 |  |
| 110 | Zyra | -0.61 | 0.36 | 0.97 |  |
| 111 | Annie | -0.61 | 0.15 | 0.76 |  |
| 112 | Brand | -0.61 | 0.15 | 0.76 |  |
| 113 | Syndra | -0.61 | 0.15 | 0.76 |  |
| 114 | Tristana | -0.62 | 0.24 | 0.86 |  |
| 115 | Aurelion Sol | -0.62 | 0.15 | 0.77 |  |
| 116 | Katarina | -0.62 | 0.00 | 0.62 |  |
| 117 | Wukong | -0.62 | 0.00 | 0.62 |  |
| 118 | Aphelios | -0.64 | 0.36 | 1.00 |  |
| 119 | Xerath | -0.64 | 0.18 | 0.82 |  |
| 120 | Ryze | -0.64 | 0.16 | 0.80 |  |
| 121 | Swain | -0.64 | 0.14 | 0.78 |  |
| 122 | Renekton | -0.65 | 0.00 | 0.65 |  |
| 123 | Urgot | -0.66 | 0.30 | 0.96 |  |
| 124 | Evelynn | -0.67 | 0.53 | 1.20 |  |
| 125 | Lucian | -0.69 | 0.24 | 0.93 |  |
| 126 | Karthus | -0.70 | 0.13 | 0.83 |  |
| 127 | Cho'Gath | -0.71 | 0.00 | 0.71 |  |
| 128 | Azir | -0.72 | 0.18 | 0.90 |  |
| 129 | Ahri | -0.72 | 0.15 | 0.87 |  |
| 130 | Zaahen | -0.73 | 0.39 | 1.12 |  |
| 131 | Orianna | -0.73 | 0.18 | 0.91 |  |
| 132 | Lillia | -0.73 | 0.07 | 0.80 |  |
| 133 | Irelia | -0.73 | 0.03 | 0.76 |  |
| 134 | Locke | -0.74 | 0.00 | 0.74 |  |
| 135 | Darius | -0.76 | 0.00 | 0.76 |  |
| 136 | Trundle | -0.77 | 0.00 | 0.77 |  |
| 137 | Seraphine | -0.78 | 0.19 | 0.97 |  |
| 138 | Ambessa | -0.80 | 0.20 | 1.00 |  |
| 139 | Neeko | -0.82 | 0.15 | 0.97 |  |
| 140 | Nunu & Willump | -0.86 | 0.24 | 1.10 |  |
| 141 | Nami | -0.86 | 0.15 | 1.01 |  |
| 142 | Diana | -0.86 | 0.00 | 0.86 |  |
| 143 | Warwick | -0.87 | 0.48 | 1.35 |  |
| 144 | Janna | -0.87 | 0.24 | 1.11 |  |
| 145 | Ekko | -0.87 | 0.00 | 0.87 |  |
| 146 | Jhin | -0.89 | 0.18 | 1.07 |  |
| 147 | Malphite | -0.93 | 0.21 | 1.14 |  |
| 148 | Leona | -0.95 | 0.00 | 0.95 |  |
| 149 | Rakan | -0.96 | 0.08 | 1.04 |  |
| 150 | Nautilus | -0.99 | 0.00 | 0.99 |  |
| 151 | Rammus | -1.02 | 0.32 | 1.34 |  |
| 152 | Briar | -1.04 | 0.20 | 1.24 |  |
| 153 | Amumu | -1.05 | 0.00 | 1.05 |  |
| 154 | Qiyana | -1.06 | 0.00 | 1.06 |  |
| 155 | Volibear | -1.10 | 0.00 | 1.10 |  |
| 156 | Hecarim | -1.13 | 0.00 | 1.13 |  |
| 157 | Sejuani | -1.13 | 0.00 | 1.13 |  |
| 158 | Naafiri | -1.15 | 0.20 | 1.35 |  |
| 159 | Gragas | -1.15 | 0.00 | 1.15 |  |
| 160 | Rell | -1.17 | 0.00 | 1.17 |  |
| 161 | Jarvan IV | -1.18 | 0.00 | 1.18 |  |
| 162 | Poppy | -1.19 | 0.00 | 1.19 |  |
| 163 | Pyke | -1.19 | 0.00 | 1.19 |  |
| 164 | Yone | -1.22 | 0.00 | 1.22 |  |
| 165 | Ornn | -1.28 | 0.00 | 1.28 |  |
| 166 | Vi | -1.29 | 0.20 | 1.49 |  |
| 167 | Zac | -1.30 | 0.20 | 1.50 |  |
| 168 | K'Sante | -1.33 | 0.00 | 1.33 |  |
| 169 | Viego | -1.35 | 0.06 | 1.41 |  |
| 170 | Galio | -1.46 | 0.00 | 1.46 |  |
| 171 | Taliyah | -1.51 | 0.18 | 1.69 |  |
| 172 | Tahm Kench | -1.57 | 0.00 | 1.57 |  |
