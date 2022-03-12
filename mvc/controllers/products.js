const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.getAll((products) =>
    res.render("shop/product-list", { products, title: "Shop", path: "/" })
  );
};

exports.getCart = (req, res, next) => {
  Product.getAll((products) =>
    res.render("shop/cart", { products, title: "Cart", path: "/cart" })
  );
};
