const express = require('express');
const productsController = require('../controllers/shop');
const router = express.Router();

router.get('/', productsController.getIndex);
router.get('/basket', productsController.getBasket);
router.post('/basket', productsController.postBasket);
router.get('/products', productsController.getProductList);
router.post('/remove-basket-item', productsController.removeFromBasket);

router.get('/products/:productId', productsController.getProductDetails);

router.get('/create-order', productsController.postOrder);
router.get('/orders', productsController.getOrder);

module.exports = router;
