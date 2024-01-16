const db = require('../../util/db');

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
