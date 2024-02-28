const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const BasketItem = sequelize.define('basketItem', {
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

module.exports = BasketItem;

// module.exports = class Basket {
//   static addProduct(id) {
//     return sequelize(
//       'INSERT INTO `basket` (`product_id`, `quantity`) VALUES (?, ?)',
//       [id, quantity],
//     );
//   }

//   static delete(productId) {
//     return db.execute('DELETE FROM basket WHERE product_id=?', [productId]);
//   }

//   static getBasket() {
//     return db.execute(
//       'SELECT *, price * quantity AS total FROM basket LEFT JOIN products ON product_id = id',
//     );
//   }
// };
