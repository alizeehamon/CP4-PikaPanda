DROP DATABASE IF EXISTS `pikapanda`;

CREATE DATABASE `pikapanda`
    DEFAULT CHARACTER SET = 'utf8';

USE `pikapanda`;

CREATE TABLE `panda` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL ,
  `birth_date` DATE,
  `gender` VARCHAR (1) NOT NULL,
  `id_zoo` int NOT NULL,
  `description` VARCHAR(1000),
  `available` BIGINT DEFAULT 1,
  `image` varchar(255) DEFAULT ""
) DEFAULT CHARACTER SET = 'utf8';

CREATE TABLE `zoo` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `city`varchar(255) NOT NULL
) DEFAULT CHARACTER SET = 'utf8';


ALTER TABLE `panda` ADD FOREIGN KEY (`id_zoo`) REFERENCES `zoo` (`id`);

CREATE TABLE `ascendance` (
  `id_child` int PRIMARY KEY NOT NULL,
  `id_mother` int,
  `id_father` int
) DEFAULT CHARACTER SET = 'utf8';


ALTER TABLE `ascendance` ADD FOREIGN KEY (`id_mother`) REFERENCES `panda` (`id`);
ALTER TABLE `ascendance` ADD FOREIGN KEY (`id_father`) REFERENCES `panda` (`id`);

INSERT INTO `zoo` (name, city) VALUES ('Beauval', 'Saint-Aignan'),('La Boissière du doré', 'La Boissière du doré'), ('Branféré', 'Le Guerno'), ('Ménagerie du Jardin des Plantes', 'Paris'), ('Zoo d\'Amnéville', 'Amnéville'), ('Zoo de la Flèche', 'La Flèche');


INSERT INTO `panda` (name, birth_date, gender, id_zoo, description, image) VALUES
  ("Rookie",'2012-01-01','M',1,'Tout roux tout doux', "https://images.pexels.com/photos/2265247/pexels-photo-2265247.jpeg"),
  ("Noumea",'2017-03-01','F',1,'Très craintive mais mignonne', "https://images.pexels.com/photos/1217595/pexels-photo-1217595.jpeg"),
  ("Remi",'2020-02-20','M',2,'Frise quand les poils sont longs', "https://images.pexels.com/photos/2307365/pexels-photo-2307365.jpeg"),
	("Alizee",'2021-02-11','F',2,'Petite mais robuste', "https://images.pexels.com/photos/949563/pexels-photo-949563.jpeg"),
  ("Brownie",'2021-12-25','F',2,'Rusée quand elle a faim', "https://images.pexels.com/photos/2330055/pexels-photo-2330055.jpeg"),
	("Muffin",'2015-08-30','M',5,'Craquant et moelleux', "https://images.pexels.com/photos/2569229/pexels-photo-2569229.jpeg"),
  ("Pancake",'2010-06-10','M',5,'Un peu raplapla', "https://images.pexels.com/photos/7204616/pexels-photo-7204616.jpeg"),
  ("Reglisse",'2018-09-11','F',3,'Solitaire et casanière', "https://images.pexels.com/photos/7506259/pexels-photo-7506259.jpeg"),
  ("Caramel",'2018-09-11','F',3,'Peureuse mais joueuse', "https://images.pexels.com/photos/5472742/pexels-photo-5472742.jpeg"),
  ("Marshmallow",'2020-11-29','M',3,'Très gourmand', "https://images.pexels.com/photos/7173349/pexels-photo-7173349.jpeg"),
  ("Alienor",'2022-04-09','F',4,'Pleine de chaleur', "https://images.pexels.com/photos/146290/pexels-photo-146290.jpeg"),
  ("Bayek",'2014-07-17','M',6,'Plus grand prédateur de bambous', "https://images.pexels.com/photos/11777754/pexels-photo-11777754.jpeg"),
  ("Aya",'2013-05-17','F',6,'Adore les panoramas en haut des arbres', "https://images.pexels.com/photos/145970/pexels-photo-145970.jpeg"),
  ("Khemou",'2021-10-15','M',6,'Une petite truffe trop choupi', "https://images.pexels.com/photos/145994/pexels-photo-145994.jpeg"),
  ("Ayato",'2015-08-30','M',4,'Eclabousse partout', "https://images.pexels.com/photos/146102/pexels-photo-146102.jpeg");

  INSERT INTO `ascendance` (id_child, id_mother, id_father) VALUES
  (14, 13, 12),
  (15, NULL, 7),
  (6, NULL, 7),
  (5, 4, 3);