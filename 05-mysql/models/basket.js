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
    const res = db
      .execute('SELECT * FROM basket WHERE product_id = VALUES(?)', 4)
      .then((res) => {
        console.log('in', res);
      })
      .catch((err) => console.error(err));
    return db.execute(
      'INSERT INTO `basket` (`product_id`, `quantity`) VALUES (?, ?)',
      [id, quantity],
    );
  }

  static delete(productId) {
    // fs.readFile(filePath, (error, file) => {
    //   if (error) {
    //     return;
    //   }
    //   const updatedCard = { ...JSON.parse(file) };
    //   const product = updatedCard.products.find(({ id }) => id == productId);
    //   if (!product) {
    //     return;
    //   }
    //   updatedCard.products = updatedCard.products.filter(
    //     ({ id }) => id !== productId,
    //   );
    //   updatedCard.totalPrice = updatedCard.totalPrice - product.price;
    //   saveToFile(updatedCard);
    //   // this.__updateTotalPrice();
    // });
  }

  static getBasket() {
    return db.execute(
      'SELECT *, price * quantity as total FROM basket left join products on product_id = id',
    );
  }
};
