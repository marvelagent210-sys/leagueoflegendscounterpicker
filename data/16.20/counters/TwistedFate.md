# Counters to Twisted Fate (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Twisted Fate: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Twisted Fate wins every time) to +1 (the champion does). Run `npm run duel -- <champion> TwistedFate --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Camille | +0.85 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +1.00 |
| 2 | Poppy | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 3 | Kayle | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 4 | Fiora | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 5 | Tristana | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 6 | Nilah | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 7 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 8 | Sylas | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 9 | Milio | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 10 | Ashe | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 11 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 12 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 13 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 14 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 15 | Jhin | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 16 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 17 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 18 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 19 | Teemo | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 20 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 21 | Shyvana | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 22 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.00 |
| 23 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 24 | Tahm Kench | +0.68 | +0.81 | +0.81 | +0.96 | −0.04 | +0.92 | +0.00 |
| 25 | Kassadin | +0.67 | +0.50 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 26 | Irelia | +0.65 | +0.96 | +1.00 | +0.39 | −0.01 | +0.80 | +0.00 |
| 27 | Annie | +0.64 | +0.34 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 28 | K'Sante | +0.63 | +1.00 | +1.00 | +1.00 | −0.14 | −1.00 | +1.00 |
| 29 | Vayne | +0.50 | +1.00 | +0.00 | +1.00 | +0.01 | – | +0.00 |
| 30 | Graves | +0.42 | +1.00 | +1.00 | −1.00 | +0.12 | +1.00 | +0.00 |
| 31 | Miss Fortune | +0.35 | +1.00 | +1.00 | −1.00 | +0.08 | – | +0.00 |
| 32 | Jayce | +0.31 | +1.00 | −1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 33 | Jax | +0.31 | +1.00 | −1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 34 | Cassiopeia | +0.27 | +0.00 | +0.10 | +1.00 | +0.10 | – | +0.00 |
| 35 | Senna | +0.25 | +0.83 | +0.83 | −1.00 | +0.07 | – | +0.00 |
| 36 | Yasuo | +0.25 | +0.89 | −1.00 | +1.00 | −0.08 | +0.89 | +0.00 |
| 37 | Zaahen | +0.22 | +0.21 | +0.12 | +0.35 | +0.28 | +0.25 | +0.00 |
| 38 | Kled | +0.19 | +1.00 | +1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 39 | Rammus | +0.18 | +1.00 | +1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 40 | Anivia | +0.18 | +0.23 | +0.21 | +0.34 | −0.11 | – | +0.00 |
| 41 | Yone | +0.12 | +0.17 | +0.17 | +0.17 | −0.13 | +0.17 | +0.00 |
| 42 | Volibear | +0.11 | +0.68 | −1.00 | +0.68 | +0.00 | +0.60 | +0.00 |
| 43 | Orianna | +0.07 | +0.00 | +1.00 | −1.00 | +0.08 | – | +0.00 |
| 44 | Xayah | −0.04 | +0.00 | −1.00 | +1.00 | +0.07 | – | +0.00 |
| 45 | Lulu | −0.10 | −0.30 | −0.87 | +1.00 | +0.04 | – | +0.00 |
| 46 | Maokai | −0.11 | −1.00 | +1.00 | −1.00 | −0.05 | +1.00 | +0.00 |
| 47 | Taric | −0.14 | −0.16 | −0.18 | −0.21 | +0.04 | −0.19 | +0.00 |
| 48 | Udyr | −0.21 | −1.00 | −1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 49 | Azir | −0.22 | −1.00 | +1.00 | −1.00 | +0.04 | – | +0.00 |
| 50 | Swain | −0.23 | −0.69 | +0.59 | −1.00 | +0.09 | – | +0.00 |
| 51 | Warwick | −0.25 | −1.00 | +1.00 | −1.00 | +0.33 | −1.00 | +0.00 |
| 52 | Sion | −0.26 | +0.33 | −1.00 | −1.00 | +0.07 | +1.00 | +0.00 |
| 53 | Sejuani | −0.27 | −1.00 | −1.00 | +0.92 | +0.01 | +0.46 | +0.00 |
| 54 | Lillia | −0.27 | +0.06 | +0.06 | −1.00 | −0.02 | −1.00 | +0.00 |
| 55 | Garen | −0.31 | +1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 56 | Zac | −0.33 | −0.34 | −0.34 | −0.50 | −0.17 | −0.33 | +0.00 |
| 57 | Corki | −0.33 | −1.00 | −1.00 | +1.00 | +0.04 | – | +0.00 |
| 58 | Bel'Veth | −0.41 | −1.00 | −1.00 | +1.00 | −0.09 | −1.00 | +0.00 |
| 59 | Lee Sin | −0.41 | −1.00 | −1.00 | +1.00 | −0.10 | −1.00 | +0.00 |
| 60 | Tryndamere | −0.42 | −1.00 | −1.00 | +1.00 | −0.12 | −1.00 | +0.00 |
| 61 | Amumu | −0.42 | −0.08 | −1.00 | −1.00 | −0.05 | +0.55 | +0.00 |
| 62 | Xin Zhao | −0.43 | −0.87 | −0.50 | +0.09 | −0.06 | −1.00 | +0.00 |
| 63 | Rumble | −0.43 | −1.00 | −1.00 | +0.88 | −0.07 | −1.00 | +0.00 |
| 64 | Varus | −0.46 | −0.44 | −0.44 | −1.00 | +0.05 | – | +0.00 |
| 65 | Samira | −0.49 | −1.00 | +0.00 | −1.00 | +0.09 | – | +0.00 |
| 66 | Hwei | −0.50 | −1.00 | −1.00 | +0.22 | +0.05 | – | +0.00 |
| 67 | Skarner | −0.50 | −1.00 | −1.00 | +0.61 | −0.17 | −1.00 | +0.00 |
| 68 | Gwen | −0.51 | −1.00 | −1.00 | +0.71 | −0.36 | −1.00 | +0.00 |
| 69 | Ziggs | −0.52 | −1.00 | −1.00 | +0.00 | +0.18 | – | +0.00 |
| 70 | Lux | −0.55 | −1.00 | −1.00 | +0.00 | +0.02 | – | +0.00 |
| 71 | Shaco | −0.60 | −1.00 | −1.00 | +0.00 | −0.01 | −1.00 | +0.00 |
| 72 | Morgana | −0.61 | −1.00 | −0.97 | −0.20 | −0.13 | – | +0.00 |
| 73 | Riven | −0.62 | −1.00 | −1.00 | +0.00 | −0.14 | −1.00 | +0.00 |
| 74 | Briar | −0.63 | −1.00 | −1.00 | +0.17 | −0.40 | −1.00 | +0.00 |
| 75 | Darius | −0.63 | −1.00 | −1.00 | +0.00 | −0.18 | −1.00 | +0.00 |
| 76 | Mordekaiser | −0.64 | −1.00 | −0.97 | −0.33 | −0.09 | −0.71 | +0.00 |
| 77 | Aurelion Sol | −0.70 | −1.00 | −1.00 | −1.00 | +0.47 | – | +0.00 |
| 78 | Karma | −0.72 | −0.83 | −0.99 | −1.00 | +0.04 | – | +0.00 |
| 79 | Ryze | −0.73 | −0.93 | −0.93 | −1.00 | +0.07 | – | +0.00 |
| 80 | Vel'Koz | −0.73 | −1.00 | −1.00 | −1.00 | +0.29 | – | +0.00 |
| 81 | Rengar | −0.74 | −1.00 | −1.00 | −1.00 | +0.37 | −1.00 | +0.00 |
| 82 | Zeri | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 83 | Kalista | −0.76 | −0.96 | −0.93 | −1.00 | −0.06 | – | +0.00 |
| 84 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 85 | Smolder | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 86 | Jinx | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 87 | Twitch | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 88 | Mel | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 89 | Aurora | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 90 | Renata Glasc | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 91 | Syndra | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 92 | Yunara | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 93 | Xerath | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 94 | Janna | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 95 | Neeko | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 96 | Nami | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 97 | Elise | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 98 | Zyra | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 99 | Sona | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 100 | Zoe | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 101 | Draven | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 102 | Fiddlesticks | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 103 | Viktor | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 104 | Kindred | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 105 | Sivir | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 106 | Soraka | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 107 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 108 | Quinn | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 109 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 110 | Malzahar | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 111 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 112 | Brand | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 113 | Nidalee | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 114 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 115 | Ezreal | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 116 | Akshan | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 117 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 118 | Zilean | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 119 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 120 | Karthus | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 121 | Diana | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 122 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 123 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 124 | Kennen | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 125 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 126 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 127 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 128 | Rell | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 129 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 130 | Kai'Sa | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 131 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 132 | Gnar | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 133 | Alistar | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 134 | Bard | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 135 | Akali | −0.80 | −1.00 | −0.98 | −1.00 | −0.03 | −1.00 | +0.00 |
| 136 | Jarvan IV | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 137 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 138 | Singed | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 139 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 140 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 141 | Braum | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 142 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 143 | Malphite | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 144 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 145 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 146 | Urgot | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 147 | Illaoi | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 148 | Aatrox | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 149 | Kayn | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 150 | Renekton | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 151 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 152 | Ambessa | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 153 | Master Yi | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 154 | Rakan | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 155 | Ornn | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 156 | Pantheon | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 157 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 158 | Fizz | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 159 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 160 | Cho'Gath | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 161 | Gragas | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 162 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 163 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 164 | Viego | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 165 | Vi | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 166 | Zed | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 167 | Locke | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 168 | Rek'Sai | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 169 | Sett | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 170 | Wukong | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 171 | Hecarim | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 172 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Twisted Fate's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Twisted Fate's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> TwistedFate` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Rell (net +1.50)

- **0.35** interrupt: Ferromancy: Crash Down's airborne interrupts Twisted Fate's Destiny (movement channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Twisted Fate R Destiny)
- **0.35** interrupt: Ferromancy: Mount Up's airborne interrupts Twisted Fate's Destiny (movement channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Twisted Fate R Destiny)
- **0.35** interrupt: Full Tilt's stun interrupts Twisted Fate's Destiny (movement channel). Full Tilt must land during the channel. (Rell E Full Tilt → Twisted Fate R Destiny)
- Watch out: Twisted Fate's basic attacks reach 350 units farther than Rell's (525 vs 175 attack range).

#### 2. Braum (net +1.26)

- **0.60** projectile block: Unbreakable blocks Twisted Fate's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Twisted Fate basic attacks)
- **0.60** projectile block: Unbreakable blocks Twisted Fate's Pick a Card, a projectile. Unbreakable for 4 s, long enough to use ahead of Pick a Card. (Braum E Unbreakable → Twisted Fate W Pick a Card)
- **0.35** interrupt: Concussive Blows's stun interrupts Twisted Fate's Destiny (movement channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Twisted Fate R Destiny)
- Watch out: Twisted Fate's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

#### 3. Yasuo (net +1.20)

- **0.47** projectile block: Wind Wall blocks Twisted Fate's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Twisted Fate basic attacks)
- **0.43** projectile block: Wind Wall blocks Twisted Fate's Pick a Card, a projectile. Wind Wall for 4 s, long enough to use ahead of Pick a Card. (Yasuo W Wind Wall → Twisted Fate W Pick a Card)
- **0.35** interrupt: Last Breath's airborne interrupts Twisted Fate's Destiny (movement channel). Last Breath must land during the channel. (Yasuo R Last Breath → Twisted Fate R Destiny)
- Watch out: Twisted Fate's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

#### 4. Lulu (net +0.93)

- **0.40** disarm: Whimsy disarms Twisted Fate for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Twisted Fate basic attacks)
- **0.35** interrupt: Whimsy's polymorph interrupts Twisted Fate's Destiny (movement channel). Whimsy must land during the channel. (Lulu W Whimsy → Twisted Fate R Destiny)
- **0.35** interrupt: Wild Growth's airborne interrupts Twisted Fate's Destiny (movement channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Twisted Fate R Destiny)

#### 5. K'Sante (net +0.85)

- **0.35** interrupt: All Out's airborne interrupts Twisted Fate's Destiny (movement channel). All Out must land during the channel. (K'Sante R All Out → Twisted Fate R Destiny)
- **0.35** interrupt: Ntofo Strikes's airborne interrupts Twisted Fate's Destiny (movement channel). Ntofo Strikes must land during the channel. (K'Sante Q Ntofo Strikes → Twisted Fate R Destiny)
- **0.35** interrupt: Path Maker's airborne interrupts Twisted Fate's Destiny (movement channel). Path Maker must land during the channel. (K'Sante W Path Maker → Twisted Fate R Destiny)
- Watch out: Twisted Fate's basic attacks reach 375 units farther than K'Sante's (525 vs 150 attack range).

#### 6. Heimerdinger (net +0.77)

- **0.35** interrupt: CH-2 Electron Storm Grenade's stun interrupts Twisted Fate's Destiny (movement channel). CH-2 Electron Storm Grenade must land during the channel. (Heimerdinger E CH-2 Electron Storm Grenade → Twisted Fate R Destiny)
- **0.35** interrupt: CH-3X Lightning Grenade's stun interrupts Twisted Fate's Destiny (movement channel). CH-3X Lightning Grenade must land during the channel. (Heimerdinger E CH-3X Lightning Grenade → Twisted Fate R Destiny)
- **0.07** cc immunity: H-28G Evolution Turret makes Heimerdinger immune to Twisted Fate's Pick a Card (slow). H-28G Evolution Turret lasts ? on a 20 s cooldown. (Heimerdinger Q H-28G Evolution Turret → Twisted Fate W Pick a Card)

#### 7. Anivia (net +0.74)

- **0.35** interrupt: Crystallize's airborne interrupts Twisted Fate's Destiny (movement channel). Crystallize must land during the channel. (Anivia W Crystallize → Twisted Fate R Destiny)
- **0.35** interrupt: Flash Frost's stun interrupts Twisted Fate's Destiny (movement channel). Flash Frost must land during the channel. (Anivia Q Flash Frost → Twisted Fate R Destiny)
- **0.04** range: Anivia's basic attacks reach 75 units farther than Twisted Fate's (600 vs 525 attack range). Twisted Fate closes the gap with Destiny. (Anivia basic attacks → Twisted Fate basic attacks)

#### 8. Teemo (net +0.72)

- **0.57** blind: Blinding Dart's blind makes Twisted Fate's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Twisted Fate basic attacks)
- **0.46** blind: Blinding Dart's blind makes Twisted Fate's Pick a Card, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Twisted Fate W Pick a Card)
- Watch out: Destiny reveals Teemo through Guerrilla Warfare's stealth.

#### 9. Gnar (net +0.70)

- **0.35** interrupt: GNAR!'s airborne interrupts Twisted Fate's Destiny (movement channel). GNAR! must land during the channel. (Gnar R GNAR! → Twisted Fate R Destiny)
- **0.35** interrupt: Wallop's stun interrupts Twisted Fate's Destiny (movement channel). Wallop must land during the channel. (Gnar W Wallop → Twisted Fate R Destiny)

#### 10. Nami (net +0.70)

- **0.35** interrupt: Aqua Prison's suspension interrupts Twisted Fate's Destiny (movement channel). Aqua Prison must land during the channel. (Nami Q Aqua Prison → Twisted Fate R Destiny)
- **0.35** interrupt: Tidal Wave's airborne interrupts Twisted Fate's Destiny (movement channel). Tidal Wave must land during the channel. (Nami R Tidal Wave → Twisted Fate R Destiny)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +1.50 | 1.75 | 0.25 |  |
| 2 | Braum | +1.26 | 1.69 | 0.43 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 3 | Yasuo | +1.20 | 1.45 | 0.25 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 4 | Lulu | +0.93 | 0.93 | 0.00 | disarm (Whimsy) |
| 5 | K'Sante | +0.85 | 1.05 | 0.20 |  |
| 6 | Heimerdinger | +0.77 | 0.77 | 0.00 |  |
| 7 | Anivia | +0.74 | 0.74 | 0.00 |  |
| 8 | Teemo | +0.72 | 0.80 | 0.08 | blind (Blinding Dart), blind (Blinding Dart) |
| 9 | Gnar | +0.70 | 0.70 | 0.00 |  |
| 10 | Nami | +0.70 | 0.70 | 0.00 |  |
| 11 | Renata Glasc | +0.70 | 0.70 | 0.00 |  |
| 12 | Viktor | +0.70 | 0.70 | 0.00 |  |
| 13 | Milio | +0.69 | 0.69 | 0.00 |  |
| 14 | Seraphine | +0.68 | 0.68 | 0.00 |  |
| 15 | Malzahar | +0.65 | 1.05 | 0.40 |  |
| 16 | Sejuani | +0.65 | 1.05 | 0.40 |  |
| 17 | Thresh | +0.65 | 0.70 | 0.05 |  |
| 18 | Zaahen | +0.64 | 0.89 | 0.25 |  |
| 19 | Kled | +0.64 | 0.79 | 0.15 |  |
| 20 | Nilah | +0.63 | 0.95 | 0.32 | attack dodge (Jubilant Veil) |
| 21 | Aurelion Sol | +0.60 | 0.70 | 0.10 |  |
| 22 | Camille | +0.58 | 0.79 | 0.21 |  |
| 23 | Taliyah | +0.55 | 1.03 | 0.48 |  |
| 24 | Rakan | +0.54 | 0.70 | 0.16 |  |
| 25 | Samira | +0.54 | 0.54 | 0.00 |  |
| 26 | Mel | +0.53 | 0.53 | 0.00 |  |
| 27 | Alistar | +0.52 | 0.95 | 0.43 |  |
| 28 | Fizz | +0.52 | 0.71 | 0.19 |  |
| 29 | Cassiopeia | +0.52 | 0.52 | 0.00 |  |
| 30 | Urgot | +0.51 | 0.70 | 0.19 |  |
| 31 | Yone | +0.51 | 0.70 | 0.19 |  |
| 32 | Bard | +0.51 | 0.51 | 0.00 |  |
| 33 | Lissandra | +0.51 | 0.51 | 0.00 |  |
| 34 | Tristana | +0.51 | 0.51 | 0.00 |  |
| 35 | Jax | +0.45 | 0.88 | 0.43 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 36 | Udyr | +0.45 | 0.88 | 0.43 |  |
| 37 | Ornn | +0.45 | 0.70 | 0.25 |  |
| 38 | Kalista | +0.45 | 0.45 | 0.00 |  |
| 39 | Ashe | +0.42 | 0.42 | 0.00 |  |
| 40 | Sivir | +0.42 | 0.42 | 0.00 |  |
| 41 | Nocturne | +0.41 | 0.84 | 0.43 |  |
| 42 | Riven | +0.41 | 0.70 | 0.29 |  |
| 43 | Rek'Sai | +0.41 | 0.66 | 0.25 |  |
| 44 | Annie | +0.40 | 0.40 | 0.00 |  |
| 45 | Xin Zhao | +0.39 | 0.77 | 0.38 |  |
| 46 | Shen | +0.36 | 1.10 | 0.74 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 47 | Rammus | +0.35 | 1.13 | 0.78 | attack reflect (Defensive Ball Curl) |
| 48 | Ahri | +0.35 | 0.35 | 0.00 |  |
| 49 | Azir | +0.35 | 0.35 | 0.00 |  |
| 50 | Brand | +0.35 | 0.35 | 0.00 |  |
| 51 | Draven | +0.35 | 0.35 | 0.00 |  |
| 52 | Elise | +0.35 | 0.35 | 0.00 |  |
| 53 | Hwei | +0.35 | 0.35 | 0.00 |  |
| 54 | Jayce | +0.35 | 0.35 | 0.00 |  |
| 55 | Kennen | +0.35 | 0.35 | 0.00 |  |
| 56 | Orianna | +0.35 | 0.35 | 0.00 |  |
| 57 | Sona | +0.35 | 0.35 | 0.00 |  |
| 58 | Soraka | +0.35 | 0.35 | 0.00 |  |
| 59 | Swain | +0.35 | 0.35 | 0.00 |  |
| 60 | Syndra | +0.35 | 0.35 | 0.00 |  |
| 61 | Veigar | +0.35 | 0.35 | 0.00 |  |
| 62 | Vex | +0.35 | 0.35 | 0.00 |  |
| 63 | Ziggs | +0.35 | 0.35 | 0.00 |  |
| 64 | Zilean | +0.35 | 0.35 | 0.00 |  |
| 65 | Zoe | +0.35 | 0.35 | 0.00 |  |
| 66 | Zyra | +0.35 | 0.35 | 0.00 |  |
| 67 | Xayah | +0.31 | 0.31 | 0.00 |  |
| 68 | Janna | +0.30 | 0.70 | 0.40 |  |
| 69 | Morgana | +0.28 | 0.44 | 0.16 |  |
| 70 | Amumu | +0.27 | 0.70 | 0.43 |  |
| 71 | Leona | +0.27 | 0.70 | 0.43 |  |
| 72 | Sett | +0.27 | 0.70 | 0.43 |  |
| 73 | Kayle | +0.25 | 0.25 | 0.00 |  |
| 74 | Maokai | +0.24 | 0.67 | 0.43 |  |
| 75 | Neeko | +0.24 | 0.35 | 0.11 |  |
| 76 | Fiddlesticks | +0.23 | 0.70 | 0.47 |  |
| 77 | Vayne | +0.21 | 0.35 | 0.14 |  |
| 78 | Malphite | +0.20 | 0.63 | 0.43 |  |
| 79 | Blitzcrank | +0.19 | 1.05 | 0.86 |  |
| 80 | Vladimir | +0.18 | 0.44 | 0.26 |  |
| 81 | Tahm Kench | +0.17 | 1.05 | 0.88 |  |
| 82 | Zac | +0.17 | 1.05 | 0.88 |  |
| 83 | Viego | +0.17 | 0.70 | 0.53 |  |
| 84 | Evelynn | +0.17 | 0.54 | 0.37 |  |
| 85 | Jarvan IV | +0.16 | 0.35 | 0.19 |  |
| 86 | Sylas | +0.16 | 0.35 | 0.19 |  |
| 87 | Galio | +0.15 | 1.01 | 0.86 |  |
| 88 | Pyke | +0.14 | 0.70 | 0.56 |  |
| 89 | Briar | +0.14 | 0.35 | 0.21 |  |
| 90 | Lillia | +0.14 | 0.35 | 0.21 |  |
| 91 | Quinn | +0.12 | 0.35 | 0.23 |  |
| 92 | Hecarim | +0.10 | 0.35 | 0.25 |  |
| 93 | Bel'Veth | +0.08 | 0.35 | 0.27 |  |
| 94 | Volibear | +0.08 | 0.35 | 0.27 |  |
| 95 | Gragas | +0.07 | 0.70 | 0.63 |  |
| 96 | Vel'Koz | +0.07 | 0.35 | 0.28 |  |
| 97 | Aphelios | +0.07 | 0.07 | 0.00 |  |
| 98 | Ambessa | +0.06 | 0.35 | 0.29 |  |
| 99 | Lee Sin | +0.06 | 0.35 | 0.29 |  |
| 100 | Shaco | +0.05 | 0.54 | 0.49 |  |
| 101 | Aurora | +0.03 | 0.18 | 0.15 |  |
| 102 | Xerath | +0.02 | 0.35 | 0.33 |  |
| 103 | Fiora | +0.01 | 0.41 | 0.40 |  |
| 104 | Irelia | 0.00 | 0.35 | 0.35 |  |
| 105 | Corki | 0.00 | 0.00 | 0.00 |  |
| 106 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 107 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 108 | Karma | 0.00 | 0.00 | 0.00 |  |
| 109 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 110 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 111 | Lux | 0.00 | 0.00 | 0.00 |  |
| 112 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 113 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 114 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 115 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 116 | Aatrox | -0.03 | 0.35 | 0.38 |  |
| 117 | Nautilus | -0.03 | 0.35 | 0.38 |  |
| 118 | Diana | -0.05 | 0.35 | 0.40 |  |
| 119 | Kassadin | -0.05 | 0.35 | 0.40 |  |
| 120 | Shyvana | -0.05 | 0.35 | 0.40 |  |
| 121 | Senna | -0.05 | 0.06 | 0.11 |  |
| 122 | Sion | -0.07 | 0.86 | 0.93 |  |
| 123 | Graves | -0.07 | 0.00 | 0.07 |  |
| 124 | Renekton | -0.08 | 0.35 | 0.43 |  |
| 125 | LeBlanc | -0.08 | 0.00 | 0.08 |  |
| 126 | Vi | -0.09 | 0.70 | 0.79 |  |
| 127 | Wukong | -0.10 | 0.35 | 0.45 |  |
| 128 | Zed | -0.11 | 0.18 | 0.29 |  |
| 129 | Kai'Sa | -0.11 | 0.00 | 0.11 |  |
| 130 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 131 | Varus | -0.11 | 0.00 | 0.11 |  |
| 132 | Yuumi | -0.12 | 0.42 | 0.54 |  |
| 133 | Qiyana | -0.12 | 0.33 | 0.45 |  |
| 134 | Gwen | -0.15 | 0.25 | 0.40 |  |
| 135 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 136 | Cho'Gath | -0.16 | 0.70 | 0.86 |  |
| 137 | Garen | -0.16 | 0.59 | 0.75 |  |
| 138 | Kayn | -0.16 | 0.54 | 0.70 |  |
| 139 | Caitlyn | -0.17 | 0.11 | 0.28 |  |
| 140 | Warwick | -0.19 | 0.80 | 0.99 |  |
| 141 | Master Yi | -0.25 | 0.36 | 0.61 |  |
| 142 | Poppy | -0.28 | 0.35 | 0.63 |  |
| 143 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 144 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 145 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 146 | Ekko | -0.29 | 0.00 | 0.29 |  |
| 147 | Mordekaiser | -0.30 | 0.45 | 0.75 |  |
| 148 | Singed | -0.34 | 0.52 | 0.86 |  |
| 149 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 150 | Skarner | -0.37 | 0.44 | 0.81 |  |
| 151 | Tryndamere | -0.38 | 0.00 | 0.38 |  |
| 152 | Darius | -0.40 | 0.35 | 0.75 |  |
| 153 | Trundle | -0.40 | 0.35 | 0.75 |  |
| 154 | Yorick | -0.40 | 0.35 | 0.75 |  |
| 155 | Akali | -0.40 | 0.00 | 0.40 |  |
| 156 | Akshan | -0.42 | 0.00 | 0.42 |  |
| 157 | Nasus | -0.43 | 0.43 | 0.86 | attack speed slow (Wither) |
| 158 | Illaoi | -0.43 | 0.00 | 0.43 |  |
| 159 | Locke | -0.43 | 0.00 | 0.43 |  |
| 160 | Talon | -0.43 | 0.00 | 0.43 |  |
| 161 | Karthus | -0.44 | 0.00 | 0.44 |  |
| 162 | Taric | -0.46 | 0.35 | 0.81 |  |
| 163 | Gangplank | -0.49 | 0.37 | 0.86 |  |
| 164 | Olaf | -0.55 | 0.31 | 0.86 |  |
| 165 | Pantheon | -0.55 | 0.21 | 0.76 |  |
| 166 | Rengar | -0.57 | 0.43 | 1.00 |  |
| 167 | Kha'Zix | -0.64 | 0.00 | 0.64 |  |
| 168 | Naafiri | -0.66 | 0.00 | 0.66 |  |
| 169 | Katarina | -0.71 | 0.00 | 0.71 |  |
| 170 | Dr. Mundo | -0.86 | 0.00 | 0.86 |  |
| 171 | Rumble | -0.86 | 0.00 | 0.86 |  |
| 172 | Nunu & Willump | -0.91 | 0.44 | 1.35 |  |
