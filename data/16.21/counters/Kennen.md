# Counters to Kennen (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Kennen: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Kennen wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Kennen --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Poppy | +0.85 | +1.00 | +1.00 | +1.00 | +0.34 | +1.00 | +0.00 |
| 2 | Yorick | +0.85 | +1.00 | +1.00 | +1.00 | +0.30 | +1.00 | +0.00 |
| 3 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 4 | Diana | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 5 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.00 |
| 6 | Maokai | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 7 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 8 | Fiora | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 9 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | +0.87 | +0.00 |
| 10 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 11 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | +0.86 | +0.00 |
| 12 | Kayle | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 13 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | +0.00 | +0.92 | +0.00 |
| 14 | Twisted Fate | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 15 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 16 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 17 | Ivern | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 18 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 19 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 20 | Udyr | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 21 | Shyvana | +0.75 | +1.00 | +1.00 | +1.00 | +0.07 | +0.43 | +0.00 |
| 22 | Jax | +0.75 | +0.83 | +1.00 | +0.91 | +0.04 | +1.00 | +0.00 |
| 23 | Malphite | +0.71 | +1.00 | +1.00 | +1.00 | +0.10 | −0.04 | +0.00 |
| 24 | Zac | +0.70 | +0.96 | +1.00 | +1.00 | +0.09 | −0.03 | +0.00 |
| 25 | Sett | +0.69 | +1.00 | +1.00 | +1.00 | +0.09 | −0.23 | +0.00 |
| 26 | Gwen | +0.66 | +0.95 | +1.00 | +1.00 | −0.20 | +0.03 | +0.00 |
| 27 | Elise | +0.65 | +1.00 | +1.00 | +0.22 | +0.26 | – | +0.00 |
| 28 | Trundle | +0.64 | +1.00 | +1.00 | +1.00 | −0.17 | −0.32 | +0.00 |
| 29 | Urgot | +0.62 | +1.00 | +1.00 | +1.00 | +0.16 | −1.00 | +0.00 |
| 30 | Skarner | +0.61 | +1.00 | +1.00 | +1.00 | +0.08 | −1.00 | +0.00 |
| 31 | Gnar | +0.61 | +0.97 | +0.97 | +1.00 | +0.03 | −0.84 | +0.00 |
| 32 | Kassadin | +0.60 | +1.00 | +1.00 | +0.00 | +0.03 | +1.00 | +0.00 |
| 33 | Olaf | +0.60 | +1.00 | +1.00 | +1.00 | −0.01 | −1.00 | +0.00 |
| 34 | Camille | +0.58 | +1.00 | +1.00 | +1.00 | −0.16 | −1.00 | +0.00 |
| 35 | Lulu | +0.53 | +1.00 | +1.00 | −0.19 | +0.08 | – | +0.00 |
| 36 | Zeri | +0.51 | +1.00 | +1.00 | −0.13 | −0.08 | – | +0.00 |
| 37 | Draven | +0.50 | +0.61 | +0.42 | +0.89 | +0.10 | – | +0.00 |
| 38 | Braum | +0.48 | +0.94 | +1.00 | +0.08 | −0.06 | −0.13 | +0.00 |
| 39 | Zaahen | +0.46 | +1.00 | +1.00 | −0.69 | +0.00 | +1.00 | +0.00 |
| 40 | Riven | +0.43 | +1.00 | +0.92 | +0.00 | +0.10 | −0.68 | +0.00 |
| 41 | Mordekaiser | +0.41 | +0.47 | +0.75 | +0.88 | +0.01 | −0.70 | +0.00 |
| 42 | Sylas | +0.41 | +1.00 | +0.92 | −1.00 | +0.18 | +1.00 | +0.00 |
| 43 | Gangplank | +0.40 | +0.92 | +1.00 | +0.07 | +0.01 | −1.00 | +0.00 |
| 44 | Gragas | +0.38 | +0.58 | +0.58 | +0.10 | +0.09 | +0.61 | +0.00 |
| 45 | Graves | +0.36 | +1.00 | +1.00 | −1.00 | +0.02 | +0.56 | +0.00 |
| 46 | Karma | +0.36 | +0.94 | +0.98 | −0.87 | +0.09 | – | +0.00 |
| 47 | Annie | +0.33 | −0.14 | +0.45 | +1.00 | +0.17 | – | +0.00 |
| 48 | Warwick | +0.33 | +1.00 | +1.00 | −1.00 | +0.02 | +0.28 | +0.00 |
| 49 | Cho'Gath | +0.33 | +0.46 | +0.48 | +1.00 | −0.06 | −1.00 | +0.00 |
| 50 | Vel'Koz | +0.32 | +1.00 | +0.83 | −1.00 | +0.18 | – | +0.00 |
| 51 | Aphelios | +0.31 | +1.00 | +1.00 | −1.00 | −0.11 | – | +0.00 |
| 52 | Orianna | +0.31 | +0.81 | +0.93 | −0.74 | −0.04 | – | +0.00 |
| 53 | Yasuo | +0.29 | −0.90 | +0.89 | +0.97 | −0.00 | +1.00 | +0.00 |
| 54 | Bel'Veth | +0.28 | +1.00 | −1.00 | +0.94 | −0.03 | +1.00 | +0.00 |
| 55 | Neeko | +0.25 | +0.13 | +0.77 | −0.10 | +0.16 | – | +0.00 |
| 56 | Viego | +0.25 | −0.44 | +1.00 | +1.00 | +0.06 | −0.96 | +0.00 |
| 57 | Tryndamere | +0.25 | +1.00 | +0.93 | −0.95 | −0.06 | −0.32 | +0.00 |
| 58 | Kled | +0.23 | +1.00 | +1.00 | −0.81 | −0.16 | −0.86 | +0.00 |
| 59 | Malzahar | +0.22 | +0.98 | −0.99 | +1.00 | −0.00 | – | +0.00 |
| 60 | Yone | +0.21 | +1.00 | +1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 61 | Swain | +0.17 | +0.99 | +0.30 | −0.88 | +0.03 | – | +0.00 |
| 62 | Wukong | +0.17 | +1.00 | +0.96 | −1.00 | −0.17 | −1.00 | +0.00 |
| 63 | Briar | +0.13 | +1.00 | −1.00 | +1.00 | +0.23 | −1.00 | +0.00 |
| 64 | Volibear | +0.13 | +0.82 | +0.83 | −0.90 | +0.00 | −1.00 | +0.00 |
| 65 | Anivia | +0.13 | +0.19 | +0.19 | +0.16 | −0.09 | – | +0.00 |
| 66 | Illaoi | +0.12 | −0.49 | +0.39 | +0.96 | +0.05 | −0.55 | +0.00 |
| 67 | Brand | +0.11 | +0.55 | +0.56 | −0.88 | +0.00 | – | +0.00 |
| 68 | Milio | +0.10 | +0.52 | +0.53 | −1.00 | +0.16 | – | +0.00 |
| 69 | Galio | +0.09 | +0.25 | +0.84 | −1.00 | +0.11 | +0.00 | +0.00 |
| 70 | Tahm Kench | +0.09 | +0.13 | +0.13 | +0.15 | −0.01 | −0.08 | +0.00 |
| 71 | Taric | +0.03 | +0.12 | −0.03 | +0.09 | −0.04 | −0.03 | +0.00 |
| 72 | Nautilus | +0.03 | −0.54 | −0.53 | +1.00 | +0.15 | +0.73 | +0.00 |
| 73 | Ornn | −0.17 | −0.06 | +0.28 | −1.00 | +0.14 | −0.45 | +0.00 |
| 74 | Sion | −0.17 | −0.54 | −0.41 | −0.04 | −0.02 | +0.80 | +0.00 |
| 75 | Darius | −0.19 | −0.81 | +1.00 | −0.81 | −0.07 | −0.63 | +0.00 |
| 76 | Ziggs | −0.19 | −1.00 | +1.00 | −1.00 | +0.17 | – | +0.00 |
| 77 | Yunara | −0.29 | −0.10 | −0.15 | −1.00 | +0.02 | – | +0.00 |
| 78 | Aatrox | −0.29 | +0.43 | −1.00 | −0.75 | −0.02 | +0.08 | +0.00 |
| 79 | Jhin | −0.32 | −0.94 | −1.00 | +1.00 | −0.02 | – | +0.00 |
| 80 | Alistar | −0.33 | −1.00 | +0.82 | −1.00 | +0.08 | −1.00 | +0.00 |
| 81 | Varus | −0.34 | −1.00 | +0.60 | −1.00 | −0.01 | – | +0.00 |
| 82 | Irelia | −0.34 | −1.00 | −1.00 | +1.00 | +0.04 | −0.48 | +0.00 |
| 83 | Xayah | −0.35 | −1.00 | −1.00 | +1.00 | −0.08 | – | +0.00 |
| 84 | Rek'Sai | −0.35 | −1.00 | +1.00 | −1.00 | −0.31 | −1.00 | +0.00 |
| 85 | Cassiopeia | −0.35 | −1.00 | −1.00 | +1.00 | −0.08 | – | +0.00 |
| 86 | Samira | −0.38 | −1.00 | −1.00 | +0.81 | −0.03 | – | +0.00 |
| 87 | Lillia | −0.47 | −0.95 | −0.54 | −1.00 | +0.03 | +1.00 | +0.00 |
| 88 | Miss Fortune | −0.50 | +0.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 89 | Xerath | −0.51 | −1.00 | −0.05 | −1.00 | +0.05 | – | +0.00 |
| 90 | Morgana | −0.54 | −0.57 | −0.53 | −0.97 | +0.19 | −1.00 | +0.00 |
| 91 | Tristana | −0.55 | −1.00 | −0.71 | −1.00 | −0.13 | +1.00 | +0.00 |
| 92 | Xin Zhao | −0.55 | −0.37 | −0.70 | −0.96 | −0.04 | −0.86 | +0.00 |
| 93 | Quinn | −0.55 | −0.61 | −0.61 | −1.00 | +0.04 | – | +0.00 |
| 94 | Fizz | −0.56 | −1.00 | −1.00 | −0.78 | −0.05 | +1.00 | +0.00 |
| 95 | Lux | −0.58 | −1.00 | −0.36 | −1.00 | +0.15 | – | +0.00 |
| 96 | Hwei | −0.58 | −1.00 | −1.00 | −0.10 | −0.03 | – | +0.00 |
| 97 | Ambessa | −0.59 | −1.00 | −1.00 | −1.00 | +0.12 | +0.90 | +0.00 |
| 98 | Shaco | −0.61 | −1.00 | −1.00 | −1.00 | −0.04 | +1.00 | +0.00 |
| 99 | Rumble | −0.61 | −0.21 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 100 | Sejuani | −0.61 | −1.00 | −1.00 | −1.00 | −0.09 | +1.00 | +0.00 |
| 101 | Kayn | −0.61 | −1.00 | −1.00 | −1.00 | +0.09 | +0.72 | +0.00 |
| 102 | Shen | −0.69 | −1.00 | −1.00 | −1.00 | +0.15 | −0.16 | +0.00 |
| 103 | Singed | −0.71 | −0.91 | −0.74 | −0.99 | −0.00 | −1.00 | +0.00 |
| 104 | Rell | −0.72 | −1.00 | −1.00 | −1.00 | +0.02 | −0.27 | +0.00 |
| 105 | Karthus | −0.73 | −1.00 | −1.00 | −1.00 | −0.07 | −0.21 | +0.00 |
| 106 | Nunu & Willump | −0.73 | −1.00 | −1.00 | −1.00 | +0.08 | −0.47 | +0.00 |
| 107 | Smolder | −0.74 | −0.88 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 108 | Rengar | −0.75 | −1.00 | −1.00 | −1.00 | +0.32 | −0.94 | +0.00 |
| 109 | Ahri | −0.75 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.00 |
| 110 | Syndra | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 111 | Nilah | −0.75 | −1.00 | −1.00 | −1.00 | +0.32 | −1.00 | +0.00 |
| 112 | Janna | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 113 | Mel | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 114 | Ezreal | −0.76 | −0.91 | −1.00 | −0.96 | −0.09 | – | +0.00 |
| 115 | Ryze | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 116 | Akshan | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 117 | Senna | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 118 | Zyra | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 119 | Zoe | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 120 | Aurora | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 121 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 122 | Veigar | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 123 | Bard | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 124 | Soraka | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 125 | Jinx | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 126 | Lucian | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 127 | Kalista | −0.77 | −1.00 | −1.00 | −0.94 | −0.04 | – | +0.00 |
| 128 | LeBlanc | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 129 | Master Yi | −0.77 | −0.96 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 130 | Blitzcrank | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 131 | Ashe | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 132 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 133 | Rakan | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 134 | Fiddlesticks | −0.78 | −1.00 | −0.91 | −1.00 | −0.16 | – | +0.00 |
| 135 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 136 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 137 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 138 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 139 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | −0.97 | +0.00 |
| 140 | Kindred | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 141 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 142 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 143 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 144 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 145 | Nidalee | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 146 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 147 | Aurelion Sol | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 148 | Zilean | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 149 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 150 | Azir | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 151 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 152 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 153 | Leona | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | −0.84 | +0.00 |
| 154 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 155 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 156 | Jarvan IV | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 157 | Kai'Sa | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 158 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 159 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 160 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 161 | Nocturne | −0.81 | −0.98 | −0.96 | −1.00 | −0.15 | −0.99 | +0.00 |
| 162 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −0.98 | +0.00 |
| 163 | Lee Sin | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 164 | Evelynn | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 165 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 166 | Rammus | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 167 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 168 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 169 | Vi | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 170 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 171 | Renata Glasc | −0.83 | −1.00 | −1.00 | −1.00 | +0.04 | – | −1.00 |
| 172 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Kennen's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kennen's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kennen` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.75)

- **0.55** spell shield: Spell Shield's spell shield blocks Kennen's Slicing Maelstrom. Spell shield for 1.5 s, long enough to use ahead of Slicing Maelstrom. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kennen R Slicing Maelstrom)
- **0.40** spell shield: Spell Shield's spell shield blocks Kennen's Mark of the Storm. Spell shield for 1.5 s, long enough to use ahead of Mark of the Storm. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kennen I Mark of the Storm)

#### 2. Fizz (net +0.69)

- **0.55** untargetable: Playful makes Fizz untargetable, dodging Kennen's Mark of the Storm. Untargetable for 0.75 s, timed to Mark of the Storm. (Fizz E Playful → Kennen I Mark of the Storm)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Kennen's Slicing Maelstrom. Untargetable for 0.75 s; Slicing Maelstrom takes 0.25 s to land, enough to react. (Fizz E Playful → Kennen R Slicing Maelstrom)
- Watch out: Kennen's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 3. Kayle (net +0.69)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Kennen's Slicing Maelstrom. Invulnerable for 2.5 s, long enough to use ahead of Slicing Maelstrom. (Kayle R Divine Judgment → Kennen R Slicing Maelstrom)
- **0.14** range: Kayle's basic attacks reach 75 units farther than Kennen's (625 vs 550 attack range). Kennen has no dash or blink to close the gap. (Kayle basic attacks → Kennen basic attacks)

#### 4. Aurora (net +0.68)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Kennen's Slicing Maelstrom. Untargetable for 0.4 s; Slicing Maelstrom takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kennen R Slicing Maelstrom)
- **0.25** untargetable: Between Worlds makes Aurora untargetable, dodging Kennen's Mark of the Storm. Untargetable for 0.4 s, timed to Mark of the Storm. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kennen I Mark of the Storm)

#### 5. Bard (net +0.68)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Kennen's Slicing Maelstrom. Untargetable for 2.5 s, long enough to use ahead of Slicing Maelstrom. (Bard R Tempered Fate → Kennen R Slicing Maelstrom)
- **0.26** untargetable: Tempered Fate makes Bard untargetable, dodging Kennen's Mark of the Storm. Untargetable for 2.5 s, long enough to use ahead of Mark of the Storm. (Bard R Tempered Fate → Kennen I Mark of the Storm)

#### 6. Lissandra (net +0.68)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Kennen's Slicing Maelstrom. Untargetable for 2.5 s, long enough to use ahead of Slicing Maelstrom. (Lissandra R Frozen Tomb → Kennen R Slicing Maelstrom)
- **0.26** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Kennen's Mark of the Storm. Untargetable for 2.5 s, long enough to use ahead of Mark of the Storm. (Lissandra R Frozen Tomb → Kennen I Mark of the Storm)

#### 7. Xayah (net +0.68)

- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Kennen's Slicing Maelstrom. Untargetable for 1.5 s, long enough to use ahead of Slicing Maelstrom. (Xayah R Featherstorm → Kennen R Slicing Maelstrom)
- **0.25** untargetable: Featherstorm makes Xayah untargetable, dodging Kennen's Mark of the Storm. Untargetable for 1.5 s, long enough to use ahead of Mark of the Storm. (Xayah R Featherstorm → Kennen I Mark of the Storm)

#### 8. Vladimir (net +0.55)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kennen's Slicing Maelstrom. Untargetable for 2 s, long enough to use ahead of Slicing Maelstrom. (Vladimir W Sanguine Pool → Kennen R Slicing Maelstrom)
- **0.43** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kennen's Mark of the Storm. Untargetable for 2 s, long enough to use ahead of Mark of the Storm. (Vladimir W Sanguine Pool → Kennen I Mark of the Storm)
- Watch out: Kennen's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

#### 9. Fiora (net +0.54)

- **0.55** parry: Riposte parries Kennen's Slicing Maelstrom. Parry for 0.75 s; Slicing Maelstrom takes 0.25 s to land, enough to react. (Fiora W Riposte → Kennen R Slicing Maelstrom)
- **0.53** parry: Riposte parries Kennen's Mark of the Storm and stuns back. Parry for 0.75 s, timed to Mark of the Storm. Negating Mark of the Storm's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Kennen I Mark of the Storm)
- **0.07** attack speed slow: Riposte cuts Kennen's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Kennen basic attacks)
- Watch out: Kennen's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

#### 10. Maokai (net +0.54)

- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Kennen's Mark of the Storm. Untargetable for 1.4 s, timed to Mark of the Storm. (Maokai W Twisted Advance → Kennen I Mark of the Storm)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Kennen's Slicing Maelstrom. Untargetable for 1.4 s; Slicing Maelstrom takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Kennen R Slicing Maelstrom)
- Watch out: Kennen's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.75 | 0.75 | 0.00 |  |
| 2 | Fizz | +0.69 | 0.83 | 0.14 |  |
| 3 | Kayle | +0.69 | 0.69 | 0.00 |  |
| 4 | Aurora | +0.68 | 0.68 | 0.00 |  |
| 5 | Bard | +0.68 | 0.68 | 0.00 |  |
| 6 | Lissandra | +0.68 | 0.68 | 0.00 |  |
| 7 | Xayah | +0.68 | 0.68 | 0.00 |  |
| 8 | Vladimir | +0.55 | 0.77 | 0.22 |  |
| 9 | Fiora | +0.54 | 0.83 | 0.29 |  |
| 10 | Maokai | +0.54 | 0.83 | 0.29 |  |
| 11 | Camille | +0.54 | 0.68 | 0.14 |  |
| 12 | Nocturne | +0.51 | 0.80 | 0.29 |  |
| 13 | Rek'Sai | +0.50 | 0.68 | 0.18 |  |
| 14 | Evelynn | +0.49 | 0.68 | 0.19 |  |
| 15 | Shaco | +0.49 | 0.68 | 0.19 |  |
| 16 | Zed | +0.49 | 0.68 | 0.19 |  |
| 17 | Gwen | +0.46 | 0.75 | 0.29 |  |
| 18 | Samira | +0.40 | 0.40 | 0.00 |  |
| 19 | Mel | +0.39 | 0.39 | 0.00 |  |
| 20 | Teemo | +0.38 | 0.38 | 0.00 |  |
| 21 | Yuumi | +0.33 | 0.83 | 0.50 |  |
| 22 | Braum | +0.32 | 0.61 | 0.29 | projectile block (Unbreakable) |
| 23 | Morgana | +0.29 | 0.43 | 0.14 |  |
| 24 | Xin Zhao | +0.28 | 0.55 | 0.27 |  |
| 25 | Yasuo | +0.28 | 0.46 | 0.18 |  |
| 26 | Milio | +0.28 | 0.28 | 0.00 |  |
| 27 | Lulu | +0.27 | 0.27 | 0.00 |  |
| 28 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 29 | Udyr | +0.26 | 0.55 | 0.29 |  |
| 30 | Master Yi | +0.25 | 0.75 | 0.50 |  |
| 31 | Kalista | +0.20 | 0.20 | 0.00 |  |
| 32 | Kled | +0.14 | 0.25 | 0.11 |  |
| 33 | Zaahen | +0.08 | 0.26 | 0.18 |  |
| 34 | Annie | +0.08 | 0.08 | 0.00 |  |
| 35 | Kayn | +0.05 | 0.68 | 0.63 |  |
| 36 | Nilah | +0.03 | 0.27 | 0.24 |  |
| 37 | Jax | +0.02 | 0.31 | 0.29 |  |
| 38 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 39 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 40 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 41 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 42 | Azir | 0.00 | 0.00 | 0.00 |  |
| 43 | Brand | 0.00 | 0.00 | 0.00 |  |
| 44 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 45 | Corki | 0.00 | 0.00 | 0.00 |  |
| 46 | Draven | 0.00 | 0.00 | 0.00 |  |
| 47 | Elise | 0.00 | 0.00 | 0.00 |  |
| 48 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 49 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 50 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 51 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 52 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 53 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 54 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 55 | Karma | 0.00 | 0.00 | 0.00 |  |
| 56 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 57 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 58 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 59 | Lux | 0.00 | 0.00 | 0.00 |  |
| 60 | Nami | 0.00 | 0.00 | 0.00 |  |
| 61 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 62 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 63 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 64 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 65 | Senna | 0.00 | 0.00 | 0.00 |  |
| 66 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 67 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 68 | Sona | 0.00 | 0.00 | 0.00 |  |
| 69 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 70 | Swain | 0.00 | 0.00 | 0.00 |  |
| 71 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 72 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 73 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 74 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 75 | Vex | 0.00 | 0.00 | 0.00 |  |
| 76 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 77 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 78 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 79 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 80 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 81 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 82 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 83 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 84 | Graves | -0.06 | 0.00 | 0.06 |  |
| 85 | Alistar | -0.08 | 0.21 | 0.29 |  |
| 86 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 87 | Malphite | -0.10 | 0.19 | 0.29 |  |
| 88 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 89 | Varus | -0.11 | 0.00 | 0.11 |  |
| 90 | Malzahar | -0.12 | 0.28 | 0.40 |  |
| 91 | Rakan | -0.12 | 0.00 | 0.12 |  |
| 92 | Pantheon | -0.13 | 0.55 | 0.68 |  |
| 93 | Rengar | -0.14 | 0.44 | 0.58 |  |
| 94 | Briar | -0.14 | 0.00 | 0.14 |  |
| 95 | Jarvan IV | -0.14 | 0.00 | 0.14 |  |
| 96 | K'Sante | -0.14 | 0.00 | 0.14 |  |
| 97 | Sylas | -0.14 | 0.00 | 0.14 |  |
| 98 | Urgot | -0.14 | 0.00 | 0.14 |  |
| 99 | Yone | -0.14 | 0.00 | 0.14 |  |
| 100 | Lillia | -0.16 | 0.00 | 0.16 |  |
| 101 | Hecarim | -0.18 | 0.00 | 0.18 |  |
| 102 | Wukong | -0.18 | 0.00 | 0.18 |  |
| 103 | Ornn | -0.18 | 0.00 | 0.18 |  |
| 104 | Rell | -0.18 | 0.00 | 0.18 |  |
| 105 | Akali | -0.19 | 0.00 | 0.19 |  |
| 106 | Ambessa | -0.19 | 0.00 | 0.19 |  |
| 107 | Bel'Veth | -0.19 | 0.00 | 0.19 |  |
| 108 | Ekko | -0.19 | 0.00 | 0.19 |  |
| 109 | Lee Sin | -0.19 | 0.00 | 0.19 |  |
| 110 | Qiyana | -0.19 | 0.00 | 0.19 |  |
| 111 | Quinn | -0.19 | 0.00 | 0.19 |  |
| 112 | Riven | -0.19 | 0.00 | 0.19 |  |
| 113 | Talon | -0.19 | 0.00 | 0.19 |  |
| 114 | Volibear | -0.19 | 0.00 | 0.19 |  |
| 115 | Ivern | -0.20 | 0.00 | 0.20 |  |
| 116 | Gangplank | -0.22 | 0.36 | 0.58 |  |
| 117 | Irelia | -0.25 | 0.00 | 0.25 |  |
| 118 | Rammus | -0.27 | 0.29 | 0.56 |  |
| 119 | Aatrox | -0.27 | 0.00 | 0.27 |  |
| 120 | Nautilus | -0.27 | 0.00 | 0.27 |  |
| 121 | Tryndamere | -0.27 | 0.00 | 0.27 |  |
| 122 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 123 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 124 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 125 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 126 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 127 | Nasus | -0.29 | 0.29 | 0.58 |  |
| 128 | Amumu | -0.29 | 0.00 | 0.29 |  |
| 129 | Diana | -0.29 | 0.00 | 0.29 |  |
| 130 | Illaoi | -0.29 | 0.00 | 0.29 |  |
| 131 | Kassadin | -0.29 | 0.00 | 0.29 |  |
| 132 | Kha'Zix | -0.29 | 0.00 | 0.29 |  |
| 133 | Leona | -0.29 | 0.00 | 0.29 |  |
| 134 | Locke | -0.29 | 0.00 | 0.29 |  |
| 135 | Renekton | -0.29 | 0.00 | 0.29 |  |
| 136 | Sejuani | -0.29 | 0.00 | 0.29 |  |
| 137 | Sett | -0.29 | 0.00 | 0.29 |  |
| 138 | Shyvana | -0.29 | 0.00 | 0.29 |  |
| 139 | Olaf | -0.32 | 0.26 | 0.58 |  |
| 140 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 141 | Pyke | -0.34 | 0.00 | 0.34 |  |
| 142 | Shen | -0.35 | 0.29 | 0.64 |  |
| 143 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 144 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 145 | Viego | -0.35 | 0.00 | 0.35 |  |
| 146 | Sion | -0.39 | 0.28 | 0.67 |  |
| 147 | Garen | -0.40 | 0.14 | 0.54 |  |
| 148 | Janna | -0.40 | 0.00 | 0.40 |  |
| 149 | Karthus | -0.42 | 0.00 | 0.42 |  |
| 150 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 151 | Gragas | -0.45 | 0.00 | 0.45 |  |
| 152 | Mordekaiser | -0.47 | 0.07 | 0.54 |  |
| 153 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 154 | Poppy | -0.49 | 0.00 | 0.49 |  |
| 155 | Darius | -0.54 | 0.00 | 0.54 |  |
| 156 | Trundle | -0.54 | 0.00 | 0.54 |  |
| 157 | Yorick | -0.54 | 0.00 | 0.54 |  |
| 158 | Warwick | -0.57 | 0.27 | 0.84 |  |
| 159 | Katarina | -0.57 | 0.00 | 0.57 |  |
| 160 | Vi | -0.57 | 0.00 | 0.57 |  |
| 161 | Blitzcrank | -0.58 | 0.00 | 0.58 |  |
| 162 | Cho'Gath | -0.58 | 0.00 | 0.58 |  |
| 163 | Dr. Mundo | -0.58 | 0.00 | 0.58 |  |
| 164 | Rumble | -0.58 | 0.00 | 0.58 |  |
| 165 | Singed | -0.58 | 0.00 | 0.58 |  |
| 166 | Skarner | -0.58 | 0.00 | 0.58 |  |
| 167 | Taric | -0.58 | 0.00 | 0.58 |  |
| 168 | Naafiri | -0.59 | 0.00 | 0.59 |  |
| 169 | Zac | -0.74 | 0.00 | 0.74 |  |
| 170 | Tahm Kench | -0.77 | 0.00 | 0.77 |  |
| 171 | Galio | -0.78 | 0.00 | 0.78 |  |
| 172 | Nunu & Willump | -1.07 | 0.00 | 1.07 |  |
