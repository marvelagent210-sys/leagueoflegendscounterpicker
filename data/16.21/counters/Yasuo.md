# Counters to Yasuo (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Yasuo: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Yasuo wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Yasuo --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 2 | Ivern | +0.81 | +1.00 | +1.00 | +0.98 | +0.07 | +1.00 | +0.00 |
| 3 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 4 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 5 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 6 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 7 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 8 | Trundle | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 9 | Fiora | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 10 | Dr. Mundo | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 11 | Olaf | +0.75 | +1.00 | +1.00 | +1.00 | −0.18 | – | +0.00 |
| 12 | Zaahen | +0.68 | +0.80 | +0.92 | +1.00 | −0.10 | – | +0.00 |
| 13 | Vayne | +0.57 | +1.00 | +1.00 | −0.13 | −0.04 | +1.00 | +0.00 |
| 14 | Quinn | +0.56 | +1.00 | +1.00 | −0.01 | +0.08 | +0.46 | +0.00 |
| 15 | Lulu | +0.32 | +0.69 | +0.86 | +0.12 | +0.04 | −0.98 | +0.00 |
| 16 | Viego | +0.32 | +1.00 | +1.00 | −1.00 | −0.07 | – | +0.00 |
| 17 | Corki | +0.29 | +0.52 | +1.00 | −1.00 | +0.07 | +1.00 | +0.00 |
| 18 | Sivir | +0.24 | −0.28 | +1.00 | −0.22 | +0.01 | +1.00 | +0.00 |
| 19 | Nasus | +0.21 | +1.00 | −1.00 | +1.00 | −0.07 | – | +0.00 |
| 20 | Elise | +0.21 | +1.00 | +1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 21 | Ashe | +0.16 | −0.02 | +1.00 | −0.99 | +0.06 | +1.00 | +0.00 |
| 22 | Gangplank | +0.12 | +0.10 | +1.00 | −0.84 | +0.02 | – | +0.00 |
| 23 | Zeri | +0.03 | −0.03 | −0.04 | +0.34 | −0.10 | −0.03 | +0.00 |
| 24 | Morgana | +0.02 | −0.81 | +0.00 | +1.00 | +0.16 | +0.01 | +0.00 |
| 25 | Anivia | −0.00 | +0.06 | −0.09 | +0.04 | −0.12 | +0.15 | +0.00 |
| 26 | Sion | −0.18 | −0.17 | +0.00 | −0.50 | −0.12 | – | +0.00 |
| 27 | Udyr | −0.19 | −1.00 | +1.00 | −0.85 | +0.02 | – | +0.00 |
| 28 | Neeko | −0.19 | −0.50 | −0.49 | +0.47 | +0.10 | −0.49 | +0.00 |
| 29 | Camille | −0.21 | +1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 30 | Illaoi | −0.22 | +1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 31 | Kalista | −0.23 | −0.69 | −1.00 | +0.43 | +0.01 | +1.00 | +0.00 |
| 32 | Bel'Veth | −0.24 | +1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 33 | Twisted Fate | −0.25 | +1.00 | −0.89 | −1.00 | +0.08 | −0.89 | +0.00 |
| 34 | Taric | −0.28 | +0.00 | −0.96 | +0.00 | −0.05 | – | +0.00 |
| 35 | Xayah | −0.29 | −1.00 | +1.00 | −0.97 | +0.03 | −0.96 | +0.00 |
| 36 | Kennen | −0.29 | −0.89 | +0.90 | −0.97 | +0.00 | −1.00 | +0.00 |
| 37 | Kayle | −0.36 | −0.47 | −0.40 | −0.81 | +0.30 | −0.21 | +0.00 |
| 38 | Yunara | −0.37 | +0.64 | −0.89 | −0.90 | −0.03 | −0.82 | −0.88 |
| 39 | Kog'Maw | −0.42 | +0.03 | −0.77 | −0.84 | +0.10 | −0.78 | +0.00 |
| 40 | Mel | −0.42 | −0.90 | +0.00 | −1.00 | +0.04 | +0.00 | +0.00 |
| 41 | Malzahar | −0.43 | −0.99 | +0.02 | −0.93 | +0.02 | +0.00 | +0.00 |
| 42 | Syndra | −0.43 | −0.06 | −0.95 | −0.41 | +0.01 | −0.95 | +0.00 |
| 43 | Aurora | −0.47 | −0.94 | +0.20 | −0.95 | −0.02 | −0.90 | +0.00 |
| 44 | Kled | −0.48 | −0.52 | −0.33 | −1.00 | −0.11 | – | +0.00 |
| 45 | Aphelios | −0.48 | −0.98 | −0.50 | −0.00 | −0.08 | −0.51 | −0.87 |
| 46 | Nami | −0.48 | −0.98 | +0.12 | −1.00 | −0.06 | −0.58 | +0.00 |
| 47 | Lux | −0.51 | −0.07 | −1.00 | −0.97 | +0.03 | −0.58 | +0.00 |
| 48 | Brand | −0.52 | +0.20 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 49 | Nocturne | −0.56 | −0.82 | −0.63 | −0.60 | −0.15 | – | +0.00 |
| 50 | Aatrox | −0.57 | −0.67 | −0.69 | −0.66 | −0.02 | – | −0.66 |
| 51 | Zac | −0.65 | −0.49 | −0.99 | −1.00 | −0.10 | – | +0.00 |
| 52 | Jinx | −0.65 | −0.40 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 53 | Teemo | −0.67 | −0.96 | −0.96 | −0.46 | +0.03 | −0.97 | +0.00 |
| 54 | Rell | −0.69 | −1.00 | −1.00 | −1.00 | +0.11 | −0.07 | +0.00 |
| 55 | Milio | −0.70 | −0.87 | −0.93 | −0.93 | +0.20 | −0.94 | +0.00 |
| 56 | Gragas | −0.72 | −1.00 | −1.00 | −1.00 | −0.03 | −0.12 | +0.00 |
| 57 | Rengar | −0.72 | −1.00 | −1.00 | −1.00 | +0.36 | – | +0.00 |
| 58 | Kai'Sa | −0.72 | −0.84 | −0.83 | −0.97 | −0.16 | −0.83 | +0.00 |
| 59 | Yone | −0.72 | −0.81 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 60 | Shyvana | −0.74 | −0.92 | −0.93 | −0.93 | −0.11 | – | +0.00 |
| 61 | Aurelion Sol | −0.74 | −1.00 | −1.00 | −1.00 | +0.41 | −1.00 | +0.00 |
| 62 | Heimerdinger | −0.75 | −0.98 | −0.99 | −0.97 | +0.21 | −0.91 | +0.00 |
| 63 | Senna | −0.75 | −0.77 | −1.00 | −1.00 | −0.05 | −0.94 | +0.00 |
| 64 | Zilean | −0.75 | −0.79 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 65 | Karma | −0.75 | −0.99 | −0.92 | −0.94 | +0.05 | −0.91 | +0.00 |
| 66 | Samira | −0.75 | −1.00 | −1.00 | −0.98 | +0.01 | −0.54 | +0.00 |
| 67 | Riven | −0.75 | −0.95 | −0.94 | −1.00 | −0.05 | – | +0.00 |
| 68 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 69 | Nilah | −0.76 | −1.00 | −1.00 | −1.00 | +0.15 | – | −0.09 |
| 70 | Rakan | −0.76 | −0.99 | −0.92 | −0.96 | +0.03 | −0.94 | +0.00 |
| 71 | Bard | −0.76 | −0.96 | −0.96 | −1.00 | +0.10 | −0.96 | +0.00 |
| 72 | Orianna | −0.76 | −0.99 | −1.00 | −0.85 | +0.05 | −1.00 | +0.00 |
| 73 | Maokai | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 74 | Cho'Gath | −0.76 | −0.94 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 75 | Janna | −0.77 | −0.98 | −1.00 | −1.00 | +0.08 | −0.82 | +0.00 |
| 76 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 77 | Briar | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 78 | Rek'Sai | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 79 | Mordekaiser | −0.78 | −1.00 | −0.99 | −1.00 | −0.01 | – | +0.00 |
| 80 | Garen | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 81 | Malphite | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 82 | Diana | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 83 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 84 | Xin Zhao | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 85 | Singed | −0.78 | −0.98 | −0.98 | −1.00 | −0.07 | – | +0.00 |
| 86 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 87 | Ambessa | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 88 | Gnar | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 89 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 90 | Jarvan IV | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 91 | Sett | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 92 | Hecarim | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 93 | Braum | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 94 | Urgot | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 95 | Sejuani | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 96 | Annie | −0.79 | −0.99 | −1.00 | −1.00 | +0.04 | −0.95 | +0.00 |
| 97 | Gwen | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 98 | Jax | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 99 | Jayce | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 100 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 101 | Lee Sin | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 102 | Sylas | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 103 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 104 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 105 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 106 | Irelia | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 107 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 108 | Swain | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 109 | Ezreal | −0.79 | −0.97 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 110 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 111 | Jhin | −0.79 | −0.94 | −1.00 | −1.00 | −0.06 | −0.97 | +0.00 |
| 112 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 113 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.02 | −0.96 | +0.00 |
| 114 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 115 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 116 | Rumble | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 117 | Fizz | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 118 | Warwick | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 119 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 120 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 121 | Volibear | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 122 | Shaco | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 123 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 124 | Akshan | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 125 | Draven | −0.80 | −0.98 | −0.99 | −1.00 | −0.01 | −1.00 | +0.00 |
| 126 | Kayn | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 127 | Ahri | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 128 | Vel'Koz | −0.80 | −1.00 | −0.99 | −1.00 | −0.00 | −0.99 | +0.00 |
| 129 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 130 | Master Yi | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 131 | Azir | −0.80 | −1.00 | −1.00 | −0.99 | +0.00 | −1.00 | +0.00 |
| 132 | Tahm Kench | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 133 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 134 | Ziggs | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 135 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 136 | Miss Fortune | −0.80 | −0.99 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 137 | Zyra | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 138 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 139 | Lissandra | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 140 | Vi | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 141 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 142 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 143 | Vex | −0.80 | −1.00 | −1.00 | −0.98 | −0.07 | −0.97 | +0.00 |
| 144 | Seraphine | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 145 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 146 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 147 | Lillia | −0.80 | −0.98 | −1.00 | −1.00 | −0.09 | −0.95 | +0.00 |
| 148 | Ryze | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 149 | Cassiopeia | −0.81 | −1.00 | −1.00 | −0.98 | −0.07 | −1.00 | +0.00 |
| 150 | Caitlyn | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 151 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 152 | LeBlanc | −0.81 | −1.00 | −0.99 | −1.00 | −0.05 | −1.00 | +0.00 |
| 153 | Hwei | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 154 | Veigar | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 155 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 156 | Varus | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 157 | Zoe | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 158 | Kindred | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 159 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 160 | Smolder | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | −0.99 | +0.00 |
| 161 | Tristana | −0.82 | −0.98 | −1.00 | −1.00 | +0.04 | −0.86 | −0.80 |
| 162 | Twitch | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 163 | Lucian | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 164 | Nidalee | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 165 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 166 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 167 | Yuumi | −0.83 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.30 |
| 168 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.91 |
| 169 | Wukong | −0.84 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.99 |
| 170 | Sona | −0.84 | −0.99 | −0.99 | −1.00 | −0.07 | −1.00 | −0.75 |
| 171 | Renata Glasc | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −1.00 |
| 172 | Graves | −0.85 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Yasuo's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Yasuo's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Yasuo` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Udyr (net +1.04)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Yasuo's Last Breath (airborne). Immune for 1.5 s, long enough to use ahead of Last Breath. (Udyr E Blazing Stampede → Yasuo R Last Breath)
- **0.64** cc immunity: Blazing Stampede makes Udyr immune to Yasuo's Steel Tempest (airborne). Immune for 1.5 s, long enough to use ahead of Steel Tempest. (Udyr E Blazing Stampede → Yasuo Q Steel Tempest)
- Watch out: Wind Wall blocks Udyr's Wilding Claw, a projectile.

#### 2. Vladimir (net +0.86)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Yasuo's Last Breath. Untargetable for 2 s, long enough to use ahead of Last Breath. (Vladimir W Sanguine Pool → Yasuo R Last Breath)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Yasuo's Steel Tempest. Untargetable for 2 s, long enough to use ahead of Steel Tempest. (Vladimir W Sanguine Pool → Yasuo Q Steel Tempest)
- **0.36** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Yasuo's Sweeping Blade. Untargetable for 2 s, long enough to use ahead of Sweeping Blade. (Vladimir W Sanguine Pool → Yasuo E Sweeping Blade)
- Watch out: Wind Wall blocks Vladimir's Tides of Blood, a projectile.

#### 3. Nocturne (net +0.80)

- **0.50** spell shield: Shroud of Darkness's spell shield blocks part of Yasuo's Last Breath. Spell shield for 1.5 s, long enough to use ahead of Last Breath. A spell shield blocks only the first enemy ability that reaches it. Last Breath requires the target to be affected by airborne from an enemy source, and simultaneously that the target is not considered cc-immune, displacement immune, or untargetable during it.
  - Last Breath cannot be cast if there are no nearby enemy champions that meet the conditions.
    - Attempting to cast the ability on an enemy champion that is not airborne will indicate that they "Must Be Airborne!".
    - Spell shield will not prevent Last Breath from being cast and the target will be knocked up and dealt the damage.
      - The spell shield is still consumed in this case.
  - Self-applied or allied-applied displacements do not allow Last Breath to target the champion. Those applied by the neutral team (e.g. Dragon initial knock back) can be targeted.
  - An indicator will be placed towards enemy champions that meet the cast conditions within range of Last Breath to signify the ability can be cast.
  - The Hextech Ultimatum will prevent Yasuo from casting Last Breath on an airborne enemy champion far outside its borders.
    - Yasuo can only do so if the airborne enemy champion is positioned slightly outside of the borders. (Nocturne W Shroud of Darkness → Yasuo R Last Breath)
- **0.48** spell shield: Shroud of Darkness's spell shield blocks Yasuo's Steel Tempest. Spell shield for 1.5 s, long enough to use ahead of Steel Tempest. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Yasuo Q Steel Tempest)
- **0.36** spell shield: Shroud of Darkness's spell shield blocks Yasuo's Sweeping Blade. Spell shield for 1.5 s, long enough to use ahead of Sweeping Blade. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Yasuo E Sweeping Blade)
- Watch out: Wind Wall blocks Nocturne's Duskbringer, a projectile.

#### 4. Gangplank (net +0.74)

- **0.80** cleanse: Remove Scurvy cleanses Yasuo's Last Breath (airborne) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Yasuo R Last Breath)
- **0.37** cleanse: Remove Scurvy cleanses Yasuo's Steel Tempest (airborne) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Yasuo Q Steel Tempest)
- Watch out: Wind Wall blocks Gangplank's Parrrley, a projectile.

#### 5. Morgana (net +0.67)

- **1.00** cc immunity: Black Shield makes Morgana immune to Yasuo's Last Breath (airborne). Immune for 5 s, long enough to use ahead of Last Breath. (Morgana E Black Shield → Yasuo R Last Breath)
- **0.44** cc immunity: Black Shield makes Morgana immune to Yasuo's Steel Tempest (airborne). Immune for 5 s, long enough to use ahead of Steel Tempest. (Morgana E Black Shield → Yasuo Q Steel Tempest)
- **0.11** range: Morgana's basic attacks reach 275 units farther than Yasuo's (450 vs 175 attack range). Yasuo closes the gap with Last Breath, Sweeping Blade. (Morgana basic attacks → Yasuo basic attacks)
- Watch out: Wind Wall blocks Morgana's Dark Binding, a projectile.

#### 6. Camille (net +0.66)

- **0.36** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Yasuo's Last Breath. Untargetable for 0.5 s; Last Breath lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Camille R The Hextech Ultimatum → Yasuo R Last Breath)
- **0.36** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Yasuo's Sweeping Blade. Untargetable for 0.5 s; Sweeping Blade takes 0.63 s to land, enough to react. (Camille R The Hextech Ultimatum → Yasuo E Sweeping Blade)
- **0.34** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Yasuo's Steel Tempest. Untargetable for 0.5 s; Steel Tempest takes 0.38 s to land, enough to react. (Camille R The Hextech Ultimatum → Yasuo Q Steel Tempest)

#### 7. Fiora (net +0.64)

- **0.70** parry: Riposte parries Yasuo's Last Breath and stuns back. Parry for 0.75 s; Last Breath lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Last Breath's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Yasuo R Last Breath)
- **0.54** parry: Riposte parries Yasuo's Steel Tempest and stuns back. Parry for 0.75 s; Steel Tempest takes 0.38 s to land, enough to react. Negating Steel Tempest's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Yasuo Q Steel Tempest)
- **0.36** parry: Riposte parries Yasuo's Sweeping Blade. Parry for 0.75 s; Sweeping Blade takes 0.63 s to land, enough to react. (Fiora W Riposte → Yasuo E Sweeping Blade)
- Watch out: Wind Wall blocks Fiora's Riposte, a projectile.

#### 8. Olaf (net +0.64)

- **0.63** cc immunity: Ragnarok makes Olaf immune to Yasuo's Last Breath (airborne). Immune for 3 s, long enough to use ahead of Last Breath. (Olaf R Ragnarok → Yasuo R Last Breath)
- **0.34** cc immunity: Ragnarok makes Olaf immune to Yasuo's Steel Tempest (airborne). Immune for 3 s, long enough to use ahead of Steel Tempest. (Olaf R Ragnarok → Yasuo Q Steel Tempest)
- Watch out: Wind Wall blocks part of Olaf's Undertow, a projectile.

#### 9. Alistar (net +0.64)

- **0.50** cleanse: Unbreakable Will cleanses Yasuo's Last Breath (airborne) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Yasuo R Last Breath)
- **0.28** cleanse: Unbreakable Will cleanses Yasuo's Steel Tempest (airborne) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Yasuo Q Steel Tempest)

#### 10. Rek'Sai (net +0.59)

- **0.63** untargetable: Void Rush makes Rek'Sai untargetable, dodging Yasuo's Last Breath. Untargetable for 1.5 s, long enough to use ahead of Last Breath. (Rek'Sai R Void Rush → Yasuo R Last Breath)
- **0.36** untargetable: Void Rush makes Rek'Sai untargetable, dodging Yasuo's Sweeping Blade. Untargetable for 1.5 s, long enough to use ahead of Sweeping Blade. (Rek'Sai R Void Rush → Yasuo E Sweeping Blade)
- **0.34** untargetable: Void Rush makes Rek'Sai untargetable, dodging Yasuo's Steel Tempest. Untargetable for 1.5 s, long enough to use ahead of Steel Tempest. (Rek'Sai R Void Rush → Yasuo Q Steel Tempest)
- Watch out: Wind Wall blocks Rek'Sai's Prey Seeker, a projectile.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Udyr | +1.04 | 1.32 | 0.28 |  |
| 2 | Vladimir | +0.86 | 1.41 | 0.55 |  |
| 3 | Nocturne | +0.80 | 1.11 | 0.31 |  |
| 4 | Gangplank | +0.74 | 0.99 | 0.25 |  |
| 5 | Morgana | +0.67 | 1.33 | 0.66 |  |
| 6 | Camille | +0.66 | 0.66 | 0.00 |  |
| 7 | Fiora | +0.64 | 1.07 | 0.43 |  |
| 8 | Olaf | +0.64 | 0.80 | 0.16 |  |
| 9 | Alistar | +0.64 | 0.64 | 0.00 |  |
| 10 | Rek'Sai | +0.59 | 0.93 | 0.34 |  |
| 11 | Fizz | +0.57 | 0.97 | 0.40 |  |
| 12 | Bard | +0.56 | 1.11 | 0.55 |  |
| 13 | Xin Zhao | +0.55 | 0.55 | 0.00 |  |
| 14 | Master Yi | +0.53 | 0.90 | 0.37 |  |
| 15 | Sion | +0.46 | 0.88 | 0.42 |  |
| 16 | Jax | +0.45 | 0.45 | 0.00 |  |
| 17 | Sivir | +0.38 | 1.08 | 0.70 |  |
| 18 | Lissandra | +0.37 | 1.06 | 0.69 |  |
| 19 | Nilah | +0.37 | 0.37 | 0.00 |  |
| 20 | Gwen | +0.35 | 0.90 | 0.55 |  |
| 21 | K'Sante | +0.35 | 0.56 | 0.21 |  |
| 22 | Rengar | +0.34 | 1.01 | 0.67 |  |
| 23 | Zed | +0.34 | 0.62 | 0.28 |  |
| 24 | Singed | +0.32 | 0.71 | 0.39 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 25 | Xayah | +0.30 | 1.07 | 0.77 |  |
| 26 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 27 | Jarvan IV | +0.28 | 0.28 | 0.00 |  |
| 28 | Sett | +0.28 | 0.28 | 0.00 |  |
| 29 | Volibear | +0.28 | 0.28 | 0.00 |  |
| 30 | Evelynn | +0.27 | 0.65 | 0.38 |  |
| 31 | Aurora | +0.23 | 0.84 | 0.61 |  |
| 32 | Cassiopeia | +0.23 | 0.84 | 0.61 | grounding (Miasma), grounding (Miasma) |
| 33 | Kalista | +0.19 | 0.76 | 0.57 |  |
| 34 | Yone | +0.19 | 0.46 | 0.27 |  |
| 35 | Kayle | +0.18 | 0.80 | 0.62 |  |
| 36 | Malphite | +0.16 | 0.47 | 0.31 |  |
| 37 | Shaco | +0.14 | 0.65 | 0.51 |  |
| 38 | Illaoi | +0.09 | 0.28 | 0.19 |  |
| 39 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 40 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 41 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 42 | Darius | 0.00 | 0.00 | 0.00 |  |
| 43 | Garen | 0.00 | 0.00 | 0.00 |  |
| 44 | Rell | 0.00 | 0.00 | 0.00 |  |
| 45 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 46 | Taric | 0.00 | 0.00 | 0.00 |  |
| 47 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 48 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 49 | Zaahen | -0.03 | 0.55 | 0.58 |  |
| 50 | Shyvana | -0.03 | 0.28 | 0.31 |  |
| 51 | Yuumi | -0.04 | 1.63 | 1.67 |  |
| 52 | Malzahar | -0.04 | 1.00 | 1.04 |  |
| 53 | Zeri | -0.04 | 0.28 | 0.32 |  |
| 54 | Maokai | -0.15 | 0.95 | 1.10 |  |
| 55 | Samira | -0.16 | 0.38 | 0.54 |  |
| 56 | Viktor | -0.17 | 0.37 | 0.54 |  |
| 57 | Nidalee | -0.18 | 0.18 | 0.36 |  |
| 58 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 59 | Jayce | -0.22 | 0.18 | 0.40 |  |
| 60 | Lulu | -0.23 | 0.49 | 0.72 |  |
| 61 | Rakan | -0.23 | 0.06 | 0.29 |  |
| 62 | Rammus | -0.24 | 0.29 | 0.53 |  |
| 63 | Kayn | -0.25 | 0.65 | 0.90 |  |
| 64 | Kled | -0.27 | 0.56 | 0.83 |  |
| 65 | Soraka | -0.27 | 0.17 | 0.44 |  |
| 66 | Annie | -0.27 | 0.15 | 0.42 |  |
| 67 | Kennen | -0.28 | 0.18 | 0.46 |  |
| 68 | Aurelion Sol | -0.28 | 0.14 | 0.42 |  |
| 69 | Lee Sin | -0.28 | 0.00 | 0.28 |  |
| 70 | Rumble | -0.28 | 0.00 | 0.28 |  |
| 71 | Ekko | -0.29 | 0.00 | 0.29 |  |
| 72 | Kassadin | -0.29 | 0.00 | 0.29 |  |
| 73 | Cho'Gath | -0.30 | 0.00 | 0.30 |  |
| 74 | Dr. Mundo | -0.30 | 0.00 | 0.30 |  |
| 75 | Azir | -0.31 | 0.16 | 0.47 |  |
| 76 | Yorick | -0.31 | 0.00 | 0.31 |  |
| 77 | Teemo | -0.33 | 0.57 | 0.90 |  |
| 78 | Orianna | -0.34 | 0.16 | 0.50 |  |
| 79 | Skarner | -0.34 | 0.00 | 0.34 |  |
| 80 | Vex | -0.37 | 0.63 | 1.00 |  |
| 81 | Mel | -0.37 | 0.37 | 0.74 |  |
| 82 | Gnar | -0.37 | 0.19 | 0.56 |  |
| 83 | Aatrox | -0.37 | 0.00 | 0.37 |  |
| 84 | Karma | -0.40 | 0.13 | 0.53 |  |
| 85 | Pantheon | -0.41 | 0.73 | 1.14 |  |
| 86 | Yunara | -0.41 | 0.24 | 0.65 |  |
| 87 | Riven | -0.41 | 0.00 | 0.41 |  |
| 88 | Warwick | -0.42 | 0.89 | 1.31 |  |
| 89 | Locke | -0.42 | 0.00 | 0.42 |  |
| 90 | Veigar | -0.44 | 0.33 | 0.77 |  |
| 91 | Kog'Maw | -0.44 | 0.16 | 0.60 |  |
| 92 | Jinx | -0.46 | 0.35 | 0.81 |  |
| 93 | Zilean | -0.46 | 0.20 | 0.66 |  |
| 94 | Diana | -0.46 | 0.00 | 0.46 |  |
| 95 | Twitch | -0.47 | 0.27 | 0.74 |  |
| 96 | Vi | -0.48 | 0.28 | 0.76 |  |
| 97 | LeBlanc | -0.50 | 0.13 | 0.63 |  |
| 98 | Thresh | -0.50 | 0.11 | 0.61 |  |
| 99 | Aphelios | -0.51 | 0.24 | 0.75 |  |
| 100 | Anivia | -0.51 | 0.16 | 0.67 |  |
| 101 | Milio | -0.52 | 0.22 | 0.74 |  |
| 102 | Elise | -0.52 | 0.20 | 0.72 |  |
| 103 | Zyra | -0.52 | 0.16 | 0.68 |  |
| 104 | Kindred | -0.56 | 0.27 | 0.83 |  |
| 105 | Poppy | -0.57 | 0.63 | 1.20 | dash stop (Steadfast Presence) |
| 106 | Kai'Sa | -0.57 | 0.22 | 0.79 |  |
| 107 | Lux | -0.58 | 0.18 | 0.76 |  |
| 108 | Corki | -0.60 | 0.20 | 0.80 |  |
| 109 | Nautilus | -0.60 | 0.00 | 0.60 |  |
| 110 | Shen | -0.61 | 0.42 | 1.03 |  |
| 111 | Leona | -0.61 | 0.00 | 0.61 |  |
| 112 | Amumu | -0.64 | 0.18 | 0.82 |  |
| 113 | Syndra | -0.64 | 0.14 | 0.78 |  |
| 114 | Smolder | -0.65 | 0.20 | 0.85 |  |
| 115 | Braum | -0.66 | 0.28 | 0.94 |  |
| 116 | Swain | -0.66 | 0.12 | 0.78 |  |
| 117 | Blitzcrank | -0.68 | 0.00 | 0.68 |  |
| 118 | Vayne | -0.69 | 0.27 | 0.96 |  |
| 119 | Brand | -0.69 | 0.14 | 0.83 |  |
| 120 | Hwei | -0.70 | 0.32 | 1.02 |  |
| 121 | Hecarim | -0.70 | 0.30 | 1.00 |  |
| 122 | Zoe | -0.70 | 0.20 | 0.90 |  |
| 123 | Neeko | -0.71 | 0.14 | 0.85 |  |
| 124 | Karthus | -0.71 | 0.11 | 0.82 |  |
| 125 | Kha'Zix | -0.71 | 0.00 | 0.71 |  |
| 126 | Senna | -0.72 | 0.22 | 0.94 |  |
| 127 | Draven | -0.75 | 0.22 | 0.97 |  |
| 128 | Sylas | -0.75 | 0.00 | 0.75 |  |
| 129 | Ezreal | -0.76 | 0.20 | 0.96 |  |
| 130 | Quinn | -0.78 | 0.22 | 1.00 |  |
| 131 | Ahri | -0.79 | 0.32 | 1.11 |  |
| 132 | Irelia | -0.82 | 0.00 | 0.82 |  |
| 133 | Ashe | -0.83 | 0.24 | 1.07 |  |
| 134 | Sona | -0.84 | 0.26 | 1.10 |  |
| 135 | Akali | -0.84 | 0.00 | 0.84 |  |
| 136 | Talon | -0.84 | 0.00 | 0.84 |  |
| 137 | Viego | -0.85 | 0.28 | 1.13 |  |
| 138 | Lillia | -0.85 | 0.05 | 0.90 |  |
| 139 | Tristana | -0.86 | 0.24 | 1.10 |  |
| 140 | Ziggs | -0.86 | 0.17 | 1.03 |  |
| 141 | Vel'Koz | -0.87 | 0.16 | 1.03 |  |
| 142 | Heimerdinger | -0.88 | 0.12 | 1.00 |  |
| 143 | Graves | -0.89 | 0.14 | 1.03 |  |
| 144 | Ivern | -0.89 | 0.11 | 1.00 |  |
| 145 | Qiyana | -0.91 | 0.00 | 0.91 |  |
| 146 | Ornn | -0.95 | 0.28 | 1.23 |  |
| 147 | Ryze | -0.97 | 0.15 | 1.12 |  |
| 148 | Urgot | -0.98 | 0.08 | 1.06 |  |
| 149 | Sejuani | -0.98 | 0.00 | 0.98 |  |
| 150 | Seraphine | -1.02 | 0.17 | 1.19 |  |
| 151 | Nami | -1.02 | 0.14 | 1.16 |  |
| 152 | Renata Glasc | -1.05 | 0.24 | 1.29 |  |
| 153 | Zac | -1.09 | 0.18 | 1.27 |  |
| 154 | Varus | -1.11 | 0.18 | 1.29 |  |
| 155 | Miss Fortune | -1.16 | 0.20 | 1.36 |  |
| 156 | Xerath | -1.18 | 0.16 | 1.34 |  |
| 157 | Lucian | -1.19 | 0.21 | 1.40 |  |
| 158 | Naafiri | -1.19 | 0.00 | 1.19 |  |
| 159 | Twisted Fate | -1.20 | 0.25 | 1.45 |  |
| 160 | Caitlyn | -1.21 | 0.24 | 1.45 |  |
| 161 | Briar | -1.22 | 0.00 | 1.22 |  |
| 162 | Pyke | -1.25 | 0.00 | 1.25 |  |
| 163 | Katarina | -1.26 | 0.00 | 1.26 |  |
| 164 | Tahm Kench | -1.27 | 0.00 | 1.27 |  |
| 165 | Gragas | -1.28 | 0.00 | 1.28 |  |
| 166 | Akshan | -1.37 | 0.19 | 1.56 |  |
| 167 | Jhin | -1.37 | 0.17 | 1.54 |  |
| 168 | Galio | -1.44 | 0.00 | 1.44 |  |
| 169 | Janna | -1.47 | 0.22 | 1.69 |  |
| 170 | Fiddlesticks | -1.52 | 0.11 | 1.63 |  |
| 171 | Nunu & Willump | -1.58 | 0.00 | 1.58 |  |
| 172 | Taliyah | -1.97 | 0.16 | 2.13 |  |
