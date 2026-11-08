# Counters to Urgot (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Urgot: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Urgot wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Urgot --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.88 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +1.00 |
| 2 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.07 |
| 3 | Kayle | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 4 | Yunara | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 5 | Shyvana | +0.82 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +1.00 |
| 6 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 7 | Aurora | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 8 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 9 | Illaoi | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 10 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.25 | +1.00 | +1.00 |
| 11 | Zaahen | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 12 | Xayah | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 13 | Twisted Fate | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 14 | Lulu | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.04 |
| 15 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 16 | Draven | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 17 | Bel'Veth | +0.80 | +1.00 | +1.00 | +1.00 | −0.32 | +1.00 | +1.00 |
| 18 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 19 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 20 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 21 | Sivir | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 22 | Warwick | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 23 | Zac | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 24 | Neeko | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 25 | Milio | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 26 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 27 | Gangplank | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 28 | Sion | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 29 | Ivern | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 30 | Diana | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 31 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 32 | Braum | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 33 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 34 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 35 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 36 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 37 | Lee Sin | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 38 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 39 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 40 | Sett | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 41 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 42 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 43 | Viego | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 44 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 45 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 46 | Volibear | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 47 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 48 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 49 | Yone | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 50 | Xin Zhao | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 51 | Irelia | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 52 | Master Yi | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 53 | Udyr | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 54 | Garen | +0.77 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +0.00 |
| 55 | Quinn | +0.76 | +1.00 | +1.00 | +1.00 | −0.25 | +1.00 | +0.00 |
| 56 | Aatrox | +0.76 | +1.00 | +1.00 | +1.00 | −0.28 | +1.00 | +0.00 |
| 57 | Wukong | +0.75 | +1.00 | +1.00 | +1.00 | −0.35 | +1.00 | +0.00 |
| 58 | Zeri | +0.75 | +1.00 | +1.00 | +1.00 | −0.36 | +1.00 | +0.00 |
| 59 | Rumble | +0.73 | +0.88 | +0.88 | +1.00 | −0.07 | +1.00 | +0.00 |
| 60 | Elise | +0.69 | +1.00 | +1.00 | +1.00 | −0.05 | −0.05 | +0.00 |
| 61 | Camille | +0.61 | +1.00 | +0.37 | +1.00 | −0.19 | +1.00 | +0.00 |
| 62 | Kog'Maw | +0.61 | +1.00 | +1.00 | +0.03 | +0.05 | +1.00 | +0.00 |
| 63 | Janna | +0.46 | +1.00 | +1.00 | −0.72 | +0.04 | +1.00 | +0.00 |
| 64 | Corki | +0.45 | +1.00 | +1.00 | −0.77 | +0.04 | +1.00 | +0.00 |
| 65 | Ashe | +0.42 | +1.00 | +1.00 | −0.96 | +0.10 | +1.00 | +0.00 |
| 66 | Orianna | +0.42 | +1.00 | +1.00 | −0.92 | +0.04 | +1.00 | +0.00 |
| 67 | Jinx | +0.42 | +1.00 | +1.00 | −0.92 | +0.03 | +1.00 | +0.00 |
| 68 | Smolder | +0.41 | +1.00 | +1.00 | −0.95 | +0.02 | +1.00 | +0.00 |
| 69 | Varus | +0.41 | +1.00 | +1.00 | −1.00 | +0.08 | +1.00 | +0.00 |
| 70 | Ezreal | +0.41 | +0.99 | +0.99 | −1.00 | +0.11 | +1.00 | +0.00 |
| 71 | Pantheon | +0.40 | +1.00 | +1.00 | −0.91 | −0.11 | +1.00 | +0.00 |
| 72 | Ambessa | +0.40 | +1.00 | +1.00 | −0.94 | −0.10 | +1.00 | +0.00 |
| 73 | Tristana | +0.39 | +1.00 | +1.00 | −0.93 | −0.18 | +1.00 | +0.00 |
| 74 | Kled | +0.37 | +1.00 | +1.00 | −1.00 | −0.19 | +1.00 | +0.00 |
| 75 | Rammus | +0.37 | +1.00 | +1.00 | −1.00 | −0.21 | +1.00 | +0.00 |
| 76 | Heimerdinger | +0.32 | +0.03 | +0.04 | +1.00 | +0.05 | +1.00 | +0.00 |
| 77 | Rek'Sai | +0.29 | −0.99 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 78 | Miss Fortune | +0.24 | +1.00 | +1.00 | −1.00 | +0.05 | −0.72 | +0.00 |
| 79 | Malzahar | +0.22 | +1.00 | +1.00 | −0.94 | +0.04 | −1.00 | +0.00 |
| 80 | Karma | +0.21 | +0.24 | +0.27 | +0.25 | +0.04 | +0.23 | +0.00 |
| 81 | Zilean | +0.18 | +0.08 | +1.00 | −0.97 | +0.03 | +0.96 | +0.00 |
| 82 | Swain | +0.13 | +0.16 | +0.25 | +0.03 | +0.04 | +0.16 | +0.00 |
| 83 | Sona | +0.12 | +0.24 | +0.20 | +0.00 | +0.03 | +0.10 | +0.00 |
| 84 | Annie | +0.10 | +0.07 | +0.14 | +0.11 | +0.04 | +0.21 | +0.00 |
| 85 | Soraka | +0.10 | +0.17 | +0.08 | +0.09 | +0.03 | +0.17 | +0.00 |
| 86 | Nami | +0.09 | +0.18 | +0.18 | +0.00 | −0.02 | +0.05 | +0.00 |
| 87 | Tahm Kench | +0.07 | +0.13 | +0.13 | +0.04 | −0.11 | +0.16 | +0.00 |
| 88 | Akshan | +0.07 | +0.09 | +0.09 | +0.09 | −0.01 | +0.05 | +0.00 |
| 89 | Vel'Koz | +0.07 | +0.06 | +0.06 | +0.02 | +0.19 | +0.05 | +0.00 |
| 90 | Ornn | +0.07 | −0.05 | −0.03 | −0.07 | −0.02 | +1.00 | +0.00 |
| 91 | Lux | +0.06 | +0.15 | +0.15 | −0.06 | −0.02 | −0.02 | +0.00 |
| 92 | Brand | +0.06 | +0.10 | +0.09 | −0.01 | −0.01 | +0.10 | +0.00 |
| 93 | Jhin | +0.06 | +0.71 | +0.71 | −1.00 | +0.01 | −1.00 | +0.00 |
| 94 | Zyra | +0.02 | +0.06 | +0.07 | −0.04 | −0.06 | +0.02 | +0.00 |
| 95 | Maokai | +0.01 | +1.00 | −0.50 | −1.00 | −0.10 | +1.00 | +0.00 |
| 96 | Viktor | +0.01 | +0.02 | +0.04 | −0.06 | +0.02 | +0.04 | +0.00 |
| 97 | Gragas | +0.00 | +0.04 | +0.04 | −0.03 | −0.07 | −0.02 | +0.00 |
| 98 | Anivia | +0.00 | −0.02 | −0.01 | +0.17 | −0.12 | −0.07 | +0.00 |
| 99 | Hwei | +0.00 | −0.03 | +0.00 | −0.02 | +0.01 | +0.10 | +0.00 |
| 100 | Zoe | −0.03 | −0.00 | −0.03 | −0.10 | −0.03 | −0.00 | +0.00 |
| 101 | Lucian | −0.07 | −0.42 | +0.07 | −0.32 | −0.14 | +1.00 | +0.00 |
| 102 | Jarvan IV | −0.11 | +1.00 | −1.00 | −1.00 | −0.08 | +1.00 | +0.00 |
| 103 | Senna | −0.12 | +0.10 | +0.10 | −0.89 | +0.05 | +0.02 | +0.00 |
| 104 | Ahri | −0.14 | −0.07 | −0.41 | −0.15 | +0.00 | +0.03 | +0.00 |
| 105 | Shen | −0.15 | −0.06 | −0.07 | −0.01 | −0.11 | −1.00 | +0.00 |
| 106 | Syndra | −0.15 | −0.03 | +0.10 | −0.91 | +0.04 | +0.06 | +0.00 |
| 107 | Veigar | −0.25 | −0.07 | −0.12 | −0.94 | +0.05 | −0.17 | +0.00 |
| 108 | Mel | −0.30 | +0.02 | −0.04 | −0.93 | −0.09 | −0.97 | +0.00 |
| 109 | Seraphine | −0.35 | −0.25 | +0.05 | −1.00 | −0.02 | −0.95 | +0.00 |
| 110 | Fiddlesticks | −0.35 | −0.14 | −0.06 | −0.94 | −0.08 | −0.97 | +0.00 |
| 111 | Cassiopeia | −0.45 | −0.95 | −0.07 | −0.65 | +0.14 | −0.84 | +0.00 |
| 112 | Amumu | −0.57 | −1.00 | −0.79 | −1.00 | −0.15 | +1.00 | +0.00 |
| 113 | Rell | −0.59 | −1.00 | −1.00 | −1.00 | +0.07 | +1.00 | +0.00 |
| 114 | Jayce | −0.61 | −1.00 | −1.00 | −1.00 | −0.06 | +1.00 | +0.00 |
| 115 | Karthus | −0.61 | −1.00 | −0.18 | −1.00 | −0.10 | −1.00 | +0.00 |
| 116 | Kalista | −0.61 | −1.00 | −1.00 | −1.00 | −0.10 | +1.00 | +0.00 |
| 117 | Sylas | −0.62 | −1.00 | −1.00 | −1.00 | −0.10 | +1.00 | +0.00 |
| 118 | Vex | −0.62 | −0.84 | −0.84 | −0.49 | −0.00 | −1.00 | +0.00 |
| 119 | Skarner | −0.62 | −1.00 | −1.00 | −1.00 | −0.13 | +1.00 | +0.00 |
| 120 | Vi | −0.62 | −1.00 | −1.00 | −1.00 | −0.14 | +1.00 | +0.00 |
| 121 | Kennen | −0.62 | −1.00 | −1.00 | −1.00 | −0.16 | +1.00 | +0.00 |
| 122 | Kayn | −0.63 | −1.00 | −1.00 | −1.00 | −0.23 | +1.00 | +0.00 |
| 123 | Ziggs | −0.68 | −1.00 | −1.00 | −1.00 | +0.11 | +0.04 | +0.00 |
| 124 | Lissandra | −0.69 | −1.00 | −0.98 | −1.00 | +0.06 | −0.05 | +0.00 |
| 125 | Nidalee | −0.70 | −1.00 | −1.00 | −1.00 | −0.02 | +0.01 | +0.00 |
| 126 | LeBlanc | −0.72 | −1.00 | −1.00 | −1.00 | −0.06 | −0.07 | +0.00 |
| 127 | Xerath | −0.75 | −0.90 | −0.90 | −1.00 | +0.01 | −1.00 | +0.00 |
| 128 | Aurelion Sol | −0.76 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | +0.00 |
| 129 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 130 | Graves | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 131 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 132 | Yuumi | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 133 | Ryze | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 134 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −0.98 | +0.00 |
| 135 | Lillia | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 136 | Bard | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 137 | Azir | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −0.95 | +0.00 |
| 138 | Rakan | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 139 | Twitch | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −0.94 | +0.00 |
| 140 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 141 | Kindred | −0.80 | −1.00 | −1.00 | −1.00 | −0.08 | −0.92 | +0.00 |
| 142 | Nunu & Willump | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 143 | Briar | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 144 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 145 | Alistar | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 146 | Morgana | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 147 | Blitzcrank | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 148 | Sejuani | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 149 | Naafiri | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 150 | Samira | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 151 | Kassadin | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 152 | Riven | −0.83 | −1.00 | −1.00 | −1.00 | −0.24 | −0.92 | +0.00 |
| 153 | Zed | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 154 | Ekko | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 155 | Locke | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 156 | Shaco | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 157 | Rengar | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 158 | Singed | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 159 | Akali | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 160 | Fizz | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 161 | Leona | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 162 | Galio | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 163 | Hecarim | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.00 |
| 164 | Kha'Zix | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |
| 165 | Kai'Sa | −0.84 | −1.00 | −1.00 | −1.00 | −0.30 | −0.94 | +0.00 |
| 166 | Talon | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 167 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 168 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |
| 169 | Katarina | −0.86 | −1.00 | −1.00 | −1.00 | −0.38 | −1.00 | +0.00 |
| 170 | Thresh | −0.86 | −1.00 | −1.00 | −1.00 | −0.40 | −1.00 | +0.00 |
| 171 | Qiyana | −0.86 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | +0.00 |
| 172 | Nilah | −0.90 | −1.00 | −1.00 | −1.00 | −0.33 | −1.00 | −0.96 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Urgot's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Urgot's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Urgot` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Morgana (net +1.28)

- **0.80** cc immunity: Black Shield makes Morgana immune to Urgot's Fear Beyond Death (fear, slow, suppression). Immune for 5 s, long enough to use ahead of Fear Beyond Death. (Morgana E Black Shield → Urgot R Fear Beyond Death)
- **0.79** cc immunity: Black Shield makes Morgana immune to Urgot's Disdain (airborne, stun). Immune for 5 s, long enough to use ahead of Disdain. (Morgana E Black Shield → Urgot E Disdain)
- **0.08** cc immunity: Black Shield makes Morgana immune to Urgot's Corrosive Charge (slow). Immune for 5 s, long enough to use ahead of Corrosive Charge. (Morgana E Black Shield → Urgot Q Corrosive Charge)

#### 2. Fiora (net +1.23)

- **0.90** parry: Riposte parries Urgot's Fear Beyond Death and stuns back. Parry for 0.75 s; Fear Beyond Death takes 1.28 s to land, enough to react. Negating Fear Beyond Death's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Urgot R Fear Beyond Death)
- **0.89** parry: Riposte parries Urgot's Disdain and stuns back. Parry for 0.75 s; Disdain takes 0.85 s to land, enough to react. Negating Disdain's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Urgot E Disdain)
- **0.06** attack speed slow: Riposte cuts Urgot's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Urgot basic attacks)
- Watch out: Urgot's basic attacks reach 200 units farther than Fiora's (350 vs 150 attack range).

#### 3. Fizz (net +1.19)

- **0.85** untargetable: Playful makes Fizz untargetable, dodging Urgot's Disdain. Untargetable for 0.75 s; Disdain takes 0.85 s to land, enough to react. (Fizz E Playful → Urgot E Disdain)
- **0.80** untargetable: Playful makes Fizz untargetable, dodging Urgot's Fear Beyond Death. Untargetable for 0.75 s; Fear Beyond Death takes 1.28 s to land, enough to react. (Fizz E Playful → Urgot R Fear Beyond Death)
- Watch out: Urgot's basic attacks reach 175 units farther than Fizz's (350 vs 175 attack range).

#### 4. Udyr (net +1.13)

- **0.85** cc immunity: Blazing Stampede makes Udyr immune to Urgot's Disdain (airborne, stun). Immune for 1.5 s, long enough to use ahead of Disdain. (Udyr E Blazing Stampede → Urgot E Disdain)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Urgot's Fear Beyond Death (fear, slow, suppression). Immune for 1.5 s, long enough to use ahead of Fear Beyond Death. (Udyr E Blazing Stampede → Urgot R Fear Beyond Death)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Urgot's Corrosive Charge (slow). Immune for 1.5 s, long enough to use ahead of Corrosive Charge. (Udyr E Blazing Stampede → Urgot Q Corrosive Charge)
- Watch out: Urgot's basic attacks reach 225 units farther than Udyr's (350 vs 125 attack range).

#### 5. Vladimir (net +1.13)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Urgot's Fear Beyond Death. Untargetable for 2 s, long enough to use ahead of Fear Beyond Death. (Vladimir W Sanguine Pool → Urgot R Fear Beyond Death)
- **0.79** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Urgot's Disdain. Untargetable for 2 s, long enough to use ahead of Disdain. (Vladimir W Sanguine Pool → Urgot E Disdain)
- **0.05** range: Vladimir's basic attacks reach 100 units farther than Urgot's (450 vs 350 attack range). Urgot closes the gap with Disdain. (Vladimir basic attacks → Urgot basic attacks)
- Watch out: Disdain's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 6. Mel (net +1.13)

- **0.80** projectile block: Rebuttal blocks Urgot's Fear Beyond Death, a projectile. Rebuttal for 0.75 s; Fear Beyond Death takes 1.28 s to land, enough to react. (Mel W Rebuttal → Urgot R Fear Beyond Death)
- **0.26** projectile block: Rebuttal blocks Urgot's Corrosive Charge, a projectile. Rebuttal for 0.75 s; Corrosive Charge takes 0.25 s to land, enough to react. (Mel W Rebuttal → Urgot Q Corrosive Charge)
- **0.22** projectile block: Rebuttal blocks Urgot's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Urgot basic attacks)

#### 7. Samira (net +1.13)

- **0.80** projectile block: Blade Whirl blocks Urgot's Fear Beyond Death, a projectile. Blade Whirl for 0.75 s; Fear Beyond Death takes 1.28 s to land, enough to react. (Samira W Blade Whirl → Urgot R Fear Beyond Death)
- **0.28** projectile block: Blade Whirl blocks Urgot's Corrosive Charge, a projectile. Blade Whirl for 0.75 s; Corrosive Charge takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Urgot Q Corrosive Charge)
- **0.22** projectile block: Blade Whirl blocks Urgot's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Urgot basic attacks)

#### 8. Sivir (net +1.13)

- **0.74** spell shield: Spell Shield's spell shield blocks Urgot's Disdain. Spell shield for 1.5 s, long enough to use ahead of Disdain. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Urgot E Disdain)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Urgot's Fear Beyond Death. Spell shield for 1.5 s, long enough to use ahead of Fear Beyond Death. A spell shield blocks only the first enemy ability that reaches it. Spell shield will not block the recast's chains. (Sivir E Spell Shield → Urgot R Fear Beyond Death)
- **0.19** range: Sivir's basic attacks reach 150 units farther than Urgot's (500 vs 350 attack range). Urgot closes the gap with Disdain. (Sivir basic attacks → Urgot basic attacks)

#### 9. Lissandra (net +1.12)

- **0.74** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Urgot's Fear Beyond Death. Untargetable for 2.5 s, long enough to use ahead of Fear Beyond Death. (Lissandra R Frozen Tomb → Urgot R Fear Beyond Death)
- **0.43** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Urgot's Disdain. Untargetable for 2.5 s, long enough to use ahead of Disdain. (Lissandra R Frozen Tomb → Urgot E Disdain)
- **0.21** dash stop: Frozen Tomb's knockdown can stop Urgot's Disdain mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Urgot E Disdain)

#### 10. Maokai (net +1.10)

- **0.85** untargetable: Twisted Advance makes Maokai untargetable, dodging Urgot's Disdain. Untargetable for 1.4 s; Disdain takes 0.85 s to land, enough to react. (Maokai W Twisted Advance → Urgot E Disdain)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Urgot's Fear Beyond Death. Untargetable for 1.4 s; Fear Beyond Death takes 1.28 s to land, enough to react. (Maokai W Twisted Advance → Urgot R Fear Beyond Death)
- Watch out: Urgot's basic attacks reach 225 units farther than Maokai's (350 vs 125 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Morgana | +1.28 | 1.28 | 0.00 |  |
| 2 | Fiora | +1.23 | 1.36 | 0.13 |  |
| 3 | Fizz | +1.19 | 1.25 | 0.06 |  |
| 4 | Udyr | +1.13 | 1.28 | 0.15 |  |
| 5 | Vladimir | +1.13 | 1.25 | 0.12 |  |
| 6 | Mel | +1.13 | 1.13 | 0.00 | projectile block (Rebuttal) |
| 7 | Samira | +1.13 | 1.13 | 0.00 | projectile block (Blade Whirl) |
| 8 | Sivir | +1.13 | 1.13 | 0.00 |  |
| 9 | Lissandra | +1.12 | 1.12 | 0.00 |  |
| 10 | Maokai | +1.10 | 1.25 | 0.15 |  |
| 11 | Bard | +1.10 | 1.10 | 0.00 |  |
| 12 | Gwen | +1.04 | 1.17 | 0.13 |  |
| 13 | Xayah | +1.03 | 1.03 | 0.00 |  |
| 14 | Braum | +1.00 | 1.15 | 0.15 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 15 | Nocturne | +0.99 | 1.14 | 0.15 |  |
| 16 | Yasuo | +0.98 | 1.06 | 0.08 | projectile block (Wind Wall) |
| 17 | Master Yi | +0.95 | 1.37 | 0.42 |  |
| 18 | Rek'Sai | +0.90 | 0.98 | 0.08 |  |
| 19 | Zaahen | +0.89 | 0.97 | 0.08 |  |
| 20 | Aurora | +0.88 | 1.03 | 0.15 |  |
| 21 | Milio | +0.88 | 0.88 | 0.00 |  |
| 22 | Camille | +0.84 | 0.92 | 0.08 |  |
| 23 | Kled | +0.81 | 0.84 | 0.03 |  |
| 24 | Kalista | +0.79 | 0.79 | 0.00 |  |
| 25 | Evelynn | +0.78 | 0.96 | 0.18 |  |
| 26 | Zed | +0.77 | 0.87 | 0.10 |  |
| 27 | Kayle | +0.73 | 0.73 | 0.00 |  |
| 28 | Gangplank | +0.72 | 1.02 | 0.30 |  |
| 29 | Olaf | +0.67 | 0.97 | 0.30 |  |
| 30 | Shaco | +0.66 | 0.96 | 0.30 |  |
| 31 | Alistar | +0.62 | 0.77 | 0.15 |  |
| 32 | Sion | +0.61 | 1.04 | 0.43 |  |
| 33 | Vex | +0.61 | 0.61 | 0.00 |  |
| 34 | Rengar | +0.58 | 1.02 | 0.44 |  |
| 35 | Viktor | +0.57 | 0.57 | 0.00 | dash stop (Gravity Field) |
| 36 | Yuumi | +0.56 | 1.33 | 0.77 |  |
| 37 | Jinx | +0.56 | 0.56 | 0.00 | dash stop (Flame Chompers!) |
| 38 | Veigar | +0.55 | 0.55 | 0.00 | dash stop (Event Horizon) |
| 39 | Ahri | +0.54 | 0.54 | 0.00 | dash stop (Charm) |
| 40 | Hwei | +0.54 | 0.54 | 0.00 | dash stop (Grim Visage) |
| 41 | Cassiopeia | +0.51 | 0.51 | 0.00 | grounding (Miasma) |
| 42 | Lulu | +0.43 | 0.43 | 0.00 |  |
| 43 | Teemo | +0.41 | 0.49 | 0.08 |  |
| 44 | Mordekaiser | +0.32 | 0.55 | 0.23 |  |
| 45 | Xin Zhao | +0.32 | 0.44 | 0.12 |  |
| 46 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 47 | Garen | +0.31 | 0.54 | 0.23 |  |
| 48 | Aphelios | +0.30 | 0.30 | 0.00 |  |
| 49 | Nilah | +0.28 | 0.36 | 0.08 |  |
| 50 | Jax | +0.24 | 0.39 | 0.15 |  |
| 51 | Yone | +0.24 | 0.30 | 0.06 |  |
| 52 | Ashe | +0.22 | 0.22 | 0.00 |  |
| 53 | Zeri | +0.22 | 0.22 | 0.00 |  |
| 54 | Heimerdinger | +0.21 | 0.21 | 0.00 |  |
| 55 | Sona | +0.21 | 0.21 | 0.00 |  |
| 56 | Yunara | +0.20 | 0.20 | 0.00 |  |
| 57 | Kindred | +0.19 | 0.19 | 0.00 |  |
| 58 | Renata Glasc | +0.19 | 0.19 | 0.00 |  |
| 59 | Draven | +0.18 | 0.18 | 0.00 |  |
| 60 | Corki | +0.16 | 0.16 | 0.00 |  |
| 61 | Elise | +0.16 | 0.16 | 0.00 |  |
| 62 | Ezreal | +0.16 | 0.16 | 0.00 |  |
| 63 | Smolder | +0.16 | 0.16 | 0.00 |  |
| 64 | Zilean | +0.16 | 0.16 | 0.00 |  |
| 65 | Zoe | +0.16 | 0.16 | 0.00 |  |
| 66 | Anivia | +0.15 | 0.15 | 0.00 |  |
| 67 | Annie | +0.15 | 0.15 | 0.00 |  |
| 68 | Malzahar | +0.14 | 0.94 | 0.80 |  |
| 69 | Gnar | +0.14 | 0.14 | 0.00 |  |
| 70 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 71 | Lux | +0.14 | 0.14 | 0.00 |  |
| 72 | Nidalee | +0.13 | 0.13 | 0.00 |  |
| 73 | Seraphine | +0.13 | 0.13 | 0.00 |  |
| 74 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 75 | Ziggs | +0.13 | 0.13 | 0.00 |  |
| 76 | Zyra | +0.13 | 0.13 | 0.00 |  |
| 77 | Singed | +0.12 | 0.42 | 0.30 | grounding (Mega Adhesive) |
| 78 | Malphite | +0.12 | 0.27 | 0.15 |  |
| 79 | Azir | +0.12 | 0.12 | 0.00 |  |
| 80 | Jayce | +0.12 | 0.12 | 0.00 |  |
| 81 | Orianna | +0.12 | 0.12 | 0.00 |  |
| 82 | K'Sante | +0.11 | 0.18 | 0.07 |  |
| 83 | Brand | +0.11 | 0.11 | 0.00 |  |
| 84 | Kog'Maw | +0.11 | 0.11 | 0.00 |  |
| 85 | Nami | +0.11 | 0.11 | 0.00 |  |
| 86 | Syndra | +0.11 | 0.11 | 0.00 |  |
| 87 | Twitch | +0.10 | 0.21 | 0.11 |  |
| 88 | Karma | +0.10 | 0.10 | 0.00 |  |
| 89 | Senna | +0.09 | 0.20 | 0.11 |  |
| 90 | Swain | +0.09 | 0.09 | 0.00 |  |
| 91 | Vayne | +0.07 | 0.21 | 0.14 |  |
| 92 | Amumu | +0.06 | 0.21 | 0.15 |  |
| 93 | Kai'Sa | +0.06 | 0.17 | 0.11 |  |
| 94 | Graves | +0.06 | 0.06 | 0.00 |  |
| 95 | Thresh | +0.06 | 0.06 | 0.00 |  |
| 96 | Jarvan IV | +0.03 | 0.09 | 0.06 |  |
| 97 | LeBlanc | +0.02 | 0.10 | 0.08 |  |
| 98 | Hecarim | +0.01 | 0.09 | 0.08 |  |
| 99 | Ornn | +0.01 | 0.09 | 0.08 |  |
| 100 | Neeko | 0.00 | 0.11 | 0.11 |  |
| 101 | Volibear | 0.00 | 0.09 | 0.09 |  |
| 102 | Lillia | 0.00 | 0.00 | 0.00 |  |
| 103 | Rakan | 0.00 | 0.00 | 0.00 |  |
| 104 | Poppy | -0.01 | 0.54 | 0.55 | dash stop (Steadfast Presence) |
| 105 | Varus | -0.01 | 0.15 | 0.16 |  |
| 106 | Kayn | -0.02 | 0.96 | 0.98 |  |
| 107 | Aurelion Sol | -0.02 | 0.11 | 0.13 |  |
| 108 | Nasus | -0.03 | 0.27 | 0.30 |  |
| 109 | Shyvana | -0.04 | 0.09 | 0.13 |  |
| 110 | Illaoi | -0.06 | 0.09 | 0.15 |  |
| 111 | Sett | -0.06 | 0.09 | 0.15 |  |
| 112 | Sylas | -0.06 | 0.00 | 0.06 |  |
| 113 | Briar | -0.08 | 0.00 | 0.08 |  |
| 114 | Rell | -0.08 | 0.00 | 0.08 |  |
| 115 | Bel'Veth | -0.09 | 0.00 | 0.09 |  |
| 116 | Ambessa | -0.10 | 0.00 | 0.10 |  |
| 117 | Ekko | -0.10 | 0.00 | 0.10 |  |
| 118 | Irelia | -0.10 | 0.00 | 0.10 |  |
| 119 | Lee Sin | -0.10 | 0.00 | 0.10 |  |
| 120 | Riven | -0.10 | 0.00 | 0.10 |  |
| 121 | Ivern | -0.12 | 0.07 | 0.19 |  |
| 122 | Aatrox | -0.12 | 0.00 | 0.12 |  |
| 123 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 124 | Tryndamere | -0.12 | 0.00 | 0.12 |  |
| 125 | Diana | -0.13 | 0.00 | 0.13 |  |
| 126 | Kassadin | -0.13 | 0.00 | 0.13 |  |
| 127 | Sejuani | -0.13 | 0.00 | 0.13 |  |
| 128 | Quinn | -0.14 | 0.17 | 0.31 |  |
| 129 | Skarner | -0.14 | 0.13 | 0.27 |  |
| 130 | Warwick | -0.15 | 1.17 | 1.32 |  |
| 131 | Leona | -0.15 | 0.00 | 0.15 |  |
| 132 | Locke | -0.15 | 0.00 | 0.15 |  |
| 133 | Renekton | -0.15 | 0.00 | 0.15 |  |
| 134 | Akali | -0.21 | 0.00 | 0.21 |  |
| 135 | Darius | -0.23 | 0.00 | 0.23 |  |
| 136 | Trundle | -0.23 | 0.00 | 0.23 |  |
| 137 | Yorick | -0.23 | 0.00 | 0.23 |  |
| 138 | Talon | -0.24 | 0.00 | 0.24 |  |
| 139 | Rammus | -0.27 | 0.27 | 0.54 |  |
| 140 | Qiyana | -0.27 | 0.00 | 0.27 |  |
| 141 | Taric | -0.27 | 0.00 | 0.27 |  |
| 142 | Wukong | -0.28 | 0.00 | 0.28 |  |
| 143 | Caitlyn | -0.29 | 0.27 | 0.56 |  |
| 144 | Blitzcrank | -0.30 | 0.00 | 0.30 |  |
| 145 | Cho'Gath | -0.30 | 0.00 | 0.30 |  |
| 146 | Dr. Mundo | -0.30 | 0.00 | 0.30 |  |
| 147 | Rumble | -0.30 | 0.00 | 0.30 |  |
| 148 | Zac | -0.32 | 0.43 | 0.75 | dash stop (Stretching Strikes) |
| 149 | Viego | -0.33 | 0.09 | 0.42 |  |
| 150 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 151 | Pyke | -0.37 | 0.00 | 0.37 |  |
| 152 | Gragas | -0.39 | 0.00 | 0.39 |  |
| 153 | Miss Fortune | -0.40 | 0.16 | 0.56 |  |
| 154 | Lucian | -0.42 | 0.14 | 0.56 |  |
| 155 | Jhin | -0.43 | 0.13 | 0.56 |  |
| 156 | Vel'Koz | -0.44 | 0.12 | 0.56 |  |
| 157 | Pantheon | -0.46 | 0.59 | 1.05 |  |
| 158 | Akshan | -0.49 | 0.14 | 0.63 |  |
| 159 | Xerath | -0.50 | 0.12 | 0.62 |  |
| 160 | Karthus | -0.50 | 0.06 | 0.56 |  |
| 161 | Twisted Fate | -0.51 | 0.19 | 0.70 |  |
| 162 | Vi | -0.57 | 0.09 | 0.66 |  |
| 163 | Ryze | -0.58 | 0.12 | 0.70 |  |
| 164 | Shen | -0.62 | 0.38 | 1.00 |  |
| 165 | Janna | -0.62 | 0.18 | 0.80 |  |
| 166 | Katarina | -0.65 | 0.00 | 0.65 |  |
| 167 | Fiddlesticks | -0.77 | 0.07 | 0.84 |  |
| 168 | Taliyah | -0.84 | 0.12 | 0.96 |  |
| 169 | Nunu & Willump | -0.88 | 0.28 | 1.16 |  |
| 170 | Tahm Kench | -0.89 | 0.00 | 0.89 |  |
| 171 | Naafiri | -0.98 | 0.00 | 0.98 |  |
| 172 | Galio | -1.22 | 0.00 | 1.22 |  |
