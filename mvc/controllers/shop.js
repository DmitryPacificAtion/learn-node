const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  res.render("shop/index", { title: "Shop", path: "/" })
};

exports.getProductList = (req, res, next) => {
  Product.getAll((products) =>
    res.render("shop/product-list", { products, title: "Product list", path: "/products" })
  );
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", { title: "Cart", path: "/cart" })
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { title: "Orders", path: "/orders" })
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
