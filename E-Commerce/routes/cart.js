const router = require('express').Router();

const cartController = require('../controller/cart');

router.get('/cart/:id', cartController.getCart);

module.exports = router;