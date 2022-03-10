const express = require("express");
const router = express.Router();
const productsController = require('../controllers/product');

router.get("/add-product", productsController.getAddedProduct);
router.post("/add-product", productsController.addNewProduct);

module.exports = router;
