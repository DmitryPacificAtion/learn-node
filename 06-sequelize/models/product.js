const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../util/db');

// class Product extends Model {};

// Product.init({
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//   },
// });

const Product = sequelize.define(
  'product',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    // For example title: DataTypes.STRING,
    title: {
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
  },
  { sequelize },
);

module.exports = Product;
