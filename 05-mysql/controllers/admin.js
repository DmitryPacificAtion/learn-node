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
  Product.findById(productId)
    .then(([product]) => {
      if (!product) {
        return res.redirect('/');
      }

      res.render('admin/manage-product', {
        title: 'Edit Product',
        path: `/admin/edit-product/${product.id}`,
        editMode,
        product: product[0],
      });
    })
    .catch((e) => console.error(e));
};

exports.postAddProduct = (req, res, next) => {
  const { title, description, imageUrl, price } = req.body;
  const createdAt = new Date();
  console.log('createdAt', createdAt);
  const product = new Product(null, title, description, imageUrl, price, createdAt, createdAt);
  product
    .save()
    .then(() => res.redirect('/'))
    .catch((e) => console.error(e));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
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
  const updatedAt = new Date();
  console.log('updatedAt', updatedAt);
  const product = new Product(
    +id,
    title,
    description,
    imageUrl,
    price,
    null,
    updatedAt,
  );
  product
    .update()
    .then(() => res.redirect('/admin/products'))
    .catch((e) => console.error(e));
};

exports.deleteProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.delete(+productId)
    .then(() => res.redirect('/admin/products'))
    .catch((e) => console.error(e));
};
