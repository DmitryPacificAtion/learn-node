const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  res.render("shop/index", { title: "Shop", path: "/" });
};

exports.getProductList = (req, res, next) => {
  Product.fetchAll((products) =>
    res.render("shop/product-list", {
      products,
      title: "Product list",
      path: "/products",
    })
  );
};

exports.getProductDetails = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(
    id,
    (product) => res.render("shop/product-details", { product, title: product.title, path: `/products/${product.id}` })
  );
};

exports.getCard = (req, res, next) => {
  res.render("shop/card", { title: "Card", path: "/card" });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { title: "Orders", path: "/orders" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
