const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const filePath = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    fs.readFile(filePath, (error, file) => {
      let products = [];
      if (!error) {
        products = JSON.parse(file);
      }
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (error) => {
        if (error) {
          console.log(error);
        }
      });
    });
  }

  static getAll(callback) {
    fs.readFile(filePath, (error, file) => {
      if (error) {
        return callback([]);
      }
      callback(JSON.parse(file));
    });
  }
};
