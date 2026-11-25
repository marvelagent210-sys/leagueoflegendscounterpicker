# Counters to Nautilus (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Nautilus: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Nautilus wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Nautilus --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Rengar | +0.86 | +1.00 | +1.00 | +1.00 | +0.33 | +1.00 | +0.12 |
| 2 | Yorick | +0.85 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.83 |
| 3 | Morgana | +0.83 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.54 |
| 4 | Olaf | +0.83 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.64 |
| 5 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +1.00 |
| 6 | Graves | +0.83 | +1.00 | +1.00 | +1.00 | +0.32 | +1.00 | −0.38 |
| 7 | Nasus | +0.83 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.64 |
| 8 | Heimerdinger | +0.83 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.42 |
| 9 | Gangplank | +0.83 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.43 |
| 10 | Xayah | +0.82 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.22 |
| 11 | Jarvan IV | +0.82 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.46 |
| 12 | Gwen | +0.82 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.23 |
| 13 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.67 |
| 14 | Kled | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.10 |
| 15 | Zeri | +0.81 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.35 |
| 16 | Urgot | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.07 |
| 17 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.17 |
| 18 | Nilah | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | −0.33 |
| 19 | Milio | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 20 | Taric | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.05 |
| 21 | Udyr | +0.81 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.20 |
| 22 | Camille | +0.81 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.58 |
| 23 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.13 |
| 24 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.39 |
| 25 | Kog'Maw | +0.81 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.16 |
| 26 | Diana | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.02 |
| 27 | Hwei | +0.81 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.30 |
| 28 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.20 |
| 29 | Sion | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.22 |
| 30 | Sivir | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.06 |
| 31 | Rakan | +0.80 | +1.00 | +0.98 | +1.00 | −0.07 | +1.00 | +0.32 |
| 32 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.05 |
| 33 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.11 |
| 34 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.28 |
| 35 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 36 | Nocturne | +0.80 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.18 |
| 37 | Lucian | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.01 |
| 38 | Cho'Gath | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.04 |
| 39 | Swain | +0.80 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.21 |
| 40 | Aurora | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.03 |
| 41 | Bel'Veth | +0.80 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.24 |
| 42 | Volibear | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.06 |
| 43 | Smolder | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.06 |
| 44 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | −0.14 |
| 45 | Samira | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.19 |
| 46 | Lulu | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.12 |
| 47 | Viktor | +0.80 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.08 |
| 48 | Twisted Fate | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.16 |
| 49 | Azir | +0.80 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.17 |
| 50 | Neeko | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.01 |
| 51 | Warwick | +0.79 | +1.00 | +1.00 | +1.00 | +0.14 | – | −0.12 |
| 52 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | −0.06 |
| 53 | Sejuani | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.14 |
| 54 | Yone | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.12 |
| 55 | Kennen | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.16 |
| 56 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.02 |
| 57 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.01 |
| 58 | Rumble | +0.79 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.22 |
| 59 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.02 |
| 60 | Quinn | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | −0.28 |
| 61 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.14 |
| 62 | Ambessa | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.04 |
| 63 | Sett | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | −0.01 |
| 64 | Aatrox | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | −0.52 |
| 65 | Shaco | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | −0.10 |
| 66 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.15 |
| 67 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 68 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.02 |
| 69 | Wukong | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | −0.08 |
| 70 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 71 | Rell | +0.79 | +1.00 | +1.00 | +1.00 | +0.11 | – | −0.15 |
| 72 | Kalista | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | −0.22 |
| 73 | Varus | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | −0.04 |
| 74 | Akshan | +0.78 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | −0.10 |
| 75 | Alistar | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.06 |
| 76 | Pantheon | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.14 |
| 77 | Gnar | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.34 |
| 78 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.36 |
| 79 | Amumu | +0.78 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.23 |
| 80 | Ezreal | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.33 |
| 81 | Vi | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | −0.07 |
| 82 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | −0.14 |
| 83 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | −0.20 |
| 84 | Mordekaiser | +0.78 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.19 |
| 85 | Lee Sin | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | −0.09 |
| 86 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | −0.10 |
| 87 | Viego | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.36 |
| 88 | Kai'Sa | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | −0.14 |
| 89 | Yunara | +0.78 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | −0.27 |
| 90 | Ashe | +0.78 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | −0.26 |
| 91 | Kindred | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | −0.27 |
| 92 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | −0.26 |
| 93 | Naafiri | +0.77 | +1.00 | +0.97 | +1.00 | −0.08 | +1.00 | −0.19 |
| 94 | Irelia | +0.77 | +1.00 | +1.00 | +1.00 | −0.00 | – | −0.10 |
| 95 | Kassadin | +0.77 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.20 |
| 96 | Maokai | +0.77 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.24 |
| 97 | Zac | +0.77 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | −0.03 |
| 98 | Gragas | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.06 |
| 99 | Skarner | +0.76 | +1.00 | +1.00 | +1.00 | −0.06 | – | −0.07 |
| 100 | Kayn | +0.76 | +1.00 | +1.00 | +0.93 | −0.05 | +0.93 | −0.16 |
| 101 | Braum | +0.76 | +1.00 | +1.00 | +1.00 | −0.06 | – | −0.09 |
| 102 | Rammus | +0.76 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.06 |
| 103 | Fizz | +0.75 | +1.00 | +1.00 | +1.00 | −0.12 | – | −0.09 |
| 104 | Jhin | +0.73 | +0.67 | +1.00 | +1.00 | +0.05 | +1.00 | +0.12 |
| 105 | Leona | +0.71 | +0.98 | +0.82 | +1.00 | −0.07 | – | −0.07 |
| 106 | Lillia | +0.70 | +0.71 | +0.83 | +1.00 | −0.01 | +1.00 | +0.37 |
| 107 | Jinx | +0.70 | +0.92 | +0.85 | +0.98 | −0.06 | +0.79 | −0.17 |
| 108 | Zed | +0.70 | +1.00 | +1.00 | +1.00 | −0.12 | +0.00 | +0.27 |
| 109 | Elise | +0.67 | +1.00 | +1.00 | +1.00 | +0.01 | −0.44 | +0.33 |
| 110 | Rek'Sai | +0.66 | +1.00 | +1.00 | +1.00 | −0.00 | −0.32 | −0.10 |
| 111 | Zilean | +0.65 | +0.41 | +1.00 | +1.00 | +0.01 | +1.00 | −0.10 |
| 112 | Karma | +0.63 | +1.00 | +0.36 | +1.00 | −0.09 | +0.99 | +0.04 |
| 113 | Sylas | +0.62 | +1.00 | +1.00 | +1.00 | +0.08 | −1.00 | +0.12 |
| 114 | Master Yi | +0.60 | +1.00 | +1.00 | +0.00 | −0.06 | +1.00 | +0.14 |
| 115 | Tahm Kench | +0.60 | +0.64 | +0.65 | +1.00 | +0.05 | – | +0.15 |
| 116 | Galio | +0.59 | +1.00 | +1.00 | +1.00 | −0.09 | −1.00 | +0.05 |
| 117 | Shen | +0.53 | +1.00 | −0.09 | +1.00 | +0.00 | +1.00 | +0.06 |
| 118 | Bard | +0.34 | +0.96 | −0.03 | +1.00 | −0.03 | −1.00 | +0.13 |
| 119 | Mel | +0.33 | −0.89 | +1.00 | +1.00 | +0.00 | +1.00 | −0.03 |
| 120 | Annie | +0.30 | +0.30 | +0.27 | +0.23 | +0.02 | +1.00 | +0.09 |
| 121 | Ekko | +0.28 | +1.00 | −1.00 | +1.00 | −0.10 | +1.00 | −0.09 |
| 122 | Miss Fortune | +0.25 | +1.00 | +1.00 | −1.00 | −0.05 | −0.34 | −0.16 |
| 123 | Singed | +0.25 | +0.26 | +0.17 | +0.24 | −0.06 | +1.00 | +0.02 |
| 124 | Caitlyn | +0.19 | +0.23 | +0.24 | −0.05 | −0.06 | +1.00 | −0.20 |
| 125 | Briar | +0.14 | −0.23 | −0.26 | +1.00 | −0.24 | +1.00 | +0.10 |
| 126 | Ziggs | +0.12 | +1.00 | −1.00 | +1.00 | +0.08 | −1.00 | +0.14 |
| 127 | Lux | +0.10 | +0.32 | +0.99 | −0.82 | −0.03 | −0.70 | +0.11 |
| 128 | Ornn | +0.08 | +0.10 | +0.03 | +0.10 | +0.03 | – | +0.30 |
| 129 | Syndra | +0.03 | +0.05 | +0.05 | −0.01 | −0.00 | +0.12 | −0.08 |
| 130 | Zoe | −0.04 | −0.04 | −0.05 | −0.01 | −0.04 | −0.04 | −0.06 |
| 131 | Veigar | −0.04 | −0.05 | −0.06 | −0.05 | −0.02 | −0.06 | +0.12 |
| 132 | Soraka | −0.05 | −0.06 | −0.05 | +0.00 | −0.03 | −0.13 | −0.20 |
| 133 | Vel'Koz | −0.08 | +0.02 | −0.11 | −0.07 | +0.10 | −0.52 | −0.08 |
| 134 | Janna | −0.11 | +0.81 | −0.16 | −0.94 | −0.05 | −0.72 | −0.18 |
| 135 | Anivia | −0.13 | −0.17 | −0.13 | −0.15 | −0.08 | −0.17 | +0.08 |
| 136 | Tristana | −0.20 | −1.00 | −1.00 | +1.00 | +0.05 | +1.00 | −0.10 |
| 137 | Zyra | −0.20 | −0.49 | −0.17 | −0.09 | −0.05 | −0.16 | +0.10 |
| 138 | Karthus | −0.22 | −0.26 | −0.30 | −0.28 | −0.04 | −0.18 | +0.01 |
| 139 | Brand | −0.30 | −0.88 | −0.81 | +1.00 | −0.08 | −0.69 | +0.06 |
| 140 | Akali | −0.31 | −1.00 | −0.34 | +0.65 | −0.02 | −1.00 | −0.01 |
| 141 | Aurelion Sol | −0.36 | −0.28 | −0.28 | −1.00 | +0.00 | −0.26 | +0.09 |
| 142 | Talon | −0.37 | −1.00 | +0.57 | −1.00 | −0.12 | – | −0.16 |
| 143 | Nami | −0.40 | −0.17 | −0.41 | −0.82 | −0.07 | −0.72 | −0.15 |
| 144 | Nidalee | −0.42 | −1.00 | −1.00 | +1.00 | −0.08 | −1.00 | −0.19 |
| 145 | Malzahar | −0.49 | −0.12 | −0.64 | −1.00 | −0.06 | −0.94 | +0.06 |
| 146 | Draven | −0.51 | −0.78 | −0.76 | −1.00 | −0.08 | +0.94 | −0.10 |
| 147 | Seraphine | −0.56 | −0.50 | −0.50 | −1.00 | −0.07 | −0.98 | −0.07 |
| 148 | Senna | −0.57 | −0.60 | −0.69 | −0.77 | −0.03 | −0.78 | −0.20 |
| 149 | Locke | −0.63 | −1.00 | −1.00 | −1.00 | −0.13 | +1.00 | −0.22 |
| 150 | Vex | −0.64 | −0.37 | −0.97 | −1.00 | −0.07 | −1.00 | +0.13 |
| 151 | Ahri | −0.76 | −1.00 | −0.96 | −0.94 | +0.03 | −0.98 | +0.22 |
| 152 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.08 |
| 153 | Blitzcrank | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.08 |
| 154 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | −0.94 | +0.18 |
| 155 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | −0.95 | +0.18 |
| 156 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | −0.02 | −0.84 | −0.03 |
| 157 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.06 |
| 158 | Cassiopeia | −0.79 | −1.00 | −0.98 | −1.00 | −0.03 | −1.00 | +0.19 |
| 159 | Ryze | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −0.80 | −0.26 |
| 160 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.17 |
| 161 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.12 |
| 162 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.09 |
| 163 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.15 |
| 164 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.16 | – | −0.14 |
| 165 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | −0.03 |
| 166 | Sona | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.09 |
| 167 | Fiddlesticks | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.32 |
| 168 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.29 |
| 169 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.23 | – | −0.38 |
| 170 | Yuumi | −0.84 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.50 |
| 171 | Renata Glasc | −0.84 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.52 |
| 172 | Vladimir | −0.85 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | −0.14 |

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
