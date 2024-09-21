const { getDB } = require('../util/db');

class Product {
  constructor(id, title, description, imageUrl, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
    const db = getDB();
    db.collection('products')
      .insertOne(this)
      .then((result) => console.log('save products', result))
      .catch((error) => console.error(error));
  }

  static delete(productId) {}

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
}

// Product.init({
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//   },
// });

module.exports = Product;
