const db = require('../../../05-mysql-deprecated/util/db');

db.execute('CREATE DATABASE IF NOT exists `learn-node`');
db.execute('USE `learn-node`');
db.execute(
  'CREATE TABLE IF NOT EXISTS `learn-node`.`products` (' + 
  '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, ' +
  '`title` VARCHAR(255) NOT NULL, ' +
  '`price` DOUBLE NOT NULL, ' +
  '`description` TEXT NOT NULL, ' +
  '`imageUrl` TEXT NOT NULL, , ' +
  'PRIMARY KEY(id), ' +
  'UNIQUE INDEX `ID_UNIQUE` (`id` ASC) VISIBLE)',
);


// INSERT INTO `learn-node`.`products` (`id`, `title`, `price`, `description`, `imageUrl`) VALUES ('1', 'A book', '12.99', 'My first book', 'https://pics.clipartpng.com/midle/Black_Book_PNG_Clipart-1048.png');
// INSERT INTO `learn-node`.`products` (`id`, `title`, `price`, `description`, `imageUrl`) VALUES ('2', 'Another book', '15.00', 'Another book', 'https://www.freeiconspng.com/uploads/book-png-14.png');
// INSERT INTO `learn-node`.`products` (`id`, `title`, `price`, `description`, `imageUrl`) VALUES ('3', 'Expencive book', '199.00', 'Really nice and expencive book', 'https://pics.clipartpng.com/midle/Brown_Book_PNG_Clipart-1051.png');

/* 
  CREATE TABLE IF NOT EXISTS `learn-node`.`products` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `price` DOUBLE NOT NULL,
    `description` TEXT NOT NULL,
    `imageUrl` TEXT NOT NULL,
    PRIMARY KEY(id),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
  );
*/
