const express = require("express");
const router = express.Router();
const adminProductsController = require('../controllers/admin');

router.get("/add-product", adminProductsController.getAddedProduct);
router.post("/add-product", adminProductsController.addNewProduct);
router.get("/products", adminProductsController.getProducts);

module.exports = router;
