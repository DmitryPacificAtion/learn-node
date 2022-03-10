exports.getAddedProduct = (req, res, next) => {
  res.render("add-product", {
    title: "Add Product",
    path: "/admin/add-product",
  });
};

const products = [];
exports.addNewProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  res.render('shop', { products, title: 'Shop', path: '/' });
};
