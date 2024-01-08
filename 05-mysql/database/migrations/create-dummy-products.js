module.exports = {
  async init(queryInterface, SQL) {
    queryInterface.createDatabase('learn-node');
  },
  async up(queryInterface, SQL) {
    await queryInterface.createTable('products');
  },
};
