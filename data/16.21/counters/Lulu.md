# Counters to Lulu (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Lulu: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Lulu wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Lulu --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.82 | +1.00 | +1.00 | +1.00 | +0.28 | – | +0.00 |
| 2 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 3 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 4 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 5 | Dr. Mundo | +0.78 | +0.98 | +0.99 | +1.00 | −0.07 | +1.00 | +0.00 |
| 6 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.01 |
| 7 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 8 | Heimerdinger | +0.73 | +0.81 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 9 | Poppy | +0.61 | +1.00 | +1.00 | +0.00 | +0.06 | +1.00 | +0.00 |
| 10 | Maokai | +0.55 | +1.00 | +0.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 11 | Teemo | +0.46 | +1.00 | +1.00 | −0.37 | −0.06 | – | +0.00 |
| 12 | Fiora | +0.43 | +0.99 | +0.31 | +0.00 | −0.30 | +1.00 | +1.00 |
| 13 | Sylas | +0.42 | +1.00 | +0.90 | −1.00 | +0.31 | +1.00 | +0.00 |
| 14 | Corki | +0.17 | +0.34 | +0.90 | −0.82 | +0.06 | – | +0.00 |
| 15 | Twisted Fate | +0.10 | +0.87 | +0.30 | −1.00 | −0.04 | – | +0.00 |
| 16 | Anivia | +0.07 | +0.19 | +0.07 | +0.07 | −0.12 | – | +0.00 |
| 17 | Annie | +0.03 | −0.08 | +0.09 | +0.11 | +0.01 | – | +0.00 |
| 18 | Tahm Kench | +0.02 | −0.06 | −0.03 | +0.10 | −0.05 | +0.28 | +0.00 |
| 19 | Zac | +0.00 | −0.12 | +0.14 | −0.16 | −0.10 | +0.47 | +0.00 |
| 20 | Master Yi | −0.10 | +0.00 | −1.00 | +0.00 | −0.01 | +1.00 | +1.00 |
| 21 | Taric | −0.18 | −0.23 | −0.22 | −0.20 | −0.02 | −0.22 | +0.00 |
| 22 | Ivern | −0.29 | −0.48 | −0.36 | −0.09 | −0.21 | – | +0.00 |
| 23 | Yasuo | −0.32 | −0.86 | −0.69 | −0.12 | −0.04 | +0.98 | +0.00 |
| 24 | Gwen | −0.35 | −0.61 | −0.98 | −0.04 | −0.34 | +1.00 | +0.00 |
| 25 | Olaf | −0.43 | −1.00 | −1.00 | +1.00 | −0.19 | −1.00 | +0.00 |
| 26 | Mordekaiser | −0.44 | −0.56 | −0.82 | −0.80 | −0.10 | +0.84 | +0.00 |
| 27 | Zaahen | −0.45 | −1.00 | −0.65 | −0.56 | −0.18 | +1.00 | +0.00 |
| 28 | Gragas | −0.52 | −1.00 | −1.00 | +0.00 | −0.07 | −0.06 | +0.00 |
| 29 | Kennen | −0.53 | −1.00 | −1.00 | +0.19 | −0.08 | – | +0.00 |
| 30 | Trundle | −0.58 | −1.00 | −1.00 | −1.00 | −0.17 | +1.00 | +1.00 |
| 31 | Diana | −0.59 | −1.00 | −1.00 | −1.00 | +0.06 | +1.00 | +0.00 |
| 32 | Xin Zhao | −0.60 | −0.95 | −1.00 | −0.82 | −0.11 | +0.70 | +0.00 |
| 33 | Camille | −0.60 | −1.00 | −1.00 | −1.00 | −0.00 | +1.00 | +0.00 |
| 34 | Lee Sin | −0.61 | −1.00 | −1.00 | −1.00 | −0.05 | +1.00 | +0.00 |
| 35 | Jax | −0.61 | −1.00 | −1.00 | −1.00 | −0.05 | +1.00 | +0.00 |
| 36 | Sion | −0.61 | −1.00 | −1.00 | −1.00 | −0.06 | +1.00 | +0.00 |
| 37 | Kled | −0.61 | −1.00 | −1.00 | −1.00 | −0.08 | +1.00 | +0.00 |
| 38 | Tryndamere | −0.61 | −1.00 | −1.00 | −1.00 | −0.09 | +1.00 | +0.00 |
| 39 | Rammus | −0.62 | −1.00 | −1.00 | −1.00 | −0.10 | +1.00 | +0.00 |
| 40 | Volibear | −0.62 | −1.00 | −1.00 | −1.00 | −0.11 | +1.00 | +0.00 |
| 41 | Sejuani | −0.62 | −1.00 | −1.00 | −1.00 | −0.11 | +1.00 | +0.00 |
| 42 | Darius | −0.62 | −1.00 | −1.00 | −1.00 | −0.11 | +1.00 | +0.00 |
| 43 | Kassadin | −0.62 | −1.00 | −1.00 | −1.00 | −0.13 | +1.00 | +0.00 |
| 44 | Shyvana | −0.62 | −1.00 | −1.00 | −1.00 | −0.15 | +1.00 | +0.00 |
| 45 | Ambessa | −0.63 | −1.00 | −1.00 | −1.00 | −0.17 | +1.00 | +0.00 |
| 46 | Nocturne | −0.63 | −1.00 | −1.00 | −1.00 | −0.16 | +0.99 | +0.00 |
| 47 | Warwick | −0.63 | −1.00 | −1.00 | −1.00 | −0.21 | +1.00 | +0.00 |
| 48 | Bel'Veth | −0.63 | −1.00 | −1.00 | −1.00 | −0.05 | +0.74 | +0.00 |
| 49 | Tristana | −0.64 | −1.00 | −1.00 | −1.00 | +0.01 | +0.63 | +0.00 |
| 50 | Amumu | −0.65 | −1.00 | −1.00 | −1.00 | −0.05 | +0.53 | +0.00 |
| 51 | Orianna | −0.67 | −0.85 | −0.74 | −1.00 | −0.03 | – | +0.00 |
| 52 | Viego | −0.69 | −1.00 | −1.00 | −1.00 | −0.09 | +0.27 | +0.00 |
| 53 | Ashe | −0.70 | −1.00 | −0.72 | −1.00 | −0.02 | – | +0.00 |
| 54 | Jayce | −0.70 | −1.00 | −1.00 | −0.49 | −0.03 | −1.00 | +0.00 |
| 55 | Graves | −0.70 | −1.00 | −1.00 | −1.00 | +0.07 | −0.13 | +0.00 |
| 56 | Gangplank | −0.71 | −1.00 | −1.00 | −1.00 | −0.24 | +0.30 | +0.00 |
| 57 | Malphite | −0.71 | −1.00 | −1.00 | −1.00 | −0.08 | +0.00 | +0.00 |
| 58 | Udyr | −0.72 | −1.00 | −1.00 | −1.00 | −0.09 | −0.03 | +0.00 |
| 59 | Lillia | −0.72 | −1.00 | −1.00 | −1.00 | −0.05 | −0.10 | +0.00 |
| 60 | Quinn | −0.72 | −1.00 | −0.78 | −1.00 | −0.04 | – | +0.00 |
| 61 | Irelia | −0.72 | −1.00 | −1.00 | −1.00 | +0.01 | −0.27 | +0.00 |
| 62 | Aurelion Sol | −0.73 | −1.00 | −1.00 | −1.00 | +0.32 | – | +0.00 |
| 63 | Rengar | −0.74 | −1.00 | −1.00 | −1.00 | +0.40 | −1.00 | +0.00 |
| 64 | Vel'Koz | −0.74 | −1.00 | −1.00 | −1.00 | +0.22 | – | +0.00 |
| 65 | Kayn | −0.76 | −1.00 | −1.00 | −1.00 | −0.08 | −0.46 | +0.00 |
| 66 | Milio | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 67 | Ziggs | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 68 | Samira | −0.77 | −1.00 | −1.00 | −0.93 | −0.02 | – | +0.00 |
| 69 | Swain | −0.77 | −0.97 | −0.97 | −1.00 | −0.02 | – | +0.00 |
| 70 | Zeri | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 71 | Garen | −0.77 | −1.00 | −1.00 | −1.00 | −0.08 | −0.60 | +0.00 |
| 72 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 73 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 74 | Mel | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 75 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 76 | Smolder | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 77 | Jinx | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 78 | Xerath | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 79 | Yunara | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 80 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 81 | Karma | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 82 | Zyra | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 83 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 84 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 85 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 86 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 87 | Jhin | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 88 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 89 | Aphelios | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 90 | Fiddlesticks | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 91 | Aurora | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 92 | Ezreal | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 93 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 94 | Lux | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 95 | Malzahar | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 96 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 97 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 98 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 99 | Hwei | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 100 | Draven | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 101 | Zoe | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 102 | Varus | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 103 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 104 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 105 | Xayah | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 106 | Azir | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 107 | Nidalee | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 108 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 109 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 110 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 111 | Neeko | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 112 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 113 | Zilean | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 114 | Renata Glasc | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 115 | Kalista | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 116 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 117 | Bard | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 118 | Kai'Sa | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 119 | Elise | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 120 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 121 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 122 | Brand | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 123 | Kindred | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 124 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 125 | Ahri | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 126 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 127 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 128 | Jarvan IV | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 129 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 130 | Fizz | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 131 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 132 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 133 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 134 | Vi | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 135 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 136 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 137 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 138 | Gnar | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 139 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 140 | Rek'Sai | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 141 | Urgot | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.04 |
| 142 | Sett | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 143 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 144 | Braum | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 145 | Rumble | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | −0.92 | +0.00 |
| 146 | Illaoi | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −0.99 | +0.00 |
| 147 | Nilah | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 148 | Rakan | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 149 | Morgana | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 150 | Pantheon | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 151 | Ornn | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 152 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 153 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 154 | Cho'Gath | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 155 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 156 | Alistar | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 157 | Renekton | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 158 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 159 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 160 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 161 | Shaco | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 162 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 163 | Singed | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 164 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 165 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 166 | Zed | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 167 | Riven | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 168 | Yone | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 169 | Wukong | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |
| 170 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 171 | Aatrox | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |
| 172 | Briar | −0.85 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Lulu's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Lulu's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Lulu` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Lissandra (net +0.76)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Lulu's Wild Growth. Untargetable for 2.5 s, long enough to use ahead of Wild Growth. (Lissandra R Frozen Tomb → Lulu R Wild Growth)
- **0.24** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Lulu's Whimsy. Untargetable for 2.5 s, long enough to use ahead of Whimsy. (Lissandra R Frozen Tomb → Lulu W Whimsy)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Lulu's Help, Pix!. Untargetable for 2.5 s, long enough to use ahead of Help, Pix!. (Lissandra R Frozen Tomb → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Lissandra for 2 s: no basic attacks.

#### 2. Vladimir (net +0.64)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lulu's Wild Growth. Untargetable for 2 s, long enough to use ahead of Wild Growth. (Vladimir W Sanguine Pool → Lulu R Wild Growth)
- **0.45** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lulu's Whimsy. Untargetable for 2 s, long enough to use ahead of Whimsy. (Vladimir W Sanguine Pool → Lulu W Whimsy)
- **0.32** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lulu's Help, Pix!. Untargetable for 2 s, long enough to use ahead of Help, Pix!. (Vladimir W Sanguine Pool → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Vladimir for 2 s: no basic attacks.

#### 3. Bard (net +0.61)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Lulu's Wild Growth. Untargetable for 2.5 s, long enough to use ahead of Wild Growth. (Bard R Tempered Fate → Lulu R Wild Growth)
- **0.24** untargetable: Tempered Fate makes Bard untargetable, dodging Lulu's Whimsy. Untargetable for 2.5 s, long enough to use ahead of Whimsy. (Bard R Tempered Fate → Lulu W Whimsy)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Lulu's Help, Pix!. Untargetable for 2.5 s, long enough to use ahead of Help, Pix!. (Bard R Tempered Fate → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Bard for 2 s: no basic attacks.

#### 4. Sivir (net +0.59)

- **0.80** spell shield: Spell Shield's spell shield blocks Lulu's Wild Growth. Spell shield for 1.5 s, long enough to use ahead of Wild Growth. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Lulu R Wild Growth)
- **0.45** spell shield: Spell Shield's spell shield blocks Lulu's Whimsy. Spell shield for 1.5 s, long enough to use ahead of Whimsy. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Lulu W Whimsy)
- **0.15** spell shield: Spell Shield's spell shield blocks part of Lulu's Help, Pix!. Spell shield for 1.5 s, long enough to use ahead of Help, Pix!. A spell shield blocks only the first enemy ability that reaches it. Spell shield and Riposte will block the damage but Pix will still follow regardless. {{{{{1<noinclude>|Ability data</noinclude>}}}|Help, Pix!|{{{2|}}}|{{{3|}}}|{{{4|}}}|{{{5|}}}
|champion     = Lulu
|skill        = E
|icon         = Help, Pix!.png
|blurb        = {{sbc|Active:}} {{ci|Lulu}} can cast ''Help, Pix!'' on herself or a unit.
|blurb2      = {{sbc|Enemy cast:}} '''Lulu''' sends '''{{ai|Pix, Faerie Companion|Lulu|Pix}}''' to the target for a few seconds, dealing {{as|magic damage}} and {{tip|true sight|revealing}} them.
|blurb3      = {{sbc|Ally cast:}} '''Lulu''' sends '''{{ai|Pix, Faerie Companion|Lulu|Pix}}''' to the target, {{tip|shield|shielding}} them for a short time if they are a {{tip|champion}}.
|description  = {{sbc|Active:}} '''Lulu''' can cast ''Help, Pix!'' on herself or an ally or enemy.
|description2 = {{sbc|Enemy Cast:}} '''Lulu''' sends ''{{ai|Pix, Faerie Companion|Lulu|Pix}}'' to the far side of the target enemy for 4 seconds, dealing {{as|magic damage}} and {{tip|true sight|revealing}} them for the same duration.
|leveling2    = {{st|Magic Damage|{{ap|70 to 230}} {{as|(+ 50% AP)}}}}
|description3 = {{sbc|Self / Ally Cast:}} '''Lulu''' sends ''{{ai|Pix, Faerie Companion|Lulu|Pix}}'' to the target ally for {{fd|6.25}} seconds. If the target is a {{tip|champion}}, they are granted a {{tip|shield}} for {{fd|2.5}} seconds.
|leveling3    = {{st|Shield Strength|{{ap|70 to 230}} {{as|(+ 50% AP)}}}}
|cooldown     = {{ap|10 to 8}}
|cost         = {{ap|60 to 80}}
|costtype     = Mana
|cast time = none
|target range = {{tip|cr|icononly = true}} 650
|targeting    = Unit
|affects      = Enemies / Allies / Self
|damagetype   = Magic
|spellshield  = special
|spelleffects = spell
|projectile   = False
|callforhelp  = true
|grounded     = 
|knockdown    = 
|notes        = 
* ''Help, Pix!'' can be [[Self-targeted|self-cast]].
* If the player casts ''Help, Pix!'' on a non-champion target, the spell script will first search for a targetable allied or enemy champion within {{tip|cr|icononly = true}} 75 radius around the target. If there is at least one, it'll apply the effects to the closest one instead of the initial target.
** {{pending for test}} Allies or enemies or proximity take priortity?
** This effect does not respect that the champion may not be visible to '''Lulu''' and not a valid target for normal selection for this reason. Therefore it can for instance apply the effects to stealthed enemy champions this way.{{bug}}
** Since the original cast did not target the champion, some effects (such as {{ri|Guardian}}) may behave incorrectly.{{bug}}
** It is not known in which patch this effect was added.
* {{tip|spell shield|Spell shield}} and {{ai|Riposte|Fiora}} will block the damage but '''Pix''' will still follow regardless.
* ''Pix'' will continue to assist the target ally for the full duration even if the shield breaks (the same applies for the shield if the target ally leaves ''Pix's'' leash range).
* ''Pix's'' {{ai|Glitterlance|Lulu}} bolt can be fired while he is away from '''Lulu''' from his location and towards the cursor (effectively extending {{ais|Glitterlance|Lulu}} range).
}}. (Sivir E Spell Shield → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Sivir for 2 s: no basic attacks.

#### 5. Morgana (net +0.55)

- **0.80** cc immunity: Black Shield makes Morgana immune to Lulu's Wild Growth (airborne, slow). Immune for 5 s, long enough to use ahead of Wild Growth. (Morgana E Black Shield → Lulu R Wild Growth)
- **0.27** cc immunity: Black Shield makes Morgana immune to Lulu's Whimsy (disarm, polymorph, slow). Immune for 5 s, long enough to use ahead of Whimsy. (Morgana E Black Shield → Lulu W Whimsy)
- **0.07** cc immunity: Black Shield makes Morgana immune to Lulu's Glitterlance (slow). Immune for 5 s, long enough to use ahead of Glitterlance. (Morgana E Black Shield → Lulu Q Glitterlance)
- Watch out: Whimsy disarms Morgana for 2 s: no basic attacks.

#### 6. Xayah (net +0.51)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Lulu's Wild Growth. Untargetable for 1.5 s, long enough to use ahead of Wild Growth. (Xayah R Featherstorm → Lulu R Wild Growth)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Lulu's Whimsy. Untargetable for 1.5 s, long enough to use ahead of Whimsy. (Xayah R Featherstorm → Lulu W Whimsy)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Lulu's Help, Pix!. Untargetable for 1.5 s, long enough to use ahead of Help, Pix!. (Xayah R Featherstorm → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Xayah for 2 s: no basic attacks.

#### 7. Rek'Sai (net +0.48)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Lulu's Wild Growth. Untargetable for 1.5 s, long enough to use ahead of Wild Growth. (Rek'Sai R Void Rush → Lulu R Wild Growth)
- **0.24** untargetable: Void Rush makes Rek'Sai untargetable, dodging Lulu's Whimsy. Untargetable for 1.5 s, long enough to use ahead of Whimsy. (Rek'Sai R Void Rush → Lulu W Whimsy)
- **0.21** untargetable: Void Rush makes Rek'Sai untargetable, dodging Lulu's Help, Pix!. Untargetable for 1.5 s, long enough to use ahead of Help, Pix!. (Rek'Sai R Void Rush → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Rek'Sai for 2 s: no basic attacks.

#### 8. Nocturne (net +0.43)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Lulu's Wild Growth. Spell shield for 1.5 s, long enough to use ahead of Wild Growth. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Lulu R Wild Growth)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Lulu's Whimsy. Spell shield for 1.5 s, long enough to use ahead of Whimsy. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Lulu W Whimsy)
- **0.18** spell shield: Shroud of Darkness's spell shield blocks part of Lulu's Help, Pix!. Spell shield for 1.5 s, long enough to use ahead of Help, Pix!. A spell shield blocks only the first enemy ability that reaches it. Spell shield and Riposte will block the damage but Pix will still follow regardless. {{{{{1<noinclude>|Ability data</noinclude>}}}|Help, Pix!|{{{2|}}}|{{{3|}}}|{{{4|}}}|{{{5|}}}
|champion     = Lulu
|skill        = E
|icon         = Help, Pix!.png
|blurb        = {{sbc|Active:}} {{ci|Lulu}} can cast ''Help, Pix!'' on herself or a unit.
|blurb2      = {{sbc|Enemy cast:}} '''Lulu''' sends '''{{ai|Pix, Faerie Companion|Lulu|Pix}}''' to the target for a few seconds, dealing {{as|magic damage}} and {{tip|true sight|revealing}} them.
|blurb3      = {{sbc|Ally cast:}} '''Lulu''' sends '''{{ai|Pix, Faerie Companion|Lulu|Pix}}''' to the target, {{tip|shield|shielding}} them for a short time if they are a {{tip|champion}}.
|description  = {{sbc|Active:}} '''Lulu''' can cast ''Help, Pix!'' on herself or an ally or enemy.
|description2 = {{sbc|Enemy Cast:}} '''Lulu''' sends ''{{ai|Pix, Faerie Companion|Lulu|Pix}}'' to the far side of the target enemy for 4 seconds, dealing {{as|magic damage}} and {{tip|true sight|revealing}} them for the same duration.
|leveling2    = {{st|Magic Damage|{{ap|70 to 230}} {{as|(+ 50% AP)}}}}
|description3 = {{sbc|Self / Ally Cast:}} '''Lulu''' sends ''{{ai|Pix, Faerie Companion|Lulu|Pix}}'' to the target ally for {{fd|6.25}} seconds. If the target is a {{tip|champion}}, they are granted a {{tip|shield}} for {{fd|2.5}} seconds.
|leveling3    = {{st|Shield Strength|{{ap|70 to 230}} {{as|(+ 50% AP)}}}}
|cooldown     = {{ap|10 to 8}}
|cost         = {{ap|60 to 80}}
|costtype     = Mana
|cast time = none
|target range = {{tip|cr|icononly = true}} 650
|targeting    = Unit
|affects      = Enemies / Allies / Self
|damagetype   = Magic
|spellshield  = special
|spelleffects = spell
|projectile   = False
|callforhelp  = true
|grounded     = 
|knockdown    = 
|notes        = 
* ''Help, Pix!'' can be [[Self-targeted|self-cast]].
* If the player casts ''Help, Pix!'' on a non-champion target, the spell script will first search for a targetable allied or enemy champion within {{tip|cr|icononly = true}} 75 radius around the target. If there is at least one, it'll apply the effects to the closest one instead of the initial target.
** {{pending for test}} Allies or enemies or proximity take priortity?
** This effect does not respect that the champion may not be visible to '''Lulu''' and not a valid target for normal selection for this reason. Therefore it can for instance apply the effects to stealthed enemy champions this way.{{bug}}
** Since the original cast did not target the champion, some effects (such as {{ri|Guardian}}) may behave incorrectly.{{bug}}
** It is not known in which patch this effect was added.
* {{tip|spell shield|Spell shield}} and {{ai|Riposte|Fiora}} will block the damage but '''Pix''' will still follow regardless.
* ''Pix'' will continue to assist the target ally for the full duration even if the shield breaks (the same applies for the shield if the target ally leaves ''Pix's'' leash range).
* ''Pix's'' {{ai|Glitterlance|Lulu}} bolt can be fired while he is away from '''Lulu''' from his location and towards the cursor (effectively extending {{ais|Glitterlance|Lulu}} range).
}}. (Nocturne W Shroud of Darkness → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Nocturne for 2 s: no basic attacks.

#### 9. Fizz (net +0.35)

- **0.48** untargetable: Playful makes Fizz untargetable, dodging Lulu's Wild Growth. Untargetable for 0.75 s; Wild Growth lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Lulu R Wild Growth)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Lulu's Whimsy. Untargetable for 0.75 s; Whimsy takes 0.53 s to land, enough to react. (Fizz E Playful → Lulu W Whimsy)
- **0.27** untargetable: Playful makes Fizz untargetable, dodging Lulu's Help, Pix!. Untargetable for 0.75 s; Help, Pix! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Lulu E Help, Pix!)
- Watch out: Whimsy disarms Fizz for 2 s: no basic attacks.

#### 10. Mel (net +0.33)

- **0.37** projectile block: Rebuttal blocks Lulu's Whimsy, a projectile. Rebuttal for 0.75 s; Whimsy takes 0.53 s to land, enough to react. (Mel W Rebuttal → Lulu W Whimsy)
- **0.30** projectile block: Rebuttal blocks Lulu's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Lulu basic attacks)
- **0.25** projectile block: Rebuttal blocks Lulu's Glitterlance, a projectile. Rebuttal for 0.75 s; Glitterlance takes 0.91 s to land, enough to react. (Mel W Rebuttal → Lulu Q Glitterlance)
- Watch out: Whimsy disarms Mel for 2 s: no basic attacks.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Lissandra | +0.76 | 0.97 | 0.21 |  |
| 2 | Vladimir | +0.64 | 1.11 | 0.47 |  |
| 3 | Bard | +0.61 | 0.97 | 0.36 |  |
| 4 | Sivir | +0.59 | 1.06 | 0.47 |  |
| 5 | Morgana | +0.55 | 0.95 | 0.40 |  |
| 6 | Xayah | +0.51 | 0.87 | 0.36 |  |
| 7 | Rek'Sai | +0.48 | 0.98 | 0.50 |  |
| 8 | Nocturne | +0.43 | 1.15 | 0.72 |  |
| 9 | Fizz | +0.35 | 0.77 | 0.42 |  |
| 10 | Mel | +0.33 | 0.58 | 0.25 |  |
| 11 | Samira | +0.32 | 0.62 | 0.30 | projectile block (Blade Whirl) |
| 12 | Kalista | +0.28 | 0.58 | 0.30 |  |
| 13 | Yasuo | +0.23 | 0.72 | 0.49 | projectile block (Wind Wall) |
| 14 | Udyr | +0.21 | 0.96 | 0.75 |  |
| 15 | Fiora | +0.20 | 0.86 | 0.66 |  |
| 16 | Braum | +0.17 | 0.83 | 0.66 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 17 | Aurora | +0.16 | 0.58 | 0.42 |  |
| 18 | Maokai | +0.15 | 0.76 | 0.61 |  |
| 19 | Master Yi | +0.07 | 0.97 | 0.90 |  |
| 20 | Camille | +0.07 | 0.61 | 0.54 |  |
| 21 | Evelynn | +0.06 | 0.63 | 0.57 |  |
| 22 | Zed | +0.06 | 0.57 | 0.51 |  |
| 23 | Gwen | +0.05 | 0.75 | 0.70 |  |
| 24 | Alistar | +0.05 | 0.71 | 0.66 |  |
| 25 | Teemo | +0.05 | 0.47 | 0.42 | blind (Blinding Dart) |
| 26 | Zaahen | +0.04 | 0.56 | 0.52 |  |
| 27 | Kled | -0.05 | 0.48 | 0.53 |  |
| 28 | Tristana | -0.07 | 0.27 | 0.34 |  |
| 29 | Heimerdinger | -0.07 | 0.12 | 0.19 |  |
| 30 | Kayle | -0.10 | 0.24 | 0.34 |  |
| 31 | Shaco | -0.11 | 0.63 | 0.74 |  |
| 32 | Annie | -0.13 | 0.08 | 0.21 |  |
| 33 | Milio | -0.16 | 0.20 | 0.36 |  |
| 34 | Vex | -0.17 | 0.08 | 0.25 |  |
| 35 | Sion | -0.18 | 0.89 | 1.07 |  |
| 36 | Swain | -0.19 | 0.00 | 0.19 |  |
| 37 | Olaf | -0.20 | 0.88 | 1.08 |  |
| 38 | Ahri | -0.21 | 0.00 | 0.21 |  |
| 39 | Brand | -0.21 | 0.00 | 0.21 |  |
| 40 | Cassiopeia | -0.21 | 0.00 | 0.21 |  |
| 41 | Hwei | -0.21 | 0.00 | 0.21 |  |
| 42 | Karma | -0.21 | 0.00 | 0.21 |  |
| 43 | Nami | -0.21 | 0.00 | 0.21 |  |
| 44 | Syndra | -0.21 | 0.00 | 0.21 |  |
| 45 | Gangplank | -0.22 | 0.77 | 0.99 |  |
| 46 | Anivia | -0.22 | 0.00 | 0.22 |  |
| 47 | Veigar | -0.22 | 0.00 | 0.22 |  |
| 48 | Zyra | -0.22 | 0.00 | 0.22 |  |
| 49 | Aphelios | -0.24 | 0.12 | 0.36 |  |
| 50 | Azir | -0.25 | 0.00 | 0.25 |  |
| 51 | Orianna | -0.25 | 0.00 | 0.25 |  |
| 52 | Soraka | -0.25 | 0.00 | 0.25 |  |
| 53 | Ziggs | -0.25 | 0.00 | 0.25 |  |
| 54 | Jinx | -0.27 | 0.00 | 0.27 |  |
| 55 | Kennen | -0.27 | 0.00 | 0.27 |  |
| 56 | Kog'Maw | -0.27 | 0.00 | 0.27 |  |
| 57 | Lux | -0.27 | 0.00 | 0.27 |  |
| 58 | Seraphine | -0.27 | 0.00 | 0.27 |  |
| 59 | Jax | -0.28 | 0.38 | 0.66 |  |
| 60 | Nidalee | -0.28 | 0.00 | 0.28 |  |
| 61 | Thresh | -0.28 | 0.00 | 0.28 |  |
| 62 | LeBlanc | -0.29 | 0.00 | 0.29 |  |
| 63 | Corki | -0.30 | 0.00 | 0.30 |  |
| 64 | Elise | -0.30 | 0.00 | 0.30 |  |
| 65 | Ezreal | -0.30 | 0.00 | 0.30 |  |
| 66 | Jayce | -0.30 | 0.00 | 0.30 |  |
| 67 | Smolder | -0.30 | 0.00 | 0.30 |  |
| 68 | Viktor | -0.30 | 0.00 | 0.30 |  |
| 69 | Zilean | -0.30 | 0.00 | 0.30 |  |
| 70 | Zoe | -0.30 | 0.00 | 0.30 |  |
| 71 | Yuumi | -0.31 | 0.77 | 1.08 |  |
| 72 | Malphite | -0.31 | 0.32 | 0.63 |  |
| 73 | Aurelion Sol | -0.31 | 0.00 | 0.31 |  |
| 74 | Gnar | -0.32 | 0.00 | 0.32 |  |
| 75 | Neeko | -0.32 | 0.00 | 0.32 |  |
| 76 | Yone | -0.34 | 0.08 | 0.42 |  |
| 77 | Ashe | -0.34 | 0.00 | 0.34 |  |
| 78 | Draven | -0.34 | 0.00 | 0.34 |  |
| 79 | Yunara | -0.34 | 0.00 | 0.34 |  |
| 80 | Renata Glasc | -0.36 | 0.00 | 0.36 |  |
| 81 | Varus | -0.36 | 0.00 | 0.36 |  |
| 82 | Graves | -0.37 | 0.00 | 0.37 |  |
| 83 | Ornn | -0.39 | 0.08 | 0.47 |  |
| 84 | Sona | -0.39 | 0.00 | 0.39 |  |
| 85 | Ivern | -0.41 | 0.00 | 0.41 |  |
| 86 | Lillia | -0.41 | 0.00 | 0.41 |  |
| 87 | Senna | -0.41 | 0.00 | 0.41 |  |
| 88 | Zeri | -0.41 | 0.00 | 0.41 |  |
| 89 | Malzahar | -0.42 | 0.49 | 0.91 |  |
| 90 | K'Sante | -0.42 | 0.16 | 0.58 |  |
| 91 | Rakan | -0.42 | 0.00 | 0.42 |  |
| 92 | Nilah | -0.43 | 0.33 | 0.76 |  |
| 93 | Jarvan IV | -0.43 | 0.08 | 0.51 |  |
| 94 | Urgot | -0.43 | 0.00 | 0.43 |  |
| 95 | Hecarim | -0.44 | 0.08 | 0.52 |  |
| 96 | Sylas | -0.44 | 0.00 | 0.44 |  |
| 97 | Rengar | -0.45 | 0.77 | 1.22 |  |
| 98 | Volibear | -0.46 | 0.08 | 0.54 |  |
| 99 | Ambessa | -0.47 | 0.00 | 0.47 |  |
| 100 | Kai'Sa | -0.47 | 0.00 | 0.47 |  |
| 101 | Kindred | -0.47 | 0.00 | 0.47 |  |
| 102 | Lee Sin | -0.49 | 0.00 | 0.49 |  |
| 103 | Twitch | -0.51 | 0.00 | 0.51 |  |
| 104 | Rammus | -0.54 | 0.36 | 0.90 |  |
| 105 | Ekko | -0.54 | 0.00 | 0.54 |  |
| 106 | Vayne | -0.54 | 0.00 | 0.54 |  |
| 107 | Illaoi | -0.55 | 0.08 | 0.63 |  |
| 108 | Shyvana | -0.55 | 0.08 | 0.63 |  |
| 109 | Briar | -0.55 | 0.00 | 0.55 |  |
| 110 | Rell | -0.55 | 0.00 | 0.55 |  |
| 111 | Irelia | -0.57 | 0.00 | 0.57 |  |
| 112 | Caitlyn | -0.58 | 0.18 | 0.76 |  |
| 113 | Sett | -0.58 | 0.08 | 0.66 |  |
| 114 | Quinn | -0.58 | 0.00 | 0.58 |  |
| 115 | Kayn | -0.60 | 0.63 | 1.23 |  |
| 116 | Bel'Veth | -0.60 | 0.00 | 0.60 |  |
| 117 | Riven | -0.60 | 0.00 | 0.60 |  |
| 118 | Amumu | -0.61 | 0.00 | 0.61 |  |
| 119 | Diana | -0.61 | 0.00 | 0.61 |  |
| 120 | Akali | -0.62 | 0.00 | 0.62 |  |
| 121 | Kassadin | -0.63 | 0.00 | 0.63 |  |
| 122 | Leona | -0.63 | 0.00 | 0.63 |  |
| 123 | Nautilus | -0.64 | 0.00 | 0.64 |  |
| 124 | Xin Zhao | -0.65 | 0.10 | 0.75 |  |
| 125 | Nasus | -0.66 | 0.36 | 1.02 |  |
| 126 | Renekton | -0.66 | 0.00 | 0.66 |  |
| 127 | Sejuani | -0.66 | 0.00 | 0.66 |  |
| 128 | Jhin | -0.69 | 0.00 | 0.69 |  |
| 129 | Vel'Koz | -0.69 | 0.00 | 0.69 |  |
| 130 | Aatrox | -0.70 | 0.00 | 0.70 |  |
| 131 | Qiyana | -0.70 | 0.00 | 0.70 |  |
| 132 | Locke | -0.72 | 0.00 | 0.72 |  |
| 133 | Miss Fortune | -0.72 | 0.00 | 0.72 |  |
| 134 | Talon | -0.72 | 0.00 | 0.72 |  |
| 135 | Xerath | -0.73 | 0.00 | 0.73 |  |
| 136 | Tryndamere | -0.74 | 0.00 | 0.74 |  |
| 137 | Garen | -0.75 | 0.33 | 1.08 |  |
| 138 | Pyke | -0.76 | 0.00 | 0.76 |  |
| 139 | Lucian | -0.78 | 0.00 | 0.78 |  |
| 140 | Kha'Zix | -0.79 | 0.00 | 0.79 |  |
| 141 | Gragas | -0.80 | 0.00 | 0.80 |  |
| 142 | Ryze | -0.81 | 0.00 | 0.81 |  |
| 143 | Karthus | -0.85 | 0.00 | 0.85 |  |
| 144 | Warwick | -0.87 | 0.65 | 1.52 |  |
| 145 | Skarner | -0.87 | 0.15 | 1.02 |  |
| 146 | Vi | -0.87 | 0.08 | 0.95 |  |
| 147 | Viego | -0.87 | 0.08 | 0.95 |  |
| 148 | Akshan | -0.87 | 0.00 | 0.87 |  |
| 149 | Mordekaiser | -0.89 | 0.09 | 0.98 |  |
| 150 | Fiddlesticks | -0.89 | 0.00 | 0.89 |  |
| 151 | Wukong | -0.89 | 0.00 | 0.89 |  |
| 152 | Poppy | -0.91 | 0.00 | 0.91 |  |
| 153 | Twisted Fate | -0.93 | 0.00 | 0.93 |  |
| 154 | Shen | -0.96 | 0.36 | 1.32 |  |
| 155 | Janna | -0.97 | 0.00 | 0.97 |  |
| 156 | Singed | -0.97 | 0.00 | 0.97 |  |
| 157 | Cho'Gath | -0.99 | 0.00 | 0.99 |  |
| 158 | Rumble | -0.99 | 0.00 | 0.99 |  |
| 159 | Katarina | -1.00 | 0.00 | 1.00 |  |
| 160 | Darius | -1.02 | 0.00 | 1.02 |  |
| 161 | Dr. Mundo | -1.02 | 0.00 | 1.02 |  |
| 162 | Yorick | -1.04 | 0.00 | 1.04 |  |
| 163 | Blitzcrank | -1.06 | 0.00 | 1.06 |  |
| 164 | Zac | -1.06 | 0.00 | 1.06 |  |
| 165 | Trundle | -1.07 | 0.00 | 1.07 |  |
| 166 | Taric | -1.08 | 0.00 | 1.08 |  |
| 167 | Taliyah | -1.09 | 0.00 | 1.09 |  |
| 168 | Pantheon | -1.17 | 0.15 | 1.32 |  |
| 169 | Naafiri | -1.21 | 0.00 | 1.21 |  |
| 170 | Tahm Kench | -1.22 | 0.00 | 1.22 |  |
| 171 | Nunu & Willump | -1.30 | 0.29 | 1.59 |  |
| 172 | Galio | -1.45 | 0.00 | 1.45 |  |
