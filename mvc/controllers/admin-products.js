const Product = require("../models/product");

exports.getAddedProduct = (req, res, next) => {
  res.render("admin/add-product", {
    title: "Add Product",
    path: "/admin/add-product",
  });
};

exports.addNewProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();

  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    title: "Manage Product",
    path: "/admin/product-list",
  });
};
