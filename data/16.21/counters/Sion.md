# Counters to Sion (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Sion: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Sion wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Sion --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | +0.37 | – | +0.00 |
| 2 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.27 | – | +0.00 |
| 3 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 4 | Warwick | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 5 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 6 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 7 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 8 | Yorick | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 9 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 10 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.00 |
| 11 | Aatrox | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 12 | Teemo | +0.74 | +0.66 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 13 | Aphelios | +0.73 | +0.86 | +1.00 | +1.00 | +0.06 | +0.54 | +0.00 |
| 14 | Udyr | +0.73 | +0.92 | +0.93 | +1.00 | −0.05 | – | +0.00 |
| 15 | Kayle | +0.73 | +1.00 | +1.00 | +0.50 | +0.17 | +1.00 | +0.00 |
| 16 | Vayne | +0.69 | +1.00 | +0.52 | +1.00 | +0.07 | +1.00 | +0.00 |
| 17 | Jax | +0.67 | +1.00 | +1.00 | +0.50 | +0.02 | – | +0.00 |
| 18 | Dr. Mundo | +0.66 | +0.59 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 19 | Kog'Maw | +0.63 | +0.88 | +0.40 | +1.00 | +0.10 | +1.00 | +0.00 |
| 20 | Lulu | +0.61 | +1.00 | +1.00 | +1.00 | +0.06 | −1.00 | +0.00 |
| 21 | Heimerdinger | +0.58 | +0.33 | +0.76 | +1.00 | +0.16 | +0.84 | +0.00 |
| 22 | Darius | +0.51 | +0.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 23 | Morgana | +0.50 | +0.57 | +0.97 | +0.10 | −0.06 | +0.98 | +0.00 |
| 24 | Taric | +0.44 | +0.35 | +0.37 | +1.00 | +0.07 | – | +0.00 |
| 25 | Olaf | +0.42 | +0.51 | +0.56 | +0.57 | −0.02 | – | +0.00 |
| 26 | Sivir | +0.37 | −0.15 | +1.00 | +0.26 | +0.07 | +1.00 | +0.00 |
| 27 | Mordekaiser | +0.35 | +0.13 | +0.35 | +0.97 | +0.03 | – | +0.00 |
| 28 | Zac | +0.28 | +0.32 | +0.33 | +0.67 | −0.29 | – | +0.00 |
| 29 | Quinn | +0.26 | +1.00 | +1.00 | −1.00 | +0.09 | −0.59 | +0.00 |
| 30 | Rakan | +0.26 | +0.00 | +1.00 | +0.00 | +0.11 | −0.11 | +0.00 |
| 31 | Renekton | +0.24 | +0.00 | +0.47 | +0.50 | −0.01 | – | +0.00 |
| 32 | Xin Zhao | +0.23 | +0.28 | +0.51 | +0.00 | +0.06 | – | +0.00 |
| 33 | Sett | +0.23 | −1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 34 | Trundle | +0.18 | +0.04 | +0.66 | +0.00 | −0.08 | – | +0.00 |
| 35 | Yasuo | +0.18 | +0.00 | +0.17 | +0.50 | +0.12 | – | +0.00 |
| 36 | Kennen | +0.17 | +0.41 | +0.54 | +0.04 | +0.02 | −0.80 | +0.00 |
| 37 | Neeko | +0.17 | −0.11 | +0.31 | +0.98 | +0.03 | −0.81 | +0.00 |
| 38 | Anivia | +0.12 | +0.17 | +0.18 | +0.15 | −0.06 | +0.06 | +0.00 |
| 39 | Tahm Kench | +0.09 | +0.09 | +0.11 | +0.16 | −0.00 | – | +0.00 |
| 40 | Corki | +0.07 | +0.56 | −0.74 | +0.50 | +0.05 | +0.04 | +0.00 |
| 41 | Twisted Fate | +0.05 | +0.86 | −1.00 | +1.00 | −0.07 | −1.00 | +0.00 |
| 42 | Malphite | +0.04 | +0.03 | +0.07 | −0.04 | +0.10 | – | +0.00 |
| 43 | Hwei | +0.03 | +0.02 | +0.04 | +0.09 | −0.00 | +0.02 | +0.00 |
| 44 | Xayah | +0.03 | −0.69 | +1.00 | +0.08 | +0.12 | −0.79 | +0.00 |
| 45 | Braum | +0.03 | +0.04 | +0.06 | +0.04 | −0.02 | – | +0.00 |
| 46 | Volibear | +0.03 | +0.00 | +0.08 | +0.00 | +0.03 | – | +0.00 |
| 47 | Ambessa | +0.02 | +0.00 | +0.00 | +0.00 | +0.14 | – | +0.00 |
| 48 | Diana | +0.02 | +0.00 | +0.00 | +0.00 | +0.13 | – | +0.00 |
| 49 | Cho'Gath | +0.01 | +0.00 | +0.00 | +0.00 | +0.05 | – | +0.00 |
| 50 | Shyvana | +0.01 | +0.00 | +0.00 | +0.00 | +0.05 | – | +0.00 |
| 51 | Graves | +0.00 | +0.00 | +0.00 | +0.00 | +0.03 | +0.00 | +0.00 |
| 52 | Nocturne | +0.00 | +0.00 | +0.00 | +0.00 | +0.02 | – | +0.00 |
| 53 | Yone | +0.00 | −0.01 | +0.00 | +0.00 | +0.03 | – | +0.00 |
| 54 | Malzahar | −0.00 | −0.03 | −0.41 | +1.00 | +0.04 | −0.98 | +0.00 |
| 55 | Tryndamere | −0.01 | +0.00 | +0.00 | +0.00 | −0.03 | – | +0.00 |
| 56 | Ornn | −0.02 | −0.01 | −0.02 | −0.11 | +0.08 | – | +0.00 |
| 57 | Shen | −0.02 | −0.06 | −0.02 | −0.06 | +0.10 | – | +0.00 |
| 58 | Garen | −0.03 | +0.00 | +0.00 | +0.00 | −0.17 | – | +0.00 |
| 59 | Wukong | −0.03 | +0.00 | +0.00 | +0.00 | −0.17 | – | +0.00 |
| 60 | Jayce | −0.04 | +0.06 | −0.28 | +0.00 | +0.15 | – | +0.00 |
| 61 | Bel'Veth | −0.04 | −1.00 | +0.00 | +1.00 | +0.11 | – | +0.00 |
| 62 | Camille | −0.07 | −0.25 | +0.02 | +0.00 | −0.03 | – | +0.00 |
| 63 | Gangplank | −0.08 | −0.28 | +0.00 | +0.00 | +0.02 | – | +0.00 |
| 64 | Lee Sin | −0.10 | +0.00 | +0.00 | −0.50 | +0.06 | – | +0.00 |
| 65 | Milio | −0.12 | +0.02 | +0.02 | −0.23 | +0.10 | −0.99 | +0.00 |
| 66 | Gnar | −0.12 | +0.10 | +0.14 | −1.00 | +0.10 | +0.05 | +0.00 |
| 67 | Karma | −0.14 | +0.13 | −0.45 | +0.25 | −0.10 | −1.00 | +0.00 |
| 68 | Smolder | −0.16 | −0.95 | +0.88 | −0.50 | +0.07 | −0.50 | +0.00 |
| 69 | Swain | −0.16 | +0.02 | −0.86 | +0.17 | +0.09 | +0.02 | +0.00 |
| 70 | Elise | −0.17 | −0.30 | +0.00 | +0.00 | +0.02 | −1.00 | +0.00 |
| 71 | Orianna | −0.23 | −1.00 | −0.37 | +1.00 | +0.07 | −1.00 | +0.00 |
| 72 | Maokai | −0.26 | +0.00 | −1.00 | +0.00 | +0.09 | – | +0.00 |
| 73 | Alistar | −0.27 | +0.00 | −1.00 | +0.00 | +0.07 | – | +0.00 |
| 74 | Kalista | −0.30 | −0.68 | +0.02 | −0.89 | +0.06 | +0.34 | +0.00 |
| 75 | Ezreal | −0.30 | −0.55 | −0.73 | +0.54 | +0.05 | −0.99 | +0.00 |
| 76 | Jinx | −0.31 | −0.03 | −0.76 | −0.13 | +0.07 | −0.96 | +0.00 |
| 77 | Ashe | −0.34 | +0.23 | −0.48 | −1.00 | +0.08 | −0.93 | +0.00 |
| 78 | Yunara | −0.35 | −0.80 | −0.98 | +0.92 | +0.06 | −0.94 | +0.00 |
| 79 | Bard | −0.36 | −1.00 | −1.00 | +0.95 | +0.01 | −0.49 | +0.00 |
| 80 | Zeri | −0.37 | −0.50 | −0.05 | −0.84 | −0.05 | −0.50 | +0.00 |
| 81 | Azir | −0.37 | +0.00 | −0.32 | −1.00 | +0.04 | −1.00 | +0.00 |
| 82 | Irelia | −0.40 | −0.52 | −0.63 | −0.48 | +0.12 | – | +0.00 |
| 83 | Gwen | −0.40 | −0.70 | −0.70 | +0.00 | −0.10 | – | +0.00 |
| 84 | Master Yi | −0.41 | −0.50 | −0.50 | −0.50 | −0.13 | – | +0.00 |
| 85 | Pantheon | −0.43 | −0.62 | −1.00 | +0.00 | +0.10 | – | +0.00 |
| 86 | Lux | −0.44 | −0.79 | −0.53 | −0.17 | +0.11 | −0.98 | +0.00 |
| 87 | Mel | −0.46 | −0.05 | −1.00 | −1.00 | +0.01 | −0.04 | +0.00 |
| 88 | Soraka | −0.47 | −1.00 | −0.16 | −0.40 | −0.02 | −0.98 | +0.00 |
| 89 | Nami | −0.48 | −0.07 | −0.96 | −0.88 | +0.07 | −0.63 | +0.00 |
| 90 | Brand | −0.50 | −0.72 | −0.59 | −0.49 | +0.03 | −0.77 | +0.00 |
| 91 | Viego | −0.51 | −0.96 | −0.96 | +0.00 | +0.14 | – | +0.00 |
| 92 | Rek'Sai | −0.52 | −1.00 | +0.00 | −1.00 | −0.11 | – | +0.00 |
| 93 | Caitlyn | −0.53 | −0.11 | −0.93 | −0.91 | +0.06 | −1.00 | +0.00 |
| 94 | Fiddlesticks | −0.56 | +0.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 95 | Annie | −0.57 | −0.76 | −0.44 | −0.99 | +0.12 | −0.90 | +0.00 |
| 96 | Skarner | −0.57 | −1.00 | −1.00 | +0.00 | −0.11 | – | +0.00 |
| 97 | Vel'Koz | −0.59 | −0.82 | −0.63 | −0.99 | +0.17 | −0.56 | +0.00 |
| 98 | Singed | −0.59 | −0.82 | −0.66 | −0.82 | −0.00 | – | +0.00 |
| 99 | Zyra | −0.63 | −0.98 | −0.93 | −0.65 | +0.04 | −0.24 | +0.00 |
| 100 | Riven | −0.65 | −1.00 | −0.66 | −1.00 | +0.18 | – | +0.00 |
| 101 | Aurora | −0.69 | −1.00 | −1.00 | −0.49 | +0.08 | −1.00 | +0.00 |
| 102 | Vi | −0.71 | −0.75 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 103 | Fizz | −0.71 | −1.00 | −0.77 | −1.00 | +0.02 | – | +0.00 |
| 104 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.32 | – | +0.00 |
| 105 | Jhin | −0.73 | −0.77 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 106 | Evelynn | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 107 | Samira | −0.75 | −0.83 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 108 | Jarvan IV | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 109 | Shaco | −0.76 | −1.00 | −0.97 | −1.00 | +0.08 | – | +0.00 |
| 110 | Aurelion Sol | −0.76 | −1.00 | −1.00 | −1.00 | +0.26 | −0.97 | +0.00 |
| 111 | Janna | −0.76 | −1.00 | −0.90 | −1.00 | +0.10 | −1.00 | +0.00 |
| 112 | Hecarim | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 113 | Lillia | −0.76 | −1.00 | −0.93 | −1.00 | +0.00 | −0.83 | +0.00 |
| 114 | Tristana | −0.77 | −0.99 | −0.93 | −1.00 | +0.05 | −0.94 | +0.00 |
| 115 | Galio | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 116 | Nilah | −0.77 | −0.99 | −0.95 | −1.00 | −0.05 | – | +0.00 |
| 117 | Sylas | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 118 | Viktor | −0.77 | −0.95 | −0.99 | −0.94 | +0.02 | −1.00 | +0.00 |
| 119 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 120 | Kayn | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 121 | Naafiri | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 122 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 123 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 124 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 125 | Rammus | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 126 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 127 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 128 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 129 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 130 | Sejuani | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 131 | Zoe | −0.79 | −1.00 | −0.99 | −1.00 | +0.06 | −1.00 | +0.00 |
| 132 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 133 | Kai'Sa | −0.79 | −0.99 | −1.00 | −1.00 | +0.05 | −0.98 | +0.00 |
| 134 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 135 | Ziggs | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 136 | Lucian | −0.79 | −1.00 | −1.00 | −0.98 | +0.05 | −1.00 | +0.00 |
| 137 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 138 | Cassiopeia | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 139 | Gragas | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 140 | Akshan | −0.79 | −0.99 | −0.99 | −1.00 | +0.03 | −1.00 | +0.00 |
| 141 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 142 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 143 | Urgot | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 144 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 145 | Sona | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 146 | Karthus | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 147 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 148 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 149 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 150 | Talon | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 151 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 152 | Zilean | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | −0.97 | +0.00 |
| 153 | Seraphine | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 154 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 155 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 156 | Varus | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 157 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 158 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 159 | Nidalee | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 160 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 161 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 162 | Kindred | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 163 | Draven | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 164 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 165 | Briar | −0.82 | −1.00 | −1.00 | −1.00 | −0.26 | – | +0.00 |
| 166 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 167 | Ahri | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 168 | Taliyah | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 169 | Syndra | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 170 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.50 |
| 171 | Pyke | −0.85 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | +0.00 |
| 172 | Renata Glasc | −0.87 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Sion's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Sion's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Sion` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.82)

- **0.81** range: Sivir's basic attacks reach 325 units farther than Sion's (500 vs 175 attack range). Sion has no dash or blink to close the gap. (Sivir basic attacks → Sion basic attacks)
- **0.80** spell shield: Spell Shield's spell shield blocks Sion's Unstoppable Onslaught. Spell shield for 1.5 s, long enough to use ahead of Unstoppable Onslaught. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sion R Unstoppable Onslaught)
- **0.42** spell shield: Spell Shield's spell shield blocks Sion's Decimating Smash. Spell shield for 1.5 s, long enough to use ahead of Decimating Smash. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sion Q Decimating Smash)

#### 2. Vladimir (net +1.12)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Sion's Unstoppable Onslaught. Untargetable for 2 s, long enough to use ahead of Unstoppable Onslaught. (Vladimir W Sanguine Pool → Sion R Unstoppable Onslaught)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Sion's Decimating Smash. Untargetable for 2 s, long enough to use ahead of Decimating Smash. (Vladimir W Sanguine Pool → Sion Q Decimating Smash)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Sion's (450 vs 175 attack range). Sion has no dash or blink to close the gap. (Vladimir basic attacks → Sion basic attacks)
- Watch out: Decimating Smash's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 3. Xayah (net +1.10)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Sion's (525 vs 175 attack range). Sion has no dash or blink to close the gap. (Xayah basic attacks → Sion basic attacks)
- **0.61** untargetable: Featherstorm makes Xayah untargetable, dodging Sion's Unstoppable Onslaught. Untargetable for 1.5 s, long enough to use ahead of Unstoppable Onslaught. (Xayah R Featherstorm → Sion R Unstoppable Onslaught)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Sion's Decimating Smash. Untargetable for 1.5 s, long enough to use ahead of Decimating Smash. (Xayah R Featherstorm → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Xayah's Bladecaller (root).

#### 4. Kayle (net +1.09)

- **0.72** range: Kayle's basic attacks reach 450 units farther than Sion's (625 vs 175 attack range). Sion has no dash or blink to close the gap. (Kayle basic attacks → Sion basic attacks)
- **0.34** invulnerable: Divine Judgment makes Kayle invulnerable to Sion's Unstoppable Onslaught (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Unstoppable Onslaught. (Kayle R Divine Judgment → Sion R Unstoppable Onslaught)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Sion's Decimating Smash (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Decimating Smash. (Kayle R Divine Judgment → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Kayle's Radiant Blast (slow).

#### 5. Milio (net +1.08)

- **0.67** range: Milio's basic attacks reach 350 units farther than Sion's (525 vs 175 attack range). Sion has no dash or blink to close the gap. (Milio basic attacks → Sion basic attacks)
- **0.43** cleanse: Breath of Life cleanses Sion's Unstoppable Onslaught (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Sion R Unstoppable Onslaught)
- **0.24** cleanse: Breath of Life cleanses Sion's Decimating Smash (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Milio's Ultra Mega Fire Kick (airborne, slow, stun).

#### 6. Nocturne (net +0.81)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Sion's Unstoppable Onslaught. Spell shield for 1.5 s, long enough to use ahead of Unstoppable Onslaught. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sion R Unstoppable Onslaught)
- **0.49** spell shield: Shroud of Darkness's spell shield blocks Sion's Decimating Smash. Spell shield for 1.5 s, long enough to use ahead of Decimating Smash. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sion Q Decimating Smash)
- **0.13** interrupt: Unspeakable Horror's fear interrupts Sion's Decimating Smash (charge-up). Unspeakable Horror must land during the charge-up. Sion can release Decimating Smash early instead of charging it fully. (Nocturne E Unspeakable Horror → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Nocturne's Unspeakable Horror (fear, slow).

#### 7. Aurora (net +0.80)

- **0.54** range: Aurora's basic attacks reach 375 units farther than Sion's (550 vs 175 attack range). Sion has no dash or blink to close the gap. (Aurora basic attacks → Sion basic attacks)
- **0.36** untargetable: Between Worlds makes Aurora untargetable, dodging Sion's Unstoppable Onslaught. Untargetable for 0.4 s; Unstoppable Onslaught lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Sion R Unstoppable Onslaught)
- **0.18** untargetable: Between Worlds makes Aurora untargetable, dodging Sion's Decimating Smash. Untargetable for 0.4 s; Decimating Smash lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Aurora's Between Worlds (slow).

#### 8. Olaf (net +0.79)

- **0.68** cc immunity: Ragnarok makes Olaf immune to Sion's Unstoppable Onslaught (airborne, slow, stun). Immune for 3 s, long enough to use ahead of Unstoppable Onslaught. (Olaf R Ragnarok → Sion R Unstoppable Onslaught)
- **0.31** cc immunity: Ragnarok makes Olaf immune to Sion's Decimating Smash (airborne, slow, stun). Immune for 3 s, long enough to use ahead of Decimating Smash. (Olaf R Ragnarok → Sion Q Decimating Smash)
- **0.05** cc immunity: Ragnarok makes Olaf immune to Sion's Roar of the Slayer (slow). Immune for 3 s, long enough to use ahead of Roar of the Slayer. (Olaf R Ragnarok → Sion E Roar of the Slayer)
- Watch out: Unstoppable Onslaught makes Sion immune to Olaf's Undertow (slow).

#### 9. Zeri (net +0.78)

- **0.83** range: Zeri's basic attacks reach 375 units farther than Sion's (550 vs 175 attack range). Sion has no dash or blink to close the gap. (Zeri basic attacks → Sion basic attacks)
- Watch out: Unstoppable Onslaught makes Sion immune to Zeri's Ultrashock Laser (slow).

#### 10. Teemo (net +0.76)

- **0.59** range: Teemo's basic attacks reach 325 units farther than Sion's (500 vs 175 attack range). Sion has no dash or blink to close the gap. (Teemo basic attacks → Sion basic attacks)
- **0.35** blind: Blinding Dart's blind makes Sion's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Sion basic attacks)
- Watch out: Unstoppable Onslaught makes Sion immune to Teemo's Blinding Dart (blind).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.82 | 1.82 | 0.00 | range (attacks) |
| 2 | Vladimir | +1.12 | 1.32 | 0.20 |  |
| 3 | Xayah | +1.10 | 1.44 | 0.34 | range (attacks) |
| 4 | Kayle | +1.09 | 1.14 | 0.05 | range (attacks) |
| 5 | Milio | +1.08 | 1.43 | 0.35 | range (attacks) |
| 6 | Nocturne | +0.81 | 1.29 | 0.48 |  |
| 7 | Aurora | +0.80 | 1.02 | 0.22 | range (attacks) |
| 8 | Olaf | +0.79 | 0.85 | 0.06 |  |
| 9 | Zeri | +0.78 | 0.83 | 0.05 | range (attacks) |
| 10 | Teemo | +0.76 | 0.94 | 0.18 | range (attacks) |
| 11 | Kindred | +0.76 | 0.81 | 0.05 | range (attacks) |
| 12 | Twitch | +0.75 | 0.81 | 0.06 | range (attacks) |
| 13 | Udyr | +0.72 | 1.21 | 0.49 |  |
| 14 | Rek'Sai | +0.71 | 1.04 | 0.33 |  |
| 15 | Gangplank | +0.67 | 0.84 | 0.17 |  |
| 16 | Kai'Sa | +0.67 | 0.67 | 0.00 | range (attacks) |
| 17 | Morgana | +0.64 | 1.37 | 0.73 |  |
| 18 | Yunara | +0.63 | 0.72 | 0.09 | range (attacks) |
| 19 | Corki | +0.61 | 0.61 | 0.00 | range (attacks) |
| 20 | Ezreal | +0.61 | 0.61 | 0.00 | range (attacks) |
| 21 | Vayne | +0.57 | 0.93 | 0.36 | range (attacks) |
| 22 | Bard | +0.56 | 1.48 | 0.92 | range (attacks) |
| 23 | Rengar | +0.53 | 0.88 | 0.35 |  |
| 24 | Nidalee | +0.53 | 0.53 | 0.00 | range (attacks) |
| 25 | Fiora | +0.50 | 0.78 | 0.28 |  |
| 26 | Master Yi | +0.47 | 0.81 | 0.34 |  |
| 27 | Gwen | +0.47 | 0.61 | 0.14 |  |
| 28 | Samira | +0.45 | 0.67 | 0.22 | range (attacks) |
| 29 | Garen | +0.45 | 0.58 | 0.13 |  |
| 30 | Draven | +0.44 | 0.80 | 0.36 | range (attacks) |
| 31 | Smolder | +0.44 | 0.61 | 0.17 | range (attacks) |
| 32 | Kog'Maw | +0.41 | 0.47 | 0.06 |  |
| 33 | Yuumi | +0.40 | 1.23 | 0.83 | range (attacks) |
| 34 | Zilean | +0.39 | 0.76 | 0.37 | range (attacks) |
| 35 | Elise | +0.39 | 0.74 | 0.35 | range (attacks) |
| 36 | Vex | +0.39 | 0.73 | 0.34 | range (attacks) |
| 37 | Kennen | +0.39 | 0.67 | 0.28 | range (attacks) |
| 38 | Zed | +0.39 | 0.45 | 0.06 |  |
| 39 | Zoe | +0.35 | 0.73 | 0.38 | range (attacks) |
| 40 | Graves | +0.34 | 0.41 | 0.07 |  |
| 41 | Singed | +0.31 | 0.72 | 0.41 |  |
| 42 | Zaahen | +0.30 | 0.82 | 0.52 |  |
| 43 | Mel | +0.29 | 0.63 | 0.34 | range (attacks) |
| 44 | Annie | +0.29 | 0.57 | 0.28 |  |
| 45 | Lissandra | +0.28 | 1.27 | 0.99 |  |
| 46 | Alistar | +0.28 | 0.94 | 0.66 |  |
| 47 | Evelynn | +0.28 | 0.64 | 0.36 |  |
| 48 | Jayce | +0.27 | 0.66 | 0.39 | range (attacks) |
| 49 | Senna | +0.26 | 0.65 | 0.39 | range (attacks) |
| 50 | Viktor | +0.23 | 0.77 | 0.54 | range (attacks) |
| 51 | Heimerdinger | +0.22 | 0.76 | 0.54 |  |
| 52 | Nasus | +0.21 | 0.27 | 0.06 |  |
| 53 | Shaco | +0.20 | 0.62 | 0.42 |  |
| 54 | Brand | +0.20 | 0.59 | 0.39 |  |
| 55 | Kalista | +0.19 | 1.17 | 0.98 | range (attacks) |
| 56 | Soraka | +0.19 | 0.61 | 0.42 | range (attacks) |
| 57 | Veigar | +0.19 | 0.57 | 0.38 |  |
| 58 | Lulu | +0.18 | 1.07 | 0.89 | range (attacks) |
| 59 | Anivia | +0.17 | 0.75 | 0.58 |  |
| 60 | Ahri | +0.17 | 0.53 | 0.36 |  |
| 61 | Lux | +0.16 | 0.54 | 0.38 | range (attacks) |
| 62 | Ziggs | +0.15 | 0.62 | 0.47 | range (attacks) |
| 63 | LeBlanc | +0.15 | 0.38 | 0.23 |  |
| 64 | Jinx | +0.13 | 0.51 | 0.38 | range (attacks) |
| 65 | Syndra | +0.10 | 0.52 | 0.42 |  |
| 66 | Quinn | +0.09 | 0.82 | 0.73 | range (attacks) |
| 67 | Swain | +0.09 | 0.49 | 0.40 |  |
| 68 | Twisted Fate | +0.07 | 0.93 | 0.86 | range (attacks) |
| 69 | Gnar | +0.06 | 0.82 | 0.76 | range (attacks) |
| 70 | Lucian | +0.06 | 0.62 | 0.56 | range (attacks) |
| 71 | Illaoi | +0.06 | 0.12 | 0.06 |  |
| 72 | Sona | +0.05 | 0.85 | 0.80 | range (attacks) |
| 73 | Akshan | +0.03 | 0.59 | 0.56 | range (attacks) |
| 74 | Miss Fortune | +0.02 | 0.61 | 0.59 | range (attacks) |
| 75 | Jax | +0.01 | 0.35 | 0.34 |  |
| 76 | Kassadin | 0.00 | 0.16 | 0.16 |  |
| 77 | Cassiopeia | -0.01 | 0.87 | 0.88 |  |
| 78 | Ashe | -0.02 | 0.80 | 0.82 | range (attacks) |
| 79 | Thresh | -0.03 | 0.60 | 0.63 |  |
| 80 | Tristana | -0.04 | 0.80 | 0.84 | range (attacks) |
| 81 | Hwei | -0.04 | 0.56 | 0.60 |  |
| 82 | Talon | -0.05 | 0.00 | 0.05 |  |
| 83 | Akali | -0.06 | 0.00 | 0.06 |  |
| 84 | Dr. Mundo | -0.06 | 0.00 | 0.06 |  |
| 85 | Tryndamere | -0.06 | 0.00 | 0.06 |  |
| 86 | Caitlyn | -0.07 | 0.72 | 0.79 | range (attacks) |
| 87 | Cho'Gath | -0.08 | 0.32 | 0.40 |  |
| 88 | Kha'Zix | -0.08 | 0.00 | 0.08 |  |
| 89 | Renata Glasc | -0.10 | 0.91 | 1.01 | range (attacks) |
| 90 | Fizz | -0.11 | 0.74 | 0.85 |  |
| 91 | Karma | -0.11 | 0.38 | 0.49 |  |
| 92 | Aphelios | -0.14 | 0.85 | 0.99 | range (attacks) |
| 93 | Locke | -0.17 | 0.00 | 0.17 |  |
| 94 | Rumble | -0.17 | 0.00 | 0.17 |  |
| 95 | Renekton | -0.19 | 0.15 | 0.34 |  |
| 96 | Mordekaiser | -0.20 | 0.21 | 0.41 |  |
| 97 | Vel'Koz | -0.21 | 0.60 | 0.81 |  |
| 98 | Blitzcrank | -0.21 | 0.39 | 0.60 |  |
| 99 | Malzahar | -0.22 | 1.21 | 1.43 |  |
| 100 | Bel'Veth | -0.24 | 0.15 | 0.39 |  |
| 101 | Taric | -0.24 | 0.12 | 0.36 |  |
| 102 | Xerath | -0.25 | 0.60 | 0.85 |  |
| 103 | Seraphine | -0.26 | 0.72 | 0.98 | range (attacks) |
| 104 | Karthus | -0.26 | 0.33 | 0.59 |  |
| 105 | Aatrox | -0.26 | 0.18 | 0.44 |  |
| 106 | Yorick | -0.27 | 0.12 | 0.39 |  |
| 107 | Ekko | -0.27 | 0.00 | 0.27 |  |
| 108 | Azir | -0.28 | 0.55 | 0.83 |  |
| 109 | Orianna | -0.28 | 0.55 | 0.83 |  |
| 110 | Irelia | -0.29 | 0.13 | 0.42 |  |
| 111 | Ivern | -0.30 | 0.33 | 0.63 |  |
| 112 | Varus | -0.31 | 0.65 | 0.96 | range (attacks) |
| 113 | Darius | -0.31 | 0.11 | 0.42 |  |
| 114 | Trundle | -0.31 | 0.11 | 0.42 |  |
| 115 | Maokai | -0.32 | 0.82 | 1.14 |  |
| 116 | Jhin | -0.32 | 0.50 | 0.82 | range (attacks) |
| 117 | Nami | -0.33 | 0.64 | 0.97 |  |
| 118 | Shyvana | -0.34 | 0.19 | 0.53 |  |
| 119 | Volibear | -0.38 | 0.25 | 0.63 |  |
| 120 | Kled | -0.39 | 0.78 | 1.17 |  |
| 121 | Katarina | -0.39 | 0.12 | 0.51 |  |
| 122 | Sylas | -0.40 | 0.13 | 0.53 |  |
| 123 | Fiddlesticks | -0.41 | 0.64 | 1.05 |  |
| 124 | Kayn | -0.42 | 0.65 | 1.07 |  |
| 125 | Xin Zhao | -0.42 | 0.57 | 0.99 |  |
| 126 | Zyra | -0.42 | 0.56 | 0.98 |  |
| 127 | Ryze | -0.42 | 0.45 | 0.87 |  |
| 128 | Riven | -0.42 | 0.28 | 0.70 |  |
| 129 | Yasuo | -0.46 | 0.42 | 0.88 |  |
| 130 | Nilah | -0.47 | 0.33 | 0.80 |  |
| 131 | Neeko | -0.49 | 0.49 | 0.98 |  |
| 132 | Aurelion Sol | -0.50 | 0.62 | 1.12 |  |
| 133 | Braum | -0.51 | 0.44 | 0.95 |  |
| 134 | Lillia | -0.59 | 0.24 | 0.83 |  |
| 135 | Pyke | -0.60 | 0.28 | 0.88 |  |
| 136 | Urgot | -0.61 | 0.43 | 1.04 |  |
| 137 | Janna | -0.62 | 0.88 | 1.50 | range (attacks) |
| 138 | Camille | -0.63 | 0.63 | 1.26 |  |
| 139 | Rell | -0.63 | 0.61 | 1.24 |  |
| 140 | Rakan | -0.66 | 0.39 | 1.05 |  |
| 141 | Pantheon | -0.70 | 0.51 | 1.21 |  |
| 142 | Malphite | -0.72 | 0.32 | 1.04 |  |
| 143 | Skarner | -0.72 | 0.24 | 0.96 |  |
| 144 | Diana | -0.72 | 0.08 | 0.80 |  |
| 145 | Wukong | -0.72 | 0.08 | 0.80 |  |
| 146 | Lee Sin | -0.75 | 0.08 | 0.83 |  |
| 147 | Sejuani | -0.77 | 0.38 | 1.15 |  |
| 148 | Shen | -0.79 | 0.40 | 1.19 |  |
| 149 | K'Sante | -0.83 | 0.51 | 1.34 |  |
| 150 | Yone | -0.84 | 0.38 | 1.22 |  |
| 151 | Nunu & Willump | -0.84 | 0.31 | 1.15 |  |
| 152 | Leona | -0.85 | 0.26 | 1.11 |  |
| 153 | Amumu | -0.86 | 0.20 | 1.06 |  |
| 154 | Qiyana | -0.90 | 0.08 | 0.98 |  |
| 155 | Sett | -0.91 | 0.27 | 1.18 |  |
| 156 | Ornn | -0.93 | 0.36 | 1.29 |  |
| 157 | Ambessa | -0.95 | 0.08 | 1.03 |  |
| 158 | Rammus | -0.96 | 0.57 | 1.53 |  |
| 159 | Taliyah | -0.99 | 0.82 | 1.81 |  |
| 160 | Nautilus | -1.00 | 0.08 | 1.08 |  |
| 161 | Naafiri | -1.02 | 0.00 | 1.02 |  |
| 162 | Jarvan IV | -1.06 | 0.14 | 1.20 |  |
| 163 | Gragas | -1.09 | 0.20 | 1.29 |  |
| 164 | Hecarim | -1.09 | 0.14 | 1.23 |  |
| 165 | Briar | -1.18 | 0.08 | 1.26 |  |
| 166 | Poppy | -1.18 | 0.08 | 1.26 |  |
| 167 | Tahm Kench | -1.23 | 0.39 | 1.62 |  |
| 168 | Viego | -1.23 | 0.29 | 1.52 |  |
| 169 | Warwick | -1.25 | 0.81 | 2.06 |  |
| 170 | Zac | -1.29 | 0.37 | 1.66 |  |
| 171 | Vi | -1.47 | 0.32 | 1.79 |  |
| 172 | Galio | -1.66 | 0.35 | 2.01 |  |
