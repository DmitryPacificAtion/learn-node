const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  /* PUG */
  // res.render('add-product', { title: 'Add Product', path: '/admin/add-product' });

  /* Handlebars */
  // res.render("add-product", {
  //   title: "Add Product",
  //   path: "/admin/add-product",
  //   activeAddProduct: true,
  //   productStyles: true,
  //   formStyles: true,
  // });

  /* Ejs */
  res.render('add-product', { title: 'Add Product', path: '/admin/add-product' });

});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
