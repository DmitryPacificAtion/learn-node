const Product = require('../models/product');
const Order = require('../models/order');

// getProducts
exports.getProductList = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render('shop/product-list', {
        products,
        title: 'All Products',
        path: '/products',
        isAuthenticated: req.session.isAuthenticated,
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
        isAuthenticated: req.session.isAuthenticated,
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
        isAuthenticated: req.session.isAuthenticated,
      });
    })
    .catch((error) => console.error(error));
};

exports.getBasket = (req, res, next) => {
  req.user
    .populate('basket.items.productId')
    .then((user) => {
      const products = user.basket.items || [];
      res.render('shop/basket', {
        title: 'Basket',
        path: '/basket',
        products,
        isAuthenticated: req.session.isAuthenticated,
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

exports.getOrder = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        title: 'Orders',
        orders: orders,
        isAuthenticated: req.session.isAuthenticated,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('basket.items.productId')
    .execPopulate()
    .then((user) => {
      const products = user.basket.items.map(({ amount, productId }) => ({
        amount,
        product: { ...productId._doc },
      }));
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products,
      });

      return order.save();
    })
    .then(() => req.user.clearBasket())
    .then(() => res.redirect('/orders'))
    .catch((error) => console.error(error));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        title: 'Your Orders',
        orders: orders,
        isAuthenticated: req.session.isAuthenticated,
      });
    })
    .catch((error) => console.error(error));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    title: 'Checkout',
    isAuthenticated: req.session.isAuthenticated,
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
