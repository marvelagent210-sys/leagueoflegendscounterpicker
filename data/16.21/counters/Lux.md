# Counters to Lux (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Lux: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Lux wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Lux --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.87 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +1.00 |
| 2 | Rengar | +0.85 | +1.00 | +1.00 | +1.00 | +0.33 | +1.00 | +0.00 |
| 3 | Gangplank | +0.85 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.55 |
| 4 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | +0.03 | +0.86 | +1.00 |
| 5 | Sylas | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 6 | Vel'Koz | +0.82 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.00 |
| 7 | Graves | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 8 | Yorick | +0.81 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.50 |
| 9 | Kassadin | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 10 | Trundle | +0.80 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.56 |
| 11 | Tristana | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 12 | Gragas | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 13 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 14 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 15 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 16 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 17 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +0.49 |
| 18 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 19 | Jhin | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 20 | Swain | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 21 | Kayle | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 22 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 23 | Maokai | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 24 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 25 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 26 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 27 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 28 | Lillia | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +0.98 | +0.00 |
| 29 | Irelia | +0.78 | +0.94 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 30 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 31 | Jayce | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 32 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 33 | Annie | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 34 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 35 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 36 | Aurora | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 37 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 38 | Xayah | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 39 | Hwei | +0.77 | +1.00 | +0.99 | +1.00 | −0.01 | – | +0.00 |
| 40 | Varus | +0.77 | +0.99 | +0.99 | +1.00 | +0.00 | – | +0.00 |
| 41 | Orianna | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 42 | Azir | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 43 | Teemo | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 44 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.07 |
| 45 | Ashe | +0.77 | +1.00 | +1.00 | +0.95 | +0.02 | – | +0.00 |
| 46 | Karma | +0.77 | +0.99 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 47 | Yunara | +0.77 | +0.95 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 48 | Lucian | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 49 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 50 | Sivir | +0.75 | +1.00 | +1.00 | +0.92 | −0.04 | – | +0.00 |
| 51 | Ryze | +0.74 | +1.00 | +0.88 | +1.00 | −0.01 | – | +0.00 |
| 52 | Shyvana | +0.74 | +0.78 | +0.99 | +1.00 | −0.04 | +1.00 | +0.00 |
| 53 | Rakan | +0.72 | +1.00 | +0.68 | +1.00 | −0.01 | +1.00 | +0.00 |
| 54 | Neeko | +0.71 | +0.78 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 55 | Briar | +0.66 | +1.00 | +1.00 | +1.00 | −0.29 | +0.00 | +0.00 |
| 56 | Fiddlesticks | +0.65 | +0.55 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 57 | Poppy | +0.63 | +1.00 | +0.25 | +1.00 | +0.12 | +1.00 | +0.00 |
| 58 | Riven | +0.62 | +1.00 | +1.00 | +1.00 | +0.05 | −0.88 | +0.00 |
| 59 | Samira | +0.62 | +1.00 | +0.41 | +1.00 | +0.02 | – | +0.00 |
| 60 | Bel'Veth | +0.61 | +1.00 | +0.25 | +1.00 | −0.03 | +1.00 | +0.03 |
| 61 | Ziggs | +0.59 | +1.00 | +1.00 | +0.12 | +0.08 | – | +0.00 |
| 62 | Sejuani | +0.58 | +1.00 | +1.00 | −0.02 | −0.09 | +1.00 | +0.00 |
| 63 | Kennen | +0.58 | +0.36 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 64 | Twitch | +0.57 | +1.00 | +1.00 | +0.06 | +0.02 | – | +0.00 |
| 65 | Miss Fortune | +0.57 | +1.00 | +1.00 | +0.00 | +0.06 | – | +0.00 |
| 66 | Milio | +0.56 | +0.69 | +1.00 | +0.35 | +0.08 | – | +0.00 |
| 67 | Nidalee | +0.55 | +1.00 | +1.00 | +0.00 | −0.02 | – | +0.00 |
| 68 | Twisted Fate | +0.55 | +1.00 | +1.00 | +0.00 | −0.02 | – | +0.00 |
| 69 | Galio | +0.54 | +1.00 | −0.03 | +1.00 | −0.04 | +1.00 | +0.00 |
| 70 | Yasuo | +0.51 | +1.00 | +0.07 | +0.97 | −0.03 | +0.58 | +0.00 |
| 71 | Wukong | +0.47 | +0.10 | +1.00 | +1.00 | −0.04 | +0.04 | +0.00 |
| 72 | Fizz | +0.45 | +0.20 | +1.00 | +0.31 | −0.07 | +1.00 | +0.00 |
| 73 | Sion | +0.44 | +0.53 | +0.79 | +0.17 | −0.11 | +0.98 | +0.00 |
| 74 | Akshan | +0.44 | +1.00 | +1.00 | −0.50 | −0.04 | – | +0.00 |
| 75 | Rumble | +0.40 | +1.00 | +1.00 | +0.05 | −0.14 | −0.87 | +0.00 |
| 76 | Rammus | +0.39 | +1.00 | +1.00 | −0.98 | −0.09 | +1.00 | +0.00 |
| 77 | Zaahen | +0.37 | −0.83 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 78 | Renekton | +0.36 | +0.49 | +0.18 | +0.51 | −0.05 | +1.00 | +0.00 |
| 79 | Janna | +0.35 | +1.00 | +1.00 | −0.91 | +0.01 | – | +0.00 |
| 80 | Mordekaiser | +0.35 | +0.54 | +0.37 | +0.23 | −0.05 | +0.87 | +0.00 |
| 81 | Shaco | +0.34 | +0.30 | +1.00 | +0.00 | −0.13 | +0.32 | +0.00 |
| 82 | Jinx | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 83 | Draven | +0.33 | +0.96 | +1.00 | −0.94 | −0.02 | – | +0.00 |
| 84 | Malzahar | +0.33 | +1.00 | +1.00 | −1.00 | −0.02 | – | +0.00 |
| 85 | Aurelion Sol | +0.32 | +0.17 | +0.17 | +1.00 | +0.03 | – | +0.00 |
| 86 | Zoe | +0.32 | +1.00 | +1.00 | −1.00 | −0.06 | – | +0.00 |
| 87 | Rell | +0.29 | +0.21 | +0.69 | −0.02 | −0.02 | +0.74 | +0.00 |
| 88 | Mel | +0.29 | +0.72 | +0.93 | −0.77 | +0.02 | – | +0.00 |
| 89 | Gwen | +0.28 | +0.81 | −0.43 | +0.99 | −0.29 | +0.01 | +0.48 |
| 90 | Smolder | +0.27 | +0.87 | +0.87 | −0.87 | −0.08 | – | +0.00 |
| 91 | Soraka | +0.27 | +0.06 | +0.08 | +1.00 | +0.04 | – | +0.00 |
| 92 | Diana | +0.26 | +0.51 | −0.03 | +0.51 | +0.13 | +0.21 | +0.00 |
| 93 | Kalista | +0.26 | +0.72 | +1.00 | −0.93 | −0.06 | – | +0.00 |
| 94 | Kindred | +0.25 | −0.51 | +0.68 | +1.00 | −0.10 | – | +0.00 |
| 95 | Xerath | +0.24 | +1.00 | +0.66 | −1.00 | −0.01 | – | +0.00 |
| 96 | Cassiopeia | +0.23 | +0.93 | −0.88 | +1.00 | −0.03 | – | +0.00 |
| 97 | Ahri | +0.22 | +0.26 | +0.99 | −0.56 | −0.02 | – | +0.00 |
| 98 | Sona | +0.20 | +0.17 | +1.00 | −0.57 | −0.01 | – | +0.00 |
| 99 | Xin Zhao | +0.19 | +0.93 | −0.95 | +0.54 | −0.12 | +1.00 | +0.00 |
| 100 | Anivia | +0.19 | −0.03 | −0.03 | +1.00 | −0.11 | – | +0.00 |
| 101 | Zac | +0.18 | +0.26 | +0.26 | +0.27 | −0.14 | +0.17 | +0.00 |
| 102 | Syndra | +0.12 | −0.99 | +1.00 | +0.55 | −0.02 | – | +0.00 |
| 103 | Tahm Kench | +0.07 | +0.14 | +0.14 | +0.05 | −0.07 | −0.01 | +0.00 |
| 104 | Zyra | +0.06 | +0.05 | +1.00 | −1.00 | −0.04 | – | +0.00 |
| 105 | Volibear | +0.04 | +0.00 | +0.79 | −0.50 | −0.11 | −0.36 | +0.00 |
| 106 | Alistar | +0.03 | +0.04 | +0.05 | +0.06 | +0.00 | −0.01 | +0.00 |
| 107 | Zilean | +0.03 | +0.87 | +0.07 | −1.00 | −0.04 | – | +0.00 |
| 108 | Malphite | +0.03 | +0.09 | +0.09 | −0.07 | +0.07 | −0.10 | +0.00 |
| 109 | Vladimir | +0.01 | −0.70 | +0.00 | +0.86 | −0.14 | +0.35 | +0.00 |
| 110 | Pantheon | +0.01 | −0.53 | −0.66 | +1.00 | +0.01 | +1.00 | +0.00 |
| 111 | Nautilus | −0.02 | −0.00 | +0.00 | −0.04 | +0.01 | −0.13 | +0.00 |
| 112 | Vi | −0.02 | −0.95 | +1.00 | +0.28 | +0.04 | −0.95 | +0.00 |
| 113 | Caitlyn | −0.03 | +0.96 | −0.00 | −1.00 | +0.01 | −0.67 | +0.00 |
| 114 | Yone | −0.04 | +0.46 | +0.43 | −0.99 | −0.16 | −0.39 | +0.00 |
| 115 | Darius | −0.04 | −0.00 | −0.05 | −0.07 | −0.13 | +0.07 | +0.00 |
| 116 | Nilah | −0.04 | +0.33 | −0.34 | −0.32 | −0.06 | +0.32 | +0.00 |
| 117 | Morgana | −0.05 | +0.01 | +0.05 | −0.28 | +0.02 | −0.10 | +0.00 |
| 118 | Sett | −0.05 | +0.00 | −0.05 | −0.01 | −0.13 | −0.16 | +0.00 |
| 119 | Quinn | −0.05 | −0.57 | +0.80 | −0.45 | −0.08 | – | +0.00 |
| 120 | Urgot | −0.06 | −0.15 | −0.15 | +0.06 | +0.02 | +0.02 | +0.00 |
| 121 | Taric | −0.08 | −0.11 | −0.04 | −0.15 | −0.01 | −0.14 | +0.00 |
| 122 | Ornn | −0.09 | −0.13 | −0.11 | −0.03 | −0.09 | −0.08 | +0.00 |
| 123 | Shen | −0.09 | −0.14 | −0.13 | −0.01 | −0.03 | −0.13 | +0.00 |
| 124 | Braum | −0.15 | −0.27 | −0.18 | −0.05 | −0.04 | −0.23 | +0.00 |
| 125 | Karthus | −0.15 | −0.20 | −0.15 | −0.24 | −0.02 | −0.15 | +0.00 |
| 126 | Nami | −0.16 | +0.11 | +0.11 | −1.00 | +0.01 | – | +0.00 |
| 127 | Skarner | −0.17 | −0.24 | −0.24 | −0.11 | −0.11 | −0.08 | +0.00 |
| 128 | Brand | −0.19 | −0.14 | −0.53 | +0.00 | −0.01 | – | +0.00 |
| 129 | Elise | −0.19 | −0.98 | −0.48 | +1.00 | −0.04 | – | +0.00 |
| 130 | Leona | −0.20 | −0.16 | −0.16 | −0.46 | −0.03 | −0.27 | +0.00 |
| 131 | Akali | −0.22 | −0.23 | −0.02 | −0.75 | −0.02 | −0.05 | +0.00 |
| 132 | Veigar | −0.24 | −0.01 | −0.02 | −1.00 | −0.04 | – | +0.00 |
| 133 | Lee Sin | −0.24 | −0.78 | +1.00 | −0.95 | −0.09 | −0.93 | +0.00 |
| 134 | Camille | −0.27 | −0.77 | −0.32 | +0.00 | −0.10 | +0.12 | +0.00 |
| 135 | Garen | −0.29 | −0.44 | −0.38 | −0.92 | −0.02 | +1.00 | +0.00 |
| 136 | Singed | −0.32 | −0.41 | −0.74 | +0.60 | −0.35 | −0.99 | +0.00 |
| 137 | Blitzcrank | −0.33 | −0.45 | −0.26 | −0.57 | +0.00 | −0.36 | +0.00 |
| 138 | Evelynn | −0.36 | −0.37 | −0.37 | −0.91 | +0.12 | −0.14 | +0.00 |
| 139 | Senna | −0.38 | −0.29 | −0.29 | −1.00 | +0.03 | – | +0.00 |
| 140 | Nunu & Willump | −0.44 | −0.55 | −0.24 | −0.81 | +0.07 | −0.95 | +0.00 |
| 141 | Rek'Sai | −0.47 | −0.41 | −0.58 | −0.51 | −0.15 | −0.94 | +0.00 |
| 142 | Viego | −0.47 | −0.80 | −0.73 | +0.05 | −0.09 | −0.86 | +0.00 |
| 143 | Ekko | −0.48 | −0.77 | −0.81 | +0.18 | −0.12 | −1.00 | +0.00 |
| 144 | Amumu | −0.50 | −0.90 | −0.17 | −0.97 | −0.08 | −0.24 | +0.00 |
| 145 | Kai'Sa | −0.52 | −0.91 | −0.91 | +0.00 | −0.11 | – | +0.00 |
| 146 | Illaoi | −0.52 | −0.39 | −0.51 | −1.00 | −0.07 | −0.91 | +0.00 |
| 147 | Bard | −0.53 | −1.00 | +0.00 | −1.00 | −0.17 | – | +0.00 |
| 148 | Cho'Gath | −0.54 | −0.91 | −0.29 | −0.75 | −0.14 | −0.66 | +0.00 |
| 149 | Ezreal | −0.56 | −0.91 | −0.91 | −0.24 | +0.00 | – | +0.00 |
| 150 | Naafiri | −0.60 | −1.00 | −1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 151 | LeBlanc | −0.63 | −0.76 | −1.00 | −0.54 | −0.12 | – | +0.00 |
| 152 | Locke | −0.64 | −0.77 | −0.53 | −1.00 | −0.12 | −1.00 | +0.00 |
| 153 | Kayn | −0.67 | −0.83 | −0.80 | −0.89 | −0.08 | −0.75 | +0.00 |
| 154 | Ambessa | −0.68 | −1.00 | −1.00 | −0.83 | −0.15 | +0.06 | +0.00 |
| 155 | Renata Glasc | −0.68 | −0.83 | −0.83 | −1.00 | +0.02 | – | +0.00 |
| 156 | Kha'Zix | −0.70 | −0.57 | −1.00 | −0.95 | −0.09 | −1.00 | +0.00 |
| 157 | Jarvan IV | −0.70 | −0.78 | −0.85 | −1.00 | −0.01 | −0.88 | +0.00 |
| 158 | Seraphine | −0.72 | −0.87 | −0.89 | −1.00 | −0.06 | – | +0.00 |
| 159 | Vex | −0.72 | −1.00 | −1.00 | −0.72 | −0.03 | – | +0.00 |
| 160 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 161 | Warwick | −0.76 | −1.00 | −0.93 | −0.90 | −0.03 | −0.94 | +0.00 |
| 162 | Zed | −0.77 | −0.97 | −0.91 | −0.97 | −0.13 | −0.91 | +0.00 |
| 163 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 164 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 165 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −0.99 | +0.00 |
| 166 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −0.98 | +0.00 |
| 167 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 168 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 169 | Aatrox | −0.81 | −1.00 | −0.97 | −1.00 | −0.25 | −0.83 | +0.00 |
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
