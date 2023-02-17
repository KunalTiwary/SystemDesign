const router = require('express').Router();
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

const moviesController = require('../controller/movies');

router.get('/getAllMovies', moviesController.getAllMovies);

router.get('/getMovie/:id', moviesController.getMovie);

router.post('/createMovie', isAuth, isAdmin, moviesController.createMovie);

router.put('/updateMovie/:id', isAuth, isAdmin, moviesController.updateMovies);  

router.delete('/deleteMovie/:id', isAuth, isAdmin, moviesController.deleteMovie); 

module.exports = router;
