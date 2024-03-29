const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const OrderItem = sequelize.define('orderItem', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderItem;
