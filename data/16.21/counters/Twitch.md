# Counters to Twitch (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Twitch: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Twitch wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Twitch --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Rengar | +0.86 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.32 |
| 2 | Jarvan IV | +0.85 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.60 |
| 3 | Kled | +0.85 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.67 |
| 4 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.97 |
| 5 | Vayne | +0.84 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.94 |
| 6 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.83 |
| 7 | Camille | +0.83 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.57 |
| 8 | Diana | +0.83 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.09 |
| 9 | Sylas | +0.83 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.23 |
| 10 | Udyr | +0.83 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.85 |
| 11 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.95 |
| 12 | Skarner | +0.83 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.12 |
| 13 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.74 |
| 14 | Rakan | +0.82 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.40 |
| 15 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.68 |
| 16 | Yasuo | +0.82 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.48 |
| 17 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.48 |
| 18 | Jax | +0.82 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.52 |
| 19 | Zeri | +0.82 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.61 |
| 20 | Sejuani | +0.82 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.45 |
| 21 | Xin Zhao | +0.82 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.14 |
| 22 | Sion | +0.82 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.41 |
| 23 | Tahm Kench | +0.82 | +0.99 | +0.99 | +1.00 | +0.09 | +1.00 | +0.13 |
| 24 | Nocturne | +0.82 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.70 |
| 25 | Kennen | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.56 |
| 26 | Volibear | +0.81 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.55 |
| 27 | Dr. Mundo | +0.81 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.39 |
| 28 | Fizz | +0.81 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.36 |
| 29 | Rammus | +0.81 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.44 |
| 30 | Garen | +0.81 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.19 |
| 31 | Lee Sin | +0.81 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.34 |
| 32 | Vel'Koz | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | −0.02 |
| 33 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.23 |
| 34 | Pantheon | +0.81 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.28 |
| 35 | Tryndamere | +0.81 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.41 |
| 36 | Aurelion Sol | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | −0.01 |
| 37 | Malphite | +0.81 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.41 |
| 38 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.34 |
| 39 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.56 |
| 40 | Orianna | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.38 |
| 41 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.31 |
| 42 | Fiora | +0.80 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.73 |
| 43 | Vi | +0.80 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.24 |
| 44 | Rell | +0.80 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | −0.14 |
| 45 | Gragas | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.06 |
| 46 | Ambessa | +0.80 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.43 |
| 47 | Maokai | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.05 |
| 48 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.07 |
| 49 | Zac | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.14 |
| 50 | Gwen | +0.79 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.38 |
| 51 | Sett | +0.79 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.15 |
| 52 | Miss Fortune | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.15 |
| 53 | Nautilus | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | +0.84 | +0.03 |
| 54 | Braum | +0.78 | +0.97 | +1.00 | +1.00 | −0.09 | +0.93 | +0.20 |
| 55 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.34 |
| 56 | Warwick | +0.78 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.25 |
| 57 | Akshan | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.08 |
| 58 | Urgot | +0.77 | +0.95 | +0.95 | +1.00 | −0.01 | +0.94 | +0.01 |
| 59 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.27 |
| 60 | Yunara | +0.75 | +0.90 | +0.95 | +1.00 | −0.01 | – | +0.15 |
| 61 | Kai'Sa | +0.74 | +0.97 | +1.00 | +1.00 | −0.16 | – | −0.03 |
| 62 | Kayn | +0.73 | +0.99 | +0.76 | +1.00 | −0.07 | +0.99 | +0.13 |
| 63 | Tristana | +0.72 | +1.00 | +1.00 | +1.00 | +0.05 | +0.00 | +0.31 |
| 64 | Leona | +0.72 | +0.80 | +0.95 | +1.00 | −0.10 | +0.82 | +0.27 |
| 65 | Kayle | +0.69 | +1.00 | +0.61 | +1.00 | +0.07 | – | +0.18 |
| 66 | Samira | +0.67 | +1.00 | +0.57 | +1.00 | +0.01 | – | +0.25 |
| 67 | Kassadin | +0.67 | +0.50 | +1.00 | +1.00 | −0.21 | +1.00 | +0.51 |
| 68 | Rumble | +0.63 | +1.00 | +1.00 | +1.00 | −0.09 | −0.83 | +0.45 |
| 69 | Lulu | +0.62 | +1.00 | +0.38 | +1.00 | +0.01 | – | +0.20 |
| 70 | Ziggs | +0.60 | +1.00 | +1.00 | +0.00 | +0.28 | – | +0.05 |
| 71 | Zilean | +0.58 | +0.30 | +1.00 | +1.00 | −0.06 | – | +0.20 |
| 72 | Galio | +0.58 | +1.00 | +0.50 | +1.00 | −0.02 | +0.00 | +0.26 |
| 73 | Zed | +0.58 | +1.00 | +0.50 | +1.00 | −0.09 | +0.00 | +0.37 |
| 74 | Azir | +0.56 | +1.00 | +1.00 | +0.00 | −0.09 | – | +0.32 |
| 75 | Mordekaiser | +0.55 | +0.97 | +0.12 | +1.00 | −0.15 | +0.83 | +0.30 |
| 76 | Darius | +0.54 | +1.00 | +0.00 | +1.00 | −0.18 | +1.00 | +0.25 |
| 77 | Ashe | +0.53 | +0.63 | +0.45 | +1.00 | +0.07 | – | −0.07 |
| 78 | Jhin | +0.52 | +1.00 | +0.04 | +1.00 | +0.10 | – | −0.18 |
| 79 | Graves | +0.51 | +1.00 | +1.00 | −0.50 | +0.05 | +1.00 | +0.04 |
| 80 | Lucian | +0.51 | +1.00 | +0.00 | +1.00 | −0.07 | – | +0.35 |
| 81 | Swain | +0.48 | +0.72 | +0.35 | +0.78 | +0.03 | – | +0.01 |
| 82 | Anivia | +0.47 | +0.46 | +0.41 | +1.00 | −0.06 | – | +0.27 |
| 83 | Bel'Veth | +0.43 | +0.00 | +1.00 | +1.00 | −0.08 | +0.00 | −0.21 |
| 84 | Wukong | +0.43 | +1.00 | −0.50 | +1.00 | −0.10 | +1.00 | +0.31 |
| 85 | Aurora | +0.42 | +0.00 | +0.66 | +1.00 | +0.02 | – | +0.23 |
| 86 | Alistar | +0.40 | +1.00 | +1.00 | −1.00 | −0.05 | +1.00 | +0.06 |
| 87 | Amumu | +0.36 | +0.27 | +0.02 | +1.00 | −0.02 | +0.79 | +0.25 |
| 88 | Gnar | +0.35 | +0.34 | +0.67 | +1.00 | −0.16 | −1.00 | +0.48 |
| 89 | Kha'Zix | +0.32 | +1.00 | −1.00 | +1.00 | −0.06 | +1.00 | +0.58 |
| 90 | Rek'Sai | +0.29 | +1.00 | −1.00 | +1.00 | −0.11 | +1.00 | +0.05 |
| 91 | Quinn | +0.28 | +0.43 | +0.00 | +0.77 | −0.01 | – | −0.14 |
| 92 | Lillia | +0.28 | −0.02 | +0.01 | +0.91 | −0.02 | +0.85 | +0.35 |
| 93 | Annie | +0.26 | −1.00 | +1.00 | +1.00 | +0.13 | – | +0.21 |
| 94 | Xayah | +0.24 | +1.00 | −1.00 | +1.00 | −0.10 | – | +0.63 |
| 95 | Kindred | +0.23 | +0.00 | +0.00 | +1.00 | −0.04 | – | +0.22 |
| 96 | Smolder | +0.22 | +0.00 | +0.00 | +1.00 | −0.02 | – | +0.05 |
| 97 | Nilah | +0.21 | +0.50 | −1.00 | +1.00 | −0.02 | +1.00 | +0.76 |
| 98 | Riven | +0.21 | +1.00 | −1.00 | +1.00 | −0.16 | +0.00 | +0.61 |
| 99 | Janna | +0.20 | +0.87 | −1.00 | +1.00 | +0.05 | – | +0.08 |
| 100 | Viego | +0.19 | +0.55 | −1.00 | +1.00 | −0.11 | +1.00 | +0.45 |
| 101 | Shaco | +0.18 | +1.00 | −1.00 | +1.00 | −0.10 | +0.00 | −0.04 |
| 102 | Yone | +0.13 | +0.17 | +0.17 | +0.17 | −0.12 | +0.17 | +0.14 |
| 103 | Aatrox | +0.12 | +0.84 | +0.20 | −1.00 | −0.16 | +0.96 | −0.26 |
| 104 | Malzahar | +0.08 | +0.49 | −1.00 | +1.00 | +0.00 | – | −0.05 |
| 105 | Cho'Gath | +0.04 | +0.00 | −1.00 | +1.00 | −0.09 | +1.00 | −0.04 |
| 106 | Nunu & Willump | +0.02 | +0.01 | −0.05 | +0.04 | +0.09 | −0.01 | +0.24 |
| 107 | Briar | −0.00 | +0.16 | +0.16 | +0.20 | −0.30 | −0.96 | +0.40 |
| 108 | Aphelios | −0.00 | +1.00 | −1.00 | +0.00 | −0.05 | – | +0.08 |
| 109 | Taric | −0.02 | +1.00 | −0.06 | −1.00 | −0.04 | −0.46 | +0.03 |
| 110 | Zoe | −0.03 | −0.32 | −0.48 | +0.83 | +0.03 | – | +0.10 |
| 111 | Caitlyn | −0.03 | +0.28 | +0.00 | +0.05 | −0.04 | −1.00 | −0.05 |
| 112 | Ornn | −0.05 | −0.40 | −0.14 | +1.00 | −0.07 | −1.00 | −0.06 |
| 113 | Hecarim | −0.10 | +0.00 | +0.00 | −1.00 | −0.11 | +1.00 | +0.24 |
| 114 | Akali | −0.10 | −0.90 | +0.09 | +0.18 | −0.03 | +0.57 | +0.20 |
| 115 | Karma | −0.13 | −0.29 | −0.55 | +0.52 | −0.10 | – | +0.09 |
| 116 | Olaf | −0.13 | −0.45 | −1.00 | +1.00 | −0.21 | +0.56 | +0.08 |
| 117 | Cassiopeia | −0.15 | −0.63 | −0.76 | +1.00 | +0.11 | – | −0.08 |
| 118 | Shen | −0.18 | −1.00 | −1.00 | +1.00 | +0.03 | +1.00 | +0.24 |
| 119 | Varus | −0.19 | −0.55 | −1.00 | +1.00 | +0.05 | – | +0.16 |
| 120 | Irelia | −0.20 | −0.96 | −0.55 | +0.69 | +0.16 | −0.04 | +0.37 |
| 121 | Kalista | −0.28 | −0.92 | −0.95 | +1.00 | −0.10 | – | +0.60 |
| 122 | Corki | −0.30 | −1.00 | +0.64 | −1.00 | +0.08 | – | +0.07 |
| 123 | Heimerdinger | −0.33 | −1.00 | −1.00 | +1.00 | +0.03 | – | +0.06 |
| 124 | Ekko | −0.33 | +1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.16 |
| 125 | Draven | −0.33 | −1.00 | −1.00 | +1.00 | +0.03 | – | −0.01 |
| 126 | Neeko | −0.33 | −1.00 | −1.00 | +1.00 | +0.00 | – | +0.00 |
| 127 | Twisted Fate | −0.35 | −1.00 | −1.00 | +1.00 | −0.10 | – | −0.10 |
| 128 | Elise | −0.36 | −1.00 | −1.00 | +0.93 | −0.02 | – | −0.09 |
| 129 | Gangplank | −0.39 | −1.00 | −1.00 | +1.00 | +0.01 | −1.00 | +0.27 |
| 130 | Singed | −0.42 | −1.00 | −1.00 | +1.00 | −0.11 | −1.00 | +0.01 |
| 131 | Nidalee | −0.44 | −1.00 | −1.00 | +0.68 | −0.10 | – | −0.27 |
| 132 | Karthus | −0.46 | +0.00 | −1.00 | −1.00 | −0.04 | +0.00 | −0.03 |
| 133 | Hwei | −0.50 | −1.00 | −1.00 | +0.34 | −0.09 | – | −0.08 |
| 134 | Sona | −0.50 | −1.00 | +0.00 | −1.00 | −0.04 | – | +0.12 |
| 135 | Talon | −0.51 | −1.00 | +0.00 | −1.00 | −0.07 | −0.50 | +0.07 |
| 136 | Fiddlesticks | −0.52 | +0.00 | −1.00 | −1.00 | −0.08 | – | −0.19 |
| 137 | Bard | −0.54 | −0.94 | −0.95 | +0.00 | −0.09 | – | +0.01 |
| 138 | Jinx | −0.62 | −1.00 | −1.00 | −0.29 | +0.02 | – | −0.05 |
| 139 | Brand | −0.73 | −1.00 | −1.00 | −0.71 | −0.06 | – | −0.16 |
| 140 | Naafiri | −0.76 | −1.00 | −0.95 | −1.00 | +0.05 | −1.00 | +0.47 |
| 141 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.15 |
| 142 | Illaoi | −0.76 | −1.00 | −0.92 | −0.79 | −0.09 | −1.00 | −0.10 |
| 143 | Xerath | −0.76 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.28 |
| 144 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.35 |
| 145 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.27 |
| 146 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.01 |
| 147 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.10 |
| 148 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.07 |
| 149 | Syndra | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.08 |
| 150 | Mel | −0.78 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.14 |
| 151 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.21 |
| 152 | Ezreal | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.05 |
| 153 | Milio | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.03 |
| 154 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.04 |
| 155 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.15 |
| 156 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.02 |
| 157 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.02 |
| 158 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.38 |
| 159 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.21 |
| 160 | Renata Glasc | −0.79 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.20 |
| 161 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.02 |
| 162 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.05 |
| 163 | Lux | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.05 |
| 164 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.23 |
| 165 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.18 |
| 166 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.35 |
| 167 | Morgana | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.05 |
| 168 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.06 |
| 169 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.15 |
| 170 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.05 |
| 171 | Pyke | −0.85 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | −0.01 |
| 172 | Thresh | −0.85 | −1.00 | −1.00 | −1.00 | −0.36 | −1.00 | +0.05 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Twitch's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Twitch's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Twitch` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Teemo (net +0.57)

- **0.57** blind: Blinding Dart's blind makes Twitch's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Twitch basic attacks)

#### 2. Lulu (net +0.51)

- **0.40** disarm: Whimsy disarms Twitch for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Twitch basic attacks)
- **0.11** reveal: Help, Pix! reveals Twitch through Ambush's stealth. (Lulu E Help, Pix! → Twitch Q Ambush)

#### 3. Samira (net +0.51)

- **0.36** projectile block: Blade Whirl blocks Twitch's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Twitch basic attacks)
- **0.29** projectile block: Blade Whirl blocks Twitch's Venom Cask, a projectile. Blade Whirl for 0.75 s; Venom Cask takes 0.93 s to land, enough to react. (Samira W Blade Whirl → Twitch W Venom Cask)

#### 4. Mel (net +0.50)

- **0.36** projectile block: Rebuttal blocks Twitch's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Twitch basic attacks)
- **0.27** projectile block: Rebuttal blocks Twitch's Venom Cask, a projectile. Rebuttal for 0.75 s; Venom Cask takes 0.93 s to land, enough to react. (Mel W Rebuttal → Twitch W Venom Cask)

#### 5. Yasuo (net +0.47)

- **0.47** projectile block: Wind Wall blocks Twitch's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Twitch basic attacks)
- **0.32** projectile block: Wind Wall blocks Twitch's Venom Cask, a projectile. Wind Wall for 4 s, long enough to use ahead of Venom Cask. (Yasuo W Wind Wall → Twitch W Venom Cask)
- **0.11** reveal: Last Breath reveals Twitch through Ambush's stealth. (Yasuo R Last Breath → Twitch Q Ambush)
- Watch out: Twitch's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 6. Braum (net +0.40)

- **0.60** projectile block: Unbreakable blocks Twitch's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Twitch basic attacks)
- **0.45** projectile block: Unbreakable blocks Twitch's Venom Cask, a projectile. Unbreakable for 4 s, long enough to use ahead of Venom Cask. (Braum E Unbreakable → Twitch W Venom Cask)
- Watch out: Twitch's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 7. Caitlyn (net +0.40)

- **0.18** range: Caitlyn's basic attacks reach 100 units farther than Twitch's (650 vs 550 attack range). Twitch has no dash or blink to close the gap. (Caitlyn basic attacks → Twitch basic attacks)
- **0.11** reveal: Ace in the Hole reveals Twitch through Ambush's stealth. (Caitlyn R Ace in the Hole → Twitch Q Ambush)
- **0.11** reveal: Yordle Snap Trap reveals Twitch through Ambush's stealth. (Caitlyn W Yordle Snap Trap → Twitch Q Ambush)

#### 8. Tristana (net +0.27)

- **0.27** range: Tristana's basic attacks reach 150 units farther than Twitch's (700 vs 550 attack range). Twitch has no dash or blink to close the gap. (Tristana basic attacks → Twitch basic attacks)

#### 9. Fiddlesticks (net +0.22)

- **0.11** reveal: A Harmless Scarecrow reveals Twitch through Ambush's stealth. (Fiddlesticks I A Harmless Scarecrow → Twitch Q Ambush)
- **0.11** reveal: Bountiful Harvest reveals Twitch through Ambush's stealth. (Fiddlesticks W Bountiful Harvest → Twitch Q Ambush)

#### 10. Hwei (net +0.22)

- **0.11** reveal: Gaze of the Abyss reveals Twitch through Ambush's stealth. (Hwei W Gaze of the Abyss → Twitch Q Ambush)
- **0.11** reveal: Spiraling Despair reveals Twitch through Ambush's stealth. (Hwei R Spiraling Despair → Twitch Q Ambush)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +0.57 | 0.57 | 0.00 | blind (Blinding Dart) |
| 2 | Lulu | +0.51 | 0.51 | 0.00 | disarm (Whimsy) |
| 3 | Samira | +0.51 | 0.51 | 0.00 |  |
| 4 | Mel | +0.50 | 0.50 | 0.00 |  |
| 5 | Yasuo | +0.47 | 0.74 | 0.27 | projectile block (Wind Wall) |
| 6 | Braum | +0.40 | 0.83 | 0.43 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Caitlyn | +0.40 | 0.40 | 0.00 |  |
| 8 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 9 | Fiddlesticks | +0.22 | 0.22 | 0.00 |  |
| 10 | Hwei | +0.22 | 0.22 | 0.00 |  |
| 11 | Karma | +0.22 | 0.22 | 0.00 |  |
| 12 | Kled | +0.20 | 0.36 | 0.16 |  |
| 13 | Malzahar | +0.17 | 0.17 | 0.00 |  |
| 14 | Shen | +0.14 | 0.43 | 0.29 | attack block (Spirit's Refuge) |
| 15 | Kayle | +0.14 | 0.14 | 0.00 |  |
| 16 | Akshan | +0.11 | 0.11 | 0.00 |  |
| 17 | Elise | +0.11 | 0.11 | 0.00 |  |
| 18 | Kai'Sa | +0.11 | 0.11 | 0.00 |  |
| 19 | LeBlanc | +0.11 | 0.11 | 0.00 |  |
| 20 | Nidalee | +0.11 | 0.11 | 0.00 |  |
| 21 | Renata Glasc | +0.11 | 0.11 | 0.00 |  |
| 22 | Twisted Fate | +0.11 | 0.11 | 0.00 |  |
| 23 | Vex | +0.11 | 0.11 | 0.00 |  |
| 24 | Zyra | +0.11 | 0.11 | 0.00 |  |
| 25 | Annie | +0.08 | 0.08 | 0.00 |  |
| 26 | Milio | +0.06 | 0.06 | 0.00 |  |
| 27 | Nilah | +0.05 | 0.40 | 0.35 | attack dodge (Jubilant Veil) |
| 28 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 29 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 30 | Thresh | +0.04 | 0.11 | 0.07 |  |
| 31 | Kalista | +0.04 | 0.04 | 0.00 |  |
| 32 | Jax | +0.03 | 0.46 | 0.43 | attack dodge (Counter Strike) |
| 33 | Rammus | 0.00 | 0.43 | 0.43 | attack reflect (Defensive Ball Curl) |
| 34 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 35 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 36 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 37 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 38 | Aurora | 0.00 | 0.00 | 0.00 |  |
| 39 | Azir | 0.00 | 0.00 | 0.00 |  |
| 40 | Bard | 0.00 | 0.00 | 0.00 |  |
| 41 | Brand | 0.00 | 0.00 | 0.00 |  |
| 42 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 43 | Corki | 0.00 | 0.00 | 0.00 |  |
| 44 | Draven | 0.00 | 0.00 | 0.00 |  |
| 45 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 46 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 47 | Janna | 0.00 | 0.00 | 0.00 |  |
| 48 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 49 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 50 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 51 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 52 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 53 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 54 | Lissandra | 0.00 | 0.00 | 0.00 |  |
| 55 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 56 | Lux | 0.00 | 0.00 | 0.00 |  |
| 57 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 58 | Nami | 0.00 | 0.00 | 0.00 |  |
| 59 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 60 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 61 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 62 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 63 | Senna | 0.00 | 0.00 | 0.00 |  |
| 64 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 65 | Sivir | 0.00 | 0.00 | 0.00 |  |
| 66 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 67 | Sona | 0.00 | 0.00 | 0.00 |  |
| 68 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 69 | Swain | 0.00 | 0.00 | 0.00 |  |
| 70 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 71 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 72 | Varus | 0.00 | 0.00 | 0.00 |  |
| 73 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 74 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 75 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 76 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 77 | Xayah | 0.00 | 0.00 | 0.00 |  |
| 78 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 79 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 80 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 81 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 82 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 83 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 84 | Morgana | -0.02 | 0.19 | 0.21 |  |
| 85 | Lee Sin | -0.07 | 0.22 | 0.29 |  |
| 86 | Ivern | -0.08 | 0.00 | 0.08 |  |
| 87 | Fizz | -0.09 | 0.11 | 0.20 |  |
| 88 | Sylas | -0.09 | 0.11 | 0.20 |  |
| 89 | Graves | -0.09 | 0.00 | 0.09 |  |
| 90 | Briar | -0.10 | 0.11 | 0.21 |  |
| 91 | Naafiri | -0.10 | 0.11 | 0.21 |  |
| 92 | Urgot | -0.10 | 0.11 | 0.21 |  |
| 93 | Yuumi | -0.13 | 0.00 | 0.13 |  |
| 94 | Malphite | -0.15 | 0.28 | 0.43 |  |
| 95 | Warwick | -0.15 | 0.14 | 0.29 |  |
| 96 | Kayn | -0.16 | 0.11 | 0.27 |  |
| 97 | Rek'Sai | -0.16 | 0.11 | 0.27 |  |
| 98 | Akali | -0.18 | 0.11 | 0.29 |  |
| 99 | Ambessa | -0.18 | 0.11 | 0.29 |  |
| 100 | Vi | -0.18 | 0.11 | 0.29 |  |
| 101 | Rakan | -0.18 | 0.00 | 0.18 |  |
| 102 | Viego | -0.19 | 0.00 | 0.19 |  |
| 103 | Jarvan IV | -0.20 | 0.00 | 0.20 |  |
| 104 | Yone | -0.20 | 0.00 | 0.20 |  |
| 105 | Camille | -0.21 | 0.00 | 0.21 |  |
| 106 | Karthus | -0.21 | 0.00 | 0.21 |  |
| 107 | K'Sante | -0.21 | 0.00 | 0.21 |  |
| 108 | Vladimir | -0.21 | 0.00 | 0.21 |  |
| 109 | Zaahen | -0.22 | 0.05 | 0.27 |  |
| 110 | Lillia | -0.24 | 0.00 | 0.24 |  |
| 111 | Hecarim | -0.27 | 0.00 | 0.27 |  |
| 112 | Wukong | -0.27 | 0.00 | 0.27 |  |
| 113 | Ornn | -0.27 | 0.00 | 0.27 |  |
| 114 | Pantheon | -0.27 | 0.00 | 0.27 |  |
| 115 | Rell | -0.27 | 0.00 | 0.27 |  |
| 116 | Aatrox | -0.29 | 0.11 | 0.40 |  |
| 117 | Zac | -0.29 | 0.11 | 0.40 |  |
| 118 | Bel'Veth | -0.29 | 0.00 | 0.29 |  |
| 119 | Ekko | -0.29 | 0.00 | 0.29 |  |
| 120 | Evelynn | -0.29 | 0.00 | 0.29 |  |
| 121 | Galio | -0.29 | 0.00 | 0.29 |  |
| 122 | Pyke | -0.29 | 0.00 | 0.29 |  |
| 123 | Qiyana | -0.29 | 0.00 | 0.29 |  |
| 124 | Riven | -0.29 | 0.00 | 0.29 |  |
| 125 | Shaco | -0.29 | 0.00 | 0.29 |  |
| 126 | Talon | -0.29 | 0.00 | 0.29 |  |
| 127 | Volibear | -0.29 | 0.00 | 0.29 |  |
| 128 | Zed | -0.29 | 0.00 | 0.29 |  |
| 129 | Illaoi | -0.32 | 0.11 | 0.43 |  |
| 130 | Sett | -0.32 | 0.11 | 0.43 |  |
| 131 | Udyr | -0.32 | 0.11 | 0.43 |  |
| 132 | Fiora | -0.33 | 0.10 | 0.43 |  |
| 133 | Master Yi | -0.33 | 0.07 | 0.40 |  |
| 134 | Irelia | -0.38 | 0.00 | 0.38 |  |
| 135 | Alistar | -0.39 | 0.04 | 0.43 |  |
| 136 | Nautilus | -0.40 | 0.00 | 0.40 |  |
| 137 | Tahm Kench | -0.40 | 0.00 | 0.40 |  |
| 138 | Tryndamere | -0.40 | 0.00 | 0.40 |  |
| 139 | Xin Zhao | -0.40 | 0.00 | 0.40 |  |
| 140 | Nasus | -0.43 | 0.43 | 0.86 | attack speed slow (Wither) |
| 141 | Amumu | -0.43 | 0.00 | 0.43 |  |
| 142 | Diana | -0.43 | 0.00 | 0.43 |  |
| 143 | Gragas | -0.43 | 0.00 | 0.43 |  |
| 144 | Gwen | -0.43 | 0.00 | 0.43 |  |
| 145 | Kassadin | -0.43 | 0.00 | 0.43 |  |
| 146 | Katarina | -0.43 | 0.00 | 0.43 |  |
| 147 | Kha'Zix | -0.43 | 0.00 | 0.43 |  |
| 148 | Leona | -0.43 | 0.00 | 0.43 |  |
| 149 | Locke | -0.43 | 0.00 | 0.43 |  |
| 150 | Maokai | -0.43 | 0.00 | 0.43 |  |
| 151 | Nocturne | -0.43 | 0.00 | 0.43 |  |
| 152 | Poppy | -0.43 | 0.00 | 0.43 |  |
| 153 | Renekton | -0.43 | 0.00 | 0.43 |  |
| 154 | Sejuani | -0.43 | 0.00 | 0.43 |  |
| 155 | Shyvana | -0.43 | 0.00 | 0.43 |  |
| 156 | Rengar | -0.56 | 0.30 | 0.86 |  |
| 157 | Garen | -0.58 | 0.23 | 0.81 |  |
| 158 | Skarner | -0.61 | 0.25 | 0.86 |  |
| 159 | Mordekaiser | -0.65 | 0.16 | 0.81 |  |
| 160 | Nunu & Willump | -0.73 | 0.13 | 0.86 |  |
| 161 | Sion | -0.75 | 0.06 | 0.81 |  |
| 162 | Gangplank | -0.79 | 0.07 | 0.86 |  |
| 163 | Olaf | -0.81 | 0.05 | 0.86 |  |
| 164 | Darius | -0.81 | 0.00 | 0.81 |  |
| 165 | Trundle | -0.81 | 0.00 | 0.81 |  |
| 166 | Yorick | -0.81 | 0.00 | 0.81 |  |
| 167 | Blitzcrank | -0.86 | 0.00 | 0.86 |  |
| 168 | Cho'Gath | -0.86 | 0.00 | 0.86 |  |
| 169 | Dr. Mundo | -0.86 | 0.00 | 0.86 |  |
| 170 | Rumble | -0.86 | 0.00 | 0.86 |  |
| 171 | Singed | -0.86 | 0.00 | 0.86 |  |
| 172 | Taric | -0.86 | 0.00 | 0.86 |  |
