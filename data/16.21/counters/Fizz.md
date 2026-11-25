# Counters to Fizz (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Fizz: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Fizz wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Fizz --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Nilah | +0.85 | +1.00 | +1.00 | +1.00 | +0.38 | – | +0.22 |
| 2 | Vayne | +0.84 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.60 |
| 3 | Kog'Maw | +0.84 | +1.00 | +1.00 | +1.00 | +0.30 | +1.00 | −0.07 |
| 4 | Udyr | +0.83 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.92 |
| 5 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.41 |
| 6 | Shyvana | +0.83 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.27 |
| 7 | Ambessa | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.23 |
| 8 | Yasuo | +0.83 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.56 |
| 9 | Gnar | +0.82 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | −0.22 |
| 10 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.34 |
| 11 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.69 |
| 12 | Urgot | +0.82 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | −0.28 |
| 13 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.69 |
| 14 | Gwen | +0.82 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.60 |
| 15 | Riven | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.30 |
| 16 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.53 |
| 17 | Tahm Kench | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.06 |
| 18 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.39 |
| 19 | Corki | +0.81 | +1.00 | +1.00 | +1.00 | +0.24 | +0.99 | −0.52 |
| 20 | Rakan | +0.81 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.30 |
| 21 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.41 |
| 22 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.25 |
| 23 | Mordekaiser | +0.80 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.20 |
| 24 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.24 |
| 25 | Karma | +0.80 | +1.00 | +1.00 | +0.99 | +0.10 | +1.00 | −0.22 |
| 26 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | −0.11 |
| 27 | Camille | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.41 |
| 28 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.25 |
| 29 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | −0.32 |
| 30 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.18 |
| 31 | Kayle | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | −0.30 |
| 32 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.17 |
| 33 | Graves | +0.79 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.58 |
| 34 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.54 |
| 35 | Pantheon | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.28 |
| 36 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.54 |
| 37 | Samira | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.41 |
| 38 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.12 |
| 39 | Diana | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.07 |
| 40 | Viego | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.04 |
| 41 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | +0.09 | – | −0.21 |
| 42 | Fiora | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.52 |
| 43 | Yone | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.11 |
| 44 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.32 |
| 45 | Sett | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.05 |
| 46 | Aatrox | +0.78 | +1.00 | +1.00 | +1.00 | +0.14 | – | −0.42 |
| 47 | Bel'Veth | +0.77 | +1.00 | +1.00 | +1.00 | +0.13 | – | −0.47 |
| 48 | Maokai | +0.77 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.19 |
| 49 | Rek'Sai | +0.77 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.18 |
| 50 | Cho'Gath | +0.77 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.29 |
| 51 | Warwick | +0.77 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.24 |
| 52 | Taric | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.01 |
| 53 | Lee Sin | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | −0.08 |
| 54 | Xin Zhao | +0.77 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.22 |
| 55 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.01 |
| 56 | Zac | +0.76 | +0.99 | +1.00 | +1.00 | +0.01 | – | −0.23 |
| 57 | Braum | +0.76 | +1.00 | +1.00 | +1.00 | −0.07 | – | −0.07 |
| 58 | Wukong | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.06 |
| 59 | Renekton | +0.76 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.20 |
| 60 | Ornn | +0.76 | +1.00 | +0.94 | +0.87 | +0.17 | – | −0.08 |
| 61 | Darius | +0.75 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.23 |
| 62 | Alistar | +0.74 | +1.00 | +1.00 | +1.00 | −0.12 | – | −0.30 |
| 63 | Sion | +0.73 | +0.77 | +1.00 | +1.00 | −0.02 | – | +0.29 |
| 64 | Aurora | +0.63 | +1.00 | +1.00 | +1.00 | +0.14 | −1.00 | +0.17 |
| 65 | Elise | +0.61 | +1.00 | +1.00 | +1.00 | +0.11 | −1.00 | −0.07 |
| 66 | Lulu | +0.60 | +1.00 | +1.00 | +1.00 | +0.00 | −1.00 | +0.00 |
| 67 | Kai'Sa | +0.57 | +1.00 | +1.00 | +1.00 | −0.02 | −1.00 | −0.56 |
| 68 | Kennen | +0.56 | +1.00 | +1.00 | +0.78 | +0.05 | −1.00 | −0.03 |
| 69 | Kalista | +0.55 | +1.00 | +0.00 | +1.00 | +0.12 | +1.00 | −0.25 |
| 70 | Morgana | +0.51 | +0.87 | +0.91 | +0.64 | +0.28 | −1.00 | −0.07 |
| 71 | Sejuani | +0.51 | +1.00 | +0.00 | +1.00 | −0.05 | – | +0.26 |
| 72 | Heimerdinger | +0.50 | −0.11 | +0.98 | +1.00 | +0.08 | +0.87 | −0.23 |
| 73 | Vi | +0.46 | +1.00 | +0.00 | +1.00 | −0.07 | – | −0.45 |
| 74 | Gragas | +0.43 | +1.00 | +0.29 | +0.29 | +0.03 | – | +0.13 |
| 75 | Xayah | +0.41 | +1.00 | +1.00 | −1.00 | +0.18 | +1.00 | −0.38 |
| 76 | Rammus | +0.34 | +1.00 | +1.00 | −1.00 | +0.00 | – | +0.21 |
| 77 | Rengar | +0.30 | −1.00 | +1.00 | +1.00 | +0.39 | – | +0.15 |
| 78 | Brand | +0.29 | +0.81 | +0.91 | −1.00 | +0.10 | +0.68 | −0.42 |
| 79 | Quinn | +0.28 | +1.00 | −1.00 | +1.00 | +0.01 | +1.00 | −0.50 |
| 80 | Yunara | +0.26 | +0.89 | −1.00 | +1.00 | +0.18 | +0.78 | −0.45 |
| 81 | Malphite | +0.24 | −1.00 | +1.00 | +1.00 | +0.07 | – | +0.18 |
| 82 | Galio | +0.20 | +1.00 | +0.50 | −1.00 | +0.05 | – | −0.11 |
| 83 | Rumble | +0.17 | +0.95 | −1.00 | +0.91 | −0.02 | – | −0.23 |
| 84 | Milio | +0.15 | +1.00 | +0.73 | −1.00 | +0.23 | −1.00 | −0.40 |
| 85 | Lillia | +0.13 | −1.00 | +0.65 | +0.55 | +0.03 | +0.99 | +0.09 |
| 86 | Twisted Fate | +0.10 | +1.00 | −1.00 | +1.00 | +0.09 | −1.00 | −0.21 |
| 87 | Anivia | +0.10 | +0.11 | +0.13 | +0.21 | −0.10 | +0.17 | −0.07 |
| 88 | Orianna | +0.10 | −1.00 | +1.00 | +1.00 | −0.01 | −1.00 | −0.04 |
| 89 | Varus | +0.05 | +0.83 | −1.00 | +1.00 | +0.03 | −1.00 | −0.25 |
| 90 | Singed | +0.01 | −0.00 | −0.02 | +0.11 | −0.05 | – | +0.09 |
| 91 | Vel'Koz | −0.03 | +0.94 | +0.08 | −1.00 | +0.13 | −1.00 | −0.00 |
| 92 | Master Yi | −0.14 | −1.00 | −1.00 | +1.00 | +0.10 | +1.00 | +0.95 |
| 93 | Ashe | −0.17 | −1.00 | −1.00 | +1.00 | +0.21 | +0.99 | +0.01 |
| 94 | Kayn | −0.18 | +0.72 | −0.57 | −1.00 | +0.07 | – | −0.24 |
| 95 | Sylas | −0.20 | +0.00 | +0.00 | −1.00 | +0.17 | – | −0.15 |
| 96 | Smolder | −0.21 | +1.00 | −1.00 | −0.50 | +0.07 | −1.00 | −0.35 |
| 97 | Ezreal | −0.31 | +0.49 | −0.76 | −1.00 | +0.05 | −0.10 | −0.73 |
| 98 | Shen | −0.31 | −1.00 | −1.00 | +1.00 | +0.07 | – | +0.16 |
| 99 | Hecarim | −0.33 | −1.00 | −1.00 | +1.00 | +0.06 | – | −0.15 |
| 100 | Shaco | −0.35 | −1.00 | −1.00 | +1.00 | −0.06 | – | −0.20 |
| 101 | Vex | −0.38 | −1.00 | −1.00 | +1.00 | +0.10 | −1.00 | +0.16 |
| 102 | Draven | −0.39 | −1.00 | −1.00 | +1.00 | +0.14 | −1.00 | −0.23 |
| 103 | Tristana | −0.47 | +0.00 | −1.00 | −1.00 | −0.02 | +0.00 | −0.32 |
| 104 | Lissandra | −0.56 | −1.00 | −0.04 | −1.00 | +0.02 | −1.00 | −0.13 |
| 105 | Irelia | −0.61 | −0.45 | −1.00 | −1.00 | +0.11 | – | −0.14 |
| 106 | Nidalee | −0.67 | −1.00 | −0.36 | −1.00 | −0.03 | −1.00 | −0.43 |
| 107 | Zeri | −0.69 | −1.00 | −1.00 | −1.00 | −0.02 | +0.00 | +0.24 |
| 108 | Caitlyn | −0.72 | −0.67 | −1.00 | −1.00 | +0.12 | −1.00 | −0.42 |
| 109 | Hwei | −0.74 | −1.00 | −0.83 | −1.00 | +0.04 | −0.86 | −0.12 |
| 110 | Nunu & Willump | −0.75 | −1.00 | −1.00 | −1.00 | +0.20 | – | −0.02 |
| 111 | Nautilus | −0.75 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.09 |
| 112 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.05 |
| 113 | Jhin | −0.76 | −0.92 | −0.96 | −0.96 | +0.06 | −0.96 | −0.30 |
| 114 | Kha'Zix | −0.77 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.32 |
| 115 | Amumu | −0.77 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.09 |
| 116 | Qiyana | −0.77 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.20 |
| 117 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.04 |
| 118 | Locke | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.04 |
| 119 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.06 |
| 120 | Neeko | −0.78 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.24 |
| 121 | Ekko | −0.78 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.09 |
| 122 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.08 |
| 123 | Miss Fortune | −0.79 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.15 |
| 124 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.18 |
| 125 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.04 |
| 126 | Ziggs | −0.79 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.22 |
| 127 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.07 |
| 128 | Zilean | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.10 |
| 129 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.01 |
| 130 | Jarvan IV | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.05 |
| 131 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.11 |
| 132 | Rell | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.08 |
| 133 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.03 |
| 134 | Malzahar | −0.80 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.28 |
| 135 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.32 |
| 136 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.17 |
| 137 | Mel | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.27 |
| 138 | Ryze | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.20 |
| 139 | Kindred | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.20 |
| 140 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.11 |
| 141 | Lucian | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.14 |
| 142 | Akshan | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.19 |
| 143 | Senna | −0.80 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.36 |
| 144 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.16 |
| 145 | Taliyah | −0.81 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.12 |
| 146 | Annie | −0.81 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.49 |
| 147 | Cassiopeia | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.34 |
| 148 | Veigar | −0.81 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.15 |
| 149 | Lux | −0.81 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.41 |
| 150 | Nami | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.35 |
| 151 | Seraphine | −0.81 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.68 |
| 152 | Aurelion Sol | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.24 |
| 153 | Twitch | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.36 |
| 154 | Viktor | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.32 |
| 155 | Zyra | −0.82 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.31 |
| 156 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | – | −0.23 |
| 157 | Soraka | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.40 |
| 158 | Zoe | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.27 |
| 159 | Evelynn | −0.82 | −1.00 | −1.00 | −1.00 | −0.19 | – | −0.17 |
| 160 | Azir | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.28 |
| 161 | Janna | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.55 |
| 162 | Briar | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.38 |
| 163 | Karthus | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.20 |
| 164 | Swain | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.36 |
| 165 | Syndra | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.28 |
| 166 | Renata Glasc | −0.82 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.88 |
| 167 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | – | −0.36 |
| 168 | Jinx | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.40 |
| 169 | Bard | −0.82 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.55 |
| 170 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.25 |
| 171 | LeBlanc | −0.83 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.39 |
| 172 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.69 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Fizz's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Fizz's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Fizz` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.95)

- **0.48** spell shield: Spell Shield's spell shield blocks Fizz's Urchin Strike. Spell shield for 1.5 s, long enough to use ahead of Urchin Strike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Fizz Q Urchin Strike)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Fizz's Chum the Waters. Spell shield for 1.5 s, long enough to use ahead of Chum the Waters. A spell shield blocks only the first enemy ability that reaches it. Chum the Waters will not attach the lure to an enemy champion if they have a spell shield as well as against an enemy Malzahar with his Void Shift active (mitigation effect is consumed in both cases).
  - The area of effect for the eruption will be at the target's location at the time of the attachment being blocked; the target will intercept the lure without getting attached to it. (Sivir E Spell Shield → Fizz R Chum the Waters)
- **0.28** spell shield: Spell Shield's spell shield blocks Fizz's Seastone Trident. Spell shield for 1.5 s, long enough to use ahead of Seastone Trident. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Fizz W Seastone Trident)

#### 2. Vladimir (net +0.64)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fizz's Chum the Waters. Untargetable for 2 s, long enough to use ahead of Chum the Waters. (Vladimir W Sanguine Pool → Fizz R Chum the Waters)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fizz's Urchin Strike. Untargetable for 2 s, long enough to use ahead of Urchin Strike. (Vladimir W Sanguine Pool → Fizz Q Urchin Strike)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fizz's Seastone Trident. Untargetable for 2 s, long enough to use ahead of Seastone Trident. (Vladimir W Sanguine Pool → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Vladimir's Transfusion.

#### 3. Master Yi (net +0.62)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Fizz's Chum the Waters. Untargetable for ?; Chum the Waters takes 1.25 s to land, enough to react. (Master Yi Q Alpha Strike → Fizz R Chum the Waters)
- **0.29** untargetable: Alpha Strike makes Master Yi untargetable, dodging Fizz's Urchin Strike. Untargetable for ?; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Fizz Q Urchin Strike)
- **0.17** untargetable: Alpha Strike makes Master Yi untargetable, dodging Fizz's Seastone Trident. Untargetable for ?; Seastone Trident lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Master Yi's Alpha Strike.

#### 4. Kayle (net +0.59)

- **0.40** invulnerable: Divine Judgment makes Kayle invulnerable to Fizz's Chum the Waters (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Chum the Waters. (Kayle R Divine Judgment → Fizz R Chum the Waters)
- **0.36** invulnerable: Divine Judgment makes Kayle invulnerable to Fizz's Urchin Strike. Invulnerable for 2.5 s, long enough to use ahead of Urchin Strike. (Kayle R Divine Judgment → Fizz Q Urchin Strike)
- **0.23** invulnerable: Divine Judgment makes Kayle invulnerable to Fizz's Seastone Trident. Invulnerable for 2.5 s, long enough to use ahead of Seastone Trident. (Kayle R Divine Judgment → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Kayle's Starfire Spellblade.

#### 5. Fiora (net +0.53)

- **0.90** parry: Riposte parries Fizz's Chum the Waters and stuns back. Parry for 0.75 s; Chum the Waters takes 1.25 s to land, enough to react. Negating Chum the Waters's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Fizz R Chum the Waters)
- **0.30** parry: Riposte parries Fizz's Urchin Strike. Parry for 0.75 s; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Fizz Q Urchin Strike)
- **0.17** parry: Riposte parries Fizz's Seastone Trident. Parry for 0.75 s; Seastone Trident lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Fiora's Riposte.

#### 6. Xayah (net +0.51)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Fizz's Chum the Waters. Untargetable for 1.5 s, long enough to use ahead of Chum the Waters. (Xayah R Featherstorm → Fizz R Chum the Waters)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Fizz's Urchin Strike. Untargetable for 1.5 s, long enough to use ahead of Urchin Strike. (Xayah R Featherstorm → Fizz Q Urchin Strike)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Fizz's Seastone Trident. Untargetable for 1.5 s, long enough to use ahead of Seastone Trident. (Xayah R Featherstorm → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Xayah's Bladecaller.

#### 7. Gwen (net +0.44)

- **0.80** untargetable: Hallowed Mist makes Gwen untargetable, dodging Fizz's Chum the Waters. Untargetable for ?; Chum the Waters takes 1.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Fizz R Chum the Waters)
- **0.29** untargetable: Hallowed Mist makes Gwen untargetable, dodging Fizz's Urchin Strike. Untargetable for ?; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Fizz Q Urchin Strike)
- **0.17** untargetable: Hallowed Mist makes Gwen untargetable, dodging Fizz's Seastone Trident. Untargetable for ?; Seastone Trident lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Gwen's Needlework.

#### 8. Olaf (net +0.43)

- **0.80** cc immunity: Ragnarok makes Olaf immune to Fizz's Chum the Waters (airborne, slow). Immune for 3 s, long enough to use ahead of Chum the Waters. (Olaf R Ragnarok → Fizz R Chum the Waters)
- **0.09** cc immunity: Ragnarok makes Olaf immune to Fizz's Playful (slow). Immune for 3 s, long enough to use ahead of Playful. (Olaf R Ragnarok → Fizz E Playful)
- Watch out: Playful makes Fizz untargetable, dodging Olaf's Reckless Swing.

#### 9. Aurora (net +0.42)

- **0.70** untargetable: Between Worlds makes Aurora untargetable, dodging Fizz's Chum the Waters. Untargetable for 0.4 s; Chum the Waters takes 1.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Fizz R Chum the Waters)
- **0.21** untargetable: Between Worlds makes Aurora untargetable, dodging Fizz's Urchin Strike. Untargetable for 0.4 s; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Fizz Q Urchin Strike)
- **0.14** range: Aurora's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range). Fizz closes the gap with Playful, Trickster, Urchin Strike. (Aurora basic attacks → Fizz basic attacks)
- Watch out: Playful makes Fizz untargetable, dodging Aurora's Between Worlds.

#### 10. Yuumi (net +0.32)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Fizz's Chum the Waters. Untargetable for ?; Chum the Waters takes 1.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fizz R Chum the Waters)
- **0.48** untargetable: You and Me! makes Yuumi untargetable, dodging Fizz's Urchin Strike. Untargetable for ?; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fizz Q Urchin Strike)
- **0.33** untargetable: You and Me! makes Yuumi untargetable, dodging Fizz's Seastone Trident. Untargetable for ?; Seastone Trident lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Yuumi's Final Chapter.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.95 | 0.95 | 0.00 |  |
| 2 | Vladimir | +0.64 | 1.20 | 0.56 |  |
| 3 | Master Yi | +0.62 | 1.21 | 0.59 |  |
| 4 | Kayle | +0.59 | 0.82 | 0.23 |  |
| 5 | Fiora | +0.53 | 1.10 | 0.57 |  |
| 6 | Xayah | +0.51 | 1.10 | 0.59 |  |
| 7 | Gwen | +0.44 | 0.99 | 0.55 |  |
| 8 | Olaf | +0.43 | 0.85 | 0.42 |  |
| 9 | Aurora | +0.42 | 0.99 | 0.57 |  |
| 10 | Yuumi | +0.32 | 1.25 | 0.93 |  |
| 11 | Zed | +0.30 | 0.84 | 0.54 |  |
| 12 | Bard | +0.29 | 1.20 | 0.91 |  |
| 13 | Udyr | +0.25 | 0.90 | 0.65 |  |
| 14 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 15 | Lissandra | +0.16 | 1.17 | 1.01 |  |
| 16 | Sion | +0.11 | 0.85 | 0.74 |  |
| 17 | Twitch | +0.09 | 0.20 | 0.11 |  |
| 18 | Kai'Sa | +0.06 | 0.17 | 0.11 |  |
| 19 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 20 | Gangplank | -0.02 | 0.70 | 0.72 |  |
| 21 | Morgana | -0.03 | 0.95 | 0.98 |  |
| 22 | Kalista | -0.03 | 0.69 | 0.72 |  |
| 23 | Vex | -0.06 | 0.64 | 0.70 |  |
| 24 | Jinx | -0.08 | 0.68 | 0.76 | dash stop (Flame Chompers!) |
| 25 | Rek'Sai | -0.12 | 1.05 | 1.17 |  |
| 26 | Kog'Maw | -0.19 | 0.12 | 0.31 |  |
| 27 | Nocturne | -0.20 | 0.91 | 1.11 |  |
| 28 | Samira | -0.20 | 0.53 | 0.73 | projectile block (Blade Whirl) |
| 29 | Dr. Mundo | -0.23 | 0.00 | 0.23 |  |
| 30 | Singed | -0.25 | 0.68 | 0.93 |  |
| 31 | Teemo | -0.25 | 0.59 | 0.84 |  |
| 32 | Kindred | -0.25 | 0.20 | 0.45 |  |
| 33 | Jax | -0.27 | 0.82 | 1.09 | attack dodge (Counter Strike) |
| 34 | Rengar | -0.29 | 0.71 | 1.00 |  |
| 35 | Nasus | -0.29 | 0.27 | 0.56 |  |
| 36 | Nidalee | -0.30 | 0.13 | 0.43 |  |
| 37 | Shaco | -0.31 | 0.94 | 1.25 |  |
| 38 | Cassiopeia | -0.32 | 0.77 | 1.09 |  |
| 39 | Zeri | -0.34 | 0.21 | 0.55 |  |
| 40 | Zilean | -0.34 | 0.15 | 0.49 |  |
| 41 | Kayn | -0.35 | 0.94 | 1.29 |  |
| 42 | Lulu | -0.35 | 0.42 | 0.77 |  |
| 43 | Milio | -0.36 | 0.34 | 0.70 |  |
| 44 | Malzahar | -0.37 | 0.82 | 1.19 |  |
| 45 | Braum | -0.40 | 0.40 | 0.80 | projectile block (Unbreakable) |
| 46 | Corki | -0.40 | 0.15 | 0.55 |  |
| 47 | Veigar | -0.41 | 0.57 | 0.98 |  |
| 48 | Garen | -0.42 | 0.32 | 0.74 |  |
| 49 | Taric | -0.42 | 0.00 | 0.42 |  |
| 50 | Warwick | -0.43 | 1.03 | 1.46 |  |
| 51 | Camille | -0.43 | 0.90 | 1.33 |  |
| 52 | Nilah | -0.43 | 0.61 | 1.04 | attack dodge (Jubilant Veil) |
| 53 | Viktor | -0.44 | 0.62 | 1.06 |  |
| 54 | Ahri | -0.45 | 0.60 | 1.05 |  |
| 55 | Mel | -0.45 | 0.53 | 0.98 | projectile block (Rebuttal) |
| 56 | Pantheon | -0.50 | 0.75 | 1.25 |  |
| 57 | Maokai | -0.51 | 1.03 | 1.54 |  |
| 58 | Zaahen | -0.51 | 0.83 | 1.34 |  |
| 59 | Twisted Fate | -0.52 | 0.19 | 0.71 |  |
| 60 | Yorick | -0.54 | 0.00 | 0.54 |  |
| 61 | Zoe | -0.55 | 0.15 | 0.70 |  |
| 62 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 63 | Alistar | -0.57 | 0.68 | 1.25 |  |
| 64 | Yasuo | -0.57 | 0.40 | 0.97 | projectile block (Wind Wall) |
| 65 | Soraka | -0.57 | 0.13 | 0.70 |  |
| 66 | Smolder | -0.58 | 0.15 | 0.73 |  |
| 67 | Kled | -0.59 | 0.74 | 1.33 |  |
| 68 | Hwei | -0.60 | 0.66 | 1.26 | dash stop (Grim Visage) |
| 69 | Graves | -0.60 | 0.10 | 0.70 |  |
| 70 | Ashe | -0.62 | 0.18 | 0.80 |  |
| 71 | LeBlanc | -0.62 | 0.10 | 0.72 |  |
| 72 | Ezreal | -0.63 | 0.15 | 0.78 |  |
| 73 | Miss Fortune | -0.64 | 0.15 | 0.79 |  |
| 74 | Quinn | -0.65 | 0.17 | 0.82 |  |
| 75 | Illaoi | -0.66 | 0.08 | 0.74 |  |
| 76 | Evelynn | -0.67 | 0.94 | 1.61 |  |
| 77 | Kennen | -0.69 | 0.14 | 0.83 |  |
| 78 | Xin Zhao | -0.70 | 0.58 | 1.28 |  |
| 79 | Poppy | -0.71 | 0.69 | 1.40 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 80 | Sylas | -0.71 | 0.00 | 0.71 |  |
| 81 | Akshan | -0.72 | 0.15 | 0.87 |  |
| 82 | Varus | -0.73 | 0.13 | 0.86 |  |
| 83 | Tristana | -0.74 | 0.18 | 0.92 |  |
| 84 | Sona | -0.75 | 0.19 | 0.94 |  |
| 85 | Karthus | -0.75 | 0.08 | 0.83 |  |
| 86 | Lillia | -0.76 | 0.04 | 0.80 |  |
| 87 | Renekton | -0.76 | 0.00 | 0.76 |  |
| 88 | Shen | -0.77 | 0.79 | 1.56 | attack block (Spirit's Refuge) |
| 89 | Jayce | -0.78 | 0.13 | 0.91 |  |
| 90 | Katarina | -0.78 | 0.00 | 0.78 |  |
| 91 | Skarner | -0.79 | 0.15 | 0.94 |  |
| 92 | Lee Sin | -0.80 | 0.00 | 0.80 |  |
| 93 | Kassadin | -0.82 | 0.00 | 0.82 |  |
| 94 | Karma | -0.83 | 0.10 | 0.93 |  |
| 95 | Aatrox | -0.83 | 0.00 | 0.83 |  |
| 96 | Heimerdinger | -0.84 | 0.21 | 1.05 |  |
| 97 | Vayne | -0.84 | 0.20 | 1.04 |  |
| 98 | Lux | -0.84 | 0.14 | 0.98 |  |
| 99 | Lucian | -0.85 | 0.16 | 1.01 |  |
| 100 | Annie | -0.85 | 0.11 | 0.96 |  |
| 101 | Azir | -0.86 | 0.12 | 0.98 |  |
| 102 | Kha'Zix | -0.86 | 0.00 | 0.86 |  |
| 103 | Draven | -0.87 | 0.17 | 1.04 |  |
| 104 | Brand | -0.89 | 0.10 | 0.99 |  |
| 105 | Elise | -0.90 | 0.15 | 1.05 |  |
| 106 | Orianna | -0.91 | 0.12 | 1.03 |  |
| 107 | Aphelios | -0.92 | 0.30 | 1.22 |  |
| 108 | Mordekaiser | -0.92 | 0.06 | 0.98 |  |
| 109 | Diana | -0.92 | 0.00 | 0.92 |  |
| 110 | Syndra | -0.94 | 0.10 | 1.04 |  |
| 111 | Bel'Veth | -0.94 | 0.00 | 0.94 |  |
| 112 | Wukong | -0.96 | 0.00 | 0.96 |  |
| 113 | Renata Glasc | -0.97 | 0.18 | 1.15 |  |
| 114 | Ivern | -0.97 | 0.08 | 1.05 |  |
| 115 | Sett | -0.97 | 0.08 | 1.05 |  |
| 116 | Yone | -0.99 | 0.36 | 1.35 |  |
| 117 | Gnar | -0.99 | 0.14 | 1.13 |  |
| 118 | Talon | -0.99 | 0.00 | 0.99 |  |
| 119 | Ziggs | -1.00 | 0.13 | 1.13 |  |
| 120 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 121 | Akali | -1.01 | 0.00 | 1.01 |  |
| 122 | Blitzcrank | -1.01 | 0.00 | 1.01 |  |
| 123 | Seraphine | -1.02 | 0.13 | 1.15 |  |
| 124 | Swain | -1.02 | 0.09 | 1.11 |  |
| 125 | Malphite | -1.03 | 0.26 | 1.29 |  |
| 126 | Anivia | -1.03 | 0.12 | 1.15 |  |
| 127 | Vel'Koz | -1.03 | 0.12 | 1.15 |  |
| 128 | Zyra | -1.03 | 0.12 | 1.15 |  |
| 129 | Darius | -1.03 | 0.00 | 1.03 |  |
| 130 | Trundle | -1.03 | 0.00 | 1.03 |  |
| 131 | Shyvana | -1.04 | 0.08 | 1.12 |  |
| 132 | Cho'Gath | -1.04 | 0.00 | 1.04 |  |
| 133 | Xerath | -1.05 | 0.12 | 1.17 |  |
| 134 | Irelia | -1.06 | 0.00 | 1.06 |  |
| 135 | Caitlyn | -1.07 | 0.18 | 1.25 |  |
| 136 | Aurelion Sol | -1.07 | 0.10 | 1.17 |  |
| 137 | Senna | -1.08 | 0.16 | 1.24 |  |
| 138 | Locke | -1.08 | 0.00 | 1.08 |  |
| 139 | Riven | -1.09 | 0.00 | 1.09 |  |
| 140 | Ryze | -1.10 | 0.11 | 1.21 |  |
| 141 | Amumu | -1.13 | 0.27 | 1.40 |  |
| 142 | Nami | -1.16 | 0.10 | 1.26 |  |
| 143 | Neeko | -1.16 | 0.10 | 1.26 |  |
| 144 | Hecarim | -1.16 | 0.08 | 1.24 |  |
| 145 | Urgot | -1.19 | 0.06 | 1.25 |  |
| 146 | Nautilus | -1.20 | 0.00 | 1.20 |  |
| 147 | Volibear | -1.21 | 0.08 | 1.29 |  |
| 148 | Rammus | -1.23 | 0.27 | 1.50 |  |
| 149 | Zac | -1.24 | 0.57 | 1.81 | dash stop (Stretching Strikes) |
| 150 | Ekko | -1.24 | 0.00 | 1.24 |  |
| 151 | Jhin | -1.25 | 0.13 | 1.38 |  |
| 152 | Nunu & Willump | -1.26 | 0.31 | 1.57 |  |
| 153 | Jarvan IV | -1.26 | 0.08 | 1.34 |  |
| 154 | Thresh | -1.26 | 0.08 | 1.34 |  |
| 155 | Janna | -1.27 | 0.17 | 1.44 |  |
| 156 | Leona | -1.33 | 0.00 | 1.33 |  |
| 157 | Rakan | -1.35 | 0.05 | 1.40 |  |
| 158 | Naafiri | -1.35 | 0.00 | 1.35 |  |
| 159 | Fiddlesticks | -1.36 | 0.08 | 1.44 |  |
| 160 | Vi | -1.46 | 0.08 | 1.54 |  |
| 161 | K'Sante | -1.47 | 0.16 | 1.63 |  |
| 162 | Ornn | -1.48 | 0.08 | 1.56 |  |
| 163 | Briar | -1.50 | 0.00 | 1.50 |  |
| 164 | Sejuani | -1.50 | 0.00 | 1.50 |  |
| 165 | Qiyana | -1.53 | 0.00 | 1.53 |  |
| 166 | Gragas | -1.55 | 0.00 | 1.55 |  |
| 167 | Pyke | -1.55 | 0.00 | 1.55 |  |
| 168 | Viego | -1.60 | 0.08 | 1.68 |  |
| 169 | Tahm Kench | -1.60 | 0.00 | 1.60 |  |
| 170 | Rell | -1.68 | 0.00 | 1.68 |  |
| 171 | Taliyah | -1.83 | 0.12 | 1.95 |  |
| 172 | Galio | -1.88 | 0.00 | 1.88 |  |
