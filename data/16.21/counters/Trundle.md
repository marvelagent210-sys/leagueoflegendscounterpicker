# Counters to Trundle (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Trundle: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Trundle wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Trundle --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.84 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | +0.00 |
| 2 | Tahm Kench | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | +0.89 | +0.00 |
| 3 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 4 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 5 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 6 | Dr. Mundo | +0.77 | +0.99 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 7 | Lulu | +0.58 | +1.00 | +1.00 | +1.00 | +0.17 | −1.00 | −1.00 |
| 8 | Yorick | +0.38 | +0.90 | +1.00 | −1.00 | +0.10 | – | +1.00 |
| 9 | Karma | +0.29 | +0.71 | +0.86 | −1.00 | +0.08 | +0.84 | +0.00 |
| 10 | Ivern | +0.27 | +1.00 | +1.00 | −1.00 | +0.18 | −0.11 | −1.00 |
| 11 | Anivia | +0.08 | +0.22 | +0.08 | +0.07 | −0.03 | −0.09 | +0.00 |
| 12 | Morgana | −0.02 | +0.05 | +0.57 | −1.00 | +0.27 | −0.19 | +0.00 |
| 13 | Rakan | −0.09 | −1.00 | +1.00 | −1.00 | +0.06 | +1.00 | +0.00 |
| 14 | Sion | −0.18 | −0.66 | −0.04 | +0.00 | +0.08 | – | +0.00 |
| 15 | Cassiopeia | −0.25 | −1.00 | +0.54 | −1.00 | +0.27 | +0.54 | −0.56 |
| 16 | Quinn | −0.43 | −1.00 | −1.00 | +1.00 | +0.12 | −1.00 | −1.00 |
| 17 | Kled | −0.47 | +0.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 18 | Zaahen | −0.48 | −0.43 | −1.00 | −0.23 | +0.14 | – | −1.00 |
| 19 | Ashe | −0.52 | +0.17 | −1.00 | −1.00 | +0.25 | −1.00 | −1.00 |
| 20 | Azir | −0.58 | −1.00 | −1.00 | −1.00 | +0.11 | +1.00 | +0.00 |
| 21 | Kennen | −0.64 | −1.00 | −1.00 | −1.00 | +0.17 | +0.32 | +0.00 |
| 22 | Zac | −0.67 | −1.00 | −0.76 | −0.78 | −0.02 | – | +0.00 |
| 23 | Master Yi | −0.71 | −1.00 | −1.00 | −1.00 | +0.06 | – | +1.00 |
| 24 | Poppy | −0.73 | −1.00 | −1.00 | −1.00 | +0.29 | – | +0.00 |
| 25 | Kog'Maw | −0.74 | −1.00 | −1.00 | −1.00 | +0.37 | −1.00 | +0.00 |
| 26 | Ambessa | −0.74 | −1.00 | −1.00 | −1.00 | +0.37 | −1.00 | +0.00 |
| 27 | Jarvan IV | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 28 | Yasuo | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 29 | K'Sante | −0.75 | −1.00 | −1.00 | −1.00 | +0.31 | −1.00 | +0.00 |
| 30 | Neeko | −0.76 | −1.00 | −1.00 | −1.00 | +0.30 | −1.00 | −0.02 |
| 31 | Shen | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 32 | Gwen | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 33 | Rengar | −0.76 | −1.00 | −1.00 | −1.00 | +0.42 | – | −1.00 |
| 34 | Twisted Fate | −0.77 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | +0.00 |
| 35 | Sejuani | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 36 | Zilean | −0.77 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | +0.00 |
| 37 | Karthus | −0.77 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | +0.00 |
| 38 | Udyr | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 39 | Teemo | −0.77 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | +0.00 |
| 40 | Illaoi | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 41 | Shaco | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 42 | Fiora | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 43 | Renekton | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 44 | Kayle | −0.77 | −1.00 | −1.00 | −1.00 | +0.53 | −1.00 | −1.00 |
| 45 | Senna | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 46 | Ornn | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | +0.00 |
| 47 | Malphite | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 48 | Elise | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.04 |
| 49 | Aurelion Sol | −0.78 | −1.00 | −1.00 | −1.00 | +0.48 | −1.00 | −1.00 |
| 50 | Zoe | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 51 | Aurora | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 52 | Jax | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 53 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 54 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 55 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 56 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 57 | Nocturne | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 58 | Singed | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 59 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 60 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 61 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 62 | Lillia | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 63 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 64 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.06 |
| 65 | Mordekaiser | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 66 | Riven | −0.79 | −1.00 | −1.00 | −1.00 | +0.28 | – | −1.00 |
| 67 | Gragas | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 68 | Heimerdinger | −0.79 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.12 |
| 69 | Vi | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 70 | Ekko | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 71 | Hwei | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.05 |
| 72 | Varus | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 73 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 74 | Milio | −0.79 | −1.00 | −1.00 | −1.00 | +0.38 | −1.00 | −1.00 |
| 75 | Cho'Gath | −0.79 | −1.00 | −1.00 | −1.00 | +0.24 | – | −1.00 |
| 76 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 77 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.05 |
| 78 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.01 |
| 79 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 80 | Annie | −0.80 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.50 |
| 81 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 82 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 83 | Lux | −0.80 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.56 |
| 84 | Nilah | −0.80 | −1.00 | −1.00 | −1.00 | +0.20 | – | −1.00 |
| 85 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −0.50 |
| 86 | Vel'Koz | −0.80 | −1.00 | −1.00 | −1.00 | +0.32 | −1.00 | −1.00 |
| 87 | Ezreal | −0.80 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.50 |
| 88 | Braum | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.08 |
| 89 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | +0.18 | – | −1.00 |
| 90 | Aatrox | −0.81 | −1.00 | −1.00 | −1.00 | +0.17 | – | −1.00 |
| 91 | Sylas | −0.81 | −1.00 | −1.00 | −1.00 | +0.16 | – | −1.00 |
| 92 | Rammus | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 93 | Shyvana | −0.81 | −1.00 | −1.00 | −1.00 | +0.16 | – | −1.00 |
| 94 | Viego | −0.81 | −1.00 | −1.00 | −1.00 | +0.15 | – | −1.00 |
| 95 | Kayn | −0.81 | −1.00 | −1.00 | −1.00 | +0.13 | – | −1.00 |
| 96 | Pantheon | −0.81 | −1.00 | −1.00 | −1.00 | +0.13 | – | −1.00 |
| 97 | Naafiri | −0.81 | −1.00 | −1.00 | −1.00 | +0.13 | – | −1.00 |
| 98 | Nunu & Willump | −0.81 | −1.00 | −1.00 | −1.00 | +0.13 | – | −1.00 |
| 99 | Kalista | −0.81 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −1.00 |
| 100 | Tristana | −0.81 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −1.00 |
| 101 | Diana | −0.81 | −1.00 | −1.00 | −1.00 | +0.13 | – | −1.00 |
| 102 | Maokai | −0.81 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −1.00 |
| 103 | Corki | −0.81 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −1.00 |
| 104 | Urgot | −0.81 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −1.00 |
| 105 | Smolder | −0.81 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −1.00 |
| 106 | Ziggs | −0.81 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | −1.00 |
| 107 | Yunara | −0.82 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | −1.00 |
| 108 | Bard | −0.82 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | −1.00 |
| 109 | Aphelios | −0.82 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | −1.00 |
| 110 | Akali | −0.82 | −1.00 | −1.00 | −1.00 | +0.10 | – | −1.00 |
| 111 | Renata Glasc | −0.82 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −1.00 |
| 112 | Xayah | −0.82 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −1.00 |
| 113 | Camille | −0.82 | −1.00 | −1.00 | −1.00 | +0.10 | – | −1.00 |
| 114 | Irelia | −0.82 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −1.00 |
| 115 | Miss Fortune | −0.82 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | −1.00 |
| 116 | Orianna | −0.82 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | −1.00 |
| 117 | Sett | −0.82 | −1.00 | −1.00 | −1.00 | +0.09 | – | −1.00 |
| 118 | Darius | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | – | −1.00 |
| 119 | Gangplank | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | – | −1.00 |
| 120 | Yone | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | – | −1.00 |
| 121 | Lee Sin | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | – | −1.00 |
| 122 | Ryze | −0.82 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −1.00 |
| 123 | Draven | −0.82 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −1.00 |
| 124 | Jinx | −0.82 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −1.00 |
| 125 | Lucian | −0.82 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −1.00 |
| 126 | Seraphine | −0.82 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −1.00 |
| 127 | Syndra | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −1.00 |
| 128 | Akshan | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −1.00 |
| 129 | Janna | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −1.00 |
| 130 | Rumble | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | – | −1.00 |
| 131 | Olaf | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | – | −1.00 |
| 132 | Xin Zhao | −0.83 | −1.00 | −1.00 | −1.00 | +0.05 | – | −1.00 |
| 133 | Graves | −0.83 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −1.00 |
| 134 | Brand | −0.83 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −1.00 |
| 135 | Swain | −0.83 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −1.00 |
| 136 | Jayce | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −1.00 |
| 137 | Warwick | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −1.00 |
| 138 | Gnar | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −1.00 |
| 139 | Twitch | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −1.00 |
| 140 | Qiyana | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −1.00 |
| 141 | Locke | −0.83 | −1.00 | −1.00 | −1.00 | +0.02 | – | −1.00 |
| 142 | Sona | −0.83 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −1.00 |
| 143 | Mel | −0.83 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −1.00 |
| 144 | Zed | −0.83 | −1.00 | −1.00 | −1.00 | +0.01 | – | −1.00 |
| 145 | Zeri | −0.83 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −1.00 |
| 146 | Bel'Veth | −0.83 | −1.00 | −1.00 | −1.00 | +0.01 | – | −1.00 |
| 147 | Kai'Sa | −0.83 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −1.00 |
| 148 | Xerath | −0.83 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −1.00 |
| 149 | Sivir | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −1.00 |
| 150 | Nami | −0.84 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −1.00 |
| 151 | Kindred | −0.84 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −1.00 |
| 152 | Rek'Sai | −0.84 | −1.00 | −1.00 | −1.00 | −0.02 | – | −1.00 |
| 153 | Caitlyn | −0.84 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −1.00 |
| 154 | Yuumi | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −1.00 |
| 155 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −1.00 |
| 156 | Briar | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | – | −1.00 |
| 157 | Garen | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | – | −1.00 |
| 158 | Fizz | −0.84 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −1.00 |
| 159 | Galio | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | – | −1.00 |
| 160 | Malzahar | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −1.00 |
| 161 | LeBlanc | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −1.00 |
| 162 | Rell | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −1.00 |
| 163 | Nidalee | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −1.00 |
| 164 | Jhin | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −1.00 |
| 165 | Wukong | −0.85 | −1.00 | −1.00 | −1.00 | −0.07 | – | −1.00 |
| 166 | Samira | −0.85 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −1.00 |
| 167 | Evelynn | −0.85 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −1.00 |
| 168 | Volibear | −0.85 | −1.00 | −1.00 | −1.00 | −0.10 | – | −1.00 |
| 169 | Talon | −0.85 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −1.00 |
| 170 | Pyke | −0.86 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −1.00 |
| 171 | Katarina | −0.86 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −1.00 |
| 172 | Alistar | −0.87 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Trundle's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Trundle's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Trundle` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.43)

- **0.81** range: Sivir's basic attacks reach 325 units farther than Trundle's (500 vs 175 attack range). Trundle has no dash or blink to close the gap. (Sivir basic attacks → Trundle basic attacks)
- **0.55** spell shield: Spell Shield's spell shield blocks Trundle's Subjugate. Spell shield for 1.5 s, long enough to use ahead of Subjugate. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Trundle R Subjugate)
- **0.14** spell shield: Spell Shield's spell shield blocks part of Trundle's Chomp. Spell shield for 1.5 s, long enough to use ahead of Chomp. A spell shield blocks only the first enemy ability that reaches it. Chomp will still incur the attack damage increase for Trundle even if the attack is dodged, blocked, missed while he is blinded, or it is blocked by spell shield. Spell shield will only block the attack damage reduction and slow. (Sivir E Spell Shield → Trundle Q Chomp)

#### 2. Bard (net +1.41)

- **0.62** range: Bard's basic attacks reach 325 units farther than Trundle's (500 vs 175 attack range). Trundle has no dash or blink to close the gap. (Bard basic attacks → Trundle basic attacks)
- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Trundle's Subjugate. Untargetable for 2.5 s, long enough to use ahead of Subjugate. (Bard R Tempered Fate → Trundle R Subjugate)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Trundle's Pillar of Ice. Untargetable for 2.5 s, long enough to use ahead of Pillar of Ice. (Bard R Tempered Fate → Trundle E Pillar of Ice)

#### 3. Xayah (net +1.38)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Trundle's (525 vs 175 attack range). Trundle has no dash or blink to close the gap. (Xayah basic attacks → Trundle basic attacks)
- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Trundle's Subjugate. Untargetable for 1.5 s, long enough to use ahead of Subjugate. (Xayah R Featherstorm → Trundle R Subjugate)
- **0.34** untargetable: Featherstorm makes Xayah untargetable, dodging Trundle's Pillar of Ice. Untargetable for 1.5 s, long enough to use ahead of Pillar of Ice. (Xayah R Featherstorm → Trundle E Pillar of Ice)

#### 4. Kayle (net +1.33)

- **0.72** range: Kayle's basic attacks reach 450 units farther than Trundle's (625 vs 175 attack range). Trundle has no dash or blink to close the gap. (Kayle basic attacks → Trundle basic attacks)
- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Trundle's Subjugate. Invulnerable for 2.5 s, long enough to use ahead of Subjugate. (Kayle R Divine Judgment → Trundle R Subjugate)
- **0.12** invulnerable: Divine Judgment makes Kayle invulnerable to Trundle's Chomp (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Chomp. (Kayle R Divine Judgment → Trundle Q Chomp)

#### 5. Vladimir (net +1.25)

- **0.67** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Trundle's Pillar of Ice. Untargetable for 2 s, long enough to use ahead of Pillar of Ice. (Vladimir W Sanguine Pool → Trundle E Pillar of Ice)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Trundle's Subjugate. Untargetable for 2 s, long enough to use ahead of Subjugate. (Vladimir W Sanguine Pool → Trundle R Subjugate)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Trundle's (450 vs 175 attack range). Trundle has no dash or blink to close the gap. (Vladimir basic attacks → Trundle basic attacks)
- Watch out: Pillar of Ice's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 6. Aurora (net +1.23)

- **0.54** range: Aurora's basic attacks reach 375 units farther than Trundle's (550 vs 175 attack range). Trundle has no dash or blink to close the gap. (Aurora basic attacks → Trundle basic attacks)
- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Trundle's Subjugate. Untargetable for 0.4 s; Subjugate takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Trundle R Subjugate)
- **0.34** untargetable: Between Worlds makes Aurora untargetable, dodging Trundle's Pillar of Ice. Untargetable for 0.4 s; Pillar of Ice takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Trundle E Pillar of Ice)

#### 7. Teemo (net +1.22)

- **0.59** range: Teemo's basic attacks reach 325 units farther than Trundle's (500 vs 175 attack range). Trundle has no dash or blink to close the gap. (Teemo basic attacks → Trundle basic attacks)
- **0.54** blind: Blinding Dart's blind makes Trundle's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Trundle basic attacks)
- **0.18** blind: Blinding Dart's blind makes Trundle's Chomp, an empowered attack, miss. Blind for 3 s. Chomp will still incur the attack damage increase for Trundle even if the attack is dodged, blocked, missed while he is blinded, or it is blocked by spell shield. Spell shield will only block the attack damage reduction and slow. (Teemo Q Blinding Dart → Trundle Q Chomp)

#### 8. Yuumi (net +1.21)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Trundle's Pillar of Ice. Untargetable for ?; Pillar of Ice takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Trundle E Pillar of Ice)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Trundle's Subjugate. Untargetable for ?; Subjugate takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Trundle R Subjugate)
- **0.54** range: Yuumi's basic attacks reach 250 units farther than Trundle's (425 vs 175 attack range). Trundle has no dash or blink to close the gap. (Yuumi basic attacks → Trundle basic attacks)
- Watch out: Pillar of Ice's airborne interrupts Yuumi's Final Chapter (normal channel).

#### 9. Lissandra (net +1.20)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Trundle's Subjugate. Untargetable for 2.5 s, long enough to use ahead of Subjugate. (Lissandra R Frozen Tomb → Trundle R Subjugate)
- **0.41** range: Lissandra's basic attacks reach 375 units farther than Trundle's (550 vs 175 attack range). Trundle has no dash or blink to close the gap. (Lissandra basic attacks → Trundle basic attacks)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Trundle's Pillar of Ice. Untargetable for 2.5 s, long enough to use ahead of Pillar of Ice. (Lissandra R Frozen Tomb → Trundle E Pillar of Ice)

#### 10. Fiora (net +1.10)

- **0.77** parry: Riposte parries Trundle's Pillar of Ice and stuns back. Parry for 0.75 s; Pillar of Ice takes 0.25 s to land, enough to react. Negating Pillar of Ice's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Trundle E Pillar of Ice)
- **0.55** parry: Riposte parries Trundle's Subjugate. Parry for 0.75 s; Subjugate takes 0.25 s to land, enough to react. (Fiora W Riposte → Trundle R Subjugate)
- **0.18** parry: Riposte parries Trundle's Chomp. Parry for 0.75 s; Chomp lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Trundle Q Chomp)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.43 | 1.43 | 0.00 | range (attacks) |
| 2 | Bard | +1.41 | 1.41 | 0.00 | range (attacks) |
| 3 | Xayah | +1.38 | 1.38 | 0.00 | range (attacks) |
| 4 | Kayle | +1.33 | 1.33 | 0.00 | range (attacks) |
| 5 | Vladimir | +1.25 | 1.32 | 0.07 |  |
| 6 | Aurora | +1.23 | 1.23 | 0.00 | range (attacks) |
| 7 | Teemo | +1.22 | 1.22 | 0.00 | range (attacks), blind (Blinding Dart) |
| 8 | Yuumi | +1.21 | 1.60 | 0.39 | range (attacks) |
| 9 | Lissandra | +1.20 | 1.20 | 0.00 |  |
| 10 | Fiora | +1.10 | 1.10 | 0.00 |  |
| 11 | Lulu | +1.07 | 1.07 | 0.00 | range (attacks) |
| 12 | Morgana | +1.04 | 1.04 | 0.00 |  |
| 13 | Fizz | +1.03 | 1.03 | 0.00 |  |
| 14 | Maokai | +1.02 | 1.02 | 0.00 |  |
| 15 | Gwen | +0.95 | 0.95 | 0.00 |  |
| 16 | Master Yi | +0.90 | 1.08 | 0.18 |  |
| 17 | Kalista | +0.87 | 0.87 | 0.00 | range (attacks) |
| 18 | Zeri | +0.83 | 0.83 | 0.00 | range (attacks) |
| 19 | Aphelios | +0.82 | 0.82 | 0.00 | range (attacks) |
| 20 | Kindred | +0.81 | 0.81 | 0.00 | range (attacks) |
| 21 | Twitch | +0.81 | 0.81 | 0.00 | range (attacks) |
| 22 | Vayne | +0.81 | 0.81 | 0.00 | range (attacks) |
| 23 | Rek'Sai | +0.80 | 0.80 | 0.00 |  |
| 24 | Milio | +0.78 | 0.78 | 0.00 | range (attacks) |
| 25 | Varus | +0.77 | 0.87 | 0.10 | range (attacks) |
| 26 | Evelynn | +0.77 | 0.77 | 0.00 |  |
| 27 | Shaco | +0.77 | 0.77 | 0.00 |  |
| 28 | Sona | +0.77 | 0.77 | 0.00 | range (attacks) |
| 29 | Udyr | +0.75 | 0.75 | 0.00 |  |
| 30 | Camille | +0.73 | 0.73 | 0.00 |  |
| 31 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 32 | Renata Glasc | +0.72 | 0.72 | 0.00 | range (attacks) |
| 33 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 34 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 35 | Nocturne | +0.70 | 0.70 | 0.00 |  |
| 36 | Zed | +0.69 | 0.69 | 0.00 |  |
| 37 | Draven | +0.68 | 0.68 | 0.00 | range (attacks) |
| 38 | Kai'Sa | +0.67 | 0.67 | 0.00 | range (attacks) |
| 39 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 40 | Corki | +0.61 | 0.61 | 0.00 | range (attacks) |
| 41 | Elise | +0.61 | 0.61 | 0.00 | range (attacks) |
| 42 | Ezreal | +0.61 | 0.61 | 0.00 | range (attacks) |
| 43 | Smolder | +0.61 | 0.61 | 0.00 | range (attacks) |
| 44 | Zilean | +0.61 | 0.61 | 0.00 | range (attacks) |
| 45 | Zoe | +0.61 | 0.61 | 0.00 | range (attacks) |
| 46 | Rengar | +0.60 | 0.60 | 0.00 |  |
| 47 | Gangplank | +0.59 | 0.59 | 0.00 |  |
| 48 | Gnar | +0.57 | 0.57 | 0.00 | range (attacks) |
| 49 | Vex | +0.57 | 0.57 | 0.00 | range (attacks) |
| 50 | Viktor | +0.57 | 0.57 | 0.00 | range (attacks) |
| 51 | Kennen | +0.54 | 0.54 | 0.00 | range (attacks) |
| 52 | Lux | +0.54 | 0.54 | 0.00 | range (attacks) |
| 53 | Xin Zhao | +0.54 | 0.54 | 0.00 |  |
| 54 | Jax | +0.53 | 0.53 | 0.00 | attack dodge (Counter Strike) |
| 55 | Jayce | +0.53 | 0.53 | 0.00 | range (attacks) |
| 56 | Nidalee | +0.53 | 0.53 | 0.00 | range (attacks) |
| 57 | Samira | +0.53 | 0.53 | 0.00 | range (attacks) |
| 58 | Jinx | +0.51 | 0.51 | 0.00 | range (attacks) |
| 59 | Kled | +0.51 | 0.51 | 0.00 |  |
| 60 | Seraphine | +0.51 | 0.51 | 0.00 | range (attacks) |
| 61 | Singed | +0.51 | 0.51 | 0.00 |  |
| 62 | Quinn | +0.50 | 0.67 | 0.17 | range (attacks) |
| 63 | Mel | +0.50 | 0.50 | 0.00 | range (attacks) |
| 64 | Soraka | +0.50 | 0.50 | 0.00 | range (attacks) |
| 65 | Ziggs | +0.50 | 0.50 | 0.00 | range (attacks) |
| 66 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 67 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 68 | Azir | +0.47 | 0.47 | 0.00 |  |
| 69 | Heimerdinger | +0.47 | 0.47 | 0.00 |  |
| 70 | Kog'Maw | +0.47 | 0.47 | 0.00 |  |
| 71 | Orianna | +0.47 | 0.47 | 0.00 |  |
| 72 | Nilah | +0.45 | 0.45 | 0.00 |  |
| 73 | Veigar | +0.45 | 0.45 | 0.00 |  |
| 74 | Caitlyn | +0.44 | 0.72 | 0.28 | range (attacks) |
| 75 | Annie | +0.44 | 0.44 | 0.00 |  |
| 76 | Hwei | +0.43 | 0.43 | 0.00 |  |
| 77 | Nasus | +0.42 | 0.42 | 0.00 | attack speed slow (Wither) |
| 78 | Ahri | +0.41 | 0.41 | 0.00 |  |
| 79 | Brand | +0.41 | 0.41 | 0.00 |  |
| 80 | Cassiopeia | +0.41 | 0.41 | 0.00 |  |
| 81 | Graves | +0.41 | 0.41 | 0.00 |  |
| 82 | Nami | +0.41 | 0.41 | 0.00 |  |
| 83 | Neeko | +0.41 | 0.41 | 0.00 |  |
| 84 | Syndra | +0.41 | 0.41 | 0.00 |  |
| 85 | Twisted Fate | +0.40 | 0.75 | 0.35 | range (attacks) |
| 86 | Olaf | +0.39 | 0.39 | 0.00 |  |
| 87 | Karma | +0.38 | 0.38 | 0.00 |  |
| 88 | LeBlanc | +0.38 | 0.38 | 0.00 |  |
| 89 | Zaahen | +0.38 | 0.38 | 0.00 |  |
| 90 | Swain | +0.36 | 0.36 | 0.00 |  |
| 91 | Malzahar | +0.35 | 0.75 | 0.40 |  |
| 92 | Lucian | +0.34 | 0.62 | 0.28 | range (attacks) |
| 93 | Aurelion Sol | +0.34 | 0.41 | 0.07 |  |
| 94 | Malphite | +0.34 | 0.34 | 0.00 |  |
| 95 | Miss Fortune | +0.33 | 0.61 | 0.28 | range (attacks) |
| 96 | Thresh | +0.33 | 0.33 | 0.00 |  |
| 97 | Kayn | +0.32 | 0.77 | 0.45 |  |
| 98 | Alistar | +0.32 | 0.32 | 0.00 |  |
| 99 | Akshan | +0.31 | 0.59 | 0.28 | range (attacks) |
| 100 | Sion | +0.31 | 0.42 | 0.11 |  |
| 101 | Janna | +0.28 | 0.68 | 0.40 | range (attacks) |
| 102 | Garen | +0.25 | 0.25 | 0.00 |  |
| 103 | Urgot | +0.23 | 0.23 | 0.00 |  |
| 104 | Jhin | +0.22 | 0.50 | 0.28 | range (attacks) |
| 105 | Ivern | +0.21 | 0.33 | 0.12 |  |
| 106 | Vel'Koz | +0.19 | 0.47 | 0.28 |  |
| 107 | Rammus | +0.19 | 0.41 | 0.22 | attack reflect (Defensive Ball Curl) |
| 108 | Rakan | +0.18 | 0.18 | 0.00 |  |
| 109 | Lillia | +0.16 | 0.16 | 0.00 |  |
| 110 | Xerath | +0.15 | 0.47 | 0.32 |  |
| 111 | K'Sante | +0.14 | 0.14 | 0.00 |  |
| 112 | Pantheon | +0.13 | 0.62 | 0.49 |  |
| 113 | Skarner | +0.13 | 0.13 | 0.00 |  |
| 114 | Ryze | +0.10 | 0.45 | 0.35 |  |
| 115 | Mordekaiser | +0.10 | 0.10 | 0.00 |  |
| 116 | Hecarim | +0.07 | 0.07 | 0.00 |  |
| 117 | Illaoi | +0.07 | 0.07 | 0.00 |  |
| 118 | Jarvan IV | +0.07 | 0.07 | 0.00 |  |
| 119 | Ornn | +0.07 | 0.07 | 0.00 |  |
| 120 | Sett | +0.07 | 0.07 | 0.00 |  |
| 121 | Shyvana | +0.07 | 0.07 | 0.00 |  |
| 122 | Volibear | +0.07 | 0.07 | 0.00 |  |
| 123 | Yone | +0.07 | 0.07 | 0.00 |  |
| 124 | Shen | +0.06 | 0.51 | 0.45 | attack block (Spirit's Refuge) |
| 125 | Katarina | +0.06 | 0.34 | 0.28 |  |
| 126 | Karthus | +0.05 | 0.33 | 0.28 |  |
| 127 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 128 | Akali | 0.00 | 0.00 | 0.00 |  |
| 129 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 130 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 131 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 132 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 133 | Braum | 0.00 | 0.00 | 0.00 |  |
| 134 | Briar | 0.00 | 0.00 | 0.00 |  |
| 135 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 136 | Darius | 0.00 | 0.00 | 0.00 |  |
| 137 | Diana | 0.00 | 0.00 | 0.00 |  |
| 138 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 139 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 140 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 141 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 142 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 143 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 144 | Leona | 0.00 | 0.00 | 0.00 |  |
| 145 | Locke | 0.00 | 0.00 | 0.00 |  |
| 146 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 147 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 148 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 149 | Rell | 0.00 | 0.00 | 0.00 |  |
| 150 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 151 | Riven | 0.00 | 0.00 | 0.00 |  |
| 152 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 153 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 154 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 155 | Talon | 0.00 | 0.00 | 0.00 |  |
| 156 | Taric | 0.00 | 0.00 | 0.00 |  |
| 157 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 158 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 159 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 160 | Taliyah | -0.01 | 0.47 | 0.48 |  |
| 161 | Fiddlesticks | -0.09 | 0.34 | 0.43 |  |
| 162 | Viego | -0.11 | 0.07 | 0.18 |  |
| 163 | Pyke | -0.13 | 0.00 | 0.13 |  |
| 164 | Gragas | -0.14 | 0.00 | 0.14 |  |
| 165 | Warwick | -0.17 | 0.46 | 0.63 |  |
| 166 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 167 | Nunu & Willump | -0.23 | 0.25 | 0.48 |  |
| 168 | Vi | -0.25 | 0.07 | 0.32 |  |
| 169 | Zac | -0.38 | 0.00 | 0.38 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Galio | -0.59 | 0.00 | 0.59 |  |
