# Counters to Janna (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Janna: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Janna wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Janna --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.87 | +1.00 | +1.00 | +1.00 | +0.57 | – | +0.00 |
| 2 | Fiora | +0.86 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +1.00 |
| 3 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +1.00 |
| 4 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +1.00 |
| 5 | Rengar | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 6 | Zeri | +0.84 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.89 |
| 7 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +1.00 |
| 8 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 9 | Sylas | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 10 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +1.00 |
| 11 | Diana | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 12 | Warwick | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 13 | Ziggs | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 14 | Tristana | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 15 | Neeko | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 16 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 17 | Pantheon | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 18 | Ambessa | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 19 | Fizz | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 20 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 21 | Caitlyn | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 22 | Annie | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 23 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 24 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 25 | Gragas | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 26 | Samira | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 27 | Smolder | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 28 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 29 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 30 | Yunara | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 31 | Swain | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 32 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 33 | Miss Fortune | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 34 | Jinx | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 35 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 36 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 37 | Udyr | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 38 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 39 | Malzahar | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 40 | Cassiopeia | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 41 | Shyvana | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 42 | Ashe | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 43 | Viego | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 44 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 45 | Orianna | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 46 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 47 | Shaco | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 48 | Xayah | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 49 | Zilean | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 50 | Draven | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 51 | Varus | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 52 | Nocturne | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 53 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 54 | Azir | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 55 | Kalista | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 56 | Teemo | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 57 | Jayce | +0.77 | +1.00 | +1.00 | +1.00 | −0.16 | +0.91 | +0.00 |
| 58 | Nidalee | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 59 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.02 |
| 60 | Yasuo | +0.77 | +1.00 | +0.98 | +1.00 | −0.08 | +0.82 | +0.00 |
| 61 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 62 | Sona | +0.76 | +0.95 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 63 | Akshan | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 64 | Kindred | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 65 | Irelia | +0.76 | +1.00 | +1.00 | +0.77 | +0.04 | +1.00 | +0.00 |
| 66 | Kai'Sa | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 67 | Quinn | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 68 | Aurora | +0.76 | +1.00 | +1.00 | +0.88 | +0.04 | – | +0.00 |
| 69 | Karma | +0.76 | +1.00 | +0.92 | +1.00 | +0.00 | – | +0.00 |
| 70 | Kennen | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 71 | Ivern | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 72 | Sion | +0.75 | +0.86 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 73 | Braum | +0.74 | +0.92 | +0.89 | +0.97 | −0.04 | +1.00 | +0.00 |
| 74 | Mel | +0.72 | +1.00 | +1.00 | +0.71 | +0.07 | – | +0.00 |
| 75 | Zoe | +0.72 | +1.00 | +1.00 | +0.61 | −0.02 | +1.00 | +0.00 |
| 76 | Rumble | +0.71 | +0.88 | +0.92 | +1.00 | −0.13 | +0.82 | +0.00 |
| 77 | Zaahen | +0.68 | +0.49 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 78 | Kayn | +0.68 | +1.00 | +0.85 | +1.00 | −0.21 | +0.51 | +0.00 |
| 79 | Olaf | +0.68 | +1.00 | +0.98 | +1.00 | −0.15 | +0.05 | +0.00 |
| 80 | Gnar | +0.67 | +1.00 | +1.00 | +1.00 | −0.12 | −0.08 | +0.00 |
| 81 | Vi | +0.67 | +1.00 | +1.00 | +1.00 | −0.22 | +0.00 | +0.00 |
| 82 | Galio | +0.66 | +1.00 | +0.50 | +1.00 | −0.08 | +1.00 | +0.00 |
| 83 | Bard | +0.66 | +0.84 | +0.85 | +1.00 | −0.17 | – | +0.00 |
| 84 | Gwen | +0.65 | +0.61 | +0.96 | +1.00 | −0.29 | +0.96 | +0.00 |
| 85 | Heimerdinger | +0.65 | +1.00 | +0.55 | +1.00 | +0.03 | +0.55 | +0.00 |
| 86 | Gangplank | +0.60 | +0.00 | +1.00 | +1.00 | −0.00 | +1.00 | +1.00 |
| 87 | Nautilus | +0.59 | +0.24 | +0.95 | +0.94 | +0.05 | +0.99 | +0.00 |
| 88 | Milio | +0.57 | +1.00 | +0.20 | +1.00 | +0.09 | – | +0.00 |
| 89 | Lee Sin | +0.55 | +0.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 90 | Darius | +0.53 | +1.00 | +0.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 91 | Lucian | +0.52 | +1.00 | +0.15 | +1.00 | −0.12 | – | +0.00 |
| 92 | Malphite | +0.44 | +0.26 | +1.00 | +0.13 | −0.00 | +1.00 | +0.00 |
| 93 | Mordekaiser | +0.41 | +0.12 | +0.48 | +0.95 | −0.16 | +0.91 | +0.00 |
| 94 | Hwei | +0.37 | +0.78 | −0.06 | +0.78 | −0.03 | – | +0.00 |
| 95 | Volibear | +0.36 | +0.87 | +0.27 | +0.87 | −0.17 | −0.74 | +0.00 |
| 96 | Sett | +0.35 | +1.00 | −0.71 | +1.00 | −0.18 | +1.00 | +0.00 |
| 97 | Nilah | +0.30 | +0.18 | +0.22 | +1.00 | −0.11 | +0.22 | +0.00 |
| 98 | Kled | +0.30 | +1.00 | +0.00 | +0.00 | −0.00 | +0.50 | +0.00 |
| 99 | Zed | +0.28 | +1.00 | −1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 100 | Kassadin | +0.28 | +1.00 | −1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 101 | Lillia | +0.28 | −0.03 | +0.37 | +0.72 | −0.05 | +0.56 | +0.00 |
| 102 | Anivia | +0.22 | +0.36 | +0.26 | +0.30 | −0.10 | – | +0.00 |
| 103 | Garen | +0.20 | +1.00 | −0.68 | +1.00 | −0.10 | −0.68 | +0.00 |
| 104 | Xin Zhao | +0.19 | +1.00 | −0.42 | +0.39 | −0.12 | −0.16 | +0.00 |
| 105 | Riven | +0.17 | +1.00 | −1.00 | +1.00 | −0.19 | +0.04 | +0.00 |
| 106 | Rell | +0.11 | +1.00 | −1.00 | +1.00 | +0.06 | −1.00 | +0.00 |
| 107 | Tahm Kench | +0.11 | +0.08 | +0.09 | +0.28 | −0.06 | +0.19 | +0.00 |
| 108 | Illaoi | +0.09 | −0.41 | +0.04 | +1.00 | −0.08 | −0.09 | +0.00 |
| 109 | Rek'Sai | +0.08 | +1.00 | −1.00 | +1.00 | −0.15 | −1.00 | +0.00 |
| 110 | Wukong | +0.07 | +1.00 | −1.00 | +1.00 | −0.26 | −0.93 | +0.00 |
| 111 | Yone | +0.06 | −0.17 | −0.17 | +1.00 | −0.26 | −0.17 | +0.00 |
| 112 | Zac | +0.06 | +0.27 | +0.08 | +0.02 | −0.22 | −0.00 | +0.00 |
| 113 | Sejuani | +0.05 | +0.84 | −1.00 | +0.00 | −0.08 | +1.00 | +0.00 |
| 114 | Twitch | +0.04 | +1.00 | +0.00 | −1.00 | −0.10 | – | +0.00 |
| 115 | Rammus | +0.04 | −0.07 | −0.08 | −0.07 | −0.06 | +1.00 | +0.00 |
| 116 | Ryze | +0.03 | −0.39 | −0.18 | +0.99 | −0.04 | −0.18 | +0.00 |
| 117 | Jarvan IV | −0.03 | +1.00 | −0.66 | −1.00 | −0.10 | +1.00 | +0.00 |
| 118 | Aatrox | −0.04 | −0.09 | −0.88 | +1.00 | −0.23 | +0.42 | +0.00 |
| 119 | Taric | −0.06 | −0.05 | −0.15 | +0.02 | +0.01 | −0.16 | +0.00 |
| 120 | Vel'Koz | −0.07 | +1.00 | −0.83 | −0.30 | +0.25 | −0.89 | +0.00 |
| 121 | Ornn | −0.15 | −0.16 | −0.20 | −0.10 | −0.08 | −0.23 | +0.00 |
| 122 | Seraphine | −0.21 | −0.97 | −0.46 | +0.86 | −0.03 | – | +0.00 |
| 123 | Karthus | −0.24 | −0.35 | −0.26 | −0.34 | −0.02 | −0.19 | +0.00 |
| 124 | Ahri | −0.26 | −1.00 | −0.69 | +1.00 | −0.09 | – | +0.00 |
| 125 | Briar | −0.29 | −0.32 | −0.32 | −0.32 | −0.26 | −0.32 | +0.00 |
| 126 | Sivir | −0.35 | −1.00 | −1.00 | +1.00 | −0.07 | – | +0.00 |
| 127 | Elise | −0.35 | −1.00 | −1.00 | +1.00 | −0.08 | – | +0.00 |
| 128 | Lux | −0.35 | −1.00 | −1.00 | +0.91 | −0.01 | – | +0.00 |
| 129 | Viktor | −0.36 | −1.00 | −1.00 | +1.00 | −0.13 | – | +0.00 |
| 130 | Cho'Gath | −0.40 | −1.00 | −1.00 | +1.00 | −0.14 | −0.80 | +0.00 |
| 131 | Zyra | −0.40 | −1.00 | −1.00 | +1.00 | −0.01 | −1.00 | +0.00 |
| 132 | Locke | −0.40 | −1.00 | −1.00 | +0.92 | −0.12 | −0.68 | +0.00 |
| 133 | Morgana | −0.41 | −1.00 | −1.00 | +1.00 | −0.04 | −1.00 | +0.00 |
| 134 | Singed | −0.42 | −1.00 | −1.00 | +1.00 | −0.16 | −1.00 | +0.00 |
| 135 | Ekko | −0.43 | −1.00 | −1.00 | +1.00 | −0.17 | −1.00 | +0.00 |
| 136 | Leona | −0.45 | +0.46 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 137 | Akali | −0.45 | −0.51 | −0.87 | −0.46 | −0.06 | +0.02 | +0.00 |
| 138 | Ezreal | −0.45 | −0.97 | −0.94 | +0.34 | −0.01 | – | +0.00 |
| 139 | Urgot | −0.46 | −1.00 | −1.00 | +0.72 | −0.05 | −1.00 | +0.00 |
| 140 | Rakan | −0.52 | −1.00 | −1.00 | +0.50 | −0.16 | −0.93 | +0.00 |
| 141 | Brand | −0.52 | −1.00 | −1.00 | +0.45 | −0.09 | −1.00 | +0.00 |
| 142 | Skarner | −0.53 | −1.00 | −1.00 | +0.41 | −0.07 | −1.00 | +0.00 |
| 143 | Graves | −0.55 | −0.86 | −1.00 | −1.00 | +0.10 | +1.00 | +0.00 |
| 144 | Evelynn | −0.63 | −1.00 | −1.00 | −1.00 | −0.02 | +0.70 | +0.00 |
| 145 | Aurelion Sol | −0.64 | −1.00 | −1.00 | −1.00 | +0.43 | −0.06 | +0.00 |
| 146 | Shen | −0.65 | −1.00 | −1.00 | −0.17 | −0.09 | −1.00 | +0.00 |
| 147 | Xerath | −0.66 | −0.45 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 148 | Qiyana | −0.74 | −1.00 | −1.00 | −1.00 | −0.16 | −0.17 | +0.00 |
| 149 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 150 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 151 | Nami | −0.77 | −0.98 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 152 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 153 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 154 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 155 | Vex | −0.78 | −1.00 | −1.00 | −0.99 | +0.00 | – | +0.00 |
| 156 | Renata Glasc | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 157 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 158 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 159 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 160 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 161 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 162 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 163 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 164 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 165 | Alistar | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 166 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 167 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 168 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 169 | Naafiri | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 170 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.19 | −0.94 | +0.00 |
| 171 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 172 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |

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
