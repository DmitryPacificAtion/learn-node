const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Product = sequelize.define(
  'product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    // For example title: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      default: '2024-01-01 00:00:00',
    },
    updatedAt: {
      type: DataTypes.DATE,
      default: '2024-01-01 00:00:00',
    },
  },
  { sequelize },
);

module.exports = Product;
