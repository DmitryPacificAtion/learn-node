const express = require("express");
const productsController = require('../controllers/shop');
const router = express.Router();

router.get("/", productsController.getIndex);
router.get("/cart", productsController.getCart);
router.get("/orders", productsController.getOrders);
router.get("/products", productsController.getProductList);

module.exports = router;
