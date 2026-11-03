# Counters to Kog'Maw (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Kog'Maw: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Kog'Maw wins every time) to +1 (the champion does). Run `npm run duel -- <champion> KogMaw --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Tahm Kench | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 2 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 3 | Zac | +0.76 | +0.98 | +0.98 | +1.00 | −0.02 | +0.72 | +0.00 |
| 4 | Trundle | +0.74 | +1.00 | +1.00 | +1.00 | −0.37 | +1.00 | +0.00 |
| 5 | Yorick | +0.70 | +1.00 | +0.68 | +1.00 | −0.14 | +1.00 | +0.00 |
| 6 | Jax | +0.63 | +0.50 | +1.00 | +1.00 | +0.01 | +0.50 | +0.00 |
| 7 | Zaahen | +0.58 | +0.27 | +1.00 | +1.00 | −0.24 | +1.00 | +0.00 |
| 8 | Nasus | +0.44 | +0.00 | +1.00 | +1.00 | −0.10 | +0.00 | +0.00 |
| 9 | Yasuo | +0.42 | +0.77 | −0.03 | +0.84 | −0.10 | +0.78 | +0.00 |
| 10 | Poppy | +0.29 | +0.00 | +0.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 11 | Maokai | +0.22 | +0.50 | +0.00 | +0.50 | −0.06 | +0.00 | +0.00 |
| 12 | Anivia | +0.19 | +0.06 | +0.19 | +0.60 | −0.10 | +0.18 | +0.00 |
| 13 | K'Sante | +0.17 | +0.00 | +0.00 | +1.00 | −0.19 | +0.00 | +0.00 |
| 14 | Gangplank | +0.10 | +0.00 | +0.00 | +0.00 | −0.01 | +1.00 | +0.00 |
| 15 | Fiora | +0.04 | −1.00 | +0.00 | +1.00 | −0.39 | +1.00 | +1.00 |
| 16 | Ivern | −0.00 | −0.40 | +0.43 | +0.00 | −0.06 | – | +0.00 |
| 17 | Malphite | −0.03 | +0.00 | +0.00 | +0.00 | −0.20 | +0.00 | +0.00 |
| 18 | Tryndamere | −0.05 | +0.00 | +0.00 | +0.00 | −0.31 | +0.00 | +0.00 |
| 19 | Master Yi | −0.11 | +0.00 | +0.00 | −0.50 | −0.07 | +0.00 | +0.00 |
| 20 | Garen | −0.19 | +0.00 | −1.00 | +1.00 | −0.28 | −1.00 | +0.00 |
| 21 | Graves | −0.22 | +0.00 | +0.00 | −1.00 | +0.00 | – | +0.00 |
| 22 | Swain | −0.23 | +0.04 | −0.15 | −0.98 | +0.10 | – | +0.00 |
| 23 | Camille | −0.24 | +0.00 | +0.00 | −1.00 | −0.28 | +0.00 | +0.00 |
| 24 | Shyvana | −0.26 | −1.00 | +0.00 | +0.00 | −0.09 | +0.00 | +0.00 |
| 25 | Vayne | −0.30 | +0.00 | −1.00 | +0.00 | −0.14 | – | +0.00 |
| 26 | Heimerdinger | −0.32 | −1.00 | −1.00 | +1.00 | +0.07 | – | +0.00 |
| 27 | Braum | −0.33 | −1.00 | −1.00 | +1.00 | −0.05 | −0.24 | +0.00 |
| 28 | Rammus | −0.33 | +0.00 | +0.00 | −1.00 | −0.23 | −1.00 | +0.00 |
| 29 | Volibear | −0.35 | −0.07 | −1.00 | −0.07 | −0.36 | −0.13 | +0.00 |
| 30 | Lee Sin | −0.36 | +0.00 | −1.00 | −1.00 | −0.07 | +1.00 | +0.00 |
| 31 | Gragas | −0.50 | −1.00 | −1.00 | +0.00 | −0.00 | +0.00 | +0.00 |
| 32 | Azir | −0.50 | −1.00 | +0.00 | −1.00 | −0.01 | – | +0.00 |
| 33 | Gwen | −0.55 | −1.00 | −1.00 | +0.00 | −0.36 | +0.00 | +0.00 |
| 34 | Mordekaiser | −0.56 | −1.00 | −1.00 | +0.33 | −0.14 | −1.00 | +0.00 |
| 35 | Teemo | −0.56 | −1.00 | −1.00 | +0.00 | +0.00 | – | +0.00 |
| 36 | Yone | −0.58 | −0.41 | −0.41 | −1.00 | −0.34 | −1.00 | −0.41 |
| 37 | Taric | −0.59 | −0.13 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 38 | Kayle | −0.59 | −1.00 | −1.00 | +0.00 | +0.06 | −1.00 | +0.00 |
| 39 | Urgot | −0.61 | −1.00 | −1.00 | −0.03 | −0.05 | −1.00 | +0.00 |
| 40 | Bel'Veth | −0.62 | −1.00 | −1.00 | +0.00 | −0.12 | −1.00 | +0.00 |
| 41 | Briar | −0.62 | −1.00 | −1.00 | +0.00 | −0.39 | −0.62 | +0.00 |
| 42 | Morgana | −0.64 | −1.00 | −0.94 | −0.37 | −0.09 | – | +0.00 |
| 43 | Aurelion Sol | −0.71 | −1.00 | −1.00 | −1.00 | +0.38 | – | +0.00 |
| 44 | Riven | −0.72 | −1.00 | −1.00 | −0.50 | −0.14 | −1.00 | +0.00 |
| 45 | Ornn | −0.72 | −1.00 | −1.00 | −0.50 | −0.15 | −1.00 | +0.00 |
| 46 | Vel'Koz | −0.73 | −1.00 | −1.00 | −1.00 | +0.27 | – | +0.00 |
| 47 | Ziggs | −0.76 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 48 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 49 | Milio | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 50 | Sion | −0.76 | −0.90 | −0.88 | −1.00 | −0.09 | −1.00 | +0.00 |
| 51 | Cassiopeia | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 52 | Yunara | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 53 | Zeri | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 54 | Jhin | −0.76 | −1.00 | −1.00 | −0.96 | +0.04 | – | +0.00 |
| 55 | Rengar | −0.76 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | +0.00 |
| 56 | Jinx | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 57 | Miss Fortune | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 58 | Xayah | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 59 | Aphelios | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 60 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 61 | Smolder | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 62 | Mel | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 63 | Varus | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 64 | Xerath | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 65 | Nami | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 66 | Aurora | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 67 | Draven | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 68 | Orianna | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 69 | Lulu | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 70 | Zyra | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 71 | Janna | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 72 | Zoe | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 73 | Ryze | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 74 | Kai'Sa | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 75 | Elise | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 76 | Karma | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 77 | Neeko | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 78 | Sona | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 79 | Renata Glasc | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.12 |
| 80 | Corki | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 81 | Fiddlesticks | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 82 | Hwei | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 83 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 84 | Lux | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 85 | Samira | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 86 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 87 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 88 | Karthus | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 89 | Twitch | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 90 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 91 | Brand | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 92 | Ezreal | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 93 | Nidalee | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 94 | Zilean | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 95 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 96 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 97 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 98 | Sylas | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 99 | Twisted Fate | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 100 | Annie | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 101 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 102 | Malzahar | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 103 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 104 | Kennen | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 105 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 106 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.21 |
| 107 | Diana | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 108 | Ashe | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 109 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 110 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 111 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 112 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 113 | Kalista | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 114 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 115 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 116 | Gnar | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 117 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 118 | Akshan | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 119 | Jarvan IV | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 120 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 121 | Jayce | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 122 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 123 | Kled | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 124 | Quinn | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.13 |
| 125 | Irelia | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 126 | Xin Zhao | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 127 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 128 | Nunu & Willump | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 129 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 130 | Illaoi | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 131 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 132 | Lillia | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 133 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.00 |
| 134 | Alistar | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 135 | Rumble | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 136 | Kindred | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.00 |
| 137 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 138 | Naafiri | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 139 | Kha'Zix | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 140 | Tristana | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 141 | Nocturne | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 142 | Pantheon | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 143 | Nilah | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 144 | Vi | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 145 | Locke | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 146 | Kassadin | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 147 | Ambessa | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 148 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.30 | – | +0.00 |
| 149 | Bard | −0.83 | −1.00 | −1.00 | −1.00 | −0.30 | – | +0.00 |
| 150 | Sejuani | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 151 | Cho'Gath | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 152 | Talon | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 153 | Sett | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.00 |
| 154 | Olaf | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.00 |
| 155 | Renekton | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |
| 156 | Udyr | −0.84 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.00 |
| 157 | Rakan | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |
| 158 | Singed | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |
| 159 | Zed | −0.85 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | +0.00 |
| 160 | Fizz | −0.85 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | +0.00 |
| 161 | Shaco | −0.85 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.00 |
| 162 | Kayn | −0.85 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.00 |
| 163 | Ekko | −0.85 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.00 |
| 164 | Darius | −0.85 | −1.00 | −1.00 | −1.00 | −0.36 | −1.00 | +0.00 |
| 165 | Warwick | −0.85 | −1.00 | −1.00 | −1.00 | −0.36 | −1.00 | +0.00 |
| 166 | Qiyana | −0.85 | −1.00 | −1.00 | −1.00 | −0.36 | −1.00 | +0.00 |
| 167 | Aatrox | −0.85 | −1.00 | −1.00 | −1.00 | −0.36 | −1.00 | +0.00 |
| 168 | Rek'Sai | −0.86 | −1.00 | −1.00 | −1.00 | −0.37 | −1.00 | +0.00 |
| 169 | Pyke | −0.86 | −1.00 | −1.00 | −1.00 | −0.39 | −1.00 | +0.00 |
| 170 | Viego | −0.86 | −1.00 | −1.00 | −1.00 | −0.39 | −1.00 | +0.00 |
| 171 | Hecarim | −0.87 | −1.00 | −1.00 | −1.00 | −0.44 | −1.00 | +0.00 |
| 172 | Wukong | −0.87 | −1.00 | −1.00 | −1.00 | −0.46 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Kog'Maw's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kog'Maw's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> KogMaw` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Yuumi (net +0.60)

- **0.65** untargetable: You and Me! makes Yuumi untargetable, dodging Kog'Maw's Living Artillery. Untargetable for ?; Living Artillery takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Kog'Maw R Living Artillery)
- Watch out: Kog'Maw's basic attacks reach 75 units farther than Yuumi's (500 vs 425 attack range).

#### 2. Samira (net +0.53)

- **0.33** projectile block: Blade Whirl blocks Kog'Maw's Void Ooze, a projectile. Blade Whirl for 0.75 s; Void Ooze takes 1.22 s to land, enough to react. (Samira W Blade Whirl → Kog'Maw E Void Ooze)
- **0.27** projectile block: Blade Whirl blocks Kog'Maw's Caustic Spittle, a projectile. Blade Whirl for 0.75 s; Caustic Spittle takes 0.73 s to land, enough to react. (Samira W Blade Whirl → Kog'Maw Q Caustic Spittle)
- **0.24** projectile block: Blade Whirl blocks Kog'Maw's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Kog'Maw basic attacks)

#### 3. Braum (net +0.49)

- **0.45** projectile block: Unbreakable blocks Kog'Maw's Void Ooze, a projectile. Unbreakable for 4 s, long enough to use ahead of Void Ooze. (Braum E Unbreakable → Kog'Maw E Void Ooze)
- **0.42** projectile block: Unbreakable blocks Kog'Maw's Caustic Spittle, a projectile. Unbreakable for 4 s, long enough to use ahead of Caustic Spittle. (Braum E Unbreakable → Kog'Maw Q Caustic Spittle)
- **0.41** projectile block: Unbreakable blocks Kog'Maw's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Kog'Maw basic attacks)
- Watch out: Kog'Maw's basic attacks reach 375 units farther than Braum's (500 vs 125 attack range).

#### 4. Mel (net +0.49)

- **0.30** projectile block: Rebuttal blocks Kog'Maw's Void Ooze, a projectile. Rebuttal for 0.75 s; Void Ooze takes 1.22 s to land, enough to react. (Mel W Rebuttal → Kog'Maw E Void Ooze)
- **0.25** projectile block: Rebuttal blocks Kog'Maw's Caustic Spittle, a projectile. Rebuttal for 0.75 s; Caustic Spittle takes 0.73 s to land, enough to react. (Mel W Rebuttal → Kog'Maw Q Caustic Spittle)
- **0.24** projectile block: Rebuttal blocks Kog'Maw's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Kog'Maw basic attacks)

#### 5. Kayle (net +0.48)

- **0.26** invulnerable: Divine Judgment makes Kayle invulnerable to Kog'Maw's Living Artillery. Invulnerable for 2.5 s, long enough to use ahead of Living Artillery. (Kayle R Divine Judgment → Kog'Maw R Living Artillery)
- **0.22** range: Kayle's basic attacks reach 125 units farther than Kog'Maw's (625 vs 500 attack range). Kog'Maw has no dash or blink to close the gap. (Kayle basic attacks → Kog'Maw basic attacks)

#### 6. Yasuo (net +0.44)

- **0.37** projectile block: Wind Wall blocks Kog'Maw's Void Ooze, a projectile. Wind Wall for 4 s, long enough to use ahead of Void Ooze. (Yasuo W Wind Wall → Kog'Maw E Void Ooze)
- **0.31** projectile block: Wind Wall blocks Kog'Maw's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Kog'Maw basic attacks)
- **0.29** projectile block: Wind Wall blocks Kog'Maw's Caustic Spittle, a projectile. Wind Wall for 4 s, long enough to use ahead of Caustic Spittle. (Yasuo W Wind Wall → Kog'Maw Q Caustic Spittle)
- Watch out: Kog'Maw's basic attacks reach 325 units farther than Yasuo's (500 vs 175 attack range).

#### 7. Shen (net +0.42)

- **0.45** attack block: Spirit's Refuge blocks Kog'Maw's Bio-Arcane Barrage, which applies on-hit effects. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Kog'Maw W Bio-Arcane Barrage)
- **0.29** attack block: Spirit's Refuge blocks Kog'Maw's basic attacks. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Kog'Maw basic attacks)
- Watch out: Kog'Maw's basic attacks reach 375 units farther than Shen's (500 vs 125 attack range).

#### 8. Teemo (net +0.38)

- **0.38** blind: Blinding Dart's blind makes Kog'Maw's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Kog'Maw basic attacks)

#### 9. Tristana (net +0.36)

- **0.36** range: Tristana's basic attacks reach 200 units farther than Kog'Maw's (700 vs 500 attack range). Kog'Maw has no dash or blink to close the gap. (Tristana basic attacks → Kog'Maw basic attacks)

#### 10. Jax (net +0.34)

- **0.45** attack dodge: Counter Strike dodges Kog'Maw's Bio-Arcane Barrage, which applies on-hit effects. Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Kog'Maw W Bio-Arcane Barrage)
- **0.31** attack dodge: Counter Strike dodges Kog'Maw's basic attacks. Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Kog'Maw basic attacks)
- Watch out: Kog'Maw's basic attacks reach 375 units farther than Jax's (500 vs 125 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +0.60 | 0.65 | 0.05 |  |
| 2 | Samira | +0.53 | 0.53 | 0.00 |  |
| 3 | Braum | +0.49 | 0.76 | 0.27 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Mel | +0.49 | 0.49 | 0.00 |  |
| 5 | Kayle | +0.48 | 0.48 | 0.00 |  |
| 6 | Yasuo | +0.44 | 0.60 | 0.16 |  |
| 7 | Shen | +0.42 | 0.60 | 0.18 | attack block (Spirit's Refuge) |
| 8 | Teemo | +0.38 | 0.38 | 0.00 |  |
| 9 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 10 | Jax | +0.34 | 0.61 | 0.27 | attack dodge (Counter Strike) |
| 11 | Nilah | +0.33 | 0.53 | 0.20 |  |
| 12 | Sivir | +0.28 | 0.28 | 0.00 |  |
| 13 | Vladimir | +0.28 | 0.28 | 0.00 |  |
| 14 | Caitlyn | +0.27 | 0.27 | 0.00 |  |
| 15 | Lulu | +0.27 | 0.27 | 0.00 |  |
| 16 | Aurora | +0.26 | 0.26 | 0.00 |  |
| 17 | Bard | +0.26 | 0.26 | 0.00 |  |
| 18 | Lissandra | +0.26 | 0.26 | 0.00 |  |
| 19 | Xayah | +0.26 | 0.26 | 0.00 |  |
| 20 | Fizz | +0.19 | 0.31 | 0.12 |  |
| 21 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 22 | Senna | +0.16 | 0.16 | 0.00 |  |
| 23 | Annie | +0.14 | 0.14 | 0.00 |  |
| 24 | Yunara | +0.14 | 0.14 | 0.00 |  |
| 25 | Pantheon | +0.12 | 0.28 | 0.16 |  |
| 26 | Camille | +0.12 | 0.26 | 0.14 |  |
| 27 | Anivia | +0.12 | 0.12 | 0.00 |  |
| 28 | Master Yi | +0.11 | 0.35 | 0.24 |  |
| 29 | Kayn | +0.10 | 0.26 | 0.16 |  |
| 30 | Rek'Sai | +0.10 | 0.26 | 0.16 |  |
| 31 | Morgana | +0.10 | 0.10 | 0.00 |  |
| 32 | Varus | +0.10 | 0.10 | 0.00 |  |
| 33 | Zyra | +0.09 | 0.09 | 0.00 |  |
| 34 | Evelynn | +0.08 | 0.26 | 0.18 |  |
| 35 | Shaco | +0.08 | 0.26 | 0.18 |  |
| 36 | Zed | +0.08 | 0.26 | 0.18 |  |
| 37 | Fiora | +0.07 | 0.32 | 0.25 |  |
| 38 | Malzahar | +0.06 | 0.06 | 0.00 |  |
| 39 | Milio | +0.06 | 0.06 | 0.00 |  |
| 40 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 41 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 42 | Kalista | +0.04 | 0.04 | 0.00 |  |
| 43 | Maokai | +0.03 | 0.30 | 0.27 |  |
| 44 | Gwen | +0.03 | 0.28 | 0.25 |  |
| 45 | Nocturne | +0.02 | 0.29 | 0.27 |  |
| 46 | Rammus | +0.02 | 0.29 | 0.27 |  |
| 47 | Xin Zhao | +0.02 | 0.26 | 0.24 |  |
| 48 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 49 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 50 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 51 | Azir | 0.00 | 0.00 | 0.00 |  |
| 52 | Brand | 0.00 | 0.00 | 0.00 |  |
| 53 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 54 | Corki | 0.00 | 0.00 | 0.00 |  |
| 55 | Draven | 0.00 | 0.00 | 0.00 |  |
| 56 | Elise | 0.00 | 0.00 | 0.00 |  |
| 57 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 58 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 59 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 60 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 61 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 62 | Janna | 0.00 | 0.00 | 0.00 |  |
| 63 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 64 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 65 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 66 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 67 | Karma | 0.00 | 0.00 | 0.00 |  |
| 68 | Karthus | 0.00 | 0.00 | 0.00 |  |
| 69 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 70 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 71 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 72 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 73 | Lux | 0.00 | 0.00 | 0.00 |  |
| 74 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 75 | Nami | 0.00 | 0.00 | 0.00 |  |
| 76 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 77 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 78 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 79 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 80 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 81 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 82 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 83 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 84 | Sona | 0.00 | 0.00 | 0.00 |  |
| 85 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 86 | Swain | 0.00 | 0.00 | 0.00 |  |
| 87 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 88 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 89 | Thresh | 0.00 | 0.00 | 0.00 |  |
| 90 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 91 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 92 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 93 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 94 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 95 | Vex | 0.00 | 0.00 | 0.00 |  |
| 96 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 97 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 98 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 99 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 100 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 101 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 102 | Kled | -0.04 | 0.05 | 0.09 |  |
| 103 | Graves | -0.04 | 0.00 | 0.04 |  |
| 104 | Malphite | -0.08 | 0.19 | 0.27 |  |
| 105 | Zaahen | -0.10 | 0.06 | 0.16 |  |
| 106 | Rakan | -0.10 | 0.00 | 0.10 |  |
| 107 | Urgot | -0.11 | 0.00 | 0.11 |  |
| 108 | Viego | -0.11 | 0.00 | 0.11 |  |
| 109 | Warwick | -0.12 | 0.06 | 0.18 |  |
| 110 | Jarvan IV | -0.12 | 0.00 | 0.12 |  |
| 111 | Sylas | -0.12 | 0.00 | 0.12 |  |
| 112 | Yone | -0.12 | 0.00 | 0.12 |  |
| 113 | K'Sante | -0.13 | 0.00 | 0.13 |  |
| 114 | Lillia | -0.13 | 0.00 | 0.13 |  |
| 115 | Briar | -0.14 | 0.00 | 0.14 |  |
| 116 | Naafiri | -0.14 | 0.00 | 0.14 |  |
| 117 | Udyr | -0.16 | 0.11 | 0.27 |  |
| 118 | Hecarim | -0.16 | 0.00 | 0.16 |  |
| 119 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 120 | Ornn | -0.16 | 0.00 | 0.16 |  |
| 121 | Rell | -0.16 | 0.00 | 0.16 |  |
| 122 | Bel'Veth | -0.17 | 0.00 | 0.17 |  |
| 123 | Galio | -0.17 | 0.00 | 0.17 |  |
| 124 | Pyke | -0.17 | 0.00 | 0.17 |  |
| 125 | Qiyana | -0.17 | 0.00 | 0.17 |  |
| 126 | Volibear | -0.17 | 0.00 | 0.17 |  |
| 127 | Akali | -0.18 | 0.00 | 0.18 |  |
| 128 | Ambessa | -0.18 | 0.00 | 0.18 |  |
| 129 | Ekko | -0.18 | 0.00 | 0.18 |  |
| 130 | Lee Sin | -0.18 | 0.00 | 0.18 |  |
| 131 | Riven | -0.18 | 0.00 | 0.18 |  |
| 132 | Talon | -0.18 | 0.00 | 0.18 |  |
| 133 | Vi | -0.18 | 0.00 | 0.18 |  |
| 134 | Irelia | -0.22 | 0.00 | 0.22 |  |
| 135 | Alistar | -0.23 | 0.04 | 0.27 |  |
| 136 | Aatrox | -0.24 | 0.00 | 0.24 |  |
| 137 | Nautilus | -0.24 | 0.00 | 0.24 |  |
| 138 | Tahm Kench | -0.24 | 0.00 | 0.24 |  |
| 139 | Tryndamere | -0.24 | 0.00 | 0.24 |  |
| 140 | Zac | -0.24 | 0.00 | 0.24 |  |
| 141 | Nasus | -0.25 | 0.29 | 0.54 |  |
| 142 | Diana | -0.25 | 0.00 | 0.25 |  |
| 143 | Kassadin | -0.25 | 0.00 | 0.25 |  |
| 144 | Sejuani | -0.25 | 0.00 | 0.25 |  |
| 145 | Shyvana | -0.25 | 0.00 | 0.25 |  |
| 146 | Amumu | -0.27 | 0.00 | 0.27 |  |
| 147 | Gragas | -0.27 | 0.00 | 0.27 |  |
| 148 | Illaoi | -0.27 | 0.00 | 0.27 |  |
| 149 | Katarina | -0.27 | 0.00 | 0.27 |  |
| 150 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 151 | Leona | -0.27 | 0.00 | 0.27 |  |
| 152 | Locke | -0.27 | 0.00 | 0.27 |  |
| 153 | Poppy | -0.27 | 0.00 | 0.27 |  |
| 154 | Renekton | -0.27 | 0.00 | 0.27 |  |
| 155 | Sett | -0.27 | 0.00 | 0.27 |  |
| 156 | Garen | -0.35 | 0.12 | 0.47 |  |
| 157 | Mordekaiser | -0.40 | 0.07 | 0.47 |  |
| 158 | Nunu & Willump | -0.41 | 0.13 | 0.54 |  |
| 159 | Sion | -0.41 | 0.06 | 0.47 |  |
| 160 | Rengar | -0.45 | 0.09 | 0.54 |  |
| 161 | Skarner | -0.45 | 0.06 | 0.51 |  |
| 162 | Gangplank | -0.46 | 0.08 | 0.54 |  |
| 163 | Darius | -0.47 | 0.00 | 0.47 |  |
| 164 | Trundle | -0.47 | 0.00 | 0.47 |  |
| 165 | Yorick | -0.47 | 0.00 | 0.47 |  |
| 166 | Olaf | -0.48 | 0.06 | 0.54 |  |
| 167 | Taric | -0.51 | 0.00 | 0.51 |  |
| 168 | Blitzcrank | -0.54 | 0.00 | 0.54 |  |
| 169 | Cho'Gath | -0.54 | 0.00 | 0.54 |  |
| 170 | Dr. Mundo | -0.54 | 0.00 | 0.54 |  |
| 171 | Rumble | -0.54 | 0.00 | 0.54 |  |
| 172 | Singed | -0.54 | 0.00 | 0.54 |  |
