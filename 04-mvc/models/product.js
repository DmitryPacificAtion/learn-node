const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const Basket = require('./basket');
const filePath = path.join(rootDir, 'data', 'products.json');

const saveToFile = (products) => {
  fs.writeFile(filePath, JSON.stringify(products), (error) => {
    if (error) {
      console.error(error);
    }
  });
};

const readProductsFromFile = (callback) => {
  fs.readFile(filePath, (error, file) => {
    if (error) {
      return callback([]);
    }
    callback(JSON.parse(file));
  });
};

module.exports = class Product {
  constructor(id, title, description, imageUrl, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
    readProductsFromFile((products) => {
      if (this.id) {
        const index = products.findIndex(({ id }) => id === this.id);
        const updatedProds = [...products];
        updatedProds[index] = this;
        saveToFile(updatedProds);
      } else {
        this.id = +Date.now();
        products.push(this);
        saveToFile(products);
      }
    });
  }

  static delete(productId) {
    readProductsFromFile((products) => {
      // const { price } = products.find(({ id }) => id === productId)
      const updatedProds = products.filter(({ id }) => id !== productId);
      fs.writeFile(filePath, JSON.stringify(updatedProds), (error) => {
        if (!error) {
          Basket.delete(productId);
        }
      });
    });
  }

  static fetchAll(callback) {
    readProductsFromFile(callback);
  }

  static findById(id, callback) {
    readProductsFromFile((products) => {
      const product =
        products.find(({ id: productId }) => id == productId) || {};
      callback(product);
    });
  }
};
