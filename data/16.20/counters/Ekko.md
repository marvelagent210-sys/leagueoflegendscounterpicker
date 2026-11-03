# Counters to Ekko (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Ekko: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Ekko wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Ekko --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Yorick | +0.87 | +1.00 | +1.00 | +1.00 | +0.21 | – | +1.00 |
| 2 | Master Yi | +0.87 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +1.00 |
| 3 | Nasus | +0.86 | +1.00 | +1.00 | +1.00 | +0.16 | – | +1.00 |
| 4 | Rengar | +0.85 | +1.00 | +1.00 | +1.00 | +0.43 | – | +0.00 |
| 5 | Kog'Maw | +0.85 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | +0.00 |
| 6 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.08 | – | +1.00 |
| 7 | Nilah | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 8 | Smolder | +0.84 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | +0.00 |
| 9 | Ashe | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 10 | Ambessa | +0.84 | +1.00 | +1.00 | +1.00 | +0.36 | – | +0.00 |
| 11 | Kayle | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 12 | Heimerdinger | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 13 | Gwen | +0.83 | +1.00 | +1.00 | +1.00 | +0.34 | – | +0.00 |
| 14 | Corki | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 15 | Neeko | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 16 | Quinn | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 17 | Urgot | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 18 | Kalista | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 19 | Rell | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 20 | Jayce | +0.83 | +1.00 | +1.00 | +1.00 | +0.28 | – | +0.00 |
| 21 | Aurora | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 22 | Annie | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 23 | Orianna | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 24 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 25 | Aphelios | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 26 | Lulu | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 27 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.25 | – | +0.00 |
| 28 | Gnar | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 29 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 30 | Kennen | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 31 | Graves | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 32 | Lucian | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 33 | Twisted Fate | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 34 | Bard | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 35 | Samira | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 36 | Tahm Kench | +0.81 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.00 |
| 37 | Jarvan IV | +0.81 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.00 |
| 38 | Rakan | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 39 | Karma | +0.81 | +0.99 | +1.00 | +1.00 | +0.11 | +0.99 | +0.00 |
| 40 | Aatrox | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.00 |
| 41 | Shyvana | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.00 |
| 42 | Zilean | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 43 | Cho'Gath | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 44 | Jhin | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 45 | Ivern | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 46 | Azir | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 47 | Ornn | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 48 | Zeri | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 49 | Yone | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.00 |
| 50 | Varus | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 51 | Irelia | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 52 | Ezreal | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 53 | Shen | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 54 | Lee Sin | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 55 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 56 | Zac | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 57 | Bel'Veth | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 58 | Olaf | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 59 | Mordekaiser | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 60 | Illaoi | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 61 | Gangplank | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 62 | Sylas | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 63 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 64 | Kassadin | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 65 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 66 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 67 | Jinx | +0.80 | +1.00 | +0.90 | +0.99 | +0.17 | +1.00 | +0.00 |
| 68 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 69 | Volibear | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 70 | Xin Zhao | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 71 | Diana | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 72 | Vi | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 73 | Skarner | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 74 | Viego | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 75 | Galio | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 76 | Sett | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 77 | Rek'Sai | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 78 | Sion | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 79 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 80 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 81 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 82 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 83 | Pantheon | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 84 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 85 | Fizz | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 86 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 87 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 88 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 89 | Warwick | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 90 | Kayn | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 91 | Alistar | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 92 | Braum | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 93 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 94 | Wukong | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 95 | Maokai | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 96 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 97 | Udyr | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 98 | Rammus | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 99 | Singed | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 100 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 101 | Sejuani | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 102 | Leona | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 103 | Shaco | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 104 | Gragas | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 105 | Lillia | +0.78 | +1.00 | +0.88 | +0.92 | +0.16 | +0.99 | +0.00 |
| 106 | Rumble | +0.73 | +1.00 | +0.75 | +1.00 | +0.12 | – | +0.00 |
| 107 | Morgana | +0.73 | +0.93 | +0.95 | +0.95 | +0.13 | +0.50 | +0.00 |
| 108 | Swain | +0.70 | +0.67 | +1.00 | +1.00 | +0.07 | +0.67 | +0.00 |
| 109 | Mel | +0.69 | +0.99 | +1.00 | +0.61 | +0.15 | +0.52 | +0.00 |
| 110 | Milio | +0.69 | +1.00 | +0.66 | +0.68 | +0.27 | +0.98 | +0.00 |
| 111 | Elise | +0.67 | +1.00 | +1.00 | +1.00 | +0.12 | −0.52 | +0.00 |
| 112 | Kai'Sa | +0.62 | +1.00 | +1.00 | +1.00 | +0.13 | −1.00 | +0.00 |
| 113 | Syndra | +0.62 | +0.24 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 114 | Brand | +0.58 | +0.17 | +0.97 | +0.93 | +0.04 | +0.99 | +0.00 |
| 115 | Lux | +0.48 | +0.81 | +0.77 | −0.18 | +0.12 | +1.00 | +0.00 |
| 116 | Janna | +0.43 | +1.00 | +1.00 | −1.00 | +0.17 | +1.00 | +0.00 |
| 117 | Xayah | +0.33 | +1.00 | −1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 118 | Draven | +0.32 | +1.00 | −1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 119 | Sivir | +0.31 | +1.00 | −1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 120 | Briar | +0.28 | +0.97 | −0.68 | +1.00 | −0.16 | – | +0.00 |
| 121 | Zoe | +0.25 | +0.90 | −0.98 | +0.84 | +0.10 | +0.90 | +0.00 |
| 122 | Yunara | +0.25 | +1.00 | −1.00 | +0.57 | +0.22 | +1.00 | +0.00 |
| 123 | Viktor | +0.24 | +0.27 | +0.14 | +0.13 | +0.04 | +1.00 | +0.00 |
| 124 | Ziggs | +0.23 | +1.00 | −1.00 | +1.00 | +0.18 | +0.01 | +0.00 |
| 125 | Zed | +0.23 | −1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 126 | Amumu | +0.22 | +1.00 | −1.00 | +0.95 | +0.02 | – | +0.00 |
| 127 | Hwei | +0.17 | +0.19 | +0.04 | +0.15 | +0.11 | +0.71 | +0.00 |
| 128 | Zyra | +0.11 | +0.25 | +0.05 | +0.06 | +0.07 | +0.15 | +0.00 |
| 129 | Sona | +0.10 | +0.11 | +1.00 | −1.00 | +0.05 | +0.14 | +0.00 |
| 130 | Ahri | +0.08 | +0.07 | +0.10 | +0.08 | +0.09 | +0.08 | +0.00 |
| 131 | Anivia | +0.07 | +0.13 | +0.07 | −0.02 | −0.00 | +0.21 | +0.00 |
| 132 | Soraka | +0.04 | +0.18 | −0.10 | +0.05 | +0.08 | +0.03 | +0.00 |
| 133 | Nami | +0.04 | +0.20 | −0.42 | +0.26 | +0.06 | +0.33 | +0.00 |
| 134 | Ryze | −0.07 | +1.00 | −1.00 | −1.00 | +0.20 | +1.00 | +0.00 |
| 135 | Miss Fortune | −0.08 | +1.00 | −1.00 | −1.00 | +0.14 | +1.00 | +0.00 |
| 136 | Twitch | −0.09 | +1.00 | −1.00 | −1.00 | +0.10 | +1.00 | +0.00 |
| 137 | Akshan | −0.09 | +1.00 | −1.00 | −1.00 | +0.09 | +1.00 | +0.00 |
| 138 | Nautilus | −0.09 | +1.00 | −0.98 | −0.03 | +0.10 | −1.00 | +0.00 |
| 139 | Kindred | −0.09 | +1.00 | −1.00 | −1.00 | +0.09 | +1.00 | +0.00 |
| 140 | Lissandra | −0.10 | −0.04 | −0.47 | −0.03 | +0.09 | +0.17 | +0.00 |
| 141 | Karthus | −0.13 | −0.12 | −0.23 | −0.21 | +0.16 | −0.22 | +0.00 |
| 142 | Aurelion Sol | −0.14 | +1.00 | −1.00 | −1.00 | +0.41 | +0.03 | +0.00 |
| 143 | Nidalee | −0.14 | +1.00 | −1.00 | −1.00 | +0.01 | +0.62 | +0.00 |
| 144 | Veigar | −0.16 | +0.08 | +0.02 | −1.00 | +0.02 | +0.09 | +0.00 |
| 145 | Akali | −0.19 | −0.89 | +0.10 | +0.05 | +0.09 | – | +0.00 |
| 146 | Hecarim | −0.20 | +1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 147 | Naafiri | −0.21 | +1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 148 | Locke | −0.22 | +1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 149 | Caitlyn | −0.26 | +0.99 | −1.00 | −1.00 | +0.02 | −0.56 | +0.00 |
| 150 | Seraphine | −0.28 | +0.24 | −1.00 | −1.00 | +0.09 | +1.00 | +0.00 |
| 151 | Fiddlesticks | −0.29 | +1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 152 | Senna | −0.34 | +0.28 | −1.00 | −1.00 | +0.04 | +0.33 | +0.00 |
| 153 | Vel'Koz | −0.39 | +0.04 | −1.00 | −1.00 | +0.22 | +0.15 | +0.00 |
| 154 | Renata Glasc | −0.40 | +0.03 | −1.00 | −1.00 | +0.12 | +0.21 | +0.00 |
| 155 | LeBlanc | −0.41 | −1.00 | −0.55 | −0.14 | +0.00 | +0.03 | +0.00 |
| 156 | Malzahar | −0.42 | +0.09 | −1.00 | −1.00 | +0.03 | −0.01 | +0.00 |
| 157 | Cassiopeia | −0.52 | +0.01 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 158 | Blitzcrank | −0.57 | −0.13 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 159 | Tristana | −0.59 | −1.00 | −1.00 | −1.00 | +0.05 | +1.00 | +0.00 |
| 160 | Xerath | −0.61 | −0.28 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 161 | Vex | −0.71 | −0.72 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 162 | Nunu & Willump | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 163 | Qiyana | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 164 | Kha'Zix | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 165 | Talon | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 166 | Katarina | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 167 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 168 | Yuumi | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 169 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 170 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 171 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 172 | Pyke | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Ekko's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ekko's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ekko` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.56)

- **0.90** spell shield: Spell Shield's spell shield blocks Ekko's Chronobreak. Spell shield for 1.5 s, long enough to use ahead of Chronobreak. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ekko R Chronobreak)
- **0.51** spell shield: Spell Shield's spell shield blocks Ekko's Phase Dive. Spell shield for 1.5 s, long enough to use ahead of Phase Dive. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ekko E Phase Dive)
- **0.39** spell shield: Spell Shield's spell shield blocks Ekko's Parallel Convergence. Spell shield for 1.5 s, long enough to use ahead of Parallel Convergence. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ekko W Parallel Convergence)

#### 2. Yuumi (net +1.46)

- **0.90** untargetable: You and Me! makes Yuumi untargetable, dodging Ekko's Chronobreak. Untargetable for ?; Chronobreak takes 0.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ekko R Chronobreak)
- **0.48** untargetable: You and Me! makes Yuumi untargetable, dodging Ekko's Phase Dive. Untargetable for ?; Phase Dive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ekko E Phase Dive)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Ekko's Parallel Convergence. Untargetable for ?; Parallel Convergence takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ekko W Parallel Convergence)

#### 3. Vladimir (net +1.39)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ekko's Chronobreak. Untargetable for 2 s, long enough to use ahead of Chronobreak. (Vladimir W Sanguine Pool → Ekko R Chronobreak)
- **0.53** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ekko's Phase Dive. Untargetable for 2 s, long enough to use ahead of Phase Dive. (Vladimir W Sanguine Pool → Ekko E Phase Dive)
- **0.42** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ekko's Parallel Convergence. Untargetable for 2 s, long enough to use ahead of Parallel Convergence. (Vladimir W Sanguine Pool → Ekko W Parallel Convergence)

#### 4. Nocturne (net +1.31)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Ekko's Chronobreak. Spell shield for 1.5 s, long enough to use ahead of Chronobreak. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ekko R Chronobreak)
- **0.60** spell shield: Shroud of Darkness's spell shield blocks Ekko's Phase Dive. Spell shield for 1.5 s, long enough to use ahead of Phase Dive. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ekko E Phase Dive)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Ekko's Parallel Convergence. Spell shield for 1.5 s, long enough to use ahead of Parallel Convergence. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ekko W Parallel Convergence)

#### 5. Master Yi (net +1.26)

- **0.90** untargetable: Alpha Strike makes Master Yi untargetable, dodging Ekko's Chronobreak. Untargetable for ?; Chronobreak takes 0.5 s to land, enough to react. (Master Yi Q Alpha Strike → Ekko R Chronobreak)
- **0.39** untargetable: Alpha Strike makes Master Yi untargetable, dodging Ekko's Parallel Convergence. Untargetable for ?; Parallel Convergence takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Ekko W Parallel Convergence)
- **0.30** untargetable: Alpha Strike makes Master Yi untargetable, dodging Ekko's Phase Dive. Untargetable for ?; Phase Dive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Ekko E Phase Dive)

#### 6. Fiora (net +1.25)

- **0.90** parry: Riposte parries Ekko's Chronobreak. Parry for 0.75 s; Chronobreak takes 0.5 s to land, enough to react. (Fiora W Riposte → Ekko R Chronobreak)
- **0.52** parry: Riposte parries Ekko's Parallel Convergence and stuns back. Parry for 0.75 s; Parallel Convergence takes 0.25 s to land, enough to react. Negating Parallel Convergence's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ekko W Parallel Convergence)
- **0.32** parry: Riposte parries Ekko's Phase Dive. Parry for 0.75 s; Phase Dive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Ekko E Phase Dive)

#### 7. Fizz (net +1.24)

- **0.90** untargetable: Playful makes Fizz untargetable, dodging Ekko's Chronobreak. Untargetable for 0.75 s; Chronobreak takes 0.5 s to land, enough to react. (Fizz E Playful → Ekko R Chronobreak)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Ekko's Parallel Convergence. Untargetable for 0.75 s; Parallel Convergence takes 0.25 s to land, enough to react. (Fizz E Playful → Ekko W Parallel Convergence)
- **0.44** untargetable: Playful makes Fizz untargetable, dodging Ekko's Phase Dive. Untargetable for 0.75 s; Phase Dive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Ekko E Phase Dive)

#### 8. Maokai (net +1.22)

- **0.90** untargetable: Twisted Advance makes Maokai untargetable, dodging Ekko's Chronobreak. Untargetable for 1.4 s; Chronobreak takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Ekko R Chronobreak)
- **0.45** untargetable: Twisted Advance makes Maokai untargetable, dodging Ekko's Parallel Convergence. Untargetable for 1.4 s; Parallel Convergence takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Ekko W Parallel Convergence)
- **0.39** untargetable: Twisted Advance makes Maokai untargetable, dodging Ekko's Phase Dive. Untargetable for 1.4 s; Phase Dive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Ekko E Phase Dive)

#### 9. Pantheon (net +1.21)

- **0.90** invulnerable: Aegis Assault makes Pantheon invulnerable to Ekko's Chronobreak. Invulnerable for 1.5 s, long enough to use ahead of Chronobreak. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Ekko R Chronobreak)
- **0.51** invulnerable: Aegis Assault makes Pantheon invulnerable to Ekko's Phase Dive. Invulnerable for 1.5 s, long enough to use ahead of Phase Dive. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Ekko E Phase Dive)
- **0.20** invulnerable: Aegis Assault makes Pantheon invulnerable to Ekko's Parallel Convergence (its crowd control still applies). Invulnerable for 1.5 s, long enough to use ahead of Parallel Convergence. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Ekko W Parallel Convergence)

#### 10. Bard (net +1.18)

- **0.70** untargetable: Tempered Fate makes Bard untargetable, dodging Ekko's Chronobreak. Untargetable for 2.5 s, long enough to use ahead of Chronobreak. (Bard R Tempered Fate → Ekko R Chronobreak)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Ekko's Phase Dive. Untargetable for 2.5 s, long enough to use ahead of Phase Dive. (Bard R Tempered Fate → Ekko E Phase Dive)
- **0.24** range: Bard's basic attacks reach 375 units farther than Ekko's (500 vs 125 attack range). Ekko closes the gap with Chronobreak, Phase Dive. (Bard basic attacks → Ekko basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.56 | 1.56 | 0.00 |  |
| 2 | Yuumi | +1.46 | 1.46 | 0.00 |  |
| 3 | Vladimir | +1.39 | 1.39 | 0.00 |  |
| 4 | Nocturne | +1.31 | 1.31 | 0.00 |  |
| 5 | Master Yi | +1.26 | 1.26 | 0.00 |  |
| 6 | Fiora | +1.25 | 1.25 | 0.00 |  |
| 7 | Fizz | +1.24 | 1.24 | 0.00 |  |
| 8 | Maokai | +1.22 | 1.22 | 0.00 |  |
| 9 | Pantheon | +1.21 | 1.21 | 0.00 |  |
| 10 | Bard | +1.18 | 1.18 | 0.00 |  |
| 11 | Singed | +1.18 | 1.18 | 0.00 | grounding (Mega Adhesive) |
| 12 | Gwen | +1.17 | 1.17 | 0.00 |  |
| 13 | Kayle | +1.15 | 1.15 | 0.00 |  |
| 14 | Xayah | +1.12 | 1.12 | 0.00 |  |
| 15 | Lissandra | +1.11 | 1.11 | 0.00 |  |
| 16 | Aurora | +0.98 | 0.98 | 0.00 |  |
| 17 | Teemo | +0.97 | 0.97 | 0.00 | blind (Blinding Dart), blind (Blinding Dart) |
| 18 | Rek'Sai | +0.94 | 0.94 | 0.00 |  |
| 19 | Evelynn | +0.87 | 0.87 | 0.00 |  |
| 20 | Jax | +0.87 | 0.87 | 0.00 | attack dodge (Counter Strike) |
| 21 | Kayn | +0.87 | 0.87 | 0.00 |  |
| 22 | Shaco | +0.87 | 0.87 | 0.00 |  |
| 23 | Shen | +0.83 | 0.83 | 0.00 | attack block (Spirit's Refuge) |
| 24 | Xin Zhao | +0.83 | 0.83 | 0.00 |  |
| 25 | Camille | +0.82 | 0.82 | 0.00 |  |
| 26 | Zed | +0.79 | 0.79 | 0.00 |  |
| 27 | Cassiopeia | +0.77 | 0.77 | 0.00 | grounding (Miasma) |
| 28 | Nilah | +0.70 | 0.70 | 0.00 | attack dodge (Jubilant Veil) |
| 29 | Morgana | +0.59 | 0.59 | 0.00 |  |
| 30 | Malzahar | +0.58 | 0.58 | 0.00 |  |
| 31 | Poppy | +0.57 | 0.57 | 0.00 | dash stop (Steadfast Presence) |
| 32 | Lulu | +0.54 | 0.54 | 0.00 |  |
| 33 | Varus | +0.54 | 0.54 | 0.00 |  |
| 34 | Jinx | +0.52 | 0.52 | 0.00 |  |
| 35 | Udyr | +0.51 | 0.51 | 0.00 |  |
| 36 | Viktor | +0.51 | 0.51 | 0.00 |  |
| 37 | Milio | +0.50 | 0.50 | 0.00 |  |
| 38 | Hwei | +0.48 | 0.48 | 0.00 |  |
| 39 | Samira | +0.47 | 0.47 | 0.00 |  |
| 40 | Ahri | +0.45 | 0.45 | 0.00 |  |
| 41 | Vex | +0.45 | 0.45 | 0.00 |  |
| 42 | Veigar | +0.44 | 0.44 | 0.00 |  |
| 43 | Mel | +0.43 | 0.43 | 0.00 |  |
| 44 | Braum | +0.42 | 0.42 | 0.00 | projectile block (Unbreakable) |
| 45 | Kalista | +0.41 | 0.41 | 0.00 |  |
| 46 | Rengar | +0.40 | 0.40 | 0.00 |  |
| 47 | Gangplank | +0.39 | 0.39 | 0.00 |  |
| 48 | Zac | +0.37 | 0.37 | 0.00 |  |
| 49 | Katarina | +0.36 | 0.36 | 0.00 |  |
| 50 | Aphelios | +0.34 | 0.34 | 0.00 |  |
| 51 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 52 | Warwick | +0.33 | 0.33 | 0.00 |  |
| 53 | Kled | +0.32 | 0.32 | 0.00 |  |
| 54 | Rammus | +0.32 | 0.32 | 0.00 |  |
| 55 | Kindred | +0.31 | 0.31 | 0.00 |  |
| 56 | Twisted Fate | +0.29 | 0.29 | 0.00 |  |
| 57 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 58 | Vayne | +0.29 | 0.29 | 0.00 |  |
| 59 | Yasuo | +0.29 | 0.29 | 0.00 |  |
| 60 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 61 | Garen | +0.27 | 0.27 | 0.00 |  |
| 62 | Sion | +0.27 | 0.27 | 0.00 |  |
| 63 | Sona | +0.27 | 0.27 | 0.00 |  |
| 64 | Kai'Sa | +0.26 | 0.26 | 0.00 |  |
| 65 | Olaf | +0.26 | 0.26 | 0.00 |  |
| 66 | Quinn | +0.26 | 0.26 | 0.00 |  |
| 67 | Renata Glasc | +0.26 | 0.26 | 0.00 |  |
| 68 | Zaahen | +0.26 | 0.26 | 0.00 |  |
| 69 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 70 | Caitlyn | +0.24 | 0.24 | 0.00 |  |
| 71 | Draven | +0.24 | 0.24 | 0.00 |  |
| 72 | Janna | +0.24 | 0.24 | 0.00 |  |
| 73 | Lucian | +0.24 | 0.24 | 0.00 |  |
| 74 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 75 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 76 | Akshan | +0.22 | 0.22 | 0.00 |  |
| 77 | Corki | +0.22 | 0.22 | 0.00 |  |
| 78 | Elise | +0.22 | 0.22 | 0.00 |  |
| 79 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 80 | Gnar | +0.22 | 0.22 | 0.00 |  |
| 81 | Miss Fortune | +0.22 | 0.22 | 0.00 |  |
| 82 | Senna | +0.22 | 0.22 | 0.00 |  |
| 83 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 84 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 85 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 86 | Heimerdinger | +0.21 | 0.21 | 0.00 |  |
| 87 | Malphite | +0.21 | 0.21 | 0.00 |  |
| 88 | Alistar | +0.20 | 0.20 | 0.00 |  |
| 89 | Jayce | +0.20 | 0.20 | 0.00 |  |
| 90 | Nidalee | +0.20 | 0.20 | 0.00 |  |
| 91 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 92 | Lux | +0.19 | 0.19 | 0.00 |  |
| 93 | Seraphine | +0.19 | 0.19 | 0.00 |  |
| 94 | Amumu | +0.18 | 0.18 | 0.00 |  |
| 95 | Azir | +0.18 | 0.18 | 0.00 |  |
| 96 | Jhin | +0.18 | 0.18 | 0.00 |  |
| 97 | Kog'Maw | +0.18 | 0.18 | 0.00 |  |
| 98 | Orianna | +0.18 | 0.18 | 0.00 |  |
| 99 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 100 | Taliyah | +0.18 | 0.18 | 0.00 |  |
| 101 | Vel'Koz | +0.18 | 0.18 | 0.00 |  |
| 102 | Xerath | +0.18 | 0.18 | 0.00 |  |
| 103 | Yone | +0.18 | 0.18 | 0.00 |  |
| 104 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 105 | Nunu & Willump | +0.17 | 0.17 | 0.00 |  |
| 106 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 107 | Graves | +0.16 | 0.16 | 0.00 |  |
| 108 | Ryze | +0.16 | 0.16 | 0.00 |  |
| 109 | Zyra | +0.16 | 0.16 | 0.00 |  |
| 110 | Annie | +0.15 | 0.15 | 0.00 |  |
| 111 | Aurelion Sol | +0.15 | 0.15 | 0.00 |  |
| 112 | Brand | +0.15 | 0.15 | 0.00 |  |
| 113 | Karma | +0.15 | 0.15 | 0.00 |  |
| 114 | LeBlanc | +0.15 | 0.15 | 0.00 |  |
| 115 | Nami | +0.15 | 0.15 | 0.00 |  |
| 116 | Neeko | +0.15 | 0.15 | 0.00 |  |
| 117 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 118 | Swain | +0.14 | 0.14 | 0.00 |  |
| 119 | Fiddlesticks | +0.13 | 0.13 | 0.00 |  |
| 120 | Ivern | +0.13 | 0.13 | 0.00 |  |
| 121 | Karthus | +0.13 | 0.13 | 0.00 |  |
| 122 | Thresh | +0.13 | 0.13 | 0.00 |  |
| 123 | Urgot | +0.10 | 0.10 | 0.00 |  |
| 124 | Skarner | +0.09 | 0.09 | 0.00 |  |
| 125 | Mordekaiser | +0.08 | 0.08 | 0.00 |  |
| 126 | Rakan | +0.08 | 0.08 | 0.00 |  |
| 127 | Lillia | +0.07 | 0.07 | 0.00 |  |
| 128 | Viego | +0.06 | 0.06 | 0.00 |  |
| 129 | Irelia | +0.03 | 0.03 | 0.00 |  |
| 130 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 131 | Akali | 0.00 | 0.00 | 0.00 |  |
| 132 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 133 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 134 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 135 | Briar | 0.00 | 0.00 | 0.00 |  |
| 136 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 137 | Darius | 0.00 | 0.00 | 0.00 |  |
| 138 | Diana | 0.00 | 0.00 | 0.00 |  |
| 139 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 140 | Galio | 0.00 | 0.00 | 0.00 |  |
| 141 | Gragas | 0.00 | 0.00 | 0.00 |  |
| 142 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 143 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 144 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 145 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 146 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 147 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 148 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 149 | Leona | 0.00 | 0.00 | 0.00 |  |
| 150 | Locke | 0.00 | 0.00 | 0.00 |  |
| 151 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 152 | Naafiri | 0.00 | 0.00 | 0.00 |  |
| 153 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 154 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 155 | Pyke | 0.00 | 0.00 | 0.00 |  |
| 156 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 157 | Rell | 0.00 | 0.00 | 0.00 |  |
| 158 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 159 | Riven | 0.00 | 0.00 | 0.00 |  |
| 160 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 161 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 162 | Sett | 0.00 | 0.00 | 0.00 |  |
| 163 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 164 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 165 | Tahm Kench | 0.00 | 0.00 | 0.00 |  |
| 166 | Talon | 0.00 | 0.00 | 0.00 |  |
| 167 | Taric | 0.00 | 0.00 | 0.00 |  |
| 168 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 169 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 170 | Vi | 0.00 | 0.00 | 0.00 |  |
| 171 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 172 | Yorick | 0.00 | 0.00 | 0.00 |  |
