const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const filePath = path.join(rootDir, "data", "products.json");

const readProductsFromFile = (callback) => {
  fs.readFile(filePath, (error, file) => {
    if (error) {
      return callback([]);
    }
    callback(JSON.parse(file));
  });
};

module.exports = class Product {
  constructor(title, description, imageUrl, price) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
    this.id = Date.now();

    readProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (error) => {
        if (error) {
          console.error(error);
        }
      });
    });
  }

  static fetchAll(callback) {
    readProductsFromFile(callback);
  }

  static findById(id, callback) {
    readProductsFromFile(products => {
      const product = products.find(({ id: productId }) => id == productId) || {};
      callback(product);
    });
  }
};
