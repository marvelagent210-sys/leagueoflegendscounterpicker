# Counters to Darius (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Darius: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Darius wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Darius --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Ashe | +0.84 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | +0.00 |
| 2 | Kayle | +0.84 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | +0.00 |
| 3 | Xayah | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 4 | Quinn | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 5 | Teemo | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 6 | Sivir | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 7 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 8 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.08 | – | +1.00 |
| 9 | Shyvana | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 10 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 11 | Kog'Maw | +0.75 | +1.00 | +1.00 | +0.50 | +0.35 | +1.00 | +0.00 |
| 12 | Ivern | +0.75 | +1.00 | +1.00 | +1.00 | +0.05 | +0.39 | +0.00 |
| 13 | Karma | +0.65 | +1.00 | +0.76 | +0.55 | +0.08 | +0.93 | +0.00 |
| 14 | Yunara | +0.62 | +0.16 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 15 | Lulu | +0.62 | +1.00 | +1.00 | +1.00 | +0.11 | −1.00 | +0.00 |
| 16 | Tristana | +0.56 | +0.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 17 | Bard | +0.54 | +1.00 | −0.06 | +1.00 | +0.09 | +0.91 | +0.00 |
| 18 | Aphelios | +0.43 | +1.00 | +1.00 | −1.00 | +0.19 | +1.00 | +0.00 |
| 19 | Orianna | +0.43 | +1.00 | +1.00 | −1.00 | +0.19 | +1.00 | +0.00 |
| 20 | K'Sante | +0.41 | +1.00 | +1.00 | −1.00 | +0.12 | – | +1.00 |
| 21 | Zeri | +0.41 | +1.00 | +1.00 | −1.00 | +0.06 | +1.00 | +0.00 |
| 22 | Smolder | +0.39 | +1.00 | +0.00 | +1.00 | +0.27 | −1.00 | +0.00 |
| 23 | Yorick | +0.36 | −0.82 | +1.00 | +1.00 | +0.20 | – | +1.00 |
| 24 | Twitch | +0.33 | −1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 25 | Twisted Fate | +0.33 | +1.00 | −1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 26 | Neeko | +0.30 | −0.87 | +0.96 | +0.82 | +0.16 | +0.93 | +0.00 |
| 27 | Tryndamere | +0.22 | −1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 28 | Milio | +0.21 | +0.68 | −1.00 | +0.89 | +0.27 | +0.77 | +0.00 |
| 29 | Corki | +0.19 | +1.00 | +0.00 | −1.00 | +0.25 | +1.00 | +0.00 |
| 30 | Kennen | +0.19 | −1.00 | +0.81 | +0.81 | +0.07 | +0.63 | +0.00 |
| 31 | Fiora | +0.17 | +0.57 | −1.00 | +1.00 | +0.09 | – | +1.00 |
| 32 | Lux | +0.04 | +0.05 | +0.00 | +0.07 | +0.13 | −0.07 | +0.00 |
| 33 | Zaahen | +0.03 | +0.53 | −1.00 | +0.73 | −0.01 | – | +0.00 |
| 34 | Rakan | +0.00 | +1.00 | −1.00 | +0.00 | +0.01 | +0.00 | +0.00 |
| 35 | Hwei | +0.00 | −0.02 | −0.19 | −0.19 | +0.10 | +0.76 | +0.00 |
| 36 | Draven | −0.06 | +0.30 | −1.00 | +1.00 | +0.11 | −1.00 | +0.00 |
| 37 | Miss Fortune | −0.07 | +1.00 | −1.00 | −1.00 | +0.23 | +1.00 | +0.00 |
| 38 | Kai'Sa | −0.09 | +1.00 | −1.00 | −1.00 | +0.07 | +0.94 | +0.00 |
| 39 | Senna | −0.12 | +0.21 | −0.01 | −1.00 | +0.05 | +0.18 | +0.00 |
| 40 | Morgana | −0.14 | +0.37 | −1.00 | +0.56 | +0.06 | −1.00 | +0.00 |
| 41 | Annie | −0.19 | +0.07 | −1.00 | +0.09 | +0.13 | +0.06 | +0.00 |
| 42 | Brand | −0.29 | −1.00 | −0.08 | −0.11 | +0.07 | −0.08 | +0.00 |
| 43 | Lucian | −0.30 | +1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 44 | Jinx | −0.32 | +0.62 | −1.00 | −1.00 | +0.20 | −0.57 | +0.00 |
| 45 | Kled | −0.34 | −1.00 | −1.00 | +1.00 | −0.05 | – | +0.00 |
| 46 | Gnar | −0.42 | −1.00 | +0.41 | −1.00 | +0.22 | −1.00 | +0.00 |
| 47 | Zyra | −0.44 | −0.43 | −1.00 | +0.02 | +0.11 | −1.00 | +0.00 |
| 48 | Anivia | −0.44 | −1.00 | +0.04 | −1.00 | −0.15 | +0.24 | +0.00 |
| 49 | Ezreal | −0.45 | +0.36 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 50 | Zoe | −0.49 | −0.67 | −1.00 | −0.05 | +0.05 | −0.67 | +0.00 |
| 51 | Sion | −0.51 | −1.00 | +0.00 | −1.00 | −0.06 | – | +0.00 |
| 52 | Soraka | −0.55 | −0.29 | −0.87 | −1.00 | +0.04 | −0.63 | +0.00 |
| 53 | Sona | −0.58 | −1.00 | −1.00 | −1.00 | +0.13 | +1.00 | +0.00 |
| 54 | Kalista | −0.59 | −1.00 | −1.00 | −1.00 | +0.09 | +1.00 | +0.00 |
| 55 | Vel'Koz | −0.60 | −0.39 | −1.00 | −1.00 | +0.32 | −1.00 | +0.00 |
| 56 | Heimerdinger | −0.64 | −1.00 | −1.00 | −0.33 | +0.19 | −1.00 | +0.00 |
| 57 | Syndra | −0.68 | −1.00 | −1.00 | −1.00 | +0.16 | −0.07 | +0.00 |
| 58 | Lissandra | −0.70 | −1.00 | −0.94 | −1.00 | +0.07 | −0.21 | +0.00 |
| 59 | Gangplank | −0.71 | −1.00 | −1.00 | −1.00 | +0.07 | – | +1.00 |
| 60 | Rengar | −0.71 | −1.00 | −1.00 | −1.00 | +0.39 | – | +0.00 |
| 61 | Aurelion Sol | −0.73 | −1.00 | −1.00 | −1.00 | +0.46 | −1.00 | +0.00 |
| 62 | Bel'Veth | −0.74 | −1.00 | −1.00 | −1.00 | +0.22 | – | +0.00 |
| 63 | Ornn | −0.74 | −1.00 | −1.00 | −1.00 | +0.20 | – | +0.00 |
| 64 | Maokai | −0.75 | −1.00 | −1.00 | −1.00 | +0.19 | – | +0.00 |
| 65 | Sylas | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 66 | Nunu & Willump | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 67 | Master Yi | −0.75 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +1.00 |
| 68 | Viego | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 69 | Riven | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 70 | Poppy | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 71 | Malphite | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 72 | Diana | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 73 | Warwick | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 74 | Taric | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 75 | Evelynn | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 76 | Cho'Gath | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 77 | Jayce | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 78 | Aatrox | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 79 | Irelia | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 80 | Fizz | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 81 | Shaco | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 82 | Nilah | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 83 | Jarvan IV | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 84 | Nami | −0.77 | −0.93 | −0.98 | −0.99 | +0.04 | −0.95 | +0.00 |
| 85 | Tahm Kench | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 86 | Cassiopeia | −0.77 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | +0.00 |
| 87 | Lee Sin | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 88 | Ambessa | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 89 | Camille | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 90 | Sejuani | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 91 | Hecarim | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 92 | Mordekaiser | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 93 | Illaoi | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 94 | Yasuo | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 95 | Pantheon | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 96 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 97 | Alistar | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 98 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 99 | Zilean | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 100 | Jhin | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 101 | Rek'Sai | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 102 | Yone | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 103 | Talon | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 104 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 105 | Akshan | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 106 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 107 | Volibear | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 108 | Udyr | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 109 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 110 | Katarina | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 111 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 112 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 113 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 114 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 115 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 116 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 117 | Gragas | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 118 | Pyke | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 119 | Kindred | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 120 | Dr. Mundo | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 121 | Zac | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 122 | Aurora | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 123 | Olaf | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 124 | Mel | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −0.98 | +0.00 |
| 125 | Renekton | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 126 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 127 | Braum | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 128 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 129 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 130 | Elise | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 131 | Kayn | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 132 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 133 | Azir | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 134 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 135 | Lillia | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 136 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 137 | Leona | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 138 | Swain | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 139 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 140 | Xin Zhao | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 141 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 142 | Malzahar | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 143 | Jax | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 144 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 145 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 146 | Ekko | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 147 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 148 | Karthus | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 149 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 150 | Veigar | −0.79 | −0.99 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 151 | Varus | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 152 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 153 | Yuumi | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 154 | Garen | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 155 | Gwen | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 156 | Nidalee | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 157 | Singed | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 158 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 159 | Nocturne | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 160 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 161 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 162 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 163 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 164 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 165 | Rammus | −0.81 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.00 |
| 166 | Vi | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 167 | Samira | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 168 | Renata Glasc | −0.84 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −1.00 |
| 169 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.00 |
| 170 | Graves | −0.84 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −1.00 |
| 171 | Briar | −0.88 | −1.00 | −1.00 | −1.00 | −0.59 | – | +0.00 |
| 172 | Wukong | −0.88 | −1.00 | −1.00 | −1.00 | −0.44 | – | −0.50 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Darius's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Darius's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Darius` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.80)

- **0.81** range: Sivir's basic attacks reach 325 units farther than Darius's (500 vs 175 attack range). Darius has no dash or blink to close the gap. (Sivir basic attacks → Darius basic attacks)
- **0.65** spell shield: Spell Shield's spell shield blocks Darius's Apprehend. Spell shield for 1.5 s, long enough to use ahead of Apprehend. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Darius E Apprehend)
- **0.55** spell shield: Spell Shield's spell shield blocks Darius's Noxian Guillotine. Spell shield for 1.5 s, long enough to use ahead of Noxian Guillotine. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Darius R Noxian Guillotine)

#### 2. Bard (net +1.40)

- **0.62** range: Bard's basic attacks reach 325 units farther than Darius's (500 vs 175 attack range). Darius has no dash or blink to close the gap. (Bard basic attacks → Darius basic attacks)
- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Darius's Noxian Guillotine. Untargetable for 2.5 s, long enough to use ahead of Noxian Guillotine. (Bard R Tempered Fate → Darius R Noxian Guillotine)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Darius's Apprehend. Untargetable for 2.5 s, long enough to use ahead of Apprehend. (Bard R Tempered Fate → Darius E Apprehend)

#### 3. Xayah (net +1.37)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Darius's (525 vs 175 attack range). Darius has no dash or blink to close the gap. (Xayah basic attacks → Darius basic attacks)
- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Darius's Noxian Guillotine. Untargetable for 1.5 s, long enough to use ahead of Noxian Guillotine. (Xayah R Featherstorm → Darius R Noxian Guillotine)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Darius's Apprehend. Untargetable for 1.5 s, long enough to use ahead of Apprehend. (Xayah R Featherstorm → Darius E Apprehend)

#### 4. Kayle (net +1.32)

- **0.72** range: Kayle's basic attacks reach 450 units farther than Darius's (625 vs 175 attack range). Darius has no dash or blink to close the gap. (Kayle basic attacks → Darius basic attacks)
- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Darius's Noxian Guillotine. Invulnerable for 2.5 s, long enough to use ahead of Noxian Guillotine. (Kayle R Divine Judgment → Darius R Noxian Guillotine)
- **0.10** invulnerable: Divine Judgment makes Kayle invulnerable to Darius's Crippling Strike (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Crippling Strike. (Kayle R Divine Judgment → Darius W Crippling Strike)

#### 5. Vladimir (net +1.27)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Darius's Apprehend. Untargetable for 2 s, long enough to use ahead of Apprehend. (Vladimir W Sanguine Pool → Darius E Apprehend)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Darius's Noxian Guillotine. Untargetable for 2 s, long enough to use ahead of Noxian Guillotine. (Vladimir W Sanguine Pool → Darius R Noxian Guillotine)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Darius's (450 vs 175 attack range). Darius has no dash or blink to close the gap. (Vladimir basic attacks → Darius basic attacks)
- Watch out: Apprehend's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 6. Aurora (net +1.23)

- **0.54** range: Aurora's basic attacks reach 375 units farther than Darius's (550 vs 175 attack range). Darius has no dash or blink to close the gap. (Aurora basic attacks → Darius basic attacks)
- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Darius's Noxian Guillotine. Untargetable for 0.4 s; Noxian Guillotine takes 0.37 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Darius R Noxian Guillotine)
- **0.35** untargetable: Between Worlds makes Aurora untargetable, dodging Darius's Apprehend. Untargetable for 0.4 s; Apprehend takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Darius E Apprehend)

#### 7. Teemo (net +1.21)

- **0.59** range: Teemo's basic attacks reach 325 units farther than Darius's (500 vs 175 attack range). Darius has no dash or blink to close the gap. (Teemo basic attacks → Darius basic attacks)
- **0.47** blind: Blinding Dart's blind makes Darius's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Darius basic attacks)
- **0.30** blind: Blinding Dart's blind makes Darius's Crippling Strike, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Darius W Crippling Strike)

#### 8. Yuumi (net +1.19)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Darius's Apprehend. Untargetable for ?; Apprehend takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Darius E Apprehend)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Darius's Noxian Guillotine. Untargetable for ?; Noxian Guillotine takes 0.37 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Darius R Noxian Guillotine)
- **0.54** range: Yuumi's basic attacks reach 250 units farther than Darius's (425 vs 175 attack range). Darius has no dash or blink to close the gap. (Yuumi basic attacks → Darius basic attacks)
- Watch out: Apprehend's airborne interrupts Yuumi's Final Chapter (normal channel).

#### 9. Lissandra (net +1.19)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Darius's Noxian Guillotine. Untargetable for 2.5 s, long enough to use ahead of Noxian Guillotine. (Lissandra R Frozen Tomb → Darius R Noxian Guillotine)
- **0.41** range: Lissandra's basic attacks reach 375 units farther than Darius's (550 vs 175 attack range). Darius has no dash or blink to close the gap. (Lissandra basic attacks → Darius basic attacks)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Darius's Apprehend. Untargetable for 2.5 s, long enough to use ahead of Apprehend. (Lissandra R Frozen Tomb → Darius E Apprehend)

#### 10. Fiora (net +1.13)

- **0.80** parry: Riposte parries Darius's Apprehend and stuns back. Parry for 0.75 s; Apprehend takes 0.25 s to land, enough to react. Negating Apprehend's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Darius E Apprehend)
- **0.55** parry: Riposte parries Darius's Noxian Guillotine. Parry for 0.75 s; Noxian Guillotine takes 0.37 s to land, enough to react. (Fiora W Riposte → Darius R Noxian Guillotine)
- **0.16** parry: Riposte parries Darius's Crippling Strike. Parry for 0.75 s; Crippling Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Darius W Crippling Strike)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.80 | 1.80 | 0.00 | range (attacks) |
| 2 | Bard | +1.40 | 1.40 | 0.00 | range (attacks) |
| 3 | Xayah | +1.37 | 1.37 | 0.00 | range (attacks) |
| 4 | Kayle | +1.32 | 1.32 | 0.00 | range (attacks) |
| 5 | Vladimir | +1.27 | 1.34 | 0.07 |  |
| 6 | Aurora | +1.23 | 1.23 | 0.00 | range (attacks) |
| 7 | Teemo | +1.21 | 1.21 | 0.00 | range (attacks), blind (Blinding Dart) |
| 8 | Yuumi | +1.19 | 1.58 | 0.39 | range (attacks) |
| 9 | Lissandra | +1.19 | 1.19 | 0.00 |  |
| 10 | Fiora | +1.13 | 1.13 | 0.00 |  |
| 11 | Nocturne | +1.12 | 1.12 | 0.00 |  |
| 12 | Morgana | +1.07 | 1.07 | 0.00 |  |
| 13 | Fizz | +1.03 | 1.03 | 0.00 |  |
| 14 | Lulu | +1.02 | 1.02 | 0.00 | range (attacks) |
| 15 | Maokai | +1.02 | 1.02 | 0.00 |  |
| 16 | Gwen | +0.96 | 0.96 | 0.00 |  |
| 17 | Master Yi | +0.92 | 1.09 | 0.17 |  |
| 18 | Kalista | +0.86 | 0.86 | 0.00 | range (attacks) |
| 19 | Zeri | +0.83 | 0.83 | 0.00 | range (attacks) |
| 20 | Aphelios | +0.82 | 0.82 | 0.00 | range (attacks) |
| 21 | Kindred | +0.81 | 0.81 | 0.00 | range (attacks) |
| 22 | Twitch | +0.81 | 0.81 | 0.00 | range (attacks) |
| 23 | Vayne | +0.81 | 0.81 | 0.00 | range (attacks) |
| 24 | Rek'Sai | +0.79 | 0.79 | 0.00 |  |
| 25 | Milio | +0.78 | 0.78 | 0.00 | range (attacks) |
| 26 | Sona | +0.77 | 0.77 | 0.00 | range (attacks) |
| 27 | Evelynn | +0.76 | 0.76 | 0.00 |  |
| 28 | Shaco | +0.76 | 0.76 | 0.00 |  |
| 29 | Udyr | +0.75 | 0.75 | 0.00 |  |
| 30 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 31 | Camille | +0.72 | 0.72 | 0.00 |  |
| 32 | Renata Glasc | +0.72 | 0.72 | 0.00 | range (attacks) |
| 33 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 34 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 35 | Zed | +0.69 | 0.69 | 0.00 |  |
| 36 | Draven | +0.68 | 0.68 | 0.00 | range (attacks) |
| 37 | Cassiopeia | +0.67 | 0.67 | 0.00 |  |
| 38 | Kai'Sa | +0.67 | 0.67 | 0.00 | range (attacks) |
| 39 | Varus | +0.65 | 0.75 | 0.10 | range (attacks) |
| 40 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 41 | Corki | +0.61 | 0.61 | 0.00 | range (attacks) |
| 42 | Elise | +0.61 | 0.61 | 0.00 | range (attacks) |
| 43 | Ezreal | +0.61 | 0.61 | 0.00 | range (attacks) |
| 44 | Smolder | +0.61 | 0.61 | 0.00 | range (attacks) |
| 45 | Zilean | +0.61 | 0.61 | 0.00 | range (attacks) |
| 46 | Zoe | +0.61 | 0.61 | 0.00 | range (attacks) |
| 47 | Singed | +0.60 | 0.60 | 0.00 |  |
| 48 | Gangplank | +0.59 | 0.59 | 0.00 |  |
| 49 | Rengar | +0.59 | 0.59 | 0.00 |  |
| 50 | Gnar | +0.57 | 0.57 | 0.00 | range (attacks) |
| 51 | Vex | +0.57 | 0.57 | 0.00 | range (attacks) |
| 52 | Viktor | +0.57 | 0.57 | 0.00 | range (attacks) |
| 53 | Jax | +0.55 | 0.55 | 0.00 |  |
| 54 | Kennen | +0.54 | 0.54 | 0.00 | range (attacks) |
| 55 | Lux | +0.54 | 0.54 | 0.00 | range (attacks) |
| 56 | Jayce | +0.53 | 0.53 | 0.00 | range (attacks) |
| 57 | Nidalee | +0.53 | 0.53 | 0.00 | range (attacks) |
| 58 | Samira | +0.53 | 0.53 | 0.00 | range (attacks) |
| 59 | Xin Zhao | +0.53 | 0.53 | 0.00 |  |
| 60 | Jinx | +0.51 | 0.51 | 0.00 | range (attacks) |
| 61 | Kled | +0.51 | 0.51 | 0.00 |  |
| 62 | Seraphine | +0.51 | 0.51 | 0.00 | range (attacks) |
| 63 | Quinn | +0.50 | 0.67 | 0.17 | range (attacks) |
| 64 | Mel | +0.50 | 0.50 | 0.00 | range (attacks) |
| 65 | Soraka | +0.50 | 0.50 | 0.00 | range (attacks) |
| 66 | Ziggs | +0.50 | 0.50 | 0.00 | range (attacks) |
| 67 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 68 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 69 | Azir | +0.47 | 0.47 | 0.00 |  |
| 70 | Heimerdinger | +0.47 | 0.47 | 0.00 |  |
| 71 | Kog'Maw | +0.47 | 0.47 | 0.00 |  |
| 72 | Orianna | +0.47 | 0.47 | 0.00 |  |
| 73 | Nilah | +0.45 | 0.45 | 0.00 |  |
| 74 | Veigar | +0.45 | 0.45 | 0.00 |  |
| 75 | Caitlyn | +0.44 | 0.72 | 0.28 | range (attacks) |
| 76 | Annie | +0.44 | 0.44 | 0.00 |  |
| 77 | Hwei | +0.43 | 0.43 | 0.00 |  |
| 78 | Ahri | +0.41 | 0.41 | 0.00 |  |
| 79 | Brand | +0.41 | 0.41 | 0.00 |  |
| 80 | Graves | +0.41 | 0.41 | 0.00 |  |
| 81 | Nami | +0.41 | 0.41 | 0.00 |  |
| 82 | Neeko | +0.41 | 0.41 | 0.00 |  |
| 83 | Syndra | +0.41 | 0.41 | 0.00 |  |
| 84 | Twisted Fate | +0.40 | 0.75 | 0.35 | range (attacks) |
| 85 | Olaf | +0.39 | 0.39 | 0.00 |  |
| 86 | Karma | +0.38 | 0.38 | 0.00 |  |
| 87 | LeBlanc | +0.38 | 0.38 | 0.00 |  |
| 88 | Zaahen | +0.38 | 0.38 | 0.00 |  |
| 89 | Nasus | +0.36 | 0.36 | 0.00 |  |
| 90 | Swain | +0.36 | 0.36 | 0.00 |  |
| 91 | Malzahar | +0.34 | 0.74 | 0.40 |  |
| 92 | Lucian | +0.34 | 0.62 | 0.28 | range (attacks) |
| 93 | Aurelion Sol | +0.34 | 0.41 | 0.07 |  |
| 94 | Miss Fortune | +0.33 | 0.61 | 0.28 | range (attacks) |
| 95 | Thresh | +0.33 | 0.33 | 0.00 |  |
| 96 | Kayn | +0.31 | 0.76 | 0.45 |  |
| 97 | Akshan | +0.31 | 0.59 | 0.28 | range (attacks) |
| 98 | Sion | +0.31 | 0.42 | 0.11 |  |
| 99 | Alistar | +0.31 | 0.31 | 0.00 |  |
| 100 | Malphite | +0.31 | 0.31 | 0.00 |  |
| 101 | Janna | +0.28 | 0.68 | 0.40 | range (attacks) |
| 102 | Garen | +0.24 | 0.24 | 0.00 |  |
| 103 | Urgot | +0.23 | 0.23 | 0.00 |  |
| 104 | Jhin | +0.22 | 0.50 | 0.28 | range (attacks) |
| 105 | Ivern | +0.21 | 0.33 | 0.12 |  |
| 106 | Vel'Koz | +0.19 | 0.47 | 0.28 |  |
| 107 | Rakan | +0.18 | 0.18 | 0.00 |  |
| 108 | Lillia | +0.16 | 0.16 | 0.00 |  |
| 109 | Xerath | +0.15 | 0.47 | 0.32 |  |
| 110 | Rammus | +0.14 | 0.36 | 0.22 |  |
| 111 | K'Sante | +0.14 | 0.14 | 0.00 |  |
| 112 | Pantheon | +0.13 | 0.62 | 0.49 |  |
| 113 | Skarner | +0.12 | 0.12 | 0.00 |  |
| 114 | Ryze | +0.10 | 0.45 | 0.35 |  |
| 115 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 116 | Shen | +0.07 | 0.52 | 0.45 |  |
| 117 | Hecarim | +0.07 | 0.07 | 0.00 |  |
| 118 | Illaoi | +0.07 | 0.07 | 0.00 |  |
| 119 | Jarvan IV | +0.07 | 0.07 | 0.00 |  |
| 120 | Ornn | +0.07 | 0.07 | 0.00 |  |
| 121 | Sett | +0.07 | 0.07 | 0.00 |  |
| 122 | Shyvana | +0.07 | 0.07 | 0.00 |  |
| 123 | Volibear | +0.07 | 0.07 | 0.00 |  |
| 124 | Yone | +0.07 | 0.07 | 0.00 |  |
| 125 | Karthus | +0.05 | 0.33 | 0.28 |  |
| 126 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 127 | Akali | 0.00 | 0.00 | 0.00 |  |
| 128 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 129 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 130 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 131 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 132 | Braum | 0.00 | 0.00 | 0.00 |  |
| 133 | Briar | 0.00 | 0.00 | 0.00 |  |
| 134 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 135 | Diana | 0.00 | 0.00 | 0.00 |  |
| 136 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 137 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 138 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 139 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 140 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 141 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 142 | Leona | 0.00 | 0.00 | 0.00 |  |
| 143 | Locke | 0.00 | 0.00 | 0.00 |  |
| 144 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 145 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 146 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 147 | Rell | 0.00 | 0.00 | 0.00 |  |
| 148 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 149 | Riven | 0.00 | 0.00 | 0.00 |  |
| 150 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 151 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 152 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 153 | Talon | 0.00 | 0.00 | 0.00 |  |
| 154 | Taric | 0.00 | 0.00 | 0.00 |  |
| 155 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 156 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 157 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 158 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 159 | Taliyah | -0.01 | 0.47 | 0.48 |  |
| 160 | Katarina | -0.06 | 0.22 | 0.28 |  |
| 161 | Fiddlesticks | -0.09 | 0.34 | 0.43 |  |
| 162 | Viego | -0.11 | 0.07 | 0.18 |  |
| 163 | Pyke | -0.12 | 0.00 | 0.12 |  |
| 164 | Gragas | -0.13 | 0.00 | 0.13 |  |
| 165 | Warwick | -0.16 | 0.47 | 0.63 |  |
| 166 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 167 | Nunu & Willump | -0.22 | 0.24 | 0.46 |  |
| 168 | Vi | -0.24 | 0.07 | 0.31 |  |
| 169 | Zac | -0.37 | 0.00 | 0.37 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Galio | -0.58 | 0.00 | 0.58 |  |
