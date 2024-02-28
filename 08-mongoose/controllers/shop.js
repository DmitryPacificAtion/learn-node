const Product = require('../models/product');
const Order = require('../models/order');

// getProducts
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
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

exports.getOrder = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        title: 'Orders',
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  console.log('postOrder', req.user);
  req.user
    .populate('basket.items.productId')
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
      console.log('order', order);
      console.log('products', products);
      return order.save();
    })
    .then(() => req.user.clearBasket())
    .then(() => res.redirect('/orders'))
    .catch((error) => console.error(error));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    title: 'Checkout',
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
