const express = require("express");
const router = express.Router();
const adminProductsController = require('../controllers/admin');

router.get("/add-product", adminProductsController.getAddProduct);
router.post("/add-product", adminProductsController.addNewProduct);
router.get("/products", adminProductsController.getProducts);
router.post("/edit-product", adminProductsController.postEditProduct);
router.get("/edit-product/:productId", adminProductsController.getEditProduct);

module.exports = router;
