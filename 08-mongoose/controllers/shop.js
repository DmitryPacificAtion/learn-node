const Product = require('../models/product');
// const Basket = require('../models/Basket');

// getProducts
exports.getProductList = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log('products', products);
      res.render('shop/product-list', {
        products,
        title: 'Product list',
        path: '/products',
      });
    })
    .catch((error) => console.error(error));
};

// getProduct
exports.getProductDetails = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      res.render('shop/product-details', {
        product,
        title: product.title,
        path: `/products/${product._id}`,
      });
    })
    .catch((error) => console.error(error));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render('shop/index', {
        products,
        title: 'Shop',
        path: '/',
      });
    })
    .catch((error) => console.error(error));
};

exports.getBasket = (req, res, next) => {
  req.user
    .populate('basket.items.productId')
    .then((user) => {
      const products = user?.basket?.items || [];
      res.render('shop/basket', {
        title: 'Basket',
        path: '/basket',
        products,
      });
    })
    .catch((error) => console.error(error));
};

exports.postBasket = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId)
    .then((product) => {
      return req.user.addToBasket(product);
    })
    .then(() => {
      res.redirect('/basket');
    })
    .catch((error) => console.error(error));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};

exports.removeFromBasket = (req, res, next) => {
  const { productId } = req.body;
  req.user
    .removeFromBasket(productId)
    .then(() => {
      res.redirect('/basket');
    })
    .catch((error) => console.error(error));
};
