const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  return res.render('admin/manage-product', {
    title: 'Add Product',
    path: '/admin/add-product',
    editMode: false,
    isAuthenticated: req.session.isAuthenticated
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, description, imageUrl, price } = req.body;
  const product = new Product({
    title,
    description,
    imageUrl,
    price,
    userId: req.session.user._id,
  });
  product
    .save()
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((error) => console.error(error));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  const { productId } = req.params;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      }

      res.render('admin/manage-product', {
        title: 'Edit Product',
        path: `/admin/edit-product/${product._id}`,
        editMode,
        product,
        isAuthenticated: req.session.isAuthenticated
      });
    })
    .catch((e) => console.error(e));
};


exports.postEditProduct = (req, res, next) => {
  const { id, title, description, imageUrl, price } = req.body;
  Product.findById(id)
    .then((product) => {
      product.title = title;
      product.description = description;
      product.imageUrl = imageUrl;
      product.price = price;
      return product.save();
    })
    .then(() => res.redirect('/admin/products'))
    .catch((error) => console.error(error));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    /*  Обогащаем данные из другой модели */
    // .select('title name -_id') // select some fields from User
    // .populate('userId', 'name') // select some fields from User
    .then((products) => {
      res.render('admin/product-list', {
        products,
        title: 'Admin Products',
        path: '/admin/products',
        isAuthenticated: req.session.isAuthenticated
      });
    })
    .catch((error) => console.error(error));
};

exports.deleteProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findByIdAndRemove(productId)
    .then(() => res.redirect('/admin/products'))
    .catch((e) => console.error(e));
};
