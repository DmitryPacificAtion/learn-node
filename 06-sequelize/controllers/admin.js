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
  Product.findByPk(productId)
    .then((product) => {
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
  const product = Product.build({ title, description, imageUrl, price });

  product
    .save()
    .then(() => res.redirect('/'))
    .catch((e) => console.error(e));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
