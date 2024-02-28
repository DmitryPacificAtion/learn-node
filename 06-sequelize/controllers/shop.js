const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
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

exports.getProducts = (req, res, next) => {
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
  Product.findAll({ where: { id: productId } })
    .then((products) => {
      const product = products[0];
      res.render('shop/product-details', {
        product,
        title: product.title,
        path: `/products/${product.id}`,
      });
    })
    .catch((err) => console.error(err));

  /* 
  // Another approach
  Product.findByPk(productId)
    .then((product) => {
       res.render('shop/product-details', {
        product,
        title: product.title,
        path: `/products/${product.id}`,
      });
    })
    .catch((err) => console.error(err)); */
};

exports.getBasket = (req, res, next) => {
  /* 
  // WITHOUT assosiations

  Basket.getBasket()
    .then(([basket]) => {
      res.render('shop/basket', {
        title: 'Basket',
        path: '/basket',
        products: basket,
      });
      // Product.fetchAll()
      //   .then((products) => {
      //     const items = products
      //       .map((product) => {
      //         const { id: productId } = product;
      //         const item = basket.products.find(
      //           ({ id: basketId }) => basketId == productId,
      //         );
      //         if (item) return { ...product, amount: item.amount };
      //         return null;
      //       })
      //       .filter((i) => i);
    })
    .catch((err) => console.error(err));
  */

  // WITH assosiations
  req.user
    .getBasket()
    .then((basket) => {
      return basket
        .getProducts()
        .then((products) => {
          res.render('shop/basket', {
            title: 'Basket',
            path: '/basket',
            products,
          });
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

exports.saveToBasket = (req, res, next) => {
  /*
  // WITHOUT assosiations
  const { productId } = req.body;
  Product.findByPk(productId)
    .then(productId, (product) => {
      Basket.addProduct(productId, +product.price);
      res.redirect('/basket');
    })
    .catch((err) => console.error(err));
  */

  // WITH assosiations
  let fetchedBasket;
  let quantity = 1;
  const { productId } = req.body;

  req.user
    .getBasket()
    .then((basket) => {
      fetchedBasket = basket;
      return basket.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      if (products.length > 0) {
        const oldQuantity = products[0].basketItem.quantity;
        quantity = oldQuantity + 1;
        return products[0];
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedBasket.addProduct(product, {
        through: { quantity },
      });
    })
    .then(() => res.redirect('/basket'))
    .catch((err) => console.error(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then((orders) => {
      res.render('shop/orders', { title: 'Orders', path: '/orders', orders });
    })
    .catch();
};

exports.postOrders = (req, res, next) => {
  let fetchedBasket;
  req.user
    .getBasket()
    .then((basket) => {
      fetchedBasket = basket;
      return basket.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.basketItem.quantity };
              return product;
            }),
          );
        })
        .catch((err) => console.error(err));
    })
    .then(() => {
      return fetchedBasket.setProducts(null);
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch((err) => console.error(err));
};

exports.removeFromBasket = (req, res, next) => {
  /* 
  // WITHOUT assosiations
  const { productId } = req.body;
    Product.findByPk(+productId)
      .then((product) => {
        Basket.delete(productId);
        res.redirect('/basket');
      })
      .catch((err) => console.error(err));
  */

  // WITH assosiations
  const { productId } = req.body;
  req.user
    .getBasket()
    .then((basket) => {
      return basket.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      return product.basketItem.destroy();
    })
    .then(() => res.redirect('/basket'))
    .catch((err) => console.error(err));
};
