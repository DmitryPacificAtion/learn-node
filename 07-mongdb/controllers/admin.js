const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/manage-product', {
    title: 'Add Product',
    path: '/admin/add-product',
    editMode: false,
    product: {},
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  const { productId } = req.params;
  // Product.findByPk(productId) // WITHOUT assosiations
  req.user
    .getProducts({ where: { id: productId } }) // WITH assosiations
    .then((products) => {
      // if WITHOUT assosiations - it would be an object instead of array
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }

      res.render('admin/manage-product', {
        title: 'Edit Product',
        path: `/admin/edit-product/${product.id}`,
        editMode,
        product,
      });
    })
    .catch((e) => console.error(e));
};

exports.postAddProduct = (req, res, next) => {
  const { title, description, imageUrl, price } = req.body;
  // const createdAt = new Date();

  /*
    Bad way, but it works if we doesn't have user* assosiations

    const product = Product.build({
      title,
      description,
      imageUrl,
      price,
      userEmail: req.user.email // <--- Hardcoded dependency
    });

    product
      .save()
      .then(() => res.redirect('/admin/products'))
      .catch((e) => console.error(e));
 */

  /* Good and elegand way, if we have assosiations */
  req.user
    .createProduct({
      title,
      description,
      imageUrl,
      price,
    })
    .then(() => res.redirect('/admin/products'))
    .catch((e) => console.error(e));
};

exports.getProducts = (req, res, next) => {
  // Product.findAll() // WITHOUT assosiations
  req.user
    .getProducts() // WITH assosiations
    .then((products) => {
      res.render('admin/product-list', {
        products,
        title: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch((error) => console.error(error));
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, description, imageUrl, price } = req.body;
  // const updatedAt = new Date();

  Product.findByPk(id)
    .then((product) => {
      return product.update({ title, description, imageUrl, price });
    })
    .then(() => {
      return res.redirect('/');
    })
    .catch((e) => console.error(e));
};

exports.deleteProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.destroy({ where: { id: productId } })
    .then(() => res.redirect('/admin/products'))
    .catch((e) => console.error(e));
};
