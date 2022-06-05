CREATE TABLE `card` (
  `id` INTEGER PRIMARY KEY,
  `card1` varchar(100) NOT NULL,
  `card2` varchar(100) NOT NULL,
  `card3` varchar(100) NOT NULL,
  `card4` varchar(100) NOT NULL,
  `card5` varchar(100) NOT NULL,
  `card6` varchar(100) NOT NULL,
  `winner` varchar(100) NOT NULL,
  `datetime` datetime NOT NULL,
  UNIQUE (card1, card2, card3, card4, card5, card6, winner)
);