# Counters to Jhin (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Jhin: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Jhin wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Jhin --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Trundle | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +1.00 |
| 2 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +1.00 |
| 3 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.50 |
| 4 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +1.00 |
| 5 | Malphite | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 6 | Warwick | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 7 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | −0.09 | – | +1.00 |
| 8 | Camille | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 9 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 10 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 11 | Master Yi | +0.81 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.50 |
| 12 | Diana | +0.81 | +1.00 | +0.94 | +1.00 | +0.13 | +1.00 | +0.00 |
| 13 | Kled | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 14 | Zac | +0.80 | +0.99 | +0.99 | +1.00 | +0.04 | +1.00 | +0.00 |
| 15 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 16 | Irelia | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 17 | Pantheon | +0.80 | +1.00 | +0.94 | +1.00 | +0.07 | +1.00 | +0.00 |
| 18 | Lee Sin | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 19 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | +0.93 | +0.00 |
| 20 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 21 | Xin Zhao | +0.79 | +0.98 | +0.94 | +1.00 | +0.08 | +1.00 | +0.00 |
| 22 | Yasuo | +0.79 | +1.00 | +0.94 | +1.00 | +0.06 | +0.97 | +0.00 |
| 23 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 24 | Shyvana | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 25 | Nasus | +0.78 | +1.00 | +0.99 | +1.00 | −0.10 | +1.00 | +0.00 |
| 26 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 27 | Udyr | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 28 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 29 | Rammus | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 30 | Garen | +0.78 | +1.00 | +0.94 | +1.00 | −0.05 | +1.00 | +0.00 |
| 31 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 32 | Mordekaiser | +0.77 | +1.00 | +0.98 | +1.00 | −0.17 | +1.00 | +0.00 |
| 33 | Tryndamere | +0.77 | +0.94 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 34 | Zaahen | +0.77 | +0.94 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 35 | Kog'Maw | +0.76 | +1.00 | +1.00 | +0.96 | −0.04 | – | +0.00 |
| 36 | Teemo | +0.75 | +0.96 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 37 | Gwen | +0.75 | +1.00 | +0.94 | +1.00 | −0.23 | +1.00 | +0.00 |
| 38 | Sion | +0.73 | +1.00 | +0.77 | +1.00 | −0.06 | +1.00 | +0.00 |
| 39 | Aphelios | +0.73 | +0.92 | +0.92 | +0.92 | +0.09 | – | +0.00 |
| 40 | Cho'Gath | +0.72 | +0.79 | +0.99 | +1.00 | −0.13 | +0.95 | +0.00 |
| 41 | Yone | +0.72 | +0.97 | +0.94 | +1.00 | −0.11 | +0.59 | +0.00 |
| 42 | Rek'Sai | +0.72 | +0.94 | +0.88 | +0.94 | −0.16 | +1.00 | +0.00 |
| 43 | Ivern | +0.72 | +0.94 | +0.95 | +1.00 | −0.18 | – | +0.00 |
| 44 | Kassadin | +0.70 | +1.00 | +0.94 | +0.87 | −0.10 | +0.59 | +0.00 |
| 45 | Ambessa | +0.70 | +0.94 | +0.94 | +0.94 | −0.36 | +1.00 | +0.00 |
| 46 | Kayle | +0.70 | +1.00 | +1.00 | +0.57 | +0.09 | – | +0.00 |
| 47 | Maokai | +0.56 | +1.00 | +0.14 | +1.00 | −0.16 | +1.00 | +0.00 |
| 48 | Taric | +0.55 | +1.00 | +0.01 | +1.00 | +0.00 | +1.00 | +0.00 |
| 49 | Azir | +0.55 | +1.00 | +1.00 | −0.04 | +0.02 | – | +0.00 |
| 50 | Briar | +0.54 | +0.50 | +0.50 | +1.00 | −0.04 | +1.00 | +0.00 |
| 51 | Rumble | +0.53 | +0.52 | +0.52 | +1.00 | −0.15 | +0.99 | +0.00 |
| 52 | Zed | +0.53 | −0.03 | +1.00 | +0.94 | +0.02 | +0.94 | +0.00 |
| 53 | Orianna | +0.49 | +1.00 | −0.04 | +1.00 | −0.02 | – | +0.00 |
| 54 | Skarner | +0.43 | +0.65 | +0.65 | +1.00 | +0.05 | −1.00 | +0.00 |
| 55 | Tahm Kench | +0.38 | +0.13 | +0.13 | +1.00 | +0.07 | +1.00 | +0.00 |
| 56 | Fizz | +0.35 | +0.96 | +0.92 | −1.00 | −0.06 | +0.92 | +0.00 |
| 57 | Vi | +0.35 | +1.00 | +0.86 | −1.00 | −0.13 | +1.00 | +0.00 |
| 58 | Ornn | +0.34 | +0.02 | +0.42 | +1.00 | −0.20 | +0.63 | +0.00 |
| 59 | Lucian | +0.32 | +1.00 | +1.00 | −1.00 | −0.05 | – | +0.00 |
| 60 | Kennen | +0.32 | +1.00 | +0.94 | −1.00 | +0.02 | – | +0.00 |
| 61 | Braum | +0.31 | +0.00 | +0.03 | +1.00 | −0.01 | +1.00 | +0.00 |
| 62 | Wukong | +0.30 | +1.00 | −1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 63 | Volibear | +0.29 | +1.00 | −1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 64 | Sett | +0.29 | +1.00 | −1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 65 | Viego | +0.28 | +1.00 | −0.94 | +1.00 | −0.21 | +1.00 | +0.00 |
| 66 | Illaoi | +0.27 | −1.00 | +0.90 | +1.00 | −0.05 | +1.00 | +0.00 |
| 67 | Alistar | +0.23 | +0.88 | −1.00 | +0.88 | −0.03 | +0.88 | +0.00 |
| 68 | Heimerdinger | +0.22 | +0.88 | −0.91 | +1.00 | +0.04 | – | +0.00 |
| 69 | Annie | +0.21 | +0.16 | +0.65 | −0.02 | −0.05 | – | +0.00 |
| 70 | Lillia | +0.20 | +1.00 | +1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 71 | Graves | +0.19 | +0.94 | −0.92 | +1.00 | −0.05 | −0.03 | +0.00 |
| 72 | Bel'Veth | +0.14 | −1.00 | +0.76 | +1.00 | −0.02 | +0.04 | +0.00 |
| 73 | Anivia | +0.14 | +0.21 | +0.21 | +0.21 | −0.14 | – | +0.00 |
| 74 | Kayn | +0.11 | −1.00 | +0.94 | +0.84 | −0.24 | −0.01 | +0.00 |
| 75 | Nilah | +0.10 | +1.00 | −1.00 | +0.00 | +0.02 | +1.00 | +0.00 |
| 76 | Singed | +0.10 | +1.00 | −1.00 | +1.00 | −0.02 | −1.00 | +0.00 |
| 77 | Aurelion Sol | +0.09 | +0.10 | +0.10 | −0.11 | +0.34 | – | +0.00 |
| 78 | Shen | +0.05 | −0.04 | −0.99 | +1.00 | +0.04 | +1.00 | +0.00 |
| 79 | Swain | −0.05 | +0.88 | −0.21 | −1.00 | −0.06 | – | +0.00 |
| 80 | Urgot | −0.06 | −0.71 | −0.71 | +1.00 | −0.01 | +1.00 | +0.00 |
| 81 | Kindred | −0.09 | +0.00 | −1.00 | +0.92 | −0.08 | – | +0.00 |
| 82 | Gragas | −0.11 | −0.78 | −0.78 | +0.96 | −0.11 | +1.00 | +0.00 |
| 83 | Riven | −0.12 | +0.94 | −1.00 | +0.00 | −0.04 | −1.00 | +0.00 |
| 84 | Sejuani | −0.18 | +0.04 | +0.07 | −1.00 | −0.03 | −0.06 | +0.00 |
| 85 | Olaf | −0.20 | −1.00 | −0.95 | +1.00 | −0.07 | +1.00 | +0.00 |
| 86 | Twitch | −0.25 | +0.93 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 87 | Aatrox | −0.25 | −1.00 | −1.00 | +1.00 | −0.33 | +0.97 | +0.00 |
| 88 | Jinx | −0.29 | −0.10 | −0.10 | −1.00 | −0.06 | – | +0.00 |
| 89 | Galio | −0.29 | −1.00 | −1.00 | +0.76 | −0.12 | +0.73 | +0.00 |
| 90 | Ziggs | −0.33 | −1.00 | −1.00 | +0.91 | +0.13 | – | +0.00 |
| 91 | Elise | −0.34 | −1.00 | −1.00 | +1.00 | −0.06 | – | +0.00 |
| 92 | Nidalee | −0.34 | −0.98 | −0.98 | +0.94 | −0.05 | – | +0.00 |
| 93 | Milio | −0.35 | +0.61 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 94 | Samira | −0.35 | −1.00 | −1.00 | +0.99 | −0.07 | – | +0.00 |
| 95 | Morgana | −0.39 | −1.00 | −1.00 | +0.94 | −0.02 | −0.77 | +0.00 |
| 96 | Rell | −0.42 | −1.00 | +0.05 | −1.00 | +0.12 | +0.00 | +0.00 |
| 97 | Rakan | −0.44 | −1.00 | −1.00 | −0.03 | −0.00 | +0.65 | +0.00 |
| 98 | Smolder | −0.50 | −0.48 | −0.48 | −1.00 | −0.08 | – | +0.00 |
| 99 | Akali | −0.50 | +0.14 | −0.93 | −1.00 | −0.07 | −0.97 | +0.00 |
| 100 | Nunu & Willump | −0.53 | −1.00 | −0.04 | −1.00 | +0.19 | −1.00 | +0.00 |
| 101 | Gnar | −0.55 | −0.41 | −0.94 | −1.00 | −0.05 | −0.05 | +0.00 |
| 102 | Draven | −0.56 | −0.19 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 103 | Corki | −0.56 | −1.00 | −1.00 | −0.04 | −0.00 | – | +0.00 |
| 104 | Jarvan IV | −0.58 | −1.00 | −1.00 | −1.00 | +0.15 | +1.00 | +0.00 |
| 105 | Karthus | −0.61 | −1.00 | −0.22 | −1.00 | −0.04 | −1.00 | +0.00 |
| 106 | Tristana | −0.61 | −1.00 | −1.00 | −1.00 | −0.10 | +1.00 | +0.00 |
| 107 | Leona | −0.62 | −1.00 | −1.00 | −1.00 | +0.01 | +0.76 | +0.00 |
| 108 | Karma | −0.67 | −0.62 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 109 | Hecarim | −0.71 | −1.00 | −1.00 | −1.00 | +0.00 | −0.06 | +0.00 |
| 110 | Aurora | −0.76 | −1.00 | −1.00 | −0.94 | +0.05 | – | +0.00 |
| 111 | Lissandra | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 112 | Rengar | −0.76 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | +0.00 |
| 113 | Vel'Koz | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 114 | Soraka | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 115 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 116 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 117 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 118 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 119 | Hwei | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 120 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 121 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 122 | Neeko | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 123 | Yunara | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 124 | Zoe | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 125 | Ashe | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 126 | Xerath | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 127 | Zeri | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 128 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 129 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 130 | Malzahar | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 131 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 132 | Varus | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 133 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 134 | Akshan | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 135 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 136 | Kai'Sa | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 137 | Zilean | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 138 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 139 | Xayah | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 140 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 141 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 142 | Mel | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 143 | Twisted Fate | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 144 | Lux | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 145 | Ezreal | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 146 | Brand | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 147 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 148 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 149 | Sylas | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 150 | Nautilus | −0.80 | −0.99 | −0.97 | −1.00 | −0.05 | −1.00 | +0.00 |
| 151 | Kalista | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 152 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 153 | Viktor | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 154 | Quinn | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 155 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 156 | Cassiopeia | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 157 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 158 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 159 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 160 | Shaco | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 161 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.28 | −0.67 | +0.00 |
| 162 | Ekko | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 163 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 164 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 165 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 166 | Bard | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.00 |
| 167 | Seraphine | −0.82 | −1.00 | −1.00 | −1.00 | −0.23 | – | +0.00 |
| 168 | Amumu | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 169 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 170 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 171 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 172 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Jhin's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Jhin's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Jhin` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Braum (net +1.41)

- **0.70** projectile block: Unbreakable blocks Jhin's Deadly Flourish, a projectile. Unbreakable for 4 s, long enough to use ahead of Deadly Flourish. (Braum E Unbreakable → Jhin W Deadly Flourish)
- **0.55** projectile block: Unbreakable blocks Jhin's Curtain Call, a projectile. Unbreakable for 4 s, long enough to use ahead of Curtain Call. (Braum E Unbreakable → Jhin R Curtain Call)
- **0.37** projectile block: Unbreakable blocks Jhin's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Jhin basic attacks)
- Watch out: Jhin's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 2. Yasuo (net +1.37)

- **0.58** projectile block: Wind Wall blocks Jhin's Deadly Flourish, a projectile. Wind Wall for 4 s, long enough to use ahead of Deadly Flourish. (Yasuo W Wind Wall → Jhin W Deadly Flourish)
- **0.55** projectile block: Wind Wall blocks Jhin's Curtain Call, a projectile. Wind Wall for 4 s, long enough to use ahead of Curtain Call. (Yasuo W Wind Wall → Jhin R Curtain Call)
- **0.29** projectile block: Wind Wall blocks Jhin's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Jhin basic attacks)
- Watch out: Jhin's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 3. Fizz (net +1.25)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Jhin's Deadly Flourish. Untargetable for 0.75 s; Deadly Flourish takes 0.75 s to land, enough to react. (Fizz E Playful → Jhin W Deadly Flourish)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Jhin's Curtain Call. Untargetable for 0.75 s; Curtain Call takes 1.7 s to land, enough to react. (Fizz E Playful → Jhin R Curtain Call)
- **0.35** untargetable: Playful makes Fizz untargetable, dodging Jhin's Dancing Grenade. Untargetable for 0.75 s; Dancing Grenade takes 0.56 s to land, enough to react. (Fizz E Playful → Jhin Q Dancing Grenade)
- Watch out: Jhin's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 4. Rell (net +1.23)

- **0.28** interrupt: Ferromancy: Crash Down's airborne interrupts Jhin's Curtain Call (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Jhin R Curtain Call)
- **0.28** interrupt: Ferromancy: Mount Up's airborne interrupts Jhin's Curtain Call (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Jhin R Curtain Call)
- **0.28** interrupt: Full Tilt's stun interrupts Jhin's Curtain Call (normal channel). Full Tilt must land during the channel. (Rell E Full Tilt → Jhin R Curtain Call)
- Watch out: Jhin's basic attacks reach 375 units farther than Rell's (550 vs 175 attack range).

#### 5. Maokai (net +1.10)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Jhin's Deadly Flourish. Untargetable for 1.4 s; Deadly Flourish takes 0.75 s to land, enough to react. (Maokai W Twisted Advance → Jhin W Deadly Flourish)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Jhin's Curtain Call. Untargetable for 1.4 s; Curtain Call takes 1.7 s to land, enough to react. (Maokai W Twisted Advance → Jhin R Curtain Call)
- **0.32** untargetable: Twisted Advance makes Maokai untargetable, dodging Jhin's Dancing Grenade. Untargetable for 1.4 s; Dancing Grenade takes 0.56 s to land, enough to react. (Maokai W Twisted Advance → Jhin Q Dancing Grenade)
- Watch out: Jhin's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

#### 6. Yuumi (net +1.05)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Jhin's Deadly Flourish. Untargetable for ?; Deadly Flourish takes 0.75 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jhin W Deadly Flourish)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Jhin's Curtain Call. Untargetable for ?; Curtain Call takes 1.7 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jhin R Curtain Call)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Jhin's Dancing Grenade. Untargetable for ?; Dancing Grenade takes 0.56 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jhin Q Dancing Grenade)
- Watch out: Jhin's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

#### 7. Nocturne (net +1.02)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Jhin's Deadly Flourish. Spell shield for 1.5 s, long enough to use ahead of Deadly Flourish. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Jhin W Deadly Flourish)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Jhin's Curtain Call. Spell shield for 1.5 s, long enough to use ahead of Curtain Call. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Jhin R Curtain Call)
- **0.28** interrupt: Unspeakable Horror's fear interrupts Jhin's Curtain Call (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Jhin R Curtain Call)
- Watch out: Jhin's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

#### 8. Camille (net +0.97)

- **0.55** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Jhin's Curtain Call. Untargetable for 0.5 s; Curtain Call takes 1.7 s to land, enough to react. (Camille R The Hextech Ultimatum → Jhin R Curtain Call)
- **0.34** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Jhin's Deadly Flourish. Untargetable for 0.5 s; Deadly Flourish takes 0.75 s to land, enough to react. (Camille R The Hextech Ultimatum → Jhin W Deadly Flourish)
- **0.28** interrupt: The Hextech Ultimatum's airborne interrupts Jhin's Curtain Call (normal channel). The Hextech Ultimatum must land during the channel. (Camille R The Hextech Ultimatum → Jhin R Curtain Call)
- Watch out: Jhin's basic attacks reach 425 units farther than Camille's (550 vs 125 attack range).

#### 9. Malzahar (net +0.96)

- **0.35** cc immunity: Void Shift makes Malzahar immune to Jhin's Deadly Flourish (root). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Jhin W Deadly Flourish)
- **0.28** interrupt: Call of the Void's silence interrupts Jhin's Curtain Call (normal channel). Call of the Void must land during the channel. (Malzahar Q Call of the Void → Jhin R Curtain Call)
- **0.28** interrupt: Nether Grasp's suppression interrupts Jhin's Curtain Call (normal channel). Nether Grasp must land during the channel. (Malzahar R Nether Grasp → Jhin R Curtain Call)

#### 10. Samira (net +0.91)

- **0.55** projectile block: Blade Whirl blocks Jhin's Curtain Call, a projectile. Blade Whirl for 0.75 s; Curtain Call takes 1.7 s to land, enough to react. (Samira W Blade Whirl → Jhin R Curtain Call)
- **0.51** projectile block: Blade Whirl blocks Jhin's Deadly Flourish, a projectile. Blade Whirl for 0.75 s; Deadly Flourish takes 0.75 s to land, enough to react. (Samira W Blade Whirl → Jhin W Deadly Flourish)
- **0.24** projectile block: Blade Whirl blocks Jhin's Dancing Grenade, a projectile. Blade Whirl for 0.75 s; Dancing Grenade takes 0.56 s to land, enough to react. (Samira W Blade Whirl → Jhin Q Dancing Grenade)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Braum | +1.41 | 1.68 | 0.27 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 2 | Yasuo | +1.37 | 1.54 | 0.17 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 3 | Fizz | +1.25 | 1.38 | 0.13 |  |
| 4 | Rell | +1.23 | 1.40 | 0.17 |  |
| 5 | Maokai | +1.10 | 1.37 | 0.27 |  |
| 6 | Yuumi | +1.05 | 1.13 | 0.08 |  |
| 7 | Nocturne | +1.02 | 1.29 | 0.27 |  |
| 8 | Camille | +0.97 | 1.10 | 0.13 |  |
| 9 | Malzahar | +0.96 | 0.96 | 0.00 |  |
| 10 | Samira | +0.91 | 0.91 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 11 | Kayn | +0.90 | 1.07 | 0.17 |  |
| 12 | Rek'Sai | +0.90 | 1.07 | 0.17 |  |
| 13 | Evelynn | +0.89 | 1.07 | 0.18 |  |
| 14 | Shaco | +0.89 | 1.07 | 0.18 |  |
| 15 | Mel | +0.89 | 0.89 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 16 | Sivir | +0.87 | 0.87 | 0.00 |  |
| 17 | Master Yi | +0.84 | 1.09 | 0.25 |  |
| 18 | Vladimir | +0.84 | 0.97 | 0.13 |  |
| 19 | Zaahen | +0.82 | 0.99 | 0.17 |  |
| 20 | Bard | +0.82 | 0.82 | 0.00 |  |
| 21 | Lissandra | +0.82 | 0.82 | 0.00 |  |
| 22 | Fiora | +0.80 | 1.07 | 0.27 |  |
| 23 | Taliyah | +0.79 | 0.79 | 0.00 |  |
| 24 | Aurora | +0.75 | 0.75 | 0.00 |  |
| 25 | Xayah | +0.75 | 0.75 | 0.00 |  |
| 26 | K'Sante | +0.71 | 0.84 | 0.13 |  |
| 27 | Lulu | +0.69 | 0.69 | 0.00 |  |
| 28 | Kled | +0.67 | 0.77 | 0.10 |  |
| 29 | Milio | +0.67 | 0.67 | 0.00 |  |
| 30 | Gwen | +0.66 | 0.93 | 0.27 |  |
| 31 | Heimerdinger | +0.65 | 0.65 | 0.00 |  |
| 32 | Alistar | +0.63 | 0.90 | 0.27 |  |
| 33 | Warwick | +0.63 | 0.81 | 0.18 |  |
| 34 | Udyr | +0.62 | 0.89 | 0.27 |  |
| 35 | Galio | +0.60 | 0.78 | 0.18 |  |
| 36 | Tahm Kench | +0.59 | 0.84 | 0.25 |  |
| 37 | Zac | +0.59 | 0.84 | 0.25 |  |
| 38 | Kayle | +0.58 | 0.58 | 0.00 |  |
| 39 | Sejuani | +0.57 | 0.84 | 0.27 |  |
| 40 | Zed | +0.57 | 0.75 | 0.18 |  |
| 41 | Morgana | +0.57 | 0.70 | 0.13 |  |
| 42 | Rammus | +0.56 | 0.83 | 0.27 |  |
| 43 | Anivia | +0.56 | 0.56 | 0.00 |  |
| 44 | Fiddlesticks | +0.56 | 0.56 | 0.00 |  |
| 45 | Gnar | +0.56 | 0.56 | 0.00 |  |
| 46 | Viktor | +0.56 | 0.56 | 0.00 |  |
| 47 | Shen | +0.54 | 0.72 | 0.18 |  |
| 48 | Aurelion Sol | +0.54 | 0.54 | 0.00 |  |
| 49 | Janna | +0.54 | 0.54 | 0.00 |  |
| 50 | Nami | +0.54 | 0.54 | 0.00 |  |
| 51 | Renata Glasc | +0.53 | 0.53 | 0.00 |  |
| 52 | Tristana | +0.53 | 0.53 | 0.00 |  |
| 53 | Thresh | +0.52 | 0.56 | 0.04 |  |
| 54 | Seraphine | +0.51 | 0.51 | 0.00 |  |
| 55 | Xin Zhao | +0.50 | 0.75 | 0.25 |  |
| 56 | Rakan | +0.45 | 0.56 | 0.11 |  |
| 57 | Viego | +0.44 | 0.56 | 0.12 |  |
| 58 | Urgot | +0.43 | 0.56 | 0.13 |  |
| 59 | Yone | +0.43 | 0.56 | 0.13 |  |
| 60 | Nilah | +0.41 | 0.63 | 0.22 |  |
| 61 | Kalista | +0.40 | 0.40 | 0.00 |  |
| 62 | Pyke | +0.38 | 0.56 | 0.18 |  |
| 63 | Riven | +0.38 | 0.56 | 0.18 |  |
| 64 | Vi | +0.38 | 0.56 | 0.18 |  |
| 65 | Ornn | +0.37 | 0.54 | 0.17 |  |
| 66 | Annie | +0.36 | 0.36 | 0.00 |  |
| 67 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 68 | Pantheon | +0.34 | 0.51 | 0.17 |  |
| 69 | Sion | +0.32 | 0.82 | 0.50 |  |
| 70 | Blitzcrank | +0.31 | 0.84 | 0.53 |  |
| 71 | Gragas | +0.29 | 0.56 | 0.27 |  |
| 72 | Leona | +0.29 | 0.56 | 0.27 |  |
| 73 | Sett | +0.29 | 0.56 | 0.27 |  |
| 74 | Ahri | +0.28 | 0.28 | 0.00 |  |
| 75 | Ashe | +0.28 | 0.28 | 0.00 |  |
| 76 | Azir | +0.28 | 0.28 | 0.00 |  |
| 77 | Brand | +0.28 | 0.28 | 0.00 |  |
| 78 | Cassiopeia | +0.28 | 0.28 | 0.00 |  |
| 79 | Draven | +0.28 | 0.28 | 0.00 |  |
| 80 | Elise | +0.28 | 0.28 | 0.00 |  |
| 81 | Hwei | +0.28 | 0.28 | 0.00 |  |
| 82 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 83 | Kennen | +0.28 | 0.28 | 0.00 |  |
| 84 | Neeko | +0.28 | 0.28 | 0.00 |  |
| 85 | Orianna | +0.28 | 0.28 | 0.00 |  |
| 86 | Quinn | +0.28 | 0.28 | 0.00 |  |
| 87 | Soraka | +0.28 | 0.28 | 0.00 |  |
| 88 | Swain | +0.28 | 0.28 | 0.00 |  |
| 89 | Syndra | +0.28 | 0.28 | 0.00 |  |
| 90 | Twisted Fate | +0.28 | 0.28 | 0.00 |  |
| 91 | Vayne | +0.28 | 0.28 | 0.00 |  |
| 92 | Veigar | +0.28 | 0.28 | 0.00 |  |
| 93 | Vel'Koz | +0.28 | 0.28 | 0.00 |  |
| 94 | Vex | +0.28 | 0.28 | 0.00 |  |
| 95 | Xerath | +0.28 | 0.28 | 0.00 |  |
| 96 | Ziggs | +0.28 | 0.28 | 0.00 |  |
| 97 | Zilean | +0.28 | 0.28 | 0.00 |  |
| 98 | Zoe | +0.28 | 0.28 | 0.00 |  |
| 99 | Zyra | +0.28 | 0.28 | 0.00 |  |
| 100 | Amumu | +0.27 | 0.54 | 0.27 |  |
| 101 | Sona | +0.26 | 0.26 | 0.00 |  |
| 102 | Jax | +0.24 | 0.51 | 0.27 |  |
| 103 | Caitlyn | +0.18 | 0.18 | 0.00 |  |
| 104 | Malphite | +0.17 | 0.44 | 0.27 |  |
| 105 | Briar | +0.15 | 0.28 | 0.13 |  |
| 106 | Jarvan IV | +0.15 | 0.28 | 0.13 |  |
| 107 | Sylas | +0.15 | 0.28 | 0.13 |  |
| 108 | Rengar | +0.11 | 0.64 | 0.53 |  |
| 109 | Wukong | +0.11 | 0.28 | 0.17 |  |
| 110 | Bel'Veth | +0.10 | 0.28 | 0.18 |  |
| 111 | Lee Sin | +0.10 | 0.28 | 0.18 |  |
| 112 | Volibear | +0.10 | 0.28 | 0.18 |  |
| 113 | Lillia | +0.10 | 0.25 | 0.15 |  |
| 114 | Hecarim | +0.09 | 0.26 | 0.17 |  |
| 115 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 116 | Ambessa | +0.08 | 0.26 | 0.18 |  |
| 117 | Garen | +0.07 | 0.57 | 0.50 |  |
| 118 | Gangplank | +0.06 | 0.59 | 0.53 |  |
| 119 | Irelia | +0.05 | 0.28 | 0.23 |  |
| 120 | Qiyana | +0.05 | 0.23 | 0.18 |  |
| 121 | Cho'Gath | +0.03 | 0.56 | 0.53 |  |
| 122 | Aatrox | +0.03 | 0.28 | 0.25 |  |
| 123 | Nautilus | +0.03 | 0.28 | 0.25 |  |
| 124 | Diana | +0.01 | 0.28 | 0.27 |  |
| 125 | Kassadin | +0.01 | 0.28 | 0.27 |  |
| 126 | Renekton | +0.01 | 0.28 | 0.27 |  |
| 127 | Shyvana | +0.01 | 0.28 | 0.27 |  |
| 128 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 129 | Corki | 0.00 | 0.00 | 0.00 |  |
| 130 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 131 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 132 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 133 | Karma | 0.00 | 0.00 | 0.00 |  |
| 134 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 135 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 136 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 137 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 138 | Lux | 0.00 | 0.00 | 0.00 |  |
| 139 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 140 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 141 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 142 | Senna | 0.00 | 0.00 | 0.00 |  |
| 143 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 144 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 145 | Varus | 0.00 | 0.00 | 0.00 |  |
| 146 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 147 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 148 | Poppy | -0.01 | 0.26 | 0.27 |  |
| 149 | Ivern | -0.05 | 0.00 | 0.05 |  |
| 150 | Graves | -0.06 | 0.00 | 0.06 |  |
| 151 | Olaf | -0.10 | 0.43 | 0.53 |  |
| 152 | Karthus | -0.13 | 0.00 | 0.13 |  |
| 153 | Naafiri | -0.13 | 0.00 | 0.13 |  |
| 154 | Nunu & Willump | -0.15 | 0.38 | 0.53 |  |
| 155 | Skarner | -0.15 | 0.38 | 0.53 |  |
| 156 | Mordekaiser | -0.16 | 0.34 | 0.50 |  |
| 157 | Akali | -0.18 | 0.00 | 0.18 |  |
| 158 | Ekko | -0.18 | 0.00 | 0.18 |  |
| 159 | Talon | -0.18 | 0.00 | 0.18 |  |
| 160 | Darius | -0.22 | 0.28 | 0.50 |  |
| 161 | Trundle | -0.22 | 0.28 | 0.50 |  |
| 162 | Yorick | -0.22 | 0.28 | 0.50 |  |
| 163 | Singed | -0.25 | 0.28 | 0.53 |  |
| 164 | Taric | -0.25 | 0.28 | 0.53 |  |
| 165 | Tryndamere | -0.25 | 0.00 | 0.25 |  |
| 166 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 167 | Illaoi | -0.27 | 0.00 | 0.27 |  |
| 168 | Katarina | -0.27 | 0.00 | 0.27 |  |
| 169 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 170 | Locke | -0.27 | 0.00 | 0.27 |  |
| 171 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 172 | Rumble | -0.53 | 0.00 | 0.53 |  |
