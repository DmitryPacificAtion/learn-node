const { is } = require("express/lib/request");
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const filePath = path.join(rootDir, "data", "basket.json");

module.exports = class Basket {
  static __basket = { products: [], totalPrice: 0 };

  static __increasePriceAndAmount(index) {
    ++this.__basket.products[index].amount;
    this.__basket.products[index].price *= this.__basket.products[index].amount;
  }

  static __addNewToBasket(id, productPrice) {
    this.__basket.products.push({id, amount: 1, price: productPrice});
  }

  static __increaseTotalPrice() {
    const total = this.__basket.products.reduce(
      (acc, cur) => acc + cur.price,
      0
    );
    this.__basket.totalPrice = total;
  }

  static addProduct(id, productPrice) {
    // Fetch previous data from basket
    fs.readFile(filePath, (error, file) => {
      if (!error) {
        try {
          this.__basket = JSON.parse(file);
        } catch {
          throw Error("Checkout existing basket.json. Delete it if it's empty");
        }
      }

      const index = this.__basket.products.findIndex(
        ({ id: productId }) => productId === id
      );
      const existingProducts = this.__basket.products[index];

      existingProducts
        ? this.__increasePriceAndAmount(index)
        : this.__addNewToBasket(id, productPrice);
      this.__increaseTotalPrice();

      fs.writeFile(filePath, JSON.stringify(this.__basket), (error) => {
        console.error(error);
      });
    });
  }
};