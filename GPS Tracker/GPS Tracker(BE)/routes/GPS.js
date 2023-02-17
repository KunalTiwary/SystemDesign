const router = require('express').Router();
const isAuth = require('../middleware/is-auth');
const GPSController = require('../controller/GPS');

router.get('/getData', GPSController.getData);

router.get('/searchData', isAuth, GPSController.searchData);

module.exports = router;
