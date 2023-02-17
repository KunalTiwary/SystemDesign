const router = require('express').Router();

const bookController = require('../controller/book');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');


router.get('/book/list', bookController.getBooks);

router.post('/book/create', isAuth, isAdmin, bookController.createBook);

router.post('/book/:id', isAuth, isAdmin, bookController.book);

router.get('/rented/:id', bookController.rented);



module.exports = router;
