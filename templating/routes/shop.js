const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;

  /* PUG */
  // res.render('shop', { products, title: 'Shop', path: '/' });

  /* Handlebars */
  // res.render("shop", {
  //   products,
  //   title: "Shop",
  //   path: "/",
  //   hasProducts: products.length > 0,
  //   activeShop: true,
  //   productStyles: true,
  // });

  /* Ejs */
  res.render('shop', { products, title: 'Shop', path: '/' });
});

module.exports = router;
