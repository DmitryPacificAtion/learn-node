const Product = require('../models/product');
const Order = require('../models/order');

// getProducts
exports.getProductList = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render('shop/product-list', {
        products,
        title: 'Product list',
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
  req.session.user
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
      return req.session.user.addToBasket(product);
    })
    .then(() => {
      res.redirect('/basket');
    })
    .catch((error) => console.error(error));
};

exports.getOrder = (req, res, next) => {
  Order.find({ 'user.userId': req.session.user._id })
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
  console.log('postOrder', req.session.user);
  req.session.user
    .populate('basket.items.productId')
    .then((user) => {
      const products = user.basket.items.map(({ amount, productId }) => ({
        amount,
        product: { ...productId._doc },
      }));
      const order = new Order({
        user: {
          name: req.session.user.name,
          userId: req.session.user,
        },
        products,
      });
      console.log('order', order);
      console.log('products', products);
      return order.save();
    })
    .then(() => req.session.user.clearBasket())
    .then(() => res.redirect('/orders'))
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
  req.session.user
    .removeFromBasket(productId)
    .then(() => {
      res.redirect('/basket');
    })
    .catch((error) => console.error(error));
};
