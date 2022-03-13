const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/manage-product", {
    title: "Add Product",
    path: "/admin/add-product",
    editMode: false,
    product: {},
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const { productId } = req.params;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/manage-product", {
      title: "Edit Product",
      path: `/admin/edit-product/${product.id}`,
      editMode,
      product,
    });
  });
};

exports.addNewProduct = (req, res, next) => {
  const { title, description, imageUrl, price } = req.body;
  const product = new Product(null, title, description, imageUrl, price);
  product.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) =>
    res.render("admin/product-list", {
      products,
      title: "Admin Products",
      path: "/admin/products",
    })
  );
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, description, imageUrl, price } = req.body;
  const product = new Product(+id, title, description, imageUrl, price);
  product.save();

  res.redirect("/admin/products");
};

exports.deleteProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.delete(+productId);

  res.redirect("/admin/products");
};
