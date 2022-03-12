const express = require("express");
const router = express.Router();
const adminProductsController = require('../controllers/admin-products');

router.get("/add-product", adminProductsController.getAddedProduct);
router.post("/add-product", adminProductsController.addNewProduct);
router.get("/product-list", adminProductsController.getEditProduct);

module.exports = router;
