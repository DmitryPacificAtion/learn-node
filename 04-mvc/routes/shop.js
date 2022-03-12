const express = require("express");
const productsController = require('../controllers/shop');
const router = express.Router();

router.get("/", productsController.getIndex);
router.get("/basket", productsController.getBasket);
router.get("/orders", productsController.getOrders);
router.get("/products", productsController.getProductList);


// Dynamic routes
router.get("/products/:productId", productsController.getProductDetails);

module.exports = router;