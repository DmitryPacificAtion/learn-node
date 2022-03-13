const Basket = require("./basket");
const db = require("../util/db");

module.exports = class Product {
  constructor(id, title, description, imageUrl, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, description, imageUrl, price) VALUES (?, ?, ?, ?)",
      [this.title, this.description, this.imageUrl, this.price]
    );
  }

  static delete(productId) {}

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};
