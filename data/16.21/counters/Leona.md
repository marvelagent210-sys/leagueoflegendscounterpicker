# Counters to Leona (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Leona: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Leona wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Leona --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Master Yi | +0.86 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +1.00 |
| 2 | Olaf | +0.85 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.98 |
| 3 | Urgot | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 4 | Tristana | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 5 | Graves | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 6 | Aphelios | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 7 | Ambessa | +0.82 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.00 |
| 8 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 9 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 10 | Twisted Fate | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 11 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 12 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 13 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 14 | Gwen | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 15 | Kalista | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 16 | Samira | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 17 | Zeri | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 18 | Smolder | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 19 | Riven | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 20 | Rakan | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 21 | Morgana | +0.81 | +1.00 | +0.99 | +1.00 | +0.07 | +1.00 | +0.00 |
| 22 | Heimerdinger | +0.81 | +0.99 | +0.99 | +1.00 | +0.09 | +0.99 | +0.00 |
| 23 | Udyr | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 24 | Aurora | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 25 | Karma | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 26 | Lulu | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 27 | Orianna | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 28 | Quinn | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 29 | Neeko | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 30 | Ivern | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 31 | Fiora | +0.81 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.07 |
| 32 | Kog'Maw | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 33 | Illaoi | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 34 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 35 | Yunara | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 36 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 37 | Milio | +0.80 | +1.00 | +0.98 | +1.00 | +0.07 | +1.00 | +0.00 |
| 38 | Xayah | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 39 | Lucian | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 40 | Sivir | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 41 | Ezreal | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 42 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 43 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 44 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 45 | Ashe | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 46 | Trundle | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 47 | Gangplank | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 48 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 49 | Hwei | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | +0.91 | +0.00 |
| 50 | Kennen | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | +0.84 | +0.00 |
| 51 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 52 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 53 | Diana | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 54 | Viego | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 55 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 56 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 57 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 58 | Rek'Sai | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 59 | Lee Sin | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 60 | Warwick | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 61 | Irelia | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 62 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 63 | Vi | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 64 | Rammus | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 65 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 66 | Maokai | +0.78 | +1.00 | +0.96 | +1.00 | +0.09 | – | +0.00 |
| 67 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 68 | Aatrox | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 69 | Skarner | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 70 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 71 | Sion | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 72 | Braum | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 73 | Fizz | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 74 | Shaco | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 75 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 76 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 77 | Yorick | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 78 | Bel'Veth | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 79 | Nocturne | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 80 | Wukong | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 81 | Tahm Kench | +0.77 | +0.94 | +0.94 | +1.00 | +0.12 | – | +0.00 |
| 82 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 83 | Bard | +0.74 | +0.77 | +1.00 | +0.98 | +0.01 | +1.00 | +0.00 |
| 84 | Taric | +0.71 | +1.00 | +0.73 | +1.00 | +0.03 | – | +0.00 |
| 85 | Elise | +0.65 | +1.00 | +1.00 | +1.00 | +0.09 | −0.68 | +0.00 |
| 86 | Miss Fortune | +0.63 | +1.00 | +1.00 | +0.12 | +0.04 | +1.00 | +0.00 |
| 87 | Jhin | +0.62 | +1.00 | +1.00 | +1.00 | −0.01 | −0.76 | +0.00 |
| 88 | Shyvana | +0.61 | +1.00 | +1.00 | +1.00 | +0.04 | −1.00 | +0.00 |
| 89 | Kai'Sa | +0.58 | +0.56 | +0.56 | +1.00 | +0.02 | +1.00 | +0.00 |
| 90 | Sett | +0.57 | +1.00 | +0.20 | +1.00 | +0.09 | – | +0.00 |
| 91 | Ziggs | +0.53 | +0.38 | +0.45 | +1.00 | +0.16 | +1.00 | +0.00 |
| 92 | Sejuani | +0.53 | +0.10 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 93 | Janna | +0.45 | +1.00 | −0.46 | +1.00 | +0.08 | +1.00 | +0.00 |
| 94 | Zac | +0.44 | +0.39 | +0.39 | +1.00 | −0.01 | – | +0.00 |
| 95 | Rengar | +0.44 | +1.00 | +1.00 | −0.82 | +0.39 | – | +0.00 |
| 96 | Nilah | +0.42 | +1.00 | −0.66 | +1.00 | +0.23 | +1.00 | +0.00 |
| 97 | Azir | +0.39 | +1.00 | −0.65 | +1.00 | +0.02 | +1.00 | +0.00 |
| 98 | Varus | +0.34 | +0.48 | +0.48 | +1.00 | +0.03 | −0.98 | +0.00 |
| 99 | Yone | +0.33 | +0.11 | +0.28 | +1.00 | +0.03 | – | +0.00 |
| 100 | Vel'Koz | +0.32 | +0.94 | +0.94 | −0.87 | +0.18 | +0.00 | +0.00 |
| 101 | Jinx | +0.28 | +0.12 | +0.12 | +1.00 | +0.01 | +0.20 | +0.00 |
| 102 | Zilean | +0.26 | +1.00 | −0.13 | −0.31 | +0.09 | +0.89 | +0.00 |
| 103 | Annie | +0.25 | −0.41 | +0.33 | +1.00 | +0.04 | +0.63 | +0.00 |
| 104 | Malzahar | +0.24 | +0.01 | −0.21 | +1.00 | +0.01 | +0.94 | +0.00 |
| 105 | Amumu | +0.21 | −0.04 | +0.01 | +1.00 | −0.01 | – | +0.00 |
| 106 | Lux | +0.20 | +0.16 | +0.16 | +0.46 | +0.03 | +0.27 | +0.00 |
| 107 | Malphite | +0.18 | +0.21 | +0.21 | +0.23 | +0.06 | – | +0.00 |
| 108 | Akali | +0.16 | −0.92 | +0.72 | +0.97 | +0.02 | – | +0.00 |
| 109 | Nautilus | +0.15 | +0.03 | +0.04 | +0.52 | +0.07 | – | +0.00 |
| 110 | Swain | +0.13 | +0.16 | +0.16 | +0.14 | +0.06 | +0.16 | +0.00 |
| 111 | Syndra | +0.13 | −0.66 | −0.04 | +1.00 | +0.03 | +1.00 | +0.00 |
| 112 | Jarvan IV | +0.12 | +1.00 | −0.66 | +0.00 | +0.18 | – | +0.00 |
| 113 | Ornn | +0.09 | +0.11 | +0.08 | +0.11 | +0.08 | – | +0.00 |
| 114 | Shen | +0.08 | +0.05 | +0.06 | +0.18 | +0.08 | – | +0.00 |
| 115 | Gragas | +0.07 | +0.05 | +0.05 | +0.09 | +0.12 | – | +0.00 |
| 116 | Rell | +0.06 | +0.06 | +0.05 | +0.05 | +0.08 | +0.13 | +0.00 |
| 117 | Lillia | +0.04 | +0.05 | +0.05 | +0.02 | +0.07 | +0.06 | +0.00 |
| 118 | Singed | +0.03 | +0.07 | −0.04 | +0.10 | +0.00 | – | +0.00 |
| 119 | Alistar | +0.03 | +0.04 | +0.01 | +0.04 | +0.04 | – | +0.00 |
| 120 | Mel | +0.02 | +0.07 | −0.01 | −0.03 | +0.06 | +0.05 | +0.00 |
| 121 | Zoe | +0.02 | −0.01 | +0.04 | +0.03 | +0.02 | −0.01 | +0.00 |
| 122 | Naafiri | −0.01 | +1.00 | −0.24 | −1.00 | +0.03 | – | +0.00 |
| 123 | Nami | −0.01 | −0.01 | −0.01 | −0.05 | +0.04 | −0.06 | +0.00 |
| 124 | Nunu & Willump | −0.04 | −0.07 | −0.03 | −0.06 | +0.04 | – | +0.00 |
| 125 | Soraka | −0.04 | +0.03 | −0.10 | −0.07 | +0.04 | −0.17 | +0.00 |
| 126 | Anivia | −0.05 | −0.02 | −0.03 | −0.11 | −0.05 | −0.13 | +0.00 |
| 127 | Akshan | −0.07 | −0.01 | −0.01 | +0.02 | +0.02 | −0.71 | +0.00 |
| 128 | Zyra | −0.07 | −0.15 | −0.07 | −0.05 | +0.00 | −0.07 | +0.00 |
| 129 | Veigar | −0.09 | −0.17 | −0.09 | −0.13 | +0.02 | −0.05 | +0.00 |
| 130 | Sylas | −0.10 | +1.00 | −0.66 | −1.00 | +0.17 | – | +0.00 |
| 131 | Ryze | −0.10 | +1.00 | −0.63 | −0.81 | +0.07 | −0.44 | +0.00 |
| 132 | Sona | −0.17 | +0.09 | +0.08 | −1.00 | +0.05 | −0.20 | +0.00 |
| 133 | Kayn | −0.18 | +0.66 | −0.71 | −0.82 | +0.11 | – | +0.00 |
| 134 | LeBlanc | −0.19 | +0.21 | −0.20 | −0.66 | −0.03 | −0.53 | +0.00 |
| 135 | Karthus | −0.20 | −0.24 | −0.20 | −0.28 | −0.01 | −0.29 | +0.00 |
| 136 | Senna | −0.21 | +0.02 | +0.02 | −0.79 | +0.04 | −0.68 | +0.00 |
| 137 | Pantheon | −0.22 | −1.00 | −0.63 | +1.00 | +0.08 | – | +0.00 |
| 138 | Brand | −0.31 | −0.01 | −0.45 | −0.62 | +0.01 | −0.70 | +0.00 |
| 139 | Viktor | −0.31 | +0.06 | −0.60 | −0.66 | −0.01 | −0.47 | +0.00 |
| 140 | Seraphine | −0.32 | −0.07 | −0.02 | −1.00 | −0.01 | −0.98 | +0.00 |
| 141 | Draven | −0.33 | −0.33 | −0.55 | −1.00 | +0.04 | +0.84 | +0.00 |
| 142 | Briar | −0.34 | −1.00 | −1.00 | +1.00 | −0.03 | – | +0.00 |
| 143 | Vex | −0.37 | −0.31 | −0.31 | −0.69 | +0.00 | −0.71 | +0.00 |
| 144 | Yuumi | −0.37 | −0.12 | −0.23 | −0.96 | −0.01 | −0.87 | +0.00 |
| 145 | Xerath | −0.42 | −0.35 | −0.32 | −0.87 | +0.04 | −0.80 | +0.00 |
| 146 | Lissandra | −0.44 | −0.85 | +0.04 | −0.85 | +0.03 | −0.75 | +0.00 |
| 147 | Ahri | −0.48 | −0.69 | −0.18 | −0.90 | +0.02 | −0.82 | +0.00 |
| 148 | Kassadin | −0.64 | −0.70 | −0.85 | −1.00 | +0.06 | – | +0.00 |
| 149 | Aurelion Sol | −0.67 | −1.00 | −1.00 | −1.00 | +0.35 | −0.25 | +0.00 |
| 150 | Nidalee | −0.68 | −0.93 | −0.93 | −1.00 | −0.01 | −0.08 | +0.00 |
| 151 | Cassiopeia | −0.69 | −0.71 | −0.87 | −0.99 | +0.02 | −0.99 | +0.00 |
| 152 | Twitch | −0.70 | −0.94 | −0.78 | −1.00 | +0.00 | −0.65 | +0.00 |
| 153 | Fiddlesticks | −0.74 | −0.96 | −0.80 | −1.00 | −0.01 | −1.00 | +0.00 |
| 154 | Evelynn | −0.75 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.00 |
| 155 | Blitzcrank | −0.76 | −1.00 | −0.94 | −1.00 | +0.03 | – | +0.00 |
| 156 | Galio | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 157 | Hecarim | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 158 | Kindred | −0.77 | −0.90 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 159 | Zed | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 160 | Locke | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 161 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 162 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 163 | Katarina | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 164 | Ekko | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 165 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 166 | Talon | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 167 | Qiyana | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 168 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 169 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 170 | Pyke | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 171 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 172 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Leona's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Leona's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Leona` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.67)

- **0.80** spell shield: Spell Shield's spell shield blocks Leona's Solar Flare. Spell shield for 1.5 s, long enough to use ahead of Solar Flare. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Leona R Solar Flare)
- **0.60** spell shield: Spell Shield's spell shield blocks Leona's Zenith Blade. Spell shield for 1.5 s, long enough to use ahead of Zenith Blade. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Leona E Zenith Blade)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Leona's (500 vs 125 attack range). Leona closes the gap with Zenith Blade. (Sivir basic attacks → Leona basic attacks)

#### 2. Udyr (net +1.56)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Leona's Zenith Blade (root). Immune for 1.5 s, long enough to use ahead of Zenith Blade. (Udyr E Blazing Stampede → Leona E Zenith Blade)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Leona's Solar Flare (slow, stun). Immune for 1.5 s, long enough to use ahead of Solar Flare. (Udyr E Blazing Stampede → Leona R Solar Flare)
- **0.63** cc immunity: Blazing Stampede makes Udyr immune to Leona's Shield of Daybreak (stun). Immune for 1.5 s, long enough to use ahead of Shield of Daybreak. (Udyr E Blazing Stampede → Leona Q Shield of Daybreak)

#### 3. Morgana (net +1.41)

- **0.80** cc immunity: Black Shield makes Morgana immune to Leona's Solar Flare (slow, stun). Immune for 5 s, long enough to use ahead of Solar Flare. (Morgana E Black Shield → Leona R Solar Flare)
- **0.63** cc immunity: Black Shield makes Morgana immune to Leona's Zenith Blade (root). Immune for 5 s, long enough to use ahead of Zenith Blade. (Morgana E Black Shield → Leona E Zenith Blade)
- **0.41** cc immunity: Black Shield makes Morgana immune to Leona's Shield of Daybreak (stun). Immune for 5 s, long enough to use ahead of Shield of Daybreak. (Morgana E Black Shield → Leona Q Shield of Daybreak)

#### 4. Fiora (net +1.36)

- **0.90** parry: Riposte parries Leona's Solar Flare and stuns back. Parry for 0.75 s; Solar Flare takes 0.25 s to land, enough to react. Negating Solar Flare's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Leona R Solar Flare)
- **0.73** parry: Riposte parries Leona's Zenith Blade and stuns back. Parry for 0.75 s; Zenith Blade takes 0.7 s to land, enough to react. Negating Zenith Blade's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Leona E Zenith Blade)
- **0.35** parry: Riposte parries Leona's Shield of Daybreak and stuns back. Parry for 0.75 s; Shield of Daybreak lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Shield of Daybreak's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Leona Q Shield of Daybreak)

#### 5. Bard (net +1.34)

- **0.68** untargetable: Tempered Fate makes Bard untargetable, dodging Leona's Solar Flare. Untargetable for 2.5 s, long enough to use ahead of Solar Flare. (Bard R Tempered Fate → Leona R Solar Flare)
- **0.45** untargetable: Tempered Fate makes Bard untargetable, dodging Leona's Zenith Blade. Untargetable for 2.5 s, long enough to use ahead of Zenith Blade. (Bard R Tempered Fate → Leona E Zenith Blade)
- **0.36** range: Bard's basic attacks reach 375 units farther than Leona's (500 vs 125 attack range). Leona closes the gap with Zenith Blade. (Bard basic attacks → Leona basic attacks)

#### 6. Fizz (net +1.33)

- **0.85** untargetable: Playful makes Fizz untargetable, dodging Leona's Zenith Blade. Untargetable for 0.75 s; Zenith Blade takes 0.7 s to land, enough to react. (Fizz E Playful → Leona E Zenith Blade)
- **0.80** untargetable: Playful makes Fizz untargetable, dodging Leona's Solar Flare. Untargetable for 0.75 s; Solar Flare takes 0.25 s to land, enough to react. (Fizz E Playful → Leona R Solar Flare)
- **0.33** untargetable: Playful makes Fizz untargetable, dodging Leona's Shield of Daybreak. Untargetable for 0.75 s; Shield of Daybreak lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Leona Q Shield of Daybreak)

#### 7. Xayah (net +1.29)

- **0.61** untargetable: Featherstorm makes Xayah untargetable, dodging Leona's Solar Flare. Untargetable for 1.5 s, long enough to use ahead of Solar Flare. (Xayah R Featherstorm → Leona R Solar Flare)
- **0.44** untargetable: Featherstorm makes Xayah untargetable, dodging Leona's Zenith Blade. Untargetable for 1.5 s, long enough to use ahead of Zenith Blade. (Xayah R Featherstorm → Leona E Zenith Blade)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Leona's (525 vs 125 attack range). Leona closes the gap with Zenith Blade. (Xayah basic attacks → Leona basic attacks)

#### 8. Nocturne (net +1.26)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Leona's Solar Flare. Spell shield for 1.5 s, long enough to use ahead of Solar Flare. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Leona R Solar Flare)
- **0.70** spell shield: Shroud of Darkness's spell shield blocks Leona's Zenith Blade. Spell shield for 1.5 s, long enough to use ahead of Zenith Blade. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Leona E Zenith Blade)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Leona's Shield of Daybreak. Spell shield for 1.5 s, long enough to use ahead of Shield of Daybreak. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Leona Q Shield of Daybreak)

#### 9. Maokai (net +1.25)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Leona's Solar Flare. Untargetable for 1.4 s; Solar Flare takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Leona R Solar Flare)
- **0.76** untargetable: Twisted Advance makes Maokai untargetable, dodging Leona's Zenith Blade. Untargetable for 1.4 s; Zenith Blade takes 0.7 s to land, enough to react. (Maokai W Twisted Advance → Leona E Zenith Blade)
- **0.29** untargetable: Twisted Advance makes Maokai untargetable, dodging Leona's Shield of Daybreak. Untargetable for 1.4 s; Shield of Daybreak lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Leona Q Shield of Daybreak)

#### 10. Vladimir (net +1.24)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Leona's Solar Flare. Untargetable for 2 s, long enough to use ahead of Solar Flare. (Vladimir W Sanguine Pool → Leona R Solar Flare)
- **0.63** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Leona's Zenith Blade. Untargetable for 2 s, long enough to use ahead of Zenith Blade. (Vladimir W Sanguine Pool → Leona E Zenith Blade)
- **0.41** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Leona's Shield of Daybreak. Untargetable for 2 s, long enough to use ahead of Shield of Daybreak. (Vladimir W Sanguine Pool → Leona Q Shield of Daybreak)
- Watch out: Shield of Daybreak's stun interrupts Vladimir's Tides of Blood (charge-up).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.67 | 1.67 | 0.00 |  |
| 2 | Udyr | +1.56 | 1.56 | 0.00 |  |
| 3 | Morgana | +1.41 | 1.41 | 0.00 |  |
| 4 | Fiora | +1.36 | 1.36 | 0.00 |  |
| 5 | Bard | +1.34 | 1.34 | 0.00 |  |
| 6 | Fizz | +1.33 | 1.33 | 0.00 |  |
| 7 | Xayah | +1.29 | 1.29 | 0.00 |  |
| 8 | Nocturne | +1.26 | 1.26 | 0.00 |  |
| 9 | Maokai | +1.25 | 1.25 | 0.00 |  |
| 10 | Vladimir | +1.24 | 1.40 | 0.16 |  |
| 11 | Lissandra | +1.23 | 1.23 | 0.00 |  |
| 12 | Aurora | +1.17 | 1.17 | 0.00 |  |
| 13 | Gwen | +1.16 | 1.16 | 0.00 |  |
| 14 | Milio | +1.10 | 1.10 | 0.00 |  |
| 15 | Rengar | +1.04 | 1.04 | 0.00 |  |
| 16 | Yuumi | +1.02 | 1.83 | 0.81 |  |
| 17 | Master Yi | +1.00 | 1.34 | 0.34 |  |
| 18 | Kalista | +1.00 | 1.00 | 0.00 |  |
| 19 | Gangplank | +0.99 | 0.99 | 0.00 |  |
| 20 | Olaf | +0.98 | 0.98 | 0.00 |  |
| 21 | Rek'Sai | +0.98 | 0.98 | 0.00 |  |
| 22 | Kled | +0.97 | 0.97 | 0.00 |  |
| 23 | Evelynn | +0.95 | 0.95 | 0.00 |  |
| 24 | Shaco | +0.95 | 0.95 | 0.00 |  |
| 25 | Zaahen | +0.95 | 0.95 | 0.00 |  |
| 26 | Camille | +0.91 | 0.91 | 0.00 |  |
| 27 | Zed | +0.88 | 0.88 | 0.00 |  |
| 28 | Samira | +0.86 | 0.86 | 0.00 | projectile block (Blade Whirl) |
| 29 | Sion | +0.85 | 1.11 | 0.26 |  |
| 30 | Braum | +0.85 | 0.85 | 0.00 | projectile block (Unbreakable) |
| 31 | Kayle | +0.85 | 0.85 | 0.00 |  |
| 32 | Mel | +0.81 | 0.81 | 0.00 | projectile block (Rebuttal) |
| 33 | Alistar | +0.78 | 0.78 | 0.00 |  |
| 34 | Teemo | +0.72 | 0.72 | 0.00 |  |
| 35 | Cassiopeia | +0.70 | 0.70 | 0.00 | grounding (Miasma) |
| 36 | Jinx | +0.67 | 0.67 | 0.00 |  |
| 37 | Viktor | +0.66 | 0.66 | 0.00 |  |
| 38 | Lulu | +0.63 | 0.63 | 0.00 |  |
| 39 | Hwei | +0.61 | 0.61 | 0.00 |  |
| 40 | Yasuo | +0.61 | 0.61 | 0.00 | projectile block (Wind Wall) |
| 41 | Vex | +0.58 | 0.58 | 0.00 |  |
| 42 | Ahri | +0.57 | 0.57 | 0.00 |  |
| 43 | Garen | +0.57 | 0.57 | 0.00 |  |
| 44 | Veigar | +0.57 | 0.57 | 0.00 |  |
| 45 | Singed | +0.49 | 0.49 | 0.00 | grounding (Mega Adhesive) |
| 46 | Kindred | +0.47 | 0.47 | 0.00 |  |
| 47 | Aphelios | +0.46 | 0.46 | 0.00 |  |
| 48 | Xin Zhao | +0.45 | 0.45 | 0.00 |  |
| 49 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 50 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 51 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 52 | Malzahar | +0.42 | 1.22 | 0.80 |  |
| 53 | Sona | +0.41 | 0.41 | 0.00 |  |
| 54 | Nilah | +0.40 | 0.40 | 0.00 |  |
| 55 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 56 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 57 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 58 | Draven | +0.36 | 0.36 | 0.00 |  |
| 59 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 60 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 61 | Gnar | +0.33 | 0.33 | 0.00 |  |
| 62 | Corki | +0.32 | 0.32 | 0.00 |  |
| 63 | Elise | +0.32 | 0.32 | 0.00 |  |
| 64 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 65 | Senna | +0.32 | 0.32 | 0.00 |  |
| 66 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 67 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 68 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 69 | Jax | +0.31 | 0.31 | 0.00 |  |
| 70 | Jayce | +0.30 | 0.30 | 0.00 |  |
| 71 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 72 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 73 | Lux | +0.29 | 0.29 | 0.00 |  |
| 74 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 75 | Seraphine | +0.29 | 0.29 | 0.00 |  |
| 76 | Heimerdinger | +0.28 | 0.28 | 0.00 |  |
| 77 | Azir | +0.27 | 0.27 | 0.00 |  |
| 78 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 79 | Orianna | +0.27 | 0.27 | 0.00 |  |
| 80 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 81 | Ziggs | +0.27 | 0.27 | 0.00 |  |
| 82 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 83 | Graves | +0.24 | 0.24 | 0.00 |  |
| 84 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 85 | Poppy | +0.23 | 0.63 | 0.40 | dash stop (Steadfast Presence) |
| 86 | Amumu | +0.22 | 0.22 | 0.00 |  |
| 87 | Annie | +0.22 | 0.22 | 0.00 |  |
| 88 | Brand | +0.22 | 0.22 | 0.00 |  |
| 89 | Karma | +0.22 | 0.22 | 0.00 |  |
| 90 | LeBlanc | +0.22 | 0.22 | 0.00 |  |
| 91 | Nami | +0.22 | 0.22 | 0.00 |  |
| 92 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 93 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 94 | Yone | +0.22 | 0.22 | 0.00 |  |
| 95 | Swain | +0.21 | 0.21 | 0.00 |  |
| 96 | Malphite | +0.19 | 0.19 | 0.00 |  |
| 97 | Thresh | +0.19 | 0.19 | 0.00 |  |
| 98 | Urgot | +0.15 | 0.15 | 0.00 |  |
| 99 | Rakan | +0.13 | 0.13 | 0.00 |  |
| 100 | Lillia | +0.11 | 0.11 | 0.00 |  |
| 101 | Varus | +0.10 | 0.27 | 0.17 |  |
| 102 | Skarner | +0.10 | 0.10 | 0.00 |  |
| 103 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 104 | Aurelion Sol | +0.06 | 0.22 | 0.16 |  |
| 105 | Kayn | +0.05 | 0.95 | 0.90 |  |
| 106 | Irelia | +0.05 | 0.05 | 0.00 |  |
| 107 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 108 | Akali | 0.00 | 0.00 | 0.00 |  |
| 109 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 110 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 111 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 112 | Briar | 0.00 | 0.00 | 0.00 |  |
| 113 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 114 | Darius | 0.00 | 0.00 | 0.00 |  |
| 115 | Diana | 0.00 | 0.00 | 0.00 |  |
| 116 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 117 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 118 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 119 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 120 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 121 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 122 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 123 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 124 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 125 | Locke | 0.00 | 0.00 | 0.00 |  |
| 126 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 127 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 128 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 129 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 130 | Rell | 0.00 | 0.00 | 0.00 |  |
| 131 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 132 | Riven | 0.00 | 0.00 | 0.00 |  |
| 133 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 134 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 135 | Sett | 0.00 | 0.00 | 0.00 |  |
| 136 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 137 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 138 | Talon | 0.00 | 0.00 | 0.00 |  |
| 139 | Taric | 0.00 | 0.00 | 0.00 |  |
| 140 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 141 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 142 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 143 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 144 | Quinn | -0.01 | 0.38 | 0.39 |  |
| 145 | Ivern | -0.04 | 0.19 | 0.23 |  |
| 146 | Caitlyn | -0.20 | 0.36 | 0.56 |  |
| 147 | Lucian | -0.20 | 0.36 | 0.56 |  |
| 148 | Akshan | -0.22 | 0.34 | 0.56 |  |
| 149 | Rammus | -0.22 | 0.29 | 0.51 |  |
| 150 | Miss Fortune | -0.24 | 0.32 | 0.56 |  |
| 151 | Warwick | -0.25 | 1.04 | 1.29 |  |
| 152 | Pyke | -0.26 | 0.00 | 0.26 |  |
| 153 | Twisted Fate | -0.27 | 0.43 | 0.70 |  |
| 154 | Viego | -0.28 | 0.09 | 0.37 |  |
| 155 | Jhin | -0.29 | 0.27 | 0.56 |  |
| 156 | Vel'Koz | -0.29 | 0.27 | 0.56 |  |
| 157 | Zac | -0.32 | 0.43 | 0.75 | dash stop (Stretching Strikes) |
| 158 | Gragas | -0.33 | 0.00 | 0.33 |  |
| 159 | Xerath | -0.37 | 0.27 | 0.64 |  |
| 160 | Karthus | -0.37 | 0.19 | 0.56 |  |
| 161 | Pantheon | -0.38 | 0.60 | 0.98 |  |
| 162 | Janna | -0.44 | 0.36 | 0.80 |  |
| 163 | Ryze | -0.46 | 0.24 | 0.70 |  |
| 164 | Katarina | -0.51 | 0.00 | 0.51 |  |
| 165 | Shen | -0.61 | 0.29 | 0.90 |  |
| 166 | Nunu & Willump | -0.62 | 0.25 | 0.87 |  |
| 167 | Fiddlesticks | -0.67 | 0.20 | 0.87 |  |
| 168 | Taliyah | -0.69 | 0.27 | 0.96 |  |
| 169 | Vi | -0.73 | 0.00 | 0.73 |  |
| 170 | Tahm Kench | -0.79 | 0.00 | 0.79 |  |
| 171 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 172 | Galio | -1.13 | 0.00 | 1.13 |  |
