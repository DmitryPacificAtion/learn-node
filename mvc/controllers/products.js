const Product = require("../models/product");

exports.getAddedProduct = (req, res, next) => {
  res.render("add-product", {
    title: "Add Product",
    path: "/admin/add-product",
  });
};

exports.addNewProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.getAll((products) =>
    res.render("shop", { products, title: "Shop", path: "/" })
  );
};
