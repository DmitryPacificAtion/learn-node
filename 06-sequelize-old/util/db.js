const Sequelize = require('sequelize');
const sequelize = new Sequelize('learn-node', 'root', 'Q!w2e3r4', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
