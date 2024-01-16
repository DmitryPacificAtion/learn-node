module.exports = {
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
  async init(queryInterface, SQL) {
    queryInterface.createDatabase('learn-node');
  },
  async up(queryInterface, SQL) {
    await queryInterface.createTable('products');
  },
};
