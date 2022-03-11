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
  constructor(title) {
    this.title = title;
  }

  save() {
    readProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (error) => {
        if (error) {
          console.log(error);
        }
      });
    });
  }

  static getAll(callback) {
    readProductsFromFile(callback);
  }
};
