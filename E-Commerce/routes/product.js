const router = require('express').Router();
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');


const productController = require('../controller/product');

router.get('/products', productController.getProducts);

router.get('/product/:id', productController.getProduct);

router.delete('/product/:id',isAuth, productController.deleteProduct);

router.put('/product/:id',isAuth, productController.updateProduct);

router.post('/product', body('name').not().isEmpty(),isAuth, productController.createProduct);

module.exports = router;