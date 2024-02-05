const Product = require('../models/product');
const Basket = require('../models/Basket');

exports.getIndex = (req, res, next) => {
  console.log('getIndex');
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        products,
        title: 'Shop',
        path: '/',
      });
    })
    .catch((error) => console.error(error));
};

exports.getProductList = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        products,
        title: 'Product list',
        path: '/products',
      });
    })
    .catch((error) => console.error(error));
};

exports.getProductDetails = (req, res, next) => {
  const { productId } = req.params;
  Product.findByPk(productId)
    .then((row) => {
      const [product] = row;
      res.render('shop/product-details', {
        product,
        title: product.title,
        path: `/products/${product.id}`,
      });
    })
    .catch((err) => console.error(err));
};

exports.getBasket = (req, res, next) => {
  Basket.getBasket((basket) => {
    Product.findAll()
      .then((products) => {
        const items = products
          .map((product) => {
            const { id: productId } = product;
            const item = basket.products.find(
              ({ id: basketId }) => basketId == productId,
            );
            if (item) return { ...product, amount: item.amount };
            return null;
          })
          .filter((i) => i);

        res.render('shop/basket', {
          title: 'Basket',
          path: '/basket',
          products: items,
        });
      })
      .catch((err) => console.error(err));
  });
};

exports.saveToBasket = (req, res, next) => {
  const { productId } = req.body;
  Product.findByPk(productId, (product) =>
    Basket.addProduct(productId, +product.price),
  );
  res.redirect('/basket');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { title: 'Orders', path: '/orders' });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};

exports.removeFromBasket = (req, res, next) => {
  const { productId } = req.body;
  Product.findByPk(+productId, (product) => {
    Basket.delete(productId);
  });
  res.redirect('/basket');
};
