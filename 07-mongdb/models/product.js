const { getDB } = require('../util/db');

class Product {
  constructor(title, description, price, imageUrl) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDB();
    db.collection('products').insertOne(this);
  }
}

module.exports = Product;
