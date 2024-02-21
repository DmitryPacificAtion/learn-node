const db = require('../util/db');

module.exports = class Product {
  constructor(id, title, description, imageUrl, price, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title, description, imageUrl, price, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      [
        this.title,
        this.description,
        this.imageUrl,
        this.price,
        this.createdAt,
        this.updatedAt,
      ],
    );
  }

  update() {
    return db.execute(
      `UPDATE products SET title=?, description=?, imageUrl=?, price=?, updatedAt=? WHERE id=?`,
      [
        this.title,
        this.description,
        this.imageUrl,
        this.price,
        this.updatedAt,
        this.id,
      ],
    );
  }

  static delete(id) {
    return db.execute(
      'DELETE from products WHERE products.id = ?',
      [id],
      [this.id],
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};
