const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Basket = sequelize.define('basket', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Basket;
