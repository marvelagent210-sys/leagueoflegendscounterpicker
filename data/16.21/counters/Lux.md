# Counters to Lux (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Lux: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Lux wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Lux --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.87 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +1.00 |
| 2 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +1.00 |
| 3 | Rengar | +0.85 | +1.00 | +1.00 | +1.00 | +0.33 | +1.00 | +0.00 |
| 4 | Gangplank | +0.85 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.55 |
| 5 | Sylas | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 6 | Vel'Koz | +0.82 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.00 |
| 7 | Yorick | +0.81 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.50 |
| 8 | Riven | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 9 | Trundle | +0.80 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.56 |
| 10 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 11 | Tristana | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 12 | Bel'Veth | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.03 |
| 13 | Gragas | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 14 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 15 | Galio | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 16 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 17 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +0.49 |
| 18 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 19 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 20 | Jhin | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 21 | Swain | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 22 | Kayle | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 23 | Pantheon | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 24 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 25 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 26 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 27 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 28 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 29 | Lillia | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +0.98 | +0.00 |
| 30 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 31 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 32 | Annie | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 33 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 34 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 35 | Aurora | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 36 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 37 | Jayce | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +0.93 | +0.00 |
| 38 | Neeko | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 39 | Orianna | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 40 | Azir | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 41 | Teemo | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 42 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.07 |
| 43 | Yunara | +0.77 | +1.00 | +0.95 | +1.00 | +0.01 | – | +0.00 |
| 44 | Lucian | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 45 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 46 | Anivia | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 47 | Shyvana | +0.75 | +0.83 | +1.00 | +0.97 | −0.04 | +1.00 | +0.00 |
| 48 | Karma | +0.74 | +0.95 | +0.93 | +1.00 | −0.04 | – | +0.00 |
| 49 | Hwei | +0.74 | +0.92 | +0.94 | +1.00 | −0.01 | – | +0.00 |
| 50 | Poppy | +0.73 | +1.00 | +0.66 | +1.00 | +0.12 | +1.00 | +0.00 |
| 51 | Ryze | +0.73 | +0.83 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 52 | Graves | +0.72 | +1.00 | +1.00 | +0.55 | +0.09 | +1.00 | +0.00 |
| 53 | Rakan | +0.71 | +1.00 | +0.66 | +1.00 | −0.01 | +1.00 | +0.00 |
| 54 | Irelia | +0.71 | +1.00 | +1.00 | +1.00 | −0.00 | +0.09 | +0.00 |
| 55 | Kassadin | +0.71 | +1.00 | +1.00 | +1.00 | −0.00 | +0.06 | +0.00 |
| 56 | Yasuo | +0.70 | +1.00 | +0.78 | +1.00 | −0.03 | +0.58 | +0.00 |
| 57 | Wukong | +0.69 | +0.60 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 58 | Varus | +0.65 | +0.78 | +0.78 | +1.00 | +0.00 | – | +0.00 |
| 59 | Ashe | +0.60 | +1.00 | +1.00 | +0.17 | +0.02 | – | +0.00 |
| 60 | Ziggs | +0.59 | +1.00 | +1.00 | +0.12 | +0.08 | – | +0.00 |
| 61 | Maokai | +0.59 | +1.00 | +0.20 | +1.00 | −0.09 | +1.00 | +0.00 |
| 62 | Sejuani | +0.58 | +1.00 | +1.00 | −0.02 | −0.09 | +1.00 | +0.00 |
| 63 | Twitch | +0.57 | +1.00 | +1.00 | +0.06 | +0.02 | – | +0.00 |
| 64 | Miss Fortune | +0.57 | +1.00 | +1.00 | +0.00 | +0.06 | – | +0.00 |
| 65 | Twisted Fate | +0.55 | +1.00 | +1.00 | +0.00 | −0.02 | – | +0.00 |
| 66 | Kennen | +0.51 | +0.14 | +0.98 | +1.00 | −0.15 | – | +0.00 |
| 67 | Fiddlesticks | +0.50 | +0.02 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 68 | Renekton | +0.46 | +0.06 | +1.00 | +0.52 | −0.05 | +1.00 | +0.00 |
| 69 | Zaahen | +0.46 | +0.29 | +0.44 | +0.76 | +0.18 | +1.00 | +0.00 |
| 70 | Xin Zhao | +0.45 | +0.97 | +0.07 | +0.54 | −0.12 | +1.00 | +0.00 |
| 71 | Akshan | +0.44 | +1.00 | +1.00 | −0.50 | −0.04 | – | +0.00 |
| 72 | Xayah | +0.42 | +1.00 | +0.54 | +0.00 | −0.01 | – | +0.00 |
| 73 | Milio | +0.39 | +0.64 | +0.62 | +0.13 | +0.08 | – | +0.00 |
| 74 | Mordekaiser | +0.37 | +0.51 | +0.60 | +0.23 | −0.05 | +0.48 | +0.00 |
| 75 | Janna | +0.36 | +1.00 | +0.91 | −0.78 | +0.01 | – | +0.00 |
| 76 | Sion | +0.36 | +0.53 | +0.17 | +0.52 | −0.11 | +0.98 | +0.00 |
| 77 | Draven | +0.35 | +1.00 | +1.00 | −0.91 | −0.02 | – | +0.00 |
| 78 | Rammus | +0.35 | +1.00 | +0.04 | +0.00 | −0.09 | +1.00 | +0.00 |
| 79 | Jinx | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 80 | Malzahar | +0.33 | +1.00 | +1.00 | −1.00 | −0.02 | – | +0.00 |
| 81 | Vladimir | +0.33 | −0.31 | +0.89 | +0.99 | −0.14 | +0.08 | +0.00 |
| 82 | Zoe | +0.32 | +1.00 | +1.00 | −1.00 | −0.06 | – | +0.00 |
| 83 | Aurelion Sol | +0.30 | +0.14 | +0.13 | +1.00 | +0.03 | – | +0.00 |
| 84 | Camille | +0.28 | +0.12 | +1.00 | +0.00 | −0.10 | +0.12 | +0.00 |
| 85 | Rumble | +0.26 | +0.65 | +0.65 | +0.05 | −0.14 | −0.61 | +0.00 |
| 86 | Soraka | +0.25 | +0.07 | +0.01 | +1.00 | +0.04 | – | +0.00 |
| 87 | Fizz | +0.23 | +0.21 | +0.12 | +0.31 | −0.07 | +1.00 | +0.00 |
| 88 | Cassiopeia | +0.18 | +0.24 | −0.37 | +1.00 | −0.03 | – | +0.00 |
| 89 | Zac | +0.18 | +0.26 | +0.26 | +0.27 | −0.14 | +0.16 | +0.00 |
| 90 | Gwen | +0.17 | −0.46 | +0.18 | +0.99 | −0.29 | +0.64 | +0.48 |
| 91 | Rell | +0.17 | +0.21 | +0.18 | −0.02 | −0.02 | +0.74 | +0.00 |
| 92 | Kalista | +0.14 | +0.25 | +1.00 | −0.89 | −0.06 | – | +0.00 |
| 93 | Yone | +0.13 | +0.59 | +0.66 | −0.95 | −0.16 | +0.30 | +0.00 |
| 94 | Sona | +0.13 | −0.71 | +1.00 | +0.21 | −0.01 | – | +0.00 |
| 95 | Vi | +0.12 | −0.95 | +1.00 | +1.00 | +0.04 | −0.95 | +0.00 |
| 96 | Smolder | +0.11 | +0.58 | +0.58 | −0.87 | −0.08 | – | +0.00 |
| 97 | Morgana | +0.11 | +0.10 | +0.21 | +0.25 | +0.02 | −0.19 | +0.00 |
| 98 | Diana | +0.10 | +0.12 | −0.02 | +0.16 | +0.13 | +0.21 | +0.00 |
| 99 | Shaco | +0.09 | −0.95 | +1.00 | +1.00 | −0.13 | −1.00 | +0.00 |
| 100 | Samira | +0.07 | −0.13 | −0.43 | +1.00 | +0.02 | – | +0.00 |
| 101 | Nidalee | +0.06 | +0.12 | +0.12 | +0.00 | −0.02 | – | +0.00 |
| 102 | Mel | +0.05 | −0.20 | +0.38 | +0.00 | +0.02 | – | +0.00 |
| 103 | Tahm Kench | +0.05 | +0.10 | +0.10 | +0.05 | −0.07 | −0.01 | +0.00 |
| 104 | Alistar | +0.04 | +0.09 | −0.01 | +0.08 | +0.00 | +0.06 | +0.00 |
| 105 | Malphite | +0.03 | +0.09 | +0.09 | −0.08 | +0.07 | −0.06 | +0.00 |
| 106 | Darius | +0.02 | +0.25 | +0.11 | −0.08 | −0.13 | −0.31 | +0.00 |
| 107 | Zyra | −0.01 | −0.22 | +1.00 | −1.00 | −0.04 | – | +0.00 |
| 108 | Urgot | −0.04 | −0.09 | −0.09 | −0.01 | +0.02 | +0.01 | +0.00 |
| 109 | Shen | −0.06 | −0.11 | −0.05 | +0.01 | −0.03 | −0.11 | +0.00 |
| 110 | Sett | −0.06 | −0.00 | −0.06 | +0.04 | −0.13 | −0.29 | +0.00 |
| 111 | Ornn | −0.07 | −0.10 | −0.07 | −0.03 | −0.09 | −0.07 | +0.00 |
| 112 | Nautilus | −0.07 | −0.14 | −0.07 | −0.04 | +0.01 | −0.11 | +0.00 |
| 113 | Xerath | −0.08 | +1.00 | −0.48 | −1.00 | −0.01 | – | +0.00 |
| 114 | Ezreal | −0.09 | −0.32 | −0.32 | +0.39 | +0.00 | – | +0.00 |
| 115 | Naafiri | −0.10 | −1.00 | +1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 116 | Taric | −0.10 | −0.11 | −0.09 | −0.15 | −0.01 | −0.17 | +0.00 |
| 117 | Braum | −0.10 | −0.06 | −0.18 | −0.05 | −0.04 | −0.24 | +0.00 |
| 118 | Cho'Gath | −0.13 | −0.10 | −0.09 | −0.09 | −0.14 | −0.41 | +0.00 |
| 119 | Karthus | −0.15 | −0.18 | −0.15 | −0.24 | −0.02 | −0.15 | +0.00 |
| 120 | Akali | −0.16 | −0.01 | −0.03 | −0.63 | −0.02 | −0.24 | +0.00 |
| 121 | Skarner | −0.17 | −0.24 | −0.24 | −0.11 | −0.11 | −0.08 | +0.00 |
| 122 | Singed | −0.18 | −0.41 | −0.63 | +1.00 | −0.35 | −0.69 | +0.00 |
| 123 | Syndra | −0.18 | −0.60 | −0.85 | +1.00 | −0.02 | – | +0.00 |
| 124 | Nilah | −0.22 | +0.02 | −0.50 | −0.29 | −0.06 | −0.29 | +0.00 |
| 125 | Kai'Sa | −0.26 | −0.83 | −0.83 | +1.00 | −0.11 | – | +0.00 |
| 126 | Volibear | −0.26 | +0.01 | −0.94 | −0.01 | −0.11 | −0.11 | +0.00 |
| 127 | Briar | −0.27 | −0.86 | −0.86 | +1.00 | −0.29 | +0.01 | +0.00 |
| 128 | Zed | −0.28 | +1.00 | −0.85 | −1.00 | −0.13 | −0.98 | +0.00 |
| 129 | Kindred | −0.31 | −0.92 | −0.94 | +1.00 | −0.10 | – | +0.00 |
| 130 | Elise | −0.32 | −0.98 | −0.95 | +1.00 | −0.04 | – | +0.00 |
| 131 | Lee Sin | −0.33 | −0.53 | −0.72 | +0.00 | −0.09 | +0.00 | +0.00 |
| 132 | Leona | −0.36 | −0.39 | −0.39 | −0.52 | −0.03 | −0.55 | +0.00 |
| 133 | Blitzcrank | −0.38 | −0.40 | −0.51 | −0.57 | +0.00 | −0.41 | +0.00 |
| 134 | Seraphine | −0.38 | −0.10 | −0.44 | −1.00 | −0.06 | – | +0.00 |
| 135 | Warwick | −0.40 | −1.00 | −1.00 | +0.05 | −0.03 | +0.98 | +0.00 |
| 136 | Bard | −0.40 | −0.55 | +0.00 | −1.00 | −0.17 | – | +0.00 |
| 137 | Quinn | −0.41 | −0.10 | −0.95 | −0.45 | −0.08 | – | +0.00 |
| 138 | Nunu & Willump | −0.44 | −0.54 | −0.24 | −0.81 | +0.07 | −0.95 | +0.00 |
| 139 | Nami | −0.48 | −0.46 | −0.46 | −1.00 | +0.01 | – | +0.00 |
| 140 | Brand | −0.48 | −0.96 | −0.76 | +0.00 | −0.01 | – | +0.00 |
| 141 | Rek'Sai | −0.50 | −0.41 | −0.69 | −0.51 | −0.15 | −0.94 | +0.00 |
| 142 | Ekko | −0.52 | −0.75 | −1.00 | +0.18 | −0.12 | −1.00 | +0.00 |
| 143 | Evelynn | −0.57 | −1.00 | −1.00 | +0.02 | +0.12 | −0.94 | +0.00 |
| 144 | LeBlanc | −0.60 | −0.93 | −0.95 | −0.24 | −0.12 | – | +0.00 |
| 145 | Ambessa | −0.61 | −1.00 | −1.00 | −0.94 | −0.15 | +1.00 | +0.00 |
| 146 | Sivir | −0.62 | −0.70 | −0.74 | −0.97 | −0.04 | – | +0.00 |
| 147 | Zilean | −0.64 | −0.81 | −0.67 | −1.00 | −0.04 | – | +0.00 |
| 148 | Veigar | −0.65 | −0.81 | −0.69 | −1.00 | −0.04 | – | +0.00 |
| 149 | Garen | −0.67 | −0.77 | −0.75 | −0.92 | −0.02 | −1.00 | +0.00 |
| 150 | Kayn | −0.67 | −0.90 | −0.79 | −0.82 | −0.08 | −0.73 | +0.00 |
| 151 | Vex | −0.69 | −1.00 | −1.00 | −0.59 | −0.03 | – | +0.00 |
| 152 | Kha'Zix | −0.69 | −0.57 | −0.98 | −0.95 | −0.09 | −1.00 | +0.00 |
| 153 | Jarvan IV | −0.70 | −0.81 | −0.87 | −0.94 | −0.01 | −0.87 | +0.00 |
| 154 | Locke | −0.70 | −0.78 | −0.77 | −1.00 | −0.12 | −0.96 | +0.00 |
| 155 | Renata Glasc | −0.72 | −0.90 | −0.90 | −1.00 | +0.02 | – | +0.00 |
| 156 | Illaoi | −0.72 | −0.98 | −0.68 | −1.00 | −0.07 | −0.96 | +0.00 |
| 157 | Caitlyn | −0.73 | −0.88 | −0.87 | −1.00 | −0.01 | −0.91 | +0.00 |
| 158 | Ahri | −0.75 | −1.00 | −1.00 | −0.84 | −0.02 | – | +0.00 |
| 159 | Senna | −0.76 | −0.97 | −0.97 | −1.00 | +0.03 | – | +0.00 |
| 160 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 161 | Amumu | −0.77 | −0.95 | −0.93 | −0.96 | −0.08 | −0.91 | +0.00 |
| 162 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 163 | Viego | −0.78 | −0.94 | −1.00 | −0.93 | −0.09 | −1.00 | +0.00 |
| 164 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 165 | Aatrox | −0.80 | −0.92 | −0.94 | −1.00 | −0.25 | −0.93 | +0.00 |
| 166 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −0.99 | +0.00 |
| 167 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −0.98 | +0.00 |
| 168 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 169 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 170 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 171 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 172 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Lux's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Lux's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Lux` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Yuumi (net +0.89)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Lux's Light Binding. Untargetable for ?; Light Binding takes 1.33 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Lux Q Light Binding)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Lux's Final Spark. Untargetable for ?; Final Spark takes 1 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Lux R Final Spark)
- Watch out: Lux's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

#### 2. Fizz (net +0.84)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Lux's Light Binding. Untargetable for 0.75 s; Light Binding takes 1.33 s to land, enough to react. (Fizz E Playful → Lux Q Light Binding)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Lux's Final Spark. Untargetable for 0.75 s; Final Spark takes 1 s to land, enough to react. (Fizz E Playful → Lux R Final Spark)
- Watch out: Lux's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 3. Sivir (net +0.81)

- **0.55** spell shield: Spell Shield's spell shield blocks Lux's Final Spark. Spell shield for 1.5 s, long enough to use ahead of Final Spark. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Lux R Final Spark)
- **0.51** spell shield: Spell Shield's spell shield blocks Lux's Light Binding. Spell shield for 1.5 s, long enough to use ahead of Light Binding. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Lux Q Light Binding)

#### 4. Braum (net +0.74)

- **0.70** projectile block: Unbreakable blocks Lux's Light Binding, a projectile. Unbreakable for 4 s, long enough to use ahead of Light Binding. (Braum E Unbreakable → Lux Q Light Binding)
- **0.45** projectile block: Unbreakable blocks Lux's Lucent Singularity, a projectile. Unbreakable for 4 s, long enough to use ahead of Lucent Singularity. (Braum E Unbreakable → Lux E Lucent Singularity)
- **0.41** projectile block: Unbreakable blocks Lux's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Lux basic attacks)
- Watch out: Lux's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 5. Maokai (net +0.69)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Lux's Light Binding. Untargetable for 1.4 s; Light Binding takes 1.33 s to land, enough to react. (Maokai W Twisted Advance → Lux Q Light Binding)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Lux's Final Spark. Untargetable for 1.4 s; Final Spark takes 1 s to land, enough to react. (Maokai W Twisted Advance → Lux R Final Spark)
- Watch out: Lux's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

#### 6. Vladimir (net +0.68)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lux's Final Spark. Untargetable for 2 s, long enough to use ahead of Final Spark. (Vladimir W Sanguine Pool → Lux R Final Spark)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lux's Light Binding. Untargetable for 2 s, long enough to use ahead of Light Binding. (Vladimir W Sanguine Pool → Lux Q Light Binding)
- Watch out: Lux's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

#### 7. Samira (net +0.67)

- **0.47** projectile block: Blade Whirl blocks Lux's Light Binding, a projectile. Blade Whirl for 0.75 s; Light Binding takes 1.33 s to land, enough to react. (Samira W Blade Whirl → Lux Q Light Binding)
- **0.28** projectile block: Blade Whirl blocks Lux's Lucent Singularity, a projectile. Blade Whirl for 0.75 s; Lucent Singularity takes 1.17 s to land, enough to react. (Samira W Blade Whirl → Lux E Lucent Singularity)
- **0.24** projectile block: Blade Whirl blocks Lux's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Lux basic attacks)

#### 8. Fiora (net +0.64)

- **0.64** parry: Riposte parries Lux's Light Binding and stuns back. Parry for 0.75 s; Light Binding takes 1.33 s to land, enough to react. Negating Light Binding's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Lux Q Light Binding)
- **0.55** parry: Riposte parries Lux's Final Spark. Parry for 0.75 s; Final Spark takes 1 s to land, enough to react. (Fiora W Riposte → Lux R Final Spark)
- **0.07** attack speed slow: Riposte cuts Lux's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Lux basic attacks)
- Watch out: Lux's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

#### 9. Mel (net +0.63)

- **0.44** projectile block: Rebuttal blocks Lux's Light Binding, a projectile. Rebuttal for 0.75 s; Light Binding takes 1.33 s to land, enough to react. (Mel W Rebuttal → Lux Q Light Binding)
- **0.26** projectile block: Rebuttal blocks Lux's Lucent Singularity, a projectile. Rebuttal for 0.75 s; Lucent Singularity takes 1.17 s to land, enough to react. (Mel W Rebuttal → Lux E Lucent Singularity)
- **0.24** projectile block: Rebuttal blocks Lux's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Lux basic attacks)

#### 10. Nocturne (net +0.62)

- **0.63** spell shield: Shroud of Darkness's spell shield blocks Lux's Light Binding. Spell shield for 1.5 s, long enough to use ahead of Light Binding. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Lux Q Light Binding)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Lux's Final Spark. Spell shield for 1.5 s, long enough to use ahead of Final Spark. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Lux R Final Spark)
- Watch out: Lux's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +0.89 | 0.98 | 0.09 |  |
| 2 | Fizz | +0.84 | 0.98 | 0.14 |  |
| 3 | Sivir | +0.81 | 0.81 | 0.00 |  |
| 4 | Braum | +0.74 | 1.03 | 0.29 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Maokai | +0.69 | 0.98 | 0.29 |  |
| 6 | Vladimir | +0.68 | 0.82 | 0.14 |  |
| 7 | Samira | +0.67 | 0.67 | 0.00 | projectile block (Blade Whirl) |
| 8 | Fiora | +0.64 | 0.93 | 0.29 |  |
| 9 | Mel | +0.63 | 0.63 | 0.00 | projectile block (Rebuttal) |
| 10 | Nocturne | +0.62 | 0.91 | 0.29 |  |
| 11 | Kayle | +0.62 | 0.62 | 0.00 |  |
| 12 | Master Yi | +0.61 | 0.88 | 0.27 |  |
| 13 | Yasuo | +0.58 | 0.76 | 0.18 | projectile block (Wind Wall) |
| 14 | Bard | +0.56 | 0.56 | 0.00 |  |
| 15 | Lissandra | +0.56 | 0.56 | 0.00 |  |
| 16 | Gwen | +0.52 | 0.81 | 0.29 |  |
| 17 | Aurora | +0.51 | 0.51 | 0.00 |  |
| 18 | Xayah | +0.51 | 0.51 | 0.00 |  |
| 19 | Pantheon | +0.50 | 0.68 | 0.18 |  |
| 20 | Udyr | +0.47 | 0.76 | 0.29 |  |
| 21 | Morgana | +0.44 | 0.58 | 0.14 |  |
| 22 | Camille | +0.40 | 0.54 | 0.14 |  |
| 23 | Kayn | +0.38 | 0.56 | 0.18 |  |
| 24 | Rek'Sai | +0.38 | 0.56 | 0.18 |  |
| 25 | Malzahar | +0.38 | 0.38 | 0.00 |  |
| 26 | Teemo | +0.38 | 0.38 | 0.00 |  |
| 27 | Evelynn | +0.37 | 0.56 | 0.19 |  |
| 28 | Shaco | +0.37 | 0.56 | 0.19 |  |
| 29 | Milio | +0.36 | 0.36 | 0.00 |  |
| 30 | Zed | +0.32 | 0.51 | 0.19 |  |
| 31 | Kalista | +0.27 | 0.27 | 0.00 |  |
| 32 | Lulu | +0.27 | 0.27 | 0.00 |  |
| 33 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 34 | Kled | +0.24 | 0.35 | 0.11 |  |
| 35 | Warwick | +0.18 | 0.37 | 0.19 |  |
| 36 | Zaahen | +0.18 | 0.36 | 0.18 |  |
| 37 | Caitlyn | +0.18 | 0.18 | 0.00 |  |
| 38 | Xin Zhao | +0.16 | 0.43 | 0.27 |  |
| 39 | Shen | +0.10 | 0.29 | 0.19 |  |
| 40 | Annie | +0.08 | 0.08 | 0.00 |  |
| 41 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 42 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 43 | Nilah | +0.03 | 0.27 | 0.24 |  |
| 44 | Rengar | +0.02 | 0.60 | 0.58 |  |
| 45 | Jax | +0.02 | 0.31 | 0.29 |  |
| 46 | Alistar | 0.00 | 0.29 | 0.29 |  |
| 47 | Rammus | 0.00 | 0.29 | 0.29 |  |
| 48 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 49 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 50 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 51 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 52 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 53 | Azir | 0.00 | 0.00 | 0.00 |  |
| 54 | Brand | 0.00 | 0.00 | 0.00 |  |
| 55 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 56 | Corki | 0.00 | 0.00 | 0.00 |  |
| 57 | Draven | 0.00 | 0.00 | 0.00 |  |
| 58 | Elise | 0.00 | 0.00 | 0.00 |  |
| 59 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 60 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 61 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 62 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 63 | Janna | 0.00 | 0.00 | 0.00 |  |
| 64 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 65 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 66 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 67 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 68 | Karma | 0.00 | 0.00 | 0.00 |  |
| 69 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 70 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 71 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 72 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 73 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 74 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 75 | Nami | 0.00 | 0.00 | 0.00 |  |
| 76 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 77 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 78 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 79 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 80 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 81 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 82 | Senna | 0.00 | 0.00 | 0.00 |  |
| 83 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 84 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 85 | Sona | 0.00 | 0.00 | 0.00 |  |
| 86 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 87 | Swain | 0.00 | 0.00 | 0.00 |  |
| 88 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 89 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 90 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 91 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 92 | Varus | 0.00 | 0.00 | 0.00 |  |
| 93 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 94 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 95 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 96 | Vex | 0.00 | 0.00 | 0.00 |  |
| 97 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 98 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 99 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 100 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 101 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 102 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 103 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 104 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 105 | Ivern | -0.05 | 0.00 | 0.05 |  |
| 106 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 107 | Graves | -0.06 | 0.00 | 0.06 |  |
| 108 | Gangplank | -0.08 | 0.50 | 0.58 |  |
| 109 | Malphite | -0.10 | 0.19 | 0.29 |  |
| 110 | Rakan | -0.12 | 0.00 | 0.12 |  |
| 111 | Viego | -0.13 | 0.00 | 0.13 |  |
| 112 | Briar | -0.14 | 0.00 | 0.14 |  |
| 113 | Jarvan IV | -0.14 | 0.00 | 0.14 |  |
| 114 | Karthus | -0.14 | 0.00 | 0.14 |  |
| 115 | K'Sante | -0.14 | 0.00 | 0.14 |  |
| 116 | Naafiri | -0.14 | 0.00 | 0.14 |  |
| 117 | Sylas | -0.14 | 0.00 | 0.14 |  |
| 118 | Urgot | -0.14 | 0.00 | 0.14 |  |
| 119 | Yone | -0.14 | 0.00 | 0.14 |  |
| 120 | Sion | -0.16 | 0.38 | 0.54 |  |
| 121 | Lillia | -0.16 | 0.00 | 0.16 |  |
| 122 | Hecarim | -0.18 | 0.00 | 0.18 |  |
| 123 | Wukong | -0.18 | 0.00 | 0.18 |  |
| 124 | Ornn | -0.18 | 0.00 | 0.18 |  |
| 125 | Rell | -0.18 | 0.00 | 0.18 |  |
| 126 | Akali | -0.19 | 0.00 | 0.19 |  |
| 127 | Ambessa | -0.19 | 0.00 | 0.19 |  |
| 128 | Bel'Veth | -0.19 | 0.00 | 0.19 |  |
| 129 | Ekko | -0.19 | 0.00 | 0.19 |  |
| 130 | Galio | -0.19 | 0.00 | 0.19 |  |
| 131 | Lee Sin | -0.19 | 0.00 | 0.19 |  |
| 132 | Pyke | -0.19 | 0.00 | 0.19 |  |
| 133 | Qiyana | -0.19 | 0.00 | 0.19 |  |
| 134 | Riven | -0.19 | 0.00 | 0.19 |  |
| 135 | Talon | -0.19 | 0.00 | 0.19 |  |
| 136 | Vi | -0.19 | 0.00 | 0.19 |  |
| 137 | Volibear | -0.19 | 0.00 | 0.19 |  |
| 138 | Olaf | -0.22 | 0.36 | 0.58 |  |
| 139 | Garen | -0.25 | 0.29 | 0.54 |  |
| 140 | Irelia | -0.25 | 0.00 | 0.25 |  |
| 141 | Aatrox | -0.27 | 0.00 | 0.27 |  |
| 142 | Nautilus | -0.27 | 0.00 | 0.27 |  |
| 143 | Tahm Kench | -0.27 | 0.00 | 0.27 |  |
| 144 | Tryndamere | -0.27 | 0.00 | 0.27 |  |
| 145 | Zac | -0.27 | 0.00 | 0.27 |  |
| 146 | Nasus | -0.29 | 0.29 | 0.58 |  |
| 147 | Amumu | -0.29 | 0.00 | 0.29 |  |
| 148 | Diana | -0.29 | 0.00 | 0.29 |  |
| 149 | Gragas | -0.29 | 0.00 | 0.29 |  |
| 150 | Illaoi | -0.29 | 0.00 | 0.29 |  |
| 151 | Kassadin | -0.29 | 0.00 | 0.29 |  |
| 152 | Katarina | -0.29 | 0.00 | 0.29 |  |
| 153 | Kha'Zix | -0.29 | 0.00 | 0.29 |  |
| 154 | Leona | -0.29 | 0.00 | 0.29 |  |
| 155 | Locke | -0.29 | 0.00 | 0.29 |  |
| 156 | Poppy | -0.29 | 0.00 | 0.29 |  |
| 157 | Renekton | -0.29 | 0.00 | 0.29 |  |
| 158 | Sejuani | -0.29 | 0.00 | 0.29 |  |
| 159 | Sett | -0.29 | 0.00 | 0.29 |  |
| 160 | Shyvana | -0.29 | 0.00 | 0.29 |  |
| 161 | Nunu & Willump | -0.45 | 0.13 | 0.58 |  |
| 162 | Mordekaiser | -0.47 | 0.07 | 0.54 |  |
| 163 | Skarner | -0.52 | 0.06 | 0.58 |  |
| 164 | Darius | -0.54 | 0.00 | 0.54 |  |
| 165 | Trundle | -0.54 | 0.00 | 0.54 |  |
| 166 | Yorick | -0.54 | 0.00 | 0.54 |  |
| 167 | Blitzcrank | -0.58 | 0.00 | 0.58 |  |
| 168 | Cho'Gath | -0.58 | 0.00 | 0.58 |  |
| 169 | Dr. Mundo | -0.58 | 0.00 | 0.58 |  |
| 170 | Rumble | -0.58 | 0.00 | 0.58 |  |
| 171 | Singed | -0.58 | 0.00 | 0.58 |  |
| 172 | Taric | -0.58 | 0.00 | 0.58 |  |
