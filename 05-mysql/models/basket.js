const path = require('path');
const rootDir = require('../util/path');
const db = require('../util/db');

module.exports = class Basket {
  static __basket = { products: [], totalPrice: 0 };
  static __increasePriceAndAmount(index) {
    ++this.__basket.products[index].amount;
    this.__basket.products[index].price *= this.__basket.products[index].amount;
  }

  static __addNewToBasket(id, productPrice) {
    this.__basket.products.push({ id, amount: 1, price: productPrice });
  }

  static __updateTotalPrice() {
    const total = this.__basket.products.reduce(
      (acc, cur) => acc + cur.price,
      0,
    );
    this.__basket.totalPrice = total;
  }

  static addProduct(id) {
    return db.execute(
      'INSERT INTO `basket` (`product_id`, `quantity`) VALUES (?, ?)',
      [id, quantity],
    );
  }

  static delete(productId) {
    return db.execute('DELETE FROM basket WHERE product_id=?', [productId]);
  }

  static getBasket() {
    return db.execute(
      'SELECT *, price * quantity AS total FROM basket LEFT JOIN products ON product_id = id',
    );
  }
};
