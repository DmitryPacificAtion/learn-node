const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products;

  res.render('shop', {
    products,
    title: 'Shop',
    path: '/',
    hasProducts: products.length > 0, // Handlebars
    activeShop: true, // Handlebars
    productStyles: true, // Handlebars
  });
});

module.exports = router;
