# Counters to Nautilus (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Nautilus: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Nautilus wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Nautilus --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Yorick | +0.85 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +1.00 |
| 2 | Olaf | +0.85 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +1.00 |
| 3 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +1.00 |
| 4 | Rengar | +0.82 | +1.00 | +1.00 | +1.00 | +0.33 | +0.71 | +0.00 |
| 5 | Xayah | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 6 | Urgot | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 7 | Gwen | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 8 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 9 | Milio | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 10 | Morgana | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 11 | Heimerdinger | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 12 | Taric | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 13 | Gangplank | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 14 | Twisted Fate | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 15 | Aatrox | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 16 | Kled | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 17 | Diana | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 18 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 19 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 20 | Lucian | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 21 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 22 | Sivir | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 23 | Vayne | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 24 | Lulu | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 25 | Yone | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 26 | Aphelios | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 27 | Samira | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 28 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 29 | Graves | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 30 | Jhin | +0.80 | +0.97 | +0.99 | +1.00 | +0.05 | +1.00 | +0.00 |
| 31 | Smolder | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 32 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 33 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 34 | Shaco | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 35 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 36 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 37 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | +0.96 | +0.00 |
| 38 | Kalista | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 39 | Warwick | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 40 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 41 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 42 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 43 | Jarvan IV | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 44 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 45 | Viego | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 46 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 47 | Wukong | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 48 | Viktor | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 49 | Hwei | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 50 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 51 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 52 | Sett | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 53 | Rakan | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 54 | Swain | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 55 | Akshan | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 56 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 57 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 58 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 59 | Poppy | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 60 | Ambessa | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 61 | Yunara | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 62 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 63 | Pantheon | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 64 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 65 | Ashe | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 66 | K'Sante | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 67 | Vi | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 68 | Rumble | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 69 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 70 | Trundle | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 71 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 72 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 73 | Alistar | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 74 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 75 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 76 | Irelia | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 77 | Ezreal | +0.78 | +1.00 | +0.91 | +1.00 | −0.01 | +1.00 | +0.00 |
| 78 | Lee Sin | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 79 | Maokai | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 80 | Braum | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 81 | Xin Zhao | +0.77 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +0.00 |
| 82 | Mordekaiser | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 83 | Skarner | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 84 | Kassadin | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 85 | Rammus | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 86 | Neeko | +0.75 | +0.86 | +0.95 | +1.00 | −0.03 | +1.00 | +0.00 |
| 87 | Karma | +0.73 | +1.00 | +0.78 | +1.00 | −0.08 | +0.99 | +0.00 |
| 88 | Aurora | +0.72 | +1.00 | +1.00 | +1.00 | +0.00 | +0.20 | +0.00 |
| 89 | Rek'Sai | +0.67 | +1.00 | +1.00 | +1.00 | −0.00 | −0.31 | +0.00 |
| 90 | Zac | +0.67 | +1.00 | +1.00 | +1.00 | −0.33 | +0.15 | +0.00 |
| 91 | Elise | +0.66 | +1.00 | +1.00 | +1.00 | +0.01 | −0.45 | +0.00 |
| 92 | Sylas | +0.61 | +1.00 | +1.00 | +1.00 | +0.04 | −1.00 | +0.00 |
| 93 | Master Yi | +0.59 | +1.00 | +1.00 | +0.00 | −0.07 | +1.00 | +0.00 |
| 94 | Sion | +0.55 | +0.86 | +1.00 | +0.00 | −0.08 | +1.00 | +0.00 |
| 95 | Varus | +0.52 | −0.09 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 96 | Nilah | +0.50 | +1.00 | −0.19 | +1.00 | +0.01 | +1.00 | +0.00 |
| 97 | Quinn | +0.50 | +1.00 | −0.23 | +1.00 | +0.03 | +1.00 | +0.00 |
| 98 | Naafiri | +0.38 | +1.00 | +0.96 | +0.00 | −0.08 | −1.00 | +0.00 |
| 99 | Fizz | +0.31 | +1.00 | +1.00 | −1.00 | −0.14 | – | +0.00 |
| 100 | Riven | +0.30 | +1.00 | −1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 101 | Shen | +0.29 | +0.07 | −0.12 | +1.00 | +0.00 | +1.00 | +0.00 |
| 102 | Mel | +0.28 | −0.07 | −0.01 | +1.00 | +0.00 | +0.99 | +0.00 |
| 103 | Miss Fortune | +0.27 | +1.00 | +1.00 | −0.90 | −0.07 | −0.34 | +0.00 |
| 104 | Rell | +0.27 | +0.05 | +0.08 | +1.00 | +0.10 | – | +0.00 |
| 105 | Briar | +0.26 | −1.00 | +1.00 | +1.00 | −0.25 | +1.00 | +0.00 |
| 106 | Singed | +0.25 | +0.26 | +0.16 | +0.26 | −0.05 | +1.00 | +0.00 |
| 107 | Lillia | +0.24 | +0.11 | +0.56 | +0.26 | −0.01 | +0.22 | +0.00 |
| 108 | Gragas | +0.20 | −0.04 | −0.00 | +1.00 | −0.05 | – | +0.00 |
| 109 | Kayn | +0.14 | +0.93 | +0.86 | −1.00 | −0.05 | −1.00 | +0.00 |
| 110 | Annie | +0.12 | +0.05 | +0.24 | −0.31 | +0.02 | +1.00 | +0.00 |
| 111 | Kai'Sa | +0.09 | −0.25 | −0.50 | +1.00 | −0.15 | +1.00 | +0.00 |
| 112 | Ekko | +0.09 | +0.98 | −1.00 | +0.03 | −0.10 | +1.00 | +0.00 |
| 113 | Tahm Kench | +0.09 | +0.09 | +0.10 | +0.11 | +0.05 | – | +0.00 |
| 114 | Kindred | +0.07 | +0.96 | −1.00 | +0.00 | −0.13 | +1.00 | +0.00 |
| 115 | Syndra | +0.05 | +0.08 | +0.08 | +0.02 | −0.00 | +0.13 | +0.00 |
| 116 | Ornn | +0.05 | +0.07 | +0.02 | +0.07 | +0.05 | – | +0.00 |
| 117 | Sejuani | +0.04 | −1.00 | +0.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 118 | Jinx | +0.03 | −0.07 | −0.98 | +1.00 | −0.08 | +1.00 | +0.00 |
| 119 | Lux | +0.02 | −0.00 | +0.00 | +0.04 | −0.01 | +0.13 | +0.00 |
| 120 | Soraka | −0.01 | −0.02 | −0.05 | +0.06 | −0.03 | −0.03 | +0.00 |
| 121 | Kennen | −0.03 | +0.53 | +0.54 | −1.00 | −0.15 | −0.73 | +0.00 |
| 122 | Vel'Koz | −0.07 | −0.03 | −0.14 | −0.13 | +0.08 | −0.10 | +0.00 |
| 123 | Zoe | −0.07 | −0.09 | −0.08 | −0.09 | −0.04 | −0.09 | +0.00 |
| 124 | Nunu & Willump | −0.09 | −0.12 | −0.09 | −0.14 | +0.07 | −0.18 | +0.00 |
| 125 | Veigar | −0.11 | −0.18 | −0.11 | −0.11 | −0.02 | −0.15 | +0.00 |
| 126 | Anivia | −0.12 | −0.16 | −0.11 | −0.11 | −0.08 | −0.17 | +0.00 |
| 127 | Zyra | −0.14 | −0.20 | −0.17 | −0.01 | −0.04 | −0.41 | +0.00 |
| 128 | Leona | −0.15 | −0.04 | −0.03 | −0.52 | −0.07 | – | +0.00 |
| 129 | Zed | −0.17 | +0.00 | −1.00 | +1.00 | −0.12 | −1.00 | +0.00 |
| 130 | Malzahar | −0.17 | −0.12 | −0.15 | +0.00 | −0.06 | −0.94 | +0.00 |
| 131 | Tristana | −0.22 | −1.00 | −1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 132 | Brand | −0.24 | −0.92 | −0.90 | +1.00 | −0.08 | +0.33 | +0.00 |
| 133 | Karthus | −0.25 | −0.30 | −0.33 | −0.31 | −0.04 | −0.25 | +0.00 |
| 134 | Nami | −0.29 | −0.10 | −0.28 | −0.63 | −0.07 | −0.62 | +0.00 |
| 135 | Ahri | −0.31 | −0.05 | −0.09 | −0.91 | +0.03 | −1.00 | +0.00 |
| 136 | Amumu | −0.34 | −1.00 | −1.00 | +1.00 | −0.04 | – | +0.00 |
| 137 | Aurelion Sol | −0.37 | −0.28 | −0.29 | −1.00 | +0.00 | −0.26 | +0.00 |
| 138 | Nidalee | −0.41 | −1.00 | −0.98 | +1.00 | −0.07 | −0.99 | +0.00 |
| 139 | Senna | −0.48 | −0.09 | −0.78 | −0.89 | −0.01 | −0.84 | +0.00 |
| 140 | Bard | −0.49 | −0.68 | −0.10 | −0.94 | −0.03 | −1.00 | +0.00 |
| 141 | Draven | −0.51 | −0.77 | −0.76 | −0.98 | −0.08 | +0.84 | +0.00 |
| 142 | Ziggs | −0.51 | +0.09 | −1.00 | −1.00 | +0.07 | −0.96 | +0.00 |
| 143 | Vex | −0.54 | −0.11 | −0.93 | −0.94 | −0.07 | −0.78 | +0.00 |
| 144 | Zilean | −0.55 | −0.76 | −1.00 | −0.91 | −0.00 | +0.69 | +0.00 |
| 145 | Janna | −0.59 | −0.95 | −0.24 | −0.94 | −0.05 | −0.99 | +0.00 |
| 146 | LeBlanc | −0.62 | −1.00 | −0.98 | −1.00 | −0.08 | +0.88 | +0.00 |
| 147 | Akali | −0.64 | −1.00 | −0.35 | −1.00 | −0.02 | −1.00 | +0.00 |
| 148 | Lissandra | −0.70 | −0.98 | −0.98 | −0.57 | +0.01 | −0.96 | +0.00 |
| 149 | Ryze | −0.75 | −1.00 | −1.00 | −0.90 | −0.03 | −0.67 | +0.00 |
| 150 | Blitzcrank | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 151 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 152 | Azir | −0.78 | −0.87 | −1.00 | −1.00 | −0.09 | −0.99 | +0.00 |
| 153 | Caitlyn | −0.79 | −0.89 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 154 | Xerath | −0.79 | −0.95 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 155 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | −0.94 | +0.00 |
| 156 | Cassiopeia | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 157 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 158 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 159 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 160 | Seraphine | −0.81 | −0.99 | −0.99 | −1.00 | −0.07 | −1.00 | +0.00 |
| 161 | Twitch | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 162 | Sona | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 163 | Fiddlesticks | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 164 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 165 | Renata Glasc | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 166 | Galio | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 167 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.00 |
| 168 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 169 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 170 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.00 |
| 171 | Locke | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 172 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Nautilus's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nautilus's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nautilus` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Morgana (net +1.39)

- **0.80** cc immunity: Black Shield makes Morgana immune to Nautilus's Depth Charge (airborne, stun). Immune for 5 s, long enough to use ahead of Depth Charge. (Morgana E Black Shield → Nautilus R Depth Charge)
- **0.62** cc immunity: Black Shield makes Morgana immune to Nautilus's Dredge Line (airborne, stun). Immune for 5 s, long enough to use ahead of Dredge Line. (Morgana E Black Shield → Nautilus Q Dredge Line)
- **0.43** cc immunity: Black Shield makes Morgana immune to Nautilus's Staggering Blow (root). Immune for 5 s, long enough to use ahead of Staggering Blow. (Morgana E Black Shield → Nautilus I Staggering Blow)

#### 2. Sivir (net +1.36)

- **0.80** spell shield: Spell Shield's spell shield blocks Nautilus's Depth Charge. Spell shield for 1.5 s, long enough to use ahead of Depth Charge. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nautilus R Depth Charge)
- **0.41** range: Sivir's basic attacks reach 325 units farther than Nautilus's (500 vs 175 attack range). Nautilus closes the gap with Dredge Line. (Sivir basic attacks → Nautilus basic attacks)
- **0.29** spell shield: Spell Shield's spell shield blocks part of Nautilus's Dredge Line. Spell shield for 1.5 s, long enough to use ahead of Dredge Line. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the ability but Nautilus will still dash partway to the target. (Sivir E Spell Shield → Nautilus Q Dredge Line)

#### 3. Udyr (net +1.35)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Nautilus's Depth Charge (airborne, stun). Immune for 1.5 s, long enough to use ahead of Depth Charge. (Udyr E Blazing Stampede → Nautilus R Depth Charge)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Nautilus's Dredge Line (airborne, stun). Immune for 1.5 s, long enough to use ahead of Dredge Line. (Udyr E Blazing Stampede → Nautilus Q Dredge Line)
- **0.55** cc immunity: Blazing Stampede makes Udyr immune to Nautilus's Staggering Blow (root). Immune for 1.5 s, long enough to use ahead of Staggering Blow. (Udyr E Blazing Stampede → Nautilus I Staggering Blow)

#### 4. Bard (net +1.30)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Nautilus's Depth Charge. Untargetable for 2.5 s, long enough to use ahead of Depth Charge. (Bard R Tempered Fate → Nautilus R Depth Charge)
- **0.38** untargetable: Tempered Fate makes Bard untargetable, dodging Nautilus's Dredge Line. Untargetable for 2.5 s, long enough to use ahead of Dredge Line. (Bard R Tempered Fate → Nautilus Q Dredge Line)
- **0.31** range: Bard's basic attacks reach 325 units farther than Nautilus's (500 vs 175 attack range). Nautilus closes the gap with Dredge Line. (Bard basic attacks → Nautilus basic attacks)

#### 5. Fiora (net +1.28)

- **0.90** parry: Riposte parries Nautilus's Depth Charge and stuns back. Parry for 0.75 s; Depth Charge takes 3.46 s to land, enough to react. Negating Depth Charge's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Nautilus R Depth Charge)
- **0.72** parry: Riposte parries Nautilus's Dredge Line and stuns back. Parry for 0.75 s; Dredge Line takes 0.81 s to land, enough to react. Negating Dredge Line's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Nautilus Q Dredge Line)
- **0.08** attack speed slow: Riposte cuts Nautilus's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Nautilus basic attacks)

#### 6. Lissandra (net +1.25)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Nautilus's Depth Charge. Untargetable for 2.5 s, long enough to use ahead of Depth Charge. (Lissandra R Frozen Tomb → Nautilus R Depth Charge)
- **0.38** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Nautilus's Dredge Line. Untargetable for 2.5 s, long enough to use ahead of Dredge Line. (Lissandra R Frozen Tomb → Nautilus Q Dredge Line)
- **0.21** range: Lissandra's basic attacks reach 375 units farther than Nautilus's (550 vs 175 attack range). Nautilus closes the gap with Dredge Line. (Lissandra basic attacks → Nautilus basic attacks)

#### 7. Xayah (net +1.23)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Nautilus's Depth Charge. Untargetable for 1.5 s, long enough to use ahead of Depth Charge. (Xayah R Featherstorm → Nautilus R Depth Charge)
- **0.37** untargetable: Featherstorm makes Xayah untargetable, dodging Nautilus's Dredge Line. Untargetable for 1.5 s, long enough to use ahead of Dredge Line. (Xayah R Featherstorm → Nautilus Q Dredge Line)
- **0.34** range: Xayah's basic attacks reach 350 units farther than Nautilus's (525 vs 175 attack range). Nautilus closes the gap with Dredge Line. (Xayah basic attacks → Nautilus basic attacks)

#### 8. Vladimir (net +1.21)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nautilus's Depth Charge. Untargetable for 2 s, long enough to use ahead of Depth Charge. (Vladimir W Sanguine Pool → Nautilus R Depth Charge)
- **0.62** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nautilus's Dredge Line. Untargetable for 2 s, long enough to use ahead of Dredge Line. (Vladimir W Sanguine Pool → Nautilus Q Dredge Line)
- **0.15** range: Vladimir's basic attacks reach 275 units farther than Nautilus's (450 vs 175 attack range). Nautilus closes the gap with Dredge Line. (Vladimir basic attacks → Nautilus basic attacks)
- Watch out: Depth Charge's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 9. Fizz (net +1.20)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Nautilus's Depth Charge. Untargetable for 0.75 s; Depth Charge takes 3.46 s to land, enough to react. (Fizz E Playful → Nautilus R Depth Charge)
- **0.80** untargetable: Playful makes Fizz untargetable, dodging Nautilus's Dredge Line. Untargetable for 0.75 s; Dredge Line takes 0.81 s to land, enough to react. (Fizz E Playful → Nautilus Q Dredge Line)

#### 10. Maokai (net +1.20)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Nautilus's Depth Charge. Untargetable for 1.4 s; Depth Charge takes 3.46 s to land, enough to react. (Maokai W Twisted Advance → Nautilus R Depth Charge)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Nautilus's Dredge Line. Untargetable for 1.4 s; Dredge Line takes 0.81 s to land, enough to react. (Maokai W Twisted Advance → Nautilus Q Dredge Line)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Morgana | +1.39 | 1.39 | 0.00 |  |
| 2 | Sivir | +1.36 | 1.36 | 0.00 |  |
| 3 | Udyr | +1.35 | 1.35 | 0.00 |  |
| 4 | Bard | +1.30 | 1.30 | 0.00 |  |
| 5 | Fiora | +1.28 | 1.28 | 0.00 |  |
| 6 | Lissandra | +1.25 | 1.25 | 0.00 |  |
| 7 | Xayah | +1.23 | 1.23 | 0.00 |  |
| 8 | Vladimir | +1.21 | 1.26 | 0.05 |  |
| 9 | Fizz | +1.20 | 1.20 | 0.00 |  |
| 10 | Maokai | +1.20 | 1.20 | 0.00 |  |
| 11 | Aurora | +1.19 | 1.19 | 0.00 |  |
| 12 | Gwen | +1.10 | 1.10 | 0.00 |  |
| 13 | Nocturne | +1.10 | 1.10 | 0.00 |  |
| 14 | Yuumi | +1.09 | 1.47 | 0.38 |  |
| 15 | Milio | +1.08 | 1.08 | 0.00 |  |
| 16 | Rengar | +1.08 | 1.08 | 0.00 |  |
| 17 | Master Yi | +1.06 | 1.17 | 0.11 |  |
| 18 | Olaf | +1.06 | 1.06 | 0.00 |  |
| 19 | Zaahen | +1.06 | 1.06 | 0.00 |  |
| 20 | Rek'Sai | +1.02 | 1.02 | 0.00 |  |
| 21 | Sion | +1.00 | 1.08 | 0.08 |  |
| 22 | Gangplank | +1.00 | 1.00 | 0.00 |  |
| 23 | Kled | +1.00 | 1.00 | 0.00 |  |
| 24 | Evelynn | +0.99 | 0.99 | 0.00 |  |
| 25 | Kalista | +0.99 | 0.99 | 0.00 |  |
| 26 | Shaco | +0.99 | 0.99 | 0.00 |  |
| 27 | Camille | +0.97 | 0.97 | 0.00 |  |
| 28 | Zed | +0.89 | 0.89 | 0.00 |  |
| 29 | Kayle | +0.86 | 0.86 | 0.00 |  |
| 30 | Alistar | +0.85 | 0.85 | 0.00 |  |
| 31 | Braum | +0.80 | 0.80 | 0.00 | projectile block (Unbreakable) |
| 32 | Samira | +0.80 | 0.80 | 0.00 | projectile block (Blade Whirl) |
| 33 | Mel | +0.75 | 0.75 | 0.00 | projectile block (Rebuttal) |
| 34 | Teemo | +0.72 | 0.72 | 0.00 | blind (Blinding Dart) |
| 35 | Vex | +0.68 | 0.68 | 0.00 |  |
| 36 | Warwick | +0.66 | 1.21 | 0.55 |  |
| 37 | Malzahar | +0.65 | 1.05 | 0.40 |  |
| 38 | Jinx | +0.65 | 0.65 | 0.00 | dash stop (Flame Chompers!) |
| 39 | Lulu | +0.64 | 0.64 | 0.00 |  |
| 40 | Viktor | +0.62 | 0.62 | 0.00 |  |
| 41 | Hwei | +0.61 | 0.61 | 0.00 | dash stop (Grim Visage) |
| 42 | Yasuo | +0.60 | 0.60 | 0.00 | projectile block (Wind Wall) |
| 43 | Cassiopeia | +0.59 | 0.59 | 0.00 |  |
| 44 | Ahri | +0.57 | 0.57 | 0.00 |  |
| 45 | Veigar | +0.55 | 0.55 | 0.00 |  |
| 46 | Kayn | +0.54 | 0.99 | 0.45 |  |
| 47 | Xin Zhao | +0.44 | 0.44 | 0.00 |  |
| 48 | Garen | +0.42 | 0.42 | 0.00 |  |
| 49 | Aphelios | +0.41 | 0.41 | 0.00 |  |
| 50 | Kindred | +0.41 | 0.41 | 0.00 |  |
| 51 | Zeri | +0.41 | 0.41 | 0.00 |  |
| 52 | Twitch | +0.40 | 0.40 | 0.00 |  |
| 53 | Vayne | +0.40 | 0.40 | 0.00 |  |
| 54 | Singed | +0.39 | 0.39 | 0.00 |  |
| 55 | Sona | +0.39 | 0.39 | 0.00 |  |
| 56 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 57 | Renata Glasc | +0.36 | 0.36 | 0.00 |  |
| 58 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 59 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 60 | Jax | +0.35 | 0.35 | 0.00 |  |
| 61 | Draven | +0.34 | 0.34 | 0.00 |  |
| 62 | Kai'Sa | +0.34 | 0.34 | 0.00 |  |
| 63 | Malphite | +0.33 | 0.33 | 0.00 |  |
| 64 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 65 | Senna | +0.32 | 0.32 | 0.00 |  |
| 66 | Yone | +0.31 | 0.31 | 0.00 |  |
| 67 | Poppy | +0.30 | 0.50 | 0.20 | dash stop (Steadfast Presence) |
| 68 | Corki | +0.30 | 0.30 | 0.00 |  |
| 69 | Elise | +0.30 | 0.30 | 0.00 |  |
| 70 | Ezreal | +0.30 | 0.30 | 0.00 |  |
| 71 | Nilah | +0.30 | 0.30 | 0.00 |  |
| 72 | Smolder | +0.30 | 0.30 | 0.00 |  |
| 73 | Zilean | +0.30 | 0.30 | 0.00 |  |
| 74 | Zoe | +0.30 | 0.30 | 0.00 |  |
| 75 | Gnar | +0.29 | 0.29 | 0.00 |  |
| 76 | Kennen | +0.27 | 0.27 | 0.00 |  |
| 77 | Lux | +0.27 | 0.27 | 0.00 |  |
| 78 | Jayce | +0.26 | 0.26 | 0.00 |  |
| 79 | Nidalee | +0.26 | 0.26 | 0.00 |  |
| 80 | Seraphine | +0.25 | 0.25 | 0.00 |  |
| 81 | Soraka | +0.25 | 0.25 | 0.00 |  |
| 82 | Ziggs | +0.25 | 0.25 | 0.00 |  |
| 83 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 84 | Heimerdinger | +0.24 | 0.24 | 0.00 |  |
| 85 | Kog'Maw | +0.24 | 0.24 | 0.00 |  |
| 86 | K'Sante | +0.24 | 0.24 | 0.00 |  |
| 87 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 88 | Azir | +0.23 | 0.23 | 0.00 |  |
| 89 | Orianna | +0.23 | 0.23 | 0.00 |  |
| 90 | Annie | +0.22 | 0.22 | 0.00 |  |
| 91 | Varus | +0.21 | 0.27 | 0.06 |  |
| 92 | Brand | +0.21 | 0.21 | 0.00 |  |
| 93 | Nami | +0.21 | 0.21 | 0.00 |  |
| 94 | Neeko | +0.21 | 0.21 | 0.00 |  |
| 95 | Syndra | +0.21 | 0.21 | 0.00 |  |
| 96 | Quinn | +0.20 | 0.34 | 0.14 |  |
| 97 | Graves | +0.20 | 0.20 | 0.00 |  |
| 98 | Karma | +0.19 | 0.19 | 0.00 |  |
| 99 | LeBlanc | +0.19 | 0.19 | 0.00 |  |
| 100 | Amumu | +0.18 | 0.18 | 0.00 |  |
| 101 | Swain | +0.18 | 0.18 | 0.00 |  |
| 102 | Zac | +0.17 | 0.40 | 0.23 | dash stop (Stretching Strikes) |
| 103 | Rammus | +0.16 | 0.32 | 0.16 |  |
| 104 | Thresh | +0.16 | 0.16 | 0.00 |  |
| 105 | Aurelion Sol | +0.15 | 0.21 | 0.06 |  |
| 106 | Hecarim | +0.12 | 0.12 | 0.00 |  |
| 107 | Illaoi | +0.12 | 0.12 | 0.00 |  |
| 108 | Jarvan IV | +0.12 | 0.12 | 0.00 |  |
| 109 | Ornn | +0.12 | 0.12 | 0.00 |  |
| 110 | Sett | +0.12 | 0.12 | 0.00 |  |
| 111 | Shyvana | +0.12 | 0.12 | 0.00 |  |
| 112 | Urgot | +0.12 | 0.12 | 0.00 |  |
| 113 | Volibear | +0.12 | 0.12 | 0.00 |  |
| 114 | Ivern | +0.09 | 0.16 | 0.07 |  |
| 115 | Rakan | +0.09 | 0.09 | 0.00 |  |
| 116 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 117 | Lillia | +0.08 | 0.08 | 0.00 |  |
| 118 | Mordekaiser | +0.08 | 0.08 | 0.00 |  |
| 119 | Pantheon | +0.07 | 0.55 | 0.48 |  |
| 120 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 121 | Akshan | +0.04 | 0.29 | 0.25 |  |
| 122 | Twisted Fate | +0.03 | 0.38 | 0.35 |  |
| 123 | Lucian | +0.03 | 0.31 | 0.28 |  |
| 124 | Miss Fortune | +0.02 | 0.30 | 0.28 |  |
| 125 | Viego | 0.00 | 0.12 | 0.12 |  |
| 126 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 127 | Akali | 0.00 | 0.00 | 0.00 |  |
| 128 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 129 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 130 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 131 | Briar | 0.00 | 0.00 | 0.00 |  |
| 132 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 133 | Darius | 0.00 | 0.00 | 0.00 |  |
| 134 | Diana | 0.00 | 0.00 | 0.00 |  |
| 135 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 136 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 137 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 138 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 139 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 140 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 141 | Leona | 0.00 | 0.00 | 0.00 |  |
| 142 | Locke | 0.00 | 0.00 | 0.00 |  |
| 143 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 144 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 145 | Rell | 0.00 | 0.00 | 0.00 |  |
| 146 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 147 | Riven | 0.00 | 0.00 | 0.00 |  |
| 148 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 149 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 150 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 151 | Talon | 0.00 | 0.00 | 0.00 |  |
| 152 | Taric | 0.00 | 0.00 | 0.00 |  |
| 153 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 154 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 155 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 156 | Jhin | -0.03 | 0.25 | 0.28 |  |
| 157 | Vel'Koz | -0.05 | 0.23 | 0.28 |  |
| 158 | Janna | -0.06 | 0.34 | 0.40 |  |
| 159 | Xerath | -0.08 | 0.23 | 0.31 |  |
| 160 | Pyke | -0.08 | 0.00 | 0.08 |  |
| 161 | Vi | -0.10 | 0.12 | 0.22 |  |
| 162 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 163 | Shen | -0.12 | 0.33 | 0.45 |  |
| 164 | Karthus | -0.12 | 0.16 | 0.28 |  |
| 165 | Ryze | -0.13 | 0.22 | 0.35 |  |
| 166 | Katarina | -0.20 | 0.00 | 0.20 |  |
| 167 | Fiddlesticks | -0.23 | 0.17 | 0.40 |  |
| 168 | Taliyah | -0.25 | 0.23 | 0.48 |  |
| 169 | Nunu & Willump | -0.25 | 0.12 | 0.37 |  |
| 170 | Tahm Kench | -0.26 | 0.00 | 0.26 |  |
| 171 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 172 | Galio | -0.55 | 0.00 | 0.55 |  |
