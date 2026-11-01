# Counters to Fiddlesticks (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Fiddlesticks: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Fiddlesticks wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Fiddlesticks --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.90 | +1.00 | +1.00 | +1.00 | +0.36 | +1.00 | +1.00 |
| 2 | Gangplank | +0.87 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +1.00 |
| 3 | Zeri | +0.84 | +1.00 | +1.00 | +1.00 | +0.06 | – | +1.00 |
| 4 | Olaf | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +1.00 |
| 5 | Galio | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 6 | Caitlyn | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 7 | Pantheon | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 8 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 9 | Rell | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 10 | Viego | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 11 | Ashe | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 12 | Vel'Koz | +0.82 | +1.00 | +1.00 | +0.96 | +0.33 | – | +0.00 |
| 13 | Tristana | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 14 | Diana | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 15 | Jarvan IV | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 16 | Xin Zhao | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 17 | Ambessa | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 18 | Camille | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 19 | Nautilus | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 20 | Master Yi | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 21 | Illaoi | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 22 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 23 | Shaco | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 24 | Smolder | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 25 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 26 | Lee Sin | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 27 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 28 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 29 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 30 | Gragas | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 31 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 32 | Tryndamere | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 33 | Fizz | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 34 | Hecarim | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 35 | Kled | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 36 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 37 | Swain | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 38 | Rammus | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 39 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 40 | Morgana | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 41 | Volibear | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 42 | Rek'Sai | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 43 | Alistar | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 44 | Renekton | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 45 | Braum | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 46 | Riven | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 47 | Milio | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 48 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 49 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 50 | Kayn | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 51 | Yone | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 52 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 53 | Warwick | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 54 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 55 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 56 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 57 | Aatrox | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 58 | Wukong | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 59 | Rakan | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 60 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 61 | Janna | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 62 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 63 | Jhin | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 64 | Briar | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 65 | Sett | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 66 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 67 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 68 | Vi | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 69 | Mordekaiser | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 70 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 71 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 72 | Kennen | +0.78 | +0.91 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 73 | Elise | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 74 | Yunara | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 75 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 76 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 77 | Varus | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 78 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 79 | Draven | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 80 | Corki | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 81 | Aphelios | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 82 | Quinn | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 83 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 84 | Leona | +0.74 | +0.80 | +0.96 | +1.00 | +0.01 | +1.00 | +0.00 |
| 85 | Gnar | +0.66 | +0.73 | +0.72 | +1.00 | −0.02 | +1.00 | +0.00 |
| 86 | Malphite | +0.60 | +1.00 | +1.00 | +1.00 | −0.01 | −1.00 | +0.00 |
| 87 | Tahm Kench | +0.57 | +1.00 | +1.00 | +0.13 | +0.17 | +0.17 | +0.00 |
| 88 | Zac | +0.56 | +0.18 | +1.00 | +1.00 | −0.20 | +0.98 | +0.00 |
| 89 | Sion | +0.56 | +1.00 | +0.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 90 | Irelia | +0.52 | +1.00 | −0.23 | +1.00 | +0.16 | +1.00 | +0.00 |
| 91 | Taric | +0.42 | +1.00 | −0.08 | +0.65 | −0.02 | +0.64 | +0.00 |
| 92 | Twitch | +0.37 | +1.00 | −0.43 | +1.00 | −0.04 | – | +0.00 |
| 93 | Amumu | +0.36 | +0.07 | +1.00 | +1.00 | −0.04 | −1.00 | +0.00 |
| 94 | Urgot | +0.35 | +0.06 | +0.14 | +0.94 | +0.08 | +0.97 | +0.00 |
| 95 | Cho'Gath | +0.34 | +1.00 | −0.86 | +1.00 | +0.04 | +1.00 | +0.00 |
| 96 | Miss Fortune | +0.33 | +1.00 | +1.00 | −1.00 | +0.00 | – | +0.00 |
| 97 | Singed | +0.29 | +1.00 | −1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 98 | Ekko | +0.29 | +1.00 | −1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 99 | Jayce | +0.29 | +1.00 | −1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 100 | Ziggs | +0.27 | −1.00 | +1.00 | +1.00 | +0.27 | – | +0.00 |
| 101 | Graves | +0.23 | +1.00 | −1.00 | +1.00 | +0.07 | – | +0.00 |
| 102 | Syndra | +0.23 | −1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 103 | Xayah | +0.22 | +1.00 | −1.00 | +1.00 | +0.01 | – | +0.00 |
| 104 | Orianna | +0.22 | +1.00 | −1.00 | +1.00 | −0.02 | – | +0.00 |
| 105 | Teemo | +0.22 | +1.00 | −1.00 | +1.00 | −0.03 | – | +0.00 |
| 106 | Kindred | +0.22 | +1.00 | −1.00 | +1.00 | −0.04 | – | +0.00 |
| 107 | Zoe | +0.21 | +0.70 | −0.62 | +0.79 | +0.10 | – | +0.00 |
| 108 | Sona | +0.21 | −1.00 | +0.95 | +1.00 | +0.01 | – | +0.00 |
| 109 | Ezreal | +0.18 | +0.68 | −0.41 | +0.41 | +0.06 | – | +0.00 |
| 110 | Ornn | +0.16 | +0.13 | +0.04 | +0.13 | +0.05 | +0.79 | +0.00 |
| 111 | Sylas | +0.12 | −1.00 | +1.00 | +1.00 | +0.16 | −1.00 | +0.00 |
| 112 | Neeko | +0.10 | +0.56 | −1.00 | +1.00 | −0.02 | – | +0.00 |
| 113 | Shen | +0.07 | +0.04 | +0.03 | +0.14 | +0.13 | +0.06 | +0.00 |
| 114 | Aurora | +0.04 | +0.07 | +0.06 | −0.06 | +0.09 | – | +0.00 |
| 115 | Soraka | +0.03 | −0.08 | −0.00 | +0.19 | +0.06 | – | +0.00 |
| 116 | Nami | +0.02 | −0.02 | +0.06 | +0.04 | −0.02 | – | +0.00 |
| 117 | Annie | +0.00 | −1.00 | +0.17 | +1.00 | +0.01 | +0.11 | +0.00 |
| 118 | Hwei | +0.00 | −0.74 | −0.04 | +1.00 | −0.01 | – | +0.00 |
| 119 | Bard | −0.05 | +0.00 | −1.00 | +1.00 | +0.04 | – | +0.00 |
| 120 | Sejuani | −0.08 | −0.74 | −0.74 | +1.00 | −0.05 | +1.00 | +0.00 |
| 121 | Anivia | −0.17 | −0.33 | −0.15 | −0.25 | −0.06 | +0.08 | +0.00 |
| 122 | Skarner | −0.21 | −1.00 | −1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 123 | Karthus | −0.21 | −0.25 | −0.28 | −0.35 | +0.05 | – | +0.00 |
| 124 | Rumble | −0.22 | −1.00 | −1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 125 | Brand | −0.29 | −0.13 | −0.10 | −1.00 | −0.00 | – | +0.00 |
| 126 | Blitzcrank | −0.30 | −1.00 | −0.11 | −0.11 | +0.11 | −0.12 | +0.00 |
| 127 | Zyra | −0.31 | −0.15 | −0.14 | −1.00 | −0.03 | – | +0.00 |
| 128 | Kai'Sa | −0.32 | −1.00 | −0.94 | +1.00 | −0.04 | – | +0.00 |
| 129 | Cassiopeia | −0.33 | −1.00 | −1.00 | +1.00 | +0.04 | – | +0.00 |
| 130 | Renata Glasc | −0.33 | −1.00 | −1.00 | +1.00 | +0.02 | – | +0.00 |
| 131 | Viktor | −0.34 | −1.00 | −1.00 | +1.00 | −0.02 | – | +0.00 |
| 132 | Samira | −0.34 | −1.00 | −1.00 | +1.00 | −0.03 | – | +0.00 |
| 133 | Kalista | −0.35 | −1.00 | −1.00 | +1.00 | −0.07 | – | +0.00 |
| 134 | Thresh | −0.35 | +0.51 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 135 | Ahri | −0.39 | −0.31 | −1.00 | −0.17 | +0.08 | – | +0.00 |
| 136 | Qiyana | −0.40 | −1.00 | −1.00 | +1.00 | +0.00 | −1.00 | +0.00 |
| 137 | Nilah | −0.41 | −1.00 | −1.00 | +1.00 | −0.09 | −1.00 | +0.00 |
| 138 | Aurelion Sol | −0.54 | −0.51 | −0.73 | −1.00 | +0.16 | – | +0.00 |
| 139 | Veigar | −0.56 | −1.00 | −1.00 | −0.03 | +0.00 | – | +0.00 |
| 140 | Rengar | −0.58 | −1.00 | −1.00 | −1.00 | +0.13 | +1.00 | +0.00 |
| 141 | Lillia | −0.61 | −1.00 | −1.00 | −1.00 | −0.03 | +1.00 | +0.00 |
| 142 | Vladimir | −0.61 | −1.00 | −1.00 | −0.15 | −0.13 | – | +0.00 |
| 143 | Pyke | −0.62 | −1.00 | −1.00 | −1.00 | −0.10 | +1.00 | +0.00 |
| 144 | Zed | −0.62 | −1.00 | −1.00 | −1.00 | −0.12 | +1.00 | +0.00 |
| 145 | Karma | −0.64 | −1.00 | −0.52 | −1.00 | +0.01 | – | +0.00 |
| 146 | Nunu & Willump | −0.64 | −1.00 | −0.36 | −1.00 | −0.00 | −1.00 | +0.00 |
| 147 | Xerath | −0.64 | −1.00 | −0.53 | −1.00 | +0.03 | – | +0.00 |
| 148 | Lux | −0.65 | −1.00 | −0.55 | −1.00 | +0.03 | – | +0.00 |
| 149 | Vex | −0.67 | −1.00 | −1.00 | −0.50 | −0.01 | – | +0.00 |
| 150 | Taliyah | −0.74 | −1.00 | −1.00 | −1.00 | +0.24 | – | +0.00 |
| 151 | Lissandra | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 152 | Jinx | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 153 | Azir | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 154 | Akshan | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 155 | Mel | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 156 | Malzahar | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 157 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 158 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 159 | Lucian | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 160 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 161 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 162 | Yuumi | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 163 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 164 | Nidalee | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 165 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 166 | Zilean | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 167 | Naafiri | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 168 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 169 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 170 | Akali | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 171 | Locke | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 172 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Fiddlesticks's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Fiddlesticks's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Fiddlesticks` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Rell (net +2.10)

- **0.35** interrupt: Ferromancy: Crash Down's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Ferromancy: Mount Up's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Full Tilt's stun interrupts Fiddlesticks's Crowstorm (movement channel). Full Tilt must land during the channel. (Rell E Full Tilt → Fiddlesticks R Crowstorm)
- Watch out: Fiddlesticks's basic attacks reach 305 units farther than Rell's (480 vs 175 attack range).

#### 2. Yasuo (net +1.52)

- **0.60** projectile block: Wind Wall blocks Fiddlesticks's Terrify, a projectile. Wind Wall for 4 s, long enough to use ahead of Terrify. (Yasuo W Wind Wall → Fiddlesticks Q Terrify)
- **0.35** interrupt: Last Breath's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Last Breath must land during the channel. (Yasuo R Last Breath → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Steel Tempest's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Fiddlesticks R Crowstorm)
- Watch out: Fiddlesticks's basic attacks reach 305 units farther than Yasuo's (480 vs 175 attack range).

#### 3. Braum (net +1.50)

- **0.70** projectile block: Unbreakable blocks Fiddlesticks's Terrify, a projectile. Unbreakable for 4 s, long enough to use ahead of Terrify. (Braum E Unbreakable → Fiddlesticks Q Terrify)
- **0.35** interrupt: Concussive Blows's stun interrupts Fiddlesticks's Crowstorm (movement channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Fiddlesticks R Crowstorm)
- **0.31** interrupt: Glacial Fissure's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Glacial Fissure must land during the channel. (Braum R Glacial Fissure → Fiddlesticks R Crowstorm)
- Watch out: Fiddlesticks's basic attacks reach 355 units farther than Braum's (480 vs 125 attack range).

#### 4. Fizz (net +1.36)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Fiddlesticks's Terrify. Untargetable for 0.75 s; Terrify takes 0.35 s to land, enough to react. (Fizz E Playful → Fiddlesticks Q Terrify)
- **0.42** untargetable: Playful makes Fizz untargetable, dodging Fiddlesticks's Crowstorm. Untargetable for 0.75 s; Crowstorm lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Fiddlesticks R Crowstorm)
- **0.38** untargetable: Playful makes Fizz untargetable, dodging Fiddlesticks's Reap. Untargetable for 0.75 s; Reap takes 0.4 s to land, enough to react. (Fizz E Playful → Fiddlesticks E Reap)
- Watch out: Fiddlesticks's basic attacks reach 305 units farther than Fizz's (480 vs 175 attack range).

#### 5. Maokai (net +1.30)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Fiddlesticks's Terrify. Untargetable for 1.4 s; Terrify takes 0.35 s to land, enough to react. (Maokai W Twisted Advance → Fiddlesticks Q Terrify)
- **0.42** untargetable: Twisted Advance makes Maokai untargetable, dodging Fiddlesticks's Crowstorm. Untargetable for 1.4 s; Crowstorm lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Bramble Smash's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Fiddlesticks R Crowstorm)
- Watch out: Fiddlesticks's basic attacks reach 355 units farther than Maokai's (480 vs 125 attack range).

#### 6. Rek'Sai (net +1.30)

- **0.70** untargetable: Void Rush makes Rek'Sai untargetable, dodging Fiddlesticks's Crowstorm. Untargetable for 1.5 s, long enough to use ahead of Crowstorm. (Rek'Sai R Void Rush → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Unburrow's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Fiddlesticks R Crowstorm)
- **0.35** untargetable: Void Rush makes Rek'Sai untargetable, dodging Fiddlesticks's Terrify. Untargetable for 1.5 s, long enough to use ahead of Terrify. (Rek'Sai R Void Rush → Fiddlesticks Q Terrify)
- Watch out: Fiddlesticks's basic attacks reach 305 units farther than Rek'Sai's (480 vs 175 attack range).

#### 7. K'Sante (net +1.23)

- **0.35** interrupt: All Out's airborne interrupts Fiddlesticks's Crowstorm (movement channel). All Out must land during the channel. (K'Sante R All Out → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Ntofo Strikes's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Ntofo Strikes must land during the channel. (K'Sante Q Ntofo Strikes → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Path Maker's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Path Maker must land during the channel. (K'Sante W Path Maker → Fiddlesticks R Crowstorm)
- Watch out: Fiddlesticks's basic attacks reach 330 units farther than K'Sante's (480 vs 150 attack range).

#### 8. Zaahen (net +1.21)

- **0.35** cc immunity: Grim Deliverance makes Zaahen immune to Fiddlesticks's Terrify (fear, slow). Immune for ?; Terrify takes 0.35 s to land, enough to react. (Zaahen R Grim Deliverance → Fiddlesticks Q Terrify)
- **0.35** interrupt: Dreaded Return's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Dreaded Return must land during the channel. (Zaahen W Dreaded Return → Fiddlesticks R Crowstorm)
- **0.35** interrupt: The Darkin Glaive's airborne interrupts Fiddlesticks's Crowstorm (movement channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Fiddlesticks R Crowstorm)
- Watch out: Fiddlesticks's basic attacks reach 305 units farther than Zaahen's (480 vs 175 attack range).

#### 9. Xin Zhao (net +1.14)

- **0.62** invulnerable: Crescent Guard makes Xin Zhao invulnerable to Fiddlesticks's Crowstorm. Invulnerable for 4 s, long enough to use ahead of Crowstorm. Only invulnerable to champions a certain distance away. (Xin Zhao R Crescent Guard → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Three Talon Strike's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Three Talon Strike must land during the channel. (Xin Zhao Q Three Talon Strike → Fiddlesticks R Crowstorm)
- **0.31** interrupt: Crescent Guard's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Crescent Guard must land during the channel. (Xin Zhao R Crescent Guard → Fiddlesticks R Crowstorm)
- Watch out: Fiddlesticks's basic attacks reach 305 units farther than Xin Zhao's (480 vs 175 attack range).

#### 10. Nocturne (net +1.11)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Fiddlesticks's Terrify. Spell shield for 1.5 s, long enough to use ahead of Terrify. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Fiddlesticks Q Terrify)
- **0.35** interrupt: Unspeakable Horror's fear interrupts Fiddlesticks's Crowstorm (movement channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Fiddlesticks R Crowstorm)
- **0.32** spell shield: Shroud of Darkness's spell shield blocks Fiddlesticks's Reap. Spell shield for 1.5 s, long enough to use ahead of Reap. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Fiddlesticks E Reap)
- Watch out: Fiddlesticks's basic attacks reach 355 units farther than Nocturne's (480 vs 125 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +2.10 | 2.21 | 0.11 |  |
| 2 | Yasuo | +1.52 | 1.63 | 0.11 | projectile block (Wind Wall) |
| 3 | Braum | +1.50 | 1.70 | 0.20 | projectile block (Unbreakable) |
| 4 | Fizz | +1.36 | 1.44 | 0.08 |  |
| 5 | Maokai | +1.30 | 1.50 | 0.20 |  |
| 6 | Rek'Sai | +1.30 | 1.41 | 0.11 |  |
| 7 | K'Sante | +1.23 | 1.32 | 0.09 |  |
| 8 | Zaahen | +1.21 | 1.32 | 0.11 |  |
| 9 | Xin Zhao | +1.14 | 1.31 | 0.17 |  |
| 10 | Nocturne | +1.11 | 1.31 | 0.20 |  |
| 11 | Sejuani | +1.11 | 1.29 | 0.18 |  |
| 12 | Alistar | +1.03 | 1.23 | 0.20 |  |
| 13 | Camille | +1.03 | 1.13 | 0.10 |  |
| 14 | Bard | +1.00 | 1.00 | 0.00 |  |
| 15 | Lissandra | +1.00 | 1.00 | 0.00 |  |
| 16 | Heimerdinger | +0.99 | 0.99 | 0.00 |  |
| 17 | Vladimir | +0.94 | 1.11 | 0.17 |  |
| 18 | Anivia | +0.94 | 0.94 | 0.00 |  |
| 19 | Blitzcrank | +0.93 | 1.32 | 0.39 |  |
| 20 | Kled | +0.92 | 0.98 | 0.06 |  |
| 21 | Kayle | +0.92 | 0.92 | 0.00 |  |
| 22 | Thresh | +0.90 | 0.90 | 0.00 |  |
| 23 | Lulu | +0.89 | 0.89 | 0.00 |  |
| 24 | Gnar | +0.88 | 0.88 | 0.00 |  |
| 25 | Fiora | +0.85 | 1.03 | 0.18 |  |
| 26 | Xayah | +0.85 | 0.85 | 0.00 |  |
| 27 | Milio | +0.84 | 0.84 | 0.00 |  |
| 28 | Viktor | +0.84 | 0.84 | 0.00 |  |
| 29 | Nami | +0.83 | 0.83 | 0.00 |  |
| 30 | Evelynn | +0.82 | 1.11 | 0.29 |  |
| 31 | Yone | +0.79 | 0.87 | 0.08 |  |
| 32 | Seraphine | +0.78 | 0.78 | 0.00 |  |
| 33 | Udyr | +0.77 | 0.97 | 0.20 |  |
| 34 | Riven | +0.77 | 0.90 | 0.13 |  |
| 35 | Urgot | +0.77 | 0.84 | 0.07 |  |
| 36 | Renata Glasc | +0.77 | 0.77 | 0.00 |  |
| 37 | Rakan | +0.76 | 0.83 | 0.07 |  |
| 38 | Cassiopeia | +0.73 | 0.73 | 0.00 |  |
| 39 | Ornn | +0.72 | 0.83 | 0.11 |  |
| 40 | Sivir | +0.72 | 0.72 | 0.00 |  |
| 41 | Morgana | +0.71 | 0.71 | 0.00 |  |
| 42 | Gwen | +0.70 | 0.88 | 0.18 |  |
| 43 | Singed | +0.69 | 1.08 | 0.39 |  |
| 44 | Leona | +0.67 | 0.87 | 0.20 |  |
| 45 | Sett | +0.65 | 0.85 | 0.20 |  |
| 46 | Samira | +0.65 | 0.65 | 0.00 | projectile block (Blade Whirl) |
| 47 | Aurelion Sol | +0.64 | 0.81 | 0.17 |  |
| 48 | Amumu | +0.60 | 0.80 | 0.20 |  |
| 49 | Mel | +0.60 | 0.60 | 0.00 | projectile block (Rebuttal) |
| 50 | Shaco | +0.56 | 1.09 | 0.53 |  |
| 51 | Nilah | +0.56 | 0.70 | 0.14 |  |
| 52 | Cho'Gath | +0.53 | 0.92 | 0.39 |  |
| 53 | Annie | +0.50 | 0.50 | 0.00 |  |
| 54 | Malzahar | +0.49 | 1.29 | 0.80 |  |
| 55 | Tristana | +0.49 | 0.49 | 0.00 |  |
| 56 | Ashe | +0.48 | 0.48 | 0.00 |  |
| 57 | Zed | +0.47 | 0.60 | 0.13 |  |
| 58 | Brand | +0.47 | 0.47 | 0.00 |  |
| 59 | Zilean | +0.47 | 0.47 | 0.00 |  |
| 60 | Elise | +0.45 | 0.45 | 0.00 |  |
| 61 | Hwei | +0.45 | 0.45 | 0.00 |  |
| 62 | Jayce | +0.45 | 0.45 | 0.00 |  |
| 63 | Kalista | +0.45 | 0.45 | 0.00 |  |
| 64 | Kennen | +0.45 | 0.45 | 0.00 |  |
| 65 | Swain | +0.45 | 0.45 | 0.00 |  |
| 66 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 67 | Draven | +0.44 | 0.44 | 0.00 |  |
| 68 | Veigar | +0.44 | 0.44 | 0.00 |  |
| 69 | Ziggs | +0.44 | 0.44 | 0.00 |  |
| 70 | Zoe | +0.44 | 0.44 | 0.00 |  |
| 71 | Master Yi | +0.43 | 1.02 | 0.59 |  |
| 72 | Soraka | +0.43 | 0.43 | 0.00 |  |
| 73 | Syndra | +0.43 | 0.43 | 0.00 |  |
| 74 | Vex | +0.43 | 0.43 | 0.00 |  |
| 75 | Mordekaiser | +0.42 | 0.76 | 0.34 |  |
| 76 | Zyra | +0.42 | 0.42 | 0.00 |  |
| 77 | Sion | +0.41 | 1.05 | 0.64 |  |
| 78 | Orianna | +0.40 | 0.40 | 0.00 |  |
| 79 | Garen | +0.39 | 0.73 | 0.34 |  |
| 80 | Jax | +0.38 | 0.58 | 0.20 |  |
| 81 | Azir | +0.38 | 0.38 | 0.00 |  |
| 82 | Sylas | +0.37 | 0.45 | 0.08 |  |
| 83 | Sona | +0.36 | 0.36 | 0.00 |  |
| 84 | Bel'Veth | +0.35 | 0.47 | 0.12 |  |
| 85 | Rammus | +0.34 | 1.13 | 0.79 |  |
| 86 | Volibear | +0.33 | 0.45 | 0.12 |  |
| 87 | Gragas | +0.31 | 0.85 | 0.54 |  |
| 88 | Aurora | +0.30 | 0.60 | 0.30 |  |
| 89 | Malphite | +0.30 | 0.50 | 0.20 |  |
| 90 | Aatrox | +0.30 | 0.47 | 0.17 |  |
| 91 | Irelia | +0.30 | 0.45 | 0.15 |  |
| 92 | Briar | +0.30 | 0.40 | 0.10 |  |
| 93 | Jarvan IV | +0.30 | 0.38 | 0.08 |  |
| 94 | Kassadin | +0.29 | 0.47 | 0.18 |  |
| 95 | Lee Sin | +0.28 | 0.41 | 0.13 |  |
| 96 | Taliyah | +0.27 | 1.23 | 0.96 |  |
| 97 | Renekton | +0.27 | 0.47 | 0.20 |  |
| 98 | Shyvana | +0.27 | 0.45 | 0.18 |  |
| 99 | Pyke | +0.26 | 0.91 | 0.65 |  |
| 100 | Hecarim | +0.25 | 0.36 | 0.11 |  |
| 101 | Lillia | +0.25 | 0.34 | 0.09 |  |
| 102 | Yuumi | +0.24 | 1.07 | 0.83 |  |
| 103 | Nautilus | +0.23 | 0.40 | 0.17 |  |
| 104 | Ambessa | +0.23 | 0.36 | 0.13 |  |
| 105 | Zac | +0.22 | 1.30 | 1.08 |  |
| 106 | Gangplank | +0.22 | 0.61 | 0.39 |  |
| 107 | Diana | +0.22 | 0.40 | 0.18 |  |
| 108 | Vayne | +0.16 | 0.44 | 0.28 |  |
| 109 | Neeko | +0.16 | 0.38 | 0.22 |  |
| 110 | Tahm Kench | +0.15 | 1.32 | 1.17 |  |
| 111 | Skarner | +0.14 | 0.50 | 0.36 |  |
| 112 | Viego | +0.13 | 0.87 | 0.74 |  |
| 113 | Teemo | +0.13 | 0.29 | 0.16 |  |
| 114 | Kayn | +0.11 | 1.12 | 1.01 |  |
| 115 | Yorick | +0.10 | 0.44 | 0.34 |  |
| 116 | Aphelios | +0.10 | 0.10 | 0.00 |  |
| 117 | Darius | +0.09 | 0.43 | 0.34 |  |
| 118 | Trundle | +0.09 | 0.43 | 0.34 |  |
| 119 | Taric | +0.08 | 0.44 | 0.36 |  |
| 120 | Quinn | +0.06 | 0.47 | 0.41 |  |
| 121 | Yunara | +0.06 | 0.06 | 0.00 |  |
| 122 | Olaf | +0.02 | 0.41 | 0.39 |  |
| 123 | Janna | 0.00 | 0.80 | 0.80 |  |
| 124 | Varus | 0.00 | 0.22 | 0.22 |  |
| 125 | Corki | 0.00 | 0.00 | 0.00 |  |
| 126 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 127 | Graves | 0.00 | 0.00 | 0.00 |  |
| 128 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 129 | Karma | 0.00 | 0.00 | 0.00 |  |
| 130 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 131 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 132 | Lux | 0.00 | 0.00 | 0.00 |  |
| 133 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 134 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 135 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 136 | Rengar | -0.03 | 0.64 | 0.67 |  |
| 137 | Galio | -0.09 | 1.21 | 1.30 |  |
| 138 | Vel'Koz | -0.11 | 0.45 | 0.56 |  |
| 139 | Vi | -0.12 | 0.85 | 0.97 |  |
| 140 | Wukong | -0.13 | 0.38 | 0.51 |  |
| 141 | Ekko | -0.13 | 0.00 | 0.13 |  |
| 142 | Qiyana | -0.15 | 0.33 | 0.48 |  |
| 143 | Senna | -0.16 | 0.06 | 0.22 |  |
| 144 | LeBlanc | -0.16 | 0.00 | 0.16 |  |
| 145 | Shen | -0.17 | 0.86 | 1.03 |  |
| 146 | Nasus | -0.17 | 0.22 | 0.39 |  |
| 147 | Tryndamere | -0.17 | 0.00 | 0.17 |  |
| 148 | Pantheon | -0.19 | 0.92 | 1.11 |  |
| 149 | Illaoi | -0.20 | 0.00 | 0.20 |  |
| 150 | Locke | -0.20 | 0.00 | 0.20 |  |
| 151 | Xerath | -0.21 | 0.44 | 0.65 |  |
| 152 | Kai'Sa | -0.22 | 0.00 | 0.22 |  |
| 153 | Twitch | -0.22 | 0.00 | 0.22 |  |
| 154 | Twisted Fate | -0.23 | 0.47 | 0.70 |  |
| 155 | Poppy | -0.24 | 0.36 | 0.60 |  |
| 156 | Ivern | -0.28 | 0.00 | 0.28 |  |
| 157 | Akali | -0.35 | 0.00 | 0.35 |  |
| 158 | Dr. Mundo | -0.39 | 0.00 | 0.39 |  |
| 159 | Rumble | -0.39 | 0.00 | 0.39 |  |
| 160 | Talon | -0.41 | 0.00 | 0.41 |  |
| 161 | Warwick | -0.45 | 1.02 | 1.47 |  |
| 162 | Caitlyn | -0.46 | 0.10 | 0.56 |  |
| 163 | Jhin | -0.56 | 0.00 | 0.56 |  |
| 164 | Karthus | -0.56 | 0.00 | 0.56 |  |
| 165 | Lucian | -0.56 | 0.00 | 0.56 |  |
| 166 | Miss Fortune | -0.56 | 0.00 | 0.56 |  |
| 167 | Katarina | -0.58 | 0.18 | 0.76 |  |
| 168 | Kha'Zix | -0.62 | 0.00 | 0.62 |  |
| 169 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 170 | Akshan | -0.84 | 0.00 | 0.84 |  |
| 171 | Nunu & Willump | -0.88 | 0.49 | 1.37 |  |
| 172 | Naafiri | -1.00 | 0.00 | 1.00 |  |
