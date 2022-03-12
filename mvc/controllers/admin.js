const Product = require("../models/product");

exports.getAddedProduct = (req, res, next) => {
  res.render("admin/add-product", {
    title: "Add Product",
    path: "/admin/add-product",
  });
};

exports.addNewProduct = (req, res, next) => {
  const { title, description, imageUrl, price } = req.body;
  const product = new Product(title, description, imageUrl, price);
  product.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) =>
    res.render("admin/product-list", { products, title: "Admin Products", path: "/admin/products" })
  );
};
