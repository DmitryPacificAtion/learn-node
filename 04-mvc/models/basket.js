const { is } = require("express/lib/request");
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const filePath = path.join(rootDir, "data", "basket.json");

module.exports = class Basket {
  static addProduct(id, productPrice) {
    // Fetch previous data from basket
    fs.readFile(filePath, (error, file) => {
      let basket = { products: [], totalPrice: 0 };

      if (!error) {
        basket = JSON.parse(file);
      }

      // Analyze the basket and find existing products
      const existingProductsIndex = basket.products.findIndex(
        ({ id: productId }) => productId === id
      );

      const existingProducts = basket.products[existingProductsIndex];

      let updatedProducts;
      // Add new product / increase amount

      if (existingProducts) {
        updatedProducts = { ...existingProducts };
        updatedProducts.amount = updatedProducts.amount + 1;
        basket.products = [...basket.products];
        basket.products[existingProductsIndex] = updatedProducts;
      } else {
        updatedProducts = { id, amount: 1 };
        basket.products = [...basket.products, updatedProducts];
      }
      basket.totalPrice = basket.totalPrice + +productPrice;

      fs.writeFile(filePath, JSON.stringify(basket), (error) => {
        console.error(error);
      });
    });
  }
};
