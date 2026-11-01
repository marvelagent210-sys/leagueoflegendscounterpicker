# Counters to Seraphine (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Seraphine: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Seraphine wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Seraphine --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Rengar | +0.86 | +1.00 | +1.00 | +1.00 | +0.42 | +1.00 | +0.00 |
| 2 | K'Sante | +0.85 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +1.00 |
| 3 | Sylas | +0.85 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | +0.00 |
| 4 | Aurelion Sol | +0.84 | +1.00 | +1.00 | +1.00 | +0.40 | – | +0.00 |
| 5 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +1.00 |
| 6 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 7 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +1.00 |
| 8 | Jarvan IV | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 9 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +1.00 |
| 10 | Olaf | +0.82 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.99 |
| 11 | Annie | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 12 | Diana | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 13 | Skarner | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 14 | Kled | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 15 | Kayle | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 16 | Graves | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 17 | Jhin | +0.82 | +1.00 | +1.00 | +1.00 | +0.23 | – | +0.00 |
| 18 | Vel'Koz | +0.82 | +1.00 | +1.00 | +1.00 | +0.23 | – | +0.00 |
| 19 | Gangplank | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.02 |
| 20 | Aphelios | +0.82 | +1.00 | +1.00 | +1.00 | +0.23 | – | +0.00 |
| 21 | Ashe | +0.81 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.27 |
| 22 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.50 |
| 23 | Xin Zhao | +0.81 | +1.00 | +0.97 | +1.00 | +0.11 | +1.00 | +0.00 |
| 24 | Nilah | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 25 | Ziggs | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 26 | Tristana | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 27 | Pantheon | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 28 | Irelia | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 29 | Caitlyn | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +0.95 | +0.00 |
| 30 | Nautilus | +0.81 | +0.99 | +0.99 | +1.00 | +0.07 | +1.00 | +0.00 |
| 31 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 32 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 33 | Lillia | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 34 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 35 | Camille | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 36 | Sejuani | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 37 | Shaco | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 38 | Gragas | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 39 | Tahm Kench | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 40 | Galio | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 41 | Xayah | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 42 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 43 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 44 | Jinx | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 45 | Illaoi | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 46 | Ryze | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 47 | Sion | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 48 | Cassiopeia | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 49 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 50 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 51 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 52 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 53 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 54 | Riven | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 55 | Twisted Fate | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 56 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 57 | Malphite | +0.79 | +0.98 | +0.98 | +1.00 | +0.01 | +1.00 | +0.00 |
| 58 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 59 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 60 | Rammus | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 61 | Yunara | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 62 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 63 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 64 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 65 | Miss Fortune | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 66 | Smolder | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 67 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 68 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 69 | Karma | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 70 | Ambessa | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 71 | Hecarim | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 72 | Viego | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 73 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 74 | Neeko | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 75 | Lee Sin | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 76 | Rumble | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 77 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 78 | Draven | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 79 | Aurora | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 80 | Varus | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 81 | Kayn | +0.78 | +1.00 | +0.99 | +1.00 | −0.08 | +1.00 | +0.00 |
| 82 | Viktor | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 83 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 84 | Kindred | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 85 | Shyvana | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 86 | Teemo | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 87 | Singed | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 88 | Kennen | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 89 | Zed | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 90 | Ahri | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 91 | Azir | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 92 | Sett | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 93 | Udyr | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 94 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 95 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 96 | Twitch | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 97 | Fiddlesticks | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 98 | Talon | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 99 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 100 | Zoe | +0.78 | +1.00 | +0.99 | +1.00 | +0.01 | – | +0.00 |
| 101 | Malzahar | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 102 | Samira | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 103 | Kai'Sa | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 104 | Akshan | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 105 | Vi | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 106 | Gwen | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 107 | Fizz | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 108 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 109 | Lucian | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 110 | Quinn | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 111 | Wukong | +0.77 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.00 |
| 112 | Briar | +0.76 | +0.99 | +1.00 | +1.00 | −0.23 | +1.00 | +0.00 |
| 113 | Warwick | +0.76 | +1.00 | +1.00 | +1.00 | −0.24 | +1.00 | +0.00 |
| 114 | Elise | +0.74 | +0.92 | +0.92 | +1.00 | +0.05 | – | +0.00 |
| 115 | Brand | +0.74 | +1.00 | +0.85 | +1.00 | +0.02 | – | +0.00 |
| 116 | Nidalee | +0.73 | +0.90 | +0.92 | +1.00 | +0.01 | – | +0.00 |
| 117 | Hwei | +0.72 | +0.90 | +0.86 | +1.00 | +0.07 | – | +0.00 |
| 118 | Mel | +0.72 | +0.77 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 119 | Lux | +0.72 | +0.89 | +0.87 | +1.00 | +0.06 | – | +0.00 |
| 120 | Alistar | +0.70 | +1.00 | +1.00 | +1.00 | −0.02 | +0.06 | +0.00 |
| 121 | Amumu | +0.68 | +0.98 | +0.55 | +1.00 | +0.02 | +0.96 | +0.00 |
| 122 | Zyra | +0.66 | +0.80 | +0.75 | +1.00 | +0.05 | – | +0.00 |
| 123 | Morgana | +0.65 | +0.77 | +0.77 | +1.00 | −0.00 | – | +0.00 |
| 124 | LeBlanc | +0.64 | +0.84 | +0.83 | +0.87 | −0.07 | – | +0.00 |
| 125 | Ezreal | +0.64 | +0.63 | +0.87 | +1.00 | +0.01 | – | +0.00 |
| 126 | Braum | +0.64 | +0.86 | +0.78 | +0.98 | −0.02 | +0.34 | +0.00 |
| 127 | Rek'Sai | +0.62 | +1.00 | +1.00 | +1.00 | −0.17 | −0.55 | +0.00 |
| 128 | Kalista | +0.59 | +0.70 | +0.70 | +1.00 | −0.14 | – | +0.00 |
| 129 | Milio | +0.58 | +1.00 | +1.00 | +0.00 | +0.16 | – | +0.00 |
| 130 | Swain | +0.58 | +0.74 | +0.51 | +1.00 | +0.07 | – | +0.00 |
| 131 | Rell | +0.57 | +1.00 | +0.20 | +1.00 | +0.10 | +0.55 | +0.00 |
| 132 | Rakan | +0.55 | +1.00 | +0.09 | +1.00 | −0.14 | +1.00 | +0.00 |
| 133 | Senna | +0.53 | +0.94 | +0.20 | +0.87 | +0.11 | – | +0.00 |
| 134 | Yone | +0.51 | +0.61 | +0.36 | +1.00 | −0.20 | +1.00 | +0.00 |
| 135 | Aatrox | +0.47 | −0.22 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 136 | Evelynn | +0.43 | +1.00 | +1.00 | −1.00 | +0.22 | +1.00 | +0.00 |
| 137 | Sivir | +0.35 | +1.00 | +1.00 | −0.83 | −0.10 | – | +0.00 |
| 138 | Urgot | +0.35 | −0.05 | +0.25 | +1.00 | +0.02 | +0.95 | +0.00 |
| 139 | Naafiri | +0.32 | −0.96 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 140 | Leona | +0.32 | +0.02 | +0.07 | +1.00 | +0.01 | +0.98 | +0.00 |
| 141 | Bard | +0.31 | −0.17 | +0.56 | +1.00 | −0.15 | – | +0.00 |
| 142 | Zilean | +0.30 | −0.71 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 143 | Akali | +0.30 | +0.57 | +0.63 | −0.32 | −0.03 | +0.68 | +0.00 |
| 144 | Kha'Zix | +0.28 | +1.00 | −1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 145 | Ekko | +0.28 | +1.00 | −0.24 | +1.00 | −0.09 | −1.00 | +0.00 |
| 146 | Zac | +0.24 | +0.20 | +0.26 | +0.45 | −0.08 | +0.44 | +0.00 |
| 147 | Shen | +0.22 | +0.01 | +0.09 | +1.00 | +0.01 | −0.04 | +0.00 |
| 148 | Janna | +0.21 | +0.46 | +0.97 | −0.86 | +0.03 | – | +0.00 |
| 149 | Sona | +0.20 | +0.97 | +0.52 | −1.00 | +0.05 | – | +0.00 |
| 150 | Ornn | +0.20 | +0.05 | +0.04 | +0.90 | −0.05 | +0.04 | +0.00 |
| 151 | Syndra | +0.14 | −0.11 | −0.20 | +1.00 | +0.05 | – | +0.00 |
| 152 | Soraka | +0.13 | +0.14 | +0.18 | +0.15 | +0.05 | – | +0.00 |
| 153 | Taric | +0.11 | +0.15 | +0.13 | +0.17 | +0.03 | +0.04 | +0.00 |
| 154 | Anivia | +0.10 | +0.08 | +0.23 | +0.10 | −0.06 | – | +0.00 |
| 155 | Garen | −0.06 | +1.00 | −0.71 | −1.00 | −0.00 | +0.68 | +0.00 |
| 156 | Karthus | −0.16 | −0.19 | −0.26 | −0.17 | +0.03 | – | +0.00 |
| 157 | Nami | −0.17 | −0.01 | −0.01 | −0.79 | +0.05 | – | +0.00 |
| 158 | Locke | −0.17 | +0.34 | +0.02 | −0.85 | −0.06 | −0.86 | +0.00 |
| 159 | Renata Glasc | −0.23 | −0.04 | −0.03 | −1.00 | +0.08 | – | +0.00 |
| 160 | Vladimir | −0.35 | −1.00 | −0.99 | +1.00 | −0.11 | – | +0.00 |
| 161 | Veigar | −0.38 | −0.08 | −0.53 | −0.94 | +0.01 | – | +0.00 |
| 162 | Xerath | −0.39 | −0.40 | −0.23 | −1.00 | +0.06 | – | +0.00 |
| 163 | Qiyana | −0.40 | −0.98 | −0.96 | +0.96 | −0.04 | −1.00 | +0.00 |
| 164 | Vex | −0.53 | −0.62 | −0.48 | −1.00 | −0.02 | – | +0.00 |
| 165 | Katarina | −0.71 | −0.85 | −1.00 | −0.85 | +0.01 | −0.83 | +0.00 |
| 166 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 167 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 168 | Nunu & Willump | −0.77 | −0.95 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 169 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 170 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 171 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 172 | Pyke | −0.85 | −0.96 | −1.00 | −1.00 | −0.38 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Seraphine's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Seraphine's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Seraphine` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Samira (net +1.14)

- **0.80** projectile block: Blade Whirl blocks Seraphine's Encore, a projectile. Blade Whirl for 0.75 s; Encore takes 1.31 s to land, enough to react. (Samira W Blade Whirl → Seraphine R Encore)
- **0.49** projectile block: Blade Whirl blocks Seraphine's Beat Drop, a projectile. Blade Whirl for 0.75 s; Beat Drop takes 1.33 s to land, enough to react. (Samira W Blade Whirl → Seraphine E Beat Drop)
- **0.25** projectile block: Blade Whirl blocks Seraphine's High Note, a projectile. Blade Whirl for 0.75 s; High Note takes 0.94 s to land, enough to react. (Samira W Blade Whirl → Seraphine Q High Note)

#### 2. Mel (net +1.12)

- **0.80** projectile block: Rebuttal blocks Seraphine's Encore, a projectile. Rebuttal for 0.75 s; Encore takes 1.31 s to land, enough to react. (Mel W Rebuttal → Seraphine R Encore)
- **0.46** projectile block: Rebuttal blocks Seraphine's Beat Drop, a projectile. Rebuttal for 0.75 s; Beat Drop takes 1.33 s to land, enough to react. (Mel W Rebuttal → Seraphine E Beat Drop)
- **0.24** projectile block: Rebuttal blocks Seraphine's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Seraphine basic attacks)

#### 3. Sivir (net +1.07)

- **0.80** spell shield: Spell Shield's spell shield blocks Seraphine's Encore. Spell shield for 1.5 s, long enough to use ahead of Encore. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Seraphine R Encore)
- **0.54** spell shield: Spell Shield's spell shield blocks Seraphine's Beat Drop. Spell shield for 1.5 s, long enough to use ahead of Beat Drop. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Seraphine E Beat Drop)

#### 4. Yasuo (net +1.02)

- **0.80** projectile block: Wind Wall blocks Seraphine's Encore, a projectile. Wind Wall for 4 s, long enough to use ahead of Encore. (Yasuo W Wind Wall → Seraphine R Encore)
- **0.55** projectile block: Wind Wall blocks Seraphine's Beat Drop, a projectile. Wind Wall for 4 s, long enough to use ahead of Beat Drop. (Yasuo W Wind Wall → Seraphine E Beat Drop)
- **0.31** projectile block: Wind Wall blocks Seraphine's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Seraphine basic attacks)
- Watch out: Seraphine's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

#### 5. Fizz (net +1.02)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Seraphine's Encore. Untargetable for 0.75 s; Encore takes 1.31 s to land, enough to react. (Fizz E Playful → Seraphine R Encore)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Seraphine's Beat Drop. Untargetable for 0.75 s; Beat Drop takes 1.33 s to land, enough to react. (Fizz E Playful → Seraphine E Beat Drop)
- Watch out: Seraphine's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

#### 6. Braum (net +1.01)

- **0.80** projectile block: Unbreakable blocks Seraphine's Encore, a projectile. Unbreakable for 4 s, long enough to use ahead of Encore. (Braum E Unbreakable → Seraphine R Encore)
- **0.70** projectile block: Unbreakable blocks Seraphine's Beat Drop, a projectile. Unbreakable for 4 s, long enough to use ahead of Beat Drop. (Braum E Unbreakable → Seraphine E Beat Drop)
- **0.41** projectile block: Unbreakable blocks Seraphine's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Seraphine basic attacks)
- Watch out: Seraphine's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

#### 7. Fiora (net +0.98)

- **0.90** parry: Riposte parries Seraphine's Encore and stuns back. Parry for 0.75 s; Encore takes 1.31 s to land, enough to react. Negating Encore's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Seraphine R Encore)
- **0.67** parry: Riposte parries Seraphine's Beat Drop and stuns back. Parry for 0.75 s; Beat Drop takes 1.33 s to land, enough to react. Negating Beat Drop's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Seraphine E Beat Drop)
- **0.07** attack speed slow: Riposte cuts Seraphine's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Seraphine basic attacks)
- Watch out: Seraphine's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range).

#### 8. Morgana (net +0.98)

- **0.80** cc immunity: Black Shield makes Morgana immune to Seraphine's Encore (charm, slow). Immune for 5 s, long enough to use ahead of Encore. (Morgana E Black Shield → Seraphine R Encore)
- **0.57** cc immunity: Black Shield makes Morgana immune to Seraphine's Beat Drop (slow, root, stun). Immune for 5 s, long enough to use ahead of Beat Drop. (Morgana E Black Shield → Seraphine E Beat Drop)
- Watch out: Seraphine's basic attacks reach 75 units farther than Morgana's (525 vs 450 attack range).

#### 9. Aurora (net +0.97)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Seraphine's Encore. Untargetable for 0.4 s; Encore takes 1.31 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Seraphine R Encore)
- **0.33** untargetable: Between Worlds makes Aurora untargetable, dodging Seraphine's Beat Drop. Untargetable for 0.4 s; Beat Drop takes 1.33 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Seraphine E Beat Drop)

#### 10. Bard (net +0.97)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Seraphine's Encore. Untargetable for 2.5 s, long enough to use ahead of Encore. (Bard R Tempered Fate → Seraphine R Encore)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Seraphine's Beat Drop. Untargetable for 2.5 s, long enough to use ahead of Beat Drop. (Bard R Tempered Fate → Seraphine E Beat Drop)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +1.14 | 1.14 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 2 | Mel | +1.12 | 1.12 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 3 | Sivir | +1.07 | 1.07 | 0.00 |  |
| 4 | Yasuo | +1.02 | 1.19 | 0.17 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 5 | Fizz | +1.02 | 1.15 | 0.13 |  |
| 6 | Braum | +1.01 | 1.30 | 0.29 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Fiora | +0.98 | 1.25 | 0.27 |  |
| 8 | Morgana | +0.98 | 1.09 | 0.11 |  |
| 9 | Aurora | +0.97 | 0.97 | 0.00 |  |
| 10 | Bard | +0.97 | 0.97 | 0.00 |  |
| 11 | Lissandra | +0.97 | 0.97 | 0.00 |  |
| 12 | Xayah | +0.97 | 0.97 | 0.00 |  |
| 13 | Maokai | +0.86 | 1.15 | 0.29 |  |
| 14 | Udyr | +0.86 | 1.15 | 0.29 |  |
| 15 | Kled | +0.86 | 0.96 | 0.10 |  |
| 16 | Vladimir | +0.85 | 1.09 | 0.24 |  |
| 17 | Nocturne | +0.84 | 1.13 | 0.29 |  |
| 18 | Camille | +0.83 | 0.97 | 0.14 |  |
| 19 | Milio | +0.81 | 0.81 | 0.00 |  |
| 20 | Gwen | +0.80 | 1.07 | 0.27 |  |
| 21 | Rek'Sai | +0.80 | 0.97 | 0.17 |  |
| 22 | Zaahen | +0.80 | 0.97 | 0.17 |  |
| 23 | Evelynn | +0.78 | 0.97 | 0.19 |  |
| 24 | Shaco | +0.78 | 0.97 | 0.19 |  |
| 25 | Zed | +0.78 | 0.97 | 0.19 |  |
| 26 | Kalista | +0.77 | 0.77 | 0.00 |  |
| 27 | Master Yi | +0.74 | 1.30 | 0.56 |  |
| 28 | Kayle | +0.67 | 0.67 | 0.00 |  |
| 29 | Alistar | +0.49 | 0.78 | 0.29 |  |
| 30 | Olaf | +0.39 | 0.97 | 0.58 |  |
| 31 | Teemo | +0.38 | 0.38 | 0.00 |  |
| 32 | Rengar | +0.34 | 0.92 | 0.58 |  |
| 33 | Yuumi | +0.33 | 1.15 | 0.82 |  |
| 34 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 35 | Gangplank | +0.31 | 0.89 | 0.58 |  |
| 36 | Lulu | +0.27 | 0.27 | 0.00 |  |
| 37 | Sion | +0.26 | 0.98 | 0.72 |  |
| 38 | Xin Zhao | +0.23 | 0.48 | 0.25 |  |
| 39 | Mordekaiser | +0.17 | 0.68 | 0.51 |  |
| 40 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 41 | Aphelios | +0.12 | 0.12 | 0.00 |  |
| 42 | Heimerdinger | +0.12 | 0.12 | 0.00 |  |
| 43 | Senna | +0.12 | 0.12 | 0.00 |  |
| 44 | Annie | +0.11 | 0.11 | 0.00 |  |
| 45 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 46 | Nilah | +0.05 | 0.27 | 0.22 |  |
| 47 | Garen | +0.02 | 0.53 | 0.51 |  |
| 48 | Jax | +0.02 | 0.31 | 0.29 |  |
| 49 | Varus | +0.02 | 0.18 | 0.16 |  |
| 50 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 51 | Azir | 0.00 | 0.00 | 0.00 |  |
| 52 | Brand | 0.00 | 0.00 | 0.00 |  |
| 53 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 54 | Corki | 0.00 | 0.00 | 0.00 |  |
| 55 | Draven | 0.00 | 0.00 | 0.00 |  |
| 56 | Elise | 0.00 | 0.00 | 0.00 |  |
| 57 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 58 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 59 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 60 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 61 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 62 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 63 | Karma | 0.00 | 0.00 | 0.00 |  |
| 64 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 65 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 66 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 67 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 68 | Lux | 0.00 | 0.00 | 0.00 |  |
| 69 | Nami | 0.00 | 0.00 | 0.00 |  |
| 70 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 71 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 72 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 73 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 74 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 75 | Sona | 0.00 | 0.00 | 0.00 |  |
| 76 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 77 | Swain | 0.00 | 0.00 | 0.00 |  |
| 78 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 79 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 80 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 81 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 82 | Vex | 0.00 | 0.00 | 0.00 |  |
| 83 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 84 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 85 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 86 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 87 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 88 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 89 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 90 | Kayn | -0.01 | 0.97 | 0.98 |  |
| 91 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 92 | Graves | -0.05 | 0.00 | 0.05 |  |
| 93 | Malphite | -0.10 | 0.19 | 0.29 |  |
| 94 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 95 | Jarvan IV | -0.13 | 0.00 | 0.13 |  |
| 96 | Sylas | -0.13 | 0.00 | 0.13 |  |
| 97 | Urgot | -0.13 | 0.00 | 0.13 |  |
| 98 | Yone | -0.13 | 0.00 | 0.13 |  |
| 99 | Aurelion Sol | -0.14 | 0.00 | 0.14 |  |
| 100 | Briar | -0.14 | 0.00 | 0.14 |  |
| 101 | K'Sante | -0.14 | 0.00 | 0.14 |  |
| 102 | Lillia | -0.14 | 0.00 | 0.14 |  |
| 103 | Malzahar | -0.15 | 0.57 | 0.72 |  |
| 104 | Hecarim | -0.17 | 0.00 | 0.17 |  |
| 105 | Wukong | -0.17 | 0.00 | 0.17 |  |
| 106 | Ornn | -0.17 | 0.00 | 0.17 |  |
| 107 | Rell | -0.17 | 0.00 | 0.17 |  |
| 108 | Bel'Veth | -0.18 | 0.00 | 0.18 |  |
| 109 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 110 | Volibear | -0.18 | 0.00 | 0.18 |  |
| 111 | Akali | -0.19 | 0.00 | 0.19 |  |
| 112 | Ambessa | -0.19 | 0.00 | 0.19 |  |
| 113 | Ekko | -0.19 | 0.00 | 0.19 |  |
| 114 | Lee Sin | -0.19 | 0.00 | 0.19 |  |
| 115 | Riven | -0.19 | 0.00 | 0.19 |  |
| 116 | Talon | -0.19 | 0.00 | 0.19 |  |
| 117 | Ivern | -0.21 | 0.00 | 0.21 |  |
| 118 | Irelia | -0.24 | 0.00 | 0.24 |  |
| 119 | Aatrox | -0.25 | 0.00 | 0.25 |  |
| 120 | Nautilus | -0.25 | 0.00 | 0.25 |  |
| 121 | Tryndamere | -0.25 | 0.00 | 0.25 |  |
| 122 | Diana | -0.27 | 0.00 | 0.27 |  |
| 123 | Kassadin | -0.27 | 0.00 | 0.27 |  |
| 124 | Sejuani | -0.27 | 0.00 | 0.27 |  |
| 125 | Shyvana | -0.27 | 0.00 | 0.27 |  |
| 126 | Nasus | -0.29 | 0.29 | 0.58 |  |
| 127 | Caitlyn | -0.29 | 0.22 | 0.51 |  |
| 128 | Amumu | -0.29 | 0.00 | 0.29 |  |
| 129 | Illaoi | -0.29 | 0.00 | 0.29 |  |
| 130 | Kha'Zix | -0.29 | 0.00 | 0.29 |  |
| 131 | Leona | -0.29 | 0.00 | 0.29 |  |
| 132 | Locke | -0.29 | 0.00 | 0.29 |  |
| 133 | Renekton | -0.29 | 0.00 | 0.29 |  |
| 134 | Sett | -0.29 | 0.00 | 0.29 |  |
| 135 | Singed | -0.31 | 0.27 | 0.58 |  |
| 136 | Quinn | -0.31 | 0.00 | 0.31 |  |
| 137 | Warwick | -0.32 | 0.98 | 1.30 |  |
| 138 | Skarner | -0.39 | 0.15 | 0.54 |  |
| 139 | Rammus | -0.40 | 0.29 | 0.69 |  |
| 140 | Pyke | -0.41 | 0.00 | 0.41 |  |
| 141 | Viego | -0.44 | 0.00 | 0.44 |  |
| 142 | Akshan | -0.49 | 0.00 | 0.49 |  |
| 143 | Vel'Koz | -0.50 | 0.00 | 0.50 |  |
| 144 | Darius | -0.51 | 0.00 | 0.51 |  |
| 145 | Jhin | -0.51 | 0.00 | 0.51 |  |
| 146 | Lucian | -0.51 | 0.00 | 0.51 |  |
| 147 | Trundle | -0.51 | 0.00 | 0.51 |  |
| 148 | Yorick | -0.51 | 0.00 | 0.51 |  |
| 149 | Miss Fortune | -0.53 | 0.00 | 0.53 |  |
| 150 | Gragas | -0.54 | 0.00 | 0.54 |  |
| 151 | Taric | -0.54 | 0.00 | 0.54 |  |
| 152 | Katarina | -0.56 | 0.18 | 0.74 |  |
| 153 | Blitzcrank | -0.58 | 0.00 | 0.58 |  |
| 154 | Cho'Gath | -0.58 | 0.00 | 0.58 |  |
| 155 | Dr. Mundo | -0.58 | 0.00 | 0.58 |  |
| 156 | Rumble | -0.58 | 0.00 | 0.58 |  |
| 157 | Pantheon | -0.60 | 0.54 | 1.14 |  |
| 158 | Xerath | -0.60 | 0.00 | 0.60 |  |
| 159 | Karthus | -0.67 | 0.00 | 0.67 |  |
| 160 | Poppy | -0.67 | 0.00 | 0.67 |  |
| 161 | Twisted Fate | -0.68 | 0.00 | 0.68 |  |
| 162 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 163 | Janna | -0.76 | 0.00 | 0.76 |  |
| 164 | Vi | -0.77 | 0.00 | 0.77 |  |
| 165 | Fiddlesticks | -0.78 | 0.00 | 0.78 |  |
| 166 | Shen | -0.80 | 0.29 | 1.09 |  |
| 167 | Zac | -0.92 | 0.00 | 0.92 |  |
| 168 | Naafiri | -0.95 | 0.00 | 0.95 |  |
| 169 | Taliyah | -0.96 | 0.00 | 0.96 |  |
| 170 | Tahm Kench | -0.99 | 0.00 | 0.99 |  |
| 171 | Nunu & Willump | -1.08 | 0.30 | 1.38 |  |
| 172 | Galio | -1.31 | 0.00 | 1.31 |  |
