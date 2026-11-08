# Counters to Wukong (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Wukong: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Wukong wins every time) to +1 (the champion does). Run `npm run duel -- <champion> MonkeyKing --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Darius | +0.88 | +1.00 | +1.00 | +1.00 | +0.44 | – | +0.50 |
| 2 | Jax | +0.87 | +1.00 | +1.00 | +1.00 | +0.40 | – | +0.50 |
| 3 | Kog'Maw | +0.87 | +1.00 | +1.00 | +1.00 | +0.46 | +1.00 | +0.00 |
| 4 | Warwick | +0.86 | +1.00 | +1.00 | +1.00 | +0.18 | – | +1.00 |
| 5 | Aphelios | +0.85 | +1.00 | +1.00 | +1.00 | +0.35 | +1.00 | +0.00 |
| 6 | Teemo | +0.85 | +1.00 | +1.00 | +1.00 | +0.32 | +1.00 | +0.00 |
| 7 | K'Sante | +0.85 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.50 |
| 8 | Trundle | +0.85 | +1.00 | +1.00 | +1.00 | +0.07 | – | +1.00 |
| 9 | Yasuo | +0.84 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.99 |
| 10 | Quinn | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 11 | Lulu | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 12 | Vayne | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 13 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.34 | – | +0.00 |
| 14 | Sivir | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 15 | Twisted Fate | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 16 | Cassiopeia | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 17 | Shyvana | +0.82 | +1.00 | +1.00 | +1.00 | −0.05 | – | +1.00 |
| 18 | Karma | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 19 | Garen | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 20 | Tryndamere | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 21 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 22 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 23 | Kalista | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 24 | Cho'Gath | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 25 | Gangplank | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 26 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 27 | Ivern | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 28 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 29 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 30 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 31 | Braum | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 32 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 33 | Olaf | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 34 | Tahm Kench | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 35 | Udyr | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 36 | Dr. Mundo | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 37 | Zac | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 38 | Ezreal | +0.69 | +0.96 | +0.89 | +0.72 | +0.09 | +0.66 | +0.00 |
| 39 | Kayle | +0.66 | +1.00 | +1.00 | +0.00 | +0.43 | +1.00 | +0.00 |
| 40 | Xayah | +0.65 | +1.00 | +1.00 | +0.00 | +0.37 | +1.00 | +0.00 |
| 41 | Orianna | +0.64 | +1.00 | +1.00 | +0.00 | +0.25 | +1.00 | +0.00 |
| 42 | Aatrox | +0.61 | +0.22 | +1.00 | +1.00 | +0.30 | – | +0.00 |
| 43 | Mordekaiser | +0.58 | +0.65 | +0.80 | +0.80 | +0.01 | – | +0.00 |
| 44 | Maokai | +0.57 | +1.00 | +1.00 | +0.00 | +0.07 | – | +0.00 |
| 45 | Singed | +0.53 | +1.00 | +1.00 | +0.00 | −0.16 | – | +0.00 |
| 46 | Corki | +0.46 | +1.00 | +1.00 | −1.00 | +0.39 | +1.00 | +0.00 |
| 47 | Aurora | +0.44 | +1.00 | +1.00 | −1.00 | +0.26 | +1.00 | +0.00 |
| 48 | Annie | +0.38 | +1.00 | +0.00 | +0.00 | +0.21 | +1.00 | +0.00 |
| 49 | Alistar | +0.36 | +1.00 | +1.00 | −1.00 | +0.14 | – | +0.00 |
| 50 | Neeko | +0.32 | −1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 51 | Heimerdinger | +0.30 | −1.00 | +1.00 | +1.00 | +0.29 | +0.59 | +0.00 |
| 52 | Fiora | +0.28 | −1.00 | +1.00 | +1.00 | +0.01 | – | +1.00 |
| 53 | Gnar | +0.12 | +1.00 | −1.00 | −0.06 | +0.36 | +0.82 | +0.00 |
| 54 | Anivia | +0.11 | +0.21 | +0.07 | +0.19 | −0.08 | +0.20 | +0.00 |
| 55 | Morgana | +0.09 | −1.00 | +1.00 | +0.96 | −0.04 | −1.00 | +0.00 |
| 56 | Hwei | +0.08 | +0.90 | −1.00 | +1.00 | +0.02 | −1.00 | +0.00 |
| 57 | Milio | +0.06 | −1.00 | +0.90 | +0.90 | +0.06 | −1.00 | +0.00 |
| 58 | Bard | +0.03 | +1.00 | −1.00 | +0.00 | +0.23 | +0.00 | +0.00 |
| 59 | Sion | +0.03 | +0.00 | +0.00 | +0.00 | +0.17 | – | +0.00 |
| 60 | Rumble | +0.01 | +1.00 | −1.00 | +0.00 | +0.05 | – | +0.00 |
| 61 | Jinx | +0.01 | +0.96 | −1.00 | −0.34 | +0.14 | +0.62 | +0.00 |
| 62 | Malzahar | −0.03 | +1.00 | +0.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 63 | Janna | −0.07 | +1.00 | −1.00 | −1.00 | +0.26 | +0.93 | +0.00 |
| 64 | Zilean | −0.07 | +1.00 | −1.00 | −1.00 | +0.20 | +1.00 | +0.00 |
| 65 | Varus | −0.10 | −1.00 | +1.00 | +0.00 | +0.01 | −1.00 | +0.00 |
| 66 | Brand | −0.11 | +0.95 | −1.00 | −1.00 | +0.11 | +0.89 | +0.00 |
| 67 | Zeri | −0.12 | +1.00 | −1.00 | −1.00 | −0.14 | +1.00 | +0.00 |
| 68 | Zaahen | −0.15 | +1.00 | −1.00 | −1.00 | +0.31 | – | +0.37 |
| 69 | Ryze | −0.16 | +0.64 | −1.00 | −1.00 | +0.24 | +0.99 | +0.00 |
| 70 | Kennen | −0.17 | −0.96 | −1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 71 | Diana | −0.20 | −1.00 | +1.00 | −1.00 | +0.16 | – | +0.00 |
| 72 | Azir | −0.21 | −0.50 | +0.00 | −1.00 | +0.10 | +1.00 | +0.00 |
| 73 | Vex | −0.23 | +0.41 | −1.00 | +0.00 | +0.14 | −1.00 | +0.00 |
| 74 | Miss Fortune | −0.25 | +1.00 | −1.00 | −1.00 | +0.31 | −1.00 | +0.00 |
| 75 | Vel'Koz | −0.28 | +0.59 | −1.00 | −1.00 | +0.16 | −0.01 | +0.00 |
| 76 | Jhin | −0.30 | +1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 77 | Elise | −0.30 | +1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 78 | Graves | −0.34 | +1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −1.00 |
| 79 | Syndra | −0.39 | −1.00 | −1.00 | +1.00 | +0.09 | −1.00 | +0.00 |
| 80 | Lissandra | −0.40 | −0.26 | −1.00 | −1.00 | +0.11 | +1.00 | +0.00 |
| 81 | Volibear | −0.45 | −0.49 | −0.49 | −0.79 | −0.08 | – | +0.18 |
| 82 | Lux | −0.47 | −1.00 | −0.10 | −1.00 | +0.04 | −0.04 | +0.00 |
| 83 | Lillia | −0.51 | +0.04 | −1.00 | −1.00 | +0.22 | −1.00 | +0.00 |
| 84 | Amumu | −0.51 | +0.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 85 | Xin Zhao | −0.51 | −1.00 | −1.00 | +0.00 | +0.16 | – | +0.32 |
| 86 | Master Yi | −0.52 | −1.00 | −1.00 | −1.00 | +0.23 | +1.00 | +1.00 |
| 87 | Shen | −0.54 | −1.00 | −1.00 | +0.00 | +0.11 | – | +0.00 |
| 88 | Ashe | −0.55 | −1.00 | −1.00 | +0.00 | +0.36 | −1.00 | +0.00 |
| 89 | Yunara | −0.55 | −1.00 | −1.00 | −1.00 | +0.33 | +1.00 | +0.00 |
| 90 | Lucian | −0.57 | −1.00 | −1.00 | −1.00 | +0.21 | +1.00 | +0.00 |
| 91 | Rell | −0.57 | −1.00 | −1.00 | −1.00 | +0.21 | +1.00 | +0.00 |
| 92 | Tristana | −0.57 | −1.00 | −1.00 | −1.00 | +0.20 | +1.00 | +0.00 |
| 93 | Bel'Veth | −0.59 | −1.00 | −0.54 | −1.00 | +0.38 | – | +0.00 |
| 94 | Samira | −0.67 | −0.58 | −1.00 | −1.00 | +0.20 | −1.00 | +0.00 |
| 95 | Ambessa | −0.67 | −1.00 | −1.00 | −1.00 | +0.30 | – | +1.00 |
| 96 | Kayn | −0.68 | −1.00 | −1.00 | −0.35 | −0.28 | – | +0.00 |
| 97 | Riven | −0.70 | −1.00 | −1.00 | −1.00 | +0.15 | – | +1.00 |
| 98 | Nilah | −0.70 | −1.00 | −1.00 | −1.00 | +0.47 | – | +0.00 |
| 99 | Gwen | −0.73 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.50 |
| 100 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.29 | – | +0.00 |
| 101 | Yone | −0.73 | −1.00 | −1.00 | −1.00 | +0.28 | – | +0.00 |
| 102 | Ornn | −0.73 | −1.00 | −1.00 | −1.00 | +0.26 | – | +0.00 |
| 103 | Smolder | −0.74 | −1.00 | −1.00 | −1.00 | +0.39 | −1.00 | +0.00 |
| 104 | Jayce | −0.74 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.00 |
| 105 | Camille | −0.74 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.50 |
| 106 | Urgot | −0.75 | −1.00 | −1.00 | −1.00 | +0.35 | −1.00 | +0.00 |
| 107 | Skarner | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 108 | Sylas | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 109 | Jarvan IV | −0.75 | −1.00 | −1.00 | −1.00 | +0.16 | – | +0.00 |
| 110 | Hecarim | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 111 | Pantheon | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 112 | Lee Sin | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 113 | Gragas | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 114 | Rakan | −0.76 | −1.00 | −1.00 | −1.00 | +0.28 | −1.00 | +0.00 |
| 115 | Sejuani | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 116 | Sett | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 117 | Shaco | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 118 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 119 | Irelia | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 120 | Akshan | −0.77 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | +0.00 |
| 121 | Fizz | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 122 | Seraphine | −0.77 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | +0.00 |
| 123 | Swain | −0.77 | −0.92 | −1.00 | −1.00 | +0.03 | −0.92 | +0.00 |
| 124 | Ziggs | −0.77 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | +0.00 |
| 125 | Leona | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 126 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 127 | Kai'Sa | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.00 |
| 128 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 129 | Sona | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 130 | Talon | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 131 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 132 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 133 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 134 | Locke | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 135 | Yuumi | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 136 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 137 | Zoe | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 138 | Kindred | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 139 | Viego | −0.78 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.50 |
| 140 | Nocturne | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 141 | Aurelion Sol | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 142 | Karthus | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 143 | Rek'Sai | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 144 | Ekko | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 145 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 146 | LeBlanc | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 147 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 148 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 149 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 150 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 151 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 152 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 153 | Zyra | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 154 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 155 | Mel | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 156 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 157 | Kassadin | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 158 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 159 | Vi | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 160 | Nami | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 161 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 162 | Ahri | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 163 | Nidalee | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 164 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 165 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 166 | Draven | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 167 | Pyke | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 168 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.00 |
| 169 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 170 | Renata Glasc | −0.85 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −1.00 |
| 171 | Thresh | −0.85 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | −0.50 |
| 172 | Briar | −0.85 | −1.00 | −1.00 | −1.00 | −0.45 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Wukong's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Wukong's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> MonkeyKing` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Bard (net +1.24)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Wukong's Cyclone. Untargetable for 2.5 s, long enough to use ahead of Cyclone. (Bard R Tempered Fate → Wukong R Cyclone)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Wukong's Nimbus Strike. Untargetable for 2.5 s, long enough to use ahead of Nimbus Strike. (Bard R Tempered Fate → Wukong E Nimbus Strike)
- **0.21** range: Bard's basic attacks reach 325 units farther than Wukong's (500 vs 175 attack range). Wukong closes the gap with Nimbus Strike, Warrior Trickster. (Bard basic attacks → Wukong basic attacks)

#### 2. Lissandra (net +1.21)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Wukong's Cyclone. Untargetable for 2.5 s, long enough to use ahead of Cyclone. (Lissandra R Frozen Tomb → Wukong R Cyclone)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Wukong's Nimbus Strike. Untargetable for 2.5 s, long enough to use ahead of Nimbus Strike. (Lissandra R Frozen Tomb → Wukong E Nimbus Strike)
- **0.21** dash stop: Frozen Tomb's knockdown can stop Wukong's Warrior Trickster mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Wukong W Warrior Trickster)

#### 3. Xayah (net +1.20)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Wukong's Cyclone. Untargetable for 1.5 s, long enough to use ahead of Cyclone. (Xayah R Featherstorm → Wukong R Cyclone)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Wukong's Nimbus Strike. Untargetable for 1.5 s, long enough to use ahead of Nimbus Strike. (Xayah R Featherstorm → Wukong E Nimbus Strike)
- **0.22** range: Xayah's basic attacks reach 350 units farther than Wukong's (525 vs 175 attack range). Wukong closes the gap with Nimbus Strike, Warrior Trickster. (Xayah basic attacks → Wukong basic attacks)

#### 4. Vladimir (net +1.19)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Wukong's Cyclone. Untargetable for 2 s, long enough to use ahead of Cyclone. (Vladimir W Sanguine Pool → Wukong R Cyclone)
- **0.53** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Wukong's Nimbus Strike. Untargetable for 2 s, long enough to use ahead of Nimbus Strike. (Vladimir W Sanguine Pool → Wukong E Nimbus Strike)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Wukong's Crushing Blow. Untargetable for 2 s, long enough to use ahead of Crushing Blow. (Vladimir W Sanguine Pool → Wukong Q Crushing Blow)
- Watch out: Cyclone's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 5. Hwei (net +1.11)

- **0.40** dash stop: Grim Visage's knockdown can stop Wukong's Warrior Trickster mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Wukong W Warrior Trickster)
- **0.33** dash stop: Grim Visage's knockdown can stop Wukong's Nimbus Strike mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Wukong E Nimbus Strike)
- **0.20** reveal: Gaze of the Abyss reveals Wukong through Warrior Trickster's stealth. (Hwei W Gaze of the Abyss → Wukong W Warrior Trickster)

#### 6. Morgana (net +1.11)

- **0.80** cc immunity: Black Shield makes Morgana immune to Wukong's Cyclone (airborne). Immune for 5 s, long enough to use ahead of Cyclone. (Morgana E Black Shield → Wukong R Cyclone)
- **0.20** reveal: Soul Shackles reveals Wukong through Warrior Trickster's stealth. (Morgana R Soul Shackles → Wukong W Warrior Trickster)
- **0.11** range: Morgana's basic attacks reach 275 units farther than Wukong's (450 vs 175 attack range). Wukong closes the gap with Nimbus Strike, Warrior Trickster. (Morgana basic attacks → Wukong basic attacks)

#### 7. Rek'Sai (net +1.07)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Wukong's Cyclone. Untargetable for 1.5 s, long enough to use ahead of Cyclone. (Rek'Sai R Void Rush → Wukong R Cyclone)
- **0.36** untargetable: Void Rush makes Rek'Sai untargetable, dodging Wukong's Nimbus Strike. Untargetable for 1.5 s, long enough to use ahead of Nimbus Strike. (Rek'Sai R Void Rush → Wukong E Nimbus Strike)
- **0.20** reveal: Void Rush reveals Wukong through Warrior Trickster's stealth. (Rek'Sai R Void Rush → Wukong W Warrior Trickster)

#### 8. Sivir (net +1.05)

- **0.51** spell shield: Spell Shield's spell shield blocks Wukong's Nimbus Strike. Spell shield for 1.5 s, long enough to use ahead of Nimbus Strike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Wukong E Nimbus Strike)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Wukong's Cyclone. Spell shield for 1.5 s, long enough to use ahead of Cyclone. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block one instance of damage.
  - Blocking the knock up will still grant immunity to it from either of Cyclone's casts. (Sivir E Spell Shield → Wukong R Cyclone)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Wukong's (500 vs 175 attack range). Wukong closes the gap with Nimbus Strike, Warrior Trickster. (Sivir basic attacks → Wukong basic attacks)

#### 9. Nocturne (net +1.04)

- **0.60** spell shield: Shroud of Darkness's spell shield blocks Wukong's Nimbus Strike. Spell shield for 1.5 s, long enough to use ahead of Nimbus Strike. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Wukong E Nimbus Strike)
- **0.40** spell shield: Shroud of Darkness's spell shield blocks part of Wukong's Cyclone. Spell shield for 1.5 s, long enough to use ahead of Cyclone. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block one instance of damage.
  - Blocking the knock up will still grant immunity to it from either of Cyclone's casts. (Nocturne W Shroud of Darkness → Wukong R Cyclone)
- **0.32** spell shield: Shroud of Darkness's spell shield blocks Wukong's Crushing Blow. Spell shield for 1.5 s, long enough to use ahead of Crushing Blow. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Wukong Q Crushing Blow)

#### 10. Rengar (net +1.04)

- **0.64** cleanse: Battle Roar cleanses Wukong's Cyclone (airborne) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Wukong R Cyclone)
- **0.20** reveal: Bola Strike reveals Wukong through Warrior Trickster's stealth. (Rengar E Bola Strike → Wukong W Warrior Trickster)
- **0.20** reveal: Thrill of the Hunt reveals Wukong through Warrior Trickster's stealth. (Rengar R Thrill of the Hunt → Wukong W Warrior Trickster)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Bard | +1.24 | 1.24 | 0.00 |  |
| 2 | Lissandra | +1.21 | 1.21 | 0.00 |  |
| 3 | Xayah | +1.20 | 1.20 | 0.00 |  |
| 4 | Vladimir | +1.19 | 1.24 | 0.05 |  |
| 5 | Hwei | +1.11 | 1.11 | 0.00 | dash stop (Grim Visage) |
| 6 | Morgana | +1.11 | 1.11 | 0.00 |  |
| 7 | Rek'Sai | +1.07 | 1.07 | 0.00 |  |
| 8 | Sivir | +1.05 | 1.05 | 0.00 |  |
| 9 | Nocturne | +1.04 | 1.04 | 0.00 |  |
| 10 | Rengar | +1.04 | 1.04 | 0.00 |  |
| 11 | Teemo | +1.00 | 1.00 | 0.00 | blind (Blinding Dart) |
| 12 | Vex | +0.99 | 0.99 | 0.00 | dash stop (Doom 'n Gloom) |
| 13 | Kled | +0.98 | 0.98 | 0.00 |  |
| 14 | Fizz | +0.96 | 0.96 | 0.00 |  |
| 15 | Lulu | +0.89 | 0.89 | 0.00 | disarm (Whimsy) |
| 16 | Kayle | +0.87 | 0.87 | 0.00 |  |
| 17 | Fiora | +0.80 | 0.80 | 0.00 |  |
| 18 | Olaf | +0.80 | 0.80 | 0.00 |  |
| 19 | Udyr | +0.80 | 0.80 | 0.00 |  |
| 20 | Aurora | +0.79 | 0.79 | 0.00 |  |
| 21 | Singed | +0.76 | 0.76 | 0.00 |  |
| 22 | Jinx | +0.74 | 0.74 | 0.00 | dash stop (Flame Chompers!) |
| 23 | Viktor | +0.74 | 0.74 | 0.00 | dash stop (Gravity Field) |
| 24 | Kalista | +0.73 | 0.73 | 0.00 |  |
| 25 | Maokai | +0.73 | 0.73 | 0.00 |  |
| 26 | Sion | +0.72 | 0.80 | 0.08 |  |
| 27 | Cassiopeia | +0.71 | 0.71 | 0.00 |  |
| 28 | Jax | +0.71 | 0.71 | 0.00 | attack dodge (Counter Strike) |
| 29 | Ahri | +0.69 | 0.69 | 0.00 | dash stop (Charm) |
| 30 | Veigar | +0.69 | 0.69 | 0.00 | dash stop (Event Horizon) |
| 31 | Gwen | +0.67 | 0.67 | 0.00 |  |
| 32 | Alistar | +0.64 | 0.64 | 0.00 |  |
| 33 | Camille | +0.64 | 0.64 | 0.00 |  |
| 34 | Gangplank | +0.64 | 0.64 | 0.00 |  |
| 35 | Evelynn | +0.62 | 0.62 | 0.00 |  |
| 36 | Shaco | +0.62 | 0.62 | 0.00 |  |
| 37 | Xin Zhao | +0.61 | 0.61 | 0.00 |  |
| 38 | Yuumi | +0.59 | 0.97 | 0.38 |  |
| 39 | Nilah | +0.59 | 0.59 | 0.00 | attack dodge (Jubilant Veil) |
| 40 | Zed | +0.59 | 0.59 | 0.00 |  |
| 41 | Master Yi | +0.56 | 0.67 | 0.11 |  |
| 42 | Karma | +0.53 | 0.53 | 0.00 |  |
| 43 | Malzahar | +0.51 | 0.88 | 0.37 |  |
| 44 | Nasus | +0.50 | 0.50 | 0.00 | attack speed slow (Wither) |
| 45 | Malphite | +0.49 | 0.49 | 0.00 |  |
| 46 | Poppy | +0.48 | 0.68 | 0.20 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 47 | Zaahen | +0.48 | 0.48 | 0.00 |  |
| 48 | Yone | +0.46 | 0.46 | 0.00 |  |
| 49 | Renata Glasc | +0.44 | 0.44 | 0.00 |  |
| 50 | Kai'Sa | +0.42 | 0.42 | 0.00 |  |
| 51 | Zac | +0.41 | 0.64 | 0.23 | dash stop (Stretching Strikes) |
| 52 | Elise | +0.40 | 0.40 | 0.00 |  |
| 53 | Lee Sin | +0.40 | 0.40 | 0.00 |  |
| 54 | Skarner | +0.40 | 0.40 | 0.00 |  |
| 55 | Nidalee | +0.38 | 0.38 | 0.00 |  |
| 56 | Caitlyn | +0.36 | 0.64 | 0.28 |  |
| 57 | Illaoi | +0.36 | 0.36 | 0.00 |  |
| 58 | Zyra | +0.36 | 0.36 | 0.00 |  |
| 59 | Rammus | +0.35 | 0.50 | 0.15 | attack reflect (Defensive Ball Curl) |
| 60 | LeBlanc | +0.33 | 0.33 | 0.00 |  |
| 61 | K'Sante | +0.32 | 0.32 | 0.00 |  |
| 62 | Thresh | +0.31 | 0.31 | 0.00 |  |
| 63 | Warwick | +0.30 | 0.82 | 0.52 |  |
| 64 | Pantheon | +0.30 | 0.78 | 0.48 |  |
| 65 | Amumu | +0.29 | 0.29 | 0.00 |  |
| 66 | Sett | +0.28 | 0.28 | 0.00 |  |
| 67 | Urgot | +0.28 | 0.28 | 0.00 |  |
| 68 | Zeri | +0.28 | 0.28 | 0.00 |  |
| 69 | Kindred | +0.27 | 0.27 | 0.00 |  |
| 70 | Twitch | +0.27 | 0.27 | 0.00 |  |
| 71 | Vayne | +0.27 | 0.27 | 0.00 |  |
| 72 | Mordekaiser | +0.26 | 0.26 | 0.00 |  |
| 73 | Sona | +0.26 | 0.26 | 0.00 |  |
| 74 | Varus | +0.25 | 0.30 | 0.05 |  |
| 75 | Kayn | +0.24 | 0.66 | 0.42 |  |
| 76 | Aphelios | +0.24 | 0.24 | 0.00 |  |
| 77 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 78 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 79 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 80 | Shen | +0.23 | 0.68 | 0.45 | attack block (Spirit's Refuge) |
| 81 | Draven | +0.22 | 0.22 | 0.00 |  |
| 82 | Milio | +0.22 | 0.22 | 0.00 |  |
| 83 | Senna | +0.22 | 0.22 | 0.00 |  |
| 84 | Aatrox | +0.20 | 0.20 | 0.00 |  |
| 85 | Akali | +0.20 | 0.20 | 0.00 |  |
| 86 | Ambessa | +0.20 | 0.20 | 0.00 |  |
| 87 | Briar | +0.20 | 0.20 | 0.00 |  |
| 88 | Corki | +0.20 | 0.20 | 0.00 |  |
| 89 | Ezreal | +0.20 | 0.20 | 0.00 |  |
| 90 | Garen | +0.20 | 0.20 | 0.00 |  |
| 91 | Smolder | +0.20 | 0.20 | 0.00 |  |
| 92 | Sylas | +0.20 | 0.20 | 0.00 |  |
| 93 | Yasuo | +0.20 | 0.20 | 0.00 |  |
| 94 | Zilean | +0.20 | 0.20 | 0.00 |  |
| 95 | Zoe | +0.20 | 0.20 | 0.00 |  |
| 96 | Gnar | +0.19 | 0.19 | 0.00 |  |
| 97 | Jayce | +0.18 | 0.18 | 0.00 |  |
| 98 | Kennen | +0.18 | 0.18 | 0.00 |  |
| 99 | Lux | +0.18 | 0.18 | 0.00 |  |
| 100 | Samira | +0.18 | 0.18 | 0.00 |  |
| 101 | Hecarim | +0.17 | 0.17 | 0.00 |  |
| 102 | Mel | +0.17 | 0.17 | 0.00 |  |
| 103 | Seraphine | +0.17 | 0.17 | 0.00 |  |
| 104 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 105 | Ziggs | +0.17 | 0.17 | 0.00 |  |
| 106 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 107 | Azir | +0.16 | 0.16 | 0.00 |  |
| 108 | Jarvan IV | +0.16 | 0.16 | 0.00 |  |
| 109 | Kog'Maw | +0.16 | 0.16 | 0.00 |  |
| 110 | Orianna | +0.16 | 0.16 | 0.00 |  |
| 111 | Ornn | +0.16 | 0.16 | 0.00 |  |
| 112 | Shyvana | +0.16 | 0.16 | 0.00 |  |
| 113 | Volibear | +0.16 | 0.16 | 0.00 |  |
| 114 | Akshan | +0.15 | 0.39 | 0.24 |  |
| 115 | Annie | +0.15 | 0.15 | 0.00 |  |
| 116 | Brand | +0.14 | 0.14 | 0.00 |  |
| 117 | Graves | +0.14 | 0.14 | 0.00 |  |
| 118 | Nami | +0.14 | 0.14 | 0.00 |  |
| 119 | Neeko | +0.14 | 0.14 | 0.00 |  |
| 120 | Syndra | +0.14 | 0.14 | 0.00 |  |
| 121 | Fiddlesticks | +0.13 | 0.51 | 0.38 |  |
| 122 | Heimerdinger | +0.12 | 0.12 | 0.00 |  |
| 123 | Swain | +0.12 | 0.12 | 0.00 |  |
| 124 | Twisted Fate | +0.10 | 0.45 | 0.35 |  |
| 125 | Quinn | +0.08 | 0.22 | 0.14 |  |
| 126 | Aurelion Sol | +0.08 | 0.14 | 0.06 |  |
| 127 | Vi | +0.06 | 0.28 | 0.22 |  |
| 128 | Rakan | +0.06 | 0.06 | 0.00 |  |
| 129 | Viego | +0.05 | 0.16 | 0.11 |  |
| 130 | Lillia | +0.05 | 0.05 | 0.00 |  |
| 131 | Ivern | +0.04 | 0.11 | 0.07 |  |
| 132 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 133 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 134 | Braum | 0.00 | 0.00 | 0.00 |  |
| 135 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 136 | Darius | 0.00 | 0.00 | 0.00 |  |
| 137 | Diana | 0.00 | 0.00 | 0.00 |  |
| 138 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 139 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 140 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 141 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 142 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 143 | Leona | 0.00 | 0.00 | 0.00 |  |
| 144 | Locke | 0.00 | 0.00 | 0.00 |  |
| 145 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 146 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 147 | Rell | 0.00 | 0.00 | 0.00 |  |
| 148 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 149 | Riven | 0.00 | 0.00 | 0.00 |  |
| 150 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 151 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 152 | Talon | 0.00 | 0.00 | 0.00 |  |
| 153 | Taric | 0.00 | 0.00 | 0.00 |  |
| 154 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 155 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 156 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 157 | Lucian | -0.07 | 0.21 | 0.28 |  |
| 158 | Katarina | -0.07 | 0.12 | 0.19 |  |
| 159 | Miss Fortune | -0.08 | 0.20 | 0.28 |  |
| 160 | Pyke | -0.08 | 0.00 | 0.08 |  |
| 161 | Vel'Koz | -0.10 | 0.16 | 0.26 |  |
| 162 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 163 | Jhin | -0.11 | 0.17 | 0.28 |  |
| 164 | Xerath | -0.15 | 0.16 | 0.31 |  |
| 165 | Karthus | -0.17 | 0.11 | 0.28 |  |
| 166 | Janna | -0.18 | 0.22 | 0.40 |  |
| 167 | Ryze | -0.20 | 0.15 | 0.35 |  |
| 168 | Naafiri | -0.22 | 0.20 | 0.42 |  |
| 169 | Tahm Kench | -0.26 | 0.00 | 0.26 |  |
| 170 | Taliyah | -0.32 | 0.16 | 0.48 |  |
| 171 | Nunu & Willump | -0.37 | 0.00 | 0.37 |  |
| 172 | Galio | -0.55 | 0.00 | 0.55 |  |
