# Counters to Neeko (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Neeko: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Neeko wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Neeko --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.70 |
| 2 | Vel'Koz | +0.82 | +1.00 | +1.00 | +1.00 | +0.23 | – | +0.00 |
| 3 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.50 |
| 4 | Sylas | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 5 | Corki | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 6 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 7 | Orianna | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 8 | Annie | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 9 | Tristana | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 10 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 11 | Dr. Mundo | +0.79 | +0.99 | +1.00 | +1.00 | −0.05 | +0.98 | +0.00 |
| 12 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 13 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 14 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 15 | Vayne | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 16 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 17 | Teemo | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 18 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 19 | Zeri | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 20 | Xayah | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 21 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 22 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 23 | Swain | +0.76 | +1.00 | +0.93 | +1.00 | −0.01 | – | +0.00 |
| 24 | Trundle | +0.76 | +1.00 | +1.00 | +1.00 | −0.30 | +1.00 | +0.02 |
| 25 | Gragas | +0.71 | +1.00 | +1.00 | +1.00 | −0.12 | +0.26 | +0.00 |
| 26 | Karma | +0.67 | +0.74 | +0.90 | +1.00 | −0.02 | – | +0.00 |
| 27 | Varus | +0.55 | +0.97 | +1.00 | +0.00 | +0.02 | – | +0.00 |
| 28 | Aphelios | +0.51 | +0.62 | +1.00 | +1.00 | +0.01 | −1.00 | +0.00 |
| 29 | Graves | +0.45 | +1.00 | +1.00 | −0.23 | +0.01 | −0.08 | +0.00 |
| 30 | Rumble | +0.45 | +0.71 | +0.92 | +0.07 | −0.07 | +0.34 | +0.00 |
| 31 | Shyvana | +0.42 | +1.00 | +1.00 | −0.50 | −0.20 | +0.46 | +0.00 |
| 32 | Miss Fortune | +0.41 | +1.00 | +1.00 | −1.00 | +0.05 | +1.00 | +0.00 |
| 33 | Camille | +0.40 | −0.55 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 34 | Ashe | +0.40 | +1.00 | +0.95 | −1.00 | +0.07 | +1.00 | +0.00 |
| 35 | Kindred | +0.40 | +0.22 | +1.00 | +1.00 | −0.06 | −1.00 | +0.00 |
| 36 | Rammus | +0.38 | +1.00 | +1.00 | −1.00 | −0.14 | +1.00 | +0.00 |
| 37 | Draven | +0.34 | +1.00 | +1.00 | −1.00 | +0.06 | – | +0.00 |
| 38 | Aurora | +0.34 | +1.00 | +1.00 | −1.00 | +0.04 | – | +0.00 |
| 39 | Maokai | +0.33 | +0.00 | +1.00 | +0.00 | −0.12 | +0.97 | +0.00 |
| 40 | Jayce | +0.33 | +0.00 | +1.00 | +1.00 | −0.15 | −1.00 | +0.00 |
| 41 | Malzahar | +0.32 | +1.00 | +1.00 | −1.00 | −0.07 | – | +0.00 |
| 42 | Ivern | +0.32 | +0.51 | +0.40 | +0.39 | −0.12 | – | +0.00 |
| 43 | Akshan | +0.32 | +0.99 | +1.00 | −1.00 | −0.07 | – | +0.00 |
| 44 | Twitch | +0.30 | +0.92 | +1.00 | −1.00 | −0.05 | – | +0.00 |
| 45 | Jinx | +0.29 | +1.00 | +0.97 | −1.00 | +0.02 | +0.00 | +0.00 |
| 46 | Milio | +0.29 | +0.92 | +0.88 | −1.00 | +0.06 | – | +0.00 |
| 47 | Udyr | +0.28 | +1.00 | −1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 48 | Zac | +0.26 | +0.09 | +0.05 | +0.98 | −0.22 | +0.61 | +0.00 |
| 49 | Briar | +0.25 | +1.00 | +1.00 | −1.00 | −0.32 | +0.00 | +0.00 |
| 50 | Tryndamere | +0.25 | −1.00 | +0.91 | +1.00 | −0.17 | +1.00 | +0.00 |
| 51 | Yasuo | +0.19 | +0.49 | +0.50 | −0.47 | −0.10 | +0.49 | +0.00 |
| 52 | Fizz | +0.18 | +1.00 | +1.00 | −1.00 | −0.19 | −0.94 | +0.00 |
| 53 | Anivia | +0.17 | +0.26 | +0.25 | +0.19 | −0.12 | +0.24 | +0.00 |
| 54 | Bel'Veth | +0.11 | −1.00 | +1.00 | +1.00 | +0.00 | −0.94 | +0.00 |
| 55 | Master Yi | +0.08 | +1.00 | −1.00 | +0.00 | −0.15 | +1.00 | +0.00 |
| 56 | Zaahen | +0.06 | −0.32 | −0.28 | +0.53 | +0.01 | +0.99 | +0.00 |
| 57 | Tahm Kench | +0.04 | +0.02 | +0.04 | −0.03 | +0.10 | +0.16 | +0.00 |
| 58 | Malphite | +0.01 | −0.01 | +0.06 | −0.11 | +0.17 | −0.01 | +0.00 |
| 59 | Sett | −0.10 | +0.34 | −1.00 | +1.00 | −0.21 | −1.00 | +0.00 |
| 60 | Fiddlesticks | −0.10 | +1.00 | −0.56 | −1.00 | +0.02 | – | +0.00 |
| 61 | Kalista | −0.11 | +0.47 | −0.10 | −0.82 | −0.19 | – | +0.00 |
| 62 | Gangplank | −0.14 | −0.39 | +1.00 | −1.00 | −0.09 | −0.76 | +0.00 |
| 63 | Sion | −0.17 | −0.31 | +0.11 | −0.98 | −0.03 | +0.81 | +0.00 |
| 64 | Taric | −0.18 | −0.29 | −0.26 | −0.07 | −0.01 | −0.26 | +0.00 |
| 65 | Aurelion Sol | −0.20 | +0.03 | +0.03 | −1.00 | +0.02 | – | +0.00 |
| 66 | Quinn | −0.21 | −0.77 | −0.77 | +1.00 | −0.02 | – | +0.00 |
| 67 | Azir | −0.23 | +1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 68 | Kennen | −0.25 | −0.77 | −0.13 | +0.10 | −0.16 | – | +0.00 |
| 69 | Mordekaiser | −0.26 | +0.17 | −0.42 | −0.70 | −0.10 | −0.41 | +0.00 |
| 70 | Zilean | −0.26 | −0.14 | +0.00 | −1.00 | −0.03 | – | +0.00 |
| 71 | Yunara | −0.27 | −0.62 | −0.10 | −1.00 | +0.09 | +1.00 | +0.00 |
| 72 | Poppy | −0.30 | −1.00 | +1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 73 | Karthus | −0.30 | −0.23 | −0.21 | −0.83 | −0.03 | −0.24 | +0.00 |
| 74 | Darius | −0.30 | −0.96 | +0.87 | −0.82 | −0.16 | −0.93 | +0.00 |
| 75 | Ziggs | −0.32 | +0.00 | −1.00 | −1.00 | +0.21 | +1.00 | +0.00 |
| 76 | Kled | −0.32 | −0.31 | −0.30 | −0.92 | −0.12 | +0.35 | +0.00 |
| 77 | Wukong | −0.32 | −1.00 | +1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 78 | Samira | −0.34 | −1.00 | −1.00 | +1.00 | −0.04 | – | +0.00 |
| 79 | Gwen | −0.34 | −0.19 | −1.00 | +0.52 | −0.60 | −0.60 | +0.00 |
| 80 | Braum | −0.38 | −0.26 | −0.37 | −0.63 | −0.04 | −0.90 | +0.00 |
| 81 | Lillia | −0.42 | −1.00 | +0.14 | −1.00 | −0.08 | +0.13 | +0.00 |
| 82 | Olaf | −0.43 | −1.00 | −1.00 | +1.00 | −0.20 | −1.00 | +0.00 |
| 83 | Elise | −0.45 | −1.00 | −1.00 | +0.56 | −0.09 | – | +0.00 |
| 84 | Rengar | −0.51 | −1.00 | −1.00 | +0.01 | +0.27 | −0.54 | +0.00 |
| 85 | Lee Sin | −0.60 | −0.99 | −0.98 | +0.00 | −0.11 | −0.95 | +0.00 |
| 86 | Xerath | −0.64 | −1.00 | −0.52 | −1.00 | +0.03 | – | +0.00 |
| 87 | Hwei | −0.67 | −1.00 | −1.00 | −0.47 | −0.03 | – | +0.00 |
| 88 | Nocturne | −0.69 | −0.87 | −0.80 | −0.84 | −0.15 | −0.83 | +0.00 |
| 89 | Brand | −0.70 | −1.00 | −0.71 | −1.00 | −0.02 | – | +0.00 |
| 90 | Lux | −0.71 | −1.00 | −0.78 | −1.00 | +0.02 | – | +0.00 |
| 91 | Ornn | −0.72 | −0.97 | −0.79 | −1.00 | −0.07 | −0.69 | +0.00 |
| 92 | Shen | −0.73 | −1.00 | −1.00 | −0.61 | −0.08 | −1.00 | +0.00 |
| 93 | Xin Zhao | −0.75 | −0.97 | −1.00 | −0.64 | −0.20 | −0.99 | +0.00 |
| 94 | Nautilus | −0.75 | −0.95 | −0.86 | −1.00 | +0.03 | −1.00 | +0.00 |
| 95 | Ryze | −0.75 | −0.98 | −0.95 | −1.00 | +0.06 | – | +0.00 |
| 96 | Cassiopeia | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 97 | Senna | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 98 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 99 | Smolder | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 100 | Zyra | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 101 | Warwick | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 102 | Renata Glasc | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 103 | Bard | −0.77 | −0.95 | −0.96 | −1.00 | −0.12 | – | +0.00 |
| 104 | Syndra | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 105 | Zoe | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 106 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 107 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 108 | Ezreal | −0.78 | −0.92 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 109 | Mel | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 110 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 111 | Diana | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 112 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 113 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 114 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 115 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 116 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 117 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 118 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 119 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 120 | Nunu & Willump | −0.79 | −1.00 | −0.98 | −1.00 | +0.02 | −1.00 | +0.00 |
| 121 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 122 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 123 | Nidalee | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 124 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 125 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 126 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 127 | Kai'Sa | −0.80 | −0.93 | −1.00 | −1.00 | −0.23 | – | +0.00 |
| 128 | Janna | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 129 | Lissandra | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 130 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 131 | Irelia | −0.80 | −0.98 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 132 | Alistar | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 133 | Jarvan IV | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 134 | Kayn | −0.81 | −0.98 | −1.00 | −0.98 | −0.09 | −1.00 | +0.00 |
| 135 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 136 | Rakan | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 137 | Rell | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 138 | Sejuani | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 139 | Kassadin | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 140 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 141 | Illaoi | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 142 | Gnar | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −0.99 | +0.00 |
| 143 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 144 | Renekton | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −0.97 | +0.00 |
| 145 | Cho'Gath | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 146 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 147 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 148 | Riven | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | −0.89 | +0.00 |
| 149 | Morgana | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 150 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 151 | Kha'Zix | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 152 | Nilah | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 153 | Skarner | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 154 | Volibear | −0.82 | −0.96 | −1.00 | −0.96 | −0.26 | −1.00 | +0.00 |
| 155 | Garen | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −0.95 | +0.00 |
| 156 | Shaco | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 157 | Talon | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 158 | Naafiri | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 159 | Zed | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 160 | Hecarim | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 161 | Yone | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 162 | Ekko | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 163 | Locke | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 164 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 165 | Viego | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 166 | Aatrox | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 167 | Vi | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 168 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |
| 169 | Pyke | −0.85 | −1.00 | −1.00 | −1.00 | −0.35 | −1.00 | +0.00 |
| 170 | Rek'Sai | −0.85 | −1.00 | −1.00 | −1.00 | −0.36 | −1.00 | +0.00 |
| 171 | Ambessa | −0.87 | −1.00 | −1.00 | −1.00 | −0.49 | −1.00 | +0.00 |
| 172 | Singed | −0.88 | −1.00 | −1.00 | −1.00 | −0.55 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Neeko's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Neeko's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Neeko` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +1.16)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Neeko's Pop Blossom. Untargetable for 0.75 s; Pop Blossom takes 0.6 s to land, enough to react. (Fizz E Playful → Neeko R Pop Blossom)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 0.75 s; Tangle-Barbs takes 1.02 s to land, enough to react. (Fizz E Playful → Neeko E Tangle-Barbs)
- **0.11** reveal: Chum the Waters reveals Neeko through Shapesplitter's stealth. (Fizz R Chum the Waters → Neeko W Shapesplitter)
- Watch out: Neeko's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 2. Morgana (net +1.07)

- **0.80** cc immunity: Black Shield makes Morgana immune to Neeko's Pop Blossom (airborne, stun). Immune for 5 s, long enough to use ahead of Pop Blossom. (Morgana E Black Shield → Neeko R Pop Blossom)
- **0.54** cc immunity: Black Shield makes Morgana immune to Neeko's Tangle-Barbs (root). Immune for 5 s, long enough to use ahead of Tangle-Barbs. (Morgana E Black Shield → Neeko E Tangle-Barbs)
- **0.11** reveal: Soul Shackles reveals Neeko through Shapesplitter's stealth. (Morgana R Soul Shackles → Neeko W Shapesplitter)
- Watch out: Neeko's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

#### 3. Kled (net +1.04)

- **0.71** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Neeko's Pop Blossom (airborne, stun). Immune for ?; Pop Blossom takes 0.6 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Neeko R Pop Blossom)
- **0.32** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Neeko's Tangle-Barbs (root). Immune for ?; Tangle-Barbs takes 1.02 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Neeko E Tangle-Barbs)
- **0.11** reveal: Bear Trap on a Rope reveals Neeko through Shapesplitter's stealth. (Kled Q Bear Trap on a Rope → Neeko W Shapesplitter)
- Watch out: Neeko's basic attacks reach 300 units farther than Kled's (550 vs 250 attack range).

#### 4. Fiora (net +1.01)

- **0.90** parry: Riposte parries Neeko's Pop Blossom and stuns back. Parry for 0.75 s; Pop Blossom takes 0.6 s to land, enough to react. Negating Pop Blossom's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Neeko R Pop Blossom)
- **0.64** parry: Riposte parries Neeko's Tangle-Barbs and stuns back. Parry for 0.75 s; Tangle-Barbs takes 1.02 s to land, enough to react. Negating Tangle-Barbs's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Neeko E Tangle-Barbs)
- **0.05** attack speed slow: Riposte cuts Neeko's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Neeko basic attacks)
- Watch out: Neeko's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

#### 5. Bard (net +0.97)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Neeko's Pop Blossom. Untargetable for 2.5 s, long enough to use ahead of Pop Blossom. (Bard R Tempered Fate → Neeko R Pop Blossom)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 2.5 s, long enough to use ahead of Tangle-Barbs. (Bard R Tempered Fate → Neeko E Tangle-Barbs)

#### 6. Lissandra (net +0.97)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Neeko's Pop Blossom. Untargetable for 2.5 s, long enough to use ahead of Pop Blossom. (Lissandra R Frozen Tomb → Neeko R Pop Blossom)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 2.5 s, long enough to use ahead of Tangle-Barbs. (Lissandra R Frozen Tomb → Neeko E Tangle-Barbs)

#### 7. Maokai (net +0.93)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Neeko's Pop Blossom. Untargetable for 1.4 s; Pop Blossom takes 0.6 s to land, enough to react. (Maokai W Twisted Advance → Neeko R Pop Blossom)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 1.4 s; Tangle-Barbs takes 1.02 s to land, enough to react. (Maokai W Twisted Advance → Neeko E Tangle-Barbs)
- Watch out: Neeko's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

#### 8. Udyr (net +0.93)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Neeko's Pop Blossom (airborne, stun). Immune for 1.5 s, long enough to use ahead of Pop Blossom. (Udyr E Blazing Stampede → Neeko R Pop Blossom)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Neeko's Tangle-Barbs (root). Immune for 1.5 s, long enough to use ahead of Tangle-Barbs. (Udyr E Blazing Stampede → Neeko E Tangle-Barbs)
- Watch out: Neeko's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range).

#### 9. Aurora (net +0.93)

- **0.75** untargetable: Between Worlds makes Aurora untargetable, dodging Neeko's Pop Blossom. Untargetable for 0.4 s; Pop Blossom takes 0.6 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Neeko R Pop Blossom)
- **0.32** untargetable: Between Worlds makes Aurora untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 0.4 s; Tangle-Barbs takes 1.02 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Neeko E Tangle-Barbs)
- **0.08** cc immunity: Between Worlds is displacement immune, ignoring Neeko's Pop Blossom (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Neeko R Pop Blossom)

#### 10. Vladimir (net +0.91)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Neeko's Pop Blossom. Untargetable for 2 s, long enough to use ahead of Pop Blossom. (Vladimir W Sanguine Pool → Neeko R Pop Blossom)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 2 s, long enough to use ahead of Tangle-Barbs. (Vladimir W Sanguine Pool → Neeko E Tangle-Barbs)
- Watch out: Neeko's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +1.16 | 1.26 | 0.10 |  |
| 2 | Morgana | +1.07 | 1.18 | 0.11 |  |
| 3 | Kled | +1.04 | 1.12 | 0.08 |  |
| 4 | Fiora | +1.01 | 1.23 | 0.22 |  |
| 5 | Bard | +0.97 | 0.97 | 0.00 |  |
| 6 | Lissandra | +0.97 | 0.97 | 0.00 |  |
| 7 | Maokai | +0.93 | 1.15 | 0.22 |  |
| 8 | Udyr | +0.93 | 1.15 | 0.22 |  |
| 9 | Aurora | +0.93 | 0.93 | 0.00 |  |
| 10 | Vladimir | +0.91 | 1.07 | 0.16 |  |
| 11 | Xayah | +0.91 | 0.91 | 0.00 |  |
| 12 | Camille | +0.88 | 0.99 | 0.11 |  |
| 13 | Rek'Sai | +0.86 | 1.00 | 0.14 |  |
| 14 | Gwen | +0.84 | 1.06 | 0.22 |  |
| 15 | Zaahen | +0.83 | 0.97 | 0.14 |  |
| 16 | Evelynn | +0.82 | 0.97 | 0.15 |  |
| 17 | Shaco | +0.82 | 0.97 | 0.15 |  |
| 18 | Braum | +0.77 | 0.99 | 0.22 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 19 | Zed | +0.76 | 0.91 | 0.15 |  |
| 20 | Master Yi | +0.74 | 1.06 | 0.32 |  |
| 21 | Milio | +0.72 | 0.72 | 0.00 |  |
| 22 | Yasuo | +0.71 | 0.85 | 0.14 | projectile block (Wind Wall) |
| 23 | Sivir | +0.71 | 0.71 | 0.00 |  |
| 24 | Yuumi | +0.70 | 1.15 | 0.45 |  |
| 25 | Rengar | +0.70 | 1.14 | 0.44 |  |
| 26 | Nocturne | +0.69 | 0.91 | 0.22 |  |
| 27 | Kalista | +0.67 | 0.67 | 0.00 |  |
| 28 | Samira | +0.65 | 0.65 | 0.00 | projectile block (Blade Whirl) |
| 29 | Mel | +0.61 | 0.61 | 0.00 | projectile block (Rebuttal) |
| 30 | Alistar | +0.56 | 0.78 | 0.22 |  |
| 31 | Kayle | +0.56 | 0.56 | 0.00 |  |
| 32 | Olaf | +0.53 | 0.97 | 0.44 |  |
| 33 | Sion | +0.49 | 0.98 | 0.49 |  |
| 34 | Kayn | +0.43 | 0.99 | 0.56 |  |
| 35 | Gangplank | +0.43 | 0.87 | 0.44 |  |
| 36 | Warwick | +0.41 | 1.08 | 0.67 |  |
| 37 | Malzahar | +0.32 | 0.69 | 0.37 |  |
| 38 | Lulu | +0.32 | 0.32 | 0.00 |  |
| 39 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 40 | Xin Zhao | +0.25 | 0.46 | 0.21 |  |
| 41 | Hwei | +0.22 | 0.22 | 0.00 |  |
| 42 | Karma | +0.22 | 0.22 | 0.00 |  |
| 43 | Vex | +0.15 | 0.15 | 0.00 |  |
| 44 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 45 | Elise | +0.11 | 0.11 | 0.00 |  |
| 46 | Kai'Sa | +0.11 | 0.11 | 0.00 |  |
| 47 | LeBlanc | +0.11 | 0.11 | 0.00 |  |
| 48 | Nidalee | +0.11 | 0.11 | 0.00 |  |
| 49 | Renata Glasc | +0.11 | 0.11 | 0.00 |  |
| 50 | Zyra | +0.11 | 0.11 | 0.00 |  |
| 51 | Lee Sin | +0.07 | 0.22 | 0.15 |  |
| 52 | Thresh | +0.07 | 0.11 | 0.04 |  |
| 53 | K'Sante | +0.05 | 0.16 | 0.11 |  |
| 54 | Annie | +0.04 | 0.04 | 0.00 |  |
| 55 | Caitlyn | +0.03 | 0.31 | 0.28 |  |
| 56 | Nilah | +0.02 | 0.20 | 0.18 |  |
| 57 | Jax | +0.01 | 0.23 | 0.22 |  |
| 58 | Sylas | +0.01 | 0.11 | 0.10 |  |
| 59 | Garen | 0.00 | 0.41 | 0.41 |  |
| 60 | Malphite | 0.00 | 0.22 | 0.22 |  |
| 61 | Briar | 0.00 | 0.11 | 0.11 |  |
| 62 | Urgot | 0.00 | 0.11 | 0.11 |  |
| 63 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 64 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 65 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 66 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 67 | Azir | 0.00 | 0.00 | 0.00 |  |
| 68 | Brand | 0.00 | 0.00 | 0.00 |  |
| 69 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 70 | Corki | 0.00 | 0.00 | 0.00 |  |
| 71 | Draven | 0.00 | 0.00 | 0.00 |  |
| 72 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 73 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 74 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 75 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 76 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 77 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 78 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 79 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 80 | Lux | 0.00 | 0.00 | 0.00 |  |
| 81 | Nami | 0.00 | 0.00 | 0.00 |  |
| 82 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 83 | Senna | 0.00 | 0.00 | 0.00 |  |
| 84 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 85 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 86 | Sona | 0.00 | 0.00 | 0.00 |  |
| 87 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 88 | Swain | 0.00 | 0.00 | 0.00 |  |
| 89 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 90 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 91 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 92 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 93 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 94 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 95 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 96 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 97 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 98 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 99 | Jarvan IV | -0.02 | 0.08 | 0.10 |  |
| 100 | Yone | -0.02 | 0.08 | 0.10 |  |
| 101 | Illaoi | -0.03 | 0.19 | 0.22 |  |
| 102 | Akali | -0.04 | 0.11 | 0.15 |  |
| 103 | Ambessa | -0.04 | 0.11 | 0.15 |  |
| 104 | Graves | -0.05 | 0.00 | 0.05 |  |
| 105 | Varus | -0.05 | 0.00 | 0.05 |  |
| 106 | Hecarim | -0.06 | 0.08 | 0.14 |  |
| 107 | Ornn | -0.06 | 0.08 | 0.14 |  |
| 108 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 109 | Sett | -0.07 | 0.15 | 0.22 |  |
| 110 | Volibear | -0.07 | 0.08 | 0.15 |  |
| 111 | Pantheon | -0.09 | 0.53 | 0.62 |  |
| 112 | Rakan | -0.09 | 0.00 | 0.09 |  |
| 113 | Aatrox | -0.10 | 0.11 | 0.21 |  |
| 114 | Ivern | -0.11 | 0.00 | 0.11 |  |
| 115 | Lillia | -0.12 | 0.00 | 0.12 |  |
| 116 | Akshan | -0.13 | 0.11 | 0.24 |  |
| 117 | Viego | -0.13 | 0.08 | 0.21 |  |
| 118 | Shyvana | -0.14 | 0.08 | 0.22 |  |
| 119 | Wukong | -0.14 | 0.00 | 0.14 |  |
| 120 | Quinn | -0.14 | 0.00 | 0.14 |  |
| 121 | Rell | -0.14 | 0.00 | 0.14 |  |
| 122 | Rammus | -0.15 | 0.22 | 0.37 |  |
| 123 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 124 | Ekko | -0.15 | 0.00 | 0.15 |  |
| 125 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 126 | Riven | -0.15 | 0.00 | 0.15 |  |
| 127 | Talon | -0.15 | 0.00 | 0.15 |  |
| 128 | Fiddlesticks | -0.16 | 0.22 | 0.38 |  |
| 129 | Irelia | -0.19 | 0.00 | 0.19 |  |
| 130 | Nautilus | -0.21 | 0.00 | 0.21 |  |
| 131 | Tryndamere | -0.21 | 0.00 | 0.21 |  |
| 132 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 133 | Skarner | -0.22 | 0.22 | 0.44 |  |
| 134 | Vi | -0.22 | 0.15 | 0.37 |  |
| 135 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 136 | Diana | -0.22 | 0.00 | 0.22 |  |
| 137 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 138 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 139 | Leona | -0.22 | 0.00 | 0.22 |  |
| 140 | Locke | -0.22 | 0.00 | 0.22 |  |
| 141 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 142 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 143 | Pyke | -0.23 | 0.00 | 0.23 |  |
| 144 | Twisted Fate | -0.24 | 0.11 | 0.35 |  |
| 145 | Vel'Koz | -0.26 | 0.00 | 0.26 |  |
| 146 | Mordekaiser | -0.27 | 0.14 | 0.41 |  |
| 147 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 148 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 149 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 150 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 151 | Gragas | -0.32 | 0.00 | 0.32 |  |
| 152 | Zac | -0.33 | 0.11 | 0.44 |  |
| 153 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 154 | Shen | -0.38 | 0.22 | 0.60 |  |
| 155 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 156 | Janna | -0.40 | 0.00 | 0.40 |  |
| 157 | Darius | -0.41 | 0.00 | 0.41 |  |
| 158 | Katarina | -0.41 | 0.00 | 0.41 |  |
| 159 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 160 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 161 | Naafiri | -0.42 | 0.11 | 0.53 |  |
| 162 | Poppy | -0.42 | 0.00 | 0.42 |  |
| 163 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 164 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 165 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 166 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 167 | Singed | -0.44 | 0.00 | 0.44 |  |
| 168 | Taric | -0.44 | 0.00 | 0.44 |  |
| 169 | Tahm Kench | -0.47 | 0.00 | 0.47 |  |
| 170 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 171 | Galio | -0.70 | 0.00 | 0.70 |  |
| 172 | Nunu & Willump | -0.81 | 0.00 | 0.81 |  |
