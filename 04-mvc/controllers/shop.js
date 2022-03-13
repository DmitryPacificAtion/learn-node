const Product = require("../models/product");
const Basket = require("../models/Basket");

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) =>
    res.render("shop/index", {
      products,
      title: "Shop",
      path: "/",
    })
  );
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
  const { productId } = req.params;
  Product.findById(productId, (product) =>
    res.render("shop/product-details", {
      product,
      title: product.title,
      path: `/products/${product.id}`,
    })
  );
};

exports.getBasket = (req, res, next) => {
  Basket.getBasket((basket) => {
    Product.fetchAll((products) => {
      const items = products.map((product) =>{
        const { id: productId } = product;
        const item = basket.products.find(({ id: basketId }) => basketId == productId);
        return { ...product, amount: item.amount };
      }).filter(i => i);

      res.render("shop/basket", { title: "Basket", path: "/basket", products: items });
    });
  });
};

exports.saveToBasket = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) =>
    Basket.addProduct(productId, +product.price)
  );
  res.redirect("/basket");
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
